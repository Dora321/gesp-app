import test from 'node:test';
import assert from 'node:assert/strict';
import {
    assertLevelBarrier, barrierForPaper, inspectPaper, isPendingPaper,
    normalizeConcurrency, remainingSlots, selectDispatchablePaper,
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
