import assert from 'node:assert/strict';
import test from 'node:test';
import { scoreExam } from '../../src/utils/examScoring.js';

const questions = [
  { id: 1, type: 'single', answer: 0, score: 2 },
  { id: 2, type: 'single', answer: 2, score: 3 },
  { id: 3, type: 'judge', answer: 1, score: 1 },
  { id: 4, type: 'programming', score: 20 },
];

test('exam scoring counts correct, wrong, unanswered, and programming results separately', () => {
  assert.deepEqual(scoreExam(questions, { 1: 0, 2: 1, 4: '__PROGRAMMING_COMPLETED__' }), {
    objectiveScore: 2,
    objectiveScoreTotal: 6,
    objectiveCorrectCount: 1,
    objectiveWrongCount: 1,
    objectiveUnansweredCount: 1,
    programmingMarkedCount: 1,
  });
});

test('zero-valued option answers are scored and programming points are never auto-awarded', () => {
  const result = scoreExam(questions, { 1: 0, 2: 2, 3: 1, 4: '__PROGRAMMING_COMPLETED__' });
  assert.equal(result.objectiveScore, 6);
  assert.equal(result.objectiveScoreTotal, 6);
  assert.equal(result.programmingMarkedCount, 1);
});
