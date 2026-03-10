import { l8ProgrammingByPaper } from './programming';

// 2025年3月 GESP C++ 八级真题
export const paperData = {
    id: '2025-03-l8',
    title: '2025年3月 GESP C++ 八级真题',
    level: 8,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    questions: [
        ...l8ProgrammingByPaper['2025-03-l8'],
        {
            id: 1,
            type: "single",
            question: "国家 “ 以旧换新 ” 政策仍在继续，小杨家决定在家⾥旧的冰箱、电视、洗⾐机、微波炉中选两种换新。其中， 冰箱有 4 种型号可选，电视有 6 种型号可选，洗⾐机有 3 种型号可选，微波炉有 5 种型号可选。请问小杨家共有多少种 换新的方案？（ ）。",
            options: [
                "18",
                "119",
                "238",
                "360",
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
            question: "小杨和 3 位朋友约好一起去看电影 “ 哪吒 2” 。打开购票软件，他们发现，已经没有同一排连续的四个座位了 （图中每个方框代表一个座位，红⾊方框代表已经售出）。朋友们商量了一下，决定分为两组，每组两⼈在同一排 的相邻两个座位，且两组之间⾄少有一对座位是前后相邻的。请问共有多少种购票方案？（ ）。",
            options: [
                "495",
                "96",
                "7",
                "4",
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
            id: 3,
            type: "single",
            question: "下面关于 C++ 类构造和析构函数的说法，错误的是（ ）。",
            options: [
                "构造函数不能声明为虚函数。",
                "析构函数必须声明为虚函数。",
                "类的默认构造函数可以被声明为 private 。",
                "类的析构函数可以被声明为 private 。",
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
            id: 4,
            type: "single",
            question: "下列关于树和图的说法，错误的是（ ）。",
            options: [
                "树是一种有向无环图，有向无环图都是一棵树。",
                "如果把树看做有向图，每个节点指向其子节点，则该图是弱连通图。",
                "n 个顶点且连通的无向图，其最小生成树一定包含 n - 1 条边。",
                "n 个顶点、m 条边的有向图，若 m < n，则该图一定不是强连通的。",
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
            id: 5,
            type: "single",
            question: "从 1 到 2025 这 2025 个数中，包含数字 5 的个数（ ）。",
            options: [
                "600",
                "601",
                "602",
                "603",
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
            id: 6,
            type: "single",
            question: "已定义double类型的变量r和theta，分别表⽰图中圆半径和圆⼼角。下列表达式中可以求出弦长s的 是（ ）。",
            options: [
                "r * cos(theta)",
                "r * cos(theta / 2) * 2",
                "r * sin(theta)",
                "r * sin(theta / 2) * 2",
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
            question: "n 个节点的平衡二叉树的高度为（ ）。",
            options: [
                "⌊log₂ n⌋ + 1",
                "⌈log₂ n⌉ + 1",
                "1.44 log₂(n + 1)",
                "无法确定。",
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
            id: 8,
            type: "single",
            question: "下列关于算法的说法，错误的是（ ）。",
            options: [
                "如果有⾜够的时间和空间，枚举法能解决一切有限的问题。",
                "分治算法将原问题分为多个子问题进⾏求解，且分解出的子问题必须相互独⽴。",
                "如果能找到合理的贪⼼原则，贪⼼算法往往能够比其他方法更快求解。",
                "倍增法在搜索未知长度的有序数组时，通过动态倍增或减半步长，快速定位目标范围。",
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
            question: "神奇数字 2025 可以看成 20 和 25 的拼接，并且 20 + 25 = 45。下面程序用于统计小于 N 的这类“神奇数字”，横线处应填入的是（ ）。",
            options: [
                "nl + nr == n",
                "nl * nr == n",
                "nl == nr",
                "nl + nr == sr",
            ],
            answer: 0,
            score: 2,
            explanation: "将 n² 的十进制表示拆成左右两段，若左段对应整数 nl 与右段对应整数 nr 满足 nl + nr == n，则 n² 满足题意。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面程序的时间复杂度为（设 N 为上界，程序会枚举满足 n * n < N 的整数 n，并对 n² 的十进制表示进行分割判断）（ ）。",
            options: [
                "O(√N)",
                "O(√N log N)",
                "O(N)",
                "O(√N log² N)",
            ],
            answer: 3,
            score: 2,
            explanation: "外层 n 从 1 枚举到 √N 量级；每次要按十进制位切分字符串，分割次数与字符串长度成正比，单次分割/转换又需要 O(log N)，综合约为 O(√N log² N)。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面的欧氏筛法程序中，两个横线处应填入的分别是（ ）。",
            options: [
                "n <= MAXN；i += n",
                "n * n < N；i += n",
                "n < N；i++",
                "n <= N；i *= n",
            ],
            answer: 1,
            score: 2,
            explanation: "经典埃氏筛外层通常枚举到 n * n < N，内层从 n * n 开始按步长 n 标记合数，即 i += n。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面欧拉筛程序中，两个横线处应填入的分别是（ ）。",
            options: [
                "!isPrime[n]；n * primes[i] <= MAXN",
                "isPrime[n]；n + primes[i] <= MAXN",
                "!isPrime[i]；i * primes[n] <= MAXN",
                "isPrime[i]；n * i <= MAXN",
            ],
            answer: 0,
            score: 2,
            explanation: "欧拉筛中若 n 尚未被标记，则应先把 n 记为质数；随后枚举 primes[i]，并要求 n * primes[i] <= MAXN。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面 Floyd 算法程序的时间复杂度为（设图有 n 个顶点）（ ）。",
            options: [
                "O(n²)",
                "O(n² log n)",
                "O(n³)",
                "O(mn)",
            ],
            answer: 2,
            score: 2,
            explanation: "Floyd-Warshall 需要三重循环枚举中转点、起点和终点，因此时间复杂度为 O(n³)。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "下列程序实现了输出杨辉三角形，代码中横线部分应该填入的是（ ）。",
            options: [
                "a[j] += a[j + 1]",
                "a[j] += a[j - 1]",
                "a[j] = a[j - 1]",
                "a[j] = a[j + 1]",
            ],
            answer: 1,
            score: 2,
            explanation: "杨辉三角满足当前元素等于左上方与右上方元素之和。数组从右向左更新时，应写成 a[j] += a[j - 1]。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下列程序实现了输出杨辉三角形，其时间复杂度为（ ）。",
            options: [
                "O(n)",
                "O(n log n)",
                "O(n²)",
                "O(n³)",
            ],
            answer: 2,
            score: 2,
            explanation: "外层循环执行 n 次；两段内层循环的总迭代次数都在 1 + 2 + ... + n 这一量级，因此整体时间复杂度为 O(n²)。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "表达式 '5' - 3.0 的结果为 2.0，且结果类型为 double。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "字符 '5' 的 ASCII 码为 53，因此 '5' - 3.0 的结果是 50.0，而不是 2.0。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 语⾔中，如果想要在一个函数内调用一个类的私有方法，可以在该类中将该函数声明为友元函数。",
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
            id: 18,
            type: "judge",
            question: "插入排序一般是稳定的。",
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
            question: "5 个相同的红球和 4 个相同的蓝球排成一排，要求蓝球不能相邻，则一共有 15 种排列方案。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "先排 5 个红球，会形成 6 个可插入蓝球的空位；从中选 4 个放置蓝球，共 C(6, 4) = 15 种。" ,
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "使用 math.h 或 cmath 头文件中的函数，表达式 pow(2, 5) 的结果类型为 int、值为 32。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "pow 的返回类型是 double；虽然数值是 32，但题干中的“结果类型为 int”错误。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "C++ 是一种面向对象编程语言，C 则不是。多态是面向对象三大特性之一，虚函数是动态多态的代表特性。因此，使用 C 语言无法实现虚函数。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "C 语言虽然没有原生虚函数机制，但可以用结构体加函数指针模拟动态分发。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "在 n 个节点的平衡二叉树中查找指定元素的最差时间复杂度为 O(log n)。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "平衡二叉树的高度为 O(log n)，最差查找复杂度也为 O(log n)。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "定义 int 类型的变量 a 和 b，求二次函数 y = x^2 + ax + b 取最小值时 x 的值，可以通过表达式 -a / 2.0 求得。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "二次函数 y = x^2 + ax + b 的对称轴为 x = -a / 2，因此最小值点横坐标可写为 -a / 2.0。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "判断无向图中是否有环，可以通过广度优先搜索实现。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "BFS 遍历无向图时，若访问到一个已访问且不是当前节点父节点的邻点，就说明图中存在环。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "从 32 名学生中选出 4 人分别担任班长、副班长、学习委员和组织委员，共有 A(32, 4) 种不同的选法。",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "四个职务互不相同，选法应为排列数 A(32, 4) = 32 × 31 × 30 × 29；若题干中填入的不是这个值，则判断为错误。",
            tags: [
                "客观题",
                "判断题",
                "GESP8级",
            ]
        }
    ]
};
