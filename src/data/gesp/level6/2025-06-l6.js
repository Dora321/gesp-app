// 2025年6月 GESP C++ 六级真题

const programmingQuestions = [
    {
        "id": 26,
        "type": "programming",
        "title": "学习小组",
        "problemNumber": "2025-06-22-06-C-01",
        "description": "将 n 名同学划分为若干组。若某组恰好有 i 人，则该组贡献 a_i。求最大总积极度。",
        "inputDescription": "第一行 n。第二行 n 个非负整数 a_i。",
        "outputDescription": "输出最大总积极度。",
        "samples": [
            {
                "input": "3\n1 2 3",
                "output": "3"
            }
        ],
        "explanation": "设 $dp[i]$ 为前 i 名同学最优分组后的最大积极度。最后一组人数可以是任意 j（1<=j<=i），于是转移为 $dp[i]$=max(dp[i-j]+a_j)。",
        "tags": [
            "编程题",
            "动态规划"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<long long> a($n+1$), dp($n+1$, 0);\n    for (int i = 1; i <= n; ++i) cin >> a[i];\n    for (int i = 1; i <= n; ++i) {\n        for (int j = 1; j <= i; ++j) {\n            $dp[i]$ = max($dp[i]$, dp[i-j]+a[j]);\n        }\n    }\n    cout << dp[n] << '\\n';\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "最大因数",
        "problemNumber": "2025-06-22-06-C-02",
        "description": "构造一棵有根树：1 为根，x>1 的父节点是 x 的最大真因数。多次询问两节点之间的距离。",
        "inputDescription": "第一行 q。接下来 q 行每行两个正整数 x,y。",
        "outputDescription": "每组询问输出一行距离。",
        "samples": [
            {
                "input": "3\n1 3\n2 5\n4 8",
                "output": "2\n1\n2"
            }
        ],
        "explanation": "结点 x 的父亲是 x 除以其最小质因子，因此向上走一步就是删去一个最小质因子。先记 depth(x) 为删到 1 需要几步（即质因子个数，按重数计），查询时先把更深的点抬到同层，再同步上跳直到相遇。",
        "tags": [
            "编程题",
            "数论",
            "树"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> primes;\n\nint smallestPrimeFactor(int x) {\n    for (int p : primes) {\n        if (1LL * p * p > x) break;\n        if (x % p == 0) return p;\n    }\n    return x;\n}\n\nint parentOf(int x) {\n    if (x == 1) return 1;\n    return x / smallestPrimeFactor(x);\n}\n\nunordered_map<int, int> depthMemo;\nint getDepth(int x) {\n    auto it = depthMemo.find(x);\n    if (it != depthMemo.end()) return it->second;\n    int res = (x == 1 ? 0 : getDepth(parentOf(x))+1);\n    depthMemo[x] = res;\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    const int LIM = 31623;\n    vector<bool> isPrime(LIM+1, true);\n    isPrime[0] = isPrime[1] = false;\n    for (int i = 2; i <= LIM; ++i) {\n        if (!isPrime[i]) continue;\n        primes.push_back(i);\n        if (1LL * i * i <= LIM) {\n            for (int j = i * i; j <= LIM; j += i) isPrime[j] = false;\n        }\n    }\n    depthMemo[1] = 0;\n\n    int q;\n    cin >> q;\n    while (q--) {\n        int x, y;\n        cin >> x >> y;\n        int dx = getDepth(x), dy = getDepth(y);\n        int ans = 0;\n        while (dx > dy) {\n            x = parentOf(x);\n            --dx;\n            ++ans;\n        }\n        while (dy > dx) {\n            y = parentOf(y);\n            --dy;\n            ++ans;\n        }\n        while (x != y) {\n            x = parentOf(x);\n            y = parentOf(y);\n            ans += 2;\n        }\n        cout << ans << '\\n';\n    }\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2025-06-l6',
    title: '2025年6月 GESP C++ 六级真题',
    level: 6,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下列哪一项不是面向对象编程的基本特征？",
            options: [
                "继承",
                "封装",
                "多态",
                "链接",
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
            question: "2. 为了让 Dog 类的构造函数能正确地调用其⽗类 Animal 的构造方法，横线线处应填入（ ）。",
            options: [
                "Animal(name) class Animal { public: std::string name; Animal(std::string str) : name(str) { std::cout << \"Animal created\n\"; } virtual void speak() { cout << \"Animal speaks\" << endl; } }; class Dog : public Animal { std::string breed; public: Dog(std::string name, std::string b) : _________________, breed(b) { std::cout << \"Dog created\n\"; } void speak() override { cout << \"Dog barks\" << endl; } }; int main() { Animal* p = new Dog(\"Rex\", \"Labrador\"); p->speak(); delete p; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29",
                "super(name)",
                "Animal::Animal(name)",
                "Animal()",
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
            question: "代码同上一题，代码执⾏结果是（ ）。",
            options: [
                "输出 Animal speaks",
                "输出 Dog barks",
                "编译错误",
                "程序崩溃",
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
            id: 4,
            type: "single",
            question: "以下关于栈和队列的代码，执⾏后输出是（ ）。",
            options: [
                "1 3",
                "3 1",
                "3 3",
                "1 1",
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
            question: "在一个循环队列中， front 是指向队头的指针， rear 指向队尾的指针，队列最大容量为 maxSize 。判断 队列已满的条件是（ ）。",
            options: [
                "rear == front",
                "(rear+1) % maxSize == front",
                "(rear-1+maxSize) % maxSize == front",
                "(rear-1) == front",
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
            question: "（ ）只有最底层的节点未被填满，且最底层节点尽量靠左填充。",
            options: [
                "完美二叉树",
                "完全二叉树",
                "完满二叉树",
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
            question: "在使用数组表⽰完全二叉树时，如果一个节点的索引为 （从 开始计数），那么其左子节点的索引通常是（ ）。",
            options: [
                "stack<int> s; queue<int> q; for (int i = 1; i <= 3; ++i) { s.push(i); q.push(i); } cout << s.top() << \" \" << q.front() << endl; 1 2 3 4 5 6 7 8",
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
                "GESP6级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "已知一棵二叉树的前序遍历序列为 GDAFEMHZ ，中序遍历序列为 ADFGEHMZ ，则其后序遍历序列为（ ）。",
            options: [
                "ADFGEHMZ",
                "ADFGHMEZ",
                "AFDGEMZH",
                "AFDHZMEG",
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
            question: "设有字符集 {a, b, c, d, e} ，其出现频率分别为 {5, 8, 12, 15, 20} ，得到的哈夫曼编码为（ ）。",
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
            id: 10,
            type: "single",
            question: "3 位格雷编码中，编码 101 之后的下一个编码不可能是（ ）。",
            options: [
                "100",
                "111",
                "110",
                "001 a: 010 b: 011 c: 00 d: 10 e: 11 1 2 3 4 5 a: 00 b: 10 c: 011 d: 100 e: 111 1 2 3 4 5 a: 10 b: 01 c: 011 d: 100 e: 111 1 2 3 4 5 a: 100 b: 01 c: 011 d: 100 e: 00 1 2 3 4 5",
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
            id: 11,
            type: "single",
            question: "请将下列 C++ 实现的深度优先搜索（DFS）代码补充完整，横线处应填入（ ）。",
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
            id: 12,
            type: "single",
            question: "给定一个二叉树，返回每一层中最大的节点值，结果以数组形式返回，横线处应填入（ ）。 struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x): val(x), left(nullptr), right(nullptr) {} }; void dfs(TreeNode* root, vector<int>& result) { if (root == nullptr) return; __________________________ } 1 2 3 4 5 6 7 8 9 10 11 12 result.push_back(root->val); dfs(root->left); dfs(root->right); 1 2 3 result.push_back(root->left->val); dfs(root->right); dfs(root->left); 1 2 3 result.push_back(root->left->val); dfs(root->left); dfs(root->right); 1 2 3 result.push_back(root->right->val); dfs(root->right); dfs(root->left); 1 2 3 #include <vector> #include <queue> #include <algorithm> struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x): val(x), left(nullptr), right(nullptr) {} }; vector<int> largestValues(TreeNode* root) { vector<int> result; if (!root) return result; queue<TreeNode*> q; q.push(root); while (!q.empty()) { int sz = q.size(); 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20",
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
                "GESP6级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面代码实现一个二叉排序树的插入函数（没有相同的数值），横线处应填入（ ）。",
            options: [
                "选项A",
                "int maxVal = INT_MIN; for (int i = 0; i < sz; ++i) { TreeNode* node; _______________________________ maxVal = max(maxVal, node->val); if (node->left) q.push(node->left); if (node->right) q.push(node->right); } result.push_back(maxVal); } return result; } 21 22 23 24 25 26 27 28 29 30 31 32 33 node = q.end();1 node = q.front();1 q.pop(); node = q.front(); 1 2 node = q.front(); q.pop(); 1 2 struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x): val(x), left(nullptr), right(nullptr) {} }; void insert(TreeNode*& root, int key) { if (!root) { root = new TreeNode(key); return; } _______________________________ } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 if (key < root->val) insert(root->left, key); else if (key > root->val) insert(root->right, key); 1 2 3 4 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            id: 14,
            type: "single",
            question: "以下关于动态规划算法特性的描述，正确的是（ ）。",
            options: [
                "子问题相互独⽴，不重叠",
                "问题包含重叠子问题和最优子结构",
                "只能从底⾄顶迭代求解",
                "必须使用递归实现，不能使用迭代",
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
            question: "给定 个物品和一个最大承重为 的背包，每个物品有一个重量 和价值 ，每个物品只能选择放或 不放。目标是选择若⼲个物品放入背包，使得总价值最大，且总重量不超过 。关于下面代码，说法正确的是（ ）。",
            options: [
                "该算法不能处理背包容量为 0 的情况",
                "外层循环 i 遍历背包容量，内层遍历物品",
                "从大到小遍历 w 是为了避免重复使用同一物品",
                "这段代码计算的是最小重量而非最大价值",
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
            id: 16,
            type: "judge",
            question: "构造函数可以被声明为 virtual。",
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
            question: "给定一组字符及其出现的频率，构造出的哈夫曼树是唯一的。",
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
            question: "为了实现一个队列，使其出队操作（ pop ）的时间复杂度为 并且避免数组删除⾸元素的 问题，一 种常见且有效的方法是使用环形数组，通过调整队⾸和队尾指针来实现。 if (key < root->val) insert(root->right, key); else if (key > root->val) insert(root->left, key); 1 2 3 4 insert(root->left, key); insert(root->right, key); 1 2 insert(root->right, key); insert(root->left, key); 1 2 int knapsack1D(int W, vector<int>& wt, vector<int>& val, int n) { vector<int> dp(W+1, 0); for (int i = 0; i < n; ++i) { for (int w = W; w >= wt[i]; --w) { dp[w] = max(dp[w], dp[w-wt[i]]+val[i]); } } return dp[W]; } 1 2 3 4 5 6 7 8 9",
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
            question: "对一棵二叉排序树进⾏中序遍历，可以得到一个递增的有序序列。",
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
            question: "如果二叉搜索树在连续的插入和删除操作后，所有节点都偏向一侧，导致其退化为类似于链表的结构，这时 其查找、插入、删除操作的时间复杂度会从理想情况下的 退化到 。",
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
            question: "执⾏下列代码， my_dog.name 的最终值是 Charlie 。",
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
            question: "下列 C++ 代码可以成功编译，并且子类 Child 的实例能通过其成员函数访问⽗类 Parent 的属性 value 。",
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
            question: "下列代码中的 tree 向量，表⽰的是一棵完全二叉树 ( -1 代表空节点)按照层序遍历的结果。",
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
            question: "在树的深度优先搜索（DFS）中，使用栈作为辅助数据结构以实现“先进后出”的访问顺序。",
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
            question: "下面代码采用动态规划求解零钱兑换问题：给定 种硬币，第 𝑖 种硬币的面值为 𝑐𝑜𝑖𝑛𝑠[𝑖 − 1] ，目标⾦额为 𝑎𝑚𝑡 ，每种硬币可以重复选取，求能够凑出目标⾦额的最少硬币数量；如果不能凑出目标⾦额，返回 -1 。 class Dog { public: std::string name; Dog(std::string str) : name(str) {} }; int main() { Dog my_dog(\"Buddy\"); my_dog.name = \"Charlie\"; return 0; } 1 2 3 4 5 6 7 8 9 10 11 class Parent { private: int value = 100; }; class Child : public Parent { public: int get_private_val() { return value; // 尝试访问父类的私有成员 } }; 1 2 3 4 5 6 7 8 9 10 #include <vector> std::vector<int> tree = {1, 2, 3, 4, -1, 6, 7}; 1 2 int coinChangeDPComp(vector<int> &coins, int amt) { int n = coins.size(); int MAX = amt+1; vector<int> dp(amt+1, MAX); dp[0] = 0; for (int i = 1; i <= n; i++) { for (int a = 1; a <= amt; a++) { if (coins[i-1] > a) dp[a] = dp[a]; else dp[a] = min(dp[a], dp[a-coins[i-1]]+1); } } return dp[amt] != MAX ? dp[amt] : -1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17",
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
        ...programmingQuestions
    ]
};
