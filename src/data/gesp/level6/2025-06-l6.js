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
            question: `为了让 Dog 类的构造函数能正确地调用其父类 Animal 的构造方法，横线处应填入（ ）。\n\n\`\`\`cpp\nclass Animal {\npublic:\n    std::string name;\n    Animal(std::string str) : name(str) {\n        std::cout << "Animal created\\n";\n    }\n    virtual void speak() {\n        cout << "Animal speaks" << endl;\n    }\n};\n\nclass Dog : public Animal {\n    std::string breed;\npublic:\n    Dog(std::string name, std::string b) : ______________, breed(b) {\n        std::cout << "Dog created\\n";\n    }\n    void speak() override {\n        cout << "Dog barks" << endl;\n    }\n};\n\nint main() {\n    Animal* p = new Dog("Rex", "Labrador");\n    p->speak();\n    delete p;\n    return 0;\n}\n\`\`\`\n`,
            options: [
                "Animal(name)",
                "super(name)",
                "Animal::Animal(name)",
                "Animal()",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
派生类构造函数通过**成员初始化列表**调用基类构造函数：\`Dog(...) : Animal(name), breed(b) { }\`——横线在初始化列表中，应填 **\`Animal(name)\`**，把 name 传给基类 Animal 的构造函数。

执行流程：\`new Dog("Rex", "Labrador")\` → 先调用 Animal("Rex") 输出 \`Animal created\` → 再初始化 breed → 执行 Dog 构造体输出 \`Dog created\`。

逐项分析：
- **A \`Animal(name)\`**：正确，初始化列表中调用基类构造的标准写法。
- **B \`super(name)\`**：错误，super 是 Java/Python 的语法，C++ 没有该关键字。
- **C \`Animal::Animal(name)\`**：错误，不能显式限定调用基类构造函数（初始化列表里直接写类名即可）。
- **D \`Animal()\`**：错误，Animal 没有无参构造函数（定义了带参构造后编译器不再生成默认构造），且没有把 name 传下去，编译报错。

**易错点：** 若基类只有带参构造，派生类构造函数**必须**在初始化列表中显式调用它，否则编译错误——这一点与 Java 的隐式 super() 不同。

**考点：** 派生类构造函数与基类构造的调用
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
            explanation: `
**答案：B**

**解析：**
关键点：\`Animal* p = new Dog(...)\`，且 Animal 的 \`speak()\` 是 **virtual**，Dog 用 \`override\` 重写——通过基类指针调用时发生**动态绑定**。

执行 \`p->speak()\`：实际对象是 Dog，调用 Dog::speak()，输出 **\`Dog barks\`**。

逐项分析：
- **A 输出 Animal speaks**：错误，只有 speak() 不是虚函数时才会静态绑定到基类版本。
- **B 输出 Dog barks**：正确。
- **C 编译错误**：错误，虚函数+override 是标准的多态写法。
- **D 程序崩溃**：错误，delete p 时因基类析构非虚会有警告隐患，但不影响本次输出（且选项问的是执行结果）。

**易错点：** 判断输出看三点——指针类型是基类、函数是 virtual、实际对象是派生类 → 调派生类版本；去掉 virtual 任一条件，答案就变 A。

**考点：** 虚函数与多态的运行结果分析
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
            question: `在使用数组表示完全二叉树时，如果一个节点的索引为 i（从 0 开始计数），那么其左子节点的索引通常是（ ）。`,
            options: [
                "(i-1)/2",
                "i+1",
                "i*2",
                "2*i+1",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
数组表示完全二叉树、**从 0 开始编号**时：节点 i 的左孩子是 **2i+1**，右孩子是 2i+2，父节点是 ⌊(i−1)/2⌋。

验证：根 i=0 → 左孩子 1、右孩子 2；节点 1 → 孩子 3、4——与层序编号 0,1,2,3,4… 完全一致。

逐项分析：
- **A (i−1)/2**：错误，这是**父节点**索引。
- **B i+1**：错误，i+1 是 i 的右兄弟（若存在）。
- **C i*2**：错误，这是**从 1 开始编号**时的左孩子公式。
- **D 2*i+1**：正确，0 起点编号的左孩子。

**易错点：** 与 2024 年真题「从 1 开始编号：左孩子 2i、右孩子 2i+1」对照记忆——起点差 1，公式差 1，审题先看起点。

**考点：** 完全二叉树的数组存储（0 起点编号）
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
            question: `请将下列 C++ 实现的深度优先搜索（DFS）代码补充完整，横线处应填入（ ）。\n\n\`\`\`cpp\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nvoid dfs(TreeNode* root, vector<int>& result) {\n    if (root == nullptr) return;\n    ____________________\n}\n\`\`\`\n`,
            options: [
                "result.push_back(root->val);\ndfs(root->left);\ndfs(root->right);",
                "result.push_back(root->left->val);\ndfs(root->right);\ndfs(root->left);",
                "result.push_back(root->left->val);\ndfs(root->left);\ndfs(root->right);",
                "result.push_back(root->right->val);\ndfs(root->right);\ndfs(root->left);",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
函数框架是递归 DFS（先序）：空树直接返回；非空时要**先记录当前节点的值，再递归左右子树**。

\`\`\`cpp
result.push_back(root->val);   // 访问根
dfs(root->left);               // 递归左
dfs(root->right);              // 递归右
\`\`\`

这正是**先序遍历**（根→左→右）的收集过程，选 A。

逐项分析：
- **A push root->val，先左后右**：正确，先序遍历。
- **B push root->left->val（左孩子的值）**：错误，没有访问根，且若 root->left 为空会解引用空指针。
- **C 同 B**：错误，同上。
- **D push root->right->val**：错误，先访问右孩子且跳过根，不符合任何标准遍历。

**易错点：** DFS 遍历三序的区别只在于「访问根」的位置：先序（根左右）、中序（左根右）、后序（左右根）；选项 B/C/D 连根都没访问，直接排除。

**考点：** 递归 DFS（先序遍历）的补全
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
            question: `给定一个二叉树，返回每一层中最大的节点值，结果以数组形式返回，横线处应填入（ ）。\n\n\`\`\`cpp\n#include <vector>\n#include <queue>\n#include <algorithm>\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x): val(x), left(nullptr), right(nullptr) {}\n};\nvector<int> largestValues(TreeNode* root) {\n    vector<int> result;\n    if (!root) return result;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        int sz = q.size();\n        int maxVal = INT_MIN;\n        for (int i = 0; i < sz; ++i) {\n            TreeNode* node;\n            ______________________ // 在此处填入代码\n            maxVal = max(maxVal, node->val);\n            if (node->left) q.push(node->left);\n            if (node->right) q.push(node->right);\n        }\n        result.push_back(maxVal);\n    }\n    return result;\n}\n\`\`\`\n`,
            options: [
                "node = q.end();",
                "node = q.front();",
                "q.pop();\nnode = q.front();",
                "node = q.front();\nq.pop();",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
算法逐层处理：外层 while 每轮取当前层节点数 sz，内层 for 循环 sz 次，逐个出队取值求最大值，层末把 maxVal 存入 result。

横线处需要对队首节点完成「**取出并移除**」两步：

\`\`\`cpp
node = q.front();   // 取队首
q.pop();            // 移出队列
\`\`\`

逐项分析：
- **A \`node = q.end();\`**：错误，std::queue 没有 end() 接口（那是容器的迭代器接口）。
- **B \`node = q.front();\`**：错误，只取不弹，队列永远不减，while 死循环。
- **C 先 pop 再 front**：错误，先弹出后队首已变，取到的是下一个节点，且丢失当前节点。
- **D \`node = q.front(); q.pop();\`**：正确，先取后弹，顺序不能反。

**易错点：** front/pop 的先后顺序是队列操作的高频陷阱——pop 无返回值，必须先用 front 取值再 pop。

**考点：** BFS 层序处理（front + pop 配合）
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
            question: `下面代码实现一个二叉排序树的插入函数（没有相同的数值），横线处应填入（ ）。\n\n\`\`\`cpp\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x): val(x), left(nullptr), right(nullptr) {}\n};\n\nvoid insert(TreeNode*& root, int key) {\n    if (!root) {\n        root = new TreeNode(key);\n        return;\n    }\n    _______________________________\n}\n\`\`\`\n`,
            options: [
                "if (key < root->val)\n    insert(root->left, key);\nelse if (key > root->val)\n    insert(root->right, key);",
                "if (key < root->val)\n    insert(root->right, key);\nelse if (key > root->val)\n    insert(root->left, key);",
                "insert(root->left, key);\ninsert(root->right, key);",
                "insert(root->right, key);\ninsert(root->left, key);",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
BST 插入规则：**小于根走左，大于根走右**（题目保证无重复值，无需处理相等）。

\`\`\`cpp
if (key < root->val)
    insert(root->left, key);
else if (key > root->val)
    insert(root->right, key);
\`\`\`

注意参数是 \`TreeNode*&\`（引用传递），递归到空位时 \`root = new TreeNode(key)\` 直接把新节点**挂到父节点的孩子指针上**。

逐项分析：
- **A**：正确，左小右大。
- **B**：错误，小于根反而插到右子树，破坏 BST 性质。
- **C**：错误，不比较大小就两边都插，节点会重复出现且树膨胀。
- **D**：错误，无条俸地两侧都插，完全错误。

**易错点：** 「没有相同的数值」意味着不需要 else 分支处理 key == root->val 的情形；若允许重复，通常约定相等值插入右子树并明确写出。

**考点：** 二叉排序树的插入
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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
构造函数不能声明为 virtual。虚函数机制依赖虚函数表（vtable），而虚表指针是在构造过程中由构造函数初始化的——对象尚未构造完成时无法通过虚机制确定该调用哪个类的构造函数。需要多态「克隆」时常用虚工厂函数（如 clone()）替代，析构函数则通常应当声明为 virtual。

**考点：** 面向对象、构造函数
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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
哈夫曼树不唯一。存在多个频率相同的最小节点时，选取顺序可以不同；同一父节点下的左右子树也可以互换。虽然不同构造方式得到的 WPL（带权路径长度）相同，但树形结构和编码可以不同，因此哈夫曼树不唯一。

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
            question: `为了实现一个队列，使其出队操作（ pop ）的时间复杂度为 O(1) 并且避免数组删除首元素的 O(n) 问题，一 种常见且有效的方法是使用环形数组，通过调整队首和队尾指针来实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
普通数组队列出队要整体前移后续元素，代价 O(n)。环形数组把数组首尾逻辑相连，出队只需 front = (front + 1) % capacity 移动队首指针，入队同理移动 rear 指针，两者都是 O(1)；配合留空位或计数区分队空与队满即可。std::deque 的底层分块结构、许多题解中的循环队列也正是这一思路。

**考点：** 队列、循环队列
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

**解析：**
二叉排序树（BST）满足「左子树 < 根 < 右子树」。中序遍历的顺序是「左 → 根 → 右」，先输出比根小的、再输出根、最后输出比根大的，递归下去恰好得到递增有序序列，这也是验证一棵树是否为 BST 的经典方法。

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
            question: `如果二叉搜索树在连续的插入和删除操作后，所有节点都偏向一侧，导致其退化为类似于链表的结构，这时 其查找、插入、删除操作的时间复杂度会从理想情况下的 O(log n) 退化到 O(n log n)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
BST 退化为链表后，操作需要沿唯一的路径逐个节点比较，查找、插入、删除都是 O(n)——链表是线性结构，不存在对数级别的分支削减。题干说退化到 O(n log n)，实际应为 O(n)，退化程度说法错误。

**考点：** 时间复杂度、二叉搜索树
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
            question: `执行下列代码， my_dog.name 的最终值是 Charlie 。

\`\`\`cpp
#include <iostream>
class Dog {
public:
    std::string name;
    Dog(std::string str) : name(str) {}
};
int main() {
    Dog my_dog("Buddy");
    my_dog.name = "Charlie";
    return 0;
}
\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
构造时 name 初始化为 "Buddy"，随后 main 中执行 my_dog.name = "Charlie"; 直接给公有成员赋值，最终 my_dog.name 的值是 "Charlie"。name 是 public 成员，类外可以直接访问。

**考点：** 面向对象、构造函数
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
            question: `下列 C++ 代码可以成功编译，并且子类 Child 的实例能通过其成员函数访问父类 Parent 的属性 value 。

\`\`\`cpp
class Parent {
private:
    int value = 100;
};
class Child : public Parent {
public:
    int get_private_val() {
        return value; // 尝试访问父类的私有成员
    }
};
\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
Parent 中的 value 是 private 成员，私有成员只对类自身（及其友元）可见，即使像本例这样 public 继承，子类也不能直接访问父类的私有成员——get_private_val() 中的 return value 无法通过编译。若要允许子类访问，应把 value 声明为 protected。

**考点：** 面向对象、访问控制
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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
tree = {1, 2, 3, 4, -1, 6, 7}，按层序还原：节点 1 的孩子是 2、3；节点 2 的孩子是 4 和空（-1）；节点 3 的孩子是 6、7。

完全二叉树要求**空节点只能出现在层序序列的末尾**——一旦某个位置为空，其后不允许再有任何节点。本题中 -1 出现在下标 4，其后还有 6、7 两个节点，说明第 3 层「左缺右有」，不满足完全二叉树的定义。

**判定技巧：** 层序数组扫描时，遇到第一个空位（-1）之后必须全为空；只要空位后面还出现非空节点，就不是完全二叉树。

**考点：** 树与二叉树、完全二叉树
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
            explanation: `
**答案：√**

**解析：**
DFS 的非递归实现确实用**栈**：出栈访问当前节点，把它的孩子（后访问的先压）压栈——栈的**后进先出（LIFO）**保证「一条路走到黑、走不通再回头」的深度优先语义。

与 BFS 对比：BFS 用**队列**（FIFO）实现逐层扩展。栈 vs 队列正是 DFS/BFS 最本质的实现差异。

递归版 DFS 虽然没写显式的栈，但函数调用栈本质上就是那个栈。

**易错点：** 「先进后出」与「后进先出」是同一特性；若题干说 BFS 用栈则错误（那变成 DFS 了）。

**考点：** DFS 与栈的对应关系
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
            question: `下面代码采用动态规划求解零钱兑换问题：给定 n 种硬币，第 i 种硬币的面值为 coins[i - 1]，目标金额为 amt，每种硬币可以重复选取，求能够凑出目标金额的最少硬币数量；如果不能凑出目标金额，返回 -1 。

\`\`\`cpp
int coinChangeDPComp(vector<int> &coins, int amt) {
    int n = coins.size();
    int MAX = amt + 1;
    vector<int> dp(amt + 1, MAX);
    dp[0] = 0;
    for (int i = 1; i <= n; i++) {
        for (int a = 1; a <= amt; a++) {
            if (coins[i - 1] > a)
                dp[a] = dp[a];
            else
                dp[a] = min(dp[a], dp[a - coins[i - 1]] + 1);
        }
    }
    return dp[amt] != MAX ? dp[amt] : -1;
}
\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
这是一维完全背包求最少件数的标准写法，逐项检查：
- **状态定义：** dp[a] 表示凑出金额 a 所需的最少硬币数，dp[0] = 0（边界正确）；
- **初值：** dp 数组初始化为 MAX = amt + 1。由于每枚硬币面值至少为 1，最多需要 amt 枚，amt + 1 即「不可达」的无穷大占位，避免溢出；
- **转移：** 对每种硬币 i（外层）遍历金额 a（内层），coins[i-1] ≤ a 时尝试 dp[a - coins[i-1]] + 1 取 min。外层物品内层金额的顺序允许同一硬币重复选取，符合「每种硬币可重复」的完全背包语义；
- **返回：** dp[amt] 仍为 MAX 说明凑不出，返回 -1，否则返回 dp[amt]。

整段代码逻辑完整正确，题干描述成立。

**考点：** 动态规划、完全背包
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
