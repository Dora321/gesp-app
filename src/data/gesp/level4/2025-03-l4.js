// 2025年3月 GESP C++ 四级真题
export const paperData = {
    id: '2025-03-l4',
    title: '2025年3月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "关于下述代码，说法错误的是（ ）。",
            options: [
                "函数multiply的定义应该放到函数main之前。",
                "函数声明int multiply(int x, int y);中明确指定了函数multiply()的返回值为整数类型。",
                "在main函数中，函数multiply通过multiply(a, b)被调用，其中a和b是定义在main函数中的变 量，它们作为实参传递给了multiply函数的形参x和y。",
                "运⾏上述代码，将输出The result is: 20。",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "执⾏下述代码将输出（ ）。",
            options: [
                "2020",
                "2010",
                "1010 int multiply(int x, int y); int main() { int a = 4; int b = 5; int result = multiply(a, b); std::cout << \"The result is: \" << result << std::endl; return 0; } int multiply(int x, int y) { return x * y; } 1 2 3 4 5 6 7 8 9 10 11 12 13 int x = 10; void func() { int x = 20; std::cout << x; } int main() { func(); std::cout << x; return 0; } 1 2 3 4 5 6 7",
                "编译错误",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "执⾏下述代码后，变量a的值为（ ）。",
            options: [
                "10",
                "20",
                "随机值",
                "编译错误",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "以下哪种参数传递方式可以避免拷贝大型对象？",
            options: [
                "只能用值传递",
                "只能用引用传递",
                "只能用指针传递",
                "引用传递和指针传递均可",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "执⾏下述代码，将输出（ ）。",
            options: [
                "12",
                "21",
                "22",
                "11",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下面的描述中，（ ）正确定义一个名为Person的结构体并正确初始化了一个Person结构体的变量p。",
            options: [
                "int a = 10; int* p = &a; *p = 20 1 2 3 void swap(int a, int &b) { int temp = a; a = b; b = temp; } int main() { int x = 1, y = 2; swap(x, y); std::cout << x << y; return 0; } 1 2 3 4 5 6 7 8 9 10 11 struct Person { string name; int age; }; Person p(\"Yang\", 10); 1 2 3 4 5",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "给定如下代码， 下面描述错误的是（ ）。",
            options: [
                "结构Person内嵌套结构Address",
                "Person 有一个Address 类型的 address 成员",
                "一个Person类型的变量p的address的初始化可以写成：p.address.street = \"123 Main St\"; p.address.city = \"Anytown\";",
                "结构的嵌套可以减少命名冲突，因此可以不必控制嵌套层次",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "假设int arr[2][3] = {{1,2,3},{4,5,6}};，则arr[1][2]的值是（ ）。",
            options: [
                "2",
                "3",
                "5 struct Person { string name, int age; }; Person p; p.name = \"Yang\"; p.age = 10; 1 2 3 4 5 6 7 struct Person { string name; int age; }; Person p = { \"Yang\", 10 }; 1 2 3 4 5 struct Person { string name; int age; }; Person p = new Person(\"Yang\", 10); 1 2 3 4 5 struct Person { std::string name; int age; struct Address { std::string street; std::string city; }; Address address; }; 1 2 3 4 5 6 7 8 9",
                "6",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面（ ）正确定义了二维数组。",
            options: [
                "int arr[3,4];",
                "int arr[3][4];",
                "int arr(3,4);",
                "int a[3-4];",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "小杨正在爬楼梯，需要爬 阶才能到达楼顶。如果每次可以爬 个或 个台阶，下面代码采用递推算法来计算 一共有多少种不同的方法可以爬到楼顶，则横线上应填写（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "给定如下算法，其时间复杂度为（ ）。 int f(int n) { if (n == 1 || n == 2) return n; int f1 = 1; int f2 = 2; int res = 0; for (int i = 3; i <= n; i++) { ________________________________ // 在此处填入代码 } return res; } 1 2 3 4 5 6 7 8 9 10 11 12 res += f1 + f2; f1 = f2; f2 = res; 1 2 3 res = f1 + f2; f1 = f2; f2 = res; 1 2 3 res += f1 + f2; f2 = res; f1 = f2; 1 2 3 res = f1 + f2; f2 = res; f1 = f2; 1 2 3",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面关于排序稳定性的描述，正确的是（ ）。",
            options: [
                "稳定性指算法的时间复杂度恒定",
                "稳定排序保证相同元素的相对顺序不变",
                "选择排序是稳定排序",
                "插入排序不是稳定排序",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "对数组arr[]={5, 3, 8, 1}进⾏升序排序，执⾏第一轮冒泡排序后数组arr中的内容为（ ）。",
            options: [
                "3, 5, 1, 8",
                "3, 1, 5, 8",
                "3, 5, 8, 1",
                "5, 3, 8, 1",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "运⾏下面的代码，将出现（ ）。 bool f(int arr[], int n, int target) { for (int i = 0; i < (1 << n); i++) { int sum = 0; for (int j = 0; j < n; j++) { if (i & (1 << j)) { sum += arr[j]; } } if (sum == target) return true; } return false; } 1 2 3 4 5 6 7 8 9 10 11 12 double hmean(double a, double b) { if (a == -b ) throw runtime_error(\"Runtime error occurred.\"); return 2.0*a*b/(a + b); } int main() { double x = 10; double y = -10; try { int result = hmean(x, y); cout << \"hmean: \" << result << endl; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "屏幕上输出Caught: Runtime error occurred.",
                "屏幕上输出Caught an unknown exception.",
                "程序调用 std::terminate()",
                "编译错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下面哪种方式不能实现将字符串\"Happy Spring!\"输出重定向到文件log.txt（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "函数是 C++ 中的核⼼概念，用于封装可重用的代码块。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 中，函数的返回类型可以省略，默认为int。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "结构体的成员默认是public访问权限。 catch (const runtime_error& e) { cout << \"Caught: \" << e.what() << endl; } catch (...) { cout << \"Caught an unknown exception.\" << endl; } return 0; } 15 16 17 18 19 20 21 freopen(\"log.txt\", \"w\", stdout); cout << \"Happy Spring!\" << endl; fclose(stdout); 1 2 3 std::ofstream outFile(\"log.txt\"); outFile << \"Happy Spring!\" << endl; outFile.close(); 1 2 3 std::ofstream outFile(\"log.txt\"); cout << \"Happy Spring!\" << endl; outFile.close(); 1 2 3 ofstream log_file(\"log.txt\"); streambuf* org_cout = cout.rdbuf(); cout.rdbuf(log_file.rdbuf()); cout << \"Happy Spring!\" << endl; cout.rdbuf(org_cout); 1 2 3 4 5",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "假设整数数组arr[4]= {0, 1, 2, 3};的第一个元素在内存中的地址为0x7ffee4065820, 经过int* p = arr; p += 1;后，指针p的值是 1 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "二维数组作为函数参数时，必须显式指定所有维度的大小。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "递推是一种通过已知的初始值和递推公式，逐步求解目标值的算法。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "考虑最坏情况下冒泡排序算法的时间复杂度， 为待排序数字的数目为 的复杂度，则其递推关系式为 ， 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "插入排序在最好情况（已有序）下的时间复杂度是 。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "对数组arr[]={4, 3, 1, 5, 2}进⾏升序排序，执⾏第一轮选择排序后数组 arr 中的内容是{1, 4, 3, 5, 2}。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "未捕获异常会调用 std::terminate 终⽌程序。",
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级",
            ]
        },
        {
            id: 26,
            type: "programming",
            question: "【问题描述】\n给定一个 n x m 的矩阵 A，你需要统计其中“优秀”的 2 x 2 子矩阵的数量。一个 2 x 2 子矩阵（左上角坐标为 (i, j)）被认为是“优秀”的，当且仅当其主对角线上两个元素的乘积等于副对角线上两个元素的乘积。即：A[i, j] * A[i+1, j+1] = A[i, j+1] * A[i+1, j]。\n【输入描述】\n第一行包含两个整数 n 和 m (1 ≤ n, m ≤ 500)。\n接下来 n 行，每行包含 m 个整数 A[i, j] (|A[i, j]| ≤ 100)。\n【输出描述】\n输出一个整数，代表“优秀”子矩阵的总数。\n【样例输入1】\n3 4\n1 2 1 0\n2 4 2 1\n0 3 3 0\n【样例输出1】\n2",
            score: 25,
            explanation: "遍历矩阵中所有可能的 2x2 子矩阵的左上角位置 (i, j)，范围是 1 ≤ i < n 且 1 ≤ j < m。对于每个位置，验证主对角线乘积是否等于副对角线乘积。如果相等，则计数器加一。",
            tags: [
                "编程题",
                "GESP4级",
            ]
        },
        {
            id: 27,
            type: "programming",
            question: "【问题描述】\n小杨有一块 n x m 的荒地。荒地中的每个格子要么是荒地（`.`），要么是障碍物（`#`）。一个荒地格子 (i, j) 是“可开垦的”，如果它是荒地且它的所有上下左右邻居（如果存在）都不是障碍物。小杨被允许移除最多一个障碍物（`#`）。\n请问在最多移除一个障碍物后，小杨最多能获得多少个可开垦的格子？\n【输入描述】\n第一行包含两个整数 n 和 m (1 ≤ n, m ≤ 1000)。\n接下来 n 行，每行包含 m 个字符（`.` 或 `#`）。\n【输出描述】\n输出一个整数，代表在移除最多一个障碍物后，最大的可开垦格子数量。\n【样例输入1】\n3 5\n.....\n..#..\n.....\n【样例输出1】\n11",
            score: 25,
            explanation: "首先计算初始状态下可开垦格子的数量。然后枚举每一个障碍物，计算如果移除该障碍物会新增多少个可开垦格子。新增的可开垦格子只可能是该障碍物本身（如果它变成了可开垦的）以及与它相邻的那些原本受它限制的荒地格子。最后取最大值即可。",
            tags: [
                "编程题",
                "GESP4级",
            ]
        }
    ]
};

