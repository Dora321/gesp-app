// 2023年9月 GESP C++ 一级真题 (第3次认证)
export const paperData = {
    id: '2023-09',
    title: '2023年9月 GESP C++ 一级真题',
    level: 1,
    year: 2023,
    month: 9,
    session: 3,
    note: '体系趋于稳定',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "#include <iostream> 的作用是？",
            options: ["定义变量", "包含头文件", "声明函数", "创建类"],
            answer: 1,
            score: 2,
            explanation: "#include 是预处理指令，用于包含头文件，iostream 提供输入输出功能。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个不是 C++ 的基本数据类型？",
            options: ["int", "float", "string", "char"],
            answer: 2,
            score: 2,
            explanation: "string 不是基本数据类型，而是标准库提供的类。int、float、char 都是基本数据类型。"
        },
        {
            id: 3,
            type: 'judge',
            question: "endl 和 '\\n' 的作用完全相同。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "虽然都能换行，但 endl 还会刷新输出缓冲区，而 '\\n' 只是换行。"
        }
    ]
};
