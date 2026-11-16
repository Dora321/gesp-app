// 解析模式的作答进度，按卷号存进 learningData.analysis（与 examProgress 同一写法）。
// 考点练习这类「虚拟卷」题目组合可能随题库更新而变，所以额外存一个 signature：
// 题目组合变了就不恢复旧进度，避免把 A 题的作答套到 B 题上。

import { readLearningData, updateLearningData } from './learningData.js';

/** 题目组合的短指纹（djb2）。只用来判断「还是不是同一组题」。 */
export function questionSignature(questions = []) {
    const text = questions
        .map((q) => `${q?.sourcePaperId ?? ''}:${q?.sourceQuestionId ?? q?.id ?? ''}`)
        .join('|');
    let hash = 5381;
    for (let i = 0; i < text.length; i += 1) hash = ((hash * 33) ^ text.charCodeAt(i)) >>> 0;
    return `${questions.length}-${hash.toString(36)}`;
}

export function loadAnalysisProgress(key, signature) {
    if (!key) return null;
    const entry = readLearningData().analysis[key];
    if (!entry) return null;
    if (signature && entry.signature && entry.signature !== signature) return null;
    return entry;
}

export function saveAnalysisProgress(key, { answers = {}, revealed = {}, currentQuestionIndex = 0, signature } = {}) {
    if (!key) return;
    updateLearningData((data) => ({
        ...data,
        analysis: {
            ...data.analysis,
            [key]: { answers, revealed, currentQuestionIndex, signature, savedAt: Date.now() },
        },
    }), 'analysis-progress');
}

export function clearAnalysisProgress(key) {
    updateLearningData((data) => {
        const analysis = { ...data.analysis };
        delete analysis[key];
        return { ...data, analysis };
    }, 'analysis-progress-clear');
}

export const RESET_ANALYSIS_CONFIRM = '确定清空这张卷在解析模式里的作答吗？已经记进错题本的错题会保留。';
