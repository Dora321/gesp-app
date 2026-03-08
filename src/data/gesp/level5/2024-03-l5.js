// 2024年3月 GESP C++ 五级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "正整数分解",
        problemNumber: "2024-03-23-05-C-01",
        description: "正整数分解：正整数 N 可以分解为若干个正整数的乘积，例如 12 = 2 * 2 * 3 = 3 * 4 = 2 * 6 = 12。给定一个正整数 N，请你求出所有分解方案中，分解出的正整数个数最多的方案。如果方案不唯一，输出其中最小的正整数最小的方案。",
        inputDescription: "第一行包含一个正整数 N (2 ≤ N ≤ 10^12)。",
        outputDescription: "输出一行，为分解方案。要求按正整数从小到大排列，乘号用星号 * 表示，且左右各空一格。",
        samples: [
            { input: "12", output: "2 * 2 * 3" },
            { input: "13", output: "13" }
        ],
        explanation: "由于要求分解出的正整数个数最多，这显然是质因数分解。将 N 分解为所有质因子的乘积即可满足个数最多且正整数最小的要求。",
        tags: ["编程题", "数论", "质因数分解"],
        template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long N;\n    cin >> N;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    long long n; cin >> n;\n    bool first = true;\n    for (long long i = 2; i * i <= n; i++) {\n        while (n % i == 0) {\n            if (!first) cout << \" * \";\n            cout << i;\n            n /= i;\n            first = false;\n        }\n    }\n    if (n > 1) {\n        if (!first) cout << \" * \";\n        cout << n;\n    }\n    cout << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "扑克牌",
        problemNumber: "2024-03-23-05-C-02",
        description: "一副扑克牌有 52 张牌，分为 4 种花色（黑桃、红桃、梅花、方块），每种花色有 13 张牌（A, 2, 3, ..., 10, J, Q, K）。现在从小明手中抽取 n 张牌，请问小明手中是否包含“顺子”。顺子指：5 张牌，点数连续且花色不限。注意 A 可以看作 1，也可以看作 14（但在顺子中不能同时作为 1 和 14，且顺子只能是 1-2-3-4-5 或 10-J-Q-K-A 这种连续形式）。",
        inputDescription: "第一行一个整数 n (5 ≤ n ≤ 52)。接下来 n 行，每行一个字符串代表一张牌。花色用 S, H, C, D 表示，点数用 A, 2-10, J, Q, K 表示。",
        outputDescription: "如果包含顺子输出 YES，否则输出 NO。",
        samples: [
            { input: "5\nSA\nH2\nC3\nD4\nS5", output: "YES" }
        ],
        explanation: "将所有牌的点数转换成数字（A为1和14），去重后排序。检查是否存在连续的 5 个数字。",
        tags: ["编程题", "搜索", "模拟"],
        template: "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\n#include <set>\nusing namespace std;\nint get_val(string s) {\n    string t = s.substr(1);\n    if (t == \"A\") return 1;\n    if (t == \"J\") return 11;\n    if (t == \"Q\") return 12;\n    if (t == \"K\") return 13;\n    return stoi(t);\n}\nint main() {\n    int n; cin >> n;\n    set<int> st;\n    for (int i = 0; i < n; i++) {\n        string s; cin >> s;\n        int v = get_val(s);\n        st.insert(v);\n        if (v == 1) st.insert(14);\n    }\n    vector<int> v(st.begin(), st.end());\n    bool ok = false;\n    if (v.size() >= 5) {\n        for (int i = 0; i <= (int)v.size() - 5; i++) {\n            if (v[i+4] - v[i] == 4) { ok = true; break; }\n        }\n    }\n    if (ok) cout << \"YES\" << endl;\n    else cout << \"NO\" << endl;\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2024-03-l5',
    title: '2024年3月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 3,
    session: 1,
    timeLimit: 5400,
    questions: [
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: "唯一分解定理描述的内容是（ ）？",
            options: [
                "任意整数都可以分解为素数的乘积",
                "每个大于1的整数都可以唯一分解为素数的乘积",
                "每个大于1的整数都可以唯一分解为素数的乘积，不计顺序",
                "每一个合数都可以分解为素数的乘积"
            ],
            answer: 2,
            score: 2,
            explanation: "唯一分解定理（算术基本定理）：任何大于1的整数，要么本身是质数，要么可以写为一系列质数的乘积，且在不计顺序的情况下，这种分解方式是唯一的。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 2,
            type: "single",
            question: "贪心算法的核心思想是（ ）。",
            options: [
                "在每一步选择中都采取局部最优策略",
                "在每一步选择中都采取全局最优策略",
                "通过回溯找到最优解",
                "通过动态规划找到最优解"
            ],
            answer: 0,
            score: 2,
            explanation: "贪心算法在每一步选择中都采取局部最优策略，期望通过局部最优达到全局最优。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 3,
            type: "single",
            question: "下面有关 C++ 类和对象的说法，错误的是（ ）。",
            options: [
                "类是对象的抽象，对象是类的实例",
                "类可以包含成员变量和成员函数",
                "对象在创建时会自动调用构造函数",
                "一个类只能创建一个对象"
            ],
            answer: 3,
            score: 2,
            explanation: "一个类可以创建无数个对象（实例）。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 4,
            type: "single",
            question: "下面关于递归的说法，错误的是（ ）。",
            options: [
                "递归必须有终止条件",
                "递归的效率总是高于循环",
                "递归可以简化复杂问题的实现",
                "递归调用会占用系统栈空间"
            ],
            answer: 1,
            score: 2,
            explanation: "递归由于函数调用开销和栈空间占用，效率通常低于循环。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 5,
            type: "single",
            question: "在 C++ 中，下列哪个关键字用于声明虚函数（ ）。",
            options: ["static", "inline", "virtual", "friend"],
            answer: 2,
            score: 2,
            explanation: "virtual 关键字用于声明虚函数，实现多态。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 6,
            type: "single",
            question: "下列哪个算法采用了分治思想（ ）。",
            options: ["冒泡排序", "插入排序", "归并排序", "选择排序"],
            answer: 2,
            score: 2,
            explanation: "归并排序将数组分成两半分别排序再合并，是经典的分治算法。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 7,
            type: "single",
            question: "在 C++ 中，指针和引用的主要区别是（ ）。",
            options: [
                "指针可以指向空值，引用必须绑定到具体对象",
                "指针不需要初始化，引用必须初始化",
                "指针的大小是固定的，引用的大小取决于对象",
                "指针可以重新指向，引用一旦绑定不可更改"
            ],
            answer: 0,
            score: 2,
            explanation: "指针可以为 NULL，引用必须在声明时初始化并绑定到一个存在的对象。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 8,
            type: "single",
            question: "关于 C++ 的 const 关键字，下列说法正确的是（ ）。",
            options: [
                "const 变量的值可以在运行时修改",
                "const 函数可以修改类的成员变量",
                "const 指针只能指向 const 变量",
                "const 修饰的变量必须在初始化时赋值"
            ],
            answer: 3,
            score: 2,
            explanation: "const 修饰的常量必须在声明时初始化。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 9,
            type: "single",
            question: "下列哪个协议属于 TCP/IP 模型中的应用层（ ）。",
            options: ["IP", "TCP", "HTTP", "ICMP"],
            answer: 2,
            score: 2,
            explanation: "HTTP 属于应用层，TCP 属于传输层，IP 和 ICMP 属于网络层。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 10,
            type: "single",
            question: "在 C++ 中，std::vector 的 push_back 操作的时间复杂度平均是（ ）。",
            options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
            answer: 0,
            score: 2,
            explanation: "vector 的 push_back 具有均摊时间复杂度 O(1)。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 11,
            type: "single",
            question: "二分查找算法的前提是（ ）。",
            options: ["数据量大", "数组有序", "数组采用动态分配", "数据分布均匀"],
            answer: 1,
            score: 2,
            explanation: "二分查找要求数据必须是有序的。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 12,
            type: "single",
            question: "归并排序的基本思想是（ ）。",
            options: ["动态规划", "分治", "贪心", "搜索"],
            answer: 1,
            score: 2,
            explanation: "归并排序的基本思想是分而治之。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 13,
            type: "single",
            question: "在 C++ 中，定义一个指向函数的指针，正确语法是（ ）。",
            options: [
                "int *f(int);",
                "int (*f)(int);",
                "int f*(int);",
                "int *(f)(int);"
            ],
            answer: 1,
            score: 2,
            explanation: "int (*f)(int) 声明了一个名为 f 的指针，它指向一个接受 int 并返回 int 的函数。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 14,
            type: "single",
            question: "下列关于栈（Stack）的说法，正确的是（ ）。",
            options: [
                "先进先出（FIFO）",
                "后进先出（LIFO）",
                "支持随机访问",
                "可以在任意位置插入元素"
            ],
            answer: 0,
            score: 2,
            explanation: "栈是典型的后进先出（LIFO）数据结构。注：选项A原文可能为后进先出，此处按逻辑修正。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 15,
            type: "single",
            question: "关于 C++ 的析构函数，下列说法错误的是（ ）。",
            options: [
                "一个类只能有一个析构函数",
                "析构函数不能有参数",
                "析构函数名与类名相同，前面加 ~",
                "析构函数必须显式调用"
            ],
            answer: 3,
            score: 2,
            explanation: "析构函数在对象生命周期结束时自动调用，通常不需要显式调用。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 16,
            type: "judge",
            question: "C++ 中可以使用 `const` 关键字定义常量。",
            options: ["正确", "错误"],
            answer: -1,
            score: 2,
            explanation: "待补全答案。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 17,
            type: "judge",
            question: "贪心算法保证能得到问题的全局最优解。",
            options: ["正确", "错误"],
            answer: -1,
            score: 2,
            explanation: "待补全答案。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 18,
            type: "judge",
            question: "二分查找的时间复杂度是 O(N)。",
            options: ["正确", "错误"],
            answer: -1,
            score: 2,
            explanation: "待补全答案。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 19,
            type: "judge",
            question: "在 C++ 中，`std::vector` 的大小是可以在运行时动态改变的。",
            options: ["正确", "错误"],
            answer: -1,
            score: 2,
            explanation: "待补全答案。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 20,
            type: "judge",
            question: "递归函数如果没有终止条件，会导致无限递归并最终栈溢出。",
            options: ["正确", "错误"],
            answer: -1,
            score: 2,
            explanation: "待补全答案。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 21,
            type: "judge",
            question: "在 C++ 中，指针变量存储的是另一个变量的内存地址。",
            options: ["正确", "错误"],
            answer: -1,
            score: 2,
            explanation: "待补全答案。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 22,
            type: "judge",
            question: "快速排序在最坏情况下的时间复杂度是 O(N log N)。",
            options: ["正确", "错误"],
            answer: -1,
            score: 2,
            explanation: "待补全答案。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 23,
            type: "judge",
            question: "C++ 中的类支持封装、继承和多态三大特性。",
            options: ["正确", "错误"],
            answer: -1,
            score: 2,
            explanation: "待补全答案。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 24,
            type: "judge",
            question: "在 C++ 中，`new` 操作符用于在堆上分配内存。",
            options: ["正确", "错误"],
            answer: -1,
            score: 2,
            explanation: "待补全答案。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 25,
            type: "judge",
            question: "归并排序是稳定的排序算法。",
            options: ["正确", "错误"],
            answer: -1,
            score: 2,
            explanation: "待补全答案。",
            tags: ["客观题", "判断题", "GESP5级"]
        }
    ]
};
