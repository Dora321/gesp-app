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
  L1_PROGRESS_KEY_VERSION,
  getLessonStatus,
  readLessonProgress,
  recordLessonMastered,
  recordLessonVisit,
  toLessonProgressKey,
  toLessonRoutePath,
} from '../../src/utils/lessonProgress.js';
import {
  clearExamProgress,
  loadExamProgress,
  saveExamProgress,
} from '../../src/utils/examProgress.js';
import {
  MAX_ATTEMPTS_PER_PAPER,
  buildMistakePracticePaper,
  clearPaperAttempts,
  currentWrongIdsByPaper,
  latestWrongIdsByPaper,
  pickWrongQuestions,
  recordQuestionResult,
  readPaperAttempts,
  recordExamAttempt,
  summarizePaperAttempts,
} from '../../src/utils/examHistory.js';
import { PROGRAMMING_ACK } from '../../src/utils/questionHelpers.js';
import {
  clearAnalysisProgress,
  loadAnalysisProgress,
  questionSignature,
  saveAnalysisProgress,
} from '../../src/utils/analysisProgress.js';
import { reviewQuestionIndexes } from '../../src/utils/examScoring.js';

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
    '/lesson/1/v2/9': { status: 'mastered', visitedAt: 100, masteredAt: 200 },
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
  assert.equal(data.lessons['/lesson/1/v2/9'].status, 'mastered');
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

test('C++ L1 progress is stored under versioned keys and old L1 keys are not read', () => {
  const storage = installStorage();
  assert.equal(L1_PROGRESS_KEY_VERSION, 'v2');
  assert.equal(toLessonProgressKey('/lesson/1/9'), '/lesson/1/v2/9');
  assert.equal(toLessonRoutePath('/lesson/1/v2/9'), '/lesson/1/9');
  assert.equal(toLessonProgressKey('/lesson/2/9'), '/lesson/2/9');
  assert.equal(toLessonRoutePath('/lesson/2/9'), '/lesson/2/9');

  // 改版前的一级记录：同一路由的旧键不应再被当成当前课的进度。
  storage.setItem(LEARNING_DATA_STORAGE_KEY, JSON.stringify({
    version: LEARNING_DATA_VERSION,
    updatedAt: 1,
    lessons: { '/lesson/1/10': { status: 'mastered', visitedAt: 1, masteredAt: Date.now() } },
    exams: {},
    attempts: {},
    hardware: { esp32Ai: null },
    museum: { collected: [] },
  }));
  assert.equal(getLessonStatus('/lesson/1/10'), 'unseen');

  recordLessonVisit('/lesson/1/10');
  assert.equal(readLessonProgress()['/lesson/1/v2/10'].status, 'learning');
  assert.equal(getLessonStatus('/lesson/1/10'), 'learning');

  recordLessonMastered('/lesson/1/10');
  const lessons = readLessonProgress();
  assert.equal(lessons['/lesson/1/v2/10'].status, 'mastered');
  assert.equal(getLessonStatus('/lesson/1/10'), 'mastered');
  assert.equal(lessons['/lesson/1/10'].status, 'mastered', 'old key is left untouched, not migrated');
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
    lessons: { '/lesson/1/v2/9': { status: 'mastered', visitedAt: 1, masteredAt: 2 } },
    exams: { '2024-09-l1': { answers: { 1: 0 }, isSubmitted: false } },
    hardware: { esp32Ai: null },
    museum: { collected: [] },
  }));

  const data = readLearningData();
  assert.equal(data.version, LEARNING_DATA_VERSION);
  assert.deepEqual(data.attempts, {});
  assert.equal(data.lessons['/lesson/1/v2/9'].status, 'mastered');
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

// ─── 错题集合（mistakes）与解析模式进度（analysis） ─────────────────────

test('a blank submission does not wipe the wrong-answer book', () => {
  installStorage();
  const questions = [
    { id: 1, type: 'single', answer: 0, score: 2 },
    { id: 2, type: 'single', answer: 0, score: 2 },
    { id: 3, type: 'single', answer: 0, score: 2 },
  ];
  recordExamAttempt('2025-09-l3', { questions, answers: { 1: 1, 2: 1, 3: 0 } });
  assert.deepEqual(currentWrongIdsByPaper()['2025-09-l3'], [1, 2]);

  // 误点「现在交卷」，一题没答：错题不能消失。
  recordExamAttempt('2025-09-l3', { questions, answers: {} });
  assert.deepEqual(currentWrongIdsByPaper()['2025-09-l3'], [1, 2]);

  // 只答对第 1 题、第 2 题没答：第 1 题移出，第 2 题留下。
  recordExamAttempt('2025-09-l3', { questions, answers: { 1: 0 } });
  assert.deepEqual(currentWrongIdsByPaper()['2025-09-l3'], [2]);

  // 新做错的第 3 题并入。
  recordExamAttempt('2025-09-l3', { questions, answers: { 3: 2 } });
  assert.deepEqual(currentWrongIdsByPaper()['2025-09-l3'], [2, 3]);
});

test('analysis-mode results merge into the wrong-answer book', () => {
  installStorage();
  recordQuestionResult('2024-03-l4', 5, false);
  recordQuestionResult('2024-03-l4', 12, false);
  assert.deepEqual(currentWrongIdsByPaper()['2024-03-l4'], [5, 12]);

  recordQuestionResult('2024-03-l4', 5, true);
  assert.deepEqual(currentWrongIdsByPaper()['2024-03-l4'], [12]);

  recordQuestionResult('2024-03-l4', 12, true);
  assert.equal(currentWrongIdsByPaper()['2024-03-l4'], undefined);
});

test('documents without a mistakes field derive it from the latest answered attempt', () => {
  const storage = installStorage();
  storage.setItem(LEARNING_DATA_STORAGE_KEY, JSON.stringify({
    version: LEARNING_DATA_VERSION,
    attempts: {
      // 最新一次是空白交卷（旧版正是在这里把错题清空的），应跳过它。
      '2025-06-l2': [
        { at: 30, score: 0, total: 50, correct: 0, wrong: 0, unanswered: 25, wrongIds: [] },
        { at: 20, score: 40, total: 50, correct: 20, wrong: 2, unanswered: 3, wrongIds: [4, 9] },
        { at: 10, score: 30, total: 50, correct: 15, wrong: 3, unanswered: 7, wrongIds: [1, 4, 9] },
      ],
      '2025-06-l1': [{ at: 5, score: 50, total: 50, correct: 25, wrong: 0, wrongIds: [] }],
    },
  }));

  const data = readLearningData();
  assert.deepEqual(currentWrongIdsByPaper(data), { '2025-06-l2': [4, 9] });
  assert.deepEqual(data.analysis, {});

  // 已有 mistakes 字段时以它为准，不再从交卷记录推导。
  storage.setItem(LEARNING_DATA_STORAGE_KEY, JSON.stringify({ ...data, mistakes: {} }));
  assert.deepEqual(currentWrongIdsByPaper(readLearningData()), {});
});

test('clearing a paper also clears its mistakes and analysis progress', () => {
  installStorage();
  const questions = [{ id: 1, type: 'single', answer: 0, score: 2 }];
  recordExamAttempt('2024-12-l5', { questions, answers: { 1: 1 } });
  saveAnalysisProgress('2024-12-l5', { answers: { 1: 1 }, revealed: { 1: true }, currentQuestionIndex: 0 });
  recordQuestionResult('2024-12-l6', 3, false);

  clearPaperAttempts('2024-12-l5');

  const data = readLearningData();
  assert.equal(data.mistakes['2024-12-l5'], undefined);
  assert.equal(data.analysis['2024-12-l5'], undefined);
  assert.deepEqual(currentWrongIdsByPaper(data), { '2024-12-l6': [3] });
});

test('analysis progress persists per paper and ignores a changed question set', () => {
  installStorage();
  saveAnalysisProgress('2023-12-l1', { answers: { 1: 2, 3: 0 }, revealed: { 1: true, 3: true }, currentQuestionIndex: 4 });
  const restored = loadAnalysisProgress('2023-12-l1');
  assert.deepEqual(restored.answers, { 1: 2, 3: 0 });
  assert.deepEqual(restored.revealed, { 1: true, 3: true });
  assert.equal(restored.currentQuestionIndex, 4);

  const topicQuestions = [{ id: 1, sourcePaperId: 'a', sourceQuestionId: 3 }, { id: 2, sourcePaperId: 'b', sourceQuestionId: 7 }];
  const signature = questionSignature(topicQuestions);
  saveAnalysisProgress('topic-1-循环', { answers: { 1: 0 }, revealed: { 1: true }, signature });
  assert.ok(loadAnalysisProgress('topic-1-循环', signature));
  assert.equal(loadAnalysisProgress('topic-1-循环', questionSignature(topicQuestions.slice(0, 1))), null);

  clearAnalysisProgress('2023-12-l1');
  assert.equal(loadAnalysisProgress('2023-12-l1'), null);
});

test('only wrong or unanswered gradable objective questions are reviewed after submit', () => {
  const questions = [
    { id: 1, type: 'single', answer: 0 },
    { id: 2, type: 'single', answer: 1 },
    { id: 3, type: 'judge', answer: 0 },
    { id: 4, type: 'single', answer: 2, sourceIntegrity: 'missing-code' },
    { id: 5, type: 'programming' },
  ];
  assert.deepEqual(reviewQuestionIndexes(questions, { 1: 0, 2: 0, 5: PROGRAMMING_ACK }), [1, 2]);
});

test('wrong-question practice paper keeps source ids and paper verification fields', () => {
  const paper = {
    id: '2025-03-l3',
    title: '2025年3月 三级',
    level: 3,
    verification: { answer: 'verified' },
    questions: [
      { id: 1, type: 'single', question: 'A', options: ['x', 'y'], answer: 0 },
      { id: 7, type: 'single', question: 'B', options: ['x', 'y'], answer: 1 },
    ],
    programmingQuestions: [{ id: 26, type: 'programming' }],
  };
  const wrong = pickWrongQuestions(paper, [7, 99]);
  assert.deepEqual(wrong.map((q) => q.id), [7]);

  const practice = buildMistakePracticePaper(paper, wrong);
  assert.equal(practice.id, 'review-2025-03-l3');
  assert.equal(practice.level, 3);
  assert.deepEqual(practice.verification, { answer: 'verified' });
  assert.equal(practice.programmingQuestions, undefined);
  assert.deepEqual(practice.questions.map((q) => [q.id, q.sourcePaperId, q.sourceQuestionId]), [[1, '2025-03-l3', 7]]);
  assert.equal(buildMistakePracticePaper(paper, []), null);
});
