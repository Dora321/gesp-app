import test from 'node:test';
import assert from 'node:assert/strict';

import { parseCodingProblem } from '../../src/utils/codingProblemSections.js';
import { paperData as l2Paper202609 } from '../../src/data/gesp/level2/2026-09-l2.js';
import { paperData as l3Paper202403 } from '../../src/data/gesp/level3/2024-03-l3.js';
import { paperData as l2Paper202303 } from '../../src/data/gesp/level2/2023-03-l2.js';

const programming = (paper, id) => [
  ...(paper.questions || []),
  ...(paper.programmingQuestions || []),
  ...(paper.codingQuestions || []),
].find((q) => Number(q.id) === id);

const textOf = (parsed) => parsed.sections.map((section) => section.markdown).join('\n\n');

test('2026-09-l2 Q26 markdown sections become separate cards and sample note', () => {
  const question = programming(l2Paper202609, 26);
  assert.ok(question, 'fixture should contain Q26');

  const parsed = parseCodingProblem(question);

  assert.equal(parsed.title, '直角三角形');
  assert.deepEqual(
    parsed.sections.map((section) => section.key),
    ['description', 'input', 'output', 'constraints'],
  );
  assert.deepEqual(
    parsed.sections.map((section) => section.label),
    ['题目描述', '输入格式', '输出格式', '数据范围'],
  );

  assert.equal(parsed.samples.length, 1);
  assert.equal(parsed.samples[0].input, '3.0\n4.0\n10.0');
  assert.equal(parsed.samples[0].output, '6');
  assert.match(parsed.samples[0].note, /样例解释/);
  assert.match(parsed.samples[0].note, /第 6 项/);

  assert.match(textOf(parsed), /小双刚学会勾股定理/);
  assert.match(textOf(parsed), /输入三行/);
  assert.match(textOf(parsed), /不超过 10000/);

  // 题解在 explanation 里，作答页的分区不能把思路提前剧透出去。
  assert.doesNotMatch(textOf(parsed), /递推生成数列/);
  assert.doesNotMatch(textOf(parsed), /样例走查/);
});

test('2024-03-l3 Q26 accepts the # [GESP...] title form and structured samples', () => {
  const question = programming(l3Paper202403, 26);
  assert.ok(question, 'fixture should contain Q26');

  const parsed = parseCodingProblem(question);

  assert.equal(parsed.title, '字母求和');
  assert.deepEqual(
    parsed.sections.map((section) => section.key),
    ['description', 'input', 'output', 'constraints'],
  );
  assert.match(parsed.sections.find((s) => s.key === 'description').markdown, /小杨同学发明了一种新型密码/);
  assert.match(parsed.sections.find((s) => s.key === 'input').markdown, /\$n\$/);
  assert.match(parsed.sections.find((s) => s.key === 'constraints').markdown, /1 \\le n \\le 10\^5/);

  assert.equal(parsed.samples.length, 1);
  assert.equal(parsed.samples[0].input, '3\naAc');
  assert.equal(parsed.samples[0].output, '-61');

  assert.doesNotMatch(textOf(parsed), /本题要求计算由大小写字母组成的字符串/);
});

test('2023-03-l2 Q26 uses structured title/description fields', () => {
  const question = programming(l2Paper202303, 26);
  assert.ok(question, 'fixture should contain Q26');

  const parsed = parseCodingProblem(question);

  assert.equal(parsed.title, '画三角形');
  assert.deepEqual(
    parsed.sections.map((section) => section.key),
    ['description', 'input', 'output'],
  );
  assert.match(parsed.sections[0].markdown, /输入一个正整数 n/);
  assert.match(parsed.sections[1].markdown, /2≤n≤40/);
  assert.match(parsed.sections[2].markdown, /右侧不要有多余的空格/);

  assert.equal(parsed.samples.length, 2);
  assert.equal(parsed.samples[0].input, '3');
  assert.equal(parsed.samples[0].output, 'A\nBC\nDEF');
  assert.equal(parsed.samples[1].input, '7');
  assert.match(parsed.samples[1].output, /^A\nBC\nDEF\nGHIJ/);

  // 20 多行题解不能跑到作答页的分区里。
  assert.doesNotMatch(textOf(parsed), /核心解析/);
  assert.doesNotMatch(textOf(parsed), /双重循环按行输出递增字母/);
});

test('synthesized Luogu coding question reads its statement from explanation', () => {
  const question = {
    id: 26,
    type: 'coding',
    score: 25,
    question: '第26题（上机编程）：P1234 示例题',
    options: [],
    explanation: [
      '## P1234 示例题',
      '',
      '### 题目背景',
      '这是背景。',
      '',
      '### 题目描述',
      '给定 $a$ 和 $b$，输出 $a+b$。',
      '',
      '### 输入格式',
      '一行两个整数 $a,b$。',
      '',
      '### 输出格式',
      '输出一个整数。',
      '',
      '### 原题链接',
      'https://www.luogu.com.cn/problem/P1234',
    ].join('\n'),
    tags: ['上机编程'],
  };

  const parsed = parseCodingProblem(question);

  assert.equal(parsed.title, '示例题');
  assert.deepEqual(
    parsed.sections.map((section) => section.key),
    ['background', 'description', 'input', 'output', 'link'],
  );
  assert.match(parsed.sections.find((s) => s.key === 'description').markdown, /给定 \$a\$ 和 \$b\$/);
  assert.match(parsed.sections.find((s) => s.key === 'link').markdown, /P1234/);
  assert.doesNotMatch(textOf(parsed), /第26题（上机编程）/);
});

test('unstructured markdown falls back to one description card without losing text', () => {
  const text = '这是一道没有分区的编程题。\n\n请读入 $n$，输出从 1 到 $n$ 的和。';
  const parsed = parseCodingProblem({ id: 26, type: 'programming', question: text });

  assert.equal(parsed.title, '上机编程题');
  assert.equal(parsed.sections.length, 1);
  assert.equal(parsed.sections[0].key, 'description');
  assert.equal(parsed.sections[0].label, '题目描述');
  assert.equal(parsed.sections[0].markdown, text);
  assert.deepEqual(parsed.samples, []);
});
