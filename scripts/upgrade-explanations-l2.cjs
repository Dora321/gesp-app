/**
 * 批量升级 Level 2 试卷的 explanation 格式
 * 
 * 将旧格式 explanation: '纯文本' 转为增强模板字符串格式：
 * - 选择题：**答案：X** + **解析：** + 逐选项辨析（含具体理由）+ **考点：**
 * - 判断题：**答案：正确/错误** + **判定依据：** + **纠错：**(错误时) + **易混概念：** + **考点：**
 * - 编程题：保留原样（需人工编写高质量解析）
 * 
 * 支持两种行格式：
 * 1. 换行格式：explanation 独占一行
 * 2. 压缩行格式：整个题目对象在一行（如 { id: 1, type: 'single', ..., explanation: '...', tags: [...] }）
 * 
 * 用法：node scripts/upgrade-explanations-l2.cjs [文件或目录]
 */

const fs = require('fs');
const path = require('path');

const ANSWER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// 针对性易混概念映射
const PITFALL_RULES = [
  { keywords: [/操作系统/, /编译器/, /翻译/], pitfall: '操作系统负责管理硬件和软件资源，编译器负责将源代码翻译成目标代码，两者职能不同。' },
  { keywords: [/输入设备/, /输出设备/, /传感器/], pitfall: '输入设备负责采集信息传入计算机，输出设备负责呈现结果。传感器属于输入设备。' },
  { keywords: [/处理器/, /CPU/, /内存/], pitfall: 'CPU 负责运算和判断，内存负责存储数据，两者职能不同，不能混淆。' },
  { keywords: [/存储器/, /硬盘/, /U盘/, /光盘/], pitfall: '不同存储介质原理不同：硬盘/U盘基于磁性或电子存储（受磁场影响），光盘基于激光（不受磁场影响）。' },
  { keywords: [/网络/, /LAN/, /WAN/, /MAN/, /PAN/], pitfall: 'PAN（个人）、LAN（局域）、MAN（城域）、WAN（广域）覆盖范围依次增大，注意区分。' },
  { keywords: [/优先级/, /运算顺序/], pitfall: 'C++ 运算符优先级：算术(* / %) > 关系(> <) > 逻辑(&& ||) > 赋值(=)，同级从左到右（赋值从右到左）。' },
  { keywords: [/取模/, /%/, /余数/], pitfall: '取模运算 % 要求操作数必须为整数，结果符号与左操作数相同。注意区分 /（整除）和 %（取余）。' },
  { keywords: [/整除/, /除法/], pitfall: '整数除法会截断小数部分（向零取整），如 7/2=3 而非 3.5。若需保留小数，至少一个操作数应为浮点数。' },
  { keywords: [/逗号表达式/], pitfall: '逗号表达式从左到右依次求值，整个表达式的值是最后一个子表达式的值。' },
  { keywords: [/自增/, /自减/, /\+\+/, /--/], pitfall: '前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。' },
  { keywords: [/赋值.*比较/, /=.*==/, /==.*=/], pitfall: '赋值 = 和比较 == 容易混淆。if(x=1) 是赋值而非比较，值恒为真（非零）。' },
  { keywords: [/短路/, /&&/, /\|\|/], pitfall: '&& 遇假即停，|| 遇真即停。短路求值意味着后面的表达式可能根本不会执行。' },
  { keywords: [/隐式转换/, /类型转换/, /提升/], pitfall: 'C++ 会自动进行隐式类型转换：int 与 double 运算时，int 提升为 double；bool 与 int 运算时，bool 提升为 int。' },
  { keywords: [/德摩根/, /!\(/, /逻辑.*等价/], pitfall: '德摩根定律：!(A && B) = !A || !B，!(A || B) = !A && !B。注意取反时 && 和 || 要互换。' },
  { keywords: [/not/, /逻辑非/], pitfall: '`not` 是 C++ 中 `!` 的替代写法。`not 0` 为真，`not 非零值` 为假。' },
  { keywords: [/浮点/, /精度/, /0\.1/, /0\.2/], pitfall: '浮点数在计算机中用二进制存储，0.1、0.2 等无法精确表示，导致运算结果可能存在微小误差。这是 IEEE 754 标准的固有特性。' },
  { keywords: [/printf.*%g/, /%g/, /有效数字/], pitfall: '`%g` 自动选择 `%f` 或 `%e` 格式，默认显示 6 位有效数字。' },
  { keywords: [/continue/, /跳过/], pitfall: 'continue 跳过本次循环剩余语句，直接进入下一轮判断；break 直接跳出整个循环。两者效果完全不同。' },
  { keywords: [/break/, /跳出/], pitfall: 'break 跳出当前所在的最内层循环或 switch，不影响外层循环。' },
  { keywords: [/死循环/, /无限循环/], pitfall: '死循环通常因为循环条件永远为真，或循环体内修改循环变量的方式导致条件无法变为假。' },
  { keywords: [/循环变量.*终值/, /循环后.*i/], pitfall: '循环结束后，循环变量的值是使循环条件为假的第一个值。如 for(i=0;i<10;i++) 结束后 i=10，不是 9。' },
  { keywords: [/if.*else/, /条件.*分支/, /三目/], pitfall: 'if-else 链中只有第一个满足条件的分支会执行。' },
  { keywords: [/逻辑.*运算/, /&&.*\|\|/, /\|\|.*&&/], pitfall: '&& 优先级高于 ||，所以 A || B && C 等价于 A || (B && C)。' },
  { keywords: [/printf/, /格式化/], pitfall: 'printf 格式化占位符必须与参数类型匹配：%d 对应 int，%f 对应 double。' },
  { keywords: [/scanf/, /输入/], pitfall: 'scanf 需要传地址（&变量名），忘记 & 会导致未定义行为。' },
  { keywords: [/cin/, /cout/], pitfall: 'cin >> 会自动跳过前导空白字符，cout << 连续输出时没有自动分隔。' },
  { keywords: [/%%/, /转义/], pitfall: 'printf 中 %% 输出一个 %，\\n 输出换行。' },
  { keywords: [/标识符/, /变量名/, /命名/], pitfall: '标识符只能由字母、数字、下划线组成，不能以数字开头，不能是关键字。C++ 严格区分大小写。' },
  { keywords: [/关键字/, /保留字/], pitfall: 'C++ 关键字（如 int, for, while, if 等）有特殊含义，不能用作变量名。但 max、printf 等是库函数名，不是关键字。' },
  { keywords: [/大小写/, /区分大小写/], pitfall: 'C++ 标识符严格区分大小写：first 和 First 是两个不同的变量。' },
  { keywords: [/数位/, /个位/, /十位/, /百位/], pitfall: '取个位用 N%10，去个位用 N/10。注意区分 % 和 / 在数位提取中的不同作用。' },
  { keywords: [/字符/, /ASCII/], pitfall: '字符参与算术运算时使用 ASCII 码值，如 \'A\'=65, \'a\'=97, \'0\'=48。\'4\' 的 ASCII 值是 52，不是 4。' },
  { keywords: [/流程图/, /菱形/, /椭圆/, /平行四边形/], pitfall: '流程图中：椭圆=开始/结束，矩形=处理，菱形=判断，平行四边形=输入/输出。' },
  { keywords: [/数据类型/, /int/, /double/, /bool/, /char/], pitfall: 'C++ 基本数据类型大小固定：char(1字节)、bool(1字节)、int(通常4字节)、double(8字节)。' },
  { keywords: [/图形/, /三角形/, /金字塔/, /矩形/, /正方形/], pitfall: '打印图形题的关键：外层循环控制行数，内层循环控制每行的输出。注意空格和字符的数量关系。' },
];

function findRelevantPitfall(questionText, explanation, tags) {
  const merged = `${questionText} ${explanation}`.toLowerCase();
  for (const rule of PITFALL_RULES) {
    if (rule.keywords.some(kw => kw.test(merged))) return rule.pitfall;
  }
  const tagStr = Array.isArray(tags) ? tags.join(' ') : (tags || '');
  if (/运算符|操作符|运算/.test(tagStr)) return '注意运算符优先级与整除/取模的区分。';
  if (/循环/.test(tagStr)) return '注意循环变量的终值，以及 continue/break 的区别。';
  if (/逻辑|条件/.test(tagStr)) return '注意逻辑运算符 && 和 || 的短路求值特性。';
  if (/输入输出|格式化/.test(tagStr)) return '注意 printf 格式化占位符与参数类型的匹配。';
  if (/计算机|硬件|网络/.test(tagStr)) return '注意区分不同计算机组件的职能边界。';
  if (/变量|标识符|关键字/.test(tagStr)) return '注意区分关键字与标识符的规则。';
  if (/字符|ASCII/.test(tagStr)) return '字符参与算术运算时使用 ASCII 码值。';
  return '注意区分相关概念的适用范围和边界条件。';
}

function explainWrongOption(optText, questionText, correctExplanation, answerIdx, idx) {
  const opt = optText.toLowerCase();
  if (/变量名|标识符|命名/.test(opt)) {
    if (/下划线|_|开头/.test(opt)) return '下划线开头的标识符在 C++ 中是合法的。';
    if (/空格/.test(opt)) return 'C++ 标识符不能包含空格。';
  }
  if (/整除|除法/.test(opt) && /\d/.test(opt)) return '整数除法会截断小数部分，请仔细验算。';
  if (/取模|%/.test(opt)) return '取模运算的结果需要仔细计算，注意运算符优先级。';
  if (/死循环|无限循环/.test(opt)) return '需要验证循环条件是否最终会变为假。';
  if (/报错|编译错误|无法执行/.test(opt)) return 'C++ 对某些写法可能不会报错，而是产生隐式转换。';
  if (/^\d+(\.\d+)?$/.test(optText.trim()) || /^-\d+/.test(optText.trim())) return '该数值与正确计算结果不符，请重新验算。';
  if (/=\s*=|%\s*\d|\/\s*\d|\+\+|--/.test(opt)) return '该代码逻辑与题目要求不符，请逐步推演。';
  return '与题目要求不符，请对照正确解析重新理解。';
}

function extractTagNames(tagsStr) {
  const matches = tagsStr.match(/'([^']+)'/g);
  if (!matches) return tagsStr.replace(/[\[\]]/g, '').trim();
  return matches.map(m => m.replace(/'/g, '')).join('、');
}

/**
 * 从一行文本中提取题目信息（支持压缩行和换行格式）
 */
function extractQuestionInfoFromLine(line) {
  let type = null, answer = null, options = [], tags = '', question = '';
  
  const typeMatch = line.match(/type:\s*'(\w+)'/);
  if (typeMatch) type = typeMatch[1];
  
  const ansMatch = line.match(/answer:\s*(\d+)/);
  if (ansMatch) answer = parseInt(ansMatch[1]);
  
  const qMatch = line.match(/question:\s*`(.{0,200})/);
  if (qMatch) question = qMatch[1];
  
  // 选项：尝试匹配 options: [...] 格式
  const optMatch = line.match(/options:\s*\[(.+?)\]\s*,\s*answer:/);
  if (optMatch) {
    options = optMatch[1].split(/',\s*'/).map(s => s.replace(/[\[\]']/g, '').trim());
  }
  
  // tags
  const tagsMatch = line.match(/tags:\s*\[([^\]]*)\]/);
  if (tagsMatch) tags = `tags: [${tagsMatch[1]}]`;
  
  return { type, answer, options, tags, question };
}

function processFile(filePath) {
  console.log(`\n处理: ${path.basename(filePath)}`);
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  let modified = false;
  let upgradedCount = 0;
  let skippedCount = 0;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    
    // ===== 情况1：压缩行格式 =====
    // 整个题目对象在一行，包含 explanation: '...' 或 explanation: "..."
    // 如: { id: 1, type: 'single', ..., explanation: '旧文本', tags: ['xxx'] },
    const compressedSingleMatch = line.match(/^(\s*)\{.*explanation:\s*'(.+?)'(,\s*tags:\s*\[[^\]]*\]\s*\}\s*,?\s*)$/);
    const compressedDoubleMatch = line.match(/^(\s*)\{.*explanation:\s*"(.+?)"(,\s*tags:\s*\[[^\]]*\]\s*\}\s*,?\s*)$/);
    const compressedMatch = compressedSingleMatch || compressedDoubleMatch;
    
    if (compressedMatch) {
      const indent = compressedMatch[1];
      const oldText = compressedMatch[2];
      const afterExpAndClose = compressedMatch[3]; // 如: ", tags: ['xxx'] }," 或 ", tags: ['xxx'] },"
      
      // 提取题目信息
      const info = extractQuestionInfoFromLine(line);
      
      if (!info.type || info.type === 'programming') {
        skippedCount++;
        i++;
        continue;
      }
      
      // 提取 explanation 前的部分
      const prefixMatch = line.match(/^(.*explanation:\s*)['"]/);
      const prefix = prefixMatch ? prefixMatch[1] : `${indent}explanation: `;
      
      // 提取 tags 和闭合括号
      const tagsMatch = afterExpAndClose.match(/,\s*(tags:\s*\[[^\]]*\])/);
      const tagsPart = tagsMatch ? tagsMatch[1] : '';
      const hasClosingBrace = /\}/.test(afterExpAndClose);
      
      // 构建新的 explanation
      const newExpLines = buildNewExplanationLines(oldText, info, indent);
      if (newExpLines) {
        // 替换整行：prefix + `模板字符串内容` + , + tags + 闭合括号
        let newLine = `${prefix}\`${newExpLines[0]}\n`;
        for (let k = 1; k < newExpLines.length; k++) {
          newLine += `${indent}${newExpLines[k]}\n`;
        }
        // 模板字符串结束标记
        newLine += `${indent}\`,`;
        // 添加 tags
        if (tagsPart) {
          newLine += `\n${indent}${tagsPart}`;
        }
        // 闭合括号
        if (hasClosingBrace) {
          newLine += `\n${indent}},`;
        }
        
        lines[i] = newLine;
        modified = true;
        upgradedCount++;
      }
      
      i++;
      continue;
    }
    
    // ===== 情况2：换行格式 =====
    // explanation 独占一行（或在行首缩进后）
    const singleLineMatch = line.match(/^(\s*)explanation:\s*'(.+)',?\s*$/);
    if (singleLineMatch) {
      const indent = singleLineMatch[1];
      const oldText = singleLineMatch[2];
      
      const info = findQuestionInfoMultiLine(lines, i);
      
      if (info && info.type === 'programming') {
        skippedCount++;
        i++;
        continue;
      }
      
      if (info) {
        const newExpLines = buildNewExplanationLines(oldText, info, indent);
        if (newExpLines) {
          let newLine = `${indent}explanation: \`${newExpLines[0]}\n`;
          for (let k = 1; k < newExpLines.length; k++) {
            newLine += `${indent}${newExpLines[k]}\n`;
          }
          newLine += `${indent}\`,`;
          lines[i] = newLine;
          modified = true;
          upgradedCount++;
        }
      }
      
      i++;
      continue;
    }
    
    // 双引号换行格式
    const doubleLineMatch = line.match(/^(\s*)explanation:\s*"(.+)",?\s*$/);
    if (doubleLineMatch) {
      const indent = doubleLineMatch[1];
      const oldText = doubleLineMatch[2];
      
      const info = findQuestionInfoMultiLine(lines, i);
      
      if (info && info.type === 'programming') {
        skippedCount++;
        i++;
        continue;
      }
      
      if (info) {
        const newExpLines = buildNewExplanationLines(oldText, info, indent);
        if (newExpLines) {
          let newLine = `${indent}explanation: \`${newExpLines[0]}\n`;
          for (let k = 1; k < newExpLines.length; k++) {
            newLine += `${indent}${newExpLines[k]}\n`;
          }
          newLine += `${indent}\`,`;
          lines[i] = newLine;
          modified = true;
          upgradedCount++;
        }
      }
      
      i++;
      continue;
    }
    
    // ===== 情况3：压缩行中 explanation 后面没有 tags（tags 在下一行或不存在） =====
    // 如: ], answer: 1, score: 2, explanation: '旧文本', tags: ['xxx'] },
    const partialCompressedMatch = line.match(/^(\s*).*explanation:\s*'(.+?)'(,\s*tags:\s*\[[^\]]*\]\s*\}?\s*,?\s*)$/);
    if (partialCompressedMatch && !compressedMatch) {
      const indent = partialCompressedMatch[1];
      const oldText = partialCompressedMatch[2];
      const afterPart = partialCompressedMatch[3];
      
      // 提取题目信息（从当前行和上方行）
      const info = findQuestionInfoMultiLine(lines, i);
      
      if (!info || info.type === 'programming') {
        skippedCount++;
        i++;
        continue;
      }
      
      const prefixMatch = line.match(/^(.*explanation:\s*)'/);
      const prefix = prefixMatch ? prefixMatch[1] : `${indent}explanation: `;
      
      const tagsMatch = afterPart.match(/,\s*(tags:\s*\[[^\]]*\])/);
      const tagsPart = tagsMatch ? tagsMatch[1] : '';
      const hasClosingBrace = /\}/.test(afterPart);
      
      const newExpLines = buildNewExplanationLines(oldText, info, indent);
      if (newExpLines) {
        let newLine = `${prefix}\`${newExpLines[0]}\n`;
        for (let k = 1; k < newExpLines.length; k++) {
          newLine += `${indent}${newExpLines[k]}\n`;
        }
        // 模板字符串结束标记
        newLine += `${indent}\`,`;
        if (tagsPart) {
          newLine += `\n${indent}${tagsPart}`;
        }
        if (hasClosingBrace) {
          newLine += `\n${indent}},`;
        }
        
        lines[i] = newLine;
        modified = true;
        upgradedCount++;
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

/**
 * 从多行格式中查找题目信息（向上搜索）
 */
function findQuestionInfoMultiLine(lines, explanationLineIdx) {
  let type = null, answer = null, options = [], tags = '', question = '';
  
  // 先从当前行提取
  const currentInfo = extractQuestionInfoFromLine(lines[explanationLineIdx]);
  type = currentInfo.type;
  answer = currentInfo.answer;
  options = currentInfo.options;
  tags = currentInfo.tags;
  question = currentInfo.question;
  
  // 向上搜索补充
  for (let j = explanationLineIdx - 1; j >= 0 && j > explanationLineIdx - 50; j--) {
    const l = lines[j];
    if (!type) { const m = l.match(/type:\s*'(\w+)'/); if (m) type = m[1]; }
    if (answer === null) { const m = l.match(/answer:\s*(\d+)/); if (m) answer = parseInt(m[1]); }
    if (!question) { const m = l.match(/question:\s*`(.{0,200})/); if (m) question = m[1]; }
    if (options.length === 0) {
      const m = l.match(/options:\s*\[(.+)\]/);
      if (m) options = m[1].split(/',\s*'/).map(s => s.replace(/[\[\]']/g, '').trim());
    }
    if (/^\{/.test(l.trim())) break;
  }
  
  // 多行选项
  if (options.length === 0) {
    for (let j = explanationLineIdx - 1; j >= 0 && j > explanationLineIdx - 50; j--) {
      if (lines[j].includes('options:')) {
        let k = j + 1;
        while (k < explanationLineIdx && !lines[k].includes('answer:')) {
          const m = lines[k].trim().match(/^'(.+?)'/);
          if (m) options.push(m[1]);
          k++;
        }
        break;
      }
      if (/^\{/.test(lines[j].trim())) break;
    }
  }
  
  // 向下搜索 tags
  if (!tags) {
    for (let j = explanationLineIdx + 1; j < lines.length && j < explanationLineIdx + 10; j++) {
      const m = lines[j].match(/tags:\s*\[([^\]]*)\]/);
      if (m) { tags = `tags: [${m[1]}]`; break; }
      if (lines[j].trim() === '},' || lines[j].trim() === '}') break;
    }
  }
  
  if (!type) return null;
  return { type, answer, options, tags, question };
}

/**
 * 构建新 explanation 的各行内容（不含 explanation: ` 前缀和 `, 后缀）
 * 返回字符串数组，每个元素是一行
 */
function buildNewExplanationLines(oldText, info, indent) {
  if (oldText.startsWith('**答案：')) return null;
  
  const safeText = oldText.replace(/\\'/g, "'").replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  const tagNames = extractTagNames(info.tags);
  const lines = [];
  
  if (info.type === 'judge') {
    const isCorrect = info.answer === 0;
    const answerDisplay = isCorrect ? '正确' : '错误';
    const pitfall = findRelevantPitfall(info.question || '', oldText, 
      info.tags ? info.tags.match(/'([^']+)'/g)?.map(m => m.replace(/'/g, '')) || [] : []);
    
    lines.push(`**答案：${answerDisplay}**`);
    lines.push('');
    lines.push('**判定依据：**');
    lines.push(safeText);
    lines.push('');
    if (!isCorrect) {
      lines.push('**纠错：** 原命题说法有误。' + safeText);
      lines.push('');
    }
    lines.push('**易混概念：** ' + pitfall);
    lines.push('');
    lines.push('**考点：** ' + tagNames);
  } else if (info.type === 'single' || info.type === 'multiple') {
    const answerDisplay = ANSWER_LETTERS[info.answer] || String(info.answer);
    
    lines.push(`**答案：${answerDisplay}**`);
    lines.push('');
    lines.push('**解析：**');
    lines.push(safeText);
    lines.push('');
    
    if (info.options.length > 0) {
      info.options.forEach((opt, idx) => {
        const letter = ANSWER_LETTERS[idx];
        const truncated = opt.length > 40 ? opt.substring(0, 40) + '...' : opt;
        const escapedOpt = truncated.replace(/`/g, '\\`');
        if (idx === info.answer) {
          lines.push(`- **${letter} ${escapedOpt}**：正确答案。`);
        } else {
          const reason = explainWrongOption(opt, info.question || '', oldText, info.answer, idx);
          lines.push(`- **${letter} ${escapedOpt}**：错误。${reason}`);
        }
      });
    }
    
    lines.push('');
    lines.push('**考点：** ' + tagNames);
  } else {
    return null;
  }
  
  return lines;
}

// 主入口
const target = process.argv[2];
if (!target) {
  console.log('用法: node scripts/upgrade-explanations-l2.cjs <文件路径或目录>');
  process.exit(1);
}

const stat = fs.statSync(target);
if (stat.isDirectory()) {
  const files = fs.readdirSync(target)
    .filter(f => f.endsWith('-l2.js'))
    .sort();
  let total = 0;
  for (const file of files) {
    total += processFile(path.join(target, file));
  }
  console.log(`\n总计升级: ${total} 道题`);
} else {
  processFile(target);
}
