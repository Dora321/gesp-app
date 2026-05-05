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
            explanation: `**答案：A (int* ptr;)**

**选项逐项分析：**
- **A int* ptr;**：✅ 正确。在 C++ 中，声明指针的语法是 \`类型 * 变量名;\`。星号 \`*\` 可以靠近类型，也可以靠近变量名（如 \`int *ptr;\`），或位于中间。
- **B *int ptr;**：❌ 错误。语法不规范，星号应在类型之后。
- **C int ptr*;**：❌ 错误。
- **D ptr int;**：❌ 错误。类型名必须在前。

**考点：** C++ 指针的定义与基础语法。`,
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
            explanation: `**答案：D (int** arr)**

**选项逐项分析：**
- **A int arr[3][4] / B int arr[][4]**：✅ 正确。作为参数传递二维数组，第一维的大小可以显式写出或省略，但高维度的大小必须明确。
- **C int (*arr)[4]**：✅ 正确。这是一个指向含有 4 个整型元素数组的指针，类型上与二维数组名 \`int[3][4]\` 退化后的类型完全匹配。
- **D int** arr**：❌ 错误。\`int**\` 是二级指针（指向指针的指针）。虽然二维数组常被口头称为“指针的指针”，但在 C++ 内存布局中，\`int[3][4]\` 是连续内存块，不能直接赋值给 \`int**\` 类型。

**考点：** 二维数组作为函数参数的传递规则与二级指针的区别。`,
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
            explanation: `**答案：D (这两种方式申请的内存都能自动释放)**

**选项逐项分析：**
- **A 栈上分配空间，适合数组较小**：✅ 正确。栈空间有限，过大数组会导致栈溢出。
- **B 堆上分配空间，数组较大适用**：✅ 正确。堆空间相对较大，受操作系统控制。
- **C 申请的内存空间都是连续的**：✅ 正确。\`int arr[3][4]\` 是连续存储，\`new int[12]\` 申请的也是一片连续空间。
- **D 这两种方式申请的内存都能自动释放**：❌ 错误。\`new\` 申请的内存（堆内存）**不会自动释放**，必须由程序员显式调用 \`delete[]\` 进行释放，否则会造成内存泄漏。

**考点：** C++ 内存模型（栈 vs 堆）及动态内存管理。`,
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
            explanation: `**答案：B (编译错误：找不到函数 greet())**

**选项逐项分析：**
- **A 正确编译**：❌ 错误。
- **B 找不到函数 greet()**：✅ 正确。在 C++ 中，函数必须“先声明，后使用”。代码中 \`main\` 函数调用 \`greet\` 时，编译器尚未看到 \`greet\` 的声明或定义，因此会报错。
- **C 编译警告**：❌ 错误。这是致命语法错误，无法通过编译。
- **D 链接错误**：❌ 错误。在编译阶段就会拦截。

**考点：** 函数的声明（Declaration）与定义（Definition）顺序规则。`,
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
            explanation: `**答案：C (引用传递或指针传递)**

**选项逐项分析：**
- **A 值传递或引用传递**：❌ 错误。值传递会产生副本，修改副本不影响原对象。
- **B 值传递或指针传递**：❌ 错误。同上。
- **C 引用传递或指针传递**：✅ 正确。引用和指针都直接关联到原始数据内存，可以实现原地修改。
- **D 仅指针传递**：❌ 错误。过于局限。

**考点：** C++ 函数参数传递方式（值、引用、指针）的功能区别。`,
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
            explanation: `**答案：B (形参是函数定义中声明的变量，实参是函数调用时传递给函数的具体值)**

**选项逐项分析：**
- **A 颠倒了定义**：❌ 错误。
- **B 形参是占位变量，实参是具体值**：✅ 正确。
  - **形参（Formal Parameter）**：定义函数时使用的变量，用于接收外部传入的数据。
  - **实参（Actual Argument）**：调用函数时实际传递的数据（常量、变量或表达式）。
- **C 完全相同**：❌ 错误。
- **D 描述不准确**：❌ 错误。

**考点：** 函数的基础组成部分（形参 vs 实参）。`,
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
            explanation: `**答案：C (50 100 100)**

**选项逐项分析：**
- **A 100 100 100 / B 50 50 50 / D 50 50 100**：❌ 错误。
- **C 50 100 100**：✅ 正确。
  1. \`print1()\` 执行：
     - 定义局部变量 \`value = 50\`。
     - \`cout << value\` 输出局部变量 50。
     - \`cout << ::value\` 使用作用域解析符 \`::\` 强制访问全局变量，输出 100。
  2. \`print2()\` 执行：
     - 内部无局部变量 \`value\`，直接访问全局变量，输出 100。
  3. 综合输出：50 100 100。

**考点：** 变量的作用域、遮蔽效应与全局作用域解析符 \`::\`。`,
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
            explanation: `**答案：B (插入排序)**

**选项逐项分析：**
- **A 冒泡排序**：❌ 错误。通过不断交换相邻元素将最大/最小元“浮”到一端。
- **B 插入排序**：✅ 正确。将未排序序列中的元素逐个取出，在已排序序列中从后向前扫描，找到相应位置并插入。这正是整理扑克牌的典型直觉。
- **C 选择排序**：❌ 错误。每次从剩余未排序元素中选出最小/最大的放在已排序序列末尾。
- **D 直接排序**：❌ 错误。

**考点：** 常见排序算法的基本思想模拟。`,
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
            explanation: `**答案：C (数据几乎有序，只需少量调整)**

**选项逐项分析：**
- **A 数据量大且乱序**：❌ 错误。此时插入排序的 $O(N^2)$ 性能会很差。
- **B 希望稳定排序，不要求实时性**：❌ 错误（虽然插入排序稳定，但并非其核心性能优势场景）。
- **C 数据几乎有序**：✅ 正确。在接近有序的情况下，插入排序的时间复杂度会趋近于 $O(N)$，效率非常高。
- **D 交换次数最少**：❌ 错误（通常选择排序或某些特定算法交换次数更少）。

**考点：** 插入排序（Insertion Sort）的最佳性能场景与适用性。`,
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
            explanation: `**答案：B (递推算法从已知的基础情况出发，通过某种关系逐步推导出更大规模问题的解)**

**选项逐项分析：**
- **A 分解为相互独立的子问题**：❌ 错误（更接近分治法）。
- **B 从已知推导未知**：✅ 正确。递推是按照确定的递推公式，由初始项逐步计算出目标项的过程。
- **C 穷举所有可能**：❌ 错误（属于搜索/暴力破解）。
- **D 局部最优选择**：❌ 错误（属于贪心算法）。

**考点：** 递推算法（Recurrence）的核心定义。`,
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
            explanation: `**答案：B (O(n * $2^n$))**

**选项逐项分析：**
- **A $O(N)$**：❌ 错误。
- **B O(n * $2^n$)**：✅ 正确。
  1. \`(1 << n)\` 等于 $2^n$。外层循环遍历 $2^n$ 次（即枚举 $n$ 个元素的所有子集）。
  2. 内层循环遍历 $n$ 次。
  3. 总时间复杂度为 $O(n \times 2^n)$。
- **C O($2^n$)**：❌ 错误。忽略了内层循环的 $n$ 次操作。
- **D $O(N^2)$**：❌ 错误。

**考点：** 循环嵌套下的时间复杂度分析（涉及位运算枚举）。`,
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
            explanation: `**答案：D (O($2^n$))**

**选项逐项分析：**
- **A $O(N)$ / B $O(N^2)$ / C $O(log n)$**：❌ 错误。
- **D O($2^n$)**：✅ 正确。
  在没有记忆化（Memoization）的情况下，每一项 $F(n)$ 都会分裂成 $F(n-1)$ 和 $F(n-2)$ 两个调用。递归树的总结点数与斐波那契数本身正相关，近似为指数级增长 $\left(\frac{1+\sqrt{5}}{2}\right)^n$，常简化记为 $O(2^n)$。

**考点：** 递归算法的时间复杂度分析。`,
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
            explanation: `**答案：C (将 data.txt 中的每一行读取并输出到屏幕)**

**选项逐项分析：**
- **A 读取标准输入**：❌ 错误。代码中定义的是 \`ifstream in("data.txt")\`，它是文件输入流。
- **B getline 只能读取 cin**：❌ 错误。\`getline\` 可以接收任何 \`istream\`（包括文件流）。
- **C 将每一行输出到屏幕**：✅ 正确。代码循环读取文件中的每一行并使用 \`cout\` 输出。
- **D 创建 data.txt 并写入**：❌ 错误。\`ifstream\` 是只读流，不能写入内容。

**考点：** C++ 文件输入输出（Fstream）与 \`getline\` 的使用。`,
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
            explanation: `**答案：B (在程序发生运行时错误时，提供一种结构化的错误处理方式)**

**选项逐项分析：**
- **A 提高运行速度**：❌ 错误。异常处理通常会带来轻微的运行开销。
- **B 结构化的错误处理**：✅ 正确。通过 \`throw\`, \`try\`, \`catch\`，可以将错误产生的地方与错误处理的地方分离开，使程序更加健壮。
- **C 确保编译无误**：❌ 错误。异常是**运行时**机制。
- **D 减少内存占用**：❌ 错误。

**考点：** C++ 异常处理机制（Exception Handling）的目的与意义。`,
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
            explanation: `**答案：B (flag = false; flag = true;)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。
- **B flag = false; flag = true;**：✅ 正确。
  1. 每一轮外层循环开始前，令 \`flag = false\`（假设本轮没有交换，即数组已排序）。
  2. 进入内层循环，如果发现 \`nums[j] > nums[j+1]\` 且执行了交换，则令 \`flag = true\`（标记仍有乱序）。
  3. 如果内层循环结束 \`flag\` 仍为 \`false\`，说明整趟没有发生任何交换，数组已经完全有序，此时提前 \`break\`。

**考点：** 冒泡排序的性能优化（Flag 哨兵机制）。`,
            tags: ["客观题", "单选题", "冒泡排序", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: `C++ 语言中，函数声明 \`int add(int, int);\` 是合法的。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
在 C++ 函数原型声明中，参数名是可选的。只要明确指出了每个参数的类型（如 \`int, int\`），编译器就能识别函数签名并正确进行后续的链接工作。

**考点：** C++ 函数声明的语法规则。`,
            tags: ["客观题", "判断题", "函数声明", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `在 C++ 中，通过值传递方式将变量传入函数后，在函数内部修改该参数的值，不会影响函数外部原始变量的值。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
这是 C++ **按值传递**（Pass-by-value）的核心特性。在调用函数时，实参的值被复制到形参中。函数内部对形参的任何操作都仅限于该副本，原始变量所在的内存地址并未被访问或修改。

**考点：** 函数参数传递机制（值传递）。`,
            tags: ["客观题", "判断题", "参数传递", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `C++ 并不支持嵌套结构体，即在一个结构体内部定义另一个结构体是错误的。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
C++ 完全支持**结构体嵌套**。不仅可以在一个结构体中定义另一个结构体的变量（作为成员），甚至可以直接在内部定义一个新的结构体类型。这在处理如“学生信息中包含出生日期结构”等场景时非常常用。

**考点：** 结构体的复合与嵌套定义。`,
            tags: ["客观题", "判断题", "结构体", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `引用传递（Pass-by-reference）在函数调用时不会产生参数的副本，因此在处理大型对象时通常比值传递更高效。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  **按值传递**：需要将整个对象的所有数据成员复制一份到栈中，耗费时间和内存。
2.  **引用传递**：仅仅是为原变量起了一个“别名”，底层通常只传递原变量的地址（通常为 4 或 8 字节）。对于含有大量数据的结构体或类，引用传递能显著提升效率。

**考点：** 引用传递在性能优化中的优势。`,
            tags: ["客观题", "判断题", "引用传递", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: `在 C++ 中，定义二维数组时，必须明确地为数组的每一个元素都提供初始化值。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在 C++ 中，如果只为二维数组提供了部分初始值（例如 \`int a[2][2] = {1};\`），剩下的元素会按照默认规则自动初始化（如果是全局数组或静态数组初始化为 0；如果是局部数组且使用了大括号初始化，未指定的元素也会被设为 0）。并非必须显式地写出每一个元素的值。

**考点：** 数组的部分初始化规则。`,
            tags: ["客观题", "判断题", "二维数组", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `执行以下代码后，变量 \`res\` 的值将为 \`n\` 的阶乘。\n\`\`\`cpp\nint res = 1;\nfor (int i = 0; i < n; i++) {\n res *= i;\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
观察循环条件 \`for (int i = 0; i < n; i++)\`：
1.  当 \`i = 0\` 时，\`res *= 0\`，此时 \`res\` 变为 0。
2.  随后的所有迭代中，由于 \`res\` 已经是 0，\`res *= i\` 的结果始终为 0。
3.  要实现阶乘，循环应该从 \`i = 1\` 到 \`n\`（即 \`i = 1; i <= n; i++\`）。

**考点：** 逻辑缺陷分析与循环边界检查。`,
            tags: ["客观题", "判断题", "循环控制", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: `选择排序算法在任何情况下（无论输入数组是否已经有序）的比较次数都是相同的。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
选择排序的核心机制是：在每一轮中，扫描剩余未排序部分的所有元素以寻找极值（最小或最大）。
1.  第一轮扫描 $n-1$ 次比较。
2.  第二轮扫描 $n-2$ 次比较。
3.  以此类推，总比较次数始终固定为 $\frac{n(n-1)}{2}$，不随数组的初始状态（如是否已经有序）而改变。

**考点：** 选择排序（Selection Sort）的时间复杂度确定性。`,
            tags: ["客观题", "判断题", "选择排序", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: `以下代码实现了选择排序的逻辑（升序）。\n\`\`\`cpp\nfor (int i = 0; i < n-1; i++) {\n int minIdx = i;\n for (int j = i+1; j < n; j++)\n if (arr[j] < arr[minIdx]) minIdx = j;\n swap(arr[i], arr[minIdx]);\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  外层循环 \`i\` 遍历数组位置。
2.  内层循环 \`j\` 在未排序部分（\`i\` 之后）寻找更小的元素，并记录其下标 \`minIdx\`。
3.  内层结束后，将找到的最小值与当前位置 \`i\` 的元素交换。
这完全符合选择排序的升序实现逻辑。

**考点：** 选择排序算法的 C++ 经典实现。`,
            tags: ["客观题", "判断题", "选择排序", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `在 C++ 中，如果程序抛出了一个异常，但没有任何 \`catch\` 块与之匹配，程序将产生编译错误。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
异常是在**运行时**（Runtime）产生的。如果程序中抛出了异常但没有任何 \`catch\` 块匹配，程序会直接跳转到 \`std::terminate\`（通常导致崩溃或报错），但这与**编译错误**（语法错误）完全是两个阶段的事情。编译时编译器无法预测所有可能抛出的运行时异常。

**考点：** C++ 异常处理的运行时特性。`,
            tags: ["客观题", "判断题", "异常处理", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: `使用 \`ofstream outFile("output.txt"); outFile << "Hello";\` 这种方式可以将字符串 "Hello" 写入到 output.txt 文件中。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  \`ofstream outFile("output.txt");\` 创建一个关联到 \`output.txt\` 的输出文件流对象。
2.  \`outFile << "Hello";\` 使用流插入运算符，像使用 \`cout\` 一样将数据写入到该关联文件中。
这是 C++ 中文件输出的标准写法。

**考点：** C++ 文件流（Ofstream）的基础应用。`,
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
      explanation: `**解析：**
本题考察对二维数组（矩阵）的基本操作。
1.  **输入理解**：获取画布的行数 $h$ 和列数 $w$，以及保留区域的边界 $x_1, x_2, y_1, y_2$。
2.  **坐标转换**：题目给出的行和列编号通常是从 1 开始的。在 C++ 数组中，对应的索引应该是 \`x-1\`。
3.  **提取子矩阵**：
    - 遍历行索引 $i$ 从 $x_1-1$ 到 $x_2-1$。
    - 遍历列索引 $j$ 从 $y_1-1$ 到 $y_2-1$。
    - 按行输出这些字符。

**核心逻辑提示：**
\`\`\`cpp
for (int i = x1 - 1; i < x2; i++) {
    for (int j = y1 - 1; j < y2; j++) {
        cout << canvas[i][j];
    }
    cout << endl;
}
\`\`\``,
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
      explanation: `**解析：**
本题考察对排序算法交换次数的统计。
1.  **最少交换次数**：在只允许交换相邻元素的情况下，将一个序列调整为目标序列所需的最少交换次数等于该序列相对于目标序列的**逆序对**数量。
2.  **排序规则**：
    - 身高从高到低（降序）。
    - 身高相同时，体重从重到轻（降序）。
3.  **实现方式**：
    - 由于 $n$ 较小，可以直接使用**冒泡排序**进行模拟。
    - 在冒泡排序的过程中，每次发生交换就令计数器加 1。
    - 最终输出计数器的值。

**核心逻辑提示：**
\`\`\`cpp
struct Student { int h, w; };
bool cmp(Student a, Student b) {
    if (a.h != b.h) return a.h > b.h;
    return a.w > b.w;
}
// 冒泡排序统计交换次数
int ans = 0;
for (int i = 0; i < n; i++) {
    for (int j = 0; j < n - 1 - i; j++) {
        if (!cmp(sts[j], sts[j+1])) {
            swap(sts[j], sts[j+1]);
            ans++;
        }
    }
}
\`\`\``,
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      referenceCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Student {\n    int h, w;\n};\n\nbool compare(const Student& a, const Student& b) {\n    if (a.h != b.h) return a.h > b.h;\n    return a.w > b.w;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Student> sts(n);\n    for (int i = 0; i < n; ++i) cin >> sts[i].h >> sts[i].w;\n    \n    int swaps = 0;\n    for (int i = 0; i < n-1; ++i) {\n        for (int j = 0; j < n-1-i; ++j) {\n            if (compare(sts[j+1], sts[j])) {\n                swap(sts[j], sts[j+1]);\n                swaps++;\n            }\n        }\n    }\n    cout << swaps << endl;\n    return 0;\n}`,
      tags: ["编程题", "排序", "逆序对", "GESP4级"],
      answer: '',
    }
    ]
};

