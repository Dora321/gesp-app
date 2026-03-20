// 2025年12月 GESP C++ 六级真题

const programmingQuestions = [
    {
        "id": 26,
        "type": "programming",
        "title": "路径覆盖",
        "problemNumber": "2025-12-21-06-C-01",
        "description": "给定一棵有根树，把若干节点染黑，使每条叶子到根的路径上至少有一个黑点。节点 i 染黑代价为 c_i，求最小总代价。",
        "inputDescription": "第一行 n。第二行 $$n-1$$ 个父节点。第三行 n 个代价 c_i。",
        "outputDescription": "输出最小总代价。",
        "samples": [
            {
                "input": "4\n1 2 3\n5 6 2 3",
                "output": "7"
            }
        ],
        "explanation": "树形 DP。设 f[u] 表示覆盖 u 子树内所有叶根路径的最小代价：要么直接把 u 染黑，花 c_u；要么不染 u，而把责任交给所有儿子分别完成，代价为 sum f[v]。叶子必须被染黑，所以叶子答案就是 c_u。",
        "tags": [
            "编程题",
            "树形DP"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<vector<int>> g($n+1$);\n    for (int i = 2; i <= n; ++i) {\n        int p;\n        cin >> p;\n        g[p].push_back(i);\n    }\n    vector<long long> c($n+1$);\n    for (int i = 1; i <= n; ++i) cin >> c[i];\n\n    vector<long long> dp($n+1$, 0);\n    function<void(int)> dfs = [&](int u) {\n        if (g[u].empty()) {\n            dp[u] = c[u];\n            return;\n        }\n        long long sum = 0;\n        for (int v : g[u]) {\n            dfs(v);\n            sum += dp[v];\n        }\n        dp[u] = min(c[u], sum);\n    };\n    dfs(1);\n    cout << dp[1] << '\\n';\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "道具商店",
        "problemNumber": "2025-12-21-06-C-02",
        "description": "有 n 件道具，第 i 件可提升 a_i 点攻击力，花费 c_i 金币，每件最多买一次。给定金币上限 m，求最大攻击力。",
        "inputDescription": "第一行 n,m。接下来 n 行每行两个整数 a_i,c_i。",
        "outputDescription": "输出最大攻击力。",
        "samples": [
            {
                "input": "3 5\n2 2\n3 3\n4 4",
                "output": "5"
            }
        ],
        "explanation": "把“总攻击力”当作背包容量：dp[j] 表示达到总攻击力恰为 j 的最小花费，做一遍 0/1 背包；最后找所有花费不超过 m 的最大 j。这样即使金币上限很大、攻击力总和较小，也能稳定求解。",
        "tags": [
            "编程题",
            "动态规划",
            "0/1背包"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<pair<int,int>> items(n);\n    int sumAtk = 0;\n    for (int i = 0; i < n; ++i) {\n        int a, c;\n        cin >> a >> c;\n        items[i] = {a, c};\n        sumAtk += a;\n    }\n\n    const int INF = 1e9;\n    vector<int> dp(sumAtk + 1, INF);\n    dp[0] = 0;\n    int cur = 0;\n    for (auto [a, c] : items) {\n        cur += a;\n        for (int j = cur; j >= a; --j) {\n            dp[j] = min(dp[j], dp[j - a] + c);\n        }\n    }\n\n    int ans = 0;\n    for (int j = 0; j <= sumAtk; ++j) {\n        if (dp[j] <= m) ans = j;\n    }\n    cout << ans << '\\n';\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2025-12-l6',
    title: '2025年12月 GESP C++ 六级真题',
    level: 6,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "在面向对象编程中，下列关于 虚函数 的描述中，错误的是（ ）。",
            options: [
                "虚函数用于支持运⾏时多态",
                "通过基类指针调用虚函数时，会根据对象实际类型决定调用版本",
                "构造函数可以声明为虚函数以支持多态",
                "基类析构函数常声明为虚函数以避免资源泄漏",
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
            id: 2,
            type: "single",
            question: "执⾏如下代码，会输出 钢琴：叮咚叮咚 和 吉他：咚咚当当。这体现了面向对象编程的（ ）特性。",
            options: [
                "继承",
                "封装",
                "多态",
                "链接",
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
            id: 3,
            type: "single",
            question: "关于以下代码，说法正确的是（ ）。",
            options: [
                "执⾏代码会输出两⾏，内容分别为：钢琴：叮咚叮咚 和 吉他：咚咚当当",
                "执⾏代码会输出两⾏，内容分别为：乐器在演奏声音 和 乐器在演奏声音",
                "代码编译出现错误",
                "代码运⾏出现错误",
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
            question: "某文本编辑器把用户输入的字符依次压入栈 S 。用户依次输入 A, B, C, D 后，用户按了两次撤销（每次 撤销，弹出栈顶一个字符）。此时栈从栈底到栈顶的内容是：（ ）。",
            options: [
                "A B",
                "A B C",
                "A B D",
                "B C",
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
            id: 5,
            type: "single",
            question: "假设循环队列数组长度为 N，其中队空判断条件为：front == rear，队满判断条件为：(rear + 1) % N == front，出队对应的操作为：front = (front + 1) % N，入队对于的操作为：rear = (rear + 1) % N。循环队列长度 N = 6，初始 front = 1, rear = 1，执⾏操作序列为：入队 , 入队 , 入队 , 出队 , 入队 , 入队， 则最终 (front, rear) 的值是（ ）。",
            options: [
                "(2, 5)",
                "(2, 0)",
                "(3, 5)",
                "(3, 0)",
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
            id: 6,
            type: "single",
            question: "以下函数 check() 用于判断一棵二叉树是否为（ ）。",
            options: [
                "满二叉树",
                "完全二叉树",
                "二叉搜索树",
                "平衡二叉树",
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
            question: "以下代码实现了二叉树的（ ）。",
            options: [
                "前序遍历",
                "中序遍历",
                "后序遍历",
                "层序遍历",
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
            id: 8,
            type: "single",
            question: "下面代码实现了哈夫曼编码，则横线处应填写的代码是（ ）。",
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
            id: 9,
            type: "single",
            question: "以下关于哈夫曼编码的说法，正确的是（ ）。",
            options: [
                "哈夫曼编码是定长编码",
                "哈夫曼编码中，没有任何一个字符的编码是另一个字符编码的前缀",
                "哈夫曼编码一定唯一",
                "哈夫曼编码不能用于数据压缩",
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
            question: "以下函数实现了二叉排序树（BST）的（ ）操作。",
            options: [
                "查找",
                "插入",
                "删除",
                "遍历",
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
            question: "下列代码实现了树的深度优先遍历，则横线处应填入（ ）。",
            options: [
                "if (node->left) st.push(node->left);",
                "if (node->left) st.pop(node->left);",
                "if (node->left) st.front(node->left);",
                "if (node->left) st.push(node->right);",
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
            id: 12,
            type: "single",
            question: "给定一棵普通二叉树（节点值没有大小规律），下面代码判断是否存在值为 x 的结点，则横线处应填入（ ）。",
            options: [
                "q.push(cur);",
                "if (cur->right) q.push(cur->right);",
                "选项C",
                "选项D",
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
            id: 13,
            type: "single",
            question: "在二叉排序树（ Binary Search Tree, BST ）中，假设节点值互不相同。给定如下搜索函数，以下说法一定正 确的是（ ）。",
            options: [
                "最坏情况下，访问结点数是 $$$$O(N)$$$$",
                "最坏情况下，访问结点数是 $O(h)$",
                "无论如何，访问结点数都不超过树高的一半",
                "一定比在普通二叉树中搜索快",
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
            id: 14,
            type: "single",
            question: "0/1 背包（每件物品最多选一次）问题通常可用一维动态规划求解，核⼼代码如下。则下面说法正确的是（ ）。",
            options: [
                "内层 j 必须从小到大，否则会漏解",
                "内层 j 必须从大到小，否则同一件物品会被用多次",
                "j 从大到小或从小到大都一样",
                "只要 dp 初始为 0，方向无所谓",
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
            id: 15,
            type: "single",
            question: "以下关于动态规划的说法中，错误的是（ ）。",
            options: [
                "动态规划方法通常能够列出递推公式。",
                "动态规划方法的时间复杂度通常为状态的个数。",
                "动态规划方法有递推和递归两种实现形式。",
                "对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。",
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
            id: 16,
            type: "judge",
            question: "以下代码中，构造函数被调用的次数是 1 次。",
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
            question: "面向对象编程中，封装是指将数据和操作数据的方法绑定在一起，并对外隐藏实现细节。",
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
            question: "以下代码能够正确统计二叉树中叶子结点的数量。",
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
            question: "⼴度优先遍历二叉树可用栈来实现。",
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
            question: "函数调用管理可用栈来管理。",
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
            question: "在二叉排序树（ BST ）中，若某结点的左子树为空，则该结点一定是整棵树中的最小值结点。",
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
            question: "下面的函数能正确判断一棵树是不是二叉排序树（左边的数字要比当前数字小，右边的数字要比当前数字大）。",
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
            question: "格雷编码相邻两个编码之间必须有多位不同，以避免数据传输错误。",
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
        },
        {
            id: 24,
            type: "judge",
            question: "小杨在玩一个闯关游戏，从第 1 关走到第 4 关。每一关的体力消耗如下（下标表⽰关卡编号）：cost = [ 0, 3, 5, 2, 4 ]，其中 cost[i] 表⽰到达第 i 关需要消耗的体力，cost[0]=0 表⽰在开始状态，体力消耗为 0 。小杨每次可以从当前关卡 前进 1 步或 2 步。按照上述规则，从第 1 关到第 4 关所需消耗的最小体力为 7 。",
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
            question: "假定只有一个根节点的树的深度为 1 ，则一棵有 $n$ 个节点的完全二叉树，则树的深度为 $\\lfloor \log_2 n \\rfloor + 1$。",
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
        ...programmingQuestions
    ]
};
