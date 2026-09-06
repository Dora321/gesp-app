import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { cppLessonIndex } from '../../src/data/cppLessonIndex.js';

const lessonSource = (lesson) => readFileSync(
  new URL(`../../src/lessons/cpp/l${lesson.level}/Lesson${lesson.id}.jsx`, import.meta.url),
  'utf8',
);

// 前置知识是这套课「可追溯」的关键：学生点进第 9 课，要先被告知需要会 if 和
// 变量累加，而不是撞上去才发现跟不上。一级 16 节曾经全部没有——不是漏写，
// 是它们用的 LegacyCppLessonShell 根本不接受这个 prop，写了也不会显示。
test('every C++ lesson declares what the learner should already know', () => {
  const missing = cppLessonIndex
    .filter((lesson) => !lessonSource(lesson).includes('prerequisites='))
    .map((lesson) => lesson.path);

  assert.deepEqual(missing, [], `这些课没有前置知识提示：${missing.join(', ')}`);
});

test('both lesson shells actually render the prerequisites they receive', () => {
  for (const shell of ['CppLessonShell', 'LegacyCppLessonShell']) {
    const source = readFileSync(new URL(`../../src/lessons/cpp/${shell}.jsx`, import.meta.url), 'utf8');
    assert.ok(
      source.includes('prerequisites') && source.includes('<Prerequisites'),
      `${shell} 必须接收并渲染 prerequisites，否则课程里写的前置项会被静默丢弃`,
    );
  }
});

test('prerequisites are concrete, not filler', () => {
  const tooVague = [];
  for (const lesson of cppLessonIndex) {
    const match = lessonSource(lesson).match(/prerequisites=\{\[([\s\S]*?)\]\}/);
    if (!match) continue;
    const items = [...match[1].matchAll(/'([^']+)'/g)].map((entry) => entry[1]);
    // 少于两条、或出现「无」「暂无」这类占位，等于没写。
    if (items.length < 2 || items.some((item) => /^(无|暂无|待补)/.test(item))) {
      tooVague.push(`${lesson.path}: ${items.join(' / ') || '(空)'}`);
    }
  }
  assert.deepEqual(tooVague, [], `这些课的前置项过于敷衍：\n${tooVague.join('\n')}`);
});
