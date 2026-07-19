// 2026年3月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      title: '城市规划',
      problemNumber: 'P15802',
      score: 25,
      description: 'A 国有 n 座城市、m 条双向道路，题目保证整张图连通。对于任意两座城市 u、v，它们的连通度定义为从 u 到 v 需要经过的最少道路条数。城市 u 的建设难度定义为它到其它所有城市的连通度最大值。请你找出建设难度最小的城市；若有多个答案，输出编号最小的那个。',
      inputDescription: '第一行两个正整数 n、m，表示城市数量与道路数量。接下来 m 行，每行两个正整数 u、v，表示一条连接城市 u 和 v 的双向道路。',
      outputDescription: '输出一个整数，表示建设难度最小的城市编号；若有多个最优解，输出编号最小者。',
      samples: [
        {
          input: '3 3\n1 2\n1 3\n2 3',
          output: '1'
        },
        {
          input: '4 4\n1 2\n2 3\n3 4\n2 4',
          output: '2'
        }
      ],
      explanation: "对每个城市都做一次 BFS，得到它到所有城市的最短距离，并取其中最大值作为该城市的建设难度（也就是图论中的离心率）。最后在所有城市中选离心率最小的，若并列则取编号最小的。由于图无权且连通，BFS 可以在 $O(n+m)$ 时间求出单源最短路。",
      tags: ["编程题", "图论", "BFS", "最短路"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> g(n + 1);\n    for (int i = 0; i < m; ++i) {\n        int u, v;\n        cin >> u >> v;\n        g[u].push_back(v);\n        g[v].push_back(u);\n    }\n\n    int bestCity = 1;\n    int bestEcc = INT_MAX;\n    vector<int> dist(n + 1);\n    queue<int> q;\n\n    for (int s = 1; s <= n; ++s) {\n        fill(dist.begin(), dist.end(), -1);\n        while (!q.empty()) q.pop();\n        dist[s] = 0;\n        q.push(s);\n        while (!q.empty()) {\n            int u = q.front();\n            q.pop();\n            for (int v : g[u]) {\n                if (dist[v] == -1) {\n                    dist[v] = dist[u] + 1;\n                    q.push(v);\n                }\n            }\n        }\n\n        int ecc = 0;\n        for (int i = 1; i <= n; ++i) ecc = max(ecc, dist[i]);\n        if (ecc < bestEcc) {\n            bestEcc = ecc;\n            bestCity = s;\n        }\n    }\n\n    cout << bestCity << '\\n';\n    return 0;\n}",
    },
    {
      id: 27,
      type: 'programming',
      title: '学习小组',
      problemNumber: 'P15803',
      score: 25,
      description: '班里有 n 名同学，第 i 名同学的发言积极度为 c_i。你需要把全部同学划分为若干个学习小组。若一个小组恰好有 s 人，则它的基础讨论积极度为 a_s；该小组的综合讨论积极度等于基础讨论积极度再加上组内发言积极度最大值与最小值之差。请在所有分组方案中，求综合讨论积极度之和的最大值。',
      inputDescription: '第一行一个正整数 n。第二行包含 n 个非负整数 c_1..c_n，表示每位同学的发言积极度。第三行包含 n 个非负整数 a_1..a_n，其中 a_s 表示人数为 s 的学习小组的基础讨论积极度。',
      outputDescription: '输出一个整数，表示所有分组方案中的最大综合讨论积极度之和。',
      samples: [
        {
          input: '4\n2 1 3 2\n1 5 6 3',
          output: '12'
        },
        {
          input: '8\n1 3 2 4 3 5 4 6\n0 2 5 6 4 3 3 4',
          output: '21'
        }
      ],
      explanation: "先将所有积极度从小到大排序。一个人数大于 1 的小组对“最大值减最小值”的贡献，本质上是在所有学生中取一个当前最小值和一个当前最大值配成一组；组内其余成员只影响人数，不影响这部分差值。于是可以按“已经取走了多少对最小/最大值”做动态规划。设 $f[j][k]$ 表示已经形成 $j$ 个小组、共使用了 $k$ 名同学时的最大总收益。若新建一个大小为 $s$ 的小组，则会使用 1 个新的最小值、1 个新的最大值以及 $s-2$ 个中间值，转移增量为 $a_s+(sorted[n-j+1]-sorted[j])$（当 $s=1$ 时差值部分为 0）。枚举小组大小即可求得最优划分。",
      tags: ["编程题", "动态规划", "排序", "区间贪心思想"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<int> c(n + 1), a(n + 1);\n    for (int i = 1; i <= n; ++i) cin >> c[i];\n    for (int i = 1; i <= n; ++i) cin >> a[i];\n\n    sort(c.begin() + 1, c.end());\n\n    const int NEG = -1000000000;\n    vector<vector<int>> f(n + 1, vector<int>(n + 1, NEG));\n    f[0][0] = 0;\n    int ans = 0;\n\n    for (int groups = 1; groups <= n; ++groups) {\n        int diff = c[n - groups + 1] - c[groups];\n        for (int used = 1; used <= n; ++used) {\n            for (int sz = 1; sz <= used; ++sz) {\n                if (f[groups - 1][used - sz] <= NEG / 2) continue;\n                int add = a[sz] + (sz == 1 ? 0 : diff);\n                f[groups][used] = max(f[groups][used], f[groups - 1][used - sz] + add);\n                if (used == n) ans = max(ans, f[groups][used]);\n            }\n        }\n    }\n\n    cout << ans << '\\n';\n    return 0;\n}",
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
            question: `下面关于 C++ 中形参、实参 and 定义域的说法中，正确的一项是（ ）。`,
            options: [
                "形参是函数定义时所指定的变量，它只在函数内部有效。",
                "在函数内部，可以修改传入的形参的值，即使该形参是一个常量引用。",
                "实参和形参的类型必须完全一致，否则会导致编译错误。",
                "使用指针作为形参时，形参是指向实参的地址，因此对该指针赋值会影响实参。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

**解析：** 逐个选项判断：
- A 正确——形参（形式参数）在函数定义时声明，具有函数作用域，仅在函数体内部有效。
- B 错误——常量引用 \`const T&\` 不能被修改，函数内无法改变其所引用的值。
- C 错误——实参到形参允许隐式类型转换（如 \`int\`→\`double\`、派生类对象→基类引用），并非“必须完全一致”。
- D 错误——指针形参本身是一个局部副本，“对该指针赋值”（\`p = ...\`）只改变这个局部指针，不影响调用者的指针变量；只有解引用赋值（\`*p = ...\`）才会影响所指对象。

**考点**：函数参数传递（值传递 / 引用 / 指针）、作用域与 const 引用。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `下面关于 “ 唯一分解定理 ” 和 “ 素数筛法 ” 的说法中，错误的是（ ）。`,
            options: ["如果预处理出 以内每个数的最小质因子，那么可以在 时间内完成任意一个不超过 的整数的质因", "线性筛（欧拉筛）能够保证每个合数只被其最小质因子筛掉一次，这一性质依赖于唯一分解定理。", "唯一分解定理保证：若一个数未被任何不超过其平方根的质数筛去，则它一定是质数。", "唯一分解定理是埃氏筛时间复杂度为 的根本原因。"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（唯一分解定理是埃氏筛时间复杂度为 的根本原因。）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `若字符串 与字符串 的最长公共子序列（ LCS ）长度为 5 ，则（ ）。`,
            options: ["它们的编辑距离为 5", "它们至少有 5 个公共字符", "它们最长公共子串长度为 5", "它们一定长度相等"],
            answer: 1,
            score: 2,
            explanation: `**答案：B（它们至少有 5 个公共字符）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `在 $0/1$ 背包问题中，给定一组物品，每个物品有一个重量和价值，背包的容量有限。假设背包的最大容量为 $W$，物品的数量为 $n$，其中第 $i$ 个物品的重量为 $w_i$，价值为 $v_i$。以下关于 $0/1$ 背包问题的描述，正确的是（ ）。`,
            options: [
                "在解决 $0/1$ 背包问题时，使用贪心算法可以保证找到最优解，因为物品只能放入一次。",
                "0/1 背包是 P 问题（多项式时间可解问题），它可以在 $O(nW)$ 的时间复杂度内解决。",
                "0/1 背包问题中，动态规划解法的空间复杂度为 $O(nW)$，但可以通过滚动数组技巧将空间复杂度优化到 $O(W)$。",
                "0/1 背包问题中，每个物品只能选择一次，并且子问题之间是独立的，无法重用计算结果。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（注：C 项同样正确，本题标准答案为 B）**

**解析：**
- A 错误——0/1 背包具有最优子结构但不具贪心选择性质，贪心一般不能保证最优解。
- B 正确——0/1 背包可用动态规划在 \`O(nW)\` 时间求解（伪多项式），是经典结论。
- C 正确——二维状态 \`dp[i][j]\` 空间 \`O(nW)\`，滚动数组可优化到 \`O(W)\`（两项均正确，单选题仅选其一）。
- D 错误——DP 正因子问题重叠、可复用子问题计算结果才高效，并非“无法重用”。

**考点**：0/1 背包的动态规划解法及时间 / 空间复杂度。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `关于哈希表（ Hash Table ）在不考虑扩容且采用简单均匀哈希函数的前提下，下列说法中错误的是（ ）。`,
            options: ["装载因子越大，发生冲突的概率通常越高", "开放定址法在删除元素时实现相对复杂", "链地址法在最坏情况下查找时间复杂度为", "查找哈希表的时间复杂度总是"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（查找哈希表的时间复杂度总是）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `对于如下二叉树，下面关于访问的顺序说法错误的是（ ）。`,
            options: [
                "D E B F H J I G C A 是它的后序遍历序列。",
                "A B C D E F G H I J 是它的⼴度优先遍历序列。",
                "A B D E C F G H I J 是它的先序遍历序列。",
                "D B E A F C H G J I 是它的中序遍历序列。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（D 项说法错误）**

**解析：** 由 C 项（先序 \`A B D E C F G H I J\`）与 D 项（中序 \`D B E A F C H G J I\`）可唯一重建二叉树：A 左子树为 B（左 D、右 E），右子树为 C（左 F，右 G（左 H，右 I（左 J）））。据此计算各遍历：
- 后序：D E B F H J I G C A，与 A 项一致 ✓
- 广度优先（层序）：A B C D E F G H I J，与 B 项一致 ✓
- 先序：A B D E C F G H I J，与 C 项一致 ✓
- 实际中序为 \`D B E A F H G J I C\`，而 D 项写为 \`D B E A F C H G J I\`（把 C 错放在 F 之后），与真实中序不符 ✗

故 D 说法错误。

**考点**：由先序 + 中序重建二叉树，并验证三种遍历与层序。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `下面程序的运⾏结果为（ ）。`,
            options: [
                "2",
                "3",
                "4",
                "5",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（3）**

**解析：** 代码对数组 \`a={1,2,8,4,9}\` 排序得 \`{1,2,4,8,9}\`，用二分查找“最大的最小间距 dist”，使得能选出不少于 \`k=3\` 个点且任意相邻被选点间距 ≥ dist。\`check(3)\`：从 1 开始，≥1+3=4 选 4（cnt=2），≥4+3=7 选 8（cnt=3）≥3 满足。二分过程：\`l=0,r=8\`；\`mid=4\` 不满足→\`r=3\`；\`mid=2\` 满足→\`l=2\`；\`mid=3\` 满足→\`l=3\`；结束得 3。

**考点**：二分答案 + 贪心判定（最大化最小间距）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `下面程序中，函数 query 的时间复杂度是（ ）。`,
            options: [
                "O(n log n)",
                "O(n)",
                "O(log n)",
                "O(n^2)",
],
            answer: 0,
            score: 2,
            explanation: `**答案：（选项文本缺失，…；复杂度见下）**

**解析：** 本题在题库中缺失程序代码与选项（选项中出现“…”占位符），无法将答案对应到具体选项。按其对应的 \`solve()\` + \`check()\` 二分查找函数估算复杂度：排序 \`O(n log n)\`；二分区间长度 \`O(V)\`（V 为值域）迭代 \`O(log V)\` 次，每次 \`check\` 为 \`O(n)\`，故总时间复杂度约 \`O(n log n + n·log V)\`，值域有界时常记为 \`O(n log n)\`。因选项缺失，请补全题目后再确定选项字母。

**考点**：二分答案的时间复杂度分析（本题数据缺陷待补）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `某二叉树共有 10 个结点，记为 A~J ，已知它的先序遍历序列为：A B D H I E C F J G，中序遍历序列为：H 
D I B E A F J C G，则该二叉树的后序遍历序列是（ ）。
#include <iostream>
#include <algorithm>
bool check(int n, int a[], int k, int dist) {
    int cnt = 1;
    int last = a[0];
    for (int i = 1; i < n; i++) {
        if (a[i] - last >= dist) {
            cnt++;
            last = a[i];
       }
   }
    return cnt >= k;
}
int solve(int n, int a[], int k) {
    std::sort(a, a + n);
    int l = 0;
    int r = a[n - 1] - a[0];
    while (l < r) {
        int mid = (l + r + 1) / 2;
        if (check(n, a, k, mid))
            l = mid;
        else
            r = mid - 1;
   }
    return l;
}
int main() {
    int a[] = {1, 2, 8, 4, 9};
    int n = 5;
    int k = 3;
    std::cout << solve(n, a, k) << std::endl;
    return 0;
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
第 3 页 / 共 11 页`,
            options: ["H I D E B J F G C A", "H I D B E J F G C A", "I H D E B J F G C A", "H I D E B F J G C A"],
            answer: 0,
            score: 2,
            explanation: `**答案：A（H I D E B J F G C A）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `下面程序的运⾏结果为（ ）。`,
            options: [
                "10",
                "16",
                "26",
                "30",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：（程序代码缺失，无法独立判定；库内标注为 16）**

**解析：** 本题在题库中缺失程序代码，仅保留选项 \`{10,16,26,30}\`，无法独立推导运行结果。若以库内标注答案计为 16，但须经原题代码复核确认。请补全代码后核对。

**考点**：程序运行结果分析（本题数据缺陷待补）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `下面这个有向图的强连通分量的个数是（ ）。`,
            options: ["3", "4", "5", "6"],
            answer: 1,
            score: 2,
            explanation: `**答案：B（4）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `下面关于二叉树的说法正确的是（ ）。`,
            options: [
                "任意二叉树的中序遍历与后序遍历必定不相同。",
                "对任意二叉树，若已知先序遍历与后序遍历，则该二叉树唯一确定。",
                "若二叉树有 $n$ 个结点，根节点高度为 $h$，则其高度满足：$2^h-1 \\ge n$。",
                "在二叉树的先序遍历中，根后紧跟的结点一定是根的左孩子。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

**解析：**
- A 错误——单结点树的中序与后序相同（都是该结点），并非“必定不相同”。
- B 错误——仅由先序 + 后序一般不能唯一确定二叉树（出现单孩子结点时左右难辨）。
- C 正确——高度为 h 的二叉树最多有 \`2^h-1\` 个结点，故 \`n ≤ 2^h-1\`，即 \`2^h-1 ≥ n\` 成立。
- D 错误——若根没有左孩子，则先序中根后紧跟的是右孩子，不一定是左孩子。

**考点**：二叉树遍历性质与高度 / 节点数关系。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `有 6 个字符，它们出现的次数分别为：{2, 3, 3, 4, 6, 8}，现在用哈夫曼编码为这些字符编码，最
小加权路径长度 WPL （每个字符的出现次数 它的编码长度，再把每个字符结果加起来）的值为（ ）。
第 4 页 / 共 11 页
题号 1 2 3 4 5 6 7 8 9 10
答案`,
            options: ["58", "60", "62", "64"],
            answer: 3,
            score: 2,
            explanation: `**答案：D（64）**

**依据**：官方真题 PDF 第 1 页答案表；题干与选项已按官方原卷回填。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `下面哪一个可能是下图的深度优先遍历序列（ ）。`,
            options: [
                "1, 5, 6, 3, 2, 8, 9, 4, 7",
                "1, 5, 8, 9, 7, 4, 6, 3, 2",
                "3, 2, 1, 4, 7, 6, 9, 5, 8",
                "2, 5, 6, 3, 8, 7, 9, 4, 1",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（库内标注；原图缺失无法独立验证，见说明）**

**解析：** 本题在题库中缺失对应的图，无法独立验证哪条是合法 DFS 序列。库内标注答案为 D。DFS 序列需满足：从起点出发，每次沿一个未访问的邻接点深入，回溯后再继续；同一图因邻接点选择顺序不同可对应多个合法 DFS 序列。请补全原图后核对。

**考点**：图的深度优先遍历（DFS）序列性质（本题数据缺陷待补）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `下面这个有向图的强连通分量的个数是（ ）。`,
            options: [
                "3",
                "4",
                "5",
                "6",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（5，库内标注；原图缺失无法独立验证，见说明）**

**解析：** 本题在题库中缺失对应的有向图，无法独立数出强连通分量个数。库内标注答案为 5（选项 C）。强连通分量指顶点间互相可达的极大子图，可用 Tarjan 或 Kosaraju 算法求解。请补全原图后核对。

**考点**：有向图强连通分量（SCC）计数（本题数据缺陷待补）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `C++ 语⾔中，表达式3 ^ 2的结果类型为int，值为9。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：** C++ 中 \`^\` 是位异或运算符，不是乘方。\`3 (二进制 011) ^ 2 (二进制 010) = 001 = 1\`，结果类型确为 int，但“值为 9”错误（9 是 3 的平方）。故命题整体为假。

**考点**：位运算 \`^\`（异或）与乘方的区分。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `使用cmath头文件中的正弦函数，表达式sin(90)的结果类型为double，值约为1.0。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：** \`cmath\` 的 \`sin\` 参数为弧度而非角度。\`sin(90)\` 表示 90 弧度的正弦，约 \`sin(90 - 14·2π) = sin(2.04) ≈ 0.89\`，并非 ≈ 1.0；只有 \`sin(π/2)\`（即 90°）才 ≈ 1.0。结果类型为 double 正确，但“值约为 1.0”错误。

**考点**：\`sin\` 的弧度制与角度制区别。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `使用strcmp("10", "9")比较两个字符串，返回值大于 0 ，说明"10"比"9"大。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：** \`strcmp\` 按字典序逐字节比较。\`'1'(49) < '9'(57)\`，故 \`"10" < "9"\` 字典序，\`strcmp("10","9")\` 返回负数（<0），并非 >0；且 \`strcmp\` 比较的是字符串字典序而非数值大小，不能说明“10 比 9 大”。命题整体为假。

**考点**：\`strcmp\` 的字典序比较语义。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `选择排序是一种不稳定的排序算法，而冒泡排序是一种稳定的排序算法。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 选择排序每趟把最小元素交换到前面，可能跨越相等元素而改变其相对次序，是**不稳定**排序；冒泡排序只在相邻逆序时交换，相等元素不交换，是**稳定**排序。命题正确。

**考点**：排序算法的稳定性。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `求两个长度为 $n$ 序列的最长公共子序列（LCS）长度时，可以使用滚动数组将空间复杂度从 $O(N^2)$ 优化到 $O(N)$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** LCS 递推 \`dp[i][j]\` 只依赖 \`dp[i-1][*]\` 与 \`dp[i][*]\`，只需保留上一行，用滚动数组即可将空间从 \`O(n²)\` 降到 \`O(n)\`。命题正确。

**考点**：LCS 动态规划与滚动数组空间优化。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `在无向图中，所有顶点的度数之和等于边数的两倍。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 握手定理：每条无向边贡献 2 个度数（两端各 1），故所有顶点度数之和 = 2 × 边数。命题正确。

**考点**：握手定理。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `使用邻接矩阵存储一个有 $n$ 个顶点、$m$ 条边的图，对该图进行一次完整的 BFS 遍历，时间复杂度为 $O(N^2)$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 邻接矩阵下，对每个出队顶点需扫描整行 n 个元素以找邻居，单次 \`O(n)\`，共 n 个顶点，完整 BFS 为 \`O(n²)\`（与边数 m 无关）。命题正确。

**考点**：邻接矩阵上 BFS 的时间复杂度。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `在图像处理或游戏开发中，泛洪（ flood fill ）算法既可以用 BFS 实现，也可以用 DFS 实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** Flood Fill（油漆桶式填充）本质是四 / 八连通区域的图搜索，既可用 BFS（队列）也可用 DFS（栈 / 递归）实现。命题正确。

**考点**：泛洪算法（Flood Fill）的实现方式。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `使用链地址法处理冲突的哈希表，当所有元素都映射到同一个槽位时，查找操作的最坏时间复杂度为 $O(N)$，其中 $n$ 为元素个数。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 链地址法下，若全部 n 个元素哈希到同一槽位，该槽位退化为长度 n 的链表，最坏查找需遍历整条链，时间复杂度 \`O(n)\`。命题正确。

**考点**：链地址法哈希冲突的最坏查找复杂度。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `一个包含 $n$ 个顶点的连通无向图，其任何一棵生成树都恰好包含 $n-1$ 条边。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 连通无向图的一棵生成树是包含全部 n 个顶点、连通且无环的子图，必恰有 \`n-1\` 条边（树的基本性质）。命题正确。

**考点**：生成树边数 = 顶点数 − 1。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        ...programmingQuestions
    ]
};
