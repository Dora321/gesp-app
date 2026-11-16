import test from 'node:test';
import assert from 'node:assert/strict';
import { resolveAppliedSourcePage, isAnswerTablePage, ANSWER_TABLE_PAGE } from '../lib/resolve-applied-source-page.mjs';

test('page 1 is the official answer table and must not be written as sourcePage', () => {
    assert.equal(ANSWER_TABLE_PAGE, 1);
    assert.equal(isAnswerTablePage(1), true);
    assert.equal(isAnswerTablePage(6), false);
});

test('does not overwrite an existing official sourcePage from sourcePages[0]', () => {
    // 2024-12-l4 Q14: models listed answer table then the question page
    assert.equal(resolveAppliedSourcePage({
        existingSourcePage: 6,
        acceptedChanges: { explanation: '修订解析' },
        sourcePages: [1, 6],
    }), undefined);

    // 2024-12-l4 Q5: stem starts on page 2, official recording used page 3
    assert.equal(resolveAppliedSourcePage({
        existingSourcePage: 3,
        acceptedChanges: { code: 'int x = 20;' },
        sourcePages: [2, 3],
    }), undefined);

    // 2024-12-l4 Q9: first listed page happens to match the official page
    assert.equal(resolveAppliedSourcePage({
        existingSourcePage: 4,
        acceptedChanges: { explanation: '修订解析' },
        sourcePages: [4, 5],
    }), undefined);
});

test('fills a missing sourcePage from the first non-answer-table page', () => {
    assert.equal(resolveAppliedSourcePage({
        acceptedChanges: { explanation: '修订解析' },
        sourcePages: [1, 6],
    }), 6);
    assert.equal(resolveAppliedSourcePage({
        existingSourcePage: undefined,
        acceptedChanges: { code: 'int x = 20;' },
        sourcePages: [2, 3],
    }), 2);
    assert.equal(resolveAppliedSourcePage({
        sourcePages: [1],
    }), undefined);
});

test('honours sourcePage only when it is explicitly in the accepted fields', () => {
    assert.equal(resolveAppliedSourcePage({
        existingSourcePage: 3,
        acceptedChanges: { sourcePage: 2, explanation: '页码订正' },
        sourcePages: [2, 3],
    }), 2);
});

test('never applies an answer-table page even if it is an accepted field', () => {
    assert.equal(resolveAppliedSourcePage({
        existingSourcePage: 6,
        acceptedChanges: { sourcePage: 1, explanation: '误把答案表当题页' },
        sourcePages: [1, 6],
    }), 6);
    assert.equal(resolveAppliedSourcePage({
        acceptedChanges: { sourcePage: 1 },
        sourcePages: [1, 6],
    }), 6);
    assert.equal(resolveAppliedSourcePage({
        acceptedChanges: { sourcePage: 1 },
        sourcePages: [1],
    }), undefined);
});
