// 2023-09-l2 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2023-09-l2",
    title: "2023年9月 GESP C++ 二级真题",
    level: 2,
    year: 2023,
    month: 9,
    session: 3,
    note: "体系趋于稳定",
    timeLimit: 5400,
    source: {
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B49%E6%9C%88-C%2B%2B2%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "verified",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex对照登记mirror PDF全部10页文本和渲染，Git blob SHA 4987bf68cca3f221e76edf1834cf98ee4a91acc0一致。恢复原卷程序与图示，25题answer保持，两份参考程序及模板另行GNU C++17编译运行。",
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
            type: "single",
            question: "我国第一台大型通用电子计算机使用的逻辑部件是（ ）。",
            options: [
                "集成电路",
                "大规模集成电路",
                "晶体管",
                "电子管"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n我国第一台大型通用电子数字计算机为104机，采用电子管作为主要逻辑部件，故选D。旧解析误写为103机，须区分小型与大型通用机。晶体管、集成电路及大规模集成电路属于后续主要技术阶段。计算机发展代际的时间划分常为概略区间，判断本题应以具体机器的逻辑元件为依据。",
            tags: [
                "历史知识"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下列流程图的输出结果是（ ）？\n\n![原卷流程图](/question-assets/2023-09-l2/q2-flowchart.png)",
            options: [
                "5 12",
                "12 5",
                "5 5",
                "12 12"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n流程图先令x=5、y=12，再判断x>y。5>12为假，走否分支，分别把y赋给a、x赋给b，因此a=12、b=5，输出12 5，选B。原图没有修改x、y，也没有在分支执行后再次判断，须顺着箭头走到同一输出框，不能把是分支的赋值结果当成实际结果。",
            tags: [
                "流程图",
                "程序分析"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "如果要找出整数 a、b 中较大一个，通常要用下面哪种程序结构？（ ）。",
            options: [
                "顺序结构",
                "循环结构",
                "分支结构",
                "跳转结构"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n通常先比较a、b大小，再根据比较结果选择其中一个值，属于分支结构，选C。顺序结构按步骤执行，循环用于重复处理，goto等跳转语句不属于这里要考查的常用二选一结构。题目问“通常”，不需要声称所有能求较大值的程序都必须在源码中显式出现if。",
            tags: [
                "程序分析"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "以下不是 C++ 关键字的是（ ）。",
            options: [
                "continue",
                "cout",
                "break",
                "goto"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\ncontinue、break、goto是语言关键字，分别用于继续下一轮、退出循环或switch、跳到标签。cout是标准库iostream中声明的标准输出流对象，并非语言关键字，所以选B。它属于std命名空间。endl则是流操纵器，也不能把所有常见输出相关名称都称为库对象或关键字。",
            tags: [
                "基础语法"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "C++ 表达式 int(-123.123 / 10) 的值是（ ）。",
            options: [
                "-124",
                "-123",
                "-13",
                "-12"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n先进行浮点除法，-123.123/10约为-12.3123，再用int转换为整数，在可表示范围内向零截断，结果为-12，选D。向零截断不同于向负无穷取整，后者才会得到-13。转换作用于括号内整个除法结果，不能先把原数转换后忽略除以10这一操作。",
            tags: [
                "基础语法"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "以下 C++ 代码实现从大到小的顺序输出 N 的所有因子。例如，输入 N = 18 时输出 18 9 6 3 2 1，横线处应填入（　）。\n\n```cpp\nint N = 0;\ncin >> N;\nfor (____________)  // 此处填写代码\n    if (!(N % i))\n        cout << i << ' ';\n```",
            options: [
                "; ;",
                "int i = 1; i < N; i++",
                "int i = N; i > 0; i--",
                "int i = N; i > 1; i--"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n从N递减到1逐个判断N%i是否为0，可以按从大到小的顺序输出全部正因子，因此选C。条件i>0包含1又避免除数为0，N自身也会输出。B方向相反且漏N，D漏1。A只给空的for头，没有声明题中使用的i，不能直接说它是一个可运行的无限循环。",
            tags: [
                "循环",
                "程序分析"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "如下图所示，输出N行N列的矩阵，对角线为1，横线处应填入（ ）。\n\n原卷输入N=9时矩阵为\n```text\n1 0 0 0 0 0 0 0 0\n0 1 0 0 0 0 0 0 0\n0 0 1 0 0 0 0 0 0\n0 0 0 1 0 0 0 0 0\n0 0 0 0 1 0 0 0 0\n0 0 0 0 0 1 0 0 0\n0 0 0 0 0 0 1 0 0\n0 0 0 0 0 0 0 1 0\n0 0 0 0 0 0 0 0 1\n```\n\n```cpp\nint N = 0;\ncout << \"请输入行列数量:\";\ncin >> N;\nfor (int i = 1; i < N + 1; i++) {\n    for (int j = 1; j < N + 1; j++)\n        if (____________) // 此处填写代码\n            cout << 1 << \" \";\n        else\n            cout << 0 << \" \";\n    cout << endl;\n}\n```",
            options: [
                "i = j",
                "j != j",
                "i >= j",
                "i == j"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n原卷下标从1到N，主对角线上行号与列号相等，因此填i==j，选D。j!=j始终为假，i>=j会把对角线下方也置1。i=j是赋值，会改变外层循环变量并把赋值结果当真假值，不能判断位置相等。原代码没有给内层for加花括号，它控制的仍是完整if/else语句。",
            tags: [
                "嵌套循环"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下面C++代码用于判断N是否为质数（素数），约定输入N为大于等于2的正整数，请在横线处填入合适的代码（ ）。\n\n```cpp\nint N = 0, i = 0;\ncout << \"请输入一个大于等于2的正整数：\";\ncin >> N;\nfor (i = 2; i < N; i++)\n    if (N % i == 0) {\n        cout << \"非质数\";\n        ____________; // 此处填写代码\n    }\nif (i == N)\n    cout << \"是质数\";\n```",
            options: [
                "break",
                "continue",
                "exit",
                "return"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n原卷从2检查到N-1。发现因子时输出非质数，并应立即break退出循环。此时i<N，循环后的i==N为假，不会再输出是质数。若一直没有因子，循环正常结束时i=N，输出是质数。故选A。continue会继续检查，可能重复输出，exit只是函数名而不是合法调用，return会退出所在函数，不能替代此处的循环退出逻辑。",
            tags: [
                "循环"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n```cpp\nint N = 9;\nfor (int i = 2; i < N; i++)\n    if (N % i)\n        cout << \"1#\";\ncout << \"0\" << endl;\n```",
            options: [
                "1#0",
                "1#",
                "1#1#1#1#1#1",
                "1#1#1#1#1#1#0"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\ni依次为2、3、4、5、6、7、8。只有i=3时9%i为0，其余6次余数非零，都输出1#。循环之后另输出0并换行，完整结果为1#1#1#1#1#1#0，选D。这里判断的是余数非零，正好与通常找整除因子的条件相反，不能把每轮都当成输出。",
            tags: [
                "程序分析"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "下面C++代码执行后的输出是（ ）。\n\n```cpp\nint cnt = 0;\nfor (int i = 1; i < 9; i++)\n    for (int j = 1; j < i; j += 2)\n        cnt += 1;\ncout << cnt;\n```",
            options: [
                "16",
                "28",
                "35",
                "36"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n按原卷外层i=1..8，内层j从1开始、步长2且严格小于i，各轮执行次数为0、1、1、2、2、3、3、4，相加得到16，选A。题库原来改成i<8、j<=i虽然碰巧总次数相同，但循环边界已改变，应恢复原题再分析，不能用输出相同代替题面核对。",
            tags: [
                "循环嵌套"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面C++代码执行后的输出是（ ）。\n\n```cpp\nint cnt = 0;\nfor (int i = 1; i < 13; i += 3)\n    for (int j = 1; j < i; j += 2)\n        if (i * j % 2 == 0)\n            break;\n        else\n            cnt += 1;\ncout << cnt;\n```",
            options: [
                "1",
                "3",
                "15",
                "没有输出"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n原卷外层i为1、4、7、10。i=1时内层不执行，i=4或10时第一个j=1就使乘积为偶数，break退出内层。i=7时j=1、3、5的乘积均为奇数，分别让cnt加1，所以最终为3，选B。break只退出内层循环，外层仍继续更新并检查后续i。",
            tags: [
                "循环"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（　）。\n\n```cpp\nint x = 1;\nwhile (x < 100) {\n    if (!(x % 3))\n        cout << x << \",\";\n    else if (x / 10)\n        break;\n    x += 2;\n}\ncout << x;\n```",
            options: [
                "1",
                "3,9,11",
                "3,6,9,10",
                "1,5,7,11,13,15"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nx从1开始每次加2。x=3、9时能被3整除，分别输出3,和9,。到x=11时不能被3整除，但x/10=1非零，进入else if并break，此轮不再加2。循环后输出当前x=11，所以完整结果为3,9,11，选B。两个分支属于同一if/else链，输出3或9后不会再判断else if。",
            tags: [
                "程序分析"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下面图形每一行从字母A开始，以ABC方式重复。行数为输入的整数。请在C++代码段横线处填入合适代码（ ）。\n\n输入7时的字母图形\n```text\nA\nAB\nABC\nABCA\nABCAB\nABCABC\nABCABCA\n```\n\n```cpp\nint N = 0;\ncout << \"请输入行列数量:\";\ncin >> N;\nfor (int i = 1; i < N + 1; i++) {\n    for (int j = 0; j < i; j++)\n        cout << ____________; // 此处填写代码\n    cout << endl;\n}\n```",
            options: [
                "'A'+j / 3",
                "(char)('A'+j / 3)",
                "'A'+j % 3",
                "(char)('A'+j % 3)"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n每行内层j从0开始，j%3按0、1、2重复。加字符A后得到A、B、C的编码，再显式转换成char，cout才按字符输出，所以选D。A、B用整除使字母每3个位置才变化，C虽然余数周期正确，但算术结果是int，会输出编码数字。行与行之间j重新从0开始，因此每行都以A开头。",
            tags: [
                "字符与ASCII"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "输入行数，约定1<=lineCount<=9，输出以下图形。应在C++代码横线处填入（ ）。\n\n原卷输入行数9时，数字图形为\n```text\n                1\n              1 2 1\n            1 2 3 2 1\n          1 2 3 4 3 2 1\n        1 2 3 4 5 4 3 2 1\n      1 2 3 4 5 6 5 4 3 2 1\n    1 2 3 4 5 6 7 6 5 4 3 2 1\n  1 2 3 4 5 6 7 8 7 6 5 4 3 2 1\n1 2 3 4 5 6 7 8 9 8 7 6 5 4 3 2 1\n```\n\n```cpp\nint lineCount = 0;\ncout << \"请输入行数量:\";\ncin >> lineCount;\nfor (int i = 0; i < lineCount; i++) {\n    for (int j = 0; j < ____________; j++) // 此处填写代码\n        cout << ' ';\n    for (int j = 1; j < i + 1; j++)\n        cout << j << \" \";\n    for (int j = i + 1; j > 0; j--)\n        cout << j << \" \";\n    cout << endl;\n}\n```",
            options: [
                "(lineCount-i-1) * 2",
                "(lineCount-i) * 2",
                "lineCount-i-1",
                "lineCount-i"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n第i行从0编号，数字部分宽度为4*i+2个输出字符，上一层与下一层相差4个字符，居中时左缩进每行减少2个空格。末行i=lineCount-1应为0个前导空格，因此应填(lineCount-i-1)*2，选A。其他选项或让末行仍有缩进，或每层只减少1个空格，无法与示意图对齐。",
            tags: [
                "图形绘制"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "某班级人数不知，连续输入成绩直到输入负数停止，输入结束后求出平均成绩。在以下C++代码横线处应填入是（ ）。\n```cpp\ndouble totalScore = 0;  // 总分\nint studCount = 0;     // 总人数\nwhile (________) {     // 此处填写代码\n    cin >> score;\n    if (score < 0)\n        break;\n    totalScore += score;\n    studCount += 1;\n}\ncout << \"平均分=\" << totalScore / studCount;\n```",
            options: [
                "true",
                "false",
                "True",
                "False"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n人数未知，应持续读取到负成绩，再由break退出，while条件填小写true，选A。负数在累加与人数增加之前就被排除，平均值用double总分除以人数得到。false使循环一次不执行，True、False不是C++布尔字面量。按正常输入成功且至少一个有效成绩的场景使用，否则还需要处理流失败或人数为0。",
            tags: [
                "循环"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "我们常说的互联网 (Internet) 是一个覆盖全球的广域网络，它不属于任何一个国家。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n互联网由分布在全球、彼此互联的许多网络构成，覆盖范围属于广域网络范畴。它跨越多个国家和地区，由多方分工建设与运行，不能把整个互联网归为某一个国家所有，因此原判断正确。具体国家和机构仍可拥有或管理其中的网络基础设施，这与整体跨地域互联的性质并不冲突。",
            tags: [
                "网络基础"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "“神威·太湖之光”超级计算机是中国自主研制的超级计算机，在全球超级计算机 TOP500 排行榜中多次荣膺榜首。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n神威·太湖之光采用我国研制的处理器，在2016至2017年的TOP500榜单中连续多次位居第一，符合题目所述“多次荣膺榜首”，判断正确。这里是历史成就陈述，应核对对应年份的榜单记录，不能用当前排名替代，也不能把历史第一解释为此后始终保持第一。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "C++表达式 7.8/2 的值为 3.9，类型为 float。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n7.8是double字面量，整数2经过通常算术转换后参与浮点除法，表达式类型为double，数学值为3.9。因此原判断虽然数值描述符合题意，但把类型写成float，整体错误。二进制浮点表示可能存在细小舍入误差，这不改变字面量及运算结果的静态类型。",
            tags: [
                "数据类型"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "C++表达式 (2 * 3) || (2 + 5) 的值为 67。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n逻辑或||的结果类型为bool，左侧2*3=6非零，条件为真，右侧甚至可以因短路而不求值。结果为true，默认cout显示为1，并非把6与7拼成67，因此判断错误。逻辑运算与算术加法、字符串拼接是不同操作，不能把两个操作数的显示形式串接来求值。",
            tags: [
                "逻辑运算"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "如果 m 和 n 为 int 类型变量，则执行 for (m = 0, n = 1; n < 9; ) n = ((m = 3 * n, m + 1), m - 1); 之后 n 的值为偶数。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n逗号表达式从左到右求值，并以末项为结果。每轮先令m=3*n，再求m+1但不保存，最终把m-1赋给n。n依次由1变为2、5、14，此时n<9为假，结束后n=14为偶数，因此判断正确。内层的m+1不会自动更新m，也不会成为外层逗号表达式的最终结果。",
            tags: [
                "循环"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "如果 a 为 int 类型的变量，则表达式 (a >= 5 && a <= 10) 与 (5 <= a <= 10) 的值总是相同的。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n正确范围判断需要a>=5与a<=10同时成立。连续比较5<=a<=10会先算5<=a得到bool的0或1，再与10比较，两种结果都小于等于10。例如a=0时前式为假，后式仍为真，足以否定“总是相同”，判断错误。C++不把连续比较解释成数学区间记号。",
            tags: [
                "逻辑运算"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下面C++代码执行后的输出为10。\n\n```cpp\nint cnt = 0;\nfor (int i = 1; i < 10; i++) {\n    cnt += 1;\n    i += 1;\n}\ncout << cnt;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原卷外层条件为i<10，循环体里和for更新处各把i加1，实际进入循环时i为1、3、5、7、9，共5轮，每轮cnt只加1，最终输出5。因此所称输出10错误。最后一轮结束后i变为11，不再满足条件。必须同时考虑循环体修改和迭代表达式，不能只看for头部。",
            tags: [
                "循环"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "执行以下 C++代码后的输出为 0。\n```cpp\nint rst = 0;\nfor (int i = -100; i < 100; i += 2)\n    rst += i;\ncout << rst;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n累加项是-100、-98、……、98，共100个偶数，右端不包括100。除了-100外其余正负项可抵消，最终为-100，所以“输出0”的判断错误。也可用等差数列公式100*(-100+98)/2=-100验证。若把边界误看成小于等于100，才会得到对称的0。",
            tags: [
                "循环"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "执行以下 C++代码后的输出为 30。\n```cpp\nint rst = 0;\nfor (int i = 0; i < 10; i += 2)\n    rst += i;\ncout << rst;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n循环变量依次为0、2、4、6、8，到了10后条件i<10为假，因此和为20，原判断错误。30对应把10也计入的情形，但原卷严格排除10。步长为2不是逐个整数累加，也不是迭代了10轮，明确列出参与求和的数就能避免边界误算。",
            tags: [
                "循环"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "C++是一种高级程序设计语言。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nC++提供变量、表达式、条件、循环、函数、类与模板等语言抽象，属于高级程序设计语言，因此判断正确。“高级”描述抽象层次，不是评价程序员水平或学习难度。机器语言面向具体机器指令，汇编用助记符表示指令，C++源程序则通常通过编译构建后运行。",
            tags: [
                "计算机基础"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            title: "小杨的 X 字矩阵",
            samples: [
                {
                    input: "5",
                    output: "+---+\n-+-+-\n--+--\n-+-+-\n+---+"
                },
                {
                    input: "7",
                    output: "+-----+\n-+---+-\n--+-+--\n---+---\n--+-+--\n-+---+-\n+-----+"
                }
            ],
            question: "\n# [GESP202309 二级] 小杨的 X 字矩阵\n\n## 题目描述\n\n小杨想要构造一个 $N \\times N$ 的 X 字矩阵（$N$ 为奇数），这个矩阵的两条对角线都是半角加号 `+` ，其余都是半角减号 `-` 。例如，一个 $5 \\times 5$ 的 X 字矩阵如下：\n\n```plain\n+---+\n-+-+-\n--+--\n-+-+-\n+---+\n```\n\n请你帮小杨根据给定的 $N$ 打印出对应的“X 字矩阵”。\n\n## 输入格式\n\n一行一个整数 $N$ （ $5 \\le N \\le 49$，保证为奇数）。\n\n## 输出格式\n\n输出对应的“X 字矩阵”。\n\n请严格按格式要求输出，不要擅自添加任何空格、标点、空行等任何符号。你应该恰好输出 $N$ 行，每行除了换行符外恰好包含 $N$ 个字符，这些字符要么是 `+`，要么是 `-`。\n\n## 特别提醒\n\n在本场考试中，请不要在输入、输出中附带任何提示信息。\n",
            score: 25,
            explanation: "**解析**\n\n用从0开始的行列下标，主对角线满足i==j，副对角线满足i+j==N-1。任一条件成立就输出加号，否则输出减号，每行完成后换行。奇数阶中心同时满足两条件，仍只输出一个加号。N为5..49内奇数，逐项打印N²个字符，时间O(N²)、额外空间O(1)。可用独立构造对角线位置集合检查全域输出，无需改动参考程序。",
            tags: [
                "编程题",
                "图形绘制",
                "模拟"
            ],
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int N;\n    cin >> N;\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int N;\n    cin >> N;\n    for (int i = 0; i < N; ++i) {\n        for (int j = 0; j < N; ++j) {\n            if (i == j || i + j == N - 1) cout << '+';\n            else cout << '-';\n        }\n        cout << '\\n';\n    }\n    return 0;\n}",
            answer: ""
        },
        {
            id: 27,
            type: "programming",
            title: "数字黑洞",
            samples: [
                {
                    input: "352",
                    output: "4"
                }
            ],
            question: "\n# [GESP202309 二级] 数字黑洞\n\n## 题目描述\n\n给定一个三位数，要求各位不能相同。例如，$352$ 是符合要求的，$112$ 是不符合要求的。将这个三位数的三个数字重新排列，得到的最大的数，减去得到的最小的数，形成一个新的三位数。对这个新的三位数可以重复上述过程。神奇的是，最终一定会得到 $495$！\n\n试试看，重新排列 $352$，得到的最大数为 $532$，最小数为 $235$，它们的差是 $297$；变换 $297$，得到 $972-279=693$；变换 $693$，$963-369=594$；变换 $594$，$954-459=495$。因此，经过 $4$ 次变换得到了 $495$。\n\n现在，输入的三位数，你能通过编程得出，这个三位数经过多少次变换能够得到 $495$ 吗？\n\n## 输入格式\n\n输入一行，包含一个符合要求的三位数 $N$。\n\n## 输出格式\n\n输出一行，包含一个整数 $C$，表示经过 $C$ 次变换得到 $495$。\n",
            score: 25,
            explanation: "**解析**\n\n每轮把三个数位升序排列，分别组成最小数与最大数，相减后更新状态并计数。输入已为495时直接输出0。含0时最小排列可能以0开头，按数值计算即可，例如013表示13，仍要保持三数位的位置含义。原题要求各位互异，112不属于合法输入。样例352依次到297、693、594、495，共4步。排序实现与原卷六种排列分支在合法域内等价，空间O(1)。",
            tags: [
                "编程题",
                "模拟",
                "排序"
            ],
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    int n, cnt = 0;\n    cin >> n;\n    while (n != 495) {\n        int d[3];\n        d[0] = n / 100, d[1] = n / 10 % 10, d[2] = n % 10;\n        sort(d, d + 3);\n        int ma = d[2] * 100 + d[1] * 10 + d[0];\n        int mi = d[0] * 100 + d[1] * 10 + d[2];\n        n = ma - mi;\n        cnt++;\n    }\n    cout << cnt << endl;\n    return 0;\n}",
            answer: ""
        }
    ]
};
