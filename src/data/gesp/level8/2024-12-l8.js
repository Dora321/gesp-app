// 2024年12月 GESP C++ 八级真题
export const paperData = {
    id: '2024-12-l8',
    title: '2024年12月 GESP C++ 八级真题',
    level: 8,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '在求解最大权闭合子图问题时，通常将其转化为什么问题？',
            options: [
                '最小生成树',
                '最小割',
                '最短路',
                '拓扑排序'
            ],
            answer: 1,
            score: 2,
            explanation: '最大权闭合子图问题可以通过构造源汇点网络，通过‘总正权值 - 最小割’的方法求解。',
            tags: [
                '图论',
                '树与数据结构'
            ]
        }
    ]
};
