// 2023年9月 GESP C++ 二级真题 (第3次认证)
export const paperData = {
    id: '2023-09-l2',
    title: '2023年9月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 9,
    session: 3,
    note: '体系趋于稳定',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下代码输出什么？int a = 5; cout << a++ << \" \" << a;",
            options: ["5 5", "5 6", "6 6", "未定义行为"],
            answer: 3,
            score: 2,
            explanation: "在同一表达式中多次修改同一变量是未定义行为，不同编译器可能得到不同结果。"
        },
        {
            id: 2,
            type: 'single',
            question: "int* p; 这里 p 是什么类型？",
            options: ["整数", "整数数组", "指向整数的指针", "整数引用"],
            answer: 2,
            score: 2,
            explanation: "int* 表示指向 int 类型的指针。"
        },
        {
            id: 3,
            type: 'single',
            question: "以下哪个可以正确交换两个变量的值？",
            options: ["a = b; b = a;", "int t = a; a = b; b = t;", "a = a + b; b = a; a = b;", "swap(a, b); // 未定义函数"],
            answer: 1,
            score: 2,
            explanation: "使用临时变量 t 保存 a 的值，是正确的交换方法。"
        },
        {
            id: 4,
            type: 'judge',
            question: "数组名本质上是指向数组首元素的指针。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "在大多数表达式中，数组名会退化为指向首元素的指针。"
        }
    ]
};
