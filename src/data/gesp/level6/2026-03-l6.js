// 2026年3月 GESP C++ 六级真题（2026-10-24 按官方原卷逐页转写整卷重建，答案以原卷首页答案表为准）

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `4
1 2 3 4
3 3 1 1`, output: `7` },
        { input: `6
1 1 4 5 1 4
1 2 3 2 1 0`, output: `11` }
      ],
      question: `
# [GESP202603 六级] 选数

## 题目描述

给定两个包含 $n$ 个整数的数组 $a = [a_1, \\ldots, a_n]$ 与 $b = [b_1, \\ldots, b_n]$。你需要指定若干个下标 $p_1 < p_2 < \\cdots < p_k$（$1 \\le k \\le n$）使得以下条件成立：

- $1 \\le p_i \\le n$（$1 \\le i \\le k$）；
- $p_{i+1} \\ge p_i + b_{p_i}$（$1 \\le i < k$）。

你需要在满足以上条件的前提下，最大化 $\\sum_{i=1}^{k} a_{p_i}$，也即最大化数组 $a$ 对应下标的整数之和。

## 输入格式

第一行，一个正整数 $n$，表示数组长度。

第二行，$n$ 个非负整数 $a_1, a_2, \\ldots, a_n$，表示数组 $a$。

第三行，$n$ 个非负整数 $b_1, b_2, \\ldots, b_n$，表示数组 $b$。

## 输出格式

一行，一个整数，表示在满足上述条件的前提下，数组 $a$ 对应下标的整数之和的最大值。

## 数据范围

对于 40% 的测试点，保证 $2 \\le n \\le 10^3$。

对于所有测试点，保证 $2 \\le n \\le 10^5$，$0 \\le a_i \\le 10^9$，$0 \\le b_i \\le n$。
`,
      score: 25,
      explanation: `**解析：**
      线性 DP。设 f[i] 表示"下一个可选下标不早于 i"时，已选下标之和的最大值（初始全为 0，即一个都不选）。从左到右处理每个下标 i：

      - 选中 i：当前答案用 ans = max(ans, f[i] + a[i]) 随时统计；若 i 被选中，则下一个下标必须 ≥ i + b[i]，故转移 f[i + b[i]] = max(f[i + b[i]], f[i] + a[i])；
      - 不选 i：则下一个可选下标最早是 i + 1，转移 f[i + 1] = max(f[i + 1], f[i])。

      由于 b[i] ≤ n，每个状态只向右转移一次，总复杂度 O(n)。样例 1 中选下标 {3, 4}（满足 4 ≥ 3 + b[3] = 4），和为 3 + 4 = 7。

      **考点：** 动态规划、线性DP
      `,
      tags: ["编程题", "动态规划", "线性DP"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <cstdio>\n#include <algorithm>\n\nusing namespace std;\n\nconst int N = 1e5 + 5;\n\nint n;\nint a[N], b[N];\nlong long f[N], ans;\n\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= n; i++)\n        scanf(\"%d\", &a[i]);\n    for (int i = 1; i <= n; i++)\n        scanf(\"%d\", &b[i]);\n    for (int i = 1; i <= n; i++) {\n        ans = max(ans, f[i] + a[i]);\n        if (i + b[i] <= n)\n            f[i + b[i]] = max(f[i + b[i]], f[i] + a[i]);\n        f[i + 1] = max(f[i + 1], f[i]);\n    }\n    printf(\"%lld\\n\", ans);\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `4
2 3
4 0
0 0
0 0`, output: `4` },
        { input: `4
2 3
0 0
4 0
0 0`, output: `3` }
      ],
      question: `
# [GESP202603 六级] 完全二叉树

## 题目描述

给定一棵包含 $n$ 个结点的有根二叉树，结点依次以 $1, 2, \\ldots, n$ 编号，根结点编号为 $1$。

对于结点 $i$，其左儿子的编号记为 $l_i$，右儿子编号记为 $r_i$。特别地，如果左儿子不存在则 $l_i = 0$，如果右儿子不存在则 $r_i = 0$。

树中每个结点都对应一棵以其为根的子树。请你求出给定有根树的所有 $n$ 棵子树中，有多少棵子树是完全二叉树。

## 输入格式

第一行，一个正整数 $n$，表示根二叉树结点数量。

接下来 $n$ 行，每行两个正整数 $l_i, r_i$，表示结点 $i$ 的左儿子编号和右儿子编号。

## 输出格式

输出一行，一个整数，表示所有子树中完全二叉树的数量。

## 数据范围

对于 40% 的测试点，保证 $1 \\le n \\le 500$。

对于所有测试点，保证 $1 \\le n \\le 10^6$。
`,
      score: 25,
      explanation: `**解析：**
      树形 DFS（后序）自底向上判定。对每个结点 u 维护三个量：mn[u]（u 子树中叶子的最小深度）、mx[u]（最大深度）、chk[u]（u 的子树是否为完全二叉树）。空结点按"完全"处理（mn = mx = 0）。u 的子树是完全二叉树，当且仅当：

      1. 左右子树都是完全二叉树（chk[u] &= chk[l] & chk[r]）；
      2. 左子树的最小深度 ≥ 右子树的最大深度（底层结点只能向左延伸，右子树不能比左子树"深出一截"）；
      3. 整棵子树最大深度与最小深度相差不超过 1（mn[u] ≥ mx[u] - 1，即最深层从左到右连续填充）。

      每个结点处理一次，总复杂度 O(n)。样例 2 中结点 1 的左子树深度为 1、右子树深度为 2，违反条件 2，故结点 1 不计入，答案为 3。

      **考点：** 树与二叉树、DFS、后序遍历
      `,
      tags: ["编程题", "树与二叉树", "DFS"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <cstdio>\n#include <algorithm>\n\nusing namespace std;\n\nconst int N = 1e5 + 5;\n\nint n;\nint l[N], r[N];\nint mn[N], mx[N], chk[N];\nint ans;\n\nvoid dfs(int u) {\n    chk[u] = 1;\n    if (!u)\n        return;\n    dfs(l[u]);\n    dfs(r[u]);\n    chk[u] &= chk[l[u]] & chk[r[u]];\n    mn[u] = 1 + min(mn[l[u]], mn[r[u]]);\n    mx[u] = 1 + max(mx[l[u]], mx[r[u]]);\n    chk[u] &= mn[l[u]] >= mx[r[u]];\n    chk[u] &= mn[u] >= mx[u] - 1;\n    ans += chk[u];\n}\n\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= n; i++)\n        scanf(\"%d%d\", &l[i], &r[i]);\n    dfs(1);\n    printf(\"%d\\n\", ans);\n    return 0;\n}",
      answer: '',
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
            question: `下列关于 C++ 类的描述，正确的是（ ）。`,
            options: [
                "如果类没有用户声明的构造函数，那么编译器会隐式声明一个默认构造函数",
                "类的析构函数可以被重载，一个类可以有多个析构函数",
                "类中的所有成员都必须声明为 public",
                "类和结构体在 C++ 中没有区别，包括默认访问权限也相同",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            若类中没有用户声明的构造函数，编译器会隐式生成一个默认构造函数（无参），A 正确。

            - **B**：析构函数没有参数、不能重载，一个类只能有一个析构函数。
            - **C**：类的成员默认访问权限是 private，完全可以声明为 private/protected。
            - **D**：class 与 struct 的唯一区别是默认访问权限（class 为 private，struct 为 public），并非"包括默认访问权限也相同"。

            **考点：** 面向对象、构造函数与析构函数
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "面向对象",
                "类",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `下列代码中，\`s1->draw();\` 和 \`s2->draw();\` 输出不同结果的主要原因是（ ）。

\`\`\`cpp
class Shape {
public:
    virtual void draw() {
        cout << "绘制图形" << endl;
    }

    virtual ~Shape() {}
};

class Circle : public Shape {
public:
    void draw() override {
        cout << "绘制圆形" << endl;
    }
};

class Rectangle : public Shape {
public:
    void draw() override {
        cout << "绘制矩形" << endl;
    }
};

int main() {
    Shape* s1 = new Circle();
    Shape* s2 = new Rectangle();

    s1->draw();
    s2->draw();

    delete s1;
    delete s2;
    return 0;
}
\`\`\``,
            options: [
                "draw() 是普通成员函数",
                "Shape 中的 draw() 被声明为虚函数",
                "Circle 和 Rectangle 中使用了 public 继承",
                "指针变量名不同",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            两次调用都是通过基类指针 Shape* 发起的，但分别输出了"绘制圆形"和"绘制矩形"，这是运行时多态：Shape::draw() 被声明为 **virtual**，通过基类指针调用时会根据对象的真实类型（动态绑定）选择 Circle::draw() 或 Rectangle::draw()。

            - **A**：若 draw() 是普通成员函数，则按指针的静态类型调用 Shape::draw()，两次都输出"绘制图形"。
            - **C**：public 继承只影响访问权限，与多态分派无关。
            - **D**：指针变量名与调用结果无关。

            **考点：** 虚函数、运行时多态、动态绑定
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "面向对象",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `下面的代码在 main() 中有一行会导致编译错误，请找出来。

\`\`\`cpp
class Pet {
public:
    Pet(string n, int a) : name(n), age(a) {}
    string getName() { return name; }
    void   birthday() { age++; }
private:
    string name;
    int    age;
};

int main() {
    Pet cat("奶茶", 2);
    cat.getName();          // ①
    cat.birthday();         // ②
    cat.name = "大嘴";      // ③
    cout << cat.getName();  // ④
    return 0;
}
\`\`\``,
            options: [
                "第①行",
                "第②行",
                "第③行",
                "第④行",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            name 是 Pet 的 **private** 成员，在类外直接访问 \`cat.name = "大嘴";\`（第③行）非法，编译报错。

            - **第①行 / 第④行**：getName() 是公有成员函数，类外可调用。
            - **第②行**：birthday() 也是公有成员函数，虽然它内部修改了私有成员 age，但这是类自己的成员函数访问自己的成员，完全合法。

            **要点：** private 限制的是"类外直接访问"，类内部的成员函数访问私有成员不受限制。

            **考点：** 访问控制、封装
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "面向对象",
                "类",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `游乐园的过山车每次限坐 4 人，用循环队列管理排队（容量 MAX=5，空一格判满）。下面代码执行后，循环队列是否已满？rear 的值是多少？

\`\`\`cpp
const int MAX = 5;
int queue[MAX];
int front = 0, rear = 0;

// 入队
void enqueue(int x) {
    queue[rear] = x;
    rear = (rear + 1) % MAX;
}

// 出队
void dequeue() {
    front = (front + 1) % MAX;
}

int main() {
    enqueue(1); enqueue(2); enqueue(3); enqueue(4);
    dequeue(); dequeue();
    enqueue(5); enqueue(6);
}
\`\`\``,
            options: [
                "已满，rear = 1",
                "未满，rear = 1",
                "已满，rear = 2",
                "未满，rear = 4",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            逐步跟踪下标（front=0, rear=0 起步）：

            - enqueue(1)~(4)：rear 依次变 1、2、3、4；
            - dequeue() 两次：front 变 1、2；
            - enqueue(5)：rear = (4+1) % 5 = 0；enqueue(6)：rear = (0+1) % 5 = 1。

            此时队内元素占下标 2、3、4、0 共 4 个位置。采用"空一格判满"，容量为 MAX-1 = 4，队列**已满**，且 rear = 1。

            **考点：** 循环队列、判满条件
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "队列",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `在以下计算机系统应用场景中，最适合使用循环队列的是（ ）。`,
            options: [
                "函数调用过程中，保存局部变量和返回地址",
                "表达式求值中的运算符优先级处理",
                "操作系统中的进程优先级调度（高优先级先执行）",
                "生产者和消费者问题中的共享缓冲区",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            循环队列是先进先出（FIFO）的定长结构，天然适合"生产快、消费慢"的环形共享缓冲区：生产者从 rear 端写入、消费者从 front 端读出，空间循环复用。

            - **A**：函数调用的局部变量与返回地址用**栈**（调用栈）管理。
            - **B**：表达式求值按运算符优先级处理，典型实现用**栈**。
            - **C**：按优先级而非先后顺序出队，需要**优先队列（堆）**。

            **考点：** 循环队列、队列的应用场景
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "队列",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `在二叉搜索树（BST）中，若中序遍历的序列为 [1, 2, 3, 4, 5]，且先序遍历的第一个序列元素为 3，则下列说法正确的是（ ）。`,
            options: [
                "该树一定是一棵完全二叉树",
                "元素 4 和 5 不可能是兄弟节点",
                "元素 1 所在节点的深度可能大于 3（根节点深度为 1）",
                "元素 2 一定是元素 1 的父节点",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            先序第一个元素是根，故根为 3。由 BST 性质，中序中 3 左边的 [1, 2] 是左子树、右边的 [4, 5] 是右子树。

            - **B 正确**：右子树只有 {4, 5} 两个结点，两个结点只能构成父子关系（4 为根、5 为右孩子，或 5 为根、4 为左孩子），绝不可能互为兄弟（兄弟需要共同父结点，而该子树的根只有一个）。
            - **A**：不一定完全。例如 2 为根、1 为左孩子，5 为根、4 为左孩子时，底层结点不在最左侧连续位置。
            - **C**：元素 1 最深的情形是 3 → 2 → 1，深度恰为 3，不可能大于 3。
            - **D**：左子树也可以以 1 为根、2 为其右孩子，此时 1 反而是 2 的父结点。

            **考点：** 二叉搜索树、先序/中序遍历性质
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "树与二叉树",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `某二叉树共有 10 个结点，记为 A~J，已知它的先序遍历序列为：A B D H I E C F J G，中序遍历序列为：H D I B E A F J C G，则该二叉树的后序遍历序列是（ ）。`,
            options: [
                "H I D E B J F G C A",
                "H I D B E J F G C A",
                "I H D E B J F G C A",
                "H I D E B F J G C A",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            先序首元素为根，再按根在中序中的位置切分左右子树，递归进行：

            - 根 A：左子树 {H, D, I, B, E}（先序 B D H I E），右子树 {F, J, C, G}（先序 C F J G）；
            - B 的左子树 {H, D, I}：根 D，由中序 H|D|I 得 D 的左孩子 H、右孩子 I，后序为 H I D；B 的右子树为 {E}；故 A 左侧后序 = H I D E B；
            - C 的左子树 {F, J}：中序 F|J、先序 F J，F 只有右孩子 J，后序为 J F；C 的右子树为 {G}；故 A 右侧后序 = J F G C；
            - 根 A 最后输出。

            拼接得后序：H I D E B J F G C A。

            **考点：** 先序+中序重建二叉树、后序遍历
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "树与二叉树",
                "递归",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `下列关于树的遍历的说法中，正确的一项是（ ）。`,
            options: [
                "对任意一棵树进行深度优先先遍历，所得序列一定唯一",
                "已知一棵二叉树的先序遍历和后序遍历序列，可以唯一确定这棵二叉树",
                "已知一棵二叉树的先序遍历和中序遍历序列，可以唯一确定这棵二叉树",
                "已知一棵二叉树的先序遍历序列，可以唯一确定这棵二叉树",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            先序确定根、中序分左右，两者结合可以递归地唯一重建二叉树（要求结点值互异），C 正确。

            - **A**：多叉树的 DFS 序列取决于访问孩子的先后顺序，顺序不同序列不同，不一定唯一。
            - **B**：先序+后序无法唯一确定——只有一个孩子的结点无法判断该孩子是左孩子还是右孩子。
            - **D**：仅有先序序列无法区分左右子树的划分方式。

            **考点：** 二叉树遍历、序列重建
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "树与二叉树",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `有 6 个字符，它们出现的次数分别为：{2, 3, 3, 4, 6, 8}。现在用哈夫曼编码为这些字符编码，最小加权和路径长度 WPL（每个字符的出现次数 × 它的编码长度，再把每个字符结果加起来）的值为（ ）。`,
            options: [
                "58",
                "60",
                "62",
                "64",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            哈夫曼树的构建过程：每次取出权值最小的两棵树合并。权值 {2, 3, 3, 4, 6, 8}：

            - 2 + 3 = 5；3 + 4 = 7；5 + 6 = 11；7 + 8 = 15；11 + 15 = 26。

            WPL 等于所有非叶（合并产生）结点的权值之和：

            5 + 7 + 11 + 15 + 26 = **64**。

            也可按编码长度逐字符验证：本合并次序下权 6、8 的编码长为 2，权 2、3、3、4 的编码长为 3，WPL = (6 + 8)×2 + (2 + 3 + 3 + 4)×3 = 28 + 36 = 64，两种方法结果一致（"合并权值求和"不依赖具体树形，更不易出错）。

            **考点：** 哈夫曼树、WPL
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "哈夫曼编码",
                "树与二叉树",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `对 n 个不同的符号进行哈夫曼编码。若生成的哈夫曼树共有 115 个结点，则 n 的值是（ ）。`,
            options: [
                "60",
                "58",
                "57",
                "56",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            哈夫曼树中每个非叶结点都恰好有 2 个孩子，即只存在度为 0（n 个叶子，对应 n 个符号）和度为 2 的结点。由二叉树性质 n0 = n2 + 1，总结点数：

            n0 + n2 = n + (n - 1) = 2n - 1

            令 2n - 1 = 115，解得 n = **58**。

            **考点：** 哈夫曼树、二叉树结点计数
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "哈夫曼编码",
                "树与二叉树",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `关于格雷编码（Gray Code），下列说法正确的是（ ）。`,
            options: [
                "格雷编码中，编码位数越多，相邻编码之间变化的位数也越多",
                "格雷编码中，相邻两个编码的二进制位恰好有一位不同",
                "格雷编码就是把普通二进制编码按位取反后得到的结果",
                "格雷编码不能用于数字电路和状态转换的设计中",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            格雷码的定义就是相邻两个编码（包括首尾循环相邻）的汉明距离为 1，即恰好有一位不同，这样状态切换时每次只翻转一位，可避免多位同时变化带来的毛刺。

            - **A**：相邻编码变化的位数恒为 1，与编码位数无关。
            - **C**：格雷码与二进制码的转换是"前缀异或"（G = B ⊕ (B >> 1)），不是简单按位取反。
            - **D**：格雷码正是为数字电路设计的，广泛用于旋转编码器、异步 FIFO 的地址指针等。

            **考点：** 格雷编码、编码理论
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "格雷编码",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `给定一棵二叉树，采用广度优先搜索（BFS）算法，返回右视图所有节点的值。其中右视图定义为：二叉树的右视图是从树的右侧看过去时可见的节点集合，即右视图中的每个节点都是某一层中最右侧的节点。

\`\`\`cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<int> rightSideView(TreeNode* root) {
    unordered_map<int, int> rightmostValueAtDepth;
    int max_depth = -1;

    queue<TreeNode*> nodeQueue;
    queue<int> depthQueue;
    nodeQueue.push(root);
    depthQueue.push(0);

    while (!nodeQueue.empty()) {
        TreeNode* node = nodeQueue.front(); nodeQueue.pop();
        int depth = depthQueue.front(); depthQueue.pop();

        if (node != NULL) {
            max_depth = max(max_depth, depth);

            rightmostValueAtDepth[depth] = node->val;

            nodeQueue.push(node->left);
            nodeQueue.push(node->right);

            depthQueue.push(________);
            depthQueue.push(________);
        }
    }

    vector<int> rightView;
    for (int depth = 0; ________; ++depth) {
        rightView.push_back(rightmostValueAtDepth[depth]);
    }
    return rightView;
};
\`\`\``,
            options: [
                "depthQueue.push(depth)、depthQueue.push(depth)、for (int depth = 0; depth < max_depth; ++depth)",
                "depthQueue.push(depth + 1)、depthQueue.push(depth + 1)、for (int depth = 0; depth <= max_depth; ++depth)",
                "depthQueue.push(depth + 1)、depthQueue.push(depth + 1)、for (int depth = 0; depth < max_depth; ++depth)",
                "depthQueue.push(depth)、depthQueue.push(depth)、for (int depth = 0; depth <= max_depth; ++depth)",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            两个队列同步扩展：结点出队时把左右孩子入队，孩子的深度都是当前 depth + 1，所以两处 depthQueue.push 均应填 depth + 1。统计时 map 中每个深度记录的是该层**最后被访问**（即最右）的结点值；深度范围是 0 ~ max_depth 共 max_depth + 1 层，故循环条件应为 depth <= max_depth，用 < 会漏掉最后一层。

            **考点：** BFS、层序遍历、二叉树右视图
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "广度优先搜索",
                "树与二叉树",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `下列关于树的深度优先搜索（DFS）的说法中，正确的是（ ）。`,
            options: [
                "对树进行 DFS 时，一定是按层从上到下依次访问结点",
                "对任意一棵树进行 DFS，得到的遍历序列唯一",
                "对一棵树进行 DFS 时，常借助递归或栈实现",
                "DFS 只能用于二叉树，不能用于普通树",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            DFS 沿一条分支走到底再回溯，递归（隐式使用调用栈）或显式栈都是标准实现方式，C 正确。

            - **A**：按层从上到下访问是 BFS（广度优先搜索）的特征。
            - **B**：DFS 序列取决于孩子结点的访问顺序，同一棵树可以得到不同的 DFS 序列。
            - **D**：DFS 适用于任意树乃至一般图，只需按邻接关系遍历即可。

            **考点：** 深度优先搜索、DFS 与 BFS
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "深度优先搜索",
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
        dp[i] = ______;  // 在此处填写代码
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
            explanation: `**答案：C**

            **解析：**
            令 dp[i] 表示只考虑第 0 到第 i 家时能拿到的最多糖果。处理第 i 家有两种互斥选择：

            - 不进入第 i 家，最优值为 dp[i - 1]；
            - 进入第 i 家，则不能进入第 i - 1 家，最优值为 dp[i - 2] + nums[i]。

            取两者较大值，即 dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])。这是经典的"打家劫舍"型 DP。

            - **A**：相邻两家 candies 相加，违反互斥规则。
            - **B**：把"累加"错写成乘法。
            - **D**：强制进入第 i 家，漏掉"不进当前家更优"的情形。

            **考点：** 动态规划、不相邻元素最大和
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "动态规划",
                "线性DP",
            ],
            sourceVerified: true,
            sourcePage: 6,
            reviewedAt: "2026-10-24",
            reviewedBy: "WorkBuddy AI（官方 PDF 逐页转写 + 答案表核对）",
        },
        {
            id: 15,
            type: "single",
            question: `元宵节晚上，小朋友沿一条发光石板路前进，每次可向前走 1 块或 2 块石板。动态规划定义如下：dp[i] = dp[i - 1] + dp[i - 2]，下面关于 dp[i] 的含义最合适的是（ ）。`,
            options: [
                "走到第 i 块石板的不同走法数量",
                "走到第 i 块石板时，已经走过的石板总数",
                "从第 i 块石板走回起点的最少步数",
                "从第 i 块石板走回起点的最大步数",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            这是计数型 DP（爬楼梯/斐波那契递推）：到达第 i 块石板的最后一步要么从第 i-1 块跨 1 步，要么从第 i-2 块跨 2 步，两类方案互斥且完备，故方案数相加：dp[i] = dp[i-1] + dp[i-2]，即走到第 i 块石板的**不同走法数量**。

            - **B**：走过的石板总数与"最后一步来源"无关，不会按此式相加。
            - **C**：最少步数每次尽量跨 2 块，为 ⌈i/2⌉，不存在这种相加递推。
            - **D**：最大步数是全走 1 步即 i-1 步，同样不符合该递推。

            **考点：** 动态规划、计数DP、爬楼梯模型
            `,
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
                "动态规划",
                "斐波那契",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `下面定义了一个表示二维坐标点的类 Point，并提供了一个带参的构造函数。但第②行 Point b; 会调用编译器自动生成的默认构造函数，将 b.x 和 b.y 被初始化为 0.0，程序可以正常编译运行。

\`\`\`cpp
class Point {
public:
    double x, y;
    Point(double px, double py) : x(px), y(py) {}
    void print() {
        cout << "(" << x << ", " << y << ")";
    }
};

int main() {
    Point a(3.0, 4.0);  // ①
    Point b;            // ②
    a.print();
}
\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            一旦类中定义了任何构造函数（此处是带参构造函数），编译器就**不再隐式生成默认构造函数**。因此第②行 \`Point b;\` 找不到无参构造函数，编译报错，程序无法通过编译。

            要让其通过编译，可显式补充无参/带默认参数的构造函数，如 \`Point() = default;\` 或 \`Point(double px = 0, double py = 0)\`。

            **考点：** 构造函数、默认构造函数的生成规则
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
                "面向对象",
                "类",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `C++ 中的继承支持单继承和多继承，但子类无法直接访问父类的私有成员。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            C++ 允许一个类同时继承多个基类（多继承），也支持单继承，说法前半正确。private 成员只能被本类的成员函数和友元访问，即使子类也不能直接访问父类的 private 成员，只能通过父类提供的 public/protected 接口间接使用；protected 成员才是专为子类准备的"可继承访问"级别。

            **考点：** 继承、访问控制
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
                "面向对象",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `对如下结构的树，执行 travel 函数，输出结果是 1 2 3 4 5。

\`\`\`text
    1
   / \\
  2   3
 / \\
4   5
\`\`\`

\`\`\`cpp
struct Node {
    int val;
    Node *left, *right;
    Node(int v) : val(v), left(nullptr), right(nullptr) {}
};

void travel(Node* root) {
    if (!root) return;
    stack<Node*> s;
    s.push(root);

    while (!s.empty()) {
        Node* cur = s.top(); s.pop();
        cout << cur->val << " ";

        if (cur->right)  s.push(cur->right);
        if (cur->left)   s.push(cur->left);
    }
}
\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            图中 4、5 是结点 2 的左右孩子，结点 3 是叶子。用栈模拟（先压右孩子再压左孩子，保证左孩子先出栈）：

            - 弹出 1 输出，压入 3、2；
            - 弹出 2 输出，压入 5、4；
            - 依次弹出 4、5、3 输出。

            实际输出为 **1 2 4 5 3**，不是 1 2 3 4 5。

            **易错点：** 想当然认为按层序或按图中"从左到右"输出；栈实现的先序遍历中，同一层的兄弟结点是"左先出"，而 3 要等 2 的整棵子树访问完才输出。

            **考点：** 栈实现先序遍历、非递归遍历
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
                "栈",
                "树与二叉树",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `若所有字符出现频率相同，则哈夫曼编码一定会得到完全二叉树。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            等频时哈夫曼树的构建确实"尽量平衡"（任意两棵先合并的树权值相近），但"接近平衡"不等于"完全二叉树"。完全二叉树要求结点按层、从左到右连续排列。例如 5 个等频字符：先合并出两个权 2 的结点，再与剩余单结点合并出权 3 的结点，最终树中某一侧子树比另一侧深一层，且最深层结点不满足从最左端连续填充的形态，因此不是完全二叉树（如 n = 3 时若合并树挂在一侧、叶挂在另一侧的特定形态，同样可能不满足）。

            等频只能保证各叶子深度差不超过 1，不能保证"完全"的结构要求。

            **考点：** 哈夫曼树形态、完全二叉树定义
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
                "哈夫曼编码",
                "树与二叉树",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `哈夫曼编码是一种变长的前缀编码，在解码时不需要额外的分隔符就能唯一还原。这是因为在哈夫曼树中，任何一个字符的叶子结点都不会成为另一个字符结点的祖先。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            哈夫曼编码中字符只分配在哈夫曼树的**叶子**上。一个编码若是另一个编码的前缀，则前者对应的结点应是后者的祖先；而叶子不可能有任何后代，所以任何字符的编码都不会是另一字符编码的前缀。这种前缀性质保证了编码串从左到右扫描即可唯一切分、无歧义解码，无需分隔符。

            **考点：** 哈夫曼编码、前缀码
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
                "哈夫曼编码",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `在 C++ 中使用一维数组 vector<int> tree 存储（按层序遍历的）完全二叉树时，若根节点存储在 tree[0]，则对于任意非空节点 tree[i]，其右孩子（如果有）必然位于 tree[2 * i + 2]。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            0 起始下标存储的完全二叉树中，下标从 i 到 2i+1、2i+2 逐层翻倍：左孩子下标为 2i + 1，右孩子下标为 2i + 2，父结点为 (i - 1) / 2。只要树按层序连续存储且是完全二叉树，该公式对所有非空结点成立。（若下标从 1 开始，则左孩子为 2i、右孩子为 2i+1，注意区分。）

            **考点：** 完全二叉树的数组存储、堆的下标关系
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
                "树与二叉树",
                "数组",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `在 C++ 中使用栈来非递归地实现二叉树的前序遍历时，为了保证遍历顺序正确，在处理完当前结点后，应该先将该结点的左孩子压入栈中，然后再将右孩子压入栈中。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            栈是后进先出结构，希望**左孩子先被访问**就必须让它**后进栈**。正确顺序是先压右孩子、再压左孩子，弹出时才能先处理左子树。若先压左后压右，则右孩子先出栈，遍历顺序变成"根-右-左"，不是前序。

            **考点：** 栈实现前序遍历、入栈顺序
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
                "栈",
                "树与二叉树",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `设二叉树共有 n 个结点。函数 preorderTraversal 以下代码的时间复杂度为 O(n)、空间复杂度为 O(n)。

\`\`\`cpp
struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

void preorder(TreeNode *root, vector<int> &res) {
    if (root == nullptr) {
        return;
    }
    res.push_back(root->val);
    preorder(root->left, res);
    preorder(root->right, res);
}

vector<int> preorderTraversal(TreeNode *root) {
    vector<int> res;
    preorder(root, res);
    return res;
};
\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            每个结点恰好被访问一次，push_back 总次数为 n，时间复杂度 O(n)。空间方面除输出数组（O(n)）外，递归调用栈的深度等于树高：平衡树为 O(log n)，最坏情况（链状树）为 O(n)，按最坏情形计空间复杂度为 O(n)，故题述成立。

            **考点：** 递归遍历的复杂度分析
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
                "复杂度分析",
                "递归",
                "树与二叉树",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `下列代码实现了一个 0-1 背包的一维动态规划代码。内层循环是经典的逆序写法。若将内层循环改成正序遍历（即 for (int j = w[i]; j <= W; j++)），仍能得到正确答案。

\`\`\`cpp
int main() {
    int W = 5;
    int w[] = {2, 3, 4};
    int v[] = {10, 1, 1};
    int n    = 3;
    int dp[6] = {0};

    for (int i = 0; i < n; i++) {
        for (int j = W; j >= w[i]; j--) {  // ← 逆序!
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
        }
    }
    cout << dp[W];
}
\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            0-1 背包要求每件物品最多选一次。逆序更新保证计算 dp[j] 时用到的 dp[j - w[i]] 还是**上一轮**（未考虑物品 i）的值。若改成正序，dp[j - w[i]] 在本轮已被更新过、可能已经放入了物品 i，于是物品 i 被重复选取，问题悄悄变成了完全背包，结果一般会偏大，不再符合 0-1 背包的答案。

            **考点：** 0-1 背包一维优化、正序与逆序的本质区别
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
                "动态规划",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `在动态规划问题中，状态空间相同且没有重复计算的情况下，"状态转移方程+递推"与"递归+记忆化搜索"的时间复杂度通常相同。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            递推与记忆化搜索只是同一 DP 的两种实现方式：前者自底向上按拓扑序填表，后者自顶向下按需展开。当状态空间相同、且每个状态只被计算一次（无重复计算）时，两者的总状态数和每个状态的转移代价完全一样，时间复杂度相同（区别主要在常数因子与递归栈开销）。

            **考点：** 动态规划、递推与记忆化搜索
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP6级",
                "动态规划",
                "递推",
            ]
        },
        ...programmingQuestions
    ]
};
