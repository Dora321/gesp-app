// 「原卷缺陷」与「是否计分」是两个独立概念，这里是全站唯一的判定入口。
//
//   sourceIntegrity : 'ok' | 'official-source-defect' | （历史值：answer-key-conflict 等）
//                     —— 这题是否忠实原卷、有没有已知缺陷
//   defectKind      : 'out-of-scope' | 'multi-answer' | 'ub' | 'non-compilable' | 'self-contradictory'
//                     —— 缺陷类型，决定讲评与展示方式
//   examScoring     : 'counted' | 'excluded'
//                     —— 是否参与得分统计（得分率、错题本、交卷成绩）
//
// 兼容旧数据：没有 examScoring 的题沿用历史语义（带 sourceIntegrity ⇒ 不计分）。
// 显式写了 examScoring 的题以它为准——所以「原卷有瑕疵但仍可正常作答」的题
// （defectKind = out-of-scope）可以 sourceIntegrity=official-source-defect + examScoring=counted。

export const SOURCE_INTEGRITY_OK = 'ok';
export const DEFECT_KINDS = ['out-of-scope', 'multi-answer', 'ub', 'non-compilable', 'self-contradictory'];
export const EXAM_SCORING_VALUES = ['counted', 'excluded'];

/** 这题是否带有「已知问题」标记（'ok' 等同于没有标记）。 */
export function hasSourceDefect(question) {
    const status = question?.sourceIntegrity;
    return Boolean(status) && status !== SOURCE_INTEGRITY_OK;
}

/** 是否显式声明了计分口径（新字段）。 */
export function hasExplicitScoring(question) {
    return EXAM_SCORING_VALUES.includes(question?.examScoring);
}

/** 是否不参与得分统计。examScoring 优先；缺省时沿用旧语义。 */
export function isScoringExcluded(question) {
    if (hasExplicitScoring(question)) return question.examScoring === 'excluded';
    return hasSourceDefect(question);
}

/**
 * 模拟考试是否把这题移出卷面。只对**显式** examScoring='excluded' 的题生效：
 * 学生看到卷面里有题不算分只会困惑，直接移出更清楚。历史标记题保持原行为（展示但不计分）。
 */
export function isHiddenFromMockExam(question) {
    return hasExplicitScoring(question) && question.examScoring === 'excluded';
}

/** 题面是否可信、可进入考点练习默认池（计分题可信，排除题待核验）。 */
export function isTrustedForPractice(question) {
    return !isScoringExcluded(question);
}

/**
 * 练习模式展示策略：
 *  - 'none'    无标记
 *  - 'legacy'  历史标记：始终在题目上方展示警示
 *  - 'after'   新字段题：作答并查看答案后再展示缺陷说明，避免作答前剧透或干扰
 */
export function integrityNoticeTiming(question) {
    if (!hasSourceDefect(question)) return 'none';
    return hasExplicitScoring(question) ? 'after' : 'legacy';
}

/** 给 UI 用的一句话：这题计不计分、为什么。 */
export function scoringSummary(question) {
    if (!hasSourceDefect(question) && !hasExplicitScoring(question)) return null;
    if (!isScoringExcluded(question)) {
        return question?.defectKind === 'out-of-scope'
            ? '原卷有瑕疵，但不影响作答，本题正常计分'
            : '本题正常计分';
    }
    switch (question?.defectKind) {
        case 'multi-answer': return '原卷多解：除官方答案外另有选项同样成立，本题不计分';
        case 'ub': return '原卷代码依赖未定义行为，本题不计分';
        case 'non-compilable': return '原卷代码无法编译，本题不计分';
        case 'self-contradictory': return '原卷题面与数据或示例自相矛盾，本题不计分';
        default: return '本题不计分';
    }
}
