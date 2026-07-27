import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { classifyExplanation } from '../audit-explanation-quality.mjs';

const root = fileURLToPath(new URL('../..', import.meta.url));

test('explanation audit identifies teaching-quality regressions', () => {
  assert.deepEqual(classifyExplanation({
    explanation: `**答案：B**

先代入最小输入逐步计算，再比较四个选项。A 忽略了循环边界，C 把赋值当成比较，D 多执行了一轮。

**易错点**：循环结束时变量已经越过边界。`,
  }), []);

  assert.deepEqual(classifyExplanation({
    explanation: '本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。',
  }).sort(), ['short', 'template']);

  assert.ok(classifyExplanation({
    explanation: `${'推导'.repeat(50)}错误（说法正确）`,
  }).includes('contradictory'));
});

test('current question bank does not exceed the explanation-quality baseline', () => {
  const output = execFileSync(
    process.execPath,
    ['scripts/audit-explanation-quality.mjs', '--check'],
    { cwd: root, encoding: 'utf8' },
  );

  assert.match(output, /Explanation quality baseline passed/);
});
