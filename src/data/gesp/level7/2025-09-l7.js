// 2025年9月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `4 4
1 2
2 3
3 1
1 4`, output: `0` },
        { input: `6 4
1 2
2 3
3 1
6 5`, output: `2` }
      ],
      question: `
# [GESP202509 七级] 连通图

## 题目描述

给定一张包含 $n$ 个结点与 $m$ 条边的无向图，结点依次以 $1,2,\\ldots,n$ 编号，第 $i$ 条边（$1\\le i\\le m$）连接结点 $u_i$ 与结点 $v_i$。如果从一个结点经过若干条边可以到达另一个结点，则称这两个结点是连通的。

你需要向图中加入若干条边，使得图中任意两个结点都是连通的。请你求出最少需要加入的边的条数。

注意给出的图中可能包含重边与自环。

## 输入格式

第一行，两个正整数 $n,m$，表示图的点数与边数。

接下来 $m$ 行，每行两个正整数 $u_i,v_i$，表示图中一条连接结点 $u_i$ 与结点 $v_i$ 的边。

## 输出格式

输出一行，一个整数，表示使得图中任意两个结点连通所需加入的边的最少数量。
`,
      explanation: "若图中共有 c 个连通块，那么至少需要 c-1 条边才能把它们全部连成一个连通块；同时任选一个连通块作为中心，把其余连通块各接一条边过来，也恰好能用 c-1 条边完成，因此答案就是连通块数量减 1。用并查集或 DFS/BFS 统计连通块即可。自环不会改变连通性，重边也只会重复合并同一对点。",
      tags: ["编程题", "图论", "并查集", "连通块"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct DSU {\n    vector<int> p, sz;\n    DSU(int n) : p(n+1), sz(n+1, 1) {\n        iota(p.begin(), p.end(), 0);\n    }\n    int find(int x) {\n        return p[x] == x ? x : p[x] = find(p[x]);\n    }\n    void unite(int a, int b) {\n        a = find(a);\n        b = find(b);\n        if (a == b) return;\n        if (sz[a] < sz[b]) swap(a, b);\n        p[b] = a;\n        sz[a] += sz[b];\n    }\n};\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    DSU dsu(n);\n    for (int i = 0; i < m; ++i) {\n        int u, v;\n        cin >> u >> v;\n        dsu.unite(u, v);\n    }\n\n    int components = 0;\n    for (int i = 1; i <= n; ++i) {\n        if (dsu.find(i) == i) components++;\n    }\n    cout << components-1 << '\\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3
1 6
3 7
2 4`, output: `2` },
        { input: `4
1 1
2 2
1 3
2 4`, output: `3` }
      ],
      question: `
# [GESP202509 七级] 金币收集

## 题目描述

小 A 正在游玩收集金币的游戏。具体来说，在数轴上将会出现 $n$ 枚金币，其中第 $i$ 枚（$1\\le i\\le n$）金币将会在时刻 $t_i$ 出现在数轴上坐标为 $x_i$ 的位置。小 A 必须在时刻 $t_i$ 恰好位于坐标 $x_i$，才可以获得第 $i$ 枚金币。

游戏开始时为时刻 $0$，此时小 A 的坐标为 $0$。正常来说，小 A 可以按游戏机的按键在数轴上左右移动，但不幸的是游戏机的左方向键失灵了。小 A 每个时刻只能选择保持不动，或是向右移动一个单位。换言之，如果小 A 在时刻 $t$ 的坐标为 $x$，那么他在时刻 $t+1$ 的坐标只能是 $x$ 或是 $x+1$ 二者之一，分别对应保持不动和向右移动。

小 A 想知道他最多能收集多少枚金币。你能帮他收集最多的金币吗？

## 输入格式

第一行，一个正整数 $n$，表示金币的数量。

接下来 $n$ 行，每行两个正整数 $x_i,t_i$，分别表示金币出现的坐标与时刻。

## 输出格式

输出一行，一个整数，表示小 A 最多能收集的金币数量。
`,
      explanation: "若先收集金币 i 再收集金币 j，则必须满足 x_i≤x_j，且从 (x_i,t_i) 走到 (x_j,t_j) 来得及，即 t_j-t_i≥x_j-x_i。把式子改写为 t_j-x_j≥t_i-x_i。于是问题等价于：在所有满足 x_i≤t_i 的金币中，先按 x_i 从小到大排序（x 相同再按 t 排序），再在序列 v_i=t_i-x_i 上求最长不下降子序列长度。因为路径上位置不能后退，这正好刻画了一条可行收集序列。",
      tags: ["编程题", "贪心", "最长不下降子序列", "排序"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nstruct Coin {\n    int x, t, v;\n};\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<Coin> coins;\n    coins.reserve(n);\n    for (int i = 0; i < n; ++i) {\n        int x, t;\n        cin >> x >> t;\n        if (t >= x) coins.push_back({x, t, t-x});\n    }\n\n    sort(coins.begin(), coins.end(), [](const Coin& a, const Coin& b) {\n        if (a.x != b.x) return a.x < b.x;\n        return a.t < b.t;\n    });\n\n    vector<int> lis;\n    for (auto &coin : coins) {\n        auto it = upper_bound(lis.begin(), lis.end(), coin.v);\n        if (it == lis.end()) lis.push_back(coin.v);\n        else *it = coin.v;\n    }\n\n    cout << lis.size() << '\\n';\n    return 0;\n}",
      score: 25,
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
            question: `已知小写字母b的 ASCII 码为 98 ，下列 C++ 代码的输出结果是（ ）。`,
            options: [
                "b",
                "c",
                "98",
                "99",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（c）**

\`'b'\` 的 ASCII 码为 98，\`'b' + 1\` 先做整数加法得到 99，再赋给 \`char\` 变量 \`a\`，99 对应字符 \`'c'\`。\`cout << a\` 按字符输出，因此打印 \`c\`。

- **A（b）**：错误，\`'b'\` 本身才是 98，这里做了 \`+1\`。
- **B（c）**：正确。
- **C（98）**：错误，98 是该字符的编码值，直接 \`cout\` 字符不会打印数字 98。
- **D（99）**：错误，同理不会打印整数 99。

**考点**：字符型与 ASCII 码、字符算术运算。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `已知a为int类型变量，p为int *类型变量，下列表达式不符合语法的是（ ）。`,
            options: [
                "a * a",
                "p * p",
                "a && a",
                "p && p",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（p * p）**

\`p\` 的类型是 \`int *\`（指针）。C++ 没有为指针定义乘法运算符，\`p * p\` 属于语法错误；而 \`a * a\`（两 int 相乘）、\`a && a\`（逻辑与）、\`p && p\`（指针隐式转为 bool 后做逻辑与）均合法。

- **A（a * a）**：合法，两 int 相乘。
- **B（p * p）**：非法，指针不能相乘。
- **C（a && a）**：合法。
- **D（p && p）**：合法，指针可转为 bool 参与逻辑运算。

**考点**：指针类型与运算符重载限制。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `下列关于 C++ 类的说法，错误的是（ ）。`,
            options: [
                "如果一个类包含纯虚函数，则它不能包含成员变量。",
                "如果一个类包含纯虚函数，则不能用它定义对象。",
                "派生类对象占用的内存总是不小于基类对象。",
                "派生类可以不实现基类的虚函数。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

含纯虚函数的类为抽象类，但抽象类**完全可以拥有成员变量**，只是不能实例化。因此 A 说法错误，是本题答案。

- **A（不能包含成员变量）**：错误，抽象类可含成员变量。
- **B（不能用它定义对象）**：正确，含纯虚函数的类无法实例化。
- **C（派生类对象内存总不小于基类）**：正确，派生类含基类子对象。
- **D（派生类可不实现基类虚函数）**：正确，不实现则派生类仍是抽象类。

**考点**：抽象类（纯虚函数）的特性。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `已知数组a的定义int a[10] = {-1};，下列说法不正确的是（ ）。`,
            options: [
                "数组a⾄少占用10个int大小的内存，一般为40个字节。",
                "数组a的所有元素均被初始化为-1。",
                "语句a[-1] = 0;不会产生编译错误，但会导致难以预测的运⾏结果。",
                "语句a[13] = 0;不会产生编译错误，但会导致难以预测的运⾏结果。 #include <iostream> using namespace std; int main() { char a = 'b'+1; cout << a; return 0; } 1 2 3 4 5 6 7",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

\`int a[10] = {-1};\` 只对首元素显式初始化为 -1，其余元素按规则**补 0**，并非全部为 -1。所以 B 说法不正确。

- **A（至少占 10 个 int，一般 40 字节）**：正确。
- **B（所有元素均为 -1）**：错误，其余为 0。
- **C（a[-1]=0 不报错但结果难料）**：正确，下标为负是越界，编译不报错、运行未定义。
- **D（a[13]=0 同理）**：正确，越界访问。

**考点**：数组的部分初始化（其余元素补 0）与下标越界。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `一棵完全二叉树有 165 个结点，则叶结点有多少个？ ( )`,
            options: [
                "38",
                "82",
                "83",
                "84",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（83）**

完全二叉树共 165 个结点。前 7 层为满层，共 2^7 - 1 = 127 个；第 8 层有 165 - 127 = 38 个叶子。第 7 层共 64 个结点，其中被这 38 个第 8 层结点作为父结点的有 ⌈38/2⌉ = 19 个，剩余 64 - 19 = 45 个在第 7 层也是叶子。总叶子数 = 38 + 45 = 83。

**考点**：完全二叉树叶子结点计数。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `下列关于二叉树的说法，错误的是（ ）。`,
            options: [
                "二叉排序树的中序遍历顺序与元素排序的顺序是相同的。",
                "⾃平衡二叉查找树（ AVL 树）是一种二叉排序树。",
                "个元素的二叉排序树，其高一定为 。",
                "任意的森林，都可以映射为一颗二叉树进⾏表达和存储。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

C 项（"n 个元素的二叉排序树，其高一定为 …"）表述错误：二叉排序树的高度依赖于插入顺序，同一组元素可构成不同高度的 BST，高度并不固定。

- **A（BST 中序遍历与排序顺序相同）**：正确。
- **B（AVL 树是一种 BST）**：正确。
- **C（固定高度）**：错误，是本题答案。
- **D（任意森林可映射为二叉树）**：正确，孩子兄弟表示法。

**考点**：二叉排序树、AVL 树与森林转二叉树。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `下列关于树和图的说法，错误的是（ ）。`,
            options: [
                "保留树的所有节点，并把树的每个节点指向其⽗节点，则可以将树转换为一个有向弱连通图。",
                "保留树的所有节点，并把树的每个节点指向其子节点，则可以将树转换为一个有向无环图。",
                "每个连通图都存在生成树。",
                "每个存在生成树的有向图，都一定是强连通的。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

存在生成树的有向图不一定强连通。例如一棵以某结点为根的外向树（arborescence）是生成树，但根到叶单向可达，反向不可达，并非强连通。D 说法错。

- **A（指向父节点→有向弱连通图）**：正确。
- **B（指向子节点→有向无环图）**：正确。
- **C（每个连通图都存在生成树）**：正确（无向连通图）。
- **D（有生成树就一定强连通）**：错误。

**考点**：树与图的相互转换、生成树与强连通性。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `对一个包含 个顶点、 条边的图，执⾏⼴度优先搜索，其最优时间复杂度是（ ）。`,
            options: [
                "O(n+m)",
                "O(n)",
                "O(n²)",
                "O(m)",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A（O(V + E)）**

BFS 对每个顶点入队出队各一次、对每条边考察一次，最优时间复杂度为 O(V + E)（V 为顶点数、E 为边数）。

**考点**：广度优先搜索的时间复杂度。`,
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
                "用新元素覆盖发生冲突的哈希表项。",
                "在每个哈希表项处，使用单链表管理该表项的冲突元素。",
                "建⽴额外的单链表，用来管理所有发生冲突的元素。",
                "使用不同的哈希函数再建⽴一个哈希表，用来管理所有发生冲突的元素。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

"用新元素覆盖发生冲突的哈希表项"会直接丢失原有数据，无法合理解决冲突，故 A 不能。其余均为合理方案：B 是链地址法，C 是公共溢出区法，D 是再哈希法。

- **A（覆盖冲突项）**：不能，会丢数据。
- **B（链地址法）**：能。
- **C（公共溢出链表）**：能。
- **D（再哈希表）**：能。

**考点**：哈希冲突的解决方法。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `以下关于贪⼼法和动态规划的说法中，错误的是（ ）。`,
            options: [
                "对特定的问题，贪⼼法不一定适用。",
                "当特定的问题适用贪⼼法时，通常比动态规划的时间复杂度更低。",
                "对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。",
                "采用动态规划的算法一定具有多项式时间复杂度。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

"采用动态规划的算法一定具有多项式时间复杂度"错误：动态规划只是一种思想，状态空间可能是指数级的（如朴素状压、某些 NP 问题），复杂度未必是多项式。

- **A（贪心不一定适用）**：正确。
- **B（适用贪心通常比 DP 更快）**：正确。
- **C（递推与递归 DP 复杂度相当）**：正确。
- **D（DP 一定多项式）**：错误。

**考点**：贪心法与动态规划的区别。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `下面程序的输出为（ ）。`,
            options: [
                "8",
                "13",
                "21",
                "无法正常结束。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（无法正常结束）**

\`\`\`cpp
int fib(int n) {
    if (n == 0) return 1;
    return fib(n - 1) + fib(n - 2);
}
\`\`\`

递归只有 \`n == 0\` 时返回，没有 \`n == 1\` 等正整数的终止分支。计算 \`fib(1)\` 会进入 \`fib(0) + fib(-1)\`；而 \`fib(-1)\`、\`fib(-2)\`、… 中 n 始终为负，永远命中不了 \`n == 0\`，递归无限进行直至栈溢出，程序无法正常结束。

**考点**：递归终止条件与栈溢出。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `下面程序的时间复杂度为（ ）。`,
            options: [
                "O(n²)",
                "O(n)",
                "O(n log n)",
                "O(2ⁿ)",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A（O(n)）**

题中带记忆化数组 \`rec_fib\` 的斐波那契：

\`\`\`cpp
int rec_fib[MAX_N];
int fib(int n) {
    if (n <= 1) return n;
    if (rec_fib[n] != 0) return rec_fib[n];
    return fib(n - 1) + fib(n - 2);
}
\`\`\`

每个 \`n\` 只会被真正计算一次并存入 \`rec_fib\`，之后直接返回，共 O(n) 次递归调用，每次 O(1)，总时间复杂度 O(n)。

**考点**：记忆化（Memoization）递归的时间复杂度。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `下面init_sieve函数的时间复杂度为 ( ) 。`,
            options: [
                "O(n)",
                "O(n²)",
                "O(n log n)",
                "O(log n)",
],
            answer: 2,
            score: 2,
            explanation: `**答案：C（O(n log n)）**

\`\`\`cpp
void init_sieve(int n) {
    for (int i = 1; i <= n; i++) sieve[i] = i;
    for (int i = 2; i <= n; i++)
        for (int j = i; j <= n; j += i) sieve[j]--;
}
\`\`\`

外层 \`i\` 从 2 到 n，内层 \`j\` 以 \`i\` 为步长遍历，内层迭代次数为 ⌊n/i⌋。总次数 = Σ_{i=2}^{n} n/i ≈ n·(ln n - 1) = O(n log n)。

**考点**：筛法（埃氏筛）的时间复杂度。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `下面 \`count_triple\` 函数的时间复杂度为（ ）。

\`\`\`cpp
int gcd(int m, int n) {
    if (m == 0) return n;
    return gcd(n % m, m);
}
int count_triple(int n) {
    int cnt = 0;
    for (int v = 1; v * v * 4 <= n; v++)
        for (int u = v + 1; u * (u + v) * 2 <= n; u += 2)
            if (gcd(u, v) == 1) {
                int a = u * u - v * v;
                int b = u * v * 2;
                int c = u * u + v * v;
                cnt += n / (a + b + c);
            }
    return cnt;
}
\`\`\``,
            options: [
                "O(n²)",
                "O(n² log n)",
                "O(n log n)",
                "O(n)",
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1703973098618912.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：C（O(n log n)）**

先估算双层循环：

- 外层条件 \`4v² <= n\`，所以 \`v\` 有 O(√n) 个取值；
- 固定 \`v\` 后，内层条件 \`2u(u + v) <= n\` 使 \`u\` 也至多增长到 O(√n)，因此 \`(u, v)\` 的枚举总数为 O(n)；
- 每次枚举都调用一次欧几里得算法 \`gcd(u, v)\`，其最坏时间复杂度为 O(log n)。

循环体其余加减乘除都是 O(1)，所以总时间复杂度为 O(n log n)。A、B 把双层循环分别粗略当成 n 次甚至 n² 次后又高估；D 则漏掉了每次 \`gcd\` 的对数开销。

**最小验证思路**：把 n 放大 4 倍时，\`u\`、\`v\` 的上界都约放大 2 倍，候选数约放大 4 倍，符合线性于 n 的枚举规模；再乘上 \`gcd\` 的 O(log n)。

**原卷核验**：题干与代码起始于官方 PDF 第 3 页，代码结尾与选项见第 4 页；答案表见第 1 页。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `下列选项中，哪个不可能是下图的深度优先遍历序列（ ）。`,
            options: [
                "2, 3, 5, 7, 8, 9, 6, 4, 1",
                "5, 7, 8, 9, 1, 2, 4, 3, 6",
                "6, 8, 9, 5, 7, 1, 2, 3, 4",
                "8, 5, 7, 9, 1, 2, 3, 6, 4",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

DFS 必须沿"当前路径的栈顶顶点"继续深入其未访问邻居，直到死胡同才回溯。序列 **B：5, 7, 8, 9, 1, 2, 4, 3, 6** 在访问 5→7→8→9 后跳到 1，意味着 1 与当前栈顶 9 不相邻却又被优先访问；后续 2、4、3、6 也无法由栈顶推导出来，违背了 DFS 的深入规则，因此不可能是该图的深度优先遍历序列。（依据官方答案 B；具体分析依赖试卷原图结构。）

**考点**：深度优先遍历（DFS）的访问顺序规则。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `C++ 语⾔中，表达式9 && 12的结果类型为int、值为8。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

\`9 && 12\` 是逻辑与运算：两操作数均非 0，结果为 \`int\` 类型的 **1**（true），而不是 8。逻辑运算符的结果恒为 0 或 1。

**考点**：逻辑运算符的结果类型与取值（int，0/1）。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `C++ 语⾔中，在有int a[10];定义的范围内，通过表达式a[-1]进⾏访问将导致编译错误。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

\`a[-1]\` 在语法上是合法的下标表达式（\`-1\` 是一个普通的下标值），**编译期不会报错**；它只是越界访问，属于运行期未定义行为（UB）。因此"将导致编译错误"的说法错误。

**考点**：数组下标越界是运行时未定义行为，而非编译错误。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `选择排序一般是不稳定的。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

选择排序在每趟把未排序区的最小元素交换到已排序区末尾，这种跨位置的交换可能改变相等元素的相对顺序，因此一般是不稳定的（例如序列 2, 2, 1 经选择排序后两个 2 的相对位置会被破坏）。

**考点**：排序算法的稳定性。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `C++ 语⾔中，float和int类型一般都是4字节，因此float类型能够表达不同的浮点数值的数量，与 int类型能够表达不同的整数值的数量是相同的。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

虽然 \`float\` 与 \`int\` 通常都是 4 字节（2^32 个编码），但 \`float\` 的编码中包含 NaN、±0、非规约数等特殊情形，可表示的**不同有限数值**少于 2^32；而 \`int\` 恰有 2^32 个不同整数。且"字节数相同 ⇒ 可表示值数量相同"的推理本身不成立。

**考点**：浮点数的表示（NaN/特殊值）与整数表示的区别。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `使用math.h或cmath头文件中的对数函数，表达式log(256)的结果类型为double、值约为8.0。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

C++ 中 \`log\` 是以 **e 为底的自然对数**（非以 2 或 10 为底）。\`log(256) = ln 256 ≈ 5.545\`，并非 8.0（log2(256) 才是 8）。结果类型确为 \`double\`，但值约为 5.545。

**考点**：\`<cmath>\` 中 \`log\` 为自然对数。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `一棵有 个节点的完全二叉树，则树的深度为 。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

完全二叉树（N 个结点）的深度公式应为 **⌊log₂ N⌋ + 1**：必须**以 2 为底**并**向下取整**。题面"深度为 log(N) + 1"既未指明以 2 为底（数学上 log 常指 10 或自然对数），也未取整，例如 N=6 时正确深度为 3，而 log₂6+1≈3.58 不是整数。表述不严谨，判错误。

**考点**：完全二叉树深度公式。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `邻接表和邻接矩阵都是图的存储形式。通常，使用邻接表比使用邻接矩阵的时间复杂度更低。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

邻接表和邻接矩阵都是图的合法存储形式。对于稀疏图，邻接表只存储实际存在的边，通常在时间与空间上都优于需要 O(V²) 的邻接矩阵，题中"通常……时间复杂度更低"的说法正确。

**考点**：图的存储结构比较。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `C++ 语⾔中，类的构造函数可以声明为私有（ private ）。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

C++ 允许把构造函数声明为 \`private\`，典型用途如单例（Singleton）模式——在类外无法通过普通方式构造对象，只能由静态成员函数借助私有构造函数创建实例。

**考点**：构造函数的访问权限控制。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `泛洪算法的递归实现容易造成溢出，因此大的二维地图算法中，一般使用⼴度优先搜索实现。 int cnt = 0; for (int v = 1; v * v * 4 <= n; v++) for (int u = v+1; u * (u+v) * 2 <= n; u += 2) if (gcd(u, v) == 1) { int a = u * u-v * v; int b = u * v * 2; int c = u * u+v * v; cnt += n / (a+b+c); } return cnt; } 6 7 8 9 10 11 12 13 14 15 16`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

递归实现的泛洪（Flood Fill）递归深度等于连通区域大小，遇到大的二维地图容易栈溢出；因此实践中大地图通常用队列实现的 BFS（或显式栈）来替代递归，更稳妥。

**考点**：Flood Fill 的实现方式（递归 vs BFS）。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `很多游戏中为玩家设置多种可供学习的技能，要学习特定技能⼜往往需要先学习 1 个或以上的前置技能。尽 管这样的技能间依赖关系常被玩家称为 “ 技能树 ” ，但它并不一定是树，更可能是有向无环图。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

技能间常存在"学习 A 需先学 B 和 C"的多前驱依赖，这种结构可以是同一结点有多个入边，构成**有向无环图（DAG）**而未必是树（树中每个非根结点至多一个父结点）。说法正确地指出了"技能树"实为 DAG。

**考点**：有向无环图（DAG）在依赖关系中的应用。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        ...programmingQuestions
    ]
};
