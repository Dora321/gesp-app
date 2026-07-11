import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../..', import.meta.url));

test('question-bank audit scans papers only and separates programming questions', () => {
  const output = execFileSync(process.execPath, ['scripts/audit-question-bank.mjs'], {
    cwd: root,
    encoding: 'utf8',
  });

  assert.match(output, /\| L8 \| 10 \| 250 \| 20 \|/);
  assert.doesNotMatch(output, /\| programming \|/);
  assert.doesNotMatch(output, /undefined/);
});
