import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { navigateBack } from '../../utils/navigateBack';
import QuestionAnalysisShell from './QuestionAnalysisShell';

// 虚拟卷（考点练习、只练错题）的作答结果按来源卷和原题号写回错题本。
const sourceOf = (question) => (question.sourcePaperId && question.sourceQuestionId !== undefined
    ? { paperId: question.sourcePaperId, questionId: question.sourceQuestionId }
    : null);

/** storageKey 为 null 时，每次进入都重新作答。 */
export default function InteractiveAnalysisPage({ paperData, paperId, storageKey = paperId, backLabel = '返回', onBack }) {
    const navigate = useNavigate();
    const questions = useMemo(() => {
        if (!paperData) return [];
        return [
            ...(paperData.questions || []),
            ...(paperData.programmingQuestions || []).map((q) => ({ ...q, type: q.type || 'programming' })),
            ...(paperData.codingQuestions || []).map((q) => ({ ...q, type: q.type || 'programming' })),
        ].sort((a, b) => Number(a.id) - Number(b.id));
    }, [paperData]);

    if (!paperData || !questions.length) {
        return (
            <div className="mw-surface mw-line-bank flex min-h-screen items-center justify-center bg-[var(--mw-canvas)] p-6">
                <div className="max-w-md space-y-4 text-center">
                    <h2 className="text-xl font-bold">暂无可用增强解析资源</h2>
                    <p className="text-sm text-[var(--mw-ink-2)]">该试卷暂未完成交互解析页。你可以返回试卷继续练习。</p>
                    <button
                        type="button"
                        onClick={() => navigate(`/question-bank/${paperData?.level || 2}/${paperId}`)}
                        className="mw-button mw-button--primary"
                    >
                        返回试卷
                    </button>
                </div>
            </div>
        );
    }

    const backFallback = paperData.level ? `/question-bank/topics/${paperData.level}` : '/question-bank';
    return (
        <QuestionAnalysisShell
            key={storageKey ?? paperId}
            paper={paperData}
            paperId={paperId}
            questions={questions}
            storageKey={storageKey}
            mistakeSource={sourceOf}
            trackSignature
            backLabel={backLabel}
            onBack={onBack || (() => navigateBack(navigate, backFallback))}
        />
    );
}
