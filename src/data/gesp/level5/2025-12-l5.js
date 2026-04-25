// 2025年12月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `6
1 2 1 3 2 3`, output: `2` }
      ],
      referenceCode: '// 待补充',
      question: `
# [GESP202512 五级] 数字移动

## 题目描述

小 A 有一个包含 $N$ 个正整数的序列 $A=\\{A_1,A_2,\\cdots,A_N\\}$，序列 $A$ 恰好包含 $\\frac{N}{2}$ 对不同的正整数。形式化地，对于任意 $1 \\le i \\le N$，存在唯一一个 $j$ 满足 $1\\le j \\le N, i\\neq j, A_i=A_j$。

小 A 希望每对相同的数字在序列中相邻，为了实现这一目的，小 A 每次操作会选择任意 $i(1\\le i\\le N)$，将当前序列的第 $i$ 个数字移动到任意位置，并花费对应数字的体力。

例如，假设序列 $A=\\{1,2,1,3,2,3\\}$，小 A 可以选择 $i=2$，将 $A_2=2$ 移动到 $A_3=1$ 的后面，此时序列变为 $\\{1,1,2,3,2,3\\}$，耗费 $2$ 点体力。小 A 也可以选择 $i=3$，将 $A_3=1$ 移动到 $A_2=2$ 的前面，此时序列变为 $\\{1,1,2,3,2,3\\}$，花费 $1$ 点体力。

小 A 可以执行任意次操作，但他希望自己每次花费的体力尽可能小。小 A 希望你能帮他计算出一个最小的 $x$，使得他能够在每次花费的体力均不超过 $x$ 的情况下令每对相同的数字在序列中相邻。

## 输入格式

第一行一个正整数 $N$，代表序列长度，保证 $N$ 为偶数。

第二行包含 $N$ 个正整数 $A_1,A_2,\\ldots,A_N$，代表序列 $A$。且对于任意 $1\\le i\\le N$，存在唯一一个 $j$ 满足 $1\\le j\\le N,i\\neq j,A_i=A_j$。

数据保证小 A 至少需要执行一次操作。

## 输出格式

输出一行，代表满足要求的 $x$ 的最小值。
`,
      score: 25,
      explanation: "二分答案 x。把所有大于 x 的数按原顺序保留下来：由于这些数无法被移动，所以若最终能两两相邻，它们在保留序列中必须恰好按相邻成对出现。检验该条件即可。",
      tags: ["编程题", "二分答案", "贪心"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\nusing namespace std;\nconst int N = 100010;\nint a[N];\nint b[N];\nint pos;\nint main(){\n    int n;\n    cin >> n;\n    for(int i = 0; i < n; i++) cin >> a[i];\n    int left = 1, right = 1e6, ans = 1e6;\n    while(left <= right){\n        int mid = (left+right) / 2;\n        bool possible = true;\n        pos = 0;\n        for(int i = 0; i < n; i++) {\n            if(a[i] > mid) b[pos++] = a[i];\n        }\n        for(int i = 0; i < pos; i += 2){\n            if(b[i] != b[i+1]) {\n                possible = false;\n                break;\n            }\n        }\n        if(possible){\n            ans = mid;\n            right = mid-1;\n        } else {\n            left = mid+1;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
10 6 35 105 42`, output: `8` }
      ],
      referenceCode: '// 待补充',
      question: `
# [GESP202512 五级] 相等序列

## 题目描述

小 A 有一个包含 $N$ 个正整数的序列 $A=\\{A_1,A_2,\\ldots,A_N\\}$。小 A 每次可以花费 $1$ 个金币执行以下任意一种操作：

- 选择序列中一个正整数 $A_i$（$1\\le i\\le N$），将 $A_i$ 变为 $A_i\\times P$，$P$ 为任意质数；
- 选择序列中一个正整数 $A_i$（$1\\le i\\le N$），将 $A_i$ 变为 $\\frac{A_i}{P}$，$P$ 为任意质数，要求 $A_i$ 是 $P$ 的倍数。

小 A 想请你帮他计算出令序列中所有整数都相同，最少需要花费多少金币。

## 输入格式

第一行一个正整数 $N$，含义如题面所示。

第二行包含 $N$ 个正整数 $A_1,A_2,\\ldots,A_N$，代表序列 $A$。

## 输出格式

输出一行，代表最少需要花费的金币数量。
`,
      score: 25,
      explanation: "把每个数进行质因数分解。对每个质数单独考虑其指数序列，乘除一次相当于指数加减 1。要让总代价最小，目标指数应取该质数在所有数中的指数中位数；最后把各质数的代价累加即可。",
      tags: ["编程题", "数论", "质因数分解", "中位数"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\nusing namespace std;\nconst int N = 100010;\nint num[N][20];\nint n, a[N];\nvoid calc_prime_factor(int x){\n    for(int i = 2; i * i <= x; i++){\n        if(x % i == 0){\n            int cnt = 0;\n            while(x % i == 0){\n                x /= i;\n                cnt++;\n            }\n            num[i][cnt]++;\n        }\n    }\n    if(x > 1) num[x][1]++;\n}\nint main(){\n    scanf(\"%d\", &n);\n    for(int i = 1; i <= n; i++){\n        scanf(\"%d\", &a[i]);\n        calc_prime_factor(a[i]);\n    }\n    long long ans = 0;\n    for(int i = 2; i < 100001; i++){\n        int pos = 0;\n        for(int j = 0; j < 20; j++) pos += num[i][j];\n        num[i][0] = n-pos;\n        int median_exponent = 0;\n        pos = 0;\n        for(int j = 0; j < 20; j++){\n            pos += num[i][j];\n            if(pos * 2 >= n){\n                median_exponent = j;\n                break;\n            }\n        }\n        for(int j = 0; j < 20; j++) ans += 1ll * num[i][j] * abs(j-median_exponent);\n    }\n    printf(\"%lld\\n\", ans);\n}\n",
      answer: '',
    }
];

export const paperData = {
    id: '2025-12-l5',
    title: '2025年12月 GESP C++ 五级真题',
    level: 5,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `对如下定义的循环单链表，printList 函数横线处应填写（ ）。`,
            options: [
                "while (p != nullptr) { cout << p->data << \" \"; p = p->next; }",
                "while (p->next != nullptr) { cout << p->data << \" \"; p = p->next; }",
                "do { cout << p->data << \" \"; p = p->next; } while (p != head);",
                "for (; p; p = p->next) { cout << p->data << \" \"; }",
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
            question: `区块链中每个区块都指向前一个区块，新区块只能接在链尾。下面 addBlock 函数横线处应填写（ ）。`,
            options: [
                "Block* newBlock = new Block(tail->index+1, data, tail); tail = newBlock->prev;",
                "Block* newBlock = new Block(tail->index+1, data, tail); tail = newBlock;",
                "Block* newBlock = new Block(tail->index+1, data, tail->prev); tail = newBlock;",
                "Block* newBlock = new Block(tail->index+1, data, tail->prev); tail = newBlock->prev;",
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
            id: 3,
            type: "single",
            question: `下面关于单链表和双链表的描述中，正确的是（ ）。`,
            options: [
                "双链表删除指定结点通常是 $O(N)$，单链表也是 $O(N)$。",
                "双链表删除指定结点通常是 $O(1)$，单链表也是 $O(1)$。",
                "双链表删除指定结点通常是 $O(1)$，单链表若需先找前驱通常是 $O(N)$。",
                "双链表删除指定结点通常是 $O(N)$，单链表若已知前驱则是 $O(1)$。",
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
            id: 4,
            type: "single",
            question: `假设我们有两个数 a 和 b，它们对模 m 同余，即 $a equiv b pmod{m}$。以下哪个值不可能是 m？`,
            options: [
                "3",
                "4",
                "6",
                "9",
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
            id: 5,
            type: "single",
            question: `下面代码实现了欧几里得算法。下面有关说法，错误的是（ ）。`,
            options: [
                "gcd1() 实现为递归方式。",
                "gcd2() 实现为迭代方式。",
                "当输入较大时，gcd1() 会多次递归调用自身，需要额外的栈空间。",
                "当输入较大时，gcd1() 的实现一定比 gcd2() 的迭代实现更高效。",
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
            id: 6,
            type: "single",
            question: `唯一分解定理描述的内容是（ ）。`,
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
            id: 7,
            type: "single",
            question: `下述代码实现素数表的线性筛法，筛选出所有小于等于 n 的素数，则横线上应填的代码是（ ）。`,
            options: [
                "for (int j = 0; j < primes.size() && i * primes[j] <= n; j++)",
                "for(int j = $sqrt{n}$; j <= n && i * primes[j] <= n; j++)",
                "for (int j = 1; j <= $sqrt{n}$; j++)",
                "for(int j = 1; j < n && i * primes[j] <= n; j++)",
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
            id: 8,
            type: "single",
            question: `下列关于排序的说法，正确的是（ ）。`,
            options: [
                "快速排序是稳定排序",
                "归并排序通常是稳定的",
                "插入排序是不稳定排序",
                "冒泡排序不是原地排序",
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
            question: `下面代码实现了归并排序。下述关于归并排序的说法中，不正确的是（ ）。`,
            options: [
                "归并排序的平均时间复杂度是 $O(n log n)$。",
                "归并排序通常需要 $O(N)$ 的额外空间。",
                "归并排序在最坏情况下的时间复杂度是 $O(N^2)$。",
                "归并排序适合大规模数据。",
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
            question: `下述 C++ 代码实现了快速排序算法，最坏情况的时间复杂度是（ ）。`,
            options: [
                "$O(log n)$",
                "$O(N)$",
                "$O(N^2)$",
                "$O(n log n)$",
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
            id: 11,
            type: "single",
            question: `下面代码尝试在有序数组中查找第一个大于等于 x 的元素位置。如果没有大于等于 x 的元素，返回 arr.size()。以下说法正确的是（ ）。`,
            options: [
                "上述代码逻辑正确",
                "上述代码逻辑错误，while 循环条件应该用 l <= r",
                "上述代码逻辑错误，mid 计算错误",
                "上述代码逻辑错误，边界条件不对",
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
            question: `小杨要把一根长度为 L 的木头切成 K 段，使得每段长度小于等于 x。已知每切一刀只能把一段木头分成两段，他用二分法找到满足条件的最小 x（x 为正整数），则横线处应填写（ ）。`,
            options: [
                "if (check(L, K, mid)) r = mid; else l = mid+1;",
                "if (check(L, K, mid)) r = mid+1; else l = mid+1;",
                "if (check(L, K, mid)) r = mid+1; else l = mid-1;",
                "if (check(L, K, mid)) r = mid+1; else l = mid;",
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
            id: 13,
            type: "single",
            question: `下面给出了阶乘计算的递归与迭代两种方式。以下说法正确的是（ ）。`,
            options: [
                "两种实现方式的时间复杂度相同，都是 $O(N)$。",
                "两种实现方式的空间复杂度相同，都是 $O(1)$。",
                "两种实现方式的空间复杂度相同，都是 $O(N)$。",
                "factorial1() 的时间复杂度为 $O(1)$，factorial2() 的时间复杂度为 $O(N)$。",
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
            question: `任务调度问题中，按利润从高到低排序后，若找到可用时间槽 t，则横线处应填写（ ）。`,
            options: [
                "slot[t] = true; totalProfit += task.profit;",
                "slot[t] = false; totalProfit += task.profit;",
                "slot[t] = true; totalProfit = task.profit;",
                "slot[t] = false; totalProfit = task.profit;",
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
            id: 15,
            type: "single",
            question: `下面代码实现两个数组表示的正整数高精度加法（数组低位在前），则横线处应填写（ ）。`,
            options: [
                "c.push_back(carry / 10); carry %= 10;",
                "c.push_back(carry % 10); carry /= 10;",
                "c.push_back(carry % 10);",
                "c.push_back(carry); carry /= 10;",
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
            id: 16,
            type: "judge",
            question: `数组和链表都是线性表。链表的优点是插入删除不需要移动元素，并且能随机查找。`,
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
            question: `假设函数 gcd() 能正确求两个正整数的最大公约数，则下面的 $\text{lcm}(a, b)$ 函数能正确求出正整数 a 和 b 的最小公倍数。`,
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
            question: `在单链表中，已知指针 p 指向要删除的结点（非尾结点），若想在不知道头结点的情况下删除 p，可行做法是用 p->next 的值和 next 覆盖当前结点，再删除 p->next。`,
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
            question: `在求解所有不大于 n 的素数时，线性筛法（欧拉筛）总应优先于埃氏筛法，因为它的理论时间复杂度为 $O(N)$，低于埃氏筛法的 O(n log log n)。`,
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
            question: `二分查找仅适用于有序数据。若输入数据无序，当仅进⾏一次查找时，为了使用二分而排序通常不划算。`,
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
            question: `通过在数组的第一个、最中间和最后一个这 3 个数据中选择中间值作为枢轴（比较基准），快速排序算法可降低落入最坏情况的概率。`,
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
            question: `贪⼼算法在每一步都做出当前看来最优的局部选择，并且一旦做出选择就不再回溯；而分治算法将问题分解 为若⼲子问题分别求解，再将子问题的解合并得到原问题的解。`,
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
            id: 23,
            type: "judge",
            question: `以下 fib 函数计算第 n 项斐波那契数（fib(0)=0, fib(1)=1），其时间复杂度为指数级。`,
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
            question: `递归函数一定要有终止条件，否则可能会造成栈溢出。`,
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
            question: `使用贪心算法解决问题时，只做每一步的局部最优选择，并不一定能得到全局最优解。`,
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
