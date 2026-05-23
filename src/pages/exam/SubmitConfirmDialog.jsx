import React from 'react';

/**
 * Submit confirmation dialog
 */
const SubmitConfirmDialog = ({
  answeredCount,
  unansweredCount,
  programmingMarkedCount,
  onCancel,
  onConfirm,
}) => {
  return (
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
          <button onClick={onCancel} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">返回继续答题</button>
          <button onClick={onConfirm} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">确认交卷</button>
        </div>
      </div>
    </div>
  );
};

export default SubmitConfirmDialog;