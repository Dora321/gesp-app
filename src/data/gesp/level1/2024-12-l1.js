export const paperData = {
  id: '2024-12',
  title: '2024年12月 GESP C++ 一级真题',
  level: 1,
  year: 2024,
  month: 12,
  timeLimit: 90 * 60,
  questions: [
    {
      id: 1,
      type: 'single',
      question: "我们通常使用的计算机是基于（ ）体系结构的。",
      options: ["图灵", "冯·诺依曼", "爱因斯坦", "牛顿"],
      answer: 1,
      score: 2,
    },
    {
      id: 2,
      type: 'single',
      question: "以下哪个设备属于输出设备？",
      options: ["鼠标", "键盘", "显示器", "扫描仪"],
      answer: 2,
      score: 2,
    },
    {
      id: 3,
      type: 'single',
      question: "C++ 表达式 25 % 4 的值是？",
      options: ["6", "1", "6.25", "0"],
      answer: 1,
      score: 2,
    },
    {
      id: 4,
      type: 'judge',
      question: "计算机内部使用二进制来表示数据。",
      options: ["正确", "错误"],
      answer: 0,
      score: 2,
    },
    {
      id: 5,
      type: 'judge',
      question: "1KB 等于 1000 Byte。",
      options: ["正确", "错误"],
      answer: 1, // 1024
      score: 2
    }
  ]
};
