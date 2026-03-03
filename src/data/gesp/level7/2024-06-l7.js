// 2024年6月 GESP C++ 七级真题
export const paperData = {
    id: '2024-06-l7',
    title: '2024年6月 GESP C++ 七级真题',
    level: 7,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下列 C++ 代码的输出结果是（ ）。",
            options: [
                "0",
                "1",
                "0.5",
                "0.7071",
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
            id: 2,
            type: "single",
            question: "对于如下图的二叉树，说法正确的是（ ）。",
            options: [
                "先序遍历是132。",
                "中序遍历是123。",
                "后序遍历是312。",
                "先序遍历和后序遍历正好是相反的。 #include <iostream> #include <cmath> using namespace std; int main() { cout << sin(3.1415926 / 2); return 0; } 1 2 3 4 5 6 7",
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
            id: 3,
            type: "single",
            question: "已知两个序列 s1={1,3,4,5,6,7,7,8,1}、 s2={3,5,7,4,8,2,9,5,1}，则它们的最长公共子序列是（ ）。",
            options: [
                "{3,5,7,8,1}",
                "{3,4,5,7,8}",
                "{5,7,8}",
                "{3,5,7,9,1}",
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
            id: 4,
            type: "single",
            question: "关于序列{2,7,1,5,6,4,3,8,9}，以下说法错误的是（ ）。",
            options: [
                "{2,5,6,8,9}是它的最长上升子序列",
                "{1,5,6,8,9}是它的最长上升子序列",
                "{7,5,4,3}是它的最长下降子序列",
                "{1,5,6,8,9}是它的唯一最长上升子序列",
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
            id: 5,
            type: "single",
            question: "关于图的深度优先搜索和⼴度优先搜索，下列说法错误的是（ ）。",
            options: [
                "二叉树是也是一种图。",
                "二叉树的前序遍历和后序遍历都是深度优先搜索的一种。",
                "深度优先搜索可以从任意根节点开始。",
                "二叉树的后序遍历也是⼴度优先搜索的一种。",
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
            id: 6,
            type: "single",
            question: "对于如下二叉树，下面访问顺序说法错误的是（ ）。",
            options: [
                "HDEBFIGCA 不是它的后序遍历序列",
                "ABCDEFGHI 是它的⼴度优先遍历序列",
                "ABDHECFGI 是它的深度优先遍历序列",
                "ABDHECFGI 是它的先序遍历序列",
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
            id: 7,
            type: "single",
            question: "以下哪个方案不能合理解决或缓解哈希表冲突（ ）。",
            options: [
                "丢弃发生冲突的新元素。",
                "在每个哈希表项处，使用不同的哈希函数再建⽴一个哈希表，管理该表项的冲突元素。",
                "在每个哈希表项处，建⽴二叉排序树，管理该表项的冲突元素。",
                "使用不同的哈希函数建⽴额外的哈希表，用来管理所有发生冲突的元素。",
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
            id: 8,
            type: "single",
            question: "在 C++ 中，关于运算符 & ，下面说法正确的是（ ）。",
            options: [
                "2 & 3的结果是true",
                "011 & 111的结果是3",
                "3 & 6的结果是2",
                "110 & 101的结果是4",
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
            id: 9,
            type: "single",
            question: "下面关于图的说法正确的是（ ）。",
            options: [
                "在无向图中，环是指⾄少包含三个不同顶点，并且第一个顶点和最后一个顶点是相同的路径。",
                "在有向图中，环是指一个顶点经过⾄少另一个顶点到⾃⾝的路径。",
                "在有向图中，如果任意两个顶点之间都存在一条边，则这个图一定是强连通图。",
                "在有向图中，所有顶点的入度和出度的总和就是图的边数的两倍。",
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
            id: 10,
            type: "single",
            question: "图的存储和遍历算法，下面说法错误的是（ ）。",
            options: [
                "图的深度优先搜索和⼴度优先搜索对有向图和无向图都适用。",
                "图的深度优先搜索和二叉树的先序遍历道理是不一样的。",
                "图的深度优先搜索需要借助栈来完成。",
                "邻接表中，顶点 对应链表中的边结点数目正好是顶点 的度。",
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
            question: "如下图所⽰的邻接表结构，表⽰的是下列哪个选项中的图？",
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
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "如下图所⽰的邻接矩阵（ inf 表⽰无穷大），表⽰的是下列哪个选项中的图？",
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
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "5",
                "8",
                "13",
                "无法正常结束。",
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
            question: "下面count_triple函数的时间复杂度为 ( ) 。 #include <iostream> using namespace std; int fib(int n) { if (n <= 1) return n; return fib(n - 1) + fib(n - 2); } int main() { cout << fib(6) << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            id: 15,
            type: "single",
            question: "下列选项中，哪个可能是下图的深度优先遍历序列（ ）。",
            options: [
                "1, 3, 7, 5, 4, 2, 6, 8, 9",
                "9, 4, 2, 1, 3, 5, 7, 6, 8",
                "1, 3, 4, 2, 7, 6, 8, 9, 5",
                "9, 7, 6, 8, 4, 2, 1, 5, 3",
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
            question: "C++ 语⾔中，表达式6 & 5的结果类型为int、值为1。",
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
            question: "冒泡排序是稳定的排序算法。",
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
            question: "唯一分解定理（算术基本定理）指出，每个大于 1 的⾃然数都可以唯一地分解成若⼲个素数的乘积。因此， 我们可以很容易的对给定的⾃然数n进⾏质因数分解，时间复杂度仅为 。 int count_triple(int n) { int cnt = 0; for (int a = 1; a <= n; a++) for (int b = a; a + b <= n; b++) { int c = sqrt(a * a + b * b); if (a + b + c > n) break; if (a * a + b * b == c * c) cnt++; } return cnt; } 1 2 3 4 5 6 7 8 9 10 11 12",
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
            question: "C++ 语⾔中，可以为同一个类定义多个构造函数。",
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
            question: "使用math.h或cmath头文件中的对数函数，表达式log(128)的结果类型为double、值约为7.0。",
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
            question: "一颗N层的二叉树，⾄少有 个节点。",
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
            question: "非连通图不能使用⼴度优先搜索算法进⾏遍历。",
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
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "现使用有N个表项的哈希表，从M个元素中进⾏查找。该哈希表为解决哈希函数冲突，为每个表项处建⽴单 链表存储冲突元素。其查找操作的最坏情况时间复杂度为 。",
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
            question: "动态规划有递推实现和递归实现，对于很多问题，通过记录子问题的解，两种实现的时间复杂度是相同的。",
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
            question: "泛洪算法的递归方法容易造成溢出，因此大的二维地图算法中，一般不用递归方法。",
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
