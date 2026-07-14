import test from 'node:test';
import assert from 'node:assert/strict';

import { defineCourse } from '../../src/data/courseSchema.js';
import { cppL1Course, getCppL1LessonSupport } from '../../src/data/cppL1CourseFlow.js';
import { cppL2Course, getCppL2LessonSupport } from '../../src/data/cppL2CourseFlow.js';
import { cppL3Course, getCppL3LessonSupport } from '../../src/data/cppL3CourseFlow.js';
import { cppL4Course, getCppL4LessonSupport } from '../../src/data/cppL4CourseFlow.js';
import { cppL5Course, getCppL5LessonSupport } from '../../src/data/cppL5CourseFlow.js';
import { cppL6Course, getCppL6LessonSupport } from '../../src/data/cppL6CourseFlow.js';
import { pythonFoundationCourse, getPythonFoundationSupport } from '../../src/data/pythonFoundationFlow.js';

const flows = [
  [cppL1Course, getCppL1LessonSupport],
  [cppL2Course, getCppL2LessonSupport],
  [cppL3Course, getCppL3LessonSupport],
  [cppL4Course, getCppL4LessonSupport],
  [cppL5Course, getCppL5LessonSupport],
  [cppL6Course, getCppL6LessonSupport],
  [pythonFoundationCourse, getPythonFoundationSupport],
];

test('all migrated courses expose complete, sequential learning support', () => {
  let checked = 0;

  for (const [course, getSupport] of flows) {
    const paths = new Set(course.items.map(item => item.path));
    assert.equal(paths.size, course.items.length, `${course.id} has duplicate paths`);

    for (const [index, item] of course.items.entries()) {
      const support = getSupport(item.id);
      assert.equal(support.current.id, item.id);
      assert.ok(support.quality.goals.length > 0);
      assert.ok(support.quality.deliverables.length > 0);
      assert.ok(support.quality.checks.length > 0);
      assert.ok(support.reviewTasks.length > 0);
      if (index > 0) assert.equal(support.previous.path, course.items[index - 1].path);
      if (index < course.items.length - 1) assert.equal(support.next.path, course.items[index + 1].path);
      checked += 1;
    }
  }

  assert.equal(checked, 103);
});

test('course schema rejects duplicate ids and incomplete learning evidence', () => {
  const details = { one: { accent: 'blue', goals: ['目标'], deliverables: ['作品'], checks: ['检查'] } };

  assert.throws(() => defineCourse({
    id: 'duplicate-course', title: '重复课程', language: 'python', kind: 'project',
    items: [{ id: 'one', title: '第一节', path: '/one' }, { id: 'one', title: '第二节', path: '/two' }],
    detailsById: details,
  }), /duplicate item id/);

  assert.throws(() => defineCourse({
    id: 'missing-checks', title: '缺少检查', language: 'cpp', kind: 'level',
    items: [{ id: 1, title: '第一节', path: '/lesson/1' }],
    detailsById: { 1: { accent: 'blue', goals: ['目标'], deliverables: ['作品'], checks: [] } },
  }), /checks must contain at least one item/);
});
