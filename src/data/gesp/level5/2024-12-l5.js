export const paperData = {
    id: '2024-12-l5', title: '2024年12月 GESP C++ 五级真题', level: 5, year: 2024, month: 12, session: 8, timeLimit: 90 * 60, questions: [
        { id: 1, type: 'single', question: "计数排序的时间复杂度是？", options: ["O(n log n)", "O(n+k)", "O(n²)", "O(k log k)"], answer: 1, score: 2, explanation: "计数排序遍历n个元素，桶大小为k，总复杂度O(n+k)。" },
        { id: 2, type: 'single', question: "基数排序适用于？", options: ["浮点数", "整数或定长字符串", "任意对象", "负数"], answer: 1, score: 2, explanation: "基数排序按位排序，适用于整数或定长字符串。" },
        { id: 3, type: 'judge', question: "桶排序是稳定排序。", options: ["正确", "错误"], answer: 0, score: 2, explanation: "若桶内使用稳定排序，则桶排序是稳定的。" },
        { id: 4, type: 'single', question: "非比较排序的下界是？", options: ["O(n log n)", "O(n)", "O(n²)", "无下界"], answer: 1, score: 2, explanation: "非比较排序可以突破O(n log n)下界，达到O(n)。" }
    ]
};
