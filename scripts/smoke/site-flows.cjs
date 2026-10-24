const assert = require('node:assert/strict');

async function assertFits(page, label) {
  const size = await page.evaluate(() => ({
    viewport: innerWidth,
    content: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth),
  }));
  assert.ok(size.content <= size.viewport + 2, `${label}: horizontal overflow ${JSON.stringify(size)}`);
}

async function assertFocused(control) {
  await control.page().waitForFunction(element => element === document.activeElement, await control.elementHandle());
}

async function assertDialogFits(dialog) {
  const bounds = await dialog.evaluate(element => {
    const { top, bottom, left, right } = element.getBoundingClientRect();
    return { top, bottom, left, right, width: innerWidth, height: innerHeight };
  });
  assert.ok(bounds.top >= 0 && bounds.bottom <= bounds.height + 1
    && bounds.left >= 0 && bounds.right <= bounds.width + 1,
  `Dialog extends outside the viewport: ${JSON.stringify(bounds)}`);
}

async function checkExam(page, baseUrl, width) {
  const paperId = '2026-03-l2';
  const route = `${baseUrl}/question-bank/2/${paperId}`;
  // Direct entry must return to the bank even without in-app history.
  await page.goto(route);
  await page.getByRole('button', { name: '返回题库', exact: true }).click();
  await page.getByRole('heading', { name: 'GESP 真题题库', exact: true }).waitFor();
  await page.goto(route);
  await page.getByRole('button', { name: /考试模式/ }).click();
  await page.locator('.question-option').first().click();
  await assertFits(page, `exam ${width}`);

  await page.getByRole('button', { name: '打开题号面板', exact: true }).click();
  const sidebar = page.getByRole('complementary', { name: '题号面板', includeHidden: true });
  await sidebar.getByRole('button', { name: '第 2 题', exact: true }).click();
  await sidebar.waitFor({ state: 'hidden' });
  await page.waitForFunction(id => {
    const draft = JSON.parse(localStorage.getItem('gesp_learning_data') || '{}').exams?.[id];
    return draft?.currentQuestionIndex === 1 && Object.keys(draft.answers).length === 1;
  }, paperId);
  await page.reload();
  await page.getByRole('button', { name: /继续上次练习/ }).click();
  await page.getByRole('button', { name: '上一题', exact: true }).click();
  assert.equal(await page.locator('.question-option[aria-pressed="true"]').count(), 1, 'Refresh lost the answer');

  const submit = page.getByRole('button', { name: '现在交卷', exact: true });
  await submit.click();
  const confirmation = page.getByRole('dialog', { name: '确认交卷？', exact: true });
  await confirmation.waitFor();
  const cancel = confirmation.getByRole('button', { name: '返回继续答题', exact: true });
  const confirm = confirmation.getByRole('button', { name: '确认交卷', exact: true });
  await assertFocused(cancel);
  await page.keyboard.press('Shift+Tab');
  await assertFocused(confirm);
  await page.keyboard.press('Tab');
  await assertFocused(cancel);
  await page.keyboard.press('Escape');
  await confirmation.waitFor({ state: 'hidden' });
  await assertFocused(submit);
  assert.equal(await page.evaluate(() => document.body.style.overflow), '', 'Dialog left scrolling locked');

  // The last-question action is distinct from the header submit button.
  await page.getByRole('button', { name: '打开题号面板', exact: true }).click();
  await sidebar.getByRole('button', { name: /^第 \d+ 题$/ }).last().click();
  await page.getByRole('button', { name: '检查交卷', exact: true }).click();
  await confirmation.waitFor();
  await assertFits(page, `submit dialog ${width}`);
  await assertDialogFits(confirmation);
  await confirm.click();
  const result = page.getByRole('dialog', { name: '考试结束', exact: true });
  await result.waitFor();
  await assertFits(page, `result dialog ${width}`);
  await assertDialogFits(result);
  await page.waitForFunction(id => {
    const data = JSON.parse(localStorage.getItem('gesp_learning_data') || '{}');
    return data.exams?.[id]?.isSubmitted && data.attempts?.[id]?.length === 1;
  }, paperId);
  await result.getByRole('button', { name: '查看解析', exact: true }).click();
  await page.getByRole('button', { name: '查看结果', exact: true }).click();
  await result.waitFor();
  await result.getByRole('button', { name: '返回题库', exact: true }).click();
  await page.getByRole('heading', { name: 'GESP 真题题库', exact: true }).waitFor();
  assert.equal(await page.evaluate(() => document.body.style.overflow), '', 'Leaving results left scrolling locked');
}

async function checkCourseDirectory(page, baseUrl, route) {
  await page.goto(`${baseUrl}${route}`);
  await page.getByRole('button', { name: '打开课程目录', exact: true }).click();
  const sidebar = page.locator('aside').first();
  await sidebar.waitFor({ state: 'visible' });
  const main = page.locator('main').first();
  const before = await main.innerText();
  await sidebar.getByRole('button').nth(1).click();
  await sidebar.waitFor({ state: 'hidden' });
  await page.waitForFunction(({ element, text }) => element.innerText !== text, {
    element: await main.elementHandle(), text: before,
  });
  await assertFits(page, `course directory ${route}`);
}

async function checkAnchor(page, baseUrl, label, sectionId, mobile = false) {
  await page.goto(`${baseUrl}/hardware`);
  await page.locator('h1').first().waitFor();
  if (mobile) await page.getByRole('button', { name: '打开导航菜单', exact: true }).click();
  await page.getByRole('button', { name: label, exact: true }).filter({ visible: true }).click();
  await page.waitForURL(url => url.hash === `#${sectionId}`
    && url.pathname.replace(/\/$/, '') === new URL(baseUrl).pathname.replace(/\/$/, ''));
  await page.waitForFunction(id => {
    const section = document.getElementById(id);
    if (!section) return false;
    const box = section.getBoundingClientRect();
    return box.top >= 0 && box.top < 160 && box.bottom > 0;
  }, sectionId);
  if (mobile) {
    await page.getByRole('button', { name: '打开导航菜单', exact: true }).waitFor();
    assert.equal(await page.evaluate(() => document.body.style.overflow), '', 'Navigation left scrolling locked');
  }
}

// Separate contexts keep synthetic answers and history away from other smoke
// checks. No user browser profile or external API is touched.
async function checkSiteFlows(browser, baseUrl) {
  const errors = [];
  for (const width of [320, 390, 768, 1440]) {
    const context = await browser.newContext({
      viewport: { width, height: width === 320 ? 568 : 900 }, reducedMotion: 'reduce',
    });
    context.setDefaultTimeout(15000);
    try {
      const page = await context.newPage();
      page.on('pageerror', error => errors.push(`${width}: ${error.message}`));
      if (width < 768) {
        for (const route of ['/lesson/1/1', '/lesson/3/1', '/python/f1', '/python/ai']) {
          await checkCourseDirectory(page, baseUrl, route);
        }
        console.log(`Course directories passed at ${width}px`);
        await checkExam(page, baseUrl, width);
        console.log(`Exam lifecycle passed at ${width}px`);
      }
      // Force a slow first Home import to catch fixed-delay navigation races.
      await page.route(/\/(?:src\/Home\.jsx|assets\/Home-[^/]+\.js)(?:\?|$)/, async route => {
        await new Promise(resolve => setTimeout(resolve, 500));
        await route.continue();
      });
      await checkAnchor(page, baseUrl, '课程体系', 'lesson-catalog', width < 768);
      console.log(`Cross-page course anchor passed at ${width}px`);
      if (width === 1440) {
        for (const [label, id] of [['项目课', 'projects-section'], ['学习工具', 'tools-section'], ['探索内容', 'explore-section'], ['学习路线图', 'learning-paths']]) {
          await checkAnchor(page, baseUrl, label, id);
        }
      }
      for (const route of ['/ekart', '/hardware', '/question-bank', '/museum']) {
        await page.goto(`${baseUrl}${route}`);
        await page.locator('h1').first().waitFor();
        await assertFits(page, `${route} ${width}`);
        if (route === '/ekart' && width < 768) {
          await page.getByRole('button', { name: '打开导航菜单', exact: true }).click();
          const menuCoversSubnav = await page.evaluate(() => (
            Boolean(document.elementFromPoint(innerWidth / 2, 110)?.closest('.mw-nav-sheet'))
          ));
          assert.ok(menuCoversSubnav, 'E-Kart subnavigation covers the mobile menu');
          await page.getByRole('button', { name: '关闭导航菜单', exact: true }).click();
        }
      }
    } finally {
      await context.close();
    }
  }
  assert.deepEqual(errors, [], 'Site flows raised browser errors');
  console.log('Site flows passed: mobile directories, exam lifecycle, anchors, 320/390/768/1440 layouts.');
}

module.exports = { checkSiteFlows };
