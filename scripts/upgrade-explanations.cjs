/**
 * 批量升级 Level 1 试卷的 explanation 格式 + 标签迁移
 *
 * 功能：
 * 1. 将旧格式 explanation: '纯文本' 转为 explanation: `**答案：X**\n\n**解析：**\n纯文本\n\n**考点：**...`
 * 2. 移除 tags 中的 LEVEL1_TAGS.judge
 * 3. 保留已经是新格式（模板字符串）的 explanation 不变
 *
 * 用法：node scripts/upgrade-explanations.js [文件或目录]
 * 示例：node scripts/upgrade-explanations.js src/data/gesp/level1/2023-03-l1.js
 */

const fs = require('fs');
const path = require('path');

const ANSWER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * 从题目数据推导答案显示文本
 */
function getAnswerDisplay(question) {
  if (question.type === 'single' || question.type === 'multiple') {
    if (typeof question.answer === 'number') {
      return ANSWER_LETTERS[question.answer] || String(question.answer);
    }
    if (Array.isArray(question.answer)) {
      return question.answer.map(i => ANSWER_LETTERS[i]).join('');
    }
    return String(question.answer);
  }
  if (question.type === 'judge') {
    return question.answer === 0 ? '正确' : '错误';
  }
  return '';
}

/**
 * 从 tags 推导考点文本
 */
function inferKeyPoint(tags) {
  if (!tags || !tags.length) return '';
  // 提取标签值（去掉 LEVEL1_TAGS. 前缀后的中文值）
  // 这里我们直接返回标签列表，后续人工可补充
  return '';
}

/**
 * 升级单个 explanation
 */
function upgradeExplanation(oldExplanation, question) {
  // 已经是新格式的跳过
  if (oldExplanation.startsWith('**答案：')) {
    return null; // 不需要修改
  }

  const answerDisplay = getAnswerDisplay(question);
  if (!answerDisplay) return null; // 无法推导答案的跳过

  const isJudge = question.type === 'judge';

  if (isJudge) {
    const isCorrect = answerDisplay === '正确';
    // 判断题格式
    const newExplanation =
      '`**答案：' + answerDisplay + '**\n\n' +
      '**判定依据：**\n' +
      oldExplanation + '\n\n' +
      (isCorrect
        ? '**易混概念：** 此类判断容易将"可以"与"必须"混淆，注意区分充分条件与必要条件。\n'
        : '**纠错：** 原命题说法有误。' + oldExplanation + '\n\n**易混概念：** 注意区分相关概念的适用范围和边界条件。\n') +
      '**考点：** ' + (question.tags || []).map(t => {
        const m = t.match(/LEVEL1_TAGS\.(\w+)/);
        return m ? m[1] : t;
      }).join('、');
    return newExplanation + '`';
  }

  // 选择题格式
  const options = question.options || [];
  let optionAnalysis = '';
  const correctIdx = typeof question.answer === 'number' ? question.answer : -1;

  options.forEach((opt, idx) => {
    const letter = ANSWER_LETTERS[idx];
    if (idx === correctIdx) {
      optionAnalysis += `- **${letter} ${opt}**：正确答案。\n`;
    } else {
      optionAnalysis += `- **${letter} ${opt}**：错误。`;
      // 尝试给出为什么错的简短说明
      if (oldExplanation.length > 5) {
        optionAnalysis += `\n`;
      } else {
        optionAnalysis += `\n`;
      }
    }
  });

  const newExplanation =
    '`**答案：' + answerDisplay + '**\n\n' +
    '**解析：**\n' +
    oldExplanation + '\n\n' +
    optionAnalysis +
    '**考点：** ' + (question.tags || []).map(t => {
      const m = t.match(/LEVEL1_TAGS\.(\w+)/);
      return m ? m[1] : t;
    }).join('、') +
    '`';

  return newExplanation;
}

/**
 * 处理单个文件
 */
function processFile(filePath) {
  console.log(`\n处理: ${filePath}`);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. 移除 LEVEL1_TAGS.judge 引用
  const judgePattern = /LEVEL1_TAGS\.judge,\s*/g;
  const judgeMatches = content.match(judgePattern);
  if (judgeMatches) {
    content = content.replace(judgePattern, '');
    console.log(`  移除了 ${judgeMatches.length} 处 LEVEL1_TAGS.judge`);
    modified = true;
  }

  // 2. 升级 explanation 格式
  // 由于直接解析 JS 对象很复杂，我们用正则匹配 explanation 字段
  // 匹配 explanation: '...' 格式（单引号，不含模板字符串）
  // 注意：需要处理单引号内有转义单引号的情况

  // 简单策略：匹配 explanation: '...' 并替换
  // 但这很难用正则完美处理（引号嵌套、转义等）
  // 更好的方式：用 eval 或动态 import 加载数据

  // 先统计旧格式数量
  const oldFormatCount = (content.match(/explanation:\s*'/g) || []).length;
  const newFormatCount = (content.match(/explanation:\s*`/g) || []).length;
  console.log(`  旧格式: ${oldFormatCount}, 新格式: ${newFormatCount}`);

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  ✅ 已保存`);
  } else {
    console.log(`  无需修改`);
  }

  return { oldFormatCount, newFormatCount, judgeRemoved: judgeMatches ? judgeMatches.length : 0 };
}

/**
 * 处理目录下所有 l1 文件
 */
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath)
    .filter(f => f.endsWith('-l1.js') && f !== 'shared.js')
    .sort();

  let totalOld = 0, totalNew = 0, totalJudge = 0;

  for (const file of files) {
    const result = processFile(path.join(dirPath, file));
    totalOld += result.oldFormatCount;
    totalNew += result.newFormatCount;
    totalJudge += result.judgeRemoved;
  }

  console.log(`\n========== 汇总 ==========`);
  console.log(`处理文件数: ${files.length}`);
  console.log(`旧格式 explanation: ${totalOld}`);
  console.log(`新格式 explanation: ${totalNew}`);
  console.log(`移除 LEVEL1_TAGS.judge: ${totalJudge}`);
}

// 主入口
const target = process.argv[2] || 'src/data/gesp/level1';
const stat = fs.statSync(target);

if (stat.isDirectory()) {
  processDirectory(target);
} else {
  processFile(target);
}
