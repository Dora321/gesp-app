// 2025年6月 GESP C++ 二级真题 (第10次认证)
export const paperData = {
    id: '2025-06-l2',
    title: '2025年6月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下代码输出什么？int x = 5; cout << (x > 3 ? \"yes\" : \"no\");",
            options: ["yes", "no", "5", "编译错误"],
            answer: 0,
            score: 2,
            explanation: "三元运算符：条件 ? 真值 : 假值。5 > 3 为真，输出 \"yes\"。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个运算符不能被重载？",
            options: ["+", "[]", "::", "=="],
            answer: 2,
            score: 2,
            explanation: ":: (作用域解析运算符) 不能被重载。"
        },
        {
            id: 3,
            type: 'single',
            question: "enum Color { RED, GREEN, BLUE }; RED 的值是？",
            options: ["1", "0", "RED", "未定义"],
            answer: 1,
            score: 2,
            explanation: "枚举类型默认从 0 开始编号，RED = 0, GREEN = 1, BLUE = 2。"
        },
        {
            id: 4,
            type: 'judge',
            question: "typedef int Integer; 之后可以用 Integer 代替 int。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "typedef 用于定义类型别名，Integer 就是 int 的别名。"
        }
    ]
};
