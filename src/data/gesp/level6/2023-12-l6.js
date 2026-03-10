// 2023年12月 GESP C++ 六级真题

const programmingQuestions = [
    {
        "id": 26,
        "type": "programming",
        "title": "闯关游戏",
        "problemNumber": "2023-12-23-06-C-01",
        "description": "共有 n 关，每关有 m 个通道。第 j 个通道可前进 a_j 关，离开第 i 关可获得 b_i 分；若前进后超过第 n 关则通关。求最多得分。",
        "inputDescription": "第一行 n,m。第二行 m 个整数 a_j。第三行 n 个整数 b_i。",
        "outputDescription": "输出最大总分。",
        "samples": [
            {
                "input": "6 2\n2 3\n1 0 30 100 30 30",
                "output": "131"
            },
            {
                "input": "6 2\n2 3\n1 0 30 100 30 -1",
                "output": "101"
            }
        ],
        "explanation": "设 dp[i] 为“站在第 i 关开始闯关时，最终最多能得到多少分”。离开第 i 关一定会拿到 b_i 分，然后任选一个通道跳到 i+a_j（越界则直接通关），故可从后往前线性转移。",
        "tags": [
            "编程题",
            "动态规划"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<int> a(m + 1), b(n + 1);\n    for (int i = 1; i <= m; ++i) cin >> a[i];\n    for (int i = 1; i <= n; ++i) cin >> b[i];\n\n    vector<long long> dp(n + 2, 0);\n    for (int i = n; i >= 1; --i) {\n        long long bestNext = LLONG_MIN;\n        for (int j = 1; j <= m; ++j) {\n            int to = i + a[j];\n            bestNext = max(bestNext, to > n ? 0LL : dp[to]);\n        }\n        dp[i] = b[i] + bestNext;\n    }\n\n    cout << dp[1] << '\\n';\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "工作沟通",
        "problemNumber": "2023-12-23-06-C-02",
        "description": "给定公司管理树。每场合作给出若干员工，主持人必须能管理所有参与者；若有多个可选，取编号最大的。",
        "inputDescription": "第一行 n。第二行 n-1 个整数表示 1..n-1 号员工的直接领导。第三行 q。接下来 q 行每行先给人数 k，再给 k 个员工编号。",
        "outputDescription": "每场合作输出一行主持人编号。",
        "samples": [
            {
                "input": "5\n0 0 2 2\n3\n2 3 4\n3 2 3 4\n2 1 4",
                "output": "2\n2\n0"
            }
        ],
        "explanation": "先把每次合作中的所有参与者求出公共祖先的最深点 lca。所有能管理全部参与者的人，正好是根到 lca 路径上的节点；题目要求编号最大的那个，因此预处理 root→u 路径上的最大编号即可。",
        "tags": [
            "编程题",
            "树",
            "LCA"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<vector<int>> g(n);\n    vector<int> parent(n, -1);\n    parent[0] = 0;\n    for (int i = 1; i < n; ++i) {\n        cin >> parent[i];\n        g[parent[i]].push_back(i);\n    }\n\n    int LOG = 1;\n    while ((1 << LOG) <= n) ++LOG;\n    vector<vector<int>> up(LOG, vector<int>(n, 0));\n    vector<int> depth(n, 0), bestOnPath(n, 0);\n\n    queue<int> q;\n    q.push(0);\n    bestOnPath[0] = 0;\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        up[0][u] = parent[u];\n        for (int k = 1; k < LOG; ++k) up[k][u] = up[k - 1][up[k - 1][u]];\n        for (int v : g[u]) {\n            depth[v] = depth[u] + 1;\n            bestOnPath[v] = max(bestOnPath[u], v);\n            q.push(v);\n        }\n    }\n\n    auto lca = [&](int a, int b) {\n        if (depth[a] < depth[b]) swap(a, b);\n        int diff = depth[a] - depth[b];\n        for (int k = 0; k < LOG; ++k) {\n            if (diff >> k & 1) a = up[k][a];\n        }\n        if (a == b) return a;\n        for (int k = LOG - 1; k >= 0; --k) {\n            if (up[k][a] != up[k][b]) {\n                a = up[k][a];\n                b = up[k][b];\n            }\n        }\n        return up[0][a];\n    };\n\n    int Q;\n    cin >> Q;\n    while (Q--) {\n        int k;\n        cin >> k;\n        int x;\n        cin >> x;\n        int cur = x;\n        for (int i = 1; i < k; ++i) {\n            cin >> x;\n            cur = lca(cur, x);\n        }\n        cout << bestOnPath[cur] << '\\n';\n    }\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2023-12-l6',
    title: '2023年12月 GESP C++ 六级真题',
    level: 6,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "关于 C++ 类和对象的说法，错误的是 ( ) 。",
            options: [
                "在 C++ 中，一切皆对象，即便是字面量如整数 5 等也是对象",
                "在 C++ 中，可以⾃定义新的类，并实例化为新的对象",
                "在 C++ 中，内置函数和⾃定义函数，都是类或者对象",
                "在 C++ 中，可以在⾃定义函数中嵌套定义新的函数",
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
            question: "有关下面 C++ 代码的说法，错误的是 ( ) 。",
            options: [
                "C++ 中类内部可以嵌套定义类",
                "在类中定义的类被称为内部类，定义类的类被称为外部类",
                "内部类可以随便访问，不需要通过外部类来访问",
                "代码中Point被称为内部类，可以通过外部类Rectangle来访问，Rectangle::Point",
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
            question: "有关下面 C++ 代码的说法，正确的是 ( ) 。",
            options: [
                "第 14 ⾏代码错误，第 15 ⾏正确",
                "第 15 ⾏代码错误，第 14 ⾏代码正确",
                "第 14 、 15 两⾏代码都正确",
                "第 6 ⾏代码可修改为objCounter += 1",
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
            question: "有关下面 C++ 代码的说法，错误的是 ( ) 。",
            options: [
                "上列 C++ 代码适用于构造各种二叉树",
                "代码struct BiNode用于构造二叉树的节点",
                "代码BiTree(){root=Creat();}用于构造二叉树",
                "析构函数不可以省略",
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
            id: 5,
            type: "single",
            question: "基于",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
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
            question: "的定义，有关下面 C++ 代码的说法正确的是（ ）。",
            options: [
                "代码中Order( )函数是中序遍历二叉树的方法",
                "代码中Order( )先访问根节点，然后对左子树进⾏前序遍历，再对右子树前序遍历",
                "代码中Order( )先访问中序遍历左子树，然后访问根节点，最后则是中序遍历右子树",
                "代码中Order( )先后序遍历左子树，然后后序遍历右子树，最后访问根节点",
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
            question: "有关下面 C++ 代码的说法正确的是（ ）。",
            options: [
                "上述代码构成单向链表",
                "上述代码构成双向链表",
                "上述代码构成循环链表",
                "上述代码构成指针链表",
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
            id: 8,
            type: "single",
            question: "对 hello world 使用霍夫曼编码（ Huffman Coding ），最少 bit （比特）为（ ）。",
            options: [
                "4",
                "32",
                "64",
                "88",
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
            id: 9,
            type: "single",
            question: "下面的 fiboA() 和 fiboB() 两个函数分别实现斐波那契数列，该数列第 1 、第 2 项值为 1 ，其余各项分别 为前两项之和。下面有关说法错误的是（ ）。",
            options: [
                "fiboA() 采用递归方式实现斐波那契数列",
                "fiboB() 采用动态规划算法实现斐波那契数列",
                "当 N 值较大时，fiboA() 存在大量重复计算",
                "由于 fiboA() 代码较短，其执⾏效率较高",
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
            question: "有关下面 C++ 代码不正确的说法是（ ）。",
            options: [
                "该代码可用于求解二叉树的深度",
                "代码中函数 Depth( ) 的参数 T 表⽰根节点，非根节点不可以作为参数",
                "代码中函数 Depth( ) 采用了递归方法",
                "代码中函数 Depth( ) 可用于求解各种形式的二叉树深度，要求该二叉树节点⾄少有 left 和 right 属 性",
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
            id: 11,
            type: "single",
            question: "下面有关树的存储，错误的是（ ） .",
            options: [
                "完全二叉树可以用 list 存储",
                "一般二叉树都可以用 list 存储，空子树位置可以用 None 表⽰",
                "满二叉树可以用 list 存储",
                "树数据结构，都可以用 list 存储",
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
            question: "构造二叉树 [1,2,3,null,4]（ ）。",
            options: [
                "1(2()(4))(3)",
                "1(2(3)())(4)",
                "(1,2(3),(4))",
                "(1,(2)(3),(4))",
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
            question: "下面有关布尔类型的函数的说法，正确的是（ ）。",
            options: [
                "bool 类型函数只能返回 0 或者 1 两种值",
                "bool 类型函数可以返回任何整数值",
                "bool 类型函数必须有参数传递",
                "bool 类型函数没有返回值",
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
            question: "通讯卫星在通信⽹络系统中主要起到（ ）的作用。",
            options: [
                "信息过滤",
                "信号中继",
                "避免攻击",
                "数据加密",
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
            question: "小杨想编写一个判断任意输入的整数 N 是否为素数的程序，下面哪个方法不合适？（ ）",
            options: [
                "埃⽒筛法",
                "线性筛法",
                "二分答案",
                "枚举法",
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
            question: "在面向对象中，方法在 C++ 的 class 中表现为 class 内定义的函数。 ( )",
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
            question: "C++ 类的定义中，可以没有构造函数，会给出默认的构造函数（ ）",
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
            question: "如果某个 C++ 对象（ object ）支持下标运算符（方括号运算符），则该对象在所对应 class 中以成员函数的形式 进⾏了重载。 ( )",
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
            question: "深度优先搜索（ DFS ， Depth First Search 的简写）属于图算法，其过程是对每一个可能的分支路径深入到不 能再深入为⽌，而且每个节点只能访问一次。 ( )",
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
            question: "哈夫曼编码（ Huffman Coding ）具有唯一性，因此有确定的压缩率。 ( )",
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
            question: "在下面 C++ 代码中，由于删除了变量 ptr，因此 ptr 所对应的数据也随之删除，故第 8 ⾏代码被执⾏时， 将报错。（ ）",
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
            question: "二叉搜索树查找的平均时间复杂度为 。（ ）",
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
            question: "二叉搜索树可以是空树（没有任何节点）或者单节点树（只有一个节点），或者多节点。如果是多节点，则 左节点的值小于⽗节点的值，右节点的值大于⽗节点的值，由此推理，右节点树的值都大于根节点的值，左节点树 的值都小于根节点的值。（ ）",
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
            question: "小杨想写一个程序来算出正整数 N 有多少个因数，经过思考他写出了一个重复没有超过 N/2 次的循环就能够算 出来了。（ ）",
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
            question: "同样的整数序列分别保存在单链表和双向链中，这两种链表上的简单冒泡排序的复杂度相同。（ ）",
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
