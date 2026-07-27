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

**解析：**
邻接矩阵用一个 n×n 的二维数组表示 n 个顶点的无向图，无论边数多少都固定占用 n² 个存储单元。

- **A n**：错误。这是顶点数，不是矩阵大小。
- **B n²**：正确。n×n 矩阵共 n² 个元素。
- **C 2n**：错误。与矩阵实际规模不符。
- **D n(n-1)/2**：错误。这是完全图边数，或仅存上三角时的优化规模，并非标准邻接矩阵大小。
`,
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

**解析：**
释放一棵含 n 个结点的二叉树，需要遍历每个结点恰好一次并 delete，因此时间复杂度为 O(n)。

- **A O(n)**：正确。每个结点仅访问一次。
- **B O(n²)**：错误。无需双重遍历。
- **C O(log n)**：错误。那是树高的量级，而非遍历全部结点。
- **D O(2ⁿ)**：错误。指数级复杂度与此操作无关。
`,
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

**解析：**
经典几何概率结论——单位圆上随机分布 n 个点，它们能被某个单位半圆周全部覆盖的概率为 n/2^(n−1)。

- **A n/2^(n-1)**：正确。固定某点为最左点，其余 n−1 个点都落入其顺时针 180° 半圆内的概率为 (1/2)^(n−1)，再乘 n 种选择得 n/2^(n−1)。
- **B 1/2^n**：错误。指数与底数均不正确。
- **C 1/n**：错误。与半圆覆盖模型不符。
- **D (n-1)/2^n**：错误。形式错误。
`,
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

**解析：**
\`pailie\` 是递归生成全排列的典型回溯程序：在位置 \`i\` 处依次把 \`a[i]\` 与 \`a[t]\`（循环变量 \`t\` 从 \`i\` 到末尾）交换，再递归处理下一位置 \`i+1\`，最后换回以恢复现场。只有 C 选项完整呈现了“交换—递归—回溯”的结构。

- **A \`swap(a[i], a[j]); pailie(a, i+1); swap(a[i], a[j]);\`**：错误。交换使用的是 \`a[j]\` 而非循环的当前位置 \`a[t]\`，无法遍历所有排列。
- **B \`swap(a[i], a[t]); pailie(a, t+1); swap(a[i], a[t]);\`**：错误。递归应在 \`i+1\`（处理下一个待固定位置），而非 \`t+1\`。
- **C \`swap(a[i], a[t]); pailie(a, i+1); swap(a[i], a[t]);\`**：正确。交换循环位置、递归下一位置、再换回，是标准的全排列回溯写法。
- **D \`pailie(a, i+1);\`**：错误。缺少交换与回溯，只能生成原序列本身，无法得到全部排列。`,
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
            question: `下面程序的 \`Merge_Sort\` 函数时间复杂度为（ ）。

\`\`\`cpp
void Merge(int a[], int left, int mid, int right) {
    int temp[right - left + 1];
    int i = left;
    int j = mid + 1;
    int k = 0;
    while (i <= mid && j <= right) {
        if (a[i] < a[j])
            temp[k++] = a[i++];
        else
            temp[k++] = a[j++];
    }
    while (i <= mid)
        temp[k++] = a[i++];
    while (j <= right)
        temp[k++] = a[j++];
    for (int m = left, n = 0; m <= right; m++, n++)
        a[m] = temp[n];
}

void Merge_Sort(int a[], int left, int right) {
    if (left == right)
        return;
    int mid = (left + right) / 2;
    Merge_Sort(a, left, mid);
    Merge_Sort(a, mid + 1, right);
    Merge(a, left, mid, right);
}
\`\`\``,
            options: [
                "O(n log n)",
                "O(n²)",
                "O(2ⁿ)",
                "O(log n)",
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：A（O(n log n)）**

**解析：** \`Merge_Sort\` 每次把长度为 \`n\` 的区间分成两个约为
\`n/2\` 的子区间，递归排序后再调用 \`Merge\`。一次合并会顺序处理区间中的
\`n\` 个元素，因此递推式为：

\`T(n)=2T(n/2)+O(n)\`。

递归树共有 \`O(log n)\` 层，每一层所有合并处理的元素总数都是
\`O(n)\`，所以总时间复杂度是 \`O(n log n)\`。

- B 的 \`O(n²)\` 常见于两层完整嵌套扫描，不符合这里“二分后线性合并”的结构。
- C 的 \`O(2ⁿ)\` 常见于产生大量重复子问题的指数递归；这里两个子区间互不重叠。
- D 的 \`O(log n)\` 只计算了递归深度，漏掉了每层的合并工作。

**考点**：归并排序、递归树、时间复杂度。`,
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

**解析：**
朴素递归 \`fibonacci(n)\` 通过 \`f(n)=f(n-1)+f(n-2)\` 计算，存在大量重复子问题，其调用树近似为二叉结构，时间复杂度为指数级 O(φⁿ)≈O(1.618ⁿ)，通常取其上界 O(2ⁿ)。

- **A \`O(n)\`**：错误。仅当用迭代或记忆化（动态规划）时才可能达到线性。
- **B \`O(2ⁿ)\`**：正确。朴素递归斐波那契的指数级时间复杂度上界。
- **C \`O(log n)\`**：错误。与递归结构完全不符。
- **D \`O(n²)\`**：错误。远低于实际指数级开销。`,
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
            explanation: `**答案：错误**

**解析：**
本题命题涉及“将相同元素分组”的方案数。若把 n 个完全相同元素分成 k 组，允许空组的方案数为 C(n+k−1, k−1)（隔板法），不允许空组为 C(n−1, k−1)。依据官方答案，该命题判为错误。

（注：原题所引程序代码未完整收录，以下解析依据题面描述与标准结论。）`,
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
            explanation: `**答案：正确**

**解析：**
等差数列前 n 项和可用闭式公式 Sₙ = n(a₁+aₙ)/2 直接计算，无需循环逐项累加。因此“使用闭式求和公式计算前 n 项和的时间复杂度为 O(1)”这一结论成立，命题为真。

（注：原题所引程序代码未完整收录，以下解析依据题面描述与标准结论。）`,
            tags: [
                "复杂度分析",
            ],
        },
        {
            id: 25,
            type: "judge",
            question: `诚实国公民只说实话，说谎国公民只说谎话。你来到一处分岔口，一条通往诚实国，一条通往说谎国，但不知是哪一条通往哪里。正在为难之际，走来两位路人，他们都自称是诚实国公民，都说对方是说谎国公民。你想去说谎国，可以这样问其中一位路人：“我要去说谎国，如果我去问另一个路人，他会指向哪一条路？”`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 8,
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-26',
            explanation: `**答案：正确**

解析：两人中一诚实一说谎。无论问到谁，关于“另一个人会指向哪条路”的回答都会指向诚实国：诚实者会如实转述说谎者的错误指向，说谎者则会对诚实者的正确指向说谎。因此走回答所指方向的相反方向即可到达说谎国，题干方法正确。

**考点**：诚实者/说谎者逻辑谜题（双重否定取反）。`,
            tags: [
                "C++综合",
            ],
        }
    ]
};
