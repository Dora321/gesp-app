export const paperData = {
    id: '2024-09-l5', title: '2024年9月 GESP C++ 五级真题', level: 5, year: 2024, month: 9, session: 7, timeLimit: 90 * 60, questions: [
        { id: 1, type: 'single', question: "Manacher算法用于？", options: ["排序", "最长回文子串", "最短路", "字符串匹配"], answer: 1, score: 2, explanation: "Manacher算法可以在O(n)时间内求出最长回文子串。" },
        { id: 2, type: 'single', question: "Z函数(扩展KMP)求的是？", options: ["前缀函数", "s与s[i:]的最长公共前缀", "后缀数组", "最长回文"], answer: 1, score: 2, explanation: "Z函数z[i]表示s与s[i:]的最长公共前缀长度。" },
        { id: 3, type: 'judge', question: "后缀数组可以用于求最长公共子串。", options: ["正确", "错误"], answer: 0, score: 2, explanation: "将两个串拼接后求后缀数组和height数组，可求LCS。" },
        { id: 4, type: 'single', question: "后缀数组的O(n log n)构造算法是？", options: ["暴力排序", "倍增算法", "递归分治", "贪心"], answer: 1, score: 2, explanation: "倍增算法每次将比较长度翻倍，log n轮后完成排序。" }
    ]
};
