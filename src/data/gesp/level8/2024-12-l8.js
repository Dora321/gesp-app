import { l8ProgrammingByPaper } from './programming.js';

// 2024年12月 GESP C++ 八级真题
export const paperData = {
    id: '2024-12-l8',
    title: '2024年12月 GESP C++ 八级真题',
    level: 8,
    year: 2024,
    month: 12,
    session: 8,
    timeLimit: 5400,
    questions: [
        ...l8ProgrammingByPaper['2024-12-l8'],
        {
            id: 1,
            type: "single",
            question: "小杨家响应国家 “ 以旧换新 ” 政策，将⾃家的汽油车置换为新能源汽车，正在准备⾃编车牌。⾃编车牌包括 5 位数字或英文字母，要求第 5 位必须是数字，前 4 位中可以有最多 1 位英文字母。英文字母必须是大写，而且不能是 O 或 I （因为容易与数字 0 或 1 混淆）。请问⾃编车牌共有多少种可能性？（ ）。",
            options: [
                "100,000",
                "1,060,000",
                "1,360,000",
                "1,460,000",
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
            id: 2,
            type: "single",
            question: "新年到，四家⼈在一起聚会。其中两家有三⼝⼈，另外两家有两⼝⼈。现在要安排大家在一张⼗⼈圆桌坐 下，要求一家⼈必须相邻就座。由于有 “ 主座 ” 的习俗，每个座位都被认为是不同的。请问共有多少种就座方案？（ ）。",
            options: [
                "8640",
                "6912",
                "144",
                "60",
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
            id: 3,
            type: "single",
            question: "下面关于 C++ 类继承的说法，错误的是（ ）。",
            options: [
                "一个类可以继承多个类。",
                "一个类可以被多个类继承。",
                "一个类可以继承另一个类的子类。",
                "抽象类必须被⾄少一个类继承，否则会编译错误。",
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
            question: "使用邻接表表达一个简单有向图，图中包含v个顶点、e条边，则该出边表中边节点的个数为（ ）。",
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
            id: 5,
            type: "single",
            question: "以下将二维数组作为参数的函数声明，哪个是符合语法的？（ ）。",
            options: [
                "void Bubble(int a[10][], int m);",
                "void Bubble(int a[][], int n, int m);",
                "void Bubble(int (*a)[20], int n);",
                "void Bubble(int * a[20], int n);",
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
            question: "已知两个点A、B在平面直角坐标系下的坐标分别为 和 ，并分别定义变量double xa, ya, xb, yb;存储坐标。假设直线AB的斜率存在，下列哪个表达式可以用来表达它？（ ）。",
            options: [
                "(xa - xb) / (ya - yb)",
                "(xa - xb) / (yb - ya)",
                "(ya - yb) / (xa - xb)",
                "(ya - yb) / (xb - xa)",
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
            id: 7,
            type: "single",
            question: "二项式 的展开式中 项的系数是（ ）。",
            options: [
                "6",
                "15",
                "20",
                "120",
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
                "动态规划方法有递推和递归两种实现形式。",
                "递归实现动态规划方法的时间复杂度总是不低于递推实现。",
                "动态规划方法将原问题分解为一个或多个相似的子问题。",
                "动态规划方法通常能够列出递推公式。",
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
            question: "在下面的程序中，使用整数表⽰一种组合。整数二进制表⽰的某一位为 1 ，表⽰该位对应的数被选中，反之 为 0 表⽰未选中。例如，从0 - 5这6个数中选出3个，则0b111000代表选中3, 4, 5三个数，0b011001代表 选中0, 3, 4三个数。zuhe_next函数按组合对应的整数由大到小的顺序，求出组合c的下一个组合。横线处可 以填入的是（ ）。 int intlow2(int c) { return ________; // 在此处填入选项 } int zuhe_next_incur(int c, int n, int l) { if (n == 1) return c; if ((c & (1 << l)) == 0) { int d = intlow2(c); c = (c & ~d); c = (c | (d >> 1)); } else { 1 2 3 4 5 6 7 8 9 10",
            options: [
                "((c - 1) ^ c)",
                "(((c - 1) ^ c) + 1)",
                "(((c - 1) ^ c) >> 1)",
                "((((c - 1) ^ c) + 1) >> 1)",
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
            id: 10,
            type: "single",
            question: "下面程序的输出为（ ）。",
            options: [
                "174",
                "447",
                "816",
                "4096",
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
            question: "下面最长公共子序列程序中，横线处应该填入的是（ ）。 c = (c & ~(1 << l)); c = zuhe_next_incur(c, n - 1, l + 1); int d = intlow2(c); c = (c | (d >> 1)); } return c; } // 从 n 个数中选 m 个，当前组合为 c int zuhe_next(int c, int n, int m) { return zuhe_next_incur(c, n, 0); } 11 12 13 14 15 16 17 18 19 20 21 #include <iostream> using namespace std; int main() { int N = 15, cnt = 0; for (int x = 0; x + x + x <= N; x++) for (int y = x; x + y + y <= N; y++) for (int z = y; x + y + z <= N; z++) cnt++; cout << cnt << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 #define MAX(A, B) (((A) > (B)) ? (A) : (B)) #define MIN(A, B) (((A) < (B)) ? (A) : (B)) int dp[MAX_L + 1][MAX_L + 1]; int LCS(char str1[], char str2[]) { int len1 = strlen(str1); int len2 = strlen(str2); for (int i = 0; i < len1; i++) for(int j = 0; j < len2; j++) if (str1[i] == str2[j]) dp[i + 1][j + 1] = dp[i][j] + 1; else ________; // 在此处填入选项 return dp[len1][len2]; 1 2 3 4 5 6 7 8 9 10 11 12 13",
            options: [
                "dp[i + 1][j + 1] = dp[i][j + 1] + dp[i + 1][j]",
                "dp[i + 1][j + 1] = MIN(dp[i][j + 1], dp[i + 1][j])",
                "dp[i + 1][j + 1] = MAX(dp[i][j + 1], dp[i + 1][j])",
                "dp[i + 1][j + 1] = MAX(dp[i][j + 1], dp[i + 1][j]) + 1",
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
            question: "下列 Dijkstra 算法中，横线处应该填入的是（ ）。",
            options: [
                "选项A",
                "选项B",
                "}14 typedef struct Edge { int in, out; // 从下标 in 顶点到下标 out 顶点的边 int len; // 边长度 struct Edge * next; } Edge; // v ：顶点个数， graph ：出边邻接表， start ：起点下标， dis ：输出每个顶点的最短距离 void dijkstra(int v, Edge * graph[], int start, int * dis) { const int MAX_DIS = 0x7fffff; for (int i = 0; i < v; i++) dis[i] = MAX_DIS; dis[start] = 0; int * visited = new int[v]; for (int i = 0; i < v; i++) visited[i] = 0; visited[start] = 1; for (int t = 0; ; t++) { int min = MAX_DIS, minv = -1; for (int i = 0; i < v; i++) { if (visited[i] == 0 && min > dis[i]) { min = dis[i]; minv = i; } } if (minv < 0) break; visited[minv] = 1; for (Edge * e = graph[minv]; e != NULL; e = e->next) { ________; // 在此处填入选项 } } delete[] visited; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 if (dis[e->out] > e->len) dis[e->out] = e->len; 1 2 if (dis[e->out] > min + e->len) dis[e->out] = min + e->len; 1 2",
                "选项D",
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
            id: 13,
            type: "single",
            question: "假设图 graph 中顶点数 v 、边数 e ，上题程序的时间复杂度为（ ）。",
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
                "GESP8级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "下面的快速排序程序中，两处横线处分别应填入的是（ ）。",
            options: [
                "选项A",
                "if (dis[e->in] > e->len) dis[e->in] = e->len; 1 2 if (dis[e->in] > min + e->len) dis[e->in] = min + e->len; 1 2 void quick_sort(int a[], int n) { if (n <= 1) return; int pivot = 0, l = 0, r = n - 1; while (________) { // 在此处填入选项 while (r > pivot && a[r] >= a[pivot]) r--; if (r > pivot) { int temp = a[pivot]; a[pivot] = a[r]; a[r] = temp; pivot = r; } while (l < pivot && a[l] <= a[pivot]) l++; if (l < pivot) { int temp = a[pivot]; a[pivot] = a[l]; a[l] = temp; pivot = l; } } quick_sort(a, pivot); quick_sort(________); // 在此处填入选项 } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 l < r a + pivot + 1, n - pivot - 1 1 2 l < r a + pivot + 1, n - pivot 1 2 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            id: 15,
            type: "single",
            question: "上题程序的时间复杂度为（ ）。",
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
            id: 16,
            type: "judge",
            question: "表达式'3' + '5'的结果为'8'，类型为char。",
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
            question: "在 C++ 语⾔中，可以在函数内定义结构体，但该结构体类型只能在该函数内使用。",
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
            id: 18,
            type: "judge",
            question: "对 个元素的数组进⾏排序，快速排序和归并排序的平均时间复杂度都为 。但快速排序存在退化情 况，使得时间复杂度升高⾄ ；归并排序需要额外的空间开销。",
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
            question: "二维数组的最后一维在内存中一定是连续的，但第一维在内存中可能不连续。",
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
            question: "使用math.h或cmath头文件中的函数，表达式log(1000)的结果类型为double、值约为3。",
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
            question: "你有三种硬币，分别面值 2 元、 5 元和 7 元，每种硬币都有⾜够多。买一本书需要 27 元，则有 8 种硬币组合（组 合与顺序无关， “1 个 2 元 +1 个 5 元 +1 个 2 元 ” 与 “1 个 5 元 +2 个 2 元 ” 认为是同样的组合）可以正好付清，且不需要对方找 钱。",
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
            question: "使用哈希函数f(x) = x % p建⽴键值为int类型的哈希表，只要p取小于等于哈希表大小的素数，可保 证不发生碰撞。",
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
            question: "杨辉三角中的第 ⾏、第 项，即为将二项式 展开后 项的系数。",
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
            question: "判断图是否连通，可以通过⼴度优先搜索实现。",
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
            question: "要求解一元二次方程 ，需要先判断表达式a ^ 2 - b * 4 >= 0是否为真。 l <= r a + pivot + 1, n - pivot - 1 1 2 l <= r a + pivot + 1, n - pivot 1 2 子任务编号 数据点占比 特殊性质 1 20% 树的形态为一条链 2 20% 3 60%",
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
