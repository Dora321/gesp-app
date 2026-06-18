const { spawn } = require('child_process');

const DEFAULT_PORT = 4176;
const baseUrl = process.env.SMOKE_BASE_URL || `http://127.0.0.1:${DEFAULT_PORT}`;
const shouldStartServer = !process.env.SMOKE_BASE_URL;

let server;
let browser;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function launchBrowser(chromium) {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    if (!error.message?.includes('Executable doesn')) {
      throw error;
    }

    return chromium.launch({
      channel: 'chrome',
      headless: true,
      args: ['--disable-extensions', '--disable-component-extensions-with-background-pages'],
    });
  }
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await wait(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function run() {
  if (shouldStartServer) {
    server = spawn(
      process.platform === 'win32' ? 'npm.cmd' : 'npm',
      ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(DEFAULT_PORT)],
      { stdio: ['ignore', 'pipe', 'pipe'] }
    );

    server.stdout.on('data', (chunk) => process.stdout.write(chunk));
    server.stderr.on('data', (chunk) => process.stderr.write(chunk));
    await waitForServer(baseUrl);
  }

  const { chromium } = await import('playwright');
  browser = await launchBrowser(chromium);
  const page = await browser.newPage({ viewport: { width: 1366, height: 900 } });
  const messages = [];
  const panelRequests = [];

  page.on('console', (msg) => {
    if (['error', 'warning'].includes(msg.type())) {
      messages.push(`${msg.type()}: ${msg.text()}`);
    }
  });
  page.on('pageerror', (error) => messages.push(`pageerror: ${error.message}`));
  page.on('requestfinished', (request) => {
    if (request.url().includes('ClassroomPointsPanel')) {
      panelRequests.push(request.url());
    }
  });

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  await page.getByText('魔丸聚集地').first().waitFor({ timeout: 10000 });

  await page.getByRole('button', { name: '课程体系' }).first().click();
  await page.getByText('C++ 基础闯关').first().waitFor({ timeout: 20000 });

  const initialPanelRequests = panelRequests.length;
  await page.getByRole('button', { name: '打开课堂积分榜' }).click();
  await page.getByRole('heading', { name: '课堂积分榜' }).waitFor({ timeout: 10000 });
  const afterOpenPanelRequests = panelRequests.length;
  await page.getByRole('button', { name: '最小化课堂积分榜' }).click();
  await page.getByRole('button', { name: '打开课堂积分榜' }).waitFor({ timeout: 10000 });

  await page.goto(`${baseUrl}/python/f1`, { waitUntil: 'domcontentloaded' });
  await page.getByText('什么是 Python?').waitFor({ timeout: 10000 });

  await page.goto(`${baseUrl}/lesson1`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL('**/lesson/1/1', { timeout: 10000 });

  await page.goto(`${baseUrl}/definitely-not-a-real-page`, { waitUntil: 'domcontentloaded' });
  await page.getByText('页面没有找到').waitFor({ timeout: 10000 });

  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    deviceScaleFactor: 3,
  });
  mobilePage.on('console', (msg) => {
    if (['error', 'warning'].includes(msg.type())) {
      messages.push(`${msg.type()}: ${msg.text()}`);
    }
  });
  mobilePage.on('pageerror', (error) => messages.push(`pageerror: ${error.message}`));

  await mobilePage.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(1500);
  const mobileInitial = await mobilePage.evaluate(() => ({
    innerWidth: window.innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));

  await mobilePage.getByRole('button', { name: '打开导航菜单' }).click();
  await mobilePage.getByRole('button', { name: '关闭导航菜单' }).waitFor({ timeout: 10000 });
  const mobileMenu = await mobilePage.evaluate(() => {
    const blockedPoint = document.elementFromPoint(40, window.innerHeight - 40);
    return {
      bodyOverflow: document.body.style.overflow,
      elementAtFloatingArea: blockedPoint?.getAttribute('aria-label') || blockedPoint?.textContent?.trim() || '',
    };
  });

  if (
    mobileInitial.scrollWidth > mobileInitial.innerWidth ||
    mobileInitial.bodyScrollWidth > mobileInitial.innerWidth
  ) {
    throw new Error(`Mobile layout overflows horizontally: ${JSON.stringify(mobileInitial)}`);
  }

  if (mobileMenu.bodyOverflow !== 'hidden') {
    throw new Error('Mobile menu did not lock body scrolling.');
  }

  if (mobileMenu.elementAtFloatingArea.includes('课堂积分榜')) {
    throw new Error('Floating classroom button appears above the open mobile menu.');
  }

  await browser.close();
  browser = null;

  if (initialPanelRequests !== 0 || afterOpenPanelRequests < 1) {
    throw new Error('Classroom points panel did not lazy-load as expected.');
  }

  if (messages.length > 0) {
    throw new Error(`Browser console produced warnings/errors:\n${messages.join('\n')}`);
  }

  console.log('Smoke checks passed.');
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => {
    if (browser) {
      browser.close().catch(() => {});
    }
    if (server) {
      server.kill('SIGTERM');
    }
  });
