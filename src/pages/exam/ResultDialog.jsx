import React from 'react';
import { Trophy } from 'lucide-react';
import useDialogFocus from '../../hooks/useDialogFocus';
import { estimateGespThresholds } from '../../utils/examScoring';

/**
 * Exam result dialog — shows objective score and stats after submission
 */
const ResultDialog = ({
  objectiveScore,
  objectiveScoreTotal,
  timeElapsed,
  objectiveCorrectCount,
  objectiveWrongCount,
  objectiveUnansweredCount = 0,
  programmingMarkedCount,
  excludedObjectiveCount,
  onViewAnalysis,
  onClose,
  onBackToBank,
  onOpenReview,
  autoSubmitted = false,
}) => {
  const dialogRef = useDialogFocus(onClose || onViewAnalysis);
  const estimate = estimateGespThresholds(objectiveScore, objectiveScoreTotal);
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="exam-result-title" tabIndex={-1} className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[calc(100dvh-32px)] overflow-y-auto p-6 sm:p-8 text-center relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-[var(--mw-brand-mustard)]"></div>
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 text-yellow-500 mx-auto">
          <Trophy size={40} />
        </div>
        <h2 id="exam-result-title" className="text-2xl font-bold text-slate-800 mb-2">考试结束</h2>
        <p className="text-slate-500 mb-6">
          {autoSubmitted ? '时间到，已自动交卷。' : '已完成整卷练习，'}以下为客观题自动判分结果
        </p>
        <div className="text-6xl font-black text-indigo-600 mb-2 font-mono tracking-tighter">
          {objectiveScore} <span className="text-2xl text-slate-400 font-normal">/ {objectiveScoreTotal}</span>
        </div>
        <div className="grid grid-cols-3 gap-2 mb-6 mt-6">
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-sm text-slate-600">用时</div><div className="font-bold text-slate-700 font-mono">{formatTime(timeElapsed)}</div></div>
          <div className="bg-green-50 p-3 rounded-lg"><div className="text-sm text-green-700">答对</div><div className="font-bold text-green-700">{objectiveCorrectCount}</div></div>
          <div className="bg-red-50 p-3 rounded-lg"><div className="text-sm text-red-700">答错</div><div className="font-bold text-red-700">{objectiveWrongCount}</div></div>
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-sm text-slate-600">没做</div><div className="font-bold text-slate-700">{objectiveUnansweredCount}</div></div>
          <div className="bg-[var(--mw-info-tint)] p-3 rounded-lg"><div className="text-sm text-[var(--mw-info)]">编程已标记</div><div className="font-bold text-[var(--mw-info)]">{programmingMarkedCount}</div></div>
          <div className="bg-orange-50 p-3 rounded-lg"><div className="text-sm text-orange-700">不计分</div><div className="font-bold text-orange-700">{excludedObjectiveCount}</div></div>
        </div>
        {estimate && (
          <div className="mb-4 rounded-md border border-[var(--mw-rule)] bg-[var(--mw-canvas)] px-3 py-2 text-left text-sm leading-relaxed text-[var(--mw-ink-2)]">
            <p>
              按 GESP 满分 100 分（客观 50 分、编程 50 分）估算，客观题折合 {estimate.scaledObjective.toLocaleString('zh-CN', { maximumFractionDigits: 2 })} 分。
              {estimate.passRequired === null ? '编程题拿满 50 分也达不到 60 分合格线。' : `编程题需约 ${estimate.passRequired} 分达到 60 分合格线。`}
              {estimate.skipRequired === null ? '编程题拿满分也达不到 90 分跳级参考线。' : `编程题需约 ${estimate.skipRequired} 分达到 90 分跳级参考线。`}
            </p>
            <p className="mt-1">
              仅供参考，以官方成绩为准。<a href="https://gesp.ccf.org.cn/101/1011/10102.html" className="mw-text-link">CCF GESP 官方规则</a>
            </p>
          </div>
        )}
        <p className="text-sm text-slate-500 mb-3">编程题不自动判分；题面待核验的客观题也不计入分数，请结合官方原卷复盘。</p>
        <p className="text-sm text-slate-500 mb-6">本次成绩与错题已记入错题本，关掉这个窗口也不会丢。</p>
        <div className="flex gap-3">
          <button onClick={onViewAnalysis} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">查看解析</button>
          <button onClick={onBackToBank} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">返回题库</button>
        </div>
        <button onClick={onOpenReview} className="mt-3 w-full py-3 rounded-xl font-bold text-indigo-700 hover:bg-indigo-50 transition-colors">
          打开错题本
        </button>
      </div>
    </div>
  );
};

export default ResultDialog;
