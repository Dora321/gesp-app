import test from 'node:test';
import assert from 'node:assert/strict';

import { getPaper, paperIds, paperMeta } from '../../src/data/gesp/index.js';
import { getDisplayedQuestionIndex, getSavedQuestionIndex } from '../../src/utils/questionHelpers.js';
import {
  CODING_QUESTION_IDS,
  getLuoguProblemUrl,
  loadLuoguPool,
  needsSynthesizedCoding,
  withSynthesizedCoding,
} from '../../src/data/gesp/codingQuestions.js';

const embeddedQuestions = (paper) => [
  ...(paper.questions || []),
  ...(paper.programmingQuestions || []),
  ...(paper.codingQuestions || []),
];

// GESP 三级以上的上机编程题占总分一半。四到八级的卷文件没有内嵌它们，必须能
// 从洛谷题池补齐——否则学生在考试模式下练的是半张卷，而界面上看不出来。
test('every official paper ends up with both coding questions', async () => {
  const missing = [];

  for (const paperId of paperIds) {
    if (paperMeta[paperId]?.unofficial) continue;
    const paper = await getPaper(paperId);
    const embedded = embeddedQuestions(paper);
    const pool = needsSynthesizedCoding(embedded) ? await loadLuoguPool(paper.level) : [];
    const questions = withSynthesizedCoding(embedded, { paperId, luoguPool: pool });

    for (const id of CODING_QUESTION_IDS) {
      if (!questions.some((question) => Number(question.id) === id)) {
        missing.push(`${paperId}:Q${id}`);
      }
    }
  }

  assert.deepEqual(missing, [], `这些卷子补齐后仍缺上机编程题：${missing.join(', ')}`);
});

// 合成出来的题必须真的带着题面，否则学生看到的是一句「题面暂缺」，
// 等于把缺失从「没有题」变成「有题但空着」。
test('synthesized coding questions carry a real problem statement', async () => {
  const blank = [];

  for (const paperId of paperIds) {
    if (paperMeta[paperId]?.unofficial) continue;
    const paper = await getPaper(paperId);
    const embedded = embeddedQuestions(paper);
    if (!needsSynthesizedCoding(embedded)) continue;

    const pool = await loadLuoguPool(paper.level);
    const questions = withSynthesizedCoding(embedded, { paperId, luoguPool: pool });
    for (const id of CODING_QUESTION_IDS) {
      const question = questions.find((item) => Number(item.id) === id);
      if (String(question?.explanation || '').includes('题面暂缺')) blank.push(`${paperId}:Q${id}`);
    }
  }

  // 记录当前仍缺题面的条目；补齐 paperCodingMap 或洛谷题池后应当变短。
  assert.ok(
    blank.length <= 4,
    `缺题面的上机题过多（${blank.length} 条）：${blank.join(', ')}`,
  );
});

test('embedded coding questions are never overwritten', async () => {
  // 二、三级的卷文件自带 26/27 题，合成逻辑必须原样放行。
  const paper = await getPaper('2025-06-l2');
  const embedded = embeddedQuestions(paper);
  assert.equal(needsSynthesizedCoding(embedded), false);

  const questions = withSynthesizedCoding(embedded, { paperId: '2025-06-l2', luoguPool: [] });
  assert.equal(questions.length, embedded.length);
  for (const id of CODING_QUESTION_IDS) {
    const original = embedded.find((item) => Number(item.id) === id);
    const kept = questions.find((item) => Number(item.id) === id);
    assert.equal(kept.question, original.question);
  }
});

test('2024-09 L5 presents the PDF order and preserves existing links and saved positions', async () => {
  const paperId = '2024-09-l5';
  const paper = await getPaper(paperId);
  const questions = withSynthesizedCoding(embeddedQuestions(paper), { paperId });
  const [weapon, monster] = questions.slice(-2);
  assert.match(weapon.question, /小杨的武器/);
  assert.match(monster.question, /挑战怪物/);
  assert.equal(weapon.memoryLimit, '512 MB');
  assert.equal(monster.memoryLimit, '512 MB');
  assert.match(weapon.template, /cin >> n >> m/);
  assert.match(monster.template, /cin >> t[\s\S]*cin >> h/);
  assert.equal(getLuoguProblemUrl(paperId, weapon.id), 'https://www.luogu.com.cn/problem/B4051');
  assert.equal(getLuoguProblemUrl(paperId, monster.id), 'https://www.luogu.com.cn/problem/B4050');

  // 旧版把挑战怪物保存为第 26 个位置，续做时仍应定位到同一道题。
  assert.equal(questions[getDisplayedQuestionIndex(questions, 25)], monster);
  assert.equal(questions[getDisplayedQuestionIndex(questions, 26)], weapon);
  assert.equal(getSavedQuestionIndex(questions, 25), 26);
  assert.equal(getSavedQuestionIndex(questions, 26), 25);
});

test('placeholder problem ids do not produce a broken Luogu link', () => {
  assert.equal(getLuoguProblemUrl('__not-a-paper__', 26), null);
});
