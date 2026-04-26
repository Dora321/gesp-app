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
      question: `我们通常说的“内存”属于计算机中的（ ）。`,
      options: ['输出设备', '输入设备', '存储设备', '打印设备'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      内存（RAM）是计算机的核心存储设备。
      
      - **A 输出设备**：错误。
      - **B 输入设备**：错误。
      - **C 存储设备**：正确答案。
      - **D 打印设备**：错误。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: `以下 C++ 不可以作为变量的名称的是（ ）。`,
      options: ['redStar', 'RedStar', 'red_star', 'red star'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      变量名不能包含空格。
      
      - **A redStar**：错误。
      - **B RedStar**：错误。
      - **C red_star**：错误。
      - **D red star**：正确答案。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: `C++ 表达式 2-1 && 2 % 10 的值是（ ）。`,
      options: ['0', '1', '2', '3'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      1 && 2 的逻辑结果为 true (1)。
      
      - **A 0**：错误。
      - **B 1**：正确答案。
      - **C 2**：错误。
      - **D 3**：错误。
      
      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 4,
      type: 'single',
      question: `假设 a = 3, b = 4，执行 cout << "a+b=" << a+b; 后输出为（ ）。`,
      options: ['3+4=7', '7', 'a+b=7', 'a+b=a+b'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      输出字符串 "a+b=" 后跟 a+b 的计算结果。
      
      - **A 3+4=7**：错误。
      - **B 7**：错误。
      - **C a+b=7**：正确答案。
      - **D a+b=a+b**：错误。
      
      **考点：** 输入输出`,
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 5,
      type: 'single',
      question: `在 C++ 语言中，int 类型的变量 x、y、z 的值分别为 2、4、6，以下表达式的值为真的是（ ）。`,
      options: ['x > y || x > z', 'x != z-y', 'z > y+x', 'x < y || ! (x < z)'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      x < y (2 < 4) 已经是 true。
      
      - **A x > y || x > z**：错误。
      - **B x != z-y**：错误。
      - **C z > y+x**：错误。
      - **D x < y || ! (x < z)**：正确答案。
      
      **考点：** 条件判断、运算符`,
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator]
    },
    {
      id: 6,
      type: 'single',
      question: `对 int 类型的变量 a、b、c，下列语句不符合 C++ 语法的是（ ）。`,
      options: ['c += 5;', 'b = c % 2.5;', 'a = (b = 3, c = 4, b+c);', 'a -= a = (b = 6) / (c = 2);'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      取模运算 % 的操作数必须为整数。
      
      - **A c += 5;**：错误。
      - **B b = c % 2.5;**：正确答案。
      - **C a = (b = 3, c = 4, b+c);**：错误。
      - **D a -= a = (b = 6) / (c = 2);**：错误。
      
      **考点：** 基础语法、运算符`,
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator]
    },
    {
      id: 7,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（ ）。\n\`\`\`cpp\nint a = 12, b = 20;\nint c = a-b;\nif (c > 0) cout << a;\nelse cout << b;\n\`\`\``,
      options: ['12', '20', '8', '-8'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      c = -8，不大于 0，输出 b。
      
      - **A 12**：错误。
      - **B 20**：正确答案。
      - **C 8**：错误。
      - **D -8**：错误。
      
      **考点：** 条件判断`,
      tags: [LEVEL1_TAGS.condition]
    },
    {
      id: 8,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（ ）。\n\`\`\`cpp\nint m = 14;\nint n = 12;\nif (m % 2 && n % 2) cout << "A";\nelse if (m % 2 == 1 && n % 2 == 1) cout << "B";\nelse cout << "C";\n\`\`\``,
      options: ['A', 'B', 'C', '程序运行错误'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      m, n 均为偶数，前两个条件均不成立。
      
      - **A A**：错误。
      - **B B**：错误。
      - **C C**：正确答案。
      - **D 程序运行错误**：错误。
      
      **考点：** 条件判断`,
      tags: [LEVEL1_TAGS.condition]
    },
    {
      id: 9,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（ ）。\n\`\`\`cpp\nint n = 7;\nif (n / 5 != 0) cout << 0;\nelse if (n / 3 != 0) cout << 1;\nelse if (n % 2 != 0) cout << 2;\nelse cout << 3;\n\`\`\``,
      options: ['0', '1', '2', '3'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      7 / 5 = 1，不等于 0。
      
      - **A 0**：正确答案。
      - **B 1**：错误。
      - **C 2**：错误。
      - **D 3**：错误。
      
      **考点：** 条件判断`,
      tags: [LEVEL1_TAGS.condition]
    },
    {
      id: 10,
      type: 'single',
      question: `下面 C++ 代码段执行后的输出是（ ）。\n\`\`\`cpp\nint s = 0;\nfor (int i = 1; i <= 5; i++) s += i;\ncout << s;\n\`\`\``,
      options: ['1', '5', '15', '10'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**
      
      **解析：**
      1 到 5 之和。
      
      - **A 1**：错误。
      - **B 5**：错误。
      - **C 15**：正确答案。
      - **D 10**：错误。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 11,
      type: 'single',
      question: `下面 C++ 代码段执行后的输出是（ ）。\n\`\`\`cpp\nint n = 5;\nwhile (n < 5) n += 2;\ncout << n;\n\`\`\``,
      options: ['7', '5', '4', '6'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      条件 n < 5 一开始就不成立，循环体不执行。
      
      - **A 7**：错误。
      - **B 5**：正确答案。
      - **C 4**：错误。
      - **D 6**：错误。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 12,
      type: 'single',
      question: `下面 C++ 代码段执行后的输出是（ ）。\n\`\`\`cpp\nint n = 5; int cnt = 1;\nwhile (n >= 0) {\n cnt += 1;\n n -= 2;\n}\ncout << cnt;\n\`\`\``,
      options: ['3', '4', '5', '2'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**
      
      **解析：**
      n 依次为 5, 3, 1, -1。cnt 依次为 1, 2, 3, 4。
      
      - **A 3**：错误。
      - **B 4**：正确答案。
      - **C 5**：错误。
      - **D 2**：错误。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 13,
      type: 'single',
      question: `下面C++代码用于求正整数的所有因数。在横线处应填写（ ）。\n\`\`\`cpp\nint n; cin >> n;\nfor (______) {\n if (n % i == 0) cout << i << endl;\n}\n\`\`\``,
      options: ['int i = 1; i < n; i+1', 'int i = 1; i < $n+1$; i+1', 'int i = 1; i < n; i = i+1', 'int i = 1; i <= n; i = i+1'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      循环变量应从 1 遍历到 n。
      
      - **A int i = 1; i < n; i+1**：错误。
      - **B int i = 1; i < $n+1$; i+1**：错误。
      - **C int i = 1; i < n; i = i+1**：错误。
      - **D int i = 1; i <= n; i = i+1**：正确答案。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 14,
      type: 'single',
      question: `下面 C++ 代码段执行后的输出是（ ）。\n\`\`\`cpp\nint n = 10;\nwhile (n > 0) {\n if (n % 3 == 0) break;\n n -= 2;\n}\ncout << n;\n\`\`\``,
      options: ['10', '8', '4', '6'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**
      
      **解析：**
      n 依次为 10, 8, 6... 6%3==0 触发 break。
      
      - **A 10**：错误。
      - **B 8**：错误。
      - **C 4**：错误。
      - **D 6**：正确答案。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 15,
      type: 'single',
      question: `下面 C++ 代码段执行后的输出是（ ）。\n\`\`\`cpp\nint s = 0;\nfor (int i = 1; i <= 10; i++) {\n if (i % 2 == 0) continue;\n s = s+i;\n}\ncout << s;\n\`\`\``,
      options: ['25', '10', '55', '30'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**
      
      **解析：**
      1+3+5+7+9 = 25。
      
      - **A 25**：正确答案。
      - **B 10**：错误。
      - **C 55**：错误。
      - **D 30**：错误。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 16,
      type: 'judge',
      question: `早期计算机内存不够大，可以将字库固化在一个包含只读存储器的扩展卡中协助处理汉字。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      汉卡的历史作用。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: `“神威·太湖之光”超级计算机是中国自主研制的超级计算机，在全球超级计算机 TOP500 排行榜中多次荣膺榜首。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      计算机常识。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 18,
      type: 'judge',
      question: `C++ 表达式 int(3.14) 的值为 3。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      强转截断小数。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 19,
      type: 'judge',
      question: `C++ 语句 cout << (2, 3, "23") 的输出为 2,3,23。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      逗号表达式结果为最后一个值 "23"。
      
      **纠错：** 原命题说法有误。逗号表达式结果为最后一个值 "23"。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 20,
      type: 'judge',
      question: `C++ 的循环语句 for (int i = 0; i < 10; i += 2) 表示 i 从 0 开始到 10 结束但不包含 10，间隔为 2。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      循环语义描述。
      
      **易混概念：** 注意循环变量的终值是在循环外使用的，以及 continue/break 的区别。
      
      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 21,
      type: 'judge',
      question: `C++ 表达式 ('1'+'1') 的值为 '2'。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      字符相加按照 ASCII 值相加。
      
      **纠错：** 原命题说法有误。字符相加按照 ASCII 值相加。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 22,
      type: 'judge',
      question: `在使用 C++ 的 cin 输入多个数时，可以用空格、回车或制表符作为分隔。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      标准流提取操作符的行为。
      
      **易混概念：** 注意 printf 格式化占位符与参数类型的匹配，以及转义字符的用法。
      
      **考点：** 输入输出`,
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 23,
      type: 'judge',
      question: `C++ 中的变量必须要先声明后使用。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**
      
      **判定依据：**
      强类型语言特性。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 24,
      type: 'judge',
      question: `C++ 中的单引号用来界定字符串，双引号用来界定字符。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      应当反过来。
      
      **纠错：** 原命题说法有误。应当反过来。
      
      **易混概念：** 注意区分关键字与标识符、编译器与操作系统的职能边界。
      
      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 25,
      type: 'judge',
      question: `C++ 语言中，if 语句必须带有 else 部分。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**
      
      **判定依据：**
      else 是可选的。
      
      **纠错：** 原命题说法有误。else 是可选的。
      
      **易混概念：** 注意逻辑运算符 && 和 || 的短路求值特性，以及运算符优先级。
      
      **考点：** 条件判断`,
      tags: [LEVEL1_TAGS.condition]
    },
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `1
1
1
20`, output: `Yes
10` },
        { input: `1
1
1
5`, output: `No
5` }
      ],
      referenceCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long x, a, b, c, n, m, k;\n    cin >> x >> a >> b >> c >> n >> m >> k;\n    long long total = a * n+b * m+c * k;\n    cout << x-total << endl;\n    return 0;\n}`,
      question: `
# [GESP202309 一级] 买文具

## 题目描述

开学了，小明来到文具店选购文具。签字笔 $2$ 元一支，他需要 $X$ 支；记事本 $5$ 元一本，他需要 $Y$ 本；直尺 $3$ 元一把，他需要 $Z$ 把。小明手里有 $Q$ 元钱。请你通过编程帮小明算算，他手里的钱是否够买他需要的文具。

## 输入格式

第一行包含一个正整数，是小明购买签字笔的数量。约定 $1 \\le X \\le 10$。

第二行包含一个正整数，是小明购买记事本的数量。约定 $1 \\le Y \\le 10$。

第三行包含一个正整数，是小明购买直尺的数量。约定 $1 \\le Z \\le 10$。

第四行包含一个正整数 $Q$，是小明手里的钱数（单位：元）。

## 输出格式

输出 $2$ 行。如果小明手里的钱够买他需要的文具，则第一行输出 \`Yes\`，第二行输出小明会剩下的钱数（单位：元）；否则，第一行输出 \`No\`，第二行输出小明缺少的钱数（单位：元）。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: '简单的四则运算。注意使用 long long 以防溢出（虽然一级范围通常较小）。LuoGu B3862。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `7
1
10`, output: `7` },
        { input: `7
10
20`, output: `31` }
      ],
      referenceCode: `#include <iostream>\nusing namespace std;\nint main() {\n    long long l, r, k, sum = 0;\n    cin >> l >> r >> k;\n    for (long long i = l; i <= r; i++) {\n        if (i % k == 0 || i % 10 == k) {\n            sum += i;\n        }\n    }\n    cout << sum << endl;\n    return 0;\n}`,
      question: `
# [GESP202309 一级] 小明的幸运数

## 题目描述

所有个位数为 $k$ 的正整数，以及所有 $k$ 的倍数，都被小明称为“ $k$ 幸运数”。小明想知道正整数 $L$ 和 $R$ 之间（包括 $L$ 和 $R$）所有 $k$ 幸运数的和，你能帮帮他吗？

## 输入格式

输入 $3$ 行。第一行包含一个正整数 $k$，第二行包含一个正整数 $L$，第三行包含一个正整数 $R$。约定 $2 \\le k \\le 9$，$1 \\le L \\le R \\le 1000$。

## 输出格式

输出 $1$ 行，符合题意的幸运数之和。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      
      score: 25,
      explanation: '遍历范围 $[L, R]$，判断每个数是否满足整除条件或个位条件。LuoGu B3863。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    }
  ]
};
