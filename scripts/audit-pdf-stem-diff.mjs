// 题面一致性体检 v2：官方 PDF 文本层是按「题号 → 题干 → 选项」顺序抽取的，
// 但代码块常常被排到页尾，所以按「第 N 题」切段并不可靠。改用更直接的判据：
// 题库题面的首个自然语言片段（14 个归一化字符）必须在官方 PDF 全文中原样出现。
// 命中说明这一题确实是官方卷里的题；不命中说明题库这一题是仿写或错位。
import fs from 'node:fs';
import path from 'node:path';
import { getPaper, paperIds, paperMeta } from '../src/data/gesp/index.js';

const PDF_DIR = 'tmp/pdf-all';
const OUT = 'tmp/pdf-stem-diff.json';
const NEEDLE = 14;

// 只保留字母、数字、汉字。题库题面里的 markdown 反引号、全角括号、空格
// 在官方 PDF 里都没有，任何标点差异都会让「原样包含」判定失效。
//
// 必须先做 NFKC：官方 PDF 的部分字体把常用汉字映射成了康熙部首码位
// （U+2F00–U+2FD5），例如「月」抽出来是 ⽉(U+2F49)、「日」是 ⽇(U+2F47)、
// 「里」是 ⾥(U+2FA5)。这些码位不在 \u4e00-\u9fff 区间，会被下面的标点过滤
// 整段删掉，让「2024年10月8日」塌成「2024年108」从而永久不命中。
// NFKC 能把 214 个康熙部首全部还原为对应统一汉字（已全量验证）。
const normalize = text => String(text)
  .normalize('NFKC')
  .toLowerCase()
  .replace(/[^0-9a-z\u4e00-\u9fff]+/g, '');

// 取题面第一条不是代码、不含空括号占位的自然语言片段
const probes = question => {
  const lines = String(question || '')
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/[^\n]/g, ' '))
    .split('\n')
    .map(line => normalize(line))
    .filter(line => line.length >= NEEDLE);
  const picks = [];
  for (const line of lines) {
    for (const start of [0, Math.max(0, line.length - NEEDLE)]) {
      const slice = line.slice(start, start + NEEDLE);
      if (slice.length === NEEDLE && !picks.includes(slice)) picks.push(slice);
    }
    if (picks.length >= 4) break;
  }
  return picks;
};

const report = [];
for (const pid of paperIds) {
  const meta = paperMeta[pid];
  if (meta?.unofficial) continue;
  const txtPath = path.join(PDF_DIR, `${pid}.pdf.txt`);
  if (!fs.existsSync(txtPath)) {
    report.push({ pid, skipped: 'no-text' });
    continue;
  }

  const pdfNorm = normalize(fs.readFileSync(txtPath, 'utf8'));
  const paper = await getPaper(pid);
  const items = [];

  for (const q of (paper.questions || [])) {
    if (q.type !== 'single' && q.type !== 'judge') continue;
    const candidates = probes(q.question);
    if (!candidates.length) continue;
    const hits = candidates.filter(needle => pdfNorm.includes(needle)).length;
    items.push({ id: q.id, type: q.type, hits, total: candidates.length, found: hits > 0 });
  }

  const found = items.filter(i => i.found).length;
  report.push({
    pid,
    level: meta.level,
    checked: items.length,
    found,
    ratio: items.length ? Number((found / items.length).toFixed(3)) : 1,
    missing: items.filter(i => !i.found).map(i => i.id),
  });
}

fs.writeFileSync(OUT, `${JSON.stringify(report, null, 1)}\n`);

const scored = report.filter(r => !r.skipped).sort((a, b) => a.ratio - b.ratio);
const skipped = report.filter(r => r.skipped);
console.log(`papers ${scored.length}, skipped ${skipped.length}`);
console.log('--- 官方卷里找不到的题最多 25 卷 ---');
for (const row of scored.slice(0, 25)) {
  console.log(`${row.pid}  ${String(row.ratio).padEnd(6)} ${row.found}/${row.checked}  miss=${row.missing.join(',')}`);
}
const buckets = [0, 0.5, 0.7, 0.85, 0.95, 1.01];
console.log('--- 分布 ---');
for (let i = 0; i < buckets.length - 1; i += 1) {
  const n = scored.filter(r => r.ratio >= buckets[i] && r.ratio < buckets[i + 1]).length;
  console.log(`${buckets[i]}~${buckets[i + 1]}: ${n}`);
}
if (skipped.length) console.log('skipped:', skipped.map(r => r.pid).join(','));
