// 2023年12月 GESP C++ 七级真题
export const paperData = {
    id: '2023-12-l7',
    title: '2023年12月 GESP C++ 七级真题',
    level: 7,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "定义变量double x，如果下面代码输入为100，输出最接近 ( ) 。",
            options: [
                "0",
                "-5",
                "-8",
                "8",
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
            question: "对于下面动态规划方法实现的函数，以下选项中最适合表达其状态转移函数的为 ( ) 。",
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
            id: 3,
            type: "single",
            question: "下面代码可以用来求最长上升子序列（ LIS ）的长度，如果输入是：5 1 7 3 5 9，则输出是 ( ) 。",
            options: [
                "9 7 5 1 1 9",
                "1 2 2 3 4 4",
                "1 3 5 7 9 9",
                "1 1 1 1 1 1",
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
            id: 4,
            type: "single",
            question: "C++ 语⾔中，下列关于关键字static的描述不正确的是 ( ) 。",
            options: [
                "可以修饰类的成员函数。",
                "常量静态成员可以在类外进⾏初始化。",
                "若a是类A常量静态成员，则a的地址都可以访问且唯一。",
                "静态全局对象一定在main函数调用前完成初始化，执⾏完main函数后被析构。",
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
            question: "G是一个非连通无向图，共有28条边，则该图⾄少有 ( ) 个顶点。",
            options: [
                "6",
                "7",
                "8",
                "9",
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
            question: "哈希表长 31 ，按照下面的程序依次输入4 17 28 30 4，则最后的4存入哪个位置？（ ）",
            options: [
                "3",
                "4",
                "5",
                "6",
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
            question: "某二叉树 T 的先序遍历序列为：{A B D F C E G H}，中序遍历序列为：{B F D A G E H C}，则下列 说法中正确的是 ( ) 。",
            options: [
                "T 的度为 1",
                "T 的高为 4",
                "T 有 4 个叶节点",
                "以上说法都不对",
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
            question: "下面代码段可以求两个字符串s1和s2的最长公共子串（ LCS ），下列相关描述不正确的是（ ）。",
            options: [
                "代码的时间复杂度为",
                "代码的空间复杂度为",
                "空间复杂度已经最优",
                "采用了动态规划求解",
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
            question: "图的⼴度优先搜索中既要维护一个标志数组标志已访问的图的结点，还需哪种结构存放结点以实现遍历？ ( )",
            options: [
                "双向栈",
                "队列",
                "哈希表",
                "堆",
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
            question: "对关键字序列{44 ， 36 ， 23 ， 35 ， 52 ， 73 ， 90 ， 58}建⽴哈希表，哈希函数为h(k)=k%7，执⾏下面的 Insert函数，则等概率情况下的平均成功查找长度（即查找成功时的关键字比较次数的均值）为 ( ) 。",
            options: [
                "7/8",
                "1",
                "1.5",
                "2",
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
            id: 11,
            type: "single",
            question: "学生在读期间所上的某些课程中需要先上其他的课程，所有课程和课程间的先修关系构成一个有向图G， 有向边<U, V>表⽰课程U是课程V的先修课，则要找到某门课程C的全部先修课下面哪种方法不可⾏？ ( )",
            options: [
                "BFS 搜索",
                "DFS 搜索",
                "DFS+BFS",
                "动态规划",
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
            id: 12,
            type: "single",
            question: "一棵完全二叉树有2023个结点，则叶结点有多少个？ ( )",
            options: [
                "1024",
                "1013",
                "1012",
                "1011",
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
            question: "用下面的邻接表结构保存一个有向图G，InfoType和VertexType是定义好的类。设G有n个顶点、 e条弧，则求图G中某个顶点u（其顶点序号为k）的度的算法复杂度是 ( ) 。",
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
            question: "给定一个简单有向图G，判断其中是否存在环路的下列说法哪个最准确？ ( )",
            options: [
                "BFS 更快",
                "DFS 更快",
                "BFS 和 DFS 一样快",
                "不确定",
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
            id: 15,
            type: "single",
            question: "从顶点v1开始遍历下图G得到顶点访问序列，在下面所给的4个序列中符合⼴度优先的序列有⼏个？ ( ) {v1 v2 v3 v4 v5} ，{v1 v2 v4 v3 v5}，{v1 v4 v2 v3 v5}，{v1 v2 v4 v5 v3}",
            options: [
                "4",
                "3",
                "2",
                "1 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            id: 16,
            type: "judge",
            question: "小杨这学期准备参加 GESP 的 7 级考试，其中有关于三角函数的内容，他能够通过下面的代码找到结束循环的 角度值。 ( )",
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
            question: "小杨在开发画笔刷小程序（ applet ），操作之一是选中黄颜⾊，然后在下面的左图的中间区域双击后，就变 成了右图。这个操作可以用图的泛洪算法来实现。 ( )",
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
            question: "假设一棵完全二叉树共有 个节点，则树的深度为 。 ( )",
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
            question: "给定一个数字序列A1 ， A2 ， A3 ， ... ， An，要求i和j（1<=i<=j<=n) ，使Ai+…+Aj最大，可以使用动 态规划方法来求解。 ( )",
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
            question: "若变量x为double类型正数，则log(exp(x)) > log10(x)。 ( )",
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
            question: "简单有向图有n个顶点和e条弧，可以用邻接矩阵或邻接表来存储，二者求节点u的度的时间复杂度一 样。 ( )",
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
            question: "某个哈希表键值x为整数，为其定义哈希函数H(x)=x%p，则p选择素数时不会产生冲突。 ( )",
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
            question: "动态规划只要推导出状态转移方程，就可以写出递归程序来求出最优解。 ( )",
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
            question: "⼴度优先搜索（ BFS ）能够判断图是否连通。 ( )",
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
            question: "在 C++ 中，如果定义了构造函数，则创建对象时先执⾏完缺省的构造函数，再执⾏这个定义的构造函数。 ( )",
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
