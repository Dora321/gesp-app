// 2023年3月 GESP C++ 二级真题 (第1次认证)
export const paperData = {
    id: '2023-03-l2',
    title: '2023年3月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 3,
    session: 1,
    note: '首次认证',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下关于 for 循环的说法正确的是？",
            options: ["初始化表达式只执行一次", "条件表达式可以省略", "更新表达式必须是 i++", "循环体必须用大括号"],
            answer: 0,
            score: 2,
            explanation: "for 循环的初始化表达式只在循环开始前执行一次，条件表达式和更新表达式都可以省略。"
        },
        {
            id: 2,
            type: 'single',
            question: "int arr[5] = {1, 2}; 数组 arr[4] 的值是？",
            options: ["未定义", "0", "2", "随机值"],
            answer: 1,
            score: 2,
            explanation: "部分初始化的数组，未指定的元素会被自动初始化为 0。"
        },
        {
            id: 3,
            type: 'single',
            question: "以下哪个是正确的函数声明？",
            options: ["int func[];", "func int();", "int func();", "int() func;"],
            answer: 2,
            score: 2,
            explanation: "C++ 函数声明格式：返回类型 函数名(参数列表);"
        },
        {
            id: 4,
            type: 'judge',
            question: "while(1) 会形成无限循环。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "1 被视为真值，条件永远为真，形成无限循环。"
        }
    ]
};
