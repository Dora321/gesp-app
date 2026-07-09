// 2024年12月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3 2
URR`, output: `7` }
      ],
      question: `
# [GESP202412 六级] 树上游走

## 题目描述

小杨有一棵包含无穷节点的二叉树（即每个节点都有左儿子节点和右儿子节点；除根节点外，每个节点都有父节点），其中根节点的编号为 $1$，对于节点 $i$，其左儿子的编号为 $2\\times i$，右儿子的编号为 $2\\times i + 1$。

小杨会从节点 $s$ 开始在二叉树上移动，每次移动为以下三种移动方式的任意一种：

- **第 1 种移动方式**：如果当前节点存在父亲节点，向上移动到当前节点的父节点，否则不移动；
- **第 2 种移动方式**：移动到当前节点的左儿子；
- **第 3 种移动方式**：移动到当前节点的右儿子。

小杨想知道移动 $n$ 次后自己所处的节点编号。**数据保证最后所处的节点编号不超过 $10^{12}$**。

## 输入格式

第一行包含两个正整数 $n$ 和 $s$，代表移动次数和初始节点编号。

第二行包含一个长度为 $n$ 且仅包含大写字母 $\\tt{U}$、$\\tt{L}$ 和 $\\tt{R}$ 的字符串，代表每次移动的方式，其中 $\\tt{U}$ 代表第 1 种移动方式，$\\tt{L}$ 代表第 2 种移动方式，$\\tt{R}$ 代表第 3 种移动方式。

## 输出格式

输出一个正整数，代表最后所处的节点编号。
`,
      score: 25,
      explanation: `**解析：**
      按操作串直接模拟即可：U 表示走到父节点 x/2，L/R 分别走到 2x 和 2x+1。

      **考点：** 模拟、栈
      `,
      tags: ["编程题", "模拟", "栈"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    long long x;\n    cin >> n >> x;\n    string s;\n    cin >> s;\n    for (char ch : s) {\n        if (ch == 'U') x /= 2;\n        else if (ch == 'L') x = x * 2;\n        else x = x * 2+1;\n    }\n    cout << x << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3 4 10
1 1
2 1
8 3
5 3
7 2
9 0
1 10000`, output: `40186` }
      ],
      question: `
# [GESP202412 六级] 运送物资

## 题目描述

小杨管理着 $m$ 辆货车，每辆货车每天需要向 A 市和 B 市运送若干次物资。小杨同时拥有 $n$ 个运输站点，这些站点位于 A 市和 B 市之间。

每次运送物资时，货车从初始运输站点出发，前往 A 市或 B 市，之后返回初始运输站点。A 市、B 市和运输站点的位置可以视作数轴上的三个点，其中 A 市的坐标为 $0$，B 市的坐标为 $x$，运输站点的坐标为 $p$ 且有 $0 \\lt p \\lt x$。货车每次去 A 市运送物资的总行驶路程为 $2p$，去 B 市运送物资的总行驶路程为 $2(x - p)$。

对于第 $i$ 个运输站点，其位置为 $p_i$ 且至多作为 $c_i$ 辆车的初始运输站点。小杨想知道，在最优分配每辆货车的初始运输站点的情况下，所有货车每天的最短总行驶路程是多少。

## 输入格式

第一行包含三个正整数 $n,m,x$，代表运输站点数量、货车数量和两市距离。

之后 $n$ 行，每行包含两个正整数 $p_i$ 和 $c_i$，代表第 $i$ 个运输站点的位置和最多容纳车辆数。

之后 $m$ 行，每行包含两个正整数 $a_i$ 和 $b_i$，代表第 $i$ 辆货车每天需要向 A 市运送 $a_i$ 次物资，向 B 市运送 $b_i$ 次物资。

## 输出格式

输出一个正整数，代表所有货车每天的最短总行驶路程。
`,
      score: 25,
      explanation: `**解析：**
      若一辆货车被放在位置 p 的站点，总代价是 a·p+b·(x-p) = b·x+(a-b)·p。常数项 b·x 与分配无关，因此只需按 a-b 的大小排序：更偏向 A 的货车配给更靠近 A 的站点，更偏向 B 的配给更靠近 B 的站点。

      **考点：** 贪心、排序
      `,
      tags: ["编程题", "贪心", "排序"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    long long x;\n    cin >> n >> m >> x;\n    vector<pair<long long, int>> stations;\n    for (int i = 0; i < n; ++i) {\n        long long p;\n        int c;\n        cin >> p >> c;\n        stations.push_back({p, c});\n    }\n    vector<pair<long long, long long>> trucks(m);\n    long long ans = 0;\n    for (int i = 0; i < m; ++i) {\n        long long a, b;\n        cin >> a >> b;\n        trucks[i] = {a-b, b};\n        ans += b * x;\n    }\n\n    sort(stations.begin(), stations.end());\n    sort(trucks.begin(), trucks.end());\n\n    vector<long long> pos;\n    for (auto [p, c] : stations) {\n        for (int i = 0; i < c; ++i) pos.push_back(p);\n    }\n\n    for (int i = 0; i < m; ++i) {\n        ans += trucks[i].first * pos[i];\n    }\n    cout << ans << '\\n';\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2024-12-l6',
    title: '2024年12月 GESP C++ 六级真题',
    level: 6,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `面向对象编程 (OOP) 是一种特殊的程序设计方法。下面 ( ) 不是重要的 OOP 特性。`,
            options: [
                "抽象",
                "封装",
                "继承",
                "模块化",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 抽象**：错误。
            - **B 封装**：错误。
            - **C 继承**：错误。
            - **D 模块化**：正确答案。

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
            question: `以下关于 C++ 中类的说法，哪一项是正确的？`,
            options: [
                "类中定义的所有成员变量和成员函数默认是public访问权限。",
                "类的构造函数必须显式声明返回类型为void。",
                "在 C++ 中，类的数据一般设置为私有，其公有成员函数提供访问私有数据的唯一途径。",
                "同一个类的实例有各⾃的成员数据和成员函数。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 类中定义的所有成员变量和成员函数默认是public访问权限。**：错误。
            - **B 类的构造函数必须显式声明返回类型为void。**：错误。
            - **C 在 C++ 中，类的数据一般设置为私有，其公有成员函数提供访问私有数据的唯一途径...**：正确答案。
            - **D 同一个类的实例有各⾃的成员数据和成员函数。**：错误。

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
            question: `以下 C++ 代码段中存在语法错误或逻辑错误，（ ）是正确的。`,
            options: [
                "NULL 在 C++ 中无法用于指针初始化，应使用 nullptr。 #include <iostream> using namespace std; class MyClass { public: MyClass() { cout << \"Constructor called!\" << endl; } void display() { cout << \"Display function called!\" << endl; } }; int main() { MyClass* obj = NULL; obj->display(); return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16",
                "obj 的定义应该是 MyClass obj; 而不是指针类型。",
                "obj->display() 语句存在空指针访问错误，obj 应该初始化为一个有效的对象。",
                "obj->display() 语句会调用 display() 函数，但它没有输出任何内容。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A NULL 在 C++ 中无法用于指针初始化，应使用 nullptr。 #incl...**：错误。该代码逻辑与题目要求不符，请逐步推演。
            - **B obj 的定义应该是 MyClass obj; 而不是指针类型。**：错误。
            - **C obj->display() 语句存在空指针访问错误，obj 应该初始化为一个有...**：正确答案。
            - **D obj->display() 语句会调用 display() 函数，但它没有输出...**：错误。

            **考点：** C++基础
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
            question: `阅读以下代码，下面哪一项是正确的？`,
            options: [
                "栈s的输出顺序是 1 2 3 4 5，队列q的输出顺序是 5 4 3 2 1。",
                "栈s的输出顺序是 5 4 3 2 1，队列q的输出顺序是 1 2 3 4 5。",
                "栈s的输出顺序是 1 2 3 4 5，队列q的输出顺序是 1 2 3 4 5。",
                "栈s的输出顺序是 1 2 3 4 5，队列q的输出顺序是 1 2 3 4 5，程序不会正常执⾏。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 栈s的输出顺序是 1 2 3 4 5，队列q的输出顺序是 5 4 3 2 1。**：错误。对栈的后进先出特性或空满判断理解有误，请检查入栈出栈顺序。
            - **B 栈s的输出顺序是 5 4 3 2 1，队列q的输出顺序是 1 2 3 4 5。**：正确答案。
            - **C 栈s的输出顺序是 1 2 3 4 5，队列q的输出顺序是 1 2 3 4 5。**：错误。对栈的后进先出特性或空满判断理解有误，请检查入栈出栈顺序。
            - **D 栈s的输出顺序是 1 2 3 4 5，队列q的输出顺序是 1 2 3 4 5，程...**：错误。对栈的后进先出特性或空满判断理解有误，请检查入栈出栈顺序。

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
            question: `个节点的双向循环链，在其中查找某个节点的平均时间复杂度是 ( ) 。`,
            options: [
                "O(1)",
                "O(n)",
                "O(n²)",
                "O(log n)",
],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A O(1)**：错误。
            - **B O(n)**：正确答案。
            - **C O(n²)**：错误。
            - **D O(log n)**：错误。

            **考点：** 时间复杂度
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
            question: `以下关于树的说法，（ ）是正确的。`,
            options: [
                "二叉树中每个结点都恰好有两个孩子",
                "具有n个结点的树含有n-1条边",
                "树的结点个数等于其边的个数",
                "完全二叉树一定是满二叉树",
],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 二叉树中每个结点都恰好有两个孩子**：错误。
            - **B 具有n个结点的树含有n-1条边**：正确答案。
            - **C 树的结点个数等于其边的个数**：错误。
            - **D 完全二叉树一定是满二叉树**：错误。

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
            question: `已知字符集 {A, B, C, D} 的出现频率如下表所⽰： void processData() { stack<int> s; queue<int> q; for (int i = 1; i <= 5; ++i) { s.push(i); q.push(i); } while (!s.empty()) { cout << "Stack pop: " << s.top() << endl; s.pop(); } while (!q.empty()) { cout << "Queue pop: " << q.front() << endl; q.pop(); } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 字符 频率 A 8 B 3 C 1 D 6 根据哈夫曼编码法，下面（ ）是正确的哈夫曼树。`,
            options: [
                "字符A编码长度为1、D为2、B和C均为3",
                "字符A编码长度为2、D为2、B和C均为3",
                "字符A编码长度为1、D为1、B和C均为2",
                "字符A编码长度为3、D为2、B和C均为1",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 字符A编码长度为1、D为2、B和C均为3**：正确答案。
            - **B 字符A编码长度为2、D为2、B和C均为3**：错误。
            - **C 字符A编码长度为1、D为1、B和C均为2**：错误。
            - **D 字符A编码长度为3、D为2、B和C均为1**：错误。

            **考点：** 栈
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
            question: `上一题中各字符的哈夫曼编码是（ ）。`,
            options: [
                "A: 0, B: 10, C: 110, D: 111",
                "A: 0, B: 10, C: 11, D: 10",
                "A: 0, B: 101, C: 100, D: 11 ABCD /  A BCD /  D BC /  B C 1 2 3 4 5 6 7 ABCD /  A BCD /  B CD /  C D 1 2 3 4 5 6 7 ABCD /  D ABC /  A BC /  B C 1 2 3 4 5 6 7 ABCD /  C ABC /  B AD /  A D 1 2 3 4 5 6 7",
                "A: 11, B: 10, C: 01, D: 00",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A A: 0, B: 10, C: 110, D: 111**：错误。
            - **B A: 0, B: 10, C: 11, D: 10**：错误。
            - **C A: 0, B: 101, C: 100, D: 11 ABCD /  A BC...**：正确答案。
            - **D A: 11, B: 10, C: 01, D: 00**：错误。

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
            question: `( ) 是 位格雷编码。`,
            options: [
                "000 001 011 010 110 111 101 100",
                "000 001 010 011 100 101 110 111",
                "000 001 100 101 011 010 111 110",
                "000 010 001 011 100 110 101 111",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 000 001 011 010 110 111 101 100**：正确答案。
            - **B 000 001 010 011 100 101 110 111**：错误。
            - **C 000 001 100 101 011 010 111 110**：错误。
            - **D 000 010 001 011 100 110 101 111**：错误。

            **考点：** C++基础
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
            question: `根据下面二叉树和给定的代码， 给定以下二叉搜索树，调用函数 search(root,7) 时，输出的结果是（ ）。`,
            options: [
                "8 10 14 7",
                "8 3 6 7",
                "3 6 8 7",
                "未找到值为7的节点",
],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 8 10 14 7**：错误。
            - **B 8 3 6 7**：正确答案。
            - **C 3 6 8 7**：错误。
            - **D 未找到值为7的节点**：错误。

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
            question: `阅读以下二叉树的深度优先搜索算法，横线上应填写（ ）。 #include <iostream> using namespace std; struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x) : val(x), left(NULL), right(NULL) {} }; TreeNode* search(TreeNode* root, int val) { cout << root->val << " "; if (root == NULL || root->val == val) return root; if (val < root->val) return search(root->left, val); else return search(root->right, val); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 5 /  3 7 /  /  2 4 6 8 1 2 3 4 5 void dfs(TreeNode* root) { if (root == nullptr) return; stack<TreeNode*> s; 1 2 3 4 5`,
            options: [
                "TreeNode* node = s.top();",
                "TreeNode* node = s.top(); s.pop();",
                "TreeNode* node = s.front();",
                "TreeNode* node = s.front(); s.pop();",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A TreeNode* node = s.top();**：错误。
            - **B TreeNode* node = s.top(); s.pop();**：正确答案。
            - **C TreeNode* node = s.front();**：错误。
            - **D TreeNode* node = s.front(); s.pop();**：错误。

            **考点：** C++基础
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
            question: `阅读以下二叉树的⼴度优先搜索的代码，横线上应填写（ ）。`,
            options: [
                "TreeNode* node = q.top();",
                "TreeNode* node = q.top(); q.pop();",
                "TreeNode* node = q.front();",
                "TreeNode* node = q.front(); q.pop();",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A TreeNode* node = q.top();**：错误。
            - **B TreeNode* node = q.top(); q.pop();**：错误。
            - **C TreeNode* node = q.front();**：错误。
            - **D TreeNode* node = q.front(); q.pop();**：正确答案。

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
            question: `使用上题中的宽度优先搜索算法遍历以下这棵树，可能的输出是 ( ) 。 s.push(root); while (!s.empty()) { ———————————————————————— // 在此处填入代码 cout << node->value << " "; if (node->right) s.push(node->right); if (node->left) s.push(node->left); } } 6 7 8 9 10 11 12 13 14 #include <queue> void bfs(TreeNode* root) { if (root == NULL) return; queue<TreeNode*> q; q.push(root); while (!q.empty()) { ———————————————————————— // 在此处填入代码 cout << node->val << " "; if (node->left) { q.push(node->left); } if (node->right) { q.push(node->right); } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 1 /  2 3 /   8 9 6 /   4 5 7 1 2 3 4 5 6 7 题号 1 2 3 4 5 6 7 8 9 10 答案`,
            options: [
                "1 2 8 9 4 5 3 6 7",
                "1 3 2 6 9 8 7 5 4",
                "1 2 3 8 9 6 4 5 7",
                "1 2 3 6 8 9 4 5 7",
],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 1 2 8 9 4 5 3 6 7**：错误。
            - **B 1 3 2 6 9 8 7 5 4**：错误。
            - **C 1 2 3 8 9 6 4 5 7**：正确答案。
            - **D 1 2 3 6 8 9 4 5 7**：错误。

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
            question: `以下关于动态规划的描述，（ ）是正确的。`,
            options: [
                "动态规划适用于没有重叠子问题的优化问题。",
                "动态规划要求问题具有最优子结构和无后效性。",
                "动态规划通常通过递归来实现。",
                "动态规划与贪⼼算法不同，贪⼼算法不适用于有重叠子问题的问题。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 动态规划适用于没有重叠子问题的优化问题。**：错误。动态规划的状态或转移方程有误，请检查边界初始化。
            - **B 动态规划要求问题具有最优子结构和无后效性。**：正确答案。
            - **C 动态规划通常通过递归来实现。**：错误。动态规划的状态或转移方程有误，请检查边界初始化。
            - **D 动态规划与贪⼼算法不同，贪⼼算法不适用于有重叠子问题的问题。**：错误。动态规划的状态或转移方程有误，请检查边界初始化。

            **考点：** 动态规划
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
            question: `假设背包的最大容量 ，共有有 个物品可供选择， 4 个物品的重量分别为 ，对应 的价值分别为 ，则该 0/1 背包问题中，背包的最大价值为（ ）。`,
            options: [
                "70",
                "90",
                "100",
                "120",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 70**：错误。该数值与正确计算结果不符，请重新验算。
            - **B 90**：错误。该数值与正确计算结果不符，请重新验算。
            - **C 100**：正确答案。
            - **D 120**：错误。该数值与正确计算结果不符，请重新验算。

            **考点：** 动态规划
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
            question: `构造函数是一种特殊的类成员函数，构造函数的名称和类名相同。但通过函数重载，可以创建多个同名的构 造函数，条件是每个构造函数的参数列表不同。`,
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
            question: `类的静态成员函数既能访问类的静态数据成员，也能访问非静态数据成员。`,
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
            id: 18,
            type: "judge",
            question: `栈中元素的插入和删除操作都在栈的顶端进⾏，所以方便用单向链表实现。`,
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
            id: 19,
            type: "judge",
            question: `下面代码构建的树一定是完全二叉树： struct TreeNode { int value; TreeNode* left; TreeNode* right; }; TreeNode* buildCompleteBinaryTree() { TreeNode* root = new TreeNode{1}; root->left = new TreeNode{2}; root->right = new TreeNode{3}; root->left->left = new TreeNode{4}; root->left->right = new TreeNode{5}; root->right->left = new TreeNode{6}; return root; 1 2 3 4 5 6 7 8 9 10 11 12 13 14`,
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
            question: `在二叉排序树中，左子树所有节点的值都大于根节点的值，右子树所有节点的值都小于根节点的值。`,
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
            question: `在生成一个派生类的对象时，只调用派生类的构造函数。`,
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
            id: 22,
            type: "judge",
            question: `下面的代码实现了二叉树的前序遍历，它通过递归方法访问每个节点并打印节点值。`,
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
            question: `宽度优先搜索算法（ BFS ）保证了每个节点在最短路径的情况下被访问。`,
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
            id: 24,
            type: "judge",
            question: `在解决简单背包问题时，动态规划的状态转移方程如下： 该方程表⽰：在考虑第 i 个物品时，当前背包容量为 w，如果不放物品 i，则最大价值是 dp[i-1][w]；如果 放入物品 i，则最大价值是 dp[i-1][w-weights[i-1]]+values[i-1]，其中数组weights和values分 别表⽰所有物品的重量和价值，数组下标从0开始。`,
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
            id: 25,
            type: "judge",
            question: `栈中元素的插入和删除操作都在栈的顶端进⾏，所以方便用双向链表比单向链表更合适表实现。`,
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
        ...programmingQuestions
    ]
};
