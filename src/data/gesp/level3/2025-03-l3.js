// 2025年3月 GESP C++ 三级真题 (第9次认证)
export const paperData = {
    id: '2025-03-l3',
    title: '2025年3月 GESP C++ 三级真题',
    level: 3,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "字符串哈希的主要用途是？",
            options: ["加密", "快速比较字符串", "压缩", "排序"],
            answer: 1,
            score: 2,
            explanation: "字符串哈希可以将字符串比较从 O(n) 降到 O(1)。"
        },
        {
            id: 2,
            type: 'single',
            question: "KMP 算法解决的问题是？",
            options: ["排序", "字符串匹配", "最短路径", "最大子序列"],
            answer: 1,
            score: 2,
            explanation: "KMP 是高效的字符串匹配算法，时间复杂度 O(n+m)。"
        },
        {
            id: 3,
            type: 'single',
            question: "以下哪个字符串函数复杂度最高？",
            options: ["s.length()", "s[i]", "s.substr()", "s.find()"],
            answer: 3,
            score: 2,
            explanation: "find() 需要遍历查找，最坏 O(n*m)。length() 和 [] 是 O(1)，substr 是 O(k)。"
        },
        {
            id: 4,
            type: 'judge',
            question: "string 的 + 运算符效率很高，可以大量使用。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "频繁的 + 会产生大量临时对象，应该用 append 或 stringstream。"
        }
    ]
};
