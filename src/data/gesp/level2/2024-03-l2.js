// 2024年3月 GESP C++ 二级真题 (第5次认证)
export const paperData = {
    id: '2024-03-l2',
    title: '2024年3月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "int arr[3][4]; 这个二维数组共有多少个元素？",
            options: ["7", "12", "3", "4"],
            answer: 1,
            score: 2,
            explanation: "3行4列，共 3×4=12 个元素。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个是正确的字符串复制方式？",
            options: ["string a = b;", "char a[10]; a = \"hello\";", "strcpy(a, b);", "char a = \"hello\";"],
            answer: 2,
            score: 2,
            explanation: "C 风格字符串需要用 strcpy 复制。string 类型可以直接赋值。"
        },
        {
            id: 3,
            type: 'single',
            question: "函数参数按引用传递的好处是？",
            options: ["代码更简洁", "可以修改原始变量", "运行速度更快", "不需要返回值"],
            answer: 1,
            score: 2,
            explanation: "引用传递允许函数直接修改调用者的变量，而按值传递只是复制。"
        },
        {
            id: 4,
            type: 'judge',
            question: "static 局部变量的值在函数调用之间会保持。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "static 局部变量只初始化一次，其值在函数调用之间保持不变。"
        }
    ]
};
