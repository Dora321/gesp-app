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
        },
        {
            id: 26,
            type: "programming",
            question: "【问题描述】\n作为将军，你自然需要合理地排兵布阵。地图可以视为 n 行 m 列的网格，适合排兵的网格以 1 标注，不适合排兵的网格以 0 标注。现在你需要在地图上选择一个矩形区域排兵，这个矩形区域内不能包含不适合排兵的网格。请问可选择的矩形区域最多能包含多少网格？\n【输入描述】\n第一行，两个正整数 n, m，分别表示地图网格的行数与列数。\n接下来 n 行，每行 m 个整数 ai,1, ai,2, …, ai,m，表示各行中的网格是否适合排兵。\n【输出描述】\n一行，一个整数，表示适合排兵的矩形区域包含的最大网格数。\n【样例输入1】\n4 3\n0 1 1\n1 0 1\n0 1 1\n1 1 1\n【样例输出1】\n4",
            score: 25,
            explanation: "该问题可以转化为求“全 1 子矩阵的最大面积”。由于数据范围较小，可以枚举所有可能的子矩阵，并检查其内是否全为 1。为了提高效率，可以使用二维前缀和，如果子矩阵的元素之和等于其面积，说明该矩阵全为 1。",
            tags: [
                "编程题",
                "GESP4级",
            ]
        },
        {
            id: 27,
            type: "programming",
            question: "【问题描述】\n对于 k 个整数构成的数组 [b1, b2, …, bk]，如果对 1 ≤ i < k 都有 bi+1 = bi + 1，那么称数组 b 是一个连续段。\n给定由 n 个整数构成的数组 [a1, a2, …, an]，你可以任意重排数组 a 中元素顺序。请问在重排顺序之后，a 所有是连续段的子数组中，最长的子数组长度是多少？\n例如，对于数组 [1, 0, 2, 4]，可以将其重排为 [4, 0, 1, 2]，其子数组中 [0, 1, 2] 是连续段，长度为 3。\n【输入描述】\n第一行，一个正整数 n，表示数组长度。\n第二行，n 个整数 a1, a2, …, an，表示数组中的整数。\n【输出描述】\n一行，一个整数，表示数组 a 重排顺序后，所有是连续段的子数组的最长长度。\n【样例输入1】\n4\n1 0 2 4\n【样例输出1】\n3",
            score: 25,
            explanation: "重排后能构成的最长“连续段”，本质上是原数组去重排序后，能够构成的最长“连续整数序列”。因此，解法为：先对数组进行去重、排序，然后遍历排序后的数组，寻找最长的连续递增片段（差值为 1）。",
            tags: [
                "编程题",
                "GESP4级",
            ]
        }
    ]
};

