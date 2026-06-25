// Best-effort, client-side tracking of per-lesson learning status so the course
// catalog can show 未学 / 学习中 / 已过关 / 建议复习. Keyed by the lesson's route
// pathname (e.g. "/lesson/3/7" or "/python/f3"), which matches the catalog links.

const STORAGE_KEY = 'gesp_lesson_progress';

// A mastered lesson older than this many days is surfaced as "建议复习".
export const REVIEW_AFTER_DAYS = 30;
const DAY_MS = 24 * 60 * 60 * 1000;

export function readLessonProgress() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return {};
        const data = JSON.parse(raw);
        return data && typeof data === 'object' ? data : {};
    } catch {
        return {};
    }
}

function writeLessonProgress(progress) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
        // Storage full / disabled (private mode) — tracking is best-effort.
    }
}

// Mark a lesson as opened. Never downgrades a mastered lesson back to learning.
export function recordLessonVisit(path) {
    if (!path) return;
    const progress = readLessonProgress();
    const entry = progress[path];
    if (entry?.status === 'mastered') return;
    progress[path] = { status: 'learning', visitedAt: entry?.visitedAt ?? Date.now() };
    writeLessonProgress(progress);
}

// Mark a lesson as passed (reached its exit-check section). Refreshes the
// timestamp so a re-completed lesson clears its "建议复习" flag.
export function recordLessonMastered(path) {
    if (!path) return;
    const progress = readLessonProgress();
    const entry = progress[path];
    progress[path] = { status: 'mastered', visitedAt: entry?.visitedAt ?? Date.now(), masteredAt: Date.now() };
    writeLessonProgress(progress);
}

// Derive the display status for one lesson from a progress snapshot.
// Returns 'unseen' | 'learning' | 'mastered' | 'review'.
export function getLessonStatus(path, progress = readLessonProgress()) {
    const entry = progress[path];
    if (!entry) return 'unseen';
    if (entry.status === 'mastered') {
        const aged = entry.masteredAt && Date.now() - entry.masteredAt > REVIEW_AFTER_DAYS * DAY_MS;
        return aged ? 'review' : 'mastered';
    }
    return 'learning';
}

export const LESSON_STATUS_META = {
    unseen: { label: '未学', dot: 'bg-slate-300', text: 'text-slate-400', chip: 'bg-slate-100 text-slate-500 ring-slate-200' },
    learning: { label: '学习中', dot: 'bg-blue-500', text: 'text-blue-600', chip: 'bg-blue-50 text-blue-700 ring-blue-200' },
    mastered: { label: '已过关', dot: 'bg-emerald-500', text: 'text-emerald-600', chip: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
    review: { label: '建议复习', dot: 'bg-amber-500', text: 'text-amber-600', chip: 'bg-amber-50 text-amber-700 ring-amber-200' },
};
