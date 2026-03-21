// 2026年3月 GESP C++ 五级真题
// 注意：2026-03 为最新考试，客观题部分待后续完整补充，目前基于已知题目信息构建

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        score: 25,
        title: "找数",
        problemNumber: "2026-03-23-05-C-01",
        description: "给定一个包含 $n$ 个互不相同的正整数的数组 $A$，以及一个包含 $m$ 个互不相同的正整数的数组 $B$。输出一个整数，表示在数组 $A$ 与数组 $B$ 中均出现的数的个数。",
        inputDescription: "第一行包含两个整数 $n, m$。第二行包含 $n$ 个正整数 $a_1, a_2, ..., a_n$ 表示数组 $A$。第三行包含 $m$ 个正整数 $b_1, b_2, ..., b_m$ 表示数组 $B$。",
        outputDescription: "输出一个整数，表示在数组 $A$ 与数组 $B$ 中均出现的数的个数。",
        "samples": [
            { 
                "input": "5 4\n4 3 6 1 2\n3 4 5 7", 
                "output": "2" 
            }
        ],
        "explanation": "样例中，4 和 3 在数组 $A$ 和 $B$ 中都出现了，总共 2 个。",
        "tags": ["编程题", "双指针", "二分查找", "哈希"],
        template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    vector<int> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    vector<int> b(m);\n    for (int i = 0; i < m; i++) cin >> b[i];\n    \n    sort(a.begin(), a.end());\n    sort(b.begin(), b.end());\n    \n    int i = 0, j = 0, count = 0;\n    while (i < n && j < m) {\n        if (a[i] == b[j]) {\n            count++;\n            i++;\n            j++;\n        } else if (a[i] < b[j]) {\n            i++;\n        } else {\n            j++;\n        }\n    }\n    cout << count << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        score: 25,
        title: "有限不循环小数",
        problemNumber: "2026-03-23-05-C-02",
        description: "如果一个最简分数 $a/b$ 能化为一个有限的、不循环的小数，则称其分母 $b$ 为终止数。现在给定区间 $[L, R]$，请你求出在该区间内终止数的数量。一个数 $b$ 是终止数，当且仅当 $b$ 的质因数分解中只包含 2 和 5。",
        inputDescription: "一行，包含两个整数 $L$ 和 $R$。",
        outputDescription: "一行，包含一个整数，表示 $L$ 到 $R$ 中终止数的数量。",
        samples: [
            { 
                input: "1 10", 
                output: "6" 
            }
        ],
        explanation: "在 $[1, 10]$ 中，终止数有 1 ($2^0 \\cdot 5^0$), 2 ($2^1$), 4 ($2^2$), 5 ($5^1$), 8 ($2^3$), 10 ($2^1 \\cdot 5^1$)。共 6 个。",
        tags: ["编程题", "数论", "枚举"],
        template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long L, R;\n    cin >> L >> R;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    long long L, R;\n    cin >> L >> R;\n    long long count = 0;\n    for (long long p2 = 1; p2 <= R; p2 *= 2) {\n        for (long long p5 = 1; p2 * p5 <= R; p5 *= 5) {\n            long long val = p2 * p5;\n            if (val >= L) count++;\n        }\n    }\n    cout << count << endl;\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2026-03-l5',
    title: '2026年3月 GESP C++ 五级真题',
    level: 5,
    year: 2026,
    month: 3,
    session: 13,
    timeLimit: 5400,
    questions: [
        // 1-15 单选 (待补)
        ...Array.from({ length: 15 }, (_, i) => ({
            id: i+1,
            type: "single",
            question: `第${i+1}题（单选）：题目内容待从真题PDF补充。`,
            options: ["选项A", "选项B", "选项C", "选项D"],
            answer: 0,
            score: 2,
            explanation: "真题解析待补充。",
            tags: ["客观题", "单选题", "GESP5级"]
        })),
        // 16-25 判断 (待补)
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i+16,
            type: "judge",
            question: `第${i+1}题（判断）：题目内容待从真题PDF补充。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "真题解析待补充。",
            tags: ["客观题", "判断题", "GESP5级"]
        })),
        ...programmingQuestions
    ]
};
