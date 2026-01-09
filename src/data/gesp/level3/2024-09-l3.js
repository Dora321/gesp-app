// 2024年9月 GESP C++ 三级真题 (第7次认证)
export const paperData = {
    id: '2024-09-l3',
    title: '2024年9月 GESP C++ 三级真题',
    level: 3,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "模拟算法的核心思想是？",
            options: ["分治策略", "按题意一步步执行", "贪心选择", "动态转移"],
            answer: 1,
            score: 2,
            explanation: "模拟算法就是按照题目描述的过程一步一步执行。"
        },
        {
            id: 2,
            type: 'single',
            question: "枚举算法的时间复杂度通常是？",
            options: ["O(1)", "O(n) 或更高", "O(log n)", "无法确定"],
            answer: 1,
            score: 2,
            explanation: "枚举需要遍历所有可能的情况，时间复杂度取决于搜索空间大小。"
        },
        {
            id: 3,
            type: 'single',
            question: "高精度算法主要解决什么问题？",
            options: ["浮点精度", "超大整数运算", "小数运算", "科学计数"],
            answer: 1,
            score: 2,
            explanation: "高精度算法用于处理超出基本数据类型范围的大整数运算。"
        },
        {
            id: 4,
            type: 'judge',
            question: "位运算比普通算术运算更快。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "位运算直接操作二进制位，是CPU最基本的操作，比乘除更快。"
        }
    ]
};
