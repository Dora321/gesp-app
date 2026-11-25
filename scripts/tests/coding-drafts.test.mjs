import test from 'node:test';
import assert from 'node:assert/strict';
import {
  CODING_DRAFTS_KEY, MAX_CODING_DRAFT_LENGTH, clearCodingDraft,
  mergeCodingDrafts, readAllCodingDrafts, readCodingDraft, saveCodingDraft,
} from '../../src/utils/codingDrafts.js';

function memoryStorage() {
  const values = new Map();
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
}

test('drafts persist independently per problem and empty text clears one problem', () => {
  const storage = memoryStorage();
  assert.ok(saveCodingDraft('lesson:one', 'int main() {}\n', storage, 1));
  assert.ok(saveCodingDraft('paper:one:26', 'int n;', storage, 2));
  assert.equal(readCodingDraft('lesson:one', storage), 'int main() {}\n');
  assert.deepEqual(readAllCodingDrafts(storage)['paper:one:26'], { code: 'int n;', updatedAt: 2 });
  assert.ok(saveCodingDraft('lesson:one', '', storage));
  assert.equal(readCodingDraft('lesson:one', storage), '');
  assert.equal(readCodingDraft('paper:one:26', storage), 'int n;');
  assert.ok(clearCodingDraft('paper:one:26', storage));
  assert.deepEqual(readAllCodingDrafts(storage), {});
});

test('storage corruption and quota failures are recoverable without reporting successful saves', () => {
  const storage = memoryStorage();
  storage.setItem(CODING_DRAFTS_KEY, '{');
  assert.deepEqual(readAllCodingDrafts(storage), {});
  assert.ok(saveCodingDraft('one', 'int n;', storage));
  assert.equal(saveCodingDraft('one', 'x'.repeat(MAX_CODING_DRAFT_LENGTH + 1), storage), false);
  assert.equal(readCodingDraft('one', storage), 'int n;');
  storage.setItem = () => { throw new Error('QuotaExceededError'); };
  assert.equal(saveCodingDraft('one', 'int k;', storage), false);
  assert.equal(clearCodingDraft('one', storage), false);
  assert.equal(readCodingDraft('one', storage), 'int n;');
});

test('store capacity rejects new drafts without deleting older ones', () => {
  const storage = memoryStorage();
  const code = 'x'.repeat(MAX_CODING_DRAFT_LENGTH);
  for (let i = 0; i < 31; i++) assert.ok(saveCodingDraft(`draft-${i}`, code, storage, i));
  assert.equal(saveCodingDraft('over-budget', code, storage), false);
  assert.equal(Object.keys(readAllCodingDrafts(storage)).length, 31);
  assert.equal(readCodingDraft('draft-0', storage), code);
});

test('backup merge keeps newest valid code per problem, prefers the local draft on ties and bounds imports', () => {
  const draft = (code, updatedAt) => ({ code, updatedAt });
  const merged = mergeCodingDrafts(
    { a: draft('old', 1), b: draft('local', 2), c: draft('stay', 3) },
    { a: draft('new', 2), b: draft('imported', 2), c: draft('too big'.repeat(4000), 4), d: draft('invalid', -1) },
  );
  assert.deepEqual(merged, { a: draft('new', 2), b: draft('local', 2), c: draft('stay', 3) });
  const bulk = Object.fromEntries(Array.from({ length: 75 }, (_, i) => [`draft-${i}`, draft('x', i)]));
  const bounded = mergeCodingDrafts({}, bulk);
  assert.equal(Object.keys(bounded).length, 60);
  assert.ok(bounded['draft-74']);
  assert.equal(bounded['draft-0'], undefined);
});
