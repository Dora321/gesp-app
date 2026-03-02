#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, '..', 'src/data/gesp/level2');
const files = fs.readdirSync(dir)
  .filter((f) => /\d{4}-\d{2}-l2\.js$/.test(f) && f !== '2023-03-l2.js')
  .sort();

const issues = [];
for (const file of files) {
  const full = path.join(dir, file);
  const raw = fs.readFileSync(full, 'utf8');
  const code = raw.replace('export const paperData =', 'globalThis.paperData =');

  try { new Function(code); } catch (e) {
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

  if (paper.questions.length !== 25) {
    issues.push(`${file}: total questions = ${paper.questions.length}`);
  }

  let single = 0;
  let judge = 0;
  for (const q of paper.questions) {
    if (!String(q.question || '').trim()) {
      issues.push(`${file}: empty question text at id=${q.id}`);
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
    }
  }

  if (single !== 15 || judge !== 10) {
    issues.push(`${file}: single/judge count mismatch => ${single}/${judge}`);
  }
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}
console.log(`OK: ${files.length} papers passed sanity check.`);
