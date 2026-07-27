import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { paperMeta } from '../../src/data/gesp/index.js';
import { buildTopicPaper, loadLevelTopics } from '../../src/data/gesp/topics.js';
import {
  getTopicGroup,
  normalizeTopicTags,
} from '../../src/data/gesp/topicTaxonomy.js';

function allTopicQuestions(tagMap) {
  return [...tagMap.values()].flat();
}

test('topic practice always excludes unofficial papers', async () => {
  const trusted = await loadLevelTopics(3);
  const withPending = await loadLevelTopics(3, { includePending: true });
  const officialPaperCount = Object.values(paperMeta)
    .filter(meta => meta.level === 3 && !meta.unofficial)
    .length;

  assert.equal(trusted.stats.paperCount, officialPaperCount);
  assert.equal(withPending.stats.paperCount, officialPaperCount);
  assert.ok(
    allTopicQuestions(trusted.tagMap)
      .every(question => !paperMeta[question.sourcePaperId]?.unofficial),
  );
  assert.ok(
    allTopicQuestions(withPending.tagMap)
      .every(question => !paperMeta[question.sourcePaperId]?.unofficial),
  );
});

test('topic taxonomy merges aliases into stable two-level topics', () => {
  assert.deepEqual(
    normalizeTopicTags(['时间复杂度', '复杂度', '客观题', '数组与字符串']),
    ['复杂度分析', '数组', '字符串'],
  );
  assert.equal(getTopicGroup('复杂度分析'), '算法');
  assert.equal(getTopicGroup('最短路'), '图论');
});

test('topic practice exposes canonical tags with groups', async () => {
  const { topics } = await loadLevelTopics(5);
  assert.ok(topics.every(topic => topic.group));
  assert.equal(topics.some(topic => topic.tag === '时间复杂度'), false);
  assert.ok(topics.some(topic => topic.tag === '复杂度分析' && topic.group === '算法'));
});

test('topic practice excludes integrity risks by default and reports included pending questions', async () => {
  const trusted = await loadLevelTopics(2);
  const withPending = await loadLevelTopics(2, { includePending: true });
  const trustedQuestions = allTopicQuestions(trusted.tagMap);
  const allQuestions = allTopicQuestions(withPending.tagMap);
  const includedPending = new Set(
    allQuestions
      .filter(question => question.sourceIntegrity)
      .map(question => `${question.sourcePaperId}:${question.id}`),
  );

  assert.ok(trustedQuestions.length > 0);
  assert.ok(trustedQuestions.every(question => !question.sourceIntegrity));
  assert.equal(
    withPending.stats.availableQuestionCount,
    trusted.stats.availableQuestionCount + trusted.stats.pendingQuestionCount,
  );
  assert.equal(includedPending.size, withPending.stats.pendingQuestionCount);
});

test('virtual topic paper reports exact trusted and pending counts', () => {
  const paper = buildTopicPaper(7, '图论', [
    { id: 3, type: 'single', tags: ['图论'], sourceLabel: '2025·03' },
    {
      id: 8,
      type: 'judge',
      tags: ['图论'],
      sourceLabel: '2025·06',
      sourceIntegrity: 'missing-figure',
    },
  ]);

  assert.equal(paper.questionCount, 2);
  assert.equal(paper.pendingQuestionCount, 1);
  assert.match(paper.title, /2 题，含 1 道待核验题/);
  assert.ok(paper.questions[0].tags.includes('真题 2025·03'));
  assert.ok(paper.questions[1].tags.includes('待核验 2025·06'));

  const trustedPaper = buildTopicPaper(2, '循环', [
    { id: 1, type: 'single', tags: ['循环'], sourceLabel: '2024·09' },
  ]);
  assert.match(trustedPaper.title, /1 题，仅含题面完整真题/);
});

test('topic practice page exposes an accessible pending-question switch', async () => {
  const source = await readFile(
    new URL('../../src/pages/question-bank/TopicPracticePage.jsx', import.meta.url),
    'utf8',
  );

  assert.match(source, /role="switch"/);
  assert.match(source, /aria-checked=\{includePending\}/);
  assert.match(source, /包含待核验题/);
  assert.match(source, /includePending=1/);
});
