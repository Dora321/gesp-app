import test from 'node:test';
import assert from 'node:assert/strict';
import { placementQuestions, scorePlacement } from '../../src/data/placementDiagnostic.js';
import { cppLessonPaths } from '../../src/data/cppLessonIndex.js';
import { paperMeta } from '../../src/data/gesp/index.js';

const correctAnswers = Object.fromEntries(placementQuestions.map(question => [question.id, question.answer]));

test('placement questions cover the six stages with valid answer choices and prerequisite lessons', () => {
  assert.equal(placementQuestions.length, 10);
  assert.equal(Object.keys(correctAnswers).length, placementQuestions.length);
  assert.deepEqual([...new Set(placementQuestions.map(question => question.level))], [1, 2, 3, 4, 5, 6]);
  for (const question of placementQuestions) {
    assert.ok(question.options[question.answer] && question.explanation, question.id);
    assert.equal(new Set(question.options).size, question.options.length, question.id);
    for (const lesson of question.lessons) {
      assert.equal(lesson.level, question.level);
      assert.ok(cppLessonPaths.includes(lesson.path), lesson.path);
    }
  }
});

test('earliest missed or uncertain stage sets the recommendation with real lessons and a formal paper', () => {
  for (const question of placementQuestions) {
    const score = scorePlacement({ ...correctAnswers, [question.id]: -1 });
    assert.equal(score.level, question.level);
    assert.equal(score.firstGap, question.topic);
    assert.equal(score.correctCount, placementQuestions.length - 1);
    assert.ok(score.lessons.length >= 2 && score.lessons.length <= 3);
    assert.deepEqual(score.lessons.slice(0, question.lessons.length), question.lessons);
    const paper = paperMeta[score.paperPath.split('/').at(-1)];
    assert.equal(paper.level, score.level);
    assert.equal(paper.unofficial, false);
  }
  assert.equal(scorePlacement({}).level, 1);
  const complete = scorePlacement(correctAnswers);
  assert.equal(complete.level, 6);
  assert.equal(complete.firstGap, null);
  assert.equal(complete.correctCount, placementQuestions.length);
});
