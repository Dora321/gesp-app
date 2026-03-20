// 2025年12月 GESP C++ 四级真题
export const paperData = {
    id: '2025-12-l4',
    title: '2025年12月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 12,
    session: 12,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: "小杨想让指针 p 指向整数变量 x，正确写法是（ ）。",
            options: [
                "int p = &x;",
                "int *p = x;",
                "int *p = &x;",
                "p = *x;",
            ],
            answer: 2,
            score: 2,
            explanation: "正确声明指针并指向变量地址的语法是 int *p = &x;。& 是取地址符。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: "小杨写了如下的指针接力程序，程序执⾏完后变量 a、*p1和*p2的值分别是（ ）。\n```cpp\nint a = 5;\nint* p1 = &a;\nint* p2 = p1;\n*p2 = 10;\n```",
            options: [
                "5 10 10",
                "5 10 15",
                "10 10 10",
                "5 5 10",
            ],
            answer: 2,
            score: 2,
            explanation: "p1 指向 a，p2 指向 p1 所指的对象（也是 a）。执行 *p2 = 10 直接修改了 a 的值为 10。因此 a、*p1、*p2 的值都变为 10。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: "小杨用一个二维数组表⽰棋盘，其中 1 表⽰有棋子， 0 表⽰没有棋子。他想知道第 2 ⾏ 第 3 列有没有棋子， 可采用的代码是：（ ）。\n```cpp\nint a[3][4] = {\n    {1, 0, 1, 0},\n    {0, 1, 0, 1},\n    {1, 1, 0, 0}\n};\n```",
            options: [
                "cout << a[1, 2] << endl;",
                "cout << a[1][2] << endl;",
                "cout << a(1, 2) << endl;",
                "cout << a{1}{2} << endl;",
            ],
            answer: 1,
            score: 2,
            explanation: "C++ 二维数组使用下标 [i][j] 访问。第 2 行对应索引 1，第 3 列对应索引 2（下标从 0 开始）。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: "执⾏完下面的代码后，*(p + 5) 和 arr[1][1]的值分别是（ ）。\n```cpp\nint arr[3][4] = {{1,2,3,4}, {5,6,7,8}, {9,10,11,12}};\nint* p = &arr[0][0];\n```",
            options: [
                "5 6",
                "6 5",
                "5 5",
                "6 6",
            ],
            answer: 3,
            score: 2,
            explanation: "二维数组在内存中按行优先存储。p 指向起始位置。p+5 偏移 5 个位置，对应元素是 arr[1][1]（第 0 行 4 个加第 1 行第 2 个）。arr[1][1] 的值是 6。*(p+5) 也是 6。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: "执⾏完下面的代码后，sum 的值是（ ）。\n```cpp\nint arr[2][3][2] = {\n    {{1,2}, {3,4}, {5,6}},\n    {{7,8}, {9,10}, {11,12}}\n};\nint sum = 0;\nfor(int i = 0; i < 2; i++)\n    for(int j = 0; j < 3; j++)\n        for(int k = 0; k < 2; k++)\n            if((i+j+k) % 2 == 0)\n                sum += arr[i][j][k];\n```",
            options: [
                "36",
                "39",
                "78",
                "30",
            ],
            answer: 1,
            score: 2,
            explanation: "满足条件的索引 (i,j,k) 为：(0,0,0), (0,1,1), (0,2,0), (1,0,1), (1,1,0), (1,2,1)。对应值为：1, 4, 5, 8, 9, 12。总和为 39。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: "执⾏完下面的代码后，输出是（ ）。\n```cpp\nint a = 1;\nvoid test() {\n    int a = 2;\n    {\n        int a = 3;\n        a++;\n    }\n    a++;\n    cout << a << \" \";\n}\nint main() {\n    test();\n    cout << a;\n    return 0;\n}\n```",
            options: [
                "3 1",
                "4 1",
                "3 2",
                "4 2",
            ],
            answer: 0,
            score: 2,
            explanation: "test 函数内的局部 a 为 2。花括号内的 a 是另一个局部变量，不影响主局部 a。a++ 使局部 a 变为 3，输出 3。随后 main 中输出全局 a，值为 1。输出 3 1。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: "执⾏完下面的代码后，a 、b 和 c 的值分别是（ ）。\n```cpp\nvoid byValue(int x) { x = 100; }\nvoid byRef(int& x) { x = 200; }\nvoid byPointer(int* x) { *x = 300; }\nint main() {\n    int a = 1, b = 2, c = 3;\n    byValue(a);\n    byRef(b);\n    byPointer(&c);\n    return 0;\n}\n```",
            options: [
                "100 200 300",
                "1 2 3",
                "1 200 300",
                "1 2 300",
            ],
            answer: 2,
            score: 2,
            explanation: "值传递不改变实参 (a 为 1)；引用传递改变实参 (b 变为 200)；指针传递改变实参 (c 变为 300)。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: "运⾏如下代码会输出（ ）。\n```cpp\nstruct Point { int x, y; };\nstruct Rectangle { Point topLeft; Point bottomRight; };\nint main() {\n    Rectangle rect = {{10, 10}, {20, 20}};\n    rect.topLeft.x = 5;\n    Point* p = &rect.bottomRight;\n    p->y = 5;\n    cout << rect.topLeft.x + rect.bottomRight.y;\n    return 0;\n}\n```",
            options: [
                "10",
                "30",
                "15",
                "20",
            ],
            answer: 0,
            score: 2,
            explanation: "rect.topLeft.x 被改为 5。p 指向 bottomRight，p->y = 5 将 bottomRight.y 改为 5。5 + 5 = 10。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: "给定函数 climbStairs(int n) 的定义如下，则 climbStairs(5) 的返回的值是（ ）。\n```cpp\nint climbStairs(int n) {\n    if(n <= 2) return n;\n    int a = 1, b = 2;\n    for(int i = 3; i <= n; i++) {\n        int temp = a + b;\n        a = b;\n        b = temp;\n    }\n    return b;\n}\n```",
            options: [
                "5",
                "8",
                "13",
                "10",
            ],
            answer: 1,
            score: 2,
            explanation: "递推过程：i=3, b=3, a=2; i=4, b=5, a=3; i=5, b=8, a=5。返回 8。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: "对如下 4 个扑克牌进⾏排序， 使用某排序算法按 value 排序后，结果为 : {3,'D'}, {3,'B'}, {5,'A'}, {5,'C'}，则这个排序算法是稳定的吗？\n```cpp\nstruct Card { int value; char suit; };\nCard cards[4] = {{5,'A'}, {3,'B'}, {5,'C'}, {3,'D'}};\n```",
            options: [
                "稳定，因为相同 value 的元素相对顺序保持不变",
                "不稳定，因为 {3,'D'} 出现在 {3,'B'} 之前",
                "无法判断",
                "稳定，因为结果是有序的",
            ],
            answer: 1,
            score: 2,
            explanation: "原数列中 {3,'B'} 在 {3,'D'} 之前。结果中顺序反了，因此是不稳定的。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: "下面的函数 selectTopK() 实现从 n 个学生中选出前 k 名成绩最好的学生颁发奖学⾦，则横线上应填写（ ）。\n```cpp\nstruct Student { string name; int score; };\nvoid selectTopK(Student students[], int n, int k) {\n    for (int i = 0; i < k; i++) {\n        int maxIdx = i;\n        for (____________________) { // 在此处填入代码\n            if (students[j].score > students[maxIdx].score) {\n                maxIdx = j;\n            }\n        }\n        if (maxIdx != i) {\n            Student temp = students[i];\n            students[i] = students[maxIdx];\n            students[maxIdx] = temp;\n        }\n    }\n}\n```",
            options: [
                "int j = 0; j < n; j++",
                "int j = i + 1; j < n; j++",
                "int j = i; j < n; j++",
                "int j = 1; j <= n; j++",
            ],
            answer: 1,
            score: 2,
            explanation: "选择排序思想的一半应用。每一趟从当前位置 i 之后的剩余元素中找最大值，故 j 从 i + 1 开始。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: "某游戏的排⾏榜系统需要实时更新玩家分数。每次只有一个玩家的分数发生变化，排⾏榜已经是按分数降序排列的。现在需要将更新后的玩家调整到正确位置。下面的函数 updateRanking() 要实现上述功能，则两处横线上应分别填写（ ）。\n```cpp\nvoid updateRanking(Player players[], int size, int playerIdx) {\n    Player updatedPlayer = players[playerIdx];\n    if (playerIdx > 0 && updatedPlayer.score > players[playerIdx - 1].score) {\n        int i = playerIdx;\n        while (____________________) {\n            players[i] = players[i - 1];\n            i--;\n        }\n        players[i] = updatedPlayer;\n    } else if (playerIdx < size - 1 && updatedPlayer.score < players[playerIdx + 1].score) {\n        int i = playerIdx;\n        while (____________________) {\n            players[i] = players[i + 1];\n            i++;\n        }\n        players[i] = updatedPlayer;\n    }\n}\n```",
            options: [
                "i > 0 && updatedPlayer.score > players[i-1].score | i < size-1 && updatedPlayer.score < players[i+1].score",
                "i < size-1 && updatedPlayer.score < players[i+1].score | i > 0 && updatedPlayer.score > players[i-1].score",
                "i > 0 && updatedPlayer.score < players[i-1].score | i < size-1 && updatedPlayer.score < players[i+1].score",
                "i > 0 && updatedPlayer.score < players[i-1].score | i < size-1 && updatedPlayer.score > players[i+1].score",
            ],
            answer: 0,
            score: 2,
            explanation: "如果分数增加，与前面的比较，若比前一个大则前一个后移 (i > 0 && score > players[i-1].score)；如果分数减少，与后面的比较，若比后一个小则后一个前移。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: "给定如下算法，其时间复杂度为（ ）。\n```cpp\nbool f(int arr[], int n, int target) {\n    for (int i = 0; i < n; i++) {\n        int sum = 0;\n        for (int j = 0; j < n; j++) {\n            if (i & (1 << j)) {\n                sum += arr[j];\n            }\n        }\n        if (sum == target) return true;\n    }\n    return false;\n}\n```",
            options: [
                "$$$O(N)$$$",
                "$$$O(N^2)$$$",
                "O($$2^n$$)",
                "O(n * $$2^n$$)",
            ],
            answer: 1,
            score: 2,
            explanation: "代码中包含两层嵌套循环，每层循环次数均为 n。因此时间复杂度为 $$$O(N^2)$$$。注意外层循环不再是 $$2^n$$。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: "执⾏下面 C++ 程序，会输出（ ）。\n```cpp\nint main() {\n    ofstream fout(\"test.txt\");\n    fout << \"Happy\" << endl;\n    fout << \"New Year\";\n    fout.close();\n    ifstream fin(\"test.txt\");\n    string s1, s2;\n    fin >> s1;\n    getline(fin, s2);\n    fin.close();\n    cout << s1 << \"|\" << s2;\n    return 0;\n}\n```",
            options: [
                "Happy|New Year",
                "Happy| New Year",
                "HappyNew Year|",
                "Happy|",
            ],
            answer: 3,
            score: 2,
            explanation: "fin >> s1 读取 'Happy'。getline 会读取当前行剩余的内容（即换行符或空），导致 s2 为空。因此输出 Happy|。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: "执⾏下面 C++ 代码，会输出 ( ) 。\n```cpp\nint divide(int a, int b) {\n    if(b == 0) throw \"Division by zero\";\n    return a / b;\n}\nint main() {\n    int result = 0;\n    try {\n        result = divide(10, 0);\n        cout << \"A\";\n    } catch(const char* msg) {\n        cout << \"B\";\n        result = -1;\n    }\n    cout << result;\n    return 0;\n}\n```",
            options: [
                "A0",
                "B-1",
                "A10",
                "程序崩溃",
            ],
            answer: 1,
            score: 2,
            explanation: "divide(10, 0) 抛出异常。catch 捕获并打印 'B'。result 被设为 -1，最后打印 result 的值 -1。输出 B-1。",
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: "小杨正在调试他的温度传感器程序，其中变量 x 保存当前温度。下面这段代码运⾏后，变量 x 的值变成 了 8。\n```cpp\nint x = 5;\nint *p = &x;\n*p = *p + 3;\n```",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "正确。*p 访问 x 的值，x = 5 + 3 = 8。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: "一个结构体不能包含另一个结构体。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "错误。C++ 支持结构体嵌套。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: "在 C++ 中，定义如下二维数组：int a[3][4];，数组 a 在内存中是按⾏优先连续存放的。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "正确。C++ 数组在内存中是连续分配的，二维数组按行主序存储。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: "执⾏下面程序后，变量 a 的值会变成 15。\n```cpp\nvoid add(int &x){ x += 10; }\nint a = 5;\nadd(a);\n```",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "正确。引用传递会直接修改原变量的值。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: "执⾏下面的 C++ 代码，会输出 8。\n```cpp\nint arr[5] = {1, 2, 3, 4, 5};\nint* p1 = arr;\nint* p2 = arr + 2;\ncout << p2 - p1;\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "错误。指针相减返回的是中间间隔的元素个数（2），而不是字节数（8）。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: "考虑用如下递推方式计算斐波那契数列，时间复杂度是 $$$O(N)$$$。\n```cpp\nint f[20]; f[0] = 0; f[1] = 1;\nfor (int i = 2; i <= n; i++) f[i] = f[i - 1] + f[i - 2];\n```",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "正确。单层循环线性增加，复杂度为 $$$O(N)$$$。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: "冒泡排序和插入排序都是稳定排序算法。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "正确。两者的基本版本都是稳定的。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: "下面这段代码实现了选择排序算法。\n```cpp\nvoid sort(int a[], int n) {\n    for (int i = 1; i < n; i++) {\n        int x = a[i];\n        int j = i - 1;\n        while (j >= 0 && a[j] > x) {\n            a[j + 1] = a[j];\n            j--;\n        }\n        a[j + 1] = x;\n    }\n}\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "错误。该代码实现的是插入排序。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: "下面代码可以正常编译并输出 10。\n```cpp\nint calculate(int x, int y = 10); \nint main() { cout << calculate(5); return 0; }\nint calculate(int x, int y) { return x * y; }\nint calculate(int x) { return x * 2; }\n```",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "错误。由于重载函数 calculate(int) 与 calculate(int, int=10) 在只传一个参数时会产生二义性，导致编译失败。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: "执⾏下面代码会输出 100。\n```cpp\nint main() {\n    ofstream fout(\"data.txt\");\n    fout << 10 << \" \" << 20 << endl;\n    fout << 30 << \" \" << 40;\n    fout.close();\n    ifstream fin(\"data.txt\");\n    int a, b, c, d;\n    fin >> a >> b >> c >> d;\n    fin.close();\n    cout << a + b + c + d;\n    return 0;\n}\n```",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "正确。10+20+30+40 = 100。",
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 26,
            type: "programming",
            question: "【问题描述】\n小 A 有一张 M 行 N 列的地形图，其中第 i 行第 j 列的数字 aij 代表坐标 (i, j) 的海拔高度。\n停机坪为一个 3 x 3 的区域，且内部所有 9 个点的最大高度和最小高度之差不超过 H。\n小 A 想请你计算出，在所有适合建造停机坪的区域中，区域内部 9 个点海拔之和最大是多少。\n【输入描述】\n第一行三个正整数 M, N, H，含义如题面所示。\n之后 M 行，第 i 行包含 N 个整数 ai1, ai2, ..., aiN，代表坐标 (i, j) 的高度。\n数据保证总存在一个适合建造停机坪的区域。\n【输出描述】\n输出一行，代表最大的海拔之和。\n【样例输入1】\n5 5 3\n5 5 5 5 5\n5 1 5 1 5\n5 5 5 5 5\n5 2 5 2 5\n3 5 5 5 2\n【样例输出1】\n40",
            score: 25,
            explanation: "遍历所有可能的 3x3 子矩阵，计算极差。如果极差 <= H，更新最大累加和。",
            tags: ["编程题", "GESP4级"]
        },
        {
            id: 27,
            type: "programming",
            question: "【问题描述】\n小 A 有 M 元预算。商店有 N 个商品，每个商品有商品名 S、价格 P 和优先级 V 三种属性，其中 V 为正整数，且 V 越小代表商品的优先级越高。\n小 A 的购物策略为：\n- 总是优先买优先级最高的东西；\n- 如果有多个最高优先级商品，购买价格最低的；\n- 如果有多个优先级最高且价格最低的商品，购买商品名字典序最小的。\n小 A 想知道能购买哪些商品。\n【输入描述】\n第一行两个正整数 M, N，代表预算和商品数。\n之后 N 行，每行一个商品，依次为 Si Pi Vi，代表第 i 个商品的商品名、价格、优先级。\n数据保证不存在两个名字相同的商品。\n【输出描述】\n按照字典序从小到大的顺序，输出所有购买商品的商品名。\n【样例输入1】\n20 4\napple 6 8\nbus 15 1\ncab 1 10\nwater 4 8\n【样例输出1】\nbus\ncab\nwater",
            score: 25,
            explanation: "使用结构体存储商品信息，自定义排序规则（优先级升序 > 价格升序 > 名字升序）。模拟购买过程，扣除预算。最后将购买列表按名字排序输出。",
            tags: ["编程题", "GESP4级"]
        }
    ]
};
