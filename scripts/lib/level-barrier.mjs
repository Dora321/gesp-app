// 全 inventory 的等级屏障：低等级没有全部 verified 时，禁止高等级派发、集成和发布。
// 这里只回答“能否进入下一等级”，不修改题目内容，也不替模型裁决。
import fs from 'node:fs';

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

function rulingKey(paperId, questionId) {
    return `${paperId}\u0000${String(questionId)}`;
}

// 用户裁定只用于等级收束，永远不代表题目通过。
export function loadUserRulings(file) {
    if (!file || !fs.existsSync(file)) return [];
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    const rulings = Array.isArray(data) ? data : data?.rulings;
    if (!Array.isArray(rulings)) throw new Error(`用户裁定文件缺少 rulings 数组：${file}`);
    for (const [index, ruling] of rulings.entries()) {
        const label = `用户裁定第 ${index + 1} 条`;
        if (!ruling || typeof ruling !== 'object') throw new Error(`${label}不是对象`);
        if (typeof ruling.paperId !== 'string' || !ruling.paperId) throw new Error(`${label}缺少 paperId`);
        if (ruling.questionId === undefined || ruling.questionId === null || ruling.questionId === '') {
            throw new Error(`${label}缺少 questionId`);
        }
        if (!Array.isArray(ruling.dimensions) || ruling.dimensions.some(dimension => typeof dimension !== 'string')) {
            throw new Error(`${label}缺少 dimensions 数组`);
        }
        if (ruling.status !== 'original-paper-dispute') throw new Error(`${label} status 必须是 original-paper-dispute`);
        if (ruling.decidedBy !== 'user') throw new Error(`${label} decidedBy 必须是 user`);
        if (ruling.countsAsPassed !== false) throw new Error(`${label} countsAsPassed 必须是 false`);
    }
    return rulings;
}

export function rulingIndex(rulings) {
    const index = new Map();
    for (const ruling of rulings || []) {
        const key = rulingKey(ruling?.paperId, ruling?.questionId);
        const existing = index.get(key);
        if (!existing) {
            index.set(key, ruling);
            continue;
        }
        index.set(key, {
            ...existing,
            dimensions: [...new Set([...(existing.dimensions || []), ...(ruling.dimensions || [])])],
        });
    }
    return index;
}

function openIssueList(evidence) {
    const issues = new Map();
    const add = (questionId, dimensions, { synthetic = false } = {}) => {
        if (questionId === undefined || questionId === null || questionId === '') return;
        const key = `${synthetic ? 'synthetic' : 'question'}\u0000${String(questionId)}`;
        const issue = issues.get(key) || { id: questionId, dimensions: [], synthetic };
        for (const dimension of Array.isArray(dimensions) ? dimensions : []) {
            if (!issue.dimensions.includes(dimension)) issue.dimensions.push(dimension);
        }
        issues.set(key, issue);
    };
    for (const [index, item] of (Array.isArray(evidence?.unresolved) ? evidence.unresolved : []).entries()) {
        if (item && typeof item === 'object'
            && item.id !== undefined && item.id !== null && item.id !== '') {
            add(item.id, item.dimensions);
            continue;
        }
        // 字符串项或缺少 id 的未决项没有题号，任何用户裁定都不可能匹配。
        // 生成合成 issue 并标记为 synthetic，确保它始终留在未覆盖列表里，而不是被静默丢弃。
        add(`unresolved#${index + 1}`, item && typeof item === 'object' ? item.dimensions : [], { synthetic: true });
    }
    for (const question of Array.isArray(evidence?.questions) ? evidence.questions : []) {
        if (Array.isArray(question?.blockedDimensions) && question.blockedDimensions.length > 0) {
            add(question.id, question.blockedDimensions);
        }
    }
    return [...issues.values()];
}

function uncoveredIssueDetails(id, evidence, rulings) {
    if (!evidence) return [];
    const index = rulingIndex(rulings);
    return openIssueList(evidence).map(issue => {
        const ruling = issue.synthetic ? undefined : index.get(rulingKey(id, issue.id));
        const covered = new Set(ruling?.dimensions || []);
        return {
            id: issue.id,
            dimensions: [...issue.dimensions],
            synthetic: issue.synthetic === true,
            uncoveredDimensions: issue.dimensions.filter(dimension => !covered.has(dimension)),
        };
    }).filter(issue => issue.synthetic
        || !index.has(rulingKey(id, issue.id))
        || issue.uncoveredDimensions.length > 0);
}

export function uncoveredOpenIssues(id, evidence, rulings) {
    return uncoveredIssueDetails(id, evidence, rulings)
        .map(issue => ({ id: issue.id, dimensions: [...issue.dimensions] }));
}

export function isPaperPassed(entry, evidence) {
    return entry?.status === 'verified'
        && Array.isArray(evidence?.unresolved)
        && evidence.unresolved.length === 0;
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

export function inspectPaper(id, { entry = {}, evidence, rulings } = {}) {
    const level = paperLevel(id);
    const recordedStatus = entry?.status;
    const status = recordedStatus || 'not-recorded';
    const evidenceComplete = evidence?.paperId === id
        && Array.isArray(evidence.questions) && evidence.questions.length > 0
        && Array.isArray(evidence.unresolved) && evidence.unresolved.length > 0;
    const uncovered = evidenceComplete && recordedStatus === 'reviewed-with-open-issues'
        ? uncoveredIssueDetails(id, evidence, rulings)
        : [];
    const disputes = evidenceComplete
        ? openIssueList(evidence).map(issue => ({ id: issue.id, dimensions: [...issue.dimensions] }))
        : [];
    // 原卷争议经用户逐题逐维度裁定后，仅收束所在等级，不改写题目通过状态。
    // 必须至少有一条匹配的裁定；没有未决项或仅有合成 issue 时不得凭空收束。
    if (recordedStatus === 'reviewed-with-open-issues' && evidenceComplete
        && uncovered.length === 0 && disputes.length > 0) {
        return {
            id, level, status, complete: true, closedByRuling: true, disputes,
        };
    }
    const problems = [];
    // 队列没有状态记录时以正式证据为准（历史独立交付的卷不会永久卡住后续等级）；
    // 只要状态显式存在且不是 verified，就仍然阻塞。
    if (recordedStatus && recordedStatus !== 'verified') {
        const reason = statusReason(recordedStatus);
        if (reason) problems.push(reason);
    }
    if (recordedStatus === 'reviewed-with-open-issues' && evidenceComplete
        && Array.isArray(rulings) && rulings.length > 0 && uncovered.length > 0) {
        for (const issue of uncovered) {
            if (issue.synthetic) {
                problems.push('正式证据存在无题号的未决项，无法由用户裁定覆盖');
                continue;
            }
            const dimensions = issue.uncoveredDimensions.length ? issue.uncoveredDimensions : issue.dimensions;
            problems.push(`第${issue.id}题未决维度 ${dimensions.join('、') || '未标注'} 未被用户裁定覆盖`);
        }
    }
    problems.push(...evidenceProblems(id, evidence));
    return { id, level, status, complete: problems.length === 0, problems: [...new Set(problems)] };
}

export function evaluateLevelBarrier({ inventory, papers = {}, evidenceFor, level, rulings }) {
    const targetLevel = Number(level);
    if (!Number.isInteger(targetLevel) || targetLevel < 1 || targetLevel > 8) throw new Error(`非法试卷等级：${level}`);
    const ids = [...new Set((inventory || []).map(item => typeof item === 'string' ? item : item?.id).filter(Boolean))];
    const lowerIds = ids.filter(id => paperLevel(id) < targetLevel)
        .sort((a, b) => paperLevel(a) - paperLevel(b) || a.localeCompare(b));
    const checked = lowerIds.map(id => inspectPaper(id, {
        entry: papers[id], evidence: lookupEvidence(evidenceFor, id), rulings,
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
    papers = {}, inventory = [], evidenceFor, rulings,
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
        const barrier = barrierForPaper(id, { inventory, papers, evidenceFor, rulings });
        if (!barrier.ready) continue;
        return id;
    }
    return null;
}
