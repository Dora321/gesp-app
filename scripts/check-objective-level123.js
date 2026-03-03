#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..', 'src/data/gesp');

const levelConfigs = [
  { level: 1, dir: 'level1', pattern: /\d{4}-\d{2}-l1\.js$/, expected: 25, expectedSingle: 15, expectedJudge: 10 },
  { level: 2, dir: 'level2', pattern: /\d{4}-\d{2}-l2\.js$/, expected: 25, expectedSingle: 15, expectedJudge: 10, exclude: ['2023-03-l2.js'] },
  { level: 3, dir: 'level3', pattern: /\d{4}-\d{2}-l3\.js$/, expected: 25, expectedSingle: 15, expectedJudge: 10 },
  { level: 4, dir: 'level4', pattern: /\d{4}-\d{2}-l4\.js$/, minQuestions: 4 },
  { level: 5, dir: 'level5', pattern: /\d{4}-\d{2}-l5\.js$/, minQuestions: 4 },
  { level: 6, dir: 'level6', pattern: /\d{4}-\d{2}-l6\.js$/, minQuestions: 1 },
  { level: 7, dir: 'level7', pattern: /\d{4}-\d{2}-l7\.js$/, minQuestions: 1 },
  { level: 8, dir: 'level8', pattern: /\d{4}-\d{2}-l8\.js$/, minQuestions: 1 },
];

const issues = [];

for (const cfg of levelConfigs) {
  const dir = path.join(root, cfg.dir);
  const files = fs.readdirSync(dir)
    .filter((f) => cfg.pattern.test(f) && !(cfg.exclude || []).includes(f))
    .sort();

  for (const file of files) {
    const full = path.join(dir, file);
    const raw = fs.readFileSync(full, 'utf8');
    const code = raw.replace('export const paperData =', 'globalThis.paperData =');

    try {
      new Function(code);
    } catch (e) {
      issues.push(`${file}: syntax error: ${e.message}`);
      continue;
    }

    const ctx = { globalThis: {} };
    vm.createContext(ctx);
    vm.runInContext(code, ctx);
    const paper = ctx.globalThis.paperData;

    if (!paper || !Array.isArray(paper.questions)) {
      issues.push(`${file}: missing questions array`);
      continue;
    }

    if (cfg.expected && paper.questions.length !== cfg.expected) {
      issues.push(`${file}: total questions = ${paper.questions.length}, expected ${cfg.expected}`);
    }
    if (cfg.minQuestions && paper.questions.length < cfg.minQuestions) {
      issues.push(`${file}: total questions = ${paper.questions.length}, expected at least ${cfg.minQuestions}`);
    }

    let single = 0;
    let judge = 0;
    for (const q of paper.questions) {
      if (!String(q.question || '').trim()) {
        issues.push(`${file}: empty question text at id=${q.id}`);
      }
      if (!String(q.explanation || '').trim()) {
        issues.push(`${file}: empty explanation at id=${q.id}`);
      }
      if (!Array.isArray(q.tags) || q.tags.length === 0) {
        issues.push(`${file}: missing tags at id=${q.id}`);
      }

      if (q.type === 'single') {
        single += 1;
        if (!Array.isArray(q.options) || q.options.length !== 4) {
          issues.push(`${file}: single question id=${q.id} options length != 4`);
        }
      } else if (q.type === 'judge') {
        judge += 1;
        if (!Array.isArray(q.options) || q.options.length !== 2) {
          issues.push(`${file}: judge question id=${q.id} options length != 2`);
        }
      } else {
        issues.push(`${file}: unsupported question type id=${q.id}, type=${q.type}`);
      }
    }

    if (cfg.expectedSingle !== undefined && cfg.expectedJudge !== undefined) {
      if (single !== cfg.expectedSingle || judge !== cfg.expectedJudge) {
        issues.push(`${file}: single/judge count mismatch => ${single}/${judge}, expected ${cfg.expectedSingle}/${cfg.expectedJudge}`);
      }
    }
  }
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}

console.log('OK: level1-8 objective checks passed.');
