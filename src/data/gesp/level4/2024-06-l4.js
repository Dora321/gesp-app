// 2024年6月 GESP C++ 四级真题
export const paperData = {
    id: '2024-06-l4',
    title: '2024年6月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: 'single',
            question: '最长递增子序列(LIS)的最优时间复杂度是？',
            options: [
                'O(n)',
                'O(n log n)',
                'O(n²)',
                'O(2ⁿ)'
            ],
            answer: 1,
            score: 2,
            explanation: '使用二分查找优化的 LIS 算法可以达到 O(n log n)。',
            tags: [
                '复杂度分析',
                '算法策略'
            ]
        },
        {
            id: 2,
            type: 'single',
            question: '区间 DP 的特点是？',
            options: [
                '按顺序处理',
                '按区间长度递增处理',
                '从中间向两边扩展',
                '从后向前处理'
            ],
            answer: 1,
            score: 2,
            explanation: '区间 DP 通常按区间长度从小到大枚举，用小区间更新大区间。',
            tags: [
                '动态规划'
            ]
        },
        {
            id: 3,
            type: 'single',
            question: '矩阵链乘法问题属于什么类型的 DP？',
            options: [
                '线性 DP',
                '区间 DP',
                '树形 DP',
                '状压 DP'
            ],
            answer: 1,
            score: 2,
            explanation: '矩阵链乘法需要确定区间内的最优分割点，是经典的区间 DP。',
            tags: [
                '树与数据结构',
                '动态规划'
            ]
        },
        {
            id: 4,
            type: 'judge',
            question: '状态转移方程必须能够完全覆盖所有情况。',
            options: [
                '正确',
                '错误'
            ],
            answer: 0,
            score: 2,
            explanation: 'DP 的状态定义和转移必须完备，否则会遗漏情况得到错误答案。',
            tags: [
                '动态规划',
                '判断题'
            ]
        }
    ]
};
