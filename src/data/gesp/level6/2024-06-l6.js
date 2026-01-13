// 2024年6月 GESP C++ 六级真题
export const paperData = {
    id: '2024-06-l6',
    title: '2024年6月 GESP C++ 六级真题',
    level: 6,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "对于无向图 G，含有 n 个顶点，若 G 是连通图且边数最少，则边数为？",
            options: ["n", "n-1", "n+1", "n/2"],
            answer: 1,
            score: 2,
            explanation: "连通图边数最少的情况即为一棵树，边数为 n-1。"
        }
    ]
};
