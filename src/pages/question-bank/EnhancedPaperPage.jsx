import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import {
    ChevronLeft,
    ChevronRight,
    RotateCcw,
    BookOpen,
    Lightbulb,
    Sparkles,
    BrainCircuit,
    CheckCircle2,
    ClipboardList,
    Tags,
    AlertTriangle
} from 'lucide-react';
import LoadingScreen from '../../components/LoadingScreen';
import { getPaper } from '../../data/gesp';
import { luoguCodingByLevel } from '../../data/gesp/luoguCodingByLevel';
import { paperCodingMap } from '../../data/gesp/paperCodingMap';

const stripLeadingNumber = (questionText) => {
    if (typeof questionText !== 'string') return questionText || '';
    return questionText.replace(/^\s*\d+[.。、]\s*/, '');
};

const getQuestionContent = (q) => {
    if (!q) return '';
    if (q.type === 'coding' || q.type === 'programming') {
        return q.question || q.title || q.summary || q.description || '';
    }
    return q.question || q.description || q.summary || q.title || '';
};

const inferKnowledgeTags = (q, level) => {
    const merged = `${getQuestionContent(q)} ${q?.explanation || ''} ${(q?.options || []).join(' ')}`;
    const tags = [];

    const ruleMap = [
        [/循环|for|while|do\s*while/i, '循环结构'],
        [/条件|判断|if|else|switch|case/i, '条件分支'],
        [/数组|vector|下标|索引/i, '数组与容器'],
        [/字符串|string|字符|ASCII/i, '字符串处理'],
        [/函数|递归|参数|返回值/i, '函数与递归'],
        [/排序|冒泡|选择|插入|快排|归并/i, '排序算法'],
        [/搜索|查找|二分|DFS|BFS/i, '搜索策略'],
        [/复杂度|O\(|时间复杂度|空间复杂度/i, '复杂度分析'],
        [/位运算|按位|\^|&|\|/i, '位运算'],
        [/模|余数|%|整除/i, '数论基础'],
        [/输入|输出|cin|cout|printf|scanf/i, '输入输出'],
        [/逻辑|真|假|布尔/i, '逻辑表达式'],
    ];

    for (const [regex, label] of ruleMap) {
        if (regex.test(merged)) tags.push(label);
        if (tags.length >= 4) break;
    }

    if (q?.type === 'tf' || q?.type === 'judge') tags.push('判断题技巧');
    if (q?.type === 'single' || q?.type === 'choice') tags.push('单选题策略');
    if (q?.type === 'coding' || q?.type === 'programming') tags.push('上机编程');
    tags.push(`L${level}能力点`);

    return Array.from(new Set(tags)).slice(0, 5);
};

const buildProgrammingMarkdown = (q, { includeReference = false } = {}) => {
    if (!q) return '';
    if (q.type === 'coding' && !q.description && q.explanation) {
        return q.explanation;
    }

    const sections = [];
    if (q.title) sections.push(`## ${q.title}`);
    if (q.problemNumber) sections.push(`**题号**：${q.problemNumber}`);
    if (q.description) sections.push(`### 题目描述\n${q.description}`);
    if (q.inputDescription) sections.push(`### 输入格式\n${q.inputDescription}`);
    if (q.outputDescription) sections.push(`### 输出格式\n${q.outputDescription}`);

    if (Array.isArray(q.samples) && q.samples.length > 0) {
        const sampleSections = q.samples.map((sample, index) => [
            `#### 样例 ${index + 1}`,
            '输入：',
            '```text',
            sample.input || '',
            '```',
            '输出：',
            '```text',
            sample.output || '',
            '```'
        ].join('\n'));
        sections.push(`### 样例\n${sampleSections.join('\n\n')}`);
    }

    if (q.explanation) sections.push(`### 题解提示\n${q.explanation}`);
    if (includeReference && q.template) sections.push(`### 代码模板\n\`\`\`cpp\n${q.template}\n\`\`\``);
    if (includeReference && q.referenceCode) sections.push(`### 参考代码\n\`\`\`cpp\n${q.referenceCode}\n\`\`\``);

    if (sections.length === 0) {
        return q.question || '';
    }

    return sections.join('\n\n');
};

const buildCodingGuide = (q) => {
    const text = `${q?.question || ''} ${q?.explanation || ''}`;
    const isGrid = /矩阵|网格|坐标|格|H\s*行|W\s*列/.test(text);
    const isNumberTheory = /取模|整除|质数|最大公约数|闰年|年份/.test(text);

    const idea = isGrid
        ? '把问题转成"遍历每个格子并判定是否满足条件"，统计满足条件的数量。'
        : isNumberTheory
            ? '先写判断函数，再按范围枚举并累加答案。'
            : '先抽象状态与转移，再通过循环/函数逐步求解。';

    const steps = isGrid
        ? ['读入 H、W、x', '双层循环遍历 (r,c)', '按公式判定是否满足', '满足则计数 +1', '输出计数']
        : ['读入输入参数', '确定核心判定/转移', '循环或递归求解', '处理边界与特判', '输出结果'];

    const complexity = isGrid ? '时间复杂度 O(H×W)，空间复杂度 O(1)。' : '优先保证正确性，再评估复杂度并优化。';

    const pitfalls = isGrid
        ? ['行列索引从 1 开始还是 0 开始要统一', '公式中开方比较建议注意浮点误差', '边界格子也要参与判定']
        : ['输入范围可能很大，注意类型溢出', '边界值（0/1/空）要单独验证', '输出格式要与题面完全一致'];

    return { idea, steps, complexity, pitfalls, isGrid };
};

/**
 * Build detailed analysis for objective questions.
 * Returns a Markdown string with structured sections:
 * - 核心解析 (main explanation)
 * - 选项分析 (option-by-option breakdown)
 * - 解题步骤 (step-by-step approach)
 * - 易错提醒 (common pitfalls)
 */
const buildDetailedAnalysis = (q, level) => {
    const explanation = q?.explanation?.trim();
    const options = q?.options || [];
    const answerIdx = q?.answer;
    const isJudge = q?.type === 'judge' || q?.type === 'tf';
    const core = `${q?.question || ''} ${options.join(' ')}`;

    // --- 核心解析 ---
    let mainAnalysis = '';
    if (explanation) {
        mainAnalysis = explanation;
    } else {
        // Fallback: generate a more detailed explanation based on keywords
        if (/循环|for|while|do\s*while/i.test(core)) {
            mainAnalysis = '本题核心在于**循环变量变化**与**终止条件**的准确把握。\n\n关键步骤：\n1. 确认循环变量的**初始值**\n2. 每轮循环中变量的**更新方式**（`i++` / `i+=2` 等）\n3. 循环终止的**边界条件**（`<` vs `<=`）\n4. 手动模拟前几轮，验证循环次数\n\n> 💡 常见陷阱：循环"少一次"或"多一次"，通常是因为边界条件用 `<` 还是 `<=` 导致。';
        } else if (/if|else|条件|判断|switch|case/i.test(core)) {
            mainAnalysis = '本题重点是**条件分支的触发顺序与逻辑判断**。\n\n关键步骤：\n1. 逐个分析每个 `if` / `else if` 分支的**条件表达式**\n2. 用最小样例**代入验证**各分支的真值\n3. 注意 `if-else` 链中，**只有第一个为真的分支会被执行**\n4. 检查是否有**遗漏条件**或**逻辑运算符优先级**问题\n\n> 💡 `&&` 和 `||` 的短路特性：`A && B` 中若 A 为假则不计算 B；`A || B` 中若 A 为真则不计算 B。';
        } else if (/数组|下标|索引|vector|arr/i.test(core)) {
            mainAnalysis = '本题关注**索引边界与访问顺序**。\n\n关键步骤：\n1. 确认数组的**合法下标范围**（`0` 到 `n-1`）\n2. 区分**越界访问**与**合法访问**\n3. 注意 `vector` 的 `.size()` 返回的是元素个数，最大下标为 `.size()-1`\n4. 二维数组注意行列顺序：`arr[行][列]`\n\n> 💡 数组越界是 C++ 中最常见的未定义行为之一，不会报错但结果不可预测。';
        } else if (/指针|pointer|&|\*/i.test(core)) {
            mainAnalysis = '本题涉及**指针与地址**的概念。\n\n关键步骤：\n1. 区分**指针变量**（存储地址）和**普通变量**（存储值）\n2. `*p` 是**解引用**，获取指针指向的值\n3. `&a` 是**取地址**，获取变量 a 的内存地址\n4. 注意指针类型必须与所指向的变量类型匹配\n\n> 💡 指针未初始化时是"野指针"，解引用会导致未定义行为。';
        } else if (/函数|递归|参数|返回值|return/i.test(core)) {
            mainAnalysis = '本题考察**函数定义与调用**相关概念。\n\n关键步骤：\n1. 区分**形参**（函数定义中的变量）和**实参**（调用时传入的值）\n2. 理解**值传递**（副本）vs **引用传递**（原始变量）\n3. 递归函数需要明确的**终止条件**（基准情形）\n4. 注意函数的**声明顺序**：调用前必须先声明或定义\n\n> 💡 值传递不会修改原变量，引用传递（`&`）和指针传递可以修改原变量。';
        } else if (/排序|冒泡|选择|插入|快排|归并/i.test(core)) {
            mainAnalysis = '本题涉及**排序算法**的原理与特性。\n\n关键步骤：\n1. 理解各排序算法的**基本思想**（比较交换 vs 分治）\n2. 掌握**时间复杂度**：冒泡/选择/插入 O(n²)，快排/归并 O(n log n)\n3. 注意**稳定性**：冒泡、插入稳定；选择、快排不稳定\n4. 根据题意判断考查的是**过程模拟**还是**复杂度分析**\n\n> 💡 稳定排序：相等元素的相对顺序在排序后不变。';
        } else {
            mainAnalysis = `该题属于 **GESP L${level}** 高频考点。\n\n解题策略：\n1. **定位题干关键词**：找出题目考查的核心概念\n2. **样例代入法**：用题目给定的最小样例手动推演\n3. **边界验证**：检查极端情况（0、1、空、最大值）\n4. **排除法**：对不确定的选项逐一排除\n\n> 💡 GESP 考试中，客观题通常不需要完整推导，善用排除法可以大幅提高效率。`;
        }
    }

    // --- 选项分析 ---
    let optionAnalysis = '';
    if (!isJudge && options.length > 0 && answerIdx !== undefined) {
        const optionLines = options.map((opt, idx) => {
            const letter = String.fromCharCode(65 + idx);
            if (idx === answerIdx) {
                return `- **${letter}. ${opt}** ✅ 正确答案`;
            }
            return `- ${letter}. ${opt} ❌`;
        });
        optionAnalysis = optionLines.join('\n');
    } else if (isJudge && answerIdx !== undefined) {
        optionAnalysis = answerIdx === 0
            ? '- **正确** ✅\n- 错误 ❌'
            : '- 正确 ❌\n- **错误** ✅';
    }

    // --- 解题步骤 ---
    let steps = '';
    if (/循环|for|while/i.test(core)) {
        steps = '1. 写出循环变量的**初始值、终止条件、更新方式**\n2. 手动模拟 2-3 轮循环，记录变量变化\n3. 确认循环结束时的变量状态\n4. 对比选项，选出匹配结果';
    } else if (/if|else|条件|判断/i.test(core)) {
        steps = '1. 列出所有条件分支及其表达式\n2. 代入样例数据，逐分支计算真值\n3. 确认哪个分支会被执行\n4. 检查是否有逻辑运算符优先级陷阱';
    } else if (/数组|下标|索引/i.test(core)) {
        steps = '1. 确认数组的维度和大小\n2. 画出数组示意图，标注下标\n3. 按题意逐步模拟访问/修改操作\n4. 检查边界条件是否正确';
    } else {
        steps = '1. 仔细阅读题干，提取关键信息\n2. 回忆相关概念的定义和规则\n3. 对每个选项逐一验证\n4. 排除明显错误的选项，缩小范围';
    }

    // --- 易错提醒 ---
    let pitfalls = [];
    if (/循环|for|while/i.test(core)) pitfalls = ['`<` 与 `<=` 差一', '`i++` 与 `++i` 在表达式中的区别', '嵌套循环的内外层变量不要混淆', '`break` 跳出最近一层循环，`continue` 跳过本轮'];
    else if (/if|else|条件|判断/i.test(core)) pitfalls = ['`=` 赋值 vs `==` 比较', '`&&` 优先级高于 `||`', '`else` 只匹配最近的未配对 `if`', '整数除法截断小数部分'];
    else if (/数组|下标|索引/i.test(core)) pitfalls = ['下标从 0 开始', '越界访问是未定义行为', '二维数组传参时第二维大小不能省', '`sizeof` 对指针不返回数组大小'];
    else if (/指针|&|\*/i.test(core)) pitfalls = ['野指针必须初始化', '`*` 在声明中表示指针，在表达式中表示解引用', '`&` 在声明中表示引用，在表达式中表示取地址'];
    else pitfalls = ['审题不清，漏看"不正确的是"', '概念混淆，如形参/实参、声明/定义', '忽略数据类型的取值范围', 'C++ 中整数除法截断而非四舍五入'];

    // --- Assemble Markdown ---
    const sections = [];
    sections.push(`### 📖 核心解析\n\n${mainAnalysis}`);
    if (optionAnalysis) sections.push(`### 🔍 选项分析\n\n${optionAnalysis}`);
    sections.push(`### 📝 解题步骤\n\n${steps}`);
    if (pitfalls.length > 0) {
        sections.push(`### ⚠️ 易错提醒\n\n${pitfalls.map(p => `- ${p}`).join('\n')}`);
    }

    return sections.join('\n\n');
};

/**
 * Legacy compatibility: returns plain text for simple display contexts.
 */
const buildQuestionInsight = (q, level) => {
    const explanation = q?.explanation?.trim();
    if (explanation) return explanation;

    const core = `${q?.question || ''}${(q?.options || []).join(' ')}`;
    if (/循环|for|while/i.test(core)) return '本题核心在于先明确循环变量变化，再判断终止条件和每轮状态更新，避免"少一次/多一次"边界错误。';
    if (/if|else|条件|判断/i.test(core)) return '本题重点是条件分支触发顺序。建议先代入最小样例，逐分支验证表达式真值。';
    if (/数组|下标|索引|vector/i.test(core)) return '本题关注索引边界与访问顺序，先确认合法下标范围，再处理更新逻辑。';
    return `该题属于 GESP L${level} 高频考点，建议先定位题干关键词，再用"样例代入 + 边界验证"两步法完成推导。`;
};

/**
 * 生成结构化深度解析 —— 从题目内容、选项、已有explanation自动推导
 * 返回 { summary, optionAnalysis, steps, keyPoint, pitfall, extension }
 */
const buildRichAnalysis = (q, level) => {
    if (!q) return null;
    const isProgramming = q.type === 'coding' || q.type === 'programming';
    if (isProgramming) return null; // 编程题走已有的 codingGuide 逻辑

    const questionText = getQuestionContent(q) || '';
    const options = q.options || [];
    const answerIdx = q.answer;
    const explanation = q.explanation?.trim() || '';
    const merged = `${questionText} ${options.join(' ')} ${explanation}`;

    // --- 0. 从 explanation 中提取纯文本摘要（去除 Markdown 标记） ---
    const stripMarkdown = (md) => {
        if (!md) return '';
        return md
            .replace(/\*\*([^*]+)\*\*/g, '$1')   // **bold** → text
            .replace(/\*([^*]+)\*/g, '$1')         // *italic* → text
            .replace(/`([^`]+)`/g, '$1')           // `code` → text
            .replace(/^#{1,6}\s+/gm, '')            // # heading → text
            .replace(/^>\s+/gm, '')                  // > blockquote → text
            .replace(/^[-*+]\s+/gm, '')              // - list item → text
            .replace(/^\d+\.\s+/gm, '');             // 1. list item → text
    };

    // --- 1. 选项逐项分析 ---
    const optionAnalysis = options.map((opt, idx) => {
        const isCorrect = idx === answerIdx;
        const optText = typeof opt === 'string' ? opt : String(opt);
        let reason = '';

        if (isCorrect) {
            // 正确选项：从 explanation 中提取该选项的解析行，而非整个 explanation
            const letter = String.fromCharCode(65 + idx);
            const optLineRegex = new RegExp(`-\\s*\\*\\*${letter}\\s+[^*]*\\*\\*[^：]*：\\s*(.+)`, 'i');
            const optLineMatch = explanation.match(optLineRegex);
            if (optLineMatch) {
                reason = stripMarkdown(optLineMatch[1]);
            } else {
                reason = '该选项与题意完全吻合。';
            }
        } else {
            // 尝试推断错误选项的典型错误类型
            if (/变量|标识符|命名|关键字/i.test(optText) && /关键字|保留字/i.test(merged)) {
                reason = /下划线|_|开头/i.test(optText)
                    ? '下划线开头的标识符在 C++ 中是合法的，此说法有误。'
                    : /关键字|保留字/i.test(optText)
                        ? '混淆了关键字与标识符的规则。'
                        : '对标识符命名规则理解有偏差。';
            } else if (/循环|for|while|迭代/i.test(merged)) {
                reason = /边界|少一次|多一次|off.?by/i.test(optText)
                    ? '循环边界判断有误，常见 off-by-one 错误。'
                    : /初始|开始|从.*起/i.test(optText)
                        ? '循环变量初始值设定不当。'
                        : '对循环执行次数或条件判断理解有偏差。';
            } else if (/运算|表达式|优先级|算术/i.test(merged)) {
                reason = /优先级|顺序/i.test(optText)
                    ? '运算符优先级记忆有误，建议牢记：* / % > + -。'
                    : /溢出|越界|范围/i.test(optText)
                        ? '忽略了数据类型的表示范围限制。'
                        : '运算过程推导有误，建议逐步代入验证。';
            } else if (/条件|判断|if|else|逻辑|布尔/i.test(merged)) {
                reason = /短路|逻辑与|逻辑或/i.test(optText)
                    ? '逻辑运算的短路求值规则理解有误。'
                    : /真假|true|false|0|1/i.test(optText)
                        ? 'C++ 中非零即真，零即假，注意隐式转换。'
                        : '条件表达式的求值顺序或逻辑关系判断有误。';
            } else if (/数组|下标|索引|vector|越界/i.test(merged)) {
                reason = /越界|范围|0.*n-1/i.test(optText)
                    ? '数组下标从 0 开始，最大下标为 n-1。'
                    : '对数组访问或遍历逻辑理解有偏差。';
            } else if (/字符串|字符|ASCII|char/i.test(merged)) {
                reason = /ASCII|编码|差值/i.test(optText)
                    ? '字符运算本质是 ASCII 值运算，注意大小写差值。'
                    : '对字符串/字符的处理方式理解有误。';
            } else if (/位运算|按位|&|\||\^|<<|>>/i.test(merged)) {
                reason = '位运算规则记忆有误，建议列出二进制逐位运算验证。';
            } else if (/函数|递归|参数|返回值/i.test(merged)) {
                reason = '对函数调用、参数传递或返回值逻辑理解有偏差。';
            } else if (/输入|输出|printf|scanf|cin|cout|格式/i.test(merged)) {
                reason = /格式|%d|%f|%g|%s/i.test(optText)
                    ? '格式控制符的用法或默认行为理解有误。'
                    : '输入输出的处理逻辑判断有偏差。';
            } else if (/排序|冒泡|选择|插入/i.test(merged)) {
                reason = '排序算法的执行过程或比较次数计算有误。';
            } else if (/复杂度|O\(/i.test(merged)) {
                reason = '时间/空间复杂度分析有误，建议数循环层数并估算。';
            } else {
                reason = '该选项与题意不符，属于常见干扰项。';
            }
        }

        return { idx, label: String.fromCharCode(65 + idx), text: optText, isCorrect, reason };
    });

    // --- 2. 解题步骤 ---
    const steps = [];
    const hasCode = /```|cin|cout|printf|scanf|for|while|if|int |return/i.test(questionText);

    if (hasCode) {
        steps.push({ icon: '📋', text: '审题：明确代码的输入、输出和核心逻辑' });
        steps.push({ icon: '🔍', text: '追踪：逐行执行代码，记录关键变量的值变化' });
        if (/for|while/i.test(questionText)) {
            steps.push({ icon: '🔄', text: '模拟循环：列出每轮迭代中变量的取值' });
        }
        steps.push({ icon: '✅', text: '验证：将推导结果与选项逐一比对' });
    } else {
        steps.push({ icon: '📋', text: '审题：提取题干关键词，明确考查方向' });
        steps.push({ icon: '💡', text: '回忆：调取相关知识点（概念、规则、语法）' });
        steps.push({ icon: '🔍', text: '排除：逐项验证各选项，排除明显错误' });
        steps.push({ icon: '✅', text: '确认：对剩余选项做代入验证，锁定答案' });
    }

    // --- 3. 核心知识点 ---
    // 从 explanation 中提取核心解析部分（去除答案行和选项分析列表）
    let keyPoint = '';
    if (explanation) {
        // 提取 **解析：** 之后到第一个 - ** 选项分析之前的内容
        const analysisMatch = explanation.match(/\*\*解析[：:]\*\*\s*\n([\s\S]*?)(?=\n\s*-\s*\*\*[A-D]|$)/);
        if (analysisMatch && analysisMatch[1].trim()) {
            keyPoint = analysisMatch[1].trim();
        } else {
            // 回退：去除答案行和选项列表，保留其余内容
            keyPoint = explanation
                .replace(/\*\*答案[：:][^*]*\*\*\s*/g, '')
                .replace(/\*\*考点[：:][^*]*\*\*\s*/g, '')
                .replace(/\n\s*-\s*\*\*[A-D][^*]*\*\*[^\n]*/g, '')
                .replace(/\*\*解析[：:]\*\*\s*/g, '')
                .trim();
        }
    }
    if (!keyPoint) {
        if (/优先级|运算顺序/i.test(merged)) keyPoint = 'C++ 运算符优先级：算术 > 关系 > 逻辑，同级从左到右（赋值从右到左）。';
        else if (/循环|for|while/i.test(merged)) keyPoint = '循环三要素：初始值、终止条件、每次迭代的变化量。缺一不可。';
        else if (/if|else|条件|判断/i.test(merged)) keyPoint = '条件表达式求值：非零为真，零为假。注意赋值 = 与比较 == 的区别。';
        else if (/数组|下标/i.test(merged)) keyPoint = '数组下标从 0 开始，最大下标为长度 - 1。越界访问是未定义行为。';
        else if (/字符串|字符|ASCII/i.test(merged)) keyPoint = '字符本质是整数（ASCII 值），大写 A=65，小写 a=97，差值 32。';
        else if (/位运算/i.test(merged)) keyPoint = '位运算在二进制层面操作：& 按位与、| 按位或、^ 按位异或、~ 取反、<< 左移、>> 右移。';
        else if (/变量|标识符|关键字/i.test(merged)) keyPoint = '标识符规则：字母/下划线开头，由字母/数字/下划线组成，不能是关键字。';
        else if (/整除|取模|余数/i.test(merged)) keyPoint = '整数除法向零取整，取模结果符号与被除数相同。注意负数取模的行为。';
        else if (/函数|递归/i.test(merged)) keyPoint = '函数调用时实参到形参是值传递，递归需要明确的终止条件和状态转移。';
        else if (/输入|输出|printf|格式/i.test(merged)) keyPoint = 'printf 格式符：%d 整数、%f 浮点、%g 自动、%s 字符串、%c 字符。';
        else keyPoint = `该题考查 GESP L${level} 核心知识点，建议结合课程内容系统复习。`;
    }

    // --- 4. 易错点 ---
    const pitfalls = [];
    if (/for|while|循环/i.test(merged)) {
        pitfalls.push('循环边界：i < n 还是 i <= n？差一次结果完全不同');
        pitfalls.push('循环变量修改：i++ 写成 i-- 或忘记更新会导致死循环');
    }
    if (/i\s*%\s*\d|取模|余数/i.test(merged)) {
        pitfalls.push('负数取模：C++ 中 -7 % 3 = -1，不是 2');
    }
    if (/int\s+\w+\s*=\s*[\d.]+f?|浮点|double|float/i.test(merged)) {
        pitfalls.push('整数除法陷阱：5/2 = 2 而非 2.5，至少一个操作数需为浮点');
    }
    if (/=\s*=|赋值|比较/i.test(merged)) {
        pitfalls.push('= 赋值 vs == 比较：if(a=5) 永远为真，且 a 被修改');
    }
    if (/数组|arr|下标/i.test(merged)) {
        pitfalls.push('数组下标从 0 开始，arr[n] 已越界');
    }
    if (/char|ASCII|字符/i.test(merged)) {
        pitfalls.push('字符与整数混用：\'0\' ≠ 0，\'0\' 的 ASCII 值是 48');
    }
    if (/位运算|&|\||\^|<<|>>/i.test(merged)) {
        pitfalls.push('&& 与 &、|| 与 | 的区别：逻辑运算 vs 位运算');
    }
    if (/continue|break/i.test(merged)) {
        pitfalls.push('continue 跳过本轮剩余语句进入下一轮，break 直接退出整个循环');
    }
    if (/递归/i.test(merged)) {
        pitfalls.push('递归必须有终止条件，否则栈溢出；注意返回值的传递');
    }
    if (pitfalls.length === 0) {
        pitfalls.push('审题不仔细：注意"不正确的是""错误的是"等反向提问');
        pitfalls.push('代入验证：用最小样例手动推演，比凭直觉更可靠');
    }

    // --- 5. 知识延伸 ---
    let extension = '';
    if (/优先级|运算顺序/i.test(merged)) {
        extension = '延伸：C++ 运算符优先级口诀 —— "单目算关逻，条赋逗最低"。单目 > 算术 > 关系 > 逻辑 > 条件 > 赋值 > 逗号。';
    } else if (/for|while|do\s*while/i.test(merged)) {
        extension = '延伸：for 与 while 本质等价，for 更适合计数循环，while 更适合条件循环。do-while 至少执行一次。';
    } else if (/if|else|switch/i.test(merged)) {
        extension = '延伸：多重 if-else 注意匹配规则（就近匹配），switch 需要 break 防止穿透。';
    } else if (/数组|二维/i.test(merged)) {
        extension = '延伸：二维数组按行存储，arr[i][j] 的地址 = 基地址 + i*列数 + j。';
    } else if (/字符串|string|strlen|strcmp/i.test(merged)) {
        extension = '延伸：C 风格字符串以 \'\\0\' 结尾，strlen 不计入；C++ string 类更安全方便。';
    } else if (/位运算/i.test(merged)) {
        extension = '延伸：位运算技巧 —— n & (n-1) 消去最低位 1，判断 2 的幂；n ^ n = 0，n ^ 0 = n。';
    } else if (/变量|类型|int|long|double/i.test(merged)) {
        extension = '延伸：int 范围约 ±21 亿，long long 约 ±9.2×10¹⁸。大数运算注意溢出。';
    } else if (/递归/i.test(merged)) {
        extension = '延伸：递归三要素 —— 终止条件、递推关系、返回值传递。尾递归可优化为循环。';
    } else {
        extension = `延伸：该知识点在 GESP L${level} 中反复出现，建议整理错题本，归纳同类题型的解题套路。`;
    }

    return { summary: explanation, optionAnalysis, steps, keyPoint, pitfalls, extension };
};

const sectionMetaByLevel = {
    1: { tone: '语法启蒙', focus: '语句规则与基础逻辑', color: 'from-emerald-500 to-teal-500' },
    2: { tone: '流程强化', focus: '循环与分支协同', color: 'from-blue-500 to-indigo-500' },
    3: { tone: '算法入门', focus: '枚举、模拟与结构化表达', color: 'from-indigo-500 to-violet-500' },
    4: { tone: '结构进阶', focus: '数据组织与流程控制', color: 'from-violet-500 to-purple-500' },
    5: { tone: '综合建模', focus: '多步骤推理与状态管理', color: 'from-purple-500 to-fuchsia-500' },
    6: { tone: '算法深化', focus: '复杂度与策略优化', color: 'from-orange-500 to-rose-500' },
    7: { tone: '竞赛视角', focus: '抽象化与高效实现', color: 'from-rose-500 to-pink-500' },
    8: { tone: '高阶压轴', focus: '综合算法与工程稳健性', color: 'from-slate-700 to-slate-900' },
};

// Local MarkdownRenderer removed in favor of shared component

export default function EnhancedPaperPage({ forcedPaperId }) {
    const { paperId: routePaperId } = useParams();
    const navigate = useNavigate();

    const paperId = forcedPaperId || routePaperId;
    const [paperData, setPaperData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        getPaper(paperId).then(data => {
            if (!cancelled) {
                setPaperData(data);
                setLoading(false);
            }
        }).catch(() => {
            if (!cancelled) setLoading(false);
        });
        return () => { cancelled = true; };
    }, [paperId]);

    // All hooks MUST be called before any conditional returns (React Rules of Hooks)
    const baseQuestions = useMemo(() => {
        if (!paperData) return [];
        return [
            ...(paperData.questions || []),
            ...(paperData.programmingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' })),
            ...(paperData.codingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' }))
        ];
    }, [paperData]);

    const questions = useMemo(() => {
        if (!paperData) return [];
        const has26 = baseQuestions.some((q) => Number(q.id) === 26 || String(q.id) === '26');
        const has27 = baseQuestions.some((q) => Number(q.id) === 27 || String(q.id) === '27');
        if (has26 && has27) return baseQuestions.sort((a, b) => Number(a.id) - Number(b.id));

        const pool = luoguCodingByLevel[String(paperData.level)] || luoguCodingByLevel[paperData.level] || [];
        const byPid = new Map(pool.map((p) => [p.pid, p]));
        const mapped = paperCodingMap[paperId] || {};
        const p1 = byPid.get(mapped.q26) || null;
        const p2 = byPid.get(mapped.q27) || null;

        const toMarkdown = (p) => {
            if (!p) return '题面暂缺，请稍后补齐。';
            const sections = [];
            sections.push(`## ${p.pid} ${p.title}`);
            if (p.background) sections.push(`### 题目背景\n${p.background}`);
            if (p.description) sections.push(`### 题目描述\n${p.description}`);
            if (p.inputFormat) sections.push(`### 输入格式\n${p.inputFormat}`);
            if (p.outputFormat) sections.push(`### 输出格式\n${p.outputFormat}`);
            sections.push(`### 原题链接\n${p.url}`);
            return sections.join('\n\n');
        };

        const codingQ1 = {
            id: 26,
            type: 'coding',
            score: 25,
            question: p1 ? `第26题（上机编程）：${p1.pid} ${p1.title}` : '第26题（上机编程）',
            options: [],
            explanation: toMarkdown(p1),
            tags: ['上机编程', '洛谷原题', p1?.pid || '题面待补']
        };

        const codingQ2 = {
            id: 27,
            type: 'coding',
            score: 25,
            question: p2 ? `第27题（上机编程）：${p2.pid} ${p2.title}` : '第27题（上机编程）',
            options: [],
            explanation: toMarkdown(p2),
            tags: ['上机编程', '洛谷原题', p2?.pid || '题面待补']
        };

        const merged = [...baseQuestions];
        if (!has26) merged.push(codingQ1);
        if (!has27) merged.push(codingQ2);
        return merged.sort((a, b) => Number(a.id) - Number(b.id));
    }, [paperData, baseQuestions, paperId]);

    const [activeTab, setActiveTab] = useState('practice');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [revealed, setRevealed] = useState({});

    const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
    const revealedCount = useMemo(() => Object.keys(revealed).length, [revealed]);

    // --- Conditional returns AFTER all hooks ---
    if (loading) {
        return <LoadingScreen message="正在拼命加载试卷" variant="dark" />;
    }

    if (!paperData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <div className="text-center max-w-lg p-6">
                    <AlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
                    <h2 className="text-xl font-bold text-slate-700">无法加载试卷</h2>
                    <p className="mb-4">试卷数据未找到，请返回题库后重试。</p>
                    <button onClick={() => navigate('/question-bank')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
                        返回题库
                    </button>
                </div>
            </div>
        );
    }

    if (!questions.length) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md text-center space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">试卷数据不可用</h2>
                    <p className="text-slate-500 text-sm">未找到对应试卷，请返回题库后重试。</p>
                    <button
                        onClick={() => navigate('/question-bank')}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                    >
                        返回题库
                    </button>
                </div>
            </div>
        );
    }

    const currentQ = questions[currentQuestionIndex];
    const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;

    const levelMeta = sectionMetaByLevel[paperData?.level] || {
        tone: '综合训练',
        focus: '核心知识点巩固',
        color: 'from-indigo-500 to-blue-600'
    };

    let wrongCount = 0;
    questions.forEach((q) => {
        if (revealed[q.id] && answers[q.id] !== q.answer) wrongCount += 1;
    });

    const resetAll = () => {
        setAnswers({});
        setRevealed({});
        setCurrentQuestionIndex(0);
        setActiveTab('practice');
    };

    const handleOptionSelect = (qId, optionIdx) => {
        if (revealed[qId]) return;
        setAnswers((prev) => ({ ...prev, [qId]: optionIdx }));
    };

    const revealCurrent = () => {
        if (!currentQ) return;
        const isProgramming = currentQ.type === 'coding' || currentQ.type === 'programming';
        if (!isProgramming && answers[currentQ.id] === undefined) return;
        if (isProgramming && answers[currentQ.id] === undefined) {
            setAnswers((prev) => ({ ...prev, [currentQ.id]: 0 }));
        }
        setRevealed((prev) => ({ ...prev, [currentQ.id]: true }));
        setActiveTab('analysis');
    };

    const selected = answers[currentQ.id];
    const isRevealed = !!revealed[currentQ.id];
    const tags = inferKnowledgeTags(currentQ, paperData.level);
    const codingGuide = (currentQ?.type === 'coding' || currentQ?.type === 'programming') ? buildCodingGuide(currentQ) : null;
    const richAnalysis = buildRichAnalysis(currentQ, paperData.level);
    const isReformed = (currentQ.type === 'coding' || currentQ.type === 'programming') && getQuestionContent(currentQ).trim().startsWith('# ');
    const programmingPracticeMarkdown = (currentQ.type === 'coding' || currentQ.type === 'programming') ? buildProgrammingMarkdown(currentQ) : '';
    const programmingAnalysisMarkdown = (currentQ?.type === 'coding' || currentQ?.type === 'programming')
        ? buildProgrammingMarkdown(currentQ, { includeReference: true })
        : '';

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
                <div className={`h-1 w-full bg-gradient-to-r ${levelMeta.color}`} />
                <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-slate-100" aria-label="返回">
                        <ChevronLeft size={18} />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="font-bold text-slate-800 truncate">{paperData.title}</h1>
                        <div className="text-xs text-slate-500 flex flex-wrap items-center gap-2">
                            <span>解析模式 · Level {paperData.level}</span>
                            <span>·</span>
                            <span>{levelMeta.tone}</span>
                            <span>·</span>
                            <span>{levelMeta.focus}</span>
                        </div>
                    </div>
                    <button
                        onClick={resetAll}
                        className="px-3 py-2 rounded-lg text-sm border border-slate-200 hover:bg-slate-50 flex items-center gap-1"
                    >
                        <RotateCcw size={14} /> 重置进度
                    </button>
                </div>

                <div className="max-w-6xl mx-auto px-4 pb-4 grid md:grid-cols-4 gap-2 text-xs">
                    <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                        <div className="text-slate-500">答题进度</div>
                        <div className="font-semibold text-slate-700">{answeredCount}/{questions.length}</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                        <div className="text-slate-500">已看解析</div>
                        <div className="font-semibold text-slate-700">{revealedCount}/{questions.length}</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                        <div className="text-slate-500">已订正错题</div>
                        <div className="font-semibold text-slate-700">{Math.max(0, revealedCount - wrongCount)}</div>
                    </div>
                    <div className="rounded-lg bg-slate-50 border border-slate-200 px-3 py-2">
                        <div className="text-slate-500">当前题号</div>
                        <div className="font-semibold text-slate-700">第 {currentQuestionIndex + 1} 题</div>
                    </div>
                    <div className="md:col-span-4">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto grid md:grid-cols-[240px_1fr] gap-4 p-4">
                <aside className="bg-white rounded-xl border border-slate-200 p-3 h-fit">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                        <ClipboardList size={15} /> 题号导航
                    </div>
                    <div className="grid grid-cols-5 md:grid-cols-4 gap-2">
                        {questions.map((q, idx) => {
                            const isCurrent = idx === currentQuestionIndex;
                            const hasAnswer = answers[q.id] !== undefined;
                            const classes = isCurrent
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : hasAnswer
                                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                    : 'bg-white text-slate-600 border-slate-200';
                            return (
                                <button
                                    key={q.id}
                                    onClick={() => {
                                        setCurrentQuestionIndex(idx);
                                        setActiveTab('practice');
                                    }}
                                    className={`aspect-square rounded-lg border text-sm font-semibold ${classes}`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                <section className="space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm text-slate-500">第 {currentQuestionIndex + 1} 题 / 共 {questions.length} 题</div>
                            <div className="inline-flex bg-slate-100 rounded-lg p-1">
                                <button
                                    onClick={() => setActiveTab('practice')}
                                    className={`px-3 py-1.5 rounded-md text-sm ${activeTab === 'practice' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
                                >
                                    <span className="inline-flex items-center gap-1"><BookOpen size={14} /> 作答</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('analysis')}
                                    className={`px-3 py-1.5 rounded-md text-sm ${activeTab === 'analysis' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
                                >
                                    <span className="inline-flex items-center gap-1"><Lightbulb size={14} /> 解析</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('knowledge')}
                                    className={`px-3 py-1.5 rounded-md text-sm ${activeTab === 'knowledge' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}
                                >
                                    <span className="inline-flex items-center gap-1"><BrainCircuit size={14} /> 知识点</span>
                                </button>
                            </div>
                        </div>

                        {!( (currentQ.type === 'coding' || currentQ.type === 'programming') && (getQuestionContent(currentQ) === programmingPracticeMarkdown || isReformed) ) && (
                            <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-5 leading-relaxed">
                                <MarkdownRenderer content={stripLeadingNumber(getQuestionContent(currentQ))} />
                            </h2>
                        )}

                        {activeTab === 'practice' && (
                            <div className="space-y-3">
                                {(currentQ.type === 'coding' || currentQ.type === 'programming') ? (
                                    <>
                                    <div className="luogu-problem">
                                        <div className="problem-header">
                                            <span className="problem-tag">上机编程</span>
                                            <span className="problem-title">第 {currentQuestionIndex + 1} 题</span>
                                        </div>
                                        <div className="problem-content">
                                            <MarkdownRenderer content={isReformed ? getQuestionContent(currentQ) : programmingPracticeMarkdown} />
                                        </div>
                                    </div>
                                    {(() => {
                                        const mapped = paperCodingMap[paperId] || {};
                                        const pid = mapped[`q${currentQ.id}`];
                                        const hasLink = pid && !pid.startsWith('P0000');
                                        return hasLink ? (
                                            <a
                                                href={`https://www.luogu.com.cn/problem/${pid}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 transition-colors"
                                            >
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                                前往洛谷提交代码
                                            </a>
                                        ) : null;
                                    })()}
                                    </>
                                ) : (
                                    (currentQ.options || []).map((opt, idx) => {
                                        const isSelected = selected === idx;
                                        const optionState = isRevealed
                                            ? idx === currentQ.answer
                                                ? 'bg-green-100 border-green-500 text-green-800'
                                                : isSelected
                                                    ? 'bg-red-100 border-red-400 text-red-700'
                                                    : 'opacity-50'
                                            : isSelected
                                                ? 'bg-indigo-50 border-indigo-500 text-indigo-800'
                                                : 'hover:border-indigo-300 hover:bg-slate-50';

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionSelect(currentQ.id, idx)}
                                                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${optionState}`}
                                            >
                                                <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>
                                                <MarkdownRenderer content={opt} inline={true} className="inline-block" />
                                            </button>
                                        );
                                    })
                                )}

                                <button
                                    onClick={revealCurrent}
                                    disabled={(currentQ.type !== 'coding' && currentQ.type !== 'programming') && selected === undefined}
                                    className={`w-full mt-2 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${((currentQ.type !== 'coding' && currentQ.type !== 'programming') && selected === undefined) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                                >
                                    <CheckCircle2 size={18} /> {(currentQ.type === 'coding' || currentQ.type === 'programming') ? '标记已阅读并查看复盘' : '查看答案与解析'}
                                </button>
                            </div>
                        )}

                        {activeTab === 'analysis' && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                                {isRevealed ? (
                                    <>
                                        {(currentQ.type === 'coding' || currentQ.type === 'programming') ? (
                                            <div className="space-y-3">
                                                <div className="luogu-problem">
                                                    <div className="problem-header">
                                                        <span className="problem-tag">题面回顾</span>
                                                        <span className="problem-title">上机编程</span>
                                                    </div>
                                                    <div className="problem-content">
                                                        <MarkdownRenderer content={programmingAnalysisMarkdown} />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-3">
                                                    <div className="bg-white border border-blue-100 rounded-lg p-3">
                                                        <div className="text-sm font-semibold text-slate-800 mb-1">解题思路</div>
                                                        <p className="text-sm text-slate-700 leading-relaxed">{codingGuide?.idea}</p>
                                                    </div>
                                                    <div className="bg-white border border-blue-100 rounded-lg p-3">
                                                        <div className="text-sm font-semibold text-slate-800 mb-1">复杂度评估</div>
                                                        <p className="text-sm text-slate-700 leading-relaxed">{codingGuide?.complexity}</p>
                                                    </div>
                                                </div>

                                                <div className="bg-white border border-blue-100 rounded-lg p-3">
                                                    <div className="text-sm font-semibold text-slate-800 mb-2">图解流程（可视化）</div>
                                                    <div className="flex flex-wrap items-center gap-2 text-xs">
                                                        {codingGuide?.steps?.map((step, idx) => (
                                                            <React.Fragment key={step}>
                                                                <span className="px-2 py-1 rounded bg-indigo-50 border border-indigo-200 text-indigo-700">{idx + 1}. {step}</span>
                                                                {idx < codingGuide.steps.length - 1 && <span className="text-indigo-400">→</span>}
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="bg-white border border-amber-100 rounded-lg p-3">
                                                    <div className="text-sm font-semibold text-amber-800 mb-1">易错点</div>
                                                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                                                        {(codingGuide?.pitfalls || []).map((it) => <li key={it}>{it}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {/* 答案速览 */}
                                                <div className="flex items-center gap-3 flex-wrap">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 text-sm font-bold text-green-800">
                                                        <CheckCircle2 size={16} className="text-green-600" /> 正确答案：{String.fromCharCode(65 + currentQ.answer)}
                                                    </span>
                                                    <span className="text-sm text-slate-600">
                                                        {currentQ.options[currentQ.answer]}
                                                    </span>
                                                    {answers[currentQ.id] !== undefined && answers[currentQ.id] !== currentQ.answer && (
                                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-red-50 border border-red-200 text-xs text-red-600">
                                                            你选了 {String.fromCharCode(65 + answers[currentQ.id])}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* 选项逐项分析 */}
                                                {richAnalysis?.optionAnalysis?.length > 0 && (
                                                    <div className="bg-white border border-blue-100 rounded-lg p-3">
                                                        <div className="text-sm font-semibold text-slate-800 mb-2">📋 选项逐项分析</div>
                                                        <div className="space-y-2">
                                                            {richAnalysis.optionAnalysis.map((oa) => (
                                                                <div key={oa.idx} className={`flex items-start gap-2 text-sm p-2 rounded-lg ${oa.isCorrect ? 'bg-green-50' : 'bg-slate-50'}`}>
                                                                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${oa.isCorrect ? 'bg-green-200 text-green-800' : 'bg-slate-200 text-slate-600'}`}>
                                                                        {oa.label}
                                                                    </span>
                                                                    <div className="flex-1 min-w-0">
                                                                        <div className="text-slate-700 leading-relaxed">{oa.text}</div>
                                                                        <div className={`mt-0.5 text-xs ${oa.isCorrect ? 'text-green-700' : 'text-slate-500'}`}>
                                                                            {oa.isCorrect ? '✓ ' : '✗ '}<MarkdownRenderer content={oa.reason} inline={true} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 解题步骤 */}
                                                {richAnalysis?.steps?.length > 0 && (
                                                    <div className="bg-white border border-indigo-100 rounded-lg p-3">
                                                        <div className="text-sm font-semibold text-slate-800 mb-2">🔍 解题步骤</div>
                                                        <div className="flex flex-wrap items-center gap-2 text-xs">
                                                            {richAnalysis.steps.map((step, idx) => (
                                                                <React.Fragment key={idx}>
                                                                    <span className="px-2.5 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-700 leading-relaxed">
                                                                        {step.icon} {step.text}
                                                                    </span>
                                                                    {idx < richAnalysis.steps.length - 1 && <span className="text-indigo-300">→</span>}
                                                                </React.Fragment>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* 核心知识点 */}
                                                <div className="bg-white border border-violet-100 rounded-lg p-3">
                                                    <div className="text-sm font-semibold text-violet-800 mb-1">💡 核心知识点</div>
                                                    <MarkdownRenderer content={richAnalysis?.keyPoint || buildQuestionInsight(currentQ, paperData.level)} className="text-sm text-slate-700 leading-relaxed" />
                                                </div>

                                                {/* 易错点 */}
                                                {richAnalysis?.pitfalls?.length > 0 && (
                                                    <div className="bg-white border border-amber-100 rounded-lg p-3">
                                                        <div className="text-sm font-semibold text-amber-800 mb-1.5">⚠️ 易错提醒</div>
                                                        <ul className="space-y-1">
                                                            {richAnalysis.pitfalls.map((p, idx) => (
                                                                <li key={idx} className="text-sm text-slate-700 flex items-start gap-1.5">
                                                                    <span className="text-amber-500 flex-shrink-0 mt-0.5">•</span>
                                                                    <span className="leading-relaxed">{p}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* 知识延伸 */}
                                                {richAnalysis?.extension && (
                                                    <div className="bg-white border border-emerald-100 rounded-lg p-3">
                                                        <div className="text-sm font-semibold text-emerald-800 mb-1">🚀 知识延伸</div>
                                                        <MarkdownRenderer content={richAnalysis.extension} className="text-sm text-slate-700 leading-relaxed" />
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag) => (
                                                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white border border-blue-200 text-blue-700">#{tag}</span>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <p className="text-sm text-slate-600 flex items-center gap-2"><Sparkles size={14} /> 先在「作答」中完成选择，再查看解析与知识点归纳。</p>
                                )}
                            </div>
                        )}

                        {activeTab === 'knowledge' && (
                            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 space-y-4">
                                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm"><Tags size={14} /> 本题能力画像</div>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-white border border-indigo-200 text-indigo-700 font-medium">#{tag}</span>
                                    ))}
                                </div>

                                <div className="border-t border-slate-200 pt-3">
                                    <div className="text-sm font-semibold text-slate-700 mb-2">🎯 考点归纳</div>
                                    <div className="text-sm text-slate-600 leading-relaxed space-y-1">
                                        {(() => {
                                            const core = `${getQuestionContent(currentQ)} ${(currentQ?.options || []).join(' ')}`;
                                            if (/循环|for|while/i.test(core)) return (
                                                <>
                                                    <p>• 循环结构是 GESP L{paperData.level} 的<strong>核心考点</strong>，几乎每次必考</p>
                                                    <p>• 重点掌握 <code className="bg-slate-200 px-1 rounded text-xs">for</code>、<code className="bg-slate-200 px-1 rounded text-xs">while</code>、<code className="bg-slate-200 px-1 rounded text-xs">do-while</code> 三种循环的区别</p>
                                                    <p>• 嵌套循环的执行次数计算是高频题型</p>
                                                </>
                                            );
                                            if (/if|else|条件|判断|switch/i.test(core)) return (
                                                <>
                                                    <p>• 条件分支是程序逻辑的基础，GESP 各等级均有涉及</p>
                                                    <p>• 注意 <code className="bg-slate-200 px-1 rounded text-xs">if-else</code> 的配对规则和逻辑运算符优先级</p>
                                                    <p>• <code className="bg-slate-200 px-1 rounded text-xs">switch-case</code> 需要配合 <code className="bg-slate-200 px-1 rounded text-xs">break</code> 防止穿透</p>
                                                </>
                                            );
                                            if (/数组|下标|索引|vector/i.test(core)) return (
                                                <>
                                                    <p>• 数组是数据组织的基本方式，L{paperData.level} 重点考查</p>
                                                    <p>• 下标从 <code className="bg-slate-200 px-1 rounded text-xs">0</code> 开始，最大下标为 <code className="bg-slate-200 px-1 rounded text-xs">n-1</code></p>
                                                    <p>• 二维数组的行列遍历顺序影响程序结果</p>
                                                </>
                                            );
                                            return (
                                                <>
                                                    <p>• 本题考查 L{paperData.level} 级别的基础能力点</p>
                                                    <p>• 建议结合课程内容系统复习相关章节</p>
                                                </>
                                            );
                                        })()}
                                    </div>
                                </div>

                                <div className="border-t border-slate-200 pt-3">
                                    <div className="text-sm font-semibold text-slate-700 mb-2">📚 复盘建议</div>
                                    <div className="bg-white rounded-lg border border-slate-200 p-3 text-sm text-slate-600 leading-relaxed space-y-1.5">
                                        <p>1️⃣ <strong>复述题意</strong>：用自己的话把题目要求说一遍</p>
                                        <p>2️⃣ <strong>定位关键</strong>：找出题目考查的核心概念或语法点</p>
                                        <p>3️⃣ <strong>手动推演</strong>：用最小样例逐步模拟程序执行过程</p>
                                        <p>4️⃣ <strong>边界验证</strong>：检查极端情况（0、1、空、最大值）是否正确</p>
                                        <p>5️⃣ <strong>归纳总结</strong>：记录本题的解题套路，用于同类题目</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => {
                                setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1));
                                setActiveTab('practice');
                            }}
                            disabled={currentQuestionIndex === 0}
                            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-50"
                        >
                            <span className="inline-flex items-center gap-1"><ChevronLeft size={16} /> 上一题</span>
                        </button>
                        <button
                            onClick={() => {
                                setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1));
                                setActiveTab('practice');
                            }}
                            disabled={currentQuestionIndex === questions.length - 1}
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white disabled:opacity-50"
                        >
                            <span className="inline-flex items-center gap-1">下一题 <ChevronRight size={16} /></span>
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}
