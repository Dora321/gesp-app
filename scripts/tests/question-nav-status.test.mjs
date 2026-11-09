import test from 'node:test';
import assert from 'node:assert/strict';
import { getQuestionNavStatus } from '../../src/utils/questionNavStatus.js';

const objective = (answer) => ({ id: 1, type: 'single', answer });
const programming = (type = 'programming') => ({ id: 2, type });

test('revealed correct answer is emerald, including option index 0', () => {
  const result = getQuestionNavStatus({
    q: objective(0),
    answer: 0,
    revealed: true,
    isCurrent: false,
    questionNumber: 1,
  });

  assert.deepEqual(result, {
    status: 'correct',
    className: 'bg-emerald-100 border-emerald-300 text-emerald-800',
    ariaLabel: '第 1 题，答对',
  });
});

test('revealed wrong answer is rose, including when the user answered option 0', () => {
  const result = getQuestionNavStatus({
    q: objective(1),
    answer: 0,
    revealed: true,
    isCurrent: false,
    questionNumber: 2,
  });

  assert.deepEqual(result, {
    status: 'wrong',
    className: 'bg-rose-100 border-rose-300 text-rose-800',
    ariaLabel: '第 2 题，答错',
  });
});

test('answered but unrevealed keeps the old indigo tint and never leaks correctness', () => {
  const correctLooking = getQuestionNavStatus({
    q: objective(0),
    answer: 0,
    revealed: false,
    isCurrent: false,
    questionNumber: 3,
  });
  const wrongLooking = getQuestionNavStatus({
    q: objective(0),
    answer: 2,
    revealed: false,
    isCurrent: false,
    questionNumber: 4,
  });

  for (const result of [correctLooking, wrongLooking]) {
    assert.equal(result.status, 'answered');
    assert.equal(result.className, 'bg-indigo-50 text-indigo-700 border-indigo-200');
    assert.equal(result.className.includes('emerald'), false);
    assert.equal(result.className.includes('rose'), false);
  }
  assert.equal(correctLooking.ariaLabel, '第 3 题，已作答');
  assert.equal(wrongLooking.ariaLabel, '第 4 题，已作答');
});

test('unanswered question stays neutral and is labelled 未作答', () => {
  const result = getQuestionNavStatus({
    q: objective(1),
    answer: undefined,
    revealed: false,
    isCurrent: false,
    questionNumber: 5,
  });

  assert.deepEqual(result, {
    status: 'unanswered',
    className: 'bg-white text-slate-600 border-slate-200',
    ariaLabel: '第 5 题，未作答',
  });
});

test('programming questions are violet when read and never judged right or wrong', () => {
  for (const type of ['programming', 'coding']) {
    const result = getQuestionNavStatus({
      q: programming(type),
      answer: 0,
      revealed: true,
      isCurrent: false,
      questionNumber: 6,
    });

    assert.equal(result.status, 'programming');
    assert.equal(result.className, 'bg-violet-100 border-violet-300 text-violet-700');
    assert.equal(result.className.includes('emerald'), false);
    assert.equal(result.className.includes('rose'), false);
    assert.equal(result.ariaLabel, '第 6 题，编程题已阅读');
  }
});

test('unread programming question stays neutral and is labelled 未作答', () => {
  const result = getQuestionNavStatus({
    q: programming('coding'),
    answer: undefined,
    revealed: false,
    isCurrent: false,
    questionNumber: 7,
  });

  assert.equal(result.status, 'unanswered');
  assert.equal(result.className, 'bg-white text-slate-600 border-slate-200');
  assert.equal(result.ariaLabel, '第 7 题，未作答');
});

test('current unanswered question overrides the neutral background with solid indigo', () => {
  const result = getQuestionNavStatus({
    q: objective(1),
    answer: undefined,
    revealed: false,
    isCurrent: true,
    questionNumber: 8,
  });

  assert.equal(result.className, 'bg-indigo-600 text-white border-indigo-600');
  assert.equal(result.ariaLabel, '第 8 题（当前），未作答');
});

test('current answered-but-unrevealed question uses solid indigo without a correctness ring', () => {
  const result = getQuestionNavStatus({
    q: objective(1),
    answer: 1,
    revealed: false,
    isCurrent: true,
    questionNumber: 9,
  });

  assert.equal(result.className, 'bg-indigo-600 text-white border-indigo-600');
  assert.equal(result.className.includes('ring'), false);
  assert.equal(result.ariaLabel, '第 9 题（当前），已作答');
});

test('current wrong question keeps rose background and adds a rose ring', () => {
  const result = getQuestionNavStatus({
    q: objective(3),
    answer: 0,
    revealed: true,
    isCurrent: true,
    questionNumber: 10,
  });

  assert.equal(result.status, 'wrong');
  assert.equal(
    result.className,
    'bg-rose-100 border-rose-300 text-rose-800 ring-2 ring-offset-1 ring-rose-500',
  );
  assert.equal(result.ariaLabel, '第 10 题（当前），答错');
});

test('current correct question keeps emerald background and adds an emerald ring', () => {
  const result = getQuestionNavStatus({
    q: objective(0),
    answer: 0,
    revealed: true,
    isCurrent: true,
    questionNumber: 11,
  });

  assert.equal(result.status, 'correct');
  assert.equal(
    result.className,
    'bg-emerald-100 border-emerald-300 text-emerald-800 ring-2 ring-offset-1 ring-emerald-500',
  );
  assert.equal(result.ariaLabel, '第 11 题（当前），答对');
});

test('current read programming question keeps violet background and adds a violet ring', () => {
  const result = getQuestionNavStatus({
    q: programming(),
    answer: '__programming_acknowledged__',
    revealed: true,
    isCurrent: true,
    questionNumber: 12,
  });

  assert.equal(result.status, 'programming');
  assert.equal(
    result.className,
    'bg-violet-100 border-violet-300 text-violet-700 ring-2 ring-offset-1 ring-violet-500',
  );
  assert.equal(result.ariaLabel, '第 12 题（当前），编程题已阅读');
});
