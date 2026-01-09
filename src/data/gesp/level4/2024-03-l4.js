// 2024年3月 GESP C++ 四级真题 (第5次认证)
export const paperData = {
    id: '2024-03-l4',
    title: '2024年3月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "完全背包和01背包的区别是？",
            options: ["物品价值不同", "物品可以重复选取", "容量限制不同", "优化目标不同"],
            answer: 1,
            score: 2,
            explanation: "完全背包中每种物品可以选无限次，01背包每种物品只能选一次。"
        },
        {
            id: 2,
            type: 'single',
            question: "完全背包问题中，为什么可以正序遍历容量？",
            options: ["提高效率", "物品可以重复使用", "减少代码量", "没有区别"],
            answer: 1,
            score: 2,
            explanation: "正序遍历时，dp[j-w[i]] 已经是包含了可能多次使用物品 i 的状态。"
        },
        {
            id: 3,
            type: 'single',
            question: "多重背包问题中，每种物品有什么限制？",
            options: ["只能用一次", "可以无限用", "有数量限制", "没有限制"],
            answer: 2,
            score: 2,
            explanation: "多重背包中每种物品有数量上限 k[i]，介于01和完全背包之间。"
        },
        {
            id: 4,
            type: 'judge',
            question: "背包问题可以用贪心算法求最优解。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "01背包不满足贪心选择性质，贪心无法得到最优解（分数背包可以）。"
        }
    ]
};
