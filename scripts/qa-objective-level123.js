#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.join(__dirname, '..', 'src/data/gesp');

const targets = [
  { dir: 'level4', pattern: /\d{4}-\d{2}-l4\.js$/ },
  { dir: 'level5', pattern: /\d{4}-\d{2}-l5\.js$/ },
  { dir: 'level6', pattern: /\d{4}-\d{2}-l6\.js$/ },
  { dir: 'level7', pattern: /\d{4}-\d{2}-l7\.js$/ },
  { dir: 'level8', pattern: /\d{4}-\d{2}-l8\.js$/ }
];

const badFragments = [
  '待复核', '占位', 'placeholder', 'OCR', '？？', '��', '图略', '原卷A', '原卷B', '原卷C', '原卷D'
];

const issues = [];

for (const target of targets) {
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

      if (text.length > 280) {
        issues.push(`${file}#Q${q.id}: 题干过长(${text.length})`);
      }

      const allText = `${text}\n${explanation}\n${(q.options || []).join('\n')}`;
      for (const frag of badFragments) {
        if (allText.includes(frag)) {
          issues.push(`${file}#Q${q.id}: 命中疑似脏数据片段「${frag}」`);
          break;
        }
      }

      if (Array.isArray(q.options) && q.options.some((o) => !String(o).trim())) {
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

console.log('QA OK: level4-8 objective data is clean.');
