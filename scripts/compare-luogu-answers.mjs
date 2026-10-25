// 比对洛谷有题答案与题库运行时答案
// 用法: node scripts/compare-luogu-answers.mjs [--out tmp/luogu-compare.json]
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'fs';
import { getPaper, paperIds } from '../src/data/gesp/index.js';

// 1. paperId ↔ problemset 映射（从洛谷列表标题解析）
const listText = readFileSync('tmp/luogu-ti-list.txt', 'utf8');
const cnLevel = { 一: 1, 二: 2, 三: 3, 四: 4, 五: 5, 六: 6, 七: 7, 八: 8 };
const map = {}; // pid(problemset) -> paperId
for (const line of listText.split('\n')) {
  const m = line.match(/^(\d+)\|GESP (\d{6}) C\+\+ ([一二三四五六七八])级/);
  if (m) {
    const paperId = `${m[2].slice(0, 4)}-${m[2].slice(4, 6)}-l${cnLevel[m[3]]}`;
    map[m[1]] = paperId;
  }
}
// 样题卷 1101-1108 没有对应 paperId（题库无样题卷），跳过

// 2. 读洛谷答案文件
const dir = 'tmp/luogu-answers';
const luogu = {}; // paperId -> {pid, answers}
for (const f of readdirSync(dir)) {
  if (!f.endsWith('.json')) continue;
  const pid = f.replace('.json', '');
  const paperId = map[pid];
  if (!paperId) continue;
  const j = JSON.parse(readFileSync(`${dir}/${f}`, 'utf8'));
  luogu[paperId] = { problemsetId: pid, answers: j.answers };
}

// 3. 逐卷比对
const report = [];
let totMatch = 0, totDiff = 0, totSkip = 0;
for (const paperId of Object.keys(luogu).sort()) {
  if (!paperIds.includes(paperId)) { report.push({ paperId, status: 'not-in-bank' }); continue; }
  const p = await getPaper(paperId);
  const lg = luogu[paperId];
  const qs = [];
  for (const [qno, la] of Object.entries(lg.answers)) {
    const q = p.questions.find(x => x.id === parseInt(qno));
    if (!q) { qs.push({ q: +qno, issue: 'missing-in-bank' }); totSkip++; continue; }
    if (q.type === 'programming') { totSkip++; continue; }
    let bankAns;
    if (q.type === 'single') bankAns = ['A', 'B', 'C', 'D'][q.answer];
    else if (q.type === 'judge') bankAns = q.answer === 0 ? 'A' : 'B'; // A=正确/√, B=错误/×
    else { totSkip++; continue; }
    const match = bankAns === la;
    if (match) totMatch++; else totDiff++;
    qs.push({ q: +qno, type: q.type, luogu: la, bank: bankAns, match });
  }
  const diffs = qs.filter(x => x.match === false);
  report.push({ paperId, problemsetId: lg.problemsetId, total: qs.length, diffs });
}

// 4. 输出
const out = { generatedAt: new Date().toISOString(), summary: { papers: report.length, match: totMatch, diff: totDiff, skip: totSkip }, report };
writeFileSync('tmp/luogu-compare.json', JSON.stringify(out, null, 1), 'utf8');
console.log(`比对完成：${report.length} 卷，一致 ${totMatch} 题，差异 ${totDiff} 题`);
for (const r of report) {
  if (r.diffs && r.diffs.length) {
    console.log(`${r.paperId} (${r.problemsetId}): ${r.diffs.length} 处差异 -> ${r.diffs.map(d => `Q${d.q} 洛谷${d.luogu}/题库${d.bank}`).join(', ')}`);
  }
}
