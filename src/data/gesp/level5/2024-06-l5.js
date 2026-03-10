// 2024年6月 GESP C++ 五级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "黑白格",
        problemNumber: "2024-06-23-05-C-01",
        description: "小杨有一个 n 行 m 列的网格图，其中每个格子要么是白色，要么是黑色。小杨想知道至少包含 k 个黑色格子的最小子矩形包含了多少个格子。",
        inputDescription: "第一行包含三个正整数 n, m, k (1 ≤ n, m ≤ 100, 1 ≤ k ≤ n*m)。之后 n 行，每行一个长度为 m 的 01 串，0 代表白色，1 代表黑色。",
        outputDescription: "输出一个整数，代表至少包含 k 个黑色格子的最小子矩形包含格子的数量，如果不存在则输出 0。",
        samples: [
            { input: "4 5 5\n00000\n01111\n00011\n00011", output: "6" }
        ],
        explanation: "由于 n, m 较小（最大 100），可以枚举子矩形的上下边界 (r1, r2)，然后利用双指针或暴力枚举左右边界 (c1, c2)。利用二维前缀和快速计算子矩形内 1 的个数。",
        tags: ["编程题", "二维前缀和", "双指针"],
        template: "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m, k;\n    cin >> n >> m >> k;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\nint main() {\n    int n, m, k; cin >> n >> m >> k;\n    vector<vector<int>> s(n + 1, vector<int>(m + 1, 0));\n    for (int i = 1; i <= n; i++) {\n        string row; cin >> row;\n        for (int j = 1; j <= m; j++) {\n            s[i][j] = s[i-1][j] + s[i][j-1] - s[i-1][j-1] + (row[j-1] - '0');\n        }\n    }\n    int min_area = 1e9;\n    for (int r1 = 1; r1 <= n; r1++) {\n        for (int r2 = r1; r2 <= n; r2++) {\n            for (int c1 = 1; c1 <= m; c1++) {\n                for (int c2 = c1; c2 <= m; c2++) {\n                    int count = s[r2][c2] - s[r1-1][c2] - s[r2][c1-1] + s[r1-1][c1-1];\n                    if (count >= k) min_area = min(min_area, (r2 - r1 + 1) * (c2 - c1 + 1));\n                }\n            }\n        }\n    }\n    if (min_area == 1e9) cout << 0 << endl;\n    else cout << min_area << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "小杨的幸运数字",
        problemNumber: "2024-06-23-05-C-02",
        description: "小杨认为，如果一个数字能被 7 整除，或者包含数字 7，那么这个数字就是幸运数字。给定两个正整数 L 和 R，请你求出在 [L, R] 范围内所有幸运数字的和。",
        inputDescription: "输入两个正整数 L, R (1 ≤ L ≤ R ≤ 1,000,000)。",
        outputDescription: "输出一个整数，代表幸运数字之和。",
        samples: [
            { input: "1 20", output: "21" }
        ],
        explanation: "遍历 [L, R] 之间的每一个数字，判断其是否能被 7 整除或包含数字 7。由于范围较小，直接模拟即可。",
        tags: ["编程题", "模拟"],
        template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int L, R;\n    cin >> L >> R;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <string>\nusing namespace std;\nbool isLucky(int n) {\n    if (n % 7 == 0) return true;\n    string s = to_string(n);\n    if (s.find('7') != string::npos) return true;\n    return false;\n}\nint main() {\n    int L, R; cin >> L >> R;\n    long long sum = 0;\n    for (int i = L; i <= R; i++) {\n        if (isLucky(i)) sum += i;\n    }\n    cout << sum << endl;\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2024-06-l5',
    title: '2024年6月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 6,
    session: 2,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面 C++ 代码用于求斐波那契数列，该数列第 1、2 项为 1，以后各项均是前两项之和。函数 fibo() 属于 ( ) 。",
            options: ["枚举算法", "贪心算法", "迭代算法", "递归算法"],
            answer: 2,
            score: 2,
            explanation: "代码中使用循环（for 循环）不断根据前两项求当前项，这种方式属于迭代算法。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 2,
            type: "single",
            question: "下面 C++ 代码用于将输入金额换成最少币种组合方案，其实现算法是 ( ) 。",
            options: ["分治算法", "贪心算法", "动态规划", "枚举算法"],
            answer: 1,
            score: 2,
            explanation: "换零钱的最少币种问题，在面额符合特定规律时，通常使用贪心算法（从大面额开始匹配）。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 3,
            type: "single",
            question: "关于双向链表，下列说法错误的是（ ）。",
            options: ["每个节点包含指向前驱和后继的指针", "可以在 O(1) 时间内删除已知节点", "支持随机访问", "支持双向遍历"],
            answer: 2,
            score: 2,
            explanation: "链表不支持随机访问（即无法在 O(1) 时间内访问任意下标的元素）。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 4,
            type: "single",
            question: "下列哪个时间复杂度最低（ ）。",
            options: ["O(N log N)", "O(N^2)", "O(log N)", "O(N)"],
            answer: 2,
            score: 2,
            explanation: "常见复杂度排序：O(1) < O(log N) < O(N) < O(N log N) < O(N^2)。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 5,
            type: "single",
            question: "关于 C++ 的类和继承，下列说法正确的是（ ）。",
            options: ["私有成员可以被派生类访问", "公有继承时，基类的公有成员在派生类中变为私有", "基类的析构函数通常应声明为虚函数", "一个派生类只能继承一个基类"],
            answer: 2,
            score: 2,
            explanation: "为了确保通过基类指针删除派生类对象时能正确调用析构函数，基类的析构函数应声明为 virtual。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 6,
            type: "single",
            question: "下列哪个算法用于寻找质数（ ）。",
            options: ["冒泡排序", "二分查找", "埃氏筛法", "贪心算法"],
            answer: 2,
            score: 2,
            explanation: "埃拉托斯特尼筛法（埃氏筛）是著名的求素数算法。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 7,
            type: "single",
            question: "在 C++ 中，`std::queue` 的入队操作是（ ）。",
            options: ["push", "pop", "front", "back"],
            answer: 0,
            score: 2,
            explanation: "queue 的入队函数是 push，出队是 pop。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 8,
            type: "single",
            question: "归并排序合并两个长度为 N 的有序数组，最坏情况下的比较次数是（ ）。",
            options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
            answer: 2,
            score: 2,
            explanation: "合并操作的时间复杂度是 O(N)。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 9,
            type: "single",
            question: "下列关于堆栈的说法，正确的是（ ）。",
            options: ["先进先出", "后进先出", "支持下标访问", "底层通常由数组实现"],
            answer: 1,
            score: 2,
            explanation: "栈（Stack）是后进先出（LIFO）的数据结构。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 10,
            type: "single",
            question: "在 C++ 中，`new` 和 `malloc` 的区别不包括（ ）。",
            options: ["new 是运算符，malloc 是函数", "new 会自动调用构造函数", "new 返回具体类型的指针，malloc 返回 void*", "new 只能在 Windows 系统使用"],
            answer: 3,
            score: 2,
            explanation: "new 和 malloc 都是标准的动态内存分配方式，跨平台通用。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 11,
            type: "single",
            question: "唯一分解定理表明任何一个大于 1 的整数都可以唯一地表示为一系列（ ）的乘积。",
            options: ["合数", "偶数", "质数", "奇数"],
            answer: 2,
            score: 2,
            explanation: "质因数分解唯一性。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 12,
            type: "single",
            question: "快速排序的基础操作是（ ）。",
            options: ["分区", "合并", "筛选", "搜索"],
            answer: 0,
            score: 2,
            explanation: "快速排序的核心是通过 Partition 操作进行分区。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 13,
            type: "single",
            question: "在 C++ 中，下列哪个关键字用于声明命名空间（ ）。",
            options: ["class", "struct", "namespace", "using"],
            answer: 2,
            score: 2,
            explanation: "namespace 用于定义命名空间，防止名称冲突。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 14,
            type: "single",
            question: "下列哪个操作属于线性表的基本操作（ ）。",
            options: ["插入", "排序", "查找", "以上都是"],
            answer: 3,
            score: 2,
            explanation: "线性表的基本操作涵盖增删改查及排序等。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 15,
            type: "single",
            question: "关于 C++ 的静态成员，下列说法错误的是（ ）。",
            options: ["静态成员变量为所有对象共有", "静态成员函数可以直接访问非静态成员变量", "静态成员需要在类外初始化", "可以通过类名直接调用静态成员函数"],
            answer: 1,
            score: 2,
            explanation: "静态成员函数没有 this 指针，无法直接访问非静态（实例）成员变量。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 16,
            type: "judge",
            question: "如果将双向链表的最后一个结点的下一项指针指向第一个结点，第一个结点的前一项指针指向最后一个结点，则该双向链表构成循环链表。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "双向循环链表的定义。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 17,
            type: "judge",
            question: "数组和链表都是线性表，链表的优点是插入删除不需要移动元素，并且能随机查找。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "链表不能随机查找（只能顺序查找）。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 18,
            type: "judge",
            question: "链表的存储空间物理上可以连续，也可以不连续。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "链表通过指针逻辑相连，物理存储位置无要求。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 19,
            type: "judge",
            question: "找出自然数 n 以内的所有质数，常用算法有埃拉托斯特尼（埃氏）筛法和线性筛法，其中埃氏筛法效率更高。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "线性筛法（欧拉筛）效率更高，时间复杂度为 O(N)。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 20,
            type: "judge",
            question: "唯一分解定理表明任何一个大于 1 的整数都可以唯一地表示为一系列质数的乘积，即质因数分解是唯一的。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "算术基本定理的内容。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 21,
            type: "judge",
            question: "贪心算法通过每一步选择局部最优解来获得全局最优解，但并不一定能找到最优解。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "贪心算法的特性说明。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 22,
            type: "judge",
            question: "归并排序和快速排序都采用递归实现，也都是不稳定排序。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "归并排序是稳定的排序算法，快速排序是不稳定的。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 23,
            type: "judge",
            question: "插入排序有时比快速排序时间复杂度更低。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "在数组几乎有序时，插入排序为 O(N)，优于快排。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 24,
            type: "judge",
            question: "在进行全国人口普查时，将其分解为对每个省市县乡来进行普查和统计。这是典型的分治策略。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "大问题拆分为小问题分别解决再汇总，符合分治思想。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 25,
            type: "judge",
            question: "在 C++ 代码中，执行 `delete ptr;` 后，ptr 对应的数据被销毁，再次使用该指针会导致未定义行为。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "悬挂指针（Dangling Pointer）问题。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        ...programmingQuestions
    ]
};
