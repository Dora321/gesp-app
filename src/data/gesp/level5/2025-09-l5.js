// 2025年9月 GESP C++ 五级真题
export const paperData = {
    id: '2025-09-l5',
    title: '2025年9月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '中国剩余定理(CRT)解决什么问题？',
            options: [
                '最大公约数',
                '一元线性同余方程组',
                '素数判定',
                '因数分解'
            ],
            answer: 1,
            score: 2,
            explanation: 'CRT用于求解一组模数互质的线性同余方程。',
            tags: [
                '基础概念'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: '快速幂的时间复杂度是？',
            options: [
                'O(n)',
                'O(log n)',
                'O(√n)',
                'O(n²)'
            ],
            answer: 1,
            score: 2,
            explanation: '快速幂通过倍增思想，将指数二进制分解，O(log n)次乘法。',
            tags: [
                '复杂度分析'
            ]
        },
        {
            id: 3,
            type: 'judge',
            question: '扩展欧几里得可以求乘法逆元。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: '当gcd(a,m)=1时，扩展欧几里得可以求a关于m的逆元。',
            tags: [
                '判断题'
            ]
        },
        {
            id: 4,
            type: 'single',
            question: '费马小定理的内容是？',
            options: [
                'a^p ≡ a (mod p)',
                'a^(p-1) ≡ 1 (mod p)',
                'a^p ≡ 1 (mod p)',
                'a^(p+1) ≡ a (mod p)'
            ],
            answer: 1,
            score: 2,
            explanation: '当p为质数且gcd(a,p)=1时，a^(p-1) ≡ 1 (mod p)。',
            tags: [
                '基础概念'
            ]
        }
    ]
};
