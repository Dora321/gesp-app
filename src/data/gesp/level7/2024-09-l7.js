// 2024年9月 GESP C++ 七级真题
export const paperData = {
    id: '2024-09-l7',
    title: '2024年9月 GESP C++ 七级真题',
    level: 7,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '二分图最大匹配中，匈牙利算法的时间复杂度是？',
            options: [
                'O(VE)',
                'O(V²E)',
                'O(E√V)',
                'O(V+E)'
            ],
            answer: 0,
            score: 2,
            explanation: '匈牙利算法每次寻找增广路的时间复杂度为 O(E)，总共最多寻找 V 次，因此复杂度为 O(VE)。',
            tags: [
                '复杂度分析',
                '图论',
                '算法策略'
            ]
        }
    ]
};
