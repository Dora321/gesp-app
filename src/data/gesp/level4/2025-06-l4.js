// 2025年6月 GESP C++ 四级真题
export const paperData = {
    id: '2025-06-l4',
    title: '2025年6月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: `在 C++ 中，声明一个指向整型变量的指针的正确语法是（ ）。`,
            options: [
                "int* ptr;",
                "*int ptr;",
                "int ptr*;",
                "ptr int;"
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            在 C++ 中，声明指针的语法是 \`类型* 变量名;\`，因此 \`int* ptr;\` 是正确的。
            
            **考点：** `,
            tags: ["客观题", "单选题", "指针", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: `下面的函数接收一个 3 行 4 列的二维数组并输出其中元素，则横线上不能填写（ ）。\n\`\`\`cpp\nvoid printArray(________) {\n for (int i = 0; i < 3; ++i)\n for (int j = 0; j < 4; ++j)\n std::cout << arr[i][j] << " ";\n}\n\`\`\``,
            options: [
                "int arr[3][4]",
                "int arr[][4]",
                "int (*arr)[4]",
                "int** arr"
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            二维数组在作为参数传递时，除了第一维可以不指定大小外，其余维度必须明确。\`int** arr\` 是指向指针的指针，不等同于二维数组名。
            
            **考点：** `,
            tags: ["客观题", "单选题", "二维数组", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: `在 C++ 中，\`int arr[3][4]\` 和 \`int* arr = new int[12]\` 均可模拟一个 3 行 4 列的二维数组。关于这两种方式，下面说法错误的是（ ）。`,
            options: [
                "int arr[3][4] 在栈上分配空间，适合数组较小的情况",
                "int* arr = new int[12] 在堆上分配空间，数组较大时也适用",
                "这两种方式申请的内存空间都是连续的",
                "这两种方式申请的内存都能自动释放"
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            使用 \`new\` 申请的内存位于堆上，必须手动使用 \`delete\` 释放，否则会造成内存泄漏。
            
            **考点：** `,
            tags: ["客观题", "单选题", "内存管理", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: `关于以下 C++ 代码，说法正确的是（ ）。\n\`\`\`cpp\nint main() {\n greet();\n return 0;\n}\nvoid greet() {\n cout << "Hello!" << endl;\n}\n\`\`\``,
            options: [
                "正确编译并输出 Hello!",
                "编译错误：找不到函数 greet()",
                "编译警告但可以运行",
                "链接错误"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            在 C++ 中，函数必须先声明或定义才能被调用。代码中 \`greet()\` 在 \`main()\` 之后定义且没有提前声明，因此会产生编译错误。
            
            **考点：** `,
            tags: ["客观题", "单选题", "函数声明", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: `在 C++ 中，如果希望通过函数修改传入的结构体对象的内容，应该使用哪种参数传递方式？`,
            options: [
                "值传递或引用传递",
                "值传递或指针传递",
                "引用传递或指针传递",
                "仅指针传递"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            引用传递和指针传递都可以让函数直接操作原始变量（或其地址），从而修改其内容。值传递会产生副本，无法修改原对象。
            
            **考点：** `,
            tags: ["客观题", "单选题", "参数传递", "结构体", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: `以下哪个选项正确描述了 C++ 中形参和实参的区别？`,
            options: [
                "形参是函数调用时传递给函数的具体值，实参是函数定义中声明的变量",
                "形参是函数定义中声明的变量，实参是函数调用时传递给函数的具体值",
                "形参和实参在函数调用时是完全相同的",
                "形参只在函数内部可见，实参在函数外部可见"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            形参（Formal Parameter）是在函数定义中声明的占位变量；实参（Actual Argument）是在函数调用时传入的具体数值或变量。
            
            **考点：** `,
            tags: ["客观题", "单选题", "函数参数", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: `运行如下代码会输出（ ）。\n\`\`\`cpp\nint value = 100;\nvoid print1() {\n int value = 50;\n cout << value << " ";\n cout << ::value << " ";\n}\nvoid print2() {\n cout << value << " ";\n}\nint main() {\n print1();\n print2();\n return 0;\n}\n\`\`\``,
            options: [
                "100 100 100",
                "50 50 50",
                "50 100 100",
                "50 50 100"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            \`print1\` 中首选局部变量 \`value\` (50)，\`::value\` 显式访问全局变量 (100)；\`print2\` 内部无局部变量，直接访问全局变量 (100)。
            
            **考点：** `,
            tags: ["客观题", "单选题", "作用域", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: `小杨在整理一副扑克牌的所有红心扑克牌，使其从小到大排列。他的做法是：最开始抓到第 1 张扑克牌被认为已经排好序；然后抓第 2 张扑克牌，将其插入至有序部分的正确位置；不断循环步骤，每次将新抓到扑克牌插入至有序部分，直至抓完所有扑克牌，这样抓牌结束时就完成了扑克牌的排序。小杨这种整理扑克牌的方式与（ ）排序的方式最接近。`,
            options: [
                "冒泡排序",
                "插入排序",
                "选择排序",
                "直接排序"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            描述的过程正是插入排序的核心思想：将未排序数据逐个插入到已排序序列的合适位置。
            
            **考点：** `,
            tags: ["客观题", "单选题", "排序算法", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: `以下哪种情况是使用插入排序的合适场景？`,
            options: [
                "数据量非常大，且乱序严重",
                "希望获得稳定排序，但不要求实时性",
                "数据几乎有序，只需少量调整",
                "想在交换次数最少的前提下排好大数组"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            插入排序在数据“几乎有序”的情况下表现极佳，时间复杂度接近 $O(N)$。
            
            **考点：** `,
            tags: ["客观题", "单选题", "插入排序", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: `以下关于递推算法基本思想的描述，正确的是（ ）。`,
            options: [
                "递推算法通过将问题分解为相互独立的子问题来解决",
                "递推算法从已知的基础情况出发，通过某种关系逐步推导出更大规模问题的解",
                "递推算法通常用于穷举所有可能的解决方案",
                "递推算法适用于在每一步做出局部最优选择以达到全局最优"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            递推（Recurrence）的核心是从初始状态出发，利用递推公式逐步求解更大规模问题的解。
            
            **考点：** `,
            tags: ["客观题", "单选题", "递推算法", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: `给定如下算法，当输入 n=10 时，其时间复杂度为（ ）。\n\`\`\`cpp\nbool f(int arr[], int n, int target) {\n for (int i = 0; i < (1 << n); i++) {\n int sum = 0;\n for (int j = 0; j < n; j++) {\n if (i & (1 << j)) {\n sum += arr[j];\n }\n }\n if (sum == target) return true;\n }\n return false;\n}\n\`\`\``,
            options: [
                "$O(N)$",
                "O(n * $2^n$)",
                "O($2^n$)",
                "$O(N^2)$"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            外层循环运行 $2^n$ 次，内层循环运行 n 次，因此总复杂度为 O(n * $2^n$)。
            
            **考点：** `,
            tags: ["客观题", "单选题", "时间复杂度", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: `下述斐波那契数列计算的时间复杂度是（ ）。\n\`\`\`cpp\nint fibonacci(int n) {\n if (n == 0) return 0;\n if (n == 1) return 1;\n return fibonacci(n-1)+fibonacci(n-2);\n}\n\`\`\``,
            options: [
                "$O(N)$",
                "$O(N^2)$",
                "$O(log n)$",
                "O($2^n$)"
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**
            
            **解析：**
            简单的递归求斐波那契数列，不含记忆化，每一层都会分裂成两个子调用，复杂度呈指数级上升，约为 O($2^n$)。
            
            **考点：** `,
            tags: ["客观题", "单选题", "递归", "时间复杂度", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: `关于下面 C++ 程序的描述，（ ）最准确。\n\`\`\`cpp\nifstream in("data.txt");\nstring line;\nwhile (getline(in, line)) {\n cout << line << endl;\n}\n\`\`\``,
            options: [
                "将从标准输入读取每行，并输出到屏幕",
                "程序无法运行，因为 getline 只能读取 cin",
                "将 data.txt 中的每一行读取并输出到屏幕",
                "程序将创建 data.txt 并写入默认文本"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**
            
            **解析：**
            \`ifstream\` 用于文件输入。\`getline(in, line)\` 会从文件关联的流中逐行读取内容。
            
            **考点：** `,
            tags: ["客观题", "单选题", "文件操作", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: `在 C++ 中，异常处理机制（try-catch块）的主要目的是（ ）。`,
            options: [
                "提高程序的运行速度",
                "在程序发生运行时错误时，提供一种结构化的错误处理方式",
                "确保程序在编译时没有错误",
                "减少程序的内存占用"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            异常处理旨在捕获并应对程序运行过程中出现的特殊情况或错误，防止程序异常崩溃。
            
            **考点：** `,
            tags: ["客观题", "单选题", "异常处理", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: `为了提高冒泡排序的效率，如果某轮“冒泡”中没有执行任何交换操作，说明数组已经完成排序，可直接返回结果，则两条横线上分别应该填写（ ）。\n\`\`\`cpp\nvoid bubbleSortWithFlag(vector<int> &nums) {\n for (int i = nums.size()-1; i > 0; i--) {\n bool flag = false; // 横线 1\n for (int j = 0; j < i; j++) {\n if (nums[j] > nums[j+1]) {\n swap(nums[j], nums[j+1]);\n flag = true; // 横线 2\n }\n }\n if (!flag) break;\n }\n}\n\`\`\``,
            options: [
                "flag = true; flag = false;",
                "flag = false; flag = true;",
                "flag = true; flag = true;",
                "flag = false; flag = false;"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            初始假设这一轮没交换 (\`flag = false\`)，如果发生了交换就设为 \`true\`。一轮结束若依然为 \`false\` 则提前退出。
            
            **考点：** `,
            tags: ["客观题", "单选题", "冒泡排序", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: `C++ 语言中，函数声明 \`int add(int, int);\` 是合法的。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            函数原型声明可以只写参数类型而不写参数名，是合法语法。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["客观题", "判断题", "函数声明", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `在 C++ 中，通过值传递方式将变量传入函数后，在函数内部修改该参数的值，不会影响函数外部原始变量的值。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            值传递会创建变量的副本，函数内部对副本的修改不影响原变量。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["客观题", "判断题", "参数传递", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `C++ 并不支持嵌套结构体，即在一个结构体内部定义另一个结构体是错误的。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            C++ 完全支持结构体嵌套，这在组织复杂数据时非常有用。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["客观题", "判断题", "结构体", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `引用传递（Pass-by-reference）在函数调用时不会产生参数的副本，因此在处理大型对象时通常比值传递更高效。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            引用即别名，不涉及内存拷贝，对大型结构体或类尤其高效。
            
            **易混概念：** CPU 负责运算和判断，内存负责存储数据，两者职能不同。
            
            **考点：** `,
            tags: ["客观题", "判断题", "引用传递", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: `在 C++ 中，定义二维数组时，必须明确地为数组的每一个元素都提供初始化值。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            可以只初始化前几个元素，其余元素将根据其存放位置（全局或局部）被赋予默认初值（如 0）。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["客观题", "判断题", "二维数组", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `执行以下代码后，变量 \`res\` 的值将为 \`n\` 的阶乘。\n\`\`\`cpp\nint res = 1;\nfor (int i = 0; i < n; i++) {\n res *= i;\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            循环从 \`i = 0\` 开始，导致 \`res\` 立即变为 0 并保持到结束。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["客观题", "判断题", "循环控制", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: `选择排序算法在任何情况下（无论输入数组是否已经有序）的比较次数都是相同的。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            选择排序的基本逻辑是每次在未排序区间找到最小值，无论数据分布如何，比较次数始终为 ($N-1$)+(N-2)+...+1 = $O(N^2)$。
            
            **易混概念：** scanf 需要传地址（&变量名），忘记 & 会导致未定义行为。scanf 以空格/换行作为分隔符。
            
            **考点：** `,
            tags: ["客观题", "判断题", "选择排序", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: `以下代码实现了选择排序的逻辑（升序）。\n\`\`\`cpp\nfor (int i = 0; i < n-1; i++) {\n int minIdx = i;\n for (int j = i+1; j < n; j++)\n if (arr[j] < arr[minIdx]) minIdx = j;\n swap(arr[i], arr[minIdx]);\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            这是典型的选择排序实现：通过找最小值索引并与当前位置交换来完成排序。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["客观题", "判断题", "选择排序", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `在 C++ 中，如果程序抛出了一个异常，但没有任何 \`catch\` 块与之匹配，程序将产生编译错误。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            未被捕获的异常会导致程序在运行时被 \`std::terminate\` 终止，而不是产生编译错误。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["客观题", "判断题", "异常处理", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: `使用 \`ofstream outFile("output.txt"); outFile << "Hello";\` 这种方式可以将字符串 "Hello" 写入到 output.txt 文件中。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            \`ofstream\` 是输出文件流，可以使用输出流操作符 \`<<\` 写入内容。
            
            **易混概念：** 字符运算本质是 ASCII 码值运算，'0'=48, 'A'=65, 'a'=97。字符加减是码值加减。
            
            **考点：** `,
            tags: ["客观题", "判断题", "文件操作", "GESP4级"]
        },
        {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3 5
2 2 2 4
.....
.>_<.
.....`, output: `>_<` },
        { input: `5 5
1 2 3 4
AbCdE
fGhIk
LmNoP
qRsTu
VwXyZ`, output: `Cd
hI` }
      ],
      question: `
# [GESP202506 四级] 画布裁剪

## 题目描述

小 A 在高为 $h$ 宽为 $w$ 的矩形画布上绘制了一幅画。由于画布边缘留白太多，小 A 想适当地裁剪画布，只保留画的主体。具体来说，画布可以视为 $h$ 行 $w$ 列的字符矩阵，其中的字符均为 ASCII 码位于 $33 \\sim 126$ 之间的可见字符，小 A 只保留画布中由第 $x_1$ 行到第 $x_2$ 行、第 $y_1$ 列到第 $y_2$ 列构成的子矩阵。

小 A 将画布交给了你，你能帮他完成画布的裁剪吗？

## 输入格式

第一行，两个正整数 $h, w$，分别表示画布的行数与列数。

第二行，四个正整数 $x_1, x_2, y_1, y_2$，表示保留的行列边界。

接下来 $h$ 行，每行一个长度为 $w$ 的字符串，表示画布内容。

## 输出格式

输出共 $x_2 - x_1 + 1$ 行，每行一个长度为 $y_2 - y_1 + 1$ 的字符串，表示裁剪后的画布。
`,
      score: 25,
      explanation: "该题为基础的矩阵裁剪问题。根据输入的四个边界坐标 (x1, x2, y1, y2)，使用嵌套循环遍历并输出原矩阵中对应的子区域即可。",
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      referenceCode: `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    int H, W;\n    cin >> H >> W;\n    int x1, x2, y1, y2;\n    cin >> x1 >> x2 >> y1 >> y2;\n    vector<string> canvas(H);\n    for (int i = 0; i < H; ++i) cin >> canvas[i];\n    for (int i = x1-1; i <= x2-1; ++i) {\n        for (int j = y1-1; j <= y2-1; ++j) {\n            cout << canvas[i][j];\n        }\n        cout << endl;\n    }\n    return 0;\n}`,
      tags: ["编程题", "矩阵操作", "GESP4级"],
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
1 60
3 70
2 80
4 55
4 50`, output: `8` },
        { input: `5
4 0
4 0
2 0
3 0
1 0`, output: `1` }
      ],
      question: `
# [GESP202506 四级] 排序

## 题目描述

体育课上有 $n$ 名同学排成一队，从前往后数第 $i$ 位同学的身高为 $h_i$，体重为 $w_i$。目前排成的队伍看起来参差不齐，老师希望同学们能按照身高从高到低的顺序排队，如果身高相同则按照体重从重到轻排序。在调整队伍时，每次只能交换相邻两位同学的位置。老师想知道，最少需要多少次交换操作，才能将队伍调整成目标顺序。

## 输入格式

第一行，一个正整数 $n$，表示队伍人数。

接下来 $n$ 行，每行两个正整数 $h_i$ 和 $w_i$，分别表示第 $i$ 位同学的身高和体重。

## 输出格式

输出一行，一个整数，表示最少需要的交换次数。
`,
      score: 25,
      explanation: "本题要求计算将初始队列调整为目标有序队列所需的最少相邻交换次数，即求原序列的“逆序对”数。由于是要按身高从高到低、体重从重到轻排序，我们可以直接使用冒泡排序或插入排序等模拟相邻交换的过程，统计交换次数即可。",
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      referenceCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Student {\n    int h, w;\n};\n\nbool compare(const Student& a, const Student& b) {\n    if (a.h != b.h) return a.h > b.h;\n    return a.w > b.w;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Student> sts(n);\n    for (int i = 0; i < n; ++i) cin >> sts[i].h >> sts[i].w;\n    \n    int swaps = 0;\n    for (int i = 0; i < n-1; ++i) {\n        for (int j = 0; j < n-1-i; ++j) {\n            if (compare(sts[j+1], sts[j])) {\n                swap(sts[j], sts[j+1]);\n                swaps++;\n            }\n        }\n    }\n    cout << swaps << endl;\n    return 0;\n}`,
      tags: ["编程题", "排序", "逆序对", "GESP4级"],
      answer: '',
    }
    ]
};

