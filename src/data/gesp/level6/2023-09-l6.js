// 2023年9月 GESP C++ 六级真题
export const paperData = {
    id: '2023-09-l6',
    title: '2023年9月 GESP C++ 六级真题',
    level: 6,
    year: 2023,
    month: 9,
    session: 3,
    note: '体系趋于稳定',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "Dijkstra 算法求单源最短路径时，要求？",
            options: ["图中不能有环", "图中不能有负权边", "图必须是连通的", "图必须是有向图"],
            answer: 1,
            score: 2,
            explanation: "Dijkstra 算法基于贪心策略，无法贪心地处理负权边（一旦确定一个点的最短路就不会再更新，但负权边可能导致后续路径更短）。"
        }
    ]
};
