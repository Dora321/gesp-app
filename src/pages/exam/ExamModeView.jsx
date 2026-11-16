import { Check, CheckCircle, X, ChevronRight } from 'lucide-react';
import { getLuoguProblemUrl } from '../../data/gesp/codingQuestions';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import CodingProblemView from '../../components/CodingProblemView';
import {
  isProgrammingQuestion,
  getQuestionContent,
} from '../../utils/questionHelpers';
import { formatOptionDisplay, stripLeadingNumber } from '../../utils/questionTextFormatting';
import SourceIntegrityNotice from '../../components/SourceIntegrityNotice';
import { hasSourceDefect, isScoringExcluded } from '../../utils/sourceIntegrity';

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
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const programmingMarked = answers[currentQ.id] !== undefined;

  const programmingActions = isProgramming ? (
    <button
      type="button"
      onClick={onProgrammingMark}
      disabled={isSubmitted}
      aria-pressed={programmingMarked}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${
        programmingMarked
          ? 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
          : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
      }`}
    >
      {programmingMarked && <Check size={16} aria-hidden="true" />}
      {programmingMarked ? '已标记为完成/已阅读' : '标记为已完成或已阅读'}
    </button>
  ) : null;

  return (
    <main className="min-w-0 flex-1 overflow-y-auto p-4 pb-24 md:p-8">
      <div className={`mx-auto space-y-8 ${isProgramming ? 'max-w-[54rem]' : 'max-w-3xl'}`}>
        {/* Question Card：编程题也只有这一层白底，内部小节不再套卡 */}
        <div className={`bg-white rounded-2xl shadow-sm border border-slate-200 animate-fade-in relative overflow-hidden ${isProgramming ? 'p-5 md:p-10' : 'p-6 md:p-10'}`}>
          {!isProgramming && (
            <div className="absolute top-0 left-0 bg-slate-100 px-4 py-1.5 rounded-br-xl text-xs font-bold text-slate-600 uppercase tracking-wider">
              {currentQ.type === 'single' ? '单选题' : '判断题'} &bull; {currentQ.score}分
            </div>
          )}

          {hasSourceDefect(currentQ) && (
            <div className="mt-4">
              <SourceIntegrityNotice
                status={currentQ.sourceIntegrity}
                note={currentQ.integrityNote}
                defectKind={currentQ.defectKind}
                examScoring={currentQ.examScoring}
              />
            </div>
          )}

          {isProgramming ? (
            <CodingProblemView
              variant="exam"
              q={currentQ}
              questionNumber={currentQuestionIndex + 1}
              luoguUrl={getLuoguProblemUrl(paperId, currentQ.id)}
              actions={programmingActions}
            />
          ) : (
            <>
              <div className="question-stem mt-6 mb-8">
                <span className="question-number">{currentQuestionIndex + 1}.</span>
                <MarkdownRenderer content={stripLeadingNumber(getQuestionContent(currentQ))} />
              </div>

              {/* Objective Question Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = answers[currentQ.id] === idx;
                  const isExcluded = isScoringExcluded(currentQ);
                  const showAnswer = isSubmitted && !isExcluded;
                  let optionClass = 'border-slate-300 hover:border-blue-400 hover:bg-slate-50 cursor-pointer';
                  if (isExcluded) {
                    optionClass = 'border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed';
                  } else if (showAnswer) {
                    if (idx === currentQ.answer) optionClass = 'bg-green-100 border-green-500 text-green-800 font-bold';
                    else if (isSelected && idx !== currentQ.answer) optionClass = 'bg-red-100 border-red-500 text-red-800 opacity-60';
                    else optionClass = 'opacity-50 grayscale cursor-default';
                  } else if (isSelected) {
                    optionClass = 'bg-blue-50 border-blue-500 text-blue-800 shadow-sm ring-1 ring-blue-500';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => onOptionSelect(currentQ.id, idx)}
                      disabled={isSubmitted || isExcluded}
                      aria-pressed={isSelected}
                      className={`question-option group w-full rounded-xl border px-4 py-3.5 text-left text-lg shadow-sm transition-all ${optionClass}`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${isSelected || (showAnswer && idx === currentQ.answer) ? 'border-current' : 'border-slate-300 text-slate-400'}`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <div className="question-option-content">
                        <MarkdownRenderer content={formatOptionDisplay(opt)} inline={true} className="text-inherit" />
                      </div>
                      {showAnswer && idx === currentQ.answer && <CheckCircle className="ml-auto text-green-600" />}
                      {showAnswer && isSelected && idx !== currentQ.answer && <X className="ml-auto text-red-500" />}
                    </button>
                  );
                })}
              </div>
            </>
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

export default ExamModeView;
