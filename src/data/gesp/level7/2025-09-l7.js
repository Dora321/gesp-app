// 2025年9月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      question: `
# [GESP202509 七级] 连通图

## 题目描述

给定一张包含 \$n\$ 个结点与 \$m\$ 条边的无向图，结点依次以 \$1,2,\\ldots,n\$ 编号，第 \$i\$ 条边（\$1\\le i\\le m\$）连接结点 \$u_i\$ 与结点 \$v_i\$。如果从一个结点经过若干条边可以到达另一个结点，则称这两个结点是连通的。

你需要向图中加入若干条边，使得图中任意两个结点都是连通的。请你求出最少需要加入的边的条数。

注意给出的图中可能包含重边与自环。

## 输入格式

第一行，两个正整数 \$n,m\$，表示图的点数与边数。

接下来 \$m\$ 行，每行两个正整数 \$u_i,v_i\$，表示图中一条连接结点 \$u_i\$ 与结点 \$v_i\$ 的边。

## 输出格式

输出一行，一个整数，表示使得图中任意两个结点连通所需加入的边的最少数量。
`,
      explanation: "若图中共有 c 个连通块，那么至少需要 c-1 条边才能把它们全部连成一个连通块；同时任选一个连通块作为中心，把其余连通块各接一条边过来，也恰好能用 c-1 条边完成，因此答案就是连通块数量减 1。用并查集或 DFS/BFS 统计连通块即可。自环不会改变连通性，重边也只会重复合并同一对点。",
      tags: ["编程题", "图论", "并查集", "连通块"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct DSU {\n    vector<int> p, sz;\n    DSU(int n) : p($n+1$), sz($n+1$, 1) {\n        iota(p.begin(), p.end(), 0);\n    }\n    int find(int x) {\n        return p[x] == x ? x : p[x] = find(p[x]);\n    }\n    void unite(int a, int b) {\n        a = find(a);\n        b = find(b);\n        if (a == b) return;\n        if (sz[a] < sz[b]) swap(a, b);\n        p[b] = a;\n        sz[a] += sz[b];\n    }\n};\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    DSU dsu(n);\n    for (int i = 0; i < m; ++i) {\n        int u, v;\n        cin >> u >> v;\n        dsu.unite(u, v);\n    }\n\n    int components = 0;\n    for (int i = 1; i <= n; ++i) {\n        if (dsu.find(i) == i) components++;\n    }\n    cout << components-1 << '\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      question: `
# [GESP202509 七级] 金币收集

## 题目描述

小 A 正在游玩收集金币的游戏。具体来说，在数轴上将会出现 \$n\$ 枚金币，其中第 \$i\$ 枚（\$1\\le i\\le n\$）金币将会在时刻 \$t_i\$ 出现在数轴上坐标为 \$x_i\$ 的位置。小 A 必须在时刻 \$t_i\$ 恰好位于坐标 \$x_i\$，才可以获得第 \$i\$ 枚金币。

游戏开始时为时刻 \$0\$，此时小 A 的坐标为 \$0\$。正常来说，小 A 可以按游戏机的按键在数轴上左右移动，但不幸的是游戏机的左方向键失灵了。小 A 每个时刻只能选择保持不动，或是向右移动一个单位。换言之，如果小 A 在时刻 \$t\$ 的坐标为 \$x\$，那么他在时刻 \$t+1\$ 的坐标只能是 \$x\$ 或是 \$x+1\$ 二者之一，分别对应保持不动和向右移动。

小 A 想知道他最多能收集多少枚金币。你能帮他收集最多的金币吗？

## 输入格式

第一行，一个正整数 \$n\$，表示金币的数量。

接下来 \$n\$ 行，每行两个正整数 \$x_i,t_i\$，分别表示金币出现的坐标与时刻。

## 输出格式

输出一行，一个整数，表示小 A 最多能收集的金币数量。
`,
      explanation: "若先收集金币 i 再收集金币 j，则必须满足 x_i≤x_j，且从 (x_i,t_i) 走到 (x_j,t_j) 来得及，即 t_j-t_i≥x_j-x_i。把式子改写为 t_j-x_j≥t_i-x_i。于是问题等价于：在所有满足 x_i≤t_i 的金币中，先按 x_i 从小到大排序（x 相同再按 t 排序），再在序列 v_i=t_i-x_i 上求最长不下降子序列长度。因为路径上位置不能后退，这正好刻画了一条可行收集序列。",
      tags: ["编程题", "贪心", "最长不下降子序列", "排序"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Coin {\n    int x, t, v;\n};\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<Coin> coins;\n    coins.reserve(n);\n    for (int i = 0; i < n; ++i) {\n        int x, t;\n        cin >> x >> t;\n        if (t >= x) coins.push_back({x, t, t-x});\n    }\n\n    sort(coins.begin(), coins.end(), [](const Coin& a, const Coin& b) {\n        if (a.x != b.x) return a.x < b.x;\n        return a.t < b.t;\n    });\n\n    vector<int> lis;\n    for (auto &coin : coins) {\n        auto it = upper_bound(lis.begin(), lis.end(), coin.v);\n        if (it == lis.end()) lis.push_back(coin.v);\n        else *it = coin.v;\n    }\n\n    cout << lis.size() << '\n';\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2025-09-l7',
    title: '2025年9月 GESP C++ 七级真题',
    level: 7,
    year: 2025,
    month: 9,
    session: 11,
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
            question: "已知a为int类型变量，p为int *类型变量，下列表达式不符合语法的是（ ）。",
            options: [
                "a * a",
                "p * p",
                "a && a",
                "p && p",
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
            id: 3,
            type: "single",
            question: "下列关于 C++ 类的说法，错误的是（ ）。",
            options: [
                "如果一个类包含纯虚函数，则它不能包含成员变量。",
                "如果一个类包含纯虚函数，则不能用它定义对象。",
                "派生类对象占用的内存总是不小于基类对象。",
                "派生类可以不实现基类的虚函数。",
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
            id: 4,
            type: "single",
            question: "已知数组a的定义int a[10] = {-1};，下列说法不正确的是（ ）。",
            options: [
                "数组a⾄少占用10个int大小的内存，一般为40个字节。",
                "数组a的所有元素均被初始化为-1。",
                "语句a[-1] = 0;不会产生编译错误，但会导致难以预测的运⾏结果。",
                "语句a[13] = 0;不会产生编译错误，但会导致难以预测的运⾏结果。 #include <iostream> using namespace std; int main() { char a = 'b'+1; cout << a; return 0; } 1 2 3 4 5 6 7",
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
            id: 5,
            type: "single",
            question: "一棵完全二叉树有 165 个结点，则叶结点有多少个？ ( )",
            options: [
                "38",
                "82",
                "83",
                "84",
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
            id: 6,
            type: "single",
            question: "下列关于二叉树的说法，错误的是（ ）。",
            options: [
                "二叉排序树的中序遍历顺序与元素排序的顺序是相同的。",
                "⾃平衡二叉查找树（ AVL 树）是一种二叉排序树。",
                "个元素的二叉排序树，其高一定为 。",
                "任意的森林，都可以映射为一颗二叉树进⾏表达和存储。",
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
            question: "下列关于树和图的说法，错误的是（ ）。",
            options: [
                "保留树的所有节点，并把树的每个节点指向其⽗节点，则可以将树转换为一个有向弱连通图。",
                "保留树的所有节点，并把树的每个节点指向其子节点，则可以将树转换为一个有向无环图。",
                "每个连通图都存在生成树。",
                "每个存在生成树的有向图，都一定是强连通的。",
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
            id: 8,
            type: "single",
            question: "对一个包含 个顶点、 条边的图，执⾏⼴度优先搜索，其最优时间复杂度是（ ）。",
            options: [
                "选项A",
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
            id: 9,
            type: "single",
            question: "以下哪个方案不能合理解决或缓解哈希表冲突（ ）。",
            options: [
                "用新元素覆盖发生冲突的哈希表项。",
                "在每个哈希表项处，使用单链表管理该表项的冲突元素。",
                "建⽴额外的单链表，用来管理所有发生冲突的元素。",
                "使用不同的哈希函数再建⽴一个哈希表，用来管理所有发生冲突的元素。",
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
            id: 10,
            type: "single",
            question: "以下关于贪⼼法和动态规划的说法中，错误的是（ ）。",
            options: [
                "对特定的问题，贪⼼法不一定适用。",
                "当特定的问题适用贪⼼法时，通常比动态规划的时间复杂度更低。",
                "对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。",
                "采用动态规划的算法一定具有多项式时间复杂度。",
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
                "8",
                "13",
                "21",
                "无法正常结束。",
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
            question: "下面程序的时间复杂度为（ ）。",
            options: [
                "选项A",
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
            id: 13,
            type: "single",
            question: "下面init_sieve函数的时间复杂度为 ( ) 。",
            options: [
                "选项A",
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
            question: "下面count_triple函数的时间复杂度为 ( ) 。 #include <iostream> using namespace std; int fib(int n) { if (n == 0) return 1; return fib(n-1)+fib(n-2); } int main() { cout << fib(6) << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 int rec_fib[MAX_N]; int fib(int n) { if (n <= 1) return n; if (rec_fib[n] != 0) return rec_fib[n]; return fib(n-1)+fib(n-2); } 1 2 3 4 5 6 7 8 int sieve[MAX_N]; void init_sieve(int n) { for (int i = 1; i <= n; i++) sieve[i] = i; for (int i = 2; i <= n; i++) for (int j = i; j <= n; j += i) sieve[j]--; } 1 2 3 4 5 6 7 8 int gcd(int m, int n) { if (m == 0) return n; return gcd(n % m, m); } int count_triple(int n) { 1 2 3 4 5 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "选项A",
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
            id: 15,
            type: "single",
            question: "下列选项中，哪个不可能是下图的深度优先遍历序列（ ）。",
            options: [
                "2, 3, 5, 7, 8, 9, 6, 4, 1",
                "5, 7, 8, 9, 1, 2, 4, 3, 6",
                "6, 8, 9, 5, 7, 1, 2, 3, 4",
                "8, 5, 7, 9, 1, 2, 3, 6, 4",
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
            question: "C++ 语⾔中，表达式9 && 12的结果类型为int、值为8。",
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
            question: "C++ 语⾔中，在有int a[10];定义的范围内，通过表达式a[-1]进⾏访问将导致编译错误。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
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
            question: "C++ 语⾔中，float和int类型一般都是4字节，因此float类型能够表达不同的浮点数值的数量，与 int类型能够表达不同的整数值的数量是相同的。",
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
            question: "使用math.h或cmath头文件中的对数函数，表达式log(256)的结果类型为double、值约为8.0。",
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
            question: "一棵有 个节点的完全二叉树，则树的深度为 。 ( )",
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
            question: "邻接表和邻接矩阵都是图的存储形式。通常，使用邻接表比使用邻接矩阵的时间复杂度更低。",
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
            question: "C++ 语⾔中，类的构造函数可以声明为私有（ private ）。",
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
            question: "泛洪算法的递归实现容易造成溢出，因此大的二维地图算法中，一般使用⼴度优先搜索实现。 int cnt = 0; for (int v = 1; v * v * 4 <= n; v++) for (int u = v+1; u * (u+v) * 2 <= n; u += 2) if (gcd(u, v) == 1) { int a = u * u-v * v; int b = u * v * 2; int c = u * u+v * v; cnt += n / (a+b+c); } return cnt; } 6 7 8 9 10 11 12 13 14 15 16",
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
            question: "很多游戏中为玩家设置多种可供学习的技能，要学习特定技能⼜往往需要先学习 1 个或以上的前置技能。尽 管这样的技能间依赖关系常被玩家称为 “ 技能树 ” ，但它并不一定是树，更可能是有向无环图。",
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
