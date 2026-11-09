// 全 inventory 的等级屏障：低等级没有全部 verified 时，禁止高等级派发、集成和发布。
// 这里只回答“能否进入下一等级”，不修改题目内容，也不替模型裁决。

export const maxLevelConcurrency = 3;
export const terminalStatuses = new Set(['verified', 'reviewed-with-open-issues']);

const statusReasons = {
    'not-started': '尚未开始审校',
    working: '仍在处理中',
    'retry-queued': '等待队尾重试',
    'integration-blocked': '集成或发布被阻断，等待协调者',
    'account-blocked': '模型账号或 Go 来源需要协调者处理',
    'model-request-blocked': '模型请求重试耗尽，等待协调者',
    'waiting-coordinator': '等待协调者裁定',
    'reviewed-with-open-issues': '审校完成但仍有未决问题',
};

export function paperLevel(id) {
    const match = /-l([1-8])$/.exec(String(id));
    if (!match) throw new Error(`无法识别试卷等级：${id}`);
    return Number(match[1]);
}

export function isPendingPaper(entry) {
    return !terminalStatuses.has(entry?.status || '');
}

export function statusReason(status) {
    if (status === 'verified') return null;
    if (statusReasons[status]) return statusReasons[status];
    return /blocked/.test(status || '') ? `状态 ${status} 需要协调者` : `状态 ${status || '未记录'} 尚未达到 verified`;
}

function lookupEvidence(source, id) {
    if (!source) return undefined;
    return typeof source === 'function' ? source(id) : source[id];
}

export function evidenceProblems(id, evidence) {
    if (!evidence) return ['缺少正式证据文件'];
    const problems = [];
    if (evidence.paperId !== id) problems.push(`正式证据 paperId 不属于 ${id}`);
    if (!Array.isArray(evidence.questions) || evidence.questions.length === 0) {
        problems.push('正式证据缺少逐题结论');
    }
    if (!Array.isArray(evidence.unresolved)) {
        problems.push('正式证据缺少 unresolved 未决列表');
    } else if (evidence.unresolved.length > 0) {
        problems.push(`正式证据仍有 ${evidence.unresolved.length} 个未决问题`);
    }
    if (Array.isArray(evidence.questions)) {
        const openQuestions = evidence.questions.filter(question =>
            (Array.isArray(question?.unresolved) && question.unresolved.length > 0)
            || (Array.isArray(question?.blockedDimensions) && question.blockedDimensions.length > 0));
        if (openQuestions.length > 0 && !(Array.isArray(evidence.unresolved) && evidence.unresolved.length > 0)) {
            problems.push(`逐题证据仍有 ${openQuestions.length} 道题未决`);
        }
    }
    return [...new Set(problems)];
}

export function inspectPaper(id, { entry = {}, evidence } = {}) {
    const level = paperLevel(id);
    const recordedStatus = entry?.status;
    const status = recordedStatus || 'not-recorded';
    const problems = [];
    // 队列没有状态记录时以正式证据为准（历史独立交付的卷不会永久卡住后续等级）；
    // 只要状态显式存在且不是 verified，就仍然阻塞。
    if (recordedStatus && recordedStatus !== 'verified') {
        const reason = statusReason(recordedStatus);
        if (reason) problems.push(reason);
    }
    problems.push(...evidenceProblems(id, evidence));
    return { id, level, status, complete: problems.length === 0, problems };
}

export function evaluateLevelBarrier({ inventory, papers = {}, evidenceFor, level }) {
    const targetLevel = Number(level);
    if (!Number.isInteger(targetLevel) || targetLevel < 1 || targetLevel > 8) throw new Error(`非法试卷等级：${level}`);
    const ids = [...new Set((inventory || []).map(item => typeof item === 'string' ? item : item?.id).filter(Boolean))];
    const lowerIds = ids.filter(id => paperLevel(id) < targetLevel)
        .sort((a, b) => paperLevel(a) - paperLevel(b) || a.localeCompare(b));
    const checked = lowerIds.map(id => inspectPaper(id, {
        entry: papers[id], evidence: lookupEvidence(evidenceFor, id),
    }));
    const blocked = checked.filter(item => !item.complete);
    return { level: targetLevel, ready: blocked.length === 0, checked, blocked };
}

export function barrierForPaper(id, context) {
    return evaluateLevelBarrier({ ...context, level: paperLevel(id) });
}

export class LevelBarrierError extends Error {
    constructor(targetId, barrier) {
        const detail = barrier.blocked.map(item => `${item.id}(${item.problems[0] || item.status})`).join('、');
        super(`等级屏障未通过：${targetId} 为 L${barrier.level}，更低等级仍有未完成试卷：${detail}`);
        this.name = 'LevelBarrierError';
        this.code = 'LEVEL_BARRIER';
        this.targetId = targetId;
        this.level = barrier.level;
        this.blocked = barrier.blocked;
        this.barrier = barrier;
    }
}

export function assertLevelBarrier(id, context) {
    const barrier = barrierForPaper(id, context);
    if (!barrier.ready) throw new LevelBarrierError(id, barrier);
    return barrier;
}

export function normalizeConcurrency(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return maxLevelConcurrency;
    return Math.min(maxLevelConcurrency, Math.max(1, Math.floor(number)));
}

export function remainingSlots({ configured = maxLevelConcurrency, activeCount = 0, externalCount = 0 } = {}) {
    return Math.max(0, normalizeConcurrency(configured) - Math.max(0, activeCount) - Math.max(0, externalCount));
}

// 队列选择器：同时满足全等级屏障、外部 worker 避让、全场 ≤3、同级 ≤3。
export function selectDispatchablePaper({
    pending = [], active = [], runningExternal = [], concurrency = maxLevelConcurrency,
    papers = {}, inventory = [], evidenceFor,
} = {}) {
    if (remainingSlots({ configured: concurrency, activeCount: active.length, externalCount: runningExternal.length }) <= 0) return null;
    const externalIds = new Set(runningExternal.flatMap(worker => Array.isArray(worker?.ids) ? worker.ids : []));
    const levelCounts = new Map();
    const count = id => {
        try {
            const level = paperLevel(id);
            levelCounts.set(level, (levelCounts.get(level) || 0) + 1);
        } catch { /* 非试卷 ID 不参与同级计数 */ }
    };
    active.forEach(count);
    for (const worker of runningExternal) for (const id of worker?.ids || []) count(id);
    for (const id of pending) {
        if (active.includes(id) || externalIds.has(id)) continue;
        if ((levelCounts.get(paperLevel(id)) || 0) >= maxLevelConcurrency) continue;
        const barrier = barrierForPaper(id, { inventory, papers, evidenceFor });
        if (!barrier.ready) continue;
        return id;
    }
    return null;
}
