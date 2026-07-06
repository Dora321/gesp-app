import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const baseline = JSON.parse(fs.readFileSync(new URL('../question-code-baseline.json', import.meta.url), 'utf8'));

test('question-code baseline is unique and machine-addressable', () => {
  assert.ok(Array.isArray(baseline.issues));
  assert.equal(new Set(baseline.issues).size, baseline.issues.length);
  baseline.issues.forEach(issue => assert.match(issue, /^\d{4}-\d{2}-l[1-8]:Q\w+$/));
});
