// 2023年12月 GESP C++ 七级真题
export const paperData = {
    id: '2023-12-l7',
    title: '2023年12月 GESP C++ 七级真题',
    level: 7,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: 'Dinic 算法的时间复杂度在一般图中为？',
            options: [
                'O(VE²)',
                'O(V²E)',
                'O(E√V)',
                'O(V+E)'
            ],
            answer: 1,
            score: 2,
            explanation: 'Dinic 算法通过构造分层图来寻找多条增广路，其时间复杂度上限为 O(V²E)。',
            tags: [
                '复杂度分析',
                '图论'
            ]
        }
    ]
};
