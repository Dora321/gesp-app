// 2024年9月 GESP C++ 二级真题 (第7次认证)
export const paperData = {
    id: '2024-09-l2',
    title: '2024年9月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下哪个是正确的结构体定义？",
            options: ["struct { int x; }", "struct Point { int x, y; };", "define struct Point", "Point struct { x, y }"],
            answer: 1,
            score: 2,
            explanation: "正确的结构体定义格式：struct 结构体名 { 成员列表 };"
        },
        {
            id: 2,
            type: 'single',
            question: "int a = 10; int& ref = a; ref = 20; 此时 a 的值是？",
            options: ["10", "20", "未定义", "编译错误"],
            answer: 1,
            score: 2,
            explanation: "ref 是 a 的引用，修改 ref 等于修改 a。"
        },
        {
            id: 3,
            type: 'single',
            question: "void func(int arr[]) 中，arr 实际上是什么？",
            options: ["数组", "指针", "引用", "值"],
            answer: 1,
            score: 2,
            explanation: "数组作为参数传递时会退化为指针。"
        },
        {
            id: 4,
            type: 'judge',
            question: "局部变量在函数结束后就被销毁。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "局部变量存储在栈上，函数返回时栈帧被回收，变量也被销毁。"
        }
    ]
};
