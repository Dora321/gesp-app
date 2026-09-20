import test from 'node:test';
import assert from 'node:assert/strict';
import { classifyLessonEvidence } from '../../src/utils/lessonEvidence.js';

test('L1–L3 学习证据区分尝试、自查、产出和系统核对', () => {
  assert.equal(classifyLessonEvidence(), 'none');
  assert.equal(classifyLessonEvidence({ predictAttempt: true }), 'attempted');
  assert.equal(classifyLessonEvidence({ transferAttempt: true }), 'attempted');
  assert.equal(classifyLessonEvidence({ transferAttempt: true, transferSelfChecked: true }), 'selfChecked');
  assert.equal(classifyLessonEvidence({ exitArtifact: true }), 'submitted');
  assert.equal(classifyLessonEvidence({ predictCorrect: true, transferAttempt: true }), 'correct');
});
