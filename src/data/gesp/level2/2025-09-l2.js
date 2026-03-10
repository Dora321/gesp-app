// 2025年9月 GESP C++ 二级真题 (第11次认证)
export const paperData = {
    id: '2025-09-l2',
    title: '2025年9月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "人工智能现在非常火，小杨就想多了解一下，其中就经常听人提到“大模型”。那么请问这里说的“大模型”最贴切是指（ ）。",
            options: ["大电脑模型", "大规模智能", "智能的单位", "大语言模型"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 2,
            type: 'single',
            question: "在 TCP 协议中，完成连接建⽴需要通过（ ）握⼿。",
            options: ["一次", "二次", "三次", "四次"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 3,
            type: 'single',
            question: "下⾯的 C++ 代码用于输入姓名，然后输出姓名，正确的说法是 （ ） 。",
            options: ["XingMing 是汉语拼⾳，不能作为变量名称", "可以将 XingMing 改为 Xing Ming", "可以将 XingMing 改为 xingming", "可以将 XingMing 改为 Xing-Ming"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 4,
            type: 'single',
            question: "下⾯ C++ 代码用于获得正整数 N 的第 M 位数，如 N 等于 1234 ， M 等于 2 ，则输出 3。此题假设 M 的值大于等于 1 且小于等于 N 的位数。横线处应填入的代码是 （ ） 。 string XingMing; cout << \" 请输入您的姓名： \"; cin >> XingMing; cout << XingMing;。",
            options: ["N % div / 10", "N / div / 10", "N % div % 10", "N / div % 10"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 5,
            type: 'single',
            question: "下⾯C++代码执行，其输出是（ ）。",
            options: ["3 4 0", "3 3 3", "4 4 4", "以上都不对"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 6,
            type: 'single',
            question: "某种编号的规则是“XX-Y”，其中XX从00到11，Y从0到9。第1个编号是00-0，第2个编号是01-1，…，第12个 编号11-1，第13个编号00-2，即其编码规则是XX和Y同时增1，到XX到11时下一个变为00，Y到9时，下一个变为0。 下⾯的C++代码用于⽣成第N个编号，横线处应填上的代码是（ ）。",
            options: ["12 10", "10 10", "11 9", "9 9"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["程序分析"]
        },
        {
            id: 7,
            type: 'single',
            question: "下⾯的C++代码执行后其输出是（ ）。",
            options: ["145", "125", "55", "45"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 8,
            type: 'single',
            question: "下⾯C++代码执行后其输出是（ ）。",
            options: ["110", "12", "不确定", "无输出"],
            answer: 1,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "阅读下⾯的C++代码，其中变量都是整型，则说法正确的是（ ）。",
            options: ["b 不能为 0 ，因为 a % b 将导致错误", "a 必须小于 b ，否则 a % b 将导致错误", "a 和 b 都必须为正整数，否则 a % b 将导致错误", "如果 a 输入为 0 ，则不管 b 的输入值是什么，输出值的绝对值都是 abs(b)"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["变量与标识符", "程序分析"]
        },
        {
            id: 10,
            type: 'single',
            question: "下⾯C++代码执行后输出是（ ）。",
            options: ["1#2#4#5#6#", "1#2#4#5#6", "1#2#3#4#5#6#", "1#2#3#4#5#6 -999 则输入结束），相关说法错误的是（"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 11,
            type: 'single',
            question: "下⾯C++代码用于记录多个输入数中的最大数和最小数（输入 ）。 for (i =1; i < 12; i++){ if (i % 2 == 0) continue; for (j = 0; j < i; j++) if (i * j % 2) break; } if(i>= 12) cout << (i * j); cin >>a >> b; while (b != 0){ remainder = a % b; a = b; b = remainder; } cout <<…",
            options: ["程序运行时如果第一个数输入 -999 ，则输出将是 -999 -999", "程序输入过程中，如果输入的第一个数不是 -999 ，则如果待输入的数据中没有 -999 ，则程序能求出已输 入整数中的最大数和最小数", "如果用于输入考试成绩，即成绩中不可能有 -999 ，则程序能求出已输入成绩中的最⾼成绩和最低成绩", "可以将 cin >> now_num; 移动到 while (now_num != -999) { 下⾯，结果不变"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 12,
            type: 'single',
            question: "下⾯C++代码执行后输出与 5 有关数的数量。“与 5 有关的数”定义为含有 5 或者能被 5 整除的数。相关说法 正确的是（ ）。",
            options: ["删除代码中 continue 不影响程序执行结果", "删除 j = i 并将 while 循环内的j修改为 i ，不影响程序执行结果", "代码中 break 修改为 j = 0 ，不影响程序执行结果", "将 while (j > 0) 修正为 while (j >= 0) 不影响程序执行的结果"],
            answer: 2,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "运算符", "程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "下面C++代码实现输出如下图形，应该在横线处填入的代码是（ ）。",
            options: ["N - i + 1 和 i + 1", "N - i 和 i", "N 和 i", "N - i 和 i + 1"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["循环", "条件判断", "输入输出"]
        },
        {
            id: 14,
            type: 'single',
            question: "下⾯C++代码执行，其输出是（ ）。",
            options: ["196 -1", "27 9", "98 97", "不确定"],
            answer: 0,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["输入输出", "程序分析"]
        },
        {
            id: 15,
            type: 'single',
            question: "有个无限长的链，由3种外形相同但材质不同的环链成。3种环的重量分别是3、4、6克，相同材质的多个环每12克一组，分别记为G3、G4、G6。链依次G3、G4、G6循环，同时对链上所有环从头依次编号1、2、3、4……。输入正整数代表环编号，求该编号前所有环（不含该环本身）的重量。下面是C++代码实现，正确说法是（ ）。",
            options: ["必须同时修改L1和L2代码行才能实现功能", "必须同时修改L3和L4代码行才能实现功能", "必须同时修改L3和L5代码行才能实现功能", "其他说法都不对"],
            answer: 3,
            score: 2,
            explanation: '答案依据官方答案。',
            tags: ["基础语法"]
        },
        {
            id: 16,
            type: 'judge',
            question: "在集成开发环境里调试程序时，要注意不能修改源程序，因为如果修改，就要终止调试、关闭该文件并重新打开，才能再次开始调试。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题"]
        },
        {
            id: 17,
            type: 'judge',
            question: "在C++代码中，假设N为正整数且大于100，则 N / 100 将舍弃个位和⼗位，如N为1234则 cout << (N / 100) 将输出 12 。如果N小于100，则其值为 0 。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 18,
            type: 'judge',
            question: "下列C++代码执行后将输出 1 ，因为 a 确实小于 20 和 10。",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 19,
            type: 'judge',
            question: "下⾯的C++代码中变量都是整型，则执行后将输出 1 。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "变量与标识符"]
        },
        {
            id: 20,
            type: 'judge',
            question: "下⾯C++代码执行时如输入 99.99 ，将输出 及格 两个汉字。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 21,
            type: 'judge',
            question: "执行下⾯的C++代码时输入 123 ，则输出是 DCB 。 G = (N - 1) / 9; // L1 R = (N - 1) % 9; // L2: 保存余数 wc += 36*G; if((1 <= R) && (R <= 4)) wc += 3*R; // L3 else if ((5 <= R) && (R <= 7)) wc += 4*R; //…",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "条件判断", "输入输出"]
        },
        {
            id: 22,
            type: 'judge',
            question: "下⾯的 C++ 代码执行后将输出 +#+#3#。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 23,
            type: 'judge',
            question: "下列 C++ 代码用于求斐波那契数列，即第 1 个数 0 ，第 2 个数 1 ，从第三个数开始，是前两个数之和。如果输入 的值为大于 1 的正整数，该代码能实现。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "输入输出", "程序分析"]
        },
        {
            id: 24,
            type: 'judge',
            question: "下⾯的 C++ 不能实现如下输出，但如果将 L1 标记的cout << 0行移动if块外⾯，或者说移动到 L2 标记 行，则可以。（ ）",
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: "该判断题题面或选项存在缺失，答案需按原卷复核。",
            tags: ["判断题", "条件判断", "输入输出"]
        },
        {
            id: 25,
            type: 'judge',
            question: "C++代码 cout << ('5'+4); 执行后的输出为9。（ ）",
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
        "title": "优美的数字",
        "problemNumber": "B4411",
        "description": "如果一个正整数在十进制下的所有数位都相同，小 A 就会觉得这个正整数很优美。例如，正整数 6 的数位都是 6，所以 6 是优美的。正整数 99 的数位都是 9，所以 99 是优美的。正整数 123 的数位不都相同，所以 123 并不优美。 小 A 想知道不超过 n 的正整数中有多少优美的数字。你能帮他数一数吗？",
        "inputDescription": "一行，一个正整数 n。",
        "outputDescription": "一行，一个正整数，表示不超过 n 的优美正整数的数量。",
        "samples": [
            {
                "input": "120",
                "output": "18"
            }
        ],
        "explanation": "优美数字形如 1、2、...、9、11、22、...、99、111...。从 1 位到 n 的位数逐个构造这些“全相同数字”，统计不超过 n 的个数。",
        "tags": [
            "编程题",
            "构造",
            "枚举"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    cin >> n;\n    int ans = 0;\n    for (int d = 1; d <= 9; ++d) {\n        long long x = 0;\n        while (true) {\n            x = x * 10 + d;\n            if (x > n) break;\n            ++ans;\n        }\n    }\n    cout << ans << '\\n';\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "菱形",
        "problemNumber": "B4412",
        "description": "小 A 想绘制一个菱形。具体来说，需要绘制的菱形是一个 n 行 n 列的字符画，n 是一个大于 1 的奇数。菱形的四个顶点依次位于第 1 行、第 1 列、第 n 行、第 n 列的正中间，使用 `#` 绘制。相邻顶点之间也用 `#` 连接。其余位置都是 `.`。 例如，一个 5 行 5 列的菱形字符画是这样的： ..#.. .#.#. #...# .#.#. ..#.. 给定 n，请你帮小 A 绘制对应的菱形。",
        "inputDescription": "一行，一个正整数 n。",
        "outputDescription": "输出共 n 行，表示对应的菱形。",
        "samples": [
            {
                "input": "5",
                "output": "..#..\n.#.#.\n#...#\n.#.#.\n..#.."
            }
        ],
        "explanation": "对网格中每个位置 (i,j)，若它到中心的曼哈顿距离等于半径 mid，就属于菱形边界，输出 #，否则输出 .。",
        "tags": [
            "编程题",
            "字符画",
            "构造"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    int mid = n / 2;\n    for (int i = 0; i < n; ++i) {\n        for (int j = 0; j < n; ++j) {\n            if (abs(i - mid) + abs(j - mid) == mid) cout << '#';\n            else cout << '.';\n        }\n        cout << '\\n';\n    }\n    return 0;\n}"
    }
]
};
