/**
 * 批量升级 Level 3 试卷的 explanation 格式
 * 
 * 将旧格式 explanation: '纯文本' 转为增强模板字符串格式：
 * - 选择题：**答案：X** + **解析：** + 逐选项辨析（含具体理由）+ **考点：**
 * - 判断题：**答案：正确/错误** + **判定依据：** + **纠错：**(错误时) + **易混概念：** + **考点：**
 * - 编程题：保留原样（需人工编写高质量解析）
 * 
 * L3 数据格式特点：
 * - 全部换行格式（explanation 独占一行），无压缩行
 * - 引号混合：大部分用单引号 '，2023-03 全用双引号 "，2023-09/2026-03 有少量双引号
 * - tags 为中文标签，混合引号格式
 * - 编程题在独立 programmingQuestions 数组中（2023-03 除外，无编程题）
 * - 标准配置：15单选 + 10判断 + 2编程
 * 
 * 用法：node scripts/upgrade-explanations-l3.cjs [文件或目录]
 */

const fs = require('fs');
const path = require('path');

const ANSWER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// L3 针对性易混概念映射
const PITFALL_RULES = [
  // 二进制/进制转换
  { keywords: [/二进制/, /进制/, /补码/, /原码/, /反码/], pitfall: '正数的原码、反码、补码相同；负数的补码 = 原码取反 + 1。注意符号位（最高位）不参与取反。' },
  { keywords: [/进制转换/, /八进制/, /十六进制/, /0x/, /0o/], pitfall: '进制转换时注意：十进制→N进制用除N取余法，N进制→十进制用按权展开法。小数部分用乘N取整法。' },
  { keywords: [/补码/], pitfall: '8位补码表示范围：-128~127。求负数补码：先写出绝对值的二进制，取反加一。' },
  // 位运算
  { keywords: [/位运算/, /按位/, /移位/], pitfall: '位运算符作用于二进制位：& 按位与、| 按位或、^ 按位异或、~ 按位取反、<< 左移、>> 右移。注意与逻辑运算符 &&、|| 区分。' },
  { keywords: [/异或/, /\^/], pitfall: '异或性质：a^a=0, a^0=a, a^b^b=a。异或交换：a=a^b; b=a^b; a=a^b; 可实现无临时变量交换。' },
  { keywords: [/移位/, /<<|>>/], pitfall: '左移 n 位相当于乘 2^n，右移 n 位相当于除以 2^n（向下取整）。注意算术右移（补符号位）与逻辑右移（补0）的区别。' },
  // 数组
  { keywords: [/数组/, /下标/, /越界/], pitfall: 'C++ 数组下标从 0 开始，访问 a[n] 时下标范围是 0~n-1。越界访问是未定义行为，不会自动报错。' },
  { keywords: [/字符数组/, /\\0/], pitfall: 'C 风格字符串以 \'\\0\' 结尾。char str[] = "abc" 实际占 4 字节（含 \\0），而 char str[] = {\'a\',\'b\',\'c\'} 占 3 字节（无 \\0）。' },
  // 字符与ASCII
  { keywords: [/字符/, /ASCII/, /char/], pitfall: '字符参与运算时使用 ASCII 码值：\'A\'=65, \'a\'=97, \'0\'=48。\'1\' 的 ASCII 值是 49，不是 1。' },
  { keywords: [/大小写转换/], pitfall: '大写转小写：ch + 32 或 ch | 0x20；小写转大写：ch - 32 或 ch & 0xDF。前提是字符确实是字母。' },
  // 函数
  { keywords: [/函数/, /参数/, /返回值/], pitfall: '函数参数传递：值传递不影响实参，引用传递（&）可修改实参。递归必须有终止条件，否则栈溢出。' },
  { keywords: [/递归/], pitfall: '递归三要素：终止条件、递归调用、状态传递。注意递归深度限制，深层递归可能导致栈溢出。' },
  // 排序
  { keywords: [/排序/, /冒泡/, /选择/, /插入排序/], pitfall: '冒泡排序 O(n²)，选择排序 O(n²)，插入排序 O(n²)（最好 O(n)）。稳定排序：冒泡、插入；不稳定排序：选择。' },
  // 算法思维
  { keywords: [/二分/, /折半/], pitfall: '二分查找前提：序列有序。注意边界条件：while(left<=right) 还是 while(left<right)，mid 的计算用 left+(right-left)/2 防溢出。' },
  { keywords: [/前缀和/, /差分/], pitfall: '前缀和 pre[i] = a[0]+a[1]+...+a[i]，区间和 [l,r] = pre[r]-pre[l-1]。差分是前缀和的逆运算，用于区间修改。' },
  { keywords: [/枚举/, /暴力/], pitfall: '枚举需要确定枚举范围和剪枝条件。注意时间复杂度，1e8 次运算约为 1 秒。' },
  { keywords: [/贪心/], pitfall: '贪心要求局部最优能推导全局最优，需证明贪心选择性质。不是所有问题都适合贪心。' },
  // 流程图
  { keywords: [/流程图/, /菱形/, /椭圆/, /平行四边形/], pitfall: '流程图中：椭圆=开始/结束，矩形=处理，菱形=判断，平行四边形=输入/输出，箭头=流向。' },
  // 类型转换
  { keywords: [/隐式转换/, /类型转换/, /提升/, /强制转换/], pitfall: 'C++ 隐式转换规则：char/short → int → long → double。赋值时右值类型转换为左值类型，可能丢失精度。' },
  // 运算符
  { keywords: [/运算符.*优先级/, /优先级/], pitfall: 'C++ 运算符优先级（从高到低）：算术(* / %) → 关系(> < ==) → 逻辑(&& ||) → 赋值(=)。位运算优先级低于关系运算符。' },
  { keywords: [/逗号表达式/], pitfall: '逗号表达式从左到右依次求值，整个表达式的值是最后一个子表达式的值。' },
  { keywords: [/三目/, /条件表达式/], pitfall: '条件表达式 a?b:c 中，仅执行 b 或 c 中的一个，不会两个都执行。' },
  // 循环
  { keywords: [/循环/, /for/, /while/, /do.*while/], pitfall: 'for 循环结束后循环变量为使条件为假的第一个值。do-while 至少执行一次循环体。' },
  { keywords: [/continue/, /break/], pitfall: 'continue 跳过本次循环剩余语句，break 跳出当前循环。两者都不影响外层循环。' },
  // 未定义行为
  { keywords: [/未定义行为/, /undefined/], pitfall: 'C++ 未定义行为包括：数组越界、对同一变量多次无序修改（如 i++ + i++）、解引用空指针等。结果不可预测。' },
  // 程序分析
  { keywords: [/时间复杂度/, /复杂度/, /O\(/], pitfall: '常见复杂度排序：O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2^n)。1e5 规模下 O(n²) 通常超时。' },
  // 字符串
  { keywords: [/字符串/, /string/, /strlen/], pitfall: 'C++ string 的 length() 返回字符数（不含 \\0）。C 风格 strlen() 遇 \\0 停止计数。string 可直接用 + 拼接。' },
  // 输入输出
  { keywords: [/printf/, /scanf/, /cout/, /cin/, /格式化/], pitfall: 'printf 格式化占位符：%d=int, %f=double, %s=string, %c=char, %%=%。scanf 需传地址 &。' },
];

function findRelevantPitfall(questionText, explanation, tags) {
  const merged = `${questionText} ${explanation}`.toLowerCase();
  for (const rule of PITFALL_RULES) {
    if (rule.keywords.some(kw => kw.test(merged))) return rule.pitfall;
  }
  // 从 tags 推断
  const tagStr = Array.isArray(tags) ? tags.join(' ') : (tags || '');
  if (/位运算|异或|移位/.test(tagStr)) return '注意位运算符与逻辑运算符的区别，以及运算符优先级。';
  if (/进制|二进制|补码/.test(tagStr)) return '注意进制转换方法：整数部分除N取余，小数部分乘N取整。补码注意符号位。';
  if (/数组|下标/.test(tagStr)) return '注意数组下标从 0 开始，越界访问是未定义行为。';
  if (/字符|ASCII/.test(tagStr)) return '字符参与运算时使用 ASCII 码值，\'0\'=48, \'A\'=65, \'a\'=97。';
  if (/排序/.test(tagStr)) return '注意不同排序算法的时间复杂度和稳定性差异。';
  if (/递归|函数/.test(tagStr)) return '递归必须有终止条件，注意递归深度和参数传递方式。';
  if (/循环/.test(tagStr)) return '注意循环变量的终值，以及 continue/break 的区别。';
  if (/逻辑|条件/.test(tagStr)) return '注意逻辑运算符 && 和 || 的短路求值特性。';
  if (/字符串/.test(tagStr)) return '注意 C 风格字符串以 \\0 结尾，与字符数组的区别。';
  if (/算法|复杂度/.test(tagStr)) return '注意时间复杂度分析，1e5 规模下 O(n²) 通常超时。';
  if (/运算符|表达式/.test(tagStr)) return '注意运算符优先级，位运算符优先级低于算术和关系运算符。';
  if (/流程图/.test(tagStr)) return '流程图中：椭圆=开始/结束，矩形=处理，菱形=判断，平行四边形=输入/输出。';
  if (/输入输出|格式化/.test(tagStr)) return '注意 printf 格式化占位符与参数类型的匹配。';
  return '注意区分相关概念的适用范围和边界条件。';
}

function explainWrongOption(optText, questionText, correctExplanation, answerIdx, idx) {
  const opt = optText.toLowerCase();
  // L3 常见错误选项模式
  if (/补码|原码|反码/.test(opt)) return '混淆了原码、反码、补码的转换规则，注意负数补码是取反加一。';
  if (/进制|二进制|八进制|十六进制/.test(opt)) return '进制转换结果有误，请重新按权展开计算。';
  if (/位运算|按位|异或|移位/.test(opt)) return '位运算结果计算有误，请逐步推演每一位的运算。';
  if (/越界|下标/.test(opt)) return '数组下标从 0 开始，请仔细验证下标范围。';
  if (/ASCII|字符/.test(opt)) return '字符的 ASCII 码值需要查表确认，\'0\'=48, \'A\'=65, \'a\'=97。';
  if (/排序|稳定|不稳定/.test(opt)) return '不同排序算法的稳定性不同，冒泡/插入稳定，选择不稳定。';
  if (/递归|终止/.test(opt)) return '递归必须有终止条件，请检查递归出口是否正确。';
  if (/死循环|无限循环/.test(opt)) return '需要验证循环条件是否最终会变为假。';
  if (/报错|编译错误|无法执行/.test(opt)) return 'C++ 对某些写法可能不会报错，而是产生隐式转换或未定义行为。';
  if (/^\d+(\.\d+)?$/.test(optText.trim()) || /^-\d+/.test(optText.trim())) return '该数值与正确计算结果不符，请重新验算。';
  if (/=\s*=|%\s*\d|\/\s*\d|\+\+|--|>>|<<|&|\||\^/.test(opt)) return '该代码逻辑与题目要求不符，请逐步推演。';
  return '与题目要求不符，请对照正确解析重新理解。';
}

function extractTagNames(tagsStr) {
  // 支持单引号和双引号两种格式
  let matches = tagsStr.match(/'([^']+)'/g);
  if (!matches) matches = tagsStr.match(/"([^"]+)"/g);
  if (!matches) return tagsStr.replace(/[\[\]]/g, '').trim();
  return matches.map(m => m.replace(/['"]/g, '')).join('、');
}

/**
 * 从一行文本中提取题目信息
 */
function extractQuestionInfoFromLine(line) {
  let type = null, answer = null, options = [], tags = '', question = '';
  
  // type：支持单引号和双引号
  let typeMatch = line.match(/type:\s*'(\w+)'/);
  if (!typeMatch) typeMatch = line.match(/type:\s*"(\w+)"/);
  if (typeMatch) type = typeMatch[1];
  
  // answer
  const ansMatch = line.match(/answer:\s*(\d+)/);
  if (ansMatch) answer = parseInt(ansMatch[1]);
  
  // question
  const qMatch = line.match(/question:\s*`(.{0,200})/);
  if (qMatch) question = qMatch[1];
  
  // options：尝试匹配 options: [...] 格式
  const optMatch = line.match(/options:\s*\[(.+?)\]\s*,\s*answer:/);
  if (optMatch) {
    options = optMatch[1].split(/['"],\s*['"]/).map(s => s.replace(/[\[\]'"]/g, '').trim());
  }
  
  // tags：支持单引号和双引号
  let tagsMatch = line.match(/tags:\s*\['([^']]*)'\]/);
  if (!tagsMatch) tagsMatch = line.match(/tags:\s*\["([^"]]*)"\]/);
  if (!tagsMatch) tagsMatch = line.match(/tags:\s*\[([^\]]*)\]/);
  if (tagsMatch) tags = `tags: [${tagsMatch[1]}]`;
  
  return { type, answer, options, tags, question };
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
    if (!type) {
      let m = l.match(/type:\s*'(\w+)'/);
      if (!m) m = l.match(/type:\s*"(\w+)"/);
      if (m) type = m[1];
    }
    if (answer === null) { const m = l.match(/answer:\s*(\d+)/); if (m) answer = parseInt(m[1]); }
    if (!question) { const m = l.match(/question:\s*`(.{0,200})/); if (m) question = m[1]; }
    if (options.length === 0) {
      const m = l.match(/options:\s*\[(.+)\]/);
      if (m) options = m[1].split(/['"],\s*['"]/).map(s => s.replace(/[\[\]'"]/g, '').trim());
    }
    if (/^\{/.test(l.trim())) break;
  }
  
  // 多行选项
  if (options.length === 0) {
    for (let j = explanationLineIdx - 1; j >= 0 && j > explanationLineIdx - 50; j--) {
      if (lines[j].includes('options:')) {
        let k = j + 1;
        while (k < explanationLineIdx && !lines[k].includes('answer:')) {
          // 支持单引号和双引号选项
          let m = lines[k].trim().match(/^'(.+?)'/);
          if (!m) m = lines[k].trim().match(/^"(.+?)"/);
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
      let m = lines[j].match(/tags:\s*\[([^\]]*)\]/);
      if (m) { tags = `tags: [${m[1]}]`; break; }
      if (lines[j].trim() === '},' || lines[j].trim() === '}') break;
    }
  }
  
  if (!type) return null;
  return { type, answer, options, tags, question };
}

/**
 * 构建新 explanation 的各行内容
 */
function buildNewExplanationLines(oldText, info, indent) {
  if (oldText.startsWith('**答案：')) return null;
  
  // 先处理转义引号，再转义反斜杠（必须在转义引号之后，避免双重转义），
  // 最后转义模板字符串特殊字符
  const safeText = oldText
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\/g, '\\\\')  // 反斜杠必须在引号处理之后转义
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  const tagNames = extractTagNames(info.tags);
  const lines = [];
  
  if (info.type === 'judge') {
    const isCorrect = info.answer === 0;
    const answerDisplay = isCorrect ? '正确' : '错误';
    const pitfall = findRelevantPitfall(info.question || '', oldText, 
      info.tags ? (info.tags.match(/['"][^'"]+['"]/g) || []).map(m => m.replace(/['"]/g, '')) : []);
    
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
        // 转义反斜杠（避免模板字符串中的八进制转义）和反引号
        const escapedOpt = truncated.replace(/\\/g, '\\\\').replace(/`/g, '\\`');
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
    
    // ===== 情况1：单引号换行格式 =====
    // explanation: '旧文本',
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
    
    // ===== 情况2：双引号换行格式 =====
    // explanation: "旧文本",
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

// 主入口
const target = process.argv[2];
if (!target) {
  console.log('用法: node scripts/upgrade-explanations-l3.cjs <文件路径或目录>');
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
  console.log(`\n总计升级: ${total} 道题`);
} else {
  processFile(target);
}
