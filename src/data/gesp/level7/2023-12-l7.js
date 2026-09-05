// 2023年12月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      question: `
# [GESP202312 七级] 商品交易

## 题目描述

市场上共有 $N$ 种商品，编号从 $0$ 至 $N-1$ ，其中，第 $i$ 种商品价值 $v_i$ 元。

现在共有 $M$ 个商人，编号从 $0$ 至 $M-1$ 。在第 $j$ 个商人这，你可以使用你手上的第 $x_j$ 种商品交换商人手上的第 $y_j$ 种商品。每个商人都会按照商品价值进行交易，具体来说，如果 $v_{x_j}>v_{y_j}$，他将会付给你 $v_{x_j}-v_{y_j}$元钱；否则，那么你需要付给商人 $v_{y_j}-v_{x_j}$ 元钱。除此之外，每次交易商人还会收取 $1$ 元作为手续费，不论交易商品的价值孰高孰低。

你现在拥有商品 $a$ ，并希望通过一些交换来获得商品 $b$ 。请问你至少要花费多少钱？（当然，这个最小花费也可能是负数，这表示你可以在完成目标的同时赚取一些钱。）

## 输入格式

第一行四个整数 $N , M , a , b$，分别表示商品的数量、商人的数量、你持有的商品以及你希望获得的商品。保证 $0 \\le a,b < N$ ，保证 $a \\ne b$。

第二行 $N$ 个用单个空格隔开的正整数 $v_0,v_1,…,v_{N-1}$ ，依次表示每种商品的价值。保证 $1≤v_i≤10^9$。

接下来 $M$ 行，每行两个整数 $x_j,y_j$ ，表示在第 $j$ 个商人这，你可以使用第 $x_j$ 种商品交换第 $y_j$ 种商品。保证 $0≤x_j,y_j

## 输出格式

输出一行一个整数，表示最少的花费。特别地，如果无法通过交换换取商品 $b$ ，请输出 \`No solution\`。
`,
      score: 25,
      samples: [
        { input: `3 3 0 2
5 3 10
0 1
1 2
0 2`, output: `6` },
        { input: `2 1 0 1
1 2
1 0`, output: `No solution` }
      ],
      explanation: "把每种商品看作图上的点，每次交易看作一条有向边，边权为手续费加上换货需要补的差价（若得到更贵商品则补差，得到更便宜商品则相当于负代价）。任何一条 a→b 路径的总花费 = 交易次数 + v_b - v_a，因此最优解等价于求 a 到 b 的最少交易次数。样例说明：样例 1 中直接用商品 0 换商品 2，花费 1 + 10 - 5 = 6，比经商品 1 中转（-1 + 8 = 7）更优。注：官方样例缺失，此处样例为本站按题意构造并经参考程序验证，待官方 PDF 复核。",
      tags: ["编程题", "图论", "最短路"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m, s, t;\n    cin >> n >> m >> s >> t;\n    vector<long long> val(n);\n    for (int i = 0; i < n; ++i) cin >> val[i];\n    vector<vector<pair<int,long long>>> g(n);\n    for (int i = 0; i < m; ++i) {\n        int x, y;\n        cin >> x >> y;\n        long long w = 1+val[y]-val[x];\n        g[x].push_back({y, w});\n    }\n\n    const long long INF = (1LL << 60);\n    vector<long long> dist(n, INF);\n    vector<int> inq(n, 0), cnt(n, 0);\n    queue<int> q;\n    dist[s] = 0;\n    q.push(s);\n    inq[s] = 1;\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        inq[u] = 0;\n        for (auto [v, w] : g[u]) {\n            if (dist[u] != INF && dist[v] > dist[u]+w) {\n                dist[v] = dist[u]+w;\n                if (!inq[v]) {\n                    q.push(v);\n                    inq[v] = 1;\n                }\n            }\n        }\n    }\n    if (dist[t] == INF) cout << \"No solution\\n\";\n    else cout << dist[t] << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `4
1 2 10 100
1 100 1
1 1 2 0`, output: `219` },
        { input: `6
3 7 2 8 9 4
1 3 9 27 81
0 1 2 1 2 0`, output: `56` }
      ],
      question: `
# [GESP202312 七级] 纸牌游戏

## 题目描述

你和小杨在玩一个纸牌游戏。

你和小杨各有 $3$ 张牌，分别是 $0、1、2$。你们要进行 $N$ 轮游戏，每轮游戏双方都要出一张牌，并按 $1$ 战胜 $0$，$2$ 战胜 $1$，$0$ 战胜 $2$ 的规则决出胜负。第 $i$ 轮的胜者可以获得 $2 \\times a_i$ 分，败者不得分，如果双方出牌相同，则算平局，二人都可获得 $a_i$ 分 $(i=1,2,\\cdots,N)$。

玩了一会后，你们觉得这样太过于单调，于是双方给自己制定了不同的新规则。小杨会在整局游戏开始前确定自己全部 $n$ 轮的出牌，并将他的全部计划告诉你；而你从第 $2$ 轮开始，要么继续出上一轮出的牌，要么记一次“换牌”。游戏结束时，你换了 $t$ 次牌，就要额外扣 $b_1+\\cdots+b_t$ 分。

请计算出你最多能获得多少分。

## 输入格式

第一行一个整数 $N$，表示游戏轮数。

第二行 $N$ 个用单个空格隔开的非负整数 $a_1,\\cdots,a_N$，意义见题目描述。

第三行 $N-1$ 个用单个空格隔开的非负整数 $b_1,\\cdots,b_{N-1}$，表示换牌的罚分，具体含义见题目描述。由于游戏进行 $N$ 轮，所以你至多可以换 $N-1$ 次牌。

第四行 $N$ 个用单个空格隔开的整数 $c_1,\\cdots,c_N$，依次表示小杨从第 $1$ 轮至第 $N$ 轮出的牌。保证 $c
_i\\in{0,1,2}$。

## 输出格式

一行一个整数，表示你最多获得的分数。
`,
      score: 25,
      explanation: "设 dp[k][j] 表示当前手牌为 k、已经换了 j 次时的最大得分。每轮可以继续沿用上一轮的牌，或者从其他状态换牌过来，多出的罚分在最后统一扣除或在转移时体现。",
      tags: ["编程题", "动态规划"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint roundScore(int me, int he, long long a) {\n    if ((me == 1 && he == 0) || (me == 2 && he == 1) || (me == 0 && he == 2)) return 2 * a;\n    if (me == he) return a;\n    return 0;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<long long> a(n + 1), b(n, 0), c(n + 1);\n    for (int i = 1; i <= n; ++i) cin >> a[i];\n    for (int i = 1; i <= n - 1; ++i) cin >> b[i];\n    for (int i = 1; i <= n; ++i) cin >> c[i];\n    vector<long long> prefB(n, 0);\n    for (int i = 1; i <= n - 1; ++i) prefB[i] = prefB[i - 1] + b[i];\n\n    const long long NEG = LLONG_MIN / 4;\n    // dp[card][t]：当前轮出 card、已换 t 次牌时的最大累计得分（不含罚分）\n    vector<array<long long, 3>> dp(n, {NEG, NEG, NEG});\n    for (int card = 0; card < 3; ++card) dp[0][card] = roundScore(card, c[1], a[1]);\n    for (int i = 2; i <= n; ++i) {\n        vector<array<long long, 3>> next(n, {NEG, NEG, NEG});\n        for (int t = 0; t < i - 1; ++t) {\n            for (int card = 0; card < 3; ++card) {\n                if (dp[t][card] == NEG) continue;\n                long long base = dp[t][card];\n                for (int now = 0; now < 3; ++now) {\n                    int nt = t + (now == card ? 0 : 1);\n                    long long val = base + roundScore(now, c[i], a[i]);\n                    if (val > next[nt][now]) next[nt][now] = val;\n                }\n            }\n        }\n        dp = move(next);\n    }\n    long long best = NEG;\n    for (int t = 0; t < n; ++t) {\n        for (int card = 0; card < 3; ++card) {\n            if (dp[t][card] == NEG) continue;\n            best = max(best, dp[t][card] - prefB[t]);\n        }\n    }\n    cout << best << '\\n';\n    return 0;\n}",
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
    source: {
        officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B7%E7%BA%A7.pdf',
        notes: '客观题题面代码、选项与判断题答案已对照官方 PDF 校订；解析为本站补写。',
    },
    verification: {
        status: 'partial',
        reviewedBy: '本站校订',
        reviewedAt: '2026-07-04',
        scope: '客观题题面、代码、选项与判断题答案',
    },
    questions: [
        {
            id: 1,
            type: "single",
            question: `定义变量 double x，如果下面代码输入为 100，输出最接近 ( ) 。
\`\`\`cpp
#include <iostream>
#include <cmath>
using namespace std;
int main() {
    double x;
    cin >> x;
    cout << log10(x) - log2(x) << endl;
    return 0;
}
\`\`\``,
            options: [
                "0",
                "-5",
                "-8",
                "8",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (-5)**

log10(100) = 2；log2(100) = ln100/ln2 ≈ 6.644。所以输出 2 − 6.644 ≈ −4.64，四个选项中最接近 −5。

**考点**：cmath 的 log10 / log2 函数与对数换底估算。心算技巧：2¹⁰ = 1024 ≈ 10³，所以 log2(100) ≈ 10 × (2/3) ≈ 6.7。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `对于下面动态规划方法实现的函数（经典石子合并），以下选项中最适合表达其状态转移函数的为 ( ) 。
\`\`\`cpp
int s[MAX_N], f[MAX_N][MAX_N];
int stone_merge(int n, int a[]) {
    for (int i = 1; i <= n; i++)
        s[i] = s[i - 1] + a[i];
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            if (i == j) f[i][j] = 0;
            else f[i][j] = MAX_F;
    for (int l = 1; l < n; l++)
        for (int i = 1; i <= n - l; i++) {
            int j = i + l;
            for (int k = i; k < j; k++)
                f[i][j] = min(f[i][j], f[i][k] + f[k + 1][j] + s[j] - s[i - 1]);
        }
    return f[1][n];
}
\`\`\``,
            options: [`f(i,j) = min_{i≤k<j}( f(i,j), f(i,k) + f(k+1,j) + s(j) − s(i−1) )`, `f(i,j) = min_{i≤k<j}( f(i,j), f(i,k) + f(k+1,j) + Σ_{t=i..j} a(t) )`, `f(i,j) = min_{i≤k≤j}( f(i,k) + f(k+1,j) + Σ_{t=i..j+1} a(t) )`, `f(i,j) = min_{i≤k<j}( f(i,k) + f(k+1,j) ) + Σ_{t=i..j} a(t)`],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

代码是区间 DP 求石子合并最小代价：f[i][j] 表示合并第 i 到 j 堆的最小代价，s 为前缀和，s[j] − s[i−1] = a(i)+…+a(j) 是本次合并的代价。

关键观察：s[j] − s[i−1] 与枚举变量 k 无关，可以提到 min 外面——所以数学上的状态转移函数就是 D：先对所有分割点 k 取 min(f(i,k) + f(k+1,j))，再加上整段的和。

- **A、B**：把 f(i,j) 自己写进 min 里，那是代码为了滚动更新用 MAX_F 初值的实现写法，不是数学意义上的转移函数。
- **C**：k 的范围写成 i≤k≤j（k=j 时 f(k+1,j) 无意义），求和上界 j+1 也错了。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `下面代码可以用来求最长上升子序列（LIS）的长度，如果输入是：5 1 7 3 5 9，则输出是 ( ) 。
\`\`\`cpp
int a[2023], f[2023];
int main() {
    int n, i, j, ans = -1;
    cin >> n;
    for (i = 1; i <= n; i++) {
        cin >> a[i];
        f[i] = 1;
    }
    for (i = 1; i <= n; i++)
        for (j = 1; j < i; j++)
            if (a[j] < a[i])
                f[i] = max(f[i], f[j] + 1);
    for (i = 1; i <= n; i++) {
        ans = max(ans, f[i]);
        cout << f[i] << " ";
    }
    cout << ans << endl;
    return 0;
}
\`\`\``,
            options: [
                "9 7 5 1 1 9",
                "1 2 2 3 4 4",
                "1 3 5 7 9 9",
                "1 1 1 1 1 1",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (1 2 2 3 4 4)**

第一个数 5 是 n，序列为 1 7 3 5 9。f[i] 表示以 a[i] 结尾的 LIS 长度：

| a[i] | 1 | 7 | 3 | 5 | 9 |
|---|---|---|---|---|---|
| f[i] | 1 | 2 | 2 | 3 | 4 |

- f[2]=2（1,7）；f[3]=2（1,3）；f[4]=3（1,3,5）；f[5]=4（1,3,5,9）。

最后一个循环边求 ans 边输出每个 f[i]，得 \`1 2 2 3 4\`，再输出 ans=4，整体为 \`1 2 2 3 4 4\`。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `C++ 语言中，下列关于关键字static的描述不正确的是 ( ) 。`,
            options: [
                "可以修饰类的成员函数。",
                "常量静态成员可以在类外进行初始化。",
                "若a是类A常量静态成员，则a的地址都可以访问且唯一。",
                "静态全局对象一定在main函数调用前完成初始化，执行完main函数后被析构。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（不正确的是 C）**

- **A** ✅ static 可以修饰成员函数，静态成员函数不依赖具体对象。
- **B** ✅ 静态成员（含常量静态成员）可以在类外进行定义和初始化。
- **C** ❌ 若常量静态成员只在类内用常量表达式初始化、而没有在类外提供定义，那么对它取地址（odr-use）在链接期会失败——"地址都可以访问"并不总成立。
- **D** ✅ 静态全局对象在 main 执行前完成构造（静态初始化阶段），main 结束后按构造的逆序析构。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `G是一个非连通无向图，共有28条边，则该图至少有 ( ) 个顶点。`,
            options: [
                "6",
                "7",
                "8",
                "9",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (9)**

要让顶点数最少，就把 28 条边塞进尽可能"稠密"的连通分量：完全图 K₈ 恰好有 8×7/2 = 28 条边。

但题目要求 G 是**非连通**图，K₈ 本身是连通的，所以至少还要加 1 个孤立顶点，共 8 + 1 = 9 个顶点。这道题的陷阱就在"非连通"三个字。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `哈希表长 31，按照下面的程序依次输入 4 17 28 30 4，则最后的 4 存入哪个位置？（ ）
\`\`\`cpp
const int N = 31;
int htab[N], flag[N];
int main() {
    int n, x, i, j, k;
    cin >> n;
    for (i = 0; i < n; i++) {
        cin >> x;
        k = x % 13;
        while (flag[k]) k = (k + 1) % 13;
        htab[k] = x;
        flag[k] = 1;
    }
    for (i = 0; i < N; i++) cout << htab[i] << " ";
    cout << endl;
    return 0;
}
\`\`\``,
            options: [
                "3",
                "4",
                "5",
                "6",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (6)**

注意两个陷阱：① 第一个输入 4 是元素个数 n，真正插入的是 17、28、30、4；② 表长 31 只是数组大小，哈希取模用的是 13，冲突用线性探测。

- 17 % 13 = 4 → 存入位置 4
- 28 % 13 = 2 → 存入位置 2
- 30 % 13 = 4 → 4 被占 → 探测 5 → 存入位置 5
- 4 % 13 = 4 → 4、5、6 依次探测：4 被占（17）、5 被占（30）、6 空 → **存入位置 6**`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `某二叉树 T 的先序遍历序列为：{A B D F C E G H}，中序遍历序列为：{B F D A G E H C}，则下列 说法中正确的是 ( ) 。`,
            options: [
                "T 的度为 1",
                "T 的高为 4",
                "T 有 4 个叶节点",
                "以上说法都不对",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（T 的高为 4）**

由先序 {A B D F C E G H} 和中序 {B F D A G E H C} 重建二叉树：

1. 先序首元素 A 是根；中序中 A 左边 {B F D} 为左子树，右边 {G E H C} 为右子树。
2. 左子树先序 B D F：B 为根，B 在中序 {B F D} 最左 → B 无左孩子，右孩子子树 {F D}；先序 D F → D 为根，中序 F D → F 是 D 的左孩子。
3. 右子树先序 C E G H：C 为根，中序 {G E H} 都在 C 左边 → C 只有左孩子 E；E 的左右孩子分别是 G、H。

树高 = 4（如路径 A→B→D→F）✅。叶节点是 F、G、H 共 **3** 个（C 错），根 A 有两个孩子、度为 2（A 错），故选 B。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `下面代码段可以求两个字符串 s1 和 s2 的最长公共子串（LCS），下列相关描述不正确的是（ ）。
\`\`\`cpp
while (cin >> s1 >> s2) {
    memset(dp, 0, sizeof(dp));
    int n1 = strlen(s1), n2 = strlen(s2);
    for (int i = 1; i <= n1; ++i)
        for (int j = 1; j <= n2; ++j)
            if (s1[i - 1] == s2[j - 1])
                dp[i][j] = dp[i - 1][j - 1] + 1;
            else
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
    cout << dp[n1][n2] << endl;
}
\`\`\``,
            options: [`代码的时间复杂度为 O(n²)`, `代码的空间复杂度为 O(n²)`, `空间复杂度已经最优`, `采用了动态规划求解`],
            answer: 2,
            score: 2,
            explanation: `**答案：C（不正确的是 C）**

- **A** ✅ 双层循环 n1 × n2 次，时间复杂度 O(n²)。
- **B** ✅ dp 是二维数组，空间 O(n²)。
- **C** ❌ dp[i][j] 只依赖第 i−1 行和第 i 行，可以用滚动数组把空间压缩到 O(n)——O(n²) 并非最优。
- **D** ✅ 这是标准的动态规划解法。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `图的广度优先搜索中既要维护一个标志数组标志已访问的图的结点，还需哪种结构存放结点以实现遍历？ ( )`,
            options: [
                "双向栈",
                "队列",
                "哈希表",
                "堆",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（队列）**

BFS 的本质是按"离起点的距离"分层扩展，必须先进先出：先入队的顶点先扩展它的邻居。队列恰好提供 FIFO 语义。

栈（LIFO）对应的是 DFS；哈希表和堆都不能维持逐层的访问顺序。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `对关键字序列 {44，36，23，35，52，73，90，58} 建立哈希表，哈希函数为 h(k)=k%7，执行下面的 Insert 函数（链地址法、头插），则等概率情况下的平均成功查找长度（即查找成功时的关键字比较次数的均值）为 ( ) 。
\`\`\`cpp
typedef struct Node {
    int data;
    struct Node *next;
} Node;
Node* hTab[7];
int key[] = {44, 36, 23, 35, 52, 73, 90, 58, 0};
void Insert() {
    int i, j;
    Node *x;
    for (i = 0; key[i]; i++) {
        j = key[i] % 7;
        x = new Node;
        x->data = key[i];
        x->next = hTab[j];
        hTab[j] = x;
    }
}
\`\`\``,
            options: [
                "7/8",
                "1",
                "1.5",
                "2",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (1.5)**

各关键字取模：44%7=2，36%7=1，23%7=2，35%7=0，52%7=3，73%7=3，90%7=6，58%7=2。

链地址 + 头插，后插入的在链头，各槽的链为：
- 槽 0：35；槽 1：36；槽 6：90（各 1 次比较）
- 槽 2：58 → 23 → 44（比较次数 1、2、3）
- 槽 3：73 → 52（比较次数 1、2）

总比较次数 = 1+1+1 + (1+2+3) + (1+2) = 12，平均成功查找长度 = 12/8 = **1.5**。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `学生在读期间所上的某些课程中需要先上其他的课程，所有课程和课程间的先修关系构成一个有向图G， 有向边<U, V>表示课程U是课程V的先修课，则要找到某门课程C的全部先修课下面哪种方法不可行？ ( )`,
            options: [
                "BFS 搜索",
                "DFS 搜索",
                "DFS+BFS",
                "动态规划",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（动态规划不可行）**

"找到课程 C 的全部先修课"就是求反向图上从 C 出发的全部可达顶点（或沿入边回溯），这是可达性搜索问题：BFS、DFS 或两者组合都能完成。

动态规划要求问题有最优子结构和明确的无环计算顺序，而"求可达顶点集合"不是最优化问题，且先修图的一般搜索并不依赖 DP——它不是求这个集合的可行方法。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `一棵完全二叉树有2023个结点，则叶结点有多少个？ ( )`,
            options: [
                "1024",
                "1013",
                "1012",
                "1011",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (1012)**

完全二叉树 2023 个结点：前 10 层放满共 2¹⁰−1 = 1023 个，剩下 2023 − 1023 = 1000 个在第 11 层（最多可放 1024）。

叶结点 = 第 11 层的 1000 个 + 第 10 层中没有孩子的结点。第 10 层共 512 个结点，其中被这 1000 个孩子占用的父结点有 ⌈1000/2⌉ = 500 个，剩 512 − 500 = 12 个是叶子。

合计 1000 + 12 = **1012**。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `用下面的邻接表结构保存一个有向图 G，InfoType 和 VertexType 是定义好的类。设 G 有 n 个顶点、e 条弧，则求图 G 中某个顶点 u（其顶点序号为 k）的度的算法复杂度是 ( ) 。
\`\`\`cpp
typedef struct ArcNode {
    int adjvex;             // 该弧所指向的顶点的位置
    struct ArcNode *nextarc; // 指向下一条弧的指针
    InfoType *info;         // 该弧相关信息的指针
} ArcNode;
typedef struct VNode {
    VertexType data;    // 顶点信息
    ArcNode *firstarc;  // 指向第一条依附该顶点的弧
} VNode, AdjList[MAX_VERTEX_NUM];
typedef struct {
    AdjList vertices;
    int vexnum, arcnum;
    int kind;
} ALGraph;
\`\`\``,
            options: [`O(n)`, `O(e)`, `O(n + e)`, `O(n + 2e)`],
            answer: 1,
            score: 2,
            explanation: `**答案：B（O(e)）**

有向图中顶点 u 的度 = 出度 + 入度。

- **出度**：沿 vertices[k].firstarc 的链表走一遍即可，代价是 u 的出度，不超过 e。
- **入度**：邻接表只记录"从谁出发"，要数指向 u 的弧必须把所有顶点的弧链都扫一遍，检查每条弧的 adjvex 是否等于 k——需要访问全部 e 条弧。

整体由扫描全部弧主导，复杂度 O(e)。（若把访问 n 个表头也计入可写作 O(n+e)，本题按弧数主导取 O(e)。）`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `给定一个简单有向图G，判断其中是否存在环路的下列说法哪个最准确？ ( )`,
            options: [
                "BFS 更快",
                "DFS 更快",
                "BFS 和 DFS 一样快",
                "不确定",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（不确定）**

判断有向图是否有环，DFS（找返祖边）和基于 BFS 的拓扑排序（Kahn 算法）都可行，最坏时间复杂度同为 O(n+e)。

谁"更快"取决于具体图的形态、环出现的位置和实现细节：环藏得深浅、入度分布如何，都可能让其中一种更早停下。没有普适的快慢结论，选"不确定"。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `从顶点 v1 开始遍历下图 G 得到顶点访问序列（G 的边为：v1-v2、v1-v4、v2-v3、v2-v5、v3-v4、v3-v5），在下面所给的 4 个序列中符合广度优先的序列有几个？ ( )
{v1 v2 v3 v4 v5}，{v1 v2 v4 v3 v5}，{v1 v4 v2 v3 v5}，{v1 v2 v4 v5 v3}`,
            options: [`4`, `3`, `2`, `1`],
            answer: 1,
            score: 2,
            explanation: `**答案：B (3)**

从 v1 出发按层划分：第 0 层 {v1}；第 1 层是 v1 的邻居 {v2, v4}；第 2 层 {v3, v5}。BFS 序列必须把第 1 层全部访问完才能进入第 2 层（同层内顺序任意）：

- {v1 v2 v3 v4 v5} ❌ v3（第 2 层）出现在 v4（第 1 层）之前。
- {v1 v2 v4 v3 v5} ✅
- {v1 v4 v2 v3 v5} ✅
- {v1 v2 v4 v5 v3} ✅（v2 的邻居按 v5、v3 顺序入队即可）

共 3 个合法。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `小杨这学期准备参加 GESP 的 7 级考试，其中有关于三角函数的内容，他能够通过下面的代码找到结束循环的角度值。( )
\`\`\`cpp
int main() {
    double x;
    do {
        cin >> x;
        x = x / 180 * 3.14;
    } while (int(sin(x) * sin(x) + cos(x) * cos(x)) == 1);
    cout << sin(x) << " " << cos(x) << endl;
    return 0;
}
\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

数学上 sin²x + cos²x ≡ 1，看似死循环。但程序用 double 浮点运算：结果通常是 0.9999…或 1.0000…1 这样的近似值。当结果略小于 1 时，\`int(...)\` 截断为 0，循环条件不成立，循环结束。

所以确实存在能让循环结束的输入角度——浮点误差 + 强制取整截断是本题的考点。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `小杨在开发画笔刷小程序（applet），操作之一是选中黄颜色，然后在图像的某个封闭白色区域内双击后，该连通区域被整体染成黄色。这个操作可以用图的泛洪算法来实现。( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

"油漆桶"式填充正是泛洪算法（Flood Fill）的标准应用：把每个像素看作图的顶点、相邻同色像素之间连边，从双击点出发做 DFS/BFS，把可达的同色像素全部改成目标颜色。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `假设一棵完全二叉树共有 N 个节点，则树的深度为 log(N) + 1。( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

完全二叉树的深度公式是 **⌊log₂N⌋ + 1**——必须以 2 为底并向下取整。题面写作 log(N)+1：既没有指明以 2 为底（数学惯例 log 常指以 10 为底或自然对数），也没有取整。

例如 N = 6：⌊log₂6⌋+1 = 3 才是正确深度，而 log₂6+1 ≈ 3.58 根本不是整数。表述不严谨，判错误。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `给定一个数字序列A1 ， A2 ， A3 ， ... ， An，要求i和j（1<=i<=j<=n) ，使Ai+…+Aj最大，可以使用动 态规划方法来求解。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

这是经典的最大子段和问题。设 f(i) 为以 A_i 结尾的最大子段和，则 f(i) = max(f(i−1) + A_i, A_i)，答案为 max f(i)。

该问题具有最优子结构和无后效性，动态规划（Kadane 算法）O(n) 即可求解，判正确。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `若变量x为double类型正数，则log(exp(x)) > log10(x)。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

C++ 中 \`log\` 是自然对数（以 e 为底），所以 log(exp(x)) = x。

于是命题变为：对任意 double 正数 x，是否恒有 x > log10(x)？
- 0 < x ≤ 1 时：log10(x) ≤ 0 < x ✅
- x > 1 时：x 增长远快于 log10(x)，且在 x=1 处 1 > 0，两函数之差恒为正 ✅

恒成立，判正确。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `简单有向图有n个顶点和e条弧，可以用邻接矩阵或邻接表来存储，二者求节点u的度的时间复杂度一 样。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

求有向图顶点 u 的度（出度 + 入度）：
- **邻接矩阵**：扫第 u 行得出度、第 u 列得入度，共 O(n)。
- **邻接表**：出度沿 u 的弧链 O(出度)；但入度必须遍历所有顶点的弧链、检查 adjvex，代价 O(e)。

两种存储结构的时间复杂度一般并不相同（O(n) vs O(e)），判错误。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `某个哈希表键值x为整数，为其定义哈希函数H(x)=x%p，则p选择素数时不会产生冲突。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

模数 p 取素数只能让哈希值分布更均匀、**减少**冲突，不可能杜绝冲突：只要两个键关于 p 同余（例如 x 和 x+p），H(x) 就完全相同。

键空间无限而表长有限，由鸽巢原理冲突必然存在，任何哈希函数都只能缓解、不能消除，判错误。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `动态规划只要推导出状态转移方程，就可以写出递归程序来求出最优解。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

只有状态转移方程还不够：
1. 还必须给出正确的**边界（初始）条件**，否则递归无法落地；
2. 问题要满足最优子结构与无后效性；
3. 直接按方程写朴素递归会重复计算子问题，复杂度可能指数级，未必能在可接受时间内"求出"最优解——还需要记忆化或递推。

"只要…就…"的表述过强，判错误。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `广度优先搜索（ BFS ）能够判断图是否连通。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

从任意顶点出发做一次 BFS，结束后检查是否所有顶点都被访问过：若是，图连通；若存在未访问顶点，则图不连通。

BFS（或 DFS）遍历正是判断无向图连通性的标准方法，判正确。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `在 C++ 中，如果定义了构造函数，则创建对象时先执行完缺省的构造函数，再执行这个定义的构造函数。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

一旦类定义了自己的构造函数，编译器就**不再隐式生成**缺省构造函数；创建对象时只调用与实参匹配的那一个构造函数。

不存在"先执行缺省构造函数、再执行自定义构造函数"的两步过程——同一对象的构造只执行一个构造函数（基类/成员的构造是另一回事），判错误。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        ...programmingQuestions
    ]
};
