// 2024年6月 GESP C++ 三级真题 (第6次认证)
export const paperData = {
    id: '2024-06-l3',
    title: '2024年6月 GESP C++ 三级真题',
    level: 3,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "递归的两个必要条件是？",
            options: ["循环和判断", "基准情况和递归调用", "参数和返回值", "全局变量和局部变量"],
            answer: 1,
            score: 2,
            explanation: "递归需要：1.基准情况（终止条件）2.递归调用（问题分解）。"
        },
        {
            id: 2,
            type: 'single',
            question: "汉诺塔问题移动 n 个盘子需要多少步？",
            options: ["n", "2n", "2ⁿ - 1", "n²"],
            answer: 2,
            score: 2,
            explanation: "汉诺塔问题的最少移动次数是 2ⁿ - 1。"
        },
        {
            id: 3,
            type: 'single',
            question: "以下哪种情况适合用递归？",
            options: ["简单的计数", "问题可分解为相似子问题", "需要大量循环", "处理大数组"],
            answer: 1,
            score: 2,
            explanation: "当问题可以分解为规模更小的相似子问题时，适合用递归。"
        },
        {
            id: 4,
            type: 'judge',
            question: "尾递归可以被编译器优化为循环。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "尾递归是指递归调用是函数的最后一个操作，可被优化避免栈溢出。"
        }
    ]
};
