// 2024年9月 GESP C++ 四级真题
export const paperData = {
    id: '2024-09-l4',
    title: '2024年9月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "在 C++ 中，（ ）正确定义了一个返回整数值并接受两个整数参数的函数。",
            options: [
                "int add(int a, int b) { return a + b; }",
                "void add(int a, int b) { return a + b; }",
                "int add(a, b) { return a + b; }",
                "void add(int a, int b) { return a - b; }",
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
            question: "在 C++ 中，形参与实参的关系描述正确的是（ ）。",
            options: [
                "形参在函数调用时指定，实参在函数定义时传递",
                "形参在函数定义时指定，实参在函数调用时传递",
                "形参和实参可以互换",
                "形参和实参必须是完全相同的类型，不能有任何差异。",
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
            question: "运⾏以下代码，屏幕上将输出（ ）。 #include <iostream> using namespace std; int var = 100; void function() { int var = 200; cout << var << \" \"; cout << ::var << \" \"; } int main() { cout << var << \" \"; function(); var += 100; cout << var << \" \"; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19",
            options: [
                "100 200 100 200",
                "100 200 100 300",
                "100 200 200 200",
                "100 200 200 300",
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
            id: 4,
            type: "single",
            question: "运⾏下面代码，屏幕上输出是（ ）。",
            options: [
                "24",
                "9",
                "7",
                "不确定",
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
            id: 5,
            type: "single",
            question: "运⾏下面代码⽚段的结果是（ ）。",
            options: [
                "将 赋值为 24",
                "将 赋值为 20",
                "将指向 的地址",
                "将 指向 的地址",
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
            question: "在 C++ 中，（ ）正确定义一个名为student的结构体，其中包含一个name字符数组和一个age整数？",
            options: [
                "struct student { char name[20]; int age; };",
                "student struct { char name[20]; int age; };",
                "student struct { string name; int age; };",
                "struct student { char[20] name; int age; };",
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
            id: 7,
            type: "single",
            question: "在 C++ 中，（ ）正确声明了一个 3 ⾏ 4 列的二维数组。",
            options: [
                "int arr[3, 4]; return 0; } 20 21 22 int arr[3] = {24, 9, 7}; int* p = arr; p++; cout << *p << endl; 1 2 3 4 int x = 20; int y = 24; int* p = &x; int* q = &y; p = q; 1 2 3 4 5 6",
                "int arr[3][4];",
                "int arr[4][3];",
                "int arr(3, 4);",
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
            id: 8,
            type: "single",
            question: "一个二维数组定义为 int arr[3][4];（假设一个 int 变量占 4 个字节），则int arr[0]占用（ ）个字节 的内存。",
            options: [
                "3",
                "4",
                "12",
                "16",
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
            question: "下面代码采用递推算法来实现整数 的阶乘（ ），则横线上应填写（ ）。",
            options: [
                "result *= i;",
                "result += i;",
                "result *= result;",
                "result += result;",
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
            id: 10,
            type: "single",
            question: "在排序算法中，稳定性指的是（ ）。",
            options: [
                "排序后数据不会丢失",
                "排序后相同元素的相对顺序保持不变",
                "排序后数据不会被修改",
                "排序后数据的时间复杂度不变",
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
            question: "下面代码实现了冒泡排序函数，则横线上应填写（ ）。 int factorial(int n) { int result = 1; for (int i = 2; i <= n; i++) { ________________________________ // 在此处填入代码 } return result; } 1 2 3 4 5 6 7 // 交换数组 arr 的第 i 个元素和第 j 个元素 void swap(vector<int> &arr, int i, int j) { int tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp; } int bubble_sort(vector<int> &arr) { for (int i = arr.size() - 1; i > 0; i--) { bool flag = false; // 标志位 ________________________________ { // 在此处填入代码 1 2 3 4 5 6 7 8 9 10 11",
            options: [
                "for (int j = 0; j < arr.size() - 1; j++)",
                "for (int j = arr.size() - 1; j > 0; j--)",
                "for (int j = 0; j < i; j++)",
                "for (int j = i-1; j <=0; j--)",
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
            id: 12,
            type: "single",
            question: "上一题算法的时间复杂度为（ ）。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
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
            id: 13,
            type: "single",
            question: "下面代码实现了插入排序函数（升序），则横线上应填写（ ）。",
            options: [
                "while (j >= 0 && nums[j] > base)",
                "while (j > 0 && nums[j] > base)",
                "while (j >= 0 && nums[j] < base)",
                "while (j > 0 && nums[j] < base)",
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
            question: "小杨用文件重定向实现在log.txt文件中输出日志，则下面横线上应填写（ ）。 if (arr[j] > arr[j + 1]) { swap(arr, i, j); flag = true; } } if (!flag) break; // 此轮 “ 冒泡 ” 未交换任何元素 } } 12 13 14 15 16 17 18 19 20 21 void insertion_sort(vector<int> &nums) { for (int i = 1; i < nums.size(); i++) { int base = nums[i], j = i - 1; ________________________________ { // 在此处填入代码 nums[j + 1] = nums[j]; j--; } nums[j + 1] = base; } } 1 2 3 4 5 6 7 8 9 10 11 #include <iostream> #include <fstream> #include <string> using namespace std; 1 2 3 4",
            options: [
                "cout << \"This output will go to the log file.\" << endl;",
                "log_file << \"This output will go to the log file.\" << endl;",
                "cout >> \"This output will go to the log file.\" >> endl;",
                "log_file >> \"This output will go to the log file.\" >> endl;",
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
            question: "运⾏下面的代码，屏幕上将输出（ ）。",
            options: [
                "division by zero error result: caught an exception:",
                "result: caught an exception: division by zero error",
                "caught an exception: division by zero error",
                "division by zero error caught an exception: division by zero error int main() { ofstream log_file(\"log.txt\"); streambuf* original_cout = cout.rdbuf(); cout.rdbuf(log_file.rdbuf()); ___________________________________ // 在此处填入代码 cout.rdbuf(original_cout); // 恢复原始的标准输出缓冲区 return 0; } 5 6 7 8 9 10 11 12 13 14 15 16 #include <iostream> using namespace std; int divide(int a, int b) { if (b == 0) { throw runtime_error(\"division by zero error \"); } return a / b; } int main() { int x = 10; int y = 0; // 设为 0 会导致除零错误 try { int result = divide(x, y); cout << \"result: \" << result << endl; } catch (const runtime_error& e) { cout << \"caught an exception: \" << e.what() << endl; } return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            question: "代码 int a = 10; int* p = &a; 可以正确定义指针和初始化指针。",
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
            question: "在 C++ 中，引用传递允许函数修改传递给它的参数的值。",
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
            question: "指针的大小与其所指向的变量的数据类型的大小相同。",
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
            question: "二维数组的⾏的大小的必须在定义时确定，列的大小可以动态变化。",
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
            question: "递推算法通过逐步求解当前状态和前一个或⼏个状态之间的关系来解决问题。",
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
            question: "选择排序是稳定的排序算法。",
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
            question: "插入排序的时间复杂度总是比冒泡排序低。",
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
            question: "在 C++ 中，如果没有捕获到异常（没有匹配的 catch 块），程序会继续执⾏而不会终⽌。",
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
            question: "以下代码用递推法求斐波那契数列的第 项，时间复杂度为指数级。",
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
            question: "执⾏下面C++代码后，输出的是20。 int fibonacci(int n) { if (n == 0) return 0; if (n == 1) return 1; int f0 = 0; // F(0) int f1 = 1; // F(1) int current; for (int i = 2; i <= n; i++) { return current current = f0+ f1; // F(n) = F(n-1) + F(n-2) f0 = f1; f1 = current; } ; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 int point(int* p){ return *p * 2; } int main() { int a = 10; int* p = &a; *p = point(p); cout << *p << endl; } 1 2 3 4 5 6 7 8 9 10",
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
        }
    ]
};
