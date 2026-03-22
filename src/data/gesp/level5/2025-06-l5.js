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
      referenceCode: '// 待补充',
      question: `
# [GESP202506 五级] 奖品兑换

## 题目描述

班主任给上课专心听讲、认真完成作业的同学们分别发放了若干张课堂优秀券和作业优秀券。同学们可以使用这两种券找班主任兑换奖品。具体来说，可以使用 \$a\$ 张课堂优秀券和 \$b\$ 张作业优秀券兑换一份奖品，或者使用 \$b\$ 张课堂优秀券和 \$a\$ 张作业优秀券兑换一份奖品。

现在小 A 有 \$n\$ 张课堂优秀券和 \$m\$ 张作业优秀券，他最多能兑换多少份奖品呢？

## 输入格式

第一行，两个正整数 \$n,m\$，分别表示小 A 持有的课堂优秀券和作业优秀券的数量。

第二行，两个正整数 \$a,b\$，表示兑换一份奖品所需的两种券的数量。

## 输出格式

输出共一行，一个整数，表示最多能兑换的奖品份数。
`,
      score: 25,
      explanation: "答案具有单调性：若能兑换 v 份，则一定也能兑换更少的份数。可以二分答案 v，再检查是否能把这 v 份分成两种兑换方式，使两类券都不超出持有数量。",
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
      referenceCode: '// 待补充',
      question: `
# [GESP202506 五级] 最大公因数

## 题目描述

对于两个正整数 \$a,b\$，他们的最大公因数记为 \$\\gcd(a,b)\$。对于 \$k > 3\$ 个正整数 \$c_1,c_2,\\dots,c_k\$，他们的最大公因数为：

\$\\gcd(c_1,c_2,\\dots,c_k)=\\gcd(\\gcd(c_1,c_2,\\dots,c_{k-1}),c_k)\$

给定 \$n\$ 个正整数 \$a_1,a_2,\\dots,a_n\$ 以及 \$q\$ 组询问。对于第 \$i(1 \\le i \\le q)\$ 组询问，请求出 \$a_1+i,a_2+i,\\dots,a_n+i\$ 的最大公因数，也即 \$\\gcd(a_1+i,a_2+i,\\dots,a_n+i)\$。

## 输入格式

第一行，两个正整数 \$n,q\$，分别表示给定正整数的数量，以及询问组数。

第二行，\$n\$ 个正整数 \$a_1,a_2,\\dots,a_n\$。

## 输出格式

输出共 \$q\$ 行，第 \$i\$ 行包含一个正整数，表示 \$a_1+i,a_2+i,\\dots,a_n+i\$ 的最大公因数。
`,
      score: 25,
      explanation: "将数组排序后，设所有相邻差值的 gcd 为 g，则 gcd(a_1+i,a_2+i,...,a_n+i) = gcd(g, a_1+i)。因此预处理一次差分 gcd 后，每次询问只需再求一次 gcd。",
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
            question: "与数组相比，链表在（ ）操作上通常具有更高的效率。",
            options: [
                "随机访问元素",
                "查找指定元素",
                "在已知位置插入或删除节点",
                "遍历所有元素",
            ],
            answer: 2,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下面 C++ 代码实现双向链表。函数 is_empty() 判断链表是否为空，如链表为空返回 true，否则返回 false。横线处不能填写的是（ ）。",
            options: [
                "return head == nullptr;",
                "return tail == nullptr;",
                "return head.data == 0;",
                "return size == 0;",
            ],
            answer: 2,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "基于上题代码正确的前提下，填入相应代码完善 append() ，用于在双向链表尾部增加新节点，横线上应填 写（ ）。",
            options: [
                "list->head->prev = list->head; list->tail->prev = list->head;",
                "list->head->next = list->tail; list->tail->prev = list->head;",
                "list->head->next = list->tail; list->tail->next = list->head;",
                "list->head->next = list->tail; list->tail->next = nullptr;",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下列 C++ 代码用循环链表解决约瑟夫问题。假设 n 个人围成一圈，从第一个人开始数，每次数到第 k 个人的人就出圈，输出最后留下的那个人的编号。横线上应填写的是（ ）。",
            options: [
                "[待补充选项]",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下列 C++ 代码判断一个正整数是否是质数，说法正确的是（ ）。",
            options: [
                "代码存在错误，比如 5 是质数，但因为5 % 5 余数是 0 返回了false",
                "finish_number 的值应该是n / 2 ，当前写法将导致错误",
                "当前while 循环正确的前提是：所有大于 3 的质数都符合6k±1 形式",
                "while 循环修改如下，其执⾏效果和执⾏时间相同。",
            ],
            answer: 2,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下列 C++ 代码用两种方式求解两个正整数的最大公约数，说法错误的是 ( ) 。",
            options: [
                "gcd0() 函数的时间复杂度较高，通常为 O(min(a,b)) 量级。",
                "gcd1()（欧几里得算法）通常比枚举因子的做法更高效。",
                "一般说来，gcd0() 的效率高于gcd1()",
                "gcd1() 中的代码for (int i = small; i >= 1; --i) 应该修改为for (int i = small; i > 1; --i)",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下面的代码用于判断整数是否是质数，错误的说法是（ ）。",
            options: [
                "埃⽒筛算法相对于上面的代码效率更高",
                "线性筛算法相对于上面的代码效率更高",
                "上面的代码有很多重复计算，因为不是判断单个数是否为质数，故而导致筛选出连续数中质数的效率不高",
                "相对而⾔，埃⽒筛算法比上面代码以及线性筛算法效率都高",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "唯一分解定理描述了关于正整数的什么性质？",
            options: [
                "任何正整数都可以表⽰为两个素数的和。",
                "任何大于 1 的合数都可以唯一分解为有限个质数的乘积。",
                "两个正整数的最大公约数总是等于它们的最小公倍数除以它们的乘积。",
                "所有素数都是奇数。",
            ],
            answer: 1,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面的 C++ 代码，用于求一系列数据中的最大值。有关其算法说法错误的是（ ）。",
            options: [
                "该算法采用分治算法",
                "该算法是递归实现",
                "该算法采用贪⼼算法",
                "该算法不是递推算法",
            ],
            answer: 2,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面的 C++ 代码用于求一系列数据中的最大值。有关其算法说法错误的是（ ）。",
            options: [
                "本题 find_max() 函数采用的是迭代算法",
                "本题 find_max() 函数的时间复杂度为 $O(N)$",
                "和上一题的递归版 find_max() 相比，这里没有递归调用带来的栈开销",
                "本题 find_max() 与上一题递归版的空间复杂度相同，都是 $O(\log n)$",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面的 C++ 代码用于在升序数组 lst 中查找目标值 target 最后一次出现的位置。相关说法，正确的是（ ）。",
            options: [
                "当 lst 中存在重复的 target 时，该函数总能返回最后一个 target 的位置，即便 lst 全由相同元素组成",
                "当 target 小于 lst 中所有元素时，该函数会返回 0",
                "循环条件改为 while (low <= high) 程序执⾏效果相同，且能提高准确性",
                "若 target 不存在，该函数返回 -1。",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "有关下面使用二分法求平方根的 C++ 代码的说法，错误的是（ ）。",
            options: [
                "“阶段 1”的目标是先判断正整数 n 是否有整数平方根",
                "“阶段 2”的目标是当 n 不是完全平方数时，在相邻整数平方根之间继续二分逼近",
                "代码 check_int = (long long)(result+0.5) 用于消除浮点误差，检查结果是否恰好是整数平方根",
                "阶段 2 中用 high_d-low_d >= epsilon 作为停止条件完全不能用于浮点数比较，否则一定会死循环",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "硬币找零问题中要求找给客户最少的硬币。coins 存储可用硬币面额，amount 为待找零金额。下面是其实现代码，相关说法正确的是（ ）。",
            options: [
                "上述代码采用贪心算法实现",
                "针对任意面额系统，上述代码总能找到最优解",
                "上述代码采用枚举算法",
                "上述代码采用分治算法",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "关于下述 C++ 代码的快速排序算法，说法错误的是（ ）。",
            options: [
                "在 randomPartition 函数中，变量 i 的作用是记录不大于基准值元素区间的右边界",
                "randomPartition 随机选择基准值，可以降低遇到最坏情况 $O(N^2)$ 的概率",
                "快速排序的平均时间复杂度是 $O(n \log n)$",
                "快速排序是稳定排序算法",
            ],
            answer: 3,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "小杨编写了一个如下的高精度除法函数，则在把下一位加入余数时，横线上应填写的代码为（ ）。",
            options: [
                "r.d[0] = a.d[i]; r.len++;",
                "r.d[i] = a.d[i]; r.len++;",
                "r.d[i] = a.d[i]; r.len = 1;",
                "r.d[0] = a.d[i]; r.len = 1;",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "下面 C++ 代码是用欧⼏⾥得算法（辗转相除法）求两个正整数的最大公约数，a 大于b 还是小于b 都适用。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "假设函数 gcd() 能正确求两个正整数的最大公约数，则下面的 lcm() 函数也能正确求出这两个数的最小公倍数。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "下面的C++代码用于输出每个数对应的质因数列表，输出形如： {5: [5], 6: [2, 3], 7: [7], 8: [2, 2, 2]} 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "下面的 C++ 代码实现归并排序。代码在执行时，会输出多次 HERE 字符串，因为 merge() 会在递归过程中被多次调用。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "归并排序的最好、最坏和平均时间复杂度均为 $O(n \log n)$。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "查字典这个小学生必备技能，可以把字典视为一个已排序的数组。假设小杨要查找一个⾳⾸字母为 g 的单 词，他⾸先翻到字典约一半的页数，发现该页的⾸字母是 m ，由于字母表中 g 位于 m 之前，所以排除字典后半部 分，查找范围缩小到前半部分；不断重复上述步骤，直⾄找到⾸字母为 g 的页码。这种查字典的一系列操作可看作 二分查找。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "求解图中 A 点到 D 点的最短路径，常用 Dijkstra 算法。它通过逐步选择当前距离起点最近的节点，求解非负权图的单源最短路径，因此可视为贪心算法。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "Dijkstra 算法的核心是每一步选择当前最优的未确定节点，属于典型贪心算法。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "分治算法将原问题可以分解成规模更小的子问题，使得求解问题的难度降低。但由于分治算法需要将问题进 ⾏分解，并且需要将多个子问题的解合并为原问题的解，所以分治算法的效率通常比直接求解原问题的效率低。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "函数 puzzle 定义如下，则调用 puzzle(7) 程序会无限递归。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "如下为线性筛法，用于高效生成素数表，其核⼼思想是每个合数只被它的最小质因数筛掉一次，时间复杂 度为 。 } } void mergeSort(std::vector<int>& arr, int left, int right) { if (left >= right) { return; } int mid = left+(right-left) / 2; mergeSort(arr, left, mid); mergeSort(arr, mid+1, right); std::cout << \"HERE\"; merge(arr, left, mid, right); } 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 int puzzle(int n) { if (n == 1) return 1; if (n % 2 == 0) return puzzle(n / 2); return puzzle(3 * n+1); } 1 2 3 4 5 vector<int> linearSieve(int n) { vector<bool> is_prime(n+1, true); vector<int> primes; for (int i = 2; i <= n; ++i) { if (is_prime[i]) { primes.push_back(i); } for (int j = 0; j < primes.size() && i * primes[j] <= n; ++j) { 1 2 3 4 5 6 7 8 9 10",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "本题答案已依据试卷标准答案完成录入，可结合题干与选项复盘对应知识点。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        ...programmingQuestions
    ]
};
