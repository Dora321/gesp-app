// 2024年3月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      timeLimit: '1.0 s',
      memoryLimit: '128 MB',
      samples: [
        { input: `6
140 140 150
140 149 140
148 141 140
141 148 140
145 145 139
0 0 0`, output: `1
3
4
4
2
6` }
      ],
      question: "\n# [GESP202403 五级] 成绩排序\n\n## 题目描述\n\n有 $n$ 名同学，每名同学有语文、数学、英语三科成绩，你需要按照如下规则对所有同学的成绩从高到低排序：\n\n1. 比较总分，高者靠前；\n2. 如果总分相同，则比较语文和数学两科的总分，高者靠前；\n3. 如果仍相同，则比较语文和数学两科的最高分，高者靠前；\n4. 如果仍相同，则二人并列。\n\n你需要输出每位同学的排名，如遇 $x$ 人并列，则他们排名相同，并留空后面的 $x - 1$ 个名次。例如，有 $3$ 名同学并列第 $1$，则后一名同学自动成为第 $4$ 名。\n\n## 输入格式\n\n第一行一个整数 $N$，表示同学的人数。 \n接下来 $N$ 行，每行三个非负整数 $c_i, m_i, e_i$ 分别表示该名同学的语文、数学、英语成绩。\n\n保证 $0 \\le c_i, m_i, e_i \\le 150$。\n\n## 输出格式\n\n输出 $N$ 行，按输入同学的顺序，输出他们的排名。 \n**注意：请不要按排名输出同学的序号，而是按同学的顺序输出他们各自的排名。**\n\n\n## 数据规模\n\n对于 30% 的测试点，保证 $N \\le 100$，且所有同学的总分各不相同。\n\n对于所有测试点，保证 $2 \\le N \\le 10^4$。\n",
      score: 25,
      explanation: `**解析：**
本题考查结构体的定义、多关键字自定义排序以及并列名次的统计与还原。

### 算法步骤

1. **信息建模与存储**：
   定义结构体 \`Student\`，记录每位同学的 4 个关键信息：
   - 原始编号 \`idx\`（从 \`0\` 到 \`N - 1\`，用于最终按原输入顺序输出）；
   - 三科总分 \`total = c + m + e\`；
   - 语数两科总分 \`cm = c + m\`；
   - 语数两科最高分 \`mx = max(c, m)\`。
   读入 \`N\` 名同学的成绩后，将他们存入数组或 \`vector\` 中。

2. **设计多关键字排序规则**：
   按题目要求的优先级依次比较两位同学 \`a\` 和 \`b\`：
   - 第一关键字：总分 \`total\`，从高到低（\`a.total != b.total\` 时返回 \`a.total > b.total\`）；
   - 第二关键字：语数总分 \`cm\`，从高到低（\`a.cm != b.cm\` 时返回 \`a.cm > b.cm\`）；
   - 第三关键字：语数最高分 \`mx\`，从高到低（返回 \`a.mx > b.mx\`）；
   - 若三项都相同，则属于并列，比较函数返回 \`false\`（满足严格弱序）。

3. **计算并列排名**：
   将同学们按上述规则降序排序后，遍历排序后的序列（下标 \`i\` 从 \`0\` 到 \`N - 1\`）：
   - 对于第 \`0\` 位同学（排在最前），名次直接为 \`1\`；
   - 对于第 \`i\` 位同学（\`i > 0\`），如果他的三项指标（\`total\`、\`cm\`、\`mx\`）与前一位同学（\`i - 1\`）完全相同，则二人并列，名次等于前一位同学的名次；
   - 如果不相同，当前名次就是他在排序数组中的位次 \`i + 1\`（这自动满足了“若 \`x\` 人并列，后续排名留空 \`x - 1\` 个名次”的规则）。

4. **按原序回填与输出**：
   开辟大小为 \`N\` 的排名数组 \`rank\`。在判定第 \`i\` 个人的排名时，将其名次存入 \`rank[sorted[i].idx]\`。排序与定级完成后，从 \`0\` 到 \`N - 1\` 依次输出 \`rank[idx]\` 即可。

---

**样例走查：**

以题目给出的样例（\`N = 6\`）为例：
- 同学 0：\`c = 140, m = 140, e = 150\`，计算得：\`total = 430\`, \`cm = 280\`, \`mx = 140\`
- 同学 1：\`c = 140, m = 149, e = 140\`，计算得：\`total = 429\`, \`cm = 289\`, \`mx = 149\`
- 同学 2：\`c = 148, m = 141, e = 140\`，计算得：\`total = 429\`, \`cm = 289\`, \`mx = 148\`
- 同学 3：\`c = 141, m = 148, e = 140\`，计算得：\`total = 429\`, \`cm = 289\`, \`mx = 148\`
- 同学 4：\`c = 145, m = 145, e = 139\`，计算得：\`total = 429\`, \`cm = 290\`, \`mx = 145\`
- 同学 5：\`c = 0, m = 0, e = 0\`，计算得：\`total = 0\`, \`cm = 0\`, \`mx = 0\`

**第一步：排序比较过程**
- \`total\` 最高的只有同学 0（430 分），稳居第 1；
- 同学 1、2、3、4 的 \`total\` 均为 429 分，触发第二关键字比较（\`cm\`）：
  - 同学 4 的 \`cm = 290\` 最高，排在其余三人前；
  - 同学 1、2、3 的 \`cm\` 均为 289，触发第三关键字比较（\`mx\`）：
    - 同学 1 的 \`mx = 149\` 最高，排在同学 2、3 前；
    - 同学 2 和同学 3 的 \`mx = 148\` 相同，三项属性完全一致，二人并列；
- 同学 5 的 \`total = 0\`，排在最后。

排序后的有序序列为：
- 排序下标 \`0\`：同学 0（原编号 0）
- 排序下标 \`1\`：同学 4（原编号 4）
- 排序下标 \`2\`：同学 1（原编号 1）
- 排序下标 \`3\`：同学 2（原编号 2）
- 排序下标 \`4\`：同学 3（原编号 3）
- 排序下标 \`5\`：同学 5（原编号 5）

**第二步：排名判定与名次记录**
- \`i = 0\`：同学 0，名次为 \`0 + 1 = 1\`，记录 \`rank[0] = 1\`；
- \`i = 1\`：同学 4 与前一人指标不同，名次为 \`1 + 1 = 2\`，记录 \`rank[4] = 2\`；
- \`i = 2\`：同学 1 与前一人指标不同，名次为 \`2 + 1 = 3\`，记录 \`rank[1] = 3\`；
- \`i = 3\`：同学 2 与前一人指标不同，名次为 \`3 + 1 = 4\`，记录 \`rank[2] = 4\`；
- \`i = 4\`：同学 3 与同学 2 的三项指标完全相同，并列，名次继承前一人的 \`4\`，记录 \`rank[3] = 4\`；
- \`i = 5\`：同学 5 与前一人指标不同，名次为 \`5 + 1 = 6\`（名次 5 被并列自动跳过），记录 \`rank[5] = 6\`。

**第三步：按原始输入编号（0 到 5）输出**
- 同学 0 的排名：\`1\`
- 同学 1 的排名：\`3\`
- 同学 2 的排名：\`4\`
- 同学 3 的排名：\`4\`
- 同学 4 的排名：\`2\`
- 同学 5 的排名：\`6\`

输出结果为 \`1, 3, 4, 4, 2, 6\`，与题目样例完全吻合。

---

**易错提醒：**
- **不要直接按排名顺序输出**：题干特别强调“按同学的输入顺序输出各自的排名”。如果直接遍历排序后的数组输出，就会把原输入次序打乱。务必在结构体中存储原始下标 \`idx\`，排完序后回填到 \`rank\` 数组中。
- **并列跳名次的统计技巧**：在从 0 开始计数的排序数组中，当某人与前一人不同时，其名次正好就是 \`i + 1\`。这样即便前面有 \`x\` 人并列，后一位同学也能通过 \`i + 1\` 自动跳过被占用的名次。
- **自定义比较函数的严格弱序**：在编写 \`sort\` 的比较函数时，如果两名同学条件完全相同，必须返回 \`false\`。若错误写成 \`>=\`，会导致 \`std::sort\` 在排序时产生未定义行为甚至死循环崩溃。`,
      tags: ["编程题","排序算法"],
      template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    long long N;\n    cin >> N;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nstruct Student { long long total, cm, mx; int idx; };\n\nbool better(const Student &a, const Student &b) {\n    if (a.total != b.total) return a.total > b.total;\n    if (a.cm != b.cm) return a.cm > b.cm;\n    return a.mx > b.mx;\n}\n\nbool equalRank(const Student &a, const Student &b) {\n    return a.total == b.total && a.cm == b.cm && a.mx == b.mx;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    vector<Student> s(n);\n    for (int i = 0; i < n; i++) {\n        long long c, m, e;\n        cin >> c >> m >> e;\n        s[i] = { c + m + e, c + m, max(c, m), i };\n    }\n    vector<Student> sorted = s;\n    sort(sorted.begin(), sorted.end(), [](const Student &a, const Student &b) {\n        return better(a, b);\n    });\n    vector<int> rank(n);\n    for (int i = 0; i < n; i++) {\n        if (i > 0 && equalRank(sorted[i], sorted[i - 1])) {\n            rank[sorted[i].idx] = rank[sorted[i - 1].idx];\n        } else {\n            rank[sorted[i].idx] = i + 1;\n        }\n    }\n    for (int i = 0; i < n; i++) cout << rank[i] << \"\\n\";\n    return 0;\n}",
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["question","reviewedBy","reviewedAt","sourcePage","tags"],
    },
    {
      id: 27,
      type: 'programming',
      timeLimit: '1.0 s',
      memoryLimit: '128 MB',
      samples: [
        { input: `10 3`, output: `7` }
      ],
      question: "\n# [GESP202403 五级] B-smooth 数\n\n## 题目描述\n\n小杨同学想寻找一种名为 $ B $-smooth 数的正整数。 \n\n如果一个正整数的最大质因子不超过 $ B $，则该正整数为 $ B $-smooth 数。小杨同学想知道，对于给定的 $ n $ 和 $ B $，有多少个不超过 $ n $ 的 $ B $-smooth 数。\n\n## 输入格式\n\n第一行包含两个正整数 $ n $ 和 $ B $，含义如题面所示。\n\n## 输出格式\n\n输出一个非负整数，表示不超过 $ n $ 的 $ B $-smooth 数的数量。\n\n\n## 数据范围\n\n| 子任务编号 | 数据点占比 | $n$ | $B$ |\n| --- | --- | --- | --- |\n| 1 | 30% | $\\le 1000$ | $1 \\le B \\le 1000$ |\n| 2 | 30% | $\\le 10^6$ | $\\sqrt{n} \\le B \\le 10^6$ |\n| 3 | 40% | $\\le 10^6$ | $1 \\le B \\le 10^6$ |\n\n对于全部数据，保证 $1 \\le n \\le 10^6$，$1 \\le B \\le 10^6$。\n",
      score: 25,
      explanation: `**解析：**

**1. 题意理解**
题目定义：如果一个正整数的最大质因子不超过 \`B\`，则该数被称为 \`B\`-smooth 数（光滑数）。
题目要求统计不超过 \`n\` 的正整数（即 \`1\` 到 \`n\`）中有多少个 \`B\`-smooth 数。
需要特别注意：正整数 \`1\` 没有任何质因子，其最大质因子可以视为 \`0\`。对于任意给定的正整数 \`B\`（\`B >= 1\`），均满足 \`0 <= B\`，因此数字 \`1\` 恒为一个 \`B\`-smooth 数。

**2. 算法设计与步骤**
如果对 \`1\` 到 \`n\` 中的每个数字分别进行质因数分解，单次分解的时间复杂度约为 \`O(x的平方根)\`，总时间复杂度将接近 \`O(n * sqrt(n))\`，在 \`n\` 较大时容易超出运行时间限制。
由于需要求出 \`1\` 到 \`n\` 范围内所有数字的最大质因子，可以借鉴**埃氏筛（Eratosthenes 筛法）**的思想，在 \`O(n log log n)\` 的时间内批量预处理出所有数的最大质因子：

- **第一步（初始化标记数组）：**
  开设大小为 \`n + 1\` 的数组 \`largest\`，其中 \`largest[x]\` 用于记录正整数 \`x\` 的最大质因子，初始全部设为 \`0\`。
- **第二步（埃氏筛更新最大质因子）：**
  从 \`p = 2\` 开始从小到大枚举到 \`n\`：
  - 如果 \`largest[p] == 0\`，说明 \`p\` 在前面没有被任何比它小的质数整除过，因此 \`p\` 是一个质数。
  - 接着遍历质数 \`p\` 在不超过 \`n\` 范围内的所有倍数 \`x\`（即 \`x = p, 2*p, 3*p, ..., <= n\`），直接执行赋值 \`largest[x] = p\`。
  - **核心原理：** 质数 \`p\` 是按照从小到大的顺序被遍历到的。对于任意合数 \`x\`，它每被一个质因子 \`p\` 筛到，\`largest[x]\` 就会被更新为该质数。由于后出现的质因子一定比先出现的质因子更大，所以当全部循环结束时，每个数 \`largest[x]\` 保存的一定是其**最大质因子**。
- **第三步（遍历统计答案）：**
  遍历 \`x\` 从 \`1\` 到 \`n\`：
  - 判断 \`largest[x] <= b\` 是否成立。
  - 若成立，则计数器 \`count\` 加 1。
- **第四步（输出结果）：**
  输出最终的 \`count\`。

**3. 样例走查（以输入 \`10 3\` 为例）**
输入 \`n = 10\`，\`B = 3\`。
- 初始化：\`largest[0..10]\` 全部初始化为 \`0\`。
- 筛法更新过程：
  - \`p = 2\`：\`largest[2] == 0\`，判定为质数。
    更新其倍数：\`largest[2] = 2\`，\`largest[4] = 2\`，\`largest[6] = 2\`，\`largest[8] = 2\`，\`largest[10] = 2\`。
  - \`p = 3\`：\`largest[3] == 0\`，判定为质数。
    更新其倍数：\`largest[3] = 3\`，\`largest[6] = 3\`（原值为 2，被更新为更大的 3），\`largest[9] = 3\`。
  - \`p = 4\`：\`largest[4] == 2 != 0\`，说明是合数，跳过。
  - \`p = 5\`：\`largest[5] == 0\`，判定为质数。
    更新其倍数：\`largest[5] = 5\`，\`largest[10] = 5\`（原值为 2，被更新为更大的 5）。
  - \`p = 6\`：\`largest[6] != 0\`，跳过。
  - \`p = 7\`：\`largest[7] == 0\`，判定为质数。
    更新其倍数：\`largest[7] = 7\`。
  - \`p = 8, 9, 10\`：均已被赋值不为 0，跳过。
- 筛选结束后，各数的最大质因子 \`largest[x]\` 为：
  - \`x = 1\`: \`largest[1] = 0\`，\`0 <= 3\`，符合条件；
  - \`x = 2\`: \`largest[2] = 2\`，\`2 <= 3\`，符合条件；
  - \`x = 3\`: \`largest[3] = 3\`，\`3 <= 3\`，符合条件；
  - \`x = 4\`: \`largest[4] = 2\`，\`2 <= 3\`，符合条件；
  - \`x = 5\`: \`largest[5] = 5\`，\`5 > 3\`，不符合；
  - \`x = 6\`: \`largest[6] = 3\`，\`3 <= 3\`，符合条件；
  - \`x = 7\`: \`largest[7] = 7\`，\`7 > 3\`，不符合；
  - \`x = 8\`: \`largest[8] = 2\`，\`2 <= 3\`，符合条件；
  - \`x = 9\`: \`largest[9] = 3\`，\`3 <= 3\`，符合条件；
  - \`x = 10\`: \`largest[10] = 5\`，\`5 > 3\`，不符合。
- 统计得到满足条件的数共有 7 个（分别为 \`1, 2, 3, 4, 6, 8, 9\`），输出 \`7\`，与样例输出完全一致。

**易错提醒：**
- **数字 1 的边界处理**：数字 \`1\` 没有任何质因子，题目定义最大质因子不超过 \`B\`，\`1\` 符合条件。程序中 \`largest[1]\` 保持初始值 \`0\`，而 \`0 <= b\` 成立，正好计入结果。切勿将统计循环写成从 \`2\` 开始，否则会导致最终结果少 1。
- **覆盖更新的逻辑**：内层循环更新倍数时，必须是无条件赋值 \`largest[x] = p\`。如果错误地写成 \`if (largest[x] == 0) largest[x] = p;\`，数组记录的反而是每个数的“最小质因子”，造成逻辑错误。
- **空间开辟与越界**：数组必须至少开到 \`n + 1\`，使得下标可以安全访问到 \`n\`，避免发生数组越界。

**知识延伸：**
- **光滑数（Smooth Number）**：在现代数论和密码学中，\`B\`-smooth 数具有重要地位，如大整数分解算法（二次筛法 QS、数域筛法 NFS）均重度依赖寻找光滑数。
- **埃氏筛的拓展应用**：除了判断质数和求最大质因子，埃氏筛法通过类似方式还可以高效批量预处理区间的最小质因子、欧拉函数值以及质因子个数等数论信息。`,
      tags: ["编程题","数论","筛法","质因数分解"],
      template: "#include <iostream>\n#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    long long n, b;\n    cin >> n >> b;\n    // 埃氏筛思想：largest[x] 记录 x 的最大质因子\n    vector<int> largest(n + 1, 0);\n    for (long long p = 2; p <= n; p++) {\n        if (largest[p] == 0) {\n            for (long long x = p; x <= n; x += p) largest[x] = p;\n        }\n    }\n    long long count = 0;\n    for (long long x = 1; x <= n; x++) {\n        if (largest[x] <= b) count++;\n    }\n    cout << count << endl;\n    return 0;\n}",
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 8,
      "reviewedFields": ["question","reviewedBy","reviewedAt","sourcePage","tags"],
    }
];

export const paperData = {
    id: '2024-03-l5',
    title: '2024年3月 GESP C++ 五级真题',
    level: 5,
    year: 2024,
    month: 3,
    session: 1,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `唯一分解定理描述的内容是（ ）？`,
            options: ["任意整数都可以分解为素数的乘积","每个合数都可以唯一分解为一系列素数的乘积","两个不同的整数可以分解为相同的素数乘积","以上都不对"],
            answer: 1,
            score: 2,
            explanation: "**答案：B**\n\n**解析：** 官方选项 B 为“每个合数都可以唯一分解为一系列素数的乘积”，这是唯一正确的表述（分解的唯一性不计素数顺序）。\n\n- **A 任意整数都可以分解为素数的乘积**：错误。0、1 和负整数不能表示为若干素数的乘积。\n- **B 每个合数都可以唯一分解为一系列素数的乘积**：正确。\n- **C 两个不同的整数可以分解为相同的素数乘积**：错误。若素数乘积相同，由唯一性可知两个整数相同。\n- **D 以上都不对**：错误，B 正确。\n\n**考点：** 唯一分解定理",
            tags: ["客观题", "单选题", "GESP5级", "数论"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 2,
            type: "single",
            question: `贪心算法的核心思想是（ ）。`,
            options: ["在每一步选择中都做当前状态下的最优选择","在每一步选择中都选择局部最优解","在每一步选择中都选择全局最优解","以上都对"],
            answer: 0,
            score: 2,
            explanation: "**答案：A**\n\n**解析：** 贪心算法在每一步都做出当前状态下的最优选择（局部最优），并期望由此得到全局最优。\n\n- **A 在每一步选择中都做当前状态下的最优选择**：正确，符合教材定义。\n- **B 在每一步选择中都选择局部最优解**：语义与 A 相近，但官方答案取 A；B 未强调“当前状态下”。\n- **C 在每一步选择中都选择全局最优解**：错误。贪心每步只知道局部信息，不能直接选择全局最优。\n- **D 以上都对**：错误，C 不成立。\n\n**考点：** 贪心算法",
            tags: ["客观题", "单选题", "GESP5级", "贪心"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 3,
            type: "single",
            question: `下面的 C++ 代码片段用于计算阶乘。请在横线处填入（ ），实现正确的阶乘计算。`,
            options: [
                "return n * factorial(n-1);",
                "return factorial(n-1) / n;",
                "return n * factorial(n);",
                "return factorial(n / 2) * factorial(n / 2);"
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A**

            **解析：**
            阶乘递归应满足 n! = n × ($n-1$)!，并在 n=0 或 n=1 时返回 1，因此应填 A。

            - **A return n * factorial(n-1);**：正确答案。
            - **B return factorial(n-1) / n;**：错误。
            - **C return n * factorial(n);**：错误。
            - **D return factorial(n / 2) * factorial(n / ...**：错误。该代码逻辑与题目要求不符，请逐步推演。

            **考点：** 递归
            `,
            tags: ["客观题", "单选题", "GESP5级", "递归"],
        },
        {
            id: 4,
            type: "single",
            question: `下面的代码片段用于在双向链表中删除一个节点。请在横线处填入（ ），使其能正确实现相应功能。`,
            options: [
                "if (current->next != nullptr) current->next->prev = current->prev;",
                "current->prev->next = current->next;",
                "delete current->next;",
                "current->prev = current->next;"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（令前驱节点的 next 指向当前节点的后继节点）**

**核心解析：**
本题考查双向链表中节点的删除逻辑与指针修改操作。

1. **题干代码结构分析**：题中函数 \`deleteNode\` 首先通过 \`while\` 循环遍历双向链表，寻找值为 \`value\` 的待删除节点 \`current\`。找到节点后，需要将其从链表中“脱链”并释放内存空间。
2. **分支判断逻辑**：
   - 题干使用 \`if (current->prev != nullptr)\` 判断被删除节点是否存在前驱节点（即判断其是否不是头节点）。
   - 若 \`current->prev == nullptr\`（对应 \`else\` 分支），说明被删除的节点是头节点，此时只需将链表头指针后移，即 \`head = current->next;\`。
   - 若 \`current->prev != nullptr\`（即横线所在分支），说明被删除节点前面还有前驱节点。为了将 \`current\` 从前向连接中移出，必须让其前驱节点的 \`next\` 指针越过 \`current\`，直接指向 \`current\` 的后继节点（\`current->next\`），因此应填入 \`current->prev->next = current->next;\`。
3. **后续逻辑衔接**：横线下方紧接着执行 \`if (current->next != nullptr) current->next->prev = current->prev;\`，用于更新后继节点的回指指针；最后调用 \`delete current;\` 释放目标节点内存。整个删除流程形成完整闭环。

**选项逐项分析：**
- **A \`if (current->next != nullptr) current->next->prev = current->prev;\`**：❌ 该语句更新的是后继节点的 \`prev\` 指针，此操作已在横线后面的条件分支中单独处理。若在横线处填入该语句，会导致前驱节点的 \`next\` 未被修改，仍然指向已被 \`delete\` 的 \`current\`，造成链表断裂与野指针访问。
- **B \`current->prev->next = current->next;\`**：✅ 正确。\`current->prev\` 表示当前节点的前驱节点，将其 \`next\` 指向当前节点的后继 \`current->next\`，使前驱跳过 \`current\` 直接连接到后继，正确完成了正向指针的重新绑定。
- **C \`delete current->next;\`**：❌ 该语句释放的是当前节点的下一个节点，不仅误删了后续的有效数据造成数据丢失，而且完全没有修改前驱节点的链接关系。
- **D \`current->prev = current->next;\`**：❌ 该语句修改的是当前节点 \`current\` 自身的 \`prev\` 指针，并未修改前驱节点内部的成员。由于 \`current\` 紧接着就会被释放，修改其自身指针毫无意义，无法实现将节点从链表中移出。

**易错提醒：**
- 双向链表删除节点需要同时维护两处指针关系：前驱节点的 \`next\` 和后继节点的 \`prev\`。`,
            tags: ["客观题", "单选题", "GESP5级", "双向链表", "链表", "指针"],
        },
        {
            id: 5,
            type: "single",
            question: `辗转相除法也被称为（ ）。`,
            options: ["高斯消元法", "费马定理", "欧几里得算法", "牛顿迭代法"],
            answer: 2,
            score: 2,
            explanation: `**答案：C**

            **解析：**
            辗转相除法就是欧几里得算法，用于求两个整数的最大公约数。

            - **A 高斯消元法**：错误。
            - **B 费马定理**：错误。
            - **C 欧几里得算法**：正确答案。
            - **D 牛顿迭代法**：错误。

            **考点：** 数论
            `,
            tags: ["客观题", "单选题", "GESP5级", "数论"],
        },
        {
            id: 6,
            type: "single",
            question: `下面的代码片段用于计算斐波那契数列。该代码的时间复杂度是（ ）。

\`\`\`cpp
int fibonacci(int n) {
    if (n <= 1) {
        return n;
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}
\`\`\`
`,
            options: ["$O(1)$","$O(n)$","$O(2^n)$","$O(\\log n)$"],
            answer: 2,
            score: 2,
            explanation: "**答案：C**\n\n**解析：** 朴素递归的 fibonacci(n) 每次都分裂成 fibonacci(n-1) 与 fibonacci(n-2) 两个调用，递归树近似满二叉树，调用次数随 n 指数增长，时间复杂度记为 $O(2^n)$（更精确的渐进界为 $O(\\varphi^n)$，$\\varphi\\approx1.618$，教材统一写作 $O(2^n)$）。\n\n- **A $O(1)$**：错误，需要指数级的函数调用。\n- **B $O(n)$**：错误，$O(n)$ 是循环迭代（递推）写法的时间复杂度。\n- **C $O(2^n)$**：正确，重复子问题导致指数级调用。\n- **D $O(\\log n)$**：错误，递归深度为 $O(n)$，调用次数更是指数级。\n\n**考点：** 递归、时间复杂度分析",
            tags: ["客观题", "单选题", "GESP5级", "递归", "斐波那契", "复杂度分析"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 7,
            type: "single",
            question: `下面的代码片段用于将两个高精度整数进行相加。请在横线处填入（ ），使其能正确实现相应功能。`,
            options: [
                "result = to_string(sum % 10)+result;",
                "result = to_string(carry % 10)+result;",
                "result = to_string(sum / 10)+result;",
                "result = to_string(sum % 10+carry)+result;"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案：A**\n\n**解析：** 高精度加法每一位应把当前位 `sum % 10` 追加到结果，并把 `sum / 10` 作为进位留给下一位。A 正是这个操作。\n\n- **A `result = to_string(sum % 10) + result;`**：正确，取当前位并接到结果高位方向。\n- **B `result = to_string(carry % 10) + result;`**：错误，存入的是进位而不是当前位。\n- **C `result = to_string(sum / 10) + result;`**：错误，存入的是进位部分，当前位丢失。\n- **D `result = to_string(sum % 10 + carry) + result;`**：错误，把进位又加回当前位，重复计算。\n\n**考点：** 高精度加法",
            tags: ["客观题", "单选题", "GESP5级", "高精度", "字符串"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 8,
            type: "single",
            question: `给定序列 1，3，6，9，17，31，39，52，61，79，81，90，96。使用给定代码二分查找元素 82 时，最后输出的 times 值为（ ）。`,
            options: ["2", "5", "3", "4"],
            answer: 3,
            score: 2,
            explanation: "**答案：D**\n\n**解析：** 13 个元素的下标为 0..12，target=82，依次比较：\n\n1. `mid=6`，arr[6]=39 < 82，left=7；\n2. `mid=9`，arr[9]=79 < 82，left=10；\n3. `mid=11`，arr[11]=90 > 82，right=10；\n4. `mid=10`，arr[10]=81 < 82，left=11；\n\n此时 left=11 > right=10，循环结束，共进入 while 4 次，times=4。故选 D。\n\n**考点：** 二分查找",
            tags: ["客观题", "单选题", "GESP5级", "二分查找"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 9,
            type: "single",
            question: `下面的代码片段用于判断一个正整数是否为素数。请对以下代码进行修改，使其能正确实现相应功能。（ ）。

\`\`\`cpp
bool isPrime(int num) {
    if (num < 2) {
        return false;
    }
    for (int i = 2; i * i < num; ++i) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}
\`\`\`
`,
            options: [
                "num < 2 应该改为 num <= 2",
                "循环条件 i * i < num 应该改为 i * i <= num",
                "循环条件应该是 i <= num",
                "循环体中应该是 if (num % i != 0)"
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            试除法判断素数需要枚举到 $\\sqrt{num}$，即循环条件应为 \`i * i <= num\`。若写成 \`i * i < num\`，当 num 是完全平方数时会漏掉因子 $\\sqrt{num}$ 的检查，例如 \`isPrime(9)\`：i=2 时 4<9 成立，9%2≠0；i=3 时 9<9 不成立，循环结束返回 true，把 9 误判为素数。

            - **A num < 2 应该改为 num <= 2**：错误。num=2 本身是素数，若改成 num <= 2 会把 2 也判为非素数；且 num<2 的边界本身正确。
            - **B 循环条件 i * i < num 应该改为 i * i <= num**：正确。补上等号才能检查到 $\\sqrt{num}$ 这个因子。
            - **C 循环条件应该是 i <= num**：错误。条件过松，虽然结果仍正确，但复杂度退化为 O(num)，不是「正确实现功能」所需的修改。
            - **D 循环体中应该是 if (num % i != 0)**：错误。发现余数不为 0 不能说明是素数，必须找到余数为 0 的因子才能判为合数。

            **考点：** 素数试除、边界条件
            `,
            tags: ["客观题", "单选题", "GESP5级", "质数判定", "边界分析"],
        },
        {
            id: 10,
            type: "single",
            question: "在埃拉托斯特尼筛法中，要筛选出不大于 n 的所有素数，最外层循环应该遍历什么范围（ ）。\n\n```cpp\nvector<int> sieveOfEratosthenes(int n) {\n    std::vector<bool> isPrime(n + 1, true);\n    std::vector<int> primes;\n    __________________________ {\n        if (isPrime[i]) {\n            primes.push_back(i);\n            for (int j = i * i; j <= n; j += i) {\n                isPrime[j] = false;\n            }\n        }\n    }\n    for (int i = sqrt(n) + 1; i <= n; ++i) {\n        if (isPrime[i]) {\n            primes.push_back(i);\n        }\n    }\n    return primes;\n}\n```",
            options: [
                "for (int i = 2; i <= n; ++i)",
                "for (int i = 1; i < n; ++i)",
                "for (int i = 2; i <= $sqrt{n}$; ++i)",
                "for (int i = 1; i <= $sqrt{n}$; ++i)"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案：C**\n\n**解析：** 埃氏筛外层只需枚举 `i = 2 .. ⌊√n⌋`：任何合数都有不超过 √n 的质因子，会被更小的素数提前筛掉；大于 √n 的素数由代码后半段的循环补入结果。\n\n- **A `i = 2..n`**：会把大于 √n 的素数也压入 primes，随后后半段循环又压入一次，结果出现重复，不能选。\n- **B `i = 1..n-1`**：从 1 开始会把 1 当作素数处理，且范围过大。\n- **C `i = 2..√n`**：正确且高效，后半段已负责补入剩余素数。\n- **D `i = 1..√n`**：起点 1 错误，会把 1 压入素数表。\n\n**考点：** 埃拉托斯特尼筛法",
            tags: ["客观题", "单选题", "GESP5级", "筛法"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 4,
      "reviewedFields": ["question","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 11,
            type: "single",
            question: `素数的线性筛法时间复杂度为（ ）。`,
            options: ["$O(N)$","$O(N \\log \\log N)$","$O(N \\log N)$","$O(N^2)$"],
            answer: 0,
            score: 2,
            explanation: "**答案：A**\n\n**解析：** 线性筛（欧拉筛）保证每个合数只被它的最小质因子筛掉一次，标记总次数与 n 成正比，时间复杂度为 $O(N)$。\n\n- **A $O(N)$**：正确。\n- **B $O(N\\log\\log N)$**：错误，这是埃拉托斯特尼筛法的复杂度。\n- **C $O(N\\log N)$**：错误，线性筛不会对每个质数都遍历其全部倍数。\n- **D $O(N^2)$**：错误，线性筛的标记总次数是线性的。\n\n**考点：** 线性筛法",
            tags: ["客观题", "单选题", "GESP5级", "线性筛", "复杂度分析"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 4,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 12,
            type: "single",
            question: `归并排序的基本思想是（ ）。`,
            options: ["动态规划","分治","贪心算法","回溯算法"],
            answer: 1,
            score: 2,
            explanation: "**答案：B**\n\n**解析：** 归并排序把序列不断二分，分别递归排序，再把两个有序子序列合并，是“分解—解决—合并”的分治算法。\n\n- **A 动态规划**：错误，归并排序没有重叠子问题与状态转移。\n- **B 分治**：正确。\n- **C 贪心算法**：错误，归并排序不做逐步局部最优选择。\n- **D 回溯算法**：错误，归并排序不搜索解空间，也没有回退过程。\n\n**考点：** 归并排序、分治",
            tags: ["客观题", "单选题", "GESP5级", "归并排序", "分治"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 5,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 13,
            type: "single",
            question: `在快速排序中，选择的主元素（pivot）会影响算法的（ ）。`,
            options: [
                "不影响",
                "时间复杂度",
                "空间复杂度",
                "时间复杂度和空间复杂度"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：B**\n\n**解析：** pivot 选得好时划分均衡，快排接近 O(n log n)；选得差时（如已排序数组取端点为基准）每次只减少一个元素，退化为 O(n^2)。因此 pivot 直接影响算法的时间复杂度。\n\n- **A 不影响**：错误。\n- **B 时间复杂度**：正确，这是最主要的影响。\n- **C 空间复杂度**：递归深度也会随划分均衡程度变化，但教材通常把时间复杂度作为 pivot 的主要影响；官方答案为 B。\n- **D 时间复杂度和空间复杂度**：表述过宽，官方不选。\n\n**考点：** 快速排序",
            tags: ["客观题", "单选题", "GESP5级", "快速排序", "复杂度分析"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 5,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 14,
            type: "single",
            question: `递归函数在调用自身时，必须满足（ ），以避免无限递归？`,
            options: [
                "有终止条件",
                "函数参数递减（或递增）",
                "函数返回值固定",
                "以上都对"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案：A**\n\n**解析：** 递归必须在某个条件下停止并返回，否则会无限递归下去；参数递减或递增只是常见的收敛手段，并不是所有递归都必须满足（例如按区间二分的递归）；返回值固定更不是必要条件。因此最基本的要求是“有终止条件”。\n\n- **A 有终止条件**：正确。\n- **B 函数参数递减（或递增）**：不是必须，参数可以按区间缩小或以其他方式收敛。\n- **C 函数返回值固定**：与终止无关。\n- **D 以上都对**：错误，B、C 不成立。\n\n**考点：** 递归",
            tags: ["客观题", "单选题", "GESP5级", "递归"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 5,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 15,
            type: "single",
            question: "假设给定链表为：$1 \\to 3 \\to 5 \\to 7 \\to \\text{nullptr}$，若调用 `searchValue(head, 5)`，函数返回值为（ ）。\n\n```cpp\nint searchValue(ListNode* head, int target) {\n    while (head != nullptr) {\n        if (head->val == target) {\n            return 1;\n        }\n        head = head->next;\n    }\n    return 0;\n}\n```",
            options: [
                "返回 1",
                "返回 0",
                "死循环，无法返回",
                "返回 -1"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案：A**\n\n**解析：** 链表为 1 → 3 → 5 → 7。searchValue 从 head 开始依次比较：1≠5，3≠5，5==5，命中后返回 1，因此返回值为 1。\n\n- **A 返回 1**：正确。\n- **B 返回 0**：错误，5 在链表中。\n- **C 死循环，无法返回**：错误，每个结点都沿 next 前进，7 之后为 nullptr。\n- **D 返回 -1**：错误，函数只返回 0 或 1。\n\n**考点：** 单链表遍历",
            tags: ["客观题", "单选题", "GESP5级", "链表", "顺序查找"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 5,
      "reviewedFields": ["question","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 16,
            type: "judge",
            question: `辗转相除法用于求两个整数的最大公约数。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
辗转相除法就是欧几里得算法，依据是 $\\gcd(a, b) = \\gcd(b, a \\bmod b)$：不断用余数替换较大的数，直到余数为 0，此时最后一个非零除数就是最大公约数。以 $\\gcd(48, 18)$ 为例：$48 \\bmod 18 = 12$，$18 \\bmod 12 = 6$，$12 \\bmod 6 = 0$，所以答案是 6，与直接分解质因数得到的 $48 = 2^4 \\times 3$、$18 = 2 \\times 3^2$、公共因子 $2 \\times 3 = 6$ 一致。

**易错点：**
- 与「更相减损术」混淆：后者用减法反复相减，思路相同但循环次数多得多，遇到 $10^9$ 与 $1$ 这类数据会退化成上亿次。
- 递归写法 \`return b == 0 ? a : gcd(b, a % b)\` 的终止条件写在 $b = 0$，返回的是上一层的 $a$，不要写成返回 $b$。

**考点：** 数论 · 最大公约数算法`,
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级", "数论"],
        },
        {
            id: 17,
            type: "judge",
            question: `插入排序的时间复杂度是 $O(N \\log N)$。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
插入排序把每个元素插入到前面已排好序的区间中，第 $i$ 个元素平均需要比较和移动 $i/2$ 次，累加后是 $1 + 2 + \\cdots + (N-1) = N(N-1)/2$，即平均与最坏时间复杂度都是 $O(N^2)$。只有「输入本身已经有序」时，每轮只需一次比较、不移动，才降到 $O(N)$。

**正确说法：**
插入排序最好 $O(N)$、平均 $O(N^2)$、最坏（完全逆序）$O(N^2)$，空间 $O(1)$，稳定。

**易错点：**
$O(N \\log N)$ 是归并与堆排序的任何情况、以及快速排序的平均情况。不要因为「插入排序在小数据上很快」就把它记成 $O(N \\log N)$——它快是因为常数因子小，不是因为阶数低。

**考点：** 排序算法 · 时间复杂度`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级", "插入排序", "复杂度分析"],
        },
        {
            id: 18,
            type: "judge",
            question: `二分查找要求被搜索的序列是有序的，否则无法保证正确性。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
二分查找每一步都要靠「中间元素与目标的大小关系」决定丢掉左半还是右半，这个剪枝的前提是序列单调。若序列无序，丢掉的那一半里完全可能藏着目标，正确地丢弃无法保证，结果不可靠。

**易错点：**
- 前提是「有序」而不是「互不相同」；有重复元素时二分仍能工作，只是返回的是其中某一个位置，需要额外收缩区间才能拿到第一个或最后一个。
- 常见实现坑：区间写 \`[left, right]\` 时循环条件是 \`left <= right\`，写 \`[left, right)\` 时是 \`left < right\`，两种写法的边界更新必须配套；\`mid = left + (right - left) / 2\` 可避免 \`left + right\` 溢出。

**考点：** 查找算法 · 二分查找`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级", "二分查找"],
        },
        {
            id: 19,
            type: "judge",
            question: `使用贪心算法解决问题时，每一步的局部最优解一定会导致全局最优解。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
贪心只有在问题同时满足「贪心选择性质」和「最优子结构」时才保证全局最优，否则每步取局部最优会走进死胡同。经典反例是找零：面值 1、3、4 元凑 6 元，贪心先拿最大的 4 元，剩下 2 元只能拿两枚 1 元，共 3 枚；而最优解是两枚 3 元，只要 2 枚。

**正确说法：**
贪心得到的是「当前看来最好」的可行解，不保证最优。要证明贪心正确，通常用交换论证：把最优解的第一步换成贪心选择，证明结果不会变差。

**易错点：**
不要把「贪心能解决问题」和「贪心能求最优解」混为一谈。区间调度、霍夫曼编码、最小生成树是贪心正确的例子；0-1 背包、找零、旅行商是贪心失效的例子。

**考点：** 贪心算法 · 正确性`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级", "贪心"],
        },
        {
            id: 20,
            type: "judge",
            question: `分治算法的核心思想是将一个大问题分解成多个相同或相似的子问题进行解决，最后合并得到原问题的解。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
分治的标准三步是：分解（Divide）把原问题拆成规模更小的同类子问题；解决（Conquer）递归求解子问题，规模足够小时直接返回；合并（Combine）把子问题的解拼成原问题的解。归并排序、快速排序、二分查找、大整数乘法都是这一套路。

**易错点：**
- 分治能成立的关键是子问题「相互独立、不重叠」。若子问题大量重叠（如朴素递归求斐波那契），分治会退化成指数级，这时应改用记忆化或动态规划。
- 合并步骤不能省：归并排序的复杂度 $O(N \\log N)$ 里，$\\log N$ 来自分解层数，$N$ 来自每层合并。

**考点：** 分治算法`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级", "分治"],
        },
        {
            id: 21,
            type: "judge",
            question: `分治算法的典型应用之一是归并排序，其时间复杂度为 $O(N \\log N)$。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
归并排序把序列一分为二递归排序，再线性合并。分解共进行 $\\log_2 N$ 层，每一层的所有合并操作加起来恰好扫过 $N$ 个元素，因此总复杂度是 $O(N \\log N)$，最好、最坏、平均都是这个量级。

**易错点：**
- 归并排序需要 $O(N)$ 的辅助数组，是「以空间换时间」；相比之下堆排序空间 $O(1)$ 但常数大、且不稳定。
- 合并两个有序序列时必须先用临时数组存结果再拷回，直接在原数组上覆盖会丢数据。
- 归并排序是稳定排序：合并时遇到相等元素先取左边那个即可保持原有次序。

**考点：** 分治 · 归并排序`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级", "分治", "归并排序", "复杂度分析"],
        },
        {
            id: 22,
            type: "judge",
            question: `素数表的埃氏筛法和线性筛法的时间复杂度都是 $O(N \\log \\log N)$。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
「都是 $O(N \\log \\log N)$」的说法不准确，两种筛法的复杂度并不相同：
- 埃氏筛（Eratosthenes）：每遇到一个素数 $p$ 就划掉 $p$ 的倍数，总操作数为 $\\sum_{p \\le N} N/p = O(N \\log \\log N)$。
- 线性筛（欧拉筛）：保证每个合数只被它的**最小质因子**划掉一次，复杂度严格是 $O(N)$，比 $O(N \\log \\log N)$ 更低。

因此"都是 $O(N \\log \\log N)$"只对埃氏筛成立，对线性筛不成立，命题错误。

**易错点：**
- 把线性筛也记成 $O(N \\log \\log N)$ 是最常见的错法——"线性筛"名字里的"线性"就是指 $O(N)$。
- 线性筛快在「每个数只被标记一次」，代价是要额外维护素数表和 \`isComposite\` 判断，常数并不总比埃氏筛小；$N$ 只有 $10^7$ 量级时两者实际耗时接近。

**考点：** 数论 · 素数筛法`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-28',
            tags: ["客观题", "判断题", "GESP5级", "筛法", "线性筛", "复杂度分析"],
        },
        {
            id: 23,
            type: "judge",
            question: `贪心算法是一种可以应用于所有问题的通用解决方案。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
贪心是一种策略而不是万能钥匙。它对问题有明确要求：必须能证明局部最优可以推出全局最优。绝大多数最优化问题（如图着色、0-1 背包、旅行商）贪心都得不到最优解，需要动态规划、搜索或近似算法。

**易错点：**
- 「贪心可以拿来做」和「贪心能拿满分」是两回事：很多题用贪心能拿到部分分，但正解是动态规划。
- 看到「每次选最大/最小/最划算」的表述时要先想反例，再决定用不用贪心。

**考点：** 贪心算法 · 适用条件`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级", "贪心"],
        },
        {
            id: 24,
            type: "judge",
            question: `单链表和双链表都可以在常数时间内实现在链表头部插入或删除节点的操作。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
链表头部操作只需要改头指针：插入是 \`newNode->next = head; head = newNode;\`，删除是 \`head = head->next;\`，两者都不涉及遍历，与链表长度无关，因此是 $O(1)$。双链表额外把新节点的 \`prev\` 置空、把原头节点的 \`prev\` 指向新节点，仍然是常数次指针赋值。

**易错点：**
- 结论只对「头部」成立。在单链表中删除「给定指针指向的节点」或在其前面插入，因为拿不到前驱，最坏要 $O(N)$；双链表有 \`prev\` 才能做到 $O(1)$。
- 删除头节点时要先判空，否则对空链表执行 \`head = head->next\` 会解引用空指针。

**考点：** 链表 · 基本操作复杂度`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级", "链表", "双向链表", "复杂度分析"],
        },
        {
            id: 25,
            type: "judge",
            question: `在C语言中，递归的实现方式通常会占用更多的栈空间，可能导致栈溢出。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
每次函数调用都要在调用栈上压入一个栈帧，保存返回地址、参数和局部变量。递归深度为 $N$ 时就同时存在 $N$ 个栈帧，递归越深占用越多；而循环只用一层固定栈帧。栈空间通常只有几 MB，深度到十万级（如朴素递归求阶乘、递归建树）就会触发栈溢出。

**易错点：**
- C 语言标准并不要求编译器做尾递归优化，所以即使写成尾递归形式，也不能指望它自动变成循环。
- 把递归改写成迭代、或显式用数组模拟栈，是避免栈溢出的通用做法；\`dfs\` 在 $10^5$ 个点的链状图上递归也容易爆栈。

**考点：** 递归 · 调用栈`,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: '本站校订',
            reviewedAt: '2026-10-25',
            tags: ["客观题", "判断题", "GESP5级", "递归", "栈"],
        },
        ...programmingQuestions
    ]
};
