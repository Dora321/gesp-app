#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const levelDir = path.join(__dirname, '..', 'src/data/gesp/level1');
// 注册表现由 generate-paper-registry.cjs 生成，检查生成文件而不是薄壳 index.js
const registryFile = path.join(__dirname, '..', 'src/data/gesp/_generated.js');

const expectedPapers = [
  ['2023-03-l1', 1],
  ['2023-06-l1', 2],
  ['2023-09-l1', 3],
  ['2023-12-l1', 4],
  ['2024-03-l1', 5],
  ['2024-06-l1', 6],
  ['2024-09-l1', 7],
  ['2024-12-l1', 8],
  ['2025-03-l1', 9],
  ['2025-06-l1', 10],
  ['2025-09-l1', 11],
  ['2025-12-l1', 12],
  ['2026-03-l1', 13],
];

const issues = [];
const registryRaw = fs.readFileSync(registryFile, 'utf8');
const fileNames = fs.readdirSync(levelDir)
  .filter((file) => /^\d{4}-\d{2}-l1\.js$/.test(file))
  .sort();

async function check() {
  for (const [paperId, session] of expectedPapers) {
    const fileName = `${paperId}.js`;
    const fullPath = path.join(levelDir, fileName);

    if (!fileNames.includes(fileName)) {
      issues.push(`缺少文件: ${fileName}`);
      continue;
    }

    if (!registryRaw.includes(`./level1/${paperId}`)) {
      issues.push(`注册表缺少导入: ${paperId}`);
    }
    if (!registryRaw.includes(`'${paperId}':`)) {
      issues.push(`注册表缺少键: ${paperId}`);
    }

    // 动态导入以支持 ESM
    try {
      const module = await import('file://' + fullPath.replace(/\\/g, '/'));
      const paper = module.paperData;

      if (!paper) {
        issues.push(`${fileName}: 未导出 paperData`);
        continue;
      }

      if (paper.id !== paperId) issues.push(`${fileName}: id=${paper.id}，应为 ${paperId}`);
      if (paper.session !== session) issues.push(`${fileName}: session=${paper.session}，应为 ${session}`);
      
      // 注意：2023-03 到 2023-12 已经手工补全了题目，可能不只是 25 题（如果有大题拆分）
      // 但 GESP 标准是一级 27 题 (15单选 + 10判断 + 2编程)
      // 原脚本检查 25 题可能是只查客观题
      const objectiveQuestions = paper.questions.filter(q => q.type === 'single' || q.type === 'judge');
      if (objectiveQuestions.length !== 25) {
        issues.push(`${fileName}: 客观题量不是 25 (当前: ${objectiveQuestions.length})`);
      }

      const ids = paper.questions.map((question) => question.id);
      const expectedIds = Array.from({ length: paper.questions.length }, (_, index) => index + 1);
      if (JSON.stringify(ids) !== JSON.stringify(expectedIds)) {
        issues.push(`${fileName}: 题目 id 不是连续序列`);
      }
    } catch (error) {
      issues.push(`${fileName}: 加载失败: ${error.message}`);
    }
  }

  if (issues.length) {
    console.error(issues.join('\n'));
    process.exit(1);
  }

  console.log(`OK: level1 检验通过（${expectedPapers.length} 套）`);
}

check();
