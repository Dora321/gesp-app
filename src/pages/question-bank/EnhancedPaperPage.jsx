import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import useQuestionKeyboardNavigation from '../../hooks/useQuestionKeyboardNavigation';
import { buildQuestionInsight, buildRichAnalysis } from './analysisEngine';
import { formatOptionDisplay, stripLeadingNumber } from '../../utils/questionTextFormatting';

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
    const isSorting = /排序|冒泡|选择|插入|快排|归并/.test(text);
    const isSearch = /二分|查找|搜索|DFS|BFS|队列|栈/.test(text);

    let idea = '先抽象状态与转移，再通过循环/函数逐步求解。';
    let steps = ['读入输入参数', '确定核心判定/转移', '循环或递归求解', '处理边界与特判', '输出结果'];
    let complexity = '优先保证正确性，再评估复杂度并优化。';
    let pitfalls = ['输入范围可能很大，注意类型溢出', '边界值（0/1/空）要单独验证', '输出格式要与题面完全一致'];

    if (isGrid) {
        idea = '把问题转成"遍历每个格子并判定是否满足条件"，统计满足条件的数量。';
        steps = ['读入 H、W、x', '双层循环遍历 (r,c)', '按公式判定是否满足', '满足则计数 +1', '输出计数'];
        complexity = '时间复杂度 O(H×W)，空间复杂度 O(1)。';
        pitfalls = ['行列索引从 1 开始还是 0 开始要统一', '公式中开方比较建议注意浮点误差', '边界格子也要参与判定'];
    } else if (isNumberTheory) {
        idea = '先把数学判定写成函数或清晰条件，再按题目范围枚举、统计或构造答案。';
        steps = ['读入数据', '整理整除/取模/质数等判定条件', '枚举候选值并应用判定', '维护答案或计数', '输出结果'];
        complexity = '通常为 O(n) 或 O(n√n)，若数据范围较大要考虑筛法、预处理或数学化简。';
        pitfalls = ['0、1、负数等边界值要单独判断', '取模表达式要加括号避免优先级误读', '乘法中间结果可能超过 int'];
    } else if (isSorting) {
        idea = '先明确排序关键字和方向，再判断题目需要完整排序、局部排序还是只取最值。';
        steps = ['读入序列', '确定比较规则', '选择合适排序或维护结构', '处理相等元素顺序', '输出目标结果'];
        complexity = '常规排序时间复杂度 O(n log n)，若只取最大/最小可优化到 O(n)。';
        pitfalls = ['升序和降序不要写反', '多关键字排序要处理平局规则', '稳定性要求不能忽略'];
    } else if (isSearch) {
        idea = '把状态、边界和转移写清楚，再选择二分、DFS/BFS 或栈队列模拟。';
        steps = ['定义状态和搜索范围', '确定转移或判定函数', '维护访问/边界信息', '找到目标或统计答案', '验证极端情况'];
        complexity = '二分通常 O(log n)，图/网格搜索通常 O(状态数 + 转移数)。';
        pitfalls = ['二分左右边界更新容易漏解', 'DFS/BFS 要标记 visited 防止重复访问', '队列和栈对应的遍历顺序不同'];
    }

    return { idea, steps, complexity, pitfalls, isGrid, isNumberTheory, isSorting, isSearch };
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
        Promise.resolve().then(() => {
            if (!cancelled) setLoading(true);
        });
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

    const goToPreviousQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
        setActiveTab('practice');
    }, []);

    const goToNextQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1));
        setActiveTab('practice');
    }, [questions.length]);

    useQuestionKeyboardNavigation({
        enabled: !loading && !!paperData,
        questionCount: questions.length,
        onPrevious: goToPreviousQuestion,
        onNext: goToNextQuestion
    });

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
        setRevealed((prev) => ({ ...prev, [qId]: true }));
        setActiveTab('analysis');
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
                            <div className="text-lg md:text-xl font-bold text-slate-800 mb-5 leading-relaxed">
                                <MarkdownRenderer content={stripLeadingNumber(getQuestionContent(currentQ))} />
                            </div>
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
                                                ? 'border-emerald-400 bg-emerald-50 text-emerald-950 shadow-emerald-100'
                                                : isSelected
                                                    ? 'border-rose-300 bg-rose-50 text-rose-900 shadow-rose-100'
                                                    : 'border-slate-200 bg-slate-50/70 text-slate-500 opacity-75'
                                            : isSelected
                                                ? 'border-indigo-400 bg-indigo-50 text-indigo-950 shadow-indigo-100'
                                                : 'border-slate-200 bg-white text-slate-800 hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-md';
                                        const badgeState = isRevealed
                                            ? idx === currentQ.answer
                                                ? 'bg-emerald-600 text-white'
                                                : isSelected
                                                    ? 'bg-rose-500 text-white'
                                                    : 'bg-slate-200 text-slate-500'
                                            : isSelected
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-slate-100 text-slate-600 group-hover:bg-indigo-100 group-hover:text-indigo-700';

                                        return (
                                            <button
                                                key={idx}
                                                onClick={() => handleOptionSelect(currentQ.id, idx)}
                                                className={`question-option group w-full text-left rounded-xl border px-4 py-3.5 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${optionState}`}
                                            >
                                                <span className={`option-badge ${badgeState}`}>{String.fromCharCode(65 + idx)}</span>
                                                <span className="question-option-content">
                                                    <MarkdownRenderer content={formatOptionDisplay(opt)} inline={true} className="text-inherit" />
                                                </span>
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
                                                    <MarkdownRenderer content={formatOptionDisplay(currentQ.options[currentQ.answer])} inline={true} className="text-sm text-slate-600" />
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
                                                                        <MarkdownRenderer content={oa.text} inline={true} className="text-slate-700 leading-relaxed" />
                                                                        <div className={`mt-0.5 text-xs ${oa.isCorrect ? 'text-green-700' : 'text-slate-500'}`}>
                                                                            {oa.isCorrect ? '✓ ' : '✗ '}<MarkdownRenderer content={oa.reason} inline={true} />
                                                                        </div>
                                                                    </div>
                                                                </div>
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
                                                                    <MarkdownRenderer content={p} inline={true} className="leading-relaxed" />
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
