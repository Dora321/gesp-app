// 2023年6月 GESP C++ 三级真题 (第2次认证)
export const paperData = {
    id: '2023-06-l3',
    title: '2023年6月 GESP C++ 三级真题',
    level: 3,
    year: 2023,
    month: 6,
    session: 2,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "冒泡排序的最好时间复杂度是？",
            options: ["O(n)", "O(n²)", "O(n log n)", "O(1)"],
            answer: 0,
            score: 2,
            explanation: "当数组已经有序时，优化版冒泡排序只需遍历一次，时间复杂度为 O(n)。"
        },
        {
            id: 2,
            type: 'single',
            question: "栈的特点是？",
            options: ["先进先出", "后进先出", "随机访问", "双端操作"],
            answer: 1,
            score: 2,
            explanation: "栈是 LIFO（后进先出）数据结构。"
        },
        {
            id: 3,
            type: 'single',
            question: "队列的特点是？",
            options: ["先进先出", "后进先出", "只能在头部操作", "只能在尾部操作"],
            answer: 0,
            score: 2,
            explanation: "队列是 FIFO（先进先出）数据结构。"
        },
        {
            id: 4,
            type: 'judge',
            question: "选择排序是稳定的排序算法。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "选择排序会交换不相邻的元素，可能改变相等元素的相对顺序，是不稳定的。"
        }
    ]
};
