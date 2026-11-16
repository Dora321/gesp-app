// 交卷结果的持久化与复盘聚合。
//
// 在这之前，`scoreExam()` 是纯函数、ResultDialog 关掉就没了，learningData.exams 只
// 存「还没交卷的草稿」。学生做完 27 道题，成绩和错在哪一题第二天全部消失——而这正
// 是备考最需要的信息。这里补上：每次交卷记一条快照，按考点聚合出薄弱点。

import { MAX_ATTEMPTS_PER_PAPER, readLearningData, updateLearningData } from './learningData.js';
import { isProgrammingQuestion } from './questionHelpers.js';
import { isScoringExcluded } from './sourceIntegrity.js';

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
 * 不计分题（isScoringExcluded，examScoring 优先）不计分，两者都不该进错题本。
 */
export function recordExamAttempt(paperId, { questions = [], answers = {}, elapsedSeconds } = {}) {
    if (!paperId) return null;

    const gradable = questions.filter((question) => (
        question && !isProgrammingQuestion(question) && !isScoringExcluded(question)
    ));

    const wrongIds = [];
    const correctIds = [];
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
            correctIds.push(question.id);
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
        excluded: questions.filter((q) => q && !isProgrammingQuestion(q) && isScoringExcluded(q)).length,
        wrongIds,
    };
    if (Number.isFinite(elapsedSeconds)) attempt.elapsedSeconds = Math.max(0, Math.round(elapsedSeconds));

    updateLearningData((data) => ({
        ...data,
        attempts: {
            ...data.attempts,
            [paperId]: [attempt, ...(data.attempts[paperId] || [])].slice(0, MAX_ATTEMPTS_PER_PAPER),
        },
        mistakes: applyMistakeResults(data.mistakes, paperId, { wrongIds, correctIds, at: attempt.at }),
    }), 'exam-attempt');

    return attempt;
}

/**
 * 把一批作答结果合进错题集合：做错的记入，做对的移出，没作答的题不在两个列表里、保持原状。
 * 返回新的 mistakes 对象（不改入参）。
 */
export function applyMistakeResults(mistakes = {}, paperId, { wrongIds = [], correctIds = [], at = Date.now() } = {}) {
    if (!paperId) return mistakes;
    const entry = { ...(mistakes[paperId] || {}) };
    for (const id of wrongIds) entry[String(id)] = at;
    for (const id of correctIds) delete entry[String(id)];
    const next = { ...mistakes };
    if (Object.keys(entry).length > 0) next[paperId] = entry;
    else delete next[paperId];
    return next;
}

/** 解析模式（或只练错题）里揭晓了一道客观题：答错记入错题集合，答对移出。 */
export function recordQuestionResult(paperId, questionId, isCorrect) {
    if (!paperId || questionId === undefined || questionId === null) return;
    updateLearningData((data) => ({
        ...data,
        mistakes: applyMistakeResults(
            data.mistakes,
            paperId,
            isCorrect ? { correctIds: [questionId] } : { wrongIds: [questionId] },
        ),
    }), 'mistake-update');
}

/** 「清除本卷记录」：成绩、错题和解析模式作答一起删。 */
export function clearPaperAttempts(paperId) {
    updateLearningData((data) => {
        const attempts = { ...data.attempts };
        const mistakes = { ...data.mistakes };
        const analysis = { ...data.analysis };
        delete attempts[paperId];
        delete mistakes[paperId];
        delete analysis[paperId];
        return { ...data, attempts, mistakes, analysis };
    }, 'exam-attempt-clear');
}

/**
 * 每张卷当前还错着的题号（错题本用）：做错过、之后还没做对的题。
 * 题号按卷内顺序返回；题号原本是数字的还原成数字。
 */
export function currentWrongIdsByPaper(data = readLearningData()) {
    const result = {};
    for (const [paperId, entry] of Object.entries(data.mistakes || {})) {
        const ids = Object.keys(entry)
            .map((id) => (/^\d+$/.test(id) ? Number(id) : id))
            .sort((a, b) => (Number(a) - Number(b)) || String(a).localeCompare(String(b)));
        if (ids.length > 0) result[paperId] = ids;
    }
    return result;
}

/**
 * 每张卷最近一次交卷留下的错题号（只看交卷记录）。错题本现在读 currentWrongIdsByPaper：
 * 它同时算上解析模式，而且空白交卷不会把错题清掉。
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

/**
 * 某张卷的错题对应的题目对象（只取客观题），按 currentWrongIdsByPaper 给出的题号顺序。
 * 卷里已经找不到的题号（题库调整过）直接略过。
 */
export function pickWrongQuestions(paper, wrongIds = []) {
    if (!paper) return [];
    const byId = new Map((paper.questions || []).map((question) => [String(question.id), question]));
    return wrongIds.map((id) => byId.get(String(id))).filter(Boolean);
}

/**
 * 「只练错题」用的临时卷：保留原卷的核验信息（解析页的可信度提示据此判断），
 * 题目重编号为 1..n，但带着原卷号和原题号——做对了才能从错题本里移出。
 */
export function buildMistakePracticePaper(paper, wrongQuestions = [], paperId = paper?.id) {
    if (!paper || !paperId || wrongQuestions.length === 0) return null;
    const { programmingQuestions: _programming, codingQuestions: _coding, ...rest } = paper;
    return {
        ...rest,
        id: `review-${paperId}`,
        title: `${paper.title} · 只练错题（${wrongQuestions.length} 题）`,
        questions: wrongQuestions.map((question, index) => ({
            ...question,
            id: index + 1,
            sourcePaperId: paperId,
            sourceQuestionId: question.id,
        })),
    };
}
