// Dependency-free visual / layout regression for course pages.
//
// Purpose (goal P2「建截图回归，防止后续 UI 调整把课程页挤爆」): catch layout
// breakage on key course routes before it ships. A true pixel-diff would need
// pixelmatch/pngjs and is fragile across machines/fonts; instead we fingerprint
// each route's layout geometry (machine-independent) and fail on drift. We also
// dump PNG screenshots to screenshots/ (gitignored) for human review.
//
// Usage:
//   node scripts/visual-regression.cjs           # check current layout vs baseline
//   node scripts/visual-regression.cjs --update  # (re)write the baseline
//
// The baseline lives at scripts/visual-baseline.json and IS committed.

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const DEFAULT_PORT = 4178;
const baseUrl = (process.env.VISUAL_BASE_URL || `http://127.0.0.1:${DEFAULT_PORT}/gesp-app/`).replace(/\/?$/, '/');
const shouldStartServer = !process.env.VISUAL_BASE_URL;
const isUpdate = process.argv.includes('--update');

const BASELINE_PATH = path.join(__dirname, 'visual-baseline.json');
const SHOTS_DIR = path.join(__dirname, '..', 'screenshots');

// Representative routes spanning every C++ level + Python (the courses whose
// PredictCheck/TransferCheck grids, tables and code blocks are the spill risk).
const ROUTES = [
  '/', '/museum',
  '/lesson/1/9', '/lesson/2/12', '/lesson/3/7', '/lesson/4/9',
  '/lesson/5/10', '/lesson/6/2', '/python/f2', '/python/f3',
  '/question-bank', '/question-bank/2/2026-03-l2',
  '/hardware', '/hardware/esp32-map', '/hardware/esp32-contest', '/ekart', '/level7',
];
const VIEWPORTS = [
  { name: 'desktop', width: 1365, height: 900, isMobile: false },
  { name: 'mobile', width: 390, height: 844, isMobile: true },
];

// Tolerances: overflow is hard-failed; geometry/counts allow small drift so
// trivial copy edits don't trip the check, but a vanished section or a newly
// spilling table does.
const OVERFLOW_TOL = 2;
const TEXT_DROP_RATIO = 0.4; // fail if visible text shrinks by >40%
const MIN_VISIBLE_TEXT = 100;
const MIN_NON_WHITE_RATIO = 0.005;

let server;
let browser;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function waitForExit(child, timeoutMs) {
  if (!child || child.exitCode !== null) return Promise.resolve(true);

  return new Promise((resolve) => {
    const finish = (exited) => {
      clearTimeout(timer);
      child.off('exit', onExit);
      resolve(exited);
    };
    const onExit = () => finish(true);
    const timer = setTimeout(() => finish(false), timeoutMs);
    child.once('exit', onExit);
  });
}

async function stopServer() {
  if (!server || server.exitCode !== null) return;

  if (process.platform === 'win32') {
    const killer = spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], {
      stdio: 'ignore',
      windowsHide: true,
    });
    await new Promise((resolve) => killer.once('close', resolve));
    await waitForExit(server, 2000);
    return;
  }

  const killProcessGroup = (signal) => {
    try {
      process.kill(-server.pid, signal);
    } catch {
      server.kill(signal);
    }
  };

  killProcessGroup('SIGTERM');
  if (!(await waitForExit(server, 5000))) {
    killProcessGroup('SIGKILL');
    await waitForExit(server, 2000);
  }
}

async function waitForServer(url, timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try { const res = await fetch(url); if (res.ok) return; } catch { /* starting */ }
    await wait(500);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

async function launchBrowser(chromium) {
  try { return await chromium.launch({ headless: true }); }
  catch (e) {
    if (!e.message?.includes('Executable doesn')) throw e;
    return chromium.launch({ channel: 'chrome', headless: true, args: ['--disable-extensions'] });
  }
}

async function fingerprint(page) {
  return page.evaluate(() => {
    const docEl = document.documentElement;
    const overflow = Math.max(docEl.scrollWidth, document.body.scrollWidth) - docEl.clientWidth;
    // rightmost edge of any element relative to the viewport (spill detector)
    let maxRight = 0;
    for (const el of document.querySelectorAll('main *, [class*="rounded"], pre, table, button')) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.right > maxRight) maxRight = Math.round(r.right);
    }
    return {
      clientWidth: docEl.clientWidth,
      overflow: Math.round(overflow),
      docHeight: Math.round(docEl.scrollHeight),
      textLen: document.body.innerText.trim().length,
      maxRight,
      counts: {
        pre: document.querySelectorAll('pre').length,
        table: document.querySelectorAll('table').length,
        button: document.querySelectorAll('button').length,
      },
    };
  });
}

async function checkHomeMobileLayout(page, failures) {
  const metrics = await page.evaluate(() => {
    const hero = document.querySelector('main > section')?.getBoundingClientRect();
    const pathHeading = document.querySelector('#learning-paths h2')?.getBoundingClientRect();
    const launchers = ['打开课堂积分榜', '打开 AI 问答助手'].map((label) => {
      const element = document.querySelector(`button[aria-label="${label}"]`);
      const rect = element?.getBoundingClientRect();
      return {
        label,
        position: element ? getComputedStyle(element).position : '',
        width: rect?.width || 0,
        height: rect?.height || 0,
      };
    });
    return {
      heroBottom: hero?.bottom || 0,
      pathHeadingTop: pathHeading?.top || 0,
      launchers,
    };
  });

  if (metrics.heroBottom > 650) failures.push(`/ [mobile]: hero ends at ${Math.round(metrics.heroBottom)}px (limit 650px).`);
  if (metrics.pathHeadingTop > 700) failures.push(`/ [mobile]: learning paths heading starts at ${Math.round(metrics.pathHeadingTop)}px (limit 700px).`);
  for (const launcher of metrics.launchers) {
    if (launcher.position === 'fixed') failures.push(`/ [mobile]: ${launcher.label} still floats over page content.`);
    if (launcher.width < 44 || launcher.height < 44) {
      failures.push(`/ [mobile]: ${launcher.label} tap target is ${Math.round(launcher.width)}×${Math.round(launcher.height)}px (minimum 44×44px).`);
    }
  }
}

async function checkMuseumLayout(page, viewport, failures) {
  const metrics = await page.evaluate(() => ({
    exhibitButtons: document.querySelectorAll('button[aria-label^="查看展品："]').length,
    encryptedText: document.body.innerText.includes('ENCRYPTED'),
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
  }));

  if (metrics.exhibitButtons !== 100) failures.push(`/museum [${viewport}]: expected 100 browsable exhibits, found ${metrics.exhibitButtons}.`);
  if (metrics.encryptedText) failures.push(`/museum [${viewport}]: locked ENCRYPTED cards returned.`);
  if (metrics.overflow > OVERFLOW_TOL) failures.push(`/museum [${viewport}]: horizontal overflow is ${metrics.overflow}px.`);
}

async function checkHardwareLanding(page, viewport, failures) {
  const metrics = await page.evaluate(() => {
    const links = [...document.querySelectorAll('a')]
      .filter((element) => /PyCharm Community 下载|CH340 官方驱动/.test(element.textContent))
      .map((element) => element.href);
    const kitCount = document.querySelectorAll('#resources details li').length;
    return { links, kitCount };
  });

  if (metrics.links.length !== 2 || metrics.links.some((href) => !href.startsWith('https://'))) {
    failures.push(`/hardware [${viewport}]: official PyCharm and CH340 HTTPS resources are missing.`);
  }
  if (metrics.kitCount < 10) failures.push(`/hardware [${viewport}]: complete hardware kit list has only ${metrics.kitCount} items.`);
}

async function analyzeScreenshot(page, buffer) {
  const src = `data:image/png;base64,${buffer.toString('base64')}`;
  return page.evaluate(async (imageSrc) => {
    const image = new Image();
    image.src = imageSrc;
    await image.decode();

    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, 0, 0);
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let sampled = 0;
    let nonWhite = 0;
    const pixelStep = 12;

    for (let y = 0; y < canvas.height; y += pixelStep) {
      for (let x = 0; x < canvas.width; x += pixelStep) {
        const offset = (y * canvas.width + x) * 4;
        sampled += 1;
        if (pixels[offset] < 248 || pixels[offset + 1] < 248 || pixels[offset + 2] < 248) {
          nonWhite += 1;
        }
      }
    }

    return { sampled, nonWhite, nonWhiteRatio: sampled ? nonWhite / sampled : 0 };
  }, src);
}

function compare(route, vp, base, cur, failures) {
  const key = `${route} [${vp}]`;
  if (cur.overflow > OVERFLOW_TOL) failures.push(`${key}: horizontal overflow ${cur.overflow}px (max element right ${cur.maxRight} > width ${cur.clientWidth}).`);
  if (cur.textLen < MIN_VISIBLE_TEXT) failures.push(`${key}: only ${cur.textLen} visible text characters rendered.`);
  if (cur.nonWhiteRatio < MIN_NON_WHITE_RATIO) failures.push(`${key}: screenshot is effectively blank (${(cur.nonWhiteRatio * 100).toFixed(3)}% sampled non-white pixels).`);
  if (!base) return; // new route in update mode
  if (base.textLen > 0 && cur.textLen < base.textLen * (1 - TEXT_DROP_RATIO)) {
    failures.push(`${key}: visible text dropped ${base.textLen} → ${cur.textLen} (>${TEXT_DROP_RATIO * 100}% gone — a section may have stopped rendering).`);
  }
  for (const c of ['pre', 'table', 'button']) {
    if (base.counts[c] > 0 && cur.counts[c] === 0) failures.push(`${key}: all <${c}> elements disappeared (${base.counts[c]} → 0).`);
  }
}

async function run() {
  if (shouldStartServer) {
    if (!fs.existsSync(path.join(__dirname, '..', 'dist', 'index.html'))) {
      throw new Error('Visual regression requires a production build. Run npm run build first.');
    }
    // Test the production output so route chunks are already compiled and the
    // URL base matches GitHub Pages.
    const command = process.platform === 'win32'
      ? {
          file: process.env.ComSpec || 'cmd.exe',
          args: ['/d', '/s', '/c', `npm run preview -- --host 127.0.0.1 --port ${DEFAULT_PORT} --strictPort --base /gesp-app/`],
        }
      : {
          file: 'npm',
          args: ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(DEFAULT_PORT), '--strictPort', '--base', '/gesp-app/'],
        };
    server = spawn(command.file, command.args, {
      stdio: ['ignore', 'pipe', 'pipe'],
      shell: false,
      detached: process.platform !== 'win32',
    });
    server.stdout.on('data', (c) => process.stdout.write(c));
    server.stderr.on('data', (c) => process.stderr.write(c));
    await waitForServer(baseUrl);
  }

  const { chromium } = await import('playwright');
  browser = await launchBrowser(chromium);
  fs.mkdirSync(SHOTS_DIR, { recursive: true });

  const baseline = (!isUpdate && fs.existsSync(BASELINE_PATH))
    ? JSON.parse(fs.readFileSync(BASELINE_PATH, 'utf8')) : {};
  const next = {};
  const failures = [];

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    for (const route of ROUTES) {
      await page.goto(`${baseUrl}${route.replace(/^\//, '')}`, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(
        (minimum) => document.body.innerText.trim().length >= minimum,
        MIN_VISIBLE_TEXT,
        { timeout: 15000 }
      );
      await page.evaluate(async () => {
        await document.fonts?.ready;
        await Promise.allSettled([...document.images].map((img) => img.decode()));
      });
      // Framer Motion can retain its initial opacity for a few frames even when
      // reduced motion is requested. Wait for the final composited layout.
      await page.waitForTimeout(1200);
      const fp = await fingerprint(page);
      const id = `${route.replace(/\//g, '_')}__${vp.name}`;
      const screenshot = await page.screenshot({ path: path.join(SHOTS_DIR, `${id}.png`), fullPage: false });
      const pixels = await analyzeScreenshot(page, screenshot);
      next[id] = { ...fp, ...pixels };
      compare(route, vp.name, baseline[id], next[id], failures);
      if (route === '/' && vp.name === 'mobile') await checkHomeMobileLayout(page, failures);
      if (route === '/museum') await checkMuseumLayout(page, vp.name, failures);
      if (route === '/hardware') await checkHardwareLanding(page, vp.name, failures);
    }
    await ctx.close();
  }

  if (isUpdate) {
    fs.writeFileSync(BASELINE_PATH, JSON.stringify(next, null, 2) + '\n');
    console.log(`Baseline updated: ${Object.keys(next).length} route×viewport entries → ${path.relative(process.cwd(), BASELINE_PATH)}`);
    console.log(`Screenshots written to ${path.relative(process.cwd(), SHOTS_DIR)}/ (gitignored).`);
    return;
  }

  if (failures.length) {
    throw new Error(`Visual/layout regression detected:\n - ${failures.join('\n - ')}`);
  }
  console.log(`Visual/layout regression checks passed (${ROUTES.length} routes × ${VIEWPORTS.length} viewports).`);
  console.log(`Screenshots written to ${path.relative(process.cwd(), SHOTS_DIR)}/ (gitignored) for human review.`);
}

async function main() {
  try {
    await run();
  } catch (e) {
    console.error(e.message || e);
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close().catch(() => {});
    await stopServer();
  }
}

main().catch((e) => {
  console.error(e.message || e);
  process.exitCode = 1;
});
