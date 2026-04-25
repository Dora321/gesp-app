#!/usr/bin/env node
/**
 * fix-extra-spaces.cjs
 *
 * 清理 question 字段中代码块外的多余连续空格（2个及以上空格压缩为1个）
 * 同时处理模板字符串和普通字符串
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'gesp');

const stats = {
  filesProcessed: 0,
  filesModified: 0,
  spacesCleaned: 0,
};

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
 * 解析字符串字面量
 */
function parseStringLiteral(src, start) {
  const quote = src[start];
  if (quote !== "'" && quote !== '"' && quote !== '`') return null;

  let i = start + 1;
  while (i < src.length) {
    const ch = src[i];
    if (ch === '\\') {
      i += 2;
      continue;
    }
    if (ch === quote) {
      return { start, end: i + 1, quote, raw: src.substring(start, i + 1) };
    }
    if (quote !== '`' && (ch === '\n' || ch === '\r')) {
      return null;
    }
    i++;
  }
  return null;
}

/**
 * 清理字符串内容中的多余空格（代码块外）
 * 对于模板字符串，需要考虑真实换行中的代码块
 * 对于普通字符串，\n 是转义序列
 */
function cleanExtraSpaces(inner, quote) {
  if (quote === '`') {
    // 模板字符串：按 ``` 代码块分割
    const parts = splitByCodeBlocks(inner);
    let changed = false;
    const result = parts.map((part) => {
      if (part.isCodeBlock) return part.text;
      const cleaned = cleanSpacesInText(part.text);
      if (cleaned !== part.text) changed = true;
      return cleaned;
    }).join('');
    return { text: result, changed };
  } else {
    // 单/双引号字符串：\n 是转义序列，需要特殊处理
    // 简化策略：只在非代码块部分清理连续空格
    // 先检查是否含代码块标记
    if (inner.includes('```')) {
      // 含代码块的单/双引号字符串，代码块由 \n```cpp\n 分隔
      // 按 \n``` 分割
      const parts = inner.split(/(\\n```[\s\S]*?\\n```)/g);
      let changed = false;
      const result = parts.map((part, idx) => {
        if (idx % 2 === 1) return part; // 代码块
        const cleaned = cleanSpacesInText(part);
        if (cleaned !== part.text) changed = true;
        return cleaned;
      }).join('');
      return { text: result, changed };
    } else {
      // 无代码块，直接清理
      const cleaned = cleanSpacesInText(inner);
      return { text: cleaned, changed: cleaned !== inner };
    }
  }
}

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
      const idx = remaining.indexOf('```', 3);
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
 * 清理文本中的连续多余空格（跳过转义序列）
 */
function cleanSpacesInText(text) {
  let result = '';
  let i = 0;
  while (i < text.length) {
    if (text[i] === '\\' && i + 1 < text.length) {
      result += text[i] + text[i + 1];
      i += 2;
      continue;
    }
    if (text[i] === ' ') {
      let count = 0;
      while (i + count < text.length && text[i + count] === ' ') {
        count++;
      }
      if (count > 1) {
        result += ' ';
        i += count;
        continue;
      }
    }
    result += text[i];
    i++;
  }
  return result;
}

function processFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let fileSpacesCleaned = 0;

  const replacements = [];

  // 只处理 question 字段
  const questionRegex = /question:\s*/g;
  let match;

  while ((match = questionRegex.exec(src)) !== null) {
    const afterColon = match.index + match[0].length;
    if (afterColon >= src.length) continue;

    const quoteChar = src[afterColon];
    if (quoteChar !== '`' && quoteChar !== '"' && quoteChar !== "'") continue;

    const parsed = parseStringLiteral(src, afterColon);
    if (!parsed) continue;

    const inner = parsed.raw.slice(1, -1);
    const { text: cleaned, changed } = cleanExtraSpaces(inner, parsed.quote);

    if (changed) {
      replacements.push({
        start: parsed.start,
        end: parsed.end,
        replacement: parsed.quote + cleaned + parsed.quote,
      });
      fileSpacesCleaned++;
    }
  }

  // 从后往前应用替换
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    src = src.substring(0, r.start) + r.replacement + src.substring(r.end);
  }

  if (replacements.length > 0) {
    modified = true;
    stats.filesModified++;
    stats.spacesCleaned += fileSpacesCleaned;
  }

  if (modified) {
    fs.writeFileSync(filePath, src, 'utf-8');
  }

  stats.filesProcessed++;

  if (fileSpacesCleaned > 0) {
    const relPath = path.relative(DATA_DIR, filePath);
    console.log(`  ✅ ${relPath}: ${fileSpacesCleaned} 处空格已清理`);
  }
}

function main() {
  console.log('🧹 清理 question 字段中的多余空格...\n');

  const jsFiles = getJsFiles(DATA_DIR);
  console.log(`📁 找到 ${jsFiles.length} 个 JS 数据文件\n`);

  for (const file of jsFiles) {
    try {
      processFile(file);
    } catch (err) {
      console.error(`  ❌ ${path.relative(DATA_DIR, file)}: ${err.message}`);
    }
  }

  console.log('\n========== 清理结果 ==========');
  console.log(`📁 处理文件数: ${stats.filesProcessed}`);
  console.log(`✏️  修改文件数: ${stats.filesModified}`);
  console.log(`🧹 空格清理处数: ${stats.spacesCleaned}`);
}

main();
