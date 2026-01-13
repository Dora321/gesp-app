// 2024年9月 GESP C++ 八级真题
export const paperData = {
    id: '2024-09-l8',
    title: '2024年9月 GESP C++ 八级真题',
    level: 8,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "二叉索引树（Fenwick Tree）在求二维区间和时的复杂度是？",
            options: ["O(log n)", "O(log² n)", "O(n log n)", "O(√n)"],
            answer: 1,
            score: 2,
            explanation: "二维树状数组的单点修改和区间查询均为 O(log n * log m)，即 O(log² n)。"
        }
    ]
};
