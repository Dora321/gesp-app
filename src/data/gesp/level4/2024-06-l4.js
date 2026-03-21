// 2024年6月 GESP C++ 四级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        score: 25,
        title: "平衡子矩形",
        problemNumber: "2024-06-23-04-C-01",
        description: "小杨有一个 n 行 m 列网格图，其中每个格子要么是白色，要么是黑色。对于网格图中的一个子矩形，小杨认为它是平衡的当且仅当其中黑色格子与白色格子数量相同。小杨想知道最大的平衡子矩形包含了多少个格子。",
        inputDescription: "第一行包含两个正整数 n, m (1 ≤ n, m ≤ 50)。之后 n 行，每行一个长度为 m 的 01 串，0 代表白色，1 代表黑色。",
        outputDescription: "输出一个整数，代表最大的平衡子矩形包含格子的数量，如果不存在则输出 0。",
        samples: [
            { input: "4 5\n00000\n01111\n00011\n00011", output: "16" }
        ],
        explanation: "由于 n, m 较小（最大 50），可以枚举所有可能的子矩形（左上角 (r1, c1) 和右下角 (r2, c2)），然后利用二维前缀和快速计算子矩形内 1 的个数。如果 1 的个数正好等于矩形面积的一半，则该矩形平衡。",
        tags: ["编程题", "二维前缀和", "暴力枚举"],
        template: "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nint main() {\n    int n, m; cin >> n >> m;\n    vector<vector<int>> s($n+1$, vector<int>(m+1, 0));\n    for (int i = 1; i <= n; i++) {\n        string row; cin >> row;\n        for (int j = 1; j <= m; j++) {\n            s[i][j] = s[i-1][j]+s[i][j-1]-s[i-1][j-1]+(row[j-1]-'0');\n        }\n    }\n    int max_area = 0;\n    for (int r1 = 1; r1 <= n; r1++) {\n        for (int c1 = 1; c1 <= m; c1++) {\n            for (int r2 = r1; r2 <= n; r2++) {\n                for (int c2 = c1; c2 <= m; c2++) {\n                    int area = (r2-r1+1) * (c2-c1+1);\n                    if (area % 2 != 0) continue;\n                    int ones = s[r2][c2]-s[r1-1][c2]-s[r2][c1-1]+s[r1-1][c1-1];\n                    if (ones * 2 == area) max_area = max(max_area, area);\n                }\n            }\n        }\n    }\n    cout << max_area << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        score: 25,
        title: "做题",
        problemNumber: "2024-06-23-04-C-02",
        description: "小杨同学为了提高实力制定了做题计划，在第 i 天时，他必须要完成 i 道题。他找到了 n 套题单，每套题单有一定数量的题目。每套题单只能使用一次，每一天也只能使用一套题单里的题目。问小杨最多会做题几天才偷懒？",
        inputDescription: "第一行 1 个数为 n (1 ≤ n ≤ 1,000,000)。第二行 n 个整数 ai，分别表示每套题单有多少道题。",
        outputDescription: "输出一行，小杨同学偷懒前最多做题天数。",
        samples: [
            { input: "4\n3 1 4 1", output: "3" }
        ],
        explanation: "贪心策略：排序后，从小到大匹配每一天所需的题目数量。如果当前题单满足当前天数要求，则进入下一天。",
        tags: ["编程题", "贪心", "排序"],
        template: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    sort(a.begin(), a.end());\n    int day = 0;\n    for (int i = 0; i < n; i++) {\n        if (a[i] >= day+1) day++;\n    }\n    cout << day << endl;\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2024-06-l4',
    title: '2024年6月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 6,
    session: 2,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下列代码中，输出结果是（ ）。\n```cpp\nint a = 12, b = 24;\nint *p1 = &a, *p2 = &b;\n*p1 = *p2;\n*p2 = *p1;\ncout << a << \" \" << b << \" \" << *p1 << \" \" << *p2 << endl;\n```",
            options: ["12 24 24 12", "24 24 24 24", "12 12 24 24", "24 12 12 24"],
            answer: 1,
            score: 2,
            explanation: "*p1 = *p2 使得 a 的值变为 24。*p2 = *p1 使得 b 的值变为 a 的当前值（24）。因此全部为 24。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: "下面函数不能正常执行的是（ ）。",
            options: ["int f(int x) { return x; }", "void f(int &x) { x++; }", "int& f(int x) { return x; }", "void f(const int x) { }"],
            answer: 2,
            score: 2,
            explanation: "返回局部变量的引用是非法的，因为函数结束后局部变量会被销毁，引用将指向无效地址。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: "下面程序输出的是（ ）。\n```cpp\nint a = 2, b = 10;\nint &r = a;\nr = b;\nb = r * r;\ncout << a << \" \" << b << \" \" << r << endl;\n```",
            options: ["2 10 10", "10 100 10", "10 10 10", "2 100 10"],
            answer: 1,
            score: 2,
            explanation: "r 是 a 的引用。r = b 使得 a 变为 10。b = r * r 使得 b 变为 100。输出 a=10, b=100, r=10。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: "假设变量 a 的地址是 0x6ffe14，下面程序的输出是（ ）。\n```cpp\nint a = 10;\nint *p = &a;\ncout << p << \" \" << p+1 << endl;\n```",
            options: ["0x6ffe14 0x6ffe15", "0x6ffe14 0x6ffe18", "0x6ffe14 0x6ffe14", "0x6ffe14 0x6ffe1c"],
            answer: 1,
            score: 2,
            explanation: "p+1 在地址上增加的是指针所指向类型的大小。int 占 4 字节，0x6ffe14+4 = 0x6ffe18。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: "在 C++ 中，关于引用和指针的描述，错误的是（ ）。",
            options: ["引用必须初始化，指针可以不初始化", "引用初始化后不能更改，指针可以随时指向别处", "引用占用内存空间，指针不占用内存空间", "引用没有空引用，指针可以有空指针"],
            answer: 2,
            score: 2,
            explanation: "引用在底层通常通过指针实现，但逻辑上被视为变量的别名。指针本身是一个变量，必然占用内存空间用于存储地址。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: "下列关于递归的描述，正确的是（ ）。",
            options: ["递归函数不需要终止条件", "递归函数必须调用自身", "递归总是比循环更高效", "递归调用不会增加栈空间开销"],
            answer: 1,
            score: 2,
            explanation: "递归的定义就是函数直接或间接调用自身。递归必须有终止条件，且由于压栈开销，通常比循环低效。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: "关于 static 关键字，下列说法正确的是（ ）。",
            options: ["static 修饰的局部变量在函数结束后销毁", "static 修饰的全局变量在所有文件中可见", "static 修饰的局部变量仅在第一次调用时初始化", "static 不能修饰类成员"],
            answer: 2,
            score: 2,
            explanation: "静态局部变量存储在全局数据区，生命周期贯穿整个程序，且只在第一次进入函数时初始化一次。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: "在 C++ 中，下列哪个操作符不能被重载（ ）。",
            options: ["::", "++", "<<", "+"],
            answer: 0,
            score: 2,
            explanation: "作用域限定符 `::`、成员访问运算符 `.`、条件运算符 `?:`、sizeof 等不能被重载。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: "下面有关 C++ 类的说法，错误的是（ ）。",
            options: ["类可以包含私有成员", "构造函数可以有参数", "一个类必须显式定义构造函数", "析构函数不能重载"],
            answer: 2,
            score: 2,
            explanation: "如果类中没有定义构造函数，编译器会生成一个默认的无参构造函数。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: "选择排序在最坏情况下的时间复杂度是（ ）。",
            options: ["$O(N)$", "$O(n \log n)$", "$O(N^2)$", "$O(1)$"],
            answer: 2,
            score: 2,
            explanation: "选择排序无论最好还是最坏情况，都需要进行两层循环，复杂度均为 $O(N^2)$。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: "快速排序算法采用的思想是（ ）。",
            options: ["分治", "贪心", "动态规划", "搜索"],
            answer: 0,
            score: 2,
            explanation: "快速排序通过基准值划分区间，分别递归处理，是典型的分治算法。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: "在 C++ 中，`std::sort` 默认采用的排序规则是（ ）。",
            options: ["降序", "升序", "随机", "不确定"],
            answer: 1,
            score: 2,
            explanation: "std::sort 默认使用 `<` 运算符进行升序排序。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: "下列哪个关键字用于声明基类的成员在派生类中可见但对外部不可见（ ）。",
            options: ["private", "public", "protected", "virtual"],
            answer: 2,
            score: 2,
            explanation: "protected 成员在派生类内部可以访问，但类外部无法访问。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: "下面代码输出的是（ ）。\n```cpp\nint a = 5;\nconst int *p = &a;\na = 10;\ncout << *p << endl;\n```",
            options: ["5", "10", "编译错误", "运行错误"],
            answer: 1,
            score: 2,
            explanation: "const int *p 表示不能通过指针 p 修改 a 的值，但 a 本身的值可以通过其他方式（如直接赋值）改变。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: "中国计算机学会（ CCF ）主办的 GESP 认证，主要面向（ ）。",
            options: ["大学生", "职场人士", "青少年", "科研人员"],
            answer: 2,
            score: 2,
            explanation: "GESP 是 CCF 面向青少年的编程能力等级认证。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: "int& a 和 &a 是一样的，都是取 a 的地址。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "int& a 是声明一个引用，&a 是取地址运算符。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 中，引用一旦初始化就不能再绑定到其他对象。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "引用的本质是别名，初始化后始终绑定到该对象，无法更改指向。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: "引用是一个指针常量。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "在底层实现上，引用通常被编译器处理为 T* const 指针。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: "函数可以调用自己。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "这就是递归函数。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: "静态变量在程序运行结束前不会被销毁。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "静态变量存储在静态存储区，生命周期与程序相同。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: "C++ 中类的构造函数可以重载。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "构造函数可以根据参数列表的不同进行重载。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: "冒泡排序的时间复杂度总是 $O(N^2)$。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "优化后的冒泡排序在最好情况下（数组已有序）的时间复杂度可以达到 $O(N)$。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: "分治算法的核心是将大问题分解为性质相同的子问题。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "分治的核心是分而治之。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: "在 C++ 中，可以通过指针修改 const 修饰的局部变量的值。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "尝试通过指针修改 const 变量会导致未定义行为，编译器通常会阻止或导致运行时错误。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: "GESP 认证的题目中，客观题包括单选题和判断题。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "GESP 笔试部分确实由单选和判断组成。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        ...programmingQuestions
    ]
};
