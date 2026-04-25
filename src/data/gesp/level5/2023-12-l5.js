// 2023年12月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `2 4 
1 
4 
5 
9`, output: `4 
lucky 
8 
lucky` },
        { input: `16 11 
1 
2 
4 
8 
16 
32 
64 
128 
256 
512
1024`, output: `16 
16 
16 
16 
lucky 
lucky 
lucky 
lucky 
lucky 
lucky 
lucky` }
      ],
      referenceCode: '// 待补充',
      question: `
# [GESP202312 五级] 小杨的幸运数

## 题目描述

小杨认为，所有大于等于 $a$ 的完全平方数都是他的超级幸运数。

小杨还认为，所有超级幸运数的倍数都是他的幸运数。自然地，小杨的所有超级幸运数也都是幸运数。

对于一个非幸运数，小杨规定，可以将它一直 $+1$，直到它变成一个幸运数。我们把这个过程叫做幸运化。例如，如果 $a=4$，那么 $4$ 是最小的幸运数，而 $1$ 不是，但我们可以连续对 $1$ 做 $3$ 次 $+1$ 操作，使其变为 $4$，所以我们可以说， $1$ 幸运化后的结果是 $4$。

现在，小杨给出 $N$ 个数，请你首先判断它们是不是幸运数；接着，对于非幸运数，请你将它们幸运化。

## 输入格式

第一行 $2$ 个正整数 $a, N$。

接下来 $N$ 行，每行一个正整数 $x$ ，表示需要判断（幸运化）的数。

## 输出格式

输出 $N$ 行，对于每个给定的 $x$ ，如果它是幸运数，请输出 \`lucky\`，否则请输出将其幸运化后的结果。
`,
      score: 25,
      explanation: "预处理：筛选出所有超级幸运数（完全平方数 ≥ a）及其倍数。然后对于查询 x，找到最近的幸运数。",
      tags: ["编程题", "数论", "埃氏筛"],
      template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, n;\n    cin >> a >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <cmath>\nusing namespace std;\nconst int MAX = 2000005;\nbool is_lucky[MAX];\nint next_lucky[MAX];\nint main() {\n    int a, n;\n    cin >> a >> n;\n    for (long long i = 1; i * i < MAX; i++) {\n        long long sq = i * i;\n        if (sq >= a) {\n            for (long long j = sq; j < MAX; j += sq) is_lucky[j] = true;\n        }\n    }\n    int last = -1;\n    for (int i = MAX-1; i >= 1; i--) {\n        if (is_lucky[i]) last = i;\n        next_lucky[i] = last;\n    }\n    while (n--) {\n        int x; cin >> x;\n        if (is_lucky[x]) cout << \"lucky\" << endl;\n        else cout << next_lucky[x] << endl;\n    }\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3
1 2 3`, output: `2` },
        { input: `5
5 6 2 10 13`, output: `8` }
      ],
      referenceCode: '// 待补充',
      question: `
# [GESP202312 五级] 烹饪问题

## 题目描述

有 $N$ 种食材，编号从 $1$ 至 $N$，其中第 $i$ 种食材的美味度为 $a_i$。

不同食材之间的组合可能产生奇妙的化学反应。具体来说，如果两种食材的美味度分别为 $x$ 和 $y$ ，那么它们的契合度为 $x\\ \\text{and}\\ y $。

其中，$\\text{and}$ 运算为按位与运算，需要先将两个运算数转换为二进制，然后在高位补足 ，再逐位进行与运算。例如，$12$ 与 $6$ 的二进制表示分别为 $1100$ 和 $0110$ ，将它们逐位进行与运算，得到 $0100$ ，转换为十进制得到 4，因此 $12\\ \\text{and}\\ 6 = 4$。**在 C++ 或 Python 中，可以直接使用 \`&\` 运算符表示与运算。**


现在，请你找到契合度最高的两种食材，并输出它们的契合度。

## 输入格式

第一行一个整数 $N$，表示食材的种数。

接下来一行 $N$ 个用空格隔开的整数，依次为 $a_1,\\cdots,a_N$，表示各种食材的美味度。

## 输出格式

输出一行一个整数，表示最高的契合度。
`,
      score: 25,
      explanation: "从最高位开始考虑，如果当前位为 1 的数有至少两个，那么最终答案的这一位可以是 1，并保留这些数进入下一位的判断。",
      tags: ["编程题", "位运算", "贪心"],
      template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    int ans = 0;\n    vector<int> candidates = a;\n    for (int i = 30; i >= 0; i--) {\n        vector<int> next_candidates;\n        int target = ans | (1 << i);\n        for (int val : candidates) {\n            if ((val & target) == target) next_candidates.push_back(val);\n        }\n        if (next_candidates.size() >= 2) {\n            ans = target;\n            candidates = next_candidates;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
      answer: '',
    }
];

export const paperData = {
    id: '2023-12-l5',
    title: '2023年12月 GESP C++ 五级真题',
    level: 5,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `下面 C++ 代码用于求斐波那契数列，该数列第 1 、 2 项为 1 ，以后各项均是前两项之和。下面有关说法错误的是 ( ) 。`,
            options: [
                "fiboA( )用递归方式，fiboB()循环方式",
                "fiboA( )更加符合斐波那契数列的数学定义，直观易于理解",
                "fiboA( )不仅仅更加符合数学定义，直观易于理解，且因代码量较少执⾏效率更高",
                "fiboB( )虽然代码量有所增加，但其执⾏效率更高",
            ],
            answer: 2,
            score: 2,
            explanation: "递归方式 fiboA 存在大量重复计算，效率远低于循环方式 fiboB。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `下面 C++ 代码以递归方式实现合并排序。横线处应填上代码是 ( ) 。`,
            options: [
                "mergeSort(SList, T2, s, m,len), mergeSort(SList, T2, m,t,len)",
                "mergeSort(SList, T2, s, $m-1$,len), mergeSort(SList, T2, m+1,t,len)",
                "mergeSort(SList, T2, s, m,len), mergeSort(SList, T2, m+1,t,len)",
                "mergeSort(SList, T2, s, $m-1$,len), mergeSort(SList, T2, $m-1$,t,len)",
            ],
            answer: 2,
            score: 2,
            explanation: "归并排序将区间分为 [s, m] 和 [m+1, t]。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `阅读下面的C++代码，执⾏后其输出是( )。`,
            options: [
                "1->120<===>2->120",
                "1->120<===>1->120",
                "1->120<===>1->2->3->4->5->120",
                "1->120<===>2->3->4->5->6->120",
            ],
            answer: 3,
            score: 2,
            explanation: "考察全局变量 stepCount 的变化。第一次递归后增加，第二次从新值开始。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `下面的C++用于对 lstA 排序，使得偶数在前奇数在后，横线处应填入( )。`,
            options: [
                "isEven(lstA[j]) && !isEven(lstA[j+1])",
                "!isEven(lstA[j]) && isEven(lstA[j+1])",
                "lstA[j] > lstA[j+1]",
                "lstA[j] < lstA[j+1]",
            ],
            answer: 1,
            score: 2,
            explanation: "如果前一个是奇数且后一个是偶数，则需要交换位置（让偶数到前面）。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `下面的 C++ 代码用于将字符串保存到双向链表中，横线处应填入代码是（ ）。`,
            options: [
                "if(pHead) {p->next = pHead->next, pHead->next->prev = p;}",
                "if(pHead->next) {p->next = pHead->next, pHead->next->prev = p;}",
                "p->next = pHead->next, pHead->next->prev = p;",
                "触发异常，不能对空指针进⾏操作。",
            ],
            answer: 1,
            score: 2,
            explanation: "插入节点时需检查后继节点是否存在，避免空指针解引用。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `有关下面 C++ 代码说法正确的是（ ）。`,
            options: [
                "如果x小于 10 ，rc值也不会超过 20",
                "foo可能无限递归",
                "foo可以求出 x 和 y 的最大公共质因子",
                "foo能够求出 x 和 y 的最小公倍数",
            ],
            answer: 0,
            score: 2,
            explanation: "代码通过递归统计调用次数或特定条件。经分析，A选项表述正确。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `下面的 C++ 代码实现对 list 的快速排序，有关说法错误的是（ ）。`,
            options: [
                "qSort(less)+qSort(greater)+(vector<int>)pivot",
                "(vector<int>)pivot+(qSort(less)+qSort(greater))",
                "(qSort(less)+(vector<int>)pivot+qSort(greater))",
                "qSort(less)+pivot+qSort(greater)",
            ],
            answer: 2,
            score: 2,
            explanation: "快速排序拼接顺序应为：小于部分+基准值+大于部分。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `isPrimeA() 和 isPrimeB() 判定参数 N 是否素数，有关其时间复杂度的说法正确的是（ ）。`,
            options: [
                "isPrimeA()优于isPrimeB()",
                "isPrimeB()绝大多数情况下优于isPrimeA()",
                "isPrimeA()的最坏时间复杂度是 O(sqrt(N))",
                "isPrimeA()优于 isPrimeB()",
            ],
            answer: 1,
            score: 2,
            explanation: "isPrimeB 通常采用遍历到 sqrt(N) 的优化，比 isPrimeA 遍历到 N/2 更高效。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `下面 C++ 代码用于有序list的二分查找，有关说法错误的是（ ）。`,
            options: [
                "代码采用二分法实现有序list的查找",
                "代码采用分治算法实现有序list的查找",
                "代码采用递归方式实现有序list的查找",
                "代码采用动态规划算法实现有序list的查找",
            ],
            answer: 3,
            score: 2,
            explanation: "二分查找不属于动态规划算法。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `在_binarySearch算法中，如果lst中有N个元素，其时间复杂度是（ ）。`,
            options: [
                "$O(N)$",
                "$O(log n)$",
                "$O(n log n)$",
                "$O(N^2)$",
            ],
            answer: 1,
            score: 2,
            explanation: "二分查找的时间复杂度是 $O(log n)$。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `数组模拟整数加法处理超出大整数范围的运算。横线处应填入代码是（ ）。`,
            options: [
                "c.push_back(t % 10), t = t % 10;",
                "c.push_back(t / 10), t = t % 10;",
                "c.push_back(t / 10), t = t / 10;",
                "c.push_back(t % 10), t = t / 10;",
            ],
            answer: 3,
            score: 2,
            explanation: "t % 10 得到当前位，t / 10 得到进位。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `有关下面 C++ 代码的说法正确的是（ ）。`,
            options: [
                "上述代码构成单向链表",
                "上述代码构成双向链表",
                "上述代码构成循环链表",
                "上述代码构成指针链表",
            ],
            answer: 1,
            score: 2,
            explanation: "代码中节点包含指向前驱和后继的指针，构成双向链表。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `通讯卫星在通信⽹络系统中主要起到（）的作用。`,
            options: [
                "信息过滤",
                "信号中继",
                "避免攻击",
                "数据加密",
            ],
            answer: 1,
            score: 2,
            explanation: "卫星接收地球站发出的信号并转发，起到中继站作用。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `判断任意输入的整数 N 是否为素数的程序，下面哪个方法不合适？（ ）`,
            options: [
                "埃⽒筛法",
                "线性筛法",
                "二分答案",
                "枚举法",
            ],
            answer: 2,
            score: 2,
            explanation: "素数判定没有单调性，不能使用二分答案。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `哪种排序算法不能保证在下一趟处理时从待处理数据中选出最大或最小的数据？（ ）`,
            options: [
                "选择排序",
                "快速排序",
                "堆排序",
                "冒泡排序",
            ],
            answer: 1,
            score: 2,
            explanation: "快速排序每一趟确定一个基准值的位置，但不一定选出全局最大/最小。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `归并排序的时间复杂度是 $O(n log n)$ 。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "归并排序在最好、平均、最坏情况下都是 $O(n log n)$。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `小杨分巧克力最大边长可以使用二分法。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "虽然实际可以用二分答案，但考纲语境下该题判错，可能因‘二分法’概念界定问题。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `C++ 代码能以递归方式实现斐波那契数列。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "原题图中的代码可能缺少基准情况或逻辑有误。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `贪⼼算法可以达到局部最优，但可能不是全局最优解。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "贪心算法的特性就是局部最优选择。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `拆数程序能将非质数 N 转换成若⼲个质数的乘积。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "素数分解定理保证了这种分解的存在性。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `插入排序有时比快速排序时间复杂度更低。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "在数组几乎有序时，插入排序为 $O(N)$，快排退化可能更高。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `下面的 C++ 代码能实现⼗进制正整数 N 转换为⼋进制并输出。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "进制转换需正确处理取模和除法顺序，图中代码有误。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `对数组 arr 执行 sort 后，数据调整为有序。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "sort 默认升序排序。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `算正整数 N 有多少个因数，重复没有超过 N/2 次的循环就能算出来。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "只需要遍历到 sqrt(N) 即可找全所有因数。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `单链表和双向链表上的简单冒泡排序的复杂度相同。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "都是 $O(N^2)$。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        ...programmingQuestions
    ]
};
