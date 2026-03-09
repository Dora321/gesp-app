// 2024年3月 GESP C++ 六级真题

const programmingQuestions = [
    {
        "id": 26,
        "type": "programming",
        "title": "游戏",
        "problemNumber": "2024-03-23-06-C-01",
        "description": "给定四个正整数 n,a,b,mod。每次可以把当前值减去 a 或 b；当值不大于 0 时结束。求不同操作序列数对 mod 取模。若 a=b，两种选择仍视为不同。",
        "inputDescription": "输入一行四个正整数 n,a,b,mod。",
        "outputDescription": "输出答案对 mod 取模后的结果。",
        "samples": [
            {
                "input": "7 2 3 1000000007",
                "output": "3"
            }
        ],
        "explanation": "记 f[x] 为当前值为 x 时的方案数。若一步减到 0 或负数就立刻结束，这对应一个完整方案，所以边界可视作 f[x]=1（x<=0）；于是对正整数有 f[x]=f[x-a]+f[x-b]，顺推到 n 即可。",
        "tags": [
            "编程题",
            "动态规划",
            "递推"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n, a, b, mod;\n    cin >> n >> a >> b >> mod;\n    vector<long long> f(n + 1, 0);\n    for (long long x = 1; x <= n; ++x) {\n        long long v1 = (x <= a ? 1 : f[x - a]);\n        long long v2 = (x <= b ? 1 : f[x - b]);\n        f[x] = (v1 + v2) % mod;\n    }\n    cout << f[n] % mod << '\\n';\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "好斗的牛",
        "problemNumber": "2024-03-23-06-C-02",
        "description": "有 n 头牛，第 i 头牛的攻击范围为 a_i。你只保留一段连续牛棚，问最少保留多少个牛棚，才能存在一种摆放方案使所有牛互不挑事。",
        "inputDescription": "第一行 n。第二行 n 个整数 a_i。",
        "outputDescription": "输出最少需要保留的牛棚数量。",
        "samples": [
            {
                "input": "3\n1 2 1",
                "output": "6"
            }
        ],
        "explanation": "若两头相邻的牛分别是 i、j，则它们之间至少要空出 max(a_i,a_j) 个牛棚，整段长度就是 n 加上相邻空棚数之和。把攻击范围从小到大排列即可使这部分和最小，答案化为 n + (a_1+...+a_n) - min(a_i)。",
        "tags": [
            "编程题",
            "贪心",
            "构造"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    long long sum = 0;\n    int mn = INT_MAX;\n    for (int i = 0; i < n; ++i) {\n        int x;\n        cin >> x;\n        sum += x;\n        mn = min(mn, x);\n    }\n    cout << sum - mn + n << '\\n';\n    return 0;\n}"
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
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: "在构建哈夫曼树时，每次应该选择（ ）合并。",
            options: [
                "最小权值的节点",
                "最大权值的节点",
                "随机节点",
                "深度最深的节点",
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
            id: 2,
            type: "single",
            question: "面向对象的编程思想主要包括以下哪些原则（ ）？",
            options: [
                "贪⼼、动态规划、回溯",
                "并发、并⾏、异步",
                "递归、循环、分治",
                "封装、继承、多态",
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
            id: 3,
            type: "single",
            question: "在队列中，元素的添加和删除是按照（ ）原则进⾏的。",
            options: [
                "先进先出",
                "先进后出",
                "最小值先出",
                "随机进出",
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
            id: 4,
            type: "single",
            question: "给定一个简单的类定义如下，（ ）语句在类的外部正确地创建了一个 Circle 对象并调用了 getArea 函 数？",
            options: [
                "Circle c = Circle(5.0); c.getArea(c);",
                "Circle c(5.0); getArea(c);",
                "Circle c = new Circle(5.0); c.getArea();",
                "Circle c(5.0); c.getArea();",
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
            question: "以下代码希望能在一棵二叉排序树中搜索特定的值，请在横线处填入（ ），使其能正确实现相应功能。",
            options: [
                "target < root->left",
                "target < root->val",
                "target > root->val",
                "target > root->left",
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
            question: "3 位格雷编码的正确顺序是（ ）。",
            options: [
                "000, 001, 010, 011, 100, 101, 110, 111",
                "000, 001, 011, 010, 110, 111, 101, 100",
                "000, 010, 001, 011, 100, 110, 101, 111",
                "000, 010, 110, 100, 111, 101, 011, 001",
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
            question: "以下动态规划算法的含义与目的是（ ）。 class Circle { private: double radius; public: Circle(double r) : radius(r) {} double getArea() { return 3.14 * radius * radius; } }; 1 2 3 4 5 6 7 8 9 TreeNode* search(TreeNode* root, int target) { if (root == NULL || root->val == target) { return root; } if (_______________) { return search(root->left, target); } else { return search(root->right, target); } } 1 2 3 4 5 6 7 8 9 10 int function(vector<int>& nums) { int n = nums.size(); if (n == 0) return 0; if (n == 1) return nums[0]; 1 2 3 4 5 6",
            options: [
                "计算数组 nums 中的所有元素的和",
                "计算数组 nums 中相邻元素的最大和",
                "计算数组 nums 中不相邻元素的最大和",
                "计算数组 nums 中的最小元素",
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
            question: "阅读以下⼴度优先搜索的代码： 使用以上算法遍历以下这棵树，可能的输出是（ ）。",
            options: [
                "1 2 8 9 4 5 3 6 7 10 11",
                "1 2 3 4 5 6 7 8 9 10 11",
                "1 2 3 8 9 6 4 5 7 10 11 vector<int> dp(n, 0); dp[0] = nums[0]; dp[1] = max(nums[0], nums[1]); for (int i = 2; i < n; ++i) { dp[i] = max(dp[i - 1], nums[i] + dp[i - 2]); } return dp[n - 1]; } 7 8 9 10 11 12 13 14 void bfs(TreeNode* root) { if (root == NULL) { return; } queue<TreeNode*> q; q.push(root); while (!q.empty()) { TreeNode* current = q.front(); q.pop(); cout << current->val << \" \"; if (current->left) { q.push(current->left); } if (current->right) { q.push(current->right); } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 1 / \ 2 3 / \ \ 8 9 6 / \ \ 4 5 7 / \ 10 11 1 2 3 4 5 6 7 8 9",
                "1 2 3 8 9 4 5 6 7 10 11",
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
            id: 9,
            type: "single",
            question: "给定一个空栈，执⾏以下操作序列： 操作序列：push(1), push(2), push(3), pop(), pop(), push(4), push(5), pop() 最终栈中的元素是（ ）。",
            options: [
                "1, 2",
                "1, 4, 5",
                "1, 2, 5",
                "1, 4",
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
            id: 10,
            type: "single",
            question: "一个有 124 个叶子节点的完全二叉树，最多有（ ）个结点。",
            options: [
                "247",
                "248",
                "249",
                "250",
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
            question: "在求解最优化问题时，动态规划常常涉及到两个重要性质，即最优子结构和（ ）。",
            options: [
                "重叠子问题",
                "分治法",
                "贪⼼策略",
                "回溯算法",
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
            question: "若一棵二叉树的先序遍历为： A, B, D, E, C, F 、中序遍历为： D, B, E, A, F, C ，它的后序遍历为（ ）。",
            options: [
                "D, E, B, F, C, A",
                "E, D, B, F, C, A",
                "D, E, B, C, F, A",
                "E, D, B, C, F, A",
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
            question: "线性筛法与埃⽒筛法相比的优势是（ ）。",
            options: [
                "更容易实现",
                "更节省内存",
                "更快速",
                "更准确",
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
            id: 14,
            type: "single",
            question: "以下代码使用了辗转相除法求解最大公因数，请在横线处填入（ ），使其能正确实现相应功能。 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "int temp = b; b = a / b; a = temp;",
                "int temp = a; a = b / a; b = temp;",
                "int temp = b; b = a % b; a = temp;",
                "b = a % b; a = b;",
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
            question: "下面的代码⽚段用于反转单链表，请进⾏（ ）修改，使其能正确实现相应功能。",
            options: [
                "current->next = next; 应该改为 current->next = prev;",
                "ListNode* next = current->next; 应该改为 ListNode* next = prev->next;",
                "current != nullptr 应该改为 current->next != nullptr",
                "ListNode* prev = nullptr; 应该改为 ListNode* prev = head;",
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
            id: 16,
            type: "judge",
            question: "哈夫曼树是一种二叉树。",
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
            question: "在动态规划中，状态转移方程的作用是定义状态之间的关系。",
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
            question: "继承是将已有类的属性和方法引入新类的过程。",
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
            question: "完全二叉树的任意一层都可以不满。",
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
            question: "删除单向链表中的节点，只需知道待删除节点的地址即可，无需访问前一个节点。",
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
            question: "在宽度优先搜索中，通常使用队列来辅助实现。",
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
            question: "哈夫曼编码的主要应用领域是有损数据压缩。",
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
            question: "二叉搜索树的查找操作的时间复杂度是 。 int gcd(int a, int b) { while (b != 0) { ______________________ } return a; } 1 2 3 4 5 6 ListNode* reverseLinkedList(ListNode* head) { ListNode* prev = nullptr; ListNode* current = head; while (current != nullptr) { ListNode* next = current->next; current->next = next; prev = current; current = next; } return prev; } 1 2 3 4 5 6 7 8 9 10 11",
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
            question: "栈的基本操作包括入栈（ push ）和出栈（ pop ）。",
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
            question: "使用哈夫曼编码对一些字符进⾏编码，如果两个字符的频率差异最大，则它们的编码可能出现相同的前 缀。",
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
        }
    ]
};
