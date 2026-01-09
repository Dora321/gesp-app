// 2025年12月 GESP C++ 二级真题 (第12次认证)
export const paperData = {
    id: '2025-12-l2',
    title: '2025年12月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下代码的输出是？int a = 1, b = 2; swap(a, b); cout << a << b;",
            options: ["12", "21", "编译错误", "运行错误"],
            answer: 1,
            score: 2,
            explanation: "swap 函数交换两个变量的值，输出 21。需要包含 <algorithm> 头文件。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个 STL 容器是 LIFO 结构？",
            options: ["queue", "stack", "vector", "list"],
            answer: 1,
            score: 2,
            explanation: "stack 是栈，后进先出 (LIFO)。queue 是队列，先进先出 (FIFO)。"
        },
        {
            id: 3,
            type: 'single',
            question: "sort(arr, arr+n) 默认按什么顺序排序？",
            options: ["降序", "升序", "随机", "不排序"],
            answer: 1,
            score: 2,
            explanation: "sort 默认按升序排列。可以传入第三个参数改变排序方式。"
        },
        {
            id: 4,
            type: 'judge',
            question: "map 容器的键值对是按键排序存储的。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "map 是有序关联容器，键值对按键的升序自动排序。"
        }
    ]
};
