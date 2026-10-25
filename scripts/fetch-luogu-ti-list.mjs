// 抓洛谷有题试题列表页全部条目
import { chromium } from 'playwright-core';
import { writeFileSync } from 'fs';

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
const all = [];
for (let p = 1; p <= 6; p++) {
  await page.goto(`https://ti.luogu.com.cn/problemset?page=${p}`, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(2500);
  const items = await page.evaluate(() => {
    const out = [];
    const text = document.body.innerText;
    // 条目格式形如 "1197\n-\nGESP 202512 C++ 一级" 或 "1197 - GESP ..."
    const re = /(\d{3,4})\s*[-\n]+\s*(GESP[^\n]*)/g;
    let m;
    while ((m = re.exec(text)) !== null) out.push(`${m[1]}|${m[2].trim()}`);
    return out;
  });
  all.push(...items);
  console.log(`page ${p}: ${items.length} items`);
}
writeFileSync('tmp/luogu-ti-list.txt', [...new Set(all)].sort((a, b) => parseInt(a) - parseInt(b)).join('\n'), 'utf8');
console.log('total unique:', new Set(all).size);
await browser.close();
