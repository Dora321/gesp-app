// 2023年12月 GESP C++ 六级真题
export const paperData = {
    id: '2023-12-l6',
    title: '2023年12月 GESP C++ 六级真题',
    level: 6,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "Prim 算法和 Kruskal 算法的核心区别在于？",
            options: ["Prim 算法是贪心，Kruskal 是 DP", "Prim 从顶点出发扩展，Kruskal 从边出发扩展", "Prim 只能求有向图，Kruskal 只能求无向图", "Kruskal 时间复杂度总是优于 Prim"],
            answer: 1,
            score: 2,
            explanation: "Prim 算法维护一个已经包含在生成树中的顶点集合，每次寻找距离该集合最近的顶点；Kruskal 算法将边按权值排序，利用并查集维护连通性。"
        }
    ]
};
