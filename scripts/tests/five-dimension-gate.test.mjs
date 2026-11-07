import test from 'node:test';
import assert from 'node:assert/strict';
import { auditDimensions, gateQuestionReview } from '../lib/five-dimension-gate.mjs';

const question = { id: 1, type: 'single', question: 'q', options: ['a', 'b', 'c', 'd'], answer: 1, explanation: '原解析' };
const report = () => ({ id: 1, officialAnswer: 1, sourcePages: [1], verdict: 'approve', changes: {}, dimensions: Object.fromEntries(auditDimensions.map(key => [key, { status: 'verified', evidence: '具体对照依据' }])) });
test('双模型一致才核验适用维度', () => {
    const result = gateQuestionReview(question, report(), report());
    assert.deepEqual(result.dimensions, ['statement', 'options', 'answer', 'explanation']);
    assert.deepEqual(result.blockedDimensions, []);
});
test('意见不一致只阻止对应维度', () => {
    const review = report(); review.dimensions.explanation.status = 'unresolved';
    const result = gateQuestionReview(question, report(), review);
    assert(!result.dimensions.includes('explanation'));
    assert(result.dimensions.includes('answer'));
});
test('没有原卷答案不能以解析自洽代替答案表核验', () => {
    const review = report(); review.officialAnswer = null;
    assert(!gateQuestionReview(question, report(), review).dimensions.includes('answer'));
});
test('尚未应用的修复不能提前升级维度', () => {
    const initial = report(); initial.changes.explanation = '新解析'; initial.dimensions.explanation.status = 'needs_fix';
    const review = report(); review.changes.explanation = '新解析';
    const pending = gateQuestionReview(question, initial, review);
    assert.deepEqual(pending.changes, { explanation: '新解析' });
    assert(!pending.dimensions.includes('explanation'));
    assert(gateQuestionReview(question, initial, review, { changesApplied: true }).dimensions.includes('explanation'));
});
test('不同修改方案及不允许字段不会自动应用', () => {
    const a = report(), b = report(); a.changes.explanation = '方案A'; b.changes.explanation = '方案B'; b.changes.sourceIntegrity = null;
    const result = gateQuestionReview(question, a, b);
    assert.deepEqual(result.changes, {});
    assert(result.blockedDimensions.includes('explanation'));
});
test('原卷争议标记不能被两模型一致结论解除', () => {
    const result = gateQuestionReview({ ...question, sourceIntegrity: 'answer-key-conflict' }, report(), report());
    assert.deepEqual(result.dimensions, []);
    assert.deepEqual(result.changes, {});
});
test('参考程序需要模型审查加实际样例和边界测试', () => {
    const q = { id: 1, type: 'programming' };
    assert(!gateQuestionReview(q, report(), report()).dimensions.includes('referenceCode'));
    assert(!gateQuestionReview(q, report(), report(), { codeCheck: { passed: true, sampleCount: 2, boundaryCount: 0 } }).dimensions.includes('referenceCode'));
    assert(gateQuestionReview(q, report(), report(), { codeCheck: { passed: true, sampleCount: 1, boundaryCount: 2 } }).dimensions.includes('referenceCode'));
});
