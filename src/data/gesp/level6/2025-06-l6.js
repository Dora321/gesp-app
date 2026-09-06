// 2025年6月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `4
1 5 6 3`, output: `10` },
        { input: `8
0 2 5 6 4 3 3 4`, output: `12` }
      ],
      question: `
# [GESP202506 六级] 学习小组

## 题目描述

班主任计划将班级里的 $ n $ 名同学划分为若干个学习小组，每名同学都需要分入某一个学习小组中。观察发现，如果一个学习小组中恰好包含 $ k $ 名同学，则该学习小组的讨论积极度为 $ a_k $。

给定讨论积极度 $ a_1, a_2, \\ldots, a_n $，请你计算将这 $ n $ 名同学划分为学习小组的所有可能方案中，讨论积极度之和的最大值。

## 输入格式

第一行，一个正整数 $ n $，表示班级人数。

第二行，$ n $ 个非负整数 $ a_1, a_2, \\ldots, a_n $，表示不同人数学习小组的讨论积极度。

## 输出格式

输出共一行，一个整数，表示所有划分方案中，学习小组讨论积极度之和的最大值。
`,
      score: 25,
      explanation: `**解析：**
      设 dp[i] 为前 i 名同学最优分组后的最大积极度。最后一组人数可以是任意 j（1<=j<=i），于是转移为 dp[i]=max(dp[i-j]+a_j)。

      **考点：** 动态规划
      `,
      tags: ["编程题", "动态规划"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<long long> a(n+1), dp(n+1, 0);\n    for (int i = 1; i <= n; ++i) cin >> a[i];\n    for (int i = 1; i <= n; ++i) {\n        for (int j = 1; j <= i; ++j) {\n            dp[i] = max(dp[i], dp[i-j]+a[j]);\n        }\n    }\n    cout << dp[n] << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3
1 3
2 5
4 8`, output: `1
2
1` },
        { input: `1
120 650`, output: `9` }
      ],
      question: `
# [GESP202506 六级] 最大因数

## 题目描述

给定一棵有 $10^9$ 个结点的有根树，这些结点依次以 $1, 2, \\dots, 10^9$ 编号，根结点的编号为 $1$。对于编号为 $k$（$2 \\leq k \\leq 10^9$）的结点，其父结点的编号为 $k$ 的因数中除 $k$ 以外最大的因数。

现在有 $q$ 组询问，第 $i$（$1 \\leq i \\leq q$）组询问给定 $x_i, y_i$，请你求出编号分别为 $x_i, y_i$ 的两个结点在这棵树上的距离。两个结点之间的距离是连接这两个结点的简单路径所包含的边数。

## 输入格式

第一行，一个正整数 $q$，表示询问组数。

接下来 $q$ 行，每行两个正整数 $x_i, y_i$，表示询问结点的编号。

## 输出格式

输出共 $q$ 行，每行一个整数，表示结点 $x_i, y_i$ 之间的距离。
`,
      score: 25,
      explanation: `**解析：**
      结点 x 的父亲是 x 除以其最小质因子，因此向上走一步就是删去一个最小质因子。先记 depth(x) 为删到 1 需要几步（即质因子个数，按重数计），查询时先把更深的点抬到同层，再同步上跳直到相遇。

      **考点：** 数论、树
      `,
      tags: ["编程题", "数论", "树"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> primes;\n\nint smallestPrimeFactor(int x) {\n    for (int p : primes) {\n        if (1LL * p * p > x) break;\n        if (x % p == 0) return p;\n    }\n    return x;\n}\n\nint parentOf(int x) {\n    if (x == 1) return 1;\n    return x / smallestPrimeFactor(x);\n}\n\nunordered_map<int, int> depthMemo;\nint getDepth(int x) {\n    auto it = depthMemo.find(x);\n    if (it != depthMemo.end()) return it->second;\n    int res = (x == 1 ? 0 : getDepth(parentOf(x))+1);\n    depthMemo[x] = res;\n    return res;\n}\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    const int LIM = 31623;\n    vector<bool> isPrime(LIM+1, true);\n    isPrime[0] = isPrime[1] = false;\n    for (int i = 2; i <= LIM; ++i) {\n        if (!isPrime[i]) continue;\n        primes.push_back(i);\n        if (1LL * i * i <= LIM) {\n            for (int j = i * i; j <= LIM; j += i) isPrime[j] = false;\n        }\n    }\n    depthMemo[1] = 0;\n\n    int q;\n    cin >> q;\n    while (q--) {\n        int x, y;\n        cin >> x >> y;\n        int dx = getDepth(x), dy = getDepth(y);\n        int ans = 0;\n        while (dx > dy) {\n            x = parentOf(x);\n            --dx;\n            ++ans;\n        }\n        while (dy > dx) {\n            y = parentOf(y);\n            --dy;\n            ++ans;\n        }\n        while (x != y) {\n            x = parentOf(x);\n            y = parentOf(y);\n            ans += 2;\n        }\n        cout << ans << '\\n';\n    }\n    return 0;\n}",
      answer: '',
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
            question: `下列哪一项不是面向对象编程的基本特征？`,
            options: [
                "继承",
                "封装",
                "多态",
                "链接",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（链接）**

**面向对象的三大基本特征：**
- **封装**：把数据和操作数据的方法绑在一起，对外只暴露必要的接口
- **继承**：派生类复用基类的成员，表达「是一种」的关系
- **多态**：同一个接口作用在不同对象上，表现出不同行为

**为什么选 D：** 「链接」（linking）是编译过程中的一步——把各个目标文件与库合并成可执行程序，属于**构建流程**的概念，与面向对象的设计思想无关。

**考点：** 面向对象、三大特征`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 2,
            type: "single",
            sourceIntegrity: "contaminated-stem",
            integrityNote: "选项 A 的末尾串入了题干的类定义代码（「class Animal { public: std::string name; …」），说明抓取时把代码块混进了选项文本。答案本身可辨认，但选项文本已不是原卷原文。",
            question: `为了让 Dog 类的构造函数能正确地调用其父类 Animal 的构造方法，横线线处应填入（ ）。`,
            options: [
                "Animal(name) class Animal { public: std::string name; Animal(std::string str) : name(str) { std::cout << \"Animal created\n\"; } virtual void speak() { cout << \"Animal speaks\" << endl; } }; class Dog : public Animal { std::string breed; public: Dog(std::string name, std::string b) : _________________, breed(b) { std::cout << \"Dog created\n\"; } void speak() override { cout << \"Dog barks\" << endl; } }; int main() { Animal* p = new Dog(\"Rex\", \"Labrador\"); p->speak(); delete p; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29",
                "super(name)",
                "Animal::Animal(name)",
                "Animal()",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A Animal(name) class Animal { public: std:...**：正确答案。
            - **B super(name)**：不是本题答案。
            - **C Animal::Animal(name)**：不是本题答案。
            - **D Animal()**：不是本题答案。

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
            question: `代码同上一题，代码执行结果是（ ）。`,
            options: [
                "输出 Animal speaks",
                "输出 Dog barks",
                "编译错误",
                "程序崩溃",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 输出 Animal speaks**：不是本题答案。
            - **B 输出 Dog barks**：正确答案。
            - **C 编译错误**：不是本题答案。
            - **D 程序崩溃**：不是本题答案。
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
            question: `以下关于栈和队列的代码，执行后输出是（ ）。`,
            options: [
                "1 3",
                "3 1",
                "3 3",
                "1 1",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（3 1）**

**逐步模拟：** 循环里 i 依次取 1、2、3，同时压入栈和队列。

| i | 栈 s（栈底→栈顶） | 队列 q（队首→队尾） |
| --- | --- | --- |
| 1 | 1 | 1 |
| 2 | 1 2 | 1 2 |
| 3 | 1 2 3 | 1 2 3 |

- \`s.top()\` 取**栈顶** = 最后压入的 **3**
- \`q.front()\` 取**队首** = 最先入队的 **1**

输出 \`3 1\`。

**为什么其余选项不对：**
- **A（1 3）**：把两者的取值端搞反了。
- **C（3 3）**：队列若返回 3，那是 \`q.back()\`（队尾）。
- **D（1 1）**：栈若返回 1，那是栈底，而栈根本不提供访问栈底的接口。

**记忆点：** 栈是后进先出（top 取最新），队列是先进先出（front 取最旧）。同一批数据进去，两者的「出口」正好相反。

**考点：** 栈、队列、STL 容器`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `在一个循环队列中， front 是指向队头的指针， rear 指向队尾的指针，队列最大容量为 maxSize 。判断 队列已满的条件是（ ）。`,
            options: [
                "rear == front",
                "(rear+1) % maxSize == front",
                "(rear-1+maxSize) % maxSize == front",
                "(rear-1) == front",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（(rear+1) % maxSize == front）**

**为什么这样判满：** 循环队列里 \`front == rear\` 被用来表示**队空**。如果让队列真的填满 maxSize 个元素，rear 绕一圈后会重新等于 front——此时「空」和「满」的判断条件完全一样，无法区分。

通行做法是**牺牲一个存储位置**：当 rear 再前进一格就会撞上 front 时，就认为已满。即 \`(rear+1) % maxSize == front\`。这样容量为 maxSize 的数组实际最多存 maxSize−1 个元素。

**逐项分析：**
- **A**：这是判**空**的条件。
- **B**：正确。
- **C**：\`(rear-1+maxSize) % maxSize\` 是 rear 的**前一格**，与 front 相等说明队列里只有一个元素，不是满。
- **D**：没有取模，rear 绕回数组开头后判断就会失效。

**考点：** 循环队列、判空判满`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `（ ）只有最底层的节点未被填满，且最底层节点尽量靠左填充。`,
            options: [
                "完美二叉树",
                "完全二叉树",
                "完满二叉树",
                "平衡二叉树",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（完全二叉树）**

**四种树的定义辨析：**
- **完美二叉树**（满二叉树的一种叫法）：每一层都被填满，节点数恰为 2^h − 1。
- **完全二叉树**：除最底层外每层都填满，且**最底层的节点集中靠左**排列——正是题干的描述。这个性质让它可以用数组连续存储，节点 i 的左右孩子在 2i 和 2i+1。
- **完满二叉树**：每个节点要么没有孩子，要么有两个孩子，但不要求层被填满。
- **平衡二叉树**：任一节点的左右子树高度差不超过 1，约束的是高度而不是填充位置。

**关键区别：** 完全二叉树强调「靠左填充」，这一条是它能用数组紧凑存储的前提；完满二叉树只管孩子个数，不管排列位置。

**考点：** 二叉树、完全二叉树`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 7,
            type: "single",
            sourceIntegrity: "options-reconstructed",
            integrityNote: "题干的索引公式在提取时丢失（「索引为 （从 开始计数）」），选项 A 是另一道题的栈/队列代码，选项 B、C、D 仍是占位符，本题内容基本未收录。",
            question: `在使用数组表示完全二叉树时，如果一个节点的索引为 （从 开始计数），那么其左子节点的索引通常是（ ）。`,
            options: [
                "stack<int> s; queue<int> q; for (int i = 1; i <= 3; ++i) { s.push(i); q.push(i); } cout << s.top() << \" \" << q.front() << endl; 1 2 3 4 5 6 7 8",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A stack<int> s; queue<int> q; for (int i =...**：不是本题答案。对队列的先进先出特性或循环队列满判断理解有误。
            - **B 选项B**：不是本题答案。
            - **C 选项C**：不是本题答案。
            - **D 选项D**：正确答案。

            **考点：** 数组
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
            question: `已知一棵二叉树的前序遍历序列为 GDAFEMHZ ，中序遍历序列为 ADFGEHMZ ，则其后序遍历序列为（ ）。`,
            options: [
                "ADFGEHMZ",
                "ADFGHMEZ",
                "AFDGEMZH",
                "AFDHZMEG",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（AFDHZMEG）**

**还原步骤：** 前序 \`GDAFEMHZ\`，中序 \`ADFGEHMZ\`。前序的第一个是根，中序里根的两侧是左右子树。

1. 根 = **G**；中序中 G 左侧 \`A D F\` 是左子树，右侧 \`E H M Z\` 是右子树
2. **左子树**：前序 \`D A F\` → 根 D；中序 \`A D F\` → 左孩子 A、右孩子 F
3. **右子树**：前序 \`E M H Z\` → 根 E；中序 \`E H M Z\` → E 左边为空，右边 \`H M Z\` 全是右子树
4. **E 的右子树**：前序 \`M H Z\` → 根 M；中序 \`H M Z\` → 左孩子 H、右孩子 Z

还原出的树：

\`\`\`
        G
      /   \\
     D     E
    / \\      \\
   A   F      M
             / \\
            H   Z
\`\`\`

**求后序**（左 → 右 → 根）：
- 左子树：A F D
- 右子树：H Z M E
- 最后根 G

拼起来 → **A F D H Z M E G**

**易错点：** 中序里 E 的左侧为空，说明 E 没有左孩子，\`H M Z\` 整体挂在 E 的右边。漏看这一点就会得到选项 B 那样的错误顺序。

**考点：** 二叉树遍历、前序中序还原`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `设有字符集 {a, b, c, d, e} ，其出现频率分别为 {5, 8, 12, 15, 20} ，得到的哈夫曼编码为（ ）。`,
            options: [
                "a:010, b:011, c:00, d:10, e:11",
                "a:00, b:01, c:10, d:110, e:111",
                "a:000, b:001, c:010, d:011, e:1",
                "a:0, b:10, c:110, d:1110, e:1111",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

**建哈夫曼树：** 频率 {a:5, b:8, c:12, d:15, e:20}，每次取最小的两个合并。

| 步骤 | 合并 | 结果集合 |
| --- | --- | --- |
| 1 | 5 + 8 = 13 | {12, 13, 15, 20} |
| 2 | 12 + 13 = 25 | {15, 20, 25} |
| 3 | 15 + 20 = 35 | {25, 35} |
| 4 | 25 + 35 = 60 | 根 |

**读出码长**（= 根到叶子的深度）：
- 根下挂着 25 和 35，都在深度 1
- 25 = 12 + 13：c(12) 深度 2；13 在深度 2
- 13 = 5 + 8：a、b 深度 3
- 35 = 15 + 20：d、e 深度 2

所以 **a、b 是 3 位，c、d、e 是 2 位**。

**对照选项 A**：a:010(3)、b:011(3)、c:00(2)、d:10(2)、e:11(2) ✓ 长度全部吻合，且互不为前缀。

**其余选项：**
- **B**：a、b 只有 2 位而 d、e 有 3 位，与频率关系反了——频率低的反而拿到短码。
- **C**：e 只有 1 位，但 20 并非远大于其余频率之和，建不出这种极端偏斜的树。
- **D**：码长 1/2/3/4/4，对应的是频率悬殊得多的分布。

**考点：** 哈夫曼编码、贪心`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 10,
            type: "single",
            sourceIntegrity: "contaminated-stem",
            integrityNote: "选项 D 的末尾串入了本卷第 9 题的选项内容（「a: 010 b: 011 c: 00 …」）与行号残留，说明抓取跨题串了内容。",
            question: `3 位格雷编码中，编码 101 之后的下一个编码不可能是（ ）。`,
            options: [
                "100",
                "111",
                "110",
                "001 a: 010 b: 011 c: 00 d: 10 e: 11 1 2 3 4 5 a: 00 b: 10 c: 011 d: 100 e: 111 1 2 3 4 5 a: 10 b: 01 c: 011 d: 100 e: 111 1 2 3 4 5 a: 100 b: 01 c: 011 d: 100 e: 00 1 2 3 4 5",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（110）**

**格雷码的核心性质：** 相邻两个编码**恰好只有一位不同**。

从 \`101\` 出发，改动其中任意一位可以得到：
- 改最高位 → \`001\`
- 改中间位 → \`111\`
- 改最低位 → \`100\`

**逐项检查：**
- **A 100**：与 101 只差最低位 ✓ 可能
- **B 111**：只差中间位 ✓ 可能
- **C 110**：101 → 110 需要同时改中间位和最低位，**差了两位** ✗ 不可能
- **D 001**：只差最高位 ✓ 可能

**关键点：** 判断两个编码能否相邻，只需数一数有多少位不同（即异或后有几个 1）。101 ⊕ 110 = 011，两个 1，所以不相邻。

**考点：** 格雷编码、位运算`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 11,
            type: "single",
            sourceIntegrity: "contaminated-stem",
            integrityNote: "题干与代码是二叉树的深度优先遍历（参数为 TreeNode* root），四个选项却全是图遍历的判断条件（visited[v]、adj[u].size()），两者来自不同的题目，无法对应作答。",
            question: `请将下列 C++ 实现的深度优先搜索（DFS）代码补充完整，横线处应填入（ ）。`,
            options: [
                "!visited[v]",
                "visited[v]",
                "adj[u].size() > 0",
                "v != u",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A !visited[v]**：正确答案。
            - **B visited[v]**：不是本题答案。
            - **C adj[u].size() > 0**：不是本题答案。
            - **D v != u**：不是本题答案。

            **考点：** 结构体、STL容器、指针
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
            sourceIntegrity: "options-reconstructed",
            integrityNote: "题干要求「返回每一层中最大的节点值」，这需要层序遍历并逐层取最大；四个选项却都是前序遍历的写法，且所录答案 D 会在叶子节点解引用空指针。选项与题意不匹配。",
            question: `给定一个二叉树，返回每一层中最大的节点值，结果以数组形式返回，横线处应填入（ ）。 struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x): val(x), left(nullptr), right(nullptr) {} }; void dfs(TreeNode* root, vector<int>& result) { if (root == nullptr) return; __________________________ } 1 2 3 4 5 6 7 8 9 10 11 12 result.push_back(root->val); dfs(root->left); dfs(root->right); 1 2 3 result.push_back(root->left->val); dfs(root->right); dfs(root->left); 1 2 3 result.push_back(root->left->val); dfs(root->left); dfs(root->right); 1 2 3 result.push_back(root->right->val); dfs(root->right); dfs(root->left); 1 2 3 #include <vector> #include <queue> #include <algorithm> struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x): val(x), left(nullptr), right(nullptr) {} }; vector<int> largestValues(TreeNode* root) { vector<int> result; if (!root) return result; queue<TreeNode*> q; q.push(root); while (!q.empty()) { int sz = q.size(); 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20`,
            options: [
                "result.push_back(root->val); dfs(root->left); dfs(root->right);",
                "result.push_back(root->left->val); dfs(root->right); dfs(root->left);",
                "result.push_back(root->left->val); dfs(root->left); dfs(root->right);",
                "result.push_back(root->right->val); dfs(root->right); dfs(root->left);",
],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A result.push_back(root->val); dfs(root->left); dfs(root->right);**：不是本题答案。
            - **B result.push_back(root->left->val); dfs(root->right); dfs(root->left);**：不是本题答案。
            - **C result.push_back(root->left->val); dfs(root->left); dfs(root->right);**：不是本题答案。
            - **D result.push_back(root->right->val); dfs(root->right); dfs(root->left);**：正确答案。

            **考点：** 数组
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
            sourceIntegrity: "options-reconstructed",
            integrityNote: "代码中插入函数的参数名为 key，四个选项却一律写作 val；且横线处缺少 key 与 root->val 的比较条件，仅凭选项无法判断该走左子树还是右子树。",
            question: `下面代码实现一个二叉排序树的插入函数（没有相同的数值），横线处应填入（ ）。 struct TreeNode { int val; TreeNode* left; TreeNode* right; TreeNode(int x): val(x), left(nullptr), right(nullptr) {} }; void insert(TreeNode*& root, int key) { if (!root) { root = new TreeNode(key); return; } _______________________________ } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 if (key < root->val) insert(root->left, key); else if (key > root->val) insert(root->right, key); 1 2 3 4`,
            options: [
                "insert(root->left, val)",
                "insert(root->right, val)",
                "root->left = new Node(val)",
                "root = root->left",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A insert(root->left, val)**：正确答案。
            - **B insert(root->right, val)**：不是本题答案。
            - **C root->left = new Node(val)**：不是本题答案。
            - **D root = root->left**：不是本题答案。

            **考点：** 树与二叉树、结构体、指针
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
            question: `以下关于动态规划算法特性的描述，正确的是（ ）。`,
            options: [
                "子问题相互独立，不重叠",
                "问题包含重叠子问题和最优子结构",
                "只能从底至顶迭代求解",
                "必须使用递归实现，不能使用迭代",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（问题包含重叠子问题和最优子结构）**

**动态规划的两个前提：**
- **最优子结构**：大问题的最优解可以由子问题的最优解拼出来。没有这一条，就没法用子问题的答案推出总答案。
- **重叠子问题**：同一个子问题会被反复求解。正因为重叠，把结果存下来复用才有意义——这也是 DP 区别于分治的地方。

**逐项分析：**
- **A**：说反了。子问题「相互独立、不重叠」正是**分治**（如归并排序）的特征；那种情况下记忆化没有收益。
- **B**：正确。
- **C**：DP 有自底向上的递推和自顶向下的记忆化递归两种写法，不限于迭代。
- **D**：同上，也不是必须递归。递推实现反而更常见。

**考点：** 动态规划、算法特性`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `给定 个物品和一个最大承重为 的背包，每个物品有一个重量 和价值 ，每个物品只能选择放或 不放。目标是选择若干个物品放入背包，使得总价值最大，且总重量不超过 。关于下面代码，说法正确的是（ ）。`,
            options: [
                "该算法不能处理背包容量为 0 的情况",
                "外层循环 i 遍历背包容量，内层遍历物品",
                "从大到小遍历 w 是为了避免重复使用同一物品",
                "这段代码计算的是最小重量而非最大价值",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（从大到小遍历 w 是为了避免重复使用同一物品）**

**为什么必须倒序：** 一维数组把二维的 \`dp[i][w]\` 压缩成了 \`dp[w]\`。更新时读到的 \`dp[w-wt[i]]\` 究竟代表哪一轮的结果，完全取决于遍历方向：

- **倒序（w 从 W 递减）**：\`w-wt[i]\` 比 w 小，本轮还没被改写，仍是「没考虑第 i 件物品」时的值 → 每件物品最多用一次，正是 0/1 背包
- **正序**：\`dp[w-wt[i]]\` 本轮已经更新过，可能已经包含了第 i 件物品 → 同一件物品被反复选取，算出来的是**完全背包**

**逐项分析：**
- **A**：\`vector<int> dp(W + 1, 0)\` 在 W=0 时是长度为 1 的数组，内层循环条件 \`w >= wt[i]\` 直接不成立，返回 dp[0]=0，处理是正确的。
- **B**：说反了——外层 i 遍历**物品**，内层 w 遍历**容量**。
- **C**：正确。
- **D**：\`max(dp[w], dp[w-wt[i]] + val[i])\` 取的是价值的较大值，求的就是最大价值。

**考点：** 动态规划、0/1 背包`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `构造函数可以被声明为 virtual。`,
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
            question: `给定一组字符及其出现的频率，构造出的哈夫曼树是唯一的。`,
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
            id: 18,
            type: "judge",
            question: `为了实现一个队列，使其出队操作（ pop ）的时间复杂度为 并且避免数组删除首元素的 问题，一 种常见且有效的方法是使用环形数组，通过调整队首和队尾指针来实现。 if (key < root->val) insert(root->right, key); else if (key > root->val) insert(root->left, key); 1 2 3 4 insert(root->left, key); insert(root->right, key); 1 2 insert(root->right, key); insert(root->left, key); 1 2 int knapsack1D(int W, vector<int>& wt, vector<int>& val, int n) { vector<int> dp(W+1, 0); for (int i = 0; i < n; ++i) { for (int w = W; w >= wt[i]; --w) { dp[w] = max(dp[w], dp[w-wt[i]]+val[i]); } } return dp[W]; } 1 2 3 4 5 6 7 8 9`,
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
            question: `对一棵二叉排序树进行中序遍历，可以得到一个递增的有序序列。`,
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
            question: `如果二叉搜索树在连续的插入和删除操作后，所有节点都偏向一侧，导致其退化为类似于链表的结构，这时 其查找、插入、删除操作的时间复杂度会从理想情况下的 退化到 。`,
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
            id: 21,
            type: "judge",
            question: `执行下列代码， my_dog.name 的最终值是 Charlie 。`,
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
            id: 22,
            type: "judge",
            question: `下列 C++ 代码可以成功编译，并且子类 Child 的实例能通过其成员函数访问父类 Parent 的属性 value 。`,
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
            id: 23,
            type: "judge",
            question: `下列代码中的 tree 向量，表示的是一棵完全二叉树 ( -1 代表空节点)按照层序遍历的结果。`,
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
            id: 24,
            type: "judge",
            question: `在树的深度优先搜索（DFS）中，使用栈作为辅助数据结构以实现“先进后出”的访问顺序。`,
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
            id: 25,
            type: "judge",
            question: `下面代码采用动态规划求解零钱兑换问题：给定 种硬币，第 𝑖 种硬币的面值为 𝑐𝑜𝑖𝑛𝑠[𝑖 − 1] ，目标金额为 𝑎𝑚𝑡 ，每种硬币可以重复选取，求能够凑出目标金额的最少硬币数量；如果不能凑出目标金额，返回 -1 。 class Dog { public: std::string name; Dog(std::string str) : name(str) {} }; int main() { Dog my_dog("Buddy"); my_dog.name = "Charlie"; return 0; } 1 2 3 4 5 6 7 8 9 10 11 class Parent { private: int value = 100; }; class Child : public Parent { public: int get_private_val() { return value; // 尝试访问父类的私有成员 } }; 1 2 3 4 5 6 7 8 9 10 #include <vector> std::vector<int> tree = {1, 2, 3, 4, -1, 6, 7}; 1 2 int coinChangeDPComp(vector<int> &coins, int amt) { int n = coins.size(); int MAX = amt+1; vector<int> dp(amt+1, MAX); dp[0] = 0; for (int i = 1; i <= n; i++) { for (int a = 1; a <= amt; a++) { if (coins[i-1] > a) dp[a] = dp[a]; else dp[a] = min(dp[a], dp[a-coins[i-1]]+1); } } return dp[amt] != MAX ? dp[amt] : -1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17`,
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
