import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, CheckCircle, AlertTriangle, X, ChevronRight, Menu, Trophy, BookOpen, FileText, Lightbulb } from 'lucide-react';
import { getPaper, paperMeta } from '../data/gesp/index';
import { paperCodingMap } from '../data/gesp/paperCodingMap';
import InteractiveAnalysisPage from './question-bank/InteractiveAnalysisPage';
import { getEnhancedPaperComponent } from './question-bank/enhancedPaperRegistry';
import MarkdownRenderer from '../components/MarkdownRenderer';

const PROGRAMMING_ACK = '__programming_acknowledged__';

const isProgrammingQuestion = (q) => q?.type === 'programming' || q?.type === 'coding';

const buildProgrammingStatementMarkdown = (q) => {
    if (!q) return '';
    if (q.type === 'coding' && !q.description && q.explanation) return q.explanation;

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

    if (sections.length === 0) {
        return q.question || q.explanation || '';
    }

    return sections.join('\n\n');
};

const ExamPaper = () => {
    const { paperId } = useParams();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(90 * 60);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
    const [mode, setMode] = useState(null); // 'exam' | 'analysis'

    // Async paper loading
    const [paperData, setPaperData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const EnhancedPaperComponent = getEnhancedPaperComponent(paperId);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError(null);
        setPaperData(null);
        getPaper(paperId).then(data => {
            if (cancelled) return;
            if (data) {
                setPaperData(data);
                setTimeLeft(data.timeLimit || 90 * 60);
            } else {
                setError('在此题库中未找到该试卷 (Registry Lookup Failed)');
            }
            setLoading(false);
        }).catch(err => {
            if (cancelled) return;
            setError('加载试卷失败: ' + (err.message || err));
            setLoading(false);
        });
        return () => { cancelled = true; };
    }, [paperId]);

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setIsSubmitted(false);
        setShowResult(false);
        setShowSidebar(false);
        setShowSubmitConfirm(false);
        setMode(null);
    }, [paperId]);

    useEffect(() => {
        if (isSubmitted || !paperData || mode !== 'exam') return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [isSubmitted, paperData, mode]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <p>正在加载试卷...</p>
                </div>
            </div>
        );
    }

    if (error || !paperData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <div className="text-center max-w-lg p-6">
                    <AlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
                    <h2 className="text-xl font-bold text-slate-700">无法加载试卷</h2>
                    <p className="mb-4">{error || '未找到该试卷数据'}</p>

                    <div className="text-left bg-slate-100 p-4 rounded-lg text-xs font-mono mb-6 overflow-auto max-h-40">
                        <p><strong>Debug Info:</strong></p>
                        <p>Paper ID: {paperId}</p>
                        <p>Available: {paperMeta[paperId] ? 'Yes (in meta)' : 'No'}</p>
                    </div>

                    <button onClick={() => navigate(-1)} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
                        返回
                    </button>
                </div>
            </div>
        );
    }

    const allQuestions = [
        ...(paperData.questions || []),
        ...(paperData.programmingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' })),
        ...(paperData.codingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' }))
    ].sort((a, b) => Number(a.id) - Number(b.id));
    const objectiveQuestions = allQuestions.filter((q) => q && !isProgrammingQuestion(q));
    const programmingQuestions = allQuestions.filter((q) => isProgrammingQuestion(q));
    const questions = allQuestions;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const stripLeadingNumber = (questionText) => {
        if (typeof questionText !== 'string') return questionText || '';
        return questionText.replace(/^\s*\d+[.。、]\s*/, '');
    };

    const getQuestionContent = (q) => {
        if (!q) return '';
        return q.question || q.description || q.summary || q.title || '';
    };

    const handleOptionSelect = (qId, optionIdx) => {
        if (isSubmitted || isProgrammingQuestion(currentQ)) return;
        setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    };

    const markProgrammingQuestion = () => {
        if (isSubmitted || !currentQ || !isProgrammingQuestion(currentQ)) return;
        setAnswers((prev) => ({ ...prev, [currentQ.id]: PROGRAMMING_ACK }));
    };

    const calculateObjectiveScore = () => {
        let total = 0;
        objectiveQuestions.forEach(q => {
            if (answers[q.id] === q.answer) total += q.score;
        });
        return total;
    };

    const objectiveScoreTotal = objectiveQuestions.reduce((sum, q) => sum + (q.score || 0), 0);

    const handleSubmit = () => setShowSubmitConfirm(true);

    const confirmSubmitExam = () => {
        setIsSubmitted(true);
        setShowResult(true);
        setShowSubmitConfirm(false);
    };

    const currentQ = questions[currentQuestionIndex] || questions[0] || null;
    const answeredCount = Object.keys(answers).length;
    const unansweredCount = Math.max(questions.length - answeredCount, 0);
    const progress = questions.length ? (answeredCount / questions.length) * 100 : 0;
    const programmingMarkedCount = programmingQuestions.filter((q) => answers[q.id] !== undefined).length;
    const objectiveCorrectCount = objectiveQuestions.filter((q) => answers[q.id] === q.answer).length;
    const objectiveWrongCount = objectiveQuestions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.answer).length;
    const isReformed = isProgrammingQuestion(currentQ) && getQuestionContent(currentQ).trim().startsWith('# ');
    const currentProgrammingMarkdown = isProgrammingQuestion(currentQ) ? buildProgrammingStatementMarkdown(currentQ) : '';

    if (mode === null) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
                <div className="max-w-2xl w-full">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">{paperData.title}</h1>
                        <p className="text-indigo-200">请选择练习模式</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <button
                            onClick={() => {
                                setCurrentQuestionIndex(0);
                                setTimeLeft(paperData.timeLimit || 90 * 60);
                                setMode('exam');
                            }}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left hover:bg-white/20 hover:border-indigo-400 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="text-white" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">考试模式</h3>
                            <p className="text-indigo-200 text-sm leading-relaxed">计时整卷练习，客观题自动判分，编程题保留题面与手动完成标记。</p>
                            <div className="mt-4 flex items-center gap-2 text-indigo-300 text-xs"><Clock size={14} /> 90分钟计时</div>
                        </button>

                        <button
                            onClick={() => {
                                setCurrentQuestionIndex(0);
                                setMode('analysis');
                            }}
                            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left hover:bg-white/20 hover:border-green-400 transition-all group"
                        >
                            <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Lightbulb className="text-white" size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">解析模式</h3>
                            <p className="text-indigo-200 text-sm leading-relaxed">每做完一题即可查看答案和解析。适合学习和查漏补缺。</p>
                            <div className="mt-4 flex items-center gap-2 text-green-300 text-xs"><BookOpen size={14} /> 无时间限制</div>
                        </button>
                    </div>

                    <button onClick={() => navigate(-1)} className="mt-8 w-full py-3 text-indigo-300 hover:text-white transition-colors text-sm">
                        返回题库
                    </button>
                </div>
            </div>
        );
    }

    if (mode === 'analysis') {
        if (EnhancedPaperComponent) return <EnhancedPaperComponent />;
        return <InteractiveAnalysisPage paperData={paperData} paperId={paperId} />;
    }

    if (!currentQ) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <div className="text-center max-w-lg p-6">
                    <AlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
                    <h2 className="text-xl font-bold text-slate-700">试卷数据不可用</h2>
                    <p className="mb-4">未找到当前题目，请返回题库后重试。</p>
                    <div className="flex gap-3 justify-center">
                        <button onClick={() => setMode('analysis')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">进入解析模式</button>
                        <button onClick={() => setMode(null)} className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg">返回</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
            <header className="bg-white border-b border-slate-200 h-16 px-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-100 rounded-lg text-slate-500"><ChevronLeft size={20} /></button>
                    <h1 className="font-bold text-slate-800 hidden md:block">{paperData.title}</h1>
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-mono font-bold">等级 {paperData.level}</span>
                </div>

                <div className="flex items-center gap-6">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">考试模式</span>
                    <span className="hidden lg:inline text-xs text-slate-500">客观题自动判分，编程题需手动完成</span>
                    <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
                        <Clock size={20} />
                        {formatTime(timeLeft)}
                    </div>
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitted}
                        className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-md ${isSubmitted ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200'}`}
                    >
                        {isSubmitted ? '已交卷' : '现在交卷'}
                    </button>
                    <button className="md:hidden p-2" onClick={() => setShowSidebar(!showSidebar)}><Menu /></button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                <aside className={`w-72 bg-white border-r border-slate-200 flex flex-col z-20 transition-transform duration-300 absolute h-full md:relative ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                    <div className="p-4 border-b border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-bold text-slate-700">题号面板</div>
                            <button className="md:hidden text-xs px-2 py-1 rounded bg-slate-100 text-slate-600" onClick={() => setShowSidebar(false)}>收起</button>
                        </div>
                        <div className="text-sm font-bold text-slate-700 mb-2">答题进度</div>
                        <div className="w-full bg-slate-100 rounded-full h-2 mb-1"><div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div></div>
                        <div className="text-xs text-slate-400 text-right">{answeredCount} / {questions.length}</div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="grid grid-cols-5 gap-2">
                            {questions.map((q, idx) => {
                                const isAnswered = answers[q.id] !== undefined;
                                const isCurrent = idx === currentQuestionIndex;
                                const isProgramming = isProgrammingQuestion(q);
                                let statusColor = 'bg-white border-slate-200 text-slate-600';
                                if (isSubmitted) {
                                    if (isProgramming) {
                                        statusColor = isAnswered ? 'bg-violet-100 border-violet-300 text-violet-700' : 'bg-slate-100 border-slate-200 text-slate-400';
                                    } else {
                                        const isCorrect = answers[q.id] === q.answer;
                                        statusColor = isCorrect ? 'bg-green-100 border-green-300 text-green-700' : answers[q.id] !== undefined ? 'bg-red-100 border-red-300 text-red-700' : 'bg-slate-100 border-slate-200 text-slate-400';
                                    }
                                } else {
                                    if (isCurrent) statusColor = 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105';
                                    else if (isAnswered) statusColor = 'bg-blue-50 border-blue-200 text-blue-600';
                                }
                                return (
                                    <button
                                        key={q.id}
                                        onClick={() => {
                                            setCurrentQuestionIndex(idx);
                                            setShowSidebar(false);
                                        }}
                                        className={`relative aspect-square rounded-lg border flex items-center justify-center text-sm font-semibold transition-all ${statusColor}`}
                                    >
                                        {idx + 1}
                                        {isCurrent && <span className="absolute top-1 right-1 text-[10px]">•</span>}
                                        {!isCurrent && isAnswered && <span className="absolute top-1 right-1 text-[10px]">✔︎</span>}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </aside>

                {showSidebar && <div className="fixed inset-0 bg-black/50 z-10 md:hidden" onClick={() => setShowSidebar(false)} />}

                <main className="flex-1 overflow-y-auto p-4 md:p-8">
                    <div className="max-w-3xl mx-auto space-y-8">
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 animate-fade-in relative overflow-hidden">
                            <div className="absolute top-0 left-0 bg-slate-100 px-4 py-1.5 rounded-br-xl text-xs font-bold text-slate-500 uppercase tracking-wider">
                                {isProgrammingQuestion(currentQ) ? '编程题' : currentQ.type === 'single' ? '单选题' : '判断题'} • {currentQ.score}分
                            </div>

                            {!(isProgrammingQuestion(currentQ) && (getQuestionContent(currentQ) === currentProgrammingMarkdown || isReformed)) && (
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-6 mb-8 leading-relaxed">
                                    <span className="text-blue-500 mr-2">{currentQuestionIndex + 1}.</span>
                                    <MarkdownRenderer content={stripLeadingNumber(getQuestionContent(currentQ))} className="inline-markdown" inline={true} />
                                </h2>
                            )}
                            {isProgrammingQuestion(currentQ) && (getQuestionContent(currentQ) === currentProgrammingMarkdown || isReformed) && (
                                <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-6 mb-2 leading-relaxed">
                                    <span className="text-blue-500 mr-2">第 {currentQuestionIndex + 1} 题</span>
                                </h2>
                            )}

                            {isProgrammingQuestion(currentQ) ? (
                                <div className="space-y-4">
                                    <div className="luogu-problem">
                                        <div className="problem-header">
                                            <span className="problem-tag">上机编程</span>
                                            <span className="problem-title">第 {currentQuestionIndex + 1} 题</span>
                                        </div>
                                        <div className="problem-content">
                                            <MarkdownRenderer content={isReformed ? getQuestionContent(currentQ) : currentProgrammingMarkdown} />
                                        </div>
                                    </div>
                                    <a
                                        href={(() => {
                                            const mapped = paperCodingMap[paperId] || {};
                                            const qKey = `q${currentQ.id}`;
                                            const pid = mapped[qKey];
                                            if (pid && !pid.startsWith('P0000')) return `https://www.luogu.com.cn/problem/${pid}`;
                                            return null;
                                        })() || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${
                                            (() => {
                                                const mapped = paperCodingMap[paperId] || {};
                                                const pid = mapped[`q${currentQ.id}`];
                                                return pid && !pid.startsWith('P0000');
                                            })() ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-slate-200 text-slate-400 cursor-not-allowed pointer-events-none'
                                        }`}
                                    >
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                                        前往洛谷提交代码
                                    </a>
                                    <button
                                        onClick={markProgrammingQuestion}
                                        disabled={isSubmitted}
                                        className={`w-full py-3 rounded-xl font-bold transition-colors ${answers[currentQ.id] !== undefined ? 'bg-violet-100 text-violet-700 border border-violet-200' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
                                    >
                                        {answers[currentQ.id] !== undefined ? '已标记为完成/已阅读' : '标记为已完成或已阅读'}
                                    </button>
                                    <p className="text-sm text-slate-500">
                                        考试模式下暂不自动判编程题分数，会在交卷结果中单独提示人工评阅。
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {currentQ.options.map((opt, idx) => {
                                        const isSelected = answers[currentQ.id] === idx;
                                        const showAnswer = isSubmitted;
                                        let optionClass = 'hover:border-blue-400 hover:bg-slate-50 cursor-pointer';
                                        if (showAnswer) {
                                            if (idx === currentQ.answer) optionClass = 'bg-green-100 border-green-500 text-green-800 font-bold';
                                            else if (isSelected && idx !== currentQ.answer) optionClass = 'bg-red-100 border-red-500 text-red-800 opacity-60';
                                            else optionClass = 'opacity-50 grayscale cursor-default';
                                        } else if (isSelected) {
                                            optionClass = 'bg-blue-50 border-blue-500 text-blue-800 shadow-sm ring-1 ring-blue-500';
                                        }

                                        return (
                                            <div key={idx} onClick={() => handleOptionSelect(currentQ.id, idx)} className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-lg ${optionClass}`}>
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${isSelected || (showAnswer && idx === currentQ.answer) ? 'border-current' : 'border-slate-300 text-slate-400'}`}>
                                                    {String.fromCharCode(65 + idx)}
                                                </div>
                                                <MarkdownRenderer content={opt} inline={true} className="flex-1" />
                                                {showAnswer && idx === currentQ.answer && <CheckCircle className="ml-auto text-green-600" />}
                                                {showAnswer && isSelected && idx !== currentQ.answer && <X className="ml-auto text-red-500" />}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center">
                            <button
                                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                disabled={currentQuestionIndex === 0}
                                className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50"
                            >
                                上一题
                            </button>

                            <button
                                onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                                className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-all ${currentQuestionIndex === questions.length - 1 ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                            >
                                {currentQuestionIndex === questions.length - 1 ? (isSubmitted ? '查看结果' : '检查交卷') : <>下一题 <ChevronRight size={18} /></>}
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {showSubmitConfirm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
                        <h3 className="text-xl font-bold text-slate-800 mb-2">确认交卷？</h3>
                        <p className="text-sm text-slate-500 mb-4">交卷后将无法修改答案。客观题会自动判分，编程题仅保留完成标记。</p>

                        <div className="grid grid-cols-3 gap-3 mb-6">
                            <div className="bg-blue-50 rounded-lg p-3"><div className="text-xs text-blue-600">已答</div><div className="text-2xl font-bold text-blue-700">{answeredCount}</div></div>
                            <div className="bg-violet-50 rounded-lg p-3"><div className="text-xs text-violet-700">编程已标记</div><div className="text-2xl font-bold text-violet-700">{programmingMarkedCount}</div></div>
                            <div className="bg-amber-50 rounded-lg p-3"><div className="text-xs text-amber-700">未答</div><div className="text-2xl font-bold text-amber-700">{unansweredCount}</div></div>
                        </div>

                        <div className="flex gap-3">
                            <button onClick={() => setShowSubmitConfirm(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">返回继续答题</button>
                            <button onClick={confirmSubmitExam} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">确认交卷</button>
                        </div>
                    </div>
                </div>
            )}

            {showResult && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 text-yellow-500 mb-6 mx-auto"><Trophy size={40} /></div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">考试结束</h2>
                        <p className="text-slate-500 mb-6">已完成整卷练习，以下为客观题自动判分结果</p>
                        <div className="text-6xl font-black text-indigo-600 mb-2 font-mono tracking-tighter">{calculateObjectiveScore()} <span className="text-2xl text-slate-400 font-normal">/ {objectiveScoreTotal}</span></div>
                        <div className="grid grid-cols-4 gap-2 mb-8 mt-6">
                            <div className="bg-slate-50 p-3 rounded-lg"><div className="text-xs text-slate-400 uppercase">用时</div><div className="font-bold text-slate-700 font-mono">{formatTime((paperData?.timeLimit || 90 * 60) - timeLeft)}</div></div>
                            <div className="bg-green-50 p-3 rounded-lg"><div className="text-xs text-green-600 uppercase">客观正确</div><div className="font-bold text-green-700">{objectiveCorrectCount}</div></div>
                            <div className="bg-red-50 p-3 rounded-lg"><div className="text-xs text-red-600 uppercase">客观错误</div><div className="font-bold text-red-700">{objectiveWrongCount}</div></div>
                            <div className="bg-violet-50 p-3 rounded-lg"><div className="text-xs text-violet-700 uppercase">编程已标记</div><div className="font-bold text-violet-700">{programmingMarkedCount}</div></div>
                        </div>
                        <p className="text-sm text-slate-500 mb-6">编程题当前不支持自动判分，请结合解析模式或人工评阅继续复盘。</p>
                        <div className="flex gap-3">
                            <button onClick={() => setShowResult(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">查看解析</button>
                            <button onClick={() => navigate('/question-bank')} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">返回题库</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExamPaper;
