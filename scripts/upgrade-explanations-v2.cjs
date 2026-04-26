/**
 * 批量升级 Level 1 试卷的 explanation 格式
 * 
 * 策略：
 * - 选择题：自动生成 **答案：X** + **解析：**（保留旧内容）+ 逐选项辨析 + **考点：**
 * - 判断题：自动生成 **答案：正确/错误** + **判定依据：**（保留旧内容）+ **纠错/易混概念** + **考点：**
 * - 编程题：保留原样
 * 
 * 用法：node scripts/upgrade-explanations.cjs src/data/gesp/level1/2025-12-l1.js
 */

const fs = require('fs');
const path = require('path');

const ANSWER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// 标签名映射
const TAG_NAMES = {
  basics: '基础语法', functions: '函数', io: '输入输出',
  condition: '条件判断', loop: '循环', array: '数组与字符串',
  operator: '运算符', computer: '计算机常识',
};

function extractTagNames(tagsStr) {
  // 从 tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.loop] 提取标签名
  const matches = tagsStr.match(/LEVEL1_TAGS\.(\w+)/g);
  if (!matches) return '';
  return matches.map(m => {
    const key = m.replace('LEVEL1_TAGS.', '');
    return TAG_NAMES[key] || key;
  }).join('、');
}

function processFile(filePath) {
  console.log(`\n处理: ${path.basename(filePath)}`);
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let modified = false;
  let upgradedCount = 0;
  let skippedCount = 0;

  // 逐行扫描，找到 explanation: '...' 的位置
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // 匹配 explanation: '...' (单行单引号格式)
    const singleLineMatch = line.match(/^(\s*)explanation:\s*'(.+)',\s*$/);
    if (singleLineMatch) {
      const indent = singleLineMatch[1];
      const oldText = singleLineMatch[2];
      
      // 向上查找题目信息（type, answer, options, tags）
      const questionInfo = findQuestionInfo(lines, i);
      
      if (questionInfo && questionInfo.type === 'programming') {
        skippedCount++;
        i++;
        continue;
      }
      
      if (questionInfo) {
        const newExplanation = buildNewExplanation(oldText, questionInfo, indent);
        if (newExplanation) {
          lines[i] = newExplanation;
          modified = true;
          upgradedCount++;
        }
      }
      
      i++;
      continue;
    }
    
    i++;
  }

  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`  ✅ 升级了 ${upgradedCount} 道题的解析，跳过 ${skippedCount} 道`);
  } else {
    console.log(`  无需修改`);
  }
  
  return upgradedCount;
}

function findQuestionInfo(lines, explanationLineIdx) {
  // 向上搜索同一题目块中的 type, answer, options
  // 向下搜索 tags（tags 通常在 explanation 之后）
  let type = null;
  let answer = null;
  let options = [];
  let tags = '';
  let blockStart = -1;
  
  // 向上搜索
  for (let j = explanationLineIdx - 1; j >= 0 && j > explanationLineIdx - 40; j--) {
    const l = lines[j].trim();
    
    if (l.startsWith('type:')) {
      type = l.match(/type:\s*'(\w+)'/)?.[1];
    }
    if (l.startsWith('answer:')) {
      const ansMatch = l.match(/answer:\s*(\d+)/);
      if (ansMatch) answer = parseInt(ansMatch[1]);
    }
    if (l.startsWith('options:')) {
      // 选项可能跨多行，简单处理单行情况
      const optMatch = l.match(/options:\s*\[(.+)\]/);
      if (optMatch) {
        options = optMatch[1].split(/',\s*'/).map(s => s.replace(/[\[\]']/g, '').trim());
      }
    }
    if (l === '{') {
      blockStart = j;
      break;
    }
  }
  
  // 如果选项是多行格式，重新搜索
  if (options.length === 0) {
    for (let j = explanationLineIdx - 1; j >= 0 && j > explanationLineIdx - 40; j--) {
      const l = lines[j].trim();
      if (l.startsWith('options:')) {
        let k = j + 1;
        while (k < explanationLineIdx && !lines[k].trim().startsWith('answer:')) {
          const optMatch = lines[k].trim().match(/^'(.+?)'/);
          if (optMatch) options.push(optMatch[1]);
          k++;
        }
        break;
      }
    }
  }
  
  // 向下搜索 tags（在 explanation 之后）
  for (let j = explanationLineIdx + 1; j < lines.length && j < explanationLineIdx + 5; j++) {
    const l = lines[j].trim();
    if (l.startsWith('tags:')) {
      tags = lines[j];
      break;
    }
    if (l === '},') break; // 到了题目块结尾
  }
  
  if (!type) return null;
  return { type, answer, options, tags };
}

function buildNewExplanation(oldText, info, indent) {
  // 修复：模板字符串中不需要转义单引号，将 \\' 替换为 '
  // 修复：模板字符串中反引号需要转义，将 ` 替换为 \`
  // 修复：模板字符串中 ${ 需要转义
  const safeText = oldText.replace(/\\'/g, "'").replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  const tagNames = extractTagNames(info.tags);
  
  if (info.type === 'judge') {
    const isCorrect = info.answer === 0;
    const answerDisplay = isCorrect ? '正确' : '错误';
    
    let newExp = `${indent}explanation: \`**答案：${answerDisplay}**\n`;
    newExp += `${indent}\n`;
    newExp += `${indent}**判定依据：**\n`;
    newExp += `${indent}${safeText}\n`;
    newExp += `${indent}\n`;
    
    if (!isCorrect) {
      newExp += `${indent}**纠错：** 原命题说法有误。${safeText}\n`;
      newExp += `${indent}\n`;
    }
    
    newExp += `${indent}**易混概念：** `;
    
    // 根据标签给出不同的易混概念提示
    if (info.tags.includes('operator')) {
      newExp += `注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。\n`;
    } else if (info.tags.includes('loop')) {
      newExp += `注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。\n`;
    } else if (info.tags.includes('condition')) {
      newExp += `注意逻辑运算符 && 和 || 的短路求值特性，以及运算符优先级。\n`;
    } else if (info.tags.includes('io')) {
      newExp += `注意 printf 格式化占位符与参数类型的匹配，以及转义字符的用法。\n`;
    } else if (info.tags.includes('basics')) {
      newExp += `注意区分关键字与标识符、编译器与操作系统的职能边界。\n`;
    } else {
      newExp += `注意区分相关概念的适用范围和边界条件。\n`;
    }
    
    newExp += `${indent}\n`;
    newExp += `${indent}**考点：** ${tagNames}\`,`;
    
    return newExp;
  }
  
  if (info.type === 'single' || info.type === 'multiple') {
    const answerDisplay = ANSWER_LETTERS[info.answer] || String(info.answer);
    
    let newExp = `${indent}explanation: \`**答案：${answerDisplay}**\n`;
    newExp += `${indent}\n`;
    newExp += `${indent}**解析：**\n`;
    newExp += `${indent}${safeText}\n`;
    newExp += `${indent}\n`;
    
    // 逐选项辨析
    if (info.options.length > 0) {
      info.options.forEach((opt, idx) => {
        const letter = ANSWER_LETTERS[idx];
        if (idx === info.answer) {
          newExp += `${indent}- **${letter} ${truncate(opt, 40)}**：正确答案。\n`;
        } else {
          newExp += `${indent}- **${letter} ${truncate(opt, 40)}**：错误。\n`;
        }
      });
    }
    
    newExp += `${indent}\n`;
    newExp += `${indent}**考点：** ${tagNames}\`,`;
    
    return newExp;
  }
  
  return null;
}

function truncate(str, maxLen) {
  if (str.length <= maxLen) return str.replace(/`/g, '\\`');
  return str.substring(0, maxLen).replace(/`/g, '\\`') + '...';
}

// 主入口
const target = process.argv[2];
if (!target) {
  console.log('用法: node upgrade-explanations.cjs <文件路径>');
  process.exit(1);
}

const stat = fs.statSync(target);
if (stat.isDirectory()) {
  const files = fs.readdirSync(target)
    .filter(f => f.endsWith('-l1.js') && f !== 'shared.js')
    .sort();
  let total = 0;
  for (const file of files) {
    total += processFile(path.join(target, file));
  }
  console.log(`\n总计升级: ${total} 道题`);
} else {
  processFile(target);
}
