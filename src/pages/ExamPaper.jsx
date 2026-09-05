import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, AlertTriangle, FileText, Lightbulb, BookOpen, Menu, RotateCcw } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';
import { getPaper, paperMeta } from '../data/gesp/index';
import useQuestionKeyboardNavigation from '../hooks/useQuestionKeyboardNavigation';
import { isProgrammingQuestion, PROGRAMMING_ACK } from '../utils/questionHelpers';
import { scoreExam } from '../utils/examScoring';
import { loadExamProgress, saveExamProgress, clearExamProgress, hasResumableProgress } from '../utils/examProgress';
import { recordExamAttempt } from '../utils/examHistory';
import QuestionSidebar from './exam/QuestionSidebar';
import SubmitConfirmDialog from './exam/SubmitConfirmDialog';
import ResultDialog from './exam/ResultDialog';

const EnhancedPaperPage = lazy(() => import('./question-bank/EnhancedPaperPage'));
const ExamModeView = lazy(() => import('./exam/ExamModeView'));

// ─── State Container ────────────────────────────────────────────────

const ExamPaper = () => {
  const { paperId } = useParams();
  const navigate = useNavigate();

  // Core state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [mode, setMode] = useState(null);

  // Paper data
  const [paperData, setPaperData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [savedProgress, setSavedProgress] = useState(null);

  // ─── Data Loading ──────────────────────────────────────────────────

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
        setSavedProgress(loadExamProgress(paperId));
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

  // Reset on paperId change
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setAnswers({});
    setIsSubmitted(false);
    setShowResult(false);
    setShowSidebar(false);
    setShowSubmitConfirm(false);
    setMode(null);
  }, [paperId]);

  // Timer
  useEffect(() => {
    if (isSubmitted || !paperData || mode !== 'exam') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev <= 0 ? 0 : prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted, paperData, mode]);

  // Persist exam progress so an accidental refresh / tab close doesn't wipe
  // answers and the clock mid-paper. Only saves while actively in exam mode.
  useEffect(() => {
    if (mode !== 'exam' || !paperData) return;
    saveExamProgress(paperId, { answers, timeLeft, currentQuestionIndex, isSubmitted });
  }, [mode, paperData, paperId, answers, timeLeft, currentQuestionIndex, isSubmitted]);

  // ─── Derived Values ────────────────────────────────────────────────

  const allQuestions = paperData ? [
    ...(paperData.questions || []),
    ...(paperData.programmingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' })),
    ...(paperData.codingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' })),
  ].sort((a, b) => Number(a.id) - Number(b.id)) : [];
  const questionCount = allQuestions.length;

  const currentQ = allQuestions[currentQuestionIndex] || allQuestions[0] || null;

  const gradableQuestions = allQuestions.filter((question) => !question.sourceIntegrity);
  const answeredCount = gradableQuestions.filter((question) => answers[question.id] !== undefined).length;
  const unansweredCount = Math.max(gradableQuestions.length - answeredCount, 0);
  const progress = gradableQuestions.length ? (answeredCount / gradableQuestions.length) * 100 : 0;
  const {
    objectiveScore,
    objectiveScoreTotal,
    objectiveCorrectCount,
    objectiveWrongCount,
    programmingMarkedCount,
    excludedObjectiveCount,
  } = scoreExam(allQuestions, answers);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // ─── Handlers ──────────────────────────────────────────────────────

  const handleOptionSelect = (qId, optionIdx) => {
    if (isSubmitted || currentQ?.sourceIntegrity || isProgrammingQuestion(currentQ)) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleProgrammingMark = () => {
    if (isSubmitted || !currentQ || !isProgrammingQuestion(currentQ)) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: PROGRAMMING_ACK }));
  };

  // 交卷即落盘一条成绩快照。ResultDialog 关掉之后，这是学生唯一能回看
  // 「这次考了多少、错在哪几题」的地方。
  const handleSubmit = () => {
    recordExamAttempt(paperId, {
      questions: allQuestions,
      answers,
      elapsedSeconds: (paperData?.timeLimit || 90 * 60) - timeLeft,
    });
    setIsSubmitted(true);
    setShowResult(true);
    setShowSubmitConfirm(false);
  };

  // Navigation
  const goToPrevious = useCallback(() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1)), []);
  const goToNext = useCallback(() => setCurrentQuestionIndex(prev => Math.min(questionCount - 1, prev + 1)), [questionCount]);

  useQuestionKeyboardNavigation({
    enabled: mode === 'exam' && !showSubmitConfirm && !showResult,
    questionCount: allQuestions.length,
    onPrevious: goToPrevious,
    onNext: goToNext,
  });

  // ─── Loading / Error States ────────────────────────────────────────

  if (loading) return <LoadingScreen message="正在加载试卷" variant="dark" />;

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
          <button onClick={() => navigate(-1)} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">返回</button>
        </div>
      </div>
    );
  }

  // ─── Mode Selection ────────────────────────────────────────────────

  if (mode === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{paperData.title}</h1>
            <p className="text-indigo-200">请选择练习模式</p>
          </div>
          {hasResumableProgress(savedProgress) && (
            <button
              onClick={() => {
                setAnswers(savedProgress.answers || {});
                setTimeLeft(typeof savedProgress.timeLeft === 'number' ? savedProgress.timeLeft : (paperData.timeLimit || 90 * 60));
                setCurrentQuestionIndex(savedProgress.currentQuestionIndex || 0);
                setIsSubmitted(Boolean(savedProgress.isSubmitted));
                setMode('exam');
              }}
              className="w-full mb-6 flex items-center justify-between gap-4 bg-amber-400/10 border border-amber-300/40 rounded-2xl p-5 text-left hover:bg-amber-400/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <RotateCcw className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">继续上次练习</h3>
                  <p className="text-amber-100/80 text-sm">剩余 {formatTime(savedProgress.timeLeft || 0)} · 已答 {Object.keys(savedProgress.answers || {}).length} 题</p>
                </div>
              </div>
              <ChevronRight className="text-amber-200 group-hover:translate-x-1 transition-transform" size={22} />
            </button>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => { clearExamProgress(paperId); setSavedProgress(null); setAnswers({}); setIsSubmitted(false); setCurrentQuestionIndex(0); setTimeLeft(paperData.timeLimit || 90 * 60); setMode('exam'); }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left hover:bg-white/20 hover:border-indigo-400 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">考试模式</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">计时整卷练习，客观题自动判分，编程题保留题面与手动完成标记。</p>
              <div className="mt-4 flex items-center gap-2 text-indigo-300 text-xs"><Clock size={14} /> 90分钟计时</div>
            </button>
            <button onClick={() => { setCurrentQuestionIndex(0); setMode('analysis'); }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left hover:bg-white/20 hover:border-green-400 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">解析模式</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">每做完一题即可查看答案和解析。适合学习和查漏补缺。</p>
              <div className="mt-4 flex items-center gap-2 text-green-300 text-xs"><BookOpen size={14} /> 无时间限制</div>
            </button>
          </div>
          <button onClick={() => navigate(-1)} className="mt-8 w-full py-3 text-indigo-300 hover:text-white transition-colors text-sm">返回题库</button>
        </div>
      </div>
    );
  }

  // ─── Analysis Mode ─────────────────────────────────────────────────

  if (mode === 'analysis') {
    return (
      <Suspense fallback={<LoadingScreen message="正在加载解析" variant="dark" />}>
        <EnhancedPaperPage />
      </Suspense>
    );
  }

  // ─── Exam Mode (main) ─────────────────────────────────────────────

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
      {/* Header */}
      <header className="bg-white border-b border-slate-200 h-16 px-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="h-11 w-11 min-w-11 shrink-0 inline-flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600"
            aria-label="返回题库"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="font-bold text-slate-800 hidden md:block">{paperData.title}</h1>
          <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-mono font-bold">等级 {paperData.level}</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">考试模式</span>
          <span className="hidden lg:inline text-xs text-slate-500">客观题自动判分，编程题需手动完成</span>
          <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-slate-700'}`}>
            <Clock size={20} /> {formatTime(timeLeft)}
          </div>
          <button onClick={() => setShowSubmitConfirm(true)} disabled={isSubmitted}
            className={`px-6 py-2 rounded-full font-bold text-sm transition-all shadow-md ${isSubmitted ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200'}`}>
            {isSubmitted ? '已交卷' : '现在交卷'}
          </button>
          <button
            type="button"
            className="md:hidden h-11 w-11 min-w-11 shrink-0 inline-flex items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100"
            onClick={() => setShowSidebar(!showSidebar)}
            aria-label={showSidebar ? '关闭题号面板' : '打开题号面板'}
            aria-expanded={showSidebar}
          >
            <Menu />
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        <QuestionSidebar
          questions={allQuestions}
          answers={answers}
          currentQuestionIndex={currentQuestionIndex}
          isSubmitted={isSubmitted}
          showSidebar={showSidebar}
          answeredCount={answeredCount}
          progress={progress}
          onQuestionSelect={(idx) => { setCurrentQuestionIndex(idx); setShowSidebar(false); }}
          onClose={() => setShowSidebar(false)}
        />

        <Suspense fallback={<LoadingScreen message="正在加载题目" />}>
          <ExamModeView
            currentQ={currentQ}
            currentQuestionIndex={currentQuestionIndex}
            questions={allQuestions}
            answers={answers}
            isSubmitted={isSubmitted}
            paperId={paperId}
            onOptionSelect={handleOptionSelect}
            onProgrammingMark={handleProgrammingMark}
            onPrev={goToPrevious}
            onNext={goToNext}
          />
        </Suspense>
      </div>

      {/* Dialogs */}
      {showSubmitConfirm && (
        <SubmitConfirmDialog
          answeredCount={answeredCount}
          unansweredCount={unansweredCount}
          programmingMarkedCount={programmingMarkedCount}
          excludedObjectiveCount={excludedObjectiveCount}
          onCancel={() => setShowSubmitConfirm(false)}
          onConfirm={handleSubmit}
        />
      )}

      {showResult && (
        <ResultDialog
          objectiveScore={objectiveScore}
          objectiveScoreTotal={objectiveScoreTotal}
          timeElapsed={(paperData?.timeLimit || 90 * 60) - timeLeft}
          objectiveCorrectCount={objectiveCorrectCount}
          objectiveWrongCount={objectiveWrongCount}
          programmingMarkedCount={programmingMarkedCount}
          excludedObjectiveCount={excludedObjectiveCount}
          onViewAnalysis={() => setShowResult(false)}
          onBackToBank={() => navigate('/question-bank')}
          onOpenReview={() => navigate('/question-bank/review')}
        />
      )}
    </div>
  );
};

export default ExamPaper;
