import React from 'react';
import { AlertTriangle, BadgeCheck, FileCheck2 } from 'lucide-react';

/**
 * Trust notice for a question's analysis.
 *
 * Answer and explanation are separate verification dimensions: a paper can have
 * an answer key checked against the official PDF while its explanations have
 * never been reviewed. This component states each one on its own rather than
 * implying a reviewed answer means a reviewed explanation.
 */
export default function AnalysisTrustNotice({ answerVerified, explanationVerified, useGenericHint }) {
    if (explanationVerified && !useGenericHint) {
        return (
            <div className="flex items-start gap-2 border-l-4 border-emerald-500 bg-emerald-50 px-3 py-2 text-sm text-emerald-900" role="status">
                <BadgeCheck className="mt-0.5 flex-shrink-0" size={16} aria-hidden="true" />
                <div>
                    <div className="font-semibold">已核验人工解析</div>
                    <div className="mt-0.5 text-xs text-emerald-800">本题答案与逐项解析均已通过人工核验。</div>
                </div>
            </div>
        );
    }

    if (answerVerified && !useGenericHint) {
        return (
            <div className="flex items-start gap-2 border-l-4 border-blue-500 bg-blue-50 px-3 py-2 text-sm text-blue-900" role="status">
                <FileCheck2 className="mt-0.5 flex-shrink-0" size={16} aria-hidden="true" />
                <div>
                    <div className="font-semibold">答案已核验 · 解析未单独核验</div>
                    <div className="mt-0.5 text-xs text-blue-800">
                        本题答案已对照原卷核验；以下解析由本站编写，尚未作为独立环节人工核验，仅供参考。
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start gap-2 border-l-4 border-amber-500 bg-amber-50 px-3 py-2 text-sm text-amber-950" role="status">
            <AlertTriangle className="mt-0.5 flex-shrink-0" size={16} aria-hidden="true" />
            <div>
                <div className="font-semibold">通用解题提示</div>
                <div className="mt-0.5 text-xs text-amber-900">
                    {answerVerified
                        ? '本卷答案已核验，但本题没有逐项人工解析。以下内容只提供学习方法。'
                        : '本卷尚未完成整卷核验。以下内容只提供解题方法，不作为官方或已核验解析。'}
                </div>
            </div>
        </div>
    );
}
