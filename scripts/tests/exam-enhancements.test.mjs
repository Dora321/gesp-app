import test from 'node:test';
import assert from 'node:assert/strict';
import {
    estimateGespThresholds,
    flaggedQuestionIndexes,
    resolveQuestionIndex,
} from '../../src/utils/examScoring.js';

test('晋级参考把计分题按比例折算到 50 分，并计算编程题整分目标', () => {
    assert.deepEqual(estimateGespThresholds(40, 50), { scaledObjective: 40, passRequired: 20, skipRequired: 50 });
    assert.deepEqual(estimateGespThresholds(36, 45), { scaledObjective: 40, passRequired: 20, skipRequired: 50 });
    assert.deepEqual(estimateGespThresholds(31, 40), { scaledObjective: 38.75, passRequired: 22, skipRequired: null });
    assert.deepEqual(estimateGespThresholds(50, 50), { scaledObjective: 50, passRequired: 10, skipRequired: 40 });
    assert.deepEqual(estimateGespThresholds(10, 50), { scaledObjective: 10, passRequired: 50, skipRequired: null });
    assert.deepEqual(estimateGespThresholds(0, 50), { scaledObjective: 0, passRequired: null, skipRequired: null });
    assert.equal(estimateGespThresholds(0, 0), null);
});

test('存疑统计按当前卷顺序保留命中的题，忽略已移出卷面的旧标记和重复 ID', () => {
    const questions = [{ id: 2 }, { id: 'p8', type: 'coding' }, { id: 11 }];
    const flagged = new Set(['p8', '99', '2', '2']);
    assert.deepEqual(flaggedQuestionIndexes(questions, flagged), [0, 1]);
    assert.deepEqual(flaggedQuestionIndexes(questions, new Set(['99'])), []);
    assert.deepEqual(flaggedQuestionIndexes(questions), []);
});

test('单题链接优先匹配原题 ID，随后尝试卷面 1-based 序号', () => {
    const questions = [{ id: 'A' }, { id: 7 }, { id: 2 }, { id: 11 }];
    assert.equal(resolveQuestionIndex(questions, 'A'), 0);
    assert.equal(resolveQuestionIndex(questions, '7'), 1);
    assert.equal(resolveQuestionIndex(questions, '2'), 2);
    assert.equal(resolveQuestionIndex(questions, '4'), 3);
    assert.equal(resolveQuestionIndex(questions, '0'), null);
    assert.equal(resolveQuestionIndex(questions, '99'), null);
    assert.equal(resolveQuestionIndex(questions, 'xyz'), null);
    assert.equal(resolveQuestionIndex(questions, null), null);
});
