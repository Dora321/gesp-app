// 2025年9月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `6`, output: `4` },
        { input: `9`, output: `5` }
      ],
      question: `
# [GESP202509 五级] 数字选取

## 题目描述

给定正整数 $n$，现在有 $1,2,\\ldots,n$ 共计 $n$ 个整数。你需要从这 $n$ 个整数中选取一些整数，使得所选取的整数中任意两个不同的整数均互质（也就是说，这两个整数的最大公因数为 $1$）。请你最大化所选取整数的数量。

例如，当 $n=9$ 时，可以选择 $1,5,7,8,9$ 共计 $5$ 个整数。可以验证不存在数量更多的选取整数的方案。

## 输入格式

一行，一个正整数 $n$，表示给定的正整数。

## 输出格式

一行，一个正整数，表示所选取整数的最大数量。
`,
      score: 25,
      explanation: `**解析：**
      除 1 以外，任何两个不同的质数都互质；而大于 1 的合数通常会与某个更小的质数不互质。因此最优策略是选 1 以及所有不超过 n 的质数，答案为 1+pi(n)。

      **考点：** 数论、线性筛
      `,
      tags: ["编程题", "数论", "线性筛"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <algorithm>\n#include <cstdio>\nusing namespace std;\nconst int N = 1e5+5;\nint n, p[N], cnt;\nbool np[N];\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 2; i <= n; i++) {\n        if (!np[i]) p[++cnt] = i;\n        for (int j = 1; j <= cnt && i * p[j] <= n; j++) {\n            np[i * p[j]] = 1;\n            if (i % p[j] == 0) break;\n        }\n    }\n    printf(\"%d\\n\", 1+cnt);\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3 8`, output: `19` },
        { input: `65 36248`, output: `328505490` }
      ],
      question: `
# [GESP202509 五级] 有趣的数字和

## 题目描述

如果一个正整数的二进制表示包含奇数个 $1$，那么小 A 就会认为这个正整数是有趣的。

例如，$7$ 的二进制表示为 $(111)_2$，包含 $1$ 的个数为 $3$ 个，所以 $7$ 是有趣的。但是 $9=(1001)_2$ 包含 $2$ 个 $1$，所以 $9$ 不是有趣的。

给定正整数 $l,r$，请你统计满足 $l\\le n\\le r$ 的有趣的整数 $n$ 之和。

## 输入格式

一行，两个正整数 $l,r$，表示给定的正整数。

## 输出格式

一行，一个正整数，表示 $l,r$ 之间有趣的整数之和。
`,
      score: 25,
      explanation: `**解析：**
      设 f(n) 表示 [1,n] 中所有二进制中 1 的个数为奇数的数之和。可按最高位递归统计：先处理完整的 [0,2^k-1] 块，再递归处理剩余部分，同时根据最高位翻转奇偶性。最终答案为 f(r)-f(l-1)。

      **考点：** 位运算、递归、数位DP
      `,
      tags: ["编程题", "位运算", "递归", "数位DP"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int l, r;\n    cin >> l >> r;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <algorithm>\n#include <cstdio>\nusing namespace std;\nint l, r;\nlong long ans;\npair<int, long long> cal2(int n, int p) {\n    if (n == 0) return {1-p, 0};\n    if (n == 1) return {1, p};\n    return {(n+1) / 2, 1ll * n * (n+1) / 4};\n}\npair<int, long long> cal(int n, int p) {\n    if (n <= 1) return cal2(n, p);\n    long long x = 1ll << (31-__builtin_clz(n));\n    auto l = cal2(x-1, p);\n    auto r = cal(n-x, 1-p);\n    return {l.first+r.first, l.second+r.second+x * r.first};\n}\nint main() {\n    scanf(\"%d%d\", &l, &r);\n    ans -= cal(l-1, 1).second;\n    ans += cal(r, 1).second;\n    printf(\"%lld\\n\", ans);\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2025-09-l5',
    title: '2025年9月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `以下哪种情况使用链表比数组更合适？`,
            options: [
                "数据量固定且读多写少",
                "需要频繁在中间或开头插入、删除元素",
                "需要高效随机访问元素",
                "存储空间必须连续",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 数据量固定且读多写少**：错误。
            - **B 需要频繁在中间或开头插入、删除元素**：正确答案。
            - **C 需要高效随机访问元素**：错误。
            - **D 存储空间必须连续**：错误。

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
            question: `函数 removeElements 删除单链表中所有结点值等于 val 的结点，并返回新的头结点。其中链表头结点为 head，则横线处应填写（ ）。`,
            options: [
                "Node* del = cur->next; cur->next = del; delete del;",
                "Node* del = cur->next; cur->next = del->next; delete del;",
                "Node* del = cur; cur = del->next; delete del;",
                "Node* del = cur->next; delete del; cur->next = del->next;",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A Node* del = cur->next; cur->next = del; ...**：错误。
            - **B Node* del = cur->next; cur->next = del->...**：正确答案。
            - **C Node* del = cur; cur = del->next; delete...**：错误。
            - **D Node* del = cur->next; delete del; cur->...**：错误。

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
            question: `函数 hasCycle 采用 Floyd 快慢指针法判断单链表中是否存在环。slow 每次走 1 步，fast 每次走 2 步，则横线处应填写（ ）。`,
            options: [
                "slow = slow->next; fast = fast->next->next;",
                "slow = fast->next; fast = slow->next->next;",
                "slow = slow->next; fast = slow->next->next;",
                "slow = fast->next; fast = fast->next->next;",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A slow = slow->next; fast = fast->next->ne...**：正确答案。
            - **B slow = fast->next; fast = slow->next->ne...**：错误。
            - **C slow = slow->next; fast = slow->next->ne...**：错误。
            - **D slow = fast->next; fast = fast->next->ne...**：错误。

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
            question: `函数 isPerfectNumber 判断一个正整数是否为完全数（该数等于其所有真因子之和），为避免重复枚举因子，循环条件横线处应填写（ ）。`,
            options: [
                "i <= n",
                "i*i <= n",
                "i <= n/2",
                "i < n",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A i <= n**：错误。
            - **B i*i <= n**：正确答案。
            - **C i <= n/2**：错误。该代码逻辑与题目要求不符，请逐步推演。
            - **D i < n**：错误。

            **考点：** C++基础
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
            question: `以下代码计算两个正整数的最大公约数(GCD)，横线上应填写（ ）。`,
            options: [
                "b",
                "a",
                "temp",
                "a * b",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A b**：错误。
            - **B a**：正确答案。
            - **C temp**：错误。
            - **D a * b**：错误。

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
            question: `函数 sieve 实现埃拉托斯特尼筛法(埃⽒筛)，横线处应填入（ ）。`,
            options: [
                "i",
                "i+1",
                "i*2",
                "i*i",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A i**：错误。
            - **B i+1**：错误。
            - **C i*2**：错误。
            - **D i*i**：正确答案。

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
            question: `函数 linearSieve 实现线性筛法(欧拉筛)，横线处应填入（ ）。`,
            options: [
                "i % p == 0",
                "p % i == 0",
                "i == p",
                "i * p == n",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A i % p == 0**：正确答案。
            - **B p % i == 0**：错误。该代码逻辑与题目要求不符，请逐步推演。
            - **C i == p**：错误。该代码逻辑与题目要求不符，请逐步推演。
            - **D i * p == n**：错误。该代码逻辑与题目要求不符，请逐步推演。

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
            question: `关于埃氏筛和线性筛的比较，下列说法错误的是（ ）。`,
            options: [
                "埃⽒筛可能会对同一个合数进⾏多次标记",
                "线性筛的理论时间复杂度更优，所以线性筛的速度往往优于埃⽒筛",
                "线性筛保证每个合数只被其最小质因子筛到一次",
                "对于常见的数据范围，埃氏筛因实现简单、常数较小，实际运行速度往往优于线性筛",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 埃⽒筛可能会对同一个合数进⾏多次标记**：错误。
            - **B 线性筛的理论时间复杂度更优，所以线性筛的速度往往优于埃⽒筛**：正确答案。
            - **C 线性筛保证每个合数只被其最小质因子筛到一次**：错误。
            - **D 对于常见的数据范围，埃氏筛因实现简单、常数较小，实际运行速度往往优于线性筛**：错误。

            **考点：** C++基础
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
            question: `唯一分解定理描述的是( )。`,
            options: [
                "每个整数都能表⽰为任意素数的乘积",
                "每个大于 1 的整数能唯一分解为素数幂乘积（忽略顺序）",
                "合数不能分解为素数乘积",
                "素数只有两个因子：1 和⾃⾝",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 每个整数都能表⽰为任意素数的乘积**：错误。筛法标记范围或起点有误，请逐步推演标记过程。
            - **B 每个大于 1 的整数能唯一分解为素数幂乘积（忽略顺序）**：正确答案。
            - **C 合数不能分解为素数乘积**：错误。筛法标记范围或起点有误，请逐步推演标记过程。
            - **D 素数只有两个因子：1 和⾃⾝**：错误。筛法标记范围或起点有误，请逐步推演标记过程。

            **考点：** C++基础
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
            question: `给定一个 n x n 的矩阵 matrix，矩阵的每一行和每一列都按升序排列。函数通过二分答案求第 k 小元素，则两处横线应分别填写（ ）。`,
            options: [
                "hi = mid-1; 和 lo = mid+1",
                "hi = mid; 和 lo = mid",
                "hi = mid; 和 lo = mid+1",
                "hi = mid+1; 和 lo = mid",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A hi = mid-1; 和 lo = mid+1**：错误。
            - **B hi = mid; 和 lo = mid**：错误。
            - **C hi = mid; 和 lo = mid+1**：正确答案。
            - **D hi = mid+1; 和 lo = mid**：错误。

            **考点：** 二分查找
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
            question: `下述 C++ 代码实现了快速排序算法，下面说法错误的是（ ）。`,
            options: [
                "快速排序平均情况下速度较快、常数较小，且属于原地排序，实践中通常较高效。",
                "平均情况下递归层数约为 $O(log n)$，每层总工作量为 $O(N)$，总时间复杂度为 $O(n log n)$。",
                "最坏情况下会不断分成 0 和 $n-1$ 两部分，递归层数达 $O(N)$，每层工作量为 $O(N)$，总时间复杂度为 $O(N^2)$。",
                "partition 中“先从右往左找”与“先从左往右找”的顺序可以随意交换，算法仍然完全等价。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 快速排序平均情况下速度较快、常数较小，且属于原地排序，实践中通常较高效。**：错误。不同排序算法的稳定性或复杂度理解有误，请对照正确解析。
            - **B 平均情况下递归层数约为 $O(log n)$，每层总工作量为 $O(N)$，总时...**：错误。递归/递推的终止条件或状态传递有误，请检查递归出口和参数变化。
            - **C 最坏情况下会不断分成 0 和 $n-1$ 两部分，递归层数达 $O(N)$，每层...**：错误。递归/递推的终止条件或状态传递有误，请检查递归出口和参数变化。
            - **D partition 中“先从右往左找”与“先从左往右找”的顺序可以随意交换，算法...**：正确答案。

            **考点：** 快速排序
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
            question: `下述C++代码实现了归并排序算法，则横线上应填写（ ）。`,
            options: [
                "i < mid",
                "j < right",
                "i <= mid",
                "j <= right",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A i < mid**：错误。
            - **B j < right**：错误。
            - **C i <= mid**：错误。
            - **D j <= right**：正确答案。

            **考点：** 归并排序
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
            question: `电影院排片问题中，按结束时间从小到大排序并维护 lastEnd，才能贪心选出最多部不重叠电影。则两处横线应分别填写（ ）。`,
            options: [
                "a[0] < b[0] 和 lastEnd",
                "a[1] < b[1] 和 lastEnd",
                "a[0] < b[0] 和 movies[i][0]",
                "a[1] < b[1] 和 movies[i][0]",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A a[0] < b[0] 和 lastEnd**：错误。
            - **B a[1] < b[1] 和 lastEnd**：正确答案。
            - **C a[0] < b[0] 和 movies[i][0]**：错误。
            - **D a[1] < b[1] 和 movies[i][0]**：错误。

            **考点：** 排序算法
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
            question: `给定一个整数数组 nums，下面代码找到一个具有最大和的连续子数组并返回该最大和。则下面说法错误的是（ ）。`,
            options: [
                "上述代码采用分治算法实现",
                "上述代码采用贪⼼算法",
                "上述代码的时间复杂度为 $O(n log n)$",
                "上述代码采用递归方式实现",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A 上述代码采用分治算法实现**：错误。
            - **B 上述代码采用贪⼼算法**：正确答案。
            - **C 上述代码的时间复杂度为 $O(n log n)$**：错误。复杂度分析有误，请重新估算最坏情况时间复杂度。
            - **D 上述代码采用递归方式实现**：错误。递归/递推的终止条件或状态传递有误，请检查递归出口和参数变化。

            **考点：** 数组
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
            question: `给定一个由非负整数组成的数组 digits，表示一个非负整数的各位数字。下面代码对该整数执行 +1 操作并返回结果数组，则横线处应填写（ ）。`,
            options: [
                "digits[i] = 0;",
                "digits[i] = 9;",
                "digits[i] = 1;",
                "digits[i] = 10;",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            - **A digits[i] = 0;**：正确答案。
            - **B digits[i] = 9;**：错误。
            - **C digits[i] = 1;**：错误。
            - **D digits[i] = 10;**：错误。

            **考点：** 数组
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
            question: `基于下面定义的函数，通过判断 isDivisibleBy9(n) == isDigitSumDivisibleBy9(n)，可用于验算：如果一个数能被 9 整除，则它的各位数字之和也能被 9 整除。`,
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

            **考点：** C++基础
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
            question: `假设函数gcd()能正确求两个正整数的最大公约数，则下面的findMusicalPattern(4 ， 6)函数返回 2 。`,
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
            id: 18,
            type: "judge",
            question: `下面递归实现的斐波那契数列的时间复杂度为指数级。`,
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
            id: 19,
            type: "judge",
            question: `链表通过更改指针实现高效的结点插入与删除，但结点访问效率低、占用内存较多，且对缓存利用不友好。`,
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
            id: 20,
            type: "judge",
            question: `二分查找依赖数据的有序性，通过循环逐步缩减一半搜索区间来进行查找，且仅适用于数组或基于数组实现的数据结构。`,
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
            id: 21,
            type: "judge",
            question: `线性筛的关键性质是“每个合数只会被其最小质因子筛到一次”，因此其时间复杂度为 $O(N)$。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 常见排序复杂度：快排/归并/堆排 O(n log n)，冒泡/选择/插入 O(n²)。稳定：冒泡、插入、归并；不稳定：快排、选择、堆排。

            **考点：** 时间复杂度
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
            question: `快速排序和归并排序都是稳定的排序算法。`,
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
            question: `下面代码采用分治算法求解标准 3 柱汉诺塔问题，其时间复杂度为 O($2^n$)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。

            **易混概念：** 常见排序复杂度：快排/归并/堆排 O(n log n)，冒泡/选择/插入 O(n²)。稳定：冒泡、插入、归并；不稳定：快排、选择、堆排。

            **考点：** 分治
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
            question: `所有递归算法都可以转换为迭代算法。`,
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
            id: 25,
            type: "judge",
            question: `贪心算法并不总能得到全局最优解。`,
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

            **考点：** C++基础
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
