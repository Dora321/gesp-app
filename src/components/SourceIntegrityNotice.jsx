import React from 'react';
import { AlertOctagon } from 'lucide-react';

const STATUS_LABELS = {
    'ok': '本题无已知缺陷',
    'options-reconstructed': '本题选项非原卷原文',
    'missing-figure': '本题缺少原卷配图',
    'missing-code': '本题缺少原卷代码',
    'missing-formula': '本题缺少原卷公式或数值',
    'contaminated-stem': '本题题干曾串入其他题目内容',
    'not-official-question': '本题与官方原卷同题号题目不一致',
    'answer-key-conflict': '本题官方答案存在版本冲突',
    'answer-key-suspect': '本题所录答案与通行结论不符，待核对原卷',
    'official-source-defect': '本题原卷题面存在缺陷',
};

const EXCLUDED_TITLES = {
    'multi-answer': '原卷多解题（不计分）',
    'ub': '原卷代码依赖未定义行为（不计分）',
    'non-compilable': '原卷代码无法编译（不计分）',
    'self-contradictory': '原卷题面自相矛盾（不计分）',
};

/**
 * Shown on questions whose statement/options could not be recovered faithfully
 * from the official paper. These questions cannot be answered reliably, so the
 * warning appears next to the question itself rather than being buried in the
 * explanation text.
 *
 * 历史标记题（没有 examScoring）保持原来的橙色警示；新字段题按计分口径区分：
 * counted 只提示「不影响作答」，excluded 才说明本题不计分。
 */
export default function SourceIntegrityNotice({ status, note, defectKind, examScoring }) {
    if (!status || status === 'ok') return null;

    if (examScoring === 'counted') {
        return (
            <div className="flex items-start gap-2 rounded-lg border-l-4 border-sky-400 bg-sky-50 px-3 py-2 text-sm text-slate-800" role="note">
                <AlertOctagon className="mt-0.5 flex-shrink-0 text-sky-600" size={16} aria-hidden="true" />
                <div>
                    <div className="font-semibold">原卷有瑕疵，不影响作答（本题正常计分）</div>
                    {note && <div className="mt-0.5 text-xs leading-5 text-slate-700">{note}</div>}
                    <div className="mt-1 text-xs text-slate-600">
                        本题正常计分。
                    </div>
                </div>
            </div>
        );
    }

    if (examScoring === 'excluded') {
        return (
            <div className="flex items-start gap-2 rounded-lg border-l-4 border-orange-500 bg-orange-50 px-3 py-2 text-sm text-orange-950" role="alert">
                <AlertOctagon className="mt-0.5 flex-shrink-0" size={16} aria-hidden="true" />
                <div>
                    <div className="font-semibold">{EXCLUDED_TITLES[defectKind] || '本题原卷题面存在缺陷（不计分）'}</div>
                    {note && <div className="mt-0.5 text-xs leading-5 text-orange-900">{note}</div>}
                    <div className="mt-1 text-xs text-orange-800">
                        本题不计分，请以官方原卷为准。
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-start gap-2 rounded-lg border-l-4 border-orange-500 bg-orange-50 px-3 py-2 text-sm text-orange-950" role="alert">
            <AlertOctagon className="mt-0.5 flex-shrink-0" size={16} aria-hidden="true" />
            <div>
                <div className="font-semibold">{STATUS_LABELS[status] || '本题内容待核验'}</div>
                {note && <div className="mt-0.5 text-xs leading-5 text-orange-900">{note}</div>}
                <div className="mt-1 text-xs text-orange-800">
                    请以官方原卷为准，不要将本题作为评分依据。
                </div>
            </div>
        </div>
    );
}
