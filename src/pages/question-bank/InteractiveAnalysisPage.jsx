import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RefreshCw, BookOpen, CheckCircle2, Lightbulb, RotateCcw, Tags } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';

const stripLeadingNumber = (questionText) => {
    if (typeof questionText !== 'string') return questionText || '';
    return questionText.replace(/^\s*\d+[.。、]\s*/, '');
};

const getQuestionContent = (q) => {
    if (!q) return '';
    return q.question || q.description || q.summary || q.title || '';
};

const inferTags = (q) => {
    if (Array.isArray(q?.tags) && q.tags.length) return q.tags;
    const text = `${getQuestionContent(q)} ${q?.explanation || ''}`;
    const tags = [];
    if (/循环|for|while/i.test(text)) tags.push('循环');
    if (/条件|判断|if|逻辑/i.test(text)) tags.push('条件判断');
    if (/输入|输出|printf|cout/i.test(text)) tags.push('输入输出');
    if (/运算|表达式|%|\+\+|--/i.test(text)) tags.push('运算符');
    return tags.length ? tags : ['基础概念'];
};

/**
 * Build rich structured analysis for objective questions.
 * Returns { optionAnalysis, steps, keyPoint, pitfalls, extension }
 */
const buildRichAnalysis = (q, level) => {
    if (!q) return null;
    const isProgramming = q.type === 'coding' || q.type === 'programming';
    if (isProgramming) return null;

    const questionText = getQuestionContent(q) || '';
    const options = q.options || [];
    const answerIdx = q.answer;
    const explanation = q.explanation?.trim() || '';
    const merged = `${questionText} ${options.join(' ')} ${explanation}`;

    // --- 0. 从 explanation 中提取纯文本摘要（去除 Markdown 标记） ---
    const stripMarkdown = (md) => {
        if (!md) return '';
        return md
            .replace(/\*\*([^*]+)\*\*/g, '$1')
            .replace(/\*([^*]+)\*/g, '$1')
            .replace(/`([^`]+)`/g, '$1')
            .replace(/^#{1,6}\s+/gm, '')
            .replace(/^>\s+/gm, '')
            .replace(/^[-*+]\s+/gm, '')
            .replace(/^\d+\.\s+/gm, '');
    };

    // --- 1. 选项逐项分析 ---
    const isJudge = q?.type === 'judge' || q?.type === 'tf';
    const optionAnalysis = options.map((opt, idx) => {
        const isCorrect = idx === answerIdx;
        const optText = typeof opt === 'string' ? opt : String(opt);
        let reason = '';

        // 优先从 explanation 中提取该选项的解析行
        const letter = String.fromCharCode(65 + idx);
        const optLineRegex = new RegExp(`-\\s*\\*\\*${letter}\\s+[^*]*\\*\\*[^：]*：\\s*(.+)`, 'i');
        const optLineMatch = explanation.match(optLineRegex);

        if (isCorrect) {
            if (optLineMatch) {
                reason = stripMarkdown(optLineMatch[1]);
            } else if (isJudge) {
                const basisMatch = explanation.match(/\*\*判定依据[：:]\*\*\s*\n([\s\S]*?)(?=\n\s*\*\*|$)/);
                reason = basisMatch ? stripMarkdown(basisMatch[1].trim()) : '与题意判定一致。';
            } else {
                reason = '正确答案，与题意完全吻合。';
            }
        } else {
            if (optLineMatch) {
                reason = stripMarkdown(optLineMatch[1]).replace(/^错误[。，、]\s*/, '').replace(/^不正确[。，、]\s*/, '');
            } else if (isJudge) {
                const correctionMatch = explanation.match(/\*\*纠错[：:]\*\*\s*(.+?)(?=\n\s*\*\*|$)/);
                const basisMatch = explanation.match(/\*\*判定依据[：:]\*\*\s*\n([\s\S]*?)(?=\n\s*\*\*|$)/);
                if (correctionMatch) {
                    reason = stripMarkdown(correctionMatch[1].trim());
                } else if (basisMatch) {
                    reason = stripMarkdown(basisMatch[1].trim());
                } else {
                    reason = '与题意判定不符。';
                }
            } else if (explanation) {
                reason = '该选项与题意不符。';
            } else {
                // 无 explanation，回退到关键词推断
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
                } else {
                    reason = '该选项与题意不符，属于常见干扰项。';
                }
            }
        }

        return { idx, label: String.fromCharCode(65 + idx), text: optText, isCorrect, reason };
    });

    // --- 解题步骤 ---
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

    // --- 核心知识点 ---
    // 从 explanation 中提取核心解析部分（去除答案行和选项分析列表）
    let keyPoint = '';
    if (explanation) {
        const analysisMatch = explanation.match(/\*\*解析[：:]\*\*\s*\n([\s\S]*?)(?=\n\s*-\s*\*\*[A-D]|$)/);
        if (analysisMatch && analysisMatch[1].trim()) {
            keyPoint = analysisMatch[1].trim();
        } else {
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
        else keyPoint = `该题考查 GESP L${level} 核心知识点，建议结合课程内容系统复习。`;
    }

    // --- 易错点 ---
    const pitfalls = [];
    if (/for|while|循环/i.test(merged)) {
        pitfalls.push('循环边界：i < n 还是 i <= n？差一次结果完全不同');
        pitfalls.push('循环变量修改：i++ 写成 i-- 或忘记更新会导致死循环');
    }
    if (/i\s*%\s*\d|取模|余数/i.test(merged)) pitfalls.push('负数取模：C++ 中 -7 % 3 = -1，不是 2');
    if (/int\s+\w+\s*=\s*[\d.]+f?|浮点|double|float/i.test(merged)) pitfalls.push('整数除法陷阱：5/2 = 2 而非 2.5，至少一个操作数需为浮点');
    if (/=\s*=|赋值|比较/i.test(merged)) pitfalls.push('= 赋值 vs == 比较：if(a=5) 永远为真，且 a 被修改');
    if (/数组|arr|下标/i.test(merged)) pitfalls.push('数组下标从 0 开始，arr[n] 已越界');
    if (/char|ASCII|字符/i.test(merged)) pitfalls.push('字符与整数混用：\'0\' ≠ 0，\'0\' 的 ASCII 值是 48');
    if (/位运算|&|\||\^|<<|>>/i.test(merged)) pitfalls.push('&& 与 &、|| 与 | 的区别：逻辑运算 vs 位运算');
    if (/continue|break/i.test(merged)) pitfalls.push('continue 跳过本轮剩余语句进入下一轮，break 直接退出整个循环');
    if (pitfalls.length === 0) {
        pitfalls.push('审题不仔细：注意"不正确的是""错误的是"等反向提问');
        pitfalls.push('代入验证：用最小样例手动推演，比凭直觉更可靠');
    }

    // --- 知识延伸 ---
    let extension = '';
    if (/优先级|运算顺序/i.test(merged)) {
        extension = 'C++ 运算符优先级口诀："单目算关逻，条赋逗最低"。';
    } else if (/for|while|do\s*while/i.test(merged)) {
        extension = 'for 与 while 本质等价，for 更适合计数循环，while 更适合条件循环。';
    } else if (/if|else|switch/i.test(merged)) {
        extension = '多重 if-else 注意匹配规则（就近匹配），switch 需要 break 防止穿透。';
    } else if (/字符串|string|strlen|strcmp/i.test(merged)) {
        extension = 'C 风格字符串以 \'\\0\' 结尾，strlen 不计入；C++ string 类更安全方便。';
    } else if (/位运算/i.test(merged)) {
        extension = '位运算技巧：n & (n-1) 消去最低位 1，判断 2 的幂；n ^ n = 0，n ^ 0 = n。';
    } else {
        extension = `该知识点在 GESP L${level} 中反复出现，建议整理错题本，归纳同类题型的解题套路。`;
    }

    return { optionAnalysis, steps, keyPoint, pitfalls, extension };
};

export default function InteractiveAnalysisPage({ paperData, paperId }) {
    const navigate = useNavigate();
    const allQuestions = useMemo(() => {
        if (!paperData) return [];
        return [
            ...(paperData.questions || []),
            ...(paperData.programmingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' })),
            ...(paperData.codingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' }))
        ].sort((a, b) => Number(a.id) - Number(b.id));
    }, [paperData]);
    const questions = allQuestions; 

    const [activeTab, setActiveTab] = useState('practice');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [revealed, setRevealed] = useState({});

    const currentQ = questions[currentQuestionIndex] || questions[0] || null;

    const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
    const revealedCount = useMemo(() => Object.keys(revealed).length, [revealed]);
    const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;

    const resetAll = () => {
        setAnswers({});
        setRevealed({});
        setCurrentQuestionIndex(0);
        setActiveTab('practice');
    };

    const handleOptionSelect = (qId, optionIdx) => {
        if (revealed[qId]) return;
        setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    };

    const revealCurrent = () => {
        if (!currentQ) return;
        if (answers[currentQ.id] === undefined) return;
        setRevealed(prev => ({ ...prev, [currentQ.id]: true }));
        setActiveTab('analysis');
    };

    if (!paperData || !questions.length) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
                <div className="max-w-md text-center space-y-4">
                    <h2 className="text-xl font-bold text-slate-800">暂无可用增强解析资源</h2>
                    <p className="text-slate-500 text-sm">该试卷暂未完成交互解析页，已自动回退到基础模式。</p>
                    <button
                        onClick={() => navigate(`/question-bank/${paperData?.level || 2}/${paperId}`)}
                        className="px-4 py-2 rounded-lg bg-indigo-600 text-white"
                    >
                        返回试卷
                    </button>
                </div>
            </div>
        );
    }

    const selected = answers[currentQ.id];
    const isRevealed = !!revealed[currentQ.id];
    const richAnalysis = buildRichAnalysis(currentQ, paperData.level);

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-slate-100">
                        <ChevronLeft size={18} />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="font-bold text-slate-800 truncate">{paperData.title}</h1>
                        <div className="text-xs text-slate-500">解析模式 · Level {paperData.level}</div>
                    </div>
                    <button onClick={resetAll} className="px-3 py-2 rounded-lg text-sm border border-slate-200 hover:bg-slate-50 flex items-center gap-1">
                        <RotateCcw size={14} /> 重置
                    </button>
                </div>
                <div className="max-w-6xl mx-auto px-4 pb-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>答题进度 {answeredCount}/{questions.length}</span>
                        <span>已解析 {revealedCount}/{questions.length}</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto grid md:grid-cols-[220px_1fr] gap-4 p-4">
                <aside className="bg-white rounded-xl border border-slate-200 p-3 h-fit">
                    <div className="text-sm font-semibold text-slate-700 mb-3">题号导航</div>
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
                            </div>
                        </div>

                        <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-5 leading-relaxed">
                            <MarkdownRenderer content={stripLeadingNumber(getQuestionContent(currentQ))} inline={true} />
                        </h2>

                        {activeTab === 'practice' ? (
                            <div className="space-y-3">
                                {currentQ.options.map((opt, idx) => {
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
                                            className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${optionState}`}
                                        >
                                            <div className="flex-shrink-0 font-semibold">{String.fromCharCode(65 + idx)}.</div>
                                            <MarkdownRenderer content={opt} inline={true} className="flex-1" />
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={revealCurrent}
                                    disabled={selected === undefined}
                                    className={`w-full mt-2 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${selected === undefined ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                                >
                                    <CheckCircle2 size={18} /> 查看答案与解析
                                </button>
                            </div>
                        ) : (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                                {isRevealed ? (
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
                                            <MarkdownRenderer content={richAnalysis?.keyPoint || currentQ.explanation || '暂无解析'} className="text-sm text-slate-700 leading-relaxed" />
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

                                        <div className="flex flex-wrap gap-2">
                                            {inferTags(currentQ).map(tag => (
                                                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white border border-blue-200 text-blue-700">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-600 flex items-center gap-2"><RefreshCw size={14} /> 先在「作答」标签中选择答案并点击"查看答案与解析"。</p>
                                )}
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
