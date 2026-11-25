// 2024年3月 GESP C++ 八级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `2 5 2`, output: `9` },
        { input: `100 100 100`, output: `185233` }
      ],
      question: "\n# [GESP202403 八级] 公倍数问题\n\n## 题目描述\n\n小 A 写了一个 $N \\times M$ 的矩阵 $A$，我们看不到这个矩阵，但我们可以知道，其中第 $i$ 行第 $j$ 列的元素 $A_{i,j}$ 是 $i$ 和 $j$ 的公倍数（$i=1,\\dots,N$，$j=1,\\dots,M$）。现在有 $K$ 个小朋友，其中第 $k$ 个小朋友想知道，矩阵 $A$ 中最多有多少个元素可以是 $k$（$k=1,2,\\dots,K$）。请你帮助这些小朋友求解。\n\n注意：每位小朋友的答案互不相关，例如，有些位置既可能是 $x$，又可能是 $y$，则它同时可以满足 $x,y$ 两名小朋友的要求。\n\n方便起见，你只需要输出 $\\sum_{k=1}^{K}{k \\times \\texttt{ans}_k}$ 即可，其中 $\\texttt{ans}_k$ 表示第 $k$ 名小朋友感兴趣的答案。\n\n## 输入格式\n\n第一行三个正整数 $N,M,K$。\n\n## 输出格式\n\n输出一行，即 $\\sum_{k=1}^{K}{k \\times \\texttt{ans}_k}$。\n\n请注意，这个数可能很大，使用 C++ 语言的选手请酌情使用 `long long` 等数据类型存储答案。\n\n\n## 数据规模\n\n对于 30% 的测试点，保证 $N,M,K \\le 10$。\n\n对于 60% 的测试点，保证 $N,M,K \\le 500$。\n\n对于所有测试点，保证 $N,M \\le 10^5$，$K \\le 10^6$。",
      tags: ["编程题", "数论", "约数统计"],
      explanation: "若某位置能取值为 x，则该位置的行号和列号都必须是 x 的约数。分别统计 1..N 和 1..M 中各有多少数整除 x，即得可行位置数。",
      template: "#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int N,M,K;cin>>N>>M>>K;return 0;}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;vector<int> count_divisors(int limit,int num){vector<int>s(num+1,0);for(int i=1;i<=limit;++i)for(int j=i;j<=num;j+=i)s[j]++;return s;}int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int N,M,K;cin>>N>>M>>K;vector<int>sN=count_divisors(N,1000000),sM=count_divisors(M,1000000);long long ans=0;for(int x=1;x<=K;++x)ans+=1LL*x*sN[x]*sM[x];cout<<ans<<\"\\n\";return 0;}",
      score: 25,
      timeLimit: '1.0 s',
      memoryLimit: '128 MB',
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["question","reviewedBy","reviewedAt","sourcePage"],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `1
6
1 2 2 3 1 3
4
1 3
1 6
1 5
5 6`, output: `1
1
0
2` }
      ],
      question: "\n# [GESP202403 八级] 接竹竿\n\n## 题目描述\n\n小杨同学想用卡牌玩一种叫做“接竹竿”的游戏。\n\n游戏规则是：每张牌上有一个点数 $v$，将给定的牌依次放入一列牌的末端。若放入之前这列牌中已有与这张牌点数相同的牌，则小杨同学会将这张牌和点数相同的牌之间的所有牌全部取出队列（包括这两张牌本身）。\n\n小杨同学现在有一个长度为 $n$ 的卡牌序列 $A$，其中每张牌的点数为 $A_i$（$1\\le i\\le n$）。小杨同学有 $q$ 次询问。第 $i$ 次（$1\\le i\\le q$）询问时，小杨同学会给出 $l_i,r_i$ 小杨同学想知道如果用下标在 $[l_i,r_i]$ 的所有卡牌按照下标顺序玩“接竹竿”的游戏，最后队列中剩余的牌数。\n\n## 输入格式\n\n一行包含一个正整数 $T$，表示测试数据组数。\n\n对于每组测试数据，第一行包含一个正整数 $n$，表示卡牌序列 $A$ 的长度。\n\n第二行包含 $n$ 个正整数 $A_1,A_2,\\dots,A_n$，表示卡牌的点数 $A$。\n\n第三行包含一个正整数 $q$，表示询问次数。\n\n接下来 $q$ 行，每行两个正整数 $l_i,r_i$ 表示一组询问。\n\n## 输出格式\n\n对于每组数据，输出 $q$ 行。第 $i$ 行（$1\\le i\\le q$）输出一个非负整数，表示第 $i$ 次询问的答案。\n\n\n## 数据范围\n\n| 子任务编号 | 数据点占比 | $T$ | $n$ | $q$ | $\\max A_i$ | 特殊条件 |\n|---|---|---|---|---|---|---|\n| 1 | 30% | $\\le 5$ | $\\le 100$ | $\\le 100$ | $\\le 13$ | |\n| 2 | 30% | $\\le 5$ | $\\le 1.5\\times 10^4$ | $\\le 1.5\\times 10^4$ | $\\le 13$ | 所有询问的右端点等于 $n$ |\n| 3 | 40% | $\\le 5$ | $\\le 1.5\\times 10^4$ | $\\le 1.5\\times 10^4$ | $\\le 13$ | |\n\n对于全部数据，保证 $1 \\le T \\le 5$，$1 \\le n \\le 1.5\\times 10^4$，$1 \\le q \\le 1.5\\times 10^4$，$1 \\le A_i \\le 13$。",
      tags: ["编程题", "倍增", "模拟", "区间查询"],
      explanation: "预处理每个位置第一次形成消去时会跳到哪里，并做倍增。回答询问时一边统计无法消去的牌，一边尽量用倍增跳过可整体消去的段。",
      template: "#include <bits/stdc++.h>\nusing namespace std;int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int T;cin>>T;while(T--){}return 0;}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;const int N=100000+10;int a[N],nxt[N][30],pos[25];int main(){ios::sync_with_stdio(false);cin.tie(nullptr);int T;cin>>T;while(T--){int n;cin>>n;memset(pos,0,sizeof(pos));for(int i=1;i<=n;++i){cin>>a[i];for(int j=0;j<=20;++j)nxt[i][j]=n+1;}for(int i=n;i>=1;--i){if(!pos[a[i]]){nxt[i][0]=n+1;pos[a[i]]=i;}else{nxt[i][0]=pos[a[i]];pos[a[i]]=i;}}for(int i=n;i>=1;--i)for(int j=1;j<=20;++j)if(nxt[i][j-1]+1<=n)nxt[i][j]=nxt[nxt[i][j-1]+1][j-1];int q;cin>>q;while(q--){int l,r;cin>>l>>r;int i=l,ans=0;while(i<=r){while(i<=r&&nxt[i][0]>r)++i,++ans;if(i>r)break;for(int j=20;j>=0;--j)if(nxt[i][j]<=r){i=nxt[i][j];break;}++i;}cout<<ans<<\"\\n\";}}return 0;}",
      score: 25,
      timeLimit: '1.0 s',
      memoryLimit: '128 MB',
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 7,
      "reviewedFields": ["question","reviewedBy","reviewedAt","sourcePage"],
    }
];

export const paperData = {
    id: '2024-03-l8',
    title: '2024年3月 GESP C++ 八级真题',
    level: 8,
    year: 2024,
    month: 3,
    session: 5,
    note: '2024年首场',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `为丰富食堂菜谱，炒菜部进行头脑风暴。肉类有鸡肉、牛肉、羊肉、猪肉 4 种，切法有肉排、肉块、肉末 3 种，配菜有圆白菜、油菜、豆腐 3 种，辣度有麻辣、微辣、不辣 3 种。不考虑口感的情况下，选 1 种肉、 1 种切法、 1 种 配菜、 1 种辣度产生一道菜（例如：麻辣牛肉片炒豆腐），这样能产生多少道菜？（ ）。`,
            options: [
                "13",
                "42",
                "63",
                "108",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（108）**

一道菜由肉、切法、配菜、辣度四部分各选一种组成，四步之间相互独立，使用分步乘法计数原理：

- 肉有 4 种；
- 切法有 3 种；
- 配菜有 3 种；
- 辣度有 3 种。

总方案数为 4 × 3 × 3 × 3 = 108。

**选项分析：**
- A 13：把 4 + 3 + 3 + 3 当成总数，误用了加法。
- B 42：只乘了部分类别或漏乘一个 3。
- C 63：中间结果算错，或混合了加法与乘法。
- D 108：4×3×3×3，正确。

**考点：** 分步乘法计数原理。若完成一件事需要依次经过 k 个独立步骤，第 i 步有 m_i 种方法，则总方法数为各步方法数之积。

**易错提醒：** 四类配料是“各选一种”而不是“任选一类”，因此用乘法；4+3+3+3=13 是典型的加法误用。分步乘法只要求各步选择相互独立，各类数量不必相同，本题四步互不影响。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 2,
            type: "single",
            question: `已知袋中有 2 个相同的红球、 3 个相同的绿球、 5 个相同的黄球。每次取出一个不放回，全部取出。可能产生 多少种序列？（ ）。`,
            options: [
                "6",
                "1440",
                "2520",
                "3628800",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（2520）**

**解析：**
10 个球全部取出排成一列，总数为 10!；但同色球彼此不可区分，需要除以各色球内部的排列数：
\`\`\`cpp
10! / (2! * 3! * 5!) = 3628800 / (2 * 6 * 120) = 3628800 / 1440 = 2520
\`\`\`

- A 6：远小于真实值；
- B 1440：这只是分母（去重因子），不是答案；
- D 3628800：未去重的全排列数，错误；
- C 2520：多重集排列数，正确。

**考点**：可重复元素的排列（多重集排列数）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 3,
            type: "single",
            question: `以下二维数组的初始化，哪个是符合语法的？（ ）。`,
            options: [
                "int a[][] = {{1, 2}, {3, 4}};",
                "int a[][2] = {};",
                "int a[2][2] = {{1, 2, 3}, {4, 5, 6}};",
                "int a[2][] = {{1, 2, 3}, {4, 5, 6}};",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**解析：**
C++ 在定义并初始化二维数组时，只有第一维（行数）可以省略（由初始化列表推导），第二维（列数）必须显式给出。

- A \`int a[][] = {{1, 2}, {3, 4}};\`：两维都省略，非法；
- B \`int a[][2] = {};\`：省略第一维、列数明确为 2，合法（推导为 0 行）；
- C \`int a[2][2] = {{1, 2, 3}, {4, 5, 6}};\`：每行只容纳 2 个初值却给了 3 个，初值过多，非法；
- D \`int a[2][]\`：第二维省略，非法。

**考点**：数组初始化与维度规则（第一维可省、第二维不可省）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 4,
            type: "single",
            question: `下面有关 C++ 拷贝构造函数的说法，错误的是（ ）。`,
            options: [
                "必须实现拷贝构造函数，否则一定会出现编译错误。",
                "对象作为函数参数、以值传递方式传入函数时，会自动调用拷贝构造函数。",
                "对象作为函数返回值、以值传递方式从函数返回时，会自动调用拷贝构造函数。",
                "使用一个对象初始化另一个对象时，会自动调用拷贝构造函数。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：不正确的是 A（未定义拷贝构造函数时编译器会自动生成默认版本，不会出现编译错误）**

**核心解析：**
类里没写拷贝构造函数时，编译器会在需要时合成默认版本，按成员逐个复制（浅拷贝），程序可以编译通过。因此“必须实现，否则一定编译错误”不成立。

拷贝构造函数用已有对象初始化新对象，常见形式是 \`ClassName(const ClassName& other)\`。三种常见调用：用已有对象初始化新对象；对象按值传入函数；对象按值从函数返回。

**选项逐项分析：**
- **A 必须实现拷贝构造函数，否则一定会出现编译错误**：❌ 说法错误，是本题所求。未显式定义时编译器会合成默认拷贝构造，不会因此编译失败。
- **B 对象按值传入函数时会调用拷贝构造**：✅ 说法正确。形参是新对象，要用实参构造副本，例如 \`void func(MyClass obj)\`。想避免拷贝可改用 \`const MyClass&\`。
- **C 对象按值返回时会调用拷贝构造**：✅ 说法正确。按值返回局部对象时，语义上用拷贝构造把结果交给调用方。
- **D 用一个对象初始化另一个对象时会调用拷贝构造**：✅ 说法正确。\`MyClass b = a;\` 和 \`MyClass b(a);\` 都是用 \`a\` 初始化新对象 \`b\`。

**易错提醒：**
- \`MyClass b = a;\` 是初始化，调用拷贝构造；对象已经存在后再写 \`b = a;\`，调用的是赋值运算符 \`operator=\`。
- 类里有指针成员时，默认拷贝只复制地址。不写深拷贝可能导致运行时重复释放，但不会因此出现编译错误。

**知识延伸：**
写成 \`MyClass(const MyClass&) = delete;\` 后再拷贝，编译会失败。某个成员本身不能拷贝时，隐式拷贝构造也会被删除。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 5,
            type: "single",
            question: `使用邻接表表达一个无向简单图，图中包含v个顶点、e条边，则该表中边节点的个数为（ ）。`,
            options: ["v×(v-1)","v×v","2×e","e"],
            answer: 2,
            score: 2,
            explanation: "**答案：C**\n\n**解析：**\n用邻接表表示无向简单图时，每条无向边会在其两个端点的链表中各挂一个边结点，因此边结点总数为 2e。\n\n- A v×(v−1)：错误，这是有向完全图的弧数；\n- B v×v：错误，这是邻接矩阵的元素数；\n- C 2×e：正确；\n- D e：错误，这是有向图出边表的边结点数。\n\n**考点：** 无向图邻接表的空间开销。",
            tags: [
                "C++综合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 6,
            type: "single",
            question: `关于生成树的说法，错误的是（ ）。`,
            options: ["一个无向连通图可以有多个生成树。","一个无向图，只要连通，就一定有生成树。","n个顶点的无向完全图，有 n^{n-2} 棵生成树。","n个顶点的无向图，生成树包含n-1条边。"],
            answer: 3,
            score: 2,
            explanation: `**答案：不正确的是 D（n个顶点的无向图，生成树包含n-1条边）**

**核心解析：**
生成树是无向连通图里包含全部顶点的极小连通子图。\`n\` 个顶点的连通图，生成树恰好有 \`n-1\` 条边。图不连通时，不存在能盖住所有顶点的生成树；各连通分量各自的生成树合称生成森林，\`k\` 个连通分量时边数是 \`n-k\`（\`k>1\` 时少于 \`n-1\`）。D 漏掉“连通”这个前提，所以说法错误。

**选项逐项分析：**
- **A 一个无向连通图可以有多个生成树**：✅ 说法正确。有环时，去掉环上不同的边得到不同生成树。3 个点的环有 3 棵；图本身已是树时才唯一。
- **B 一个无向图，只要连通，就一定有生成树**：✅ 说法正确。从任一顶点做 DFS 或 BFS，走过的 \`n-1\` 条边就是一棵生成树。
- **C n个顶点的无向完全图，有 \`n\` 的 \`n-2\` 次方棵生成树**：✅ 说法正确。凯莱公式：\`n\` 个标号顶点的完全图 \`K_n\`，生成树棵数是 \`n\` 的 \`n-2\` 次方。\`n=3\` 时为 3，\`n=4\` 时为 16。
- **D n个顶点的无向图，生成树包含n-1条边**：❌ 说法错误，是本题所求。生成树只对连通图有定义。不连通时没有包含全部顶点的生成树，只能得到边数为 \`n-k\` 的生成森林。

**易错提醒：**
看到“任意无向图”却没说连通，先拿非连通图当反例。保证连通至少要 \`n-1\` 条边；连通且恰有 \`n-1\` 条边的无向图才是树。`,
            tags: [
                "最小生成树",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["options","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 7,
            type: "single",
            question: `已知三个double类型的变量a、b和theta分别表示一个三角形的两条边长及二者的夹角（弧度），则 下列哪个表达式可以计算这个三角形的周长？（ ）。`,
            options: [
                "a * b * sin(theta) / 2",
                "a+b+(a+b) * sin(theta) / 2",
                "a * b * cos(theta) / 2",
                "a+b+sqrt(a * a+b * b-2 * a * b * cos(theta))",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D（利用余弦定理求出第三边后计算三边之和）**

**核心解析：**
三角形的周长等于三条边长的和。
题目中已知三角形的两条边长分别为 \`a\` 和 \`b\`，两边的夹角为 \`theta\`（单位为弧度）。要求三角形的周长，关键在于求出未知的第三边长度（设为 \`c\`）。

在几何学中，已知三角形的两边及其夹角求第三边，使用**余弦定理**：
\`c*c = a*a + b*b - 2*a*b*cos(theta)\`

两边同时开平方，即可得到第三边的边长表达式：
\`c = sqrt(a*a + b*b - 2*a*b*cos(theta))\`

求得第三边后，三角形的周长即为三边之和：
\`周长 = a + b + c = a + b + sqrt(a*a + b*b - 2*a*b*cos(theta))\`

在 C++ 中，标准数学库 \`<cmath>\` 提供了计算平方根的 \`sqrt()\` 函数和余弦的 \`cos()\` 函数。由于 \`cos()\` 函数接收的参数单位要求为弧度，而题干中明确说明 \`theta\` 的单位是弧度，因此可以直接调用 \`cos(theta)\`。选项 D 的表达式完全正确。

**选项逐项分析：**
- **A \`a * b * sin(theta) / 2\`**：❌ 错误。这是两边及其夹角的面积公式（\`S = 1/2 * a * b * sin(theta)\`），题目要的是周长。
- **B \`a+b+(a+b) * sin(theta) / 2\`**：❌ 错误。前两项 \`a + b\` 是已知的两边之和，但第三项 \`(a+b) * sin(theta) / 2\` 并不等于第三边的长度，在几何上没有数学依据，无法求出周长。
- **C \`a * b * cos(theta) / 2\`**：❌ 错误。该表达式形似三角形面积公式，但将正弦函数 \`sin\` 错误地替换成了余弦函数 \`cos\`，其计算结果既不代表面积，也不代表周长。
- **D \`a+b+sqrt(a * a+b * b-2 * a * b * cos(theta))\`**：✅ 正确。根据余弦定理，后半部分的根号表达式 \`sqrt(...)\` 正确求出了夹角 \`theta\` 所对的第三边边长，再与已知的两边长 \`a\`、\`b\` 相加，即为三角形的周长。

**易错提醒：**
- **混淆周长与面积**：看到两边及其夹角，部分同学容易联想到课本上的三角形面积公式 \`1/2 * a * b * sin(theta)\`，导致误选 A。做题时一定要看清题干问的是“周长”还是“面积”。
- **C++ 三角函数的单位**：C++ 标准库 \`<cmath>\` 中的 \`sin()\`、\`cos()\` 等三角函数，其形参统一使用**弧度制**而非角度制。若题目给出的夹角是以度（如 60°）为单位，必须先乘以 \`PI / 180.0\` 转换为弧度后再调用；本题已明确说明 \`theta\` 为弧度，可直接传入。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 8,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第2页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 2,
            sourcePages: [2],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "single",
            question: `在有n个元素的二叉排序树中进行查找，其最好、最差时间复杂度分别为（ ）。`,
            options: ["O(1)、O(n)", "O(1)、O(log n)", "O(log n)、O(log n)", "O(log n)、O(n)"],
            answer: 0,
            score: 2,
            explanation: `**答案：A（最好 \`O(1)\`、最差 \`O(n)\`）**

**核心解析：**
二叉排序树从根开始查找：相等则成功，更小走左子树，更大走右子树。比较次数就是时间。

最好是 \`O(1)\`：目标刚好是根，比较 1 次就结束，与 \`n\` 无关。
最差是 \`O(n)\`：普通二叉排序树不会自己保持平衡。按升序或降序插入（如 \`1,2,...,n\`）会退化成一条链，高度为 \`n\`。查找最底层结点或不存在的值，最多比较 \`n\` 次。

**选项逐项分析：**
- **A \`O(1)\`、\`O(n)\`**：✅ 根上命中是 \`O(1)\`；退化成链时是 \`O(n)\`。
- **B \`O(1)\`、\`O(log n)\`**：❌ 最好对，最差错。退化后树高是 \`n\`，不是 \`O(log n)\`。
- **C \`O(log n)\`、\`O(log n)\`**：❌ 最好不是对数（根上 1 次就是 \`O(1)\`）；没有平衡机制，最差也不能保证仍是 \`O(log n)\`。
- **D \`O(log n)\`、\`O(n)\`**：❌ 最差对，最好错。树比较平衡时高度才是 \`O(log n)\`，那是平均或平衡情形，不是单次查找的最好情况。

**易错提醒：**
\`O(log n)\` 是树比较平衡时的平均查找代价，也是 AVL、红黑树的最坏保证。本题的最好情况是第一步就在根上命中。普通二叉排序树按有序序列插入会变成链表，查找最坏是 \`O(n)\`。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 9,
            type: "single",
            question: "如下图所示，半径为 r、圆心角为 t（弧度）的扇形，下面哪个表达式能够求出顶部阴影部分的面积？（ ）。\n\n（图示：扇形半径为 r，圆心角为 t；阴影为扇形顶部由弦与弧围成的弓形，即扇形面积减去两条半径与弦构成的三角形面积。）",
            options: [
                "r * r * sin(t) / 2",
                "r * r * t / 2",
                "r * r * (t-sin(t))",
                "r * r * (t-sin(t)) / 2",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

**解析：**
扇形面积 = \`1/2 * r*r * t\`（t 为弧度）；扇形内由两条半径与弦围成的三角形面积 = \`1/2 * r*r * sin(t)\`（两边为 r、夹角 t）。顶部阴影 = 扇形 − 三角形：
\`\`\`cpp
r*r*t/2 - r*r*sin(t)/2 = r*r*(t - sin(t)) / 2
\`\`\`

- A \`r*r*sin(t)/2\`：只是三角形面积；
- B \`r*r*t/2\`：只是扇形面积；
- C \`r*r*(t-sin(t))\`：少除以 2；
- D：正确。

**考点**：扇形与三角形面积（弧度制）。`,
            tags: [
                "C++综合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["question","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 10,
            type: "single",
            question: `下面程序的时间复杂度为（ ）。

\`\`\`cpp
int fib(int n) {
    if (n <= 1)
        return 1;
    return fib(n - 1) + fib(n - 2);
}
\`\`\`
`,
            options: [
                "O(2^n)",
                "O(φⁿ)，其中φ = (√5+1)/2",
                "O(n)",
                "O(1)",
],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**解析：**
递归满足 T(n) = T(n-1) + T(n-2)，其增长率为斐波那契数列本身，即黄金比 φ = (√5+1)/2 的幂 O(φⁿ)。O(2ⁿ) 只是粗糙上界（2 > φ ≈ 1.618），B 给出了更紧确的增长阶。

- **A O(2^n)**：错误。这是上界但不是紧确界；递归树每层并非满二叉展开。
- **B O(φⁿ)，其中φ = (√5+1)/2**：正确。T(n) 的精确增长率为 φⁿ 量级。
- **C O(n)**：错误。无记忆化时状态指数级重复展开。
- **D O(1)**：错误。递归深度与调用次数都随 n 增长。

**考点**：斐波那契递归的复杂度与黄金比例增长阶。`,
            tags: [
                "复杂度分析",
            ],
        },
        {
            id: 11,
            type: "single",
            question: `下面程序的时间复杂度为（ ）。

\`\`\`cpp
int choose(int n, int m) {
    if (m == 0 || m == n)
        return 1;
    return choose(n - 1, m - 1) + choose(n - 1, m);
}
\`\`\`
`,
            options: ["O(2^n)","O(2^m × (n-m))","O(C(n,m))","O(m × (n-m))"],
            answer: 2,
            score: 2,
            explanation: "**答案：C**\n\n**解析：**\n程序是无记忆化的帕斯卡递归。递归树中每个叶结点对应最终分解出的一个「m==0 或 m==n」的边界项，共 C(n,m) 个；每个内部结点恰分裂为两个子结点，故总结点数为 2·C(n,m) − 1，即 O(C(n,m))。\n\n- **A O(2^n)**：错误。这只是上界；递归树规模由 C(n,m) 决定，当 m 较小时远小于 2ⁿ。\n- **B O(2^m × (n-m))**：错误。不存在额外的 (n-m) 因子。\n- **C O(C(n,m))**：正确。叶结点 C(n,m) 个、总结点 2C(n,m)−1。\n- **D O(m × (n-m))**：错误。这是带记忆化版本的状态数；本题没有 record 记忆化。\n\n**考点**：无记忆化帕斯卡递归的调用次数 = 组合数的二倍减一。",
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
            question: `下面程序的时间复杂度为（ ）。

\`\`\`cpp
int primes[MAXP], num = 0;
bool isPrime[MAXN] = {false};

void sieve() {
    for (int n = 2; n <= MAXN; n++) {
        if (!isPrime[n])
            primes[num++] = n;
        for (int i = 0; i < num && n * primes[i] <= MAXN; i++) {
            isPrime[n * primes[i]] = true;
            if (n % primes[i] == 0)
                break;
        }
    }
}
\`\`\`
`,
            options: [
                "O(n)",
                "O(n × log n)",
                "O(n × log log n)",
                "O(n²)",
],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

**解析：**
这是线性筛（欧拉筛）：每个合数 n*primes[i] 只被其最小质因子标记一次（n % primes[i] == 0 时立即 break），因此内层对每个 n 的均摊工作量是 O(1)，总时间复杂度 O(n)。

- **A O(n)**：正确。每个合数只被最小质因子筛一次。
- **B O(n × log n)**：错误。这是逐质因子不 break 的埃氏筛变形的量级。
- **C O(n × log log n)**：错误。这是埃拉托斯特尼筛的复杂度，本题的 break 保证了线性。
- **D O(n²)**：错误。不存在对每个数重复枚举全部质数的平方级行为。

**考点**：线性筛（欧拉筛）的均摊复杂度分析。`,
            tags: [
                "复杂度分析",
            ],
        },
        {
            id: 13,
            type: "single",
            question: `下面程序的输出为（ ）。

\`\`\`cpp
#include <iostream>
using namespace std;

int a[10][10];

int main() {
    int m = 5, n = 4;
    for (int x = 0; x <= m; x++)
        a[x][0] = 1;
    for (int y = 1; y <= n; y++)
        a[0][y] = 1;
    for (int x = 1; x <= m; x++)
        for (int y = 1; y <= n; y++)
            a[x][y] = a[x - 1][y] + a[x][y - 1];
    cout << a[m][n] << endl;
    return 0;
}
\`\`\`
`,
            options: [
                "4",
                "5",
                "126",
                "3024",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

**解析：**
a[x][y] 是网格路径计数递推：从 (0,0) 只向右/向下走到 (x,y) 的路径数，满足帕斯卡恒等式 a[x][y] = a[x-1][y] + a[x][y-1]，边界为 1。结果 a[5][4] = C(5+4, 4) = C(9,4) = 126。

- **A 4**：错误。这是 n 的值，不是路径数。
- **B 5**：错误。这是 m 的值，不是路径数。
- **C 126**：正确。C(9,4) = 126。
- **D 3024**：错误。这是排列数 P(9,4) = 9!/5!，把路径计数误当成排列。

**考点**：二维 DP 网格路径计数与组合数 C(m+n, n)。`,
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
    int cnt = 0;
    for (int x = 0; x <= 10; x++)
        for (int y = 0; y <= 10; y++)
            for (int z = 0; z <= 10; z++)
                if (x + y + z == 15)
                    cnt++;
    cout << cnt << endl;
    return 0;
}
\`\`\`
`,
            options: [
                "90",
                "91",
                "96",
                "100",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（91）**

**解析：**
程序统计 x, y, z ∈ [0, 10] 且 x + y + z = 15 的三元组个数，用容斥原理：

无上界时非负整数解个数为 C(15+3-1, 3-1) = C(17, 2) = 136。

减去某一变量 ≥ 11 的情况：令 x' = x - 11 ≥ 0，则 x' + y + z = 4，解数 C(6, 2) = 15；三个变量对称，共 3 × 15 = 45。两个变量同时 ≥ 11 不可能（11+11 > 15），无需加回。

故结果 = 136 − 45 = 91。

- **A 90**：错误。容斥时漏计或多计一组边界。
- **B 91**：正确。136 − 45 = 91。
- **C 96**：错误。高估了无上界解数或低估了扣除量。
- **D 100**：错误。同上，未正确完成容斥。

**考点**：多重循环计数与容斥原理（隔板法 + 上界修正）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 15,
            type: "single",
            question: `下面的程序使用邻接矩阵表达的带权无向图，则从顶点 0 到顶点 3 的最短距离为（ ）。

\`\`\`cpp
int weight[4][4] = {
    {  0,  1,  7, 100},
    {  1,  0,  5,  15},
    {  7,  5,  0,   6},
    {100,  15,  6,   0}};
\`\`\`
`,
            options: [
                "100",
                "16",
                "12",
                "13",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（12）**

**解析：**
枚举顶点 0 到顶点 3 的各条路径：

- 直达边 0-3：100；
- 0-1-3：1 + 15 = 16；
- 0-2-3：7 + 6 = 13；
- 0-1-2-3：1 + 5 + 6 = 12。

最短距离为 12。

- **A 100**：错误。这只是直达边权重，绕行更短。
- **B 16**：错误。0-1-3 并非最优，可再经顶点 2 缩短。
- **C 12**：正确。0-1-2-3 = 1+5+6 = 12 为最短。
- **D 13**：错误。0-2-3 次优。

**考点**：带权无向图最短路径的枚举（Dijkstra 直观验证）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 16,
            type: "judge",
            question: `已知int类型的变量a和b，则执行语句a, b = b, a;后，变量a和b的值会互换。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
\`a, b = b, a;\` 是一个逗号表达式。由于赋值运算符优先级高于逗号运算符，它实际被解析为：
\`\`\`cpp
a, (b = b), a
\`\`\`
执行顺序是：先求值 \`a\`（结果丢弃），再执行 \`b = b\`（b 自我赋值，值不变），最后求值 \`a\`（丢弃）。变量 a 与 b 均未发生交换。

要实现交换应使用 \`int t = a; a = b; b = t;\` 或标准库 \`swap(a, b);\`。

题干声称“a 和 b 的值会互换”是错误的。

**考点**：逗号运算符与赋值运算符的优先级。`,
            tags: [
                "进制转换",
            ],
        },
        {
            id: 17,
            type: "judge",
            question: `一个袋子中有 3 个完全相同的红色小球、 2 个完全相同的蓝色小球。每次从中取出 1 个，再放回袋子，这样进 行 3 次后，可能的颜色顺序有 7 种。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
有放回抽取，每次只关心颜色（红 / 蓝共 2 种），3 次相互独立，颜色顺序总数为：
\`\`\`cpp
2 * 2 * 2 = 2^3 = 8
\`\`\`
即 RRR、RRB、RBR、RBB、BRR、BRB、BBR、BBB 共 8 种。

“球完全相同”仅表示同色球不可区分，与抽取结果的颜色种类数无关；有放回下每次都有 2 种选择。题干称“有 7 种”是错误的。

**考点**：有放回抽样的计数（乘法原理）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 18,
            type: "judge",
            question: `孙子定理是求解一次同余方程组的方法，最早见于中国南北朝时期（公元 5 世纪）的数学著作《孙子算 经》。又称中国余数定理，是中国数学史上的一项伟大成就。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
孙子定理（即中国剩余定理）用于求解一次同余方程组 \`x ≡ a_i (mod m_i)\`（要求模数两两互素时可唯一确定解），最早以“物不知数”题记载于南北朝时期（公元 5 世纪）的数学著作《孙子算经》，是中国数学史上的重要成就。题干陈述正确。

**考点**：数论史与中国剩余定理（孙子定理）。`,
            tags: [
                "数论",
            ],
        },
        {
            id: 19,
            verificationNote: "核对原卷第 5 页答案表和第 5 页题面。无向完全图按无序顶点对计数，N=4 时有 6 条边，题式给 12 条。",
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 5,
            sourcePages: [5],
            reviewedAt: "2026-11-25",
            reviewedBy: "AI-Codex",
            sourceVerified: true,
            type: "judge",
            question: `N个顶点的无向完全图有 N×(N-1) 条边。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：错误**\n\n每对不同顶点之间只有一条无向边，从 $N$ 个顶点中任选两个即可确定一条边，故边数为 $\\binom{N}{2}=N(N-1)/2$。\n\n例如 $N=4$ 时，边为 $12、13、14、23、24、34$，共有 6 条。若按 $N(N-1)$ 计数，边 $12$ 会随着顶点 1 和顶点 2 各数一次，结果会把每条边重复计算。",
            tags: [
                "C++综合",
            ],
      "reviewedFields": ["answer","explanation","reviewedBy","reviewedAt","verificationNote"],
        },
        {
            id: 20,
            type: "judge",
            question: `为解决哈希函数冲突，在哈希表项内设置链表存储该项内的所有冲突元素，则该哈希表内查找元素的最差时间复杂度为 O(1)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：**
题干描述的是链地址法（拉链法）：每个桶挂一条链表存放冲突元素。

- **平均情况**：装载因子 α = n/m 时，查找需要先定位桶（O(1)）再在长度约 α 的链表中顺序比较，平均复杂度 O(1 + α)，α 为常数时可视为 O(1)。
- **最差情况**：所有 n 个元素经哈希函数后都落入同一个桶，链表长度为 n，此时查找退化为单链表顺序查找，必须**逐个比较**，时间复杂度为 **O(n)**，而不是 O(1)。

命题把「平均」当成了「最差」，故错误。

**易错提醒：** 哈希表 O(1) 的结论只在「哈希均匀 + 装载因子受控」的假设下成立；一旦问到「最差」，答案必然是 O(n)（开放定址法最差同样退化）。

**考点**：哈希表冲突处理（链地址法）与最差时间复杂度。`,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "哈希表",
            ],
        },
        {
            id: 21,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第5页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 5,
            sourcePages: [5],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            integrityNote: `ANSWER-DOUBT：按PDF恢复原题后，原卷答案表为×，题库原answer=0。保留原answer，暂停计分。`,
            sourceIntegrity: `answer-key-conflict`,
            type: "judge",
            question: `求一个包含v个顶点、e条边的带权连通无向图的最小生成树，Prim算法的时间复杂度为 O(v×e)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `原卷答案表为错误。常见邻接矩阵实现的紧确量级是O(v²)，使用邻接表与二叉堆通常为O(e log v)。原题的O(ve)未指定如此低效的实现，原卷按常见实现的时间复杂度判为×。严格作为宽松上界时也需区分大O与紧确量级。

题库原answer与原卷答案表不一致，按TASK红线保留字段并标记ANSWER-DOUBT，等待裁定。`,
            tags: [
                "最小生成树",
            ],
        },
        {
            id: 22,
            type: "judge",
            question: `已知int类型的变量a、b和c中分别存储着一个三角形的三条边长，则这个三角形的面积可以通过表达 式sqrt((a+b+c) * (b+c-a) * (a+c-b) * (a+b-c)) / 4求得。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
这正是海伦公式（Heron's formula）。设半周长 \`s = (a+b+c)/2\`，面积 \`S = sqrt(s(s-a)(s-b)(s-c))\`。代入 s 得：
\`\`\`cpp
S = sqrt( ((a+b+c)/2) * ((b+c-a)/2) * ((a+c-b)/2) * ((a+b-c)/2) )
  = sqrt((a+b+c)*(b+c-a)*(a+c-b)*(a+b-c)) / 4
\`\`\`
与题述表达式完全一致，正确。

（注：表达式中使用 int 类型只影响数值精度，公式本身正确。）

**考点**：海伦公式求三角形面积。`,
            tags: [
                "面向对象",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 5,
      "reviewedFields": ["reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 23,
            type: "judge",
            question: `可以使用深度优先搜索算法判断图的连通性。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
从任一顶点出发执行深度优先搜索（DFS），所能访问到的顶点集合即该顶点所在的连通分量；若一次 DFS 能遍历到全部顶点，则图是连通的。因此可以用 DFS 判断图的连通性。题干陈述正确。

**考点**：DFS 与图的连通性判定。`,
            tags: [
                "图的遍历",
            ],
        },
        {
            id: 24,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第5页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 5,
            sourcePages: [5],
            reviewedAt: "2026-11-07",
            reviewedBy: "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
            sourceVerified: true,
            type: "judge",
            question: `在N个元素的二叉排序树中查找一个元素，平均情况的时间复杂度是 O(log N)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "**答案：正确**\n\n**解析：**\n在 n 个元素的二叉排序树中查找，平均情况（随机插入构成的树近似平衡）时间复杂度为 O(log n)；只有最差情况（退化为链）才是 O(n)。故题干“平均情况是 O(log n)”正确。\n\n**考点：** 二叉排序树平均查找时间复杂度。",
            tags: [
                "排列组合",
            ],
      "reviewedFields": ["explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 25,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第5页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 5,
            sourcePages: [5],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",
            question: `给定double类型的变量x，且其值大于等于1，我们可以通过二分法求出 log x 的近似值。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `答案为正确。

以自然对数为例，指数函数exp(y)严格递增，求log x可转化为求exp(y)=x的解。当x≥1时，解非负，可以在包含解的区间内根据exp(mid)与x的大小更新边界，逐步达到所需精度。

二分适用的依据是单调性。计算中还需选择精度与避免指数运算溢出。原卷要求求对数，不能将缺失公式改成平方根。`,
            tags: [
                "面向对象",
            ],
        },
        ...programmingQuestions
    ]
};
