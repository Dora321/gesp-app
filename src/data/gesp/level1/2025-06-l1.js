// 2025年6月 GESP C++ 一级真题 (第10次认证)
export const paperData = {
    id: '2025-06',
    title: '2025年6月 GESP C++ 一级真题',
    level: 1,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下哪个是正确的数组声明？",
            options: ["int arr[];", "int arr[5];", "int[] arr;", "array int[5];"],
            answer: 1,
            score: 2,
            explanation: "C++ 中数组声明格式为：类型 数组名[大小];"
        },
        {
            id: 2,
            type: 'single',
            question: "字符串 \"Hello\" 的长度是？",
            options: ["4", "5", "6", "7"],
            answer: 1,
            score: 2,
            explanation: "\"Hello\" 有 5 个可见字符（H-e-l-l-o），长度为 5。"
        },
        {
            id: 3,
            type: 'judge',
            question: "数组下标从 1 开始。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "C++ 中数组下标从 0 开始，第一个元素是 arr[0]。"
        }
    ]
};
