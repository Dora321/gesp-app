const { spawn } = require('child_process');

const DEFAULT_PORT = 4181;
const externalBaseUrl = process.env.COURSE_MASTERY_BASE_URL || process.env.CPP_L1_MASTERY_BASE_URL;
const baseUrl = externalBaseUrl || `http://127.0.0.1:${DEFAULT_PORT}`;
const shouldStartServer = !externalBaseUrl;

const routeCases = [
  ...Array.from({ length: 16 }, (_, index) => ({
    route: `/lesson/1/${index + 1}`,
    family: 'C++ L1',
    checkScrollReset: index === 11,
  })),
  ...[2, 3, 4, 5, 6].map((level) => ({
    route: `/lesson/${level}/8`,
    family: `C++ L${level}`,
    checkScrollReset: true,
  })),
  { route: '/python/f3', family: 'Python foundation', checkScrollReset: true },
  { route: '/python/a1', family: 'Python advanced', checkScrollReset: true },
  { route: '/python/sorting', family: 'Python project', checkScrollReset: true },
];
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

async function openMasteryCheck(page, routeCase, viewportName) {
  const { route } = routeCase;
  const sidebar = page.locator('aside');

  if (viewportName === 'mobile') {
    if (await sidebar.isVisible()) {
      throw new Error(`${route} mobile: closed course menu should not be visible.`);
    }

    await page.getByRole('button', { name: '打开课程目录', exact: true }).click();
    await sidebar.waitFor({ state: 'visible', timeout: 10000 });

    const closeButton = page.getByRole('button', { name: '关闭课程目录', exact: true });
    if ((await closeButton.count()) !== 1) {
      throw new Error(`${route} mobile: expected one named menu close button.`);
    }
  }

  const sectionButtons = sidebar.locator('button');
  const sectionCount = await sectionButtons.count();
  if (sectionCount < 2) {
    throw new Error(`${route} ${viewportName}: expected a multi-section course menu.`);
  }

  await sectionButtons.nth(sectionCount - 1).click();
  const check = page.getByLabel('离开前过关检查');
  await check.waitFor({ state: 'visible', timeout: 10000 });

  if (viewportName === 'mobile' && await sidebar.isVisible()) {
    throw new Error(`${route} mobile: selecting a section should close the course menu.`);
  }

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

async function waitForProgressStatus(page, route, expected, timeoutMs = 10000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    const status = await page.evaluate(({ storageKey, lessonRoute }) => {
      const progress = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return progress[lessonRoute]?.status;
    }, { storageKey: 'gesp_lesson_progress', lessonRoute: route });

    if (status === expected) return;
    await wait(100);
  }

  throw new Error(`${route}: expected progress status ${expected}.`);
}

async function assertSectionChangeScrollsToTop(page, routeCase, viewportName) {
  const { route, checkScrollReset } = routeCase;
  if (!checkScrollReset) return;

  const main = page.locator('main');
  const before = await main.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
    return element.scrollTop;
  });

  if (before <= 2) {
    throw new Error(`${route} ${viewportName}: representative opening section is not scrollable.`);
  }

  const footerButtons = page.locator('footer button');
  const footerButtonCount = await footerButtons.count();
  if (footerButtonCount < 2) {
    throw new Error(`${route} ${viewportName}: expected previous and next navigation buttons.`);
  }
  await footerButtons.nth(footerButtonCount - 1).click();

  const startedAt = Date.now();
  while (Date.now() - startedAt < 3000) {
    const scrollTop = await main.evaluate((element) => element.scrollTop);
    if (scrollTop <= 2) return;
    await wait(50);
  }

  const scrollTop = await main.evaluate((element) => element.scrollTop);
  throw new Error(`${route} ${viewportName}: section change left main scrollTop at ${scrollTop}.`);
}

async function verifyRoute(page, routeCase, viewportName) {
  const { route, family } = routeCase;
  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
  await waitForProgressStatus(page, route, 'learning');
  await assertSectionChangeScrollsToTop(page, routeCase, viewportName);
  const check = await openMasteryCheck(page, routeCase, viewportName);
  await waitForProgressStatus(page, route, 'learning');
  const itemButtons = check.locator('button[aria-pressed]');
  const count = await itemButtons.count();

  if (count < 4) {
    throw new Error(`${route} ${family} ${viewportName}: expected at least 4 mastery items, found ${count}.`);
  }

  for (let index = 0; index < count; index += 1) {
    await itemButtons.nth(index).click();
  }

  await page.getByText(/可以进入下一课/).waitFor({ state: 'visible', timeout: 10000 });
  await waitForProgressStatus(page, route, 'mastered');
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

    for (const routeCase of routeCases) {
      await verifyRoute(page, routeCase, viewport.name);
    }

    await context.close();
  }

  console.log(`Cross-course mastery UI checks passed for ${routeCases.length * viewports.length} route/viewport cases.`);
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
