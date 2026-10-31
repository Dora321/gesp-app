// 2025年6月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `8 8
2 1`, output: `5` },
        { input: `314159 2653589
27 1828`, output: `1599` }
      ],
      question: `
# [GESP202506 五级] 奖品兑换

## 题目描述

班主任给上课专心听讲、认真完成作业的同学们分别发放了若干张课堂优秀券和作业优秀券。同学们可以使用这两种券找班主任兑换奖品。具体来说，可以使用 $a$ 张课堂优秀券和 $b$ 张作业优秀券兑换一份奖品，或者使用 $b$ 张课堂优秀券和 $a$ 张作业优秀券兑换一份奖品。

现在小 A 有 $n$ 张课堂优秀券和 $m$ 张作业优秀券，他最多能兑换多少份奖品呢？

## 输入格式

第一行，两个正整数 $n,m$，分别表示小 A 持有的课堂优秀券和作业优秀券的数量。

第二行，两个正整数 $a,b$，表示兑换一份奖品所需的两种券的数量。

## 输出格式

输出共一行，一个整数，表示最多能兑换的奖品份数。
`,
      score: 25,
      explanation: `**答案单调性**：若能成功兑换 \`v\` 份奖品，则少于 \`v\` 份必然也能兑换；若无法兑换 \`v\` 份，则更多份数更无法兑换。答案具有单调性，因此可以使用**二分答案**寻找最大兑换份数。

---

### 2. 判定函数（check）设计
设当前需要检验是否能兑换 \`v\` 份奖品：
为了让两类券的消耗尽量匹配持有数量（\`n <= m\`），我们优先尝试将 \`v\` 份全部按方式一兑换：
- 初始课堂券消耗：\`x = v * a\`；
- 初始作业券消耗：\`y = v * b\`。

若 \`y <= m\`，且 \`x <= n\`，说明无需调整即可兑换。

若 \`y > m\`，说明作业券超出持有量，需要将部分奖品由「方式一」调整为「方式二」：
每将 1 份奖品改为方式二：
- 作业券消耗减少 \`b - a\`；
- 课堂券消耗增加 \`b - a\`。

作业券超出量为 \`y - m\`，因此至少需要调整的份数 \`t\` 为向上取整：
\`t = (y - m + (b - a) - 1) / (b - a)\`。

调整后：
- 作业券消耗变为：\`y - t * (b - a)\`；
- 课堂券消耗变为：\`x + t * (b - a)\`。

最后检验调整后的消耗是否满足 \`x <= n && y <= m\`。若满足则返回 \`true\`，否则返回 \`false\`。

---

### 3. 完整算法步骤
1. **输入与规范化**：
   - 读入 \`n, m, a, b\`；
   - 若 \`n > m\`，交换 \`n\` 与 \`m\`；
   - 若 \`a > b\`，交换 \`a\` 与 \`b\`；
   - 若 \`a == b\`，直接输出 \`n / a\` 并退出。
2. **二分答案**：
   - 设置二分左右边界：\`l = 0\`，\`r = n\`（因为 \`a >= 1\`，最多不超过 \`n / a <= n\` 份）；
   - 当 \`l < r\` 时循环：
     - 取中点 \`mid = (l + r + 1) / 2\`；
     - 调用 \`check(mid)\`：计算初值 \`x = mid * a\` 和 \`y = mid * b\`（使用 \`long long\` 防止溢出）；若 \`y > m\`，计算调整次数 \`t\` 并更新 \`x\` 和 \`y\`；
     - 若 \`check(mid)\` 成立，说明至少可以兑换 \`mid\` 份，令 \`l = mid\`；
     - 否则说明兑换不了 \`mid\` 份，令 \`r = mid - 1\`；
3. **输出答案**：二分结束后，\`r\` 即为最多可兑换的份数。

---

### 4. 样例走查

#### 样例 1
输入：
\`\`\`text
8 8
2 1
\`\`\`
1. **对称化**：\`n = 8, m = 8\`；由于 \`a = 2 > b = 1\`，交换后得到 \`a = 1, b = 2\`。
2. **二分查找**（初始区间 \`[0, 8]\`）：
   - **检验 \`mid = 5\`**：
     - 初始 \`x = 5 * 1 = 5\`，\`y = 5 * 2 = 10\`；
     - \`y = 10 > m(8)\`，作业券超出 \`10 - 8 = 2\`；
     - 每次调整可省下 \`b - a = 2 - 1 = 1\` 张作业券，所需调整次数 \`t = (2 + 1 - 1) / 1 = 2\`；
     - 调整后：\`y = 10 - 2 = 8 <= 8\`，\`x = 5 + 2 = 7 <= 8\`；
     - 均不超额，\`check(5)\` 为真，区间缩小为 \`[5, 8]\`。
   - **检验 \`mid = 7\`**：
     - 初始 \`x = 7 * 1 = 7\`，\`y = 7 * 2 = 14\`；
     - \`y = 14 > 8\`，超出 \`6\`，需调整 \`t = 6\` 次；
     - 调整后：\`y = 8 <= 8\`，但 \`x = 7 + 6 = 13 > 8\`，课堂券透支；
     - \`check(7)\` 为假，区间缩小为 \`[5, 6]\`。
   - **检验 \`mid = 6\`**：
     - 初始 \`x = 6\`，\`y = 12\`；
     - 超出 \`4\`，需调整 \`t = 4\` 次；
     - 调整后：\`y = 8 <= 8\`，但 \`x = 6 + 4 = 10 > 8\`，课堂券透支；
     - \`check(6)\` 为假，区间缩小为 \`[5, 5]\`。
3. **输出**：\`l = r = 5\`，最终答案输出 \`5\`。

---

**易错提醒：**
- **整型溢出**：在 \`check\` 中计算 \`v * a\` 和 \`v * b\` 时数值可能超过 \`int\` 最大值，需使用 \`long long\` 存储和运算。
- **向上取整计算**：计算最少调整次数时采用整数向上取整公式 \`(A + B - 1) / B\`，即 \`(y - m + (b - a) - 1) / (b - a)\`，避免由于整除向下取整导致调整不足。
- **二分边界**：当采用 \`l = mid\` 分支时，计算中点必须写成 \`mid = (l + r + 1) / 2\`，否则当区间只剩两个连续整数时会出现死循环。`,
      tags: ["编程题", "二分答案", "数学"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, m, a, b;\n    cin >> n >> m >> a >> b;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <cstdio>\n#include <algorithm>\nusing namespace std;\nint n, m, a, b;\nint l, r;\nint check(int v) {\n    long long x, y, t;\n    x = 1ll * v * a;\n    y = 1ll * v * b;\n    if (y > m) {\n        t = (y-m+(b-a)-1) / (b-a);\n        y -= t * (b-a);\n        x += t * (b-a);\n    }\n    return x <= n && y <= m;\n}\nint main() {\n    scanf(\"%d%d\", &n, &m);\n    scanf(\"%d%d\", &a, &b);\n    if (n > m) swap(n, m);\n    if (a > b) swap(a, b);\n    if (a == b) {\n        printf(\"%d\\n\", n / a);\n        return 0;\n    }\n    l = 0;\n    r = n;\n    while (l < r) {\n        int mid = (l+r+1) >> 1;\n        if (check(mid)) l = mid;\n        else r = mid-1;\n    }\n    printf(\"%d\\n\", r);\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5 3
6 9 12 18 30`, output: `1
1
3` },
        { input: `3 5
31 47 59`, output: `4
1
2
1
4` }
      ],
      question: `
# [GESP202506 五级] 最大公因数

## 题目描述

对于两个正整数 $a,b$，他们的最大公因数记为 $\\gcd(a,b)$。对于 $k > 3$ 个正整数 $c_1,c_2,\\dots,c_k$，他们的最大公因数为：

$\\gcd(c_1,c_2,\\dots,c_k)=\\gcd(\\gcd(c_1,c_2,\\dots,c_{k-1}),c_k)$

给定 $n$ 个正整数 $a_1,a_2,\\dots,a_n$ 以及 $q$ 组询问。对于第 $i(1 \\le i \\le q)$ 组询问，请求出 $a_1+i,a_2+i,\\dots,a_n+i$ 的最大公因数，也即 $\\gcd(a_1+i,a_2+i,\\dots,a_n+i)$。

## 输入格式

第一行，两个正整数 $n,q$，分别表示给定正整数的数量，以及询问组数。

第二行，$n$ 个正整数 $a_1,a_2,\\dots,a_n$。

## 输出格式

输出共 $q$ 行，第 $i$ 行包含一个正整数，表示 $a_1+i,a_2+i,\\dots,a_n+i$ 的最大公因数。
`,
      score: 25,
      explanation: `**解析：**

### 一、核心思路与数学原理
直接对每次询问暴力计算 \`n\` 个数的最大公因数，时间复杂度为 \`O(q * n \\log V)\`，在数据量较大时必然超时。我们需要利用最大公因数的更相减损性质对其化简：

1. **更相减损性质**：  
   对于任意两数 \`x, y\`，有 \`gcd(x, y) = gcd(x, y - x)\`。
2. **推广到多个数**：  
   \`gcd(x_1, x_2, x_3, ..., x_n) = gcd(x_1, x_2 - x_1, x_3 - x_2, ..., x_n - x_{n-1})\`。
3. **整体加常数的不变性**：  
   当序列中的每个数都加上偏移量 \`i\` 时，相邻两数的差值为：  
   \`(a[k] + i) - (a[k-1] + i) = a[k] - a[k-1]\`。  
   可以看到，**加上常数 \`i\` 之后，相邻元素的差值完全保持不变**！

因此，对于第 \`i\` 组询问，求 \`a_1+i, a_2+i, \\dots, a_n+i\` 的最大公因数，等价于求：  
\`gcd(a_1 + i, a_2 - a_1, a_3 - a_2, ..., a_n - a_{n-1})\`。

设所有相邻差值的最大公因数为：  
\`g = gcd(a_2 - a_1, a_3 - a_2, ..., a_n - a_{n-1})\`。  
由于 \`g\` 与询问的偏移量 \`i\` 完全无关，我们只需在最开始**预处理一次**求出 \`g\`。对于后续的每一次询问，答案就是直接计算 \`gcd(g, a_1 + i)\`。

---

### 二、完整算法流程
1. **读入数据**：读取正整数数量 \`n\`、询问组数 \`q\`，以及数组 \`a_1, a_2, \\dots, a_n\`。
2. **升序排序**：对数组 \`a\` 进行从小到大排序，确保相邻元素差值 \`a[k] - a[k-1]\` 均为非负数。
3. **预处理差值 gcd**：
   - 令初始 \`g = 0\`。
   - 遍历下标 \`k\` 从 \`2\` 到 \`n\`，依次更新 \`g = gcd(g, a[k] - a[k-1])\`。
4. **回答询问**：
   - 循环 \`i\` 从 \`1\` 到 \`q\`，每次直接计算并输出 \`gcd(g, a[1] + i)\`。

---

### 三、样例走查

#### 样例 1
**输入：**
\`\`\`text
5 3
6 9 12 18 30
\`\`\`
**走查过程：**
1. 排序后数组为：\`6, 9, 12, 18, 30\`。
2. 计算相邻差值：
   - \`a[2] - a[1] = 9 - 6 = 3\`
   - \`a[3] - a[2] = 12 - 9 = 3\`
   - \`a[4] - a[3] = 18 - 12 = 6\`
   - \`a[5] - a[4] = 30 - 18 = 12\`
3. 预处理相邻差值的最大公因数：
   - \`gcd(3, 3) = 3\`
   - \`gcd(3, 6) = 3\`
   - \`gcd(3, 12) = 3\`  
   得到 \`g = 3\`，首项 \`a_1 = 6\`。
4. 处理 \`3\` 组询问：
   - 询问 1（\`i=1\`）：计算 \`gcd(3, 6 + 1) = gcd(3, 7) = 1\`，输出 \`1\`。
   - 询问 2（\`i=2\`）：计算 \`gcd(3, 6 + 2) = gcd(3, 8) = 1\`，输出 \`1\`。
   - 询问 3（\`i=3\`）：计算 \`gcd(3, 6 + 3) = gcd(3, 9) = 3\`，输出 \`3\`。  
输出结果为 \`1, 1, 3\`，与样例输出完全吻合。

#### 样例 2
**输入：**
\`\`\`text
3 5
31 47 59
\`\`\`
**走查过程：**
1. 排序后数组为：\`31, 47, 59\`。
2. 差值分别为：\`47 - 31 = 16\`，\`59 - 47 = 12\`。
3. 差值最大公因数 \`g = gcd(16, 12) = 4\`，首项 \`a_1 = 31\`。
4. 依次处理 \`5\` 组询问：
   - \`i=1\`：\`gcd(4, 31 + 1) = gcd(4, 32) = 4\`
   - \`i=2\`：\`gcd(4, 31 + 2) = gcd(4, 33) = 1\`
   - \`i=3\`：\`gcd(4, 31 + 3) = gcd(4, 34) = 2\`
   - \`i=4\`：\`gcd(4, 31 + 4) = gcd(4, 35) = 1\`
   - \`i=5\`：\`gcd(4, 31 + 5) = gcd(4, 36) = 4\`  
输出结果依次为 \`4, 1, 2, 1, 4\`，同样与样例输出一致。

---

### 四、复杂度分析
- **时间复杂度**：
  - 排序数组耗时 \`O(n log n)\`。
  - 预处理 \`n-1\` 个差值的最大公因数耗时 \`O(n log V)\`。
  - 回答 \`q\` 次询问，每次单次求最大公因数，耗时 \`O(q log V)\`。
  - 总时间复杂度为 \`O(n log n + (n + q) log V)\`，能轻松在时限内通过。
- **空间复杂度**：
  - 仅需一个数组存储 \`n\` 个整数，空间复杂度为 \`O(n)\`。

---

### 五、易错提醒
1. **未排序直接求差**：若数组无序，相邻相减可能得到负数，影响后续欧几里得算法的取模运算。务必先升序排序，使差值均 \`>= 0\`。
2. **特殊边界 \`n = 1\`**：当数组只有一个元素时，不存在相邻差值，初始 \`g = 0\`。依据性质 \`gcd(0, x) = x\`，代码会正确输出 \`a[1] + i\`，不会发生除以零或死循环错误。`,
      tags: ["编程题", "数论", "最大公因数"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, q;\n    cin >> n >> q;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <cstdio>\n#include <algorithm>\nusing namespace std;\nconst int N = 1e5+5;\nint n, q, a[N], g;\nint gcd(int a, int b) {\n    if (a == 0 || b == 0) return a+b;\n    return gcd(b, a % b);\n}\nint main() {\n    scanf(\"%d%d\", &n, &q);\n    for (int i = 1; i <= n; i++) scanf(\"%d\", &a[i]);\n    sort(a+1, a+n+1);\n    for (int i = 2; i <= n; i++) g = gcd(g, a[i]-a[i-1]);\n    for (int i = 1; i <= q; i++) printf(\"%d\\n\", gcd(g, a[1]+i));\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2025-06-l5',
    title: '2025年6月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `与数组相比，链表在（ ）操作上通常具有更高的效率。`,
            options: [
                "随机访问元素",
                "查找指定元素",
                "在已知位置插入或删除节点",
                "遍历所有元素",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
链表的结点通过指针链接，插入/删除只需修改相邻结点的指针（已定位到位置时 O(1)）；而数组插入/删除要把后面的元素整体搬移（O(n)）。所以链表在**已知位置插入或删除节点**上效率更高。

- **A** 随机访问是数组的强项（下标直达 O(1)），链表要 O(n) 遍历；
- **B** 无序数据查找两者都只能逐个比较 O(n)；
- **D** 遍历所有元素两者都是 O(n)，没有优势。

**考点：** 链表、数组
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `下面 C++ 代码实现双向链表。函数 is_empty() 判断链表是否为空，如链表为空返回 true，否则返回 false。横线处不能填写的是（ ）。

\`\`\`cpp
// 节点结构体
struct Node {
    int data;
    Node* prev;
    Node* next;
};

// 双向链表结构体
struct DoubleLink {
    Node* head;
    Node* tail;
    int size;

    DoubleLink() {
        head = nullptr;
        tail = nullptr;
        size = 0;
    }

    ~DoubleLink() {
        Node* curr = head;
        while (curr) {
            Node* next = curr->next;
            delete curr;
            curr = next;
        }
    }

    // 判断链表是否为空
    bool is_empty() const {
        _______________________
    }
};
\`\`\``,
            options: [
                "return head == nullptr;",
                "return tail == nullptr;",
                "return head.data == 0;",
                "return size == 0;",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：不正确的是 C（\`head.data == 0\` 存在语法错误且不能作为判空条件）**

**核心解析：**
本题考查双向链表的结构特征、状态维护以及 C++ 中指针成员访问的语法规则。题干要求选出在判空函数 \`is_empty()\` 中**不能**填写的一项。

在双向链表结构体 \`DoubleLink\` 中，维护了三个关键成员变量：
- \`head\`：指向链表首节点的指针（类型为 \`Node*\`）；
- \`tail\`：指向链表末尾节点的指针（类型为 \`Node*\`）；
- \`size\`：记录链表中有效节点个数的整型变量（类型为 \`int\`）。

观察构造函数 \`DoubleLink()\` 可知，空链表初始化时执行了：
\`\`\`cpp
head = nullptr;
tail = nullptr;
size = 0;
\`\`\`
这意味着链表处于空状态时，同时满足三个等价条件：\`head == nullptr\`、\`tail == nullptr\` 以及 \`size == 0\`。只要链表操作维护正确，三者中任意一个都可以准确判断链表是否为空。

而选项 C 的 \`return head.data == 0;\` 存在两处严重错误：
1. **语法错误**：\`head\` 是指针变量（\`Node*\`），并不是结构体对象。在 C++ 中，通过指针访问结构体成员必须使用箭头运算符 \`->\`（即 \`head->data\`）或解引用后使用点号（即 \`(*head).data\`），直接写 \`head.data\` 会导致编译报错。
2. **逻辑与运行时错误**：即使语法写成 \`head->data == 0\`，当链表为空时，\`head\` 本身就是空指针（\`nullptr\`），解引用空指针访问其成员会导致程序发生段错误（Segmentation Fault）直接崩溃；即使链表非空，首节点存储的数据完全可能是整数 0，此时链表并不为空，该表达式却会误判为 \`true\`。因此该项绝不能用于判空。

**选项逐项分析：**
- **A \`return head == nullptr;\`**：❌ 可以填入。构造函数将头指针初始化为 \`head = nullptr\`。当且仅当链表为空时，头指针为 \`nullptr\`；一旦链表插入节点，\`head\` 必指向具体的有效节点（非空）。因此判断 \`head == nullptr\` 能准确反映链表是否为空，不符合题意。
- **B \`return tail == nullptr;\`**：❌ 可以填入。构造函数将尾指针初始化为 \`tail = nullptr\`。在双向链表的标准维护中，空链表没有尾节点，\`tail\` 为 \`nullptr\`；非空链表的 \`tail\` 必定指向末尾节点。因此判断 \`tail == nullptr\` 同样能正确判空，不符合题意。
- **C \`return head.data == 0;\`**：✅ 不能填入，符合题意。指针访问成员误用了点运算符，无法通过编译；且试图在可能为空的指针上读取数据会导致程序崩溃；同时，节点数据为 0 与“链表为空”没有任何逻辑等价关系。`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `基于上题代码正确的前提下，填入相应代码完善 append() ，用于在双向链表尾部增加新节点，横线上应填写（ ）。

\`\`\`cpp
void append(int data) {
    Node* newNode = new Node{data, nullptr, nullptr};

    if (is_empty()) {
        head = tail = newNode;
    } else {
        ______________________
    }
    ++size;
}
\`\`\``,
            options: [
                "tail->next = newNode;",
                "newNode->prev = tail; tail = newNode;",
                "tail = newNode; newNode->prev = tail; tail->next = newNode;",
                "tail->next = newNode; newNode->prev = tail; tail = newNode;",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
非空时把新结点接到尾部，三步缺一不可：
1. tail->next = newNode —— 原尾结点的 next 指向新结点；
2. newNode->prev = tail —— 新结点的 prev 回指原尾结点；
3. tail = newNode —— 更新尾指针。

- **A** 只挂接不更新 tail，tail 仍指向旧尾，链表尾部丢失；
- **B** 先执行 tail = newNode 再 newNode->prev = tail，prev 指向了自己；
- **C** 先 tail = newNode，再 tail->next = newNode 变成自环，旧尾也脱钩。

**易错点：** 指针语句的**顺序**很重要——先用旧值建立连接，最后再移动 tail。

**考点：** 双向链表、插入操作
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `下列 C++ 代码用循环链表解决约瑟夫问题。假设 n 个人围成一圈，从第一个人开始数，每次数到第 k 个人的人就出圈，输出最后留下的那个人的编号。横线上应填写的是（ ）。

\`\`\`cpp
struct Node {
    int data;
    Node* next;
};

Node* createCircularList(int n) {
    Node* head = new Node{1, nullptr};
    Node* prev = head;
    for (int i = 2; i <= n; ++i) {
        Node* node = new Node{i, nullptr};
        prev->next = node;
        prev = node;
    }
    prev->next = head;
    return head;
}

int fingLastSurvival(int n, int k) {
    Node* head = createCircularList(n);
    Node* p = head;
    Node* prev = nullptr;

    while (p->next != p) {
        for (int count = 1; count < k; ++count) {
            prev = p;
            p = p->next;
        }
        ______________________
    }

    cout << "最后留下的人编号是: " << p->data << endl;
    delete p;
    return 0;
}
\`\`\``,
            options: [
                "prev->next = p->next; delete p; p = prev->next;",
                "delete p; prev->next = p->next; p = prev->next;",
                "delete p; p = prev->next; prev->next = p->next;",
                "prev->next = p->next; p = prev->next; delete p;",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A（先改链表指针跳过当前结点，再释放内存，最后更新指针至下一位）**

**核心解析：**
在单向循环链表中模拟约瑟夫问题报数时，\`for\` 循环执行了 \`k - 1\` 次移动，此时指针 \`p\` 正好指向数到第 \`k\` 个需要出圈淘汰的人，而 \`prev\` 指向 \`p\` 的前驱结点。将结点 \`p\` 移出链表并回收内存，必须遵循严格的操作顺序：
1. **修改前驱指针，跳过出圈结点**：执行 \`prev->next = p->next;\`，让前驱结点直接指向 \`p\` 的下一个结点。这一步必须在 \`p\` 释放前进行，因为需要读取 \`p->next\` 的值。
2. **释放出圈结点的动态内存**：执行 \`delete p;\`，安全回收被淘汰结点占用的堆内存，防止内存泄漏。
3. **将游标推进到下一轮报数的起点**：执行 \`p = prev->next;\`，使 \`p\` 指向刚才被删结点的下一位，以便从这个人开始进行下一轮报数。

**选项逐项分析：**
- **A \`prev->next = p->next; delete p; p = prev->next;\`**：✅ 正确。顺序完全符合单链表结点的标准删除流程：先改前驱指针使结点脱链，再释放结点内存，最后将指针重置到下一个合法结点继续报数。
- **B \`delete p; prev->next = p->next; p = prev->next;\`**：❌ 错误。代码第一步就执行了 \`delete p;\`，此时 \`p\` 所指向的内存空间已被系统收回。随后再执行 \`p->next\` 属于使用已释放内存（悬空指针解引用 / Use-After-Free），在 C++ 中属于未定义行为，程序可能崩溃或产生不可预知的错误。
- **C \`delete p; p = prev->next; prev->next = p->next;\`**：❌ 错误。同样过早执行了 \`delete p;\`，且链表关系尚未修正；后续代码在链表结构未调整好时随意赋值，既有非法访问风险，又彻底破坏了循环链表的拓扑关系。
- **D \`prev->next = p->next; p = prev->next; delete p;\`**：❌ 错误。前两步先修改了前驱指针，随后立即让 \`p = prev->next;\`，此时 \`p\` 已经指向了下一轮要报数的无辜结点；紧接着执行 \`delete p;\`，释放销毁的反而是下一个结点，而原本应该出圈被删除的结点却留在内存中造成泄漏，逻辑完全颠倒。

**易错提醒：**
- 动态链表删除结点的核心原则是：**先用其值，再断其链，后释其存**。如果先释放了结点，就再也不能通过该指针访问其内部成员（如 \`p->next\`）。
- 在移动指针和释放内存时，务必分清当前指针代表的含义。更新 \`p\` 的时机必须在 \`delete\` 之后，避免误将新指向的目标结点当成待释放对象删除。`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `下列 C++ 代码判断一个正整数是否是质数，说法正确的是（ ）。

\`\`\`cpp
bool is_prime(int n) {
    if (n <= 1)
        return false;
    if (n == 2 || n == 3 || n == 5)
        return true;
    if (n % 2 == 0 || n % 3 == 0 || n % 5 == 0)
        return false;

    int i = 7;
    int step = 4;
    int finish_number = sqrt(n) + 1;

    while (i <= finish_number) {
        if (n % i == 0)
            return false;
        i += step;
        step = 6 - step;
    }
    return true;
}
\`\`\``,
            options: [
                "代码存在错误，比如 5 是质数，但因为5 % 5 余数是 0 返回了false",
                "finish_number 的值应该是n / 2 ，当前写法将导致错误",
                "当前while 循环正确的前提是：所有大于 3 的质数都符合6k±1 形式",
                "while 循环修改如下，其执行效果和执行时间相同。",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
代码用 6k±1 试除：大于 3 的质数一定落在 6k−1 或 6k+1 的位置（因为 6k、6k+2、6k+4 是偶数，6k+3 是 3 的倍数），step 在 4 和 2 之间交替（7→11→13→17…）恰好遍历所有 6k±1 候选——**C 正确**。

- **A 错**：5 已经在 n == 2 || n == 3 || n == 5 特判中返回 true，走不到循环；
- **B 错**：finish_number = sqrt(n) + 1 边界正确；改成 n/2 只是更慢，不「导致错误」；
- **D 错**：改成逐个试除 2..finish_number 效果相同，但试除了大量 6k/6k±2/6k+3 的无用候选，执行时间明显更长，并非「相同」。

**考点：** 质数判定、6k±1 优化
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `下列 C++ 代码用两种方式求解两个正整数的最大公约数，说法错误的是 ( ) 。

\`\`\`cpp
int gcd0(int big, int small) {
    if (big < small) {
        swap(big, small);
    }
    if (big % small == 0) {
        return small;
    }
    return gcd0(small, big % small);
}

int gcd1(int big, int small) {
    if (big < small) {
        swap(big, small);
    }
    for (int i = small; i >= 1; --i) {
        if (big % i == 0 && small % i == 0)
            return i;
    }
    return 1;
}
\`\`\``,
            options: [
                "gcd0() 函数的时间复杂度为 O(log n)",
                "gcd1() 函数的时间复杂度为 O(n)",
                "一般说来，gcd0() 的效率高于gcd1()",
                "gcd1() 中的代码for (int i = small; i >= 1; --i) 应该修改为for (int i = small; i > 1; --i)",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：不正确的是 D（gcd1 的循环条件无需修改）**

**核心解析：**
本题考查求解最大公约数（GCD）的两种经典算法（欧几里得算法与暴力试除法）的实现原理、时间复杂度与代码逻辑细节。
- \`gcd0()\` 使用的是**辗转相除法**（欧几里得算法），利用数学性质 \`gcd(a, b) = gcd(b, a % b)\` 递归求解。在每两轮取模中，操作数规模至少减半，因此时间复杂度为对数阶 \`O(log n)\`。
- \`gcd1()\` 使用的是**暴力试除法**，从较小数 \`small\` 开始向下逐一枚举可能的公因数。在最坏情况（如两数互质）下，循环需要逐个递减试除到 1，循环次数与数值大小成正比，时间复杂度为线性阶 \`O(n)\`。
- 原代码中 \`gcd1()\` 的循环条件为 \`i >= 1\`，当两数互质时可以在 \`i == 1\` 时直接返回正确结果，逻辑严谨自洽，完全没有必要修改为 \`i > 1\`。

**选项逐项分析：**
- **A. gcd0() 函数的时间复杂度为 O(log n)**：说法正确。辗转相除法每两次递归至少让较小的数减半，递归深度在对数级别，因此时间复杂度为 \`O(log n)\`。
- **B. gcd1() 函数的时间复杂度为 O(n)**：说法正确。该函数从 \`small\` 开始递减遍历到 1，最坏情况下需要判断每一个正整数是否为公约数，执行次数与输入的数值规模成正比，时间复杂度为 \`O(n)\`。
- **C. 一般说来，gcd0() 的效率高于 gcd1()**：说法正确。随着输入数值的增大，对数阶 \`O(log n)\` 的增长速度远慢于线性阶 \`O(n)\`。例如对于 \`10^9\` 规模的数值，\`gcd0()\` 仅需几十次模运算，而 \`gcd1()\` 最坏需循环上亿次，\`gcd0()\` 明显高效得多。
- **D. gcd1() 中的代码 for (int i = small; i >= 1; --i) 应该修改为 for (int i = small; i > 1; --i)**：说法错误。原循环写 \`i >= 1\` 完全正确且符合枚举语义，公因数最小为 1，循环自然枚举到 1 并返回是标准写法。虽然函数末尾有 \`return 1;\` 兜底，但原代码本身无任何错误，“应该修改”的说法不成立。

**易错提醒：**
- **不要被函数的兜底语句误导**：虽然 \`gcd1()\` 末尾写了 \`return 1;\`，即使改成 \`i > 1\` 也能由于跳出循环兜底返回 1，但这并不代表原代码“应该修改”。原代码让循环完整覆盖从 \`small\` 到 1 的所有可能公因数，结构清晰规范；若将无误的代码强行定义为“应该修改”，属于逻辑错误。
- **牢记常用算法的复杂度**：欧几里得算法是五级核心考点，求最大公约数时其时间复杂度为 \`O(log n)\`，切勿与试除法的 \`O(n)\` 混淆。

**知识延伸：**
在 C++17 标准库头文件 \`<numeric>\` 中，已经内置了可以直接计算最大公约数的函数 \`std::gcd(a, b)\`，其底层实现就是经过深度优化的欧几里得算法，在实际竞赛与开发中可以直接调用。`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `下面的代码用于判断整数是否是质数，错误的说法是（ ）。

\`\`\`cpp
bool is_prime(int n) {
    if (n <= 1) return false;

    int finish_number = static_cast<int>(sqrt(n)) + 1;
    for (int i = 2; i < finish_number; ++i) {
        if (n % i == 0)
            return false;
    }
    return true;
}
\`\`\``,
            options: [
                "埃氏筛算法相对于上面的代码效率更高",
                "线性筛算法相对于上面的代码效率更高",
                "上面的代码有很多重复计算，因为不是判断单个数是否为质数，故而导致筛选出连续数中质数的效率不高",
                "相对而言，埃氏筛算法比上面代码以及线性筛算法效率都高",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
代码是逐个试除的 O(√n) 判质数。批量判断连续整数时：
- **A 对**：埃氏筛 O(n log log n) 一次性筛出所有质数，比逐个试除快；
- **B 对**：线性筛 O(n)，每个合数只被最小质因数筛一次，比埃氏筛更快；
- **C 对**：逐个判断时每个数都要独立试除，大量重复计算，效率不如筛法；
- **D 错**：线性筛是三者中最优的，埃氏筛不可能「比线性筛效率高」。

**考点：** 质数、埃氏筛、线性筛
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `唯一分解定理描述了关于正整数的什么性质？`,
            options: [
                "任何正整数都可以表示为两个素数的和。",
                "任何大于 1 的合数都可以唯一分解为有限个质数的乘积。",
                "两个正整数的最大公约数总是等于它们的最小公倍数除以它们的乘积。",
                "所有素数都是奇数。",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
唯一分解定理（算术基本定理）：任何**大于 1 的合数**都可以**唯一**分解为有限个质数的乘积（不计顺序），如 12 = 2² × 3。

- **A** 是哥德巴赫猜想（「大于 2 的偶数 = 两素数之和」），至今未证明，且不是唯一分解定理的内容；
- **C** 公式写反了：正确关系是 gcd(a,b) × lcm(a,b) = a × b，「最小公倍数除以乘积」得到的是 1/gcd，不成立；
- **D** 错：2 是素数但不是奇数。

**考点：** 唯一分解定理
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `下面的 C++ 代码，用于求一系列数据中的最大值。有关其算法说法错误的是（ ）。

\`\`\`cpp
int find_max_recursive(const vector<int>& nums, int left, int right) {
    if (left == right)
        return nums[left];

    int mid = left + (right - left) / 2;
    int left_max = find_max_recursive(nums, left, mid);
    int right_max = find_max_recursive(nums, mid + 1, right);

    return max(left_max, right_max);
}

int find_max(const vector<int>& nums) {
    if (nums.empty()) {
        throw invalid_argument("输入数组不能为空");
    }
    return find_max_recursive(nums, 0, nums.size() - 1);
}
\`\`\``,
            options: [
                "该算法采用分治算法",
                "该算法是递归实现",
                "该算法采用贪心算法",
                "该算法不是递推算法",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：不正确的是 C（该算法采用贪心算法）**

**核心解析：**
题干中的代码展示了典型的**分治算法**（Divide and Conquer）与**递归实现**：
1. **分解（Divide）**：通过计算中点 \`mid = left + (right - left) / 2\`，将当前区间 \`[left, right]\` 拆分为左半部分 \`[left, mid]\` 和右半部分 \`[mid + 1, right]\` 两个规模更小的子问题。
2. **解决（Conquer）**：递归调用自身，分别求解左右子区间的最大值。当子区间只剩一个元素（即 \`left == right\`）时到达递归基，直接返回该元素值。
3. **合并（Combine）**：通过 \`max(left_max, right_max)\` 比较并合并左右两边的结果，最终得到整个区间的最大值。

贪心算法的核心特征是在每一步都依据贪心策略做出局部的最优选择，并且不再回退检验其他可能；而本算法完整遍历并处理了左右两半的所有元素，并把子问题的解合并，完全不包含贪心选择的策略，因此不是贪心算法。

**选项逐项分析：**
- **A 该算法采用分治算法**：说法正确。代码将求整体最大值的问题拆分为求左右子区间的最大值，最后取两者较大值完成合并，符合分治法「分而治之」的思想。
- **B 该算法是递归实现**：说法正确。函数 \`find_max_recursive\` 在运行中直接调用了自身，且有明确的递归出口（\`left == right\` 时返回），属于典型的递归函数。
- **C 该算法采用贪心算法**：说法错误，符合题意。贪心算法依赖「贪心选择性质」，即通过局部最优直接推导全局最优；本代码只是将区间二分并穷举比较，没有贪心选择过程，因此该说法错误。
- **D 该算法不是递推算法**：说法正确。递推通常是从已知的初始条件出发，按照确定的递推关系自底向上逐步计算后续状态（常见于循环迭代实现）；而本算法是自顶向下拆解子问题、通过函数调用栈回溯求解的递归过程，并非递推算法。

**易错提醒：**
- 本题为**反向单选**，题干要求找出「说法错误」的选项，答题时不要顺手选出描述正确的选项。
- 区分**分治**与**贪心**：分治是将大问题拆解成几个独立的同类子问题，各子问题均需独立求解并最终合并；贪心则是每一步只选当下看似最好的分支继续走，直接排除其余分支。
- 区分**递归**与**递推**：递归是程序结构上的实现方式（函数调用自身，包含递进与回归）；递推是一种算法思想与数学推导方式（由已知条件自底向上由前项推后项）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `下面的 C++ 代码，用于求一系列数据中的最大值。有关其算法说法错误的是（　）。`,
            options: [
                "本题 find_max() 函数采用的是迭代算法",
                "本题 find_max() 函数的时间复杂度为 $O(n)$",
                "和上一题的 find_max() 相比，因为没有递归，所以没有栈的创建和销毁开销",
                "本题 find_max() 函数和上一题的 find_max() 空间复杂度相同",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：不正确的是 D（本题与上一题的空间复杂度并不相同）**

**核心解析：**
本题考查迭代与递归算法的实现方式以及时间、空间复杂度的分析：
1. **本题的迭代实现**：代码采用单层 \`for\` 循环从头到尾依次扫描数组元素，逐步更新当前最大值。这种通过循环结构反复执行计算、不断推进变量状态来求解问题的算法称为**迭代算法**。由于只需遍历数组一次，时间复杂度为 \`O(n)\`；整个运行过程中除少数几个基础变量外，不需要额外的存储空间，辅助空间复杂度为 \`O(1)\`。
2. **上一题的分治递归实现**：上一题（第 9 题）采用二分分治思想，把区间不断一分为二，递归求解子区间的最大值。每次递归问题规模减半，递归树的最大深度为 \`log2 n\`。在计算机中，每次调用函数都会在系统调用栈（Call Stack）中分配栈帧，因此该递归算法需要消耗 \`O(log n)\` 的栈空间，辅助空间复杂度为 \`O(log n)\`。
3. **对比结论**：本题迭代算法的空间复杂度为 \`O(1)\`，上一题分治递归算法的空间复杂度为 \`O(log n)\`，两者并不相同。题干要求选出说法错误的一项，故选 D。

**选项逐项分析：**
- **A 本题 find_max() 函数采用的是迭代算法**：✅ 说法正确。算法直接使用循环从头到尾遍历数组找最大值，没有自身调用自身，是典型的迭代算法。
- **B 本题 find_max() 函数的时间复杂度为 \`O(n)\`**：✅ 说法正确。设数组元素个数为 \`n\`，函数从第 2 个元素扫描到第 \`n\` 个元素，循环共执行 \`n - 1\` 次比较与更新，基本操作次数与数据规模 \`n\` 呈线性关系，因此时间复杂度为 \`O(n)\`。
- **C 和上一题的 find_max() 相比，因为没有递归，所以没有栈的创建和销毁开销**：✅ 说法正确。每次发起函数调用时，系统都要在调用栈上开辟栈帧保存参数与返回地址，并在返回时销毁栈帧。上一题的递归版本会反复创建和销毁栈帧；而本题是纯循环结构，仅在进入和退出函数时有一次栈帧开销，循环内部完全没有额外的函数调用栈开销，执行常数更小。
- **D 本题 find_max() 函数和上一题的 find_max() 空间复杂度相同**：❌ 说法错误，符合题意。本题迭代算法只占用常数个辅助变量，空间复杂度为 \`O(1)\`；上一题分治递归算法受调用栈深度的影响，空间复杂度为 \`O(log n)\`，两者并不相同。

**易错提醒：**
- **忽视递归的隐式空间消耗**：计算算法的空间复杂度时，不仅要看显式申请的内存（如数组、\`vector\`），还必须将函数递归调用栈（Call Stack）占用的空间计算在内。递归调用的最大深度就是空间复杂度的关键决定因素。
- **迭代与递归的优缺点**：
  - 迭代法没有递归栈的额外开销，空间复杂度通常为 \`O(1)\`，不会发生栈溢出（Stack Overflow），执行效率更高。
  - 递归法在解决树形结构、分治等问题时逻辑清晰优雅，但存在调用栈空间消耗与函数跳转的时间开销。`,
            tags: [
                "复杂度",
                "迭代",
                "递归",
            ],
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5, 6],
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1749477555699744.pdf',
            sourceIntegrity: 'answer-key-conflict',
            integrityNote: '当前 CCF 下载版答案表标为 C，另一存档版标为 D；按题面代码分析，C 为真、D 为假，本站暂保留 D 并停止该题计分，等待官方澄清。',
            answerDispute: {
                currentOfficialKey: 2,
                archivedOfficialKey: 3,
                siteAnswer: 3,
                status: 'unresolved',
            },
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27'
        },
        {
            id: 11,
            type: "single",
            question: `下面的 C++ 代码用于在升序数组 lst 中查找目标值 target 最后一次出现的位置。相关说法，正确的是（ ）。

\`\`\`cpp
int binary_search_last_occurrence(const vector<int>& lst, int target) {
    if (lst.empty()) return -1;

    int low = 0, high = lst.size() - 1;

    while (low < high) {
        int mid = (low + high + 1) / 2;
        if (lst[mid] <= target) {
            low = mid;
        } else {
            high = mid - 1;
        }
    }

    if (lst[low] == target)
        return low;
    else
        return -1;
}
\`\`\``,
            options: [
                "当 lst 中存在重复的 target 时，该函数总能返回最后一个 target 的位置，即便 lst 全由相同元素组成",
                "当 target 小于 lst 中所有元素时，该函数会返回 0",
                "循环条件改为 while (low <= high) 程序执行效果相同，且能提高准确性",
                "将代码中 (low + high + 1) / 2 修改为 (low + high) / 2 效果相同",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
查找「最后一次出现位置」的二分变体：lst[mid] <= target 时 low = mid（向右收缩但保留 mid），mid 取 (low + high + 1) / 2 **向上取整**防止 low = mid 时死循环。

- **A 对**：即使数组全由相同元素组成，循环始终把 low 往右推（每次至少 +1），最终收敛到 low == high 即最后一个 target 的位置；
- **B 错**：target 小于所有元素时，high 不断左移直到 low == high = 0，lst[0] != target，返回 -1 而不是 0；
- **C 错**：改成 low <= high 后，low == high 时仍进入循环，low = mid 不再推进，死循环；
- **D 错**：改成 (low + high) / 2 后，当 low + 1 == high 时 mid = low，若 lst[mid] <= target 则 low = mid 原地踏步，死循环。

**易错点：** 向右收缩（low = mid）的二分必须上取整 mid，这是这类题最经典的坑。

**考点：** 二分查找、边界处理
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `有关下面C++代码的说法，错误的是（ ）。

\`\`\`cpp
double sqrt_binary(long long n, double epsilon = 1e-10) {
    if (n < 0) {
        throw invalid_argument("输入必须为非负整数");
    }

    if (n == 0 || n == 1) return n;

    // 阶段 1
    long long low = 1, high = n;
    long long k = 0;

    while (low <= high) {
        long long mid = (low + high) / 2;
        long long mid_sq = mid * mid;

        if (mid_sq == n) {
            return mid;
        } else if (mid_sq < n) {
            k = mid;
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    long long next_k = k + 1;
    if (next_k * next_k == n) {
        return next_k;
    }

    // 阶段 2
    double low_d = (double)k;
    double high_d = (double)(k + 1);
    double mid;

    while (high_d - low_d >= epsilon) {
        mid = (low_d + high_d) / 2;
        double mid_sq = mid * mid;

        if (mid_sq < n) {
            low_d = mid;
        } else {
            high_d = mid;
        }
    }

    double result = (low_d + high_d) / 2;
    long long check_int = (long long)(result + 0.5);
    if (check_int * check_int == n) {
        return check_int;
    }

    return result;
}
\`\`\``,
            options: [
                "“阶段 1”的目标是寻找正整数 n 可能的正完全平方根",
                "“阶段 2”的目标是如果正整数 n 没有正完全平方根，则在可能产生完全平方根附近寻找带小数点的平方根",
                "代码 check_int = (long long)(result + 0.5) 是检查因浮点误差是否为正完全平方根",
                "阶段2的二分法中 high_d - low_d >= epsilon 不能用于浮点数比较，会进入死循环",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：不正确的是 D（阶段2的浮点二分条件能正常退出，不会死循环）**

**核心解析：**
这段代码通过“两阶段二分法”求解正整数 \`n\` 的平方根：
1. **阶段 1（整数二分）：** 在整数区间 \`[1, n]\` 内二分查找。如果遇到 \`mid * mid == n\`，说明 \`n\` 是完全平方数，直接返回正整数平方根；若未找到，最终的 \`k\` 会记录满足 \`k * k < n\` 的最大整数，即平方根的整数部分。
2. **阶段 2（浮点二分）：** 真实平方根必然落在区间 \`[k, k + 1]\` 内。代码以该区间为起点进行浮点二分，每次将当前区间二等分，搜索区间长度每次严格缩减为原来的一半。
3. **循环终止机制：** 循环条件 \`high_d - low_d >= epsilon\` 用于控制逼近精度。因为每次迭代区间长度都会折半（变成原来的 \`1/2\`），区间长度会飞速衰减至小于给定的误差范围 \`epsilon\`（\`1e-10\`），此时循环正常结束，绝不会发生死循环。

**选项逐项分析：**
- **A “阶段 1”的目标是寻找正整数 n 可能的正完全平方根**：✅ 说法正确。阶段 1 在整数范围内查找，若存在 \`mid * mid == n\` 则直接返回该整数，其目标就是尝试寻找 \`n\` 是否存在整数完全平方根。
- **B “阶段 2”的目标是如果正整数 n 没有正完全平方根，则在可能产生完全平方根附近寻找带小数点的平方根**：✅ 说法正确。若阶段 1 确定 \`n\` 不是完全平方数，真实平方根一定落在 \`(k, k + 1)\` 之间，阶段 2 正是在此区间内通过浮点二分计算出带小数位的逼近值。
- **C 代码 check_int = (long long)(result + 0.5) 是检查因浮点误差是否为正完全平方根**：✅ 说法正确。计算机在浮点数二分运算中存在舍入误差，例如真实的根为整数 \`3\`，浮点运算结果可能表现为 \`2.9999999999\` 或 \`3.0000000001\`。加上 \`0.5\` 并转为整数是对结果进行“四舍五入”，再次检验 \`check_int * check_int == n\` 能有效防止因浮点精度损失而错失整数解。
- **D 阶段2的二分法中 high_d - low_d >= epsilon 不能用于浮点数比较，会进入死循环**：❌ 说法错误，符合题意。浮点数不能直接用 \`==\` 进行绝对相等判断，但区间差值比较 \`high_d - low_d >= epsilon\` 是浮点二分法的标准循环条件。由于区间长度单调递减并迅速小于 \`epsilon\`，循环必定能在有限步内退出。

**易错提醒：**
- 浮点数无法精准表示所有实数，在二分中不能写 \`mid * mid == n\` 作为循环判断条件，而应判断搜索区间宽度是否已小于可接受的误差精度（如 \`epsilon = 1e-10\`）。
- 浮点二分除了使用 \`high_d - low_d >= eps\` 作为循环条件外，另一种常见且安全的写法是固定循环迭代次数（例如直接循环 60~100 次），两者都能稳定终止并达到目标精度。`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `硬币找零问题中要求找给客户最少的硬币。coins 存储可用硬币面额，amount 为待找零金额。下面是其实现代码，相关说法正确的是（ ）。

\`\`\`cpp
const int MAX_COINS = 10;
int result[MAX_COINS] = {0};  // 假设最多10种面额

int find_coins(const vector<int>& coins, int amount) {
    sort(coins.begin(), coins.end(), greater<int>());

    int n = coins.size();

    for (int i = 0; i < n; ++i) {
        int coin = coins[i];
        int num = amount / coin;
        result[i] = num;
        amount -= num * coin;
        if (amount == 0) break;
    }

    cout << "找零方案如下：" << endl;
    for (int i = 0; i < n; ++i) {
        cout << sorted_coins[i] << "角需要" << result[i] << "枚" << endl;
    }

    return 0;
}
\`\`\``,
            options: [
                "上述代码采用贪心算法实现",
                "针对任意面额系统，上述代码总能找到最优解",
                "上述代码采用枚举算法",
                "上述代码采用分治算法",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
代码先把面额从大到小排序，然后对每种面额尽可能多地取（num = amount / coin），余款交给更小面额——每一步都拿当前能拿的最多，这是**贪心算法**（A 对），不是枚举/分治（C、D 错）。

**B 错**：「任意面额系统总能找到最优解」不成立。经典反例：面额 {1, 3, 4} 找 6 元，贪心拿 4+1+1 共 3 枚，最优是 3+3 共 2 枚。只有本题的特殊设定（有 1 角规格、金额为 1 角整数倍、规格都小于 10 角）才保证贪心结果正确；更严格说，能被更大面额组合出的系统贪心就会出错。

**易错点：** 贪心找零只在「面额系统特殊」时保证最优，通用最优解要用完全背包 DP。

**考点：** 贪心算法、硬币找零
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `关于下述 C++ 代码的快速排序算法，说法错误的是（ ）。

\`\`\`cpp
int randomPartition(std::vector<int>& arr, int low, int high) {
    int random = low + rand() % (high - low + 1);
    std::swap(arr[random], arr[high]);

    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            std::swap(arr[i], arr[j]);
        }
    }
    std::swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(std::vector<int>& arr, int low, int high) {
    if (low < high) {
        int pi = randomPartition(arr, low, high);

        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}
\`\`\``,
            options: [
                "在 randomPartition 函数中，变量 i 的作用是记录不大于基准值元素区间的右边界",
                "randomPartition 随机选择基准值，可以降低遇到最坏情况 $O(N^2)$ 的概率",
                "快速排序的平均时间复杂度是 $O(n log n)$",
                "快速排序是稳定排序算法",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：不正确的是 D（快速排序是不稳定排序）**

**核心解析：**
快速排序基于分治思想。题中代码展示的是经典的 Lomuto 划分方案的随机化实现：
1. \`randomPartition\` 函数随机挑选一个元素并与末尾 \`arr[high]\` 交换作为基准值（\`pivot\`）。
2. 在循环中，指针 \`j\` 从前向后扫描，指针 \`i\` 始终指向当前已识别出的「不大于基准值区间」的最右侧。每当发现 \`arr[j] <= pivot\`，就让 \`i\` 右移一位并交换 \`arr[i]\` 与 \`arr[j]\`。
3. 循环结束后，执行 \`std::swap(arr[i + 1], arr[high])\`，把基准值放到它最终的有序位置 \`i + 1\`。
4. **排序的稳定性**：若序列中数值相等的元素在排序后的相对顺序保持不变，则称该排序算法是稳定的。在快速排序的分区过程中，元素交换是跨越较长距离的「跳跃式交换」，很容易打乱数值相同元素的先后次序，因此快速排序是**不稳定排序**。本题要求找出说法错误的一项，故选 D。

**选项逐项分析：**
- **A 在 randomPartition 函数中，变量 i 的作用是记录不大于基准值元素区间的右边界**：✅ 说法正确。算法初始设 \`i = low - 1\`，每当扫描到小于等于 \`pivot\` 的元素时，\`i\` 递增 1 并将该元素交换到位置 \`i\`。因此区间 \`[low, i]\` 维护的始终是已发现的小于等于基准值的元素，\`i\` 正是该区间的右边界。
- **B randomPartition 随机选择基准值，可以降低遇到最坏情况 \`O(N^2)\` 的概率**：✅ 说法正确。若每次固定取端点作为基准，当遇到已有序或逆序的数组时，每次划分都会极其不均匀（一边为 0 个元素，另一边为 \`n - 1\` 个），导致递归深度达到 \`O(n)\`，时间复杂度退化为最坏的 \`O(n^2)\`。随机选取基准值可以有效打破这种极端的输入模式，极大降低触发最坏情况的概率。
- **C 快速排序的平均时间复杂度是 \`O(n log n)\`**：✅ 说法正确。在平均情况下，基准值能较为均衡地将序列二分，递归树的层数为 \`O(log n)\`，每一层各区间的划分总耗时为 \`O(n)\`，综合平均时间复杂度为 \`O(n log n)\`。
- **D 快速排序是稳定排序算法**：❌ 说法错误，符合题意。快速排序是不稳定排序。例如对序列 \`[3a, 3b, 1]\` 排序，以 1 为基准时，\`3a\` 会与 1 发生交换变成 \`[1, 3b, 3a]\`，原本位于前面的 \`3a\` 被移到了 \`3b\` 之后，相等元素的相对次序被破坏。

**易错提醒：**
- **稳定性判断技巧**：凡是存在跨越多个位置发生“远距离跳跃交换”的排序，往往都是不稳定的。例如快速排序、选择排序、堆排序、希尔排序均为不稳定排序；而冒泡排序、插入排序、归并排序在正常实现下属于稳定排序。
- **随机化未改变理论最坏复杂度**：随机化基准只是让出现最坏情况的概率变得微乎其微，但理论上的最坏时间复杂度依然是 \`O(n^2)\`。`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `小杨编写了一个如下的高精度除法函数，则在把下一位加入余数时，横线上应填写的代码为（ ）。

\`\`\`cpp
const int MAXN = 1005;  // 最大位数
struct BigInt {
    int d[MAXN];  // 存储数字，d[0]是个位，d[1]是十位，...
    int len;      // 数字长度

    BigInt() {
        memset(d, 0, sizeof(d));
        len = 0;
    }
};

// 比较两个高精度数的大小
int compare(BigInt a, BigInt b) {
    if(a.len != b.len) return a.len > b.len ? 1 : -1;
    for(int i = a.len - 1; i >= 0; i--) {
        if(a.d[i] != b.d[i]) return a.d[i] > b.d[i] ? 1 : -1;
    }
    return 0;
}

// 高精度减法
BigInt sub(BigInt a, BigInt b) {
    BigInt c;
    for(int i = 0; i < a.len; i++) {
        c.d[i] += a.d[i] - b.d[i];
        if(c.d[i] < 0) {
            c.d[i] += 10;
            c.d[i+1]--;
        }
    }
    c.len = a.len;
    while(c.len > 1 && c.d[c.len-1] == 0) c.len--;
    return c;
}

// 高精度除法 (a/b，返回商和余数)
pair<BigInt, BigInt> div(BigInt a, BigInt b) {
    BigInt q, r;  // q是商，r是余数

    if(compare(a, b) < 0) {  // 如果a<b，商为0，余数为a
        q.len = 1;
        q.d[0] = 0;
        r = a;
        return make_pair(q, r);
    }

    // 初始化余数r为a的前b.len位
    r.len = b.len;
    for(int i = a.len - 1; i >= a.len - b.len; i--) {
        r.d[i - (a.len - b.len)] = a.d[i];
    }

    // 逐位计算商
    for(int i = a.len - b.len; i >= 0; i--) {
        // 把下一位加入余数
        if(r.len > 1 || r.d[0] != 0) {
            for(int j = r.len; j > 0; j--)
                r.d[j] = r.d[j-1];
            ______________________________
        } else {
            r.d[0] = a.d[i];
            r.len = 1;
        }

        // 计算当前位的商
        while(compare(r, b) >= 0) {
            r = sub(r, b);
            q.d[i]++;
        }
    }

    // 确定商的长度
    q.len = a.len - b.len + 1;
    while(q.len > 1 && q.d[q.len-1] == 0) q.len--;

    // 处理余数前导零
    while(r.len > 1 && r.d[r.len-1] == 0) r.len--;

    return make_pair(q, r);
}
\`\`\``,
            options: [
                "r.d[0] = a.d[i]; r.len++;",
                "r.d[i] = a.d[i]; r.len++;",
                "r.d[i] = a.d[i]; r.len = 1;",
                "r.d[0] = a.d[i]; r.len = 1;",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
把 a 的下一位加入余数时分两种情况：
- **r 非零**（r.len > 1 || r.d[0] != 0）：先把 r 的所有数字整体右移一位腾出 d[0]，再把 a.d[i] 放进 d[0]，同时 r.len++（位数加一）——即选项 **A**；
- **r 为零**（else 分支）：直接 r.d[0] = a.d[i]; r.len = 1，题目代码已给出。

- **B** 用下标 i 写 r.d[i]：i 是 a 中的位置，r 的存储位置应从 d[0] 开始，两者含义不同；
- **C** 同样错在下标，且 r.len = 1 会丢掉 r 原有的高位数字；
- **D** r.len = 1 在 r 非零时直接抹掉高位数字——那是 else（r==0）分支才该做的事。

**考点：** 高精度除法、逐位处理
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `下面 C++ 代码是用欧几里得算法（辗转相除法）求两个正整数的最大公约数，a 大于 b 还是小于 b 都适用。\n\`\`\`cpp\nint gcd(int a, int b) {\n    while (b) {\n        int temp = b;\n        b = a % b;\n        a = temp;\n    }\n    return a;\n}\n\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
辗转相除法的核心是 \`gcd(a, b) = gcd(b, a % b)\`，循环直到 \`b\` 为 0，此时 \`a\` 即最大公约数。若调用时 \`a < b\`（如 \`gcd(12, 18)\`），第一轮迭代中 \`a % b = 12 % 18 = 12\`，效果相当于自动交换了两个数——下一轮变成 \`gcd(18, 12)\`。因此无论 \`a\`、\`b\` 谁大谁小，算法都能正确收敛到最大公约数。

**易错提醒：**
- \`while (b)\` 等价于 \`while (b != 0)\`，把"余数为 0"作为循环终止条件。
- 若写成递归形式 \`return b == 0 ? a : gcd(b, a % b);\`，结论相同：首轮会自动纠正大小顺序。

**考点：** 欧几里得算法的正确性、对参数大小顺序的鲁棒性。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `假设函数 gcd() 能正确求两个正整数的最大公约数，则下面的 lcm() 函数也能正确求出这两个数的最小公倍数。\n\`\`\`cpp\nint lcm(int a, int b) {\n    return a * b / gcd(a, b);\n}\n\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
两个正整数满足恒等式：

$$\\text{lcm}(a, b) \\times \\text{gcd}(a, b) = a \\times b$$

即"最小公倍数 × 最大公约数 = 两数之积"。因此 \`a * b / gcd(a, b)\` 恰好是 \`lcm(a, b)\`。例如 a=12, b=18：gcd=6，a*b=216，216/6=36，而 12 与 18 的最小公倍数正是 36。

**易错提醒：**
- 实际编码建议先除后乘：\`a / gcd(a, b) * b\`，避免 \`a * b\` 先乘导致溢出（本题按题意以公式正确性为准）。
- 该恒等式只对**两个**正整数成立；求多个数的最小公倍数需要两两迭代应用此公式。

**考点：** 最大公约数与最小公倍数的恒等关系。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `下面的C++代码用于输出每个数对应的质因数列表，输出形如： {5: [5], 6: [2, 3], 7: [7], 8: [2, 2, 2]} 。\n\`\`\`cpp\nint main() {\n    int n, m;\n    cin >> n >> m;\n    if (n > m) swap(n, m);\n\n    map<int, vector<int>> prime_factor;\n\n    for (int i = n; i <= m; ++i) {\n        int j = 2, k = i;\n        while (k != 1) {\n            if (k % j == 0) {\n                prime_factor[i] = prime_factor[i] + j;\n                k /= j;\n            } else {\n                ++j;\n            }\n        }\n    }\n\n    for (auto& p : prime_factor) {\n        cout << p.first << ": ";\n        for (int v : p.second)\n            cout << v << " ";\n        cout << endl;\n    }\n\n    return 0;\n}\n\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
标记质因数的语句写成了：

\`\`\`cpp
prime_factor[i] = prime_factor[i] + j;
\`\`\`

\`prime_factor[i]\` 的类型是 \`vector<int>\`，而 \`j\` 是 \`int\`。\`vector<int> + int\` 不是合法的 C++ 表达式（vector 没有与整数相加的运算符），这行代码**无法通过编译**，程序根本不会产生任何输出，更不可能输出形如 \`{5: [5], 6: [2, 3]}\` 的质因数列表。

正确写法应是把质因数"压入"vector：

\`\`\`cpp
prime_factor[i].push_back(j);
\`\`\`

**易错提醒：**
- \`map[key] = value\` 是整体赋值；想往 map 的 vector 值里追加元素应使用 \`push_back\`，二者不可混用。
- 遇到"输出格式对不对"的判断题，先检查代码能否通过编译、逻辑是否能得到所述结果。

**考点：** STL map/vector 的基本操作、质因数分解的试除实现。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `下面的C++代码实现归并排序。代码在执行时，将输出一次 HERE 字符串，因为 merge() 函数仅被调用一次。\n\`\`\`cpp\nvoid merge(std::vector<int>& arr, int left, int mid, int right) {\n    std::vector<int> temp(right - left + 1);\n    int i = left;\n    int j = mid + 1;\n    int k = 0;\n    while (i <= mid && j <= right) {\n        if (arr[i] <= arr[j]) {\n            temp[k++] = arr[i++];\n        } else {\n            temp[k++] = arr[j++];\n        }\n    }\n    while (i <= mid) {\n        temp[k++] = arr[i++];\n    }\n    while (j <= right) {\n        temp[k++] = arr[j++];\n    }\n    for (int p = 0; p < k; ++p) {\n        arr[left + p] = temp[p];\n    }\n}\n\nvoid mergeSort(std::vector<int>& arr, int left, int right) {\n    if (left >= right) {\n        return;\n    }\n    int mid = left + (right - left) / 2;\n    mergeSort(arr, left, mid);\n    mergeSort(arr, mid + 1, right);\n    std::cout << "HERE";\n    merge(arr, left, mid, right);\n}\n\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
\`std::cout << "HERE";\` 写在 \`mergeSort\` 的递归体中、紧跟每次 \`merge\` 调用。只要当前区间满足 \`left < right\`（递归未到达基准情形），就会输出一次 HERE 并调用一次 \`merge\`。以 8 个元素、调用 \`mergeSort(arr, 0, 7)\` 为例，递归树共有 7 次"有效区间划分"（区间长度 ≥ 2 的调用），HERE 会被输出 **7 次**，\`merge\` 也被调用 7 次——绝不是"仅被调用一次、输出一次"。

**易错提醒：**
- 递归函数体中的输出语句会随每次递归调用执行，次数等于递归树中进入"有效分支"的结点数。
- \`if (left >= right) return;\` 只拦截长度为 1 的区间，长度 ≥ 2 的每一层都会执行到 \`cout << "HERE"\`。

**考点：** 归并排序的递归结构、递归调用次数与输出语句执行次数的分析。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `归并排序的最好、最坏和平均时间复杂度均为 $O(n\\log n)$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
归并排序的递归结构与输入数据无关：无论数组是否有序，都会先把数组对半划分（共 $\\log n$ 层），再逐层完整合并（每层合计 $O(n)$）。即使输入已经完全有序，算法也不会提前终止或跳过任何合并步骤。

因此最好、最坏、平均三种情况下的时间复杂度都是 $O(n\\log n)$，归并排序是复杂度最"稳定"的 $O(n\\log n)$ 排序算法之一。

**易错提醒：**
- 快排与之不同：最坏（有序输入 + 端点基准）退化为 $O(n^2)$。
- "时间上不吃亏"的代价是空间：归并排序需要 $O(n)$ 的辅助数组，不是原地排序。

**考点：** 归并排序的时间复杂度、最好/最坏情况一致性。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `查字典这个小学生必备技能，可以把字典视为一个已排序的数组。假设小杨要查找一个音首字母为 g 的单词，他首先翻到字典约一半的页数，发现该页的首字母是 m，由于字母表中 g 位于 m 之前，所以排除字典后半部分，查找范围缩小到前半部分；不断重复上述步骤，直至找到首字母为 g 的页码。这种查字典的一系列操作可看作二分查找。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
查字典的过程完全符合二分查找的定义：

1. **有序性**：字典按字母顺序排列，等价于已排序数组；
2. **取中点**：每次翻到约一半的位置（mid）；
3. **比较并折半**：目标 g 在 m 之前，于是排除后半部分（right = mid - 1），搜索区间缩小一半；
4. **重复直到命中**：区间不断减半，直到找到目标页。

每次操作后查找范围变为原来的一半，$n$ 页的字典最多约 $\\log_2 n$ 次即可定位，这正是二分查找 $O(\\log n)$ 效率的直观体现。

**易错提醒：**
- 二分的前提是"有序"，字典、图书目录之所以能"翻中间"，正是因为它们按顺序编排。
- 现实中"约一半"不必精确居中，只要比较后能排除一半即可；算法实现中通常取严格中点以便分析。

**考点：** 二分查找的生活化类比、折半排除的思想。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `求解图中 A 点到 D 点最短路径，其中 A 到 B 之间的 12 可以理解为距离。求解这样的问题通常用 Dijkstra 算法，其思想是通过逐步选择当前距离起点最近的节点来求解非负权图（如距离不能为负值）单源最短路径的算法。从该算法的描述可以看出，Dijkstra 算法是贪心算法。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
Dijkstra 算法的每一步都在做"当前最优"的选择：从尚未确定最短路径的节点中，选出距离起点最近的一个，将其距离固定（不再更改），并用它松弛相邻节点的距离。这种"每一步选取局部最优、且选定后不回溯"的策略正是贪心算法的定义特征。

对于**非负权**图，已确定节点的最短距离不会再被后续路径改进，这保证了贪心选择在该问题上能得到全局最优解——Dijkstra 是"贪心策略 + 问题性质保证最优"的典型范例。

**易错提醒：**
- 贪心不总是正确的：若图中存在负权边，已固定的节点可能被后续更短路径推翻，Dijkstra 会失效，需改用 Bellman-Ford 等算法。
- "逐步选择当前距离起点最近的节点"与 Prim 最小生成树的"选最近的点"形似，但二者优化的目标不同（最短路径 vs 总边权和）。

**考点：** Dijkstra 算法的贪心本质、非负权前提。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `分治算法将原问题可以分解成规模更小的子问题，使得求解问题的难度降低。但由于分治算法需要将问题进行分解，并且需要将多个子问题的解合并为原问题的解，所以分治算法的效率通常比直接求解原问题的效率低。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
分治法虽增加了"分解"与"合并"的开销，但其威力在于把规模为 n 的问题化为若干规模为 n/2（或更小）的同类子问题，从而**大幅降低整体复杂度**。典型对比：

- 归并排序：直接求解（冒泡等简单排序）为 $O(n^2)$，分治后为 $O(n\\log n)$；
- 大整数乘法（Karatsuba）：直接做法 $O(n^2)$，分治后约 $O(n^{1.585})$；
- 二分查找：顺序查找 $O(n)$，分治后 $O(\\log n)$。

对大多数适用分治的经典问题，分治的效率**通常比直接求解更高**，而非更低。

**易错提醒：**
- "分解、合并有额外开销"属实，但这笔开销通常远小于"问题规模减半"带来的收益。
- 分治未必总是更快：当子问题大量重叠时（如朴素递归求斐波那契），重复计算反而使效率低下，此时应配合记忆化/动态规划。

**考点：** 分治算法的效率分析、与直接求解的复杂度对比。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `函数 puzzle 定义如下，则调用 puzzle(7) 程序会无限递归。\n\`\`\`cpp\nint puzzle(int n) {\n    if (n == 1) return 1;\n    if (n % 2 == 0) return puzzle(n / 2);\n    return puzzle(3 * n + 1);\n}\n\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
模拟 \`puzzle(7)\` 的执行轨迹（奇数取 3n+1，偶数折半）：

\`7 → 22 → 11 → 34 → 17 → 52 → 26 → 13 → 40 → 20 → 10 → 5 → 16 → 8 → 4 → 2 → 1\`

到达 1 时命中 \`if (n == 1) return 1;\` 递归终止并逐层返回。整条路径单调地经历"增大—收敛"过程并最终落到 1，**不会无限递归**。这正是著名的角谷猜想（3n+1 问题）：目前对所有已被验证的正整数，序列最终都会回到 1。

**易错提醒：**
- 判断"是否无限递归"要实际追踪参数的变化，看终止条件能否被触及，不能凭"有递归调用"就断定无限递归。
- 偶数折半会使数值严格变小，奇数 3n+1 会变大；两者交替出现的序列总体会收敛（对该数据范围已被验证）。

**考点：** 递归执行轨迹模拟、终止条件的判定（角谷猜想）。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `如下为线性筛法，用于高效生成素数表，其核心思想是每个合数只被它的最小质因数筛掉一次，时间复杂度为 $O(n)$。\n\`\`\`cpp\nvector<int> linearSieve(int n) {\n    vector<bool> is_prime(n + 1, true);\n    vector<int> primes;\n\n    for (int i = 2; i <= n; ++i) {\n        if (is_prime[i]) {\n            primes.push_back(i);\n        }\n\n        for (int j = 0; j < primes.size() && i * primes[j] <= n; ++j) {\n            is_prime[i * primes[j]] = false;\n            if (i % primes[j] == 0) {\n                break;\n            }\n        }\n    }\n    return primes;\n}\n\`\`\``,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
代码的关键在 \`if (i % primes[j] == 0) break;\`：当 \`primes[j]\` 是 \`i\` 的最小质因数时立即停止内层循环。这保证了合数 \`i * primes[j]\` 只会在 \`primes[j]\` 恰为其最小质因数的那一次被标记，后续更大的质数不会重复标记同一个合数。例如 12 只会以 \`4 × 3\` 的形式被筛掉一次，而不会既被 \`6 × 2\` 又被 \`4 × 3\` 各标记一次。

每个合数恰好被筛一次、每个素数被记录一次，内外层总循环次数与 n 成线性关系，时间复杂度为 $O(n)$，因此称"线性筛"（欧拉筛）。

**易错提醒：**
- 若删去 \`break\` 语句，就退化成每个合数被各个质因数重复标记的埃氏筛，复杂度变为 $O(n\\log\\log n)$。
- \`is_prime\` 与 \`primes\` 的分工：\`is_prime[i]\` 标记素数身份，\`primes\` 顺序存放已发现的素数，供内层筛合数使用。

**考点：** 线性筛的核心机制、复杂度分析、与埃氏筛的区别。`,
            options: [
                "正确",
                "错误",
            ],
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        ...programmingQuestions
    ]
};
