#!/usr/bin/env node
/**
 * fix-useless-escape-v2.cjs
 *
 * 修复所有 JS 字符串字面量中 ESLint no-useless-escape 报告的不必要转义字符
 * 处理模板字符串、双引号字符串、单引号字符串
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'gesp');

const stats = {
  filesProcessed: 0,
  filesModified: 0,
  escapesFixed: 0,
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
 * 解析一个字符串字面量（单引号、双引号或模板字符串）
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
 * 修复字符串内容中的不必要转义
 */
function fixUselessEscapes(inner, quote) {
  let result = '';
  let i = 0;
  let changed = false;

  while (i < inner.length) {
    if (inner[i] === '\\' && i + 1 < inner.length) {
      const next = inner[i + 1];

      // 必须保留的转义（所有引号类型通用）
      if (next === '\\' || next === 'n' || next === 't' || next === 'r' || next === '0') {
        result += inner[i] + next;
        i += 2;
        continue;
      }

      // 当前引号类型的引号转义必须保留
      if (next === quote) {
        result += inner[i] + next;
        i += 2;
        continue;
      }

      // 模板字符串特有
      if (quote === '`') {
        if (next === '`') {
          result += inner[i] + next;
          i += 2;
          continue;
        }
        // ${ 必须转义
        if (next === '$' && i + 2 < inner.length && inner[i + 2] === '{') {
          result += inner[i] + next + inner[i + 2];
          i += 3;
          continue;
        }
        // 在模板字符串中，\' 和 \" 都是不必要的转义
        if (next === "'" || next === '"') {
          result += next;
          i += 2;
          changed = true;
          continue;
        }
      }
      
      // \ (空格) → 空格（不必要转义）
      if (next === ' ') {
        result += ' ';
        i += 2;
        changed = true;
        continue;
      }
      
      // 在单引号中，\" 不需要转义
      if (quote === "'" && next === '"') {
        result += '"';
        i += 2;
        changed = true;
        continue;
      }
      
      // 在双引号中，\' 不需要转义
      if (quote === '"' && next === "'") {
        result += "'";
        i += 2;
        changed = true;
        continue;
      }

      // \$ → $（不必要转义，无论哪种引号）
      if (next === '$') {
        result += '$';
        i += 2;
        changed = true;
        continue;
      }

      // \u, \x → 保留（unicode/hex 转义）
      if (next === 'u' || next === 'x') {
        result += inner[i] + next;
        i += 2;
        continue;
      }

      // 其他字母转义 → 不必要（如 \l, \L, \a, \b 等）
      if (/[a-zA-Z]/.test(next)) {
        result += next;
        i += 2;
        changed = true;
        continue;
      }

      // 其他情况保留
      result += inner[i] + next;
      i += 2;
      continue;
    }
    result += inner[i];
    i++;
  }

  return { text: result, changed };
}

function processFile(filePath) {
  let src = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let fileEscapesFixed = 0;

  const replacements = [];

  // 找到所有字符串字面量
  const stringRegex = /['"`]/g;
  let match;

  while ((match = stringRegex.exec(src)) !== null) {
    const pos = match.index;

    // 跳过注释
    const lineStart = src.lastIndexOf('\n', pos) + 1;
    const linePrefix = src.substring(lineStart, pos).trim();
    if (linePrefix.startsWith('//') || linePrefix.startsWith('*') || linePrefix.startsWith('/*')) continue;

    const parsed = parseStringLiteral(src, pos);
    if (!parsed) continue;

    const inner = parsed.raw.slice(1, -1);
    const { text: fixed, changed } = fixUselessEscapes(inner, parsed.quote);

    if (changed) {
      replacements.push({
        start: parsed.start,
        end: parsed.end,
        replacement: parsed.quote + fixed + parsed.quote,
      });
      fileEscapesFixed++;
    }

    // 跳过已处理的字符串
    stringRegex.lastIndex = parsed.end;
  }

  // 从后往前应用替换
  for (let i = replacements.length - 1; i >= 0; i--) {
    const r = replacements[i];
    src = src.substring(0, r.start) + r.replacement + src.substring(r.end);
  }

  if (replacements.length > 0) {
    modified = true;
    stats.filesModified++;
    stats.escapesFixed += fileEscapesFixed;
  }

  if (modified) {
    fs.writeFileSync(filePath, src, 'utf-8');
  }

  stats.filesProcessed++;

  if (fileEscapesFixed > 0) {
    const relPath = path.relative(DATA_DIR, filePath);
    console.log(`  ✅ ${relPath}: ${fileEscapesFixed} 处不必要转义已修复`);
  }
}

function main() {
  console.log('🔧 修复所有字符串中不必要的转义字符...\n');

  const jsFiles = getJsFiles(DATA_DIR);
  console.log(`📁 找到 ${jsFiles.length} 个 JS 数据文件\n`);

  for (const file of jsFiles) {
    try {
      processFile(file);
    } catch (err) {
      console.error(`  ❌ ${path.relative(DATA_DIR, file)}: ${err.message}`);
    }
  }

  console.log('\n========== 修复结果 ==========');
  console.log(`📁 处理文件数: ${stats.filesProcessed}`);
  console.log(`✏️  修改文件数: ${stats.filesModified}`);
  console.log(`🔄 修复转义处数: ${stats.escapesFixed}`);
}

main();
