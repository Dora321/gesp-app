// 2024年9月 GESP C++ 一级真题 (第7次认证)
export const paperData = {
    id: '2024-09',
    title: '2024年9月 GESP C++ 一级真题',
    level: 1,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "if (x > 0) 语句中，当 x 等于多少时条件为真？",
            options: ["x = 0", "x = -1", "x = 1", "x = -5"],
            answer: 2,
            score: 2,
            explanation: "只有当 x > 0 时条件为真，选项中只有 1 大于 0。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个循环至少执行一次循环体？",
            options: ["for 循环", "while 循环", "do-while 循环", "以上都不是"],
            answer: 2,
            score: 2,
            explanation: "do-while 循环先执行循环体再判断条件，所以至少执行一次。"
        },
        {
            id: 3,
            type: 'judge',
            question: "break 语句可以跳出 if 语句。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "break 用于跳出循环或 switch 语句，不能跳出 if 语句。"
        }
    ]
};
