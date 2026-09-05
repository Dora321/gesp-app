// 交卷结果的持久化与复盘聚合。
//
// 在这之前，`scoreExam()` 是纯函数、ResultDialog 关掉就没了，learningData.exams 只
// 存「还没交卷的草稿」。学生做完 27 道题，成绩和错在哪一题第二天全部消失——而这正
// 是备考最需要的信息。这里补上：每次交卷记一条快照，按考点聚合出薄弱点。

import { MAX_ATTEMPTS_PER_PAPER, readLearningData, updateLearningData } from './learningData.js';
import { isProgrammingQuestion } from './questionHelpers.js';

export { MAX_ATTEMPTS_PER_PAPER };

export function readExamAttempts() {
    return readLearningData().attempts;
}

/** 某张卷的历次交卷记录，最近的在前。 */
export function readPaperAttempts(paperId) {
    return readExamAttempts()[paperId] || [];
}

/**
 * 记录一次交卷。只统计参与判分的客观题：编程题靠手动标记、
 * sourceIntegrity 题不计分，两者都不该进错题本。
 */
export function recordExamAttempt(paperId, { questions = [], answers = {}, elapsedSeconds } = {}) {
    if (!paperId) return null;

    const gradable = questions.filter((question) => (
        question && !isProgrammingQuestion(question) && !question.sourceIntegrity
    ));

    const wrongIds = [];
    let score = 0;
    let total = 0;
    let correct = 0;
    let unanswered = 0;

    for (const question of gradable) {
        total += question.score || 0;
        const given = answers[question.id];
        if (given === undefined) {
            unanswered += 1;
        } else if (given === question.answer) {
            correct += 1;
            score += question.score || 0;
        } else {
            wrongIds.push(question.id);
        }
    }

    const attempt = {
        at: Date.now(),
        score,
        total,
        correct,
        wrong: wrongIds.length,
        unanswered,
        excluded: questions.filter((q) => q && !isProgrammingQuestion(q) && q.sourceIntegrity).length,
        wrongIds,
    };
    if (Number.isFinite(elapsedSeconds)) attempt.elapsedSeconds = Math.max(0, Math.round(elapsedSeconds));

    updateLearningData((data) => ({
        ...data,
        attempts: {
            ...data.attempts,
            [paperId]: [attempt, ...(data.attempts[paperId] || [])].slice(0, MAX_ATTEMPTS_PER_PAPER),
        },
    }), 'exam-attempt');

    return attempt;
}

export function clearPaperAttempts(paperId) {
    updateLearningData((data) => {
        const attempts = { ...data.attempts };
        delete attempts[paperId];
        return { ...data, attempts };
    }, 'exam-attempt-clear');
}

/**
 * 每张卷当前还错着的题号。只看最近一次交卷——一道题订正后又做对了，
 * 就不该继续躺在错题本里，否则错题本只增不减，很快就没人看了。
 */
export function latestWrongIdsByPaper(attempts = readExamAttempts()) {
    const result = {};
    for (const [paperId, list] of Object.entries(attempts)) {
        const latest = list[0]; // normalizeAttempts 已按时间倒序
        if (latest?.wrongIds.length) result[paperId] = [...latest.wrongIds];
    }
    return result;
}

/** 某张卷的趋势：首次、最好、最近一次的得分率。 */
export function summarizePaperAttempts(list = []) {
    if (list.length === 0) return null;
    const rate = (attempt) => (attempt.total > 0 ? attempt.score / attempt.total : 0);
    const latest = list[0];
    const first = list[list.length - 1];
    const best = list.reduce((a, b) => (rate(b) > rate(a) ? b : a), list[0]);
    return {
        attemptCount: list.length,
        latest,
        first,
        best,
        latestRate: rate(latest),
        firstRate: rate(first),
        bestRate: rate(best),
        improved: list.length > 1 ? rate(latest) - rate(first) : 0,
    };
}

/**
 * 按考点聚合错题。resolveTags 由调用方注入（考点解析住在 data 层，
 * utils 不该反向依赖题库数据）。
 */
export function aggregateWeakTopics(wrongQuestionsByPaper, resolveTags) {
    const topics = new Map();
    for (const [paperId, questions] of Object.entries(wrongQuestionsByPaper)) {
        for (const question of questions) {
            for (const tag of resolveTags(question)) {
                if (!topics.has(tag)) topics.set(tag, { tag, wrongCount: 0, questions: [] });
                const entry = topics.get(tag);
                entry.wrongCount += 1;
                entry.questions.push({ paperId, id: question.id });
            }
        }
    }
    return [...topics.values()].sort((a, b) => b.wrongCount - a.wrongCount || a.tag.localeCompare(b.tag, 'zh'));
}
