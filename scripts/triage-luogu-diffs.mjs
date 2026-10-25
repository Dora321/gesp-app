/**
 * 客观题差异终裁：把 159 处「答案不一致」按题面是否同题分成两类
 *  - same-stem：题面一致但答案不同 → 真错，需回官方 PDF 裁决
 *  - diff-stem：题面本身不同 → 占位/自编题，需按官方题面重录
 * 输入：tmp/luogu-compare.json（差异清单）、tmp/luogu-stems/<pid>.txt（洛谷题面全文）
 * 输出：tmp/luogu-diff-triage.json + 控制台汇总
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { getPaper } from '../src/data/gesp/index.js';

const cmp = JSON.parse(readFileSync('tmp/luogu-compare.json', 'utf8'));
const LETTERS = ['A', 'B', 'C', 'D'];

function normText(s) {
  return (s || '')
    .replace(/^#+\s*.+$/gm, '')
    .replace(/[*`$\\]/g, '')
    .replace(/[ \t\u3000]+/g, '')
    .replace(/\n+/g, '');
}

// Dice 2-gram 相似度
function dice(a, b) {
  if (!a || !b) return 0;
  const grams = (s) => {
    const m = new Map();
    for (let i = 0; i < s.length - 1; i++) {
      const g = s.slice(i, i + 2);
      m.set(g, (m.get(g) || 0) + 1);
    }
    return m;
  };
  const ga = grams(a), gb = grams(b);
  let inter = 0, total = 0;
  for (const [g, c] of ga) { total += c; if (gb.has(g)) inter += Math.min(c, gb.get(g)); }
  for (const [, c] of gb) total += c;
  return (2 * inter) / total;
}

// 把洛谷整页文本切成每题块
// 注意：页首有「题目列表 第1题 第2题 ...」导航，同一题号会出现两次，
// 正文块在导航之后，故后出现的覆盖前面的（正则为空行分隔的正文形态优先）
function splitLuoguQuestions(text) {
  const blocks = {};
  const parts = text.split(/(?=第\s*\d+\s*题)/);
  for (const p of parts) {
    const m = p.match(/^第\s*(\d+)\s*题/);
    if (!m) continue;
    const qid = Number(m[1]);
    const body = p.slice(m[0].length).trim();
    // 导航块只有题号没有正文（长度很短且不含选项标记），跳过
    if (body.length < 30) continue;
    blocks[qid] = body;
  }
  return blocks;
}

// 题库题干归一：去 markdown/LaTeX/空白，只留可比较的正文字符
function normBank(q) {
  let x = (q?.question || '');
  x = x.replace(/^#+\s*.+$/gm, '');
  x = x.replace(/```[\s\S]*?```/g, (m) => m.replace(/```\w*/g, '')); // 保留代码内容
  x = x.replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');                    // md 链接留文字
  x = x.replace(/[*`$\\]/g, '');
  return x.replace(/[ \t\u3000]+/g, '').replace(/\n+/g, '');
}

// 判同题：题干前 40 字在洛谷块中命中，或 Dice 达到阈值
function judgeSame(bankNorm, luoguNorm) {
  const head = bankNorm.slice(0, 40);
  const hit = head.length >= 12 && luoguNorm.includes(head);
  const sim = dice(bankNorm, luoguNorm);
  return { hit, sim };
}

const stemFiles = new Set(
  (existsSync('tmp/luogu-stems') ? readdirSync('tmp/luogu-stems') : [])
    .filter(f => f.endsWith('.txt')).map(f => f.replace('.txt', ''))
);

const rows = [];
for (const rep of (cmp.report || [])) {
  const diffs = rep.diffs || [];
  if (!diffs.length) continue;
  const pid = rep.paperId;
  const hasStem = stemFiles.has(pid);
  let blocks = {};
  if (hasStem) {
    blocks = splitLuoguQuestions(readFileSync(`tmp/luogu-stems/${pid}.txt`, 'utf8'));
  }
  const paper = await getPaper(pid);
  const qs = paper.questions || [];

  for (const d of diffs) {
    const qid = d.q ?? d.qid;
    const q = qs.find(x => x.id === qid);
    const bankNorm = normBank(q);
    const luoguBlock = blocks[qid] || '';
    const luoguNorm = normText(luoguBlock);
    const { hit, sim } = hasStem ? judgeSame(bankNorm, luoguNorm) : { hit: false, sim: 0 };
    const verdict = !hasStem ? 'no-stem-captured'
      : (hit || sim >= 0.7) ? 'same-stem'     // 题面一致 → 答案真矛盾，回 PDF 裁决
      : sim >= 0.45 ? 'partial-stem'          // 部分重合，需人工看
      : 'diff-stem';                          // 题面不同 → 占位/自编题
    rows.push({
      paperId: pid,
      qid,
      type: d.type,
      bankAnswer: d.bank,
      luoguAnswer: d.luogu,
      stemSimilarity: Number(sim.toFixed(3)),
      headHit: hit,
      verdict,
      bankStemHead: (q?.question || '').replace(/\s+/g, ' ').slice(0, 90),
      luoguStemHead: luoguBlock.replace(/\s+/g, ' ').slice(0, 90),
    });
  }
}

const summary = {
  total: rows.length,
  sameStem: rows.filter(r => r.verdict === 'same-stem').length,
  partialStem: rows.filter(r => r.verdict === 'partial-stem').length,
  diffStem: rows.filter(r => r.verdict === 'diff-stem').length,
  noStem: rows.filter(r => r.verdict === 'no-stem-captured').length,
};
writeFileSync('tmp/luogu-diff-triage.json', JSON.stringify({ summary, rows }, null, 1));

console.log(JSON.stringify(summary, null, 1));

const byPaper = {};
for (const r of rows) {
  byPaper[r.paperId] = byPaper[r.paperId] || { same: 0, partial: 0, diff: 0, noStem: 0 };
  if (r.verdict === 'same-stem') byPaper[r.paperId].same++;
  else if (r.verdict === 'partial-stem') byPaper[r.paperId].partial++;
  else if (r.verdict === 'diff-stem') byPaper[r.paperId].diff++;
  else byPaper[r.paperId].noStem++;
}
console.log('\n按卷分布（same=题面一致答案矛盾，diff=题面不同）：');
console.log(Object.entries(byPaper).sort((a, b) => (b[1].same + b[1].partial + b[1].diff) - (a[1].same + a[1].partial + a[1].diff))
  .map(([k, v]) => `${k}: same${v.same}/partial${v.partial}/diff${v.diff}${v.noStem ? '/noStem' + v.noStem : ''}`).join('\n'));

console.log('\nsame-stem 样例（需回 PDF 裁决）：');
for (const r of rows.filter(r => r.verdict === 'same-stem').slice(0, 6)) {
  console.log(` ${r.paperId} Q${r.qid} ${r.type} 题库${LETTERS[r.bankAnswer] ?? r.bankAnswer}/洛谷${LETTERS[r.luoguAnswer] ?? r.luoguAnswer} sim=${r.stemSimilarity}`);
  console.log(`   题库: ${r.bankStemHead}`);
  console.log(`   洛谷: ${r.luoguStemHead}`);
}
