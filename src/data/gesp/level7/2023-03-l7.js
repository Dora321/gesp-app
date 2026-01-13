// 2023年3月 GESP C++ 七级真题
export const paperData = {
    id: '2023-03-l7',
    title: '2023年3月 GESP C++ 七级真题',
    level: 7,
    year: 2023,
    month: 3,
    session: 1,
    note: '首次认证',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "在图论中，强连通分量（SCC）是针对哪种图定义的？",
            options: ["无向图", "有向图", "连通图", "完全图"],
            answer: 1,
            score: 2,
            explanation: "强连通分量是有向图中极大强连通子图。无向图中对应的概念是连通分量。"
        }
    ]
};
