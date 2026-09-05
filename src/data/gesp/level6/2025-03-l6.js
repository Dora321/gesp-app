// 2025年3月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3
1 3
2 3`, output: `2 2 1` },
        { input: `4
1 3
3 2
4 3`, output: `3 3 1 3` }
      ],
      question: `
# [GESP202503 六级] 树上漫步

## 题目描述

小 A 有一棵 $n$ 个结点的树，这些结点依次以 $1,2,\\cdots,n$ 标号。

小 A 想在这棵树上漫步。具体来说，小 A 会从树上的某个结点出发，每一步可以移动到与当前结点相邻的结点，并且小 A 只会在偶数步（可以是零步）后结束漫步。

现在小 A 想知道，对于树上的每个结点，从这个结点出发开始漫步，经过偶数步能结束漫步的结点有多少个（可以经过重复的节点）。

## 输入格式

第一行，一个正整数 $n$。

接下来 $n-1$ 行，每行两个整数 $u_i,v_i$，表示树上有一条连接结点 $u_i$ 和结点 $v_i$ 的边。

## 输出格式

一行，$n$ 个整数。第 $i$ 个整数表示从结点 $i$ 出发开始漫步，能结束漫步的结点数量。
`,
      score: 25,
      explanation: `**解析：**
      树是二分图，把点按深度奇偶染成两色。走偶数步不会改变所在颜色，而且树上任意同色两点之间的距离都是偶数，所以从某点出发偶数步可达的点恰好是与它同色的全部节点。

      **考点：** 树、二分图
      `,
      tags: ["编程题", "树", "二分图"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<vector<int>> g(n+1);\n    for (int i = 0; i < n-1; ++i) {\n        int u, v;\n        cin >> u >> v;\n        g[u].push_back(v);\n        g[v].push_back(u);\n    }\n\n    vector<int> color(n+1, -1);\n    queue<int> q;\n    q.push(1);\n    color[1] = 0;\n    long long cnt[2] = {1, 0};\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        for (int v : g[u]) {\n            if (color[v] == -1) {\n                color[v] = color[u] ^ 1;\n                ++cnt[color[v]];\n                q.push(v);\n            }\n        }\n    }\n\n    for (int i = 1; i <= n; ++i) {\n        if (i > 1) cout << ' ';\n        cout << cnt[color[i]];\n    }\n    cout << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `4
-1 2 3 0`, output: `5` },
        { input: `5
-3 4 -5 1 3`, output: `5` }
      ],
      question: `
# [GESP202503 六级] 环线

## 题目描述

小 A 喜欢坐地铁。地铁环线有 $n$ 个车站，依次以 $1,2,\\cdots,n$ 标号。车站 $i\\ (1\\leq i \\le n)$

## 输入格式

第一行，一个正整数 $n$，表示车站的数量。

第二行，$n$ 个整数 $a_i$，分别表示经过每个车站时获得的快乐值。

## 输出格式

一行，一个整数，表示小 A 能获得的最大快乐值。
`,
      score: 25,
      explanation: `**解析：**
      在环上等价于求长度介于 1 到 n 之间的最大连续子段和。把数组复制一遍，做前缀和，再用单调队列维护最近 n 个前缀和中的最小值即可。

      **考点：** 前缀和、单调队列
      `,
      tags: ["编程题", "前缀和", "单调队列"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<long long> a(2 * n+1), pre(2 * n+1, 0);\n    for (int i = 1; i <= n; ++i) {\n        cin >> a[i];\n        a[i+n] = a[i];\n    }\n    for (int i = 1; i <= 2 * n; ++i) pre[i] = pre[i-1]+a[i];\n\n    deque<int> dq;\n    dq.push_back(0);\n    long long ans = LLONG_MIN;\n    for (int i = 1; i <= 2 * n; ++i) {\n        while (!dq.empty() && dq.front() < i-n) dq.pop_front();\n        ans = max(ans, pre[i]-pre[dq.front()]);\n        while (!dq.empty() && pre[dq.back()] >= pre[i]) dq.pop_back();\n        dq.push_back(i);\n    }\n    cout << ans << '\\n';\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2025-03-l6',
    title: '2025年3月 GESP C++ 六级真题',
    level: 6,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `在面向对象编程中，类是一种重要的概念。下面关于类的描述中，不正确的是（ ）。`,
            options: [
                "类是一个抽象的概念，用于描述具有相同属性和行为的对象集合。",
                "类可以包含属性和方法，属性用于描述对象的状态，方法用于描述对象的行为。",
                "类可以被实例化，生成具体的对象。",
                "类一旦定义后，其属性和方法不能被修改或扩展。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 类是一个抽象的概念，用于描述具有相同属性和行为的对象集合。**：不是本题答案。
            - **B 类可以包含属性和方法，属性用于描述对象的状态，方法用于描述对象的行为。**：不是本题答案。
            - **C 类可以被实例化，生成具体的对象。**：不是本题答案。
            - **D 类一旦定义后，其属性和方法不能被修改或扩展。**：正确答案。

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
            question: `哈夫曼编码是一种数据压缩算法。以下关于哈夫曼编码的描述中，不正确的是（ ）。`,
            options: [
                "哈夫曼编码是一种变长编码，频率高的字符使用较短的编码，频率低的字符使用较长的编码。",
                "在构造哈夫曼树时，频率越低的字符离根节点越近，频率越高的字符离根节点越远。",
                "哈夫曼编码的生成过程基于贪心算法，每次选择频率最低的两个节点进行合并。",
                "哈夫曼编码是一种前缀编码，任何一个字符的编码都不会是另一个字符编码的前缀，因此可以实现唯一解 码。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 哈夫曼编码是一种变长编码，频率高的字符使用较短的编码，频率低的字符使用较长的编码...**：不是本题答案。
            - **B 在构造哈夫曼树时，频率越低的字符离根节点越近，频率越高的字符离根节点越远。**：正确答案。
            - **C 哈夫曼编码的生成过程基于贪心算法，每次选择频率最低的两个节点进行合并。**：不是本题答案。
            - **D 哈夫曼编码是一种前缀编码，任何一个字符的编码都不会是另一个字符编码的前缀，因此可...**：不是本题答案。


            **考点：** 哈夫曼编码

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
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `以下代码实现了树的哪种遍历方式？`,
            options: [
                "前序遍历",
                "中序遍历",
                "后序遍历",
                "层次遍历",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 前序遍历**：正确答案。
            - **B 中序遍历**：不是本题答案。
            - **C 后序遍历**：不是本题答案。
            - **D 层次遍历**：不是本题答案。

            **考点：** 树与二叉树
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
            question: `以下关于完全二叉树的代码描述，正确的是（ ）。 void traverse(TreeNode* root) { if (root == nullptr) return; cout << root->val << " "; traverse(root->left); traverse(root->right); } 1 2 3 4 5 6 bool isCompleteTree(TreeNode* root) {1`,
            options: [
                "该代码用于判断一棵树是否为满二叉树",
                "该代码用于判断一棵树是否为完全二叉树",
                "该代码用于判断一棵树是否为二叉搜索树",
                "该代码用于计算树的高度",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 该代码用于判断一棵树是否为满二叉树**：不是本题答案。
            - **B 该代码用于判断一棵树是否为完全二叉树**：正确答案。
            - **C 该代码用于判断一棵树是否为二叉搜索树**：不是本题答案。
            - **D 该代码用于计算树的高度**：不是本题答案。

            **考点：** 树与二叉树、指针
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
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `以下代码实现了二叉排序树的哪种操作？`,
            options: [
                "查找",
                "插入",
                "删除",
                "遍历",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 查找**：不是本题答案。
            - **B 插入**：正确答案。
            - **C 删除**：不是本题答案。
            - **D 遍历**：不是本题答案。

            **考点：** 树与二叉树
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
            question: `给定字符集 {A, B, C, D} 的出现频率分别为 {5, 1, 6, 2}，则正确的哈夫曼编码是（ ）。`,
            options: [
                "A: 0, B: 100, C: 11, D: 101",
                "A: 11, B: 100, C: 0, D: 101",
                "A: 0, B: 101, C: 11, D: 100",
                "A: 10, B: 101, C: 0, D: 100",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A A: 0, B: 100, C: 11, D: 101**：不是本题答案。
            - **B A: 11, B: 100, C: 0, D: 101**：正确答案。
            - **C A: 0, B: 101, C: 11, D: 100**：不是本题答案。
            - **D A: 10, B: 101, C: 0, D: 100**：不是本题答案。


            **考点：** 哈夫曼编码

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
            question: `关于动态规划的描述，正确的是（ ）。`,
            options: [
                "动态规划算法的时间复杂度总是低于贪心算法。",
                "动态规划要求问题必须具有最优子结构和重叠子问题两个性质。",
                "动态规划通过递归实现时不需要存储中间结果。",
                "动态规划的核心思想是将问题分解为互不重叠的子问题。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 动态规划算法的时间复杂度总是低于贪心算法。**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。
            - **B 动态规划要求问题必须具有最优子结构和重叠子问题两个性质。**：正确答案。
            - **C 动态规划通过递归实现时不需要存储中间结果。**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。
            - **D 动态规划的核心思想是将问题分解为互不重叠的子问题。**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。

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
            question: `以下代码中，类的构造函数被调用了（ ）次。`,
            options: [
                "1",
                "2",
                "3",
                "0",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 1**：正确答案。
            - **B 2**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **C 3**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **D 0**：不是本题答案。该数值与正确计算结果不符，请重新验算。


            **考点：** 面向对象

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
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `以下代码实现了循环队列的哪种操作？`,
            options: [
                "入队",
                "出队",
                "查看队首元素",
                "判断队列是否为空",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 入队**：正确答案。
            - **B 出队**：不是本题答案。
            - **C 查看队首元素**：不是本题答案。
            - **D 判断队列是否为空**：不是本题答案。对队列的先进先出特性或循环队列满判断理解有误。

            **考点：** 队列
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
            question: `以下代码实现了二叉树的深度优先搜索（ DFS ），并统计叶子结点的数量，则横线上应填写（ ）。`,
            options: [
                "if (node->left) s.push(node->left);",
                "if (node->left) s.pop(node->left);",
                "if (node->left) s.front(node->left);",
                "if (node->left) s.push(node->right);",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A if (node->left) s.push(node->left);**：正确答案。
            - **B if (node->left) s.pop(node->left);**：不是本题答案。
            - **C if (node->left) s.front(node->left);**：不是本题答案。
            - **D if (node->left) s.push(node->right);**：不是本题答案。

            **考点：** 树与二叉树、栈、指针
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
            question: `以下代码实现了二叉树的广度优先搜索（ BFS ），并查找特定值的节点，则横线上应填写（ ）。`,
            options: [
                "if (current->left) q.push(current->left); if (current->right) q.push(current->right);",
                "if (current->left) q.pop(current->left); if (current->right) q.pop(current->right);",
                "if (current->left) q.front(current->left); if (current->right) q.front(current->right);",
                "if (current->left) q.push(current->right); if (current->right) q.push(current->left);",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A if (current->left) q.push(current->left)...**：正确答案。
            - **B if (current->left) q.pop(current->left);...**：错误。
            - **C if (current->left) q.front(current->left...**：错误。
            - **D if (current->left) q.push(current->right...**：错误。

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
            question: `以下代码用于生成 位格雷编码。横线上应填写（ ）。`,
            options: [
                "result.push_back(\"1\"+prev[i]);",
                "result.push_back(\"0\"+prev[i]);",
                "result.push_back(prev[i]+\"1\");",
                "result.push_back(prev[i]+\"0\");",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A result.push_back(\\**：正确答案。
            - **B result.push_back(\\**：不是本题答案。
            - **C result.push_back(prev[i]+\\**：不是本题答案。
            - **D result.push_back(prev[i]+\\**：不是本题答案。

            **考点：** STL容器
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
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `以下代码实现了 0/1 背包问题的动态规划解法。假设物品重量为 weights[]，价值为 values[]，背包容量为 W，横线上应填写（ ）。`,
            options: [
                "dp[i-1][j], values[i-1]",
                "dp[i-1][j], dp[i-1][j-weights[i-1]]+values[i-1]",
                "dp[i][j-1], values[i-1]",
                "dp[i-1][j-weights[i-1]]+values[i-1], dp[i][j-1]",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A dp[i-1][j], values[i-1]**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。
            - **B dp[i-1][j], dp[i-1][j-weights[i-1]]+valu...**：正确答案。
            - **C dp[i][j-1], values[i-1]**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。
            - **D dp[i-1][j-weights[i-1]]+values[i-1], dp[...**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。

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
            question: `以下代码用于检查字符串中的括号是否匹配，横线上应填写（ ）。`,
            options: [
                "true",
                "false",
                "st.empty()",
                "!st.empty()",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A true**：不是本题答案。
            - **B false**：不是本题答案。
            - **C st.empty()**：正确答案。
            - **D !st.empty()**：不是本题答案。

            **考点：** 栈
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
            question: `关于下面代码，说法错误的是（ ）。`,
            options: [
                "语句Shape* shapePtr = &circle;和shapePtr = &rectangle;出现编译错误",
                "Shape为基类， Circle 和 Rectangle是派生类",
                "通过继承，Circle 和 Rectangle 复用了 Shape 的属性和方法，并扩展了新的功能",
                "Circle 和 Rectangle通过重写（ override ）基类的虚函数area和基类指针，实现了运行时多态",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 语句Shape* shapePtr = &circle;和shapePtr = ...**：正确答案。
            - **B Shape为基类， Circle 和 Rectangle是派生类**：不是本题答案。
            - **C 通过继承，Circle 和 Rectangle 复用了 Shape 的属性和方法...**：不是本题答案。
            - **D Circle 和 Rectangle通过重写（ override ）基类的虚函数...**：不是本题答案。

            **考点：** 指针、面向对象
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
            question: `哈夫曼树在构造过程中，每次合并权值最小的两个节点，最终生成的树带权路径长度最小。`,
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

            **考点：** 哈夫曼编码
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
            question: `格雷编码的相邻两个编码之间必须有多位不同，以避免数据传输错误。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **纠错：** 原命题说法有误。本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

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
            id: 18,
            type: "judge",
            question: `在树的深度优先搜索（ DFS ）中，使用队列作为辅助数据结构以实现 “ 先进后出 ” 的访问顺序。`,
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
            id: 19,
            type: "judge",
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `以下代码实现的是二叉树的中序遍历。`, 
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

            **考点：** 树与二叉树
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
            question: `C++ 支持构造函数重载，但默认无参数的构造函数只能有一个。`,
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
            id: 21,
            type: "judge",
            question: `二叉排序树（ BST ）中，若某节点的左子树为空，则该节点一定是树中的最小值节点。`,
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

            **考点：** 树与二叉树
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
            question: `在动态规划解决一维硬币找零问题时，若硬币面额为 [1, 3, 4]，目标金额为 6，则最少需要 2 枚硬币 （ 3+3 ）。`,
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
            id: 23,
            type: "judge",
            question: `面向对象编程中，封装是指将数据和行为绑定在一起，并对外隐藏实现细节。`,
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
            question: `以下代码创建的树是一棵完全二叉树：`,
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

            **考点：** 树与二叉树
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
            question: `栈和队列均可以用双向链表实现，插入和删除操作的时间复杂度为 $O(1)$ 。`,
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
