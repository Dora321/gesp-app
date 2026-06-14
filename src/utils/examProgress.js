// Best-effort persistence of in-progress exam state, keyed by paper id.
// Lets a learner survive an accidental refresh / tab close during a timed
// 90-minute paper without losing answers or the clock.

const keyFor = (paperId) => `gesp_exam_progress_${paperId}`;

export function loadExamProgress(paperId) {
    try {
        const raw = localStorage.getItem(keyFor(paperId));
        if (!raw) return null;
        const data = JSON.parse(raw);
        return data && typeof data === 'object' ? data : null;
    } catch {
        return null;
    }
}

export function saveExamProgress(paperId, snapshot) {
    try {
        localStorage.setItem(keyFor(paperId), JSON.stringify({ ...snapshot, savedAt: Date.now() }));
    } catch {
        // Storage full / disabled (private mode) — persistence is best-effort.
    }
}

export function clearExamProgress(paperId) {
    try {
        localStorage.removeItem(keyFor(paperId));
    } catch {
        // ignore
    }
}

// Only offer to resume work that is genuinely in progress: not yet submitted,
// and the learner has actually answered something or moved past question 1.
export function hasResumableProgress(p) {
    if (!p || p.isSubmitted) return false;
    const answered = p.answers && Object.keys(p.answers).length > 0;
    const movedOn = typeof p.currentQuestionIndex === 'number' && p.currentQuestionIndex > 0;
    return Boolean(answered || movedOn);
}
