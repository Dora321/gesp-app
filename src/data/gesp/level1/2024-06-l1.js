// 2024年6月 GESP C++ 一级真题 (第6次认证)
export const paperData = {
    id: '2024-06',
    title: '2024年6月 GESP C++ 一级真题',
    level: 1,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "int a = 10, b = 3; cout << a / b; 输出什么？",
            options: ["3.33", "3", "4", "3.0"],
            answer: 1,
            score: 2,
            explanation: "两个整数相除结果为整数，10/3=3（小数部分被截断）。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个是 C++ 的逻辑或运算符？",
            options: ["&", "|", "&&", "||"],
            answer: 3,
            score: 2,
            explanation: "|| 是逻辑或运算符，&& 是逻辑与运算符，| 是按位或，& 是按位与。"
        },
        {
            id: 3,
            type: 'judge',
            question: "double 类型比 float 类型精度更高。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "double 是双精度浮点数（64位），float 是单精度浮点数（32位），double 精度更高。"
        }
    ]
};
