// 2025年3月 GESP C++ 四级真题
export const paperData = {
    id: '2025-03-l4',
    title: '2025年3月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: `关于下述代码，说法错误的是（ ）。\n\`\`\`cpp\nint multiply(int x, int y);\nint main() {\n int a = 4;\n int b = 5;\n int result = multiply(a, b);\n std::cout << "The result is: " << result << std::endl;\n return 0;\n}\nint multiply(int x, int y) {\n return x * y;\n}\n\`\`\``,
            options: [
                "函数multiply的定义应该放到函数main之前。",
                "函数声明int multiply(int x, int y);中明确指定了函数multiply()的返回值为整数类型。",
                "在main函数中，函数multiply通过multiply(a, b)被调用，其中a和b是定义在main函数中的变量，它们作为实参传递给了multiply函数的形参x and y。",
                "运⾏上述代码，将输出The result is: 20。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (函数multiply的定义应该放到函数main之前。)**

**选项逐项分析：**
- **A 函数multiply的定义应该放到函数main之前**：❌ 错误。在 C++ 中，只要在调用函数之前提供了该函数的**前向声明**（Prototype Declaration），函数的具体定义可以放在程序的任何位置（包括 \`main\` 函数之后）。
- **B 明确指定了返回值为整数类型**：✅ 正确。声明 \`int multiply(...)\` 中 \`int\` 即代表返回类型。
- **C a和b作为实参传递给了形参x and y**：✅ 正确。这是标准的按值传递（Pass by Value）过程。
- **D 将输出The result is: 20**：✅ 正确。\`4 * 5 = 20\`。

**考点：** C++ 函数的声明与定义分离、参数传递与基本语法。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: `执⾏下述代码将输出（ ）。\n\`\`\`cpp\nint x = 10;\nvoid func() {\n int x = 20;\n std::cout << x;\n}\nint main() {\n func();\n std::cout << x;\n return 0;\n}\n\`\`\``,
            options: [
                "2020",
                "2010",
                "1010",
                "编译错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (2010)**

**选项逐项分析：**
- **A 2020 / C 1010 / D 编译错误**：❌ 错误。
- **B 2010**：✅ 正确。
  1. \`func()\` 内部定义了一个局部变量 \`int x = 20;\`。
  2. 根据作用域规则，局部变量会屏蔽同名的全局变量。因此 \`func()\` 内的 \`cout << x;\` 输出 20。
  3. 执行完 \`func()\` 后回到 \`main\`，此时 \`main\` 内部没有局部变量 \`x\`。
  4. \`main\` 内的 \`cout << x;\` 访问的是全局变量 \`x = 10;\`。
  5. 综合输出为 2010。

**考点：** 变量的作用域（全局变量 vs 局部变量）与遮蔽效应。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: `执⾏下述代码后，变量a的值为（ ）。\n\`\`\`cpp\nint a = 10;\nint* p = &a;\n*p = 20;\n\`\`\``,
            options: [
                "10",
                "20",
                "随机值",
                "编译错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (20)**

**选项逐项分析：**
- **A 10**：❌ 错误。
- **B 20**：✅ 正确。
  1. \`int* p = &a;\`：指针 \`p\` 指向变量 \`a\` 的内存地址。
  2. \`*p = 20;\`：通过解引用操作符 \`*\` 直接修改 \`p\` 指向的内存单元（即变量 \`a\`）的值。
  3. 因此变量 \`a\` 的值变为 20。
- **C 随机值 / D 编译错误**：❌ 错误。

**考点：** 指针的基础应用：通过指针修改变量的值（解引用赋值）。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: `以下哪种参数传递方式可以避免拷贝大型对象？`,
            options: [
                "只能用值传递",
                "只能用引用传递",
                "只能用指针传递",
                "引用传递和指针传递均可",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (引用传递和指针传递均可)**

**选项逐项分析：**
- **A 只能用值传递**：❌ 错误。值传递会创建实参的完整副本，对于大型对象会造成显著的内存和时间开销。
- **B / C 只能...**：❌ 错误。过于绝对。
- **D 引用传递和指针传递均可**：✅ 正确。引用传递和指针传递在底层都只传递地址（通常为 4 或 8 字节），避免了对整个对象的复制。

**考点：** C++ 函数参数传递机制与性能优化。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: `执⾏下述代码，将输出（ ）。\n\`\`\`cpp\nvoid swap(int a, int &b) {\n int temp = a;\n a = b;\n b = temp;\n}\nint main() {\n int x = 1, y = 2;\n swap(x, y);\n std::cout << x << y;\n return 0;\n}\n\`\`\``,
            options: [
                "12",
                "21",
                "22",
                "11",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (11)**

**选项逐项分析：**
- **A 12 / B 21 / C 22**：❌ 错误。
- **D 11**：✅ 正确。
  1. \`swap(int a, int &b)\` 中：\`a\` 是**值传递**，\`b\` 是**引用传递**。
  2. 进入函数，\`a\` 得到 \`x\` 的副本（1），\`b\` 成为 \`y\` 的别名。
  3. \`temp = a (1)\`, \`a = b (2)\`, \`b = temp (1)\`。
  4. 结果：形参 \`a\` 变为 2（不影响实参 \`x\`），实参 \`y\` 变为 1。
  5. 最终 \`x = 1\`, \`y = 1\`。

**考点：** C++ 值传递与引用传递的区别。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: `下面的描述中，（ ）正确定义一个名为Person的结构体并正确初始化了一个Person结构体的变量p。`,
            options: [
                "struct Person { string name; int age; }; Person p(\"Yang\", 10);",
                "struct Person { string name, int age; }; Person p; p.name = \"Yang\"; p.age = 10;",
                "struct Person { string name; int age; }; Person p = { \"Yang\", 10 };",
                "struct Person { string name; int age; }; Person p = new Person(\"Yang\", 10);",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (struct Person { string name; int age; }; Person p = { "Yang", 10 };)**

**选项逐项分析：**
- **A Person p("Yang", 10)**：❌ 错误。结构体若没有定义带参构造函数，不能使用圆括号进行此类初始化。
- **B string name, int age;**：❌ 错误。结构体成员定义应以分号 \`;\` 分隔，如 \`string name; int age;\`。
- **C Person p = { "Yang", 10 };**：✅ 正确。这是 C++ 中对聚合类型（Aggregate Type）进行初始化的标准列表初始化语法。
- **D new Person(...)**：❌ 错误。\`new\` 关键字返回的是指针，应赋值给 \`Person*\` 类型变量。

**考点：** C++ 结构体的定义与列表初始化。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: `给定如下代码， 下面描述错误的是（ ）。\n\`\`\`cpp\nstruct Person {\n std::string name;\n int age;\n struct Address {\n std::string street;\n std::string city;\n };\n Address address;\n};\n\`\`\``,
            options: [
                "结构Person内嵌套结构Address",
                "Person 有一个Address 类型的 address 成员",
                "一个Person类型的变量p的address的初始化可以写成：p.address.street = \"123 Main St\"; p.address.city = \"Anytown\";",
                "结构的嵌套可以减少命名冲突，因此可以不必控制嵌套层次",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (结构的嵌套可以减少命名冲突，因此可以不必控制嵌套层次)**

**选项逐项分析：**
- **A 结构Person内嵌套结构Address**：✅ 正确。代码中 \`Address\` 定义在 \`Person\` 内部。
- **B Person 有一个Address 类型的 address 成员**：✅ 正确。
- **C p.address.street = ...**：✅ 正确。访问嵌套结构成员需要逐层使用点运算符 \`.\`。
- **D 不必控制嵌套层次**：❌ 错误。虽然嵌套可以减少命名冲突，但过深的嵌套会使代码逻辑变得极其复杂，难以阅读、调试和维护。工程实践中必须合理控制嵌套深度。

**考点：** 结构体嵌套的语法与设计原则。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: `假设int arr[2][3] = {{1,2,3},{4,5,6}};，则arr[1][2]的值是（ ）。`,
            options: [
                "2",
                "3",
                "5",
                "6",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (6)**

**选项逐项分析：**
- **A 2 / B 3 / C 5**：❌ 错误。
- **D 6**：✅ 正确。
  1. \`arr[2][3]\` 定义了一个 2 行 3 列的数组。
  2. \`arr[1][2]\` 访问的是第 2 行（索引 1）的第 3 个元素（索引 2）。
  3. 第 1 行是 \`{1, 2, 3}\`，第 2 行是 \`{4, 5, 6}\`。
  4. 第 2 行的第 3 个元素即为 6。

**考点：** 二维数组的下标访问与行/列索引（从 0 开始）。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: `下面（ ）正确定义了二维数组。`,
            options: [
                "int arr[3,4];",
                "int arr[3][4];",
                "int arr(3,4);",
                "int a[3-4];",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (int arr[3][4];)**

**选项逐项分析：**
- **A int arr[3,4];**：❌ 错误。C++ 数组下标不支持逗号分隔。
- **B int arr[3][4];**：✅ 正确。这是 C++ 定义二维数组的标准语法。
- **C int arr(3,4);**：❌ 错误。这是函数调用或某些构造函数的语法，而非数组定义。
- **D int a[3-4];**：❌ 错误。数组大小必须是正整数，\`3-4 = -1\` 非法。

**考点：** 二维数组的定义语法。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: `小杨正在爬楼梯，需要爬 n 阶才能到达楼顶。如果每次可以爬 1 个或 2 个台阶，下面代码采用递推算法来计算一共有多少种不同的方法可以爬到楼顶，则横线上应填写（ ）。\n\`\`\`cpp\nint f(int n) {\n if (n == 1 || n == 2) return n;\n int f1 = 1;\n int f2 = 2;\n int res = 0;\n for (int i = 3; i <= n; i++) {\n ________________________________ // 在此处填入代码\n }\n return res;\n}\n\`\`\``,
            options: [
                "res += f1+f2; f1 = f2; f2 = res;",
                "res = f1+f2; f1 = f2; f2 = res;",
                "res += f1+f2; f2 = res; f1 = f2;",
                "res = f1+f2; f2 = res; f1 = f2;",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (res = f1+f2; f1 = f2; f2 = res;)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。
- **B res = f1+f2; f1 = f2; f2 = res;**：✅ 正确。
  1. 这是一个求解爬楼梯问题（斐波那契数列）的经典递推算法。
  2. 第 $i$ 阶的方法数 = 前一阶方法数 ($f_2$) + 前两阶方法数 ($f_1$)。
  3. 计算出当前阶结果 \`res = f1 + f2\`。
  4. 为下一次循环准备：原 $f_2$ 变为新的 $f_1$，当前计算出的 $res$ 变为新的 $f_2$。

**考点：** 递推算法的应用（爬楼梯问题/斐波那契数列）。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: `给定如下算法，其时间复杂度为（ ）。\n\`\`\`cpp\nbool f(int arr[], int n, int target) {\n for (int i = 0; i < (1 << n); i++) {\n int sum = 0;\n for (int j = 0; j < n; j++) {\n if (i & (1 << j)) {\n sum += arr[j];\n }\n }\n if (sum == target) return true;\n }\n return false;\n}\n\`\`\``,
            options: [
                "O($2^n$)",
                "O(n * $2^n$)",
                "$O(N^2)$",
                "$O(N)$",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (O(n * $2^n$))**

**选项逐项分析：**
- **A O($2^n$)**：❌ 错误。忽略了内层循环。
- **B O(n * $2^n$)**：✅ 正确。
  1. 外层循环：\`i\` 从 0 到 \`(1 << n) - 1\`，共有 $2^n$ 次迭代。
  2. 内层循环：\`j\` 从 0 到 \`n-1\`，共有 $n$ 次迭代。
  3. 总基本操作次数约为 $n \times 2^n$。
- **C $O(n^2)$ / D $O(n)$**：❌ 错误。

**考点：** 位运算实现子集枚举的时间复杂度分析。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: `下面关于排序稳定性的描述，正确的是（ ）。`,
            options: [
                "稳定性指算法的时间复杂度恒定",
                "稳定排序保证相同元素的相对顺序不变",
                "选择排序是稳定排序",
                "插入排序不是稳定排序",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (稳定排序保证相同元素的相对顺序不变)**

**选项逐项分析：**
- **A 算法的时间复杂度恒定**：❌ 错误。那是算法的时间效率概念，与稳定性无关。
- **B 相同元素的相对顺序不变**：✅ 正确。这是排序算法“稳定性”的标准定义。
- **C 选择排序是稳定排序**：❌ 错误。选择排序在交换最小元素时可能会跳过相同元素，破坏相对顺序。
- **D 插入排序不是稳定排序**：❌ 错误。插入排序通常实现为稳定的。

**考点：** 排序算法的稳定性定义及其常见算法特性。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: `对数组arr[]={5, 3, 8, 1}进⾏升序排序，执⾏第一轮冒泡排序后数组arr中的内容为（ ）。`,
            options: [
                "3, 5, 1, 8",
                "3, 1, 5, 8",
                "3, 5, 8, 1",
                "5, 3, 8, 1",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (3, 5, 1, 8)**

**选项逐项分析：**
- **A 3, 5, 1, 8**：✅ 正确。
  1. 初始：\`{5, 3, 8, 1}\`。
  2. 第一轮冒泡过程：
     - 比较 5 和 3，5 > 3，交换：\`{3, 5, 8, 1}\`。
     - 比较 5 和 8，5 < 8，不换：\`{3, 5, 8, 1}\`。
     - 比较 8 和 1，8 > 1，交换：\`{3, 5, 1, 8}\`。
  3. 第一轮结束，最大值 8 到达末尾。
- **B / C / D**：❌ 错误。

**考点：** 冒泡排序（Bubble Sort）的单趟运行逻辑。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: `运⾏下面的代码，将输出（ ）。\n\`\`\`cpp\ndouble hmean(double a, double b) {\n if (a == -b) throw std::runtime_error("Runtime error occurred.");\n return 2.0*a*b/(a+b);\n}\nint main() {\n double x = 10;\n double y = -10;\n try {\n int result = hmean(x, y);\n std::cout << "hmean: " << result << std::endl;\n } catch (const std::runtime_error& e) {\n std::cout << "Caught: " << e.what() << std::endl;\n } catch (...) {\n std::cout << "Caught an unknown exception." << std::endl;\n }\n return 0;\n}\n\`\`\``,
            options: [
                "Caught: Runtime error occurred.",
                "Caught an unknown exception.",
                "hmean: 0",
                "编译错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (Caught: Runtime error occurred.)**

**选项逐项分析：**
- **A Caught: Runtime error occurred.**：✅ 正确。
  1. \`x = 10, y = -10\`，调用 \`hmean(10, -10)\`。
  2. \`a == -b\`（10 == -(-10)）成立。
  3. 抛出 \`std::runtime_error("Runtime error occurred.")\` 异常。
  4. \`catch (const std::runtime_error& e)\` 捕获到该异常。
  5. 输出 \`Caught: \` 加上 \`e.what()\`（即构造异常时的字符串），结果为 \`Caught: Runtime error occurred.\`。
- **B / C / D**：❌ 错误。

**考点：** C++ 异常处理机制（try-catch-throw）与标准异常类。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: `下面哪种方式不能实现将字符串"Happy Spring!"输出重定向到文件log.txt（ ）。`,
            options: [
                "freopen(\"log.txt\", \"w\", stdout); std::cout << \"Happy Spring!\" << std::endl;",
                "std::ofstream outFile(\"log.txt\"); outFile << \"Happy Spring!\"; outFile.close();",
                "std::ofstream outFile(\"log.txt\"); std::cout << \"Happy Spring!\"; outFile.close();",
                "使用 rdbuf() 将 cout 的缓冲区重定向到文件的缓冲区。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (std::ofstream outFile("log.txt"); std::cout << "Happy Spring!"; outFile.close();)**

**选项逐项分析：**
- **A freopen(...)**：✅ 正确重定向。\`freopen\` 直接将标准输出流 \`stdout\` 导向文件。
- **B outFile << ...**：✅ 正确。直接使用文件流向文件写入，虽然不是对 \`cout\` 的重定向，但实现了“输出到文件”的目标。
- **C std::cout << ...**：❌ 错误。代码中定义了 \`outFile\`，但 \`cout\` 依然指向默认的标准输出（屏幕），没有建立两者之间的重定向关系。
- **D rdbuf()**：✅ 正确重定向。这是 C++ 中通过修改底层流缓冲区实现重定向的标准方法。

**考点：** C++ 输入输出重定向的各种实现方式。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: `函数是 C++ 中的核⼼概念，用于封装可重用的代码块。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
函数的基本作用就是将一段逻辑或算法封装起来，赋予其名称。这样可以在程序的不同地方多次调用，显著提高代码的可重用性和可维护性。

**考点：** C++ 函数的基础定义与作用。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `在 C++ 中，函数的返回类型可以省略，默认为int。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在现代 C++ 标准（如 C++11 及更高版本）中，函数必须明确指定返回类型（或者是 \`void\` 表示无返回值，或者是使用 \`auto\` 进行推导）。C 语言早期标准允许隐式 \`int\`，但在 C++ 中这是不合法的。

**考点：** C++ 函数定义的语法要求。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `结构体的成员默认是public访问权限。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
这是 C++ 中 \`struct\` 和 \`class\` 的核心区别之一：
1.  \`struct\` 的成员和继承默认访问权限是 \`public\`。
2.  \`class\` 的成员和继承默认访问权限是 \`private\`。

**考点：** C++ 结构体与类的默认访问权限区别。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `假设整数数组arr[4]= {0, 1, 2, 3};的第一个元素在内存中的地址为0x7ffee4065820, 经过int* p = arr; p += 1;后，指针p的值是 1 。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1.  \`int* p = arr;\` 使 \`p\` 指向数组首元素 \`arr[0]\`。
2.  \`p += 1;\` 是指针算术运算。由于 \`p\` 是 \`int*\` 类型，指针会向前移动一个 \`int\` 的大小（通常为 4 字节）。
3.  \`p\` 的新值将是原地址加上 \`sizeof(int)\`，即指向 \`arr[1]\` 的内存地址，而不是整数 1。

**考点：** C++ 指针算术运算及其物理意义。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: `二维数组作为函数参数时，必须显式指定所有维度的大小。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在 C++ 中，当二维数组作为函数参数时，只有第一维（行数）的大小可以省略，**第二维（列数）的大小必须显式指定**。这是因为编译器需要知道每行有多少个元素，以便在访问 \`arr[i][j]\` 时正确计算内存偏移（偏移量 = $i \times \text{列数} + j$）。

**考点：** 二维数组作为函数参数的语法规则。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `递推是一种通过已知的初始值和递推公式，逐步求解目标值的算法。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
递推（Recurrence）是解决数学和算法问题的一种基本方法。它通过定义一个初始状态（基准情况），以及一个将当前状态与之前状态关联起来的规则（递推公式），来逐步计算出更复杂或更大规模情况的结果。

**考点：** 递推算法的核心定义与基本要素。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: `考虑最坏情况下冒泡排序算法的时间复杂度， T(n) 为待排序数字的数目为 n 的复杂度，则其递推关系式为 T(n) = T($n-1$)+($n-1$)，T(1) = 0。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  在最坏情况下（数据逆序），冒泡排序每趟都需要进行 $n-i$ 次比较。
2.  总比较次数 = $(n-1) + (n-2) + \dots + 1 = \frac{n(n-1)}{2}$。
3.  对应的递推关系式 $T(n) = T(n-1) + (n-1)$ 准确地描述了这一过程：$T(n)$ 是对 $n$ 个数排序所需的比较次数，它等于对前 $n-1$ 个数排序所需的次数加上处理最后一个元素所需的 $n-1$ 次比较。

**考点：** 冒泡排序的时间复杂度推导与递推关系。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: `插入排序在最好情况（已有序）下的时间复杂度是 $O(N^2)$。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在最好的情况下，即待排序数组已经是有序的，插入排序的内层循环每次只需进行 1 次比较即可确定当前元素的位置。因此，总的比较次数为 $n-1$ 次，时间复杂度为 $O(N)$。

**考点：** 插入排序的时间复杂度分析（最好、最坏、平均情况）。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `对数组arr[]={4, 3, 1, 5, 2}进⾏升序排序，执⾏第一轮选择排序后数组 arr 中的内容是{1, 4, 3, 5, 2}。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1.  初始：\`{4, 3, 1, 5, 2}\`。
2.  第一轮选择排序：在 \`[0, 4]\` 范围内寻找最小值，结果为 1（下标为 2）。
3.  将最小值 1 与当前位置的元素 4 交换。
4.  执行完第一轮后的数组应为：\`{1, 3, 4, 5, 2}\`。
题目给出的结果中 4 和 3 的位置与简单选择排序逻辑不符。

**考点：** 选择排序（Selection Sort）的算法过程模拟。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: `未捕获异常会调用 std::terminate 终⽌程序。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
当程序抛出异常且没有对应的 \`catch\` 块能捕获它时，异常会“逃逸”出 \`main\` 函数。按照 C++ 标准，这会导致运行库调用全局函数 \`std::terminate()\`，该函数默认会调用 \`std::abort()\` 立即异常终结程序的运行。

**考点：** C++ 异常处理生命周期与未捕获异常的后果。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3 5
.....
.#..#
.....`, output: `11` }
      ],
      question: `
# [GESP202503 四级] 荒地开垦

## 题目描述

小杨有一大片荒地，可以表示为一个 $n$ 行 $m$ 列的网格图。

小杨想要开垦这块荒地，但荒地中一些位置存在杂物，对于一块不存在杂物的荒地，该荒地可以开垦当且仅当其上下左右四个方向相邻的格子均不存在杂物。

小杨可以选择至多一个位置，清除该位置的杂物，移除杂物后该位置变为荒地。小杨想知道在清除至多一个位置的杂物的情况下，最多能够开垦多少块荒地。

## 输入格式

第一行包含两个正整数 $n, m$，含义如题面所示。

之后 $n$ 行，每行包含一个长度为 $m$ 且仅包含字符 \`.\` 和 \`#\` 的字符串。如果为 \`.\`，代表该位置为荒地；如果为 \`#\`，代表该位置为杂物。

## 输出格式

输出一个整数，代表在清除至多一个位置的杂物的情况下，最多能够开垦的荒地块数。
`,
      score: 25,
      explanation: `**解析：**
本题考察对二维网格的模拟、判断与优化。
1.  **开垦条件**：一个格子 $(i, j)$ 可开垦，需满足该位置及其上下左右四个邻居均为 \`.\`（荒地）。
2.  **初始状态**：先统计初始状态下可开垦的格子总数。
3.  **移除杂物的影响**：
    - 如果我们将位置 $(r, c)$ 的 \`#\` 移除，那么该位置 $(r, c)$ 本身可能变得可开垦。
    - 此外，$(r, c)$ 的上下左右邻居也可能因为障碍物的移除而变得可开垦。
4.  **枚举优化**：
    - 遍历所有的 \`#\`，计算移除该点后带来的“新增”可开垦数量。
    - 新增数量 = 移除后 $(r, c)$ 及其邻居中新变更为可开垦的格子数。
5.  **结果**：初始数量 + 最大新增数量。

**核心逻辑提示：**
\`\`\`cpp
// 判断 (r, c) 在当前 grid 下是否符合开垦条件
bool can(int r, int c, const vector<string>& grid) {
    if (grid[r][c] == '#') return false;
    for (int i = 0; i < 4; i++) {
        int nr = r + dr[i], nc = c + dc[i];
        if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == '#') return false;
    }
    return true;
}
\`\`\``,
      tags: ["编程题", "GESP4级"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3 4
1 2 1 0
2 4 2 1
0 3 3 0`, output: `2` }
      ],
      question: `
# [GESP202503 四级] 二阶矩阵

## 题目描述

小 A 有一个 $n$ 行 $m$ 列的矩阵 $A$。

小 A 认为一个 $2 \\times 2$ 的矩阵 $D$ 是好的，当且仅当 $D_{1,1} \\times D_{2,2} = D_{1,2} \\times D_{2,1}$。其中 $D_{i,j}$ 表示矩阵 $D$ 的第 $i$ 行第 $j$ 列的元素。

小 A 想知道 $A$ 中有多少个好的子矩阵。

## 输入格式

第一行，两个正整数 $n, m$。

接下来 $n$ 行，每行 $m$ 个整数 $A_{i,1}, A_{i,2}, \\ldots, A_{i,m}$。

## 输出格式

一行，一个整数，表示 $A$ 中好的子矩阵的数量。
`,
      score: 25,
      explanation: `**解析：**
本题考察对二维数组子矩阵的性质判断。
1.  **二阶子矩阵定义**：在 $n \times m$ 的矩阵中，任意一个 $2 \times 2$ 的连续区域。
2.  **“好”的条件**：左上 $\times$ 右下 = 右上 $\times$ 左下，即 $D_{1,1} \times D_{2,2} = D_{1,2} \times D_{2,1}$。
3.  **枚举逻辑**：
    - 遍历行索引 $i$ 从 0 到 $n-2$。
    - 遍历列索引 $j$ 从 0 到 $m-2$。
    - 提取 $D_{1,1} = A[i][j], D_{1,2} = A[i][j+1], D_{2,1} = A[i+1][j], D_{2,2} = A[i+1][j+1]$。
    - 进行乘积比较，若满足条件则计数。

**核心逻辑提示：**
\`\`\`cpp
long long count = 0;
for (int i = 0; i < n - 1; i++) {
    for (int j = 0; j < m - 1; j++) {
        if ((long long)a[i][j] * a[i+1][j+1] == (long long)a[i][j+1] * a[i+1][j]) {
            count++;
        }
    }
}
\`\`\``,
      tags: ["编程题", "GESP4级"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      answer: '',
    }
    ]
};
