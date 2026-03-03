// 2025年9月 GESP C++ 四级真题
export const paperData = {
    id: '2025-09-l4',
    title: '2025年9月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '二分答案的适用条件是？',
            options: [
                '答案连续',
                '答案有序且满足单调性',
                '答案在固定范围',
                '答案可枚举'
            ],
            answer: 1,
            score: 2,
            explanation: '二分答案要求答案满足单调性：存在分界点使一侧可行另一侧不可行。',
            tags: [
                '算法策略'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: '三分法用于求什么类型函数的极值？',
            options: [
                '单调函数',
                '单峰/单谷函数',
                '周期函数',
                '任意函数'
            ],
            answer: 1,
            score: 2,
            explanation: '三分法适用于单峰或单谷函数，每次排除 1/3 区间。',
            tags: [
                '算法策略'
            ]
        },
        {
            id: 3,
            type: 'single',
            question: '整数二分时，为什么可能需要 mid = (l+r+1)/2？',
            options: [
                '避免精度问题',
                '避免死循环',
                '提高效率',
                '没有区别'
            ],
            answer: 1,
            score: 2,
            explanation: '当 l = r-1 且 check(mid) 为 true 时更新 l=mid，若用 (l+r)/2 会死循环。',
            tags: [
                '算法策略'
            ]
        },
        {
            id: 4,
            type: 'judge',
            question: '浮点数二分不需要考虑边界问题。',
            options: [
                '正确',
                '错误'
            ],
            answer: 1,
            score: 2,
            explanation: '浮点二分也需要设置精度 eps，通常循环固定次数或判断 r-l < eps。',
            tags: [
                '算法策略',
                '判断题'
            ]
        }
    ]
};
