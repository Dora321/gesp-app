// 2023年9月 GESP C++ 八级真题
export const paperData = {
    id: '2023-09-l8',
    title: '2023年9月 GESP C++ 八级真题',
    level: 8,
    year: 2023,
    month: 9,
    session: 3,
    note: '体系趋于稳定',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "在动态规划优化中，斜率优化主要用于解决哪种形式的转移方程？",
            options: ["多重背包", "包含 i, j 乘积项的 1D/1D 方程", "树形 DP", "区间 DP"],
            answer: 1,
            score: 2,
            explanation: "当状态转移方程中存在 f(j) 和 g(i) 的乘积项时（如 i*j），传统的滑动窗口单调队列失效，需要使用斜率优化（维护凸包）。"
        }
    ]
};
