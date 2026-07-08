/**
 * 批量升级 Level 6 试卷的 explanation 格式
 *
 * 将旧格式 explanation: "纯文本" 转为增强模板字符串格式：
 * - 选择题：**答案：X** + **解析：** + 逐选项辨析（含具体理由）+ **考点：**
 * - 判断题：**答案：正确/错误** + **判定依据：** + **纠错：**(错误时) + **易混概念：** + **考点：**
 * - 编程题：**解析：** + 原解析文本（保留，与 L1 一致）
 *
 * L6 数据格式特点：
 * - 全部双引号格式（type: "single" / "judge"，explanation: "..."，tags: ["..."]）
 * - explanation 为单行双引号纯文本
 * - 编程题在文件顶部 const programmingQuestions 中定义，并通过 ...programmingQuestions 展开进 paperData.questions
 *   因此 paperData.questions 含 27 题（25 客观 + 2 编程），脚本需同时处理编程题解析才能达 100%
 * - tags 含冗余元数据（"客观题"/"单选题"/"判断题"/"GESP6级"），考点行需过滤
 * - 标准配置：15单选 + 10判断 + 2编程
 *
 * 用法：node scripts/upgrade-explanations-l6.cjs <文件路径或目录>
 */

const fs = require('fs');
const path = require('path');

const ANSWER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// 需要过滤的冗余元数据标签（不进入考点行）
const META_TAGS = new Set(['客观题', '单选题', '多选题', '判断题', '编程题', 'GESP6级', 'GESP6级']);

// L6 针对性易混概念 / 陷阱映射
const PITFALL_RULES = [
  // 栈
  { keywords: [/栈/, /stack/, /入栈/, /出栈/, /弹栈/, /栈顶/, /单调栈/], pitfall: '栈是后进先出（LIFO）。注意栈空时 pop 会出错，需先判空；递归/函数调用依赖调用栈，过深会栈溢出；单调栈用于找左右第一个更大/更小元素。' },
  { keywords: [/表达式求值/, /中缀/, /后缀/, /逆波兰/], pitfall: '中缀转后缀用运算符栈，遇数字输出、遇运算符按优先级处理；求值用操作数栈。注意括号匹配和运算符优先级。' },
  // 队列
  { keywords: [/队列/, /queue/, /入队/, /出队/, /队首/, /队尾/], pitfall: '队列是先进先出（FIFO）。循环队列用 (rear+1)%cap 判断满，注意区分空与满（常留一个空位或计数）。' },
  { keywords: [/双端队列/, /deque/], pitfall: '双端队列两端都可入队出队；滑动窗口最值常用单调队列（deque 维护单调序列）。' },
  // 哈希表
  { keywords: [/哈希/, /hash/, /散列/, /unordered_map/, /unordered_set/], pitfall: '哈希表平均 O(1) 查找。注意哈希冲突（链地址/开放寻址）、自定义类型的哈希函数、以及最坏退化成 O(n)。unordered_map 的键需可比较相等。' },
  // 贪心
  { keywords: [/贪心/], pitfall: '贪心要求局部最优能推出全局最优（贪心选择性质），需用交换论证或反证法证明；不是所有问题都适合贪心，注意寻找反例。常见套路：按性价比/结束时间排序。' },
  // 动态规划
  { keywords: [/动态规划/, /dp/, /状态转移/, /最优子结构/], pitfall: 'DP 三要素：状态定义、转移方程、边界初始化。注意 INF 初值的选择、下标从 0 还是 1、以及空间优化（滚动数组）时的覆盖顺序。' },
  { keywords: [/0\/1背包/, /背包/, /knapsack/], pitfall: '0/1 背包用逆序遍历容量避免重复选同一物品；完全背包用正序。注意容量上限截断和初始化 dp[0]=0（求最大）或 INF（求最小）。' },
  { keywords: [/最长上升子序列/, /LIS/, /最长递增/], pitfall: 'LIS 可用 O(n²) DP 或 O(n log n) 贪心+二分（维护 tails 数组）。注意「严格递增」与「非递减」的区别。' },
  { keywords: [/编辑距离/, /最长公共子序列/, /LCS/], pitfall: 'LCS/编辑距离用二维 DP，状态转移区分字符相等与不等两种情况；注意边界（空串）初始化。' },
  // 前缀和
  { keywords: [/前缀和/, /pre\[/, /区间和/], pitfall: '一维前缀和 pre[i]=pre[i-1]+a[i]，区间 [l,r] 和 = pre[r]-pre[l-1]（注意 l=0 时边界）。二维前缀和用容斥原理。' },
  // 双指针
  { keywords: [/双指针/, /快慢指针/, /左右指针/, /滑动窗口/, /尺取法/, /two.?pointer/], pitfall: '双指针将 O(n²) 降到 O(n)：左右指针用于有序数组求和/闭合，快慢指针用于去重/环检测，滑动窗口用于定长或条件子区间。注意指针移动条件和窗口收缩时机。' },
  // 复杂度
  { keywords: [/时间复杂度/, /复杂度/, /O\(/], pitfall: '常见复杂度：O(1)<O(log n)<O(n)<O(n log n)<O(n²)<O(2^n)。1e5 规模下 O(n²) 通常超时，需优化到 O(n log n) 或更低；DP 注意状态数×转移复杂度。' },
  // 数组
  { keywords: [/数组/, /下标/, /越界/], pitfall: 'C++ 数组下标从 0 开始，访问 a[n] 时下标范围 0~n-1。越界访问是未定义行为。' },
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
  if (/栈/.test(tagStr)) return '注意栈的空满判断和 LIFO 特性，栈空 pop 会出错。';
  if (/队列/.test(tagStr)) return '注意循环队列的满判断（留空位或计数）和 FIFO 特性。';
  if (/哈希|散列/.test(tagStr)) return '注意哈希冲突处理和自定义类型的哈希函数。';
  if (/贪心/.test(tagStr)) return '贪心需证明局部最优能推出全局最优，注意寻找反例。';
  if (/动态规划|dp/.test(tagStr)) return 'DP 注意状态定义、转移方程和边界初始化。';
  if (/背包/.test(tagStr)) return '0/1 背包逆序遍历容量，注意初始化和容量截断。';
  if (/前缀和/.test(tagStr)) return '前缀和注意区间和下标边界（l=0 时 pre[l-1] 越界）。';
  if (/双指针|滑动窗口/.test(tagStr)) return '双指针注意指针移动条件和窗口收缩时机。';
  if (/复杂度/.test(tagStr)) return '注意时间复杂度分析，1e5 规模下 O(n²) 通常超时。';
  if (/数组|下标/.test(tagStr)) return '数组下标从 0 开始，注意越界。';
  return '注意区分相关概念的适用范围和边界条件。';
}

function explainWrongOption(optText, questionText, correctExplanation, answerIdx, idx) {
  const opt = optText.toLowerCase();
  if (/栈/.test(opt)) return '对栈的后进先出特性或空满判断理解有误，请检查入栈出栈顺序。';
  if (/队列|queue/.test(opt)) return '对队列的先进先出特性或循环队列满判断理解有误。';
  if (/哈希|散列|hash/.test(opt)) return '哈希表冲突处理或查找逻辑理解有误，请检查哈希函数。';
  if (/贪心/.test(opt)) return '贪心策略选择有误，请验证局部最优能否推出全局最优。';
  if (/动态规划|dp|背包/.test(opt)) return '动态规划的状态或转移方程有误，请检查边界初始化。';
  if (/前缀和/.test(opt)) return '前缀和计算或区间和边界处理有误，请验证 pre[r]-pre[l-1]。';
  if (/双指针|滑动窗口|尺取/.test(opt)) return '双指针移动条件或窗口收缩时机有误，请逐步推演。';
  if (/复杂度|O\(/.test(opt)) return '复杂度分析有误，请重新估算最坏情况时间复杂度。';
  if (/数组|下标|越界/.test(opt)) return '数组下标从 0 开始，请仔细验证下标范围。';
  if (/^\d+(\.\d+)?$/.test(optText.trim()) || /^-\d+/.test(optText.trim())) return '该数值与正确计算结果不符，请重新验算。';
  if (/=\s*=|%\s*\d|\/\s*\d|\+\+|--|>>|<<|&|\||\^/.test(opt)) return '该代码逻辑与题目要求不符，请逐步推演。';
  const truncated = optText.length > 30 ? optText.substring(0, 30) + '…' : optText;
  return `选项「${truncated}」与题目考查的知识点不符，请对照正确解析理解。`;
}

// 从题干/解析文本推断 L6 知识点（用于考点行，当题目仅有元数据标签时）
function inferTopic(questionText, explanation) {
  const text = `${questionText} ${explanation}`;
  const rules = [
    [/栈|stack|单调栈/, '栈'],
    [/队列|queue|deque|滑动窗口/, '队列'],
    [/哈希|散列|hash/, '哈希表'],
    [/贪心/, '贪心'],
    [/动态规划|dp|背包|状态转移/, '动态规划'],
    [/前缀和|区间和/, '前缀和'],
    [/双指针|快慢指针|左右指针|滑动窗口|尺取法/, '双指针'],
    [/复杂度/, '时间复杂度'],
    [/数组|下标|越界/, '数组'],
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
    .filter(f => f.endsWith('-l6.js'))
    .sort();
  let total = 0;
  for (const file of files) {
    total += processFile(path.join(target, file));
  }
  console.log(`\n总计升级: ${total} 道题`);
} else {
  processFile(target);
}
