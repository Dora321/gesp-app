#!/usr/bin/env node
// Removes PDF extraction noise from question stems.
//
// What this does NOT do: reconstruct code listings. That was tried and
// abandoned. The official PDFs render code with a line-number gutter, and it is
// tempting to treat "N bare numbers" as marking the N code lines above them —
// but the PDF text layer interleaves neighbouring questions across column and
// page boundaries, so the recovered listing is frequently the wrong question's:
//
//   2024-09-l5 Q6   last listing is a 2-line fragment of the NEXT question
//   2025-03-l2 Q11  needs two listings, only one survives extraction
//   2026-03-l7 Q9   "stem" resolves to the page footer; listing is another
//                   question's helper function
//
// A wrong listing is worse than a missing one, because the learner reasons from
// code the question never contained. So code is only ever added by transcribing
// the PDF's embedded images by hand (see scripts/extract-pdf-images.mjs), and
// questions without it keep their missing-figure flag.
//
// What this DOES: strip line-number gutters, page footers and the inaccurate
// "no text layer" claim from stems, so the visible text is clean even while the
// question stays flagged as incomplete.
//
// Usage:
//   node scripts/clean-pdf-code-blocks.mjs            # report only
//   node scripts/clean-pdf-code-blocks.mjs --apply
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const apply = process.argv.includes('--apply');

const { paperIds, paperMeta } = await import(pathToFileURL(path.join(root, 'src/data/gesp/_generated.js')).href);

// The old wording claimed the PDF has no text layer. For many of these papers it
// does — the layout just cannot be split reliably. Say that instead.
const OLD_WARNING = /\n*> ⚠️ 原卷此处配有代码\/图片，官方 PDF 未提供文本层，本站暂无法还原。\n*/g;
const NEW_WARNING = '> ⚠️ 原卷此处配有代码或图片。官方 PDF 中该部分为图片，或其文本层与相邻试题混排、无法可靠切分，本站尚未还原。请对照原卷阅读代码。';

const stripNoise = (raw) => {
  let s = String(raw).replace(OLD_WARNING, '\n');
  // Line-number gutters: runs of bare numbers starting from 1.
  const lines = s.split('\n');
  const kept = [];
  let i = 0;
  let removed = 0;
  while (i < lines.length) {
    let j = i;
    const nums = [];
    while (j < lines.length && /^\s*\d+\s*$/.test(lines[j])) {
      nums.push(Number(lines[j].trim()));
      j++;
    }
    if (nums.length >= 2 && nums[0] === 1 && nums.every((n, k) => n === k + 1)) {
      removed += nums.length;
      i = j;
      continue;
    }
    kept.push(lines[i]);
    i++;
  }
  s = kept.join('\n')
    .replace(/^\s*第\s*\d+\s*页\s*\/\s*共\s*\d+\s*页\s*$/gm, '') // page footers
    .replace(/\n{3,}/g, '\n\n')
    .trim();
  return { text: s, removedGutterLines: removed };
};

const tpl = (s) => '`' + String(s).replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`';

let scanned = 0;
let changed = 0;
const report = [];

for (const id of paperIds) {
  const dataFile = path.join(root, 'src/data/gesp', `level${paperMeta[id].level}`, `${id}.js`);
  const { paperData } = await import(pathToFileURL(dataFile).href);
  let text = fs.readFileSync(dataFile, 'utf8');
  let touched = false;

  for (const q of paperData.questions || []) {
    // Never touch programming questions: their stems are hand-written Markdown
    // documents whose sample outputs contain bare number lines, which the gutter
    // heuristic misreads. Rewriting one corrupted 2026-03-l1 Q26 before this
    // guard existed.
    if (q.type !== 'single' && q.type !== 'judge') continue;
    const raw = String(q.question || '');
    const hasGutter = /\n\d+\n\d+/.test(raw);
    const hasOldWarning = OLD_WARNING.test(raw);
    OLD_WARNING.lastIndex = 0;
    const hasFooter = /第\s*\d+\s*页\s*\/\s*共\s*\d+\s*页/.test(raw);
    if (!hasGutter && !hasOldWarning && !hasFooter) continue;
    scanned++;

    const { text: cleanedStem, removedGutterLines } = stripNoise(raw);
    const needsWarning = q.sourceIntegrity === 'missing-figure';
    const finalText = needsWarning ? `${cleanedStem}\n\n${NEW_WARNING}` : cleanedStem;
    report.push(`${id} Q${q.id}: removed ${removedGutterLines} gutter line(s)` +
      `${hasFooter ? ', page footer' : ''}${hasOldWarning ? ', stale warning' : ''}`);

    if (!apply) continue;

    const idRe = new RegExp(`(\\n(\\s*)id: ${q.id},)`);
    const m = text.match(idRe);
    if (!m) continue;
    const start = m.index;
    const after = text.slice(start + m[0].length);
    const nextIdx = after.search(/\n\s*id: \d+,/);
    const end = nextIdx === -1 ? text.length : start + m[0].length + nextIdx;
    let block = text.slice(start, end);
    const qRe = /question:\s*(`(?:[^`\\]|\\[\s\S])*`|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")/;
    if (!qRe.test(block)) continue;
    block = block.replace(qRe, `question: ${tpl(finalText)}`);
    text = text.slice(0, start) + block + text.slice(end);
    touched = true;
    changed++;
  }

  if (apply && touched) fs.writeFileSync(dataFile, text, 'utf8');
}

console.log(`Questions carrying extraction noise: ${scanned}`);
report.forEach((r) => console.log(`  ${r}`));
console.log(apply ? `\nCleaned ${changed} question(s).` : '\nReport only. Re-run with --apply to write.');
console.log('\nNote: code listings are never reconstructed here — see the header comment.');
