import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { formatOptionDisplay } from '../../utils/questionTextFormatting';
import { buildQuestionInsight, selectAnalysisView } from './analysisEngine';
import AnalysisTrustNotice from './AnalysisTrustNotice';

const optionLetter = (index) => String.fromCharCode(65 + index);

/**
 * 客观题的「答案 + 解析」。整卷解析、考点练习、考试交卷后、错题本展开共用这一份，
 * 避免同一段解析在四个地方各写一遍、慢慢长歪。
 *
 * given：学生选的选项下标（没作答传 undefined）；showGiven=false 时不提学生的选择（错题本里不知道上次选了什么）。
 */
export default function AnswerReview({
    q,
    level,
    given,
    answerVerified = false,
    explanationVerified = false,
    showTrustNotice = true,
    showGiven = true,
}) {
    if (!q) return null;
    const analysisView = selectAnalysisView(q, level);
    const useGenericHint = analysisView.mode === 'generic';
    const displayedAnalysis = analysisView.analysis;
    const hasAnswer = Number.isInteger(q.answer) && q.options?.[q.answer] !== undefined;
    const answered = given !== undefined && given !== null;
    const isWrong = showGiven && answered && given !== q.answer;

    return (
        <div className="space-y-3" data-testid="answer-review">
            {showTrustNotice && (
                <AnalysisTrustNotice
                    answerVerified={answerVerified}
                    explanationVerified={explanationVerified}
                    useGenericHint={useGenericHint}
                />
            )}

            {/* 答案速览 */}
            {hasAnswer && (
                <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-green-200 bg-green-50 px-3 py-1.5 text-base font-bold text-green-800">
                        <CheckCircle2 size={18} className="text-green-600" aria-hidden="true" />
                        {answerVerified ? '已核验答案' : '题库答案（尚未完成核验）'}：{optionLetter(q.answer)}
                    </span>
                    <MarkdownRenderer content={formatOptionDisplay(q.options[q.answer])} inline={true} className="text-base text-slate-700" />
                    {isWrong && (
                        <span className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-sm font-semibold text-red-700">
                            你选了 {optionLetter(given)}
                        </span>
                    )}
                    {showGiven && !answered && (
                        <span className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-sm font-semibold text-slate-600">
                            这题没作答
                        </span>
                    )}
                </div>
            )}

            {/* 题库原解析：存在解析但无法拆成逐项理由时原文展示，不用通用模板替换 */}
            {analysisView.mode === 'authored' && (
                <div className="rounded-lg border border-blue-100 bg-white p-4" data-testid="authored-explanation">
                    <div className="mb-2 text-base font-semibold text-slate-800">📝 题库解析</div>
                    <MarkdownRenderer content={analysisView.explanation} className="text-base leading-7 text-slate-700" />
                </div>
            )}

            {/* 选项逐项分析 */}
            {displayedAnalysis?.optionAnalysis?.length > 0 && (
                <div className="rounded-lg border border-blue-100 bg-white p-4">
                    <div className="mb-2 text-base font-semibold text-slate-800">📋 选项逐项分析</div>
                    <div className="space-y-2">
                        {displayedAnalysis.optionAnalysis.map((oa) => (
                            <div key={oa.idx} className={`flex items-start gap-2.5 rounded-lg p-2.5 text-base ${oa.isCorrect ? 'bg-green-50' : 'bg-slate-50'}`}>
                                <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${oa.isCorrect ? 'bg-green-200 text-green-800' : 'bg-slate-200 text-slate-600'}`}>
                                    {oa.label}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <MarkdownRenderer content={oa.text} inline={true} className="leading-relaxed text-slate-800" />
                                    <div className={`mt-1 text-[15px] leading-6 ${oa.isCorrect ? 'text-green-800' : 'text-slate-600'}`}>
                                        {oa.isCorrect ? '✓ ' : '✗ '}<MarkdownRenderer content={oa.reason} inline={true} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 核心知识点 */}
            {displayedAnalysis && (
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                    <div className="mb-1 text-base font-semibold text-slate-800">💡 {useGenericHint ? '通用解题提示' : '核心知识点'}</div>
                    <MarkdownRenderer content={displayedAnalysis?.keyPoint || buildQuestionInsight(q, level)} className="text-base leading-7 text-slate-700" />
                </div>
            )}

            {/* 易错点 */}
            {displayedAnalysis?.pitfalls?.length > 0 && (
                <div className="rounded-lg border border-amber-100 bg-white p-4">
                    <div className="mb-1.5 text-base font-semibold text-amber-800">⚠️ 易错提醒</div>
                    <ul className="space-y-1">
                        {displayedAnalysis.pitfalls.map((p, idx) => (
                            <li key={idx} className="flex items-start gap-1.5 text-base text-slate-700">
                                <span className="mt-0.5 flex-shrink-0 text-amber-500" aria-hidden="true">•</span>
                                <MarkdownRenderer content={p} inline={true} className="leading-relaxed" />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 知识延伸 */}
            {displayedAnalysis?.extension && (
                <div className="rounded-lg border border-emerald-100 bg-white p-4">
                    <div className="mb-1 text-base font-semibold text-emerald-800">🚀 {useGenericHint ? '练习建议' : '知识延伸'}</div>
                    <MarkdownRenderer content={displayedAnalysis.extension} className="text-base leading-7 text-slate-700" />
                </div>
            )}
        </div>
    );
}
