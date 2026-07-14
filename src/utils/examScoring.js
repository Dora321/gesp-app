import { isProgrammingQuestion } from './questionHelpers.js';

export function scoreExam(questions = [], answers = {}) {
    const objectiveQuestions = questions.filter((question) => question && !isProgrammingQuestion(question));
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
    };
}
