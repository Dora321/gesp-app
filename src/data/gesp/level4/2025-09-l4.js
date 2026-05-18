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
            question: `运行下面程序后变量 \`a\` 的值是（ ）。\n\`\`\`cpp\nint a = 42;\nint* p = &a;\n*p = *p+1;\n\`\`\``,
            options: ["42", "43", "编译错误", "不确定"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (43)**

**选项逐项分析：**
- **A 42**：❌ 错误。忽略了修改操作。
- **B 43**：✅ 正确。
  1. \`int a = 42;\` 初始化变量 \`a\`。
  2. \`int* p = &a;\` 定义指针 \`p\` 指向 \`a\` 的地址。
  3. \`*p = *p+1;\` 通过解引用 \`*p\` 访问 \`a\` 的值 (42)，加 1 后赋值回 \`*p\`，等同于 \`a = a + 1\`。
  4. 因此 \`a\` 的值变为 43。
- **C 编译错误**：❌ 错误。语法完全符合 C++ 标准。
- **D 不确定**：❌ 错误。逻辑是确定的。

**考点：** C++ 指针的定义、取地址 \`&\` 与解引用 \`*\` 操作。`,
            tags: ["客观题", "单选题", "指针", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: `以下关于数组的描述中，（ ）是错误的。`,
            options: [
                "数组名是一个指针常量",
                "随机访问数组的元素方便快捷",
                "数组可以像指针一样进行自增操作",
                "sizeof(arr) 返回的是整个数组 arr 占用的字节数"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (数组可以像指针一样进行自增操作)**

**选项逐项分析：**
- **A 数组名是一个指针常量**：✅ 正确。在大多数表达式中，数组名退化为指向首元素的指针，但它本身是一个不可更改的地址值（常地址）。
- **B 随机访问方便快捷**：✅ 正确。数组支持 $O(1)$ 时间复杂度的下标访问。
- **C 数组可以像指针一样进行自增操作**：❌ 错误。由于数组名是“指针常量”（或更准确地说是非左值地址），不能对其执行 \`arr++\` 或 \`arr += 1\` 等自增/修改操作。
- **D sizeof(arr) 返回整个数组占用的字节数**：✅ 正确。这是 \`sizeof\` 操作符作用于数组名时的特性。

**考点：** 数组名与指针的区别、数组的特性。`,
            tags: ["客观题", "单选题", "数组", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: `给定如下定义的数组 \`arr\`，则 \`*(*(arr+1)+2)\` 的值是（ ）。\n\`\`\`cpp\nint arr[2][3] = {{1, 2, 3}, {4, 5, 6}};\n\`\`\``,
            options: ["2", "5", "4", "6"],
            answer: 3,
            score: 2,
            explanation: `**答案：D (6)**

**选项逐项分析：**
- **A 2 / B 5 / C 4**：❌ 错误。
- **D 6**：✅ 正确。
  1. \`arr\` 是二维数组名。\`arr+1\` 指向第二行（整个行数组）的地址。
  2. \`*(arr+1)\` 退化为指向第二行首元素 \`arr[1][0]\` 的指针。
  3. \`*(arr+1)+2\` 指向第二行第三个元素 \`arr[1][2]\` 的地址。
  4. 最后一次解引用 \`*(*(arr+1)+2)\` 取出该位置的值，即 6。

**考点：** 二维数组与指针算术运算的深度理解。`,
            tags: ["客观题", "单选题", "二维数组", "指针", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: `下面这段代码会输出（ ）。\n\`\`\`cpp\nint add(int a, int b = 1); // 函数声明\nint main() {\n cout << add(2) << " " << add(2, 3);\n return 0;\n}\nint add(int a, int b) { // 函数定义\n return a+b;\n}\n\`\`\``,
            options: ["3 5", "编译失败：定义处少了默认参数", "运行错误", "链接失败：未定义引用"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (3 5)**

**选项逐项分析：**
- **A 3 5**：✅ 正确。
  1. 函数声明中指定了 \`b\` 的默认值为 1。
  2. \`add(2)\` 调用：实参只有 2，赋值给 \`a\`，\`b\` 使用默认值 1。返回 $2+1=3$。
  3. \`add(2, 3)\` 调用：实参为 2 和 3，分别赋值给 \`a\` 和 \`b\`。返回 $2+3=5$。
- **B / C / D**：❌ 错误。

**考点：** C++ 函数的默认参数（Default Arguments）语法。`,
            tags: ["客观题", "单选题", "函数", "默认参数", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: `下面这段代码会输出（ ）。\n\`\`\`cpp\nint x = 5;\nvoid foo() {\n int x = 10;\n cout << x << " ";\n}\nvoid bar() {\n cout << x << " ";\n}\nint main() {\n foo();\n bar();\n}\n\`\`\``,
            options: ["5 5", "10 10", "5 10", "10 5"],
            answer: 3,
            score: 2,
            explanation: `**答案：D (10 5)**

**选项逐项分析：**
- **A 5 5 / B 10 10 / C 5 10**：❌ 错误。
- **D 10 5**：✅ 正确。
  1. \`foo()\` 执行：内部定义了局部变量 \`x = 10\`，它会**遮蔽**全局变量 \`x\`。输出 10。
  2. \`bar()\` 执行：内部没有定义 \`x\`，因此访问的是全局变量 \`x = 5\`。输出 5。

**考点：** 局部变量与全局变量的作用域规则（Shadowing）。`,
            tags: ["客观题", "单选题", "作用域", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: `下面程序运行的结果是（ ）。\n\`\`\`cpp\nvoid increaseA(int x) { x++; }\nvoid increaseB(int* p) { (*p)++; }\nint main() {\n int a = 5;\n increaseA(a);\n cout << a << " ";\n increaseB(&a);\n cout << a;\n}\n\`\`\``,
            options: ["6 7", "6 6", "5 6", "5 5"],
            answer: 2,
            score: 2,
            explanation: `**答案：C (5 6)**

**选项逐项分析：**
- **A 6 7 / B 6 6 / D 5 5**：❌ 错误。
- **C 5 6**：✅ 正确。
  1. \`increaseA(a)\`：**值传递**。函数内部修改的是副本 \`x\`，原变量 \`a\` 保持 5 不变。
  2. \`increaseB(&a)\`：**指针传递**（地址传递）。函数通过指针 \`p\` 直接修改了 \`a\` 内存单元的值，\`a\` 变为 6。
  3. 综合输出结果为 5 6。

**考点：** C++ 函数参数传递方式（值传递 vs 指针传递）的区别。`,
            tags: ["客观题", "单选题", "参数传递", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: `关于结构体初始化，以下哪个选项中正确的是（ ）。\n\`\`\`cpp\nstruct Point { int x, y; };\n\`\`\``,
            options: ["Point p = (1, 2);", "Point p = {1, 2};", "Point p = new {1, 2};", "Point p = <1, 2>;"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (Point p = {1, 2};)**

**选项逐项分析：**
- **A Point p = (1, 2);**：❌ 错误。圆括号通常用于构造函数调用。
- **B Point p = {1, 2};**：✅ 正确。这是 C++ 中聚合类型（结构体）的标准**列表初始化**语法。
- **C Point p = new {1, 2};**：❌ 错误。\`new\` 关键字后必须接类型名且返回指针。
- **D Point p = <1, 2>;**：❌ 错误。

**考点：** C++ 结构体（聚合类型）的初始化语法。`,
            tags: ["客观题", "单选题", "结构体", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: `运行如下代码会输出（ ）。\n\`\`\`cpp\nstruct Cat {\n string name;\n int age;\n};\nvoid birthday(Cat& c) {\n c.age++;\n}\nint main() {\n Cat kitty = {"Mimi", 2};\n birthday(kitty);\n cout << kitty.name << " " << kitty.age;\n}\n\`\`\``,
            options: ["Mimi 2", "Mimi 3", "kitty 3", "kitty 2"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (Mimi 3)**

**选项逐项分析：**
- **A Mimi 2**：❌ 错误。忽视了引用传递对原对象的影响。
- **B Mimi 3**：✅ 正确。
  1. \`birthday(Cat& c)\`：使用**引用传递**。
  2. 函数内的 \`c.age++\` 直接作用于传入的实参 \`kitty\`。
  3. 因此 \`kitty.age\` 从 2 变为 3，\`name\` 保持 "Mimi"。
- **C / D**：❌ 错误。变量名与属性值混淆。

**考点：** 结构体作为函数参数的引用传递特性。`,
            tags: ["客观题", "单选题", "结构体", "引用传递", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: `关于排序算法的稳定性，以下说法错误的是（ ）。`,
            options: [
                "稳定的排序算法不改变相等元素的相对位置",
                "冒泡排序是稳定的排序算法",
                "选择排序是稳定的排序算法",
                "插入排序是稳定的排序算法"
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (选择排序是稳定的排序算法)**

**选项逐项分析：**
- **A 稳定的排序算法不改变相等元素的相对位置**：✅ 正确。这是稳定性的定义。
- **B 冒泡排序是稳定的**：✅ 正确。相邻交换时若相等则不换，保证了稳定性。
- **C 选择排序是稳定的**：❌ 错误。选择排序在交换极值元素时，可能会跨过相同元素，从而改变它们的相对顺序。例如：\`{5, 8, 5, 2, 9}\`，第一轮将 2 与第一个 5 交换，导致两个 5 的相对位置发生变化。
- **D 插入排序是稳定的**：✅ 正确。

**考点：** 常用排序算法（冒泡、选择、插入）的稳定性分析。`,
            tags: ["客观题", "单选题", "排序算法", "稳定性", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: `下面代码试图实现选择排序，使其能对数组 \`nums\` 排序为升序，则横线上应分别填写（ ）。\n\`\`\`cpp\nvoid selectionSort(vector<int>& nums) {\n int n = nums.size();\n for (int i = 0; i < n-1; ++i) {\n int minIndex = i;\n for (int j = i+1; j < n; ++j) {\n if ( __________ ) { // 在此处填入代码\n minIndex = j;\n }\n }\n ____________________; // 在此处填入代码\n }\n}\n\`\`\``,
            options: [
                "nums[j] < nums[minIndex] 和 swap(nums[i], nums[minIndex])",
                "nums[j] > nums[minIndex] 和 swap(nums[i], nums[minIndex])",
                "nums[j] <= nums[minIndex] 和 swap(nums[j], nums[minIndex])",
                "nums[j] <= nums[minIndex] 和 swap(nums[i], nums[j])"
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (nums[j] < nums[minIndex] 和 swap(nums[i], nums[minIndex]))**

**选项逐项分析：**
- **A 正确逻辑**：✅ 正确。
  1. \`if (nums[j] < nums[minIndex])\`：在未排序区间寻找最小值的索引。
  2. \`swap(nums[i], nums[minIndex])\`：外层循环结束一轮寻找后，将找到的最小值与当前待填入位置 \`i\` 交换。
- **B / C / D**：❌ 错误。

**考点：** 选择排序（Selection Sort）的算法过程与代码实现。`,
            tags: ["客观题", "单选题", "选择排序", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: `下面程序实现插入排序（升序排序），则横线上应分别填写（ ）。\n\`\`\`cpp\nvoid insertionSort(int arr[], int n) {\n for (int i = 1; i < n; i++) {\n int key = arr[i];\n int j = i-1;\n while ( j >= 0 && ____________________ ) { // 在此处填入代码\n arr[j+1] = arr[j];\n j--;\n }\n ____________________; // 在此处填入代码\n }\n}\n\`\`\``,
            options: [
                "arr[j] > key 和 arr[j+1] = key",
                "arr[j] < key 和 arr[j+1] = key",
                "arr[j] > key 和 arr[j] = key",
                "arr[j] < key 和 arr[j] = key"
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (arr[j] > key 和 arr[j+1] = key)**

**选项逐项分析：**
- **A 正确逻辑**：✅ 正确。
  1. \`while (j >= 0 && arr[j] > key)\`：当已排序部分的元素大于当前待插入元素 \`key\` 时，将其向后移动。
  2. \`arr[j+1] = key\`：循环结束后，\`j+1\` 即为 \`key\` 应当插入的位置。
- **B / C / D**：❌ 错误。

**考点：** 插入排序（Insertion Sort）的算法过程与代码实现。`,
            tags: ["客观题", "单选题", "插入排序", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: `关于插入排序的时间复杂度，下列说法正确的是（ ）。`,
            options: [
                "最好情况和最坏情况的时间复杂度都是 $O(N^2)$",
                "最好情况是 $O(N)$，最坏情况是 $O(N^2)$",
                "最好情况是 $O(N^2)$，最坏情况是 $O(N)$",
                "最好情况是 $O(1)$，最坏情况是 $O(N)$"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (最好情况是 $O(N)$，最坏情况是 $O(N^2)$)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。
- **B 正确分析**：✅ 正确。
  1. **最好情况**：输入数组已经有序。此时内层 \`while\` 循环条件始终不成立，只需外层遍历一遍，复杂度为 $O(N)$。
  2. **最坏情况**：输入数组完全逆序。此时每个元素都需要移动到最前面，比较和移动次数达到最大，复杂度为 $O(N^2)$。

**考点：** 插入排序的时间复杂度分析。`,
            tags: ["客观题", "单选题", "插入排序", "时间复杂度", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: `小杨正在爬楼梯，需要 $n$ 阶才能到达楼顶，每次可以爬 1 阶或 2 阶，求小杨有多少种不同的方法可以爬到楼顶。横线上应填写（ ）。\n\`\`\`cpp\nint climbStairs(int n) {\n if (n <= 2) return n;\n int prev2 = 1;\n int prev1 = 2;\n int current = 0;\n for (int i = 3; i <= n; ++i) {\n ________________ // 在此处填入代码\n }\n return current;\n}\n\`\`\``,
            options: [
                "prev2 = prev1; prev1 = current; current = prev1+prev2;",
                "current = prev1+prev2; prev2 = prev1; prev1 = current;",
                "current = prev1+prev2; prev1 = current; prev2 = prev1;",
                "prev1 = current; prev2 = prev1; current = prev1+prev2;"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (current = prev1+prev2; prev2 = prev1; prev1 = current;)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。逻辑顺序有误。
- **B 正确逻辑**：✅ 正确。
  1. \`current = prev1 + prev2\`：计算当前台阶的方法数（前一阶 + 前两阶）。
  2. \`prev2 = prev1\`：将“前一阶”变为下一轮的“前两阶”。
  3. \`prev1 = current\`：将“当前阶”变为下一轮的“前一阶”。

**考点：** 递推算法解决爬楼梯问题（斐波那契数列应用）。`,
            tags: ["客观题", "单选题", "递归递推", "斐波那契", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: `找出所有满足 \`scores[i]+scores[j]+scores[k] == 300\` 的三元组（$i < j < k$）。下面代码的时间复杂度是（ ）。\n\`\`\`cpp\nint cnt = 0;\nfor (int i = 0; i < n; i++) {\n for (int j = i+1; j < n; j++) {\n for (int k = j+1; k < n; k++) {\n if (scores[i]+scores[j]+scores[k] == 300) {\n cnt++;\n }\n }\n }\n}\n\`\`\``,
            options: ["$O(N)$", "$O(n log n)$", "$O(n^3)$", "$O(3^n)$"],
            answer: 2,
            score: 2,
            explanation: `**答案：C ($O(n^3)$)**

**选项逐项分析：**
- **A $O(N)$ / B $O(n log n)$ / D $O(3^n)$**：❌ 错误。
- **C $O(n^3)$**：✅ 正确。
  代码中存在三层嵌套的 \`for\` 循环：
  1. 外层循环运行 $n$ 次。
  2. 中层循环运行约 $n/2$ 次（平均）。
  3. 内层循环运行约 $n/3$ 次（平均）。
  总的基本操作次数正比于 $n \times n \times n = n^3$。

**考点：** 嵌套循环的时间复杂度分析。`,
            tags: ["客观题", "单选题", "复杂度分析", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: `关于异常处理，以下说法错误的是（ ）。`,
            options: [
                "try 块中的代码可能会抛出异常",
                "catch 块可以有多个，处理不同类型的异常",
                "throw 语句用于抛出异常",
                "所有异常都必须被捕获，否则程序会崩溃"
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (所有异常都必须被捕获，否则程序会崩溃)**

**选项逐项分析：**
- **A try 块可能抛出异常**：✅ 正确。
- **B catch 块可以有多个**：✅ 正确。可以按类型捕获不同的异常。
- **C throw 语句用于抛出**：✅ 正确。
- **D 必须被捕获**：❌ 错误。C++ 语法并不强制要求捕获所有异常。如果异常未被捕获，它会逐层向上抛出，直到 \`main\` 函数。如果最终仍未处理，系统会调用 \`std::terminate()\`。

**考点：** C++ 异常处理（Exception Handling）的语法与逻辑。`,
            tags: ["客观题", "单选题", "异常处理", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: `执行以下代码后，变量 \`a\` 的值将变为 20。\n\`\`\`cpp\nint a = 5;\nint* p = &a;\n*p = 20;\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  \`int* p = &a;\` 使指针 \`p\` 指向变量 \`a\`。
2.  \`*p = 20;\` 通过解引用运算符 \`*\` 访问 \`p\` 所指向的内存单元（即 \`a\` 所在的内存），并将其内容修改为 20。
因此，变量 \`a\` 的值变为 20。

**考点：** C++ 指针的指向与解引用赋值。`,
            tags: ["客观题", "判断题", "指针", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `执行下面 C++ 代码将输出 11（假设全局变量 \`x\` 为 10）。\n\`\`\`cpp\nint x = 10;\nvoid f() {\n int x = x+1;\n cout << x << endl;\n}\nint main() {\n f();\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在函数 \`f()\` 内部执行 \`int x = x + 1;\` 时：
1.  左边的 \`x\` 是正在定义的局部变量。
2.  根据 C++ 作用域规则，局部变量在定义处即开始遮蔽同名的全局变量。
3.  等号右边的 \`x\` 此时指的是这个**尚未初始化完成**的局部变量，而不是全局变量 10。
4.  这是一个未定义行为（UB），输出结果不确定，通常不会是 11。

**考点：** 变量作用域（Scope）与名字遮蔽（Shadowing）。`,
            tags: ["客观题", "判断题", "作用域", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `以下 C++ 代码合法。\n\`\`\`cpp\nstruct Student { string name; int age; float score; };\nStudent* students = new Student[20];\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  \`struct Student { ... };\` 定义了一个结构体类型。
2.  \`new Student[20]\` 在堆区动态分配了能存放 20 个 \`Student\` 对象的连续空间。
3.  该表达式返回指向该空间首地址的指针 \`Student*\`。
语法完全正确。

**考点：** C++ 动态内存分配与结构体数组。`,
            tags: ["客观题", "判断题", "结构体", "指针", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `执行下面 C++ 代码将输出 10。\n\`\`\`cpp\nvoid func(int* p) {\n *p = 10;\n}\nint main() {\n int a = 5;\n func(&a);\n cout << a << endl;\n return 0;\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
函数 \`func(int* p)\` 接收的是变量 \`a\` 的地址。在函数内部，\`*p = 10\` 通过该地址直接修改了 \`main\` 函数中 \`a\` 变量所占用的内存。因此 \`a\` 的值从 5 变为 10。

**考点：** 函数参数的指针传递（按址传递）。`,
            tags: ["客观题", "判断题", "指针", "参数传递", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: `下面代码将二维数组 \`arr\` 传递给函数 \`f\`，函数内部用 \`arr[i][j]\` 访问元素，函数参数声明为 \`int arr[][4]\` 是错误的。\n\`\`\`cpp\nvoid f(int arr[][4], int rows) { /* 访问 arr[i][j] */ }\nint main() {\n int arr[3][4] = { /* 初始化 */ };\n f(arr, 3);\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在 C++ 中，当二维数组作为函数参数传递时，**第一维（行数）可以省略，但第二维（列数）必须明确指定**。因此，声明为 \`int arr[][4]\` 是完全正确且必须的（因为编译器需要知道每行有多少个元素来计算偏移量）。

**考点：** 二维数组作为函数参数的语法规则。`,
            tags: ["客观题", "判断题", "二维数组", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `递推是在给定初始条件下，已知前一项（或前几项）求后一项的过程。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
递推（Recurrence）是数学和计算机科学中的一种基本方法。它通过建立当前项与前几项之间的数学关系（递推公式），并结合初始条件（边界值），来逐步求出序列中任意项的值。

**考点：** 递推算法的核心定义与基本要素。`,
            tags: ["客观题", "判断题", "递推", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: `虽然插入排序的时间复杂度为 $O(N^2)$，但由于单元操作相对较少，因此在小数据量的排序任务中非常受欢迎。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
插入排序虽然在最坏情况下的时间复杂度是 $O(N^2)$，但它的**常数因子非常小**。对于小规模数据（通常 $N < 50$），它的实际执行效率往往高于快速排序或归并排序等更复杂的算法。此外，在处理几乎有序的序列时，它的性能接近 $O(N)$。

**考点：** 插入排序的实际性能优势与应用场景。`,
            tags: ["客观题", "判断题", "插入排序", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: `对整数数组 \`{4, 1, 3, 1, 5, 2}\` 进行冒泡排序（将最大元素放到最后），执行一轮之后是 \`{4, 1, 3, 1, 2, 5}\`。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1.  初始：\`{4, 1, 3, 1, 5, 2}\`。
2.  第一轮冒泡（寻找最大值 5 并交换到末尾）：
    - (4, 1) -> 交换 -> \`{1, 4, 3, 1, 5, 2}\`
    - (4, 3) -> 交换 -> \`{1, 3, 4, 1, 5, 2}\`
    - (4, 1) -> 交换 -> \`{1, 3, 1, 4, 5, 2}\`
    - (4, 5) -> 不换 -> \`{1, 3, 1, 4, 5, 2}\`
    - (5, 2) -> 交换 -> \`{1, 3, 1, 4, 2, 5}\`
3.  因此，一轮之后的结果应为 \`{1, 3, 1, 4, 2, 5}\`。

**考点：** 冒泡排序（Bubble Sort）的过程模拟。`,
            tags: ["客观题", "判断题", "冒泡排序", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `以下代码只能捕获 \`int\` 类型异常。\n\`\`\`cpp\ntry { /* codes */ }\ncatch (...) { /* codes */ }\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
题干说“只能捕获 \`int\` 类型异常”，这个说法不对。\`catch (...)\` 语法被称为**全捕获（Catch-All）处理程序**，可以捕获 \`try\` 块中抛出的任意类型异常，例如整型、类对象或指针异常。

**考点：** C++ 异常处理机制中的全捕获语法。`,
            tags: ["客观题", "判断题", "异常处理", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: `选择排序算法在任何情况下（无论输入数组是否已经有序）的平均时间复杂度都是 $O(N^2)$。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
选择排序的工作原理是：无论输入数据的初始分布如何，它都会执行固定次数的双重嵌套循环。
1.  内层循环始终会扫描完剩余的所有元素以找到极值。
2.  比较次数始终是 $\frac{n(n-1)}{2}$ 次。
因此，它的平均、最好和最坏时间复杂度统一为 $O(N^2)$。

**考点：** 选择排序（Selection Sort）时间复杂度的稳定性特性。`,
            tags: ["客观题", "判断题", "选择排序", "复杂度", "GESP4级"]
        },
        {
      id: 26,
      type: 'programming',
      samples: [
        { input: `4 3
0 1 1
1 0 1
0 1 1
1 1 1`, output: `4` },
        { input: `3 5
1 0 1 0 1
0 1 0 1 0
0 1 1 1 0`, output: `3` }
      ],
      question: `
# [GESP202509 四级] 排兵布阵

## 题目描述

作为将军，你自然需要合理地排兵布阵。地图可以视为 $n$ 行 $m$ 列的网格，适合排兵的网格以 1 标注，不适合排兵的网格以 0 标注。现在你需要在地图上选择一个矩形区域排兵，这个矩形区域内不能包含不适合排兵的网格。请问可选择的矩形区域最多能包含多少网格？

## 输入格式

第一行，两个正整数 $n, m$，分别表示地图网格的行数与列数。

接下来 $n$ 行，每行 $m$ 个整数 $a_{i,1}, a_{i,2}, \\ldots, a_{i,m}$，表示各行中的网格是否适合排兵。

## 输出格式

一行，一个整数，表示适合排兵的矩形区域包含的最大网格数。
`,
      score: 25,
      explanation: `**解析：**
本题考察对二维网格中最大子矩形的求解。
1.  **问题转化**：在一个由 0 和 1 组成的矩阵中，寻找一个面积最大的全 1 矩形。
2.  **基本思路**：
    - 枚举矩阵的底行 $i$。
    - 对于每一列 $j$，计算从行 $i$ 向上延伸的连续 1 的高度 $H[j]$。
    - 这样问题就转化为了：给定一个高度数组（直方图），求其最大矩形面积。
3.  **优化算法**：
    - 利用**单调栈**可以在 $O(m)$ 时间内处理一行直方图的最大矩形。
    - 遍历所有 $n$ 行，总时间复杂度为 $O(n \times m)$，足以通过 $n, m \leq 500$ 的数据规模。

**核心逻辑提示：**
\`\`\`cpp
// 维护高度数组
for (int j = 0; j < m; j++) {
    if (grid[i][j] == 1) heights[j]++;
    else heights[j] = 0;
}
// 使用单调栈计算 heights 中的最大矩形面积
\`\`\``,
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      referenceCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\n#include <stack>\nusing namespace std;\n\nint largestRectangleArea(vector<int>& heights) {\n    heights.push_back(0);\n    stack<int> s;\n    int maxArea = 0;\n    for (int i = 0; i < heights.size(); i++) {\n        while (!s.empty() && heights[s.top()] >= heights[i]) {\n            int h = heights[s.top()];\n            s.pop();\n            int w = s.empty() ? i : i-s.top()-1;\n            maxArea = max(maxArea, h * w);\n        }\n        s.push(i);\n    }\n    return maxArea;\n}\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> grid(n, vector<int>(m));\n    vector<int> heights(m, 0);\n    int maxArea = 0;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < m; j++) {\n            int val; cin >> val;\n            if (val == 1) heights[j]++;\n            else heights[j] = 0;\n        }\n        maxArea = max(maxArea, largestRectangleArea(heights));\n    }\n    cout << maxArea << endl;\n    return 0;\n}`,
      tags: ["编程题", "矩阵", "单调栈", "最大子矩阵", "GESP4级"],
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [
        { input: `4
1 0 2 4`, output: `3` },
        { input: `9
9 9 8 2 4 4 3 5 3`, output: `4` }
      ],
      question: `
# [GESP202509 四级] 最长连续段

## 题目描述

对于 $k$ 个整数构成的数组 $[b_1, b_2, \\ldots, b_k]$，如果对 $1 \\leq i < k$ 都有 $b_{i+1} = b_i + 1$，那么称数组 $b$ 是一个连续段。

给定由 $n$ 个整数构成的数组 $[a_1, a_2, \\ldots, a_n]$，你可以任意重排数组 $a$ 中元素顺序。请问在重排顺序之后，$a$ 所有是连续段的子数组中，最长的子数组长度是多少？

例如，对于数组 $[1, 0, 2, 4]$，可以将其重排为 $[4, 0, 1, 2]$，有以下 $10$ 个子数组：

$[4], [0], [1], [2], [4, 0], [0, 1], [1, 2], [4, 0, 1], [0, 1, 2], [4, 0, 1, 2]$

其中除 $[4, 0], [4, 0, 1], [4, 0, 1, 2]$ 以外的子数组均是连续段，因此是连续段的子数组中，最长子数组长度为 3。

## 输入格式

第一行，一个正整数 $n$，表示数组长度。

第二行，$n$ 个整数 $a_1, a_2, \\ldots, a_n$，表示数组中的整数。

## 输出格式

一行，一个整数，表示数组 $a$ 重排顺序后，所有是连续段的子数组的最长长度。
`,
      score: 25,
      explanation: `**解析：**
本题考察对“连续段”定义的理解以及重排后的最优化处理。
1.  **连续段特性**：如果一个数组重排后能构成连续段，说明原数组中的元素在排序去重后，数值上必须是连续的（公差为 1）。
2.  **贪心策略**：
    - 题目允许任意重排，这意味着我们只需要在原数组中找到尽可能多的不同元素，且这些元素能够组成一个连续的整数序列。
3.  **算法步骤**：
    - 将原数组进行**排序**并**去重**。
    - 遍历去重后的有序数组，统计最长的相邻差值为 1 的区间长度。
    - 该长度即为重排后能构成的最长连续段子数组的长度。

**核心逻辑提示：**
\`\`\`cpp
sort(a.begin(), a.end());
a.erase(unique(a.begin(), a.end()), a.end()); // 去重
int maxLen = 1, cur = 1;
for (int i = 1; i < a.size(); i++) {
    if (a[i] == a[i-1] + 1) cur++;
    else cur = 1;
    maxLen = max(maxLen, cur);
}
\`\`\``,
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      referenceCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    if (!(cin >> n)) return 0;\n    if (n == 0) {\n        cout << 0 << endl;\n        return 0;\n    }\n    vector<long long> a(n);\n    for (int i = 0; i < n; i++) cin >> a[i];\n    sort(a.begin(), a.end());\n    a.erase(unique(a.begin(), a.end()), a.end());\n    \n    int maxLen = 1, currentLen = 1;\n    for (size_t i = 1; i < a.size(); i++) {\n        if (a[i] == a[i-1]+1) {\n            currentLen++;\n        } else {\n            maxLen = max(maxLen, currentLen);\n            currentLen = 1;\n        }\n    }\n    cout << max(maxLen, currentLen) << endl;\n    return 0;\n}`,
      tags: ["编程题", "贪心", "排序", "GESP4级"],
      answer: '',
    }
    ]
};
