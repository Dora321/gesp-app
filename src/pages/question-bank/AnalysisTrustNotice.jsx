import React from 'react';
import { AlertTriangle, BadgeCheck } from 'lucide-react';

export default function AnalysisTrustNotice({ paperIsFullyVerified, useGenericHint }) {
    if (!useGenericHint) {
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

    return (
        <div className="flex items-start gap-2 border-l-4 border-amber-500 bg-amber-50 px-3 py-2 text-sm text-amber-950" role="status">
            <AlertTriangle className="mt-0.5 flex-shrink-0" size={16} aria-hidden="true" />
            <div>
                <div className="font-semibold">通用解题提示</div>
                <div className="mt-0.5 text-xs text-amber-900">
                    {paperIsFullyVerified
                        ? '本卷答案已核验，但本题没有逐项人工解析。以下内容只提供学习方法。'
                        : '本卷尚未完成整卷核验。以下内容只提供解题方法，不作为官方或已核验解析。'}
                </div>
            </div>
        </div>
    );
}
