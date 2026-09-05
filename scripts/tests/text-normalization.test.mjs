import test from 'node:test';
import assert from 'node:assert/strict';

import { getPaper, paperIds } from '../../src/data/gesp/index.js';
import { hasCjkRadicals, normalizeCjkRadicals } from '../../src/data/gesp/textNormalization.js';
import { inferTopicTags } from '../../src/data/gesp/topicInference.js';

test('CJK radical code points fold back to ordinary ideographs', () => {
  // U+2F8F / U+2F3C / U+2F79 —— 和「行 / 心 / 网」同形但不同码位。
  assert.equal(normalizeCjkRadicals('运⾏ 贪⼼ ⽹络'), '运行 贪心 网络');
  assert.equal(hasCjkRadicals('运⾏'), true);
  assert.equal(hasCjkRadicals('运行'), false);
});

// 整体 NFKC 会把中文全角标点折成半角、把 O(n²) 压成 O(n2)。
// 题面里这些都是有意义的排版，不能动。
test('normalisation leaves full-width punctuation and superscripts alone', () => {
  const text = '输出是（ ），复杂度 O(n²)，选项：A；B。';
  assert.equal(normalizeCjkRadicals(text), text);
  assert.notEqual(text.normalize('NFKC'), text, '这段文本确实会被整体 NFKC 改动，所以上面的断言才有意义');
});

test('topic inference still matches when a stem carries radical code points', () => {
  const withRadicals = { question: '贪⼼算法的核⼼特征是（ ）。', options: [] };
  assert.ok(inferTopicTags(withRadicals).includes('贪心'));
});

test('no question in the bank ships radical code points', async () => {
  const offenders = [];
  for (const paperId of paperIds) {
    const paper = await getPaper(paperId);
    for (const question of paper.questions || []) {
      const blob = [question.question, question.code, question.explanation, (question.options || []).join('')]
        .filter(Boolean)
        .join('\n');
      if (hasCjkRadicals(blob)) offenders.push(`${paperId}:Q${question.id}`);
    }
  }
  assert.deepEqual(
    offenders,
    [],
    `这些题含 CJK 部首区字符，会让站内搜索与考点推断静默失效：${offenders.join(', ')}`,
  );
});
