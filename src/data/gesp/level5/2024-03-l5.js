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
            answer: 1,
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
            question: "下面的 C++ 代码片段用于计算阶乘。请在横线处填入（ ），实现正确的阶乘计算。",
            options: [
                "return n * factorial(n - 1);",
                "return factorial(n - 1) / n;",
                "return n * factorial(n);",
                "return factorial(n / 2) * factorial(n / 2);"
            ],
            answer: 0,
            score: 2,
            explanation: "阶乘递归应满足 n! = n × (n-1)!，并在 n=0 或 n=1 时返回 1，因此应填 A。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 4,
            type: "single",
            question: "下面的代码片段用于在双向链表中删除一个节点。请在横线处填入（ ），使其能正确实现相应功能。",
            options: [
                "if (current->next != nullptr) current->next->prev = current->prev;",
                "current->prev->next = current->next;",
                "delete current->next;",
                "current->prev = current->next;"
            ],
            answer: 1,
            score: 2,
            explanation: "删除双向链表中的当前节点时，若当前节点不是头结点，需要先让前驱节点的 next 指向当前节点的 next，因此选 B。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 5,
            type: "single",
            question: "辗转相除法也被称为（ ）。",
            options: ["高斯消元法", "费马定理", "欧几里得算法", "牛顿迭代法"],
            answer: 2,
            score: 2,
            explanation: "辗转相除法就是欧几里得算法，用于求两个整数的最大公约数。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 6,
            type: "single",
            question: "下面的代码片段用于计算斐波那契数列。该代码的时间复杂度是（ ）。",
            options: ["O(1)", "O(log N)", "O(2^N)", "O(N)"],
            answer: 2,
            score: 2,
            explanation: "朴素递归 Fibonacci 会重复计算大量子问题，时间复杂度呈指数级增长，通常记为 O(2^N)。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 7,
            type: "single",
            question: "下面的代码片段用于将两个高精度整数进行相加。请在横线处填入（ ），使其能正确实现相应功能。",
            options: [
                "result = to_string(sum % 10) + result;",
                "result = to_string(carry % 10) + result;",
                "result = to_string(sum / 10) + result;",
                "result = to_string(sum % 10 + carry) + result;"
            ],
            answer: 0,
            score: 2,
            explanation: "高精度加法每一位写入结果的应是当前位 sum % 10，进位单独保存在 carry 中，因此选 A。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 8,
            type: "single",
            question: "给定序列 1，3，6，9，17，31，39，52，61，79，81，90，96。使用给定代码二分查找元素 82 时，最后输出的 times 值为（ ）。",
            options: ["2", "5", "3", "4"],
            answer: 3,
            score: 2,
            explanation: "按题中二分过程：79→90→81→未找到，共进入 while 循环 4 次，因此 times 为 4，选 D。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 9,
            type: "single",
            question: "下面的代码片段用于判断一个正整数是否为素数。请对以下代码进行修改，使其能正确实现相应功能。（ ）。",
            options: [
                "num < 2 应该改为 num <= 2",
                "循环条件 i * i < num 应该改为 i * i <= num",
                "循环条件应该是 i <= num",
                "循环体中应该是 if (num % i != 0)"
            ],
            answer: 1,
            score: 2,
            explanation: "判断素数时应枚举到 i*i<=num；若写成 i*i<num，会漏掉完全平方数的因子检查，因此选 B。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 10,
            type: "single",
            question: "在埃拉托斯特尼筛法中，要筛选出不大于 n 的所有素数，最外层循环应该遍历什么范围（ ）。",
            options: [
                "for (int i = 2; i <= n; ++i)",
                "for (int i = 1; i < n; ++i)",
                "for (int i = 2; i <= sqrt(n); ++i)",
                "for (int i = 1; i <= sqrt(n); ++i)"
            ],
            answer: 2,
            score: 2,
            explanation: "埃氏筛只需要让外层质数筛到 sqrt(n) 即可，再大的合数都会在此前被更小的质因子筛掉，因此选 C。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 11,
            type: "single",
            question: "素数的线性筛法时间复杂度为（ ）。",
            options: ["O(N)", "O(N log N)", "O(N log log N)", "O(N^2)"],
            answer: 0,
            score: 2,
            explanation: "线性筛保证每个合数只被其最小质因子筛掉一次，因此总时间复杂度是 O(N)。",
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
            question: "在快速排序中，选择的主元素（pivot）会影响算法的（ ）。",
            options: [
                "不影响",
                "时间复杂度",
                "空间复杂度",
                "时间复杂度和空间复杂度"
            ],
            answer: 1,
            score: 2,
            explanation: "pivot 选得好时，划分更均衡，快速排序更接近 O(N log N)；选得差时可能退化到 O(N^2)，因此它会影响时间复杂度。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 14,
            type: "single",
            question: "递归函数在调用自身时，必须满足（ ），以避免无限递归？",
            options: [
                "有终止条件",
                "函数参数递减（或递增）",
                "函数返回值固定",
                "以上都对"
            ],
            answer: 0,
            score: 2,
            explanation: "递归最基本的要求是必须存在终止条件，否则调用会无限进行下去。参数变化常见但不是唯一表述，因此按官方答案区选 A。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 15,
            type: "single",
            question: "假设给定链表为某单链表，若调用 searchValue(head, 5)，函数返回值为（ ）。",
            options: [
                "返回 1",
                "返回 0",
                "死循环，无法返回",
                "返回 -1"
            ],
            answer: 0,
            score: 2,
            explanation: "题面函数会顺着 next 遍历链表，一旦遇到值等于 target 的节点就 return 1；官方答案区给出 A。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 16,
            type: "judge",
            question: "C++ 中可以使用 `const` 关键字定义常量。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "const 可以用于定义常量对象或只读变量，该说法正确。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 17,
            type: "judge",
            question: "贪心算法保证能得到问题的全局最优解。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "贪心算法并不总能得到全局最优解，只有满足贪心选择性质的问题才适用，因此说法错误。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 18,
            type: "judge",
            question: "二分查找的时间复杂度是 O(N)。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "二分查找每次把搜索区间缩小一半，时间复杂度是 O(log N)，不是 O(N)。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 19,
            type: "judge",
            question: "在 C++ 中，`std::vector` 的大小是可以在运行时动态改变的。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "vector 支持动态扩容和缩容，元素个数可以在运行时变化，因此说法正确。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 20,
            type: "judge",
            question: "递归函数如果没有终止条件，会导致无限递归并最终栈溢出。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "递归若没有终止条件，会不断调用自身并持续消耗栈空间，最终可能栈溢出，因此说法正确。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 21,
            type: "judge",
            question: "在 C++ 中，指针变量存储的是另一个变量的内存地址。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "指针变量中保存的是某个内存单元的地址，因此说法正确。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 22,
            type: "judge",
            question: "快速排序在最坏情况下的时间复杂度是 O(N log N)。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "快速排序最坏情况下会退化到 O(N^2)，所以该说法错误。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 23,
            type: "judge",
            question: "C++ 中的类支持封装、继承和多态三大特性。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "类的三大特性通常概括为封装、继承和多态，因此说法正确。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 24,
            type: "judge",
            question: "在 C++ 中，`new` 操作符用于在堆上分配内存。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "new 会在自由存储区（通常称堆区）分配内存，因此说法正确。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 25,
            type: "judge",
            question: "归并排序是稳定的排序算法。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "归并排序在合并相等元素时可以保持原有相对次序，因此它是稳定排序。",
            tags: ["客观题", "判断题", "GESP5级"]
        }
    ]
};
