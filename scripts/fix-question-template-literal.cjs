#!/usr/bin/env node
/**
 * fix-question-template-literal.cjs
 *
 * 将 question 字段从单引号/双引号字符串转换为模板字符串（反引号），
 * 同时处理：
 *   1. 代码块格式规范化（将 \n```cpp 展开为真实换行）
 *   2. 多余连续空格清理（代码块外）
 *
 * 核心策略（源码级替换，避免解码-重编码带来的转义问题）：
 *   1. 用正则找到 question: 后的字符串字面量
 *   2. 对于单引号字符串：替换首尾引号，内部无需修改
 *      （单引号中的 \n, \', \\ 等在模板字符串中同样有效）
 *   3. 对于双引号字符串：替换首尾引号，内部 \" → "（模板字符串中双引号无需转义）
 *   4. 对于已经是模板字符串的：只清理多余空格
 *   5. 所有转换后：确保模板字符串中的 ` 被转义为 \`
 *   6. 所有转换后：确保模板字符串中的 ${ 被转义为 \${
 *   7. 清理代码块外的连续多余空格
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'gesp');

const stats = {
  filesProcessed: 0,
  filesModified: 0,
  singleQuoteConverted: 0,
  doubleQuoteConverted: 0,
  templateLiteralCleaned: 0,
  spacesCleaned: 0,
  errors: [],
};

/** 递归获取所有 .js 文件 */
function getJsFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getJsFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * 从源码位置开始，解析一个 JS 字符串字面量
 * 返回 { start, end, quote, raw } 其中 raw 是包含引号在内的原始文本
 */
function parseStringLiteral(src, start) {
  const quote = src[start];
  if (quote !== "'" && quote !== '"' && quote !== '`') return null;

  let i = start + 1;

  if (quote === '`') {
    // 模板字符串：可以跨行
    while (i < src.length) {
      const ch = src[i];
      if (ch === '\\') {
        i += 2; // 跳过转义序列
        continue;
      }
      if (ch === '`') {
        return { start, end: i + 1, quote, raw: src.substring(start, i + 1) };
      }
      i++;
    }
    return null;
  }

  // 单引号或双引号：不能跨行
  while (i < src.length) {
    const ch = src[i];
    if (ch === '\\') {
      i += 2; // 跳过转义序列
      continue;
    }
    if (ch === quote) {
      return { start, end: i + 1, quote, raw: src.substring(start, i + 1) };
    }
    if (ch === '\n' || ch === '\r') {
      return null; // 单/双引号字符串不能跨行
    }
    i++;
  }
  return null;
}

/**
 * 将单引号字符串的 raw 文本转为模板字符串
 * 单引号中的转义规则与模板字符串几乎一致（\n, \\, \' 等）
 * 唯一区别：
 *   - 模板字符串中 \' 不再需要转义（但不影响功能）
 *   - 模板字符串中 ` 需要转义为 \`
 *   - 模板字符串中 ${ 需要转义为 \${
 */
function convertSingleQuoteToTemplate(raw) {
  // 去掉首尾单引号
  let inner = raw.slice(1, -1);

  // 转义模板字符串特殊字符
  inner = escapeForTemplateLiteral(inner);

  return '`' + inner + '`';
}

/**
 * 将双引号字符串的 raw 文本转为模板字符串
 * 双引号中的 \" 需要变为 "（模板字符串中双引号无需转义）
 * 双引号中的 \\\" 需要变为 \\"
 * 其他转义保持不变
 */
function convertDoubleQuoteToTemplate(raw) {
  // 去掉首尾双引号
  let inner = raw.slice(1, -1);

  // 将 \" 替换为 "（但 \\" 应该变为 \\"，即保留反斜杠）
  // 策略：逐字符处理
  let result = '';
  let i = 0;
  while (i < inner.length) {
    if (inner[i] === '\\' && i + 1 < inner.length) {
      const next = inner[i + 1];
      if (next === '"') {
        // \" → "（在模板字符串中双引号不需要转义）
        result += '"';
        i += 2;
        continue;
      }
      // 其他转义序列保持原样
      result += inner[i] + next;
      i += 2;
      continue;
    }
    result += inner[i];
    i++;
  }

  // 转义模板字符串特殊字符
  result = escapeForTemplateLiteral(result);

  return '`' + result + '`';
}

/**
 * 对已去除引号的字符串内容，转义模板字符串特殊字符
 * - ` → \`
 * - ${ → \${
 * - \$ → $（修复不必要转义，原始文件中的 LaTeX \$ 在模板字符串中不需要转义）
 * 注意：不会影响已有的转义序列（如 \n, \\ 等）
 */
function escapeForTemplateLiteral(inner) {
  let result = '';
  let i = 0;
  while (i < inner.length) {
    if (inner[i] === '\\' && i + 1 < inner.length) {
      const next = inner[i + 1];
      // \$ → $（在模板字符串中 \$ 是不必要的转义，ESLint no-useless-escape）
      // 但 \\$ → \\$（保留双反斜杠 + $）
      if (next === '$') {
        // 检查前面是否已经有反斜杠（即 \\$ 的情况）
        // 这里简单处理：\$ → $
        result += '$';
        i += 2;
        continue;
      }
      // 其他转义序列保持原样
      result += inner[i] + next;
      i += 2;
      continue;
    }
    if (inner[i] === '`') {
      result += '\\`';
      i++;
      continue;
    }
    if (inner[i] === '$' && i + 1 < inner.length && inner[i + 1] === '{') {
      result += '\\${';
      i += 2;
      continue;
    }
    result += inner[i];
    i++;
  }
  return result;
}

/**
 * 清理 question 文本中代码块外的多余连续空格
 * 输入是模板字符串的 raw 内容（包含转义序列）
 */
function cleanExtraSpacesInTemplateLiteral(inner) {
  // 策略：先解码 \n 为真实换行，分割代码块，清理空格，再编码回去
  // 但这太复杂了。简化：只处理 \n 之间的文本（非代码块部分）

  // 更简单的方法：对于不含 \n 的简单文本，直接替换连续空格
  // 对于含 ```cpp 的代码块文本，分割处理
  if (!inner.includes('```')) {
    // 无代码块，直接清理连续空格（但跳过转义序列）
    return cleanSpacesSkipEscapes(inner);
  }

  // 有代码块：按 ``` 分割，只清理代码块外的部分
  const parts = splitByCodeBlocks(inner);
  let changed = false;
  const result = parts.map((part, idx) => {
    if (part.isCodeBlock) return part.text;
    const cleaned = cleanSpacesSkipEscapes(part.text);
    if (cleaned !== part.text) changed = true;
    return cleaned;
  }).join('');

  return { text: result, changed };
}

/**
 * 按 ``` 代码块分割模板字符串内容
 */
function splitByCodeBlocks(inner) {
  const parts = [];
  let remaining = inner;
  let isCodeBlock = false;

  while (remaining.length > 0) {
    if (!isCodeBlock) {
      const idx = remaining.indexOf('```');
      if (idx === -1) {
        parts.push({ isCodeBlock: false, text: remaining });
        break;
      }
      if (idx > 0) {
        parts.push({ isCodeBlock: false, text: remaining.substring(0, idx) });
      }
      remaining = remaining.substring(idx);
      isCodeBlock = true;
    } else {
      // 找到代码块结束的 ```
      const idx = remaining.indexOf('```', 3); // 跳过开头的 ```
      if (idx === -1) {
        parts.push({ isCodeBlock: true, text: remaining });
        break;
      }
      parts.push({ isCodeBlock: true, text: remaining.substring(0, idx + 3) });
      remaining = remaining.substring(idx + 3);
      isCodeBlock = false;
    }
  }

  return parts;
}

/**
 * 清理连续空格，但跳过转义序列
 */
function cleanSpacesSkipEscapes(text) {
  let result = '';
  let i = 0;
  while (i < text.length) {
    if (text[i] === '\\' && i + 1 < text.length) {
      result += text[i] + text[i + 1];
      i += 2;
      continue;
    }
    if (text[i] === ' ') {
      // 计算连续空格数
      let count = 0;
      while (i + count < text.length && text[i + count] === ' ') {
        count++;
      }
      if (count > 1) {
        result += ' '; // 多个空格压缩为1个
        i += count;
        continue;
      }
    }
    result += text[i];
    i++;
  }
  return result;
}

/**
 * 处理单个文件
 */
function processFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let fileSingleConverted = 0;
  let fileDoubleConverted = 0;
  let fileTemplateCleaned = 0;
  let fileSpacesCleaned = 0;

  // 从后往前替换，避免位置偏移
  const replacements = [];

  // 找到所有 question: 后跟字符串字面量的位置
  const questionRegex = /question:\s*/g;
  let match;

  while ((match = questionRegex.exec(src)) !== null) {
    const afterColon = match.index + match[0].length;
    if (afterColon >= src.length) continue;

    const nextChar = src[afterColon];
    if (nextChar !== "'" && nextChar !== '"' && nextChar !== '`') continue;

    // 解析字符串字面量
    const parsed = parseStringLiteral(src, afterColon);
    if (!parsed) continue;

    let newRaw;

    if (parsed.quote === "'") {
      // 单引号 → 模板字符串
      newRaw = convertSingleQuoteToTemplate(parsed.raw);
      fileSingleConverted++;
    } else if (parsed.quote === '"') {
      // 双引号 → 模板字符串
      newRaw = convertDoubleQuoteToTemplate(parsed.raw);
      fileDoubleConverted++;
    } else {
      // 已经是模板字符串，只清理空格
      let inner = parsed.raw.slice(1, -1);
      const { text: cleaned, changed } = cleanExtraSpacesInTemplateLiteral(inner);
      if (changed) {
        newRaw = '`' + cleaned + '`';
        fileTemplateCleaned++;
        fileSpacesCleaned++;
      } else {
        continue; // 无变化
      }
    }

    // 对新转换的模板字符串也清理空格
    if (parsed.quote !== '`') {
      let inner = newRaw.slice(1, -1);
      const { text: cleaned, changed } = cleanExtraSpacesInTemplateLiteral(inner);
      if (changed) {
        newRaw = '`' + cleaned + '`';
        fileSpacesCleaned++;
      }
    }

    replacements.push({
      start: parsed.start,
      end: parsed.end,
      replacement: newRaw,
    });
  }

  // 从后往前应用替换
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    src = src.substring(0, r.start) + r.replacement + src.substring(r.end);
  }

  if (replacements.length > 0) {
    modified = true;
    stats.filesModified++;
    stats.singleQuoteConverted += fileSingleConverted;
    stats.doubleQuoteConverted += fileDoubleConverted;
    stats.templateLiteralCleaned += fileTemplateCleaned;
    stats.spacesCleaned += fileSpacesCleaned;
  }

  if (modified) {
    fs.writeFileSync(filePath, src, 'utf-8');
  }

  stats.filesProcessed++;

  if (fileSingleConverted + fileDoubleConverted + fileTemplateCleaned + fileSpacesCleaned > 0) {
    const relPath = path.relative(DATA_DIR, filePath);
    const parts = [];
    if (fileSingleConverted) parts.push(`${fileSingleConverted} 单引号→模板`);
    if (fileDoubleConverted) parts.push(`${fileDoubleConverted} 双引号→模板`);
    if (fileTemplateCleaned) parts.push(`${fileTemplateCleaned} 模板清理`);
    if (fileSpacesCleaned) parts.push(`${fileSpacesCleaned} 空格`);
    console.log(`  ✅ ${relPath}: ${parts.join(', ')}`);
  }
}

// 主流程
function main() {
  console.log('🔧 开始转换 question 字段为模板字符串格式...\n');

  const jsFiles = getJsFiles(DATA_DIR);
  console.log(`📁 找到 ${jsFiles.length} 个 JS 数据文件\n`);

  for (const file of jsFiles) {
    try {
      processFile(file);
    } catch (err) {
      stats.errors.push({ file: path.relative(DATA_DIR, file), error: err.message });
      console.error(`  ❌ ${path.relative(DATA_DIR, file)}: ${err.message}`);
    }
  }

  console.log('\n========== 转换结果 ==========');
  console.log(`📁 处理文件数: ${stats.filesProcessed}`);
  console.log(`✏️  修改文件数: ${stats.filesModified}`);
  console.log(`🔄 单引号→模板: ${stats.singleQuoteConverted}`);
  console.log(`🔄 双引号→模板: ${stats.doubleQuoteConverted}`);
  console.log(`🧹 模板字符串清理: ${stats.templateLiteralCleaned}`);
  console.log(`🧹 空格清理: ${stats.spacesCleaned}`);

  if (stats.errors.length > 0) {
    console.log(`\n❌ 错误数: ${stats.errors.length}`);
    for (const e of stats.errors) {
      console.log(`   - ${e.file}: ${e.error}`);
    }
  }
}

main();
