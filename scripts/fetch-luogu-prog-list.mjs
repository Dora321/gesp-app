// 按关键词 GESP 抓洛谷题目列表（表格行文本正则提取）
import { chromium } from 'playwright-core';
import { writeFileSync } from 'fs';

const ctx = await chromium.launchPersistentContext('C:/Users/0/AppData/Local/Temp/luogu-edge-profile', {
  channel: 'msedge', headless: true,
});
const page = await ctx.newPage();
const all = new Map();
let total = 0;
for (let p = 1; p <= 20; p++) {
  await page.goto(`https://www.luogu.com.cn/problem/list?keyword=GESP&page=${p}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await page.waitForTimeout(3500);
  const res = await page.evaluate(() => {
    const text = document.body.innerText;
    const tot = +(text.match(/共计\s*(\d+)\s*条结果/)?.[1] || 0);
    const out = [];
    // 表格行：P15800 \t [GESP202603 六级] 选数 \t ...
    const re = /([PB]\d{4,5})\s*\n?\s*(\[GESP[^\n]*)/g;
    let m;
    while ((m = re.exec(text)) !== null) out.push(`${m[1]}|${m[2].trim()}`);
    return { tot, out };
  });
  total = res.tot || total;
  console.log(`page ${p}: ${res.out.length} rows (total ${res.tot})`);
  if (!res.out.length) break;
  for (const x of res.out) { const [id, ...r] = x.split('|'); all.set(id, r.join('|')); }
  if (all.size >= total) break;
}
const lines = [...all.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([id, t]) => `${id}|${t}`);
writeFileSync('tmp/luogu-prog-list.txt', lines.join('\n'), 'utf8');
console.log('TOTAL:', lines.length);
console.log(lines.slice(0, 4).join('\n'));
await ctx.close();
