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
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<long long> deg(n+1, 0);\n    for (int i = 0; i < m; ++i) {\n        int u, v;\n        cin >> u >> v;\n        deg[u]++;\n        deg[v]++;\n    }\n\n    long long ans = 0;\n    for (int i = 1; i <= n; ++i) {\n        ans += deg[i] * (deg[i]-1) / 2;\n    }\n    cout << ans << '\\n';\n    return 0;\n}",
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
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<pair<int, int>> items(n);\n    int sumDiff = 0;\n    for (int i = 0; i < n; ++i) {\n        int a, b;\n        cin >> a >> b;\n        items[i] = {a, b};\n        sumDiff += abs(a-b);\n    }\n\n    const int NEG = -1000000000;\n    int offset = sumDiff;\n    vector<int> dp(offset * 2+1, NEG);\n    dp[offset] = 0;\n\n    for (auto [a, b] : items) {\n        int diff = a-b;\n        int val = a+b;\n        vector<int> ndp = dp;\n        for (int i = 0; i <= offset * 2; ++i) {\n            if (dp[i] <= NEG / 2) continue;\n            int ni = i+diff;\n            if (0 <= ni && ni <= offset * 2) {\n                ndp[ni] = max(ndp[ni], dp[i]+val);\n            }\n        }\n        dp.swap(ndp);\n    }\n\n    cout << max(0, dp[offset]) << '\\n';\n    return 0;\n}",
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
            explanation: `**答案：C（f）**

题目中代码为：
\`\`\`cpp
char a = 'b' ^ 4;
cout << a;
\`\`\`
小写字母 \`b\` 的 ASCII 码为 98（二进制 \`0b01100010\`），\`4\` 为 \`0b00000100\`。按位异或：\`98 ^ 4 = 0b01100110 = 102\`。变量 \`a\` 为 \`char\` 类型，存放的是 ASCII 102，即字符 \`'f'\`，故输出 \`f\`。
- A：\`b\` 是异或前的原字符，未参与运算，错误。
- B：\`bbbb\` 与按位异或无关，错误。
- C：正确，如上。
- D：\`102\` 是异或得到的整数值，但 \`a\` 为 \`char\`，输出的是字符 \`'f'\` 而非数字 102，错误。

**考点**：ASCII 码与按位异或运算、char 类型的输出语义。`,
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
            explanation: `**答案：C（p + a = p;）**

本题考察指针表达式能否作为左值（赋值目标）。
- A：\`*(p + a) = *p;\` 合法：\`p + a\` 是地址，解引用后是对内存的引用，可作左值。
- B：\`*(p - a) = a;\` 合法：解引用结果是可修改的左值。
- C：\`p + a = p;\` 非法：\`p + a\` 是临时计算出的指针值（右值），不是可被修改的内存对象，不能放在赋值号左侧，编译器报错。
- D：\`p = p + a;\` 合法：把偏移后的地址赋值给指针变量 \`p\` 本身。

**考点**：指针算术与左值/右值概念。`,
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
            explanation: `**答案：B（构造派生类对象时，只调用派生类的构造函数，不会调用基类的构造函数。）**

- A：正确。通过基类指针 \`delete\` 派生类对象时，若基类析构函数非虚，只会调用基类析构，派生部分内存泄漏；声明为虚析构可保证正确调用派生类析构。
- B：错误。构造派生类对象时，会先调用基类构造函数（按继承顺序），再调用派生类自己的构造函数；即使未显式写出，编译器也会插入对基类默认构造的调用。
- C：正确。派生类可用 \`基类名::虚函数()\` 显式调用基类版本。
- D：正确。基类指针形参可接收派生类指针（向上造型，多态基础）。

**考点**：继承中构造/析构顺序、虚析构函数、向上造型。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `下列 C++ 代码的输出是（ ）。

\`\`\`cpp
#include <iostream>
using namespace std;
int main() {
    int arr[5] = {2, 4, 6, 8, 10};
    int * p = arr + 2;
    cout << p[3] << endl;
    return 0;
}
\`\`\``,
            options: [
                "6",
                "8",
                "编译出错，无法运行。",
                "不确定，可能发生运行时异常。",
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1687196062973984.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：D（不确定，可能发生运行时异常。）**

\`p = arr + 2\` 使 \`p\` 指向 \`arr[2]\`，也就是元素 6。数组下标等价于指针运算，因此：

- \`p[0]\` 是 \`arr[2]\`，值为 6；
- \`p[1]\` 是 \`arr[3]\`，值为 8；
- \`p[2]\` 是 \`arr[4]\`，值为 10；
- \`p[3]\` 等价于 \`arr[5]\`，已经越过合法范围 \`arr[0]..arr[4]\`。

形成指向数组末尾后一个位置的指针本身是允许的，但解引用该位置属于未定义行为。程序语法正确，通常可以通过编译；运行时可能输出任意值，也可能异常终止，所以 A、B、C 都不能保证，D 正确。

**易错点**：\`p[3]\` 不是从数组首元素计算，而是从 \`p\` 当前指向的 \`arr[2]\` 再向后移动 3 个元素。

**原卷核验**：题干见官方 PDF 第 1 页，完整代码与选项见第 2 页；答案表见第 1 页。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `假定只有一个根节点的树的深度为 1，则一棵有 $N$ 个节点的完全二叉树，其深度为（ ）。`,
            options: [
                "⌊log₂(N)⌋ + 1",
                "⌊log₂(N)⌋",
                "⌈log₂(N)⌉",
                "不能确定",
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourceUrl: "https://gesp.ccf.org.cn/101/attach/1687196062973984.pdf",
            reviewedBy: "本站校订",
            reviewedAt: "2026-07-27",
            explanation: `**答案：A（⌊log₂(N)⌋ + 1）**

完全二叉树中，根节点深度记为 1。对深度为 \`h\` 的完全二叉树，其节点数 \`N\` 满足 \`2^(h-1) ≤ N ≤ 2^h - 1\`。由 \`2^(h-1) ≤ N\` 得 \`h-1 ≤ log₂N\`，即 \`h ≤ log₂N + 1\`；又 \`N ≤ 2^h - 1 < 2^h\` 得 \`h > log₂N\`，故 \`h = ⌊log₂N⌋ + 1\`。等价地，最后一层最右节点编号为 \`N\`，其层号为 \`⌊log₂N⌋ + 1\`，即整棵树深度。

**考点**：完全二叉树深度的计算。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `对于如下图的二叉树，说法正确的是（　）。

\`\`\`text
        A
      /   \\
     B     C
      \\   /
       D E
\`\`\`

其中：A 为根节点；A 的左孩子为 B、右孩子为 C；B 只有右孩子 D；C 只有左孩子 E。`,
            options: [
                "先序遍历是 ABDEC 。",
                "中序遍历是 BDACE 。",
                "后序遍历是 DBCEA 。",
                "广度优先遍历是 ABCDE 。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（广度优先遍历是 ABCDE。）**

先按图确定结构：A 为根，左子树是 B（B 只有右孩子 D），右子树是 C（C 只有左孩子 E）。

据此写出四种遍历：

| 遍历方式 | 规则 | 结果 |
|---|---|---|
| 先序 | 根 → 左 → 右 | A B D C E |
| 中序 | 左 → 根 → 右 | B D A E C |
| 后序 | 左 → 右 → 根 | D B E C A |
| 广度优先 | 逐层，从左到右 | **A B C D E** |

**逐项分析**：
- **A 先序是 ABDEC**：错。正确的先序是 A B D **C E**——遍历完 B 的子树后应先访问根 C，再访问 E。
- **B 中序是 BDACE**：错。正确的中序是 B D A **E C**——C 的左孩子 E 要排在 C 前面。
- **C 后序是 DBCEA**：错。正确的后序是 D B **E C** A——同样要先访问 E 再访问 C。
- **D 广度优先是 ABCDE**：正确。第 1 层 A，第 2 层 B、C，第 3 层 D、E。

**易错点**：B 的孩子是**右**孩子 D、C 的孩子是**左**孩子 E，这个左右差异正是三个错误选项的来源；层序遍历反而不受影响，因为它只按层次和左右顺序取节点。

**考点**：二叉树四种遍历的顺序规则`,
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
                "图的深度优先遍历和广度优先遍历对有向图和无向图都适用。",
                "使用邻接矩阵存储一个包含 个顶点的有向图，统计其边数的时间复杂度为 。",
                "同一个图分别使用出边邻接表和入边邻接表存储，其边结点个数相同。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（图的深度优先遍历须要借助队列来完成。）**

本题要求选出“错误”的说法。
- A：错误。深度优先遍历（DFS）用**栈**实现（递归隐式用调用栈，或显式栈）；**队列**是广度优先遍历（BFS）所需结构。
- B：正确。DFS 与 BFS 对有向图、无向图都适用，只是访问顺序不同。
- C：正确。邻接矩阵是 \`v×v\` 方阵，统计边数须扫描整个矩阵，时间复杂度 \`O(v²)\`。
- D：正确。出边邻接表与入边邻接表只是边的“方向”视角不同，边（结点）总数相同。

**考点**：图 DFS/BFS 的实现结构、邻接矩阵/邻接表特性。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `一个连通的简单有向图，共有 28 条边，则该图至少有（ ）个顶点。`,
            options: [
                "5",
                "6",
                "7",
                "8",
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1687196062973984.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：B（6）**

简单有向图没有自环和重边。对任意一对不同顶点 \`u, v\`，最多同时存在 \`u -> v\` 和 \`v -> u\` 两条有向边，因此 n 个顶点最多有 \`n(n - 1)\` 条边。

- 当 \`n = 5\` 时，最多有 \`5 * 4 = 20\` 条边，容纳不了 28 条边；
- 当 \`n = 6\` 时，最多有 \`6 * 5 = 30\` 条边。由 6 个顶点的完全有向图删去两条边，仍可保持连通，所以 28 条边可以实现。

因此满足 \`n(n - 1) >= 28\` 的最小整数是 6。连通条件不会把最小值提高到 7；容易误用的 \`n(n - 1) / 2\` 是简单无向图的边数上界。

**原卷核验**：题干与 A 选项见官方 PDF 第 2 页，其余选项见第 3 页；答案表见第 1 页。`,
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
                "在每个哈希表项处，使用不同的哈希函数再建立一个哈希表，管理该表项的冲突元素。",
                "在每个哈希表项处，建立二叉排序树，管理该表项的冲突元素。",
                "使用不同的哈希函数建立额外的哈希表，用来管理所有发生冲突的元素。",
                "覆盖发生冲突的旧元素。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（覆盖发生冲突的旧元素。）**

本题要求选出“不能合理解决或缓解冲突”的方案。
- A：合理。在冲突表项处用另一哈希函数再建哈希表（二级哈希/多重哈希），可有效分散冲突。
- B：合理。表项处挂二叉排序树管理同桶元素（类似 Java 8 HashMap 的树化），缓解长链。
- C：合理。用额外哈希表集中管理冲突元素，也是常见思路。
- D：不合理。直接覆盖旧元素会**丢失数据**，并没有“解决/缓解”冲突，只是丢弃了冲突项。

**考点**：哈希冲突的处理方法（链地址、再哈希、覆盖的弊端）。`,
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
            explanation: `**答案：B（动态规划方法的时间复杂度通常为状态的个数。）**

本题要求选出“错误”的说法。
- A：正确。DP 通常能写出状态转移（递推）方程。
- B：错误。时间复杂度 = 状态个数 × **每个状态的计算代价**（即转移开销）。例如 0/1 背包状态数为 \`O(nW)\`，每状态还要枚举物品，整体 \`O(n²W)\` 量级；仅说“等于状态个数”是不对的。
- C：正确。DP 有自顶向下（记忆化递归）与自底向上（递推）两种形式。
- D：正确。对同一问题，记忆化递归与递推通常都遍历全部状态，时间复杂度相当（常差常数因子）。

**考点**：动态规划的时间复杂度构成、实现形式。`,
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
                "64",
                "结果是随机的。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（8）**

程序为记忆化斐波那契：
\`\`\`cpp
int rec_fib[100];
int fib(int n) {
    if (n <= 1) return n;
    if (rec_fib[n] == 0) rec_fib[n] = fib(n-1) + fib(n-2);
    return rec_fib[n];
}
int main() { cout << fib(6) << endl; }
\`\`\`
各值：\`fib(0)=0, fib(1)=1, fib(2)=1, fib(3)=2, fib(4)=3, fib(5)=5, fib(6)=8\`。每个 \`rec_fib[n]\` 仅计算一次，输出 \`8\`。
- B：13 是 \`fib(7)\`，不符。
- C：64 与该递推无关。
- D：记忆化使结果确定，并非随机。

**考点**：记忆化（带缓存）递归、斐波那契数列。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `下面程序的时间复杂度为（ ）。\n\`\`\`cpp\nint rec_fib[MAX_N];\nint fib(int n) {\n    if (n <= 1)\n        return n;\n    if (rec_fib[n] == 0)\n        rec_fib[n] = fib(n - 1) + fib(n - 2);\n    return rec_fib[n];\n}\n\`\`\``,
            options: [
                "O(2ⁿ)",
                "O(φⁿ)，其中 φ = (√5 - 1) / 2",
                "O(n²)",
                "O(n)",
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3, 4],
            sourceUrl: "https://gesp.ccf.org.cn/101/attach/1687196062973984.pdf",
            reviewedBy: "本站校订",
            reviewedAt: "2026-07-27",
            explanation: `**答案：D（时间复杂度 O(n)）**

同一段记忆化 \`fib\` 程序（全局数组 \`rec_fib\` 缓存已算结果）：每次调用 \`fib(k)\`，若 \`rec_fib[k]\` 已算则 \`O(1)\` 直接返回；否则只向下递归 \`fib(k-1)\`、\`fib(k-2)\`，但 \`fib(k-1)\` 算完后 \`fib(k-2)\` 已被缓存。故每个 \`k∈[0,n]\` 实际只被“真正计算”一次，总访问次数 \`O(n)\`，整体时间复杂度 **O(n)**。

**考点**：记忆化动态规划的时间复杂度分析。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `下面 \`search\` 函数的平均时间复杂度为（ ）。\n\`\`\`cpp\nint search(int n, int* p, int target) {\n    int low = 0, high = n;\n    while (low < high) {\n        int middle = (low + high) / 2;\n        if (target == p[middle]) {\n            return middle;\n        } else if (target > p[middle]) {\n            low = middle + 1;\n        } else {\n            high = middle;\n        }\n    }\n    return -1;\n}\n\`\`\``,
            options: [
                "O(n log n)",
                "O(n)",
                "O(log n)",
                "O(1)",
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourceUrl: "https://gesp.ccf.org.cn/101/attach/1687196062973984.pdf",
            reviewedBy: "本站校订",
            reviewedAt: "2026-07-27",
            explanation: `**答案：C（平均时间复杂度 O(log n)）**

所给 \`search\` 为二分查找：在 \`[low, high)\` 区间内反复取中点 \`middle = (low+high)/2\`，比较 \`p[middle]\` 与 \`target\`，相等即返回，否则把区间折半（左半或右半）。每次循环区间长度减半，至多进行 \`⌈log₂(n+1)⌉\` 次比较，故时间复杂度 \`O(log n)\`；平均（成功/失败）比较次数同为 \`O(log n)\` 量级。
- A：O(n log n) 常见于高效比较排序，不符。
- B：O(n) 是顺序查找的复杂度，不符。
- D：O(1) 仅在特例（如哈希）成立，二分查找不是。

**考点**：二分查找的时间复杂度。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `下面程序的时间复杂度为（ ）。\n\`\`\`cpp\nint primes[MAXP], num = 0;\nbool isPrime[MAXN] = {false};\nvoid sieve() {\n    for (int n = 2; n <= MAXN; n++) {\n        if (!isPrime[n])\n            primes[num++] = n;\n        for (int i = 0; i < num && n * primes[i] <= MAXN; i++) {\n            isPrime[n * primes[i]] = true;\n            if (n % primes[i] == 0)\n                break;\n        }\n    }\n}\n\`\`\``,
            options: [
                "O(n)",
                "O(n log n)",
                "O(n log log n)",
                "O(n²)",
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourceUrl: "https://gesp.ccf.org.cn/101/attach/1687196062973984.pdf",
            reviewedBy: "本站校订",
            reviewedAt: "2026-07-27",
            explanation: `**答案：A（时间复杂度 O(n)）**

所给 \`sieve\` 是欧拉筛（线性筛）：外层 \`n\` 从 2 到 \`MAXN\`，若 \`n\` 未被标记则为素数存入 \`primes\`；内层用已得素数 \`primes[i]\` 标记 \`n*primes[i]\` 为合数，且当 \`n % primes[i] == 0\` 时 \`break\`。关键性质：每个合数**只被它的最小质因子标记一次**，故总标记次数 \`O(MAXN)\`，整体时间复杂度 **O(n)**（线性）。

**考点**：欧拉筛（线性筛）的原理与时间复杂度。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `下列选项中，哪个不可能是下图的广度优先遍历序列（ ）。

![题目中的有向图](/question-assets/2025-06-l7/q15-graph.png)`,
            options: [
                "1, 2, 4, 5, 3, 7, 6, 8, 9",
                "1, 2, 5, 4, 3, 7, 8, 6, 9",
                "1, 4, 5, 2, 7, 3, 8, 6, 9",
                "1, 5, 4, 2, 7, 3, 8, 6, 9",
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4, 5],
            sourceUrl: "https://gesp.ccf.org.cn/101/attach/1687196062973984.pdf",
            reviewedBy: "本站校订",
            reviewedAt: "2026-07-27",
            explanation: `**答案：B（1, 2, 5, 4, 3, 7, 8, 6, 9）**

从 1 出发，第一层可到达的节点是 2、4、5，它们的先后顺序可以随邻接表顺序变化，但必须先于第二层节点出队。

- 若序列以 \`1, 2, ...\` 开始，处理节点 2 时会发现节点 3，并将其排在后来处理 5、4 所发现的新节点之前。
- 选项 B 却把由 5 或 4 发现的节点 7、8 排在 3 前面，因此不可能由 BFS 得到。
- A、C、D 均能通过调整同层邻接点的访问顺序产生。

**考点**：广度优先遍历的层序约束。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `C++ 语言中，表达式9 & 12 的结果类型为int 、值为8 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

\`9\` 的二进制为 \`1001\`，\`12\` 的二进制为 \`1100\`，按位与：\`1001 & 1100 = 1000\`（二进制）= \`8\`（十进制）。C++ 中 \`&\` 的两个操作数都是 \`int\`（整型常量），结果类型自然为 \`int\`，值为 8。故说法成立。

**考点**：按位与运算、整型字面量类型。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `C++ 语言中，指针变量指向的内存地址不一定都能够合法访问。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

指针变量保存的是一个地址，但该地址不一定对应“可合法访问”的内存。例如：空指针 \`nullptr\`、未初始化的野指针、已 \`delete\` 的悬空指针、越界后的地址等，解引用都会导致未定义行为或运行时错误。因此“指针指向的地址不一定都能合法访问”是成立的。

**考点**：指针的有效性、野指针/悬空指针/未定义行为。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `对 个元素的数组进行快速排序，最差情况的时间复杂度为 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

快速排序选基准划分数组。最差情况出现在每次划分都极不均衡时（如数组已有序/逆序，且总选到端点作基准），每趟只把问题规模减 1，需 \`n-1\` 趟，比较次数约 \`n+(n-1)+…+1 = n(n-1)/2\`，时间复杂度为 **O(n²)**。平均情况才是 O(n log n)。

**注**：源文件题干末“时间复杂度为 。”处缺失了 \`O(n²)\`，按标准答案“正确”解析。

**考点**：快速排序的最坏时间复杂度。`,
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
            explanation: `**答案：正确**

在常见 C++ 实现（如 LP64）中，\`long long\` 占 **8 字节**，\`float\` 占 **4 字节**，故 \`long long\` 占用字节更多。即使在不常见平台，\`long long\`（至少 64 位）也通常不小于 \`float\`（至少 32 位 IEEE 754）。说法正确。

**考点**：基本数据类型的存储大小。`,
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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

\`pow\` 的函数原型返回类型是 \`double\`（即使两个参数都是整数，调用的也是 \`double pow(double, double)\` 重载），**结果类型是 \`double\` 而非 \`int\`**。因此严格来说“类型为 int”不正确；但请注意 \`pow\` 返回类型实为 \`double\`，直接赋给整型可能有截断/精度问题。

**考点**：\`cmath\` 中 \`pow\` 的返回类型（double）。`,
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
            explanation: `**答案：正确**

二叉排序树（BST）的定义即：对任意节点，其左子树所有键值 < 该节点键值 < 右子树所有键值。中序遍历顺序为“左子树—根—右子树”，恰好按键值从小到大访问，因此中序遍历序列一定是**升序（有序）**的。这是 BST 的基本性质，也常用于判断/重建 BST。

**考点**：二叉排序树的中序遍历性质。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `无论哈希表采用何种方式解决冲突，只要管理的元素足够多，都无法避免冲突。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

无论采用链地址法、开放定址、再哈希等哪种冲突解决方式，只要**被管理的元素数量足够多（趋于无限）而表长有限**，由鸽巢原理必然出现多个键映射到同一位置（或探测到同一槽），冲突**无法避免**，只能缓解、不能根除。故说法正确。

**考点**：哈希冲突的不可避免性（鸽巢原理）。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `在 C++ 语言中，类的构造函数和析构函数均可以声明为虚函数。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

C++ 中**析构函数可以声明为虚函数**（且通过基类指针删除派生类对象时应声明为虚析构），但**构造函数不能声明为虚函数**——构造期间对象类型尚未完整成型，虚机制不可用，语言直接禁止将构造函数声明为 \`virtual\`。因此“构造函数和析构函数**均**可以声明为虚函数”这一说法在严格意义上是**错误**的。

**考点**：虚构造函数/虚析构函数的合法性。`,
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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

动态规划**不要求必须使用递归**。DP 的核心是把原问题拆成重叠子问题并保存中间结果，实现上既可以是自顶向下的**记忆化递归**，也可以是自底向上的**递推（迭代）**；大量 DP 题目用递推数组即可高效求解，并不写递归。因此“必须使用递归实现”是错误的

**考点**：动态规划的两种实现形式（递推 vs 递归）。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `如果将城市视作顶点，公路视作边，将城际公路网络抽象为简单图，可以满足城市间的车道级导航需求。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

把城市当顶点、公路当边抽象为**简单图**（无重边、无自环）并**不能**满足车道级导航需求。原因：① 两城市间常有多条同向车道/不同等级道路，会形成**重边**，简单图无法表达；② 道路有方向（单行/双行），需要区分有向边；③ 车道级导航还需车道、转向限制等更细信息，远超简单图顶点-边模型。故该说法严格意义上是**错误**的

**考点**：简单图的定义与建模局限。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        ...programmingQuestions
    ]
};
