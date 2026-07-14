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
