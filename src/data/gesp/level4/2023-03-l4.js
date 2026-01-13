// 2023年3月 GESP C++ 四级真题 (第1次认证)
export const paperData = {
    id: '2023-03-l4',
    title: '2023年3月 GESP C++ 四级真题',
    level: 4,
    year: 2023,
    month: 3,
    session: 1,
    note: '首次认证',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "动态规划的核心思想是？",
            options: ["分治策略", "最优子结构和重叠子问题", "贪心选择", "回溯搜索"],
            answer: 1,
            score: 2,
            explanation: "动态规划利用最优子结构和重叠子问题，通过记忆化避免重复计算。"
        },
        {
            id: 2,
            type: 'single',
            question: "最长公共子序列(LCS)问题的时间复杂度是？",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
            answer: 2,
            score: 2,
            explanation: "LCS 的 DP 解法需要填充 n×m 的表格，时间复杂度 O(nm)。"
        },
        {
            id: 3,
            type: 'single',
            question: "01背包问题中，为什么要逆序遍历容量？",
            options: ["提高效率", "保证每个物品只用一次", "方便输出方案", "减少空间"],
            answer: 1,
            score: 2,
            explanation: "逆序遍历可以保证在更新 dp[j] 时，dp[j-w[i]] 还是未放入第 i 个物品的状态。"
        },
        {
            id: 4,
            type: 'judge',
            question: "所有能用贪心解决的问题也能用动态规划解决。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "贪心是动态规划的特例，满足贪心选择性质时可以简化为贪心。"
        }
    ]
};
