// 2025年3月 GESP C++ 二级真题 (第9次认证)
export const paperData = {
    id: '2025-03-l2',
    title: '2025年3月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下哪个是正确的动态内存分配？",
            options: ["int* p = new int;", "int* p = malloc(int);", "int p = new int;", "new int* p;"],
            answer: 0,
            score: 2,
            explanation: "C++ 中使用 new 运算符动态分配内存，返回指针。"
        },
        {
            id: 2,
            type: 'single',
            question: "delete[] arr; 用于释放什么类型的内存？",
            options: ["单个变量", "动态数组", "静态数组", "栈内存"],
            answer: 1,
            score: 2,
            explanation: "delete[] 用于释放 new[] 分配的动态数组内存。"
        },
        {
            id: 3,
            type: 'single',
            question: "以下哪个头文件提供 vector 容器？",
            options: ["<array>", "<vector>", "<list>", "<container>"],
            answer: 1,
            score: 2,
            explanation: "<vector> 头文件提供 vector 容器类。"
        },
        {
            id: 4,
            type: 'judge',
            question: "new 分配的内存如果不 delete，程序结束后也不会被释放。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "程序结束时，操作系统会回收进程的所有内存。但在程序运行期间不释放会造成内存泄漏。"
        }
    ]
};
