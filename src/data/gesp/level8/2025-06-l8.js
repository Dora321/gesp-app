import { l8ProgrammingByPaper } from './programming.js';

// 2025年6月 GESP C++ 八级真题
export const paperData = {
    id: '2025-06-l8',
    title: '2025年6月 GESP C++ 八级真题',
    level: 8,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    questions: [
        ...l8ProgrammingByPaper['2025-06-l8'],
        {
            id: 1,
            type: "single",
            question: "一间的机房要安排 6 名同学进⾏上机考试，座位共 2 ⾏ 3 列。考虑到在座位上很容易看到同一⾏的左右两侧的 屏幕，安排中间一列的同学做 A 卷，左右两列的同学做 B 卷。请问共有多少种排座位的方案？（ ）。",
            options: [
                "720",
                "90",
                "48",
                "15",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "⼜到了毕业季，学长学姐们都在开⼼地拍毕业照。现在有 3 位学长、 3 位学姐希望排成一排拍照，要求男生不 相邻、⼥生不相邻。请问共有多少种拍照方案？（ ）。",
            options: [
                "720",
                "72",
                "36",
                "2",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下列关于 C++ 类和对象的说法，错误的是（ ）。",
            options: [
                "通过语句const int x = 5; 定义了一个对象x 。",
                "通过语句std::string t = \"12345\"; 定义了一个对象t 。",
                "通过语句void (*fp)() = NULL; 定义了一个对象fp 。",
                "通过语句class MyClass; 定义了一个类MyClass 。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "关于生成树的说法，错误的是（ ）。",
            options: [
                "一个无向连通图，一定有生成树。",
                "个顶点的无向图，其生成树要么不存在，要么一定包含 条边。",
                "个顶点、 条边的无向图，不可能有多颗生成树。",
                "个顶点、 条边的无向图，它本⾝就是⾃⼰的生成树。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "一对夫妻生男生⼥的概率相同。这对夫妻希望⼉⼥双全。请问这对夫妻生下两个孩子时，实现⼉⼥双全的概 率是多少？（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "已定义变量 double a, b; ，下列哪个表达式可以用来判断一元二次方程 是否有实根？（ ）。",
            options: [
                "4 * b-a * a < 0",
                "4 * b <= a * a",
                "a * a-4 * b",
                "b * 4-a * a",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "个结点的二叉树，执⾏⼴度优先搜索的平均时间复杂度是（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "以下关于动态规划的说法中，错误的是（ ）。",
            options: [
                "动态规划方法通常能够列出递推公式。",
                "动态规划方法的时间复杂度通常为状态的个数。",
                "动态规划方法有递推和递归两种实现形式。",
                "对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面的 sum_digit 函数试图求出从 1 到 n （包含 1 和 n ）的数中，包含数字 d 的个数。该函数的时间复杂 度为（ ）。 #include <string> int count_digit(int n, char d) { int cnt = 0; std::string s = std::to_string(n); for (int i = 0; i < s.length(); i++) if (s[i] == d) cnt++; return cnt; } int sum_digit(int n, char d) { int sum = 0; for (int i = 1; i <= n; i++) sum += count_digit(i, d); return sum; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15",
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
                "GESP8级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "60",
                "20",
                "15",
                "10",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面 count_triple 函数的时间复杂度为( )。",
            options: [
                "选项A",
                "#include <iostream> const int N = 10; int ch[N][N][N]; int main() { for (int x = 0; x < N; x++) for (int y = 0; y < N; y++) for (int z = 0; z < N; z++) if (x == 0 && y == 0 && z == 0) ch[x][y][z] = 1; else { if (x > 0) ch[x][y][z] += ch[x-1][y][z]; if (y > 0) ch[x][y][z] += ch[x][y-1][z]; if (z > 0) ch[x][y][z] += ch[x][y][z-1]; } std::cout << ch[1][2][3] << std::endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 int gcd(int a, int b) { if (a == 0) return b; return gcd(b % a, a); } int count_triple(int n) { int cnt = 0; for (int v = 1; v * v * 4 <= n; v++) for (int u = v+1; u * (u+v) * 2 <= n; u += 2) if (gcd(u, v) == 1) { int a = u * u-v * v; int b = u * v * 2; int c = u * u+v * v; cnt += n / (a+b+c); } return cnt; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17",
                "选项C",
                "选项D",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面 quick_sort 函数试图实现快速排序算法，两处横线处分别应该填入的是（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面 LIS 函数试图求出最长上升子序列的长度，横线处应该填入的是（ ）。 void swap(int & a, int & b) { int temp = a; a = b; b = temp; } int partition(int a[], int l, int r) { int pivot = a[l], i = l+1, j = r; while (i <= j) { while (i <= j && a[j] >= pivot) j--; while (i <= j && a[i] <= pivot) i++; if (i < j) swap(a[i], a[j]); } ________; // 在此处填入选项 return ________; // 在此处填入选项 } void quick_sort(int a[], int l, int r) { if (l < r) { int pivot = partition(a, l, r); quick_sort(a, l, pivot-1); quick_sort(a, pivot+1, r); } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 swap(a[l], a[i]) i 1 2 swap(a[l], a[j]) i 1 2 swap(a[l], a[i]) j 1 2 swap(a[l], a[j]) j 1 2 int max(int a, int b) { return (a > b) ? a : b; } int LIS(vector<int> & nums) { int n = nums.size(); if (n == 0) return 0; vector<int> dp(n, 1); int maxLen = 1; 1 2 3 4 5 6 7 8 9",
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
                "GESP8级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "下面LIS 函数试图求出最长上升子序列的长度，其时间复杂度为（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下面的程序使用邻接矩阵表达的带权无向图，则从顶点 0 到顶点 3 的最短距离为（ ）。 for (int i = 1; i < n; i++) { for (int j = 0; j < i; j++) if (nums[j] < nums[i]) ________; // 在此处填入选项 maxLen = max(maxLen, $dp[i]$); } return maxLen; } 10 11 12 13 14 15 16 17 $dp[j]$ = max($dp[j]$+1, $dp[i]$)1 $dp[j]$ = max($dp[j]$, $dp[i]$+1)1 $dp[i]$ = max($dp[i]$+1, $dp[j]$)1 $dp[i]$ = max($dp[i]$, $dp[j]$+1)1 #define INT_MIN (-1000) int LIS(vector<int> & nums) { int n = nums.size(); vector<int> tail; tail.push_back(INT_MIN); for (int i = 0; i < n; i++) { int x = nums[i], l = 0, r = tail.size(); while (l < r) { int mid = (l+r) / 2; if (tail[mid] < x) l = mid+1; else r = mid; } if (r == tail.size()) tail.push_back(x); else tail[r] = x; } return tail.size()-1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "9",
                "10",
                "11",
                "12",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP8级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "C++ 语⾔中，表达式9 | 12 的结果类型为int 、值为13 。",
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
                "GESP8级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "C++ 语⾔中，访问数据发生下标越界时，总是会产生运⾏时错误，从而使程序异常退出。",
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
                "GESP8级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "对 个元素的数组进⾏归并排序，最差情况的时间复杂度为 。",
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
                "GESP8级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "5 个相同的红球和 4 个相同的蓝球排成一排，要求每个蓝球的两侧都必须⾄少有一个红球，则一共有 15 种排列 方案。",
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
                "GESP8级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "使用math.h 或cmath 头文件中的函数，表达式log(8) 的结果类型为double 、值约为3 。",
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
                "GESP8级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "C++ 是一种面向对象编程语⾔， C 则不是。继承是面向对象三大特性之一，因此，使用 C 语⾔无法实现继承。",
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
                "GESP8级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "个顶点的无向完全图，有 棵生成树。",
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
                "GESP8级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "已知三个double 类型的变量a 、b 和theta 分别表⽰一个三角形的两条边长及二者的夹角（弧度），则三 角形的周长可以通过表达式sqrt(a * a+b * b-2 * a * b * cos(theta)) 求得。",
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
                "GESP8级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "有 个顶点、 条边的图的深度优先搜索遍历时间复杂度为 。",
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
                "GESP8级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "从 32 名学生中选出 4 ⼈分别担任班长、副班长、学习委员和组织委员，⽼师要求班级综合成绩排名最后的 4 名学生不得参选班长或学习委员（仍可以参选副班长和组织委员），则共有 种不同的选法。",
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
                "GESP8级",
            ]
        }
    ]
};
