// 2025年12月 GESP C++ 三级真题 (第12次认证)
export const paperData = {
    id: '2025-12-l3',
    title: '2025年12月 GESP C++ 三级真题',
    level: 3,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "DFS 通常使用什么数据结构实现？",
            options: ["队列", "栈", "堆", "哈希表"],
            answer: 1,
            score: 2,
            explanation: "DFS 使用栈（或递归，本质也是栈）来实现深度优先遍历。"
        },
        {
            id: 2,
            type: 'single',
            question: "BFS 通常使用什么数据结构实现？",
            options: ["队列", "栈", "堆", "树"],
            answer: 0,
            score: 2,
            explanation: "BFS 使用队列来实现层次遍历/广度优先遍历。"
        },
        {
            id: 3,
            type: 'single',
            question: "回溯算法的核心思想是？",
            options: ["分治", "试探与回退", "贪心", "动态规划"],
            answer: 1,
            score: 2,
            explanation: "回溯法通过试探搜索，遇到死路就回退尝试其他分支。"
        },
        {
            id: 4,
            type: 'judge',
            question: "BFS 可以用于求无权图的最短路径。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "在无权图中，BFS 第一次到达终点的路径就是最短路径。"
        }
    ]
};
