// 2024年6月 GESP C++ 八级真题
export const paperData = {
    id: '2024-06-l8',
    title: '2024年6月 GESP C++ 八级真题',
    level: 8,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "在求强连通分量后，将图缩点为 DAG，通常配合什么算法解决路径问题？",
            options: ["Bellman-Ford", "拓扑排序 + DP", "Prim", "Kruskal"],
            answer: 1,
            score: 2,
            explanation: "缩点后的 DAG 具有天然的阶段性，非常适合利用拓扑序进行动态规划（DP）。"
        }
    ]
};
