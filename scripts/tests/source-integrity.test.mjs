import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { scoreExam } from '../../src/utils/examScoring.js';
import { recordExamAttempt, readPaperAttempts } from '../../src/utils/examHistory.js';
import {
    DEFECT_KINDS,
    hasSourceDefect,
    integrityNoticeTiming,
    isHiddenFromMockExam,
    isScoringExcluded,
    isTrustedForPractice,
    scoringSummary,
} from '../../src/utils/sourceIntegrity.js';
import { loadLevelTopics } from '../../src/data/gesp/topics.js';
import { barrierForPaper, inspectPaper, isPaperPassed, loadUserRulings } from '../../scripts/lib/level-barrier.mjs';
import os from 'node:os';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const docs = path.join(root, 'docs/question-bank-verification');

function installStorage() {
    const data = new Map();
    globalThis.localStorage = {
        getItem: (key) => (data.has(key) ? data.get(key) : null),
        setItem: (key, value) => data.set(key, String(value)),
        removeItem: (key) => data.delete(key),
    };
    globalThis.window = globalThis.window || globalThis;
}

// ─── 判定函数：原卷缺陷与计分解耦 ─────────────────────────────────────

test('legacy sourceIntegrity flags keep meaning "excluded from scoring"', () => {
    const legacy = { id: 1, type: 'single', answer: 0, score: 2, sourceIntegrity: 'answer-key-conflict' };
    assert.equal(hasSourceDefect(legacy), true);
    assert.equal(isScoringExcluded(legacy), true);
    assert.equal(isHiddenFromMockExam(legacy), false, 'legacy flagged questions stay on the mock paper (unscored)');
    assert.equal(integrityNoticeTiming(legacy), 'legacy');
    assert.equal(isTrustedForPractice(legacy), false);
});

test('examScoring decouples "paper has a defect" from "question is scored"', () => {
    const t1 = { sourceIntegrity: 'official-source-defect', defectKind: 'out-of-scope', examScoring: 'counted' };
    assert.equal(hasSourceDefect(t1), true);
    assert.equal(isScoringExcluded(t1), false);
    assert.equal(isHiddenFromMockExam(t1), false);
    assert.equal(isTrustedForPractice(t1), true);
    assert.equal(integrityNoticeTiming(t1), 'after');
    assert.match(scoringSummary(t1), /正常计分/);

    const t2 = { sourceIntegrity: 'official-source-defect', defectKind: 'multi-answer', examScoring: 'excluded' };
    assert.equal(isScoringExcluded(t2), true);
    assert.equal(isHiddenFromMockExam(t2), true);
    assert.equal(isTrustedForPractice(t2), false);
    assert.match(scoringSummary(t2), /多解.*不计分/);

    for (const kind of DEFECT_KINDS) assert.ok(scoringSummary({ sourceIntegrity: 'official-source-defect', defectKind: kind, examScoring: 'excluded' }));
});

test('sourceIntegrity "ok" and unflagged questions behave as clean questions', () => {
    for (const clean of [{ id: 1 }, { id: 2, sourceIntegrity: 'ok' }, { id: 3, sourceIntegrity: 'ok', examScoring: 'counted' }]) {
        assert.equal(hasSourceDefect(clean), false);
        assert.equal(isScoringExcluded(clean), false);
        assert.equal(isHiddenFromMockExam(clean), false);
        assert.equal(integrityNoticeTiming(clean), 'none');
    }
});

// ─── 计分、交卷记录、考点练习 ────────────────────────────────────────────

const t1 = { id: 4, type: 'single', answer: 1, score: 2, sourceIntegrity: 'official-source-defect', defectKind: 'out-of-scope', examScoring: 'counted' };
const t2 = { id: 5, type: 'single', answer: 0, score: 2, sourceIntegrity: 'official-source-defect', defectKind: 'multi-answer', examScoring: 'excluded' };
const legacy = { id: 6, type: 'single', answer: 0, score: 2, sourceIntegrity: 'missing-code' };
const clean = { id: 1, type: 'single', answer: 0, score: 2 };

test('exam scoring counts counted-defect questions and skips excluded and legacy flagged ones', () => {
    const result = scoreExam([clean, t1, t2, legacy], { 1: 0, 4: 1, 5: 0, 6: 0 });
    assert.equal(result.objectiveScore, 4);
    assert.equal(result.objectiveScoreTotal, 4);
    assert.equal(result.objectiveCorrectCount, 2);
    assert.equal(result.excludedObjectiveCount, 2);

    const wrong = scoreExam([clean, t1], { 1: 0, 4: 0 });
    assert.equal(wrong.objectiveWrongCount, 1, 'a wrong answer on a counted-defect question is a real wrong answer');
});

test('exam attempts record counted-defect questions in score and wrong-answer book, not excluded ones', () => {
    installStorage();
    const attempt = recordExamAttempt('2024-09-l2', { questions: [clean, t1, t2, legacy], answers: { 1: 0, 4: 0, 5: 1, 6: 1 } });
    assert.equal(attempt.total, 4);
    assert.equal(attempt.score, 2);
    assert.deepEqual(attempt.wrongIds, [4]);
    assert.equal(attempt.excluded, 2);
    assert.equal(readPaperAttempts('2024-09-l2').length, 1);
});

test('topic practice treats counted-defect questions as trusted and excluded ones as pending', async () => {
    const trusted = await loadLevelTopics(2);
    const withPending = await loadLevelTopics(2, { includePending: true });
    const trustedQuestions = [...trusted.tagMap.values()].flat();
    assert.ok(trustedQuestions.every((q) => !isScoringExcluded(q)));
    const key = (q) => `${q.sourcePaperId}:${q.id}`;
    const trustedKeys = new Set(trustedQuestions.map(key));
    // T1：原卷有瑕疵但计分——默认进入考点练习池。
    assert.ok(
        [...withPending.tagMap.values()].flat().some((q) => key(q) === '2024-09-l2:14') === trustedKeys.has('2024-09-l2:14'),
        'T1 question is part of the default pool whenever it has a topic tag',
    );
    assert.equal(trustedKeys.has('2024-09-l2:13'), false, 'T2 multi-answer question stays out of the default pool');
    assert.equal(trustedKeys.has('2025-09-l2:19'), false, 'T3 question stays out of the default pool');
});

// ─── 22 题裁定落地守卫 ────────────────────────────────────────────────

const GUARD = [{"n": 1, "paperId": "2023-03-l1", "id": 27, "answer": null, "stemHash": null}, {"n": 2, "paperId": "2023-06-l1", "id": 8, "answer": 2, "stemHash": null}, {"n": 3, "paperId": "2023-09-l1", "id": 12, "answer": 1, "stemHash": null}, {"n": 4, "paperId": "2023-09-l1", "id": 13, "answer": 3, "stemHash": null}, {"n": 5, "paperId": "2025-12-l1", "id": 7, "answer": 2, "stemHash": null}, {"n": 6, "paperId": "2026-03-l1", "id": 7, "answer": 1, "stemHash": "96db54b0a6824239"}, {"n": 7, "paperId": "2026-03-l1", "id": 15, "answer": 0, "stemHash": "5369c2f8ceb6879f"}, {"n": 8, "paperId": "2023-09-l2", "id": 14, "answer": 0, "stemHash": null}, {"n": 9, "paperId": "2023-12-l2", "id": 12, "answer": 3, "stemHash": null}, {"n": 10, "paperId": "2024-03-l2", "id": 26, "answer": null, "stemHash": null}, {"n": 11, "paperId": "2024-06-l2", "id": 24, "answer": 0, "stemHash": null}, {"n": 12, "paperId": "2024-09-l2", "id": 13, "answer": 0, "stemHash": "a83cae7569006c92"}, {"n": 13, "paperId": "2024-09-l2", "id": 14, "answer": 1, "stemHash": "cabbfabea980e5e5"}, {"n": 14, "paperId": "2024-12-l2", "id": 11, "answer": 0, "stemHash": "e1c0b44a1f7fcf5d"}, {"n": 15, "paperId": "2025-03-l2", "id": 10, "answer": 1, "stemHash": "9b18b23a3746fa1a"}, {"n": 16, "paperId": "2025-03-l2", "id": 27, "answer": null, "stemHash": "5914c5715356415a"}, {"n": 17, "paperId": "2025-06-l2", "id": 5, "answer": 3, "stemHash": "2dfb367ecddda7eb"}, {"n": 18, "paperId": "2025-06-l2", "id": 15, "answer": 0, "stemHash": "205997c601ed5703"}, {"n": 19, "paperId": "2025-09-l2", "id": 6, "answer": 0, "stemHash": "7967014c0ca2e69b"}, {"n": 20, "paperId": "2025-09-l2", "id": 15, "answer": 3, "stemHash": "4fbf47754af626ac"}, {"n": 21, "paperId": "2025-09-l2", "id": 19, "answer": 0, "stemHash": "822bc6910cdc2346"}, {"n": 22, "paperId": "2026-06-l2", "id": 11, "answer": 0, "stemHash": "6bf81ee21adb205d"}];

// 终稿编号 → 期望状态。kind=null 表示不带缺陷标记（按原卷改回/加注后正常计分）。
const EXPECTED = {
    '2023-03-l1:27': { scoring: 'counted', kind: null },
    '2023-06-l1:8': { scoring: 'counted', kind: null },
    '2023-09-l1:12': { scoring: 'counted', kind: null },
    '2023-09-l1:13': { scoring: 'counted', kind: null },
    '2025-12-l1:7': { scoring: 'counted', kind: null },
    '2026-03-l1:7': { scoring: 'excluded', kind: 'multi-answer' },
    '2026-03-l1:15': { scoring: 'counted', kind: null },
    '2023-09-l2:14': { scoring: 'counted', kind: null },
    '2023-12-l2:12': { scoring: 'counted', kind: null },
    '2024-03-l2:26': { scoring: 'counted', kind: null },
    '2024-06-l2:24': { scoring: 'counted', kind: null },
    '2024-09-l2:13': { scoring: 'excluded', kind: 'multi-answer' },
    '2024-09-l2:14': { scoring: 'counted', kind: 'out-of-scope' },
    '2024-12-l2:11': { scoring: 'excluded', kind: 'multi-answer' },
    '2025-03-l2:10': { scoring: 'counted', kind: null },
    '2025-03-l2:27': { scoring: 'excluded', kind: 'self-contradictory' },
    '2025-06-l2:5': { scoring: 'excluded', kind: 'ub' },
    '2025-06-l2:15': { scoring: 'counted', kind: 'out-of-scope' },
    '2025-09-l2:6': { scoring: 'excluded', kind: 'self-contradictory' },
    '2025-09-l2:15': { scoring: 'counted', kind: 'out-of-scope' },
    '2025-09-l2:19': { scoring: 'excluded', kind: 'non-compilable' },
    '2026-06-l2:11': { scoring: 'counted', kind: null },
};

async function loadQuestion(paperId, id) {
    const level = paperId.slice(-1);
    const { paperData } = await import(path.join(root, `src/data/gesp/level${level}/${paperId}.js`));
    const all = [...(paperData.questions || []), ...(paperData.programmingQuestions || []), ...(paperData.codingQuestions || [])];
    return all.find((q) => q.id === id);
}

const digest = (value) => crypto.createHash('sha256').update(value).digest('hex').slice(0, 16);
const stemOf = (q) => (q.type === 'programming'
    ? JSON.stringify([q.question, q.samples, q.referenceCode, q.template])
    : JSON.stringify([q.question, q.options]));

test('user rulings: 22 questions have the agreed scoring口径 (12 corrected + 3 annotated T1 counted, 7 excluded)', async () => {
    let counted = 0;
    let excluded = 0;
    for (const item of GUARD) {
        const key = `${item.paperId}:${item.id}`;
        const expected = EXPECTED[key];
        assert.ok(expected, `${key} missing from EXPECTED`);
        const q = await loadQuestion(item.paperId, item.id);
        assert.ok(q, `${key} not found`);
        assert.equal(isScoringExcluded(q), expected.scoring === 'excluded', `${key} scoring`);
        if (expected.kind === null) {
            assert.equal(q.sourceIntegrity, undefined, `${key} must not carry a defect flag`);
            assert.equal(q.defectKind, undefined, `${key} defectKind`);
        } else {
            assert.equal(q.sourceIntegrity, 'official-source-defect', `${key} sourceIntegrity`);
            assert.equal(q.defectKind, expected.kind, `${key} defectKind`);
            assert.equal(q.examScoring, expected.scoring, `${key} examScoring`);
            assert.ok(String(q.integrityNote || '').trim(), `${key} integrityNote`);
            assert.doesNotMatch(q.integrityNote, /停止计分/, `${key} note must not use the stale "停止计分" wording`);
        }
        if (item.answer !== null) assert.equal(q.answer, item.answer, `${key} answer must not change`);
        if (expected.scoring === 'excluded') excluded += 1; else counted += 1;
    }
    assert.equal(GUARD.length, 22);
    assert.equal(counted, 15);
    assert.equal(excluded, 7);
});

test('user rulings: defect questions and the two annotation-only questions keep their stems byte-for-byte', async () => {
    const guarded = GUARD.filter((item) => item.stemHash);
    assert.equal(guarded.length, 13);
    for (const item of guarded) {
        const q = await loadQuestion(item.paperId, item.id);
        assert.equal(digest(stemOf(q)), item.stemHash, `${item.paperId}#${item.id} stem/options/code were modified`);
    }
});

test('user rulings: explanations carry the agreed content', async () => {
    const q7 = await loadQuestion('2026-03-l1', 7);
    assert.match(q7.explanation, /A 同样成立|A 也恒为真/);
    assert.doesNotMatch(q7.explanation, /输入\s*`?-10`?\s*和\s*`?-10`?[^。]*(错误|不"?大于)/, 'must not use the invalid -10/-10 counter-example as a refutation');

    const q15 = await loadQuestion('2026-03-l1', 15);
    assert.match(q15.explanation, /原卷提示[\s\S]*从个位/);

    const q11 = await loadQuestion('2024-12-l2', 11);
    assert.doesNotMatch(q11.explanation, /笔误遗漏/);
    assert.match(q11.explanation, /print/);

    const q10 = await loadQuestion('2025-03-l2', 10);
    assert.match(q10.explanation, /原卷提示[\s\S]*不包含 N/);

    const q22 = await loadQuestion('2026-06-l2', 11);
    assert.match(q22.explanation, /num=10/);
    assert.match(q22.explanation, /else/);

    const q26 = await loadQuestion('2024-03-l2', 26);
    assert.match(q26.question, /保证 \$n \\+leq 50\$，\$a \\+leq 100\$/);
    assert.match(q26.question, /特别提醒/);
    assert.match(q26.question, /最近刚刚学习了乘法/);
    assert.match(q26.referenceCode, /product \* a > 1000000/);
    assert.doesNotMatch(q26.explanation, /读完剩余/);

    const q27 = await loadQuestion('2023-03-l1', 27);
    assert.doesNotMatch(q27.question, /2000/);
    const q24 = await loadQuestion('2024-06-l2', 24);
    assert.match(q24.question, /int N,Sum = 0;/);
    assert.match(q24.question, /cout << Sum;/);
    const q5 = await loadQuestion('2025-12-l1', 7);
    assert.match(q5.question, /int\(N\+M\)/);
});

test('user rulings: T1 defect questions keep their counted status and say so in the note', async () => {
    for (const [paperId, id] of [['2024-09-l2', 14], ['2025-06-l2', 15], ['2025-09-l2', 15]]) {
        const q = await loadQuestion(paperId, id);
        assert.equal(q.examScoring, 'counted');
        assert.match(q.integrityNote, /正常计分/);
        assert.match(q.explanation, /正常计分/);
    }
});

// ─── 用户裁定记录与队列门禁 ──────────────────────────────────────────────

test('user-rulings.json records all 22 adjudications consistent with the question data', async () => {
    const rulings = loadUserRulings(path.join(docs, 'user-rulings.json'));
    assert.equal(rulings.length, 22);
    for (const ruling of rulings) {
        assert.equal(ruling.status, 'user-adjudicated');
        assert.equal(ruling.countsAsPassed, false);
        assert.match(ruling.decidedAt, /^2026-11-11T.*\+08:00$/);
        const q = await loadQuestion(ruling.paperId, ruling.questionId);
        assert.equal(ruling.examScoring, isScoringExcluded(q) ? 'excluded' : 'counted', `${ruling.paperId}#${ruling.questionId}`);
        assert.equal(ruling.defectKind, q.defectKind, `${ruling.paperId}#${ruling.questionId} defectKind`);
    }
});

test('real user rulings close every open L1 and L2 paper and release L3, without marking anything passed', () => {
    const rulings = loadUserRulings(path.join(docs, 'user-rulings.json'));
    const l1 = ['2023-03-l1', '2023-06-l1', '2023-09-l1', '2025-12-l1', '2026-03-l1'];
    const l2 = ['2023-09-l2', '2023-12-l2', '2024-03-l2', '2024-06-l2', '2024-09-l2', '2024-12-l2', '2025-03-l2', '2025-06-l2', '2025-09-l2', '2026-06-l2'];
    const ids = [...l1, ...l2];
    const entry = (status) => ({ status });
    const papers = Object.fromEntries(ids.map((id) => [id, entry('reviewed-with-open-issues')]));
    const evidence = Object.fromEntries(ids.map((id) => [id, JSON.parse(fs.readFileSync(path.join(docs, `${id}.json`), 'utf8'))]));
    for (const id of ids) {
        const inspected = inspectPaper(id, { entry: papers[id], evidence: evidence[id], rulings });
        assert.equal(inspected.complete, true, id);
        assert.equal(inspected.closedByRuling, true, id);
        assert.equal(isPaperPassed(papers[id], evidence[id]), false, id);
        assert.equal(papers[id].status, 'reviewed-with-open-issues', id);
    }
    const l2Barrier = barrierForPaper('2023-03-l2', { inventory: l1.map((id) => ({ id })).concat([{ id: '2023-03-l2' }]), papers, evidenceFor: evidence, rulings });
    assert.equal(l2Barrier.ready, true);
    const l3Barrier = barrierForPaper('2023-06-l3', { inventory: ids.map((id) => ({ id })).concat([{ id: '2023-06-l3' }]), papers, evidenceFor: evidence, rulings });
    assert.equal(l3Barrier.ready, true);
    assert.deepEqual(l3Barrier.blocked, []);
});

test('loadUserRulings accepts user-adjudicated and rejects unknown statuses', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'user-rulings-'));
    const file = path.join(dir, 'user-rulings.json');
    const base = { paperId: '2023-03-l1', questionId: 27, dimensions: ['statement'], decidedBy: 'user', decidedAt: '2026-11-11T10:00:00+08:00', countsAsPassed: false };
    try {
        fs.writeFileSync(file, JSON.stringify({ version: 2, rulings: [{ ...base, status: 'user-adjudicated' }] }));
        assert.equal(loadUserRulings(file).length, 1);
        fs.writeFileSync(file, JSON.stringify({ version: 2, rulings: [{ ...base, status: 'passed' }] }));
        assert.throws(() => loadUserRulings(file), /status/);
        fs.writeFileSync(file, JSON.stringify({ version: 2, rulings: [{ ...base, status: 'user-adjudicated', countsAsPassed: true }] }));
        assert.throws(() => loadUserRulings(file), /countsAsPassed/);
    } finally {
        fs.rmSync(dir, { recursive: true, force: true });
    }
});
