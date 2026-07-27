import test from 'node:test';
import assert from 'node:assert/strict';
import { getObjectiveStemIntegrityErrors } from '../validate-question-bank.js';

test('objective stems with OCR or cross-question fragments require sourceIntegrity', () => {
  const cases = [
    {
      type: 'single',
      question: '下列说法正确的是？子任务编号 1 2 3',
      expectedFragment: '子任务编号',
    },
    {
      type: 'judge',
      question: 'DFS 的复杂度更低。数据点占比 20% 30% 50%',
      expectedFragment: '数据点占比',
    },
    {
      type: 'single',
      question: '程序输出是什么？题号 1 2 3 4 答案 A B C D',
      expectedFragment: '题号/答案表',
    },
    {
      type: 'judge',
      question: '该说法正确。答案/题号',
      expectedFragment: '题号/答案表',
    },
  ];

  cases.forEach((question, index) => {
    const errors = getObjectiveStemIntegrityErrors(question, index + 1);
    assert.equal(errors.length, 1);
    assert.match(errors[0], /^\[INTEGRITY\]/);
    assert.match(errors[0], new RegExp(question.expectedFragment.replace('/', '\\/')));
  });
});

test('sourceIntegrity allows a flagged objective stem', () => {
  const errors = getObjectiveStemIntegrityErrors({
    type: 'judge',
    question: '原题。子任务编号 数据点占比 1 20% 2 80%',
    sourceIntegrity: 'contaminated-stem',
    integrityNote: '题干混入其他题目的表格。',
  }, 25);

  assert.deepEqual(errors, []);
});

test('programming question statements are outside the objective-stem gate', () => {
  const errors = getObjectiveStemIntegrityErrors({
    type: 'programming',
    question: '子任务编号 数据点占比 1 20% 2 80%',
  }, 26);

  assert.deepEqual(errors, []);
});
