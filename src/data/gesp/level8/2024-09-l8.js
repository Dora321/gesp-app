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
            question: `下面关于 C++ 类和对象的说法，错误的是（ ）。`,
            options: [
                "类的析构函数可以为虚函数。",
                "类的构造函数不可以为虚函数。",
                "class 中成员的默认访问权限为 private 。",
                "struct 中成员的默认访问权限为 private 。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（错误说法是 D）**

解析：逐项判断：
- A：类的析构函数可以为虚函数 ✅（基类析构函数通常声明为 virtual，保证多态删除时正确调用派生类析构函数）。
- B：类的构造函数不可以为虚函数 ✅（构造时对象类型尚未完全确定，无法使用虚机制，语言也不允许）。
- C：class 中成员的默认访问权限为 private ✅。
- D：struct 中成员的默认访问权限为 private ❌（struct 默认是 public，class 默认才是 private）。

因此 D 的说法错误。

**考点**：C++ 类与 struct 的默认访问权限区别、虚析构函数与“构造函数不能为虚”的原因。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 2,
            type: "single",
            question: `对于一个具有 个顶点的无向图，若采用邻接矩阵表⽰，则该矩阵的大小为（ ）。`,
            options: [
                "n",
                "n²",
                "2n",
                "n(n-1)/2",
],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

解析：题面为“具有 n 个顶点的无向图，采用邻接矩阵表示，则矩阵大小为（ ）”。邻接矩阵是一个 n×n 的二维数组，无论边数多少都占用 n² 个存储单元（标准邻接矩阵为 n×n；若只存上三角可优化为 n(n+1)/2，但教材通常指完整矩阵）。本题四个选项在源数据中缺失（占位为“…选项”“选项B/C/D”），无法独立核实标准答案所指向的具体选项。

**考点**：邻接矩阵的空间复杂度 O(n²)。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 3,
            type: "single",
            question: `设有编号为 A 、 B 、 C 、 D 、 E 的 5 个球和编号为 A 、 B 、 C 、 D 、 E 的 5 个盒子。现将这 5 个球投入 5 个盒子，要求 每个盒子放一个球，并且恰好有两个球的编号与盒子编号相同，问有多少种不同的方法？（ ）。`,
            options: [
                "5",
                "120",
                "20",
                "60",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（20）**

解析：要求恰好 2 个球的编号与盒子编号相同，其余 3 个球全部错位（错排）。
- 先从 5 个球中选出 2 个保持原位：C(5,2) = 10 种。
- 剩下 3 个球放入剩下 3 个盒子，且都不在对应编号的盒子里，即 3 个元素的错排数 !3 = 2（编号 1,2,3 的球分别放入盒子 2,3,1 或 3,1,2）。
- 总数 = 10 × 2 = 20。

**考点**：组合计数（先选固定点，再对错位部分做错排）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 4,
            type: "single",
            question: `从甲地到⼄地，可以乘高铁，也可以乘汽车，还可以乘轮船。一天中，高铁有 10 班，汽车有 5 班，轮船有 2 班。那么一天中乘坐这些交通⼯具从甲地到⼄地共有多少种不同的走法？（ ）。`,
            options: [
                "100",
                "60",
                "30",
                "17",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（17）**

解析：分类加法计数原理。从甲地到乙地有三类互不相交的走法：高铁 10 班、汽车 5 班、轮船 2 班，每一班都是一种独立的走法，彼此没有先后组合关系。总走法数 = 10 + 5 + 2 = 17。

**考点**：加法原理（分类）与乘法原理（分步）的区别。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 5,
            type: "single",
            question: `个结点的二叉树，执⾏释放全部结点操作的时间复杂度是（ ）。`,
            options: [
                "O(n)",
                "O(n²)",
                "O(log n)",
                "O(2ⁿ)",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

解析：释放一棵 n 个结点的二叉树的所有结点，需要遍历每个结点恰好一次并 delete，因此时间复杂度为 O(n)。源数据中本题选项缺失（占位为“…选项”），无法独立核实标准答案的具体选项文字，上述为通用结论。

**考点**：二叉树遍历释放结点的时间复杂度 O(n)。`,
            tags: [
                "树与二叉树",
            ],
        },
        {
            id: 6,
            type: "single",
            question: `在一个单位圆上，随机分布 个点，求这 个点能被一个单位半圆周全部覆盖的概率（ ）。`,
            options: [
                "n/2^(n-1)",
                "1/2^n",
                "1/n",
                "(n-1)/2^n",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

解析：经典几何概率题——单位圆上随机分布 n 个点，求它们能被某个单位半圆周（半圆）全部覆盖的概率。结论是 n 个点落在同一半圆内的概率为 n / 2^(n-1)（n≥1）：固定最左点，其余 n-1 个点都落在其顺时针 180° 内即满足条件，概率为 (1/2)^(n-1)，再乘 n 种“最左点”选择。源数据选项缺失，无法独立核实标准答案所选的具体数值形式。

**考点**：圆上半圆覆盖概率 n / 2^(n-1)。`,
            tags: [
                "概率与期望",
            ],
        },
        {
            id: 7,
            type: "single",
            question: `下面pailie函数是一个实现排列的程序，横线处可以填入的是（ ）。`,
            options: [
                "swap(a[i], a[j]); pailie(a, i+1); swap(a[i], a[j]);",
                "swap(a[i], a[t]); pailie(a, t+1); swap(a[i], a[t]);",
                "swap(a[i], a[t]); pailie(a, i+1); swap(a[i], a[t]);",
                "pailie(a, i+1);",
],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

解析：pailie 是递归生成全排列的典型回溯程序。标准填空应为：
\`\`\`cpp
swap(a[begin], a[i]);
pailie(begin + 1, end, a);
swap(a[i], a[begin]);
\`\`\`
即“交换—递归处理下一位置—换回（回溯）”。源数据中本题选项文本被其它题目代码污染（混入了 pailie 的残缺片段与乱码），无法独立核实标准答案所指向的字母选项。

**考点**：全排列的回溯写法（交换 + 递归 + 回溯）。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 8,
            type: "single",
            question: `上一题中，如果主函数为如下的程序，则最后的排列数是多少个？（ ）。`,
            options: [
                "120",
                "60",
                "240",
                "180",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（120）**

解析：主函数 \`pailie(0, 5, a)\` 对 5 个不同元素 {1,2,3,4,5} 生成全排列，排列总数为 5! = 5×4×3×2×1 = 120。

**考点**：n 个不同元素的全排列个数 n!。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 9,
            type: "single",
            question: `下列程序实现了输出杨辉三角形，代码中横线部分应该填入的是（ ）。`,
            options: [
                "a[i][j] = a[i-1][j-1]+a[i-1][j];",
                "a[i][j] = a[i][j-1]+a[i-1][j];",
                "a[i][j] = a[i-1][j]+a[i-1][j]; swap(a[begin], a[i]); pailie(begi$n+1$, end, a); swap(a[i], a[begin]); 1 2 3 swap(a[begin]+1, a[i]); pailie(begi$n+1$, end, a); swap(a[i], a[begi$n+1$]); 1 2 3 int main() { int a[5] = {1, 2, 3, 4, 5}; pailie(0, 5, a); return 0; } 1 2 3 4 5 #include <iostream> using namespace std; #define N 35 int a[N][N]; int main() { int n; cin >> n; for (int i = 1; i <= n; i++) for (int j = 1; j <= i; j++) { if (j == 1 || j == i) a[i][j] = 1; else __________ // 在此处填入选项 } for (int i = 1; i <= n; i++) { for (int j = 1; j <= i; j++) cout << a[i][j]; cout<<endl; } return 0; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21",
                "a[i][j] = a[i-1][j-1]+a[i][j];",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

解析：杨辉三角（帕斯卡三角）中，第 i 行第 j 个数等于上一行左上 \`a[i-1][j-1]\` 与正上 \`a[i-1][j]\` 之和：
\`\`\`cpp
a[i][j] = a[i-1][j-1] + a[i-1][j];
\`\`\`
- B 用了 \`a[i][j-1]\`（同一行左侧），不对；
- D 用了 \`a[i][j]\`（自身，递归未定义），不对。

**考点**：杨辉三角的递推关系。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 10,
            type: "single",
            question: `下面最小生成树的 Kruskal 算法程序中，横线处应该填入的是（ ）。`,
            options: [
                "uParent == vParent",
                "uParent >= vParent",
                "uParent != vParent",
                "uParent <= vParent",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（uParent != vParent）**

解析：Kruskal 算法用并查集按边权从小到大加边，只有当边的两个端点属于不同集合（即根不同）时才合并，避免成环：
\`\`\`cpp
if (uParent != vParent) {
    parent[uParent] = vParent;
    totalWeight += edge.weight;
}
\`\`\`
- A（==）会在已连通时错误合并形成环；B、D 的比较符号与并查集判连通无关。

**考点**：Kruskal + 并查集的连通性判断。`,
            tags: [
                "最小生成树",
            ],
        },
        {
            id: 11,
            type: "single",
            question: `下面 Prim 算法程序中，横线处应该填入的是（ ）。 #include <iostream> #include <vector> #include <algorithm> using namespace std; struct Edge { int u, v, weight; bool operator <(const Edge & other) const { return weight < other.weight; } }; int findParent(int vertex, vector<int> & parent) { if (parent[vertex] == -1) return vertex; return parent[vertex] = findParent(parent[vertex], parent); } int main() { int n, m; cin >> n >> m; // n: 顶点数 , m: 边数 vector<Edge> edges(m); vector<int> parent(n, -1); int totalWeight = 0; for (int i = 0; i < m; i++) cin >> edges[i].u >> edges[i].v >> edges[i].weight; sort(edges.begin(), edges.end()); for (const auto & edge : edges) { int uParent = findParent(edge.u, parent); int vParent = findParent(edge.v, parent); if (__________) { // 在此处填入选项 parent[uParent] = vParent; totalWeight += edge.weight; } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 #include <iostream> #include <vector> #include <algorithm> using namespace std; int prim(vector<vector<int>> & graph, int n) { vector<int> key(n, INT_MAX); vector<int> parent(n, -1); 1 2 3 4 5 6 7`,
            options: [
                "graph[u][v] >= 0 && key[v] > graph[u][v]",
                "graph[u][v] <= 0 && key[v] > graph[u][v]",
                "graph[u][v] == 0 && key[v] > graph[u][v]",
                "graph[u][v] != 0 && key[v] > graph[u][v]",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（graph[u][v] != 0 && key[v] > graph[u][v]）**

解析：邻接矩阵版 Prim 松弛：对当前已在 MST 中的点 u，枚举邻居 v，若 u、v 之间有边（graph[u][v] != 0 表示存在边）且 v 的当前 key 值大于该边权，则更新 key[v]。源数据中题面把 Kruskal 的并查集代码误贴进 Prim 题干，但选项针对的是矩阵松弛条件，标准答案为 D。

**考点**：Prim 算法的松弛条件（邻接矩阵：存在边且可改进 key）。`,
            tags: [
                "最小生成树",
            ],
        },
        {
            id: 12,
            type: "single",
            question: `下列 Dijkstra 算法中，横线处应该填入的是（ ）。 key[0] = 0; for (int i = 0; i < n; i++) { int u = min_element(key.begin(), key.end())-key.begin(); if (key[u] == INT_MAX) break; for (int v = 0; v < n; v++) { if (__________) { // 在此处填入选项 key[v] = graph[u][v]; parent[v] = u; } } } int sum = 0; for (int i = 0; i < n; i++) { if (parent[i] != -1) { cout << "Edge: " << parent[i] << "-" << i << " Weight: " << key[i] << endl; sum += key[i]; } } return sum; } int main() { int n, m; cin >> n >> m; vector<vector<int>> graph(n, vector<int>(n, 0)); for (int i = 0; i < m; i++) { int u, v, w; cin >> u >> v >> w; graph[u][v] = w; graph[v][u] = w; } int result = prim(graph, n); cout << "Total weight of the minimum spanning tree: " << result << endl; return 0; } 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 39 40 41 42 #include <iostream> using namespace std; #define N 100 int n, e, s; const int inf = 0x7fffff; int dis[$N+1$]; int cheak[$N+1$]; int graph[$N+1$][$N+1$]; 1 2 3 4 5 6 7 8 9`,
            options: [
                "dis[j] > minn && cheak[j] == 0",
                "dis[j] < minn && cheak[j] == 0",
                "dis[j] >= minn && cheak[j] == 0",
                "dis[j] < minn && cheak[j] != 0",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（dis[j] < minn && cheak[j] == 0）**

解析：所给片段是 Dijkstra 每轮从“未确定”点中挑选当前距离最小者的过程：在未访问（cheak[j]==0）的点里，找 dis[j] 比当前最小值 minn 更小的，更新 minn 与 minx：
\`\`\`cpp
if (dis[j] < minn && cheak[j] == 0) {
    minn = dis[j]; minx = j;
}
\`\`\`
- A（> minn）会选最远点，反了；C（>=）不会更新（应严格更小）；D（cheak[j]!=0）选了已确定的点，错误。

**考点**：Dijkstra 选“未确定点中距离最小者”。`,
            tags: [
                "最短路",
            ],
        },
        {
            id: 13,
            type: "single",
            question: `下面 Floyd 算法中，横线处应该填入的是（ ）。 int main() { for (int i = 1; i <= N; i++) dis[i] = inf; cin >> n >> e; for (int i = 1; i <= e; i++) { int a, b, c; cin >> a >> b >> c; graph[a][b] = c; } cin >> s; dis[s] = 0; for (int i = 1; i <= n; i++) { int minn = inf, minx; for (int j = 1; j <= n; j++) { if (__________) { // 在此处填入选项 minn = dis[j]; minx = j; } } cheak[minx] = 1; for (int j = 1; j <= n; j++) { if (graph[minx][j] > 0) { if (minn+graph[minx][j] < dis[j]) { dis[j] = minn+graph[minx][j]; } } } } } 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36 37 38 #include <iostream> using namespace std; #define N 21 #define INF 99999999 int map[N][N]; int main() { int n, m, t1, t2, t3; cin >> n >> m; for (int i = 1; i <= n; i++) { for (int j = 1; j <= n; j++) { if (i == j) map[i][j] = 0; else map[i][j] = INF; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16`,
            options: [
                "map[i][j] < map[i][k]+map[k][j]",
                "map[i][j] > map[i][k]+map[k][j]",
                "map[i][j] > map[i][k]-map[k][j]",
                "map[i][j] < map[i][k]-map[k][j]",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（map[i][j] > map[i][k]+map[k][j]）**

解析：Floyd 算法以 k 为中间点松弛：若经过 k 的路径比直达更短，则更新：
\`\`\`cpp
if (map[i][j] > map[i][k] + map[k][j])
    map[i][j] = map[i][k] + map[k][j];
\`\`\`
- A（<）会把更长的路径写回去，反了；C、D 用了减号，不是最短路松弛。

**考点**：Floyd-Warshall 的三重松弛。`,
            tags: [
                "STL容器",
            ],
        },
        {
            id: 14,
            type: "single",
            question: `下面程序的Merge_Sort函数时间复杂度为（ ）。 } for (int i = 1; i <= m; i++) { cin >> t1 >> t2 >> t3; map[t1][t2] = t3; } for (int k = 1; k <= n; k++) for (int i = 1; i <= n; i++) for (int j = 1; j <= n; j++) if (__________) // 在此处填入选项 map[i][j] = map[i][k]+map[k][j]; for (int i = 1; i <= n; i++) { for (int j = 1; j <= n; j++) { cout.width(4); cout << map[i][j]; } cout << endl; } } 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 void Merge(int a[], int left, int mid, int right) { int temp[right-left+1]; int i = left; int j = mid+1; int k = 0; while (i <= mid && j <= right) { if (a[i] < a[j]) temp[k++] = a[i++]; else temp[k++] = a[j++]; } while (i <= mid) temp[k++] = a[i++]; while (j <= right) temp[k++] = a[j++]; for (int m = left, n = 0; m <= right; m++, n++) a[m] = temp[n]; } void Merge_Sort(int a[], int left, int right) { if (left == right) return; int mid = (left+right) / 2; Merge_Sort(a, left, mid); Merge_Sort(a, mid+1, right); Merge(a, left, mid, right); } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 题号 1 2 3 4 5 6 7 8 9 10 答案`,
            options: [
                "O(n log n)",
                "O(n²)",
                "O(n)",
                "O(n³)",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

解析：Merge_Sort 是归并排序，递归地将区间二分到底再合并，其时间复杂度为 O(n log n)（每层合并 O(n)，共 log n 层）。源数据选项缺失（占位“…选项”），无法独立核实具体选项文字。

**考点**：归并排序时间复杂度 O(n log n)。`,
            tags: [
                "复杂度分析",
            ],
        },
        {
            id: 15,
            type: "single",
            question: `下面fibonacci函数的时间复杂度为（ ）。`,
            options: [
                "O(n)",
                "O(2ⁿ)",
                "O(log n)",
                "O(n²)",
],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

解析：题面问朴素递归 \`fibonacci(n)\` 的时间复杂度。该实现 \`f(n)=f(n-1)+f(n-2)\` 存在大量重复子问题，时间复杂度为指数级 O(φⁿ)≈O(1.618ⁿ)（也可记上界 O(2ⁿ)）。源数据选项被污染（含孤立逗号等占位），无法独立核实标准答案。

**考点**：递归斐波那契的指数级时间复杂度。`,
            tags: [
                "复杂度分析",
            ],
        },
        {
            id: 16,
            type: "judge",
            question: `表达式'3' & 1的结果为'1'。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,            score: 2,
            explanation: `**答案：错误**

解析：'3' 是字符常量，其 ASCII 码为 51（二进制 00110011）。表达式 \`'3' & 1\` 中 '3' 先整型提升为 int 51，与 1 按位与：51 & 1 = 1（最低位为 1）。结果是 int 类型的数值 1，而字符 '1' 的 ASCII 码是 49。数值 1 ≠ 49，且结果的位模式（00000001）也不是字符 '1' 的位模式（00110001）。因此结果并不是 '1'。

**考点**：字符常量的整型值、按位与运算、字符 '1' 与整数 1 的区别。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 17,
            type: "judge",
            question: `在 C++ 语⾔中，变量定义必须在某一个函数定义之内。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,            score: 2,
            explanation: `**答案：错误**

解析：C++ 允许在任意函数之外定义全局变量（和全局对象），它们在 main 之前完成初始化，并非“必须在某个函数之内”。只有局部变量才定义在函数内部。

**考点**：全局变量与局部变量的作用域。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 18,
            type: "judge",
            question: `冒泡排序一般是不稳定的。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,            score: 2,
            explanation: `**答案：错误**

解析：冒泡排序是稳定排序。标准冒泡实现只在 \`a[j] > a[j+1]\` 时才交换，相等元素不交换，故相对次序保持。不稳定的是选择排序、快速排序（普通实现）、堆排序等。

**考点**：排序算法的稳定性。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 19,
            type: "judge",
            question: `二叉排序树的查找操作的平均时间复杂度，正比于树的高度。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

解析：二叉排序树（BST）查找从根出发，每一步沿左/右子树下行一层，比较次数正比于所经路径长度，平均情况下约等于树的高度 h，即平均时间复杂度 O(h)。

**考点**：BST 查找复杂度与树高的关系。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 20,
            type: "judge",
            question: `使用math.h或cmath头文件中的余弦函数，表达式cos(60)的结果类型为double、值约为0.5。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,            score: 2,
            explanation: `**答案：错误**

解析：C/C++ 的 \`cos\` 函数参数为弧度而非角度。\`cos(60)\` 表示 cos(60 弧度)，60 rad 对 2π 取模后约 3.45 rad，cos(3.45) ≈ −0.95，并非 0.5。只有 cos(π/3)（即 60°）才约为 0.5。结果类型确为 double，但数值不是 0.5。

**考点**：cos 使用弧度制、角度与弧度的区别。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 21,
            type: "judge",
            question: `你有三种硬币，分别面值 2 元、 5 元和 7 元，每种硬币都有⾜够多。买一本书需要 27 元，则最少可以用 5 个硬币 组合起来正好付清，且不需要对方找钱。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

解析：用 2、5、7 元硬币凑 27 元，求最少枚数。尽量用 7 元：7×1 + 5×4 = 7 + 20 = 27，共 5 枚。能否 4 枚？4 枚最大 7×4 = 28，但组合不出 27（7×3+5=26、7×2+5×2+2×2=28、7×2+5+5+2×? 等均不行），故最少确为 5 枚。

**考点**：硬币凑整的最少枚数（贪心/枚举验证）。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 22,
            type: "judge",
            question: `现有 个完全相同的元素，要将其分为 组，允许每组可以有 个元素，则一共有 种分组方案。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,            score: 2,
            explanation: `**答案：错误（数据提示：题干数字全部缺失，命题不完整，未经独立核实）**

解析：题面把所有数字都留为空（“现有 □ 个完全相同的元素，分为 □ 组……一共有 □ 种方案”），命题不完整，无法独立判断真假。若泛指“n 个相同元素分 k 组、允许空组”，方案数为组合数 C(n+k−1, k−1)（隔板法）；若不允许空组则为 C(n−1, k−1)。因题干缺失，这里按“命题无法成立/不成立”判错误，并提示需补全数据。

**考点**：隔板法（相同元素分组计数）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 23,
            type: "judge",
            question: `已知int类型的变量a和b中分别存储着一个直角三角形的两条直角边的长度，则该三角形的面积可以通 过表达式a / 2.0 * b求得。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

解析：a、b 为直角边，面积 = a×b/2。表达式 \`a / 2.0 * b\` 中 2.0 为 double，a 先被提升为 double 做浮点除法，再乘 b（也提升为 double），结果即 (a×b)/2.0，数值正确；即使 a 为奇数（如 3），3/2.0 = 1.5，×4 = 6.0，无误。

**考点**：整数与浮点混合运算、三角形面积公式。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 24,
            type: "judge",
            question: `已知等差数列的通项公式 ，则前 项和的求和公式为 。使用这一公 式计算 的时间复杂度是 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确（数据提示：通项公式与求和公式文字缺失，按“用闭式求和公式求前 n 项和时间复杂度为 O(1)”判正确，未经独立核实）**

解析：等差数列前 n 项和可用闭式公式 S_n = n(a₁+aₙ)/2 直接计算，无需循环累加，时间复杂度为 O(1)。题干公式文字缺失，但所述“使用该公式计算的时间复杂度是 O(1)”这一结论本身成立。

**考点**：等差数列求和的 O(1) 闭式计算。`,
            tags: [
                "复杂度分析",
            ],
        },
        {
            id: 25,
            type: "judge",
            question: `诚实国公民只说实话，说谎国公民只说谎话。你来到一处分岔⼝，一条通往诚实国，一条通往说谎国，但 不知是哪一条通往哪⾥。正在为难之际，走来两位路⼈，他们都⾃称是诚实国公民，都说对方是说谎国公民。你想 去说谎国，可以这样问其中一位路⼈： “ 我要去说谎国，如果我去问另一个路⼈，他会指向哪一条路？ ” 。 int fibonacci(int n) { if (n <= 1) return n; else return fibonacci(n-1)+fibonacci(n-2); } 1 2 3 4 5 6 子任务编号 数据点占比 1 30% 2 30% 3 40%`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确（数据提示：题干尾部混入了编程题代码，按逻辑谜题本身判正确）**

解析：两人中一诚实一说谎（都自称诚实、互指对方说谎）。问其中一人：“我去问另一个人，他会指向哪条通往说谎国的路？”——无论问到谁，得到的都会是指向诚实国的路（诚实者如实转述说谎者的谎话；说谎者谎报诚实者的真话），因此走“相反方向”即到说谎国。这种“借对方之口取反”的问法是经典且有效的，故方法正确。题干末尾被污染进了 fibonacci 代码与子任务说明，属数据损坏。

**考点**：诚实者/说谎者逻辑谜题（双重否定取反）。`,
            tags: [
                "C++综合",
            ],
        }
    ]
};
