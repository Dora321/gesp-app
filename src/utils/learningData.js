import { CODING_DRAFTS_KEY, mergeCodingDrafts, readAllCodingDrafts } from './codingDrafts.js';

export const LEARNING_DATA_SCHEMA = 'gesp-learning-data';
export const LEARNING_DATA_VERSION = 4;

// 每张卷保留最近若干次交卷记录。备考期一张卷刷十几遍是常态，但更早的记录对
// 复盘没有价值，无上限增长只会把 localStorage 撑爆。
export const MAX_ATTEMPTS_PER_PAPER = 20;
export const LEARNING_DATA_STORAGE_KEY = 'gesp_learning_data';
export const LEARNING_DATA_EVENT = 'gesp:learning-data';
export const PRACTICE_PREFIX = 'gesp:cpp-practice:v1:';
let storageFailed = false;
export const hasLearningStorageError = () => storageFailed;

const LEGACY_KEYS = {
    lessons: 'gesp_lesson_progress',
    examPrefix: 'gesp_exam_progress_',
    esp32Ai: 'esp32ai_progress',
    museum: 'museum_collection',
};

const unsafeKeys = new Set(['__proto__', 'constructor', 'prototype']);

const isRecord = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
const finiteNumber = (value) => Number.isFinite(value) ? value : undefined;

const emptyLearningData = () => ({
    version: LEARNING_DATA_VERSION,
    updatedAt: null,
    lessons: {},
    practice: {},
    exams: {},
    attempts: {},
    analysis: {},
    mistakes: {},
    hardware: { esp32Ai: null },
    museum: { collected: [] },
});

const getStorage = () => {
    try {
        return globalThis.localStorage || null;
    } catch {
        return null;
    }
};

const parseJson = (raw) => {
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
};

const cleanEntries = (value, cleanValue) => {
    if (!isRecord(value)) return {};
    const result = {};
    for (const [key, entry] of Object.entries(value)) {
        if (unsafeKeys.has(key)) continue;
        const cleaned = cleanValue(entry, key);
        if (cleaned !== null && cleaned !== undefined) result[key] = cleaned;
    }
    return result;
};

const normalizeLessons = (value) => cleanEntries(value, (entry) => {
    if (!isRecord(entry) || !['learning', 'mastered'].includes(entry.status)) return null;
    const normalized = { status: entry.status };
    const visitedAt = finiteNumber(entry.visitedAt);
    const masteredAt = finiteNumber(entry.masteredAt);
    if (visitedAt !== undefined) normalized.visitedAt = visitedAt;
    if (entry.status === 'mastered' && masteredAt !== undefined) normalized.masteredAt = masteredAt;
    return normalized;
});

const normalizeAnswers = (value) => cleanEntries(value, (answer) => {
    if (['string', 'number', 'boolean'].includes(typeof answer) || answer === null) return answer;
    return null;
});

const normalizeExams = (value) => cleanEntries(value, (entry) => {
    if (!isRecord(entry)) return null;
    const snapshot = {
        answers: normalizeAnswers(entry.answers),
        isSubmitted: Boolean(entry.isSubmitted),
    };
    // endsAt：新版计时的截止时间戳；timeLeft：旧版存档的剩余秒数（恢复时兼容）。
    for (const key of ['endsAt', 'timeLeft', 'currentQuestionIndex', 'savedAt']) {
        const number = finiteNumber(entry[key]);
        if (number !== undefined) snapshot[key] = number;
    }
    return snapshot;
});

const nonNegativeInt = (value) => (
    Number.isInteger(value) && value >= 0 ? value : undefined
);

// 一次交卷的结果快照。只保留复盘用得上的字段：分数、对错计数、错题号。
// 不存作答明细——那是 exams 里的草稿该管的事，两份数据分开才不会互相污染。
const normalizeAttempt = (entry) => {
    if (!isRecord(entry)) return null;
    const at = finiteNumber(entry.at);
    if (at === undefined) return null;

    const attempt = { at };
    for (const key of ['score', 'total']) {
        const number = finiteNumber(entry[key]);
        if (number !== undefined && number >= 0) attempt[key] = number;
    }
    for (const key of ['correct', 'wrong', 'unanswered', 'excluded']) {
        const number = nonNegativeInt(entry[key]);
        if (number !== undefined) attempt[key] = number;
    }
    const elapsed = nonNegativeInt(entry.elapsedSeconds);
    if (elapsed !== undefined) attempt.elapsedSeconds = elapsed;

    attempt.wrongIds = Array.isArray(entry.wrongIds)
        ? [...new Set(entry.wrongIds.filter((id) => typeof id === 'string' || Number.isFinite(id)))]
        : [];

    return attempt;
};

const normalizeAttempts = (value, limit) => cleanEntries(value, (list) => {
    if (!Array.isArray(list)) return null;
    const entries = list
        .map(normalizeAttempt)
        .filter(Boolean)
        .sort((a, b) => b.at - a.at)
        .slice(0, limit);
    return entries.length > 0 ? entries : null;
});

// 解析模式的作答进度，按卷号（或考点练习的虚拟卷号）存。revealed 只认 true。
const normalizeAnalysis = (value) => cleanEntries(value, (entry) => {
    if (!isRecord(entry)) return null;
    const snapshot = {
        answers: normalizeAnswers(entry.answers),
        revealed: cleanEntries(entry.revealed, (flag) => (flag === true ? true : null)),
    };
    const index = nonNegativeInt(entry.currentQuestionIndex);
    if (index !== undefined) snapshot.currentQuestionIndex = index;
    const savedAt = finiteNumber(entry.savedAt);
    if (savedAt !== undefined) snapshot.savedAt = savedAt;
    if (typeof entry.signature === 'string' && entry.signature.length <= 64) snapshot.signature = entry.signature;
    return snapshot;
});

// 错题集合：{ 卷号: { 题号: 记入时间 } }。做错（考试或解析模式）就记入，之后做对才移出；
// 没作答不改变状态——空白交卷不能把攒下的错题清掉。
const normalizeMistakes = (value) => cleanEntries(value, (entry) => {
    const ids = cleanEntries(entry, (at) => finiteNumber(at) ?? null);
    return Object.keys(ids).length > 0 ? ids : null;
});

// 旧数据（没有 mistakes 字段）从交卷记录推导：取每卷最近一次「真的作答过」的交卷，
// 一题没答的空白交卷跳过，旧版正是在这里把错题清空的。
const deriveMistakesFromAttempts = (attempts) => {
    const mistakes = {};
    for (const [paperId, list] of Object.entries(attempts)) {
        const latest = list.find((attempt) => (attempt.correct ?? 0) > 0 || attempt.wrongIds.length > 0);
        if (!latest?.wrongIds.length) continue;
        mistakes[paperId] = Object.fromEntries(latest.wrongIds.map((id) => [String(id), latest.at]));
    }
    return mistakes;
};

const normalizeEsp32Ai = (value) => {
    if (!isRecord(value)) return null;
    const activeNum = Number.isInteger(value.activeNum) && value.activeNum >= 1 && value.activeNum <= 16
        ? value.activeNum
        : 1;
    const viewed = Array.isArray(value.viewed)
        ? [...new Set(value.viewed.filter((num) => Number.isInteger(num) && num >= 1 && num <= 16))]
        : [];
    return { activeNum, viewed };
};

const normalizeCollection = (value) => Array.isArray(value)
    ? [...new Set(value.filter((id) => typeof id === 'string' || Number.isFinite(id)))]
    : [];

export function normalizeLearningData(value) {
    return normalizeData(value, MAX_ATTEMPTS_PER_PAPER);
}

function normalizeData(value, attemptLimit) {
    const source = isRecord(value?.data) ? value.data : (isRecord(value) ? value : {});
    const isVersionOne = Number(value?.version) === 1;
    const lessons = isVersionOne ? (source.lessonProgress || source.lessons) : source.lessons;
    const exams = isVersionOne ? (source.examProgress || source.exams) : source.exams;
    const esp32Ai = isVersionOne
        ? (source.esp32AiProgress || source.hardware?.esp32Ai)
        : source.hardware?.esp32Ai;
    const collected = isVersionOne
        ? (source.museumCollection || source.museum?.collected)
        : source.museum?.collected;

    const attempts = normalizeAttempts(source.attempts, attemptLimit);

    return {
        version: LEARNING_DATA_VERSION,
        updatedAt: finiteNumber(source.updatedAt) ?? null,
        lessons: normalizeLessons(lessons),
        practice: cleanEntries(source.practice, value => Array.isArray(value) ? [0, 1, 2].map(index => value[index] === true) : null),
        exams: normalizeExams(exams),
        // v1/v2 没有 attempts，缺省为空即可——旧数据里本来就没有成绩历史。
        attempts,
        analysis: normalizeAnalysis(source.analysis),
        mistakes: source.mistakes === undefined
            ? deriveMistakesFromAttempts(attempts)
            : normalizeMistakes(source.mistakes),
        hardware: { esp32Ai: normalizeEsp32Ai(esp32Ai) },
        museum: { collected: normalizeCollection(collected) },
    };
}

const mergeEntries = (current, imported, merge) => {
    const result = { ...current };
    for (const [key, entry] of Object.entries(imported)) {
        result[key] = Object.hasOwn(current, key) ? merge(current[key], entry) : entry;
    }
    return result;
};

const newest = (current, imported) => (
    (imported.savedAt ?? -Infinity) > (current.savedAt ?? -Infinity) ? imported : current
);

const mergeLesson = (current, imported) => {
    const mastered = current.status === 'mastered' || imported.status === 'mastered';
    const visitedAt = Math.min(current.visitedAt ?? Infinity, imported.visitedAt ?? Infinity);
    const masteredAt = Math.max(current.masteredAt ?? -Infinity, imported.masteredAt ?? -Infinity);
    return {
        status: mastered ? 'mastered' : 'learning',
        ...(Number.isFinite(visitedAt) && { visitedAt }),
        ...(mastered && Number.isFinite(masteredAt) && { masteredAt }),
    };
};

const dedupeAttempts = (attempts) => {
    const unique = new Map();
    for (const attempt of attempts) {
        const key = JSON.stringify([attempt.at, attempt.score, attempt.total, attempt.wrongIds.join(',')]);
        unique.set(key, { ...attempt, ...unique.get(key) });
    }
    return [...unique.values()].sort((a, b) => b.at - a.at).slice(0, MAX_ATTEMPTS_PER_PAPER);
};

export function mergeLearningData(current, imported) {
    const local = normalizeData(current, Infinity);
    const incoming = normalizeData(imported, Infinity);
    const localEsp32 = local.hardware.esp32Ai;
    const importedEsp32 = incoming.hardware.esp32Ai;
    const incomingIsNewer = (incoming.updatedAt ?? -Infinity) > (local.updatedAt ?? -Infinity);
    const attempts = mergeEntries(local.attempts, incoming.attempts, (a, b) => [...a, ...b]);

    return {
        version: LEARNING_DATA_VERSION,
        updatedAt: incomingIsNewer ? incoming.updatedAt : local.updatedAt,
        lessons: mergeEntries(local.lessons, incoming.lessons, mergeLesson),
        practice: mergeEntries(local.practice, incoming.practice, (a, b) => a.map((flag, index) => flag || b[index])),
        exams: mergeEntries(local.exams, incoming.exams, newest),
        attempts: Object.fromEntries(Object.entries(attempts).map(([key, list]) => [key, dedupeAttempts(list)])),
        analysis: mergeEntries(local.analysis, incoming.analysis, newest),
        // 现有格式只记录做错的时间，两个备份中仍有记录的题目都保留。
        mistakes: mergeEntries(local.mistakes, incoming.mistakes, (a, b) => mergeEntries(a, b, Math.max)),
        hardware: {
            esp32Ai: localEsp32 && importedEsp32
                ? {
                    activeNum: incomingIsNewer ? importedEsp32.activeNum : localEsp32.activeNum,
                    viewed: [...new Set([...localEsp32.viewed, ...importedEsp32.viewed])],
                }
                : localEsp32 || importedEsp32,
        },
        museum: { collected: [...new Set([...local.museum.collected, ...incoming.museum.collected])] },
    };
}

const emitChange = (detail) => {
    if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return;
    window.dispatchEvent(new CustomEvent(LEARNING_DATA_EVENT, { detail }));
};

const reportStorageFailure = () => {
    const firstFailure = !storageFailed;
    storageFailed = true;
    if (firstFailure) queueMicrotask(() => emitChange({ reason: 'storage-error' }));
};

const writeCanonical = (data, reason = 'update') => {
    const storage = getStorage();
    if (!storage) { reportStorageFailure(); return false; }
    const normalized = normalizeLearningData(data);
    normalized.updatedAt = Date.now();
    try {
        const existing = parseJson(storage.getItem(LEARNING_DATA_STORAGE_KEY));
        if (Number(existing?.version) > LEARNING_DATA_VERSION) { reportStorageFailure(); return false; }
        storage.setItem(LEARNING_DATA_STORAGE_KEY, JSON.stringify(normalized));
        storageFailed = false;
        if (reason.startsWith('migrate')) queueMicrotask(() => emitChange({ reason, data: normalized }));
        else emitChange({ reason, data: normalized });
        return true;
    } catch {
        reportStorageFailure();
        return false;
    }
};

const collectLegacyData = (storage) => {
    const data = emptyLearningData();
    const migratedKeys = [];

    const lessonProgress = parseJson(storage.getItem(LEGACY_KEYS.lessons));
    if (isRecord(lessonProgress)) {
        data.lessons = lessonProgress;
        migratedKeys.push(LEGACY_KEYS.lessons);
    }

    for (let index = 0; index < storage.length; index += 1) {
        const key = storage.key(index);
        if (!key?.startsWith(LEGACY_KEYS.examPrefix)) continue;
        const paperId = key.slice(LEGACY_KEYS.examPrefix.length);
        const snapshot = parseJson(storage.getItem(key));
        if (paperId && isRecord(snapshot)) {
            data.exams[paperId] = snapshot;
            migratedKeys.push(key);
        }
    }

    const esp32Ai = parseJson(storage.getItem(LEGACY_KEYS.esp32Ai));
    if (isRecord(esp32Ai)) {
        data.hardware.esp32Ai = esp32Ai;
        migratedKeys.push(LEGACY_KEYS.esp32Ai);
    }

    const museumCollection = parseJson(storage.getItem(LEGACY_KEYS.museum));
    if (Array.isArray(museumCollection)) {
        data.museum.collected = museumCollection;
        migratedKeys.push(LEGACY_KEYS.museum);
    }

    return { data, migratedKeys };
};

const readLegacyPractice = storage => {
    const practice = {};
    for (let index = 0; index < storage.length; index++) {
        const key = storage.key(index);
        if (key?.startsWith(PRACTICE_PREFIX)) {
            const value = parseJson(storage.getItem(key));
            if (Array.isArray(value)) practice[key.slice(PRACTICE_PREFIX.length)] = value;
        }
    }
    return practice;
};

export function readLearningData() {
    const storage = getStorage();
    if (!storage) return emptyLearningData();

    let canonical;
    try { canonical = parseJson(storage.getItem(LEARNING_DATA_STORAGE_KEY)); } catch { return emptyLearningData(); }
    if (isRecord(canonical)) {
        let practice = canonical.practice;
        if (canonical.version < 4) { try { practice = { ...readLegacyPractice(storage), ...practice }; } catch { /* Keep readable data. */ } }
        const normalized = normalizeLearningData({ ...canonical, practice });
        if (canonical.version < LEARNING_DATA_VERSION) writeCanonical(normalized, 'migrate-version');
        return normalized;
    }

    try {
        const { data, migratedKeys } = collectLegacyData(storage);
        data.practice = readLegacyPractice(storage);
        if (migratedKeys.length === 0 && Object.keys(data.practice).length === 0) return data;
        if (writeCanonical(data, 'migrate-legacy')) {
            migratedKeys.forEach((key) => storage.removeItem(key));
        }
        return normalizeLearningData(data);
    } catch {
        return emptyLearningData();
    }
}

export function updateLearningData(updater, reason = 'update') {
    const current = readLearningData();
    const candidate = typeof updater === 'function' ? updater(current) : updater;
    const next = normalizeLearningData(candidate);
    return writeCanonical(next, reason) ? next : current;
}

export function createLearningDataExport() {
    const data = readLearningData();
    const codingDrafts = readAllCodingDrafts(getStorage());
    return {
        schema: LEARNING_DATA_SCHEMA,
        version: LEARNING_DATA_VERSION,
        exportedAt: new Date().toISOString(),
        data,
        ...(Object.keys(codingDrafts).length > 0 ? { codingDrafts } : {}),
    };
}

function validateImport(payload) {
    const parsed = typeof payload === 'string' ? parseJson(payload) : payload;
    if (!isRecord(parsed) || parsed.schema !== LEARNING_DATA_SCHEMA) {
        throw new Error('不是有效的 GESP 学习数据文件');
    }
    const version = Number(parsed.version);
    if (!Number.isInteger(version) || version < 1 || version > LEARNING_DATA_VERSION) {
        throw new Error(`不支持的学习数据版本：${parsed.version}`);
    }
    return { ...parsed, version };
}

export function previewLearningDataImport(payload) {
    return normalizeLearningData(validateImport(payload));
}

export function importLearningData(payload, { mode = 'replace' } = {}) {
    const parsed = validateImport(payload);
    if (mode !== 'merge' && mode !== 'replace') throw new Error('不支持的学习数据导入模式');
    const data = mode === 'merge'
        ? mergeLearningData(readLearningData(), parsed)
        : normalizeLearningData(parsed);
    if (!writeCanonical(data, 'import')) throw new Error('浏览器无法保存学习数据');
    const storage = getStorage();
    if (storage && (mode === 'replace' || isRecord(parsed.codingDrafts))) {
        try {
            const incomingDrafts = isRecord(parsed.codingDrafts) ? parsed.codingDrafts : {};
            const nextDrafts = mode === 'merge'
                ? mergeCodingDrafts(readAllCodingDrafts(storage), incomingDrafts)
                : mergeCodingDrafts({}, incomingDrafts);
            if (Object.keys(nextDrafts).length > 0) {
                storage.setItem(CODING_DRAFTS_KEY, JSON.stringify(nextDrafts));
            } else {
                storage.removeItem(CODING_DRAFTS_KEY);
            }
        } catch {
            // 保留主学习数据已导入状态，草稿写失败不阻塞主流程。
        }
    }
    return data;
}

export function resetLearningData() {
    const storage = getStorage();
    if (!storage) return false;
    try {
        storage.removeItem(LEARNING_DATA_STORAGE_KEY);
        storage.removeItem(CODING_DRAFTS_KEY);
        storage.removeItem(LEGACY_KEYS.lessons);
        storage.removeItem(LEGACY_KEYS.esp32Ai);
        storage.removeItem(LEGACY_KEYS.museum);
        const examKeys = [];
        for (let index = 0; index < storage.length; index += 1) {
            const key = storage.key(index);
            if (key?.startsWith(LEGACY_KEYS.examPrefix) || key?.startsWith(PRACTICE_PREFIX)) examKeys.push(key);
        }
        examKeys.forEach((key) => storage.removeItem(key));
        storageFailed = false;
        emitChange({ reason: 'reset', data: emptyLearningData() });
        return true;
    } catch {
        return false;
    }
}

const hardwareLessonPrefixes = [
    '/hardware/esp32/',
    '/hardware/arduino/',
    '/hardware/esp32-contest/',
    '/innovation-foundation/',
];

export function summarizeLearningData(data = readLearningData()) {
    const attemptLists = Object.values(data.attempts);
    return {
        lessons: Object.keys(data.lessons).length,
        masteredLessons: Object.values(data.lessons).filter((entry) => entry.status === 'mastered').length,
        examDrafts: Object.keys(data.exams).length,
        examAttempts: attemptLists.reduce((total, list) => total + list.length, 0),
        papersAttempted: attemptLists.length,
        // 旧的 esp32Ai.viewed 曾是硬件课进度来源，那个页面已被 35 课新体系取代。
        // 现在硬件课进度和 C++ 课走同一套 lessons 记录，按路径前缀区分。
        hardwareLessons: Object.keys(data.lessons)
            .filter((path) => hardwareLessonPrefixes.some((prefix) => path.startsWith(prefix))).length,
        museumItems: data.museum.collected.length,
    };
}
