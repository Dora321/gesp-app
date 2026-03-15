#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const levelDir = path.join(__dirname, '..', 'src/data/gesp/level1');
const registryFile = path.join(__dirname, '..', 'src/data/gesp/index.js');

const expectedPapers = [
  ['2023-03', 1],
  ['2023-06', 2],
  ['2023-09', 3],
  ['2023-12', 4],
  ['2024-03', 5],
  ['2024-06', 6],
  ['2024-09', 7],
  ['2024-12', 8],
  ['2025-03', 9],
  ['2025-06', 10],
  ['2025-09', 11],
  ['2025-12', 12],
];

const issues = [];
const registryRaw = fs.readFileSync(registryFile, 'utf8');
const fileNames = fs.readdirSync(levelDir)
  .filter((file) => /^\d{4}-\d{2}-l1\.js$/.test(file))
  .sort();

for (const [paperId, session] of expectedPapers) {
  const fileName = `${paperId}-l1.js`;
  const fullPath = path.join(levelDir, fileName);

  if (!fileNames.includes(fileName)) {
    issues.push(`缺少文件: ${fileName}`);
    continue;
  }

  if (!registryRaw.includes(`./level1/${paperId}-l1`)) {
    issues.push(`注册表缺少导入: ${paperId}`);
  }
  if (!registryRaw.includes(`'${paperId}':`)) {
    issues.push(`注册表缺少键: ${paperId}`);
  }

  const raw = fs.readFileSync(fullPath, 'utf8');
  if (!raw.includes("from './shared'")) {
    issues.push(`${fileName}: 未复用 shared 模板`);
  }

  let code = raw.replace(/import\s+\{\s*createLevel1Paper\s*\}\s+from\s+'\.\/shared';/, '');
  code = code.replace('export const paperData =', 'globalThis.paperData =');

  try {
    new Function(code);
  } catch (error) {
    issues.push(`${fileName}: 语法错误: ${error.message}`);
    continue;
  }

  const sandbox = {
    globalThis: {},
    createLevel1Paper: ({ year, month, session }) => ({
      id: `${year}-${String(month).padStart(2, '0')}`,
      year,
      month,
      session,
      questions: Array.from({ length: 25 }, (_, index) => ({
        id: index + 1,
        type: index < 15 ? 'single' : 'judge',
        options: index < 15 ? ['A', 'B', 'C', 'D'] : ['正确', '错误'],
        answer: 0,
        explanation: 'stub',
        tags: ['stub'],
      })),
    }),
  };

  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  const paper = sandbox.globalThis.paperData;

  if (!paper) {
    issues.push(`${fileName}: 未导出 paperData`);
    continue;
  }

  if (paper.id !== paperId) issues.push(`${fileName}: id=${paper.id}，应为 ${paperId}`);
  if (paper.session !== session) issues.push(`${fileName}: session=${paper.session}，应为 ${session}`);
  if (!Array.isArray(paper.questions) || paper.questions.length !== 25) {
    issues.push(`${fileName}: 题量不是 25`);
    continue;
  }

  const ids = paper.questions.map((question) => question.id);
  const expectedIds = Array.from({ length: 25 }, (_, index) => index + 1);
  if (JSON.stringify(ids) !== JSON.stringify(expectedIds)) {
    issues.push(`${fileName}: 题目 id 不是 1-25 连续序列`);
  }
}

if (issues.length) {
  console.error(issues.join('\n'));
  process.exit(1);
}

console.log(`OK: level1 结构检查通过（${expectedPapers.length} 套）`);
