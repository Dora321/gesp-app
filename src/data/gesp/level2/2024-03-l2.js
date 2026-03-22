// 2024年3月 GESP C++ 二级真题 (第5次认证)
export const paperData = {
    id: '2024-03-l2',
    title: '2024年3月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "下列流程图的输出结果是（ ）。",
            options: ["5 12", "12 5", "5 5", "没有输出"],
            answer: 1,
            score: 2,
            explanation: '根据流程图逻辑，输入x=5, y=12，由于x<y，交换后输出 a=12, b=5。',
            tags: ["流程图", "程序分析"]
        },
        {
            id: 2,
            type: 'single',
            question: "以下选项中不符合 C++ 变量命名规则的是？（ ）",
            options: ["student", "2_from", "_to", "Text"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["变量与标识符"]
        },
        {
            id: 3,
            type: 'single',
            question: "以下选项中，不能用于表示分⽀结构的 C++ 保留字是？（ ）",
            options: ["switch", "return", "else", "if"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 4,
            type: 'single',
            question: "下列说法错误的是？（ ）",
            options: ["while循环满⾜循环条件时不断地运行，直到指定的条件不满⾜为⽌", "if语句通常用于执行条件判断", "在 C++ 中可以使用foreach循环", "break和continue语句都可以用在for循环和while循环中"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 5,
            type: 'single',
            question: "下列 4 个表达式中，答案不是整数 8 的是？（ ）",
            options: ["abs(-8)", "min(max(8, 9), 10)", "int(8.88)", "sqrt(64)"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 6,
            type: 'single',
            question: "下面C++代码执行后的输出是（ ）。\n```cpp\nint cnt = 0, x = 1;\nwhile (x < 10) {\n    x += 2;\n    if (x % 3 == 0) continue;\n    cnt++;\n}\ncout << cnt;\n```",
            options: ["1", "2", "3", "4"],
            answer: 1,
            score: 2,
            explanation: 'x依次取3(跳过), 5(cnt=1), 7(cnt=2), 9(跳过), 11(结束)。故cnt=2。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "下面C++代码执行后的输出是（ ）。\n```cpp\nint x = 1;\nwhile (x < 15) {\n    x += 2;\n    if (x % 3 == 0) cout << x << \"#\";\n}\n```",
            options: ["3#9#15#", "3#9#", "3#6#9#12#15#", "3#9#15# (Wait, No)"],
            answer: 3,
            score: 2,
            explanation: 'x依次为3,5,7,9,11,13,15。满足x%3==0的有3, 9, 15。结果为3#9#15#。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: "下面C++代码执行后的输出是（ ）。\n```cpp\nint n, a, m, i;\nn = 3, a = 5;\nm = (a-1) * 2;\nfor (i = 0; i < n-1; i++)\n    m = (m-1) * 2;\ncout << m;\n```",
            options: ["8", "26", "28", "30"],
            answer: 1,
            score: 2,
            explanation: '初始m=8。i=0时m=14；i=1时m=26。结束输出26。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "下面C++代码执行后的输出是（ ）。\n```cpp\nint n, i, result;\nn = 81; i = 1, result = 1;\nwhile (i * i <= n) {\n    if (n % (i * i) == 0) result = i * i;\n    i += 1;\n}\ncout << result;\n```",
            options: ["9", "27", "81", "1"],
            answer: 2,
            score: 2,
            explanation: '程序查找n的最大完全平方因子。81的因子中1, 9, 81是完全平方数，最大为81。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "下面C++代码执行后的输出是（ ）。\n```cpp\nfor (int i = 0; i < 4; i++) {\n    for (int j = 0; j <= i; j++) {\n        cout << j;\n    }\n}\n```",
            options: ["0010120123", "0123", "010120123", "0012012301234"],
            answer: 0,
            score: 2,
            explanation: 'i=0输出0; i=1输出01; i=2输出012; i=3输出0123。拼接为0010120123。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下面C++代码用于实现九九乘法表，横线处应填入（ ）。",
            options: ["i == 0", "i == 4", "i == 0 && i == 4", "i == 0 || i == 4"],
            answer: 3,
            score: 2,
            explanation: '题目描述缺失，暂按官方答案保留。',
            tags: ["程序分析"]
        },
        {
            id: 12,
            type: 'single',
            question: "一个数的所有数字倒序排列后保持不变，就是回文数。横线处应填写（ ）。",
            options: ["10 * a+n % 10", "a+n % 10", "10 * a+n / 10", "a+n / 10"],
            answer: 0,
            score: 2,
            explanation: '构造反转数的经典逻辑：reverse = reverse * 10+n % 10。',
            tags: ["程序分析", "回文数"]
        },
        {
            id: 13,
            type: 'single',
            question: "给定两个整数 与 ，打印出一个栅栏图形，这个栅栏应该分成 段，段与段之间的间隔为+， 段内的填 充为 个-。形如 ， 时，图形如下： 以下程序代码用于绘制该图形，横线处应填写？（ ）",
            options: ["cout << '+' << endl;", "cout << '+' << ' ' << endl;", "cout << '+';", "cout << '+' << ' ';"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "小杨的父母最近刚刚给他买了一块华为⼿表，他说⼿表上跑的是鸿蒙，这个鸿蒙是。（ ）",
            options: ["小程序", "计时器", "操作系统", "神话⼈物"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 15,
            type: 'single',
            question: "有个无限长的链，由3种材质不同的环组成。3种环重3, 4, 6克，每12克一组（G3, G4, G6）。链依次为G3, G4, G6...重复。求环N（不含本身）前的总重量。有关说法正确的是（ ）。",
            options: ["如果N输入10，输出36", "如果N输入5，输出15", "如果N输入9，输出30", "以上说法均不对"],
            answer: 2,
            score: 2,
            explanation: 'G3有4个(12g), G4有3个(12g), G6有2个(12g)。前9个环正好是一个周期，重36g。',
            tags: ["逻辑推断", "数学逻辑"]
        },
        {
            id: 16,
            type: 'judge',
            question: "在C++程序中，可以用 `break` 语句跳出 `if` 结构。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "break 只能用于循环结构 (for/while/do-while) 或 switch 语句中。",
            tags: ["判断题", "基础语法"]
        },
        {
            id: 17,
            type: 'judge',
            question: "Xyz，xYz，xyZ是三个不同的变量。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "变量与标识符"]
        },
        {
            id: 18,
            type: 'judge',
            question: "cout << (8< 9< 10)的输出结果为true。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出"]
        },
        {
            id: 19,
            type: 'judge',
            question: "for (i = 0; i < 100; i+=2) ;语句中变量 i 的取值范围是 0 到 99 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "循环", "变量与标识符"]
        },
        {
            id: 20,
            type: 'judge',
            question: "C++ 中cout << float(2022)与 cout << float('2022')运行后的输出结果均为 2022 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出"]
        },
        {
            id: 21,
            type: 'judge',
            question: "已知A的 ASCII 码值为 65 ，表达式int('C')+abs(-5.8)的值为 72.8 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题"]
        },
        {
            id: 22,
            type: 'judge',
            question: "bool 函数用于将给定参数或表达式转换为布尔类型。语句 bool(-1) 返回的是 false 值。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题"]
        },
        {
            id: 23,
            type: 'judge',
            question: "如果变量a的值使得 C++ 表达式sqrt(a)==abs(a)，则a的值为 0 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "变量与标识符"]
        },
        {
            id: 24,
            type: 'judge',
            question: "小杨今年春节回奶奶家了，奶奶家的数字电视要设置 ip 地址并接入到 WIFI 盒⼦才能收看节⽬，那这个 WIFI 盒 ⼦具有路由器的功能。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "条件判断"]
        },
        {
            id: 25,
            type: 'judge',
            question: "在C++代码中，变量名可以是关键字（如 `int`, `for` 等）。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "C++ 关键字不能用作变量名。",
            tags: ["判断题", "变量与标识符"]
        }
    ],
    programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `2
3
5`, output: `15` },
        { input: `3
100
100
100`, output: `1000000` },
        { input: `4
100
100
100
2`, output: `>1000000` }
      ],
      referenceCode: '// 待补充',
      question: `
# [GESP202403 二级] 乘法问题

## 题目描述

小 A 最初刚刚学习了乘法，为了帮助他练习，我们给他若干个正整数，并要求他将这些数乘起来。

对于大部分题目，小 A 可以精确地算出答案，不过，若这些数的乘积超过 \$10^6\$，小 A 就不会做了。

请你写一个程序，告诉我们小 A 会如何作答。

## 输入格式

第一行一个整数 \$n\$，表示正整数的个数。

接下来 \$n\$，每行一个整数 \$a\$。小 A 需要将所有的 \$a\$ 乘起来。

## 输出格式

输出一行，如果乘积超过 \$10^6\$，则输出 \`>1000000\`；否则输出所有数的乘积。
`,
      score: 25,
      explanation: "边乘边判断是否已经超过 1000000。若超过就可以直接输出 >1000000；否则最终输出精确乘积。",
      tags: ["编程题", "模拟", "大数界限"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    long long prod = 1;\n    for (int i = 0; i < n; ++i) {\n        long long a;\n        cin >> a;\n        prod *= a;\n        if (prod > 1000000) {\n            cout << \">1000000\\n\";\n            return 0;\n        }\n    }\n    cout << prod << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5`, output: `|---|
|xxx|
|---|
|xxx|
|---|` },
        { input: `7`, output: `|-----|
|xxxxx|
|xxxxx|
|-----|
|xxxxx|
|xxxxx|
|-----|` }
      ],
      referenceCode: '// 待补充',
      question: `
# [GESP202403 二级] 小杨的日字矩阵

## 题目描述

小杨想要构造一个 \$N\\times N\$  的日字矩阵（\$N\$ 为奇数），具体来说，这个矩阵共有 \$N\$ 行，每行 \$N\$ 个字符，其中最左列、最右列都是 \`|\`，而第一行、最后一行、以及中间一行（即第 \$\\frac{N+1}{2}\$ 行）的第 \$2\\sim N-1\$ 个字符都是 \`-\` ，其余所有字符都是半角小写字母 \`x\` 。例如，一个 \$N = 5\$ 日字矩阵如下:

\`\`\`
|---|
|xxx|
|---|
|xxx|
|---|
\`\`\`

请你帮小杨根据给定的 \$N\$ 打印出对应的“日字矩阵”。

## 输入格式

一行一个整数 \$N\$（\$5\\leq N \\leq 49\$，保证 \$N\$ 为奇数）。

## 输出格式

输出对应的“日字矩阵”。

请严格按格式要求输出，不要擅自添加任何空格、标点等任何符号。你一个恰好输出 \$N\$ 行，每行除了换行符外恰好包含 \$N\$ 个字符，这些字符要么是 \`-\`，要么是 \`|\`，要么是 \`x\`。**你的输出必须和标准答案完全一致才能得分，请在提交前仔细检查**。
`,
      score: 25,
      explanation: "边框列始终为 |；第一行、最后一行和中间行的内部位置输出 -；其他内部位置输出 x。",
      tags: ["编程题", "字符画", "模拟"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int N;\n    cin >> N;\n    int mid = N / 2;\n    for (int i = 0; i < N; ++i) {\n        for (int j = 0; j < N; ++j) {\n            if (j == 0 || j == N-1) cout << '|';\n            else if (i == 0 || i == mid || i == N-1) cout << '-';\n            else cout << 'x';\n        }\n        cout << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    }
]
};
