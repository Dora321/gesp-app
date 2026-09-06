import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getBrokenPresentationErrors,
  getDroppedFormulaErrors,
  getObjectiveStemIntegrityErrors,
  questionHasCodeContent,
  questionReferencesCode,
} from '../validate-question-bank.js';
import { getPaper, paperIds, paperMeta } from '../../src/data/gesp/index.js';

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

// 6–8 级最常见的问法是「下面程序的输出为」，而不是「下面代码」。早期门禁只认
// 「代码/代码片段/程序段」，于是这一整类缺代码的题从未被拦下。这里把两种问法都钉住。
test('code-reference gate recognises 程序 phrasing, not just 代码', () => {
  const referencing = [
    '下面程序的输出为（ ）。',
    '下面程序的运⾏结果为（ ）。',
    '下面程序中，函数 query 的时间复杂度是（ ）。',
    '当输入 2023 时，下列程序的输出结果为（ ）。',
    '以下代码实现了二叉树的（ ）。',
    '下面的 C++ 程序执行后输出是（ ）。',
  ];
  referencing.forEach((question) => {
    assert.equal(questionReferencesCode({ question }), true, question);
  });
});

// 只是顺带提到「程序」的散文题没有代码是正常的，不能被门禁误伤。
test('code-reference gate ignores prose questions that merely mention a program', () => {
  const prose = [
    '小杨想编写程序来计算 1 到 10001 之间所有偶数的和，请问下列关于实现该程序时采用的主要控制结构哪个说法最不合适（ ）。',
    '如果要找出整数 a、b 中较大一个，通常要用下面哪种程序结构？（ ）。',
    '下列流程图，属于计算机的哪种程序结构？（ ）。',
  ];
  prose.forEach((question) => {
    assert.equal(questionReferencesCode({ question }), false, question);
  });
});

test('every question that promises code either ships it or is flagged missing-code', async () => {
  const unflagged = [];

  for (const paperId of paperIds) {
    if (paperMeta[paperId]?.unofficial) continue;
    const paper = await getPaper(paperId);
    for (const question of paper.questions || []) {
      if (!['single', 'judge'].includes(question.type)) continue;
      if (question.sourceIntegrity) continue;
      if (questionReferencesCode(question) && !questionHasCodeContent(question)) {
        unflagged.push(`${paperId}:Q${question.id}`);
      }
    }
  }

  assert.deepEqual(
    unflagged,
    [],
    `这些题的题干承诺了代码但题面没有代码，必须补 sourceIntegrity: 'missing-code'：${unflagged.join(', ')}`,
  );
});

// 官方 PDF 的公式是图片/特殊字形，文本层提取会整块吞掉，只在中文句子里留下空档。
// 这类题看着完整，实际无法作答——六到八级尤其密集。
test('stems whose formula was dropped during extraction are caught', () => {
  const broken = [
    '假定只有一个根节点的树的深度为 1 ，则一棵有 个节点的完全二叉树，则树的深度为 。',
    '在 个元素的二叉排序树中查找一个元素，平均情况的时间复杂度是 。',
    '一棵有 个节点的二叉树一定有 条边。',
  ];
  broken.forEach((question, index) => {
    const errors = getDroppedFormulaErrors({ type: 'judge', question }, index + 1);
    assert.ok(errors.length > 0, question);
    assert.match(errors[0], /疑似丢失公式或数值/);
  });
});

test('complete stems with real numbers are not mistaken for dropped formulas', () => {
  const intact = [
    '一棵有 2023 个节点的完全二叉树，则树的深度为（ ）。',
    '在 n 个元素的二叉排序树中查找一个元素，平均情况的时间复杂度是 O(log n)。',
    '下列关于二叉树的说法，正确的是（ ）。',
  ];
  intact.forEach((question) => {
    assert.deepEqual(getDroppedFormulaErrors({ type: 'single', question }), [], question);
  });
});

test('every objective question with a dropped formula carries sourceIntegrity', async () => {
  const unflagged = [];
  for (const paperId of paperIds) {
    if (paperMeta[paperId]?.unofficial) continue;
    const paper = await getPaper(paperId);
    for (const question of paper.questions || []) {
      if (getDroppedFormulaErrors(question, question.id).length > 0) {
        unflagged.push(`${paperId}:Q${question.id}`);
      }
    }
  }
  assert.deepEqual(
    unflagged,
    [],
    `这些题的公式在提取时丢失，必须补 sourceIntegrity: 'missing-formula'：${unflagged.join(', ')}`,
  );
});

// 提取事故的其余形态：选项还是占位符、题干混进 PDF 页脚（说明抓取跨页串了内容）、
// 选项末尾的复杂度公式被吞掉。三者都让题目无法作答。
test('placeholder options, page footers and truncated options are caught', () => {
  const cases = [
    {
      type: 'single',
      question: '下面代码的输出是（ ）。',
      options: ['stack<int> s;', '选项B', '选项C', '选项D'],
      expect: /选项仍是占位符/,
    },
    {
      type: 'single',
      question: '横线处应填入（ ）。 第 7 页 / 共 13 页',
      options: ['a', 'b', 'c', 'd'],
      expect: /题干混入 PDF 页脚/,
    },
    {
      type: 'single',
      question: '以下说法一定正确的是（ ）。',
      options: ['最坏情况下，访问结点数是', '最坏情况下，访问结点数为', 'c', 'd'],
      expect: /选项末尾公式丢失/,
    },
  ];

  cases.forEach(({ expect, ...question }, index) => {
    const errors = getBrokenPresentationErrors(question, index + 1);
    // 一道题可能同时命中多条（截断的选项往往也彼此重复），断言命中了期望的那条即可。
    assert.ok(errors.length > 0, JSON.stringify(question));
    assert.ok(errors.some(error => expect.test(error)), errors.join(' | '));
  });
});

test('well-formed questions are not flagged as broken presentation', () => {
  assert.deepEqual(getBrokenPresentationErrors({
    type: 'single',
    question: '下面代码的输出是（ ）。',
    options: ['0', '5', '55', '无法确定。'],
  }), []);
});

test('every objective question with a broken presentation carries sourceIntegrity', async () => {
  const unflagged = [];
  for (const paperId of paperIds) {
    if (paperMeta[paperId]?.unofficial) continue;
    const paper = await getPaper(paperId);
    for (const question of paper.questions || []) {
      if (getBrokenPresentationErrors(question, question.id).length > 0) {
        unflagged.push(`${paperId}:Q${question.id}`);
      }
    }
  }
  assert.deepEqual(unflagged, [], `这些题的题面已损坏但未标记：${unflagged.join(', ')}`);
});

// 选项本身就是运算符或 ASCII 图形的题目是正常的（「以下哪个不是 C++ 的运算符」），
// 「只剩标点」这条检查不能把它们误伤。
test('operator and ASCII-art options are not mistaken for stripped punctuation', () => {
  assert.deepEqual(getBrokenPresentationErrors({
    type: 'single',
    question: '以下哪个不是 C++ 语言的运算符？',
    options: ['=', '==', '/=', '\\='],
  }), []);

  assert.deepEqual(getBrokenPresentationErrors({
    type: 'single',
    question: '执行后输出的字符图形是（ ）。',
    options: ['*****\n ****', '    *\n   ***', '*\n**', '    *\n   **'],
  }), []);
});
