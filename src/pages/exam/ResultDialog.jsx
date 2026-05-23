import React from 'react';
import { Trophy } from 'lucide-react';

/**
 * Exam result dialog — shows objective score and stats after submission
 */
const ResultDialog = ({
  objectiveScore,
  objectiveScoreTotal,
  timeElapsed,
  objectiveCorrectCount,
  objectiveWrongCount,
  programmingMarkedCount,
  paperTimeLimit,
  onViewAnalysis,
  onBackToBank,
}) => {
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-yellow-100 text-yellow-500 mx-auto">
          <Trophy size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">考试结束</h2>
        <p className="text-slate-500 mb-6">已完成整卷练习，以下为客观题自动判分结果</p>
        <div className="text-6xl font-black text-indigo-600 mb-2 font-mono tracking-tighter">
          {objectiveScore} <span className="text-2xl text-slate-400 font-normal">/ {objectiveScoreTotal}</span>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-8 mt-6">
          <div className="bg-slate-50 p-3 rounded-lg"><div className="text-xs text-slate-400 uppercase">用时</div><div className="font-bold text-slate-700 font-mono">{formatTime(timeElapsed)}</div></div>
          <div className="bg-green-50 p-3 rounded-lg"><div className="text-xs text-green-600 uppercase">客观正确</div><div className="font-bold text-green-700">{objectiveCorrectCount}</div></div>
          <div className="bg-red-50 p-3 rounded-lg"><div className="text-xs text-red-600 uppercase">客观错误</div><div className="font-bold text-red-700">{objectiveWrongCount}</div></div>
          <div className="bg-violet-50 p-3 rounded-lg"><div className="text-xs text-violet-700 uppercase">编程已标记</div><div className="font-bold text-violet-700">{programmingMarkedCount}</div></div>
        </div>
        <p className="text-sm text-slate-500 mb-6">编程题当前不支持自动判分，请结合解析模式或人工评阅继续复盘。</p>
        <div className="flex gap-3">
          <button onClick={onViewAnalysis} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">查看解析</button>
          <button onClick={onBackToBank} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">返回题库</button>
        </div>
      </div>
    </div>
  );
};

export default ResultDialog;