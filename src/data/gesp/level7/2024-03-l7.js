// 2024年3月 GESP C++ 七级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202403 七级] 交流问题

## 题目描述

来自两所学校 \$A\$、\$B\$ 的 \$n\$ 名同学聚在一起相互交流。为了方便起见，我们把这些同学从 \$1\$ 至 \$n\$ 编号。他们共进行了 \$m\$ 次交流，第 \$i\$ 次交流中，编号为 \$u_i, v_i\$ 的同学相互探讨了他们感兴趣的话题，并结交成为了新的朋友。

由于这次交流会的目的是促进两校友谊，因此只有不同学校的同学之间会交流。同校同学并不会互相交流。

作为 \$A\$ 校顾问，你对 \$B\$ 校的规模非常感兴趣，你希望求出 \$B\$ 校至少有几名同学、至多有几名同学。

## 输入格式

第一行两个正整数，表示同学的人数 \$n\$、交流的次数 \$m\$。  
接下来 \$m\$ 行，每行两个整数 \$u_i, v_i\$，表示一次交流。

## 输出格式

输出一行两个整数，用单个空格隔开，分别表示 \$B\$ 校至少有几名同学、至多有几名同学。
`,
      score: 25,
      explanation: "交流图一定是二分图。对每个连通块二染色后，两侧人数分别为 x 和 y。由于两校身份可以整体对调，所以该连通块对 B 校人数的贡献最少为 min(x,y)，最多为 max(x,y)。把各连通块贡献相加即可。",
      tags: ["编程题", "图论", "二分图", "DFS"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> g($n+1$);\n    for (int i = 0; i < m; ++i) {\n        int u, v;\n        cin >> u >> v;\n        g[u].push_back(v);\n        g[v].push_back(u);\n    }\n\n    vector<int> color($n+1$, -1);\n    int mn = 0, mx = 0;\n    for (int i = 1; i <= n; ++i) if (color[i] == -1) {\n        queue<int> q;\n        q.push(i);\n        color[i] = 0;\n        int cnt[2] = {1, 0};\n        while (!q.empty()) {\n            int u = q.front(); q.pop();\n            for (int v : g[u]) if (color[v] == -1) {\n                color[v] = color[u] ^ 1;\n                cnt[color[v]]++;\n                q.push(v);\n            }\n        }\n        mn += min(cnt[0], cnt[1]);\n        mx += max(cnt[0], cnt[1]);\n    }\n    cout << mn << ' ' << mx << '\\n';\n    return 0;\n}",
      score: 25,
      answer: '',
    },
    {
      id: 27,
      type: 'programming',
      samples: [{ input: '待补充', output: '待补充' }],
      referenceCode: '// 待补充',
      question: `
# [GESP202403 七级] 俄罗斯方块

## 题目描述

小杨同学用不同种类的俄罗斯方块填满了一个大小为 \$n \\times m\$ 的网格图。

网格图由 \$n \\times m\$ 个带颜色方块构成。小杨同学现在将这个网格图交给了你，请你计算出网格图中俄罗斯方块的种类数。  
如果两个同色方块是四连通（即上下左右四个相邻的位置）的，则称两个同色方块直接连通；若两个同色方块同时与另一个同色方块直接或间接连通，则称两个同色方块间接连通。一个俄罗斯方块由一个方块和所有与其直接或间接连接的同色方块组成。定义两个俄罗斯方块的种类相同当且仅当通过**平移**其中一个俄罗斯方块可以和另一个俄罗斯方块重合；如果两个俄罗斯方块颜色不同，仍然视为同一种俄罗斯方块。

例如，在如下情况中，方块 \$1\$ 和方块 \$2\$ 是同一种俄罗斯方块，而方块 \$1\$ 和方块 \$3\$ **不是**同一种俄罗斯方块。

![](https://cdn.luogu.com.cn/upload/image_hosting/ttv3nmgs.png)

## 输入格式

第一行包含两个正整数 \$n\$ 和 \$m\$，表示网格图的大小。  
对于之后的 \$n\$ 行，第 \$i\$ 行包含 \$m\$ 个正整数 \$a_{i1}, a_{i2}, \\dots a_{im}\$，表示该行 \$m\$ 个方块的颜色。

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
    questions: [
        {
            id: 1,
            type: "single",
            question: "下列关于排序的说法，正确的是 ( ) 。",
            options: [
                "冒泡排序是最快的排序算法之一。",
                "快速排序通常是不稳定的。",
                "最差情况， 个元素做归并排序的时间复杂度为 。",
                "以上均不正确。",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下面的程序属于哪种算法 ( ) 。",
            options: [
                "贪⼼算法",
                "动态规划",
                "深度优先搜索",
                "⼴度优先搜索 int pos[8]; void queen(int n) { for (int i = 0; i < 8; i++) { pos[n] = i; bool attacked = false; for (int j = 0; j < n; j++) if (pos[n] == pos[j] || pos[n]+n == pos[j]+j || pos[n]-n == pos[j]-j) { attacked = true; break; } if (attacked) continue; if (n == 7) { return; } else { queen($n+1$); } } } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下面有关 C++ 类的说法，错误的是（ ）。",
            options: [
                "C++ 类对象销毁时，会执⾏析构函数。",
                "C++ 类可以通过定义构造函数实现⾃动类型转换。",
                "C++ 类可以通过重载[]运算符实现通过给定下标访问数组成员的元素。",
                "C++ 类可以包含任意类型的成员变量。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 4,
            type: "single",
            question: "一个连通的简单无向图，共有 28 条边，则该图⾄少有 ( ) 个顶点。",
            options: [
                "6",
                "7",
                "8",
                "9",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 5,
            type: "single",
            question: "以下哪个方案不能合理解决或缓解哈希表冲突（ ）。",
            options: [
                "在每个哈希表项处，使用单链表管理该表项的冲突元素。",
                "建⽴额外的单链表，用来管理所有发生冲突的元素。",
                "使用不同的哈希函数再建⽴一个哈希表，用来管理所有发生冲突的元素。",
                "用新元素覆盖发生冲突的哈希表项。",
            ],
            answer: 3,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 6,
            type: "single",
            question: "已知一颗二叉树的中序遍历序列为： {C F B A E D G} ，后序遍历序列为： {F C B E G D A} ，则下列说法中正 确的是 ( ) 。",
            options: [
                "该树是平衡二叉树。",
                "该树的高为 4 。",
                "该树有 4 个叶节点。",
                "以上说法都不对。",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 7,
            type: "single",
            question: "以下关于二叉排序树的说法，正确的是（ ）。",
            options: [
                "二叉排序树的中序遍历序列一定是有序的。",
                "在含n个节点的二叉排序树中查找元素，最差情况的时间复杂度为 。",
                "二叉排序树一定是二叉平衡树。",
                "以上说法都不对。",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 8,
            type: "single",
            question: "已知x为double类型的变量，且值大于 0 ，则下列表达式的值一定大于 0 的是 ( ) 。",
            options: [
                "sin(x) / x",
                "exp(x)-x",
                "log(x)-x",
                "x * x-x",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 9,
            type: "single",
            question: "一个简单有向图有 10 个结点、 30 条边。再增加多少条边可以成为完全图。（ ）",
            options: [
                "60",
                "70",
                "15",
                "20",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下列选项中，哪个可能是下图的深度优先遍历序列（ ）。",
            options: [
                "8, 6, 1, 5, 3, 4, 2, 10, 7, 12, 11, 9",
                "7, 8, 6, 4, 2, 1, 5, 3, 12, 9, 11, 10 。",
                "8, 10, 12, 9, 11, 4, 5, 3, 2, 1, 6, 7",
                "7, 8, 10, 9, 11, 12, 4, 5, 1, 2, 3, 6 。",
            ],
            answer: 2,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面schedule函数的时间复杂度为 ( ) 。",
            options: [
                "[待补充选项]",
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
                "GESP7级",
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面search函数的平均时间复杂度为 ( ) 。 #include <algorithm> using namespace std; struct activity { int id, start, end; }; bool compare(activity a, activity b) { return a.end < b.end; } int schedule(int n, activity * p) { sort(p, p+n, compare); int cnt = 0, end = 0; for (int i = 0; i < n; i++) { if (p[i].start >= end) { end = p[i].end; cnt++; } } return cnt; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19",
            options: [
                "[待补充选项]",
                "选项B",
                "选项C",
                "可能无法返回",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面count_triple函数的时间复杂度为 ( ) 。",
            options: [
                "[待补充选项]",
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
                "GESP7级",
            ]
        },
        {
            id: 14,
            type: "single",
            question: "下面程序的输出为（ ）。 int search(int n, int * p, int target) { int low = 0, high = n; while (low <= high) { int middle = (low+high) / 2; if (target == p[middle]) { return middle; } else if (target > p[middle]) { low = middle+1; } else { high = middle-1; } } return -1; } 1 2 3 4 5 6 7 8 9 10 11 12 13 14 int count_triple(int n) { int cnt = 0; for (int a = 1; a <= n; a++) for (int b = a; a+b <= n; b++) for (int c = b; a+b+c <= n; c++) if (a * a+b * b == c * c) cnt++; return cnt; } 1 2 3 4 5 6 7 8 9 #include <iostream> using namespace std; int down(int n) { if (n <= 1) return n; return down(n-1)+down(n-2)+down(n-3); } int main() { cout << down(6) << endl; return 0; } 1 2 3 4 5 6 7 8 9 10 11 题号 1 2 3 4 5 6 7 8 9 10 答案",
            options: [
                "6",
                "13",
                "20",
                "无法正常结束。",
            ],
            answer: 0,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 15,
            type: "single",
            question: "下面的程序使用邻接矩阵表达的带权无向图，则从顶点 0 到顶点 3 的最短距离为（ ）。",
            options: [
                "6",
                "7",
                "8",
                "9",
            ],
            answer: 1,
            score: 2,
            explanation: "答案依据试卷标准答案；解析待补充。",
            tags: [
                "客观题",
                "单选题",
                "GESP7级",
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "祖冲之是南北朝时期杰出的数学家、天文学家，其主要贡献在数学、天文历法和机械制造三方面。他⾸次将 “ 圆周率 ” 精算到小数第七位，即在 3.1415926 和 3.1415927 之间。",
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
                "GESP7级",
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "C++ 语⾔中，表达式2 ^ 3的结果类型为int、值为8。 ( )",
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
                "GESP7级",
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "一棵有 个节点的完全二叉树，则树的深度为 。 ( )",
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
                "GESP7级",
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "能用动态规划解决的问题，一般也可以用贪⼼法解决，但动态规划的效率更高。 ( )",
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
                "GESP7级",
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "使用math.h或cmath头文件中的正弦函数，表达式sin(30)的结果类型为double、值约为0.5。 ( )",
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
                "GESP7级",
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "要求出简单有向图中从顶点A到顶点B的最短路径，在深度优先搜索和⼴度优先搜索中选择，⼴度优先更适 合。 ( )",
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
                "GESP7级",
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "某N个表项的哈希表，在发生哈希函数冲突时采用向后寻找空位的方法解决冲突。其查找操作的平均时间复 杂度为 ，即使当该哈希表的每个表项都有元素时，查找操作的平均时间复杂度仍为 。 ( )",
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
                "GESP7级",
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "动态规划有递推实现和递归实现，有时两种实现的时间复杂度不同。 ( )",
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
                "GESP7级",
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "围棋游戏中，判断落下一枚棋子后是否会提掉对方的子，可以使用泛洪算法来实现。 ( )",
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
                "GESP7级",
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "类B继承了抽象类A，但未实现类A中的纯虚函数f，则类B不能直接实例化。 ( ) int weight[4][4] = { {0, 2, 5, 8}, {2, 0, 1, 7}, {5, 1, 0, 4}, {8, 7, 4, 0}}; 1 2 3 4 5",
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
                "GESP7级",
            ]
        },
        ...programmingQuestions
    ]
};
