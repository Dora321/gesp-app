// 2025年3月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `4 4 3
1 2
1 3
2 3
3 4`, output: `2 4 4
2 4 4
3 3 4
1 3 3` }
      ],
      question: `
# [GESP202503 七级] 图上移动

## 题目描述

小 A 有一张包含 $n$ 个结点与 $m$ 条边的无向图，结点以 $1, 2, \\dots, n$ 标号。小 A 会从图上选择一个结点作为起点，每一步移动到某个与当前小 A 所在结点相邻的结点。对于每个结点 $i$ （$1 \\leq i \\leq n$），小 A 想知道从结点 $i$ 出发恰好移动 $1, 2, \\dots, k$ 步之后，小 A 可能会位于哪些结点。由于满足条件的结点可能有很多，你只需要求出这些结点的数量。

## 输入格式

第一行，三个正整数 $n, m, k$，分别表示无向图的结点数与边数，最多移动的步数。

接下来 $m$ 行，每行两个正整数 $u_i, v_i$，表示图中的一条连接结点 $u_i$ 与 $v_i$ 的无向边。

## 输出格式

共 $n$ 行，第 $i$ 行 ($1 \\leq i \\leq n$) 包含 $k$ 个整数，第 $j$ 个整数 ($1 \\leq j \\leq k$) 表示从结点 $i$ 出发恰好移动 $j$ 步之后可能位置的结点数量。
`,
      explanation: "把“走若干步后可能到达的点集”直接做状态转移。设 reach[t][s] 为从起点 s 出发恰好走 t 步后可能到达的点集（用 bitset 维护），初始 reach[0][s]={s}。若已知 reach[t-1][s]，则对其中每个节点 y，把 y 的邻接点集合并起来，就得到 reach[t][s]。最后统计 bitset 中 1 的个数即可。由于 n 规模不大，bitset 按位并能明显加快转移。",
      tags: ["编程题", "图论", "动态规划", "bitset"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m, k;\n    cin >> n >> m >> k;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nconst int MAXN = 505;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m, k;\n    cin >> n >> m >> k;\n\n    vector<bitset<MAXN>> adj(n+1);\n    for (int i = 0; i < m; ++i) {\n        int u, v;\n        cin >> u >> v;\n        adj[u].set(v);\n        adj[v].set(u);\n    }\n\n    vector<vector<bitset<MAXN>>> reach(k+1, vector<bitset<MAXN>>(n+1));\n    for (int s = 1; s <= n; ++s) reach[0][s].set(s);\n\n    for (int step = 1; step <= k; ++step) {\n        for (int s = 1; s <= n; ++s) {\n            bitset<MAXN> cur;\n            for (int y = 1; y <= n; ++y) {\n                if (reach[step-1][s].test(y)) cur |= adj[y];\n            }\n            reach[step][s] = cur;\n        }\n    }\n\n    for (int s = 1; s <= n; ++s) {\n        for (int step = 1; step <= k; ++step) {\n            cout << reach[step][s].count() << (step == k ? '\\n' : ' ');\n        }\n    }\n    return 0;\n}",
      score: 25,
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `7
aaaaabb`, output: `9` },
        { input: `9
babacabab`, output: `2` }
      ],
      question: `
# [GESP202503 七级] 等价消除

## 题目描述

小 A 有一个仅包含小写英文字母的字符串 $S$。

对于一个字符串，如果能通过每次删去其中两个相同字符的方式，将这个字符串变为空串，那么称这个字符串是可以被等价消除的。

小 A 想知道 $S$ 有多少子串是可以被等价消除的。

一个字符串 $S'$ 是 $S$ 的子串，当且仅当删去 $S$ 的某个可以为空的前缀和某个可以为空的后缀之后，可以得到 $S'$。

## 输入格式

第一行，一个正整数 $|S|$，表示字符串 $S$ 的长度。

第二行，一个仅包含小写英文字母的字符串 $S$。

## 输出格式

一行，一个整数，表示答案。
`,
      explanation: "一个字符串能被成对删除为空，当且仅当其中每种字符出现次数都是偶数。于是只要比较前缀奇偶状态：设 mask[i] 表示前 i 个字符中每个字母出现次数的奇偶性，那么子串 s[l..r] 可消除等价于 mask[r]=mask[l-1]。遍历前缀时用哈希表统计每种 mask 已出现的次数，当前前缀就能与之前所有相同 mask 的前缀配对产生答案。",
      tags: ["编程题", "前缀异或", "哈希表", "字符串"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    string s;\n    cin >> n >> s;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    string s;\n    cin >> n >> s;\n\n    unordered_map<int, long long> cnt;\n    cnt.reserve(n * 2+10);\n    cnt.max_load_factor(0.7f);\n\n    long long ans = 0;\n    int mask = 0;\n    cnt[0] = 1;\n    for (char ch : s) {\n        mask ^= 1 << (ch-'a');\n        ans += cnt[mask];\n        cnt[mask]++;\n    }\n\n    cout << ans << '\\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    }
];

export const paperData = {
    id: '2025-03-l7',
    title: '2025年3月 GESP C++ 七级真题',
    level: 7,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `下列哪个选项是 C++ 中的关键字？`,
            options: [
                "function",
                "class",
                "method",
                "object",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（class）**
**解析：** C++ 中 \`class\` 是用于定义类的关键字。选项 A \`function\`、C \`method\`、D \`object\` 都不是 C++ 保留关键字（C++ 用 class 定义类及成员函数，不存在 function / method / object 这类关键字）。
- A. \`function\`：不是关键字，错误。
- B. \`class\`：C++ 关键字，正确。
- C. \`method\`：不是关键字，错误。
- D. \`object\`：不是关键字，错误。
**考点**：C++ 关键字辨识。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `下面代码输出的是（）`,
            options: [
                "1",
                "2",
                "5",
                "10",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（1）**
**解析：** 代码为 \`cout << (a >> b)\`，其中 \`>>\` 是按位右移运算符。\`a=5\` 的二进制为 \`101\`，右移 \`b=2\` 位得 \`1\`（高位补 0），因此输出 1。
\`\`\`cpp
int a = 5, b = 2;
cout << (a >> b) << endl;  // 5>>2 = 1
\`\`\`
- A. 1：正确。
- B. 2：相当于 5>>1 的结果，错误。
- C. 5：未移位，错误。
- D. 10：相当于 5<<1 的结果，错误。
**考点**：位运算（右移）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `以下代码的输出是什么？`,
            options: [
                "10",
                "20",
                "地址值",
                "编译错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（20）**
**解析：** \`int *&q = p;\` 声明 \`q\` 为指针 \`p\` 的引用（即 \`p\` 的别名）。\`*q = 20\` 等价于 \`*p = 20\`，也就是修改 \`p\` 所指向的变量 \`a\` 的值，使 \`a\` 变为 20，因此输出 20。
\`\`\`cpp
int a = 10;
int *p = &a;
int *&q = p;   // q 是 p 的引用
*q = 20;       // 通过 q 修改 a
cout << a << endl;  // 20
\`\`\`
- A. 10：未修改 a，错误。
- B. 20：正确。
- C. 地址值：输出的是 a 的值而非指针，错误。
- D. 编译错误：语法完全合法，错误。
**考点**：指针与指针引用（引用的别名语义）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `下面代码输出的是（）`,
            options: [
                "1",
                "2",
                "3",
                "4",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（3）**
**解析：** 数组名 \`arr\` 会退化为指向首元素 \`arr[0]\` 的指针，\`arr + 2\` 指向 \`arr[2]\`，因此 \`*p\` 即 \`arr[2] = 3\`。
\`\`\`cpp
int arr[5] = {1, 2, 3, 4, 5};
int *p = arr + 2;   // 指向 arr[2]
cout << *p << endl; // 3
\`\`\`
- A. 1：对应 arr[0]，错误。
- B. 2：对应 arr[1]，错误。
- C. 3：正确。
- D. 4：对应 arr[3]，错误。
**考点**：指针算术与数组下标。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `下列关于排序的说法，正确的是 ( ) 。`,
            options: [
                "选择排序是最快的排序算法之一。",
                "归并排序通常是稳定的。",
                "最差情况， 个元素做快速排序的时间复杂度为 。",
                "最好情况， 个元素做插入排序的时间复杂度为 。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（归并排序通常是稳定的）**
**解析：** 归并排序在合并两个有序段时，遇到相等元素会优先取前半段的，从而保持原有相对顺序，因此通常是稳定的。
- A. 选择排序是最快的排序算法之一：错误，选择排序时间复杂度为 O(n^2)，并不快。
- B. 归并排序通常是稳定的：正确。
- C. 最差情况快速排序时间复杂度为 O(N)：错误，应为 O(N^2)。
- D. 最好情况插入排序时间复杂度为 O(N^2)：错误，最好情况（已有序）为 O(N)。
**考点**：排序算法的稳定性与时间复杂度。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `下面关于 C++ 类构造和析构函数的说法，错误的是（ ）。`,
            options: [
                "构造函数不能声明为虚函数。",
                "析构函数必须声明为虚函数。",
                "类的默认构造函数可以被声明为 private 。",
                "类的析构函数可以被声明为 private 。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（析构函数必须声明为虚函数）**
**解析：** 析构函数并非必须声明为虚函数。只有当一个类被设计为多态基类、可能通过基类指针删除派生类对象时，才应把析构函数声明为 virtual，以保证正确调用派生类的析构函数。
- A. 构造函数不能声明为虚函数：正确（构造时对象类型已确定，无需虚分发）。
- B. 析构函数必须声明为虚函数：错误，并非必须。
- C. 默认构造函数可声明为 private：正确（如单例模式）。
- D. 析构函数可声明为 private：正确（如只允许在栈外管理生命周期的场景）。
**考点**：构造函数与析构函数的性质、虚函数限制。`,
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
                "树是一种有向无环图，但有向无环图不都是一棵树。",
                "如果把树看做有向图，每个节点指向其子节点，则该图是强连通图。",
                "个顶点且连通的无向图，其最小生成树一定包含 个条边。",
                "个顶点、 条边的有向图，一定不是强连通的。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（如果把树看做有向图，每个节点指向其子节点，则该图是强连通图）**
**解析：** 把树视为有向图（父指向子）时，从叶节点无法回到父节点或根节点，任意两点并不互相可达，因此不是强连通图。
- A. 树是 DAG，但有向无环图不都是树：正确。
- B. 父指向子的树是强连通图：错误，子无法回到父。
- C. N 个顶点且连通的无向图，最小生成树一定含 N-1 条边：正确。
- D. N+1 个顶点、N 条边的有向图一定不是强连通的：正确（强连通至少需要 N 条边构成环）。
**考点**：树与图的基本性质、强连通概念。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `是个神奇的数字，因为它是由两个数和拼接而成，而且满足特定条件。小杨决定写个程序找找小于 N 的正整数中共有多少这样神奇的数字。下面程序横线处应填入的是（ ）。`,
            options: [
                "if (s[i] != '0') {",
                "if (s[i] == '0') {",
                "if (s[i] != '0')",
                "if (s[i] >= '0') {",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A（n1 + nr == n）**
**解析：** 神奇数字的条件是平方数 n^2 可拆成两段 s1、sr，使 n1 + nr == n（因为 n^2 = (n1+nr)^2，当 n1+nr == n 时成立）。程序枚举 n，计算 n2 = n*n 并转字符串，按位拆分得到 n1、nr，判断 n1+nr==n 即可。
\`\`\`cpp
if (s[i] != '0') {
    string s1 = s.substr(0, i);
    string sr = s.substr(i);
    int n1 = stoi(s1), nr = stoi(sr);
    if (n1 + nr == n) cnt++;  // 正确选项
}
\`\`\`
- A. n1 + nr == n：正确。
- B. n1 + nr == n2：错误（n2 是平方数，数量级不符）。
- C. (n1+nr)^2 == n：形式错误。
- D. (n1+nr)^2 == n2：等价于 n1+nr == n，但写法绕且原题直接比较 n 更自然，且选项 A 为准。
**考点**：字符串拆分、数学构造与枚举。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 9,
            type: "single",
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `给定一个无向图，图的节点编号从 0 到 $n-1$，图的边以邻接表的形式给出。下面程序使用深度优先搜索（DFS）遍历该图，并输出遍历的节点顺序。横线处应该填入的是（ ）。`,
            options: [
                "nl + nr == n",
                "nl + nr == n2",
                "(nl + nr) * (nl + nr) == n",
                "(nl + nr) ^ 2 == n2",
],
            answer: 3,
            score: 2,
            explanation: `**答案：D（visited[neighbor] = true; s.push(neighbor);）**
**解析：** 这是用栈实现的非递归 DFS：弹出节点后，对未访问的邻居应先标记已访问再压栈，避免重复入栈与死循环。
\`\`\`cpp
for (int neighbor : graph[node]) {
    if (!visited[neighbor]) {
        visited[neighbor] = true;  // 标记
        s.push(neighbor);          // 入栈
    }
}
\`\`\`
- A. visited[neighbor]=true; s.push(neighbor-1)：索引错位，错误。
- B. visited[neighbor]=true; s.push(neighbor+1)：索引错位，错误。
- C. visited[neighbor]=false; s.push(neighbor)：不标记已访问会重复入栈，错误。
- D. 标记并压栈：正确。
**考点**：深度优先搜索（栈实现）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `给定一个整数数组 nums，找到其中最长的严格上升子序列的长度。子序列是指从原数组中删除一些元素（或不删除）后，剩余元素保持原有顺序的序列。下面的程序横线处应该填入的是（ ）。`,
            options: [
                "$dp[i]$ = max($dp[i]$, $dp[j]$);",
                "$dp[i]$ = max(dp[i+1], $dp[j]$+1);",
                "$dp[i]$ = max($dp[i]$, $dp[j]$-1);",
                "$dp[i]$ = max($dp[i]$, $dp[j]$+1);",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（dp[i] = max(dp[i], dp[j] + 1)）**
**解析：** 最长上升子序列的朴素 DP：dp[i] 表示以 nums[i] 结尾的 LIS 长度。若 nums[i] > nums[j]（j < i），则可由以 j 结尾的上升子序列接上 i，长度变为 dp[j] + 1，取最大值更新 dp[i]。
- A. dp[i] = max(dp[i], dp[j])：未 +1，长度不增长，错误。
- B. dp[i] = max(dp[i+1], dp[j]+1)：用了未计算的 dp[i+1]，且越界，错误。
- C. dp[i] = max(dp[i], dp[j]-1)：长度 -1，错误。
- D. dp[i] = max(dp[i], dp[j]+1)：正确。
**考点**：最长上升子序列（LIS）动态规划。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `给定一个整数数组 nums，找到其中最长的严格上升子序列的长度。子序列是指从原数组中删除一些元素（或不删除）后，剩余元素保持原有顺序的序列。该程序的时间复杂度为（ ）。`,
            options: [
                "O(n²)",
                "O(n)",
                "O(n log n)",
                "O(2ⁿ)",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A（O(n^2)）**
**解析：** 上述 lengthOfLIS 实现有两层嵌套循环：外层 i 从 1 到 n-1，内层 j 从 0 到 i-1，总操作次数约为 n*(n-1)/2，时间复杂度为 O(n^2)。O(n log n) 是配合二分查找的贪心优化版复杂度，本题代码并未采用。
- A. O(n^2)：正确。
- B. O(n)：线性扫描达不到，错误。
- C. O(log n)：错误。
- D. O(n log n)：是优化版复杂度，本题朴素 DP 不是，错误。
**考点**：时间复杂度分析（双层循环）。`,
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
            question: `给定两个无向图 G1 和 G2，判断它们是否同构。图的同构是指两个图的节点可以通过某种重新编号的方式完全匹配，且边的连接关系一致。为了简化问题，假设图的节点编号从 0 到 $n-1$，并且图的边以邻接表形式给出。下面程序中横线处应该填入的是（ ）。`,
            options: [
                "hash += to_string(neighbor);",
                "hash += to_string(neighbors);",
                "hash += to_string(neighbor)+\",\";",
                "hash -= to_string(neighbors);",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（hash += to_string(neighbor) + ",";）**
**解析：** 为判断图同构，需要给每个节点的邻居集合生成一个可比较的哈希串。必须对每个邻居编号转字符串并加上分隔符（逗号），否则像邻居集合 {1,2} 与 {12} 会因无分隔而混淆。
- A. hash += to_string(neighbor)：无分隔符，多个邻居会粘连歧义，错误。
- B. hash += to_string(neighbors)：neighbors 是 vector，未定义转字符串且变量名错误，错误。
- C. hash += to_string(neighbor) + ","：加分隔符，正确。
- D. hash -= to_string(neighbors)：减号且变量名错误，错误。
**考点**：图同构的哈希编码、字符串拼接与分隔符。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `给定一个 m×n 的二维网格 grid，每个格子中有一个非负整数。请找出一条从左上角 (0, 0) 到右下角 ($m-1$, $n-1$) 的路径，使得路径上的数字总和最小。每次只能向右或向下移动。横线处应该填入的是（ ）。`,
            options: [
                "$dp[i]$[j] = min(dp[i-1][j], $dp[i]$[j-1])+grid[i][1];",
                "$dp[i]$[j] = min(dp[i-1][j], $dp[i]$[j-1])+grid[i][j];",
                "$dp[i]$[j] = min(dp[i-1][j], $dp[i]$[j])+grid[i][j];",
                "$dp[i]$[j] = min($dp[i]$[j], $dp[i]$[j-1])+grid[i][j];",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]）**
**解析：** 最小路径和中，到达 (i,j) 只能从上方 (i-1,j) 或左方 (i,j-1) 转移而来，取两者路径和的最小值再加上当前格子的数字 grid[i][j]。
- A. 用了 grid[i][1] 而非 grid[i][j]，列下标错误。
- B. min(dp[i-1][j], dp[i][j-1]) + grid[i][j]：正确。
- C. 用 dp[i][j] 自引用（尚未计算），错误。
- D. 用 dp[i][j] 自引用，错误。
**考点**：动态规划——最小路径和（只能向下/向右）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `给定一个整数数组 nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。下面横线处应该填入的是（ ）。`,
            options: [
                "$dp[i]$ = max(nums[i+1], dp[i-1]+nums[i]);",
                "$dp[i]$ = max(nums[i], dp[i-1]+nums[i]);",
                "$dp[i]$ = max(nums[i], dp[i+1]+nums[i]);",
                "$dp[i]$ = max(nums[i], dp[i-1]+nums[i+1]);",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（dp[i] = max(nums[i], dp[i-1] + nums[i])）**
**解析：** 最大子段和（Kadane）的 DP：dp[i] 表示以 nums[i] 结尾的连续子数组最大和。可以选择单独以 nums[i] 起一个新子数组（nums[i]），或接上前面的 dp[i-1]。
- A. 用 nums[i+1] 越界且语义错，错误。
- B. max(nums[i], dp[i-1] + nums[i])：正确。
- C. 用 dp[i+1]（尚未计算），错误。
- D. 用 nums[i+1]，错误。
**考点**：最大子段和（DP / Kadane 算法）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `在哈希表的实现中，冲突解决是一个重要的问题。以下哪种方法 不是 常见的哈希表冲突解决策略？`,
            options: [
                "链地址法（ Chaining ）",
                "开放地址法（ Open Addressing ）",
                "二次哈希法（ Double Hashing ）",
                "二分查找法（ Binary Search ）",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（二分查找法 Binary Search）**
**解析：** 哈希表常见的冲突解决策略包括：链地址法（Chaining）、开放地址法（Open Addressing，含线性/二次探测）以及双重哈希（Double Hashing）。二分查找是一种在有序数据中查找元素的算法，并非哈希冲突解决策略。
- A. 链地址法：常见策略。
- B. 开放地址法：常见策略。
- C. 二次哈希法：常见策略（双重哈希）。
- D. 二分查找法：不是冲突解决策略，正确选项。
**考点**：哈希表冲突解决方法。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `在 C++ 语法中，表达式1e6、1000000和$10^6$的值是相同的。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
**解析：** \`1e6\` 是 double 字面量，值约 1000000.0；\`1000000\` 是 int 字面量；而 \`10^6\` 中的 \`^\` 是按位异或运算符，10(1010) ^ 6(0110) = 12，三者并不相等，因此该说法错误。
**考点**：字面量类型、按位异或运算符。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `在 C++ 语言中，函数调用前必须有函数声明或定义。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
**解析：** 在 C++ 中，函数必须在被调用之前先声明或定义（即调用点之前可见其函数原型），否则编译器无法识别该函数而报错。若在被调用前已给出完整定义，也满足“已定义”的要求。
**考点**：函数声明与定义的使用顺序。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `快速排序一般是不稳定的。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
**解析：** 快速排序在划分（partition）过程中会把与基准相等（或小于/大于）的元素交换到不同侧，可能改变相等元素的原有相对顺序，因此快速排序一般是不稳定的排序算法。
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
            question: `long long类型能表达的数都能使用double类型精确表达。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
**解析：** double 仅有 52 位尾数（有效位约 15–16 位十进制），而 long long 是 64 位整数，可表示约 19 位十进制整数。大于 2^53 的整数（如 2^53+1）在 double 中会发生舍入、无法精确表示，因此 long long 能表达的数并非都能由 double 精确表达。
**考点**：浮点数精度、double 与整数的表示范围。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `使用math.h或cmath头文件中的函数，表达式cos(60)的结果类型为double、值约为0.5。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
**解析：** \`cos\` 的结果类型确实为 double，但其参数为弧度制，\`cos(60)\` 表示 60 弧度，值约为 -0.952，并非 0.5；要计算 60 度的余弦应写 \`cos(60 * M_PI / 180)\`。因此该说法错误。
**考点**：cmath 三角函数、弧度制与角度制区别。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            sourceIntegrity: "missing-formula",
            integrityNote: "原卷此题的公式或数值在文本提取时丢失，题干留下空档，仅凭当前内容无法作答。本题已排除出计分与考点练习，待补齐原卷公式后恢复。",
            question: `一颗 层的满二叉树，一定有 个结点。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
**解析：** 满二叉树（每一层都满）第 k 层有 2^(k-1) 个节点。N 层满二叉树总节点数为 2^0 + 2^1 + ... + 2^(N-1) = 2^N - 1。
**考点**：满二叉树的节点数公式。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `邻接表和邻接矩阵都是图的存储形式。为了操作时间复杂度考虑，同一个图可以同时维护两种存储形式。 maxSum = max(maxSum, $dp[i]$); } return maxSum; } int main() { int n; cin >> n; vector<int> nums(n); for (int i = 0; i < n; i++) { cin >> nums[i]; } int result = maxSubArray(nums); cout << result << endl; return 0; } 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
**解析：** 邻接表（遍历某点邻居的时间为 O(度数)）和邻接矩阵（判断两点是否相邻为 O(1)）都是图的存储形式。为兼顾不同操作的时间复杂度，同一个图完全可以同时维护两种存储结构以取长补短。
**考点**：图的存储结构（邻接表与邻接矩阵）。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `子类对象包含父类的所有成员（包括私有成员）。从父类继承的私有成员也是子类的成员，因此子类可以直 接访问。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
**解析：** 子类对象在内存中确实包含父类的所有成员（包括 private 成员），但父类的私有成员对子类不可见，子类不能直接访问，只能通过父类的公有/保护成员函数间接访问。因此该说法错误。
**考点**：继承与访问控制（private 成员的可见性）。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `动态规划算法通常有递归实现和递推实现。但由于递归调用在运行时会由于层数过多导致程序崩溃，有些动 态规划算法只能用递推实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
**解析：** 动态规划通常既可用递归（记忆化搜索）实现，也可用递推（填表）实现。递归调用层数过深时会耗尽调用栈导致栈溢出、程序崩溃；在状态规模很大时，常改用递推实现，因此有些动态规划问题实际只能用递推完成。
**考点**：动态规划的实现方式（递归 vs 递推）。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `按照下面的规则生成一棵二叉树：以一个人为根节点，其父亲为左子节点，母亲为右子节点。对其父亲、 母亲分别用同样规则生成左子树和右子树。以此类推，记录 30 代的直系家谱，则这是一棵满二叉树。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
**解析：** 按规则每个节点恰好分出父、母两个子节点，形式上类似满二叉树；但现实家谱中近亲结婚会使同一祖先出现在多个分支，造成节点重复、破坏"每个节点恰有两个不同子节点且无重复"的树结构，因此严格来说不一定是满二叉树。
**考点**：二叉树建模与家谱结构。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        ...programmingQuestions
    ]
};
