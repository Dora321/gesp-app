#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const levelDir = path.join(__dirname, '..', 'src/data/gesp/level4');
const registryFile = path.join(__dirname, '..', 'src/data/gesp/index.js');

const expectedPapers = [
  ['2023-06-l4', 2],
  ['2023-09-l4', 3],
  ['2023-12-l4', 4],
];

const issues = [];
const registryRaw = fs.readFileSync(registryFile, 'utf8');
const fileNames = fs.readdirSync(levelDir)
  .filter((file) => /^\d{4}-\d{2}-l4\.js$/.test(file))
  .sort();

async function check() {
  for (const [paperId, session] of expectedPapers) {
    const fileName = `${paperId}.js`;
    const fullPath = path.join(levelDir, fileName);

    if (!fileNames.includes(fileName)) {
      issues.push(`缺少文件: ${fileName}`);
      continue;
    }

    if (!registryRaw.includes(`./level4/${paperId}`)) {
      issues.push(`注册表缺少导入: ${paperId}`);
    }
    if (!registryRaw.includes(`'${paperId}':`)) {
      issues.push(`注册表缺少键: ${paperId}`);
    }

    try {
      const module = await import('file://' + fullPath.replace(/\\/g, '/'));
      const paper = module.paperData;

      if (!paper) {
        issues.push(`${fileName}: 未导出 paperData`);
        continue;
      }

      if (paper.id !== paperId) issues.push(`${fileName}: id=${paper.id}，应为 ${paperId}`);
      
      const progQuestions = paper.questions.filter(q => q.type === 'programming');
      if (progQuestions.length !== 2) {
        issues.push(`${fileName}: 编程题量不是 2 (当前: ${progQuestions.length})`);
      }

      for (const q of progQuestions) {
        if (!q.answer || q.answer.length < 10) {
          issues.push(`${fileName}: 编程题 ${q.id} 缺少代码实现`);
        }
        if (!q.description || q.description.includes('待补充')) {
          issues.push(`${fileName}: 编程题 ${q.id} 描述不完整`);
        }
      }

    } catch (error) {
      issues.push(`${fileName}: 加载失败: ${error.message}`);
    }
  }

  if (issues.length) {
    console.error('Level 4 Issues Found:');
    console.error(issues.join('\n'));
    // process.exit(1); // Don't exit yet, just report
  } else {
    console.log(`OK: level4 2023 编程题检查通过`);
  }
}

check();
