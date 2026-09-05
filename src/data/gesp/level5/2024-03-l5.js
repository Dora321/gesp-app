// 2024年3月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `6
140 140 150
140 149 140
148 141 140
141 148 140
145 145 139
0 0 0`, output: `1
3
4
4
2
6` }
      ],
      question: `
# [GESP202403 五级] 成绩排序

## 题目描述

有 $n$ 名同学，每名同学有语文、数学、英语三科成绩，你需要按照如下规则对所有同学的成绩从高到低排序：

1. 比较总分，高者靠前；
2. 如果总分相同，则比较语文和数学两科的总分，高者靠前；
3. 如果仍相同，则比较语文和数学两科的最高分，高者靠前；
4. 如果仍相同，则二人并列。

你需要输出每位同学的排名，如遇 $x$ 人并列，则他们排名相同，并留空后面的 $x - 1$ 个名次。例如，有 $3$ 名同学并列第 $1$，则后一名同学自动成为第 $4$ 名。

## 输入格式

第一行一个整数 $N$，表示同学的人数。 
接下来 $N$ 行，每行三个非负整数 $c_i, m_i, e_i$ 分别表示该名同学的语文、数学、英语成绩。

## 输出格式

输出 $N$ 行，按输入同学的顺序，输出他们的排名。 
**注意：请不要按排名输出同学的序号，而是按同学的顺序输出他们各自的排名。**
`,
      score: 25,
      explanation: `**解析：**
      由于要求分解出的正整数个数最多，这显然是质因数分解。将 N 分解为所有质因子的乘积即可满足个数最多且正整数最小的要求。

      **考点：** 数论、质因数分解
      `,
      tags: ["编程题", "数论", "质因数分解"],
      template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long N;\n    cin >> N;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Student { long long total, cm, mx; int idx; };\n\nbool better(const Student &a, const Student &b) {\n    if (a.total != b.total) return a.total > b.total;\n    if (a.cm != b.cm) return a.cm > b.cm;\n    return a.mx > b.mx;\n}\n\nbool equalRank(const Student &a, const Student &b) {\n    return a.total == b.total && a.cm == b.cm && a.mx == b.mx;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Student> s(n);\n    for (int i = 0; i < n; i++) {\n        long long c, m, e;\n        cin >> c >> m >> e;\n        s[i] = { c + m + e, c + m, max(c, m), i };\n    }\n    vector<Student> sorted = s;\n    sort(sorted.begin(), sorted.end(), [](const Student &a, const Student &b) {\n        return better(a, b);\n    });\n    vector<int> rank(n);\n    for (int i = 0; i < n; i++) {\n        if (i > 0 && equalRank(sorted[i], sorted[i - 1])) {\n            rank[sorted[i].idx] = rank[sorted[i - 1].idx];\n        } else {\n            rank[sorted[i].idx] = i + 1;\n        }\n    }\n    for (int i = 0; i < n; i++) cout << rank[i] << \"\\n\";\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `10 3`, output: `7` }
      ],
      question: `
# [GESP202403 五级] B-smooth 数

## 题目描述

小杨同学想寻找一种名为 $ B $-smooth 数的正整数。 

如果一个正整数的最大质因子不超过 $ B $，则该正整数为 $ B $-smooth 数。小杨同学想知道，对于给定的 $ n $ 和 $ B $，有多少个不超过 $ n $ 的 $ B $-smooth 数。

## 输入格式

第一行包含两个正整数 $ n $ 和 $ B $，含义如题面所示。

## 输出格式

输出一个非负整数，表示不超过 $ n $ 的 $ B $-smooth 数的数量。
`,
      score: 25,
      explanation: `**解析：**
      将所有牌的点数转换成数字（A为1和14），去重后排序。检查是否存在连续的 5 个数字。

      **考点：** 搜索、模拟
      `,
      tags: ["编程题", "搜索", "模拟"],
      template: "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    long long n, b;\n    cin >> n >> b;\n    // 埃氏筛思想：largest[x] 记录 x 的最大质因子\n    vector<int> largest(n + 1, 0);\n    for (long long p = 2; p <= n; p++) {\n        if (largest[p] == 0) {\n            for (long long x = p; x <= n; x += p) largest[x] = p;\n        }\n    }\n    long long count = 0;\n    for (long long x = 1; x <= n; x++) {\n        if (largest[x] <= b) count++;\n    }\n    cout << count << endl;\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2024-03-l5',
    title: '2024年3月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 3,
    session: 1,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `唯一分解定理描述的内容是（ ）？`,
            options: [
                "任意整数都可以分解为素数的乘积",
                "每个大于1的整数都可以唯一分解为素数的乘积",
                "每个大于1的整数都可以唯一分解为素数的乘积，不计顺序",
                "每一个合数都可以分解为素数的乘积"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            唯一分解定理（算术基本定理）：任何大于1的整数，要么本身是质数，要么可以写为一系列质数的乘积，且在不计顺序的情况下，这种分解方式是唯一的。

            - **A 任意整数都可以分解为素数的乘积**：错误。筛法标记范围或起点有误，请逐步推演标记过程。
            - **B 每个大于1的整数都可以唯一分解为素数的乘积**：正确答案。
            - **C 每个大于1的整数都可以唯一分解为素数的乘积，不计顺序**：错误。筛法标记范围或起点有误，请逐步推演标记过程。
            - **D 每一个合数都可以分解为素数的乘积**：错误。筛法标记范围或起点有误，请逐步推演标记过程。

            **考点：** 筛法
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 2,
            type: "single",
            question: `贪心算法的核心思想是（ ）。`,
            options: [
                "在每一步选择中都采取局部最优策略",
                "在每一步选择中都采取全局最优策略",
                "通过回溯找到最优解",
                "通过动态规划找到最优解"
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            贪心算法在每一步选择中都采取局部最优策略，期望通过局部最优达到全局最优。

            - **A 在每一步选择中都采取局部最优策略**：正确答案。
            - **B 在每一步选择中都采取全局最优策略**：错误。
            - **C 通过回溯找到最优解**：错误。
            - **D 通过动态规划找到最优解**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 3,
            type: "single",
            question: `下面的 C++ 代码片段用于计算阶乘。请在横线处填入（ ），实现正确的阶乘计算。`,
            options: [
                "return n * factorial(n-1);",
                "return factorial(n-1) / n;",
                "return n * factorial(n);",
                "return factorial(n / 2) * factorial(n / 2);"
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            阶乘递归应满足 n! = n × ($n-1$)!，并在 n=0 或 n=1 时返回 1，因此应填 A。

            - **A return n * factorial(n-1);**：正确答案。
            - **B return factorial(n-1) / n;**：错误。
            - **C return n * factorial(n);**：错误。
            - **D return factorial(n / 2) * factorial(n / ...**：错误。该代码逻辑与题目要求不符，请逐步推演。

            **考点：** 递归
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 4,
            type: "single",
            question: `下面的代码片段用于在双向链表中删除一个节点。请在横线处填入（ ），使其能正确实现相应功能。`,
            options: [
                "if (current->next != nullptr) current->next->prev = current->prev;",
                "current->prev->next = current->next;",
                "delete current->next;",
                "current->prev = current->next;"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            删除双向链表中的当前节点时，若当前节点不是头结点，需要先让前驱节点的 next 指向当前节点的 next，因此选 B。

            - **A if (current->next != nullptr) current->n...**：错误。
            - **B current->prev->next = current->next;**：正确答案。
            - **C delete current->next;**：错误。
            - **D current->prev = current->next;**：错误。

            **考点：** 链表
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 5,
            type: "single",
            question: `辗转相除法也被称为（ ）。`,
            options: ["高斯消元法", "费马定理", "欧几里得算法", "牛顿迭代法"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            辗转相除法就是欧几里得算法，用于求两个整数的最大公约数。

            - **A 高斯消元法**：错误。
            - **B 费马定理**：错误。
            - **C 欧几里得算法**：正确答案。
            - **D 牛顿迭代法**：错误。

            **考点：** 数论
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 6,
            type: "single",
            question: `下面的代码片段用于计算斐波那契数列。该代码的时间复杂度是（ ）。`,
            options: ["$O(1)$", "$O(log n)$", "O($2^N$)", "$O(N)$"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            朴素递归 Fibonacci 会重复计算大量子问题，时间复杂度呈指数级增长，通常记为 O($2^N$)。

            - **A $O(1)$**：错误。
            - **B $O(log n)$**：错误。
            - **C O($2^N$)**：正确答案。
            - **D $O(N)$**：错误。

            **考点：** 递归
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 7,
            type: "single",
            question: `下面的代码片段用于将两个高精度整数进行相加。请在横线处填入（ ），使其能正确实现相应功能。`,
            options: [
                "result = to_string(sum % 10)+result;",
                "result = to_string(carry % 10)+result;",
                "result = to_string(sum / 10)+result;",
                "result = to_string(sum % 10+carry)+result;"
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            高精度加法每一位写入结果的应是当前位 sum % 10，进位单独保存在 carry 中，因此选 A。

            - **A $O(1)$**：正确答案。
            - **B $O(log n)$**：错误。
            - **C O($2^N$)**：错误。该代码逻辑与题目要求不符，请逐步推演。
            - **D $O(N)$**：错误。

            **考点：** 高精度
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 8,
            type: "single",
            question: `给定序列 1，3，6，9，17，31，39，52，61，79，81，90，96。使用给定代码二分查找元素 82 时，最后输出的 times 值为（ ）。`,
            options: ["2", "5", "3", "4"],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            按题中二分过程：79→90→81→未找到，共进入 while 循环 4 次，因此 times 为 4，选 D。

            - **A 2**：错误。该数值与正确计算结果不符，请重新验算。
            - **B 5**：错误。该数值与正确计算结果不符，请重新验算。
            - **C 3**：错误。该数值与正确计算结果不符，请重新验算。
            - **D 4**：正确答案。

            **考点：** 二分查找
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 9,
            type: "single",
            sourceIntegrity: "missing-code",
            integrityNote: "原卷此题引用的程序代码在录入时未收录，仅凭当前题面无法推导答案。本题已排除出计分与考点练习，待补齐原卷代码后恢复。",
            question: `下面的代码片段用于判断一个正整数是否为素数。请对以下代码进行修改，使其能正确实现相应功能。（ ）。`,
            options: [
                "num < 2 应该改为 num <= 2",
                "循环条件 i * i < num 应该改为 i * i <= num",
                "循环条件应该是 i <= num",
                "循环体中应该是 if (num % i != 0)"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            判断素数时应枚举到 i*i<=num；若写成 i*i<num，会漏掉完全平方数的因子检查，因此选 B。

            - **A 2**：错误。该数值与正确计算结果不符，请重新验算。
            - **B 5**：正确答案。
            - **C 3**：错误。该数值与正确计算结果不符，请重新验算。
            - **D 4**：错误。该数值与正确计算结果不符，请重新验算。

            **考点：** 筛法
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 10,
            type: "single",
            question: `在埃拉托斯特尼筛法中，要筛选出不大于 n 的所有素数，最外层循环应该遍历什么范围（ ）。`,
            options: [
                "for (int i = 2; i <= n; ++i)",
                "for (int i = 1; i < n; ++i)",
                "for (int i = 2; i <= $sqrt{n}$; ++i)",
                "for (int i = 1; i <= $sqrt{n}$; ++i)"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            埃氏筛只需要让外层质数筛到 $sqrt{n}$ 即可，再大的合数都会在此前被更小的质因子筛掉，因此选 C。

            - **A 2**：错误。该数值与正确计算结果不符，请重新验算。
            - **B 5**：错误。该数值与正确计算结果不符，请重新验算。
            - **C 3**：正确答案。
            - **D 4**：错误。该数值与正确计算结果不符，请重新验算。

            **考点：** 筛法
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 11,
            type: "single",
            question: `素数的线性筛法时间复杂度为（ ）。`,
            options: ["$O(N)$", "$O(n log n)$", "O(N log log N)", "$O(N^2)$"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            线性筛保证每个合数只被其最小质因子筛掉一次，因此总时间复杂度是 $O(N)$。

            - **A $O(N)$**：正确答案。
            - **B $O(n log n)$**：错误。
            - **C O(N log log N)**：错误。
            - **D $O(N^2)$**：错误。该代码逻辑与题目要求不符，请逐步推演。

            **考点：** 筛法
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 12,
            type: "single",
            question: `归并排序的基本思想是（ ）。`,
            options: ["动态规划", "分治", "贪心", "搜索"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            归并排序的基本思想是分而治之。

            - **A 动态规划**：错误。
            - **B 分治**：正确答案。
            - **C 贪心**：错误。
            - **D 搜索**：错误。

            **考点：** 归并排序
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 13,
            type: "single",
            question: `在快速排序中，选择的主元素（pivot）会影响算法的（ ）。`,
            options: [
                "不影响",
                "时间复杂度",
                "空间复杂度",
                "时间复杂度和空间复杂度"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            pivot 选得好时，划分更均衡，快速排序更接近 $O(n log n)$；选得差时可能退化到 $O(N^2)$，因此它会影响时间复杂度。

            - **A 动态规划**：错误。
            - **B 分治**：正确答案。
            - **C 贪心**：错误。
            - **D 搜索**：错误。

            **考点：** 快速排序
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 14,
            type: "single",
            question: `递归函数在调用自身时，必须满足（ ），以避免无限递归？`,
            options: [
                "有终止条件",
                "函数参数递减（或递增）",
                "函数返回值固定",
                "以上都对"
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            递归最基本的要求是必须存在终止条件，否则调用会无限进行下去。参数变化常见但不是唯一表述，因此按官方答案区选 A。

            - **A 动态规划**：正确答案。
            - **B 分治**：错误。
            - **C 贪心**：错误。
            - **D 搜索**：错误。

            **考点：** 递归
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 15,
            type: "single",
            question: `假设给定链表为某单链表，若调用 searchValue(head, 5)，函数返回值为（ ）。`,
            options: [
                "返回 1",
                "返回 0",
                "死循环，无法返回",
                "返回 -1"
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            题面函数会顺着 next 遍历链表，一旦遇到值等于 target 的节点就 return 1；官方答案区给出 A。

            - **A 动态规划**：正确答案。
            - **B 分治**：错误。
            - **C 贪心**：错误。
            - **D 搜索**：错误。

            **考点：** 链表
            `,
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 16,
            type: "judge",
            question: `C++ 中可以使用 \`const\` 关键字定义常量。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            const 可以用于定义常量对象或只读变量，该说法正确。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 17,
            type: "judge",
            question: `贪心算法保证能得到问题的全局最优解。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            贪心算法并不总能得到全局最优解，只有满足贪心选择性质的问题才适用，因此说法错误。

            **纠错：** 原命题说法有误。贪心算法并不总能得到全局最优解，只有满足贪心选择性质的问题才适用，因此说法错误。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 18,
            type: "judge",
            question: `二分查找的时间复杂度是 $O(N)$。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            二分查找每次把搜索区间缩小一半，时间复杂度是 $O(log n)$，不是 $O(N)$。

            **纠错：** 原命题说法有误。二分查找每次把搜索区间缩小一半，时间复杂度是 $O(log n)$，不是 $O(N)$。

            **易混概念：** 二分查找前提：序列有序。注意边界 while(left<=right) 还是 while(left<right)，mid 用 left+(right-left)/2 防溢出，以及更新左右边界时是否 ±1。

            **考点：** 二分查找
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 19,
            type: "judge",
            question: `在 C++ 中，\`std::vector\` 的大小是可以在运行时动态改变的。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            vector 支持动态扩容和缩容，元素个数可以在运行时变化，因此说法正确。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 20,
            type: "judge",
            question: `递归函数如果没有终止条件，会导致无限递归并最终栈溢出。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            递归若没有终止条件，会不断调用自身并持续消耗栈空间，最终可能栈溢出，因此说法正确。

            **易混概念：** 递归三要素：终止条件、递归调用、状态传递。注意递归深度限制，深层递归可能导致栈溢出；尾递归可被优化。

            **考点：** 递归
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 21,
            type: "judge",
            question: `在 C++ 中，指针变量存储的是另一个变量的内存地址。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            指针变量中保存的是某个内存单元的地址，因此说法正确。

            **易混概念：** 指针存储地址；解引用空指针或野指针是未定义行为；delete 后应将指针置 nullptr 避免悬垂指针。

            **考点：** 指针与内存
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 22,
            type: "judge",
            question: `快速排序在最坏情况下的时间复杂度是 $O(n log n)$。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            快速排序最坏情况下会退化到 $O(N^2)$，所以该说法错误。

            **纠错：** 原命题说法有误。快速排序最坏情况下会退化到 $O(N^2)$，所以该说法错误。

            **易混概念：** 快速排序平均 O(n log n)，最坏 O(n²)（已有序且选端点为基准）。注意基准选取、partition 的双指针移动条件和边界。

            **考点：** 快速排序
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 23,
            type: "judge",
            question: `C++ 中的类支持封装、继承和多态三大特性。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            类的三大特性通常概括为封装、继承和多态，因此说法正确。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 24,
            type: "judge",
            question: `在 C++ 中，\`new\` 操作符用于在堆上分配内存。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            new 会在自由存储区（通常称堆区）分配内存，因此说法正确。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** 指针与内存
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 25,
            type: "judge",
            question: `归并排序是稳定的排序算法。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            归并排序在合并相等元素时可以保持原有相对次序，因此它是稳定排序。

            **易混概念：** 归并排序 O(n log n)，稳定，需要额外 O(n) 空间；核心是分解到最小再合并两个有序序列。

            **考点：** 归并排序
            `,
            tags: ["客观题", "判断题", "GESP5级"]
        },
        ...programmingQuestions
    ]
};
