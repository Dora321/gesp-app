import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// 考试模式是整卷计时练习：编程题只能看题面，绝不能提前露出思路或参考代码。
// 这些内容最容易在重构时被顺手加回来，所以这里对源码做一条静态防剧透断言。
const source = readFileSync(
  new URL('../../src/pages/exam/ExamModeView.jsx', import.meta.url),
  'utf8',
);

test('exam mode renders the shared CodingProblemView in exam variant', () => {
  assert.match(source, /<CodingProblemView[\s\S]*?variant="exam"/);
});

test('exam mode never renders solution-only fields for programming questions', () => {
  assert.doesNotMatch(source, /referenceCode/);
  assert.doesNotMatch(source, /explanation/);
  assert.doesNotMatch(source, /看思路与参考代码/);
});

test('exam mode resolves Luogu links through the shared coding helper', () => {
  assert.match(source, /getLuoguProblemUrl/);
  assert.doesNotMatch(source, /paperCodingMap/);
});
