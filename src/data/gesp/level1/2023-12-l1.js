import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2023-12-l1',
  title: '2023年12月 GESP C++ 一级认证真题',
  level: 1,
  year: 2023,
  month: 12,
  session: 4,
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
      question: '下列不可做变量名的是( )。',
      options: ['CCF_GESP', 'CCF-GESP', 'CCFGESP', 'ccfGesp'],
      answer: 1,
      score: 2,
      explanation: '变量名不能包含减号。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: 'C++表达式 10 - 3 * (2 + 1) % 10 的值是( )。',
      options: ['0', '1', '7', '10'],
      answer: 1,
      score: 2,
      explanation: '10 - 3 * 3 % 10 = 10 - 9 = 1。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 3,
      type: 'single',
      question: '小杨同学现在是上午10点，求 N 小时后的时间是几点（24小时制）。横线处应选 ( )。\n```cpp\nint N;\ncin >> N;\ncout << ____________;\n```cpp',
      options: ['(10 + N) % 12', '(10 + N) % 24', '(10 + N) / 24', '10 + N'],
      answer: 1,
      score: 2,
      explanation: '使用取余运算计算 24 小时制时间。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 4,
      type: 'single',
      question: '判断正整数 N 是否为偶数的正确表达式是( )。',
      options: ['N % 2 == 0', 'N / 2 == 0', 'N % 2 = 0', 'N % 2 != 0'],
      answer: 0,
      score: 2,
      explanation: '常用判断偶数方法。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 5,
      type: 'single',
      question: 'C++表达式 sqrt(9.0) 的结果是( )。',
      options: ['3', '3.0', '9', '81'],
      answer: 1,
      score: 2,
      explanation: 'sqrt 返回浮点数。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 6,
      type: 'single',
      question: '下列哪个语句可以定义一个整型变量 a 并初始化为 10？',
      options: ['int a = 10;', 'float a = 10;', 'char a = 10;', 'a = 10;'],
      answer: 0,
      score: 2,
      explanation: '标准定义与初始化。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 7,
      type: 'single',
      question: '代码执行后的输出是 ( )。\n```cpp\nint Sum = 0;\nfor (int i = 1; i <= 10; i++)\n    Sum += i;\ncout << Sum;\n```cpp',
      options: ['45', '50', '55', '60'],
      answer: 2,
      score: 2,
      explanation: '1 到 10 之和为 55。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 8,
      type: 'single',
      question: '在 C++ 中，下列哪个运算符的优先级最高？',
      options: ['+', '*', '&&', '!'],
      answer: 3,
      score: 2,
      explanation: '逻辑非 ! 的优先级最高。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 9,
      type: 'single',
      question: '下列哪个函数用于在终端输出内容？',
      options: ['cin', 'scanf', 'cout', 'abs'],
      answer: 2,
      score: 2,
      explanation: 'cout 是标准输出流。',
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 10,
      type: 'single',
      question: '代码执行后的输出是 ( )。\n```cpp\nint a = 5, b = 2;\nif (a / b > 2) cout << "OK";\nelse cout << "KO";\n```cpp',
      options: ['OK', 'KO', '2.5', '报错'],
      answer: 1,
      score: 2,
      explanation: '5 / 2 = 2。2 > 2 不成立，输出 KO。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator]
    },
    {
      id: 11,
      type: 'single',
      question: '在 C++ 中，char 类型的变量占用的内存字节数是( )。',
      options: ['1', '2', '4', '8'],
      answer: 0,
      score: 2,
      explanation: 'char 占 1 字节。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 12,
      type: 'single',
      question: '二进制数 1101 转换为十进制数是( )。',
      options: ['11', '12', '13', '14'],
      answer: 2,
      score: 2,
      explanation: '1*8 + 1*4 + 0*2 + 1*1 = 13。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 13,
      type: 'single',
      question: 'C++ 程序开发的最后一个步骤通常是( )。',
      options: ['编辑', '编译', '运行/调试', '发布'],
      answer: 3,
      score: 2,
      explanation: '发布是软件交付的最后阶段。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 14,
      type: 'single',
      question: '下列关于注释的说法，错误的是( )。',
      options: [
        '注释不参与编译',
        '// 用于单行注释',
        '/* */ 用于多行注释',
        '注释必须写在代码之后'
      ],
      answer: 3,
      score: 2,
      explanation: '注释可以写在程序的任何位置。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 15,
      type: 'single',
      question: '典型的计算机体系结构采用的是( )。',
      options: ['图灵机', '冯·诺依曼架构', '哈佛架构', '神经元架构'],
      answer: 1,
      score: 2,
      explanation: '现代通用计算机大多采用冯·诺依曼架构。',
      tags: [LEVEL1_TAGS.basics]
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: 'C++ 是一种强类型语言，所有的变量都必须先定义后使用。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'C++ 要求严格声明类型。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: '逻辑表达式 true && false 的结果是 true。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '逻辑与要求两边都为真。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 18,
      type: 'judge',
      question: '在 C++ 中，一条语句必须以分号结尾。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '分号是语句结束符。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 19,
      type: 'judge',
      question: '010 在 C++ 中表示一个八进制数。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '以 0 开头的整数字面量表示八进制。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 20,
      type: 'judge',
      question: 'for 循环一定会有结束条件，否则会无限执行。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '逻辑结论。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 21,
      type: 'judge',
      question: 'continue 语句用于跳出整个循环。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'continue 只跳过当次。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 22,
      type: 'judge',
      question: '数组的下标从 1 开始。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'C++ 从 0 开始。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.array]
    },
    {
      id: 23,
      type: 'judge',
      question: '标识符 Name 和 name 在 C++ 中是相同的。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'C++ 区分大小写。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 24,
      type: 'judge',
      question: '! (10 > 5) 的值是 false。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '!(true) 为 false。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 25,
      type: 'judge',
      question: '编译器会将高级语言翻译成机器语言。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '编译器的主要工作。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      question: '【编程题1】小杨的考试\n输入三个整数，分别代表考试的天数、开始小时和持续小时数。输出考试结束时是星期几以及对应的小时（24小时制）。',
      answer: '',
      score: 25,
      explanation: '周期性时间计算。LuoGu B3921。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator, LEVEL1_TAGS.condition]
    },
    {
      id: 27,
      type: 'programming',
      question: '【编程题2】小杨报数\n输入一个正整数 $n$ 和一个数字 $x$，模拟报数游戏：从 1 到 $n$ 报数，如果数字中包含 $x$ 或能被 $x$ 整除，输出特殊标记。输出最后符合条件的数字个数。',
      answer: '',
      score: 25,
      explanation: '包含判断与整除判断。LuoGu B3922。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    }
  ]
};
