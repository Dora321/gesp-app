// 精确题库审计脚本 - 使用 Node.js 动态 import 解析 JS 模块
// 用法: node scripts/precise-audit.mjs

import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_DIR = join(__dirname, '..', 'src', 'data', 'gesp');

const issues = [];

// 动态加载所有试卷
async function loadAllPapers() {
  const levels = [];
  for (let i = 1; i <= 8; i++) {
    const levelDir = join(DATA_DIR, `level${i}`);
    if (fs.existsSync(levelDir)) {
      const files = fs.readdirSync(levelDir).filter(f => f.endsWith('.js') && f !== 'shared.js');
      for (const file of files) {
        levels.push({ level: i, file, path: join(levelDir, file) });
      }
    }
  }
  return levels;
}

async function auditPaper(levelInfo) {
  const { level, file, path: filePath } = levelInfo;
  const paperId = file.replace('.js', '');
  
  try {
    const fileUrl = pathToFileURL(filePath).href;
    const module = await import(fileUrl);
    const paper = module.paperData;
    if (!paper || !paper.questions) {
      issues.push({ paperId, severity: 'P1', qId: '整体', desc: 'paperData 或 questions 缺失' });
      return;
    }

    const questions = paper.questions;
    
    for (const q of questions) {
      // 1. 空选项检查
      if (q.type === 'single' && Array.isArray(q.options)) {
        for (let i = 0; i < q.options.length; i++) {
          const opt = String(q.options[i]).trim();
          if (opt === '') {
            issues.push({ paperId, severity: 'P1', qId: q.id, desc: `选项[${i}]为空字符串` });
          }
        }
        
        // 2. 重复选项检查
        const optTexts = q.options.map(o => String(o).trim());
        const seen = new Set();
        for (const opt of optTexts) {
          if (seen.has(opt)) {
            issues.push({ paperId, severity: 'P1', qId: q.id, desc: `重复选项: "${opt.substring(0, 40)}"` });
          }
          seen.add(opt);
        }
        
        // 3. 答案索引越界
        if (typeof q.answer === 'number' && (q.answer < 0 || q.answer >= q.options.length)) {
          issues.push({ paperId, severity: 'P0', qId: q.id, desc: `答案索引越界: answer=${q.answer}, 选项数=${q.options.length}` });
        }
      }
      
      // 4. 选项含 A/B/C/D 前缀
      if (q.type === 'single' && Array.isArray(q.options)) {
        for (let i = 0; i < q.options.length; i++) {
          const opt = String(q.options[i]);
          if (/^[A-D][.、）)]\s/.test(opt)) {
            issues.push({ paperId, severity: 'P2', qId: q.id, desc: `选项[${i}]含字母前缀: "${opt.substring(0, 30)}"` });
          }
        }
      }
      
      // 5. 题干含编号前缀
      if (typeof q.question === 'string' && /^\s*\d+[.。、）)]\s/.test(q.question)) {
        issues.push({ paperId, severity: 'P2', qId: q.id, desc: `题干含编号前缀: "${q.question.substring(0, 30)}"` });
      }
      
      // 6. score 缺失
      if (q.score === undefined || q.score === null) {
        issues.push({ paperId, severity: 'P2', qId: q.id, desc: '缺少 score 字段' });
      }
      
      // 7. 代码未用代码块
      if (typeof q.question === 'string') {
        const hasCode = /\b(int|cout|cin|for|if|while|return|void|char|double|float|long|short|unsigned|printf|scanf|switch|case|break|continue|struct|class|template|namespace|using)\s*[\(;\{=]/.test(q.question);
        const hasCodeBlock = q.question.includes('```');
        const hasIndentedBlock = /\n\s{4,}\S/.test(q.question);
        if (hasCode && !hasCodeBlock && !hasIndentedBlock) {
          issues.push({ paperId, severity: 'P2', qId: q.id, desc: '题干含代码但未使用代码块格式' });
        }
        
        // 8. 多余连续空格
        if (/  +/.test(q.question) && !q.question.includes('```')) {
          issues.push({ paperId, severity: 'P2', qId: q.id, desc: '题干含多余连续空格' });
        }
      }
      
      // 9. explanation 缺失或过短
      if (!q.explanation || (typeof q.explanation === 'string' && q.explanation.trim().length < 5)) {
        if (q.type !== 'programming') {
          issues.push({ paperId, severity: 'P2', qId: q.id, desc: `解析缺失或过短: "${(q.explanation || '').substring(0, 20)}"` });
        }
      }
    }
    
  } catch (err) {
    issues.push({ paperId, severity: 'P0', qId: '整体', desc: `加载失败: ${err.message}` });
  }
}

async function main() {
  const levels = await loadAllPapers();
  console.log(`[AUDIT] 扫描 ${levels.length} 份试卷...\n`);
  
  for (const levelInfo of levels) {
    await auditPaper(levelInfo);
  }
  
  // 按严重度分组输出
  const p0 = issues.filter(i => i.severity === 'P0');
  const p1 = issues.filter(i => i.severity === 'P1');
  const p2 = issues.filter(i => i.severity === 'P2');
  
  if (p0.length) {
    console.log('=== P0 严重问题 ===');
    for (const i of p0) console.log(`  [${i.paperId}] Q${i.qId}: ${i.desc}`);
  }
  
  if (p1.length) {
    console.log(`\n=== P1 重要问题 (${p1.length}) ===`);
    for (const i of p1) console.log(`  [${i.paperId}] Q${i.qId}: ${i.desc}`);
  }
  
  console.log(`\n=== P2 建议优化 (${p2.length}) ===`);
  
  // P2 按类型统计
  const p2Types = {};
  for (const i of p2) {
    const key = i.desc.split(':')[0] || i.desc.substring(0, 20);
    p2Types[key] = (p2Types[key] || 0) + 1;
  }
  for (const [type, count] of Object.entries(p2Types).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${type}: ${count}`);
  }
  
  // 输出 P1 详细列表供修复
  console.log('\n=== P1 详细列表（用于修复）===');
  console.log(JSON.stringify(p1, null, 2));
  
  // 输出选项前缀和编号前缀的 P2 详情
  const fixableP2 = p2.filter(i => i.desc.includes('字母前缀') || i.desc.includes('编号前缀'));
  if (fixableP2.length) {
    console.log('\n=== 可快速修复的 P2（选项前缀/编号前缀）===');
    console.log(JSON.stringify(fixableP2, null, 2));
  }
  
  // 输出 score 缺失详情
  const scoreMissing = p2.filter(i => i.desc.includes('score'));
  if (scoreMissing.length) {
    console.log('\n=== score 缺失详情 ===');
    console.log(JSON.stringify(scoreMissing, null, 2));
  }
  
  console.log(`\n总计: P0=${p0.length}, P1=${p1.length}, P2=${p2.length}`);
}

main();
