// 2025年6月 GESP C++ 八级真题
export const paperData = {
    id: '2025-06-l8',
    title: '2025年6月 GESP C++ 八级真题',
    level: 8,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: 'BSGS 算法主要用于求解？',
            options: [
                '大合数分解',
                '离散对数问题 (a^x ≡ b mod p)',
                '线性求逆元',
                '求原根'
            ],
            answer: 1,
            score: 2,
            explanation: 'BSGS（大步小步法）基于分块思想，在 O(√p) 时间内求解离散对数问题。',
            tags: [
                '复杂度分析'
            ]
        }
    ]
};
