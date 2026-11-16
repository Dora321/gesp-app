import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildQuestionContent, normalizeEscapedLineBreaks } from '../../src/utils/questionTextFormatting.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const BANK_DIR = path.join(ROOT, 'src/data/gesp');

test('question code rendering preserves source indentation exactly', () => {
  const code = 'if (ready) {\n  run();\n\tdone();\n}';
  const content = buildQuestionContent({ question: '阅读代码：', code });

  assert.equal(content, `阅读代码：\n\n\`\`\`cpp\n${code}\n\`\`\``);
});

test('escaped \\n becomes a real line break', () => {
  assert.equal(normalizeEscapedLineBreaks('第一行\\n第二行'), '第一行\n第二行');
  assert.equal(normalizeEscapedLineBreaks('l = mid + 1;\\nr = mid - 1;'), 'l = mid + 1;\nr = mid - 1;');
  assert.equal(normalizeEscapedLineBreaks('A\\nusing namespace std;'), 'A\nusing namespace std;');
  assert.equal(normalizeEscapedLineBreaks('结尾\\n'), '结尾\n');
});

test('LaTeX commands starting with \\n are not treated as line breaks', () => {
  for (const command of ['ne', 'neq', 'newline', 'nu', 'not', 'notin', 'nabla', 'neg', 'nmid', 'nleq', 'ngeq']) {
    const source = `$a \\${command} b$`;
    assert.equal(normalizeEscapedLineBreaks(source), source, command);
  }
  assert.equal(normalizeEscapedLineBreaks('$i\\neq j$'), '$i\\neq j$');
  assert.equal(normalizeEscapedLineBreaks('$b\\ne0$'), '$b\\ne0$');
  assert.equal(normalizeEscapedLineBreaks('$1\\le j \\le N, i\\neq j, A_i=A_j$'), '$1\\le j \\le N, i\\neq j, A_i=A_j$');
});

test('escapes inside code keep their original meaning', () => {
  assert.equal(normalizeEscapedLineBreaks('`10 \\& 12 = 8 \\ne 12`'), '`10 \\& 12 = 8 \\ne 12`');
  const fenced = '```cpp\nprintf("%d\\n", x);\n```';
  assert.equal(normalizeEscapedLineBreaks(fenced), fenced);
});

const listBankFiles = () => {
  const files = [];
  for (const dir of fs.readdirSync(BANK_DIR)) {
    if (!/^level\d$/.test(dir) && dir !== 'luogu-coding') continue;
    for (const name of fs.readdirSync(path.join(BANK_DIR, dir))) {
      if (name.endsWith('.js')) files.push(path.join(BANK_DIR, dir, name));
    }
  }
  return files.sort();
};

const collectStrings = (value, out = [], seen = new Set()) => {
  if (typeof value === 'string') out.push(value);
  else if (value && typeof value === 'object' && !seen.has(value)) {
    seen.add(value);
    for (const child of Object.values(value)) collectStrings(child, out, seen);
  }
  return out;
};

test('every \\ne / \\neq in the question bank survives line-break normalization', async () => {
  const counts = { ne: 0, neq: 0 };

  for (const file of listBankFiles()) {
    const mod = await import(pathToFileURL(file).href);
    for (const text of collectStrings(mod)) {
      const commands = text.match(/\\neq?(?![a-zA-Z])/g);
      if (!commands) continue;

      const normalized = normalizeEscapedLineBreaks(text);
      const after = normalized.match(/\\neq?(?![a-zA-Z])/g) || [];
      assert.deepEqual(after, commands, `${path.relative(ROOT, file)}: ${text.slice(0, 60)}`);
      assert.doesNotMatch(normalized, /\n(eq|e)(?![a-zA-Z])/, `${path.relative(ROOT, file)} 出现被吞的 \\n`);
      for (const command of commands) counts[command.slice(1)] += 1;
    }
  }

  // 2026-11-16 全库基线：5 处 \neq + 10 处 \ne（luoguCodingByLevel.js 是聚合重复，不计）。
  // 题库新增此类写法时同步这里的数字。
  assert.deepEqual(counts, { neq: 5, ne: 10 });
});
