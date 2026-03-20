// 2024年9月 GESP C++ 五级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "小杨的武器",
        problemNumber: "2024-09-23-05-C-01",
        description: "小杨有 n 种不同的武器，对第 i 种武器的初始熟练度为 ai。会依次参加 m 场战斗，每场战斗必须且只能选择一种武器。如果选择了第 i 种武器参加第 j 场战斗，战斗后熟练度变为 ai+cj（cj 可正可负）。求 m 场战斗后熟练度最大值的最大可能结果。",
        inputDescription: "第一行两个正整数 n, m (1 ≤ n, m ≤ 100,000)。第二行 n 个整数 ai (-$10^9$ ≤ ai ≤ $10^9$)。第三行 m 个整数 cj (-$10^9$ ≤ cj ≤ $10^9$)。",
        outputDescription: "输出一个整数，代表 m 场战斗后熟练度的最大可能结果。",
        samples: [
            { input: "2 2\n9 9\n1 -1", output: "10" }
        ],
        explanation: "每一场战斗，只要选择当前熟练度最大的武器或能使熟练度增加最多的武器（此题中由于每次只能选一个，实际上只需考虑对所有武器熟练度的增加总量）。由于是求最大值的最大化，我们只需关注单种武器能达到的最大值。其实每场战斗都可以选同一种或不同种，关键在于最大熟练度。策略：每场战斗如果 cj > 0，则加到当前最大的武器上；如果 cj < 0，不加到最大武器上（加到其他武器上）？不对，题目是求 *最后* 熟练度最大值。那么只需让某一种武器吃掉所有正的 cj，另一种吃掉负的 cj（如果不一定要选每种武器）。但题目说‘每场战斗只能选择一种武器使用’。所以总共只有 m 个 cj。我们可以把所有的正 cj 都加给初始最大的武器即可。",
        tags: ["编程题", "贪心", "策略"],
        template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n, m; cin >> n >> m;\n    long long max_a = -2e18;\n    for (int i = 0; i < n; i++) {\n        long long a; cin >> a;\n        max_a = max(max_a, a);\n    }\n    long long sum_pos = 0;\n    for (int i = 0; i < m; i++) {\n        long long c; cin >> c;\n        if (c > 0) sum_pos += c;\n    }\n    cout << max_a+sum_pos << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "小杨的数字矩阵",
        problemNumber: "2024-09-23-05-C-02",
        description: "给定一个 n*n 的矩阵，要求顺时针螺旋填充 1 到 n*n 的数字。然后按行输出矩阵。",
        inputDescription: "第一行一个整数 n (1 ≤ n ≤ 10)。",
        outputDescription: "输出 n 行，每行 n 个整数，由空格分隔。",
        samples: [
            { input: "3", output: "1 2 3\n8 9 4\n7 6 5" }
        ],
        explanation: "螺旋填充经典题。维护当前坐标和方向，当越界或遇到已填充位置时旋转 90 度。",
        tags: ["编程题", "模拟", "矩阵"],
        template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<vector<int>> res(n, vector<int>(n, 0));\n    int dx[] = {0, 1, 0, -1}, dy[] = {1, 0, -1, 0};\n    int x = 0, y = 0, d = 0;\n    for (int i = 1; i <= n * n; i++) {\n        res[x][y] = i;\n        int nx = x+dx[d], ny = y+dy[d];\n        if (nx < 0 || nx >= n || ny < 0 || ny >= n || res[nx][ny]) {\n            d = (d+1) % 4;\n            nx = x+dx[d], ny = y+dy[d];\n        }\n        x = nx; y = ny;\n    }\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) cout << res[i][j] << (j == n-1 ? \"\" : \" \");\n        cout << endl;\n    }\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2024-09-l5',
    title: '2024年9月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 9,
    session: 3,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面关于链表和数组的描述，错误的是（ ）。",
            options: [
                "数组大小固定，链表大小可动态调整。",
                "数组支持随机访问，链表只能顺序访问。",
                "存储相同数目的整数，数组比链表所需的内存多。",
                "数组插入和删除元素效率低，链表插入和删除元素效率高。"
            ],
            answer: 2,
            score: 2,
            explanation: "链表节点除了存储数据，还需要存储指向下一个（或前一个）节点的指针，因此在存储相同数目的数据时，链表占用的内存更多。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 2,
            type: "single",
            question: "通过（ ）操作，能完成在双向循环链表结点 p 之后插入结点 s 的功能（其中 next 域为直接后继，prev 域为直接前驱）。",
            options: [
                "p->next->prev = s; s->prev = p; p->next = s; s->next = p->next;",
                "p->next->prev = s; p->next = s; s->prev = p; s->next = p->next;",
                "s->prev = p; s->next = p->next; p->next = s; p->next->prev = s;",
                "s->next = p->next; p->next->prev = s; s->prev = p; p->next = s;"
            ],
            answer: 3,
            score: 2,
            explanation: "插入节点 s 需要先连接 s 的后继（s->next = p->next）和前驱（s->prev = p），然后修改原后继的前驱（p->next->prev = s）和 p 的后继（p->next = s）。顺序很重要，D 选项是正确顺序。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 3,
            type: "single",
            question: "对递归和迭代，说法错误的是（ ）。",
            options: [
                "递归往往比迭代更简洁直观。",
                "递归由于函数调用开销，通常比迭代更慢。",
                "递归和迭代可以相互转化。",
                "所有递归问题都可以直接用循环迭代解决。"
            ],
            answer: 3,
            score: 2,
            explanation: "虽然理论上递归可以转为非递归（通过栈模拟），但并不是所有递归都能简单地直接用循环替代。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 4,
            type: "single",
            question: "下列关于 C++ 中 const 的说法，错误的是（ ）。",
            options: [
                "const 修饰的成员函数不能修改对象的状态。",
                "const 指针可以指向非 const 变量。",
                "const 引用可以绑定到临时对象。",
                "const 成员变量可以在构造函数体中通过赋值初始化。"
            ],
            answer: 3,
            score: 2,
            explanation: "const 成员变量必须在构造函数的初始化列表中初始化，不能在函数体中通过赋值初始化。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 5,
            type: "single",
            question: "下列哪个算法的时间复杂度是 $O(n \log n)$（ ）。",
            options: ["冒泡排序", "选择排序", "归并排序", "插入排序"],
            answer: 2,
            score: 2,
            explanation: "归并排序的最好、最坏、平均时间复杂度均为 $O(n \log n)$。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 6,
            type: "single",
            question: "埃氏筛法的主要功能是（ ）。",
            options: ["求两个数的最大公约数", "筛选出 1 到 N 之间的所有质数", "判断一个数是否为质数", "对一个数进行质因数分解"],
            answer: 1,
            score: 2,
            explanation: "埃拉托斯特尼筛法（埃氏筛）的核心功能是批量筛选质数。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 7,
            type: "single",
            question: "在 C++ 中，`std::stack` 遵循的原则是（ ）。",
            options: ["先进先出", "随机访问", "后进先出", "按优先级访问"],
            answer: 2,
            score: 2,
            explanation: "栈（Stack）是后进先出（LIFO）的数据结构。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 8,
            type: "single",
            question: "贪心算法通常解决（ ）问题。",
            options: ["所有全局最优解", "局部最优选择导致全局最优的问题", "需要枚举所有可能性的问题", "需要通过动态规划解决的问题"],
            answer: 1,
            score: 2,
            explanation: "贪心算法适用于具备贪心选择性质的问题，即局部最优能推导到全局最优。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 9,
            type: "single",
            question: "下列哪个操作符用于动态分配内存并调用构造函数（ ）。",
            options: ["malloc", "new", "calloc", "alloc"],
            answer: 1,
            score: 2,
            explanation: "new 是 C++ 运算符，负责分配内存并初始化对象（调用构造函数）。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 10,
            type: "single",
            question: "在 C++ 中，基类中的私有成员在公有派生类中（ ）。",
            options: ["变为公有", "变为保护", "不可访问", "保持私有"],
            answer: 2,
            score: 2,
            explanation: "基类的 private 成员在派生类中是不可直接访问的（无论何种继承方式）。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 11,
            type: "single",
            question: "二分查找的基础要求是序列（ ）。",
            options: ["有序", "无序", "长度为 2 的幂", "由整数组成"],
            answer: 0,
            score: 2,
            explanation: "有序性是二分查找的前提条件。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 12,
            type: "single",
            question: "分治策略不包括下列哪个步骤（ ）。",
            options: ["分解", "解决", "合并", "贪心选择"],
            answer: 3,
            score: 2,
            explanation: "分治三步：Divide（分解）、Conquer（解决）、Combine（合并）。贪心选择属于贪心算法。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 13,
            type: "single",
            question: "下列关于 static 的描述，错误的是（ ）。",
            options: [
                "静态局部变量只初始化一次。",
                "静态成员变量必须在类外定义和初始化。",
                "静态成员函数可以访问非静态成员函数。",
                "静态全局变量限制了变量在当前文件外的可见性。"
            ],
            answer: 2,
            score: 2,
            explanation: "静态成员函数没有 this 指针，无法直接调用非静态成员函数。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 14,
            type: "single",
            question: "下列关于双向链表的说法，正确的是（ ）。",
            options: [
                "可以在常数时间内访问第 i 个元素",
                "插入和删除操作只需要修改一个指针",
                "每个节点存储两个指针空间开销较大",
                "不支持循环遍历"
            ],
            answer: 2,
            score: 2,
            explanation: "双向链表每个节点需要两个指针（prev, next），空间开销确实比单链表大。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 15,
            type: "single",
            question: "中国计算机学会（ CCF ）GESP 认证的 5 级考试，编程题通常考察（ ）。",
            options: ["基础循环和分支", "二维数组和模拟", "简单数论和排序算法", "复杂图论算法"],
            answer: 2,
            score: 2,
            explanation: "根据考纲，5 级主要考察数论基础、各种排序和模拟题。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 16,
            type: "judge",
            question: "在操作系统中，CPU 时间片轮转调度可以通过环形链表来实现。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "环形链表是实现循环访问的经典数据结构。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 17,
            type: "judge",
            question: "线性筛法的效率通常高于埃氏筛法。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "线性筛（欧拉筛）确保每个合数只被其最小质因子筛一次，复杂度 $O(N)$。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 18,
            type: "judge",
            question: "唯一分解定理表明任何一个大于 1 的整数都可以唯一地分解为素数之和。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "是分解为素数的 *乘积*，而非之和。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 19,
            type: "judge",
            question: "贪心算法一定能获得最优解。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "贪心算法只有在问题具备贪心选择性质时才有效，否则不一定是最优。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 20,
            type: "judge",
            question: "快速排序和归并排序的平均时间复杂度均为 $O(n \log n)$，且都是稳定排序。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "快速排序是不稳定的。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 21,
            type: "judge",
            question: "插入排序的时间复杂度总是比快速排序低。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "通常快排效率更高，除非数组已有序。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 22,
            type: "judge",
            question: "引入分治策略往往可以提升算法效率，因为它减少了操作数量并利于并行优化。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "分治的优势。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 23,
            type: "judge",
            question: "二分查找要求被搜索的序列是有序的，否则无法保证正确性。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "有序性是基础。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 24,
            type: "judge",
            question: "在 C++ 语言中，递归的实现方式通常会占用更多的栈空间，可能导致栈溢出。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "递归的风险。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 25,
            type: "judge",
            question: "对于已经定义好的标准数学函数 sin(x)，y = sin(sin(x)) 是递归调用。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "这只是普通嵌套调用，并非递归（函数没有调用自身）。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        ...programmingQuestions
    ]
};
