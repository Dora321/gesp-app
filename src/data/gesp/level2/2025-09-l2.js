// 2025年9月 GESP C++ 二级真题 (第11次认证)
export const paperData = {
    id: '2025-09-l2',
    title: '2025年9月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "以下哪个是正确的文件打开方式？",
            options: ["open(\"file.txt\")", "fstream f(\"file.txt\")", "file.open(\"file.txt\")", "read(\"file.txt\")"],
            answer: 1,
            score: 2,
            explanation: "可以在构造函数中直接打开文件：fstream f(\"file.txt\")。"
        },
        {
            id: 2,
            type: 'single',
            question: "getline(cin, str) 和 cin >> str 的区别是？",
            options: ["没有区别", "getline 可以读取空格", "cin >> 更快", "getline 只能读取一个字符"],
            answer: 1,
            score: 2,
            explanation: "getline 读取整行包括空格，cin >> 遇到空格就停止。"
        },
        {
            id: 3,
            type: 'single',
            question: "以下哪个可以用于格式化输出？",
            options: ["<format>", "<iomanip>", "<stdio>", "<output>"],
            answer: 1,
            score: 2,
            explanation: "<iomanip> 提供 setw, setprecision 等格式化操作符。"
        },
        {
            id: 4,
            type: 'judge',
            question: "cin.fail() 可以检测输入是否失败。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "cin.fail() 返回 true 表示上一次输入操作失败（如类型不匹配）。"
        }
    ]
};
