// 2024年12月 GESP C++ 五级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "奇妙数字",
        problemNumber: "2024-12-23-05-C-01",
        description: "小杨认为一个数字 x 是奇妙数字当且仅当 x = p^k，其中 p 为任意质数且 k 为正整数。对于一个正整数 n，小杨想要构建一个包含 m 个奇妙数字的集合 S，使其满足：1. 集合中不包含相同的数字；2. S 中所有元素的乘积是 n 的因子。求满足条件的集合最多包含多少个奇妙数字。",
        inputDescription: "第一行包含一个正整数 n (1 ≤ n ≤ 10^12)。",
        outputDescription: "输出一个正整数，代表满足条件的集合最多包含的奇妙数字个数。",
        samples: [
            { input: "12", output: "3" }
        ],
        explanation: "由于 n = p1^e1 * p2^e2 * ...，每个质因子 pi 及其幂都是奇妙数字。为了让奇妙数字尽可能多，我们应把每一个质因子的幂分解成尽可能多的不同幂次的组合（例如 p^6 可以分解为 p^1, p^2, p^3，因为 1+2+3=6）。最终答案是每个质因子分解出的不同幂次数量之和。",
        tags: ["编程题", "数论", "质因数分解", "贪心"],
        template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\nusing namespace std;\nint main() {\n    long long n; cin >> n;\n    int total = 0;\n    for (long long i = 2; i * i <= n; i++) {\n        if (n % i == 0) {\n            int e = 0;\n            while (n % i == 0) { e++; n /= i; }\n            // 将 e 分解为 1, 2, 3... 尽量多的项\n            int count = 0, k = 1;\n            while (e >= k) { e -= k; k++; count++; }\n            total += count;\n        }\n    }\n    if (n > 1) total += 1;\n    cout << total << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "小杨的数字操作",
        problemNumber: "2024-12-23-05-C-02",
        description: "给定一个数字 n，进行以下操作：如果是偶数，除以 2；如果是奇数，乘以 3 再加 1。重复上述操作，直到数字变为 1。求整个过程中出现的最大数字。",
        inputDescription: "输入一个正整数 n (1 ≤ n ≤ 1,000,000)。",
        outputDescription: "输出操作过程中出现的最大数字。",
        samples: [
            { input: "3", output: "16" }
        ],
        explanation: "经典的冰雹猜想（Collatz Conjecture）。按照规则直接模拟计算并维护最大值即可。",
        tags: ["编程题", "模拟"],
        template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <algorithm>\nusing namespace std;\nint main() {\n    long long n; cin >> n;\n    long long max_val = n;\n    while (n != 1) {\n        if (n % 2 == 0) n /= 2;\n        else n = n * 3 + 1;\n        max_val = max(max_val, n);\n    }\n    cout << max_val << endl;\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2024-12-l5',
    title: '2024年12月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 12,
    session: 4,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面关于链表和数组的描述，错误的是（ ）。",
            options: [
                "当数据数量不确定时，为了应对各种可能的情况，需要申请一个较大的数组，可能浪费空间；此时用链表比较合适，大小可动态调整。",
                "在链表中访问节点的效率较低，时间复杂度为 $$$O(N)$$$。",
                "链表插入和删除元素效率较低，时间复杂度为 $$$O(N)$$$。",
                "链表的节点在内存中是分散存储的，通过指针连在一起。"
            ],
            answer: 2,
            score: 2,
            explanation: "链表在已知节点位置的情况下，插入和删除效率很高（$$O(1)$$），不需要移动元素。C 选项说效率低是错误的。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 2,
            type: "single",
            question: "在循环单链表中，节点的 next 指针指向下一个节点，最后一个节点的 next 指针指向（ ）。",
            options: ["当前节点", "nullptr", "第一个节点", "上一个节点"],
            answer: 2,
            score: 2,
            explanation: "循环链表首尾相连。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 3,
            type: "single",
            question: "下列哪个操作属于线性表的基本操作（ ）。",
            options: ["查找", "插入", "删除", "以上都是"],
            answer: 3,
            score: 2,
            explanation: "线性表的基本操作包括增删改查。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 4,
            type: "single",
            question: "关于 C++ 的类和对象，下列说法正确的是（ ）。",
            options: [
                "一个类只能创建一个对象",
                "构造函数名与类名相同",
                "析构函数可以重载",
                "私有成员可以被类外部直接访问"
            ],
            answer: 1,
            score: 2,
            explanation: "构造函数名必须与类名相同。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 5,
            type: "single",
            question: "下列关于栈的描述，正确的是（ ）。",
            options: ["先进先出", "支持下标访问", "后进先出", "动态增加长度"],
            answer: 2,
            score: 2,
            explanation: "栈（Stack）是 LIFO 数据结构。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 6,
            type: "single",
            question: "快速排序的分治策略核心是（ ）。",
            options: ["选择基准（Pivot）进行分区", "将数组对半分开", "逐步构建有序子序列", "随机交换元素"],
            answer: 0,
            score: 2,
            explanation: "分区（Partitioning）是快速排序的核心步骤。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 7,
            type: "single",
            question: "下列哪个时间复杂度高于 $O(n \log n)$（ ）。",
            options: ["$$$O(N)$$$", "$O(\log n)$", "$$$O(N^2)$$$", "$$O(1)$$"],
            answer: 2,
            score: 2,
            explanation: "$$$O(N^2)$$$ 高于 $O(n \log n)$。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 8,
            type: "single",
            question: "埃氏筛法用于求解（ ）问题。",
            options: ["最大公约数", "素数判定/筛选", "矩阵乘法", "图的遍历"],
            answer: 1,
            score: 2,
            explanation: "求解质数的基础算法。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 9,
            type: "single",
            question: "关于 C++ 的继承，派生类（ ）访问基类的私有成员。",
            options: ["可以直接", "可以通过友元函数", "不能", "只有在多重继承时可以"],
            answer: 2,
            score: 2,
            explanation: "私有成员仅在该类内部可见。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 10,
            type: "single",
            question: "唯一分解定理描述的是（ ）。",
            options: [
                "一个合数可以分解为多个整数的乘积",
                "每个大于1的自然数均可唯一地写成质数的幂的乘积",
                "任意正整数都可以被分解",
                "一个数可以被分解成多个因子之和"
            ],
            answer: 1,
            score: 2,
            explanation: "算术基本定理的精确表述。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 11,
            type: "single",
            question: "二分查找成功的平均查找长度是（ ）。",
            options: ["$$$O(N)$$$", "$O(\log n)$", "$O(n \log n)$", "$$O(1)$$"],
            answer: 1,
            score: 2,
            explanation: "二分查找的时间复杂度。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 12,
            type: "single",
            question: "在 C++ 中，`std::vector` 的内存分配方式是（ ）。",
            options: ["静态分配", "按需动态分配，通常预留额外空间", "固定大小", "按链表方式存储"],
            answer: 1,
            score: 2,
            explanation: "vector 使用动态数组并在容量不足时自动扩容。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 13,
            type: "single",
            question: "下列哪种排序算法在最坏情况下性能最差（ ）。",
            options: ["归并排序", "快速排序", "堆排序", "插入排序"],
            answer: 3,
            score: 2,
            explanation: "插入排序和快排在最坏情况均为 $$$O(N^2)$$$，但由于常数项，插入排序通常认为在常规分布下性能最差。注：快排最坏情况 $$$O(N^2)$$$ 也是极差的。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 14,
            type: "single",
            question: "关于 C++ 的友元函数（friend），下列说法正确的是（ ）。",
            options: [
                "友元函数是类的成员函数",
                "友元函数不能访问类的私有成员",
                "友元函数可以访问类的私有和保护成员",
                "友元函数只能有一个参数"
            ],
            answer: 2,
            score: 2,
            explanation: "友元函数的特权就是访问该类的非公有成员。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 15,
            type: "single",
            question: "贪心算法的核心是（ ）。",
            options: ["全局搜索", "局部最优选择", "回溯", "并行计算"],
            answer: 1,
            score: 2,
            explanation: "贪心算法的基础策略。",
            tags: ["客观题", "单选题", "GESP5级"]
        },
        {
            id: 16,
            type: "judge",
            question: "单链表只支持在表头进行插入和删除操作。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "可以在任意位置操作，只是效率不同。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 17,
            type: "judge",
            question: "线性筛相对于埃氏筛法，每个合数只会被它的最小质因数筛去一次，因此效率更高。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "线性筛的优势。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 18,
            type: "judge",
            question: "任何一个大于 1 的自然数都可以分解成若干个不同的质数的乘积，且分解方式是唯一的。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "分解出来的质数不一定“不同”（可以有幂次）。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 19,
            type: "judge",
            question: "贪心算法通过每一步选择当前最优解，从而一定能获得全局最优解。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "不一定。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 20,
            type: "judge",
            question: "递归算法必须有一个明确的结束条件，否则会导致无限递归并可能引发栈溢出。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "递归的核心要求。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 21,
            type: "judge",
            question: "快速排序和归并排序的平均时间复杂度均为 $O(n \log n)$，且都是稳定排序。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "快排不稳定。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 22,
            type: "judge",
            question: "快速排序的时间复杂度总比插入排序的时间复杂度低。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "不总。在数组已有序或近乎有序时，插入排序更高。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 23,
            type: "judge",
            question: "二分查找仅适用于数组而不适合链表，因为二分查找需要跳跃式访问元素，链表中执行跳跃式访问的效率低。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "正确。链表不支持随机访问。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 24,
            type: "judge",
            question: "对有序数组{5,13,19,21,37,56,64,75,88,92,100} 进行二分查找，成功查找元素 19 的比较次数是 2 。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "第一次中间值 56；第二次左半部 21；第三次 13；第四次 19。需 4 次。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        {
            id: 25,
            type: "judge",
            question: "递归函数每次调用自身时，系统都会为新开启的函数分配内存，以存储局部变量、调用地址和其他信息等，导致递归通常比迭代更加耗费内存空间。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "函数调用的栈开销。",
            tags: ["客观题", "判断题", "GESP5级"]
        },
        ...programmingQuestions
    ]
};
