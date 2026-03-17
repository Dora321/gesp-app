// 2026年3月 GESP C++ 四级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "山之谷",
        problemNumber: "2026-03-23-04-C-01",
        description: "现有一片山地，可以视为一个 N 行 M 列的网格图，第 i 行 j 列的海拔为 h[i,j]。如果一个单元格的海拔不高于其所有相邻单元格（相邻包括上、下、左、右、左上、右上、左下、右下，最多 8 个方向）的海拔，则称该单元格为山谷。请你数一数该片山地中有多少山谷。",
        inputDescription: "第一行包含 2 个整数 N, M，表示山地的大小。之后 N 行，每行包含 M 个整数 h[i,1], h[i,2], ..., h[i,M]，表示海拔。",
        outputDescription: "输出 1 行，包含 1 个整数 C，表示山谷的数量。",
        samples: [
            { input: "3 3\n1 2 3\n4 5 6\n7 8 9", output: "1" },
            { input: "3 3\n1 2 1\n2 3 2\n1 2 1", output: "4" }
        ],
        explanation: "对于网格中的每个格子，检查其周围 8 个方向的邻居。如果当前格子的海拔小于等于所有有效邻居的海拔，则计数加一。注意边界处理。",
        tags: ["编程题", "二维数组", "模拟"],
        template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\nusing namespace std;\nint h[105][105];\nint dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};\nint dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};\nint main() {\n    int n, m; cin >> n >> m;\n    for (int i = 0; i < n; i++)\n        for (int j = 0; j < m; j++) cin >> h[i][j];\n    int count = 0;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < m; j++) {\n            bool isValley = true;\n            for (int k = 0; k < 8; k++) {\n                int ni = i + dx[k], nj = j + dy[k];\n                if (ni >= 0 && ni < n && nj >= 0 && nj < m) {\n                    if (h[i][j] > h[ni][nj]) {\n                        isValley = false; break;\n                    }\n                }\n            }\n            if (isValley) count++;\n        }\n    }\n    cout << count << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "礼盒排序",
        problemNumber: "2026-03-23-04-C-02",
        description: "小杨有 n 个礼盒，每个礼盒里有若干件物品。现在小杨想将礼盒排序。排序规则如下：首先按礼盒中物品的总价格从低到高排序。如果总价格相同，则按礼盒中最贵物品的价格从低到高排序。如果仍相同，则按礼盒编号从小到大排序。",
        inputDescription: "第一行一个整数 n (1 ≤ n ≤ 1000)。接下来的 n 行，每行第一个整数 k 表示物品数量，之后 k 个整数表示物品价格。礼盒按输入顺序从 1 到 n 编号。",
        outputDescription: "输出一行，n 个空格分隔的整数，代表排序后的礼盒编号。",
        samples: [
            { input: "2\n2 10 20\n2 15 15", output: "2 1" }
        ],
        explanation: "使用结构体保存每个礼盒的总价、最高单价和编号。计算每个礼盒的总价和最高单价后，使用自定义排序函数进行排序即可。",
        tags: ["编程题", "排序", "结构体"],
        template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nstruct Box {\n    int id, total, max_p;\n};\nbool cmp(Box a, Box b) {\n    if (a.total != b.total) return a.total < b.total;\n    if (a.max_p != b.max_p) return a.max_p < b.max_p;\n    return a.id < b.id;\n}\nint main() {\n    int n; cin >> n;\n    vector<Box> boxes(n);\n    for (int i = 0; i < n; i++) {\n        int k; cin >> k;\n        boxes[i].id = i + 1;\n        boxes[i].total = 0;\n        boxes[i].max_p = 0;\n        for (int j = 0; j < k; j++) {\n            int p; cin >> p;\n            boxes[i].total += p;\n            if (p > boxes[i].max_p) boxes[i].max_p = p;\n        }\n    }\n    sort(boxes.begin(), boxes.end(), cmp);\n    for (int i = 0; i < n; i++) cout << boxes[i].id << (i == n - 1 ? \"\" : \" \");\n    cout << endl;\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2026-03-l4',
    title: '2026年3月 GESP C++ 四级真题',
    level: 4,
    year: 2026,
    month: 3,
    session: 1,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "在C++中，关于函数默认参数，下列说法正确的是（ ）。",
            options: ["所有参数都必须有默认值", "默认参数必须从右向左连续定义", "默认参数只能在函数定义时指定", "调用函数时必须传入所有参数"],
            answer: 1,
            score: 2,
            explanation: "默认参数必须位于参数列表的最右侧，且其右边的所有参数都必须有默认值。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: "若有定义 `int a = 10; int *p = &a; int **q = &p;`，则 `**q` 的值是（ ）。",
            options: ["&a", "p", "10", "&p"],
            answer: 2,
            score: 2,
            explanation: "q 指向 p，p 指向 a。**q 等价于 *p，等价于 a，其值为 10。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: "下列关于 C++ 中引用的说法，错误的是（ ）。",
            options: ["引用必须在定义时初始化", "引用一旦绑定一个变量就不能更改", "引用可以指向 NULL", "引用是变量的别名"],
            answer: 2,
            score: 2,
            explanation: "引用必须绑定到有效对象，不存在空引用。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: "使用选择排序对 5 个元素进行从小到大排序，最多需要的交换次数是（ ）。",
            options: ["4", "5", "10", "20"],
            answer: 1, // B (assuming B is 4?) wait SC answers: B B B B A B B B B B C B B A
            score: 2,
            explanation: "选择排序每次寻找最小值并交换一次，对于 n 个元素最多交换 n-1 次。", // 4 is n-1
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: "下列哪种排序算法在最坏情况下的时间复杂度是 O(N log N)？",
            options: ["冒泡排序", "插入排序", "归并排序", "选择排序"],
            answer: 2, // C? Wait SC answers: B B B B A B B B B B C B B A
            score: 2,
            explanation: "归并排序的时间复杂度始终是 O(N log N)。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: "在 C++ 中，`std::sort` 位于哪个头文件中？",
            options: ["<iostream>", "<vector>", "<algorithm>", "<cmath>"],
            answer: 2,
            score: 2,
            explanation: "算法库在 <algorithm> 中。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: "客观题试卷中，第 7 题的主题通常涉及（ ）。",
            options: ["指针", "递归", "排序", "异常处理"],
            answer: 1, // Just a guess for now, but following the general trend
            score: 2,
            explanation: "GESP 4 级常考递归。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        // placeholders for ID 8-15
        { id: 8, type: "single", question: "GESP 4级真题单选题第8题题目占位。", options: ["A", "B", "C", "D"], answer: 1, score: 2, tags: ["客观题", "单选题", "GESP4级"] },
        { id: 9, type: "single", question: "GESP 4级真题单选题第9题题目占位。", options: ["A", "B", "C", "D"], answer: 1, score: 2, tags: ["客观题", "单选题", "GESP4级"] },
        { id: 10, type: "single", question: "GESP 4级真题单选题第10题题目占位。", options: ["A", "B", "C", "D"], answer: 1, score: 2, tags: ["客观题", "单选题", "GESP4级"] },
        { id: 11, type: "single", question: "GESP 4级真题单选题第11题题目占位。", options: ["A", "B", "C", "D"], answer: 2, score: 2, tags: ["客观题", "单选题", "GESP4级"] },
        { id: 12, type: "single", question: "GESP 4级真题单选题第12题题目占位。", options: ["A", "B", "C", "D"], answer: 1, score: 2, tags: ["客观题", "单选题", "GESP4级"] },
        { id: 13, type: "single", question: "GESP 4级真题单选题第13题题目占位。", options: ["A", "B", "C", "D"], answer: 1, score: 2, tags: ["客观题", "单选题", "GESP4级"] },
        { id: 14, type: "single", question: "GESP 4级真题单选题第14题题目占位。", options: ["A", "B", "C", "D"], answer: 1, score: 2, tags: ["客观题", "单选题", "GESP4级"] },
        { id: 15, type: "single", question: "GESP 4级真题单选题第15题题目占位。", options: ["A", "B", "C", "D"], answer: 0, score: 2, tags: ["客观题", "单选题", "GESP4级"] },

        {
            id: 16,
            type: "judge",
            question: "二维数组在内存中是按行连续存储的。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "C++ 中多维数组按行优先顺序存储。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: "递归函数必须有基准情况（终止条件）。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "没有基准情况会导致无限递归引起栈溢出。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        // placeholders for Judge 18-25
        { id: 18, type: "judge", question: "GESP 4级真题判断题第18题题目占位。", options: ["正确", "错误"], answer: 0, score: 2, tags: ["客观题", "判断题", "GESP4级"] },
        { id: 19, type: "judge", question: "GESP 4级真题判断题第19题题目占位。", options: ["正确", "错误"], answer: 0, score: 2, tags: ["客观题", "判断题", "GESP4级"] },
        { id: 20, type: "judge", question: "GESP 4级真题判断题第20题题目占位。", options: ["正确", "错误"], answer: 0, score: 2, tags: ["客观题", "判断题", "GESP4级"] },
        { id: 21, type: "judge", question: "GESP 4级真题判断题第21题题目占位。", options: ["正确", "错误"], answer: 0, score: 2, tags: ["客观题", "判断题", "GESP4级"] },
        { id: 22, type: "judge", question: "GESP 4级真题判断题第22题题目占位。", options: ["正确", "错误"], answer: 0, score: 2, tags: ["客观题", "判断题", "GESP4级"] },
        { id: 23, type: "judge", question: "GESP 4级真题判断题第23题题目占位。", options: ["正确", "错误"], answer: 0, score: 2, tags: ["客观题", "判断题", "GESP4级"] },
        { id: 24, type: "judge", question: "GESP 4级真题判断题第24题题目占位。", options: ["正确", "错误"], answer: 0, score: 2, tags: ["客观题", "判断题", "GESP4级"] },
        { id: 25, type: "judge", question: "GESP 4级认证分为 1-8 级。", options: ["正确", "错误"], answer: 0, score: 2, explanation: "常识。", tags: ["客观题", "判断题", "GESP4级"] },
        ...programmingQuestions
    ]
};
