// 2023年6月 GESP C++ 七级真题
export const paperData = {
    id: '2023-06-l7',
    title: '2023年6月 GESP C++ 七级真题',
    level: 7,
    year: 2023,
    month: 6,
    session: 2,
    note: '首次开启5-8级',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "Tarjan 算法求强连通分量的时间复杂度是？",
            options: ["O(V²)", "O(V+E)", "O(E log V)", "O(V log V)"],
            answer: 1,
            score: 2,
            explanation: "Tarjan 算法通过一次 DFS 遍历所有点和边，因此时间复杂度为 O(V+E)。"
        }
    ]
};
