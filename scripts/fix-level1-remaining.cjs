#!/usr/bin/env node
/**
 * fix-level1-remaining.cjs
 * Fix 14 remaining explanation/answer mismatches in Level 1 GESP files.
 * Targets: 2023-03-l1.js, 2024-03-l1.js, 2025-09-l1.js
 */

const fs = require('fs');
const path = require('path');

const DATA_ROOT = path.resolve(__dirname, '..', 'src', 'data', 'gesp', 'level1');

/**
 * Utility to replace a question's explanation and answer in a content string
 */
function fixQuestion(content, questionId, newAnswer, newExplanation) {
  // Find the question block
  // Using a more robust regex to find the object with specific id
  const idRegex = new RegExp(`id:\\s*${questionId},[\\s\\S]*?answer:\\s*(\\d+)`, 'm');
  const match = content.match(idRegex);
  
  if (!match) return content;

  let block = match[0];
  const startIdx = match.index;
  
  // Find the end of the question object (assuming it ends before the next { id: or before the end of array ] )
  // We'll search for the next id: or the closing bracket of the object
  // Actually, we can find the explanation field within the block or following it.
  
  // Let's find the full explanation string
  const expRegex = /explanation:\s*`([\s\S]*?)`,/;
  const blockPlus = content.substring(startIdx, startIdx + 2000); // look ahead 2000 chars
  const expMatch = blockPlus.match(expRegex);
  
  if (!expMatch) return content;

  const oldExpFull = expMatch[0];
  const oldAnswerFull = `answer: ${match[1]}`;
  
  let newContent = content;
  
  // Replace answer if needed
  if (newAnswer !== null) {
    const updatedAnswer = `answer: ${newAnswer}`;
    // Replace only the answer within the specific question block range
    const absoluteAnswerIdx = startIdx + match[0].indexOf(oldAnswerFull);
    newContent = newContent.substring(0, absoluteAnswerIdx) + updatedAnswer + newContent.substring(absoluteAnswerIdx + oldAnswerFull.length);
  }
  
  // Replace explanation
  // Re-calculate explanation index in the possibly modified newContent
  const currentBlockPlus = newContent.substring(startIdx, startIdx + 2000);
  const currentExpMatch = currentBlockPlus.match(expRegex);
  if (currentExpMatch) {
    const absoluteExpIdx = startIdx + currentExpMatch.index;
    // Escape backticks in the new explanation text to avoid breaking the JS template literal in the data file
    const escapedExplanation = newExplanation.replace(/`/g, '\\`');
    const updatedExp = `explanation: \`${escapedExplanation}\`,`;
    newContent = newContent.substring(0, absoluteExpIdx) + updatedExp + newContent.substring(absoluteExpIdx + currentExpMatch[0].length);
  }

  return newContent;
}

// ──── 2023-03-l1.js ────
let path2023 = path.join(DATA_ROOT, '2023-03-l1.js');
if (fs.existsSync(path2023)) {
  let content = fs.readFileSync(path2023, 'utf-8');
  
  content = fixQuestion(content, 9, 3, `**答案：D (1)**

**选项逐项分析：**
- **A / B / C**：❌ 错误。未能理解 C++ 逻辑布尔值在输出时的数字映射机制。
- **D (1)**：✅ 正确。在 C++ 的逻辑判断中，所有的非零整数（如这里的 5 和 2）都被视为“真（true）”。两个真值进行 \`&&\`（逻辑与）运算，结果必然是真。当输出布尔结果时，C++ 默认将 \`true\` 映射为整数 \`1\`。

**考点：** 逻辑与运算的并联真值特性与布尔-整数映射规则`);

  content = fixQuestion(content, 13, 1, `**答案：B (5%2={1})**

**选项逐项分析：**
- **A / C / D**：❌ 错误。未能掌握 printf 中百分号的转义规则或取模运算结果。
- **B (5%2={1})**：✅ 正确。
1. 格式字串解析：\`printf\` 中使用 \`%%%%\` 来输出一个百分号 \`%\`。因此 \`5%%%%2\` 输出为 \`5%2\`。
2. 占位符解析：\`{%%d}\` 中 \`%%d\` 是整型占位符，将被替换为后面参数的值。
3. 参数计算：\`5 %% 2\` 即 5 除以 2 的余数，结果为 \`1\`。
4. 最终拼接：\`5%2={1}\`。

**考点：** printf 格式化字符串中的转义字符（%%%%）与取模运算`);

  content = fixQuestion(content, 14, 1, `**答案：B (10)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。计算累加和时出现偏差。
- **B (10)**：✅ 正确。这是一个基础的 \`for\` 循环累加逻辑：
1. 初始 \`a = 0\`。
2. 循环 \`i\` 从 1 到 4 执行：
   - \`i=1: a = 0 + 1 = 1\`
   - \`i=2: a = 1 + 2 = 3\`
   - \`i=3: a = 3 + 3 = 6\`
   - \`i=4: a = 6 + 4 = 10\`
3. 循环结束，输出 \`a\` 的值为 10。

**考点：** \`for\` 循环的基础累加逻辑`);

  content = fixQuestion(content, 15, 2, `**答案：C (5)**

**选项逐项分析：**
- **A / B / D**：❌ 错误。未能正确执行 \`if-else\` 的逻辑分支。
- **C (5)**：✅ 正确。追踪代码执行：
1. 初始 \`a = 5, b = 10\`。
2. 判断 \`if (a > b)\` 即 \`5 > 10\`。结果为**假**。
3. 执行 \`else\` 分支：\`a = b - a\` 即 \`a = 10 - 5 = 5\`。
4. 最终输出 \`a\` 的值为 5。

**考点：** \`if-else\` 条件分支的逻辑判定`);

  content = fixQuestion(content, 18, 1, `**答案：错误**

**判定依据：**
这是 C++ 语法中的基础常识。C++ 语言是**区分大小写**的（Case-sensitive）。这意味着变量名 \`abc\`、\`Abc\` 和 \`ABC\` 在编译器眼中是三个完全不同的标识符。命题声称不区分大小写，故判假。

**考点：** C++ 标识符的大小写敏感性`);

  content = fixQuestion(content, 19, 0, `**答案：正确**

**判定依据：**
在 C++ 标准中，\`char\`（字符型）数据类型被定义为占用 **1 个字节**（8 bits）的内存空间。它主要用于存储 ASCII 码字符。命题描述准确。

**考点：** C++ 基础数据类型的内存占用（char）`);

  content = fixQuestion(content, 20, 1, `**答案：错误**

**判定依据：**
这是一道关于 C++ 整数除法规律的陷阱题。在 C++ 中，当两个操作数都是整型（int）时，\`/\` 运算符执行的是**整数除法**，结果会自动截断小数部分。
1. 计算 \`3 / 2\`：商为 1，余数为 1。结果截断后为 **1**。
2. 命题宣称输出结果是 1.5，这混淆了浮点数除法与整数除法的区别。故判假。

**考点：** C++ 整数除法（Integer Division）的截断特性`);

  content = fixQuestion(content, 21, 1, `**答案：错误**

**判定依据：**
在 C++ 中，\`if\` 语句的条件表达式并不强制要求必须是 \`bool\` 类型。
1. 兼容性：C++ 允许任何可以隐式转换为布尔值的表达式作为条件。
2. 转换规则：对于整型，**非零即为真，零即为假**。例如 \`if (5)\` 在 C++ 中是完全合法的且判定为真。命题称“必须是布尔类型”，过于绝对，故判假。

**考点：** C++ 条件表达式的隐式布尔转换规则`);

  content = fixQuestion(content, 22, 0, `**答案：正确**

**判定依据：**
\`for\` 循环的三个参数（初始化、条件判定、更新步进）在语法上都是**可选**的。
1. 极端情况：你可以写成 \`for (;;)\`，这在 C++ 中是一个合法的死循环，等价于 \`while (true)\`。
2. 灵活性：开发者可以根据需要将初始化放在循环外，或将步进逻辑放在循环体内。命题描述准确。

**考点：** \`for\` 循环结构的语法灵活性`);

  fs.writeFileSync(path2023, content, 'utf-8');
  console.log('✅ Fixed 2023-03-l1.js (9 issues)');
}

// ──── 2024-03-l1.js ────
let path2024 = path.join(DATA_ROOT, '2024-03-l1.js');
if (fs.existsSync(path2024)) {
  let content = fs.readFileSync(path2024, 'utf-8');
  
  content = fixQuestion(content, 9, 1, `**答案：B (9#6#3#0#)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。未能准确追踪循环变量 N 的变化及取模判定的边界。
- **B (9#6#3#0#)**：✅ 正确。追踪 \`while\` 循环执行：
1. N 初始为 10。
2. 第一轮：\`N -= 1\` 变为 9。\`9 % 3 == 0\` 为真，输出 \`9#\`。
3. 第二轮：\`N -= 1\` 变为 8。\`8 % 3 != 0\`。
4. 第三轮：\`N -= 1\` 变为 7。\`7 % 3 != 0\`。
5. 第四轮：\`N -= 1\` 变为 6。\`6 % 3 == 0\` 为真，输出 \`6#\`。
...以此类推，当 N 减到 3 时输出 \`3#\`；当 N 减到 0 时，\`0 % 3 == 0\` 为真，输出 \`0#\`。
6. 此时 \`while (N)\` 判定为 \`while (0)\`，循环结束。最终序列为 \`9#6#3#0#\`。

**考点：** \`while\` 循环的执行顺序与零值终止条件`);

  content = fixQuestion(content, 10, 1, `**答案：B (N % i == 0)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。未能正确表达“i 是 N 的因数”这一逻辑。
- **B (N % i == 0)**：✅ 正确。质数判定逻辑：
1. 算法思路：通过枚举 1 到 N 的所有整数，统计其中能整除 N 的数字个数（即因数个数）。
2. 判断条件：如果 \`N % i == 0\` 成立，说明 \`i\` 是 \`N\` 的一个因数，计数器 \`cnt\` 加 1。
3. 判定结论：如果最终 \`cnt\` 等于 2（即因数只有 1 和它本身），则 N 是质数。

**考点：** 质数判定算法与取模运算符在寻找因数中的应用`);

  content = fixQuestion(content, 25, 0, `**答案：正确**

**判定依据：**
在结构化编程中，\`for\` 循环和 \`while\` 循环 in 功能上是**完全等价**的。
1. 转换逻辑：\`for (初始化; 条件; 步进) { ... }\` 可以改写为：\`初始化; while (条件) { ...; 步进; }\`。
2. 结论：任何复杂的 \`for\` 循环都可以通过这种平移方式转化为 \`while\` 结构。命题描述准确。

**考点：** 循环结构的等价转换原理`);

  fs.writeFileSync(path2024, content, 'utf-8');
  console.log('✅ Fixed 2024-03-l1.js (3 issues)');
}

// ──── 2025-09-l1.js ────
let path2025 = path.join(DATA_ROOT, '2025-09-l1.js');
if (fs.existsSync(path2025)) {
  let content = fs.readFileSync(path2025, 'utf-8');
  
  content = fixQuestion(content, 14, 3, `**答案：D (10)**

**选项逐项分析：**
- **A / B / C**：❌ 错误。未能识别出 \`break\` 语句对后续累加过程的终止作用。
- **D (10)**：✅ 正确。追踪代码执行过程：
1. 初始 \`n = 10, sum = 0\`。
2. 第一轮：\`n = 10\`。判断 \`10 % 3 == 0\` 为假。执行 \`sum += 10\` (sum=10)，随后 \`n--\` (n=9)。
3. 第二轮：\`n = 9\`。判断 \`9 % 3 == 0\` 为真！触发 \`break\`。
4. \`break\` 立即终止整个 \`while\` 循环，程序跳出。
5. 最终输出 \`sum\` 的值为 10。

**考点：** \`break\` 语句的即时中断机制`);

  content = fixQuestion(content, 15, 1, `**答案：B (让程序在特定位置暂停)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。误解了调试工具的基本功能或断点的运作方式。
- **B (让程序在特定位置暂停)**：✅ 正确。断点（Breakpoint）是 IDE 调试功能的核心。它的目的是让程序运行到开发者指定的代码行时**自动暂停**。此时，开发者可以检查变量的当前值、内存状态或单步执行后续代码，从而精准定位 bug。

**考点：** IDE 调试工具及断点的基本使用常识`);

  fs.writeFileSync(path2025, content, 'utf-8');
  console.log('✅ Fixed 2025-09-l1.js (2 issues)');
}

console.log('\\nDone. All 14 Level 1 issues fixed.');
