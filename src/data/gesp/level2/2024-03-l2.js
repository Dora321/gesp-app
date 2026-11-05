// 2024-03-l2 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2024-03-l2",
    title: "2024年3月 GESP C++ 二级真题",
    level: 2,
    year: 2024,
    month: 3,
    session: 5,
    note: "2024年首场",
    timeLimit: 5400,
    source: {
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex对照登记mirror PDF全部9页文本及渲染，Git blob SHA dfbe60e47d1a6af1d4cae022aa5e048201dd9625一致。25题answer保持，Q10多项成立和Q13原图/循环边界不符隔离。修复乘法参考程序超限后继续相乘造成的溢出，独立编译运行另有证据。",
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
            question: "下列流程图的输出结果是？（ ）\n\n![原卷流程图](/question-assets/2024-03-l2/q1-flowchart.png)",
            options: [
                "优秀",
                "良好",
                "不及格",
                "没有输出"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n流程图先令cj=75。75>=60成立，继续检查75>=90，结果为假，因此沿第二个判断的NO分支输出良好，选B。若达到90分才进入成绩优秀分支，低于60分才进入不及格分支。两个判断是依次执行的，不能在第一个条件为真时就直接输出优秀。",
            sourceVerified: true,
            sourcePage: 1,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "以下选项中不符合 C++ 变量命名规则的是？（ ）",
            options: [
                "student",
                "2_from",
                "_to",
                "Text"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n标识符首字符可以是字母或符合限制的下划线，但不能是数字，因此2_from不符合命名规则，选B。student和Text是合法名称。_to以下划线加小写字母开头，在普通局部作用域中可以合法使用，但全局下划线名称等仍受实现保留规则约束，不能据此泛化所有下划线名称都可自由定义。",
            tags: [
                "变量与标识符"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "以下选项中，不能用于表示分支结构的 C++ 保留字是？（ ）",
            options: [
                "switch",
                "return",
                "else",
                "if"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nif、else和switch用于条件选择或分支结构。return表示从当前函数返回，不是用于表示分支选择结构的保留字，所以选B。return可以出现在某个if分支内部，但这不改变它本身控制函数返回的作用。应区分语句放置的位置与该关键字直接表达的控制结构。",
            tags: [
                "基础语法"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下列说法错误的是？（ ）",
            options: [
                "while 循环满足循环条件时不断地运行，直到指定的条件不满足为止",
                "if 语句通常用于执行条件判断",
                "在C++中可以使用 foreach 循环",
                "break 和 continue 语句都可以用在 for 循环和 while 循环中"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n标准C++没有名为foreach的循环语句关键字，因此题目按该语法名称考查时选C。C++11起可用范围for遍历元素，但语法仍写for。if通常作条件判断，break和continue可以用于for或while。while还可能因break等出口提前结束，A描述的是通常按条件控制的循环流程。",
            sourceVerified: true,
            sourcePage: 1,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下列 4 个表达式中，答案不是整数 8 的是？（ ）",
            options: [
                "abs(-8)",
                "min(max(8, 9), 10)",
                "int(8.88)",
                "sqrt(64)"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n按题目数值比较语境，abs(-8)为8，int(8.88)向零截断为8，sqrt(64)的数值为8。max(8,9)先得9，再与10取较小值得9，只有B的数值不同，故选B。sqrt的返回类型通常是double，不能因为输出可显示8就说它的表达式类型为int。",
            tags: [
                "基础语法"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下面 C++ 代码执行后的输出是？（ ）\n```cpp\nint n, a, m, i;\nn = 3, a = 5;\nm = (a - 1) * 2;\nfor (i = 0; i < n - 1; i++)\n    m = (m - 1) * 2;\ncout << m;\n```",
            options: [
                "8",
                "14",
                "26",
                "50"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nm先由(a-1)*2得到8。n=3，循环i=0、1共执行两轮。第一轮m=(8-1)*2=14，第二轮m=(14-1)*2=26，最终输出26，选C。原先计算m的初始化不算在for的两次迭代中，也不能把每轮运算错误地改成先乘2再减1。",
            sourceVerified: true,
            sourcePage: 2,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下面 C++ 代码执行后的输出是？（　）\n\n```cpp\nint n, i, result;\nn = 81;\ni = 1, result = 1;\nwhile (i * i <= n){\n    if (n % (i * i) == 0)\n        result = i * i;\n    i += 1;\n}\ncout << result;\n```",
            options: [
                "16",
                "36",
                "49",
                "81"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n循环检查平方i*i能否整除81，i从1一直走到9。i=1、3、9时分别把result改为1、9、81，后面的合法平方会覆盖前面的值。i=9仍满足i*i<=n，所以最后输出81，选D。检查的是平方是否为因子，不是寻找小于81的最大平方数或只求平方根。",
            tags: [
                "循环"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面 C++ 代码执行后的输出是？（ ）\n```cpp\nint s, t, ans;\ns = 2, t = 10;\nans = 0;\nwhile (s != t){\n    if (t % 2 == 0 && t / 2 >= s)\n        t /= 2;\n    else\n        t -= 1;\n    ans += 1;\n}\ncout << ans;\n```",
            options: [
                "2",
                "3",
                "4",
                "5"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n目标s=2，t从10开始。10为偶数且10/2>=2，变为5，计1步。5为奇数，减1到4，计2步。4为偶数且4/2>=2，变为2，计3步，循环结束，输出3，选B。每轮只执行其中一个分支，不能把除2和减1在同一轮同时应用。",
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
            question: "下面 C++ 代码执行后的输出是？（ ）\n```cpp\nint n, masks, days, cur;\nn = 17, masks = 10, days = 0;\ncur = 2;\nwhile (masks != n){\n    if (cur == 0 || cur == 1)\n        masks += 7;\n    masks -= 1;\n    days += 1;\n    cur = (cur + 1) % 7;\n}\ncout << days;\n```",
            options: [
                "5",
                "6",
                "7",
                "8"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\ncur从2开始，每天先按cur是否为0或1补7个口罩，再消耗1个并增加天数。masks各轮变为9、8、7、6、5、11、17，第7轮达到n=17，输出7，选C。cur在每轮末尾按模7更新，因此补充发生在第6和第7个处理日，不能只把库存变化当成每天固定加减。",
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
            id: 10,
            type: "single",
            question: "以下 C++ 代码判断一个正整数 N 的各个数位是否都是偶数。如果都是，则输出“是”，否则输出“否”。例如 N=2024 时输出“是”。则横线处应填入（ ）。\n```cpp\nint N, Flag;\ncin >> N;\nFlag = true;\nwhile (N != 0){\n    if (N % 2 != 0){\n        Flag = false;\n        _____________\n    }\n    else\n        N /= 10;\n}\nif (Flag == true)\n    cout << \"是\";\nelse\n    cout << \"否\";\n```",
            options: [
                "break",
                "continue",
                "N = N / 10",
                "N = N % 10"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT。原卷给A，answer=0保持。break能在发现奇数位后立即结束并输出否。但C填N=N/10同样把该位去掉，Flag已置false且不会恢复，继续扫描剩余位后仍输出否。全为偶数时两种填法都正常逐位除10并输出是，因此A、C都实现所述目标。保留原文和选项并暂停计分，等待单选唯一性澄清。",
            sourceVerified: true,
            sourcePage: 3,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            tags: [
                "客观题",
                "单选题",
                "GESP2级"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p3-4给A，但C的N=N/10在发现奇数位后保持Flag=false并继续去位，也能判断是否全为偶数。保留answer=0并暂停计分。"
        },
        {
            id: 11,
            type: "single",
            question: "有句俗话叫“三天打渔，两天晒网”。如果小杨前三天打渔，后两天晒网，一直重复这个过程，以下程序代码用于判断第 n 天小杨是在打鱼还是晒网，横线处应填写？（ ）\n```cpp\nint n, i;\ncin >> n;\ni = n % 5;\nif (__________________) // 在此处填写代码\n    cout << \"晒网\";\nelse\n    cout << \"打鱼\";\n```",
            options: [
                "i == 0",
                "i == 4",
                "i == 0 && i == 4",
                "i == 0 || i == 4"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n每5天一组，n%5为1、2、3时对应前三天打渔，为4、0时对应后两天晒网。应判断i==0或i==4，选D。只检查其中一个余数会漏掉一天，i==0&&i==4要求同一个整数同时等于不同值，不可能成立。这里n按第1天开始计数。",
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
            id: 12,
            type: "single",
            question: "一个数的所有数字倒序排列后这个数的大小保持不变，这个数就是回文数，比如 101 与 6886 都是回文数，而 100 不是回文数。以下程序代码用于判断一个数是否为回文数，横线处应填写？（ ）\n```cpp\nint n, a, k;\ncin >> n;\na = 0;\nk = n;\nwhile (n > 0){\n    a = ________;  // 在此处填写代码\n    n /= 10;\n}\nif (a == k)\n    cout << \"是回文数\";\nelse\n    cout << \"不是回文数\";\n```",
            options: [
                "10 * a + n % 10",
                "a + n % 10",
                "10 * a + n / 10",
                "a + n / 10"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\na保存已反转部分，把它乘10腾出个位，再加当前n的个位n%10，填10*a+n%10，选A。n/=10去掉已处理数位，k保存原输入，最后比较a与k。B没有左移，C、D取的是去个位后的前缀。对通常非负输入且反转数可表示的范围，该算法可判断回文，实际大数还须考虑整数溢出。",
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
            id: 13,
            type: "single",
            question: "给定两个整数 n 与 k，打印出一个栅栏图形，这个栅栏应该分成 n 段，段与段之间的间隔为 `+`，段内的填充为 k 个 `-`。形如 n = 5，k = 6 时，图形如下：\n\n```\n+------+------+------+------+------+\n```\n\n以下程序代码用于绘制该图形，横线处应填写？（ ）\n```cpp\nint n, k, i, j;\nn = 5, k = 6;\nfor (i = 0; i < n; i++){\n    __________ // 在此处填写代码\n    for (j = 1; j < k; j++)\n        cout << '-';\n}\ncout << '+';\n```",
            options: [
                "cout << '+' << endl;",
                "cout << '+' << ' ' << endl;",
                "cout << '+';",
                "cout << '+' << ' ';"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT。原卷文字和示意图要求每段k个减号，例n=5,k=6。官方给C，answer=2保持，但内层j从1开始且j<k，只执行k-1次。填C实际每段5个减号，整行31个字符，而图中每段6个，整行36个字符。其余选项额外引入空格或换行，同样无法满足原图。保留原for边界并隔离，等待来源纠错。",
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
            integrityNote: "ANSWER-DOUBT。原卷p5要求每段k个减号且例图为6个，代码j=1;j<k只打印k-1个。填官方C仍与图不符，其他选项引入空格或换行也不满足。保留answer=2和原边界，暂停计分。"
        },
        {
            id: 14,
            type: "single",
            question: "小杨的父母最近刚刚给他买了一块华为手表，他说手表上跑的是鸿蒙，这个鸿蒙是。（ ）",
            options: [
                "小程序",
                "计时器",
                "操作系统",
                "神话人物"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n题目所述手表上运行的鸿蒙是操作系统，负责协调设备硬件与应用等功能，所以选C。小程序是应用形式，计时器只是一种功能，神话人物是词语其他语境下的含义。判断应依据它在智能设备中承担的系统管理角色，而不是仅因设备可以显示时间就把系统当成计时工具。",
            tags: [
                "操作系统"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "中国计算机学会（CCF）在 2024 年 1 月 27 日的颁奖典礼上颁布了王选奖，王选先生的重大贡献是（ ）。",
            options: [
                "制造自动驾驶汽车",
                "创立培训学校",
                "发明汉字激光照排系统",
                "成立方正公司"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n王选的代表性重大科技贡献是汉字激光照排系统，推动了中文出版印刷技术发展，因此选C。应把人物的核心技术成就与一般商业组织或其他行业项目区分。北京大学王选计算机研究所资料记录了其团队攻克汉字信息存储与输出等难题并形成中文电子出版系统的过程。",
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
            id: 16,
            type: "judge",
            question: "如果有以下 C++ 代码：\n```cpp\ndouble s;\nint t;\ns = 18.5;\nt = int(s) + 10;\n```\n那么 `cout << t` 的结果为 28.5。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\ns为double值18.5，先经int(s)转换向零截断为18，再加整数10得到28，赋给int变量t，cout输出28。因此原说法28.5错误。类型转换作用于s本身，不能先把18.5与10相加再忽略转换，也不会给int变量保存一个带小数的值。",
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
            id: 17,
            type: "judge",
            question: "`Xyz`，`xYz`，`xyZ`是三个不同的变量。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nC++标识符区分大小写。Xyz、xYz、xyZ在不同位置采用大写字母，三个拼写各不相同，表示不同名称，因此判断正确。原题第二个名称是xYz，题库曾录为xyz，本轮恢复。识别时要逐个字符比较，不能只看字母按不区分大小写的顺序是否一致。",
            tags: [
                "变量与标识符"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "cout << (8 < 9 < 10) 的输出结果为 true。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n连续比较按左结合先算8<9，得到true，再将其作为1与10比较，结果仍为true。默认未设置boolalpha时cout显示1，不会显示文字true，因此原判断错误。若显式启用boolalpha，输出形式会改变，但题目给出的普通输出语句没有该设置。应区分布尔值与显示文字。",
            tags: [
                "逻辑运算"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "for (i = 0; i < 100; i += 2); 语句中变量 i 的取值范围是 0 到 99。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\ni在循环体检查成功时依次为0、2、……、98，更新后最终变为100再退出。因此进入循环体的值不是0到99的每个整数，整个语句结束时也已经到100，原判断错误。末尾分号表示空循环体，不会阻止更新表达式执行。不能把条件i<100理解为变量永远不可能取100。",
            tags: [
                "循环"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "C++ 中 cout << float(2022) 与 cout << float('2022') 运行后的输出结果均为 2022。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nfloat(2022)把整数2022转换为浮点数。单引号中的2022则是多字符字面量，具有实现定义的int值，不是十进制整数2022，更不是字符串解析函数。把该值转换为float并不能保证输出2022，因此原判断错误。不能拿某个编译器一次的多字符常量结果推广到所有实现。",
            tags: [
                "数据类型"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "已知 'A' 的 ASCII 码值为 65，表达式 int('C') + abs(-5.8) 的值为 72.8。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在题目ASCII环境且已包含适当数学头文件、选用浮点abs重载时，字符C的编码为67，abs(-5.8)为5.8，两者相加数值为72.8，因此原判断正确。char参与算术会进行整型提升，浮点重载保留小数。要避免缺失声明时误调用只能接收整数的函数，从而把5.8错误截断。",
            tags: [
                "字符与ASCII"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "`bool()`函数用于将给定参数或表达式转换为布尔类型。语句`bool(-1)`返回的是false值。（ ）",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nbool(-1)是显式布尔类型转换，非零数转换为true，只有0转换为false，因此原判断错误。题目把bool()称为函数是初学者表述，语法上这里使用的是类型转换。负号不会使一个非零数变成假值，也不能把只有正整数才为真当作C++条件规则。",
            tags: [
                "数据类型"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "如果变量 a 的值使得 C++ 表达式 `sqrt(a) == abs(a)`，则 a 的值为 0。（ ）",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\na=0时等式成立，但a=1时sqrt(1)=1且abs(1)=1，同样成立。因此不能据等式就断言a一定为0，原判断错误。一个合法反例已足以否定全称结论。在实数非负域求解还可得到0与1两个解，实际浮点比较应注意数值与精度范围。",
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
            id: 24,
            type: "judge",
            question: "小杨今年春节回奶奶家了，奶奶家的数字电视要设置 ip 地址并接入到 WIFI 盒子才能收看节目，那这个 WIFI 盒子具有路由器的功能。（ ）",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在题目家庭网络情境中，电视配置IP并连接家庭WIFI盒子接入网络，可以按通常家用无线路由设备理解其具有路由器功能，原判断正确。设备常集成无线接入和网络转发等多种功能。这里只按给定使用情境辨认常见设备，不把所有带WIFI功能的设备一概等同于路由器。",
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
            id: 25,
            type: "judge",
            question: "任何一个 for 循环都可以转化为等效的 while 循环。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nfor可以用保留初始化作用域、条件检查、循环体和更新顺序的while形式改写，因此判断正确。转换时若原循环体有continue，必须保证它先执行原for更新，再重新判断条件，不能机械地把更新移到while末尾却让continue跳过它。break也须退出对应循环，保持原程序控制流程。",
            tags: [
                "循环"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            title: "乘法问题",
            samples: [
                {
                    input: "2\n3\n5",
                    output: "15"
                },
                {
                    input: "3\n100\n100\n100",
                    output: "1000000"
                },
                {
                    input: "4\n100\n100\n100\n2",
                    output: ">1000000"
                }
            ],
            question: "\n# [GESP202403 二级] 乘法问题\n\n## 题目描述\n\n小 A 最近刚刚学习了乘法，为了帮助他练习，我们给他若干个正整数，并要求他将这些数乘起来。\n\n对于大部分题目，小 A 可以精确地算出答案，不过，若这些数的乘积超过 $10^6$，小 A 就不会做了。\n\n请你写一个程序，告诉我们小 A 会如何作答。\n\n## 输入格式\n\n第一行一个整数 $n$，表示正整数的个数。\n\n接下来 $n$ 行，每行一个整数 $a$。小 A 需要将所有的 $a$ 乘起来。\n\n保证 $1 \\le n \\le 50$，$1 \\le a \\le 100$。\n\n## 输出格式\n\n输出一行，如果乘积超过 $10^6$，则输出 `>1000000`；否则输出所有数的乘积。\n\n## 特别提醒\n\n在本场考试中，请不要在输入、输出中附带任何提示信息。\n",
            score: 25,
            explanation: "**解析**\n\n累计乘积从1开始，只要尚未超过1000000才继续相乘。一旦超过，全部因子均为正整数，后续乘积不会降回阈值内，此后只读入数据并保留超限标志。原题库超限后仍连续相乘，合法输入50个100会让long long溢出，已加保护。每次实际相乘前res<=10^6且a<=100，乘积至多10^8，安全。等于阈值仍输出数值，时间O(n)、空间O(1)。",
            tags: [
                "编程题",
                "模拟",
                "数值范围"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    long long res = 1;\n    bool over = false;\n    for (int i = 0; i < n; i++) {\n        int a;\n        cin >> a;\n        if (!over) {\n            res *= a;\n            if (res > 1000000) over = true;\n        }\n    }\n    if (over) cout << \">1000000\" << endl;\n    else cout << res << endl;\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            title: "小杨的日字矩阵",
            samples: [
                {
                    input: "5",
                    output: "|---|\n|xxx|\n|---|\n|xxx|\n|---|"
                },
                {
                    input: "7",
                    output: "|-----|\n|xxxxx|\n|xxxxx|\n|-----|\n|xxxxx|\n|xxxxx|\n|-----|"
                }
            ],
            question: "\n# [GESP202403 二级] 小杨的日字矩阵\n\n## 题目描述\n\n小杨想要构造一个 $N \\times N$ 的日字矩阵（$N$为奇数）。矩阵共有$N$行，每行$N$个字符，最左列、最右列都是半角字符 |。第一行、最后一行和中间一行（第$\\frac{N+1}{2}$行）的第2至$N-1$个字符都是半角减号，其余字符都是半角小写字母x。请按给定的$N$打印对应矩阵。\n\n## 输入格式\n\n一行一个整数$N$，保证$5 \\le N \\le 49$且$N$为奇数。\n\n## 输出格式\n\n恰好输出$N$行，每行除换行符外恰好包含$N$个字符。字符只能是减号、竖线或小写x。请严格按格式输出，不要擅自添加空格、标点、空行等符号。\n\n## 特别提醒\n\n在本场考试中，请不要在输入、输出中附带任何提示信息。\n",
            score: 25,
            explanation: "**解析**\n\n左右边界列始终输出竖线。第一行、中间行、末行的内部输出减号，其他内部位置输出小写x，边界列判断优先可保留四角竖线。N为5..49内奇数，中心行从0编号是N/2。每行N个字符且只换行，不附空格或提示。原参考程序符合该规则，保留实现，时间O(N²)、额外空间O(1)。",
            tags: [
                "编程题",
                "图形绘制",
                "模拟"
            ],
            template: "#include <iostream>\nusing namespace std;\nint main() {\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < n; j++) {\n            if (j == 0 || j == n - 1) cout << '|';\n            else if (i == 0 || i == n / 2 || i == n - 1) cout << '-';\n            else cout << 'x';\n        }\n        cout << endl;\n    }\n    return 0;\n}"
        }
    ]
};
