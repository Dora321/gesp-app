// 判断题对齐体检：题库第 16-25 题是否真的出现在官方 PDF 的「判断题」区段里。
//
// 判断题为短陈述句，官方原文基本是整句照录，因此只要题库题面的 14 字特征串
// 能在官方判断题区段里原样找到，就算命中。命中的题数远低于 10，说明该卷的
// 判断题整批不是官方题（早期批量生成时补的「通用知识点判断」）。
//
// 输出：tmp/judge-alignment.json + 控制台表格
import fs from 'node:fs';
import path from 'node:path';
import { getPaper, paperIds, paperMeta } from '../src/data/gesp/index.js';

const PDF_DIR = 'tmp/pdf-all';
const OUT = 'tmp/judge-alignment.json';
const NEEDLE = 14;

const normalize = text => String(text)
  .toLowerCase()
  .replace(/[^0-9a-z\u4e00-\u9fff]+/g, '');

const probes = question => {
  const lines = String(question || '')
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/[^\n]/g, ' '))
    .split('\n')
    .map(normalize)
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

// 判断题区段的起点：官方卷常用「二、判断题（每题 2 分，共 20 分）」
const judgeSection = (pdfNorm) => {
  for (const marker of ['判断题每题2分共20分', '判断题']) {
    const at = pdfNorm.indexOf(marker);
    if (at > 200) return pdfNorm.slice(at);
  }
  return '';
};

const report = [];
for (const pid of paperIds) {
  const meta = paperMeta[pid];
  if (meta?.unofficial) continue;
  const txtPath = path.join(PDF_DIR, `${pid}.pdf.txt`);
  if (!fs.existsSync(txtPath)) continue;

  const pdfNorm = normalize(fs.readFileSync(txtPath, 'utf8'));
  const section = judgeSection(pdfNorm);
  const paper = await getPaper(pid);
  const judges = (paper.questions || []).filter(q => q.type === 'judge');
  if (!judges.length) continue;

  const missing = [];
  const noProbe = [];
  for (const q of judges) {
    const cands = probes(q.question);
    if (!cands.length) {
      // 判断题太短（归一化后不足 14 字），特征串取不出来，不计入分母
      noProbe.push(q.id);
      continue;
    }
    const hit = cands.some(needle => section.includes(needle));
    if (!hit) missing.push(q.id);
  }

  const checked = judges.length - noProbe.length;
  report.push({
    pid,
    level: meta.level,
    hasSection: Boolean(section),
    judges: judges.length,
    checked,
    found: checked - missing.length,
    missing,
    noProbe,
  });
}

fs.writeFileSync(OUT, `${JSON.stringify(report, null, 1)}\n`);

if (!report.length) {
  console.log(`未找到 ${PDF_DIR}/*.pdf.txt，请先按 docs/question-bank-verification/PDF-CONSISTENCY-AUDIT.md 的方法把官方 PDF 抽成文本层。`);
  process.exit(0);
}

const risky = report.filter(r => r.checked >= 6 && r.found <= 3).sort((a, b) => a.found - b.found);
const clean = report.filter(r => r.checked >= 6 && r.found >= r.checked - 1);
const thin = report.filter(r => r.checked < 6);
console.log(`共 ${report.length} 卷有判断题；可判定 ${report.length - thin.length} 卷`
  + `（特征串不足的 ${thin.length} 卷不算）`);
console.log(`命中 <=3 的 ${risky.length} 卷；命中 >=九成的 ${clean.length} 卷`);
console.log('--- 判断题整批对不上的卷 ---');
for (const r of risky) {
  console.log(`${r.pid.padEnd(13)} 命中 ${r.found}/${r.checked}  缺 ${r.missing.join(',')}`);
}
if (thin.length) console.log('特征串不足：', thin.map(r => `${r.pid}(${r.checked})`).join(' '));
