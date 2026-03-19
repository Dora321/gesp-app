// 2026年3月 GESP C++ 六级真题
// 注意：2026-03 为最新考试，材料来源于网络搜集，客观题部分待后续完整补充

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "寻找子串",
        problemNumber: "2026-03-23-06-C-01",
        description: "给定一个长度为 N 的字符串 S，请你在 S 中寻找满足特定条件的子串个数（例如：包含所有给定的字符，或者满足某种特定的长度规则）。",
        inputDescription: "第一行包含一个整数 N。第二行包含长度为 N 的字符串 S。",
        outputDescription: "输出一个整数，表示满足条件的子串个数。",
        samples: [
            { 
                input: "5\nabcba", 
                output: "待补充" 
            }
        ],
        explanation: "由于具体题目限制（如：必须包含 'a' 和 'b'）待通过完整PDF确认，此处提供通用框架。",
        tags: ["编程题", "字符串", "双指针", "滑动窗口"],
        template: "#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    string s;\n    cin >> s;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <string>\n#include <vector>\n#include <map>\nusing namespace std;\n\nint main() {\n    int n;\n    if(!(cin >> n)) return 0;\n    string s;\n    cin >> s;\n    // 示例逻辑：统计包含所有小写字母的子串（仅为框架示意）\n    long long count = 0;\n    // ... 算法实现 ...\n    cout << count << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "选数",
        problemNumber: "2026-03-23-06-C-02",
        description: "给定两个包含 n 个整数的数组 a = [a_1, ..., a_n] 与 b = [b_1, ..., b_n]。你需要指定若干下标 p_1 < p_2 < ... < p_k (1 <= k <= n)，使得对于所有 1 <= i < k，满足 p_{i+1} >= p_i + b_{p_i}。你需要最大化 a 对应下标之和，即最大化 sum(a_{p_i})。",
        inputDescription: "第一行包含一个正整数 n。第二行包含 n 个正整数 a_i。第三行包含 n 个正整数 b_i。",
        outputDescription: "输出一个整数，表示最大之和。",
        samples: [
            { 
                input: "5\n1 2 3 4 5\n2 2 2 2 2", 
                output: "9" 
            }
        ],
        explanation: "选择下标 1, 3, 5。p1=1, p2=3 >= 1+b1=3, p3=5 >= 3+b2=5。和为 1+3+5=9。",
        tags: ["编程题", "动态规划", "后缀DP"],
        template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    vector<long long> a(n + 1), b(n + 1);\n    for (int i = 1; i <= n; i++) cin >> a[i];\n    for (int i = 1; i <= n; i++) cin >> b[i];\n    \n    // dp[i] 表示从第 i 个数到第 n 个数能获得的最大和\n    // dp[i] = max(dp[i+1], a[i] + dp[min(n+1, i + b[i])])\n    vector<long long> dp(n + 2, 0);\n    for (int i = n; i >= 1; i--) {\n        int next_idx = i + b[i];\n        if (next_idx > n) next_idx = n + 1;\n        dp[i] = max(dp[i + 1], a[i] + dp[next_idx]);\n    }\n    cout << dp[1] << endl;\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2026-03-l6',
    title: '2026年3月 GESP C++ 六级真题',
    level: 6,
    year: 2026,
    month: 3,
    session: 13,
    timeLimit: 5400,
    questions: [
        // 1-15 单选 (待补)
        ...Array.from({ length: 15 }, (_, i) => ({
            id: i + 1,
            type: "single",
            question: `第${i+1}题（单选）：题目内容待从真题PDF补充。`,
            options: ["选项A", "选项B", "选项C", "选项D"],
            answer: 0,
            score: 2,
            explanation: "真题解析待补充。",
            tags: ["客观题", "单选题", "GESP6级"]
        })),
        // 16-25 判断 (待补)
        ...Array.from({ length: 10 }, (_, i) => ({
            id: i + 16,
            type: "judge",
            question: `第${i+1}题（判断）：题目内容待从真题PDF补充。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "真题解析待补充。",
            tags: ["客观题", "判断题", "GESP6级"]
        })),
        ...programmingQuestions
    ]
};
