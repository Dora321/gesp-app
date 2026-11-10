import assert from 'node:assert/strict';
import test from 'node:test';
import {
  DEFAULT_TIME_LIMIT_SECONDS,
  elapsedSeconds,
  formatClock,
  formatTimeLimitMinutes,
  progressRemainingSeconds,
  remainingSeconds,
  resolveEndsAt,
  resolveTimeLimitSeconds,
} from '../../src/utils/examTimer.js';
import { normalizeLearningData } from '../../src/utils/learningData.js';

const NOW = 1_800_000_000_000;

test('remaining time is derived from the endsAt timestamp, not a decrementing counter', () => {
  const endsAt = NOW + 90 * 60 * 1000;
  assert.equal(remainingSeconds(endsAt, NOW), 5400);
  // 后台节流也不影响：直接按当前时间算。
  assert.equal(remainingSeconds(endsAt, NOW + 30 * 60 * 1000), 3600);
  assert.equal(remainingSeconds(endsAt, NOW + 5400 * 1000 - 1), 1);
  assert.equal(remainingSeconds(endsAt, NOW + 5400 * 1000), 0);
  assert.equal(remainingSeconds(endsAt, NOW + 6000 * 1000), 0);
  assert.equal(remainingSeconds(null, NOW), 0);
});

test('elapsed time is clamped to the paper time limit', () => {
  const endsAt = NOW + 5400 * 1000;
  assert.equal(elapsedSeconds(endsAt, 5400, NOW), 0);
  assert.equal(elapsedSeconds(endsAt, 5400, NOW + 600 * 1000), 600);
  assert.equal(elapsedSeconds(endsAt, 5400, NOW + 99999 * 1000), 5400);
});

test('resolveEndsAt keeps new snapshots and migrates legacy timeLeft-only snapshots', () => {
  assert.equal(resolveEndsAt({ endsAt: NOW + 1234 }, 5400, NOW), NOW + 1234);
  // 旧存档：保存时还剩 3200 秒 → 恢复后同样剩 3200 秒（旧版关页即暂停）。
  const legacy = { answers: { 1: 0 }, timeLeft: 3200, currentQuestionIndex: 2, savedAt: NOW - 86_400_000 };
  assert.equal(resolveEndsAt(legacy, 5400, NOW), NOW + 3200 * 1000);
  assert.equal(progressRemainingSeconds(legacy, 5400, NOW), 3200);
  // 旧存档里已经耗尽或越界的值被夹住。
  assert.equal(resolveEndsAt({ timeLeft: -5 }, 5400, NOW), NOW);
  assert.equal(resolveEndsAt({ timeLeft: 99999 }, 5400, NOW), NOW + 5400 * 1000);
  assert.equal(resolveEndsAt(null, 5400, NOW), NOW + 5400 * 1000);
});

test('legacy snapshots survive learning-data normalisation and new ones keep endsAt', () => {
  const data = normalizeLearningData({
    version: 3,
    exams: {
      legacy: { answers: { 1: 0 }, timeLeft: 120, currentQuestionIndex: 1, isSubmitted: false },
      fresh: { answers: {}, endsAt: NOW + 1000, currentQuestionIndex: 0, isSubmitted: false },
    },
  });
  assert.equal(data.exams.legacy.timeLeft, 120);
  assert.equal(data.exams.fresh.endsAt, NOW + 1000);
});

test('time limit and labels come from the paper data', () => {
  assert.equal(resolveTimeLimitSeconds({ timeLimit: 7200 }), 7200);
  assert.equal(resolveTimeLimitSeconds({}), DEFAULT_TIME_LIMIT_SECONDS);
  assert.equal(resolveTimeLimitSeconds({ timeLimit: 'x' }), DEFAULT_TIME_LIMIT_SECONDS);
  assert.equal(formatTimeLimitMinutes(5400), '90分钟');
  assert.equal(formatTimeLimitMinutes(10800), '180分钟');
  assert.equal(formatTimeLimitMinutes(undefined), '90分钟');
  assert.equal(formatClock(5400), '90:00');
  assert.equal(formatClock(61), '01:01');
});
