import test from 'node:test';
import assert from 'node:assert/strict';

import { getPaper, paperIds, paperMeta } from '../../src/data/gesp/index.js';
import { paperStats } from '../../src/data/gesp/_stats.js';

// 主页把「N 道题已标注风险」当作可信度的证据展示。这个数字由注册表生成器算出，
// 这里确认它确实等于题库里的实际标记数——否则主页会拿着一个陈旧的数字讲信任。
test('the advertised flagged-question count matches the bank', async () => {
  let flagged = 0;
  for (const paperId of paperIds) {
    if (paperMeta[paperId]?.unofficial) continue;
    const paper = await getPaper(paperId);
    flagged += (paper.questions || [])
      .filter(question => ['single', 'judge'].includes(question.type) && question.sourceIntegrity)
      .length;
  }

  assert.equal(
    paperStats.integrityFlaggedQuestionCount,
    flagged,
    `_stats.js 记的是 ${paperStats.integrityFlaggedQuestionCount} 道，实际是 ${flagged} 道，请重新运行 npm run generate:papers`,
  );
});

// 核验进度三个数必须能拼回总卷数，否则主页会漏掉一整类卷子。
test('paper verification counts add up to the advertised paper count', () => {
  const { verifiedPaperCount, partialPaperCount, unverifiedPaperCount, paperCount } = paperStats;
  assert.equal(
    verifiedPaperCount + partialPaperCount + unverifiedPaperCount,
    paperCount,
    '完整核验 + 部分核验 + 待核验 应当等于收录卷数',
  );
  assert.equal(
    paperCount,
    Object.values(paperMeta).filter(meta => !meta.unofficial).length,
    'paperStats.paperCount 应当只统计正式真题',
  );
});
