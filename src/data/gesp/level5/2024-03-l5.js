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
            question: `下面的代码片段用于计算斐波那契数列。该代码的时间复杂度是（ ）。

\`\`\`cpp
int fibonacci(int n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
\`\`\`
`,
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
            question: `下面的代码片段用于判断一个正整数是否为素数。请对以下代码进行修改，使其能正确实现相应功能。（ ）。

\`\`\`cpp
bool isPrime(int num) {
    if (num < 2) {
        return false;
    }
    for (int i = 2; i * i < num; ++i) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}
\`\`\`
`,
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
            试除法判断素数需要枚举到 $\\sqrt{num}$，即循环条件应为 \`i * i <= num\`。若写成 \`i * i < num\`，当 num 是完全平方数时会漏掉因子 $\\sqrt{num}$ 的检查，例如 \`isPrime(9)\`：i=2 时 4<9 成立，9%2≠0；i=3 时 9<9 不成立，循环结束返回 true，把 9 误判为素数。

            - **A num < 2 应该改为 num <= 2**：错误。num=2 本身是素数，若改成 num <= 2 会把 2 也判为非素数；且 num<2 的边界本身正确。
            - **B 循环条件 i * i < num 应该改为 i * i <= num**：正确。补上等号才能检查到 $\\sqrt{num}$ 这个因子。
            - **C 循环条件应该是 i <= num**：错误。条件过松，虽然结果仍正确，但复杂度退化为 O(num)，不是「正确实现功能」所需的修改。
            - **D 循环体中应该是 if (num % i != 0)**：错误。发现余数不为 0 不能说明是素数，必须找到余数为 0 的因子才能判为合数。

            **考点：** 素数试除、边界条件
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
            question: `辗转相除法用于求两个整数的最大公约数。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
辗转相除法就是欧几里得算法，依据是 $\\gcd(a, b) = \\gcd(b, a \\bmod b)$：不断用余数替换较大的数，直到余数为 0，此时最后一个非零除数就是最大公约数。以 $\\gcd(48, 18)$ 为例：$48 \\bmod 18 = 12$，$18 \\bmod 12 = 6$，$12 \\bmod 6 = 0$，所以答案是 6，与直接分解质因数得到的 $48 = 2^4 \\times 3$、$18 = 2 \\times 3^2$、公共因子 $2 \\times 3 = 6$ 一致。

**易错点：**
- 与「更相减损术」混淆：后者用减法反复相减，思路相同但循环次数多得多，遇到 $10^9$ 与 $1$ 这类数据会退化成上亿次。
- 递归写法 \`return b == 0 ? a : gcd(b, a % b)\` 的终止条件写在 $b = 0$，返回的是上一层的 $a$，不要写成返回 $b$。

**考点：** 数论 · 最大公约数算法`,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 17,
            type: "judge",
            question: `插入排序的时间复杂度是 $O(N \\log N)$。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
插入排序把每个元素插入到前面已排好序的区间中，第 $i$ 个元素平均需要比较和移动 $i/2$ 次，累加后是 $1 + 2 + \\cdots + (N-1) = N(N-1)/2$，即平均与最坏时间复杂度都是 $O(N^2)$。只有「输入本身已经有序」时，每轮只需一次比较、不移动，才降到 $O(N)$。

**正确说法：**
插入排序最好 $O(N)$、平均 $O(N^2)$、最坏（完全逆序）$O(N^2)$，空间 $O(1)$，稳定。

**易错点：**
$O(N \\log N)$ 是归并与堆排序的任何情况、以及快速排序的平均情况。不要因为「插入排序在小数据上很快」就把它记成 $O(N \\log N)$——它快是因为常数因子小，不是因为阶数低。

**考点：** 排序算法 · 时间复杂度`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 18,
            type: "judge",
            question: `二分查找要求被搜索的序列是有序的，否则无法保证正确性。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
二分查找每一步都要靠「中间元素与目标的大小关系」决定丢掉左半还是右半，这个剪枝的前提是序列单调。若序列无序，丢掉的那一半里完全可能藏着目标，正确地丢弃无法保证，结果不可靠。

**易错点：**
- 前提是「有序」而不是「互不相同」；有重复元素时二分仍能工作，只是返回的是其中某一个位置，需要额外收缩区间才能拿到第一个或最后一个。
- 常见实现坑：区间写 \`[left, right]\` 时循环条件是 \`left <= right\`，写 \`[left, right)\` 时是 \`left < right\`，两种写法的边界更新必须配套；\`mid = left + (right - left) / 2\` 可避免 \`left + right\` 溢出。

**考点：** 查找算法 · 二分查找`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 19,
            type: "judge",
            question: `使用贪心算法解决问题时，每一步的局部最优解一定会导致全局最优解。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
贪心只有在问题同时满足「贪心选择性质」和「最优子结构」时才保证全局最优，否则每步取局部最优会走进死胡同。经典反例是找零：面值 1、3、4 元凑 6 元，贪心先拿最大的 4 元，剩下 2 元只能拿两枚 1 元，共 3 枚；而最优解是两枚 3 元，只要 2 枚。

**正确说法：**
贪心得到的是「当前看来最好」的可行解，不保证最优。要证明贪心正确，通常用交换论证：把最优解的第一步换成贪心选择，证明结果不会变差。

**易错点：**
不要把「贪心能解决问题」和「贪心能求最优解」混为一谈。区间调度、霍夫曼编码、最小生成树是贪心正确的例子；0-1 背包、找零、旅行商是贪心失效的例子。

**考点：** 贪心算法 · 正确性`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 20,
            type: "judge",
            question: `分治算法的核心思想是将一个大问题分解成多个相同或相似的子问题进行解决，最后合并得到原问题的解。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
分治的标准三步是：分解（Divide）把原问题拆成规模更小的同类子问题；解决（Conquer）递归求解子问题，规模足够小时直接返回；合并（Combine）把子问题的解拼成原问题的解。归并排序、快速排序、二分查找、大整数乘法都是这一套路。

**易错点：**
- 分治能成立的关键是子问题「相互独立、不重叠」。若子问题大量重叠（如朴素递归求斐波那契），分治会退化成指数级，这时应改用记忆化或动态规划。
- 合并步骤不能省：归并排序的复杂度 $O(N \\log N)$ 里，$\\log N$ 来自分解层数，$N$ 来自每层合并。

**考点：** 分治算法`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 21,
            type: "judge",
            question: `分治算法的典型应用之一是归并排序，其时间复杂度为 $O(N \\log N)$。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
归并排序把序列一分为二递归排序，再线性合并。分解共进行 $\\log_2 N$ 层，每一层的所有合并操作加起来恰好扫过 $N$ 个元素，因此总复杂度是 $O(N \\log N)$，最好、最坏、平均都是这个量级。

**易错点：**
- 归并排序需要 $O(N)$ 的辅助数组，是「以空间换时间」；相比之下堆排序空间 $O(1)$ 但常数大、且不稳定。
- 合并两个有序序列时必须先用临时数组存结果再拷回，直接在原数组上覆盖会丢数据。
- 归并排序是稳定排序：合并时遇到相等元素先取左边那个即可保持原有次序。

**考点：** 分治 · 归并排序`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 22,
            type: "judge",
            question: `素数表的埃氏筛法和线性筛法的时间复杂度都是 $O(N \\log \\log N)$。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
「都是 $O(N \\log \\log N)$」的说法不准确，两种筛法的复杂度并不相同：
- 埃氏筛（Eratosthenes）：每遇到一个素数 $p$ 就划掉 $p$ 的倍数，总操作数为 $\\sum_{p \\le N} N/p = O(N \\log \\log N)$。
- 线性筛（欧拉筛）：保证每个合数只被它的**最小质因子**划掉一次，复杂度严格是 $O(N)$，比 $O(N \\log \\log N)$ 更低。

因此"都是 $O(N \\log \\log N)$"只对埃氏筛成立，对线性筛不成立，命题错误。

**易错点：**
- 把线性筛也记成 $O(N \\log \\log N)$ 是最常见的错法——"线性筛"名字里的"线性"就是指 $O(N)$。
- 线性筛快在「每个数只被标记一次」，代价是要额外维护素数表和 \`isComposite\` 判断，常数并不总比埃氏筛小；$N$ 只有 $10^7$ 量级时两者实际耗时接近。

**考点：** 数论 · 素数筛法`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-28',
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 23,
            type: "judge",
            question: `贪心算法是一种可以应用于所有问题的通用解决方案。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
贪心是一种策略而不是万能钥匙。它对问题有明确要求：必须能证明局部最优可以推出全局最优。绝大多数最优化问题（如图着色、0-1 背包、旅行商）贪心都得不到最优解，需要动态规划、搜索或近似算法。

**易错点：**
- 「贪心可以拿来做」和「贪心能拿满分」是两回事：很多题用贪心能拿到部分分，但正解是动态规划。
- 看到「每次选最大/最小/最划算」的表述时要先想反例，再决定用不用贪心。

**考点：** 贪心算法 · 适用条件`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 24,
            type: "judge",
            question: `单链表和双链表都可以在常数时间内实现在链表头部插入或删除节点的操作。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
链表头部操作只需要改头指针：插入是 \`newNode->next = head; head = newNode;\`，删除是 \`head = head->next;\`，两者都不涉及遍历，与链表长度无关，因此是 $O(1)$。双链表额外把新节点的 \`prev\` 置空、把原头节点的 \`prev\` 指向新节点，仍然是常数次指针赋值。

**易错点：**
- 结论只对「头部」成立。在单链表中删除「给定指针指向的节点」或在其前面插入，因为拿不到前驱，最坏要 $O(N)$；双链表有 \`prev\` 才能做到 $O(1)$。
- 删除头节点时要先判空，否则对空链表执行 \`head = head->next\` 会解引用空指针。

**考点：** 链表 · 基本操作复杂度`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 25,
            type: "judge",
            question: `在C语言中，递归的实现方式通常会占用更多的栈空间，可能导致栈溢出。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
每次函数调用都要在调用栈上压入一个栈帧，保存返回地址、参数和局部变量。递归深度为 $N$ 时就同时存在 $N$ 个栈帧，递归越深占用越多；而循环只用一层固定栈帧。栈空间通常只有几 MB，深度到十万级（如朴素递归求阶乘、递归建树）就会触发栈溢出。

**易错点：**
- C 语言标准并不要求编译器做尾递归优化，所以即使写成尾递归形式，也不能指望它自动变成循环。
- 把递归改写成迭代、或显式用数组模拟栈，是避免栈溢出的通用做法；\`dfs\` 在 $10^5$ 个点的链状图上递归也容易爆栈。

**考点：** 递归 · 调用栈`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级"]
        },
        ...programmingQuestions
    ]
};
