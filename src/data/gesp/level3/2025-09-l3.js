// 2025年9月 GESP C++ 三级真题 (第11次认证)
export const paperData = {
    id: '2025-09-l3',
    title: '2025年9月 GESP C++ 三级真题',
    level: 3,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "priority_queue 默认是？",
            options: ["最小堆", "最大堆", "普通队列", "双端队列"],
            answer: 1,
            score: 2,
            explanation: "C++ priority_queue 默认是最大堆，堆顶是最大元素。"
        },
        {
            id: 2,
            type: 'single',
            question: "set 容器的底层实现是？",
            options: ["数组", "链表", "红黑树", "哈希表"],
            answer: 2,
            score: 2,
            explanation: "set 和 map 底层用红黑树实现，有序且查找 O(log n)。"
        },
        {
            id: 3,
            type: 'single',
            question: "unordered_map 的平均查找复杂度是？",
            options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
            answer: 0,
            score: 2,
            explanation: "unordered_map 用哈希表实现，平均查找 O(1)，最坏 O(n)。"
        },
        {
            id: 4,
            type: 'judge',
            question: "deque 可以在两端高效插入删除。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "deque（双端队列）支持在头尾 O(1) 插入删除。"
        }
    ]
};
