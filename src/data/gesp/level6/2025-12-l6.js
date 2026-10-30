// 2025年12月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `4
1 2 3
5 6 2 3`, output: `2` },
        { input: `7
1 1 2 2 3 3
64 16 15 4 3 2 1`, output: `10` }
      ],
      question: `
# [GESP202512 六级] 路径覆盖

## 题目描述

给定一棵有 $n$ 结点的有根树 $T$，结点依次以 $1,2,\\ldots,n$ 编号，根结点编号为 $1$。方便起见，编号为 $i$ 的结点称为结点 $i$。

初始时 $T$ 中的结点均为白色。你需要将 $T$ 中的若干个结点染为黑色，使得所有叶子到根的路径上至少有一个黑色结点。将结点 $i$ 染为黑色需要代价 $c_i$，你需要在满足以上条件的情况下，最小化染色代价之和。

叶子是指 $T$ 中没有子结点的结点。

## 输入格式

第一行，一个正整数 $n$，表示结点数量。

第二行，$n-1$ 个正整数 $f_2,f_3,\\ldots,f_n$，其中 $f_i$ 表示结点 $i$ 的父结点的编号，保证 $f_i < i$。

## 输出格式

一行，一个整数，表示在满足所有叶子到根的路径上至少有一个黑色结点的前提下，染色代价之和的最小值。
`,
      score: 25,
      explanation: `**解析：**
      树形 DP。设 f[u] 表示覆盖 u 子树内所有叶根路径的最小代价：要么直接把 u 染黑，花 c_u；要么不染 u，而把责任交给所有儿子分别完成，代价为 sum f[v]。叶子必须被染黑，所以叶子答案就是 c_u。

      **考点：** 树形DP
      `,
      tags: ["编程题", "树形DP"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<vector<int>> g(n+1);\n    for (int i = 2; i <= n; ++i) {\n        int p;\n        cin >> p;\n        g[p].push_back(i);\n    }\n    vector<long long> c(n+1);\n    for (int i = 1; i <= n; ++i) cin >> c[i];\n\n    vector<long long> dp(n+1, 0);\n    function<void(int)> dfs = [&](int u) {\n        if (g[u].empty()) {\n            dp[u] = c[u];\n            return;\n        }\n        long long sum = 0;\n        for (int v : g[u]) {\n            dfs(v);\n            sum += dp[v];\n        }\n        dp[u] = min(c[u], sum);\n    };\n    dfs(1);\n    cout << dp[1] << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3 5
99 1
33 2
11 3`, output: `132` },
        { input: `4 100
10 1
20 11
40 33
100 99`, output: `110` }
      ],
      question: `
# [GESP202512 六级] 道具商店

## 题目描述

道具商店里有 $n$ 件道具可供挑选。第 $i$ 件道具可为玩家提升 $a_i$ 点攻击力，需要 $c_i$ 枚金币才能购买，每件道具只能购买一次。现在你有 $k$ 枚金币，请问你最多可以提升多少点攻击力？

## 输入格式

第一行，两个正整数 $n,k$，表示道具数量以及你所拥有的金币数量。

接下来 $n$ 行，每行两个正整数 $a_i,c_i$，表示道具所提升的攻击力点数，以及购买所需的金币数量。

## 输出格式

输出一行，一个整数，表示最多可以提升的攻击力点数。
`,
      score: 25,
      explanation: `**解析：**
      把“总攻击力”当作背包容量：dp[j] 表示达到总攻击力恰为 j 的最小花费，做一遍 0/1 背包；最后找所有花费不超过 m 的最大 j。这样即使金币上限很大、攻击力总和较小，也能稳定求解。

      **考点：** 动态规划、0/1背包
      `,
      tags: ["编程题", "动态规划", "0/1背包"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<pair<int,int>> items(n);\n    int sumAtk = 0;\n    for (int i = 0; i < n; ++i) {\n        int a, c;\n        cin >> a >> c;\n        items[i] = {a, c};\n        sumAtk += a;\n    }\n\n    const int INF = 1e9;\n    vector<int> dp(sumAtk+1, INF);\n    dp[0] = 0;\n    int cur = 0;\n    for (auto [a, c] : items) {\n        cur += a;\n        for (int j = cur; j >= a; --j) {\n            dp[j] = min(dp[j], dp[j-a]+c);\n        }\n    }\n\n    int ans = 0;\n    for (int j = 0; j <= sumAtk; ++j) {\n        if (dp[j] <= m) ans = j;\n    }\n    cout << ans << '\\n';\n    return 0;\n}",
      answer: '',
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
            question: `在面向对象编程中，下列关于虚函数（virtual function）的描述中，错误的是（ ）。`,
            options: [
                "虚函数用于支持运行时多态",
                "通过基类指针调用虚函数时，会根据对象实际类型决定调用版本",
                "构造函数可以声明为虚函数以支持多态",
                "基类析构函数常声明为虚函数以避免资源泄漏",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            C++ 中构造函数不能为虚函数，因为虚函数依赖于虚函数表（vtable），而在构造函数执行时，对象尚未完全创建，vtable 尚未建立。析构函数则建议声明为虚位，以确保通过基类指针删除派生类对象时能正确释放资源。选项 C 错误。

            - **A 虚函数用于支持运行时多态**：错误。
            - **B 通过基类指针调用虚函数时，会根据对象实际类型决定调用版本**：错误。
            - **C 构造函数可以声明为虚函数以支持多态**：正确答案。
            - **D 基类析构函数常声明为虚函数以避免资源泄漏**：错误。

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
            question: `执行如下代码，会输出 钢琴：叮咚叮咚 和 吉他：咚咚当当。这体现了面向对象编程的（ ）特性。`,
            options: [
                "继承",
                "封装",
                "多态",
                "链接",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（多态）**

**为什么是多态：** 基类 \`Instrument\` 把 \`play()\` 声明为 \`virtual\`，派生类 \`Piano\`、\`Guitar\` 各自 \`override\`。通过基类指针 \`instruments[i]->play()\` 调用时，编译器不看指针的静态类型（\`Instrument*\`），而是在运行时按对象的实际类型去虚函数表里找对应版本——这正是运行时多态。

**逐项分析：**
- **A 继承**：代码确实用了继承，但继承只保证 Piano「是一种」Instrument；如果 \`play()\` 不是虚函数，输出就会变成两行「乐器在演奏声音」。让输出随实际类型变化的是多态，不是继承。
- **B 封装**：封装讲的是把数据和操作绑在一起、对外隐藏细节，本题没有体现。
- **C 多态**：正确。
- **D 链接**：C++ 里的链接指编译期把目标文件合并，与本题无关。

**关键点：** 继承是多态的前提，但只有加了 \`virtual\` 才真正获得运行时分派。

**考点：** 面向对象、多态`,
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
            explanation: `**答案：C（代码编译出现错误）**

**问题出在哪：** 基类 \`Instrument::play()\` **没有** \`virtual\`（对比第 2 题，那里有）。派生类却写了 \`void play() override\`——\`override\` 关键字要求「必须覆盖一个基类的虚函数」，而这里基类根本没有虚函数可覆盖，编译器直接报错。

**逐项分析：**
- **A**：如果去掉 \`override\`、并且用基类指针调用，输出会是两行「乐器在演奏声音」，不是钢琴吉他。
- **B**：方向对了，但前提是代码能编译通过；有 \`override\` 就通不过。
- **C**：正确。
- **D**：这是编译期错误，程序根本生成不出来，谈不上运行出错。

**易错提醒：** \`override\` 是好习惯，它的价值恰恰在于把「我以为覆盖了、其实没有」这类错误从运行期提前到编译期暴露。本题就是这个机制在起作用。

**考点：** 面向对象、虚函数、override`,
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
            explanation: `**答案：A（A B）**

**逐步模拟：** 栈是后进先出（LIFO）。

| 操作 | 栈底 → 栈顶 |
| --- | --- |
| 输入 A | A |
| 输入 B | A B |
| 输入 C | A B C |
| 输入 D | A B C D |
| 撤销（弹出 D） | A B C |
| 撤销（弹出 C） | A B |

两次撤销弹掉的是最后输入的 D 和 C，剩下 A B。

**逐项分析：**
- **B（A B C）**：只撤销了一次。
- **C（A B D）**：栈只能从顶部弹出，不可能跳过 C 单独删掉它。
- **D（B C）**：这是从栈底删除的结果，那是队列的行为不是栈。

**考点：** 栈、后进先出`,
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
            answer: 1,
            score: 2,
            explanation: `**答案：B（2, 0）**

**逐步模拟：** N = 6，初始 front = 1、rear = 1（空队列）。入队做 \`rear = (rear+1) % 6\`，出队做 \`front = (front+1) % 6\`。

| 操作 | front | rear |
| --- | --- | --- |
| 初始 | 1 | 1 |
| 入队 | 1 | 2 |
| 入队 | 1 | 3 |
| 入队 | 1 | 4 |
| 出队 | 2 | 4 |
| 入队 | 2 | 5 |
| 入队 | 2 | **0**（(5+1) % 6） |

最终 (front, rear) = (2, 0)。

**关键点：** 最后一次入队让 rear 从 5 绕回 0，这正是「循环」队列的含义——下标用取模在数组里首尾相接，而不是越界。此时 \`(rear+1) % 6 = 1 ≠ front = 2\`，队列未满，操作合法。

**考点：** 循环队列、取模运算`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `以下函数 check() 用于判断一棵二叉树是否为（ ）。

\`\`\`cpp
bool check(TreeNode* root) {
    if (!root) return true;

    queue<TreeNode*> q;
    q.push(root);
    bool hasNull = false;
    while (!q.empty()) {
        TreeNode* cur = q.front(); q.pop();
        if (!cur) {
            hasNull = true;
        } else {
            if (hasNull) return false;
            q.push(cur->left);
            q.push(cur->right);
        }
    }
    return true;
}
\`\`\`
`,
            options: [
                "满二叉树",
                "完全二叉树",
                "二叉搜索树",
                "平衡二叉树",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（完全二叉树）**

**这段代码在做什么：** 按**层序**（BFS）遍历，把每个节点的左右孩子（包括空指针）都压入队列，并用 \`hasNull\` 记录「是否已经见过空指针」。一旦在见过空之后又遇到**非空**节点，立即返回 false。

**为什么这判的是完全二叉树：** 完全二叉树的层序序列里，非空节点必须**连续地**排在前面——一旦出现空缺，后面不允许再有任何节点。\`hasNull\` 正是在检查这一点。

**逐项分析：**
- **A 满二叉树**：满二叉树还要求每个节点有 0 或 2 个孩子，代码没有检查这一点（例如只有一个左孩子的节点照样通过）。
- **B 完全二叉树**：正确，见上。
- **C 二叉搜索树**：需要比较节点值的大小关系，代码从未比较 \`cur->val\`。
- **D 平衡二叉树**：需要比较左右子树高度，代码没有高度信息。

**考点：** 树与二叉树、完全二叉树、队列`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `以下代码实现了二叉树的（ ）。

\`\`\`cpp
void traverse(TreeNode* root) {
    if (!root) return;
    traverse(root->left);
    traverse(root->right);
    cout << root->val << " ";
}
\`\`\`
`,
            options: [
                "前序遍历",
                "中序遍历",
                "后序遍历",
                "层序遍历",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（后序遍历）**

**判定依据：** 三种深度优先遍历的区别只在「访问根节点」的时机——本代码把 \`cout << root->val\` 放在两次递归**之后**，即「左 → 右 → 根」，是后序遍历。

**逐项分析：**
- **A 前序遍历**：打印语句应在两次递归**之前**（根左右）。
- **B 中序遍历**：打印语句应在两次递归**之间**（左根右）。
- **C 后序遍历**：正确，根最后被访问。
- **D 层序遍历**：需要借助队列逐层访问，递归写法实现不了。

**考点：** 树与二叉树、后序遍历
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
                "int a = PopMinNode(nodes, leafIdx, n, pA, internalIdx, pB); int b = PopMinNode(nodes, leafIdx, n, pA, internalIdx, pB); nodes.push_back(Node(nodes[a].w + nodes[b].w, a, b, -1)); internalIdx.push_back((int)nodes.size() - 1);",
                "int a = leafIdx[pA++]; int b = leafIdx[pB++]; nodes.push_back(Node(sym[a].freq + sym[b].freq, a, b, -1));",
                "int a = PopMinNode(nodes, leafIdx, n, pA, internalIdx, pB); int b = PopMinNode(nodes, leafIdx, n, pA, internalIdx, pB); nodes.push_back(Node(nodes[a].w * nodes[b].w, a, b, -1));",
                "nodes.push_back(Node(nodes[a].w + nodes[b].w, a, b, i));",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

**这段代码在做什么：** 标准哈夫曼建树需要每次取出权值最小的两个节点。常规做法是用优先队列（堆），而这份实现用了**双指针法**：先把叶子节点按权值排好序放进 \`leafIdx\`，新合成的内部节点天然按权值递增放进 \`internalIdx\`，于是每次只需比较两个序列的队首谁更小——这正是 \`PopMinNode()\` 做的事，时间复杂度 O(n log n) 用在排序上，建树本身是 O(n)。

**为什么选 A：** 横线处要取出当前权值最小的两个节点，必须**两次调用** \`PopMinNode\`，让它在叶子序列和内部节点序列之间做选择。

**逐项分析：**
- **B**：\`leafIdx[pA++]\` 只从叶子序列取，完全忽略了已经合成的内部节点。一旦某个内部节点的权值比剩余叶子小，就会取错，建出来的不是最优树。
- **C**：与 A 形式相同但后续处理不符（未正确合并权值与左右孩子）。
- **D**：这只是「合并」这一步，缺少前面「取出两个最小节点」的动作，a、b 都还没定义。

**考点：** 哈夫曼编码、贪心`,
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
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**逐项分析：**
- **A 定长编码**：错。哈夫曼编码是**变长**编码，这正是它能压缩的原因——高频字符给短码、低频字符给长码，平均码长才会低于定长编码。
- **B 前缀性质**：正确。哈夫曼树把所有字符都放在**叶子**上，任何一个字符的编码都是从根到某叶子的路径；而一个叶子的路径不可能是另一个叶子路径的前缀（否则它就成了内部节点）。正因为有这个性质，解码时才能从头逐位读取、不需要分隔符就能唯一切分。
- **C 一定唯一**：错。当出现权值相同的节点时，选谁合并、谁做左孩子谁做右孩子都有多种选法，会建出不同的树。编码方案不唯一，但**平均码长相同**，都是最优的。
- **D 不能用于压缩**：错。哈夫曼编码正是经典的无损压缩方法，JPEG、ZIP 等格式里都有它的身影。

**考点：** 哈夫曼编码、前缀码`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `以下函数实现了二叉排序树（BST）的（ ）操作。

\`\`\`cpp
TreeNode* op(TreeNode* root, int x) {
    if (!root) return new TreeNode(x);
    if (x < root->val)
        root->left = op(root->left, x);
    else
        root->right = op(root->right, x);
    return root;
}
\`\`\`
`,
            options: [
                "查找",
                "插入",
                "删除",
                "遍历",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（插入）**

**判定依据：** 函数沿 BST 性质下行（\`x < root->val\` 走左、否则走右），到空指针处 \`return new TreeNode(x)\` **新建节点**，再逐层 \`root->left/right = op(...)\` 把新节点接回树中——这是递归插入的标准写法。

**逐项分析：**
- **A 查找**：查找在 \`!root\` 时应返回空（表示没找到），不会 \`new\` 新节点。
- **B 插入**：正确。\`new TreeNode(x)\` 是决定性证据。
- **C 删除**：删除要分「无孩子 / 单孩子 / 双孩子」三种情况处理，代码中不存在。
- **D 遍历**：没有任何访问节点值的动作（如打印）。

**考点：** 树与二叉树、二叉排序树、插入
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
            question: `下列代码实现了树的深度优先遍历，则横线处应填入（ ）。\n\n\`\`\`cpp\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvoid dfs(TreeNode* root) {\n    if (!root) return;\n    stack<TreeNode*> st;\n    st.push(root);\n    while (!st.empty()) {\n        TreeNode* node = st.top(); st.pop();\n        cout << node->val << " ";\n        if (node->right) st.push(node->right);\n        __________________ // 在此处填入代码\n    }\n}\n\`\`\`\n`,
            options: [
                "if (node->left) st.push(node->left);",
                "if (node->left) st.pop(node->left);",
                "if (node->left) st.front(node->left);",
                "if (node->left) st.push(node->right);",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
非递归 DFS 用**栈**实现：弹栈访问节点后，为让**左子树先被访问**（符合先序惯例），应**先压右孩子、再压左孩子**（栈后进先出，后压的左孩子先出栈）。

代码中横线之前已 \`if (node->right) st.push(node->right);\`，横线处补上压左孩子：

\`\`\`cpp
if (node->left) st.push(node->left);
\`\`\`

逐项分析：
- **A push 左孩子**：正确，与先压右配合，实现根→左→右的先序访问。
- **B \`st.pop(node->left)\`**：错误，pop 不接受参数且会误删栈顶。
- **C \`st.front(...)\`**：错误，stack 没有 front 接口（那是 queue 的）。
- **D push 右孩子**：错误，与横线前一句重复，左子树永远不被访问。

**易错点：** 先压右再压左的顺序不能反——若先压左后压右，出栈顺序变成先右后左，遍历变成「根→右→左」。

**考点：** 非递归深度优先遍历（栈实现）
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
            question: `给定一棵普通二叉树（节点值没有大小规律），下面代码判断是否存在值为 x 的结点，则横线处应填入（ ）。\n\n\`\`\`cpp\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* bfsFind(TreeNode* root, int x) {\n    if (!root) return nullptr;\n\n    queue<TreeNode*> q;\n    q.push(root);\n\n    while (!q.empty()) {\n        TreeNode* cur = q.front(); q.pop();\n        if (cur->val == x) return cur;\n        _________________ // 在此处填入代码\n    }\n    return nullptr;\n}\n\`\`\`\n`,
            options: [
                "q.push(cur);",
                "if (cur->right) q.push(cur->right);",
                "选项C",
                "选项D",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
普通二叉树没有大小规律，查找必须**遍历所有节点**：BFS 用队列，出队 cur 并比较后，把它的**左右孩子（判空后）依次入队**，保证每个节点都被检查到。

\`\`\`cpp
if (cur->left)  q.push(cur->left);
if (cur->right) q.push(cur->right);
\`\`\`

逐项分析：
- **A \`q.push(cur);\`**：错误，把 cur 自己再入队会无限循环（cur 出队后又被压回）。
- **B 只入右孩子**：错误，左子树中的 x 会被漏掉。
- **C 左右孩子判空后入队**：正确，完整遍历。
- **D 不判空直接入队**：错误，对空孩子入队后 \`cur->val\` 解引用空指针崩溃。

**易错点：** 入队前判空是 BFS 的铁律；这题是**普通二叉树**，不能像 BST 那样只走一个分支——若值无规律，两个子树都得搜。

**考点：** BFS 在普通二叉树中的查找
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
                "最坏情况下，访问结点数是 $O(N)$",
                "最坏情况下，访问结点数是 $O(h)$",
                "无论如何，访问结点数都不超过树高的一半",
                "一定比在普通二叉树中搜索快",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（最坏情况下，访问结点数是 $O(h)$）**

**为什么：** BST 的查找从根开始，每比较一次就根据大小关系走向左子树或右子树，**绝不回头**。所以一次查找访问的节点数最多就是从根到最深叶子的路径长度，即树高 h。这个结论与树的形状无关，恒成立。

**逐项分析：**
- **A $O(N)$**：这句话本身不算错（退化成链时 h = N），但它是**由 $O(h)$ 推出的特例**，不是「一定正确」的最紧描述。题目问的是一定正确的说法，$O(h)$ 才是对任何形状都成立的那一条。
- **B**：正确。
- **C 不超过树高的一半**：错。查找一个位于最深叶子的元素，恰好要走完整棵树高。
- **D 一定比普通二叉树快**：错。若 BST 退化成一条链（例如按升序依次插入），查找退化为 $O(N)$，并不比在普通二叉树里逐个遍历更快。BST 的优势来自**平衡**，而不是「是 BST」这件事本身。

**考点：** 二叉排序树、复杂度分析`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `0/1 背包（每件物品最多选一次）问题通常可用一维动态规划求解，核心代码如下。则下面说法正确的是（ ）。`,
            options: [
                "内层 j 必须从小到大，否则会漏解",
                "内层 j 必须从大到小，否则同一件物品会被用多次",
                "j 从大到小或从小到大都一样",
                "只要 dp 初始为 0，方向无所谓",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（内层 j 必须从大到小，否则同一件物品会被用多次）**

**为什么必须倒序：** 一维数组把二维的 \`dp[i][j]\` 压缩成了 \`dp[j]\`，此时 \`dp[j-w]\` 到底代表「上一轮（还没考虑当前物品）的值」还是「本轮已经用过当前物品的值」，完全取决于遍历方向。

- **倒序（j 从 W 递减）**：更新 \`dp[j]\` 时，\`dp[j-w]\` 因为下标更小，本轮还没被改过，仍是上一轮的值 → 当前物品只会被选一次，这正是 0/1 背包。
- **正序（j 从 w 递增）**：\`dp[j-w]\` 本轮已经更新过，可能已经包含了当前物品 → 同一件物品被重复选取，算出来的是**完全背包**的答案。

**逐项分析：**
- **A**：说反了，正序才会出问题，而且不是「漏解」是「多解」。
- **B**：正确。
- **C**：方向恰恰是这段代码的关键，换了方向解决的就是另一个问题。
- **D**：初值与遍历方向是两件独立的事，dp 初始化为 0 不能修正方向错误。

**考点：** 动态规划、0/1 背包`,
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
            answer: 1,
            score: 2,
            explanation: `**答案：B（错误的说法）**

**为什么 B 错：** 动态规划的时间复杂度是「**状态数 × 单个状态的转移代价**」，不是只有状态个数。例如 0/1 背包有 $n \\times W$ 个状态、每个状态 O(1) 转移，总复杂度 $O(nW)$；而区间 DP 常见的是 $O(n^2)$ 个状态、每个状态还要枚举 O(n) 个分割点，总复杂度 $O(n^3)$。只数状态个数会严重低估后者。

**其余三项都成立：**
- **A**：能写出状态转移方程（递推公式）正是能用 DP 的标志。
- **C**：DP 确实有自底向上的递推和自顶向下的记忆化递归两种写法。
- **D**：两种写法访问的状态集合基本相同，复杂度同阶；记忆化递归只多了函数调用开销，且可能跳过一些用不到的状态。

**考点：** 动态规划、复杂度分析`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `以下代码中，构造函数被调用的次数是 1 次。

\`\`\`cpp
class Test {
public:
    Test() { cout << "T "; }
};

int main() {
    Test a;
    Test b = a;
}
\`\`\`
`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**推导：** \`Test a;\` 调用一次默认构造函数 \`Test()\`，输出 T。而 \`Test b = a;\` 是**拷贝初始化**——调用的是编译器隐式生成的**拷贝构造函数** \`Test(const Test&)\`，把 a 的成员复制给 b。拷贝构造也是构造函数，所以构造函数总共被调用了 **2 次**，命题「1 次」不成立，判「错误」。

**易混点：** 这里的 \`=\` 不触发赋值运算符——对**新定义**的对象用 \`=\` 是初始化（拷贝构造）；只有对**已存在**的对象赋值（如 \`b = a;\` 且 b 已构造）才调用 \`operator=\`。

**验证：** 若给 Test 补上拷贝构造 \`Test(const Test&) { cout << "C "; }\`，程序会输出 \`T C\`，可见第二个对象确实走了拷贝构造。

**考点：** 面向对象、构造函数、拷贝构造
**勘误：** 原录入答案误为「正确」。官方原卷答案表（2025-12 六级）本题答案为 ×，且与独立推导（默认构造 + 拷贝构造共 2 次）一致，已于 2026-10-24 更正。
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

**为什么：** 封装（encapsulation）是面向对象三大特性之一，含义正是题干所述的两层：

1. **把数据和操作数据的方法绑在一起** —— 类把成员变量和成员函数放在同一个单位里，而不是让数据裸露在外、由散落各处的函数随意修改。
2. **对外隐藏实现细节** —— 通过 \`private\` / \`protected\` 限制访问，只用 \`public\` 接口与外界交互。使用者只需要知道「能做什么」，不需要知道「内部怎么存的」。

**这样做的好处：** 内部表示改变时（比如把数组换成链表），只要 public 接口不变，所有调用方都不用改。

**别混淆：** 继承讲的是复用与「是一种」的关系，多态讲的是同一接口在运行时表现出不同行为，都不是封装。

**考点：** 面向对象、封装`,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `以下代码能够正确统计二叉树中叶子结点的数量。

\`\`\`cpp
int countLeaf(TreeNode* root) {
    if (!root) return 0;
    if (!root->left && !root->right) return 1;
    return countLeaf(root->left) + countLeaf(root->right);
}
\`\`\`
`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**逐行核对：**
- \`if (!root) return 0;\` —— 空树没有叶子，返回 0，边界正确。
- \`if (!root->left && !root->right) return 1;\` —— 左右孩子**都为空**的节点是叶子，计 1。这个判定只认「无任何孩子」，不会把只有单孩子的节点误判为叶子。
- \`return countLeaf(root->left) + countLeaf(root->right);\` —— 叶子要么在左子树、要么在右子树，两者计数相加，递归覆盖全树且无重复。

三个分支恰好覆盖「空 / 叶 / 内部节点」所有情形，且子问题是原问题的缩小版，递归必然终止（每次向空指针靠近一层）。

**验证示例：** 树 1(2(4,5),3)：4、5、3 是叶子，函数返回 3，与人工数出的一致。

**考点：** 树与二叉树、递归
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

广度优先遍历（BFS）按层扩展，必须**先进先出**，所以用**队列**；栈是先进后出，用栈遍历二叉树会得到深度优先的顺序。

- 层序遍历（BFS）：\`queue\`，出队一个就把它的左右孩子入队；
- 用 \`stack\` 会一路朝一个方向扎到底，不是按层访问。

故"广度优先遍历二叉树可用栈来实现"错误。即使配合"先压右孩子再压左孩子"等技巧，得到的仍是 DFS，不是 BFS。

**易错提醒：** 二叉树层序遍历的模板就是"队列 + 逐层记录 size"，看到"用栈做层序"直接判错。

**考点：** 二叉树的层序遍历、队列与栈的区别。`,
            sourceVerified: true,
            sourcePage: 9,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
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
            explanation: `
**答案：√**

**解析：**
函数调用正是用**栈**（调用栈，call stack）管理的：

- 每次调用函数，就把该函数的**活动记录**（参数、局部变量、返回地址）压栈；
- 函数返回时，其活动记录**弹栈**，控制权回到调用者。

后调用的先返回（嵌套调用 f() 里调 g()，g 先结束）——这正是栈的 LIFO 特性。递归的深度限制（栈溢出）也源于此。

**易错点：** 递归调用太深会「爆栈」，指的就是这个栈的内存耗尽，不是数据结构课上的抽象栈。

**考点：** 函数调用与栈
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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

BST 中最小值结点是**从根一路向左走到的结点**（最左结点）。"某结点左子树为空"只是说它没有左孩子，不代表它是最左。

反例：根为 10，左孩子 5，5 的右孩子 8。结点 8 的左子树为空，但全树最小值是 5 而不是 8。

所以命题错误。同理，"右子树为空"也不等于最大值结点。

**易错提醒：** 判断极值看位置（最左/最右），不看子树是否为空。左子树为空只说明该结点在局部是极小。

**考点：** 二叉排序树的极值结点查找。`,
            sourceVerified: true,
            sourcePage: 9,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `下面的函数能正确判断一棵树是不是二叉排序树（左边的数字要比当前数字小，右边的数字要比当前数字大）。

\`\`\`cpp
bool isBST(TreeNode* root, int minVal, int maxVal) {
    if (!root) return true;
    if (root->val <= minVal || root->val >= maxVal)
        return false;
    return isBST(root->left, minVal, root->val) &&
           isBST(root->right, root->val, maxVal);
}
\`\`\`
`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**为什么这么写是对的：** 判断 BST 不能只比较「节点与它的直接孩子」——反例：\`5(3(2, 8), 10)\`，8 > 3 看似合法，但 8 在 5 的**左子树**里，违反了「左子树全部小于 5」。正确做法是给每个节点传一个**合法取值区间 (minVal, maxVal)**：

- 递归左子树时，上界收紧为 \`root->val\`（左子树所有值必须小于它）；
- 递归右子树时，下界收紧为 \`root->val\`；
- \`root->val\` 落在开区间外（\`<= minVal\` 或 \`>= maxVal\`）即判 false；
- 空树递归到底返回 true。

这样树上每个节点都被约束在「从根到它路径」所允许的范围内，恰好等价于 BST 的全局有序性质。

**易错对比：** 常见的错误写法只检查 \`root->left->val < root->val && root->right->val > root->val\`，漏掉了对整棵子树的约束。本题代码没有这个漏洞，能正确判断。

**考点：** 二叉排序树、递归、区间约束
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
            answer: 1,
            score: 2,
            explanation: `
**答案：×**

**解析：**
说法**正好相反**。格雷码的核心性质是：**相邻两个编码之间有且只有一位不同**——不是「多位不同」。

正是这个「只变一位」的性质让格雷码在数据传输/编码器读数中占优：状态切换时每次只有一位可能出错，误码影响最小（如旋转编码器避免多比特同时翻转的瞬态错误）。

**易错点：** 普通二进制递增时（如 0111→1000）有多位同时变化，容易产生瞬态毛刺；格雷码为避免的正是这一点，所以相邻编码**只差一位**。

**考点：** 格雷码的性质
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
            question: `小杨在玩一个闯关游戏，从第 1 关走到第 4 关。每一关的体力消耗如下（下标表示关卡编号）：\`cost = [0, 3, 5, 2, 4]\`，其中 \`cost[i]\` 表示到达第 i 关需要消耗的体力，\`cost[0]=0\` 表示在开始状态，体力消耗为 0。小杨每次可以从当前关卡前进 1 步或 2 步。按照上述规则，从第 1 关到第 4 关所需消耗的最小体力为 7。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

\`cost = [0,3,5,2,4]\`，每次只能前进 1 步或 2 步，从第 1 关到第 4 关的全部走法与消耗：

| 走法 | 消耗 | 合计 |
|---|---|---|
| 1→2→3→4 | 5+2+4 | 11 |
| 1→2→4 | 5+4 | 9 |
| 1→3→4 | 2+4 | **6** |

最小消耗是 **6**（走 1→3→4），不是题干说的 7，命题错误。

**易错提醒：** 这类"跳台阶最小花费"要用动态规划：\`dp[i] = cost[i] + min(dp[i-1], dp[i-2])\` 逐关递推，别凭直觉挑一步。注意 \`cost[1]\` 是起点本身的消耗，不计入路径。

**考点：** 动态规划、最小路径花费。`,
            sourceVerified: true,
            sourcePage: 10,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `假定只有一个根节点的树的深度为 1 ，则一棵有 $n$ 个节点的完全二叉树，则树的深度为 $\\lfloor log_2 n \\rfloor+1$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
完全二叉树深度公式：**⌊log₂n⌋ + 1**（约定单节点树深度为 1）。

验证：
- n=1：⌊log₂1⌋+1 = 0+1 = 1 ✓
- n=2、3：⌊log₂2⌋+1 = 2（两层）✓
- n=4~7：⌊log₂4⌋+1 = 3（三层）✓

原理：前 k 层最多容纳 2^k − 1 个节点；n 个节点的完全二叉树层数就是满足 2^(k−1) ≤ n ≤ 2^k − 1 的最小 k，即 k = ⌊log₂n⌋ + 1。

**易错点：** 该公式**只对完全二叉树/满二叉树成立**——普通二叉树同样 n 个节点可以拉成一条链，深度达 n。

**考点：** 完全二叉树的深度公式
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
