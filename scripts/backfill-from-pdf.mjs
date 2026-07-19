#!/usr/bin/env node
// Extracts the official single-choice questions (stem + options) from a paper's
// PDF and reports how each compares with the bank, so questions flagged as
// not-official can be replaced with the real ones.
//
// Extraction only: it never writes to the data files. Review the emitted JSON,
// then apply it with --apply once the extraction looks right for that paper.
//
// Code listings in most official PDFs are images with no text layer. A question
// whose stem references code therefore cannot be made answerable by extraction
// alone; those are backfilled with the official stem/options/answer and left
// flagged as missing-figure rather than silently presented as complete.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const paperIdArg = args.find((a) => /^\d{4}-\d{2}-l\d$/.test(a));
if (!paperIdArg) {
  console.error('Usage: node scripts/backfill-from-pdf.mjs <paperId> [--apply]');
  process.exit(1);
}

const { paperMeta } = await import(pathToFileURL(path.join(root, 'src/data/gesp/_generated.js')).href);
const { paperSources } = await import(pathToFileURL(path.join(root, 'src/data/gesp/paperSources.js')).href);
const level = paperMeta[paperIdArg].level;
const dataFile = path.join(root, 'src/data/gesp', `level${level}`, `${paperIdArg}.js`);

const cacheDir = path.join(os.tmpdir(), 'gesp-pdf-cache');
fs.mkdirSync(cacheDir, { recursive: true });
const pdfPath = path.join(cacheDir, `${paperIdArg}.pdf`);
if (!fs.existsSync(pdfPath)) {
  const url = paperSources[paperIdArg].officialUrl || paperSources[paperIdArg].mirrorUrl;
  const res = await fetch(url, { redirect: 'follow', signal: AbortSignal.timeout(120000) });
  fs.writeFileSync(pdfPath, Buffer.from(await res.arrayBuffer()));
}

const EXTRACT = `
import sys, pypdf
sys.stdout.reconfigure(errors='replace')
r = pypdf.PdfReader(sys.argv[1])
sys.stdout.write('\\n'.join((p.extract_text() or '') for p in r.pages))
`;
const scriptPath = path.join(cacheDir, '_extract.py');
fs.writeFileSync(scriptPath, EXTRACT, 'utf8');
const text = execFileSync('python3', [scriptPath, pdfPath], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const secStart = text.indexOf('单选题');
const secEnd = text.indexOf('判断题');
const section = secStart >= 0 ? text.slice(secStart, secEnd > secStart ? secEnd : undefined) : text;

// Official answer table on page 1.
const tableMatch = /题号((?:[ \t]+\d+)+)[ \t]*\r?\n[ \t]*答案((?:[ \t]+[A-D])+)/.exec(text);
const officialAnswers = new Map();
if (tableMatch) {
  const nums = tableMatch[1].trim().split(/\s+/).map(Number);
  const letters = tableMatch[2].trim().split(/\s+/);
  nums.forEach((n, i) => officialAnswers.set(n, letters[i]));
}

const CODE_HINTS = ['代码', '程序', '下图', '如图', '横线'];

// These PDFs encode many characters as Kangxi radicals (下⾯ / 执⾏), which are
// distinct codepoints from the normal ideographs and would render as subtly
// wrong glyphs and break search. Normalize just that block so CJK punctuation
// (（）、，) is left alone — a blanket NFKC would also convert those to ASCII.
const normalizeCjk = (s) => String(s || '')
  .replace(/[⺀-⿟]/g, (ch) => ch.normalize('NFKC'))
  .replace(/[ \t]+/g, ' ')
  .trim();

const extractQuestion = (num) => {
  const st = new RegExp(`第\\s*${num}\\s*题`).exec(section);
  if (!st) return null;
  let block = section.slice(st.index + st[0].length);
  const nx = new RegExp(`第\\s*${num + 1}\\s*题`).exec(block);
  block = (nx ? block.slice(0, nx.index) : block.slice(0, 900)).trim();
  const optIdx = block.search(/\n\s*A[.、．]/);
  const stem = (optIdx > 0 ? block.slice(0, optIdx) : block).trim();
  const opts = [];
  for (const letter of ['A', 'B', 'C', 'D']) {
    const m = block.match(new RegExp(`\\n\\s*${letter}[.、．]\\s*([^\\n]*)`));
    opts.push(m ? m[1].trim() : '');
  }
  if (!stem || opts.filter(Boolean).length < 4) return null;
  // A leading "B. " inside an option means the PDF laid the choices out in an
  // order the line-based split could not follow; writing that in would corrupt
  // the question, so refuse rather than guess.
  if (opts.some((o) => /^[A-D][.、．]\s/.test(o))) return null;
  const cleanStem = normalizeCjk(stem);
  return {
    num,
    stem: cleanStem,
    options: opts.map(normalizeCjk),
    needsCode: CODE_HINTS.some((k) => cleanStem.includes(k)),
  };
};

const { paperData } = await import(pathToFileURL(dataFile).href);
const bank = new Map((paperData.questions || []).map((q) => [Number(q.id), q]));

const results = [];
for (const [num] of officialAnswers) {
  const q = bank.get(num);
  if (!q || q.type !== 'single') continue;
  const extracted = extractQuestion(num);
  if (!extracted) { results.push({ num, status: 'extract-failed' }); continue; }
  const letter = officialAnswers.get(num);
  results.push({
    ...extracted,
    status: 'ok',
    answerLetter: letter,
    answerIndex: letter.charCodeAt(0) - 65,
    bankFlagged: q.sourceIntegrity || null,
  });
}

const flagged = results.filter((r) => r.bankFlagged === 'not-official-question');
console.log(`--- ${paperIdArg} ---`);
console.log(`Questions with official answer:  ${officialAnswers.size}`);
console.log(`Extracted successfully:          ${results.filter((r) => r.status === 'ok').length}`);
console.log(`Flagged as not-official in bank: ${flagged.length}`);
console.log(`  of those, self-contained:      ${flagged.filter((r) => !r.needsCode).length}`);
console.log(`  of those, need a code image:   ${flagged.filter((r) => r.needsCode).length}`);

const outFile = path.join(cacheDir, `${paperIdArg}-backfill.json`);
fs.writeFileSync(outFile, JSON.stringify(results, null, 2), 'utf8');
console.log(`\nExtraction written to ${outFile}`);

if (!apply) {
  console.log('\nDry run. Review the JSON, then re-run with --apply.');
  for (const r of flagged) {
    console.log(`\nQ${r.num} (${r.needsCode ? 'needs code image' : 'self-contained'}) answer=${r.answerLetter}`);
    console.log(`  ${r.stem.replace(/\s+/g, ' ').slice(0, 100)}`);
    r.options.forEach((o, i) => console.log(`    ${String.fromCharCode(65 + i)}. ${o.slice(0, 70)}`));
  }
  process.exit(0);
}

// ---- apply ----
const jsLiteral = (s) => JSON.stringify(String(s));
const tpl = (s) => '`' + String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`';

const MISSING_CODE_NOTE = '原卷该题的代码/图以图片形式给出，官方 PDF 无文本层，本站无法提取；题干、选项与答案均取自官方原卷，但缺少代码部分，暂不足以独立作答。';

let text2 = fs.readFileSync(dataFile, 'utf8');
let applied = 0;

for (const r of flagged) {
  const idRe = new RegExp(`(\\n(\\s*)id: ${r.num},)`);
  const m = text2.match(idRe);
  if (!m) { console.log(`Q${r.num}: id line not found, skipped`); continue; }
  const start = m.index;
  const after = text2.slice(start + m[0].length);
  const nextIdx = after.search(/\n\s*id: \d+,/);
  const end = nextIdx === -1 ? text2.length : start + m[0].length + nextIdx;
  let block = text2.slice(start, end);
  const indent = m[2];

  const stemForData = r.needsCode
    ? `${r.stem}\n\n> ⚠️ 原卷此处配有代码/图片，官方 PDF 未提供文本层，本站暂无法还原。`
    : r.stem;

  const explanation = r.needsCode
    ? `**答案：${r.answerLetter}（${r.options[r.answerIndex]}）**\n\n**依据**：官方真题 PDF 第 1 页答案表。本题题干与选项均已按官方原卷回填。\n\n> ⚠️ ${MISSING_CODE_NOTE}因此本站不对该代码做推测性讲解，请对照原卷阅读代码。`
    : `**答案：${r.answerLetter}（${r.options[r.answerIndex]}）**\n\n**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`;

  // question
  const qRe = /question:\s*(`(?:[^`\\]|\\[\s\S])*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/;
  if (!qRe.test(block)) { console.log(`Q${r.num}: question field not found, skipped`); continue; }
  block = block.replace(qRe, `question: ${tpl(stemForData)}`);

  // options — find the array by balancing brackets, ignoring those inside strings
  const optStart = block.search(/options:\s*\[/);
  if (optStart < 0) { console.log(`Q${r.num}: options field not found, skipped`); continue; }
  const arrStart = block.indexOf('[', optStart);
  let depth = 0, quote = '', optEnd = -1;
  for (let i = arrStart; i < block.length; i++) {
    const ch = block[i];
    const prev = block[i - 1];
    if (quote) { if (ch === quote && prev !== '\\') quote = ''; continue; }
    if (ch === "'" || ch === '"' || ch === '`') { quote = ch; continue; }
    if (ch === '[') depth++;
    else if (ch === ']') { depth--; if (depth === 0) { optEnd = i; break; } }
  }
  if (optEnd < 0) { console.log(`Q${r.num}: options array not terminated, skipped`); continue; }
  block = block.slice(0, optStart) + `options: [${r.options.map(jsLiteral).join(', ')}]` + block.slice(optEnd + 1);

  // answer
  block = block.replace(/answer:\s*\d+/, `answer: ${r.answerIndex}`);

  // explanation
  const expRe = /explanation:\s*(`(?:[^`\\]|\\[\s\S])*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/;
  block = expRe.test(block)
    ? block.replace(expRe, `explanation: ${tpl(explanation)}`)
    : block.replace(idRe, `$1\n${indent}explanation: ${tpl(explanation)},`);

  // integrity: the question is now the official one, so the previous
  // "not-official" flag no longer applies. Self-contained questions become
  // fully usable; code questions stay flagged for the missing image.
  block = block.replace(/\n\s*sourceIntegrity: '[^']*',/, '');
  block = block.replace(/\n\s*integrityNote: (?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'),/, '');
  if (r.needsCode) {
    block = block.replace(idRe, `$1\n${indent}sourceIntegrity: 'missing-figure',\n${indent}integrityNote: ${jsLiteral(MISSING_CODE_NOTE)},`);
  }

  text2 = text2.slice(0, start) + block + text2.slice(end);
  applied++;
  console.log(`Q${r.num}: backfilled from official PDF (${r.needsCode ? 'still missing code image' : 'now self-contained'})`);
}

fs.writeFileSync(dataFile, text2, 'utf8');
console.log(`\nApplied ${applied} question(s) to ${path.relative(root, dataFile)}`);
