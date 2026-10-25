import test from 'node:test';
import assert from 'node:assert/strict';
import { buildVerificationProgress } from '../lib/verification-progress.mjs';
import { getPaper, paperMeta } from '../../src/data/gesp/index.js';
import { resolveVerification, summarizeVerification, VERIFICATION_DIMENSIONS } from '../../src/data/gesp/verificationModel.js';
import { paperStats } from '../../src/data/gesp/_stats.js';

const sha = 'a'.repeat(40);
const paper = { id: '2026-03-l8', questions: [
  { id: 1, type: 'single', answer: 1 }, { id: 2, type: 'judge', answer: 0 },
  { id: 3, type: 'programming', referenceCode: 'int main() {}' },
] };
const evidence = { paperId: paper.id, source: { shaVerified: true, mirrorSha: sha },
  reviewedBy: { type: 'AI', executor: 'test' }, reviewedAt: '2026-10-25',
  answerTable: { content: { single: 'B', judge: '√' } }, questions: [], unresolved: [] };
const build = (extra = {}) => buildVerificationProgress({ paper, evidence, source: { mirrorSha: sha }, ...extra });

test('matching answer evidence upgrades only objective answers, not the whole paper', () => {
  const result = build();
  assert.equal(result.dimensions.answer, 'verified');
  assert.equal(result.dimensions.explanation, 'unverified');
  assert.equal(result.dimensions.referenceCode, 'unverified');
  assert.equal(result.status, 'partial');
  assert.deepEqual(result.coverage.answer, { reviewed: 2, total: 2 });
});

test('missing or mismatched source hashes cannot certify an evidence document', () => {
  for (const source of [{ shaVerified: false, mirrorSha: sha }, { shaVerified: true, mirrorSha: 'b'.repeat(40) }]) {
    assert.equal(build({ evidence: { ...evidence, source } }).status, 'unverified');
  }
});

test('answer conflicts, retained risk flags and unresolved issues prevent complete certification', () => {
  const conflict = build({ evidence: { ...evidence, questions: [{ id: 1, official: 'C' }] } });
  assert.deepEqual(conflict.conflicts, [1]);
  assert.equal(conflict.coverage.answer.reviewed, 1);
  assert.equal(conflict.dimensions.answer, 'partial');
  const flagged = build({ paper: { ...paper, questions: paper.questions.map(q => q.id === 1 ? { ...q, sourceIntegrity: 'answer-key-conflict' } : q) } });
  assert.equal(flagged.coverage.answer.reviewed, 1);
  assert.equal(build({ evidence: { ...evidence, unresolved: ['待澄清'] } }).dimensions.answer, 'partial');
});

test('an objective code review is not a programming reference-code review', () => {
  const result = build({ evidence: undefined, legacy: { status: 'verified', scope: '题面、代码、选项与答案' } });
  assert.equal(result.dimensions.statement, 'verified');
  assert.equal(result.dimensions.referenceCode, 'unverified');
  assert.equal(result.status, 'partial');
});

test('partial question evidence and passing samples do not certify untouched dimensions', () => {
  const result = build({ evidence: { ...evidence, answerTable: undefined,
    questions: [{ id: 1, dimensions: ['explanation'], resolved: true }],
    programmingSampleAudit: { status: 'passed' },
  } });
  assert.deepEqual(result.coverage.explanation, { reviewed: 1, total: 3 });
  assert.equal(result.dimensions.explanation, 'partial');
  assert.equal(result.dimensions.referenceCode, 'unverified');
});

test('full rebuild evidence credits transcription without inventing an explanation review', () => {
  const result = build({ evidence: { ...evidence, rebuild: { date: '2026-10-25' },
    questions: paper.questions.map(q => ({ id: q.id, method: ['原卷逐页转写重建', ...(q.type === 'programming' ? ['官方参考程序逐字转写'] : [])] })),
  } });
  assert.equal(result.dimensions.statement, 'verified');
  assert.equal(result.dimensions.options, 'verified');
  assert.equal(result.dimensions.referenceCode, 'verified');
  assert.equal(result.dimensions.explanation, 'unverified');
});

test('the homepage, paper list and loaded papers use the same generated dimensions', async () => {
  const counts = { verified: 0, partial: 0, unverified: 0 };
  const dimensions = Object.fromEntries(VERIFICATION_DIMENSIONS.map(({ key }) => [key, { verified: 0, partial: 0, unverified: 0 }]));
  for (const [id, meta] of Object.entries(paperMeta)) {
    if (meta.unofficial) continue;
    const state = resolveVerification(meta);
    assert.deepEqual(resolveVerification(await getPaper(id)), state, id);
    assert.equal(state.status, summarizeVerification(state.dimensions));
    counts[state.status]++;
    for (const { key } of VERIFICATION_DIMENSIONS) dimensions[key][state.dimensions[key]]++;
  }
  assert.deepEqual(counts, { verified: paperStats.verifiedPaperCount, partial: paperStats.partialPaperCount, unverified: paperStats.unverifiedPaperCount });
  assert.deepEqual(dimensions, paperStats.verificationDimensions);
});

test('previously missed audit records appear without pretending all five dimensions are finished', () => {
  assert.equal(resolveVerification(paperMeta['2023-09-l2']).dimensions.answer, 'verified');
  const rebuilt = resolveVerification(paperMeta['2026-03-l8']);
  assert.equal(rebuilt.dimensions.statement, 'verified');
  assert.equal(rebuilt.dimensions.answer, 'verified');
  assert.equal(rebuilt.dimensions.explanation, 'unverified');
  assert.equal(rebuilt.status, 'partial');
});
