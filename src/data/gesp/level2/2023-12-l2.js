// 2023年12月 GESP C++ 二级真题 (第4次认证)
export const paperData = {
    id: '2023-12-l2',
    title: '2023年12月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下哪种排序算法的时间复杂度最优？",
            options: ["冒泡排序 O(n²)", "选择排序 O(n²)", "快速排序 O(n log n)", "插入排序 O(n²)"],
            answer: 2,
            score: 2,
            explanation: "快速排序平均时间复杂度为 O(n log n)，优于 O(n²) 的排序算法。"
        },
        {
            id: 2,
            type: 'single',
            question: "二分查找的前提条件是？",
            options: ["数组元素个数为偶数", "数组已经排序", "数组元素都是正数", "数组元素不重复"],
            answer: 1,
            score: 2,
            explanation: "二分查找要求数组必须是有序的。"
        },
        {
            id: 3,
            type: 'single',
            question: "递归函数必须有什么？",
            options: ["循环语句", "终止条件", "全局变量", "函数指针"],
            answer: 1,
            score: 2,
            explanation: "递归函数必须有终止条件（基准情况），否则会无限递归导致栈溢出。"
        },
        {
            id: 4,
            type: 'judge',
            question: "strlen(\"Hello\") 的结果是 6。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "strlen 返回字符串长度，不包括末尾的 '\\0'，\"Hello\" 长度是 5。"
        }
    ]
};
