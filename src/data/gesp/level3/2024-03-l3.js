// 2024年3月 GESP C++ 三级真题 (第5次认证)
export const paperData = {
    id: '2024-03-l3',
    title: '2024年3月 GESP C++ 三级真题',
    level: 3,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "链表相比数组的优点是？",
            options: ["随机访问快", "插入删除效率高", "占用内存少", "实现简单"],
            answer: 1,
            score: 2,
            explanation: "链表在任意位置插入删除只需 O(1)，而数组需要移动元素 O(n)。"
        },
        {
            id: 2,
            type: 'single',
            question: "双指针技巧通常用于？",
            options: ["排序", "遍历优化", "动态规划", "图搜索"],
            answer: 1,
            score: 2,
            explanation: "双指针常用于数组和链表的遍历优化，如快慢指针、左右指针等。"
        },
        {
            id: 3,
            type: 'single',
            question: "以下哪个不是贪心算法的例子？",
            options: ["活动选择问题", "霍夫曼编码", "最短路径Dijkstra", "0-1背包问题"],
            answer: 3,
            score: 2,
            explanation: "0-1背包问题需要用动态规划，贪心算法无法得到最优解。"
        },
        {
            id: 4,
            type: 'judge',
            question: "二分查找只能用于有序数组。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "二分查找要求数据有序，才能根据中间值判断目标在哪一半。"
        }
    ]
};
