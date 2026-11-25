import { l8ProgrammingByPaper } from './programming.js';

// 编程题 1「树上旅行」按官方 PDF（2025 年 6 月 C++ 八级，第 8 页）补录官方样例 2：
// 原录入只有样例 1，缺少 8 个结点 / 3 次旅行的第二组样例。
const programmingQuestions = l8ProgrammingByPaper['2025-06-l8'].map((q) => {
    if (q.id !== 26) return q;
    return {
        ...q,
        samples: [
            {
                input: '5 4\n1 1 2 2\n3 3\n1 -1 -1\n2 5\n1 -1 1 -1 1\n5 8\n1 1 1 -1 -1 -1 -1 -1\n5 3\n-1 -1 1',
                output: '4\n1\n4\n2',
            },
            {
                input: '8 3\n5 4 2 1 3 6 6\n8 1\n8\n8 2\n8 -8\n8 3\n8 -8 8',
                output: '1\n7\n1',
            },
        ],
    };
});

// 2025年6月 GESP C++ 八级真题
export const paperData = {
    id: '2025-06-l8',
    title: '2025年6月 GESP C++ 八级真题',
    level: 8,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    questions: [
        ...programmingQuestions,
        {
            id: 1,
            type: "single",
            question: `一间的机房要安排 6 名同学进行上机考试，座位共 2 行 3 列。考虑到在座位上很容易看到同一行的左右两侧的 屏幕，安排中间一列的同学做 A 卷，左右两列的同学做 B 卷。请问共有多少种排座位的方案？（ ）。`,
            options: [
                "720",
                "90",
                "48",
                "15",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (720)**

**解析：** 6 名同学排进 2 行 3 列 = 6 个座位。题面规定"中间一列做 A 卷、左右两列做 B 卷"是按**座位位置**定的规则，而不是对学生做限制；任意把 6 个不同学生放入 6 个座位都自动满足"中间列 = A、两侧列 = B"。所以就是 6 个人的全排列：

6! = 6×5×4×3×2×1 = 720。

- A 720 ✅
- B 90、C 48、D 15 均不对。

**考点**：排列组合（全排列）、区分母题约束的是"座位"而非"学生"。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 2,
            type: "single",
            question: `又到了毕业季，学长学姐们都在开心地拍毕业照。现在有 3 位学长、 3 位学姐希望排成一排拍照，要求男生不 相邻、女生不相邻。请问共有多少种拍照方案？（ ）。`,
            options: [
                "720",
                "72",
                "36",
                "2",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（72）**

**核心解析：**

本题考查排列组合中的交错排列（特殊位置与元素的不相邻问题）。

题目共有 3 位男生（学长）和 3 位女生（学姐），共 6 人排成一排，要求“男生互不相邻，且女生互不相邻”。

我们可以通过“先定骨架、再定具体人”的思路分步求解：

1. **确定性别排布模式（分类计数原理）：**
   因为男女各有 3 人，总共 6 个连续位置。要使男生互不相邻且女生互不相邻，性别的排布方式只能是严格男女交替。满足条件的性别模式仅有以下 2 种：
   - 模式一：男 - 女 - 男 - 女 - 男 - 女（男生在第 1、3、5 位，女生在第 2、4、6 位）
   - 模式二：女 - 男 - 女 - 男 - 女 - 男（女生在第 1、3、5 位，男生在第 2、4、6 位）

2. **计算具体人员站位方案（分步乘法原理）：**
   对于任意一种固定下来的性别骨架：
   - 3 位男生站入对应的 3 个男生位置，方案数为全排列 \`A(3, 3) = 3! = 3 * 2 * 1 = 6\` 种；
   - 3 位女生站入对应的 3 个女生位置，方案数同样为全排列 \`A(3, 3) = 3! = 3 * 2 * 1 = 6\` 种；
   - 根据乘法原理，该模式下具体站位方案数为 \`6 * 6 = 36\` 种。

3. **合并计算总方案数：**
   两种模式各 36 种且不重复，合计 \`36 + 36 = 72\`（即 \`2 * 3! * 3! = 72\`）。

---

**选项逐项分析：**
- **A 720**：❌ 计算的是 6 个人的无限制全排列 \`6! = 6 * 5 * 4 * 3 * 2 * 1 = 720\`，完全没有考虑“男女均互不相邻”的题干约束。
- **B 72**：✅ 计算正确。先确定以男开头或以女开头 2 种交替模式，再分别乘上男生与女生的全排列，即 \`2 * 3! * 3! = 72\`。
- **C 36**：❌ 只计算了单一交替模式（如只算了“男女男女男女”为 \`3! * 3! = 36\`），漏掉了以女生开头的“女男女男女男”这一种对称情况。
- **D 2**：❌ 仅数出了“男女男女男女”和“女男女男女男”这 2 种性别抽象骨架，完全忽略了每个具体的学长、学姐之间是有身份差异的，遗漏了人与人之间的全排列。

---

**易错提醒：**
- **遗漏首位对称性**：在人数相同（男 3 女 3）交替站位时，极易只考虑男前女后，漏掉女前男后，从而误选 C（36）。
- **混淆“无约束排列”与“限制排列”**：直接用总人数算 \`6!\` 会把大量男生相邻、女生相邻的非法排列混入，从而误选 A（720）。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 3,
            type: "single",
            question: `下列关于 C++ 类和对象的说法，错误的是（ ）。`,
            options: [
                "通过语句const int x = 5; 定义了一个对象x 。",
                "通过语句std::string t = \"12345\"; 定义了一个对象t 。",
                "通过语句void (*fp)() = NULL; 定义了一个对象fp 。",
                "通过语句class MyClass; 定义了一个类MyClass 。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：不正确的是 D（语句只是前向声明而非定义类）**

**核心解析：**
本题考查 C++ 中**对象（Object）的标准定义**以及**类的“声明”与“定义”**的区别。

1. **对象**：C++ 里凡是占有存储、带有类型的实体都是对象，不限于类的实例。\`int\` 变量和指针也是对象。
2. **声明与定义**：\`class MyClass;\` 没有类体，大小和成员都未知，只是前向声明。定义必须写成 \`class MyClass { /* 成员 */ };\`。

---

**选项逐项分析：**
- **A 通过语句 \`const int x = 5;\` 定义了一个对象 \`x\`**：✅ 说法正确。\`x\` 是一个基本类型为 \`const int\` 的具名实体，占用具体的内存空间并具有明确类型，在 C++ 标准中属于合法对象。故本项说法正确，不符合题意。
- **B 通过语句 \`std::string t = "12345";\` 定义了一个对象 \`t\`**：✅ 说法正确。\`std::string\` 是标准库提供的类模板具现化类型，\`t\` 是该类实例化的具名对象，内部维护字符串缓冲及状态。故本项说法正确，不符合题意。
- **C 通过语句 \`void (*fp)() = NULL;\` 定义了一个对象 \`fp\`**：✅ 说法正确。\`fp\` 是指向无参无返回值函数的指针变量。指针本身也是占据内存空间（在常见 64 位平台中占 8 字节）并具有特定类型的实体，因此指针变量本身同样属于对象。故本项说法正确，不符合题意。
- **D 通过语句 \`class MyClass;\` 定义了一个类 \`MyClass\`**：❌ 说法错误。\`class MyClass;\` 仅声明了类标识符，没有类体 \`{ ... };\`，未指定任何成员，编译器尚不知道其内存布局大小，属于声明而非定义。题干说“定义了一个类”是错误的，符合题意。

---

**易错提醒：**
- **勿将 OOP 概念与 C++ 底层对象混为一谈**：许多初学者受其他高级语言影响，误认为只有 \`class\` 实例出来的才叫对象。在 C++ 语法规范中，无论是 \`int a;\` 还是 \`int* p;\`，它们在底层都开辟了内存，均为合法的对象。
- **牢记前向声明的局限性**：前向声明 \`class MyClass;\` 之后，在给出具体类定义前，不能定义该类的实体对象（如 \`MyClass obj;\` 会报错），也不能访问其内部成员，只能用于声明指向该类的指针或引用（如 \`MyClass* ptr;\`）。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 4,
            type: "single",
            question: `关于生成树的说法，错误的是（ ）。`,
            options: ["一个无向连通图，一定有生成树。","n 个顶点的无向图，其生成树要么不存在，要么一定包含 n-1 条边。","n 个顶点、n-1 条边的无向图，不可能有多颗生成树。","n 个顶点、n-1 条边的无向图，它本身就是自己的生成树。"],
            answer: 3,
            score: 2,
            explanation: "**答案：不正确的是 D（n 个顶点、n-1 条边的无向图不一定是生成树）**\n\n**核心解析：**\n无向图包含全部顶点的极小连通子图称为生成树。对于包含 `n` 个顶点的无向图，其生成树必须同时满足两个条件：\n1. **连通性**：必须连通原图中的全部 `n` 个顶点；\n2. **无环性**：任意两点间有且仅有一条简单路径，恰好包含 `n-1` 条边。\n\n无向图存在生成树的充要条件是**图本身连通**：连通时破环即可得到生成树；不连通时任何子图都无法连通全部顶点。而“`n` 个顶点、`n-1` 条边”只有在连通的前提下才等价于树，不连通时可能局部含环并带孤立点，因此 D 的结论不成立。\n\n**选项逐项分析：**\n- **A 一个无向连通图，一定有生成树**：✅ 正确。若本身无环即为自身；若含回路则反复删去环上的边，直到无环，得到的极小连通子图就是生成树。\n- **B n 个顶点的无向图，其生成树要么不存在，要么一定包含 n-1 条边**：✅ 正确。生成树覆盖全部 `n` 个顶点且无环，由树的性质边数恒为 `n-1`。\n- **C n 个顶点、n-1 条边的无向图，不可能有多颗生成树**：✅ 正确。连通时它无环、就是唯一的树，生成树只有自身一棵；不连通时生成树为 0 棵。两种情形都不会多于一棵。\n- **D n 个顶点、n-1 条边的无向图，它本身就是自己的生成树**：❌ 错误。例如 4 个顶点中 1、2、3 构成三角形、4 孤立，边数为 3 = n-1，但既有环又不连通，不是生成树。故本题选 D。\n\n**易错提醒：**\n- 判定树必须同时满足**连通**与**无环（或边数 = 顶点数 - 1）**，只数边数会误判。",
            tags: [
                "最小生成树",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 5,
            type: "single",
            question: `一对夫妻生男生女的概率相同。这对夫妻希望儿女双全。请问这对夫妻生下两个孩子时，实现儿女双全的概 率是多少？（ ）。`,
            options: ["2/3","1/3","1/2","1/4"],
            answer: 2,
            score: 2,
            explanation: "**答案：C（1/2）**\n\n**解析：**\n每次生育生男生女概率各 1/2 且相互独立，生两个孩子的样本空间为 {男男, 男女, 女男, 女女}，四种结果各占 1/4。“儿女双全”即一男一女，对应 {男女, 女男} 两种，概率 = 2/4 = 1/2。\n\n**选项逐项分析：**\n- **A 2/3**：错误。样本空间只有 4 个等可能结果，一男一女占 2 个，比例不可能大于 1/2。\n- **B 1/3**：错误。1/3 相当于把 {男女, 女男, 女女} 之类的三分类当作等可能，与等概率独立生育的前提不符。\n- **C 1/2**：正确。{男女, 女男} 共 2 个结果，2/4 = 1/2。\n- **D 1/4**：错误。1/4 只对应一种固定顺序（如“先男后女”），漏掉了另一种顺序。\n\n**易错提醒：**\n- 一男一女包含“先男后女”和“先女后男”两种互斥顺序，漏掉其一就会误选 D。",
            tags: [
                "概率与期望",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 6,
            type: "single",
            question: "已定义变量 double a, b;，下列哪个表达式可以用来判断一元二次方程 x² + ax + b = 0 是否有实根？（ ）。",
            options: [
                "4 * b-a * a < 0",
                "4 * b <= a * a",
                "a * a-4 * b",
                "b * 4-a * a",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（4 * b <= a * a）**

**核心解析：**
根据选项中变量 \`a\` 与 \`b\` 的组合形式可知，本题考查的是二次项系数为 1 的一元二次方程 \`x*x + a*x + b = 0\`。
对于一元二次方程，实数根的存在情况由根的判别式决定：
- 判别式为 \`delta = a*a - 4*b\`。
- 当 \`delta > 0\` 时，方程有两个不相等的实数根；
- 当 \`delta == 0\` 时，方程有两个相等的实数根（重根，也是实数根）；
- 当 \`delta < 0\` 时，方程没有实数根。

题干要求判断方程“是否有实根”，即只要存在实数根即可，因此判别式必须满足大于等于 0，即 \`a*a - 4*b >= 0\`。
对该不等式进行移项变形，可得等价表达式：\`4*b <= a*a\`。
因此，选项 B 的关系表达式 \`4 * b <= a * a\` 可以准确作为判断一元二次方程是否有实根的条件。

**选项逐项分析：**
- **A \`4 * b - a * a < 0\`**：❌ 移项变形后为 \`a*a - 4*b > 0\`。该式只覆盖了判别式严格大于 0 的情况（即两个不相等的实数根），漏掉了判别式等于 0 时有两个相等实根的情况。因为重根同样是实数根，所以该表达式判断不完整。
- **B \`4 * b <= a * a\`**：✅ 移项变形后等价于 \`a*a - 4*b >= 0\`。它完整包含了判别式大于 0 与等于 0 的所有情况，能够准确判断方程是否存在实数根。
- **C \`a * a - 4 * b\`**：❌ 这是一个纯算术表达式，计算结果为 \`double\` 类型的数值，而非用于逻辑判断的关系表达式。若在 \`if\` 等条件语句中直接使用，C++ 会将其隐式转换为布尔值（非零为真、零为假），导致判别式等于 0 时被误判为假（遗漏重根），判别式小于 0 时反而为真（误判无实根为有实根），逻辑完全错误。
- **D \`b * 4 - a * a\`**：❌ 与 C 选项类似，该式只是算术表达式而非布尔条件，不能用来作为判断是否有实根的逻辑条件。

**易错提醒：**
- **切勿漏掉等于 0 的重根情况**：中小学数学与程序设计中常考“有实根”与“有两个不相等实根”的区别。只要题干说明是“有实根”，就必须包含两个相等实根的情况，对应的关系运算符必须带有等号（即 \`>=\` 或 \`<=\`）。
- **区分算术表达式与关系表达式**：在条件判断语句中，必须使用关系运算符（如 \`<=\`, \`>=\`, \`==\`）产生确定的真假值。直接使用算术计算式不仅表意不清，还会触发非零即真的隐式类型转换，造成严重的逻辑 Bug。`,
            tags: [
                "C++综合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["question","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 7,
            type: "single",
            question: "n 个结点的二叉树，执行广度优先搜索的平均时间复杂度是（ ）。",
            options: ["O(log n)","O(n log n)","O(n)","O(2^n)"],
            answer: 2,
            score: 2,
            explanation: "**答案：C（O(n)）**\n\n**解析：**\n二叉树广度优先搜索（层序遍历）借助队列进行：每个结点入队、出队各一次，访问每个结点时枚举其至多 2 个孩子，总操作次数与结点数 n 成正比，时间复杂度为 O(n)。\n\n**选项逐项分析：**\n- **A O(log n)**：错误。BFS 必须访问全部 n 个结点，不可能只与树高同阶。\n- **B O(n log n)**：错误。遍历中没有排序或分治带来的对数因子，每个结点只处理常数次。\n- **C O(n)**：正确。n 次入队 + n 次出队 + 常数次孩子枚举，合计 O(n)。\n- **D O(2^n)**：错误。该量级出现在枚举全部子集或朴素递归求斐波那契等场景，与逐点遍历无关。\n\n**易错提醒：**\n- 树上的 BFS/DFS 只要每个结点只访问一次，复杂度就是 O(n)；O(n log n) 常来自排序、堆操作或倍增，不是遍历本身。",
            tags: [
                "树与二叉树",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 8,
            type: "single",
            question: `以下关于动态规划的说法中，错误的是（ ）。`,
            options: [
                "动态规划方法通常能够列出递推公式。",
                "动态规划方法的时间复杂度通常为状态的个数。",
                "动态规划方法有递推和递归两种实现形式。",
                "对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：不正确的是 B（动态规划的时间复杂度等于状态个数乘以单次转移代价）**

**核心解析：**
评估动态规划算法的时间复杂度时，不能只统计状态的总个数，而必须综合考虑**状态总数**与**单个状态的转移代价**。
其通用计算公式为：
\`总时间复杂度 = 状态总数 × 计算单个状态所需的转移代价\`
只有在每个状态转移仅需 \`O(1)\` 常数时间（例如斐波那契数列递推、经典的0-1背包问题）时，总时间复杂度才与状态数同阶。如果每个状态的计算需要枚举多个子状态（如朴素版最长上升子序列 LIS 单次转移需 \`O(n)\`，区间 DP 单次转移需遍历断点 \`O(n)\`），总复杂度就会远高于状态数。因此，将时间复杂度笼统表述为“通常为状态的个数”忽略了状态转移过程中的决策开销，属于错误说法。

**选项逐项分析：**
- **A 动态规划方法通常能够列出递推公式**：陈述正确。动态规划的核心就在于设计状态转移方程，其本质就是状态与状态之间的递推关系式，通过已知子问题的解递推得出更大规模问题的解。
- **B 动态规划方法的时间复杂度通常为状态的个数**：陈述错误。动态规划的时间复杂度由“状态总数”和“单状态转移代价”共同决定。若单次转移需要循环枚举，转移代价并非 \`O(1)\`，总复杂度必然大于状态个数。题目要求选出错误的一项，故选 B。
- **C 动态规划方法有递推和递归两种实现形式**：陈述正确。动态规划有两种经典编码方式：自底向上的循环递推（迭代法），以及自顶向下配合备忘录数组的递归（记忆化搜索）。
- **D 对很多问题，递推实现和递归实现动态规划方法的时间复杂度相当**：陈述正确。记忆化搜索通过记录已解决子问题的答案，保证了每个子状态同样只被严格计算一次，单次转移工作量也相同。因此在渐进时间复杂度（大 O 复杂度）上，二者通常处于同一数量级，计算效率相当。

**易错提醒：**
- 切勿把“状态空间的大小”直接等同于“运行时间复杂度”。分析 DP 复杂度时要养成两步走的习惯：先数状态维度（几重循环记录状态），再看转移部分是否有额外的循环决策开销，两者相乘才是真正的总复杂度。

**知识延伸：**
递推与记忆化搜索的差异主要在工程实现与常数细节：
- **递推实现**：按拓扑序计算，无函数递归压栈开销，运行常数更小，且便于通过“滚动数组”优化空间复杂度。
- **记忆化搜索**：只计算与最终目标相关的“可达状态”，能天然跳过无用分支，逻辑上更贴合深搜（DFS）思维。`,
            tags: [
                "动态规划",
            ],
        },
        {
            id: 9,
            type: "single",
            question: "下面的 sum_digit 函数试图求出从 1 到 n（包含 1 和 n）的数中，包含数字 d 的个数。该函数的时间复杂度为（ ）。\n\n```cpp\n#include <string>\nint count_digit(int n, char d) {\n    int cnt = 0;\n    std::string s = std::to_string(n);\n    for (int i = 0; i < s.length(); i++)\n        if (s[i] == d)\n            cnt++;\n    return cnt;\n}\nint sum_digit(int n, char d) {\n    int sum = 0;\n    for (int i = 1; i <= n; i++)\n        sum += count_digit(i, d);\n    return sum;\n}\n```",
            options: ["O(n log n)","O(n)","O(log n)","O(n²)"],
            answer: 0,
            score: 2,
            explanation: "**答案：A**\n\n**解析：**\n`count_digit(i, d)` 把 i 转成字符串后逐字符扫描，耗时 O(位数) = O(log₁₀ i)；`sum_digit` 对 i = 1…n 各调用一次，总时间为 Σ_{i=1}^{n} O(log i) = O(n log n)。\n\n- **A O(n log n)**：正确。外层 n 次、内层平均 O(log i)，累计 O(n log n)。\n- **B O(n)**：错误。忽略了对每个数做字符串扫描的 O(log n) 代价。\n- **C O(log n)**：错误。单次数位统计是 O(log n)，但外层循环 n 次，整体不是 O(log n)。\n- **D O(n²)**：错误。没有平方级嵌套，不是 O(n²)。",
            tags: [
                "C++综合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["options","question","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 10,
            type: "single",
            question: `下面程序的输出为（ ）。

\`\`\`cpp
#include <iostream>
const int N = 10;
int ch[N][N][N];

int main() {
    for (int x = 0; x < N; x++)
        for (int y = 0; y < N; y++)
            for (int z = 0; z < N; z++)
                if (x == 0 && y == 0 && z == 0)
                    ch[x][y][z] = 1;
                else {
                    if (x > 0)
                        ch[x][y][z] += ch[x - 1][y][z];
                    if (y > 0)
                        ch[x][y][z] += ch[x][y - 1][z];
                    if (z > 0)
                        ch[x][y][z] += ch[x][y][z - 1];
                }
    std::cout << ch[1][2][3] << std::endl;
    return 0;
}
\`\`\`
`,
            options: [
                "60",
                "20",
                "15",
                "10",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

**解析：**
ch[x][y][z] 是三维格路计数 DP：从 (0,0,0) 出发，每步沿 x、y、z 方向前进 1，走到 (x,y,z) 的路径数满足 ch[x][y][z] = ch[x-1][y][z] + ch[x][y-1][z] + ch[x][y][z-1]，边界 ch[0][0][0] = 1。ch[1][2][3] 即从 (0,0,0) 到 (1,2,3) 的路径数，等于多重排列数 6!/(1!·2!·3!) = 60。

- **A 60**：正确。6!/(1!2!3!) = 720/12 = 60。
- **B 20**：错误。这是 C(6,3) = 20，只算了某一维的分布，漏乘其余维的排列。
- **C 15**：错误。这是 C(6,2) = 15，对应二维而非三维路径计数。
- **D 10**：错误。这是 C(5,2) = 10，与本题路径规模不符。

**考点**：三维网格 DP 计数、多项式系数（多重集排列）。`,
            tags: [
                "C++综合",
            ],
        },
        {
            id: 11,
            type: "single",
            question: "下面 count_triple 函数的时间复杂度为（ ）。\n\n```cpp\nint gcd(int a, int b) {\n    if (a == 0)\n        return b;\n    return gcd(b % a, a);\n}\nint count_triple(int n) {\n    int cnt = 0;\n    for (int v = 1; v * v * 4 <= n; v++)\n        for (int u = v + 1; u * (u + v) * 2 <= n; u += 2)\n            if (gcd(u, v) == 1) {\n                int a = u * u - v * v;\n                int b = u * v * 2;\n                int c = u * u + v * v;\n                cnt += n / (a + b + c);\n            }\n    return cnt;\n}\n```",
            options: ["O(n)","O(n²)","O(n log n)","O(n² log n)"],
            answer: 2,
            score: 2,
            explanation: "**答案：C（O(n log n)）**\n\n**解析：**\n函数按欧几里得公式 (u²-v², 2uv, u²+v²) 枚举本原勾股三元组。\n\n1. **枚举次数**：外层 `v` 满足 `4v² ≤ n`，即 `v ≤ √n/2`；内层 `u` 从 `v+1` 起、步长 2，满足 `2u(u+v) ≤ n`，故 `u = O(√n)`。两层合起来的总枚举次数为 Σ_{v≤√n} O(√n - v) = O(n)。\n2. **单次代价**：每组 (u,v) 调用一次 `gcd(u, v)`，Euclid 算法为 O(log n)。\n3. **合计**：O(n) 次枚举 × O(log n) = O(n log n)。\n\n**选项逐项分析：**\n- **A O(n)**：错误。忽略了每次枚举中 gcd 的对数代价，也忽略了循环按 u ≤ √n 截断下界并非严格线性枚举。\n- **B O(n²)**：错误。两层循环上界都受 √n 限制，乘积为 O(n)，远达不到平方级。\n- **C O(n log n)**：正确。枚举 O(n) 次，每次 gcd 为 O(log n)。\n- **D O(n² log n)**：错误。需要两层循环都达到 n 量级，而本题上界受 `4v² ≤ n`、`2u(u+v) ≤ n` 双重限制。\n\n**易错提醒：**\n- 看到双重循环不要直接判 O(n²)，必须先算两层循环变量各自的上界：这里外层到 √n、内层到 √n，总数才是 O(n)。",
            tags: [
                "数论",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 3,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 12,
            type: "single",
            question: "下面 quick_sort 函数试图实现快速排序算法，两处横线处分别应该填入的是（ ）。\n\n```cpp\nvoid swap(int & a, int & b) {\n    int temp = a; a = b; b = temp;\n}\nint partition(int a[], int l, int r) {\n    int pivot = a[l], i = l + 1, j = r;\n    while (i <= j) {\n        while (i <= j && a[j] >= pivot)\n            j--;\n        while (i <= j && a[i] <= pivot)\n            i++;\n        if (i < j)\n            swap(a[i], a[j]);\n    }\n    ________;         // 在此处填入选项\n    return ________; // 在此处填入选项\n}\nvoid quick_sort(int a[], int l, int r) {\n    if (l < r) {\n        int pivot = partition(a, l, r);\n        quick_sort(a, l, pivot - 1);\n        quick_sort(a, pivot + 1, r);\n    }\n}\n```",
            options: [
                "swap(a[l], a[i]); return i;",
                "swap(a[l], a[j]); return i;",
                "swap(a[l], a[i]); return j;",
                "swap(a[l], a[j]); return j;",
],
            answer: 3,
            score: 2,
            explanation: "**答案：D**\n\n**解析：**\n该 partition 以 a[l] 为枢轴，循环结束后 j 指向最后一个不大于枢轴的元素位置，应将枢轴归位到 j 处并以其为分界返回。因此第一空执行 `swap(a[l], a[j])`，第二空返回 `j`。\n\n- **A swap(a[l], a[i]); return i;**：错误。i 已越过分界点，用 i 交换并作为返回位置会把枢轴放到错误一侧。\n- **B swap(a[l], a[j]); return i;**：错误。交换对象虽是 a[j]，但返回 i 会把非枢轴位置当作分界；枢轴实际在 j，i 通常为 j+1，左递归区间仍包含枢轴甚至与原区间相同，会重复划分乃至无限递归。\n- **C swap(a[l], a[i]); return j;**：错误。交换对象应为 a[j] 而非 a[i]，否则枢轴没有归位到分界点。\n- **D swap(a[l], a[j]); return j;**：正确。将枢轴 a[l] 与 a[j] 交换使枢轴就位，并返回枢轴下标 j。",
            tags: [
                "排列组合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 4,
      "reviewedFields": ["question","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 13,
            type: "single",
            question: "下面 LIS 函数试图求出最长上升子序列的长度，横线处应该填入的是（ ）。\n\n```cpp\nint max(int a, int b) {\n    return (a > b) ? a : b;\n}\nint LIS(vector<int> & nums) {\n    int n = nums.size();\n    if (n == 0)\n        return 0;\n    vector<int> dp(n, 1);\n    int maxLen = 1;\n    for (int i = 1; i < n; i++) {\n        for (int j = 0; j < i; j++)\n            if (nums[j] < nums[i])\n                ________; // 在此处填入选项\n        maxLen = max(maxLen, dp[i]);\n    }\n    return maxLen;\n}\n```",
            options: ["dp[j] = max(dp[j] + 1, dp[i]);","dp[j] = max(dp[j], dp[i] + 1);","dp[i] = max(dp[i] + 1, dp[j]);","dp[i] = max(dp[i], dp[j] + 1);"],
            answer: 3,
            score: 2,
            explanation: "**答案：D**\n\n**解析：**\nLIS 的 DP 解法是 `dp[i]` 表示以第 i 个元素结尾的最长上升子序列长度，初始为 1；对 `j < i` 且 `nums[j] < nums[i]` 时，用 `dp[j]+1` 更新 `dp[i]`。因此状态转移应为 `dp[i] = max(dp[i], dp[j] + 1)`。\n\n- **A dp[j] = max(dp[j] + 1, dp[i]);**：错误。更新对象写成了 `dp[j]`，应为 `dp[i]`；候选值也写反了，不应用 `dp[i]` 去刷新 `dp[j]`。\n- **B dp[j] = max(dp[j], dp[i] + 1);**：错误。更新对象应为 `dp[i]`，候选值应来自 `dp[j] + 1`；写成 `dp[j] = max(dp[j], dp[i] + 1)` 无法把第 j 个元素接到第 i 个元素之前。\n- **C dp[i] = max(dp[i] + 1, dp[j]);**：错误。候选值写成了 `dp[i] + 1`（自增）与 `dp[j]`，没有使用 `dp[j] + 1`，会丢失“接在 j 之后”的转移。\n- **D dp[i] = max(dp[i], dp[j] + 1);**：正确。以 `dp[j] + 1` 刷新 `dp[i]` 的最大值。",
            tags: [
                "字符串",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 4,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 14,
            type: "single",
            question: "下面 LIS 函数试图求出最长上升子序列的长度，其时间复杂度为（ ）。\n\n```cpp\n#define INT_MIN (-1000)\nint LIS(vector<int> & nums) {\n    int n = nums.size();\n    vector<int> tail;\n    tail.push_back(INT_MIN);\n    for (int i = 0; i < n; i++) {\n        int x = nums[i], l = 0, r = tail.size();\n        while (l < r) {\n            int mid = (l + r) / 2;\n            if (tail[mid] < x)\n                l = mid + 1;\n            else\n                r = mid;\n        }\n        if (r == tail.size())\n            tail.push_back(x);\n        else\n            tail[r] = x;\n    }\n    return tail.size() - 1;\n}\n```",
            options: ["O(log n)","O(n)","O(n log n)","O(n²)"],
            answer: 2,
            score: 2,
            explanation: "**答案：C（O(n log n)）**\n\n**解析：**\n本题代码用的是“贪心 + 二分”的 LIS 写法，而不是双重循环的基础 DP：\n\n1. `tail` 中保存当前长度为 i+1 的上升子序列的最小末尾值，初始放入 `INT_MIN`（保证任何元素都能接在其后）。\n2. 对每个 `nums[i] = x`，在 `tail` 上用二分查找（`while (l < r)`，`tail[mid] < x` 时 `l = mid + 1`，否则 `r = mid`）求出第一个不小于 x 的下标 r：\n   - 若 `r == tail.size()`，说明 x 比所有末尾都大，`push_back(x)`，LIS 长度加 1；\n   - 否则 `tail[r] = x`，用更小的末尾替换。\n3. 外层 n 次，每次二分 O(log n)，其余均摊 O(1)，总复杂度 O(n log n)，空间 O(n)；最后 `tail.size()-1` 即 LIS 长度（扣掉哨兵 INT_MIN）。\n\n**选项逐项分析：**\n- **A O(log n)**：错误。只算了一次二分，忽略了外层 n 次枚举。\n- **B O(n)**：错误。只有在本已有序、每次替换位置固定在末尾时才退化为线性，一般情况需二分。\n- **C O(n log n)**：正确。n 个元素各做一次二分。\n- **D O(n²)**：错误。这是双重循环基础 DP 的复杂度，不是本题 tail + 二分的实现。\n\n**易错提醒：**\n- 同名的 `LIS` 有两套常见实现：`dp[i] = max(dp[i], dp[j]+1)` 的 O(n²) 版，和 `tail` 二分的 O(n log n) 版；判断复杂度前必须先看内层是“枚举 j”还是“二分”。",
            tags: [
                "字符串",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 5,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 15,
            type: "single",
            question: `下面的程序使用邻接矩阵表达的带权无向图，则从顶点 0 到顶点 3 的最短距离为（ ）。

\`\`\`cpp
int weight[4][4] = {
    { 0, 5, 8, 10},
    { 5, 0, 1,  7},
    { 8, 1, 0,  3},
    {10, 7, 3,  0}};
\`\`\``,
            options: [
                "9",
                "10",
                "11",
                "12",
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：A（9）**

**解析：** 邻接矩阵给出的直接边权为：

- \`0 -> 3 = 10\`
- \`0 -> 1 -> 3 = 5+7=12\`
- \`0 -> 2 -> 3 = 8+3=11\`
- \`0 -> 1 -> 2 -> 3 = 5+1+3=9\`

因此从顶点 0 到顶点 3 的最短距离是 9。

- B 的 10 是直接边 \`0 -> 3\`，但不是最短路径。
- C 的 11 是路径 \`0 -> 2 -> 3\` 的长度。
- D 的 12 是路径 \`0 -> 1 -> 3\` 的长度。

**易错点：** 邻接矩阵中的直接边不一定就是两点之间的最短路，需要比较经过其他顶点的路径。

**考点**：邻接矩阵、带权图最短路径。`,
            tags: [
                "最短路径",
            ],
        },
        {
            id: 16,
            type: "judge",
            question: `C++ 语言中，表达式9 | 12 的结果类型为int 、值为13 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：** 按位或 \`|\` 的操作数 9 和 12 都是 int，结果类型也是 int。二进制：9 = 1001₂，12 = 1100₂，\`9 | 12\` = 1101₂ = 8 + 4 + 1 = 13。陈述"结果类型为 int、值为 13"成立。

**考点**：C++ 位运算 \`|\`、整型结果与类型。`,
            tags: [
                "面向对象",
            ],
        },
        {
            id: 17,
            type: "judge",
            question: `C++ 语言中，访问数据发生下标越界时，总是会产生运行时错误，从而使程序异常退出。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：错误**\n\n**解析：** C++ 对原生数组 / 指针的下标越界**不做运行时检查**（属于未定义行为，UB）。越界访问可能恰好读到或写到别的内存、程序照常继续，也可能崩溃，但绝**不是“总是”**产生运行时错误并异常退出。只有标准容器（如 `vector::at`、`string::at`）在越界时才保证抛出 `std::out_of_range`，而题面是泛指“C++ 访问数据下标越界”。故陈述错误。\n\n**考点**：数组下标越界与未定义行为（UB）。",
            tags: [
                "异常处理",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 18,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第6页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",
            question: `对n个元素的数组进行归并排序，最差情况的时间复杂度为 O(n log n)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**解析：**
归并排序采用分治策略，递归树的每一层合并操作代价均为 O(n)，树高为 O(log n)，因此无论最好、最坏还是平均情况，时间复杂度都稳定为 O(n log n)。故“对 n 个元素数组归并排序的最坏情况时间复杂度为 O(n log n)”这一命题成立。`,
            tags: [
                "排列组合",
            ],
        },
        {
            id: 19,
            type: "judge",
            question: `5 个相同的红球和 4 个相同的蓝球排成一排，要求每个蓝球的两侧都必须至少有一个红球，则一共有 15 种排列 方案。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,            score: 2,
            explanation: "**答案：错误**\n\n**解析：** 5 个相同红球、4 个相同蓝球排成一排，问满足“每个蓝球的两侧都至少有一个红球”的方案数是否为 15。\n\n- **按“两侧相邻”理解**：每个蓝球左右紧邻都必须是红球，则任意两个蓝球不能相邻，且首尾不能是蓝球，排法只能是 `R B R B R B R B R`，仅 **1** 种。\n- **按“左右两侧区域”理解**：每个蓝球左侧、右侧区域都至少有一个红球，等价于序列以红球开头且以红球结尾。此时首位固定为 R、末位固定为 R，中间 7 个位置放 3 个红球与 4 个蓝球，方案数 C(7,3)=**35** 种。\n\n两种常见读法分别得到 1 与 35，均不等于 15，故原命题错误。（若只要求蓝球互不相邻而不限制首尾，才是 C(6,4)=15 种，但那会允许蓝球落在两端、有一侧没有红球，不满足题干要求。）\n\n**考点**：相同元素排列、插空法、相邻 / 两侧约束的准确理解。",
            tags: [
                "排列组合",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 20,
            type: "judge",
            question: `使用math.h 或cmath 头文件中的函数，表达式log(8) 的结果类型为double 、值约为3 。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,            score: 2,
            explanation: "**答案：错误**\n\n**解析：** `<cmath>` 中的 `log` 是**自然对数（以 e 为底）**，`log(8) = ln 8 ≈ 2.079`，并不等于 3（只有 `log2(8)` 才等于 3）。结果类型确为 `double`，但“值约为 3”错误，故整个陈述错误。\n\n**考点**：`log` / `log10` / `log2` 的区别、自然对数取值。",
            tags: [
                "面向对象",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 21,
            type: "judge",
            question: `C++ 是一种面向对象编程语言， C 则不是。继承是面向对象三大特性之一，因此，使用 C 语言无法实现继承。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,            score: 2,
            explanation: "**答案：错误**\n\n**解析：** 前半段“C++ 是面向对象语言、C 不是”成立，但结论“使用 C 语言无法实现继承”错误。C 虽无语言级继承语法，却可以用“结构体嵌套（把父结构体作为首成员）+ 函数指针表”手工模拟继承与多态，Linux 内核的 `container_of`/`file_operations`、GTK 的 GObject 都是成熟实例。“语言是否原生支持某特性”与“能否用该语言实现该机制”是两回事。故陈述错误。\n\n**考点**：OOP 特性（继承、多态）与语言实现方式的关系。",
            tags: [
                "面向对象",
            ],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 22,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第6页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",
            question: `n个顶点的无向完全图，有 n^(n-2) 棵生成树。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
在图论中，该结论被称为**凯莱公式（Cayley's formula）**：含有 \`n\` 个不同标号顶点的无向完全图 \`K_n\`，其生成树的棵数恰好为 n 的 (n-2) 次方（对 \`n >= 1\` 均成立）。

我们可以用小规模数据进行直观验证：
- 当 \`n = 2\` 时：2 个顶点之间有 1 条边，生成树只有 1 棵，公式计算为 2 的 0 次方，等于 1；
- 当 \`n = 3\` 时：3 个顶点构成的三角形有 3 条边，任取 2 条边都能构成一棵生成树，共有 3 棵，公式计算为 3 的 1 次方，等于 3；
- 当 \`n = 4\` 时：4 个顶点的无向完全图共有 6 条边，其中生成树共有 16 棵，公式计算为 4 的 2 次方，等于 16。
因此题干表述完全正确。

**选项逐项分析：**
- **A 正确**：✅ 题干陈述与凯莱公式完全一致，命题正确。
- **B 错误**：❌ 题干结论在数学和图论中已得到严格证明，判为错误不成立。

**易错提醒：**
- 不要把“生成树的边数”与“生成树的种数”搞混：\`n\` 个顶点的任意一棵生成树包含且仅包含 \`n - 1\` 条边；而从完全图中挑选出这些边构成不同生成树的方案总数是 n 的 (n-2) 次方棵。
- 该公式适用于**有标号顶点**（即顶点之间互不相同）的图。

**知识延伸：**
凯莱公式经典的构造性证明方法是 **Prüfer 序列（普吕弗序列）**。任何一棵包含 \`n\` 个标号顶点的树，都可以唯一对应到一个长度为 \`n - 2\`、每个元素取值范围在 \`1\` 到 \`n\` 之间的整数序列；反之，每个这样的序列也唯一对应一棵生成树。因为每个位置有 \`n\` 种选择，共有 \`n - 2\` 个位置，所以总生成树数量为 n 的 (n-2) 次方。`,
            tags: [
                "最小生成树",
            ],
        },
        {
            id: 23,
            type: "judge",
            question: `已知三个double 类型的变量a 、b 和theta 分别表示一个三角形的两条边长及二者的夹角（弧度），则三 角形的周长可以通过表达式sqrt(a * a+b * b-2 * a * b * cos(theta)) 求得。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**

题干给出的表达式是**余弦定理**，求出的是第三条边 $c$：

$c=\\sqrt{a^2+b^2-2ab\\cos\\theta}$

三角形周长应是三边之和 $a+b+c$，即

$a+b+\\sqrt{a^2+b^2-2ab\\cos\\theta}$

题干把"第三边长"当成了"周长"，少加了 $a+b$，命题错误。

**易错提醒：** 余弦定理求的是对边长度；周长必须把已知的两条边也加上。

**考点：** 余弦定理、C++ 数学函数 \`sqrt\` 与 \`cos\` 的使用。`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: [
                "面向对象",
            ],
        },
        {
            id: 24,
            verificationNote: `AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf 第6页文本及渲染图核对。`,
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6],
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            sourceVerified: true,
            type: "judge",
            question: `有V个顶点、E条边的图的深度优先搜索遍历时间复杂度为 O(V+E)。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
在图采用邻接表存储的标准实现下，深度优先搜索（DFS）遍历图时，每个顶点仅被访问一次，每条边最多被扫描常数次，因此总时间复杂度为 \`O(V + E)\`。题干命题正确。

**核心解析：**
DFS 的遍历过程主要由两部分耗时构成：
1. **顶点访问**：借助 \`visited\` 数组标记访问状态，整轮遍历中每个顶点只会被递归调用（或入栈）一次，所有顶点的访问与状态标记累计耗时为 \`O(V)\`。
2. **出边扫描**：每访问一个顶点，程序都会遍历该顶点的所有邻接边。对所有顶点的出边总数求和：在有向图中总共扫描 \`E\` 次，在无向图中每条边正反两个方向各扫描一次（共 \`2E\` 次）。所有边的扫描累计耗时为 \`O(E)\`。

将顶点与边的遍历开销相加，基于邻接表的深度优先搜索总时间复杂度为 \`O(V + E)\`。

**选项逐项分析：**
- **A 正确**：✅ 题干对基于邻接表的图深度优先搜索遍历时间复杂度描述准确无误。
- **B 错误**：❌ 题干结论完全符合标准图算法复杂度定义，判定为错误不成立。

**易错提醒：**
- **存储方式的影响**：若图采用**邻接矩阵**存储，寻找每个顶点的出边都需要扫描整行 \`V\` 个单元格，此时 DFS 的时间复杂度为 \`O(V*V)\`。常规考题若未特殊指明，图遍历的标准复杂度均默认基于邻接表。
- **加号不能随意省去**：在稀疏图（如边数很小的森林、孤立点集）中，\`E < V\`，扫描所有顶点所需的 \`O(V)\` 无法被边的数量吸收，因此复杂度必须写作 \`O(V + E)\`，不能简单写成 \`O(E)\`。

**知识延伸：**
广度优先搜索（BFS）使用队列进行层次遍历，在邻接表存储下，同样是每个顶点进出队列一次、每条边被扫描常数次，其时间复杂度也为 \`O(V + E)\`。`,
            tags: [
                "图的遍历",
            ],
        },
        {
            id: 25,
            verificationNote: "核对原卷第 6 页答案表和第 6 页题面。答案表第 10 格为 √。先选班长与学习委员各有 28、27 种，再选其余两职务各有 30、29 种，共 657720，等于 P(30,4)。",
            sourceUrl: `https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B8%E7%BA%A7.pdf`,
            sourcePage: 6,
            sourcePages: [6],
            reviewedAt: "2026-11-25",
            reviewedBy: "AI-Codex",
            sourceVerified: true,
            type: "judge",
            question: `从32名学生中选出4人分别担任班长、副班长、学习委员和组织委员，老师要求班级综合成绩排名最后的4名学生不得参选班长或学习委员（仍可以参选副班长和组织委员），则共有 P(30,4) 种不同的选法。`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: "**答案：正确**\n\n先选受限制的两个职务。班长有 28 种选法，学习委员从剩下符合条件的人中选，有 27 种。其余两个职务不受成绩限制，依次有 30、29 种选法。乘积为 $28\\times27\\times30\\times29=657720=P(30,4)$。",
            tags: [
                "排列组合",
            ],
      "reviewedFields": ["answer","explanation","reviewedBy","reviewedAt","verificationNote"],
        }
    ]
};
