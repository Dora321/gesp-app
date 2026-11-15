const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const base = process.env.EXPERIENCE_BASE_URL || 'http://127.0.0.1:5173';
const openLabel = '打开 AI 问答助手';
const closeLabel = '关闭 AI 问答助手';

async function openFromCorner(page, scope = page) {
  const button = scope.getByRole('button', { name: openLabel, exact: true });
  await button.waitFor();
  assert.equal(await button.evaluate(node => getComputedStyle(node).opacity), '0');
  const { width, height } = page.viewportSize();
  await page.mouse.move(width - 2, height - 2);
  await button.evaluate(node => new Promise((resolve, reject) => {
    const deadline = performance.now() + 1500;
    function check() {
      if (getComputedStyle(node).opacity === '1') resolve();
      else if (performance.now() > deadline) reject(new Error('Corner did not reveal the AI button'));
      else requestAnimationFrame(check);
    }
    check();
  }));
  await button.click();
}

async function verifyComposerInk(page) {
  const input = page.getByRole('textbox', { name: '对话输入', exact: true });
  const message = '一个常见的科创作品通常为几个板块？';
  await input.fill(message);
  const appearance = await input.evaluate(node => ({
    text: node.value,
    ink: getComputedStyle(node).webkitTextFillColor,
    unselected: node.selectionStart === node.selectionEnd,
  }));
  assert.deepEqual(appearance, { text: message, ink: 'rgb(35, 40, 61)', unselected: true });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
    await page.addInitScript(() => localStorage.setItem('deepseek_api_key', 'mock-personal-key'));
    for (const path of ['/question-bank', '/question-bank/1/2025-12-l1', '/hardware/arduino/1']) {
      await page.mouse.move(40, 40);
      await page.goto(base + path);
      await openFromCorner(page);
      await page.getByRole('dialog', { name: 'AI 问答助手', exact: true }).waitFor();
      await page.getByRole('button', { name: closeLabel, exact: true }).click();
    }

    const deckFullscreen = page.getByRole('button', { name: '全屏', exact: true });
    await deckFullscreen.click();
    await page.waitForFunction(() => Boolean(document.fullscreenElement));
    await openFromCorner(page);
    assert.equal(await page.getByRole('dialog', { name: 'AI 问答助手', exact: true }).evaluate(
      panel => document.fullscreenElement.contains(panel),
    ), true);
    await verifyComposerInk(page);
    await page.getByRole('button', { name: closeLabel, exact: true }).click();
    await page.evaluate(() => document.exitFullscreen());

    // The deck also has its own F shortcut, which fullscreens the embedded document.
    const deck = page.frameLocator('iframe[title^="第 1 课"]');
    await deck.locator('body').click();
    await page.keyboard.press('f');
    await page.waitForFunction(() => Boolean(document.fullscreenElement?.contentDocument?.fullscreenElement), undefined, { timeout: 8000 });
    await openFromCorner(page, deck);
    const fullscreenAssistant = deck.frameLocator('iframe[title="AI 问答助手"]');
    await fullscreenAssistant.getByRole('button', { name: closeLabel, exact: true }).click();
    await page.evaluate(() => document.exitFullscreen());

    const standaloneUrl = await page.getByRole('link', { name: /独立打开课件/ }).getAttribute('href');
    for (const url of [new URL(standaloneUrl, base).href, `${base}/courseware/electronics-101/`, `${base}/esp-labs/index.html#/?lang=zh`]) {
      await page.mouse.move(40, 40);
      await page.goto(url);
      await openFromCorner(page);
      const ownAssistant = page.frameLocator('iframe[title="AI 问答助手"]');
      await ownAssistant.getByRole('dialog', { name: 'AI 问答助手', exact: true }).waitFor();
      await ownAssistant.getByRole('button', { name: closeLabel, exact: true }).click();
      await page.locator('iframe[title="AI 问答助手"]').waitFor({ state: 'detached' });
      await page.getByRole('button', { name: openLabel, exact: true }).waitFor();
    }

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
    await mobile.addInitScript(() => localStorage.setItem('deepseek_api_key', 'mock-personal-key'));
    for (const path of ['/level1', '/question-bank', '/hardware/arduino/1']) {
      await mobile.goto(base + path);
      const button = mobile.getByRole('button', { name: openLabel, exact: true });
      await button.waitFor();
      assert.equal(await button.evaluate(node => getComputedStyle(node).opacity), '1');
      await button.tap();
      await mobile.getByRole('dialog', { name: 'AI 问答助手', exact: true }).waitFor();
      if (path === '/hardware/arduino/1') await verifyComposerInk(mobile);
    }
    console.log('AI availability passed on desktop, touch screens, fullscreen slide viewer and standalone resources.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
