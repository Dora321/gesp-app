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
            explanation: `**答案：A**
            
            **解析：**
            C++ 支持函数声明与定义分离。只要在调用之前有函数原型声明，定义可以放在 main 之后。因此选项 A 说法错误。
            
            **考点：** `,
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
            explanation: `**答案：B**
            
            **解析：**
            func() 内部定义了局部变量 x 并赋值 20，屏蔽了全局变量，故输出 20；main 函数中输出的是全局变量 x，值为 10。因此输出 2010。
            
            **考点：** `,
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
            explanation: `**答案：B**
            
            **解析：**
            指针 p 指向变量 a 的地址，*p = 20 通过解引用直接修改了 a 所在内存的值为 20。
            
            **考点：** `,
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
            explanation: `**答案：D**
            
            **解析：**
            引用传递和指针传递本质上都是传递地址（或别名），不需要复制整个对象的数据副本，因此可以避免大型对象的拷贝开销。
            
            **考点：** `,
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
            explanation: `**答案：D**
            
            **解析：**
            swap 函数中 a 是值传递，形参改变不影响实参 x；b 是引用传递，形参改变会影响实参 y。y 被赋值为 a 的初始值 1，因此 x 仍为 1，y 变为 1。输出 11。
            
            **考点：** `,
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
            explanation: `**答案：C**
            
            **解析：**
            选项 C 使用大括号 {} 进行初始化是 C++ 标准结构体聚合初始化的正确方式。选项 A 缺少构造函数，选项 B 逗号语法错误，选项 D 是指针动态分配语法。
            
            **考点：** `,
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
            explanation: `**答案：D**
            
            **解析：**
            结构嵌套确实可以减少全局命名空间污染，但嵌套层次过深会使代码难以理解和维护，因此必须合理控制嵌套层次。选项 D 说法太绝对。
            
            **考点：** `,
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
            explanation: `**答案：D**
            
            **解析：**
            arr[1][2] 表示第 2 行（索引 1）第 3 列（索引 2）的元素，即 6。
            
            **考点：** `,
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
            explanation: `**答案：B**
            
            **解析：**
            C++ 中定义二维数组的正确语法是使用两个中括号，分别指定行数和列数：arr[rows][cols]。
            
            **考点：** `,
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
            explanation: `**答案：B**
            
            **解析：**
            斐波那契数列式的递推。当前阶数的方法数等于前两阶方法数之和 (res = f1+f2)，然后更新前两项的值以供下次循环：f1 变为旧的 f2，f2 变为新的 res。
            
            **考点：** `,
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
            explanation: `**答案：B**
            
            **解析：**
            外层循环次数为 $2^n$ (由 1 << n 决定)，内层循环次数为 n。因此总时间复杂度为 O(n * $2^n$)。
            
            **考点：** `,
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
            explanation: `**答案：B**
            
            **解析：**
            排序稳定性的定义是：如果在待排序的序列中存在多个记录具有相同的关键字，经过排序后，这些记录的相对次序保持不变，则称该排序算法是稳定的。选择排序不稳定，插入排序稳定。
            
            **考点：** `,
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
            explanation: `**答案：A**
            
            **解析：**
            冒泡第一轮：5和3交换得到 {3, 5, 8, 1}；5和8比较不交换；8和1交换得到 {3, 5, 1, 8}。因此结果为 3, 5, 1, 8。
            
            **考点：** `,
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
            explanation: `**答案：A**
            
            **解析：**
            x 为 10，y 为 -10，满足 a == -b 条件，函数抛出 std::runtime_error 异常。该异常被 catch (const std::runtime_error& e) 捕获，并输出 \"Caught: \" 加上 e.what() 的内容。
            
            **考点：** `,
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
            explanation: `**答案：C**
            
            **解析：**
            选项 C 只是创建了一个文件输出流 outFile，但 std::cout 仍然默认输出到标准输出设备（屏幕），并没有重定向到 outFile 关联的文件。因此选项 C 无法实现重定向输出。
            
            **考点：** `,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: `函数是 C++ 中的核⼼概念，用于封装可重用的代码块。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            正确。函数的基本作用就是封装逻辑以实现代码复用。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `在 C++ 中，函数的返回类型可以省略，默认为int。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            错误。在现代 C++ 标准中，函数返回类型必须明确指定，不能省略。老的 C 语言标准曾支持隐式 int，但在 C++ 中是不允许的。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `结构体的成员默认是public访问权限。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            正确。这是 struct 与 class 的主要区别之一（class 成员默认是 private）。
            
            **易混概念：** C++ 支持结构体嵌套定义，struct 中可以包含不同类型的成员变量。
            
            **考点：** `,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `假设整数数组arr[4]= {0, 1, 2, 3};的第一个元素在内存中的地址为0x7ffee4065820, 经过int* p = arr; p += 1;后，指针p的值是 1 。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            错误。p += 1 之后，p 指向的是数组的第二个元素地址（原地址加上 int 类型占用的字节数），即地址变为 0x7ffee4065824（假设 int 占 4 字节），而不是变为整数 1。
            
            **易混概念：** CPU 负责运算和判断，内存负责存储数据，两者职能不同。
            
            **考点：** `,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: `二维数组作为函数参数时，必须显式指定所有维度的大小。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            错误。二维数组作为参数传递时，第二维的大小必须指定，但第一维的大小可以省略。例如 void func(int arr[][10]) 是合法的。
            
            **易混概念：** 在 C++ 中，无论是几维数组，在内存中都是按序连续存放的。
            
            **考点：** `,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `递推是一种通过已知的初始值和递推公式，逐步求解目标值的算法。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            正确。这是递推算法的基本定义。
            
            **易混概念：** 注意区分相关概念的适用范围和边界条件。
            
            **考点：** `,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: `考虑最坏情况下冒泡排序算法的时间复杂度， T(n) 为待排序数字的数目为 n 的复杂度，则其递推关系式为 T(n) = T($n-1$)+($n-1$)，T(1) = 0。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            正确。冒泡排序每一趟将一个元素排好序。n 个元素的一趟冒泡需要比较 $n-1$ 次，随后剩下 $n-1$ 个元素继续排序。其复杂度递推式正确反映了这一过程。
            
            **易混概念：** 冒泡排序和插入排序是稳定的，选择排序是不稳定的。稳定性指相等元素排序后相对位置不变。
            
            **考点：** `,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: `插入排序在最好情况（已有序）下的时间复杂度是 $O(N^2)$。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            错误。插入排序在已完全有序的情况下，内层循环每次只需比较一次即可停止，因此最好情况下的时间复杂度是 $O(N)$。
            
            **易混概念：** 冒泡排序和插入排序是稳定的，选择排序是不稳定的。稳定性指相等元素排序后相对位置不变。
            
            **考点：** `,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `对数组arr[]={4, 3, 1, 5, 2}进⾏升序排序，执⾏第一轮选择排序后数组 arr 中的内容是{1, 4, 3, 5, 2}。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**
            
            **解析：**
            错误。第一轮选择排序会扫描全数组找到最小元素 1，并将其与第一个元素 4 交换。结果应为 {1, 3, 4, 5, 2}。题目给出的结果中 4 被挤到了第二位，不符合简单选择排序的交换逻辑。
            
            **易混概念：** 冒泡排序和插入排序是稳定的，选择排序是不稳定的。稳定性指相等元素排序后相对位置不变。
            
            **考点：** `,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: `未捕获异常会调用 std::terminate 终⽌程序。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：A**
            
            **解析：**
            正确。如果程序中抛出了异常但没有被任何 catch 块捕获，C++ 运行库会调用 std::terminate 来异常中止程序运行。
            
            **易混概念：** 前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。
            
            **考点：** `,
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
      explanation: `
      **解析：**
      遍历矩阵中所有可能的 2x2 子矩阵的左上角位置 (i, j)，范围是 0 ≤ i < $n-1$ 且 0 ≤ j < $m-1$。对于每个位置，验证主对角线乘积 (A[i][j] * A[i+1][j+1]) 是否等于副对角线乘积 (A[i][j+1] * A[i+1][j])。如果相等，则计数器加一。
      `,
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
      explanation: `
      **解析：**
      1. 预处理：判断每个点是否受邻居障碍物影响。2. 计算初始可开垦数量。3. 枚举每个障碍物，计算移除它后新增的可开垦格子（其自身及受其单方面影响的邻居）。4. 取最大值。
      `,
      tags: ["编程题", "GESP4级"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      answer: '',
    }
    ]
};
