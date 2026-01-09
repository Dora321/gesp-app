// 2023年12月 GESP C++ 一级真题 (第4次认证)
export const paperData = {
    id: '2023-12',
    title: '2023年12月 GESP C++ 一级真题',
    level: 1,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "C++ 中 bool 类型的取值范围是？",
            options: ["0 或 1", "true 或 false", "-1 或 1", "任意整数"],
            answer: 1,
            score: 2,
            explanation: "bool 类型只有两个值：true（真）和 false（假）。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个运算符优先级最高？",
            options: ["+", "*", "=", "=="],
            answer: 1,
            score: 2,
            explanation: "乘法 * 的优先级高于加法 +，赋值 = 和比较 == 优先级更低。"
        },
        {
            id: 3,
            type: 'judge',
            question: "int a = 5; a = a + 1; 执行后 a 的值是 6。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "a 初始值为 5，加 1 后变为 6。"
        }
    ]
};
