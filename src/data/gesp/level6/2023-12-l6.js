// 2023年12月 GESP C++ 六级真题
export const paperData = {
    id: '2023-12-l6',
    title: '2023年12月 GESP C++ 六级真题',
    level: 6,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "关于 C++ 类和对象的说法，错误的是 ( ) 。",
            options: [
                "在 C++ 中，一切皆对象，即便是字面量如整数 5 等也是对象",
                "在 C++ 中，可以⾃定义新的类，并实例化为新的对象",
                "在 C++ 中，内置函数和⾃定义函数，都是类或者对象",
                "在 C++ 中，可以在⾃定义函数中嵌套定义新的函数",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "有关下面 C++ 代码的说法，错误的是 ( ) 。",
            options: [
                "C++ 中类内部可以嵌套定义类",
                "在类中定义的类被称为内部类，定义类的类被称为外部类",
                "内部类可以随便访问，不需要通过外部类来访问",
                "代码中Point被称为内部类，可以通过外部类Rectangle来访问，Rectangle::Point",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "有关下面 C++ 代码的说法，正确的是 ( ) 。",
            options: [
                "第 14 ⾏代码错误，第 15 ⾏正确",
                "第 15 ⾏代码错误，第 14 ⾏代码正确",
                "第 14 、 15 两⾏代码都正确",
                "第 6 ⾏代码可修改为objCounter += 1",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "有关下面 C++ 代码的说法，错误的是 ( ) 。",
            options: [
                "上列 C++ 代码适用于构造各种二叉树",
                "代码struct BiNode用于构造二叉树的节点",
                "代码BiTree(){root=Creat();}用于构造二叉树",
                "析构函数不可以省略",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "基于",
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
                "GESP6级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "的定义，有关下面 C++ 代码的说法正确的是（ ）。",
            options: [
                "代码中Order( )函数是中序遍历二叉树的方法",
                "代码中Order( )先访问根节点，然后对左子树进⾏前序遍历，再对右子树前序遍历",
                "代码中Order( )先访问中序遍历左子树，然后访问根节点，最后则是中序遍历右子树",
                "代码中Order( )先后序遍历左子树，然后后序遍历右子树，最后访问根节点",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "有关下面 C++ 代码的说法正确的是（ ）。",
            options: [
                "上述代码构成单向链表",
                "上述代码构成双向链表",
                "上述代码构成循环链表",
                "上述代码构成指针链表",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "对 hello world 使用霍夫曼编码（ Huffman Coding ），最少 bit （比特）为（ ）。",
            options: [
                "4",
                "32",
                "64",
                "88",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面的 fiboA() 和 fiboB() 两个函数分别实现斐波那契数列，该数列第 1 、第 2 项值为 1 ，其余各项分别 为前两项之和。下面有关说法错误的是（ ）。",
            options: [
                "fiboA() 采用递归方式实现斐波那契数列",
                "fiboB() 采用动态规划算法实现斐波那契数列",
                "当 N 值较大时，fiboA() 存在大量重复计算",
                "由于 fiboA() 代码较短，其执⾏效率较高",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "有关下面 C++ 代码不正确的说法是（ ）。",
            options: [
                "该代码可用于求解二叉树的深度",
                "代码中函数 Depth( ) 的参数 T 表⽰根节点，非根节点不可以作为参数",
                "代码中函数 Depth( ) 采用了递归方法",
                "代码中函数 Depth( ) 可用于求解各种形式的二叉树深度，要求该二叉树节点⾄少有 left 和 right 属 性",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面有关树的存储，错误的是（ ） .",
            options: [
                "完全二叉树可以用 list 存储",
                "一般二叉树都可以用 list 存储，空子树位置可以用 None 表⽰",
                "满二叉树可以用 list 存储",
                "树数据结构，都可以用 list 存储",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "构造二叉树 [1,2,3,null,4]（ ）。",
            options: [
                "1(2()(4))(3)",
                "1(2(3)())(4)",
                "(1,2(3),(4))",
                "(1,(2)(3),(4))",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面有关布尔类型的函数的说法，正确的是（ ）。",
            options: [
                "bool 类型函数只能返回 0 或者 1 两种值",
                "bool 类型函数可以返回任何整数值",
                "bool 类型函数必须有参数传递",
                "bool 类型函数没有返回值",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "通讯卫星在通信⽹络系统中主要起到（ ）的作用。",
            options: [
                "信息过滤",
                "信号中继",
                "避免攻击",
                "数据加密",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "小杨想编写一个判断任意输入的整数 N 是否为素数的程序，下面哪个方法不合适？（ ）",
            options: [
                "埃⽒筛法",
                "线性筛法",
                "二分答案",
                "枚举法",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP6级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "在面向对象中，方法在 C++ 的 class 中表现为 class 内定义的函数。 ( )",
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
                "GESP6级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "C++ 类的定义中，可以没有构造函数，会给出默认的构造函数（ ）",
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
                "GESP6级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "如果某个 C++ 对象（ object ）支持下标运算符（方括号运算符），则该对象在所对应 class 中以成员函数的形式 进⾏了重载。 ( )",
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
                "GESP6级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "深度优先搜索（ DFS ， Depth First Search 的简写）属于图算法，其过程是对每一个可能的分支路径深入到不 能再深入为⽌，而且每个节点只能访问一次。 ( )",
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
                "GESP6级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "哈夫曼编码（ Huffman Coding ）具有唯一性，因此有确定的压缩率。 ( )",
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
                "GESP6级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "在下面 C++ 代码中，由于删除了变量 ptr，因此 ptr 所对应的数据也随之删除，故第 8 ⾏代码被执⾏时， 将报错。（ ）",
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
                "GESP6级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "二叉搜索树查找的平均时间复杂度为 。（ ）",
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
                "GESP6级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "二叉搜索树可以是空树（没有任何节点）或者单节点树（只有一个节点），或者多节点。如果是多节点，则 左节点的值小于⽗节点的值，右节点的值大于⽗节点的值，由此推理，右节点树的值都大于根节点的值，左节点树 的值都小于根节点的值。（ ）",
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
                "GESP6级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "小杨想写一个程序来算出正整数 N 有多少个因数，经过思考他写出了一个重复没有超过 N/2 次的循环就能够算 出来了。（ ）",
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
                "GESP6级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "同样的整数序列分别保存在单链表和双向链中，这两种链表上的简单冒泡排序的复杂度相同。（ ）",
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
                "GESP6级",
            ]
        }
    ]
};
