import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, CheckCircle, AlertTriangle, X, ChevronRight, Menu, Trophy, BookOpen, FileText, Lightbulb } from 'lucide-react';
import { paperRegistry } from '../data/gesp/index';
import InteractiveAnalysisPage from './question-bank/InteractiveAnalysisPage';
import { getEnhancedPaperComponent } from './question-bank/enhancedPaperRegistry';

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

    const paperData = paperRegistry[paperId] || null;
    const loading = false;
    const error = paperData ? null : '在此题库中未找到该试卷 (Registry Lookup Failed)';

    useEffect(() => {
        setCurrentQuestionIndex(0);
        setAnswers({});
        setTimeLeft((paperData?.timeLimit) || 90 * 60);
        setIsSubmitted(false);
        setShowResult(false);
        setShowSidebar(false);
        setShowSubmitConfirm(false);
        setMode(null);
    }, [paperId, paperData?.timeLimit]);

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
                        <p>Registry Keys: {Object.keys(paperRegistry).join(', ')}</p>
                    </div>

                    <button onClick={() => navigate(-1)} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">
                        返回
                    </button>
                </div>
            </div>
        );
    }

    const allQuestions = paperData.questions || [];
    const objectiveQuestions = allQuestions.filter((q) => q && q.type !== 'programming');
    const questions = mode === 'exam' ? objectiveQuestions : allQuestions;

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const stripLeadingNumber = (questionText) => {
        if (typeof questionText !== 'string') return questionText;
        return questionText.replace(/^\s*\d+[.。、]\s*/, '');
    };

    const handleOptionSelect = (qId, optionIdx) => {
        if (isSubmitted) return;
        setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
    };

    const calculateScore = () => {
        let total = 0;
        questions.forEach(q => {
            if (answers[q.id] === q.answer) total += q.score;
        });
        return total;
    };

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
                            <p className="text-indigo-200 text-sm leading-relaxed">计时答题，交卷后统一显示得分和答案解析。模拟真实考试环境。</p>
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
        const EnhancedPaperComponent = getEnhancedPaperComponent(paperId);
        if (EnhancedPaperComponent) return <EnhancedPaperComponent />;
        return <InteractiveAnalysisPage paperData={paperData} paperId={paperId} />;
    }

    if (!currentQ || !Array.isArray(currentQ.options)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
                <div className="text-center max-w-lg p-6">
                    <AlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
                    <h2 className="text-xl font-bold text-slate-700">试卷数据暂不兼容考试模式</h2>
                    <p className="mb-4">这份试卷的当前题目不是标准客观题结构，已自动避免白屏。你可以先使用解析模式。</p>
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
                                let statusColor = 'bg-white border-slate-200 text-slate-600';
                                if (isSubmitted) {
                                    const isCorrect = answers[q.id] === q.answer;
                                    statusColor = isCorrect ? 'bg-green-100 border-green-300 text-green-700' : answers[q.id] !== undefined ? 'bg-red-100 border-red-300 text-red-700' : 'bg-slate-100 border-slate-200 text-slate-400';
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
                                {currentQ.type === 'single' ? '单选题' : '判断题'} • {currentQ.score}分
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-6 mb-8 leading-relaxed">
                                <span className="text-blue-500 mr-2">{currentQuestionIndex + 1}.</span>
                                {stripLeadingNumber(currentQ.question)}
                            </h2>

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
                                            <span>{opt}</span>
                                            {showAnswer && idx === currentQ.answer && <CheckCircle className="ml-auto text-green-600" />}
                                            {showAnswer && isSelected && idx !== currentQ.answer && <X className="ml-auto text-red-500" />}
                                        </div>
                                    );
                                })}
                            </div>
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
                        <p className="text-sm text-slate-500 mb-4">交卷后将无法修改答案，请确认后提交。</p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-blue-50 rounded-lg p-3"><div className="text-xs text-blue-600">已答</div><div className="text-2xl font-bold text-blue-700">{answeredCount}</div></div>
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
                        <p className="text-slate-500 mb-6">本次模拟考试您的得分是</p>
                        <div className="text-6xl font-black text-indigo-600 mb-2 font-mono tracking-tighter">{calculateScore()} <span className="text-2xl text-slate-400 font-normal">/ 100</span></div>
                        <div className="grid grid-cols-3 gap-2 mb-8 mt-6">
                            <div className="bg-slate-50 p-3 rounded-lg"><div className="text-xs text-slate-400 uppercase">用时</div><div className="font-bold text-slate-700 font-mono">{formatTime(90 * 60 - timeLeft)}</div></div>
                            <div className="bg-green-50 p-3 rounded-lg"><div className="text-xs text-green-600 uppercase">正确</div><div className="font-bold text-green-700">{questions.filter(q => answers[q.id] === q.answer).length}</div></div>
                            <div className="bg-red-50 p-3 rounded-lg"><div className="text-xs text-red-600 uppercase">错误</div><div className="font-bold text-red-700">{questions.length - questions.filter(q => answers[q.id] === q.answer).length}</div></div>
                        </div>
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
