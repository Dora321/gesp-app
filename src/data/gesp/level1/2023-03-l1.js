// 2023年3月 GESP C++ 一级真题 (第1次认证)
export const paperData = {
    id: '2023-03',
    title: '2023年3月 GESP C++ 一级真题',
    level: 1,
    year: 2023,
    month: 3,
    session: 1,
    note: '首次认证',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "C++ 程序的入口函数是？",
            options: ["start()", "begin()", "main()", "init()"],
            answer: 2,
            score: 2,
            explanation: "C++ 程序从 main() 函数开始执行，这是程序的入口点。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个是正确的 C++ 注释？",
            options: ["# 注释", "// 注释", "/* 注释", "-- 注释"],
            answer: 1,
            score: 2,
            explanation: "C++ 使用 // 进行单行注释，/* */ 进行多行注释。"
        },
        {
            id: 3,
            type: 'judge',
            question: "cout 用于输入数据。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "cout 用于输出数据，cin 用于输入数据。"
        }
    ]
};
