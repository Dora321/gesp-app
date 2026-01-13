// 2023年3月 GESP C++ 五级真题
export const paperData = {
    id: '2023-03-l5', title: '2023年3月 GESP C++ 五级真题', level: 5, year: 2023, month: 3, session: 1, note: '首次认证', timeLimit: 90 * 60,
    questions: [
        { id: 1, type: 'single', question: "线段树的单点修改时间复杂度是？", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], answer: 1, score: 2, explanation: "线段树高度为 log n，单点修改需要更新从叶到根的路径。" },
        { id: 2, type: 'single', question: "树状数组(BIT)主要用于？", options: ["排序", "前缀和查询与单点修改", "最短路径", "字符串匹配"], answer: 1, score: 2, explanation: "树状数组支持 O(log n) 的前缀和查询和单点修改。" },
        { id: 3, type: 'single', question: "线段树懒标记的作用是？", options: ["加速查询", "延迟区间更新", "减少空间", "简化代码"], answer: 1, score: 2, explanation: "懒标记将区间更新延迟到需要时再下传，实现 O(log n) 区间修改。" },
        { id: 4, type: 'judge', question: "树状数组可以实现区间修改区间查询。", options: ["正确", "错误"], answer: 0, score: 2, explanation: "使用差分树状数组可以实现区间修改区间查询。" }
    ]
};
