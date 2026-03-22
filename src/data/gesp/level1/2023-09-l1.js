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
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long x, a, b, c, n, m, k;\n    cin >> x >> a >> b >> c >> n >> m >> k;\n    long long total = a * n+b * m+c * k;\n    cout << x-total << endl;\n    return 0;\n}`,
      question: `
# [GESP202309 一级] 买文具

## 题目描述

开学了，小明来到文具店选购文具。签字笔 \$2\$ 元一支，他需要 \$X\$ 支；记事本 \$5\$ 元一本，他需要 \$Y\$ 本；直尺 \$3\$ 元一把，他需要 \$Z\$ 把。小明手里有 \$Q\$ 元钱。请你通过编程帮小明算算，他手里的钱是否够买他需要的文具。

## 输入格式

第一行包含一个正整数，是小明购买签字笔的数量。约定 \$1 \\le X \\le 10\$。

第二行包含一个正整数，是小明购买记事本的数量。约定 \$1 \\le Y \\le 10\$。

第三行包含一个正整数，是小明购买直尺的数量。约定 \$1 \\le Z \\le 10\$。

第四行包含一个正整数 \$Q\$，是小明手里的钱数（单位：元）。

## 输出格式

输出 \$2\$ 行。如果小明手里的钱够买他需要的文具，则第一行输出 \`Yes\`，第二行输出小明会剩下的钱数（单位：元）；否则，第一行输出 \`No\`，第二行输出小明缺少的钱数（单位：元）。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: '简单的四则运算。注意使用 long long 以防溢出（虽然一级范围通常较小）。LuoGu B3862。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long l, r, k, sum = 0;\n    cin >> l >> r >> k;\n    for (long long i = l; i <= r; i++) {\n        if (i % k == 0 || i % 10 == k) {\n            sum += i;\n        }\n    }\n    cout << sum << endl;\n    return 0;\n}`,
      question: `
# [GESP202309 一级] 小明的幸运数

## 题目描述

所有个位数为 \$k\$ 的正整数，以及所有 \$k\$ 的倍数，都被小明称为“ \$k\$ 幸运数”。小明想知道正整数 \$L\$ 和 \$R\$ 之间（包括 \$L\$ 和 \$R\$）所有 \$k\$ 幸运数的和，你能帮帮他吗？

## 输入格式

输入 \$3\$ 行。第一行包含一个正整数 \$k\$，第二行包含一个正整数 \$L\$，第三行包含一个正整数 \$R\$。约定 \$2 \\le k \\le 9\$，\$1 \\le L \\le R \\le 1000\$。

## 输出格式

输出 \$1\$ 行，符合题意的幸运数之和。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: '遍历范围 $[L, R]$，判断每个数是否满足整除条件或个位条件。LuoGu B3863。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    }
  ]
};
