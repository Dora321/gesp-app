const assert = require('node:assert/strict');
const { readFile } = require('node:fs/promises');
const { chromium } = require('playwright');
const { default: AxeBuilder } = require('@axe-core/playwright');
const base = (process.env.EXPERIENCE_BASE_URL || 'http://127.0.0.1:5173').replace(/\/+$/, '');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const errors = [];
  try {
    for (const width of [320, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(error.message));
      for (const route of ['/ekart/roadmap', '/ekart/toolbox', '/ekart/gallery', '/ekart/parent-portal']) {
        await page.goto(base + route);
        await page.locator('.mw-lab-page h1').waitFor();
        const text = await page.locator('main').innerText();
        assert.ok(!/陈小明|98%|850|62 KM|MISSION COMPLETE|SERVERS: ONLINE/.test(text), route + ' still has fake data');
        assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 2), route + ' overflows');
        const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
        assert.deepEqual(results.violations.filter(v => ['serious', 'critical'].includes(v.impact)).map(v => ({ id: v.id, nodes: v.nodes.map(n => ({ target: n.target, detail: n.failureSummary })) })), [], route + ' accessibility');
      }
      await page.goto(base + '/ekart/toolbox');
      const downloadPromise = page.waitForEvent('download');
      await page.getByRole('link', { name: '下载项目记录单', exact: true }).click();
      const download = await downloadPromise;
      assert.equal(download.suggestedFilename(), 'project-notebook.md');
      assert.ok((await readFile(await download.path(), 'utf8')).includes('测试记录'));
      await context.close();
      console.log('E-Kart routes and real downloads passed at ' + width + 'px');
    }

    const context = await browser.newContext({ viewport: { width: 320, height: 900 }, reducedMotion: 'reduce' });
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(error.message));
    await page.addInitScript(() => { sessionStorage.setItem('ai_chat_messages', '{invalid'); localStorage.setItem('ai_selected_persona_id', 'tieba'); });
    const requests = [];
    await page.route('https://api.deepseek.com/chat/completions', async route => {
      requests.push(route.request().postDataJSON());
      await route.fulfill({ status: 200, contentType: 'text/event-stream', body: 'data: {"choices":[{"delta":{"content":"先观察循环变量。"}}]}\n\ndata: [DONE]\n\n' });
    });
    await page.goto(base + '/python/f3');
    await page.getByRole('button', { name: '打开 AI 问答助手', exact: true }).filter({ visible: true }).click();
    await page.getByRole('button', { name: '打开 AI 设置', exact: true }).click();
    assert.equal(await page.getByText('嘴臭贴吧老哥', { exact: true }).count(), 0);
    const panelBounds = await page.getByRole('dialog', { name: 'AI 问答助手', exact: true }).boundingBox();
    const sendBounds = await page.getByRole('button', { name: '发送', exact: true }).boundingBox();
    assert.ok(sendBounds.x >= panelBounds.x && sendBounds.x + sendBounds.width <= panelBounds.x + panelBounds.width, 'send button must fit inside the mobile assistant');
    await page.getByLabel('DeepSeek API Key', { exact: true }).fill('test-only-not-a-real-key');
    await page.getByRole('button', { name: '保存', exact: true }).click();
    assert.equal(await page.evaluate(() => localStorage.getItem('deepseek_api_key')), 'test-only-not-a-real-key');
    assert.equal(await page.evaluate(() => sessionStorage.getItem('deepseek_api_key')), null);
    await page.reload();
    await page.getByRole('button', { name: '打开 AI 问答助手', exact: true }).filter({ visible: true }).click();
    await page.getByPlaceholder('输入你的问题…（Enter 发送，Shift+Enter 换行）').fill('循环输出为什么少一项？');
    await page.getByPlaceholder('输入你的问题…（Enter 发送，Shift+Enter 换行）').press('Enter');
    await page.getByText('先观察循环变量。', { exact: true }).waitFor();
    assert.ok(requests[0].messages[0].content.includes('/python/f3'));
    assert.ok(requests[0].messages[0].content.includes('一个提示'));
    await page.getByLabel('附带当前页面标题与路径').uncheck();
    await page.getByPlaceholder('输入你的问题…（Enter 发送，Shift+Enter 换行）').fill('再给一个提示');
    await page.getByPlaceholder('输入你的问题…（Enter 发送，Shift+Enter 换行）').press('Enter');
    await page.waitForFunction(() => document.body.innerText.split('先观察循环变量。').length >= 3);
    assert.ok(!requests[1].messages[0].content.includes('/python/f3'));
    await page.getByRole('button', { name: '打开 AI 设置', exact: true }).click();
    assert.equal(await page.evaluate(() => sessionStorage.getItem('deepseek_api_key')), null);
    assert.equal(await page.evaluate(() => localStorage.getItem('deepseek_api_key')), 'test-only-not-a-real-key');
    await page.getByRole('button', { name: '清除', exact: true }).click();
    assert.equal(await page.evaluate(() => localStorage.getItem('deepseek_api_key')), null);
    await page.getByRole('button', { name: '关闭 AI 问答助手', exact: true }).click();
    console.log('Classroom assistant automatic key persistence, reload, clearing, optional context and mocked response passed.');

    await page.goto(base + '/lesson/1/4#programming-practice');
    await page.getByRole('region', { name: '本课上机练习', exact: true }).getByRole('checkbox').first().check();
    await page.goto(base + '/hardware/arduino/1');
    await page.waitForFunction(() => JSON.parse(localStorage.getItem('gesp_learning_data') || '{}').lessons?.['/hardware/arduino/1']);
    await page.goto(base + '/ekart/parent-portal');
    await page.locator('.mw-lab-records a').first().waitFor();
    const backupPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: '导出', exact: true }).click();
    const backup = JSON.parse(await readFile(await (await backupPromise).path(), 'utf8'));
    assert.equal(backup.data.practice['cpp-1-4'][0], true);
    assert.ok(!JSON.stringify(backup).includes('test-only-not-a-real-key'));
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: '一键重置', exact: true }).click();
    await page.getByText('还没有科创课程记录。进入一节课学习后，再回这里查看。', { exact: true }).waitFor();
    page.once('dialog', dialog => dialog.accept());
    await page.getByLabel('选择学习数据文件').setInputFiles({ name: 'backup.json', mimeType: 'application/json', buffer: Buffer.from(JSON.stringify(backup)) });
    await page.locator('.mw-lab-records a').first().waitFor();
    await page.goto(base + '/lesson/1/4#programming-practice');
    assert.ok(await page.getByRole('region', { name: '本课上机练习', exact: true }).getByRole('checkbox').first().isChecked());
    await page.evaluate(() => {
      const original = Storage.prototype.setItem;
      Storage.prototype.setItem = function(key, value) { if (key === 'gesp_learning_data') throw new DOMException('full', 'QuotaExceededError'); return original.call(this, key, value); };
    });
    await page.getByRole('region', { name: '本课上机练习', exact: true }).getByRole('checkbox').nth(1).click();
    await page.getByRole('alert').filter({ hasText: '学习记录未能保存' }).waitFor();
    assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('gesp_learning_data')).practice['cpp-1-4'][1]), false);
    await context.close();
    assert.deepEqual(errors, []);
    console.log('Real course records, backup/restore, practice checks and storage-failure notification passed.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
