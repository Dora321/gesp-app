/**
 * 洛谷编程题 ↔ 题库编程题三重比对
 * 1) 标题匹配（[GESP202603 六级] 选数）
 * 2) 样例逐字节比对
 * 3) 题面文本相似度（去空白后 Dice 系数）
 * 输出 tmp/luogu-prog-compare.json
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { getPaper, paperIds } from '../src/data/gesp/index.js';

const LUOGU_DIR = 'tmp/luogu-prog';

function norm(s) {
  return (s || '')
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// 从洛谷 fullText 解析样例对
const FOOTER_RE = /\n*关于洛谷[\s\S]*$/;
function stripFooter(s) {
  return norm(s.replace(FOOTER_RE, ''));
}
function parseSamples(text) {
  const out = [];
  const body = stripFooter(text).split('说明/提示')[0];
  const re = /输入\s*#(\d+)\s*复制?\s*([\s\S]*?)\s*输出\s*#\1\s*复制?\s*([\s\S]*?)(?=输入\s*#\d+|$)/g;
  let m;
  while ((m = re.exec(body)) !== null) {
    out.push({ input: norm(m[2]), output: norm(m[3]) });
  }
  return out;
}

// 从洛谷 fullText 解析题面主体（题目描述到输入输出样例之前）
// 注意：页面导航区也含「题目描述」字样，必须取最后一次出现（正文标题）
function parseStem(text) {
  const start = text.lastIndexOf('\n题目描述\n');
  if (start === -1) return '';
  // 终点：正文「输入格式」或「输入输出样例」（都取最后一次出现，避开导航区）
  const cands = ['\n输入格式', '\n输入输出样例']
    .map(k => text.lastIndexOf(k))
    .filter(i => i > start);
  const end = cands.length ? Math.min(...cands) : text.length;
  return norm(text.slice(start, end)).replace(/^题目描述\s*/, '');
}

// Dice 相似度（字符 2-gram）
function dice(a, b) {
  const A = a.replace(/\s+/g, '');
  const B = b.replace(/\s+/g, '');
  if (!A || !B) return 0;
  const grams = (s) => {
    const m = new Map();
    for (let i = 0; i < s.length - 1; i++) {
      const g = s.slice(i, i + 2);
      m.set(g, (m.get(g) || 0) + 1);
    }
    return m;
  };
  const ga = grams(A), gb = grams(B);
  let inter = 0, total = 0;
  for (const [g, c] of ga) { total += c; if (gb.has(g)) inter += Math.min(c, gb.get(g)); }
  for (const [, c] of gb) total += c;
  return (2 * inter) / total;
}

// 收集洛谷题
const luogu = [];
for (const f of readdirSync(LUOGU_DIR)) {
  if (!f.endsWith('.json')) continue;
  const j = JSON.parse(readFileSync(`${LUOGU_DIR}/${f}`, 'utf8'));
  const title = (j.listTitle || '').trim();
  const m = title.match(/\[GESP(\d{6})\s*([一二三四五六七八])级\]\s*(.+)/);
  luogu.push({
    luoguId: j.id,
    title,
    period: m ? m[1] : null,          // 202603
    levelCn: m ? m[2] : null,         // 六
    name: m ? m[3].trim() : title,
    relatedPid: (j.related || '').match(/problemset\/(\d+)/)?.[1] || null,
    samples: parseSamples(j.fullText || ''),
    stem: parseStem(j.fullText || ''),
  });
}

// 收集题库编程题
// 题库编程题有两种形态：
//  A) question 字段承载完整 markdown（含 "# [GESP...] 名" 标题）
//  B) 结构化：title + description + inputDescription + outputDescription + samples
function bankStem(q) {
  const qtext = (q.question || '').trim();
  if (qtext) return qtext;
  const parts = [];
  if (q.description) parts.push('## 题目描述\n\n' + q.description);
  if (q.inputDescription) parts.push('## 输入格式\n\n' + q.inputDescription);
  if (q.outputDescription) parts.push('## 输出格式\n\n' + q.outputDescription);
  return parts.join('\n\n');
}

const bank = [];
for (const pid of paperIds) {
  let p;
  try { p = await getPaper(pid); } catch { continue; }
  // 编程题可能在 questions（type=programming）或独立 programmingQuestions 数组
  const all = [
    ...(p.questions || []).filter(q => q.type === 'programming'),
    ...(p.programmingQuestions || []).filter(q => q.type === 'programming' || !q.type),
  ];
  for (const q of all) {
    const qtext = (q.question || '').trim();
    const firstLine = qtext.split('\n').find(l => l.trim().startsWith('#')) || '';
    let tm = firstLine.match(/\[GESP(\d{6})\s*([一二三四五六七八])级\]\s*(.+)/);
    // 结构化形态：期次/级别取自 paperId，名称取 title
    const pm = pid.match(/^(\d{4})-(\d{2})-l(\d)$/);
    const periodFromPid = pm ? `${pm[1]}${pm[2]}` : null;
    bank.push({
      paperId: pid,
      qid: q.id,
      title: firstLine.replace(/^#+\s*/, '').trim() || (q.title || ''),
      period: tm ? tm[1] : periodFromPid,
      levelCn: tm ? tm[2] : (pm ? '一二三四五六七八'[Number(pm[3]) - 1] : null),
      name: tm ? tm[3].trim() : (q.title || ''),
      samples: (q.samples || []).map(s => ({ input: norm(s.input), output: norm(s.output) })),
      stem: bankStem(q),
      shape: qtext ? 'question' : 'structured',
    });
  }
}

function qtitleFallback(q) {
  const m = (q.question || '').match(/^#\s*(.+)$/m);
  return m ? m[1].trim() : '';
}

// 匹配：先按 期次+级别+名称，再按名称模糊
const report = { generatedAt: new Date().toISOString(), summary: {}, papers: [] };
const usedLuogu = new Set();
const pairs = [];

for (const b of bank) {
  let cand = luogu.find(l => !usedLuogu.has(l.luoguId) && l.period === b.period && l.levelCn === b.levelCn && l.name === b.name);
  if (!cand) {
    // 名称近似（去括号/空格后包含）
    cand = luogu.find(l => !usedLuogu.has(l.luoguId) && l.name.replace(/\s/g, '') === b.name.replace(/\s/g, ''));
  }
  if (!cand) {
    pairs.push({ bank: b, luogu: null });
    continue;
  }
  usedLuogu.add(cand.luoguId);
  // 同口径：只比「题目描述」段（截到 输入格式/输入输出样例 之前），并归一 markdown 与 LaTeX
  const LATEX_MAP = [
    [/\\leq?\b/g, '≤'], [/\\geq?\b/g, '≥'], [/\\neq\b/g, '≠'], [/\\times\b/g, '×'],
    [/\\cdot\b/g, '·'], [/\\cdots\b/g, '…'], [/\\ldots\b/g, '…'], [/\\in\b/g, '∈'],
    [/\\sum\b/g, 'Σ'], [/\\infty\b/g, '∞'], [/\\pmod\b/g, 'mod'], [/\\bmod\b/g, 'mod'],
    [/\\quad\b/g, ' '], [/\\qquad\b/g, ' '], [/\\,/g, ''], [/\\;/g, ''], [/\\\\/g, ''],
    [/\\left|\\right/g, ''], [/\\\{/g, '{'], [/\\\}/g, '}'], [/\\[a-zA-Z]+\{([^{}]*)\}/g, '$1'],
    [/\\[a-zA-Z]+/g, ''],
  ];
  const stemOf = (s) => {
    // 先按「输入格式/输入输出样例」截断（必须在删标题行之前，否则标题行被删后锚点消失）
    let x = s.replace(/^题目描述\s*/, '');
    const cut = x.search(/输入格式|输入输出样例/);
    if (cut !== -1) x = x.slice(0, cut);
    x = x.replace(/^#+\s*.+$/gm, '');   // 再去 markdown 标题行
    for (const [re, rep] of LATEX_MAP) x = x.replace(re, rep);
    x = x.replace(/[*`$\\]/g, '').replace(/复制/g, '');
    x = x.replace(/[ \t\u3000]+/g, '').replace(/\n+/g, '');
    return x;
  };
  const sim = dice(stemOf(b.stem), stemOf(cand.stem));

  // 样例比对：逐个比 input/output（忽略行尾空白）
  const n = Math.max(b.samples.length, cand.samples.length);
  const sampleDiffs = [];
  for (let i = 0; i < n; i++) {
    const bs = b.samples[i], ls = cand.samples[i];
    if (!bs || !ls) { sampleDiffs.push({ index: i + 1, issue: !bs ? '洛谷多出样例' : '洛谷缺样例', luogu: ls || null, bank: bs || null }); continue; }
    if (norm(bs.input) !== norm(ls.input) || norm(bs.output) !== norm(ls.output)) {
      sampleDiffs.push({ index: i + 1, issue: '内容不同', luogu: ls, bank: bs });
    }
  }
  pairs.push({ bank: b, luogu: cand, stemSimilarity: Number(sim.toFixed(3)), sampleDiffs });
}

// 汇总
const matched = pairs.filter(p => p.luogu);
const unmatchedBank = pairs.filter(p => !p.luogu).map(p => ({ paperId: p.bank.paperId, qid: p.bank.qid, title: p.bank.title }));
const unmatchedLuogu = luogu.filter(l => !usedLuogu.has(l.luoguId)).map(l => ({ luoguId: l.luoguId, title: l.title }));

const sampleMismatch = matched.filter(p => p.sampleDiffs.length > 0);
const lowSim = matched.filter(p => p.stemSimilarity < 0.6);

report.summary = {
  luoguCount: luogu.length,
  bankCount: bank.length,
  matched: matched.length,
  unmatchedBank: unmatchedBank.length,
  unmatchedLuogu: unmatchedLuogu.length,
  sampleMismatchPapers: sampleMismatch.length,
  sampleMismatchCount: sampleMismatch.reduce((a, p) => a + p.sampleDiffs.length, 0),
  lowSimilarityCount: lowSim.length,
  avgStemSimilarity: Number((matched.reduce((a, p) => a + p.stemSimilarity, 0) / (matched.length || 1)).toFixed(3)),
};
report.papers = matched.map(p => ({
  paperId: p.bank.paperId,
  qid: p.bank.qid,
  title: p.bank.title,
  luoguId: p.luogu.luoguId,
  relatedPid: p.luogu.relatedPid,
  stemSimilarity: p.stemSimilarity,
  samples: { bank: p.bank.samples.length, luogu: p.luogu.samples.length },
  sampleDiffs: p.sampleDiffs,
}));
report.unmatchedBank = unmatchedBank;
report.unmatchedLuogu = unmatchedLuogu;

writeFileSync('tmp/luogu-prog-compare.json', JSON.stringify(report, null, 1));
console.log(JSON.stringify(report.summary, null, 1));
console.log('\n样例不一致:', sampleMismatch.length, '题');
for (const p of sampleMismatch.slice(0, 10)) {
  console.log(` ${p.bank.paperId} Q${p.bank.qid} ${p.bank.title} | 题库${p.bank.samples.length}例 洛谷${p.luogu.samples.length}例 | 差异${p.sampleDiffs.length}`);
}
console.log('\n相似度低于0.6:', lowSim.length, '题');
for (const p of lowSim.slice(0, 10)) console.log(` ${p.bank.paperId} Q${p.bank.qid} ${p.bank.title} | sim=${p.stemSimilarity}`);
console.log('\n题库未匹配:', unmatchedBank.length);
for (const u of unmatchedBank.slice(0, 15)) console.log(` ${u.paperId} Q${u.qid} ${u.title}`);
console.log('\n洛谷未匹配:', unmatchedLuogu.length);
for (const u of unmatchedLuogu.slice(0, 15)) console.log(` ${u.luoguId} ${u.title}`);
