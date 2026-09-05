export const LEARNING_DATA_SCHEMA = 'gesp-learning-data';
export const LEARNING_DATA_VERSION = 3;

// 每张卷保留最近若干次交卷记录。备考期一张卷刷十几遍是常态，但更早的记录对
// 复盘没有价值，无上限增长只会把 localStorage 撑爆。
export const MAX_ATTEMPTS_PER_PAPER = 20;
export const LEARNING_DATA_STORAGE_KEY = 'gesp_learning_data';
export const LEARNING_DATA_EVENT = 'gesp:learning-data';

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
    exams: {},
    attempts: {},
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
    for (const key of ['timeLeft', 'currentQuestionIndex', 'savedAt']) {
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

const normalizeAttempts = (value) => cleanEntries(value, (list) => {
    if (!Array.isArray(list)) return null;
    const entries = list
        .map(normalizeAttempt)
        .filter(Boolean)
        .sort((a, b) => b.at - a.at)
        .slice(0, MAX_ATTEMPTS_PER_PAPER);
    return entries.length > 0 ? entries : null;
});

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

    return {
        version: LEARNING_DATA_VERSION,
        updatedAt: finiteNumber(source.updatedAt) ?? null,
        lessons: normalizeLessons(lessons),
        exams: normalizeExams(exams),
        // v1/v2 没有 attempts，缺省为空即可——旧数据里本来就没有成绩历史。
        attempts: normalizeAttempts(source.attempts),
        hardware: { esp32Ai: normalizeEsp32Ai(esp32Ai) },
        museum: { collected: normalizeCollection(collected) },
    };
}

const emitChange = (detail) => {
    if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return;
    window.dispatchEvent(new CustomEvent(LEARNING_DATA_EVENT, { detail }));
};

const writeCanonical = (data, reason = 'update') => {
    const storage = getStorage();
    if (!storage) return false;
    const normalized = normalizeLearningData(data);
    normalized.updatedAt = Date.now();
    try {
        storage.setItem(LEARNING_DATA_STORAGE_KEY, JSON.stringify(normalized));
        emitChange({ reason, data: normalized });
        return true;
    } catch {
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

export function readLearningData() {
    const storage = getStorage();
    if (!storage) return emptyLearningData();

    const canonical = parseJson(storage.getItem(LEARNING_DATA_STORAGE_KEY));
    if (isRecord(canonical)) {
        const normalized = normalizeLearningData(canonical);
        if (canonical.version !== LEARNING_DATA_VERSION) writeCanonical(normalized, 'migrate-version');
        return normalized;
    }

    try {
        const { data, migratedKeys } = collectLegacyData(storage);
        if (migratedKeys.length === 0) return data;
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
    return {
        schema: LEARNING_DATA_SCHEMA,
        version: LEARNING_DATA_VERSION,
        exportedAt: new Date().toISOString(),
        data,
    };
}

export function importLearningData(payload) {
    const parsed = typeof payload === 'string' ? parseJson(payload) : payload;
    if (!isRecord(parsed) || parsed.schema !== LEARNING_DATA_SCHEMA) {
        throw new Error('不是有效的 GESP 学习数据文件');
    }
    const version = Number(parsed.version);
    if (!Number.isInteger(version) || version < 1 || version > LEARNING_DATA_VERSION) {
        throw new Error(`不支持的学习数据版本：${parsed.version}`);
    }
    const normalized = normalizeLearningData({ ...parsed, version });
    if (!writeCanonical(normalized, 'import')) throw new Error('浏览器无法保存学习数据');
    return normalized;
}

export function resetLearningData() {
    const storage = getStorage();
    if (!storage) return false;
    try {
        storage.removeItem(LEARNING_DATA_STORAGE_KEY);
        storage.removeItem(LEGACY_KEYS.lessons);
        storage.removeItem(LEGACY_KEYS.esp32Ai);
        storage.removeItem(LEGACY_KEYS.museum);
        const examKeys = [];
        for (let index = 0; index < storage.length; index += 1) {
            const key = storage.key(index);
            if (key?.startsWith(LEGACY_KEYS.examPrefix)) examKeys.push(key);
        }
        examKeys.forEach((key) => storage.removeItem(key));
        emitChange({ reason: 'reset', data: emptyLearningData() });
        return true;
    } catch {
        return false;
    }
}

export function summarizeLearningData(data = readLearningData()) {
    const attemptLists = Object.values(data.attempts);
    return {
        lessons: Object.keys(data.lessons).length,
        masteredLessons: Object.values(data.lessons).filter((entry) => entry.status === 'mastered').length,
        examDrafts: Object.keys(data.exams).length,
        examAttempts: attemptLists.reduce((total, list) => total + list.length, 0),
        papersAttempted: attemptLists.length,
        hardwareLessons: data.hardware.esp32Ai?.viewed.length || 0,
        museumItems: data.museum.collected.length,
    };
}
