// 2025年6月 GESP C++ 二级真题 (第10次认证)
export const paperData = {
    id: '2025-06-l2',
    title: '2025年6月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "2025年4月19日在北京举行了一场颇为瞩目的人形机器人半程马拉松赛。比赛期间，跑动着的机器人会利用身上安装的多个传感器所反馈的数据来调整姿态、保持平衡等，那么这类传感器类似于计算机的（ ）。",
            options: ["处理器", "存储器", "输入设备", "输出设备"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 2,
            type: 'single',
            question: "小明购置的计算机使用一年后觉得内存不够用了，想购置一个容量更大的内存条，这时他需要的内存条是（ ）。",
            options: ["RAM", "ROM", "CACHE", "EPROM"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 3,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["3", "3.5", "10", "11"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 4,
            type: 'single',
            question: "下⾯ C++ 代码用于获得正整数的第 3 位数，如 1234 则输出 2 。如果是一位数或两位数，则输出 0 。横线处应填 入的代码是 （ ） 。 int a=3; float b = 3.5; cout << (a *= b);。",
            options: ["N % 1000 / 100", "N / 1000 % 100", "N / 1000 / 100", "N % 100 / 100"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 5,
            type: 'single',
            question: "下⾯C++代码执行，其输出是（ ）。",
            options: ["6 28", "6 6", "28 6", "28 28"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 6,
            type: 'single',
            question: "今天星期六，其后第N天星期⼏？如果是星期一到星期六输出形如：星期1.星期2等，星期天则输出星期 天。下⾯的C++代码用于完成上述要求，横线处应填上的代码是（ ）。",
            options: ["(N+6) / 7", "(N+6) // 7", "N % 7", "(N+6) % 7"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯的C++代码执行后其输出是（ ）。",
            options: ["45", "28", "3", "0"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码执行后其输出是 （ ） 。",
            options: ["110", "22", "12", "3"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是 （ ） 。",
            options: ["101", "100", "99", "98"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是（ ）。",
            options: ["A#A#", "A#0#A#0", "A#A#1", "A#0#A#0#1"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下面 C++ 代码用于输出如下图形，横线处填入（ ）。\n```cpp\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < i+1; j++) \n        printf(\"%d-%d#\", i, j);\n    printf(\"END\\n\");\n}\n```",
            options: ["0#0-1#0-2#0-2#1-END", "0#0-1#0-1#1-2#0-2#1-2#2-3#0-3#1-3#2-END", "0#0-1#0-1#1-2#0-2#1-2#2-END", "0-0#END\n1-0#1-1#END\n2-0#2-1#2-2#END"],
            answer: 3,
            score: 2,
            explanation: '外层循环 i 从 0 到 2，内层循环 j 从 0 到 i。对应输出 i-j#。',
            tags: ["嵌套循环", "图形输出"]
        },
        {
            id: 12,
            type: 'single',
            question: "下⾯ C++ 代码执行后，将输出不能被 3 整除且除以 5 余数为 2 的数。下列选项不能实现的是（ ）。",
            options: ["(i % 3 != 0) && (i % 5 == 2)", "(i % 3) && (i % 5 == 2)", "(i % 3) && !(i % 5 != 2)", "!(i % 3) && (i % 5 == 2)"],
            answer: 3,
            score: 2,
            explanation: '!(i % 3) 表示 i 能被 3 整除，这与题目要求的“不能被 3 整除”相反。',
            tags: ["条件判断", "逻辑运算"]
        },
        {
            id: 13,
            type: 'single',
            question: "下面C++代码用于判断一个大于0的正整数是几位数，横线处应填入代码先后是（ ）。",
            options: ["N > 1；N = N / 10", "N > 1；N /= 10", "N == 0；N /= 10", "N > 0；N /= 10"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "判断一个数是否为⾃守数。⾃守数的定义是如果一个数的平⽅其尾数与该数相同，则为⾃守数，如25的平 ⽅是625，其尾数是25，所以25是⾃守数。相关说法错误的是（ ）。",
            options: ["如果Flag在循环中不被改为false，则说明该数是⾃守数", "代码 if (N1 % 10 != M1 % 10) 用于判断其个位数是否相等，如果不等，则表明不是⾃守数", "代码 N1 = N1 / 10, M1 = M1 / 10 将个位数去掉", "将 N1 > 0 改为 N > 0 效果相同"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 15,
            type: 'single',
            question: "下面C++代码实现输出如下图形，相关说法错误的是（ ）。",
            options: ["代码 now_number = 0 移动到L1和L2标记的两行代码之间，效果维持不变", "代码 now_number += 1 修改为 now_number = 1+now_number，效果维持不变", "将代码 now_number == 10 调整为 now_number > 9，效果维持不变", "将最后一行的 cout << endl 修改为 cout << \"\n\"，效果维持不变"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 16,
            type: 'judge',
            question: "人们现在参加很多闭卷考试时通常都不允许带智能手机、平板电脑等，此外很多种智能手表同样因为具有嵌入操作系统及通信等功能，所以也不允许随身携带。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "智能手表具有处理和通信能力，通常被视为电子作弊工具，考试中严禁携带。",
            tags: ["判断题", "基础知识"]
        },
        {
            id: 17,
            type: 'judge',
            question: "在 C++ 代码中，假设 N 为正整数，则 `N / 10` 将舍弃个位数。如果 N 小于 10，则其值为 0。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "整数除法会截断小数部分，N/10 相当于去掉个位。",
            tags: ["判断题", "运算符"]
        },
        {
            id: 18,
            type: 'judge',
            question: "在 C++ 中，表达式 `a == b` 和 `b == a` 的结果总是相同的，且对 a 和 b 的值没有任何影响。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "相等运算符具有对称性，且是纯函数操作，不修改操作数。",
            tags: ["判断题", "运算符"]
        },
        {
            id: 19,
            type: 'judge',
            question: "假设 a 和 b 分别是 C++ 的整型变量，如果表达式 `max(a, b) == min(a, b)` 的值为真，则说明 a 和 b 相等。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "最大值等于最小值，意味着所有参与比较的数都相等。",
            tags: ["判断题", "数学函数"]
        },
        {
            id: 20,
            type: 'judge',
            question: "在 C++ 中，`char a = '1'; a = 45.6;` 编译时将报错，因为字符变量 a 不能被赋值为浮点数。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "C++ 中 char 是整数类型，浮点数赋值给 char 会发生隐式转换（截断），不会报错。",
            tags: ["判断题", "数据类型"]
        },
        {
            id: 21,
            type: 'judge',
            question: "下⾯ C++ 代码执行时如输入 59.99 ，将输出及格两个汉字。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该表达式先计算 10 <= N (得到 1/true)，再计算 1 <= 12 (得到 true)。故无论 N 为何值，结果通常为 true。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 22,
            type: 'judge',
            question: "在下⾯的 C++ 代码中，`continue` 将导致循环跳过本次迭代，因此不会进入后续语句。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "continue 语句用于跳过当前循环体中剩余的语句，直接进入下一次循环判定。",
            tags: ["判断题", "循环控制"]
        },
        {
            id: 23,
            type: 'judge',
            question: "下⾯ C++ 代码执行后将输出 15。\n```cpp\nint cnt = 0;\nfor (int i = 5; i > 0; i--)\n    for (int j = 0; j < i; j++)\n        cnt++;\ncout << cnt;\n```",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "外层循环 i 为 5, 4, 3, 2, 1。内层循环次数分别为 5, 4, 3, 2, 1。总和为 15。",
            tags: ["判断题", "嵌套循环"]
        },
        {
            id: 24,
            type: 'judge',
            question: "将下⾯ C++ 代码中的 `for (int i = 5; i > 0; i--)` 调整为 `for (int i = 1; i <= 5; i++)`，输出结果相同。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "两者都循环 5 次，且内层循环次数的总和保持不变（1+2+3+4+5 = 5+4+3+2+1）。",
            tags: ["判断题", "循环逻辑"]
        },
        {
            id: 25,
            type: 'judge',
            question: "在 C++ 中，`while` 循环和 `for` 循环可以互相转换，实现相同的功能。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "for 循环和 while 循环是等价的，可以互相转换。",
            tags: ["判断题", "循环结构"]
        }
    ],
    programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202506 二级] 数三角形

## 题目描述

直角三角形有两条直角边与一条斜边，设两条直角边的长度分别为 \$a, b\$，则直角三角形的面积为 \$\\frac{ab}{2}\$。

请你计算当直角边长 \$a, b\$ 均取不超过 \$n\$ 的正整数时，有多少个不同的面积为整数的直角三角形。直角边长分别为 \$a, b\$ 和 \$a', b'\$ 的两个直角三角形相同，当且仅当 \$a = a'\$, \$b = b'\$ 或者 \$a = b'\$, \$b = a'\$。

## 输入格式

一行，一个整数 \$n\$，表示直角边长的最大值。

## 输出格式

输出一行，一个整数，表示不同的直角三角形数量。
`,
      score: 25,
      explanation: "面积 ab/2 为整数等价于 ab 为偶数，也就是 a、b 不会同时为奇数。再结合 (a,b) 与 (b,a) 视为同一个三角形，只统计 a<=b 的方案即可。",
      tags: ["编程题", "枚举", "数学"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n, ans = 0;\n    cin >> n;\n    for (long long a = 1; a <= n; ++a) {\n        for (long long b = a; b <= n; ++b) {\n            if ((a * b) % 2 == 0) ++ans;\n        }\n    }\n    cout << ans << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202506 二级] 幂和数

## 题目描述

对于正整数 \$n\$，如果 \$n\$ 可以表为两个 \$2\$ 的次幂之和，即 \$n = 2^x + 2^y\$（\$x, y\$ 均为非负整数），那么称 \$n\$ 为幂和数。

给定正整数 \$l, r\$，请你求出满足 \$l \\leq n \\leq r\$ 的整数 \$n\$ 中有多少个幂和数。

## 输入格式

一行，两个正整数 \$l, r\$，含义如上。

## 输出格式

输出一行，一个整数，表示 \$l, r\$ 之间幂和数的数量。
`,
      score: 25,
      explanation: "预先枚举所有满足 n=2^x+2^y 的数，去重后统计落在区间 [l,r] 内的个数即可。因为 2 的幂增长很快，指数范围很小。",
      tags: ["编程题", "枚举", "集合"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long l, r;\n    cin >> l >> r;\n    set<long long> s;\n    vector<long long> pw;\n    for (long long x = 1; x <= r; x <<= 1) {\n        pw.push_back(x);\n        if (x > r / 2) break;\n    }\n    for (long long a : pw) {\n        for (long long b : pw) {\n            if (a+b >= l && a+b <= r) s.insert(a+b);\n        }\n    }\n    cout << s.size() << '\\n';\n    return 0;\n}",
      answer: '',
    }
]
};
