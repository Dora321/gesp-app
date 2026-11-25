// 2023年12月 GESP C++ 五级真题

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      timeLimit: '1.0 s',
      memoryLimit: '128 MB',
      samples: [
        { input: `2 4 
1 
4 
5 
9`, output: `4 
lucky 
8 
lucky` },
        { input: `16 11 
1 
2 
4 
8 
16 
32 
64 
128 
256 
512
1024`, output: `16 
16 
16 
16 
lucky 
lucky 
lucky 
lucky 
lucky 
lucky 
lucky` }
      ],
      question: "\n# [GESP202312 五级] 小杨的幸运数\n\n## 题目描述\n\n小杨认为，所有大于等于 $a$ 的完全平方数都是他的超级幸运数。\n\n小杨还认为，所有超级幸运数的倍数都是他的幸运数。自然地，小杨的所有超级幸运数也都是幸运数。\n\n对于一个非幸运数，小杨规定，可以将它一直 $+1$，直到它变成一个幸运数。我们把这个过程叫做幸运化。例如，如果 $a=4$，那么 $4$ 是最小的幸运数，而 $1$ 不是，但我们可以连续对 $1$ 做 $3$ 次 $+1$ 操作，使其变为 $4$，所以我们可以说， $1$ 幸运化后的结果是 $4$。\n\n现在，小杨给出 $N$ 个数，请你首先判断它们是不是幸运数；接着，对于非幸运数，请你将它们幸运化。\n\n## 输入格式\n\n第一行 $2$ 个正整数 $a, N$。\n\n接下来 $N$ 行，每行一个正整数 $x$ ，表示需要判断（幸运化）的数。\n\n## 输出格式\n\n输出 $N$ 行，对于每个给定的 $x$ ，如果它是幸运数，请输出 `lucky`，否则请输出将其幸运化后的结果。\n\n\n## 数据规模\n\n对于 30% 的测试点，保证 $a,x \\le 100$，$N \\le 100$。\n\n对于 60% 的测试点，保证 $a,x \\le 10^6$。\n\n对于所有测试点，保证 $a \\le 1{,}000{,}001$，$N \\le 2 \\times 10^5$，$1 \\le x \\le 1{,}000{,}001$。\n",
      score: 25,
      explanation: `**解析：**

本题要求判断给定的数是否为幸运数；若不是，则将其不断 \`+1\` 直到成为幸运数（即找到大于等于该数的最小幸运数）。由于查询次数 \`N\` 和待查数值较大，单次暴力往后查找会导致程序超时，因此需采用**离线预处理**的思想。

**算法步骤：**

1. **筛选幸运数（埃氏筛思想）：**
   - 定义布尔数组 \`is_lucky\` 记录每个数是否为幸运数，初始全为 \`false\`。
   - 枚举正整数 \`i\`，计算完全平方数 \`sq = i * i\`。
   - 当 \`sq >= a\` 时，\`sq\` 即为超级幸运数。利用类似埃氏筛的做法，枚举 \`sq\` 的所有正整数倍数 \`j = sq, 2 * sq, 3 * sq, ...\`（不超过数据范围上限 \`MAX\`），将 \`is_lucky[j]\` 标记为 \`true\`。

2. **逆序预处理下一个幸运数：**
   - 题目中「幸运化」本质上是寻找大于等于当前数 \`x\` 的最小幸运数。
   - 定义数组 \`next_lucky[i]\` 表示大于等于 \`i\` 的最小幸运数。
   - 维护变量 \`last\` 记录最近遇到的幸运数，从最大范围 \`MAX - 1\` 从后向前逆序遍历至 \`1\`：
     - 若 \`is_lucky[i]\` 为 \`true\`，更新 \`last = i\`；
     - 将 \`next_lucky[i]\` 记录为 \`last\`。

3. **回答询问：**
   - 读入每个询问 \`x\`：若 \`is_lucky[x]\` 为 \`true\`，直接输出 \`lucky\`；否则输出预处理好的 \`next_lucky[x]\`。单次查询时间复杂度为 \`O(1)\`。

---

**样例走查：**

以输入样例 1 为例：\`a = 2, N = 4\`，待判断的数依次为 \`1, 4, 5, 9\`。

1. **寻找超级幸运数及幸运数：**
   - \`i = 1\` 时，\`sq = 1 * 1 = 1 < 2\`，不是超级幸运数；
   - \`i = 2\` 时，\`sq = 2 * 2 = 4 >= 2\`，是超级幸运数，其倍数 \`4, 8, 12, 16, ...\` 均为幸运数；
   - \`i = 3\` 时，\`sq = 3 * 3 = 9 >= 2\`，是超级幸运数，其倍数 \`9, 18, 27, ...\` 均为幸运数；
   - 综合得到幸运数集合包含：\`4, 8, 9, 12, ...\`。

2. **查询处理：**
   - 查询 \`x = 1\`：不是幸运数，大于 1 的最小幸运数是 \`4\`，输出 \`4\`；
   - 查询 \`x = 4\`：本身是幸运数，输出 \`lucky\`；
   - 查询 \`x = 5\`：不是幸运数，大于 5 的最小幸运数是 \`8\`，输出 \`8\`；
   - 查询 \`x = 9\`：本身是幸运数，输出 \`lucky\`。
   - 最终输出为：\`4\`、\`lucky\`、\`8\`、\`lucky\`，与样例输出完全一致。

---

**易错提醒：**
- **整型溢出**：在计算 \`i * i\` 及倍数累加时数值可能较大，建议循环变量和平方数使用 \`long long\` 类型，避免整型溢出导致死循环。
- **数组上限设置**：\`MAX\` 的范围需要开得略大于输入数据的上限（如 \`2000005\`），防止查询处于边界附近的数时找不到后面的幸运数而引发越界。`,
      tags: ["编程题", "数论", "埃氏筛"],
      template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, n;\n    cin >> a >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\n#include <cmath>\nusing namespace std;\nconst int MAX = 2000005;\nbool is_lucky[MAX];\nint next_lucky[MAX];\nint main() {\n    int a, n;\n    cin >> a >> n;\n    for (long long i = 1; i * i < MAX; i++) {\n        long long sq = i * i;\n        if (sq >= a) {\n            for (long long j = sq; j < MAX; j += sq) is_lucky[j] = true;\n        }\n    }\n    int last = -1;\n    for (int i = MAX-1; i >= 1; i--) {\n        if (is_lucky[i]) last = i;\n        next_lucky[i] = last;\n    }\n    while (n--) {\n        int x; cin >> x;\n        if (is_lucky[x]) cout << \"lucky\" << endl;\n        else cout << next_lucky[x] << endl;\n    }\n    return 0;\n}",
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 8,
      "reviewedFields": ["question","reviewedBy","reviewedAt","sourcePage"],
    },
    {
      id: 27,
      type: 'programming',
      timeLimit: '1.0 s',
      memoryLimit: '128 MB',
      samples: [
        { input: `3
1 2 3`, output: `2` },
        { input: `5
5 6 2 10 13`, output: `8` }
      ],
      question: "\n# [GESP202312 五级] 烹饪问题\n\n## 题目描述\n\n有 $N$ 种食材，编号从 $0$ 至 $N-1$，其中第 $i$ 种食材的美味度为 $a_i$。\n\n不同食材之间的组合可能产生奇妙的化学反应。具体来说，如果两种食材的美味度分别为 $x$ 和 $y$ ，那么它们的契合度为 $x\\ \\text{and}\\ y $。\n\n其中，$\\text{and}$ 运算为按位与运算，需要先将两个运算数转换为二进制，然后在高位补足 $0$，再逐位进行与运算。例如，$12$ 与 $6$ 的二进制表示分别为 $1100$ 和 $0110$ ，将它们逐位进行与运算，得到 $0100$ ，转换为十进制得到 4，因此 $12\\ \\text{and}\\ 6 = 4$。**在 C++ 或 Python 中，可以直接使用 `&` 运算符表示与运算。**\n\n\n现在，请你找到契合度最高的两种食材，并输出它们的契合度。\n\n## 输入格式\n\n第一行一个整数 $N$，表示食材的种数。\n\n接下来一行 $N$ 个用空格隔开的整数，依次为 $a_0,\\cdots,a_{N-1}$，表示各种食材的美味度。\n\n## 输出格式\n\n输出一行一个整数，表示最高的契合度。\n\n\n## 数据规模\n\n对于 40% 的测试点，保证 $N \\le 1{,}000$。\n\n对于所有测试点，保证 $N \\le 10^6$，$0 \\le a_i \\le 2{,}147{,}483{,}647$。\n",
      score: 25,
      explanation: "**解析：**\n\n### 1. 题目大意与思路分析\n题目给定 `N` 个非负整数，要求从中挑选出任意两个不同的数 `x` 和 `y`，使得它们按位与（`&`）的结果 `x \\& y` 最大。\n\n- **暴力法局限**：如果使用双重循环枚举所有两两组合，时间复杂度为 `O(N^2)`。当 `N` 达到 `10^6` 级别时，运算次数高达 `10^{12}`，会严重超时。\n- **二进制与贪心策略**：\n  二进制数的大小由高位决定。例如，`2^3 = 8` 大于低位之和 `2^2 + 2^1 + 2^0 = 7`。因此，只要更高位能凑出 1，即使所有更低位全为 0，数值也一定比更高位为 0 的情况更大。\n  两数做按位与运算，只有当两数的对应二进制位**同时为 1** 时，结果的该位才为 1。因此，我们可以从二进制的最高位（第 30 位）向最低位（第 0 位）逐位贪心确定最终答案的每一位能否为 1。\n\n---\n\n### 2. 完整算法流程\n1. **初始化**：\n   - 设当前找到的最优答案为 `ans = 0`。\n   - 设初始候选数字集合 `candidates` 包含所有输入的 `N` 个食材美味度。\n2. **从高位到低位逐位试探**（令 `i` 从 30 递减到 0）：\n   - 假设当前第 `i` 位可以为 1，构造目标掩码 `target = ans | (1 << i)`。该掩码表示：既要保留前面已经确定能凑出的所有高位 1，又要尝试将当前的第 `i` 位也置为 1。\n   - 遍历当前的候选集合 `candidates`，筛选出能完全覆盖 `target` 中所有 1 的数字（即满足 `(val & target) == target` 的数），放入临时集合 `next_candidates`。\n   - **判断与决策**：\n     - 若 `next_candidates` 中的数字个数至少有 2 个（`>= 2`），说明存在至少两个食材，它们在已经确定的所有高位及当前第 `i` 位上都是 1。因此，当前位**可以为 1**：将 `ans` 更新为 `target`，并将候选集合 `candidates` 缩减为 `next_candidates`。\n     - 若不足 2 个，说明无法同时满足已有高位和当前位均为 1，当前位只能为 0：`ans` 保持不变，候选集合也不变，继续检查更低的一位。\n3. **输出结果**：循环结束后，`ans` 即为契合度最高的值。\n\n---\n\n### 3. 样例走查（以样例 2 为例）\n\n**输入**：\n```text\n5\n5 6 2 10 13\n```\n\n将各数值转化为 5 位二进制表示：\n- `5 = (00101)_2`\n- `6 = (00110)_2`\n- `2 = (00010)_2`\n- `10 = (01010)_2`\n- `13 = (01101)_2`\n\n初始状态：`ans = 0`，候选集 `candidates = {5, 6, 2, 10, 13}`。\n高于第 3 位的更高位全为 0，试探均无法满足，直接从第 3 位开始走查：\n\n- **第 3 位（权值 `2^3 = 8`）**：\n  - 构造 `target = ans | (1 << 3) = 8`（二进制 `01000`）。\n  - 检查候选集中第 3 位为 1 的数：10（`01010`）和 13（`01101`）。\n  - 满足条件的数字有 2 个（`{10, 13}`），数量 `>= 2`。\n  - **决策**：第 3 位成功置为 1！更新 `ans = 8`，候选集缩减为 `{10, 13}`。\n\n- **第 2 位（权值 `2^2 = 4`）**：\n  - 构造 `target = ans | (1 << 2) = 8 | 4 = 12`（二进制 `01100`）。\n  - 在当前候选集 `{10, 13}` 中检查：\n    - `10 \\& 12 = 8 \\ne 12`\n    - `13 \\& 12 = 12`\n  - 仅有 13 满足条件，数量为 1（小于 2）。\n  - **决策**：第 2 位无法置为 1。`ans` 保持 8，候选集仍为 `{10, 13}`。\n\n- **第 1 位（权值 `2^1 = 2`）**：\n  - 构造 `target = ans | (1 << 1) = 8 | 2 = 10`（二进制 `01010`）。\n  - 在当前候选集 `{10, 13}` 中检查：\n    - `10 \\& 10 = 10`\n    - `13 \\& 10 = 8 \\ne 10`\n  - 仅有 10 满足条件，数量为 1（小于 2）。\n  - **决策**：第 1 位无法置为 1。`ans` 保持 8，候选集仍为 `{10, 13}`。\n\n- **第 0 位（权值 `2^0 = 1`）**：\n  - 构造 `target = ans | (1 << 0) = 8 | 1 = 9`（二进制 `01001`）。\n  - 在当前候选集 `{10, 13}` 中检查：\n    - `10 \\& 9 = 8 \\ne 9`\n    - `13 \\& 9 = 9`\n  - 仅有 13 满足条件，数量为 1（小于 2）。\n  - **决策**：第 0 位无法置为 1。`ans` 保持 8。\n\n最终输出 `ans = 8`（即选出的两种最佳食材为 10 和 13，其契合度 `10 \\& 13 = 8`）。\n\n---\n\n### 4. 复杂度分析\n- **时间复杂度**：外层循环遍历二进制位数（常量约 31 次），内层遍历候选列表，每轮最多遍历 `N` 个元素。总时间复杂度为 `O(31 * N) \\approx O(N)`，可在 1 秒内通过 `N = 10^6` 的测试点。\n- **空间复杂度**：需要存储候选数组，空间复杂度为 `O(N)`。\n\n---\n\n### 易错提醒：\n- **运算符优先级陷阱**：在 C++ 中，按位与 `&` 的优先级低于关系运算符 `==`。判断必须写成 `(val & target) == target`，不能漏掉小括号；若写成 `val & target == target`，会被编译器解析为 `val & (target == target)`，引发逻辑错误。\n- **候选集必须逐步收窄**：当某一位确定能置为 1 后，后续查找**必须**在保留了这一位为 1 的数构成的子集中进行。如果每轮都从全量 `N` 个数中单独找当前位为 1 的数，可能找到的两个数并不能同时满足前面已确定的高位 1。",
      tags: ["编程题", "位运算", "贪心"],
      template: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
      referenceCode: "#include<cstdio>\n#include<iostream>\n#include<algorithm>\n#include<cstdlib>\n#include<cstring>\nusing namespace std;\n\nconst int MAX_N = int(1e6) + 100;\n\nint a[MAX_N];\n\nint sort(int l,int r,int k) {\n    while(l <= r) {\n        while ((l <= r) && (a[l] >> k & 1)) l++;\n        while ((l <= r) && (!(a[r] >> k & 1))) r--;\n        if (l <= r) swap(a[l++], a[r--]);\n    }\n    return r;\n}\n\nint main() {\n    int n, j, ans=0;\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= n; i++) scanf(\"%d\", &a[i]);\n    for (int i = 31; i >= 0; i--)\n        if ((j = sort(1, n, i)) >= 2) {\n            ans = ans | 1 << i;\n            n = j;\n        }\n    printf(\"%d\\n\", ans);\n    return 0;\n}",
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 10,
      "reviewedFields": ["question","explanation","referenceCode","reviewedBy","reviewedAt","sourcePage"],
    }
];

export const paperData = {
    id: '2023-12-l5',
    title: '2023年12月 GESP C++ 五级真题',
    level: 5,
    year: 2023,
    month: 12,
    session: 4,
    note: '年度收官',
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: `下面 C++ 代码用于求斐波那契数列，该数列第 1 、 2 项为 1 ，以后各项均是前两项之和。下面有关说法错误的是 ( ) 。

\`\`\`cpp
int fiboA(int N)
{
    if (N == 1 || N == 2)
        return 1;
    return fiboA(N - 1) + fiboA(N - 2);
}
int fiboB(int N)
{
    if (N == 1 || N == 2)
        return 1;
    int last2 = 1, last1 = 1;
    int nowVal = 0;
    for (int i = 2; i < N; i++)
    {
        nowVal = last1 + last2;
        last2 = last1;
        last1 = nowVal;
    }
    return nowVal;
}
\`\`\`
`,
            options: ["fiboA( )用递归方式，fiboB()循环方式","fiboA( )更加符合斐波那契数列的数学定义，直观易于理解，而 fiboB() 需要将数学定义转换为计算机程序实现","fiboA( )不仅仅更加符合数学定义，直观易于理解，且因代码量较少执行效率更高","fiboB( )虽然代码量有所增加，但其执行效率更高"],
            answer: 2,
            score: 2,
            explanation: `**答案：不正确的是 C（fiboA 执行效率更低）**

**核心解析：**
斐波那契数列的数学定义为 \`F(1) = 1, F(2) = 1\`，当 \`N >= 3\` 时 \`F(N) = F(N-1) + F(N-2)\`。代码中的两个函数体现了两种不同的算法思想：
1. \`fiboA\` 采用**递归算法**：直接依照数学定义进行自我调用。递归虽然代码极其精简、直观易懂，但由于没有记录已算出的中间结果，计算过程中会产生庞大的重复计算（例如计算 \`fiboA(5)\` 时，\`fiboA(3)\` 会被重复计算两次；随着 \`N\` 的增大，重复计算呈指数级爆炸式增长），其时间复杂度约为 \`O(2^N)\`，执行效率极低。
2. \`fiboB\` 采用**递推（循环迭代）算法**：通过辅助变量 \`last1\`、\`last2\` 记录前两项的值，使用一个 \`for\` 循环从前往后逐步累加，时间复杂度仅为 \`O(N)\`，空间复杂度为 \`O(1)\`。
程序的执行效率取决于计算步数和算法复杂度，与代码行数的长短毫无关系。\`fiboA\` 的执行效率远低于 \`fiboB\`，因此 C 选项说法错误。

**选项逐项分析：**
- **A fiboA( )用递归方式，fiboB()循环方式**：✅ 表述正确。\`fiboA\` 在函数体内直接调用自身，属于典型的递归实现；\`fiboB\` 使用 \`for\` 循环递推求值，属于循环实现。
- **B fiboA( )更加符合斐波那契数列的数学定义，直观易于理解**：✅ 表述正确。斐波那契数列本身的数学定义就是「后一项等于前两项之和」，\`fiboA\` 将 \`F(N) = F(N-1) + F(N-2)\` 直接写成代码，最符合数学直觉。
- **C fiboA( )不仅仅更加符合数学定义，直观易于理解，且因代码量较少执行效率更高**：❌ 表述错误，符合题意。代码量少并不代表执行效率高。朴素递归实现的 \`fiboA\` 存在大量的重复子问题计算，时间复杂度高达指数级 \`O(2^N)\`，实际运行耗时远超 \`fiboB\`。
- **D fiboB( )虽然代码量有所增加，但其执行效率更高**：✅ 表述正确。\`fiboB\` 增加了用于迭代更新的状态变量，代码行数虽然稍多，但避免了任何重复计算，时间复杂度仅为线性阶 \`O(N)\`，运行速度极快。

**易错提醒：**
- **切勿将「代码量少」等同于「运行速度快」**：代码简短只代表源程序字数少，在未经优化的朴素递归中，底层会展开成庞大的递归调用树，产生严重的效率低下问题。
- **复杂度对比**：未经优化的斐波那契递归时间复杂度为指数级 \`O(2^N)\`；循环递推的时间复杂度为线性级 \`O(N)\`。

**知识延伸：**
若想同时保留递归代码直观的结构并达到与循环相当的效率，可以使用**记忆化搜索**（用数组保存计算过的子问题答案），将递归的时间复杂度同样降至 \`O(N)\`。`,
            tags: ["客观题", "单选题", "GESP5级", "递归", "递推", "斐波那契"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["options","reviewedBy","reviewedAt"],
        },
        {
            id: 2,
            type: "single",
            question: "下面 C++ 代码以递归方式实现合并排序，并假设 merge(int T[], int R[], int s, int m, int t) 函数将有序（同样排序规则）的 T[s..m] 和 T[m+1..t] 归并到 R[s..t] 中。横线处应填上代码是 ( ) 。",
            options: [
                "mergeSort(SList, T2, s, m,len), mergeSort(SList, T2, m,t,len)",
                "mergeSort(SList, T2, s, $m-1$,len), mergeSort(SList, T2, m+1,t,len)",
                "mergeSort(SList, T2, s, m,len), mergeSort(SList, T2, m+1,t,len)",
                "mergeSort(SList, T2, s, $m-1$,len), mergeSort(SList, T2, $m-1$,t,len)",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C（将待排序区间划分为左半部分 \`[s, m]\` 与右半部分 \`[m+1, t]\` 并分别递归排序）**

**核心解析：**
归并排序（Merge Sort）是典型的**分治法**（Divide and Conquer）策略应用，其算法执行过程包含三个主要步骤：
1. **分解（Divide）**：将当前待排序的闭区间 \`[s, t]\` 依据中点 \`m = (s + t) / 2\` 划分为两个子区间。由于数组元素通过离散的整型下标索引，划分后的左半子区间为 \`[s, m]\`，右半子区间为 \`[m+1, t]\`。这两个子区间无缝衔接，不重不漏地覆盖了原区间内的全部元素。
2. **解决（Conquer）**：对划分出的左、右两个子区间，分别递归调用 \`mergeSort\` 进行排序，使两部分各自变为有序序列。
3. **合并（Combine）**：调用合并函数，将左右两段已经有序的序列合并为一个整体有序的大序列。

题目中代码横线处执行的正是「递归处理左半部分与右半部分」的操作。左区间的范围为从 \`s\` 到 \`m\`，右区间的范围为从 \`m+1\` 到 \`t\`，因此对应的两次递归调用参数应为 \`mergeSort(SList, T2, s, m, len)\` 与 \`mergeSort(SList, T2, m+1, t, len)\`，正确代码对应选项 C。

**选项逐项分析：**
- **A mergeSort(SList, T2, s, m,len), mergeSort(SList, T2, m,t,len)**：❌ 错误。右半区间的左端点错误地写成了 \`m\`，导致下标 \`m\` 处的元素同时被包含在左右两个区间中。更为严重的是，当区间长度缩减为 2（如 \`s = 0, t = 1\`，计算得到 \`m = 0\`）时，右半区间的调用仍为 \`(0, 1)\`，区间规模未缩小，会导致无限递归进而引发栈溢出。
- **B mergeSort(SList, T2, s, m-1,len), mergeSort(SList, T2, m+1,t,len)**：❌ 错误。左半区间的右端点写为了 \`m-1\`，导致下标为 \`m\` 的元素被两边都排除在外，遗漏了中间元素，无法完成正确排序。
- **C mergeSort(SList, T2, s, m,len), mergeSort(SList, T2, m+1,t,len)**：✅ 正确。左区间为 \`[s, m]\`，右区间为 \`[m+1, t]\`，划分严密且无重叠、无遗漏，是标准的归并排序区间分解方式。
- **D mergeSort(SList, T2, s, m-1,len), mergeSort(SList, T2, m-1,t,len)**：❌ 错误。左半区间遗漏了元素 \`m\`，右半区间左端点误写为 \`m-1\`，区间边界混乱错误。

**易错提醒：**`,
            tags: ["客观题", "单选题", "GESP5级", "归并排序", "分治", "递归"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["question","reviewedBy","reviewedAt"],
        },
        {
            id: 3,
            type: "single",
            question: `阅读下面的C++代码，执行后其输出是( )。`,
            options: [
                "1->120<===>2->120",
                "1->120<===>1->120",
                "1->120<===>1->2->3->4->5->120",
                "1->120<===>2->3->4->5->6->120",
            ],
            answer: 3,
            score: 2,
            explanation: "**答案：D**\n\nfracA(5) 先把 stepCount 从 0 增至 1 并输出 `1->`，循环算出 120，返回后由 main 输出 120，故前半段为 `1->120`；随后输出 `<===>`。fracB(5) 从 stepCount=1 继续递归，每层先自增并输出，依次为 `2->3->4->5->6->`，N=1 时返回 1 并逐层乘回 120，main 最后输出 120。完整输出为 `1->120<===>2->3->4->5->6->120`，选 D。A/B 缺少 3、4、5 层输出，C 误把 fracB 首次输出当作 1。",
            tags: ["客观题", "单选题", "GESP5级", "递归", "变量追踪"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 4,
            type: "single",
            question: `下面的 C++ 用于对 \`lstA\` 排序，使得偶数在前奇数在后，横线处应填入（ ）。

\`\`\`cpp
bool isEven(int N)
{
    return N % 2 == 0;
}

void swap(int &a, int &b)
{
    int t;
    t=a,a=b,b=t;
    return;
}

void sortA(int lstA[], int n)
{
    int i,j,t;
    for (i = n-1; i > 0; i--)
        for(j = 0; j < i; j++)
            if(______________________________)
                swap(lstA[j], lstA[j+1]);

    return;
}
\`\`\``,
            options: [
                "!isEven(lstA[j]) && isEven(lstA[j+1])",
                "isEven(lstA[j]) && !isEven(lstA[j+1])",
                "lstA[j] > lstA[j+1]",
                "lstA[j] < lstA[j+1]",
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2, 3],
            sourceUrl: 'https://gesp.ccf.org.cn/101/attach/1599969567965216.pdf',
            reviewedBy: '本站校订',
            reviewedAt: '2026-07-27',
            explanation: `**答案：A（\`!isEven(lstA[j]) && isEven(lstA[j+1])\`）**

**推导过程：**

1. \`isEven(x)\` 在 \`x\` 为偶数时返回 \`true\`。
2. 要让偶数移动到奇数前面，只需在相邻元素呈“前奇后偶”时交换。
3. “前奇”写作 \`!isEven(lstA[j])\`，“后偶”写作 \`isEven(lstA[j+1])\`，合并后正是 A。
4. 外层循环不断缩小未处理区间，内层循环通过相邻交换消除所有“前奇后偶”的逆序对，最终形成偶数在前、奇数在后的分区。

**选项辨析：** B 会在“前偶后奇”时交换，结果方向相反；C、D 按数值大小排序，不能保证只按奇偶分区。

**最小验证：** 对 \`[1, 2]\`，A 条件为真并交换成 \`[2, 1]\`；对 \`[2, 1]\`，条件为假，顺序保持不变。

**考点：** 冒泡式相邻交换、奇偶判断、数组分区。`,
            tags: [
                "客观题",
                "单选题",
                "GESP5级",
                "排序",
                "奇偶判断",
                "数组分区",
            ]
        },
        {
            id: 5,
            verificationNote: `AI-Codex依据题面及已有代码核验推演并重写解析。`,
            reviewedAt: `2026-11-06`,
            reviewedBy: `AI-Codex`,
            integrityNote: `原卷命中尾结点时直接解引用p->next，可能空指针访问。保留填空答案B并注明原程序边界缺陷。`,
            sourceIntegrity: `official-source-defect`,
            type: "single",
            question: `下面的 C++ 代码用于将字符串保存到双向链表中，横线处应填入代码是（ ）。`,
            options: [
                "if(pHead) {p->next = pHead->next, pHead->next->prev = p;}",
                "if(pHead->next) {p->next = pHead->next, pHead->next->prev = p;}",
                "p->next = pHead->next, pHead->next->prev = p;",
                "触发异常，不能对空指针进行操作。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B（在插入链头时，需先判断首个数据节点是否存在，避免空指针解引用）**

**核心解析：**
1. **明确链表结构**：题干说明该双向链表「带头节点（Dummy Head）」。头节点 \`pHead\` 本身不存放实际数据，其地址始终存在（\`pHead != nullptr\`）。链表中真正的第一个数据节点是 \`pHead->next\`。当链表为空时，\`pHead->next\` 的值为 \`nullptr\`。
2. **头插法的指针维护**：将节点 \`p\` 插入到头节点之后（即作为新的第一个数据节点）需要完成两对双向指针的建立：
   - 建立 \`p\` 与后继节点的双向关系：若原链表中已有数据节点，则需要将 \`p->next\` 指向原首节点（\`pHead->next\`），并将原首节点的 \`prev\` 指针指向 \`p\`（即 \`pHead->next->prev = p\`）。
   - 建立 \`p\` 与头节点 \`pHead\` 的双向关系：将 \`pHead->next\` 指向 \`p\`，并将 \`p->prev\` 指向 \`pHead\`。
3. **空指针安全防范**：当链表此前没有任何数据节点时，\`pHead->next\` 为 \`nullptr\`。如果直接执行 \`pHead->next->prev = p\`，等价于对空指针解引用（\`nullptr->prev\`），这会导致程序发生段错误（运行时崩溃）。因此，在访问 \`pHead->next->prev\` 之前，必须先使用 \`if (pHead->next)\` 判断原首个数据节点是否存在。

**选项逐项分析：**
- **A \`if (pHead) { p->next = pHead->next; pHead->next->prev = p; }\`**：❌ 错误。带头节点的链表中，\`pHead\` 恒为有效指针，\`if (pHead)\` 永远为真，起不到保护作用。当链表为空时，\`pHead->next\` 为空，执行内部语句依然会解引用空指针。
- **B \`if (pHead->next) { p->next = pHead->next; pHead->next->prev = p; }\`**：✅ 正确。准确判断了首个数据节点是否存在。只有当链表中已有数据节点时，才安全地将新节点接入原首节点的前驱，避免了空指针崩溃。
- **C \`p->next = pHead->next; pHead->next->prev = p;\`**：❌ 错误。完全没有判空处理。当链表首次插入节点时，\`pHead->next\` 为空指针，直接执行 \`pHead->next->prev = p\` 会导致程序崩溃。
- **D \`触发异常，不能对空指针进行操作。\`**：❌ 错误。C++ 中解引用空指针属于未定义行为（通常直接崩溃），且只要通过 B 选项的 \`if (pHead->next)\` 分支防御即可安全规避，题目要求填入有效逻辑代码而非放弃操作。

**易错提醒：**
- **头节点与首元节点的区别**：\`pHead\` 只是辅助性质的哨兵头节点，\`pHead->next\` 才是存放有效数据的首元节点。判断链表是否有数据应看 \`pHead->next\` 是否非空，而非看 \`pHead\`。`,
            tags: ["客观题", "单选题", "GESP5级", "双向链表", "链表", "指针"],
        },
        {
            id: 6,
            type: "single",
            question: `有关下面 C++ 代码说法正确的是（ ）。`,
            options: [
                "如果x小于 10 ，rc值也不会超过 20",
                "foo可能无限递归",
                "foo可以求出 x 和 y 的最大公共质因子",
                "foo能够求出 x 和 y 的最小公倍数",
            ],
            answer: 0,
            score: 2,
            explanation: "**答案：A**\n\n**解析：** foo(x, y) 是欧几里得算法：y == 0 时返回 x，否则递归 foo(y, x % y)，返回 gcd(x, y)；rc 只在递归分支自增，统计递归调用次数。\n\n- **A 如果 x 小于 10，rc 值也不会超过 20**：正确。x<10 时，辗转相除很快使两个参数都小于 10，递归层数是常数级，远小于 20。\n- **B foo 可能无限递归**：错误。每次递归第二个参数严格变小（x % y < y），必然到达 y == 0。\n- **C foo 可以求出 x 和 y 的最大公共质因子**：错误。返回的是最大公约数，不是最大公共质因子。\n- **D foo 能够求出 x 和 y 的最小公倍数**：错误。返回的是 gcd，不是 lcm。\n\n**考点：** 递归、欧几里得算法",
            tags: ["客观题", "单选题", "GESP5级", "递归", "程序分析"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 7,
            type: "single",
            question: `下面的 C++ 代码实现对 list 的快速排序，有关说法错误的是（ ）。`,
            options: [
                "qSort(less)+qSort(greater)+(vector<int>)pivot",
                "(vector<int>)pivot+(qSort(less)+qSort(greater))",
                "(qSort(less)+(vector<int>)pivot+qSort(greater))",
                "qSort(less)+pivot+qSort(greater)",
            ],
            answer: 2,
            score: 2,
            explanation: "**答案：C（官方口径；四个选项作为代码均不能真正完成排序）**\n\n**核心解析：**\n`qSort` 取 `lst[0]` 为基准 `pivot`，把其余元素分入 `less`（≤ pivot）与 `greater`（> pivot），递归排好两段后拼回。按快速排序语义，正确拼装顺序是「排好的 less + 基准 pivot + 排好的 greater」，基准必须夹在中间。\n\n**选项逐项分析（结合实测）：**\n- **A `qSort(less)+qSort(greater)+(vector<int>)pivot`**：❌ 基准放到末尾，破坏「左小右大」的合并顺序。\n- **B `(vector<int>)pivot+(qSort(less)+qSort(greater))`**：❌ 基准放到最前，同样破坏合并顺序。\n- **C `(qSort(less)+(vector<int>)pivot+qSort(greater))`**：❌ 本题官方选定的错误说法。骨架虽是左—中—右，但 `(vector<int>)pivot` 是 C 风格强转，按 `vector<int>(pivot)` 的尺寸构造语义生成 pivot 个 0（实测 pivot=3 得 {0,0,0}，pivot=0 得空向量），并不会把基准值本身插入中间；叠加 `operator+` 从下标 1 开始复制（丢弃每个实参首元素）后，实测输入 3,1,2 输出 `0` 而非有序的 `1 2 3`。\n- **D `qSort(less)+pivot+qSort(greater)`**：顺序虽然正确，但实测（Apple clang 21，-std=c++98/11/17 结果一致）无法编译：`vector<int> + int` 不能匹配本题只接受两个 `vector<int>` 的 `operator+`，且 `vector` 的尺寸构造函数是 explicit，`int` 无法隐式转换为 `vector<int>`。官方在四个选项中取 C 为「错误说法」，站点按官方保留答案 C。\n\n**原卷缺陷（保留记录）：** ① `operator+` 两个循环都从下标 1 开始复制，丢弃每个实参的首元素；② 原卷第 19–24 行是两段完全相同的收集循环，元素被重复放入 less/greater（本次已按原卷补回第二段）；③ 实测原卷形态在「剩余元素与基准同值」时无限递归（对向量 [1,1] 递归深度超 60 仍不收敛，进程 SIGSEGV 崩溃）；④ 叠加后四个选项没有一个能真正完成排序。官方答案 C 是选项层面的判定，站点按官方保留、不擅改答案。\n\n**考点：** 快速排序的划分与递归拼接、类型转换与运算符重载。",
            tags: ["客观题", "单选题", "GESP5级", "快速排序", "分治", "递归"],
      "code": "vector<int> operator +(vector<int> lA, vector<int> lB)\n{\n    vector<int> lst;\n    for (int i = 1; i < lA.size(); i++)\n        lst.push_back(lA[i]);\n    for (int i = 1; i < lB.size(); i++)\n        lst.push_back(lB[i]);\n    return lst;\n}\n\nvector<int> qSort(vector<int> lst)\n{\n    if (lst.size() < 2) return lst;\n    int pivot = lst[0];\n    vector<int> less, greater;\n    for (int i = 1; i < lst.size(); i++)\n        if (lst[i] <= pivot) less.push_back(lst[i]);\n        else greater.push_back(lst[i]);\n    for (int i = 1; i < lst.size(); i++)\n        if (lst[i] <= pivot) less.push_back(lst[i]);\n        else greater.push_back(lst[i]);\n\n    return __________________________________________;\n}",
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["code","explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 8,
            type: "single",
            question: `isPrimeA() 和 isPrimeB() 判定参数 N 是否素数，有关其时间复杂度的说法正确的是（ ）。`,
            options: ["isPrimeA()的最坏时间复杂度是 $O(N/2)$，isPrimeB()的最坏时间复杂度是 $O(\\log N)$，isPrimeA()优于isPrimeB()","isPrimeA()的最坏时间复杂度是 $O(N/2)$，isPrimeB()的最坏时间复杂度是 $O(N^{1/2})$，isPrimeB()绝大多数情况下优于isPrimeA()","isPrimeA()的最坏时间复杂度是 $O(N^{1/2})$，isPrimeB()的最坏时间复杂度是 $O(N)$，isPrimeA()优于isPrimeB()","isPrimeA()的最坏时间复杂度是 $O(\\log N)$，isPrimeB()的最坏时间复杂度是 $O(N)$，isPrimeA()优于isPrimeB()"],
            answer: 1,
            score: 2,
            explanation: "**答案：B**\n\nisPrimeA 的循环上界是 N/2，最坏要检查约 N/2 个因子，时间复杂度为 O(N)（写成 O(N/2) 也等价于 O(N)）；isPrimeB 的循环上界是 sqrt(N)，最坏检查约 sqrt(N) 个因子，时间复杂度为 O(sqrt(N))=O(N^(1/2))。因此 isPrimeB 在绝大多数情况下明显快于 isPrimeA。\n\n- **A**：把 isPrimeB 说成 O(log N) 且说 A 更优，错误。\n- **B**：两个复杂度和结论都正确。\n- **C**：把两个复杂度写反，错误。\n- **D**：把 isPrimeA 说成 O(log N) 且说 A 更优，错误。",
            tags: ["客观题", "单选题", "GESP5级", "质数判定", "复杂度分析"],
      "code": "bool isPrimeA(int N)\n{\n    if (N < 2)\n        return false;\n    for (int i = 2; i <= N / 2; i++)\n        if (N % i == 0)\n            return false;\n    return true;\n}\nbool isPrimeB(int N)\n{\n    if (N < 2)\n        return false;\n    for (int i = 2; i <= sqrt(N); i++)\n        if (N % i == 0)\n            return false;\n    return true;\n}",
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 4,
      "reviewedFields": ["code","options","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 9,
            type: "single",
            question: `下面 C++ 代码用于有序list的二分查找，有关说法错误的是（ ）。`,
            options: [
                "代码采用二分法实现有序list的查找",
                "代码采用分治算法实现有序list的查找",
                "代码采用递归方式实现有序list的查找",
                "代码采用动态规划算法实现有序list的查找",
            ],
            answer: 3,
            score: 2,
            explanation: "**答案：D**\n\n**解析：** 该函数用二分（折半）查找、分治思想和递归实现有序 list 的查找，不是动态规划，因此“采用动态规划算法”说法错误，选 D。\n\n- **A、B、C**：代码确实采用二分法、分治算法和递归方式，三种说法都成立。\n- **D**：二分查找不属于动态规划。\n\n需要说明：原卷 bSearch 把上界写成 `lst.size()`，正确应为 `lst.size() - 1`；当目标大于全部元素时可能访问 `lst[size]`，这是原卷代码的边界缺陷，不影响本题选 D。\n\n**考点：** 二分查找、分治与递归",
            tags: ["客观题", "单选题", "GESP5级", "二分查找", "分治"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 10,
            type: "single",
            question: `在_binarySearch算法中，如果lst中有N个元素，其时间复杂度是（ ）。`,
            options: [
                "$O(N)$",
                "$O(log n)$",
                "$O(n log n)$",
                "$O(N^2)$",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：B**\n\n**解析：** `_binarySearch` 每次用 Mid 比较后把查找区间缩小一半，最多递归 O(log N) 层，按比较次数计时间复杂度为 O(log N)。\n\n- **A O(N)、C O(N log N)、D O(N^2)**：均不符合折半查找的比较次数。\n- 注意：形参 `vector<int> lst` 是按值传递，每层递归会复制整个向量；若把复制开销计入，严格总开销会达到 O(N log N)。本题按常规二分查找/官方答案取 B，复制开销作为实现瑕疵说明。\n\n**考点：** 二分查找",
            tags: ["客观题", "单选题", "GESP5级", "二分查找", "复杂度分析"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 5,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 11,
            type: "single",
            question: `下面的C++代码使用数组模拟整数加法，可以处理超出大整数范围的加法运算。横线处应填入代码是（ ）。

\`\`\`cpp
vector<int> operator + (vector<int> a, vector<int> b)
{
    vector<int> c;
    int t = 0;
    for (int i = 0; i < a.size() || i < b.size(); i++)
    {
        if (i < a.size()) t = t + a[i];
        if (i < b.size()) t = t + b[i];
        // 横线处应填入的代码
    }
    if (t) c.push_back(t);
    return c;
}
\`\`\``,
            options: [
                "c.push_back(t % 10), t = t % 10;",
                "c.push_back(t / 10), t = t % 10;",
                "c.push_back(t / 10), t = t / 10;",
                "c.push_back(t % 10), t = t / 10;",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D**

            **解析：**
            t % 10 得到当前位，t / 10 得到进位。

            - **A c.push_back(t % 10), t = t % 10;**：错误。push 进 c 的是个位，正确；但 t = t % 10 会把进位丢掉而不是保留到下一轮循环，高位全部算错。
            - **B c.push_back(t / 10), t = t % 10;**：错误。先把进位 t / 10 存进结果，位序颠倒；真正该存的个位 t % 10 只留在 t 里，下一轮被累加污染。
            - **C c.push_back(t / 10), t = t / 10;**：错误。两次都是整除，存进 c 的是进位而非个位，且 t 最终归零，各位数字完全错误。
            - **D c.push_back(t % 10), t = t / 10;**：正确。t % 10 是当前位，存入 c；t = t / 10 把剩余部分（含进位）留给下一轮；循环结束后 if (t) 再补最高位进位。

            **考点：** 高精度
            `,
            tags: ["客观题", "单选题", "GESP5级", "高精度", "数组"],
        },
        {
            id: 12,
            type: "single",
            question: `有关下面 C++ 代码的说法正确的是（ ）。`,
            options: [
                "上述代码构成单向链表",
                "上述代码构成双向链表",
                "上述代码构成循环链表",
                "上述代码构成指针链表",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            代码中节点包含指向前驱和后继的指针，构成双向链表。

            - **A 上述代码构成单向链表**：不是本题答案。
            - **B 上述代码构成双向链表**：正确答案。
            - **C 上述代码构成循环链表**：不是本题答案。
            - **D 上述代码构成指针链表**：不是本题答案。
            **考点：** 链表
            `,
            tags: ["客观题", "单选题", "GESP5级", "双向链表", "链表"],
        },
        {
            id: 13,
            type: "single",
            question: `通讯卫星在通信网络系统中主要起到（）的作用。`,
            options: [
                "信息过滤",
                "信号中继",
                "避免攻击",
                "数据加密",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

            **解析：**
            卫星接收地球站发出的信号并转发，起到中继站作用。

            - **A 信息过滤**：错误。
            - **B 信号中继**：正确答案。
            - **C 避免攻击**：错误。
            - **D 数据加密**：错误。

            **考点：** C++基础
            `,
            tags: ["客观题", "单选题", "GESP5级", "网络基础"],
        },
        {
            id: 14,
            type: "single",
            question: `判断任意输入的整数 N 是否为素数的程序，下面哪个方法不合适？（ ）`,
            options: [
                "埃氏筛法",
                "线性筛法",
                "二分答案",
                "枚举法",
            ],
            answer: 2,
            score: 2,
            explanation: "**答案：C**\n\n**解析：** 题目要求判断「任意输入的单个整数 N」是否为素数，逐项考察各方法能否完成这一判定：\n\n- **A 埃氏筛法**：可行。对 [2, N] 建埃氏筛表后查看 N 是否被标记即可判定；对单个 N 需先筛出整个范围、效率不高，但方法成立。\n- **B 线性筛法**：可行。欧拉筛每个合数只被最小质因子筛一次，同样可对 [2, N] 建表后判定 N，方法成立。\n- **C 二分答案**：不可行，为本题「不合适」的方法。二分答案要求判定条件随候选值单调（如「边长 x 能否切出 K 块」随 x 单调变化）；「N 是否为素数」随 N 增大忽真忽假（2、3、5、7 为素数，4、6、8、9 不是），不存在可二分的单调区间，无法使用。\n- **D 枚举法**：可行。用 2..√N 逐个试除即可直接判定单个 N。\n\n**考点：** 素数判定的常见方法（筛法、试除）与二分答案的单调性前提。",
            tags: ["客观题", "单选题", "GESP5级", "质数判定", "筛法", "二分答案"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 15,
            type: "single",
            question: `哪种排序算法不能保证在下一趟处理时从待处理数据中选出最大或最小的数据？（ ）`,
            options: [
                "选择排序",
                "快速排序",
                "堆排序",
                "冒泡排序",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：不正确的是 B（快速排序）**

**核心解析：**
题干考查常见排序算法在“每一趟处理”后的运行机制与数据特征。

快速排序采用分治思想，每一趟划分（Partition）操作选取一个基准值（pivot），通过双指针将待处理序列划分为小于基准和大于基准的两部分，并将基准值放置到最终的正确位置上。基准值通常取自区间首尾、中间或随机选取，往往是处于中间大小的元素，**不能保证**是当前待处理数据中的全局最大值或最小值。

相比之下，其余三种排序算法在机制上均能保证每趟选出当前区间的极值：
1. **选择排序**：每趟线性扫描未排序区间，直接选出其中的最小值（或最大值）放入已排序序列。
2. **冒泡排序**：每趟通过相邻元素两两比较交换，将未排序区间的最大值（或最小值）像气泡一样推送到区间末端。
3. **堆排序**：借助完全二叉树构建大根堆或小根堆，堆顶必定是当前待排序数据的最大值或最小值，每趟直接取出堆顶即可。

因此，不能保证在下一趟处理时选出最大或最小数据的是快速排序。

**选项逐项分析：**
- **A 选择排序**：❌ 排除。每趟处理都会完整遍历未排序区间，挑出其中的最小值（或最大值）与未排序区间的首元素交换，能够保证选出极值。
- **B 快速排序**：✅ 符合题意。每趟划分仅确定基准值（pivot）的最终位置，基准值一般不是待处理数据中的最大或最小元素，不能保证选出极值。
- **C 堆排序**：❌ 排除。基于堆结构维护极值，大根堆堆顶一定是当前待处理序列的最大值，小根堆堆顶一定是最小值；每趟取出堆顶并调整堆，能够保证选出极值。
- **D 冒泡排序**：❌ 排除。每趟通过相邻元素的两两比较与交换，必定将当前未排序区间的最大元素（或最小元素）交换沉底到末端，能够保证选出极值。

**易错提醒：**
- 快速排序每趟处理也能确定一个元素的最终归位位置（即 pivot 归位），但这并不等同于“选出最大或最小值”。考生容易把“每趟确定一个位置”与“每趟选出极值”混淆。

**知识延伸：**
在初赛常考的内部排序算法中：
- 每趟能确定一个**全局极值**并归位的：选择排序、冒泡排序、堆排序；
- 每趟能确定一个**元素最终位置**但不保证是极值的：快速排序（基准值归位）；
- 仅保证**局部前缀有序**、既不确定最终位置也不选出极值的：直接插入排序。`,
            tags: ["客观题", "单选题", "GESP5级", "快速排序", "排序算法"],
        },
        {
            id: 16,
            type: "judge",
            question: `归并排序的时间复杂度是 $O(n log n)$ 。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            归并排序在最好、平均、最坏情况下都是 $O(n log n)$。

            **易混概念：** 归并排序 O(n log n)，稳定，需要额外 O(n) 空间；核心是分解到最小再合并两个有序序列。

            **考点：** 归并排序
            `,
            tags: ["客观题", "判断题", "GESP5级", "归并排序", "复杂度分析"],
        },
        {
            id: 17,
            type: "judge",
            question: `小杨在生日聚会时拿一块H*W的巧克力招待来的K个小朋友，保证每位小朋友至少能获得一块相同大小的巧克力。那么小杨想分出来最大边长的巧克力可以使用二分法。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

            **判定依据：**
            官方答案判定为"错误"。从工程实践看，"边长为 x 的方块能否切出 K 块"具有单调性（x 越大越难切满足），用二分答案验证 \` (H/x) * (W/x) >= K \` 是经典做法；但"二分法"严格意义上指二分查找，而本题需要的是"二分答案（二分枚举 + 判定）"，官方按概念的严格界定判错。考试中以此题官方答案为准。

            **易混概念：** 二分查找前提：序列有序。注意边界 while(left<=right) 还是 while(left<right)，mid 用 left+(right-left)/2 防溢出，以及更新左右边界时是否 ±1。

            **考点：** 二分查找
            `,
            tags: ["客观题", "判断题", "GESP5级", "二分答案", "二分查找"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 7,
      "reviewedFields": ["reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 18,
            type: "judge",
            question: "以下 C++ 代码能以递归方式实现斐波那契数列，该数列第 1、2 项为 1，以后各项均是前两项之和。（ ）",
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：错误**\n\n**判定依据：** 图示代码中 `Fibo` 在 N=1 或 N=2 时返回 1，基例本身存在；但递归分支调用的是 `fiboA(N - 1)` 和 `fiboB(N - 2)`——这两个函数在题给代码中并未定义，全代码也没有一处调用 `Fibo` 自身。实测编译报 `fiboA`、`fiboB` 两处 undeclared identifier 错误，整体无法通过编译，不能构成「以递归方式实现斐波那契数列」的程序，命题为假。\n\n**纠错：** 若把两处调用改为 `Fibo(N - 1)` 与 `Fibo(N - 2)`，才构成标准递归实现（第 1、2 项为 1，以后各项均是前两项之和）。\n\n**易混概念：** 递归三要素：终止条件、递归调用、状态传递；递归调用必须指向函数自身，调用未定义函数会直接编译失败；深层递归可能栈溢出。\n\n**考点：** 递归",
            tags: ["客观题", "判断题", "GESP5级", "递归", "斐波那契"],
      "code": "int Fibo(int N)\n{\n    if (N == 1 || N == 2)\n        return 1;\n    else\n    {\n        int m = fiboA(N - 1);\n        int n = fiboB(N - 2);\n        return m + n;\n    }\n}",
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 7,
      "reviewedFields": ["question","code","explanation","reviewedBy","reviewedAt","sourcePage"],
        },
        {
            id: 19,
            type: "judge",
            question: `贪心算法可以达到局部最优，但可能不是全局最优解。 ( )`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            贪心算法的特性就是局部最优选择。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: ["客观题", "判断题", "GESP5级", "贪心"],
        },
        {
            id: 20,
            type: "judge",
            question: `小杨设计了一个拆数程序，它能够将任意的非质数自然数N转换成若干个质数的乘积，这个程序是可以设计出来的。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            素数分解定理保证了这种分解的存在性。

            **易混概念：** 埃氏筛：标记每个质数的倍数为合数，从 i*i 开始标记避免重复；欧拉筛每个合数只被最小质因子筛一次，效率更高。

            **考点：** 筛法
            `,
            tags: ["客观题", "判断题", "GESP5级", "数论", "质数判定"],
        },
        {
            id: 21,
            type: "judge",
            question: `插入排序有时比快速排序时间复杂度更低。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            在数组几乎有序时，插入排序为 $O(N)$，快排退化可能更高。

            **易混概念：** 快速排序平均 O(n log n)，最坏 O(n²)（已有序且选端点为基准）。注意基准选取、partition 的双指针移动条件和边界。

            **考点：** 快速排序
            `,
            tags: ["客观题", "判断题", "GESP5级", "插入排序", "快速排序", "复杂度分析"],
        },
        {
            id: 22,
            type: "judge",
            question: `下面的 C++ 代码能实现十进制正整数 N 转换为八进制并输出。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：错误**\n\n**判定依据：** 逐轮模拟：每轮先执行 `s[0] = N % 8 + '0'` 得到当前最低位的数字字符，再用 `rst += string(s)` 把它追加到 rst 末尾，最后 `N /= 8`。取模与除法的先后顺序本身没有问题（全局数组 s 未用到的位置零初始化，`string(s)` 恰为单个字符）；真正的缺陷是各位按从低位到高位的顺序被依次追加到末尾、程序没有反转，输出的是倒序八进制串。\n\n**逐例实测（g++ 编译运行）：** N=8 输出 01（应为 10）；N=10 输出 21（应为 12）；N=64 输出 001（应为 100）；N=100 输出 441（应为 144）；N=9 输出 11 与正确答案相同属回文巧合；N=1 输出 1 正确。任一多位非回文输入即可暴露倒序缺陷。\n\n**修正思路：** 每轮把新数字插到结果串前面，或先按低位在前保存、最后整体逆序输出。另注：题干限定正整数，但 N=0 时该代码不进循环、输出空行，属边界外的附带观察。\n\n**考点：** 进制转换",
            tags: ["客观题", "判断题", "GESP5级", "进制转换"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["explanation","reviewedBy","reviewedAt"],
        },
        {
            id: 23,
            type: "judge",
            question: `对数组 int arr[] = {2, 6, 3, 5, 4, 8, 1, 0, 9, 10} 执行 sort(arr, arr+10) ，则执行后 arr 中的数据调整为 {0, 1, 2, 3, 4, 5, 6, 8, 9, 10} 。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            sort 默认升序排序。

            **易混概念：** 常见排序复杂度：快排/归并/堆排 O(n log n)，冒泡/选择/插入 O(n²)。稳定：冒泡、插入、归并；不稳定：快排、选择、堆排。

            **考点：** 排序算法
            `,
            tags: ["客观题", "判断题", "GESP5级", "排序算法"],
        },
        {
            id: 24,
            type: "judge",
            question: `小杨想写一个程序来算出正整数N有多少个因数，经过思考他写出了一个重复没有超过N/2次的循环就能够算出来了。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            只需要遍历到 sqrt(N) 即可找全所有因数。

            **易混概念：** 注意区分相关概念的适用范围和边界条件。

            **考点：** C++基础
            `,
            tags: ["客观题", "判断题", "GESP5级", "数论", "枚举"],
        },
        {
            id: 25,
            type: "judge",
            question: `单链表和双向链表上的简单冒泡排序的复杂度相同。（ ）`,
            options: [
                "正确",
                "错误",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

            **判定依据：**
            都是 $O(N^2)$。

            **易混概念：** 链表通过指针串联节点，插入/删除只需改指针指向，无需移动元素；注意空链表、头节点处理和指针丢失（先存后继再改指向）。

            **考点：** 链表
            `,
            tags: ["客观题", "判断题", "GESP5级", "链表", "冒泡排序", "复杂度分析"],
        },
        ...programmingQuestions
    ]
};
