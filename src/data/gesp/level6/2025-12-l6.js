// 2025年12月 GESP C++ 六级真题
export const paperData = {
    id: '2025-12-l6',
    title: '2025年12月 GESP C++ 六级真题',
    level: 6,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "对于一个有 n 个顶点的完全无向图，其边数为？",
            options: ["n(n-1)", "n(n-1)/2", "n²", "2n"],
            answer: 1,
            score: 2,
            explanation: "完全无向图中任意两点间都有边，边数为组合数 C(n,2) = n*(n-1)/2。"
        }
    ]
};
