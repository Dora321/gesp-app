import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, RefreshCw, BookOpen, CheckCircle2, Lightbulb, RotateCcw, Tags } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import useQuestionKeyboardNavigation from '../../hooks/useQuestionKeyboardNavigation';
import AnswerReview from './AnswerReview';
import useAnalysisSession from '../../hooks/useAnalysisSession';
import { RESET_ANALYSIS_CONFIRM } from '../../utils/analysisProgress';
import { resolveVerification } from '../../data/gesp/verificationModel';
import SourceIntegrityNotice from '../../components/SourceIntegrityNotice';
import { integrityNoticeTiming } from '../../utils/sourceIntegrity';
import { buildQuestionContent as getQuestionContent, formatOptionDisplay, stripLeadingNumber } from '../../utils/questionTextFormatting';
import { getQuestionNavStatus } from '../../utils/questionNavStatus';
import { navigateBack } from '../../utils/navigateBack';

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

// 虚拟卷（考点练习、只练错题）里的题都带着来源卷号和原题号，对错按原题记进错题本。
const sourceOf = (q) => (q?.sourcePaperId && q.sourceQuestionId !== undefined
    ? { paperId: q.sourcePaperId, questionId: q.sourceQuestionId }
    : null);

/**
 * storageKey：作答进度存在 learningData.analysis 的哪个键下；传 null 表示每次重新做（只练错题）。
 */
export default function InteractiveAnalysisPage({ paperData, paperId, storageKey = paperId, backLabel = '返回', onBack }) {
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
    const [mobileNavOpen, setMobileNavOpen] = useState(false);
    const {
        answers,
        revealed,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        selectOption,
        reveal,
        reset,
    } = useAnalysisSession({ storageKey, questions, mistakeSource: sourceOf, trackSignature: true });

    const currentQ = questions[currentQuestionIndex] || questions[0] || null;

    const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
    const revealedCount = useMemo(() => Object.keys(revealed).length, [revealed]);
    const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;

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

    const goToPreviousQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
        setActiveTab('practice');
    }, [setCurrentQuestionIndex]);

    const goToNextQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1));
        setActiveTab('practice');
    }, [questions.length, setCurrentQuestionIndex]);

    useQuestionKeyboardNavigation({
        questionCount: questions.length,
        onPrevious: goToPreviousQuestion,
        onNext: goToNextQuestion
    });

    if (!paperData || !questions.length) {
        return (
            <div className="mw-surface mw-line-bank min-h-screen bg-slate-50 flex items-center justify-center p-6">
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
    const noticeTiming = integrityNoticeTiming(currentQ);
    // Answer and explanation are verified independently — a checked answer key
    // does not make the site-written explanation a verified one.
    const verification = resolveVerification(paperData);
    const answerVerified = verification.dimensions.answer === 'verified';
    const explanationVerified = verification.dimensions.explanation === 'verified';
    // Show the authored explanation whenever one exists; verification status only
    // drives the trust notice. The generic hint is for questions with no explanation.
    const backFallback = paperData.level ? `/question-bank/topics/${paperData.level}` : '/question-bank';

    return (
        <div className="mw-surface mw-line-bank min-h-screen bg-slate-100">
            <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
                    <button type="button" onClick={onBack || (() => navigateBack(navigate, backFallback))} className="min-h-11 min-w-11 inline-flex items-center justify-center rounded-lg hover:bg-slate-100" aria-label={backLabel}>
                        <ChevronLeft size={18} />
                    </button>
                    <div className="flex-1 min-w-0">
                        <h1 className="font-bold text-slate-800 truncate">{paperData.title}</h1>
                        <div className="text-xs text-slate-500">解析模式 · Level {paperData.level}</div>
                    </div>
                    <button type="button" onClick={resetAll} className="min-h-11 px-3 py-2 rounded-lg text-sm border border-slate-200 hover:bg-slate-50 flex items-center gap-1">
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

            <main className="max-w-6xl mx-auto grid grid-cols-[minmax(0,1fr)] md:grid-cols-[220px_minmax(0,1fr)] gap-4 p-4">
                <aside className="min-w-0 bg-white rounded-xl border border-slate-200 p-3 h-fit">
                    <button
                        type="button"
                        onClick={() => setMobileNavOpen(open => !open)}
                        aria-expanded={mobileNavOpen}
                        aria-controls="analysis-question-nav"
                        className="flex min-h-11 w-full items-center justify-between rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm font-semibold text-slate-700 md:hidden"
                    >
                        <span>题号 ({currentQuestionIndex + 1}/{questions.length})</span>
                        {mobileNavOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <div className="mb-3 hidden text-sm font-semibold text-slate-700 md:block">题号导航</div>
                    <div
                        id="analysis-question-nav"
                        className={`${mobileNavOpen ? 'grid' : 'hidden'} mt-2 grid-cols-5 gap-2 md:mt-0 md:grid md:grid-cols-4`}
                    >
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
                                        setMobileNavOpen(false);
                                    }}
                                    className={`aspect-square rounded-lg border text-sm font-semibold ${navStatus.className}`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                <section className="min-w-0 space-y-4">
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

                        <div className="question-stem mb-6">
                            <span className="question-number">{currentQuestionIndex + 1}.</span>
                            <MarkdownRenderer content={stripLeadingNumber(getQuestionContent(currentQ))} />
                        </div>

                        {activeTab === 'practice' ? (
                            <div className="space-y-3">
                                {currentQ.options.map((opt, idx) => {
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
                                        <AnswerReview
                                            q={currentQ}
                                            level={paperData.level}
                                            given={answers[currentQ.id]}
                                            answerVerified={answerVerified}
                                            explanationVerified={explanationVerified}
                                        />

                                        <div className="flex flex-wrap gap-2">
                                            {inferTags(currentQ).map(tag => (
                                                <span key={tag} className="text-xs px-2 py-1 rounded-full bg-white border border-blue-200 text-blue-700">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-slate-600 flex items-center gap-2"><RefreshCw size={14} /> 先在「作答」标签中选择答案。</p>
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
