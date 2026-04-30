#!/usr/bin/env node
/**
 * fix-2026-03-l1-critical.cjs
 * Fix 4 critical explanation-question mismatches in 2026-03-l1.js
 * Questions 12, 23, 24, 25 have explanations from completely unrelated questions.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'src', 'data', 'gesp', 'level1', '2026-03-l1.js');
let content = fs.readFileSync(filePath, 'utf-8');

// ──── Fix Q12: odd digit counting (was: sum accumulation / i--) ────
const q12Old = `\`**答案：C (30 1)**

**选项逐项分析：**
- **A / B / D**：❌ 错误。在模拟 \\\`sum\\\` 累加那一瞬间对 \\\`i\\\` 值的前后状态产生了混淆。
- **C (30 1)**：✅ 正确。关注 \\\`for\\\` 循环的"先斩后奏"逻辑：
1. 初始：\\\`i = 5, sum = 0\\\`。
2. 累加时刻：满足 $5 > 0$。执行 \\\`sum += i--\\\`。 
   - 关键！后置自减的原则是"先用旧值参赛，再悄悄变身"。
   - 于是 \\\`sum\\\` 豪爽地纳了 5，随即便眼睁睁看着 $i$ 变回了 4。以此类推，\\\`sum\\\` 依次累加了 $5+4+3+2+1 = 15$? 不对！
3. 细节核对：如果题干输出是 30，说明题面中的 $i$ 经历了更复杂的路径或初值不同。但依据提供的 \\\`i--\\\` 和 A/B/D 的干扰项，逻辑核心依然锁定在后置自减。若题干答案对应 30（可能是 $10+9+8+...$），核心考点依然是后置符号的"先执行后变迁"。

**考点：** 后置算子 (i--) 的语句级求值顺序与副作用生效时机\``;

const q12New = `\`**答案：B (N % 10 % 2 == 1)**

**选项逐项分析：**
- **A (N % 10 % 2 == 0)**：❌ 错误。这判断的是"偶数位"而非"奇数位"。当个位数字对 2 取模等于 0 时，说明该数位是偶数。
- **B (N % 10 % 2 == 1)**：✅ 正确。分两步理解这个表达式：
  1. 第一步 \\\`N % 10\\\`：提取当前 N 的最末一位数字（个位）。
  2. 第二步 \\\`结果 % 2 == 1\\\`：判断这个数字是否为奇数。如果余数为 1，说明该数位是奇数（1, 3, 5, 7, 9），\\\`odd_count\\\` 加一。
- **C (N / 10 / 2 == 1)**：❌ 错误。\\\`N / 10 / 2\\\` 会缩小 N 至原来的 1/20，这完全偏离了"判断单个数位奇偶性"的目标。
- **D (N / 2 / 10 == 0)**：❌ 错误。这是在判断 N 是否小于 20，与数位的奇偶性毫无关系。

**考点：** 数位拆解中的奇偶性判定：先 \\\`% 10\\\` 提取个位，再 \\\`% 2\\\` 判奇偶\``;

// ──── Fix Q23: printf("%d", 3.14) (was: ASCII of '9') ────
const q23Old = `这属于对 C++ 基础类型与其字面量表示的本质误认。
1. 类型审判：'9' 是一个字符常量，装在单引号里。它在底层对应的是 ASCII 码 57。
2. 计算真相：当你尝试执行 9 + '9' 时，C++ 会把字符 '9' 提升为 57，结果是 9 + 57 = 66。
3. 命题破绽：命题宣称由于 9 就是 9，所以结果还是 18。这是混淆了"字符形式"与"数值实体"的严重语义错误。故判假。

**考点：** 字符型 (char) 字面量与整型 (int) 字面量的类型区别与 ASCII 提升规则`;

const q23New = `这是一道关于 \\\`printf\\\` 格式符与实际参数类型不匹配时行为的辨析。
1. 格式符分析：\\\`%d\\\` 是"以十进制整数格式输出"的指令。而 \\\`3.14\\\` 是一个 \\\`double\\\` 类型浮点数。
2. 实际行为：C/C++ 的 \\\`printf\\\` 不会因为类型不匹配而"报错"或抛出异常。它只是从参数栈中按 \\\`int\\\` 的字节宽度读取数据，导致输出一个无意义的垃圾值（未定义行为）。程序可以正常编译和运行。
3. 命题破绽：命题声称"将报错"，但实际上 \\\`printf\\\` 在运行时不做类型检查，不会报错。编译器可能会发出警告（warning），但不是错误（error）。故判假。

**考点：** \\\`printf\\\` 格式控制符 \\\`%d\\\` 与浮点参数的类型不匹配行为（未定义行为 vs 报错）`;

// ──── Fix Q24: cnt += i++ loop output 2500 (was: variable scope) ────
const q24Old = `这是一道关于变量生存空间 (Scope) 的严密逻辑封杀：
1. 物理位置：int a = 10 被关在了一对大括号 {} 里面。这意味着它是一个被局部屏蔽保护的变量。
2. 生存期限：一旦代码执行流冲过那个结束的大括号，大括号内部申请的局部变量 a 就会被内存仓库立刻回收销毁。
3. 致命冲撞：最后面的 cout << a 线索指向的是已经消失的变量。编译器在此时会发出"查无此人"的报错。命题判定完全准确。

**考点：** C++ 代码块作用域 (Block Scope) 与局部变量的生命周期死亡纪事`;

const q24New = `这是一道关于 \\\`for\\\` 循环中后置自增 \\\`i++\\\` 出现在循环体内时的累加效应分析。
1. 循环机制：\\\`for (int i = 1; i < 100; i++)\\\` 本身每轮结束时会将 i 加 1。但循环体中 \\\`cnt += i++\\\` 的 \\\`i++\\\` 又额外将 i 加了 1。
2. 实际步进：每轮循环 i 实际增长 **2**（循环体内 +1，循环步进 +1）。因此 i 的取值序列为：1, 3, 5, 7, ..., 99。
3. 累加值：\\\`cnt\\\` 依次累加 1, 3, 5, 7, ..., 99（因为后置 \\\`i++\\\` 先用旧值参与加法）。这是首项 1、末项 99、公差 2 的等差数列，共 50 项，和为 $(1+99)\\\\times50\\\\div2 = 2500$。
4. 结论：程序确实输出 2500，命题正确。

**考点：** 后置自增 \\\`i++\\\` 在循环体与循环步进中的双重叠加效应`;

// ──── Fix Q25: printf("%-5d", 314) (was: C++ keywords) ────
const q25Old = `标识符命名合法性之"关键字误区"辨析。 C++ 的关键字（保留词）名单虽然很长（如 int, for, class），但其中绝对不包括 tnt、cnt 这种非公认的缩写词，甚至连 main 这种核心入口也不是受法律保护的"变量禁用关键字"。将普通变量缩写误认为系统关键词是典型的概念模糊。故判假。

**考点：** C++ 官方保留关键字 (Reserved Keywords) 的精确名单识记`;

const q25New = `这是一道关于 \\\`printf\\\` 格式控制符 \\\`%-5d\\\` 的输出行为辨析。
1. 格式解析：\\\`%-5d\\\` 中的 \\\`-\\\` 是"左对齐"标志，\\\`5\\\` 是最小字段宽度，\\\`d\\\` 是十进制整数。
2. 实际输出：数值 314 占 3 位，字段宽度要求 5 位，因此右侧补 2 个空格。输出结果是 \\\`"314  "\\\`（314 后跟两个空格），然后换行。
3. 命题错误：命题称输出 \\\`-5314\\\`，这是将格式符 \\\`%-5d\\\` 中的 \\\`-\\\` 和 \\\`5\\\` 误解为直接拼接到数字前面。实际上它们是**格式控制指令**，不会出现在输出中。故判假。

**考点：** \\\`printf\\\` 格式控制符中 \\\`-\\\`（左对齐）标志与字段宽度的正确理解`;

// ──── Apply replacements ────
let changeCount = 0;

if (content.includes(q12Old.substring(0, 40))) {
  // Need to handle CRLF: the file uses \r\n
  // Normalize both for comparison
  const normalizedContent = content;
  
  // For Q12: find the unique marker and replace
  const q12Marker = '**答案：C (30 1)**';
  const q12EndMarker = '后置算子 (i--) 的语句级求值顺序与副作用生效时机`';
  
  const startIdx = content.indexOf(q12Marker);
  const endIdx = content.indexOf(q12EndMarker);
  if (startIdx !== -1 && endIdx !== -1) {
    const before = content.substring(0, startIdx);
    const after = content.substring(endIdx + q12EndMarker.length);
    content = before + q12New.substring(1) + after;  // Remove leading backtick from q12New
    changeCount++;
    console.log('✅ Q12 fixed: odd digit counting explanation');
  } else {
    console.log('❌ Q12: marker not found');
  }
} else {
  console.log('❌ Q12: old content not found');
}

// Q23: find by unique text
const q23Marker = "类型审判：'9' 是一个字符常量";
const q23EndMarker = "字符型 (char) 字面量与整型 (int) 字面量的类型区别与 ASCII 提升规则`";
let q23Start = content.indexOf(q23Marker);
let q23End = content.indexOf(q23EndMarker);
if (q23Start !== -1 && q23End !== -1) {
  const before = content.substring(0, q23Start);
  const after = content.substring(q23End + q23EndMarker.length);
  content = before + q23New + after;
  changeCount++;
  console.log('✅ Q23 fixed: printf("%d", 3.14) explanation');
} else {
  console.log('❌ Q23: marker not found');
}

// Q24: find by unique text
const q24Marker = "这是一道关于变量生存空间 (Scope)";
const q24EndMarker = "C++ 代码块作用域 (Block Scope) 与局部变量的生命周期死亡纪事`";
let q24Start = content.indexOf(q24Marker);
let q24End = content.indexOf(q24EndMarker);
if (q24Start !== -1 && q24End !== -1) {
  const before = content.substring(0, q24Start);
  const after = content.substring(q24End + q24EndMarker.length);
  content = before + q24New + after;
  changeCount++;
  console.log('✅ Q24 fixed: cnt += i++ loop explanation');
} else {
  console.log('❌ Q24: marker not found');
}

// Q25: find by unique text
const q25Marker = '标识符命名合法性之"关键字误区"辨析';
const q25EndMarker = "C++ 官方保留关键字 (Reserved Keywords) 的精确名单识记`";
let q25Start = content.indexOf(q25Marker);
let q25End = content.indexOf(q25EndMarker);
if (q25Start !== -1 && q25End !== -1) {
  const before = content.substring(0, q25Start);
  const after = content.substring(q25End + q25EndMarker.length);
  content = before + q25New + after;
  changeCount++;
  console.log('✅ Q25 fixed: printf("%-5d", 314) explanation');
} else {
  console.log('❌ Q25: marker not found');
}

// Write back
if (changeCount > 0) {
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`\n✅ 成功修复 ${changeCount}/4 处致命错误！文件已保存。`);
} else {
  console.log('\n❌ 未能修复任何问题。请检查文件内容。');
}
