import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { clearAnalysisProgress, loadAnalysisProgress, questionSignature, saveAnalysisProgress } from '../utils/analysisProgress';
import { recordQuestionResult } from '../utils/examHistory';
import { isProgrammingQuestion } from '../utils/questionHelpers';
import { isScoringExcluded } from '../utils/sourceIntegrity';

const EMPTY = { answers: {}, revealed: {}, currentQuestionIndex: 0 };

const restore = (storageKey, signature) => {
    const saved = loadAnalysisProgress(storageKey, signature);
    if (!saved) return EMPTY;
    return {
        answers: saved.answers || {},
        revealed: saved.revealed || {},
        currentQuestionIndex: saved.currentQuestionIndex || 0,
    };
};

/**
 * 解析模式（整卷解析、考点练习、只练错题）共用的作答状态：
 * - storageKey 有值时按卷号持久化到 learningData.analysis，刷新不丢；
 * - 揭晓客观题时，把对错并入错题集合（mistakeSource 给出这道题在哪张真卷、第几题）；
 *   编程题和不计分题不进错题本，与考试模式一致。
 * - questions 组合可能变化的虚拟卷传 trackSignature，组合变了就不恢复旧进度。
 */
export default function useAnalysisSession({ storageKey = null, questions = [], mistakeSource, trackSignature = false }) {
    const signature = useMemo(
        () => (trackSignature ? questionSignature(questions) : undefined),
        [trackSignature, questions],
    );
    const [state, setState] = useState(() => (storageKey ? restore(storageKey, signature) : EMPTY));
    const { answers, revealed } = state;
    const currentQuestionIndex = Math.min(state.currentQuestionIndex, Math.max(0, questions.length - 1));

    const mistakeSourceRef = useRef(mistakeSource);
    useEffect(() => { mistakeSourceRef.current = mistakeSource; }, [mistakeSource]);

    useEffect(() => {
        if (!storageKey) return;
        const touched = Object.keys(state.answers).length > 0 || state.currentQuestionIndex > 0;
        if (touched) saveAnalysisProgress(storageKey, { ...state, signature });
    }, [storageKey, state, signature]);

    const setCurrentQuestionIndex = useCallback((next) => {
        setState((prev) => ({
            ...prev,
            currentQuestionIndex: typeof next === 'function' ? next(prev.currentQuestionIndex) : next,
        }));
    }, []);

    const recordResult = useCallback((question, given) => {
        if (!question || isProgrammingQuestion(question) || isScoringExcluded(question)) return;
        const source = mistakeSourceRef.current?.(question);
        if (!source) return;
        recordQuestionResult(source.paperId, source.questionId, given === question.answer);
    }, []);

    /** 选中即揭晓（沿用原交互），并记录对错。 */
    const selectOption = useCallback((question, optionIdx) => {
        if (!question || state.revealed[question.id]) return false;
        setState((prev) => ({
            ...prev,
            answers: { ...prev.answers, [question.id]: optionIdx },
            revealed: { ...prev.revealed, [question.id]: true },
        }));
        recordResult(question, optionIdx);
        return true;
    }, [state.revealed, recordResult]);

    /** 「查看答案与解析」；编程题没有选项，记一个占位答案表示已看过。 */
    const reveal = useCallback((question) => {
        if (!question) return false;
        const programming = isProgrammingQuestion(question);
        const given = state.answers[question.id];
        if (!programming && given === undefined) return false;
        setState((prev) => ({
            ...prev,
            answers: programming && given === undefined ? { ...prev.answers, [question.id]: 0 } : prev.answers,
            revealed: { ...prev.revealed, [question.id]: true },
        }));
        if (!state.revealed[question.id]) recordResult(question, given);
        return true;
    }, [state.answers, state.revealed, recordResult]);

    /** 清空本卷作答（错题集合不动：做错过的题仍要留在错题本里）。 */
    const reset = useCallback(() => {
        setState(EMPTY);
        if (storageKey) clearAnalysisProgress(storageKey);
    }, [storageKey]);

    return { answers, revealed, currentQuestionIndex, setCurrentQuestionIndex, selectOption, reveal, reset };
}
