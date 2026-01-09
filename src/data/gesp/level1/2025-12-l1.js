// 2025年12月 GESP C++ 一级真题 (第12次认证)
export const paperData = {
    id: '2025-12',
    title: '2025年12月 GESP C++ 一级真题',
    level: 1,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下哪个是自增运算符？",
            options: ["+=", "++", "+", "=+"],
            answer: 1,
            score: 2,
            explanation: "++ 是自增运算符，使变量的值增加 1。"
        },
        {
            id: 2,
            type: 'single',
            question: "switch 语句中，default 的作用是？",
            options: ["必须存在", "处理未匹配的情况", "声明默认变量", "结束 switch"],
            answer: 1,
            score: 2,
            explanation: "default 用于处理所有 case 都不匹配时的情况，是可选的。"
        },
        {
            id: 3,
            type: 'judge',
            question: "for(int i=0; i<5; i++) 会执行 5 次循环体。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "i 从 0 到 4，共执行 5 次（i=0,1,2,3,4）。"
        }
    ]
};
