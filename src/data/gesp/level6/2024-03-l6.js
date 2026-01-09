// 2024年3月 GESP C++ 六级真题
export const paperData = {
    id: '2024-03-l6',
    title: '2024年3月 GESP C++ 六级真题',
    level: 6,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "对于 0-1 背包问题，以下哪种说法是错误的？",
            options: ["具有最优子结构性质", "子问题重叠", "可以使用贪心算法求得全局最优解", "状态转移方程为 dp[i][j] = max(dp[i-1][j], dp[i-1][j-w[i]] + v[i])"],
            answer: 2,
            score: 2,
            explanation: "0-1 背包问题不满足贪心选择性质（不能只看单位重量价值最高，因为物品不可分割）。"
        }
    ]
};
