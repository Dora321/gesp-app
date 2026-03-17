// 2025年6月 GESP C++ 四级真题
export const paperData = {
    id: '2025-06-l4',
    title: '2025年6月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "在 C++ 中，声明一个指向整型变量的指针的正确语法是（ ）。",
            options: [
                "int* ptr;",
                "*int ptr;",
                "int ptr*;",
                "ptr int;",
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
            question: "下面的函数接收一个 ⾏ 列的二维数组并输出其中元素，则横线上不能填写（ ）。",
            options: [
                "int arr[3][4]",
                "int arr[][4]",
                "int (*arr)[4]",
                "int** arr",
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
            id: 3,
            type: "single",
            question: "在 C++ 中，int arr[3][4] 和 int* arr = new int[12] 均可模拟一个 ⾏ 列的二维数组。关于这两种方 式，下面说法错误的是（ ）。",
            options: [
                "int arr[3][4] 在栈上分配空间，适合数组较小的情况；",
                "int* arr = new int[12] 在堆上分配空间，数组较大时也适用；",
                "这两种方式申请的内存空间都是连续的。",
                "这两种方式申请的内存都能⾃动释放。",
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
            id: 4,
            type: "single",
            question: "关于以下 C++ 代码，说法正确的是（ ）。 void printArray(________) { for (int i = 0; i < 3; ++i) for (int j = 0; j < 4; ++j) std::cout << arr[i][j] << \" \"; } 1 2 3 4 5",
            options: [
                "正确编译并输出 Hello!",
                "编译错误：找不到函数 greet()",
                "编译警告但可以运⾏",
                "链接错误",
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
            question: "在C++中，如果希望通过函数修改传入的结构体对象的内容，应该使用哪种参数传递方式？",
            options: [
                "值传递或引用传递",
                "值传递或指针传递",
                "引用传递或指针传递",
                "仅指针传递",
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
            id: 6,
            type: "single",
            question: "以下哪个选项正确描述了C++中形参和实参的区别？",
            options: [
                "形参是函数调用时传递给函数的具体值，实参是函数定义中声明的变量。",
                "形参是函数定义中声明的变量，实参是函数调用时传递给函数的具体值。",
                "形参和实参在函数调用时是完全相同的。",
                "形参只在函数内部可见，实参在函数外部可见。",
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
            id: 7,
            type: "single",
            question: "运⾏如下代码会输出（ ）。",
            options: [
                "100 100 100",
                "50 50 50",
                "50 100 100",
                "50 50 100 int main() { greet(); return 0; } void greet() { cout << \"Hello!\" << endl; } 1 2 3 4 5 6 7 8 int value = 100; void print1() { int value = 50; cout << value << \" \"; cout << ::value << \" \"; } void print2() { cout << value << \" \"; } print1(); print2(); 1 2 3 4 5 6 7 8 9 10 11 12 13 14",
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
            id: 8,
            type: "single",
            question: "小杨在整理一副扑克牌的所有红⼼扑克牌，使其从小到大排列。他的做法是：最开始抓到第 1 张扑克牌被认 为已经排好序；然后抓第 2 张扑克牌，将其插入⾄有序部分的正确位置；不断循环步骤，每次将新抓到扑克牌插入⾄ 有序部分，直⾄抓完所有扑克牌，这样抓牌结束时就完成了扑克牌的排序。小杨这种整理扑克牌的方式与（ ）排序 的方式最接近。",
            options: [
                "冒泡排序",
                "插入排序",
                "选择排序",
                "直接排序",
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
            id: 9,
            type: "single",
            question: "以下哪种情况是使用插入排序的合适场景？",
            options: [
                "数据量非常大，且乱序严重",
                "希望获得稳定排序，但不要求实时性",
                "数据⼏乎有序，只需少量调整",
                "想在交换次数最少的前提下排好大数组",
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
            id: 10,
            type: "single",
            question: "以下关于递推算法基本思想的描述，正确的是（ ）。",
            options: [
                "递推算法通过将问题分解为相互独⽴的子问题来解决。",
                "递推算法从已知的基础情况出发，通过某种关系逐步推导出更大规模问题的解。",
                "递推算法通常用于穷举所有可能的解决方案。",
                "递推算法适用于在每一步做出局部最优选择以达到全局最优。",
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
            question: "给定如下算法，其时间复杂度为（ ）。",
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
            question: "下述斐波那契数列计算的时间复杂度是（ ）。 bool f(int arr[], int n, int target) { for (int i = 0; i < n; i++) { int sum = 0; for (int j = 0; j < n; j++) { if (i & (1 << j)) { sum += arr[j]; } } if (sum == target) return true; } return false; } 1 2 3 4 5 6 7 8 9 10 11 12",
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
            id: 13,
            type: "single",
            question: "关于下面 C++ 程序的描述，（ ）最准确。",
            options: [
                "将从标准输入读取每⾏，并输出到屏幕",
                "程序无法运⾏，因为 getline 只能读取 cin",
                "将 data.txt 中的每一⾏读取并输出到屏幕",
                "程序将创建 data.txt 并写入默认文本",
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
            id: 14,
            type: "single",
            question: "在C++中，异常处理机制（try-catch块）的主要目的是( )。",
            options: [
                "提高程序的运⾏速度。",
                "在程序发生运⾏时错误时，提供一种结构化的错误处理方式。",
                "确保程序在编译时没有错误。",
                "减少程序的内存占用。",
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
            id: 15,
            type: "single",
            question: "为了提高冒泡排序的效率，如果某轮“冒泡”中没有执⾏任何交换操作，说明数组已经完成排序，可直接返 回结果，则两条横线上分别应该填写（ ）。",
            options: [
                "int fibonacci(int n) { if (n == 0) return 0; if (n == 1) return 1; return fibonacci(n - 1) + fibonacci(n - 2); } 1 2 3 4 5 6 ifstream in(\"data.txt\"); string line; while (getline(in, line)) { cout << line << endl; } 1 2 3 4 5 void bubbleSortWithFlag(vector<int> &nums) { for (int i = nums.size() - 1; i > 0; i--) { bool flag; ________________ // 在此处填入代码 for (int j = 0; j < i; j++) { if (nums[j] > nums[j + 1]) { swap(nums[j], nums[j + 1]); ___________________________ // 在此处填入代码 } } if (!flag) break; } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            id: 16,
            type: "judge",
            question: "下面C++代码正确声明了一个返回 int 类型、接受两个 int 参数的函数。",
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
            question: "下面C++代码的输出是 15 。",
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
            question: "下面c++代码在一个结构体中⼜定义了别的结构体。这种结构嵌套定义的方式语法不正确。 flag = false; flag = false; 1 2 flag = false; flag = true; 1 2 flag = true; flag = false; 1 2 flag = true; flag = true; 1 2 int add(int, int);1 void foo(int x) { x += 5; } int main() { int a = 10; foo(a); cout << a << endl; } 1 2 3 4 5 6 7 8 #include <string> #include <vector> using namespace std; struct Library { struct Book { struct Author { string name; int birthYear; }; string title; int year; Author author; }; string name; vector<Book> books; 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
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
            question: "在 C++ 中，相比于值传递，使用引用传递作的优点可以直接操作和修改原始变量，避免数据拷贝，提高效 率。",
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
            question: "下面这段代码不合法，因为每一⾏都必须显式初始化 个元素。 int arr[2][3] = {{1, 2}, {3}};",
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
            question: "以下程序中使用了递推方式计算阶乘（ ），计算结果正确。",
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
            question: "无论初始数组是否有序，选择排序都执⾏ 次比较",
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
            question: "以下 C++ 代码，尝试对有n 个整数的数组arr 进⾏排序。这个代码实现了选择排序算法。",
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
            question: "如果一个异常在 try 块中抛出但没有任何 catch 匹配，它将在编译时报错。",
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
            question: "下面 C++ 代码实现将 Hello 写入 data.txt 。",
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
            question: "【问题描述】\n小 A 在高为 h 宽为 w 的矩形画布上绘制了一幅画。由于画布边缘留白太多，小 A 想适当地裁剪画布，只保留画的主体。具体来说，画布可以视为 h 行 w 列的字符矩阵，其中的字符均为 ASCII 码位于 33∼126 之间的可见字符，小 A 只保留画布中由第 x1 行到第 x2 行、第 y1 列到第 y2 列构成的子矩阵。\n小 A 将画布交给了你，你能帮他完成画布的裁剪吗？\n【输入描述】\n第一行，两个正整数 h, w，分别表示画布的行数与列数。\n第二行，四个正整数 x1, x2, y1, y2，表示保留的行列边界。\n接下来 h 行，每行一个长度为 w 的字符串，表示画布内容。\n【输出描述】\n输出共 x2−x1+1 行，每行一个长度为 y2−y1+1 的字符串，表示裁剪后的画布。\n【样例输入1】\n3 5\n2 2 2 4\n.....\n.>_<.\n.....\n【样例输出1】\n>_<",
            score: 25,
            explanation: "该题为基础的矩阵裁剪问题。根据输入的四个边界坐标 (x1, x2, y1, y2)，使用嵌套循环遍历并输出原矩阵中对应的子区域即可。",
            tags: [
                "编程题",
                "GESP4级",
            ]
        },
        {
            id: 27,
            type: "programming",
            question: "【问题描述】\n体育课上有 n 名同学排成一队，从前往后数第 i 位同学的身高为 hi，体重为 wi。目前排成的队伍看起来参差不齐，老师希望同学们能按照身高从高到低的顺序排队，如果身高相同则按照体重从重到轻排序。在调整队伍时，每次只能交换相邻两位同学的位置。老师想知道，最少需要多少次交换操作，才能将队伍调整成目标顺序。\n【输入描述】\n第一行，一个正整数 n，表示队伍人数。\n接下来 n 行，每行两个正整数 hi 和 wi，分别表示第 i 位同学的身高和体重。\n【输出描述】\n输出一行，一个整数，表示最少需要的交换次数。\n【样例输入1】\n5\n1 60\n3 70\n2 80\n4 55\n4 50\n【样例输出1】\n8",
            score: 25,
            explanation: "本题要求计算将初始队列调整为目标有序队列所需的最少相邻交换次数，即求原序列的“逆序对”数。由于是要按身高从高到低、体重从重到轻排序，我们可以直接使用冒泡排序或插入排序等模拟相邻交换的过程，统计交换次数即可。",
            tags: [
                "编程题",
                "GESP4级",
            ]
        }
    ]
};

