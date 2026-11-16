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
