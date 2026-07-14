import test from 'node:test';
import assert from 'node:assert/strict';

import { getPaper } from '../../src/data/gesp/index.js';
import { buildGenericStudyHint } from '../../src/pages/question-bank/analysisEngine.js';

test('getPaper exposes generated verification metadata to question pages', async () => {
  const verified = await getPaper('2024-03-l1');
  const partial = await getPaper('2026-03-l1');
  const unverified = await getPaper('2025-12-l1');

  assert.equal(verified.reviewStatus, 'verified');
  assert.equal(verified.reviewedBy, '本站校订');
  assert.equal(partial.reviewStatus, 'partial');
  assert.match(partial.reviewScope, /单选题 1-15/);
  assert.equal(unverified.reviewStatus, 'unverified');
  assert.equal(unverified.reviewedBy, '');
});

test('generic study hints do not change when the stored answer changes', () => {
  const question = {
    id: 1,
    type: 'single',
    question: '下面 C++ 循环执行后，变量 i 的值是什么？',
    options: ['0', '1', '2', '3'],
    answer: 0,
    explanation: '答案与解析尚未核验。',
  };

  const first = buildGenericStudyHint(question, 2);
  const second = buildGenericStudyHint({ ...question, answer: 3 }, 2);

  assert.deepEqual(first, second);
  assert.deepEqual(first.optionAnalysis, []);
  assert.equal(first.qualityFlags.genericOnly, true);
});
