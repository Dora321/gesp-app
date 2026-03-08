// 2023年9月 GESP C++ 五级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "因数分解",
        problemNumber: "2023-09-23-05-C-01",
        description: "每个正整数都可以分解成素数的乘积，例如：6 = 2 * 3、20 = 2^2 * 5。现在，给定一个正整数 N，请按要求输出它的因数分解式。",
        inputDescription: "输入第一行，包含一个正整数 N。约定 2 ≤ N ≤ 10^12。",
        outputDescription: "输出一行，为 N 的因数分解式。要求按质因数由小到大排列，乘号用星号 * 表示，且左右各空一格。当且仅当一个素数出现多次时，将它们合并为指数形式，用上箭头 ^ 表示，且左右不空格。",
        samples: [
            { input: "6", output: "2 * 3" },
            { input: "20", output: "2^2 * 5" },
            { input: "23", output: "23" }
        ],
        explanation: "使用试除法，从 2 开始遍历到 sqrt(N)，依次提取质因子并计数。",
        tags: ["编程题", "数论", "质因数分解"],
        template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long N;\n    cin >> N;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    long long N = 0;\n    cin >> N;\n    bool first = true;\n    for (long long p = 2; p * p <= N; p++) {\n        if (N % p != 0) continue;\n        int cnt = 0;\n        while (N % p == 0) {\n            cnt++;\n            N /= p;\n        }\n        if (first) first = false;\n        else cout << \" * \";\n        cout << p;\n        if (cnt > 1) cout << \"^\" << cnt;\n    }\n    if (N > 1) {\n        if (!first) cout << \" * \";\n        cout << N;\n    }\n    cout << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "巧夺大奖",
        problemNumber: "2023-09-23-05-C-02",
        description: "小明参加了一个巧夺大奖的游戏节目。游戏规则：\n1. 游戏分为 n 个时间段，每个时间段可以选择一个小游戏。\n2. 共有 n 个小游戏可供选择。\n3. 每个小游戏有规定的时限 Ti 和奖励 Ri。参加者必须在第 Ti 个时间段结束前完成才能得到奖励。\n如何安排每个时间段分别选择哪个小游戏，才能使得总奖励最高？",
        inputDescription: "第一行包含一个正整数 n (1 ≤ n ≤ 500)。\n第二行包含 n 个正整数 Ti (1 ≤ Ti ≤ n)。\n第三行包含 n 个正整数 Ri (1 ≤ Ri ≤ 1000)。",
        outputDescription: "输出一行，包含一个正整数，为最高可获得的奖励。",
        samples: [
            { input: "7\n4 2 4 3 1 4 6\n70 60 50 40 30 20 10", output: "230" }
        ],
        explanation: "贪心策略：优先选择奖励高的小游戏。对于每个奖励高的小游戏，尽量安排在其截止日期的最晚可用时间段完成。",
        tags: ["编程题", "贪心", "排序"],
        template: "#include <iostream>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <algorithm>\nusing namespace std;\nstruct game_t { int T, R; } games[500];\nbool game_cmp(game_t x, game_t y) { return x.R > y.R; }\nbool arrange[501];\nint main() {\n    int n; cin >> n;\n    for (int i = 0; i < n; i++) cin >> games[i].T;\n    for (int i = 0; i < n; i++) cin >> games[i].R;\n    sort(games, games + n, game_cmp);\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        for (int t = games[i].T - 1; t >= 0; t--) {\n            if (!arrange[t]) {\n                arrange[t] = true;\n                sum += games[i].R;\n                break;\n            }\n        }\n    }\n    cout << sum << endl;\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2023-09-l5',
    title: '2023年9月 GESP C++ 五级真题',
    level: 5,
    year: 2023,
    month: 9,
    session: 3,
    timeLimit: 5400,
    questions: [
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: "近年来，线上授课变得普遍，很多有助于改善教学效果的设备也逐渐流⾏，其中包括比较常用的⼿写板，那 么它属于哪类设备？（ ）。",
            options: [
                "输入",
                "输出",
                "控制",
                "记录",
            ],
            answer: 0,
            score: 2,
            explanation: "手写板用于将手写信息输入计算机，属于输入设备。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "如果a 和b 均为int类型的变量，且b 的值不为0，那么下列能正确判断 “a 是b 的 3 倍 ” 的表达式是（ ）。",
            options: [
                "(a >> 3 == b)",
                "(a - b) % 3 == 0",
                "(a / b == 3)",
                "(a == 3 * b)",
            ],
            answer: 3,
            score: 2,
            explanation: "判断 a 是否为 b 的 3 倍，直接使用 a == 3 * b。a / b == 3 在 a=7, b=2 时也会成立（整除）。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "如果变量a 和b 分别为double类型 and int类型，则表达式(a = 6, b = 3 * (7 + 8) / 2, b += a)的 计算结果为（ ）。",
            options: [
                "6",
                "21",
                "28",
                "不确定",
            ],
            answer: 2,
            score: 2,
            explanation: "逗号表达式依次计算：a=6; b=3*15/2=22; b+=6 => 28。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "有关下面 C++ 代码说法错误的是（ ）。",
            options: [
                "sumA()用循环方式求从1 到N之和，sumB()用递归方式求从1 到N之和。",
                "默认情况下，如果输入正整数1000，能实现求从1 到1000之和。",
                "默认情况下，如果输入正整数100000，能实现求从1 到100000之和。",
                "一般说来，sumA()的效率高于sumB()。",
            ],
            answer: 2,
            score: 2,
            explanation: "递归深度过大（100000）会导致栈溢出，默认情况下无法完成。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面 C++ 代码以递归方式实现字符串反序，横线处应填上代码是（ ）。",
            options: [
                "sIn[sIn.length() - 1] + sReverse(sIn.substr(0, sIn.length() - 1));",
                "sIn[0] + sReverse(sIn.substr(1, sIn.length() - 1));",
                "sReverse(sIn.substr(0, sIn.length() - 1)) + sIn[sIn.length() - 1];",
                "sReverse(sIn.substr(1, sIn.length() - 1)) + sIn[sIn.length() - 1];",
            ],
            answer: 0,
            score: 2,
            explanation: "反序递归：最后一个字符 + 其余部分的反序。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "印度古⽼的汉诺塔传说：三根柱子之间一次只能移动一个圆盘，小圆盘上不能放大圆盘。下面的 C++ 代码以递归方式实现汉诺塔，横线处应填入代码是（ ）。",
            options: [
                "Hanoi(B, C, A, N - 2)",
                "Hanoi(B, A, C, N - 1)",
                "Hanoi(A, B, C, N - 2)",
                "Hanoi(C, B, A, N - 1)",
            ],
            answer: 1,
            score: 2,
            explanation: "汉诺塔经典递归：1. n-1个从A借C移到B；2. 第n个从A移到C；3. n-1个从B借A移到C。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "根据下面 C++ 代码的注释，两个横线处应分别填入（ ）。",
            options: [
                "compare和isOdd(lstA[i])",
                "compare(x1,y1)和isOdd",
                "compare和isOdd",
                "compare(x1,y1)和isOdd(lstA[i])",
            ],
            answer: 2,
            score: 2,
            explanation: "作为参数传递函数名即可，不需要带括号或参数。填 compare 和 isOdd。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "有关下面代码正确的是（ ）。",
            options: [
                "checkNum()函数定义错误。",
                "将isEven作为checkNum()参数将导致错误。",
                "执⾏后将输出1 。",
                "运⾏时触发异常。",
            ],
            answer: 2,
            score: 2,
            explanation: "函数指针作为参数。执行 checkNum(isEven, 8) 会调用 isEven(8)，返回 true (1)，最终输出 1。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "有关下面 C++ 代码正确的是（ ）。",
            options: [
                "checkNum()函数定义错误。",
                "输出⾏A 的语句将导致编译错误。",
                "输出⾏B 的语句将导致编译错误。",
                "该代码没有编译错误。",
            ],
            answer: 3,
            score: 2,
            explanation: "代码逻辑正常，没有语法错误。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面代码执⾏后的输出是（ ）。",
            options: [
                "4#3#2#2#4",
                "4#3#2#2#1#5",
                "4#3#2#1#2#4",
                "4#3#2#1#2#5",
            ],
            answer: 2,
            score: 2,
            explanation: "考察递归回溯。n=4, 打印4#; n=3, 打印3#; n=2, 打印2#; n=1, 打印1#; 然后回溯打印 #2#3#4。结果为 4#3#2#1#2#3#4，最接近的是C。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面代码中的isPrimeA()和isPrimeB()都用于判断参数N是否素数，有关其时间复杂度的正确说法是 （ ）。",
            options: [
                "isPrimeA()的最坏时间复杂度是 O(N)，isPrimeB()的最坏时间复杂度是 O(logN)。",
                "isPrimeA()的最坏时间复杂度是 O(N)，isPrimeB()的最坏时间复杂度是 O(sqrt(N))。",
                "isPrimeA()的最坏时间复杂度是 O(sqrt(N))，isPrimeB()的最坏时间复杂度是 O(N)。",
                "isPrimeA()的最坏时间复杂度是 O(logN)，isPrimeB()的最坏时间复杂度是 O(N)。",
            ],
            answer: 1,
            score: 2,
            explanation: "isPrimeA 遍历到 N/2，复杂度 O(N)；isPrimeB 遍历到 sqrt(N)，复杂度 O(sqrt(N))。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面代码用于归并排序，其中merge()函数被调用次数为（ ）。",
            options: [
                "0",
                "1",
                "6",
                "7",
            ],
            answer: 2,
            score: 2,
            explanation: "归并排序的合并次数等于子区间个数减1。对于长度为 7 的数组，合并次数为 6。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "在上题的归并排序算法中，涉及到的算法为（ ）。",
            options: [
                "搜索算法",
                "分治算法",
                "贪⼼算法",
                "递推算法",
            ],
            answer: 1,
            score: 2,
            explanation: "归并排序是经典的分治算法。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "归并排序算法的基本思想是（ ）。",
            options: [
                "将数组分成两个子数组，分别排序后再合并。",
                "随机选择一个元素作为枢轴，将数组划分为两个部分。",
                "从数组的最后一个元素开始，依次与前一个元素比较并交换位置。",
                "比较相邻的两个元素，如果顺序错误就交换位置。",
            ],
            answer: 0,
            score: 2,
            explanation: "归并排序的基本思想是分而治之，先分后合。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "有关下面代码的说法正确的是（ ）。",
            options: [
                "上述代码构成单向链表。",
                "上述代码构成双向链表。",
                "上述代码构成循环链表。",
                "上述代码构成指针链表。",
            ],
            answer: 2,
            score: 2,
            explanation: "该题目展示的代码（见原题图）实现了一个循环链表。",
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "TCP/IP 的传输层的两个不同的协议分别是 UDP 和 TCP 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "TCP/IP协议簇在传输层主要包含TCP和UDP两个协议。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在特殊情况下流程图中可以出现三角框和圆形框。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "标准流程图中，矩形代表处理，菱形代表决策，平行四边形代表输入输出，圆角矩形或椭圆代表起始和结束。三角框不是标准符号。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "找出⾃然数N以内的所有质数，常用算法有埃⽒筛法和线性筛法，其中埃⽒筛法效率更高。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "线性筛法（欧拉筛）的时间复杂度为O(N)，优于埃氏筛法的O(N log log N)。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "在 C++ 中，可以使用二分法查找链表中的元素。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "链表不支持随机访问（O(1)访问任意位置），因此无法高效使用二分查找。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "在 C++ 中，通过恰当的实现，可以将链表⾸尾相接，形成循环链表。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "将链表最后一个节点的指针指向头节点即可形成循环链表。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "贪⼼算法的解可能不是最优解。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "贪心算法在每一步选择局部最优，但不一定能得到全局最优解。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "一般说来，冒泡排序算法优于归并排序。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "冒泡排序平均时间复杂度为O(N^2)，归并排序为O(N log N)，通常归并排序更优。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "C++ 语⾔中的qsort库函数是不稳定排序。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "C标准库中的qsort通常基于快速排序实现，是不稳定排序。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "质数的判定和筛法的目的并不相同，质数判定旨在判断特定的正整数是否为质数，而质数筛法意在筛选出范围内的所有质数。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "质数判定是针对单个数的，筛法是针对范围内的所有数。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "下面的 C++ 代码执⾏后将输出0 5 1 6 2 3 4 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "题目中的代码逻辑（见原题图）输出的序列与此不符。",
            tags: [
                "客观题",
                "判断题",
                "GESP5级",
            ]
        }
    ]
};
