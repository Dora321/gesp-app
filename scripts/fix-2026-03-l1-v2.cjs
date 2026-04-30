#!/usr/bin/env node
/**
 * fix-2026-03-l1-v2.cjs
 * Fix remaining Q12 and Q25 explanation mismatches using line-number based replacement.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'src', 'data', 'gesp', 'level1', '2026-03-l1.js');
let lines = fs.readFileSync(filePath, 'utf-8').split('\n');

// ──── Fix Q12 (lines 248-259 in 1-indexed) ────
// Find Q12 explanation start by looking for the unique "30 1" answer text
let q12Start = -1, q12End = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('C (30 1)') && lines[i].includes('explanation')) {
    q12Start = i;
  }
  if (q12Start >= 0 && q12End < 0 && lines[i].includes('i--) ') && lines[i].includes('`')) {
    q12End = i;
    break;
  }
}

if (q12Start >= 0 && q12End >= 0) {
  const newQ12 = `      explanation: \`**答案：B (N % 10 % 2 == 1)**

**选项逐项分析：**
- **A (N % 10 % 2 == 0)**：❌ 错误。这判断的是"偶数位"而非"奇数位"。当个位数字对 2 取模等于 0 时，说明该数位是偶数。
- **B (N % 10 % 2 == 1)**：✅ 正确。分两步理解这个表达式：
  1. 第一步 \\\`N % 10\\\`：提取当前 N 的最末一位数字（个位）。
  2. 第二步 \\\`结果 % 2 == 1\\\`：判断这个数字是否为奇数。如果余数为 1，说明该数位是奇数（1, 3, 5, 7, 9），\\\`odd_count\\\` 加一。
- **C (N / 10 / 2 == 1)**：❌ 错误。\\\`N / 10 / 2\\\` 会缩小 N 至原来的 1/20，这完全偏离了"判断单个数位奇偶性"的目标。
- **D (N / 2 / 10 == 0)**：❌ 错误。这是在判断 N 是否小于 20，与数位的奇偶性毫无关系。

**考点：** 数位拆解中的奇偶性判定：先 \\\`% 10\\\` 提取个位，再 \\\`% 2\\\` 判奇偶\`,`;

  const newLines = newQ12.split('\n');
  lines.splice(q12Start, q12End - q12Start + 1, ...newLines);
  console.log(`✅ Q12 fixed (replaced lines ${q12Start+1}-${q12End+1})`);
} else {
  console.log(`❌ Q12 not found (start=${q12Start}, end=${q12End})`);
  // Debug: show content around suspected area
  for (let i = 245; i < 262; i++) {
    if (i < lines.length) {
      const hex = Buffer.from(lines[i].substring(0, 30)).toString('hex');
      console.log(`  Line ${i+1}: ${lines[i].substring(0, 60)} | hex: ${hex.substring(0, 40)}`);
    }
  }
}

// ──── Fix Q25: find by looking for "%-5d" related explanation ────
// After the Q23/Q24 fixes, Q25 is the one about printf("%-5d", 314)
// The wrong explanation mentions keywords/reserved words
let q25Start = -1, q25End = -1;
for (let i = 0; i < lines.length; i++) {
  // Q25 question is about printf("%-5d", 314)
  if (lines[i].includes('%-5d') && lines[i].includes('question')) {
    // Found Q25 question, now find its explanation
    for (let j = i; j < Math.min(i + 20, lines.length); j++) {
      if (lines[j].includes('explanation')) {
        q25Start = j;
        break;
      }
    }
    break;
  }
}

if (q25Start >= 0) {
  // Find the end of this explanation (backtick followed by comma)
  for (let j = q25Start + 1; j < Math.min(q25Start + 20, lines.length); j++) {
    const trimmed = lines[j].trimEnd();
    if (trimmed.endsWith('`,') || trimmed.endsWith("`,\r")) {
      q25End = j;
      break;
    }
  }
}

if (q25Start >= 0 && q25End >= 0) {
  const newQ25 = `      explanation: \`**答案：错误**

**判定依据：**
这是一道关于 \\\`printf\\\` 格式控制符 \\\`%-5d\\\` 的输出行为辨析。
1. 格式解析：\\\`%-5d\\\` 中的 \\\`-\\\` 是"左对齐"标志，\\\`5\\\` 是最小字段宽度，\\\`d\\\` 是十进制整数。
2. 实际输出：数值 314 占 3 位，字段宽度要求 5 位，因此右侧补 2 个空格。输出结果是 \\\`"314  "\\\`（314 后跟两个空格），然后换行。
3. 命题错误：命题称输出 \\\`-5314\\\`，这是将格式符 \\\`%-5d\\\` 中的 \\\`-\\\` 和 \\\`5\\\` 误解为直接拼接到数字前面。实际上它们是**格式控制指令**，不会出现在输出中。故判假。

**考点：** \\\`printf\\\` 格式控制符中 \\\`-\\\`（左对齐）标志与字段宽度的正确理解\`,`;

  const newLines = newQ25.split('\n');
  lines.splice(q25Start, q25End - q25Start + 1, ...newLines);
  console.log(`✅ Q25 fixed (replaced lines ${q25Start+1}-${q25End+1})`);
} else {
  console.log(`❌ Q25 not found (start=${q25Start}, end=${q25End})`);
  // Debug
  for (let i = 488; i < 510; i++) {
    if (i < lines.length) {
      console.log(`  Line ${i+1}: ${lines[i].substring(0, 80)}`);
    }
  }
}

// Write back
fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
console.log('\nDone. File saved.');
