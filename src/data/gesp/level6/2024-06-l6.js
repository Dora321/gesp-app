// 2024年6月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3
3 1 2
13
dabcabcabcabz`, output: `9` }
      ],
      question: `
# [GESP202406 六级] 计算得分

## 题目描述

小杨想要计算由 $m$ 个小写字母组成的字符串的得分。

小杨设置了一个包含 $n$ 个正整数的计分序列 $A=[a_1,a_2,\\ldots,a_n]$，如果字符串的一个子串由 $k(1\\leq k \\leq n)$ 个 $\\texttt{abc}$ 首尾相接组成，那么能够得到分数 $a_k$，并且字符串包含的字符不能够重复计算得分，整个字符串的得分是计分子串的总和。

例如，假设 ，字符串 $\\texttt{dabcabcabcabzabc}$ 的所有可能计分方式如下：
- $\\texttt{d+abc+abcabc+abz+abc}$ 或者 $\\texttt{d+abcabc+abc+abz+abc}$，其中 $\\texttt{d}$ 和 $\\texttt{abz}$ 不计算得分，总得分为 $a_1+a_2+a_1$。
- $\\texttt{d+abc+abc+abc+abz+abc}$，总得分为 $a_1+a_1+a_1+a_1$。
- $\\texttt{d+abcabcabc+abz+abc}$，总得分为 $a_3+a_1$。

小杨想知道对于给定的字符串，最大总得分是多少。

## 输入格式

- 第一行包含一个正整数 $n$，代表计分序列 $A$ 的长度。

- 第二行包含 $n$ 个正整数，代表计分序列 $A$。

- 第三行包含一个正整数 $m$，代表字符串的长度。

- 第四行包含一个由 $m$ 个小写字母组成的字符串。

## 输出格式

输出一个整数，代表给定字符串的最大总得分。
`,
      score: 25,
      explanation: `**解析：**
      设 dp[i] 为前 i 个字符的最大得分。若某一段恰好是 k 个连续的 abc，则它的长度一定是 3k，且末尾三字符为 abc。先求出每个位置结尾连续接了多少个 abc 块，再在 dp 中枚举最后取多少块。

      **考点：** 动态规划、字符串
      `,
      tags: ["编程题", "动态规划", "字符串"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<long long> a(n+1);\n    for (int i = 1; i <= n; ++i) cin >> a[i];\n    int m;\n    string s;\n    cin >> m >> s;\n    s = \" \"+s;\n\n    vector<int> cnt(m+1, 0);\n    for (int i = 3; i <= m; ++i) {\n        if (s[i-2] == 'a' && s[i-1] == 'b' && s[i] == 'c') {\n            cnt[i] = 1;\n            if (i >= 6) cnt[i] += cnt[i-3];\n        }\n    }\n\n    vector<long long> dp(m+1, 0);\n    for (int i = 1; i <= m; ++i) {\n        dp[i] = dp[i-1];\n        for (int k = 1; k <= cnt[i] && k <= n; ++k) {\n            dp[i] = max(dp[i], dp[i-3 * k]+a[k]);\n        }\n    }\n\n    cout << dp[m] << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `6
3 1 1 3 4
100101
3
1
3
2`, output: `010000` }
      ],
      question: `
# [GESP202406 六级] 二叉树

## 题目描述

小杨有一棵包含 $n$ 个节点的二叉树，且根节点的编号为 $1$。这棵二叉树任意一个节点要么是白色，要么是黑色。之后小杨会对这棵二叉树进行 $q$ 次操作，每次小杨会选择一个节点，将以这个节点为根的子树内所有节点的颜色反转，即黑色变成白色，白色变成黑色。

小杨想知道 $q$ 次操作全部完成之后每个节点的颜色。

## 输入格式

第一行一个正整数 $n$，表示二叉树的节点数量。

第二行 $(n-1)$ 个正整数，第 $i$（$1\\le i\\le n-1$）个数表示编号为 $(i+1)$ 的节点的父亲节点编号，数据保证是一棵二叉树。

第三行一个长度为 $n$ 的 $\\texttt{01}$ 串，从左到右第 $i$（$1\\le i\\le n$）位如果为 $\\texttt{0}$，表示编号为 $i$ 的节点颜色为白色，否则为黑色。

第四行一个正整数 $q$，表示操作次数。

接下来 $q$ 行每行一个正整数 $a_i$（$1\\le a_i\\le n$），表示第 $i$ 次操作选择的节点编号。

## 输出格式

输出一行一个长度为 $n$ 的 $\\texttt{01}$ 串，表示 $q$ 次操作全部完成之后每个节点的颜色。从左到右第 $i$（$1\\le i\\le n$） 位如果为 $\\texttt{0}$，表示编号为 $i$ 的节点颜色为白色，否则为黑色。
`,
      score: 25,
      explanation: `**解析：**
      对子树翻转而言，一个节点最终是否翻色，只取决于从根到它这条链上被操作了多少次。先把每次操作记到对应节点，再 DFS 传递翻转次数的奇偶性，奇数次就把该点颜色取反。

      **考点：** 树、DFS
      `,
      tags: ["编程题", "树", "DFS"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<vector<int>> g(n+1);\n    for (int i = 2; i <= n; ++i) {\n        int p;\n        cin >> p;\n        g[p].push_back(i);\n    }\n\n    string s;\n    cin >> s;\n    s = \" \"+s;\n\n    int q;\n    cin >> q;\n    vector<int> mark(n+1, 0);\n    while (q--) {\n        int x;\n        cin >> x;\n        mark[x] ^= 1;\n    }\n\n    string ans(n, '0');\n    function<void(int,int)> dfs = [&](int u, int flip) {\n        flip ^= mark[u];\n        int color = s[u]-'0';\n        if (flip) color ^= 1;\n        ans[u-1] = char('0'+color);\n        for (int v : g[u]) dfs(v, flip);\n    };\n    dfs(1, 0);\n    cout << ans << '\\n';\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2024-06-l6',
    title: '2024年6月 GESP C++ 六级真题',
    level: 6,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `面向对象的编程思想主要包括（ ）原则。`,
            options: [
                "贪心、动态规划、回溯",
                "并发、并行、异步",
                "递归、循环、分治",
                "封装、继承、多态",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 贪心、动态规划、回溯**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。
            - **B 并发、并行、异步**：不是本题答案。
            - **C 递归、循环、分治**：不是本题答案。
            - **D 封装、继承、多态**：正确答案。

            **考点：** 面向对象
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
            question: `运行下列代码，屏幕上输出（ ）。`,
            options: [
                "1 1 1 #include <iostream> using namespace std; class my_class { public: static int count; my_class() { count++; } ~my_class() { count--; } static void print_count() { cout << count << \" \"; } }; int my_class::count = 0; int main() { my_class obj1; my_class::print_count(); my_class obj2; obj2.print_count(); my_class obj3; obj3.print_count(); return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26",
                "1 2 3",
                "1 1 2",
                "1 2 2",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 1 1 1 #include <iostream> using namespac...**：错误。该代码逻辑与题目要求不符，请逐步推演。
            - **B 1 2 3**：正确答案。
            - **C 1 1 2**：错误。
            - **D 1 2 2**：错误。

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
            question: `运行下列代码，屏幕上输出（ ）。 #include <iostream> using namespace std; class shape { protected: int width, height; public: shape(int a = 0, int b = 0) { width = a; height = b; } virtual int area() { cout << "parent class area: " <<endl; return 0; } }; class rectangle: public shape { public: rectangle(int a = 0, int b = 0) : shape(a, b) { } int area () { cout << "rectangle area: "; return (width * height); } }; class triangle: public shape { public: triangle(int a = 0, int b = 0) : shape(a, b) { } int area () { cout << "triangle area: "; return (width * height / 2); } }; int main() { shape *pshape; rectangle rec(10, 7); triangle tri(10, 5); pshape = &rec; pshape->area(); pshape = &tri; pshape->area(); return 0; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 43 44 45 46 47 48`,
            options: [
                "rectangle area: triangle area:",
                "parent class area: parent class area:",
                "运行时报错",
                "编译时报错",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A rectangle area: triangle area:**：正确答案。
            - **B parent class area: parent class area:**：不是本题答案。
            - **C 运行时报错**：不是本题答案。
            - **D 编译时报错**：不是本题答案。

            **考点：** 面向对象
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
            question: `向一个栈顶为 hs 的链式栈中插入一个指针为 s 的结点时，应执行（ ）。`,
            options: [
                "hs->next = s;",
                "s->next = hs; hs = s;",
                "s->next = hs->next; hs->next = s;",
                "s->next = hs; hs = hs->next;",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A hs->next = s;**：不是本题答案。
            - **B s->next = hs; hs = s;**：正确答案。
            - **C s->next = hs->next; hs->next = s;**：不是本题答案。
            - **D s->next = hs; hs = hs->next;**：不是本题答案。

            **考点：** 栈
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
            question: `在栈数据结构中，元素的添加和删除是按照什么原则进行的？`,
            options: [
                "先进先出",
                "先进后出",
                "最小值先出",
                "随机顺序",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 先进先出**：不是本题答案。
            - **B 先进后出**：正确答案。
            - **C 最小值先出**：不是本题答案。
            - **D 随机顺序**：不是本题答案。

            **考点：** 栈
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
            question: `要实现将一个输入的十进制正整数转化为二进制表示，下面横线上应填入的代码为（ ）。 }49 #include <iostream> using namespace std; stack<int> ten2bin(int n) { stack<int> st; int r, m; r = n % 2; m = n / 2; st.push(r); while (m != 1) { r = m % 2; st.push(r); m = m / 2; } st.push(m); return st; } int main() { int n; cin >> n; stack<int> bin; bin = ten2bin(n); while (!bin.empty()) { 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26`,
            options: [
                "cout << bin.top(); bin.pop();",
                "bin.pop(); cout << bin.top();",
                "cout << bin.back(); bin.pop();",
                "cout << bin.front(); bin.pop();",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A cout << bin.top(); bin.pop();**：正确答案。
            - **B bin.pop(); cout << bin.top();**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **C cout << bin.back(); bin.pop();**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **D cout << bin.front(); bin.pop();**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。

            **考点：** 栈
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
            question: `下面定义了一个循环队列的类，请补全判断队列是否满的函数，横向上应填写（ ）。 _____________________ // 在此处填入代码 } return 0; } 27 28 29 30 #include <iostream> using namespace std; class circular_queue { private: int *arr; // 数组用于存储队列元素 int capacity; // 队列容量 int front; // 队头指针 int rear; // 队尾指针 public: circular_queue(int size) { capacity = size+1; // 为了避免队列满时与队列空时指针相等的情况，多预留一个空间 arr = new int[capacity]; front = 0; rear = 0; } ~circular_queue() { delete[] arr; } bool is_empty() { return front == rear; } bool is_full() { ________________ // 在此处填入代码 } void en_queue(int data) { if (is_full()) { cout << " 队列已满，无法入队！ " << endl; return -1; } arr[rear] = data; rear = (rear+1) % capacity; return 1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41`,
            options: [
                "return (rear+1) % capacity == front;",
                "return rear % capacity == front;",
                "return rear == front;",
                "return (rear+1) == front;",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A return (rear+1) % capacity == front;**：正确答案。
            - **B return rear % capacity == front;**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **C return rear == front;**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **D return (rear+1) == front;**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。

            **考点：** 队列
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
            question: `对 “classmycls” 使用哈夫曼（ Huffman ）编码，最少需要（ ）比特。`,
            options: [
                "10",
                "20",
                "25",
                "30",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 10**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **B 20**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **C 25**：正确答案。
            - **D 30**：不是本题答案。该数值与正确计算结果不符，请重新验算。


            **考点：** 哈夫曼编码

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
            question: `二叉树的（ ）第一个访问的节点是根节点。`,
            options: [
                "先序遍历",
                "中序遍历",
                "后序遍历",
                "以上都是",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 先序遍历**：正确答案。
            - **B 中序遍历**：不是本题答案。
            - **C 后序遍历**：不是本题答案。
            - **D 以上都是**：不是本题答案。

            **考点：** 树与二叉树
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
            question: `一棵 5 层的满二叉树中节点数为（ ）。`,
            options: [
                "31",
                "32",
                "33",
                "16",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 31**：正确答案。
            - **B 32**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **C 33**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **D 16**：不是本题答案。该数值与正确计算结果不符，请重新验算。

            **考点：** 树与二叉树
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
            question: `在求解最优化问题时，动态规划常常涉及到两个重要性质，即最优子结构和 ( ) 。`,
            options: [
                "重叠子问题",
                "分治法",
                "贪心策略",
                "回溯算法 int de_queue() { if (is_empty()) { cout << \" 队列为空，无法出队！ \" << endl; return -1; // 出队失败，返回一个特殊值 } int data = arr[front]; front = (front+1) % capacity; return data; } }; 42 43 44 45 46 47 48 49 50 51",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 重叠子问题**：正确答案。
            - **B 分治法**：不是本题答案。
            - **C 贪心策略**：不是本题答案。
            - **D 回溯算法 int de_queue() { if (is_empty()) { ...**：不是本题答案。对队列的先进先出特性或循环队列满判断理解有误。

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
            question: `青蛙每次能跳 1 或 2 步，下面代码计算青蛙跳到第 n 步台阶有多少种不同跳法。则下列说法，错误的是 ( ) 。`,
            options: [
                "函数 jump_recur() 采用递归方式。",
                "函数 jump_dp() 采用动态规划方法。",
                "当 n 较大时，函数 jump_recur() 存在大量重复计算，执行效率低。",
                "函数 jump_recur() 代码量小，执行效率高。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 函数 jump_recur() 采用递归方式。**：不是本题答案。
            - **B 函数 jump_dp() 采用动态规划方法。**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。
            - **C 当 n 较大时，函数 jump_recur() 存在大量重复计算，执行效率低。**：不是本题答案。
            - **D 函数 jump_recur() 代码量小，执行效率高。**：正确答案。

            **考点：** STL容器、动态规划
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
            question: `阅读以下二叉树的广度优先搜索代码 : int jump_recur(int n) { if (n == 1) return 1; if (n == 2) return 2; return jump_recur(n-1)+jump_recur(n-2); } int jump_dp(int n) { vector<int> dp(n+1); // 创建一个动态规划数组，用于保存已计算的值 // 初始化前两个数 dp[1] = 1; dp[2] = 2; // 从第三个数开始计算斐波那契数列 for (int i = 3; i <= n; ++i) { dp[i] = dp[i-1]+dp[i-2]; } return dp[n]; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 #include <iostream> #include <queue> using namespace std; // 二叉树节点的定义 struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x) : val(x), left(nullptr), right(nullptr) {} }; // 宽度优先搜索（ BFS ）迭代实现 TreeNode* bfs(TreeNode* root, int a) { if (root == nullptr) return nullptr; queue<TreeNode*> q; q.push(root); while (!q.empty()) { TreeNode* node = q.front(); q.pop(); if (node->val == a) return node; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 使用以上算法，在以下这棵树搜索数值 时，可能的输出是 ( ) 。`,
            options: [
                "5 2 -4 3 17 9",
                "-4 2 3 5 9 17",
                "5 2 17 -4 3 9",
                "以上都不对",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 5 2 -4 3 17 9**：不是本题答案。
            - **B -4 2 3 5 9 17**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **C 5 2 17 -4 3 9**：正确答案。
            - **D 以上都不对**：不是本题答案。

            **考点：** 动态规划
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
            question: `同上题中的二叉树如下，阅读以下二叉树的深度优先搜索代码：

\`\`\`text
        5
       / \\
      2   17
     / \\  /
   -4   3 9
\`\`\`

\`\`\`cpp
#include <iostream>
#include <stack>
using namespace std;

// 非递归深度优先搜索（DFS）
TreeNode* dfs(TreeNode* root, int a) {
    if (root == nullptr) return nullptr;

    stack<TreeNode*> stk;
    stk.push(root);

    while (!stk.empty()) {
        TreeNode* node = stk.top();
        stk.pop();
        if (node->val == a)
            return node;

        cout << node->val << " "; // 访问当前节点

        if (node->right) stk.push(node->right); // 先压入右子节点
        if (node->left) stk.push(node->left);   // 再压入左子节点
    }
    return nullptr;
}
\`\`\`

使用以上算法，在二叉树搜索数值 20 时，可能的输出是（ ）。`,
            options: [
                "5 2 -4 3 17 9",
                "-4 2 3 5 9 17",
                "5 2 17 -4 3 9",
                "以上都不对",
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：A**

**推导过程：**

栈是后进先出。代码先压右孩子、再压左孩子，因此弹栈时左孩子先被访问，整体得到“根、左子树、右子树”的先序遍历。数值 20 不在树中，所以所有结点都会在查找失败前输出：

\`5 -> 2 -> -4 -> 3 -> 17 -> 9\`

B 是中序遍历结果；C 在访问根后先走右子树，与实际压栈顺序相反；因此 D 也不成立。

**易错点：** “先压入右孩子”并不等于“先访问右孩子”；由于栈的后进先出性质，后压入的左孩子会先弹出。

**考点：** 二叉树、非递归深度优先搜索、栈、先序遍历。`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `在上题的树中搜索数值 时，采用深度优先搜索一共比较的节点数为（ ）。`,
            options: [
                "2",
                "3",
                "4",
                "5",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 2**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **B 3**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **C 4**：正确答案。
            - **D 5**：不是本题答案。该数值与正确计算结果不符，请重新验算。

            **考点：** 深度优先搜索
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
            question: `哈夫曼编码本质上是一种贪心策略。`,
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

            **考点：** 贪心、哈夫曼编码
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
            question: `创建一个对象时，会自动调用该对象所属类的构造函数。如果没有定义构造函数，编译器会自动生成一个默 认的构造函数。`,
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

            **考点：** 面向对象
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
            question: `定义一个类时，必须手动定义一个析构函数，用于释放对象所占用的资源。`,
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

            **考点：** 面向对象
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
            question: `C++ 中类内部可以嵌套定义类。`,
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

            **考点：** 格雷编码
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
            question: `000, 001, 011, 010, 110, 111, 101, 100 是一组格雷码。`,
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
            sourceIntegrity: "missing-formula",
            integrityNote: "原卷此题的公式或数值在文本提取时丢失，题干留下空档，仅凭当前内容无法作答。本题已排除出计分与考点练习，待补齐原卷公式后恢复。",
            question: `n 个节点的双向循环链表，在其中查找某个节点的平均时间复杂度是 。`,
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
            id: 22,
            type: "judge",
            question: `完全二叉树可以用数组存储数据。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** C++ 数组下标从 0 开始，访问 a[n] 时下标范围 0~n-1。越界访问是未定义行为。

            **考点：** 数组
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
            question: `在 C++ 中，静态成员函数只能访问静态成员变量。`,
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

            **考点：** 面向对象
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
            question: `在深度优先搜索中，通常使用队列来辅助实现。`,
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
            id: 25,
            type: "judge",
            question: `对 0-1 背包问题，贪心算法一定能获得最优解。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 0/1 背包用逆序遍历容量避免重复选同一物品；完全背包用正序。注意容量上限截断和初始化 dp[0]=0（求最大）或 INF（求最小）。

            **考点：** 动态规划
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
