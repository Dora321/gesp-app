const { spawn } = require('child_process');

const DEFAULT_PORT = 4181;
const baseUrl = process.env.CPP_L1_MASTERY_BASE_URL || `http://127.0.0.1:${DEFAULT_PORT}`;
const shouldStartServer = !process.env.CPP_L1_MASTERY_BASE_URL;

const routes = Array.from({ length: 16 }, (_, index) => `/lesson/1/${index + 1}`);
const viewports = [
  { name: 'desktop', width: 1365, height: 900, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];

let server;
let browser;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Vite is still starting.
    }
    await wait(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

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

async function openMasteryCheck(page, viewportName) {
  if (viewportName === 'mobile') {
    await page.getByRole('button', { name: /打开课程目录/ }).click();
  }

  const sidebar = page.locator('.custom-scrollbar').first();
  await sidebar.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });

  await page.getByRole('button', { name: /离开前检查/ }).click();
  const check = page.getByLabel('离开前过关检查');
  await check.waitFor({ state: 'visible', timeout: 10000 });
  return check;
}

async function assertNoHorizontalOverflow(page, route, viewportName) {
  const metrics = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    bodyScrollWidth: document.body.scrollWidth,
  }));
  const overflow = Math.max(metrics.scrollWidth, metrics.bodyScrollWidth) - metrics.width;

  if (overflow > 2) {
    throw new Error(`${route} overflows horizontally by ${overflow}px on ${viewportName}: ${JSON.stringify(metrics)}`);
  }
}

async function verifyRoute(page, route, viewportName) {
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
  const check = await openMasteryCheck(page, viewportName);
  const itemButtons = check.locator('button[aria-pressed]');
  const count = await itemButtons.count();

  if (count < 4) {
    throw new Error(`${route} ${viewportName}: expected at least 4 mastery items, found ${count}.`);
  }

  for (let index = 0; index < count; index += 1) {
    await itemButtons.nth(index).click();
  }

  await page.getByText(/可以进入下一课/).waitFor({ state: 'visible', timeout: 10000 });
  await assertNoHorizontalOverflow(page, route, viewportName);
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

  for (const viewport of viewports) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
    });
    const page = await context.newPage();

    for (const route of routes) {
      await verifyRoute(page, route, viewport.name);
    }

    await context.close();
  }

  console.log('C++ L1 mastery UI checks passed.');
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
