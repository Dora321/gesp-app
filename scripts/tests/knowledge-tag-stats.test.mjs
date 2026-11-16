import test from 'node:test';
import assert from 'node:assert/strict';

import { getPaper, paperIds, paperMeta } from '../../src/data/gesp/index.js';
import { normalizeTopicTags } from '../../src/data/gesp/topicTaxonomy.js';
import { buildKnowledgeTagStats } from '../../src/utils/knowledgeTagStats.js';

test('knowledge tag stats count papers and questions from authored tags only', () => {
  const stats = buildKnowledgeTagStats([
    {
      id: '2024-01-l1',
      level: 1,
      questions: [
        { id: 1, tags: ['基础语法', '单选题'] },
        { id: 2, tags: ['基础语法', '循环'] },
      ],
      programmingQuestions: [{ id: 3, tags: ['循环', 'GESP1级'] }],
      // 同一题同时出现在两个集合时只算一次。
      codingQuestions: [{ id: 3, tags: ['循环'] }],
    },
    {
      id: '2024-02-l1',
      level: 1,
      questions: [
        { id: 1, tags: ['循环控制'] },
        { id: 2, tags: ['时间复杂度'] },
      ],
    },
    {
      id: '2024-01-l2',
      level: 2,
      questions: [{ id: 1, tags: ['客观题', '单选题'] }],
    },
  ]);

  assert.equal(stats[1].paperCount, 2);
  assert.deepEqual(stats[1].tags['基础语法'], { papers: 1, questions: 2 });
  // 「循环控制」按别名并入「循环」，同一题里的重复标签不重复计数。
  assert.deepEqual(stats[1].tags['循环'], { papers: 2, questions: 3 });
  assert.deepEqual(stats[1].tags['复杂度分析'], { papers: 1, questions: 1 });
  assert.equal(stats[1].tags['GESP1级'], undefined);
  assert.equal(stats[1].tags['单选题'], undefined);
  assert.equal(stats[2].paperCount, 1);
  assert.deepEqual(stats[2].tags, {});
});

test('knowledge tag stats stay consistent with the real question bank', async () => {
  const papers = await Promise.all(paperIds.map(paperId => getPaper(paperId)));
  const stats = buildKnowledgeTagStats(papers);
  const levelPapers = new Map();
  const levelQuestionCounts = new Map();
  const levelTags = new Map();

  for (const paper of papers) {
    const level = paper.level;
    levelPapers.set(level, (levelPapers.get(level) || 0) + 1);
    const ids = new Set();
    for (const question of [
      ...(paper.questions || []),
      ...(paper.programmingQuestions || []),
      ...(paper.codingQuestions || []),
    ]) {
      const key = question?.id === undefined || question?.id === null ? question : String(question.id);
      if (ids.has(key)) continue;
      ids.add(key);
      const tags = normalizeTopicTags(question.tags);
      levelQuestionCounts.set(level, (levelQuestionCounts.get(level) || 0) + 1);
      for (const tag of new Set(tags)) {
        const byTag = levelTags.get(level) || new Map();
        byTag.set(tag, (byTag.get(tag) || 0) + 1);
        levelTags.set(level, byTag);
      }
    }
  }

  for (const [level, paperCount] of levelPapers) {
    const levelStats = stats[level];
    assert.ok(levelStats, `missing stats for level ${level}`);
    assert.equal(levelStats.paperCount, paperCount);

    for (const [tag, entry] of Object.entries(levelStats.tags)) {
      assert.ok(entry.papers >= 1, `L${level} ${tag}: papers should be at least 1`);
      assert.ok(entry.papers <= levelStats.paperCount, `L${level} ${tag}: more papers than the level has`);
      assert.ok(entry.questions >= entry.papers, `L${level} ${tag}: questions < papers`);
      assert.ok(
        entry.questions <= levelQuestionCounts.get(level),
        `L${level} ${tag}: questions exceed the whole level's question count`,
      );
    }

    // 每道题自带的知识点标签都必须能在统计里找到（人工 tags 是统计的唯一来源）。
    for (const [tag, questionCount] of levelTags.get(level)) {
      assert.equal(
        levelStats.tags[tag]?.questions,
        questionCount,
        `L${level} ${tag}: stats question count does not match the bank`,
      );
    }
  }

  assert.equal(Object.keys(stats).length, new Set(Object.values(paperMeta).map(meta => meta.level)).size);
});
