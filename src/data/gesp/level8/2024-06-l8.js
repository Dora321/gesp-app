import { l8ProgrammingByPaper } from './programming.js';

// 2024年6月 GESP C++ 八级真题
export const paperData = {
    id: '2024-06-l8',
    title: '2024年6月 GESP C++ 八级真题',
    level: 8,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 5400,
    questions: [
        ...l8ProgrammingByPaper['2024-06-l8'],
        {
            id: 1,
            type: "single",
            question: "GESP 活动期间，举办方从获胜者 ABCDE 五个⼈中选出三个⼈排成一队升国旗，其中 A 不能排在队⾸，请问 有多少种排法？",
            options: [
                "24",
                "48",
                "32",
                "12",
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
            question: "7 进制数 235 转换成 3 进制数是（ ）。",
            options: [
                "11121",
                "11122",
                "11211",
                "11112",
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
            question: "0,1,2,3,4,5 这些数字组成一个三位数，请问没有重复数字的情况下，有多少种组法（ ）。",
            options: [
                "180",
                "120",
                "80",
                "100",
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
            id: 4,
            type: "single",
            question: "有 V 个顶点、 E 条边的图的深度优先搜索遍历时间复杂度为（ ）。",
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
            id: 5,
            type: "single",
            question: "一对夫妻生男生⼥的概率相同。已知这对夫妻有两个孩子，其中一个是⼥孩，另一个是男孩的概率是多少？",
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
            id: 6,
            type: "single",
            question: "从 1 到 2024 这 2024 个数中，共有（ ）个包含数字 6 的数。",
            options: [
                "544",
                "546",
                "564",
                "602",
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
            id: 7,
            type: "single",
            question: "二进制数100.001转换成⼗进制数是（ ）。",
            options: [
                "4.25",
                "4.125",
                "4.5",
                "4.75",
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
            question: "以下函数声明，哪个是符合 C++ 语法的？（ ）。",
            options: [
                "void BubbleSort(char a[][], int n);",
                "void BubbleSort(char a[][20], int n);",
                "void BubbleSort(char a[10][], int n);",
                "void BubbleSort(char[,] a, int n);",
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
            question: "下面有关 C++ 重载的说法，错误的是（ ）。",
            options: [
                "两个参数个数不同的函数可以重名。",
                "两个参数类型不同的函数可以重名。",
                "两个类的方法可以重名。",
                "所有 C++ 运算符均可以重载。",
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
            id: 10,
            type: "single",
            question: "小于或等于给定正整数 n 的数中，与 n 互质的数的个数，我们称为欧拉函数，记作 。下面说法错误的是 （ ）。",
            options: [
                "如果 n 是质数，那么 。",
                "两个质数一定是互质数。",
                "两个相邻的数一定是互质数。",
                "相邻的两个质数不一定是互质数。",
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
            question: "已知一棵二叉树有 10 个节点，则其中⾄多有（ ）个节点有 2 个子节点。",
            options: [
                "4",
                "5",
                "6",
                "3",
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
            id: 12,
            type: "single",
            question: "二项展开式 的系数，正好满⾜杨辉三角的规律。当 时，二项式展开式中 项的系数是（ ）。",
            options: [
                "5",
                "9",
                "10",
                "8",
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
            id: 13,
            type: "single",
            question: "下面程序的时间复杂度为（ ）。",
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
            question: "下面程序的最差时间复杂度为（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下面程序的输出为（ ）。 bool notPrime[N] = {false}; void sieve() { for (int n = 2; n * n < N; n++) if (!notPrime[n]) for (int i = n * n; i < N; i += n) notPrime[i] = true; } 1 2 3 4 5 6 7 int gcd(int m, int n) { if (m == 0) return n; return gcd(n % m, m); } 1 2 3 4 5 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "90",
                "91",
                "710",
                "711",
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
            question: "ABCDE 五个小朋友，排成一队跑步，其中 AB 两⼈必须排在一起，一共有 48 种排法。",
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
            question: "已知double类型的变量a和b，则执⾏语句a = a + b; b = a - b; a = a - b;后，变量a和b的 值会互换。",
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
            question: "一个袋子中有 3 个完全相同的红⾊小球、 2 个完全相同的蓝⾊小球。每次从中取出 1 个，再放回袋子，这样进 ⾏ 3 次后，可能的颜⾊顺序有 8 种。",
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
            question: "已知int类型的变量a和b中分别存储着一个直角三角形的两条直角边的长度，则斜边的长度可以通过表 达式sqrt(a * a + b * b)求得。",
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
            question: "在一个包含v个顶点、e条边的带权连通简单有向图上使用 Dijkstra 算法求最短路径，时间复杂度为 ， 可进一步优化⾄ 。",
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
            question: "在 个元素的二叉排序树中查找一个元素，最差情况的时间复杂度是 。",
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
            question: "C++ 语⾔中，可以为同一个类定义多个析构函数。",
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
            question: "使用单链表和使用双向链表，查找元素的时间复杂度相同。",
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
            question: "为解决哈希函数冲突，可以使用不同的哈希函数为每个表项各建⽴一个子哈希表，用来管理该表项的所有冲 突元素。这些子哈希表一定不会发生冲突。",
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
            question: "要判断无向图的连通性，在深度优先搜索和⼴度优先搜索中选择，深度优先的平均时间复杂度更低。 #include <iostream> using namespace std; int main() { int cnt = 0; for (int x = 0; x <= 10; x++) for (int y = 0; y <= 10; y++) for (int z = 0; z <= 10; z++) if (x + y + z <= 15) cnt++; cout << cnt << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 子任务编号 数据点占比 特殊条件 1 30% 树的形态为一条链 2 30% 3 40%",
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
