import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2023-03-l1',
  title: '2023年03月 GESP C++ 一级认证真题',
  level: 1,
  year: 2023,
  month: 3,
  session: 1,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    type: 'public-recovery',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    // 1-15 单选题
    {
      id: 1,
      type: 'single',
      question: '中国计算机学会（CCF）在（ ）年推出了 GESP 认证考试？',
      options: ['2021', '2022', '2023', '2024'],
      answer: 1,
      score: 2,
      explanation: 'GESP (编程能力等级认证) 是由 CCF 于 2022 年底正式推出。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: '第 2 代计算机主要使用的电子元件是（ ）。',
      options: ['晶体管', '电子管', '集成电路', '超大规模集成电路'],
      answer: 0,
      score: 2,
      explanation: '计算机发展史知识。第一代是电子管，第二代是晶体管。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: '512MB 等于（ ）。',
      options: [
        '512 * 1024 * 1024 字节',
        '512 * 1024 字节',
        '512 * 1000 * 1000 字节',
        '512 字节'
      ],
      answer: 0,
      score: 2,
      explanation: '存储单位转换：1MB = 1024KB, 1KB = 1024B。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 4,
      type: 'single',
      question: '下列哪个不是 C++ 语言的关键字？',
      options: ['double', 'using', 'longlong', 'namespace'],
      answer: 2,
      score: 2,
      explanation: '标准关键字是 long long（带空格），longlong 并非关键字。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 5,
      type: 'single',
      question: '执行语句 int a = 0.6; 后，变量 a 的值为（ ）。',
      options: ['0.6', '0', '1', '报错'],
      answer: 1,
      score: 2,
      explanation: '浮点数赋值给整型变量会发生截断，向下取整。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 6,
      type: 'single',
      question: '符合 C++ 语法的标识符是（ ）。',
      options: ['8th_exam', 'exam 8th', 'exam#8th', 'exam_8th'],
      answer: 3,
      score: 2,
      explanation: '标识符命名规则。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 7,
      type: 'single',
      question: '不符合 C++ 语法的表达式是（ ）。',
      options: ['a = 3 + 2;', 'a = (b = 3) + 2;', 'int a = 3.5;', 'int a = 3.5 % 2;'],
      answer: 3,
      score: 2,
      explanation: '取模运算符 % 左右必须为整数。3.5 是浮点数。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 8,
      type: 'single',
      question: '表达式 15 % 4 * 10 / 2 的计算结果是（ ）。',
      options: ['15', '1.5', '1', '0'],
      answer: 0,
      score: 2,
      explanation: '15 % 4 = 3; 3 * 10 = 30; 30 / 2 = 15。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 9,
      type: 'single',
      question: '表达式 (5 && 2) 的计算结果是（ ）。',
      options: ['true', 'false', '0', '1'],
      answer: 0, // C++ 中任何非零值作为布尔判断均为真。
      score: 2,
      explanation: '5 和 2 均为非零值，在逻辑与运算中判定为真。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 10,
      type: 'single',
      question: '执行语句 (a = 2) && (b = 0) 后，a 和 b 的值分别为（ ）。',
      options: ['a = 2, b = 2', 'a = 0, b = 0', 'a = 1, b = 0', 'a = 2, b = 0'],
      answer: 3,
      score: 2,
      explanation: '赋值表达式的结果是所赋的值。a=2后判定为真，继续执行 b=0。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 11,
      type: 'single',
      question: '判断变量 a 是否为偶数的正确表达式是（ ）。',
      options: ['a / 2 == 0', 'a % 2 == 0', 'a % 2 = 0', 'a / 2 = 0'],
      answer: 1,
      score: 2,
      explanation: '判断整除性。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 12,
      type: 'single',
      question: '判断三条边 a, b, c 能否构成三角形的逻辑表达式是（ ）。',
      options: [
        'a+b>c || a+c>b || b+c>a',
        'a+b<c && a+c<b && b+c<a',
        'a+b>c && a+c>b && b+c>a',
        'a+b==c'
      ],
      answer: 2,
      score: 2,
      explanation: '任意两边之和大于第三边。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator]
    },
    {
      id: 13,
      type: 'single',
      question: '执行 printf("5%%%%2={%%d}\\n", 5 %% 2); 结果为（ ）。',
      options: ['5%2={1}', '5%%2={1}', '5%2={%d}', '5%%2={%d}'],
      answer: 1,
      score: 2,
      explanation: '转义 %。',
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 14,
      type: 'single',
      question: '代码执行后的输出是 ( )。\n```cpp\nint a = 0;\nfor (int i = 1; i <= 4; i++)\n    a = a + i;\ncout << a;\n```',
      options: ['4', '10', '15', '0'],
      answer: 1,
      score: 2,
      explanation: '1+2+3+4 = 10。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 15,
      type: 'single',
      question: '代码执行后的输出是 ( )。\n```cpp\nint a = 5, b = 10;\nif (a > b) a = a + b;\nelse a = b - a;\ncout << a;\n```',
      options: ['15', '10', '5', '0'],
      answer: 2,
      score: 2,
      explanation: '10 - 5 = 5。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.basics]
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: '在计算机存储单位中，1KB 等于 1000 字节。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '1KB = 1024B。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: '编译器的主要作用是将高级语言编写的源代码翻译成目标代码。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '编译型语言的核心过程。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 18,
      type: 'judge',
      question: 'C++ 语言中，变量名不区分字母的大小写。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'C++ 严格区分大小写。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 19,
      type: 'judge',
      question: 'C++ 数据类型中，char 类型通常占用 1 个字节的内存空间。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '正确。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 20,
      type: 'judge',
      question: '在 C++ 中，执行语句 cout << 3 / 2; 的输出结果是 1.5。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '整除运算，结果为 1。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.io, LEVEL1_TAGS.operator]
    },
    {
      id: 21,
      type: 'judge',
      question: 'if 语句中的条件表达式必须是布尔类型（bool）。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '可以是任何能隐式转换为布尔值的类型（如整型，非零为真）。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.condition]
    },
    {
      id: 22,
      type: 'judge',
      question: 'for 循环的三个参数（初始化、条件、迭代）都可以省略。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '如 for(;;)。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 23,
      type: 'judge',
      question: 'break 语句只能用于跳出当前的循环结构（或 switch 语句）。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '正确用途。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 24,
      type: 'judge',
      question: '逻辑表达式 (5 > 2) || (3 < 1) 的值为 true。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'true || false 结果为真。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 25,
      type: 'judge',
      question: 'C++ 程序必须包含 iostream 头文件才能运行。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '只有需要使用输入输出流时才需要，最简单的程序可以不包含它。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      question: '【编程题1】每月天数\n输入年份和月份，输出该月共有多少天（考虑闰年）。',
      answer: '',
      score: 25,
      explanation: '条件判定配合逻辑或。LuoGu B3834。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition]
    },
    {
      id: 27,
      type: 'programming',
      question: '【编程题2】长方形面积\n输入正整数 $n$ 和 $m$，输出由 $n$ 和 $m$ 作为长和宽的长方形的面积。',
      answer: '',
      score: 25,
      explanation: '简单乘法运算。LuoGu B3835。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator]
    }
  ]
};
