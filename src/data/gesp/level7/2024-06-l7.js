// 2024年6月 GESP C++ 七级真题
export const paperData = {
    id: '2024-06-l7',
    title: '2024年6月 GESP C++ 七级真题',
    level: 7,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "二分图的判定依据是？",
            options: ["图中不存在环", "图中存在偶数个顶点", "图中不存在奇数长度的环", "图中所有顶点的度数相等"],
            answer: 2,
            score: 2,
            explanation: "一个图是二分图的充要条件是不包含奇环。可以通过染色法（BFS/DFS）判定。"
        }
    ]
};
