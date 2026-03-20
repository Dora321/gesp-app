import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2023-09-l1',
  title: '2023年9月 GESP C++ 一级真题',
  level: 1,
  year: 2023,
  month: 9,
  session: 3,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    type: 'public-recovery',
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: '我们通常说的“内存”属于计算机中的（ ）。',
      options: ['输出设备', '输入设备', '存储设备', '打印设备'],
      answer: 2,
      score: 2,
      explanation: '内存（RAM）是计算机的核心存储设备。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: '以下 C++ 不可以作为变量的名称的是（ ）。',
      options: ['redStar', 'RedStar', 'red_star', 'red star'],
      answer: 3,
      score: 2,
      explanation: '变量名不能包含空格。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: 'C++ 表达式 2-1 && 2 % 10 的值是（ ）。',
      options: ['0', '1', '2', '3'],
      answer: 1,
      score: 2,
      explanation: '1 && 2 的逻辑结果为 true (1)。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 4,
      type: 'single',
      question: '假设 a = 3, b = 4，执行 cout << "a+b=" << a+b; 后输出为（ ）。',
      options: ['3+4=7', '3+4=7', 'a+b=7', 'a+b=a+b'],
      answer: 2,
      score: 2,
      explanation: '输出字符串 "a+b=" 后跟 a+b 的计算结果。',
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 5,
      type: 'single',
      question: '在 C++ 语言中，int 类型的变量 x、y、z 的值分别为 2、4、6，以下表达式的值为真的是（ ）。',
      options: ['x > y || x > z', 'x != z-y', 'z > y+x', 'x < y || ! (x < z)'],
      answer: 3,
      score: 2,
      explanation: 'x < y (2 < 4) 已经是 true。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator]
    },
    {
      id: 6,
      type: 'single',
      question: '对 int 类型的变量 a、b、c，下列语句不符合 C++ 语法的是（ ）。',
      options: ['c += 5;', 'b = c % 2.5;', 'a = (b = 3, c = 4, b+c);', 'a -= a = (b = 6) / (c = 2);'],
      answer: 1,
      score: 2,
      explanation: '取模运算 % 的操作数必须为整数。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator]
    },
    {
      id: 7,
      type: 'single',
      question: '下面 C++ 代码执行后的输出是（ ）。\n```cpp\nint a = 12, b = 20;\nint c = a-b;\nif (c > 0) cout << a;\nelse cout << b;\n```',
      options: ['12', '20', '8', '-8'],
      answer: 1,
      score: 2,
      explanation: 'c = -8，不大于 0，输出 b。',
      tags: [LEVEL1_TAGS.condition]
    },
    {
      id: 8,
      type: 'single',
      question: '下面 C++ 代码执行后的输出是（ ）。\n```cpp\nint m = 14;\nint n = 12;\nif (m % 2 && n % 2) cout << "A";\nelse if (m % 2 == 1 && n % 2 == 1) cout << "B";\nelse cout << "C";\n```',
      options: ['A', 'B', 'C', '程序运行错误'],
      answer: 2,
      score: 2,
      explanation: 'm, n 均为偶数，前两个条件均不成立。',
      tags: [LEVEL1_TAGS.condition]
    },
    {
      id: 9,
      type: 'single',
      question: '下面 C++ 代码执行后的输出是（ ）。\n```cpp\nint n = 7;\nif (n / 5 != 0) cout << 0;\nelse if (n / 3 != 0) cout << 1;\nelse if (n % 2 != 0) cout << 2;\nelse cout << 3;\n```',
      options: ['0', '1', '2', '3'],
      answer: 0,
      score: 2,
      explanation: '7 / 5 = 1，不等于 0。',
      tags: [LEVEL1_TAGS.condition]
    },
    {
      id: 10,
      type: 'single',
      question: '下面 C++ 代码段执行后的输出是（ ）。\n```cpp\nint s = 0;\nfor (int i = 1; i <= 5; i++) s += i;\ncout << s;\n```',
      options: ['1', '5', '15', '10'],
      answer: 2,
      score: 2,
      explanation: '1 到 5 之和。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 11,
      type: 'single',
      question: '下面 C++ 代码段执行后的输出是（ ）。\n```cpp\nint n = 5;\nwhile (n < 5) n += 2;\ncout << n;\n```',
      options: ['7', '5', '4', '6'],
      answer: 1,
      score: 2,
      explanation: '条件 n < 5 一开始就不成立，循环体不执行。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 12,
      type: 'single',
      question: '下面 C++ 代码段执行后的输出是（ ）。\n```cpp\nint n = 5; int cnt = 1;\nwhile (n >= 0) {\n    cnt += 1;\n    n -= 2;\n}\ncout << cnt;\n```',
      options: ['3', '4', '5', '2'],
      answer: 1,
      score: 2,
      explanation: 'n 依次为 5, 3, 1, -1。cnt 依次为 1, 2, 3, 4。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 13,
      type: 'single',
      question: '下面C++代码用于求正整数的所有因数。在横线处应填写（ ）。\n```cpp\nint n; cin >> n;\nfor (______) {\n    if (n % i == 0) cout << i << endl;\n}\n```',
      options: ['int i = 1; i < n; i+1', 'int i = 1; i < $n+1$; i+1', 'int i = 1; i < n; i = i+1', 'int i = 1; i <= n; i = i+1'],
      answer: 3,
      score: 2,
      explanation: '循环变量应从 1 遍历到 n。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 14,
      type: 'single',
      question: '下面 C++ 代码段执行后的输出是（ ）。\n```cpp\nint n = 10;\nwhile (n > 0) {\n    if (n % 3 == 0) break;\n    n -= 2;\n}\ncout << n;\n```',
      options: ['10', '8', '4', '6'],
      answer: 3,
      score: 2,
      explanation: 'n 依次为 10, 8, 6... 6%3==0 触发 break。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 15,
      type: 'single',
      question: '下面 C++ 代码段执行后的输出是（ ）。\n```cpp\nint s = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 2 == 0) continue;\n    s = s+i;\n}\ncout << s;\n```',
      options: ['25', '10', '55', '30'],
      answer: 0,
      score: 2,
      explanation: '1+3+5+7+9 = 25。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 16,
      type: 'judge',
      question: '早期计算机内存不够大，可以将字库固化在一个包含只读存储器的扩展卡中协助处理汉字。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '汉卡的历史作用。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: '“神威·太湖之光”超级计算机是中国自主研制的超级计算机，在全球超级计算机 TOP500 排行榜中多次荣膺榜首。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '计算机常识。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 18,
      type: 'judge',
      question: 'C++ 表达式 int(3.14) 的值为 3。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '强转截断小数。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 19,
      type: 'judge',
      question: 'C++ 语句 cout << (2, 3, "23") 的输出为 2,3,23。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '逗号表达式结果为最后一个值 "23"。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 20,
      type: 'judge',
      question: 'C++ 的循环语句 for (int i = 0; i < 10; i += 2) 表示 i 从 0 开始到 10 结束但不包含 10，间隔为 2。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '循环语义描述。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 21,
      type: 'judge',
      question: 'C++ 表达式 (\'1\'+\'1\') 的值为 \'2\'。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '字符相加按照 ASCII 值相加。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 22,
      type: 'judge',
      question: '在使用 C++ 的 cin 输入多个数时，可以用空格、回车或制表符作为分隔。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '标准流提取操作符的行为。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.io]
    },
    {
      id: 23,
      type: 'judge',
      question: 'C++ 中的变量必须要先声明后使用。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '强类型语言特性。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 24,
      type: 'judge',
      question: 'C++ 中的单引号用来界定字符串，双引号用来界定字符。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '应当反过来。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 25,
      type: 'judge',
      question: 'C++ 语言中，if 语句必须带有 else 部分。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'else 是可选的。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.condition]
    },
    {
      id: 26,
      type: 'programming',
      question: '## [GESP202309 一级] 小杨买文具\n\n**题目描述**\n\n小杨还有 $x$ 元钱，他想购买签字笔、记事本和直尺。已知签字笔 $a$ 元一支，记事本 $b$ 元一本，直尺 $c$ 元一把。小杨想买 $n$ 支签字笔，$m$ 本记事本和 $k$ 把直尺。\n\n请你编写程序，判断小杨手中的钱是否够买这些文具。如果够买，输出剩余的钱数；如果不够买，输出还差多少钱（以负数形式表示）。\n\n**输入格式**\n\n输入共四行：\n- 第一行包含一个正整数 $x$，表示小杨手中的钱数。\n- 第二行包含三个正整数 $a, b, c$，分别表示签字笔、记事本和直尺的单价。\n- 第三行包含三个正整数 $n, m, k$，分别表示小杨想买的文具数量。\n\n**输出格式**\n\n输出一个整数。如果钱够买，输出剩余钱数；如果不够买，输出还差多少钱的负数。\n\n**输入样例**\n\n```\n100\n5 10 2\n10 3 5\n```\n\n**输出样例**\n\n```\n10\n```\n\n**样例解释**\n\n总花费为 $5 \\times 10+10 \\times 3+2 \\times 5 = 50+30+10 = 90$ 元。小杨有 100 元，剩余 $100-90 = 10$ 元。',
      answer: '#include <iostream>\nusing namespace std;\nint main() {\n    long long x, a, b, c, n, m, k;\n    cin >> x >> a >> b >> c >> n >> m >> k;\n    long long total = a * n+b * m+c * k;\n    cout << x-total << endl;\n    return 0;\n}',
      score: 25,
      explanation: '简单的四则运算。注意使用 long long 以防溢出（虽然一级范围通常较小）。LuoGu B3862。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator]
    },
    {
      id: 27,
      type: 'programming',
      question: '## [GESP202309 一级] 幸运数\n\n**题目描述**\n\n小杨认为，如果一个正整数 $n$ 能被 $k$ 整除，或者 $n$ 的个位数字是 $k$，那么这个数就是“幸运数”。\n\n给定正整数 $L, R$ 和 $k$，请你计算在 $[L, R]$ 范围内所有“幸运数”的和。\n\n**输入格式**\n\n输入共一行，包含三个正整数 $L, R, k$。\n\n**输出格式**\n\n输出一个整数，表示幸运数之和。\n\n**输入样例**\n\n```\n1 10 3\n```\n\n**输出样例**\n\n```\n18\n```\n\n**样例解释**\n\n在 1 到 10 之间，3 的倍数有 3, 6, 9；个位是 3 的数有 3。幸运数包括 3, 6, 9。和为 $3+6+9=18$。',
      answer: '#include <iostream>\nusing namespace std;\nint main() {\n    long long l, r, k, sum = 0;\n    cin >> l >> r >> k;\n    for (long long i = l; i <= r; i++) {\n        if (i % k == 0 || i % 10 == k) {\n            sum += i;\n        }\n    }\n    cout << sum << endl;\n    return 0;\n}',
      score: 25,
      explanation: '遍历范围 $[L, R]$，判断每个数是否满足整除条件或个位条件。LuoGu B3863。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator]
    }
  ]
};
