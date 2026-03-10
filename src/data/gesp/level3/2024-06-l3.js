// 2024年6月 GESP C++ 三级真题
export const paperData = {
    id: '2024-06-l3',
    title: '2024年6月 GESP C++ 三级真题',
    level: 3,
    year: 2024,
    month: 6,
    session: 6,
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
        "title": "移位",
        "problemNumber": "B4003",
        "description": "小杨学习了加密技术移位，所有大写字母都向后按照⼀个固定数目进行偏移。偏移过程会将字母表视作首尾相接的环，例如，当偏移量是 3 的时候，大写字母 A 会替换成 D，大写字母 Z 会替换成 C，总体来看，大写字母表 ABCDEFGHIJKLMNOPQRSTUVWXYZ 会被替换成 DEFGHIJKLMNOPQRSTUVWXYZABC。 注：当偏移量是 26 的倍数时，每个大写字母经过偏移后会恰好回到原来的位置，即大写字母表 ABCDEFGHIJKLMNOPQRSTUVWXYZ 经过偏移后会保持不变。",
        "inputDescription": "第一行包含一个正整数 n。",
        "outputDescription": "输出在偏移量为 n 的情况下，大写字母表 ABCDEFGHIJKLMNOPQRSTUVWXYZ 移位替换后的结果。",
        "samples": [
            {
                "input": "3",
                "output": "DEFGHIJKLMNOPQRSTUVWXYZABC"
            }
        ],
        "explanation": "偏移量按 26 取模即可。对字母表中的每个字母加上偏移量，超过 Z 时循环回到 A。",
        "tags": [
            "编程题",
            "字符串",
            "模拟"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    long long n;\n    cin >> n;\n    int shift = n % 26;\n    for (int i = 0; i < 26; ++i) {\n        cout << char('A' + (i + shift) % 26);\n    }\n    cout << '\\n';\n    return 0;\n}"
    },
    {
        "id": 27,
        "type": "programming",
        "title": "寻找倍数",
        "problemNumber": "B4004",
        "description": "小杨有一个包含 n 个正整数的序列 A=[a_1,a_2,\\dots,a_n]，他想知道是否存在 i(1≤ i≤ n) 使得 a_i 是序列 A 中所有数的倍数。",
        "inputDescription": "第一行包含一个正整数 t，代表测试用例组数。 接下来是 t 组测试用例。对于每组测试用例，一共两行。 其中，第一行包含一个正整数 n；第二行包含 n 个正整数，代表序列 A。",
        "outputDescription": "对于每组测试用例，如果存在 i(1≤ i≤ n) ，满足对于所有 k(1≤ k≤ n) a_i 是 a_k 的倍数，输出 `Yes`，否则输出 `No`。",
        "samples": [
            {
                "input": "2\n3\n2 4 8\n3\n2 3 6",
                "output": "Yes\nNo"
            }
        ],
        "explanation": "若某个元素是所有元素的倍数，那么它必须等于数组最大值。只要检查最大值能否被数组中每个数整除即可。",
        "tags": [
            "编程题",
            "数组",
            "整除"
        ],
        "template": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
        "referenceCode": "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int t;\n    cin >> t;\n    while (t--) {\n        int n;\n        cin >> n;\n        vector<long long> a(n);\n        long long mx = 0;\n        for (int i = 0; i < n; ++i) { cin >> a[i]; mx = max(mx, a[i]); }\n        bool ok = true;\n        for (long long x : a) if (mx % x != 0) ok = false;\n        cout << (ok ? \"Yes\" : \"No\") << '\\n';\n    }\n    return 0;\n}"
    }
]
};
