import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getBrokenPresentationErrors,
  getUniformJudgeAnswerErrors,
  getUnrecoverableAdmissionErrors,
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

// 最可靠的一类信号：写解析的人已经确认推不出来了，只是没把它变成结构化标记，
// 于是题目照常计分。「a>>1 丢失最低位，无法还原」这种讲算法性质的说法必须放过。
test('explanations that admit the source is unrecoverable require sourceIntegrity', () => {
  const admissions = [
    '由于原题的表长与哈希函数均以图片形式给出、无法从文本恢复，此处依据官方答案确定为 D。',
    '具体分析依赖试卷原图结构。',
    '以下解析基于选项特征推断程序逻辑，待代码补充后需复核。',
  ];
  admissions.forEach((explanation, index) => {
    const errors = getUnrecoverableAdmissionErrors({ type: 'single', explanation }, index + 1);
    assert.equal(errors.length, 1, explanation);
    assert.match(errors[0], /解析自认原题无法从文本恢复/);
  });

  // 讲算法性质的「无法还原」不是对来源的供述，不能误伤。
  assert.deepEqual(getUnrecoverableAdmissionErrors({
    type: 'single',
    explanation: '`a>>1` 丢失了最低位信息，无法还原原值，因此该操作不可逆。',
  }), []);
});

test('no objective question ships an unflagged unrecoverable admission', async () => {
  const unflagged = [];
  for (const paperId of paperIds) {
    if (paperMeta[paperId]?.unofficial) continue;
    const paper = await getPaper(paperId);
    for (const question of paper.questions || []) {
      if (getUnrecoverableAdmissionErrors(question, question.id).length > 0) {
        unflagged.push(`${paperId}:Q${question.id}`);
      }
    }
  }
  assert.deepEqual(unflagged, [], `这些题的解析自认无法推导，必须标记：${unflagged.join(', ')}`);
});

// GESP 每卷 10 道判断题，真题里对错大致各半。一整卷答案全是同一个值不是巧合，
// 而是这批答案根本没录入、被填了默认值——本库曾有 11 张卷子如此，合计 103 道，
// 且它们的解析无一例外都是占位模板，两个证据互相印证。
//
// 这类题最危险：题面完整、看不出任何异常，学生照着做、照着对答案，却有近一半
// 会被判反。
test('a paper never records the same answer for all of its judge questions', () => {
  const uniform = getUniformJudgeAnswerErrors({
    id: 'fixture',
    questions: Array.from({ length: 10 }, (_, index) => ({ id: index + 1, type: 'judge', answer: 0 })),
  }, 'fixture');
  assert.equal(uniform.length, 1);
  assert.match(uniform[0], /答案全是「正确」/);

  // 对错混合是正常的，不能误报。
  const mixed = getUniformJudgeAnswerErrors({
    id: 'fixture',
    questions: Array.from({ length: 10 }, (_, index) => ({ id: index + 1, type: 'judge', answer: index % 2 })),
  }, 'fixture');
  assert.deepEqual(mixed, []);

  // 已经标记过的题不再重复报告，否则修好之后门禁永远红着。
  const flagged = getUniformJudgeAnswerErrors({
    id: 'fixture',
    questions: Array.from({ length: 10 }, (_, index) => ({
      id: index + 1, type: 'judge', answer: 0, sourceIntegrity: 'answer-key-suspect',
    })),
  }, 'fixture');
  assert.deepEqual(flagged, []);
});

test('no official paper ships an unflagged uniform judge answer key', async () => {
  const offenders = [];
  for (const paperId of paperIds) {
    if (paperMeta[paperId]?.unofficial) continue;
    const paper = await getPaper(paperId);
    offenders.push(...getUniformJudgeAnswerErrors(paper, paperId));
  }
  assert.deepEqual(offenders, [], `整卷判断题答案同值：\n${offenders.join('\n')}`);
});
