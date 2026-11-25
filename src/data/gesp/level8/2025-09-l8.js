import { l8ProgrammingByPaper } from './programming.js';

// 2025年9月 GESP C++ 八级真题
export const paperData = {
    id: '2025-09-l8',
    title: '2025年9月 GESP C++ 八级真题',
    level: 8,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    questions: [
        ...l8ProgrammingByPaper['2025-09-l8'],
        {
            id: 1,
            type: "single",
            question: `小杨想点一杯奶茶外卖，但还差 5 元起送。于是，小杨决定点一些小料。可选的小料包括：珍珠 1 元、椰果 2 元、奶冻 3 元、奶盖 4 元。每种小料最多点 1 份。请问共有多少种满足起送条件的点小料方案？（ ）。`,
            options: [
                "16",
                "10",
                "9",
                "7",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（共有 9 种方案）**

**核心解析：**
4 种小料价格为 1、2、3、4 元，每种最多 1 份，总价须不少于 5 元。每种选或不选，全部方案 16 种。

总价不少于 5 的方案：
- 选 2 种：\`1+4=5\`、\`2+3=5\`、\`2+4=6\`、\`3+4=7\` 共 4 种；\`1+2=3\`、\`1+3=4\` 不够。
- 选 3 种：\`1+2+3=6\`、\`1+2+4=7\`、\`1+3+4=8\`、\`2+3+4=9\`，4 种都够。
- 全选：\`1+2+3+4=10\`，1 种。
合计 \`4+4+1=9\`。

补集核对：总价小于 5 的有空集、\`{1}\`、\`{2}\`、\`{3}\`、\`{1,2}\`、\`{4}\`、\`{1,3}\` 共 7 种，\`16-7=9\`。

**选项逐项分析：**
- **A 16**：❌ 全部方案数，含未满 5 元的选法。
- **B 10**：❌ 把选 2 种、选 3 种的组数相加（\`6+4\`），多算了 \`1+2\`、\`1+3\`，又漏了全选。
- **C 9**：✅ 总价不少于 5 元的方案数。
- **D 7**：❌ 总价小于 5 元的方案数，是补集不是答案。

**易错提醒：**
- 正好 5 元也满足，如 \`{1,4}\` 与 \`{2,3}\`。
- 用补集时不要漏掉一种都不选。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 2,
            type: "single",
            question: `小杨和小刘是好朋友，她们在逛商场时发现新设置的大头贴自拍机，于是决定一起拍一组照片。一组照片包 括 4 张，这 4 张照片没有顺序区分。拍每张照片时，可以选择有相框或无相框、两人可以分别选择有头饰或无头饰、 还可以从 2 种位置（小杨在左，或小刘在左）中选出一种。她们不希望一组照片中出现完全相同的相框、头饰、位置 的组合。请问一组照片共有多少种不同的方案？（ ）。`,
            options: [
                "1820",
                "70",
                "24",
                "16",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A（1820）**

**核心解析：**
本题考查乘法原理与组合计数。解题可分为两步：

1. **计算单张照片的所有可能状态：**
   拍每张照片时，各个属性的选取相互独立：
   - 相框选择：有相框、无相框（共 2 种）；
   - 小杨头饰选择：有头饰、无头饰（共 2 种）；
   - 小刘头饰选择：有头饰、无头饰（共 2 种）；
   - 两人位置选择：小杨在左、小刘在左（共 2 种）。
   根据乘法原理，每张照片共有 \`2 * 2 * 2 * 2 = 16\` 种不同的搭配。

2. **计算一组照片的搭配方案数：**
   题干给出了两个关键约束：
   - “4 张照片没有顺序区分”：说明选取是无序的，属于组合问题，而不是排列问题；
   - “不希望一组照片中出现完全相同的组合”：说明 4 张照片的状态互不相同，不能重复选取。
   因此，问题等价于从 16 种不同的单张照片组合中，任选 4 种互不相同的搭配，方案数为组合数 \`C(16, 4)\`：
   \`C(16, 4) = (16 * 15 * 14 * 13) / (4 * 3 * 2 * 1) = 43680 / 24 = 1820\`。

综上，一组照片共有 1820 种不同的方案，选项 A 正确。

**选项逐项分析：**
- **A 1820**：✅ 正确。先由乘法原理得出单张照片有 16 种不同状态，再在无重复、无顺序约束下计算组合数 \`C(16, 4) = 1820\`。
- **B 70**：❌ 错误。该项通常是将单张照片的属性选择错误地使用了加法原理，误算成 \`2 + 2 + 2 + 2 = 8\` 种状态，进而计算 \`C(8, 4) = 70\`；属性之间是同时决定的分步过程，必须使用乘法原理相乘。
- **C 24**：❌ 错误。该项为 \`4! = 4 * 3 * 2 * 1 = 24\`，是 4 张照片的全排列数，或者仅计算了组合数分母部分，忽略了整体组合选取过程。
- **D 16**：❌ 错误。16 仅为单张照片的不同搭配种类数（\`2*2*2*2\`），未进一步计算选出 4 张互不相同照片组成一组的组合数。

**易错提醒：**
- **混淆乘法原理与加法原理**：相框、两人的头饰与相对位置必须同时确定才能构成一张完整的单张照片，各个维度的状态数必须相乘，切忌误算为相加。
- **混淆排列与组合**：题目明确强调“4 张照片没有顺序区分”，因此不需要考虑拍照先后顺序（不能乘以 \`4!\`），必须严格使用组合数公式 \`C(n, m)\` 求解。

**知识延伸：**
\`C(n, m)\` 表示从 \`n\` 个不同元素中无序、不重复地取出 \`m\` 个的方案数。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 3,
            type: "single",
            question: `下列关于 C++ 类的说法，错误的是（ ）。`,
            options: [
                "派生类对象占用的内存总是不小于基类对象。",
                "派生类可以不实现基类的虚函数。",
                "如果一个类包含纯虚函数，则它不能包含成员变量。",
                "如果一个类包含纯虚函数，则不能用它定义对象。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：不正确的是 C（如果一个类包含纯虚函数，则它不能包含成员变量）**

**核心解析：**
类里只要有纯虚函数（形如 \`virtual void func() = 0;\`），它就是抽象类。抽象类不能直接定义对象，但仍然可以有成员变量、普通函数和构造函数，派生类会继承这些成员变量。因此“有纯虚函数就不能有成员变量”不成立。

**选项逐项分析：**
- **A 派生类对象占用的内存总是不小于基类对象**：说法正确。派生类对象含有基类子对象，还可以再增加自己的数据成员。即使没有新增成员，大小也至少等于基类对象，所以一定不小于基类对象。
- **B 派生类可以不实现基类的虚函数**：说法正确。如果基类声明的是带有默认实现的普通虚函数，派生类可以选择重写，也可以直接复用基类实现；如果基类声明的是纯虚函数，派生类若不实现它，语法上同样是完全合法的，只是该派生类自身也会因为保留了纯虚函数而继续保持抽象类身份，无法实例化对象。因此派生类并非必须实现基类的虚函数。
- **C 如果一个类包含纯虚函数，则它不能包含成员变量**：说法错误，符合题意。含纯虚函数的抽象类完全允许定义普通成员变量。例如图形基类 \`Shape\` 可以包含纯虚函数 \`virtual double area() = 0;\`，同时拥有表示颜色、坐标的普通成员变量 \`string color;\` 和 \`int x, y;\`，这些变量会被派生类对象正常存储和使用。
- **D 如果一个类包含纯虚函数，则不能用它定义对象**：说法正确。包含纯虚函数的抽象类属于未完全实现的接口规范，C++ 语法明确禁止直接实例化抽象类（例如 \`Shape s;\` 或 \`new Shape()\` 均会导致编译错误）。

**易错提醒：**
- **不可实例化 ≠ 没有内存结构**：抽象类虽然不能直接用类名定义独立对象（如 \`Base b;\` 会报错），但它的成员变量依然会在派生类实例化时分配内存，必须由基类构造函数进行初始化。
- **抽象类指针与引用**：虽然不能定义抽象类对象，但可以定义抽象类的指针或引用（如 \`Base* p = new Derived();\`），用来实现运行时多态。通过基类指针释放对象时，析构函数应声明为虚函数。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 4,
            type: "single",
            question: `下列关于树和图的说法，错误的是（ ）。`,
            options: [
                "每个连通图都存在生成树。",
                "每个存在生成树的有向图，都一定是强连通的。",
                "保留树的所有节点，并把树的每个节点指向其父节点，则可以将树转换为一个有向弱连通图。",
                "保留树的所有节点，并把树的每个节点指向其子节点，则可以将树转换为一个有向无环图。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：不正确的是 B（每个存在生成树的有向图，都一定是强连通的）**

**核心解析：**
题干考查树、有向图生成树与连通性（强连通、弱连通）的核心概念。
有向图的生成树（通常指以某个顶点为根的外向生成树，或称树形图）只要求存在一个根节点，从该根节点出发能够通过有向路径到达图中所有其他顶点即可；并不要求图中的任意两个节点之间都能双向互通。强连通则要求图内任意两点都互相可达。因此，存在有向生成树的图完全可以不是强连通图，选项 B 的说法是错误的。

**选项逐项分析：**
- **A 每个连通图都存在生成树。**：说法正确。在无向图中，连通图包含至少一个生成树。只需通过深度优先搜索（DFS）或广度优先搜索（BFS）遍历该图，保留遍历时经过的 \`n-1\` 条边并去除冗余环边，即可得到一棵包含全部顶点的无向生成树。本项不符合题意。
- **B 每个存在生成树的有向图，都一定是强连通的。**：说法错误。有向图存在生成树，只需存在一个根节点能单向可达其他所有节点。例如三个节点构成的单向链 \`1 -> 2 -> 3\`，它本身就是以节点 1 为根的有向生成树，但节点 3 无法到达节点 1，因此该图不是强连通图。本项符合题意。
- **C 保留树的所有节点，并把树的每个节点指向其父节点，则可以将树转换为一个有向弱连通图。**：说法正确。弱连通图是指「忽略所有边的方向后，底层的无向图是连通图」的有向图。树本身是连通的，将所有边定向为子节点指向父节点（形成内向树结构）后，若忽略箭头方向，它依然是原先连通的树，因此属于有向弱连通图。本项不符合题意。
- **D 保留树的所有节点，并把树的每个节点指向其子节点，则可以将树转换为一个有向无环图。**：说法正确。树本身不包含环路。将边定向为父节点指向子节点后（形成外向树结构），所有边的方向均严格从浅层节点指向深层节点，层深单调递增，绝不可能形成闭合回路，因此转换后的图必定是有向无环图（DAG）。本项不符合题意。

**易错提醒：**
- 混淆「有向图的连通级别」：弱连通（把箭头当无向边连通）、单向连通（任意两点至少有一方能到另一方）、强连通（任意两点双向可达）。强连通是要求最严格的连通性。
- 混淆「有向生成树的根可达性」与「全图强连通」：外向生成树只保证从根节点出发「单向辐射」到全图，并不保证其他节点能折返回根节点。

**知识延伸：**
在竞赛与算法中，求解有向图最小外向生成树的经典算法是朱-刘算法（Edmonds' algorithm），其前提就是图中存在能够到达所有其他顶点的根节点。`,
            tags: [
                "进制转换",
            ],
        },
        {
            id: 5,
            type: "single",
            question: `一对夫妻生男生女的概率相同。这对夫妻希望儿女双全。请问这对夫妻生下三个孩子时，实现儿女双全的概 率是多少？（ ）。`,
            options: [
                "1/4",
                "1/2",
                "3/4",
                "7/8",
],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

**解析：**
三胎中“儿女双全”即至少 1 男 1 女。总情况数为 2³ = 8 种，仅“全男”和“全女”两种不满足，故有利情况为 6 种，概率 = 6/8 = 3/4。

- **A 1/4**：错误。这是仅一种性别极端情况的概率（如全男），并非儿女双全。
- **B 1/2**：错误。遗漏了含 2 男 1 女与 2 女 1 男等多种有利情况。
- **C 3/4**：正确。有利情况 6 种除以总数 8 种，得 3/4。
- **D 7/8**：错误。仅排除了 1 种情况，误算了有利情况数。`,
            tags: [
                "概率与期望",
            ],
        },
        {
            id: 6,
            type: "single",
            question: "二项式 (x+y)^6 的展开式中 x^2y^4 项的系数是（ ）。",
            options: [
                "720",
                "120",
                "20",
                "15",
            ],
            answer: 3,
            score: 2,
            explanation: "**答案：D（15）**\n\n**解析：**\n由二项式定理，(x+y)^6 = Σ_{k=0}^{6} C(6,k)·x^(6-k)·y^k。\n要求 x^2y^4 项，令 6-k=2（即 k=4），该项为 C(6,4)·x^2·y^4 = 15·x^2y^4，系数为 15。\n（等价地按 k=2 取 x^2 项，C(6,2)=C(6,4)=15，结果相同。）\n\n**选项逐项分析：**\n- **A 720**：错误。720=6!，是把 6 个位置全排列，而非从 6 个 (x+y) 因子中选 2 个出 x 的组合数。\n- **B 120**：错误。120=5!，与 6 次展开无关。\n- **C 20**：错误。20=C(6,3)，对应 x^3y^3 项，指标不匹配。\n- **D 15**：正确。C(6,2)=C(6,4)=6!/(2!4!)=15。\n\n**易错提醒：**\n- 求某一项系数时先写出通项 C(n,k)·a^(n-k)·b^k，再由指数反解 k，不要直接套阶乘。",
            tags: [
                "C++综合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["question","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 7,
            type: "single",
            question: "对一个包含 V 个顶点、E 条边的图，执行广度优先搜索，其最优时间复杂度是（ ）。",
            options: ["O(V)","O(V+E)","O(V²)","O(E)"],
            answer: 1,
            score: 2,
            explanation: "**答案：B（O(V+E)）**\n\n**解析：**\n对含 V 个顶点、E 条边的图执行广度优先搜索，采用邻接表存储时：每个顶点入队、出队各一次，累计 O(V)；访问每个顶点时扫描其全部出边，所有顶点合计扫描 O(E)（无向图每条边被正反各看一次，仍为 O(E)）。两项相加得 O(V+E)。\n\n**选项逐项分析：**\n- **A O(V)**：错误。只统计了顶点，遗漏了必须沿每条边检查邻接关系的开销。\n- **B O(V+E)**：正确。顶点与边各遍历常数次，这是 BFS 的最优（邻接表）复杂度。\n- **C O(V²)**：错误。这是邻接矩阵存储时每行都要扫描 V 个位置的结果，不是最优情形。\n- **D O(E)**：错误。孤立顶点同样要入队出队，缺少 O(V) 项；稀疏图（E<V）时偏差更明显。\n\n**易错提醒：**\n- 复杂度写作 O(V+E) 而不是 O(max(V,E)) 或 O(E)，因为孤立点与森林同样要被访问。",
            tags: [
                "贪心",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 8,
            type: "single",
            question: `以下关于贪心法和动态规划的说法中，错误的是（ ）。`,
            options: [
                "动态规划能解决大部分多阶段决策问题。",
                "对特定的问题，贪心法不一定适用。",
                "当特定的问题适用贪心法时，通常比动态规划的时间复杂度更低。",
                "对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：不正确的是 A（动态规划能解决大部分多阶段决策问题）**

**核心解析：**
动态规划常用于多阶段决策，但必须同时具备最优子结构、无后效性，并通常还要有重叠子问题。不满足这些条件的多阶段决策就不能用它求解，因此“能解决大部分多阶段决策问题”把适用范围说得过大，表述错误。

**选项逐项分析：**
- **A 动态规划能解决大部分多阶段决策问题**：❌ 说法错误，符合题意。虽然很多经典多阶段决策问题（如背包问题、最短路径、最长公共子序列等）可用动态规划求解，但前提是必须具备无后效性和最优子结构。若状态间存在环路依赖或后效性，动态规划便无法适用，因此不能泛化为“能解决大部分”。
- **B 对特定的问题，贪心法不一定适用**：✅ 说法正确，不符合题意。贪心算法的成立依赖于「贪心选择性质」和「最优子结构」。许多问题每一步选择局部最优解并不能导出全局最优解（例如 0-1 背包问题、图的最长简单路径等），因此贪心法对很多特定问题并不适用。
- **C 当特定的问题适用贪心法时，通常比动态规划的时间复杂度更低**：✅ 说法正确，不符合题意。贪心法在每一步直接作出贪心选择，不保留也不回溯其他分支，通常仅需一次遍历或经过排序后线性扫描，复杂度常为 \`O(n)\` 或 \`O(n log n)\`；而动态规划需要遍历整个状态空间并进行状态转移，时间复杂度通常在更高阶（如 \`O(n*n)\`、\`O(n*V)\` 等）。因此在二者均适用的场景下，贪心通常更快。
- **D 对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当**：✅ 说法正确，不符合题意。带有备忘录的记忆化递归（自顶向下）与自底向上的循环递推填表，所访问的状态总数与每个状态的转移代价在渐进意义上是一致的，两者的渐进时间复杂度通常相当（仅在函数调用栈的常数开销上略有区别）。

**易错提醒：**
- 注意本题为反向题，要选出说法「错误」的一项。
- 容易误选 D：很多初学者认为递归一定比递推慢很多，但对于动态规划而言，递归必须配合“记忆化”，避免重复计算子问题，其时间复杂度与递推在渐进意义上是同一级别的。

**知识延伸：**
贪心法与动态规划都要求问题具备「最优子结构」性质。两者的核心区别在于：
- **贪心法**：“鼠目寸光，步步为营”，每一步只做当前看起来最好的选择，做出选择后绝不后悔。
- **动态规划**：“步步留痕，统筹全局”，计算并保存所有可能重叠的子状态，通过状态转移方程寻求全局最优。`,
            tags: [
                "动态规划",
            ],
        },
        {
            id: 9,
            type: "single",
            question: `下面程序的输出为（ ）。

\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    int N = 15, cnt = 0;
    for (int x = 1; x + x + x <= N; x++)
        for (int y = x; x + y + y <= N; y++)
            for (int z = y; x + y + z <= N; z++)
                cnt++;
    cout << cnt << endl;
    return 0;
}
\`\`\`
`,
            options: [
                "45",
                "102",
                "174",
                "3375",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**解析：**
程序统计满足 1 ≤ x ≤ y ≤ z 且 x+y+z ≤ 15 的三元组个数（x 从 1 起，3x ≤ N 限定 x ≤ 5；y 需 x+2y ≤ N；z 需 x+y+z ≤ N）。逐层枚举累加得 cnt = 102。（对比 2024 年 12 月卷同型程序：该卷 x 从 0 起得 174，本题 x 从 1 起得 102。）

- **A 45**：错误。约为 x=1、y=z 无上界放松后的部分计数。
- **B 102**：正确。编译运行转写代码输出 102。
- **C 174**：错误。这是 x 从 0 开始的同型程序结果，本题 x 从 1 开始。
- **D 3375**：错误。这是 15³，与循环计数无关。

**考点**：多重循环枚举、非降三元组计数（起始值对结果的影响）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 10,
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
                "O(n log n)",
                "O(n log log n)",
                "O(n)",
                "O(log n)",
],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

**解析：**
这是线性筛（欧拉筛）：每个合数 n*primes[i] 只在其最小质因子处被标记一次（n % primes[i] == 0 时立即 break），因此内层对每个 n 的均摊工作量是 O(1)，总时间复杂度 O(n)。

- **A O(n log n)**：错误。高估了内层循环的均摊工作量。
- **B O(n log log n)**：错误。这是埃拉托斯特尼筛的复杂度，本题的 break 保证线性。
- **C O(n)**：正确。每个合数只被最小质因子筛一次。
- **D O(log n)**：错误。外层遍历所有 [2, MAXN] 的数，不是对数级。

**考点**：线性筛（欧拉筛）的均摊复杂度分析。`,
            tags: [
                "复杂度分析",
            ],
        },
        {
            id: 11,
            type: "single",
            question: "下列 Dijkstra 算法，假设图 graph 中顶点数 v、边数 e，则程序的时间复杂度为（ ）。\n\n```cpp\ntypedef struct Edge {\n    int in, out;      // 从下标 in 顶点到下标 out 顶点的边\n    int len;          // 边长度\n    struct Edge * next;\n} Edge;\n// v: 顶点个数，graph: 出边邻接表，start: 起点下标，dis: 输出每个顶点的最短距离\nvoid dijkstra(int v, Edge * graph[], int start, int * dis) {\n    const int MAX_DIS = 0x7fffffff;\n    for (int i = 0; i < v; i++)\n        dis[i] = MAX_DIS;\n    dis[start] = 0;\n    int * visited = new int[v];\n    for (int i = 0; i < v; i++)\n        visited[i] = 0;\n    visited[start] = 1;\n    for (int t = 0; ; t++) {\n        int min = MAX_DIS, minv = -1;\n        for (int i = 0; i < v; i++) {\n            if (visited[i] == 0 && min > dis[i]) {\n                min = dis[i];\n                minv = i;\n            }\n        }\n        if (minv < 0)\n            break;\n        visited[minv] = 1;\n        for (Edge * e = graph[minv]; e != NULL; e = e->next)\n            if (dis[e->out] > e->len)\n                dis[e->out] = e->len;\n    }\n    delete[] visited;\n}\n```",
            options: ["O(v²)","O(v log v + e)","O((v+e) log v)","O(v+e)"],
            answer: 0,
            score: 2,
            explanation: "**答案：A（O(v²)）**\n\n**解析：**\n代码外层是一个最长 v+1 轮的主循环，每轮做两件事：\n1. **选点**：`for (i = 0; i < v; i++)` 线性扫描所有顶点，挑出未访问且 `dis` 最小者，代价 O(v)；\n2. **松弛**：`for (Edge * e = graph[minv]; e != NULL; e = e->next)` 遍历该点的出边，代价等于该点出度。\n\nv 轮选点合计 O(v·v)=O(v²)；所有顶点的出边只被遍历一次，合计 O(e)。由于 e ≤ v²，总复杂度取主项为 **O(v²)**。\n\n**选项逐项分析：**\n- **A O(v²)**：正确。选点用线性扫描而不是堆，v 轮 × O(v) 即 O(v²)，已覆盖 e ≤ v² 的松弛开销。\n- **B O(v log v + e)**：错误。只有用优先队列维护候选点、每个顶点只入队出队 O(1) 次并配 O(log v) 调整时才会出现 v log v 项，代码中没有堆。\n- **C O((v+e) log v)**：错误。这是“优先队列 + 邻接表”的标准堆优化 Dijkstra 复杂度，要求每次取最小点 O(log v)，本题是 O(v) 的线性扫描。\n- **D O(v+e)**：错误。达到 O(v+e) 需要在 O(1) 时间内取到最小值（如特殊图上的桶/基数结构），线性扫描做不到。\n\n**易错提醒：**\n- Dijkstra 的复杂度取决于“取当前最小点”的数据结构：数组/线性扫描 O(v²)，二叉堆 O((v+e) log v)，斐波那契堆 O(e + v log v)。先看代码里是哪种实现，再套对应的界。",
            tags: [
                "最短路",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 3,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 12,
            type: "single",
            question: "下面 count_triple 函数的时间复杂度为（ ）。\n\n```cpp\nint gcd(int m, int n) {\n    if (m == 0) return n;\n    return gcd(n % m, m);\n}\nint count_triple(int n) {\n    int cnt = 0;\n    for (int v = 1; v * v * 4 <= n; v++)\n        for (int u = v + 1; u * (u + v) * 2 <= n; u += 2)\n            if (gcd(u, v) == 1) {\n                int a = u * u - v * v;\n                int b = u * v * 2;\n                int c = u * u + v * v;\n                cnt += n / (a + b + c);\n            }\n    return cnt;\n}\n```",
            options: ["O(n²)","O(n² log n)","O(n)","O(n log n)"],
            answer: 3,
            score: 2,
            explanation: "**答案：D（O(n log n)）**\n\n**解析：**\n`count_triple` 用欧几里得公式 (u²-v², 2uv, u²+v²) 枚举本原勾股三元组：\n\n1. **枚举次数**：外层 `v` 满足 `4v² ≤ n`（v ≤ √n/2）；内层 `u` 从 `v+1` 起、步长 2，满足 `2u(u+v) ≤ n`（u = O(√n)）。两层合计的枚举总量为 O(n)。\n2. **单次代价**：每组 (u,v) 调用一次 `gcd(u, v)`，Euclid 算法 O(log n)。\n3. **合计**：O(n) × O(log n) = O(n log n)。\n\n**选项逐项分析：**\n- **A O(n²)**：错误。两层循环上界分别受 √n 限制，乘积为 O(n) 而非 O(n²)。\n- **B O(n² log n)**：错误。在错误的高估循环上界之上再乘对数因子，量级不符。\n- **C O(n)**：错误。忽略了每次枚举附带的 gcd 对数代价。\n- **D O(n log n)**：正确。O(n) 次枚举 × 每次 O(log n) 的 gcd。\n\n**易错提醒：**\n- 判定双重循环复杂度必须先算每层变量的真实上界：本题外层到 √n/2、内层到 O(√n)，总量 O(n)，再乘 gcd 的 O(log n) 即 O(n log n)。这与 2025 年 6 月八级卷同一 count_triple 函数一题的官方答案 O(n log n) 一致。",
            tags: [
                "复杂度分析",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 4,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 13,
            type: "single",
            question: "下面 merge_sort 函数试图实现归并排序算法，横线处应该填入的是（ ）。\n\n```cpp\n#include <vector>\nusing namespace std;\nvoid merge_sort(vector<int> & arr, int left, int right) {\n    if (right - left <= 1)\n        return;\n\n    int mid = (left + right) / 2;\n    merge_sort(________); // 在此处填入选项\n    merge_sort(________); // 在此处填入选项\n\n    vector<int> temp(right - left);\n    int i = left, j = mid, k = 0;\n    while (i < mid && j < right)\n        if (arr[i] <= arr[j])\n            temp[k++] = arr[i++];\n        else\n            temp[k++] = arr[j++];\n    while (i < mid)\n        temp[k++] = arr[i++];\n    while (j < right)\n        temp[k++] = arr[j++];\n    for (i = left, k = 0; i < right; ++i, ++k)\n        arr[i] = temp[k];\n}\n```",
            options: ["第一空 arr, left, mid；第二空 arr, mid, right","第一空 arr, left, mid + 1；第二空 arr, mid + 1, right","第一空 arr, left, mid；第二空 arr, mid + 1, right","第一空 arr, left, mid + 1；第二空 arr, mid + 1, right + 1"],
            answer: 0,
            score: 2,
            explanation: "**答案：A**\n\n**解析：**\n本题的区间约定是**左闭右开** [left, right)：\n\n1. 递归出口 `if (right - left <= 1) return;`：区间长度为 0 或 1 时无需排序。\n2. `int mid = (left + right) / 2;` 切分后，固定合并代码以 `i = left, j = mid` 为两段起点，即默认第一段为 [left, mid)、第二段为 [mid, right)（mid 归第二段开头）。因此两处横线应分别填 `arr, left, mid` 与 `arr, mid, right`；两段长度之和恰为 right-left，且都严格短于原区间，不会死递归。\n\n**选项逐项分析：**\n- **A `arr, left, mid` 与 `arr, mid, right`**：✅ 正确。恰为 [left,mid) 与 [mid,right)，与 `j = mid`、`i < mid` 的合并逻辑自洽。\n- **B `arr, left, mid + 1` 与 `arr, mid + 1, right`**：❌ 错误。当 right−left = 2 时 mid+1 = right，第一次递归的区间 [left, mid+1) 与原区间完全相同，无限递归直至栈溢出；即使不考虑这一点，固定合并代码把 `j = mid` 当作第二段开头，而 B 的第二段从 mid+1 开始，arr[mid]（第一段的末元素）会被错当第二段参与比较，合并结果错误。注意 [left,mid+1) 与 [mid+1,right) 的并集实为完整的 [left, right)，并不缺元素——缺陷在递归不终止与合并错位，而非漏掉 arr[mid]。\n- **C `arr, left, mid` 与 `arr, mid + 1, right`**：❌ 错误。两段为 [left,mid) 与 [mid+1,right)，下标 mid 不属于任何一段：arr[mid] 既不会被排序，也不会被正确合并，两段拼不成完整的 [left, right)。\n- **D `arr, left, mid + 1` 与 `arr, mid + 1, right + 1`**：❌ 错误。第二段 [mid+1, right+1) 把下标 right 卷进来，而 right 已越出本次调用的管辖范围 [left, right)，会读改不属于自己的元素；两段本身并不重叠，缺陷在越界与合并边界（`j = mid`）不符，而非重叠。\n\n**易错提醒：**\n- 区间端点约定决定 mid 归哪一段：本题 `right - left <= 1` 与 `j = mid` 都表明是左闭右开、mid 归第二段，因此第一空以 mid 结尾、第二空从 mid 开始，写成 mid±1 都会破坏递归或合并。",
            tags: [
                "排列组合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 4,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 14,
            type: "single",
            question: "下面 Prim 算法程序中，横线处应该填入的是（ ）。\n\n```cpp\n#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\nint prim(vector<vector<int>> & graph, int n) {\n    vector<int> key(n, INT_MAX);\n    vector<int> parent(n, -1);\n    key[0] = 0;\n    for (int i = 0; i < n; i++) {\n        int u = min_element(key.begin(), key.end()) - key.begin();\n        if (key[u] == INT_MAX)\n            break;\n        for (int v = 0; v < n; v++) {\n            if (__________) { // 在此处填入选项\n                key[v] = graph[u][v];\n                parent[v] = u;\n            }\n        }\n    }\n    int sum = 0;\n    for (int i = 0; i < n; i++) {\n        if (parent[i] != -1) {\n            cout << \"Edge: \" << parent[i] << \" - \" << i << \" Weight: \" << key[i] << endl;\n            sum += key[i];\n        }\n    }\n    return sum;\n}\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<int>> graph(n, vector<int>(n, 0));\n    for (int i = 0; i < m; i++) {\n        int u, v, w;\n        cin >> u >> v >> w;\n        graph[u][v] = w;\n        graph[v][u] = w;\n    }\n    int result = prim(graph, n);\n    cout << \"Total weight of the minimum spanning tree: \" << result << endl;\n    return 0;\n}\n```",
            options: ["graph[u][v] >= 0 && key[v] > graph[u][v]","graph[u][v] <= 0 && key[v] > graph[u][v]","graph[u][v] == 0 && key[v] > graph[u][v]","graph[u][v] != 0 && key[v] > graph[u][v]"],
            answer: 3,
            score: 2,
            explanation: "**答案：D**\n\n**解析：**\nPrim 在把顶点 u 纳入生成树后，要用 u 的边去更新其余各点的 `key`：`key[v]` 是“把 v 接进当前生成树的最小边权”。\n\n1. **排除无边**：本程序用邻接矩阵存储，`graph[u][v] == 0` 表示 u、v 之间没有边（初始化即为 0，且边权为正），必须先排除这种情况，否则会把 0 当成边权写进 `key[v]`。\n2. **判断更优**：只有当 `graph[u][v] < key[v]` 时才更优，代码写作 `key[v] > graph[u][v]`。\n3. 两者用 `&&` 连接，即 `graph[u][v] != 0 && key[v] > graph[u][v]`，与后面 `key[v] = graph[u][v]; parent[v] = u;` 的更新动作吻合。\n\n**选项逐项分析：**\n- **A `graph[u][v] >= 0`**：错误。邻接矩阵中 0 恒满足 ≥0，等于把“无边”也当作可更新，会把 `key[v]` 错误地刷成 0。\n- **B `graph[u][v] <= 0`**：错误。边权均为正，该条件只能筛出“无边”的情形，方向完全相反。\n- **C `graph[u][v] == 0`**：错误。只在“没有边”时更新，逻辑颠倒。\n- **D `graph[u][v] != 0 && key[v] > graph[u][v]`**：正确。先排除无边，再取更小的边权。\n\n**易错提醒：**\n- 用邻接矩阵做 Prim 时，0 既可能是“无边”也可能是“边权为 0”，本题保证边权为正，所以 `!= 0` 可安全表示“有边”。",
            tags: [
                "最小生成树",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 5,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 15,
            type: "single",
            question: `下面的程序使用出边邻接表表达的带权无向图，则从顶点0到顶点3的最短距离为（ ）。

\`\`\`cpp
#include <vector>
using namespace std;

class Edge {
public:
    int dest;
    int weight;
    Edge(int d, int w) : dest(d), weight(w) {}
};

class Graph {
private:
    int num_vertex;
    vector<vector<Edge>> vve;

public:
    Graph(int v) : num_vertex(v), vve(v) {}
    void addEdge(int s, int d, int w) {
        vve[s].emplace_back(d, w);
        vve[d].emplace_back(s, w)
    }
};

int main() {
    Graph g(4);
    g.addEdge(0, 1, 8);
    g.addEdge(0, 2, 5);
    g.addEdge(1, 2, 1);
    g.addEdge(1, 3, 3);
    g.addEdge(2, 3, 7);
    return 0;
}
\`\`\`
`,
            options: [
                "12",
                "11",
                "10",
                "9",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

**解析：**
addEdge 双向建边，图含 4 个顶点、5 条无向边：0-1(8)、0-2(5)、1-2(1)、1-3(3)、2-3(7)。枚举顶点 0 到顶点 3 的各条路径：

- 0-1-3：8 + 3 = 11；
- 0-2-3：5 + 7 = 12；
- 0-2-1-3：5 + 1 + 3 = 9；
- 0-1-2-3：8 + 1 + 7 = 16。

最短距离为 9。

- **A 12**：错误。这是 0-2-3，次优路径。
- **B 11**：错误。这是 0-1-3，并非最优。
- **C 10**：错误。不存在权和为 10 的 0→3 路径。
- **D 9**：正确。0-2-1-3 = 5+1+3 = 9 为最短。

（注：原卷代码第 18 行 \`vve[d].emplace_back(s, w)\` 末尾缺少分号，系原卷排版笔误，转写时保持原样。）

**考点**：链式邻接表（vector 建图）与带权无向图最短路径枚举。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 16,
            type: "judge",
            question: `C++语言中，表达式 '9' ^ 3 的结果值为 '999' 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：** '9' 是字符常量，其 ASCII 码为 57（0x39）。表达式 '9' ^ 3 按整数运算：57 ^ 3 = 0b111001 ^ 0b000011 = 0b111010 = 58，对应字符 ':'，结果是一个 int 值 58，既不等于字符 '999'（单个 char 也装不下三个字符），类型与数值都对不上。

**考点**：字符常量、ASCII 与位运算（异或）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 17,
            type: "judge",
            question: "下列 C++ 语言代码，能够安全地输出 arr[5] 的值。\n\n```cpp\nint n = 5;\nint arr[n] = {1, 2, 3};\nstd::cout << arr[5];\n```",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：错误**\n\n**解析：**\n代码中 `int arr[n]` 用 n=5 定义数组，元素个数为 5，合法下标只有 0、1、2、3、4；`arr[5]` 已越界一个元素。\n\n- 对原生数组，C++ 标准**不做下标检查**，`arr[5]` 属于未定义行为（UB）：可能读到相邻内存里的任意值，也可能触发段错误，但绝不保证“安全地输出”。\n- 另外 `int arr[n]` 中 n 为变量，属于变长数组（VLA），并非 C++ 标准特性（GCC 作为扩展支持），移植到 MSVC 等编译器会直接编译失败。\n\n**考点**：数组下标越界、未定义行为（UB）与变长数组的可移植性。",
            tags: [
                "C++综合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["question","explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 18,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第6页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6],
            reviewedAt: "2026-11-07",
            reviewedBy: "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
            sourceVerified: true,
            type: "judge",
            question: `对n个元素的数组进行排序，最差情况的时间复杂度为 O(n²)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：错误**\n\n**解析：**\n题面只说“对 n 个元素的数组进行排序”，并未限定算法。\n\n- 冒泡、插入、选择排序的最坏复杂度确实是 O(n²)；\n- 但归并排序、堆排序的最坏复杂度都是 O(n log n)，在所有 n 上都优于 n²；\n- 更进一步，基于比较的排序存在 Ω(n log n) 的下界。\n\n因此“排序的最差时间复杂度为 O(n²)”不能作为普遍结论，命题错误。\n\n**考点**：常见排序算法的最坏复杂度与比较排序的下界。",
            tags: [
                "排列组合",
            ],
      "reviewedFields": ["explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 19,
            type: "judge",
            question: `有4个红球、3个蓝球和2个绿球排成一排（相同色球视为完全相同），则不同的排列方案数为1260种 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 9 个球（4 红、3 蓝、2 绿）排成一排，同色球不可区分，不同排列数为多重集全排列：
9! / (4!·3!·2!) = 362880 / (24·6·2) = 362880 / 288 = 1260。
与题述一致。

**考点**：多重集排列计数。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 20,
            type: "judge",
            question: `使用 math.h 或 cmath 头文件中的函数，对于 int 类型的变量 x ，表达式 fabs(x) 和 sqrt(x * x) 的结果总是近似相等的。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**解析：** fabs(x) 求 |x|。但 sqrt(x * x) 中 x*x 先以 int 作整数乘法，当 |x| 较大（如 x > 46340）时会发生 32 位 int 溢出，结果为负再去 sqrt 得到 NaN，与 fabs(x) 相去甚远；即便不溢出，sqrt(x*x) 也只是在数值上等于 |x|，并不“总是”近似相等（存在溢出与精度例外）。故该说法不成立。

**考点**：整型溢出、cmath 函数语义。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 21,
            type: "judge",
            question: `运算符重载是 C++ 语言静态多态的一种典型体现，而使用 C 语言则无法实现运算符重载。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 运算符重载在编译期根据操作数类型决议，属于静态（编译期）多态（特设多态）的典型形式；而 C 语言不提供运算符重载特性，无法重载运算符。两句均正确，故整体判断正确。

**考点**：运算符重载与静态多态、C/C++ 差异。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 22,
            type: "judge",
            question: `存在一个简单无向图满足：顶点数为 6 ，边数为 8 ， 6 个顶点的度数分别为 3 、 3 、 3 、 3 、 2 、 2 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 度数序列 3,3,3,3,2,2 之和为 16 = 2×8，与边数 8 一致（握手定理，必要条件满足）。进一步可构造简单无向图：令 A,B,C,D 各度 3，E,F 各度 2；取边 AB,AC,AD,BC,BD,CE,DF,EF（共 8 条，无重边无自环），各点度数恰为 3,3,3,3,2,2。故该图存在。

**考点**：握手定理与图的可实现性（Erdős–Gallai 思想）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 23,
            type: "judge",
            question: `已知两个double类型的变量r和theta分别表示一个扇形的圆半径及圆心角（弧度），则扇形的周长可 以通过表达式(2+theta) * r求得。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 扇形周长 = 两条半径 + 弧长 = 2r + r·θ = r·(2 + θ) = (2 + theta) * r，其中 θ 为圆心角的弧度值。题述表达式正确。

**考点**：扇形几何公式（周长 = 2r + rθ）。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 24,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第7页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 7,
            sourcePages: [7],
            reviewedAt: "2026-11-07",
            reviewedBy: "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
            sourceVerified: true,
            type: "judge",
            question: `Dijkstra算法的时间复杂度为 O(V²)，其中V为图中顶点的数量。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：错误**\n\n**解析：**\nDijkstra 算法的时间复杂度**取决于“取当前距离最小顶点”所用数据结构**，并不固定为 O(V²)：\n\n- 邻接矩阵 / 数组线性扫描：O(V²)；\n- 邻接表 + 二叉堆（优先队列）：O((V+E) log V)；\n- 邻接表 + 斐波那契堆：O(E + V log V)。\n\n题面只说“Dijkstra 算法的时间复杂度为 O(V²)”，没有限定实现方式，把一种特定实现（稠密图下的数组实现）当作算法的固有复杂度，概括过强，故命题错误。\n\n**考点**：Dijkstra 的多种实现及其复杂度差异。",
            tags: [
                "最短路",
            ],
      "reviewedFields": ["answer","explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 25,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第7页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 7,
            sourcePages: [7],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",
            question: `从32名学生中选出2人分别担任男生班长和女生班长（男生班长必须是男生，女生班长必须是女生），则共有 C(32,2)/2 种不同的选法。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `答案为错误。

设男生有m人，女生有32-m人，男生班长有m种选择，女生班长有32-m种选择，乘法原理得到m(32-m)种。总人数不足以确定这个数值，还需要男女人数。

原式C(32,2)/2=248既计入同性组合，也不能通过除以2排除这些组合。例如男女各16人时，实际共有16×16=256种，已经构成反例。`,
            tags: [
                "排列组合",
            ],
        }
    ]
};
