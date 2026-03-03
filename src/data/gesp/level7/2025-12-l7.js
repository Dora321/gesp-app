// 2025年12月 GESP C++ 七级真题
export const paperData = {
    id: '2025-12-l7',
    title: '2025年12月 GESP C++ 七级真题',
    level: 7,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面关于 C++ 中形参、实参和定义域的说法中，正确的一项是（ ）。",
            options: [
                "形参是函数定义时所指定的变量，它只在函数内部有效。",
                "在函数内部，可以修改传入的形参的值，即使该形参是一个常量引用。",
                "实参和形参的类型必须完全一致，否则会导致编译错误。",
                "使用指针作为形参时，形参是指向实参的地址，因此对该指针赋值会影响实参。",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "已知三个序列：s1 = {3, 1, 8, 2, 5, 6, 7, 4}， s2 = {1, 5, 1, 8, 6, 4, 7, 5, 6}， s3 = {1, 8, 3, 5, 7, 6, 2, 4}。以下哪个序列是它们的最长公共子序列（ ）。",
            options: [
                "{1, 8, 5, 6}",
                "{1, 5, 6, 7}",
                "{1, 8, 6}",
                "{1, 5, 7, 4}",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "现有一个地址区间为 的哈希表，当出现冲突情况，会往后找第一个空的地址存储（到 冲突了就从 开始往后），现在要依次存储 ，哈希函数为 。其中 存储在哈希表哪个地址中 （ ）。",
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
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "在 0/1 背包问题中，给定一组物品，每个物品有一个重量和价值，背包的容量有限。假设背包的最大容量为 ，物品的数量为 ，其中第个物品的重量为 ，价值为 。以下关于 0/1 背包问题的描述，正确的是（ ）。",
            options: [
                "在解决 0/1 背包问题时，使用贪⼼算法可以保证找到最优解，因为物品只能放入一次。",
                "0/1 背包是 P 问题（多项式时间可解问题），它可以在 的时间复杂度内解决。",
                "0/1 背包问题中，动态规划解法的空间复杂度为 ，但可以通过滚动数组技巧将空间复杂度优化到 。",
                "0/1 背包问题中，每个物品只能选择一次，并且子问题之间是独⽴的，无法重用计算结果。",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "一棵深度为 6 （根节点深度为 1 ）的完全二叉树，节点总数最少有（ ）。 第 1 页 / 共 9 页",
            options: [
                "31",
                "32",
                "63",
                "64",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "对于如下二叉树，下面关于访问的顺序说法错误的是（ ）。",
            options: [
                "D E B F H J I G C A 是它的后序遍历序列。",
                "A B C D E F G H I J 是它的⼴度优先遍历序列。",
                "A B D E C F G H I J 是它的先序遍历序列。",
                "D B E A F C H G J I 是它的中序遍历序列。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下面程序的运⾏结果为（ ）。",
            options: [
                "2",
                "3",
                "4",
                "5",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面程序中，函数 query 的时间复杂度是（ ）。 #include <iostream> int query(int n, int *a, int x) { int l = 0, r = n; while (l < r) { int mid = l + (r - l) / 2; if (a[mid] >= x) r = mid; else l = mid + 1; } if (l == n) return -1; return l; } int main() { int n = 10; int x = 3; int num[] = {1, 2, 2, 3, 3, 4, 5, 5, 6, 7}; std::cout << query(n, num, x) << \"\n\"; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 第 2 页 / 共 9 页",
            options: [
                "选项A",
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
                "GESP7级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "有 5 个字符，它们出现的次数分别为 2 次、 2 次、 3 次、 3 次、 5 次。现在要用哈夫曼编码的方式来为这些字符进 ⾏编码，最小加权路径长度 WPL （每个字符的出现次数 它的编码长度，再把每个字符结果加起来）的值为（ ）。",
            options: [
                "30",
                "34",
                "43",
                "47",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面程序的运⾏结果为（ ）。",
            options: [
                "10",
                "16",
                "26",
                "30",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "一个简单无向图 有 36 条边，且每个顶点的度数都为 4 ，则图 的顶点个数为（ ）。 #include <iostream> int query(int n, int *a, int x) { int l = 0, r = n; while (l < r) { int mid = l + (r - l) / 2; if (a[mid] >= x) r = mid; else l = mid + 1; } if (l == n) return -1; return l; } int main() { int n = 10; int x = 3; int num[] = {1, 2, 2, 3, 3, 4, 5, 5, 6, 7}; std::cout << query(n, num, x) << \"\n\"; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 #include <iostream> using namespace std; int f(int n) { if (n <= 2) return n * 2; return f(n - 1) + f(n - 2); } int main() { cout << f(5) << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 第 3 页 / 共 9 页",
            options: [
                "9",
                "12",
                "18",
                "36",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面关于二叉树的说法正确的是（ ）。",
            options: [
                "任意二叉树的中序遍历与后序遍历必定不相同。",
                "对任意二叉树，若已知先序遍历与后序遍历，则该二叉树唯一确定。",
                "若二叉树有 个结点，根节点高度为 ，则其高度满⾜： 。",
                "在二叉树的先序遍历中，根后紧跟的结点一定是根的左孩子。",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "假设一个算法时间复杂度的递推式是 （ 为正整数），和 ，那么这个算法的 时间复杂度是（ ）。",
            options: [
                "选项A",
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
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "下面哪一个可能是下图的深度优先遍历序列（ ）。",
            options: [
                "1, 5, 6, 3, 2, 8, 9, 4, 7",
                "1, 5, 8, 9, 7, 4, 6, 3, 2",
                "3, 2, 1, 4, 7, 6, 9, 5, 8",
                "2, 5, 6, 3, 8, 7, 9, 4, 1",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下面这个有向图的强连通分量的个数是（ ）。",
            options: [
                "3",
                "4",
                "5",
                "6 第 4 页 / 共 9 页 题号 1 2 3 4 5 6 7 8 9 10 答案",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "C++ 语⾔中，表达式3 ^ 2的结果类型为int，值为9。",
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
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "使用cmath头文件中的正弦函数，表达式sin(90)的结果类型为double，值约为1.0。",
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
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "使用strcmp(\"10\", \"9\")比较两个字符串，返回值大于 0 ，说明\"10\"比\"9\"大。",
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
                "GESP7级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "选择排序是一种不稳定的排序算法，而冒泡排序是一种稳定的排序算法。",
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
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "求两个长度为 序列的最长公共子序列（ LCS ）长度时，可以使用滚动数组将空间复杂度从 优化到 。",
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
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "在无向图中，所有顶点的度数之和等于边数的两倍。",
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
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "使用邻接矩阵存储一个有 个顶点、 条边的图，对该图进⾏一次完整的 BFS 遍历，时间复杂度为 。",
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
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "在图像处理或游戏开发中，泛洪（ flood fill ）算法既可以用 BFS 实现，也可以用 DFS 实现。",
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
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "使用链地址法处理冲突的哈希表，当所有元素都映射到同一个槽位时，查找操作的最坏时间复杂度为 ， 其中 为元素个数。",
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
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "一个包含 个顶点的连通无向图，其任何一棵生成树都恰好包含 条边。",
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
                "GESP7级",
            ]
        }
    ]
};
