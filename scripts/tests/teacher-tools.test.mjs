import test from 'node:test';
import assert from 'node:assert/strict';
import { teacherFlagFromSearch } from '../../src/utils/teacherTools.js';

// 页面标注默认不给学生显示：只有地址里明确写 ?teacher=1 才打开，?teacher=0 关闭，
// 其它参数一律不改开关（null = 沿用本机记住的状态）。
test('teacher tools are toggled only by an explicit ?teacher flag', () => {
  assert.equal(teacherFlagFromSearch(''), null);
  assert.equal(teacherFlagFromSearch('?tag=循环'), null);
  assert.equal(teacherFlagFromSearch('?teacher=1'), true);
  assert.equal(teacherFlagFromSearch('?practice=a&teacher=0'), false);
  assert.equal(teacherFlagFromSearch('?teacher=yes'), null);
});
