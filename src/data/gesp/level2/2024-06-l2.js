// 2024年6月 GESP C++ 二级真题 (第6次认证)
export const paperData = {
    id: '2024-06-l2',
    title: '2024年6月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 90 * 60,
    questions: [
        {
            id: 1,
            type: 'single',
            question: `人工智能（AI）在近期非常火爆，其中经常被提及的“大模型”最贴切是指（ ）。`,
            options: ["大电脑模型", "大规模智能", "智能的单位", "大语言模型"],
            answer: 3,
            score: 2,
            explanation: `**答案：D (大语言模型)**

**选项逐项分析：**
- **A 大电脑模型**：❌ 错误。大模型是指算法和参数规模的巨大，而非物理电脑的体积。
- **B 大规模智能**：❌ 错误。虽然目标是智能，但“大模型”是具体的工程术语。
- **C 智能的单位**：❌ 错误。
- **D 大语言模型**：✅ 正确。当前最火爆的 AI 技术（如 ChatGPT、Claude）统称为大语言模型（LLM - Large Language Model）。

**考点：** 计算机基础知识、人工智能前沿常识`,
            tags: ["基础知识", "人工智能"]
        },
        {
            id: 2,
            type: 'single',
            question: `下面流程图在 yr 输入 2024 时，可以判定 yr 代表闰年，并输出 2 月是 29 天，则图中菱形框中应该填入（ ）。`,
            options: ["(yr%400==0) || (yr%4==0)", "(yr%400==0) || (yr%4==0 && yr%100!=0)", "(yr%400==0) && (yr%4==0)", "(yr%400==0) && (yr%4==0 && yr%100!=0)"],
            answer: 1,
            score: 2,
            explanation: `**答案：B ((yr%400==0) || (yr%4==0 && yr%100!=0))**

**解析：**
闰年的判定标准：
1. **四年一闰**：年份能被 4 整除。
2. **百年不闰**：但在能被 4 整除的前提下，不能被 100 整除。
3. **四百年再闰**：如果能被 400 整除，则又是闰年。
综合公式即为：\`(yr % 4 == 0 && yr % 100 != 0) || (yr % 400 == 0)\`。

**考点：** 逻辑运算符的应用、闰年判定的经典逻辑`,
            tags: ["条件判断", "程序分析"]
        },
        {
            id: 3,
            type: 'single',
            question: `在 C++ 中，下列不可做变量名的是（ ）。`,
            options: ["five-Star", "five_star", "fiveStar", "_fiveStar"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (five-Star)**

**选项逐项分析：**
- **A five-Star**：✅ 正确（不可做变量名）。C++ 标识符只能包含字母、数字和下划线。减号 \`-\` 在 C++ 中是算术运算符，不能出现在变量名中。
- **B / C / D**：❌ 错误。都是合法的标识符命名形式。

**考点：** C++ 标识符命名规则`,
            tags: ["变量与标识符"]
        },
        {
            id: 4,
            type: 'single',
            question: `在 C++ 中，与 for(int i=0; i<10; i++) 效果相同的是（ ）。`,
            options: ["for(int i=0; i<10; i+=1)", "for(int i=1; i<=10; i++)", "for(int i=10; i>0; i--)", "for(int i=10; i<1; i++)"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (for(int i=0; i<10; i+=1))**

**选项逐项分析：**
- **A**：✅ 正确。\`i++\`、\`++i\` 和 \`i += 1\` 在 for 循环的迭代部分效果是完全等价的，都是使变量 \`i\` 增加 1。
- **B**：❌ 错误。循环次数虽然也是 10，但 \`i\` 的取值范围（1-10）与原循环（0-9）不同。
- **C**：❌ 错误。这是递减循环。
- **D**：❌ 错误。初始值 10 已经不满足 \`i < 1\`，循环不会执行。

**考点：** for 循环的组成部分、运算符的等价性`,
            tags: ["循环"]
        },
        {
            id: 5,
            type: 'single',
            question: `在 C++ 中，\`cout << (5 % 2 && 5 % 3)\` 的输出是（ ）。`,
            options: ["1", "2", "true", "false"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (1)**

**解析：**
1. 首先计算算术运算：\`5 % 2 = 1\`，\`5 % 3 = 2\`。
2. 接着进行逻辑与运算：\`1 && 2\`。
3. 在 C++ 逻辑运算中，非零值视为真。因此 \`真 && 真\` 结果为 \`true\`。
4. \`cout\` 在输出布尔类型时，默认会输出对应的整数，\`true\` 输出为 1。

**考点：** 运算符优先级、逻辑真假的数值判定、布尔值的输出特性`,
            tags: ["条件判断", "运算符"]
        },
        {
            id: 6,
            type: 'single',
            question: `执行下面的 C++ 代码时输入 1，则输出是（ ）。\n\`\`\`cpp\nint month;\ncin >> month;\nswitch(month){\n    case 1: cout << "Jan ";\n    case 3: cout << "Mar "; break;\n    default: ;\n}\n\`\`\``,
            options: ["Jan", "Mar", "Jan Mar", "以上均不对"],
            answer: 2,
            score: 2,
            explanation: `**答案：C (Jan Mar)**

**解析：**
1. 输入 \`month = 1\`，程序匹配到 \`case 1\`。
2. 输出 \`Jan \`。
3. **关键点**：\`case 1\` 后面没有 \`break\` 语句。程序会发生“穿透（Fall-through）”，继续执行后续的 \`case 3\` 代码块。
4. 执行 \`case 3\`，输出 \`Mar \`。
5. 遇到 \`break\`，退出 \`switch\`。
6. 最终输出为 \`Jan Mar \`。

**考点：** switch 语句的匹配机制与 break 缺失导致的穿透现象`,
            tags: ["分支结构"]
        },
        {
            id: 7,
            type: 'single',
            question: `执行下面 C++ 代码后，有关说法错误的是（ ）。\n\`\`\`cpp\nint a, b;\ncin >> a >> b;\nif (a && b) cout << "1";\nelse if (!(a || b)) cout << "2";\nelse if (a || b) cout << "3";\nelse cout << "4";\n\`\`\``,
            options: ["如果先后输入 1 和 1 ，则将输出 1", "如果先后输入 0 和 1 或者 1 和 0 ，则将输出 3", "如果先后输入 0 和 0 ，则将输出 2", "如果先后输入 0 和 0 ，则将输出 4"],
            answer: 3,
            score: 2,
            explanation: `**答案：D (如果先后输入 0 和 0 ，则将输出 4)**

**选项逐项分析：**
- **A (1, 1)**：❌ 错误（该说法**正确**）。满足第一个 \`if (a && b)\`。
- **B (0, 1 / 1, 0)**：❌ 错误（该说法**正确**）。第一个不满足，第二个 \`!(a||b)\` 为假，第三个 \`a||b\` 为真，输出 3。
- **C (0, 0)**：❌ 错误（该说法**正确**）。\`a||b\` 为 0，\`!(0)\` 为真，满足第二个 \`else if\`。
- **D (0, 0)**：✅ 正确（该说法**错误**）。如上分析，输出应为 2 而非 4。

**考点：** 多重 if-else 分支追踪、逻辑非与或逻辑的综合判定`,
            tags: ["分支结构", "逻辑运算"]
        },
        {
            id: 8,
            type: 'single',
            question: `某货币由 5 元， 2 元和 1 元组成。若输入总金额 N，要求计算出组合该金额所需的最少硬币数量。横线处应填入代码是（ ）。\n\`\`\`cpp\nint M5 = N / 5;\nint M2 = ________;\nint M1 = ________;\n\`\`\``,
            options: ["第 1 空：N / 2；第 2 空：N-M5-M2", "第 1 空：(N-M5 * 5) / 2；第 2 空：N-M5 * 5-M2 * 2", "第 1 空：N-M5 * 5 / 2；第 2 空：N-M5 * 5-M2 * 2", "第 1 空：(N-M5 * 5) / 2；第 2 空：N-M5-M2"],
            answer: 1,
            score: 2,
            explanation: `**答案：B**

**解析：**
为了使硬币总数最少，应当尽可能先使用大面值的硬币（贪心算法）。
1. 先计算能用多少个 5 元：\`M5 = N / 5\`。
2. 剩余金额为 \`N - M5 * 5\`。
3. 从剩余金额中计算能用多少个 2 元：\`M2 = (N - M5 * 5) / 2\`。
4. 最后剩下的金额全部用 1 元：\`M1 = N - M5 * 5 - M2 * 2\`。

**考点：** 基础算法（贪心策略）、算术取整与取模思想的程序实现`,
            tags: ["程序分析"]
        },
        {
            id: 9,
            type: 'single',
            question: `下面 C++ 代码用于输出 1-100 之间能被 3 整除的数，横线处应填入（ ）。\n\`\`\`cpp\nfor (int i = 1; i <= 100; i++) {\n    if (____) cout << i << " ";\n}\n\`\`\``,
            options: ["i % 3 == 0", "i / 3 == 0", "i % 3 = 0", "i / 3 = 0"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (i % 3 == 0)**

**选项逐项分析：**
- **A**：✅ 正确。\`%\` 是取模运算符，\`==\` 是相等比较。
- **B**：❌ 错误。这判断的是商是否为 0。
- **C / D**：❌ 错误。单等号 \`=\` 是赋值，不能用在条件判断。

**考点：** 整除判断、比较运算符与赋值运算符的区别`,
            tags: ["运算符", "整除判断"]
        },
        {
            id: 10,
            type: 'single',
            question: `下面 C++ 代码执行后，loopCount 的输出是（ ）。\n\`\`\`cpp\nint loopCount = 0;\nfor (int i = 0; i < 10; i++) {\n    for (int j = 0; j < i; j++) {\n        if (i * j % 2) break;\n    }\n    loopCount += 1;\n}\ncout << loopCount;\n\`\`\``,
            options: ["10", "45", "18", "25"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (10)**

**解析：**
观察 \`loopCount += 1\` 的位置。它位于外层循环体中，且在内层循环**结束之后**执行。
不管内层循环执行多少次，或者是中途 \`break\` 退出，只要外层循环正常运行到这一行，\`loopCount\` 就会增加 1。
外层循环从 0 到 9 执行了 10 次，因此输出结果为 10。

**考点：** 嵌套循环的结构分析、变量更新位置的判定`,
            tags: ["嵌套循环"]
        },
        {
            id: 11,
            type: 'single',
            question: `关于 while(N) 循环的说法，若 N 为正整数且循环体内没有修改 N 的值，说法正确的是（ ）。`,
            options: ["该循环一次都不会执行", "该循环执行一次后退出", "该循环将成为死循环", "该循环能否执行取决于 N 是否为偶数"],
            answer: 2,
            score: 2,
            explanation: `**答案：C (该循环将成为死循环)**

**解析：**
1. 在 C++ 中，正整数在逻辑判定时视为“真（true）”。
2. \`while(N)\` 会一直检查 \`N\` 是否为真。
3. 如果循环体内没有代码去修改 \`N\` 的值，那么判定条件将永远为真，导致循环无限制地运行下去，即“死循环”。

**考点：** while 循环的执行逻辑、死循环的产生原因`,
            tags: ["循环"]
        },
        {
            id: 12,
            type: 'single',
            question: `在 C++ 中，关于质数判定的说法，正确的是（ ）。`,
            options: ["1 是最小的质数", "判定质数只需循环到 N/2 即可，不需要包含 N/2", "0 可以作为 N % i 的除数进行判定", "判定一个大于 1 的正整数是否为质数，通常循环到其平方根即可"],
            answer: 3,
            score: 2,
            explanation: `**答案：D (判定一个大于 1 的正整数是否为质数，通常循环到其平方根即可)**

**选项逐项分析：**
- **A**：❌ 错误。质数定义为大于 1 的自然数。
- **B**：❌ 错误。如果循环到 \`N/2\`，必须包含 \`N/2\`（例如判断 4 时）。
- **C**：❌ 错误。除数不能为 0。
- **D**：✅ 正确。如果 $N$ 是合数，它必有一个因子小于等于 $\\sqrt{N}$。

**考点：** 质数判定的数学原理、循环效率优化`,
            tags: ["质数判定"]
        },
        {
            id: 13,
            type: 'single',
            question: `执行下面 C++ 代码后，输出的结果形状是（ ）。\n\`\`\`cpp\nfor (int i = 1; i < 6; i++) {\n    for (int j = 1; j < i + 1; j++)\n        cout << "*";\n    cout << endl;\n}\n\`\`\``,
            options: ["直角三角形", "正方形", "平行四边形", "只有一行星号"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (直角三角形)**

**解析：**
1. \`i=1\`: 打印 1 个星号。
2. \`i=2\`: 打印 2 个星号。
...
5. \`i=5\`: 打印 5 个星号。
每一行比上一行多一个，且靠左对齐，形成典型的直角三角形。

**考点：** 嵌套循环生成图形、行与列索引的关系`,
            tags: ["嵌套循环"]
        },
        {
            id: 14,
            type: 'single',
            question: `执行以下代码，输出结果是（ ）。\n\`\`\`cpp\nint a = 5, b = 2;\nif (a > b) a = a - b;\nif (a < b) a = a + b;\ncout << a << b;\n\`\`\``,
            options: ["52", "32", "55", "35"],
            answer: 1,
            score: 2,
            explanation: `**答案：B (32)**

**解析：**
1. 初始 $a=5, b=2$。
2. 第一个 \`if (5 > 2)\` 成立，执行 \`a = 5 - 2 = 3\`。此时 $a=3$。
3. 第二个 \`if (3 < 2)\` 不成立，不执行。
4. 最后输出 $a$ 和 $b$，即 \`32\`。

**考点：** 连续 if 分支的独立判定、变量值更新追踪`,
            tags: ["变量追踪"]
        },
        {
            id: 15,
            type: 'single',
            question: `判断 21 是否为 7 的相关数（指能被整除或数位中包含 7），说法正确的是（ ）。`,
            options: ["是相关数，因为它能被 7 整除", "不是相关数，因为 2+1 不等于 7", "是相关数，因为 21 的某位是 7", "不是相关数，因为它不满足整除条件"],
            answer: 0,
            score: 2,
            explanation: `**答案：A (是相关数，因为它能被 7 整除)**

**解析：**
根据题意（相关数定义：能被整除 OR 包含该数字）：
1. \`21 % 7 == 0\`，满足整除条件。
2. 虽然数位 2, 1 中不含 7，但只要满足其中一个条件即为相关数。

**考点：** 逻辑或条件的综合应用、数位分离概念`,
            tags: ["数位分离"]
        },
        {
            id: 16,
            type: 'judge',
            question: `执行 C++ 代码 \`cout << '9' + '1';\` 的输出为 10。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
\`'9'\` 和 \`'1'\` 都是字符字面量，在参与算术运算时会转换为对应的 ASCII 码：
- \`'9'\` 的 ASCII 码是 57。
- \`'1'\` 的 ASCII 码是 49。
执行 \`57 + 49\` 结果为 \`106\`。\`cout\` 会输出这个整数值，而不是字符串 "10"。

**考点：** 字符的 ASCII 码运算、Integral Promotion 规则`,
            tags: ["判断题"]
        },
        {
            id: 17,
            type: 'judge',
            question: `C++ 表达式 \`-12 % 10\` 的值为 2。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在 C++ 及其所遵循的 C 标准中，取模运算 \`%\` 的结果符号与**被除数**（左操作数）一致。
由于被除数是 \`-12\`，因此结果为 \`-2\`，而不是 \`2\`。

**考点：** 负数取模运算的符号规定`,
            tags: ["判断题"]
        },
        {
            id: 18,
            type: 'judge',
            question: `C++ 表达式 \`int(12.56)\` 的值为 13。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
C++ 强制类型转换为 \`int\` 时，采用的是**直接截断**（Truncation）策略，即简单粗暴地丢弃小数部分，不进行四舍五入。
因此 \`int(12.56)\` 的结果是 12。

**考点：** 类型强制转换的数值处理规则`,
            tags: ["判断题"]
        },
        {
            id: 19,
            type: 'judge',
            question: `C++ 的整型变量 N 被赋值为 10，则语句 \`cout << N / 3 << "-" << N % 3\` 执行后输出是 3-1。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1. \`N / 3\`: 整数除法 \`10 / 3\` 结果为 3。
2. \`N % 3\`: 取模运算 \`10 % 3\` 结果为 1。
3. 拼接输出即为 \`3-1\`。

**考点：** 整数除法与取模的基本运算`,
            tags: ["判断题"]
        },
        {
            id: 20,
            type: 'judge',
            question: `在 C++ 代码中，不可以将变量命名为 \`scanf\`，因为 \`scanf\` 是 C++ 语言的关键字。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
\`scanf\` 是 C 标准库中的一个**函数名**（定义在 \`<cstdio>\` 或 \`<stdio.h>\` 中），它并不是 C++ 语言定义的保留**关键字**。
虽然为了避免冲突不建议这样做，但在语法上，如果没包含对应的头文件，\`scanf\` 是可以作为合法标识符使用的。

**考点：** 关键字与库函数标识符的区别`,
            tags: ["判断题"]
        },
        {
            id: 21,
            type: 'judge',
            question: `下面 C++ 代码执行后将导致死循环：\`for (int i = 0; i < 10; i++) continue;\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
\`continue\` 的作用是跳过“本次循环体”的剩余部分。在 \`for\` 循环中，执行完 \`continue\` 后，程序会立即跳转到迭代部分（即 \`i++\`），然后再判断条件。
因此，循环会正常增加 \`i\` 到 10 并自然退出，不会造成死循环。

**考点：** continue 关键字在 for 循环中的执行流分析`,
            tags: ["判断题"]
        },
        {
            id: 22,
            type: 'judge',
            question: `下面 C++ 代码执行后将输出 10：\n\`\`\`cpp\nint cnt = 0;\nfor (int i = 0; i < 10; i++)\n    for (int j = 0; j < i; j++) {\n        cnt += 1;\n        break;\n    }\ncout << cnt;\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1. 外层 \`i\` 循环 10 次。
2. 当 \`i = 0\` 时，内层 \`j < 0\` 不执行。
3. 当 \`i = 1, 2, ..., 9\` 时，内层循环只要执行一次（\`cnt += 1\`），就会立即被 \`break\` 终止。
4. 所以内层循环在每一轮外层循环中最多只贡献 1 次 \`cnt++\`。
5. 总执行次数 = 从 \`i=1\` 到 \`i=9\` 的 9 次。最终 \`cnt\` 为 9。

**考点：** 嵌套循环中 break 的作用范围（仅跳出当前最内层）`,
            tags: ["判断题"]
        },
        {
            id: 23,
            type: 'judge',
            question: `下面 C++ 代码执行后，将输出 5：\n\`\`\`cpp\nint cnt = 0;\nfor (int i = 1; i < 5; i++)\n    for (int j = 1; j < i; j++)\n        if (i * j % 2 == 0) cnt++;\ncout << cnt;\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
追踪执行过程：
- \`i = 2, j = 1\`: \`2*1 % 2 == 0\` (True), \`cnt = 1\`。
- \`i = 3, j = 1\`: \`3*1 % 2 == 0\` (False)。
- \`i = 3, j = 2\`: \`3*2 % 2 == 0\` (True), \`cnt = 2\`。
- \`i = 4, j = 1\`: \`4*1 % 2 == 0\` (True), \`cnt = 3\`。
- \`i = 4, j = 2\`: \`4*2 % 2 == 0\` (True), \`cnt = 4\`。
- \`i = 4, j = 3\`: \`4*3 % 2 == 0\` (True), \`cnt = 5\`。
最终输出确为 5。

**考点：** 嵌套循环边界分析与数值逻辑判定`,
            tags: ["判断题"]
        },
        {
            id: 24,
            type: 'judge',
            question: `下面 C++ 代码能实现正整数 N 各位数字之和：\n\`\`\`cpp\nwhile(N) {\n    Sum += N % 10;\n    N /= 10;\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
这是经典的数位分离累加算法。\`N % 10\` 提取个位数字，\`N /= 10\` 丢弃个位并进位。循环直到 \`N\` 变为 0 结束。

**考点：** 数位分离算法的原理`,
            tags: ["判断题"]
        },
        {
            id: 25,
            type: 'judge',
            question: `在 C++ 代码中，\`cout << (5 / 2 + 5 % 3)\` 的输出是 4。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1. \`5 / 2\`: 整数除法结果为 2。
2. \`5 % 3\`: 取模结果为 2。
3. \`2 + 2 = 4\`。
4. 输出结果为 4。

**考点：** 算术运算符优先级与整数运算特性`,
            tags: ["判断题", "运算符", "输入输出"]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: "平方之和",
            samples: [
                {
                    input: `2\n5\n4`,
                    output: `Yes\nNo`
                }
            ],
            question: `
# [GESP202406 二级] 平方之和

## 题目描述

小杨有 $n$ 个正整数 $a_1, a_2, \dots, a_n$，他想知道对于所有的 $i (1 \le i \le n)$，是否存在两个正整数 $x$ 和 $y$ 满足 $x \times x + y \times y = a_i$。

## 输入格式

第一行包含一个正整数 $n$，代表正整数数量。
之后 $n$ 行，每行包含一个正整数，代表 $a_i$。

## 输出格式

对于每个正整数 $a_i$，如果存在两个正整数 $x$ 和 $y$ 满足 $x \times x + y \times y = a_i$，输出 \`Yes\`，否则输出 \`No\`。
`,
            score: 25,
            explanation: `**解析：**
本题考察枚举与完全平方数判定。
1. **题目要求**：寻找两个**正整数**（即 $x, y \ge 1$）使得其平方和等于 $a_i$。
2. **算法设计**：
   - 对于每一个输入的数 $a$，我们枚举其中一个数 $x$。
   - $x$ 的范围是从 1 到 $\sqrt{a-1}$。
   - 计算 $y\_sq = a - x^2$。
   - 判断 $y\_sq$ 是否为一个完全平方数，且开方后的 $y \ge 1$。
3. **优化**：只需枚举 $x$ 使得 $x^2 < a$。

**核心逻辑提示：**
\`\`\`cpp
for (int x = 1; x * x < a; x++) {
    int y_sq = a - x * x;
    int y = sqrt(y_sq);
    if (y > 0 && y * y == y_sq) {
        found = true;
        break;
    }
}
\`\`\``,
            tags: ["编程题", "枚举", "完全平方数"],
            template: "#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    while(n--) {\n        long long a; cin >> a;\n        bool ok = false;\n        for (long long x = 1; x * x < a; x++) {\n            long long y2 = a - x * x;\n            long long y = sqrt(y2);\n            if (y > 0 && y * y == y2) { ok = true; break; }\n        }\n        if (ok) cout << \"Yes\" << endl;\n        else cout << \"No\" << endl;\n    }\n    return 0;\n}"
        },
        {
            id: 27,
            type: 'programming',
            title: "计数",
            samples: [
                {
                    input: `25\n2`,
                    output: `9`
                }
            ],
            question: `
# [GESP202406 二级] 计数

## 题目描述

小杨认为自己的幸运数是正整数 $k$（注：保证 $1 \le k \le 9$）。小杨想知道，对于从 $1$ 到 $n$ 的所有正整数中，$k$ 出现了多少次。

## 输入格式

第一行包含一个正整数 $n$。
第二行包含一个正整数 $k$。

## 输出格式

输出从 $1$ 到 $n$ 的所有正整数中，$k$ 出现的次数。
`,
            score: 25,
            explanation: `**解析：**
本题考察循环遍历与数位拆解。
1. **遍历范围**：从 1 到 $n$ 枚举每一个数。
2. **拆解逻辑**：
   - 对于当前的数 \`temp\`，使用 \`while(temp)\` 循环。
   - 提取末位：\`digit = temp % 10\`。
   - 判断：如果 \`digit == k\`，计数器加 1。
   - 进位：\`temp /= 10\`。
3. **输出**：打印最终的计数值。

**核心代码思路：**
\`\`\`cpp
long long count = 0;
for (int i = 1; i <= n; i++) {
    int temp = i;
    while (temp > 0) {
        if (temp % 10 == k) count++;
        temp /= 10;
    }
}
\`\`\``,
            tags: ["编程题", "枚举", "数位统计"],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int n, k;\n    cin >> n >> k;\n    long long ans = 0;\n    for (int i = 1; i <= n; i++) {\n        int t = i;\n        while (t > 0) {\n            if (t % 10 == k) ans++;\n            t /= 10;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}"
        }
    ]
};
