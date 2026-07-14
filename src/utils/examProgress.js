// Best-effort persistence of in-progress exam state, keyed by paper id.
// Lets a learner survive an accidental refresh / tab close during a timed
// 90-minute paper without losing answers or the clock.

import { readLearningData, updateLearningData } from './learningData.js';

export function loadExamProgress(paperId) {
    return readLearningData().exams[paperId] || null;
}

export function saveExamProgress(paperId, snapshot) {
    if (!paperId) return;
    updateLearningData((data) => ({
        ...data,
        exams: {
            ...data.exams,
            [paperId]: { ...snapshot, savedAt: Date.now() },
        },
    }), 'exam-progress');
}

export function clearExamProgress(paperId) {
    updateLearningData((data) => {
        const exams = { ...data.exams };
        delete exams[paperId];
        return { ...data, exams };
    }, 'exam-progress-clear');
}

// Only offer to resume work that is genuinely in progress: not yet submitted,
// and the learner has actually answered something or moved past question 1.
export function hasResumableProgress(p) {
    if (!p || p.isSubmitted) return false;
    const answered = p.answers && Object.keys(p.answers).length > 0;
    const movedOn = typeof p.currentQuestionIndex === 'number' && p.currentQuestionIndex > 0;
    return Boolean(answered || movedOn);
}
