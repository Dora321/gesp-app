// 2024年12月 GESP C++ 二级真题 (第8次认证)
export const paperData = {
    id: '2024-12-l2',
    title: '2024年12月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下代码的时间复杂度是？for(int i=0; i<n; i++) for(int j=0; j<n; j++) sum++;",
            options: ["O(n)", "O(n²)", "O(n log n)", "O(2n)"],
            answer: 1,
            score: 2,
            explanation: "两层嵌套循环，每层 n 次，总共 n×n 次，时间复杂度为 O(n²)。"
        },
        {
            id: 2,
            type: 'single',
            question: "以下哪个不是 C++ 的访问修饰符？",
            options: ["public", "private", "protected", "internal"],
            answer: 3,
            score: 2,
            explanation: "C++ 的访问修饰符是 public、private、protected。internal 是 C# 的修饰符。"
        },
        {
            id: 3,
            type: 'single',
            question: "string s = \"hello\"; s[0] = 'H'; 执行后 s 的值是？",
            options: ["hello", "Hello", "Hhello", "编译错误"],
            answer: 1,
            score: 2,
            explanation: "string 可以通过下标修改字符，s[0] = 'H' 将首字符改为大写。"
        },
        {
            id: 4,
            type: 'judge',
            question: "vector 的大小是固定的，创建后不能改变。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "vector 是动态数组，可以通过 push_back、resize 等方法改变大小。"
        }
    ]
};
