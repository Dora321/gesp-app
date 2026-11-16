import { normalizeTopicTags } from '../data/gesp/topicTaxonomy.js';

// 知识点统计只数题目自带的人工 tags（先去掉「单选题」「GESP4级」这类元标签，
// 再按 topicTaxonomy 的别名合并同义标签）。题干推断不进入统计。
export const TAG_STATS_QUESTION_COLLECTIONS = [
    'questions',
    'programmingQuestions',
    'codingQuestions',
];

const levelOf = (paper) => {
    const explicit = Number(paper?.level);
    if (Number.isInteger(explicit) && explicit > 0) return explicit;
    const fromId = String(paper?.id || '').match(/-l(\d)$/)?.[1];
    return fromId ? Number(fromId) : null;
};

/**
 * 从试卷对象数组汇总本站题库标签统计。
 *
 * 返回 { [level]: { paperCount, tags: { [tag]: { papers, questions } } } }：
 * - paperCount：本站该级收录的试卷数（含历史练习卷）。
 * - papers：该级至少有一道题带此标签的试卷数。
 * - questions：该级带此标签的题目数（同一题内的重复标签只计一次）。
 */
export function buildKnowledgeTagStats(papers = []) {
    const stats = {};

    for (const paper of papers) {
        const level = levelOf(paper);
        if (!level) continue;

        const levelStats = stats[level] || (stats[level] = { paperCount: 0, tags: {} });
        levelStats.paperCount += 1;

        const seenQuestions = new Set();
        const questionCounts = new Map();

        for (const collection of TAG_STATS_QUESTION_COLLECTIONS) {
            const questions = Array.isArray(paper?.[collection]) ? paper[collection] : [];
            for (const question of questions) {
                const key = question?.id !== undefined && question?.id !== null
                    ? String(question.id)
                    : question;
                if (seenQuestions.has(key)) continue;
                seenQuestions.add(key);

                for (const tag of new Set(normalizeTopicTags(question?.tags))) {
                    questionCounts.set(tag, (questionCounts.get(tag) || 0) + 1);
                }
            }
        }

        for (const [tag, questionCount] of questionCounts) {
            const tagStats = levelStats.tags[tag] || (levelStats.tags[tag] = { papers: 0, questions: 0 });
            tagStats.papers += 1;
            tagStats.questions += questionCount;
        }
    }

    return stats;
}
