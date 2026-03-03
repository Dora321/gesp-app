import React, { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useNavigate, useParams } from 'react-router-dom';
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
    Tags
} from 'lucide-react';
import { paperRegistry } from '../../data/gesp';
import { luoguCodingByLevel } from '../../data/gesp/luoguCodingByLevel';
import { paperCodingMap } from '../../data/gesp/paperCodingMap';

const stripLeadingNumber = (questionText) => {
    if (typeof questionText !== 'string') return questionText;
    return questionText.replace(/^\s*\d+[.。、]\s*/, '');
};

const inferKnowledgeTags = (q, level) => {
    const merged = `${q?.question || ''} ${q?.explanation || ''} ${(q?.options || []).join(' ')}`;
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
    if (q?.type === 'coding') tags.push('上机编程');
    tags.push(`L${level}能力点`);

    return Array.from(new Set(tags)).slice(0, 5);
};

const buildQuestionInsight = (q, level) => {
    const explanation = q?.explanation?.trim();
    if (explanation) return explanation;

    const core = `${q?.question || ''}${(q?.options || []).join(' ')}`;
    if (/循环|for|while/i.test(core)) return '本题核心在于先明确循环变量变化，再判断终止条件和每轮状态更新，避免“少一次/多一次”边界错误。';
    if (/if|else|条件|判断/i.test(core)) return '本题重点是条件分支触发顺序。建议先代入最小样例，逐分支验证表达式真值。';
    if (/数组|下标|索引|vector/i.test(core)) return '本题关注索引边界与访问顺序，先确认合法下标范围，再处理更新逻辑。';
    return `该题属于 GESP L${level} 高频考点，建议先定位题干关键词，再用“样例代入 + 边界验证”两步法完成推导。`;
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

export default function EnhancedPaperPage({ forcedPaperId }) {
    const { paperId: routePaperId } = useParams();
    const navigate = useNavigate();

    const paperId = forcedPaperId || routePaperId;
    const paperData = paperRegistry[paperId] || null;
    const baseQuestions = paperData?.questions || [];

    const questions = useMemo(() => {
        if (!paperData) return [];
        const has26 = baseQuestions.some((q) => Number(q.id) === 26);
        const has27 = baseQuestions.some((q) => Number(q.id) === 27);
        if (has26 && has27) return baseQuestions;

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

    const currentQ = questions[currentQuestionIndex];
    const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
    const revealedCount = useMemo(() => Object.keys(revealed).length, [revealed]);
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
        if (currentQ.type !== 'coding' && answers[currentQ.id] === undefined) return;
        if (currentQ.type === 'coding' && answers[currentQ.id] === undefined) {
            setAnswers((prev) => ({ ...prev, [currentQ.id]: 0 }));
        }
        setRevealed((prev) => ({ ...prev, [currentQ.id]: true }));
        setActiveTab('analysis');
    };

    if (!paperData || !questions.length) {
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

    const selected = answers[currentQ.id];
    const isRevealed = !!revealed[currentQ.id];
    const tags = inferKnowledgeTags(currentQ, paperData.level);

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
                                    onClick={() => setCurrentQuestionIndex(idx)}
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

                        <h2 className="text-lg md:text-xl font-bold text-slate-800 mb-5 leading-relaxed">
                            {stripLeadingNumber(currentQ.question)}
                        </h2>

                        {activeTab === 'practice' && (
                            <div className="space-y-3">
                                {currentQ.type === 'coding' ? (
                                    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 space-y-3">
                                        <p className="text-sm text-slate-700 leading-relaxed">
                                            代码上机题题面如下（Markdown 原文），可直接在此阅读后开始实现：
                                        </p>
                                        <div className="prose prose-sm max-w-none bg-white rounded-lg border border-indigo-100 p-3">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentQ.explanation || ''}</ReactMarkdown>
                                        </div>
                                    </div>
                                ) : (
                                    currentQ.options.map((opt, idx) => {
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
                                                <span className="font-semibold mr-2">{String.fromCharCode(65 + idx)}.</span>{opt}
                                            </button>
                                        );
                                    })
                                )}

                                <button
                                    onClick={revealCurrent}
                                    disabled={currentQ.type !== 'coding' && selected === undefined}
                                    className={`w-full mt-2 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${(currentQ.type !== 'coding' && selected === undefined) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                                >
                                    <CheckCircle2 size={18} /> {currentQ.type === 'coding' ? '标记已阅读并查看复盘' : '查看答案与解析'}
                                </button>
                            </div>
                        )}

                        {activeTab === 'analysis' && (
                            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3">
                                {isRevealed ? (
                                    <>
                                        {currentQ.type === 'coding' ? (
                                            <div className="space-y-2">
                                                <p className="text-sm"><span className="font-semibold text-indigo-700">上机题原题面（Markdown）：</span></p>
                                                <div className="prose prose-sm max-w-none bg-white rounded-lg border border-blue-100 p-3">
                                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentQ.explanation || ''}</ReactMarkdown>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <p className="text-sm"><span className="font-semibold text-green-700">正确答案：</span> {String.fromCharCode(65 + currentQ.answer)}. {currentQ.options[currentQ.answer]}</p>
                                                <p className="text-sm text-slate-700 leading-relaxed">{buildQuestionInsight(currentQ, paperData.level)}</p>
                                            </>
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
                            <div className="rounded-xl border border-slate-200 p-4 bg-slate-50 space-y-3">
                                <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm"><Tags size={14} /> 本题能力画像</div>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag) => (
                                        <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white border border-slate-200 text-slate-700">{tag}</span>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    建议复盘顺序：先复述题意 → 再说明关键判断/循环条件 → 最后口头推演一个最小样例，确认边界是否正确。
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                            disabled={currentQuestionIndex === 0}
                            className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 disabled:opacity-50"
                        >
                            <span className="inline-flex items-center gap-1"><ChevronLeft size={16} /> 上一题</span>
                        </button>
                        <button
                            onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
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
