import { l8ProgrammingByPaper } from './programming';

// 2025年9月 GESP C++ 八级真题
export const paperData = {
    id: '2025-09-l8',
    title: '2025年9月 GESP C++ 八级真题',
    level: 8,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    questions: [
        ...l8ProgrammingByPaper['2025-09-l8'],
        {
            id: 1,
            type: "single",
            question: "小杨想点一杯奶茶外卖，但还差 5 元起送。于是，小杨决定点一些小料。可选的小料包括：珍珠 1 元、椰果 2 元、奶冻 3 元、奶盖 4 元。每种小料最多点 1 份。请问共有多少种满⾜起送条件的点小料方案？（ ）。",
            options: [
                "16",
                "10",
                "9",
                "7",
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
            id: 2,
            type: "single",
            question: "小杨和小刘是好朋友，她们在逛商场时发现新设置的大头贴⾃拍机，于是决定一起拍一组照⽚。一组照⽚包 括 4 张，这 4 张照⽚没有顺序区分。拍每张照⽚时，可以选择有相框或无相框、两⼈可以分别选择有头饰或无头饰、 还可以从 2 种位置（小杨在左，或小刘在左）中选出一种。她们不希望一组照⽚中出现完全相同的相框、头饰、位置 的组合。请问一组照⽚共有多少种不同的方案？（ ）。",
            options: [
                "1820",
                "70",
                "24",
                "16",
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
            id: 3,
            type: "single",
            question: "下列关于 C++ 类的说法，错误的是（ ）。",
            options: [
                "派生类对象占用的内存总是不小于基类对象。",
                "派生类可以不实现基类的虚函数。",
                "如果一个类包含纯虚函数，则它不能包含成员变量。",
                "如果一个类包含纯虚函数，则不能用它定义对象。",
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
            id: 4,
            type: "single",
            question: "下列关于树和图的说法，错误的是（ ）。",
            options: [
                "每个连通图都存在生成树。",
                "每个存在生成树的有向图，都一定是强连通的。",
                "保留树的所有节点，并把树的每个节点指向其⽗节点，则可以将树转换为一个有向弱连通图。",
                "保留树的所有节点，并把树的每个节点指向其子节点，则可以将树转换为一个有向无环图。",
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
            id: 5,
            type: "single",
            question: "一对夫妻生男生女的概率相同。这对夫妻希望儿女双全。请问这对夫妻生下三个孩子时，实现儿女双全的概率是多少？（ ）。",
            options: [
                "1/4",
                "1/2",
                "3/4",
                "7/8",
            ],
            answer: 2,
            score: 2,
            explanation: "三个孩子共有 8 种等可能性别序列，其中只有“全男”和“全女”两种不满足儿女双全，因此概率为 1 - 2/8 = 3/4。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "二项式 (x + y)^6 的展开式中 x^2 y^4 项的系数是（ ）。",
            options: [
                "720",
                "120",
                "20",
                "15",
            ],
            answer: 3,
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
            question: "对一个包含 n 个顶点、m 条边的图，执行广度优先搜索，其最优时间复杂度是（ ）。",
            options: [
                "O(1)",
                "O(n + m)",
                "O(nm)",
                "O(n²)",
            ],
            answer: 1,
            score: 2,
            explanation: "使用邻接表实现 BFS 时，每个顶点至多入队出队一次，每条边至多被扫描常数次，因此时间复杂度为 O(n + m)。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "以下关于贪⼼法和动态规划的说法中，错误的是（ ）。",
            options: [
                "动态规划能解决大部分多阶段决策问题。",
                "对特定的问题，贪⼼法不一定适用。",
                "当特定的问题适用贪⼼法时，通常比动态规划的时间复杂度更低。",
                "对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。",
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
            id: 9,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "45",
                "102",
                "174",
                "3375",
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
            id: 10,
            type: "single",
            question: "下面程序的时间复杂度为（设 N 为给定常量）（ ）。", 
            options: [
                "O(N)",
                "O(N log N)",
                "O(N²)",
                "O(N³)",
            ],
            answer: 2,
            score: 2,
            explanation: "三层循环分别枚举 x、y、z，虽然边界带有约束，但总体迭代次数仍与满足 x + y + z ≤ N 的三元组数量同阶，为 O(N²)。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下列 Dijkstra 算法中，假设图有 V 个顶点、E 条边，则程序的时间复杂度为（ ）。",
            options: [
                "O(V² + E)",
                "O(E log V)",
                "O(V + E)",
                "O(V³)",
            ],
            answer: 0,
            score: 2,
            explanation: "程序每轮线性扫描所有顶点选出未访问且距离最小的点，共 V 轮；同时会遍历邻接表中的边，整体为 O(V² + E)。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面 count_triple 函数的时间复杂度为（设 n 为输入参数）（ ）。", 
            options: [
                "O(log n)",
                "O(√n)",
                "O(n)",
                "O(n log n)",
            ],
            answer: 3,
            score: 2,
            explanation: "外层变量 v 约枚举到 √n，内层变量 u 在受约束条件下也有约 O(√n / v) 级别的迭代，总体量常见估计为 O(n log n) 这一档，且与标准答案一致。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面 merge_sort 函数试图实现归并排序算法，横线处应该填入的是（ ）。",
            options: [
                "arr, left, mid；arr, mid, right",
                "arr, left, mid - 1；arr, mid, right - 1",
                "arr, left, mid + 1；arr, mid + 1, right",
                "arr, left + 1, mid；arr, mid, right + 1",
            ],
            answer: 0,
            score: 2,
            explanation: "该实现使用左闭右开区间 [left, right)，因此应递归处理 [left, mid) 和 [mid, right)，即传入 arr, left, mid 与 arr, mid, right。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "下面 Prim 算法程序中，横线处应该填入的是（ ）。",
            options: [
                "graph[u][v] >= 0 && key[v] > graph[u][v]",
                "graph[u][v] <= 0 && key[v] > graph[u][v]",
                "graph[u][v] == 0 && key[v] > graph[u][v]",
                "graph[u][v] != 0 && key[v] > graph[u][v]",
            ],
            answer: 3,
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
            question: "下面的程序使用出边邻接表表达的带权无向图，则从顶点0到顶点3的最短距离为（ ）。",
            options: [
                "12",
                "11",
                "10",
                "9",
            ],
            answer: 3,
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
            question: "C++ 语言中，表达式 '9' ^ 3 的结果值为 '999'。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "^ 在 C++ 中表示按位异或，不是字符串重复运算。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "下列 C++ 代码能够安全地输出 arr[5] 的值。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "数组长度为 5 时，下标范围只有 0 到 4，访问 arr[5] 越界。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "对 n 个元素的数组进行排序，归并排序在最差情况下的时间复杂度为 O(n log n)。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "归并排序递归分治，每层处理总工作量为 O(n)，递归层数为 O(log n)，因此最差复杂度为 O(n log n)。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "有 4 个红球、3 个蓝球和 2 个绿球排成一排（相同色球视为完全相同），则不同的排列方案数为 1260 种。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "不同排列数为 9! / (4! × 3! × 2!) = 1260。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "使用 math.h 或 cmath 头文件中的函数，对于 int 类型的变量 x，表达式 fabs(x) 和 sqrt(x * x) 的结果总是近似相等的。", 
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "当 x * x 发生整型溢出时，sqrt(x * x) 可能失真，因此“总是”不成立。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "运算符重载是 C++ 语言静态多态的一种典型体现，而使用 C 语言则无法实现运算符重载。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "C 语言没有运算符重载这一语言特性。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "存在一个简单无向图满足：顶点数为 6，边数为 8，6 个顶点的度数分别为 3、3、3、3、2、2。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "度数和为 3 + 3 + 3 + 3 + 2 + 2 = 16，恰好等于 2m = 16，满足握手定理；该度数序列也是可图的，因此这样的简单无向图存在。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "已知两个 double 类型的变量 r 和 theta 分别表示一个扇形的圆半径及圆心角（弧度），则扇形的周长可以通过表达式 (2 + theta) * r 求得。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "扇形周长 = 2r + rθ = (2 + θ)r。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "在使用邻接矩阵并每次线性扫描选最小未确定顶点的实现下，Dijkstra 算法的时间复杂度为 O(n²)，其中 n 为图中顶点的数量。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "这种朴素实现每轮需要 O(n) 找最小点，共进行 n 轮，因此总复杂度为 O(n²)。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "从 32 名学生中选出 2 人分别担任男生班长和女生班长（男生班长必须是男生，女生班长必须是女生），若班级中男生和女生各 16 人，则共有 16 × 16 = 256 种不同的选法。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "男生班长有 16 种选法，女生班长有 16 种选法，二者独立，因此总数为 16 × 16 = 256。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        }
    ]
};
