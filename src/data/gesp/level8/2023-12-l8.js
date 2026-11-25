// 2023年12月 GESP C++ 八级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [{"input":"3\n3 2 1 2\n3 2 1 3\n5 3 3 1 1","output":"3\n4\n20"},{"input":"5\n100 1 100\n100 1 101\n20 2 12 8\n123 4 80 20 21 3\n999 5 101 234 499 66 99","output":"1\n1\n125970\n895031741\n307187590"}],
      question: "\n# [GESP202312 八级] 奖品分配\n\n## 题目描述\n\n班上有 $N$ 名同学，学号从 $0$ 到 $N-1$。有 $M$ 种奖品要分给这些同学，其中，第 $i$ 种奖品总共有 $a_i$ 个 （$i=0,1, \\cdots ,M-1$）。\n\n巧合的是，奖品的数量不多不少，每位同学都可以恰好分到一个奖品，且最后剩余的奖品不超过 $1$ 个（即：$N\\le a_0+a_1+ \\cdots +a_{M-1}\\le N+1$）。\n\n现在，请你求出每个班级礼物分配的方案数，所谓方案，指的是为每位同学都分配一个种类的奖品。\n\n只要有一位同学获得了不同种类的奖品，即视为不同的方案。方便起见，你只需要输出方案数对 $10^{9}+7$ 取模后的结果即可。\n\n共有 $T$ 个班级都面临着奖品分配的问题，你需要依次为他们解答。\n\n## 输入格式\n\n第一行一个整数 $T$，表示班级数量。\n\n接下来 $T$ 行，每行若干用单个空格隔开的正整数。首先是两个正整数$N,M$，接着是 $M$ 个正整数 $a_0,a_1...a_{M-1}$。保证 $N \\le a_0+a_1+\\cdots+a_{M-1} \\le N+1 $。\n\n## 输出格式\n\n输出 $T$ 行，每行一个整数，表示该班级分配奖品的方案数对 $10^{9}+7$ 取模的结果。\n\n\n## 数据规模\n\n对于 30% 的测试点，保证 $N \\le 10$。\n\n对于另外 30% 的测试点，保证 $M = 2$。\n\n对于所有测试点，保证 $N \\le 1000$；$T \\le 1000$；$M \\le 1001$。",
      tags: ["编程题", "组合数学", "组合数", "计数"],
      explanation: "按奖品种类依次分配。若当前还剩 sum 件奖品，其中某类有 a_i 件，则有 C(sum, a_i) 种选位方式，依次相乘即可。",
      template: "#include <bits/stdc++.h>\nusing namespace std;\nint main(){ios::sync_with_stdio(false);cin.tie(nullptr);int T;cin>>T;while(T--){/* 在这里编写你的代码 */}return 0;}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\nconst int N=1005,MOD=1000000007;int C[N+5][N+5],a[N+5];void addmod(int &x,int y){x+=y;if(x>=MOD)x-=MOD;}void init(){C[0][0]=1;for(int i=1;i<=N;++i){C[i][0]=C[i][i]=1;for(int j=1;j<i;++j){C[i][j]=C[i-1][j-1];addmod(C[i][j],C[i-1][j]);}}}int main(){ios::sync_with_stdio(false);cin.tie(nullptr);init();int T;cin>>T;while(T--){int n,m,sum=0;cin>>n>>m;for(int i=1;i<=m;++i)cin>>a[i],sum+=a[i];long long ans=1;for(int i=1;i<=m;++i){ans=ans*C[sum][a[i]]%MOD;sum-=a[i];}cout<<ans<<\"\\n\";}return 0;}",
      score: 25,
      timeLimit: '1.0 s',
      memoryLimit: '128 MB',
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["question","samples","reviewedBy","reviewedAt","sourcePage"],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
0 0 2 2
3
2 3 4
3 2 3 4
2 1 4`, output: `2
2
0` },
        { input: `7
0 1 0 2 1 2
5
2 4 6
2 4 5
3 4 5 6
4 2 4 5 6
2 3 4`, output: `2
1
1
1
0` }
      ],
      question: "\n# [GESP202312 八级] 大量的工作沟通\n\n## 题目描述\n\n某公司有 $N$ 名员工，编号从 $0$ 至 $N-1$。其中，除了 $0$ 号员工是老板，其余每名员工都有一个直接领导。我们假设编号为 $i$ 的员工的直接领导是 $f_i$。\n\n该公司有严格的管理制度，每位员工只能受到本人或直接领导或间接领导的管理。具体来说，规定员工 $x$ 可以管理员工 $y$，当且仅当 $x=y$，或 $x=f_y$，或 $x$ 可以管理 $f_y$。特别地，$0$ 号员工老板只能自我管理，无法由其他任何员工管理。\n\n现在，有一些同事要开展合作，他们希望找到一位同事来主持这场合作，这位同事必须能够管理参与合作的所有同事。如果有多名满足这一条件的员工，他们希望找到编号最大的员工。你能帮帮他们吗？\n\n## 输入格式\n\n第一行一个整数 $N$ ，表示员工的数量。\n\n第二行 $N-1$ 个用空格隔开的非负整数，依次为 $f_1, f_2, \\dots f_{N-1}$。\n\n第三行一个整数 $Q$ ，表示共有 $Q$ 场合作需要安排。\n\n接下来 $Q$ 行，每行描述一场合作：开头是一个整数 $m$（$2 \\leq m \\leq N$），表示参与本次合作的员工数量；接着是 $m$ 个整数，依次表示参与本次合作的员工编号（保证编号合法且不重复）。\n\n保证公司结构合法，即不存在任意一名员工，其本人是自己的直接或间接领导。\n\n## 输出格式\n\n输出 $Q$ 行，每行一个整数，依次为每场合作的主持人选。\n\n\n## 数据规模\n\n对于 25% 的测试点，保证 $N \\le 50$。\n\n对于 50% 的测试点，保证 $N \\le 300$。\n\n对于所有测试点，保证 $3 \\le N \\le 10^5$；$Q \\le 100$；$m \\le 10^4$。",
      tags: ["编程题", "树", "LCA", "重链剖分"],
      explanation: "所有参与者的公共管理者就是这些点在树上的最近公共祖先。再预处理根到每点路径上的最大编号 mxId，答案即为 mxId[LCA]。",
      template: "#include <bits/stdc++.h>\nusing namespace std;\nint main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n;/* 在这里编写你的代码 */return 0;}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;const int N=100005;int fa[N],sz[N],dep[N],son[N],tp[N],mxId[N],cnt,fir[N],tar[N],nxt[N];void linkEdge(int a,int b){tar[++cnt]=b;nxt[cnt]=fir[a];fir[a]=cnt;}void dfs(int x,int mxid){int mx=0;sz[x]=1;mxId[x]=max(x,mxid);for(int i=fir[x];i;i=nxt[i]){dep[tar[i]]=dep[x]+1;dfs(tar[i],mxId[x]);sz[x]+=sz[tar[i]];if(mx<sz[tar[i]])mx=sz[son[x]=tar[i]];}}void getTop(int x){tp[x]=x;if(son[fa[x]]==x)tp[x]=tp[fa[x]];for(int i=fir[x];i;i=nxt[i])getTop(tar[i]);}int lca(int x,int y){while(tp[x]!=tp[y])dep[tp[x]]>dep[tp[y]]?x=fa[tp[x]]:y=fa[tp[y]];return dep[x]<dep[y]?x:y;}int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int n;cin>>n;for(int i=2;i<=n;++i){cin>>fa[i];++fa[i];linkEdge(fa[i],i);}dfs(1,1);getTop(1);int q;cin>>q;while(q--){int m,x,y;cin>>m>>x;x++;for(int i=2;i<=m;++i){cin>>y;x=lca(x,y+1);}cout<<mxId[x]-1<<\"\\n\";}return 0;}",
      score: 25,
      timeLimit: "2.0 s",
      memoryLimit: '128 MB',
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 9,
      "reviewedFields": ["question","reviewedBy","reviewedAt","sourcePage","timeLimit"],
    }
];

export const paperData = {
    id: '2023-12-l8',
    title: '2023年12月 GESP C++ 八级真题',
    level: 8,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `小杨要从 A 城到 B 城，又想顺路游览一番。他有两个选项： 1 、坐高铁路到 C 城游览，再坐高铁或飞机到 B 城； 2 、坐船到 D 城游览，再坐船、高铁或飞机到 B 城。请问小杨从 A 城到 B 城共有几种交通方案可以选择？（ ）。`,
            options: [
                "2",
                "3",
                "5",
                "6",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（5）**

分两类计数。方案 1：A 坐高铁到 C，再从 C 到 B。A 到 C 只有高铁 1 种走法；C 到 B 有高铁、飞机 2 种，共 1×2 = 2 种。方案 2：A 坐船到 D，再从 D 到 B。A 到 D 只有船 1 种；D 到 B 有船、高铁、飞机 3 种，共 1×3 = 3 种。

两类路线互不重叠，按加法原理合计 2 + 3 = 5 种。

**选项分析：**
- A 2：只数了第一种方案。
- B 3：只数了第二种方案。
- C 5：两类相加，正确。
- D 6：把某一段的选择数重复计算了一次。

**考点：** 分类加法计数原理与分步乘法计数原理。先按中转城市分类，每一类内部把各段走法相乘，最后把各类结果相加。

**易错提醒：** 先判断是分类还是分步：不同中转城市之间用加法，同一路线内各段之间用乘法。若把两类结果 2 和 3 再误加 1，就会得到干扰项 6。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 2,
            type: "single",
            question: `以下哪个函数声明是符合语法的，且在调用时可以将二维数组的名字作为实际参数传递给形式参数a？（ ）。`,
            options: [
                "void QuickSort(int a[][10], int n);",
                "void QuickSort(int a[5][], int m);",
                "void QuickSort(int a[][], int n, int m);",
                "void QuickSort(int ** a, int n, int m);",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（void QuickSort(int a[][10], int n);）**

解析：C++ 把多维数组作为函数参数时，除第一维外其余各维的大小必须显式给出，因为编译器需要第二维来计算每行元素在内存中的偏移。

- A \`int a[][10]\`：合法，第二维为 10，可接收如 \`int x[3][10]\` 这样的二维数组名。
- B \`int a[5][]\`：非法，缺失第二维大小。
- C \`int a[][]\`：非法，除第一维外都必须给出，这里两个维度都缺失。
- D \`int **a\`：指向指针的指针，与二维数组名（退化为 \`int(*)[10]\`）类型不匹配，不能直接用二维数组名传参。

**考点**：数组形参退化规则与多维数组传参。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 3,
            type: "single",
            question: `下面有关 C++ 类和对象的说法，错误的是（ ）。`,
            options: [
                "对象的生命周期开始时，会执行构造函数。",
                "对象的生命周期结束时，会执行析构函数。",
                "类的析构函数可以为虚函数。",
                "类的构造函数可以为虚函数。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（类的构造函数可以为虚函数。—— 错误）**

解析：本题问"说法错误的是"，D 错误。

- A ✅ 对象创建（生命周期开始）时自动调用构造函数。
- B ✅ 对象销毁（生命周期结束）时自动调用析构函数。
- C ✅ 析构函数可以且常被声明为 virtual（多态基类需虚析构以避免泄漏）。
- D ❌ 构造函数不能是虚函数：虚函数调用依赖虚表指针，而对象构造期间虚表尚未完全建立；且构造函数不被继承，也不需要多态分发。

**考点**：构造函数 / 析构函数语义与虚函数机制。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 4,
            type: "single",
            question: `使用邻接矩阵表达n个顶点的有向图，则该矩阵的大小为（ ）。`,
            options: ["n×(n+1)","n×n","n×(n-1)","n×(n-1)/2"],
            answer: 1,
            score: 2,
            explanation: "**答案：B**\n\n**解析：**\n使用邻接矩阵表示 n 个顶点的有向图时，需要一个 n 行 n 列的方阵，共 n² 个元素；matrix[i][j] 表示顶点 i 到顶点 j 是否有边或边权，因此矩阵大小为 n×n。\n\n- A n×(n+1)：错误，不是方阵规模；\n- B n×n：正确；\n- C n×(n−1)：错误，少一行；\n- D n×(n−1)/2：错误，这是无向完全图的无序边对数。\n\n**考点：** 邻接矩阵的规模。",
            tags: [
                "C++综合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 5,
            type: "single",
            question: `5位同学排队，其中一位同学不能排在第一，则共有多少种可能的排队方式？（ ）。`,
            options: [
                "5",
                "24",
                "96",
                "120",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（96）**

**核心解析：**
本题考查排列组合基础中的**分步乘法计数原理**与**补集排除思想（正难则反）**。

求解此类有特殊限制的排队问题，常见有两种思路：

**方法一：补集排除法（正难则反，推荐）**
1. **计算无限制全排列**：若不加任何限制，5 位同学排成一队的总排列数为 \`5! = 5 * 4 * 3 * 2 * 1 = 120\` 种。
2. **计算不合要求的排列**：限制条件为「某位同学不能排在第一位」。反向思考，如果该同学恰好排在第一位，则第一位固定（1 种可能），剩下的 4 个位置由其余 4 位同学任意排列，共有 \`4! = 4 * 3 * 2 * 1 = 24\` 种情况。
3. **作差求合法排列数**：用全排列总数减去不符合条件的排列数，得到满足条件的排队方式共有 \`120 - 24 = 96\` 种。

**方法二：位置分析法（直接分步法）**
1. **优先安排特殊位置**：排队共有 5 个位置。因为某位特定同学不能排在第一位，所以第一位只能从其余 4 位同学中挑选 1 人，共有 4 种选法。
2. **安排剩余位置**：第一位确定后，剩余的 4 位同学（包含那位受限制的同学）可以任意排列在剩下的 4 个位置上，共有 \`4! = 4 * 3 * 2 * 1 = 24\` 种排法。
3. **乘法原理求总数**：两个步骤依次进行，总排法为 \`4 * 24 = 96\` 种。

**选项逐项分析：**
- **A 5**：❌ 混淆了排队人数与全排列方案数。5 仅为总人数或某个单一步骤的备选数，并非全部排队方案的总数。
- **B 24**：❌ 计算出的是「该同学恰好排在第一位」的不合法情况数（即 \`4! = 24\`），这是题目要求排除的情况，而非所求答案。
- **C 96**：✅ 计算正确。无论采用补集法（\`120 - 24 = 96\`）还是位置分析法（\`4 * 24 = 96\`），均得出符合条件的排法为 96 种。
- **D 120**：❌ 计算出的是 5 位同学完全不受限制的全排列总数（即 \`5! = 120\`），完全忽略了题目中「一位同学不能排在第一」的约束条件。

**易错提醒：**
- **审题遗漏限制**：解题时容易直接套用全排列公式 \`5! = 120\`，漏看题干给出的特殊位置限制。
- **排除法未算完**：计算出被排除的违规排法 \`4! = 24\` 后，误将其当作最终答案选出，忘记用总数相减。
- **特殊优先原则**：处理有限制条件的排列组合时，应牢记「特殊元素或特殊位置优先安排」的原则，优先决定第一位的人选，条理更清晰且不易重复或遗漏。

**知识延伸：**
排列组合是搜索与图论算法（如全排列生成、状态压缩 DP）的重要数学基础。在 C++ 算法题中，生成全排列可以直接使用 \`<algorithm>\` 中的 \`std::next_permutation\`。如果题目存在位置限制，在手写回溯（DFS）搜索时，可以通过在第一层递归中加入剪枝条件，跳过受限同学，从而大幅减少无效搜索。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 6,
            type: "single",
            question: `一个无向图包含n个顶点，则其最小生成树包含多少条边？（ ）。`,
            options: ["n-1 条边","n 条边","n+1 条边","最小生成树可能不存在"],
            answer: 3,
            score: 2,
            explanation: "**答案：D**\n\n**解析：**\n对连通的无向图，生成树（含最小生成树）恰含 n−1 条边。但题面只说“一个无向图包含 n 个顶点”，未保证连通；图不连通时生成树不存在，最小生成树也可能不存在，因此 D 最严谨。\n\n- A n−1 条边：仅在图连通时成立，不能作为普遍结论；\n- B n 条边：生成树不含环，边数应为 n−1；\n- C n+1 条边：超过 n−1，必含环；\n- D 最小生成树可能不存在：正确。\n\n**考点：** 生成树的存在条件。",
            tags: [
                "最小生成树",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 7,
            type: "single",
            question: `已知三个double类型的变量a、b和theta分别表示一个三角形的两条边长及二者的夹角（弧度），则 下列哪个表达式可以计算这个三角形的面积？（ ）。`,
            options: [
                "a * b * sin(theta) / 2",
                "(a+b) * sin(theta) / 2",
                "a * b * cos(theta) / 2",
                "sqrt(a * a+b * b-2 * a * b * cos(theta))",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（a * b * sin(theta) / 2）**

解析：已知三角形两边 a、b 及其夹角 θ，面积公式为 S = ½·a·b·sinθ。

- A 正确。
- B 用 (a+b) 无几何依据。
- C 误用 cos（cos 用于已知夹角求第三边，由余弦定理）。
- D 计算的是第三边 c = √(a²+b²−2ab·cosθ) 的长度，不是面积。

**考点**：三角形面积公式。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 8,
            type: "single",
            question: `对有n个元素的二叉排序树进行中序遍历，其时间复杂度是（ ）。`,
            options: ["O(1)","O(log(n))","O(n)","O(n²)"],
            answer: 2,
            score: 2,
            explanation: "**答案：C**\n\n**解析：**\n二叉排序树的中序遍历按“左-根-右”访问每个结点恰好一次，无论树形是否平衡，遍历 n 个元素的时间都是 O(n)。\n\n- A O(1)：错误，需要访问全部结点；\n- B O(log n)：错误，这是平衡树单次查找的量级；\n- C O(n)：正确；\n- D O(n²)：错误，没有嵌套遍历。\n\n**考点：** 中序遍历的线性复杂度。",
            tags: [
                "排列组合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 9,
            type: "single",
            question: `假设输入参数m和n满足 m ≤ n，则下面程序的最差情况的时间复杂度为（ ）。

\`\`\`cpp
int gcd(int m, int n) {
    while (m > 0) {
        int t = m;
        m = n % m;
        n = t;
    }
    return n;
}
\`\`\`
`,
            options: [
                "O(log(n))",
                "O(n)",
                "O(n×m)",
                "O(m×log(n))",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

**解析：**
程序为辗转相除法求最大公约数：每轮执行 m = n % m，m 至少减半（更准确地说，n mod m < n/2 当 m ≤ n/2；连续两轮必使参数减半），故迭代轮数为 O(log(min(m,n)))，最差情况（相邻斐波那契数）也是对数级。

- **A O(log(n))**：正确。欧几里得算法迭代轮数最差为对数级。
- **B O(n)**：错误。每轮 m 变为 n mod m，远快于逐 1 递减。
- **C O(n×m)**：错误。这是无取模、逐步递减版本的量级，本程序每轮取模。
- **D O(m×log(n))**：错误。迭代轮数与 m 相乘的量级不存在，总轮数仅 O(log n)。

**考点**：辗转相除法（欧几里得算法）的时间复杂度分析。`,
            tags: [
                "复杂度分析",
            ],
        },
        {
            id: 10,
            type: "single",
            question: `下面程序的时间复杂度为（ ）。

\`\`\`cpp
long long power_mod(long long a, long long n, long long mod) {
    if (n == 0)
        return 1;
    a = a % mod;
    if (n == 1)
        return a;

    long long pw = power_mod(a, n / 2, mod);
    long long pw2 = pw * pw % mod;
    if (n % 2 == 0)
        return pw2;
    return pw2 * a % mod;
}
\`\`\`
`,
            options: [
                "O(n)",
                "O(a^n)",
                "O(log(n))",
                "O(log(n) × a)",
],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

**解析：**
这是快速幂（平方求幂）的递归实现：每次递归将指数 n 减半（power_mod(a, n / 2, mod)），每层只做常数次乘法与取模，递归深度为 O(log n)，总时间复杂度 O(log n)。

- **A O(n)**：错误。这是逐次乘 n-1 次的朴素快速幂写法，本程序每次折半。
- **B O(a^n)**：错误。复杂度以指数 n 度量，与底数 a 的幂无关。
- **C O(log(n))**：正确。递归深度 log₂n，每层常数工作量。
- **D O(log(n) × a)**：错误。每层乘法次数与 a 无关，不存在乘 a 的因子。

**考点**：快速幂 / 平方求幂的递归复杂度分析。`,
            tags: [
                "复杂度分析",
            ],
        },
        {
            id: 11,
            type: "single",
            question: `下面程序的时间复杂度为（ ）。

\`\`\`cpp
int record_choose[MAXN][MAXM];
int choose(int n, int m) {
    if (m == 0 || m == n)
        return 1;
    if (record_choose[n][m] == 0)
        record_choose[n][m] = choose(n - 1, m - 1) + choose(n - 1, m);
    return record_choose[n][m];
}
\`\`\`
`,
            options: ["O(2^n)","O(2^m × (n-m))","O(C(n,m))","O(m × (n-m))"],
            answer: 3,
            score: 2,
            explanation: "**答案：D**\n\n**解析：**\n程序是带记忆化的组合数递归求值（帕斯卡三角恒等式 C(n,m)=C(n-1,m-1)+C(n-1,m)）。每个状态 (i, j) 只在 record_choose[i][j]==0 时计算一次，之后直接返回缓存值。可达状态满足 i-j ≤ n-m 且 j ≤ m、j ≥ 0，构成一个 m 行 × (n-m) 列的带状区域，状态总数为 O(m × (n-m))，每个状态常数时间转移。\n\n- **A O(2^n)**：错误。这是无记忆化时的指数级上界，本题有 record_choose 记忆化。\n- **B O(2^m × (n-m))**：错误。记忆化后每个状态只算一次，不存在指数因子。\n- **C O(C(n,m))**：错误。复杂度取决于状态数而非组合数值；C(n,m) 本身可远大于状态数。\n- **D O(m × (n-m))**：正确。可达状态 (i,j) 构成 j∈[0,m]、i-j∈[n-m,n] 的带状区域，共 O(m×(n-m)) 个。\n\n**考点**：递归 + 记忆化的复杂度按\"状态数 × 单状态转移代价\"计算。",
            tags: [
                "复杂度分析",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 3,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 12,
            type: "single",
            question: `下面的程序使用出边的邻接表表达有向图，则下列选项中哪个是它表达的图？（ ）。

\`\`\`cpp
#include <iostream>

struct Edge {
    int e;
    Edge * next;
};
struct Node {
    Edge * first;
};

int main() {
    Edge e[5] = {{1, nullptr}, {2, &e[2]},
                 {3, nullptr}, {3, nullptr}, {0, nullptr}};

    Node n[4] = {&e[0], &e[1], &e[3], &e[4]};
    ; // 其他处理
    return 0;
}
\`\`\`
`,
            options: [
                "一个有4个顶点、边为1→0、0→3、2→1、1→3、3→2的有向图",
                "一个有4个顶点、边为0→1、1→2、1→3、2→3、3→0的有向图",
                "一个有4个顶点、边为0→1、3→0、1→3、2→3、3→2的有向图",
                "一个有4个顶点（含0处自环）、边为0→1、1→3、3→2的有向图",
],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**解析：**
n[i].first 指出顶点 i 的出边链表，沿 next 串联即可得各顶点的全部出边：

- 顶点 0：n[0]=&e[0]，e[0]={1, nullptr} → 边 0→1；
- 顶点 1：n[1]=&e[1]，e[1]={2, &e[2]}，e[2]={3, nullptr} → 边 1→2、1→3；
- 顶点 2：n[2]=&e[3]，e[3]={3, nullptr} → 边 2→3；
- 顶点 3：n[3]=&e[4]，e[4]={0, nullptr} → 边 3→0。

故图为 4 个顶点、5 条边：0→1、1→2、1→3、2→3、3→0，与选项 B 一致。

- **A**：错误。含 1→0、0→3、2→1 等反向边，与推导边集不符。
- **B**：正确。边集 0→1、1→2、1→3、2→3、3→0 与邻接表推导完全一致。
- **C**：错误。含 3→2、2→3 双向边，缺少 1→2。
- **D**：错误。顶点 0 处有自环，且边数与推导不符。

**考点**：链式邻接表（前向星/出边表）与有向图边集的对应关系。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 13,
            type: "single",
            question: `下面程序的输出为（ ）。

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int cnt = 0;
    for (int a = 1; a <= 10; a++)
        for (int b = 1; b <= 10; b++)
            for (int h = 1; h <= 10; h++)
                if ((a + b) * h == 20)
                    cnt++;
    cout << cnt << endl;
    return 0;
}
\`\`\`
`,
            options: [
                "12",
                "18",
                "36",
                "42",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**解析：**
枚举满足 (a+b)×h = 20 的三元组（a、b、h 均 ∈ [1,10]）。设 s = a+b，则 s ∈ [2,20] 且 20/s = h ∈ [1,10]，故 s ∈ {2,4,5,10,20}。a+b=s 的有序对 (a,b) 个数（1≤a,b≤10）为：s≤11 时 s-1 个，s≥11 时 21-s 个。

- h=1, s=20：21-20=1 对（10+10）
- h=2, s=10：s-1=9 对
- h=4, s=5：s-1=4 对
- h=5, s=4：s-1=3 对
- h=10, s=2：s-1=1 对

合计 1+9+4+3+1 = 18，程序输出 18。

- **A 12**：错误。漏算或错算 (a+b) 的有序对个数。
- **B 18**：正确。如上枚举计数。
- **C 36**：错误。约为把 (a,b) 当无序对翻倍所致，实际 a、b 有序。
- **D 42**：错误。多计了 s 不整除 20 的情形。

**考点**：多重循环枚举 + 计数（转化为枚举因数对）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 14,
            type: "single",
            question: `下面程序的输出为（ ）。

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    const int N = 30;
    int cnt = 0;
    for (int a = 1; a <= N; a++)
        for (int b = a; a + b <= N; b++)
            for (int c = b; a + b + c <= N; c++)
                if (a * a + b * b == c * c)
                    cnt++;
    cout << cnt << endl;
    return 0;
}
\`\`\`
`,
            options: [
                "3",
                "6",
                "11",
                "22",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

**解析：**
程序统计满足 a ≤ b ≤ c、a+b+c ≤ 30 且 a²+b²=c² 的勾股三元组个数。逐一验证周长 ≤ 30 的勾股数：

- (3, 4, 5)：周长 12 ≤ 30，计入；
- (5, 12, 13)：周长 30 ≤ 30，计入；
- (6, 8, 10)：周长 24 ≤ 30，计入；
- (9, 12, 15)：周长 36 > 30，不计；
- 更大的勾股数周长均超过 30。

故 cnt = 3，程序输出 3。

- **A 3**：正确。如上枚举。
- **B 6**：错误。相当于把 (3,4,5) 等按排列重复计数，程序限定 a≤b≤c 只计一次。
- **C 11**：错误。多计了不满足 a+b+c≤30 或非 a≤b≤c 顺序的组合。
- **D 22**：错误。同样源于未按去重与周长约束筛选。

**考点**：勾股数枚举、循环边界（a≤b≤c 去重）与约束计数。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 15,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第5,6页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 5,
            sourcePages: [5, 6],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "single",
            question: `下面的程序中，二维数组h和v分别代表如下图所示网格中水平边与垂直边的时间消耗。程序使用动态规划计算从左下角到右上角的最小时间消耗，横线处应填写哪个选项？

![官方网格及水平、垂直边下标](/question-assets/2023-12-l8/q15-grid.png)
\`\`\`cpp
int dis[MAXY][MAXX];
int shortest_path(int x, int y) {
    dis[0][0] = 0;
    for (int i = 0; i < y; i++)
        dis[i + 1][0] = dis[i][0] + v[i][0];
    for (int j = 0; j < x; j++)
        dis[0][j + 1] = dis[0][j] + h[0][j];
    for (int i = 0; i < y; i++)
        for (int j = 0; j < x; j++)
            ________; // 在此处填写代码
    return dis[y][x];
}
\`\`\``,
            options: ["dis[i][j] = min(dis[i-1][j]+v[i-1][j], dis[i][j-1]+h[i][j-1]);", "dis[i][j] = min(dis[i-1][j]+h[i-1][j], dis[i][j-1]+v[i][j-1]);", "dis[i+1][j+1] = min(dis[i][j+1]+v[i][j+1], dis[i+1][j]+h[i+1][j]);", "dis[i+1][j+1] = min(dis[i][j+1]+h[i][j+1], dis[i+1][j]+v[i+1][j]);"],
            answer: 2,
            score: 2,
            explanation: `答案为C。

循环从i=j=0开始，目标格必须是dis[i+1][j+1]。从下方进入时增加垂直边v[i][j+1]，从左方进入时增加水平边h[i+1][j]，两种耗时取最小值。

A、B的目标下标使第一次迭代访问负下标，且无法填到返回的dis[y][x]。D虽然目标下标正确，却颠倒了水平边与垂直边。边界行列已在前两段循环中初始化。`,
            tags: [
                "动态规划",
            ],
        },
        {
            id: 16,
            type: "judge",
            question: `C++ 语言非常强大，可以用来求解方程的解。例如，如果变量x为double类型的变量，则执行语句x * 2-4 = 0;后，变量x的值会变为2.0。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

解析：语句 \`x * 2 - 4 = 0;\` 试图把 0 赋给表达式 \`x * 2 - 4\` 的结果。但 \`x * 2 - 4\` 是一个右值（临时计算结果），不是可修改的左值（lvalue），C++ 不允许对其赋值，该语句根本无法通过编译。变量 x 的值不会改变，更不会"变为 2.0"。

**考点**：左值 / 右值与赋值表达式的合法性（编译期错误）。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 17,
            type: "judge",
            question: `一个袋子中有 3 个完全相同的红色小球、 2 个完全相同的蓝色小球。每次从中取出 1 个，且不放回袋子，这样 进行 3 次后，将取出的小球依次排列，则可能的颜色顺序有 7 种。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

解析：3 个相同红球、2 个相同蓝球，不放回取 3 个并依次排列，等价于长度为 3 的 R/B 序列，且红球最多用 3 个、蓝球最多用 2 个。所有 2³ = 8 种序列中，仅 BBB 需要 3 个蓝球（实际只有 2 个）不可能出现，其余 7 种（RRR、RRB、RBR、BRR、RBB、BRB、BBR）均可行。故可能顺序恰有 7 种。

**考点**：可重复元素的排列与容斥。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 18,
            type: "judge",
            question: `杨辉三角，是二项式系数的一种三角形排列，在中国南宋数学家杨辉 1261 年所著的《详解九章算法》一书中 出现，是中国数学史上的一项伟大成就。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

解析：杨辉三角（二项式系数三角形）确在中国南宋数学家杨辉 1261 年所著《详解九章算法》中以插图形式记载（其引贾宪"开方作法本源图"），是中国古代数学的重要成就。该史实陈述正确。

**考点**：数学史常识（杨辉三角）。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 19,
            verificationNote: "核对原卷第 6 页答案表和第 6 页题面。无自环有向完全图按有序顶点对计数，边数 N(N−1)。N=2 时实有两条有向边，题式仅给一条。",
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6],
            reviewedAt: "2026-11-25",
            reviewedBy: "AI-Codex",
            sourceVerified: true,
            type: "judge",
            question: `N个顶点的有向完全图（不带自环）有 N×(N-1)/2 条边。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：错误**\n\n每个顶点都有 $N-1$ 条通向其他顶点的出边，因此共有 $N(N-1)$ 条有向边。题目给出的 $N(N-1)/2$ 是无向完全图的边数。",
            tags: [
                "C++综合",
            ],
      "reviewedFields": ["answer","explanation","reviewedBy","reviewedAt","verificationNote"],
        },
        {
            id: 20,
            type: "judge",
            question: `如果待查找的元素确定，只要哈希表的大小不小于查找元素的个数，就一定存在不会产生冲突的哈希函数。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

解析：哈希表大小为桶数 b，待查找元素集合大小为 m。若 b ≥ m，则可以把这 m 个元素一一映射到互不相同的桶中（即存在一个单射/完美哈希函数），从而不产生冲突。因此"只要哈希表大小不小于查找元素个数，就一定存在不会产生冲突的哈希函数"这一结论成立。

**考点**：哈希函数、完美哈希与冲突。`,
            tags: [
                "哈希表",
            ],
        },
        {
            id: 21,
            type: "judge",
            question: `动态规划算法的时间复杂度一般为：必要状态的数量，乘以计算一次状态转移方程的时间复杂度。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

解析：动态规划的时间复杂度通常等于"必要状态的数量"乘以"计算一次状态转移方程所需的时间复杂度"。例如用 θ(S) 个状态、每个状态转移耗时 θ(T)，则总复杂度约为 θ(S·T)。这是估算 DP 复杂度的一般方法，陈述正确。

**考点**：动态规划复杂度估算方法。`,
            tags: [
                "动态规划",
            ],
        },
        {
            id: 22,
            type: "judge",
            question: `已知int类型的变量a、b和h中分别存储着一个梯形的顶边长、底边长和高，则这个梯形的面积可以通 过表达式(a+b) * h / 2求得。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

解析：a、b、h 均为 int 类型，\`(a+b) * h / 2\` 全程按整数运算，其中 \`/ 2\` 是整数除法，会直接截断小数部分。当 (a+b)*h 为奇数时结果偏小，并不能得到正确面积。例如 a=1、b=2、h=1 时，真实面积为 (1+2)×1/2 = 1.5，而表达式算得 3/2 = 1（int 截断）。因此"可以通过该表达式求得面积"的说法不成立。

**考点**：整数除法截断（类型陷阱）。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 23,
            type: "judge",
            question: `判断图是否连通只能用广度优先搜索算法实现。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

解析：判断图是否连通绝非"只能用 BFS"。深度优先搜索（DFS）同样可以遍历全图并判断是否访问到所有顶点；此外并查集（Union-Find）、连通分量计数等方法也能判定连通性。"只能"二字使该陈述错误。

**考点**：图连通性判定的多种算法。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 24,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第6页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            integrityNote: `ANSWER-DOUBT：按PDF恢复原题后，原卷答案表为×，题库原answer=0。保留原answer，暂停计分。`,
            sourceIntegrity: `answer-key-conflict`,
            type: "judge",
            question: `在N个元素的二叉排序树中查找一个元素，最好情况的时间复杂度是 O(log N)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `原卷答案表为错误。待查元素恰好是根时，只需一次比较，最好情况是O(1)。O(log N)描述平衡树高度对应的最坏量级或某些分布假设下的平均量级，不能替代最好情况。

题库原answer与原卷答案表不一致，按TASK红线保留字段并标记ANSWER-DOUBT，等待裁定。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 25,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第6页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",
            question: `给定double类型的变量x，且其值大于等于0，我们可以通过二分法求出 √x 的近似值。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
函数 \`f(t) = t * t\` 在非负实数区间 \`[0, +∞)\` 上是严格单调递增的。对于任意实数 \`x >= 0\`，求其平方根等价于求解方程 \`t * t = x\`。只要函数满足单调性，就可以在确定的初始区间内通过二分查找法，反复取中点并比较 \`mid * mid\` 与 \`x\` 的大小，不断将搜索区间折半，最终在满足浮点精度要求时求出平方根的近似值。因此题干陈述完全正确。

**选项逐项分析：**
- **A 正确**：✅ 命题符合二分法的数学与计算原理。在实数范围内，通过确定上下界并以单调函数为依据逐步逼近，是数值计算中求平方根的标准方法之一。
- **B 错误**：❌ 误以为二分法只能应用于离散的整数数组查找，忽略了在连续实数区间上，单调函数同样可以利用二分逼近求方程数值解。

**算法步骤与区间选取：**
1. **确定搜索区间**：
   - 当 \`x >= 1\` 时，平方根满足 \`1 <= sqrt(x) <= x\`；
   - 当 \`0 <= x < 1\` 时，平方根满足 \`x <= sqrt(x) <= 1\`（例如 \`x = 0.25\` 时平方根为 \`0.5\`）。
   - 因此初始区间左端点可设为 \`left = 0\`，右端点设为 \`right = max(1.0, x)\`。
2. **区间折半逼近**：
   - 计算中点 \`mid = (left + right) / 2\`；
   - 若 \`mid * mid > x\`，说明解在左侧，缩小上界令 \`right = mid\`；反之说明解在右侧，缩小下界令 \`left = mid\`。
3. **终止条件**：
   - 重复迭代直至区间长度满足精度要求（如 \`right - left < 1e-7\`），所得 \`mid\` 即为精度范围内的近似解。

**易错提醒：**
- 编写实数二分求平方根时，初始右端点不能简单地固定设为 \`x\`。当 \`0 < x < 1\` 时，其平方根大于原数本身，若上界只设为 \`x\` 会导致答案不在搜索区间内，因而必须取 \`max(1.0, x)\` 作为上界。`,
            tags: [
                "面向对象",
            ],
        },
        ...programmingQuestions
    ]
};
