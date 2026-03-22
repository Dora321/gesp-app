第一行四个整数 $N , M , a , b$，分别表示商品的数量、商人的数量、你持有的商品以及你希望获得的商品。保证 $0 \\le a,b < N$ ，保证 $a \\ne b$。\ne b\$。

第二行 \$N\$ 个用单个空格隔开的正整数 \$v_0,v_1,…,v_{N-1}\$ ，依次表示每种商品的价值。保证 \$1≤v_i≤10^9\$。

接下来 \$M\$ 行，每行两个整数 \$x_j,y_j\$ ，表示在第 \$j\$ 个商人这，你可以使用第 \$x_j\$ 种商品交换第 \$y_j\$ 种商品。保证 \$0≤x_j,y_j

## 输出格式

输出一行一个整数，表示最少的花费。特别地，如果无法通过交换换取商品 \$b\$ ，请输出 \`No solution\`。
`,
      score: 25,
      explanation: "把每种商品看作图上的点，每次交易看作一条有向边，边权为手续费加上换货需要补的差价（若得到更贵商品则补差，得到更便宜商品则相当于负代价）。答案就是从 s 到 t 的最短路。",
      tags: ["编程题", "图论", "最短路"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m, s, t;\n    cin >> n >> m >> s >> t;\n    vector<long long> val(n);\n    for (int i = 0; i < n; ++i) cin >> val[i];\n    vector<vector<pair<int,long long>>> g(n);\n    for (int i = 0; i < m; ++i) {\n        int x, y;\n        cin >> x >> y;\n        long long w = 1+val[y]-val[x];\n        g[x].push_back({y, w});\n    }\n\n    const long long INF = (1LL << 60);\n    vector<long long> dist(n, INF);\n    vector<int> inq(n, 0), cnt(n, 0);\n    queue<int> q;\n    dist[s] = 0;\n    q.push(s);\n    inq[s] = 1;\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        inq[u] = 0;\n        for (auto [v, w] : g[u]) {\n            if (dist[u] != INF && dist[v] > dist[u]+w) {\n                dist[v] = dist[u]+w;\n                if (!inq[v]) {\n                    q.push(v);\n                    inq[v] = 1;\n                }\n            }\n        }\n    }\n    if (dist[t] == INF) cout << \"No solution\\n\";\n    else cout << dist[t] << '\\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202312 七级] 纸牌游戏

## 题目描述

你和小杨在玩一个纸牌游戏。

你和小杨各有 \$3\$ 张牌，分别是 \$0、1、2\$。你们要进行 \$N\$ 轮游戏，每轮游戏双方都要出一张牌，并按 \$1\$ 战胜 \$0\$，\$2\$ 战胜 \$1\$，\$0\$ 战胜 \$2\$ 的规则决出胜负。第 \$i\$ 轮的胜者可以获得 \$2 \\times a_i\$ 分，败者不得分，如果双方出牌相同，则算平局，二人都可获得 \$a_i\$ 分 \$(i=1,2,\\cdots,N)\$。

玩了一会后，你们觉得这样太过于单调，于是双方给自己制定了不同的新规则。小杨会在整局游戏开始前确定自己全部 \$n\$ 轮的出牌，并将他的全部计划告诉你；而你从第 \$2\$ 轮开始，要么继续出上一轮出的牌，要么记一次“换牌”。游戏结束时，你换了 \$t\$ 次牌，就要额外扣 \$b_1+\\cdots+b_t\$ 分。

请计算出你最多能获得多少分。

## 输入格式

第一行一个整数 \$N\$，表示游戏轮数。

第二行 \$N\$ 个用单个空格隔开的非负整数 \$a_1,\\cdots,a_N\$，意义见题目描述。

第三行 \$N-1\$ 个用单个空格隔开的非负整数 \$b_1,\\cdots,b_{N-1}\$，表示换牌的罚分，具体含义见题目描述。由于游戏进行 \$N\$ 轮，所以你至多可以换 \$N-1\$ 次牌。

第四行 \$N\$ 个用单个空格隔开的整数 \$c_1,\\cdots,c_N\$，依次表示小杨从第 \$1\$ 轮至第 \$N\$ 轮出的牌。保证 \$c
_i\\in{0,1,2}\$。

## 输出格式

一行一个整数，表示你最多获得的分数。
`,
      score: 25,
      explanation: "设 dp[k][j] 表示当前手牌为 k、已经换了 j 次时的最大得分。每轮可以继续沿用上一轮的牌，或者从其他状态换牌过来，多出的罚分在最后统一扣除或在转移时体现。",
      tags: ["编程题", "动态规划"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint score(int me, int he, int winScore) {\n    if ((me == 1 && he == 0) || (me == 2 && he == 1) || (me == 0 && he == 2)) return 2 * winScore;\n    if (me == he) return winScore;\n    return 0;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<int> a($n+1$), b($n+1$, 0), c($n+1$);\n    for (int i = 1; i <= n; ++i) cin >> a[i];\n    for (int i = 1; i < n; ++i) cin >> b[i];\n    for (int i = 1; i <= n; ++i) cin >> c[i];\n\n    const int NEG = -1e9;\n    vector<vector<int>> dp(3, vector<int>($n+1$, NEG));\n    for (int k = 0; k < 3; ++k) dp[k][0] = score(k, c[1], a[1]);\n\n    for (int i = 2; i <= n; ++i) {\n        vector<vector<int>> ndp(3, vector<int>($n+1$, NEG));\n        for (int last = 0; last < 3; ++last) {\n            for (int j = 0; j <= i-2; ++j) if (dp[last][j] > NEG / 2) {\n                ndp[last][j] = max(ndp[last][j], dp[last][j]+score(last, c[i], a[i]));\n                for (int now = 0; now < 3; ++now) if (now != last) {\n                    ndp[now][j+1] = max(ndp[now][j+1], dp[last][j]+score(now, c[i], a[i]));\n                }\n            }\n        }\n        dp.swap(ndp);\n    }\n\n    int ans = 0;\n    for (int k = 0; k < 3; ++k) {\n        for (int j = 0; j < n; ++j) ans = max(ans, dp[k][j]-b[j]);\n    }\n    cout << ans << '\\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    }
];

export const paperData = {
    id: '2023-12-l7',
    title: '2023年12月 GESP C++ 七级真题',
    level: 7,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "定义变量double x，如果下面代码输入为100，输出最接近 ( ) 。",
            options: [
                "0",
                "-5",
                "-8",
                "8",
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
            question: "对于下面动态规划方法实现的函数，以下选项中最适合表达其状态转移函数的为 ( ) 。",
            options: [
                "[待补充选项]",
                "选项B",
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
            id: 3,
            type: "single",
            question: "下面代码可以用来求最长上升子序列（ LIS ）的长度，如果输入是：5 1 7 3 5 9，则输出是 ( ) 。",
            options: [
                "9 7 5 1 1 9",
                "1 2 2 3 4 4",
                "1 3 5 7 9 9",
                "1 1 1 1 1 1",
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
            id: 4,
            type: "single",
            question: "C++ 语⾔中，下列关于关键字static的描述不正确的是 ( ) 。",
            options: [
                "可以修饰类的成员函数。",
                "常量静态成员可以在类外进⾏初始化。",
                "若a是类A常量静态成员，则a的地址都可以访问且唯一。",
                "静态全局对象一定在main函数调用前完成初始化，执⾏完main函数后被析构。",
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
            question: "G是一个非连通无向图，共有28条边，则该图⾄少有 ( ) 个顶点。",
            options: [
                "6",
                "7",
                "8",
                "9",
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
            id: 6,
            type: "single",
            question: "哈希表长 31 ，按照下面的程序依次输入4 17 28 30 4，则最后的4存入哪个位置？（ ）",
            options: [
                "3",
                "4",
                "5",
                "6",
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
            id: 7,
            type: "single",
            question: "某二叉树 T 的先序遍历序列为：{A B D F C E G H}，中序遍历序列为：{B F D A G E H C}，则下列 说法中正确的是 ( ) 。",
            options: [
                "T 的度为 1",
                "T 的高为 4",
                "T 有 4 个叶节点",
                "以上说法都不对",
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
            id: 8,
            type: "single",
            question: "下面代码段可以求两个字符串s1和s2的最长公共子串（ LCS ），下列相关描述不正确的是（ ）。",
            options: [
                "代码的时间复杂度为",
                "代码的空间复杂度为",
                "空间复杂度已经最优",
                "采用了动态规划求解",
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
            id: 9,
            type: "single",
            question: "图的⼴度优先搜索中既要维护一个标志数组标志已访问的图的结点，还需哪种结构存放结点以实现遍历？ ( )",
            options: [
                "双向栈",
                "队列",
                "哈希表",
                "堆",
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
            id: 10,
            type: "single",
            question: "对关键字序列{44 ， 36 ， 23 ， 35 ， 52 ， 73 ， 90 ， 58}建⽴哈希表，哈希函数为h(k)=k%7，执⾏下面的 Insert函数，则等概率情况下的平均成功查找长度（即查找成功时的关键字比较次数的均值）为 ( ) 。",
            options: [
                "7/8",
                "1",
                "1.5",
                "2",
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
            id: 11,
            type: "single",
            question: "学生在读期间所上的某些课程中需要先上其他的课程，所有课程和课程间的先修关系构成一个有向图G， 有向边<U, V>表⽰课程U是课程V的先修课，则要找到某门课程C的全部先修课下面哪种方法不可⾏？ ( )",
            options: [
                "BFS 搜索",
                "DFS 搜索",
                "DFS+BFS",
                "动态规划",
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
            id: 12,
            type: "single",
            question: "一棵完全二叉树有2023个结点，则叶结点有多少个？ ( )",
            options: [
                "1024",
                "1013",
                "1012",
                "1011",
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
            question: "用下面的邻接表结构保存一个有向图G，InfoType和VertexType是定义好的类。设G有n个顶点、 e条弧，则求图G中某个顶点u（其顶点序号为k）的度的算法复杂度是 ( ) 。",
            options: [
                "[待补充选项]",
                "选项B",
                "选项C",
                "选项D",
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
            id: 14,
            type: "single",
            question: "给定一个简单有向图G，判断其中是否存在环路的下列说法哪个最准确？ ( )",
            options: [
                "BFS 更快",
                "DFS 更快",
                "BFS 和 DFS 一样快",
                "不确定",
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
            id: 15,
            type: "single",
            question: "从顶点v1开始遍历下图G得到顶点访问序列，在下面所给的4个序列中符合⼴度优先的序列有⼏个？ ( ) {v1 v2 v3 v4 v5} ，{v1 v2 v4 v3 v5}，{v1 v4 v2 v3 v5}，{v1 v2 v4 v5 v3}",
            options: [
                "4",
                "3",
                "2",
                "1 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            id: 16,
            type: "judge",
            question: "小杨这学期准备参加 GESP 的 7 级考试，其中有关于三角函数的内容，他能够通过下面的代码找到结束循环的 角度值。 ( )",
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
            question: "小杨在开发画笔刷小程序（ applet ），操作之一是选中黄颜⾊，然后在下面的左图的中间区域双击后，就变 成了右图。这个操作可以用图的泛洪算法来实现。 ( )",
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
            question: "假设一棵完全二叉树共有 个节点，则树的深度为 。 ( )",
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
            question: "给定一个数字序列A1 ， A2 ， A3 ， ... ， An，要求i和j（1<=i<=j<=n) ，使Ai+…+Aj最大，可以使用动 态规划方法来求解。 ( )",
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
            question: "若变量x为double类型正数，则log(exp(x)) > log10(x)。 ( )",
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
            question: "简单有向图有n个顶点和e条弧，可以用邻接矩阵或邻接表来存储，二者求节点u的度的时间复杂度一 样。 ( )",
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
            question: "某个哈希表键值x为整数，为其定义哈希函数H(x)=x%p，则p选择素数时不会产生冲突。 ( )",
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
            question: "动态规划只要推导出状态转移方程，就可以写出递归程序来求出最优解。 ( )",
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
            question: "⼴度优先搜索（ BFS ）能够判断图是否连通。 ( )",
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
            question: "在 C++ 中，如果定义了构造函数，则创建对象时先执⾏完缺省的构造函数，再执⾏这个定义的构造函数。 ( )",
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
