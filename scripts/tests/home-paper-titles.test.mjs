import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { paperTitles } from '../../src/data/gesp/_paperTitles.js';
import { paperIds, paperMeta } from '../../src/data/gesp/_generated.js';

test('_paperTitles stays in sync with the generated registry', () => {
  assert.deepEqual(Object.keys(paperTitles), paperIds);
  for (const id of paperIds) assert.equal(paperTitles[id], paperMeta[id].title, id);
});

test('home components do not statically import the full paper registry', () => {
  const source = readFileSync(new URL('../../src/components/ContinueLearning.jsx', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /from ['"]\.\.\/data\/gesp(\/index)?['"]/);
  const index = readFileSync(new URL('../../src/data/gesp/index.js', import.meta.url), 'utf8');
  assert.doesNotMatch(index, /^import .*verifiedQuestionCorrections/m, 'corrections overlay must be loaded on demand');
});
