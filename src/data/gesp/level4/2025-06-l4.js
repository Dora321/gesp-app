// 2025年6月 GESP C++ 四级真题
export const paperData = {
    id: '2025-06-l4',
    title: '2025年6月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: 'LCA（最近公共祖先）问题的在线算法是？',
            options: [
                'Tarjan',
                '倍增法',
                '树链剖分',
                '以上都可以'
            ],
            answer: 1,
            score: 2,
            explanation: '倍增法预处理后可以在线 O(log n) 查询 LCA。Tarjan 是离线算法。',
            tags: [
                '复杂度分析',
                '树与数据结构'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: '倍增法求 LCA 的预处理时间复杂度是？',
            options: [
                'O(n)',
                'O(n log n)',
                'O(n²)',
                'O(log n)'
            ],
            answer: 1,
            score: 2,
            explanation: '需要预处理每个节点的 2^k 级祖先，共 O(n log n)。',
            tags: [
                '复杂度分析',
                '树与数据结构'
            ]
        },
        {
            id: 3,
            type: 'single',
            question: '树上两点 u, v 之间的距离等于？',
            options: [
                'dep[u] + dep[v]',
                'dep[u] + dep[v] - dep[LCA]',
                'dep[u] + dep[v] - 2*dep[LCA]',
                '|dep[u] - dep[v]|'
            ],
            answer: 2,
            score: 2,
            explanation: 'dist(u,v) = dep[u] + dep[v] - 2*dep[LCA(u,v)]。',
            tags: [
                '树与数据结构'
            ]
        },
        {
            id: 4,
            type: 'judge',
            question: 'DFS 序可以将树上问题转化为区间问题。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: 'DFS 序将子树映射到连续区间，可以用线段树等数据结构处理。',
            tags: [
                '树与数据结构',
                '判断题'
            ]
        }
    ]
};
