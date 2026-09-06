const { spawn } = require('child_process');

const DEFAULT_PORT = 4179;
const baseUrl = (process.env.A11Y_BASE_URL || `http://127.0.0.1:${DEFAULT_PORT}/gesp-app/`).replace(/\/?$/, '/');
const shouldStartServer = !process.env.A11Y_BASE_URL;

const ROUTES = [
  '/',
  '/question-bank',
  '/question-bank/topics/7',
  '/question-bank/review',
  '/question-bank/2/2026-03-l2',
  '/lesson/1/9',
  '/python/f2',
  '/museum',
  '/hardware',
  // HardwareLayout 给暗色外壳设了 text-slate-100，白卡片里漏了 text-* 的元素
  // 会继承成浅灰白字。四个 ESP32 页面都在这个 Layout 下，逐个都要查。
  '/hardware/esp32-curriculum',
  '/hardware/esp32/18',
  '/hardware/esp32-map',
  '/hardware/esp32-contest',
  '/ekart',
];

const VIEWPORTS = [
  { name: 'desktop', width: 1365, height: 900, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];

let server;
let browser;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function routeUrl(route) {
  return route === '/' ? baseUrl : `${baseUrl}${route.replace(/^\//, '')}`;
}

async function waitForServer(url, timeoutMs = 30000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Preview is still starting.
    }
    await wait(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function launchBrowser(chromium) {
  try {
    return await chromium.launch({ headless: true });
  } catch (error) {
    if (!error.message?.includes('Executable doesn')) throw error;
    return chromium.launch({
      channel: 'chrome',
      headless: true,
      args: ['--disable-extensions', '--disable-component-extensions-with-background-pages'],
    });
  }
}

async function stopServer() {
  if (!server || server.exitCode !== null) return;

  if (process.platform === 'win32') {
    const killer = spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], {
      stdio: 'ignore',
      windowsHide: true,
    });
    await new Promise((resolve) => killer.once('close', resolve));
    return;
  }

  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    server.kill('SIGTERM');
  }
}

async function findUndersizedIconButtons(page) {
  return page.evaluate(() => [...document.querySelectorAll('button')]
    .filter((button) => {
      const style = getComputedStyle(button);
      const rect = button.getBoundingClientRect();
      if (style.display === 'none' || style.visibility === 'hidden' || rect.width === 0 || rect.height === 0) return false;

      const visibleText = button.innerText.trim();
      const isIconOnly = visibleText.length <= 1 && Boolean(button.querySelector('svg'));
      return isIconOnly && (rect.width < 44 || rect.height < 44);
    })
    .map((button) => {
      const rect = button.getBoundingClientRect();
      return {
        name: button.getAttribute('aria-label') || button.title || button.innerText.trim() || '(unnamed)',
        size: `${Math.round(rect.width)}x${Math.round(rect.height)}`,
      };
    }));
}

function formatViolation(route, viewport, violation) {
  const nodes = violation.nodes.slice(0, 3).map((node) => {
    const target = node.target.join(' ');
    const detail = node.failureSummary?.replace(/\s+/g, ' ').trim() || node.html;
    return `    - ${target}: ${detail}`;
  });
  return [
    `${route} [${viewport}] ${violation.id} (${violation.impact}): ${violation.help}`,
    ...nodes,
    `    ${violation.helpUrl}`,
  ].join('\n');
}

async function run() {
  if (shouldStartServer) {
    server = spawn('npm', [
      'run', 'preview', '--', '--host', '127.0.0.1', '--port', String(DEFAULT_PORT), '--strictPort', '--base', '/gesp-app/'
    ], {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
      detached: process.platform !== 'win32',
    });
    server.stdout.on('data', (chunk) => process.stdout.write(chunk));
    server.stderr.on('data', (chunk) => process.stderr.write(chunk));
    await waitForServer(baseUrl);
  }

  const [{ chromium }, { default: AxeBuilder }] = await Promise.all([
    import('playwright'),
    import('@axe-core/playwright'),
  ]);
  browser = await launchBrowser(chromium);
  const failures = [];

  for (const viewport of VIEWPORTS) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      isMobile: viewport.isMobile,
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();

    for (const route of ROUTES) {
      await page.goto(routeUrl(route), { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1600);

      if (route === '/question-bank/2/2026-03-l2') {
        await page.getByRole('button', { name: /考试模式/ }).click();
        await page.locator('.question-option').first().waitFor({ state: 'visible', timeout: 10000 });
      }

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      for (const violation of results.violations.filter(({ impact }) => ['serious', 'critical'].includes(impact))) {
        failures.push(formatViolation(route, viewport.name, violation));
      }

      if (viewport.isMobile) {
        const undersizedButtons = await findUndersizedIconButtons(page);
        for (const button of undersizedButtons) {
          failures.push(`${route} [mobile] icon button "${button.name}" is ${button.size}px; minimum target is 44x44px.`);
        }
      }

      process.stdout.write(`A11y checked ${route} [${viewport.name}]\n`);
    }

    await context.close();
  }

  if (failures.length) {
    throw new Error(`Accessibility checks failed:\n\n${failures.join('\n\n')}`);
  }

  console.log(`Accessibility checks passed (${ROUTES.length} routes x ${VIEWPORTS.length} viewports).`);
}

run()
  .catch((error) => {
    console.error(error.stack || error.message || error);
    process.exitCode = 1;
  })
  .finally(async () => {
    if (browser) await browser.close();
    await stopServer();
  });
