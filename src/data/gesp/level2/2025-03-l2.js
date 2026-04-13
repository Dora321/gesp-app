// 2025年3月 GESP C++ 二级真题 (第9次认证)
export const paperData = {
    id: '2025-03-l2',
    title: '2025年3月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "2025年春节有两件轰动全球的事件，一个是DeepSeek横空出世，另一个是贺岁片《哪吒2》票房惊人、进入全球票房榜。下面关于DeepSeek与《哪吒2》的描述成立的是（ ）。",
            options: ["《哪吒2》是一款新型操作系统", "DeepSeek是深海钻探软件", "《哪吒2》可以生成新的软件", "DeepSeek可以根据《哪吒2》的场景生成剧情脚本"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 2,
            type: 'single',
            question: "对整型变量 N ，如果它能够同时被 3 和 5 整除，则输出N 是含有至少两个质因数。如果用流程图来描述处理过 程，则输出语句应该在哪种图形框中（ ）。",
            options: ["圆形框", "椭圆形框", "平行四边形框", "菱形框"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "变量与标识符", "运算符"]
        },
        {
            id: 3,
            type: 'single',
            question: "下⾯ C++ 代码执行，其输出是 （ ） 。",
            options: ["3 4", "3 3", "4 4", "4 3"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 4,
            type: 'single',
            question: "求三色彩球的颜色。有数量无限的红 (Red) 绿 (Green) 蓝 (Blue) 三种彩球排成一行，每组先为 5 个红色球，随后 3 个绿色，最后为 2 个蓝色。每个球都有编号，从左到右依次为 1, 2, 3……。输入整数代表编号，求该编号球的颜色。下⾯是 C++ 代码实现，有关说法正确的是（ ）。\n```cpp\nint N, remainder;\ncin >> N;\nremainder = N % 10;\nif ((1 <= remainder) && (remainder <= 5))\n    cout << \"Red\";\nelse if ((6 <= remainder) && (remainder <= 8))\n    cout << \"Green\";\nelse if ((remainder == 9) || (remainder == 0))\n    cout << \"Blue\";\n```",
            options: ["将 else if ((remainder == 9) || (remainder == 0)) 修改为 else 效果相同", "将 ((1 <= remainder) && (remainder <= 5)) 修改为 (remainder <= 5) 效果相同", "else if ((6 <= remainder) && (remainder <= 8)) 写法错误，应修改为 else if (6 <= remainder <= 8)", "根据题意 remainder = N % 10 应修改为 remainder = N / 10"],
            answer: 0,
            score: 2,
            explanation: '每组 10 个球，用 N % 10 分类。1-5红，6-8绿，9,0蓝。最后一个条件可以用 else 覆盖所有剩余情况（即 9 和 0）。',
            tags: ["条件判断", "程序分析"]
        },
        {
            id: 5,
            type: 'single',
            question: "下⾯ C++ 代码执行后其输出是 （ ） 。",
            options: ["18", "17", "16", "14"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 6,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是 （ ） 。",
            options: ["10", "8", "0", "因为循环执行时会执行break语句而终止循环，所以i的值不确定"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯ C++ 代码执行后输出是（ ）。 int N, remainder; cin >> N; remainder = N % 10; // remainder 变量保存余数 if((1 <= remainder) && (remainder<= 5)) cout << \"Red\"; else if ((6 <= remainder) && (remainder <= 8)) cout << \"Green\"; else if ((remainder == 9) || (rem…",
            options: ["0#0#0#0#0#0#", "0#0#0#0#0#0#0#1#", "0#0#0#0#1#", "0#0#0#0#0#0#1#"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["条件判断", "输入输出", "变量与标识符"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["1-2-1-3-2-1-4-3-2-1-", "1-2-1-3-2-1-4-3-2-1", "0-0-1-0-1-2-0-1-2-3-", "0-0-1-0-1-2-0-1-2-3"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码执行后，将输出能被 2 整除且除以 7 余数为 2 的数。下列选项不能实现的是（ ）。",
            options: ["((i % 2 == 0) && (i % 7 == 2))", "((!(i % 2)) && (i % 7 == 2))", "((!(i % 2)) && (!(i % 7)))", "((i % 2 != 1) && (i % 7 == 2))"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "运算符", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "下面C++代码用于求1到N之间正整数中含有3的数的个数，比如123和32都是符合条件的数。则前后两处横线应填入代码分别是（ ）。",
            options: ["continue 和 j /= 10", "break 和 j /= 10", "continue 和 j %= 10", "break 和 j %= 10"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 11,
            type: 'single',
            question: "如果 a 和 b 均为 int 类型的变量，下列表达式能正确判断 “a 等于 0 且 b 等于 0” 的是（ ）。",
            options: ["!a && !b", "!(a || b)", "a == 0 && b == 0", "以上均正确"],
            answer: 3,
            score: 2,
            explanation: '!a 在 a 为 0 时为真。!(a || b) 在 a 和 b 均为 0 时为真。a == 0 && b == 0 是最直接的判断。故三者均可。',
            tags: ["逻辑运算", "条件判断"]
        },
        {
            id: 12,
            type: 'single',
            question: "哥德巴赫猜想是指大于 2 的偶数都可以分解为两个质数之和，下⾯的代码用于验证 4-1000 之内的偶数能否分 解为两个质数之和。下⾯ C++ 代码中假设 isPrime（ ） 是已经定义好用于判断正整数 N 是否为质数 , 返回 bool 值。对该段代 码， 的说法是（ ）。错误。",
            options: ["将代码isPrime(j) && isPrime(i-j)修改为 isPrime(j) == true && isPrime(i-j) == true效果相同", "代码执行后，输出的一对质数，一定是小的数在前", "即便将外层循环中 i 的上界 1000 修改为很大的整数，也不能说从数学上证明了哥德巴赫猜想", "根据题意， break 语句应该移到 if 语句块之外"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["数学逻辑", "程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "下⾯ C++ 代码用于实现如下图所示的效果（N 为 4 时输出 1-2-1-3-2-1-4-3-2-1-），横线处填入（ ）。\n```cpp\nfor (int i = 1; i <= N; i++) {\n    for (int j = i; j >= 1; j--) {\n        cout << j << \"-\";\n    }\n}\n```",
            options: ["1-2-1-3-2-1-4-3-2-1-", "1-2-1-3-2-1-4-3-2-1", "0-0-1-0-1-2-0-1-2-3-", "0-0-1-0-1-2-0-1-2-3"],
            answer: 0,
            score: 2,
            explanation: '内层循环从 i 递减到 1，外层循环控制 i 从 1 到 N。故输出为 1-, 2-1-, 3-2-1-, 4-3-2-1-。',
            tags: ["嵌套循环", "规律分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "在 C++ 中，（ ）最适合填入横线处用于连续 5 次正确⽣成 1 到 10 之间的随机整数？\n```cpp\nsrand(time(0));\nfor (int i = 0; i < 5; i++)\n    cout << (________________) << \" \";\n```",
            options: ["rand( ) % 11", "rand( ) % 10", "rand( ) % 10+1", "rand() % 9+1"],
            answer: 2,
            score: 2,
            explanation: 'rand() % 10 产生 0-9，加 1 后产生 1-10。',
            tags: ["随机数", "基础语法"]
        },
        {
            id: 15,
            type: 'single',
            question: "在C++中，如果a和b均为float类型的变量，那么二者如果相差足够小（比如0.000001），就可以视作相等。比如2.2345676和2.2345677就可以视作相等。下列哪个表达式能用来正确判断“a等于b”（ ）。",
            options: ["((b-a) < 0.000001)", "((b-a) <= 0.000001)", "(abs(b-a) <= 0.000001)", "(sqrt(b-a) <= 0.000001)"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 16,
            type: 'judge',
            question: "C++ 和 Python 都是高级编程语言，它们的每条语句最终都要通过机器指令来完成。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "高级语言编写的程序最终都需要通过编译器或解释器转换为机器指令才能执行。",
            tags: ["判断题", "基础知识"]
        },
        {
            id: 17,
            type: 'judge',
            question: "在 C++ 代码中，假设 N 为正整数，则 `N-N / 10 * 10` 与 `N % 10` 都将获得 N 的个位数。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "N/10*10 会去掉个位，N-(N/10*10) 就是个位。N%10 也是取个位。",
            tags: ["判断题", "运算符"]
        },
        {
            id: 18,
            type: 'judge',
            question: "C++ 语句 `cout << ((10 <= N <= 12)? \"true\":\"false\")` 中，假设整型变量 N 为 12，则其输出为 true。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "链式比较 `10 <= N <= 12` 会先计算 `10 <= N` 得到 true (1)，然后再计算 `1 <= 12` 得到 true。故无论 N 是多少，只要 `10 <= N` 为真（或假），最后结果都受此逻辑影响。",
            tags: ["判断题", "逻辑运算"]
        },
        {
            id: 19,
            type: 'judge',
            question: "C++ 表达式 `(sqrt(N) * sqrt(N)) == N` 中的 N 如果为正整数，则表达式的值总是为 true。",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "由于浮点数精度的原因，开方再平方的结果不一定精确等于原整数。",
            tags: ["判断题", "数学函数"]
        },
        {
            id: 20,
            type: 'judge',
            question: "下⾯ C++ 执行后将输出 `3*2=6`。\n```cpp\nprintf(\"3*2=6\");\n```",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "printf 会将双引号内的字符串原样输出。",
            tags: ["判断题", "输入输出"]
        },
        {
            id: 21,
            type: 'judge',
            question: "下⾯ C++ 代码执行后的输出是 10。\n```cpp\nint i;\nfor (i = 0; i < 10; i++) continue;\nif (i == 10) cout << i;\n```",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "循环结束后 i 为 10，if 条件成立，输出 10。",
            tags: ["判断题", "循环控制"]
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯ C++ 代码执行后将输出 `4 4`。\n```cpp\nint a = 3, b = 4;\na = b;\nb = a;\ncout << a << \" \" << b;\n```",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "a=b 使 a 变为 4，然后 b=a 使 b 也变为 4。故输出 4 4。",
            tags: ["判断题", "变量赋值"]
        },
        {
            id: 23,
            type: 'judge',
            question: "下⾯的 C++ 代码执行后将输出 10 行 \"OK\"。\n```cpp\nfor (int i = 0; i < 10; i++) {\n    if (i % 2 == 0) continue;\n    cout << \"OK\" << endl;\n}\n```",
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "i % 2 == 0 时跳过，只有 i 为奇数（1, 3, 5, 7, 9）时输出 OK，共 5 次。",
            tags: ["判断题", "循环控制"]
        },
        {
            id: 24,
            type: 'judge',
            question: "将下⾯ C++ 代码中的 `for (int i = 1; i <= n; i++)` 调整为 `for (int i = 0; i < n; i++)`，输出结果通常相同。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "循环次数相同，如果循环体内的逻辑（如数组下标）没有直接依赖 i 的具体数值，则输出相同。GESP 常考此类循环等价性。",
            tags: ["判断题", "循环控制"]
        },
        {
            id: 25,
            type: 'judge',
            question: "下⾯ C++ 代码执行后将输出 `0123`。\n```cpp\nfor (int i = 0; i < 4; i++)\n    cout << i;\n```",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "循环 i 从 0 到 3，依次输出 0, 1, 2, 3。",
            tags: ["判断题", "循环输出"]
        }
    ],
    programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3 4`, output: `1 2 3 4
2 4 6 8
3 6 9 12` }
      ],
      question: `
# [GESP202503 二级] 等差矩阵

## 题目描述

小 A 想构造一个 \$n\$ 行 \$m\$ 列的矩阵，使得矩阵的每一行与每一列均是等差数列。小 A 发现，在矩阵的第 \$i\$ 行第 \$j\$ 列填入整数 \$i \\times j\$，得到的矩阵能满足要求。你能帮小 A 输出这个矩阵吗？

## 输入格式

一行，两个正整数 \$n, m\$。

## 输出格式

共 \$n\$ 行，每行 \$m\$ 个由空格分割的整数，表示小 A 需要构造的矩阵。
`,
      score: 25,
      explanation: "题目已经给出了构造方法：第 i 行第 j 列填 i*j。直接双重循环输出整个矩阵。",
      tags: ["编程题", "构造", "模拟"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    for (int i = 1; i <= n; ++i) {\n        for (int j = 1; j <= m; ++j) {\n            if (j > 1) cout << ' ';\n            cout << i * j;\n        }\n        cout << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `2008
2
28
23
1`, output: `2008 2 29 0` }
      ],
      question: `
# [GESP202503 二级] 时间跨越

## 题目描述

假设现在是 \$y\$ 年 \$m\$ 月 \$d\$ 日 \$h\$ 时而 \$k\$ 小时后是 \$y'\$ 年 \$m'\$ 月 \$d'\$ 日 \$h'\$ 时，对于给定的 \$y, m, d, h, k\$，小杨想请你帮他计算出对应的 \$y', m', d', h'\$ 是多少。

## 输入格式

输入包含五行，每行一个正整数，分别代表 \$y, m, d, h, k\$。

## 输出格式

输出四个正整数，代表 \$y', m', d', h'\$。
`,
      score: 25,
      explanation: "从给定日期时间出发，每次把小时加到下一天，必要时进位月份和年份。2025 不是闰年，因此 2 月有 28 天。",
      tags: ["编程题", "日期", "模拟"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint daysInMonth(int y, int m) {\n    static int md[] = {0,31,28,31,30,31,30,31,31,30,31,30,31};\n    bool leap = (y % 400 == 0) || (y % 4 == 0 && y % 100 != 0);\n    if (m == 2 && leap) return 29;\n    return md[m];\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long y, m, d, h, k;\n    cin >> y >> m >> d >> h >> k;\n    h += k;\n    d += h / 24;\n    h %= 24;\n    while (d > daysInMonth(y, m)) {\n        d -= daysInMonth(y, m);\n        ++m;\n        if (m == 13) { m = 1; ++y; }\n    }\n    cout << y << ' ' << m << ' ' << d << ' ' << h << '\\n';\n    return 0;\n}",
      answer: '',
    }
]
};
