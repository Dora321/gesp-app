import test from 'node:test';
import assert from 'node:assert/strict';
import { paperIds } from '../../src/data/gesp/_generated.js';
import { verifiedQuestionCorrections } from '../../src/data/gesp/verifiedQuestionCorrections.js';

test('verified question corrections are traceable to official papers', () => {
  for (const [paperId, correction] of Object.entries(verifiedQuestionCorrections)) {
    assert.ok(paperIds.includes(paperId), `Unknown paper: ${paperId}`);
    assert.match(correction.sourceUrl, /^https:\/\//, `${paperId} must include an official source URL`);
    assert.ok(Object.keys(correction.questions || {}).length > 0, `${paperId} has no corrected questions`);

    for (const [questionId, question] of Object.entries(correction.questions)) {
      assert.ok(Number.isInteger(question.sourcePage) && question.sourcePage > 0, `${paperId}:Q${questionId} has no source page`);
      if ('code' in question) {
        assert.ok(typeof question.code === 'string' && question.code.trim().length >= 3, `${paperId}:Q${questionId} has empty code`);
      }
    }
  }
});
