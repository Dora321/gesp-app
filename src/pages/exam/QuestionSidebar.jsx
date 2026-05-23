import React from 'react';
import { isProgrammingQuestion } from '../../utils/questionHelpers';

/**
 * Question sidebar — displays question grid with status indicators
 */
const QuestionSidebar = ({
  questions,
  answers,
  currentQuestionIndex,
  isSubmitted,
  showSidebar,
  answeredCount,
  progress,
  onQuestionSelect,
  onClose,
}) => {
  return (
    <>
      <aside className={`w-72 bg-white border-r border-slate-200 flex flex-col z-20 transition-transform duration-300 absolute h-full md:relative ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold text-slate-700">题号面板</div>
            <button className="md:hidden text-xs px-2 py-1 rounded bg-slate-100 text-slate-600" onClick={onClose}>收起</button>
          </div>
          <div className="text-sm font-bold text-slate-700 mb-2">答题进度</div>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
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
                  onClick={() => onQuestionSelect(idx)}
                  className={`relative aspect-square rounded-lg border flex items-center justify-center text-sm font-semibold transition-all ${statusColor}`}
                >
                  {idx + 1}
                  {isCurrent && <span className="absolute top-1 right-1 text-[10px]">&bull;</span>}
                  {!isCurrent && isAnswered && <span className="absolute top-1 right-1 text-[10px]">&#10003;</span>}
                </button>
              );
            })}
          </div>
        </div>
      </aside>

      {showSidebar && <div className="fixed inset-0 bg-black/50 z-10 md:hidden" onClick={onClose} />}
    </>
  );
};

export default QuestionSidebar;