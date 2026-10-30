// 2025年6月 GESP C++ 二级真题 (第10次认证)
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照 CCF GESP 原卷镜像校订。
// 镜像文件的 git blob 为 a63a41e5940dff2afdd191610e86c28b1c2e4bb3
//（1291016 字节），与 paperSources.js 登记值一致。
//
// 客观题答案均取自原卷答案表：
//   单选题：C A C A D D C C B A D D D D A
//   判断题：√ √ × √ × × × × × √
// 判断题答案表在 PDF 第 6 页以红色矢量记号呈现，已渲染后逐格人工读取。
//
// 原卷自身存在两处缺陷，均忠实保留并停止计分：
//   Q5：表达式 b == a 读取未初始化的局部变量 a，标准 C++ 行为未定义。
//   Q15：示例提示语为“请输入层数”，代码实际输出“请输入行数”。
const SOURCE_URL = 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf';
const REVIEWED_BY = '本站校订';
const REVIEWED_AT = '2026-07-27';

export const paperData = {
    id: '2025-06-l2',
    title: '2025年6月 GESP C++ 二级真题',
    level: 2,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 90 * 60,
    source: {
        officialPdf: SOURCE_URL,
        type: 'archived-official',
        notes: '题面、代码、选项、答案表、编程题样例、约束与参考程序均按 CCF GESP 原卷镜像逐页转录；Q5 与 Q15 的原卷缺陷已结构化标记。',
    },
    reviewStatus: 'verified',
    reviewScope: '全卷 27 题（单选 15 + 判断 10 + 编程 2）的题面、代码、选项、答案、解析，以及两道编程题的题意、约束、样例与原卷参考程序，均已逐题核验；Q5 与 Q15 因原卷缺陷从评分排除。',
    reviewedBy: '本站校订',
    reviewedAt: '2026-07-27',
    verification: {
        status: 'verified',
        reviewedBy: '本站校订',
        reviewedAt: '2026-07-27',
        scope: '全卷 27 题均已逐题对照 CCF GESP 原卷镜像核验；单选题答案取自第 1 页答案表，判断题答案按第 6 页红色矢量标记逐格读取；Q5 与 Q15 保留原卷缺陷并停止计分。',
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
            question: `2025 年 4 月 19 日在北京举行了一场颇为瞩目的人形机器人半程马拉松赛。比赛期间，跑动着的机器人会利用身上安装的多个传感器所反馈的数据来调整姿态、保持平衡等，那么这类传感器类似于计算机的（ ）。`,
            options: ['处理器', '存储器', '输入设备', '输出设备'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（输入设备）**

**核心解析：**
在计算机系统中，经典的冯·诺依曼架构把硬件划分为五大基本组成部分：运算器、控制器（两者合称中央处理器 CPU/处理器）、存储器、输入设备和输出设备。

各核心部件的功能与数据流向不同：
- **输入设备**：负责采集外部环境或自身状态的信息（如声音、图像、压力、位置、姿态等），将其转化为计算机能够识别的数字信号并送入系统内部。
- **处理器（CPU）**：相当于系统的“大脑”，负责对接收到的数据进行逻辑判断与计算，并生成控制决策。
- **存储器**：负责存放运行中的程序代码以及各类数据信息。
- **输出设备**：负责将计算机处理得到的结果展示或传送到系统外部（如显示画面、发出声音或驱动机械动作）。

题目中，人形机器人身上的各类传感器（如陀螺仪、加速度计、压力传感器等）负责实时检测机器人的倾斜角度、运动速度与受力情况，并将采集到的物理量转化成数据反馈给控制系统。数据流向是“从感知端流入系统”，这与计算机的**输入设备**功能完全一致。

**选项逐项分析：**
- **A 处理器**：❌ 处理器是运算与控制核心，负责根据传感器送来的数据进行计算并决定如何调整姿态，但它本身不负责直接采集外部环境与身体物理状态的数据。
- **B 存储器**：❌ 存储器（如内存、闪存）的作用是存储程序和数据，负责记住信息，并不具备采集外界物理信号的功能。
- **C 输入设备**：✅ 输入设备负责将外界信息采集并转换成计算机可处理的数据。机器人的各类传感器正是将运动姿态、路面反馈等数据输入给控制系统，属于典型的输入设备。
- **D 输出设备**：❌ 输出设备负责将处理结果传递到系统外部。在机器人中，驱动身体运动的关节电机、舵机或状态指示灯等属于输出设备（执行机构），它们接收处理器的指令并做动作；而传感器是数据源头，不属于输出设备。

**易错提醒：**
- 判断是输入还是输出设备，最关键的是看**数据流向**：
  - 数据由外部流入系统（环境/身体 -> 系统）：属于**输入设备**（如传感器、键盘、摄像头）；
  - 数据由系统流向外部（系统 -> 执行机构/人类）：属于**输出设备**（如电机、显示屏、音箱）。
- 不要把“感知部件”与“执行部件”混淆：传感器负责“看”和“感知”，是输入设备；电机负责“动”和“执行”，是输出设备。

**知识延伸：**
除了传统计算机的键盘、鼠标、麦克风外，在智能机器人、自动驾驶和物联网设备中，摄像头、激光雷达、超声波测距传感器、温湿度传感器等也都是非常重要的输入设备。`,
            tags: ['计算机基础'],
        },
        {
            id: 2,
            type: 'single',
            question: `小明购置的计算机使用一年后觉得内存不够用了，想购置一个容量更大的内存条，这时他需要的内存条是（ ）。`,
            options: ['RAM', 'ROM', 'CACHE', 'EPROM'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（RAM）**

**核心解析：**
计算机中常说的“内存”或“插内存条”，指的就是**随机存取存储器（RAM，Random Access Memory）**。
RAM 是计算机用来临时存放 CPU 正在运行的程序和实时数据的核心部件。它的读写速度非常快，但具备**易失性（断电后数据立刻丢失）**。平时所说的“加装 8GB 或 16GB 内存条”，就是给电脑扩充 RAM 的容量，让计算机能同时流畅运行更多程序。因此，小明想要购置的内存条是 RAM。

**选项逐项分析：**
- **A RAM**：✅ 正确。RAM 即随机存取存储器，日常电脑主板上插入的内存条正是 RAM，用于为操作系统和运行中的软件提供临时读写空间，小明升级容量购买的就是它。
- **B ROM**：❌ 错误。ROM 即只读存储器（Read-Only Memory），特点是断电后数据不丢失，但通常只能读取不能随意写入。它一般固化焊接在主板上，用来存放开机引导程序（如 BIOS），用户不能通过插内存条来升级 ROM。
- **C CACHE**：❌ 错误。CACHE 即高速缓冲存储器，通常直接集成在 CPU 芯片内部（如 L1、L2、L3 缓存），速度比 RAM 更快，用于解决 CPU 与内存之间的速度匹配问题。它无法单独作为内存条购买和插拔扩展。
- **D EPROM**：❌ 错误。EPROM 即紫外线可擦除可编程只读存储器，是 ROM 的一种技术类型，主要用于芯片固件存储，需要用紫外线照射才能擦除重写，不能作为电脑运行内存条使用。

**易错提醒：**
- **混淆“内存（RAM）”与“外存（硬盘）”**：很多同学容易把电脑的 512GB 硬盘或手机机身存储误称为“内存”。实际上，硬盘是外部存储器，用来长期保存文件（断电不丢失）；主板上的内存条才是 RAM，断电后内容全部清空。
- **记混 RAM 与 ROM 的英文缩写**：记住 \`RAM\` 中的 \`A\` 是 \`Access\`（随机存取，可读可写）；\`ROM\` 中的 \`O\` 是 \`Only\`（\`Read-Only\` 意为只读）。

**知识延伸：**
计算机存储体系按访问速度从快到慢排列为：**CPU 寄存器 > CPU 高速缓存（Cache） > 主内存（RAM） > 辅助存储器（固态硬盘 SSD / 机械硬盘 HDD）**。越靠近 CPU 的存储设备速度越快、造价越高、容量通常越小。`,
            tags: ['计算机基础'],
        },
        {
            id: 3,
            type: 'single',
            question: `下面 C++ 代码执行后的输出是（ ）。\n\n\`\`\`cpp\nint a=3;\nfloat b = 3.5;\ncout << (a *= b);\n\`\`\``,
            options: ['3', '3.5', '10', '11'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（10）**

**核心解析：**
1. **复合赋值运算的计算过程**：
   表达式 \`a *= b\` 的含义是将 \`a\` 与 \`b\` 相乘的结果再赋值给 \`a\`。
   变量 \`a\` 是整型（\`int\`，值为 3），变量 \`b\` 是浮点型（\`float\`，值为 3.5）。两者相乘时，整型变量 \`a\` 会隐式提升为浮点类型进行计算：\`3.0 * 3.5 = 10.5\`，计算结果为浮点数 \`10.5\`。
2. **整型赋值与向零截断**：
   运算完成后，需要将计算结果 \`10.5\` 存回左侧变量 \`a\` 中。由于 \`a\` 的类型是 \`int\`，浮点数转换为整数时会自动丢弃全部小数部分（即“向零截断”），不会进行四舍五入。因此，\`10.5\` 截断小数后，存入 \`a\` 的值是整数 \`10\`。
3. **赋值表达式的输出**：
   在 C++ 中，赋值表达式 \`(a *= b)\` 返回被修改后的变量 \`a\` 的引用，其值为 \`10\`。因此 \`cout\` 最终输出的结果为 \`10\`。

**选项逐项分析：**
- **A 3**：❌ 错误。3 是变量 \`a\` 的初始值。代码中执行了 \`a *= b\`，\`a\` 的值已经被重新计算并赋值，不会停留在初始值。
- **B 3.5**：❌ 错误。3.5 是变量 \`b\` 的初始值。表达式最终输出的是被赋值后的整型变量 \`a\` 的值，不可能输出浮点数 3.5。
- **C 10**：✅ 正确。\`a * b\` 计算结果为 10.5，赋值给整型变量 \`a\` 时截去小数部分，\`a\` 最终的值为 10，输出 10。
- **D 11**：❌ 错误。容易误以为浮点数转整型时会按照数学常识“四舍五入”（误以为 10.5 会进位变成 11）。C++ 语言规范规定浮点转整数直接截断小数，不会自动进位。

**易错提醒：**
- **浮点转整型直接丢弃小数**：C++ 中将浮点数类型（\`float\` / \`double\`）赋值给整数类型（\`int\`）时，采取的是直接丢弃小数部分的规则，即使是 10.9 转换后也是 10，绝不会自动四舍五入。
- **赋值目标的类型决定结果存储**：在 \`a *= b\` 这种复合赋值中，中间计算过程虽然会提升为精度更高的浮点型，但最终保存结果时，必须强制适应左侧变量 \`a\` 的数据类型。

**知识延伸：**
复合赋值运算符（如 \`+=\`、\`-=\`、\`*=\`、\`/=\`）本身也是一个表达式，其返回值就是被赋值后的左操作数。如果确实需要在 C++ 中对浮点数进行四舍五入后再转为整数，可以使用 \`<cmath>\` 头文件中的 \`round()\` 函数，例如 \`round(10.5)\` 会返回 11。`,
            tags: ['数据类型'],
        },
        {
            id: 4,
            type: 'single',
            question: `下面 C++ 代码用于获得正整数的第 3 位数，如 1234 则输出 2。如果是一位数或两位数，则输出 0。横线处应填入的代码是（ ）。\n\n\`\`\`cpp\nint N, remainder;\ncout << "请输入正整数:";\ncin >> N;\ncout << _________________;\n\`\`\``,
            options: ['N % 1000 / 100', 'N / 1000 % 100', 'N / 1000 / 100', 'N % 100 / 100'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 1,
            sourcePages: [1, 2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（\`N % 1000 / 100\`）**

\`N % 1000\` 先保留末三位，再除以 100，整数除法会去掉末两位，于是得到从右往左数第 3 位。以 1234 为例，$1234\\%1000=234$，$234/100=2$。当 $N<100$ 时，\`N/100\` 的整数商为 0，也符合题意。`,
            tags: ['数位提取'],
        },
        {
            id: 5,
            type: 'single',
            question: `下面 C++ 代码执行，其输出是（ ）。\n\n\`\`\`cpp\nint a, b = (6, 28);\nb == a;\na = b;\ncout << a << ' ' << b;\n\`\`\``,
            options: ['6 28', '6 6', '28 6', '28 28'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            sourceIntegrity: 'official-source-defect',
            integrityNote: '原卷代码先声明但未初始化局部变量 a，随后在表达式 b == a 中读取 a；标准 C++ 下这是未定义行为，程序没有可靠输出。官方答案 D 只反映命题意图：b 由逗号表达式得到 28，随后 a=b，预期输出 28 28。本题保留官方答案但不计分。',
            explanation: `**原卷答案：D（\`28 28\`）；本题不计分**

\`b = (6, 28)\` 使用逗号表达式，先计算 6，再以最后一个值 28 初始化 \`b\`。如果忽略第二行，随后 \`a=b\` 会令两个变量都为 28，这就是原卷答案 D 的命题意图。

但第二行 \`b == a;\` 会先读取尚未初始化的局部变量 \`a\`。即使比较结果没有保存，这次读取本身已经造成未定义行为，因此标准 C++ 不能保证程序输出 \`28 28\`，也不能保证任何固定结果。本站忠实保留原代码和官方答案，并将该题从评分排除。`,
            tags: ['表达式'],
        },
        {
            id: 6,
            type: 'single',
            question: `今天星期六，其后第 N 天星期几？如果是星期一到星期六输出形如：星期 1、星期 2 等，星期天则输出星期天。下面的 C++ 代码用于完成上述要求，横线处应填上的代码是（ ）。\n\n\`\`\`cpp\nint N, remainder;\ncin >> N;\nremainder = _____________;\nif(remainder == 0)\n    printf("星期六后第%d天是星期天\\n", N);\nelse\n    printf("星期六后第%d天是星期%d\\n", N, remainder);\n\`\`\``,
            options: ['(N + 6) / 7', '(N + 6) // 7', 'N % 7', '(N + 6) % 7'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（\`(N+6)%7\`）**

把星期天到星期六分别编号为 0 到 6，今天星期六的编号就是 6。经过 $N$ 天后的编号为 $(N+6)\\%7$。例如 $N=1$ 得到 0，即星期天；$N=2$ 得到 1，即星期一。选项 B 的 \`//\` 在 C++ 中会开始一段注释，不是整除运算。`,
            tags: ['取模运算'],
        },
        {
            id: 7,
            type: 'single',
            question: `下面的 C++ 代码执行后其输出是（ ）。\n\n\`\`\`cpp\nint i, Sum = 0;\nfor (i = 1; i < 10; i++){\n    Sum += i;\n    if(i % 2) continue;\n    if(i % 7) break;\n}\ncout << Sum;\n\`\`\``,
            options: ['45', '28', '3', '0'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 2,
            sourcePages: [2, 3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（3）**

$i=1$ 时先把 1 加入 \`Sum\`，因为 1 是奇数，执行 \`continue\`。$i=2$ 时再加 2，\`Sum=3\`；2 是偶数，不执行第一个 \`continue\`，而 \`2%7\` 非零，于是执行 \`break\`。循环立即结束并输出 3。`,
            tags: ['循环控制'],
        },
        {
            id: 8,
            type: 'single',
            question: `下面 C++ 代码执行后其输出是（ ）。\n\n\`\`\`cpp\nint i, j;\nfor(i = 1; i < 12; i++)\n    for(j = 1; j < i; j++)\n        if(i * j % 2 == 1)\n            break;\ncout << i * j;\n\`\`\``,
            options: ['110', '22', '12', '3'],
            answer: 2,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：C（12）**

外层循环结束时 \`i=12\`。最后一次真正执行内层循环是在 \`i=11\`：\`j\` 从 1 开始，$11\\times1$ 是奇数，因此立即 \`break\`，留下 \`j=1\`。外层自增到 12 后退出，最终输出 $i\\times j=12\\times1=12$。`,
            tags: ['嵌套循环'],
        },
        {
            id: 9,
            type: 'single',
            question: `下面 C++ 代码执行后输出是（ ）。\n\n\`\`\`cpp\nint i, cnt = 0;\nfor(i = -99; i < 100; i += 2)\n    cnt = 1 + cnt;\ncout << cnt;\n\`\`\``,
            options: ['101', '100', '99', '98'],
            answer: 1,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：B（100）**

**核心解析：**

本题考查 \`for\` 循环的执行流程、循环次数的计算以及自增累加操作。

1. **变量初始状态**：
   - 计数器 \`cnt\` 初始化为 \`0\`；
   - 循环变量 \`i\` 从 \`-99\` 开始。

2. **循环执行规律与取值范围**：
   - **循环条件**：\`i < 100\`；
   - **步长更新**：\`i += 2\`，每次循环结束后 \`i\` 增加 2；
   - **取值序列**：因为初始值 \`-99\` 是奇数，每次加 2 得到的结果依然是奇数。因此，\`i\` 在循环中依次取遍所有从 \`-99\` 开始到小于 100 的奇数：
     \`-99, -97, -95, ..., -3, -1, 1, 3, ..., 97, 99\`。
   - 当 \`i = 99\` 执行完毕后，\`i\` 变为 \`99 + 2 = 101\`，此时不满足条件 \`101 < 100\`，循环结束。

3. **计算循环次数**：
   - **方法一（正负对称分组法）**：
     - 负奇数部分：\`-99, -97, ..., -1\`，与正奇数 \`1\` 到 \`99\` 一一对应，共有 50 个；
     - 正奇数部分：\`1, 3, ..., 99\`，共有 50 个；
     - 总项数：\`50 + 50 = 100\`。
   - **方法二（等差数列项数公式）**：
     - 首项为 \`-99\`，末项为 \`99\`，公差为 \`2\`；
     - 项数 = \`(末项 - 首项) / 公差 + 1 = (99 - (-99)) / 2 + 1 = 198 / 2 + 1 = 99 + 1 = 100\`。

4. **累加结果**：
   循环体内的 \`cnt = 1 + cnt;\` 等价于 \`cnt++\`，每执行一次循环就将 \`cnt\` 的值加 1。循环共执行了 100 次，初始值为 0，最终输出的 \`cnt\` 为 100。

**选项逐项分析：**
- **A 101**：❌ 错误。该项通常是混淆了边界值，错误地将终点按照 100 代入或者误套用公式（例如误算为 \`(100 - (-99)) / 2 + 1\`）导致多算了 1 次。
- **B 100**：✅ 正确。\`i\` 取从 \`-99\` 到 \`99\` 的所有奇数，共 100 个数，循环体执行 100 次，\`cnt\` 累加到 100。
- **C 99**：❌ 错误。该项通常是在使用项数公式时，漏掉了最后的 \`+ 1\`（误算为 \`(99 - (-99)) / 2 = 99\`），少计了一次循环。
- **D 98**：❌ 错误。误判了末项边界（如误以为末项只能取到 97）或存在多重计算偏差。

**易错提醒：**
- **项数公式的加一**：计算闭区间连续等差序列项数时，公式为 \`(末项 - 首项) / 步长 + 1\`，切勿遗漏最后的 \`+ 1\`。
- **负数减法运算**：算式中减去负数等于加上正数，\`99 - (-99) = 99 + 99 = 198\`，避免出现符号混淆算成 \`0\`。
- **边界判断**：条件是 \`i < 100\`，由于 \`i\` 每次加 2 且始终保持为奇数，它能取到的最大有效值是 99 而不是 100。`,
            tags: ['循环'],
        },
        {
            id: 10,
            type: 'single',
            question: `下面 C++ 代码执行后输出是（ ）。\n\n\`\`\`cpp\nint i;\nfor(i = 1; i < 10; i++){\n    if(i % 3 != 0){\n        printf("A#");\n        continue;\n    }\n    else\n        break;\n    printf("0#");\n}\nif(i == 10) cout << "1";\n\`\`\``,
            options: ['A#A#', 'A#0#A#0', 'A#A#1', 'A#0#A#0#1'],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 3,
            sourcePages: [3],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：A（\`A#A#\`）**

$i=1$、$i=2$ 时都不能被 3 整除，各输出一次 \`A#\`，然后 \`continue\`。$i=3$ 时进入 \`else\` 并 \`break\`，所以循环结束时 \`i=3\`，最后的 \`i==10\` 不成立。\`printf("0#")\` 位于 \`continue\` 和 \`break\` 之后，无论走哪个分支都执行不到。`,
            tags: ['循环控制'],
        },
        {
            id: 11,
            type: 'single',
            question: `下面 C++ 代码执行后的输出是（ ）。\n\n\`\`\`cpp\nint i,j;\nfor(i = 0; i < 3; i++)\n    for(j = 0; j < i; j++)\n        printf("%d#%d-", i, j);\nprintf("END");\n\`\`\``,
            options: [
                '0#0-1#0-2#0-2#1-END',
                '0#0-1#0-1#1-2#0-2#1-2#2-3#0-3#1-3#2-END',
                '0#0-1#0-1#1-2#0-2#1-2#2-END',
                '1#0-2#0-2#1-END',
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（\`1#0-2#0-2#1-END\`）**

$i=0$ 时条件 \`j<i\` 一开始就不成立，没有输出；$i=1$ 时只有 $j=0$，输出 \`1#0-\`；$i=2$ 时 $j=0,1$，输出 \`2#0-2#1-\`。两个循环全部结束后才执行 \`printf("END")\`，合并后正是选项 D。`,
            tags: ['嵌套循环'],
        },
        {
            id: 12,
            type: 'single',
            question: `下面 C++ 代码执行后，将输出不能被 3 整除且除以 5 余数为 2 的数。下列选项不能实现的是（ ）。\n\n\`\`\`cpp\nint i,j;\nfor(i = 0; i < 100; i++)\n    if(______________________)\n        cout << i << endl;\n\`\`\``,
            options: ['(i % 3 != 0) && (i % 5 == 2)', '(i % 3) && (i % 5 == 2)', '(i % 3) && !(i % 5 != 2)', '!(i % 3) && (i % 5 == 2)'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（不能实现）**

\`i%3\` 非零就表示不能被 3 整除，所以 A、B 的前半部分等价；C 的 \`!(i%5!=2)\` 等价于 \`i%5==2\`，也能实现。D 的 \`!(i%3)\` 恰好表示 \`i%3==0\`，筛选的是能被 3 整除的数，与要求相反。`,
            tags: ['逻辑运算'],
        },
        {
            id: 13,
            type: 'single',
            question: `下面 C++ 代码用于判断一个大于 0 的正整数是几位数，横线处应填入代码先后是（ ）。\n\n\`\`\`cpp\nint N, cnt;\ncout << "请输入大于0的正整数：";\ncin >> N;\n\ncnt = 0;\nwhile (_________){\n    cnt += 1;\n    ______________;\n}\n\ncout << cnt;\n\`\`\``,
            options: ['N > 1；N = N / 10', 'N > 1；N /= 10', 'N == 0；N /= 10', 'N > 0；N /= 10'],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 4,
            sourcePages: [4, 5],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：D（\`N>0\`，\`N/=10\`）**

每做一次 \`N/=10\` 就去掉一个十进制数位，同时把计数器加 1。当所有数位都被去掉后，\`N\` 变为 0，循环结束。条件若写成 \`N>1\`，输入 1、10、100 等数时都会少数一位；\`N==0\` 则会让正整数一开始就不进入循环。`,
            tags: ['数位分离'],
        },
        {
            id: 14,
            type: 'single',
            question: `判断一个数是否为自守数。自守数的定义是如果一个数的平方其尾数与该数相同，则为自守数，如 25 的平方是 625，其尾数是 25，所以 25 是自守数。相关说法错误的是（ ）。\n\n\`\`\`cpp\nint N, N1, M1;\ncout << "输入一个正整数：";\ncin >> N;\nN1 = N, M1 = N * N;\n\nbool Flag = true;\n\nwhile (N1 > 0){\n    if (N1 % 10 != M1 % 10){\n        Flag = false;\n        break;\n    }\n    else{\n        N1 = N1 / 10, M1 = M1 / 10;\n    }\n}\n\nif (Flag == true)\n    printf("%d的平方是%d,是自守数", N, N * N);\nelse\n    printf("%d的平方是%d,不是自守数", N, N * N);\n\`\`\``,
            options: [
                '如果 Flag 在循环中不被改为 false，则说明该数是自守数',
                '代码 if (N1 % 10 != M1 % 10) 用于判断其个位数是否相等，如果不等，则表明不是自守数',
                '代码 N1 = N1 / 10, M1 = M1 / 10 将个位数去掉',
                '将 N1 > 0 改为 N > 0 效果相同',
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            explanation: `**答案：不正确的是 D**

**不正确的是 D（将 N1 > 0 改为 N > 0 效果不同）**

**核心解析：**
本题通过“数位逐位比较法”判断一个数是否为自守数。程序用 \`N1\` 保存原始输入 \`N\` 的副本，用 \`M1\` 保存其平方 \`N * N\`：
1. 循环条件 \`while (N1 > 0)\` 保证只要 \`N1\` 还有未比较的数位，循环就继续；当 \`N1\` 的所有数位都剥离完毕变为 \`0\` 时，循环正常结束。
2. 原始变量 \`N\` 在循环体内部从未被修改过。若将条件改为 \`while (N > 0)\`，因为输入的正整数 \`N\` 始终大于 0，循环条件将恒为真。对于自守数（如 25），由于每位都匹配不会触发 \`break\`，程序将陷入死循环，无法正常结束。因此二者效果完全不同。

**选项逐项分析：**
- **A 如果 Flag 在循环中不被改为 false，则说明该数是自守数**：说法正确。\`Flag\` 初始值为 \`true\` 作为标记变量，只要逐位比较过程中每一位都相同，\`Flag\` 就不会被改为 \`false\`，循环结束后判定为自守数。
- **B 代码 if (N1 % 10 != M1 % 10) 用于判断其个位数是否相等，如果不等，则表明不是自守数**：说法正确。整除取余运算 \`% 10\` 可以取出当前数值的最低位（个位）。一旦发现某一位不相等，说明尾数不匹配，即可判定不是自守数并执行 \`break\` 提前结束。
- **C 代码 N1 = N1 / 10, M1 = M1 / 10 将个位数去掉**：说法正确。在 C++ 整数除法中，正整数除以 10 会向下取整舍弃小数部分，作用等同于“砍掉”当前的个位数，使十位数变成新的个位数，以便下一轮循环继续比较。
- **D 将 N1 > 0 改为 N > 0 效果相同**：说法错误。\`N\` 是未被修改的固定正整数，改成 \`N > 0\` 会导致自守数测试陷入无限死循环，两者的运行逻辑与效果截然不同。

**易错提醒：**
- 混淆“原始输入变量”与“循环控制变量”：在编写数位拆分程序时，为了最后能够输出原数，通常要保留 \`N\` 不变，专门使用一个副本变量 \`N1\` 来不断除以 10 并控制循环步进。

**知识延伸：**
- **数位剥离基本套路**：通过 \`x % 10\` 取出末位、通过 \`x = x / 10\` 去掉末位，二者结合配合 \`while (x > 0)\` 是 GESP 二级中解决回文数、水仙花数、数字反转等问题的基础核心模板。`,
            tags: ['数位判断'],
        },
        {
            id: 15,
            type: 'single',
            question: `下面 C++ 代码实现输出如下图形，相关说法错误的是（ ）。\n\n\`\`\`text\n请输入层数: 10\n0\n12\n345\n6789\n01234\n567890\n1234567\n89012345\n678901234\n5678901234\n\`\`\`\n\n\`\`\`cpp\nint line_number, now_number;\nint i,row;\n\ncout << "请输入行数: ";\ncin >> line_number;\nnow_number = 0;\n\nfor (row = 1; row < line_number + 1; row++){ // L1\n    for (i = 0; i < row; i++){ // L2\n        cout << now_number;\n        now_number += 1;\n        if (now_number == 10) now_number = 0; // L3\n    }\n    cout << endl;\n}\n\`\`\``,
            options: [
                '代码 now_number = 0 移动到 L1 和 L2 标记的两行代码之间，效果维持不变',
                '代码 now_number += 1 修改为 now_number = 1 + now_number 效果维持不变',
                '将代码 now_number == 10 调整为 now_number > 9 效果维持不变',
                '将最后一行的 cout << endl 修改为 cout << "\\n"，效果维持不变',
            ],
            answer: 0,
            score: 2,
            sourceVerified: true,
            sourcePage: 5,
            sourcePages: [5, 6],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            sourceIntegrity: 'official-source-defect',
            integrityNote: '原卷示例首行显示“请输入层数: 10”，所给代码却输出“请输入行数: ”，因此代码不能逐字产生题目展示的完整输出。官方答案 A 仍能反映数字图形部分的命题意图，但题面与代码不一致，本题不计分。',
            explanation: `**答案：不正确的是 A**

**不正确的是 A（将 now_number = 0 移动到内外层循环之间会导致每行都从 0 开始计数）**

**核心解析：**
本题考查双重 \`for\` 循环的执行流程，以及变量初始化语句位置对程序运行结果的影响。

1. **原程序的执行逻辑**：
   - 语句 \`now_number = 0;\` 写在整个双重循环的外部，因此 \`now_number\` 起到了“跨行连续计数器”的作用。
   - 外层循环变量 \`row\` 控制行数（从第 1 行到第 \`line_number\` 行），内层循环变量 \`i\` 控制当前行输出的字符个数（第 \`row\` 行恰好输出 \`row\` 个数字）。
   - 在内层循环中，每输出一个数字就执行 \`now_number += 1;\`，当数值累加到 10 时重置为 0。因为 \`now_number\` 在换行后不被重置，数字序列在多行之间无缝连接递增，从而呈现出图示中连贯递增的三角形图案（\`0\`、\`12\`、\`345\`、\`6789\`……）。

2. **A 选项的位置变动分析**：
   - L1 标记的是外层循环语句 \`for (row = 1; ...)\`，L2 标记的是内层循环语句 \`for (i = 0; ...)\`。
   - 若将 \`now_number = 0;\` 移至 L1 和 L2 之间（即外层循环体内、内层循环开始前），则**每一行开始打印前，\`now_number\` 都会被重新赋值为 0**。
   - 这样输出的图形将变成：第 1 行输出 \`0\`，第 2 行输出 \`01\`，第 3 行输出 \`012\`……失去了连续滚动的效果，运行结果发生了根本改变。因此 A 项说法是错误的。

**选项逐项分析：**
- **A 代码 now_number = 0 移动到 L1 和 L2 标记的两行代码之间，效果维持不变**：❌ 说法错误，符合题意。原代码在双重循环外部初始化，数字跨行连续递增；若移至 L1 和 L2 之间，每打印新行都会重置为 0，导致每行数字均从 0 开始输出，效果无法维持不变。
- **B 代码 now_number += 1 修改为 now_number = 1 + now_number 效果维持不变**：✅ 说法正确。复合赋值语句 \`now_number += 1\` 的作用是将自身的值增加 1，与普通的赋值加法语句 \`now_number = 1 + now_number\` 在逻辑与执行效果上完全等价。
- **C 将代码 now_number == 10 调整为 now_number > 9 效果维持不变**：✅ 说法正确。\`now_number\` 是整数，初始为 0 且每次严格递增 1。当它从 9 增加到 10 的瞬间，\`now_number == 10\` 与 \`now_number > 9\` 均首次成立并触发归 0 操作，变量绝不可能出现大于 10 的情况，因此两者判定效果完全相同。
- **D 将最后一行的 cout << endl 修改为 cout << "\\n"，效果维持不变**：✅ 说法正确。\`cout << "\\n"\` 输出转义换行符，\`cout << endl\` 输出换行符并刷新流缓冲区。两者在终端屏幕上展现的换行显示效果完全一致。`,
            tags: ['嵌套循环'],
        },
        {
            id: 16,
            type: 'judge',
            question: `人们现在参加很多闭卷考试时通常都不允许带智能手机、平板电脑等，此外很多种智能手表同样因为具有嵌入操作系统及通信等功能，所以也不允许随身携带。（ ）`,
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

**判定依据：**
智能手表并非传统的机械表或纯计时电子表，它内部搭载了嵌入式操作系统（如 watchOS、Wear OS 等），具备数据存储、信息处理以及计算能力，并且通常配备蓝牙、Wi-Fi 或移动蜂窝网络等无线通信模块。佩戴者可以借助智能手表收发短信、查看提前存储的文本或图片，甚至与场外进行实时通信。为了维护闭卷考试的公平性与严肃性，杜绝利用高科技设备作弊，各类正规考试（如中高考、GESP 考级等）均明确规定，具有计算、存储与通信功能的智能手表与智能手机、平板电脑一样，一律严禁随身携带进入考场。因此，题干表述完全符合事实。

**选项逐项分析：**
- **A 正确**：✅ 现代智能手表具备嵌入式操作系统与无线通信能力，闭卷考场出于防作弊和考场纪律要求，明确禁止携带此类电子设备。
- **B 错误**：❌ 忽视了智能手表的通信与计算属性。将其误认为普通手表，不符合现代考场规范与实际设备功能。

**易错提醒：**
- 不要将「智能手表」与传统的「指针机械表」或仅具备计时功能的「简易数字手表」混淆。智能手表本质上属于便携式微型计算机设备，只要具备信息存储、联网或通信功能，都在闭卷考试的禁带范围内。

**知识延伸：**
- **嵌入式操作系统**：专门运行在特定智能硬件设备（如智能手表、路由器、车载系统等）中的操作系统。虽然相比电脑操作系统更加精简轻巧，但同样能够管理设备硬件、运行各类应用程序并支持网络通信。`,
            tags: ['计算机基础'],
        },
        {
            id: 17,
            type: 'judge',
            question: `在 C++ 代码中，假设 N 为正整数，则 \`N / 10\` 舍弃个位数。如果 N 小于 10，则其值为 0，大于 10 则是舍弃个位数的数。（ ）`,
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

**判定依据：**
1. **C++ 整数除法特性**：在 C++ 中，当被除数和除数都是整型时，除法运算 \`/\` 执行的是整除操作，结果会自动向零截断（即直接丢弃小数部分，只保留整数部分）。
2. **分情况验证**：
   - **当 \`N < 10\` 时**：\`N\` 的取值范围为 \`1\` 到 \`9\`，数学计算结果在 \`0.1\` 到 \`0.9\` 之间。经过整数除法向零截断后，结果均为 \`0\`，符合题干描述。
   - **当 \`N > 10\` 时**：以十进制数为例，除以 10 相当于将小数点向左移动一位，小数部分就是原数的个位数。整除后小数部分被舍弃，得到的正是去除个位数后的数值（例如 \`123 / 10 = 12\`，\`58 / 10 = 5\`）。
   - 注：当 \`N = 10\` 时，\`10 / 10 = 1\`，同样符合舍去个位数字 \`0\` 的规律。

因此题干描述完全符合 C++ 的运算规则。

**选项分析：**
- **A 正确**：✅ 题干对正整数 \`N / 10\` 在各区间的运算结果描述准确。
- **B 错误**：❌ 题干描述无误，故该判断项错误。

**易错提醒：**
- **整除与取模区分**：在数位拆解类题目中，\`N / 10\` 用于「舍弃个位 / 去掉末位」，而 \`N % 10\` 用于「获取个位 / 提取末位」，二者常配合循环使用。
- **操作数类型**：必须两边都是整数才会截断；若写成 \`N / 10.0\`，则会触发浮点数除法，结果将保留小数。`,
            tags: ['整数除法'],
        },
        {
            id: 18,
            type: 'judge',
            question: `下列 C++ 代码执行后，其输出为 \`10 20\`，即 \`a == b\` 和 \`b == a\` 对 \`a\` 和 \`b\` 的值没有任何影响。（ ）\n\n\`\`\`cpp\nint a = 10, b = 20;\na == b;\nb == a;\ncout << (a, b);\n\`\`\``,
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

两条 \`==\` 确实只是比较，不会修改 \`a\`、\`b\`。但 \`cout << (a, b)\` 中的括号是逗号表达式，它先计算 \`a\`，最后取 \`b\` 的值，因此只输出 \`20\`，不会输出 \`10 20\`。整句话包含错误的输出结论，所以判错。`,
            tags: ['表达式'],
        },
        {
            id: 19,
            type: 'judge',
            question: `a 和 b 分别是 C++ 的整型变量，如果表达式 \`max(a, b) == min(a, b)\` 的值为真，则说明 a 和 b 相等。（ ）`,
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

若 $a\\ne b$，较大值和较小值必然不同，\`max(a,b)\` 不可能等于 \`min(a,b)\`。只有 $a=b$ 时，最大值和最小值才是同一个数，因此该表达式为真能够推出 a 和 b 相等。`,
            tags: ['函数'],
        },
        {
            id: 20,
            type: 'judge',
            question: `下面 C++ 代码编译时将报错，因为字符变量 a 被赋值了浮点值。（ ）\n\n\`\`\`cpp\nchar a = '1';\na = 45.6;\ncout << a;\n\`\`\``,
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

C++ 允许把浮点数赋给 \`char\`，编译器会进行隐式数值转换：先截去 45.6 的小数部分得到 45，再存入字符变量。编译器可能给出“窄化转换”警告，但这不是必须导致编译失败的语法错误。输出时会按字符编码 45 对应的字符显示。`,
            tags: ['数据类型'],
        },
        {
            id: 21,
            type: 'judge',
            question: `下面 C++ 代码执行时如输入 59.99，将输出“及格”两个汉字。（ ）\n\n\`\`\`cpp\nint score;\ncout << "请输入学生成绩: ";\ncin >> score;\nif (score < 60)\n    cout << "不及格";\nelse\n    cout << "及格";\n\`\`\``,
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

\`score\` 是整数。输入 \`59.99\` 时，\`cin >> score\` 会成功读入小数点之前的 59，小数点及后面的内容留在输入缓冲区。因为 $59<60$，程序进入第一个分支并输出“不及格”，不是“及格”。`,
            tags: ['输入输出'],
        },
        {
            id: 22,
            type: 'judge',
            question: `在下面的 C++ 代码中，因为 \`continue\` 将被执行，因此不会有输出。（ ）\n\n\`\`\`cpp\nint i;\nfor (i = 1; i < 10; i++)\n    if (i % 2 == 0)\n        continue;\nif(i == 10)\n    cout << "END";\n\`\`\``,
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

\`continue\` 只影响当前一轮循环，且这里只有偶数 i 才执行。无论是否执行 \`continue\`，for 循环都会继续递增，最终在 \`i=10\` 时结束。循环后的 \`if(i==10)\` 成立，因此程序会输出 \`END\`。`,
            tags: ['循环控制'],
        },
        {
            id: 23,
            type: 'judge',
            question: `下面的 C++ 代码执行后将输出 15。（ ）\n\n\`\`\`cpp\nint Sum = 0;\nfor (int i = 0; i < 5; i++)\n    Sum += i;\ncout << Sum;\n\`\`\``,
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

循环变量依次为 0、1、2、3、4，不会取到 5，因此 \`Sum=0+1+2+3+4=10\`。15 是 $1+2+3+4+5$ 的结果，通常来自误把条件 \`i<5\` 看成 \`i<=5\`。`,
            tags: ['循环'],
        },
        {
            id: 24,
            type: 'judge',
            question: `将下面 C++ 代码中的 \`(int i = 5; i > 1; i--)\` 调整为 \`(int i = 1; i < 5; i++)\` 输出结果相同，因为 5 到 1 与 1 到 5 的求和相同。（ ）\n\n\`\`\`cpp\nint tnt;\ntnt = 0;\nfor (int i = 5; i > 1; i--)\n    tnt += i;\ncout << tnt;\n    cout << endl;\n\`\`\``,
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

原循环取 $i=5,4,3,2$，和为 14；修改后的循环取 $i=1,2,3,4$，和为 10。两个循环都使用严格不等号，前者不包含 1，后者不包含 5，所以并不是同一组数的反向遍历，输出不同。`,
            tags: ['循环边界'],
        },
        {
            id: 25,
            type: 'judge',
            question: `为实现如下效果，即 N 行 N 列字符。当输入是奇数时，中间列为 \`*\`，其他是 \`-\`；当输入是偶数时，则中间两列是 \`*\`，其他是 \`-\`。字符阵列后的代码能实现其效果。（ ）\n\n\`\`\`text\n/*\n5\n--*--\n--*--\n--*--\n--*--\n--*--\n*/\n\`\`\`\n\n\`\`\`cpp\nint N;\ncin >> N;\n\nint i,j;\nfor (i = 0; i < N; i++){\n    for (j = 0; j < N; j++)\n        if ((j == N / 2) || (j == (N-1) / 2))\n            cout << "*";\n        else\n            cout << "-";\n    cout << endl;\n}\n\`\`\``,
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

列下标从 0 开始。N 为奇数时，\`N/2\` 与 \`(N-1)/2\` 相等，只会选中唯一的中间列；N 为偶数时，两者分别是右中列和左中列，会选中相邻的两列。外层循环重复 N 行，因此得到题目要求的 N 行 N 列字符阵列。`,
            tags: ['嵌套循环'],
        },
    ],
    programmingQuestions: [
        {
            id: 26,
            type: 'programming',
            title: '数三角形',
            timeLimit: '1.0 s',
            memoryLimit: '512.0 MB',
            sourceVerified: true,
            sourcePage: 7,
            sourcePages: [7, 8],
            reviewedBy: REVIEWED_BY,
            reviewedAt: REVIEWED_AT,
            sourceUrl: SOURCE_URL,
            samples: [
                {
                    input: `3`,
                    output: `3`,
                },
                {
                    input: `5`,
                    output: `9`,
                },
            ],
            question: `
# [GESP202506 二级] 数三角形

- **试题名称**：数三角形
- **时间限制**：1.0 s
- **内存限制**：512.0 MB

## 题目描述

直角三角形有两条直角边与一条斜边，设两条直角边的长度分别为 $a,b$，则直角三角形的面积为 $\\dfrac{ab}{2}$。

请你计算当直角边长 $a,b$ 均取不超过 $n$ 的正整数时，有多少个不同的面积为整数的直角三角形。直角边长分别为 $a,b$ 和 $a',b'$ 的两个直角三角形相同，当且仅当 $a=a',b=b'$ 或者 $a=b',b=a'$。

## 输入格式

一行，一个整数 $n$，表示直角边长的最大值。

## 输出格式

输出一行，一个整数，表示不同的直角三角形数量。

## 样例

### 输入样例 1

\`\`\`text
3
\`\`\`

### 输出样例 1

\`\`\`text
3
\`\`\`

### 输入样例 2

\`\`\`text
5
\`\`\`

### 输出样例 2

\`\`\`text
9
\`\`\`

## 数据范围

对于所有测试点，保证 $1 \\le n \\le 1000$。
`,
            score: 25,
            explanation: `**算法：枚举不重复的两条直角边**

交换 $a,b$ 不会产生新的三角形，所以只枚举 $1\\le a\\le b\\le n$。面积 $ab/2$ 是整数，当且仅当乘积 $ab$ 是偶数，即两条边中至少一条是偶数。原卷参考程序用双重循环枚举所有这样的无序边长对，并在 \`a*b%2==0\` 时计数，时间复杂度为 $O(n^2)$；$n\\le1000$ 时可以通过。

**样例复算：**
- $n=3$ 时，符合条件的是 $(1,2),(2,2),(2,3)$，共 3 个。
- $n=5$ 时，无序边长对共有 $5\\times6/2=15$ 个。两边都为奇数的无序对来自 1、3、5，共 $3\\times4/2=6$ 个；其余 $15-6=9$ 个面积为整数。

**易错点：**
- 内层从 \`b=a\` 开始，避免把 $(2,3)$ 和 $(3,2)$ 重复计数。
- 面积为整数只需判断乘积是否为偶数，不需要使用浮点数。`,
            tags: ['编程题', '枚举', '奇偶性'],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: `#include <iostream>
using namespace std;

int main()
{
    int n, a, b, cnt=0;
    cin >> n;
    for(a=1; a<=n; a++)
    {
        for(b=a; b<=n; b++)
        {
            if(a*b%2==0) cnt++;
        }
    }
    cout << cnt <<endl;
    return 0;
}`,
        },
        {
            id: 27,
            type: 'programming',
            title: '幂和数',
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
                    input: `2 8`,
                    output: `6`,
                },
                {
                    input: `10 100`,
                    output: `20`,
                },
            ],
            question: `
# [GESP202506 二级] 幂和数

- **试题名称**：幂和数
- **时间限制**：1.0 s
- **内存限制**：512.0 MB

## 题目描述

对于正整数 $n$，如果 $n$ 可以表示为两个 2 的次幂之和，即 $n=2^x+2^y$（$x,y$ 均为非负整数），那么称 $n$ 为幂和数。

给定正整数 $l,r$，请你求出满足 $l\\le n\\le r$ 的整数 $n$ 中有多少个幂和数。

## 输入格式

一行，两个正整数 $l,r$，含义如上。

## 输出格式

输出一行，一个整数，表示 $l,r$ 之间幂和数的数量。

## 样例

### 输入样例 1

\`\`\`text
2 8
\`\`\`

### 输出样例 1

\`\`\`text
6
\`\`\`

### 输入样例 2

\`\`\`text
10 100
\`\`\`

### 输出样例 2

\`\`\`text
20
\`\`\`

## 数据范围

对于所有测试点，保证 $1 \\le l \\le r \\le 10^4$。
`,
            score: 25,
            explanation: `**算法：枚举两个 2 的次幂**

从 $1=2^0$ 开始不断乘 2，可以得到不超过 $r$ 的所有 2 的次幂。原卷程序用 \`a\` 枚举第一个幂，再令 \`b=a\` 枚举第二个幂，这相当于只考虑 $x\\le y$，避免把 $2^x+2^y$ 和 $2^y+2^x$ 重复计算。每得到一个和 \`n=a+b\`，若它在 $[l,r]$ 内就计数。

两个 2 的次幂之和具有唯一的二进制形式：指数不同时，二进制中恰有两个 1；指数相同时，和等于下一个 2 的次幂。因此这种按无序指数对计数不会把同一个整数重复统计。

**样例 1：**
$[2,8]$ 中的幂和数为 $2,3,4,5,6,8$，共 6 个。

不超过 $10^4$ 的 2 的次幂只有十几个，双重枚举的复杂度约为 $O((\\log r)^2)$。

**易错点：**
- $x,y$ 可以为 0，所以最小的幂是 $2^0=1$。
- 区间包含端点，判断应使用 \`n>=l && n<=r\`。`,
            tags: ['编程题', '枚举', '幂'],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: `#include <iostream>
using namespace std;

int main()
{
    int l, r, a, b, n, cnt = 0;
    cin >> l >> r;

    a = 1;
    while(a<=r)
    {
        b = a;
        while(b<=r)
        {
            n = a+b;
            if(n>=l && n<=r) cnt++;
            b *= 2;
        }
        a *= 2;
    }
    cout << cnt <<endl;
    return 0;
}`,
        },
    ],
};
