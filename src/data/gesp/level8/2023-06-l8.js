// 2023年6月 GESP C++ 八级真题
export const paperData = {
    id: '2023-06-l8',
    title: '2023年6月 GESP C++ 八级真题',
    level: 8,
    year: 2023,
    month: 6,
    session: 2,
    note: '首次开启5-8级',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "后缀数组（SA）配合 height 数组可以高效求出？",
            options: ["两字符串的最长公共子串", "最短路", "最小生成树", "最大流"],
            answer: 0,
            score: 2,
            explanation: "将两个字符串通过特殊字符拼接后求 SA 和 height，最长公共子串长度即为 height 数组中‘属于不同源字符串的相邻后缀’的最大值。"
        }
    ]
};
