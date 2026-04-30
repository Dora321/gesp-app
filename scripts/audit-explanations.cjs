#!/usr/bin/env node
/**
 * audit-explanations.cjs
 * ──────────────────────────────────────────────────────────────────
 * 自动化审计脚本：检查所有 GESP 数据文件中解析与题目的一致性。
 *
 * 检查维度：
 *   1. 答案一致性 — explanation 中声明的答案是否与 answer 字段匹配
 *   2. 选项引用一致性 — explanation 中提到的选项关键词是否与 options 对应
 *   3. 空解析检测 — 缺失或模板占位符
 *   4. 解析质量评估 — 区分一句话 vs 高质量深度解析
 *
 * 用法：node scripts/audit-explanations.cjs [--level N] [--json]
 * ──────────────────────────────────────────────────────────────────
 */

const fs = require('fs');
const path = require('path');

// ──── CLI 参数 ────
const args = process.argv.slice(2);
const levelFilter = args.includes('--level') ? parseInt(args[args.indexOf('--level') + 1], 10) : null;
const jsonOutput = args.includes('--json');

// ──── 颜色输出 ────
const c = {
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s) => `\x1b[36m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
};

// ──── 数据根目录 ────
const DATA_ROOT = path.resolve(__dirname, '..', 'src', 'data', 'gesp');

/**
 * 动态加载 JS 数据文件，提取 paperData
 * 策略：读取文件内容，用正则提取 questions 数组中的 JS 对象
 */
function loadPaperData(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');

  // 尝试提取 paperData 对象
  // 方法：通过 require/import 模拟不可行（ES modules），改用 eval hack
  // 安全做法：用正则/AST，但这里为了简便用 Function 构造
  try {
    // 把 export / import 去掉，构造一个可执行的 module
    let code = content
      .replace(/^\s*import\s+.*?;\s*$/gm, '')       // 去 import
      .replace(/^\s*export\s+(const|let|var|function)/gm, '$1')  // export const → const
      .replace(/^\s*export\s+default\s+/gm, 'const __default__ = ')
      .replace(/^\s*export\s*\{[^}]*\}\s*;?\s*$/gm, '');  // 去 export { }

    // 注入 LEVEL1_TAGS 等常量（如果引用了的话）
    const tagsStub = `
      const LEVEL1_TAGS = {
        basics: '基础语法', functions: '函数', io: '输入输出',
        condition: '条件判断', loop: '循环', array: '数组与字符串',
        operator: '运算符', judge: '判断题',
      };
      const LEVEL2_TAGS = LEVEL1_TAGS;
      const LEVEL3_TAGS = LEVEL1_TAGS;
      const createLevel1Paper = () => ({});
      const LEVEL1_QUESTION_TEMPLATE = [];
    `;

    const wrapped = `${tagsStub}\n${code}\nreturn typeof paperData !== 'undefined' ? paperData : null;`;
    const fn = new Function(wrapped);
    return fn();
  } catch (e) {
    return null;
  }
}

/**
 * 审计单个题目
 */
function auditQuestion(q, fileName) {
  const issues = [];
  const exp = (q.explanation || '').trim();
  const qType = q.type || 'single';
  const isProgramming = qType === 'coding' || qType === 'programming';

  // ──── 1. 空解析检测 ────
  if (!exp) {
    issues.push({ severity: 'medium', type: 'empty', message: '解析为空' });
    return issues;  // 空解析无需进一步检查
  }

  if (isProgramming) {
    // 编程题只检查是否存在解析
    if (exp.length < 20) {
      issues.push({ severity: 'low', type: 'shallow', message: `编程题解析过短 (${exp.length} 字)` });
    }
    return issues;
  }

  // ──── 2. 答案一致性 ────
  const isJudge = qType === 'judge' || qType === 'tf';
  if (isJudge) {
    // 判断题：检查是否声明了"正确"或"错误"
    const declaredCorrect = /\*\*答案[：:]\s*正确/.test(exp);
    const declaredWrong = /\*\*答案[：:]\s*错误/.test(exp);
    if (declaredCorrect && q.answer !== 0) {
      issues.push({ severity: 'critical', type: 'answer_mismatch', message: `解析声明"答案：正确"但 answer=${q.answer}（应为 0=正确）` });
    }
    if (declaredWrong && q.answer !== 1) {
      issues.push({ severity: 'critical', type: 'answer_mismatch', message: `解析声明"答案：错误"但 answer=${q.answer}（应为 1=错误）` });
    }
  } else {
    // 选择题：检查答案字母
    const answerMatch = exp.match(/\*\*答案[：:]\s*([A-D])/);
    if (answerMatch) {
      const declaredLetter = answerMatch[1];
      const expectedLetter = String.fromCharCode(65 + q.answer);
      if (declaredLetter !== expectedLetter) {
        issues.push({
          severity: 'critical',
          type: 'answer_mismatch',
          message: `解析声明答案 ${declaredLetter}，实际 answer 字段指向 ${expectedLetter}`,
        });
      }
    }
  }

  // ──── 3. 内容相关性检查（关键词匹配） ────
  if (!isJudge && q.options && q.options.length > 0) {
    const correctIdx = q.answer;
    const correctOption = q.options[correctIdx] || '';
    const correctLetter = String.fromCharCode(65 + correctIdx);

    // 检查解析中对正确选项的引用是否包含该选项的关键词
    // 取选项的前 8 个有意义字符
    const cleanOption = correctOption.replace(/[`*_#\s]/g, '').substring(0, 8);

    // 检查解析中是否提到了正确选项的关键文本
    if (cleanOption.length >= 3) {
      // 检查 explanation 的主体部分是否与正确选项相关
      const expLower = exp.toLowerCase();
      const optLower = cleanOption.toLowerCase();

      // 如果解析文本中完全没有提到正确选项的关键词（容忍度较高）
      // 同时也没有正确的答案字母标注，那大概率是错位的
      if (!expLower.includes(optLower) && !exp.includes(`**${correctLetter} (`)) {
        // 进一步检查：解析是否提到了完全不相关的概念
        const questionText = (q.question || '').toLowerCase();
        const questionKeywords = extractKeywords(questionText);
        const expKeywords = extractKeywords(expLower);

        const overlap = questionKeywords.filter(k => expKeywords.includes(k));
        if (overlap.length === 0 && questionKeywords.length > 2) {
          issues.push({
            severity: 'critical',
            type: 'content_mismatch',
            message: `解析内容可能与题目不匹配（题目关键词与解析关键词无交集）`,
          });
        }
      }
    }
  }

  // ──── 4. 解析质量评估 ────
  const lines = exp.split('\n').filter(l => l.trim().length > 0);
  const hasStructuredFormat = /\*\*选项逐项分析/.test(exp) || /\*\*判定依据/.test(exp);
  const hasOptionBreakdown = (exp.match(/-\s*\*\*[A-D]/g) || []).length >= 2;

  if (lines.length <= 2 && !hasStructuredFormat) {
    issues.push({ severity: 'low', type: 'shallow', message: `解析为一句话简述 (${lines.length} 行)` });
  } else if (hasStructuredFormat && hasOptionBreakdown) {
    // 高质量解析，无问题
  } else if (lines.length >= 3) {
    // 中等质量
  }

  return issues;
}

/**
 * 提取文本中的关键词（用于相关性比较）
 */
function extractKeywords(text) {
  const keywords = [];
  const patterns = [
    /printf/gi, /scanf/gi, /cout/gi, /cin/gi,
    /for/gi, /while/gi, /if/gi, /else/gi,
    /数组/g, /循环/g, /条件/g, /变量/g, /函数/g,
    /指针/g, /链表/g, /排序/g, /递归/g,
    /ASCII/gi, /字符/g, /整数/g, /浮点/g,
    /作用域/g, /关键字/g, /标识符/g,
    /奇数/g, /偶数/g, /取模/g, /余数/g,
    /输出/g, /输入/g, /格式/g,
    /%-?\d*d/g, /%d/g, /%f/g, /%s/g,
    /i\+\+/g, /\+\+i/g, /i--/g,
    /break/gi, /continue/gi, /return/gi,
  ];

  for (const p of patterns) {
    const matches = text.match(p);
    if (matches) {
      keywords.push(...matches.map(m => m.toLowerCase()));
    }
  }
  return [...new Set(keywords)];
}

/**
 * 遍历并审计所有数据文件
 */
function runAudit() {
  const results = {};
  const summary = {
    totalFiles: 0,
    totalQuestions: 0,
    criticalIssues: 0,
    highIssues: 0,
    mediumIssues: 0,
    lowIssues: 0,
    highQualityCount: 0,
    oneLineCount: 0,
    emptyCount: 0,
    byLevel: {},
  };

  for (let level = 1; level <= 8; level++) {
    if (levelFilter && level !== levelFilter) continue;

    const levelDir = path.join(DATA_ROOT, `level${level}`);
    if (!fs.existsSync(levelDir)) continue;

    const files = fs.readdirSync(levelDir)
      .filter(f => f.endsWith('.js') && f !== 'shared.js' && !f.endsWith('.jsx'));

    const levelSummary = {
      files: 0,
      questions: 0,
      critical: 0,
      high: 0,
      medium: 0,
      low: 0,
      highQuality: 0,
      oneLine: 0,
      empty: 0,
      issues: [],
    };

    for (const file of files) {
      const filePath = path.join(levelDir, file);
      const paper = loadPaperData(filePath);

      if (!paper || !paper.questions) {
        if (!jsonOutput) {
          console.log(c.yellow(`  ⚠ 无法加载: ${file}`));
        }
        continue;
      }

      summary.totalFiles++;
      levelSummary.files++;

      const allQuestions = [
        ...(paper.questions || []),
        ...(paper.programmingQuestions || []),
        ...(paper.codingQuestions || []),
      ];

      for (const q of allQuestions) {
        summary.totalQuestions++;
        levelSummary.questions++;

        const issues = auditQuestion(q, file);

        for (const issue of issues) {
          const entry = {
            file,
            questionId: q.id,
            questionType: q.type,
            ...issue,
          };
          levelSummary.issues.push(entry);

          switch (issue.severity) {
            case 'critical':
              summary.criticalIssues++;
              levelSummary.critical++;
              break;
            case 'high':
              summary.highIssues++;
              levelSummary.high++;
              break;
            case 'medium':
              summary.mediumIssues++;
              levelSummary.medium++;
              break;
            case 'low':
              summary.lowIssues++;
              levelSummary.low++;
              break;
          }

          if (issue.type === 'empty') {
            summary.emptyCount++;
            levelSummary.empty++;
          }
          if (issue.type === 'shallow') {
            summary.oneLineCount++;
            levelSummary.oneLine++;
          }
        }

        // 计算高质量解析数量
        const exp = (q.explanation || '').trim();
        const isProgramming = q.type === 'coding' || q.type === 'programming';
        if (!isProgramming && exp.length > 0) {
          const hasStructured = /\*\*选项逐项分析/.test(exp) || /\*\*判定依据/.test(exp);
          const hasOptions = (exp.match(/-\s*\*\*[A-D]/g) || []).length >= 2;
          if (hasStructured && hasOptions) {
            summary.highQualityCount++;
            levelSummary.highQuality++;
          }
        }
      }

      results[`level${level}`] = levelSummary;
      summary.byLevel[level] = levelSummary;
    }
  }

  return { results, summary };
}

/**
 * 打印报告
 */
function printReport({ results, summary }) {
  if (jsonOutput) {
    // JSON 输出模式
    const outputPath = path.join(__dirname, 'audit-results.json');
    fs.writeFileSync(outputPath, JSON.stringify({ summary, results }, null, 2), 'utf-8');
    console.log(`审计结果已写入 ${outputPath}`);
    return;
  }

  console.log('\n' + c.bold('═══════════════════════════════════════════════'));
  console.log(c.bold('  GESP 题库解析质量审计报告'));
  console.log(c.bold('═══════════════════════════════════════════════') + '\n');

  // 按级别输出
  for (let level = 1; level <= 8; level++) {
    const ls = summary.byLevel[level];
    if (!ls) continue;

    const statusIcon = ls.critical > 0 ? '🔴' : ls.medium > 0 ? '🟡' : '🟢';
    console.log(c.bold(`${statusIcon} Level ${level}`));
    console.log(`   文件: ${ls.files}  题目: ${ls.questions}  高质量解析: ${ls.highQuality}`);

    if (ls.critical > 0) {
      console.log(c.red(`   🔴 严重问题: ${ls.critical}`));
    }
    if (ls.medium > 0) {
      console.log(c.yellow(`   🟡 中等问题: ${ls.medium} (空解析)`));
    }
    if (ls.oneLine > 0) {
      console.log(c.dim(`   📝 一句话解析: ${ls.oneLine}`));
    }

    // 打印严重问题详情
    const criticals = ls.issues.filter(i => i.severity === 'critical');
    for (const issue of criticals) {
      console.log(c.red(`      ❌ ${issue.file} #${issue.questionId}: ${issue.message}`));
    }

    console.log('');
  }

  // 汇总
  console.log(c.bold('─────────────────────────────────────────────'));
  console.log(c.bold('  汇总统计'));
  console.log(c.bold('─────────────────────────────────────────────'));
  console.log(`  总文件数: ${summary.totalFiles}`);
  console.log(`  总题目数: ${summary.totalQuestions}`);
  console.log(`  高质量解析覆盖: ${summary.highQualityCount}/${summary.totalQuestions} (${(summary.highQualityCount / summary.totalQuestions * 100).toFixed(1)}%)`);
  console.log(c.red(`  🔴 严重问题 (答案/内容不匹配): ${summary.criticalIssues}`));
  console.log(c.yellow(`  🟡 中等问题 (空解析): ${summary.mediumIssues}`));
  console.log(c.dim(`  📝 一句话简述: ${summary.oneLineCount}`));
  console.log('');

  if (summary.criticalIssues === 0) {
    console.log(c.green('  ✅ 未发现答案/内容不匹配的严重问题！'));
  } else {
    console.log(c.red(`  ⚠️  发现 ${summary.criticalIssues} 处严重问题，请立即修复！`));
  }
  console.log('');
}

// ──── 执行 ────
const auditResult = runAudit();
printReport(auditResult);

// 同时输出 JSON（方便后续脚本消费）
const jsonPath = path.join(__dirname, 'audit-results.json');
fs.writeFileSync(jsonPath, JSON.stringify(auditResult, null, 2), 'utf-8');
if (!jsonOutput) {
  console.log(c.dim(`  (详细 JSON 结果已保存至 ${path.relative(process.cwd(), jsonPath)})`));
}
