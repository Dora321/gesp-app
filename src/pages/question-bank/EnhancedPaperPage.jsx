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
    AlertTriangle,
    Code2
} from 'lucide-react';
import LoadingScreen from '../../components/LoadingScreen';
import { getPaper } from '../../data/gesp';
import { getLuoguProblemUrl, needsSynthesizedCoding, withSynthesizedCoding } from '../../data/gesp/codingQuestions';
import useQuestionKeyboardNavigation from '../../hooks/useQuestionKeyboardNavigation';
import useLuoguPool from '../../hooks/useLuoguPool';
import { selectAnalysisView } from './analysisEngine';
import AnalysisTrustNotice from './AnalysisTrustNotice';
import AnswerReview from './AnswerReview';
import useAnalysisSession from '../../hooks/useAnalysisSession';
import { resolveVerification } from '../../data/gesp/verificationModel';
import SourceIntegrityNotice from '../../components/SourceIntegrityNotice';
import CodingProblemView from '../../components/CodingProblemView';
import { CopyableCodeBlock } from '../../components/CodingProblemView';
import { integrityNoticeTiming } from '../../utils/sourceIntegrity';
import { buildQuestionContent as getQuestionContent, formatOptionDisplay, stripLeadingNumber } from '../../utils/questionTextFormatting';
import { RESET_ANALYSIS_CONFIRM } from '../../utils/analysisProgress';
import { getQuestionNavStatus } from '../../utils/questionNavStatus';
import { isProgrammingQuestion } from '../../utils/questionHelpers';

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

// 没有站内题解时才显示的通用做题步骤。刻意不按题干关键词套模板：按「格」
// 「排序」等字眼猜出来的复杂度、步骤会和真实题意矛盾（见 2025-12 四级第 26 题）。
const GENERIC_CODING_STEPS = ['读懂题意，圈出输入和输出', '用样例手算一遍', '写出核心循环或判断', '检查边界情况', '对照样例运行'];
const GENERIC_CODING_PITFALLS = ['数据范围可能很大，注意 int 是否会溢出', '边界值（0、1、只有一个数）要单独试一试', '输出格式要和题目完全一致'];

const ANALYSIS_CARD_TONES = {
    neutral: 'border-slate-200 bg-slate-50 text-slate-700',
    amber: 'border-amber-200 bg-amber-50 text-amber-800',
    indigo: 'border-indigo-200 bg-indigo-50 text-indigo-800',
};

const AnalysisCard = ({ icon: Icon, title, tone = 'neutral', children }) => (
    <section className="min-w-0 rounded-xl border border-slate-200 bg-white p-4 md:p-5">
        <h3 className="flex items-center gap-2.5 text-[15px] font-semibold text-slate-800 md:text-base">
            <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${ANALYSIS_CARD_TONES[tone] || ANALYSIS_CARD_TONES.neutral}`}
                aria-hidden="true"
            >
                <Icon size={16} />
            </span>
            {title}
        </h3>
        <div className="mt-3 min-w-0">{children}</div>
    </section>
);

const sectionMetaByLevel = {
    1: { tone: '语法启蒙', focus: '语句规则与基础逻辑' },
    2: { tone: '流程强化', focus: '循环与分支协同' },
    3: { tone: '算法入门', focus: '枚举、模拟与结构化表达' },
    4: { tone: '结构进阶', focus: '数据组织与流程控制' },
    5: { tone: '综合建模', focus: '多步骤推理与状态管理' },
    6: { tone: '算法深化', focus: '复杂度与策略优化' },
    7: { tone: '竞赛视角', focus: '抽象化与高效实现' },
    8: { tone: '高阶压轴', focus: '综合算法与工程稳健性' },
};

// Local MarkdownRenderer removed in favor of shared component

// ExamPaper 已经取过卷（并套用了勘误）、也加载过洛谷题池时，直接通过 props 传进来，
// 不再重复 getPaper；单独挂载（无 props）时才自己加载。
export default function EnhancedPaperPage({ forcedPaperId, paperData: providedPaper = null, luoguPool: providedPool = null }) {
    const { paperId: routePaperId } = useParams();
    const navigate = useNavigate();

    const paperId = forcedPaperId || routePaperId;
    const [fetchedPaper, setFetchedPaper] = useState(null);
    const [loading, setLoading] = useState(!providedPaper);

    useEffect(() => {
        if (providedPaper) return undefined;
        let cancelled = false;
        Promise.resolve().then(() => {
            if (!cancelled) setLoading(true);
        });
        getPaper(paperId).then(data => {
            if (!cancelled) {
                setFetchedPaper(data);
                setLoading(false);
            }
        }).catch(() => {
            if (!cancelled) setLoading(false);
        });
        return () => { cancelled = true; };
    }, [paperId, providedPaper]);

    const paperData = providedPaper || fetchedPaper;

    // All hooks MUST be called before any conditional returns (React Rules of Hooks)
    const baseQuestions = useMemo(() => {
        if (!paperData) return [];
        return [
            ...(paperData.questions || []),
            ...(paperData.programmingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' })),
            ...(paperData.codingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' }))
        ];
    }, [paperData]);

    // Coding questions (Q26/Q27) are filled from the per-level Luogu problem
    // set. Only papers that don't already embed those need it, so load that
    // ~200KB dataset on demand instead of bundling it into the ExamPaper chunk.
    // 合成逻辑与考试模式共用（见 data/gesp/codingQuestions.js）：同一张卷子
    // 在两种模式下必须是同样的题数，此前各写一套，考试模式那份漏掉了。
    const needsLuogu = useMemo(
        () => Boolean(paperData) && needsSynthesizedCoding(baseQuestions),
        [paperData, baseQuestions],
    );

    const luogu = useLuoguPool(paperData?.level, needsLuogu && !providedPool);
    const luoguPool = providedPool || luogu.pool;

    const questions = useMemo(
        () => (paperData ? withSynthesizedCoding(baseQuestions, { paperId, luoguPool }) : []),
        [paperData, baseQuestions, paperId, luoguPool],
    );

    const [activeTab, setActiveTab] = useState('practice');
    // 作答按卷号存进 learningData.analysis：刷新不丢；答错的客观题并入错题本。
    const mistakeSource = useCallback((q) => ({ paperId, questionId: q.id }), [paperId]);
    const {
        answers,
        revealed,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        selectOption,
        reveal,
        reset,
    } = useAnalysisSession({ storageKey: paperId, questions, mistakeSource });

    const goToPreviousQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
        setActiveTab('practice');
    }, [setCurrentQuestionIndex]);

    const goToNextQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1));
        setActiveTab('practice');
    }, [questions.length, setCurrentQuestionIndex]);

    useQuestionKeyboardNavigation({
        enabled: !loading && !!paperData,
        questionCount: questions.length,
        onPrevious: goToPreviousQuestion,
        onNext: goToNextQuestion
    });

    const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
    const revealedCount = useMemo(() => Object.keys(revealed).length, [revealed]);

    // --- Conditional returns AFTER all hooks ---
    if ((loading && !providedPaper) || (needsLuogu && !providedPool && luogu.status === 'loading')) {
        return <LoadingScreen message="正在拼命加载试卷" variant="dark" />;
    }

    if (needsLuogu && !providedPool && luogu.status === 'error') {
        return (
            <div className="mw-surface mw-line-bank min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <div className="text-center max-w-lg p-6" role="alert">
                    <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
                    <h2 className="text-xl font-bold text-slate-700">上机编程题加载失败</h2>
                    <p className="mb-6">这张卷的第 26、27 题（上机编程）题面没能加载出来，可能是网络不稳定。请重试一次。</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={luogu.retry} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">重新加载</button>
                        <button onClick={() => navigate('/question-bank')} className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg">返回题库</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!paperData) {
        return (
            <div className="mw-surface mw-line-bank min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
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
            <div className="mw-surface mw-line-bank min-h-screen bg-slate-50 flex items-center justify-center p-6">
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
    };

    // Programming questions have no option answer: revealing one stores a
    // placeholder 0 while q.answer is undefined, so they must not count as wrong.
    let wrongCount = 0;
    questions.forEach((q) => {
        if (isProgrammingQuestion(q)) return;
        if (revealed[q.id] && answers[q.id] !== q.answer) wrongCount += 1;
    });

    const resetAll = () => {
        if (answeredCount > 0 && !window.confirm(RESET_ANALYSIS_CONFIRM)) return;
        reset();
        setActiveTab('practice');
    };

    const handleOptionSelect = (q, optionIdx) => {
        if (selectOption(q, optionIdx)) setActiveTab('analysis');
    };

    const revealCurrent = () => {
        if (reveal(currentQ)) setActiveTab('analysis');
    };

    const selected = answers[currentQ.id];
    const isRevealed = !!revealed[currentQ.id];
    const noticeTiming = integrityNoticeTiming(currentQ);
    const tags = inferKnowledgeTags(currentQ, paperData.level);
    // Answer and explanation are verified independently — see verificationModel.
    const verification = resolveVerification(paperData);
    const answerVerified = verification.dimensions.answer === 'verified';
    const explanationVerified = verification.dimensions.explanation === 'verified';
    // Show the authored explanation whenever one exists; verification status only
    // drives the trust notice. The generic hint is for questions with no explanation.
    const useGenericHint = selectAnalysisView(currentQ, paperData.level).mode === 'generic';
    const isProgramming = isProgrammingQuestion(currentQ);
    const syntheticLuoguCoding = currentQ?.type === 'coding' && !currentQ.description && Boolean(currentQ.explanation);
    const luoguUrl = isProgramming ? getLuoguProblemUrl(paperId, currentQ.id) : null;
    const hasAuthoredSolution = !syntheticLuoguCoding && Boolean(currentQ?.explanation || currentQ?.referenceCode);

    return (
        <div className="mw-surface mw-line-bank min-h-screen bg-slate-100">
            <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
                <div className="h-1 w-full bg-[var(--mw-line)]" />
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
                        type="button"
                        onClick={resetAll}
                        className="min-h-11 px-3 py-2 rounded-lg text-sm border border-slate-200 hover:bg-slate-50 flex items-center gap-1"
                    >
                        <RotateCcw size={14} /> 重置进度
                    </button>
                </div>

                <div className="max-w-6xl mx-auto px-4 pb-4 grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
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
                    <div className="col-span-2 md:col-span-4">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                            <div className="bg-indigo-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto grid grid-cols-[minmax(0,1fr)] md:grid-cols-[240px_minmax(0,1fr)] gap-4 p-4">
                <aside className="min-w-0 bg-white rounded-xl border border-slate-200 p-3 h-fit">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                        <ClipboardList size={15} /> 题号导航
                    </div>
                    <div className="grid grid-cols-6 md:grid-cols-4 gap-1.5 md:gap-2">
                        {questions.map((q, idx) => {
                            const isCurrent = idx === currentQuestionIndex;
                            const navStatus = getQuestionNavStatus({
                                q,
                                answer: answers[q.id],
                                revealed: !!revealed[q.id],
                                isCurrent,
                                questionNumber: idx + 1,
                            });
                            return (
                                <button
                                    key={q.id}
                                    aria-label={navStatus.ariaLabel}
                                    aria-current={isCurrent ? 'step' : undefined}
                                    onClick={() => {
                                        setCurrentQuestionIndex(idx);
                                        setActiveTab('practice');
                                    }}
                                    className={`h-11 md:h-auto md:aspect-square rounded-lg border text-sm font-semibold ${navStatus.className}`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                <section className="min-w-0 space-y-4">
                    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-8">
                        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                            <div className="whitespace-nowrap text-sm text-slate-500">第 {currentQuestionIndex + 1} 题 / 共 {questions.length} 题</div>
                            <div className="inline-flex bg-slate-100 rounded-lg p-1">
                                <button
                                    onClick={() => setActiveTab('practice')}
                                    className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${activeTab === 'practice' ? 'bg-white shadow text-slate-800' : 'text-slate-600'}`}
                                >
                                    <span className="inline-flex items-center gap-1"><BookOpen size={14} /> 作答</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('analysis')}
                                    className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${activeTab === 'analysis' ? 'bg-white shadow text-slate-800' : 'text-slate-600'}`}
                                >
                                    <span className="inline-flex items-center gap-1"><Lightbulb size={14} /> 解析</span>
                                </button>
                                <button
                                    onClick={() => setActiveTab('knowledge')}
                                    className={`px-3 py-1.5 rounded-md text-sm whitespace-nowrap ${activeTab === 'knowledge' ? 'bg-white shadow text-slate-800' : 'text-slate-600'}`}
                                >
                                    <span className="inline-flex items-center gap-1"><BrainCircuit size={14} /> 知识点</span>
                                </button>
                            </div>
                        </div>

                        {noticeTiming === 'legacy' && (
                            <div className="mb-4">
                                <SourceIntegrityNotice status={currentQ.sourceIntegrity} note={currentQ.integrityNote} />
                            </div>
                        )}

                        {noticeTiming === 'after' && isRevealed && (
                            <div className="mb-4">
                                <SourceIntegrityNotice
                                    status={currentQ.sourceIntegrity}
                                    note={currentQ.integrityNote}
                                    defectKind={currentQ.defectKind}
                                    examScoring={currentQ.examScoring}
                                />
                            </div>
                        )}

                        {noticeTiming === 'after' && !isRevealed && currentQ.examScoring === 'excluded' && (
                            <div className="mb-4 text-xs text-slate-500">
                                本题为原卷缺陷题，查看答案后会说明详情
                            </div>
                        )}

                        {!isProgrammingQuestion(currentQ) && (
                            <div className="question-stem mb-6">
                                <span className="question-number">{currentQuestionIndex + 1}.</span>
                                <MarkdownRenderer content={stripLeadingNumber(getQuestionContent(currentQ))} />
                            </div>
                        )}

                        {activeTab === 'practice' && (
                            <div className="space-y-3">
                                {isProgrammingQuestion(currentQ) ? (
                                    <CodingProblemView
                                        q={currentQ}
                                        questionNumber={currentQuestionIndex + 1}
                                        luoguUrl={getLuoguProblemUrl(paperId, currentQ.id)}
                                        onReveal={revealCurrent}
                                    />
                                ) : (
                                    <>
                                        {(currentQ.options || []).map((opt, idx) => {
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
                                                    onClick={() => handleOptionSelect(currentQ, idx)}
                                                    className={`question-option group w-full text-left rounded-xl border px-4 py-3.5 shadow-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 ${optionState}`}
                                                >
                                                    <span className={`option-badge ${badgeState}`}>{String.fromCharCode(65 + idx)}</span>
                                                    <span className="question-option-content">
                                                        <MarkdownRenderer content={formatOptionDisplay(opt)} inline={true} className="text-inherit" />
                                                    </span>
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={revealCurrent}
                                            disabled={(currentQ.type !== 'coding' && currentQ.type !== 'programming') && selected === undefined}
                                            className={`w-full mt-2 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 ${((currentQ.type !== 'coding' && currentQ.type !== 'programming') && selected === undefined) ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                                        >
                                            <CheckCircle2 size={18} /> {(currentQ.type === 'coding' || currentQ.type === 'programming') ? '标记已阅读并查看复盘' : '查看答案与解析'}
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {activeTab === 'analysis' && (
                            <div className={isProgramming ? 'space-y-4' : 'bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-3'}>
                                {isRevealed ? (
                                    <>
                                        <AnalysisTrustNotice
                                            answerVerified={answerVerified}
                                            explanationVerified={explanationVerified}
                                            useGenericHint={useGenericHint}
                                        />
                                        {isProgramming ? (
                                            <div className="space-y-4">
                                                <CodingProblemView
                                                    variant="review"
                                                    q={currentQ}
                                                    questionNumber={currentQuestionIndex + 1}
                                                    luoguUrl={luoguUrl}
                                                />

                                                {syntheticLuoguCoding ? (
                                                    <AnalysisCard icon={Lightbulb} title="题解思路">
                                                        <p className="text-sm leading-6 text-slate-700">
                                                            本题暂无站内题解，可前往
                                                            {luoguUrl ? (
                                                                <a
                                                                    href={luoguUrl}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="mx-1 font-semibold text-slate-900 underline underline-offset-2"
                                                                >
                                                                    洛谷
                                                                </a>
                                                            ) : '洛谷'}
                                                            查看题解。
                                                        </p>
                                                    </AnalysisCard>
                                                ) : currentQ.explanation && (
                                                    <AnalysisCard icon={Lightbulb} title="题解思路">
                                                        <MarkdownRenderer
                                                            content={currentQ.explanation}
                                                            className="text-[15px] font-normal leading-7 text-slate-700 md:text-base"
                                                        />
                                                    </AnalysisCard>
                                                )}

                                                {currentQ.template && (
                                                    <details className="min-w-0 rounded-xl border border-slate-200 bg-white">
                                                        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2.5 px-4 py-3 text-[15px] font-semibold text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-slate-500 md:px-5 md:text-base [&::-webkit-details-marker]:hidden">
                                                            <span
                                                                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
                                                                aria-hidden="true"
                                                            >
                                                                <Code2 size={16} />
                                                            </span>
                                                            代码模板
                                                        </summary>
                                                        <div className="border-t border-slate-100 p-4 md:p-5">
                                                            <CopyableCodeBlock code={currentQ.template} label="代码模板" ariaLabel="复制代码模板" />
                                                        </div>
                                                    </details>
                                                )}

                                                {currentQ.referenceCode && (
                                                    <AnalysisCard icon={Code2} title="参考代码">
                                                        <p className="mb-3 text-sm leading-6 text-slate-600">建议自己写完再对照。</p>
                                                        <CopyableCodeBlock code={currentQ.referenceCode} label="参考代码" ariaLabel="复制参考代码" />
                                                    </AnalysisCard>
                                                )}

                                                {!hasAuthoredSolution && (
                                                    <AnalysisCard icon={Lightbulb} title="通用做题步骤" tone="amber">
                                                        <p className="mb-3 text-sm font-semibold text-amber-800">通用提示，不针对本题</p>
                                                        <ol className="list-decimal space-y-1 pl-5 text-base leading-7 text-slate-700">
                                                            {GENERIC_CODING_STEPS.map((step) => <li key={step}>{step}</li>)}
                                                        </ol>
                                                        <p className="mt-4 text-sm font-semibold text-slate-700">常见易错点</p>
                                                        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-slate-700">
                                                            {GENERIC_CODING_PITFALLS.map((it) => <li key={it}>{it}</li>)}
                                                        </ul>
                                                    </AnalysisCard>
                                                )}
                                            </div>
                                        ) : (
                                            <AnswerReview
                                                q={currentQ}
                                                level={paperData.level}
                                                given={answers[currentQ.id]}
                                                answerVerified={answerVerified}
                                                explanationVerified={explanationVerified}
                                                showTrustNotice={false}
                                            />
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                            {tags.map((tag) => (
                                                <span key={tag} className={`text-xs px-2 py-1 rounded-full bg-white border border-slate-200 text-slate-600`}>#{tag}</span>
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
