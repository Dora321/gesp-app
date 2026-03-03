// 2025年6月 GESP C++ 五级真题
export const paperData = {
    id: '2025-06-l5',
    title: '2025年6月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '博弈论中Nim游戏的必胜条件是？',
            options: [
                '先手必胜',
                '各堆异或为0',
                '各堆异或不为0',
                '后手必胜'
            ],
            answer: 2,
            score: 2,
            explanation: 'Nim游戏先手必胜当且仅当所有堆的异或和不为0。',
            tags: [
                '基础概念'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: 'SG函数的定义是？',
            options: [
                '后继状态SG值的最小值',
                '后继状态SG值的mex',
                '后继状态SG值的最大值',
                '后继状态SG值的和'
            ],
            answer: 1,
            score: 2,
            explanation: 'SG(x) = mex{SG(y) | y是x的后继状态}，mex是最小非负整数。',
            tags: [
                '基础概念'
            ]
        },
        {
            id: 3,
            type: 'judge',
            question: '多个独立游戏的SG值等于各游戏SG值的异或。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: '这是SG定理的核心内容，用于组合游戏分析。',
            tags: [
                '判断题'
            ]
        },
        {
            id: 4,
            type: 'single',
            question: '必败态的SG值是？',
            options: [
                '1',
                '0',
                '-1',
                '无穷大'
            ],
            answer: 1,
            score: 2,
            explanation: '必败态没有后继或所有后继都是必胜态，SG值为0。',
            tags: [
                '基础概念'
            ]
        }
    ]
};
