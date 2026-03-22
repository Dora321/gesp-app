// 2024年9月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202409 七级] 矩阵移动

## 题目描述

小杨有一个 \$n \\times m\$ 的矩阵，仅包含 \`01?\` 三种字符。矩阵的行从上到下编号依次为 \$1,2,\\dots, n\$，列从左到右编号依次为 \$1, 2, \\dots, m\$。小杨开始在矩阵的左上角 \$(1,1)\$，小杨只能向下或者向右移动，最终到达右下角 \$(n, m)\$ 时停止，在移动的过程中每经过一个字符 \`1\` 得分会增加一分（包括起点和终点），经过其它字符则分数不变。小杨的初始分数为 \$0\$ 分。

小杨可以将矩阵中不超过 \$x\$ 个字符 \`?\` 变为字符  \`1\`。小杨在修改矩阵后，会以最优的策略从左上角移动到右下角。他想知道自己最多能获得多少分。

## 输入格式

第一行包含一个正整数 \$t\$，代表测试用例组数，接下来是 \$t\$ 组测试用例。对于每组测试用例，一共 \$n + 1\$ 行。

第一行包含三个正整数 \$n, m, x\$，含义如题面所示。  
之后 \$n\$ 行，每行一个长度为 \$m\$ 的仅含 \`01?\` 的字符串。

## 输出格式

对于每组测试用例，输出一行一个整数，代表最优策略下小杨的得分最多是多少。
`,
      explanation: "把所有有宝物的节点连成的最小连通子树取出来。由于每条边最多走一次，整条行走轨迹必须是一条不重复边的路径；因此只有当这棵“宝物子树”本身是一条简单路径时，才可能一次性经过所有宝物节点。实现时可先 DFS 统计每条边两侧是否都含宝物，只把确实属于宝物子树的边计入度数；若子树中存在度数大于 2 的节点，则答案为 No，否则为 Yes。",
      tags: ["编程题", "树", "DFS", "构造判定"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int T;\n    cin >> T;\n    while (T--) {\n        // 在此编写代码\n    }\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int T;\n    cin >> T;\n    while (T--) {\n        int n;\n        cin >> n;\n        vector<int> treasure($n+1$);\n        int totalTreasure = 0;\n        for (int i = 1; i <= n; ++i) {\n            cin >> treasure[i];\n            totalTreasure += treasure[i];\n        }\n\n        vector<vector<int>> g($n+1$);\n        for (int i = 1; i < n; ++i) {\n            int u, v;\n            cin >> u >> v;\n            g[u].push_back(v);\n            g[v].push_back(u);\n        }\n\n        vector<int> sub($n+1$, 0), degree($n+1$, 0);\n        function<void(int, int)> dfs = [&](int u, int parent) {\n            sub[u] = treasure[u];\n            for (int v : g[u]) {\n                if (v == parent) continue;\n                dfs(v, u);\n                if (sub[v] > 0 && totalTreasure-sub[v] > 0) {\n                    degree[u]++;\n                    degree[v]++;\n                }\n                sub[u] += sub[v];\n            }\n        };\n\n        dfs(1, 0);\n\n        bool ok = true;\n        for (int i = 1; i <= n; ++i) {\n            if (degree[i] > 2) {\n                ok = false;\n                break;\n            }\n        }\n        cout << (ok ? \"Yes\" : \"No\") << '\n';\n    }\n    return 0;\n}",
      score: 25,
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202409 七级] 小杨寻宝

## 题目描述

小杨有一棵包含 \$n\$ 个节点的树，树上的一些节点放置有宝物。

小杨可以任意选择一个节点作为起点并在树上移动，但是小杨只能经过每条边至多一次，当小杨经过一条边后，这条边就会消失。小杨每经过一个放置有宝物的节点就会取得该宝物。

小杨想请你帮他判断自己能否成功取得所有宝物。

## 输入格式

**本题单个测试点内有多组测试数据**。输入第一行包含一个正整数 \$t\$，代表测试用例组数。  
接下来是 \$t\$ 组测试用例。对于每组测试用例，一共 \$n+1\$ 行。

第一行包含一个正整数 \$n\$，代表树的节点数。  
第二行包含 \$n\$ 个非负整数 \$a_1, a_2, \\dots a_n\$，其中如果 \$a_i = 1\$，则节点 \$i\$ 放置有宝物；若 \$a_i = 0\$，则节点 \$i\$ 没有宝物。  
之后 \$n - 1\$ 行，每行包含两个正整数 \$x_i, y_i\$，代表存在一条连接节点 \$x_i\$ 和 \$y_i\$ 的边。

## 输出格式

对于每组测试数据，如果小杨能成功取得所有宝物，输出 Yes，否则输出 No。
`,
      explanation: "设 $dp[i]$[j][c] 表示走到格子 (i,j) 且恰好把 c 个问号改成 1 时，能够得到的最大分数。由于转移只来自上方和左方，可以把第一维滚动掉，只保留当前行状态。遇到 1 时分数直接加 1；遇到 0 时只做普通转移；遇到 ? 时既可以不修改，也可以在还可修改时把它改成 1 再额外加 1。最终在终点位置的所有 c≤k 的状态中取最大值即可。",
      tags: ["编程题", "动态规划", "网格DP"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int T;\n    cin >> T;\n    while (T--) {\n        // 在此编写代码\n    }\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int T;\n    cin >> T;\n    while (T--) {\n        int n, m, k;\n        cin >> n >> m >> k;\n        vector<string> a($n+1$);\n        for (int i = 1; i <= n; ++i) {\n            cin >> a[i];\n            a[i] = \" \"+a[i];\n        }\n\n        const int NEG = -1000000000;\n        vector<vector<int>> prev(m+1, vector<int>(k+1, NEG));\n        for (int i = 1; i <= n; ++i) {\n            vector<vector<int>> cur(m+1, vector<int>(k+1, NEG));\n            for (int j = 1; j <= m; ++j) {\n                for (int used = 0; used <= k; ++used) {\n                    int best = NEG;\n                    if (i == 1 && j == 1) best = 0;\n                    if (i > 1) best = max(best, prev[j][used]);\n                    if (j > 1) best = max(best, cur[j-1][used]);\n                    if (best <= NEG / 2) continue;\n\n                    char ch = a[i][j];\n                    if (ch == '1') {\n                        cur[j][used] = max(cur[j][used], best+1);\n                    } else if (ch == '0') {\n                        cur[j][used] = max(cur[j][used], best);\n                    } else {\n                        cur[j][used] = max(cur[j][used], best);\n                        if (used < k) cur[j][used+1] = max(cur[j][used+1], best+1);\n                    }\n                }\n            }\n            prev.swap(cur);\n        }\n\n        int ans = 0;\n        for (int used = 0; used <= k; ++used) ans = max(ans, prev[m][used]);\n        cout << ans << '\n';\n    }\n    return 0;\n}",
      score: 25,
      answer: '',
    }
];

export const paperData = {
    id: '2024-09-l7',
    title: '2024年9月 GESP C++ 七级真题',
    level: 7,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "已知小写字母b的 ASCII 码为 98 ，下列 C++ 代码的输出结果是（ ）。",
            options: [
                "b",
                "c",
                "98",
                "99",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "已知a为int类型变量，下列表达式不符合语法的是（ ）。",
            options: [
                "&a+3",
                "+a & 3",
                "a-- 4",
                "a++3",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下列关于 C++ 语⾔中指针的叙述，不正确的是（ ）。",
            options: [
                "指针变量中存储的是内存地址。",
                "指针变量指向的内存地址不一定能够合法访问。",
                "结构类型中的指针成员不能指向该结构类型。",
                "定义指针变量时必须指定其指向的类型。",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下列关于 C++ 类的说法，错误的是 ( ) 。 #include <iostream> using namespace std; int main() { char a = 'b'; a++; cout << a; return 0; } 1 2 3 4 5 6 7 8",
            options: [
                "将 C++ 类对象通过值传递给函数参数时，会⾃动调用复制构造函数。",
                "将一个类的对象赋值给该类的另一个对象时，不会⾃动调用构造函数。",
                "定义 C++ 类对象时，一定会调用默认构造函数。",
                "构造派生类的对象时，一定会调用基类的构造函数。",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "某二叉树 T 的先序遍历序列为： {A B D C E G H F} ，中序遍历序列为： {D B A H G E C F} ，则下列说法中正 确的是 ( ) 。",
            options: [
                "T 的高为 5",
                "T 有 4 个叶节点",
                "T 是平衡树",
                "以上说法都不对",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "一棵完全二叉树有 431 个结点，则叶结点有多少个？ ( )",
            options: [
                "176",
                "215",
                "216",
                "255",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下列关于树的说法，错误的是（ ）。",
            options: [
                "二叉树的中序遍历与其深度优先遍历总是相同的。",
                "所有树都可以构造一颗二叉树与之一一对应。",
                "如果树的一个叶结点有两个不同的祖先结点，那么其中一个一定是另一个的祖先结点。",
                "树的结点不能有两个⽗结点。",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "一个简单无向图有 10 个结点、 30 条边。再增加多少条边可以成为完全图。（ ）",
            options: [
                "10",
                "15",
                "51",
                "60",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "以下哪个方案可以合理解决或缓解哈希表冲突（ ）。",
            options: [
                "丢弃发生冲突的新元素。",
                "用新元素覆盖发生冲突的元素。",
                "用新元素覆盖在冲突位置的下一个位置。",
                "将新元素放置在冲突位置之后的第一个空位。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "一个迷宫，已知从起点不经过重复结点到达终点的路径有且仅有一条，则下面说法错误的是（ ）。",
            options: [
                "可以使用深度优先搜索找到这条路径。",
                "可以使用⼴度优先搜索找到这条路径。",
                "该迷宫内与起点连通的结点，一定也与终点连通。",
                "该迷宫内与起点连通的结点及它们之间的路径可以抽象为无向无环图。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "2",
                "3",
                "8",
                "无法通过编译。",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "84",
                "495",
                "1012",
                "结果是随机的。",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "上题中程序的时间复杂度为（ ）。",
            options: [
                "[待补充选项]",
                "#include <iostream> #include <cmath> using namespace std; int main() { cout << (int)log(8) << endl; return 0; } 1 2 3 4 5 6 7 #include <iostream> #define N 10 using namespace std; int path[N][N]; int main() { for (int i = 1; i < N; i++) path[i][0] = i; for (int j = 1; j < N; j++) path[0][j] = j; for (int i = 1; i < N; i++) for (int j = 1; j < N; j++) path[i][j] = path[i-1][j]+path[i][j-1]; cout << path[8][4] << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 题号 1 2 3 4 5 6 7 8 9 10 答案",
                "选项C",
                "选项D",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "下面fib函数的时间复杂度为 ( ) 。",
            options: [
                "[待补充选项]",
                ",",
                "选项C",
                "无法正常结束。",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下列选项中，哪个可能是下图的⼴度优先遍历序列（ ）。",
            options: [
                "1, 3, 5, 7, 4, 2, 6, 8, 9",
                "9, 4, 2, 1, 3, 7, 5, 6, 8",
                "1, 3, 5, 7, 6, 8, 9, 4, 2",
                "9, 4, 7, 2, 1, 3, 5, 6, 8",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "表达式'a' << 1的结果为'a '。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 语⾔中，函数可以定义在另一个函数定义之内。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "选择排序一般是不稳定的。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "埃⽒筛法和欧拉筛法都是使用筛法思想生成素数表的算法，欧拉筛法的时间复杂度更低。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "使用math.h或cmath头文件中的正弦函数，表达式sin(30)的结果类型为double、值约为0.5。 int fib_rcd[MAX_N]; int fib(int n) { if (n <= 1) return 1; if (fib_rcd[n] > 0) return fib_rcd[n]; return fib(n-1)+fib(n-2); } 1 2 3 4 5 6 7 8",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "一颗 层的完全二叉树，一定有 个结点。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "一个图，不管是否连通，都可以使用深度优先搜索算法进⾏遍历。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "某个哈希表键值x为整数，H(x) = x % p是常用的哈希函数之一，要求p选择素数是因为这样不会产生 冲突。 ( )",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "使用单链表实现队列时，链表头结点作为队⾸比链表头结点作为队尾更便于操作。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "一个图中，每个结点表达一个⼈，连接两个结点的边表达两个结点对应的⼈相互认识，则这个图可以用来 表达社交⽹络。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        ...programmingQuestions
    ]
};
