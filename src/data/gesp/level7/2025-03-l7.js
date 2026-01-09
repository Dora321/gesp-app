// 2025年3月 GESP C++ 七级真题
export const paperData = {
    id: '2025-03-l7',
    title: '2025年3月 GESP C++ 七级真题',
    level: 7,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "Tarjan 算法求无向图割点的核心判别条件是？",
            options: ["dfn[u] == low[u]", "low[v] >= dfn[u]", "dfn[u] < dfn[v]", "low[u] == low[v]"],
            answer: 1,
            score: 2,
            explanation: "对于非根节点 u，若其子节点 v 无法通过回边到达 u 或 u 的祖先（即 low[v] >= dfn[u]），则 u 是割点。"
        }
    ]
};
