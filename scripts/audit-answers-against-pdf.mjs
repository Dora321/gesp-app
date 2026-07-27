#!/usr/bin/env node
// Audits the question bank's single-choice answer keys against the answer table
// printed on page 1 of each official PDF.
//
// This is the objective half of a full-paper review: the official PDFs carry a
// "题号 / 答案" table for the single-choice section, so those answers can be
// checked mechanically for all papers. Judge-question answers are rendered as
// glyphs (✓/✗) with no text layer, so they are NOT covered here and must not be
// claimed as verified on the strength of this audit.
//
// Requires python3 with pypdf for text extraction.
//
// Usage:
//   node scripts/audit-answers-against-pdf.mjs               # audit every paper
//   node scripts/audit-answers-against-pdf.mjs 2026-03-l2    # audit specific papers
//   node scripts/audit-answers-against-pdf.mjs --json out.json
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const args = process.argv.slice(2);
const jsonIdx = args.indexOf('--json');
const jsonOut = jsonIdx >= 0 ? args[jsonIdx + 1] : null;
const only = args.filter((a) => /^\d{4}-\d{2}-l\d$/.test(a));

const { paperIds, paperMeta } = await import(pathToFileURL(path.join(root, 'src/data/gesp/_generated.js')).href);
const { paperSources } = await import(pathToFileURL(path.join(root, 'src/data/gesp/paperSources.js')).href);

const cacheDir = path.join(os.tmpdir(), 'gesp-pdf-cache');
fs.mkdirSync(cacheDir, { recursive: true });

// errors='replace' is required: several official PDFs embed lone surrogates
// (math glyphs) that would otherwise abort extraction with UnicodeEncodeError.
const EXTRACT = `
import sys, pypdf
sys.stdout.reconfigure(errors='replace')
r = pypdf.PdfReader(sys.argv[1])
out = []
for p in r.pages:
    out.append(p.extract_text() or '')
sys.stdout.write('\\n'.join(out))
`;

const extractText = (pdfPath) => {
  const scriptPath = path.join(cacheDir, '_extract.py');
  fs.writeFileSync(scriptPath, EXTRACT, 'utf8');
  return execFileSync('python3', [scriptPath, pdfPath], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
};

// Page 1 carries: "题号 1 2 ... 15" then "答案 B D D ...". Only the single-choice
// table has letters in its 答案 row; the judge table's row is empty in the text
// layer, so a row without letters is skipped rather than guessed at.
const parseAnswerTable = (text) => {
  const results = [];
  // Use explicit horizontal whitespace: \s would swallow the newline that
  // separates the 题号 row from the 答案 row.
  const re = /题号((?:[ \t]+\d+)+)[ \t]*\r?\n[ \t]*答案((?:[ \t]+[A-DTF√×✓✗对错])+)/g;
  let m;
  while ((m = re.exec(text)) !== null) {
    const nums = m[1].trim().split(/\s+/).map(Number);
    const letters = m[2].trim().split(/\s+/);
    if (nums.length !== letters.length) continue;
    results.push(nums.map((n, i) => [n, letters[i]]));
  }
  return results;
};

// Compare the bank's options against the PDF's options for the same question
// number. A mismatched answer means very different things depending on this:
// if the options match, the answer key is simply wrong; if they do not, the
// bank's question is not the official one at all, and "fixing" the answer to
// match the PDF would corrupt a question that is self-consistent today.
const normalize = (s) => String(s || '')
  .replace(/[\s　]/g, '')
  .replace(/[（）()［］[\]｛｝{}，,。.；;：:！!？?、'"'"`]/g, '')
  .toLowerCase();

// The stem matters as much as the options: two papers can offer an identical
// option set for different questions (e.g. 3/17/19/20 for two different integer
// expressions), so comparing options alone would flag a rewritten question as a
// wrong answer key.
const extractPdfStem = (sectionText, num) => {
  const start = sectionText.search(new RegExp(`第\\s*${num}\\s*题`));
  if (start < 0) return null;
  const rest = sectionText.slice(start);
  const optIdx = rest.search(/\n\s*A[.、．]/);
  const stem = optIdx > 0 ? rest.slice(0, optIdx) : rest.slice(0, 400);
  return stem.replace(new RegExp(`^第\\s*${num}\\s*题`), '').trim();
};

// Character-bigram overlap: robust enough for CJK text where the PDF layer may
// drop code blocks that live in images.
const stemSimilarity = (a, b) => {
  const norm = (s) => normalize(s).replace(/```[a-z]*/g, '');
  const x = norm(a);
  const y = norm(b);
  if (x.length < 6 || y.length < 6) return null;
  const grams = (s) => { const g = new Set(); for (let i = 0; i < s.length - 1; i++) g.add(s.slice(i, i + 2)); return g; };
  const gx = grams(x);
  const gy = grams(y);
  let inter = 0;
  for (const g of gx) if (gy.has(g)) inter++;
  return inter / Math.min(gx.size, gy.size);
};

const extractPdfOptions = (sectionText, num) => {
  const start = sectionText.search(new RegExp(`第\\s*${num}\\s*题`));
  if (start < 0) return null;
  const rest = sectionText.slice(start);
  const nextIdx = rest.search(new RegExp(`第\\s*${num + 1}\\s*题`));
  const block = nextIdx > 0 ? rest.slice(0, nextIdx) : rest.slice(0, 1200);
  const opts = [];
  for (const letter of ['A', 'B', 'C', 'D']) {
    const m = block.match(new RegExp(`\\n\\s*${letter}[.、．]\\s*([^\\n]*)`));
    opts.push(m ? m[1].trim() : '');
  }
  return opts.some((o) => o) ? opts : null;
};

// Classify a letter disagreement by comparing what each side's answer actually
// SAYS, not which letter it is. Papers frequently list the same four options in
// a different order, in which case "bank=A, pdf=C" is not an error at all — both
// point at the same text. Only when the pointed-at text differs is something
// genuinely wrong, and even then the fix depends on whether the option sets match.
const classify = (bankOpts, bankAnswer, pdfOpts, pdfAnswer, stemSim) => {
  if (!pdfOpts) return { kind: 'undetermined' };
  const bank = bankOpts.map(normalize);
  const pdf = pdfOpts.map(normalize);
  if (pdf.filter(Boolean).length < 3) return { kind: 'undetermined' };

  const bankText = bank[bankAnswer] || '';
  const pdfText = pdf[pdfAnswer] || '';
  if (!bankText || !pdfText) return { kind: 'undetermined' };

  // Same answer content, different option order — the bank is self-consistent.
  if (bankText === pdfText) return { kind: 'reordered', stemSim };

  // Do the two papers offer the same set of options at all?
  const sameSet = bank.filter(Boolean).length >= 3
    && bank.filter(Boolean).every((b) => pdf.includes(b))
    && pdf.filter(Boolean).every((p) => bank.includes(p));
  if (!sameSet) return { kind: 'not-official', bankText, pdfText, stemSim };

  // Same option set but a different stem means the bank rewrote the question;
  // "correcting" its answer to the official key would then be wrong.
  if (stemSim !== null && stemSim < 0.5) return { kind: 'not-official', bankText, pdfText, stemSim };

  return { kind: stemSim === null ? 'undetermined' : 'answer-wrong', bankText, pdfText, stemSim };
};

const download = async (url, dest) => {
  if (fs.existsSync(dest) && fs.statSync(dest).size > 0) return;
  const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(120000) });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
};

const targets = (only.length ? only : paperIds).filter((id) => !paperMeta[id]?.unofficial);
const report = [];
let mismatchTotal = 0;
let comparedTotal = 0;

for (const id of targets) {
  const src = paperSources[id];
  const url = src?.officialUrl || src?.mirrorUrl;
  if (!url) { report.push({ id, status: 'no-source' }); continue; }

  const pdfPath = path.join(cacheDir, `${id}.pdf`);
  let text;
  try {
    await download(url, pdfPath);
    text = extractText(pdfPath);
  } catch (e) {
    report.push({ id, status: 'fetch-failed', detail: e.message });
    continue;
  }

  const tables = parseAnswerTable(text);
  if (tables.length === 0) {
    report.push({ id, status: 'no-answer-table' });
    continue;
  }

  const { paperData } = await import(pathToFileURL(path.join(root, 'src/data/gesp', `level${paperMeta[id].level}`, `${id}.js`)).href);
  const byId = new Map();
  for (const q of paperData.questions || []) byId.set(Number(q.id), q);

  const secStart = text.indexOf('单选题');
  const secEnd = text.indexOf('判断题');
  const section = secStart >= 0 ? text.slice(secStart, secEnd > secStart ? secEnd : undefined) : text;

  const answerErrors = [];   // same options, key points at different text
  const notOfficial = [];    // bank question differs from the official paper
  const reordered = [];      // same answer text, options listed in another order
  const unknown = [];        // could not extract options from the PDF
  const knownDisputes = [];  // manually reviewed answer-key conflicts
  let compared = 0;
  // The first table is the single-choice section (questions 1..N).
  for (const [num, letter] of tables[0]) {
    const q = byId.get(num);
    if (!q || q.type !== 'single' || !Array.isArray(q.options)) continue;
    const expected = letter.charCodeAt(0) - 65;
    if (expected < 0 || expected > 3) continue;
    compared++;
    if (q.answer === expected) continue;

    if (q.sourceIntegrity === 'answer-key-conflict') {
      knownDisputes.push({
        q: num,
        bank: String.fromCharCode(65 + q.answer),
        pdf: letter,
        note: q.integrityNote,
      });
      continue;
    }

    const stemSim = stemSimilarity(q.question, extractPdfStem(section, num));
    const verdict = classify(q.options, q.answer, extractPdfOptions(section, num), expected, stemSim);
    const record = {
      q: num,
      bank: String.fromCharCode(65 + q.answer),
      pdf: letter,
      bankText: verdict.bankText,
      pdfText: verdict.pdfText,
      stemSim: verdict.stemSim === null || verdict.stemSim === undefined ? null : Number(verdict.stemSim.toFixed(2)),
    };
    if (verdict.kind === 'undetermined') unknown.push(record);
    else if (verdict.kind === 'reordered') reordered.push(record);
    else if (verdict.kind === 'answer-wrong') answerErrors.push(record);
    else notOfficial.push(record);
  }
  comparedTotal += compared;
  mismatchTotal += answerErrors.length + notOfficial.length + unknown.length;
  report.push({ id, status: 'ok', compared, answerErrors, notOfficial, reordered, unknown, knownDisputes });
  if (answerErrors.length) {
    console.log(`❌ ${id} ANSWER-WRONG ${answerErrors.length}/${compared}: ` +
      answerErrors.map((x) => `Q${x.q} bank=${x.bank} pdf=${x.pdf}`).join(', '));
  }
  if (notOfficial.length) {
    console.log(`⚠️  ${id} NOT-OFFICIAL ${notOfficial.length}/${compared}: ` +
      notOfficial.map((x) => `Q${x.q}`).join(', '));
  }
  if (unknown.length) {
    console.log(`?  ${id} UNDETERMINED ${unknown.length}/${compared}: ` +
      unknown.map((x) => `Q${x.q}`).join(', '));
  }
  if (knownDisputes.length) {
    console.log(`⚖️  ${id} KNOWN-DISPUTE ${knownDisputes.length}/${compared}: ` +
      knownDisputes.map((x) => `Q${x.q} bank=${x.bank} pdf=${x.pdf}`).join(', '));
  }
}

const sum = (key) => report.reduce((n, r) => n + (r[key]?.length || 0), 0);
console.log('\n--- Single-choice answer audit vs official PDF ---');
console.log(`Papers audited:        ${report.filter((r) => r.status === 'ok').length}/${targets.length}`);
console.log(`Answers compared:      ${comparedTotal}`);
console.log(`Total mismatches:      ${mismatchTotal}`);
console.log(`  ANSWER-WRONG:        ${sum('answerErrors')}  (same options, key points at different text)`);
console.log(`  NOT-OFFICIAL:        ${sum('notOfficial')}  (bank question is not the official one)`);
console.log(`  UNDETERMINED:        ${sum('unknown')}  (could not read PDF options)`);
console.log(`  KNOWN-DISPUTE:       ${sum('knownDisputes')}  (excluded from scoring pending clarification)`);
console.log(`  reordered (benign):  ${sum('reordered')}  (same answer text, options in another order)`);
const skipped = report.filter((r) => r.status !== 'ok');
if (skipped.length) {
  console.log(`Skipped:               ${skipped.length}`);
  for (const s of skipped.slice(0, 15)) console.log(`  ${s.id}: ${s.status}${s.detail ? ' — ' + s.detail : ''}`);
}
console.log('\nNote: judge-question answers are images in the PDF text layer and are NOT covered by this audit.');

if (jsonOut) {
  fs.writeFileSync(jsonOut, JSON.stringify(report, null, 2), 'utf8');
  console.log(`Report written to ${jsonOut}`);
}
