import assert from 'node:assert/strict';
import test from 'node:test';
import {
  LEARNING_DATA_SCHEMA,
  LEARNING_DATA_STORAGE_KEY,
  LEARNING_DATA_VERSION,
  createLearningDataExport,
  importLearningData,
  readLearningData,
  resetLearningData,
  summarizeLearningData,
} from '../../src/utils/learningData.js';
import {
  readLessonProgress,
  recordLessonMastered,
  recordLessonVisit,
} from '../../src/utils/lessonProgress.js';
import {
  clearExamProgress,
  loadExamProgress,
  saveExamProgress,
} from '../../src/utils/examProgress.js';
import {
  MAX_ATTEMPTS_PER_PAPER,
  clearPaperAttempts,
  latestWrongIdsByPaper,
  readPaperAttempts,
  recordExamAttempt,
  summarizePaperAttempts,
} from '../../src/utils/examHistory.js';
import { PROGRAMMING_ACK } from '../../src/utils/questionHelpers.js';

class MemoryStorage {
  #values = new Map();

  get length() { return this.#values.size; }
  key(index) { return [...this.#values.keys()][index] ?? null; }
  getItem(key) { return this.#values.has(key) ? this.#values.get(key) : null; }
  setItem(key, value) { this.#values.set(String(key), String(value)); }
  removeItem(key) { this.#values.delete(key); }
  clear() { this.#values.clear(); }
}

const installStorage = () => {
  const storage = new MemoryStorage();
  Object.defineProperty(globalThis, 'localStorage', { configurable: true, value: storage });
  return storage;
};

test('legacy learning keys migrate into one versioned document without touching unrelated data', () => {
  const storage = installStorage();
  storage.setItem('gesp_lesson_progress', JSON.stringify({
    '/lesson/1/9': { status: 'mastered', visitedAt: 100, masteredAt: 200 },
  }));
  storage.setItem('gesp_exam_progress_2026-03-l2', JSON.stringify({
    answers: { 0: 'A' }, timeLeft: 3200, currentQuestionIndex: 2, isSubmitted: false, savedAt: 300,
  }));
  storage.setItem('esp32ai_progress', JSON.stringify({ activeNum: 4, viewed: [1, 2, 4] }));
  storage.setItem('museum_collection', JSON.stringify(['ada-lovelace']));
  storage.setItem('deepseek_api_key', 'must-survive');
  storage.setItem('classroom_students', '[{"name":"A"}]');

  const data = readLearningData();

  assert.equal(data.version, LEARNING_DATA_VERSION);
  assert.equal(data.lessons['/lesson/1/9'].status, 'mastered');
  assert.equal(data.exams['2026-03-l2'].answers[0], 'A');
  assert.deepEqual(data.hardware.esp32Ai, { activeNum: 4, viewed: [1, 2, 4] });
  assert.deepEqual(data.museum.collected, ['ada-lovelace']);
  assert.ok(storage.getItem(LEARNING_DATA_STORAGE_KEY));
  assert.equal(storage.getItem('gesp_lesson_progress'), null);
  assert.equal(storage.getItem('gesp_exam_progress_2026-03-l2'), null);
  assert.equal(storage.getItem('deepseek_api_key'), 'must-survive');
  assert.equal(storage.getItem('classroom_students'), '[{"name":"A"}]');
});

test('version 1 exports import through the migration path and reject future versions', () => {
  installStorage();
  const imported = importLearningData({
    schema: LEARNING_DATA_SCHEMA,
    version: 1,
    data: {
      lessonProgress: { '/python/f2': { status: 'learning', visitedAt: 10 } },
      examProgress: { paper: { answers: { 1: 'B' }, isSubmitted: false } },
      esp32AiProgress: { activeNum: 2, viewed: [1, 2, 99] },
      museumCollection: ['item-1', 'item-1'],
    },
  });

  assert.equal(imported.version, LEARNING_DATA_VERSION);
  assert.equal(imported.lessons['/python/f2'].status, 'learning');
  assert.deepEqual(imported.hardware.esp32Ai.viewed, [1, 2]);
  assert.deepEqual(imported.museum.collected, ['item-1']);
  assert.throws(() => importLearningData({
    schema: LEARNING_DATA_SCHEMA,
    version: LEARNING_DATA_VERSION + 1,
    data: {},
  }), /不支持的学习数据版本/);
});

test('lesson mastery and exam drafts persist through the shared data layer', () => {
  installStorage();
  recordLessonVisit('/lesson/2/8');
  recordLessonMastered('/lesson/2/8');
  saveExamProgress('paper-1', {
    answers: { 0: 'C' },
    timeLeft: 120,
    currentQuestionIndex: 3,
    isSubmitted: false,
  });

  assert.equal(readLessonProgress()['/lesson/2/8'].status, 'mastered');
  assert.equal(loadExamProgress('paper-1').answers[0], 'C');
  assert.deepEqual(summarizeLearningData(), {
    lessons: 1,
    masteredLessons: 1,
    examDrafts: 1,
    examAttempts: 0,
    papersAttempted: 0,
    hardwareLessons: 0,
    museumItems: 0,
  });

  clearExamProgress('paper-1');
  assert.equal(loadExamProgress('paper-1'), null);
});

test('export contains only canonical learning data and reset preserves unrelated browser state', () => {
  const storage = installStorage();
  recordLessonVisit('/python/f1');
  storage.setItem('ai_selected_persona_id', 'tutor');
  storage.setItem('classroom_history', '[1]');

  const exported = createLearningDataExport();
  const serialized = JSON.stringify(exported);
  assert.equal(exported.schema, LEARNING_DATA_SCHEMA);
  assert.equal(exported.version, LEARNING_DATA_VERSION);
  assert.match(serialized, /\/python\/f1/);
  assert.doesNotMatch(serialized, /ai_selected_persona_id|classroom_history|deepseek_api_key/);

  assert.equal(resetLearningData(), true);
  assert.equal(storage.getItem(LEARNING_DATA_STORAGE_KEY), null);
  assert.equal(storage.getItem('ai_selected_persona_id'), 'tutor');
  assert.equal(storage.getItem('classroom_history'), '[1]');
});

// ─── 交卷记录 / 错题本 ──────────────────────────────────────────────

test('submitting an exam records a score snapshot that outlives the result dialog', () => {
  installStorage();

  const questions = [
    { id: 1, type: 'single', answer: 0, score: 2 },
    { id: 2, type: 'single', answer: 1, score: 2 },
    { id: 3, type: 'judge', answer: 0, score: 2 },
    { id: 4, type: 'single', answer: 2, score: 2, sourceIntegrity: 'missing-code' },
    { id: 5, type: 'programming' },
  ];
  const attempt = recordExamAttempt('2025-12-l8', {
    questions,
    answers: { 1: 0, 2: 0, 4: 3, 5: PROGRAMMING_ACK },
    elapsedSeconds: 1234,
  });

  // 编程题与 sourceIntegrity 题都不参与判分，也不该进错题本。
  assert.equal(attempt.total, 6);
  assert.equal(attempt.score, 2);
  assert.equal(attempt.correct, 1);
  assert.deepEqual(attempt.wrongIds, [2]);
  assert.equal(attempt.unanswered, 1);
  assert.equal(attempt.excluded, 1);
  assert.equal(attempt.elapsedSeconds, 1234);

  assert.equal(readPaperAttempts('2025-12-l8').length, 1);
  assert.equal(summarizeLearningData().examAttempts, 1);
});

test('the wrong-answer book only keeps questions still wrong on the latest attempt', () => {
  installStorage();
  const questions = [
    { id: 1, type: 'single', answer: 0, score: 2 },
    { id: 2, type: 'single', answer: 0, score: 2 },
  ];

  recordExamAttempt('2026-03-l7', { questions, answers: { 1: 1, 2: 1 } });
  assert.deepEqual(latestWrongIdsByPaper()['2026-03-l7'].sort(), [1, 2]);

  // 订正后重做，只有第 2 题还错着。
  recordExamAttempt('2026-03-l7', { questions, answers: { 1: 0, 2: 1 } });
  assert.deepEqual(latestWrongIdsByPaper()['2026-03-l7'], [2]);

  // 全做对之后错题本清空，而不是永远留着历史错题。
  recordExamAttempt('2026-03-l7', { questions, answers: { 1: 0, 2: 0 } });
  assert.equal(latestWrongIdsByPaper()['2026-03-l7'], undefined);
});

test('attempt history is capped and summarised newest-first', () => {
  installStorage();
  const questions = [{ id: 1, type: 'single', answer: 0, score: 10 }];

  for (let index = 0; index < MAX_ATTEMPTS_PER_PAPER + 5; index += 1) {
    recordExamAttempt('2025-06-l5', { questions, answers: { 1: index === 0 ? 1 : 0 } });
  }

  const list = readPaperAttempts('2025-06-l5');
  assert.equal(list.length, MAX_ATTEMPTS_PER_PAPER);
  assert.ok(list[0].at >= list[list.length - 1].at, '最近一次应排在最前');

  const summary = summarizePaperAttempts(list);
  assert.equal(summary.attemptCount, MAX_ATTEMPTS_PER_PAPER);
  assert.equal(summary.latestRate, 1);
  assert.equal(summary.bestRate, 1);
});

test('clearing one paper leaves other papers untouched', () => {
  installStorage();
  const questions = [{ id: 1, type: 'single', answer: 0, score: 2 }];
  recordExamAttempt('2024-09-l1', { questions, answers: { 1: 1 } });
  recordExamAttempt('2024-09-l2', { questions, answers: { 1: 1 } });

  clearPaperAttempts('2024-09-l1');

  assert.deepEqual(readPaperAttempts('2024-09-l1'), []);
  assert.equal(readPaperAttempts('2024-09-l2').length, 1);
});

test('version 2 documents migrate forward with an empty attempt history', () => {
  const storage = installStorage();
  storage.setItem(LEARNING_DATA_STORAGE_KEY, JSON.stringify({
    version: 2,
    updatedAt: 1,
    lessons: { '/lesson/1/9': { status: 'mastered', visitedAt: 1, masteredAt: 2 } },
    exams: { '2024-09-l1': { answers: { 1: 0 }, isSubmitted: false } },
    hardware: { esp32Ai: null },
    museum: { collected: [] },
  }));

  const data = readLearningData();
  assert.equal(data.version, LEARNING_DATA_VERSION);
  assert.deepEqual(data.attempts, {});
  assert.equal(data.lessons['/lesson/1/9'].status, 'mastered');
});

test('imported attempt records are sanitised', () => {
  installStorage();
  const imported = importLearningData({
    schema: LEARNING_DATA_SCHEMA,
    version: LEARNING_DATA_VERSION,
    data: {
      attempts: {
        '2025-03-l6': [
          { at: 5, score: 4, total: 10, correct: 2, wrong: 1, wrongIds: [3, 3, null, 'x'] },
          { score: 1 }, // 没有时间戳，无法定位，丢弃
        ],
        __proto__: [{ at: 1 }],
        broken: 'not-an-array',
      },
    },
  });

  assert.deepEqual(Object.keys(imported.attempts), ['2025-03-l6']);
  assert.equal(imported.attempts['2025-03-l6'].length, 1);
  assert.deepEqual(imported.attempts['2025-03-l6'][0].wrongIds, [3, 'x']);
});
