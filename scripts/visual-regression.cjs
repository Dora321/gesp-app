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
const baseUrl = process.env.VISUAL_BASE_URL || `http://127.0.0.1:${DEFAULT_PORT}`;
const shouldStartServer = !process.env.VISUAL_BASE_URL;
const isUpdate = process.argv.includes('--update');

const BASELINE_PATH = path.join(__dirname, 'visual-baseline.json');
const SHOTS_DIR = path.join(__dirname, '..', 'screenshots');

// Representative routes spanning every C++ level + Python (the courses whose
// PredictCheck/TransferCheck grids, tables and code blocks are the spill risk).
const ROUTES = [
  '/lesson/1/9', '/lesson/2/12', '/lesson/3/7', '/lesson/4/9',
  '/lesson/5/10', '/lesson/6/2', '/python/f2', '/python/f3',
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

let server;
let browser;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

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

function compare(route, vp, base, cur, failures) {
  const key = `${route} [${vp}]`;
  if (cur.overflow > OVERFLOW_TOL) failures.push(`${key}: horizontal overflow ${cur.overflow}px (max element right ${cur.maxRight} > width ${cur.clientWidth}).`);
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
    server = spawn(process.platform === 'win32' ? 'npm.cmd' : 'npm',
      ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(DEFAULT_PORT)],
      { stdio: ['ignore', 'pipe', 'pipe'] });
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
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: vp.isMobile });
    const page = await ctx.newPage();
    // Kill animations so screenshots/geometry are deterministic.
    await page.addInitScript(() => {
      const s = document.createElement('style');
      s.textContent = '*,*::before,*::after{animation:none!important;transition:none!important;}';
      document.documentElement.appendChild(s);
    });
    for (const route of ROUTES) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(500);
      const fp = await fingerprint(page);
      const id = `${route.replace(/\//g, '_')}__${vp.name}`;
      next[id] = fp;
      await page.screenshot({ path: path.join(SHOTS_DIR, `${id}.png`), fullPage: false });
      compare(route, vp.name, baseline[id], fp, failures);
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

run()
  .catch((e) => { console.error(e.message || e); process.exitCode = 1; })
  .finally(() => {
    if (browser) browser.close().catch(() => {});
    if (server) server.kill('SIGTERM');
  });
