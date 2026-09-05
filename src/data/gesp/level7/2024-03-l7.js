// 2024年3月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `4 3
1 2
2 3
4 2`, output: `1 3` },
        { input: `7 5
1 2
2 3
4 2
5 6
6 7`, output: `2 5` }
      ],
      question: `
# [GESP202403 七级] 交流问题

## 题目描述

来自两所学校 $A$、$B$ 的 $n$ 名同学聚在一起相互交流。为了方便起见，我们把这些同学从 $1$ 至 $n$ 编号。他们共进行了 $m$ 次交流，第 $i$ 次交流中，编号为 $u_i, v_i$ 的同学相互探讨了他们感兴趣的话题，并结交成为了新的朋友。

由于这次交流会的目的是促进两校友谊，因此只有不同学校的同学之间会交流。同校同学并不会互相交流。

作为 $A$ 校顾问，你对 $B$ 校的规模非常感兴趣，你希望求出 $B$ 校至少有几名同学、至多有几名同学。

## 输入格式

第一行两个正整数，表示同学的人数 $n$、交流的次数 $m$。 
接下来 $m$ 行，每行两个整数 $u_i, v_i$，表示一次交流。

## 输出格式

输出一行两个整数，用单个空格隔开，分别表示 $B$ 校至少有几名同学、至多有几名同学。
`,
      score: 25,
      explanation: "交流图一定是二分图。对每个连通块二染色后，两侧人数分别为 x 和 y。由于两校身份可以整体对调，所以该连通块对 B 校人数的贡献最少为 min(x,y)，最多为 max(x,y)。把各连通块贡献相加即可。",
      tags: ["编程题", "图论", "二分图", "DFS"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> g(n + 1);\n    for (int i = 0; i < m; ++i) {\n        int u, v;\n        cin >> u >> v;\n        g[u].push_back(v);\n        g[v].push_back(u);\n    }\n\n    vector<int> color(n + 1, -1);\n    int mn = 0, mx = 0;\n    for (int i = 1; i <= n; ++i) if (color[i] == -1) {\n        queue<int> q;\n        q.push(i);\n        color[i] = 0;\n        int cnt[2] = {1, 0};\n        while (!q.empty()) {\n            int u = q.front(); q.pop();\n            for (int v : g[u]) if (color[v] == -1) {\n                color[v] = color[u] ^ 1;\n                cnt[color[v]]++;\n                q.push(v);\n            }\n        }\n        mn += min(cnt[0], cnt[1]);\n        mx += max(cnt[0], cnt[1]);\n    }\n    cout << mn << ' ' << mx << '\\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5 6
1 2 3 4 4 5
1 2 3 3 4 5
1 2 2 3 4 5
1 6 6 7 7 8
6 6 7 7 8 8`, output: `7` }
      ],
      question: `
# [GESP202403 七级] 俄罗斯方块

## 题目描述

小杨同学用不同种类的俄罗斯方块填满了一个大小为 $n \\times m$ 的网格图。

网格图由 $n \\times m$ 个带颜色方块构成。小杨同学现在将这个网格图交给了你，请你计算出网格图中俄罗斯方块的种类数。 
如果两个同色方块是四连通（即上下左右四个相邻的位置）的，则称两个同色方块直接连通；若两个同色方块同时与另一个同色方块直接或间接连通，则称两个同色方块间接连通。一个俄罗斯方块由一个方块和所有与其直接或间接连接的同色方块组成。定义两个俄罗斯方块的种类相同当且仅当通过**平移**其中一个俄罗斯方块可以和另一个俄罗斯方块重合；如果两个俄罗斯方块颜色不同，仍然视为同一种俄罗斯方块。

例如，在如下情况中，方块 $1$ 和方块 $2$ 是同一种俄罗斯方块，而方块 $1$ 和方块 $3$ **不是**同一种俄罗斯方块。

![](https://cdn.luogu.com.cn/upload/image_hosting/ttv3nmgs.png)

## 输入格式

第一行包含两个正整数 $n$ 和 $m$，表示网格图的大小。 
对于之后的 $n$ 行，第 $i$ 行包含 $m$ 个正整数 $a_{i1}, a_{i2}, \\dots a_{im}$，表示该行 $m$ 个方块的颜色。

## 输出格式

输出一行一个整数表示答案。
`,
      score: 25,
      explanation: "先按颜色做 flood fill 提取每个连通块，再把块内所有坐标平移到左上角作为规范形状，用集合去重即可。",
      tags: ["编程题", "搜索", "连通块", "哈希"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> a(n, vector<int>(m));\n    for (int i = 0; i < n; ++i) for (int j = 0; j < m; ++j) cin >> a[i][j];\n    vector<vector<int>> vis(n, vector<int>(m, 0));\n    set<vector<pair<int,int>>> shapes;\n    int dx[4] = {-1,1,0,0};\n    int dy[4] = {0,0,-1,1};\n    for (int i = 0; i < n; ++i) for (int j = 0; j < m; ++j) if (!vis[i][j]) {\n        int color = a[i][j];\n        queue<pair<int,int>> q;\n        vector<pair<int,int>> cells;\n        q.push({i,j}); vis[i][j]=1;\n        while(!q.empty()){\n            auto [x,y]=q.front(); q.pop();\n            cells.push_back({x,y});\n            for(int d=0;d<4;++d){\n                int nx=x+dx[d], ny=y+dy[d];\n                if(nx<0||nx>=n||ny<0||ny>=m||vis[nx][ny]||a[nx][ny]!=color) continue;\n                vis[nx][ny]=1; q.push({nx,ny});\n            }\n        }\n        int minx = n, miny = m;\n        for (auto [x,y]: cells) minx=min(minx,x), miny=min(miny,y);\n        vector<pair<int,int>> norm;\n        for (auto [x,y]: cells) norm.push_back({x-minx,y-miny});\n        sort(norm.begin(), norm.end());\n        shapes.insert(norm);\n    }\n    cout << shapes.size() << '\\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    }
];

export const paperData = {
    id: '2024-03-l7',
    title: '2024年3月 GESP C++ 七级真题',
    level: 7,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 5400,
    source: {
        officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B7%E7%BA%A7.pdf',
        notes: '客观题题面代码、选项与判断题答案已对照官方 PDF 校订；解析为本站补写。',
    },
    verification: {
        status: 'partial',
        reviewedBy: '本站校订',
        reviewedAt: '2026-07-04',
        scope: '客观题题面、代码、选项与判断题答案',
    },
    questions: [
        {
            id: 1,
            type: "single",
            question: `下列关于排序的说法，正确的是 ( ) 。`,
            options: [`冒泡排序是最快的排序算法之一。`, `快速排序通常是不稳定的。`, `最差情况，N 个元素做归并排序的时间复杂度为 O(N)。`, `以上均不正确。`],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

- **A** ❌ 冒泡排序 O(n²)，是最慢的常见排序之一。
- **B** ✅ 快速排序在分区交换时会打乱相等元素的相对次序，通常实现是不稳定的。
- **C** ❌ 归并排序无论最好最坏都是 O(N log N)，不是 O(N)。
- **D** ❌ B 正确，所以"均不正确"不成立。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: `下面的程序属于哪种算法 ( ) 。
\`\`\`cpp
int pos[8];
void queen(int n) {
    for (int i = 0; i < 8; i++) {
        pos[n] = i;
        bool attacked = false;
        for (int j = 0; j < n; j++)
            if (pos[n] == pos[j] || pos[n] + n == pos[j] + j || pos[n] - n == pos[j] - j) {
                attacked = true;
                break;
            }
        if (attacked)
            continue;
        if (n == 7) {
            return;
        } else {
            queen(n + 1);
        }
    }
}
\`\`\``,
            options: [
                "贪心算法",
                "动态规划",
                "深度优先搜索",
                "广度优先搜索 int pos[8]; void queen(int n) { for (int i = 0; i < 8; i++) { pos[n] = i; bool attacked = false; for (int j = 0; j < n; j++) if (pos[n] == pos[j] || pos[n]+n == pos[j]+j || pos[n]-n == pos[j]-j) { attacked = true; break; } if (attacked) continue; if (n == 7) { return; } else { queen($n+1$); } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（深度优先搜索）**

这是经典的八皇后：第 n 行逐列尝试放皇后（枚举 pos[n]），与前面各行检查同列、同对角线冲突，无冲突就递归到下一行 queen(n+1)，走不通换下一列——"一条路走到底、不行再回头"正是 DFS 回溯。

没有分层队列（非 BFS），没有最优子结构复用（非 DP），也不是每步取局部最优（非贪心）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: `下面有关 C++ 类的说法，错误的是（ ）。`,
            options: [
                "C++ 类对象销毁时，会执行析构函数。",
                "C++ 类可以通过定义构造函数实现自动类型转换。",
                "C++ 类可以通过重载[]运算符实现通过给定下标访问数组成员的元素。",
                "C++ 类可以包含任意类型的成员变量。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（错误的是 D）**

- **A** ✅ 对象销毁时自动执行析构函数。
- **B** ✅ 单参数构造函数（未加 explicit）可用作隐式类型转换。
- **C** ✅ 重载 operator[] 可以实现下标访问。
- **D** ❌ 成员变量类型有限制：不能是自身类型的非静态成员（此时类型不完整、大小无法确定），也不能是 void 或函数类型等——"任意类型"说法错误。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: `一个连通的简单无向图，共有 28 条边，则该图至少有 ( ) 个顶点。`,
            options: [
                "6",
                "7",
                "8",
                "9",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (8)**

简单无向图 n 个顶点最多 n(n−1)/2 条边。7 个顶点最多 21 条 < 28，装不下；8 个顶点最多 28 条，恰好等于 K₈ 的边数，而完全图 K₈ 是连通的，满足"连通"要求。所以至少 8 个顶点。

对比：若题目要求"非连通"（如 2023-12 卷），K₈ 之外还得加孤立点，答案就是 9——注意题干差别。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: `以下哪个方案不能合理解决或缓解哈希表冲突（ ）。`,
            options: [
                "在每个哈希表项处，使用单链表管理该表项的冲突元素。",
                "建立额外的单链表，用来管理所有发生冲突的元素。",
                "使用不同的哈希函数再建立一个哈希表，用来管理所有发生冲突的元素。",
                "用新元素覆盖发生冲突的哈希表项。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

- **A** ✅ 链地址法（separate chaining），标准方案。
- **B** ✅ 公共溢出区方案：冲突元素统一放到溢出表。
- **C** ✅ 再哈希/二级哈希表，也是可行的缓解方案。
- **D** ❌ 直接覆盖会把原有元素丢失，数据被破坏——这不是解决冲突，是制造错误。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: `已知一颗二叉树的中序遍历序列为： {C F B A E D G} ，后序遍历序列为： {F C B E G D A} ，则下列说法中正 确的是 ( ) 。`,
            options: [
                "该树是平衡二叉树。",
                "该树的高为 4 。",
                "该树有 4 个叶节点。",
                "以上说法都不对。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（树高为 4）**

由中序 {C F B A E D G} 与后序 {F C B E G D A} 重建：

1. 后序末尾 A 是根；中序里 A 左边 {C F B} 是左子树、右边 {E D G} 是右子树。
2. 左子树后序 {F C B}：B 为根；中序 {C F} 都在 B 左侧 → B 只有左孩子。子树后序 {F C}：C 为根，中序 C F → F 是 C 的右孩子。得链 B→C→F。
3. 右子树后序 {E G D}：D 为根；中序 {E} D {G} → E 左孩子、G 右孩子。

树高 = 4（路径 A→B→C→F）✅；叶节点是 F、E、G 共 3 个（C 说 4 个，错）；结点 B 左子树高 2、右子树高 0，高度差 2，不是平衡二叉树（A 错）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: `以下关于二叉排序树的说法，正确的是（ ）。`,
            options: [`二叉排序树的中序遍历序列一定是有序的。`, `在含 n 个节点的二叉排序树中查找元素，最差情况的时间复杂度为 O(log(n))。`, `二叉排序树一定是二叉平衡树。`, `以上说法都不对。`],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

- **A** ✅ 二叉排序树（BST）左 < 根 < 右，中序遍历天然得到升序序列——这是它最重要的性质。
- **B** ❌ 最差情况（按有序序列插入）树退化成链，查找 O(n)；O(log n) 只是平衡时的表现。
- **C** ❌ BST 不保证平衡，平衡是 AVL/红黑树等额外维护的性质。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: `已知x为double类型的变量，且值大于 0 ，则下列表达式的值一定大于 0 的是 ( ) 。`,
            options: [
                "sin(x) / x",
                "exp(x)-x",
                "log(x)-x",
                "x * x-x",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（exp(x) − x）**

- **A** ❌ sin(x) 会取负值（如 x = 4 rad 时 sin ≈ −0.76），除以正数 x 仍为负。
- **B** ✅ 对 x > 0 恒有 eˣ > 1 + x > x（指数函数的泰勒展开 eˣ = 1 + x + x²/2! + … 各项为正），所以 exp(x) − x > 0 恒成立。
- **C** ❌ 对所有 x > 0 都有 ln(x) < x，所以 log(x) − x 恒为负。
- **D** ❌ 0 < x < 1 时 x² < x，表达式为负（如 x = 0.5 → −0.25）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: `一个简单有向图有 10 个结点、 30 条边。再增加多少条边可以成为完全图。（ ）`,
            options: [
                "60",
                "70",
                "15",
                "20",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (60)**

有向完全图任意两个不同顶点之间有**两条**方向相反的弧，10 个结点共 10 × 9 = 90 条弧。已有 30 条，还需 90 − 30 = 60 条。

陷阱：若按无向完全图算 10×9/2 = 45 会误选 C(15)——注意"有向"。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: `下列选项中，哪个可能是下图的深度优先遍历序列（ ）。

（图为 12 个顶点的有向图，弧包括：7⇄8、8→6、6→1、8→10、9→10、9→11、12→9、10→12、11→12、12→4、6→4、4→2、2→1、2→3、5→3、3→4、4→5、1→5）`,
            options: [
                "8, 6, 1, 5, 3, 4, 2, 10, 7, 12, 11, 9",
                "7, 8, 6, 4, 2, 1, 5, 3, 12, 9, 11, 10 。",
                "8, 10, 12, 9, 11, 4, 5, 3, 2, 1, 6, 7",
                "7, 8, 10, 9, 11, 12, 4, 5, 1, 2, 3, 6 。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

DFS 规则：每一步只能走到"当前顶点"的一个未访问邻接点，无路可走才回溯；回溯后从栈上顶点继续尝试其余邻居。逐项验证：

- **C** ✅ 8→10→12→9（12→9）→11（9→11），回溯到 12 走 4（12→4）→5（4→5）→3（5→3），回溯到 4 走 2（4→2）→1（2→1），全部回溯到 8 后依次访问 6（8→6）、7（8→7）。每一步都合法。
- **A** ❌ 走到 …2, 10 之后序列接 7：但 10 的未访问出边指向 12，DFS 必须先访问 12，不能跳到 7。
- **B** ❌ …5, 3 之后序列接 12：回溯路径上 8 还有未访问邻居 10 必须先走，12 与栈上任何顶点都不邻接。
- **D** ❌ 8→10 之后序列接 9：10 的出边只有 12，从 10 走不到 9（9→10 是反方向）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: `下面 schedule 函数的时间复杂度为 ( ) 。
\`\`\`cpp
#include <algorithm>
using namespace std;
struct activity {
    int id, start, end;
};
bool compare(activity a, activity b) {
    return a.end < b.end;
}
int schedule(int n, activity *p) {
    sort(p, p + n, compare);
    int cnt = 0, end = 0;
    for (int i = 0; i < n; i++) {
        if (p[i].start >= end) {
            end = p[i].end;
            cnt++;
        }
    }
    return cnt;
}
\`\`\``,
            options: [`O(n)`, `O(log(n))`, `O(n log(n))`, `O(n²)`],
            answer: 2,
            score: 2,
            explanation: `**答案：C（O(n log n)）**

函数分两段：sort 排序 O(n log n)，后面的贪心扫描单层循环 O(n)。总复杂度取主导项 O(n log n)。

顺带认识代码：这是经典的"活动选择"贪心——按结束时间排序，能选就选，求最多不重叠活动数。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: `下面 search 函数的平均时间复杂度为 ( ) 。
\`\`\`cpp
int search(int n, int *p, int target) {
    int low = 0, high = n;
    while (low <= high) {
        int middle = (low + high) / 2;
        if (target == p[middle]) {
            return middle;
        } else if (target > p[middle]) {
            low = middle + 1;
        } else {
            high = middle - 1;
        }
    }
    return -1;
}
\`\`\``,
            options: [`O(n)`, `O(log(n))`, `O(1)`, `可能无法返回`],
            answer: 1,
            score: 2,
            explanation: `**答案：B（O(log n)）**

这是标准二分查找：每轮把区间 [low, high] 缩小一半，最多循环 ⌈log₂n⌉ + 1 次，平均与最坏都是 O(log n)。

D 是干扰项：low 与 high 每轮必有一个向中间移动，区间严格缩小，循环必然终止、必有返回。（代码里 high 初值取 n 而非 n−1 是个边界瑕疵，但不影响复杂度结论。）`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: `下面 count_triple 函数的时间复杂度为 ( ) 。
\`\`\`cpp
int count_triple(int n) {
    int cnt = 0;
    for (int a = 1; a <= n; a++)
        for (int b = a; a + b <= n; b++)
            for (int c = b; a + b + c <= n; c++)
                if (a * a + b * b == c * c)
                    cnt++;
    return cnt;
}
\`\`\``,
            options: [`O(N)`, `O(N²)`, `O(N³)`, `O(N⁴)`],
            answer: 2,
            score: 2,
            explanation: `**答案：C（O(N³)）**

三重循环枚举满足 a + b + c ≤ N 的三元组：虽然内层的上界互相牵制，总迭代次数等于该不等式的整点个数，约为 N³/6 的量级——常数不影响大 O，仍是 O(N³)。循环体内只有 O(1) 的判断。

代码本身在数勾股数（a² + b² = c²）。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: `下面程序的输出为（ ）。
\`\`\`cpp
#include <iostream>
using namespace std;
int down(int n) {
    if (n <= 1)
        return n;
    return down(n - 1) + down(n - 2) + down(n - 3);
}
int main() {
    cout << down(6) << endl;
    return 0;
}
\`\`\``,
            options: [
                "6",
                "13",
                "20",
                "无法正常结束。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (6)**

注意边界是 n ≤ 1 时**返回 n 本身**，所以 down(0)=0、down(−1)=−1（会被 down(2) 用到！）：

| n | −1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|---|
| down(n) | −1 | 0 | 1 | 0 | 1 | 2 | 3 | 6 |

- down(2) = 1 + 0 + (−1) = 0（陷阱所在）
- down(3) = 0 + 1 + 0 = 1；down(4) = 1 + 0 + 1 = 2
- down(5) = 2 + 1 + 0 = 3；down(6) = 3 + 2 + 1 = **6**`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: `下面的程序使用邻接矩阵表达的带权无向图，则从顶点 0 到顶点 3 的最短距离为（ ）。
\`\`\`cpp
int weight[4][4] = {
    {0, 2, 5, 8},
    {2, 0, 1, 7},
    {5, 1, 0, 4},
    {8, 7, 4, 0}};
\`\`\``,
            options: [
                "6",
                "7",
                "8",
                "9",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (7)**

枚举 0 → 3 的所有路径：
- 直达：weight[0][3] = 8
- 0→1→3：2 + 7 = 9
- 0→2→3：5 + 4 = 9
- 0→1→2→3：2 + 1 + 4 = **7** ✅
- 0→2→1→3：5 + 1 + 7 = 13

最短距离 7。绕路反而更近（0-1 和 1-2 都很便宜），这正是最短路算法存在的意义。`,
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: `祖冲之是南北朝时期杰出的数学家、天文学家，其主要贡献在数学、天文历法和机械制造三方面。他首次将 “ 圆周率 ” 精算到小数第七位，即在 3.1415926 和 3.1415927 之间。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

祖冲之（南北朝）在数学、天文历法、机械制造三方面都有杰出贡献，他将圆周率精确计算到小数点后第 7 位（3.1415926 与 3.1415927 之间），领先世界约千年。属于信息学常识题。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: `C++ 语言中，表达式2 ^ 3的结果类型为int、值为8。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

C++ 里 \`^\` 不是乘方，是**按位异或**：2 ^ 3 = 010₂ XOR 011₂ = 001₂ = 1。结果类型确实是 int，但值是 1 不是 8。

求乘方要用 cmath 的 pow(2, 3)（返回 double）。这是七级最经典的运算符陷阱之一。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: `一棵有 N 个节点的完全二叉树，则树的深度为 ⌊log₂(N)⌋ + 1。( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

完全二叉树前 d−1 层放满共 2^(d−1) − 1 个结点，因此深度为 d 时 2^(d−1) ≤ N ≤ 2^d − 1，两边取对数得 d − 1 ≤ log₂N < d，即 d = ⌊log₂N⌋ + 1。

本题公式带了"以 2 为底"和"向下取整"，表述严谨，判正确。（对比 2023-12 卷同类题：写成 log(N)+1 不带取整就判错误——细节决定对错。）`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: `能用动态规划解决的问题，一般也可以用贪心法解决，但动态规划的效率更高。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

关系说反了。贪心要求"贪心选择性质"，比动态规划的适用条件**更苛刻**：能用贪心的问题一般能用 DP 验证，但能用 DP 的问题大多不满足贪心性质（如 0/1 背包用贪心会得到错误答案）。

"一般也可以用贪心法解决"不成立；后半句"DP 效率更高"也不对——两者都适用时贪心通常更快。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: `使用math.h或cmath头文件中的正弦函数，表达式sin(30)的结果类型为double、值约为0.5。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

结果类型确实是 double，但值不对：cmath 的 sin 接受的是**弧度**，sin(30) 是 30 弧度的正弦 ≈ −0.988，不是 0.5。

要算 30° 的正弦得先转弧度：sin(30 * M_PI / 180) ≈ 0.5。"角度 vs 弧度"是三角函数题的固定考点。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: `要求出简单有向图中从顶点A到顶点B的最短路径，在深度优先搜索和广度优先搜索中选择，广度优先更适 合。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

"简单有向图"未给边权（视为等权），此时 BFS 按层扩展，第一次到达 B 时经过的弧数就是最短路径长度，时间 O(n+e) 一次搞定。

DFS 找的是"某条"路径而非最短，要求最短必须枚举回溯所有路径，效率低得多。无权最短路选 BFS，判正确。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: `某 N 个表项的哈希表，在发生哈希函数冲突时采用向后寻找空位的方法解决冲突。其查找操作的平均时间复杂度为 O(1)，即使当该哈希表的每个表项都有元素时，查找操作的平均时间复杂度仍为 O(1)。( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

开放定址（线性探测）的平均 O(1) 依赖**负载因子较低**。随着表越来越满，探测序列越来越长；当每个表项都有元素（负载因子 = 1）时，一次查找可能要扫过大半张表，平均代价退化到 O(N) 量级。

"表满了仍 O(1)"违背开放定址的基本性质，判错误。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: `动态规划有递推实现和递归实现，有时两种实现的时间复杂度不同。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

同一个 DP，递推（自底向上）会计算状态空间里的**全部**状态；记忆化递归（自顶向下）只计算从初始问题可达的状态，还可能被剪枝跳过大片状态。若不加记忆化直接递归，更会因重复子问题退化成指数级。

所以两种实现的时间复杂度确实可能不同，判正确。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: `围棋游戏中，判断落下一枚棋子后是否会提掉对方的子，可以使用泛洪算法来实现。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

围棋提子规则：一块棋（同色相连的棋子组）没有"气"（相邻空点）就被提掉。落子后，对相邻的对方棋子做泛洪（Flood Fill）：扩展出整个同色连通块，同时检查块的四周是否存在空点——无气则提。这正是泛洪算法的典型应用，判正确。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: `类 B 继承了抽象类 A，但未实现类 A 中的纯虚函数 f，则类 B 不能直接实例化。( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

含有纯虚函数（virtual … = 0）的类是抽象类。派生类若没有 override 全部纯虚函数，它本身仍是抽象类，同样不能创建对象——编译器直接报错。

只有把继承来的纯虚函数全部实现，派生类才能实例化，判正确。`,
            tags: [
                "客观题",
                "判断题",
                "GESP7级",
            ]
        },
        ...programmingQuestions
    ]
};
