// 2025年3月 GESP C++ 五级真题
export const paperData = {
    id: '2025-03-l5',
    title: '2025年3月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '欧拉路径存在的条件(无向图)是？',
            options: [
                '所有点度数为偶',
                '恰好0或2个奇度点',
                '连通即可',
                '存在环'
            ],
            answer: 1,
            score: 2,
            explanation: '无向图存在欧拉路径当且仅当图连通且奇度点个数为0或2。',
            tags: [
                '图论'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: '欧拉回路存在的条件(无向图)是？',
            options: [
                '恰好2个奇度点',
                '所有点度数为偶',
                '存在一个奇度点',
                '完全图'
            ],
            answer: 1,
            score: 2,
            explanation: '欧拉回路要求所有点度数为偶数且图连通。',
            tags: [
                '图论'
            ]
        },
        {
            id: 3,
            type: 'judge',
            question: 'Hierholzer算法可以求欧拉路径。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: 'Hierholzer是求欧拉路径/回路的经典算法。',
            tags: [
                '判断题'
            ]
        },
        {
            id: 4,
            type: 'single',
            question: '哈密顿路径与欧拉路径的区别是？',
            options: [
                '无区别',
                '哈密顿经过所有点，欧拉经过所有边',
                '哈密顿经过所有边',
                '欧拉经过所有点'
            ],
            answer: 1,
            score: 2,
            explanation: '哈密顿路径经过每个顶点恰好一次，欧拉路径经过每条边恰好一次。',
            tags: [
                '基础概念'
            ]
        }
    ]
};
