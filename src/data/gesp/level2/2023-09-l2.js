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
            question: "（原卷题面缺失：第1题，待补录）",
            options: ["（原卷A待补）", "（原卷B待补）", "（原卷C待补）", "（原卷D待补）"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
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
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "（该选项文本提取异常，待按原卷补录）", "没有输出"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 12,
            type: 'single',
            question: "下⾯ C++ 代码执行后的输出是（ ）。",
            options: ["（该选项文本提取异常，待按原卷补录）", "3,9,11", "3,6,9,10", "1,5,7,11,13,15"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "下⾯图形每一行从字母 A 开始，以 ABC ⽅式重复。行数为输入的整数。请在 C++ 代码段横线处填入合适代码 （ ）。",
            options: ["'A' + j / 3", "(char)('A' + j / 3)", "'A' + j % 3", "(char)('A' + j % 3)"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 14,
            type: 'single',
            question: "输入行数，约定 ，输出以下图形。应在 C++ 代码横线处填入（ ）。",
            options: ["(lineCount - i - 1) * 2", "(lineCount - i) * 2", "lineCount - i - 1", "lineCount - i"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 15,
            type: 'single',
            question: "（原卷题面缺失：第15题，待补录）",
            options: ["（原卷A待补）", "（原卷B待补）", "（原卷C待补）", "（原卷D待补）"],
            answer: 0,
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
            question: "神威 · 太湖之光超级计算机是中国⾃主研制的超级计算机，在全球超级计算机 TOP500 排行榜中多次荣膺榜 ⾸。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题"]
        },
        {
            id: 18,
            type: 'judge',
            question: "C++ 表达式7.8 / 2的值为3.9，类型为float。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题"]
        },
        {
            id: 19,
            type: 'judge',
            question: "C++ 表达式(2 * 3) || (2 + 5)的值为67。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "条件判断"]
        },
        {
            id: 20,
            type: 'judge',
            question: "如果m 和n为int类型变量，则执行for (m = 0, n = 1; n < 9; ) n = ((m = 3 * n, m + 1), m - 1);之后n的值为偶数。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "循环", "变量与标识符"]
        },
        {
            id: 21,
            type: 'judge',
            question: "如果a为int类型的变量，则表达式(a >= 5 && a <= 10)与(5 <= a <= 10)的值总是相同的。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "条件判断", "变量与标识符"]
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯ C++ 代码执行后的输出为10。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 23,
            type: 'judge',
            question: "执行以下 C++ 代码后的输出为0。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 24,
            type: 'judge',
            question: "执行以下 C++ 代码后的输出为30。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
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
        "title": "小杨的 X 字矩阵",
        "problemNumber": "B3865",
        "description": "小杨想要构造一个 的 X 字矩阵（ 为奇数），这个矩阵的两条对角线都是半角加号 `+` ，其余都是半角减号 `-` 。例如，一个 5 × 5 的 X 字矩阵如下： +---+ -+-+- --+-- -+-+- +---+ 请你帮小杨根据给定的 打印出对应的“X 字矩阵”。",
        "inputDescription": "一行一个整数 （ 5 \\le N \\le 49，保证为奇数）。",
        "outputDescription": "输出对应的“X 字矩阵”。 请严格按格式要求输出，不要擅自添加任何空格、标点、空行等任何符号。你应该恰好输出 N 行，每行除了换行符外恰好包含 N 个字符，这些字符要么是 `+`，要么是 `-`。",
        "samples": [
            {
                "input": "5",
                "output": "+---+\n-+-+-\n--+--\n-+-+-\n+---+"
            }
        ],
        "explanation": "逐行逐列输出字符。主对角线和副对角线位置输出 +，其余位置输出 -。",
        "tags": [
            "编程题",
            "字符画",
            "模拟"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int N;\n    cin >> N;\n    for (int i = 0; i < N; ++i) {\n        for (int j = 0; j < N; ++j) {\n            if (i == j || i + j == N - 1) cout << '+';\n            else cout << '-';\n        }\n        cout << '\\n';\n    }\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "数字黑洞",
        "problemNumber": "B3866",
        "description": "给定一个三位数，要求各位不能相同。例如，352 是符合要求的，112 是不符合要求的。将这个三位数的三个数字重新排列，得到的最大的数，减去得到的最小的数，形成一个新的三位数。对这个新的三位数可以重复上述过程。神奇的是，最终一定会得到 495！ 试试看，重新排列 352，得到的最大数为 532，最小数为 235，它们的差是 297；变换 297，得到 972-279=693；变换 693，963-369=594；变换 594，954-459=495。因此，经过 4 次变换得到了 495。 现在，输入的三位数，你能通过编程得出，这个三位数经过多少次变换能够得到 495 吗？",
        "inputDescription": "输入一行，包含一个符合要求的三位数 N。",
        "outputDescription": "输出一行，包含一个整数 C，表示经过 C 次变换得到 495。",
        "samples": [
            {
                "input": "352",
                "output": "4"
            }
        ],
        "explanation": "不断把当前三位数的数字重排成最大值和最小值，计算差值，直到得到 495，统计变换次数。需要保留前导零参与三位数构造。",
        "tags": [
            "编程题",
            "模拟",
            "排序"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint step(int x) {\n    string s = to_string(x);\n    while ((int)s.size() < 3) s = '0' + s;\n    string a = s, b = s;\n    sort(a.begin(), a.end());\n    sort(b.rbegin(), b.rend());\n    return stoi(b) - stoi(a);\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, cnt = 0;\n    cin >> n;\n    while (n != 495) {\n        n = step(n);\n        ++cnt;\n    }\n    cout << cnt << '\\n';\n    return 0;\n}"
    }
]
};
