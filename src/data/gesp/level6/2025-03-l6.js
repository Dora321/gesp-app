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
            explanation: `**答案：D（不正确的描述）**

**逐项分析：**
- **A**：成立。类是对一类对象的抽象，描述它们共有的属性和行为。
- **B**：成立。属性（成员变量）刻画状态，方法（成员函数）刻画行为，这正是类的两个组成部分。
- **C**：成立。类是模板，实例化后得到具体对象，一个类可以实例化出任意多个对象。
- **D**：**不成立**，本题要选它。类定义后完全可以扩展——通过**继承**派生出新类并添加属性和方法，是面向对象最基本的复用手段。即便不用继承，修改类定义本身也是常规操作。

**考点：** 面向对象、类与对象`,
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
            explanation: `**答案：B（不正确的描述）**

**逐项分析：**
- **A**：成立。哈夫曼编码是变长编码，高频字符给短码、低频字符给长码，这样加权平均码长才最小。
- **B**：**说反了**，本题要选它。哈夫曼建树时每次取权值**最小**的两个节点合并，低频字符因此在很早的轮次就被合并进去，最终位于树的**深层**（离根远）；高频字符留到最后合并，位于**浅层**（离根近）。离根越近编码越短，正好对应 A 项说的「频率高用短码」。
- **C**：成立。每次贪心地选当前最小的两个权值合并，是哈夫曼算法的核心步骤。
- **D**：成立。所有字符都在叶子上，任一编码都不会是另一编码的前缀，因此解码时不需要分隔符也能唯一切分。

**关键点：** A 和 B 其实在描述同一件事的两面，A 说对了、B 说反了——发现这一对矛盾就能直接锁定答案。

**考点：** 哈夫曼编码`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `以下代码实现了树的哪种遍历方式？

\`\`\`cpp
void traverse(TreeNode* root) {
    if (root == nullptr) return;
    cout << root->val << " ";
    traverse(root->left);
    traverse(root->right);
}
\`\`\`
`,
            options: [
                "前序遍历",
                "中序遍历",
                "后序遍历",
                "层次遍历",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（前序遍历）**

**判定依据：** 三种深度优先遍历的区别只在「访问根节点」的时机——本代码在递归左右子树**之前**执行 \`cout << root->val\`，即「根 → 左 → 右」，是前序遍历。

**逐项分析：**
- **A 前序遍历**：正确。访问根的语句位于 \`traverse(root->left)\` 与 \`traverse(root->right)\` 之前。
- **B 中序遍历**：需要把打印语句移到两次递归**之间**（左 → 根 → 右）。
- **C 后序遍历**：需要把打印语句移到两次递归**之后**（左 → 右 → 根）。
- **D 层次遍历**：需要借助**队列**逐层访问，而本代码是递归写法，不可能实现层序。

**考点：** 树与二叉树、遍历`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 4,
            type: "single",
            sourceIntegrity: "contaminated-stem",
            integrityNote: "题干里塞进了两段代码（一个只做前序打印的 traverse 与另一个 isCompleteTree），中间还夹着行号残留「1 2 3 4 5 6」。四个选项描述的是「这段代码用来判断什么」，而首段代码只是打印节点值，并不判断任何性质，题面与选项对应不上。",
            question: `以下关于完全二叉树的代码描述，正确的是（ ）。\n\n\`\`\`cpp\nvoid traverse(TreeNode* root) {\n    if (root == nullptr) return;\n    cout << root->val << " ";\n    traverse(root->left);\n    traverse(root->right);\n}\nbool isCompleteTree(TreeNode* root) {\n    // ……判断逻辑\n}\n\`\`\`\n`,
            options: [
                "该代码用于判断一棵树是否为满二叉树",
                "该代码用于判断一棵树是否为完全二叉树",
                "该代码用于判断一棵树是否为二叉搜索树",
                "该代码用于计算树的高度",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
题目给出的是**先序遍历**框架（先输出根，再递归左右）+ \`isCompleteTree\` 函数名，问代码用途。

- 函数名 \`isCompleteTree\` 直接表明意图：**判断一棵树是否为完全二叉树**。典型实现是层序遍历过程中，一旦遇到「空位后还有节点」的情况即非完全二叉树。
- 上面的 \`traverse\` 只是先序遍历辅助展示，判断逻辑在 \`isCompleteTree\` 中。

逐项分析：
- **A**：错误，满二叉树要求每层都满，与函数名不符。
- **B**：正确，\`isCompleteTree\` 即判断完全二叉树。
- **C**：错误，判断二叉搜索树通常要比较节点值的大小关系（中序递增）。
- **D**：错误，计算高度是返回 max(左, 右)+1 的递归。

**易错点：** 完全二叉树判定核心是「层序中不允许出现空位后再有节点」，不是看节点数。

**考点：** 完全二叉树的判定思路
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
            question: `以下代码实现了二叉排序树的哪种操作？

\`\`\`cpp
TreeNode* op(TreeNode* root, int val) {
    if (root == nullptr) return new TreeNode(val);
    if (val < root->val) {
        root->left = op(root->left, val);
    } else {
        root->right = op(root->right, val);
    }
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

**判定依据：** 函数沿 BST 性质下行（\`val < root->val\` 走左子树、否则走右子树），走到空指针时 \`return new TreeNode(val)\` **新建节点**挂上去，随后逐层 \`root->left/right = op(...)\` 把新节点接回树中——这是插入的标准写法。

**逐项分析：**
- **A 查找**：查找只需在 \`root == nullptr\` 时返回 \`nullptr\`（或 false），不会 \`new\` 出新节点。
- **B 插入**：正确。\`new TreeNode(val)\` 是决定性证据。
- **C 删除**：删除需要处理「无孩子 / 单孩子 / 双孩子（找中序后继或前驱替身）」三种情形，代码中不存在。
- **D 遍历**：全程没有任何「访问节点值」的动作（如打印）。

**考点：** 树与二叉树、二叉排序树`,
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

**建哈夫曼树：** 频率 {A:5, B:1, C:6, D:2}，每次取最小的两个合并。

| 步骤 | 合并 | 结果集合 |
| --- | --- | --- |
| 1 | B(1) + D(2) = 3 | {3, 5, 6} |
| 2 | 3 + A(5) = 8 | {6, 8} |
| 3 | C(6) + 8 = 14 | 根 |

**读出码长**（= 根到叶子的深度）：
- **C**：在第 3 步直接与根相连 → **1 位**
- **A**：根 → 8 → A → **2 位**
- **B、D**：根 → 8 → 3 → B/D → **3 位**

**对照选项 B**：A:11(2)、B:100(3)、C:0(1)、D:101(3) ✓ 码长全部吻合，且互不为前缀。

**其余选项为什么不行：**
- **A**：给 A 只有 1 位、C 有 2 位，但 C 的频率（6）比 A（5）高，短码应该给 C。
- **C**：同样把最短码给了 A 而非 C。
- **D**：A 是 2 位、C 是 1 位这点对了，但 A 的编码 \`10\` 是 D 的编码 \`100\` 的前缀，违反前缀码性质。

**考点：** 哈夫曼编码、前缀码`,
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

**逐项分析：**
- **A**：不成立。DP 与贪心解决的问题类型不同，谈不上谁的复杂度「总是」更低。恰恰相反，能用贪心解决的问题往往更快——贪心不需要枚举所有状态。
- **B**：正确。**最优子结构**（大问题的最优解由子问题最优解构成）与**重叠子问题**（同一子问题被反复求解）是使用 DP 的两个前提，缺一不可。
- **C**：不成立。递归实现 DP 必须配合**记忆化**存储中间结果，否则同一个子问题会被重复展开，退化成指数级的朴素递归。
- **D**：说反了。「分解为互不重叠的子问题」是**分治**的思想（如归并排序）；DP 的价值正建立在子问题**重叠**、结果可以复用之上。

**辨析：** C 和 D 都是把 DP 与分治混淆的典型说法，记住「重叠」这个关键词就能区分。

**考点：** 动态规划、算法特性`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 8,
            type: "single",
            sourceIntegrity: "missing-code",
            integrityNote: "题干称「以下代码中，类的构造函数被调用了（ ）次」，但代码未随本题收录，无法数出调用次数。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `以下代码中，类的构造函数被调用了（ ）次。\n\n\`\`\`cpp\nclass MyClass {\npublic:\n    MyClass() {\n        cout << "Constructor called!" << endl;\n    }\n};\nint main() {\n    MyClass obj1;\n    MyClass obj2 = obj1;\n    return 0;\n}\n\`\`\`\n`,
            options: [
                "1",
                "2",
                "3",
                "0",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
关键区分**构造函数**与**拷贝构造**：

1. \`MyClass obj1;\` —— 调用代码中定义的构造函数 \`MyClass()\`，输出一次，**第 1 次**。
2. \`MyClass obj2 = obj1;\` —— 这是**拷贝初始化**，调用编译器自动生成的**拷贝构造函数**（逐成员复制），不会调用 \`MyClass()\`。

所以代码中定义的构造函数 \`MyClass()\` 只被调用 **1** 次，选 A。

逐项分析：
- **A 1**：正确。
- **B 2**：错误，误以为 obj2 = obj1 也调用默认构造。
- **C 3**：错误。
- **D 0**：错误，obj1 的构造必然调用。

**易错点：** 严格来说拷贝构造也是构造函数的一种重载，但本题语境「类的构造函数」指代码里显式定义的无参版本；\`obj2 = obj1\` 若发生在**已初始化对象**之间才是赋值运算符，这里是初始化场景，走拷贝构造。

**考点：** 构造函数与拷贝构造的调用时机
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
            question: `以下代码实现了循环队列的哪种操作？

\`\`\`cpp
class CircularQueue {
    int* arr;
    int front, rear, size;
public:
    CircularQueue(int k) {
        size = k;
        arr = new int[k];
        front = rear = -1;
    }
    bool enQueue(int value) {
        if (isFull()) return false;
        if (isEmpty()) front = 0;
        rear = (rear + 1) % size;
        arr[rear] = value;
        return true;
    }
};
\`\`\`
`,
            options: [
                "入队",
                "出队",
                "查看队首元素",
                "判断队列是否为空",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（入队）**

**判定依据：** 函数名 \`enQueue\` 即「入队」。函数体做的事情也完全是入队的逻辑：队满则拒绝（\`isFull()\` 返回 false）；队列为空时把 \`front\` 从 −1 指向 0；\`rear = (rear + 1) % size\` 让队尾指针在数组里**循环**前移一位；最后把 \`value\` 写进 \`arr[rear]\`。

**逐项分析：**
- **A 入队**：正确。写入元素、移动队尾指针，正是入队。
- **B 出队**：出队应移动 \`front\` 指针并读取队首元素，本代码没动 \`front\`（除空队首次入队外）。
- **C 查看队首元素**：应 \`return arr[front]\`，本代码返回的是 \`bool\`。
- **D 判断队列是否为空**：判断空只需 \`front == rear\` 之类的比较，不需要写入 \`arr[rear] = value\`。

**考点：** 队列、循环队列`,
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
            explanation: `**答案：A（if (node->left) s.push(node->left);）**

**这段代码在做什么：** 用**栈**做迭代式的深度优先遍历，同时数叶子节点。循环里每次弹出栈顶节点，若它没有左右孩子就计入叶子，否则把孩子压回栈中留待后续处理。横线处要补的正是「把左孩子压栈」这一步。

**逐项分析：**
- **A**：正确。先判断 \`node->left\` 非空再 \`push\`，避免把空指针压进栈里。
- **B**：\`s.pop()\` 是**弹出**栈顶且不接受参数，写成 \`s.pop(node->left)\` 根本编译不过。
- **C**：\`front()\` 是队列的接口，栈没有这个成员函数。
- **D**：判断的是左孩子却压入右孩子，逻辑自相矛盾——右孩子会被压两次，左孩子永远不被访问。

**记忆点：** DFS 用栈、BFS 用队列；用栈时要注意压入顺序会影响左右子树的访问先后。

**考点：** 深度优先搜索、栈`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `以下代码实现了二叉树的广度优先搜索（BFS），并查找特定值的节点，则横线上应填写（ ）。\n\n\`\`\`cpp\nTreeNode* findNode(TreeNode* root, int target) {\n    if (root == nullptr) return nullptr;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        TreeNode* current = q.front();\n        q.pop();\n        if (current->val == target) {\n            return current; // 找到目标节点\n        }\n        ____________________ // 在此处填入代码\n    }\n    return nullptr; // 未找到目标节点\n}\n\`\`\`\n`,
            options: [
                "if (current->left) q.push(current->left); if (current->right) q.push(current->right);",
                "if (current->left) q.pop(current->left); if (current->right) q.pop(current->right);",
                "if (current->left) q.front(current->left); if (current->right) q.front(current->right);",
                "if (current->left) q.push(current->right); if (current->right) q.push(current->left);",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
BFS 用队列逐层搜索：出队当前节点后，若值不匹配，就要把它的**左、右孩子依次入队**，保证后续按层访问。

横线位于「弹出 current 且未命中」之后，需要补充孩子入队逻辑：

\`\`\`cpp
if (current->left) q.push(current->left);
if (current->right) q.push(current->right);
\`\`\`

逐项分析：
- **A push 左 + push 右**：正确，标准 BFS 孩子入队。
- **B 用 \`q.pop(current->left)\`**：错误，pop 不接受参数且是弹出操作，会破坏队列。
- **C 用 \`q.front(...)\`**：错误，front 只查看队首元素不接受参数，不入队。
- **D push 右 + push 左（交换）**：错误，push 的对象写反了——\`current->left\` 存在却 push 了 right，逻辑混乱。

**易错点：** 入队前必须判空（\`if (current->left)\`），对空指针入队会使后续解引用崩溃。

**考点：** BFS 框架中的孩子入队
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
            explanation: `**答案：A（result.push_back("1"+prev[i]);）**

**格雷码的镜像构造法：** n 位格雷码由 n−1 位的结果生成，分两段：

- 前半段：把 n−1 位的每个编码**顺序**遍历，加前缀 \`0\`
- 后半段：把 n−1 位的每个编码**倒序**遍历，加前缀 \`1\`

代码里第一个循环已经把前半段做完了（\`result.push_back("0" + s);\`）。第二个循环 \`for (int i = prev.size()-1; i >= 0; i--)\` 是**倒序**遍历，要补的正是「加前缀 \`1\`」。

**为什么后半段要倒序、且前缀加在前面：** 前半段的最后一项是 \`0\` + prev[末尾]，后半段的第一项取同一个 prev[末尾] 加上 \`1\`，两者只差最高位——衔接处仍然只变一位，格雷码性质得以保持。

以 n=2 验证：prev = ["0","1"] → 前半 "00","01"；后半倒序取 "1","0" 加前缀 1 → "11","10"。序列 00 → 01 → 11 → 10，每步恰好变一位。

**逐项分析：**
- **B**：前缀 \`0\` 在第一个循环里已经用过，再来一遍会产生重复编码。
- **C / D**：把 \`0\`/\`1\` 加在**末尾**而不是开头。镜像法要求新增的位是最高位，加在末尾会破坏相邻只差一位的性质。

**考点：** 格雷编码、递归`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `以下代码实现了 0/1 背包问题的动态规划解法。假设物品重量为 weights[]，价值为 values[]，背包容量为 W，横线上应填写（ ）。

\`\`\`cpp
int knapsack(int W, vector<int>& weights, vector<int>& values) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));

    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= W; j++) {
            if (weights[i-1] > j) {
                dp[i][j] = dp[i-1][j]; // 当前物品装不下
            } else {
                dp[i][j] = max(____________________); // 在此处填入代码
            }
        }
    }

    return dp[n][W];
}
\`\`\`
`,
            options: [
                "dp[i-1][j], values[i-1]",
                "dp[i-1][j], dp[i-1][j-weights[i-1]]+values[i-1]",
                "dp[i][j-1], values[i-1]",
                "dp[i-1][j-weights[i-1]]+values[i-1], dp[i][j-1]",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（max(dp[i-1][j], dp[i-1][j-weights[i-1]]+values[i-1])）**

**状态含义：** \`dp[i][j]\` 表示「只考虑前 i 件物品、容量为 j 时的最大价值」。装得下第 i 件物品时有两个选择：

- **不装第 i 件**：价值仍是最多考虑前 i−1 件的结果，即 \`dp[i-1][j]\`；
- **装第 i 件**：先腾出它的重量 \`j-weights[i-1]\`，在前 i−1 件里装那么多，再加上它的价值 \`values[i-1]\`，即 \`dp[i-1][j-weights[i-1]]+values[i-1]\`。

两者取 max 即为 \`dp[i][j]\`。

**逐项分析：**
- **A**：丢了「装」的分支——比较对象里没有装物品的方案，价值只会偏小。
- **B**：正确，正是「不装 vs 装」两个分支。
- **C**：\`dp[i][j-1]\` 是「容量少 1」的状态，与 0/1 背包的状态定义无关（那是完全背包按容量枚举时的写法混淆）。
- **D**：把「装」的方案和「容量减 1」的状态比较，两个分支都不对。

**考点：** 动态规划、0/1 背包`,
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
            explanation: `**答案：C（st.empty()）**

**这段代码在做什么：** 用栈检查括号匹配。遇到左括号就压栈；遇到右括号就检查栈顶是否是与之配对的左括号，是则弹出、否则立即返回 false。循环结束后，横线处是函数的最终返回值。

**为什么返回 \`st.empty()\`：** 循环走完只说明「没有遇到不匹配的右括号」，但栈里可能还剩下**没被闭合的左括号**。例如输入 \`"((("\`，整个过程不会触发任何错误分支，可栈里堆着三个 \`(\`。只有栈为空才说明每个左括号都找到了配对，因此返回 \`st.empty()\`。

**逐项分析：**
- **A（true）**：\`"((("\` 会被误判为匹配。
- **B（false）**：连 \`"()"\` 这种正确输入也会返回 false。
- **C**：正确。
- **D（!st.empty()）**：判断反了，栈非空恰恰说明有未闭合的括号。

**考点：** 栈、括号匹配`,
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
            explanation: `**答案：A（说法错误的一项）**

**逐项分析：**
- **A**：**错误**，本题要选它。\`Shape* shapePtr = &circle;\` 是把派生类对象的地址赋给基类指针，这是 C++ 明确允许的向上转型（upcasting），编译完全正常——多态正是建立在这种用法之上。
- **B**：成立。\`class Circle : public Shape\` 与 \`class Rectangle : public Shape\` 确立了基类与派生类的关系。
- **C**：成立。两个派生类继承了 \`name\` 属性与基类接口，并各自扩展了自己的成员。
- **D**：成立。基类的 \`area()\` 是虚函数，派生类 \`override\` 后，通过基类指针调用会按对象实际类型分派——这就是运行时多态。

**关键点：** 基类指针指向派生类对象是合法且必要的；反过来把基类对象地址赋给派生类指针才需要显式转换且有风险。

**考点：** 面向对象、多态、继承`,
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

**为什么：** 哈夫曼算法每一步都取当前权值**最小**的两个节点合并。这个贪心策略可以证明能得到**带权路径长度（WPL）最小**的二叉树。

**直观理解：** WPL = Σ(叶子权值 × 该叶子的深度)。要让总和最小，就该让权值大的叶子深度小、权值小的叶子深度大。而「每次合并最小的两个」恰好保证了小权值节点被更早合并进去、因而位置更深，大权值节点留到最后、位置更浅。

**这就是哈夫曼编码能压缩数据的根本原因**：把 WPL 换个角度看，就是「所有字符出现次数 × 各自编码长度」的总和，也就是编码后的总比特数。WPL 最小即总比特数最小。

**考点：** 哈夫曼树、带权路径长度、贪心`,
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

**为什么：** 格雷编码的定义恰恰相反——相邻两个编码**只有一位不同**（汉明距离为 1）。题干说「必须有多位不同」，与定义完全颠倒。

**只变一位有什么用：** 格雷码常用于机械编码器、模数转换等场合。如果用普通二进制，从 \`0111\` 跳到 \`1000\` 要同时翻转四位，各位的翻转不可能绝对同步，中间瞬间可能读到 \`1111\`、\`0000\` 等完全错误的值。格雷码保证每次只变一位，从根本上消除了这种读数错误。

**3 位格雷码的一个例子：** 000 → 001 → 011 → 010 → 110 → 111 → 101 → 100，每相邻两项都只有一位不同，且首尾（100 与 000）也只差一位，构成一个循环。

**考点：** 格雷编码`,
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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

深度优先搜索（DFS）沿一条路径走到底再回溯，遵循**后进先出**，所以用**栈**；题干说用"队列"，而队列是先进先出，那是广度优先搜索（BFS）的辅助结构。

- DFS：栈（后进先出），递归版本靠函数调用栈；
- BFS：队列（先进先出），按层扩展。

题干把数据结构与访问顺序的关系说反了，命题错误。

**易错提醒：** 递归实现的 DFS 虽不写显式栈，但函数调用栈本身就是栈——本质相同；改写为非递归时必须手动维护一个栈。

**考点：** 树的深度优先搜索、栈与队列的适用场景。`,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `以下代码实现的是二叉树的中序遍历。

\`\`\`cpp
void traverse(TreeNode* root) {
    if (root == nullptr) return;
    traverse(root->left);
    cout << root->val << " ";
    traverse(root->right);
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

**判定依据：** 中序遍历的顺序是「左子树 → 根 → 右子树」。代码中 \`cout << root->val\` 恰好夹在 \`traverse(root->left)\` 和 \`traverse(root->right)\` **之间**，访问根的时机在中间，正是中序遍历。

**对比记忆：**
- 前序：打印语句在两次递归**之前**（根左右）。
- 中序：打印语句在两次递归**之间**（左根右）——本代码。
- 后序：打印语句在两次递归**之后**（左右根）。

**考点：** 树与二叉树、中序遍历
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

**两句话分别看：**

1. **C++ 支持构造函数重载** —— 成立。同一个类可以有多个构造函数，只要参数列表（个数或类型）不同即可：

\`\`\`cpp
class Point {
public:
    Point();                    // 无参
    Point(int x);               // 一个参数
    Point(int x, int y);        // 两个参数
};
\`\`\`

2. **默认无参数的构造函数只能有一个** —— 也成立。重载的区分依据是参数列表，而「无参数」这个签名是唯一的，写两个 \`Point()\` 会直接编译报错「重定义」。

**补充：** 带默认参数的构造函数要小心，\`Point(int x = 0)\` 在不传参时也能被当作无参构造调用，此时它与显式的 \`Point()\` 会产生二义性，同样编译不过。

**考点：** 面向对象、构造函数重载`,
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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

BST 中的最小值结点是整棵树**最左边的结点**（从根一路向左走到底）。"某结点左子树为空"只说明它没有左孩子，不能说明它是全树最小。

反例：根为 10，左孩子 5，5 的右孩子 8。结点 8 的左子树为空，但全树最小值是 5，不是 8。

所以命题错误。结论成立的判据是"从根出发一直向左走到的结点"，而不是"左子树是否为空"。

**易错提醒：** 同理，"右子树为空"也不等于最大值结点，最大值要看最右。判断极值看位置，不看子树是否为空。

**考点：** 二叉排序树的最小/最大值结点查找。`,
            sourceVerified: true,
            sourcePage: 8,
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
            question: `在动态规划解决一维硬币找零问题时，若硬币面额为 [1, 3, 4]，目标金额为 6，则最少需要 2 枚硬币 （ 3+3 ）。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**验证：** 硬币面额 [1, 3, 4]，目标金额 6，求最少硬币数。

用动态规划，\`dp[i]\` 表示凑出金额 i 所需的最少硬币数，\`dp[0] = 0\`：

| 金额 | 可选的最后一枚 | dp 值 |
| --- | --- | --- |
| 1 | 1 → dp[0]+1 | 1 |
| 2 | 1 → dp[1]+1 | 2 |
| 3 | 3 → dp[0]+1 = 1；1 → dp[2]+1 = 3 | **1** |
| 4 | 4 → dp[0]+1 = 1；3 → dp[1]+1 = 2 | **1** |
| 5 | 4 → dp[1]+1 = 2；3 → dp[2]+1 = 3 | **2** |
| 6 | 3 → dp[3]+1 = **2**；4 → dp[2]+1 = 3；1 → dp[5]+1 = 3 | **2** |

\`dp[6] = 2\`，对应 3 + 3，与题干一致，故判断正确。

**易错提醒：** 这道题恰好说明**贪心会失效**。按贪心先取最大面额 4，剩下 2 只能用两个 1，共 3 枚；而最优解是 3+3 的 2 枚。面额不构成「正则」体系时必须用动态规划。

**考点：** 动态规划、硬币找零`,
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

**为什么：** 封装是面向对象三大特性之一，题干的两层含义都准确：

1. **把数据和行为绑定在一起** —— 类把成员变量和操作它们的成员函数放进同一个单位，而不是让数据裸露、由散落各处的函数随意改动。
2. **对外隐藏实现细节** —— 用 \`private\`/\`protected\` 限制访问，只通过 \`public\` 接口与外界交互。

**带来的好处：** 内部表示可以随时替换（比如把数组换成链表），只要 public 接口不变，所有调用方都不受影响。同时把「不变量」的维护集中到类内部，外部无法绕过接口把对象改成非法状态。

**别混淆：** 继承讲的是复用与「是一种」的关系，多态讲的是同一接口在运行时表现出不同行为。

**考点：** 面向对象、封装`,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
            ]
        },
        {
            id: 24,
            type: "judge",
            sourceIntegrity: "missing-code",
            integrityNote: "题干称「以下代码创建的树是一棵完全二叉树」，但建树代码未随本题收录，无从判断。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `以下代码创建的树是一棵完全二叉树：\n\n\`\`\`cpp\nTreeNode* root = new TreeNode{1};\nroot->left = new TreeNode{2};\nroot->right = new TreeNode{3};\nroot->left->left = new TreeNode{4};\n\`\`\`\n`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：√**

**解析：**
代码构建的树形：
\`\`\`text
        1
       / \
      2   3
     /
    4
\`\`\`

完全二叉树的判定：除最后一层外每层都满，且最后一层节点**从左到右连续排列**。

- 第 1 层：1（满）
- 第 2 层：2、3（满）
- 第 3 层：只有 4，且 4 位于最左侧位置（2 的左孩子）✓

第 3 层的空位（2 的右孩子、3 的左右孩子）都在节点 4 **之后**，符合「从左到右填充」，所以是**完全二叉树**，说法正确。

**易错点：** 若代码最后一句写成 \`root->right->left = new TreeNode{4};\`（4 出现在 3 的左孩子而 2 的右孩子空着），则第 3 层出现「空位在前、节点在后」，就不是完全二叉树了。

**考点：** 完全二叉树的判定
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
            explanation: `
**答案：√**

**解析：**
双向链表每个节点同时持有 prev 和 next 指针，可在**两端 O(1) 插入/删除**：

- **栈**：把表头当栈顶，push/pop 都在头结点操作，O(1)；
- **队列**：入队走表尾（tail），出队走表头（head），借助双向指针各一步到位，O(1)。

所以「栈和队列均可用双向链表实现且插删 O(1)」正确。

**易错点：** 单向链表实现队列时，出队 O(1)（头删）但入队若不维护尾指针则需 O(n) 遍历——双向链表的优势正在于任意端都能 O(1) 操作；对比顺序存储（数组）实现队列会有假溢出/搬移问题（除非用循环队列）。

**考点：** 栈与队列的链式实现
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
