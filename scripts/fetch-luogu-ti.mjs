// 用 playwright-core + 系统 Edge 渲染洛谷有题页面，导出可见文本
// 用法: node scripts/fetch-luogu-ti.mjs <problemsetId> [outFile]
import { chromium } from 'playwright-core';
import { writeFileSync } from 'fs';

const pid = process.argv[2];
const out = process.argv[3] || `tmp/luogu-ti-${pid}.txt`;
if (!pid) { console.error('usage: node fetch-luogu-ti.mjs <id>'); process.exit(1); }

const browser = await chromium.launch({ channel: 'msedge', headless: true });
const page = await browser.newPage();
const sub = process.argv[4] || '';
const subQ = process.argv[5] ? `?submission=${process.argv[5]}` : '';
await page.goto(`https://ti.luogu.com.cn/problemset/${pid}${sub ? '/' + sub : ''}${subQ}`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(3000);
// 滚动到底触发懒加载
for (let i = 0; i < 15; i++) { await page.mouse.wheel(0, 2000); await page.waitForTimeout(400); }
const text = await page.evaluate(() => document.body.innerText);
writeFileSync(out, text, 'utf8');
console.log('saved', out, 'chars:', text.length);
console.log(text.slice(0, 600));
await browser.close();
