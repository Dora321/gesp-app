import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2025-09-l1',
  title: '2025年09月 GESP C++ 一级认证真题',
  level: 1,
  year: 2025,
  month: 9,
  session: 11,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    type: 'public-recovery',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `人工智能现在非常火，小杨就想多了解一下，其中就经常听人提到"大模型"。那么请问这里说的"大模型"最贴切意指( )。`,
      options: ['大电脑模型', '大规模智能', '智能单位', '大语言模型'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

      **解析：**
      在人工智能领域，"大模型"通常指大语言模型（Large Language Models），如 GPT 系列。其核心特征是基于海量文本数据训练、具有大规模参数的深度学习模型。

      - **A 大电脑模型**：❌ 错误。该选项不满足条件，正确情况应为："大模型"不是指电脑硬件模型，而是软件层面的 AI 模型。
      - **B 大规模智能**：❌ 错误。该选项不满足条件，正确情况应为："大规模"修饰的是模型参数和数据量，不是"智能"本身。
      - **C 智能单位**：❌ 错误。该选项不满足条件，正确情况应为："大模型"不是度量智能的单位，而是一种具体的 AI 技术。
      - **D 大语言模型**：正确答案。大模型的全称是大语言模型（LLM），以自然语言处理为核心能力。

      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: `小杨这学期刚开学就选修了一门编程课程，然后就想编写程序来计算1到10001之间的所有偶数的和。他希望程序用简单易懂且执行效率高，请问下列关于实现该程序时采用的主要控制结构哪个说法最不合适 ( )。`,
      options: ['循环结构', '循环和分支结合', '仅使用顺序结构', '不使用分支结构'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

      **解析：**
      计算 1 到 10001 之间的偶数和需要重复操作（遍历+累加），必须使用循环结构。仅用顺序结构（一条一条写语句）无法高效实现这种重复计算。

      - **A 循环结构**：错误（即说法合适，不是"最不合适"选项）。循环是解决重复计算的核心结构。
      - **B 循环和分支结合**：错误（即说法合适）。用循环遍历，用分支判断偶数，是常见做法。
      - **C 仅使用顺序结构**：正确答案（这是"最不合适"的说法）。顺序结构无法高效处理重复操作，写 5000 条加法语句既不简单也不高效。
      - **D 不使用分支结构**：错误（即说法合适）。可以只循环偶数（i+=2），不需要分支判断。

      **考点：** 循环、基础语法`,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: `关于下边的C++代码用于输入姓名，然后输出姓名，正确的说法是( )。\n\`\`\`cpp\nstring XingMing;\ncout << "请输入您的姓名：";\ncin >> XingMing;\ncout << XingMing;\n\`\`\``,
      options: [
        'XingMing 是汉语拼音，不能作为变量名',
        '可以将 XingMing 改为 Xing Ming',
        '可以将 XingMing 改为 xingming',
        '可以将 XingMing 改为 Xing-Ming'
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

      **解析：**
      C++ 标识符只能由字母、数字和下划线组成，不能包含空格或连字符。汉语拼音可以作为变量名。

      - **A XingMing 是汉语拼音，不能作为变量名**：❌ 错误。该选项不满足条件，正确情况应为：C++ 对变量名的内容没有限制，汉语拼音是合法的标识符。
      - **B 可以将 XingMing 改为 Xing Ming**：❌ 错误。该选项不满足条件，正确情况应为：变量名不能包含空格，\`Xing Ming\` 会被编译器当作两个标识符。
      - **C 可以将 XingMing 改为 xingming**：正确答案。\`xingming\` 全部由字母组成，是合法的标识符。
      - **D 可以将 XingMing 改为 Xing-Ming**：❌ 错误。该选项不满足条件，正确情况应为：连字符 \`-\` 会被当作减号运算符，不是合法的标识符字符。

      **考点：** 基础语法、输入输出`,
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.io]
    },
    {
      id: 4,
      type: 'single',
      question: `下列C++代码中a和b都是整型变量，执行后，其结果是( )。\n\`\`\`cpp\na = 13;\nb = 5;\ncout << a / b << a % a * b;\n\`\`\``,
      options: ['2.60', '23', '20', '以上都不准确'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

      **解析：**
      \`a / b = 13 / 5 = 2\`（整除）；\`a % a = 13 % 13 = 0\`；\`0 * 5 = 0\`。cout 连续输出 2 和 0，显示为 \`20\`。

      - **A 2.60**：❌ 错误。该选项不满足条件，正确情况应为：整型除法会截断小数部分，不会得到 2.60。
      - **B 23**：❌ 错误。该选项不满足条件，正确情况应为：可能误算为 \`a / b = 2\`，\`a % b = 3\`，但第二个表达式是 \`a % a * b\` 不是 \`a % b\`。
      - **C 20**：正确答案。\`a/b=2\`，\`a%a*b=0*5=0\`，连续输出 20。
      - **D 以上都不准确**：❌ 错误。该选项不满足条件，正确情况应为：C 选项 20 是正确的。

      **考点：** 运算符、基础语法`,
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 5,
      type: 'single',
      question: `C++表达式 3 * 4 % 5 / 6 的值是( )。`,
      options: ['10', '5', '2', '0'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

      **解析：**
      \`*\`、\`%\`、\`/\` 同级，从左到右计算：\`3 * 4 = 12\`；\`12 % 5 = 2\`；\`2 / 6 = 0\`（整除，2 小于 6，商为 0）。

      - **A 10**：❌ 错误。该选项不满足条件，正确情况应为：可能误将运算顺序搞错，或忽略了取模和整除。
      - **B 5**：❌ 错误。该选项不满足条件，正确情况应为：可能误算为 \`3 * 4 / 5 % 6 = 12/5%6 = 2%6 = 2\`，运算顺序不对。
      - **C 2**：❌ 错误。该选项不满足条件，正确情况应为：2 是 \`12 % 5\` 的结果，但还要继续除以 6。
      - **D 0**：正确答案。\`2 / 6\` 整除结果为 0。

      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 6,
      type: 'single',
      question: `下面的C++代码中变量 N 和 M 都是整型，则执行时如果先输入10并输入1个空格后输入20并回车，其输出的数值是( )。\n\`\`\`cpp\nscanf("%d", &N);\nscanf("%d", &M);\nprintf("%d", N+M);\n\`\`\``,
      options: ['30', '1020', '{N+M}', '不输出，继续等待输入'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

      **解析：**
      scanf 以空格作为分隔符读取整数，N=10, M=20，N+M=30。

      - **A 30**：正确答案。scanf 正确读入两个整数后计算输出 30。
      - **B 1020**：❌ 错误。该选项不满足条件，正确情况应为：scanf 不会将输入拼接为字符串，而是分别读取两个整数。
      - **C {N+M}**：❌ 错误。该选项不满足条件，正确情况应为：printf 中的 \`%d\` 会被替换为计算结果，不会原样输出变量名。
      - **D 不输出，继续等待输入**：❌ 错误。该选项不满足条件，正确情况应为：空格是 scanf 的有效分隔符，不会导致等待。

      **考点：** 输入输出、基础语法`,
      tags: [LEVEL1_TAGS.io, LEVEL1_TAGS.basics]
    },
    {
      id: 7,
      type: 'single',
      question: `当前是9月，编写C++代码求 N 个月后的月份。横线处应填入的代码是 ( )。\n\`\`\`cpp\nint N, M;\ncin >> N;\nM = ________;\nif (M == 0) printf("%d个月后是12月", N);\nelse printf("%d个月后是%d月", N, M);\n\`\`\``,
      options: ['N % 12', '9+N % 12', '(9+N) / 12', '(9+N) % 12'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

      **解析：**
      月份是 1~12 的循环，用取余运算处理。\`(9+N) % 12\` 能正确得到 N 个月后的月份，余数 0 对应 12 月（由 if 分支处理）。

      - **A N % 12**：❌ 错误。该选项不满足条件，正确情况应为：没有加上当前月份 9，算的是 N 除以 12 的余数，不是 N 个月后的月份。
      - **B 9+N % 12**：❌ 错误。该选项不满足条件，正确情况应为：\`%\` 优先级高于 \`+\`，实际计算为 \`9 + (N%12)\`，不是 \`(9+N)%12\`。
      - **C (9+N) / 12**：❌ 错误。该选项不满足条件，正确情况应为：整除得到的是经过了多少轮 12 个月，不是月份值。
      - **D (9+N) % 12**：正确答案。当前月份加 N 后取余 12，余数 0~11 对应月份。

      **考点：** 运算符、基础语法`,
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 8,
      type: 'single',
      question: `下面C++代码执行后的输出是 ( )。\n\`\`\`cpp\nint n = 0;\nfor (int i = 0; i < 100; i++)\n n += i % 2;\ncout << n;\n\`\`\``,
      options: ['5050', '4950', '50', '49'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

      **解析：**
      循环 100 次，\`i % 2\` 在偶数时为 0、奇数时为 1，交替出现。100 次中有 50 个奇数，所以 n = 50。

      - **A 5050**：❌ 错误。该选项不满足条件，正确情况应为：5050 是 0+1+2+...+99 的和，但这里每次加的是 \`i%2\`（0 或 1），不是 i 本身。
      - **B 4950**：❌ 错误。该选项不满足条件，正确情况应为：4950 是 1+2+...+99-50 的某种误算，与本题逻辑不符。
      - **C 50**：正确答案。50 个奇数各贡献 1，50 个偶数各贡献 0，总和为 50。
      - **D 49**：❌ 错误。该选项不满足条件，正确情况应为：可能误以为 i 从 1 开始，但 i 从 0 开始，0~99 中有 50 个奇数。

      **考点：** 循环、运算符`,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator]
    },
    {
      id: 9,
      type: 'single',
      question: `C++表达式 abs(1.0)+floor(-1.0) 的值是( )。`,
      options: ['0', '1', '2', '0.0'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

      **解析：**
      \`abs(1.0)\` 为 1.0（浮点数绝对值），\`floor(-1.0)\` 为 -1.0（向下取整）。\`1.0 + (-1.0) = 0.0\`，结果是 double 类型的 0.0。

      - **A 0**：❌ 错误。该选项不满足条件，正确情况应为：0 是 int 类型，但运算结果是 double 类型的 0.0，两者类型不同。
      - **B 1**：❌ 错误。该选项不满足条件，正确情况应为：可能是误算为 \`abs(1.0) + abs(-1.0) = 2\`，但 floor 不是 abs。
      - **C 2**：❌ 错误。该选项不满足条件，正确情况应为：可能混淆了 abs 和 floor 的功能。
      - **D 0.0**：正确答案。浮点数运算结果为 double 类型的 0.0。

      **考点：** 基础语法、运算符`,
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator]
    },
    {
      id: 10,
      type: 'single',
      question: `代码执行后的输出是 ( )。\n\`\`\`cpp\nint a, b;\ncin >> a >> b;\nif (a > b) a = b;\nb = a;\ncout << a << " " << b;\n\`\`\`\n如果输入 10 20：`,
      options: ['10 20', '10 10', '20 20', '20 10'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

      **解析：**
      a=10, b=20。\`a > b\` 为假（10 不大于 20），跳过 \`a = b\`。然后执行 \`b = a\`，b 变为 10。输出 \`10 10\`。

      - **A 10 20**：❌ 错误。该选项不满足条件，正确情况应为：忽略了 \`b = a\` 这行代码，b 被修改为 10。
      - **B 10 10**：正确答案。a 保持 10，b 被赋值为 a 的值 10。
      - **C 20 20**：❌ 错误。该选项不满足条件，正确情况应为：a 没有被修改（if 条件不成立），不会变成 20。
      - **D 20 10**：❌ 错误。该选项不满足条件，正确情况应为：a 保持 10 不变，b 变为 10。

      **考点：** 条件判断、基础语法`,
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.basics]
    },
    {
      id: 11,
      type: 'single',
      question: `代码执行后的输出是 ( )。\n\`\`\`cpp\nint n, ans = 0;\ncin >> n;\nwhile (n > 0) {\n ans = ans * 10+n % 10;\n n /= 10;\n}\ncout << ans;\n\`\`\`\n如果输入 123：`,
      options: ['123', '3', '321', '6'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

      **解析：**
      这是经典的数字反转算法。逐步执行：n=123, ans=0*10+3=3, n=12；n=12, ans=3*10+2=32, n=1；n=1, ans=32*10+1=321, n=0。输出 321。

      - **A 123**：❌ 错误。该选项不满足条件，正确情况应为：原样输出说明没有执行反转操作，但代码确实做了反转。
      - **B 3**：❌ 错误。该选项不满足条件，正确情况应为：3 只是第一轮循环后 ans 的值，循环还会继续处理剩余位。
      - **C 321**：正确答案。123 反转后为 321。
      - **D 6**：❌ 错误。该选项不满足条件，正确情况应为：6 是 1+2+3 的和，这是求数位和的结果，不是反转。

      **考点：** 循环、基础语法`,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.basics]
    },
    {
      id: 12,
      type: 'single',
      question: `代码执行后的输出是 ( )。\n\`\`\`cpp\nfor (int i = 1; i <= 5; i++) {\n if (i % 2 == 0) continue;\n cout << i;\n}\n\`\`\``,
      options: ['12345', '24', '135', '13'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

      **解析：**
      \`continue\` 跳过偶数时的输出。i=1 输出 1，i=2 跳过，i=3 输出 3，i=4 跳过，i=5 输出 5。连续输出 \`135\`。

      - **A 12345**：❌ 错误。该选项不满足条件，正确情况应为：continue 会跳过偶数的输出，不会输出 2 和 4。
      - **B 24**：❌ 错误。该选项不满足条件，正确情况应为：这是偶数序列，但 continue 跳过的是偶数，输出的是奇数。
      - **C 135**：正确答案。只输出奇数 1、3、5。
      - **D 13**：❌ 错误。该选项不满足条件，正确情况应为：遗漏了 i=5 时的输出。

      **考点：** 循环、条件判断`,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    },
    {
      id: 13,
      type: 'single',
      question: `15 % 4+7 / 2 的值是( )。`,
      options: ['6', '6.5', '7', '3'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

      **解析：**
      \`%\` 和 \`/\` 优先级高于 \`+\`，从左到右：\`15 % 4 = 3\`；\`7 / 2 = 3\`（整除）；\`3 + 3 = 6\`。

      - **A 6**：正确答案。\`15%4=3\`，\`7/2=3\`，\`3+3=6\`。
      - **B 6.5**：❌ 错误。该选项不满足条件，正确情况应为：可能误将 7/2 当作 3.5，但整型除法结果为整数 3。
      - **C 7**：❌ 错误。该选项不满足条件，正确情况应为：可能误算为 \`15%4=3\`，\`7/2=4\`（四舍五入），但整除是截断不是四舍五入。
      - **D 3**：❌ 错误。该选项不满足条件，正确情况应为：可能只算了 \`15%4=3\`，忽略了后面的加法。

      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 14,
      type: 'single',
      question: `代码执行后的输出是 ( )。\n\`\`\`cpp\nint n = 10, sum = 0;\nwhile (n > 0) {\n if (n % 3 == 0) break;\n sum += n;\n n--;\n}\ncout << sum;\n\`\`\``,
      options: ['55', '19', '45', '10'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

      **解析：**
      n=10 时，\`10 % 3 = 1 ≠ 0\`，不 break，sum=10，n=9。n=9 时，\`9 % 3 = 0\`，break 跳出循环。输出 sum=10。

      - **A 55**：❌ 错误。该选项不满足条件，正确情况应为：55 是 1+2+...+10 的和，但 break 在 n=9 时就终止了循环。
      - **B 19**：❌ 错误。该选项不满足条件，正确情况应为：19 是 10+9 的和，但 n=9 时 break 在 sum+=n 之前执行，9 没有加到 sum 中。
      - **C 45**：❌ 错误。该选项不满足条件，正确情况应为：45 是 9+8+...+1 的和，但循环在 n=9 时就 break 了。
      - **D 10**：正确答案。只有 n=10 时执行了 \`sum += n\`，n=9 时直接 break。

      **考点：** 循环、条件判断`,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    },
    {
      id: 15,
      type: 'single',
      question: `在 IDE 中调试时，设置断点的目的是( )。`,
      options: ['终止程序运行', '让程序在特定位置暂停', '修改程序源代码', '提高运行速度'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

      **解析：**
      断点用于在调试时让程序运行到指定行暂停，以便观察变量状态和程序执行流程。

      - **A 终止程序运行**：❌ 错误。该选项不满足条件，正确情况应为：断点是暂停不是终止，程序暂停后可以继续执行（F5/继续按钮）。
      - **B 让程序在特定位置暂停**：正确答案。断点的核心功能就是在指定位置暂停执行，方便调试。
      - **C 修改程序源代码**：❌ 错误。该选项不满足条件，正确情况应为：断点不影响源代码，修改代码需要在编辑器中进行。
      - **D 提高运行速度**：❌ 错误。该选项不满足条件，正确情况应为：调试模式反而会降低运行速度，断点不会提速。

      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 16,
      type: 'judge',
      question: `在C++中，变量名必须以字母或下划线开头。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

      **判定依据：**
      C++变量名命名规则：只能由字母、数字和下划线组成，且不能以数字开头。

      **易混概念：** C++ 标识符只能由字母、数字和下划线组成，不能以数字开头，但可以以下划线开头。注意与 Python 等语言区分。

      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: `3 < x < 5 是检查 x 是否在 3 和 5 之间的正确写法。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

      **判定依据：**
      在C++中应写为 x > 3 && x < 5。3 < x < 5 会先计算 3 < x 得到布尔值（0或1），再与 5 比较。

      **纠错：** 原命题说法有误。C++ 不支持数学中的连续比较写法。3 < x < 5 会先算 3 < x 得到 0 或 1，然后 0 或 1 与 5 比较永远为真。

      **易混概念：** C++ 不支持数学中的连续比较写法。3 < x < 5 会先算 3 < x 得到 0 或 1，然后 0 或 1 与 5 比较永远为真。应使用 && 连接两个条件。

      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 18,
      type: 'judge',
      question: `while 循环可能一次都不执行。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

      **判定依据：**
      while 是前测循环，先判断条件再决定是否执行循环体。如果初始条件不满足，循环体一次都不会执行。

      **易混概念：** while 是前测循环（先判断后执行），do-while 是后测循环（先执行后判断）。do-while 至少执行一次，while 可能一次都不执行。

      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 19,
      type: 'judge',
      question: `for 循环的三个部分都可以省略。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

      **判定依据：**
      for(;;) 是合法的死循环，三个部分（初始化、条件、更新）都可以省略，但分号不能省。

      **易混概念：** for 的三个表达式都可以省略，但两个分号必须保留。省略条件表达式时等价于条件永远为真，形成死循环。

      **考点：** 循环`,
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 20,
      type: 'judge',
      question: `1 == 1 的值是 true。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

      **判定依据：**
      关系运算符 == 比较两边是否相等。1 == 1 成立，结果为 true（在 C++ 中即 1）。

      **易混概念：** == 是比较运算符，= 是赋值运算符。if(x=1) 是赋值不是比较，值恒为真（非零）。注意区分 = 和 ==。

      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 21,
      type: 'judge',
      question: `!(3 > 5) 的值是 false。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

      **判定依据：**
      3 > 5 为 false，!false 为 true。所以 !(3 > 5) 的值是 true，不是 false。

      **纠错：** 原命题说法有误。3 > 5 为 false，!false 为 true，所以 !(3 > 5) 的值是 true。

      **易混概念：** 逻辑非 ! 将 true 变 false、false 变 true。注意 !(3>5) 是对整个比较结果取反，不是对 3 取反。

      **考点：** 运算符`,
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 22,
      type: 'judge',
      question: `在C++中，char 类型占1个字节。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

      **判定依据：**
      C++ 标准规定 char 占用 1 个字节（8位），这是最基础的存储单位。

      **易混概念：** char 占 1 字节（-128~127 或 0~255），int 通常占 4 字节，double 占 8 字节。sizeof(char) 恒为 1。

      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 23,
      type: 'judge',
      question: `斐波那契数列第1项是1，第2项是1，则第3项是2。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

      **判定依据：**
      斐波那契数列规律：F(n) = F(n-1) + F(n-2)。F(1)=1, F(2)=1, F(3)=1+1=2。

      **易混概念：** 斐波那契数列的每一项等于前两项之和：1, 1, 2, 3, 5, 8, 13, ...。注意 F(1) 和 F(2) 都是 1。

      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 24,
      type: 'judge',
      question: `代码 if (x = 1) 总是将 x 设置为 1。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

      **判定依据：**
      赋值表达式 x = 1 的值是 1，在 if 中判定为真（非零），且会将 x 的值修改为 1。无论 x 原来是什么值，执行后 x 都为 1。

      **易混概念：** if(x=1) 是赋值不是比较，值恒为真。如果想判断 x 是否等于 1，应写 if(x==1)。这是初学者最常见的错误之一。

      **考点：** 基础语法、条件判断`,
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition]
    },
    {
      id: 25,
      type: 'judge',
      question: `break 只能用于循环中。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

      **判定依据：**
      break 还可以用于 switch 语句中，用于跳出 switch 分支。

      **纠错：** 原命题说法有误。break 可以用于循环（for/while/do-while）和 switch 语句中，不是只能用于循环。

      **易混概念：** break 可以用于循环和 switch，continue 只能用于循环。break 跳出当前层循环/switch，continue 跳过本次循环剩余语句。

      **考点：** 基础语法`,
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `8\n7\n9\n10`, output: `3.00` },
        { input: `8\n7\n2\n11`, output: `2.20` }
      ],
      referenceCode: `#include <iostream>
#include <iomanip>
using namespace std;
int main() {
    long long x, y, n, p;
    cin >> x >> y >> n >> p;
    double p1 = p;
    if (p >= x) p1 -= y;
    double p2 = p * n / 10.0;
    if (p1 < p2) cout << fixed << setprecision(2) << p1 << "\\n";
    else cout << fixed << setprecision(2) << p2 << "\\n";
    return 0;
}`,
      question: `
# [GESP202509 一级] 商店折扣

## 题目描述

商店正在开展促销活动，给出了两种方案的折扣优惠。第一种方案是购物满 $x$ 元减 $y$ 元；第二种方案是直接打 $n$ 折，也就是说价格变为原先的 $n\\div 10$。这里的 $x, y, n$ 均是正整数，并且 $1 \\le y < x$，$1 \\le n < 10$。

需要注意的是，第一种方案中满减优惠只能使用一次。例如购物满 $10$ 元减 $3$ 元时，若挑选了价格总和为 $33$ 元的物品，只能减免 $3$ 元，需要支付 $30$ 元。

小明在商店挑选了价格总和为 $p$ 元的物品，结账时只能使用一种优惠方案。小明最少需要支付多少钱呢？

## 输入格式

四行，四个正整数 $x, y, n, p$，含义见题目描述。

## 输出格式

一行，一个小数，表示小明最少需要支付多少钱，保留两位小数。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: `**解题思路：**

1. 计算方案一：若 \`p >= x\` 则 \`p1 = p - y\`，否则 \`p1 = p\`（满减只能用一次）
2. 计算方案二：\`p2 = p * n / 10.0\`（打 n 折）
3. 取两者最小值：\`min(p1, p2)\`
4. 输出保留两位小数：\`fixed << setprecision(2)\`

**关键点：** 满减只能用一次，不是每满 x 减 y。注意 p*n/10.0 要用浮点除法。`,
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `2`, output: `5` },
        { input: `5`, output: `55` }
      ],
      referenceCode: `#include <iostream>
using namespace std;
int main() {
    long long n;
    cin >> n;
    long long sum = 0;
    for(long long i = 1; i <= n; i++) {
        sum += i * i;
    }
    cout << sum << "\\n";
    return 0;
}`,
      question: `
# [GESP202509 一级] 金字塔

## 题目描述

金字塔由 $n$ 层石块垒成。从塔底向上，每层依次需要 $n \\times n, (n-1) \\times (n-1), \\cdots, 2 \\times 2, 1 \\times 1$ 块石块。请问搭建金字塔总共需要多少块石块？

## 输入格式

一行，一个正整数 $n$，表示金字塔的层数。

## 输出格式

一行，一个正整数，表示搭建金字塔所需的石块数量。
`,
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: `**解题思路：**

1. 读入层数 n
2. 循环 i 从 1 到 n，累加 \`i * i\` 到 sum
3. 输出 sum

**关键点：** 结果可能很大，用 long long 避免溢出。公式为 1²+2²+...+n²，也可用公式 n(n+1)(2n+1)/6 直接计算。`,
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    }
  ]
};
