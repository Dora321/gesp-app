#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..', 'src/data/gesp');

const targetLevels = [
  { dir: 'level1', pattern: /\d{4}-\d{2}-l1\.js$/ },
  { dir: 'level3', pattern: /\d{4}-\d{2}-l3\.js$/ }
];

const badFragments = [
  '待复核', '占位', 'placeholder', 'OCR', '？？', '��', '图略'
];

const issues = [];

for (const target of targetLevels) {
  const dir = path.join(root, target.dir);
  const files = fs.readdirSync(dir)
    .filter((f) => target.pattern.test(f) && !(target.exclude || []).includes(f))
    .sort();

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
      const explanation = String(q.explanation || '').trim();

      if (text.length > 260) {
        issues.push(`${file}#Q${q.id}: 题干过长(${text.length})`);
      }
      if (text && !/[。？！；：）】」…]$/.test(text)) {
        issues.push(`${file}#Q${q.id}: 题干缺少中文结尾标点`);
      }

      const allText = `${text}\n${explanation}\n${(q.options || []).join('\n')}`;
      for (const frag of badFragments) {
        if (allText.includes(frag)) {
          issues.push(`${file}#Q${q.id}: 命中疑似脏数据片段「${frag}」`);
          break;
        }
      }

      if (Array.isArray(q.options) && q.options.some((o) => String(o).length < 1)) {
        issues.push(`${file}#Q${q.id}: 存在空选项`);
      }

      if (!Array.isArray(q.tags) || q.tags.some((t) => !String(t).trim())) {
        issues.push(`${file}#Q${q.id}: tags 为空或含空白标签`);
      }
    }
  }
}

if (issues.length) {
  console.log(`QA issues: ${issues.length}`);
  for (const issue of issues) console.log(issue);
  process.exit(2);
}

console.log('QA OK: level1/2/3 objective data is clean.');
