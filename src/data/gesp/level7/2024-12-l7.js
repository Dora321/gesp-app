// 2024年12月 GESP C++ 七级真题
export const paperData = {
    id: '2024-12-l7',
    title: '2024年12月 GESP C++ 七级真题',
    level: 7,
    year: 2024,
    month: 12,
    session: 8,
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
            id: 2,
            type: "single",
            question: "已知a为int类型变量，p为int *类型变量，下列赋值语句不符合语法的是（ ）。",
            options: [
                "+a = *p;",
                "*p = +a;",
                "a = *(p + a);",
                "*(p + a) = a;",
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
            question: "已知数组a的定义int a[10] = {0};，下列说法不正确的是（ ）。",
            options: [
                "语句a[-1] = 0;会产生编译错误。",
                "数组a的所有元素均被初始化为0。",
                "数组a⾄少占用10个int大小的内存，一般为40个字节。",
                "语句a[13] = 0;不会产生编译错误，但会导致难以预测的运⾏结果。",
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
            question: "下列关于 C++ 类的说法，错误的是 ( ) 。",
            options: [
                "构造函数不能声明为虚函数，但析构函数可以。 #include <iostream> using namespace std; int main() { char a = 'b'; cout << a + 1; return 0; } 1 2 3 4 5 6 7",
                "函数参数如声明为类的引用类型，调用时不会调用该类的复制构造函数。",
                "静态方法属于类、不属于对象，因此不能使用对象 . 方法 (...)的形式调用静态方法。",
                "析构派生类的对象时，一定会调用基类的析构函数。",
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
            question: "下列关于有向图的说法，错误的是 ( ) 。",
            options: [
                "个顶点的弱连通有向图，最少有 条边。",
                "个顶点的强连通有向图，最少有 条边。",
                "个顶点的有向图，最多有 条边。",
                "个顶点的有向完全图，有 条边。",
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
            id: 6,
            type: "single",
            question: "一棵二叉树的每个结点均满⾜：结点的左子树和右子树，要么同时存在，要么同时不存在。该树有 197 个结 点，则其叶结点有多少个？ ( )",
            options: [
                "98",
                "99",
                "不存在这样的树。",
                "无法确定叶结点数量。",
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
            id: 7,
            type: "single",
            question: "下列关于二叉树的说法，错误的是（ ）。",
            options: [
                "二叉排序树的中序遍历顺序与元素排序的顺序是相同的。",
                "个元素的二叉排序树，其高一定为 。",
                "⾃平衡二叉查找树（ AVL 树）是一种二叉排序树。",
                "任意的森林，都可以映射为一颗二叉树进⾏表达和存储。",
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
            question: "一个简单无向图有 10 个结点、 6 条边。在最差情况，⾄少增加多少条边可以使其连通？（ ）",
            options: [
                "3",
                "4",
                "6",
                "9",
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
            question: "一个哈希表，包括 n 个位置（分别编号 0~(n-1) ），每个位置最多仅能存储一个元素。该哈希表只有插入元素 和查询两种操作，没有删除或修改元素的操作。以下说法错误的是（ ）。",
            options: [
                "如果哈希函数取值范围为 0 ~ (n-1) ，且当发生哈希函数碰撞时循环向后寻找空位，则查询操作的最差时间复杂 度为 。（ “ 循环向后 ” 指： 0 向后一位为 1 ， 1 向后一位为 2 ， …… ， (n-2) 向后一位为 (n-1) ， (n-1) 向后一位为 0 ）",
                "如果哈希函数取值范围为 0 ~ (n-1) ，且当发生哈希函数碰撞时仅循环向后一个位置寻找空位，则查询操作的最 差时间复杂度为 。",
                "如果哈希函数取值范围为 0 ~ (m-1) （ m < n ），且当发生哈希函数碰撞时仅在 m ~ (n-1) 的范围内寻找空位，则 查询操作的最差时间复杂度为 。",
                "查询操作时，如果发现查询元素经哈希函数对应的位置为空位，该查询元素仍可能出现在哈希表内。",
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
            question: "以下关于动态规划的说法中，错误的是（ ）。",
            options: [
                "动态规划方法将原问题分解为一个或多个相似的子问题。",
                "动态规划方法通常能够列出递推公式。",
                "动态规划方法有递推和递归两种实现形式。",
                "递推实现动态规划方法的时间复杂度总是不低于递归实现。",
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
                "4",
                "7",
                "100",
                "无法通过编译。",
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
            id: 12,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "132",
                "1430",
                "16796",
                "结果是随机的。",
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
            question: "上题中程序的时间复杂度为（ ）。",
            options: [
                "选项A",
                "#include <iostream> #include <cmath> using namespace std; int main() { cout << (int)exp(2) << endl; return 0; } 1 2 3 4 5 6 7 #include <iostream> #define N 10 using namespace std; int h[N]; int main() { h[0] = h[1] = 1; for (int n = 2; n < N; n++) for (int j = 0; j < n; j++) h[n] += h[j] * h[n - j - 1]; cout << h[6] << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            question: "下面init_sieve函数的时间复杂度为 ( ) 。",
            options: [
                "选项A",
                "选项B",
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
            question: "下列选项中，哪个不可能是下图的深度优先遍历序列（ ）。",
            options: [
                "1, 2, 3, 5, 7, 8, 6, 9, 4",
                "1, 4, 7, 8, 9, 5, 2, 3, 6",
                "1, 5, 7, 8, 9, 4, 2, 3, 6",
                "1, 2, 3, 6, 9, 8, 5, 7, 4",
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
            question: "表达式5 ^ 3的结果为125。",
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
            question: "在 C++ 语⾔中，函数定义和函数调用可以不在同一个文件内。",
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
            question: "在 个元素中进⾏二分查找，平均时间复杂度是 ，但须要事先进⾏排序。",
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
            question: "unsigned long long类型是 C++ 语⾔中表达范围最大的非负整数类型之一，其表达范围是 。超 出该范围的非负整数运算，将无法使用 C++ 语⾔进⾏计算。",
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
            question: "使用math.h或cmath头文件中的函数，表达式log2(32)的结果为5、类型为int。 int sieve[MAX_N]; void init_sieve(int n) { for (int i = 1; i <= n; i++) sieve[i] = i; for (int i = 2; i <= n; i++) for (int j = i; j <= n; j += i) sieve[j]--; } 1 2 3 4 5 6 7 8",
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
            question: "C++ 是一种面向对象编程语⾔， C 则不是。继承是面向对象三大特性之一。因此，使用 C 语⾔无法实现继承。",
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
            question: "邻接表和邻接矩阵都是图的存储形式。邻接表在遍历单个顶点的所有边时，时间复杂度更低；邻接矩阵在判 断两个顶点之间是否有边时，时间复杂度更低。",
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
            question: "MD5 是一种常见的哈希函数，可以由任意长度的数据生成 128 位的哈希值，曾⼴泛应用于数据完整性校验。 中国科学家的系列⼯作⾸次发现了可实用的 MD5 破解方法。之后， MD5 逐渐被其他哈希函数所取代。",
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
            question: "递归调用在运⾏时会由于层数过多导致程序崩溃，可以通过循环配合栈缓解这一问题。",
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
            question: "一个图中，每个顶点表达一个城市，连接两个顶点的边表达从一个城市到达另一个城市的一种交通方式。 这个图可以用来表达交通⽹络，且是简单有向图。",
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
