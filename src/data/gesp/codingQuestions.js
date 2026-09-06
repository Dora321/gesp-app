// GESP 三级以上的上机编程题占总分一半。但只有二、三级的卷文件内嵌了
// programmingQuestions，四到八级的 54 张卷子在数据里只有 25 道客观题。
//
// 缺的其实不是内容：luoguCodingByLevel 收了 8 个等级共 184 道洛谷题面，
// paperCodingMap 也把 90/92 卷映射到了具体题号。缺的是接线——解析模式
// （EnhancedPaperPage）会据此合成第 26、27 题，考试模式却不会，于是四级以上
// 的学生在「考试模式」下练的是半张卷，而且界面上看不出来。
//
// 这里把合成逻辑抽出来给两种模式共用，避免同一套规则在两个地方各写一遍、
// 然后慢慢长歪。

import { paperCodingMap } from './paperCodingMap.js';

export const CODING_QUESTION_IDS = [26, 27];

const hasQuestionId = (questions, id) => questions.some(
    (question) => Number(question.id) === id,
);

/** 这张卷子是否还缺上机编程题（卷文件里没有内嵌 26/27 题）。 */
export function needsSynthesizedCoding(questions = []) {
    return !CODING_QUESTION_IDS.every((id) => hasQuestionId(questions, id));
}

const toProblemMarkdown = (problem) => {
    if (!problem) return '题面暂缺，请稍后补齐。';
    const sections = [`## ${problem.pid} ${problem.title}`];
    if (problem.background) sections.push(`### 题目背景\n${problem.background}`);
    if (problem.description) sections.push(`### 题目描述\n${problem.description}`);
    if (problem.inputFormat) sections.push(`### 输入格式\n${problem.inputFormat}`);
    if (problem.outputFormat) sections.push(`### 输出格式\n${problem.outputFormat}`);
    sections.push(`### 原题链接\n${problem.url}`);
    return sections.join('\n\n');
};

const buildCodingQuestion = (id, problem) => ({
    id,
    type: 'coding',
    score: 25,
    question: problem
        ? `第${id}题（上机编程）：${problem.pid} ${problem.title}`
        : `第${id}题（上机编程）`,
    options: [],
    explanation: toProblemMarkdown(problem),
    tags: ['上机编程', '洛谷原题', problem?.pid || '题面待补'],
});

/**
 * 按 paperCodingMap 从洛谷题池里取出这张卷子对应的两道上机题。
 * 卷文件已内嵌 26/27 题时原样返回，不覆盖已有内容。
 */
export function withSynthesizedCoding(questions = [], { paperId, luoguPool = [] } = {}) {
    if (!needsSynthesizedCoding(questions)) {
        return [...questions].sort((a, b) => Number(a.id) - Number(b.id));
    }

    const byPid = new Map((luoguPool || []).map((problem) => [problem.pid, problem]));
    const mapped = paperCodingMap[paperId] || {};
    const merged = [...questions];

    for (const [index, id] of CODING_QUESTION_IDS.entries()) {
        if (hasQuestionId(questions, id)) continue;
        const pid = index === 0 ? mapped.q26 : mapped.q27;
        merged.push(buildCodingQuestion(id, byPid.get(pid) || null));
    }

    return merged.sort((a, b) => Number(a.id) - Number(b.id));
}

/**
 * 该卷第 N 题对应的洛谷原题链接；没有映射或映射到占位号（P0000…）时返回 null。
 * 考试模式和解析模式都要给学生一个「去洛谷提交」的入口，判定规则只写一处。
 */
export function getLuoguProblemUrl(paperId, questionId) {
    const pid = (paperCodingMap[paperId] || {})[`q${questionId}`];
    if (!pid || pid.startsWith('P0000')) return null;
    return `https://www.luogu.com.cn/problem/${pid}`;
}

/** 取某等级的洛谷题池；模块按需动态加载，避免把 180KB 题面压进首屏。 */
export async function loadLuoguPool(level) {
    try {
        const { luoguCodingByLevel } = await import('./luoguCodingByLevel.js');
        return luoguCodingByLevel[String(level)] || luoguCodingByLevel[level] || [];
    } catch {
        return [];
    }
}
