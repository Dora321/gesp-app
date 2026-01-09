// 2023年6月 GESP C++ 二级真题 (第2次认证)
export const paperData = {
    id: '2023-06-l2',
    title: '2023年6月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 6,
    session: 2,
    note: '首次开启5-8级',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "switch 语句中，如果没有 break，会发生什么？",
            options: ["编译错误", "只执行匹配的 case", "继续执行后续所有 case", "直接退出 switch"],
            answer: 2,
            score: 2,
            explanation: "没有 break 会发生 case 穿透，继续执行后续所有 case 的代码。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个运算符不能用于浮点数？",
            options: ["+", "-", "*", "%"],
            answer: 3,
            score: 2,
            explanation: "取模运算符 % 只能用于整数，不能用于浮点数。"
        },
        {
            id: 3,
            type: 'single',
            question: "char c = 'A'; c += 1; cout << c; 输出什么？",
            options: ["A", "B", "66", "65"],
            answer: 1,
            score: 2,
            explanation: "'A' 的 ASCII 码是 65，加 1 后是 66，对应字符 'B'。由于 c 是 char 类型，输出字符 B。"
        },
        {
            id: 4,
            type: 'judge',
            question: "continue 语句会跳出整个循环。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "continue 只跳过当前迭代，继续下一次循环。break 才会跳出整个循环。"
        }
    ]
};
