// 2023年3月 GESP C++ 三级真题 (第1次认证)
export const paperData = {
    id: '2023-03-l3',
    title: '2023年3月 GESP C++ 三级真题',
    level: 3,
    year: 2023,
    month: 3,
    session: 1,
    note: '首次认证',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "斐波那契数列的递推公式是？",
            options: ["F(n) = F(n-1) + F(n-2)", "F(n) = F(n-1) * F(n-2)", "F(n) = 2 * F(n-1)", "F(n) = F(n-1) - F(n-2)"],
            answer: 0,
            score: 2,
            explanation: "斐波那契数列：F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)。"
        },
        {
            id: 2,
            type: 'single',
            question: "二分查找在最坏情况下的时间复杂度是？",
            options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
            answer: 2,
            score: 2,
            explanation: "二分查找每次将搜索范围减半，时间复杂度为 O(log n)。"
        },
        {
            id: 3,
            type: 'single',
            question: "以下哪个算法不是排序算法？",
            options: ["快速排序", "归并排序", "深度优先搜索", "堆排序"],
            answer: 2,
            score: 2,
            explanation: "深度优先搜索(DFS)是图遍历算法，不是排序算法。"
        },
        {
            id: 4,
            type: 'judge',
            question: "递归一定可以用循环来实现。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "理论上任何递归都可以用栈+循环来模拟实现。"
        }
    ]
};
