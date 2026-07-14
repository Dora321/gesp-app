const STORAGE_KEY = 'gesp_lesson_evidence_v1';

export const LESSON_EVIDENCE_EVENT = 'gesp:lesson-evidence';

// These review lessons do not currently include a shared PredictCheck or
// TransferCheck. Their MasteryCheck collects a short written/code artifact
// instead so reflection alone can never mark the lesson as mastered.
const FALLBACK_EVIDENCE_ROUTES = new Set([
    '/lesson/2/1',
    '/lesson/2/2',
    '/lesson/2/15',
    '/lesson/2/16',
    '/lesson/3/15',
    '/lesson/3/16',
    '/lesson/4/15',
    '/lesson/4/16',
    '/lesson/5/15',
    '/lesson/5/16',
    '/lesson/6/15',
    '/lesson/6/16',
]);

function readAllEvidence() {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const parsed = JSON.parse(raw);
        return parsed && typeof parsed === 'object' ? parsed : {};
    } catch {
        return {};
    }
}

function writeAllEvidence(evidence) {
    try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(evidence));
    } catch {
        // Evidence remains available in component state when storage is blocked.
    }
}

export function requiresFallbackEvidence(path) {
    return FALLBACK_EVIDENCE_ROUTES.has(path);
}

export function readLessonEvidence(path) {
    if (!path) return { kinds: {}, updatedAt: null };
    const entry = readAllEvidence()[path];
    return entry && typeof entry === 'object'
        ? { kinds: entry.kinds || {}, updatedAt: entry.updatedAt || null }
        : { kinds: {}, updatedAt: null };
}

export function hasObjectiveLessonEvidence(path) {
    const { kinds } = readLessonEvidence(path);
    return Boolean(kinds.predictCorrect || kinds.predictAttempt || kinds.transferAttempt || kinds.exitArtifact);
}

export function recordLessonEvidence(path, kind) {
    if (!path || !kind) return;

    const evidence = readAllEvidence();
    const current = evidence[path] || { kinds: {} };
    evidence[path] = {
        kinds: { ...current.kinds, [kind]: true },
        updatedAt: Date.now(),
    };
    writeAllEvidence(evidence);

    window.dispatchEvent(new CustomEvent(LESSON_EVIDENCE_EVENT, {
        detail: { path, kind },
    }));
}

export const LESSON_EVIDENCE_STORAGE_KEY = STORAGE_KEY;
