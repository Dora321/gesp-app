const { spawn } = require('child_process');

const DEFAULT_PORT = 4181;
const serverMode = process.env.COURSE_MASTERY_SERVER === 'preview' ? 'preview' : 'dev';
const externalBaseUrl = process.env.COURSE_MASTERY_BASE_URL || process.env.CPP_L1_MASTERY_BASE_URL;
const localBaseUrl = serverMode === 'preview'
  ? `http://127.0.0.1:${DEFAULT_PORT}/gesp-app`
  : `http://127.0.0.1:${DEFAULT_PORT}`;
const baseUrl = externalBaseUrl || localBaseUrl;
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
  const reviewChecklist = page.getByLabel('课程质量清单');
  if ((await reviewChecklist.count()) !== 1) {
    throw new Error(`${route} ${viewportName}: final section should contain one evidence review checklist.`);
  }

  if (viewportName === 'mobile' && await sidebar.isVisible()) {
    throw new Error(`${route} mobile: selecting a section should close the course menu.`);
  }

  return check;
}

async function assertCompactOpening(page, route, viewportName) {
  const startCard = page.getByLabel('本节开始任务');
  await startCard.waitFor({ state: 'visible', timeout: 10000 });
  const openingHeight = await startCard.evaluate((element) => Math.round(element.getBoundingClientRect().height));
  if (openingHeight > 280) {
    throw new Error(`${route} ${viewportName}: opening task is too tall (${openingHeight}px).`);
  }

  if ((await page.getByLabel('课程质量清单').count()) !== 0) {
    throw new Error(`${route} ${viewportName}: full evidence checklist must not appear before lesson content.`);
  }
}

async function recordObjectiveEvidence(page, route) {
  await page.evaluate(({ lessonRoute }) => {
    const storageKey = 'gesp_lesson_evidence_v1';
    const evidence = JSON.parse(sessionStorage.getItem(storageKey) || '{}');
    evidence[lessonRoute] = {
      kinds: { predictCorrect: true },
      updatedAt: Date.now(),
    };
    sessionStorage.setItem(storageKey, JSON.stringify(evidence));
    window.dispatchEvent(new CustomEvent('gesp:lesson-evidence', {
      detail: { path: lessonRoute, kind: 'predictCorrect' },
    }));
  }, { lessonRoute: route });
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
      const learningData = JSON.parse(localStorage.getItem(storageKey) || '{}');
      return learningData.lessons?.[lessonRoute]?.status;
    }, { storageKey: 'gesp_learning_data', lessonRoute: route });

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
  await assertCompactOpening(page, route, viewportName);
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

  await waitForProgressStatus(page, route, 'learning');
  await page.getByText(/自我勾选只是反思/).waitFor({ state: 'visible', timeout: 10000 });
  await recordObjectiveEvidence(page, route);
  await page.getByText(/可以进入下一课/).waitFor({ state: 'visible', timeout: 10000 });
  await waitForProgressStatus(page, route, 'mastered');
  await assertNoHorizontalOverflow(page, route, viewportName);
}

async function verifyRealObjectiveOutcome(browserInstance) {
  const context = await browserInstance.newContext({ viewport: { width: 1365, height: 900 } });
  const page = await context.newPage();
  const route = '/lesson/2/8';

  await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    localStorage.removeItem('gesp_learning_data');
    sessionStorage.removeItem('gesp_lesson_evidence_v1');
  });
  await page.reload({ waitUntil: 'networkidle' });
  await waitForProgressStatus(page, route, 'learning');

  const sidebar = page.locator('aside');
  await sidebar.getByRole('button', { name: /类型与精度/ }).click();
  const prompt = page.getByText('int x = sqrt(25); 一定能稳妥得到 5 吗？', { exact: true });
  await prompt.waitFor({ state: 'visible', timeout: 10000 });
  const predictionCard = prompt.locator('..');

  await predictionCard.getByRole('button', { name: /一定，sqrt\(25\) 就是 5/ }).click();
  const evidenceAfterWrongAnswer = await page.evaluate(() => {
    const evidence = JSON.parse(sessionStorage.getItem('gesp_lesson_evidence_v1') || '{}');
    return evidence['/lesson/2/8']?.kinds?.predictCorrect || false;
  });
  if (evidenceAfterWrongAnswer) throw new Error('Incorrect prediction must not create objective mastery evidence.');

  await predictionCard.getByRole('button', { name: '再试一次', exact: true }).click();
  await predictionCard.getByRole('button', { name: /不一定，浮点可能/ }).click();
  const evidenceAfterCorrectAnswer = await page.evaluate(() => {
    const evidence = JSON.parse(sessionStorage.getItem('gesp_lesson_evidence_v1') || '{}');
    return evidence['/lesson/2/8']?.kinds?.predictCorrect || false;
  });
  if (!evidenceAfterCorrectAnswer) throw new Error('Correct prediction did not create objective mastery evidence.');

  await sidebar.getByRole('button', { name: /练习与作业/ }).click();
  const check = page.getByLabel('离开前过关检查');
  await check.waitFor({ state: 'visible', timeout: 10000 });
  const reflectionButtons = check.locator('button[aria-pressed]');
  for (let index = 0; index < await reflectionButtons.count(); index += 1) {
    await reflectionButtons.nth(index).click();
  }
  await waitForProgressStatus(page, route, 'mastered');

  await page.reload({ waitUntil: 'networkidle' });
  await waitForProgressStatus(page, route, 'mastered');
  await context.close();
}

async function run() {
  if (shouldStartServer) {
    const serverArgs = ['run', serverMode, '--', '--host', '127.0.0.1', '--port', String(DEFAULT_PORT), '--strictPort'];
    if (serverMode === 'preview') serverArgs.push('--base', '/gesp-app/');

    server = spawn(
      process.platform === 'win32' ? 'npm.cmd' : 'npm',
      serverArgs,
      { stdio: ['ignore', 'pipe', 'pipe'], detached: process.platform !== 'win32' }
    );

    server.stdout.on('data', (chunk) => process.stdout.write(chunk));
    server.stderr.on('data', (chunk) => process.stderr.write(chunk));
    await waitForServer(serverMode === 'preview' ? `${baseUrl}/` : baseUrl);
  }

  const { chromium } = await import('playwright');
  browser = await launchBrowser(chromium);

  // Run viewports sequentially: two contexts navigating heavy lesson pages in
  // parallel against one browser/preview server starve each other and make
  // `waitForProgressStatus` flake out non-deterministically (different route each
  // run). Sequential completes all 48 cases in ~70s, well under the CI timeout.
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

  await verifyRealObjectiveOutcome(browser);

  console.log(`Cross-course mastery UI checks passed for ${routeCases.length * viewports.length} route/viewport cases plus one real objective outcome flow.`);
}

function stopServer() {
  if (!server || server.killed) return;
  // `npm run dev` spawns vite (and its esbuild workers) as children; a plain
  // SIGTERM to npm is not forwarded, leaving orphans whose open stdio pipes keep
  // this process alive. Kill the whole process group so nothing lingers.
  if (server.pid && process.platform !== 'win32') {
    try {
      process.kill(-server.pid, 'SIGKILL');
      return;
    } catch {
      // Group already gone or unavailable; fall back to a direct kill below.
    }
  }
  try {
    server.kill('SIGKILL');
  } catch {
    // Nothing left to kill.
  }
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (browser) {
      await browser.close().catch(() => {});
    }
    stopServer();
    // Force exit: even after cleanup, lingering dev-server handles can keep the
    // event loop alive and hang CI until the job timeout. The work is done here.
    process.exit(process.exitCode ?? 0);
  });
