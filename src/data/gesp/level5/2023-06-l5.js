// 2023年6月 GESP C++ 五级真题
export const paperData = {
    id: '2023-06-l5',
    title: '2023年6月 GESP C++ 五级真题',
    level: 5,
    year: 2023,
    month: 6,
    session: 2,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: 'ST表(Sparse Table)主要用于？',
            options: [
                '动态修改',
                '静态RMQ查询',
                '排序',
                '字符串匹配'
            ],
            answer: 1,
            score: 2,
            explanation: 'ST表用于静态区间最值查询，O(n log n)预处理，O(1)查询。',
            tags: [
                '复杂度分析',
                '树与数据结构',
                '字符串与哈希'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: 'ST表不能处理什么操作？',
            options: [
                '区间最大值',
                '区间最小值',
                '区间修改',
                '区间GCD'
            ],
            answer: 2,
            score: 2,
            explanation: 'ST表只能处理静态数据，不支持修改操作。',
            tags: [
                '树与数据结构'
            ]
        },
        {
            id: 3,
            type: 'judge',
            question: 'ST表的空间复杂度是O(n log n)。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: 'ST表需要存储n个位置，每个位置log n层的信息。',
            tags: [
                '复杂度分析',
                '树与数据结构',
                '判断题'
            ]
        },
        {
            id: 4,
            type: 'single',
            question: 'RMQ问题可以转化为什么问题？',
            options: [
                '排序',
                'LCA',
                '最短路',
                '背包'
            ],
            answer: 1,
            score: 2,
            explanation: 'RMQ和LCA问题可以相互转化。',
            tags: [
                '图论',
                '树与数据结构',
                '动态规划'
            ]
        }
    ]
};
