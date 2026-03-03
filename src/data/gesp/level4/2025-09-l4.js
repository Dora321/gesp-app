// 2025年9月 GESP C++ 四级真题
export const paperData = {
    id: '2025-09-l4',
    title: '2025年9月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "运⾏下面程序后变量a的值是（ ）。",
            options: [
                "42",
                "43",
                "编译错误",
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
            id: 2,
            type: "single",
            question: "以下关于数组的描述中，（ ）是错误的。",
            options: [
                "数组名是一个指针常量",
                "随机访问数组的元素方便快捷",
                "数组可以像指针一样进⾏⾃增操作",
                "sizeof(arr) 返回的是整个数组arr占用的字节数",
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
            id: 3,
            type: "single",
            question: "给定如下定义的数组arr，则*(*(arr + 1) + 2)的值是（ ）。",
            options: [
                "2",
                "5",
                "4",
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
            id: 4,
            type: "single",
            question: "下面这段代码会输出（ ）。 int a = 42; int* p = &a; *p = *p + 1; 1 2 3 int arr[2][3] = {{1, 2, 3}, {4, 5, 6}};1",
            options: [
                "3 5",
                "编译失败：定义处少了默认参数",
                "运⾏错误",
                "链接失败：未定义引用",
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
            id: 5,
            type: "single",
            question: "下面这段代码会输出（ ）。",
            options: [
                "5 5",
                "10 10",
                "5 10",
                "10 5",
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
            question: "下面程序运⾏的结果是（ ）。",
            options: [
                "6 7",
                "6 6",
                "5 6 int add(int a, int b = 1); // 函数声明 int main() { cout << add(2) << \" \" << add(2, 3); return 0; } int add(int a, int b) { // 函数定义 return a + b; } 1 2 3 4 5 6 7 8 9 10 int x = 5; void foo() { int x = 10; cout << x << \" \"; } void bar() { cout << x << \" \"; } int main() { foo(); bar(); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 void increaseA(int x) { x++; } void increaseB(int* p) { (*p)++; } int main() { int a = 5; increaseA(a); cout << a << \" \"; increaseB(&a); cout << a; } 1 2 3 4 5 6 7 8 9 10 11 12 13",
                "5 5",
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
            question: "关于结构体初始化，以下哪个选项中正确的是（ ）。",
            options: [
                "Point p = (1,2);",
                "Point p = {1,2};",
                "Point p = new {1,2};",
                "Point p = <1,2>;",
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
            question: "运⾏如下代码会输出（ ）。",
            options: [
                "Mimi 2",
                "Mimi 3",
                "kitty 3",
                "kitty 2",
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
            question: "关于排序算法的稳定性，以下说法错误的是（ ）。",
            options: [
                "稳定的排序算法不改变相等元素的相对位置",
                "冒泡排序是稳定的排序算法",
                "选择排序是稳定的排序算法",
                "插入排序是稳定的排序算法",
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
            question: "下面代码试图实现选择排序，使其能对数组 nums 排序为升序，则横线上应分别填写（ ）。",
            options: [
                "struct Point {int x,y;};1 struct Cat { string name; int age; }; void birthday(Cat& c) { c.age++; } int main() { Cat kitty{\"Mimi\", 2}; birthday(kitty); cout << kitty.name << \" \" << kitty.age; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 void selectionSort(vector<int>& nums) { int n = nums.size(); for (int i = 0; i < n - 1; ++i) { int minIndex = i; for (int j = i + 1; j < n; ++j) { if ( __________ ) { // 在此处填入代码 minIndex = j; } } ____________________; // 在此处填入代码 } } 1 2 3 4 5 6 7 8 9 10 11 12",
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
            id: 11,
            type: "single",
            question: "下面程序实现插入排序（升序排序），则横线上应分别填写（ ）。",
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
            id: 12,
            type: "single",
            question: "关于插入排序的时间复杂度，下列说法正确的是（ ）。",
            options: [
                "最好情况和最坏情况的时间复杂度都是",
                "最好情况是 ，最坏情况是",
                "最好情况是 ，最坏情况是",
                "最好情况是 ，最坏情况是",
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
            question: "小杨正在爬楼梯，需要 阶才能到达楼顶，每次可以爬 阶或 阶，求小杨有多少种不同的方法可以爬到 楼顶，横线上应填写（ ）。 nums[j] < nums[minIndex] swap(nums[i], nums[minIndex]) 1 2 nums[j] > nums[minIndex] swap(nums[i], nums[minIndex]) 1 2 nums[j] <= nums[minIndex] swap(nums[j], nums[minIndex]) 1 2 nums[j] <= nums[minIndex] swap(nums[i], nums[j]) 1 2 void insertionSort(int arr[], int n) { for (int i = 1; i < n; i++) { int key = arr[i]; int j = i - 1; while ( j >= 0 && ____________________ ) { // 在此处填入代码 arr[j + 1] = arr[j]; j--; } ____________________; // 在此处填入代码 } } 1 2 3 4 5 6 7 8 9 10 11 arr[j] > key arr[j + 1] = key 1 2 arr[j] < key arr[j + 1] = key 1 2 arr[j] > key arr[j] = key 1 2 arr[j] < key arr[j] = key 1 2",
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
            id: 14,
            type: "single",
            question: "假设有一个班级的成绩单，存储在一个长度为 n 的数组 scores 中，每个元素是一个学生的分数。⽼师 想要找出 所有满⾜ scores[i] + scores[j] + scores[k] == 300 的三元组，其中 i < j < k。下面代码实现该功 能，请问其时间复杂度是（ ）。",
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
            question: "关于异常处理，以下说法错误的是（ ）。",
            options: [
                "try 块中的代码可能会抛出异常",
                "catch 块可以有多个，处理不同类型的异常 int climbStairs(int n) { if (n <= 2) return n; int prev2 = 1; int prev1 = 2; int current = 0; for (int i = 3; i <= n; ++i) { ________________ // 在此处填入代码 } return current; } 1 2 3 4 5 6 7 8 9 10 11 prev2 = prev1; prev1 = current; current = prev1 + prev2; 1 2 3 current = prev1 + prev2; prev2 = prev1; prev1 = current; 1 2 3 current = prev1 + prev2; prev1 = current; prev2 = prev1; 1 2 3 prev1 = current; prev2 = prev1; current = prev1 + prev2; 1 2 3 int cnt = 0; for (int i = 0; i < n; i++) { for (int j = i + 1; j < n; j++) { for (int k = j + 1; k < n; k++) { if (scores[i] + scores[j] + scores[k] == 300) { cnt++; } } } } 1 2 3 4 5 6 7 8 9 10 11 题号 1 2 3 4 5 6 7 8 9 10 答案",
                "throw 语句用于抛出异常",
                "所有异常都必须被捕获，否则程序会崩溃",
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
            id: 16,
            type: "judge",
            question: "以下代码能正确初始化指针。",
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
            question: "执⾏下面 C++ 代码将输出 11。",
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
            question: "以下 C++ 代码合法。",
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
            question: "执⾏下面 C++ 代码将输出 10。",
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
            question: "下面代码将二维数组arr传递给函数f，函数内部用arr[i][j]访问元素，函数参数声明为int arr[] [4]是错误的。 int a = 5; int *p = a; 1 2 int x = 10; void f() { int x = x + 1; cout << x << endl; } int main() { f(); } 1 2 3 4 5 6 7 8 9 struct Student { string name; int age; float score; }; Student* students = new Student[20]; 1 2 3 4 5 6 void func(int* p) { *p = 10; } int main() { int a = 5; func(&a); cout << a << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 void f(int arr[][4], int rows) { // 访问 arr[i][j] } int main() { int arr[3][4] = { /* 初始化 */ }; f(arr, 3); } 1 2 3 4 5 6 7 8",
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
            id: 21,
            type: "judge",
            question: "递推是在给定初始条件下，已知前一项（或前⼏项）求后一项的过程。",
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
            question: "虽然插入排序的时间复杂度为 ，但由于单元操作相对较少，因此在小数据量的排序任务中非常受欢 迎。",
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
            question: "对整数数组{4, 1, 3, 1, 5, 2}进⾏冒泡排序（将最大元素放到最后），执⾏一轮之后是{4, 1, 3, 1, 2, 5}。",
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
            question: "以下代码只能捕获int类型异常。",
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
            question: "以下代码将 Hello 写入文件 data.txt。",
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
