const { spawn } = require('child_process');

const DEFAULT_PORT = 4176;
const baseUrl = process.env.SMOKE_BASE_URL || `http://127.0.0.1:${DEFAULT_PORT}`;
const shouldStartServer = !process.env.SMOKE_BASE_URL;

// Representative course routes covering every C++ level (L1-L6) and the core
// Python units. The sweep asserts each one renders real content on desktop and
// does not overflow horizontally on mobile (where code blocks, compare tables
// and long buttons are most likely to spill out of the viewport).
const COURSE_ROUTES = [
  '/lesson/1/9',   // C++ L1 · for 循环（迁移到 LegacyCppLessonShell）
  '/lesson/1/16',  // C++ L1 · 考前冲刺（末课，回首页按钮）
  '/lesson/2/8',   // C++ L2 · 数学工具箱 cmath（PredictCheck 网格）
  '/lesson/2/11',  // C++ L2 · 因数与倍数（PredictCheck 网格）
  '/lesson/2/12',  // C++ L2 · 一维数组（PredictCheck 模板）
  '/lesson/3/7',   // C++ L3 · 字符串魔法
  '/lesson/4/5',   // C++ L4 · 指针入门
  '/lesson/4/12',  // C++ L4 · 递推算法（PredictCheck 网格）
  '/lesson/5/1',   // C++ L5 · 素数筛
  '/lesson/5/8',   // C++ L5 · 双向/循环链表（PredictCheck 网格）
  '/lesson/5/9',   // C++ L5 · 约瑟夫环（PredictCheck 网格）
  '/lesson/6/1',   // C++ L6 · 树的初相识（PredictCheck 网格）
  '/lesson/6/9',   // C++ L6 · 格雷码（PredictCheck 网格）
  '/lesson/6/14',  // C++ L6 · 矩阵与路径（PredictCheck 网格）
  '/python/f2',    // Python · 控制流程（PredictCheck）
  '/python/f3',    // Python · 列表与字典
  '/python/f5',    // Python · 小海龟（PredictCheck）
  '/python/f6',    // Python · random（PredictCheck）
  '/python/sorting', // Python · 排序项目（数据与视图拆分）
];

let server;
let browser;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Papers get verified one by one, so hardcoding an id for the "unverified paper"
// assertions goes stale the moment that paper is reviewed. Pick one from the
// registry instead, matching the same condition the UI uses (`answerVerified`).
async function pickUnverifiedPaper() {
  const path = require('path');
  const { pathToFileURL } = require('url');
  const load = (rel) => import(pathToFileURL(path.resolve(__dirname, rel)).href);
  const [{ paperMeta }, { resolveVerification }] = await Promise.all([
    load('../src/data/gesp/index.js'),
    load('../src/data/gesp/verificationModel.js'),
  ]);

  const candidate = Object.entries(paperMeta)
    .map(([id, meta]) => ({ id, ...meta }))
    .filter((meta) => !meta.unofficial && meta.questionCount > 0)
    .filter((meta) => resolveVerification(meta).dimensions.answer !== 'verified')
    .sort((a, b) => a.id.localeCompare(b.id))[0];

  if (!candidate) {
    throw new Error('No unverified paper left; update the generic-hint assertions in this smoke test.');
  }
  return candidate;
}

function stopServer() {
  if (!server || server.exitCode !== null) return;

  if (process.platform === 'win32') {
    const killer = spawn('taskkill', ['/pid', String(server.pid), '/t', '/f'], {
      stdio: 'ignore',
      windowsHide: true,
    });
    killer.unref();
    return;
  }

  try {
    process.kill(-server.pid, 'SIGTERM');
  } catch {
    server.kill('SIGTERM');
  }
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
    const command = process.platform === 'win32'
      ? {
          file: process.env.ComSpec || 'cmd.exe',
          args: ['/d', '/s', '/c', `npm run dev -- --host 127.0.0.1 --port ${DEFAULT_PORT} --strictPort`],
        }
      : {
          file: 'npm',
          args: ['run', 'dev', '--', '--host', '127.0.0.1', '--port', String(DEFAULT_PORT), '--strictPort'],
        };
    server = spawn(
      command.file,
      command.args,
      {
        stdio: ['ignore', 'pipe', 'pipe'],
        shell: false,
        detached: process.platform !== 'win32',
      }
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
  const requestUrls = [];

  page.on('console', (msg) => {
    if (['error', 'warning'].includes(msg.type())) {
      messages.push(`${msg.type()}: ${msg.text()}`);
    }
  });
  page.on('pageerror', (error) => messages.push(`pageerror: ${error.message}`));
  page.on('requestfailed', (request) => {
    if (request.failure()?.errorText === 'net::ERR_CONNECTION_CLOSED') {
      messages.push(`requestfailed: ${request.url()} (${request.failure().errorText})`);
    }
  });
  page.on('requestfinished', (request) => {
    const url = request.url();
    requestUrls.push(url);
    if (url.includes('ClassroomPointsPanel')) {
      panelRequests.push(url);
    }
  });

  const directQuestionBankStart = requestUrls.length;
  await page.goto(`${baseUrl}/question-bank`, { waitUntil: 'domcontentloaded' });
  await page.getByText('GESP 真题题库').waitFor({ timeout: 10000 });
  await page.getByText('完整核验', { exact: true }).waitFor({ timeout: 10000 });
  await page.getByText('部分核验', { exact: true }).waitFor({ timeout: 10000 });
  await page.getByText('尚未核验', { exact: true }).waitFor({ timeout: 10000 });
  await page.getByText(/一级真题列表/).waitFor({ timeout: 10000 });
  await page.getByText(/\d+ 卷 · \d+ 题 · 最新/).first().waitFor({ timeout: 10000 });
  const directQuestionBankRequests = requestUrls.slice(directQuestionBankStart);
  const eagerHomeRequest = directQuestionBankRequests.find((url) => /\/Home-[^/]+\.js/.test(url));
  if (eagerHomeRequest) {
    throw new Error(`Question bank route eagerly loaded the home chunk: ${eagerHomeRequest}`);
  }
  const eagerWidgetRequest = directQuestionBankRequests.find((url) => /\/(AIChat|ClassroomPoints)-[^/]+\.js/.test(url));
  if (eagerWidgetRequest) {
    throw new Error(`Question bank route eagerly loaded a floating widget chunk: ${eagerWidgetRequest}`);
  }
  const focusModeButtons = await page
    .locator('button[aria-label="打开课堂积分榜"], button[aria-label="打开 AI 问答助手"]')
    .count();
  if (focusModeButtons !== 0) {
    throw new Error('Question bank flow should not render global floating widgets.');
  }

  const unverifiedPaper = await pickUnverifiedPaper();
  await page.goto(`${baseUrl}/question-bank/${unverifiedPaper.level}/${unverifiedPaper.id}`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: /解析模式/ }).click();
  await page.locator('.question-option').first().waitFor({ timeout: 10000 });
  await page.locator('.question-option').first().click();
  await page.getByText('通用解题提示', { exact: true }).first().waitFor({ timeout: 10000 });
  await page.getByText(/题库答案（尚未完成核验）/).waitFor({ timeout: 10000 });
  if (await page.getByText('选项逐项分析', { exact: false }).count()) {
    throw new Error(`Unverified paper ${unverifiedPaper.id} must not render inferred option-by-option analysis.`);
  }

  await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2500);
  await page.getByText('魔丸聚集地').first().waitFor({ timeout: 10000 });
  const homeCurrentNavLabels = await page.locator('nav button[aria-current="page"]').allTextContents();
  if (homeCurrentNavLabels.length > 0) {
    throw new Error(`Homepage scroll nav items should not be marked as current: ${homeCurrentNavLabels.join(', ')}`);
  }

  await page.getByRole('button', { name: '课程体系' }).first().click();
  await page.getByText('C++ 基础闯关').first().waitFor({ timeout: 20000 });

  const initialPanelRequests = panelRequests.length;
  await page.getByRole('button', { name: '打开课堂积分榜' }).click();
  await page.getByRole('heading', { name: '课堂积分榜' }).waitFor({ timeout: 10000 });
  const afterOpenPanelRequests = panelRequests.length;
  await page.getByRole('button', { name: '最小化课堂积分榜' }).click();
  await page.getByRole('button', { name: '打开课堂积分榜' }).waitFor({ timeout: 10000 });

  await page.evaluate(() => localStorage.setItem('deepseek_api_key', 'legacy-persistent-key'));
  await page.getByRole('button', { name: '打开 AI 问答助手' }).click();
  await page.getByRole('dialog', { name: 'AI 问答助手' }).waitFor({ timeout: 10000 });
  await page.getByRole('button', { name: '打开 AI 设置' }).click();
  await page.getByLabel('DeepSeek API Key').fill('persistent-key');
  await page.getByRole('button', { name: '保存', exact: true }).click();

  const savedApiKeyState = await page.evaluate(() => ({
    session: sessionStorage.getItem('deepseek_api_key'),
    persistent: localStorage.getItem('deepseek_api_key'),
  }));
  if (savedApiKeyState.session !== null || savedApiKeyState.persistent !== 'persistent-key') {
    throw new Error(`AI API key storage is not persistent-only: ${JSON.stringify(savedApiKeyState)}`);
  }

  await page.getByRole('button', { name: '打开 AI 设置' }).click();
  await page.getByRole('button', { name: '清除', exact: true }).click();
  const clearedApiKeyState = await page.evaluate(() => ({
    session: sessionStorage.getItem('deepseek_api_key'),
    persistent: localStorage.getItem('deepseek_api_key'),
  }));
  if (clearedApiKeyState.session !== null || clearedApiKeyState.persistent !== null) {
    throw new Error(`AI API key clear action left stored data: ${JSON.stringify(clearedApiKeyState)}`);
  }
  await page.getByRole('button', { name: '关闭 AI 问答助手' }).click();

  await page.getByRole('button', { name: '学习工具', exact: true }).click();
  await page.getByRole('heading', { name: '管理我的学习进度' }).waitFor({ timeout: 10000 });
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: '导出', exact: true }).click();
  const learningDataDownload = await downloadPromise;
  if (!/^gesp-learning-data-\d{4}-\d{2}-\d{2}\.json$/.test(learningDataDownload.suggestedFilename())) {
    throw new Error(`Unexpected learning data filename: ${learningDataDownload.suggestedFilename()}`);
  }

  const importPayload = JSON.stringify({
    schema: 'gesp-learning-data',
    version: 2,
    data: {
      lessons: { '/python/f2': { status: 'mastered', visitedAt: 100, masteredAt: 200 } },
      exams: { 'smoke-paper': { answers: { 0: 'A' }, currentQuestionIndex: 1, timeLeft: 120, isSubmitted: false } },
      hardware: { esp32Ai: { activeNum: 2, viewed: [1, 2] } },
      museum: { collected: [] },
    },
  });
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByLabel('选择学习数据文件').setInputFiles({
    name: 'learning-data.json',
    mimeType: 'application/json',
    buffer: Buffer.from(importPayload),
  });
  await page.getByText('学习数据已导入，下次打开课程时生效').waitFor({ timeout: 10000 });
  const importedLearningData = await page.evaluate(() => JSON.parse(localStorage.getItem('gesp_learning_data') || 'null'));
  if (importedLearningData?.version !== 2 || importedLearningData?.lessons?.['/python/f2']?.status !== 'mastered') {
    throw new Error('Learning data import did not persist the versioned progress document.');
  }

  await page.evaluate(() => localStorage.setItem('ai_selected_persona_id', 'tutor'));
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: '一键重置', exact: true }).click();
  await page.getByText('学习进度已重置').waitFor({ timeout: 10000 });
  const resetLearningDataState = await page.evaluate(() => ({
    learning: localStorage.getItem('gesp_learning_data'),
    persona: localStorage.getItem('ai_selected_persona_id'),
  }));
  if (resetLearningDataState.learning !== null || resetLearningDataState.persona !== 'tutor') {
    throw new Error(`Learning reset exceeded its data scope: ${JSON.stringify(resetLearningDataState)}`);
  }

  await page.goto(`${baseUrl}/question-bank/2/2026-03-l2`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: /考试模式/ }).click();
  await page.locator('.question-option').first().waitFor({ state: 'visible', timeout: 10000 });
  await page.locator('.question-option').first().click();
  await page.getByRole('button', { name: /下一题/ }).click();
  await page.waitForFunction(() => {
    const data = JSON.parse(localStorage.getItem('gesp_learning_data') || '{}');
    const draft = data.exams?.['2026-03-l2'];
    return draft?.currentQuestionIndex === 1 && Object.keys(draft.answers || {}).length === 1;
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: /继续上次练习/ }).click();
  await page.getByRole('button', { name: '上一题', exact: true }).click();
  const restoredAnswers = await page.locator('.question-option[aria-pressed="true"]').count();
  if (restoredAnswers !== 1) {
    throw new Error(`Exam draft did not restore the selected answer after reload (selected ${restoredAnswers}).`);
  }

  await page.goto(`${baseUrl}/python/f1`, { waitUntil: 'domcontentloaded' });
  await page.getByText('什么是 Python?').waitFor({ timeout: 10000 });

  await page.goto(`${baseUrl}/lesson1`, { waitUntil: 'domcontentloaded' });
  await page.waitForURL('**/lesson/1/1', { timeout: 10000 });

  await page.goto(`${baseUrl}/definitely-not-a-real-page`, { waitUntil: 'domcontentloaded' });
  await page.getByText('页面没有找到').waitFor({ timeout: 10000 });

  // Desktop sweep: every key course route must render real content (not a blank
  // page or a crashed lazy chunk). Console errors are collected globally and
  // asserted at the end of the run.
  for (const route of COURSE_ROUTES) {
    await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(900);
    const textLength = await page.evaluate(() => document.body.innerText.trim().length);
    if (textLength < 200) {
      throw new Error(`Course route ${route} rendered almost no content (text length ${textLength}).`);
    }
  }

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
  mobilePage.on('requestfailed', (request) => {
    if (request.failure()?.errorText === 'net::ERR_CONNECTION_CLOSED') {
      messages.push(`requestfailed: ${request.url()} (${request.failure().errorText})`);
    }
  });

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

  await mobilePage.goto(`${baseUrl}/question-bank`, { waitUntil: 'domcontentloaded' });
  await mobilePage.getByText('GESP 真题题库').waitFor({ timeout: 10000 });
  const levelButtons = mobilePage.locator('button[aria-pressed]');
  if (await levelButtons.count() !== 8) {
    throw new Error(`Question bank should expose 8 level choices, found ${await levelButtons.count()}.`);
  }
  const levelSelectorMetrics = await levelButtons.first().evaluate((button) => {
    const container = button.parentElement;
    const firstPaper = document.querySelector('article');
    return {
      clientWidth: container?.clientWidth || 0,
      scrollWidth: container?.scrollWidth || 0,
      firstPaperTop: firstPaper?.getBoundingClientRect().top || 0,
    };
  });
  if (levelSelectorMetrics.scrollWidth <= levelSelectorMetrics.clientWidth) {
    throw new Error(`Mobile level choices should use a horizontal scroller: ${JSON.stringify(levelSelectorMetrics)}`);
  }
  if (levelSelectorMetrics.firstPaperTop <= 0 || levelSelectorMetrics.firstPaperTop > 1100) {
    throw new Error(`Mobile question-bank list starts too far below the viewport: ${JSON.stringify(levelSelectorMetrics)}`);
  }

  // Mobile sweep: every key course route must fit the viewport width. A small
  // tolerance absorbs sub-pixel rounding; anything larger means a code block,
  // table or button is spilling out horizontally on phones.
  const OVERFLOW_TOLERANCE = 2;
  for (const route of COURSE_ROUTES) {
    await mobilePage.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(900);
    const metrics = await mobilePage.evaluate(() => ({
      innerWidth: window.innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
    }));
    const overflow = Math.max(metrics.scrollWidth, metrics.bodyScrollWidth) - metrics.innerWidth;
    if (overflow > OVERFLOW_TOLERANCE) {
      throw new Error(`Course route ${route} overflows horizontally on mobile by ${overflow}px: ${JSON.stringify(metrics)}`);
    }
  }

  for (const route of ['/level7', '/python/f2']) {
    await mobilePage.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded' });
    await mobilePage.waitForTimeout(700);
    const headingCount = await mobilePage.locator('h1').count();
    if (headingCount !== 1) {
      throw new Error(`${route} should render exactly one h1, found ${headingCount}.`);
    }
  }

  await mobilePage.goto(`${baseUrl}/hardware`, { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(700);
  const nestedMainCount = await mobilePage.locator('main main').count();
  if (nestedMainCount !== 0) {
    throw new Error(`Hardware routes should not nest main landmarks, found ${nestedMainCount}.`);
  }

  await mobilePage.goto(`${baseUrl}/hardware/esp32-ai`, { waitUntil: 'domcontentloaded' });
  await mobilePage.getByText('ESP32 AI Workshop').waitFor({ timeout: 10000 });
  const touchTargets = [
    mobilePage.getByRole('button', { name: '返回网站首页' }),
    mobilePage.getByRole('link', { name: '硬件实验课首页' }),
    mobilePage.getByRole('button', { name: /展开全部/ }),
  ];
  for (const target of touchTargets) {
    const box = await target.first().boundingBox();
    if (!box || box.width < 43.5 || box.height < 43.5) {
      throw new Error(`ESP32 key touch target is smaller than 44px: ${JSON.stringify(box)}.`);
    }
  }

  const lessonTargets = mobilePage.locator('button[aria-pressed]');
  const lessonTargetCount = Math.min(await lessonTargets.count(), 4);
  for (let index = 0; index < lessonTargetCount; index++) {
    const box = await lessonTargets.nth(index).boundingBox();
    if (!box || box.height < 43.5) {
      throw new Error(`ESP32 lesson target ${index + 1} is shorter than 44px: ${JSON.stringify(box)}.`);
    }
  }

  // Let deferred imports settle before evaluating console output. Closing the
  // browser first aborts in-flight requests and creates false
  // ERR_CONNECTION_CLOSED errors.
  await mobilePage.waitForTimeout(500);

  if (initialPanelRequests !== 0 || afterOpenPanelRequests < 1) {
    throw new Error('Classroom points panel did not lazy-load as expected.');
  }

  if (messages.length > 0) {
    throw new Error(`Browser console produced warnings/errors:\n${messages.join('\n')}`);
  }

  await browser.close();
  browser = null;

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
      stopServer();
    }
  });
