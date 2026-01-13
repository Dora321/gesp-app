// 2023年12月 GESP C++ 三级真题 (第4次认证)
export const paperData = {
    id: '2023-12-l3',
    title: '2023年12月 GESP C++ 三级真题',
    level: 3,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "快速排序的平均时间复杂度是？",
            options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
            answer: 1,
            score: 2,
            explanation: "快速排序平均时间复杂度为 O(n log n)，最坏情况为 O(n²)。"
        },
        {
            id: 2,
            type: 'single',
            question: "前缀和数组的主要用途是？",
            options: ["排序", "快速求区间和", "查找元素", "去重"],
            answer: 1,
            score: 2,
            explanation: "前缀和可以在 O(1) 时间内求出任意区间的和。"
        },
        {
            id: 3,
            type: 'single',
            question: "差分数组的主要用途是？",
            options: ["排序", "区间查询", "区间修改", "二分查找"],
            answer: 2,
            score: 2,
            explanation: "差分数组可以在 O(1) 时间内对区间进行加减操作。"
        },
        {
            id: 4,
            type: 'judge',
            question: "归并排序是稳定的排序算法。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "归并排序在合并时可以保持相等元素的相对顺序，是稳定的排序算法。"
        }
    ]
};
