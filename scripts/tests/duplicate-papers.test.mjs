import test from 'node:test';
import assert from 'node:assert/strict';

import { getPaper, paperIds, paperMeta } from '../../src/data/gesp/index.js';

// 同一等级、不同场次的两份真题不应该有大量相同的题干。出现高重复要么是把
// 同一份卷子录了两遍，要么是抓取时张冠李戴——2026-03-l6 就有 72% 的题干与
// 2025-12-l6 相同，且其中 11 道答案互相矛盾，两份至少有一份是错的。
const normalizeStem = (stem) => String(stem || '')
  .replace(/\s+/g, '')
  .replace(/[（）()【】]/g, '')
  .slice(0, 50);

// 已知的重复对。它们是历史遗留，先记录在案防止扩散；每修好一对就从这里删掉。
const KNOWN_DUPLICATE_PAIRS = new Set([
  '2025-12-l6|2026-03-l6',
  '2025-12-l7|2026-03-l7',
  '2025-12-l8|2026-03-l8',
]);

const OVERLAP_LIMIT = 0.3;

test('no unrecorded pair of same-level papers shares most of its questions', async () => {
  const papers = [];
  for (const paperId of paperIds) {
    if (paperMeta[paperId]?.unofficial) continue;
    const paper = await getPaper(paperId);
    const stems = new Map(
      (paper.questions || [])
        .filter(question => ['single', 'judge'].includes(question.type))
        .map(question => [normalizeStem(question.question), question]),
    );
    papers.push({ id: paperId, level: paperMeta[paperId].level, stems });
  }

  const offenders = [];
  for (let i = 0; i < papers.length; i += 1) {
    for (let j = i + 1; j < papers.length; j += 1) {
      const [a, b] = [papers[i], papers[j]];
      if (a.level !== b.level) continue;

      let shared = 0;
      let conflicting = 0;
      for (const [stem, question] of b.stems) {
        const counterpart = a.stems.get(stem);
        if (!counterpart) continue;
        shared += 1;
        if (counterpart.answer !== question.answer) conflicting += 1;
      }

      const ratio = shared / Math.min(a.stems.size, b.stems.size);
      if (ratio < OVERLAP_LIMIT) continue;
      const key = [a.id, b.id].sort().join('|');
      if (KNOWN_DUPLICATE_PAIRS.has(key)) continue;
      offenders.push(`${a.id} ↔ ${b.id}：${shared} 题重复（${Math.round(ratio * 100)}%），其中 ${conflicting} 道答案互相矛盾`);
    }
  }

  assert.deepEqual(
    offenders,
    [],
    `这些同级卷子的题干大量重复，说明录入时张冠李戴：\n${offenders.join('\n')}`,
  );
});

test('the recorded duplicate pairs still exist, so the list cannot rot silently', async () => {
  const stillDuplicated = new Set();
  for (const key of KNOWN_DUPLICATE_PAIRS) {
    const [left, right] = key.split('|');
    const [a, b] = await Promise.all([getPaper(left), getPaper(right)]);
    const stems = new Set(
      (a.questions || [])
        .filter(question => ['single', 'judge'].includes(question.type))
        .map(question => normalizeStem(question.question)),
    );
    const objective = (b.questions || []).filter(question => ['single', 'judge'].includes(question.type));
    const shared = objective.filter(question => stems.has(normalizeStem(question.question))).length;
    if (shared / Math.min(stems.size, objective.length) >= OVERLAP_LIMIT) stillDuplicated.add(key);
  }

  const resolved = [...KNOWN_DUPLICATE_PAIRS].filter(key => !stillDuplicated.has(key));
  assert.deepEqual(
    resolved,
    [],
    `这些卷对已经不再重复，请从 KNOWN_DUPLICATE_PAIRS 里删掉：${resolved.join(', ')}`,
  );
});
