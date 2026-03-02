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

  const ctx = { globalThis: {} };
  vm.createContext(ctx);
  vm.runInContext(code, ctx);
  const paper = ctx.globalThis.paperData;

  for (const q of paper.questions || []) {
    const text = String(q.question || '').trim();
    if (text.length > 260) {
      issues.push(`${file}#Q${q.id}: 题干过长(${text.length})`);
    }
    if (text && !/[。？！；：）】」…]$/.test(text)) {
      issues.push(`${file}#Q${q.id}: 题干缺少中文结尾标点`);
    }
    if (q.id <= 15 && Array.isArray(q.options) && q.options.some((o) => String(o).includes('待复核'))) {
      issues.push(`${file}#Q${q.id}: 单选选项含“待复核”`);
    }
  }
}

if (issues.length) {
  console.log(`QA issues: ${issues.length}`);
  for (const i of issues) console.log(i);
  process.exit(2);
}
console.log(`QA OK: ${files.length} papers`);
