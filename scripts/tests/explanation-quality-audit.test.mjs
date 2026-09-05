import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
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

// 模板解析会给每个未被选中的选项自动写「：错误。」。在「以下说法不正确的是」
// 这类题上，那几个选项本身是正确说法，这条判语是反的。它必须永远保持为 0。
test('template explanations never fabricate per-option verdicts', () => {
  assert.deepEqual(classifyExplanation({
    explanation: `**答案：D**

本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

- **A 类是一个抽象的概念。**：错误。
- **D 类定义后不能扩展。**：正确答案。`,
  }).sort(), ['fabricated-verdict', 'template']);

  // 真正写过分析的解析里说某个选项「错误」是有依据的，不该被误伤。
  assert.deepEqual(classifyExplanation({
    explanation: `**答案：C**

逐项核对四个说法与 C++ 标准的规定。

- **A 缩进决定循环体范围**：错误。C++ 是自由格式语言，编译器不依赖缩进划分代码块，只有紧跟关键字的第一条语句属于循环体。`,
  }), []);

  const baseline = JSON.parse(
    readFileSync(new URL('../explanation-quality-baseline.json', import.meta.url), 'utf8'),
  );
  assert.equal(baseline.limits['fabricated-verdict'], 0);
});

// 旧策略只禁止新增问题条目，于是 400 多条模板解析可以永远停在基线里——
// 修不修都是绿的。棘轮要求数量下降后必须重新记录，上限因此只降不升。
test('the explanation baseline ratchets down instead of freezing the debt', () => {
  const baseline = JSON.parse(
    readFileSync(new URL('../explanation-quality-baseline.json', import.meta.url), 'utf8'),
  );

  for (const [category, keys] of Object.entries(baseline.issues)) {
    assert.equal(
      baseline.limits[category],
      keys.length,
      `${category} 的上限必须等于实际条目数，否则基线又变回可以藏债务的宽松集合`,
    );
  }

  // 上限调松一格就必须失败：这正是「只降不升」的约束。
  const loosened = {
    ...baseline,
    limits: { ...baseline.limits, template: baseline.limits.template + 5 },
  };
  const temporaryPath = fileURLToPath(new URL('../explanation-quality-baseline.json', import.meta.url));
  const original = readFileSync(temporaryPath, 'utf8');
  writeFileSync(temporaryPath, JSON.stringify(loosened, null, 2));
  try {
    assert.throws(
      () => execFileSync(
        process.execPath,
        ['scripts/audit-explanation-quality.mjs', '--check'],
        { cwd: root, encoding: 'utf8', stdio: 'pipe' },
      ),
      /收紧基线/,
    );
  } finally {
    writeFileSync(temporaryPath, original);
  }
});
