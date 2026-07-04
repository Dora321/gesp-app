// 按考点（标签）聚合某一级别所有真题卷的客观题，供“按考点刷题”使用。
// 卷子按需 lazy 加载：只有进入考点练习页才会拉取该级别的全部卷文件。

import { getPaper, paperIds, paperMeta } from './index.js';

// 元信息类标签：级别/题型本身已有字段承载，不作为考点展示
const META_TAG = /^(GESP\s*\d+\s*级|客观题|单选题|判断题|编程题|应用题|真题)$/;

export function isMetaTag(tag) {
    return META_TAG.test(tag);
}

/**
 * 加载某级别全部试卷并按标签聚合客观题。
 * 返回 { topics: [{ tag, count }], tagMap: Map<tag, question[]> }
 * 其中 question 带 sourcePaperId / sourceLabel（如 "2024·03"）。
 */
export async function loadLevelTopics(level) {
    const ids = paperIds.filter((id) => paperMeta[id]?.level === level);
    const papers = (
        await Promise.all(ids.map(async (id) => ({ id, data: await getPaper(id) })))
    ).filter((item) => item.data);

    const tagMap = new Map();
    for (const { id, data } of papers) {
        const ym = `${data.year}·${String(data.month).padStart(2, '0')}`;
        for (const q of data.questions || []) {
            if (q.type !== 'single' && q.type !== 'judge') continue;
            for (const tag of q.tags || []) {
                if (isMetaTag(tag)) continue;
                if (!tagMap.has(tag)) tagMap.set(tag, []);
                tagMap.get(tag).push({ ...q, sourcePaperId: id, sourceLabel: ym });
            }
        }
    }

    const topics = [...tagMap.entries()]
        .map(([tag, questions]) => ({ tag, count: questions.length }))
        .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag, 'zh'));

    return { topics, tagMap };
}

/**
 * 把某个考点的题目合成一张“虚拟卷”，喂给 InteractiveAnalysisPage 复用整套练习体验。
 * 题目重编号为 1..n，并追加“真题 YYYY·MM”来源角标（作为标签展示）。
 */
export function buildTopicPaper(level, tag, tagQuestions) {
    const questions = tagQuestions.map((q, index) => ({
        ...q,
        id: index + 1,
        tags: [...new Set([...(q.tags || []).filter((t) => !isMetaTag(t)), `真题 ${q.sourceLabel}`])],
    }));

    return {
        id: `topic-${level}-${tag}`,
        title: `${'一二三四五六七八'[level - 1] || level}级考点练习 · ${tag}`,
        level,
        questions,
    };
}
