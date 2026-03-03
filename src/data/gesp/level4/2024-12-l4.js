// 2024年12月 GESP C++ 四级真题
export const paperData = {
    id: '2024-12-l4',
    title: '2024年12月 GESP C++ 四级真题',
    level: 4,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "下面的语句中，（ ）正确定义了一个计算浮点数 的平方 ( ) 的函数 , 并成功调用该函数。",
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
            id: 2,
            type: "single",
            question: "下面代码的描述中，正确的是（ ）。 float square(float x) { return x * x; } float area = square(2); 1 2 3 4 square(float x) { return x * x; } float area = square(2); 1 2 3 4 void square(float x) { return x * x; } area = square(2.0); 1 2 3 4 void square(float x) { x * x; return; } area = square(2); 1 2 3 4 5",
            options: [
                "代码执⾏结束后，times的值为 0",
                "n是形参，times是实参",
                "n是实参，times是形参",
                "代码最后一⾏换成n_chars(times, my_char);也可以",
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
            question: "给定以下代码， 执⾏上述代码后，变量a的值为（ ）。",
            options: [
                "5",
                "10",
                "15",
                "20",
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
            question: "运⾏下面代码，屏幕上输出是（ ）。",
            options: [
                "0.2",
                "0.5",
                "1.2",
                "1.5",
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
            question: "运⾏下面代码⽚段后，x和*p的结果分别是（ ）。 void n_chars(char c, int n) { while (n-- > 0) cout << c; } char my_char = 'w'; int times = 5; n_chars(my_char, times); 1 2 3 4 5 6 7 8 void func(int& x) { x = x * 2; } int a = 5; func(a); 1 2 3 4 5 6 double* p_arr = new double [3]; p_arr[0] = 0.2; p_arr[1] = 0.5; p_arr[2] = 0.8; p_arr += 1; cout << p_arr[0] << endl; p_arr -= 1; delete p_arr; 1 2 3 4 5 6 7 8",
            options: [
                "20 20",
                "20 22",
                "22 20",
                "22 22",
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
            question: "下面的描述中，（ ）不能正确定义一个名为Student的结构体以及一个包含 20 个元素的结构数组。",
            options: [
                "选项A",
                "选项B",
                "选项C",
                "选项D",
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
            id: 7,
            type: "single",
            question: "假定整型是 32 位，对一个 ⾏ 列的二维整数数组array, 假设数组第一个元素在内存中的地址为 0x7ffee4065820，则第 2 ⾏第 2 个元素的地址&array[1][1]为（ ）。 int x = 20; int* p = &x; *p = *p + 2； 1 2 3 struct Student { string name; int age; float score; }; struct Student students[20]; 1 2 3 4 5 6 struct Student { string name; int age; float score; }; Student students[20]; 1 2 3 4 5 6 struct Student { string name; int age; float score; }; Student* students = new Student[20]; 1 2 3 4 5 6 struct Student { string name; int age; float score; }; Student students = new Student[20]; 1 2 3 4 5 6",
            options: [
                "0x7ffee4065824",
                "0x7ffee4065828",
                "0x7ffee406582c",
                "0x7ffee4065830",
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
            question: "下面（ ）正确定义二维数组。",
            options: [
                "int a[3][];",
                "int a[][];",
                "int a[][4];",
                "int a[][2] = {{1,2},{1,2},{3,4}};",
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
            question: "下面代码采用递推算法来计算斐波那契数列 ，则横线上应填写（ ）。",
            options: [
                "选项A",
                "选项B",
                "int array[2][3] = { {0, 1, 2}, {3, 4, 5} }; 1 2 3 4 int fib(int n) { if (n == 0 || n == 1) return n; int f1 = 0; int f2 = 1; int result = 0; for (int i = 2; i <= n; i++) { ________________________________ // 在此处填入代码 } return result; } 1 2 3 4 5 6 7 8 9 10 11 12 result = f1 + f2; f1 = f2; f2 = result; 1 2 3 result += f1 + f2; f1 = f2; f2 = result; 1 2 3 result += f1 + f2; f2 = result; f1 = f2; 1 2 3",
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
            id: 10,
            type: "single",
            question: "下面关于排序算法（冒泡排序、插入排序和选择排序）的描述中，不正确的是（ ）。",
            options: [
                "冒泡排序基于元素交换实现，需借助临时变量，共涉及 个单元操作；而插入排序基于元素赋值实现，仅需 个单元操作。因此冒泡排序的计算开销通常比插入排序更高。",
                "选择排序在任何情况下的时间复杂度都为 。",
                "冒泡排序在任何情况下的时间复杂度都为 。",
                "如果给定数据部分有序，插入排序通常比选择排序效率更高。",
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
            id: 11,
            type: "single",
            question: "冒泡排序的第一轮操作是从左到右遍历数组，通过两两比较相邻元素，将当前最大的元素移动到末尾。给 定数组arr[]={4, 1, 3, 1, 5, 2}，执⾏第一轮冒泡排序后数组arr中的内容为（ ）。",
            options: [
                "1, 4, 3, 1, 5, 2",
                "1, 3, 1, 4, 2, 5",
                "1, 4, 3, 1, 2, 5",
                "4, 1, 3, 1, 5, 2",
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
            question: "给定如下代码，其时间复杂度为（ ）。",
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
            id: 13,
            type: "single",
            question: "下面代码实现了插入排序函数，则横线上应填写（ ）。 result = f1 + f2; f2 = result; f1 = f2; 1 2 3 int cellRecur(int n) { if (n == 1) return 1; return cellRecur(n - 1) + cellRecur(n - 1) + 1; } 1 2 3 4 5",
            options: [
                "int base = nums[i], j = i - 1;",
                "int base = nums[i], j = i;",
                "int base = nums[0], j = i - 1;",
                "int base = nums[0], j = i;",
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
            question: "下面哪种方式不能实现将字符串 \"Welcome to GESP!\" 输出重定向到文件log.txt（ ）。",
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
            id: 15,
            type: "single",
            question: "运⾏下面的代码，将出现什么情况？（ ） void insertion_sort(vector<int> &nums) { for (int i = 1; i < nums.size(); i++) { ________________________________ { // 在此处填入代码 while (j >= 0 && nums[j] > base) nums[j + 1] = nums[j]; j--; } nums[j + 1] = base; } } 1 2 3 4 5 6 7 8 9 10 11 12 13 freopen(\"log.txt\", \"w\", stdout); cout << \"Welcome to GESP!\" << endl; fclose(stdout); 1 2 3 std::ofstream outFile(\"log.txt\"); outFile << \"Welcome to GESP!\" << endl; outFile.close(); 1 2 3 std::ofstream outFile(\"log.txt\"); cout << \"Welcome to GESP!\" << endl; outFile.close(); 1 2 3 ofstream log_file(\"log.txt\"); streambuf* org_cout = cout.rdbuf(); cout.rdbuf(log_file.rdbuf()); cout << \"This output will go to the log file.\" << endl; cout.rdbuf(oorg_cout); 1 2 3 4 5 double hmean(double a, double b) { if (a == -b ) throw runtime_error(\"Runtime error occurred\"); 1 2 3 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "屏幕上输出Caught: Runtime error occurred",
                "屏幕上输出Caught an unknown exception",
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
            id: 16,
            type: "judge",
            question: "在 C++ 中，下面代码可以正确定义指针和初始化指针。",
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
            question: "一个函数必须在调用之前既声明⼜定义。",
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
            question: "函数参数可以通过值传递、引用传递和指针传递，这样函数内对参数的修改可以直接修改传入变量的值。",
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
            question: "int arr[3][]是一个正确的二维数组的声明。",
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
            id: 21,
            type: "judge",
            question: "某算法的递推关系式为 （ 为正整数）及 ，则该算法的时间复杂度为 。",
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
            question: "冒泡排序的平均时间复杂度为 ，但最优情况下为 。",
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
            question: "冒泡排序和插入排序都是稳定的排序算法。",
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
            id: 25,
            type: "judge",
            question: "在 C++ 语⾔中，如果一个函数可能抛出异常，那么一定要在 try 子句⾥调用这个函数。 return 2.0*a*b/(a + b); } int main() { double x = 10; double y = -10; try { int result = hmean(x, y); cout << \"hmean: \" << result << endl; } catch (const runtime_error& e) { cout << \"Caught: \" << e.what() << endl; } catch (...) { cout << \"Caught an unknown exception.\" << endl; } return 0; } 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 int* ptr; *ptr = 10; 1 2",
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
