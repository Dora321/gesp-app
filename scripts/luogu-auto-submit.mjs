// 自动交卷抓答案：进入自由练习 → 全选 A → 提交 → 读正确答案
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const pid = process.argv[2];
if (!pid) { console.error('usage: node auto-submit.mjs <problemsetId>'); process.exit(1); }
const OUT = `tmp/luogu-answers/${pid}.json`;
// 断点续跑：已有完整结果则跳过
if (existsSync(OUT)) {
  try {
    const prev = JSON.parse(readFileSync(OUT, 'utf8'));
    if (Object.keys(prev.answers || {}).length >= 20) { console.log('skip', pid, 'already done'); process.exit(0); }
  } catch {}
}

const ctx = await chromium.launchPersistentContext('C:/Users/0/AppData/Local/Temp/luogu-edge-profile', {
  channel: 'msedge', headless: true,
});
const page = await ctx.newPage();
// OAuth 握手
await page.goto('https://ti.luogu.com.cn/problemset', { waitUntil: 'networkidle', timeout: 60000 });
await page.goto(`https://ti.luogu.com.cn/problemset/${pid}`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(1500);
const title = await page.evaluate(() => document.body.innerText.match(/\d+ - [^\n]+/)?.[0] || '');
await page.click('text=自由练习');
await page.waitForTimeout(3000);

// 每组 radio 选第一个（全选 A）
const picked = await page.evaluate(() => {
  const groups = new Map();
  document.querySelectorAll('input[type=radio]').forEach(r => {
    if (!groups.has(r.name)) groups.set(r.name, []);
    groups.get(r.name).push(r);
  });
  let n = 0;
  for (const [, radios] of groups) { radios[0].click(); n++; }
  return { groups: groups.size, picked: n };
});
console.log('radio groups:', JSON.stringify(picked));
if (picked.picked === 0) { console.error('NO RADIO FOUND'); await ctx.close(); process.exit(2); }

// 提交（可能弹确认框）
page.once('dialog', d => d.accept());
await page.click('text=提交答卷');
await page.waitForTimeout(4000);
console.log('URL after submit:', page.url());
// 若出现确认弹层，尝试点击确认按钮
const confirmBtns = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('button').forEach(b => {
    const t = (b.innerText || '').trim();
    if (/确认|确定|提交/.test(t) && t.length < 10) out.push(t);
  });
  return out;
});
if (confirmBtns.length) {
  console.log('confirm buttons:', confirmBtns.join(','));
  try { await page.click(`button:has-text("${confirmBtns[confirmBtns.length - 1]}")`); } catch {}
  await page.waitForTimeout(4000);
}
console.log('URL final:', page.url());

// 读答案
await page.waitForTimeout(2000);
const data = await page.evaluate(() => {
  const text = document.body.innerText;
  const answers = {};
  // 按题分块找「正确答案： X」
  const blocks = text.split(/第 \d+ 题/);
  return { raw: text, count: (text.match(/正确答案/g) || []).length, url: location.href };
});
console.log('正确答案 count:', data.count);
// 主解析：全局顺序正则（答案顺序=题号顺序）；分块解析做交叉验证
const text = data.raw;
const seq = [];
const reSeq = /正确答案：\s*([A-D√×对错])/g;
let sm;
while ((sm = reSeq.exec(text)) !== null) seq.push(sm[1]);
const answers = {};
seq.forEach((a, i) => { answers[i + 1] = a; });
const blocks2 = text.split(/(?=第 \d+ 题)/);
const mismatch = [];
for (const b of blocks2) {
  const qm = b.match(/^第 (\d+) 题/);
  const am = b.match(/正确答案：\s*([A-D√×对错])/);
  if (qm && am) {
    const q = parseInt(qm[1]);
    if (q in answers && answers[q] !== am[1]) mismatch.push(`Q${q}: seq=${answers[q]} block=${am[1]}`);
  }
}
if (mismatch.length) console.log('MISMATCH:', mismatch.join('; '));
console.log('parsed answers:', JSON.stringify(answers));
writeFileSync(OUT, JSON.stringify({ pid, title, url: page.url(), answers }, null, 1), 'utf8');
console.log('saved', OUT);
await ctx.close();
