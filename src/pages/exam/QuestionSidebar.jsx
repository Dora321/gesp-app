import { useState } from 'react';
import { Flag } from 'lucide-react';
import { isProgrammingQuestion } from '../../utils/questionHelpers';

/**
 * Question sidebar — displays question grid with status indicators
 */
const QuestionSidebar = ({
  questions,
  answers,
  currentQuestionIndex,
  isSubmitted,
  reviewIndexes = null,
  flaggedIndexes = [],
  showSidebar,
  answeredCount,
  progress,
  onQuestionSelect,
  onClose,
}) => {
  const [flaggedOnly, setFlaggedOnly] = useState(false);
  const flagged = new Set(flaggedIndexes);
  return (
    <>
      <aside aria-label="题号面板" className={`w-72 max-w-[calc(100vw-32px)] bg-white border-r border-slate-200 flex flex-col z-20 transition-transform duration-300 fixed top-16 bottom-0 left-0 md:relative md:top-auto md:bottom-auto md:visible md:translate-x-0 ${showSidebar ? 'visible translate-x-0' : 'invisible -translate-x-full'}`}>
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-bold text-slate-700">题号面板</div>
            <button className="md:hidden min-h-11 text-sm px-3 py-2 rounded bg-slate-100 text-slate-600" onClick={onClose}>收起</button>
          </div>
          <div className="text-sm font-bold text-slate-700 mb-2">答题进度</div>
          <div className="w-full bg-slate-100 rounded-full h-2 mb-1">
            <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="text-xs text-slate-600 text-right">{answeredCount} / {questions.length}</div>
          <div className="mt-3 flex flex-wrap items-center gap-2" aria-label="筛选题号">
            <button type="button" aria-pressed={!flaggedOnly} onClick={() => setFlaggedOnly(false)} className={`min-h-11 rounded-sm border-b-4 px-3 text-sm ${!flaggedOnly ? 'border-[var(--mw-ink)] bg-[var(--mw-line-wash)] font-semibold' : 'border-transparent'}`}>全部</button>
            <button type="button" aria-pressed={flaggedOnly} onClick={() => setFlaggedOnly(true)} className={`inline-flex min-h-11 items-center gap-1 rounded-sm border-b-4 px-3 text-sm ${flaggedOnly ? 'border-[var(--mw-warn)] bg-[var(--mw-warn-tint)] font-semibold' : 'border-transparent'}`}>
              <Flag size={14} aria-hidden="true" /> 只看存疑（{flagged.size}）
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isFlagged = flagged.has(idx);
              if (flaggedOnly && !isFlagged) return null;
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = idx === currentQuestionIndex;
              const isProgramming = isProgrammingQuestion(q);
              // 「只看错题」时其余题号淡化，仍可点开。
              const dimmed = Array.isArray(reviewIndexes) && !reviewIndexes.includes(idx);
              let statusColor = 'bg-white border-slate-200 text-slate-600';
              if (isSubmitted) {
                if (isProgramming) {
                  statusColor = isAnswered ? 'bg-[var(--mw-info-tint)] border-[var(--mw-info)] text-[var(--mw-info)]' : 'bg-slate-100 border-slate-200 text-slate-600';
                } else {
                  const isCorrect = answers[q.id] === q.answer;
                  statusColor = isCorrect ? 'bg-green-100 border-green-300 text-green-700' : answers[q.id] !== undefined ? 'bg-red-100 border-red-300 text-red-700' : 'bg-slate-100 border-slate-200 text-slate-600';
                }
              } else {
                if (isCurrent) statusColor = 'bg-blue-600 text-white border-blue-600 shadow-md transform scale-105';
                else if (isAnswered) statusColor = 'bg-blue-50 border-blue-200 text-blue-600';
              }
              return (
                <button
                  key={q.id}
                  aria-label={`第 ${idx + 1} 题${isFlagged ? '，存疑' : ''}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  onClick={() => onQuestionSelect(idx)}
                  className={`relative aspect-square min-h-11 rounded-lg border flex items-center justify-center text-sm font-semibold transition-colors ${statusColor} ${dimmed && !isCurrent ? 'opacity-35' : ''} ${isSubmitted && isCurrent ? 'ring-2 ring-slate-800 ring-offset-1' : ''}`}
                >
                  {idx + 1}
                  {isCurrent && <span className="absolute top-1 right-1 text-[10px]">&bull;</span>}
                  {!isCurrent && isAnswered && <span className="absolute top-1 right-1 text-[10px]">&#10003;</span>}
                  {isFlagged && <Flag size={13} fill="currentColor" aria-hidden="true" className="absolute bottom-0.5 right-0.5 rounded-sm bg-[var(--mw-warn-tint)] p-px text-[var(--mw-warn)]" />}
                </button>
              );
            })}
          </div>
          {flaggedOnly && flagged.size === 0 && <p role="status" className="text-sm text-[var(--mw-ink-2)]">当前没有标为存疑的题目。</p>}
        </div>
      </aside>

      {showSidebar && <div className="fixed inset-0 bg-black/50 z-10 md:hidden" onClick={onClose} />}
    </>
  );
};

export default QuestionSidebar;
