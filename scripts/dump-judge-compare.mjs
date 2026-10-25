// 打印某卷「题库判断题」与「官方 PDF 判断题区段」的前 N 题，用于人工确认
// 用法：node scripts/dump-judge-compare.mjs 2025-06-l4 [题数]
import fs from 'node:fs';
import { getPaper } from '../src/data/gesp/index.js';

const pid = process.argv[2];
const n = Number(process.argv[3] || 3);
if (!pid) {
  console.error('用法: node scripts/dump-judge-compare.mjs <paperId> [题数]');
  process.exit(1);
}

const raw = fs.readFileSync(`tmp/pdf-all/${pid}.pdf.txt`, 'utf8').replace(/\n\n/g, '\n');
const at = raw.search(/判断题/);
const section = at > 0 ? raw.slice(at) : raw;
const blocks = section.split(/第\s*(\d{1,2})\s*题/).slice(1);
const official = [];
for (let i = 0; i < blocks.length - 1; i += 2) {
  official.push({ no: Number(blocks[i]), text: blocks[i + 1].trim() });
}

const paper = await getPaper(pid);
const judges = (paper.questions || []).filter(q => q.type === 'judge');

console.log(`## ${pid}  题库判断题 ${judges.length} 题 / 官方区段解析 ${official.length} 题\n`);
for (let i = 0; i < n; i += 1) {
  const b = judges[i];
  const o = official[i];
  console.log(`--- 第 ${i + 1} 题 ---`);
  console.log(`题库 Q${b?.id}：${String(b?.question || '').replace(/\s+/g, ' ').slice(0, 110)}`);
  console.log(`官方 Q${o?.no}：${String(o?.text || '').replace(/\s+/g, ' ').slice(0, 110)}`);
  console.log('');
}
