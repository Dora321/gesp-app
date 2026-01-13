// 2024年12月 GESP C++ 三级真题 (第8次认证)
export const paperData = {
    id: '2024-12-l3',
    title: '2024年12月 GESP C++ 三级真题',
    level: 3,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "STL 中 sort 使用的排序算法是？",
            options: ["快速排序", "归并排序", "混合排序(Introsort)", "堆排序"],
            answer: 2,
            score: 2,
            explanation: "C++ STL sort 使用 Introsort，结合快排、堆排和插入排序。"
        },
        {
            id: 2,
            type: 'single',
            question: "lower_bound 返回的是？",
            options: ["小于目标的最大位置", "大于等于目标的第一个位置", "等于目标的位置", "大于目标的第一个位置"],
            answer: 1,
            score: 2,
            explanation: "lower_bound 返回第一个大于等于目标值的迭代器位置。"
        },
        {
            id: 3,
            type: 'single',
            question: "unique 函数的作用是？",
            options: ["排序", "去除相邻重复元素", "去除所有重复元素", "查找唯一元素"],
            answer: 1,
            score: 2,
            explanation: "unique 只能去除相邻的重复元素，通常需要先排序再使用。"
        },
        {
            id: 4,
            type: 'judge',
            question: "stable_sort 保证相等元素的相对顺序不变。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "stable_sort 是稳定排序，保持相等元素的原始相对顺序。"
        }
    ]
};
