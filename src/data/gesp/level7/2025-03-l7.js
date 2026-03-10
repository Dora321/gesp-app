// 2025年3月 GESP C++ 七级真题

const programmingQuestions = [
    {
        "id": 26,
        "type": "programming",
        "title": "图上移动",
        "problemNumber": "2025-03-l7-Q26",
        "description": "给定一张包含 n 个节点、m 条边的无向图，节点编号为 1..n。小 A 会任选一个节点作为起点，每一步都必须沿一条边移动到当前节点的相邻节点。对每个起点 i，以及每个步数 t=1..k，你需要求出：从节点 i 出发恰好移动 t 步后，可能停留在哪些节点上；题目只要求输出这些节点的数量。",
        "inputDescription": "第一行三个正整数 n、m、k，分别表示节点数、边数和最多移动的步数。接下来 m 行，每行两个正整数 u、v，表示一条连接 u 与 v 的无向边。",
        "outputDescription": "输出 n 行。第 i 行输出 k 个整数，其中第 t 个整数表示从节点 i 出发恰好走 t 步后可能到达的节点数量。",
        "samples": [
            {
                "input": "4 4 3\n1 2\n1 3\n2 3\n3 4",
                "output": "2 4 4\n2 4 4\n3 3 4\n1 3 3"
            }
        ],
        "explanation": "把“走若干步后可能到达的点集”直接做状态转移。设 reach[t][s] 为从起点 s 出发恰好走 t 步后可能到达的点集（用 bitset 维护），初始 reach[0][s]={s}。若已知 reach[t-1][s]，则对其中每个节点 y，把 y 的邻接点集合并起来，就得到 reach[t][s]。最后统计 bitset 中 1 的个数即可。由于 n 规模不大，bitset 按位并能明显加快转移。",
        "tags": [
            "编程题",
            "图论",
            "动态规划",
            "bitset"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m, k;\n    cin >> n >> m >> k;\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nconst int MAXN = 505;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m, k;\n    cin >> n >> m >> k;\n\n    vector<bitset<MAXN>> adj(n + 1);\n    for (int i = 0; i < m; ++i) {\n        int u, v;\n        cin >> u >> v;\n        adj[u].set(v);\n        adj[v].set(u);\n    }\n\n    vector<vector<bitset<MAXN>>> reach(k + 1, vector<bitset<MAXN>>(n + 1));\n    for (int s = 1; s <= n; ++s) reach[0][s].set(s);\n\n    for (int step = 1; step <= k; ++step) {\n        for (int s = 1; s <= n; ++s) {\n            bitset<MAXN> cur;\n            for (int y = 1; y <= n; ++y) {\n                if (reach[step - 1][s].test(y)) cur |= adj[y];\n            }\n            reach[step][s] = cur;\n        }\n    }\n\n    for (int s = 1; s <= n; ++s) {\n        for (int step = 1; step <= k; ++step) {\n            cout << reach[step][s].count() << (step == k ? '\n' : ' ');\n        }\n    }\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "等价消除",
        "problemNumber": "2025-03-l7-Q27",
        "description": "给定一个仅由小写英文字母组成的字符串 s。若一个字符串能够通过反复删除其中两个相同字符，最终变成空串，则称它可以被等价消除。请统计 s 的所有子串中，有多少个子串是可以被等价消除的。",
        "inputDescription": "第一行一个正整数 n，表示字符串长度。第二行一个长度为 n、只包含小写英文字母的字符串 s。",
        "outputDescription": "输出一个整数，表示满足条件的子串数量。",
        "samples": [
            {
                "input": "7\naaaaabb",
                "output": "9"
            },
            {
                "input": "9\nbabacabab",
                "output": "21"
            }
        ],
        "explanation": "一个字符串能被成对删除为空，当且仅当其中每种字符出现次数都是偶数。于是只要比较前缀奇偶状态：设 mask[i] 表示前 i 个字符中每个字母出现次数的奇偶性，那么子串 s[l..r] 可消除等价于 mask[r]=mask[l-1]。遍历前缀时用哈希表统计每种 mask 已出现的次数，当前前缀就能与之前所有相同 mask 的前缀配对产生答案。",
        "tags": [
            "编程题",
            "前缀异或",
            "哈希表",
            "字符串"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    string s;\n    cin >> n >> s;\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    string s;\n    cin >> n >> s;\n\n    unordered_map<int, long long> cnt;\n    cnt.reserve(n * 2 + 10);\n    cnt.max_load_factor(0.7f);\n\n    long long ans = 0;\n    int mask = 0;\n    cnt[0] = 1;\n    for (char ch : s) {\n        mask ^= 1 << (ch - 'a');\n        ans += cnt[mask];\n        cnt[mask]++;\n    }\n\n    cout << ans << '\n';\n    return 0;\n}"
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
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: "下列哪个选项是 C++ 中的关键字？",
            options: [
                "function",
                "class",
                "method",
                "object",
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
            question: "下面代码输出的是（）",
            options: [
                "1",
                "2",
                "5",
                "10",
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
            id: 3,
            type: "single",
            question: "以下代码的输出是什么？",
            options: [
                "10",
                "20",
                "地址值",
                "编译错误",
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
            question: "下面代码输出的是（）",
            options: [
                "1",
                "2",
                "3",
                "4",
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
            id: 5,
            type: "single",
            question: "下列关于排序的说法，正确的是 ( ) 。",
            options: [
                "选择排序是最快的排序算法之一。",
                "归并排序通常是稳定的。",
                "最差情况， 个元素做快速排序的时间复杂度为 。",
                "最好情况， 个元素做插入排序的时间复杂度为 。",
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
            id: 6,
            type: "single",
            question: "下面关于 C++ 类构造和析构函数的说法，错误的是（ ）。",
            options: [
                "构造函数不能声明为虚函数。",
                "析构函数必须声明为虚函数。",
                "类的默认构造函数可以被声明为 private 。",
                "类的析构函数可以被声明为 private 。",
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
            id: 7,
            type: "single",
            question: "下列关于树和图的说法，错误的是（ ）。",
            options: [
                "树是一种有向无环图，但有向无环图不都是一棵树。",
                "如果把树看做有向图，每个节点指向其子节点，则该图是强连通图。",
                "个顶点且连通的无向图，其最小生成树一定包含 个条边。",
                "个顶点、 条边的有向图，一定不是强连通的。",
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
            question: "是个神奇的数字，因为它是由两个数和拼接而成，而且满足特定条件。小杨决定写个程序找找小于 N 的正整数中共有多少这样神奇的数字。下面程序横线处应填入的是（ ）。",
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
            question: "给定一个无向图，图的节点编号从 0 到 n-1，图的边以邻接表的形式给出。下面程序使用深度优先搜索（DFS）遍历该图，并输出遍历的节点顺序。横线处应该填入的是（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
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
            id: 10,
            type: "single",
            question: "给定一个整数数组 nums，找到其中最长的严格上升子序列的长度。子序列是指从原数组中删除一些元素（或不删除）后，剩余元素保持原有顺序的序列。下面的程序横线处应该填入的是（ ）。",
            options: [
                "dp[i] = max(dp[i], dp[j]);",
                "dp[i] = max(dp[i+1], dp[j] + 1);",
                "dp[i] = max(dp[i], dp[j] - 1);",
                "dp[i] = max(dp[i], dp[j] + 1);",
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
            question: "给定一个整数数组 nums，找到其中最长的严格上升子序列的长度。子序列是指从原数组中删除一些元素（或不删除）后，剩余元素保持原有顺序的序列。该程序的时间复杂度为（ ）。",
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
            id: 12,
            type: "single",
            question: "给定两个无向图 G1 和 G2，判断它们是否同构。图的同构是指两个图的节点可以通过某种重新编号的方式完全匹配，且边的连接关系一致。为了简化问题，假设图的节点编号从 0 到 n-1，并且图的边以邻接表形式给出。下面程序中横线处应该填入的是（ ）。",
            options: [
                "hash += to_string(neighbor);",
                "hash += to_string(neighbors);",
                "hash += to_string(neighbor) + \",\";",
                "hash -= to_string(neighbors);",
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
            question: "给定一个 m×n 的二维网格 grid，每个格子中有一个非负整数。请找出一条从左上角 (0, 0) 到右下角 (m-1, n-1) 的路径，使得路径上的数字总和最小。每次只能向右或向下移动。横线处应该填入的是（ ）。",
            options: [
                "dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][1];",
                "dp[i][j] = min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];",
                "dp[i][j] = min(dp[i - 1][j], dp[i][j]) + grid[i][j];",
                "dp[i][j] = min(dp[i][j], dp[i][j - 1]) + grid[i][j];",
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
            id: 14,
            type: "single",
            question: "给定一个整数数组 nums，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。下面横线处应该填入的是（ ）。",
            options: [
                "dp[i] = max(nums[i+1], dp[i - 1] + nums[i]);",
                "dp[i] = max(nums[i], dp[i - 1] + nums[i]);",
                "dp[i] = max(nums[i], dp[i + 1] + nums[i]);",
                "dp[i] = max(nums[i], dp[i - 1] + nums[i+1]);",
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
            id: 15,
            type: "single",
            question: "在哈希表的实现中，冲突解决是一个重要的问题。以下哪种方法 不是 常见的哈希表冲突解决策略？",
            options: [
                "链地址法（ Chaining ）",
                "开放地址法（ Open Addressing ）",
                "二次哈希法（ Double Hashing ）",
                "二分查找法（ Binary Search ）",
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
            id: 16,
            type: "judge",
            question: "在 C++ 语法中，表达式1e6、1000000和10^6的值是相同的。",
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
            question: "在 C++ 语⾔中，函数调用前必须有函数声明或定义。",
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
            id: 18,
            type: "judge",
            question: "快速排序一般是不稳定的。",
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
            question: "long long类型能表达的数都能使用double类型精确表达。",
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
            question: "使用math.h或cmath头文件中的函数，表达式cos(60)的结果类型为double、值约为0.5。",
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
            question: "一颗 层的满二叉树，一定有 个结点。",
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
            question: "邻接表和邻接矩阵都是图的存储形式。为了操作时间复杂度考虑，同一个图可以同时维护两种存储形式。 maxSum = max(maxSum, dp[i]); } return maxSum; } int main() { int n; cin >> n; vector<int> nums(n); for (int i = 0; i < n; i++) { cin >> nums[i]; } int result = maxSubArray(nums); cout << result << endl; return 0; } 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35",
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
            question: "子类对象包含⽗类的所有成员（包括私有成员）。从⽗类继承的私有成员也是子类的成员，因此子类可以直 接访问。",
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
            question: "动态规划算法通常有递归实现和递推实现。但由于递归调用在运⾏时会由于层数过多导致程序崩溃，有些动 态规划算法只能用递推实现。",
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
            question: "按照下面的规则生成一棵二叉树：以一个⼈为根节点，其⽗亲为左子节点，母亲为右子节点。对其⽗亲、 母亲分别用同样规则生成左子树和右子树。以此类推，记录 30 代的直系家谱，则这是一棵满二叉树。",
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
        }
    ]
};
