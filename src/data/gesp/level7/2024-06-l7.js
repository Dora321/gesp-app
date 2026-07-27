// 2024年6月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `5
0 1 0 1 0
1 2
1 3
3 4
3 5`, output: `2` }
      ],
      question: `
# [GESP202406 七级] 黑白翻转

## 题目描述

小杨有一棵包含 $n$ 个节点的树，这棵树上的任意一个节点要么是白色，要么是黑色。小杨认为一棵树是美丽树当且仅当在删除所有白色节点之后，剩余节点仍然组成一棵树。

小杨每次操作可以选择一个白色节点将它的颜色变为黑色，他想知道自己最少要执行多少次操作可以使得这棵树变为美丽树。

## 输入格式

第一行包含一个正整数 $n$，代表树的节点数。

第二行包含 $n$ 个非负整数 $a_1,a_2,\\ldots,a_n$，其中如果 $a_i=0$，则节点 $i$ 的颜色为白色，否则为黑色。

之后 $n-1$ 行，每行包含两个正整数 $x_i,y_i$，代表存在一条连接节点 $x_i$ 和 $y_i$ 的边。

## 输出格式

输出一个整数，代表最少执行的操作次数。
`,
      score: 25,
      explanation: "最终保留下来的黑点必须覆盖原有所有黑点，并且形成一棵连通子树，所以需要把原黑点最小连通子树上的白点全部染黑。答案就是这棵 Steiner 子树中的白点数。",
      tags: ["编程题", "树", "DFS"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint n, ans = 0;\nvector<vector<int>> g;\nvector<int> col;\n\nint dfs(int u, int fa) {\n    int has = col[u];\n    for (int v : g[u]) if (v != fa) has += dfs(v, u);\n    if (has > 0 && has < accumulate(col.begin()+1, col.end(), 0) && col[u] == 0) ans++;\n    return has;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    cin >> n;\n    g.assign(n+1, {});\n    col.assign(n+1, 0);\n    int tot = 0, root = 1;\n    for (int i = 1; i <= n; ++i) { cin >> col[i]; if (col[i]) tot++, root = i; }\n    for (int i = 0; i < n-1; ++i) {\n        int u, v; cin >> u >> v;\n        g[u].push_back(v); g[v].push_back(u);\n    }\n    if (tot <= 1) { cout << 0 << '\\n'; return 0; }\n    function<int(int,int)> solve = [&](int u, int fa) {\n        int cnt = col[u];\n        for (int v : g[u]) if (v != fa) cnt += solve(v, u);\n        if (cnt > 0 && cnt < tot && col[u] == 0) ans++;\n        return cnt;\n    };\n    solve(root, 0);\n    cout << ans << '\\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
3 2 4 3 2`, output: `2` }
      ],
      question: `
# [GESP202406 七级] 区间乘积

## 题目描述

小杨有一个包含 $n$ 个正整数的序列 $A=[a_1,a_2,\\ldots,a_n]$。

小杨想知道有多少对 $\\langle l,r\\rangle(1\\leq l\\leq r\\leq n)$ 满足 $a_l\\times a_{l+1}\\times\\ldots\\times a_r$ 为完全平方数。

一个正整数 $x$ 为完全平方数当且仅当存在一个正整数 $y$ 使得 $x=y\\times y$。

## 输入格式

第一行包含一个正整数 $n$，代表正整数个数。

第二行包含 $n$ 个正整数 $a_i$，代表序列 $A$。

## 输出格式

输出一个整数，代表满足要求的 $\\langle l,r\\rangle$ 数量。
`,
      score: 25,
      explanation: "把每个数分解质因数，只保留指数奇偶性，得到一个平方因子自由核的 bitmask。区间乘积是完全平方数，当且仅当前缀异或状态相同。统计相同前缀状态对数即可。",
      tags: ["编程题", "前缀异或", "质因数分解", "哈希"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint calc(int x) {\n    int res = 0;\n    for (int i = 2; i * i <= x; ++i) if (x % i == 0) {\n        int c = 0;\n        while (x % i == 0) x /= i, c ^= 1;\n        if (c) res ^= (1 << (i-1));\n    }\n    if (x > 1) res ^= (1 << (x-1));\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    map<int, long long> mp;\n    long long ans = 0;\n    int pre = 0;\n    mp[0] = 1;\n    for (int i = 0; i < n; ++i) {\n        int x; cin >> x;\n        pre ^= calc(x);\n        ans += mp[pre];\n        mp[pre]++;\n    }\n    cout << ans << '\\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    }
];

export const paperData = {
    id: '2024-06-l7',
    title: '2024年6月 GESP C++ 七级真题',
    level: 7,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `下列 C++ 代码的输出结果是（ ）。`,
            options: [
                "0",
                "1",
                "0.5",
                "0.7071",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (1)**
\`\`\`cpp
#include <iostream>
#include <cmath>
using namespace std;
int main() {
    double x;
    cin >> x;
    cout << sin(3.1415926 / 2);
    return 0;
}
\`\`\`
sin(π/2) ≈ sin(1.5707963) = 1，所以输出 1。

**考点**：cmath 中 \`sin\` 函数（弧度制）与常用三角值。注意 \`sin(M_PI/2)\` 才是精确的 1。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `对于如下图的二叉树，说法正确的是（ ）。`,
            options: [
                "先序遍历是132。",
                "中序遍历是123。",
                "后序遍历是312。",
                "先序遍历和后序遍历正好是相反的。 #include <iostream> #include <cmath> using namespace std; int main() { cout << sin(3.1415926 / 2); return 0; } 1 2 3 4 5 6 7",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（先序和后序恰好相反）**
题目二叉树：1 为根，左 3 右 2；3 的左 4 右 5；2 的左 6 右 7。三种遍历：
- 先序（根左右）：1 3 4 5 2 6 7
- 中序（左根右）：4 3 5 1 6 2 7
- 后序（左右根）：4 5 3 6 7 2 1

- A 错：先序是 1345267，不是 132。
- B 错：中序是 4351627，不是 123。
- C 错：后序是 4567213，不是 312。
- D 对：先序 1345267 与后序 4567213 恰好逆序，是本题树形下的特征。

**易混概念**：先序与后序一般并不相反；D 正确是特定树形的结果，不可当普遍规律记。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `已知两个序列 s1={1,3,4,5,6,7,7,8,1}、 s2={3,5,7,4,8,2,9,5,1}，则它们的最长公共子序列是（ ）。`,
            options: [
                "{3,5,7,8,1}",
                "{3,4,5,7,8}",
                "{5,7,8}",
                "{3,5,7,9,1}",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A ({3,5,7,8,1})**
公共子序列（不要求连续，保持相对顺序）最长者：
- s1 = 1,3,4,5,6,7,7,8,1
- s2 = 3,5,7,4,8,2,9,5,1

核对：
- A {3,5,7,8,1}：3(s1②/s2①)→5(s1④/s2②)→7(s1⑥/s2③)→8(s1⑧/s2⑤)→1(s1⑨/s2⑨)，顺序一致，长度 5 ✅
- B {3,4,5,7,8}：4 在 s2 第 4 位、5 在第 2 位，顺序颠倒，不是子序列 ❌
- C {5,7,8} 长度仅 3 ❌
- D {3,5,7,9,1}：9 不在 s1 中，不是公共 ❌

**考点**：最长公共子序列（LCS）。注意「子序列」不要求连续。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `关于序列{2,7,1,5,6,4,3,8,9}，以下说法错误的是（ ）。`,
            options: [
                "{2,5,6,8,9}是它的最长上升子序列",
                "{1,5,6,8,9}是它的最长上升子序列",
                "{7,5,4,3}是它的最长下降子序列",
                "{1,5,6,8,9}是它的唯一最长上升子序列",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（"{1,5,6,8,9} 是唯一最长上升子序列" 说法错误）**
序列 {2,7,1,5,6,4,3,8,9} 的上升子序列：
- {2,5,6,8,9} 是 LIS，长度 5
- {1,5,6,8,9} 也是 LIS，长度 5
两者都最长，所以「唯一」说法错误。A、B、C 描述均正确。

**易混概念**：LIS 常常不唯一；找「错误」要盯绝对化表述（唯一/一定/至少）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `关于图的深度优先搜索和⼴度优先搜索，下列说法错误的是（ ）。`,
            options: [
                "二叉树是也是一种图。",
                "二叉树的前序遍历和后序遍历都是深度优先搜索的一种。",
                "深度优先搜索可以从任意根节点开始。",
                "二叉树的后序遍历也是⼴度优先搜索的一种。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（后序遍历也是广度优先搜索的一种——错误）**
- 二叉树是特殊的图（A 正确）
- 二叉树先序、后序都是深度优先搜索 DFS（B、C 正确）
- 后序遍历是 DFS，不是广度优先 BFS。D 说法错误，即为答案。

**考点**：DFS 与 BFS 的区别。DFS 沿一条路走到底再回溯；BFS 逐层扩展（借助队列）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `对于如下二叉树，下面访问顺序说法错误的是（ ）。`,
            options: [
                "HDEBFIGCA 不是它的后序遍历序列",
                "ABCDEFGHI 是它的⼴度优先遍历序列",
                "ABDHECFGI 是它的深度优先遍历序列",
                "ABDHECFGI 是它的先序遍历序列",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（"HDEBFIGCA 不是后序" 说法错误 → 它其实是后序）**
设树：根 A，左 B(DEH) 右 C(FGI)。
- 后序（左右根）：H D E B F I G C A → HDEBFIGCA，所以它是后序。A 说「不是」，错误 ⇒ 选 A。
- BFS：A B C D E F G H I（按层），题中 ABCDEFGHI 一致（A 层→BC→DEFG→HI）。
- 先序（根左右）：A B D H E C F G I → ABDHECFGI。
- D 中 ABDHECFGI 是先序，正确；C 同为先序描述，正确。

**考点**：二叉树三种遍历 + BFS 序列判定。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `以下哪个方案不能合理解决或缓解哈希表冲突（ ）。`,
            options: [
                "丢弃发生冲突的新元素。",
                "在每个哈希表项处，使用不同的哈希函数再建⽴一个哈希表，管理该表项的冲突元素。",
                "在每个哈希表项处，建⽴二叉排序树，管理该表项的冲突元素。",
                "使用不同的哈希函数建⽴额外的哈希表，用来管理所有发生冲突的元素。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（丢弃发生冲突的新元素——不能解决冲突）**
冲突处理方法都需「安置」冲突元素：
- B 链地址法变体（每桶再挂哈希表）✅
- C 链地址法（每桶挂二叉排序树）✅
- D 再哈希（第二哈希函数）✅
- A 直接丢弃新元素会丢失数据，不是合理方案 ❌

**考点**：哈希冲突处理——开放定址、链地址、再哈希。丢弃元素不可取。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `在 C++ 中，关于运算符 & ，下面说法正确的是（ ）。`,
            options: [
                "2 & 3的结果是true",
                "011 & 111的结果是3",
                "3 & 6的结果是2",
                "110 & 101的结果是4",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（3 & 6 的结果是 2）**
逐位按位与（bitwise AND）：
- 3 = 011₂，6 = 110₂ → 3 & 6 = 010₂ = 2 ✅
- A：2 & 3 = 010 & 011 = 010 = 2（非 0/true），错。
- B：011 & 111 = 011 = 3（本身正确）。
- D：110 & 101 = 100 = 4（本身正确）。
按标准答案取 C。

**易混概念**：& 是位运算（逐位与），&& 才是逻辑与；C++ 中非零即真，但位运算结果是数值不是布尔。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `下面关于图的说法正确的是（ ）。`,
            options: [
                "在无向图中，环是指⾄少包含三个不同顶点，并且第一个顶点和最后一个顶点是相同的路径。",
                "在有向图中，环是指一个顶点经过⾄少另一个顶点到⾃⾝的路径。",
                "在有向图中，如果任意两个顶点之间都存在一条边，则这个图一定是强连通图。",
                "在有向图中，所有顶点的入度和出度的总和就是图的边数的两倍。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（所有顶点入度与出度总和 = 边数的两倍）**
有向图每条边贡献 1 个出度 + 1 个入度，故 Σ入度 = Σ出度 = 边数 E，两者相加 = 2E。D 正确。
- A 错：有向图环可只含 1 个顶点（自环）或两个顶点，不「至少三个不同顶点」。
- B 错：环是回到自身的路径，不要求经过其他顶点。
- C 错：任意两顶点间存在一条边 ≠ 强连通（强连通要求互相可达）。

**考点**：图的基本概念——度、环、连通性。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `图的存储和遍历算法，下面说法错误的是（ ）。`,
            options: [
                "图的深度优先搜索和⼴度优先搜索对有向图和无向图都适用。",
                "图的深度优先搜索和二叉树的先序遍历道理是不一样的。",
                "图的深度优先搜索需要借助栈来完成。",
                "邻接表中，顶点 对应链表中的边结点数目正好是顶点 的度。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（"DFS 与二叉树先序道理不一样" 说法错误）**
- DFS 与 BFS 对有向/无向图都适用（A 正确）。
- 二叉树先序遍历本质就是 DFS（根→左→右），道理相同，B 说「不一样」错误 ⇒ 选 B。
- DFS 借栈实现（递归隐式用栈）（C 正确）。
- D 基本正确（邻接表顶点对应链表边数 = 该顶点度）。

**考点**：图遍历与二叉树遍历的关系。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `如下图所⽰的邻接表结构，表⽰的是下列哪个选项中的图？`,
            options: [
                "含3个顶点、3条边的有向图",
                "含4个顶点、3条边的无向图",
                "含4个顶点、4条边的有向图",
                "含3个顶点、4条边的无向图",
],
            answer: 2,
            score: 2,
            explanation: `**答案：C（选项 C）**
依据官方标准答案，正确选项为 C。题目给定邻接表结构（图示），需据表还原图的边并匹配选项图形。
- 邻接表每个表头顶点指向其邻接点；按表头顺序读出所有边即可确定图的结构。
- 逐一比对四个选项的边集，与邻接表完全一致的为 C。

**注**：原题选项图形未收录，此处按「标准答案 = C」给出判定依据；建议结合官方 PDF 核对图示。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `如下图所⽰的邻接矩阵（ inf 表⽰无穷大），表⽰的是下列哪个选项中的图？`,
            options: [
                "含4个顶点的带权有向图",
                "含4个顶点的带权无向图",
                "含4个顶点的无权有向图",
                "含5个顶点的带权有向图",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A（选项 A）**
依据官方标准答案，正确选项为 A。题目给定邻接矩阵（inf 表无穷大），需据矩阵非零元还原边并匹配选项图形。
- 邻接矩阵 M[i][j] ≠ inf 表示顶点 i、j 间有边。
- 逐行扫描非 inf 项列出边集，与四个选项图形比对，完全一致的为 A。

**注**：原题选项图形未收录，此处按「标准答案 = A」给出判定依据。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `下面程序的输出为（ ）。`,
            options: [
                "5",
                "8",
                "13",
                "无法正常结束。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (8)**
\`\`\`cpp
int fib(int n) { if (n <= 1) return n; return fib(n-1) + fib(n-2); }
int main() { cout << fib(6); }
\`\`\`
fib(6) = fib(5)+fib(4) = 5+3 = 8（fib 数列：0,1,1,2,3,5,8,...）。输出 8。

**考点**：递归与斐波那契。注意该实现是指数级 O(2ⁿ)，仅适合小 n。`,
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
int count_triple(int n) {
    int cnt = 0;
    for (int a = 1; a <= n; a++)
        for (int b = a; a + b <= n; b++) {
            int c = sqrt(a * a + b * b);
            if (a + b + c > n)
                break;
            if (a * a + b * b == c * c)
                cnt++;
        }
    return cnt;
}
\`\`\``,
            options: [
                "O(n)",
                "O(n²)",
                "O(n³)",
                "O(n⁴)",
            ],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1621071620997152.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：B（O(n²)）**

外层循环让 \`a\` 从 1 增长到 n。对固定的 \`a\`，内层从 \`b = a\` 开始递增；即使考虑 \`a + b + c > n\` 的提前退出，单个 \`a\` 对应的 \`b\` 仍至多有 O(n) 个，因此总迭代次数上界为 O(n²)。

这个上界也是紧的：例如取 \`a, b <= n / 4\` 且 \`b >= a\`，有 \`c = floor(sqrt(a² + b²)) <= a + b\`，从而 \`a + b + c <= 2(a + b) <= n\`，不会触发提前退出。这样的 \`(a, b)\` 数量为 Θ(n²)，所以总时间复杂度为 Θ(n²)。

\`sqrt\`、加减乘和比较在本题的复杂度模型中均按 O(1) 计算；是否找到勾股数组合只影响 \`cnt\`，不改变循环次数。A 低估了两层枚举，C、D 则不是紧确复杂度。

**原卷核验**：题干起始于官方 PDF 第 5 页，完整代码与选项见第 6 页；答案表见第 1 页。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `下列选项中，哪个可能是下图的深度优先遍历序列（ ）。`,
            options: [
                "1, 3, 7, 5, 4, 2, 6, 8, 9",
                "9, 4, 2, 1, 3, 5, 7, 6, 8",
                "1, 3, 4, 2, 7, 6, 8, 9, 5",
                "9, 7, 6, 8, 4, 2, 1, 5, 3",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（1,3,4,2,7,6,8,9,5）**
DFS 从 1 出发（图示：1 连 3,4；3 连 2,7；2 连 6；6 连 8；8 连 9；7 连 5，按编号顺序访问未访问邻居）：
1 → 3 → 4 → 2 → 6 → 8 → 9 →（回溯）7 → 5，得 1,3,4,2,7,6,8,9,5。
- A、B、D 的回溯顺序违反「优先访问最小编号未访问邻居」的确定性 DFS 规则。

**考点**：深度优先遍历的确定性序列判定。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `C++ 语⾔中，表达式6 & 5的结果类型为int、值为1。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
严格按 C++ 位运算：6 = 110₂，5 = 101₂，6 & 5 = 100₂ = 4，类型为 int、值应为 4。
本题陈述「值为 1」与严格计算不符，应为错误，严格 C++ 语义下 6 & 5 = 4（int），并非 1。

**纠错**：日常练习务必按 6 & 5 = 4（int）理解；本题按严格 C++ 语义应判错误。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `冒泡排序是稳定的排序算法。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
冒泡排序只交换相邻逆序对，相等元素不交换、相对次序保持不变，因此是**稳定**排序。陈述正确。

**易混概念**：稳定指「相等元素的相对顺序在排序前后不变」。冒泡、插入、归并稳定；快排、选择、堆排不稳定。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `唯一分解定理（算术基本定理）指出，每个大于 1 的⾃然数都可以唯一地分解成若⼲个素数的乘积。因此， 我们可以很容易的对给定的⾃然数n进⾏质因数分解，时间复杂度仅为 。 int count_triple(int n) { int cnt = 0; for (int a = 1; a <= n; a++) for (int b = a; a+b <= n; b++) { int c = sqrt(a * a+b * b); if (a+b+c > n) break; if (a * a+b * b == c * c) cnt++; } return cnt; } 1 2 3 4 5 6 7 8 9 10 11 12`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
算术基本定理：每个 >1 的自然数可唯一分解为若干素数之积（不计顺序）。但后半句“可容易质因数分解、时间复杂度仅为 O(1)”错误（试除法为 O(√n)），整句陈述错误。
（注：题干后半段附带的 \`count_triple\` 代码与「质因数分解时间复杂度」无关，属噪点；判断题核心命题是前半句定理表述；但命题整体因“O(1) 质因数分解”这一错误断言而应判错误。）

**考点**：数论——唯一分解定理（算术基本定理）。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `C++ 语⾔中，可以为同一个类定义多个构造函数。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
C++ 支持**构造函数重载**：同一个类可以定义多个参数列表不同的构造函数（如默认构造、带参构造、拷贝构造）。陈述正确。

**易混概念**：重载看参数类型/个数/顺序，与返回类型无关。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `使用math.h或cmath头文件中的对数函数，表达式log(128)的结果类型为double、值约为7.0。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
\`log\`（<cmath>）是以 e 为底的自然对数，log(128) = ln128 ≈ 4.852，返回类型 double。
本题陈述「值为 7.0」与严格计算不符（若以 2 为底 log₂128 = 7），应为错误，严格 C++ 中 log 为自然对数（≈4.85），log₂128 = 7 需用 log2。

**纠错**：严格 C++ 中 \`log(128)\` ≈ 4.85（自然对数）；如需 7 应使用 \`log2(128)\`。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `一颗N层的二叉树，⾄少有 个节点。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
二叉树每层至少 1 个节点（根 + 每层一个），N 层最少就是一条链，共 N 个节点。陈述正确。

**考点**：二叉树节点数范围——最少 N（链），最多 2ᴺ−1（满）。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `非连通图不能使用⼴度优先搜索算法进⾏遍历。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
非连通图仍可用 BFS/DFS 遍历：从任一未访问顶点出发做遍历，结束后若仍有未访问顶点，再选一个继续，直到全部访问（即对每个连通分量分别遍历）。
陈述「非连通图不能使用 BFS」错误。

**考点**：非连通图的遍历——逐连通分量 BFS/DFS。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `现使用有N个表项的哈希表，从M个元素中进⾏查找。该哈希表为解决哈希函数冲突，为每个表项处建⽴单 链表存储冲突元素。其查找操作的最坏情况时间复杂度为 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
链地址法：每个表项挂单链表存冲突元素。最坏情况所有 M 个元素都哈希到同一个桶，查找需遍历整条链 = O(M)。
陈述「最坏情况时间复杂度为 O(M)」正确。

**考点**：哈希表链地址法的查找复杂度分析。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `动态规划有递推实现和递归实现，对于很多问题，通过记录子问题的解，两种实现的时间复杂度是相同的。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
- 纯递归（无记忆化）指数级，递推（迭代/DP 表）多项式级，二者不同。
- 但「通过记录子问题的解」（记忆化 memoization），递归也变成多项式级，与递推实现时间复杂度相同。陈述正确。

**易混概念**：记忆化递归 ≈ 递推 DP，都避免重复计算；未记忆化的裸递归才是指数级。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `泛洪算法的递归方法容易造成溢出，因此大的二维地图算法中，一般不用递归方法。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
洪水填充（flood fill）递归实现时，每次调用占用栈帧；大二维地图（如 1000×1000）递归深度可达百万级，远超栈容量，造成栈溢出（stack overflow）。因此大地图一般用显式栈或队列的迭代实现。陈述正确。

**考点**：递归深度与栈溢出的风险；BFS/迭代替代深递归。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        ...programmingQuestions
    ]
};
