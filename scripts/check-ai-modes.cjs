const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.EXPERIENCE_BASE_URL || 'http://127.0.0.1:5173';

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [390, 1366]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const personal = [], classroom = [], errors = [];
      page.on('pageerror', error => errors.push(error.message));
      let active = false, remaining = 3, gatewayCalls = 0;
      await page.route('**/api/**', async route => {
        gatewayCalls++;
        const path = new URL(route.request().url()).pathname;
        const state = { remaining, expiresAt: Date.now() + 3600000 };
        if (path.endsWith('/redeem')) { active = true; return route.fulfill({ json: { ...state, token: 'test-classroom-session' } }); }
        if (!active) return route.fulfill({ status: 401, json: { message: '课堂已结束或口令已更换。' } });
        if (path === '/api/chat') {
          classroom.push(route.request().postDataJSON());
          assert.ok(!JSON.stringify(route.request().headers()).includes('legacy-personal-key'));
          assert.ok(!JSON.stringify(classroom.at(-1)).includes('legacy-personal-key'));
          assert.equal(Object.hasOwn(classroom.at(-1), 'context'), false);
          assert.equal(route.request().headers().referer, undefined);
          remaining = 0;
          return route.fulfill({ contentType: 'text/event-stream', body: 'data: {"choices":[{"delta":{"content":"课堂回答"}}]}\n\ndata: [DONE]\n\n' });
        }
        return route.fulfill({ json: state });
      });
      await page.route('https://api.deepseek.com/chat/completions', async route => {
        personal.push(route.request().headers().authorization);
        const body = route.request().postDataJSON();
        assert.equal(body.messages[0].role, 'system');
        assert.ok(!body.messages[0].content.includes('页面背景'));
        assert.equal(route.request().headers().referer, undefined);
        return route.fulfill({ contentType: 'text/event-stream', body: 'data: {"choices":[{"delta":{"content":"个人回答"}}]}\n\ndata: [DONE]\n\n' });
      });
      await page.goto(base + '/');
      await page.evaluate(() => localStorage.setItem('deepseek_api_key', 'legacy-personal-key'));
      const open = () => page.getByRole('button', { name: '打开 AI 问答助手', exact: true }).filter({ visible: true }).click();
      const settings = () => page.getByRole('button', { name: '打开 AI 设置', exact: true }).click();
      const input = page.getByRole('textbox', { name: '对话输入', exact: true });
      await open();
      await page.getByText('个人模式 · 使用自己的 API Key', { exact: true }).waitFor();
      assert.equal(gatewayCalls, 0, 'Personal mode must work without the classroom service');
      await input.fill('旧密钥可以使用吗？'); await input.press('Enter');
      await page.getByText('个人回答', { exact: true }).waitFor();
      assert.deepEqual(personal, ['Bearer legacy-personal-key']);
      await settings();
      const settingsPanel = page.getByRole('region', { name: 'AI 设置', exact: true });
      assert.equal(await input.isVisible(), false);
      const lastPersona = settingsPanel.getByRole('button', { name: /鼓励型教练/ });
      await lastPersona.scrollIntoViewIfNeeded();
      const personaBounds = await lastPersona.boundingBox();
      const settingsBounds = await settingsPanel.boundingBox();
      assert.ok(personaBounds.y + personaBounds.height <= settingsBounds.y + settingsBounds.height + 1);
      await page.getByRole('button', { name: '返回对话', exact: true }).click();
      await page.getByText('个人回答', { exact: true }).waitFor();
      assert.ok(await input.isVisible());
      assert.equal(await page.getByRole('checkbox', { name: /附带当前页面/ }).count(), 0);
      await settings();
      await page.getByRole('button', { name: '课堂模式', exact: true }).click();
      await page.getByLabel('课堂口令', { exact: true }).fill('123456');
      await page.getByRole('button', { name: '激活课堂', exact: true }).click();
      await page.getByText(/全班剩余 3 次/).waitFor();
      await input.fill('使用课堂额度'); await input.press('Enter');
      await page.getByText('课堂回答', { exact: true }).waitFor();
      await page.getByText(/全班剩余 0 次/).waitFor();
      assert.ok(await input.isDisabled());
      assert.equal(personal.length, 1, 'Exhausted classroom quota must not fall back to personal billing');
      assert.equal(classroom.length, 1);
      await settings(); await page.getByRole('button', { name: '个人模式', exact: true }).click();
      await page.getByLabel('DeepSeek API Key', { exact: true }).fill('new-personal-key');
      await page.getByRole('button', { name: '保存个人密钥', exact: true }).click();
      await page.reload(); await open();
      await page.getByText('个人模式 · 使用自己的 API Key', { exact: true }).waitFor();
      await input.fill('刷新后使用新密钥'); await input.press('Enter');
      await page.waitForFunction(() => document.body.innerText.split('个人回答').length >= 3);
      assert.equal(personal.at(-1), 'Bearer new-personal-key');
      await settings(); await page.getByRole('button', { name: '清除个人密钥', exact: true }).click();
      assert.equal(await page.evaluate(() => localStorage.getItem('deepseek_api_key')), null);
      await page.getByRole('button', { name: '返回对话', exact: true }).click();
      assert.ok(await input.isDisabled());
      assert.deepEqual(errors, []);
      await context.close();
      console.log(`AI checks passed at ${width}px: both modes, separate credentials, settings scrolling and no page context.`);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
