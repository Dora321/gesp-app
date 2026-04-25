// 2025年6月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `5 4
1 2
2 3
3 1
4 5`, output: `3` },
        { input: `5 10
1 2
1 3
1 4
1 5
2 3
2 4
2 5
3 4
3 5
4 5`, output: `30` }
      ],
      referenceCode: '// 待补充',
      question: `
# [GESP202506 七级] 线图

## 题目描述

给定由 $n$ 个结点与 $m$ 条边构成的简单无向图 $G$，结点依次以 $1,2,\\dots,n$ 编号。简单无向图意味着 $G$ 中不包含重边与自环。$G$ 的**线图** $L(G)$ 通过以下方式构建：

- 初始时线图 $L(G)$ 为空。

- 对于无向图 $G$ 中的一条边，在线图 $L(G)$ 中加入与之对应的一个结点。

- 对于无向图 $G$ 中两条不同的边 $(u_1,v_1),(u_2,v_2)$，若存在 $G$ 中的结点同时连接这两条边（即 $u_1,v_1$ 之一与 $u_2,v_2$ 之一相同），则在线图 $L(G)$ 中加入一条无向边，连接 $(u_1,v_1),(u_2,v_2)$ 在线图中对应的结点。

请你求出线图 $L(G)$ 中所包含的无向边的数量。

## 输入格式

第一行，两个正整数 $n,m$，分别表示无向图 $G$ 中的结点数和边数。

接下来 $m$ 行，每行两个正整数 $u_i,v_i$，表示 $G$ 中连接 $u_i,v_i$ 的一条无向边。

## 输出格式

输出共一行，一个整数，表示线图 $L(G)$ 中所包含的无向边的数量。
`,
      explanation: "原图中一个顶点 v 若度数为 deg(v)，则所有与 v 相连的边两两之间都会在线图中形成相邻关系，一共贡献 C(deg(v),2) 条边。因为原图是简单图，两条不同边至多只有一个公共端点，所以不会重复计数。答案就是所有顶点贡献之和 Σ C(deg(v),2)。",
      tags: ["编程题", "图论", "计数", "度数统计"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<long long> deg($n+1$, 0);\n    for (int i = 0; i < m; ++i) {\n        int u, v;\n        cin >> u >> v;\n        deg[u]++;\n        deg[v]++;\n    }\n\n    long long ans = 0;\n    for (int i = 1; i <= n; ++i) {\n        ans += deg[i] * (deg[i]-1) / 2;\n    }\n    cout << ans << '\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3
1 2
2 4
3 2`, output: `8` },
        { input: `5
1 1
2 3
6 1
8 2
5 7`, output: `2` }
      ],
      referenceCode: '// 待补充',
      question: `
# [GESP202506 七级] 调味平衡

## 题目描述

小 A 准备了 $n$ 种食材用来制作料理，这些食材依次以 $1,2,\\dots,n$ 编号，第 $i$ 种食材的酸度为 $a_i$，甜度为 $b_i$。对于每种食材，小 A 可以选择将其放入料理，或者不放入料理。料理的酸度 $A$ 为放入食材的酸度之和，甜度 $B$ 为放入食材的甜度之和。如果料理的酸度和甜度相等，那么料理的调味是**平衡的**。

过于清淡的料理并不好吃，因此小 A 想在满足料理调味平衡的前提下，合理选择食材，最大化料理的酸度与甜度之和。你能帮他求出在调味平衡的前提下，料理酸度与甜度之和的最大值吗？

## 输入格式

第一行，一个正整数 $n$，表示食材种类数量。

接下来 $n$ 行，每行两个正整数 $a_i,b_i$，表示食材的酸度和甜度。

## 输出格式

输出共一行，一个整数，表示在调味平衡的前提下，料理酸度与甜度之和的最大值。
`,
      explanation: "把每种食材看成“差值”为 d_i=a_i-b_i、“价值”为 w_i=a_i+b_i 的物品。选择若干食材后若总差值为 0，就恰好满足总酸度等于总甜度；同时我们要最大化总价值。因此可做一个以“差值”为维度的 0/1 背包：dp[delta] 表示达到该差值时最大的 S+T。差值可能为负，所以用偏移量把下标平移到非负区间。最后读取差值 0 对应的状态即可。",
      tags: ["编程题", "动态规划", "0/1背包"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<pair<int, int>> items(n);\n    int sumDiff = 0;\n    for (int i = 0; i < n; ++i) {\n        int a, b;\n        cin >> a >> b;\n        items[i] = {a, b};\n        sumDiff += abs(a-b);\n    }\n\n    const int NEG = -1000000000;\n    int offset = sumDiff;\n    vector<int> dp(offset * 2+1, NEG);\n    dp[offset] = 0;\n\n    for (auto [a, b] : items) {\n        int diff = a-b;\n        int val = a+b;\n        vector<int> ndp = dp;\n        for (int i = 0; i <= offset * 2; ++i) {\n            if ($dp[i]$ <= NEG / 2) continue;\n            int ni = i+diff;\n            if (0 <= ni && ni <= offset * 2) {\n                ndp[ni] = max(ndp[ni], $dp[i]$+val);\n            }\n        }\n        dp.swap(ndp);\n    }\n\n    cout << max(0, dp[offset]) << '\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    }
];

export const paperData = {
    id: '2025-06-l7',
    title: '2025年6月 GESP C++ 七级真题',
    level: 7,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `已知小写字母b 的 ASCII 码为 98 ，下列 C++ 代码的输出结果是（ ）。`,
            options: [
                "b",
                "bbbb",
                "f",
                "102",
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
            id: 2,
            type: "single",
            question: `已知a 为int 类型变量，p 为int * 类型变量，下列赋值语句不符合语法的是（ ）。`,
            options: [
                "*(p+a) = *p;",
                "*(p-a) = a;",
                "p+a = p;",
                "p = p+a;",
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
            id: 3,
            type: "single",
            question: `下列关于 C++ 类的说法，错误的是 ( ) 。`,
            options: [
                "如需要使用基类的指针释放派生类对象，基类的析构函数应声明为虚析构函数。",
                "构造派生类对象时，只调用派生类的构造函数，不会调用基类的构造函数。",
                "基类和派生类分别实现了同一个虚函数，派生类对象仍能够调用基类的该方法。",
                "如果函数形参为基类指针，调用时可以传入派生类指针作为实参。",
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
            question: `下列 C++ 代码的输出是（ ）。 #include <iostream> using namespace std; int main() { char a = 'b' ^ 4; cout << a; return 0; } 1 2 3 4 5 6 7`,
            options: [
                "6",
                "8",
                "编译出错，无法运⾏。",
                "不确定，可能发生运⾏时异常。",
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
            id: 5,
            type: "single",
            question: `假定只有一个根节点的树的深度为 ，则一棵有 个节点的完全二叉树，则树的深度为( )。`,
            options: [
                "[待补充选项]",
                "选项B",
                "。",
                "不能确定。",
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
            question: `对于如下图的二叉树，说法正确的是（ ）。`,
            options: [
                "先序遍历是 ABDEC 。",
                "中序遍历是 BDACE 。",
                "后序遍历是 DBCEA 。",
                "⼴度优先遍历是 ABCDE 。",
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
            question: `图的存储和遍历算法，下面说法错误的是（ ）。`,
            options: [
                "图的深度优先遍历须要借助队列来完成。",
                "图的深度优先遍历和⼴度优先遍历对有向图和无向图都适用。",
                "使用邻接矩阵存储一个包含 个顶点的有向图，统计其边数的时间复杂度为 。",
                "同一个图分别使用出边邻接表和入边邻接表存储，其边结点个数相同。",
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
            question: `一个连通的简单有向图，共有28条边，则该图⾄少有( )个顶点。`,
            options: [
                "5 #include <iostream> using namespace std; int main() { int arr[5] = {2, 4, 6, 8, 10}; int * p = arr+2; cout << p[3] << endl; return 0; } 1 2 3 4 5 6 7 8",
                "6",
                "7",
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
            id: 9,
            type: "single",
            question: `以下哪个方案不能合理解决或缓解哈希表冲突（ ）。`,
            options: [
                "在每个哈希表项处，使用不同的哈希函数再建⽴一个哈希表，管理该表项的冲突元素。",
                "在每个哈希表项处，建⽴二叉排序树，管理该表项的冲突元素。",
                "使用不同的哈希函数建⽴额外的哈希表，用来管理所有发生冲突的元素。",
                "覆盖发生冲突的旧元素。",
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
            question: `以下关于动态规划的说法中，错误的是（ ）。`,
            options: [
                "动态规划方法通常能够列出递推公式。",
                "动态规划方法的时间复杂度通常为状态的个数。",
                "动态规划方法有递推和递归两种实现形式。",
                "对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。",
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
            id: 11,
            type: "single",
            question: `下面程序的输出为（ ）。`,
            options: [
                "8",
                "13",
                "64",
                "结果是随机的。",
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
            question: `下面程序的时间复杂度为（ ）。 #include <iostream> using namespace std; int rec_fib[100]; int fib(int n) { if (n <= 1) return n; if (rec_fib[n] == 0) rec_fib[n] = fib(n-1)+fib(n-2); return rec_fib[n]; } int main() { cout << fib(6) << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 int rec_fib[MAX_N]; int fib(int n) { if (n <= 1) return n; if (rec_fib[n] == 0) rec_fib[n] = fib(n-1)+fib(n-2); return rec_fib[n]; } 1 2 3 4 5 6 7 8`,
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
            id: 13,
            type: "single",
            question: `下面search 函数的平均时间复杂度为 ( ) 。`,
            options: [
                "[待补充选项]",
                "选项B",
                "选项C",
                "选项D",
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
            id: 14,
            type: "single",
            question: `下面程序的时间复杂度为（ ）。`,
            options: [
                "[待补充选项]",
                "选项B",
                "选项C",
                "选项D",
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
            id: 15,
            type: "single",
            question: `下列选项中，哪个不可能是下图的⼴度优先遍历序列（ ）。 int search(int n, int * p, int target) { int low = 0, high = n; while (low < high) { int middle = (low+high) / 2; if (target == p[middle]) { return middle; } else if (target > p[middle]) { low = middle+1; } else { high = middle; } } return -1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 int primes[MAXP], num = 0; bool isPrime[MAXN] = {false}; void sieve() { for (int n = 2; n <= MAXN; n++) { if (!isPrime[n]) primes[num++] = n; for (int i = 0; i < num && n * primes[i] <= MAXN; i++) { isPrime[n * primes[i]] = true; if (n % primes[i] == 0) break; } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 题号 1 2 3 4 5 6 7 8 9 10 答案`,
            options: [
                "1, 2, 4, 5, 3, 7, 6, 8, 9",
                "1, 2, 5, 4, 3, 7, 8, 6, 9",
                "1, 4, 5, 2, 7, 3, 8, 6, 9",
                "1, 5, 4, 2, 7, 3, 8, 6, 9",
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
            question: `C++ 语⾔中，表达式9 & 12 的结果类型为int 、值为8 。`,
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
            question: `C++ 语⾔中，指针变量指向的内存地址不一定都能够合法访问。`,
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
            question: `对 个元素的数组进⾏快速排序，最差情况的时间复杂度为 。`,
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
            question: `一般情况下，long long 类型占用的字节数比float 类型多。`,
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
            question: `使用math.h 或cmath 头文件中的函数，表达式pow(10, 3) 的结果的值为1000 、类型为int 。`,
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
            question: `二叉排序树的中序遍历序列一定是有序的。`,
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
            question: `无论哈希表采用何种方式解决冲突，只要管理的元素⾜够多，都无法避免冲突。`,
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
            question: `在 C++ 语⾔中，类的构造函数和析构函数均可以声明为虚函数。`,
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
            question: `动态规划方法将原问题分解为一个或多个相似的子问题，因此必须使用递归实现。`,
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
            question: `如果将城市视作顶点，公路视作边，将城际公路⽹络抽象为简单图，可以满⾜城市间的车道级导航需求。`,
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
