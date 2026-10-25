// 直接用用户登录过的 profile 访问有题站（不注入 cookie）
import { chromium } from 'playwright-core';

const pid = process.argv[2] || '1197';
const ctx = await chromium.launchPersistentContext('C:/Users/0/AppData/Local/Temp/luogu-edge-profile', {
  channel: 'msedge', headless: true,
});
const page = await ctx.newPage();
// 先完成 OAuth 握手（首次访问会被 302 到主站授权再回来）
await page.goto('https://ti.luogu.com.cn/problemset', { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2000);
await page.goto(`https://ti.luogu.com.cn/problemset/${pid}`, { waitUntil: 'networkidle', timeout: 60000 });
await page.waitForTimeout(2500);
console.log('URL:', page.url());
const main = await page.evaluate(() => (document.querySelector('main') || document.body).innerText.slice(0, 200));
console.log('MAIN:', main.replace(/\n/g, ' | '));
const btns = await page.evaluate(() => {
  const out = [];
  document.querySelectorAll('button, [role="button"]').forEach(el => {
    const t = (el.innerText || '').trim().replace(/\n/g, ' ');
    if (t) out.push(`${el.tagName}:${t}`);
  });
  return out;
});
console.log('BUTTONS:', JSON.stringify(btns.slice(0, 20)));
// 顺带验证主站登录态
await page.goto('https://www.luogu.com.cn/', { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(2000);
const header = await page.evaluate(() => (document.querySelector('header') || document.body).innerText.slice(0, 200).replace(/\n/g, ' '));
console.log('LUOGU HEADER:', header);
await ctx.close();
