import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '../src/data/gesp');

const API_KEY = process.env.OPENAI_API_KEY;
const API_BASE = process.env.OPENAI_API_BASE || 'https://api.openai.com/v1';
const MODEL = process.env.MODEL || 'gpt-4o';

if (!API_KEY) {
    console.error("Error: Please set OPENAI_API_KEY environment variable.");
    console.error("Usage: OPENAI_API_KEY='sk-...' OPENAI_API_BASE='...' node scripts/p7-llm-auto-solver.js");
    process.exit(1);
}

const TMP_DIR = '/tmp/gesp_auto_solver';
if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
}

// 提取未解决的题目
function findTodos() {
    const todos = [];
    const levels = fs.readdirSync(DATA_DIR).filter(d => d.startsWith('level'));
    
    for (const level of levels) {
        const dirPath = path.join(DATA_DIR, level);
        const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.js'));
        
        for (const file of files) {
            const filePath = path.join(dirPath, file);
            let code = fs.readFileSync(filePath, 'utf8');
            if (code.includes('isHistoricalPlaceholder: true')) continue;
            
            // 用正则或简单的分段来提取缺失的题
            const blocks = code.split(/(?=\s+id:\s*['"`]?\d+['"`]?\s*,)/);
            blocks.forEach((block, idx) => {
                if (idx === 0) return; // 头部
                if (block.includes(`referenceCode: '// 待补充'`)) {
                    // 解析 ID
                    const idMatch = block.match(/id:\s*['"`]?(\d+)['"`]?\s*,/);
                    // 解析 type (必须是编程)
                    if (idMatch && (block.includes(`type: 'programming'`) || block.includes(`type: 'coding'`))) {
                        // 提取 question 字符串
                        const qMatch = block.match(/question:\s*`([\s\S]*?)`/);
                        // 提取 samples 数组
                        let samples = [];
                        const sMatch = block.match(/samples:\s*(\[[\s\S]*?\])\s*,/);
                        if (sMatch) {
                            try {
                                // 简单提取 { input: '...', output: '...' }
                                // 因为可能有单引号双引号等，我们用 eval 较方便
                                samples = eval('(' + sMatch[1] + ')');
                            } catch(e) {}
                        }
                        
                        if (qMatch && samples.length > 0 && !samples[0].input.includes('待补充')) {
                            todos.push({
                                file: filePath,
                                id: idMatch[1],
                                question: qMatch[1].trim(),
                                samples: samples,
                                targetBlock: block // 用于之后安全替换
                            });
                        }
                    }
                }
            });
        }
    }
    return todos;
}

// 调用大模型
async function generateCppCode(questionText) {
    const prompt = `你是一个 C++ 算法竞赛专家。请阅读以下 GESP 考试题目，并用 C++11 标准编写一个最优的解法代码。\n\n注意事项：\n1. 只需返回 C++ 代码即可，不要包在 Markdown \`\`\`cpp 里面，或者只要第一层是被套住的就行。\n2. 使用 <iostream> 等标准库，并且必须包含 int main() 且 return 0;\n3. 输入和输出严格遵循题目给出的格式。\n\n题目详情：\n${questionText}`;
    
    const response = await fetch(`${API_BASE}/chat/completions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: MODEL,
            messages: [{ role: 'user', content: prompt }],
            temperature: 0.1
        })
    });
    
    const data = await response.json();
    if (!data.choices || data.choices.length === 0) {
        throw new Error(JSON.stringify(data));
    }
    
    let answer = data.choices[0].message.content;
    const match = answer.match(/```cpp\s*([\s\S]*?)\s*```/);
    if (match) {
        return match[1].trim();
    }
    return answer.trim();
}

// 编译和执行
function compileAndRun(cppCode, inputStr) {
    return new Promise((resolve) => {
        const cppFile = path.join(TMP_DIR, 'solution.cpp');
        const exeFile = path.join(TMP_DIR, 'solution');
        
        fs.writeFileSync(cppFile, cppCode, 'utf8');
        
        const compileProc = spawn('g++', ['-O2', '-std=c++11', cppFile, '-o', exeFile]);
        compileProc.on('close', (code) => {
            if (code !== 0) {
                return resolve({ success: false, reason: 'CE' });
            }
            
            let output = '';
            let errorOut = '';
            const runProc = spawn(exeFile);
            
            // 2s timeout
            const timer = setTimeout(() => {
                runProc.kill();
                resolve({ success: false, reason: 'TLE' });
            }, 2000);
            
            runProc.stdout.on('data', d => output += d);
            runProc.stderr.on('data', d => errorOut += d);
            
            runProc.stdin.write(inputStr);
            runProc.stdin.end();
            
            runProc.on('close', () => {
                clearTimeout(timer);
                resolve({ success: true, stdout: output.trim(), stderr: errorOut.trim() });
            });
        });
    });
}

function normalize(s) {
    return s.replace(/\r\n/g, '\n').split('\n').map(l => l.trim()).join('\n').trim();
}

async function main() {
    console.log("Analyzing missing reference codes...");
    const todos = findTodos();
    console.log(`Found ${todos.length} programming tasks ready to be solved!\n`);
    
    let solved = 0;
    
    for (let i = 0; i < todos.length; i++) {
        const task = todos[i];
        console.log(`[Task ${i+1}/${todos.length}] Processing ${path.basename(task.file)} Q${task.id}...`);
        
        try {
            console.log(`  -> Waiting for LLM (${MODEL})...`);
            let cppCode = await generateCppCode(task.question);
            
            // Verify
            let allPassed = true;
            for (let j = 0; j < task.samples.length; j++) {
                const sample = task.samples[j];
                console.log(`  -> Testing Sample ${j+1}...`);
                const result = await compileAndRun(cppCode, sample.input);
                
                if (!result.success) {
                    console.log(`  -> ❌ Failed! Reason: ${result.reason}`);
                    allPassed = false;
                    break;
                }
                
                if (normalize(result.stdout) === normalize(sample.output)) {
                    console.log(`  -> ✅ Sample ${j+1} Passed!`);
                } else {
                    console.log(`  -> ❌ WA on Sample ${j+1}!`);
                    console.log(`     Expected: ${normalize(sample.output).substring(0, 50)}`);
                    console.log(`     Got     : ${normalize(result.stdout).substring(0, 50)}`);
                    allPassed = false;
                    break;
                }
            }
            
            if (allPassed) {
                console.log(`  -> 🎉 AC! Injecting referenceCode...`);
                // Replace safely
                let fullCode = fs.readFileSync(task.file, 'utf8');
                const targetStr = `referenceCode: '// 待补充'`;
                let escCode = cppCode.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\\$/g, '\\$');
                
                // Construct the exact replacement ONLY for this specific ID block to avoid colliding
                const idRegex = new RegExp(`(id:\\s*['"\`]?${task.id}['"\`]?[\\s\\S]*?)referenceCode:\\s*'\\/\\/ 待补充'`);
                const match = fullCode.match(idRegex);
                
                if (match) {
                    const replacement = match[1] + 'referenceCode: `' + escCode + '`';
                    fullCode = fullCode.replace(match[0], replacement);
                    fs.writeFileSync(task.file, fullCode, 'utf8');
                    solved++;
                    console.log(`  -> Saved to ${path.basename(task.file)}\n`);
                } else {
                    console.log(`  -> ⚠️ Could not inject safely. RegEx mismatch.\n`);
                }
            } else {
                console.log(`  -> ⏭️ Skiped saving due to failures.\n`);
            }
            
        } catch (e) {
            console.error(`  -> 🔥 Fatal Error: ${e.message}\n`);
        }
    }
    
    console.log(`Finished processing. Solved: ${solved}/${todos.length}`);
}

main();
