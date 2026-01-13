// 2025年9月 GESP C++ 一级真题 (第11次认证)
export const paperData = {
    id: '2025-09',
    title: '2025年9月 GESP C++ 一级真题',
    level: 1,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "cin >> x; 这条语句的作用是？",
            options: ["输出 x 的值", "从键盘输入值到 x", "声明变量 x", "比较 cin 和 x"],
            answer: 1,
            score: 2,
            explanation: "cin >> x; 表示从标准输入（键盘）读取数据存入变量 x。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个头文件提供数学函数？",
            options: ["<iostream>", "<cmath>", "<string>", "<vector>"],
            answer: 1,
            score: 2,
            explanation: "<cmath> 提供数学函数如 sqrt(), pow(), abs() 等。"
        },
        {
            id: 3,
            type: 'judge',
            question: "sizeof(int) 返回 int 类型占用的字节数。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "sizeof 运算符返回类型或变量占用的字节数。"
        }
    ]
};
