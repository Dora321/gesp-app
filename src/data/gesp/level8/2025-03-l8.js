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
                "个顶点且连通的无向图，其最小生成树一定包含 个条边。",
                "个顶点、 条边的有向图，一定不是强连通的。",
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
            question: "个节点的平衡二叉树的高为（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
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
            question: "下面程序横线处应填入的是（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
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
            id: 10,
            type: "single",
            question: "下面程序的时间复杂度为（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
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
            id: 11,
            type: "single",
            question: "下面的欧⽒筛法程序中，两个横线处应填入的分别是（ ）。",
            options: [
                "选项A",
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
            id: 12,
            type: "single",
            question: "下面欧拉筛程序中，两个横线处应填入的分别是（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
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
            id: 13,
            type: "single",
            question: "下面 Floyd 算法程序的时间复杂度为（ ）。",
            options: [
                "选项A",
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
            id: 14,
            type: "single",
            question: "下列程序实现了输出杨辉三角形，代码中横线部分应该填入的是（ ）。",
            options: [
                "if (i == j) map[i][j] = 0; else map[i][j] = INF; } } for (int i = 1; i <= m; i++) { cin >> t1 >> t2 >> t3; map[t1][t2] = t3; } for (int k = 1; k <= n; k++) for (int i = 1; i <= n; i++) for (int j = 1; j <= n; j++) if (map[i][j] > map[i][k] + map[k][j]) ________; // 在此处填入选项 for (int i = 1; i <= n; i++) { for (int j = 1; j <= n; j++) { cout.width(4); cout << map[i][j]; } cout << endl; } } 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 #include <iostream> using namespace std; #define N 35 int a[N]; int main() { int n; cin >> n; for (int i = 0; i < n; i++) { a[i] = 1; for (int j = i - 1; j > 0; j--) ________; // 在此处填入选项 for (int j = 0; j <= i; j++) cout << a[j] << \" \"; cout << endl; } return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 a[j] += a[j + 1]1 题号 1 2 3 4 5 6 7 8 9 10 答案",
                "选项B",
                "选项C",
                "选项D",
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
            id: 15,
            type: "single",
            question: "下列程序实现了输出杨辉三角形，其时间复杂度为（ ）。",
            options: [
                "选项A",
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
            id: 16,
            type: "judge",
            question: "表达式'5' - 3.0的结果为2.0，类型为double。",
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
            id: 20,
            type: "judge",
            question: "使用 math.h 或 cmath 头文件中的函数，表达式 pow(2, 5) 的结果类型为 int、值为 32。",
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
            question: "C++ 是一种面向对象编程语⾔， C 则不是。多态是面向对象三大特性之一，虚函数是动态多态的代表特性。 因此，使用 C 语⾔无法实现虚函数。",
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
            question: "在 个节点的平衡二叉树中查找指定元素的最差时间复杂度为 。",
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
            question: "定义int类型的变量a和b，求二次函数 取最小值时 x 的值，可以通过表达式-a / 2.0求 得。",
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
            question: "判断无向图中是否有环，可以通过⼴度优先搜索实现。",
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
            question: "从 32 名学生中选出 4 ⼈分别担任班长、副班长、学习委员和组织委员，共有 种不同的选法。",
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
