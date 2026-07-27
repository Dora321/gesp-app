// 2025年3月 GESP C++ 二级真题 (第9次认证)
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照 CCF GESP 原卷镜像校订。
// 镜像文件的 git blob 为 0c7122676556eb84513dbaaa55b2899eeeddc6f6
//（1291427 字节），与 paperSources.js 登记值一致。
//
// 客观题答案均取自原卷答案表：
//   单选题：D C A A D A D A C B C D B C C
//   判断题：√ √ √ × √ √ √ √ √ ×
// 判断题答案表在 PDF 第 6 页以红色矢量记号呈现，已渲染后逐格人工读取，
// 并对 10 道判断题逐题独立推理。
//
// 原卷自身存在一处措辞缺陷，已忠实保留并停止计分：
//   Q27：输入、输出格式均称所有数为“正整数”，但 h、h' 可以为 0，
//        且原卷样例输出中的 h' 正是 0。
const SOURCE_URL = 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf';
const REVIEWED_BY = '本站校订';
const REVIEWED_AT = '2026-07-27';

export const paperData = {
    id: '2025-03-l2',
    title: '2025年3月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 90 * 60,
    source: {
        officialPdf: SOURCE_URL,
        type: 'archived-official',
        notes: '题面、代码、选项、答案表、输出图示、编程题样例、约束与参考程序均按 CCF GESP 原卷镜像逐页转录；Q27 的原卷措辞缺陷已结构化标记。',
    },
    reviewStatus: 'verified',
    reviewScope: '全卷 27 题（单选 15 + 判断 10 + 编程 2）的题面、代码、选项、答案、解析、输出图示，以及两道编程题的题意、约束、样例与原卷参考程序，均已逐题核验；Q27 因原卷将可能为 0 的小时称为正整数而从评分排除。',
    reviewedBy: '本站校订',
    reviewedAt: '2026-07-27',
    verification: {
        status: 'verified',
        reviewedBy: '本站校订',
        reviewedAt: '2026-07-27',
        scope: '全卷 27 题均已逐题对照 CCF GESP 原卷镜像核验；单选题答案取自第 1 页答案表，判断题答案按第 6 页红色矢量标记逐格读取并独立推理；Q27 保留原卷措辞缺陷并停止计分。',
        dimensions: {
            statement: 'verified',
            options: 'verified',
            answer: 'verified',
            explanation: 'verified',
            referenceCode: 'verified',
        },
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: `2025年春节有两件轰动全球的事件，一个是DeepSeek横空出世，另一个是贺岁片《哪吒2》票房惊人，入了全球票房榜。下面关于DeepSeek与《哪吒2》的描述成立的是（ ）。`,
            options: ['《哪吒2》是一款新型操作系统', 'DeepSeek是深海钻探软件', '《哪吒2》可以生成新的软件', 'DeepSeek可以根据《哪吒2》的场景生成剧情脚本'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（DeepSeek可以根据《哪吒2》的场景生成剧情脚本）**

**推导过程：** DeepSeek 是能够理解和生成自然语言内容的人工智能模型，根据给定场景续写或生成剧情脚本属于文本生成任务，因此 D 成立。

**选项分析：**
- A 错：《哪吒2》是动画电影，不是操作系统。
- B 错：DeepSeek 是人工智能模型及相关产品，不是深海钻探软件。
- C 错：电影作品本身不能执行“生成软件”的操作。
- D 对：给模型提供场景信息后生成脚本文本，符合大语言模型的能力范围。

**易错点：** 不能只根据名称中的 “Deep” 猜测用途，应先判断对象属于电影、软件还是人工智能模型。

**最小验证：** 给出“哪吒与敖丙在海边相遇”这一场景并要求续写三句对白，这是一个可由文本生成模型完成的任务。`,
            tags: ['计算机基础'],
        },
        {
            id: 2,
            type: 'single',
            question: `对整型变量N，如果它能够同时被3和5整除，则输出“N是含有至少两个质因数”。如果用流程图来描述处理过程，则输出语句应该在哪种图形框中（ ）。`,
            options: ['圆形框', '椭圆形框', '平行四边形框', '菱形框'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（平行四边形框）**

**推导过程：** 标准流程图用平行四边形表示输入或输出；题目问的是输出一段文字，所以应放在平行四边形中。

**选项分析：**
- A 错：圆形通常用作连接点，不表示输出。
- B 错：椭圆形通常表示开始或结束。
- C 对：平行四边形表示输入、输出操作。
- D 错：菱形表示条件判断，本题中的“能否同时整除”可以放入菱形，但输出语句不能。

**易错点：** 题目问的是“输出语句”所在图形，不是前面的判断条件所在图形。

**最小验证：** 在“输入 N → 判断 N%3==0 且 N%5==0 → 输出文字”中，输入和输出两步都使用平行四边形，判断使用菱形。`,
            tags: ['流程图'],
        },
        {
            id: 3,
            type: 'single',
            question: `下面C++代码执行，其输出是（ ）。\n\n\`\`\`cpp\nint a=3, b = 4;\na == b;\nb == a;\ncout << a << ' ' << b << endl;\n\`\`\``,
            options: ['3 4', '3 3', '4 4', '4 3'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（\`3 4\`）**

**推导过程：** \`a == b\` 和 \`b == a\` 都是相等比较表达式，只会计算出 \`false\`，结果随后被丢弃；它们不是赋值语句，不会改变任何变量。因此输出时仍有 \`a=3\`、\`b=4\`。

**选项分析：**
- A 对：两个变量都保持初值。
- B 错：没有语句把 3 赋给 \`b\`。
- C 错：没有语句把 4 赋给 \`a\`。
- D 错：比较不会交换变量；交换需要赋值或 \`swap\`。

**易错点：** \`==\` 是比较，\`=\` 才是赋值；单独写一个比较表达式在语法上合法，但其结果没有被使用。

**最小验证：** 执行第一行后记录 \`(a,b)=(3,4)\`；两次比较后记录仍为 \`(3,4)\`。`,
            tags: ['运算符', '程序分析'],
        },
        {
            id: 4,
            type: 'single',
            question: `求三色彩球的颜色。有数量无限的红(Red)绿(Green)蓝(Blue)三种彩球排成一行，每组先为5个红色球，随后3个绿色，最后为2个蓝色。每个球都有编号，从左到右依次为1,2,3……。输入整数代表编号，求该编号球的颜色。下面是C++代码实现，正确说法是（ ）。\n\n\`\`\`cpp\nint N, remainder;\ncin >> N;\nremainder = N % 10; // remainder变量保存余数\n\nif((1 <= remainder) && (remainder <= 5))\n    cout << "Red";\nelse if ((6 <= remainder) && (remainder <= 8))\n    cout << "Green";\nelse if ((remainder == 9) || (remainder == 0))\n    cout << "Blue";\n\`\`\``,
            options: [
                '将 else if ((remainder == 9) || (remainder == 0)) 修改为 else 效果相同',
                '将 ((1 <= remainder) && (remainder <= 5)) 修改为 (remainder <= 5) 效果相同',
                'else if ((6 <= remainder) && (remainder <= 8)) 写法错误，应修改为 else if (6 <= remainder <= 8)',
                '根据题意 remainder = N % 10 应修改为 remainder = N / 10',
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1, 2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（最后一个 \`else if\` 可改为 \`else\`）**

**推导过程：** 正整数 \`N\` 对 10 取余后，\`remainder\` 只可能是 0 到 9。前两个分支已经覆盖 1 到 8，走到最后一个分支时只可能剩下 0 或 9，所以直接写 \`else\` 效果相同。

**选项分析：**
- A 对：前两个条件不成立时，余数必为 0 或 9。
- B 错：改成 \`remainder<=5\` 后，余数 0 会被误判为红色。
- C 错：原写法是 C++ 中正确的区间判断；链式比较 \`6<=remainder<=8\` 反而不能表达数学区间。
- D 错：取余得到组内位置，整除只得到已经经过的整组数量。

**易错点：** 编号 10、20 等的余数是 0，它们对应每组最后一个蓝球，不能漏掉。

**最小验证：** 令 \`N=10\`，余数为 0；前两项均为假，原最后条件和 \`else\` 都输出 \`Blue\`，而 B 会错误输出 \`Red\`。`,
            tags: ['条件分支', '取模运算'],
        },
        {
            id: 5,
            type: 'single',
            question: `下面C++代码执行后其输出是（ ）。\n\n\`\`\`cpp\nint tnt = 0;\nfor (int i = 0; i < 10; i++)\n    if (i % 3)\n        tnt += 1;\n    else\n        tnt += 2;\ncout << tnt;\n\`\`\``,
            options: ['18', '17', '16', '14'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（14）**

**推导过程：** \`i\` 取 0 到 9。能被 3 整除的值为 0、3、6、9，共 4 个，此时 \`i%3\` 为 0，走 \`else\`，每次加 2，共加 8；其余 6 个值每次加 1，共加 6。总和为 $8+6=14$。

**选项分析：**
- A、B、C 均不等于按“4 次加 2、6 次加 1”得到的总和。
- D 对：$4\\times2+6\\times1=14$。

**易错点：** 在 C++ 条件中，0 表示假、非 0 表示真；\`i=0\` 也能被 3 整除，因此会走 \`else\`。

**最小验证：** 只看 \`i=0,1,2\` 三轮，增量依次为 2、1、1；每三个连续整数贡献 4，0 到 8 共贡献 12，再加 \`i=9\` 的 2，得到 14。`,
            tags: ['循环', '逻辑运算'],
        },
        {
            id: 6,
            type: 'single',
            question: `下面C++代码执行后输出是（ ）。\n\n\`\`\`cpp\nint i;\nfor (i = 10; i > 0; i -= 2)\n    break;\ncout << i;\n\`\`\``,
            options: ['10', '8', '0', '因为循环执行时会执行break语句而终止循环，所以i的值不确定'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（10）**

**推导过程：** 初始化后 \`i=10\`，条件 \`i>0\` 成立，进入循环体立即执行 \`break\`。跳出循环时不会执行步进语句 \`i-=2\`，所以 \`i\` 仍为 10。

**选项分析：**
- A 对：第一次进入循环便跳出，值未改变。
- B 错：只有完成一轮循环体后才会执行 \`i-=2\`，本题没有执行。
- C 错：循环没有运行到条件自然失效。
- D 错：\`i\` 已明确初始化为 10，值是确定的。

**易错点：** \`break\` 与 \`continue\` 不同；\`break\` 直接离开循环，for 的步进部分不会执行。

**最小验证：** 执行顺序只有“\`i=10\` → 判断为真 → \`break\` → 输出”，其中没有任何修改 \`i\` 的步骤。`,
            tags: ['循环控制'],
        },
        {
            id: 7,
            type: 'single',
            question: `下面C++代码执行后输出是（ ）。\n\n\`\`\`cpp\nint i;\nfor (i = 0; i < 10; i++){\n    if (i % 3 == 0)\n        continue;\n    cout << "0" << "#";\n}\nif (i >= 10)\n    cout << "1" << "#";\n\`\`\``,
            options: ['0#0#0#0#0#0#', '0#0#0#0#0#0#0#1#', '0#0#0#0#1#', '0#0#0#0#0#0#1#'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2, 3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（\`0#0#0#0#0#0#1#\`）**

**推导过程：** \`i\` 取 0 到 9。遇到 0、3、6、9 时执行 \`continue\`，不输出；其余 1、2、4、5、7、8 共 6 个值各输出一次 \`0#\`。循环正常结束时 \`i=10\`，随后再输出 \`1#\`。

**选项分析：**
- A 错：漏掉循环结束后的 \`1#\`。
- B 错：把应跳过的值多算了一次，共写了 7 个 \`0#\`。
- C 错：只写了 4 个 \`0#\`，漏掉两个非 3 的倍数。
- D 对：6 个 \`0#\` 后接 1 个 \`1#\`。

**易错点：** \`continue\` 只跳过本轮剩余语句，for 的 \`i++\` 仍会执行；循环退出时 \`i\` 是 10。

**最小验证：** 列出实际输出对应的 \`i\`：1、2、4、5、7、8，恰好 6 次。`,
            tags: ['循环控制'],
        },
        {
            id: 8,
            type: 'single',
            question: `下面C++代码执行后的输出是（ ）。\n\n\`\`\`cpp\nint i, j;\nfor (i = 0; i < 5; i++)\n    for (j = i; j > 0; j -= 1)\n        printf("%d-", j);\n\`\`\``,
            options: ['1-2-1-3-2-1-4-3-2-1-', '1-2-1-3-2-1-4-3-2-1', '0-0-1-0-1-2-0-1-2-3-', '0-0-1-0-1-2-0-1-2-3'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（\`1-2-1-3-2-1-4-3-2-1-\`）**

**推导过程：** \`i=0\` 时内层条件 \`j>0\` 一开始就不成立；\`i=1,2,3,4\` 时，\`j\` 分别从 \`i\` 递减到 1，依次输出 \`1-\`、\`2-1-\`、\`3-2-1-\`、\`4-3-2-1-\`。

**选项分析：**
- A 对：四段结果顺序正确，且每次 \`printf\` 都会输出末尾的连字符。
- B 错：漏掉最后一次输出附带的 \`-\`。
- C、D 错：条件是 \`j>0\`，不会输出 0；数字顺序也是从 \`i\` 递减。

**易错点：** 外层从 0 开始不代表会输出 0，必须再检查内层条件。

**最小验证：** 当 \`i=2\` 时，\`j\` 依次为 2、1，局部输出必为 \`2-1-\`。`,
            tags: ['嵌套循环'],
        },
        {
            id: 9,
            type: 'single',
            question: `下面C++代码执行后，将输出能被2整除且除以7余数为2的数。下列选项不能实现的是（ ）。\n\n\`\`\`cpp\nfor (int i = 0; i < 100; i++)\n    if _______________________\n        cout << i << " ";\n\`\`\``,
            options: ['((i % 2 == 0) && (i % 7 == 2))', '((!(i % 2)) && (i % 7 == 2))', '((!(i % 2)) && (!(i % 7)))', '((i % 2 != 1) && (i % 7 == 2))'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（\`(!(i % 2)) && (!(i % 7))\`）**

**推导过程：** 目标条件是 \`i%2==0\` 且 \`i%7==2\`。逻辑非 \`!(i%2)\` 等价于余数为 0，但 \`!(i%7)\` 也等价于余数为 0，不是余数为 2，因此 C 不能实现。

**选项分析：**
- A 能实现：直接写出两个目标条件。
- B 能实现：\`!(i%2)\` 与 \`i%2==0\` 等价。
- C 不能实现：它筛选的是同时被 2 和 7 整除的数。
- D 能实现：本题 \`i\` 只取非负整数，\`i%2\` 只有 0、1，故“不等于 1”等价于等于 0。

**易错点：** \`!x\` 判断的是 \`x==0\`，不能把它理解为“取相反的余数”。

**最小验证：** \`i=14\` 满足 C，却有 \`14%7=0\`，不满足题目要求；\`i=16\` 满足正确条件，因为 \`16%2=0\`、\`16%7=2\`。`,
            tags: ['逻辑运算', '取模运算'],
        },
        {
            id: 10,
            type: 'single',
            question: `下面C++代码用于求1到N之间正整数中含有3的数的个数，比如 123 和 32 都是符合条件的数。则前后两处横线应填入代码分别是（ ）。\n\n\`\`\`cpp\nint i, j;\nint cnt = 0, N;\ncout << "请输入正整数N：";\ncin >> N;\nfor (i = 1; (j = i) < N; i++)\n    while (j != 0)\n        if (j % 10 == 3){\n            cnt += 1;\n            __________;\n        }\n        else\n            __________;\ncout << cnt << " ";\n\`\`\``,
            options: ['continue 和 j /= 10', 'break 和 j /= 10', 'continue 和 j %= 10', 'break 和 j %= 10'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3, 4],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：B（\`break\` 和 \`j /= 10\`）**

**推导过程：** \`j%10\` 检查当前个位。发现数字 3 后，这个整数只应计数一次，所以 \`cnt\` 加 1 后用 \`break\` 结束当前整数的数位检查；没有发现 3 时，用 \`j/=10\` 去掉个位并继续检查下一位。

**选项分析：**
- A 错：发现 3 后 \`continue\` 会在 \`j\` 未改变的情况下再次检查同一位，造成死循环。
- B 对：\`break\` 防止一个数重复计数，\`j/=10\` 正确删除个位。
- C 错：两处都可能使 \`j\` 停在原值或某个非零个位，无法结束循环。
- D 错：虽然发现 3 后能退出，但 \`j%=10\` 不能删除个位，例如 \`j=12\` 会变成 2 并一直保持 2。

**易错点：** \`j/=10\` 是删除个位，\`j%=10\` 是只保留个位；二者作用相反。

**最小验证：** 对 \`j=123\`，依次得到个位 3 后立即计数并退出；对 \`j=124\`，按 124→12→1→0 检查完所有数位而不计数。`,
            tags: ['数位处理', '循环控制'],
        },
        {
            id: 11,
            type: 'single',
            question: `在数学中N!表示N的阶乘，即1到N的乘积，如 3!=1*2*3，且 0!=1。下面的两段C++代码用于求1到N的阶乘之和，如N为3，则结果是9（1!+2!+3!的值）。选项中的说法正确的是（ ）。\n\n**实现1：**\n\n\`\`\`cpp\nint i, N;\ncin >> N;\nint tnt = 0, last = 1;\nfor (i = 1; i < N + 1; i++){\n    last *= i;\n    tnt += last;\n}\ncout << tnt << endl;\n\`\`\`\n\n**实现2：**\n\n\`\`\`cpp\nint i, N;\ncin >> N;\nint tnt = 0, tmp;\nfor (i = 1; i < N + 1; i++){\n    tmp = 1;\n    for (int j = 1; j < i + 1; j++)\n        tmp *= j;\n    tnt += tmp;\n}\ncout << tnt << endl;\n\`\`\``,
            options: ['虽然实现1的代码短小，但效率并不高', '实现2的代码效率更高，且更易于理解', '实现1因为应用了前项计算结果，计算量更小，因此效率高', '两种实现，效率几乎一致'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4, 5],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（实现1复用前项结果，计算量更小）**

**推导过程：** 实现1利用 $i!= (i-1)!\\times i$，每轮只增加一次乘法，总乘法次数为 $N$；实现2每轮都从 1 重新乘到 $i$，总乘法次数为 $1+2+\\cdots+N=N(N+1)/2$。前者为单层循环，后者为双层循环。

**选项分析：**
- A 错：实现1不仅代码短，而且乘法次数更少。
- B 错：实现2重复计算此前已经求过的阶乘，效率更低。
- C 对：保存 \`last\` 正是复用前一项结果。
- D 错：一个是 $O(N)$，另一个是 $O(N^2)$，N 增大时差距明显。

**易错点：** 不能用代码行数判断效率，应统计随 N 增长的重复运算次数。

**最小验证：** \`N=3\` 时，实现1做 3 次乘法；实现2做 $1+2+3=6$ 次乘法，两者都得到 9，但计算量不同。`,
            tags: ['循环', '算法效率'],
        },
        {
            id: 12,
            type: 'single',
            question: `哥德巴赫猜想是指大于2的偶数都可以分解为两个质数之和，下面的代码用于验证4-1000之内的偶数能否分解为两个质数之和。下面C++代码中假设isPrime()是已经定义好用于判断正整数N是否为质数，返回bool值。对该段代码，错误的说法是（ ）。\n\n\`\`\`cpp\nfor (i = 4; i < 1000; i += 2)\n    for (j = 2; j < i; j++)\n        if (isPrime(j) && isPrime(i-j)){\n            printf("%d=%d+%d\\n", i, j, i-j);\n            break;\n        }\n\`\`\``,
            options: [
                '将代码 isPrime(j) && isPrime(i-j) 修改为 isPrime(j) == true && isPrime(i-j) == true 效果相同',
                '代码执行后，输出的一对质数，一定是小的数在前',
                '即便将外层循环中i的上界1000修改为很大的整数，也不能说从数学上证明了哥德巴赫猜想',
                '根据题意，break语句应该移到if语句块之外',
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（把 \`break\` 移到 \`if\` 外是错误说法）**

**推导过程：** 只有找到一组质数时才应结束当前偶数的内层搜索，因此 \`break\` 必须位于 \`if\` 内。若移到外面，内层循环第一次检查 \`j=2\` 后就会无条件退出。

**选项分析：**
- A 正确：bool 表达式直接作为条件，与显式比较 \`==true\` 结果相同。
- B 正确：若首个解的 \`j>i-j\`，较小的互换值 \`i-j\` 早已被循环检查并会先输出，故首个输出满足 \`j<=i-j\`。
- C 正确：有限范围的枚举只能验证这些实例，不能替代对所有偶数的数学证明。
- D 错误：无条件 \`break\` 会让搜索失效，因此它是本题答案。

**易错点：** 本题要求选“错误的说法”；同时 \`break\` 只退出最近一层，即内层 \`for\`。

**最小验证：** 对 \`i=10\`，\`j=2\` 时 8 不是质数，应继续到 \`j=3\` 得到 $10=3+7$；若 \`break\` 在 \`if\` 外，程序会在 \`j=2\` 后提前退出。`,
            tags: ['循环控制', '质数'],
        },
        {
            id: 13,
            type: 'single',
            question: `已知C++代码和执行后的期望输出如下，相关说法正确的是（ ）。\n\n\`\`\`cpp\nint i, j;\nint last, N;\n\ncout << "请输入层数N：";\ncin >> N;\n\nlast = 1;\nfor (i = 1; i < N; i++){\n    for (j = 1; j < i + 1; j++){ // L1\n        if (last > 9)\n            last = 1;\n\n        cout << last << " ";\n        last += 1;\n    }\n    printf("\\n");\n}\n\`\`\`\n\n\`\`\`text\n请输入层数N：10\n1\n2 3\n4 5 6\n7 8 9 1\n2 3 4 5 6\n7 8 9 1 2 3\n4 5 6 7 8 9 1\n2 3 4 5 6 7 8 9\n1 2 3 4 5 6 7 8 9\n\`\`\``,
            options: ['倒数第二行的 printf("\\n") 有错，应该修改为 cout << endl;，printf()函数不能输出换行', 'last += 1 修改为 last = last + 1 执行效果相同', '代码中L1标记行中的 j < i + 1 应修改为 j < i', '外层for循环前的 last = 1 修改为 last = 0 执行效果相同'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5, 6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：B（\`last += 1\` 与 \`last = last + 1\` 效果相同）**

**推导过程：** \`+=\` 是复合赋值运算，\`last += 1\` 会读取原值、加 1 并写回，与 \`last = last + 1\` 在这里完全等价。

**选项分析：**
- A 错：\`printf("\\n")\` 可以输出换行。
- B 对：两种写法都把 \`last\` 增加 1。
- C 错：\`j\` 从 1 开始，条件 \`j<i+1\` 使第 i 行输出 i 个数；改成 \`j<i\` 会少一个。
- D 错：改为 0 后，第一个输出会变成 0，与给出的图示不符。

**易错点：** 判断循环次数要同时看初值和严格小于条件；\`j<i+1\` 等价于 \`j<=i\`。

**最小验证：** 当 \`i=3\` 时，\`j\` 取 1、2、3，恰好输出图示第三行的 3 个数。`,
            tags: ['嵌套循环', '赋值运算'],
        },
        {
            id: 14,
            type: 'single',
            question: `在C++中，（ ）最适合填入横线处连续5次正确生成1到10之间的随机整数？\n\n\`\`\`cpp\nfor(int i=0; i<5; i++)\n    __________________;\n\`\`\``,
            options: ['rand() % 11', 'rand() % 10', 'rand() % 10 + 1', 'rand() % 9 + 1'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（\`rand()%10+1\`）**

**推导过程：** \`rand()%10\` 的可能结果是 0 到 9，再加 1 后正好平移为 1 到 10。

**选项分析：**
- A 错：范围是 0 到 10，包含 0。
- B 错：范围是 0 到 9，缺少 10。
- C 对：范围是 1 到 10，两个端点都包含。
- D 错：范围是 1 到 9，缺少 10。

**易错点：** \`x%n\` 的余数范围从 0 开始，最大是 \`n-1\`。

**最小验证：** 当 \`rand()%10\` 分别取最小值 0 和最大值 9 时，加 1 后分别得到 1 和 10。`,
            tags: ['随机数', '取模运算'],
        },
        {
            id: 15,
            type: 'single',
            question: `在C++中，如果a和b均为float类型的变量，那么二者如果相差足够小（比如0.000001），就可以视作相等。比如2.2345676和2.2345677就可以视作相等。下列哪个表达式能用来正确判断“a等于b”（ ）。`,
            options: ['((b-a) < 0.000001)', '((b-a) <= 0.000001)', '(abs(b-a) <= 0.000001)', '(sqrt(b-a) <= 0.000001)'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（\`abs(b-a)<=0.000001\`）**

**推导过程：** “相差足够小”需要比较差值的大小而不关心方向，因此必须取绝对值，再与容差比较。

**选项分析：**
- A 错：没有取绝对值；当 \`b-a\` 是很大的负数时条件仍会错误地成立。
- B 错：加入等号仍未解决差值为负的问题。
- C 对：绝对差不超过给定容差时视为相等。
- D 错：当 \`b<a\` 时被开方数为负；开方也改变了要比较的量。

**易错点：** 浮点数近似比较应使用 \`abs(a-b)\`，不能只检查单方向的差。

**最小验证：** 令 \`a=10\`、\`b=1\`，A、B 都会因 \`b-a=-9\` 而误判为真；C 计算绝对差 9，正确判为假。`,
            tags: ['浮点运算'],
        },
        {
            id: 16,
            type: 'judge',
            question: `C++、Python都是高级编程语言，它们的每条语句最终都要通过机器指令来完成。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

**推导过程：** 处理器直接执行的是机器指令。C++ 源程序通常先编译为机器码；Python 代码通常由解释器或虚拟机处理，而解释器、虚拟机最终也由处理器执行机器指令。

**错误判断原因：** “Python 是解释型语言”只说明转换和执行方式不同，不代表它能绕过机器指令直接驱动硬件。

**易错点：** 要区分程序员看到的高级语言语句与 CPU 实际执行的指令层级。

**最小验证：** 同一段 Python 程序要在不同处理器上运行，需要适配该处理器的 Python 解释器；这说明最终执行仍依赖对应机器指令。`,
            tags: ['计算机基础'],
        },
        {
            id: 17,
            type: 'judge',
            question: `在C++代码中，假设N为正整数，则 N - N / 10 * 10 与 N % 10 都将获得N的个位数。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

**推导过程：** 对正整数做整数除法，\`N/10\` 删除个位，乘 10 后把个位补成 0；用 N 减去它便留下个位。根据除法算法，\`N=(N/10)\\times10+N%10\`，所以两式相等。

**错误判断原因：** 若把 \`N/10\` 当作保留小数的实数除法，就会误以为前式恒为 0；这里两个操作数都是整数。

**易错点：** 乘除同级并从左向右结合，前式实际是 \`N-(N/10)*10\`。

**最小验证：** \`N=123\` 时，$123-12\\times10=3$，同时 $123\\%10=3$。`,
            tags: ['数位处理', '整数运算'],
        },
        {
            id: 18,
            type: 'judge',
            question: `C++语句 \`cout << ((10 <= N <= 12)? "true":"false")\` 中，假设整型变量N为12，则其输出为true。原因是执行 \`10 <= N\` 后其值为true，true与12相比仍然是true。（ ）`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

**推导过程：** 关系运算符从左向右结合，先算 \`10<=12\` 得到 \`true\`；参与下一次数值比较时 \`true\` 转为 1，再算 \`1<=12\`，结果仍为真，因此条件表达式输出 \`true\`。

**错误判断原因：** 虽然 \`10<=N<=12\` 不是正确的通用区间写法，但题目只问 \`N=12\` 这一具体输入，此时结果确实为真。

**易错点：** “写法不能正确判断整个区间”和“本次输入的计算结果”是两个不同问题。

**最小验证：** 把表达式按括号展开为 \`(10<=12)<=12\`，即 \`1<=12\`，结果为真。`,
            tags: ['关系运算', '程序分析'],
        },
        {
            id: 19,
            type: 'judge',
            question: `C++表达式 \`(sqrt(N) * sqrt(N)) == N\` 中的N如果为正整数，则表达式的值为true，相当于开平方后平方是本身。（ ）`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：错误**

**推导过程：** \`sqrt\` 返回浮点数。许多平方根不能被二进制浮点数精确表示，舍入后的近似值再相乘不保证恰好回到整数 N；而 \`==\` 要求两边精确相等，所以该命题中的“总为 true”不成立。

**正确判断依据：** 若要检验近似相等，应比较 \`abs(sqrt(N)*sqrt(N)-N)\` 是否小于允许误差，而不是直接使用 \`==\`。

**易错点：** 数学恒等式不等于浮点计算中的逐位精确相等。

**最小验证：** 在常见 IEEE 754 双精度实现中，\`N=2\` 时 \`sqrt(2)*sqrt(2)\` 可能得到约 \`2.0000000000000004\`，与 2 的精确比较为假。`,
            tags: ['浮点运算', '数学函数'],
        },
        {
            id: 20,
            type: 'judge',
            question: `下面C++执行后将输出 \`3*2=6\`。（ ）\n\n\`\`\`cpp\nint a=2, b = 3;\na=a-b;\nb=a+b;\na=b-a;\nprintf("%d*%d=%d\\n", a, b, a*b);\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

**推导过程：** 初始 \`(a,b)=(2,3)\`；执行 \`a=a-b\` 后为 \`(-1,3)\`；执行 \`b=a+b\` 后为 \`(-1,2)\`；执行 \`a=b-a\` 后为 \`(3,2)\`。乘积为 6，格式串输出 \`3*2=6\`。

**错误判断原因：** 中间出现 \`a=-1\` 并不表示交换失败，后两步正是利用这个差值恢复两个原数。

**易错点：** 每条赋值必须使用上一条执行完成后的新值，不能始终代入初始值。

**最小验证：** 状态表 \`(2,3)→(-1,3)→(-1,2)→(3,2)\` 直接得到输出。`,
            tags: ['赋值运算', '程序分析'],
        },
        {
            id: 21,
            type: 'judge',
            question: `下面C++代码执行后将输出10。（ ）\n\n\`\`\`cpp\nint i;\nfor (i = 0; i < 10; i++)\n    continue;\ncout << i << endl;\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

**推导过程：** 每轮的 \`continue\` 跳过循环体剩余部分，但 for 的步进表达式 \`i++\` 仍会执行。最后一次以 \`i=9\` 进入循环，步进后 \`i=10\`，条件不成立，随后输出 10。

**错误判断原因：** 把 \`continue\` 误当成 \`break\` 会错误地认为循环第一轮就结束。

**易错点：** 在 for 循环中执行 \`continue\` 后，控制流先到步进表达式，再重新判断条件。

**最小验证：** 前两轮状态为 \`i=0→continue→i=1\`、\`i=1→continue→i=2\`，同样过程持续到 10。`,
            tags: ['循环控制'],
        },
        {
            id: 22,
            type: 'judge',
            question: `下面C++代码执行后将输出1。（ ）\n\n\`\`\`cpp\nint i;\nfor (i = 1; i < 10; i++){\n    break;\n    continue;\n}\ncout << i << endl;\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

**推导过程：** \`i\` 初始化为 1，第一次条件判断成立，进入循环后立即执行 \`break\`。循环的 \`i++\` 和后面的 \`continue\` 都不会执行，因此输出 1。

**错误判断原因：** \`break\` 后的语句不可到达，不能再按顺序执行 \`continue\` 或步进部分。

**易错点：** \`break\` 直接结束最近的循环，而不是只结束当前大括号中的一条语句。

**最小验证：** 实际执行路径为“\`i=1\` → 条件真 → \`break\` → \`cout\`”，路径中没有修改 i 的操作。`,
            tags: ['循环控制'],
        },
        {
            id: 23,
            type: 'judge',
            question: `下面的C++代码执行后将输出10行"OK"。（ ）\n\n\`\`\`cpp\nfor (int i = 0; i < 5; i++)\n    for(int j = 0; j < i; j++)\n        printf("OK\\n");\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

**推导过程：** 当 \`i\` 分别为 0、1、2、3、4 时，内层循环分别执行 0、1、2、3、4 次。总次数为 $0+1+2+3+4=10$，每次输出一行 \`OK\`。

**错误判断原因：** 不能把两层循环简单算成 $5\\times5$，因为内层上界是随 i 变化的。

**易错点：** \`i=0\` 时内层一次也不执行；\`j<i\` 不包含 j=i。

**最小验证：** 列出每轮行数 \`[0,1,2,3,4]\`，求和即为 10。`,
            tags: ['嵌套循环'],
        },
        {
            id: 24,
            type: 'judge',
            question: `将下面C++代码中的for循环中的 \`i = 1\` 调整为 \`i = 0\` 的输出结果相同。（ ）\n\n\`\`\`cpp\nint tnt = 0;\nfor (int i = 1; i < 5; i++) // i=1\n    tnt += i;\ncout << tnt;\n\`\`\``,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：正确**

**推导过程：** 原程序累加 $1+2+3+4=10$。初值改为 0 后只会额外执行一次 \`tnt+=0\`，不会改变 tnt，随后仍累加 1 到 4，所以输出相同。

**错误判断原因：** 循环次数增加一次不一定会改变结果，还要看新增这一轮执行的运算内容。

**易错点：** 应比较新增迭代的贡献，而不是只比较两种写法的循环次数。

**最小验证：** 原和为 10，修改后的和为 $0+1+2+3+4=10$。`,
            tags: ['循环', '累加'],
        },
        {
            id: 25,
            type: 'judge',
            question: `下面C++代码执行后将输出0123。（ ）\n\n\`\`\`cpp\nfor (i = 0; i < 5; i++)\n    for (i = 0; i < i; i++)\n        continue;\nprintf("%d\\n", i);\n\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：错误**

**推导过程：** 外层第一次令 \`i=0\`。内层又执行初始化 \`i=0\`，条件 \`i<i\` 即 \`0<0\` 为假；随后外层步进把 i 加到 1。下一轮外层进入后，内层再次把 i 重置为 0，之后外层又只加到 1。这个过程反复发生，外层条件始终为真，程序陷入无限循环。

**正确判断依据：** \`printf\` 位于两层循环之后，循环无法结束，所以不会输出 \`0123\`，也不会执行该输出语句。

**易错点：** 内外层复用了同一个变量 i；内层初始化会破坏外层循环变量。

**最小验证：** 连续两轮的外层状态都是“进入时 i=1 → 内层重置为 0 → 外层步进到 1”，由此可见无法达到 i=5。`,
            tags: ['嵌套循环', '死循环'],
        },
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '等差矩阵',
            timeLimit: '1.0 s',
            memoryLimit: '512.0 MB',
            sourceVerified: true,
            sourcePage: 8,
            sourcePages: [8],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            samples: [
                {
                    input: `3 4`,
                    output: `1 2 3 4\n2 4 6 8\n3 6 9 12`,
                },
            ],
            question: `
# [GESP202503 二级] 等差矩阵

- **时间限制**：1.0 s
- **内存限制**：512.0 MB

## 题目描述

小 A 想构造一个 $n$ 行 $m$ 列的矩阵，使得矩阵的每一行与每一列均是等差数列。小 A 发现，在矩阵的第 $i$ 行第 $j$ 列填入整数 $i\\times j$，得到的矩阵能满足要求。你能帮小 A 输出这个矩阵吗？

## 输入格式

一行，两个正整数 $n,m$。

## 输出格式

共 $n$ 行，每行 $m$ 个由空格分割的整数，表示小 A 需要构造的矩阵。

## 样例

### 输入样例 1

\`\`\`text
3 4
\`\`\`

### 输出样例 1

\`\`\`text
1 2 3 4
2 4 6 8
3 6 9 12
\`\`\`

## 数据范围

对于所有测试点，保证 $1\\le n\\le50$，$1\\le m\\le50$。
`,
            score: 25,
            explanation: `**算法推导：**

题目已经给出第 $i$ 行第 $j$ 列的值为 $i\\times j$。固定 i 时，相邻两列之差恒为 i；固定 j 时，相邻两行之差恒为 j，所以该构造确实让每一行、每一列都是等差数列。用两层循环按行输出全部 $n\\times m$ 个位置即可，时间复杂度为 $O(nm)$，额外空间为 $O(1)$。

**常见错误方法：**
- 从 0 开始枚举行列，会多输出第 0 行或得到一整行 0，与题目的 1-based 行列编号不符。
- 每个数后无条件输出空格虽然很多评测可接受，但原卷参考程序通过 \`" \\n"[j==m]\` 在行末输出换行，格式更精确。
- 先把矩阵完整存入二维数组没有必要，会增加额外空间。

**易错点：** 内层循环结束时必须换行；每行必须恰好输出 m 个整数。

**最小验证：** 当 $n=2,m=3$ 时，应输出两行 \`1 2 3\` 和 \`2 4 6\`；第一行公差为 1，第二行公差为 2，每一列的公差分别为 1、2、3。`,
            tags: ['编程题', '构造', '嵌套循环'],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: `#include <bits/stdc++.h>

using namespace std;

int n, m;

int main() {
    scanf("%d%d", &n, &m);
    assert(1 <= n && n <= 50 && 1 <= m && m <= 50);
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++)
            printf("%d%c", i * j, " \\n"[j == m]);
    return 0;
}`,
        },
        {
            id: 27,
            type: 'programming',
            title: '时间跨越',
            timeLimit: '1.0 s',
            memoryLimit: '512.0 MB',
            sourceVerified: true,
            sourcePage: 9,
            sourcePages: [9, 10],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            sourceIntegrity: 'official-source-defect',
            integrityNote: "原卷输入格式称五个输入均为“正整数”，但数据范围允许小时 h=0；输出格式又称输出四个“正整数”，但结果小时 h' 也可以为 0，且原卷样例输出正是 2008 2 29 0。本站保留原文、样例和参考程序，不把 0 暗改为正数，并将本题从评分排除。",
            samples: [
                {
                    input: `2008\n2\n28\n23\n1`,
                    output: `2008 2 29 0`,
                },
            ],
            question: `
# [GESP202503 二级] 时间跨越

- **试题名称**：时间跨越
- **时间限制**：1.0 s
- **内存限制**：512.0 MB

## 题面描述

假设现在是 $y$ 年 $m$ 月 $d$ 日 $h$ 时而 $k$ 小时后是 $y'$ 年 $m'$ 月 $d'$ 日 $h'$ 时，对于给定的 $y,m,d,h,k$，小杨想请你帮他计算出对应的 $y',m',d',h'$ 是多少。

## 输入格式

输入包含五行，每行一个正整数，分别代表 $y,m,d,h,k$。

## 输出格式

输出四个正整数，代表 $y',m',d',h'$。

## 样例

### 输入样例 1

\`\`\`text
2008
2
28
23
1
\`\`\`

### 输出样例 1

\`\`\`text
2008 2 29 0
\`\`\`

## 数据范围

对于全部数据，保证有 $2000\\le y\\le3000$，$1\\le m\\le12$，$1\\le d\\le31$，$0\\le h\\le23$，$1\\le k\\le24$。数据保证为合法时间。

## 提示

闰年判断规则：

- 普通闰年：年份能被 4 整除，但不能被 100 整除。
- 世纪闰年：年份能被 400 整除。

满足以上任意一条规则的年份就是闰年，否则是平年。
`,
            score: 25,
            explanation: `**算法推导：**

先执行 \`h+=k\`。由于 $0\\le h\\le23$ 且 $1\\le k\\le24$，相加后最多为 47，因此最多跨越一天；若 \`h>=24\`，减去 24 并令日期加 1。发生跨日时，根据月份确定当月天数：大月 31 天，小月 30 天，2 月再按“能被 400 整除，或能被 4 整除但不能被 100 整除”判断 28/29 天。若日期超过当月天数，就进入下个月；月份超过 12 时再进入下一年。整个过程只做固定次数的判断，时间、空间复杂度均为 $O(1)$。

**常见错误方法：**
- 把所有月份都按 30 天或 31 天处理，会在月末出错。
- 只判断 \`y%4==0\` 会把 2100 误判为闰年；世纪年还必须能被 400 整除。
- 忘记处理 12 月到次年 1 月，会得到不存在的第 13 月。

**易错点：** 数据范围保证 k 不超过 24，所以原卷参考程序只处理一次跨日是充分的；若题目允许更大的 k，就必须使用循环或先换算完整天数。

**最小验证：** 样例中 2008 是闰年，2 月有 29 天；2 月 28 日 23 时加 1 小时得到 2 月 29 日 0 时。另取 \`2023 12 31 23 1\`，应得到 \`2024 1 1 0\`。`,
            tags: ['编程题', '日期计算', '条件分支'],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: `#include <iostream>
using namespace std;

int main() {
    int y, m, d, h, k;
    cin >> y >> m >> d >> h >> k;
    h += k;
    if (h >= 24) {
        h -= 24;
        d += 1;
        int days = 0;
        if (m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12) {
            days = 31;
        } else if (m == 4 || m == 6 || m == 9 || m == 11) {
            days = 30;
        } else if (m == 2) {
            if ((y % 4 == 0 && y % 100 != 0) || (y % 400 == 0)) {
                days = 29;
            } else {
                days = 28;
            }
        }
        if (d > days) {
            d -= days;
            m += 1;
            if (m > 12) {
                m = 1;
                y += 1;
            }
        }
    }
    cout << y << " " << m << " " << d << " " << h << "\\n";

    return 0;
}`,
        },
    ],
};
