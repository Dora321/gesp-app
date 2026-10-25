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
      explanation: `**解析：**
      答案具有单调性：若能兑换 v 份，则一定也能兑换更少的份数。可以二分答案 v，再检查是否能把这 v 份分成两种兑换方式，使两类券都不超出持有数量。

      **考点：** 二分答案、数学
      `,
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
      将数组排序后，设所有相邻差值的 gcd 为 g，则 gcd(a_1+i,a_2+i,...,a_n+i) = gcd(g, a_1+i)。因此预处理一次差分 gcd 后，每次询问只需再求一次 gcd。

      **考点：** 数论、最大公因数
      `,
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
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 随机访问元素**：不是本题答案。
            - **B 查找指定元素**：不是本题答案。
            - **C 在已知位置插入或删除节点**：正确答案。
            - **D 遍历所有元素**：不是本题答案。

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
            question: `下面 C++ 代码实现双向链表。函数 is_empty() 判断链表是否为空，如链表为空返回 true，否则返回 false。横线处不能填写的是（ ）。`,
            options: [
                "return head == nullptr;",
                "return tail == nullptr;",
                "return head.data == 0;",
                "return size == 0;",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A return head == nullptr;**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **B return tail == nullptr;**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **C return head.data == 0;**：正确答案。
            - **D return size == 0;**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。

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
            question: `基于上题代码正确的前提下，填入相应代码完善 append() ，用于在双向链表尾部增加新节点，横线上应填 写（ ）。`,
            options: [
                "list->head->prev = list->head; list->tail->prev = list->head;",
                "list->head->next = list->tail; list->tail->prev = list->head;",
                "list->head->next = list->tail; list->tail->next = list->head;",
                "list->head->next = list->tail; list->tail->next = nullptr;",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A list->head->prev = list->head; list->tai...**：不是本题答案。
            - **B list->head->next = list->tail; list->tai...**：不是本题答案。
            - **C list->head->next = list->tail; list->tai...**：不是本题答案。
            - **D list->head->next = list->tail; list->tai...**：正确答案。

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
            question: `下列 C++ 代码用循环链表解决约瑟夫问题。假设 n 个人围成一圈，从第一个人开始数，每次数到第 k 个人的人就出圈，输出最后留下的那个人的编号。横线上应填写的是（ ）。`,
            options: [
                "tail->next = newNode; newNode->prev = tail; tail = newNode;",
                "tail->next = newNode; tail = newNode; newNode->prev = tail;",
                "tail = newNode; newNode->prev = tail; tail->next = newNode;",
                "newNode->prev = tail; tail = newNode; tail->next = newNode;",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A tail->next = newNode; newNode->prev = tail; tail = newNode;**：正确答案。
            - **B tail->next = newNode; tail = newNode; newNode->prev = tail;**：不是本题答案。
            - **C tail = newNode; newNode->prev = tail; tail->next = newNode;**：不是本题答案。
            - **D newNode->prev = tail; tail = newNode; tail->next = newNode;**：不是本题答案。

            **考点：** 链表
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
            question: `下列 C++ 代码判断一个正整数是否是质数，说法正确的是（ ）。`,
            options: [
                "代码存在错误，比如 5 是质数，但因为5 % 5 余数是 0 返回了false",
                "finish_number 的值应该是n / 2 ，当前写法将导致错误",
                "当前while 循环正确的前提是：所有大于 3 的质数都符合6k±1 形式",
                "while 循环修改如下，其执行效果和执行时间相同。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 代码存在错误，比如 5 是质数，但因为5 % 5 余数是 0 返回了false**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **B finish_number 的值应该是n / 2 ，当前写法将导致错误**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **C 当前while 循环正确的前提是：所有大于 3 的质数都符合6k±1 形式**：正确答案。
            - **D while 循环修改如下，其执行效果和执行时间相同。**：不是本题答案。

            **考点：** 筛法
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
            question: `下列 C++ 代码用两种方式求解两个正整数的最大公约数，说法错误的是 ( ) 。`,
            options: [
                "gcd0() 函数的时间复杂度较高，通常为 O(min(a,b)) 量级。",
                "gcd1()（欧几里得算法）通常比枚举因子的做法更高效。",
                "一般说来，gcd0() 的效率高于gcd1()",
                "gcd1() 中的代码for (int i = small; i >= 1; --i) 应该修改为for (int i = small; i > 1; --i)",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A gcd0() 函数的时间复杂度较高，通常为 O(min(a,b)) 量级。**：错误。数论计算有误，请重新验算质因数分解或 gcd 过程。
            - **B gcd1()（欧几里得算法）通常比枚举因子的做法更高效。**：错误。数论计算有误，请重新验算质因数分解或 gcd 过程。
            - **C 一般说来，gcd0() 的效率高于gcd1()**：错误。数论计算有误，请重新验算质因数分解或 gcd 过程。
            - **D gcd1() 中的代码for (int i = small; i >= 1; -...**：正确答案。

            **考点：** 数论
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
            question: `下面的代码用于判断整数是否是质数，错误的说法是（ ）。`,
            options: [
                "埃氏筛算法相对于上面的代码效率更高",
                "线性筛算法相对于上面的代码效率更高",
                "上面的代码有很多重复计算，因为不是判断单个数是否为质数，故而导致筛选出连续数中质数的效率不高",
                "相对而言，埃氏筛算法比上面代码以及线性筛算法效率都高",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 埃氏筛算法相对于上面的代码效率更高**：不是本题答案。
            - **B 线性筛算法相对于上面的代码效率更高**：不是本题答案。
            - **C 上面的代码有很多重复计算，因为不是判断单个数是否为质数，故而导致筛选出连续数中质...**：不是本题答案。
            - **D 相对而言，埃氏筛算法比上面代码以及线性筛算法效率都高**：正确答案。

            **考点：** 筛法
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
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 任何正整数都可以表示为两个素数的和。**：不是本题答案。筛法标记范围或起点有误，请逐步推演标记过程。
            - **B 任何大于 1 的合数都可以唯一分解为有限个质数的乘积。**：正确答案。
            - **C 两个正整数的最大公约数总是等于它们的最小公倍数除以它们的乘积。**：不是本题答案。数论计算有误，请重新验算质因数分解或 gcd 过程。
            - **D 所有素数都是奇数。**：不是本题答案。筛法标记范围或起点有误，请逐步推演标记过程。

            **考点：** 质数判定、数论
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
            question: `下面的 C++ 代码，用于求一系列数据中的最大值。有关其算法说法错误的是（ ）。`,
            options: [
                "该算法采用分治算法",
                "该算法是递归实现",
                "该算法采用贪心算法",
                "该算法不是递推算法",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 该算法采用分治算法**：不是本题答案。
            - **B 该算法是递归实现**：不是本题答案。递归/递推的终止条件或状态传递有误，请检查递归出口和参数变化。
            - **C 该算法采用贪心算法**：正确答案。
            - **D 该算法不是递推算法**：不是本题答案。递归/递推的终止条件或状态传递有误，请检查递归出口和参数变化。

            **考点：** STL容器、异常处理
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
            question: `下面的 C++ 代码，用于求一系列数据中的最大值。有关其算法说法错误的是（　）。`,
            options: [
                "本题 find_max() 函数采用的是迭代算法",
                "本题 find_max() 函数的时间复杂度为 $O(n)$",
                "和上一题的 find_max() 相比，因为没有递归，所以没有栈的创建和销毁开销",
                "本题 find_max() 函数和上一题的 find_max() 空间复杂度相同",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（两者空间复杂度相同）**

本题代码用 \`for\` 循环逐个检查数组元素，是迭代算法。数组中的 n 个元素都要检查一次，所以时间复杂度为 $O(n)$；除 \`max_value\` 和循环变量外没有随 n 增长的额外存储，辅助空间复杂度为 $O(1)$。

上一题的递归版本会建立递归调用栈，辅助空间复杂度为 $O(\log n)$。因此：
- A 正确：当前版本是迭代算法。
- B 正确：遍历一次数组，时间复杂度为 $O(n)$。
- C 正确：没有递归调用栈的创建与销毁。
- D 错误：当前版本为 $O(1)$，上一题为 $O(\log n)$，二者并不相同。

**考点**：迭代与递归、时间复杂度、辅助空间复杂度。`,
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
            question: `下面的 C++ 代码用于在升序数组 lst 中查找目标值 target 最后一次出现的位置。相关说法，正确的是（ ）。`,
            options: [
                "当 lst 中存在重复的 target 时，该函数总能返回最后一个 target 的位置，即便 lst 全由相同元素组成",
                "当 target 小于 lst 中所有元素时，该函数会返回 0",
                "循环条件改为 while (low <= high) 程序执行效果相同，且能提高准确性",
                "若 target 不存在，该函数返回 -1。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 当 lst 中存在重复的 target 时，该函数总能返回最后一个 target...**：正确答案。
            - **B 当 target 小于 lst 中所有元素时，该函数会返回 0**：不是本题答案。
            - **C 循环条件改为 while (low <= high) 程序执行效果相同，且能提高...**：不是本题答案。
            - **D 若 target 不存在，该函数返回 -1。**：不是本题答案。

            **考点：** 数组
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
            question: `有关下面使用二分法求平方根的 C++ 代码的说法，错误的是（ ）。`,
            options: [
                "“阶段 1”的目标是先判断正整数 n 是否有整数平方根",
                "“阶段 2”的目标是当 n 不是完全平方数时，在相邻整数平方根之间继续二分逼近",
                "代码 check_int = (long long)(result+0.5) 用于消除浮点误差，检查结果是否恰好是整数平方根",
                "阶段 2 中用 high_d-low_d >= epsilon 作为停止条件完全不能用于浮点数比较，否则一定会死循环",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A “阶段 1”的目标是先判断正整数 n 是否有整数平方根**：不是本题答案。
            - **B “阶段 2”的目标是当 n 不是完全平方数时，在相邻整数平方根之间继续二分逼近**：不是本题答案。二分查找的边界或 mid 更新有误，请验证循环条件和指针移动。
            - **C 代码 check_int = (long long)(result+0.5) 用...**：不是本题答案。
            - **D 阶段 2 中用 high_d-low_d >= epsilon 作为停止条件完全...**：正确答案。

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
            question: `硬币找零问题中要求找给客户最少的硬币。coins 存储可用硬币面额，amount 为待找零金额。下面是其实现代码，相关说法正确的是（ ）。`,
            options: [
                "上述代码采用贪心算法实现",
                "针对任意面额系统，上述代码总能找到最优解",
                "上述代码采用枚举算法",
                "上述代码采用分治算法",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 上述代码采用贪心算法实现**：正确答案。
            - **B 针对任意面额系统，上述代码总能找到最优解**：不是本题答案。
            - **C 上述代码采用枚举算法**：不是本题答案。
            - **D 上述代码采用分治算法**：不是本题答案。

            **考点：** STL容器
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
            question: `关于下述 C++ 代码的快速排序算法，说法错误的是（ ）。`,
            options: [
                "在 randomPartition 函数中，变量 i 的作用是记录不大于基准值元素区间的右边界",
                "randomPartition 随机选择基准值，可以降低遇到最坏情况 $O(N^2)$ 的概率",
                "快速排序的平均时间复杂度是 $O(n log n)$",
                "快速排序是稳定排序算法",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 在 randomPartition 函数中，变量 i 的作用是记录不大于基准值元...**：不是本题答案。
            - **B randomPartition 随机选择基准值，可以降低遇到最坏情况 $O(N^...**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **C 快速排序的平均时间复杂度是 $O(n log n)$**：不是本题答案。不同排序算法的稳定性或复杂度理解有误，请对照正确解析。
            - **D 快速排序是稳定排序算法**：正确答案。

            **考点：** 快速排序
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
            question: `小杨编写了一个如下的高精度除法函数，则在把下一位加入余数时，横线上应填写的代码为（ ）。`,
            options: [
                "r.d[0] = a.d[i]; r.len++;",
                "r.d[i] = a.d[i]; r.len++;",
                "r.d[i] = a.d[i]; r.len = 1;",
                "r.d[0] = a.d[i]; r.len = 1;",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A r.d[0] = a.d[i]; r.len++;**：正确答案。
            - **B r.d[i] = a.d[i]; r.len++;**：不是本题答案。该代码逻辑与题目要求不符，请逐步推演。
            - **C r.d[i] = a.d[i]; r.len = 1;**：不是本题答案。
            - **D r.d[0] = a.d[i]; r.len = 1;**：不是本题答案。

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
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 归并排序 O(n log n)，稳定，需要额外 O(n) 空间；核心是分解到最小再合并两个有序序列。

            **考点：** 数论
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
