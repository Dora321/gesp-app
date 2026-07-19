#!/usr/bin/env node
// Programming-question gate: every programming question must carry samples and
// a reference solution that actually compiles and reproduces the sample output.
// Complements validate-question-bank.js, which only covers objective questions.
//
// Usage:
//   node scripts/validate-programming-questions.js            # static checks only
//   node scripts/validate-programming-questions.js --compile  # + g++ compile
//   node scripts/validate-programming-questions.js --run      # + execute samples
import fs from 'fs';
import os from 'os';
import path from 'path';
import { execFileSync, spawnSync } from 'child_process';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'src/data/gesp');
const doCompile = process.argv.includes('--compile') || process.argv.includes('--run');
const doRun = process.argv.includes('--run');

// Raw code fields must never contain markdown/LaTeX leftovers like $n+1$ or
// $dp[i]$ — they belong to statements only and make the code uncompilable.
const CONTAMINATION = [
  { name: 'inline-math $…$', pattern: /\$[^$\n]{1,60}\$/ },
  { name: 'markdown bold **…**', pattern: /\*\*[^*\n]{1,60}\*\*/ },
  { name: 'markdown fence ```', pattern: /```/ },
  { name: 'html tag <br>', pattern: /<br\s*\/?>/i },
];

const collectProgrammingQuestions = (paper) => {
  const pools = [
    ...(Array.isArray(paper.questions) ? paper.questions : []),
    ...(Array.isArray(paper.programmingQuestions) ? paper.programmingQuestions : []),
    ...(Array.isArray(paper.codingQuestions) ? paper.codingQuestions : []),
  ];
  return pools.filter((q) => q && q.type === 'programming');
};

const normalizeOutput = (text) => String(text ?? '')
  .replace(/\r\n/g, '\n')
  .split('\n')
  .map((line) => line.replace(/\s+$/, ''))
  .join('\n')
  .replace(/\n+$/, '');

async function main() {
  const errors = [];
  const warnings = [];
  const pending = [];
  let paperCount = 0;
  let questionCount = 0;
  let compiledCount = 0;
  let sampleRunCount = 0;

  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gesp-progcheck-'));

  // Apple clang ships no <bits/stdc++.h>. Provide a shim ONLY when the toolchain
  // lacks it: on CI (GNU libstdc++) the real header exists, and shadowing it with
  // a partial shim silently changed what compiled — an earlier version of this
  // shim omitted <climits>, so code using LLONG_MIN/INT_MAX passed locally and
  // failed on CI. Probing keeps the two environments honest.
  const probeSrc = path.join(tmpDir, 'probe.cpp');
  fs.writeFileSync(probeSrc, '#include <bits/stdc++.h>\nint main(){return 0;}\n', 'utf8');
  let hasRealHeader = true;
  try {
    execFileSync('g++', ['-std=c++17', '-fsyntax-only', probeSrc], { stdio: 'ignore', timeout: 60000 });
  } catch {
    hasRealHeader = false;
  }

  const includeArgs = [];
  if (!hasRealHeader) {
    const shimDir = path.join(tmpDir, 'include');
    fs.mkdirSync(path.join(shimDir, 'bits'), { recursive: true });
    fs.writeFileSync(
      path.join(shimDir, 'bits', 'stdc++.h'),
      ['#pragma once',
        ...['algorithm', 'array', 'bitset', 'cassert', 'cctype', 'cfloat', 'climits', 'cmath',
          'complex', 'cstdarg', 'cstddef', 'cstdint', 'cstdio', 'cstdlib', 'cstring', 'ctime',
          'deque', 'exception', 'forward_list', 'fstream', 'functional', 'initializer_list',
          'iomanip', 'ios', 'iosfwd', 'iostream', 'istream', 'iterator', 'limits', 'list',
          'locale', 'map', 'memory', 'new', 'numeric', 'ostream', 'queue', 'random', 'ratio',
          'regex', 'set', 'sstream', 'stack', 'stdexcept', 'streambuf', 'string', 'tuple',
          'type_traits', 'typeinfo', 'unordered_map', 'unordered_set', 'utility', 'valarray',
          'vector']
          .map((h) => `#include <${h}>`),
      ].join('\n'),
      'utf8'
    );
    includeArgs.push('-I', shimDir);
    console.log('Note: toolchain lacks <bits/stdc++.h>; using a local shim.');
  }

  for (let level = 1; level <= 8; level++) {
    const dir = path.join(root, `level${level}`);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => /^\d{4}-\d{2}-l\d\.js$/.test(f)).sort();

    for (const file of files) {
      const filePath = path.join(dir, file);
      const { paperData: paper } = await import(pathToFileURL(filePath).href);
      if (!paper) continue;
      const progs = collectProgrammingQuestions(paper);
      if (progs.length === 0) continue;
      paperCount++;

      for (const q of progs) {
        questionCount++;
        const label = `${paper.id} Q${q.id}`;
        const statement = String(q.question || q.description || '');
        const code = String(q.referenceCode || '');
        const template = String(q.template || '');

        if (!statement.trim()) errors.push(`${label}: empty statement`);

        // Samples: either structured {input, output} pairs or an inline
        // 样例/Sample block inside the statement.
        const samples = Array.isArray(q.samples) ? q.samples : [];
        const hasInlineSamples = /输入样例|样例输入|Sample Input/i.test(statement);
        if (samples.length === 0 && !hasInlineSamples) {
          errors.push(`${label}: no samples (neither structured samples[] nor inline 样例 block)`);
        }
        samples.forEach((s, i) => {
          if (typeof s.input !== 'string' || typeof s.output !== 'string') {
            errors.push(`${label}: samples[${i}] must have string input and output`);
          }
        });

        if (!code.trim()) {
          errors.push(`${label}: missing referenceCode`);
          continue;
        }

        for (const { name, pattern } of CONTAMINATION) {
          if (pattern.test(code)) errors.push(`${label}: referenceCode contains ${name} → not compilable as-is`);
          if (template && pattern.test(template)) errors.push(`${label}: template contains ${name}`);
        }

        if (!doCompile) continue;

        const srcPath = path.join(tmpDir, `${paper.id}-q${q.id}.cpp`);
        const binPath = path.join(tmpDir, `${paper.id}-q${q.id}.bin`);
        fs.writeFileSync(srcPath, code, 'utf8');
        try {
          execFileSync('g++', ['-std=c++17', '-O2', ...includeArgs, '-o', binPath, srcPath], {
            stdio: ['ignore', 'pipe', 'pipe'],
            timeout: 60000,
          });
          compiledCount++;
        } catch (e) {
          const detail = String(e.stderr || e.message).split('\n').slice(0, 4).join('\n    ');
          errors.push(`${label}: referenceCode failed to compile\n    ${detail}`);
          continue;
        }

        if (!doRun) continue;

        // A question whose statement/samples are known to be unreliable must say
        // so in the data (and say why) rather than be quietly patched to match.
        // We still compile its reference code; we just don't assert the samples.
        if (q.samplesVerified === false) {
          if (!String(q.verificationNote || '').trim()) {
            errors.push(`${label}: samplesVerified:false requires a verificationNote explaining what is unresolved`);
          } else {
            pending.push(`${label}: ${q.verificationNote}`);
          }
          continue;
        }

        samples.forEach((s, i) => {
          if (typeof s.input !== 'string' || typeof s.output !== 'string') return;
          const run = spawnSync(binPath, [], { input: s.input, encoding: 'utf8', timeout: 10000 });
          if (run.status !== 0) {
            errors.push(`${label}: sample ${i + 1} run failed (exit ${run.status}${run.signal ? `, signal ${run.signal}` : ''})`);
            return;
          }
          const actual = normalizeOutput(run.stdout);
          const expected = normalizeOutput(s.output);
          if (actual !== expected) {
            errors.push(`${label}: sample ${i + 1} output mismatch\n    expected: ${JSON.stringify(expected)}\n    actual:   ${JSON.stringify(actual)}`);
            return;
          }
          sampleRunCount++;
        });
      }
    }
  }

  fs.rmSync(tmpDir, { recursive: true, force: true });

  console.log('--- Programming Question Gate ---');
  console.log(`Papers with programming questions: ${paperCount}`);
  console.log(`Programming questions checked:     ${questionCount}`);
  if (doCompile) console.log(`Reference solutions compiled:      ${compiledCount}`);
  if (doRun) console.log(`Samples verified by execution:     ${sampleRunCount}`);
  if (pending.length > 0) {
    console.log(`\n📋 ${pending.length} question(s) awaiting official source verification (samples not asserted):`);
    pending.forEach((p) => console.log(`  ${p}`));
  }

  warnings.forEach((w) => console.log(`⚠️  ${w}`));
  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} problem(s):`);
    errors.forEach((e) => console.log(`  ${e}`));
    process.exit(1);
  }
  console.log('\n✅ Programming question gate passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
