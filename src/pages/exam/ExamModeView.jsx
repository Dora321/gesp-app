import React from 'react';
import { CheckCircle, X, ChevronRight } from 'lucide-react';
import { paperCodingMap } from '../../data/gesp/paperCodingMap';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import {
  isProgrammingQuestion,
  getQuestionContent,
  buildProgrammingStatementMarkdown,
} from '../../utils/questionHelpers';
import { formatOptionDisplay, stripLeadingNumber } from '../../utils/questionTextFormatting';

/**
 * Exam mode main content — question display, options, and programming question view
 */
const ExamModeView = ({
  currentQ,
  currentQuestionIndex,
  questions,
  answers,
  isSubmitted,
  paperId,
  onOptionSelect,
  onProgrammingMark,
  onPrev,
  onNext,
}) => {
  const isProgramming = isProgrammingQuestion(currentQ);
  const currentProgrammingMarkdown = isProgramming ? buildProgrammingStatementMarkdown(currentQ) : '';
  const isReformed = isProgramming && getQuestionContent(currentQ).trim().startsWith('# ');
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 animate-fade-in relative overflow-hidden">
          <div className="absolute top-0 left-0 bg-slate-100 px-4 py-1.5 rounded-br-xl text-xs font-bold text-slate-500 uppercase tracking-wider">
            {isProgramming ? '编程题' : currentQ.type === 'single' ? '单选题' : '判断题'} &bull; {currentQ.score}分
          </div>

          {/* Question text (non-programming or non-reformatted) */}
          {!(isProgramming && (getQuestionContent(currentQ) === currentProgrammingMarkdown || isReformed)) && (
            <div className="text-xl md:text-2xl font-bold text-slate-800 mt-6 mb-8 leading-relaxed">
              <span className="text-blue-500 mr-2">{currentQuestionIndex + 1}.</span>
              <MarkdownRenderer content={stripLeadingNumber(getQuestionContent(currentQ))} />
            </div>
          )}
          {isProgramming && (getQuestionContent(currentQ) === currentProgrammingMarkdown || isReformed) && (
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 mt-6 mb-2 leading-relaxed">
              <span className="text-blue-500 mr-2">第 {currentQuestionIndex + 1} 题</span>
            </h2>
          )}

          {/* Programming Question View */}
          {isProgramming ? (
            <ProgrammingQuestionView
              currentQ={currentQ}
              currentQuestionIndex={currentQuestionIndex}
              isReformed={isReformed}
              currentProgrammingMarkdown={currentProgrammingMarkdown}
              isSubmitted={isSubmitted}
              answers={answers}
              paperId={paperId}
              onMark={onProgrammingMark}
            />
          ) : (
            /* Objective Question Options */
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
                  <div key={idx} onClick={() => onOptionSelect(currentQ.id, idx)} className={`question-option group w-full text-left rounded-xl border px-4 py-3.5 shadow-sm transition-all text-lg ${optionClass}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${isSelected || (showAnswer && idx === currentQ.answer) ? 'border-current' : 'border-slate-300 text-slate-400'}`}>
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div className="question-option-content">
                      <MarkdownRenderer content={formatOptionDisplay(opt)} inline={true} className="text-inherit" />
                    </div>
                    {showAnswer && idx === currentQ.answer && <CheckCircle className="ml-auto text-green-600" />}
                    {showAnswer && isSelected && idx !== currentQ.answer && <X className="ml-auto text-red-500" />}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={onPrev}
            disabled={currentQuestionIndex === 0}
            className="px-6 py-3 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 disabled:opacity-50"
          >
            上一题
          </button>

          <button
            onClick={onNext}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-sm transition-all ${isLastQuestion ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
          >
            {isLastQuestion ? (isSubmitted ? '查看结果' : '检查交卷') : <>下一题 <ChevronRight size={18} /></>}
          </button>
        </div>
      </div>
    </main>
  );
};

/** Inline — programming question display */
const ProgrammingQuestionView = ({
  currentQ,
  currentQuestionIndex,
  isReformed,
  currentProgrammingMarkdown,
  isSubmitted,
  answers,
  paperId,
  onMark,
}) => {
  return (
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
          const pid = mapped[`q${currentQ.id}`];
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
        onClick={onMark}
        disabled={isSubmitted}
        className={`w-full py-3 rounded-xl font-bold transition-colors ${answers[currentQ.id] !== undefined ? 'bg-violet-100 text-violet-700 border border-violet-200' : 'bg-violet-600 text-white hover:bg-violet-700'}`}
      >
        {answers[currentQ.id] !== undefined ? '已标记为完成/已阅读' : '标记为已完成或已阅读'}
      </button>
      <p className="text-sm text-slate-500">
        考试模式下暂不自动判编程题分数，会在交卷结果中单独提示人工评阅。
      </p>
    </div>
  );
};

export default ExamModeView;
