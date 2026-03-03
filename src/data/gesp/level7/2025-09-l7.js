// 2025年9月 GESP C++ 七级真题
export const paperData = {
    id: '2025-09-l7',
    title: '2025年9月 GESP C++ 七级真题',
    level: 7,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '在有向图中，缩点操作通常是基于？',
            options: [
                '最小生成树',
                '最短路',
                '强连通分量 (SCC)',
                '拓扑序列'
            ],
            answer: 2,
            score: 2,
            explanation: '通过 Tarjan 或 Kosaraju 将图中的每个强连通分量缩为一个新点，可将有向图转化为有向无环图（DAG）。',
            tags: [
                '图论',
                '树与数据结构'
            ]
        }
    ]
};
