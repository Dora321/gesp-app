import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import pLimit from 'p-limit';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..');
const DATA_DIR = path.join(ROOT_DIR, 'src/data/gesp');

const API_KEY = process.env.OPENAI_API_KEY;
const BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
const MODEL = process.env.LLM_MODEL || 'gpt-4o-mini';

if (!API_KEY) {
    console.warn('⚠️  OPENAI_API_KEY is not set in .env. Script will fail on API calls.');
}

const openai = new OpenAI({
    apiKey: API_KEY,
    baseURL: BASE_URL,
});

const limit = pLimit(3); // Default concurrency to 3

const SYSTEM_PROMPT = `你是一个专业的信奥赛（GESP/CSP-J/S）C++算法资深讲师。
你的任务是根据提供的题目题目信息生成极其专业、严谨且通俗易懂的题目解析。

【强制纪律约束】：
1. 你的返回格式必须直接是纯 Markdown 文本，绝不包含任何客套话、解释或前置说明（不要答复"好的"，直接输出解析块内容即可）。
2. **逐项分析要求**：对于每一个非正确选项，必须通过推演说明【具体错在什么地方，执行后会得到什么】。严禁出现"此说法不正确"等没用的套话，严禁跨选项复制粘贴文案。
3. 文本中的 C++ 代码、关键字、输出占位和标点符号必须严谨地包裹在反引号 \` 中。
4. **输出格式模板** (只返回下述内容，勿添加首尾多余的 \`\`\`markdown):
**答案：[原位保留标准答案结果如 A 或 正确]**

**解析：**
[先用一段连贯的话从核心概念层面解释这个题的知识侧重以及判断基准。如果是读代码题，请简短解说其执行流程。]

[接着如果考题具有选项（单选题），请一定附带如下的选项逐项精确分析：]
- **A [可缩写的选项主体]**：错。[具体的错误原因及纠正论证]。
- **B [可缩写的选项主体]**：对。[符合条件的论证]。
...其它选项

**考点：** [简短归纳1～2个相关技术考点，如"基本语法"、"循环语句"、"强制类型转换"]`;

async function getNewExplanation(question) {
    const userMessage = `题型：${question.type === 'single' ? '单选题' : '判断题'}
题干：${question.question}
备选选项：${JSON.stringify(question.options || [])}
正确的正确答案是：${getAnswerString(question)}

请严格按照以上的 System 制定的模板结构生成新解析：`;

    try {
        const response = await openai.chat.completions.create({
            model: MODEL,
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: userMessage }
            ],
            temperature: 0.3,
        });

        return response.choices[0].message.content.trim();
    } catch (error) {
        console.error(`❌ API Error for question ${question.id}:`, error.message);
        throw error;
    }
}

function getAnswerString(question) {
    if (question.type === 'judge') {
        return question.answer === 0 ? '正确' : '错误';
    }
    const letters = ['A', 'B', 'C', 'D', 'E', 'F'];
    return letters[question.answer] || '未知';
}

async function processFile(filePath, dryRun = false, mock = false) {
    console.log(`\n📄 Processing: ${path.relative(ROOT_DIR, filePath)}`);
    let content = await fs.readFile(filePath, 'utf8');
    
    // Safety check: is it a paper file?
    if (!content.includes('export const')) return;

    // Extract data using dynamic import
    let paperData;
    try {
        const fileUrl = `file://${filePath.replace(/\\/g, '/')}`;
        const module = await import(fileUrl);
        paperData = module.paperData;
    } catch (error) {
        console.error(`❌ Failed to import data from ${filePath}:`, error.message);
        return;
    }

    if (!paperData || !paperData.questions) return;

    let modifiedCount = 0;
    
    for (const q of paperData.questions) {
        if (q.type === 'single' || q.type === 'judge') {
            const isTodo = q.explanation && (q.explanation.includes('基础语法') || q.explanation.includes('待完善') || q.explanation.length < 50);
            if (!isTodo && !mock) continue; // Optional: skip already good ones unless mocking

            console.log(`  🔍 Question ${q.id} (${q.type})`);
            
            if (dryRun) {
                console.log(`  [Dry Run] Would call API for Q${q.id} and update explanation.`);
                continue;
            }

            try {
                let newExpl;
                if (mock) {
                    newExpl = `**答案：${getAnswerString(q)}**\n\n**解析：**\n这是自动生成的 Mock 解析内容，用于测试回写逻辑是否正确。对选项 A 进行分析，对选项 B 进行分析。\n\n**考点：** 测试考点`;
                } else {
                    newExpl = await limit(() => getNewExplanation(q));
                }
                
                // Escape special characters in old explanation for regex
                const oldExpl = q.explanation || '';
                const escapedOldExpl = oldExpl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                
                // Match explanation: `...` where content is escapedOldExpl
                // We handle potential variations in spacing
                const regex = new RegExp(`explanation:\\s*\\\`\\s*${escapedOldExpl}\\s*\\\``, 'g');
                
                // Check if it matches
                if (!regex.test(content)) {
                    console.warn(`  ⚠️  Regex mismatch for Q${q.id}. Old explanation not found in file.`);
                    continue;
                }
                
                // Escape characters for the JS string template injection
                const escapedNewExpl = newExpl.replace(/\\/g, '\\\\').replace(/`/g, '\\`');

                // Reset regex and replace
                content = content.replace(regex, () => `explanation: \`${escapedNewExpl}\``);
                modifiedCount++;
                console.log(`  ✅ Q${q.id} updated.`);
                
            } catch (error) {
                console.error(`  ❌ Failed Q${q.id}:`, error.message);
                // Continue to next question
            }
        }
    }

    if (modifiedCount > 0) {
        await fs.writeFile(filePath, content, 'utf8');
        console.log(`💾 Saved ${modifiedCount} updates to ${path.basename(filePath)}`);
    } else {
        console.log(`ℹ️ No changes made to ${path.basename(filePath)}`);
    }
}

async function main() {
    const args = process.argv.slice(2);
    const testMode = args.includes('--test');
    const dryRun = args.includes('--dry-run');
    const mock = args.includes('--mock');
    const specificFile = args.find(a => a.endsWith('.js'));

    if (!API_KEY && !dryRun && !mock) {
        console.error('❌ Error: OPENAI_API_KEY is required in .env file (unless using --dry-run or --mock).');
        process.exit(1);
    }

    let files = [];
    if (specificFile) {
        files = [path.resolve(ROOT_DIR, specificFile)];
    } else {
        // Walk through src/data/gesp/level*/*.js
        const levels = await fs.readdir(DATA_DIR);
        for (const level of levels) {
            const levelDir = path.join(DATA_DIR, level);
            if ((await fs.stat(levelDir)).isDirectory()) {
                const jsFiles = (await fs.readdir(levelDir)).filter(f => f.endsWith('.js'));
                files.push(...jsFiles.map(f => path.join(levelDir, f)));
            }
        }
    }

    console.log(`🚀 Found ${files.length} files to process.`);
    if (testMode) console.log('🧪 TEST MODE enabled. Will only process one question if possible.');

    for (const file of files) {
        await processFile(file, dryRun, mock);
        if (testMode) break;
    }

    console.log('\n✨ All done!');
}

main().catch(err => {
    console.error('🔥 Fatal Error:', err);
    process.exit(1);
});
