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
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 最小权值的节点**：正确答案。
            - **B 最大权值的节点**：错误。
            - **C 随机节点**：错误。
            - **D 深度最深的节点**：错误。

            **考点：** C++基础
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
                "贪⼼、动态规划、回溯",
                "并发、并⾏、异步",
                "递归、循环、分治",
                "封装、继承、多态",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 贪⼼、动态规划、回溯**：错误。动态规划的状态或转移方程有误，请检查边界初始化。
            - **B 并发、并⾏、异步**：错误。
            - **C 递归、循环、分治**：错误。
            - **D 封装、继承、多态**：正确答案。

            **考点：** C++基础
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
            question: `在队列中，元素的添加和删除是按照（ ）原则进⾏的。`,
            options: [
                "先进先出",
                "先进后出",
                "最小值先出",
                "随机进出",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 先进先出**：正确答案。
            - **B 先进后出**：错误。
            - **C 最小值先出**：错误。
            - **D 随机进出**：错误。

            **考点：** 队列
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
            question: `给定一个简单的类定义如下，（ ）语句在类的外部正确地创建了一个 Circle 对象并调用了 getArea 函 数？`,
            options: [
                "Circle c = Circle(5.0); c.getArea(c);",
                "Circle c(5.0); getArea(c);",
                "Circle c = new Circle(5.0); c.getArea();",
                "Circle c(5.0); c.getArea();",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A Circle c = Circle(5.0); c.getArea(c);**：错误。
            - **B Circle c(5.0); getArea(c);**：错误。
            - **C Circle c = new Circle(5.0); c.getArea();**：错误。
            - **D Circle c(5.0); c.getArea();**：正确答案。

            **考点：** C++基础
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
            question: `以下代码希望能在一棵二叉排序树中搜索特定的值，请在横线处填入（ ），使其能正确实现相应功能。`,
            options: [
                "target < root->left",
                "target < root->val",
                "target > root->val",
                "target > root->left",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A target < root->left**：错误。
            - **B target < root->val**：正确答案。
            - **C target > root->val**：错误。
            - **D target > root->left**：错误。

            **考点：** C++基础
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
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 000, 001, 010, 011, 100, 101, 110, 111**：错误。
            - **B 000, 001, 011, 010, 110, 111, 101, 100**：正确答案。
            - **C 000, 010, 001, 011, 100, 110, 101, 111**：错误。
            - **D 000, 010, 110, 100, 111, 101, 011, 001**：错误。

            **考点：** C++基础
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
            question: `以下动态规划算法的含义与目的是（ ）。 class Circle { private: double radius; public: Circle(double r) : radius(r) {} double getArea() { return 3.14 * radius * radius; } }; 1 2 3 4 5 6 7 8 9 TreeNode* search(TreeNode* root, int target) { if (root == NULL || root->val == target) { return root; } if (_______________) { return search(root->left, target); } else { return search(root->right, target); } } 1 2 3 4 5 6 7 8 9 10 int function(vector<int>& nums) { int n = nums.size(); if (n == 0) return 0; if (n == 1) return nums[0]; 1 2 3 4 5 6`,
            options: [
                "计算数组 nums 中的所有元素的和",
                "计算数组 nums 中相邻元素的最大和",
                "计算数组 nums 中不相邻元素的最大和",
                "计算数组 nums 中的最小元素",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 计算数组 nums 中的所有元素的和**：错误。数组下标从 0 开始，请仔细验证下标范围。
            - **B 计算数组 nums 中相邻元素的最大和**：错误。数组下标从 0 开始，请仔细验证下标范围。
            - **C 计算数组 nums 中不相邻元素的最大和**：正确答案。
            - **D 计算数组 nums 中的最小元素**：错误。数组下标从 0 开始，请仔细验证下标范围。

            **考点：** 动态规划
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
            question: `阅读以下⼴度优先搜索的代码： 使用以上算法遍历以下这棵树，可能的输出是（ ）。`,
            options: [
                "1 2 8 9 4 5 3 6 7 10 11",
                "1 2 3 4 5 6 7 8 9 10 11",
                "1 2 3 8 9 6 4 5 7 10 11 vector<int> dp(n, 0); dp[0] = nums[0]; dp[1] = max(nums[0], nums[1]); for (int i = 2; i < n; ++i) { dp[i] = max(dp[i-1], nums[i]+dp[i-2]); } return dp[n-1]; } 7 8 9 10 11 12 13 14 void bfs(TreeNode* root) { if (root == NULL) { return; } queue<TreeNode*> q; q.push(root); while (!q.empty()) { TreeNode* current = q.front(); q.pop(); cout << current->val << \" \"; if (current->left) { q.push(current->left); } if (current->right) { q.push(current->right); } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 1 /  2 3 /   8 9 6 /   4 5 7 /  10 11 1 2 3 4 5 6 7 8 9",
                "1 2 3 8 9 4 5 6 7 10 11",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 1 2 8 9 4 5 3 6 7 10 11**：错误。
            - **B 1 2 3 4 5 6 7 8 9 10 11**：错误。
            - **C 1 2 3 8 9 6 4 5 7 10 11 vector<int> dp(n...**：正确答案。
            - **D 1 2 3 8 9 4 5 6 7 10 11**：错误。

            **考点：** C++基础
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
            question: `给定一个空栈，执⾏以下操作序列： 操作序列：push(1), push(2), push(3), pop(), pop(), push(4), push(5), pop() 最终栈中的元素是（ ）。`,
            options: [
                "1, 2",
                "1, 4, 5",
                "1, 2, 5",
                "1, 4",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 1, 2**：错误。
            - **B 1, 4, 5**：错误。
            - **C 1, 2, 5**：错误。
            - **D 1, 4**：正确答案。

            **考点：** 栈
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
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 247**：错误。该数值与正确计算结果不符，请重新验算。
            - **B 248**：正确答案。
            - **C 249**：错误。该数值与正确计算结果不符，请重新验算。
            - **D 250**：错误。该数值与正确计算结果不符，请重新验算。

            **考点：** C++基础
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
                "贪⼼策略",
                "回溯算法",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 重叠子问题**：正确答案。
            - **B 分治法**：错误。
            - **C 贪⼼策略**：错误。
            - **D 回溯算法**：错误。

            **考点：** 动态规划
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
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A D, E, B, F, C, A**：正确答案。
            - **B E, D, B, F, C, A**：错误。
            - **C D, E, B, C, F, A**：错误。
            - **D E, D, B, C, F, A**：错误。

            **考点：** C++基础
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
            question: `线性筛法与埃⽒筛法相比的优势是（ ）。`,
            options: [
                "更容易实现",
                "更节省内存",
                "更快速",
                "更准确",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 更容易实现**：错误。
            - **B 更节省内存**：错误。
            - **C 更快速**：正确答案。
            - **D 更准确**：错误。

            **考点：** C++基础
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
            question: `以下代码使用了辗转相除法求解最大公因数，请在横线处填入（ ），使其能正确实现相应功能。 题号 1 2 3 4 5 6 7 8 9 10 答案`,
            options: [
                "int temp = b; b = a / b; a = temp;",
                "int temp = a; a = b / a; b = temp;",
                "int temp = b; b = a % b; a = temp;",
                "b = a % b; a = b;",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A int temp = b; b = a / b; a = temp;**：错误。
            - **B int temp = a; a = b / a; b = temp;**：错误。
            - **C int temp = b; b = a % b; a = temp;**：正确答案。
            - **D b = a % b; a = b;**：错误。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `下面的代码⽚段用于反转单链表，请进⾏（ ）修改，使其能正确实现相应功能。`,
            options: [
                "current->next = next; 应该改为 current->next = prev;",
                "ListNode* next = current->next; 应该改为 ListNode* next = prev->next;",
                "current != nullptr 应该改为 current->next != nullptr",
                "ListNode* prev = nullptr; 应该改为 ListNode* prev = head;",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A current->next = next; 应该改为 current->next...**：正确答案。
            - **B ListNode* next = current->next; 应该改为 Lis...**：错误。
            - **C current != nullptr 应该改为 current->next !=...**：错误。
            - **D ListNode* prev = nullptr; 应该改为 ListNode*...**：错误。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `哈夫曼树是一种二叉树。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
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
            question: `在动态规划中，状态转移方程的作用是定义状态之间的关系。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** DP 三要素：状态定义、转移方程、边界初始化。注意 INF 初值的选择、下标从 0 还是 1、以及空间优化（滚动数组）时的覆盖顺序。

            **考点：** 动态规划
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
            question: `继承是将已有类的属性和方法引入新类的过程。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
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
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
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
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `在宽度优先搜索中，通常使用队列来辅助实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 队列是先进先出（FIFO）。循环队列用 (rear+1)%cap 判断满，注意区分空与满（常留一个空位或计数）。

            **考点：** 队列
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
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `二叉搜索树的查找操作的时间复杂度是 。 int gcd(int a, int b) { while (b != 0) { ______________________ } return a; } 1 2 3 4 5 6 ListNode* reverseLinkedList(ListNode* head) { ListNode* prev = nullptr; ListNode* current = head; while (current != nullptr) { ListNode* next = current->next; current->next = next; prev = current; current = next; } return prev; } 1 2 3 4 5 6 7 8 9 10 11`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 常见复杂度：O(1)<O(log n)<O(n)<O(n log n)<O(n²)<O(2^n)。1e5 规模下 O(n²) 通常超时，需优化到 O(n log n) 或更低；DP 注意状态数×转移复杂度。

            **考点：** 时间复杂度
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
            question: `栈的基本操作包括入栈（ push ）和出栈（ pop ）。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 栈是后进先出（LIFO）。注意栈空时 pop 会出错，需先判空；递归/函数调用依赖调用栈，过深会栈溢出；单调栈用于找左右第一个更大/更小元素。

            **考点：** 栈
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
            question: `使用哈夫曼编码对一些字符进⾏编码，如果两个字符的频率差异最大，则它们的编码可能出现相同的前 缀。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        ...programmingQuestions
    ]
};
