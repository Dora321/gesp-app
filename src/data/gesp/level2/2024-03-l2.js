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
            question: "（原卷题面缺失：第1题，待补录）",
            options: ["（原卷A待补）", "（原卷B待补）", "（原卷C待补）", "（原卷D待补）"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
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
            question: "下⾯ C++ 代码执行后的输出是？（）",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是？（）",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是？（） int n,a,m,i; n=3, a = 5; m = (a - 1) * 2; for (i=0; i<n-1; i++) m = (m - 1) * 2; cout << m; int n,i,result; n = 81; i = 1, result = 1; while (i * i <= n){ if (n % (i * i) == 0) result = i * i; i += 1; } cout << result;。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 9,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是？（）",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "以下 C++ 代码判断一个正整数 N 的各个数位是否都是偶数。如果都是，则输出 “ 是 ” ，否则输出 “ 否 ” 。例如 N=2024 时输出 “ 是 ” 。则横线处应填入（ ）。 int s,t,ans; s = 2, t = 10; ans = 0; while (s != t){ if (t % 2 == 0 && t / 2 >= s) t /= 2; else t -= 1; ans += 1; } cout << ans; int n, masks, days…",
            options: ["break", "continue", "N = N / 10", "N = N % 10"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 11,
            type: 'single',
            question: "有句俗话叫 “ 三天打渔，两天晒⽹ ” 。如果小杨前三天打渔，后两天晒⽹，一直重复这个过程，以下程序代码 用于判断，第 n 天小杨是在打鱼还是晒⽹，横线处应填写？（ ）",
            options: ["i == 0", "i == 4", "i == 0 && i == 4", "i == 0 || i == 4"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 12,
            type: 'single',
            question: "一个数的所有数字倒序排列后这个数的大小保持不变，这个数就是回文数，⽐如 101 与 6886 都是回文数， ⽽ 100 不是回文数。以下程序代码用于判断一个数是否为回文数，横线处应填写？（ ）",
            options: ["10 * a + n % 10", "a + n % 10", "10 * a + n / 10", "a + n / 10 } if(Flag == true) cout << \" 是 \"; else cout << \" 否 \"; int n,i; cin >> n; i = n % 5; if (__________________) // 在此处填写代码 cout << \"…"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "给定两个整数 与 ，打印出一个栅栏图形，这个栅栏应该分成 段，段与段之间的间隔为 + ， 段内的填 充为 个 - 。形如 ， 时，图形如下： 以下程序代码用于绘制该图形，横线处应填写？（ ）",
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
            question: "（原卷题面缺失：第15题，待补录）",
            options: ["（原卷A待补）", "（原卷B待补）", "（原卷C待补）", "（原卷D待补）"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 16,
            type: 'judge',
            question: "（原卷题面缺失：第1题，待补录）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题"]
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
            question: "（原卷题面缺失：第10题，待补录）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题"]
        }
    ],
    programmingQuestions: [
    {
        "id": 26,
        "type": "programming",
        "title": "乘法问题",
        "problemNumber": "B3954",
        "description": "小 A 最初刚刚学习了乘法，为了帮助他练习，我们给他若干个正整数，并要求他将这些数乘起来。 对于大部分题目，小 A 可以精确地算出答案，不过，若这些数的乘积超过 10^6，小 A 就不会做了。 请你写一个程序，告诉我们小 A 会如何作答。",
        "inputDescription": "第一行一个整数 n，表示正整数的个数。 接下来 n，每行一个整数 a。小 A 需要将所有的 a 乘起来。",
        "outputDescription": "输出一行，如果乘积超过 10^6，则输出 `>1000000`；否则输出所有数的乘积。",
        "samples": [
            {
                "input": "3\n10\n10\n10",
                "output": "1000"
            }
        ],
        "explanation": "边乘边判断是否已经超过 1000000。若超过就可以直接输出 >1000000；否则最终输出精确乘积。",
        "tags": [
            "编程题",
            "模拟",
            "大数界限"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    long long prod = 1;\n    for (int i = 0; i < n; ++i) {\n        long long a;\n        cin >> a;\n        prod *= a;\n        if (prod > 1000000) {\n            cout << \">1000000\\n\";\n            return 0;\n        }\n    }\n    cout << prod << '\\n';\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "小杨的日字矩阵",
        "problemNumber": "B3955",
        "description": "小杨想要构造一个 N× N 的日字矩阵（N 为奇数），具体来说，这个矩阵共有 N 行，每行 N 个字符，其中最左列、最右列都是 `|`，而第一行、最后一行、以及中间一行（即第 N+1/2 行）的第 2\\sim N-1 个字符都是 `-` ，其余所有字符都是半角小写字母 `x` 。例如，一个 N = 5 日字矩阵如下: |---| |xxx| |---| |xxx| |---| 请你帮小杨根据给定的 N 打印出对应的“日字矩阵”。",
        "inputDescription": "一行一个整数 N（5≤ N ≤ 49，保证 N 为奇数）。",
        "outputDescription": "输出对应的“日字矩阵”。 请严格按格式要求输出，不要擅自添加任何空格、标点等任何符号。你一个恰好输出 N 行，每行除了换行符外恰好包含 N 个字符，这些字符要么是 `-`，要么是 `|`，要么是 `x`。**你的输出必须和标准答案完全一致才能得分，请在提交前仔细检查**。",
        "samples": [
            {
                "input": "5",
                "output": "|---|\n|xxx|\n|---|\n|xxx|\n|---|"
            }
        ],
        "explanation": "边框列始终为 |；第一行、最后一行和中间行的内部位置输出 -；其他内部位置输出 x。",
        "tags": [
            "编程题",
            "字符画",
            "模拟"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int N;\n    cin >> N;\n    int mid = N / 2;\n    for (int i = 0; i < N; ++i) {\n        for (int j = 0; j < N; ++j) {\n            if (j == 0 || j == N - 1) cout << '|';\n            else if (i == 0 || i == mid || i == N - 1) cout << '-';\n            else cout << 'x';\n        }\n        cout << '\\n';\n    }\n    return 0;\n}"
    }
]
};
