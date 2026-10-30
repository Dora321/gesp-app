// 2023年12月 GESP C++ 六级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `6 2 
2 3
1 0 30 100 30 30`, output: `131` },
        { input: `6 2
2 3
1 0 30 100 30 -1`, output: `101` }
      ],
      question: `
# [GESP202312 六级] 闯关游戏

## 题目描述

你来到了一个闯关游戏。

这个游戏总共有 $N$ 关，每关都有 $M$ 个通道，你需要选择一个通道并通往后续关卡。其中，第 $i$ 个通道可以让你前进 $a_i$ 关，也就是说，如果你现在在第 $x$ 关，那么选择第 $i$ 个通道后，你将直接来到第 $x+a_i$ 关（特别地，如果 $x + a_i \\geq N$，那么你就通关了）。此外，当你顺利离开第 $s$ 关时，你还将获得 $b_s$ 分。

游戏开始时，你在第 $0$ 关。请问，你通关时最多能获得多少总分。

## 输入格式

第一行两个整数 $N$，$M$，分别表示关卡数量和每关的通道数量。

接下来一行 $M$ 个用单个空格隔开的整数 $a_0,a_1\\cdots,a_{M-1}$。保证 $1\\le a_i \\le N$。

接下来一行 $N$ 个用单个空格隔开的整数 $b_0,b_1\\cdots,b_{N-1}$。保证 $|b_i|\\le 10^5$。

## 输出格式

一行一个整数，表示你通关时最多能够获得的分数。
`,
      score: 25,
      explanation: `**解析：**
      设 dp[i] 为“站在第 i 关开始闯关时，最终最多能得到多少分”。离开第 i 关一定会拿到 b_i 分，然后任选一个通道跳到 i+a_j（越界则直接通关），故可从后往前线性转移。

      **考点：** 动态规划
      `,
      tags: ["编程题", "动态规划"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<int> a(m+1), b(n+1);\n    for (int i = 1; i <= m; ++i) cin >> a[i];\n    for (int i = 1; i <= n; ++i) cin >> b[i];\n\n    vector<long long> dp(n+2, 0);\n    for (int i = n; i >= 1; --i) {\n        long long bestNext = LLONG_MIN;\n        for (int j = 1; j <= m; ++j) {\n            int to = i+a[j];\n            bestNext = max(bestNext, to > n ? 0LL : dp[to]);\n        }\n        dp[i] = b[i]+bestNext;\n    }\n\n    cout << dp[1] << '\\n';\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
0 0 2 2
3
2 3 4
3 2 3 4
2 1 4`, output: `2
2
0` },
        { input: `7
0 1 0 2 1 2
5
2 4 6
2 4 5
3 4 5 6
4 2 4 5 6
2 3 4`, output: `2
1
1
1
0` }
      ],
      question: `
# [GESP202312 六级] 工作沟通

## 题目描述

某公司有 $N$ 名员工，编号从 $0$ 至 $N-1$。其中，除了 $0$ 号员工是老板，其余每名员工都有一个直接领导。我们假设编号为 $i$ 的员工的直接领导是 $f_i$。

该公司有严格的管理制度，每位员工只能受到本人或直接领导或间接领导的管理。具体来说，规定员工 $x$ 可以管理员工 $y$，当且仅当 $x=y$，或 $x=f_y$，或 $x$ 可以管理 $f_y$。特别地，$0$ 号员工老板只能自我管理，无法由其他任何员工管理。

现在，有一些同事要开展合作，他们希望找到一位同事来主持这场合作，这位同事必须能够管理参与合作的所有同事。如果有多名满足这一条件的员工，他们希望找到编号最大的员工。你能帮帮他们吗？

## 输入格式

第一行一个整数 $N$，表示员工的数量。

第二行 $N - 1$ 个用空格隔开的正整数，依次为 $f_1,f_2,\\dots f_{N−1}$。

第三行一个整数 $Q$，表示共有 $Q$ 场合作需要安排。

接下来 $Q$ 行，每行描述一场合作：开头是一个整数 $m$（$2 \\le m \\le N$），表示参与本次合作的员工数量；接着是 $m$ 个整数，依次表示参与本次合作的员工编号（保证编号合法且不重复）。

保证公司结构合法，即不存在任意一名员工，其本人是自己的直接或间接领导。

## 输出格式

输出 $Q$ 行，每行一个整数，依次为每场合作的主持人选。
`,
      score: 25,
      explanation: `**解析：**
      先把每次合作中的所有参与者求出公共祖先的最深点 lca。所有能管理全部参与者的人，正好是根到 lca 路径上的节点；题目要求编号最大的那个，因此预处理 root→u 路径上的最大编号即可。

      **考点：** 树、LCA
      `,
      tags: ["编程题", "树", "LCA"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<vector<int>> g(n);\n    vector<int> parent(n, -1);\n    parent[0] = 0;\n    for (int i = 1; i < n; ++i) {\n        cin >> parent[i];\n        g[parent[i]].push_back(i);\n    }\n\n    int LOG = 1;\n    while ((1 << LOG) <= n) ++LOG;\n    vector<vector<int>> up(LOG, vector<int>(n, 0));\n    vector<int> depth(n, 0), bestOnPath(n, 0);\n\n    queue<int> q;\n    q.push(0);\n    bestOnPath[0] = 0;\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        up[0][u] = parent[u];\n        for (int k = 1; k < LOG; ++k) up[k][u] = up[k-1][up[k-1][u]];\n        for (int v : g[u]) {\n            depth[v] = depth[u]+1;\n            bestOnPath[v] = max(bestOnPath[u], v);\n            q.push(v);\n        }\n    }\n\n    auto lca = [&](int a, int b) {\n        if (depth[a] < depth[b]) swap(a, b);\n        int diff = depth[a]-depth[b];\n        for (int k = 0; k < LOG; ++k) {\n            if (diff >> k & 1) a = up[k][a];\n        }\n        if (a == b) return a;\n        for (int k = LOG-1; k >= 0; --k) {\n            if (up[k][a] != up[k][b]) {\n                a = up[k][a];\n                b = up[k][b];\n            }\n        }\n        return up[0][a];\n    };\n\n    int Q;\n    cin >> Q;\n    while (Q--) {\n        int k;\n        cin >> k;\n        int x;\n        cin >> x;\n        int cur = x;\n        for (int i = 1; i < k; ++i) {\n            cin >> x;\n            cur = lca(cur, x);\n        }\n        cout << bestOnPath[cur] << '\\n';\n    }\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2023-12-l6',
    title: '2023年12月 GESP C++ 六级真题',
    level: 6,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `关于 C++ 类和对象的说法，错误的是 ( ) 。`,
            options: [
                "在 C++ 中，一切皆对象，即便是字面量如整数 5 等也是对象",
                "在 C++ 中，可以自定义新的类，并实例化为新的对象",
                "在 C++ 中，内置函数和自定义函数，都是类或者对象",
                "在 C++ 中，可以在自定义函数中嵌套定义新的函数",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
- **A（官方口径正确）：** 广义上 C++ 中一切皆对象，字面量 5 也有类型（int）与值。
- **B 正确：** 用户可以自定义 class/struct 并实例化对象，这正是面向对象的基本能力。
- **C 正确：** 内置函数（如运算符、标准库函数）与自定义函数都依附于类型体系或作用于对象。
- **D 错误（答案）：** C++ **不允许在函数内部嵌套定义函数**——函数定义只能出现在命名空间或类作用域中；函数体内只能写语句或 lambda 表达式（lambda 是匿名可调用对象，不是「定义新的函数」的嵌套语法）。

**易错点：** C++ 与 Python/JavaScript 不同（后两者支持嵌套 def/function）；lambda 表达式常被误认为「嵌套定义函数」，但它是对象而非嵌套函数定义。

**考点：** 类与对象、语言语法规则
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
            question: `有关下面 C++ 代码的说法，错误的是 ( ) 。

\`\`\`cpp
class Rectangle
{
private:
    class Point
    {
    public:
        double x;
        double y;
    };
    Point a, b, c, d;
    double length;
    double width;
public:
    ...
};
\`\`\``,
            options: [
                "C++ 中类内部可以嵌套定义类",
                "在类中定义的类被称为内部类，定义类的类被称为外部类",
                "内部类可以随便访问，不需要通过外部类来访问",
                "代码中Point被称为内部类，可以通过外部类Rectangle来访问，Rectangle::Point",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
代码在 Rectangle 的 **private** 区嵌套定义了 Point 类。
- **A 正确：** C++ 类内部可以嵌套定义类（嵌套类/内部类）。
- **B 正确：** 术语规范：Point 称为内部类（嵌套类），Rectangle 称为外部类（外围类）。
- **C 错误（答案）：** 内部类**不能随便访问**——本题 Point 定义在 private 区，外部代码只能通过 \`Rectangle::Point\` 作用域限定访问（且因在 private 区，类外甚至无法直接使用该名字）；即使定义在 public 区，也要用外部类作用域限定，「不需要通过外部类来访问」错误。
- **D 正确：** Point 是内部类，类外通过 \`Rectangle::Point\` 限定访问（公开区时）。

**易错点：** 嵌套类只是**作用域嵌套**，不共享外部类的实例数据；内部类在外部类的 private 区时对外完全隐藏。

**考点：** 嵌套类、访问控制、作用域
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
            question: `有关下面 C++ 代码的说法，正确的是 ( ) 。\n\n\`\`\`cpp\n#include <iostream>
using namespace std;

class newClass
{
    public:
    static  int objCounter;

};

int newClass::objCounter=2;

int main()
{
    newClass classA;
    newClass classB;
    cout<<newClass::objCounter<<endl;
    cout<<classB.objCounter<<endl;
}\n\`\`\``,
            options: [
                "第 14 行代码错误，第 15 行正确",
                "第 15 行代码错误，第 14 行代码正确",
                "第 14 、 15 两行代码都正确",
                "第 6 行代码可修改为objCounter += 1",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
静态成员 objCounter 初始化为 2，且代码中没有任何自增操作。
- 第 14 行 \`cout<<newClass::objCounter\` 通过类名访问静态成员，输出 2，合法；
- 第 15 行 \`cout<<classB.objCounter\` 通过对象访问静态成员（等价于类名访问），输出 2，同样合法。

两行都正确，选 C。
- **A/B 错误：** 两行均无语法错误——静态成员既可用类名也可用对象名访问。
- **D 错误：** 第 6 行是 \`static int objCounter;\` 的**声明**，不能在类内直接初始化（const 整型除外）；初始化语句在第 9 行类外 \`int newClass::objCounter=2;\`，把它改成 \`objCounter += 1\` 是错误的（类内声明处不能赋值）。

**易错点：** 静态成员必须在**类外定义并初始化**（类内声明）；对象名访问静态成员与类名访问等价，共享同一份存储。

**考点：** 静态成员、类外初始化
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
            question: `有关下面 C++ 代码的说法，错误的是 ( ) 。\n\n\`\`\`cpp\nstruct BiNode {
    char data;
    BiNode* lchid,*rchid;
};

class BiTree {
private:
    BiNode* Creat();
    void Release(BiNode* bt);
    BiNode* root;
public:
    BiTree() {
        root = Creat();
    }
    ~BiTree() {
        Release(root);
    }
};\n\`\`\``,
            options: [
                "上列 C++ 代码适用于构造各种二叉树",
                "代码struct BiNode用于构造二叉树的节点",
                "代码BiTree(){root=Creat();}用于构造二叉树",
                "析构函数不可以省略",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
- **A 正确：** 该结构（Creat 私有建树、Release 私有释放、构造/析构调用）是构造与析构二叉树的通用框架，适用于各种二叉树。
- **B 正确：** \`struct BiNode\` 定义了含数据域 data 与左右指针的节点，用于构造二叉树的节点。
- **C 正确：** 构造函数 \`BiTree(){root=Creat();}\` 在对象创建时建树，用于构造二叉树。
- **D 错误（答案）：** 析构函数**语法上完全可以省略**（编译器会生成默认析构函数）；只是在本代码中 Creat 用 new 分配了节点，省略析构（不调用 Release）会造成**内存泄漏**——「不可以省略」的说法过于绝对，是错误表述。

**易错点：** 区分「语法上可省略」与「语义上不该省略」；new 出来的内存需要配对 delete，否则泄漏——但这是工程建议而非语法强制。

**考点：** 构造函数与析构函数、内存管理
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
            question: `基于第 4 题的定义，有关下面 C++ 代码的说法正确的是（ ）。\n\n\`\`\`cpp\nvoid Order(BiNode* bt)
{
    if (bt == nullptr)
        return;
    else {
        cout << bt->data;
        Order(bt->lchid);
        Order(bt->rchid);
    }
}\n\`\`\``,
            options: [
                "代码中Order( )函数是中序遍历二叉树的方法",
                "代码中Order( )先访问根节点，然后对左子树进行前序遍历，再对右子树前序遍历",
                "代码中Order( )先访问中序遍历左子树，然后访问根节点，最后则是中序遍历右子树",
                "代码中Order( )先后序遍历左子树，然后后序遍历右子树，最后访问根节点",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
Order 函数的执行顺序：先输出 \`bt->data\`（**访问根**），再递归 Order 左子树，最后递归 Order 右子树——这是**前序遍历**（根-左-右）。
- **A 错误：** 中序遍历的顺序是左-根-右，即先递归左子树、再访问根——本代码根在最前，不是中序。
- **B 正确：** 先访问根节点，然后对左子树进行（同样的）前序遍历，再对右子树进行前序遍历——正是本代码的递归结构。
- **C 错误：** 描述的是中序遍历（左-根-右），与本代码顺序不符。
- **D 错误：** 描述的是后序遍历（左-右-根），根应在最后访问。

**易错点：** 三种遍历的命名依据是「**根**被访问的时机」：前序（根最先）、中序（根居中）、后序（根最后）；递归写法里看 \`cout\` 语句相对两次递归调用的位置即可判断。

**考点：** 二叉树遍历、前序遍历
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
            question: `有关下面 C++ 代码的说法正确的是（ ）。\n\n\`\`\`cpp\ntypedef struct LinkList {
    int data;
    LinkList* next;
    LinkList* prev;
}LinkList,LinkNode;

bool ListInit(LinkList* &L) {

    L = new LinkNode;
    if (!L)return false;

    L->next = NULL;
    L->prev = NULL;
    L->data = -1;

    return true;
}\n\`\`\``,
            options: [
                "上述代码构成单向链表",
                "上述代码构成双向链表",
                "上述代码构成循环链表",
                "上述代码构成指针链表",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
LinkList 节点同时含 \`next\` 与 \`prev\` 两个指针。
- **A 错误：** 单向链表只有 next 一个指针；本代码两者都有。
- **B 正确：** 同时含前驱 prev 与后继 next 指针，构成**双向链表**；初始化时 \`L->next = NULL; L->prev = NULL;\` 头结点前后都指向空，不是循环结构。
- **C 错误：** 循环链表要求尾节点的 next 指回头节点（或头节点的 prev 指向尾节点）；本代码初始化为 NULL，非循环。
- **D 错误：** 「指针链表」不是标准术语；含 data 与链接指针的结构就是常规链表节点，双向指针才是本题的考点特征。

**易错点：** 判断链表类型看指针域：只有 next 是单向；有 next+prev 是双向；双向且首尾相接才是双向**循环**链表。ListInit 只是初始化头结点，不决定循环与否——看指针赋值：NULL 即非循环。

**考点：** 双向链表、链表初始化
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
            question: `对 hello world 使用霍夫曼编码（ Huffman Coding ），最少 bit （比特）为（ ）。`,
            options: [
                "4",
                "32",
                "64",
                "88",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
对 hello world（11 个字符）做哈夫曼编码。字符频率：l=3、o=2，h、e、空格、w、r、d 各 1（共 8 种字符）。

哈夫曼合并过程（每次取最小两个，括号内为该次合并的权和）：
1+1=2，1+1=2，1+2=3，1+2=3，2+3=5，3+3=6，5+6=11。

WPL（总编码位数）= 2+2+3+3+5+6+11 = **32**。验证：频率高的 l、o 编码短（l=2 位、o=3 位等），六个频率 1 的字符编码较长，总量 32 bit 少于定长编码的 8×11=88 bit。

- **A 4**：4 bit/字符是 8 种字符的定长下界，但哈夫曼变长编码总量不可能是 4 bit。
- **B 32：** 正确。
- **C 64：** 无对应计算路径。
- **D 88：** 这是定长 ASCII（8 bit×11）的位数，哈夫曼的意义正是压到 32。

**易错点：** 别忘了**空格**也是字符（频率 1）；WPL 等于每次合并时「两个最小权之和」的累加，比逐字符算深度更快。

**考点：** 哈夫曼编码、WPL
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
            question: `下面的 fiboA() 和 fiboB() 两个函数分别实现斐波那契数列，该数列第 1 、第 2 项值为 1 ，其余各项分别 为前两项之和。下面有关说法错误的是（ ）。\n\n\`\`\`cpp\nint fiboA(int n)
{
    if(n==0)
        return 1;
    if(n==1)
        return 1;
    else
    {
        return fiboA(n-1)+fiboA(n-2);
    }
}

int fiboB(int n)
{
    if( (n==0) || (n==1) ){
        fiboB[n]=n;
        return n;
    }
    else{
        if(fiboB[n] == 0){
            fiboB[n]=FiboB(n-1)+FiboB(n-2);
        }
        return fiboB[n];
    }
}\n\`\`\``,
            options: [
                "fiboA() 采用递归方式实现斐波那契数列",
                "fiboB() 采用动态规划算法实现斐波那契数列",
                "当 N 值较大时，fiboA() 存在大量重复计算",
                "由于 fiboA() 代码较短，其执行效率较高",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
- **A 正确：** fiboA 直接 \`return fiboA(n-1)+fiboA(n-2)\`，是递归实现。
- **B 正确：** fiboB 用 fiboB[n] 数组缓存已算出的值（备忘录），只算一次，属于动态规划（记忆化搜索）思想。
- **C 正确：** fiboA 中 fiboA(n-1) 与 fiboA(n-2) 的子树大量重叠（如 fiboA(5) 会算多次 fiboA(3)），N 越大重复越多。
- **D 错误（答案）：** 代码长短与效率无关。fiboA 是指数级 O(2ⁿ)（准确说 O(φⁿ)），fiboB 是线性 O(n)——N 较大时 fiboA 远慢于 fiboB，「fiboA 执行效率较高」与事实相反。

**易错点：** 朴素递归斐波那契的复杂度是指数级；加备忘录（DP）立刻降为线性——这是「重叠子问题」优化的教科书案例。

**考点：** 递归与动态规划、时间复杂度对比
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
            question: `有关下面 C++ 代码不正确的说法是（ ）。\n\n\`\`\`cpp\nint Depth(BiTree T)
{
    if (T == NULL)
    {
        return 0;
    }
    else
    {
        int m = Depth(T->lchild);
        int n = Depth(T->rchild);
        if (m > n)
        {
            return m + 1;
        }
        else
        {
            return n + 1;
        }
    }
}\n\`\`\``,
            options: [
                "该代码可用于求解二叉树的深度",
                "代码中函数 Depth( ) 的参数 T 表示根节点，非根节点不可以作为参数",
                "代码中函数 Depth( ) 采用了递归方法",
                "代码中函数 Depth( ) 可用于求解各种形式的二叉树深度，要求该二叉树节点至少有 left 和 right 属 性",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
Depth 递归求二叉树深度：空树返回 0，否则取左右子树深度的较大值 +1。
- **A 正确：** 该代码正是标准的「二叉树深度」求解。
- **B 错误（答案）：** 参数 T 虽然通常传入根节点，但**任何子树的根节点都可以作为参数**——对子树根调用 Depth 返回该子树的深度；「非根节点不可以作为参数」说法错误。
- **C 正确：** 函数调用自身（Depth(T->lchild)、Depth(T->rchild)），是递归方法。
- **D 正确：** 只要节点有左右孩子指针（二叉链表结构），无论树的形状如何都能求深度。

**易错点：** 递归函数的参数是「当前子树的根」——根节点只是最常见的传参起点，不是唯一合法入参。

**考点：** 二叉树深度、递归
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
            question: `下面有关树的存储，错误的是（ ） .`,
            options: [
                "完全二叉树可以用 list 存储",
                "一般二叉树都可以用 list 存储，空子树位置可以用 None 表示",
                "满二叉树可以用 list 存储",
                "树数据结构，都可以用 list 存储",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
- **A 正确：** 完全二叉树按层序编号连续，节点 i 的孩子是 2i、2i+1，可以用 list（数组）高效存储。
- **B 正确：** 一般二叉树可以按完全二叉树的层序展开存入 list，空子树位置用 None 占位（缺点是可能浪费空间，但可行）。
- **C 正确：** 满二叉树是完全二叉树的特例，天然适合 list 存储。
- **D 错误（答案）：** 「树数据结构**都**可以用 list 存储」过于绝对——一般的多叉树/森林没有统一的层序展开规则（各节点孩子数不定），简单 list（配合 None 占位）无法唯一表示其结构；通常需要孩子链表、左孩子右兄弟等专门结构。「都」字使说法不成立。

**易错点：** list（数组）存储的适用前提是「编号规则确定」——完全二叉树天然满足；一般二叉树靠 None 占位勉强可行；一般树则不行。

**考点：** 树的存储结构
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
            question: `构造二叉树 [1,2,3,null,4]（ ）。`,
            options: [
                "1(2()(4))(3)",
                "1(2(3)())(4)",
                "(1,2(3),(4))",
                "(1,(2)(3),(4))",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
层序序列 [1,2,3,null,4]：1 是根；1 的两个孩子是 2、3；2 的两个孩子是 null、4；3 是叶子。

括号表示法（节点(左子树)(右子树)）：
- 1 的左子树 = 2 的子树：2 无左孩子（null）、右孩子 4 → \`2()(4)\`；
- 1 的右子树 = 3（叶子）→ \`(3)\`。

整棵树：**1(2()(4))(3)**，即 A。
- **B 1(2(3)())(4)**：表示 2 的左孩子是 3、根的右孩子是 4——与层序 null 在 2 的左位不符。
- **C (1,2(3),(4))**：表示 2 的左孩子是 3，同样错误。
- **D (1,(2)(3),(4))**：2 与 3 并列的表示形式与层序结构不符。

**易错点：** 层序中的 null 明确占位「这个孩子不存在」，后续有效值仍按位置排列——[1,2,3,null,4] 中 4 是 2 的**右**孩子，不要错位成 3 的孩子。

**考点：** 二叉树层序建树、括号表示法
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
            question: `下面有关布尔类型的函数的说法，正确的是（ ）。`,
            options: [
                "bool 类型函数只能返回 0 或者 1 两种值",
                "bool 类型函数可以返回任何整数值",
                "bool 类型函数必须有参数传递",
                "bool 类型函数没有返回值",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
- **A 正确：** bool 类型只有 true/false 两个值（对应 1/0），函数返回任何表达式时都会先转换为 bool，最终只能「返回」0 或 1 两种值。
- **B 错误：** \`return 5;\` 在 bool 函数中合法，但返回值会被转换为 true（1），并非「返回整数值 5」——返回类型决定值的域，bool 函数的返回值域就是 {0,1}。
- **C 错误：** bool 函数可以无参数，如 \`bool isEmpty() { return n == 0; }\`。
- **D 错误：** bool 函数有返回值（true/false），说「没有返回值」混淆了 void 与 bool。

**易错点：** 「可以 return 整数」与「返回整数值」的区别：C++ 允许整型到 bool 的隐式转换（非零→true），但函数签名决定的返回类型是 bool，调用方拿到的只有 true/false。

**考点：** bool 类型、类型转换
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
            question: `通讯卫星在通信网络系统中主要起到（ ）的作用。`,
            options: [
                "信息过滤",
                "信号中继",
                "避免攻击",
                "数据加密",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
通讯卫星在通信网络中不对信息内容做加工（过滤、加密都不做），核心功能是接收地面站上行信号、放大后向地面转发——即**信号中继**（中继/转发节点）。
- **A 信息过滤：** 对内容按规则筛选，是网关/防火墙类设备的功能。
- **B 信号中继：** 正确——卫星通信的本质是「上行→放大变频→下行」的中继过程。
- **C 避免攻击：** 安全防护不是通信卫星的职能。
- **D 数据加密：** 加密由通信双方完成，卫星只透传信号。

**易错点：** 从「网络中继节点」的角度理解卫星、路由器、交换机的共性：它们都在转发信号/数据包，而不解读或修改业务内容。

**考点：** 计算机网络、通信技术常识
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
            question: `小杨想编写一个判断任意输入的整数 N 是否为素数的程序，下面哪个方法不合适？（ ）`,
            options: [
                "埃氏筛法",
                "线性筛法",
                "二分答案",
                "枚举法",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
判断单个整数 N 是否为素数：
- **A 埃氏筛法：** 可以——筛出 [2, √N] 的素数并标记倍数，最后看 N 是否未被标记；虽然通常用于批量筛素数，但用于单个判断也行。
- **B 线性筛法：** 同理，线性筛预处理素数表后查询，可行（对单个数略显杀鸡用牛刀，但**合适**）。
- **C 二分答案：** **不合适**——二分答案要求「答案空间具有单调可判定性」（如最大最小值问题）；素性判定是「是/否」谓词，不存在在某个值域上二分搜索的答案空间，无从二分。
- **D 枚举法：** 试除 2 到 √N，是最直接的判断方法，合适。

**易错点：** 区分「筛法求素数表」与「判定单个素数」：筛法针对批量；单个判定用试除即可。二分答案的适用前提是答案可验证且具有单调性。

**考点：** 素数判定、二分答案适用条件
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
            question: `内排序有不同的类别，下面哪种排序算法和冒泡排序是同一类？（ ）`,
            options: [
                "希尔排序",
                "快速排序",
                "堆排序",
                "插入排序",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**解析：**
内排序按核心操作分类：**交换排序**（冒泡、快速）、插入排序（直接插入、希尔）、选择排序（简单选择、堆）、归并排序。

冒泡排序通过「逆序则交换相邻元素」完成排序，属于**交换排序**；快速排序同样以交换为核心操作（partition 中的 swap），同属交换排序类。
- **A 希尔排序：** 插入排序的改进（分组插入），属插入类。
- **B 快速排序：** 正确——与冒泡同属交换排序。
- **C 堆排序：** 选择排序的改进（利用堆选择最值）。
- **D 插入排序：** 逐个插入有序区，属插入类。

**易错点：** 冒泡（交换相邻）与快排（大范围交换）看似迥异，但分类依据是**核心操作=交换**；希尔名字里没有「插入」却属插入类，堆排序名字里没有「选择」却属选择类——按操作本质分类，不按名字。

**考点：** 排序算法分类`,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `在面向对象中，方法在 C++ 的 class 中表现为 class 内定义的函数。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
面向对象中的「方法」（成员方法）在 C++ 中表现为类内定义的成员函数，作用于对象并可以访问其成员。说法正确。

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
            question: `C++ 类的定义中，可以没有构造函数，会给出默认的构造函数（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
定义类时可以不写构造函数，编译器会自动生成一个默认（无参）构造函数，成员按其规则初始化（内置类型成员不自动清零，类类型成员调用其默认构造）。注意：一旦自己定义了任何构造函数，编译器就不再生成默认版本（C++11 可用 = default 找回）。

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
            question: `如果某个 C++ 对象（ object ）支持下标运算符（方括号运算符），则该对象在所对应 class 中以成员函数的形式 进行了重载。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
下标运算符 [] 只能以成员函数形式重载，签名形如 T& operator[](std::size_t i)（典型实现如 std::vector、std::map）。对象能使用 obj[i] 语法，说明其类中以成员函数形式重载了 operator[]。

**考点：** 运算符重载
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
            question: `深度优先搜索（ DFS ， Depth First Search 的简写）属于图算法，其过程是对每一个可能的分支路径深入到不 能再深入为止，而且每个节点只能访问一次。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
DFS 是 Depth First Search 的缩写，属于图/树遍历算法：从起点沿一条分支不断深入，走不通再回溯换分支，配合 visited 标记保证每个节点只访问一次。说法正确。

**考点：** 深度优先搜索
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
            question: `哈夫曼编码（ Huffman Coding ）具有唯一性，因此有确定的压缩率。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
哈夫曼树的形态确实不唯一（交换兄弟节点左右子树、同频次节点选取顺序不同会得到不同编码），但**关键在于：同一组频率下所有哈夫曼树的 WPL（编码总长度）都相同**——这是哈夫曼算法的最优性保证。压缩率只取决于各字符的编码长度之和（即 WPL），码长不变，压缩率就不变。因此「有确定的压缩率」成立，题干正确。

**易错点：** 不要把「编码不唯一」混同于「压缩率不确定」——编码虽不同，但每个字符的码长是唯一确定的，WPL 唯一。

**考点：** 哈夫曼编码
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
            question: `在下面 C++ 代码中，由于删除了变量 ptr，因此 ptr 所对应的数据也随之删除，故第 8 行代码被执行时， 将报错。（ ）

\`\`\`cpp
int * ptr=new int(10);
cout<<*ptr<<endl;
delete ptr;
cout<<*ptr<<endl;
\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
delete ptr 释放的是 ptr 指向的动态内存，ptr 本身并不会被删除，此后 ptr 成为悬空指针（dangling pointer）。第 8 行解引用悬空指针属于未定义行为：程序可能崩溃「报错」，也可能照常运行并输出无意义的旧值——是否报错取决于编译器和运行环境，不能断定必然报错。

**考点：** 动态内存、悬空指针
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
            question: `二叉搜索树查找的平均时间复杂度为 O(log N)。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
普通二叉搜索树（BST）没有自平衡机制。只有在**随机插入、树形态均匀**的理想前提下，平均查找才是 O(log N)；一旦按有序数据依次插入，BST 就退化成一条链表，查找退化为 O(N)。由于 BST 的查找复杂度依赖于树的形态、并无任何保证，「平均 O(log N)」的断言不成立——这正是官方判定为错误的原因。若要保证 O(log N)，需使用平衡二叉搜索树（AVL、红黑树等）。

**易错点：** 「平均 O(log N)」是随机建树前提下的期望值，不是 BST 这个数据结构的保证；题目未限定平衡/随机形态，应按最坏情形语义理解。

**考点：** 时间复杂度、二叉搜索树
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
            question: `二叉搜索树可以是空树（没有任何节点）或者单节点树（只有一个节点），或者多节点。如果是多节点，则 左节点的值小于父节点的值，右节点的值大于父节点的值，由此推理，右节点树的值都大于根节点的值，左节点树 的值都小于根节点的值。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
二叉搜索树的定义就允许空树与单节点树；多节点时左子节点 < 父节点 < 右子节点，由该性质可归纳推出：左子树中所有节点值都小于根、右子树中所有节点值都大于根。这正是 BST「左 < 根 < 右」的递归性质，说法正确。

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
            question: `小杨想写一个程序来算出正整数 N 有多少个因数，经过思考他写出了一个重复没有超过 N/2 次的循环就能够算 出来了。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
除 N 本身外，N 的每个因数 d 都满足 d ≤ N/2（当 d 是 N 的真因数时，N = d·k 且 k ≥ 2，故 d ≤ N/2）。因此枚举 1 到 N/2 判断能否整除，再加计 N 本身，循环次数不超过 N/2 次即可统计出全部因数个数。说法正确。

**考点：** 枚举、因数
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
            question: `同样的整数序列分别保存在单链表和双向链中，这两种链表上的简单冒泡排序的复杂度相同。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
简单冒泡排序的基本操作是「比较相邻元素、必要时交换」，在单链表上沿 next 指针、在双向链表上沿 next 指针都能同样访问相邻节点（双向链表额外的 prev 指针帮不上冒泡排序的忙），比较与交换次数完全一样，都是 O(N²)。两者复杂度相同。

**考点：** 时间复杂度、链表
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
