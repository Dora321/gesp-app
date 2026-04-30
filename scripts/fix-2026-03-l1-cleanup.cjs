#!/usr/bin/env node
/**
 * fix-2026-03-l1-cleanup.cjs
 * Clean up residual formatting issues from the first fix pass.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, '..', 'src', 'data', 'gesp', 'level1', '2026-03-l1.js');
let lines = fs.readFileSync(filePath, 'utf-8').split('\n');

// ──── Fix Q23: Clean up lines 459-468 ────
// Find Q23's explanation block by looking for question about printf("%d", 3.14)
let q23ExpStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('printf') && lines[i].includes('3.14') && lines[i].includes('question')) {
    // Found Q23 question, now find explanation
    for (let j = i; j < Math.min(i + 15, lines.length); j++) {
      if (lines[j].includes('explanation')) {
        q23ExpStart = j;
        break;
      }
    }
    break;
  }
}

if (q23ExpStart >= 0) {
  // Find end of this explanation
  let q23ExpEnd = -1;
  for (let j = q23ExpStart + 1; j < Math.min(q23ExpStart + 20, lines.length); j++) {
    if (lines[j].trimEnd().match(/tags:\s*\[/)) {
      q23ExpEnd = j - 1;
      // Back up to before the tags line
      // The explanation should end right before tags
      break;
    }
  }
  
  if (q23ExpEnd >= 0) {
    const newQ23Exp = [
      "      explanation: `**答案：错误**",
      "",
      "**判定依据：**",
      "这是一道关于 \\`printf\\` 格式符与实际参数类型不匹配时行为的辨析。",
      "1. 格式符分析：\\`%d\\` 是\"以十进制整数格式输出\"的指令。而 \\`3.14\\` 是一个 \\`double\\` 类型浮点数。",
      "2. 实际行为：C/C++ 的 \\`printf\\` 不会因为类型不匹配而\"报错\"或抛出异常。它只是从参数栈中按 \\`int\\` 的字节宽度读取数据，导致输出一个无意义的垃圾值（未定义行为）。程序可以正常编译和运行。",
      "3. 命题破绽：命题声称\"将报错\"，但实际上 \\`printf\\` 在运行时不做类型检查，不会报错。编译器可能会发出警告（warning），但不是错误（error）。故判假。",
      "",
      "**考点：** \\`printf\\` 格式控制符 \\`%d\\` 与浮点参数的类型不匹配行为（未定义行为 vs 报错）`,",
    ];
    lines.splice(q23ExpStart, q23ExpEnd - q23ExpStart + 1, ...newQ23Exp);
    console.log(`✅ Q23 cleaned up (lines ${q23ExpStart+1}-${q23ExpEnd+1} -> ${newQ23Exp.length} lines)`);
  }
}

// Reload after Q23 fix
// Re-scan for Q24 (about cnt += i++)
let q24ExpStart = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('cnt += i++') && lines[i].includes('question')) {
    for (let j = i; j < Math.min(i + 15, lines.length); j++) {
      if (lines[j].includes('explanation')) {
        q24ExpStart = j;
        break;
      }
    }
    break;
  }
}

if (q24ExpStart >= 0) {
  let q24ExpEnd = -1;
  for (let j = q24ExpStart + 1; j < Math.min(q24ExpStart + 20, lines.length); j++) {
    if (lines[j].trimEnd().match(/tags:\s*\[/)) {
      q24ExpEnd = j - 1;
      break;
    }
  }
  
  if (q24ExpEnd >= 0) {
    const newQ24Exp = [
      "      explanation: `**答案：正确**",
      "",
      "**判定依据：**",
      "这是一道关于 \\`for\\` 循环中后置自增 \\`i++\\` 出现在循环体内时的累加效应分析。",
      "1. 循环机制：\\`for (int i = 1; i < 100; i++)\\` 本身每轮结束时会将 i 加 1。但循环体中 \\`cnt += i++\\` 的 \\`i++\\` 又额外将 i 加了 1。",
      "2. 实际步进：每轮循环 i 实际增长 **2**（循环体内 +1，循环步进 +1）。因此 i 的取值序列为：1, 3, 5, 7, ..., 99。",
      "3. 累加值：\\`cnt\\` 依次累加 1, 3, 5, 7, ..., 99（因为后置 \\`i++\\` 先用旧值参与加法）。这是首项 1、末项 99、公差 2 的等差数列，共 50 项，和为 $(1+99)\\\\times50\\\\div2 = 2500$。",
      "4. 结论：程序确实输出 2500，命题正确。",
      "",
      "**考点：** 后置自增 \\`i++\\` 在循环体与循环步进中的双重叠加效应`,",
    ];
    lines.splice(q24ExpStart, q24ExpEnd - q24ExpStart + 1, ...newQ24Exp);
    console.log(`✅ Q24 cleaned up (lines ${q24ExpStart+1}-${q24ExpEnd+1} -> ${newQ24Exp.length} lines)`);
  }
}

fs.writeFileSync(filePath, lines.join('\n'), 'utf-8');
console.log('\nDone. File saved.');
