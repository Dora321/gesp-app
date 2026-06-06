import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, RefreshCw, BookOpen, CheckCircle2, Lightbulb, RotateCcw, Tags } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import useQuestionKeyboardNavigation from '../../hooks/useQuestionKeyboardNavigation';
import { buildRichAnalysis } from './analysisEngine';
import { formatOptionDisplay, stripLeadingNumber } from '../../utils/questionTextFormatting';

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
        setRevealed(prev => ({ ...prev, [qId]: true }));
        setActiveTab('analysis');
    };

    const revealCurrent = () => {
        if (!currentQ) return;
        if (answers[currentQ.id] === undefined) return;
        setRevealed(prev => ({ ...prev, [currentQ.id]: true }));
        setActiveTab('analysis');
    };

    const goToPreviousQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
        setActiveTab('practice');
    }, []);

    const goToNextQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1));
        setActiveTab('practice');
    }, [questions.length]);

    useQuestionKeyboardNavigation({
        questionCount: questions.length,
        onPrevious: goToPreviousQuestion,
        onNext: goToNextQuestion
    });

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

                        <div className="text-lg md:text-xl font-bold text-slate-800 mb-5 leading-relaxed">
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
                                            onClick={() => handleOptionSelect(currentQ.id, idx)}
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
