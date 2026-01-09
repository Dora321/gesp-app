// 2024年3月 GESP C++ 一级真题 (第5次认证)
export const paperData = {
    id: '2024-03',
    title: '2024年3月 GESP C++ 一级真题',
    level: 1,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下哪个是正确的变量名？",
            options: ["2name", "my-var", "_count", "class"],
            answer: 2,
            score: 2,
            explanation: "_count 是合法的变量名。变量名不能以数字开头，不能包含减号，不能是关键字。"
        },
        {
            id: 2,
            type: 'single',
            question: "cout << 5 + 3 * 2; 输出的结果是？",
            options: ["16", "11", "13", "10"],
            answer: 1,
            score: 2,
            explanation: "先算乘法 3*2=6，再算加法 5+6=11。"
        },
        {
            id: 3,
            type: 'judge',
            question: "在 C++ 中，= 和 == 的作用相同。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "= 是赋值运算符，== 是比较运算符，作用完全不同。"
        }
    ]
};
