import assert from 'node:assert/strict';
import test from 'node:test';
import {
  readStoredList,
  readStudents,
  readHistory,
  escapeCsvCell,
  buildPointsCsv,
  buildPointsHistoryCsv,
  adjustClassroomPoints,
  CLASSROOM_POINTS_KEY,
  createClassroom,
  drawClassroomStudent,
  mergeClassroomRoster,
  parseClassroomRoster,
  readClassroomPoints,
  summarizeClassroomGroups,
  writeClassroomPoints,
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

test('legacy classroom data migrates into a default class and keeps every class independent', () => {
  const storage = memoryStorage({
    [STUDENTS_KEY]: JSON.stringify([{ id: 14, name: '小明', points: 2 }]),
    [HISTORY_KEY]: JSON.stringify([{ id: 1, time: '10:00', studentName: '小明', diff: 2, reason: '手推正确' }]),
  });
  const data = readClassroomPoints(storage);
  const [original] = data.classes;
  assert.equal(original.name, '默认班级');
  assert.equal(data.activeClassId, original.id);
  assert.deepEqual(original.students, [{ id: 14, name: '小明', points: 2, group: '' }]);
  assert.equal(original.history[0].reason, '手推正确');

  const other = createClassroom('二班', 'class-b');
  const dataWithSecond = { classes: [original, other], activeClassId: other.id };
  assert.equal(writeClassroomPoints(dataWithSecond, storage), true);
  assert.ok(storage.getItem(CLASSROOM_POINTS_KEY));
  assert.deepEqual(readClassroomPoints(storage), dataWithSecond);
  assert.deepEqual(readStudents(storage), []);
  assert.deepEqual(readHistory(storage), []);

  const renamed = { ...original, name: '一班' };
  writeClassroomPoints({ classes: [renamed], activeClassId: renamed.id }, storage);
  assert.deepEqual(readClassroomPoints(storage).classes, [renamed]);
  assert.deepEqual(readStudents(storage), renamed.students);
  assert.deepEqual(readHistory(storage), renamed.history);
});

test('bad classroom storage falls back to legacy data and a blocked write keeps it intact', () => {
  const legacyStudents = [{ id: 3, name: '学生甲', points: 4 }];
  const storage = memoryStorage({
    [CLASSROOM_POINTS_KEY]: '{"classes":[null]}',
    [STUDENTS_KEY]: JSON.stringify(legacyStudents),
  });
  const data = readClassroomPoints(storage);
  assert.equal(data.classes[0].students[0].name, '学生甲');
  assert.equal(writeClassroomPoints(data, {
    getItem: storage.getItem,
    setItem() { throw new Error('quota'); },
  }), false);
  assert.deepEqual(readStudents(storage), legacyStudents);
});

test('random roll call only repeats after all students have been called and skips removed students', () => {
  const students = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
  const first = drawClassroomStudent(students, [], () => 0.9);
  assert.equal(first.student.id, 'c');
  const second = drawClassroomStudent(students, [...first.drawnIds, 'removed'], () => 0);
  assert.equal(second.student.id, 'a');
  assert.deepEqual(second.drawnIds, ['c', 'a']);
  const third = drawClassroomStudent(students, second.drawnIds, () => 0);
  assert.equal(third.student.id, 'b');
  const fourth = drawClassroomStudent(students, third.drawnIds, () => 0.5);
  assert.deepEqual(fourth.drawnIds, ['c']);
  assert.equal(drawClassroomStudent([students[0]], ['a'], () => 0).student.id, 'a');
  assert.deepEqual(drawClassroomStudent([], ['a']), { student: null, drawnIds: [] });
});

test('group leaderboard shows member counts, totals and averages and leaves unassigned students out', () => {
  const students = [
    { group: '红队', points: 2 },
    { group: '红队', points: -0.5 },
    { group: '1 组', points: 3 },
    { group: '', points: 100 },
  ];
  assert.deepEqual(summarizeClassroomGroups(students), [
    { name: '1 组', count: 1, total: 3, average: 3 },
    { name: '红队', count: 2, total: 1.5, average: 0.75 },
  ]);
});

test('custom scoring reasons appear in history and its CSV export', () => {
  const classroom = {
    ...createClassroom('一班', 'class-a'),
    students: [{ id: 1, name: '苏,明', points: 2, group: '甲组' }],
  };
  const now = new Date(2026, 10, 25, 8, 0);
  const updated = adjustClassroomPoints(classroom, 1, -0.5, '排查边界,修正分数', now);
  assert.equal(updated.students[0].points, 1.5);
  assert.equal(classroom.students[0].points, 2);
  assert.equal(updated.history[0].reason, '排查边界,修正分数');
  assert.match(buildPointsHistoryCsv(updated.history), /^\uFEFF时间,姓名,分数变动,原因\r\n.+,"苏,明",-0\.5,"排查边界,修正分数"$/);
});

test('CSV roster round-trips quoted fields, BOM, line breaks and groups', () => {
  const roster = [
    { name: '苏,明', points: 2, group: '南"队' },
    { name: '方\n月', points: -0.5, group: '' },
  ];
  const csv = buildPointsCsv(roster);
  assert.match(csv, /^\uFEFF姓名,分数,分组\r\n/);
  assert.deepEqual(parseClassroomRoster(csv), roster);
  assert.deepEqual(parseClassroomRoster('\uFEFF姓名,分数\r\n阿明,1.5\r\n'), [{ name: '阿明', points: 1.5, group: undefined }]);
  assert.throws(() => parseClassroomRoster('姓名,分数\n小明,坏数据'), /检查 CSV/);
  assert.throws(() => parseClassroomRoster('姓名,分数\n"小明,3'), /引号没有闭合/);
});

test('text roster deduplicates names and keeps existing scores until a CSV explicitly supplies a value', () => {
  const existing = [{ id: 1, name: '小明', points: 2, group: '一组' }];
  const names = parseClassroomRoster('\uFEFF  小明\r\n 小丽 \n小丽\n欧 阳\n');
  let id = 1;
  const withNames = mergeClassroomRoster(existing, names, () => ++id);
  assert.deepEqual(withNames, [
    ...existing,
    { id: 2, name: '小丽', points: 0, group: '' },
    { id: 3, name: '欧 阳', points: 0, group: '' },
  ]);

  const entries = parseClassroomRoster('姓名,分数,分组\n小明,0,\n小丽,1,红队\n小丽,2,');
  assert.deepEqual(mergeClassroomRoster(withNames, entries), [
    { id: 1, name: '小明', points: 0, group: '' },
    { id: 2, name: '小丽', points: 2, group: '' },
    withNames[2],
  ]);
  assert.deepEqual(parseClassroomRoster('小明,1,红队'), [{ name: '小明', points: 1, group: '红队' }]);
});
