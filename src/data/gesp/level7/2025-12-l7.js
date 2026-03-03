// 2025年12月 GESP C++ 七级真题
export const paperData = {
    id: '2025-12-l7',
    title: '2025年12月 GESP C++ 七级真题',
    level: 7,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '对于一个带权有向图，求所有顶点对之间的最短路径，Floyd 算法的复杂度是？',
            options: [
                'O(V²)',
                'O(V³)',
                'O(V²E)',
                'O(VE log V)'
            ],
            answer: 1,
            score: 2,
            explanation: 'Floyd 算法采用三层循环枚举中间点、起点和终点，复杂度为 O(V³)。',
            tags: [
                '复杂度分析',
                '图论'
            ]
        }
    ]
};
