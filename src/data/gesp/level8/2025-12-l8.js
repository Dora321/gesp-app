import { l8ProgrammingByPaper } from './programming.js';

// 2025年12月 GESP C++ 八级真题
export const paperData = {
    id: '2025-12-l8',
    title: '2025年12月 GESP C++ 八级真题',
    level: 8,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        ...l8ProgrammingByPaper['2025-12-l8'],
        {
            id: 1,
            type: "single",
            question: "某平台生成 “ 取件码 ” 由 6 个字符组成：前 4 位为数字（0– 9），后 2 位为大写字母（A– Z），其中字母不能 为 I、O。假设数字和字母均可重复使用，要求整个取件码中恰好有 2 个数字为奇数。共有多少种不同取件码？（ ）",
            options: [
                "1,440,000",
                "2,160,000",
                "2,535,000",
                "8,640,000",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下列代码实现了归并排序（ Merge Sort ）的分治部分。为了正确地将数组 a 的 [left, right] 区间进⾏ 排序，横线处应该填入的是（ ）。",
            options: [
                "merge_sort(a, mid, right)",
                "merge_sort(a, mid+1, right)",
                "merge_sort(a, left, mid+1)",
                "merge_sort(a, mid-1, right)",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "某社团有男生 8 ⼈、⼥生 7 ⼈。现需选出 1 名队长（性别不限）、 1 名副队长（性别不限）、 2 名宣传委员（两 ⼈无角⾊区别，且必须⾄少 1 名⼥生）。假如一⼈不能兼任多职，共有多少种不同选法？（ ）",
            options: [
                "12012",
                "11844",
                "12474",
                "11025",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "二项式 $(x-2)^8$ 的展开式中 $x^6$ 项的系数为（ ）。",
            options: [
                "-7168",
                "7168",
                "-1792",
                "1792",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下面是使用邻接矩阵实现的 Dijkstra 算法的核⼼⽚段，用于求单源最短路径。在找到当前距离起点最近的顶点 u 后，需要更新其邻接点 j 的距离。横线处应填入的代码是（ ）。",
            options: [
                "dis[j] < dis[u]+graph[u][j]",
                "dis[j] > dis[u]+graph[u][j]",
                "graph[u][j] > dis[u]+dis[j]",
                "dis[j] > graph[u][j]",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下面程序使用动态规划求两个字符串的最长公共子序列（ LCS ）长度，横线处应填入的是（ ）。",
            options: [
                "$dp[i]$[j] = dp[i-1][j]+$dp[i]$[j-1];",
                "$dp[i]$[j] = min(dp[i-1][j], $dp[i]$[j-1]);",
                "$dp[i]$[j] = max(dp[i-1][j], $dp[i]$[j-1]);",
                "$dp[i]$[j] = max(dp[i-1][j], $dp[i]$[j-1])+1;",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "已知两个点 和 在平面直角坐标系中的坐标。下列 C++ 表达式中，能正确计算这两点之间 直线距离的是（ ）。",
            options: [
                "sqrt((x1-x2) ^ 2+(y1-y2) ^ 2)",
                "sqrt(pow(x1-x2, 2)+pow(y1-y2, 2))",
                "pow(x1-x2, 2)+pow(y1-y2, 2)",
                "abs(x1-x2)+abs(y1-y2)",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "已知 int a = 10;，执⾏ int &b = a; b = 20; 后，变量 a 的值是（ ）。",
            options: [
                "10",
                "20",
                "30",
                "编译错误",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下列代码的时间复杂度（以 为⾃变量，忽略常数与低阶项）是（ ）。",
            options: [
                "[待补充选项]",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下列程序实现了线性筛法（欧拉筛），用于在 时间内求出 之间的所有质数。为了保证每个合数 只被其最小质因子筛掉，横线处应填入的语句是（ ）。",
            options: [
                "i+primes[j] == n",
                "primes[j] > i",
                "i % primes[j] == 0",
                "i % primes[j] != 0",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "在 C++ 语⾔中，关于类的继承和访问权限，下列说法正确的是（ ）。",
            options: [
                "派生类可以访问基类的 private 成员。",
                "基类的 protected 成员在私有继承（ private inheritance ）后，在派生类中变为 public。",
                "派生类对象在创建时，会先调用基类的构造函数，再调用派生类⾃⼰的构造函数。",
                "派生类对象在销毁时，会先调用基类的析构函数，再调用派生类⾃⼰的析构函数。",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "当输入 6 时，下列程序的输出结果为（ ）。",
            options: [
                "14",
                "27",
                "28",
                "15",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "从 1 到 999 这 999 个正整数中，⼗进制表⽰中数字 5 恰好出现一次的数有多少个？（ ）",
            options: [
                "243",
                "271",
                "300",
                "333",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "当输入 2023 时，下列程序的输出结果为（ ）。",
            options: [
                "7",
                "8",
                "9",
                "11",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "对连通无向图执⾏ Kruskal 算法。已按边权从小到大依次扫描到某条边 。此时在已经构建的部分 MST 结构中， 已在同一连通块内。关于边 的处理，下列说法正确的是（ ）。",
            options: [
                "必须选入 MST ，否则可能不连通。",
                "一定不能选入 MST （在此扫描顺序下）。",
                "若后续出现更大的边权，可以回溯改选 。",
                "只有当 是当前最小边时才能舍弃。",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "若一项任务可用两种互斥方案完成：方案 A 有 $n$ 种做法，方案 B 有 $m$ 种做法，则总做法数为 $n+m$。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 语⾔中，引用一旦被初始化，就不能再改为引用另一个变量。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "快速排序和归并排序的平均时间复杂度都是 $O(n \\log n)$，但快速排序是不稳定的排序算法，归并排序是稳定的排序算法。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "使用 math.h 或 cmath 头文件中的函数，表达式 sqrt(4) 的结果类型为 double。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "在杨辉三角形中，第 $n$ 行（从 0 开始计数，即第 $n$ 行有 $n+1$ 个数）的所有数字之和等于 $2^n$。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "使用二叉堆优化的 Dijkstra 最短路算法，在某些特殊情况下时间复杂度不如朴素实现的 $O(v^2)$。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "$n$ 个不同元素依次入栈的出栈序列数与将 $n$ 个不同元素划分成若干非空子集的方案数不相等。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "快速排序在最坏情况下的时间复杂度为 $O(N^2)$，可以通过随机化选择基准值（pivot）的方法完全避免退化。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "在 C++ 语⾔中，一个类可以拥有多个构造函数，也可以拥有多个析构函数。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "求两个序列的最长公共子序列（ LCS ）时，使用滚动数组优化空间后，仍然可以还原出具体的 LCS 序列。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        }
    ]
};
