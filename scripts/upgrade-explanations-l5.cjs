/**
 * 批量升级 Level 5 试卷的 explanation 格式
 *
 * 将旧格式 explanation: "纯文本" 转为增强模板字符串格式：
 * - 选择题：**答案：X** + **解析：** + 逐选项辨析（含具体理由）+ **考点：**
 * - 判断题：**答案：正确/错误** + **判定依据：** + **纠错：**(错误时) + **易混概念：** + **考点：**
 * - 编程题：**解析：** + 原解析文本（保留，与 L1 一致）
 *
 * L5 数据格式特点：
 * - 全部双引号格式（type: "single" / "judge"，explanation: "..."，tags: ["..."]）
 * - explanation 为单行双引号纯文本
 * - 编程题在文件顶部 const programmingQuestions 中定义，并通过 ...programmingQuestions 展开进 paperData.questions
 *   因此 paperData.questions 含 27 题（25 客观 + 2 编程），脚本需同时处理编程题解析才能达 100%
 * - tags 含冗余元数据（"客观题"/"单选题"/"判断题"/"GESP5级"），考点行需过滤
 * - 标准配置：15单选 + 10判断 + 2编程
 *
 * 用法：node scripts/upgrade-explanations-l5.cjs <文件路径或目录>
 */

const fs = require('fs');
const path = require('path');

const ANSWER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// 需要过滤的冗余元数据标签（不进入考点行）
const META_TAGS = new Set(['客观题', '单选题', '多选题', '判断题', '编程题', 'GESP5级', 'GESP5级']);

// L5 针对性易混概念 / 陷阱映射
const PITFALL_RULES = [
  // 链表
  { keywords: [/链表/, /指针.*next/, /节点/, /头结点/, /哨兵/], pitfall: '链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。' },
  { keywords: [/单向链表/, /双向链表/, /循环链表/], pitfall: '单向链表只能向后遍历；双向链表每个节点存前驱和后继；循环链表尾指向头。注意各类链表的边界操作。' },
  // 递归
  { keywords: [/递归/, /递推/, /回溯/], pitfall: '递归三要素：终止条件、递归调用、状态传递。注意递归深度限制，深层递归可能导致栈溢出；尾递归可被优化。' },
  // 二分查找
  { keywords: [/二分/, /折半/, /有序.*查找/], pitfall: '二分查找前提：序列有序。注意边界 while(left<=right) 还是 while(left<right)，mid 用 left+(right-left)/2 防溢出，以及更新左右边界时是否 ±1。' },
  // 排序
  { keywords: [/归并排序/, /merge/, /分治排序/], pitfall: '归并排序 O(n log n)，稳定，需要额外 O(n) 空间；核心是分解到最小再合并两个有序序列。' },
  { keywords: [/快速排序/, /快排/, /pivot/, /基准/], pitfall: '快速排序平均 O(n log n)，最坏 O(n²)（已有序且选端点为基准）。注意基准选取、partition 的双指针移动条件和边界。' },
  { keywords: [/排序/, /稳定性/, /时间复杂度/], pitfall: '常见排序复杂度：快排/归并/堆排 O(n log n)，冒泡/选择/插入 O(n²)。稳定：冒泡、插入、归并；不稳定：快排、选择、堆排。' },
  // 分治
  { keywords: [/分治/], pitfall: '分治三步骤：分解、解决子问题、合并结果。子问题应与原问题结构相同且规模更小，直到可直接求解。' },
  // 数论
  { keywords: [/数论/, /质因数/, /约数/, /最大公约数/, /gcd/, /欧几里得/], pitfall: 'gcd(a,b)=gcd(b, a%b)，辗转相除法；质因数分解用试除法到 sqrt(n)。注意 1 既不是质数也不是合数。' },
  { keywords: [/素数/, /质数/, /筛法/, /埃氏/, /欧拉筛/], pitfall: '埃氏筛：标记每个质数的倍数为合数，从 i*i 开始标记避免重复；欧拉筛每个合数只被最小质因子筛一次，效率更高。' },
  // 高精度
  { keywords: [/高精度/, /大整数/, /竖式/], pitfall: '高精度用数组按位存储，加法/乘法模拟竖式，注意进位（carry）处理和前导零。输出时逆序打印。' },
  // 复杂度
  { keywords: [/时间复杂度/, /复杂度/, /O\(/], pitfall: '常见复杂度：O(1)<O(log n)<O(n)<O(n log n)<O(n²)<O(2^n)。1e5 规模下 O(n²) 通常超时，需优化到 O(n log n) 或更低。' },
  // 指针/内存（L5 涉及）
  { keywords: [/指针/, /内存泄漏/, /野指针/, /空指针/], pitfall: '指针存储地址；解引用空指针或野指针是未定义行为；delete 后应将指针置 nullptr 避免悬垂指针。' },
  // 数组
  { keywords: [/数组/, /下标/, /越界/], pitfall: 'C++ 数组下标从 0 开始，访问 a[n] 时下标范围 0~n-1。越界访问是未定义行为。' },
  // 位运算
  { keywords: [/位运算/, /异或/, /移位/, /按位/], pitfall: '位运算作用于二进制位：& 与、| 或、^ 异或、~ 取反、<< 左移(乘2^n)、>> 右移(除2^n)。注意与逻辑运算符区别。' },
  // 树/图（部分 L5 涉及基础）
  { keywords: [/树/, /二叉树/, /dfs/, /bfs/, /深度优先/, /广度优先/], pitfall: 'DFS 用栈（递归或显式栈）深入到底再回溯；BFS 用队列逐层扩展。注意访问标记避免重复遍历和死循环。' },
];

function findRelevantPitfall(questionText, explanation, tags) {
  const merged = `${questionText} ${explanation}`.toLowerCase();
  for (const rule of PITFALL_RULES) {
    if (rule.keywords.some(kw => kw.test(merged))) return rule.pitfall;
  }
  const tagStr = Array.isArray(tags) ? tags.join(' ') : (tags || '');
  if (/链表/.test(tagStr)) return '注意链表节点的指针操作，避免指针丢失和空指针解引用。';
  if (/递归/.test(tagStr)) return '递归必须有终止条件，注意递归深度和参数传递。';
  if (/二分|查找/.test(tagStr)) return '二分查找要求序列有序，注意边界条件和 mid 计算防溢出。';
  if (/排序/.test(tagStr)) return '注意不同排序算法的时间复杂度和稳定性差异。';
  if (/数论|质因数|约数|gcd/.test(tagStr)) return '数论题注意质因数分解范围到 sqrt(n)，gcd 用辗转相除法。';
  if (/筛法|素数/.test(tagStr)) return '筛法注意标记起点从 i*i 开始，避免重复标记。';
  if (/高精度|大整数/.test(tagStr)) return '高精度模拟竖式，注意进位处理和前导零。';
  if (/分治/.test(tagStr)) return '分治注意子问题与原问题结构相同、规模更小。';
  if (/复杂度/.test(tagStr)) return '注意时间复杂度分析，1e5 规模下 O(n²) 通常超时。';
  if (/指针|内存/.test(tagStr)) return '注意空指针/野指针解引用和内存释放后置空。';
  if (/位运算/.test(tagStr)) return '注意位运算符与逻辑运算符区别及运算符优先级。';
  return '注意区分相关概念的适用范围和边界条件。';
}

function explainWrongOption(optText, questionText, correctExplanation, answerIdx, idx) {
  const opt = optText.toLowerCase();
  if (/链表/.test(opt)) return '对链表结构的理解有误，请重新分析节点的指针指向与边界情况。';
  if (/递归|递推/.test(opt)) return '递归/递推的终止条件或状态传递有误，请检查递归出口和参数变化。';
  if (/二分|折半/.test(opt)) return '二分查找的边界或 mid 更新有误，请验证循环条件和指针移动。';
  if (/排序|稳定|不稳定/.test(opt)) return '不同排序算法的稳定性或复杂度理解有误，请对照正确解析。';
  if (/数论|质因数|约数|gcd/.test(opt)) return '数论计算有误，请重新验算质因数分解或 gcd 过程。';
  if (/筛法|素数/.test(opt)) return '筛法标记范围或起点有误，请逐步推演标记过程。';
  if (/高精度|进位/.test(opt)) return '高精度进位处理有误，请模拟竖式逐位验算。';
  if (/指针|内存/.test(opt)) return '指针或内存理解有误，请检查解引用和释放逻辑。';
  if (/复杂度|O\(/.test(opt)) return '复杂度分析有误，请重新估算最坏情况时间复杂度。';
  if (/位运算|异或|移位/.test(opt)) return '位运算结果计算有误，请逐步推演每一位的运算。';
  if (/数组|下标|越界/.test(opt)) return '数组下标从 0 开始，请仔细验证下标范围。';
  if (/^\d+(\.\d+)?$/.test(optText.trim()) || /^-\d+/.test(optText.trim())) return '该数值与正确计算结果不符，请重新验算。';
  if (/=\s*=|%\s*\d|\/\s*\d|\+\+|--|>>|<<|&|\||\^/.test(opt)) return '该代码逻辑与题目要求不符，请逐步推演。';
  const truncated = optText.length > 30 ? optText.substring(0, 30) + '…' : optText;
  return `选项「${truncated}」与题目考查的知识点不符，请对照正确解析理解。`;
}

// 从题干/解析文本推断 L5 知识点（用于考点行，当题目仅有元数据标签时）
function inferTopic(questionText, explanation) {
  const text = `${questionText} ${explanation}`;
  const rules = [
    [/链表/, '链表'],
    [/递归|递推|回溯/, '递归'],
    [/归并/, '归并排序'],
    [/快排|基准|pivot|快速排序/, '快速排序'],
    [/二分|折半/, '二分查找'],
    [/排序|稳定性/, '排序算法'],
    [/分治/, '分治'],
    [/质因数|约数|gcd|欧几里得|数论/, '数论'],
    [/素数|质数|筛法/, '筛法'],
    [/高精度|大整数/, '高精度'],
    [/复杂度/, '时间复杂度'],
    [/指针|内存/, '指针与内存'],
    [/位运算|异或|移位/, '位运算'],
    [/数组|下标|越界/, '数组'],
    [/树与二叉树|二叉树|图论|拓扑|深度优先|广度优先|dfs|bfs/, '树与图'],
  ];
  for (const [kw, name] of rules) {
    if (kw.test(text)) return name;
  }
  return 'C++基础';
}

function extractTagNames(tagsStr) {
  // 支持单引号和双引号两种格式
  let matches = tagsStr.match(/'([^']+)'/g);
  if (!matches) matches = tagsStr.match(/"([^"]+)"/g);
  if (!matches) return tagsStr.replace(/[\[\]]/g, '').trim();
  return matches
    .map(m => m.replace(/['"]/g, ''))
    .filter(t => !META_TAGS.has(t))  // 过滤冗余元数据标签
    .join('、');
}

function extractQuestionInfoFromLine(line) {
  let type = null, answer = null, options = [], tags = '', question = '';
  let typeMatch = line.match(/type:\s*'(\w+)'/);
  if (!typeMatch) typeMatch = line.match(/type:\s*"(\w+)"/);
  if (typeMatch) type = typeMatch[1];
  const ansMatch = line.match(/answer:\s*(\d+)/);
  if (ansMatch) answer = parseInt(ansMatch[1]);
  const qMatch = line.match(/question:\s*`(.{0,200})/);
  if (qMatch) question = qMatch[1];
  const optMatch = line.match(/options:\s*\[(.+?)\]\s*,\s*answer:/);
  if (optMatch) {
    options = optMatch[1].split(/['"],\s*['"]/).map(s => s.replace(/[\[\]'"]/g, '').trim());
  }
  let tagsMatch = line.match(/tags:\s*\['([^']]*)'\]/);
  if (!tagsMatch) tagsMatch = line.match(/tags:\s*\["([^"]]*)"\]/);
  if (!tagsMatch) tagsMatch = line.match(/tags:\s*\[([^\]]*)\]/);
  if (tagsMatch) tags = `tags: [${tagsMatch[1]}]`;
  return { type, answer, options, tags, question };
}

function findQuestionInfoMultiLine(lines, explanationLineIdx) {
  let type = null, answer = null, options = [], tags = '', question = '';
  const currentInfo = extractQuestionInfoFromLine(lines[explanationLineIdx]);
  type = currentInfo.type;
  answer = currentInfo.answer;
  options = currentInfo.options;
  tags = currentInfo.tags;
  question = currentInfo.question;

  for (let j = explanationLineIdx - 1; j >= 0 && j > explanationLineIdx - 60; j--) {
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
  }

  if (options.length === 0) {
    for (let j = explanationLineIdx - 1; j >= 0 && j > explanationLineIdx - 60; j--) {
      if (lines[j].includes('options:')) {
        let k = j + 1;
        while (k < explanationLineIdx && !lines[k].includes('answer:')) {
          let m = lines[k].trim().match(/^'(.+?)'/);
          if (!m) m = lines[k].trim().match(/^"(.+?)"/);
          if (m) options.push(m[1]);
          k++;
        }
        break;
      }
    }
  }

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

function buildNewExplanationLines(oldText, info, indent) {
  if (oldText.startsWith('**答案：') || oldText.startsWith('**解析：')) return null;

  const safeText = oldText
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  const tagNames = extractTagNames(info.tags) || inferTopic(info.question || '', oldText);
  const lines = [];

  if (info.type === 'programming') {
    // 编程题：包装为 **解析：** 格式（与 L1 一致）
    lines.push('**解析：**');
    lines.push(safeText);
    lines.push('');
    lines.push('**考点：** ' + (tagNames || '编程综合'));
    return lines;
  }

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

    // 单引号换行格式
    const singleLineMatch = line.match(/^(\s*)explanation:\s*'(.+)',?\s*$/);
    if (singleLineMatch) {
      const indent = singleLineMatch[1];
      const oldText = singleLineMatch[2];
      const info = findQuestionInfoMultiLine(lines, i);
      if (info) {
        const newExpLines = buildNewExplanationLines(oldText, info, indent);
        if (newExpLines) {
          let newLine = `${indent}explanation: \`${newExpLines[0]}\n`;
          for (let k = 1; k < newExpLines.length; k++) {
            const lk = newExpLines[k];
            newLine += lk ? `${indent}${lk}\n` : '\n';
          }
          newLine += `${indent}\`,`;
          lines[i] = newLine;
          modified = true;
          upgradedCount++;
        } else {
          skippedCount++;
        }
      }
      i++;
      continue;
    }

    // 双引号换行格式（L5 主要格式）
    const doubleLineMatch = line.match(/^(\s*)explanation:\s*"(.+)",?\s*$/);
    if (doubleLineMatch) {
      const indent = doubleLineMatch[1];
      const oldText = doubleLineMatch[2];
      const info = findQuestionInfoMultiLine(lines, i);
      if (info) {
        const newExpLines = buildNewExplanationLines(oldText, info, indent);
        if (newExpLines) {
          let newLine = `${indent}explanation: \`${newExpLines[0]}\n`;
          for (let k = 1; k < newExpLines.length; k++) {
            const lk = newExpLines[k];
            newLine += lk ? `${indent}${lk}\n` : '\n';
          }
          newLine += `${indent}\`,`;
          lines[i] = newLine;
          modified = true;
          upgradedCount++;
        } else {
          skippedCount++;
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

const target = process.argv[2];
if (!target) {
  console.log('用法: node scripts/upgrade-explanations-l5.cjs <文件路径或目录>');
  process.exit(1);
}

const stat = fs.statSync(target);
if (stat.isDirectory()) {
  const files = fs.readdirSync(target)
    .filter(f => f.endsWith('-l5.js'))
    .sort();
  let total = 0;
  for (const file of files) {
    total += processFile(path.join(target, file));
  }
  console.log(`\n总计升级: ${total} 道题`);
} else {
  processFile(target);
}
