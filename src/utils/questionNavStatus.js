// 仅用于答案已公开的解析模式导航，勿用于考试未交卷（避免提前泄题）。
import { isProgrammingQuestion } from './questionHelpers.js';

const UNANSWERED_CLASS = 'bg-white text-slate-600 border-slate-200';
const ANSWERED_UNREVEALED_CLASS = 'bg-indigo-50 text-indigo-700 border-indigo-200';
const CURRENT_CLASS = 'bg-indigo-600 text-white border-indigo-600';
const PROGRAMMING_CLASS = 'bg-violet-100 border-violet-300 text-violet-700';
const CORRECT_CLASS = 'bg-emerald-100 border-emerald-300 text-emerald-800';
const WRONG_CLASS = 'bg-rose-100 border-rose-300 text-rose-800';

const CURRENT_RING_CLASS = {
  correct: 'ring-2 ring-offset-1 ring-emerald-500',
  wrong: 'ring-2 ring-offset-1 ring-rose-500',
  programming: 'ring-2 ring-offset-1 ring-violet-500',
};

const STATUS_LABEL = {
  correct: '答对',
  wrong: '答错',
  answered: '已作答',
  programming: '编程题已阅读',
  unanswered: '未作答',
};

/**
 * 解析模式题号导航状态。
 *
 * @param {object} params
 * @param {object} params.q 题目对象
 * @param {*} params.answer 用户答案（0 是合法答案，必须用 !== undefined 判断）
 * @param {boolean} params.revealed 是否已公开答案
 * @param {boolean} params.isCurrent 是否为当前题
 * @param {number} params.questionNumber 1-based 题号
 * @returns {{ status: string, className: string, ariaLabel: string }}
 */
export function getQuestionNavStatus({ q, answer, revealed, isCurrent, questionNumber }) {
  const hasAnswer = answer !== undefined;
  const isProgramming = isProgrammingQuestion(q);

  let status;
  let className;

  if (isProgramming) {
    if (hasAnswer) {
      status = 'programming';
      className = PROGRAMMING_CLASS;
    } else {
      status = 'unanswered';
      className = UNANSWERED_CLASS;
    }
  } else if (revealed && hasAnswer) {
    if (answer === q?.answer) {
      status = 'correct';
      className = CORRECT_CLASS;
    } else {
      status = 'wrong';
      className = WRONG_CLASS;
    }
  } else if (hasAnswer) {
    // 已作答但未揭晓答案：保留旧 indigo 浅色，不泄露对错。
    status = 'answered';
    className = ANSWERED_UNREVEALED_CLASS;
  } else {
    status = 'unanswered';
    className = UNANSWERED_CLASS;
  }

  if (isCurrent) {
    if (status === 'correct' || status === 'wrong' || status === 'programming') {
      className = `${className} ${CURRENT_RING_CLASS[status]}`;
    } else {
      // 未作答或未揭晓答案时用实心 indigo 覆盖底色；不追加对错 ring。
      className = CURRENT_CLASS;
    }
  }

  const numberLabel = questionNumber == null ? '本题' : `第 ${questionNumber} 题`;
  const currentLabel = isCurrent ? '（当前）' : '';
  const ariaLabel = `${numberLabel}${currentLabel}，${STATUS_LABEL[status]}`;

  return { status, className, ariaLabel };
}
