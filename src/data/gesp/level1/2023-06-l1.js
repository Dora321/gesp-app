// 2023年6月 GESP C++ 一级真题 (第2次认证)
export const paperData = {
    id: '2023-06',
    title: '2023年6月 GESP C++ 一级真题',
    level: 1,
    year: 2023,
    month: 6,
    session: 2,
    note: '首次开启5-8级',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "C++ 中用于声明常量的关键字是？",
            options: ["var", "let", "const", "static"],
            answer: 2,
            score: 2,
            explanation: "const 关键字用于声明常量，常量一旦初始化后不可修改。"
        },
        {
            id: 2,
            type: 'single',
            question: "表达式 15 % 4 的结果是？",
            options: ["3", "3.75", "4", "0"],
            answer: 0,
            score: 2,
            explanation: "% 是取模运算符，15 除以 4 余 3。"
        },
        {
            id: 3,
            type: 'judge',
            question: "C++ 中变量必须先声明后使用。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "C++ 要求变量必须先声明后才能使用，否则编译器会报错。"
        }
    ]
};
