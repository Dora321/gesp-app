// 2026-06-l2 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2026-06-l2",
    title: "2026年6月 GESP C++ 二级真题",
    level: 2,
    year: 2026,
    month: 6,
    session: 14,
    timeLimit: 5400,
    source: {
        officialPdf: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "official",
        notes: "全卷依据官方 PDF 镜像逐题转录；图形选项（Q12/Q14）与编程题样例经渲染核对。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B46%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照10页mirror PDF，Git blob SHA 46f343b77f0d32bf68cf4557bca15b8ee4cc94e8一致，全部answer保持。Q15评分原范围0到10恢复，printf格式和Q22提示恢复，Q14图形选项保留换行，重写27题解析。Q24十位int输入的位权溢出新增源疑点隔离；两参考程序原样保留并独立编译运行。",
        dimensions: {
            statement: "partial",
            options: "partial",
            answer: "partial",
            explanation: "partial",
            referenceCode: "partial"
        }
    },
    confidence: {
        answer: 1,
        statement: 1
    },
    questions: [
        {
            id: 1,
            type: "single",
            question: "学校组织到未来农场参观，小明听讲解员介绍，在智能温室中，湿度传感器可以连续检测土壤的湿度变化，并将检测到的湿度数据实时发送给中央控制器。中央控制器根据这些数据判断是否开启灌溉系统。请问，这里的湿度传感器所发挥的作用，类似于计算机系统中的哪一类组件？（ ）",
            options: [
                "处理器",
                "存储器",
                "输入设备",
                "输出设备"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n湿度传感器检测外界状态并把测量数据送入中央控制器，其功能相当于计算机的输入设备，选C。中央控制器处理数据更类似处理器，保存数据的部件对应存储器，向外执行或呈现结果的部件对应输出设备。不要因传感器用于自动控制就把采集和处理两种作用混同。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "小明去农场参观回来后就在自己的电脑上安装了一个 3D 农场仿真模拟系统，因为他今年买的二手电脑有点老旧，系统运行时经常弹出\"系统内存不足\"的警告，导致系统卡顿严重。他计划通过增加物理内存来解决问题。请问他应该购买以下哪种硬件组件？（ ）",
            options: [
                "机械硬盘",
                "内存条",
                "图形显卡",
                "移动硬盘"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n题干明确计划增加物理内存，应购买内存条，选B。机械硬盘、移动硬盘主要提供持久文件存储空间；显卡负责图形处理并可能有独立显存，均不等于直接增加系统主内存。此处按给定故障提示和扩容目标选择，不声称任何卡顿都一定只靠加内存解决。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "有关如下 C++ 代码的说法，正确的是（ ）。\n```cpp\nfloat a = 3 + 3.5;\ncout << a;\n```",
            options: [
                "代码执行将报错。如果将 a = 3 + 3.5 改为 a = float(3) + 3.5 将能正常执行。",
                "代码执行将报错。如果将 a = 3 + 3.5 改为 a = 3.0 + 3.5 将能正常执行。",
                "代码能正常执行，将输出 6。",
                "代码能正常执行，将输出 6.5。"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n3是整数，3.5是double字面量，做加法时进行通常算术转换，结果6.5再用于初始化float a。6.5在二进制中可精确表示，普通cout输出6.5，所以选D。混合类型运算本身合法，不需要先显式把3转换成float，也不会因左侧float而自动截去小数。",
            tags: [
                "数据类型与转换"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下面选择项中，与 C++ 表达式 `not (x > 5 or y <= 10)` 等价的是（ ）。",
            options: [
                "x <= 5 or y > 10",
                "x > 5 and y <= 10",
                "x <= 5 and y > 10",
                "not x > 5 and not y <= 10"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n按题目通常的有序数值比较，用德摩根律否定“x>5或y<=10”，得到“x<=5且y>10”，故C。and/or/not对应&&/||/!。D缺括号，not先作用于变量，解析为(!x)>5等，并不是分别否定完整比较；不能只看相同单词就判断表达式等价。",
            tags: [
                "逻辑运算"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "小明在某开发环境中执行 C++ 代码 `cout << (2.5 + 2.25) << ' ' << (2.2 + 2.1)` 时输出 `4.75 4.300000000000001`，其原因最可能是（ ）。",
            options: [
                "C++ 的 + 运算符在处理浮点数时有时正确，有时错误",
                "某些浮点数难以精确表示，导致微小误差",
                "+ 运算符不能用于浮点数，只能用于整数",
                "因为 cout 函数难以输出太长的数值"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n2.5、2.25可以由有限二进制小数精确表示，而2.2、2.1通常只能近似表示，求和后显露微小误差，最可能原因是B。输出多少位还取决于流的precision等格式状态，默认cout通常只显示4.3，不能说该单句无论环境都打印长尾；题设所见长尾不表示+不支持浮点数。",
            tags: [
                "数据类型与转换"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "执行如下 C++ 程序后，当输入 4 时，输出的最后一行是（ ）。\n```cpp\nint n;\ncin >> n;\nfor (int i = n; i > 0; i--) {\n    for (int j = 0; j < i; j++)\n        cout << j + 1 << ' ';\n    cout << endl;\n}\n```",
            options: [
                "0",
                "1",
                "1 2",
                "1 2 3 4"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n输入4后外层i依次取4、3、2、1；内层每轮从j=0打印j+1到i，故四行依次为1 2 3 4、1 2 3、1 2、1。最后一行只有1，选B。各数字后还输出一个空格，行末有换行；不要把代码的从0编号j误当成直接打印0。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下面的 C++ 代码执行后其输出是（ ）。\n```cpp\nint tnt = 0;\nfor (int i = 1; i < 5; i += 3) {\n    for (int j = 0; j < i; j++)\n        tnt += 1;\n    cout << tnt << \"#\";\n}\ncout << tnt;\n```",
            options: [
                "1#5#5",
                "1#5#5#",
                "1#5#12#12",
                "0"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n外层i=1时内层计数一次，tnt变1并输出1#；i+=3后为4，内层再计4次，累计5并输出5#。下一次i=7已不满足i<5，最后在循环外输出5，整体1#5#5，选A。累加器只在最开始清零，不在每轮重新计数，末尾也没有额外#。",
            tags: [
                "嵌套循环",
                "程序分析"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面的 C++ 代码执行之后的输出是（ ）。\n```cpp\nint i;\nfor (i = -2; i < 2; i++)\n    if (not i % 3 == 0)\n        cout << i << \"#\";\ncout << i;\n```",
            options: [
                "-2#-1#1#2",
                "-2#-1#1#2#3",
                "1#2#3",
                "0#1#2#3"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\nnot的优先级高于%和==，所以条件实际为((!i)%3)==0，而不是简单地否定i%3==0。在本题i=-2、-1、0、1中，非零时!i为0，条件为真；0时!i为1，条件为假。依次打印-2#-1#1#，循环退出i=2再打印2，选A。换成i=3可看出它不一般等价于“不能被3整除”。",
            tags: [
                "循环",
                "运算符"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面的 C++ 代码执行后其输出是（ ）。\n```cpp\nint cnt = 0, i, j;\nfor (i = 0; i < 3; i++) {\n    j = i;\n    while (j) {\n        cnt += 1;\n        j -= 1;\n    }\n}\ncout << i << ' ' << j << ' ' << cnt;\n```",
            options: [
                "3 0 3",
                "2 0 4",
                "2 0 5",
                "3 0 5"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n外层i=0、1、2时，j分别从当前i减到0，while执行次数0、1、2，cnt总计3。最后一次while退出留下j=0；外层更新i到3后退出。最终输出3 0 3，选A。输出读取的是循环结束后的变量，不能把i的最后入口值2误作退出值。",
            tags: [
                "循环",
                "程序分析"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面 C++ 代码执行后其输出是（ ）。\n```cpp\nint count = 0, i, j;\nfor (i = 1; i < 4; i++)\n    for (j = 0; j < i; j++) {\n        if (j % 3 != 0)\n            continue;\n        count += 1;\n        break;\n    }\ncout << i << ' ' << j << ' ' << count;\n```",
            options: [
                "4 0 4",
                "3 0 0",
                "3 2 0",
                "4 0 3"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n每个外层i=1、2、3的内层都先从j=0开始，此时j%3为0不continue，count加1后立即break。内层始终留下j=0，外层结束i=4，count=3，所以输出4 0 3，选D。break只终止内层，不会阻止之后的两个外层入口。",
            tags: [
                "循环",
                "break与continue"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "如下 C++ 代码执行后输出是 `1 2 3 4 5 6 7 8 9 10 11 5 6 7 8 9 10 11 5 6 7 8 9 10 11 5 6 7 8 9 10 11 5 6 7`。横线处应该填入的运算符是（ ）。\n```cpp\nint num = 1;\nfor (int i = 0; i < 35; i++) {\n    cout << num << \" \";\n    if (num _______ 10)\n        num _______ 2;\n    else\n        num _______ 1;\n}\n```",
            options: [
                "> /= +=",
                ">= %= +=",
                "> /= =+",
                ">= %= =+"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n填A时num<=10每轮加1，所以先输出1到11；输出11后因11>10，把num整数除2变5，再输出5到11并重复。35次打印正好产生题干序列。>=配%=会在10处回到0，=+1是赋值为正1而非加1，都不能得到该模式。每次打印的数之后有一个空格。",
            tags: [
                "循环",
                "运算符"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "如下数字图形在通过执行后续的 C++ 代码时，输入 10 来输出。横线处应填入的代码是（ ）。\n```\n1 1 1 1 1 1 1 1 1 1\n1 1 0 0 0 0 0 0 0 1\n1 0 1 0 0 0 0 0 0 1\n1 0 0 1 0 0 0 0 0 1\n1 0 0 0 1 0 0 0 0 1\n1 0 0 0 0 1 0 0 0 1\n1 0 0 0 0 0 1 0 0 1\n1 0 0 0 0 0 0 1 0 1\n1 0 0 0 0 0 0 0 1 1\n1 1 1 1 1 1 1 1 1 1\n```\n```cpp\nint N;\ncin >> N;\nfor (int i = 1; i < N + 1; i++) {\n    for (int j = 1; j < N + 1; j++)\n        if (________)\n            cout << \"1 \";\n        else\n            cout << \"0 \";\n    cout << endl;\n}\n```",
            options: [
                "i == j and i == 1 and j == 1 and i == N and j == N",
                "i == j or i == 1 or j == 1 or i == N or j == N",
                "i == j or i == 0 or j == 0 or i == (N + 1) or j == (N + 1)",
                "i == j and i == 1 and j == 1 and i == (N + 1) and j == (N + 1)"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n图形要求四条边框以及主对角线任一条件成立就输出1，采用or连接，故B。A用and要求同时位于所有边界，N=10时不可能；C的0和N+1均在循环1到N之外，无法画边框；D也用了不可能同时满足的边界。每格后有一个空格，外层结束一行后换行。",
            tags: [
                "嵌套循环",
                "图形",
                "逻辑运算"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "英文 corner case 通常翻译为极端案例或边角案例，通常指正常范围以外的问题或者情形。在如下 C++ 代码中，变量都是整型，则 corner case 最应该是（ ）。\n```cpp\nint tnt = 0, cnt = 0;\nwhile (1) {\n    int score;\n    cin >> score;\n    if (score == -1)\n        break;\n    tnt += score;\n    cnt += 1;\n}\ncout << tnt / cnt;\n```",
            options: [
                "tnt = 0, cnt = 0 是 corner case，应分为两行",
                "while(1) 是 corner case，因为 while(1) 将会导致死循环",
                "cin >> score 是 corner case，因为输入数据前应该提示整型数据",
                "cout << tnt / cnt 是 corner case，因为如果直接输入 -1，将导致执行错误，虽然这种情况较为罕见"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n首次输入-1时立即break，tnt与cnt仍为0；随后执行整型0/0，构成未定义行为，故D指出了真正的边界输入问题。while(1)可用内部break正常结束，同一行初始化两个变量合法，输入前显示提示也不是语言要求。无需实际执行除零来验证：退出时cnt=0已足以证明缺少保护。",
            tags: [
                "程序分析",
                "调试与异常"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "如下 C++ 代码执行后，输入 4 后，输出的数字图形是（ ）。\n```cpp\nint n;\ncin >> n;\nfor (int i = n; i > 0; i--) {\n    for (int j = 0; j < n - i; j++)\n        cout << \"0 \";\n    for (int k = 0; k < i; k++)\n        cout << k + 1 << \" \";\n    cout << endl;\n}\n```",
            options: [
                "```text\n1 2 3 4\n1 2 3 0\n1 2 0 0\n1 0 0 0\n```",
                "```text\n1 2 3 4\n0 1 2 3\n0 0 1 2\n0 0 0 1\n```",
                "```text\n1 2 3 4\n2 3 4 0\n3 4 0 0\n4 0 0 0\n```",
                "```text\n0 0 0 1\n0 0 1 2\n0 1 2 3\n1 2 3 4\n```"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nn=4时，首行没有前导0，输出1 2 3 4；每下一行前导0增加一个，余下数字仍从1开始。四行依次为1 2 3 4、0 1 2 3、0 0 1 2、0 0 0 1，选B。输出每一项后有空格，不能把前导0移到右侧，也不能让非零数字从行号开始。",
            tags: [
                "嵌套循环",
                "图形"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "某学校举办\"校园演讲比赛\"，每位选手由 8 位评委打分（分数为 0 到 10 的整数），且每位评委必须打分。计分规则：去掉一个最高分，去掉一个最低分。如下程序通过键盘先输入选手编号，然后依次输入 8 个分数，并计算最终得分。下列说法正确的是（ ）。\n```cpp\nfor (int i = 0; i < 10; i++) {\n    int id, score;\n    printf(\"输入选手编号: \");\n    scanf(\"%d\", &id);\n    int max_score = 0, min_score = 100; // 最高分和最低分\n    int total_score = 0; // 总分\n    for (int j = 1; j < 9; j++) {\n        printf(\"输入选手第%d个成绩:\", j);\n        scanf(\"%d\", &score);\n        if (max_score < score)\n            max_score = score;\n        if (min_score > score)\n            min_score = score;\n        total_score += score;\n    }\n    total_score = total_score - max_score - min_score;\n    printf(\"%d号选手的成绩:\\\n            去掉一个最高分%d,\\\n            去掉一个最低分%d,\\\n            最后成绩是：%d\", id, max_score, min_score, total_score);\n}\n```",
            options: [
                "上述代码能完成题目要求",
                "max_score = 0, min_score = 100 应修改为 max_score = 0, min_score = 0",
                "max_score < score 和 min_score > score 必须相应修改为 <= 和 >=",
                "total_score = total_score - max_score - min_score 不能达到预期，可修改如下：int total = total_score - max_score - min_score; total_score = total;"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n按原卷0到10的评分范围，max初值0、min初值100，每个输入都参与比较和累加，最后减掉一次最高分与一次最低分，得到剩余6个分数的总和，故A。无需把min改成0，否则正分数时最小值可能错误；相等分数不必重复更新极值；减法右侧先求值，再赋回同一变量完全合法。这里只给出了去高低分求和规则，没有擅自补除6的平均分要求。",
            tags: [
                "循环",
                "程序分析"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "又到期末考试周，小明发现这次许多闭卷考试不仅禁止携带手机、平板电脑，还有最近比较时髦的各类 AI 眼镜（也有叫智能眼镜）也同样不允许带入考场。这些 AI 眼镜应该也是内置了操作系统并可能支持 Wi-Fi 或蓝牙连接。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n按本卷场景，智能眼镜可能内置系统并具有无线通信能力，因此也可能被闭卷考试限制携带，判断正确。设备外形是眼镜并不排除它具备计算机功能；不能把这段历史题解析当成任何具体考试的现行规定，也不能据此断言所有普通眼镜都具备这些能力。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "C++ 代码 `cout << (not ('5' % 2 == 0) == ((not '5' % 2) == 0))` 执行后的输出是 1。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在ASCII兼容编码下字符5的编码53为奇数，左侧not(53%2==0)为真。右侧not先作用于字符，!53为0，0%2再与0比较也为真。两个bool比较相等，普通cout输出1，故正确。关键是not优先级，右侧不能擅自读成not(53%2)后再改变原有括号。",
            tags: [
                "字符与ASCII",
                "运算符"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "执行 C++ 语句 `cout << (int(3.5) * 2)` 将输出 6。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nint(3.5)先进行浮点转整数，丢弃小数部分得到3，再乘整数2得到6，判断正确。它不是先算3.5*2再转换，也不是四舍五入到4后乘2。类型转换的位置决定后续运算的输入值，本题各中间结果都在int可表示范围内。",
            tags: [
                "数据类型与转换"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "下面 C++ 代码执行后将输出 1-4-7-。\n```cpp\nfor (int i = 1; i < 10; i += 3) {\n    if (not i % 3)\n        break;\n    cout << i << \"-\";\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n原条件not i % 3实际为(!i)%3。i依次是1、4、7，均非0，所以!i始终为0，余数0使if不成立，break不执行，依次输出1-4-7-，故正确。此处不要把not当成对整个余数取反；虽然在这些入口值下某些误读恰好同结果，解析仍应按真实优先级说明。",
            tags: [
                "循环"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "执行如下 C++ 代码，将从小到大依次输出 abs(N) 个整数，并在最后输出 1。\n```cpp\nint N;\ncin >> N;\nint start_num = 1, end_num = N + 1, i;\nif (N < 0)\n    start_num = N, end_num = 0;\nfor (i = start_num; i < end_num; i++)\n    cout << i << \" \";\ncout << endl << ((i - 1) == abs(N)) << endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n例如N=-3时输出-3 -2 -1三个整数，循环退出i=0，最后比较(i-1)==abs(N)即-1==3，为假而输出0，不是1，因此题干错误。正N在适当范围时末尾比较为真；不能用正例证明所有N。另有N+1、abs(INT_MIN)等溢出边界，但该小负数已给出无溢出的反例。",
            tags: [
                "循环",
                "程序分析"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "如下 C++ 代码执行后，输出值为 9。\n```cpp\nint cnt = 0, i;\nfor (i = 0; i < 10; i++) {\n    for (int j = 0; j < i; j++)\n        cnt += 1;\n    break;\n}\ncout << i;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n第一次外层i=0时，内层j=0不满足j<i，cnt不增加；接着无条件break退出外层，i也不会再自增。最终cout打印i=0而非9，判断错误。cnt在这里不是被输出变量，不能因前面出现计数循环就直接套用常见嵌套求和结果。",
            tags: [
                "循环",
                "break与continue"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "如下 C++ 代码执行时如输入 10，输出将是 100。\n```cpp\nint cnt = 0, N;\ncout << \"请输入正整数：\";\ncin >> N;\nfor (int i = 0; i < N; i++)\n    for (int j = -i; j < i; j++)\n        cnt += 1;\ncout << cnt;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n输入N=10时，内层j从-i到i-1，共2i次；i=0到9累计2*(0+1+…+9)=90，不是100，判断错误。程序还先输出原提示语。严格小于i使正端点不被包含，不能把每轮次数算成2i+1而误得100。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "如下 C++ 代码执行其输出是 3。\n```cpp\nint count = 0;\nint i = 0;\nwhile (i < 3) {\n    int j = 0;\n    while (j < 3) {\n        if (i + j >= 3)\n            count += 1;\n        j += 1;\n    }\n    i += 1;\n}\ncout << count;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\ni、j都取0、1、2，满足i+j>=3的组合仅(1,2)、(2,1)、(2,2)，count从0增加三次，输出3，故正确。两层while都在每轮末尾推进各自变量，内层j每个外层入口重新置0，既不会漏后续组合，也没有无限循环。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "如下 C++ 代码执行时如果输入正整数，其输出将是输入的正整数。\n```cpp\nint N;\ncin >> N;\nint i = 0, Nbase = 1;\nint rst = 0;\nwhile (N != 0) {\n    rst = rst + N % 10 * Nbase;\n    N /= 10, Nbase *= 10;\n    i += 1;\n}\ncout << rst;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nANSWER-DOUBT：mirror PDF p.7–8判断正整数输入能原样输出并判√，但N=1000000000时，最后一轮已令N=0，仍执行int Nbase*=10，从1000000000变为数学值10000000000，超出32位int，构成有符号溢出。题面没有限制为9位以内；保留answer=0和原代码，暂停计分。 在位权乘10不溢出的较小输入域内，逐位乘回位权确能重建原数。但即使最后一次N已经归0，也不能忽略同一逗号表达式中仍执行的位权更新；不能用优化编译时偶然输出正确证明标准语义对所有正int成立。另存-ftrapv编译运行见证，题库原程序不改。",
            tags: [
                "循环",
                "程序分析"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：mirror PDF p.7–8判断正整数输入能原样输出并判√，但N=1000000000时，最后一轮已令N=0，仍执行int Nbase*=10，从1000000000变为数学值10000000000，超出32位int，构成有符号溢出。题面没有限制为9位以内；保留answer=0和原代码，暂停计分。"
        },
        {
            id: 25,
            type: "judge",
            question: "如下 C++ 代码执行时如输入 5，将输出代码后的字符图形。\n```cpp\nint n;\ncin >> n;\nfor (int i = 1; i < n + 1; i++) {\n    for (int j = 1; j < n - i + 1; j++)\n        cout << 0;\n    for (int k = 1; k < 2 * i; k++) {\n        if (k <= i)\n            cout << k;\n        else\n            cout << 2 * i - k;\n    }\n    for (int j = 1; j < n - i + 1; j++)\n        cout << 0;\n    cout << endl;\n}\n```\n```\n000010000\n000121000\n001232100\n012343210\n123454321\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n输入5时，第i行两侧各5-i个0，中间依次递增1到i再递减到1。五行正是000010000、000121000、001232100、012343210、123454321，判断正确。每行宽度为2*(5-i)+(2i-1)=9，且没有空格；递减部分从i-1开始，峰值不会重复。",
            tags: [
                "嵌套循环",
                "图形"
            ]
        },
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "1\n21",
                    output: "4"
                }
            ],
            question: "\n# [GESP202606 二级] 完全平方数计数\n\n## 题目描述\n\n小杨同学正在研究完全平方数。\n\n**平方**：一个数的平方等于这个数乘以这个数本身。\n\n**完全平方数**：指可以恰好表示为某个正整数的平方的数。\n\n例如，9 是完全平方数，因为 9 = 3² = 3 × 3；但 27 不是，因为 27 不能表示为任何正整数的平方。\n\n给定两个正整数 $l$ 和 $r$（保证 $l \\leq r$），小杨同学想知道 $l$ 到 $r$ 之间的所有正整数中（包含 $l$ 和 $r$），有多少个数是完全平方数。\n\n## 输入格式\n\n输入两行，第一行为一个正整数 $l$，第二行为一个正整数 $r$。\n\n## 输出格式\n\n输出一个非负整数，表示 $l$ 到 $r$ 中，有多少个正整数是完全平方数。如果 $l$ 到 $r$ 中没有完全平方数，则输出 0。\n\n## 样例 1\n\n输入：\n```text\n1\n21\n```\n\n输出：\n```text\n4\n```\n\n**样例解释**：在 1 到 21 中，有以下 4 个整数是完全平方数：1, 4, 9, 16。\n\n## 数据范围\n\n$1 \\leq l \\leq r \\leq 2000$。\n",
            score: 25,
            answer: "",
            explanation: "**解析**\n\n枚举正整数i且i*i<=r，每个平方落入[l,r]时计数。样例1到21的平方为1、4、9、16，共4；下界包含端点，所以i*i>=l即可。r<=2000，仅需检查44个候选，乘法安全，时间O(sqrt(r))、额外空间O(1)。保留现有参考代码，使用独立整数平方集合/区间前缀计数预言机覆盖单点、平方邻域、空区间结果和随机合法区间，不用浮点开方复写参考逻辑。",
            template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int ans = 0, l, r;\n    cin >> l >> r;\n    for (int i = 1; i * i <= r; ++i)\n    {\n        if (i * i >= l)\n            ans++;\n    }\n    cout << ans << endl;\n    return 0;\n}",
            tags: [
                "循环",
                "数学"
            ],
            title: "完全平方数计数",
            timeLimit: "1.0 s",
            memoryLimit: "512.0 MB"
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "4",
                    output: "...+...\n..+.+..\n.+...+.\n+.....+\n.+...+.\n..+.+..\n...+..."
                }
            ],
            question: "\n# [GESP202606 二级] 菱形\n\n## 题目描述\n\n给定正整数 $n$，在 $(2n-1) \\times (2n-1)$ 个网格的画布中，使用字符画一个边长为 $n$ 个网格的菱形。其中，空白网格使用 `.` 表示，菱形边所在的网格用 `+` 表示。\n\n例如当 $n = 3$ 时，图形如下：\n```text\n..+..\n.+.+.\n+...+\n.+.+.\n..+..\n```\n\n## 输入格式\n\n输入一个正整数 $n$。\n\n## 输出格式\n\n输出 $2n-1$ 行，表示按要求画的菱形。\n\n## 样例 1\n\n输入：\n```text\n4\n```\n\n输出：\n```text\n...+...\n..+.+..\n.+...+.\n+.....+\n.+...+.\n..+.+..\n...+...\n```\n\n## 数据范围\n\n$3 \\leq n \\leq 15$。\n",
            score: 25,
            answer: "",
            explanation: "**解析**\n\n画布边长2n-1，中心(n,n)，四条菱形边分别满足i+j=n+1、i+j=3n-1、i-j=n-1、j-i=n-1。满足任一条件输出+，其余输出点，行末换行。n=4得到7行7列的原样例，n=3为5行图。复杂度O(n²)时间、O(1)额外空间；n=3到15仅13个合法值。保留参考程序，用独立中心距离判定预言机核对全部13值及字符数，确保空心与完整点背景。",
            template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此填写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= 2 * n - 1; ++i) {\n        for (int j = 1; j <= 2 * n - 1; ++j) {\n            if (i + j == n + 1 || i + j == 3 * n - 1)\n                cout << \"+\";\n            else if (i - j == n - 1 || j - i == n - 1)\n                cout << \"+\";\n            else\n                cout << \".\";\n        }\n        cout << endl;\n    }\n    return 0;\n}",
            tags: [
                "嵌套循环",
                "图形"
            ],
            title: "菱形",
            timeLimit: "1.0 s",
            memoryLimit: "512.0 MB"
        }
    ]
};
