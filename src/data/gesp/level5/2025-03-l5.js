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
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 可随机访问任何一个元素**：正确答案。
            - **B 插入、删除操作不需要移动元素**：不是本题答案。
            - **C 无需事先估计存储空间大小**：不是本题答案。
            - **D 所需存储空间与存储元素个数成正比**：不是本题答案。

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
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A p->next->prev = p->next; p->prev->next =...**：正确答案。
            - **B p->prev->next = p->next; p->next->prev =...**：不是本题答案。
            - **C p->next->prev = p->prev; p->next->prev->...**：不是本题答案。
            - **D p->prev->next = p->next; p->prev->next->...**：不是本题答案。

            **考点：** 链表
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
            question: `假设双向链表包含头、尾两个哨兵结点（不存储实际内容），分别为 head 和 tail，链表中每个结点有 prev 和 next 两个指针域。下面代码用于初始化一个空链表，横线上应填的最佳代码是（ ）。`,
            options: [
                "list->head->prev = list->head; list->tail->prev = list->head;",
                "list->head->next = list->tail; list->tail->prev = list->head;",
                "list->head->next = list->tail; list->tail->next = list->head;",
                "list->head->next = list->tail; list->tail->next = nullptr;",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A list->head->prev = list->head; list->tai...**：不是本题答案。
            - **B list->head->next = list->tail; list->tai...**：正确答案。
            - **C list->head->next = list->tail; list->tai...**：不是本题答案。
            - **D list->head->next = list->tail; list->tai...**：不是本题答案。

            **考点：** 链表
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
            question: `用辗转相除法（欧几里得算法）求 gcd(84, 60) 时，第二步计算的是哪一对数（ ）。`,
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
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 84 和 60**：不是本题答案。
            - **B 60 和 24**：正确答案。
            - **C 24 和 12**：不是本题答案。
            - **D 12 和 0**：不是本题答案。

            **考点：** 数论
            `,
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
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 18 = 3 × 6**：不是本题答案。
            - **B 28 = 4 × 7**：不是本题答案。
            - **C 36 = 2 × 3 × 6**：不是本题答案。
            - **D 30 = 2 × 3 × 5**：正确答案。


            **考点：** 数论

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
            question: `下述代码实现素数表的线性筛法，筛选出所有小于等于 n 的素数，横线上应填的最佳代码是（ ）。`,
            options: [
                "j < primes.size()",
                "i * primes[j] <= n",
                "j < primes.size() && i * primes[j] <= n",
                "j <= n",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A j < primes.size()**：不是本题答案。
            - **B i * primes[j] <= n**：不是本题答案。
            - **C j < primes.size() && i * primes[j] <= n**：正确答案。
            - **D j <= n**：不是本题答案。

            **考点：** 筛法
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
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 系统分配的栈空间溢出**：正确答案。
            - **B 系统分配的堆空间溢出**：不是本题答案。
            - **C 系统分配的队列空间溢出**：不是本题答案。
            - **D 系统分配的链表空间溢出**：不是本题答案。对链表结构的理解有误，请重新分析节点的指针指向与边界情况。

            **考点：** 递归
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
            question: `对下面两个求阶乘的函数，说法错误的是（ ）。`,
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
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 两个函数的实现的功能相同。**：不是本题答案。
            - **B 两个函数的时间复杂度均为 $O(N)$。**：不是本题答案。复杂度分析有误，请重新估算最坏情况时间复杂度。
            - **C factorialA采用递归方式。**：不是本题答案。递归/递推的终止条件或状态传递有误，请检查递归出口和参数变化。
            - **D factorialB采用递归方式。**：正确答案。

            **考点：** 组合数学
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
            question: `下算法中，（ ）是不稳定的排序。`,
            options: [
                "选择排序",
                "插入排序",
                "归并排序",
                "冒泡排序",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 选择排序**：正确答案。
            - **B 插入排序**：不是本题答案。不同排序算法的稳定性或复杂度理解有误，请对照正确解析。
            - **C 归并排序**：不是本题答案。不同排序算法的稳定性或复杂度理解有误，请对照正确解析。
            - **D 冒泡排序**：不是本题答案。不同排序算法的稳定性或复杂度理解有误，请对照正确解析。

            **考点：** 排序算法
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
            question: `考虑以下 C++ 代码实现的快速排序算法，将数据从小到大排序，则 partition 中横线上应填的最佳代码是（ ）。`,
            options: [
                "if (arr[j] > pivot) { i++; swap(arr[i], arr[j]); }",
                "if (arr[j] < pivot) { i++; swap(arr[i], arr[j]); }",
                "if (arr[j] < pivot) { swap(arr[i], arr[j]); }",
                "if (arr[j] <= pivot) { i++; swap(arr[i], arr[j]); }",
],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A if (arr[j] > pivot) { i++; swap(arr[i], arr[j]); }**：不是本题答案。
            - **B if (arr[j] < pivot) { i++; swap(arr[i], arr[j]); }**：正确答案。
            - **C if (arr[j] < pivot) { swap(arr[i], arr[j]); }**：不是本题答案。
            - **D if (arr[j] <= pivot) { i++; swap(arr[i], arr[j]); }**：不是本题答案。

            **考点：** 快速排序
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
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 100**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **B 10**：不是本题答案。该数值与正确计算结果不符，请重新验算。
            - **C 7**：正确答案。
            - **D 5**：不是本题答案。该数值与正确计算结果不符，请重新验算。

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
            question: `下面代码实现了二分查找算法，在数组 arr 中查找目标元素 target 的位置，则横线上能填写的最佳代码是（ ）。`,
            options: [
                "int mid = left+(right-left) / 2;",
                "int mid = left;",
                "int mid = (left+right) / 2;",
                "int mid = right;",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A int mid = left+(right-left) / 2;**：正确答案。
            - **B int mid = left;**：不是本题答案。
            - **C int mid = (left+right) / 2;**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **D int mid = right;**：不是本题答案。

            **考点：** 二分查找
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
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 总是选择当前最优解**：正确答案。
            - **B 回溯尝试所有可能**：不是本题答案。
            - **C 分阶段解决子问题**：不是本题答案。
            - **D 总能找到最优解**：不是本题答案。


            **考点：** 贪心

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
                "if (low > high) return 0; int mid = (low+high) / 2; return max(findMax(arr, low, mid-1), findMax(arr, mid+1, high));",
                "if (low == high) return arr[low]; int mid = (low+high) / 2; return arr[mid];",
                "if (low >= high) return arr[low]; int mid = (low+high) / 2; int leftMax = findMax(arr, low, mid-1); int rightMax = findMax(arr, mid, high); return leftMax+rightMax;",
                "if (low == high) return arr[low]; int mid = low+(high-low) / 2; int leftMax = findMax(arr, low, mid); int rightMax = findMax(arr, mid+1, high); return (leftMax > rightMax) ? leftMax : rightMax;",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A if (low > high) return 0; int mid = (low...**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **B if (low == high) return arr[low]; int mi...**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **C if (low >= high) return arr[low]; int mi...**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **D if (low == high) return arr[low]; int mi...**：正确答案。

            **考点：** 分治
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
            question: `小杨编写了一个如下的高精度乘法函数，则处理进位时横线上应填写的代码为（ ）。`,
            options: [
                "int temp = c[k];",
                "int temp = c[k]+carry;",
                "int temp = c[k]-carry;",
                "int temp = c[k] * carry;",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A int temp = c[k];**：不是本题答案。
            - **B int temp = c[k]+carry;**：正确答案。
            - **C int temp = c[k]-carry;**：不是本题答案。
            - **D int temp = c[k] * carry;**：不是本题答案。

            **考点：** 高精度
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
            question: `快速排序算法的时间复杂度与输入是否有序无关，始终稳定`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 快速排序平均 O(n log n)，最坏 O(n²)（已有序且选端点为基准）。注意基准选取、partition 的双指针移动条件和边界。

            **考点：** 快速排序
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `要删除单链表中某个结点 p（非尾结点），但不知道头结点，可行的操作是将 p->next 的数据拷贝到 p，再跳过并删除 p->next。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `链表存储线性表时要求内存中可用存储单元地址是连续的。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 19,
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
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** gcd(a,b)=gcd(b, a%b)，辗转相除法；质因数分解用试除法到 sqrt(n)。注意 1 既不是质数也不是合数。

            **考点：** 数论
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `贪心算法通过每一步选择当前最优解，从而一定能获得全局最优解。`,
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

            **考点：** 贪心
        `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `递归函数必须具有终止条件，以防止无限递归。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 递归三要素：终止条件、递归调用、状态传递。注意递归深度限制，深层递归可能导致栈溢出；尾递归可被优化。

            **考点：** 递归
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `归并排序算法的时间复杂度与输入是否有序无关，始终稳定在 $O(n log n)$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 归并排序 O(n log n)，稳定，需要额外 O(n) 空间；核心是分解到最小再合并两个有序序列。

            **考点：** 归并排序
            `,
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
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 二分查找前提：序列有序。注意边界 while(left<=right) 还是 while(left<right)，mid 用 left+(right-left)/2 防溢出，以及更新左右边界时是否 ±1。

            **考点：** 二分查找
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `小杨有 100 元去超市买东西，每个商品有各自的价格，每种商品只能买 1 个。若目标是买到最多数量的商品，每次优先买价格最低的商品，这体现的是贪心思想。`,
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

            **考点：** 贪心
            `,
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
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 归并排序 O(n log n)，稳定，需要额外 O(n) 空间；核心是分解到最小再合并两个有序序列。

            **考点：** 归并排序
            `,
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        ...programmingQuestions
    ]
};
