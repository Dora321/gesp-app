// 2025年9月 GESP C++ 三级真题
export const paperData = {
    id: '2025-09-l3',
    title: '2025年9月 GESP C++ 三级真题',
    level: 3,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: "若要统计数组中每个数出现次数，最常用的数据结构是（ ）。",
            options: ["栈","队列","映射/哈希表","并查集"],
            answer: 2,
            score: 2,
            explanation: "键值映射可高效维护频次统计。",
            tags: ["数组与字符串"]
        },
        {
            id: 2,
            type: 'single',
            question: "在无权图中求最短路，通常优先使用（ ）。",
            options: ["DFS","BFS","二分","拓扑排序"],
            answer: 1,
            score: 2,
            explanation: "无权图最短路可用 BFS 分层扩展。",
            tags: ["算法思维"]
        },
        {
            id: 3,
            type: 'single',
            question: "递归函数必须具备的关键要素是（ ）。",
            options: ["输入语句","终止条件","循环变量","随机数"],
            answer: 1,
            score: 2,
            explanation: "无终止条件会导致无限递归。",
            tags: ["条件判断","函数"]
        },
        {
            id: 4,
            type: 'single',
            question: "已知 n=1e5，O(n^2) 算法通常（ ）。",
            options: ["稳定可过","可能超时","一定最优","与 n 无关"],
            answer: 1,
            score: 2,
            explanation: "1e5 规模下 O(n^2) 常无法在时限内通过。",
            tags: ["程序分析"]
        },
        {
            id: 5,
            type: 'single',
            question: "二分查找适用的前提是序列（ ）。",
            options: ["元素互异","已排序","长度为偶数","从 0 开始编号"],
            answer: 1,
            score: 2,
            explanation: "二分需要单调性，常见为有序数组。",
            tags: ["数组与字符串","算法思维"]
        },
        {
            id: 6,
            type: 'single',
            question: "前缀和数组 pre[i] 一般表示（ ）。",
            options: ["第 i 项本身","前 i 项的累计信息","第 i 项最大值","后缀最小值"],
            answer: 1,
            score: 2,
            explanation: "前缀和用累计量支持区间查询。",
            tags: ["数组与字符串","算法思维"]
        },
        {
            id: 7,
            type: 'single',
            question: "在回溯搜索中，撤销选择的操作主要用于（ ）。",
            options: ["节省输入时间","恢复现场以尝试下一分支","避免递归","加速排序"],
            answer: 1,
            score: 2,
            explanation: "回溯核心是“试探-递归-撤销”。",
            tags: ["函数","算法思维"]
        },
        {
            id: 8,
            type: 'single',
            question: "若要求“最少操作次数”，常见建模方向是（ ）。",
            options: ["贪心/BFS/DP 等最优化方法","随机模拟","仅用输出语句","删除条件判断"],
            answer: 0,
            score: 2,
            explanation: "最优化题常需对应算法模型。",
            tags: ["程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: "vector<int> v; 执行 v.push_back(7); 后，7 会被（ ）。",
            options: ["插入到头部","追加到尾部","替换全部元素","自动排序"],
            answer: 1,
            score: 2,
            explanation: "push_back 在末尾追加。",
            tags: ["数组与字符串"]
        },
        {
            id: 10,
            type: 'single',
            question: "对于区间 [l,r] 的和，使用前缀和可在 O(1) 时间通过（ ）计算。",
            options: ["pre[r]-pre[l]","pre[r]-pre[l-1]","pre[l]+pre[r]","pre[r+1]-pre[l-1]"],
            answer: 1,
            score: 2,
            explanation: "常见 1-based 前缀和公式为 pre[r]-pre[l-1]。",
            tags: ["算法思维"]
        },
        {
            id: 11,
            type: 'single',
            question: "深度优先搜索（DFS）更贴近哪种过程（ ）。",
            options: ["按层推进","一条路走到底再回退","随机跳转","只访问起点"],
            answer: 1,
            score: 2,
            explanation: "DFS 先深后广，回溯再探索。",
            tags: ["算法思维"]
        },
        {
            id: 12,
            type: 'single',
            question: "当状态具有“重叠子问题”时，优先考虑（ ）。",
            options: ["动态规划","快速幂","并查集","双向链表"],
            answer: 0,
            score: 2,
            explanation: "重叠子问题是 DP 的典型信号。",
            tags: ["程序分析"]
        },
        {
            id: 13,
            type: 'single',
            question: "若只需判断元素是否出现过，通常可用（ ）。",
            options: ["set / unordered_set","queue","stack","priority_queue"],
            answer: 0,
            score: 2,
            explanation: "集合结构支持高效查重。",
            tags: ["条件判断"]
        },
        {
            id: 14,
            type: 'single',
            question: "双重循环遍历 n×n 矩阵的时间复杂度通常是（ ）。",
            options: ["O(1)","O(log n)","O(n)","O(n^2)"],
            answer: 3,
            score: 2,
            explanation: "两层线性循环相乘为 O(n^2)。",
            tags: ["循环","算法思维"]
        },
        {
            id: 15,
            type: 'single',
            question: "在图遍历中，visited 数组的作用是（ ）。",
            options: ["记录输入顺序","防止重复访问和死循环","存放边权","统计内存"],
            answer: 1,
            score: 2,
            explanation: "标记访问状态是图搜索基础。",
            tags: ["数组与字符串","算法思维"]
        },
        {
            id: 16,
            type: 'judge',
            question: "DFS 和 BFS 都可以用于图的遍历。",
            options: ["正确","错误"],
            answer: 0,
            score: 2,
            explanation: "两者均为经典图搜索策略。",
            tags: ["判断题","算法思维"]
        },
        {
            id: 17,
            type: 'judge',
            question: "递归深度与系统栈空间无关。",
            options: ["正确","错误"],
            answer: 1,
            score: 2,
            explanation: "递归会占用调用栈，过深可能栈溢出。",
            tags: ["判断题","函数"]
        },
        {
            id: 18,
            type: 'judge',
            question: "二分答案法要求可行性随答案具有单调性。",
            options: ["正确","错误"],
            answer: 0,
            score: 2,
            explanation: "单调性是二分答案成立前提。",
            tags: ["判断题","算法思维"]
        },
        {
            id: 19,
            type: 'judge',
            question: "前缀和只能处理加法问题，不能做计数。",
            options: ["正确","错误"],
            answer: 1,
            score: 2,
            explanation: "计数本质也是累加，可用前缀和。",
            tags: ["判断题","算法思维"]
        },
        {
            id: 20,
            type: 'judge',
            question: "在无权图中，BFS 首次到达某点时路径即最短。",
            options: ["正确","错误"],
            answer: 0,
            score: 2,
            explanation: "按层扩展保证首次到达最短。",
            tags: ["判断题","算法思维"]
        },
        {
            id: 21,
            type: 'judge',
            question: "回溯算法不会重复进入同一状态。",
            options: ["正确","错误"],
            answer: 1,
            score: 2,
            explanation: "若不做剪枝/去重，可能重复状态。",
            tags: ["判断题","算法思维"]
        },
        {
            id: 22,
            type: 'judge',
            question: "时间复杂度 O(n log n) 在很多排序算法中常见。",
            options: ["正确","错误"],
            answer: 0,
            score: 2,
            explanation: "如快速排序平均、归并排序等。",
            tags: ["判断题","算法思维"]
        },
        {
            id: 23,
            type: 'judge',
            question: "动态规划一定比贪心更简单。",
            options: ["正确","错误"],
            answer: 1,
            score: 2,
            explanation: "两者适用场景不同，DP 常更复杂。",
            tags: ["判断题","算法思维"]
        },
        {
            id: 24,
            type: 'judge',
            question: "使用 long long 可降低部分整数溢出风险。",
            options: ["正确","错误"],
            answer: 0,
            score: 2,
            explanation: "更大整数范围可减少溢出。",
            tags: ["判断题","程序分析"]
        },
        {
            id: 25,
            type: 'judge',
            question: "程序调试时构造边界样例没有意义。",
            options: ["正确","错误"],
            answer: 1,
            score: 2,
            explanation: "边界样例对发现缺陷非常关键。",
            tags: ["判断题","程序分析"]
        }
    ],
    programmingQuestions: [
    {
        "id": 26,
        "type": "programming",
        "title": "数组清零",
        "problemNumber": "B4413",
        "description": "小 A 有一个由 n 个非负整数构成的数组 a = [a_1, a_2, \\ldots, a_n]。他会对阵组 a 重复进行以下操作，直到数组 a 只包含 0。在一次操作中，小 A 会依次完成以下三个步骤： 1. 在数组 a 中找到最大的整数，记其下标为 k。如果有多个最大值，那么选择其中下标最大的。 2. 从数组 a 所有不为零的整数中找到最小的整数 a_j。 3. 将第一步找出的 a_k 减去 a_j。 例如，数组 a = [2, 3, 4] 需要 7 次操作变成 [0, 0, 0]： [2, 3, 4] \\rightarrow [2, 3, 2] \\rightarrow [2, 1, 2] \\rightarrow [2, 1, 1] \\rightarrow [1, 1, 1] \\rightarrow [1, 1, 0] \\rightarrow [1, 0, 0] \\rightarrow [0, 0, 0] 小 A 想知道，对于给定的数组 a，需要多少次操作才能使得 a 中的整数全部变成 0。可以证明，a 中整数必然可以在有限次操作后全部变成 0。你能帮他计算出答案吗？",
        "inputDescription": "第一行，一个正整数 n，表示数组 a 的长度。 第二行，n 个非负整数 a_1, a_2, \\ldots, a_n，表示数组 a 中的整数。",
        "outputDescription": "一行，一个正整数，表示 a 中整数全部变成 0 所需要的操作次数。",
        "samples": [
            {
                "input": "3\n2 3 4",
                "output": "7"
            }
        ],
        "explanation": "每次操作都会把当前某个正数减去当前所有正数中的最小值。若把数组排序为 b1<=b2<=...<=bn，答案等于 b1*n + (b2-b1)*(n-1) + ... + (bn-b{n-1})。",
        "tags": [
            "编程题",
            "排序",
            "数学"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n;\n    cin >> n;\n    vector<long long> a;\n    for (int i = 0; i < n; ++i) {\n        long long x; cin >> x;\n        if (x > 0) a.push_back(x);\n    }\n    sort(a.begin(), a.end());\n    long long ans = 0, prev = 0;\n    int m = a.size();\n    for (int i = 0; i < m; ++i) {\n        ans += (a[i] - prev) * 1LL * (m - i);\n        prev = a[i];\n    }\n    cout << ans << '\\n';\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "日历制作",
        "problemNumber": "B4414",
        "description": "小 A 想制作 2025 年每个月的日历。他希望你能编写一个程序，按照格式输出给定月份的日历。 具体来说，第一行需要输出 MON TUE WED THU FRI SAT SUN，分别表示星期一到星期日。接下来若干行中依次输出这个月所包含的日期，日期的个位需要和对应星期几的缩写最后一个字母对齐。例如，2025 年 9 月 1 日是星期一，在输出九月的日历时，1 号的个位 1 就需要与星期一 MON 的最后一个字母 N 对齐。九月的日历输出效果如下: MON TUE WED THU FRI SAT SUN 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 你能帮助小 A 完成日历的制作吗?",
        "inputDescription": "一行，一个正整数 m，表示需要按照格式输出 2025 年 m 月的日历。",
        "outputDescription": "输出包含若干行，表示 2025 年 m 月的日历。",
        "samples": [
            {
                "input": "9",
                "output": "MON TUE WED THU FRI SAT SUN\n 1  2  3  4  5  6  7\n 8  9 10 11 12 13 14\n15 16 17 18 19 20 21\n22 23 24 25 26 27 28\n29 30"
            }
        ],
        "explanation": "已知 2025 年各月第一天的星期可以通过逐月累加天数得到。打印时先输出表头，再在第一周前补足空位，每个日期按宽度 3 右对齐。",
        "tags": [
            "编程题",
            "日期",
            "格式化输出"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int m;\n    cin >> m;\n    vector<int> days = {0,31,28,31,30,31,30,31,31,30,31,30,31};\n    int start = 3; // 2025-01-01 is Wednesday, Monday=1\n    for (int month = 1; month < m; ++month) {\n        start = (start + days[month] - 1) % 7 + 1;\n    }\n    cout << \"MON TUE WED THU FRI SAT SUN\\n\";\n    int weekday = 1;\n    for (; weekday < start; ++weekday) cout << \"   \";\n    for (int day = 1; day <= days[m]; ++day) {\n        cout << setw(3) << day;\n        if (weekday == 7) {\n            cout << '\\n';\n            weekday = 1;\n        } else {\n            ++weekday;\n        }\n    }\n    if (weekday != 1) cout << '\\n';\n    return 0;\n}"
    }
]
};
