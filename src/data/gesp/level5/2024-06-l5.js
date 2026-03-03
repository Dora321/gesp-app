// 2024年6月 GESP C++ 五级真题
export const paperData = {
    id: '2024-06-l5',
    title: '2024年6月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '分块算法的块大小通常取？',
            options: [
                'n',
                '√n',
                'log n',
                'n/2'
            ],
            answer: 1,
            score: 2,
            explanation: '块大小取√n时，查询和修改复杂度均为O(√n)，达到平衡。',
            tags: [
                '复杂度分析'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: '莫队算法的时间复杂度是？',
            options: [
                'O(n)',
                'O(n√n)',
                'O(n log n)',
                'O(n²)'
            ],
            answer: 1,
            score: 2,
            explanation: '莫队通过分块排序查询，总复杂度O(n√n)。',
            tags: [
                '复杂度分析'
            ]
        },
        {
            id: 3,
            type: 'judge',
            question: '莫队算法可以处理带修改的查询。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: '带修莫队可以处理修改，但复杂度变为O(n^(5/3))。',
            tags: [
                '复杂度分析',
                '判断题'
            ]
        },
        {
            id: 4,
            type: 'single',
            question: '分块思想的核心是？',
            options: [
                '分治',
                '大段维护小段朴素',
                '递归',
                '迭代'
            ],
            answer: 1,
            score: 2,
            explanation: '分块将数据分成块，块间整体维护，块内暴力处理。',
            tags: [
                '基础概念'
            ]
        }
    ]
};
