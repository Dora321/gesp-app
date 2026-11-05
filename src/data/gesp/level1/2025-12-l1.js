// 2025年12月 GESP C++ 一级真题
import { createLevel1Paper } from './shared.js';

import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2025-12-l1',
  title: '2025年12月 GESP C++ 一级真题',
  level: 1,
  year: 2025,
  month: 12,
  session: 12,
  timeLimit: 5400,
  source: {
    officialPdf: 'https://github.com/Dora321/gesp-official-pdfs/blob/main/pdfs/2025%E5%B9%B412%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    type: 'official',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  verification: {
  status: "verified",
  reviewedBy: "AI-Codex",
  reviewedAt: "2026-11-06",
  scope: "全卷五维逐题对照mirror PDF；参考代码独立编译运行，源疑点保持隔离。",
  notes: "AI-Codex对照mirror PDF全部9页文本及渲染；Git blob SHA 1f798b8619325cbf9c9178b067276e921ecb1c4f一致。恢复多处改写选项与漏录代码，25个answer字段全部保持。解析为AI逻辑复核，参考代码及模板有GNU C++17独立编译运行证据。",
  dimensions: {
    statement: "verified",
    options: "verified",
    answer: "verified",
    explanation: "verified",
    referenceCode: "verified"
  }
},
  questions: [
    {
      id: 1,
      type: 'single',
      question: `近日，空中客车公司表示，约6000架空客A320系列飞机需要紧急更换一种易受太阳辐射影响的飞行控制软件。空客表示，在对一起飞行事故分析后的结果显示，强烈的太阳辐射可能会损坏飞行控制系统所需的关键数据，导致判断失误，进而引发飞行异常。那这里的飞行控制系统执行判断的部件最可能是下面的（ ）。`,
      options: ['辐射传感器', '处理器', '内存单元', '输出设备'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n题目问的是执行判断的部件，处理器负责执行指令及逻辑判断，因此选B。传感器获取外部数据，内存保存程序与数据，输出设备呈现结果。背景中数据可能受影响不意味着判断也由存储器完成，解题要按具体功能区分部件。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 2,
      type: 'single',
      question: "下面的C++代码在某集成开发环境中编译运行时，提示有“Invalid Character”（“无效字符”）错误。可能的原因是（ ）：\n\n```cpp\nint a, b;\na=3，b = 4; // L1\ncout << a; // L2\ncout << b; // L3\n```",
      options: [
        'L1行代码中的逗号很可能是中文逗号，应该改为英文逗号。',
        'L1行应该分为两行，分别是 a = 3 和 b = 4 。',
        '代码运行前没有保存到文件。',
        'L2和L3不能分为两行，应合并为一行。',
      ],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n原卷L1中a=3与b=4之间是中文逗号，应改为C++支持的英文逗号，选A。英文逗号表达式可按顺序完成两个赋值，不必拆成两行。两个cout语句分别占行也合法；保存文件与否不能解释代码中出现的无效标点字符。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 3,
      type: 'single',
      question: `下面有关C++变量的说法，正确的是( )。`,
      options: ["不可以用for作为变量名，因为for是C++的关键字（保留字）。","_tnt不可以是变量名，因为变量名的第一个字符必须是英文字母。","_tnt_不可以是变量名，因为最后一个字符容易与减号混淆。","可以用printf作为变量名，因为printf是关键字，但这不是好习惯，因为printf有约定的功能与含义。"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\nfor是语言关键字，不能作为用户变量名，因此A正确。局部变量可用下划线开头，_tnt及_tnt_不会因为外形易混淆就不合法。D把printf说成关键字，理由错误；它是标准库函数名，适当局部作用域可有同名变量，但会遮蔽函数，实际应避免此类命名。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 4,
      type: 'single',
      question: `X 是C++的整型变量，则 \`cout << (X=3, X++, ++X);\` 执行后的输出是（ ）。`,
      options: ['3', '4', '5', '不确定'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n逗号表达式从左到右求值，先把X赋为3，再执行X++使其变为4，最后++X使其变为5。整个表达式取最后一项的值5，cout输出5，选C。逗号运算提供求值顺序，不能把这里的多个修改误判成没有顺序的冲突。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 5,
      type: 'single',
      question: `C++表达式 \`2+3 * 4 % 5\` 的值为（ ）。`,
      options: ['0', '4', '14', '50'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n先计算3*4=12，再执行12%5=2，最后2+2=4，选B。乘法与求余同级、左结合，均优先于加法。不能先把2+3算成5，再乘4和求余；括号不在源表达式中，不能自行更改分组。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 6,
      type: 'single',
      question: "下面的C++代码执行后，其输出是（ ）。\n\n```cpp\na = 3;\nb = a = 4;\nprintf(\"%d %d\", a, b);\n```",
      options: ['4 4', '3 3', '3 4', '4 3'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\nb=a=4按赋值右结合规则先将a设为4，再将赋值表达式的值4存入b。因此两个变量都为4，格式串按先a后b输出4 4，选A。a此前的3已经被覆盖，不能把它当作保留不变的初值。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator],
    },
    {
      id: 7,
      type: 'single',
      question: "下面的C++代码执行时如果先输入 10 回车后输入 20 并回车，其输出是 ( )。\n```cpp\nint N, M;\nprintf(\"第一个数:\");\nscanf(\"%d\", &N);\nprintf(\"第二个数:\");\nscanf(\"%d\", &M);\nprintf(\"%%(N+M)=%d\", N+M, int(N+M));\n```",
      options: ['30=30', '10+20=30', '%(N+M)=30', '错误提示'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n两次scanf分别读得10与20，N+M为30。格式串内%%输出一个普通百分号，(N+M)=作为文本原样输出，%d替换为30，所以数值结果为%(N+M)=30，选C。原代码还会先输出两个输入提示。多提供的int(N+M)实参没有对应格式说明，不会额外输出。",
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 8,
      type: 'single',
      question: "某个整数很长很长，形如：1232123212321……，其规律是从1开始逐一升高到3然后逐一降低到1，然后又逐一升高到3，一直到很长很长。假设最高位编号为1，要求判断从左边最高位开始的第N位数是几？在横线处应该填入的代码是（ ）。\n\n```cpp\nint N, M;\ncout << \"请输入编号：\";\ncin >> N;\nM = ________________;\nif (M != 0)\n    cout << M;\nelse\n    cout << 2;\n```",
      options: ['N % 4', 'N / 4', 'N % 3', 'N / 3'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n序列按1、2、3、2四位一组重复。编号N对4取余后，余数1、2、3分别对应原数字1、2、3，余数0对应2，由已有else处理，所以选A。N/4统计的是完整周期数，N%3或N/3也无法表达四位周期。最高位编号从1开始，不能误按从0编号。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.basics],
    },
    {
      id: 9,
      type: 'single',
      question: `下面C++代码执行后其输出是 ( )。\n\`\`\`cpp\nint i, tnt = 0;\nfor (i = 0; i < 100; i++)\n tnt += 1;\ncout << tnt << ' ' << i;\n\`\`\``,
      options: ['99 99', '100 99', '99 100', '100 100'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\ni从0进入循环，一直执行至99，共100轮；每次tnt加1，最终tnt为100。最后更新i到100后条件为假，且i定义在for外可继续使用，因此输出100 100，选D。循环次数与最后一次进入循环体的i=99不是同一个数。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 10,
      type: 'single',
      question: `有关下面C++代码的说法，错误的是（ ）。\n\`\`\`cpp\nint tnt = 0;\nfor (int i = 1; i < 10; i += 2) // L1\n tnt += i; // L2\ncout << tnt;\n\`\`\``,
      options: [
        'L1的 i < 10 改为 i < 11 结果相同。',
        'L1的 i = 1 改为 i = 0 结果相同。',
        'tnt += i 与 tnt = tnt + i 效果相同。',
        'tnt += i 与 tnt = i + tnt 效果相同。',
      ],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n原程序累加1、3、5、7、9，总和25。把上界改成i<11仍不包括11，偶数10也不会由步长2取到，因此A成立。把起点改为0后会累加0、2、4、6、8，和为20，结果改变，错误项为B。C、D对普通int加法在本题范围内等价。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 11,
      type: 'single',
      question: `下面C++代码执行后输出是 ( )。\n\`\`\`cpp\nint i;\nfor (i = 10; i < 100; i += 10) {\n if (i % 10 == 0)\n continue;\n printf("%d#", i);\n}\nif (i >= 100)\n printf("%d END", i);\n\`\`\``,
      options: ["10#20#30#40#50#60#70#80#90#100 END","100#100 END","100 END","没有输出"],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\ni取10、20、…、90，每次i%10都为0，触发continue，循环体printf全部被跳过。更新到100时退出，i>=100成立，输出100 END，选C。continue仍会执行for更新，不会停在某一个10的倍数死循环，也不会输出100#。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    },
    {
      id: 12,
      type: 'single',
      question: "两个正整数，只要不相等，就一直进行如下操作：最大数减去最小数得到一个值，该值和两个数的最小数构成新的两个正整数，重复操作，直到两个数相等，此时输出该数。下面的C++代码用于实现该操作，横线处应该填写的代码是（ ）。\n\n```cpp\nint N, M;\ncin >> N >> M;\nwhile (N != M){\n    if (N > M)\n        _______________;\n    else\n        _______________;\n}\ncout << N;\n```",
      options: ["```cpp\nN = N - M\nM = M - N\n```","```cpp\nM = M - N\nN = N - M\n```","```cpp\nM = N - M\nN = M - N\n```","```cpp\nN, M = M, N\nM, N = N, M\n```"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n应在N较大时用N=N-M减小N，在M较大时用M=M-N减小M，选A。两数始终为正，公约数集合保持不变，直到相等得到最大公约数。B在N>M时错误修改较小的M，可能变为负数；C也不保持正确的差值；D是逗号表达式，并非交换或执行指定减法。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.basics],
    },
    {
      id: 13,
      type: 'single',
      question: `如果一个正整数能被3整除，或者其某一位能被3整除，则称之为"漂亮数"。下面的C++代码用于判断正整数 N 是否为漂亮数。L1行的横线处应该填入的代码是（ ）。\n\`\`\`cpp\nint N, Flag;\ncin >> N;\nFlag = 0; \nif (N % 3 == 0)\n Flag = 1; \nelse\n while (N != 0) {\n if (____________){ // L1\n Flag = 1;\n break;\n }\n N /= 10;\n }\ncout << (Flag? "漂亮数" : "非漂亮数");\n\`\`\``,
      options: ['N % 10 == 0', 'N % 3 % 10 == 0', 'N % 10 % 3', 'N % 10 % 3 == 0'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n每轮N%10取当前个位，再%3判断这个数字是否为3的倍数，所以应比较N%10%3==0，选D。随后N/=10继续检查下一位；数字0也是3的倍数。A只检查个位是否0而漏掉3、6、9，B次序颠倒，C直接用非零余数作真条件，含义相反。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    },
    {
      id: 14,
      type: 'single',
      question: "如果正整数N的所有奇因数（即能将N整除的正奇数）的和是27的倍数，则称N是27的神秘数。下面的C++代码用于判断输入的N是否为27的神秘数。如输入53，它有两个奇因数1和53，则将输出Y。横线处应该填写的代码是（ ）。\n\n```cpp\nint i, N, cnt = 0;\ncin >> N;\nfor (i=1; i <= N; i++){\n    if (_________________)\n        cnt += i;\n}\nif (cnt % 27 == 0)\n    cout << 'Y';\n```",
      options: ["(N % i) && (i % 2)","(N % i == 0) && (i % 2 == 0)","(N % i == 0) && (i % 2)","(N % i) && (i % 2 == 0)"],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n需要同时满足“i整除N”和“i为奇数”：N%i==0与i%2非零，以&&连接，对应C。输入53时只有1和53两个奇因数，总和54能被27整除，输出Y。A、D没有正确筛选因数，B选的是偶因数；原卷没有else输出N，不能添加为原题代码。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 15,
      type: 'single',
      question: `执行下面C++代码可以找出千位与个位的和恰好等于中间两位的四位数，横线应填入 ( )。\n\`\`\`cpp\nint count = 0;\nint a, bc, d, tmp;\nfor (int i = 1000; i <= 9999; i++){\n a = (tmp = i) / 1000;\n __________________\n bc = tmp / 10;\n d = tmp-bc * 10;\n if (a+d == bc) {\n count++;\n }\n}\ncout << count;\n\`\`\``,
      options: ["tmp = i / 10;","tmp = i % 100;","tmp -= a * 1000;","tmp = i - i%1000;"],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\na=(tmp=i)/1000取得千位，但tmp仍为原数。减去a*1000后，tmp仅保留末三位，再除10得到中间两位bc，减bc*10得到个位d，因此选C。A先去掉个位，B只留末两位，D只留千位量级，都会破坏后续的取位过程。原题B不是i%1000，不能沿用旧题库中B与C等价的改写。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator],
    },
    {
      id: 16,
      type: 'judge',
      question: `鸿蒙是华为公司开发的一款操作系统，那么它能够将正确的源程序翻译成目标程序，并运行。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n操作系统管理资源与程序运行，源程序翻译成目标程序属于编译器等语言处理工具的职责，不能直接归因于操作系统本身，因此原叙述错误。操作系统可以承载编译器并运行生成的程序，但运行环境与负责翻译的工具并不是同一个概念。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 17,
      type: 'judge',
      question: `C++表达式 \`10 * 4 % 6\` 和 \`10 * 2 % 3\` 的结果相同。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n10*4%6按左结合先得40再求余，结果4；10*2%3先得20再求余，结果2。两个结果不同，因此原叙述错误。不能把被除数与除数同时缩小就认为余数值也保持不变，求余不是可任意约分的分式。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 18,
      type: 'judge',
      question: "下面C++代码执行后将输出0。\n\n```cpp\nint i;\nfor (i = 0; i < 10; i++)\n    if (i % 3 == 0)\n        continue;\n    else\n        break;\ncout << i;\n```",
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\ni=0时i%3==0成立，执行continue后仍更新到1。i=1时条件为假，执行else中的break，退出且不再更新。于是cout输出1而不是0，判断错误。原卷有else break，旧题库漏录这两行会让程序变成另一条执行路径。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 19,
      type: 'judge',
      question: `下面C++代码中的 \`i > -10; i--\` 改为 \`i < 10; i++\` 执行结果相同。\n\`\`\`cpp\nint tnt = 0;\nfor (int i = 0; i > -10; i--){\n if (i < 0)\n i = -i;\n tnt += i;\n}\ncout << tnt;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n原循环i=0后更新为-1；进入下一轮时i<0，改为1，随后更新又回到0，循环变量在0与-1的入口值之间反复，不能正常结束输出。改成递增版本则累加0至9并输出45，所以结果不相同，判断错误。原程序tnt持续增长最终还有整型溢出风险，不应启动无界运行后用偶然结果作证据。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 20,
      type: 'judge',
      question: `下面C++代码执行后将输出 99，因为 \`i < 100\` 不包括 100，而是到 99。\n\`\`\`cpp\nint cnt = 0;\nfor (int i = 0; i < 100; i++)\n cnt++;\ncout << cnt;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\ni从0至99共100个值，每轮cnt加1，最终cnt=100，因此判断错误。条件确实不包含100，但这并不意味着只有99轮，起点0也算一轮。计数变量cnt和循环变量i虽都参与程序，不能把最大进入值99直接当作cnt。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 21,
      type: 'judge',
      question: `下面的C++代码能用于判断输入的正整数是否为对称数。所谓对称数是指从左到右和从右到左读该数，其值相同，121或414等是对称数，而123不是对称数。（ ）\n\`\`\`cpp\nint n, new_number;\ncout << "请输入正整数:";\ncin >> n;\nnew_number = 0;\nwhile (n != 0){\n    new_number = new_number * 10 + n % 10;\n    n /= 10;\n}\nif (n == new_number)\n    cout << "对称数";\nelse\n    cout << "非对称数";\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n循环取位过程中持续执行n/=10，结束时原n已变成0；随后却用这个0与逆序结果比较，因此不能正确识别一般正整数回文，判断错误。例如输入121，new_number为121而n为0，会误报非对称数。应另存原数再比较，但不能把这项修复悄悄加入原题。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 22,
      type: 'judge',
      question: `下面的C++代码执行后将输出 0。（ ）\n\`\`\`cpp\nint tnt = 0;\nfor (int i = -100; i < 100; i++)\n    tnt += i;\ncout << tnt;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n-99至99可正负配对抵消为0，而循环还多包含-100，却没有100，所以总和为-100，不是0，判断错误。上界i<100严格排除了100，不能把-100至99误认为关于0对称的完整区间；中间经过0也不会抵消额外的负端点。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 23,
      type: 'judge',
      question: `某同学执行C++代码时 printf("%g\\n", (3 + 3.1415926535)); 输出 6.14159 而不是 6.1415926535，表明该同学的计算机存在故障需要重新安装C++软件。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n%g没有指定精度时，默认按6个有效数字格式化。3加3.1415926535约为6.1415926535，显示6.14159属于正常格式化结果，不表示计算机故障，因此判断错误。输出显示位数与内部浮点精度不同，若要更多位数，应按需要设置格式精度。",
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 24,
      type: 'judge',
      question: "如果x是C++代码中的double型变量，则对 `cout << (x? 1227 : 12.27);` 编译时将报错，因为1227和12.12分别是int和double类型，导致识别混乱。",
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n条件运算符允许两个算术分支采用不同类型。1227可转换为double，与12.27形成共同结果类型，表达式合法：x为0时选12.27，非0时选1227，因此“会因类型混乱编译报错”错误。原题后文把12.27写成12.12，也不能改变这条类型规则。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 25,
      type: 'judge',
      question: `在C++代码中，不可以将变量命名为 \`keyword\` ，因为它是C++语言的关键字。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nkeyword只是英语中“关键字”的意思，并不属于C++关键字列表，可以作为普通变量名，因此原叙述错误。判断是否为保留关键字必须核对具体拼写，不能仅看单词含义；for、while等与keyword的地位不同。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: `100.4
300.2
60.6
70.5`, output: `50.2` },
        { input: `99.8
200.9
60.2
70.1`, output: `49.9` }
      ],
      referenceCode: `#include <iostream>
#include <iomanip>
using namespace std;
int main() {
    double v, g, m, n;
    cin >> v >> g >> m >> n;
    double f1 = 0.5 * v;
    double f2 = (g < 300) ? m : n;
    cout << fixed << setprecision(1) << (f1 < f2 ? f1 : f2) << "\\n";
    return 0;
}`,
      question: "\n# [GESP202512 一级] 小杨的爱心快递\n\n## 题目描述\n\n小杨是\"爱心社区\"的小志愿者，每周他都会帮助邻居们寄送捐赠给山区小学的文具和书籍。快递公司为了支持公益行动，制定了特殊的运费规则，鼓励大家合理包装：\n\n假设快递的体积为 $V$，重量为 $G$。\n\n- 按体积计算：运费按体积计算，公式是 $0.5 \\times V$ 元。\n- 按重量计算：为了鼓励减轻包裹重量，规则是：当重量小于 300 克，即 $G < 300$ 时，运费为 $M$ 元；当重量达到或超过 300 克，即 $G \\geq 300$ 时，运费为 $N$ 元。\n\n快递公司的叔叔说：\"我们应该选择最公平合理的计费方式。\"\n\n所以，最终的运费会取按体积计算和按重量计算这两种方式中**价格较低**的那一个，这样对寄件人最公道。\n\n## 输入格式\n\n四行，每行一个一位小数的浮点数，分别代表，快递的体积 $V$，快递的重量 $G$，第一档重量运费 $M$，第二档重量运费 $N$。\n\n对于所有测试点，保证给出的浮点数不超过 $1000$。\n\n## 输出格式\n\n一行一个一位小数，代表实际快递运费。\n",
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: "**解析**\n\n先算体积价V/2.0，再按G<300选择重量价M，否则选择N，最终取两者较小值。G恰为300时必须使用N档。样例100.4、300.2、60.6、70.5得到50.2；第二组得到49.9。原卷浮点数不超过1000，输出固定一位小数；时间与额外空间O(1)，不能把两类价格相加。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: `5
10
1
20
99
19`, output: `R
R
L
99
L` }
      ],
      referenceCode: `#include <iostream>
using namespace std;
int main() {
    int t;
    cin >> t;
    for(int i = 0; i < t; i++) {
        int p;
        cin >> p;
        if(p <= 10) cout << "R\\n";
        else if(p <= 20) cout << "L\\n";
        else cout << p << "\\n";
    }
    return 0;
}`,
      question: "\n# [GESP202512 一级] 手机电量显示\n\n## 题目描述\n\n小杨的手机就像一个聪明的小助手，当电量变化时，它会用不同的方式来提醒我们，假设当前的电量百分比为 $P$：\n\n- 当电量非常低（不超过 10，即 $P \\leq 10$），它会显示一个大写字母 R，就像在说：\"快给我充电吧！（Red 警告色）\"\n- 当电量有点低（超过 10 但不超过 20，即 $10 < P \\leq 20$），它会显示一个大写字母 L。\n- 当电量比较充足（即 $P > 20$）时，它会直接显示具体的数字，也就是当前的电量百分比。\n\n## 输入格式\n\n第一行一个正整数 $T$，代表数据组数。\n\n对于每组数据，一行包含一个正整数 $P$，代表手机电量百分比。\n\n对于所有测试点，保证 $1 \\le T \\le 20$，$1 \\le P \\le 100$。\n\n## 输出格式\n\n对于每组数据，输出一行，代表当前手机显示的电量信息。\n",
      template: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}`,
      answer: '',
      score: 25,
      explanation: "**解析**\n\n对每组电量先判断P<=10，输出R；否则再判断P<=20，输出L；其余输出原整数。这样10归R、11与20归L、21起直接显示数字。按原卷1<=T<=20、1<=P<=100逐组处理，每组独占一行，时间O(T)，额外空间O(1)。样例10、1、20、99、19对应R、R、L、99、L。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition, LEVEL1_TAGS.loop],
    },
  ],
};
