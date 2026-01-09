export const paperData = {
  id: '2025-03',
  title: '2025年3月 GESP C++ 一级真题',
  level: 1,
  year: 2025,
  month: 3,
  timeLimit: 90 * 60, // seconds
  questions: [
    {
      id: 1,
      type: 'single',
      question: "C++ 表达式 10 / 3 的值是？",
      options: ["3", "3.33", "4", "1"],
      answer: 0,
      score: 2,
      explanation: "在 C++ 中，两个整数相除的结果仍为整数，小数部分会被截断。10 / 3 = 3（余1）。"
    },
    {
      id: 2,
      type: 'single',
      question: "在 C++ 中，以下哪个关键字用于定义整型变量？",
      options: ["float", "char", "int", "double"],
      answer: 2,
      score: 2,
      explanation: "int 是 C++ 中用于定义整型变量的关键字。float 和 double 用于浮点数，char 用于字符。"
    },
    {
      id: 3,
      type: 'single',
      question: "表达式 (5 > 3) && (2 < 4) 的值是？",
      options: ["true", "false", "1", "0"],
      answer: 2,
      score: 2,
      explanation: "(5 > 3) 为真，(2 < 4) 也为真，逻辑与 (&&) 运算结果为真。在 C++ 中，真值通常用整数 1 表示。"
    },
    {
      id: 4,
      type: 'single',
      question: "C++ 中，cout << 'a' + 1; 输出的是？",
      options: ["a1", "b", "98", "Error"],
      answer: 2,
      score: 2,
      explanation: "字符 'a' 的 ASCII 码是 97，加 1 后是 98。由于是整数运算，输出的是数字 98 而不是字符 'b'。"
    },
    {
      id: 5,
      type: 'judge',
      question: "C++ 中，变量名可以以数字开头。",
      options: ["正确", "错误"],
      answer: 1,
      score: 2,
      explanation: "C++ 变量命名规则：变量名必须以字母或下划线开头，不能以数字开头。"
    },
    {
      id: 6,
      type: 'judge',
      question: "if 语句后面必须跟 else 语句。",
      options: ["正确", "错误"],
      answer: 1,
      score: 2,
      explanation: "if 语句可以单独使用，else 是可选的。只有当需要处理条件不成立的情况时才需要 else。"
    }
  ]
};
