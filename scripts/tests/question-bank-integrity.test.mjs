import test from 'node:test';
import assert from 'node:assert/strict';
import {
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
