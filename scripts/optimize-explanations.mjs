#!/usr/bin/env node
/**
 * GESP 解析优化批量处理脚本
 * 
 * 使用 Gemini API 逐题优化 explanation 字段
 * 
 * 用法：
 *   node scripts/optimize-explanations.mjs --api-key=YOUR_KEY --file=src/data/gesp/level4/2024-12-l4.js
 *   node scripts/optimize-explanations.mjs --api-key=YOUR_KEY --level=4          # 处理整个级别
 *   node scripts/optimize-explanations.mjs --api-key=YOUR_KEY --level=4 --dry-run  # 仅预览，不写入
 *   node scripts/optimize-explanations.mjs --api-key=YOUR_KEY --level=4 --start-id=5  # 从第5题开始
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_ROOT = path.resolve(__dirname, '../src/data/gesp');

// ============================================================
// System Prompt
// ============================================================
const SYSTEM_PROMPT = `你是一位资深的 C++ 教学专家，专门为 GESP（编程能力等级认证）考试编写高质量的题目解析。你的任务是：接收一道 GESP 题目的完整数据，输出符合"黄金标准"的优化解析内容。

## 输出格式要求

你只输出 explanation 字段的纯文本内容（不含字段名、引号或反引号包裹）。输出会被直接放入 JS 模板字符串中。内部如需使用反引号，用 \\\` 转义。

## 黄金标准格式

### 单选题格式

**答案：{正确选项字母} ({正确选项内容})**

**选项逐项分析：**
- **A {选项A内容}**：✅ 正确。{详细的技术解释，说明为什么正确，包含原理分析}
- **B {选项B内容}**：❌ 错误。{具体说明错误原因，指出误解点}
- **C {选项C内容}**：❌ 错误。{具体说明错误原因，指出误解点}
- **D {选项D内容}**：❌ 错误。{具体说明错误原因，指出误解点}

**考点：** {用一句话概括本题涉及的核心知识点}

（注意：✅ 标记在正确答案选项上，❌ 标记在错误选项上。上面的示例假设 A 是正确答案，实际应根据题目调整。）

### 判断题格式

**答案：{正确/错误}**

**判定依据：**
{2-4句话的详细技术论证，包含原理、规则或反例}

**考点：** {用一句话概括本题涉及的核心知识点}

### 编程题格式

**解析：**
本题考察{核心算法/数据结构}。
1. **{步骤名}**：{具体思路说明}
2. **{步骤名}**：{具体思路说明}
3. **{步骤名}**：{具体思路说明}

**核心逻辑提示：**
\\\`\\\`\\\`cpp
{关键代码片段，3-6行}
\\\`\\\`\\\`

## 质量标准（必须遵守）

### 每个选项的解析必须"差异化"
- 每个错误选项必须有**独立的、针对性的**错误原因分析
- 绝对禁止所有选项复制粘贴同一句话
- 错误选项分析应指出：该选项对应的概念实际是什么/为什么不适用/学生可能的误解点

### 代码追踪题必须包含执行模拟
- 对于涉及代码输出的题目，正确选项的分析中必须包含逐步执行过程
- 使用编号列表展示每一步的变量状态变化

### 技术准确性
- 所有 C++ 知识必须严格准确
- 涉及标准库的说明必须符合 C++ 标准
- 运算符优先级、类型转换等必须精确

### 考点字段不能为空
- 每道题必须填写有意义的考点总结

## 反面示例（绝对禁止的写法）

❌ 所有选项重复同一句解释：
- A：错误。选择排序无论何种情况都需两层循环。
- B：错误。选择排序无论何种情况都需两层循环。

❌ 空考点：
**考点：**

❌ 一句话敷衍：
**解析：** 常识性判断。

❌ 泛化错误原因：
- B：错误。对排序算法的特性理解有误。

## 语言要求
- 全部使用中文
- 代码关键字和标识符保持英文
- 数学公式使用 $...$ 包裹`;

// ============================================================
// CLI 参数解析
// ============================================================
function parseArgs() {
    const args = {};
    for (const arg of process.argv.slice(2)) {
        if (arg.startsWith('--')) {
            const [key, ...rest] = arg.slice(2).split('=');
            args[key] = rest.join('=') || true;
        }
    }
    return args;
}

// ============================================================
// 判断解析质量是否已经达标
// ============================================================
function isAlreadyOptimized(explanation, type) {
    if (!explanation || typeof explanation !== 'string') return false;
    const text = explanation.trim();

    if (type === 'single') {
        // 黄金标准：有"选项逐项分析"且每个选项有 ✅ 或 ❌，且考点非空
        const hasItemizedAnalysis = text.includes('选项逐项分析');
        const hasCheckmarks = text.includes('✅') && text.includes('❌');
        const hasNonEmptyKaopoint = /\*\*考点[:：]\*\*\s*\S/.test(text);
        // 检测是否存在机械重复（所有选项的解释完全相同）
        const optionExplanations = text.match(/[❌✅]\s*(?:正确|错误)[。.]\s*(.+)/g);
        let hasMechanicalRepeat = false;
        if (optionExplanations && optionExplanations.length >= 3) {
            const unique = new Set(optionExplanations.map(s => s.replace(/^[❌✅]\s*(?:正确|错误)[。.]\s*/, '').trim()));
            hasMechanicalRepeat = unique.size === 1;
        }
        return hasItemizedAnalysis && hasCheckmarks && hasNonEmptyKaopoint && !hasMechanicalRepeat;
    }

    if (type === 'judge') {
        const hasVerdict = /\*\*答案[:：]\*\*\s*(正确|错误)/.test(text);
        const hasRationale = text.includes('判定依据');
        const hasNonEmptyKaopoint = /\*\*考点[:：]\*\*\s*\S/.test(text);
        return hasVerdict && hasRationale && hasNonEmptyKaopoint;
    }

    if (type === 'programming') {
        // 编程题相对宽松
        return text.includes('解析') && text.length > 100;
    }

    return false;
}

// ============================================================
// 调用 Gemini API
// ============================================================
async function callGeminiAPI(apiKey, question, model = 'gemini-2.0-flash') {
    const optionLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
    const answerLetter = optionLetters[question.answer] || question.answer;

    let userMessage;
    if (question.type === 'programming') {
        userMessage = `请优化以下 GESP 编程题的解析：

题目ID: ${question.id}
题型: 编程题
题目:
${question.question || question.title}

当前解析:
${question.explanation || '(无)'}

请输出优化后的 explanation 内容。`;
    } else {
        const optionsStr = question.options
            .map((opt, i) => `  ${optionLetters[i]}. ${opt}`)
            .join('\n');

        userMessage = `请优化以下 GESP 题目的解析：

题目ID: ${question.id}
题型: ${question.type === 'single' ? '单选题' : '判断题'}
题目: ${question.question}
选项:
${optionsStr}
正确答案: ${answerLetter} (索引 ${question.answer})
当前解析:
${question.explanation || '(无)'}

请输出优化后的 explanation 内容。`;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const body = {
        system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [{
            role: 'user',
            parts: [{ text: userMessage }]
        }],
        generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 2048,
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
        throw new Error(`Empty response from Gemini API: ${JSON.stringify(data)}`);
    }
    return text.trim();
}

// ============================================================
// 从 JS 文件中提取题目列表（使用正则，不 eval）
// ============================================================
function extractQuestionsFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');

    // 获取元数据
    const levelMatch = content.match(/level:\s*(\d+)/);
    const level = levelMatch ? parseInt(levelMatch[1]) : 0;

    const titleMatch = content.match(/title:\s*['"`](.+?)['"`]/);
    const title = titleMatch ? titleMatch[1] : path.basename(filePath);

    // 提取所有 explanation 字段的位置和内容
    const questions = [];
    // 匹配每个题目块 { id: N, type: '...', ... explanation: `...` }
    const idRegex = /id:\s*(\d+)/g;
    const typeRegex = /type:\s*['"`](\w+)['"`]/g;
    const questionRegex = /question:\s*`([\s\S]*?)`/g;
    const optionsRegex = /options:\s*\[([\s\S]*?)\]/g;
    const answerRegex = /answer:\s*(\d+)/g;
    const explanationRegex = /explanation:\s*`([\s\S]*?)`/g;

    // 使用简单策略：按 { id: 开头的块分割
    const questionBlocks = content.split(/(?=\{\s*\n?\s*id:\s*\d+)/);

    for (const block of questionBlocks) {
        const idM = block.match(/id:\s*(\d+)/);
        const typeM = block.match(/type:\s*['"`](\w+)['"`]/);
        const questionM = block.match(/question:\s*`([\s\S]*?)`/);
        const answerM = block.match(/answer:\s*(\d+)/);
        const explanationM = block.match(/explanation:\s*`([\s\S]*?)`\s*,\s*(?:tags|score|template|id|answer|samples)/);


        if (!idM || !typeM) continue;

        const id = parseInt(idM[1]);
        const type = typeM[1];

        // 提取选项
        const optionsM = block.match(/options:\s*\[([\s\S]*?)\]/);
        let options = [];
        if (optionsM) {
            // 匹配引号或反引号中的内容
            const optMatches = optionsM[1].matchAll(/['"`]([\s\S]*?)['"`]/g);
            for (const m of optMatches) {
                options.push(m[1]);
            }
        }

        const question = {
            id,
            type,
            question: questionM ? questionM[1] : '',
            options,
            answer: answerM ? parseInt(answerM[1]) : 0,
            explanation: explanationM ? explanationM[1] : '',
        };

        // 如果是编程题，尝试提取 title
        if (type === 'programming') {
            const titleM = block.match(/title:\s*['"`]([\s\S]*?)['"`]/);
            if (titleM) question.title = titleM[1];
        }

        questions.push(question);
    }

    return { level, title, questions, content };
}

// ============================================================
// 将优化后的 explanation 写回文件
// ============================================================
function writeExplanationBack(filePath, questionId, newExplanation) {
    let content = fs.readFileSync(filePath, 'utf-8');

    // 找到对应 id 的题目块，定位其 explanation
    // 策略：找到 id: {questionId} 后面最近的 explanation: `...`
    const idPattern = new RegExp(`id:\\s*${questionId}\\b`);
    const idMatch = idPattern.exec(content);
    if (!idMatch) {
        throw new Error(`Question id ${questionId} not found in file`);
    }

    // 从 id 位置开始，找到下一个 explanation: `...`
    const afterId = content.slice(idMatch.index);
    const explMatch = afterId.match(/explanation:\s*`([\s\S]*?)`/);
    if (!explMatch) {
        throw new Error(`explanation field not found for question ${questionId}`);
    }

    const explStart = idMatch.index + explMatch.index;
    const explEnd = explStart + explMatch[0].length;

    // 构造新的 explanation 字段
    const newField = `explanation: \`${newExplanation}\``;

    content = content.slice(0, explStart) + newField + content.slice(explEnd);
    fs.writeFileSync(filePath, content, 'utf-8');
}

// ============================================================
// 获取指定级别的所有文件
// ============================================================
function getFilesForLevel(level) {
    const dir = path.join(DATA_ROOT, `level${level}`);
    if (!fs.existsSync(dir)) {
        throw new Error(`Directory not found: ${dir}`);
    }
    return fs.readdirSync(dir)
        .filter(f => f.endsWith('.js') && f !== 'shared.js')
        .sort()
        .map(f => path.join(dir, f));
}

// ============================================================
// 主函数
// ============================================================
async function main() {
    const args = parseArgs();

    if (!args['api-key']) {
        console.error('❌ 缺少 --api-key 参数');
        console.error('用法: node scripts/optimize-explanations.mjs --api-key=YOUR_KEY --file=path/to/file.js');
        console.error('      node scripts/optimize-explanations.mjs --api-key=YOUR_KEY --level=4');
        process.exit(1);
    }

    const apiKey = args['api-key'];
    const model = args['model'] || 'gemini-2.0-flash';
    const dryRun = args['dry-run'] === true;
    const startId = args['start-id'] ? parseInt(args['start-id']) : 0;
    const forceAll = args['force'] === true; // 强制重新处理已优化的题目
    const delayMs = parseInt(args['delay'] || '2000'); // API 调用间隔（毫秒）

    // 收集要处理的文件
    let files = [];
    if (args['file']) {
        const filePath = path.resolve(args['file']);
        if (!fs.existsSync(filePath)) {
            console.error(`❌ 文件不存在: ${filePath}`);
            process.exit(1);
        }
        files.push(filePath);
    } else if (args['level']) {
        files = getFilesForLevel(parseInt(args['level']));
    } else {
        console.error('❌ 请指定 --file 或 --level 参数');
        process.exit(1);
    }

    console.log(`\n🔧 GESP 解析优化器`);
    console.log(`   模型: ${model}`);
    console.log(`   模式: ${dryRun ? '🔍 预览模式（不写入文件）' : '✏️ 写入模式'}`);
    console.log(`   文件数: ${files.length}`);
    console.log(`   API 间隔: ${delayMs}ms`);
    console.log('');

    let totalProcessed = 0;
    let totalSkipped = 0;
    let totalErrors = 0;
    let totalOptimized = 0;

    for (const filePath of files) {
        const fileName = path.relative(DATA_ROOT, filePath);
        console.log(`\n📄 处理文件: ${fileName}`);
        console.log('─'.repeat(60));

        let fileData;
        try {
            fileData = extractQuestionsFromFile(filePath);
        } catch (err) {
            console.error(`   ❌ 解析文件失败: ${err.message}`);
            totalErrors++;
            continue;
        }

        const { questions } = fileData;
        console.log(`   共 ${questions.length} 题 (Level ${fileData.level})\n`);

        for (const q of questions) {
            if (q.id < startId) {
                continue;
            }

            totalProcessed++;
            const prefix = `   [${q.id}] (${q.type})`;

            // 检查是否已优化
            if (!forceAll && isAlreadyOptimized(q.explanation, q.type)) {
                console.log(`${prefix} ⏭️  已达标，跳过`);
                totalSkipped++;
                continue;
            }

            console.log(`${prefix} 🔄 优化中...`);

            try {
                const optimized = await callGeminiAPI(apiKey, q, model);

                if (dryRun) {
                    console.log(`${prefix} 📋 预览 (前200字):`);
                    console.log(`       ${optimized.slice(0, 200).replace(/\n/g, '\n       ')}...`);
                } else {
                    writeExplanationBack(filePath, q.id, optimized);
                    console.log(`${prefix} ✅ 已写入`);
                }
                totalOptimized++;
            } catch (err) {
                console.error(`${prefix} ❌ 失败: ${err.message}`);
                totalErrors++;
            }

            // 避免 API 限流
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }

    console.log('\n' + '═'.repeat(60));
    console.log(`📊 汇总`);
    console.log(`   处理: ${totalProcessed} 题`);
    console.log(`   优化: ${totalOptimized} 题`);
    console.log(`   跳过: ${totalSkipped} 题 (已达标)`);
    console.log(`   失败: ${totalErrors} 题`);
    console.log('═'.repeat(60));
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
