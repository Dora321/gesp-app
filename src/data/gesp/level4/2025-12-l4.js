// 2025年12月 GESP C++ 四级真题
export const paperData = {
    id: '2025-12-l4',
    title: '2025年12月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: 'SPFA 算法是哪个算法的优化？',
            options: [
                'Dijkstra',
                'Bellman-Ford',
                'Floyd',
                'Prim'
            ],
            answer: 1,
            score: 2,
            explanation: 'SPFA 是 Bellman-Ford 的队列优化版本，可处理负权边。',
            tags: [
                '图论'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: '如何判断图中是否存在负环？',
            options: [
                'Dijkstra',
                'SPFA 记录入队次数',
                'Floyd',
                'BFS'
            ],
            answer: 1,
            score: 2,
            explanation: 'SPFA 中如果某点入队次数超过 n 次，说明存在负环。',
            tags: [
                '图论'
            ]
        },
        {
            id: 3,
            type: 'single',
            question: '差分约束系统可以转化为什么问题？',
            options: [
                '背包问题',
                '最短路问题',
                '匹配问题',
                '网络流问题'
            ],
            answer: 1,
            score: 2,
            explanation: '差分约束 x_i - x_j <= c 可建边 j->i 权值 c，跑最短路。',
            tags: [
                '图论',
                '动态规划'
            ]
        },
        {
            id: 4,
            type: 'judge',
            question: 'Dijkstra 使用优先队列优化后时间复杂度为 O(E log V)。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: '优先队列优化的 Dijkstra 每条边最多松弛一次，复杂度 O(E log V)。',
            tags: [
                '复杂度分析',
                '图论',
                '判断题'
            ]
        }
    ]
};
