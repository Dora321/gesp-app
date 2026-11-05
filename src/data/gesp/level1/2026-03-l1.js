// 2026年3月 GESP C++ 一级真题
import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2026-03-l1',
  title: '2026年3月 GESP C++ 一级真题',
  level: 1,
  year: 2026,
  month: 3,
  session: 13,
  timeLimit: 90 * 60,
  source: {
    officialPdf: 'https://gesp.ccf.org.cn/101/attach/1734124574343200.pdf',
    type: 'official',
    notes: '客观题与编程题均依据官方 PDF 回填；少量代码题按官方版式做等价转写。',
  },
  verification: {
  status: "partial",
  reviewedBy: "AI-Codex",
  reviewedAt: "2026-11-06",
  scope: "全卷五维逐题对照mirror PDF；参考代码独立编译运行，源疑点保持隔离。",
  notes: "AI-Codex 对照登记 mirror PDF 全部10页文本与渲染；Git blob SHA 2687c10f481ebe55cd14bc61dec494cc3cd189c7 一致。保留25题answer，Q7官方B但A/B均成立，原卷疑点隔离；参考程序与模板另行编译运行。",
  dimensions: {
    statement: "partial",
    options: "partial",
    answer: "partial",
    explanation: "partial",
    referenceCode: "partial"
  }
},
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `2026 年春节联欢晚会上一个武术表演节目《武 BOT》。节目中多个人形机器人会表演空翻，它们落地可能会有微微踉跄，但都会迅速调整姿态站稳，并适当移动来和前后左右的其他机器人保持原来队列。如果将机器人视作一个计算机系统，那么在该计算机系统中下面哪一项不能作为输入设备（ ）。`,
      options: ['检测重心的重力传感器', '预装的 AI 算法程序', '接收动作指令的遥控器', '拍摄其他机器人的摄像头'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n输入设备把外部信息送入计算机系统。传感器采集重心状态，遥控器及接收装置传递动作指令，摄像头采集图像，均有输入作用。预装 AI 算法属于软件，负责处理已输入的数据与计算动作，本身不是输入设备，因此选 B。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 2,
      type: 'single',
      question: "小明学习编程有一段时间了，他想在图形环境下把当前目录（或文件夹）下的文本文件 `20260314.txt` 的名字改一下。他用鼠标左键点击选中该文件后，立即完成下面哪个操作后将处于输入新文件名的状态（ ）。",
      options: ['单击右键并选择弹出菜单中的“重命名”', '双击左键', '按功能键 F1', '按回车键'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n在题目采用的文件管理操作中，选中文件后右键选择“重命名”，会进入编辑文件名的状态。双击通常打开文件，F1 通常打开帮助，回车通常打开选中的文件。选 A；快捷键和行为与具体系统有关，不能把所有桌面系统都概括为同一种操作。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 3,
      type: 'single',
      question: `下面 C++ 代码可以执行，有关说法正确的是（ ）。\n\`\`\`cpp\ndouble PI = 3.1415926;\ncout << (PI);\n\`\`\``,
      options: [
        '为了方便初学者，`cout << (PI)` 和 `cout << (pi)` 效果相同，即变量的大小写不敏感',
        '把 `cout << (PI)` 修改为 `cout << (Pi)` 能正常执行',
        '不能用 `PI` 做变量名，因为要保存圆周率这个常量',
        '将程序中全部 `PI` 都改写为 `Pai`，将能正常执行，不会报错',
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\nC++ 标识符区分大小写，PI、pi、Pi 是不同名称。只改使用处会找不到题中声明的变量，A、B 错。PI 不是关键字，可以作为变量名，保存圆周率不强制声明为常量，C 错。把声明和所有使用处一致改成合法名称 Pai，程序仍可运行，故 D 对。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 4,
      type: 'single',
      question: `C++ 表达式 \`3 * 3 % 2\` 的值为（ ）。`,
      options: ['81', '27', '4', '1'],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n乘法 * 与求余 % 优先级相同，按左结合解析为 (3*3)%2。先得 9，再算 9%2=1，选 D。整数除法 9/2 的商是 4，但本题求的是余数；* 表示乘法，不是幂运算，不能把式子改算成乘方。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 5,
      type: 'single',
      question: `整型变量 \`a\`、\`b\` 的初值都是 \`4\`，则下面的 C++ 代码执行后的输出是（ ）。\n\`\`\`cpp\na, b = 3, 4;\ncout << (a + 2) << (b - 2) << endl;\ncout << a << b << endl;\n\`\`\``,
      options: ["```text\n61\n43\n```","```text\n52\n34\n```","```text\n62\n44\n```","```text\n62\n32\n```"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n赋值优先级高于逗号，因此 a, b=3, 4 等价于依次求值 a、b=3、4，只有 b 被赋为 3，a 保持 4。第一行输出 a+2=6 和 b-2=1，连续为 61；第二行连续输出 a、b 得 43。两行正好对应 A，不能把逗号当成多变量同时赋值。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 6,
      type: 'single',
      question: `下面 C++ 代码的相关说法，正确的是（ ）。\n\`\`\`cpp\nint N = 0;\ncin >> N;\ncout << (N);\n\`\`\``,
      options: ['执行时如输入 `10`，则将输出 `10`', '执行时如输入 `3.14`，将报错', '执行时如输入 `ABC`，将报错', '执行时如输入 `-10`，将报错'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n输入 10 时，整数提取成功，N 为 10，输出 10，A 对。输入 3.14 时可先提取整数部分 3，剩余 .14 留在输入流；-10 也是合法整数。ABC 会导致流提取失败并设置失败状态，默认并不因此抛出异常或保证报告运行错误，不能把提取失败一概说成“将报错”。",
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 7,
      sourceIntegrity: 'official-source-defect',
      integrityNote: "ANSWER-DOUBT：mirror PDF p2 的 A（一正一负输出大于0）与 B（输出非负）在正常整数运算范围内均成立，官方答案表p1给B。单选不唯一，保留answer=1并暂停计分，等待来源澄清。",
      type: 'single',
      question: `下面 C++ 代码执行时，其说法正确的是（ ）。\n\`\`\`cpp\nint M = 0, N = 0;\ncin >> M;\ncin >> N;\nif (N > M)\n cout << (N - M);\nelse\n cout << (M - N);\n\`\`\``,
      options: ['如果输入一个正数和一个负数，其输出结果肯定是大于 0', '不管是负整数、正整数亦或 0，其结果肯定是大于等于 0', '如果 `N` 和 `M` 是相等的整数，将不会有输出', '如果 `N` 和 `M` 输入带有小数点的数，将按整数部分计算'],
      answer: 1,
      score: 2,
      explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：mirror PDF p2 与 p1 答案表均已核对，官方给 B，answer=1 保留。正常整数且运算可表示时，程序求两数差的绝对值。A 中一正一负必不相等，差的绝对值大于 0；B 的非负结论也成立，B 范围较广不能据此否定 A，单选不唯一。相等时会输出 0，C 错；小数残留还可能使第二次整数提取失败，D 不成立。登记原卷疑点并暂停计分，等待来源澄清。",
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    },
    {
      id: 8,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（ ）。\n\`\`\`cpp\nint i, tnt = 1;\nfor (i = 0; i < 5; i++)\n tnt *= i;\nprintf("%2d%2d\\n", tnt, i);\n\`\`\``,
      options: ["```text\n24 5\n```","```text\n10 5\n```","```text\n 0 4\n```","```text\n 0 5\n```"],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\ntnt 初值虽为 1，但第一轮 i=0 时乘积即为 0，此后保持 0。循环最后 i 从 4 增至 5，再判断不满足条件，故输出时 i=5。%2d 对每个整数要求最小宽度为 2，不足时在左侧补空格，实际为“空格0空格5”再换行，对应 D。选项的前导空格必须保留。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 9,
      type: 'single',
      question: "执行下面 C++ 代码段求序列 `-1+2+3-4+5+6-7+8+9-10+11+12...` 之前 `N` 项的值。例如输入 `4`，则计算序列前 4 项的值，规律如序列所示，输出为 `0`。下面说法中正确的是（ ）。\n```cpp\nint N, tnt, i;\ncout << \"请输入正整数：\";\ncin >> N;\ntnt = 0;\nfor (i = 1; i < N + 1; i++) // L1\n if (i % 3 == 1) // L2\n tnt += -i;\n else\n tnt += i;\ncout << tnt;\n```",
      options: [
        'L1 行中 `i < N + 1` 应该改为 `i < N` 才会符合预期',
        'L2 行中 `i % 3 == 1` 应修改为 `i % 3 == 0` 才会符合预期',
        'L2 行中 `i % 3 == 1` 修改为 `i % 3` 与当前程序效果相同',
        '当前代码能实现题目所描述计算目标',
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n从 1 到 N 逐项计算，i%3==1 的位置正是 1、4、7、10……，这些项取负，其余项取正。i<N+1 包含第 N 项，例如 N=4 得 -1+2+3-4=0，因此原程序正确，选 D。改成 i<N 会漏末项；余数为 0 或直接判断余数非零都改变了负号的位置。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 10,
      type: 'single',
      question: "下面 C++ 代码的相关说法，正确的是（ ）。\n\n```cpp\nint i;\nfor (i = 1; i < 10; i++) {\n    if (i % 2 == 0) {\n        continue; // L1\n    }\n    else\n        cout << i << \"#\";\n}\ncout << i << \"END\";\n```",
      options: [
        '上述代码执行后，其输出是 `1#3#5#7#9#9END`',
        '删除 `else` 后的执行效果与当前代码相同',
        '删除 `else` 且将 `cout << i << "#"` 移入 L1 行下面，则执行效果与当前代码相同',
        '在 `cout << i << "END"` 前增加判断 `if(i > 10)`，其执行效果与当前代码相同',
      ],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n偶数轮执行 continue，直接进入循环更新；奇数轮输出 i 和 #。退出时 i=10，完整输出为 1#3#5#7#9#10END，A 最后的 9 错。删去 else 后，偶数仍被 continue 跳过，奇数仍输出，因此 B 对。把输出放在 continue 后会成为不可达语句；i>10 在退出时为假，D 会漏掉末尾输出。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    },
    {
      id: 11,
      type: 'single',
      question: "一个正整数的每位都是个位数，称为数位，最高位非 0。下面的 C++ 代码用于求正整数的所有数位之和。如 `123` 的各数位分别是 1、2、3，则其数位和为 1+2+3，结果为 6。为实现该目标，横线处应该填写的代码是（ ）。\n```cpp\nint N;\ncin >> N;\nint tnt = 0;\nwhile (N != 0) {\n ____________;\n ____________;\n}\ncout << \"N的数位和为：\" << tnt;\n```",
      options: ["```cpp\ntnt += N / 10\nN /= 10\n```","```cpp\ntnt += N % 10\nN /= 10\n```","```cpp\ntnt += N / 10\nN %= 10\n```","```cpp\ntnt = tnt + N % 10\nN %= 10\n```"],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n正整数 N%10 取个位，应累加到 tnt；N/=10 去掉已经处理的个位，最终到 0 并终止，故选 B。以 123 为例依次加 3、2、1 得 6。N/10 得到的是去掉个位的前缀，不是当前数位；N%=10 只保留个位，遇到非零个位后可能停在同一个值，不能完成逐位处理。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 12,
      type: 'single',
      question: "小明想要快速知道任给一个正整数中有多少个奇数位（数位值是奇数），下面的 C++ 代码是其实现，横线处应该填入的代码是（ ）。\n```cpp\nint N;\ncin >> N;\nint odd_count = 0; // 记录奇数的个数\nint old_number = N; // 保存原数\nwhile (N != 0) {\n if (_________________)\n odd_count += 1;\n N = (N - N % 10) / 10;\n}\ncout << old_number << \"中共有 \" << odd_count << \" 个奇数\";\n```",
      options: ['N % 10 % 2 == 0', 'N % 10 % 2 == 1', 'N / 10 / 2 == 1', 'N / 2 / 10 == 0'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n先用 N%10 取当前个位，再对 2 求余等于 1 时，说明这个数位的值是奇数，选 B。每轮 (N-N%10)/10 去掉个位，因此所有数位都会检查一次。本题“奇数位”明确指值为奇数的数位，并非第 1、3、5 个位置；A 反而数偶数，C、D 没有正确提取个位。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    },
    {
      id: 13,
      type: 'single',
      question: "小明和弟弟在玩一个拼数字游戏。二人各写一个两位正整数 `M` 和 `N`；然后将较大的数字放在较小的前面，拼成一个 4 位数；将这个 4 位数除以 3 的余数添加到 4 位数后面，得到一个 5 位数；最后判断这个 5 位数能否被 14 整除。下面的 C++ 代码用于判断 `M` 和 `N` 是否符合全部要求。如果符合则输出 `Y`，否则输出 `N`。例如输入 `85` 和 `79`，可以拼出 `85792`，恰好是 14 的倍数，则输出 `Y`。关于下面代码描述正确的是（ ）。\n```cpp\nint M, N, Q;\ncin >> M >> N;\nif (M > N) // L1\n Q = M * 100 + N;\nelse\n Q = N * 100 + M;\nif ((Q * 10 + Q % 3) % 14 == 0) // L2\n cout << \"Y\";\nelse\n cout << \"N\";\n```",
      options: [
        '代码段不能完成正确判断',
        'L1 行代码中条件应该改为 `M <= N`',
        'L2 行代码应该改为 `if ((Q*10+Q/3) % 14 == 0)`',
        '代码段可以不使用变量 `Q`，而是在区分 `M` 和 `N` 大小后分别直接用它们来判断',
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n先把较大的两位数乘 100，再加较小的数，得到 Q；Q*10+Q%3 是把除以 3 的余数作为个位接在后面，取模 14 为 0 即可输出 Y。85 和 79 得 85792，能被 14 整除。原算法正确，A 错；B 颠倒顺序，C 用商替代余数。把 Q 的表达式直接代入分支也能判断，因此 D 对。",
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator],
    },
    {
      id: 14,
      type: 'single',
      question: "执行下面 C++ 代码可以判断一个 6 位正整数 `N` 的高 3 位和低 3 位的差是否是 `314` 的倍数。例如 `628314` 就符合要求。横线处应该填入（ ）。\n```cpp\ncin >> N;\nif (___________________________)\n cout << N << \"符合条件\" << endl;\n```",
      options: [
        '((N % 1000) - (N / 1000)) / 314 == 0',
        '((N / 1000) - (N % 1000)) % 314 == 0',
        '((N % 1000) - (N / 1000)) / 314',
        '((N / 1000) - (N % 1000)) % 314',
      ],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\nN/1000 取高三位，N%1000 取低三位。两者之差对 314 求余为 0，才表示差是 314 的整数倍，因此 B 对。A 用整除等于 0 会错误接受许多绝对值小于 314 的差；C、D 把算术结果直接当条件，与“能整除”不同。差为 0 也是 314 的倍数，不需要额外排除。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 15,
      type: 'single',
      question: "`N` 是一个正整数。如果 `N` 的所有奇数位的数位和等于所有偶数位的数位和，则称它是一个“双螺旋数”。例如 `12375` 的所有奇数位的数位和是 9，同时它的所有偶数位的数位和也是 9。下面的 C++ 代码用于判断输入的 `N` 是否为双螺旋数。空白处应该填入的代码是（ ）。\n```cpp\nint i, N, N1 = 0, N2 = 0, N0;\ncin >> N;\nN0 = N;\nwhile (N) {\n _________________________\n _________________________\n}\nif (N1 == N2)\n cout << N0 << \"是双螺旋数\" << endl;\n```",
      options: ["```cpp\nN1 += N % 10, N /= 10;\nN2 += N % 10, N /= 10;\n```","```cpp\nN1 += N / 10, N /= 10;\nN2 += N / 10, N /= 10;\n```","```cpp\nN1 += N % 10, N %= 10;\nN2 += N % 10, N %= 10;\n```","```cpp\nN1 += N / 10, N %= 10;\nN2 += N / 10, N %= 10;\n```"],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\nA 每轮先累加一个个位到 N1，再除以 10，接着累加新的个位到 N2，再除以 10，两组交替处理各数位。12375 可得 N1=5+3+1=9，N2=7+2=9；位数为奇数时最后一轮第二次取到 0，不影响结果。B 用除法取不到单个数位，C、D 用 %=10 不能持续缩短数值，故选 A。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 16,
      type: 'judge',
      question: `小明的妈妈最近刚刚给他买了一块电话手表，除了可以看时间，小明也可以用它和妈妈打电话、收发信息，那么可以推测这块手表中装有一款特定操作系统。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n电话手表除显示时间外，还协调通话、消息、界面和硬件等功能，可以据此推测内部有适配设备的操作系统，原判断为正确。它可能是嵌入式系统或实时系统，并不需要与桌面电脑采用同一种操作系统，也不能仅凭题目确定具体品牌或版本。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 17,
      type: 'judge',
      question: `C++ 表达式 \`4 % 2\` 和 \`2 * 2 % 2\` 的结果相同。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n4%2=0。另一个表达式中 * 与 % 同级且左结合，因此 2*2%2=(2*2)%2=4%2=0。两式结果相同，判断正确。这里比较的是计算结果，并不是说不同表达式在任何数字替换后都等价；求余与整数除法的含义也不同。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 18,
      type: 'judge',
      question: `下面 C++ 代码段成功执行后将输出 \`0\`。\n\`\`\`cpp\nfor (i = 1; i < 10; i++)\n if (i % 3 == 0)\n break;\ncout << i;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n循环变量先取 1、2，都不满足能被 3 整除；当 i=3 时条件成立，break 立即退出循环，此时不会再执行本轮的 i++。循环后的 cout 输出 3，而不是条件表达式的真假值 0，因此判断错误。没有大括号时，循环体仍是包含 break 的整个 if 语句。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 19,
      type: 'judge',
      question: `下面能够正常执行的 C++ 代码段用于求 \`1\` 到 \`N\` 之和，\`N\` 为正整数。因为 \`i < N + 1\`，所以是 \`1\` 到 \`N\` 且包含 \`N\` 之和。\n\`\`\`cpp\ntnt = 0;\ncout << "请输入正整数：";\ncin >> N;\ntotal = 0;\nfor (i = 1; i < N + 1; i++) ;\n total += i;\ncout << total;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\nfor 头后面的分号是空循环体。循环先独立执行到 i=N+1，随后 total+=i 只执行一次，输出 N+1，并非累加 1 到 N。比如 N=4 输出 5，而正确的和为 10，足以否定原判断。缩进不决定循环体范围，不能忽略这个分号或按删除分号后的程序解释。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 20,
      type: 'judge',
      question: `执行下面的 C++ 代码段，其语句 \`cout << (N)\` 将被执行 0 次或无数次（即死循环）。\n\`\`\`cpp\ncin >> N;\nwhile (N)\n cout << (N);\n\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n输入成功后，N=0 时 while 条件立即为假，输出语句执行 0 次；N 非零时条件为真，循环体仅输出 N 而不修改它，因此条件始终不变，形成无限循环。判断正确。这里是正常执行下的控制流程结论，不应实际启动无终止程序来等待运行结束。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 21,
      type: 'judge',
      question: "下面的 C++ 代码段的变量都是整型，它能用于判断输入的正整数是否为对称数。所谓对称数是指从左到右和从右到左读该数，其值相同。例如，`121` 和 `414` 都是对称数，而 `123` 不是对称数。\n```cpp\ncout << \"请输入正整数:\";\ncin >> n;\nold_number = n;\nnew_number = 0;\nwhile (n != 0) {\n new_number = new_number * 10 + n % 10;\n n /= 10;\n}\nif (old_number == new_number)\n cout << \"对称数\";\nelse\n cout << \"非对称数\";\n```",
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n先备份原数到 old_number，再用 new_number*10+n%10 把当前个位接到新数末尾，n/=10 逐步去掉个位。循环结束后得到反转数，比较它和原数即可判断正读反读是否相同。121 得到 121，123 得到 321，符合题意，判断正确。该整数反转算法要求中间反转值仍在整型表示范围内。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 22,
      type: 'judge',
      question: `执行下面的 C++ 代码段，如果变量都为整型变量、输入为大于 0 的整数，则输出数值一定为 \`-N\` 的值。\n\`\`\`cpp\ncin >> N;\ntotal = 0;\nfor (i = -N; i < N; i += 2)\n total += i;\ncout << total;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n在求和及更新均未溢出的通常范围内，循环项为 -N、-N+2、……、N-2，共 N 项，首末项平均为 -1，所以总和为 -N，判断正确。也可把除 -N 外的正负项逐对抵消，例如 N=5 时 -5-3-1+1+3=-5。步长为 2，不能当成逐个整数相加。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 23,
      type: 'judge',
      question: `执行 C++ 语句 \`printf("%d\\n", 3.14)\` 将报错。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n%d 要求对应参数为 int，而 3.14 是 double，格式与实参不匹配，行为未定义。普通编译设置可以给出警告而仍生成程序，因此不能保证“将报错”，原判断表给错误。也不能反过来保证它一定正常运行、只输出某个垃圾整数或绝不会崩溃；具体寄存器或栈布局都不能当成可移植解释。应改用 %f 才能定义明确地输出 double。",
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 24,
      type: 'judge',
      question: `执行下面的 C++ 代码后将输出 \`2500\`。\n\`\`\`cpp\nint cnt = 0;\nfor (int i = 1; i < 100; i++)\n cnt += i++;\ncout << cnt;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n循环体 cnt+=i++ 先加当前 i，再把 i 加 1，随后 for 更新又加 1。因此实际累加的是 1、3、5、……、99，共 50 个奇数，和为 (1+99)*50/2=2500，判断正确。最后一轮使用 99 后，两次递增使 i 变成 101，再退出，不会再累加 100。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 25,
      type: 'judge',
      question: `小明在测试 C++ 的 \`printf\` 功能时执行了 \`printf("%-5d\\n", 314)\`，则代码输出的结果是 \`-5314\`。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n%-5d 的 - 表示左对齐，5 表示最小字段宽度。314 占 3 个字符，所以它后面补 2 个空格，再由 \\n 输出换行。实际是“314空格空格”，绝不是 -5314，判断错误。格式串中的 - 和 5 是控制符，不是待输出的文字；左对齐补在右边，不能写反。",
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 26,
      type: 'programming',
      samples: [{ input: '150\n165\n135\n133', output: '135' }],
      question: `
# [GESP202603 一级] 交朋友

## 题目描述

Alice 班上共有 4 个小朋友，身高分别为 $H_1, H_2, H_3, H_4$，其中 Alice 的身高为 $H_1$。Alice 想要和身高最接近她的人交朋友，如果有多个人符合条件，则 Alice 想和其中较矮的那一人做朋友。请输出这个人的身高。

## 输入格式

输入共 4 行，第 $i$ 行包含一个整数 $H_i$，表示班上小朋友的身高。

## 输出格式

输出 1 行，包含一个整数，表示 Alice 想交的朋友的身高。

## 样例

输入：
\`\`\`text
150
165
135
133
\`\`\`

输出：
\`\`\`text
135
\`\`\`

**样例解释**：Alice 身高为 150，第 2、3 个小朋友与 Alice 身高差距同为 15，取其中较矮的 135。

## 数据范围

保证 $100 \\leq H_i \\leq 199$ 且 $H_i$ 互不相同。
`,
      score: 25,
      answer: '',
      explanation: "**解析**\n\n以 H2 为当前候选，保存与 H1 的绝对差，再检查 H3、H4。差更小时更新，差相等且身高更矮时也更新，最终得到符合双重条件的朋友身高。样例 165 与 135 都相差 15，应选 135，133 相差 17 不替换。最后一次比较后已无候选，不再更新最小差也不影响答案。四个身高互不相同且在 100..199 内，差值安全，时间与额外空间均为 O(1)。",
      template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int H1, H2, H3, H4;\n    cin >> H1 >> H2 >> H3 >> H4;\n    // 在此填写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int H1, H2, H3, H4;\n    cin >> H1 >> H2 >> H3 >> H4;\n\n    int ans = H2;\n    int d = H1 - H2;\n    if (d < 0) d = -d;\n    int mnd = d;\n\n    d = H1 - H3;\n    if (d < 0) d = -d;\n    if (d < mnd || (d == mnd && H3 < ans)) {\n        ans = H3;\n        mnd = d;\n    }\n\n    d = H1 - H4;\n    if (d < 0) d = -d;\n    if (d < mnd || (d == mnd && H4 < ans)) {\n        ans = H4;\n    }\n\n    cout << ans << endl;\n    return 0;\n}',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition],
      problemNumber: 'B4495',
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: '8459045', output: '8859085' },
        { input: '123', output: '123' },
      ],
      question: `
# [GESP202603 一级] 数字替换

## 题目描述

Alice 不喜欢数字 $4$，但觉得数字 $8$ 寓意好。她想把整数 $A$ 中的全部数字 $4$ 都替换成 $8$，若数中不含 $4$ 则无需修改。

## 输入格式

输入一行，包含一个整数 $A$，表示替换前的数。

## 输出格式

输出一行，包含一个整数 $B$，表示替换后的数。

## 样例 1

输入：
\`\`\`text
8459045
\`\`\`

输出：
\`\`\`text
8859085
\`\`\`

## 样例 2

输入：
\`\`\`text
123
\`\`\`

输出：
\`\`\`text
123
\`\`\`

**样例解释**：样例 1 中有两个 $4$，都替换为 $8$；样例 2 不含 $4$，因此保持不变。

## 数据范围

$0 \\leq A \\leq 10^8$。
`,
      score: 25,
      answer: '',
      explanation: "**解析**\n\n按个位到高位处理：a%10 取数位，遇到 4 就贡献 t*8，否则贡献 t*(a%10)；a/=10 去掉该位，t*=10 转到下一位。保持原位权可避免把数字反转，样例得到 8859085；A=0 时直接输出初始 b=0。范围上界 10^8 本身替换后仍为 100000000，不能说最大输出只有 88888888。处理该上界后 t 会增至 10^9，仍在 32 位 int 范围内。时间 O(位数)，额外空间 O(1)。",
      template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a;\n    cin >> a;\n    // 在此填写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b = 0, t = 1;\n    cin >> a;\n    while (a) {\n        if (a % 10 == 4)\n            b += t * 8;\n        else\n            b += t * (a % 10);\n        a /= 10;\n        t *= 10;\n    }\n    cout << b;\n    return 0;\n}',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.loop],
      problemNumber: 'B4496',
    },
  ],
};
