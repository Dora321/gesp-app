/**
 * 批量升级 Level 1 试卷的 explanation 格式 v3
 * 
 * 在 v2 基础上进一步优化：
 * - 选择题：每个错误选项补充"为什么错"的具体理由
 * - 判断题：易混概念改为针对本题的具体提醒（而非模板化）
 * - 编程题：补充解题步骤和关键点
 * 
 * 用法：node scripts/upgrade-explanations-v3.cjs [文件或目录]
 * 示例：node scripts/upgrade-explanations-v3.cjs src/data/gesp/level1/2025-12-l1.js
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

// 针对性易混概念映射（根据题目关键词匹配）
const PITFALL_RULES = [
  // 计算机组成
  { keywords: [/操作系统/, /编译器/, /翻译/], pitfall: '操作系统负责管理硬件和软件资源，编译器负责将源代码翻译成目标代码，两者职能不同。' },
  { keywords: [/输入设备/, /输出设备/, /传感器/], pitfall: '输入设备负责采集信息传入计算机，输出设备负责呈现结果。传感器属于输入设备。' },
  { keywords: [/处理器/, /CPU/, /内存/], pitfall: 'CPU 负责运算和判断，内存负责存储数据，两者职能不同，不能混淆。' },
  // 运算符
  { keywords: [/优先级/, /运算顺序/], pitfall: 'C++ 运算符优先级：算术(* / %) > 关系(> <) > 逻辑(&& ||) > 赋值(=)，同级从左到右（赋值从右到左）。' },
  { keywords: [/取模/, /%/, /余数/], pitfall: '取模运算 % 要求操作数必须为整数，结果符号与左操作数相同。注意区分 /（整除）和 %（取余）。' },
  { keywords: [/整除/, /\/\s*\d/], pitfall: '整数除法会截断小数部分（向零取整），如 7/2=3 而非 3.5。若需保留小数，至少一个操作数应为浮点数。' },
  { keywords: [/逗号表达式/, /逗号.*表达式/], pitfall: '逗号表达式从左到右依次求值，整个表达式的值是最后一个子表达式的值。' },
  { keywords: [/自增/, /自减/, /\+\+/, /--/], pitfall: '前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。' },
  { keywords: [/赋值.*比较/, /=.*==/, /==.*=/], pitfall: '赋值 = 和比较 == 容易混淆。if(x=1) 是赋值而非比较，值恒为真（非零）。' },
  { keywords: [/短路/, /&&/, /\|\|/], pitfall: '&& 遇假即停，|| 遇真即停。短路求值意味着后面的表达式可能根本不会执行。' },
  { keywords: [/隐式转换/, /类型转换/, /提升/], pitfall: 'C++ 会自动进行隐式类型转换：int 与 double 运算时，int 提升为 double。三目运算符也会做类型提升。' },
  // 循环
  { keywords: [/循环.*次数/, /执行.*次/, /i\s*<\s*\d/, /i\s*<=\s*\d/], pitfall: '循环次数 = 终值 - 初值（< 时）或 终值 - 初值 + 1（<= 时）。注意 < 和 <= 差一次。' },
  { keywords: [/continue/, /跳过/], pitfall: 'continue 跳过本次循环剩余语句，直接进入下一轮判断；break 直接跳出整个循环。两者效果完全不同。' },
  { keywords: [/break/, /跳出/], pitfall: 'break 跳出当前所在的最内层循环或 switch，不影响外层循环。它只能用于循环和 switch 中。' },
  { keywords: [/死循环/, /无限循环/], pitfall: '死循环通常因为循环条件永远为真，或循环体内修改循环变量的方式导致条件无法变为假。' },
  { keywords: [/循环变量.*终值/, /循环后.*i/], pitfall: '循环结束后，循环变量的值是使循环条件为假的第一个值。如 for(i=0;i<10;i++) 结束后 i=10，不是 9。' },
  // 条件判断
  { keywords: [/if.*else/, /条件.*分支/, /三目/], pitfall: 'if-else 链中只有第一个满足条件的分支会执行。注意条件表达式的求值顺序和优先级。' },
  { keywords: [/逻辑.*运算/, /&&.*\|\|/, /\|\|.*&&/], pitfall: '&& 优先级高于 ||，所以 A || B && C 等价于 A || (B && C)，而非 (A || B) && C。' },
  // 输入输出
  { keywords: [/printf/, /格式化/], pitfall: 'printf 格式化占位符必须与参数类型匹配：%d 对应 int，%f 对应 double，%s 对应字符串。类型不匹配会导致输出错误。' },
  { keywords: [/scanf/, /输入/], pitfall: 'scanf 需要传地址（&变量名），忘记 & 会导致未定义行为。scanf 以空格/换行作为分隔符。' },
  { keywords: [/cin/, /cout/], pitfall: 'cin >> 会自动跳过前导空白字符，cout << 连续输出时没有自动分隔。' },
  { keywords: [/%%/, /转义/], pitfall: 'printf 中 %% 输出一个 %，\\n 输出换行，\\t 输出制表符。格式字符串中的普通字符原样输出。' },
  // 标识符
  { keywords: [/标识符/, /变量名/, /命名/], pitfall: '标识符只能由字母、数字、下划线组成，不能以数字开头，不能是关键字。C++ 严格区分大小写。' },
  { keywords: [/关键字/, /保留字/], pitfall: 'C++ 关键字（如 int, for, while, if 等）有特殊含义，不能用作变量名。但 keyword、main 等不是关键字。' },
  { keywords: [/大小写/, /区分大小写/], pitfall: 'C++ 标识符严格区分大小写：first 和 First 是两个不同的变量。' },
  // 数字处理
  { keywords: [/数位/, /个位/, /十位/, /百位/], pitfall: '取个位用 N%10，去个位用 N/10，取最高位用反复 N/10 直到 N<10。注意区分 % 和 / 在数位提取中的不同作用。' },
  { keywords: [/回文/, /对称/, /反转/], pitfall: '数字反转：每次取个位 (N%10) 拼接到新数的末尾 (new = new*10 + N%10)，同时 N/=10 去掉已处理的位。' },
  { keywords: [/整除/, /倍数/, /因数/], pitfall: '判断整除用 N%i==0，判断奇偶用 N%2==0。注意"整除"和"取余"是一对互补运算。' },
];

/**
 * 根据题目内容匹配最相关的易混概念
 */
function findRelevantPitfall(questionText, explanation, tags) {
  const merged = `${questionText} ${explanation}`.toLowerCase();
  
  for (const rule of PITFALL_RULES) {
    const matched = rule.keywords.some(kw => kw.test(merged));
    if (matched) return rule.pitfall;
  }
  
  // 兜底：根据标签给出通用提醒
  if (tags.includes('operator')) return '注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。';
  if (tags.includes('loop')) return '注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。';
  if (tags.includes('condition')) return '注意逻辑运算符 && 和 || 的短路求值特性，以及运算符优先级。';
  if (tags.includes('io')) return '注意 printf 格式化占位符与参数类型的匹配，以及转义字符的用法。';
  if (tags.includes('basics')) return '注意区分关键字与标识符、编译器与操作系统的职能边界。';
  return '注意区分相关概念的适用范围和边界条件。';
}

/**
 * 为错误选项生成针对性解释
 */
function explainWrongOption(optText, questionText, correctExplanation, answerIdx, idx) {
  const opt = optText.toLowerCase();
  const q = questionText.toLowerCase();
  
  // 常见错误模式匹配
  if (/变量名|标识符|命名/.test(opt)) {
    if (/下划线|_|开头/.test(opt)) return '下划线开头的标识符在 C++ 中是合法的。';
    if (/空格/.test(opt)) return 'C++ 标识符不能包含空格。';
    if (/关键字|保留字/.test(opt) && /不可以|不能/.test(opt)) return '需要区分哪些是真正的 C++ 关键字。';
  }
  
  if (/整除|除法|\/\s*2/.test(opt) && /0|1|2|3|4|5/.test(opt)) {
    return '整数除法会截断小数部分，请仔细验算。';
  }
  
  if (/取模|%/.test(opt)) {
    return '取模运算的结果需要仔细计算，注意运算符优先级。';
  }
  
  if (/死循环|无限循环|不会结束/.test(opt)) {
    return '需要验证循环条件是否最终会变为假。';
  }
  
  if (/报错|编译错误|无法执行/.test(opt)) {
    return 'C++ 对某些写法可能不会报错，而是产生未定义行为或隐式转换。';
  }
  
  // 如果选项是一个具体数值，提示需要验算
  if (/^\d+(\.\d+)?$/.test(optText.trim()) || /^-\d+/.test(optText.trim())) {
    return '该数值与正确计算结果不符，请重新验算。';
  }
  
  // 如果选项是代码片段
  if (/=\s*=|%\s*\d|\/\s*\d|\+\+|--/.test(opt)) {
    return '该代码逻辑与题目要求不符，请逐步推演。';
  }
  
  // 通用兜底
  return '与题目要求不符，请对照正确解析重新理解。';
}

function extractTagNames(tagsStr) {
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
  
  // 用动态 import 加载数据太复杂，改用正则逐题处理
  // 策略：找到每个 explanation 字段，判断是否需要增强
  
  // 统计
  let enhancedCount = 0;
  let skippedCount = 0;
  
  // 匹配整个 question 对象块
  const questionRegex = /\{[\s\S]*?id:\s*(\d+),[\s\S]*?type:\s*'(\w+)',[\s\S]*?explanation:\s*`([\s\S]*?)`[\s\S]*?tags:\s*\[([^\]]*)\][\s\S]*?\}/g;
  
  // 更简单的方式：逐个找到 explanation 块并增强
  // 找到所有模板字符串格式的 explanation
  
  // 我们用行处理方式
  const lines = content.split('\n');
  let i = 0;
  let modified = false;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // 查找 explanation: ` 开头的行（模板字符串格式）
    if (line.match(/^\s*explanation:\s*`/)) {
      const indent = line.match(/^(\s*)/)[1];
      const startLine = i;
      
      // 收集整个 explanation 模板字符串的内容
      let expContent = '';
      let j = i;
      let foundEnd = false;
      while (j < lines.length) {
        expContent += lines[j] + '\n';
        if (lines[j].includes('`,')) {
          foundEnd = true;
          break;
        }
        j++;
      }
      
      if (!foundEnd) { i++; continue; }
      
      // 向上搜索题目信息
      const questionInfo = findQuestionInfo(lines, startLine);
      if (!questionInfo) { i = j + 1; continue; }
      
      let newExp = null;
      
      if (questionInfo.type === 'programming') {
        newExp = enhanceProgrammingExplanation(expContent, questionInfo, indent);
      } else if (questionInfo.type === 'judge') {
        newExp = enhanceJudgeExplanation(expContent, questionInfo, indent);
      } else if (questionInfo.type === 'single' || questionInfo.type === 'multiple') {
        newExp = enhanceSingleExplanation(expContent, questionInfo, indent);
      }
      
      if (newExp && newExp !== expContent) {
        const oldLines = expContent.split('\n');
        const newLines = newExp.split('\n');
        lines.splice(startLine, oldLines.length, ...newLines);
        modified = true;
        enhancedCount++;
      } else {
        skippedCount++;
      }
      
      i = startLine + (newExp || expContent).split('\n').length;
      continue;
    }
    
    // 查找单行 explanation: '...' 格式
    const singleLineMatch = line.match(/^(\s*)explanation:\s*'(.+)',\s*$/);
    if (singleLineMatch) {
      // 旧格式，先跳过（v2 脚本已处理过）
      skippedCount++;
    }
    
    i++;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`  ✅ 增强了 ${enhancedCount} 道题的解析，跳过 ${skippedCount} 道`);
  } else {
    console.log(`  无需修改`);
  }
  
  return enhancedCount;
}

function findQuestionInfo(lines, explanationLineIdx) {
  let type = null;
  let answer = null;
  let options = [];
  let tags = '';
  let question = '';
  
  // 向上搜索
  for (let j = explanationLineIdx - 1; j >= 0 && j > explanationLineIdx - 50; j--) {
    const l = lines[j].trim();
    
    if (l.startsWith('type:')) {
      type = l.match(/type:\s*'(\w+)'/)?.[1];
    }
    if (l.startsWith('answer:')) {
      const ansMatch = l.match(/answer:\s*(\d+)/);
      if (ansMatch) answer = parseInt(ansMatch[1]);
    }
    if (l.startsWith('question:') && !question) {
      // 提取题目文本（简化版，取前100字符）
      question = l.replace(/^question:\s*`?/, '').substring(0, 200);
    }
    if (l.startsWith('options:')) {
      const optMatch = l.match(/options:\s*\[(.+)\]/);
      if (optMatch) {
        options = optMatch[1].split(/',\s*'/).map(s => s.replace(/[\[\]']/g, '').trim());
      }
    }
    if (l === '{' || l === '{,') {
      break;
    }
  }
  
  // 如果选项是多行格式
  if (options.length === 0) {
    for (let j = explanationLineIdx - 1; j >= 0 && j > explanationLineIdx - 50; j--) {
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
  
  // 向下搜索 tags
  for (let j = explanationLineIdx + 1; j < lines.length && j < explanationLineIdx + 10; j++) {
    const l = lines[j].trim();
    if (l.startsWith('tags:')) {
      tags = lines[j];
      break;
    }
    if (l === '},' || l === '}') break;
  }
  
  // 向上搜索 question
  if (!question) {
    for (let j = explanationLineIdx - 1; j >= 0 && j > explanationLineIdx - 50; j--) {
      const l = lines[j];
      if (l.trim().startsWith('question:')) {
        question = l.trim().replace(/^question:\s*`?/, '').substring(0, 200);
        break;
      }
    }
  }
  
  if (!type) return null;
  return { type, answer, options, tags, question };
}

/**
 * 增强选择题解析：为错误选项补充具体理由
 */
function enhanceSingleExplanation(expContent, info, indent) {
  // 检查是否已经有详细解释（选项行不只是"错误。"）
  const hasDetailedOptions = /错误[。，].{5,}/.test(expContent) || /错误：/.test(expContent);
  if (hasDetailedOptions) return null; // 已经有详细解释，跳过
  
  // 提取现有解析文本
  const analysisMatch = expContent.match(/\*\*解析：\*\*\s*\n([\s\S]*?)(?=\n\s*-\s*\*\*|$)/);
  const existingAnalysis = analysisMatch ? analysisMatch[1].trim() : '';
  
  // 提取考点
  const keyPointMatch = expContent.match(/\*\*考点：\*\*\s*(.+?)`/);
  const keyPoint = keyPointMatch ? keyPointMatch[1].trim() : extractTagNames(info.tags);
  
  // 提取答案
  const answerMatch = expContent.match(/\*\*答案：([A-F])\*\*/);
  const answerLetter = answerMatch ? answerMatch[1] : ANSWER_LETTERS[info.answer];
  
  // 重新构建选项分析
  let optionAnalysis = '';
  if (info.options.length > 0) {
    info.options.forEach((opt, idx) => {
      const letter = ANSWER_LETTERS[idx];
      const truncated = opt.length > 40 ? opt.substring(0, 40) + '...' : opt;
      if (idx === info.answer) {
        optionAnalysis += `${indent}- **${letter} ${truncated.replace(/`/g, '\\`')}**：正确答案。\n`;
      } else {
        const reason = explainWrongOption(opt, info.question || '', existingAnalysis, info.answer, idx);
        optionAnalysis += `${indent}- **${letter} ${truncated.replace(/`/g, '\\`')}**：错误。${reason}\n`;
      }
    });
  }
  
  // 重建 explanation
  let newExp = `${indent}explanation: \`**答案：${answerLetter}**\n`;
  newExp += `${indent}\n`;
  newExp += `${indent}**解析：**\n`;
  newExp += `${indent}${existingAnalysis}\n`;
  newExp += `${indent}\n`;
  newExp += optionAnalysis;
  newExp += `${indent}\n`;
  newExp += `${indent}**考点：** ${keyPoint}\`,`;
  
  return newExp;
}

/**
 * 增强判断题解析：将模板化易混概念替换为针对性提醒
 */
function enhanceJudgeExplanation(expContent, info, indent) {
  // 检查易混概念是否还是模板化的
  const pitfallMatch = expContent.match(/\*\*易混概念：\*\*\s*(.+?)(?:\n|$)/);
  if (!pitfallMatch) return null;
  
  const currentPitfall = pitfallMatch[1].trim();
  
  // 检查是否是模板化的易混概念（与规则完全匹配）
  const isTemplate = [
    '注意区分关键字与标识符、编译器与操作系统的职能边界。',
    '注意运算符优先级与整除/取模的区分，容易混淆不同运算的结果。',
    '注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。',
    '注意逻辑运算符 && 和 || 的短路求值特性，以及运算符优先级。',
    '注意 printf 格式化占位符与参数类型的匹配，以及转义字符的用法。',
    '注意区分相关概念的适用范围和边界条件。',
  ].includes(currentPitfall);
  
  if (!isTemplate) return null; // 已经是针对性的，跳过
  
  // 生成针对性的易混概念
  const newPitfall = findRelevantPitfall(info.question || '', '', 
    info.tags ? info.tags.match(/LEVEL1_TAGS\.(\w+)/g)?.map(m => m.replace('LEVEL1_TAGS.', '')) || [] : []);
  
  if (newPitfall === currentPitfall) return null; // 没有更好的替代
  
  // 替换易混概念
  let newExp = expContent.replace(
    /\*\*易混概念：\*\*\s*.+?(?:\n|$)/,
    `**易混概念：** ${newPitfall}\n`
  );
  
  return newExp;
}

/**
 * 增强编程题解析：补充解题步骤
 */
function enhanceProgrammingExplanation(expContent, info, indent) {
  // 编程题的 explanation 通常是单行简短文本
  // 检查是否过于简短
  const textOnly = expContent.replace(/^\s*explanation:\s*'?`?/, '').replace(/['"`]?\s*,?\s*$/, '').trim();
  if (textOnly.length > 100) return null; // 已经有足够内容
  
  // 不自动增强编程题，因为需要人工编写高质量解析
  return null;
}

// 主入口
const target = process.argv[2];
if (!target) {
  console.log('用法: node upgrade-explanations-v3.cjs <文件路径或目录>');
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
  console.log(`\n总计增强: ${total} 道题`);
} else {
  processFile(target);
}
