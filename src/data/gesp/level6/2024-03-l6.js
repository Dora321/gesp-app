// 2024年3月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `1 1 1 1`, output: `1` },
        { input: `114 51 4 1`, output: `176` },
        { input: `114514 191 9 810`, output: `384178446` }
      ],
      question: `
# [GESP202403 六级] 游戏

## 题目描述

你有四个正整数 $n,a,b,c$，并准备用它们玩一个简单的小游戏。

在一轮游戏操作中，你可以选择将 $n$ 减去 $a$，或是将 $n$ 减去 $b$。游戏将会进行多轮操作，直到当 $n \\leq c$ 时游戏结束。

你想知道游戏结束时有多少种不同的游戏操作序列。两种游戏操作序列不同，当且仅当游戏操作轮数不同，或是某一轮游戏操作中，一种操作序列选择将 $n$ 减去 $a$，而另一种操作序列选择将 $n$ 减去 $b$。如果 $a=b$，也认为将 $n$ 减去 $a$ 与将 $n$ 减去 $b$ 是不同的操作。

由于答案可能很大，你只需要求出答案对 $10^9 + 7$ 取模的结果。

## 输入格式

一行四个整数 $n,a,b,c$。

## 输出格式

输出一行一个整数表示答案。
`,
      score: 25,
      explanation: `**解析：**
      记 f[x] 为当前值为 x 时的方案数。若一步减到 0 或负数就立刻结束，这对应一个完整方案，所以边界可视作 f[x]=1（x<=0）；于是对正整数有 f[x]=f[x-a]+f[x-b]，顺推到 n 即可。

      **考点：** 动态规划、递推
      `,
      tags: ["编程题", "动态规划", "递推"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nconst long long MOD = 1000000007;\n\nint main() {\n    long long n, a, b, c;\n    cin >> n >> a >> b >> c;\n    if (n <= c) { cout << 1 << endl; return 0; }\n    // ways[x]：血量为 x 时到游戏结束的操作序列数；x <= c 时游戏已结束，只有空序列\n    vector<long long> ways(n + 1, 0);\n    auto get = [&](long long x) { return x <= c ? 1LL : ways[x]; };\n    for (long long x = c + 1; x <= n; x++) {\n        ways[x] = (get(x - a) + get(x - b)) % MOD;\n    }\n    cout << ways[n] << endl;\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `2
1 2
1 2`, output: `4` },
        { input: `3
1 2 3
3 2 1`, output: `7` }
      ],
      question: `
# [GESP202403 六级] 好斗的牛

## 题目描述

你有 $10^9$ 个牛棚，从左到右一字排开。你希望把 $n$ 头牛安置到牛棚里。麻烦的是，你的牛很好斗，如果他们附近有其他的牛，他们就会不安分地去挑事。其中，第 $i$ 头牛的攻击范围是 $(a_i, b_i)$，这意味着，如果他的左边 $a_i$ 个牛棚或者右边 $b_i$ 个牛棚有其他牛，它就会去挑事。

你想留下一段连续的牛棚，并把其他牛棚都卖掉。请问您最少需要留下多少牛棚，才能保证至少存在一种方案能够把所有的 $n$ 头牛都安置进剩余的牛棚里，且没有牛会挑事？

## 输入格式

第一行一个正整数 $n$。 
第二行 $n$ 个正整数 $a_1, a_2, \\dots a_n$。 
第三行 $n$ 个正整数 $b_1, b_2, \\dots b_n$。

## 输出格式

输出一行一个整数表示答案。
`,
      score: 25,
      explanation: `**解析：**
      若两头相邻的牛分别是 i、j，则它们之间至少要空出 max(a_i,a_j) 个牛棚，整段长度就是 n 加上相邻空棚数之和。把攻击范围从小到大排列即可使这部分和最小，答案化为 n+(a_1+...+a_n)-min(a_i)。

      **考点：** 贪心、构造
      `,
      tags: ["编程题", "贪心", "构造"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    vector<long long> a(n), b(n);\n    for (auto &x : a) cin >> x;\n    for (auto &x : b) cin >> x;\n    // 相邻两头牛 i(左)、j(右) 之间至少空 max(b_i, a_j) 个牛棚。\n    // 用状压 DP 求排列的最小间隔和（官方数据 n 较小）。\n    int full = 1 << n;\n    vector<vector<long long>> dp(full, vector<long long>(n, -1));\n    for (int i = 0; i < n; i++) dp[1 << i][i] = 0;\n    for (int mask = 1; mask < full; mask++) {\n        for (int last = 0; last < n; last++) {\n            if (dp[mask][last] < 0) continue;\n            for (int next = 0; next < n; next++) {\n                if (mask & (1 << next)) continue;\n                int nm = mask | (1 << next);\n                long long cost = dp[mask][last] + max(b[last], a[next]);\n                if (dp[nm][next] < 0 || cost < dp[nm][next]) dp[nm][next] = cost;\n            }\n        }\n    }\n    long long best = -1;\n    for (int last = 0; last < n; last++) {\n        if (dp[full - 1][last] >= 0 && (best < 0 || dp[full - 1][last] < best)) best = dp[full - 1][last];\n    }\n    cout << best + n << endl;\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2024-03-l6',
    title: '2024年3月 GESP C++ 六级真题',
    level: 6,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `在构建哈夫曼树时，每次应该选择（ ）合并。`,
            options: [
                "最小权值的节点",
                "最大权值的节点",
                "随机节点",
                "深度最深的节点",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
哈夫曼树的构建是典型的**贪心**过程：每次从森林中取出**权值最小的两棵**树合并，新树权值为二者之和，放回森林后重复，直到只剩一棵树。

「每次取最小」保证出现频率高（权值大）的字符离根近、编码短，频率低（权值小）的字符离根远、编码长，从而使总编码长度（WPL）最小。

逐项分析：
- **A 最小权值的节点**：正确。
- **B 最大权值的节点**：错误，先合并大的会把高频字符压到深处，WPL 变大。
- **C 随机节点**：错误，随机合并无法保证最优前缀码。
- **D 深度最深的节点**：错误，构建前不存在「深度」概念，且与贪心策略无关。

**易错点：** 每次合并后要把新树放回森林重新参与「找最小两个」，不是一次性排好序。

**考点：** 哈夫曼树的构建规则
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `面向对象的编程思想主要包括以下哪些原则（ ）？`,
            options: [
                "贪心、动态规划、回溯",
                "并发、并行、异步",
                "递归、循环、分治",
                "封装、继承、多态",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
面向对象编程（OOP）的三大核心原则是**封装、继承、多态**：封装隐藏内部细节，继承实现代码复用，多态让同一接口呈现不同行为。

逐项分析：
- **A 贪心、动态规划、回溯**：算法设计策略，不是 OOP 概念。
- **B 并发、并行、异步**：程序执行模型。
- **C 递归、循环、分治**：控制结构与算法技巧。
- **D 封装、继承、多态**：正确。

**易错点：** 「抽象」有时也被列为面向对象的基本原则之一，但考试标准答案是「封装、继承、多态」三件套。

**考点：** 面向对象基本思想
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `在队列中，元素的添加和删除是按照（ ）原则进行的。`,
            options: [
                "先进先出",
                "先进后出",
                "最小值先出",
                "随机进出",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
队列（queue）是**先进先出（FIFO）**的线性结构：入队（push）在队尾（rear），出队（pop）在队头（front），就像排队买票，先来的先被服务。

逐项分析：
- **A 先进先出**：正确，队列的定义。
- **B 先进后出**：错误，这是**栈**的特性（LIFO）。
- **C 最小值先出**：错误，这是优先队列（小根堆）的行为。
- **D 随机进出**：错误，队列两端操作位置固定。

**易错点：** 队列「先进先出」、栈「先进后出」是两类最基础线性结构的对比考点，几乎每次考试必出现其一。

**考点：** 队列的特性
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `给定一个简单的类定义如下，（ ）语句在类的外部正确地创建了一个 Circle 对象并调用了 getArea 函数？\n\n\`\`\`cpp\nclass Circle {\nprivate:\n    double radius;\npublic:\n    Circle(double r) : radius(r) {}\n    double getArea() {\n        return 3.14 * radius * radius;\n    }\n};\n\`\`\`\n`,
            options: [
                "Circle c = Circle(5.0); c.getArea(c);",
                "Circle c(5.0); getArea(c);",
                "Circle c = new Circle(5.0); c.getArea();",
                "Circle c(5.0); c.getArea();",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
在类的外部创建对象并调用成员函数的标准写法：**栈上构造 \`Circle c(5.0);\`，通过对象用点运算符调用 \`c.getArea();\`**。

逐项分析：
- **A \`Circle c = Circle(5.0); c.getArea(c);\`**：错误，\`getArea()\` 定义为无参成员函数，传入 c 会编译报错（参数不匹配）。
- **B \`Circle c(5.0); getArea(c);\`**：错误，\`getArea\` 是成员函数，不能像普通函数一样脱离对象直接调用。
- **C \`Circle c = new Circle(5.0); c.getArea();\`**：错误，\`new\` 返回**指针**（Circle*），不能赋值给栈对象 Circle，类型不匹配（这是 Java 写法混入 C++）。
- **D \`Circle c(5.0); c.getArea();\`**：正确。

**易错点：** 若用 \`Circle* c = new Circle(5.0);\` 则必须用 \`c->getArea()\`（箭头）并记得 \`delete c;\`——点运算符用于对象、箭头用于指针。

**考点：** 类的对象创建与成员函数调用
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `以下代码希望能在一棵二叉排序树中搜索特定的值，请在横线处填入（ ），使其能正确实现相应功能。\n\n\`\`\`cpp\nTreeNode* search(TreeNode* root, int target) {\n    if (root == NULL || root->val == target) {\n        return root;\n    }\n    if (_______________) {\n        return search(root->left, target);\n    } else {\n        return search(root->right, target);\n    }\n}\n\`\`\`\n`,
            options: [
                "target < root->left",
                "target < root->val",
                "target > root->val",
                "target > root->left",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
二叉排序树（BST）的性质：**左子树所有节点值 < 根值 < 右子树所有节点值**。

搜索时：若 \`root->val == target\` 命中返回；若 **target 比根小（\`target < root->val\`），目标只可能在左子树**，递归搜左边；否则递归搜右边。

代码逻辑：
\`\`\`text
if (_______________)      // target < root->val
    return search(root->left, target);   // 走左
else
    return search(root->right, target);  // 走右
\`\`\`

逐项分析：
- **A \`target < root->left\`**：错误，root->left 是指针，值与指针比较无意义。
- **B \`target < root->val\`**：正确，小于根值去左子树找。
- **C \`target > root->val\`**：错误，大于根值应该去**右**子树，方向反了。
- **D \`target > root->left\`**：错误，同样是与指针比较，类型不匹配。

**易错点：** 别把「小于走左、大于走右」写反——BST 中左小右大。

**考点：** 二叉排序树的搜索
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `3 位格雷编码的正确顺序是（ ）。`,
            options: [
                "000, 001, 010, 011, 100, 101, 110, 111",
                "000, 001, 011, 010, 110, 111, 101, 100",
                "000, 010, 001, 011, 100, 110, 101, 111",
                "000, 010, 110, 100, 111, 101, 011, 001",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
格雷码的相邻两组编码**有且只有一位不同**。

验证 B：\`000→001\`（第3位）→\`011\`（第2位）→\`010\`（第3位）→\`110\`（第1位）→\`111\`（第3位）→\`101\`（第2位）→\`100\`（第3位），每次恰好变一位 ✓。这也是 3 位格雷码的标准生成顺序（反射码）。

逐项分析：
- **A**：\`000→001→010\`，001 到 010 变了**两位**，是普通二进制递增序列，不是格雷码。
- **B**：正确。
- **C**：\`000→010→001\`，010→001 变了两位，错。
- **D**：\`000→010→110→100\` 虽然每位只变一位，但 \`100→111\` 变了**两位**，且不是标准 3 位格雷码序列。

**易错点：** 检查格雷码要**逐对相邻验证**，只要有一处相邻两项 differ 的位数 ≠ 1 即排除；选项 D 前几步都合法，容易骗过只检查开头的人。

**考点：** 格雷码的定义与验证
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `以下动态规划算法的含义与目的是（ ）。\n\n\`\`\`cpp\nint function(vector<int>& nums) {\n    int n = nums.size();\n    if (n == 0)\n        return 0;\n    if (n == 1)\n        return nums[0];\n    vector<int> dp(n, 0);\n    dp[0] = nums[0];\n    dp[1] = max(nums[0], nums[1]);\n    for (int i = 2; i < n; ++i) {\n        dp[i] = max(dp[i - 1], nums[i] + dp[i - 2]);\n    }\n    return dp[n - 1];\n}\n\`\`\`\n`,
            options: [
                "计算数组 nums 中的所有元素的和",
                "计算数组 nums 中相邻元素的最大和",
                "计算数组 nums 中不相邻元素的最大和",
                "计算数组 nums 中的最小元素",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
看核心转移方程：\`dp[i] = max(dp[i-1], nums[i] + dp[i-2])\`——对每个元素，要么**不选**它（dp[i-1]，维持前 i-1 个的最优），要么**选**它（nums[i] + dp[i-2]，但它前一个必须不选）。

这正是「**不相邻元素取最大和**」问题（打家劫舍）：从数组中选若干互不相邻的元素，使总和最大。

逐项分析：
- **A 所有元素的和**：错误，sum 只需一遍累加，不需要 DP。
- **B 相邻元素的最大和**：错误，相邻允许的话 dp[i] = max(dp[i-1]+nums[i], ...)，转移不含 dp[i-2] 的「跳一格」语义。
- **C 不相邻元素的最大和**：正确。
- **D 最小元素**：错误，一遍遍历即可。

**易错点：** \`dp[i-2]\` 的出现意味着「选了当前就不能选前一个」——转移方程里跳过的那一位就是约束条件的体现。

**考点：** 动态规划的状态转移方程分析（打家劫舍模型）
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `阅读以下广度优先搜索的代码，使用以上算法遍历以下这棵树，可能的输出是（ ）。\n\n\`\`\`cpp\nvoid bfs(TreeNode* root) {\n    if (root == NULL) {\n        return;\n    }\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        TreeNode* current = q.front();\n        q.pop();\n        cout << current->val << " ";\n        if (current->left) {\n            q.push(current->left);\n        }\n        if (current->right) {\n            q.push(current->right);\n        }\n    }\n}\n\`\`\`\n\n\`\`\`text\n      1\n     / \\\n    2   3\n   / \\   \\\n  8   9   6\n     / \\   \\\n    4   5   7\n           / \\\n          10 11\n\`\`\`\n`,
            options: [
                "1 2 8 9 4 5 3 6 7 10 11",
                "1 2 3 4 5 6 7 8 9 10 11",
                "1 2 3 8 9 6 4 5 7 10 11 vector<int> dp(n, 0); dp[0] = nums[0]; dp[1] = max(nums[0], nums[1]); for (int i = 2; i < n; ++i) { dp[i] = max(dp[i-1], nums[i]+dp[i-2]); } return dp[n-1]; } 7 8 9 10 11 12 13 14 void bfs(TreeNode* root) { if (root == NULL) { return; } queue<TreeNode*> q; q.push(root); while (!q.empty()) { TreeNode* current = q.front(); q.pop(); cout << current->val << \" \"; if (current->left) { q.push(current->left); } if (current->right) { q.push(current->right); } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 1 /  2 3 /   8 9 6 /   4 5 7 /  10 11 1 2 3 4 5 6 7 8 9",
                "1 2 3 8 9 4 5 6 7 10 11",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
BFS 用队列逐层访问：出队输出节点，先左后右把子节点入队。

树的层次结构：
\`\`\`text
第1层：1
第2层：2 3
第3层：8 9 6
第4层：4 5 7
第5层：10 11
\`\`\`

层序输出：\`1 2 3 8 9 6 4 5 7 10 11\`，选 C。

逐项分析：
- **A \`1 2 8 9 4 5 3 6 7 10 11\`**：错误，这是先访问完左子树再右子树的深度优先式顺序。
- **B \`1 2 3 4 5 6 7 8 9 10 11\`**：错误，这是按数值大小排序，与树的层序无关（第3层是 8 9 6 不是 4 5 6）。
- **C \`1 2 3 8 9 6 4 5 7 10 11\`**：正确，逐层从左到右。
- **D \`1 2 3 8 9 4 5 6 7 10 11\`**：错误，第3层 6 的位置错了（6 是 3 的孩子，应在 9 之后第3层末尾）。

**易错点：** 节点编号大小与访问顺序无关，必须严格按树形结构逐层走队列。

**考点：** 二叉树的广度优先搜索（层序遍历）
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `给定一个空栈，执行以下操作序列： 操作序列：push(1), push(2), push(3), pop(), pop(), push(4), push(5), pop() 最终栈中的元素是（ ）。`,
            options: [
                "1, 2",
                "1, 4, 5",
                "1, 2, 5",
                "1, 4",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
逐步模拟（栈从底到顶）：

| 操作 | 栈内（底→顶） |
|------|--------------|
| push(1) | 1 |
| push(2) | 1, 2 |
| push(3) | 1, 2, 3 |
| pop() | 1, 2（弹出3） |
| pop() | 1（弹出2） |
| push(4) | 1, 4 |
| push(5) | 1, 4, 5 |
| pop() | 1, 4（弹出5） |

最终栈中元素：**1, 4**，选 D。

逐项分析：
- **A 1, 2**：错误，2 已被第二次 pop 弹出。
- **B 1, 4, 5**：错误，5 已被最后一次 pop 弹出。
- **C 1, 2, 5**：错误。
- **D 1, 4**：正确。

**易错点：** pop 弹出的永远是**栈顶**元素；一共 3 次 pop（3、2、5），别数漏。

**考点：** 栈操作的模拟
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `一个有 124 个叶子节点的完全二叉树，最多有（ ）个结点。`,
            options: [
                "247",
                "248",
                "249",
                "250",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
二叉树度数关系：**n0（叶子）= n2（双分支）+ 1**，所以 n2 = 124 − 1 = 123。

完全二叉树中度为 1 的节点 n1 只能是 **0 或 1**（完全二叉树至多一个单分支节点）。

总结点 = n0 + n1 + n2 = 124 + 123 + n1 = **247 或 248**。

题目问「**最多**」→ n1 = 1 → **248**，选 B。

逐项分析：
- **A 247**：错误，这是 n1=0 的情形，是「最少」而非「最多」。
- **B 248**：正确。
- **C 249**：错误，违反 n0 = n2 + 1 的约束。
- **D 250**：错误，同上。

**易错点：** 完全二叉树 n1 ∈ {0, 1} 是关键——普通二叉树没有这个限制；「最多」对应 n1=1，当总结点为偶数时 n1 必为 1（完全二叉树的奇偶性结论）。

**考点：** 二叉树度数关系 + 完全二叉树性质
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `在求解最优化问题时，动态规划常常涉及到两个重要性质，即最优子结构和（ ）。`,
            options: [
                "重叠子问题",
                "分治法",
                "贪心策略",
                "回溯算法",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
动态规划适用的两大性质：
1. **最优子结构**：原问题的最优解由子问题的最优解构成。
2. **重叠子问题**：自顶向下递归时同一子问题被反复计算，DP 用表格/记忆化让每个子问题只求解一次。

逐项分析：
- **A 重叠子问题**：正确。
- **B 分治法**：错误，分治的子问题相互独立、不重叠，恰是 DP 与分治的分界线。
- **C 贪心策略**：错误，贪心不回退、不做全局权衡。
- **D 回溯算法**：错误，回溯是解空间搜索框架。

**易错点：** 最优子结构并非 DP 独有（分治、贪心也需要），**重叠子问题**才是 DP 区别于分治的标志。

**考点：** 动态规划的两个基本性质
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `若一棵二叉树的先序遍历为： A, B, D, E, C, F 、中序遍历为： D, B, E, A, F, C ，它的后序遍历为（ ）。`,
            options: [
                "D, E, B, F, C, A",
                "E, D, B, F, C, A",
                "D, E, B, C, F, A",
                "E, D, B, C, F, A",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
由先序+中序重建二叉树，再求后序：

1. 先序首元素 **A** 是根；中序中 A 左边 \`D B E\` 是左子树、右边 \`F C\` 是右子树。
2. 左子树：先序 \`B D E\` → 根 **B**；中序 \`D | B | E\` → D 是 B 的左孩子、E 是 B 的右孩子。
3. 右子树：先序 \`C F\` → 根 **C**；中序 \`F | C\` → F 是 C 的左孩子。

树形：
\`\`\`text
        A
       / \
      B   C
     / \  /
    D   E F
\`\`\`

后序（左右根）：左子树 \`D E B\` → 右子树 \`F C\` → 根 \`A\`，即 **D, E, B, F, C, A**，选 A。

逐项分析：
- **A D, E, B, F, C, A**：正确。
- **B E, D, B, ...**：错误，B 的左孩子是 D（先序 B 在前），D 应先于 E。
- **C D, E, B, C, F, A**：错误，C 的左孩子是 F，后序中 F 在 C 之前。
- **D E, D, B, C, F, A**：错误，同 B/C 两处皆错。

**易错点：** 重建时先序定根、中序分左右，逐层递归；后序最后一位必是根 A，可与选项快速排除。

**考点：** 由先序+中序遍历重建二叉树
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `线性筛法与埃氏筛法相比的优势是（ ）。`,
            options: [
                "更容易实现",
                "更节省内存",
                "更快速",
                "更准确",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
- **埃氏筛**：每个合数会被它的**所有**质因数各筛一遍（如 12 被 2、3 各筛一次），总操作约 O(n log log n)。
- **线性筛（欧拉筛）**：保证**每个合数只被其最小质因数筛掉一次**（12 只被 2×6 筛，3×4 跳过），总操作严格 O(n)。

所以线性筛的优势是**更快速**。

逐项分析：
- **A 更容易实现**：错误，线性筛要维护「当前 i 的最小质因数」逻辑，反而比埃氏筛难写。
- **B 更节省内存**：错误，两者都用同长度的标记数组，内存相同。
- **C 更快速**：正确，O(n) vs O(n log log n)，且常数更稳定。
- **D 更准确**：错误，两者筛出的素数集合完全一样，不存在准确性差异。

**易错点：** 「更准确」「更省内存」是常见干扰项——两种筛法结果和空间都一样，差距只在时间。

**考点：** 线性筛与埃氏筛的对比
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `以下代码使用了辗转相除法求解最大公因数，请在横线处填入（ ），使其能正确实现相应功能。

\`\`\`cpp
int gcd(int a, int b) {
    while (b != 0) {
        ______________________
    }
    return a;
}
\`\`\``,
            options: [
                "int temp = b; b = a / b; a = temp;",
                "int temp = a; a = b / a; b = temp;",
                "int temp = b; b = a % b; a = temp;",
                "b = a % b; a = b;",
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：C**

**推导过程：**

辗转相除法利用 \`gcd(a, b) = gcd(b, a % b)\`。每轮必须先保存旧的 \`b\`，再令 \`b\` 变为余数，最后令 \`a\` 变为旧的 \`b\`：

\`\`\`cpp
int temp = b;
b = a % b;
a = temp;
\`\`\`

A 使用商 \`a / b\` 而不是余数；B 的赋值方向和除法都不符合递推关系；D 在保存旧 \`b\` 前就覆盖了它，随后 \`a\` 与 \`b\` 变成同一个值。

**最小验证：** 取 \`a = 18, b = 12\`，正确更新为 \`(12, 6)\`，下一轮为 \`(6, 0)\`，返回 6。

**考点：** 欧几里得算法、最大公因数、变量交换。`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `下面的代码片段用于反转单链表，请进行（ ）修改，使其能正确实现相应功能。

\`\`\`cpp
ListNode* reverseLinkedList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* current = head;
    while (current != nullptr) {
        ListNode* next = current->next;
        current->next = next;
        prev = current;
        current = next;
    }
    return prev;
}
\`\`\``,
            options: [
                "current->next = next; 应该改为 current->next = prev;",
                "ListNode* next = current->next; 应该改为 ListNode* next = prev->next;",
                "current != nullptr 应该改为 current->next != nullptr",
                "ListNode* prev = nullptr; 应该改为 ListNode* prev = head;",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

**推导过程：**

反转单链表的核心是逐个把结点的 \`next\` 指针指向前驱：循环中先用 \`next\` 保存后继，再修改指针方向（\`current->next = prev\`），最后 \`prev = current; current = next;\` 前移。原代码 \`current->next = next;\` 只是把结点又指向自己的后继，指针方向从未反转，循环结束后返回的 prev 只有最后一个结点。

- **A** 正确：把 \`current->next = next;\` 改为 \`current->next = prev;\`，才真正完成指针反转。
- **B** 错误：\`next\` 必须在修改 \`current->next\` 之前取其后继，若取 \`prev->next\` 会破坏已反转的部分，遍历无法继续。
- **C** 错误：\`current != nullptr\` 保证最后一个结点也被处理，改为 \`current->next != nullptr\` 会漏掉尾结点（且对空指针解引用有风险）。
- **D** 错误：\`prev\` 初始化为 \`nullptr\` 是为了让原头结点反转后 \`next\` 置空，若初始化为 \`head\` 会在链表头形成环。

g++ 编译运行修改后代码，输入 1→2→3，输出 \`3 2 1\`，反转成功。

**考点：** 链表、指针`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `哈夫曼树是一种二叉树。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
哈夫曼树确实是一种二叉树：它是通过反复合并权值最小的两棵树构造出来的**带权路径长度（WPL）最小的二叉树**，又称最优二叉树。

每个节点的度数要么是 0（叶子，对应字符）要么是 2（内部节点）——哈夫曼树中不存在度为 1 的节点，这正是「严格二叉树」的特征。

**易错点：** 哈夫曼树是二叉树的一种特例，但反过来「二叉树都是哈夫曼树」不成立。

**考点：** 哈夫曼树的定义
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 17,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `在动态规划中，状态转移方程的作用是定义状态之间的关系。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
状态转移方程是动态规划的核心：它定义了**状态之间的关系**——如何由已知子问题的最优值推出当前状态的最优值。

例如爬台阶：\`dp[i] = dp[i-1] + dp[i-2]\`，描述了第 i 阶的答案与第 i-1、i-2 阶答案的关系。没有状态转移方程，DP 就退化为无结构的枚举。

**易错点：** 「定义状态」和「定义状态之间的关系（转移）」是两步：先明确 dp[i] 表示什么，再写转移方程。题目说的是后者，表述正确。

**考点：** 动态规划的状态转移方程
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 18,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `继承是将已有类的属性和方法引入新类的过程。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
继承（inheritance）的定义正是如此：新类（派生类/子类）**引入已有类（基类/父类）的属性和方法**，并可在其上扩展或重写。

\`\`\`cpp
class Animal {              // 已有类
public:
    void eat() { cout << "eating"; }
};
class Dog : public Animal { // 继承 Animal
public:
    void bark() { cout << "woof"; }
};
\`\`\`

Dog 自动拥有 eat()，实现代码复用，体现 is-a 关系。

**易错点：** 派生类不能直接访问基类的 private 成员（但它们确实被继承了下来，只是访问受限）——继承「引入」不等于「全部可见」。

**考点：** 继承的概念
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `完全二叉树的任意一层都可以不满。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

完全二叉树的定义要求：**除最后一层外，其余各层都必须排满**（第 k 层恰有 2^(k-1) 个结点），并且最后一层的结点必须**从左到右连续排列**、中间不能留空。

因此「任意一层都可以不满」的说法不成立：只有最后一层允许不满，前面所有层一旦缺结点就不再是完全二叉树，而是退化为一般的二叉树（甚至不是完全二叉树）。

**反例：** 一棵高度为 3 的二叉树，若第 2 层只有 3 个结点（应为 4 个），即使第 3 层排得再满，它也不是完全二叉树。

**易错提醒：** 把「完全二叉树」与「满二叉树」混淆——满二叉树要求每一层都满；完全二叉树只要求「除最后一层外都满，最后一层靠左连续」。

**考点：** 树与二叉树、完全二叉树的定义与层次性质。`,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `删除单向链表中的节点，只需知道待删除节点的地址即可，无需访问前一个节点。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

单向链表的每个结点只保存**后继指针** \`next\`，删除结点 \`p\` 的标准做法是把 \`p\` 的**前驱**的 \`next\` 改为 \`p->next\`，再把 \`p\` 释放。没有前驱指针，就无法把前驱与后继接上，链会断开，因此**必须能访问前一个结点**（一般从表头顺次找到，代价 O(n)）。

**常见误解：** 有一种「已知待删结点即可删除」的技巧——把后继结点的数据复制到 \`p\`，然后删除 \`p\` 的后继。但它并非真正删除 \`p\`（\`p\` 的地址仍在使用，只是内容被覆盖），且 \`p\` 是**尾结点**时无后继可用而失效；对有外部引用的结点还会造成悬空引用。因此该技巧不能支持题干「只需知道地址即可、无需前驱」的一般性结论。

**易错提醒：** 双向链表才有 \`prev\` 指针，可 O(1) 删除；单向链表删除的关键瓶颈正是「找前驱」。

**考点：** 链表、单链表删除操作与前驱依赖。`,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 21,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `在宽度优先搜索中，通常使用队列来辅助实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
宽度优先搜索（BFS）确实通常用**队列**辅助实现：队列的先进先出保证「先发现的节点先被访问」，从而实现逐层扩展。

典型框架：起始点入队 → 出队访问 → 未访问的邻居依次入队 → 循环至队空。

对比：**深度优先搜索（DFS）**通常用**栈**（或递归隐式栈）实现。

**易错点：** 「通常」二字严谨——BFS 的本质是按层扩展，换数据结构（如双端队列）也能实现变体，但标准实现就是队列；反之 BFS 用栈就变成了 DFS。

**考点：** BFS 与队列的对应关系
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `哈夫曼编码的主要应用领域是有损数据压缩。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

哈夫曼编码是一种**前缀码**，它依据字符出现频率构造最优二叉树，把高频字符映射为短码、低频字符映射为长码，再把这些变长码逐位拼接。编码后的比特流可以通过同一棵哈夫曼树**逐位精确还原**出原始字符序列，解码过程没有任何信息丢失，因此属于**无损数据压缩**。

「有损压缩」指解码后无法完全还原原数据（如 JPEG 的量化、MP3 的感知编码），与哈夫曼编码的性质不符。

**易错提醒：** JPEG 等有损格式内部也会用哈夫曼编码对量化后的系数做熵编码，但这只说明哈夫曼被有损流程「借用」，它本身仍是无损的熵编码环节。

**考点：** 哈夫曼编码、前缀码、无损压缩与有损压缩的区别。`,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 23,
            type: "judge",
            sourceIntegrity: "missing-formula",
            integrityNote: "原卷此题的公式或数值在文本提取时丢失，题干留下空档，仅凭当前内容无法作答。本题已排除出计分与考点练习，待补齐原卷公式后恢复。",
            question: `二叉搜索树的查找操作的时间复杂度是 O(log n)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：×**

**解析：**
说法**不严谨**，官方判定为错。

二叉搜索树的查找效率取决于**树的形态**：
- 树**平衡**时，每次比较排除一半节点，查找为 O(log n)；
- 但普通 BST **不保证平衡**：按有序序列插入会退化成一条链表（每个节点只有单侧孩子），此时查找为 **O(n)**。

因此「BST 的查找复杂度是 O(log n)」的说法以偏概全——只有**平衡二叉搜索树**（如 AVL、红黑树）才能保证 O(log n)。

**易错点：** 平均情况下 BST 查找接近 O(log n)，但复杂度分析以**最坏情况**为准；题目缺少「平衡」前提，故为错。

**考点：** 二叉搜索树的查找复杂度
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 24,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `栈的基本操作包括入栈（ push ）和出栈（ pop ）。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
栈的两个基本操作正是：
- **入栈（push）**：把元素压入栈顶；
- **出栈（pop）**：把栈顶元素弹出。

此外还常有取栈顶（top）而不弹出、判空（empty）、取大小（size）等辅助操作，但 push/pop 是定义栈行为的核心。

**易错点：** pop 在标准库中通常只弹出**不返回**元素值（如 std::stack），取值要用 top()——但作为概念表述「入栈和出栈是基本操作」完全正确。

**考点：** 栈的基本操作
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `使用哈夫曼编码对一些字符进行编码，如果两个字符的频率差异最大，则它们的编码可能出现相同的前缀。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

哈夫曼编码是**前缀码**：任一字符的编码都**不是**另一字符编码的前缀。这一性质由构造方式保证——哈夫曼树是一棵二叉树，每个字符对应一个**叶子**，编码就是根到该叶子的路径（左 0 右 1）。两个不同字符的编码若一个为另一个的前缀，就意味着对应叶结点出现在同一条根到叶的路径上，即一个是另一个的祖先，这与「两者都是叶子」矛盾。

因此无论两个字符的频率差异有多大，它们的编码都**不可能**出现相同的前缀（即互不为前缀）。

**易错提醒：** 「相同的前缀」不等于「某些位恰好相同」——例如 \`0\` 与 \`10\` 的首位就不是前缀关系；前缀码禁止的是「一个编码完整地是另一个编码的开头」。

**考点：** 哈夫曼树与前缀码性质。`,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        ...programmingQuestions
    ]
};
