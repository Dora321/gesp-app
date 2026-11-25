import { isProgrammingQuestion } from './questionHelpers.js';
import { isScoringExcluded } from './sourceIntegrity.js';

export function scoreExam(questions = [], answers = {}) {
    const objectiveQuestions = questions.filter((question) => (
        question && !isProgrammingQuestion(question) && !isScoringExcluded(question)
    ));
    const excludedObjectiveCount = questions.filter((question) => (
        question && !isProgrammingQuestion(question) && isScoringExcluded(question)
    )).length;
    const programmingQuestions = questions.filter((question) => isProgrammingQuestion(question));
    const objectiveCorrectCount = objectiveQuestions.filter((question) => answers[question.id] === question.answer).length;
    const objectiveWrongCount = objectiveQuestions.filter((question) => (
        answers[question.id] !== undefined && answers[question.id] !== question.answer
    )).length;

    return {
        objectiveScore: objectiveQuestions.reduce((total, question) => (
            total + (answers[question.id] === question.answer ? (question.score || 0) : 0)
        ), 0),
        objectiveScoreTotal: objectiveQuestions.reduce((total, question) => total + (question.score || 0), 0),
        objectiveCorrectCount,
        objectiveWrongCount,
        objectiveUnansweredCount: objectiveQuestions.length - objectiveCorrectCount - objectiveWrongCount,
        programmingMarkedCount: programmingQuestions.filter((question) => answers[question.id] !== undefined).length,
        excludedObjectiveCount,
    };
}

/**
 * 交卷后「只看错题」要走的题：参与判分的客观题里答错或没作答的，返回它们在 questions 里的下标。
 * 编程题不判分、不计分题不进错题本，都不算。
 */
export function reviewQuestionIndexes(questions = [], answers = {}) {
    const indexes = [];
    questions.forEach((question, index) => {
        if (!question || isProgrammingQuestion(question) || isScoringExcluded(question)) return;
        if (answers[question.id] !== question.answer) indexes.push(index);
    });
    return indexes;
}

/** 当前卷中标为存疑的题目下标，忽略旧题号或重复标记。 */
export function flaggedQuestionIndexes(questions = [], flagged = new Set()) {
    return questions.flatMap((question, index) => (
        question && flagged.has(String(question.id)) ? [index] : []
    ));
}

/** 先匹配原题 ID，再尝试按卷面 1-based 序号定位。 */
export function resolveQuestionIndex(questions, target) {
    if (!target) return null;
    const byId = questions.findIndex((question) => String(question.id) === target);
    if (byId >= 0) return byId;
    if (!/^[1-9]\d*$/.test(target)) return null;
    const position = Number(target);
    return position <= questions.length ? position - 1 : null;
}

/** 按客观与编程各 50 分折算，目标按编程题需取得的整分向上取整。 */
export function estimateGespThresholds(objectiveScore, objectiveScoreTotal) {
    if (!Number.isFinite(objectiveScoreTotal) || objectiveScoreTotal <= 0 || !Number.isFinite(objectiveScore)) return null;
    const scaledObjective = Math.min(50, Math.max(0, 50 * objectiveScore / objectiveScoreTotal));
    const programmingRequired = (threshold) => {
        const gap = Math.max(0, Math.ceil(threshold - scaledObjective));
        return gap <= 50 ? gap : null;
    };
    return {
        scaledObjective,
        passRequired: programmingRequired(60),
        skipRequired: programmingRequired(90),
    };
}
