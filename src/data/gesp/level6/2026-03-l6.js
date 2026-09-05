// 2026年3月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      title: '路径覆盖',
      problemNumber: 'P15800',
      description: '给定一棵有根树，把若干节点染黑，使树中每条边至少有一个端点是黑点。节点 i 染黑代价为 c_i，求最小总代价。（题面按官方样例校订：原先记录的“叶到根路径覆盖”与样例答案矛盾，按样例反推应为树上最小权点覆盖，待官方 PDF 复核。）',
      inputDescription: '第一行 n。第二行 n-1 个父节点。第三行 n 个代价 c_i。',
      outputDescription: '输出最小总代价。',
      samples: [
        {
          input: '4\n1 2 3\n5 6 2 3',
          output: '7'
        }
      ],
      score: 25,
      explanation: `**解析：**
      树上最小权点覆盖的树形 DP。设 $f[u][1]$ 表示 $u$ 染黑时覆盖 $u$ 子树内所有边的最小代价，$f[u][0]$ 表示 $u$ 不染黑时的最小代价。若 $u$ 不染黑，则它与每个儿子 $v$ 之间的边只能靠 $v$ 覆盖，故 $f[u][0]=\\\\sum f[v][1]$；若 $u$ 染黑，则儿子可黑可不黑，$f[u][1]=c_u+\\\\sum \\\\min(f[v][0],f[v][1])$。答案为 $\\\\min(f[root][0], f[root][1])$。样例中链 $1\\\\!-\\\\!2\\\\!-\\\\!3\\\\!-\\\\!4$ 取 $\\\\{1,3\\\\}$，代价 $5+2=7$。

      **考点：** 树形DP、最小权点覆盖
      `,
      tags: ["编程题", "树形DP"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint n;\nvector<vector<int>> g;\nvector<long long> c;\nvector<array<long long, 2>> dp;\n\nvoid dfs(int u) {\n    dp[u][0] = 0;\n    dp[u][1] = c[u];\n    for (int v : g[u]) {\n        dfs(v);\n        dp[u][0] += dp[v][1];\n        dp[u][1] += min(dp[v][0], dp[v][1]);\n    }\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    cin >> n;\n    g.assign(n + 1, {});\n    for (int i = 2; i <= n; ++i) {\n        int p;\n        cin >> p;\n        g[p].push_back(i);\n    }\n    c.assign(n + 1, 0);\n    for (int i = 1; i <= n; ++i) cin >> c[i];\n    dp.assign(n + 1, {0, 0});\n    dfs(1);\n    cout << min(dp[1][0], dp[1][1]) << '\\n';\n    return 0;\n}",
    },
    {
      id: 27,
      type: 'programming',
      title: '道具商店',
      problemNumber: 'P15801',
      description: '有 n 件道具，第 i 件可提升 a_i 点攻击力，花费 c_i 金币，每件最多买一次。给定金币上限 m，求最大攻击力。',
      inputDescription: '第一行 n,m。接下来 n 行每行两个整数 a_i,c_i。',
      outputDescription: '输出最大攻击力。',
      samples: [
        {
          input: '3 5\n2 2\n3 3\n4 4',
          output: '5'
        }
      ],
      score: 25,
      explanation: `**解析：**
      把“总攻击力”当作背包容量：dp[j] 表示达到总攻击力恰为 $j$ 的最小花费，做一遍 $0/1$ 背包；最后找所有花费不超过 $m$ 的最大 $j$。这样即使金币上限很大、攻击力总和较小，也能稳定求解。

      **考点：** 动态规划、0/1背包
      `,
      tags: ["编程题", "动态规划", "0/1背包"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<pair<int,int>> items(n);\n    int sumAtk = 0;\n    for (int i = 0; i < n; ++i) {\n        int a, c;\n        cin >> a >> c;\n        items[i] = {a, c};\n        sumAtk += a;\n    }\n\n    const int INF = 1e9;\n    vector<int> dp(sumAtk + 1, INF);\n    dp[0] = 0;\n    int cur = 0;\n    for (auto [a, c] : items) {\n        cur += a;\n        for (int j = cur; j >= a; --j) {\n            dp[j] = min(dp[j], dp[j - a] + c);\n        }\n    }\n\n    int ans = 0;\n    for (int j = 0; j <= sumAtk; ++j) {\n        if (dp[j] <= m) ans = j;\n    }\n    cout << ans << '\\n';\n    return 0;\n}",
    }
];

export const paperData = {
    id: '2026-03-l6',
    title: '2026年3月 GESP C++ 六级真题',
    level: 6,
    year: 2026,
    month: 3,
    session: 3,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `在面向对象编程中，下列关于 虚函数 的描述中，错误的是（ ）。`,
            options: [
                "虚函数用于支持运行时多态",
                "通过基类指针调用虚函数时，会根据对象实际类型决定调用版本",
                "构造函数可以声明为虚函数以支持多态",
                "基类析构函数常声明为虚函数以避免资源泄漏",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 虚函数用于支持运行时多态**：正确答案。
            - **B 通过基类指针调用虚函数时，会根据对象实际类型决定调用版本**：不是本题答案。
            - **C 构造函数可以声明为虚函数以支持多态**：不是本题答案。
            - **D 基类析构函数常声明为虚函数以避免资源泄漏**：不是本题答案。

            **考点：** 指针、面向对象
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
            question: `执行如下代码，会输出 钢琴：叮咚叮咚 和 吉他：咚咚当当。这体现了面向对象编程的（ ）特性。`,
            options: [
                "继承",
                "封装",
                "多态",
                "链接",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 继承**：不是本题答案。
            - **B 封装**：正确答案。
            - **C 多态**：不是本题答案。
            - **D 链接**：不是本题答案。

            **考点：** 内存管理、面向对象
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
            question: `关于以下代码，说法正确的是（ ）。`,
            options: [
                "执行代码会输出两行，内容分别为：钢琴：叮咚叮咚 和 吉他：咚咚当当",
                "执行代码会输出两行，内容分别为：乐器在演奏声音 和 乐器在演奏声音",
                "代码编译出现错误",
                "代码运行出现错误",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 执行代码会输出两行，内容分别为：钢琴：叮咚叮咚 和 吉他：咚咚当当**：不是本题答案。
            - **B 执行代码会输出两行，内容分别为：乐器在演奏声音 和 乐器在演奏声音**：不是本题答案。
            - **C 代码编译出现错误**：正确答案。
            - **D 代码运行出现错误**：不是本题答案。

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
            question: `某文本编辑器把用户输入的字符依次压入栈 S 。用户依次输入 A, B, C, D 后，用户按了两次撤销（每次 撤销，弹出栈顶一个字符）。此时栈从栈底到栈顶的内容是：（ ）。`,
            options: [
                "A B",
                "A B C",
                "A B D",
                "B C",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A A B**：正确答案。
            - **B A B C**：不是本题答案。
            - **C A B D**：不是本题答案。
            - **D B C**：不是本题答案。

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
            question: `假设循环队列数组长度为 N，其中队空判断条件为：front == rear，队满判断条件为：(rear+1) % N == front，出队对应的操作为：front = (front+1) % N，入队对于的操作为：rear = (rear+1) % N。循环队列长度 N = 6，初始 front = 1, rear = 1，执行操作序列为：入队 , 入队 , 入队 , 出队 , 入队 , 入队， 则最终 (front, rear) 的值是（ ）。`,
            options: [
                "(2, 5)",
                "(2, 0)",
                "(3, 5)",
                "(3, 0)",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A (2, 5)**：不是本题答案。
            - **B (2, 0)**：不是本题答案。
            - **C (3, 5)**：不是本题答案。
            - **D (3, 0)**：正确答案。

            **考点：** 队列
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
            question: `以下函数 check() 用于判断一棵二叉树是否为（ ）。`,
            options: [
                "满二叉树",
                "完全二叉树",
                "二叉搜索树",
                "平衡二叉树",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 满二叉树**：不是本题答案。
            - **B 完全二叉树**：正确答案。
            - **C 二叉搜索树**：不是本题答案。
            - **D 平衡二叉树**：不是本题答案。

            **考点：** 树与二叉树
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
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `以下代码实现了二叉树的（ ）。`,
            options: [
                "前序遍历",
                "中序遍历",
                "后序遍历",
                "层序遍历",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 前序遍历**：正确答案。
            - **B 中序遍历**：不是本题答案。
            - **C 后序遍历**：不是本题答案。
            - **D 层序遍历**：不是本题答案。

            **考点：** 树与二叉树
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
            question: `下面代码实现了哈夫曼编码，则横线处应填写的代码是（ ）。`,
            options: [
                "先序遍历（根左右）的结果中，最后一个被访问的节点一定是叶子节点",
                "中序遍历（左根右）的结果一定是一个升序序列",
                "层序遍历（广度优先遍历）需要借助队列来实现",
                "后序遍历（左右根）的结果中，第一个被访问的节点一定是根节点",
],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 先序遍历（根左右）的结果中，最后一个被访问的节点一定是叶子节点**：不是本题答案。
            - **B 中序遍历（左根右）的结果一定是一个升序序列**：不是本题答案。
            - **C 层序遍历（广度优先遍历）需要借助队列来实现**：正确答案。
            - **D 后序遍历（左右根）的结果中，第一个被访问的节点一定是根节点**：不是本题答案。

            **考点：** 树与二叉树、深度优先搜索
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
            question: `以下关于哈夫曼编码的说法，正确的是（ ）。`,
            options: [
                "哈夫曼编码是定长编码",
                "哈夫曼编码中，没有任何一个字符的编码是另一个字符编码的前缀",
                "哈夫曼编码一定唯一",
                "哈夫曼编码不能用于数据压缩",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 哈夫曼编码是定长编码**：不是本题答案。
            - **B 哈夫曼编码中，没有任何一个字符的编码是另一个字符编码的前缀**：不是本题答案。
            - **C 哈夫曼编码一定唯一**：不是本题答案。
            - **D 哈夫曼编码不能用于数据压缩**：正确答案。


            **考点：** 哈夫曼编码

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
            question: `以下函数实现了二叉排序树（BST）的（ ）操作。`,
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
            id: 11,
            type: "single",
            question: `下列代码实现了树的深度优先遍历，则横线处应填入（ ）。`,
            options: [
                "if (node->left) st.push(node->left);",
                "if (node->left) st.pop(node->left);",
                "if (node->left) st.front(node->left);",
                "if (node->left) st.push(node->right);",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A if (node->left) st.push(node->left);**：错误。
            - **B if (node->left) st.pop(node->left);**：正确答案。
            - **C if (node->left) st.front(node->left);**：错误。
            - **D if (node->left) st.push(node->right);**：错误。

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
            question: `给定一棵普通二叉树（节点值没有大小规律），下面代码判断是否存在值为 x 的结点，则横线处应填入（ ）。 TreeNode* op(TreeNode* root, int x) { if (!root) return new TreeNode(x); if (x < root->val) root->left = op(root->left, x); else root->right = op(root->right, x); return root; } 1 2 3 4 5 6 7 8 struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x): val(x), left(nullptr), right(nullptr) {} }; void dfs(TreeNode* root) { if (!root) return; stack<TreeNode*> st; st.push(root); while (!st.empty()) { TreeNode* node = st.top(); st.pop(); cout << node->val << " "; if (node->right) st.push(node->right); ________________________ } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 第 7 页 / 共 13 页`,
            options: [
                "q.push(cur);",
                "if (cur->right) q.push(cur->right);",
                "选项C",
                "选项D",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A q.push(cur);**：不是本题答案。
            - **B if (cur->right) q.push(cur->right);**：正确答案。
            - **C 选项C**：不是本题答案。
            - **D 选项D**：不是本题答案。

            **考点：** 树与二叉树、栈、结构体
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
            question: `在二叉排序树（ Binary Search Tree, BST ）中，假设节点值互不相同。给定如下搜索函数，以下说法一定正 确的是（ ）。`,
            options: [
                "最坏情况下，访问结点数是",
                "最坏情况下，访问结点数是",
                "无论如何，访问结点数都不超过树高的一半",
                "一定比在普通二叉树中搜索快",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 最坏情况下，访问结点数是**：不是本题答案。
            - **B 最坏情况下，访问结点数是**：不是本题答案。
            - **C 无论如何，访问结点数都不超过树高的一半**：正确答案。
            - **D 一定比在普通二叉树中搜索快**：不是本题答案。

            **考点：** 树与二叉树
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
            question: `小朋友们去邻里拜年，每个家里有不同数量的糖果。规则是：不能连续进入两个相邻的房子（即不能同时取相邻两家的糖果）。目标是拿到最多糖果。以下是代码实现，请补全横线。

\`\`\`cpp
int visit(vector<int>& nums) {
    if (nums.empty()) {
        return 0;
    }
    int size = nums.size();
    if (size == 1) {
        return nums[0];
    }
    vector<int> dp = vector<int>(size, 0);
    dp[0] = nums[0];
    dp[1] = max(nums[0], nums[1]);

    for (int i = 2; i < size; i++) {
        dp[i] = ______; // 在此处填写代码
    }

    return dp[size - 1];
}
\`\`\``,
            options: [
                "dp[i] = dp[i - 1] + nums[i];",
                "dp[i] = max(dp[i - 1], dp[i - 2] * nums[i]);",
                "dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);",
                "dp[i] = dp[i - 2] + nums[i];",
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：C**

**推导过程：**

令 \`dp[i]\` 表示只考虑第 0 到第 i 家时能拿到的最多糖果。处理第 i 家有两种互斥选择：

- 不进入第 i 家，最优值为 \`dp[i - 1]\`；
- 进入第 i 家，则不能进入第 i - 1 家，最优值为 \`dp[i - 2] + nums[i]\`。

取两者较大值，状态转移为：

\`dp[i] = max(dp[i - 1], dp[i - 2] + nums[i]);\`

A 会把相邻房子的糖果相加；B 错把“累加”写成乘法；D 强制进入第 i 家，忽略“不进入当前房子可能更优”的情况。

**最小验证：** 对 \`nums = [2, 1, 4]\`，\`dp[2] = max(2, 2 + 4) = 6\`，选择第 0、2 家。

**考点：** 动态规划、最优子结构、相邻元素互斥选择。`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `以下关于动态规划的说法中，错误的是（ ）。`,
            options: [
                "动态规划方法通常能够列出递推公式。",
                "动态规划方法的时间复杂度通常为状态的个数。",
                "动态规划方法有递推和递归两种实现形式。",
                "对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 动态规划方法通常能够列出递推公式。**：正确答案。
            - **B 动态规划方法的时间复杂度通常为状态的个数。**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。
            - **C 动态规划方法有递推和递归两种实现形式。**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。
            - **D 对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。**：不是本题答案。动态规划的状态或转移方程有误，请检查边界初始化。

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
            question: `以下代码中，构造函数被调用的次数是 1 次。`,
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
            question: `面向对象编程中，封装是指将数据和操作数据的方法绑定在一起，并对外隐藏实现细节。`,
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
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `以下代码能够正确统计二叉树中叶子结点的数量。`,
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

            **考点：** 树与二叉树
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
            question: `广度优先遍历二叉树可用栈来实现。`,
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
            id: 20,
            type: "judge",
            question: `函数调用管理可用栈来管理。`,
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
            id: 21,
            type: "judge",
            question: `在二叉排序树（ BST ）中，若某结点的左子树为空，则该结点一定是整棵树中的最小值结点。`,
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
            question: `下面的函数能正确判断一棵树是不是二叉排序树（左边的数字要比当前数字小，右边的数字要比当前数字 大）。 class Test { public: Test() { cout << "T "; } }; int main() { Test a; Test b = a; } 1 2 3 4 5 6 7 8 9 int countLeaf(TreeNode* root) { if (!root) return 0; if (!root->left && !root->right) return 1; return countLeaf(root->left)+countLeaf(root->right); } 1 2 3 4 5 bool isBST(TreeNode* root, int minVal, int maxVal) { if (!root) return true; if (root->val <= minVal || root->val >= maxVal) return false; return isBST(root->left, minVal, root->val) && isBST(root->right, root->val, maxVal); } 1 2 3 4 5 6 7 第 9 页 / 共 13 页`,
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

            **考点：** 树与二叉树、面向对象
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
            question: `格雷编码相邻两个编码之间必须有多位不同，以避免数据传输错误。`,
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
            id: 24,
            type: "judge",
            question: `小杨在玩一个闯关游戏，从第 1 关走到第 4 关。每一关的体力消耗如下（下标表示关卡编号）：cost = [ 0, 3, 5, 2, 4 ]，其中 cost[i] 表示到达第 i 关需要消耗的体力，cost[0]=0 表示在开始状态，体力消耗为 0 。小杨每次可以从当前关卡 前进 1 步或 2 步。按照上述规则，从第 1 关到第 4 关所需消耗的最小体力为 7 。`,
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
            id: 25,
            type: "judge",
            sourceIntegrity: "missing-formula",
            integrityNote: "原卷此题的公式或数值在文本提取时丢失，题干留下空档，仅凭当前内容无法作答。本题已排除出计分与考点练习，待补齐原卷公式后恢复。",
            question: `假定只有一个根节点的树的深度为 1 ，则一棵有 个节点的完全二叉树，则树的深度为 。`,
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
        ...programmingQuestions
    ]
};
