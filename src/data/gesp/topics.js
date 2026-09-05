// 按考点（标签）聚合某一级别所有真题卷的客观题，供“按考点刷题”使用。
// 卷子按需 lazy 加载：只有进入考点练习页才会拉取该级别的全部卷文件。

import { getPaper, paperIds, paperMeta } from './index.js';
import {
    getTopicGroup,
    normalizeTopicTags,
} from './topicTaxonomy.js';
import { inferTopicTags } from './topicInference.js';

// 人工标签优先；只有一道题完全没有知识点标签时，才用规则表兜底推断考点。
// 4~7 级的卷子只带元标签，没有这层兜底它们在「按考点练习」里几乎全部消失。
export const resolveTopicTags = (question) => {
    const authored = normalizeTopicTags(question.tags);
    return authored.length > 0 ? authored : inferTopicTags(question);
};

export { isMetaTag } from './topicTaxonomy.js';

/**
 * 加载某级别正式试卷并按标签聚合客观题。
 * 默认只返回题面完整的题；includePending 开启后纳入带 sourceIntegrity 的待核验题。
 * unofficial 历史占位卷在任何模式下都不会进入考点练习。
 */
export async function loadLevelTopics(level, { includePending = false } = {}) {
    const ids = paperIds.filter((id) => (
        paperMeta[id]?.level === level
        && !paperMeta[id]?.unofficial
    ));
    const papers = (
        await Promise.all(ids.map(async (id) => ({ id, data: await getPaper(id) })))
    ).filter((item) => item.data);

    const tagMap = new Map();
    let availableQuestionCount = 0;
    let pendingQuestionCount = 0;

    for (const { id, data } of papers) {
        const ym = `${data.year}·${String(data.month).padStart(2, '0')}`;
        for (const q of data.questions || []) {
            if (q.type !== 'single' && q.type !== 'judge') continue;
            const topicTags = resolveTopicTags(q);
            if (topicTags.length === 0) continue;
            if (q.sourceIntegrity) {
                pendingQuestionCount += 1;
                if (!includePending) continue;
            }
            availableQuestionCount += 1;

            for (const tag of topicTags) {
                if (!tagMap.has(tag)) tagMap.set(tag, []);
                tagMap.get(tag).push({ ...q, sourcePaperId: id, sourceLabel: ym });
            }
        }
    }

    const topics = [...tagMap.entries()]
        .map(([tag, questions]) => ({ tag, count: questions.length, group: getTopicGroup(tag) }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'zh'));

    return {
        topics,
        tagMap,
        stats: {
            paperCount: papers.length,
            availableQuestionCount,
            pendingQuestionCount,
        },
    };
}

/**
 * 把某个考点的题目合成一张“虚拟卷”，喂给 InteractiveAnalysisPage 复用整套练习体验。
 * 题目重编号为 1..n，并追加“真题 YYYY·MM”来源角标（作为标签展示）。
 */
export function buildTopicPaper(level, tag, tagQuestions) {
    const pendingQuestionCount = tagQuestions.filter((q) => q.sourceIntegrity).length;
    const questions = tagQuestions.map((q, index) => ({
        ...q,
        id: index + 1,
        tags: [
            ...new Set([
                ...resolveTopicTags(q),
                `${q.sourceIntegrity ? '待核验' : '真题'} ${q.sourceLabel}`,
            ]),
        ],
    }));
    const countLabel = `${questions.length} 题`;
    const pendingLabel = pendingQuestionCount > 0
        ? `，含 ${pendingQuestionCount} 道待核验题`
        : '，仅含题面完整真题';

    return {
        id: `topic-${level}-${tag}`,
        title: `${'一二三四五六七八'[level - 1] || level}级考点练习 · ${tag}（${countLabel}${pendingLabel}）`,
        level,
        questions,
        questionCount: questions.length,
        pendingQuestionCount,
    };
}
