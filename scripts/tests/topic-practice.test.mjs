import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

import { getPaper, paperIds, paperMeta } from '../../src/data/gesp/index.js';
import { buildTopicPaper, loadLevelTopics } from '../../src/data/gesp/topics.js';
import {
  getTopicGroup,
  normalizeTopicTags,
} from '../../src/data/gesp/topicTaxonomy.js';
import { INFERRED_TOPIC_TAGS, inferTopicTags } from '../../src/data/gesp/topicInference.js';

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

// 每个级别都必须有足够比例的题目能落到某个考点上。4~7 级曾经只带元标签，
// 「按考点练习」在七级只剩 1 道可练题——一个结构上存在、实际是空页的功能。
test('every level routes most of its practisable questions into a topic', async () => {
  const FLOOR = 0.55;
  const report = [];

  for (let level = 1; level <= 8; level += 1) {
    const { stats } = await loadLevelTopics(level);

    let practisable = 0;
    for (const paperId of paperIds) {
      if (paperMeta[paperId]?.unofficial || paperMeta[paperId]?.level !== level) continue;
      const paper = await getPaper(paperId);
      practisable += (paper.questions || [])
        .filter(question => ['single', 'judge'].includes(question.type) && !question.sourceIntegrity)
        .length;
    }

    const ratio = practisable === 0 ? 1 : stats.availableQuestionCount / practisable;
    report.push(`L${level} ${stats.availableQuestionCount}/${practisable} = ${(ratio * 100).toFixed(0)}%`);
    assert.ok(
      ratio >= FLOOR,
      `${level} 级只有 ${(ratio * 100).toFixed(0)}% 的题能进入按考点练习（下限 ${FLOOR * 100}%）。明细：${report.join(' | ')}`,
    );
  }
});

// 兜底组是设计上的逃生舱，不该常驻。标签命名漂移（最短路径 vs 最短路）会把考点
// 打散成一堆一题桶，既练不了也淹没真正的考点。
test('no topic falls back into the catch-all group', async () => {
  const stray = [];
  for (let level = 1; level <= 8; level += 1) {
    // 待核验题也会进入考点列表（开关打开时），所以两种模式都要查。
    for (const includePending of [false, true]) {
      const { topics } = await loadLevelTopics(level, { includePending });
      for (const topic of topics) {
        if (topic.group === '其他考点') stray.push(`L${level}:${topic.tag}`);
      }
    }
  }
  assert.deepEqual(stray, [], `这些标签没有归入任何考点分组，请在 topicTaxonomy 里登记或加别名：${stray.join(', ')}`);
});

test('inference only fills gaps and never overrides authored tags', async () => {
  const paper = await getPaper('2025-06-l8');
  const authored = paper.questions.find(question => (
    ['single', 'judge'].includes(question.type)
    && !question.sourceIntegrity
    && normalizeTopicTags(question.tags).length > 0
  ));
  assert.ok(authored, '这份卷子应当有人工标注的客观题');

  const { tagMap } = await loadLevelTopics(8);
  const resolved = new Set();
  for (const [tag, questions] of tagMap) {
    if (questions.some(question => question.sourcePaperId === '2025-06-l8' && question.id === authored.id)) {
      resolved.add(tag);
    }
  }
  assert.deepEqual([...resolved].sort(), normalizeTopicTags(authored.tags).sort());
});

test('every inferable tag is registered in a topic group', () => {
  const ungrouped = INFERRED_TOPIC_TAGS.filter(tag => getTopicGroup(tag) === '其他考点');
  assert.deepEqual(ungrouped, [], `推断规则会产出未分组的标签：${ungrouped.join(', ')}`);
});

test('inference ignores ambient code constructs', () => {
  // 每段 C++ 都有 for/if/数组/cout，把它们做成考点桶会吸进全部题目。
  const ambient = inferTopicTags({
    question: '下面代码的输出是（ ）。',
    code: 'int a[5];\nfor (int i = 0; i < 5; i++) { if (i % 2 == 0) cout << i; }',
    options: ['0', '024', '13', '01234'],
  });
  assert.deepEqual(ambient, []);
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
