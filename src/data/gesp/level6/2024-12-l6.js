// 2024年12月 GESP C++ 六级真题
export const paperData = {
    id: '2024-12-l6',
    title: '2024年12月 GESP C++ 六级真题',
    level: 6,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "二分查找算法的时间复杂度为 O(log n)，其前提是？",
            options: ["数据量大", "数据必须有序", "数据必须是整数", "数据存储在链表中"],
            answer: 1,
            score: 2,
            explanation: "二分查找依赖于数据的有序性，通过比较中间值来缩小一半的搜索区间。"
        }
    ]
};
