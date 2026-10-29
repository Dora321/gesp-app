// 2026年6月 GESP C++ 八级真题 (第14次认证)
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照官方 PDF 镜像转录。
// 客观题答案以原卷答案表为唯一证据：
//   单选题答案表在第 1 页：B B C A C D A A D A C B B C D
//   判断题答案表在第 4 页：√ √ × × √ × √ √ × √
// 判断题答案表为矢量红色 √/× 记号，已按 200dpi 渲染逐格读取并全部逻辑复核。
// 注意：判断题第 3、4 题题干中的公式即为官方给出的"错误"形式（C(n+k,k) 与
//   C(n-1,k)+C(n-2,k)），答案为 ×，转录时保留官方原式。

export const paperData = {
  id: '2026-06-l8',
  title: '2026年6月 GESP C++ 八级真题',
  level: 8,
  year: 2026,
  month: 6,
  session: 14,
  timeLimit: 90 * 60,
  source: {
    officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B46%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf',
    type: 'official',
    notes: '全卷依据官方 PDF 镜像逐题转录；计数、几何、图论等公式图片均渲染核对。',
  },
  verification: {
    status: 'partial',
    reviewedBy: '本站校订',
    reviewedAt: '2026-10-30',
    scope: '单选答案串 BBCAC DAADC BBBCD 与判断答案串 √√××√×√√×√ 按官方答案表转录，编程题样例与数据范围已渲染核对。',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `从 7 本不同的算法书和 5 本不同的数学书中选出 4 本，要求两类书都至少选 1 本，共有（ ）种不同选法。`,
      options: ['420', '455', '465', '495'],
      answer: 1,
      score: 2,
      explanation: `**答案：B (455)**

**核心解析：**
用间接法（容斥）：从 12 本书中任选 4 本共 C(12,4) = 495 种，减去"全是算法书"C(7,4) = 35 种和"全是数学书"C(5,4) = 5 种：

$$C(12,4) - C(7,4) - C(5,4) = 495 - 35 - 5 = 455$$

**选项分析：**
- **A 420**：C(7,4)+C(5,4) 与其他组合的误算。
- **C 465 / D 495**：容斥不完整（495 是没有排除的全选数）。

**考点：** 组合计数、容斥原理`,
      tags: ['组合计数'],
    },
    {
      id: 2,
      type: 'single',
      question: `6 个人排成一排照相，其中甲、乙两人不能相邻，共有（ ）种不同排法。`,
      options: ['240', '480', '600', '720'],
      answer: 1,
      score: 2,
      explanation: `**答案：B (480)**

**核心解析：**
间接法：6 人全排列 6! = 720 种；把甲乙捆在一起视为一个整体，内部再排 2!，共 2! × 5! = 240 种相邻排法。

不相邻排法 = 720 − 240 = **480**。

（等价的插空法：先排其余 4 人 4! 种，形成 5 个空位，选 2 个放入甲乙并排列 A(5,2) = 20，4! × 20 = 480 ✓）

**选项分析：**
- **A 240**：恰好是"相邻"的排法数。
- **C 600 / D 720**：排除不完整。

**考点：** 排列组合、不相邻问题`,
      tags: ['排列组合'],
    },
    {
      id: 3,
      type: 'single',
      question: `展开式 $(x^2 - \\frac{1}{x})^6$ 中，常数项的系数为（ ）。`,
      options: ['6', '12', '15', '20'],
      answer: 2,
      score: 2,
      explanation: `**答案：C (15)**

**核心解析：**
二项式定理通项：

$$T_{k+1} = C(6,k) \\cdot (x^2)^{6-k} \\cdot \\left(-\\frac{1}{x}\\right)^k = C(6,k) \\cdot (-1)^k \\cdot x^{12-3k}$$

常数项要求 12 − 3k = 0，即 k = 4。系数 = C(6,4) × (−1)⁴ = 15 × 1 = **15**。

**选项分析：**
- **A 6**：C(6,1)，取错了 k。
- **B 12**：无对应的二项式系数。
- **D 20**：C(6,3)，k 取错。

**考点：** 二项式定理、常数项`,
      tags: ['组合计数', '二项式定理'],
    },
    {
      id: 4,
      type: 'single',
      question: `下面代码用于预处理组合数，横线处应填入的是（ ）。
\`\`\`cpp
for (int i = 0; i <= n; i++) {
    c[i][0] = c[i][i] = 1;
    for (int j = 1; j < i; j++)
        c[i][j] = __________;
}
\`\`\``,
      options: [
        'c[i - 1][j - 1] + c[i - 1][j]',
        'c[i][j - 1] + c[i - 1][j - 1]',
        'c[i - 1][j] + c[i][j + 1]',
        'c[i][j - 1] * c[i - 1][j]',
      ],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
杨辉三角（帕斯卡恒等式）：从 i 个元素中选 j 个，可以按"是否选第 i 个元素"分为两类——选（从其余 i−1 个中再选 j−1 个）或不选（从其余 i−1 个中选 j 个）：

$$C(i,j) = C(i-1, j-1) + C(i-1, j)$$

即 \`c[i][j] = c[i-1][j-1] + c[i-1][j]\`，边界 c[i][0] = c[i][i] = 1。

**选项分析：**
- **B / C**：递推引用了本行 c[i][·]（尚未算出）或下标错位。
- **D**：组合数不满足乘法递推。

**考点：** 组合数、杨辉三角、递推`,
      tags: ['组合计数', '递推'],
    },
    {
      id: 5,
      type: 'single',
      question: `下列程序输出的值为（ ）。
\`\`\`cpp
long long qpow(long long a, long long b, long long mod) {
    long long ans = 1 % mod;
    while (b) {
        if (b & 1)
            ans = ans * a % mod;
        a = a * a % mod;
        b >>= 1;
    }
    return ans;
}
int main() {
    cout << qpow(3, 20, 17) << endl;
    return 0;
}
\`\`\``,
      options: ['1', '4', '13', '16'],
      answer: 2,
      score: 2,
      explanation: `**答案：C (13)**

**核心解析：**
求 3²⁰ mod 17。由费马小定理，3¹⁶ ≡ 1 (mod 17)，逐步验证：3⁴ = 81 ≡ 81 − 68 = 13，3⁸ ≡ 13² = 169 ≡ 169 − 153 = 16 ≡ −1，3¹⁶ ≡ (−1)² = 1。

所以 3²⁰ = 3¹⁶ × 3⁴ ≡ 1 × 13 = **13**。

**选项分析：**
- **A 1**：误以为指数整除 16−1=15 之类的错算。
- **B 4 / D 16**：模运算中途出错（16 ≡ −1 是 3⁸ 的值）。

**考点：** 快速幂、模运算、费马小定理`,
      tags: ['数论', '快速幂'],
    },
    {
      id: 6,
      type: 'single',
      question: `归并排序每次把长度为 n 的序列分成两个规模约为 n/2 的子序列，递归排序后再用线性时间合并。该算法的时间复杂度通常为（ ）。`,
      options: ['O(n)', 'O(n²)', 'O(log n)', 'O(n log n)'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

**核心解析：**
递推式 T(n) = 2T(n/2) + O(n)。递归树共 log₂n 层，每层合并总代价 O(n)，总时间 **O(n log n)**——最好、最坏、平均都是如此。这也是主定理 T(n) = aT(n/b) + f(n)（a=2, b=2, f(n)=n）取 f(n) 主导情形的直接结论。

**选项分析：**
- **A O(n)**：漏掉 log 层递归。
- **B O(n²)**：是冒泡/选择/插入排序的复杂度。
- **C O(log n)**：只是递归深度。

**考点：** 归并排序、时间复杂度、分治`,
      tags: ['排序算法', '时间复杂度', '归并排序'],
    },
    {
      id: 7,
      type: 'single',
      question: `在平面直角坐标系中，三角形三个顶点为 A(1,1)、B(5,2)、C(3,6)，该三角形面积为（ ）。`,
      options: ['9', '10', '12', '18'],
      answer: 0,
      score: 2,
      explanation: `**答案：A (9)**

**核心解析：**
鞋带公式（叉积法）：

$$S = \\frac{1}{2}\\left| x_A(y_B - y_C) + x_B(y_C - y_A) + x_C(y_A - y_B) \\right|$$

代入：½ |1×(2−6) + 5×(6−1) + 3×(1−2)| = ½ |−4 + 25 − 3| = ½ × 18 = **9**。

**选项分析：**
- **B 10 / C 12**：叉积计算出错。
- **D 18**：忘了除以 2（这是叉积绝对值本身）。

**考点：** 几何计算、鞋带公式`,
      tags: ['几何', '数学'],
    },
    {
      id: 8,
      type: 'single',
      question: `某程序需要判断点 P(x,y) 是否在以原点为圆心、半径为 5 的圆内或圆上。下列判断条件正确的是（ ）。`,
      options: [
        'x * x + y * y <= 25',
        'abs(x) + abs(y) <= 5',
        'x * x - y * y <= 25',
        'x + y <= 5',
      ],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

**核心解析：**
点到原点的距离 d = √(x² + y²)。"圆内或圆上"即 d ≤ 5。两边平方（距离非负，等价）得 **x² + y² ≤ 25**——不必开方，避免浮点误差且更快。

**选项分析：**
- **B**：|x| + |y| ≤ 5 描述的是菱形（曼哈顿距离球），不是圆。
- **C**：x² − y² ≤ 25 是双曲型区域，毫无圆的意义。
- **D**：x + y ≤ 5 只是半平面，且负值全部误判为在内。

**考点：** 几何判断、圆`,
      tags: ['几何', '数学'],
    },
    {
      id: 9,
      type: 'single',
      question: `某无向带权图有边 (1,2,4)、(1,3,2)、(2,3,1)、(2,4,5)、(3,4,8)、(3,5,10)、(4,5,2)，该图最小生成树的总权值为（ ）。`,
      options: ['7', '8', '9', '10'],
      answer: 3,
      score: 2,
      explanation: `**答案：D (10)**

**核心解析：**
Kruskal 按权从小到大选边（5 个顶点需 4 条边）：
1. (2,3) 权 1 → 加入，{2,3}
2. (1,3) 权 2 → 加入，{1,2,3}
3. (4,5) 权 2 → 加入，{4,5}
4. (1,2) 权 4 → 1、2 已连通，跳过
5. (2,4) 权 5 → 加入，全连通，结束

总权值 = 1 + 2 + 2 + 5 = **10**。

**选项分析：**
- **A 7 / B 8 / C 9**：选边数量不足或误加了成环的边后权重算错。

**考点：** 最小生成树、Kruskal`,
      tags: ['图论', '最小生成树'],
    },
    {
      id: 10,
      type: 'single',
      question: `有向非负权图边为 1→2(3)、2→4(4)、1→3(10)、3→4(1)、2→3(2)。使用 Dijkstra 算法从 1 号顶点出发到 4 号顶点的最短距离为（ ）。`,
      options: ['6', '7', '8', '11'],
      answer: 0,
      score: 2,
      explanation: `**答案：A (6)**

**核心解析：**
逐步松弛：
- 初始 dist = [0, ∞, ∞, ∞]；
- 出队 1（0）：dist[2] = 3，dist[3] = 10；
- 出队 2（3）：dist[4] = 3 + 4 = 7，dist[3] = min(10, 3 + 2) = 5；
- 出队 3（5）：dist[4] = min(7, 5 + 1) = **6**；
- 出队 4（6）：确定最短距离 6。

最优路径 1 → 2 → 3 → 4，代价 3 + 2 + 1 = **6**（比直接的 1→2→4 = 7 更优）。

**选项分析：**
- **B 7**：只考虑了路径 1→2→4，漏掉经 3 的中转。
- **C 8 / D 11**：松弛顺序或边权使用错误。

**考点：** Dijkstra、最短路`,
      tags: ['图论', 'Dijkstra', '最短路'],
    },
    {
      id: 11,
      type: 'single',
      question: `下列代码片段的时间复杂度为（ ）。
\`\`\`cpp
long long s = 0;
for (int i = 1; i <= n; i++) {
    for (int j = 1; j * j <= n; j++) {
        s += i + j;
    }
}
\`\`\``,
      options: ['O(n)', 'O(n log n)', 'O(n√n)', 'O(n²)'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

**核心解析：**
外层执行 n 次；内层的循环条件是 j × j ≤ n，即 j 最多取到 √n，内层执行约 √n 次。两层相乘：

$$n \\times \\sqrt{n} = O(n\\sqrt{n})$$

**选项分析：**
- **A O(n)**：漏掉内层。
- **B O(n log n)**：内层是 √n 次而不是 log n 次。
- **D O(n²)**：误把内层当作 n 次。

**考点：** 时间复杂度分析`,
      tags: ['时间复杂度'],
    },
    {
      id: 12,
      type: 'single',
      question: `某优化问题的答案是 [1, M] 内的整数，存在单调判定函数 check(x)，且每次判定的时间复杂度为 O(n)。使用二分答案求最小可行值，整体时间复杂度通常为（ ）。`,
      options: ['O(nM)', 'O(n log M)', 'O(M log n)', 'O(n + M)'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
二分答案在长度 M 的值域上折半，最多进行 O(log M) 次判定；每次判定调用 check(x) 花费 O(n)。总复杂度 = O(log M) × O(n) = **O(n log M)**。

**选项分析：**
- **A O(nM)**：线性扫描所有取值（未利用二分）。
- **C O(M log n)**：把值域与判定规模的角色弄反。
- **D O(n + M)**：复杂度是相乘不是相加。

**考点：** 二分答案、复杂度分析`,
      tags: ['二分查找', '时间复杂度'],
    },
    {
      id: 13,
      type: 'single',
      question: `下列线性筛的代码片段中，当枚举到质数 p 且 i % p == 0 时，使用 break; 语句停止继续枚举。这样做的主要目的是（ ）。
\`\`\`cpp
for (int i = 2; i <= n; ++i) {
    if (!is_composite[i])
        primes.push_back(i);
    for (int p : primes) {
        if (i * p > n)
            break;
        is_composite[i * p] = true;
        if (i % p == 0)
            break;        // 这条语句的目的是？
    }
}
\`\`\``,
      options: [
        '保证递归深度不超过 O(log n)。',
        '保证每个合数只被它的最小质因子筛去一次。',
        '保证每个素数都被标记为合数。',
        '把筛法时间复杂度提高到 O(n log n)。',
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
线性筛的核心不变量：每个合数 \`i * p\` 由它的**最小质因子** p 恰好筛一次。当 p 整除 i 时，再换更大的质数 p' 去筛 \`i * p'\`，该合数的最小质因子仍是 p（会在未来以 i' = i·p'/p 配合 p 再被筛到）——继续枚举只会造成重复标记。所以此时 break，既保证正确又把总复杂度压到 **O(n)**（线性）。

**选项分析：**
- **A**：筛法是迭代，没有递归。
- **C**：素数本来就不会被标记为合数，语义都不对。
- **D**："提高"到 O(n log n) 是倒退——埃氏筛才是 O(n log log n)，此 break 恰恰是为了达到线性。

**考点：** 线性筛、素数、数论`,
      tags: ['数论', '素数', '线性筛'],
    },
    {
      id: 14,
      type: 'single',
      question: `在 C++ 中，关于类的继承和构造、析构顺序，下列说法正确的是（ ）。`,
      options: [
        '派生类可以直接访问基类的 private 成员。',
        '基类的 protected 成员在私有继承后会变成派生类的 public 成员。',
        '创建派生类对象时，会先调用基类构造函数，再调用派生类构造函数。',
        '销毁派生类对象时，会先调用基类析构函数，再调用派生类析构函数。',
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

**核心解析：**
对象构造自内向外搭积木：**先基类后派生**（基类子对象先就绪，派生部分才能安全初始化）；析构顺序严格相反：**先派生后基类**（派生部分可能还依赖基类成员）。

**选项分析：**
- **A**：private 成员只有本类（及友元）可访问，派生类也不行。
- **B**：私有继承会把基类的 public/protected 成员都变成派生类的 **private** 成员，不是 public。
- **D**：顺序反了——先派生类析构，再基类析构。

**考点：** 继承、构造与析构顺序`,
      tags: ['面向对象', '继承'],
    },
    {
      id: 15,
      type: 'single',
      question: `将 4 个元素按 1, 2, 3, 4 的顺序入栈，在该过程中可随时插入出栈操作。下列序列中不可能作为出栈序列的是（ ）。`,
      options: ['1, 2, 3, 4', '2, 1, 4, 3', '3, 2, 1, 4', '3, 1, 2, 4'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

**核心解析：**
逐一模拟：
- **A 1,2,3,4**：进一个出一个，可行；
- **B 2,1,4,3**：进 1、2，出 2、1；再进 3、4，出 4、3，可行；
- **C 3,2,1,4**：进 1、2、3，出 3、2、1，再进 4 出 4，可行；
- **D 3,1,2,4**：要第一个出 3，必须 1、2、3 都已入栈；弹出 3 后栈顶是 **2**，按栈"后进先出"，下一个只能出 2，不可能出 1——**不可能**。

**判断技巧：** 出栈序列中若存在某元素 x，在 x 之后出栈且有比 x 更早应出栈却"跨过中间元素"的模式（大于 x 的先出、然后跳过中间某个更小的先出 1 再出 2），即可判定不可行。

**考点：** 栈、出栈序列、卡特兰数`,
      tags: ['栈'],
    },
    {
      id: 16,
      type: 'judge',
      question: `若一项任务可从两种互斥的方案中选择一种完成，其中，方案 A 有 m 种做法，方案 B 有 n 种做法，则总做法数为 m + n。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
这正是**加法原理**：完成一件事有互斥的两类方案，第一类 m 种、第二类 n 种，任选其一即可完成，则总方案数为 m + n。与之对应的是乘法原理：分步完成时总方案数为各步之积。`,
      tags: ['组合计数'],
    },
    {
      id: 17,
      type: 'judge',
      question: `将 n 个不同元素围成一圈，若只把旋转视为同一种排法、翻转仍视为不同排法，则方案数为 (n − 1)!。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
圆排列计数：n 个元素排成一圈的每个方案在"拉直"后对应 n 个线排列（旋转不改变相对次序），所以圆排列数 = n! / n = **(n − 1)!**。注意翻转（镜像）算不同排法——若翻转也视为相同（如手镯问题），方案数要再除以 2。`,
      tags: ['组合计数', '圆排列'],
    },
    {
      id: 18,
      type: 'judge',
      question: `从 n 个不同元素中可重复地选取 k 个且不考虑顺序，方案数为 C(n + k, k)。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
可重复组合（多重集组合）的正确方案数是 **C(n + k − 1, k)**（隔板法：把 k 个选取转换成在 n 类元素中插板），不是 C(n + k, k)。

验证小例子：n = 2, k = 1，从 2 个元素中可重复选 1 个显然只有 2 种；C(2+1, 1) = 3 ≠ 2，而正确公式 C(2+1−1, 1) = C(2,1) = 2 ✓。`,
      tags: ['组合计数'],
    },
    {
      id: 19,
      type: 'judge',
      question: `杨辉三角中的组合数满足 C(n, k) = C(n − 1, k) + C(n − 2, k)。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
帕斯卡恒等式的正确形式是：

$$C(n, k) = C(n-1, k-1) + C(n-1, k)$$

两项都来自**第 n−1 行**（按"是否选取第 n 个元素"分类）。题干中的 C(n − 2, k) 错误。

验证：C(4,2) = 6，而 C(3,2) + C(2,2) = 3 + 1 = 4 ≠ 6；C(3,2) + C(3,1) = 3 + 3 = 6 ✓。`,
      tags: ['组合计数', '杨辉三角'],
    },
    {
      id: 20,
      type: 'judge',
      question: `快速幂通过二进制拆分指数，可以在 O(log b) 时间内计算 a^b mod m。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
把指数 b 写成二进制：a^b = a^(b₀·2⁰) · a^(b₁·2¹) · …，底数每轮平方一次（a → a² → a⁴ → …），按 b 的二进制位决定是否乘入答案。循环次数等于 b 的二进制位数，即 **O(log b)** 次乘法（每次附带取模）。`,
      tags: ['快速幂', '数论'],
    },
    {
      id: 21,
      type: 'judge',
      question: `只要图中不存在负权环，Dijkstra 算法就一定能正确处理带负权边的图。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
Dijkstra 的正确性依赖**贪心不变量**：每次从优先队列取出的顶点距离已最终确定（基于"边权非负，绕路不会更短"）。存在负权边时，即使没有负权环，该不变量也会被破坏——后面发现的负权边可能让"已确定"的顶点距离变得更小，而 Dijkstra 不会回头修正。

例如 1→2 权 3、1→3 权 2、3→2 权 −2：Dijkstra 先确定 dist[2]=3，但实际最短是 0。处理负权边应使用 Bellman-Ford / SPFA。`,
      tags: ['图论', 'Dijkstra', '最短路'],
    },
    {
      id: 22,
      type: 'judge',
      question: `若一张连通无向图所有边权两两不同，则它的最小生成树一定唯一。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
反证：若存在两棵不同的最小生成树 T₁ ≠ T₂，取 T₁ 中权值最小的、不在 T₂ 中的边 e。在 T₂ 中加入 e 会形成环，环上必有一条边 f 权大于 e（边权两两不同且 T₁、T₂ 都是 MST 会导出矛盾）。用 e 换 f 得到比 T₂ 更小的树，与 T₂ 是最小生成树矛盾。因此 MST 唯一。

（边权可重复时 MST 才可能不唯一；Kruskal/Prim 在边权互异时结果确定。）`,
      tags: ['图论', '最小生成树'],
    },
    {
      id: 23,
      type: 'judge',
      question: `判断点 (x, y) 是否在以原点为圆心、半径为 r 的圆内或圆上时，可以比较 x² + y² 与 r²，不必先开平方。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
"圆内或圆上"即 √(x² + y²) ≤ r。由于两边都非负，平方是单调等价变换：x² + y² ≤ r² ⟺ 距离 ≤ r。比较整数平方还能完全避免开方带来的**浮点精度误差**和额外计算开销，是几何判定的标准做法。`,
      tags: ['几何', '数学'],
    },
    {
      id: 24,
      type: 'judge',
      question: `若能写出判定函数 check(x)，表示"答案为 x 时是否可行"，即使 check(x) 不满足单调性，也一定可以使用二分答案求最优解。`,
      options: ['正确', '错误'],
      answer: false,
      score: 2,
      explanation: `**答案：×**

**解析：**
二分答案的前提是判定函数关于 x **单调**（可行区间是一段连续的前缀/后缀，如"刀数固定时 x 越大越可行"）。若 check(x) 可行性忽真忽假、无单调性，二分收缩区间时会把最优解所在的一半直接丢弃，得到错误结果。

非单调问题需要枚举、动态规划或其他方法。`,
      tags: ['二分查找'],
    },
    {
      id: 25,
      type: 'judge',
      question: `归并排序是一种稳定排序算法，常见实现的时间复杂度为 O(n log n)。`,
      options: ['正确', '错误'],
      answer: true,
      score: 2,
      explanation: `**答案：√**

**解析：**
稳定性：合并时比较用 \`<=\`（左半部分元素相等时优先取左），左右两半内部原有的相对次序不被打乱——稳定。

复杂度：T(n) = 2T(n/2) + O(n) = O(n log n)，且最好、最坏、平均都稳定在这一水平（这是它相对快排的优点）。`,
      tags: ['排序算法', '归并排序'],
    },
    {
      id: 26,
      type: 'programming',
      title: '线网建设',
      score: 25,
      description: `A 市有 n 座基站需要通过线网互相连接。第 i 座基站位于二维平面上坐标 (x_i, y_i) 处。

第 i 座基站与第 j 座基站之间的距离定义为 $\\sqrt{(x_i - x_j)^2 + (y_i - y_j)^2}$。

如果两座基站之间的距离不超过给定的整数 l，那么可以修建连接这两座基站的线路，线路长度为基站间的距离。

如果从一座基站出发，经过一系列线网中的线路可以到达另一座基站，则称这两座基站是互相连接的。

请问使得 n 座基站两两之间都互相连接，需要修建的线路总长度最小是多少？如果不能修建满足条件的线网，则输出 Impossible。

## 数据范围

对于 40% 的测试点，保证 $1 \\leq n \\leq 100$。

对于所有测试点，保证 $1 \\leq n \\leq 500$，$1 \\leq l \\leq 100$，$-100 \\leq x_i, y_i \\leq 100$。`,
      inputDescription: `第一行，两个正整数 n, l，分别表示基站数量与线路长度上限。

接下来 n 行，每行两个整数 x_i, y_i，表示基站的坐标。`,
      outputDescription: `输出一行。如果能修建满足条件的线网，则输出需要修建的最小线路总长度，保留两位小数。否则输出 Impossible。`,
      samples: [
        {
          input: `4 2
1 0
-1 -1
0 0
1 1`,
          output: `3.41`,
        },
        {
          input: `4 1
1 0
-1 -1
0 0
1 1`,
          output: `Impossible`,
        },
      ],
      explanation: `**解析：**

把每座基站看作图上顶点，凡距离 ≤ l 的点对之间连一条权为欧氏距离的边，问题转化为**最小生成树**：生成树可行当且仅当图连通；连通时用 Kruskal（边按距离排序 + 并查集）累加树边权；最终选不满 n − 1 条边说明图不连通，输出 Impossible。

**样例验证 1（l = 2）：** 可行边 1-3(1)、1-4(1)、2-3(√2)、3-4(√2)（其余点对距离 > 2），MST 取 1 + 1 + √2 ≈ 3.41 ✓
**样例验证 2（l = 1）：** 只剩 1-3、1-两条边，2 号基站孤立 → Impossible ✓

复杂度：边数 O(n²)，排序 O(n² log n²)（n ≤ 500，约 1.25×10⁵ 条边，轻松通过）。

**考点：** 最小生成树、Kruskal、并查集、计算几何
`,
      template: '#include <iostream>\n#include <cstdio>\n#include <algorithm>\n#include <cmath>\nusing namespace std;\n\nconst int N = 510;\nconst int E = N * N;\nint n, l;\nint x[N], y[N];\nint p[E], u[E], v[E], cnt;\nint f[N], t = 0;\ndouble d[E], ans = 0;\n\nint getf(int u) {\n    // 在此编写代码（并查集查找）\n    return u;\n}\n\nint main() {\n    cin >> n >> l;\n    for (int i = 1; i <= n; i++)\n        cin >> x[i] >> y[i];\n    // 在此编写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\n#include <cstdio>\n#include <algorithm>\n#include <cmath>\nusing namespace std;\nconst int N = 510;\nconst int E = N * N;\nint n, l;\nint x[N], y[N];\nint p[E], u[E], v[E], cnt;\nint f[N], t = 0;\ndouble d[E], ans = 0;\nint getf(int u) {\n    return f[u] ? f[u] = getf(f[u]) : u;\n}\nbool cmp(int a, int b) {\n    return d[a] < d[b];\n}\nint main() {\n    cin >> n >> l;\n    for (int i = 1; i <= n; i++)\n        cin >> x[i] >> y[i];\n    for (int i = 1; i <= n; i++)\n        for (int j = i + 1; j <= n; j++) {\n            int dx = x[i] - x[j], dy = y[i] - y[j];\n            if (dx * dx + dy * dy > l * l)\n                continue;\n            cnt++;\n            p[cnt] = cnt;\n            u[cnt] = i;\n            v[cnt] = j;\n            d[cnt] = sqrt(dx * dx + dy * dy);\n        }\n    sort(p + 1, p + cnt + 1, cmp);\n    for (int i = 1; i <= cnt; i++) {\n        int pu = u[p[i]], pv = v[p[i]];\n        if (getf(pu) == getf(pv))\n            continue;\n        t++;\n        ans += d[p[i]];\n        f[getf(pu)] = pv;\n    }\n    if (t == n - 1)\n        printf("%.2lf\\n", ans);\n    else\n        printf("Impossible\\n");\n    return 0;\n}',
      tags: ['图论', '最小生成树', '并查集'],
    },
    {
      id: 27,
      type: 'programming',
      title: '堆石子',
      score: 25,
      description: `有 m 堆石子，编号为 1, 2, …, m，其石子数量分别记为 a₁, a₂, …, aₘ。

现在要求第 1 堆石子恰有 n 个（即 a₁ = n），并且此后每堆石子的数量严格小于前一堆，即 a_i < a_{i-1}（2 ≤ i ≤ m）。此外，每堆至少需要有一个石子，即 a_i ≥ 1（1 ≤ i ≤ m）。

在总石子数量不设限制的情况下，给定 m ≥ 2, n ≥ 1，有多少个满足要求的石子堆放方案？

两个方案不同，当且仅当，两个方案中至少有一堆石子数量不同。

如果不存在满足要求的方案，输出 0。由于方案数可能很大，请输出方案数对 10⁹ + 7 取模后的结果。

## 数据范围

| 数据点编号 | 数据范围 | 特殊性质 |
|---|---|---|
| 1, 2 | $2 \\leq m \\leq 100$，$1 \\leq n \\leq 100$ | $0 \\leq n - m \\leq 5$ |
| 3, 4, 5 | $2 \\leq m \\leq 100$，$1 \\leq n \\leq 10^9$ | 无 |
| 6, 7, 8, 9, 10 | $2 \\leq m \\leq 10^5$，$1 \\leq n \\leq 10^9$ | 无 |`,
      inputDescription: `输入一行两个正整数 m 和 n。`,
      outputDescription: `输出一个整数，表示总方案数对 10⁹ + 7 取模后的结果。`,
      samples: [
        {
          input: `3 5`,
          output: `6`,
        },
      ],
      explanation: `**解析：**

要求 a₁ = n > a₂ > a₃ > … > aₘ ≥ 1，即从 {1, 2, …, n − 1} 中选出 m − 1 个互不相同的数作为 a₂ … aₘ——**选定集合后排列方式唯一**（严格递减）。

所以方案数就是组合数：

$$\\binom{n-1}{m-1}$$

当 n − 1 < m − 1（即 n < m）时无解，输出 0（此时组合数按 0 处理）。

**样例验证：** m = 3, n = 5 → C(4, 2) = **6** ✓，对应 (5,4,3)、(5,4,2)、(5,4,1)、(5,3,2)、(5,3,1)、(5,2,1)。

实现：n 高达 10⁹ 不能预处理阶乘，用**逐项计算组合数** ans = ∏(n−1−i)/(i+1)，除法用费马小定理求逆元（模 10⁹ + 7 为素数），配合快速幂。复杂度 O(m log MOD)（m ≤ 10⁵）。

**考点：** 组合计数、逆元、快速幂、数论
`,
      template: '#include <iostream>\nusing namespace std;\n\nconst int MOD = (int)1e9 + 7;\n\nint qpow(int base, int exp) {\n    // 在此编写代码（快速幂）\n    return 1;\n}\n\nint comb(int n, int m) {\n    // 在此编写代码（组合数取模）\n    return 0;\n}\n\nint main() {\n    int m, n;\n    cin >> m >> n;\n    cout << comb(n - 1, m - 1) << endl;\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\nconst int MOD = (int)1e9 + 7;\nint qpow(int base, int exp) {\n    if (!exp) return 1;\n    if (exp & 1) return (long long)base * qpow((long long)base * base % MOD, exp >> 1) % MOD;\n    return qpow((long long)base * base % MOD, exp >> 1);\n}\nint comb(int n, int m) {\n    if (m > n) return 0;\n    int ans = 1;\n    for (int i = 0; i < m; ++i) {\n        ans = (long long)ans * (n - i) % MOD;\n        ans = (long long)ans * qpow(i + 1, MOD - 2) % MOD;\n    }\n    return ans;\n}\nint main() {\n    int m, n;\n    cin >> m >> n;\n    cout << comb(n - 1, m - 1) << endl;\n    return 0;\n}',
      tags: ['组合计数', '数论', '快速幂'],
    },
  ],
};
