import test from 'node:test';
import assert from 'node:assert/strict';
import { cppProgrammingExercises, cppProgrammingBridges, getCppProgrammingExercise } from '../../src/data/cppProgrammingPractice.js';
import { cppLessonIndex } from '../../src/data/cppLessonIndex.js';
import { paperCodingMap } from '../../src/data/gesp/paperCodingMap.js';

test('上机题有可访问的课次、明确的题面和样例，覆盖八级课程', () => {
  const ids = new Set();
  for (const exercise of cppProgrammingExercises) {
    assert.ok(!ids.has(exercise.id), `重复题号：${exercise.id}`);
    ids.add(exercise.id);
    assert.ok(cppLessonIndex.some(item => item.level === exercise.level && item.id === exercise.lesson));
    for (const field of ['title', 'focus', 'statement', 'input', 'output', 'hint', 'boundary', 'referenceCode']) {
      assert.ok(exercise[field]?.trim(), `${exercise.id} 缺少 ${field}`);
    }
    assert.ok(exercise.samples.length >= (exercise.lesson === 1 && exercise.level === 1 ? 1 : 2));
    for (const sample of exercise.samples) {
      assert.equal(typeof sample.input, 'string');
      assert.ok(sample.output.trim());
    }
    assert.equal(getCppProgrammingExercise(String(exercise.level), String(exercise.lesson)), exercise);
  }
  for (let level = 1; level <= 3; level++) {
    assert.equal(cppProgrammingExercises.filter(item => item.level === level).length, 16);
  }
  for (let level = 4; level <= 8; level++) {
    assert.equal(cppProgrammingExercises.filter(item => item.level === level).length, 4);
  }
  assert.equal(getCppProgrammingExercise(9, 1), null);
  assert.equal(getCppProgrammingExercise(4, 1), null);
});

test('真题入口与项目原题、试卷映射一致', async () => {
  for (const [level, bridge] of Object.entries(cppProgrammingBridges)) {
    const pool = (await import(`../../src/data/gesp/luogu-coding/level${level}.js`))[`luoguLevel${level}`];
    const problem = pool.find(item => item.pid === bridge.problem);
    assert.ok(problem, `找不到 ${bridge.problem}`);
    assert.ok(problem.title.includes(bridge.problemTitle));
    assert.ok(Object.values(paperCodingMap[bridge.paper] || {}).includes(bridge.problem), `${bridge.paper} 未包含 ${bridge.problem}`);
    await import(`../../src/data/gesp/level${level}/${bridge.paper}.js`);
  }
});
