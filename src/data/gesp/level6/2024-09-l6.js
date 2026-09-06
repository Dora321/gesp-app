// 2024年9月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `18`, output: `2` }
      ],
      question: `
# [GESP202409 六级] 小杨和整数拆分

## 题目描述

小杨有一个正整数 $n$，小杨想将它拆分成若干完全平方数的和，同时小杨希望拆分的数量越少越好。

编程计算总和为 $n$ 的完全平方数的最小数量。

## 输入格式

输入只有一行一个正整数 $n$。

## 输出格式

输出一行一个整数表示答案。
`,
      score: 25,
      explanation: `**解析：**
      这是“最少完全平方数分拆”。先用四平方定理：答案一定在 1~4 之间；依次判断是否本身是平方数、是否可写成两个平方数之和，再用 Legendre 三平方定理判断是否必须是 4，否则就是 3。

      **考点：** 动态规划
      `,
      tags: ["编程题", "动态规划"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nstatic bool isSquare(long long x) {\n    long long r = sqrtl((long double)x);\n    while (r * r < x) ++r;\n    while (r * r > x) --r;\n    return r * r == x;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    cin >> n;\n    if (isSquare(n)) {\n        cout << 1 << '\\n';\n        return 0;\n    }\n    for (long long i = 1; i * i <= n; ++i) {\n        if (isSquare(n-i * i)) {\n            cout << 2 << '\\n';\n            return 0;\n        }\n    }\n    long long x = n;\n    while (x % 4 == 0) x /= 4;\n    if (x % 8 == 7) cout << 4 << '\\n';\n    else cout << 3 << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3 5 10
1 1 2 3 3
9 1 10 10 1`, output: `4` },
        { input: `2 4 10
1 1 1 2
1 2 7 10`, output: `-1` }
      ],
      question: `
# [GESP202409 六级] 算法学习

## 题目描述

小杨计划学习 $m$ 种算法，为此他找了 $n$ 道题目来帮助自己学习，每道题目最多学习一次。

小杨对于 $m$ 种算法的初始掌握程度均为 $0$。第 $i$ 道题目有对应的知识点 $a_i$，即学习第 $i$ 道题目可以令小杨对第 $a_i$ 种算法的掌握程度提高 $b_i$。小杨的学习目标是对于 $m$ 种算法的掌握程度均至少为 $k$。

小杨认为连续学习两道相同知识点的题目是不好的，小杨想请你编写程序帮他计算出他最少需要学习多少道题目才能使得他在完成学习目标的同时避免连续学习两道相同知识点的题目。

## 输入格式

第一行三个正整数 $m, n, k$，代表算法种类数，题目数和目标掌握程度。 
第二行 $n$ 个正整数 $a_1, a_2, ..., a_n$，代表每道题目的知识点。 
第三行 $n$ 个正整数 $b_1, b_2, ..., b_n$，代表每道题目提升的掌握程度。

## 输出格式

输出一个整数，代表小杨最少需要学习题目的数量，如果不存在满足条件的方案，输出 -1。
`,
      score: 25,
      explanation: `**解析：**
      先对每个知识点把题目价值从大到小排序，求出达到总掌握度至少 k 所需的最少题数 need_i。若某个知识点总和都不足 k，则无解。随后还要满足“相邻题知识点不同”，等价于所选题目能重排为相邻不同；若最大 need_i 过大，就必须从其他知识点再补选一些题直到 maxCnt <= total-maxCnt+1。

      **考点：** 贪心、排序
      `,
      tags: ["编程题", "贪心", "排序"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int m, n;\n    long long k;\n    cin >> m >> n >> k;\n    vector<int> c(n);\n    for (int i = 0; i < n; ++i) cin >> c[i];\n    vector<long long> v(n);\n    for (int i = 0; i < n; ++i) cin >> v[i];\n\n    vector<vector<long long>> groups(m+1);\n    for (int i = 0; i < n; ++i) groups[c[i]].push_back(v[i]);\n\n    vector<int> need(m+1, 0), extra(m+1, 0);\n    long long total = 0;\n    int mx = 0, who = -1;\n    for (int i = 1; i <= m; ++i) {\n        auto &g = groups[i];\n        sort(g.begin(), g.end(), greater<long long>());\n        long long sum = 0;\n        while (need[i] < (int)g.size() && sum < k) {\n            sum += g[need[i]];\n            ++need[i];\n        }\n        if (sum < k) {\n            cout << -1 << '\\n';\n            return 0;\n        }\n        extra[i] = (int)g.size()-need[i];\n        total += need[i];\n        if (need[i] > mx) {\n            mx = need[i];\n            who = i;\n        }\n    }\n\n    long long others = total-mx;\n    long long needMore = max(0LL, 2LL * mx-others-1-mx); // extra items needed outside dominant color\n    long long available = 0;\n    for (int i = 1; i <= m; ++i) if (i != who) available += extra[i];\n    if (needMore > available) {\n        cout << -1 << '\\n';\n        return 0;\n    }\n    cout << total+needMore << '\\n';\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2024-09-l6',
    title: '2024年9月 GESP C++ 六级真题',
    level: 6,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `以下（ ）没有涉及 C++ 语言的面向对象特性支持。`,
            options: [
                "C++ 中构造一个 class 或 struct",
                "C++ 中调用 printf 函数",
                "C++ 中调用用户定义的类成员函数",
                "C++ 中构造来源于同一基类的多个派生类",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A C++ 中构造一个 class 或 struct**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **B C++ 中调用 printf 函数**：正确答案。
            - **C C++ 中调用用户定义的类成员函数**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **D C++ 中构造来源于同一基类的多个派生类**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。

            **考点：** 结构体、面向对象
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
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `关于以下 C++ 代码，（ ）行代码会引起编译错误。`,
            options: [
                "Line 1",
                "Line 2",
                "Line 3 #include <iostream> using namespace std; class Base { private: int a; protected: int b; public: int c; Base() : a(1), b(2), c(3) {} }; class Derived : public Base { public: void show() { cout << a << endl; // Line 1 cout << b << endl; // Line 2 cout << c << endl; // Line 3 } }; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21",
                "没有编译错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A Line 1**：正确答案。
            - **B Line 2**：不是本题答案。
            - **C Line 3 #include <iostream> using namespa...**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **D 没有编译错误**：不是本题答案。

            **考点：** 面向对象
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
            question: `有 6 个元素，按照 6,5,4,3,2,1 的顺序进入栈 S ，下列（ ）的出栈序列是不能出现的（ ）。`,
            options: [
                "5,4,3,6,1,2",
                "4,5,3,1,2,6",
                "3,4,6,5,2,1",
                "2,3,4,1,5,6",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 5,4,3,6,1,2**：不是本题答案。
            - **B 4,5,3,1,2,6**：不是本题答案。
            - **C 3,4,6,5,2,1**：正确答案。
            - **D 2,3,4,1,5,6**：不是本题答案。

            **考点：** 栈
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
            question: `采用如下代码实现检查输入的字符串括号是否匹配，横线上应填入的代码为（ ）。`,
            options: [
                "top = st.top(); st.pop();",
                "st.pop(); top = st.top();",
                "st.pop(); top = st.front();",
                "top = st.front(); st.pop();",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A top = st.top(); st.pop();**：正确答案。
            - **B st.pop(); top = st.top();**：不是本题答案。
            - **C st.pop(); top = st.front();**：不是本题答案。
            - **D top = st.front(); st.pop();**：不是本题答案。

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
            sourceIntegrity: "missing-formula",
            integrityNote: "原卷此题的公式或数值在文本提取时丢失，题干留下空档，仅凭当前内容无法作答。本题已排除出计分与考点练习，待补齐原卷公式后恢复。",
            question: `下面代码判断队列的第一个元素是否等于 ，并删除该元素，横向上应填写（ ）。 #include <iostream> #include <stack> #include <string> using namespace std; bool is_valid(string s) { stack<char> st; char top; for (char& ch : s) { if (ch == '(' || ch == '{' || ch == '[') { st.push(ch); // 左括号入栈 } else { if (st.empty()) return false; ———————————————————————— // 在此处填入代码 if ((ch == ')' && top != '(') || (ch == '}' && top != '{') || (ch == ']' && top != '[')) { return false; } } } return st.empty(); // 栈为空则说明所有括号匹配成功 } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29`,
            options: [
                "is_equal = (q.front() == a);",
                "is_equal = (q.front() == a); q.pop();",
                "q.pop(); is_equal = (q.front() == a);",
                "q.pop(); is_equal = (q.top() == a);",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A is_equal = (q.front() == a);**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **B is_equal = (q.front() == a); q.pop();**：正确答案。
            - **C q.pop(); is_equal = (q.front() == a);**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **D q.pop(); is_equal = (q.top() == a);**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。

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
            question: `假设字母表{a,b,c,d,e}在字符串出现的频率分别为 10% ， 15% ， 30% ， 16% ， 29% 。若使用哈夫曼编码方 式对字母进行二进制编码，则字符abcdef分别对应的一组哈夫曼编码的长度分别为（ ）。`,
            options: [
                "4, 4, 1, 3, 2",
                "3, 3, 2, 2, 2",
                "3, 3, 1, 2, 1",
                "4, 4, 1, 2, 2",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 4, 4, 1, 3, 2**：不是本题答案。
            - **B 3, 3, 2, 2, 2**：正确答案。
            - **C 3, 3, 1, 2, 1**：不是本题答案。
            - **D 4, 4, 1, 2, 2**：不是本题答案。

            **考点：** 进制转换
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
            question: `以下 C++ 代码实现 位的格雷码，则横线上应填写（ ）。 #include <iostream> #include <queue> using namespace std; bool is_front_equal(std::queue<int>& q, int a) { bool is_equal = false; if (!q.empty()) { ———————————————————————— // 在此处填入代码 } return is_equal; } 1 2 3 4 5 6 7 8 9 10 11 #include <iostream> #include <vector> #include <string> using namespace std; // 生成 n 位的格雷码 vector<string> generate_graycode(int n) { vector<string> graycode_list; if (n <= 0) { return graycode_list; } // 初始 1 位格雷码 graycode_list.push_back("0"); graycode_list.push_back("1"); // 迭代生成 n 位的格雷码 for (int i = 2; i <= n; i++) { int current_size = graycode_list.size(); for (int j = current_size-1; j >= 0; j--) { graycode_list.push_back("1"+graycode_list[j]); } for (int j = 0; j < current_size; j++) { 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24`,
            options: [
                "graycode_list.push_back(\"0\"+graycode_list[j]);",
                "graycode_list[j] = \"0\"+graycode_list[j];",
                "graycode_list.push_back(\"1\"+graycode_list[j]);",
                "graycode_list[j] = \"1\"+graycode_list[j];",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A graycode_list.push_back(\\**：不是本题答案。
            - **B graycode_list[j] = \\**：正确答案。
            - **C graycode_list.push_back(\\**：不是本题答案。
            - **D graycode_list[j] = \\**：不是本题答案。

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
            question: `给定一棵二叉树，其前序遍历结果为： ABDECFG, 中序遍历结果为： DEBACFG ，则这棵树的正确后序遍历 结果是（ ）。`,
            options: [
                "EDBGFCA",
                "EDGBFCA",
                "DEBGFCA",
                "DBEGFCA",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A EDBGFCA**：正确答案。
            - **B EDGBFCA**：不是本题答案。
            - **C DEBGFCA**：不是本题答案。
            - **D DBEGFCA**：不是本题答案。

            **考点：** 树与二叉树
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
            sourceIntegrity: "missing-formula",
            integrityNote: "原卷此题的公式或数值在文本提取时丢失，题干留下空档，仅凭当前内容无法作答。本题已排除出计分与考点练习，待补齐原卷公式后恢复。",
            question: `一棵有 个结点的完全二叉树用数组进行存储与表示，已知根结点存储在数组的第 个位置。若存储在数组第 个位置的结点存在兄弟结点和两个子结点，则它的兄弟结点和右子结点的位置分别是（ ）。`,
            options: [
                "8, 18",
                "10, 18",
                "8, 19",
                "10, 19",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 8, 18**：不是本题答案。
            - **B 10, 18**：不是本题答案。
            - **C 8, 19**：正确答案。
            - **D 10, 19**：不是本题答案。

            **考点：** 数组
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
            question: `二叉树的深度定义为从根结点到叶结点的最长路径上的结点数，则以下基于二叉树的深度优先搜索实现的 深度计算函数中横线上应填写（ ）。 ———————————————————————— // 在此处填入代码 } } return graycode_list; } 25 26 27 28 29 30 // 定义二叉树的结点结构 struct tree_node { int val; tree_node* left; tree_node* right; tree_node(int x) : val(x), left(nullptr), right(nullptr) {} }; // 计算二叉树的深度 int max_depth(tree_node* root) { if (root == nullptr) { return 0; // 如果根结点为空，则深度为 0 } int left_depth = max_depth(root->left); int right_depth = max_depth(root->right); 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17`,
            options: [
                "return left_depth+right_depth;",
                "return max(left_depth, right_depth);",
                "return max(left_depth, right_depth)+1;",
                "return left_depth+right_depth+1;",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A return left_depth+right_depth;**：不是本题答案。
            - **B return max(left_depth, right_depth);**：不是本题答案。
            - **C return max(left_depth, right_depth)+1;**：正确答案。
            - **D return left_depth+right_depth+1;**：不是本题答案。

            **考点：** 树与二叉树、结构体、指针
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
            question: `上一题的二叉树深度计算还可以采用二叉树的广度优先搜索来实现。以下基于二叉树的广度优先搜索实现 的深度计算函数中横线上应填写（ ）。`,
            options: [
                "int level_size = q.size(); depth++;",
                "int level_size = 2; depth++;",
                "int level_size = q.size(); depth += level_size;",
                "int level_size = 2; depth += level_size;",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A int level_size = q.size(); depth++;**：正确答案。
            - **B int level_size = 2; depth++;**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **C int level_size = q.size(); depth += leve...**：不是本题答案。
            - **D int level_size = 2; depth += level_size;**：不是本题答案。

            **考点：** 树与二叉树、队列、指针
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
            question: `二叉搜索树中的每个结点，其左子树的所有结点值都小于该结点值，右子树的所有结点值都大于该结点 值。以下代码对给定的整数数组 ( 假设数组中没有数值相等的元素 ) ，构造一个对应的二叉搜索树，横线上应填写（ ） : ———————————————————————— // 在此处填入代码 } 18 19 20 #include <queue> int max_depth_bfs(tree_node* root) { if (root == nullptr) { return 0; // 如果树为空，深度为 0 } queue <tree_node*> q; q.push(root); int depth = 0; // 使用队列进行层序遍历 while (!q.empty()) { ———————————————————————— // 在此处填入代码 for (int i = 0; i < level_size; ++i) { tree_node* node = q.front(); q.pop(); if (node->left) { q.push(node->left); } if (node->right) { q.push(node->right); } } } return depth; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29`,
            options: [
                "int level_size = q.size(); depth++;",
                "int level_size = q.size();",
                "depth++;",
                "int level_size = 1; depth++;",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A int level_size = q.size(); depth++;**：正确答案。
            - **B int level_size = q.size();**：错误。
            - **C depth++;**：错误。
            - **D // 定义二叉树的结点结构 struct tree_node { int val...**：错误。数组下标从 0 开始，请仔细验证下标范围。

            **考点：** 队列
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
            question: `对上题中的二叉搜素树，当输入数组为 时，构建二叉搜索树，并采用如下代码实现的遍历方式，得到 的输出是（ ）。`,
            options: [
                "3 1 2 5 4 6",
                "1 2 3 4 5 6",
                "6 5 4 3 2 1",
                "1 3 5 2 4 6",
],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 3 1 2 5 4 6**：错误。
            - **B 1 2 3 4 5 6**：正确答案。
            - **C 6 5 4 3 2 1**：错误。
            - **D 1 3 5 2 4 6**：错误。

            **考点：** 数组
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
            question: `动态规划通常用于解决（ ）。`,
            options: [
                "无法分解的问题",
                "可以分解成相互依赖的子问题的问题",
                "可以通过贪心算法解决的问题",
                "只能通过递归解决的问题",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 无法分解的问题**：不是本题答案。
            - **B 可以分解成相互依赖的子问题的问题**：正确答案。
            - **C 可以通过贪心算法解决的问题**：不是本题答案。
            - **D 只能通过递归解决的问题**：不是本题答案。

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
            question: `阅读以下用动态规划解决的 0-1 背包问题的函数。假设背包容量 \`W\` 为 10kg，输入 4 个物品的重量 \`weights\` 分别为 1、3、4、6（单位为 kg），每个物品对应的价值 \`values\` 分别为 20、30、50、60，则函数的输出为（ ）。

\`\`\`cpp
#include <iostream>
#include <vector>
using namespace std;

// 0/1 背包问题
int knapsack(int W, const vector<int>& weights,
             const vector<int>& values, int n) {
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; ++i) {
        for (int w = 0; w <= W; ++w) {
            if (weights[i - 1] <= w) {
                dp[i][w] = max(dp[i - 1][w],
                               dp[i - 1][w - weights[i - 1]]
                                   + values[i - 1]);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    return dp[n][W];
}
\`\`\``,
            options: [
                "90",
                "100",
                "110",
                "140",
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：C（110）**

**推导过程：**

容量为 10。四件物品为 \`(重量, 价值) = (1,20)、(3,30)、(4,50)、(6,60)\`。比较主要可行组合：

- 选重量 4 和 6：总重量 10，总价值 110；
- 选重量 1、3 和 4：总重量 8，总价值 100；
- 选重量 3 和 6：总重量 9，总价值 90；
- 四件全选的价值虽为 160，但总重量 14，超过容量。

因此最优值是 110。A 和 B 分别只得到次优组合；D 的 140 不对应任何不超过容量 10 的可行组合。

**易错点：** 0-1 背包中每件物品最多选一次；判断组合时必须同时检查总价值与总重量。

**考点：** 动态规划、0-1 背包、状态转移。`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `C++ 、 Python 和 JAVA 等都是面向对象的编程语言。`,
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
            id: 17,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `在 C++ 中，类的静态成员变量只能被该类对象的成员函数访问。`,
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
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `栈是一种线性结构，可通过数组或链表来实现。二者相比，数组实现占用的内存较少，链表实现的入队和出 队操作的时间复杂度较低。`,
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
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `运行以下 C++ 代码，屏幕将输出 “derived class” 。 dp[i][w] = max(dp[i-1][w], dp[i-1][w-weights[i-1]]+values[i-1]); } else { dp[i][w] = dp[i-1][w]; } } } return dp[n][W]; } 12 13 14 15 16 17 18 19 20 21 22 #include <iostream> using namespace std; class base { public: virtual void show() { cout << "base class" << endl; } }; class derived : public base { public: void show() override { cout << "derived class" << endl; } }; int main() { base* b; derived d; b = &d; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21`,
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
            id: 20,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `如下列代码所示的基类（ base ）及其派生类（ derived ），则生成一个派生类的对象时，只调用派生类的构造 函数。`,
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
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
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
            id: 22,
            type: "judge",
            sourceIntegrity: "missing-formula",
            integrityNote: "原卷此题的公式或数值在文本提取时丢失，题干留下空档，仅凭当前内容无法作答。本题已排除出计分与考点练习，待补齐原卷公式后恢复。",
            question: `如果根结点的深度记为 ，则一棵恰有 个叶结点的二叉树的深度最少是 。`,
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
            id: 23,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `在非递归实现的树的广度优先搜索中，通常使用栈来辅助实现。`,
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
            id: 24,
            type: "judge",
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `状态转移方程是动态规划的核心，可以通过递推方式表示问题状态的变化。`,
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
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "本卷 10 道判断题的答案在数据里全部是「正确」，且解析全为占位模板。GESP 真题的判断题对错大致各半，整卷同值几乎可以肯定是答案未录入、被批量填成了默认值。本题已排除出计分与考点练习，待逐题对照官方原卷补录后恢复。",
            question: `应用动态规划算法时，识别并存储重叠子问题的解是必须的。`,
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
        ...programmingQuestions
    ]
};
