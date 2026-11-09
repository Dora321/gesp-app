import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
    assertLevelBarrier, barrierForPaper, inspectPaper, isPaperPassed, isPendingPaper,
    loadUserRulings, normalizeConcurrency, remainingSlots, selectDispatchablePaper,
} from '../lib/level-barrier.mjs';

const inventory = (...ids) => ids.map(id => ({ id }));
const entry = (status = 'verified') => ({ status });
const cleanEvidence = id => ({
    paperId: id, unresolved: [],
    questions: [{ id: 1, unresolved: [], blockedDimensions: [], dimensions: ['statement'] }],
});
const openEvidence = id => ({
    paperId: id,
    unresolved: [{ id: 1, dimensions: ['statement'], reasons: ['原卷仍有争议'] }],
    questions: [{ id: 1, unresolved: ['原卷仍有争议'], blockedDimensions: ['statement'] }],
});
const context = (ids, papers, evidence) => ({
    inventory: inventory(...ids), papers, evidenceFor: evidence,
});

test('L1 有 open-issues 时阻止 L2 派发、集成和发布', () => {
    const ids = ['2023-03-l1', '2023-06-l1', '2023-03-l2'];
    const papers = {
        '2023-03-l1': entry('verified'),
        '2023-06-l1': entry('reviewed-with-open-issues'),
        '2023-03-l2': entry('working'),
    };
    const evidence = {
        '2023-03-l1': cleanEvidence('2023-03-l1'),
        '2023-06-l1': openEvidence('2023-06-l1'),
        '2023-03-l2': cleanEvidence('2023-03-l2'),
    };
    const ctx = context(ids, papers, evidence);
    const barrier = barrierForPaper('2023-03-l2', ctx);
    assert.equal(barrier.ready, false);
    assert.deepEqual(barrier.blocked.map(item => item.id), ['2023-06-l1']);
    assert.equal(selectDispatchablePaper({
        pending: ['2023-03-l2'], active: [], concurrency: 3,
        papers, inventory: ctx.inventory, evidenceFor: evidence,
    }), null);
    for (let gate = 0; gate < 3; gate++) {
        assert.throws(() => assertLevelBarrier('2023-03-l2', ctx), error =>
            error.code === 'LEVEL_BARRIER' && error.targetId === '2023-03-l2'
            && error.blocked.some(item => item.id === '2023-06-l1'));
    }
});

test('L1 全 verified 后才允许 L2 派发、集成和发布', () => {
    const ids = ['2023-03-l1', '2023-06-l1', '2023-03-l2'];
    const papers = {
        '2023-03-l1': entry('verified'),
        '2023-06-l1': entry('verified'),
        '2023-03-l2': entry('retry-queued'),
    };
    const evidence = {
        '2023-03-l1': cleanEvidence('2023-03-l1'),
        '2023-06-l1': cleanEvidence('2023-06-l1'),
        '2023-03-l2': cleanEvidence('2023-03-l2'),
    };
    const ctx = context(ids, papers, evidence);
    assert.doesNotThrow(() => assertLevelBarrier('2023-03-l2', ctx));
    assert.equal(selectDispatchablePaper({
        pending: ['2023-03-l2'], active: [], concurrency: 3,
        papers, inventory: ctx.inventory, evidenceFor: evidence,
    }), '2023-03-l2');
    assert.equal(barrierForPaper('2023-03-l1', ctx).ready, true);
});

test('同级并发不超过 3', () => {
    const l2 = ['2023-03-l2', '2023-06-l2', '2023-09-l2', '2023-12-l2', '2024-03-l2'];
    const ids = ['2023-03-l1', ...l2];
    const papers = { '2023-03-l1': entry('verified') };
    const evidence = { '2023-03-l1': cleanEvidence('2023-03-l1') };
    const ctx = context(ids, papers, evidence);
    const pending = [...l2], active = [], dispatched = [];
    for (;;) {
        const id = selectDispatchablePaper({
            pending, active, concurrency: 10,
            papers, inventory: ctx.inventory, evidenceFor: evidence,
        });
        if (!id) break;
        dispatched.push(id);
        pending.splice(pending.indexOf(id), 1);
        active.push(id);
    }
    assert.deepEqual(dispatched, l2.slice(0, 3));
    assert.equal(normalizeConcurrency(10), 3);
    assert.equal(remainingSlots({ configured: 10, activeCount: 2, externalCount: 1 }), 0);
});

test('历史高等级已 verified 不能掩盖低级未决', () => {
    const ids = ['2023-03-l1', '2023-03-l2', '2023-03-l3', '2023-03-l4'];
    const papers = {
        '2023-03-l1': entry('reviewed-with-open-issues'),
        '2023-03-l2': entry('verified'),
        '2023-03-l3': entry('verified'),
        '2023-03-l4': entry('working'),
    };
    const evidence = {
        '2023-03-l1': openEvidence('2023-03-l1'),
        '2023-03-l2': cleanEvidence('2023-03-l2'),
        '2023-03-l3': cleanEvidence('2023-03-l3'),
        '2023-03-l4': cleanEvidence('2023-03-l4'),
    };
    const ctx = context(ids, papers, evidence);
    const barrier = barrierForPaper('2023-03-l4', ctx);
    assert.equal(barrier.ready, false);
    assert.deepEqual(barrier.blocked.map(item => item.id), ['2023-03-l1']);
    assert.equal(selectDispatchablePaper({
        pending: ['2023-03-l3', '2023-03-l4'], active: [], concurrency: 3,
        papers, inventory: ctx.inventory, evidenceFor: evidence,
    }), null);
});

test('reviewed-with-open-issues 保持终态，不进入 pending 空转', () => {
    assert.equal(isPendingPaper({ status: 'reviewed-with-open-issues' }), false);
    assert.equal(isPendingPaper({ status: 'verified' }), false);
    assert.equal(isPendingPaper({ status: 'waiting-coordinator' }), true);
    assert.equal(isPendingPaper({ status: 'retry-queued' }), true);
    const papers = {
        a: entry('verified'),
        b: entry('reviewed-with-open-issues'),
        c: entry('waiting-coordinator'),
    };
    assert.deepEqual(Object.keys(papers).filter(id => isPendingPaper(papers[id])), ['c']);
});

test('缺证据或正式证据 unresolved 非空时，即使 state=verified 也不能通过屏障', () => {
    const missing = inspectPaper('2023-03-l1', { entry: entry('verified'), evidence: undefined });
    assert.equal(missing.complete, false);
    assert.match(missing.problems.join('；'), /缺少正式证据/);
    const open = inspectPaper('2023-03-l1', { entry: entry('verified'), evidence: openEvidence('2023-03-l1') });
    assert.equal(open.complete, false);
    assert.match(open.problems.join('；'), /未决/);
    const working = inspectPaper('2023-03-l1', { entry: entry('working'), evidence: cleanEvidence('2023-03-l1') });
    assert.equal(working.complete, false);
    assert.match(working.problems.join('；'), /仍在处理中/);
});

test('无队列状态但正式证据干净时按已验证处理，显式非 verified 状态仍然阻塞', () => {
    const historical = inspectPaper('2023-03-l5', { entry: undefined, evidence: cleanEvidence('2023-03-l5') });
    assert.equal(historical.complete, true);
    assert.deepEqual(historical.problems, []);
    const waiting = inspectPaper('2023-03-l5', { entry: entry('waiting-coordinator'), evidence: cleanEvidence('2023-03-l5') });
    assert.equal(waiting.complete, false);
    assert.match(waiting.problems.join('；'), /等待协调者/);
});

const ruling = (paperId, questionId, dimensions) => ({
    paperId, questionId, dimensions, status: 'original-paper-dispute',
    decidedBy: 'user', decidedAt: '2026-11-09T18:55:00+08:00', countsAsPassed: false,
});
const twoDimensionEvidence = id => ({
    paperId: id,
    unresolved: [{ id: 1, dimensions: ['statement', 'options'], reasons: ['原卷仍有争议'] }],
    questions: [{ id: 1, unresolved: ['原卷仍有争议'], blockedDimensions: ['statement', 'options'] }],
});
const twoQuestionEvidence = id => ({
    paperId: id,
    unresolved: [
        { id: 1, dimensions: ['statement'], reasons: ['原卷仍有争议'] },
        { id: 2, dimensions: ['answer'], reasons: ['原卷仍有争议'] },
    ],
    questions: [
        { id: 1, unresolved: ['原卷仍有争议'], blockedDimensions: ['statement'] },
        { id: 2, unresolved: ['原卷仍有争议'], blockedDimensions: ['answer'] },
    ],
});
const stringOnlyUnresolvedEvidence = id => ({
    paperId: id,
    unresolved: ['整卷为历史占位数据（非正式真题），无官方来源可核对。'],
    questions: [{ id: 1, unresolved: [], blockedDimensions: [], dimensions: ['statement'] }],
});
const missingIdUnresolvedEvidence = id => ({
    paperId: id,
    unresolved: [{ dimensions: ['answer'], reasons: ['缺少题号的未决项'] }],
    questions: [{ id: 1, unresolved: [], blockedDimensions: [], dimensions: ['statement'] }],
});

test('用户裁定覆盖全部未决维度后收束 L1，放行 L2', () => {
    const ids = ['2023-03-l1', '2023-06-l1', '2023-03-l2'];
    const papers = {
        '2023-03-l1': entry('verified'),
        '2023-06-l1': entry('reviewed-with-open-issues'),
        '2023-03-l2': entry('working'),
    };
    const evidence = {
        '2023-03-l1': cleanEvidence('2023-03-l1'),
        '2023-06-l1': openEvidence('2023-06-l1'),
        '2023-03-l2': cleanEvidence('2023-03-l2'),
    };
    const rulings = [ruling('2023-06-l1', 1, ['statement'])];
    const ctx = { ...context(ids, papers, evidence), rulings };
    const closed = inspectPaper('2023-06-l1', {
        entry: papers['2023-06-l1'], evidence: evidence['2023-06-l1'], rulings,
    });
    assert.equal(closed.complete, true);
    assert.equal(closed.closedByRuling, true);
    assert.deepEqual(closed.disputes, [{ id: 1, dimensions: ['statement'] }]);
    assert.equal(barrierForPaper('2023-03-l2', ctx).ready, true);
    assert.equal(selectDispatchablePaper({
        pending: ['2023-03-l2'], active: [], concurrency: 3,
        papers, inventory: ctx.inventory, evidenceFor: evidence, rulings,
    }), '2023-03-l2');
});

test('部分覆盖仍然阻塞，并指出未被裁定覆盖的题目与维度', () => {
    const ids = ['2023-06-l1', '2023-03-l2'];
    const papers = {
        '2023-06-l1': entry('reviewed-with-open-issues'),
        '2023-03-l2': entry('working'),
    };
    const evidence = {
        '2023-06-l1': twoDimensionEvidence('2023-06-l1'),
        '2023-03-l2': cleanEvidence('2023-03-l2'),
    };
    const missingDimension = [ruling('2023-06-l1', 1, ['statement'])];
    const partialCtx = { ...context(ids, papers, evidence), rulings: missingDimension };
    const partial = barrierForPaper('2023-03-l2', partialCtx);
    assert.equal(partial.ready, false);
    assert.deepEqual(partial.blocked.map(item => item.id), ['2023-06-l1']);
    assert.match(partial.blocked[0].problems.join('；'), /第1题未决维度 options/);

    const twoQuestions = twoQuestionEvidence('2023-06-l1');
    const missingQuestion = [ruling('2023-06-l1', 1, ['statement'])];
    const missingCtx = {
        ...context(ids, papers, { ...evidence, '2023-06-l1': twoQuestions }),
        rulings: missingQuestion,
    };
    const missing = barrierForPaper('2023-03-l2', missingCtx);
    assert.equal(missing.ready, false);
    assert.deepEqual(missing.blocked.map(item => item.id), ['2023-06-l1']);
    assert.match(missing.blocked[0].problems.join('；'), /第2题未决维度 answer/);
});

test('不同 paperId 或 questionId 的裁定不生效', () => {
    const evidence = openEvidence('2023-06-l1');
    const papers = { '2023-06-l1': entry('reviewed-with-open-issues') };
    const wrongPaper = inspectPaper('2023-06-l1', {
        entry: papers['2023-06-l1'], evidence, rulings: [ruling('2023-03-l1', 1, ['statement'])],
    });
    assert.equal(wrongPaper.complete, false);
    assert.equal(wrongPaper.closedByRuling, undefined);
    assert.match(wrongPaper.problems.join('；'), /第1题未决维度 statement/);

    const wrongQuestion = inspectPaper('2023-06-l1', {
        entry: papers['2023-06-l1'], evidence, rulings: [ruling('2023-06-l1', 2, ['statement'])],
    });
    assert.equal(wrongQuestion.complete, false);
    assert.match(wrongQuestion.problems.join('；'), /第1题未决维度 statement/);
});

test('unresolved 仅含字符串项时不得由裁定收束，无裁定行为与原逻辑一致', () => {
    const id = '2023-03-l3';
    const papers = { [id]: entry('reviewed-with-open-issues') };
    const evidence = stringOnlyUnresolvedEvidence(id);

    for (const rulings of [undefined, []]) {
        const inspected = inspectPaper(id, { entry: papers[id], evidence, rulings });
        assert.equal(inspected.complete, false);
        assert.equal(inspected.closedByRuling, undefined);
        assert.match(inspected.problems.join('；'), /正式证据仍有 1 个未决问题/);
    }

    const rulings = [ruling(id, 1, ['statement'])];
    const inspected = inspectPaper(id, { entry: papers[id], evidence, rulings });
    assert.equal(inspected.complete, false);
    assert.equal(inspected.closedByRuling, undefined);
    assert.match(inspected.problems.join('；'), /无题号的未决项/);

    const barrier = barrierForPaper('2023-03-l4', {
        ...context([id, '2023-03-l4'], papers, { [id]: evidence }),
        rulings,
    });
    assert.equal(barrier.ready, false);
    assert.deepEqual(barrier.blocked.map(item => item.id), [id]);
});

test('unresolved 缺 id 项同样生成不可匹配的合成未覆盖 issue', () => {
    const id = '2023-03-l3';
    const papers = { [id]: entry('reviewed-with-open-issues') };
    const evidence = missingIdUnresolvedEvidence(id);

    const withoutRulings = inspectPaper(id, { entry: papers[id], evidence, rulings: [] });
    assert.equal(withoutRulings.complete, false);
    assert.equal(withoutRulings.closedByRuling, undefined);
    assert.match(withoutRulings.problems.join('；'), /正式证据仍有 1 个未决问题/);

    const withRulings = inspectPaper(id, {
        entry: papers[id], evidence, rulings: [ruling(id, 1, ['statement'])],
    });
    assert.equal(withRulings.complete, false);
    assert.equal(withRulings.closedByRuling, undefined);
    assert.match(withRulings.problems.join('；'), /无题号的未决项/);
});

test('裁定收束的争议卷永不算通过，状态也不被改写', () => {
    const id = '2023-06-l1';
    const papers = { [id]: entry('reviewed-with-open-issues') };
    const evidence = openEvidence(id);
    const rulings = [ruling(id, 1, ['statement'])];
    const closed = inspectPaper(id, { entry: papers[id], evidence, rulings });
    assert.equal(closed.closedByRuling, true);
    assert.equal(isPaperPassed(papers[id], evidence), false);
    assert.equal(isPaperPassed(entry('verified'), cleanEvidence(id)), true);
    assert.equal(isPaperPassed(entry('verified'), openEvidence(id)), false);
    assert.equal(isPendingPaper(papers[id]), false);
    assert.equal(papers[id].status, 'reviewed-with-open-issues');
    assert.equal(closed.status, 'reviewed-with-open-issues');
});

test('loadUserRulings 拒绝 countsAsPassed 或 decidedBy 非法的条目', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'user-rulings-'));
    const file = path.join(dir, 'user-rulings.json');
    try {
        const valid = ruling('2023-03-l1', 27, ['statement']);
        fs.writeFileSync(file, JSON.stringify({ version: 1, rulings: [valid] }));
        assert.deepEqual(loadUserRulings(file), [valid]);
        assert.deepEqual(loadUserRulings(path.join(dir, 'missing.json')), []);

        fs.writeFileSync(file, JSON.stringify({ version: 1, rulings: [{ ...valid, countsAsPassed: true }] }));
        assert.throws(() => loadUserRulings(file), /countsAsPassed/);

        fs.writeFileSync(file, JSON.stringify({ version: 1, rulings: [{ ...valid, decidedBy: 'model' }] }));
        assert.throws(() => loadUserRulings(file), /decidedBy/);
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
});

test('真实用户裁定与 L1 证据收束全部五卷并放行 L2', () => {
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
    const docs = path.join(root, 'docs/question-bank-verification');
    const rulings = loadUserRulings(path.join(docs, 'user-rulings.json'));
    const ids = ['2023-03-l1', '2023-06-l1', '2023-09-l1', '2025-12-l1', '2026-03-l1'];
    const papers = Object.fromEntries(ids.map(id => [id, entry('reviewed-with-open-issues')]));
    const evidence = Object.fromEntries(ids.map(id => [
        id, JSON.parse(fs.readFileSync(path.join(docs, `${id}.json`), 'utf8')),
    ]));
    for (const id of ids) {
        const inspected = inspectPaper(id, { entry: papers[id], evidence: evidence[id], rulings });
        assert.equal(inspected.complete, true, id);
        assert.equal(inspected.closedByRuling, true, id);
        assert.equal(isPaperPassed(papers[id], evidence[id]), false, id);
        assert.equal(papers[id].status, 'reviewed-with-open-issues', id);
    }
    const barrier = barrierForPaper('2023-03-l2', {
        inventory: [...ids, '2023-03-l2'].map(id => ({ id })),
        papers, evidenceFor: evidence, rulings,
    });
    assert.equal(barrier.ready, true);
    assert.deepEqual(barrier.blocked, []);
});
