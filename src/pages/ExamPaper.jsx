import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, AlertTriangle, FileText, Lightbulb, BookOpen, Menu, RotateCcw } from 'lucide-react';
import LoadingScreen from '../components/LoadingScreen';
import { getPaper } from '../data/gesp/index';
import useQuestionKeyboardNavigation from '../hooks/useQuestionKeyboardNavigation';
import useLuoguPool from '../hooks/useLuoguPool';
import { isProgrammingQuestion, PROGRAMMING_ACK } from '../utils/questionHelpers';
import { scoreExam } from '../utils/examScoring';
import { loadExamProgress, saveExamProgress, clearExamProgress, hasResumableProgress } from '../utils/examProgress';
import { recordExamAttempt } from '../utils/examHistory';
import { needsSynthesizedCoding, withSynthesizedCoding } from '../data/gesp/codingQuestions';
import { isHiddenFromMockExam, isScoringExcluded } from '../utils/sourceIntegrity';
import {
  formatClock,
  formatTimeLimitMinutes,
  progressRemainingSeconds,
  remainingSeconds,
  resolveEndsAt,
  resolveTimeLimitSeconds,
} from '../utils/examTimer';
import QuestionSidebar from './exam/QuestionSidebar';
import ExamTimer from './exam/ExamTimer';
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
  // 权威时间是截止时间戳；显示由 ExamTimer 现算，本组件不再每秒重渲染。
  const [endsAt, setEndsAt] = useState(null);
  // 交卷那一刻的剩余秒数（定格显示、算用时）；未交卷时为 null。
  const [submittedRemaining, setSubmittedRemaining] = useState(null);
  const [autoSubmitted, setAutoSubmitted] = useState(false);
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
        setEndsAt(null);
        setSubmittedRemaining(null);
        setAutoSubmitted(false);
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

  // 洛谷题面约 180KB，只在这张卷确实缺上机题时才动态取。两种模式都等它加载完
  // 再渲染（否则考试模式会先显示 25 题、再跳成 27 题），失败时明确提示。
  const timeLimitSeconds = resolveTimeLimitSeconds(paperData);
  const baseQuestions = paperData ? [
    ...(paperData.questions || []),
    ...(paperData.programmingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' })),
    ...(paperData.codingQuestions || []).map(q => ({ ...q, type: q.type || 'programming' })),
  ] : [];
  const luogu = useLuoguPool(paperData?.level, Boolean(paperData) && needsSynthesizedCoding(baseQuestions));
  const luoguPool = luogu.pool;

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

  // Persist exam progress so an accidental refresh / tab close doesn't wipe
  // answers and the clock mid-paper. Only saves while actively in exam mode,
  // and only when something real changes (answers / question / submit) —
  // the clock is a fixed endsAt timestamp, so there is nothing to save per second.
  useEffect(() => {
    if (mode !== 'exam' || !paperData || !Number.isFinite(endsAt)) return;
    saveExamProgress(paperId, { answers, endsAt, currentQuestionIndex, isSubmitted });
  }, [mode, paperData, paperId, answers, endsAt, currentQuestionIndex, isSubmitted]);

  // ─── Derived Values ────────────────────────────────────────────────

  // 四到八级的卷文件没有内嵌上机编程题，而这部分占 GESP 总分一半。解析模式
  // 一直会从洛谷题池补齐第 26、27 题，考试模式却不会——同一张卷在两种模式下
  // 题数不同（25 vs 27），学生在考试模式练的是半张卷还看不出来。
  const allQuestions = paperData ? withSynthesizedCoding(baseQuestions, { paperId, luoguPool }).filter((q) => !isHiddenFromMockExam(q)) : [];
  const questionCount = allQuestions.length;

  const currentQ = allQuestions[currentQuestionIndex] || allQuestions[0] || null;

  const hiddenFromMockCount = baseQuestions.filter(isHiddenFromMockExam).length;
  const gradableQuestions = allQuestions.filter((question) => !isScoringExcluded(question));
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

  // ─── Handlers ──────────────────────────────────────────────────────

  const handleOptionSelect = (qId, optionIdx) => {
    if (isSubmitted || isScoringExcluded(currentQ) || isProgrammingQuestion(currentQ)) return;
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleProgrammingMark = () => {
    if (isSubmitted || !currentQ || !isProgrammingQuestion(currentQ)) return;
    setAnswers(prev => ({ ...prev, [currentQ.id]: PROGRAMMING_ACK }));
  };

  // 交卷即落盘一条成绩快照。ResultDialog 关掉之后，这是学生唯一能回看
  // 「这次考了多少、错在哪几题」的地方。
  const handleSubmit = ({ auto = false } = {}) => {
    if (isSubmitted) return;
    const remaining = remainingSeconds(endsAt);
    recordExamAttempt(paperId, {
      questions: allQuestions,
      answers,
      elapsedSeconds: Math.min(timeLimitSeconds, Math.max(0, timeLimitSeconds - remaining)),
    });
    setSubmittedRemaining(remaining);
    setAutoSubmitted(auto);
    setIsSubmitted(true);
    setShowResult(true);
    setShowSubmitConfirm(false);
  };

  // 计时到 0：自动交卷（与手动交卷走同一条路径，成绩照常记入错题本）。
  const handleTimeUp = () => handleSubmit({ auto: true });

  const startExam = ({ resume }) => {
    if (resume) {
      setAnswers(savedProgress.answers || {});
      setCurrentQuestionIndex(savedProgress.currentQuestionIndex || 0);
      setIsSubmitted(Boolean(savedProgress.isSubmitted));
      // 兼容旧存档：只有 timeLeft 时按保存时的剩余秒数从现在起算。
      setEndsAt(resolveEndsAt(savedProgress, timeLimitSeconds));
    } else {
      clearExamProgress(paperId);
      setSavedProgress(null);
      setAnswers({});
      setIsSubmitted(false);
      setCurrentQuestionIndex(0);
      // 空存档 → 按整卷时长新开（now + timeLimit）。
      setEndsAt(resolveEndsAt(null, timeLimitSeconds));
    }
    setSubmittedRemaining(null);
    setAutoSubmitted(false);
    setMode('exam');
  };

  // Navigation
  const goToPrevious = useCallback(() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1)), []);
  const goToNext = useCallback(() => {
    if (currentQuestionIndex >= questionCount - 1) {
      if (isSubmitted) setShowResult(true);
      else setShowSubmitConfirm(true);
      return;
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }, [currentQuestionIndex, questionCount, isSubmitted]);

  useQuestionKeyboardNavigation({
    enabled: mode === 'exam' && !showSubmitConfirm && !showResult,
    questionCount: allQuestions.length,
    onPrevious: goToPrevious,
    onNext: goToNext,
  });

  // ─── Loading / Error States ────────────────────────────────────────

  if (loading || (paperData && luogu.status === 'loading')) return <LoadingScreen message="正在加载试卷" variant="dark" />;

  if (error || !paperData) {
    return (
      <div className="mw-surface mw-line-bank min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <div className="text-center max-w-lg p-6">
          <AlertTriangle size={48} className="mx-auto text-red-400 mb-4" />
          <h2 className="text-xl font-bold text-slate-700">无法加载试卷</h2>
          <p className="mb-6">{error ? '试卷暂时打不开，可能是网络不稳定或链接有误。请返回题库重新选择，或稍后再试。' : '未找到该试卷数据，请返回题库重新选择。'}</p>
          <button onClick={() => navigate('/question-bank')} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">返回题库</button>
        </div>
      </div>
    );
  }

  if (luogu.status === 'error') {
    return (
      <div className="mw-surface mw-line-bank min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <div className="text-center max-w-lg p-6" role="alert">
          <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-bold text-slate-700">上机编程题加载失败</h2>
          <p className="mb-6">这张卷的第 26、27 题（上机编程）题面没能加载出来，可能是网络不稳定。为了不让你只练半张卷，请重试一次。</p>
          <div className="flex gap-3 justify-center">
            <button onClick={luogu.retry} className="px-6 py-2 bg-indigo-600 text-white rounded-lg">重新加载</button>
            <button onClick={() => navigate('/question-bank')} className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg">返回题库</button>
          </div>
        </div>
      </div>
    );
  }

  // ─── Mode Selection ────────────────────────────────────────────────

  if (mode === null) {
    return (
      <div className="mw-surface mw-line-bank mw-exam-entry min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{paperData.title}</h1>
            <p className="text-indigo-200">请选择练习模式</p>
          </div>
          {hasResumableProgress(savedProgress) && (
            <button
              onClick={() => startExam({ resume: true })}
              className="w-full mb-6 flex items-center justify-between gap-4 bg-amber-400/10 border border-amber-300/40 rounded-2xl p-5 text-left hover:bg-amber-400/20 transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <RotateCcw className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">继续上次练习</h3>
                  <p className="text-amber-100/80 text-sm">剩余 {formatClock(progressRemainingSeconds(savedProgress, timeLimitSeconds))} · 已答 {Object.keys(savedProgress.answers || {}).length} 题</p>
                </div>
              </div>
              <ChevronRight className="text-amber-200 group-hover:translate-x-1 transition-transform" size={22} />
            </button>
          )}
          <div className="grid md:grid-cols-2 gap-6">
            <button onClick={() => startExam({ resume: false })}
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-8 text-left hover:bg-white/20 hover:border-indigo-400 transition-all group">
              <div className="w-14 h-14 rounded-xl bg-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileText className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">考试模式</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">计时整卷练习，客观题自动判分，编程题保留题面与手动完成标记。</p>
              {hiddenFromMockCount > 0 && (
                <p className="text-indigo-300 text-xs leading-relaxed">本卷有 {hiddenFromMockCount} 道原卷缺陷题不编入模考卷面（不计分，可在解析模式练习）</p>
              )}
              <div className="mt-4 flex items-center gap-2 text-indigo-300 text-xs"><Clock size={14} /> {formatTimeLimitMinutes(timeLimitSeconds)}计时</div>
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
          <button onClick={() => navigate('/question-bank')} className="mt-8 w-full py-3 text-indigo-300 hover:text-white transition-colors text-sm">返回题库</button>
        </div>
      </div>
    );
  }

  // ─── Analysis Mode ─────────────────────────────────────────────────

  if (mode === 'analysis') {
    return (
      <Suspense fallback={<LoadingScreen message="正在加载解析" variant="dark" />}>
        <EnhancedPaperPage paperData={paperData} luoguPool={luoguPool} />
      </Suspense>
    );
  }

  // ─── Exam Mode (main) ─────────────────────────────────────────────

  if (!currentQ) {
    return (
      <div className="mw-surface mw-line-bank min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
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
    <div className="mw-surface mw-line-bank min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="mw-exam-header bg-white border-b border-slate-200 min-h-16 px-3 md:px-4 flex items-center justify-between gap-2 sticky top-0 z-30 shadow-sm">
        <div className="flex min-w-0 items-center gap-2 md:gap-4">
          <button
            type="button"
            onClick={() => navigate('/question-bank')}
            className="h-11 w-11 min-w-11 shrink-0 inline-flex items-center justify-center hover:bg-slate-100 rounded-lg text-slate-600"
            aria-label="返回题库"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="sr-only md:not-sr-only md:truncate font-bold text-slate-800">{paperData.title}</h1>
          <span className="hidden sm:inline-block shrink-0 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-mono font-bold">等级 {paperData.level}</span>
        </div>
        <div className="flex shrink-0 items-center gap-2 md:gap-4">
          <span className="hidden md:inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">考试模式</span>
          <span className="hidden lg:inline text-xs text-slate-500">客观题自动判分，编程题需手动完成</span>
          <ExamTimer endsAt={endsAt} frozenSeconds={isSubmitted ? (submittedRemaining ?? 0) : null} onExpire={handleTimeUp} />
          <button onClick={() => setShowSubmitConfirm(true)} disabled={isSubmitted}
            className={`min-h-11 whitespace-nowrap px-3 md:px-6 py-2 rounded-lg font-bold text-sm transition-all shadow-md ${isSubmitted ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200'}`}>
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
          onConfirm={() => handleSubmit()}
        />
      )}

      {showResult && (
        <ResultDialog
          objectiveScore={objectiveScore}
          objectiveScoreTotal={objectiveScoreTotal}
          timeElapsed={timeLimitSeconds - (submittedRemaining ?? 0)}
          autoSubmitted={autoSubmitted}
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
