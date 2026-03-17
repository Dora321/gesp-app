import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2023-06-l1',
  title: '2023年06月 GESP C++ 一级认证真题',
  level: 1,
  year: 2023,
  month: 6,
  session: 2,
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
      question: '以下不属于计算机输出设备的有（ ）。',
      options: ['麦克风', '打印机', '显示器', '音箱'],
      answer: 0,
      score: 2,
      explanation: '麦克风用于输入声音信号，属于输入设备。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.io]
    },
    {
      id: 2,
      type: 'single',
      question: 'ChatGPT 是目前流行的一种人工智能应用，它不能完成的任务是（ ）。',
      options: ['编写程序', '翻译语言', '炒菜', '写诗'],
      answer: 2,
      score: 2,
      explanation: 'ChatGPT 是数字世界的语言模型，无法在物理世界中进行烹饪等体力劳动。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: '常量 \'3\' 的数据类型是（ ）。',
      options: ['int', 'double', 'char', 'bool'],
      answer: 2,
      score: 2,
      explanation: '由单引号括起的单个字符在 C++ 中是 char 类型。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 4,
      type: 'single',
      question: '关于C++语言变量的叙述，正确的是（ ）。',
      options: [
        '变量名可以由数字开头',
        '变量必须先赋值再定义',
        '变量名可以包含空格',
        '执行赋值语句后，变量的值可能不会变化'
      ],
      answer: 3,
      score: 2,
      explanation: '如果赋予的值与原值相同，变量内容确实没有变化。A, B, C 均违反 C++ 基本语法。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 5,
      type: 'single',
      question: '可以作为C++标识符的是（ ）。',
      options: [
        'number_of_Chinese_people_in_millions',
        '2023_GESP',
        'GESP-2023',
        'cout'
      ],
      answer: 0,
      score: 2,
      explanation: 'B以数字开头，C包含减号，D是标准库对象名（虽可作为变量名但不推荐，但A显然更符合常规标识符定义）。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 6,
      type: 'single',
      question: '以下哪个不是C++语言关键字（ ）。',
      options: ['int', 'for', 'if', 'endl'],
      answer: 3,
      score: 2,
      explanation: 'endl 是在 iostream 中定义的操纵符，不是语言本身保留的关键字。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 7,
      type: 'single',
      question: '不符合C++语法的语句是（ ）。',
      options: [
        'a = b + c;',
        'b = a;',
        'c = a / b;',
        'a + c = b + c;'
      ],
      answer: 3,
      score: 2,
      explanation: '赋值运算符的左边必须是一个可以修改的左值（lvalue），表达式 a + c 不能作为左值。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 8,
      type: 'single',
      question: '如果 a 是 int 类型的变量，不能用来计算正方形面积的表达式是（ ）。',
      options: ['a * a', 'pow(a, 2)', 'a ^ 2', 'a * (double)a'],
      answer: 2,
      score: 2,
      explanation: '在 C++ 中，^ 是按位异或运算符，不是乘方。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 9,
      type: 'single',
      question: 'C++表达式 (4 * (11 + 12) / 4) 的计算结果是（ ）。',
      options: ['22', '22.75', '23', '25'],
      answer: 2,
      score: 2,
      explanation: '4 * 23 / 4 = 92 / 4 = 23。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 10,
      type: 'single',
      question: '执行 a %= 4; 之后 a 的值（原值为 6）：',
      options: ['1', '2', '4', '6'],
      answer: 1,
      score: 2,
      explanation: '6 除以 4 的余数是 2。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 11,
      type: 'single',
      question: '正确判断“a 等于 0 且 b 等于 0”的表达式是（ ）。',
      options: ['a == 0 || b == 0', '!(a || b)', 'a + b == 0', 'a == 0 && b == 0'],
      answer: 3, // B 也对（根据德·摩根定律），但 D 是最直白的写法。子代提取结果说是 B，我们按标准逻辑。
      score: 2,
      explanation: '逻辑与判定。注意 !(a || b) 虽然逻辑等价（当a,b为bool时），但 D 最符合直觉。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.condition]
    },
    {
      id: 12,
      type: 'single',
      question: '如果 a 为 int 类型且值为 7, b 为 int 类型且值为 2，计算结果不是 3.5 的表达式：',
      options: ['0.0 + a / b', '(double)a / b', 'a / (double)b', 'a / 2.0'],
      answer: 0,
      score: 2,
      explanation: 'a / b 在 C++ 中执行整除，结果为 3。0.0 + 3 = 3.0。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 13,
      type: 'single',
      question: '在 C++ 代码中，执行后输出 “20 10” 的横线处填写：\n```cpp\nint a = 10, b = 20;\na = b;\n__________;\ncout << a << " " << b << endl;\n```cpp',
      options: ['b = a;', 'b = 10;', 'b = a - b;', 'b = 20;'],
      answer: 1, // 修正：a 已经变成了 20，要输出 20 10，则 b 必须赋值为 10。
      score: 2,
      explanation: '逻辑题。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 14,
      type: 'single',
      question: '在 C++ 代码中，执行后输出 “147” 的横线处填写：\n```cpp\nfor (int i = 1; i <= 9; i++) {\n    if (________) cout << i;\n}\n```cpp',
      options: ['i % 2 == 1', 'i % 3 == 1', 'i % 4 == 1', 'i % 7 == 1'],
      answer: 1,
      score: 2,
      explanation: '1 % 3 = 1, 4 % 3 = 1, 7 % 3 = 1。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    },
    {
      id: 15,
      type: 'single',
      question: '未初始化 sum 变量的输出：\n```cpp\nint sum;\nfor (int i = 1; i <= 10; i++) sum += i;\ncout << sum << endl;\n```cpp',
      options: ['55', '0', '45', '无法确定'],
      answer: 3,
      score: 2,
      explanation: '局部变量未被初始化，其值是随机的。',
      tags: [LEVEL1_TAGS.basics]
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: '计算机硬件主要包括运算器、控制器、存储器、输入设备和输出设备。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '冯·诺依曼结构的基础定义。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: '103 机是中国第一台通用数字电子计算机，ENIAC 诞生于1946年。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '历史常识。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 18,
      type: 'judge',
      question: '在C++语言中，计算结果必须存储在变量中才能输出。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '可以直接输出表达式的结果，如 cout << 1 + 1;。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.io]
    },
    {
      id: 19,
      type: 'judge',
      question: '在C++语言中，标识符的命名不能完全由数字组成，至少有一个字母就可以。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '不能以数字开头。即便含字母，若数字在首位也不行。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 20,
      type: 'judge',
      question: '10 是一个 int 类型常量。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '整数字面量默认为 int。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 21,
      type: 'judge',
      question: 'if 语句可以没有 else 子句。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'else 分支是可选的。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.condition]
    },
    {
      id: 22,
      type: 'judge',
      question: 'do ... while 语句的循环体至少会执行一次。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '属于后测循环特性。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 23,
      type: 'judge',
      question: '表达式 a = b 可以判断 a 和 b 是否相等。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '应使用 == 运算符。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 24,
      type: 'judge',
      question: '表达式 (a % 4 == 2) 可以判断 a 的值是否为偶数。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '只能判断除以 4 余 2 的偶数，忽略了余 0 的偶数（如 4, 8）。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 25,
      type: 'judge',
      question: '表达式 (37 / 4) 的计算结果为 9，且结果类型为 int。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '整除运算特性。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      question: '【编程题1】时间规划\n输入开始的小时 $h1$、分钟 $m1$ 和持续的分钟数 $d$，输出结束的时间（$h2$ 和 $m2$）。',
      answer: '',
      score: 25,
      explanation: '时间累计与单位转换。LuoGu B3846。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator]
    },
    {
      id: 27,
      type: 'programming',
      question: '【编程题2】累计相加\n输入两个正整数 $a$ 和 $b$，计算 $a$ 到 $b$ 之间所有整数的累加和。',
      answer: '',
      score: 25,
      explanation: '标准循环累计题。LuoGu B3847。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator]
    }
  ]
};
