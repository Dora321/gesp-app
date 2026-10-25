// 打开有界浏览器让用户登录洛谷，检测到登录成功后保存会话
import { chromium } from 'playwright-core';
import { existsSync, writeFileSync } from 'fs';

const AUTH = 'tmp/luogu-auth.json';
const ctx = await chromium.launchPersistentContext('C:/Users/0/AppData/Local/Temp/luogu-edge-profile', {
  channel: 'msedge',
  headless: false,
});
const page = ctx.pages()[0] || await ctx.newPage();
await page.goto('https://www.luogu.com.cn/', { waitUntil: 'domcontentloaded' });
console.log('browser opened, waiting for login...');

// 轮询登录状态：页面上不再出现"登录"按钮（右上角）即视为已登录
let ok = false;
for (let i = 0; i < 180; i++) {
  await page.waitForTimeout(5000);
  try {
    const hasLoginBtn = await page.evaluate(() => {
      const txt = document.body.innerText || '';
      return /登录/.test((document.querySelector('header')?.innerText) || txt.slice(0, 500));
    });
    const url = page.url();
    if (!hasLoginBtn) { ok = true; break; }
    if (i % 12 === 0) console.log(`waiting... ${i * 5}s, url=${url}`);
  } catch { /* 页面跳转中忽略 */ }
}

if (ok) {
  await page.waitForTimeout(2000);
  const cookies = await ctx.cookies();
  const ls = await page.evaluate(() => JSON.stringify(localStorage));
  writeFileSync(AUTH, JSON.stringify({ cookies, localStorage: JSON.parse(ls) }, null, 1), 'utf8');
  console.log('LOGIN OK, saved', AUTH, 'cookies:', cookies.length);
} else {
  console.log('TIMEOUT: 15 分钟内未检测到登录成功');
}
await ctx.close();
