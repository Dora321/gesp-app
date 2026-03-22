// 2025年9月 GESP C++ 四级真题
export const paperData = {
    id: '2025-09-l4',
    title: '2025年9月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: "运行下面程序后变量 `a` 的值是（ ）。\n```cpp\nint a = 42;\nint* p = &a;\n*p = *p+1;\n```",
            options: ["42", "43", "编译错误", "不确定"],
            answer: 1,
            score: 2,
            explanation: "`p` 是指向 `a` 的指针，`*p` 访问的就是 `a` 的内存。`*p = *p+1` 等同于 `a = a+1`，所以 `a` 变为 43。",
            tags: ["客观题", "单选题", "指针", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: "以下关于数组的描述中，（ ）是错误的。",
            options: [
                "数组名是一个指针常量",
                "随机访问数组的元素方便快捷",
                "数组可以像指针一样进行自增操作",
                "sizeof(arr) 返回的是整个数组 arr 占用的字节数"
            ],
            answer: 2,
            score: 2,
            explanation: "数组名是常量指针（Pointer Constant），其指向的地址不可更改。因此不能进行自增（`arr++`）操作。",
            tags: ["客观题", "单选题", "数组", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: "给定如下定义的数组 `arr`，则 `*(*(arr+1)+2)` 的值是（ ）。\n```cpp\nint arr[2][3] = {{1, 2, 3}, {4, 5, 6}};\n```",
            options: ["2", "5", "4", "6"],
            answer: 3,
            score: 2,
            explanation: "`arr+1` 指向第二行首地址，`*(arr+1)` 得到第二行数组名（首元素地址），`*(arr+1)+2` 指向第二行第三列元素的地址，解引用得到 `arr[1][2]` 的值 6。",
            tags: ["客观题", "单选题", "二维数组", "指针", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: "下面这段代码会输出（ ）。\n```cpp\nint add(int a, int b = 1); // 函数声明\nint main() {\n    cout << add(2) << \" \" << add(2, 3);\n    return 0;\n}\nint add(int a, int b) { // 函数定义\n    return a+b;\n}\n```",
            options: ["3 5", "编译失败：定义处少了默认参数", "运行错误", "链接失败：未定义引用"],
            answer: 0,
            score: 2,
            explanation: "`add(2)` 调用时 `b` 使用默认参数 1，结果为 3；`add(2, 3)` 调用时 `b` 被显式赋值 3，结果为 5。输出为 3 5。",
            tags: ["客观题", "单选题", "函数", "默认参数", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: "下面这段代码会输出（ ）。\n```cpp\nint x = 5;\nvoid foo() {\n    int x = 10;\n    cout << x << \" \";\n}\nvoid bar() {\n    cout << x << \" \";\n}\nint main() {\n    foo();\n    bar();\n}\n```",
            options: ["5 5", "10 10", "5 10", "10 5"],
            answer: 3,
            score: 2,
            explanation: "`foo()` 中定义了局部变量 `x`，屏蔽了全局变量，输出 10；`bar()` 中没有局部变量 `x`，访问全局变量，输出 5。",
            tags: ["客观题", "单选题", "作用域", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: "下面程序运行的结果是（ ）。\n```cpp\nvoid increaseA(int x) { x++; }\nvoid increaseB(int* p) { (*p)++; }\nint main() {\n    int a = 5;\n    increaseA(a);\n    cout << a << \" \";\n    increaseB(&a);\n    cout << a;\n}\n```",
            options: ["6 7", "6 6", "5 6", "5 5"],
            answer: 2,
            score: 2,
            explanation: "`increaseA` 是值传递，不修改原变量，输出 5；`increaseB` 是指针传递，修改原变量内存，输出 6。",
            tags: ["客观题", "单选题", "参数传递", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: "关于结构体初始化，以下哪个选项中正确的是（ ）。\n```cpp\nstruct Point { int x, y; };\n```",
            options: ["Point p = (1, 2);", "Point p = {1, 2};", "Point p = new {1, 2};", "Point p = <1, 2>;"],
            answer: 1,
            score: 2,
            explanation: "C++ 中结构体可以使用列表初始化（花括号形式）。",
            tags: ["客观题", "单选题", "结构体", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: "运行如下代码会输出（ ）。\n```cpp\nstruct Cat {\n    string name;\n    int age;\n};\nvoid birthday(Cat& c) {\n    c.age++;\n}\nint main() {\n    Cat kitty = {\"Mimi\", 2};\n    birthday(kitty);\n    cout << kitty.name << \" \" << kitty.age;\n}\n```",
            options: ["Mimi 2", "Mimi 3", "kitty 3", "kitty 2"],
            answer: 1,
            score: 2,
            explanation: "`birthday` 函数接受结构体的引用 `Cat& c`，因此在函数内部对 `age` 的修改会反映到原始对象 `kitty` 上。",
            tags: ["客观题", "单选题", "结构体", "引用传递", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: "关于排序算法的稳定性，以下说法错误的是（ ）。",
            options: [
                "稳定的排序算法不改变相等元素的相对位置",
                "冒泡排序是稳定的排序算法",
                "选择排序是稳定的排序算法",
                "插入排序是稳定的排序算法"
            ],
            answer: 2,
            score: 2,
            explanation: "选择排序在交换最小元素时可能会破坏相同元素的相对位置，因此是不稳定的。冒泡排序和插入排序是稳定的。",
            tags: ["客观题", "单选题", "排序算法", "稳定性", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: "下面代码试图实现选择排序，使其能对数组 `nums` 排序为升序，则横线上应分别填写（ ）。\n```cpp\nvoid selectionSort(vector<int>& nums) {\n    int n = nums.size();\n    for (int i = 0; i < n-1; ++i) {\n        int minIndex = i;\n        for (int j = i+1; j < n; ++j) {\n            if ( __________ ) { // 在此处填入代码\n                minIndex = j;\n            }\n        }\n        ____________________; // 在此处填入代码\n    }\n}\n```",
            options: [
                "nums[j] < nums[minIndex] 和 swap(nums[i], nums[minIndex])",
                "nums[j] > nums[minIndex] 和 swap(nums[i], nums[minIndex])",
                "nums[j] <= nums[minIndex] 和 swap(nums[j], nums[minIndex])",
                "nums[j] <= nums[minIndex] 和 swap(nums[i], nums[j])"
            ],
            answer: 0,
            score: 2,
            explanation: "选择排序寻找未排序区间的最小值索引，若发现更小的则更新 `minIndex`，内循环结束后将最小值与当前位置 `i` 交换。",
            tags: ["客观题", "单选题", "选择排序", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: "下面程序实现插入排序（升序排序），则横线上应分别填写（ ）。\n```cpp\nvoid insertionSort(int arr[], int n) {\n    for (int i = 1; i < n; i++) {\n        int key = arr[i];\n        int j = i-1;\n        while ( j >= 0 && ____________________ ) { // 在此处填入代码\n            arr[j+1] = arr[j];\n            j--;\n        }\n        ____________________; // 在此处填入代码\n    }\n}\n```",
            options: [
                "arr[j] > key 和 arr[j+1] = key",
                "arr[j] < key 和 arr[j+1] = key",
                "arr[j] > key 和 arr[j] = key",
                "arr[j] < key 和 arr[j] = key"
            ],
            answer: 0,
            score: 2,
            explanation: "插入排序将当前 `key` 与前面已排序序列比较，若 `arr[j] > key` 则后移元素，最后在空出的位置 `j+1` 放置 `key`。",
            tags: ["客观题", "单选题", "插入排序", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: "关于插入排序的时间复杂度，下列说法正确的是（ ）。",
            options: [
                "最好情况和最坏情况的时间复杂度都是 $O(N^2)$",
                "最好情况是 $O(N)$，最坏情况是 $O(N^2)$",
                "最好情况是 $O(N^2)$，最坏情况是 $O(N)$",
                "最好情况是 $O(1)$，最坏情况是 $O(N)$"
            ],
            answer: 1,
            score: 2,
            explanation: "当输入数组已经有序时，插入排序只需遍历一次，复杂度为 $O(N)$；当数组逆序时，每次需移动所有元素，复杂度为 $O(N^2)$。",
            tags: ["客观题", "单选题", "插入排序", "时间复杂度", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: "小杨正在爬楼梯，需要 $n$ 阶才能到达楼顶，每次可以爬 1 阶或 2 阶，求小杨有多少种不同的方法可以爬到楼顶。横线上应填写（ ）。\n```cpp\nint climbStairs(int n) {\n    if (n <= 2) return n;\n    int prev2 = 1;\n    int prev1 = 2;\n    int current = 0;\n    for (int i = 3; i <= n; ++i) {\n        ________________ // 在此处填入代码\n    }\n    return current;\n}\n```",
            options: [
                "prev2 = prev1; prev1 = current; current = prev1+prev2;",
                "current = prev1+prev2; prev2 = prev1; prev1 = current;",
                "current = prev1+prev2; prev1 = current; prev2 = prev1;",
                "prev1 = current; prev2 = prev1; current = prev1+prev2;"
            ],
            answer: 1,
            score: 2,
            explanation: "状态转移方程为 `f(n) = f($n-1$)+f(n-2)`。计算出 `current` 后，更新 `prev2` 为旧的 `prev1`，`prev1` 为新的 `current` 供下轮迭代。",
            tags: ["客观题", "单选题", "递归递推", "斐波那契", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: "找出所有满足 `scores[i]+scores[j]+scores[k] == 300` 的三元组（$i < j < k$）。下面代码的时间复杂度是（ ）。\n```cpp\nint cnt = 0;\nfor (int i = 0; i < n; i++) {\n    for (int j = i+1; j < n; j++) {\n        for (int k = j+1; k < n; k++) {\n            if (scores[i]+scores[j]+scores[k] == 300) {\n                cnt++;\n            }\n        }\n    }\n}\n```",
            options: ["$O(N)$", "$O(n \log n)$", "$O(n^3)$", "$O(3^n)$"],
            answer: 2,
            score: 2,
            explanation: "代码包含三层嵌套循环，每层循环次数均与 $n$ 成线性关系，因此总复杂度为 $O(n^3)$。",
            tags: ["客观题", "单选题", "复杂度分析", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: "关于异常处理，以下说法错误的是（ ）。",
            options: [
                "try 块中的代码可能会抛出异常",
                "catch 块可以有多个，处理不同类型的异常",
                "throw 语句用于抛出异常",
                "所有异常都必须被捕获，否则程序会崩溃"
            ],
            answer: 3,
            score: 2,
            explanation: "未被捕获（uncaught）的异常会导致程序调用 `std::terminate` 终止，但并不是语法上要求“必须”捕获（例如可以留给调用者处理）。D 选项表述过于绝对（应当说“推荐捕获”或“不捕获会导致异常终止”）。",
            tags: ["客观题", "单选题", "异常处理", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: "执行以下代码后，变量 `a` 的值将变为 20。\n```cpp\nint a = 5;\nint* p = &a;\n*p = 20;\n```",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "解引用指针并赋值会直接修改该指针所指内存单元的内容。",
            tags: ["客观题", "判断题", "指针", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: "执行下面 C++ 代码将输出 11（假设全局变量 `x` 为 10）。\n```cpp\nint x = 10;\nvoid f() {\n    int x = x+1;\n    cout << x << endl;\n}\nint main() {\n    f();\n}\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "在函数 `f` 内部，定义 `int x = x+1` 时，等号右边的 `x` 是正在定义的局部变量本身。此时局部变量尚未初始化完成，其值是不确定的（UB），且它屏蔽了全局变量。",
            tags: ["客观题", "判断题", "作用域", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: "以下 C++ 代码合法。\n```cpp\nstruct Student { string name; int age; float score; };\nStudent* students = new Student[20];\n```",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "这是正确的动态结构体数组分配语法。",
            tags: ["客观题", "判断题", "结构体", "指针", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: "执行下面 C++ 代码将输出 10。\n```cpp\nvoid func(int* p) {\n    *p = 10;\n}\nint main() {\n    int a = 5;\n    func(&a);\n    cout << a << endl;\n    return 0;\n}\n```",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "通过指针传递地址，在函数内修改指针指向的内容会改变原变量的值。",
            tags: ["客观题", "判断题", "指针", "参数传递", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: "下面代码将二维数组 `arr` 传递给函数 `f`，函数内部用 `arr[i][j]` 访问元素，函数参数声明为 `int arr[][4]` 是错误的。\n```cpp\nvoid f(int arr[][4], int rows) { /* 访问 arr[i][j] */ }\nint main() {\n    int arr[3][4] = { /* 初始化 */ };\n    f(arr, 3);\n}\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "二维数组传参时，第二维的大小必须指定，第一维可以省略。`int arr[][4]` 是正确且常见的写法。",
            tags: ["客观题", "判断题", "二维数组", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: "递推是在给定初始条件下，已知前一项（或前几项）求后一项的过程。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "这是递推（Recurrence）的基本定义。",
            tags: ["客观题", "判断题", "递推", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: "虽然插入排序的时间复杂度为 $O(N^2)$，但由于单元操作相对较少，因此在小数据量的排序任务中非常受欢迎。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "插入排序常数项较小，且在近乎有序的情况下效率极高，适合处理小型序列。",
            tags: ["客观题", "判断题", "插入排序", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: "对整数数组 `{4, 1, 3, 1, 5, 2}` 进行冒泡排序（将最大元素放到最后），执行一轮之后是 `{4, 1, 3, 1, 2, 5}`。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "冒泡排序第一轮会将最大值 5 交换到最后。过程：(4,1)->1,4; (4,3)->3,4; (4,1)->1,4; (4,5)->4,5; (5,2)->2,5。最终结果：`{1, 3, 1, 4, 2, 5}`。",
            tags: ["客观题", "判断题", "冒泡排序", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: "以下代码只能捕获 `int` 类型异常。\n```cpp\ntry { /* codes */ }\ncatch (...) { /* codes */ }\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "`catch (...)` 是全能捕获器，可以捕获任何类型的异常。",
            tags: ["客观题", "判断题", "异常处理", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: "选择排序算法在任何情况下（无论输入数组是否已经有序）的平均时间复杂度都是 $O(N^2)$。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "选择排序的逻辑是：每次扫描全数组找最小值。无论数据是否有序，它都会进行相同次数的比较，因此复杂度恒定为 $O(N^2)$。",
            tags: ["客观题", "判断题", "选择排序", "复杂度", "GESP4级"]
        },
        {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202509 四级] 排兵布阵

## 题目描述

作为将军，你自然需要合理地排兵布阵。地图可以视为 \$n\$ 行 \$m\$ 列的网格，适合排兵的网格以 1 标注，不适合排兵的网格以 0 标注。现在你需要在地图上选择一个矩形区域排兵，这个矩形区域内不能包含不适合排兵的网格。请问可选择的矩形区域最多能包含多少网格？

## 输入格式

第一行，两个正整数 \$n, m\$，分别表示地图网格的行数与列数。

接下来 \$n\$ 行，每行 \$m\$ 个整数 \$a_{i,1}, a_{i,2}, \\ldots, a_{i,m}\$，表示各行中的网格是否适合排兵。

## 输出格式

一行，一个整数，表示适合排兵的矩形区域包含的最大网格数。
`,
      score: 25,
      explanation: "该问题可以转化为求“全 1 子矩阵的最大面积”。由于数据范围较小 (n,m <= 500)，可以使用单调栈优化：对每一行，维护以该行为底向上连续 1 的高度。这样每一行就变成了一个“直方图最大矩形”问题，利用单调栈可以在 O(m) 内求解，总复杂度 O(n*m)。",
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      referenceCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <stack>\nusing namespace std;\n\nint largestRectangleArea(vector<int>& heights) {\n    heights.push_back(0);\n    stack<int> s;\n    int maxArea = 0;\n    for (int i = 0; i < heights.size(); i++) {\n        while (!s.empty() && heights[s.top()] >= heights[i]) {\n            int h = heights[s.top()];\n            s.pop();\n            int w = s.empty() ? i : i-s.top()-1;\n            maxArea = max(maxArea, h * w);\n        }\n        s.push(i);\n    }\n    return maxArea;\n}\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> grid(n, vector<int>(m));\n    vector<int> heights(m, 0);\n    int maxArea = 0;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < m; j++) {\n            int val; cin >> val;\n            if (val == 1) heights[j]++;\n            else heights[j] = 0;\n        }\n        maxArea = max(maxArea, largestRectangleArea(heights));\n    }\n    cout << maxArea << endl;\n    return 0;\n}`,
      tags: ["编程题", "矩阵", "单调栈", "最大子矩阵", "GESP4级"],
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202509 四级] 最长连续段

## 题目描述

对于 \$k\$ 个整数构成的数组 \$[b_1, b_2, \\ldots, b_k]\$，如果对 \$1 \\leq i < k\$ 都有 \$b_{i+1} = b_i + 1\$，那么称数组 \$b\$ 是一个连续段。

给定由 \$n\$ 个整数构成的数组 \$[a_1, a_2, \\ldots, a_n]\$，你可以任意重排数组 \$a\$ 中元素顺序。请问在重排顺序之后，\$a\$ 所有是连续段的子数组中，最长的子数组长度是多少？

例如，对于数组 \$[1, 0, 2, 4]\$，可以将其重排为 \$[4, 0, 1, 2]\$，有以下 \$10\$ 个子数组：

\$[4], [0], [1], [2], [4, 0], [0, 1], [1, 2], [4, 0, 1], [0, 1, 2], [4, 0, 1, 2]\$

其中除 \$[4, 0], [4, 0, 1], [4, 0, 1, 2]\$ 以外的子数组均是连续段，因此是连续段的子数组中，最长子数组长度为 3。

## 输入格式

第一行，一个正整数 \$n\$，表示数组长度。

第二行，\$n\$ 个整数 \$a_1, a_2, \\ldots, a_n\$，表示数组中的整数。

## 输出格式

一行，一个整数，表示数组 \$a\$ 重排顺序后，所有是连续段的子数组的最长长度。
`,
      score: 25,
      explanation: "重排后能构成的最长“连续段”，本质上是原数组去重排序后，能够构成的最长“值连续整数序列”。解法：先排除重复元素（因为连续段内元素互不相同），排序后遍历，记录最长的相邻差值为 1 的区间。",
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      referenceCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    if (n == 0) {\n        cout << 0 << endl;\n        return 0;\n    }\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    sort(a.begin(), a.end());\n    a.erase(unique(a.begin(), a.end()), a.end());\n    \n    int maxLen = 1, currentLen = 1;\n    for (size_t i = 1; i < a.size(); i++) {\n        if (a[i] == a[i-1]+1) {\n            currentLen++;\n        } else {\n            maxLen = max(maxLen, currentLen);\n            currentLen = 1;\n        }\n    }\n    cout << max(maxLen, currentLen) << endl;\n    return 0;\n}`,
      tags: ["编程题", "贪心", "排序", "GESP4级"],
      answer: '',
    }
    ]
};
