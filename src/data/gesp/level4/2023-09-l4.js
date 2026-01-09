// 2023年9月 GESP C++ 四级真题 (第3次认证)
export const paperData = {
    id: '2023-09-l4',
    title: '2023年9月 GESP C++ 四级真题',
    level: 4,
    year: 2023,
    month: 9,
    session: 3,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "Dijkstra 算法不能处理什么情况？",
            options: ["稀疏图", "稠密图", "负权边", "无向图"],
            answer: 2,
            score: 2,
            explanation: "Dijkstra 算法不能处理负权边，需要使用 Bellman-Ford 算法。"
        },
        {
            id: 2,
            type: 'single',
            question: "Floyd 算法的时间复杂度是？",
            options: ["O(V²)", "O(V³)", "O(E log V)", "O(VE)"],
            answer: 1,
            score: 2,
            explanation: "Floyd 算法使用三层循环，时间复杂度 O(V³)。"
        },
        {
            id: 3,
            type: 'single',
            question: "最小生成树的边数是？",
            options: ["V", "V-1", "E", "V+1"],
            answer: 1,
            score: 2,
            explanation: "连接 V 个顶点的树需要 V-1 条边。"
        },
        {
            id: 4,
            type: 'judge',
            question: "Prim 和 Kruskal 算法都能求最小生成树。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "Prim 从顶点出发，Kruskal 从边出发，都能求最小生成树。"
        }
    ]
};
