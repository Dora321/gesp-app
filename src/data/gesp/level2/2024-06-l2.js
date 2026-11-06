// 2024-06-l2 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2024-06-l2",
    title: "2024年6月 GESP C++ 二级真题",
    level: 2,
    year: 2024,
    month: 6,
    session: 6,
    timeLimit: 5400,
    source: {
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照9页mirror PDF，Git blob SHA 04389cfdd33cd4c46669f65b40a2a4e8a8c765d5一致。恢复Q2流程、Q13四行效果图、Q21/Q23/Q24原代码及两编程题范围，重写27题解析；Q2/Q12/Q13保留官方答案并隔离，未改任何answer；参考程序与模板独立编译运行。",
        dimensions: {
            statement: "partial",
            options: "partial",
            answer: "partial",
            explanation: "partial",
            referenceCode: "partial"
        }
    },
    questions: [
        {
            id: 1,
            type: "single",
            question: "小杨父母带他到某培训机构给他报名参加 CCF 组织的 GESP 认证考试的第 1 级，那他可以选择的认证语言有几种？（ ）",
            options: [
                "1",
                "2",
                "3",
                "4"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n对照2024年6月 mirror PDF p.1答案表，C对应3种。按本卷当时的认证设置，一级可选图形化编程、Python或C++；这里不把历史题解释为现行报考政策。",
            tags: [
                "基础知识",
                "人工智能"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下面流程图在 yr 输入 2024 时，可以判定 yr 代表闰年，并输出 2 月是 29 天，则图中菱形框中应该填入（ ）。\n\n原卷流程图（等价文字转录）：开始 → 输入 yr → 菱形判断；Y 分支输出“2月是29天”，N 分支输出“2月是28天”；两支汇合 → 结束。",
            options: [
                "(yr%400==0) || (yr%4==0)",
                "(yr%400==0) || (yr%4==0 && yr%100!=0)",
                "(yr%400==0) && (yr%4==0)",
                "(yr%400==0) && (yr%4==0 && yr%100!=0)"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：mirror PDF p.1 题干仅指定 yr=2024，A、B 均为真并输出29天，答案表为B。若要求适用于所有公历年份才唯一为B，原题缺少该限制；保留answer=1并暂停计分。 代入2024，A和B的两部分分别为false、true，因此结果均为true；C、D为false。B是通用闰年公式，A会误判1900，但这不能排除题面所限定输入下的A。",
            tags: [
                "条件判断",
                "程序分析"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：mirror PDF p.1 题干仅指定 yr=2024，A、B 均为真并输出29天，答案表为B。若要求适用于所有公历年份才唯一为B，原题缺少该限制；保留answer=1并暂停计分。"
        },
        {
            id: 3,
            type: "single",
            question: "在 C++ 中，下列不可做变量名的是（ ）。",
            options: [
                "five-Star",
                "five_star",
                "fiveStar",
                "_fiveStar"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\nfive-Star含减号，不能构成一个标识符，故A。five_star、fiveStar语法合法；_fiveStar在普通局部作用域可作标识符，以下划线开头的名称在全局命名空间有保留规则，不建议自行使用。",
            tags: [
                "变量与标识符"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "在 C++ 中，与 for(int i=0; i<10; i++) 效果相同的是（ ）。",
            options: [
                "for(int i=0; i<10; i+=1)",
                "for(int i=1; i<=10; i++)",
                "for(int i=10; i>0; i--)",
                "for(int i=10; i<1; i++)"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n原循环依次令i取0到9。A把i++改成i+=1，取值和顺序均相同；B取1到10，C取10到1，D一次不执行。仅循环次数相同不足以判定循环整体等价。",
            tags: [
                "循环"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "在 C++ 中，`cout << (5 % 2 && 5 % 3)` 的输出是（ ）。",
            options: [
                "1",
                "2",
                "true",
                "false"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n5%2为1、5%3为2，非零都为真，逻辑与结果是bool真；普通cout未启用boolalpha时输出1，故A。\n\n取模运算的优先级高于逻辑与；逻辑与只反映真假，不会返回右操作数2。若显式设置boolalpha才会输出true，原代码没有该设置。",
            tags: [
                "条件判断",
                "运算符"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "执行下面的 C++ 代码时输入 1，则输出是（ ）。\n```cpp\nint month;\ncin >> month;\nswitch(month){\n    case 1: cout << \"Jan \";\n    case 3: cout << \"Mar \"; break;\n    default: ;\n}\n```",
            options: [
                "Jan",
                "Mar",
                "Jan Mar",
                "以上均不对"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nmonth=1进入case 1，先输出Jan和空格；没有break而继续输出Mar和空格，随后break退出switch。按选项文本为C，实际末尾还含一个空格。",
            tags: [
                "分支结构"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "执行下面 C++ 代码后，有关说法错误的是（ ）。\n```cpp\nint a, b;\ncin >> a >> b;\nif (a && b) cout << \"1\";\nelse if (!(a || b)) cout << \"2\";\nelse if (a || b) cout << \"3\";\nelse cout << \"4\";\n```",
            options: [
                "如果先后输入 1 和 1 ，则将输出 1",
                "如果先后输入 0 和 1 或者 1 和 0 ，则将输出 3",
                "如果先后输入 0 和 0 ，则将输出 2",
                "如果先后输入 0 和 0 ，则将输出 4"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n两数均非零输出1；两数均为0输出2；恰一数为0输出3。最后else不可达，因此D声称0、0输出4是错误说法。\n\n例如输入0、1时，a&&b为假，!(a||b)也为假，第三个条件为真，输出3。输入0、0时第二个条件已经成立，后面的条件和else都不再执行。",
            tags: [
                "分支结构",
                "逻辑运算"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "某货币由 5 元，2 元和 1 元组成。输入金额（假设为正整数），计算出最少数量。为实现其功能，横线处应填入代码是（ ）。\n```cpp\nint N;\ncin >> N;\nint M5, M2, M1;\nM5 = N / 5;\nM2 = ______________;\nM1 = ______________;\nprintf(\"5*%d+2*%d+1*%d\", M5, M2, M1);\n```",
            options: [
                "第 1 空：N / 2；第 2 空：N - M5 - M2",
                "第 1 空：(N - M5 * 5) / 2；第 2 空：N - M5 * 5 - M2 * 2",
                "第 1 空：N - M5 * 5 / 2；第 2 空：N - M5 * 5 - M2 * 2",
                "第 1 空：(N - M5 * 5) / 2；第 2 空：N - M5 - M2"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n先取M5=N/5，剩余金额N-M5*5再除以2得到M2；最后M1=N-M5*5-M2*2，故B。A未先扣除5元金额；C缺括号；D混淆枚数与金额。5枚1元可换1枚5元、2枚1元可换1枚2元，逐步减少枚数得到该组合。",
            sourceVerified: true,
            sourcePage: 3,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（　）。\n\n```cpp\nint loopCount = 0;\nfor (int i = 0; i < 10; i++)\n    for (int j = 1; j < i; j++)\n        loopCount += 1;\ncout << loopCount;\n```",
            options: [
                "55",
                "45",
                "36",
                "28"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n外层i=0、1时内层不执行；i=2到9分别执行1到8次。总数1+2+…+8=36，故C。\n\n逐轮计数为0、0、1、2、3、4、5、6、7、8。内层从j=1起，条件是j<i，既不包括j=0也不包括j=i，因此不能套用0到9的求和45。",
            tags: [
                "运算符",
                "整除判断"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n\n```cpp\nint loopCount = 0;\nfor (int i = 0; i < 10; i++){\n    for (int j = 0; j < i; j++)\n        if (i * j % 2)\n            break;\n    loopCount += 1;\n}\ncout << loopCount;\n```",
            options: [
                "25",
                "16",
                "10",
                "9"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nloopCount+=1在内层循环之外，外层每轮均执行一次。break仅退出内层，外层i=0到9共10轮，因此输出10，选C。原卷内层没有额外大括号，恢复该结构。",
            sourceVerified: true,
            sourcePage: 4,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "假设下面 C++ 代码执行过程中仅输入正负整数或 0，有关说法错误的是（　）。\n\n```cpp\nint N, Sum = 0;\ncin >> N;\nwhile (N){\n    Sum += N;\n    cin >> N;\n}\ncout << Sum;\n```",
            options: [
                "执行上面代码如果输入 0 ，将终止循环",
                "执行上面代码能实现所有非 0 整数的求和",
                "执行上面代码第一次输入 0 ，最后将输出 0",
                "执行上面代码将陷入死循环，可将while (N)改为while (N==0)"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nwhile(N)把0作为结束标记，非零数累计到Sum后继续读入。第一次输入0时循环不执行，输出初始化的0。D错误，改成N==0会改变含义；求和需以0结束且结果处于int可表示范围。",
            tags: [
                "循环"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "执行下面的 C++ 代码，有关说法正确的是（ ）【质数是指仅能被 1 和它本身整除的正整数】。\n```cpp\nint N;\ncin >> N;\nbool Flag = true;\nfor ( int i = 2; i < N; i++){\n    if (i * i > N)\n        break;\n    if (N % i == 0){\n        Flag = false;\n        break;\n    }\n}\nif (Flag)\n    cout << N << \"是质数\" << endl;\nelse\n    cout << N << \"不是质数\" << endl;\n```",
            options: [
                "如果输入正整数，上面代码能正确判断 N 是否为质数",
                "如果输入整数，上面代码能正确判断 N 是否为质数",
                "如果输入大于等于 0 的整数，上面代码能正确判断 N 是否质数",
                "如将 Flag = true 修改为 Flag = N>=2? true:false 则能判断所有整数包括负整数、0、正整数是否为质数"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：mirror PDF p.4–5 D声称改Flag初始化即可判断所有整数，但int表达式i*i在N=2147483647、i=46341时溢出，产生未定义行为。初始化仅修复N<2；原题未限制N上界。保留官方D和answer=3，暂停计分。 原始Flag=true还会把1、0和负数误报为质数，故A/B/C均不成立。通常教学意图下D补上N>=2可修复小输入，但全int范围还须采用i>N/i或更宽的乘法类型，不能无条件宣称D正确。",
            sourceVerified: true,
            sourcePage: 4,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：mirror PDF p.4–5 D声称改Flag初始化即可判断所有整数，但int表达式i*i在N=2147483647、i=46341时溢出，产生未定义行为。初始化仅修复N<2；原题未限制N上界。保留官方D和answer=3，暂停计分。"
        },
        {
            id: 13,
            type: "single",
            question: "下面 C++ 代码用于实现如下图所示的效果，其有关说法正确的是（ ）。\n\n原卷效果图：\n```\n2 4\n3 6 9\n4 8 12 16\n5 10 15 20 25\n```\n\n```cpp\nfor (int i = 1; i < 6; i++){ // L1\n    for (int j = 1; j < i+1; j++) //L2\n        cout << i*j << \" \";\n    cout << endl;\n}\n```",
            options: [
                "当前代码能实现预期效果，无需调整代码",
                "如果 cout << endl; 移到循环 L2 内部，则可实现预期效果",
                "如果 cout << endl; 移到循环 L1 外部，则可实现预期效果",
                "删除 cout << endl; 行，则可实现预期效果"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：mirror PDF p.5效果图从2 4开始，未含首行1；原代码i从1开始会多输出首行1，官方A声称无需调整与图不符。B/C/D也无法产生该四行图。恢复原图文本，保留answer=0并暂停计分。 实际输出五行：1；2 4；3 6 9；4 8 12 16；5 10 15 20 25。图中只有后四行。将换行放入内层会逐项换行，放到外层后或删掉则失去逐行布局。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：mirror PDF p.5效果图从2 4开始，未含首行1；原代码i从1开始会多输出首行1，官方A声称无需调整与图不符。B/C/D也无法产生该四行图。恢复原图文本，保留answer=0并暂停计分。"
        },
        {
            id: 14,
            type: "single",
            question: "下面 C++ 代码执行后，输出是（ ）。\n```cpp\nint cnt1 = 0, cnt2 = 0;\nfor (int i = 0; i < 10; i++){\n    if (i % 2 == 0)\n        continue;\n    if (i % 2)\n        cnt1 += 1;\n    else if (i % 3 == 0)\n        cnt2 += 1;\n}\ncout << cnt1 << \" \" << cnt2;\n```",
            options: [
                "5 2",
                "5 0",
                "0 2",
                "0 0"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n偶数i直接continue。剩余1、3、5、7、9都使if(i%2)成立，cnt1加到5，其else if不会执行，cnt2始终0。输出5 0，故B。",
            sourceVerified: true,
            sourcePage: 5,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "在下面的 C++ 代码中，`N` 必须是小于 10、大于 1 的整数，`M` 为正整数（大于 0）。如果 `M` 被 `N` 整除，则 `M` 为幸运数；如果 `M` 中含有 `N` 且能被 `N` 整除，则为超级幸运数；否则不是幸运数。程序用于判断 `M` 是否为幸运数、超级幸运数或非幸运数。阅读代码，有关说法正确的是（ ）。\n\n```cpp\nint N, M;\ncout << \"请输入幸运数字：\";\ncin >> N;\ncout << \"请输入正整数：\";\ncin >> M;\n\nbool Lucky;\nif (M % N == 0)\n    Lucky = true;\nelse\n    Lucky = false;\nwhile (M) {\n    if (M % 10 == N && Lucky) {\n        printf(\"%d是%d的超级幸运数!\", M, N);\n        break;\n    }\n    M /= 10;\n}\nif (M == 0)\n    if (Lucky)\n        printf(\"%d是%d的幸运数!\", M, N);\n    else\n        printf(\"%d非%d的幸运数!\", M, N);\n```",
            options: [
                "如果 N 输入 3 ， M 输入 36 则将输出： 36 是 3 的超级幸运数 !",
                "如果 N 输入 7 ， M 输入 21 则将输出： 21 是 7 的幸运数 !",
                "如果 N 输入 8 ， M 输入 36 则将输出： 36 非 8 的超级幸运数 !",
                "如果 N 输入 3 ， M 输入 63 则将输出： 63 是 3 的超级幸运数 !"
            ],
            answer: 3,
            score: 2,
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            explanation: "**答案 D**\n\nLucky先按原M是否整除N求值，之后M逐位被除以10，会破坏原数。3、36实际输出3是3的超级幸运数；7、21输出0是7的幸运数；8、36输出0非8的幸运数；3、63在第一轮个位命中，输出63是3的超级幸运数，故D。各次输出前均还有两句输入提示。",
            tags: [
                "数位分离",
                "变量追踪"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "执行 C++ 代码 `cout << '9' + '1';` 的输出为 10。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n字符常量先整数提升，再对字符编码求和；在本卷运行环境的ASCII兼容编码中，57+49=106，并非数字9+1=10，故错误。\n\n单引号表示字符常量，不能把字符9当作整数9参与计算。若要先转为相应数值，应分别减去字符常量'0'；原代码没有这一步。",
            tags: [
                "字符与ASCII"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "C++ 表达式 `-12 % 10` 的值为 2。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n整数除法向0截断，-12/10=-1；由a=(a/b)*b+a%b得余数-2，故“值为2”错误。\n\n余数保留被除数的符号；此处可以回代验证：(-1)×10+(-2)=-12。若余数取2，则(-1)×10+2=-8，与被除数不符，故不能按正数取余直觉填写。",
            tags: [
                "运算符"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "C++ 表达式 `int(12.56)` 的值为 13。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n浮点数转换为int会丢弃小数部分，12.56转为12，不是四舍五入到13，故错误。\n\n强制转换并不调用四舍五入函数，即使小数部分大于0.5也不会进位。对于负的可表示浮点数也向0截断，例如int(-12.56)得到-12。",
            tags: [
                "数据类型"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "C++ 的整型变量 N 被赋值为 10，则语句 `cout << N / 3 << \"-\" << N % 3` 执行后输出是 3-1。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n整数除法10/3=3，余数10%3=1，中间直接输出字符串-，连成3-1，故正确。\n\n输出运算符依次发送整数3、字符串减号、整数1，没有额外空格。减号位于双引号中，是输出内容，不会使左右两次计算相减，因此结果不是整数2。",
            tags: [
                "运算符"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "在 C++ 代码中，不可以将变量命名为 `scanf`，因为 `scanf` 是 C++ 语言的关键字。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nscanf是标准库函数名，不是C++关键字。在适当的局部作用域可以声明同名变量从而遮蔽函数名；此后不能直接以该变量名调用被遮蔽的函数。“因为是关键字”的说法错误。",
            tags: [
                "变量与标识符"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "下面 C++ 代码执行后将导致死循环。（ ）\n\n```cpp\nfor (int i = 0; i < 10; i++)\n    continue;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原卷代码是for(int i=0;i<10;i++) continue;。continue结束当轮循环体后仍执行i++，i取0到9后终止，共10轮，不会死循环。此前题库误串入第15题代码，已按p.6恢复。",
            sourceVerified: true,
            sourcePage: 6,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下面 C++ 代码执行后将输出 10：\n```cpp\nint cnt = 0;\nfor (int i = 0; i < 10; i++)\n    for (int j = 0; j < i; j++) {\n        cnt += 1;\n        break;\n    }\ncout << cnt;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\ni=0时内层不执行；i=1到9时内层都在j=0处计数一次后break。因此共9次，不是10；break不终止外层。\n\n与仅有外层循环不同，i=0虽然执行了一轮外层循环，但内层初始j=0不满足j<i，因而这一轮根本到不了cnt+=1。其余九轮各加1，排除了把外层轮数10直接当结果的错误。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "下面 C++ 代码执行后，将输出 5。（ ）\n\n```cpp\nint cnt = 0;\nfor (int i = 1; i < 5; i++)\n    for (int j = i; j < 5; j += i)\n        if (i * j % 2 == 0)\n            cnt += 1;\ncout << cnt;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n按原卷j=i、j<5、j+=i：i=1时j=1、2、3、4，其中2和4贡献2次；i=2时j=2、4贡献2次；i=3时j=3不贡献；i=4时j=4贡献1次。总计5，故正确。不能用此前误录的j=1、j<i、j++来解释。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "下面 C++ 代码能实现正整数各位数字之和。（ ）\n\n```cpp\nint N, Sum = 0;\ncin >> N;\nwhile (N){\n    Sum += N % 10;\n    N /= 10;\n}\ncout << Sum;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nSum先置0。每轮N%10取个位并累加，再N/=10去掉个位，正整数最终变0。例123依次加3、2、1得6，故正确；恢复原卷完整的声明、读入和输出。",
            tags: [
                "数位处理"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "GESP 测试是对认证者的编程能力进行等级认证，同一级别的能力基本上与编程语言无关。（ ）",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n按本卷p.7题意，等级认证主要衡量编程能力，同级能力基本不取决于具体表达语言，故正确。这里的“基本”不表示各语言语法、各级考纲或考试题目完全相同。",
            sourceVerified: true,
            sourcePage: 7,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "判断题",
                "GESP2级"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            title: "平方之和",
            samples: [
                {
                    input: "2\n5\n4",
                    output: "Yes\nNo"
                }
            ],
            question: "# [GESP202406 二级] 平方之和\n\n## 题目描述\n小杨有 n 个正整数 a1, a2, …, an。他想知道对于每个 i（1 ≤ i ≤ n），是否存在两个正整数 x、y 满足 x × x + y × y = ai。\n\n## 输入格式\n第一行包含一个正整数 n，代表正整数数量。之后 n 行，每行包含一个正整数，代表 ai。\n\n## 输出格式\n对于每个 ai，如果存在满足条件的两个正整数，输出 Yes，否则输出 No。每个结果占一行。\n\n## 数据范围\n对于全部数据，1 ≤ n ≤ 10，1 ≤ ai ≤ 10^6。\n\n时间限制：1.0 s；内存限制：512.0 MB。",
            score: 25,
            explanation: "**解析**\n\n枚举正整数x且x*x<a，令y2=a-x*x，开方取整后检查y>0且y*y==y2。该回代确保平方恰好相等，正数限制排除0。a=5由1²+2²成立，a=4只能用0²+2²因此应No。每组O(sqrt(a))时间、O(1)额外空间，n≤10、a≤10^6可行；参考代码long long乘法安全。保留与原卷等价的现有参考程序，并验证样例、小范围穷举、上界与随机值。",
            tags: [
                "编程题",
                "枚举",
                "完全平方数"
            ],
            template: "#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <cmath>\nusing namespace std;\nint main() {\n    int n; cin >> n;\n    while(n--) {\n        long long a; cin >> a;\n        bool ok = false;\n        for (long long x = 1; x * x < a; x++) {\n            long long y2 = a - x * x;\n            long long y = sqrt(y2);\n            if (y > 0 && y * y == y2) { ok = true; break; }\n        }\n        if (ok) cout << \"Yes\" << endl;\n        else cout << \"No\" << endl;\n    }\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            title: "计数",
            samples: [
                {
                    input: "25\n2",
                    output: "9"
                }
            ],
            question: "# [GESP202406 二级] 计数\n\n## 题目描述\n小杨认为自己的幸运数是正整数 k（1 ≤ k ≤ 9）。他想知道，对于从 1 到 n 的所有正整数中，k 出现了多少次。\n\n## 输入格式\n第一行包含一个正整数 n。第二行包含一个正整数 k。\n\n## 输出格式\n输出从 1 到 n 的所有正整数中，k 出现的次数。\n\n## 数据范围\n对于全部数据，1 ≤ n ≤ 1000，1 ≤ k ≤ 9。\n\n## 样例解释\n从1到25中，数字2出现在2、12、20、21、22、23、24、25中；22贡献两次，共9次。\n\n时间限制：1.0 s；内存限制：512.0 MB。",
            score: 25,
            explanation: "**解析**\n\n遍历i=1到n，用副本t=i不断取t%10并令t/=10；每次等于k就加1，所以22中的两个2都计入。样例25、2得到9。复杂度O(n log n)，额外空间O(1)；n≤1000时最多拆4位，现有long long计数足够。保留现有参考程序，验证n=1、9、10、重复位、上界和独立字符串计数结果。",
            tags: [
                "编程题",
                "枚举",
                "数位统计"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int n, k;\n    cin >> n >> k;\n    long long ans = 0;\n    for (int i = 1; i <= n; i++) {\n        int t = i;\n        while (t > 0) {\n            if (t % 10 == k) ans++;\n            t /= 10;\n        }\n    }\n    cout << ans << endl;\n    return 0;\n}"
        }
    ]
};
