// 2026年3月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      question: `
# 编程题
`,
      explanation: "对每个城市都做一次 BFS，得到它到所有城市的最短距离，并取其中最大值作为该城市的建设难度（也就是图论中的离心率）。最后在所有城市中选离心率最小的，若并列则取编号最小的。由于图无权且连通，BFS 可以在 $O(n+m)$ 时间求出单源最短路。",
      tags: ["编程题", "图论", "BFS", "最短路"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> g($n+1$);\n    for (int i = 0; i < m; ++i) {\n        int u, v;\n        cin >> u >> v;\n        g[u].push_back(v);\n        g[v].push_back(u);\n    }\n\n    int bestCity = 1;\n    int bestEcc = INT_MAX;\n    vector<int> dist($n+1$);\n    queue<int> q;\n\n    for (int s = 1; s <= n; ++s) {\n        fill(dist.begin(), dist.end(), -1);\n        while (!q.empty()) q.pop();\n        dist[s] = 0;\n        q.push(s);\n        while (!q.empty()) {\n            int u = q.front();\n            q.pop();\n            for (int v : g[u]) {\n                if (dist[v] == -1) {\n                    dist[v] = dist[u]+1;\n                    q.push(v);\n                }\n            }\n        }\n\n        int ecc = 0;\n        for (int i = 1; i <= n; ++i) ecc = max(ecc, dist[i]);\n        if (ecc < bestEcc) {\n            bestEcc = ecc;\n            bestCity = s;\n        }\n    }\n\n    cout << bestCity << '\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      question: `
# 编程题
`,
      explanation: "先将所有积极度从小到大排序。一个人数大于 1 的小组对“最大值减最小值”的贡献，本质上是在所有学生中取一个当前最小值和一个当前最大值配成一组；组内其余成员只影响人数，不影响这部分差值。于是可以按“已经取走了多少对最小/最大值”做动态规划。设 $f[j][k]$ 表示已经形成 $j$ 个小组、共使用了 $k$ 名同学时的最大总收益。若新建一个大小为 $s$ 的小组，则会使用 1 个新的最小值、1 个新的最大值以及 $s-2$ 个中间值，转移增量为 $a_s+(sorted[n-j+1]-sorted[j])$（当 $s=1$ 时差值部分为 0）。枚举小组大小即可求得最优划分。",
      tags: ["编程题", "动态规划", "排序", "区间贪心思想"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<int> c($n+1$), a($n+1$);\n    for (int i = 1; i <= n; ++i) cin >> c[i];\n    for (int i = 1; i <= n; ++i) cin >> a[i];\n\n    sort(c.begin()+1, c.end());\n\n    const int NEG = -1000000000;\n    vector<vector<int>> f($n+1$, vector<int>($n+1$, NEG));\n    f[0][0] = 0;\n    int ans = 0;\n\n    for (int groups = 1; groups <= n; ++groups) {\n        int diff = c[n-groups+1]-c[groups];\n        for (int used = 1; used <= n; ++used) {\n            for (int sz = 1; sz <= used; ++sz) {\n                if (f[groups-1][used-sz] <= NEG / 2) continue;\n                int add = a[sz]+(sz == 1 ? 0 : diff);\n                f[groups][used] = max(f[groups][used], f[groups-1][used-sz]+add);\n                if (used == n) ans = max(ans, f[groups][used]);\n            }\n        }\n    }\n\n    cout << ans << '\n';\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2026-03-l7',
    title: '2026年3月 GESP C++ 七级真题',
    level: 7,
    year: 2026,
    month: 3,
    session: 3,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面关于 C++ 中形参、实参 and 定义域的说法中，正确的一项是（ ）。",
            options: [
                "形参是函数定义时所指定的变量，它只在函数内部有效。",
                "在函数内部，可以修改传入的形参的值，即使该形参是一个常量引用。",
                "实参和形参的类型必须完全一致，否则会导致编译错误。",
                "使用指针作为形参时，形参是指向实参的地址，因此对该指针赋值会影响实参。",
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
            id: 2,
            type: "single",
            question: "已知三个序列：$s_1 = \\{3, 1, 8, 2, 5, 6, 7, 4\\}$，$s_2 = \\{1, 5, 1, 8, 6, 4, 7, 5, 6\\}$，$s_3 = \\{1, 8, 3, 5, 7, 6, 2, 4\\}$。以下哪个序列是它们的最长公共子序列（ ）。",
            options: [
                "$\\{1, 8, 5, 6\\}$",
                "$\\{1, 5, 6, 7\\}$",
                "$\\{1, 8, 6\\}$",
                "$\\{1, 5, 7, 4\\}$",
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
            question: "现有一个地址区间为 $[0, $n-1$]$ 的哈希表，当出现冲突情况，会往后找第一个空的地址存储（到 $n-1$ 冲突了就从 $0$ 开始往后），现在要依次存储 $\\{20, 30, 20, 15, 6\\}$，哈希函数为 $H(key) = key \\bmod 7$。其中 $6$ 存储在哈希表哪个地址中 （ ）。",
            options: [
                "0",
                "1",
                "2",
                "3",
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
            question: "在 $0/1$ 背包问题中，给定一组物品，每个物品有一个重量和价值，背包的容量有限。假设背包的最大容量为 $W$，物品的数量为 $n$，其中第 $i$ 个物品的重量为 $w_i$，价值为 $v_i$。以下关于 $0/1$ 背包问题的描述，正确的是（ ）。",
            options: [
                "在解决 $0/1$ 背包问题时，使用贪心算法可以保证找到最优解，因为物品只能放入一次。",
                "0/1 背包是 P 问题（多项式时间可解问题），它可以在 $O(nW)$ 的时间复杂度内解决。",
                "0/1 背包问题中，动态规划解法的空间复杂度为 $O(nW)$，但可以通过滚动数组技巧将空间复杂度优化到 $O(W)$。",
                "0/1 背包问题中，每个物品只能选择一次，并且子问题之间是独立的，无法重用计算结果。",
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
            question: "一棵深度为 6（根节点深度为 1）的完全二叉树，节点总数最少有（ ）。",
            options: [
                "31",
                "32",
                "63",
                "64",
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
            question: "对于如下二叉树，下面关于访问的顺序说法错误的是（ ）。",
            options: [
                "D E B F H J I G C A 是它的后序遍历序列。",
                "A B C D E F G H I J 是它的⼴度优先遍历序列。",
                "A B D E C F G H I J 是它的先序遍历序列。",
                "D B E A F C H G J I 是它的中序遍历序列。",
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
            question: "下面程序的运⾏结果为（ ）。",
            options: [
                "2",
                "3",
                "4",
                "5",
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
            question: "下面程序中，函数 query 的时间复杂度是（ ）。",
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
            question: "有 5 个字符，它们出现的次数分别为 2 次、 2 次、 3 次、 3 次、 5 次。现在要用哈夫曼编码的方式来为这些字符进 ⾏编码，最小加权路径长度 WPL （每个字符的出现次数 它的编码长度，再把每个字符结果加起来）的值为（ ）。",
            options: [
                "30",
                "34",
                "43",
                "47",
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
            question: "下面程序的运⾏结果为（ ）。",
            options: [
                "10",
                "16",
                "26",
                "30",
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
            question: "一个简单无向图有 36 条边，且每个顶点的度数都为 4，则图的顶点个数为（ ）。",
            options: [
                "9",
                "12",
                "18",
                "36",
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
            id: 12,
            type: "single",
            question: "下面关于二叉树的说法正确的是（ ）。",
            options: [
                "任意二叉树的中序遍历与后序遍历必定不相同。",
                "对任意二叉树，若已知先序遍历与后序遍历，则该二叉树唯一确定。",
                "若二叉树有 $n$ 个结点，根节点高度为 $h$，则其高度满足：$2^h-1 \\ge n$。",
                "在二叉树的先序遍历中，根后紧跟的结点一定是根的左孩子。",
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
            question: "假设一个算法时间复杂度的递推式是 $T(n) = 2T(n/2)+n$ ($n$ 为正整数)，且 $T(1) = 1$，那么这个算法的时间复杂度是（ ）。",
            options: [
                "$O(N)$",
                "$O(n \\log n)$",
                "$O(N^2)$",
                "$O(\\log n)$",
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
            question: "下面哪一个可能是下图的深度优先遍历序列（ ）。",
            options: [
                "1, 5, 6, 3, 2, 8, 9, 4, 7",
                "1, 5, 8, 9, 7, 4, 6, 3, 2",
                "3, 2, 1, 4, 7, 6, 9, 5, 8",
                "2, 5, 6, 3, 8, 7, 9, 4, 1",
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
            question: "下面这个有向图的强连通分量的个数是（ ）。",
            options: [
                "3",
                "4",
                "5",
                "6",
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
            id: 16,
            type: "judge",
            question: "C++ 语⾔中，表达式3 ^ 2的结果类型为int，值为9。",
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
            question: "使用cmath头文件中的正弦函数，表达式sin(90)的结果类型为double，值约为1.0。",
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
            question: "使用strcmp(\"10\", \"9\")比较两个字符串，返回值大于 0 ，说明\"10\"比\"9\"大。",
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
            question: "选择排序是一种不稳定的排序算法，而冒泡排序是一种稳定的排序算法。",
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
            id: 20,
            type: "judge",
            question: "求两个长度为 $n$ 序列的最长公共子序列（LCS）长度时，可以使用滚动数组将空间复杂度从 $O(N^2)$ 优化到 $O(N)$。",
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
            question: "在无向图中，所有顶点的度数之和等于边数的两倍。",
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
            id: 22,
            type: "judge",
            question: "使用邻接矩阵存储一个有 $n$ 个顶点、$m$ 条边的图，对该图进行一次完整的 BFS 遍历，时间复杂度为 $O(N^2)$。",
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
            question: "在图像处理或游戏开发中，泛洪（ flood fill ）算法既可以用 BFS 实现，也可以用 DFS 实现。",
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
            id: 24,
            type: "judge",
            question: "使用链地址法处理冲突的哈希表，当所有元素都映射到同一个槽位时，查找操作的最坏时间复杂度为 $O(N)$，其中 $n$ 为元素个数。",
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
            id: 25,
            type: "judge",
            question: "一个包含 $n$ 个顶点的连通无向图，其任何一棵生成树都恰好包含 $n-1$ 条边。",
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
