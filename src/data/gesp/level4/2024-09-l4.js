// 2024年9月 GESP C++ 四级真题 (第7次认证)
export const paperData = {
    id: '2024-09-l4',
    title: '2024年9月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "堆排序的时间复杂度是？",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
            answer: 1,
            score: 2,
            explanation: "堆排序需要 O(n) 建堆，O(n log n) 排序，总体 O(n log n)。"
        },
        {
            id: 2,
            type: 'single',
            question: "堆的插入操作时间复杂度是？",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 1,
            score: 2,
            explanation: "插入元素后需要向上调整，最多调整 log n 层。"
        },
        {
            id: 3,
            type: 'single',
            question: "TOP-K 问题最优的解法是？",
            options: ["排序后取前K", "使用大小为K的堆", "遍历K次找最值", "快速选择算法"],
            answer: 3,
            score: 2,
            explanation: "快速选择算法平均 O(n) 时间复杂度，优于排序的 O(n log n)。"
        },
        {
            id: 4,
            type: 'judge',
            question: "最小堆的堆顶元素一定是最小值。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "最小堆的性质保证父节点不大于子节点，堆顶是最小值。"
        }
    ]
};
