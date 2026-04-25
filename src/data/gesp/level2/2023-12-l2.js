// 2023年12月 GESP C++ 二级真题 (第4次认证)
export const paperData = {
    id: '2023-12-l2',
    title: '2023年12月 GESP C++ 二级真题',
    level: 2,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: `C++语言中，以下哪个变量命名是错误的？（ ）。`,
            options: ["my_var", "_var1", "123var", "var_123"],
            answer: 2,
            score: 2,
            explanation: 'C++ 变量名不能以数字开头。',
            tags: ["基础语法", "变量与标识符"]
        },
        {
            id: 2,
            type: 'single',
            question: `在 C++ 中，与for(int i = 10; i < 20; i +=2) cout << i;输出结果相同的是 （ ） 。`,
            options: ["for(int i = 10; i < 19; i +=2) cout << i;", "for(int i = 11; i < 19; i +=2) cout << i;", "for(int i = 10; i < 21; i +=2) cout << i;", "以上均不对"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "输入输出"]
        },
        {
            id: 3,
            type: 'single',
            question: `以下 C++ 代码实现从小到大的顺序输出能整除 N 的数（ N 的因⼦），例如 N=18 时输出 1 2 3 6 9 18 ，横线处应填 入（ ）。`,
            options: ["int i = 0; i < N; i++", "int i = 1; i < N; i++", "int i = 0; i < N+1; i++", "int i = 1; i < N+1; i++"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "运算符", "程序分析"]
        },
        {
            id: 4,
            type: 'single',
            question: `下⾯ C++ 代码用于判断输入的整数是否为对称数，如 1221 . 12321 是对称数，但 123 . 972 不是对称数。下⾯ 对该题对应代码的说法，正确的是（ ）。`,
            options: ["代码没有语法错误，如果 N 为对称数，第 8 行将能正确输出。", "代码没有语法错误，但如果 N 为负数，将导致死循环。", "代码存在语法错误，程序不能被执行。", "代码没有语法错误，但不能达到预期⽬标，因为循环结束 N 总为 0 。"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 5,
            type: 'single',
            question: `下⾯ C++ 代码用于判断 N （大于等于 2 的正整数）是否为质数（素数）。下⾯对如下代码的说法，正确的是（ ）。`,
            options: ["代码能正确判断 N 是否为质数。", "代码总是不能判断 N 是否质数。", "删除第 5 行break，将能正确判断 N 是否质数。", "代码存在漏洞，边界存在问题，应将第 2 行和第 7 行的N / 2改为 N / 2+1。"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["数学逻辑", "程序分析"]
        },
        {
            id: 6,
            type: 'single',
            question: `下⾯ C++ 代码执行后的输出是（ ）。`,
            options: ["2#3#0", "1#2#0", "1#0#", "2#3#"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: `下面C++代码执行后的输出是（ ）。\n\`\`\`cpp\nint cnt = 0;\nfor (int i = 1; i < 10; i++) {\n if (i % 2 == 0) cnt++;\n}\ncout << cnt << "#";\n\`\`\``,
            options: ["5#", "8#", "9#", "4#"],
            answer: 3,
            score: 2,
            explanation: 'i在1到9之间，偶数有2, 4, 6, 8，共4个。所以输出4#。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: `下面C++代码执行后的输出是（ ）。\n\`\`\`cpp\nint N = 100;\nwhile (N % 2 == 0) {\n if (N % 3 == 0) N -= 5;\n else N -= 20;\n}\ncout << N;\n\`\`\``,
            options: ["100", "80", "55", "40"],
            answer: 2,
            score: 2,
            explanation: 'N初始100(非3倍数)->80(非3倍数)->60(3倍数)->55。55是奇数，循环结束。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: `下面C++代码执行后的输出是（ ）。\n\`\`\`cpp\nint x = 1;\nwhile (x < 10) {\n if (x % 3 != 0) cout << x << ",";\n if (x % 3 == 0) x = x+5+2;\n else x += 2;\n}\n\`\`\``,
            options: ["1,3,", "1,3,10,", "1,7,", "1,10,"],
            answer: 3,
            score: 2,
            explanation: 'x从1开始。1不是3倍数输出1,，x变3；3是3倍数x变10；10不是3倍数输出10,，x变12。结果为1,10,。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: `下面C++代码执行后的输出是（ ）。\n\`\`\`cpp\nint cnt = 0;\nfor (int i = 0; i < 4; i++) {\n for (int j = 0; j <= i; j++) {\n cnt++;\n }\n}\ncout << cnt;\n\`\`\``,
            options: ["5", "10", "15", "20"],
            answer: 1,
            score: 2,
            explanation: '双重循环执行次数为 1+2+3+4 = 10。',
            tags: ["循环", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: `以下 C++ 代码用于输出 1-100 （含）的整数平⽅数（完全平⽅数），如 16 是 4 的平⽅，横线处应填写（ ）。`,
            options: ["int(sqrt(i)) * int(sqrt(i)) = i", "int(sqrt(i)) == sqrt(i)", "int(sqrt(i)) * int(sqrt(i)) == i", "int(sqrt(i)) = sqrt(i)"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 12,
            type: 'single',
            question: `下⾯的 C++ 代码用于实现如下左图所示的效果，应在以下右图 C++ 代码中填入（ ）。`,
            options: ["与第 8 行下⾯填入一行：cout << nowNum;", "与第 2 行下⾯填入一行：cout << endl;", "与第 7 行下⾯填入一行：cout << nowNum;", "与第 9 行下⾯填入一行：cout << endl;"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: `某公司新出了一款⽆⼈驾驶的小汽车，通过声控智能驾驶系统，乘客只要告诉汽车⽬的地，车⼦就能⾃动 选择一条优化路线，告诉乘客后驶达那里。请问下⾯哪项不是驾驶系统完成选路所必须的。（ ）`,
            options: ["麦克风", "扬声器", "油量表", "传感器"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 14,
            type: 'single',
            question: `现代计算机是指电⼦计算机，它所基于的是（ ）体系结构。`,
            options: ["艾伦·图灵", "冯·诺依曼", "阿塔纳索夫", "埃克特-莫克利"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 15,
            type: 'single',
            question: `在下面的C++代码中，N必须是小于10大于1的整数，M为正整数。如果M被N整除则M为幸运数，如果M中含有N且能被N整除，则为超级幸运数。有关说法正确的是（ ）。`,
            options: ["如果N输入3，M输入36则将输出：36是3的超级幸运数", "如果N输入7，M输入21则将输出：21是7的幸运数", "如果N输入8，M输入36则将输出：36非8的超级幸运数", "如果N输入3，M输入63则将输出：63是3的超级幸运数"],
            answer: 1,
            score: 2,
            explanation: '21可以被7整除，且不含数字7，所以是7的幸运数。',
            tags: ["程序分析", "逻辑推断"]
        },
        {
            id: 16,
            type: 'judge',
            question: `计算机硬件主要包括运算器、控制器、存储器、输入设备和输出设备。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "五大基本组成部分是经典的冯·诺依曼结构。",
            tags: ["判断题", "计算机基础"]
        },
        {
            id: 17,
            type: 'judge',
            question: `C++ 表达式 \`2 * int('9') * 2\` 的值为 36。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "字符 '9' 的 ASCII 码是 57，故表达式值为 2 * 57 * 2 = 228。",
            tags: ["判断题", "数据类型"]
        },
        {
            id: 18,
            type: 'judge',
            question: `C++ 表达式 \`3+2 && 5-5\` 的值为 \`false\`。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "3+2 = 5 (true)，5-5 = 0 (false)。true && false 为 false。",
            tags: ["判断题", "逻辑运算"]
        },
        {
            id: 19,
            type: 'judge',
            question: `在 C++ 代码中，执行 \`srand(0)\` 后连续两次执行 \`rand()\` 的结果相等。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "srand 设定随机种子，rand 每次调用都会返回随机数序列中的下一个值，通常不相等。",
            tags: ["判断题", "随机数"]
        },
        {
            id: 20,
            type: 'judge',
            question: `C++ 代码中 \`while(1){...}\` 的判断条件不是逻辑值，将导致语法错误。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "在 C++ 中，整数可以隐式转换为逻辑值，非零为真，零为假。while(1) 是合法的死循环。",
            tags: ["判断题", "循环结构"]
        },
        {
            id: 21,
            type: 'judge',
            question: `执行以下 C++ 代码后将输出 0。\n\`\`\`cpp\nint cnt = 0;\nfor (int i = 1; i <= 10; i++) {\n if (i % 3 == 0) continue;\n cnt++;\n}\ncout << cnt % 3;\n\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "1-10 间非 3 倍数有 1, 2, 4, 5, 7, 8, 10，共 7 个。7 % 3 = 1。",
            tags: ["判断题", "循环控制"]
        },
        {
            id: 22,
            type: 'judge',
            question: `在 C++ 代码中，运算符只能处理相同的数据类型，不同类型之间必须转换为相同的数据类型。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "C++ 支持隐式类型转换（如 int+double），不一定要手动转换。",
            tags: ["判断题", "数据类型"]
        },
        {
            id: 23,
            type: 'judge',
            question: `在 C++ 代码中，虽然变量都有数据类型，但同一个变量也可以先后用不同类型的值赋值。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "C++ 是静态强类型语言，变量类型固定，但支持赋值时的自动类型转换。",
            tags: ["判断题", "变量赋值"]
        },
        {
            id: 24,
            type: 'judge',
            question: `小杨最近在准备考 GESP，他用的 Dev C++ 来练习和运行程序，所以 Dev C++ 也是一个小型操作系统。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "Dev C++ 是集成开发环境（IDE），不是操作系统。",
            tags: ["判断题", "基础知识"]
        },
        {
            id: 25,
            type: 'judge',
            question: `表达式 \`sqrt(9.0)\` 的计算结果为 3，且结果类型为 int。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: "sqrt() 函数返回类型是 double。",
            tags: ["判断题", "基础语法"]
        }
    ],
    programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `1
2
10
5`, output: `19` },
        { input: `1
1
5
8`, output: `12` }
      ],
      question: `
# [GESP202312 二级] 小杨做题

## 题目描述

为了准备考试，小杨每天都要做题。第 $1$ 天，小杨做了 $a$ 道题；第 $2$ 天，小杨做了 $b$ 道题；从第 $3$ 天起，小杨每天做的题目数量是前两天的总和。

此外，小杨还规定，当自己某一天做了大于或等于 $m$ 题时，接下来的所有日子里，他就再也不做题了。

请问，到了第 $N$ 天，小杨总共做了多少题呢？

## 输入格式

总共 $4$ 行。第一行一个整数 $a$，第二行一个整数 $b$，第三行一个整数 $m$，第四行一个整数 $N$。

保证 $0 \\le a,b \\le 10$；$a,b < m \\le 1000$；$3 \\le N \\le 364$。

## 输出格式

一行一个整数，表示小杨 $N$ 天里总共做了多少题目。
`,
      score: 25,
      explanation: "从前两天开始递推每天做题数；一旦某天做题数达到或超过 m，这天仍计入总和，但之后的天数都不再增加。",
      tags: ["编程题", "递推", "模拟"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long a, b, m, N;\n    cin >> a >> b >> m >> N;\n    if (N == 1) { cout << a << '\\n'; return 0; }\n    if (N == 2) { cout << a+b << '\\n'; return 0; }\n    long long sum = a+b, x = a, y = b;\n    bool stop = (a >= m || b >= m);\n    for (long long day = 3; day <= N; ++day) {\n        long long cur = 0;\n        if (!stop) {\n            cur = x+y;\n            sum += cur;\n            if (cur >= m) stop = true;\n            x = y;\n            y = cur;\n        }\n    }\n    cout << sum << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5`, output: `|aaa|
|aaa|
|---|
|aaa|
|aaa|` },
        { input: `7`, output: `|aaaaa|
|aaaaa|
|aaaaa|
|-----|
|aaaaa|
|aaaaa|
|aaaaa|` }
      ],
      question: `
# [GESP202312 二级] 小杨的 H 字矩阵

## 题目描述

小杨想要构造一个 $N \\times N$ 的 H 字矩阵（$N$ 为奇数），具体来说，这个矩阵共有 $N$ 行，每行 $N$ 个字符，其中最左列、最右列都是 \`|\` ，而中间一行（即第$\\frac{N+1}{2}$行）的第 $2 \\sim N-1$ 个字符都是 \`-\` ，其余所有字符都是半角小写字母 \`a\`。例如，一个 $N=5$ 的 H 字矩阵如下：
\`\`\`
|aaa|
|aaa|
|---|
|aaa|
|aaa|
\`\`\`
请你帮小杨根据给定的 $N$ 打印出对应的“H 字矩阵”。

## 输入格式

一行一个整数 $N$（$5\\le N \\le 49$ ，保证 $N$ 为奇数）。

## 输出格式

输出对应的“H 字矩阵”。

请严格按格式要求输出，不要擅自添加任何空格、标点、空行等任何符号。你应该恰好输出 $N$ 行，每行除了换行符外恰好包含 $N$ 个字符，这些字符要么是 - ，要么是 | ，要么是 a 。**你的输出必须和标准答案完全一致才能得分，请在提交前仔细检查。**
`,
      score: 25,
      explanation: "最左列和最右列始终输出 |；中间行的内部输出 -；其余位置输出 a。",
      tags: ["编程题", "字符画", "模拟"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int N;\n    cin >> N;\n    int mid = N / 2;\n    for (int i = 0; i < N; ++i) {\n        for (int j = 0; j < N; ++j) {\n            if (j == 0 || j == N-1) cout << '|';\n            else if (i == mid) cout << '-';\n            else cout << 'a';\n        }\n        cout << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    }
]
};
