// 2025年9月 GESP C++ 六级真题

const programmingQuestions = [
    {
        "id": 26,
        "type": "programming",
        "title": "划分字符串",
        "problemNumber": "2025-09-21-06-C-01",
        "description": "给定字符串 s 和每种长度的价值 a_i。将 s 划分为若干子串，要求每个子串内任一字母至多出现一次，最大化总价值。",
        "inputDescription": "第一行 n。第二行字符串 s。第三行 n 个整数 a_i。",
        "outputDescription": "输出最大总价值。",
        "samples": [
            {
                "input": "8\nblossoms\n1 1 2 3 5 8 13 21",
                "output": "8"
            }
        ],
        "explanation": "前缀 DP。令 dp[i] 为前 i 个字符的最大价值，倒着枚举最后一段 [j,i]，只要这段里没有重复字母，就可用 dp[j-1]+a_{i-j+1} 更新。遇到重复字母便可停止继续向左扩展。",
        "tags": [
            "编程题",
            "动态规划",
            "字符串"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    string s;\n    cin >> s;\n    vector<long long> a(n + 1), dp(n + 1, LLONG_MIN / 4);\n    for (int i = 1; i <= n; ++i) cin >> a[i];\n    dp[0] = 0;\n\n    for (int i = 1; i <= n; ++i) {\n        array<int, 256> vis{};\n        for (int j = i; j >= 1; --j) {\n            unsigned char ch = (unsigned char)s[j - 1];\n            if (vis[ch]) break;\n            vis[ch] = 1;\n            dp[i] = max(dp[i], dp[j - 1] + a[i - j + 1]);\n        }\n    }\n\n    cout << dp[n] << '\\n';\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "货物运输",
        "problemNumber": "2025-09-21-06-C-02",
        "description": "给定一棵以 1 为首都的带权树，车队从首都出发必须经过所有城市，允许重复经过，结束时不必回到首都。求最小总路程。",
        "inputDescription": "第一行 n。接下来 n-1 行每行 u,v,w。",
        "outputDescription": "输出最小总路程。",
        "samples": [
            {
                "input": "4\n1 2 6\n1 3 1\n3 4 5",
                "output": "13"
            }
        ],
        "explanation": "若最后仍回到首都，则每条边都要走两次，总路程为 2×边权和。题目允许停在任意城市收工，因此只需把“首都到终点”这条路径上的回程省掉，最优就是减去从首都出发的最长距离。",
        "tags": [
            "编程题",
            "树",
            "DFS"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<vector<pair<int, long long>>> g(n + 1);\n    long long sum = 0;\n    for (int i = 0; i < n - 1; ++i) {\n        int u, v;\n        long long w;\n        cin >> u >> v >> w;\n        g[u].push_back({v, w});\n        g[v].push_back({u, w});\n        sum += w;\n    }\n\n    long long mx = 0;\n    function<void(int,int,long long)> dfs = [&](int u, int p, long long dist) {\n        mx = max(mx, dist);\n        for (auto [v, w] : g[u]) {\n            if (v == p) continue;\n            dfs(v, u, dist + w);\n        }\n    };\n    dfs(1, 0, 0);\n    cout << 2 * sum - mx << '\\n';\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2025-09-l6',
    title: '2025年9月 GESP C++ 六级真题',
    level: 6,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    questions: [
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: "下列关于类的说法，错误的是( )。",
            options: [
                "构造函数不能声明为虚函数，但析构函数可以。",
                "函数参数如声明为类的引用类型，调用时不会调用该类的复制构造函数。",
                "静态方法属于类而不是某个具体对象，因此推荐用类名::方法(...)调用。",
                "不管基类的析构函数是否是虚函数，都可以通过基类指针/引用正确删除派生类对象。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "假设变量 veh 是类 Car 的一个实例，我们可以调用 veh.move() ，是因为面向对象编程有（ ）性质。",
            options: [
                "继承 (Inheritance)",
                "封装 (Encapsulation)",
                "多态 (Polymorphism)",
                "链接 (Linking)",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下面代码中v1和v2调用了相同接⼝ move()，但输出结果不同，这体现了面向对象编程的（ ）特性。",
            options: [
                "继承 (Inheritance)",
                "封装 (Encapsulation)",
                "多态 (Polymorphism)",
                "链接 (Linking)",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "栈的操作特点是（ ）。",
            options: [
                "先进先出",
                "先进后出",
                "随机访问",
                "双端进出",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "循环队列常用于实现数据缓冲。假设一个循环队列容量为 5（即最多存放 4 个元素，留一个位置区分空与 满），依次进⾏操作：入队数据 1 ， 2 ， 3 ，出队 1 个数据，再入队数据 4 和 5 ，此时队⾸到队尾的元素顺序是（ ）。",
            options: [
                "[2, 3, 4, 5]",
                "[1, 2, 3, 4]",
                "[3, 4, 5, 2]",
                "[2, 3, 5, 4]",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "以下函数createTree()构造的树是什么类型？",
            options: [
                "满二叉树",
                "完全二叉树",
                "二叉排序树",
                "其他都不对",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "已知二叉树的 中序遍历 是 [D, B, E, A, F, C] ，先序遍历 是 [A, B, D, E, C, F] 。请问该二叉树的后序遍历结果 是（ ）。",
            options: [
                "[D, E, B, F, C, A]",
                "[D, B, E, F, C, A]",
                "[D, E, B, C, F, A]",
                "[B, D, E, F, C, A]",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "完全二叉树可以用数组连续高效存储，如果节点从1开始编号，则对有两个孩子节点的节点i，（ ）。",
            options: [
                "左孩子位于2i，右孩子位于2i+1",
                "完全二叉树的叶子节点可以出现在最后一层的任意位置",
                "所有节点都有两个孩子",
                "左孩子位于 2i，右孩子位于 2i+1",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "设有字符集 {a, b, c, d, e, f} ，其出现频率分别为 {5, 9, 12, 13, 16, 45} 。哈夫曼算法构造最优 前缀编码，以下哪一组可能是对应的哈夫曼编码？（非叶子节点左边分支记作 0，右边分支记作 1，左右互换不影响 正确性）。",
            options: [
                "a: 00；b: 01；c: 10；d: 110；e: 111；f: 0",
                "a: 1100；b: 1101；c: 100；d: 101；e: 111；f: 0",
                "a: 000；b: 001；c: 01；d: 10；e: 110；f: 111",
                "a: 10；b: 01；c: 100；d: 101；e: 111；f: 0",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面代码生成格雷编码，则横线上应填写（ ）。",
            options: [
                "int i = 0; i < prev.size(); i++",
                "int i = prev.size()-1; i >= 0; i--",
                "auto s : prev",
                "int i = prev.size()/2; i < prev.size(); i++",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "请将下列树的深度优先遍历代码补充完整，横线处应填入（ ）。",
            options: [
                "vector",
                "list",
                "queue",
                "stack",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "令 是树的节点数目，下列代码实现了树的⼴度优先遍历，其时间复杂度是（ ）。",
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
                "GESP6级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "在二叉排序树（Binary Search Tree, BST）中查找元素 50 ，从根节点开始：若根值为 60 ，则下一步应去 搜索：",
            options: [
                "左子树",
                "右子树",
                "随机",
                "根节点",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "删除二叉排序树中的节点时，如果节点有两个孩子，则横线处应填入（ ），其中 findMax 和 findMin 分 别为寻找树的最大值和最小值的函数。",
            options: [
                "root->left",
                "root->right",
                "findMin(root->right)",
                "findMax(root->left)",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "给定 个物品和一个最大承重为 的背包，每个物品有一个重量 和价值 ，每个物品只能选择放或 不放。目标是选择若⼲个物品放入背包，使得总价值最大，且总重量不超过 ，则横线上应填写（ ）。",
            options: [
                "dp[w] = max(dp[w], dp[w] + val[i]);",
                "dp[w] = dp[w - wt[i]] + val[i];",
                "dp[w] = max(dp[w - 1], dp[w - wt[i]] + val[i]);",
                "dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "当基类可能被多态使用，其析构函数应该声明为虚函数。",
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
                "GESP6级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "哈夫曼编码是最优前缀码，且编码结果唯一。",
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
                "GESP6级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "一个含有 个节点的完全二叉树，高度为 。",
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
                "GESP6级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "在 C++ STL 中，栈（ std::stack ）的 pop 操作返回栈顶元素并移除它。",
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
                "GESP6级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "循环队列通过模运算循环使用空间。",
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
                "GESP6级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "一棵有 个节点的二叉树一定有 条边。",
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
                "GESP6级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "以下代码实现了二叉树的中序遍历。输入以下二叉树，中序遍历结果是 4 2 5 1 3 6。",
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
                "GESP6级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "下面代码实现的二叉排序树的查找操作时间复杂度是 ，其中 为树高。",
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
                "GESP6级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "下面代码实现了动态规划版本的斐波那契数列计算，其时间复杂度是 。",
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
                "GESP6级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "有一排香蕉，每个香蕉有不同的甜度值。小猴子想吃香蕉，但不能吃相邻的香蕉。以下代码能找到小猴子吃到最甜的香蕉组合。", 
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
                "GESP6级",
            ]
        }
    ]
};
