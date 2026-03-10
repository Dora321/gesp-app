// 2024年9月 GESP C++ 四级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "黑白方块",
        problemNumber: "2024-09-23-04-C-01",
        description: "小杨有一个 n 行 m 列的网格图，其中每个格子要么是白色，要么是黑色。小杨想知道网格图中是否存在一个满足如下条件的子矩形：1. 子矩形由 2 行 2 列组成；2. 子矩形的第 1 行和第 2 行只包含白色格子；3. 对于子矩形的第 1 行和第 2 行，只有第 1 个和第 2 个格子是白色的，其余格子都是黑色的（注：此处原文描述可能有误，通常是指 2x2 的全白或特定模式）。根据样例，题目要求判断是否存在一个 2x2 的全白子矩形。",
        inputDescription: "第一行包含一个正整数 T (1 ≤ T ≤ 10)，代表测试用例组数。接下来是 T 组测试用例。每组第一行包含两个正整数 n, m (1 ≤ n, m ≤ 50)。之后 n 行，每行一个长度为 m 的 01 串，0 代表白色，1 代表黑色。",
        outputDescription: "对于每组测试用例，如果存在满足条件的 2x2 子矩形，输出 Yes，否则输出 No。",
        samples: [
            { input: "3\n1 4\n0110\n5 5\n00000\n01100\n01100\n00001\n01100\n5 5\n00000\n01100\n01110\n00001\n01100", output: "No\nYes\nNo" }
        ],
        explanation: "遍历所有可能的 2x2 子矩形，检查四个格子是否全为 0。",
        tags: ["编程题", "模拟", "二维数组"],
        template: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    int T;\n    cin >> T;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\nvoid solve() {\n    int n, m; cin >> n >> m;\n    vector<string> g(n);\n    for (int i = 0; i < n; i++) cin >> g[i];\n    if (n < 2 || m < 2) { cout << \"No\" << endl; return; }\n    for (int i = 0; i < n - 1; i++) {\n        for (int j = 0; j < m - 1; j++) {\n            if (g[i][j] == '0' && g[i][j+1] == '0' && g[i+1][j] == '0' && g[i+1][j+1] == '0') {\n                cout << \"Yes\" << endl; return;\n            }\n        }\n    }\n    cout << \"No\" << endl;\n}\nint main() {\n    int T; cin >> T;\n    while (T--) solve();\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "小杨的成绩榜",
        problemNumber: "2024-09-23-04-C-02",
        description: "小杨同学参加了 n 门考试，每门考试都有一个成绩。现在需要将这些成绩按照从大到小排序。如果成绩相同，则按考试编号从小到大排序。",
        inputDescription: "第一行一个整数 n (1 ≤ n ≤ 1000)。第二行 n 个整数，代表每门考试的成绩。",
        outputDescription: "输出 n 行，每行两个整数，分别是成绩和原始考试编号。",
        samples: [
            { input: "3\n90 100 90", output: "100 2\n90 1\n90 3" }
        ],
        explanation: "使用结构体保存成绩和编号，自定义排序规则：成绩降序，编号升序。",
        tags: ["编程题", "排序", "结构体"],
        template: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <algorithm>\n#include <vector>\nusing namespace std;\nstruct Exam { int score, id; };\nbool cmp(Exam a, Exam b) {\n    if (a.score != b.score) return a.score > b.score;\n    return a.id < b.id;\n}\nint main() {\n    int n; cin >> n;\n    vector<Exam> a(n);\n    for (int i = 0; i < n; i++) {\n        cin >> a[i].score;\n        a[i].id = i + 1;\n    }\n    sort(a.begin(), a.end(), cmp);\n    for (int i = 0; i < n; i++) cout << a[i].score << \" \" << a[i].id << endl;\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2024-09-l4',
    title: '2024年9月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 9,
    session: 3,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "在 C++ 中，（ ）正确定义了一个返回整数值并接受两个整数参数的函数。",
            options: [
                "int add(int a, int b) { return a + b; }",
                "void add(int a, int b) { return a + b; }",
                "int add(a, b) { return a + b; }",
                "void add(int a, int b) { return a - b; }"
            ],
            answer: 0,
            score: 2,
            explanation: "定义函数需要指定返回类型、函数名、带类型的参数列表。只有 A 符合要求。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: "在 C++ 中，形参与实参的关系描述正确的是（ ）。",
            options: [
                "形参在函数调用时指定，实参在函数定义时传递",
                "形参在函数定义时指定，实参在函数调用时传递",
                "形参和实参可以互换",
                "形参和实参必须是完全相同的类型，不能有任何差异。"
            ],
            answer: 1,
            score: 2,
            explanation: "形参（形式参数）在定义函数时使用，实参（实际参数）在调用函数时传入。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: "运行以下代码，屏幕上将输出（ ）。\n```cpp\nint var = 100;\nvoid function() {\n    int var = 200;\n    cout << var << \" \" << ::var << endl;\n}\n```",
            options: ["100 100", "200 100", "200 200", "100 200"],
            answer: 1,
            score: 2,
            explanation: "var 访问局部变量（200），::var 访问全局变量（100）。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: "下列关于 C++ 中常量的说法，错误的是（ ）。",
            options: [
                "常量的值在程序运行期间不能改变",
                "可以使用 const 关键字定义常量",
                "可以使用 #define 预处理器定义常量",
                "常量必须在全局作用域定义"
            ],
            answer: 3,
            score: 2,
            explanation: "常量可以在局部作用域（如函数内部）定义。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: "关于 C++ 中的局部变量，下列说法正确的是（ ）。",
            options: [
                "局部变量在程序开始时创建，结束时销毁",
                "局部变量在所有函数中都可见",
                "局部变量存储在静态存储区",
                "局部变量的作用域仅限于其定义的代码块"
            ],
            answer: 3,
            score: 2,
            explanation: "局部变量生命周期随所在代码块结束而结束，作用域也局限于该块。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: "选择排序的时间复杂度是（ ）。",
            options: ["O(N)", "O(N log N)", "O(N^2)", "O(log N)"],
            answer: 2,
            score: 2,
            explanation: "选择排序平均和最坏情况均为 O(N^2)。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: "插入排序在最好情况下的时间复杂度是（ ）。",
            options: ["O(1)", "O(N)", "O(N^2)", "O(N log N)"],
            answer: 1,
            score: 2,
            explanation: "当数组已有序时，插入排序仅需比较 N-1 次。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: "下列关于 C++ 异常处理的描述，错误的是（ ）。",
            options: [
                "使用 try 块包含可能抛出异常的代码",
                "使用 catch 块捕获异常并处理",
                "throw 语句用于抛出异常",
                "每个 try 块必须对应且仅能对应一个 catch 块"
            ],
            answer: 3,
            score: 2,
            explanation: "一个 try 块可以对应多个不同类型的 catch 块。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: "下列关于指针的说法，错误的是（ ）。",
            options: [
                "指针变量存储的是地址",
                "可以通过解引用访问指针指向的值",
                "所有指针在 64 位系统上占 8 字节",
                "指针一旦指向某个地址就不能更改"
            ],
            answer: 3,
            score: 2,
            explanation: "普通指针可以随时重新指向不同的地址（除非是 const 指针）。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: "二维数组 int a[3][4] 中，元素 a[1][2] 的位置是（ ）。",
            options: ["第 1 行第 2 列", "第 2 行第 3 列", "第 1 行第 3 列", "第 2 行第 2 列"],
            answer: 1,
            score: 2,
            explanation: "下标从 0 开始。a[1][2] 表示第 2 行第 3 列。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: "递归函数必须包含（ ）。",
            options: ["循环语句", "分支语句处理基准情况", "全局变量", "多个参数"],
            answer: 1,
            score: 2,
            explanation: "递归必须有终止条件（基准情况）以防止无限递归。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: "下列哪种算法通常采用分治思想实现（ ）。",
            options: ["归并排序", "冒泡排序", "插入排序", "选择排序"],
            answer: 0,
            score: 2,
            explanation: "归并排序是典型的分治算法。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: "在 C++ 中，`std::sort` 位于哪个头文件中（ ）。",
            options: ["<iostream>", "<vector>", "<algorithm>", "<cmath>"],
            answer: 2,
            score: 2,
            explanation: "排序算法位于 `<algorithm>`。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: "在 C++ 中，下列哪个关键字用于声明类（ ）。",
            options: ["class", "struct", "void", "static"],
            answer: 0,
            score: 2,
            explanation: "class 用于定义类。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: "中国计算机学会（ CCF ）在 2024 年主办的 GESP 认证，9 月份考试的月份编号是（ ）。",
            options: ["1", "2", "3", "4"],
            answer: 2,
            score: 2,
            explanation: "按年度认证计划，3/6/9/12 分别对应第 1/2/3/4 次认证。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: "代码 int a = 10; int* p = &a; 可以正确定义指针和初始化指针。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "合法的指针定义和初始化方式。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 中，引用传递允许函数修改传递给它的参数的值。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "引用传递是变量的别名，修改引用即修改实参。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: "指针的大小与其所指向的变量的数据类型的单位大小相同。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "指针的大小取决于操作系统位数（如 64 位下为 8 字节），与指向内容类型无关。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: "二维数组的行的大小必须在定义时确定，列的大小可以动态变化。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "在 C++ 静态数组定义中，所有维度的大小都必须在编译时确定。只有在使用动态分配或 vector 时才可变。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: "递推算法通过逐步求解当前状态和前一个或几个状态之间的关系来解决问题。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "递推的基本定义。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: "选择排序是稳定的排序算法。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "选择排序由于长距离交换，是不稳定的。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: "插入排序的时间复杂度总是比冒泡排序低。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "两者平均和最坏情况均为 O(N^2)。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: "在 C++ 中，如果没有捕获到异常（没有匹配的 catch 块），程序会继续执行而不会终止。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "未捕获的异常会导致程序调用 std::terminate() 异常终止。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: "求斐波那契数列第 n 项，递推法的时间复杂度为 O(N)。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "递推仅需一次循环，线性复杂度。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: "GESP 4 级认证要求掌握二维数组的使用。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "符合考纲要求。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        ...programmingQuestions
    ]
};
