/**
 * 批量注入 Level 3 试卷客观题的 tags 字段
 * 
 * 根据题目文本和解析内容的关键词匹配，自动推断考点标签。
 * 对于已有 tags 的客观题，跳过不修改。
 * 对于编程题，跳过不修改。
 * 
 * 同时修复 explanation 中 **考点：** 行为空的问题。
 * 
 * L3 考点标签体系（基于已有 tags 文件 2023-03/06/2026-03 统计）：
 * - 计算机基础、数制转换、二进制、补码、进制转换、十六进制
 * - 位运算、异或、左移、按位取反
 * - 数组、数组与字符串、sizeof
 * - 字符串、字符数组、字符与ASCII、ASCII码、substr
 * - 类型转换
 * - 运算符、未定义行为
 * - 函数、条件判断、循环
 * - 排序、算法思维、算法、算法思想
 * - 枚举、模拟、贪心、前缀和
 * - 流程图、程序分析
 * - 逻辑判断
 * 
 * 用法：node scripts/inject-tags-l3.cjs [文件或目录]
 */

const fs = require('fs');
const path = require('path');

/**
 * L3 考点标签推断规则
 * 每条规则：{ keywords, tags, type }
 * - keywords: 匹配题目/解析的关键词正则数组
 * - tags: 推断出的标签数组
 * - type: 'single' 仅匹配选择题, 'judge' 仅匹配判断题, 'any' 两者都匹配
 * 
 * 规则按优先级排列，先匹配到的优先级更高
 */
const TAG_RULES = [
  // ===== 进制与编码 =====
  { keywords: [/二进制/, /补码/, /原码/, /反码/], tags: ['二进制', '补码'], type: 'any' },
  { keywords: [/进制转换/, /八进制/, /十六进制/, /0x[0-9a-fA-F]/], tags: ['进制转换'], type: 'any' },
  { keywords: [/二进制.*转换|转换.*二进制|十进制.*二进制|二进制.*十进制/], tags: ['数制转换'], type: 'any' },
  { keywords: [/\(2\)/, /₂/, /三进制/, /四进制/], tags: ['数制转换'], type: 'any' },

  // ===== 位运算 =====
  { keywords: [/异或/, /\^.*交换|交换.*异或/], tags: ['位运算', '异或'], type: 'any' },
  { keywords: [/左移|<<|右移|>>/], tags: ['位运算'], type: 'any' },
  { keywords: [/按位取反|~/], tags: ['位运算', '按位取反'], type: 'any' },
  { keywords: [/位运算|按位与|按位或|&.*\||\|.*&/], tags: ['位运算'], type: 'any' },

  // ===== 字符与ASCII =====
  { keywords: [/ASCII|ascii/], tags: ['字符与ASCII'], type: 'any' },
  { keywords: [/字符.*编码|编码.*字符|字符.*值/], tags: ['字符与ASCII'], type: 'any' },
  { keywords: [/字符数组/], tags: ['字符串', '字符数组'], type: 'any' },
  { keywords: [/substr/], tags: ['字符串', 'substr'], type: 'any' },
  { keywords: [/strlen|strcmp|strcpy|strcat/], tags: ['字符串'], type: 'any' },
  { keywords: [/字符串/], tags: ['字符串'], type: 'any' },
  { keywords: [/toupper|tolower|大小写/], tags: ['字符与ASCII'], type: 'any' },

  // ===== 数组 =====
  { keywords: [/sizeof/], tags: ['数组', 'sizeof'], type: 'any' },
  { keywords: [/数组.*定义|定义.*数组|一维数组|二维数组|int\s+a\[/], tags: ['数组'], type: 'any' },
  { keywords: [/数组/], tags: ['数组'], type: 'any' },

  // ===== 类型转换 =====
  { keywords: [/隐式转换|类型转换|强制转换|int.*double|double.*int|浮点.*整型|整型.*浮点/], tags: ['类型转换'], type: 'any' },

  // ===== 运算符（仅匹配明确的运算符考点）=====
  { keywords: [/未定义行为|undefined/], tags: ['运算符', '未定义行为'], type: 'any' },
  { keywords: [/运算符.*优先级|优先级.*运算符|优先级高于|优先级低于/], tags: ['运算符'], type: 'any' },
  { keywords: [/自增|自减|\+\+.*——|——.*\+\+/], tags: ['运算符'], type: 'any' },
  { keywords: [/逗号表达式/], tags: ['运算符'], type: 'any' },
  { keywords: [/三目运算|条件表达式/], tags: ['运算符'], type: 'any' },

  // ===== 函数 =====
  { keywords: [/递归/], tags: ['函数', '算法思维'], type: 'any' },
  { keywords: [/函数.*参数|参数.*传递|值传递|引用传递/], tags: ['函数'], type: 'any' },
  { keywords: [/min\(\)|max\(\)|abs\(\)/], tags: ['函数'], type: 'any' },

  // ===== 排序 =====
  { keywords: [/排序|冒泡|选择排序|插入排序|sort/], tags: ['排序'], type: 'any' },

  // ===== 算法思维 =====
  { keywords: [/二分查找|二分搜索|折半/], tags: ['算法思维'], type: 'any' },
  { keywords: [/前缀和|差分/], tags: ['前缀和', '算法思维'], type: 'any' },
  { keywords: [/贪心/], tags: ['贪心', '算法思维'], type: 'any' },
  { keywords: [/枚举|暴力/], tags: ['枚举', '算法思维'], type: 'any' },
  { keywords: [/回溯/], tags: ['算法思维'], type: 'any' },
  { keywords: [/BFS|DFS|广度|深度.*搜索/], tags: ['算法思维'], type: 'any' },

  // ===== 流程图 =====
  { keywords: [/流程图/], tags: ['流程图'], type: 'any' },

  // ===== 程序分析（仅匹配明确的程序分析考点）=====
  { keywords: [/时间复杂度|空间复杂度|O\(/], tags: ['程序分析'], type: 'any' },

  // ===== 循环 =====
  { keywords: [/for\s*\(|while\s*\(|do\s*while/], tags: ['循环'], type: 'any' },
  { keywords: [/continue|break/], tags: ['循环'], type: 'any' },

  // ===== 条件判断 =====
  { keywords: [/if.*else|switch.*case/], tags: ['条件判断'], type: 'any' },

  // ===== 逻辑判断 =====
  { keywords: [/&&|\|\||逻辑与|逻辑或|逻辑非|短路/], tags: ['逻辑判断'], type: 'any' },

  // ===== 计算机基础 =====
  { keywords: [/操作系统|编译器|编译.*链接|CPU|内存|存储器/], tags: ['计算机基础'], type: 'any' },
  { keywords: [/App|应用软件|应用.*程序/], tags: ['计算机基础'], type: 'any' },
  { keywords: [/unsigned|signed|字节|byte/], tags: ['计算机基础'], type: 'any' },
];

/**
 * 根据题目和解析文本推断 tags
 */
function inferTags(questionText, explanationText, questionType) {
  const merged = `${questionText} ${explanationText}`.toLowerCase();
  const originalMerged = `${questionText} ${explanationText}`;
  const inferredTags = [];
  const matchedRules = new Set();

  for (const rule of TAG_RULES) {
    // 检查类型匹配
    if (rule.type !== 'any' && rule.type !== questionType) continue;

    // 检查关键词匹配
    const matched = rule.keywords.some(kw => kw.test(originalMerged) || kw.test(merged));
    if (matched) {
      // 避免重复标签
      for (const tag of rule.tags) {
        if (!inferredTags.includes(tag)) {
          inferredTags.push(tag);
        }
      }
    }
  }

  // 判断题自动加 "判断题" 前缀
  if (questionType === 'judge' && !inferredTags.includes('判断题')) {
    inferredTags.unshift('判断题');
  }

  // 如果没推断出任何标签，根据题型给默认标签
  if (inferredTags.length === 0) {
    if (questionType === 'judge') {
      inferredTags.push('判断题', '程序分析');
    } else {
      inferredTags.push('程序分析');
    }
  }

  return inferredTags;
}

/**
 * 从多行格式中查找题目信息
 */
function findQuestionInfo(lines, currentLineIdx) {
  let type = null, answer = null, question = '', hasTags = false;

  // 向上搜索
  for (let j = currentLineIdx - 1; j >= 0 && j > currentLineIdx - 50; j--) {
    const l = lines[j];
    if (!type) {
      let m = l.match(/type:\s*'(\w+)'/);
      if (!m) m = l.match(/type:\s*"(\w+)"/);
      if (m) type = m[1];
    }
    if (answer === null) { const m = l.match(/answer:\s*(\d+)/); if (m) answer = parseInt(m[1]); }
    if (!question) { const m = l.match(/question:\s*`(.{0,300})/); if (m) question = m[1]; }
    if (/tags:/.test(l)) { hasTags = true; }
    if (/^\{/.test(l.trim())) break;
  }

  // 向下搜索 tags
  for (let j = currentLineIdx + 1; j < lines.length && j < currentLineIdx + 15; j++) {
    if (/tags:/.test(lines[j])) { hasTags = true; break; }
    if (lines[j].trim() === '},' || lines[j].trim() === '}') break;
  }

  return { type, answer, question, hasTags };
}

function processFile(filePath) {
  console.log(`\n处理: ${path.basename(filePath)}`);
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let modified = false;
  let injectedCount = 0;
  let skippedCount = 0;
  let updatedCount = 0;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // 查找 **考点：** 行（升级后的增强格式）
    const tagLineMatch = line.match(/^(\s*)\*\*考点：\*\*\s*$/);
    if (tagLineMatch) {
      const indent = tagLineMatch[1];
      
      // 查找题目信息
      const info = findQuestionInfo(lines, i);
      
      if (!info || info.type === 'programming') {
        skippedCount++;
        i++;
        continue;
      }
      
      // 检查是否已有 tags 字段
      if (info.hasTags) {
        // 已有 tags，但考点行可能为空，需要用 tags 内容填充
        // 向下找 tags 行
        let tagsContent = '';
        for (let j = i + 1; j < lines.length && j < i + 15; j++) {
          const tm = lines[j].match(/tags:\s*\[([^\]]*)\]/);
          if (tm) {
            tagsContent = tm[1];
            break;
          }
          if (lines[j].trim() === '},' || lines[j].trim() === '}') break;
        }
        
        if (tagsContent) {
          // 提取 tag 名称
          let tagNames = tagsContent.match(/['"][^'"]+['"]/g);
          if (tagNames) {
            tagNames = tagNames.map(m => m.replace(/['"]/g, '')).join('、');
            // 去掉 "编程题" 和 "判断题" 前缀（这些是元标签，不是考点）
            tagNames = tagNames.replace(/^判断题[、、]*/, '').replace(/、判断题/g, '').replace(/^编程题[、、]*/, '').replace(/、编程题/g, '');
            if (tagNames) {
              lines[i] = `${indent}**考点：** ${tagNames}`;
              updatedCount++;
              modified = true;
            }
          }
        }
        
        i++;
        continue;
      }
      
      // 没有 tags，需要推断并注入
      // 获取 explanation 文本（向上搜索）
      let explanationText = '';
      for (let j = i - 1; j >= 0 && j > i - 30; j--) {
        const expMatch = lines[j].match(/\*\*解析：\*\*/);
        if (expMatch) {
          // 从解析行开始收集文本
          let k = j + 1;
          while (k < i && !lines[k].match(/\*\*考点/)) {
            explanationText += lines[k].replace(/`/g, '').trim() + ' ';
            k++;
          }
          break;
        }
        const judgeMatch = lines[j].match(/\*\*判定依据：\*\*/);
        if (judgeMatch) {
          let k = j + 1;
          while (k < i && !lines[k].match(/\*\*(考点|纠错|易混)/)) {
            explanationText += lines[k].replace(/`/g, '').trim() + ' ';
            k++;
          }
          break;
        }
      }
      
      // 推断 tags
      const inferredTags = inferTags(info.question || '', explanationText, info.type);
      
      if (inferredTags.length > 0) {
        // 1. 更新 **考点：** 行
        const tagDisplay = inferredTags.filter(t => t !== '判断题' && t !== '编程题').join('、');
        lines[i] = `${indent}**考点：** ${tagDisplay}`;
        
        // 2. 在 `,` 行（模板字符串结束）后面插入 tags 字段
        // 找到模板字符串结束行（`,）
        let templateEndIdx = -1;
        for (let j = i + 1; j < lines.length && j < i + 5; j++) {
          if (lines[j].trim() === '`,' || lines[j].match(/^\s*`,\s*$/)) {
            templateEndIdx = j;
            break;
          }
        }
        
        if (templateEndIdx !== -1) {
          // 在模板字符串结束行后插入 tags
          const tagsLine = `${indent}tags: ['${inferredTags.join("', '")}'],`;
          lines.splice(templateEndIdx + 1, 0, tagsLine);
          injectedCount++;
          modified = true;
        }
      }
      
      i++;
      continue;
    }
    
    i++;
  }

  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`  ✅ 注入 ${injectedCount} 个 tags，更新 ${updatedCount} 个考点行，跳过 ${skippedCount} 个`);
  } else {
    console.log(`  无需修改`);
  }
  
  return injectedCount + updatedCount;
}

// 主入口
const target = process.argv[2];
if (!target) {
  console.log('用法: node scripts/inject-tags-l3.cjs <文件路径或目录>');
  process.exit(1);
}

const stat = fs.statSync(target);
if (stat.isDirectory()) {
  const files = fs.readdirSync(target)
    .filter(f => f.endsWith('-l3.js'))
    .sort();
  let total = 0;
  for (const file of files) {
    total += processFile(path.join(target, file));
  }
  console.log(`\n总计处理: ${total} 个考点`);
} else {
  processFile(target);
}
