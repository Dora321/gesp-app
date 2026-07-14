import test from 'node:test';
import assert from 'node:assert/strict';
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

const march2026OfficialKeys = {
  '2026-03-l1': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1734124574343200.pdf',
    answers: [1, 0, 3, 3, 0, 0, 1, 3, 3, 1, 1, 1, 3, 1, 0],
  },
  '2026-03-l2': {
    sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1734124601606176.pdf',
    answers: [1, 3, 3, 2, 1, 0, 0, 2, 2, 0, 1, 2, 1, 0, 0],
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

    assert.equal(paper.reviewStatus, 'partial', `${paperId} must not claim full verification`);
    assert.equal(paper.reviewedBy, '本站校订');
    assert.equal(paper.reviewedAt, '2026-07-14');
    assert.equal(paper.sourceUrl, expected.sourceUrl);
    assert.match(paper.reviewScope, /单选题 1-15/);
    assert.equal(allQuestions.length, 27, `${paperId} must retain the complete paper structure`);
    assert.deepEqual(
      allQuestions.slice(0, 15).map(question => question.answer),
      expected.answers,
      `${paperId} official single-choice key drifted`,
    );
  }
});
