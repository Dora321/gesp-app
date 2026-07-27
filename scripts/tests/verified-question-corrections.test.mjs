import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { paperIds } from '../../src/data/gesp/_generated.js';
import { getPaper } from '../../src/data/gesp/index.js';
import { paperData as rawL6September2024 } from '../../src/data/gesp/level6/2024-09-l6.js';
import { paperData as rawL8December2024 } from '../../src/data/gesp/level8/2024-12-l8.js';
import { paperData as rawL8March2026 } from '../../src/data/gesp/level8/2026-03-l8.js';
import {
  applyVerifiedQuestionCorrections,
  verifiedQuestionCorrections,
} from '../../src/data/gesp/verifiedQuestionCorrections.js';

test('verified question corrections are traceable to official papers', () => {
  for (const [paperId, correction] of Object.entries(verifiedQuestionCorrections)) {
    assert.ok(paperIds.includes(paperId), `Unknown paper: ${paperId}`);
    assert.match(correction.sourceUrl, /^https:\/\//, `${paperId} must include an official source URL`);
    assert.ok(Object.keys(correction.questions || {}).length > 0, `${paperId} has no corrected questions`);

    for (const [questionId, question] of Object.entries(correction.questions)) {
      assert.ok(Number.isInteger(question.sourcePage) && question.sourcePage > 0, `${paperId}:Q${questionId} has no source page`);
      if ('code' in question) {
        assert.ok(typeof question.code === 'string' && question.code.trim().length >= 3, `${paperId}:Q${questionId} has empty code`);
      }
    }
  }
});

test('verified corrections restore the official code and options for damaged questions', () => {
  const l6 = applyVerifiedQuestionCorrections(rawL6September2024);
  const l6q12 = l6.questions.find(question => question.id === 12);
  const l6q13 = l6.questions.find(question => question.id === 13);
  assert.match(l6q12.code, /tree_node\* insert\(tree_node\* root, int val\)/);
  assert.match(l6q12.options[0], /insert\(root->left, val\)/);
  assert.equal(l6q13.question.includes('[5, 3, 7, 2, 4, 6, 8]'), true);
  assert.deepEqual(l6q13.options, [
    '5 3 7 2 4 6 8',
    '2 3 4 5 6 7 8',
    '2 4 3 6 8 7 5',
    '2 4 3 5 6 7 8',
  ]);

  const l8 = applyVerifiedQuestionCorrections(rawL8December2024);
  const l8q7 = l8.questions.find(question => question.id === 7);
  const l8q12 = l8.questions.find(question => question.id === 12);
  const l8q14 = l8.questions.find(question => question.id === 14);
  assert.match(l8q7.question, /\$\(x\+y\)\^6\$/);
  assert.match(l8q12.code, /Edge\* e = graph\[minv\]/);
  assert.match(l8q12.options[1], /min \+ e->len/);
  assert.match(l8q14.code, /void quick_sort\(int a\[\], int n\)/);
  assert.equal(l8q14.options[0], 'l < r; a + pivot + 1, n - pivot - 1');
  assert.deepEqual(l8q14.tags, ['排序算法']);
});

test('L8 topic tags keep sorting, combinatorics, and dynamic programming distinct', () => {
  const tagOf = (paper, id) => paper.questions.find(question => question.id === id).tags;
  assert.deepEqual(tagOf(rawL8March2026, 2), ['分治']);
  assert.deepEqual(tagOf(rawL8March2026, 4), ['组合数学']);
  assert.deepEqual(tagOf(rawL8March2026, 18), ['排序算法']);
  assert.deepEqual(tagOf(rawL8March2026, 25), ['动态规划']);
});

const contentAuditCases = [
  ['2023-12-l5', 5, 1, 3, true],
  ['2024-03-l5', 4, 1, 2, true],
  ['2025-06-l5', 6, 3, 4, true],
  ['2025-12-l5', 7, 0, 4, true],
  ['2023-09-l6', 5, 0, 2, true],
  ['2023-09-l6', 7, 3, 3, true],
  ['2024-03-l6', 8, 2, 3, true],
  ['2024-06-l6', 2, 1, 1, true],
  ['2025-03-l6', 11, 0, 4, true],
  ['2025-12-l6', 11, 0, 7, true],
  ['2025-12-l6', 12, 2, 8, true],
  ['2026-03-l6', 11, 1, 4, false],
  ['2024-09-l8', 9, 0, 3, true],
  ['2025-03-l8', 14, 1, 6, true],
];

test('content-audited questions retain official answers and traceability', async () => {
  for (const [paperId, questionId, answer, sourcePage, requiresCode] of contentAuditCases) {
    const paper = await getPaper(paperId);
    const question = paper.questions.find(item => item.id === questionId);

    assert.ok(question, `${paperId}:Q${questionId} is missing`);
    assert.equal(question.answer, answer, `${paperId}:Q${questionId} answer drifted`);
    assert.equal(question.sourcePage, sourcePage, `${paperId}:Q${questionId} source page drifted`);
    assert.equal(question.sourceVerified, true, `${paperId}:Q${questionId} lost verification status`);
    assert.equal(question.requiresCode, requiresCode, `${paperId}:Q${questionId} code requirement drifted`);
    assert.match(paper.source.officialPdf, /^https:\/\/gesp\.ccf\.org\.cn\//);
  }
});

const restoredOfficialQuestionCases = [
  ['2023-12-l1', 8, 2, 3],
  ['2024-12-l2', 14, 3, 5],
  ['2025-06-l1', 15, 1, 5],
  ['2024-06-l2', 15, 3, 6],
  ['2025-03-l2', 13, 1, 5],
  ['2025-12-l2', 10, 1, 3],
  ['2024-12-l4', 9, 0, 4],
  ['2024-12-l4', 15, 0, 6],
  ['2023-12-l5', 4, 0, 2],
  ['2024-06-l5', 3, 1, 2],
  ['2024-06-l5', 15, 2, 7],
  ['2024-09-l5', 6, 0, 3],
  ['2024-09-l5', 8, 0, 4],
  ['2024-09-l5', 10, 1, 5],
  ['2024-12-l5', 9, 0, 5],
  ['2024-12-l5', 13, 0, 7],
  ['2025-09-l5', 2, 2, 1],
  ['2024-06-l5', 8, 3, 4],
  ['2024-03-l6', 14, 2, 5],
  ['2024-06-l6', 14, 0, 7],
  ['2024-09-l6', 15, 2, 7],
  ['2024-12-l6', 13, 2, 5],
  ['2026-03-l6', 14, 2, 6],
  ['2024-06-l7', 14, 1, 5],
  ['2025-06-l7', 4, 3, 1],
  ['2025-06-l7', 5, 0, 2],
  ['2025-06-l7', 8, 1, 2],
  ['2025-06-l7', 12, 3, 3],
  ['2025-06-l7', 13, 2, 4],
  ['2025-06-l7', 14, 0, 4],
  ['2025-06-l7', 15, 1, 4],
  ['2025-09-l7', 14, 2, 3],
  ['2026-03-l7', 1, 3, 1],
  ['2026-03-l7', 13, 3, 4],
  ['2024-06-l8', 4, 2, 1],
  ['2024-06-l8', 15, 3, 4],
  ['2024-09-l8', 14, 0, 7],
  ['2025-06-l8', 15, 0, 6],
  ['2026-03-l8', 3, 1, 1],
  ['2026-03-l8', 15, 0, 4],
];

test('restored official questions keep their source-backed content', async () => {
  for (const [paperId, questionId, answer, sourcePage] of restoredOfficialQuestionCases) {
    const paper = await getPaper(paperId);
    const question = paper.questions.find(item => item.id === questionId);

    assert.ok(question, `${paperId}:Q${questionId} is missing`);
    assert.equal(question.answer, answer, `${paperId}:Q${questionId} answer drifted`);
    assert.equal(question.sourcePage, sourcePage, `${paperId}:Q${questionId} source page drifted`);
    assert.equal(question.sourceVerified, true, `${paperId}:Q${questionId} lost verification status`);
    assert.equal(question.sourceIntegrity, undefined, `${paperId}:Q${questionId} regained an integrity warning`);
    assert.equal(question.integrityNote, undefined, `${paperId}:Q${questionId} regained an integrity note`);
    assert.equal(question.reviewedAt, '2026-07-27', `${paperId}:Q${questionId} review date drifted`);
    const sourceUrl = question.sourceUrl || paper.source?.officialPdf || paper.sourceUrl;
    assert.match(sourceUrl, /^https:\/\//, `${paperId}:Q${questionId} lost its source URL`);
    assert.ok(question.question.trim().length >= 20, `${paperId}:Q${questionId} has a truncated stem`);
    assert.equal(question.options.length, 4, `${paperId}:Q${questionId} must retain four options`);
    assert.ok(question.explanation.trim().length >= 80, `${paperId}:Q${questionId} explanation is too short`);

    const localImage = question.question.match(/!\[[^\]]*\]\(\/([^)]+)\)/);
    if (localImage) {
      assert.ok(
        existsSync(path.join(process.cwd(), 'public', localImage[1])),
        `${paperId}:Q${questionId} references a missing local image`,
      );
    }
  }
});

test('official answer-key conflicts stay visible and excluded from scoring', async () => {
  const paper = await getPaper('2025-06-l5');
  const question = paper.questions.find(item => item.id === 10);

  assert.equal(question.answer, 3);
  assert.equal(question.sourceIntegrity, 'answer-key-conflict');
  assert.match(question.integrityNote, /CCF.*C.*存档版.*D/);
  assert.deepEqual(question.answerDispute, {
    currentOfficialKey: 2,
    archivedOfficialKey: 3,
    siteAnswer: 3,
    status: 'unresolved',
  });
});

const march2026OfficialKeys = {
  '2026-03-l1': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1734124574343200.pdf',
    answers: [1, 0, 3, 3, 0, 0, 1, 3, 3, 1, 1, 1, 3, 1, 0],
  },
  '2026-03-l2': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1734124601606176.pdf',
    answers: [1, 3, 3, 2, 1, 0, 0, 2, 2, 0, 1, 2, 1, 0, 0],
    reviewStatus: 'verified',
    reviewedAt: '2026-07-27',
    reviewScope: /全卷 27 题/,
  },
  '2026-03-l3': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1734775052173344.pdf',
    answers: [2, 1, 2, 0, 3, 1, 1, 3, 1, 0, 1, 1, 2, 0, 3],
  },
  '2026-03-l4': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1734124643549216.pdf',
    answers: [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0],
  },
};

test('latest L1-L4 papers expose bounded official verification', async () => {
  for (const [paperId, expected] of Object.entries(march2026OfficialKeys)) {
    const paper = await getPaper(paperId);
    const allQuestions = [
      ...(paper.questions || []),
      ...(paper.programmingQuestions || []),
      ...(paper.codingQuestions || []),
    ];

    assert.equal(paper.reviewStatus, expected.reviewStatus || 'partial');
    assert.equal(paper.reviewedBy, '本站校订');
    assert.equal(paper.reviewedAt, expected.reviewedAt || '2026-07-14');
    assert.equal(paper.sourceUrl, expected.sourceUrl);
    assert.match(paper.reviewScope, expected.reviewScope || /单选题 1-15/);
    assert.equal(allQuestions.length, 27, `${paperId} must retain the complete paper structure`);
    assert.deepEqual(
      allQuestions.slice(0, 15).map(question => question.answer),
      expected.answers,
      `${paperId} official single-choice key drifted`,
    );
  }
});

test('2025-12 L2 retains the fully audited original paper', async () => {
  const paper = await getPaper('2025-12-l2');
  const allQuestions = [
    ...(paper.questions || []),
    ...(paper.programmingQuestions || []),
  ];

  assert.equal(paper.reviewStatus, 'verified');
  assert.equal(paper.reviewedBy, '本站校订');
  assert.equal(paper.reviewedAt, '2026-07-27');
  assert.match(paper.reviewScope, /全卷 27 题/);
  assert.equal(allQuestions.length, 27);
  assert.deepEqual(
    paper.questions.map(question => question.answer),
    [1, 1, 0, 1, 1, 3, 0, 3, 2, 1, 1, 1, 1, 1, 2, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1],
  );

  for (const question of allQuestions) {
    assert.equal(question.sourceVerified, true, `Q${question.id} lost source verification`);
    assert.ok(Number.isInteger(question.sourcePage), `Q${question.id} lost its source page`);
    assert.match(question.sourceUrl, /2025%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7\.pdf$/);
  }

  assert.match(paper.questions.find(question => question.id === 9).question, /if\s*\(j >= i\)/);
  assert.match(paper.questions.find(question => question.id === 11).question, /}\s*if\s*\(num > 5\)/);
  assert.match(paper.questions.find(question => question.id === 22).question, /N % N10 == N/);
  assert.match(paper.questions.find(question => question.id === 25).question, /printf\("%3d"/);
  assert.match(paper.programmingQuestions[0].question, /1\s*\\le\s*t\s*\\le\s*100/);
  assert.match(paper.programmingQuestions[1].referenceCode, /int H, W, x;/);
});

test('2025-09 L2 retains the audited paper and excludes official source defects', async () => {
  const paper = await getPaper('2025-09-l2');
  const allQuestions = [
    ...(paper.questions || []),
    ...(paper.programmingQuestions || []),
  ];

  assert.equal(paper.reviewStatus, 'verified');
  assert.equal(paper.reviewedAt, '2026-07-27');
  assert.match(paper.reviewScope, /全卷 27 题/);
  assert.equal(allQuestions.length, 27);
  assert.deepEqual(
    paper.questions.map(question => question.answer),
    [3, 2, 2, 3, 3, 0, 3, 1, 3, 0, 3, 2, 0, 0, 3, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
  );

  for (const question of allQuestions) {
    assert.equal(question.sourceVerified, true, `Q${question.id} lost source verification`);
    assert.ok(Number.isInteger(question.sourcePage), `Q${question.id} lost its source page`);
  }

  const officialDefects = paper.questions
    .filter(question => question.sourceIntegrity === 'official-source-defect')
    .map(question => question.id);
  assert.deepEqual(officialDefects, [6, 15, 19]);
  assert.match(paper.questions.find(question => question.id === 18).question, /a < 10 and 20/);
  assert.match(paper.questions.find(question => question.id === 21).explanation, /686766/);
  assert.match(paper.programmingQuestions[0].referenceCode, /int v = i % 10/);
  assert.match(paper.programmingQuestions[1].referenceCode, /abs\(k - i \+ 1\)/);
});

test('2025-06 L2 retains the audited paper and its source-defect exclusions', async () => {
  const paper = await getPaper('2025-06-l2');
  const allQuestions = [
    ...(paper.questions || []),
    ...(paper.programmingQuestions || []),
  ];

  assert.equal(paper.reviewStatus, 'verified');
  assert.equal(paper.reviewedAt, '2026-07-27');
  assert.match(paper.reviewScope, /全卷 27 题/);
  assert.equal(allQuestions.length, 27);
  assert.deepEqual(
    paper.questions.map(question => question.answer),
    [2, 0, 2, 0, 3, 3, 2, 2, 1, 0, 3, 3, 3, 3, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0],
  );

  for (const question of allQuestions) {
    assert.equal(question.sourceVerified, true, `Q${question.id} lost source verification`);
    assert.ok(Number.isInteger(question.sourcePage), `Q${question.id} lost its source page`);
  }

  assert.deepEqual(
    paper.questions
      .filter(question => question.sourceIntegrity === 'official-source-defect')
      .map(question => question.id),
    [5, 15],
  );
  assert.match(paper.questions.find(question => question.id === 5).integrityNote, /未定义行为/);
  assert.match(paper.programmingQuestions[0].referenceCode, /if\(a\*b%2==0\) cnt\+\+/);
  assert.match(paper.programmingQuestions[1].referenceCode, /while\(a<=r\)/);
});

test('2025-03 L2 retains the fully audited original paper', async () => {
  const paper = await getPaper('2025-03-l2');
  const allQuestions = [
    ...(paper.questions || []),
    ...(paper.programmingQuestions || []),
  ];

  assert.equal(paper.reviewStatus, 'verified');
  assert.equal(paper.reviewedAt, '2026-07-27');
  assert.match(paper.reviewScope, /全卷 27 题/);
  assert.equal(allQuestions.length, 27);
  assert.deepEqual(
    paper.questions.map(question => question.answer),
    [3, 2, 0, 0, 3, 0, 3, 0, 2, 1, 2, 3, 1, 2, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
  );

  for (const question of allQuestions) {
    assert.equal(question.sourceVerified, true, `Q${question.id} lost source verification`);
    assert.ok(Number.isInteger(question.sourcePage), `Q${question.id} lost its source page`);
  }

  assert.deepEqual(
    allQuestions
      .filter(question => question.sourceIntegrity === 'official-source-defect')
      .map(question => question.id),
    [27],
  );
  assert.match(paper.programmingQuestions[1].integrityNote, /h.*h'.*0|正整数.*0/);
  assert.match(paper.questions.find(question => question.id === 3).question, /a == b;[\s\S]*b == a;/);
  assert.match(paper.questions.find(question => question.id === 5).question, /i < 10/);
  assert.match(paper.questions.find(question => question.id === 7).question, /i % 3 == 0/);
  assert.match(paper.questions.find(question => question.id === 8).question, /j = i; j > 0/);
  assert.match(paper.questions.find(question => question.id === 10).question, /\(j\s*=\s*i\)\s*<\s*N/);
  assert.match(paper.questions.find(question => question.id === 13).question, /last \+= 1/);
  assert.deepEqual(
    paper.programmingQuestions.map(question => question.title),
    ['等差矩阵', '时间跨越'],
  );
  assert.match(paper.programmingQuestions[0].question, /1\s*\\le\s*n\s*\\le\s*50/);
  assert.match(paper.programmingQuestions[0].referenceCode, /printf\("%d%c", i \* j, " \\n"\[j == m\]\)/);
  assert.deepEqual(paper.programmingQuestions[1].samples, [{
    input: '2008\n2\n28\n23\n1',
    output: '2008 2 29 0',
  }]);
  assert.match(paper.programmingQuestions[1].question, /2000\s*\\le\s*y\s*\\le\s*3000/);
  assert.match(paper.programmingQuestions[1].referenceCode, /if \(h >= 24\)/);
});

test('2024-12 L2 retains the audited paper and excludes its ambiguous single-choice item', async () => {
  const paper = await getPaper('2024-12-l2');
  const allQuestions = [
    ...(paper.questions || []),
    ...(paper.programmingQuestions || []),
  ];

  assert.equal(paper.reviewStatus, 'verified');
  assert.equal(paper.reviewedBy, '本站校订');
  assert.equal(paper.reviewedAt, '2026-07-27');
  assert.match(paper.reviewScope, /全卷 27 题/);
  assert.equal(allQuestions.length, 27);
  assert.deepEqual(
    paper.questions.map(question => question.answer),
    [2, 0, 3, 1, 3, 1, 2, 2, 3, 0, 0, 3, 1, 3, 2, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
  );

  for (const question of allQuestions) {
    assert.equal(question.sourceVerified, true, `Q${question.id} lost source verification`);
    assert.ok(Number.isInteger(question.sourcePage), `Q${question.id} lost its source page`);
  }

  assert.deepEqual(
    allQuestions
      .filter(question => question.sourceIntegrity === 'official-source-defect')
      .map(question => question.id),
    [11],
  );
  const q11 = paper.questions.find(question => question.id === 11);
  assert.match(q11.options[1], /print\("%c", '\\n'\)/);
  assert.match(q11.integrityNote, /A.*B|两个.*错误|多答案/);
  assert.match(paper.questions.find(question => question.id === 5).question, /int tnt;/);
  assert.match(paper.questions.find(question => question.id === 14).question, /height - i - 1|_______________/);
  assert.deepEqual(
    paper.programmingQuestions.map(question => question.title),
    ['寻找数字', '数位和'],
  );
  assert.match(paper.programmingQuestions[0].question, /1\s*\\le\s*t\s*\\le\s*10\^5/);
  assert.match(paper.programmingQuestions[0].question, /1\s*\\le\s*a\s*\\le\s*10\^8/);
  assert.match(paper.programmingQuestions[0].referenceCode, /sqrt\(sqrt\(a\)\)/);
  assert.match(paper.programmingQuestions[1].question, /12345/);
  assert.match(paper.programmingQuestions[1].question, /10\^\{12\}/);
  assert.match(paper.programmingQuestions[1].referenceCode, /smu \+= tmp % 10/);
});

test('2024-09 L2 retains the audited paper and excludes its official source defects', async () => {
  const paper = await getPaper('2024-09-l2');
  const allQuestions = [
    ...(paper.questions || []),
    ...(paper.programmingQuestions || []),
  ];

  assert.equal(paper.reviewStatus, 'verified');
  assert.equal(paper.reviewedBy, '本站校订');
  assert.equal(paper.reviewedAt, '2026-07-27');
  assert.match(paper.reviewScope, /全卷 27 题/);
  assert.equal(allQuestions.length, 27);
  assert.deepEqual(
    paper.questions.map(question => question.answer),
    [0, 2, 0, 2, 2, 3, 0, 0, 2, 1, 2, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1],
  );

  for (const question of allQuestions) {
    assert.equal(question.sourceVerified, true, `Q${question.id} lost source verification`);
    assert.ok(Number.isInteger(question.sourcePage), `Q${question.id} lost its source page`);
  }

  assert.deepEqual(
    allQuestions
      .filter(question => question.sourceIntegrity === 'official-source-defect')
      .map(question => question.id),
    [13, 14],
  );
  const q13 = paper.questions.find(question => question.id === 13);
  assert.match(q13.question, /float Sum = 0;[\s\S]*int cnt = 0;[\s\S]*while \(1\)/);
  assert.match(q13.integrityNote, /首次.*负数|cnt.*0|0.*0|多答案/);
  const q14 = paper.questions.find(question => question.id === 14);
  assert.match(q14.integrityNote, /num.*1|正整数.*1|不会输出.*NO/);
  assert.match(paper.questions.find(question => question.id === 6).question, /-2[\s\S]*3\.14/);
  assert.match(paper.questions.find(question => question.id === 11).options[2], /j = i; j < i\s*\*\s*2/);
  assert.match(paper.questions.find(question => question.id === 15).question, /while \(!Flag && M\)/);
  assert.deepEqual(
    paper.programmingQuestions.map(question => question.title),
    ['数位之和', '小杨的 N 字矩阵'],
  );
  assert.match(paper.programmingQuestions[0].question, /1\s*\\le\s*n\s*\\le\s*10\^5/);
  assert.match(paper.programmingQuestions[0].question, /1\s*\\le\s*a_i\s*\\le\s*10\^5/);
  assert.match(paper.programmingQuestions[0].referenceCode, /int ans\s*=\s*0/);
  assert.match(paper.programmingQuestions[0].referenceCode, /tot\s*\+=\s*\(x\s*%\s*10\)/);
  assert.match(paper.programmingQuestions[1].question, /3\s*\\le\s*m\s*\\le\s*49/);
  assert.match(paper.programmingQuestions[1].referenceCode, /if\s*\(j\s*==\s*1\s*\|\|\s*j\s*==\s*n\)/);
});
