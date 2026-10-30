// 2025年3月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3
1 3 5 6 8 10
2 4 6 7 9 11`, output: `36` },
        { input: `2
6 7 9 9
1 2 10 12`, output: `35` }
      ],
      question: `
# [GESP202503 五级] 平均分配

## 题目描述

小 A 有 $2n$ 件物品，小 B 和小 C 想从小 A 手上买走这些物品。对于第 $i$ 件物品，小 B 会以 $b_i$ 的价格购买，而小 C 会以 $c_i$ 的价格购买。为了平均分配这 $2n$ 件物品，小 A 决定小 B 和小 C 各自只能买走恰好 $n$ 件物品。你能帮小 A 求出他卖出这 $2n$ 件物品所能获得的最大收入吗？

## 输入格式

第一行，一个正整数 $n$。

第二行，$2n$ 个整数 $b_1,b_2,\\dots,b_{2n}$。

第三行，$2n$ 个整数 $c_1,c_2,\\dots,c_{2n}$。

## 输出格式

一行，一个整数，表示答案。
`,
      score: 25,
      explanation: `**解析：**
      先假设全部卖给小 B，得到基础收入 sum(b_i)。再计算每件物品若改卖给小 C 的增量 d_i = c_i-b_i。为了让小 C 恰好买走 n 件物品，只需选择增量最大的 n 件改卖给小 C。

      **考点：** 贪心、排序
      `,
      tags: ["编程题", "贪心", "排序"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\nconst int N = 2e5+5;\nint n;\nlong long b[N], c[N], d[N];\nlong long ans;\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= 2 * n; i++) scanf(\"%lld\", &b[i]);\n    for (int i = 1; i <= 2 * n; i++) scanf(\"%lld\", &c[i]);\n    for (int i = 1; i <= 2 * n; i++) {\n        ans += b[i];\n        d[i] = c[i]-b[i];\n    }\n    sort(d+1, d+2 * n+1);\n    for (int i = n+1; i <= 2 * n; i++) ans += d[i];\n    printf(\"%lld\\n\", ans);\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3
3 998244353
5 998244353
7 998244353`, output: `Yes
Yes
No` }
      ],
      question: `
# [GESP202503 五级] 原根判断

## 题目描述

小 A 知道，对于质数 $p$ 而言，$p$ 的原根 $g$ 是满足以下条件的正整数：

+ $1 le g < p$

## 输入格式

第一行，一个正整数 $T$，表示测试数据组数。

每组测试数据包含一行，两个正整数 $a,p$。

## 输出格式

对于每组测试数据，输出一行，如果 $a$ 是 $p$ 的原根则输出 \`Yes\`，否则输出 \`No\`。
`,
      score: 25,
      explanation: `**解析：**
      对质数 p，只需验证对于 p-1 的每个不同质因子 q，都有 a^((p-1)/q) mod p != 1。若全部成立，则 a 是 p 的原根。

      **考点：** 数论、快速幂、原根
      `,
      tags: ["编程题", "数论", "快速幂", "原根"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int T;\n    cin >> T;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <cstdio>\nusing namespace std;\nint a, p;\nint ans;\nint fpw(int b, int e) {\n    if (e == 0) return 1;\n    int r = fpw(b, e >> 1);\n    r = 1ll * r * r % p;\n    if (e & 1) r = 1ll * r * b % p;\n    return r;\n}\nvoid check(int e) {\n    if (fpw(a, e) == 1) ans = 0;\n}\nint main() {\n    int T;\n    scanf(\"%d\", &T);\n    while (T--) {\n        scanf(\"%d%d\", &a, &p);\n        ans = 1;\n        int phi = p-1, r = phi;\n        for (int i = 2; i * i <= phi; i++)\n            if (phi % i == 0) {\n                check(phi / i);\n                while (r % i == 0) r /= i;\n            }\n        if (r > 1) check(phi / r);\n        printf(ans ? \"Yes\\n\" : \"No\\n\");\n    }\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2025-03-l5',
    title: '2025年3月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `链表不具备的特点是 ( ) 。`,
            options: [
                "可随机访问任何一个元素",
                "插入、删除操作不需要移动元素",
                "无需事先估计存储空间大小",
                "所需存储空间与存储元素个数成正比",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
链表用指针把结点串起来，内存中不连续存放，访问第 i 个元素只能从头结点沿指针逐个走过去（O(n)），因此**不具备随机访问能力**。「可随机访问任何一个元素」是数组的特点。

其余三项都是链表的真实特点：
- **B**：插入/删除只需修改相邻结点的指针，无需像数组那样整体搬移元素；
- **C**：结点按需分配，不必像静态数组那样事先估计存储空间；
- **D**：每个结点恰好服务于一个元素，存储空间与元素个数成正比。

**易错点：** 「链表插入删除快」不等于「链表什么都快」，随机访问正是它的短板。

**考点：** 链表
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
            question: `双向链表中每个结点有两个指针域 prev 和 next，分别指向前驱和后继。设 p 指向链表中的一个结点，且其前驱和后继都非空。要删除结点 p，下述语句中错误的是（ ）。`,
            options: [
                "p->next->prev = p->next; p->prev->next = p->prev; delete p;",
                "p->prev->next = p->next; p->next->prev = p->prev; delete p;",
                "p->next->prev = p->prev; p->next->prev->next = p->next; delete p;",
                "p->prev->next = p->next; p->prev->next->prev = p->prev; delete p;",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
删除结点 p 的标准操作是：让**前驱的 next 绕过 p**、**后继的 prev 绕过 p**，再释放 p：先执行 p->prev->next = p->next，再执行 p->next->prev = p->prev，最后 delete p——这正是 B，正确。

- **A 错误：** 第一句把后继的 prev 指向了**后继自己**（应为 p->prev）；第二句把前驱的 next 指向了**前驱自己**（应为 p->next）。两条指针全部改错，链表断裂且形成自环，delete p 后无法再访问到 p 的前后结点。
- **C 正确：** 第一句让后继的 prev 指向前驱，此时 p->next->prev 就是 p->prev，第二句等价于 p->prev->next = p->next，绕行成功。
- **D 正确：** 第一句接好前驱，此时 p->prev->next 就是 p->next，第二句等价于 p->next->prev = p->prev，绕行成功。

**易错点：** C/D 用「改完一条立刻沿新指针访问」的链式写法，容易误判为错——要逐步代入跟踪指针值。

**考点：** 双向链表、指针操作
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `假设双向循环链表包含头尾哨兵结点（不存储实际内容），分别为 head 和 tail，链表中每个结点有两个指针域 prev 和 next，分别指向该结点的前驱及后继结点。下面代码实现了一个空的双向循环链表，横线上应填的最佳代码是（ ）。

\`\`\`cpp
// 链表结点
template <typename T>
struct ListNode {
    T data;
    ListNode* prev;
    ListNode* next;
    // 构造函数
    explicit ListNode(const T& val = T())
        : data(val), prev(nullptr), next(nullptr) {}
};

struct LinkedList {
    ListNode<T>* head;
    ListNode<T>* tail;
};

void InitLinkedList(LinkedList* list) {
    list->head = new ListNode<T>;
    list->tail = new ListNode<T>;
    ________________________________ // 在此处填入代码
};
\`\`\``,
            options: [
                "list->head->prev = list->head;\nlist->tail->prev = list->head;",
                "list->head->next = list->tail;\nlist->tail->prev = list->head;",
                "list->head->next = list->tail;\nlist->tail->next = list->head;",
                "list->head->next = list->tail;\nlist->tail->next = nullptr;",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            空的双向循环链表只有 head 和 tail 两个哨兵结点，初始化的核心是让两个哨兵**互相链接**：\`head->next = tail\`（head 的后继是 tail）、\`tail->prev = head\`（tail 的前驱是 head）。这两条指针建立后，任意后续插入的结点都能挂在这条骨架上。

            - **A**：错误。\`head->prev = list->head\` 让头哨兵的前驱指向自己，且没有设置 \`head->next\`，前向链接断裂，后续从 head 遍历无法到达任何结点。
            - **B**：正确。前向 \`head->next = tail\`、后向 \`tail->prev = head\` 两条关键指针都建立，是初始化空表的最佳代码。
            - **C**：错误。第二条写成了 \`tail->next = list->head\`——用 next 指针反向指回 head，而真正的后向链接 \`tail->prev\` 没有设置，prev 链是断的。
            - **D**：错误。\`tail->next = nullptr\` 把循环特性破坏了，且同样没有设置 \`tail->prev\`。

            **考点：** 双向链表初始化、哨兵结点的指针设置`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `用以下辗转相除法（欧几里得算法）求 gcd(84, 60) 的步骤中，第二步计算的数是（ ）。`,
            options: [
                "84 和 60",
                "60 和 24",
                "24 和 12",
                "12 和 0",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            辗转相除法：gcd(a, b) = gcd(b, a % b)，每一步用"除数"和"余数"作为下一轮的新数对，直到余数为 0，此时的除数就是最大公约数。

            - **第一步**：84 ÷ 60 = 1 余 24，得到数对 (60, 24)；
            - **第二步**：计算 60 和 24 这一对——60 ÷ 24 = 2 余 12，得到数对 (24, 12)；
            - **第三步**：24 ÷ 12 = 2 余 0，结束，gcd(84, 60) = 12。

            - **A (84 和 60)**：这是第一步计算的数对，不是第二步。
            - **B (60 和 24)**：正确。第一步算出余数 24 后，第二步计算的就是"上一轮的除数 60"和"余数 24"。
            - **C (24 和 12)**：这是第三步的数对。
            - **D (12 和 0)**：这是最后判断终止时的状态，gcd 已经求出。

            **考点：** 辗转相除法（欧几里得算法）的执行步骤`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `根据唯一分解定理，下面整数的唯一分解是正确的（ ）。`,
            options: [
                "18 = 3 × 6",
                "28 = 4 × 7",
                "36 = 2 × 3 × 6",
                "30 = 2 × 3 × 5",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
唯一分解定理：任何大于 1 的整数都能**唯一**分解成若干**质数**的乘积。逐项检查每个因子是否全为质数：
- **A** 18 = 3 × 6：6 = 2 × 3 不是质数，正确写法 18 = 2 × 3²；
- **B** 28 = 4 × 7：4 不是质数，正确写法 28 = 2² × 7；
- **C** 36 = 2 × 3 × 6：6 不是质数，正确写法 36 = 2² × 3²；
- **D** 30 = 2 × 3 × 5：三个因子全是质数 ✓。

**易错点：** 因子分解 ≠ 质因数分解——必须把每个合数因子继续拆下去，直到全部是质数为止。

**考点：** 质数、唯一分解定理
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
            question: `下述代码实现素数表的线性筛法，筛选出所有小于等于 n 的素数，横线上应填的最佳代码是（ ）。

\`\`\`cpp
vector<int> sieve_linear(int n) {
    vector<bool> is_prime(n + 1, true);
    vector<int> primes;
    if (n < 2) return primes;
    is_prime[0] = is_prime[1] = false;
    for (int i = 2; i <= n/2; i++) {
        if (is_prime[i])
            primes.push_back(i);
        for (int j = 0; ______________________________ ; j++) {   // 在此处填入代码
            is_prime[i * primes[j]] = false;
            if (i % primes[j] == 0)
                break;
        }
    }
    for (int i = n/2 + 1; i <= n; i++) {
        if (is_prime[i])
            primes.push_back(i);
    }
    return primes;
}
\`\`\``,
            options: [
                "j < primes.size()",
                "i * primes[j] <= n",
                "j < primes.size() && i * primes[j] <= n",
                "j <= n",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
线性筛的内层循环必须同时满足两个边界：
- **j < primes.size()**：j 是 primes 数组的下标，越界访问未定义；
- **i * primes[j] <= n**：要筛掉的合数 i * primes[j] 必须落在 [2, n] 内，否则 is_prime[i * primes[j]] 越界写。

两个条件缺一不可：只写 A 时 i * primes[j] 可能超过 n 导致越界；只写 B 时 j 可能越过 primes 末尾（break 只在 i % primes[j] == 0 时触发）。所以最佳代码是 **C：j < primes.size() && i * primes[j] <= n**。

**知识点：** 线性筛保证每个合数只被**最小质因数**筛一次——\`i % primes[j] == 0\` 时 break，正是为了保证这一点，总时间 O(n)。

**考点：** 筛法、线性筛
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `在程序运行过程中，如果递归调用的层数过多，会因为（ ）引发错误。`,
            options: [
                "系统分配的栈空间溢出",
                "系统分配的堆空间溢出",
                "系统分配的队列空间溢出",
                "系统分配的链表空间溢出",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
每次函数调用都会在**调用栈**上压入一个栈帧（返回地址、参数、局部变量），递归每深入一层就多占一份栈空间。系统给栈的配额通常只有几 MB，递归层数过多时栈空间被耗尽，触发**栈溢出**（stack overflow）。
- **B** 堆是 new/malloc 动态分配内存的区域，与函数调用深度无关；
- **C/D** 队列、链表是数据结构，系统并不为函数调用分配「队列空间/链表空间」。

**易错点：** 递归爆的是栈不是堆；反过来，new 出来的大数组耗尽的是堆。

**考点：** 递归、栈
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
            question: `对下面两个函数，说法错误的是（ ）。

\`\`\`cpp
int factorialA(int n) {
    if (n <= 1) return 1;
    return n * factorialA(n - 1);
}

int factorialB(int n) {
    if (n <= 1) return 1;
    int res = 1;
    for (int i = 2; i <= n; i++)
        res *= i;
    return res;
}
\`\`\``,
            options: [
                "两个函数的实现的功能相同。",
                "两个函数的时间复杂度均为 $O(N)$。",
                "factorialA采用递归方式。",
                "factorialB采用递归方式。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            两个函数都在计算 n!，但实现方式不同：factorialA 在函数体内调用自身（\`return n * factorialA(n - 1)\`），是**递归**实现；factorialB 用 for 循环累乘，是**迭代（循环）**实现。

            - **A**：说法正确。两者都返回 n!（factorialA 由递归定义相乘，factorialB 由循环累乘），功能相同。
            - **B**：说法正确。factorialA 递归 n-1 层、factorialB 循环 n-1 次，都是线性次数的乘法，时间复杂度均为 $O(N)$。
            - **C**：说法正确。factorialA 调用了自身，属于递归方式。
            - **D**：**说法错误**。factorialB 没有调用自身，用的是循环，不是递归——本题选"错误的"，故选 D。

            **考点：** 递归与迭代的区别、时间复杂度分析`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `下算法中，（ ）是不稳定的排序。`,
            options: [
                "选择排序",
                "插入排序",
                "归并排序",
                "冒泡排序",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
稳定性 = 相等元素的相对先后顺序在排序后是否保持。**选择排序不稳定**：每轮选出最小元素后与当前位置**远距离交换**，可能跨越相等元素打乱顺序。例：[5ₐ, 5ᵦ, 2] 第一轮 2 与 5ₐ 交换 → [2, 5ᵦ, 5ₐ]，两个 5 的相对顺序变了。
- **B 插入排序**：只把元素在已排序前缀中逐位后移比较，相等时不再前插，稳定；
- **C 归并排序**：合并时左右相等优先取左半边的，稳定；
- **D 冒泡排序**：只在相邻元素间交换，相等不交换，稳定。

**考点：** 排序稳定性
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `考虑以下 C++ 代码实现的快速排序算法，将数据从小到大排序，则 partition 中横线上应填的最佳代码是（ ）。
\`\`\`cpp
int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high]; // 基准值
    int i = low - 1;
    for (int j = low; j < high; j++) {
        ______________________________          // 在此处填入代码
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}
\`\`\``,
            options: [
                "if (arr[j] > pivot) { i++; swap(arr[i], arr[j]); }",
                "if (arr[j] < pivot) { i++; swap(arr[i], arr[j]); }",
                "if (arr[j] < pivot) { swap(arr[i], arr[j]); }",
                "if (arr[j] == pivot) { i++; swap(arr[i], arr[j]); }",
],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
partition 的目标：以 arr[high] 为基准 pivot，把**小于 pivot 的元素划到左边**。变量 i 维护「小于区」的右边界（初始 low-1），扫描中遇到比 pivot 小的元素就把小于区扩大一格并把这个元素换进去：\`if (arr[j] < pivot) { i++; swap(arr[i], arr[j]); }\` 即 **B**。循环结束后 swap(arr[i+1], arr[high]) 把 pivot 放到分界点。

- **A**：条件写成 \`> pivot\`，把大元素换到前面，划反了方向；
- **C**：交换时没有 \`i++\`，i 永不前进，小于区无法扩张，扫描结束后 i+1 位置错乱；
- **D**：条件写成 \`== pivot\`，小于 pivot 的元素永远不会被换到左边，划分结果错误。

**考点：** 快速排序、partition
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `若用二分法在 [1, 100] 内猜数，最多需要猜（ ）次。`,
            options: [
                "100",
                "10",
                "7",
                "5",
            ],
            answer: 2,
            score: 2,
            explanation: `
**答案：C**

**解析：**
二分猜测每次排除一半可能值，n 个值最多需要 ⌈log₂n⌉ 次。100 个数：2⁶ = 64 < 100 ≤ 2⁷ = 128，所以最多 **7** 次必能锁定。

**易错点：** 选 B（10 次）是把「100 ≈ 1024 = 2¹⁰」的直觉套了上来；log₂100 ≈ 6.64，向上取整是 7 而不是 10。

**考点：** 二分查找
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
            question: `下面代码实现了二分查找算法，在数组 arr 中查找目标元素 target 的位置，则横线上能填写的最佳代码是（ ）。

\`\`\`cpp
int binarySearch(int arr[], int left, int right, int target) {
    while (left <= right) {
        ______________________________          // 在此处填入代码
        if (arr[mid] == target)
            return mid;
        else if (arr[mid] < target)
            left = mid + 1;
        else
            right = mid - 1;
    }
    return -1;
}
\`\`\``,
            options: [
                "int mid = left+(right-left) / 2;",
                "int mid = left;",
                "int mid = (left+right) / 2;",
                "int mid = right;",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
\`int mid = left + (right - left) / 2;\` 与 \`(left + right) / 2\` 数学上等价，但**先减后加避免了 left + right 相加时的整型溢出**——当 left、right 都接近 INT_MAX 时，left + right 会溢出为负数导致程序出错，而 (right - left) 不会。题目问「最佳代码」，**A** 胜出。

- **B/D**：mid 恒为 left/right，区间每次只缩一格，退化成顺序查找 O(n)；
- **C**：逻辑正确但不防溢出，不是「最佳」。

**考点：** 二分查找、整型溢出
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `贪心算法的核心特征是（ ）。`,
            options: [
                "总是选择当前最优解",
                "回溯尝试所有可能",
                "分阶段解决子问题",
                "总能找到最优解",
            ],
            answer: 0,
            score: 2,
            explanation: `
**答案：A**

**解析：**
贪心算法的核心特征：把问题分成若干步，**每一步都选择当前看起来最优的解**（局部最优），不回头。
- **B** 是回溯法的特征（尝试所有可能并撤销）；
- **C**「分阶段解决子问题」更接近分治/动态规划；
- **D** 错误：贪心只有当问题具有贪心选择性质与最优子结构时才保证全局最优，一般情况下**不保证**（反例：0-1 背包按性价比贪心会错）。

**易错点：** 「贪心 = 一定找到最优解」是最常见的概念混淆。

**考点：** 贪心算法
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
            question: `函数 int findMax(int arr[], int low, int high) 计算数组从索引 low 到 high 范围内的最大元素，以下哪项正确实现了分治逻辑（ ）。`,
            options: [
                "if (low == high) return arr[low]; int mid = (low + high) / 2; return arr[mid];",
                "if (low >= high) return arr[low]; int mid = (low + high) / 2; int leftMax = findMax(arr, low, mid - 1); int rightMax = findMax(arr, mid, high); return leftMax + rightMax;",
                "if (low > high) return 0; int mid = low + (high - low) / 2; int leftMax = findMax(arr, low, mid); int rightMax = findMax(arr, mid + 1, high); return leftMax * rightMax;",
                "if (low == high) return arr[low]; int mid = low + (high - low) / 2; int leftMax = findMax(arr, low, mid); int rightMax = findMax(arr, mid + 1, high); return (leftMax > rightMax) ? leftMax : rightMax;",
            ],
            answer: 3,
            score: 2,
            explanation: `
**答案：D**

**解析：**
分治求最大值：基例（区间只剩一个元素直接返回）+ 把区间**不重不漏**地分成两半递归求解 + 合并（取 max）。
- **D 正确：** \`low == high\` 返回 arr[low]；\`mid = low + (high-low)/2\` 把 [low, mid] 与 [mid+1, high] 分成两半，两半合起来恰好是原区间；最后返回两者较大值。
- **A**：\`return arr[mid]\` 直接返回中点元素，**没有递归、没有比较**，算出来的是中位数位置的值不是最大值；
- **B**：把左右两半的**最大值相加**，求最大值变成了求和；
- **C**：基例写成 \`low > high\` 返回 0，且合并用**乘积**，语义完全错误。

**易错点：** 分治区间划分要么 [low, mid]/[mid+1, high]，要么 [low, mid-1]/[mid, high]，绝不能重复或遗漏 mid。

**考点：** 分治、递归
        `,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `小杨编写了一个如下的高精度乘法函数，则处理进位时横线上应填写的代码为（ ）。

\`\`\`cpp
vector<int> multiply(vector<int>& a, vector<int>& b) {
    int m = a.size(), n = b.size();
    vector<int> c(m + n, 0);
    // 逐位相乘，逆序存储
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            c[i + j] += a[i] * b[j];
        }
    }
    // 处理进位
    int carry = 0;
    for (int k = 0; k < c.size(); ++k) {
        ______________________________      // 在此处填入代码
        c[k] = temp % 10;
        carry = temp / 10;
    }
    while (c.size() > 1 && c.back() == 0)
        c.pop_back();
    return c;
}
\`\`\``,
            options: [
                "int temp = c[k];",
                "int temp = c[k]+carry;",
                "int temp = c[k]-carry;",
                "int temp = c[k] * carry;",
            ],
            answer: 1,
            score: 2,
            explanation: `
**答案：B**

**解析：**
高精度乘法分两步：先逐位相乘把 a[i]*b[j] 累加到 c[i+j]（此时 c[k] 存的是「未进位的和」），再统一处理进位。进位时每一位的总量 = **本位累加值 + 来自低位的进位**：
\`int temp = c[k] + carry;\` 然后本位留 \`temp % 10\`，向高位进 \`carry = temp / 10\`。

- **A**：丢掉了低位传来的进位 carry，结果偏小；
- **C**：进位只会使数值增大，减法毫无道理；
- **D**：进位是「除留余数」的配套量，与 c[k] 是相加关系不是相乘。

**易错点：** carry 必须在处理本位**之前**加进来，处理完再重新计算——顺序不能颠倒。

**考点：** 高精度乘法、进位处理
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
            question: `要删除单链表中某个结点 p（非尾结点），但不知道头结点，可行的操作是将 p->next 的数据拷贝到 p 的数据部分，将 p->next 设置为 p->next->next，然后删除 p->next。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
删除链表结点通常需要知道其前驱，但头结点未知时无法从头遍历找到 \`p\` 的前驱。利用 \`p\` 是非尾结点这一条件，可以"偷梁换柱"：

\`\`\`cpp
p->data = p->next->data;   // 把后继的数据拷贝到 p
Node* t = p->next;
p->next = t->next;         // 跳过原后继
delete t;                  // 删除原后继结点
\`\`\`

效果上等价于删除了"原来 p 位置的数据"，时间复杂度 $O(1)$。

**易错提醒：**
- 该方法对**尾结点**失效：尾结点没有后继可拷贝，仍需从头找前驱。
- 若结点还带有指针成员（如动态分配的资源），简单数据拷贝可能引发浅拷贝问题，需按题意处理。

**考点：** 单链表删除结点的技巧、无头结点时的处理方法。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `链表存储线性表时要求内存中可用存储单元地址是连续的。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
链表是通过每个结点中的指针域保存后继结点的地址来实现逻辑顺序的，各结点在内存中的物理位置可以任意分散，不需要连续的存储单元。这正是链表相对于顺序表（数组）的核心优势：插入、删除只需修改指针，无需移动元素，也不需要预先申请一大块连续空间。

需要连续存储单元的是**顺序存储结构**（如数组），而不是链式存储结构。

**易错提醒：**
- "逻辑上相邻" 与 "物理位置相邻" 是两回事：链表逻辑相邻，物理上通常不相邻。
- 顺序表支持随机访问（下标直达），链表只能沿指针顺序访问，这是两者访问方式的本质区别。

**考点：** 链表的存储结构特点、链式存储与顺序存储的对比。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `线性筛相对于埃拉托斯特尼筛法，每个合数只会被它的最小质因数筛去一次，因此效率更高。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
埃氏筛中，一个合数会被它的每个质因数各标记一次（如 12 会被 2 和 3 各筛一次），存在重复标记，复杂度 $O(n\\log\\log n)$。线性筛（欧拉筛）通过"每个合数只由其**最小质因数**与另一个数相乘得到"的枚举方式保证标记不重复：

\`\`\`cpp
for (int i = 2; i <= n; i++) {
    if (!isp[i]) primes.push_back(i);
    for (int p : primes) {
        if (1LL * i * p > n) break;
        isp[i * p] = true;
        if (i % p == 0) break;   // 保证 p 是 i*p 的最小质因数
    }
}
\`\`\`

每个合数恰好被筛一次，总复杂度 $O(n)$，效率更高。

**易错提醒：**
- \`if (i % p == 0) break;\` 是线性筛的灵魂：它保证更大的质数留到后续轮次再配对，避免重复。
- 线性筛还可额外记录最小质因数，常用于欧拉函数、积性函数的线性求解。

**考点：** 线性筛（欧拉筛）的原理与复杂度、与埃氏筛的对比。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `贪心算法通过每一步选择当前最优解，从而一定能获得全局最优解。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
贪心算法每一步只做局部最优选择，且一旦做出选择就不再回溯。这种策略**不保证**得到全局最优解——只有当问题具有贪心选择性质和最优子结构时（如部分背包问题、区间调度问题），贪心才能取得全局最优。对不满足这些性质的问题，贪心会得到次优解。经典反例：

- 0-1 背包问题：物品不可分割，按单位重量价值贪心可能得不到最优装载方案。
- 求最少硬币数（面值 1、5、11）：金额 15，贪心先取 11 再取 4 个 1，共 5 枚；最优解是 3 个 5，共 3 枚。

此时需要用动态规划、回溯等方法才能保证最优。

**易错提醒：**
- 贪心是"只顾眼前、不回头"；动态规划会综合考察所有子问题的解。
- 判断一道题能否用贪心，关键是验证贪心选择性质是否成立，不能想当然。

**考点：** 贪心算法的适用条件与局限性。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `递归函数必须具有一个终止条件，以防止无限递归。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
递归函数由两部分构成：**基准情形**（终止条件）与**递归情形**（把问题缩小后调用自身）。若缺少终止条件，或终止条件永远无法被满足（如参数没有向基准情形逼近），函数会不断展开新的栈帧、无法返回，最终触发栈溢出（stack overflow）导致程序崩溃，这就是无限递归。

\`\`\`cpp
int fact(int n) {
    if (n <= 1) return 1;   // 终止条件：不可省略
    return n * fact(n - 1); // 参数向终止方向收敛
}
\`\`\`

**易错提醒：**
- 有终止条件不代表安全：若递归调用不朝终止条件收敛（如 \`fact(n+1)\`），同样无限递归。
- 递归深度过深（即使有终止条件）也可能爆栈，此时应改写为迭代或增大栈空间。

**考点：** 递归的三要素、终止条件与无限递归的成因。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `快速排序算法的时间复杂度与输入是否有序无关，始终稳定为 $O(n\\log n)$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
快速排序的性能高度依赖基准（pivot）的选取与输入数据的分布。在已有序（或逆序）的数组上，若每次选取端点元素作为基准，partition 会极度不平衡，划分出的两个子区间长度为 0 和 n-1，递归深度达到 n 层，此时时间复杂度退化为 $O(n^2)$。只有在每次划分都大致均衡的理想情况下，复杂度才为 $O(n\\log n)$。

因此"与输入是否有序无关、始终稳定为 $O(n\\log n)$"的说法不成立。

**易错提醒：**
- 归并排序的时间复杂度才与输入无关，始终为 $O(n\\log n)$；快排不是。
- 随机选取基准、三数取中等策略可以避免快排在有序输入上退化，但这是工程优化，不改变其最坏复杂度 $O(n^2)$ 的事实。

**考点：** 快速排序的时间复杂度分析、最坏情况的产生条件。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `归并排序算法的时间复杂度与输入是否有序无关，始终稳定在 $O(n\\log n)$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
归并排序的执行结构是固定的"分 + 合"：

1. **分**：无论输入如何，都要递归地把数组对半划分，共 $\\log n$ 层；
2. **合**：每一层的合并都要完整扫描所有元素，每层总计 $O(n)$。

即使输入已经完全有序，归并排序仍会照常划分、照常合并，不会提前终止，也不会因数据分布获得加速。因此最好、最坏、平均情况都是 $O(n\\log n)$，复杂度非常稳定。

**易错提醒：**
- 与快排对比：快排最好 $O(n\\log n)$、最坏（有序输入+端点基准）$O(n^2)$，复杂度依赖输入；归并则与输入无关。
- "时间稳定"的代价是归并需要 $O(n)$ 的辅助数组，空间复杂度高于快排的原地划分。

**考点：** 归并排序的时间复杂度分析、最好/最坏情况一致性。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `二分查找适用于对无序数组和有序数组的查找。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
二分查找的正确性建立在数组的**有序性**之上：每次取中间元素与目标比较后，利用"一侧区间必然不含目标"这一单调性结论，把搜索范围缩小一半。若数组无序，比较中间元素后无法判断目标位于哪一侧，折半策略失效，查找结果不可靠。

因此二分查找只适用于**有序**（且支持随机访问的顺序存储）数组；对无序数组必须先排序（$O(n\\log n)$），或改用顺序查找。

**易错提醒：**
- "无序数组用二分之前先排序是否划算"要具体分析：只查一次不如直接顺序扫描（$O(n)$）。
- 二分查找还要求数据能随机访问，链表即使有序也不适合直接二分。

**考点：** 二分查找的适用前提。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `小杨有 100 元去超市买东西，每个商品有各自的价格，每种商品只能买 1 个。若目标是买到最多数量的商品，每次优先买价格最低的商品，这体现的是分治思想。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
"每次优先买价格最低的商品"是在每一步都做出当前看起来最优的选择（花最少的钱多买一件），且选择后不再回头调整——这是典型的**贪心算法**思想，而不是分治思想。

分治算法的特征是把原问题划分为若干**相互独立、结构与原问题相同**的子问题，递归求解后再合并结果（如归并排序、快速排序）。买东西问题既没有"分解成同类子问题"的步骤，也没有"合并子问题的解"的过程，与分治无关。

**易错提醒：**
- 贪心：一步步做局部最优选择，问题规模逐步缩小，但不分解成多个子问题。
- 分治：把问题拆成多个子问题分别求解，再合并（分→治→合）。
- 本策略"每次买最便宜的"确实能最大化购买数量（该问题具有贪心选择性质），所以策略本身有效，但它体现的是贪心而非分治。

**考点：** 贪心与分治两种算法思想的区分。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `归并排序算法体现了分治算法，每次将大的待排序数组分成大小大致相等的两个小数组，然后分别对两个 小数组进行排序，最后对排好序的两个小数组合并成有序数组。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
归并排序是分治算法的标准范例，完整呈现"分、治、合"三步：

1. **分**：把长度为 n 的数组从中间对半分成两个子数组；
2. **治**：递归地对两个子数组分别归并排序（子问题结构与原问题相同，规模减半）；
3. **合**：用双指针把两个已排好序的子数组合并为一个有序数组（$O(n)$）。

递归深度 $\\log n$，每层合并总计 $O(n)$，总时间 $O(n\\log n)$。

**易错提醒：**
- 归并的"合"是合并两个**有序**序列，因此双指针 $O(n)$ 即可完成；若子序列无序则无法这么做。
- 同为分治，快排的"治"在划分阶段（partition），归并的"治"在合并阶段，两者重心相反。

**考点：** 归并排序与分治思想的对应关系。`,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        ...programmingQuestions
    ]
};
