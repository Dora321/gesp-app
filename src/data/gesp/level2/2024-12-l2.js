// 2024年12月 GESP C++ 二级真题 (第8次认证)
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照 CCF GESP 原卷 PDF 校订。
// 原卷 PDF 的 git blob 为 f505006a74be63923199aeac00252fea821a7eff（1092195 字节），
// 与 paperSources.js 中登记的 mirrorSha / mirrorBytes 完全一致。
//
// 客观题答案均取自原卷答案表：
//   单选题（第 1 页答案表）：C A D B D B C C D A A D B D C
//   判断题（第 6 页答案表）：√ √ √ √ × × × √ √ √
// 单选题答案表为黑色文本，可机器读取；判断题答案以红色矢量记号呈现（无文本层），
// 已将第 6 页渲染为图片后逐格人工读取，并对 10 道判断题逐题独立推理复核，结论与红色标记一致。
//
// 原卷自身存在一处缺陷，已忠实保留并停止计分：
//   Q11：选项 B 把 printf 写成 print，因此 A、B 两项的“效果相同”均不成立，
//        与官方答案 A 的单选设定冲突。
const SOURCE_URL = 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B412%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf';
const REVIEWED_BY = '本站校订';
const REVIEWED_AT = '2026-07-27';
export const paperData = {
    id: '2024-12-l2',
    title: '2024年12月 GESP C++ 二级真题',
    level: 2,
    year: 2024,
    month: 12,
    session: 8,
    note: '年度收官',
    timeLimit: 90 * 60,
    source: {
        officialPdf: SOURCE_URL,
        type: 'archived-official',
        notes: '题面、代码、选项、答案表、图示、编程题样例、约束与参考程序均按 CCF GESP 原卷 PDF 逐页转录；Q11 的原卷多答案缺陷已结构化标记。',
    },
    reviewStatus: 'verified',
    reviewScope: '全卷 27 题（单选 15 + 判断 10 + 编程 2）的题面、代码、选项、答案、解析与图示，以及两道编程题的题意、约束、样例与原卷参考程序，均已逐题核验；Q11 因原卷多答案缺陷从评分排除。',
    reviewedBy: '本站校订',
    reviewedAt: '2026-07-27',
    verification: {
        status: 'verified',
        reviewedBy: '本站校订',
        reviewedAt: '2026-07-27',
        scope: '全卷 27 题均逐题对照 CCF GESP 原卷 PDF 核验；单选题答案取自第 1 页答案表，判断题答案按第 6 页红色矢量标记逐格读取并独立推理；Q11 保留原卷多答案缺陷并停止计分。',
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
            question: `2024年10月8日，诺贝尔物理学奖“意外地”颁给了两位计算机科学家约翰·霍普菲尔德（John J. Hopfield）和杰弗里·辛顿（Geoffrey E. Hinton）。这两位科学家的主要研究方向是（ ）。`,
            options: ['天体物理', '流体力学', '人工智能', '量子理论'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（人工智能）**
**推导过程：** 2024 年诺贝尔物理学奖授予 Hopfield 与 Hinton，表彰他们“为利用人工神经网络实现机器学习作出的奠基性发现和发明”。二人的核心研究方向是人工神经网络 / 机器学习，属于人工智能领域，因此把物理学奖颁给两位计算机科学家才显得“意外”。
**选项分析：**
- A 天体物理：研究天体的物理性质与演化，与神经网络无关。
- B 流体力学：研究流体受力与运动，非二人方向。
- C 人工智能：正确。Hopfield 网络、玻尔兹曼机与反向传播都是人工智能里的标志性成果。
- D 量子理论：研究微观粒子量子态，并非获奖理由。
**易错点：** “意外地”“物理学奖”都是干扰信息，判断依据是官方给出的获奖理由（人工神经网络与机器学习）。
**最小验证：** Hopfield 提出 Hopfield 神经网络、Hinton 被称为“深度学习之父”，两者都属于人工智能，只有 C 吻合。`,
            tags: ['计算机基础'],
        },
        {
            id: 2,
            type: 'single',
            question: `计算机系统中存储的基本单位用B来表示，它代表的是（ ），比如某个照片大小为3MB。`,
            options: ['Byte', 'Block', 'Bulk', 'Bit'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（Byte）**
**推导过程：** 存储容量的基本单位用大写字母 \`B\` 表示 Byte（字节），1 Byte = 8 bit。题干“某照片大小为 3MB”里的 B 也指字节，MB 即“兆字节”。
**选项分析：**
- A Byte：正确，字节是存储容量的基本计量单位。
- B Block：块是磁盘 / 文件系统的逻辑单位，不是容量单位缩写。
- C Bulk：不是任何标准存储单位的缩写，纯干扰项。
- D Bit：位（比特）的标准缩写是小写 \`b\`，不是大写 \`B\`。
**易错点：** 大小写有别——大写 B = Byte，小写 b = Bit，1 B = 8 b。
**最小验证：** 3MB = 3 × 1024 KB，KB / MB 中的 B 都是 Byte，与 A 一致。`,
            tags: ['计算机基础'],
        },
        {
            id: 3,
            type: 'single',
            question: `C++语句 \`cout << (3 + 3 % 3 * 2 - 1)\` 执行后输出的值是（ ）。`,
            options: ['-1', '4', '56', '2'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（2）**
**推导过程：** 运算优先级里 \`%\` 与 \`*\` 高于 \`+\`、\`-\`，且同级左结合。先算 \`3 % 3 = 0\`，再算 \`0 * 2 = 0\`，表达式变为 \`3 + 0 - 1\`；然后从左到右 \`3 + 0 = 3\`、\`3 - 1 = 2\`。
**选项分析：**
- A -1：把优先级算反（如先算 \`(3+3)%3*2-1\`）才会得到负数。
- B 4：多半是漏掉了最后的 \`-1\` 或把 \`3%3\` 当成 1。
- C 56：把整串当作从左到右无优先级拼接，属机械误算。
- D 2：唯一严格按优先级得到的结果。
**易错点：** \`%\` 与 \`*\` 同级且都高于加减，必须先算 \`3 % 3\` 再乘 2。
**最小验证：** \`3 % 3 = 0 → 0 * 2 = 0 → 3 + 0 - 1 = 2\`。`,
            tags: ['算术运算', '运算符优先级'],
        },
        {
            id: 4,
            type: 'single',
            question: `下面C++代码执行后其输出是（ ）。
\`\`\`cpp
for (int i=0; i<10; i++)
    printf("%d",i);
\`\`\``,
            options: ['123456789', '0123456789', '12345678910', '012345678910'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1, 2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：B（0123456789）**
**推导过程：** \`i\` 从 0 循环到 9（\`i<10\` 时 \`i=10\` 不进入循环），每轮 \`printf("%d", i)\` 只输出数字本身、无任何分隔符，所以依次拼出 \`0123456789\`。
**选项分析：**
- A 123456789：漏了开头的 0（\`i\` 从 0 起）。
- B 0123456789：正确，10 个数字连排。
- C 12345678910：既从 1 开始又把 10 输出了，双重错误。
- D 012345678910：起点对，但多输出了 10（\`i=10\` 时 \`10<10\` 为假，不会执行）。
**易错点：** 循环从 0 开始、到 9 结束；\`"%d"\` 里没有逗号或空格。
**最小验证：** 首轮 \`i=0\` 打“0”，末轮 \`i=9\` 打“9”，\`i=10\` 不满足条件退出。`,
            tags: ['程序分析', '循环', '输入输出'],
        },
        {
            id: 5,
            type: 'single',
            question: `下面C++代码的相关说法中，正确的是（ ）。
\`\`\`cpp
int tnt;
for (int i=0; i<10; i++)
    tnt += i;
cout << tnt;
\`\`\``,
            options: [
                '上述代码执行后其输出相当于求1-10的和（包含10）',
                '上述代码执行后其输出相当于求1-10的和（不包含10）',
                '上述代码执行后其输出相当于求0-10的和（不包含10）',
                '上述代码执行后将输出不确定的值',
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（将输出不确定的值）**
**推导过程：** \`tnt\` 是未初始化的局部变量，栈上初值是不确定的垃圾值；\`tnt += i\` 只是在这个未知初值上累加 0+1+…+9=45。最终输出 = 未知初值 + 45，仍不可预测。使用未初始化变量属于未定义行为。
**选项分析：**
- A / B / C：分别描述某个“确定的求和结果”，但前提都是 \`tnt\` 已初始化为 0——代码并没有初始化，故都不成立。
- D：正确指出结果不确定。
**易错点：** 只有全局变量、静态变量会自动清零，局部变量不会自动初始化为 0。
**最小验证：** 把初值记作 X，则输出为 X+45；X 未知，故结果不确定。`,
            tags: ['变量初始化', '未定义行为'],
        },
        {
            id: 6,
            type: 'single',
            question: `下面C++代码执行后输出是（ ）。
\`\`\`cpp
int i;
for (i=1; i<10; i++)
    if (i % 2)
        continue;
    else
        break;
cout << i;
\`\`\``,
            options: ['1', '2', '9', '10'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：B（2）**
**推导过程：**
1. \`i=1\`：\`1 % 2 = 1\`（真）→ 执行 \`continue\`，跳过 \`else\`；\`for\` 的 \`i++\` 使 \`i=2\`。
2. \`i=2\`：\`2 % 2 = 0\`（假）→ \`if\` 不成立 → 执行 \`else\` 中的 \`break\`，立即退出循环。
3. 退出时 \`i\` 仍为 2，\`cout << i\` 输出 2。
**选项分析：**
- A 1：忽略了 \`continue\` 之后 \`i\` 会自增。
- B 2：正确。
- C 9 / D 10：都要求循环走到条件自然失效，但 \`i=2\` 时就 \`break\` 了。
**易错点：** \`continue\` 只跳过本轮剩余语句、仍会执行 \`i++\`；\`else\` 只在 \`if\` 为假时执行。
**最小验证：** 只有两轮——\`i=1\` 触发 \`continue\`、\`i=2\` 触发 \`break\`，输出 2。`,
            tags: ['循环控制', '程序分析'],
        },
        {
            id: 7,
            type: 'single',
            question: `下面C++代码执行后的输出是（ ）。
\`\`\`cpp
for (i=0; i<10; i++){
    if (i % 3)
        continue;
    printf("0#");
}
if(i>=10)
    printf("1#");
\`\`\``,
            options: ['0#0#0#0#0#0#0#1#', '0#0#0#0#0#0#1#', '0#0#0#0#1#', '0#0#0#0#'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（0#0#0#0#1#）**
**推导过程：** \`i\` 从 0 到 9。\`i % 3\` 非零时 \`continue\` 不输出；只有 \`i % 3 == 0\`（即 \`i=0,3,6,9\`）才输出 \`0#\`，共 4 次。循环正常结束后 \`i=10\`，满足 \`i>=10\`，再输出一个 \`1#\`。合计 \`0#0#0#0#1#\`。
**选项分析：**
- A（7 个 0#）/ B（6 个 0#）：把被 3 整除的个数算多了。
- C（4 个 0# + 1#）：正确。
- D（4 个 0#）：漏掉了循环外的 \`1#\`。
**易错点：** \`continue\` 过滤掉 \`i % 3 != 0\` 的轮次；循环退出时 \`i=10\` 才让 \`if(i>=10)\` 成立。
**最小验证：** [0,10) 内能被 3 整除的是 0、3、6、9，恰 4 个 → 4 个 \`0#\`，再补 1 个 \`1#\`。`,
            tags: ['循环控制', '程序分析'],
        },
        {
            id: 8,
            type: 'single',
            question: `下面C++代码用于输出0-100之前（包含100）能被7整除但不能被3整除的数，横线处不能填入的代码是（ ）。
\`\`\`cpp
for (i=0; i<100; i++)
    if(_____________)
        cout << i << endl;
\`\`\``,
            options: [
                'i % 7 == 0 && i % 3 != 0',
                '!(i % 7) && i % 3 != 0',
                'i % 7 && i % 3',
                'i % 7 == 0 && !(i % 3 == 0)',
            ],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2, 3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（\`i % 7 && i % 3\`）**
**推导过程：** 目标是“能被 7 整除且不能被 3 整除”，即 \`i % 7 == 0 && i % 3 != 0\`。选项 C 写成 \`i % 7 && i % 3\`：\`i % 7\` 为真表示“不能被 7 整除”，\`i % 3\` 为真表示“不能被 3 整除”，整体筛的是“既不能被 7 整除又不能被 3 整除”，与题目要求相反，所以 C 不能实现，正是本题要选（不能填入）的项。
**选项分析：**
- A：直接写出目标条件，正确，可填入。
- B：\`!(i % 7)\` 等价于 \`i % 7 == 0\`，正确，可填入。
- C：逻辑与目标相反，不能实现 → 本题答案。
- D：\`!(i % 3 == 0)\` 等价于 \`i % 3 != 0\`，正确，可填入。
**易错点：** \`i % n\` 非零表示“不能整除”，\`i % n == 0\`（或 \`!(i % n)\`）才表示“整除”。
**最小验证：** \`i=7\` 应被输出（\`7%7==0\` 且 \`7%3==1\`）；代入 C 的 \`i%7 && i%3\` = \`0 && 1\` = 假，不会输出 7，可见 C 不符合要求。
**题面提示：** 原卷“0-100之前（包含100）”与代码 \`for(i=0; i<100; i++)\`（实际到 99）措辞不一致，但 100 本就不能被 7 整除，且本题问的是“不能填入的表达式”，与上界无关，不影响答案。`,
            tags: ['逻辑运算', '取模运算'],
        },
        {
            id: 9,
            type: 'single',
            question: `下面C++代码用于求正整数各位数字之和，横线处不应填入代码是（ ）。
\`\`\`cpp
int tnt, N;
printf("请输入正整数：");
cin >> N;
tnt = 0;
while (N != 0){
    ________________
    N /= 10;
}
cout <<tnt;
\`\`\``,
            options: [
                'tnt = tnt + N % 10',
                'tnt += N % 10',
                'tnt = N % 10 + tnt',
                'tnt = N % 10',
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（\`tnt = N % 10\`）**
**推导过程：** 求各位数字之和的模板是每轮取最低位 \`N % 10\` 累加进 \`tnt\`，再 \`N /= 10\` 去掉最低位。A（\`tnt = tnt + N % 10\`）、B（\`tnt += N % 10\`）、C（\`tnt = N % 10 + tnt\`）都是“把当前位加到旧值上”的累加写法（加法满足交换律，三者等价），都正确。D（\`tnt = N % 10\`）是赋值覆盖，每轮丢弃之前的累加结果，只留下最后一位，所以 D 不应填入。
**选项分析：**
- A / B / C：靠 \`+\`、\`+=\` 保留历史累加值，正确。
- D：用 \`=\` 覆盖 \`tnt\`，丢失前面各位之和，不应填入 → 本题答案。
**易错点：** 区分 \`=\`（覆盖）与 \`+=\` / \`= tnt + …\`（累加）。
**最小验证：** \`N=12\` 时正确应得 1+2=3；用 D 会依次 \`tnt=2\`、\`tnt=1\`，最终输出 1，错误。`,
            tags: ['程序分析', '数位处理'],
        },
        {
            id: 10,
            type: 'single',
            question: `下图的C++程序执行后的输出是（ ）。
\`\`\`cpp
for (i=0; i<5; i++)
    for (j=0; j<i; j++)
        cout <<j;
\`\`\``,
            options: ['0010120123', '01012012301234', '001012012301234', '01012012301234012345'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（0010120123）**
**推导过程：** 内层 \`for (j=0; j<i; j++)\` 打印 0 到 \`i-1\`，共 \`i\` 个数字；外层 \`i\` 取 0..4。
| i | 内层输出 |
|---|---|
| 0 | （空） |
| 1 | 0 |
| 2 | 01 |
| 3 | 012 |
| 4 | 0123 |
拼接得 \`\` + \`0\` + \`01\` + \`012\` + \`0123\` = \`0010120123\`（10 个字符）。
**选项分析：**
- A：正确。
- B / D：多算到 \`i=5\`（外层 \`i<5\`，最大只有 4，不会出现 \`01234\`）。
- C：开头多了一个 0（\`i=0\` 那轮内层一次都不执行，本应无输出）。
**易错点：** \`i=0\` 时 \`j<0\` 不成立，不输出任何字符；外层上界是 4。
**最小验证：** \`i=2\` 那轮必输出 \`01\`，\`i=4\` 那轮输出 \`0123\`，全程无 \`01234\`。`,
            tags: ['嵌套循环', '程序分析'],
        },
        {
            id: 11,
            type: 'single',
            question: `下面C++代码用于实现图示的九九乘法表。相关说法错误的是（ ）。
\`\`\`cpp
/*
1*1=1
1*2=2 2*2=4
1*3=3 2*3=6 3*3=9
1*4=4 2*4=8 3*4=12 4*4=16
1*5=5 2*5=10 3*5=15 4*5=20 5*5=25
1*6=6 2*6=12 3*6=18 4*6=24 5*6=30 6*6=36
1*7=7 2*7=14 3*7=21 4*7=28 5*7=35 6*7=42 7*7=49
1*8=8 2*8=16 3*8=24 4*8=32 5*8=40 6*8=48 7*8=56 8*8=64
1*9=9 2*9=18 3*9=27 4*9=36 5*9=45 6*9=54 7*9=63 8*9=72 9*9=81
*/
for (int Hang=1; Hang<10; Hang++){
    for (int Lie=1; Lie<Hang+1; Lie++){
        if (Lie * Hang > 9)
            printf("%d*%d=%d ", Lie, Hang, Lie*Hang);
        else
            printf("%d*%d=%d    ", Lie, Hang, Lie*Hang);
        // L2
    }
    printf("\\n"); // L1
}
\`\`\``,
            options: [
                `将L1注释的 printf("\\n") 移到L2注释所在行，效果相同`,
                `将L1注释的 printf("\\n") 修改为 print("%c", '\\n') 效果相同`,
                `将 Lie * Hang > 9 修改为 Lie * Hang >= 10 效果相同`,
                `将 Lie * Hang > 9 修改为 Hang * Lie > 9 效果相同`,
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3, 4],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            sourceIntegrity: 'official-source-defect',
            integrityNote: '原卷选项 B 将 printf("%c", \'\\n\') 印成不存在的 print("%c", \'\\n\')。因此 A、B 两项所称的“效果相同”都不成立，与单选题官方答案仅取 A 的设定冲突。本站保留原文和官方答案，但将本题从评分排除。',
            explanation: `**原卷答案：A；本题因原卷多答案缺陷不计分**
**推导过程：** \`printf("\\n")\` 位于外层循环末尾、内层循环之后，作用是“打完一整行各列后再换行”。选项 A 把它移到 L2（内层循环体内），会变成每输出一个乘法等式就换行，三角形乘法表被拆成竖排——效果不同，因此 A 的“效果相同”是错误说法，正是本题要选的项。
**选项分析：**
- A：错误说法——换行移入内层后每个等式独占一行，破坏排版。
- B：按原卷实际文字同样错误——标准 C++ 没有这里使用的 \`print\` 函数，代码不能按题意工作；只有改成 \`printf("%c", '\\n')\` 才与原语句等效。
- C：正确说法——对整数而言 \`Lie*Hang > 9\` 与 \`Lie*Hang >= 10\` 完全等价。
- D：正确说法——乘法满足交换律，\`Lie*Hang\` 与 \`Hang*Lie\` 结果相同。
**原卷缺陷：** 官方答案表只取 A，显然按“B 本意为 \`printf\`”命题；但题库必须依据实际印刷文本，不能替原卷补字母。因此本题存在两个错误说法，本站原样保留并停止计分。
**易错点：** 图形打印中换行必须放在外层循环内、内层循环外；放进内层就会逐个等式换行。
**最小验证：** 若把换行移入内层，输出会变成 \`1*1=1\` 换行、\`1*2=2\` 换行……与图示的三角形乘法表完全不同。`,
            tags: ['嵌套循环', '格式化输出'],
        },
        {
            id: 12,
            type: 'single',
            question: `在数学中N!表示N的阶乘，即1到N的乘积，如 3!=1*2*3。下面的C++用于求1-N的阶乘之和，如N为3，则是 1!+2!+3!。下面代码段补充选项后用于实现上述功能，其中不能实现阶乘和的选项是（ ）。
\`\`\`cpp
int N;
cin >> N;
int tnt=0, nowNum = 1; //tnt保存求和之值，当前N的阶乘
for (int i=1; i < N + 1; i++){
    ______________ // 基于上一个计算出当前数的阶乘
    ______________ // 从1到i每个数阶乘之和
}
cout << tnt;
\`\`\``,
            options: [
                'nowNum *= i; tnt += nowNum;',
                'nowNum = nowNum * i; tnt = tnt + nowNum;',
                'nowNum *= i; tnt = nowNum + tnt;',
                'nowNum = nowNum + i; tnt *= nowNum;',
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4, 5],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（\`nowNum = nowNum + i; tnt *= nowNum;\`）**
**推导过程：** \`nowNum\` 初值 1、\`tnt\` 初值 0。正确做法是每轮先把 \`nowNum\` 更新为 \`i!\`（在上一项基础上乘 \`i\`），再把 \`nowNum\` 累加进 \`tnt\`。A（\`nowNum *= i; tnt += nowNum;\`）、B（\`nowNum = nowNum * i; tnt = tnt + nowNum;\`）、C（\`nowNum *= i; tnt = nowNum + tnt;\`）只是写法差异，逻辑一致，都能得到阶乘和。
D 有两处错：\`nowNum = nowNum + i\` 是累加而非累乘，得到 1、3、6…而不是阶乘；\`tnt *= nowNum\` 又让 \`tnt\` 从 0 开始做乘法，恒为 0。
**选项分析：**
- A / B / C：\`*=\` 与 \`= *\`、\`+=\` 与 \`= +\` 等价，结果正确。
- D：把累乘 / 累加对调，\`tnt\` 恒为 0，不能实现 → 本题答案。
**易错点：** 累乘用 \`*=\`（初值 1），累加用 \`+=\`（初值 0）；D 恰好把两者用反。
**最小验证：** \`N=3\` 时 A/B/C 都得 \`1!+2!+3!=9\`；D 因 \`tnt\` 初值 0 且做乘法，输出恒为 0。`,
            tags: ['循环', '累乘累加'],
        },
        {
            id: 13,
            type: 'single',
            question: `下面C++代码用于输出N和M之间（可以包括N和M）的孪生素数。孪生素数是指间隔为2的两个数均为素数，如11和13分别是素数，且间隔为2。isPrime(N)用于判断N是否为素数的函数。为完成上述功能，横线处应填上的代码是（ ）。
\`\`\`cpp
int N,M;
//本题假设N小于M
cin >> N >> M;
for (int i = N; i < __________; i++)
    if (isPrime(i) && isPrime(i + 2))
        printf("%d %d\\n",i, i + 2);
\`\`\``,
            options: ['M - 2', 'M - 1', 'M', 'M + 1'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：B（M - 1）**
**推导过程：** 要输出 [N, M] 内的孪生素数对 \`(i, i+2)\`，两个成员都要落在范围内，即 \`i + 2 <= M\`，也就是 \`i\` 最大取到 \`M - 2\`。循环 \`for (i=N; i < 上界; i++)\` 要让 \`i\` 能取到 \`M - 2\`、并在此之后停止：\`i < M - 1\` 时最大 \`i = M - 2\`，恰好合适，故上界填 \`M - 1\`。
**选项分析：**
- A M-2：\`i\` 最大只到 \`M-3\`，会漏掉 \`(M-2, M)\` 这一对。
- B M-1：正确，\`i\` 最大到 \`M-2\`，\`i+2 = M\` 仍在范围内。
- C M：\`i\` 会取到 \`M-1\`，从而判断 \`isPrime(M+1)\`，越出上界 M。
- D M+1：越界更多。
**易错点：** 循环上界要由判断式里“最靠右”的量 \`i+2 <= M\` 反推，不能只盯 \`i\` 本身。
**最小验证：** 设 \`M=13\`，孪生素数 \`(11,13)\` 需要 \`i=11=M-2\` 被检查——只有 \`i < M-1 = 12\` 才能取到 11；若上界写 \`M-2=11\`（即 \`i<11\`），\`i\` 到不了 11，就会漏掉这一对。`,
            tags: ['循环边界', '质数'],
        },
        {
            id: 14,
            type: 'single',
            question: `下面C++代码实现输出如下图形，横线应填入的代码是（ ）。
\`\`\`cpp
/*
高度:5
    *
   ***
  *****
 *******
*********
*/
int height;
cout << "高度: ";
//获取用户输入的高度
cin >> height;
for (i=0; i<height; i++){
    //打印每行前面的空格
    for (j = 0; j < _______________; j++)
        cout << " ";
    //打印每行的星号
    for (k = 0; k < _______________; k++)
        cout << "*";
    //输出一行后，换行
    cout << endl;
}
\`\`\``,
            options: [
                'height - i, 2 * i',
                'height, 2 * i',
                'height - i, 2 * i + 1',
                'height - i - 1, 2 * i + 1',
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5, 6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（空格 \`height - i - 1\`，星号 \`2 * i + 1\`）**
**推导过程：** 第 \`i\` 行（\`i\` 从 0 起）由前置空格 + 星号组成。height=5 时：第 0 行 4 空格 1 星，第 4 行 0 空格 9 星。空格数规律 \`height - i - 1\`（\`i=0\` 时 5-0-1=4），星号数规律 \`2 * i + 1\`（\`i=0\` 时 1，得到奇数列 1、3、5、7、9）。
**选项分析：**
- A / B：星号是 \`2 * i\`（偶数），得不到 1、3、5… 的奇数序列。
- A / C：空格 \`height - i\` 会让顶行多 1 个空格（\`i=0\` 时得 5 个）。
- B：空格恒为 \`height\`，不随行变化，图形不会右对齐。
- D：空格 \`height - i - 1\` 与星号 \`2 * i + 1\` 同时正确。
**易错点：** \`i\` 从 0 开始，用顶行（\`i=0\`：4 空格、1 星）代入公式验证最稳。
**最小验证：** \`i=0\`→空格 5-0-1=4、星 1；\`i=4\`→空格 0、星 9，正好组成图示金字塔。`,
            tags: ['图形绘制', '嵌套循环'],
        },
        {
            id: 15,
            type: 'single',
            question: `下面C++代码执行后的输出是30，则横线处不能填入（ ）。
\`\`\`cpp
int a=10,b=20,c=30;
cout << _____________________ << endl;
cout << endl;
\`\`\``,
            options: ['max(max(a, b), c)', 'min(a+b, c)', 'sqrt(a+b+c)', '(a+b+c)/2'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（\`sqrt(a+b+c)\`）**
**推导过程：** \`a=10, b=20, c=30\`。逐项算：A \`max(max(10,20),30)=30\`；B \`min(10+20,30)=min(30,30)=30\`；D \`(10+20+30)/2=60/2=30\`；C \`sqrt(60)≈7.746\`，不是 30。题目问“不能填入（结果不是 30）”，故选 C。
**选项分析：**
- A：逐层取最大，得 30。
- B：先 \`a+b=30\`，再与 c 取最小仍 30。
- C：开平方，约 7.746，≠30 → 本题答案。
- D：总和 60 整除 2 得 30。
**易错点：** \`sqrt\` 是开平方而非除法；\`a+b+c=60\`。
**最小验证：** \`sqrt(60)\` 介于 \`7²=49\` 与 \`8²=64\` 之间（≈7.746），远不等于 30。`,
            tags: ['数学函数'],
        },
        {
            id: 16,
            type: 'judge',
            question: `在Windows的资源管理器中为已有文件A建立副本的操作是Ctrl+C，然后Ctrl+V。`,
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
**推导过程：** Ctrl+C 把选中的文件复制到剪贴板（复制操作），Ctrl+V 把剪贴板内容粘贴到当前目录并生成一份副本。因此“Ctrl+C 然后 Ctrl+V”确实能为已有文件建立副本，命题正确。
**正确判断依据：** 复制 + 粘贴生成副本，且剪贴板内容不会因粘贴而清空，可多次粘贴得到多份副本。
**易错点：** 复制（Ctrl+C）得到副本；剪切（Ctrl+X）才是移动，不会保留原件。
**最小验证：** 复制一次后连续两次 Ctrl+V，会得到两个副本。`,
            tags: ['操作系统'],
        },
        {
            id: 17,
            type: 'judge',
            question: `在C++代码中，假设N为正整数，则 \`cout << (N - N / 10 * 10)\` 将获得N的个位数。`,
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
**推导过程：** 对正整数 N，\`N / 10\` 是整数除法（去掉个位），\`N / 10 * 10\` 把个位补成 0，再用 N 减去它就得到个位。由除法算法 \`N = (N/10)*10 + N%10\`，可知 \`N - N/10*10 == N%10\`，即个位数。命题正确。
**正确判断依据：** 关键在于这是整数除法；\`N/10\` 截断掉小数部分。
**易错点：** \`*\` 与 \`/\` 同级且左结合，表达式实为 \`N - ((N/10)*10)\`；若误当成实数除法会以为结果恒为 0。
**最小验证：** \`N=123\` 时 \`123 - 12*10 = 3\`，正是个位。`,
            tags: ['数位处理', '整数运算'],
        },
        {
            id: 18,
            type: 'judge',
            question: `在C++语句 \`cout << (10 <= N <= 12)\` 中，假设N为12，则其输出为1。`,
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
**推导过程：** 关系运算符 \`<=\` 从左向右结合。\`N=12\` 时先算 \`10 <= 12\` 得 \`true\`（值为 1），再算 \`1 <= 12\` 得 \`true\`（值为 1）；\`cout\` 输出这个 int 值 1。命题正确。
**正确判断依据：** 表达式实际是 \`(10 <= 12) <= 12\` = \`1 <= 12\` = 真，输出 1。
**易错点：** \`10 <= N <= 12\` 不能正确表达“区间”这一点是另一回事；本题只问 \`N=12\` 这一具体输入的输出，答案确为 1。
**最小验证：** 展开为 \`(10<=12)<=12\` → \`1<=12\` → 真 → 输出 1。`,
            tags: ['关系运算', '程序分析'],
        },
        {
            id: 19,
            type: 'judge',
            question: `如果C++表达式 \`int(sqrt(N))*int(sqrt(N)) == N\` 的值为True，则说明N为完全平方数，如4、9、25等。`,
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
**推导过程：** \`int(sqrt(N))\` 把平方根截断为整数，记作 k（非负整数）。若 \`k*k == N\` 成立，则 N 恰好等于整数 k 的平方，按定义 N 就是完全平方数。所以“表达式为真 ⇒ N 为完全平方数”成立，命题正确。
**正确判断依据：** 命题是单向蕴含（表达式真 ⇒ 完全平方）。只要存在整数 k 使 \`k*k == N\`，N 必为完全平方数，这是整数相等，与浮点是否精确无关。
**易错点：** 注意蕴含方向。反方向（“完全平方数一定使表达式为真”）在极大 N 下可能因 \`sqrt\` 浮点误差而失效，但本题并未断言反方向。
**最小验证：** \`N=25\`：\`int(sqrt(25))=5\`，\`5*5=25==25\` 为真，25 确是完全平方数；\`N=8\`：\`int(sqrt(8))=2\`，\`2*2=4≠8\` 为假。`,
            tags: ['数学函数', '类型转换'],
        },
        {
            id: 20,
            type: 'judge',
            question: `下面C++代码执行后将输出2*3=6。
\`\`\`cpp
int a = 2, b = 3;
printf("%%a*%%b=%d",a*b);
\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：错误**
**推导过程：** \`printf\` 中 \`%%\` 是转义，输出一个字面的 \`%\`。逐段解析格式串 \`"%%a*%%b=%d"\`：\`%%\`→\`%\`，\`a*\`→原样，\`%%\`→\`%\`，\`b=\`→原样，\`%d\`→输出 \`a*b\` 的值 6。所以实际输出是 \`%a*%b=6\`，而不是命题所说的 \`2*3=6\`。命题错误。
**正确判断依据：** 字母 a、b 是普通字符原样输出；只有 \`%d\` 会被替换成数值，输出里根本不会出现 2 和 3。
**易错点：** 不要把 \`%%\` 当成注释或忽略；它专门用于输出百分号。
**最小验证：** 把 \`"%%a*%%b=%d"\` 逐字符替换 → \`%a*%b=6\`，与 \`2*3=6\` 明显不同。`,
            tags: ['输入输出', 'printf格式化'],
        },
        {
            id: 21,
            type: 'judge',
            question: `以下C++代码因为循环变量为 _ 将导致错误，即不能作为变量名称，不符合C++变量命名规范。
\`\`\`cpp
for (int _ = 0; _ < 10; _++)
    continue;
\`\`\``,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            sourcePages: [6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：错误**
**推导过程：** 循环变量名是下划线 \`_\`。在 C++ 中，标识符由字母、数字、下划线组成且不以数字开头即合法，\`_\` 完全满足，可以单独作变量名。所以“它不能作为变量名、不符合命名规范”是错误说法，代码能正常编译运行。命题错误。
**正确判断依据：** 下划线是合法的标识符字符，\`_\` 作循环变量并无语法问题。
**易错点：** 不要把下划线误当成非法字符；以 \`_\` 开头 / 单独使用都合法（只是某些以 \`_\` 开头的名字在标准中被实现保留，不等于非法）。
**最小验证：** \`for (int _ = 0; _ < 10; _++) continue;\` 可通过编译，\`_\` 就是普通循环变量。`,
            tags: ['标识符', '变量命名'],
        },
        {
            id: 22,
            type: 'judge',
            question: `下面C++代码执行后因为有break，将输出0。
\`\`\`cpp
int i;
for (i = 0; i < 10; i++){
    continue;
    break;
}
cout << i;
\`\`\``,
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
**推导过程：** 循环体里 \`continue\` 先执行，它后面的 \`break\` 永远到不了（死代码）。于是 \`break\` 从不生效，循环正常地让 \`i\` 从 0 递增到 10，\`i<10\` 为假时退出，\`cout << i\` 输出 10，而不是命题所说的 0。命题错误。
**正确判断依据：** \`continue\` 跳过本轮剩余语句（包括 \`break\`），\`for\` 的 \`i++\` 照常执行，最终 \`i=10\`。
**易错点：** “因为有 break 将输出 0”是陷阱——\`break\` 被前面的 \`continue\` 挡住，根本执行不到。
**最小验证：** 每轮都是“进入 → continue → i++”，直到 \`i=10\` 时 \`10<10\` 为假退出，输出 10。`,
            tags: ['循环控制', '程序分析'],
        },
        {
            id: 23,
            type: 'judge',
            question: `下面的C++代码执行后将输出18行“OK”。
\`\`\`cpp
int i,j;
for (i = 8; i > 2; i-=2)
    for (j =0; j < i; j++)
        printf("OK\\n");
\`\`\``,
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
**推导过程：** 外层 \`i\` 取 8、6、4（\`i>2\`，每次减 2；\`i=2\` 时 \`2>2\` 为假停止）。内层 \`j\` 从 0 到 \`i-1\` 各执行 \`i\` 次，分别输出 8、6、4 行。总行数 \`8 + 6 + 4 = 18\`，每次一行 \`OK\`，共 18 行。命题正确。
**正确判断依据：** 内层次数随外层 \`i\` 变化，需按 8+6+4 求和，而不是简单地按外层 3 轮或 \`i×i\` 估算。
**易错点：** \`i-=2\` 使 \`i\` 只取偶数 8、6、4；\`j<i\` 不含 \`j=i\`。
**最小验证：** \`8 + 6 + 4 = 18\`，即 18 行 OK。`,
            tags: ['嵌套循环', '程序分析'],
        },
        {
            id: 24,
            type: 'judge',
            question: `将下面C++代码中的 i = 1 调整为 i = 0 的输出结果相同。
\`\`\`cpp
int i;
int cnt = 0;
for (i = 1; i < 5; i++)
    if(i%2) cnt += 1;
cout << cnt;
\`\`\``,
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
**推导过程：** 原代码 \`i\` 取 1..4，只有奇数使 \`i%2\` 为真：\`i=1、3\` 各 \`cnt+1\`，得 \`cnt=2\`。改成 \`i=0\` 后多了 \`i=0\` 这一轮，但 \`0%2=0\` 为假、不计数，其余不变，仍是 \`cnt=2\`。两种写法输出相同，命题正确。
**正确判断依据：** 新增的 \`i=0\` 是偶数，对 \`cnt\` 无贡献；循环多一轮不一定改变结果，要看新增那轮是否真的执行了累加。
**易错点：** 别只比较循环次数，要看每轮是否满足 \`if(i%2)\`。
**最小验证：** 两种写法里满足条件的奇数集合都是 {1, 3}，\`cnt\` 均为 2。`,
            tags: ['循环', '奇偶判断'],
        },
        {
            id: 25,
            type: 'judge',
            question: `下面两段C++代码都是用于求1-10的和，其运行结果相同。通常说来，for循环都可以用while循环实现。
\`\`\`cpp
int tnt;
int i;
tnt = 0;
for (i = 1; i < 10 + 1; i++)
    tnt += i;
cout << tnt << endl;
\`\`\`
\`\`\`cpp
int tnt;
int i;
tnt = 0;
i = 1;
while (i <= 10){
    tnt += i;
    i += 1;
}
cout << tnt << endl;
\`\`\``,
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
**推导过程：** 第一段 \`for (i=1; i<10+1; i++)\` 即 \`i\` 取 1..10，累加得 \`1+2+…+10=55\`；第二段 \`while (i<=10)\` 同样让 \`i\` 取 1..10 累加，也得 55，两段结果相同。而 \`for(初始化; 条件; 更新)\` 本就可等价改写为“初始化; while(条件){循环体; 更新;}”，所以“for 循环通常都能用 while 实现”成立。命题正确。
**正确判断依据：** 两段的循环边界都覆盖 1 到 10；for 与 while 表达能力等价，可互相转换。
**易错点：** 第一段 \`i<10+1\` 即 \`i<=10\`，含 10；第二段 \`i<=10\` 也含 10，两者边界一致。
**最小验证：** 两段都算 \`1+2+…+10=55\`。`,
            tags: ['循环', '循环等价'],
        },
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '寻找数字',
            timeLimit: '1.0 s',
            memoryLimit: '512.0 MB',
            sourceVerified: true,
            sourcePage: 8,
            sourcePages: [8, 9],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            samples: [
                {
                    input: `3\n16\n81\n10`,
                    output: `2\n3\n-1`,
                },
            ],
            question: `
# [GESP202412 二级] 寻找数字
- **试题名称**：寻找数字
- **时间限制**：1.0 s
- **内存限制**：512.0 MB
## 题面描述
小杨有一个正整数 $a$，小杨想知道是否存在一个正整数 $b$ 满足 $a=b^4$。
## 输入格式
第一行包含一个正整数 $t$，代表测试数据组数。
对于每组测试数据，第一行包含一个正整数代表 $a$。
## 输出格式
对于每组测试数据，如果存在满足条件的正整数 $b$，则输出 $b$，否则输出 $-1$。
## 样例
### 输入样例 1
\`\`\`text
3
16
81
10
\`\`\`
### 输出样例 1
\`\`\`text
2
3
-1
\`\`\`
## 数据范围
对于全部数据，保证有 $1\\le t\\le 10^5$，$1\\le a\\le 10^8$。
`,
            score: 25,
            explanation: `**算法推导：** 判断 $a$ 是否为某个正整数的 4 次方。对 $a$ 连续开两次平方（\`sqrt(sqrt(a))\`）得到 4 次方根的近似，向下取整得候选 $b$；再用整数比较 \`b*b*b*b == a\` 精确校验，相等就输出 $b$，否则输出 $-1$。逐组读入 $t$ 组数据，每组 $O(1)$。
**常见错误方法：**
- 只用浮点比较 \`sqrt\` 的结果、不做 \`b*b*b*b == a\` 的整数回代校验，可能因精度误判。
- 忘记外层按 $t$ 组循环，只处理了一组数据。
**易错点：** 浮点开方只用来定位候选 $b$，必须再做整数回代 \`b^4 == a\` 才能下结论；本题 $a\\le 10^8$ 时 $b\\le 100$，\`int\` 足以存放 $b^4$。
**最小验证：** 样例三组——$16$→$b=2$，$2^4=16$ 输出 2；$81$→$b=3$，$3^4=81$ 输出 3；$10$→$b=1$，$1^4=1\\ne 10$ 输出 $-1$，与样例一致。`,
            tags: ['编程题', '数学', '开方'],
            template: `#include <iostream>
#include <cmath>
using namespace std;
int main() {
    // 在此编写代码
    return 0;
}`,
            referenceCode: `#include <iostream>
#include <cmath>
using namespace std;
int main() {
    int t;
    cin >> t;
    while (t--) {
        int a;
        cin >> a;
        int b = (int)(sqrt(sqrt(a)));
        if (b * b * b * b == a) {
            cout << b << endl;
        } else {
            cout << -1 << endl;
        }
    }
    return 0;
}`,
        },
        {
            id: 27,
            type: 'programming',
            title: '数位和',
            timeLimit: '1.0 s',
            memoryLimit: '512.0 MB',
            sourceVerified: true,
            sourcePage: 9,
            sourcePages: [9, 10],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            samples: [
                {
                    input: `3\n16\n81\n10`,
                    output: `9`,
                },
            ],
            question: `
# [GESP202412 二级] 数位和
- **试题名称**：数位和
- **时间限制**：1.0 s
- **内存限制**：512.0 MB
## 题面描述
小杨有 $n$ 个正整数，小杨想知道这些正整数的数位和中最大值是多少。
“数位和”指的是一个数字中所有数位的和。例如：
对于数字 $12345$，它的各个数位分别是 $1,2,3,4,5$。将这些数位相加，得到：
$$1+2+3+4+5=15$$
因此，$12345$ 的数位和是 $15$。
## 输入格式
第一行包含一个正整数 $n$，代表正整数个数。
之后 $n$ 行，每行包含一个正整数。
## 输出格式
输出这些正整数的数位和的最大值。
## 样例
### 输入样例 1
\`\`\`text
3
16
81
10
\`\`\`
### 输出样例 1
\`\`\`text
9
\`\`\`
## 数据范围
对于全部数据，保证有 $1\\le n\\le 10^5$，每个正整数不超过 $10^{12}$。
`,
            score: 25,
            explanation: `**算法推导：** 逐个读入正整数，用 \`while (tmp>0){ smu += tmp%10; tmp/=10; }\` 求它的数位和，再用 \`max\` 维护全局最大值。每个数最大 $10^{12}$，需用 \`long long\` 接收；数位和最大约 $13\\times 9=117$，用 \`int\` 足够。总复杂度约 $O(n\\times 位数)$。
**常见错误方法：**
- 用 \`int\` 接收高达 $10^{12}$ 的输入会溢出，应改用 \`long long\`。
- 求完一个数的数位和后忘记与当前最大值比较更新。
**易错点：** 输入变量（\`tmp\`）要用 \`long long\`，数位和累加变量（\`smu\`）用 \`int\` 即可；\`while\` 条件是 \`tmp>0\`，把每一位取完为止。
**最小验证：** 样例三个数 $16\\to 7$、$81\\to 9$、$10\\to 1$，最大为 9，与样例输出一致。`,
            tags: ['编程题', '数位处理', '统计'],
            template: `#include <bits/stdc++.h>
using namespace std;
int main() {
    // 在此编写代码
    return 0;
}`,
            referenceCode: `#include <bits/stdc++.h>
using namespace std;
#define ll long long
int main() {
    int n;
    cin >> n;
    int x = 0;
    for (int i = 0; i < n; i++) {
        int smu = 0;
        ll tmp;
        cin >> tmp;
        while (tmp > 0) {
            smu += tmp % 10;
            tmp /= 10;
        }
        x = max(x, smu);
    }
    cout << x << endl;
    return 0;
}`,
        },
    ],
};
