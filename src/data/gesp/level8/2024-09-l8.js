import { l8ProgrammingByPaper } from './programming.js';

// 2024年9月 GESP C++ 八级真题
export const paperData = {
    id: '2024-09-l8',
    title: '2024年9月 GESP C++ 八级真题',
    level: 8,
    year: 2024,
    month: 9,
    session: 7,
    timeLimit: 5400,
    questions: [
        ...l8ProgrammingByPaper['2024-09-l8'],
        {
            id: 1,
            type: "single",
            question: "下面关于 C++ 类和对象的说法，错误的是（ ）。",
            options: [
                "类的析构函数可以为虚函数。",
                "类的构造函数不可以为虚函数。",
                "class 中成员的默认访问权限为 private 。",
                "struct 中成员的默认访问权限为 private 。",
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
            id: 2,
            type: "single",
            question: "对于一个具有 个顶点的无向图，若采用邻接矩阵表⽰，则该矩阵的大小为（ ）。",
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
            id: 3,
            type: "single",
            question: "设有编号为 A 、 B 、 C 、 D 、 E 的 5 个球和编号为 A 、 B 、 C 、 D 、 E 的 5 个盒子。现将这 5 个球投入 5 个盒子，要求 每个盒子放一个球，并且恰好有两个球的编号与盒子编号相同，问有多少种不同的方法？（ ）。",
            options: [
                "5",
                "120",
                "20",
                "60",
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
            id: 4,
            type: "single",
            question: "从甲地到⼄地，可以乘高铁，也可以乘汽车，还可以乘轮船。一天中，高铁有 10 班，汽车有 5 班，轮船有 2 班。那么一天中乘坐这些交通⼯具从甲地到⼄地共有多少种不同的走法？（ ）。",
            options: [
                "100",
                "60",
                "30",
                "17",
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
            question: "个结点的二叉树，执⾏释放全部结点操作的时间复杂度是（ ）。",
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
            id: 6,
            type: "single",
            question: "在一个单位圆上，随机分布 个点，求这 个点能被一个单位半圆周全部覆盖的概率（ ）。",
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
            id: 7,
            type: "single",
            question: "下面pailie函数是一个实现排列的程序，横线处可以填入的是（ ）。",
            options: [
                "选项A",
                "选项B",
                "#include <iostream> using namespace std; int sum = 0; void swap(int & a, int & b) { int temp = a; a = b; b = temp; } void pailie(int begin, int end, int a[]) { if (begin == end) { for (int i = 0; i < end; i++) cout << a[i]; cout << endl; } for (int i = begin; i < end; i++) { __________ // 在此处填入选项 } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 swap(a[begi$n+1$], a[i]); pailie(begi$n+1$, end, a); swap(a[i], a[begin]); 1 2 3 swap(a[begin], a[i]); pailie(begin, end, a); swap(a[i], a[begin]); 1 2 3",
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
            question: "上一题中，如果主函数为如下的程序，则最后的排列数是多少个？（ ）。",
            options: [
                "120",
                "60",
                "240",
                "180",
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
            id: 9,
            type: "single",
            question: "下列程序实现了输出杨辉三角形，代码中横线部分应该填入的是（ ）。",
            options: [
                "a[i][j] = a[i - 1][j - 1] + a[i - 1][j];",
                "a[i][j] = a[i][j - 1] + a[i - 1][j];",
                "a[i][j] = a[i - 1][j] + a[i - 1][j]; swap(a[begin], a[i]); pailie(begi$n+1$, end, a); swap(a[i], a[begin]); 1 2 3 swap(a[begin] + 1, a[i]); pailie(begi$n+1$, end, a); swap(a[i], a[begi$n+1$]); 1 2 3 int main() { int a[5] = {1, 2, 3, 4, 5}; pailie(0, 5, a); return 0; } 1 2 3 4 5 #include <iostream> using namespace std; #define N 35 int a[N][N]; int main() { int n; cin >> n; for (int i = 1; i <= n; i++) for (int j = 1; j <= i; j++) { if (j == 1 || j == i) a[i][j] = 1; else __________ // 在此处填入选项 } for (int i = 1; i <= n; i++) { for (int j = 1; j <= i; j++) cout << a[i][j]; cout<<endl; } return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21",
                "a[i][j] = a[i - 1][j - 1] + a[i][j];",
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
            question: "下面最小生成树的 Kruskal 算法程序中，横线处应该填入的是（ ）。",
            options: [
                "uParent == vParent",
                "uParent >= vParent",
                "uParent != vParent",
                "uParent <= vParent",
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
            id: 11,
            type: "single",
            question: "下面 Prim 算法程序中，横线处应该填入的是（ ）。 #include <iostream> #include <vector> #include <algorithm> using namespace std; struct Edge { int u, v, weight; bool operator <(const Edge & other) const { return weight < other.weight; } }; int findParent(int vertex, vector<int> & parent) { if (parent[vertex] == -1) return vertex; return parent[vertex] = findParent(parent[vertex], parent); } int main() { int n, m; cin >> n >> m; // n: 顶点数 , m: 边数 vector<Edge> edges(m); vector<int> parent(n, -1); int totalWeight = 0; for (int i = 0; i < m; i++) cin >> edges[i].u >> edges[i].v >> edges[i].weight; sort(edges.begin(), edges.end()); for (const auto & edge : edges) { int uParent = findParent(edge.u, parent); int vParent = findParent(edge.v, parent); if (__________) { // 在此处填入选项 parent[uParent] = vParent; totalWeight += edge.weight; } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 #include <iostream> #include <vector> #include <algorithm> using namespace std; int prim(vector<vector<int>> & graph, int n) { vector<int> key(n, INT_MAX); vector<int> parent(n, -1); 1 2 3 4 5 6 7",
            options: [
                "graph[u][v] >= 0 && key[v] > graph[u][v]",
                "graph[u][v] <= 0 && key[v] > graph[u][v]",
                "graph[u][v] == 0 && key[v] > graph[u][v]",
                "graph[u][v] != 0 && key[v] > graph[u][v]",
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
            id: 12,
            type: "single",
            question: "下列 Dijkstra 算法中，横线处应该填入的是（ ）。 key[0] = 0; for (int i = 0; i < n; i++) { int u = min_element(key.begin(), key.end()) - key.begin(); if (key[u] == INT_MAX) break; for (int v = 0; v < n; v++) { if (__________) { // 在此处填入选项 key[v] = graph[u][v]; parent[v] = u; } } } int sum = 0; for (int i = 0; i < n; i++) { if (parent[i] != -1) { cout << \"Edge: \" << parent[i] << \" - \" << i << \" Weight: \" << key[i] << endl; sum += key[i]; } } return sum; } int main() { int n, m; cin >> n >> m; vector<vector<int>> graph(n, vector<int>(n, 0)); for (int i = 0; i < m; i++) { int u, v, w; cin >> u >> v >> w; graph[u][v] = w; graph[v][u] = w; } int result = prim(graph, n); cout << \"Total weight of the minimum spanning tree: \" << result << endl; return 0; } 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 #include <iostream> using namespace std; #define N 100 int n, e, s; const int inf = 0x7fffff; int dis[$N+1$]; int cheak[$N+1$]; int graph[$N+1$][$N+1$]; 1 2 3 4 5 6 7 8 9",
            options: [
                "dis[j] > minn && cheak[j] == 0",
                "dis[j] < minn && cheak[j] == 0",
                "dis[j] >= minn && cheak[j] == 0",
                "dis[j] < minn && cheak[j] != 0",
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
            question: "下面 Floyd 算法中，横线处应该填入的是（ ）。 int main() { for (int i = 1; i <= N; i++) dis[i] = inf; cin >> n >> e; for (int i = 1; i <= e; i++) { int a, b, c; cin >> a >> b >> c; graph[a][b] = c; } cin >> s; dis[s] = 0; for (int i = 1; i <= n; i++) { int minn = inf, minx; for (int j = 1; j <= n; j++) { if (__________) { // 在此处填入选项 minn = dis[j]; minx = j; } } cheak[minx] = 1; for (int j = 1; j <= n; j++) { if (graph[minx][j] > 0) { if (minn + graph[minx][j] < dis[j]) { dis[j] = minn + graph[minx][j]; } } } } } 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 #include <iostream> using namespace std; #define N 21 #define INF 99999999 int map[N][N]; int main() { int n, m, t1, t2, t3; cin >> n >> m; for (int i = 1; i <= n; i++) { for (int j = 1; j <= n; j++) { if (i == j) map[i][j] = 0; else map[i][j] = INF; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16",
            options: [
                "map[i][j] < map[i][k] + map[k][j]",
                "map[i][j] > map[i][k] + map[k][j]",
                "map[i][j] > map[i][k] - map[k][j]",
                "map[i][j] < map[i][k] - map[k][j]",
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
            question: "下面程序的Merge_Sort函数时间复杂度为（ ）。 } for (int i = 1; i <= m; i++) { cin >> t1 >> t2 >> t3; map[t1][t2] = t3; } for (int k = 1; k <= n; k++) for (int i = 1; i <= n; i++) for (int j = 1; j <= n; j++) if (__________) // 在此处填入选项 map[i][j] = map[i][k] + map[k][j]; for (int i = 1; i <= n; i++) { for (int j = 1; j <= n; j++) { cout.width(4); cout << map[i][j]; } cout << endl; } } 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 void Merge(int a[], int left, int mid, int right) { int temp[right - left + 1]; int i = left; int j = mid + 1; int k = 0; while (i <= mid && j <= right) { if (a[i] < a[j]) temp[k++] = a[i++]; else temp[k++] = a[j++]; } while (i <= mid) temp[k++] = a[i++]; while (j <= right) temp[k++] = a[j++]; for (int m = left, n = 0; m <= right; m++, n++) a[m] = temp[n]; } void Merge_Sort(int a[], int left, int right) { if (left == right) return; int mid = (left + right) / 2; Merge_Sort(a, left, mid); Merge_Sort(a, mid + 1, right); Merge(a, left, mid, right); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 题号 1 2 3 4 5 6 7 8 9 10 答案",
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
            id: 15,
            type: "single",
            question: "下面fibonacci函数的时间复杂度为（ ）。",
            options: [
                "选项A",
                ",",
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
            id: 16,
            type: "judge",
            question: "表达式'3' & 1的结果为'1'。",
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
            question: "在 C++ 语⾔中，变量定义必须在某一个函数定义之内。",
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
            question: "冒泡排序一般是不稳定的。",
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
            question: "二叉排序树的查找操作的平均时间复杂度，正比于树的高度。",
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
            question: "使用math.h或cmath头文件中的余弦函数，表达式cos(60)的结果类型为double、值约为0.5。",
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
            question: "你有三种硬币，分别面值 2 元、 5 元和 7 元，每种硬币都有⾜够多。买一本书需要 27 元，则最少可以用 5 个硬币 组合起来正好付清，且不需要对方找钱。",
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
            question: "现有 个完全相同的元素，要将其分为 组，允许每组可以有 个元素，则一共有 种分组方案。",
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
            question: "已知int类型的变量a和b中分别存储着一个直角三角形的两条直角边的长度，则该三角形的面积可以通 过表达式a / 2.0 * b求得。",
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
            question: "已知等差数列的通项公式 ，则前 项和的求和公式为 。使用这一公 式计算 的时间复杂度是 。",
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
            question: "诚实国公民只说实话，说谎国公民只说谎话。你来到一处分岔⼝，一条通往诚实国，一条通往说谎国，但 不知是哪一条通往哪⾥。正在为难之际，走来两位路⼈，他们都⾃称是诚实国公民，都说对方是说谎国公民。你想 去说谎国，可以这样问其中一位路⼈： “ 我要去说谎国，如果我去问另一个路⼈，他会指向哪一条路？ ” 。 int fibonacci(int n) { if (n <= 1) return n; else return fibonacci(n - 1) + fibonacci(n - 2); } 1 2 3 4 5 6 子任务编号 数据点占比 1 30% 2 30% 3 40%",
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
