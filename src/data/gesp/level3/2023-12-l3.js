// 2023-12-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2023-12-l3",
    title: "2023年12月 GESP C++ 三级真题",
    level: 3,
    year: 2023,
    month: 12,
    session: 4,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1584917876047904.pdf",
        notes: "AI-Codex对照登记mirror PDF全部9页文本与渲染，恢复代码截图及分鱼范围，参考程序采用原PDF倒推算法；Q1/Q7源疑点保留官方答案隔离。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B412%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部9页文本与渲染，Git blob SHA 71be70512154a513b84196e753fd37621a509a86一致，p1单选/p4判断答案表与25题原answer逐项一致。Q1/Q7源疑点保留官方答案隔离；补齐代码截图转录与分鱼范围，分鱼参考按原PDF倒推算法替换逐鱼枚举，独立BigInt预言机全合法域检查另记。",
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
            question: "下面 C++ 数组的定义中，会丢失数据的是（ ）。",
            options: [
                "char dict_key[] = {'p','t','o'};",
                "int dict_value[] = {33,22,11};",
                "char dict_name[] = {'chen','wang','zhou'};",
                "float dict_value[] = {3,2,1};"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nC使用单引号包住chen等多个字符，形成多字符常量，其类型为int且值由实现决定，并不是能存储名字的字符串。将本机这些常量放进char列表会发生不允许的窄化并被C++17编译器拒绝，不能沿用旧解析说必然截取最后一个字符。官方选择C保留，但题目称可执行后丢失数据缺少标准/扩展前提，已隔离。需要存名字应采用string数组等合适结构。",
            tags: [
                "字符串",
                "字符数组",
                "数组"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：原卷p1选C并称会丢失数据，但chen/wang/zhou均写在单引号中，是实现定义int值的多字符常量，并非字符串。当前GNU C++17对这些常量初始化char的列表窄化直接报错，不能保证该定义可执行后只是丢失数据。保留answer=2和原选项，暂停计分，待语言版本/扩展语境澄清。"
        },
        {
            id: 2,
            type: "single",
            question: "在下列编码中，不能够和二进制“1101 1101”相等的是（ ）。",
            options: [
                "（221）10进制",
                "（335）8进制",
                "（dd）16进制",
                "（5d）16进制"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n二进制11011101按位权展开为128+64+16+8+4+1=221。转八进制可分组为011 011 101，即335；转十六进制为1101 1101，即DD。十六进制5D则等于5×16+13=93，与221不同，因此选D。这里dd和DD只是十六进制数码的大小写差别，不改变值，也不能把字符编码值拿来替代数码值。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下面 C++ 代码执行后不能输出“GESP”的是（ ）。",
            sourcePage: 1,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            options: [
                "string str(\"GESP\"); cout << str << endl;",
                "string str = \"GESP\"; cout << str << endl;",
                "string str(\"GESP\"); cout << str[1] << str[2] << str[3] << str[4] << endl;",
                "string str{\"GESP\"}; cout << str << endl;"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n四个字符G、E、S、P对应下标0到3。C从下标1开始输出，依次为E、S、P以及下标4处值为0的字符，因此不能输出GESP，选C。C++17允许只读string的pos==size()位置，其值为char()，与访问pos>size()的越界不同，不能把本题str[4]误说成必然未定义。其余三种初始化方式都可得到并整串输出GESP。",
            tags: [
                "字符串"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "执行下面 C++ 代码输出是（ ）。\n```cpp\nint temp = 0;\nfor (int i = 1; i < 7; i++) {\n for (int j = 1; j < 5; j++) {\n if (i / j == 2) temp++;\n }\n}\ncout << temp << endl;\n```",
            options: [
                "10",
                "8",
                "4",
                "3"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n外层i取1至6，内层j取1至4，i/j为整数商而不是浮点商。满足商为2的数对是(2,1)、(4,2)、(5,2)、(6,3)，共有4组，选C。特别是5/2也等于2，不能只统计i恰好等于2j的情形；反之i=3、j=1的商已经为3，不计入。按循环范围逐对验证可避免错把除法当成精确比例。",
            tags: [
                "循环",
                "整数除法"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "执行下面C++代码后，输出是（ ）。\n\n```cpp\nstring str(\"chen\");\nint x = str.length();\nint temp = 0;\nfor (int i = 0; i <= x; i++)\n    temp++;\ncout << temp << endl;\n```",
            options: [
                "4",
                "2",
                "5",
                "3"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n字符串chen的长度是4，因此x=4。循环i从0开始且条件为i<=x，依次处理0、1、2、3、4共5个值，每次给temp加1，所以输出5，选C。这个循环没有访问str[i]，只使用字符串长度作计数上界，因此不能因为包含i=4就说发生字符串越界；循环次数与合法字符下标的范围须分开分析。",
            tags: [
                "字符串",
                "循环"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "执行下面C++代码后输出的是（ ）。\n\n```cpp\nstring str(\"chen\");\nint x = str.length();\ncout << x << endl;\n```",
            options: [
                "4",
                "3",
                "2",
                "5"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n字符串chen由c、h、e、n四个字符组成，length()返回内容长度4，输出4，选A。这里是std::string的成员函数，不是用sizeof统计对象本身所占的存储空间；字符串为实现管理的对象，其sizeof与所保存字符数量没有这种直接相等关系。C风格结尾空字符也不计入string的length()返回值。",
            tags: [
                "字符串"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "执行下面C++代码后输出的是（ ）。\n\n```cpp\nstring str(\"chen\");\ncout << str[5] << endl;\n```",
            options: [
                "输出未知的数",
                "输出 'n'",
                "输出 '\\0'",
                "输出空格"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nstr内容为chen，size()为4。C++17的operator[]只允许pos<=size()，其中pos==4只读时返回零字符，原题访问5已超过允许范围，行为未定义，不能承诺一定输出某个未知的数或字符。官方A保留，但选项没有准确描述此语义，因此隔离等待澄清。本轮不运行str[5]并用偶然输出当答案，仅检查size与访问位置关系。",
            tags: [
                "字符串",
                "未定义行为"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：原卷p2选A“输出未知的数”，但string(\"chen\")长度4，str[5]大于size()，不满足operator[]前提，行为未定义；不是保证会输出某个数。保留answer=0和原代码/选项，暂停计分。str[4]读取末尾零字符与str[5]越界需严格区分，不执行越界以采信偶然输出。"
        },
        {
            id: 8,
            type: "single",
            question: "下面 C++ 代码执行后的输出是（ ）。\n```cpp\nchar ch[10] = {'1'};\ncout << ch[2] << endl;\n```",
            options: [
                "0",
                "1",
                "输出空格",
                "什么也不输出"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nchar ch[10]只显式初始化首元素为字符'1'，剩余9个元素值初始化为零字符，所以ch[2]为'\\0'。流插入char会送出这个不可见字符，随后endl还送出换行并刷新；按选项通常指不显示可见字符的含义选D。它不是可见数字0，也不是空格或字符1。不能把“什么也不输出”解释成标准输出字节数严格为0，本次实际核对保留NUL与换行。",
            tags: [
                "字符数组",
                "数组"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下面C++代码用于统计每种字符出现的次数，当输出为3时，横线上不能填入的代码是（ ）。\n\n```cpp\nstring str=\"GESP is a good programming test!\";\nint x=0;\nfor(int i=0;i<str.length();i++)\n{\n    if(________)\n    {\n        x++;\n    }\n}\ncout<<x<<endl;\n```",
            options: [
                "str[i]=='o'",
                "str[i]=='a'+14",
                "str[i]==115",
                "str[i]==111"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n原字符串中小写o出现3次，而小写s仅出现2次。ASCII中'a'+14和111均为字符o的编码，A、B、D都统计o，得到3；115对应s，统计得到2，所以不能填C。应按大小写敏感的字符比较逐个数，字符串开头大写GESP中的S不是小写s，不能混计；本轮恢复了原代码的变量名x及填空框架。",
            tags: [
                "字符串",
                "字符与ASCII"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "32 位计算机中，C++ 的整型变量 int 能够表示的数据范围是（ ）。",
            options: [
                "2^31~(2^31)-1",
                "2^32",
                "-2^31~+(2^31)-1",
                "-(2^31)+1~2^31"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n按题目通常采用的32位补码int环境，其值域为−2^31到2^31−1，即−2147483648到2147483647，选C。共有2^32种位模式，但2^32不是一个值域区间，不能将B当作范围。负数比正数多一个可表示值。32位机器这个描述本身不构成所有C++实现对int位宽的普遍规定，解析明确此处依本卷常用实现并在本机核对limits边界。",
            tags: [
                "数据类型"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面 C++ 程序执行的结果是（ ）。\n```cpp\nint cnt = 0;\nfor (int i = 0; i <= 20; i++) {\n if (i % 3 == 0 && i % 5 == 0) cnt++;\n}\ncout << cnt;\n```",
            options: [
                "2",
                "3",
                "5",
                "4"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n循环i取0到20，包含两个端点。同时满足i%3==0与i%5==0的是0与15，cnt因此增加2次，选A。0除以任何非零整数余数都为0，所以也符合判断条件；如果忽略起点0，就会错误地只数到15。逻辑与要求两个条件都成立，不能把3或5任一个的倍数都计入结果。",
            tags: [
                "循环",
                "逻辑判断"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "C++ 的数据类型转换让人很难琢磨透，下列代码输出的值是（ ）。\n```cpp\nint a = 3;\nint b = 2;\ncout << a / b * 1.0 << endl;\n```",
            options: [
                "1.5",
                "1",
                "2",
                "1.50"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\na和b都是int，表达式按同级乘除从左到右求值，先算3/2得到整数1，再与double常量1.0相乘得到double的1。cout默认格式输出1，选B。后面的乘1.0不能补回整数除法已经舍去的小数部分；若要求1.5，需要在除法发生之前把至少一个操作数转换为浮点类型，例如a*1.0/b。",
            tags: [
                "类型转换",
                "整数除法"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "C++ 代码用于抽取字符串中的电话号码。约定：电话号码全部是数字，数字之间没有其他符号如连字符或空格等。代码中变量 strSrc 仅仅是示例，可以包含更多字符。下面有关代码说法，正确的是（ ）。",
            code: "string strSrc=\"红十字：01084025890火警电话：119急救电话：120紧急求助：110\";\nstring tel=\"\";\nfor(int i=0;i<=strSrc.length();i++)\n{\n    if(strSrc[i]>='0'&&strSrc[i]<='9')\n    {\n        tel=tel+strSrc[i];\n    }\n    else if(tel!=\"\")\n    {\n        cout<<tel<<endl;\n        tel=\"\";\n    }\n}",
            requiresCode: true,
            sourcePage: 4,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            options: [
                "代码将换行输出各个含有数字的电话号码。",
                "代码将不换行输出各个含有数字的电话号码，号码中间没有分隔。",
                "代码将不换行输出各个含有数字的电话号码，号码中间有分隔。",
                "不能够输出数字电话号码。"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n程序将连续数字字符追加到tel，遇到非数字且tel非空时输出tel并换行，再清空，因此选A。示例得到01084025890、119、120、110四行。循环含i==strSrc.length()这一轮：C++17读取string末尾位置得到零字符，恰可触发末段输出，不是普通数组随意越界。空串或末尾有非数字时tel为空，不会额外打印空号码；要输出格式化分隔须保留原有endl。",
            tags: [
                "字符串"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "某公司新出了一款无人驾驶的小汽车，通过声控智能驾驶系统，乘客只要告诉汽车目的地，车子就能自动选择一条优化路线，告诉乘客后驶达那里。请问下面哪项不是驾驶系统完成选路所必须的。（ ）",
            options: [
                "麦克风",
                "扬声器",
                "油量表",
                "传感器"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n按题设声控选路并告知乘客的过程，麦克风负责接收目的地语音，扬声器负责播报告知，传感器提供驾驶所需环境信息。油量表显示燃油余量，并非这一选路过程的必要部件，依本题功能分类选C。这是题设简化场景下的输入、处理、输出与感知设备辨认，不能把结论扩大成任何真实车辆的路线规划都永远不用能源状态。",
            tags: [
                "程序分析"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "现代计算机是指电子计算机，它所基于的是（ ）体系结构。",
            options: [
                "艾伦·图灵",
                "冯·诺依曼",
                "阿塔纳索夫",
                "埃克特-莫克利"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n本题按基础计算机课程中的存储程序体系结构分类，选择冯·诺依曼，B。核心思想是程序指令与数据存储在存储器中，由处理器按控制流程执行；常用功能部件包括运算器、控制器、存储器、输入和输出设备。这是本题的经典体系结构称谓，不意味着现代每一种专用电子计算设备都严格采用同一种内部存储组织。",
            tags: [
                "程序分析"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "执行 C++ 代码 cout << (5 && 2) << endl; 后将输出 1。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n5和2转换为bool时均为true，逻辑与true&&true的结果为bool真，cout在未启用boolalpha时输出1，原判断正确。这里计算的是逻辑真值，不是把两个整数按二进制逐位与；如果用单个&，5&2反而为0。默认输出格式与boolalpha下的true字样也要区分，本题原式没有改变格式标志。",
            tags: [
                "位运算",
                "逻辑判断"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "C++ 程序执行后，输入 chen a dai 输出应该为：chen。（ ）\n```cpp\nstring str;\ncin>>str;\ncout<<str;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\ncin>>str按空白分隔提取一个字符串。输入chen a dai时，只把第一个单词chen读入str，随后的空格及后续单词不会成为这次提取的内容，所以cout输出chen，原判断正确。这里不是读取整行的getline；程序也未执行第二次或第三次提取，因此不能把后三个字母段连接或连同空格输出。",
            tags: [
                "字符串"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "执行 C++ 代码 cout << (5 || 2); 后将输出 1。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n逻辑或只要求至少一个操作数真。5和2都非零，表达式5||2结果为bool真，默认输出1，因此原判断正确。逻辑或不是按位或，也不等于两个数相加：5|2为7，而5||2为1。本题没有boolalpha设置，所以输出的是数码1；不能用其操作数的数值大小推断输出5、2或7。",
            tags: [
                "位运算",
                "逻辑判断"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "执行下面 C++ 代码后将输出 “China”。\n```cpp\nstring a = \"china\";\na.replace(0, 1, \"C\");\ncout << a << endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\na初值china，replace(0,1,\"C\")从下标0开始用字符串C替换长度1的片段，即把首字母c换成大写C，其余hina保持，结果为China，原判断正确。这不是在开头额外插入一个C，也不是替换整个字符串。replace这里的第二个参数表示删除/替换的字符数，而不是结束下标。",
            tags: [
                "位运算",
                "字符串"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "执行 C++ 代码将输出 0 5，5 之后还有一个空格。\n```cpp\nint list[10] = {1,2,3,4,5,6,7,8,9,10};\nfor (int i = 0; i < 10; i++)\n if (i % 5 == 0)\n cout << list[i] << \" \";\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\ni在0到9中使i%5==0的值是0和5，但输出的是list[i]，分别为1与6，因此实际输出为“1 6 ”，末尾确有一个空格，原判断声称“0 5 ”是错误的。必须区分数组下标和数组元素值，本题初始化从1开始而下标从0开始；不能只看if筛选出0、5就把这两个下标当作输出。",
            tags: [
                "位运算",
                "循环"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "下面 C++ 代码将输出 1。\n```cpp\nint list[10] = {1};\ncout << list << endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\ncout<<list中数组表达式会退化为指向首元素的int指针，由流的指针输出重载显示地址形式，不是输出首元素1，原判断错误。初始化{1}只说明第一个元素为1、其余为0，并不使数组名代表数组内容。地址的具体文字随运行环境和分配位置变化，不应为其编造固定十六进制结果；输出首项须写list[0]。",
            tags: [
                "位运算",
                "数组"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "下面 C++ 程序将输出 1。\n```cpp\nint arr[10] = {1};\ncout << arr[0] << endl;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n数组arr只显式给出一个初始化值1，首元素arr[0]因此为1，剩余元素按聚合初始化规则补零。语句明确输出首元素，得到1，原判断正确。它与上一题直接输出数组名不同，既不会输出地址，也不会把十个元素全部逐个输出；要输出整张数组仍须另写遍历循环或其他逐项输出逻辑。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "执行 C++ 代码，将输出 1 3 5 7 9，9 之后还有一个空格。\n```cpp\nint list[10] = {1,2,3,4,5,6,7,8,9,10};\nfor (int i = 0; i < 10; i += 2) {\n cout << list[i] << \" \";\n}\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n循环i依次为0、2、4、6、8，读取数组的第1、3、5、7、9个元素，也就是1、3、5、7、9；每次随后输出一个空格，因此9之后也有空格，原判断正确。i+=2改变的是下标，不是对读取到的元素加2；本题数据恰好连续递增，不能把这个巧合当作任意数组输出等差数列的规则。",
            tags: [
                "位运算",
                "循环"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "小杨最近在准备考 GESP，他用的 Dev C++ 来练习和运行程序，所以 Dev C++ 也是一个小型操作系统。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nDev C++属于集成开发环境，提供编辑、编译、调试与运行程序的工具入口，需要依托操作系统工作，并不因为可以运行练习程序就成为一个操作系统，原判断错误。操作系统管理计算机资源并提供基础运行服务，开发环境则是其上的应用软件。应依据职责分类，不能把软件界面看起来能做很多事误作系统软件依据。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "任何一个 while 循环都可以转化为等价的 for 循环。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n原判断正确。while(condition){body}可直接改写为for(;condition;){body}，没有额外初始化和更新表达式，两者的条件判断时机相同；body中的break和continue仍作用于同一个循环逻辑。若使用涉及新变量作用域的更复杂改写，还需保留作用域和执行顺序，但不影响这种直接等价写法。不要混入把带更新for反向改while时的continue陷阱。",
            tags: [
                "循环"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "2\n1",
                    output: "7"
                },
                {
                    input: "3\n1",
                    output: "25"
                }
            ],
            question: "\n# [GESP202312 三级] 小猫分鱼\n\n## 题目描述\n\n海滩上有一堆鱼，$N$ 只小猫来分。第一只小猫把这堆鱼平均分为 $N$ 份，多了 $i$ 条，它把多的 $i$ 条扔进海里，拿走了其中的一份。第二只小猫接着把剩下的鱼平均分为 $N$ 份，又多了 $i$ 条，它同样把多的 $i$ 条扔进海里，拿走了其中的一份。之后的小猫都按同样的方式分鱼，直到第 $N$ 只小猫也拿走了自己的一份（每只小猫分得的一份都不能为空）。\n\n请问海滩上最少有多少条鱼，才能让上述过程顺利完成？\n\n## 输入格式\n\n总共 $2$ 行。第一行一个整数 $N$，第二行一个整数 $i$。\n\n保证 $0 < N < 10$、$i < N$；$i$ 表示每次扔掉的鱼数。\n\n## 输出格式\n\n一行一个整数，表示满足要求的海滩上最少的鱼数。\n\n\n例如N=2、i=1时，第二只小猫拿1条之前有3条，第一只小猫分鱼前至少有3×2+1=7条。\n\n## 特别提醒\n请不要在输入、输出中附带任何提示信息。",
            explanation: "**解析**\n\n按原PDF算法枚举最后一只小猫拿到的份额k，从1递增，最后一次分鱼前有k*N+i条。往前倒推时，当前剩余鱼数必须能被N−1整除，上一轮分鱼前数为当前数/(N−1)*N+i，连续倒推N−1轮。合法情况下该值随k递增，所以首个成功结果最小。N=1时没有倒推步骤，避免除以0。恢复原卷0<N<10、i<N的范围，鱼数语境中i可为0；不沿用旧库强加i>0的限制。时间O(KN)、额外空间O(1)，优于逐个初始鱼数枚举；用long long存中间值。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "模拟",
                "枚举"
            ],
            referenceCode: "#include <iostream>\nusing namespace std;\nint main(){\n    long long n, i;\n    cin >> n >> i;\n    for (long long k = 1; ; ++k) {\n        long long ans = k * n + i;\n        bool valid = true;\n        for (long long j = 1; j < n; ++j) {\n            if (ans % (n - 1) != 0) { valid = false; break; }\n            ans = ans / (n - 1) * n + i;\n        }\n        if (valid) { cout << ans << endl; return 0; }\n    }\n}\n",
            answer: "",
            title: "小猫分鱼",
            timeLimit: 1,
            memoryLimit: 128
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "2\n1 km = ? mm\n1 m = ? mm",
                    output: "1 km = 1000000 mm\n1 m = 1000 mm"
                },
                {
                    input: "5\n100 m = ? mm\n1000 km = ? m\n20 kg = ? g\n200 g = ? mg\n0 kg = ? mg",
                    output: "100 m = 100000 mm\n1000 km = 1000000 m\n20 kg = 20000 g\n200 g = 200000 mg\n0 kg = 0 mg"
                }
            ],
            question: "\n# [GESP202312 三级] 单位转换\n\n## 题目描述\n\n小杨这周的数学作业是做单位转换，喜欢编程的小杨决定编程帮他解决这些问题。\n\n小杨只学了长度单位和重量单位，具体来说：\n\n- 长度单位包括千米（`km`）、米（`m`）、毫米（`mm`），它们之间的关系是：$1\\text{km} = 1000\\text{m} = 1000000\\text{mm}$。\n\n- 重量单位包括千克（`kg`）、克（`g`）、毫克（`mg`），它们之间的关系是：$1\\text{kg} = 1000\\text{g} = 1000000\\text{mg}$。\n\n小杨的作业只涉及将更大的单位转换为更小的单位，也就是说，小杨的作业只会包含如下题型：米转换为毫米，千米转换为毫米，千米转换为米，克转换为毫克，千克转换为毫克，千克转换为克。\n\n现在，请你帮忙完成单位转换的程序。\n\n## 输入格式\n\n输入的第一行为一个整数，表示题目数量。\n\n接下来 $N$ 行，每行一个字符串，表示转换单位的题目，格式为 $x$ 单位 $1 = ?$ 单位 $2$。其中，$x$ 为一个不超过 $1000$ 的非负整数， 单位 $1$ 和 单位 $2$ 分别为两个单位的英文缩写，保证它们都是长度单位或都是重量单位，且 **单位 1** 比 **单位 2** 更大。\n\n例如，如果题目需要你将 $1\\text{km}$ 转换为 $\\text{mm}$，则输入为 `1 km = ? mm`。\n\n保证 $1\\le N \\le 1000$。\n\n## 输出格式\n\n输出 $N$ 行，依次输出所有题目的答案，输出时，只需要将输入中的 $?$ 代入答案，其余部分一字不差地输出即可。由于小杨的题目只涉及将更大的单位转换为更小的单位，并且输入的 $x$ 是整数，因此答案一定也是整数。\n\n例如，如果题目需要你将 $1\\text{km}$ 转换为 $\\text{mm}$，则输入为 `1 km = ? mm`。则你需要输出 `1 km = 1000000 mm`。\n\n\n## 特别提醒\n请不要在输入、输出中附带任何提示信息。输入严格按题目格式提供，输出须与标准答案完全一致。",
            explanation: "**解析**\n\n六种合法转换的倍率是1000或1000000，按输入源单位和目标单位查询倍率再乘原数即可。最大输入1000乘1000000为1000000000，当前long long实现安全。输出保留原数、单位、等号及单空格，只将问号替换为结果；输入严格按原题格式，不引入提示。每行独立处理，0也要输出0。当前参考采用固定六项表，与原PDF按最小单位权重相除等价，时间O(N)，除固定表外额外空间O(1)。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "字符串",
                "模拟"
            ],
            referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int N;\n    cin >> N;\n    map<pair<string, string>, long long> mp;\n    mp[{\"m\", \"mm\"}] = 1000;\n    mp[{\"km\", \"mm\"}] = 1000000;\n    mp[{\"km\", \"m\"}] = 1000;\n    mp[{\"g\", \"mg\"}] = 1000;\n    mp[{\"kg\", \"mg\"}] = 1000000;\n    mp[{\"kg\", \"g\"}] = 1000;\n\n    while (N--) {\n        long long x;\n        string u1, eq, ques, u2;\n        cin >> x >> u1 >> eq >> ques >> u2;\n        cout << x << \" \" << u1 << \" = \" << x * mp[{u1, u2}] << \" \" << u2 << \"\\n\";\n    }\n    return 0;\n}",
            answer: "",
            title: "单位转换",
            timeLimit: 1,
            memoryLimit: 128
        }
    ]
};
