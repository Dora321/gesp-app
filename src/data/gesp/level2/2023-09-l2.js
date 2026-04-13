// 2023年9月 GESP C++ 二级真题 (第3次认证)
export const paperData = {
    id: '2023-09-l2',
    title: '2023年9月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 9,
    session: 3,
    note: '体系趋于稳定',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "我国第一台大型通用电子计算机使用的逻辑部件是（ ）。",
            options: ["集成电路", "大规模集成电路", "晶体管", "电子管"],
            answer: 3,
            score: 2,
            explanation: '中国第一台通用数字电子计算机于1958年由中科院计算所研制成功，逻辑部件是电子管。',
            tags: ["基础语法", "历史知识"]
        },
        {
            id: 2,
            type: 'single',
            question: "下列流程图的输出结果是（ ）？",
            options: ["5 12", "12 5", "5 5", "12 12"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 3,
            type: 'single',
            question: "如果要找出整数a.b 中较大一个，通常要用下⾯哪种程序结构？（ ）。",
            options: ["顺序结构", "循环结构", "分⽀结构", "跳转结构"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 4,
            type: 'single',
            question: "以下不是 C++ 关键字的是（ ）。",
            options: ["continue", "cout", "break", "goto"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 5,
            type: 'single',
            question: "C++ 表达式int(-123.123 / 10)的值是（ ）。",
            options: ["-124", "-123", "-13", "-12"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 6,
            type: 'single',
            question: "以下 C++ 代码实现从大到小的顺序输出N 的所有因⼦。例如，输入N = 18时输出18 9 6 3 2 1，横线处 应填入（ ）。",
            options: ["; ;", "int i = 1; i < N; i++", "int i = N; i > 0; i--", "int i = N; i > 1; i--"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "如下图所示，输出N 行N 列的矩阵，对角线为 1 ，横线处应填入（ ）。",
            options: ["i = j", "j != j", "i >= j", "i == j"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码用于判断N 是否为质数（素数），约定输入N 为大于等于 2 的正整数，请在横线处填入合适的 代码（ ）。",
            options: ["break", "continue", "exit", "return"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "数学逻辑", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["1#0", "1#", "1#1#1#1#1#1", "1#1#1#1#1#1#0"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "下面C++代码执行后的输出是（ ）。\n```cpp\nint cnt = 0;\nfor (int i = 1; i < 8; i++)\n    for (int j = 1; j <= i; j += 2)\n        cnt++;\ncout << cnt;\n```",
            options: ["16", "28", "35", "36"],
            answer: 0,
            score: 2,
            explanation: '追踪循环次数：i=1,2(各1次); i=3,4(各2次); i=5,6(各3次); i=7(4次)。总计 1+1+2+2+3+3+4 = 16。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下面C++代码执行后的输出是（ ）。\n```cpp\nint cnt = 0;\nfor (int i = 1; i <= 12; i += 3) {\n    if (i % 2 != 0) {\n        for (int j = 1; j < i; j += 2) {\n            cnt++;\n        }\n    }\n}\ncout << cnt;\n```",
            options: ["1", "3", "15", "没有输出"],
            answer: 1,
            score: 2,
            explanation: 'i的取值为1, 4, 7, 10。其中只有1和7是奇数。i=1时内层循环不执行；i=7时，j=1,3,5，cnt共增加3次。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 12,
            type: 'single',
            question: "下面C++代码执行后的输出是（ ）。\n```cpp\nint x = 1;\nwhile (x < 15) {\n    x += 2;\n    if (x % 3 == 0 || x == 11) {\n        if (x / 10) cout << x;\n        else cout << x << \",\";\n    }\n}\n```",
            options: ["3,9,15", "3,9,11", "3,6,9,12", "1,5,7,11,13,15"],
            answer: 1,
            score: 2,
            explanation: 'x依次为3,5,7,9,11,13,15。满足条件的有：x=3(输出3,)，x=9(输出9,)，x=11(输出11)。结果为3,9,11。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "下⾯图形每一行从字母 A 开始，以 ABC ⽅式重复。行数为输入的整数。请在 C++ 代码段横线处填入合适代码 （ ）。",
            options: ["'A'+j / 3", "(char)('A'+j / 3)", "'A'+j % 3", "(char)('A'+j % 3)"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "输入行数，约定 ，输出以下图形。应在 C++ 代码横线处填入（ ）。",
            options: ["(lineCount-i-1) * 2", "(lineCount-i) * 2", "lineCount-i-1", "lineCount-i"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 15,
            type: 'single',
            question: "一个数如果能被某个数（比如 7）整除，或者含有该数，则说该数是该数的相关数。如果 N 为 1 到 9 之间的整数，M 为正整数，则下面 C++ 代码用于判断 M 是否为 N 的相关数。有关说法错误的是（ ）。\n```cpp\nint N, M;\ncin >> N >> M;\nbool flag = false;\nif (M % N == 0) flag = true;\nelse {\n    int temp = M;\n    while (temp > 0) {\n        if (temp % 10 == N) {\n            flag = true;\n            break;\n        }\n        temp /= 10;\n    }\n}\nif (flag) cout << \"Yes\";\n```",
            options: ["该段代码可以正确判断 M 是否为 N 的相关数。", "如果 M 是 N 的整倍数，flag 将被设为 true。", "如果 M 的某一位数字是 N，则 flag 将被设为 true。", "以上说法均正确。"],
            answer: 3,
            score: 2,
            explanation: "该代码先检查整除，再通过循环检查数位中是否包含 N，逻辑完整正确。",
            tags: ["单选题", "程序分析"]
        },
        {
            id: 16,
            type: 'judge',
            question: "二进制数 101.101 在十进制下是 5.005。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "101.101(2) = 5+1/2+1/8 = 5.625。",
            tags: ["判断题", "数制转换"]
        },
        {
            id: 17,
            type: 'judge',
            question: "“神威·太湖之光”超级计算机是中国自主研制的超级计算机，在全球超级计算机 TOP500 排行榜中多次荣膺榜首。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "神威·太湖之光是著名的中国超级计算机，曾在 2016-2018 年间多次获得世界第一。",
            tags: ["判断题", "历史知识"]
        },
        {
            id: 18,
            type: 'judge',
            question: "C++ 表达式 `7.8 / 2` 的值为 3.9，类型为 `float`。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "7.8 是字面量，默认类型是 double，所以计算结果类型也是 double 而非 float。",
            tags: ["判断题", "数据类型"]
        },
        {
            id: 19,
            type: 'judge',
            question: "C++ 表达式 `(2 * 3) || (2+5)` 的值为 67。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "逻辑或运算符 || 的结果只能是 true (1) 或 false (0)，不会是 67。",
            tags: ["判断题", "逻辑运算"]
        },
        {
            id: 20,
            type: 'judge',
            question: "如果 m 和 n 为 int 类型变量，则执行 `for (m = 0, n = 1; n < 9; ) n = ((m = 3 * n, m+1), m-1);` 之后 n 的值为偶数。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该循环执行 3 次：n=1->2->5->14。14 是偶数，正确。",
            tags: ["判断题", "逗号运算符"]
        },
        {
            id: 21,
            type: 'judge',
            question: "如果 a 为 int 类型的变量，则表达式 `(a >= 5 && a <= 10)` 与 `(5 <= a <= 10)` 的值总是相同的。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "后者是链式比较，逻辑上不等价于前者。例如 a=2 时，前者为假，后者为真（5<=2 是 0，0<=10 是真）。",
            tags: ["判断题", "逻辑运算"]
        },
        {
            id: 22,
            type: 'judge',
            question: "在 C++ 中，`while` 循环和 `for` 循环在所有情况下都可以互相转换实现相同的功能。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "for 循环和 while 循环是等价的，可以互相转换。",
            tags: ["判断题", "循环结构"]
        },
        {
            id: 23,
            type: 'judge',
            question: "下⾯ C++ 代码执行后的输出为 0。\n```cpp\nint cnt = 0;\nfor (int i = 0; i < 10; i++) {\n    if (i % 2 == 0) continue;\n    cnt++;\n}\ncout << cnt % 2;\n```",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "i 为 1, 3, 5, 7, 9 时 cnt 增加，最终 cnt 为 5。5 % 2 = 1，输出为 1。",
            tags: ["判断题", "循环控制"]
        },
        {
            id: 24,
            type: 'judge',
            question: "下⾯ C++ 代码执行后的输出为 30。\n```cpp\nint sum = 0;\nfor (int i = 1; i <= 10; i++) {\n    if (i % 3 == 0) sum += i;\n}\ncout << sum;\n```",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "1-10 之间能被 3 整除的数有 3, 6, 9。其和为 18。输出为 18。",
            tags: ["判断题", "循环控制"]
        },
        {
            id: 25,
            type: 'judge',
            question: "下面C++代码执行时如果输入 2024，则输出是 4202。\n```cpp\nint n, m = 0;\ncin >> n;\nwhile (n > 0) {\n    m = m * 10+n % 10;\n    n /= 10;\n}\ncout << m;\n```",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该程序实现数字反转，2024 反转后为 4202。",
            tags: ["判断题", "循环", "程序分析"]
        }
    ],
    programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `5`, output: `+---+
-+-+-
--+--
-+-+-
+---+` },
        { input: `7`, output: `+-----+
-+---+-
--+-+--
---+---
--+-+--
-+---+-
+-----+` }
      ],
      question: `
# [GESP202309 二级] 小杨的 X 字矩阵

## 题目描述

小杨想要构造一个 的 X 字矩阵（ 为奇数），这个矩阵的两条对角线都是半角加号 \`+\` ，其余都是半角减号 \`-\` 。例如，一个 \$5 \\times 5\$ 的 X 字矩阵如下：

\`\`\`plain
+---+
-+-+-
--+--
-+-+-
+---+
\`\`\`

请你帮小杨根据给定的 打印出对应的“X 字矩阵”。

## 输入格式

一行一个整数 （ \$5 \\le N \\le 49\$，保证为奇数）。

## 输出格式

输出对应的“X 字矩阵”。

请严格按格式要求输出，不要擅自添加任何空格、标点、空行等任何符号。你应该恰好输出 \$N\$ 行，每行除了换行符外恰好包含 \$N\$ 个字符，这些字符要么是 \`+\`，要么是 \`-\`。
`,
      score: 25,
      explanation: "逐行逐列输出字符。主对角线和副对角线位置输出 +，其余位置输出 -。",
      tags: ["编程题", "字符画", "模拟"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int N;\n    cin >> N;\n    for (int i = 0; i < N; ++i) {\n        for (int j = 0; j < N; ++j) {\n            if (i == j || i+j == N-1) cout << '+';\n            else cout << '-';\n        }\n        cout << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `352`, output: `4` }
      ],
      question: `
# [GESP202309 二级] 数字黑洞

## 题目描述

给定一个三位数，要求各位不能相同。例如，\$352\$ 是符合要求的，\$112\$ 是不符合要求的。将这个三位数的三个数字重新排列，得到的最大的数，减去得到的最小的数，形成一个新的三位数。对这个新的三位数可以重复上述过程。神奇的是，最终一定会得到 \$495\$！

试试看，重新排列 \$352\$，得到的最大数为 \$532\$，最小数为 \$235\$，它们的差是 \$297\$；变换 \$297\$，得到 \$972-279=693\$；变换 \$693\$，\$963-369=594\$；变换 \$594\$，\$954-459=495\$。因此，经过 \$4\$ 次变换得到了 \$495\$。

现在，输入的三位数，你能通过编程得出，这个三位数经过多少次变换能够得到 \$495\$ 吗？

## 输入格式

输入一行，包含一个符合要求的三位数 \$N\$。

## 输出格式

输出一行，包含一个整数 \$C\$，表示经过 \$C\$ 次变换得到 \$495\$。
`,
      score: 25,
      explanation: "不断把当前三位数的数字重排成最大值和最小值，计算差值，直到得到 495，统计变换次数。需要保留前导零参与三位数构造。",
      tags: ["编程题", "模拟", "排序"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint step(int x) {\n    string s = to_string(x);\n    while ((int)s.size() < 3) s = '0'+s;\n    string a = s, b = s;\n    sort(a.begin(), a.end());\n    sort(b.rbegin(), b.rend());\n    return stoi(b)-stoi(a);\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, cnt = 0;\n    cin >> n;\n    while (n != 495) {\n        n = step(n);\n        ++cnt;\n    }\n    cout << cnt << '\\n';\n    return 0;\n}",
      answer: '',
    }
]
};
