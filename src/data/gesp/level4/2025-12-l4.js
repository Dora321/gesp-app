// 2025年12月 GESP C++ 四级真题
export const paperData = {
    id: '2025-12-l4',
    title: '2025年12月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 12,
    session: 12,
    note: '刚结束不久',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "小杨想让指针 p 指向整数变量 x，正确写法是（ ）。",
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
            id: 2,
            type: "single",
            question: "小杨写了如下的指针接力程序，程序执⾏完后变量 a、*p1和*p2的值分别是（ ）。",
            options: [
                "5 10 10",
                "5 10 15",
                "10 10 10",
                "5 5 10",
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
            question: "小杨用一个二维数组表⽰棋盘，其中 1 表⽰有棋子， 0 表⽰没有棋子。他想知道第 2 ⾏ 第 3 列有没有棋子， 可采用的代码是：（ ）。",
            options: [
                "cout << a[1, 2] << endl; int p = &x;1 int *p = x;1 int *p = &x;1 p = *x;1 int a = 5; int* p1 = &a; int* p2 = p1; *p2 = 10; 1 2 3 4 int a[3][4] = { {1, 0, 1, 0}, {0, 1, 0, 1}, {1, 1, 0, 0} }; 1 2 3 4 5 第 1 页 / 共 12 页",
                "cout << a[1][2] << endl;",
                "cout << a(1, 2) << endl;",
                "cout << a{1}{2} << endl;",
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
            question: "执⾏完下面的代码后，*(p + 5) 和 arr[1][1]的值分别是（ ）。",
            options: [
                "5 6",
                "6 5",
                "5 5",
                "6 6",
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
            question: "执⾏完下面的代码后，sum 的值是（ ）。",
            options: [
                "36",
                "39",
                "78",
                "30",
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
            id: 6,
            type: "single",
            question: "执⾏完下面的代码后，输出是（ ）。",
            options: [
                "3 1",
                "4 1",
                "3 2 int arr[3][4] = {{1,2,3,4}, {5,6,7,8}, {9,10,11,12}}; int* p = &arr[0][0]; 1 2 int arr[2][3][2] = { {{1,2}, {3,4}, {5,6}}, {{7,8}, {9,10}, {11,12}} }; int sum = 0; for(int i = 0; i < 2; i++) for(int j = 0; j < 3; j++) for(int k = 0; k < 2; k++) if((i+j+k) % 2 == 0) sum += arr[i][j][k]; 1 2 3 4 5 6 7 8 9 10 int a = 1; void test() { int a = 2; { int a = 3; a++; } a++; cout << a << \" \"; } int main() { test(); cout << a; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 第 2 页 / 共 12 页",
                "4 2",
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
            question: "执⾏完下面的代码后，a 、b 和 c 的值分别是（ ）。",
            options: [
                "100 200 300",
                "1 2 3",
                "1 200 300",
                "1 2 300",
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
            question: "运⾏如下代码会输出（ ）。",
            options: [
                "10",
                "30",
                "15",
                "20",
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
            id: 9,
            type: "single",
            question: "给定函数 climbStairs(int n) 的定义如下，则 climbStairs(5) 的返回的值是（ ）。 void byValue(int x) { x = 100; } void byRef(int& x) { x = 200; } void byPointer(int* x) { *x = 300; } int main() { int a = 1, b = 2, c = 3; byValue(a); byRef(b); byPointer(&c); return 0; } 1 2 3 4 5 6 7 8 9 10 11 struct Point { int x, y; }; struct Rectangle { Point topLeft; Point bottomRight; }; int main() { Rectangle rect = {{10, 10}, {20, 20}}; rect.topLeft.x = 5; Point* p = &rect.bottomRight; p->y = 5; cout << rect.topLeft.x + rect.bottomRight.y; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 第 3 页 / 共 12 页",
            options: [
                "5",
                "8",
                "13",
                "10",
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
            question: "对如下 4 个扑克牌进⾏排序， 使用某排序算法按 value 排序后，结果为 : {3,'D'}, {3,'B'}, {5,'A'}, {5,'C'}，则这个排序算法是稳定的吗？",
            options: [
                "稳定，因为相同 value 的元素相对顺序保持不变",
                "不稳定，因为 {3,'D'} 出现在 {3,'B'} 之前",
                "无法判断",
                "稳定，因为结果是有序的",
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
            question: "下面的函数 selectTopK() 实现从 n 个学生中选出前 k 名成绩最好的学生颁发奖学⾦（不需要对所有 学生完全排序，只需要找出前 k 名），则横线上应填写（ ）。 int climbStairs(int n) { if(n <= 2) return n; int a = 1, b = 2; for(int i = 3; i <= n; i++) { int temp = a + b; a = b; b = temp; } return b; } 1 2 3 4 5 6 7 8 9 10 struct Card { int value; char suit; // 花色 }; Card cards[4] = {{5,'A'}, {3,'B'}, {5,'C'}, {3,'D'}}; 1 2 3 4 5 6 struct Student { string name; int score; }; void selectTopK(Student students[], int n, int k) { for (int i = 0; i < k; i++) { int maxIdx = i; for (____________________) { // 在此处填入代码 if (students[j].score > students[maxIdx].score) { maxIdx = j; } } if (maxIdx != i) { Student temp = students[i]; students[i] = students[maxIdx]; students[maxIdx] = temp; } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 第 4 页 / 共 12 页",
            options: [
                "int j = 0; j < n; j++",
                "int j = i + 1; j < n; j++",
                "int j = i; j < n; j++",
                "int j = 1; j <= n; j++",
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
            question: "某游戏的排⾏榜系统需要实时更新玩家分数。每次只有一个玩家的分数发生变化，排⾏榜已经是按分数降 序排列的。现在需要将更新后的玩家调整到正确位置。下面的函数 updateRanking() 要实现上述功能，则两处横 线上应分别填写（ ）。",
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
            question: "给定如下算法，其时间复杂度为（ ）。 struct Player { string name; int score; }; // 玩家索引 playerIdx 的分数刚刚更新，需要调整位置 void updateRanking(Player players[], int size, int playerIdx) { Player updatedPlayer = players[playerIdx]; if (playerIdx > 0 && updatedPlayer.score > players[playerIdx - 1].score) { int i = playerIdx; while (____________________) { // 在此处填入代码 players[i] = players[i - 1]; i--; } players[i] = updatedPlayer; } else if (playerIdx < size - 1 && updatedPlayer.score < players[playerIdx + 1].score) { int i = playerIdx; while (____________________) { // 在此处填入代码 players[i] = players[i + 1]; i++; } players[i] = updatedPlayer; } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 i > 0 && updatedPlayer.score > players[i - 1].score i < size - 1 && updatedPlayer.score < players[i + 1].score 1 2 i < size - 1 && updatedPlayer.score < players[i + 1].score i > 0 && updatedPlayer.score > players[i - 1].score 1 2 i > 0 && updatedPlayer.score < players[i - 1].score i < size - 1 && updatedPlayer.score < players[i + 1].score 1 2 i > 0 && updatedPlayer.score < players[i - 1].score i < size - 1 && updatedPlayer.score > players[i + 1].score 1 2 第 5 页 / 共 12 页",
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
            question: "执⾏下面 C++ 程序，会输出（ ）。",
            options: [
                "Happy|New Year",
                "Happy| New Year",
                "HappyNew Year|",
                "Happy|",
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
            id: 15,
            type: "single",
            question: "执⾏下面 C++ 代码，会输出 ( ) 。 bool f(int arr[], int n, int target) { for (int i = 0; i < n; i++) { int sum = 0; for (int j = 0; j < n; j++) { if (i & (1 << j)) { sum += arr[j]; } } if (sum == target) return true; } return false; } 1 2 3 4 5 6 7 8 9 10 11 12 int main() { ofstream fout(\"test.txt\"); fout << \"Happy\" << endl; fout << \"New Year\"; fout.close(); ifstream fin(\"test.txt\"); string s1, s2; fin >> s1; getline(fin, s2); fin.close(); cout << s1 << \"|\" << s2; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 第 6 页 / 共 12 页 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "A0",
                "B-1",
                "A10",
                "程序崩溃",
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
            question: "小杨正在调试他的温度传感器程序，其中变量 x 保存当前温度。下面这段代码运⾏后，变量 x 的值变成 了 8。",
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
            question: "一个结构体不能包含另一个结构体。",
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
            id: 18,
            type: "judge",
            question: "在 C++ 中，定义如下二维数组：int a[3][4];，数组 a 在内存中是按⾏优先连续存放的，即 a[0] [0]、a[0][1]、a[0][2]、a[0][3] 在内存中是连续的。",
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
            question: "执⾏下面程序后，变量 a 的值会变成 15。",
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
            question: "执⾏下面的 C++ 代码，会输出 8，因为两个指针地址相差 8 个字节（假设 int 占 4 字节）。 int divide(int a, int b) { if(b == 0) throw \"Division by zero\"; return a / b; } int main() { int result = 0; try { result = divide(10, 0); cout << \"A\"; } catch(const char* msg) { cout << \"B\"; result = -1; } cout << result; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 int x = 5; int *p = &x; *p = *p + 3; 1 2 3 void add(int &x){ x += 10; } int a = 5; add(a); 1 2 3 4 5 6 int arr[5] = {1, 2, 3, 4, 5}; int* p1 = arr; int* p2 = arr + 2; cout << p2 - p1; // 输出结果 1 2 3 4 5 第 7 页 / 共 12 页",
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
            question: "考虑用如下递推方式计算斐波那契数列，时间复杂度是 。",
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
            question: "冒泡排序和插入排序都是稳定排序算法。",
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
            question: "下面这段代码实现了选择排序算法。",
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
            question: "下面代码可以正常编译并输出 10。",
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
            question: "执⾏下面代码会输出 100。 int n = 10; int f[20]; f[0] = 0; f[1] = 1; for (int i = 2; i <= n; i++) f[i] = f[i - 1] + f[i - 2]; 1 2 3 4 5 6 void sort(int a[], int n) { for (int i = 1; i < n; i++) { int x = a[i]; int j = i - 1; while (j >= 0 && a[j] > x) { a[j + 1] = a[j]; j--; } a[j + 1] = x; } } 1 2 3 4 5 6 7 8 9 10 11 #include <iostream> using namespace std; int calculate(int x, int y = 10); int main() { cout << calculate(5); // 调用 1 return 0; } int calculate(int x, int y) { return x * y; } int calculate(int x) { // 重载函数 return x * 2; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 int main() { ofstream fout(\"data.txt\"); fout << 10 << \" \" << 20 << endl; fout << 30 << \" \" << 40; fout.close(); ifstream fin(\"data.txt\"); int a, b, c, d; fin >> a >> b >> c >> d; fin.close(); cout << a + b + c + d; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 第 8 页 / 共 12 页",
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
            question: "【问题描述】\n小 A 有一张 M 行 N 列的地形图，其中第 i 行第 j 列的数字 aij 代表坐标 (i, j) 的海拔高度。\n停机坪为一个 3 x 3 的区域，且内部所有 9 个点的最大高度和最小高度之差不超过 H。\n小 A 想请你计算出，在所有适合建造停机坪的区域中，区域内部 9 个点海拔之和最大是多少。\n【输入描述】\n第一行三个正整数 M, N, H，含义如题面所示。\n之后 M 行，第 i 行包含 N 个整数 ai1, ai2, ..., aiN，代表坐标 (i, j) 的高度。\n数据保证总存在一个适合建造停机坪的区域。\n【输出描述】\n输出一行，代表最大的海拔之和。\n【样例输入1】\n5 5 3\n5 5 5 5 5\n5 1 5 1 5\n5 5 5 5 5\n5 2 5 2 5\n3 5 5 5 2\n【样例输出1】\n40",
            score: 25,
            explanation: "遍历所有可能的 3x3 子矩阵，计算其中的最大高度差。如果差值 <= H，则计算该子矩阵的和，并更新最大值。",
            tags: [
                "编程题",
                "GESP4级",
            ]
        },
        {
            id: 27,
            type: "programming",
            question: "【问题描述】\n小 A 有 M 元预算。商店有 N 个商品，每个商品有商品名 S、价格 P 和优先级 V 三种属性，其中 V 为正整数，且 V 越小代表商品的优先级越高。\n小 A 的购物策略为：\n- 总是优先买优先级最高的东西；\n- 如果有多个最高优先级商品，购买价格最低的；\n- 如果有多个优先级最高且价格最低的商品，购买商品名字典序最小的。\n小 A 想知道能购买哪些商品。\n【输入描述】\n第一行两个正整数 M, N，代表预算和商品数。\n之后 N 行，每行一个商品，依次为 Si Pi Vi，代表第 i 个商品的商品名、价格、优先级。\n数据保证不存在两个名字相同的商品。\n【输出描述】\n按照字典序从小到大的顺序，输出所有购买商品的商品名。\n【样例输入1】\n20 4\napple 6 8\nbus 15 1\ncab 1 10\nwater 4 8\n【样例输出1】\nbus\ncab\nwater",
            score: 25,
            explanation: "首先根据优先级（V）、价格（P）和名称（S）对商品进行自定义排序。然后按照排序后的顺序依次尝试购买商品，直到预算不足。最后将购买到的商品按名字字典序排序并输出。",
            tags: [
                "编程题",
                "GESP4级",
            ]
        }
    ]
};

