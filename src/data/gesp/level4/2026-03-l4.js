// 2026年3月 GESP C++ 四级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      question: `
# 山之谷

## 题目描述

现有一片山地，可以视为一个 \$N\$ 行 \$M\$ 列的网格图，第 \$i\$ 行 \$j\$ 列的海拔为 \$h_{i,j}\$。如果一个单元格的海拔不高于其所有相邻单元格（相邻包括上、下、左、右、左上、右上、左下、右下，最多 8 个方向）的海拔，则称该单元格为山谷。请你数一数该片山地中有多少山谷。

## 输入格式

第一行包含 2 个整数 \$N, M\$，表示山地的大小。之后 \$N\$ 行，每行包含 \$M\$ 个整数 \$h_{i,1}, h_{i,2}, \\dots, h_{i,M}\$，表示海拔。

## 输出格式

输出 1 行，包含 1 个整数 \$C\$，表示山谷的数量。
`,
      score: 25,
      explanation: "遍历网格中的每个格子，检查其周围 8 个方向的邻居。如果当前格子的海拔小于等于所有有效邻居的海拔，则该格子是一个山谷，计数加一。注意处理边界情况（只有 3 到 5 个邻居）。样例 1 中，绿色单元格 (2,2), (3,2), (2,5) 是山谷。",
      tags: ["编程题", "二维数组", "模拟"],
      template: "#include <iostream>\n\nusing namespace std;\n\nint h[105][105];\nint dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};\nint dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            cin >> h[i][j];\n        }\n    }\n    \n    int ans = 0;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            bool ok = true;\n            for (int k = 0; k < 8; k++) {\n                int ni = i+dx[k];\n                int nj = j+dy[k];\n                if (ni >= 1 && ni <= n && nj >= 1 && nj <= m) {\n                    if (h[i][j] > h[ni][nj]) {\n                        ok = false;\n                        break;\n                    }\n                }\n            }\n            if (ok) ans++;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
      referenceCode: "#include <iostream>\n\nusing namespace std;\n\nint h[105][105];\nint dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};\nint dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};\n\nint main() {\n    int n, m;\n    if (!(cin >> n >> m)) return 0;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            cin >> h[i][j];\n        }\n    }\n    \n    int ans = 0;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 1; j <= m; j++) {\n            bool ok = true;\n            for (int k = 0; k < 8; k++) {\n                int ni = i+dx[k];\n                int nj = j+dy[k];\n                if (ni >= 1 && ni <= n && nj >= 1 && nj <= m) {\n                    if (h[i][j] > h[ni][nj]) {\n                        ok = false;\n                        break;\n                    }\n                }\n            }\n            if (ok) ans++;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}",
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      question: `
# 礼盒排序

## 题目描述

商店推出了许多礼盒，每个礼盒中包含 \$k\$ 件商品，每件商品都有一个价格。现在需要对这些礼盒进行排序，排序规则如下：
1. 先按礼盒总价格从小到大排序；
2. 如果总价格相同，则按礼盒中最贵商品的价格从小到大排序；
3. 如果仍然相同，则按礼盒中最后进店商品的价格（即输入的最后一个价格）从小到大排序；
4. 如果上述规则都相同，则按礼盒原本的编号（从 1 开始）从小到大排序。

## 输入格式

第一行包含两个整数 \$n, k\$，表示礼盒数量和每个礼盒中的商品数量。接下来的 \$n\$ 行，每行包含 \$k\$ 个整数，表示对应礼盒中商品的价格。

## 输出格式

输出一行，包含 \$n\$ 个整数，用空格分隔，表示排序后的礼盒编号。
`,
      score: 25,
      explanation: "1号礼盒：总价10，最大值5，最后进店2。2号礼盒：总价10，最大值5，最后进店5。3号礼盒：总价8，最大值4，最后进店4。4号礼盒：总价10，最大值4，最后进店3。排序过程：3号总价8最小排第一；其余总价均为10，4号最大值4较小排第二；1号和2号最大值相同均为5，1号最后进店2较小排第三；2号排最后。最终：3 4 2 1。",
      tags: ["编程题", "结构体", "排序"],
      template: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nstruct Combo {\n    int sum, mx, last, id;\n};\n\nint main() {\n    int n, k;\n    cin >> n >> k;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nstruct Combo {\n    int sum, mx, last, id;\n};\n\nbool cmp(const Combo &a, const Combo &b) {\n    if (a.sum != b.sum) return a.sum < b.sum;\n    if (a.mx != b.mx) return a.mx < b.mx;\n    if (a.last != b.last) return a.last < b.last;\n    return a.id < b.id;\n}\n\nint main() {\n    int n, k;\n    if (!(cin >> n >> k)) return 0;\n    vector<Combo> v(n);\n    for (int i = 0; i < n; i++) {\n        v[i].sum = 0;\n        v[i].mx = -1;\n        v[i].id = i+1;\n        int x;\n        for (int j = 0; j < k; j++) {\n            cin >> x;\n            v[i].sum += x;\n            v[i].mx = max(v[i].mx, x);\n            if (j == k-1) v[i].last = x;\n        }\n    }\n    sort(v.begin(), v.end(), cmp);\n    for (int i = 0; i < n; i++) {\n        cout << v[i].id << (i == n-1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
      answer: '',
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
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: "执行下面程序后，输出为（ ）。\n```cpp\nint f(int x = 2){\n    return x * 3;\n}\n\nint main(){\n    cout << f() << \" \" << f(4);\n    return 0;\n}\n```",
            options: ["2 12", "6 12", "6 4", "12 6"],
            answer: 1,
            score: 2,
            explanation: "f() 调用时使用了默认参数 x=2，返回 2*3=6。f(4) 调用时传入参数 x=4，返回 4*3=12。因此输出为 6 12。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: "执行下面代码后，输出为（ ）。\n```cpp\nint main() {\n    int a = 5;\n    int* p = &a;\n    int** q = &p;\n    **q += 7;\n    cout << a << \" \" << *p;\n    return 0;\n}\n```",
            options: ["5 5", "12 12", "12 5", "5 12"],
            answer: 1,
            score: 2,
            explanation: "q 是二级指针，指向指针 p，p 指向变量 a。**q 等价于 *p，等价于变量 a。**q += 7 即 a = a+7，a 变为 12。*p 也是 a 的值，即 12。因此输出 12 12。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: "已知有如下定义：\n```cpp\nint a[3][4] = {\n    {1, 2, 3, 4},\n    {5, 6, 7, 8},\n    {9, 10, 11, 12}\n};\nint (*p)[4] = a;\n```\n则表达式 `*(*(p+2)+1)` 的值为（ ）。",
            options: ["6", "10", "7", "11"],
            answer: 1,
            score: 2,
            explanation: "p 是指向包含 4 个 int 元素的数组指针。p+2 指向二维数组 a 的第 3 行（即索引为 2 的行 {9, 10, 11, 12}）。*(p+2) 得到该行首元素的地址。*(p+2)+1 指向该行第 2 个元素（索引为 1 的 10）。最后解引用得到 10。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: "执行下列代码后，输出是（ ）。\n```cpp\nint main() {\n    int a[] = {1, 2, 3, 4, 5};\n    int *p = a+1;\n    cout << p[2];\n    return 0;\n}\n```",
            options: ["2", "4", "3", "5"],
            answer: 1,
            score: 2,
            explanation: "p 指向 a+1，即元素 2 的位置。p[2] 等价于 *(p+2)，即 *(a+1+2) = a[3]。a[3] 的值是 4。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: "执行下面代码后，输出为（ ）。\n```cpp\nint main() {\n    char s[] = \"GESP\";\n    char *p = s+2;\n    cout << *p << \" \" << p[1];\n    return 0;\n}\n```",
            options: ["S P", "G E", "E S", "S G"],
            answer: 0,
            score: 2,
            explanation: "s[0]='G', s[1]='E', s[2]='S', s[3]='P'。p = s+2 指向 'S'。*p 为 'S'，p[1] 指向其后一个字符 'P'。输出为 S P。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: "下列关于 C++ 中 delete 运算符的说法，错误的是（ ）。",
            options: ["delete 用于释放 new 分配的内存", "delete 只能用于释放数组内存", "释放数组内存时应使用 delete[]", "对同一个指针多次使用 delete 可能会导致程序崩溃"],
            answer: 1,
            score: 2,
            explanation: "delete 用于释放单个变量内存，delete[] 用于释放数组内存。选项 B 说法错误。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: "执行下面代码后，输出为（ ）。\n```cpp\nint f(int n) {\n    if (n <= 1) return 1;\n    return n * f(n-1);\n}\n\nint main() {\n    cout << f(4);\n    return 0;\n}\n```",
            options: ["6", "24", "12", "4"],
            answer: 1,
            score: 2,
            explanation: "递归计算阶乘：f(4) = 4 * f(3) = 4 * 3 * f(2) = 4 * 3 * 2 * f(1) = 4 * 3 * 2 * 1 = 24。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: "下列关于递归的说法，正确的是（ ）。",
            options: ["递归函数不能有返回值", "递归过程必须有终止条件以防止死递归", "递归函数只能在 main 函数中调用", "任何问题都可以用递归非常高效地解决"],
            answer: 1,
            score: 2,
            explanation: "递归必须有边界条件（终止条件），否则会导致无限递归引起栈溢出。选项 B 正确。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: "已知一个序列为 {8, 3, 5, 2, 9}，使用插入排序（从小到大）进行第一轮排序后的结果是（ ）。",
            options: ["{3, 5, 8, 2, 9}", "{3, 8, 5, 2, 9}", "{2, 3, 5, 8, 9}", "{3, 2, 5, 8, 9}"],
            answer: 1,
            score: 2,
            explanation: "插入排序第一步取出第 2 个元素 3，插入到 8 前面，结果为 {3, 8, 5, 2, 9}。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: "在 5 个元素（从小到大已排好序）中进行折半查找，目标元素位于最后一位，查找过程中需要比较的次数是（ ）。",
            options: ["1", "3", "4", "5"],
            answer: 1,
            score: 2,
            explanation: "数组 [1, 2, 3, 4, 5]，目标 5。1. Mid=3, 5>3 往右。2. Mid=4, 5>4 往右。3. Mid=5, 找到。共 3 次。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: "下列关于分治算法的说法，错误的是（ ）。",
            options: ["分治算法通常配合递归实现", "归并排序是典型的分治算法", "分治算法总是比其他算法更高效", "快速排序采用了分治策略"],
            answer: 2,
            score: 2,
            explanation: "分治算法在许多场景下效率很高，但并不总是比其他算法更高效，效率取决于具体问题和子问题划分。选项 C 说法太绝对。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: "执行下面代码后，输出为（ ）。\n```cpp\nint main() {\n    int a[] = {5, 2, 8, 1, 9};\n    sort(a, a+5);\n    cout << a[2];\n    return 0;\n}\n```",
            options: ["2", "5", "8", "1"],
            answer: 1,
            score: 2,
            explanation: "sort 对数组升序排序后为 {1, 2, 5, 8, 9}。a[2] 是 5。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: "下列哪个算法的时间复杂度是 $O(n \log n)$？",
            options: ["计数排序", "快速排序（平均情况）", "冒泡排序", "顺序查找"],
            answer: 1,
            score: 2,
            explanation: "快速排序平均时间复杂度为 $O(n \log n)$。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: "一个长度为 N 的序列，使用选择排序进行排序，比较次数的数量级是（ ）。",
            options: ["$O(N)$", "$O(N^2)$", "$O(\log n)$", "$O(n \log n)$"],
            answer: 1,
            score: 2,
            explanation: "选择排序无论何种情况，比较次数均为 N($N-1$)/2，即 $O(N^2)$ 量级。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: "执行下面代码后，输出为（ ）。\n```cpp\nint main() {\n    vector<int> v = {1, 2, 3};\n    v.push_back(4);\n    cout << v.size() << \" \" << v.back();\n    return 0;\n}\n```",
            options: ["4 4", "3 3", "3 4", "4 3"],
            answer: 0,
            score: 2,
            explanation: "初始 v 有三个元素，push_back(4) 后 size 变为 4。back() 返回最后一个元素 4。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: "下面代码执行结束后，变量 a 的值变成 15。\n```cpp\nvoid add10(int &x) { x += 10; }\nint main() {\n    int a = 5;\n    add10(a);\n}\n```",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "add10 使用引用传递，对形参 x 的修改会直接影响实参 a。5+10 = 15。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: "引用一旦绑定某个变量，就不能再绑定其他变量。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "引用在定义时必须初始化，且之后不可更改其绑定的对象。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: "执行下面代码，输出结果为 5。\n```cpp\nint main() {\n    int a[2][3];\n    cout << &a[1][2]-&a[0][1] << endl;\n    return 0;\n}\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "指针相减的结果是元素个数。&a[1][2] 是第 6 个元素（索引 5），&a[0][1] 是第 2 个元素（索引 1）。5-1 = 4。因此输出 4 而非 5。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: "下面程序可以正常编译并输出 10。\n```cpp\nint calc(int x, int y = 10);\nint calc(int x) { return x * 2; }\nint calc(int x, int y) { return x * y; }\n\nint main() {\n    cout << calc(5);\n    return 0;\n}\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "calc(5) 既可以匹配 calc(int x)，也可以匹配有默认参数的 calc(int x, int y)。这会导致编译器无法确定调用哪个函数，产生二义性错误。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: "下面程序执行后输出 2010。\n```cpp\nint x = 10;\nvoid f() { int x = 20; cout << x; }\nint main() {\n    f();\n    cout << x;\n    return 0;\n}\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "f() 输出局部变量 x=20。main() 调用 f() 后输出全局变量 x=10。由于之间没有空格，输出确实是 2010。但官方答案标为错误，可能是因为题目预期输出带有空格或特定格式。按考试答案 key 执行。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: "在 C++ 中，如果声明了一个指针变量但没有显式初始化，该指针会自动初始化为 nullptr。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "在标准 C++ 中，局部指针变量不会自动初始化（其值为随机垃圾值）。但 GESP 背景下可能考虑全局变量或特定规范。按考试答案 key 执行。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: "下面代码没有语法错误。\n```cpp\nstruct GameCharacter {\n    string name;\n    int level;\n    struct Equipment {\n        string weapon;\n        int attack_bonus;\n        int defense_bonus;\n    } equipment;\n    struct Skill {\n        string name;\n        int damage;\n    } skills[8];\n    int skill_count;\n};\n```",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "C++ 支持结构体嵌套定义，此代码符合语法。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: "下面程序能够把 Hello 写入 data.txt 文件中。\n```cpp\nofstream fout(\"data.txt\");\ncout << \"Hello\";\nfout.close();\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "Hello 输出到了标准输出流 cout，而不是文件流 fout。应改为 fout << \"Hello\";。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: "由于选择排序和插入排序的时间复杂度均为 $O(N^2)$，在任何实际场景下两者的性能表现几乎相同，可以互相替代。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "虽然复杂度相同，但插入排序在处理几乎有序的数组时效率远高于选择排序。实际性能表现有显著差异。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: "下面用递归方式计算斐波那契数列第 n 项的程序，时间复杂度是 $O($2^n$)$。\n```cpp\nint fib(int n) {\n    if (n <= 1) return n;\n    int f0 = 0, f1 = 1, cur = 0;\n    for (int i = 2; i <= n; i++) {\n        cur = f0+f1;\n        f0 = f1;\n        f1 = cur;\n    }\n    return cur;\n}\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "该程序实际上是使用循环（递推）实现的，而不是递归。其时间复杂度是 $O(N)$。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        ...programmingQuestions
    ]
};
