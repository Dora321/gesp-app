import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2025-09-l1',
  title: '2025年09月 GESP C++ 一级认证真题',
  level: 1,
  year: 2025,
  month: 9,
  session: 11,
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
      question: '人工智能现在非常火，小杨就想多了解一下，其中就经常听人提到“大模型”。那么请问这里说的“大模型”最贴切意指( )。',
      options: ['大电脑模型', '大规模智能', '智能单位', '大语言模型'],
      answer: 3,
      score: 2,
      explanation: '在人工智能领域，“大模型”通常指大语言模型（Large Language Models），如 GPT 系列。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: '小杨这学期刚开学就选修了一门编程课程，然后就想编写程序来计算1到10001之间的所有偶数的和。他希望程序用简单易懂且执行效率高，请问下列关于实现该程序时采用的主要控制结构哪个说法最不合适 ( )。',
      options: ['循环结构', '循环和分支结合', '仅使用顺序结构', '不使用分支结构'],
      answer: 2,
      score: 2,
      explanation: '计算 1 到 10001 之间的偶数和需要重复操作，必须使用循环结构。仅用顺序结构无法实现。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: '关于下边的C++代码用于输入姓名，然后输出姓名，正确的说法是( )。\n```cpp\nstring XingMing;\ncout << "请输入您的姓名：";\ncin >> XingMing;\ncout << XingMing;\n```',
      options: [
        'XingMing 是汉语拼音，不能作为变量名',
        '可以将 XingMing 改为 Xing Ming',
        '可以将 XingMing 改为 xingming',
        '可以将 XingMing 改为 Xing-Ming'
      ],
      answer: 2,
      score: 2,
      explanation: '变量名不能包含空格（B错误）或连字符（D错误）。拼音可以作为变量名（A错误）。xingming 是合法的变量名。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.io]
    },
    {
      id: 4,
      type: 'single',
      question: '下列C++代码中a和b都是整型变量，执行后，其结果是( )。\n```cpp\na = 13;\nb = 5;\ncout << a / b << a % a * b;\n```',
      options: ['2.60', '23', '20', '以上都不准确'],
      answer: 2,
      score: 2,
      explanation: 'a / b = 13 / 5 = 2（整除）；a % a = 13 % 13 = 0；0 * 5 = 0。连续输出 2 和 0，结果为 20。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 5,
      type: 'single',
      question: 'C++表达式 3 * 4 % 5 / 6 的值是( )。',
      options: ['10', '5', '2', '0'],
      answer: 3,
      score: 2,
      explanation: '3 * 4 = 12；12 % 5 = 2；2 / 6 = 0（整除）。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 6,
      type: 'single',
      question: '下面的C++代码中变量 N 和 M 都是整型，则执行时如果先输入10并输入1个空格后输入20并回车，其输出的数值是( )。\n```cpp\nscanf("%d", &N);\nscanf("%d", &M);\nprintf("%d", N+M);\n```',
      options: ['30', '1020', '{N+M}', '不输出，继续等待输入'],
      answer: 0,
      score: 2,
      explanation: 'scanf 以空格作为分隔符读取整数。N=10, M=20, N+M=30。',
      tags: [LEVEL1_TAGS.io, LEVEL1_TAGS.basics]
    },
    {
      id: 7,
      type: 'single',
      question: '当前是9月，编写C++代码求 N 个月后的月份。横线处应填入的代码是 ( )。\n```cpp\nint N, M;\ncin >> N;\nM = ________;\nif (M == 0) printf("%d个月后是12月", N);\nelse printf("%d个月后是%d月", N, M);\n```',
      options: ['N % 12', '9+N % 12', '(9+N) / 12', '(9+N) % 12'],
      answer: 3,
      score: 2,
      explanation: '月份计算通常使用取余运算。(9+N) % 12 能正确得到 N 个月后的月份（假设 0 代表 12 月）。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 8,
      type: 'single',
      question: '下面C++代码执行后的输出是 ( )。\n```cpp\nint n = 0;\nfor (int i = 0; i < 100; i++)\n  n += i % 2;\ncout << n;\n```',
      options: ['5050', '4950', '50', '49'],
      answer: 2,
      score: 2,
      explanation: '循环 100 次，i % 2 在 0 和 1 之间交替，共 50 个 1，和为 50。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator]
    },
    {
      id: 9,
      type: 'single',
      question: 'C++表达式 abs(1.0)+floor(-1.0) 的值是( )。',
      options: ['0', '1', '2', '0.0'],
      answer: 3,
      score: 2,
      explanation: 'abs(1.0) 为 1.0，floor(-1.0) 为 -1.0。1.0+(-1.0) = 0.0。注意浮点数结果。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator]
    },
    {
      id: 10,
      type: 'single',
      question: '代码执行后的输出是 ( )。\n```cpp\nint a, b;\ncin >> a >> b;\nif (a > b) a = b;\nb = a;\ncout << a << " " << b;\n```cpp\n如果输入 10 20：',
      options: ['10 20', '10 10', '20 20', '20 10'],
      answer: 1,
      score: 2,
      explanation: 'a=10, b=20。a > b 为假，执行 b = a，则 b 变为 10。输出 10 10。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.basics]
    },
    {
      id: 11,
      type: 'single',
      question: '代码执行后的输出是 ( )。\n```cpp\nint n, ans = 0;\ncin >> n;\nwhile (n > 0) {\n  ans = ans * 10+n % 10;\n  n /= 10;\n}\ncout << ans;\n```cpp\n如果输入 123：',
      options: ['123', '3', '321', '6'],
      answer: 2,
      score: 2,
      explanation: '该算法为数字反转。123 反转后为 321。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.basics]
    },
    {
      id: 12,
      type: 'single',
      question: '代码执行后的输出是 ( )。\n```cpp\nfor (int i = 1; i <= 5; i++) {\n  if (i % 2 == 0) continue;\n  cout << i;\n}\n```',
      options: ['12345', '24', '135', '13'],
      answer: 2,
      score: 2,
      explanation: 'continue 跳过偶数，输出 1, 3, 5。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    },
    {
      id: 13,
      type: 'single',
      question: '15 % 4+7 / 2 的值是( )。',
      options: ['6', '6.5', '7', '3'],
      answer: 0,
      score: 2,
      explanation: '15 % 4 = 3；7 / 2 = 3（整除）。3+3 = 6。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 14,
      type: 'single',
      question: '代码执行后的输出是 ( )。\n```cpp\nint n = 10, sum = 0;\nwhile (n > 0) {\n  if (n % 3 == 0) break;\n  sum += n;\n  n--;\n}\ncout << sum;\n```',
      options: ['55', '19', '45', '10'],
      answer: 3,
      score: 2,
      explanation: 'n=10, sum=10, n=9。n=9 时 9%3==0，break。输出 10。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    },
    {
      id: 15,
      type: 'single',
      question: '在 IDE 中调试时，设置断点的目的是( )。',
      options: ['终止程序运行', '让程序在特定位置暂停', '修改程序源代码', '提高运行速度'],
      answer: 1,
      score: 2,
      explanation: '断点用于在调试时让程序运行到指定行暂停，以便观察变量状态。',
      tags: [LEVEL1_TAGS.basics]
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: '在C++中，变量名必须以字母或下划线开头。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'C++变量名命名规则：只能由字母、数字和下划线组成，且不能以数字开头。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: '3 < x < 5 是检查 x 是否在 3 和 5 之间的正确写法。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '在C++中应写为 x > 3 && x < 5。3 < x < 5 会先计算 3 < x 得到布尔值（0或1），再与 5 比较。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 18,
      type: 'judge',
      question: 'while 循环可能一次都不执行。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '如果初始条件不满足，while 循环体内的代码将不会执行。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 19,
      type: 'judge',
      question: 'for 循环的三个部分都可以省略。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'for(;;) 是合法的死循环。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 20,
      type: 'judge',
      question: '1 == 1 的值是 true。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '关系运算符 == 比较两边是否相等。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 21,
      type: 'judge',
      question: '!(3 > 5) 的值是 false。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '3 > 5 为 false，!false 为 true。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 22,
      type: 'judge',
      question: '在C++中，char 类型占1个字节。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '标准规定 char 占用 1 个字节（8位）。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 23,
      type: 'judge',
      question: '斐波那契数列第1项是1，第2项是1，则第3项是2。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '斐波那契数列规律：F(n) = F($n-1$)+F(n-2)。1+1=2。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 24,
      type: 'judge',
      question: '代码 if (x = 1) 总是将 x 设置为 1。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '赋值表达式 x = 1 的值是 1，在 if 中判定为真，且会将 x 的值修改为 1。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics, LEVEL1_TAGS.condition]
    },
    {
      id: 25,
      type: 'judge',
      question: 'break 只能用于循环中。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'break 还可以用于 switch 语句。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      question: '【编程题1】超市优惠方案选择\n超市有两种优惠方案：\n1. 方案1：满 x 元减 y 元（每满一个 x 减一个 y）。\n2. 方案2：打 n 折（即原价 * n / 10）。\n输入 x, y, n 和原价 p，输出最便宜的价格（保留两位小数）。',
      answer: '',
      score: 25,
      explanation: '比较 p-(p/x)*y 与 p*n/10.0，取最小值。注意满减可能是阶段性的或多重满减。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator]
    },
    {
      id: 27,
      type: 'programming',
      question: '【编程题2】石块累加\n小杨在搭石块，第 1 层需要 1*1 个石块，第 2 层需要 2*2 个石块... 第 i 层需要 i*i 个石块。\n输入总层数 n，输出共需要多少个石块。',
      answer: '',
      score: 25,
      explanation: '使用循环累计 1*1+2*2+...+n*n。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator]
    }
  ]
};
