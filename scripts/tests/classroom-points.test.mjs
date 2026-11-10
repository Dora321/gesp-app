import assert from 'node:assert/strict';
import test from 'node:test';
import {
  readStoredList,
  readStudents,
  readHistory,
  escapeCsvCell,
  buildPointsCsv,
  STUDENTS_KEY,
  HISTORY_KEY,
} from '../../src/utils/classroomPoints.js';

const memoryStorage = (entries = {}) => ({
  getItem: (key) => (key in entries ? entries[key] : null),
  setItem: (key, value) => { entries[key] = String(value); },
});

test('readStoredList survives corrupted or non-array JSON', () => {
  assert.deepEqual(readStoredList('k', memoryStorage({ k: '{bad json' })), []);
  assert.deepEqual(readStoredList('k', memoryStorage({ k: '{"a":1}' })), []);
  assert.deepEqual(readStoredList('k', memoryStorage({})), []);
  assert.deepEqual(readStoredList('k', { getItem() { throw new Error('denied'); } }), []);
  assert.deepEqual(readStoredList('k', memoryStorage({ k: '[1,2]' })), [1, 2]);
});

test('readStudents / readHistory drop entries that would crash rendering', () => {
  const storage = memoryStorage({
    [STUDENTS_KEY]: JSON.stringify([{ id: 1, name: '小明', points: 2 }, null, { name: 3 }, { name: 'x', points: 'NaN' }]),
    [HISTORY_KEY]: JSON.stringify([{ id: 1, time: '2026/11/10 10:00:00', studentName: '小明', diff: 1 }, { id: 2 }]),
  });
  assert.deepEqual(readStudents(storage).map((s) => s.name), ['小明']);
  assert.equal(readHistory(storage).length, 1);
});

test('CSV export escapes commas, quotes, newlines and keeps # intact', () => {
  assert.equal(escapeCsvCell('张三'), '张三');
  assert.equal(escapeCsvCell('a,b'), '"a,b"');
  assert.equal(escapeCsvCell('say "hi"'), '"say ""hi"""');
  assert.equal(escapeCsvCell('l1\nl2'), '"l1\nl2"');
  const csv = buildPointsCsv([{ name: '李#四', points: 1.5 }, { name: '王,五', points: 0 }]);
  assert.ok(csv.startsWith('﻿姓名,分数\r\n'));
  assert.ok(csv.includes('李#四,1.5'));
  assert.ok(csv.includes('"王,五",0'));
});
