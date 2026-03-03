// 2024年9月 GESP C++ 七级真题
export const paperData = {
    id: '2024-09-l7',
    title: '2024年9月 GESP C++ 七级真题',
    level: 7,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "已知小写字母b的 ASCII 码为 98 ，下列 C++ 代码的输出结果是（ ）。",
            options: [
                "b",
                "c",
                "98",
                "99",
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
            question: "已知a为int类型变量，下列表达式不符合语法的是（ ）。",
            options: [
                "&a + 3",
                "+a & 3",
                "a - - 4",
                "a++3",
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
            question: "下列关于 C++ 语⾔中指针的叙述，不正确的是（ ）。",
            options: [
                "指针变量中存储的是内存地址。",
                "指针变量指向的内存地址不一定能够合法访问。",
                "结构类型中的指针成员不能指向该结构类型。",
                "定义指针变量时必须指定其指向的类型。",
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
            id: 4,
            type: "single",
            question: "下列关于 C++ 类的说法，错误的是 ( ) 。 #include <iostream> using namespace std; int main() { char a = 'b'; a++; cout << a; return 0; } 1 2 3 4 5 6 7 8",
            options: [
                "将 C++ 类对象通过值传递给函数参数时，会⾃动调用复制构造函数。",
                "将一个类的对象赋值给该类的另一个对象时，不会⾃动调用构造函数。",
                "定义 C++ 类对象时，一定会调用默认构造函数。",
                "构造派生类的对象时，一定会调用基类的构造函数。",
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
            question: "某二叉树 T 的先序遍历序列为： {A B D C E G H F} ，中序遍历序列为： {D B A H G E C F} ，则下列说法中正 确的是 ( ) 。",
            options: [
                "T 的高为 5",
                "T 有 4 个叶节点",
                "T 是平衡树",
                "以上说法都不对",
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
            id: 6,
            type: "single",
            question: "一棵完全二叉树有 431 个结点，则叶结点有多少个？ ( )",
            options: [
                "176",
                "215",
                "216",
                "255",
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
            id: 7,
            type: "single",
            question: "下列关于树的说法，错误的是（ ）。",
            options: [
                "二叉树的中序遍历与其深度优先遍历总是相同的。",
                "所有树都可以构造一颗二叉树与之一一对应。",
                "如果树的一个叶结点有两个不同的祖先结点，那么其中一个一定是另一个的祖先结点。",
                "树的结点不能有两个⽗结点。",
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
            question: "一个简单无向图有 10 个结点、 30 条边。再增加多少条边可以成为完全图。（ ）",
            options: [
                "10",
                "15",
                "51",
                "60",
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
            question: "以下哪个方案可以合理解决或缓解哈希表冲突（ ）。",
            options: [
                "丢弃发生冲突的新元素。",
                "用新元素覆盖发生冲突的元素。",
                "用新元素覆盖在冲突位置的下一个位置。",
                "将新元素放置在冲突位置之后的第一个空位。",
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
            question: "一个迷宫，已知从起点不经过重复结点到达终点的路径有且仅有一条，则下面说法错误的是（ ）。",
            options: [
                "可以使用深度优先搜索找到这条路径。",
                "可以使用⼴度优先搜索找到这条路径。",
                "该迷宫内与起点连通的结点，一定也与终点连通。",
                "该迷宫内与起点连通的结点及它们之间的路径可以抽象为无向无环图。",
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
            id: 11,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "2",
                "3",
                "8",
                "无法通过编译。",
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
            id: 12,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "84",
                "495",
                "1012",
                "结果是随机的。",
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
            question: "上题中程序的时间复杂度为（ ）。",
            options: [
                "选项A",
                "#include <iostream> #include <cmath> using namespace std; int main() { cout << (int)log(8) << endl; return 0; } 1 2 3 4 5 6 7 #include <iostream> #define N 10 using namespace std; int path[N][N]; int main() { for (int i = 1; i < N; i++) path[i][0] = i; for (int j = 1; j < N; j++) path[0][j] = j; for (int i = 1; i < N; i++) for (int j = 1; j < N; j++) path[i][j] = path[i - 1][j] + path[i][j - 1]; cout << path[8][4] << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            id: 14,
            type: "single",
            question: "下面fib函数的时间复杂度为 ( ) 。",
            options: [
                "选项A",
                ",",
                "选项C",
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
            id: 15,
            type: "single",
            question: "下列选项中，哪个可能是下图的⼴度优先遍历序列（ ）。",
            options: [
                "1, 3, 5, 7, 4, 2, 6, 8, 9",
                "9, 4, 2, 1, 3, 7, 5, 6, 8",
                "1, 3, 5, 7, 6, 8, 9, 4, 2",
                "9, 4, 7, 2, 1, 3, 5, 6, 8",
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
            id: 16,
            type: "judge",
            question: "表达式'a' << 1的结果为'a '。",
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
            question: "在 C++ 语⾔中，函数可以定义在另一个函数定义之内。",
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
            question: "选择排序一般是不稳定的。",
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
            question: "埃⽒筛法和欧拉筛法都是使用筛法思想生成素数表的算法，欧拉筛法的时间复杂度更低。",
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
            question: "使用math.h或cmath头文件中的正弦函数，表达式sin(30)的结果类型为double、值约为0.5。 int fib_rcd[MAX_N]; int fib(int n) { if (n <= 1) return 1; if (fib_rcd[n] > 0) return fib_rcd[n]; return fib(n - 1) + fib(n - 2); } 1 2 3 4 5 6 7 8",
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
            question: "一颗 层的完全二叉树，一定有 个结点。",
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
            question: "一个图，不管是否连通，都可以使用深度优先搜索算法进⾏遍历。",
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
            question: "某个哈希表键值x为整数，H(x) = x % p是常用的哈希函数之一，要求p选择素数是因为这样不会产生 冲突。 ( )",
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
            question: "使用单链表实现队列时，链表头结点作为队⾸比链表头结点作为队尾更便于操作。",
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
            question: "一个图中，每个结点表达一个⼈，连接两个结点的边表达两个结点对应的⼈相互认识，则这个图可以用来 表达社交⽹络。",
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
