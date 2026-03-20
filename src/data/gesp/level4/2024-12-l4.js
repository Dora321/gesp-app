// 2024年12月 GESP C++ 四级真题

const programmingQuestions = [
    {
        id: 26,
        type: "programming",
        title: "Recamán",
        problemNumber: "2024-12-23-04-C-01",
        description: "小杨最近发现了有趣的 Recamán 数列，这个数列是这样生成的：数列的第一项 a0 是 0；如果 ak-1 - k 是正整数并且没有在数列中出现过，那么数列的第 k 项 ak 为 ak-1 - k，否则为 ak-1 + k。小杨想知道 Recamán 数列的前 n 项从小到大排序后的结果。",
        inputDescription: "第一行一个正整数 n (1 ≤ n ≤ 100,000)。",
        outputDescription: "一行，n 个空格分隔的整数，表示 Recamán 数列的前 n 项从小到大排序后的结果。",
        samples: [
            { input: "5", output: "0 1 3 6 7" },
            { input: "8", output: "0 1 3 6 7 12 13 20" }
        ],
        explanation: "按照递推公式生成前 n 项。由于需要判断是否出现过，可以使用 std::set 或布尔数组（注意数值范围可能超过 n，实际前 10^5 项的最大值约 7*10^5）。最后对生成的 n 个数排序输出。",
        tags: ["编程题", "递推", "排序", "哈希/布尔数组"],
        template: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <set>\nusing namespace std;\nconst int MAX_VAL = 10000000;\nbool vis[MAX_VAL];\nint main() {\n    int n; cin >> n;\n    vector<long long> a(n);\n    a[0] = 0;\n    vis[0] = true;\n    for (int k = 1; k < n; k++) {\n        long long prev = a[k-1];\n        long long next = prev - k;\n        if (next > 0 && !vis[next]) {\n            a[k] = next;\n        } else {\n            a[k] = prev + k;\n        }\n        if (a[k] < MAX_VAL) vis[a[k]] = true;\n    }\n    sort(a.begin(), a.end());\n    for (int i = 0; i < n; i++) cout << a[i] << (i == n - 1 ? \"\" : \" \");\n    cout << endl;\n    return 0;\n}"
    },
    {
        id: 27,
        type: "programming",
        title: "字符排序",
        problemNumber: "2024-12-23-04-C-02",
        description: "给定 n 个仅由小写字母组成的字符串。请你将它们按某种顺序排列并拼接起来，使得拼接后的字符串 t 满足：对于任意 j < i，t_j 的字典序不大于 t_i（即 t 是一个不降序列）。判断是否存在这样的排列方式。",
        inputDescription: "第一行一个整数 T 表示测试用例数。每组测试用例第一行一个整数 n。接下来的 n 行每行一个字符串。",
        outputDescription: "对于每组测试用例，如果存在输出 1，否则输出 0。",
        samples: [
            { input: "1\n2\nabc\ndef", output: "1" },
            { input: "1\n2\nb\na", output: "0" }
        ],
        explanation: "由于拼接后的字符串必须是不降序列，那么每个单独的字符串本身也必须是不降序列。如果所有字符串内部都是不降的，我们将它们按首字母升序排序并拼接，检查拼接后的总字符串是否依然是不降的即可。",
        tags: ["编程题", "字符串", "排序", "贪心"],
        template: "#include <iostream>\n#include <string>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    int T;\n    cin >> T;\n    // 在此编写代码\n    return 0;\n}",
        referenceCode: "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nbool isNonDescending(string s) {\n    for (int i = 1; i < s.size(); i++) if (s[i] < s[i-1]) return false;\n    return true;\n}\nvoid solve() {\n    int n; cin >> n;\n    vector<string> s(n);\n    bool possible = true;\n    for (int i = 0; i < n; i++) {\n        cin >> s[i];\n        if (!isNonDescending(s[i])) possible = false;\n    }\n    if (!possible) { cout << 0 << endl; return; }\n    sort(s.begin(), s.end());\n    string t = \"\";\n    for (auto x : s) t += x;\n    if (isNonDescending(t)) cout << 1 << endl;\n    else cout << 0 << endl;\n}\nint main() {\n    int T; cin >> T;\n    while (T--) solve();\n    return 0;\n}"
    }
];

export const paperData = {
    id: '2024-12-l4',
    title: '2024年12月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 12,
    session: 4,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面的语句中，（ ）正确定义了一个计算浮点数 x 的平方 (x^2) 的函数, 并成功调用该函数。",
            options: [
                "float square(float x) { return x * x; } float area = square(2.0);",
                "void square(float x) { return x * x; } float area = square(2.0);",
                "float square(x) { return x * x; } float area = square(2.0);",
                "float square(float x) { x * x; } float area = square(2.0);"
            ],
            answer: 0,
            score: 2,
            explanation: "定义函数需指明返回类型、参数类型和 return 语句。A 选项完全正确。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: "下面代码的描述中，正确的是（ ）。\n```cpp\nint main() {\n    int a = 10, b = 20;\n    int *p1 = &a, *p2 = &b;\n    *p1 = *p2;\n    cout << a << \" \" << b << endl;\n    return 0;\n}\n```",
            options: ["输出 10 20", "输出 20 20", "输出 10 10", "输出 20 10"],
            answer: 1,
            score: 2,
            explanation: "*p1 = *p2 将 p2 指向的值（20）赋给 p1 指向的变量（a）。a 变为 20，b 仍为 20。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: "在 C++ 中，下列关于引用的说法，错误的是（ ）。",
            options: [
                "引用必须在定义时初始化。",
                "引用一旦绑定到一个变量，就不能再绑定到另一个变量。",
                "引用可以指向空值（NULL）。",
                "引用的本质是变量的别名。"
            ],
            answer: 2,
            score: 2,
            explanation: "引用没有空引用，必须绑定到具体的对象。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: "有关下面代码，说法错误的是（ ）。\n```cpp\nvoid swap(int &a, int &b) {\n    int temp = a;\n    a = b;\n    b = temp;\n}\n```",
            options: [
                "该函数使用引用传递参数。",
                "调用该函数后，实参的值会发生交换。",
                "函数内的修改直接影响外部变量。",
                "该函数无法通过编译，因为引用不能作为参数。"
            ],
            answer: 3,
            score: 2,
            explanation: "引用可以作为参数，这是 C++ 的基本特性。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: "下列关于 C++ 中 static 关键字的说法，错误的是（ ）。",
            options: [
                "静态局部变量只初始化一次。",
                "静态全局变量仅在定义它的文件中可见。",
                "类中的静态成员函数没有 this 指针。",
                "静态成员变量不能在类外初始化。"
            ],
            answer: 3,
            score: 2,
            explanation: "静态成员变量必须在类外进行定义和初始化。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: "下列关于递归函数的说法，正确的是（ ）。",
            options: [
                "递归函数不需要终止条件。",
                "递归调用不会消耗栈空间。",
                "任何递归都可以改写为循环。",
                "递归深度过大可能会导致栈溢出。"
            ],
            answer: 3,
            score: 2,
            explanation: "递归深度受限于系统栈大小，过深会导致栈溢出错误。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: "选择排序在最坏情况下的比较次数是（ ）。",
            options: ["$O(\log n)$", "$$$O(N)$$$", "$O(n \log n)$", "$$$O(N^2)$$$"],
            answer: 3,
            score: 2,
            explanation: "选择排序无论何种情况都需两层循环，复杂度 $$$O(N^2)$$$。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: "下列排序算法中，不稳定的是（ ）。",
            options: ["冒泡排序", "插入排序", "归并排序", "快速排序"],
            answer: 3,
            score: 2,
            explanation: "快速排序由于基准划分时的跨度交换，是不稳定的排序。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: "在 C++ 中，`std::sort` 函数默认采用的排序方法（底层实现）通常不包括（ ）。",
            options: ["插入排序", "快速排序", "堆排序", "冒泡排序"],
            answer: 3,
            score: 2,
            explanation: "std::sort（内省排序）通常结合快排、堆排和插排，不包含冒泡排序。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: "关于 C++ 中的 `try-catch` 异常处理，下列说法正确的是（ ）。",
            options: [
                "一个 try 块只能对应一个 catch 块。",
                "catch 块必须出现在 try 块之后。",
                "任何类型的异常都可以由 `catch(...)` 捕获并自动修复错误。",
                "如果没有对应的 catch 块，异常会被静默忽略。"
            ],
            answer: 1,
            score: 2,
            explanation: "异常处理语法要求 catch 紧随 try。`catch(...)` 仅能捕获异常但不能修复。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: "二维数组 `int a[3][4]` 的存储方式是（ ）。",
            options: ["按列存储", "按行存储", "随机存储", "树形存储"],
            answer: 1,
            score: 2,
            explanation: "C/C++ 中二维数组按行主序（row-major order）连续存储。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: "分治算法中，通常将问题分解为（ ）个子问题。",
            options: ["1", "2 或多个", "N (数据总量)", "不确定"],
            answer: 1,
            score: 2,
            explanation: "分治通常将问题分解为 2 个或多个较小的子问题。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: "在 C++ 中，下列哪个关键字用于抛出异常（ ）。",
            options: ["throw", "catch", "try", "finally"],
            answer: 0,
            score: 2,
            explanation: "throw 用于显式抛出异常。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: "下列哪种算法采用了递归思想实现（ ）。",
            options: ["顺序查找", "二分查找", "归并排序", "以上都是"],
            answer: 2,
            score: 2,
            explanation: "归并排序是典型的递归分治算法。虽然二分查找可用递归，但最典型的是归并。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: "GESP 4 级认证不包含下列哪个知识点（ ）。",
            options: ["一维数组", "结构体", "动态规划", "函数嵌套调用"],
            answer: 2,
            score: 2,
            explanation: "动态规划通常在 6 级及以上要求，4 级不涉及。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: "在 C++ 中，下面代码可以正确定义指针和初始化指针：`int *p = nullptr;`。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "使用 nullptr 初始化是良好的实践。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: "一个函数必须在调用之前既声明又定义。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "只需在调用前有声明即可，定义可以放在后面或另一个文件。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: "函数参数可以通过值传递、引用传递和指针传递，这样函数内对参数的修改可以直接修改传入变量的值。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "值传递不会修改原变量。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: "int arr[3][] 是一个正确的二维数组的声明。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "二维数组声明时，列数必须指明。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: "递推是一种通过已知的初始值和递推公式，逐步求解目标值的算法。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "递推的基本定义。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: "冒泡排序的平均时间复杂度为 $$$O(N^2)$$$，但最优情况下为 $$$O(N)$$$。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "经过优化的冒泡排序在已有序时可达到 $$$O(N)$$$。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: "冒泡排序和插入排序都是稳定的排序算法。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "两者都通过相邻比较交换，是稳定的。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: "选择排序是稳定的排序算法。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "选择排序不稳。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: "在 C++ 语言中，如果一个函数可能抛出异常，那么一定要在 try 子句里调用这个函数。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "不强制。如果不捕捉，异常会向上抛出直到终止。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: "GESP 认证分为 1 到 8 级，数字越大难度越高。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "常识性判断。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        ...programmingQuestions
    ]
};
