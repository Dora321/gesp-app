// 抓洛谷 GESP 编程题详情：题面 markdown + 样例 + 限制 + 对应客观题链接
// 依赖 tmp/luogu-prog-list.txt（fetch-luogu-prog-list4.mjs 产出）
import { chromium } from 'playwright-core';
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs';

const OUTDIR = 'tmp/luogu-prog';
if (!existsSync(OUTDIR)) mkdirSync(OUTDIR, { recursive: true });
const list = readFileSync('tmp/luogu-prog-list.txt', 'utf8').split('\n').filter(Boolean).map(l => {
  const i = l.indexOf('|');
  return { id: l.slice(0, i), title: l.slice(i + 1) };
});
console.log('list size:', list.length);

const ctx = await chromium.launchPersistentContext('C:/Users/0/AppData/Local/Temp/luogu-edge-profile', {
  channel: 'msedge', headless: true,
});
const page = await ctx.newPage();
let saved = 0, skipped = 0, fail = 0;
for (const item of list) {
  const out = `${OUTDIR}/${item.id}.json`;
  if (existsSync(out)) { skipped++; continue; }
  try {
    await page.goto(`https://www.luogu.com.cn/problem/${item.id}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForTimeout(2500);
    const data = await page.evaluate(() => {
      let content = null, samples = [], limits = null, hint = null;
      try {
        const inj = window._feInjection;
        const pr = inj?.currentData?.problem || inj?.code === 200 && inj?.currentData?.problem;
        if (pr) {
          content = pr.content || pr.description || null;
          samples = (pr.samples || []).map(s => ({ input: s[0], output: s[1] }));
          limits = pr.limits || null;
          hint = pr.hint || null;
        }
      } catch (e) {}
      const text = document.body.innerText;
      const rel = text.match(/对应的选择、判断题[：:]\s*(https?:\S+)/)?.[1] || '';
      return { content, samples, limits, hint, related: rel, fullText: text.slice(0, 10000) };
    });
    writeFileSync(out, JSON.stringify({ id: item.id, listTitle: item.title, ...data }, null, 1), 'utf8');
    saved++;
    if (saved % 20 === 0) console.log(`progress ${saved} (skip ${skipped})`);
  } catch (e) {
    fail++;
    console.log('FAIL', item.id, e.message.slice(0, 50));
  }
}
console.log(`DONE saved=${saved} skipped=${skipped} fail=${fail}`);
await ctx.close();
