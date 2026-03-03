// 2025年9月 GESP C++ 六级真题
export const paperData = {
    id: '2025-09-l6',
    title: '2025年9月 GESP C++ 六级真题',
    level: 6,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '广度优先搜索（BFS）常使用的辅助数据结构是？',
            options: [
                '栈 (Stack)',
                '队列 (Queue)',
                '哈希表',
                '并查集'
            ],
            answer: 1,
            score: 2,
            explanation: 'BFS 逐层扩展，利用先进先出（FIFO）的队列来存储待访问的相邻节点。',
            tags: [
                '图论',
                '字符串与哈希'
            ]
        }
    ]
};
