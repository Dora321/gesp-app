import React from 'react';
import { AlertOctagon } from 'lucide-react';

const STATUS_LABELS = {
    'options-reconstructed': '本题选项非原卷原文',
    'missing-figure': '本题缺少原卷配图',
    'contaminated-stem': '本题题干曾串入其他题目内容',
};

/**
 * Shown on questions whose statement/options could not be recovered faithfully
 * from the official paper. These questions cannot be answered reliably, so the
 * warning appears next to the question itself rather than being buried in the
 * explanation text.
 */
export default function SourceIntegrityNotice({ status, note }) {
    if (!status) return null;

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
