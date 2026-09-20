import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdirSync, readFileSync } from 'node:fs';
import { cppProgrammingExercises } from '../src/data/cppProgrammingPractice.js';

const base = process.env.CPP_PRACTICE_BASE_URL || 'http://127.0.0.1:4187';
let browser;
try { browser = await chromium.launch({ headless: true }); }
catch { browser = await chromium.launch({ channel: 'chrome', headless: true }); }
const errors = [];
try {
  const context = await browser.newContext({ viewport: { width: 1365, height: 1000 }, acceptDownloads: true });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  for (const exercise of cppProgrammingExercises) {
    await page.goto(`${base}/lesson/${exercise.level}/${exercise.lesson}#programming-practice`);
    const card = page.getByRole('region', { name: '本课上机练习', exact: true });
    await card.waitFor();
    await page.waitForFunction(() => {
      const rect = document.getElementById('programming-practice')?.getBoundingClientRect();
      return rect && rect.top >= 0 && rect.top < 250;
    });
    assert.equal(await card.getByRole('heading', { name: exercise.title, exact: true }).count(), 1);
    assert.equal(await card.locator('details[open]').count(), 0, '提示和答案应默认折叠');
    assert.equal(await card.getByRole('checkbox').count(), 3);
  }
  for (let level = 1; level <= 8; level++) {
    await page.goto(`${base}/level${level}`);
    const roadmap = page.getByRole('region', { name: '上机与备考路线', exact: true });
    await roadmap.waitFor();
    assert.equal(await roadmap.getByRole('link').count(), level <= 3 ? 16 : 4);
    await roadmap.getByRole('link').first().click();
    await page.getByRole('region', { name: '本课上机练习', exact: true }).waitFor();
  }
  await page.goto(`${base}/lesson/1/4#programming-practice`);
  const card = page.getByRole('region', { name: '本课上机练习', exact: true });
  await card.getByRole('checkbox').first().check();
  await page.reload();
  assert.ok(await card.getByRole('checkbox').first().isChecked(), '刷新后应保留自查');
  const downloadEvent = page.waitForEvent('download');
  await card.getByRole('button', { name: '下载题目单' }).click();
  const download = await downloadEvent;
  assert.equal(download.suggestedFilename(), 'cpp-1-4-task.md');
  const task = readFileSync(await download.path(), 'utf8');
  assert.ok(task.includes('125') && task.includes('2 5') && !task.includes('#include'));
  await card.getByText('完成尝试后对照：参考实现（C++11）', { exact: true }).click();
  assert.ok(await card.locator('details[open] pre').isVisible());
  mkdirSync('scratch/cpp-practice-qa', { recursive: true });
  await card.evaluate(el => el.scrollIntoView({ block: 'start' }));
  await page.screenshot({ path: 'scratch/cpp-practice-qa/desktop.png' });
  await page.goto(`${base}/lesson/1/5#programming-practice`);
  assert.equal(await page.getByRole('region', { name: '本课上机练习', exact: true }).getByRole('checkbox').first().isChecked(), false, '不同题目不共享记录');

  await page.setViewportSize({ width: 390, height: 844 });
  for (let level = 1; level <= 8; level++) {
    await page.goto(`${base}/lesson/${level}/16#programming-practice`);
    const mobileCard = page.getByRole('region', { name: '本课上机练习', exact: true });
    await mobileCard.waitFor();
    const bounds = await mobileCard.boundingBox();
    assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= 391, `L${level} 题目超出手机宽度`);
    assert.ok(await mobileCard.evaluate(el => el.scrollWidth <= el.clientWidth + 1));
    if (level === 8) {
      await mobileCard.getByRole('heading', { name: '样例 1', exact: true }).scrollIntoViewIfNeeded();
      await page.screenshot({ path: 'scratch/cpp-practice-qa/mobile.png' });
      await mobileCard.getByRole('link', { name: /原题与提交/ }).scrollIntoViewIfNeeded();
      assert.ok(await mobileCard.getByRole('link', { name: /原题与提交/ }).isVisible());
    }
  }
  assert.deepEqual(errors, []);
  console.log(`${cppProgrammingExercises.length} 个上机入口、8 级路线、手机布局、折叠提示、题单下载、自查持久化及隔离全部通过。`);
} finally {
  await browser.close();
}
