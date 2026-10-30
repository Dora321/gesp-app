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
            explanation: `
**答案：D**

**解析：**
面向对象编程（OOP）的三大核心原则是**封装、继承、多态**：

- **封装**：把数据和操作数据的方法绑定在类中，通过访问控制（private/protected/public）隐藏内部实现细节。
- **继承**：子类复用父类的成员，建立 is-a 关系，实现代码复用与层次化设计。
- **多态**：同一接口在不同派生类中有不同实现（如虚函数重写），运行时按实际类型绑定。

逐项分析：
- **A 贪心、动态规划、回溯**：这是三种**算法设计策略**，与 OOP 思想无关。
- **B 并发、并行、异步**：这是程序**执行模型**的概念。
- **C 递归、循环、分治**：这是**程序控制结构/算法技巧**。
- **D 封装、继承、多态**：正确，OOP 三大特性。

**易错点：** 贪心/动态规划属于算法范畴，容易与「面向对象」的概念混淆——区分「语言特性/设计思想」与「算法策略」两类概念。

**考点：** 面向对象基本思想
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
            question: `运行下列代码，屏幕上输出（ ）。\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nclass my_class {\npublic:\n    static int count;\n    my_class() {\n        count++;\n    }\n    ~my_class() {\n        count--;\n    }\n    static void print_count() {\n        cout << count << " ";\n    }\n};\nint my_class::count = 0;\nint main() {\n    my_class obj1;\n    my_class::print_count();\n    my_class obj2;\n    obj2.print_count();\n    my_class obj3;\n    obj3.print_count();\n    return 0;\n}\n\`\`\`\n`,
            options: [
                "1 1 1",
                "1 2 3",
                "1 1 2",
                "1 2 2",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
关键点：\`count\` 是**静态成员变量**，被该类所有对象共享；构造函数 \`count++\`、析构函数 \`count--\`。

程序执行流程：
1. \`int my_class::count = 0;\` —— 静态成员在类外初始化为 0。
2. 构造 \`obj1\` → count = 1，调用 \`my_class::print_count()\` 输出 **1**。
3. 构造 \`obj2\` → count = 2，调用 \`obj2.print_count()\` 输出 **2**。
4. 构造 \`obj3\` → count = 3，调用 \`obj3.print_count()\` 输出 **3**。
5. main 返回时三个对象依次析构，count 递减为 0，但已不再输出。

屏幕输出：\`1 2 3\`。

逐项分析：
- **A 1 1 1**：错误，若每个对象有独立的 count 才可能这样，但 count 是静态共享的。
- **B 1 2 3**：正确。
- **C 1 1 2**：错误，构造次数与输出一一对应。
- **D 1 2 2**：错误，第三次构造后 count 必为 3。

**易错点：** 静态成员函数 \`print_count()\` 既可以用类名调用（\`my_class::print_count()\`），也可以用对象调用（\`obj2.print_count()\`），两者等价——不要以为后者会出错。

**考点：** 类的静态成员、构造与析构函数
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
            question: `运行下列代码，屏幕上输出（ ）。\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nclass shape {\nprotected:\n    int width, height;\npublic:\n    shape(int a = 0, int b = 0) {\n        width = a;\n        height = b;\n    }\n    virtual int area() {\n        cout << "parent class area: " << endl;\n        return 0;\n    }\n};\nclass rectangle : public shape {\npublic:\n    rectangle(int a = 0, int b = 0) : shape(a, b) { }\n    int area() {\n        cout << "rectangle area: ";\n        return (width * height);\n    }\n};\nclass triangle : public shape {\npublic:\n    triangle(int a = 0, int b = 0) : shape(a, b) { }\n    int area() {\n        cout << "triangle area: ";\n        return (width * height / 2);\n    }\n};\nint main() {\n    shape *pshape;\n    rectangle rec(10, 7);\n    triangle tri(10, 5);\n    pshape = &rec;\n    pshape->area();\n    pshape = &tri;\n    pshape->area();\n    return 0;\n}\n\`\`\`\n`,
            options: [
                "rectangle area: triangle area:",
                "parent class area: parent class area:",
                "运行时报错",
                "编译时报错",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
关键点：基类 \`shape\` 的 \`area()\` 声明为 **virtual（虚函数）**，通过基类指针 \`pshape\` 调用时发生**动态绑定（多态）**——实际执行的是指针所指对象自己的 \`area()\`。

程序执行流程：
1. \`pshape = &rec; pshape->area();\` —— 实际对象是 rectangle，先输出 \`rectangle area: \`，再返回 \`10*7=70\`（返回值未使用）。
2. \`pshape = &tri; pshape->area();\` —— 实际对象是 triangle，先输出 \`triangle area: \`，再返回 \`10*5/2=25\`。

屏幕输出：\`rectangle area: triangle area: \`，选 A。

逐项分析：
- **A**：正确，两次调用都动态绑定到派生类的 area()。
- **B**：错误，只有当 area() **不是**虚函数时才会静态绑定调用基类版本。
- **C 运行时报错**：错误，虚函数机制合法且正常运行。
- **D 编译时报错**：错误，基类指针指向派生类对象是合法的向上转型。

**易错点：** 派生类的 \`area()\` 即使不写 \`virtual\` 关键字，也自动继承虚函数属性（C++ 规定重写基类虚函数时隐含 virtual）。

**考点：** 虚函数与多态、动态绑定
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
            explanation: `
**答案：B**

**解析：**
链式栈的插入（push）发生在**栈顶**：新结点 s 要成为新的栈顶，原栈顶 hs 变为 s 的直接后继。

两步操作（顺序不能颠倒）：
1. \`s->next = hs;\` —— 新结点的 next 指向原栈顶。
2. \`hs = s;\` —— 栈顶指针更新为 s。

逐项分析：
- **A \`hs->next = s;\`**：错误，这是把 s 挂到栈顶**之后**（栈顶下方），s 没有成为栈顶。
- **B \`s->next = hs; hs = s;\`**：正确，标准头插法。
- **C \`s->next = hs->next; hs->next = s;\`**：错误，这是在栈顶**后面**插入结点，s 位于第二个位置，不是新栈顶。
- **D \`s->next = hs; hs = hs->next;\`**：错误，第二条语句让 hs 又指回原栈顶，栈顶指针没有更新为 s。

**易错点：** 若先执行 \`hs = s;\` 再执行 \`s->next = hs;\`，s 会指向自己，链表断裂——「先接链、后移指针」是链式栈/链表头插的铁律。

**考点：** 链式栈的插入操作
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
            explanation: `
**答案：B**

**解析：**
栈（stack）是一种**后进先出（LIFO，Last In First Out）**的线性数据结构：入栈（push）和出栈（pop）都发生在**栈顶**一端。最后压入的元素最先弹出，就像叠盘子。

逐项分析：
- **A 先进先出**：错误，这是**队列（queue）**的原则。
- **B 先进后出**：正确，即后进先出（LIFO）。
- **C 最小值先出**：错误，这是**优先队列（小根堆）**的行为。
- **D 随机顺序**：错误，栈的出入顺序是确定的。

**易错点：** 「先进后出」和「后进先出」是同一件事的两种说法，考试中两者都可能作为正确选项出现，注意与队列的 FIFO 区分。

**考点：** 栈的特性
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
            question: `要实现将一个输入的十进制正整数转化为二进制表示，下面横线上应填入的代码为（ ）。\n\n\`\`\`cpp\n#include <iostream>\n#include <stack>\nusing namespace std;\nstack<int> ten2bin(int n) {\n    stack<int> st;\n    int r, m;\n    r = n % 2;\n    m = n / 2;\n    st.push(r);\n    while (m != 1) {\n        r = m % 2;\n        st.push(r);\n        m = m / 2;\n    }\n    st.push(m);\n    return st;\n}\nint main() {\n    int n;\n    cin >> n;\n    stack<int> bin;\n    bin = ten2bin(n);\n    while (!bin.empty()) {\n        ____________________ // 在此处填入代码\n    }\n    return 0;\n}\n\`\`\`\n`,
            options: [
                "cout << bin.top(); bin.pop();",
                "bin.pop(); cout << bin.top();",
                "cout << bin.back(); bin.pop();",
                "cout << bin.front(); bin.pop();",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
\`ten2bin()\` 用栈保存每次取模得到的余数：\`r = n % 2\` 是**最低位**，最先入栈，压在**栈底**；不断除以 2，**最高位**最后 \`st.push(m)\` 压入，位于**栈顶**。

因此输出二进制时必须**从栈顶开始**（最高位在前）：先 \`cout << bin.top()\` 输出当前栈顶，再 \`bin.pop()\` 弹出，循环直到栈空。

逐项分析：
- **A \`cout << bin.top(); bin.pop();\`**：正确，先取栈顶输出再弹出。
- **B \`bin.pop(); cout << bin.top();\`**：错误，先弹出会**跳过最高位**，且最后一步对空栈 top() 是未定义行为。
- **C \`cout << bin.back(); bin.pop();\`**：错误，\`back()\` 不是 std::stack 的接口（栈只有 top）。
- **D \`cout << bin.front(); bin.pop();\`**：错误，\`front()\` 也不是 std::stack 的接口（那是 queue/list 的）。

**易错点：** std::stack 的适配器只暴露 \`top()\`，不提供 \`front()\`/\`back()\`；顺序颠倒（先 pop 后 top）会漏掉最高位。

**考点：** 栈的应用（进制转换）、std::stack 接口
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
            question: `下面定义了一个循环队列的类，请补全判断队列是否满的函数，横线上应填写（ ）。\n\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nclass circular_queue {\nprivate:\n    int *arr;      // 数组用于存储队列元素\n    int capacity;  // 队列容量\n    int front;     // 队头指针\n    int rear;      // 队尾指针\npublic:\n    circular_queue(int size) {\n        capacity = size + 1; // 为避免队列满与队列空时指针相等，多预留一个空间\n        arr = new int[capacity];\n        front = 0;\n        rear = 0;\n    }\n    ~circular_queue() {\n        delete[] arr;\n    }\n    bool is_empty() {\n        return front == rear;\n    }\n    bool is_full() {\n        ________________ // 在此处填入代码\n    }\n    void en_queue(int data) {\n        if (is_full()) {\n            cout << "队列已满，无法入队！" << endl;\n            return -1;\n        }\n        arr[rear] = data;\n        rear = (rear + 1) % capacity;\n        return 1;\n    }\n    int de_queue() {\n        if (is_empty()) {\n            cout << "队列为空，无法出队！" << endl;\n            return -1; // 出队失败，返回一个特殊值\n        }\n        int data = arr[front];\n        front = (front + 1) % capacity;\n        return data;\n    }\n};\n\`\`\`\n`,
            options: [
                "return (rear+1) % capacity == front;",
                "return rear % capacity == front;",
                "return rear == front;",
                "return (rear+1) == front;",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
该实现**多预留一个空位**来区分「队满」和「队空」（否则两者都满足 \`front == rear\`，无法区分）：

- 队空条件：\`front == rear\`（is_empty 已给出）。
- 队满条件：rear 再前进一格就会追上 front，即 **\`(rear + 1) % capacity == front\`**。

\`% capacity\` 保证 rear 越过数组末尾后回绕到开头，这正是「循环」队列的关键。

逐项分析：
- **A \`return (rear + 1) % capacity == front;\`**：正确，牺牲一个空位的标准判满。
- **B \`return rear % capacity == front;\`**：错误，rear 本身指向下一个插入位置，rear==front 表示队**空**，这会把空队误判为满。
- **C \`return rear == front;\`**：错误，这是判空条件。
- **D \`return (rear + 1) == front;\`**：错误，缺少取模回绕，当 rear 在数组末尾、front 在开头时会漏判。

**易错点：** 判满和判空只差一个「+1 取模」，选项 A/C 极易混淆；记住构造函数注释「capacity = size + 1，多预留一个空间」就是为这套判满逻辑服务的。

**考点：** 循环队列的判满条件
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
            explanation: `
**答案：C**

**解析：**
字符串 \`classmycls\` 共 10 个字符，统计频率：s×3、c×2、l×2、a×1、m×1、y×1。

构造哈夫曼树（每次合并频率最小的两棵）：
1. a(1) + m(1) = 2
2. y(1) + 2 = 3
3. s(3) + 3 = 6
4. c(2) + l(2) = 4
5. 6 + 4 = 10（根）

各字符编码长度（深度）：s=2，c=2，l=2，y=3，a=4，m=4。

总比特数 = WPL = 3×2 + 2×2 + 2×2 + 1×3 + 1×4 + 1×4 = 6+4+4+3+4+4 = **25 比特**。

逐项分析：
- **A 10**：错误，这是字符总数，若每个字符定长编码才需要 ceil(log2(6))=3 位×10=30 位。
- **B 20**：错误。
- **C 25**：正确，WPL 最小值。
- **D 30**：错误，这是 3 位定长编码的总位数，哈夫曼编码必须不劣于定长编码，25 < 30。

**易错点：** 哈夫曼编码是**最优前缀码**，合并顺序必须严格取当前最小两个权值；算 WPL 时「频率 × 编码长度」逐字符累加，别漏掉重复字符。

**考点：** 哈夫曼树与哈夫曼编码
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
            explanation: `
**答案：A**

**解析：**
三种遍历中根节点的访问次序：
- **先序遍历**：根 → 左子树 → 右子树，**根第一个被访问**。
- **中序遍历**：左子树 → 根 → 右子树，根在中间访问。
- **后序遍历**：左子树 → 右子树 → 根，根**最后**被访问。

逐项分析：
- **A 先序遍历**：正确。
- **B 中序遍历**：错误，根第二个（若左子树非空）被访问。
- **C 后序遍历**：错误，根最后被访问。
- **D 以上都是**：错误，三种遍历访问根的时机各不相同。

**易错点：** 若根的左子树为空，中序遍历根也是第一个被访问的——但题目问的是「（某种遍历）第一个访问的节点是根节点」的一般性质，只有先序遍历**无条件**满足。

**考点：** 二叉树的三种遍历次序
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
            explanation: `
**答案：A**

**解析：**
满二叉树（此处指每层都满的二叉树）：第 i 层有 2^(i-1) 个节点，k 层满二叉树节点总数为 **2^k − 1**。

5 层：2^5 − 1 = 32 − 1 = **31**。

逐项验证：1+2+4+8+16 = 31。

逐项分析：
- **A 31**：正确。
- **B 32**：错误，32 = 2^5 是第 5 层节点数的两倍加一之误（2^5−1 才对）。
- **C 33**：错误。
- **D 16**：错误，16 = 2^4 只是第 5 层的节点数（2^5=32 的下一层）。

**易错点：** 严格说 GESP 教材中「满二叉树」指每层结点都达到最大的二叉树，总数 2^k−1；不要与「完全二叉树」混淆——完全二叉树的节点数只保证在 [2^(k-1), 2^k) 范围内。

**考点：** 满二叉树的节点数公式
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
            explanation: `
**答案：A**

**解析：**
动态规划（DP）适用的两个标志性性质：
1. **最优子结构**：问题的最优解包含子问题最优解。
2. **重叠子问题**：递归求解时同一子问题被反复计算，DP 用表格（memoization/自底向上）把每个子问题只算一次。

逐项分析：
- **A 重叠子问题**：正确。
- **B 分治法**：错误，分治是另一种算法策略（子问题相互独立，如归并排序），恰恰**不具备**重叠子问题性质。
- **C 贪心策略**：错误，贪心每步取局部最优且不回退，与 DP 的全局枚举思想不同。
- **D 回溯算法**：错误，回溯用于搜索所有解/满足约束的解，与 DP 的两大性质无关。

**易错点：** 分治 vs DP 的本质区别就在「子问题是否重叠」——分治子问题独立不重复，DP 子问题重叠需要记忆化。

**考点：** 动态规划的两个基本性质
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
            question: `青蛙每次能跳 1 或 2 步，下面代码计算青蛙跳到第 n 步台阶有多少种不同跳法。则下列说法，错误的是 ( ) 。\n\n\`\`\`cpp\nint jump_recur(int n) {\n    if (n == 1) return 1;\n    if (n == 2) return 2;\n    return jump_recur(n - 1) + jump_recur(n - 2);\n}\nint jump_dp(int n) {\n    vector<int> dp(n + 1); // 创建一个动态规划数组，用于保存已计算的值\n    // 初始化前两个数\n    dp[1] = 1;\n    dp[2] = 2;\n    // 从第三个数开始计算斐波那契数列\n    for (int i = 3; i <= n; ++i) {\n        dp[i] = dp[i - 1] + dp[i - 2];\n    }\n    return dp[n];\n}\n\`\`\`\n`,
            options: [
                "函数 jump_recur() 采用递归方式。",
                "函数 jump_dp() 采用动态规划方法。",
                "当 n 较大时，函数 jump_recur() 存在大量重复计算，执行效率低。",
                "函数 jump_recur() 代码量小，执行效率高。",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
题目要求选出**错误**的说法。

- **A 函数 jump_recur() 采用递归方式**：说法正确，函数体内调用自身（jump_recur(n-1)+jump_recur(n-2)）。
- **B 函数 jump_dp() 采用动态规划方法**：说法正确，用 dp 数组自底向上递推，每个子问题只算一次。
- **C 当 n 较大时，jump_recur() 存在大量重复计算，执行效率低**：说法正确，递归树中 jump_recur(k) 会被重复计算指数次，时间复杂度约 O(φ^n)（斐波那契式增长），而 jump_dp 是 O(n)。
- **D 函数 jump_recur() 代码量小，执行效率高**：**错误**，代码量小是真，但效率**低**——大量重复子计算正是递归版的致命短板。

**易错点：** 「代码简洁」≠「执行高效」。递归版没有记忆化，n=40 左右就已明显卡顿；对比 dp 版用空间换时间（O(n) 数组 + O(n) 时间）。

**考点：** 递归与动态规划的效率对比、重叠子问题
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
            question: `阅读以下二叉树的广度优先搜索代码，在这棵树中搜索数值 20 时，可能的输出是（ ）。\n\n\`\`\`text\n        5\n       / \\\n      2   17\n     / \\  /\n   -4   3 9\n\`\`\`\n\n\`\`\`cpp\n#include <iostream>\n#include <queue>\nusing namespace std;\n// 二叉树节点的定义\nstruct TreeNode {\n    int val;\n    TreeNode* left;\n    TreeNode* right;\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n// 宽度优先搜索（BFS）迭代实现\nTreeNode* bfs(TreeNode* root, int a) {\n    if (root == nullptr) return nullptr;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        TreeNode* node = q.front();\n        q.pop();\n        if (node->val == a)\n            return node;\n        cout << node->val << " "; // 先访问当前节点\n        if (node->left) q.push(node->left);   // 将左子节点入队\n        if (node->right) q.push(node->right); // 将右子节点入队\n    }\n    return nullptr;\n}\n\`\`\`\n`,
            options: [
                "5 2 -4 3 17 9",
                "-4 2 3 5 9 17",
                "5 2 17 -4 3 9",
                "以上都不对",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
BFS 用**队列**实现：出队访问节点时，若未命中目标，就把其输出并按「先左后右」把子节点入队。

搜索数值 20（树中不存在），所有节点都会被访问并输出，访问顺序即层序：
1. 出队 5 → 输出，子节点 2、17 入队
2. 出队 2 → 输出，子节点 -4、3 入队
3. 出队 17 → 输出，子节点 9 入队
4. 依次出队 -4、3、9 → 输出

输出序列：\`5 2 17 -4 3 9\`，选 C。

逐项分析：
- **A \`5 2 -4 3 17 9\`**：错误，这是**深度优先**（先左子树走到底）的访问顺序。
- **B \`-4 2 3 5 9 17\`**：错误，这是中序遍历顺序。
- **C \`5 2 17 -4 3 9\`**：正确，逐层从左到右。
- **D 以上都不对**：错误。

**易错点：** 20 不在树中时 BFS 会**遍历完所有节点**才返回 nullptr，因此输出的是完整层序序列；注意区分 BFS（队列，层序）与 DFS（栈，深度优先）的输出差异。

**考点：** 二叉树的广度优先搜索（层序遍历）
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
            question: `在上题的树中搜索数值 3 时，采用深度优先搜索一共比较的节点数为（ ）。`,
            options: [
                "2",
                "3",
                "4",
                "5",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
DFS 用**栈**实现：出栈时先与目标值比较，然后「先压右子、再压左子」（保证左子先出栈，等效先访问左子树）。

搜索数值 3（存在于树中），逐次比较过程：
1. 出栈 5，比较 5≠3（**第 1 次比较**），压入右子 17、左子 2
2. 出栈 2，比较 2≠3（**第 2 次比较**），压入右子 3、左子 -4
3. 出栈 -4，比较 -4≠3（**第 3 次比较**），无子节点
4. 出栈 3，比较 3==3（**第 4 次比较**），命中返回

共比较 **4** 个节点（5、2、-4、3），选 C。

逐项分析：
- **A 2**：错误，只比较根和 2 不够，3 还在其 deeper 层。
- **B 3**：错误，比较到 -4 仍未命中。
- **C 4**：正确，5→2→-4→3。
- **D 5**：错误，命中 3 后立即返回，不需要访问 17/9 分支。

**易错点：** DFS 找到目标就立即返回，**不会**继续搜索右子树（17、9 不会被比较）；比较次数 = 根到目标节点的路径上的节点数（先序位置）。

**考点：** 二叉树的深度优先搜索（非递归栈实现）
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

**解析：**
构造哈夫曼树时，每一步都从当前频率最小的两个节点中取出并合并（优先队列/排序支持），每次合并都做出当前最优（最小 WPL 增量）的选择且不回溯，这正是贪心策略的体现，最终得到总编码长度最短的前缀码。

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

**解析：**
对象创建时构造函数被自动调用，这是 C++ 的语言保证；若类中没有定义任何构造函数，编译器会合成一个默认（无参）构造函数来完成对象构造（内置类型成员不自动初始化，类类型成员调用其默认构造）。

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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
「必须手动定义」不成立。如果类没有定义析构函数，编译器会自动生成一个默认析构函数，对象销毁时自动调用；它已能处理成员的销毁（类类型成员自动调用其析构）。只有当类在构造中获取了堆内存、文件句柄等需要显式释放的资源时，才需要手动定义析构函数。

**考点：** 面向对象、析构函数
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

**解析：**
C++ 允许在类内部定义嵌套类（nested class），如 class A { class B { ... }; };。嵌套类作用域在外围类之内，通过 A::B 访问；标准库中的迭代器（如 std::vector::iterator）就是嵌套类的典型应用。

**考点：** 面向对象、嵌套类
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

**解析：**
格雷码的相邻两个编码只有一位不同。逐一检查该序列：000→001（第3位）、001→011（第2位）、011→010（第3位）、010→110（第1位）、110→111、111→101、101→100，相邻变化均只差一位，且首尾覆盖 3 位共 8 个编码，构成一组合法的 3 位格雷码（反射格雷码序列）。

**考点：** 格雷编码
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
            question: `n 个节点的双向循环链表，在其中查找某个节点的平均时间复杂度是 O(log n)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
双向循环链表虽然每个节点有 prev 和 next 两个方向，但查找仍只能沿指针逐个节点遍历（链表不支持二分），最坏和平均都要检查约 n/2 到 n 个节点，平均时间复杂度为 O(n)，不是 O(log n)。O(log n) 需要类似二分查找的跳跃结构（如跳表）或有序平衡树。

**考点：** 时间复杂度、链表
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

**解析：**
完全二叉树的节点按层序编号后连续排列，中间没有空缺，因此可以按编号存入数组：下标 i 的节点左孩子为 2i+1（0 基）或 2i（1 基）、右孩子为 2i+2 或 2i+1、父节点为 (i-1)/2 或 i/2。堆正是基于数组存储的完全二叉树。

**考点：** 树与二叉树、数组
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

**解析：**
静态成员函数属于类本身，没有 this 指针，因此无法访问某个具体对象的非静态成员变量，只能访问静态成员变量和其他静态成员函数（以及全局变量等类外资源）。要访问非静态成员必须通过传入的对象引用/指针。

**考点：** 面向对象、静态成员
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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
深度优先搜索（DFS）使用栈（或递归调用栈）辅助实现：后进先出保证「一条路走到底再回溯」；使用队列（先进先出）辅助的是广度优先搜索（BFS），它逐层扩展节点。两者的辅助数据结构不能混淆。

**考点：** 深度优先搜索、栈与队列
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
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
0-1 背包不满足贪心选择性质：物品不可分割，按单位价值贪心选入某件物品后，可能挤掉了两件总价值更高的物品组合。例如容量 10，物品(重6价6)、(重5价5)×2，按性价比贪心先选第一件只剩 4，装不下任何一件，总价 6 < 10（选两件 5）。0-1 背包需要动态规划求解，贪心只能用于可分割的部分背包问题。

**考点：** 动态规划、贪心
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
