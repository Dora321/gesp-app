// 2023-09-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2023-09-l3",
    title: "2023年9月 GESP C++ 三级真题",
    level: 3,
    year: 2023,
    month: 9,
    session: 3,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1570611239321632.pdf",
        notes: "AI-Codex对照登记mirror PDF全部8页文本与渲染，补流程图并恢复原卷代码/范围；Q9/Q10/Q11/Q20源疑点保留官方答案隔离。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B49%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-06",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex对照登记mirror PDF全部8页文本与渲染，Git blob SHA cbc0d550a4ba1fb37fbedfdd217f70d52d1bf666一致；p1单选与p5判断答案表逐项对照。保留全部answer及已有隔离，Q9/Q10/Q11/Q20新增来源前提/标准疑点隔离；参考程序在合法输入域用独立预言机运行后另存审计。",
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
            question: "人们所使用的手机上安装的 App 通常指的是（ ）。",
            options: [
                "一款操作系统",
                "一款应用软件",
                "一种通话设备",
                "以上都不对"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nApp是Application的缩写，指满足用户具体任务需求的应用程序，因此选B。手机操作系统负责资源管理和为应用提供运行环境，属于系统软件；通话设备则是硬件概念。手机上安装应用这一描述既不表示安装一套操作系统，也不表示增加一台通话设备，应按软件用途分类判断。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下列流程图的输出结果是？（ ）\n\n![流程图：a=5、s=1；a≥4时先令s=s×a，再令a=a−1并返回判断，否则输出s。](/question-assets/2023-09-l3/q2-flow.png)",
            options: [
                "60",
                "20",
                "5",
                "1"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n按本轮补回的原卷流程图执行，初始a=5、s=1。第一次判断5≥4，令s=1×5=5，再使a=4；第二次判断4≥4，令s=5×4=20，再使a=3。第三次3≥4为假，转到输出s，得到20，选B。旧解析在缺图时依据答案猜测“典型流程”，已改成按原图逐步追踪。",
            tags: [
                "流程图"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "已知大写字符 'A' 的 ASCII 编码的十六进制表示为 0x41，则字符 'L' 的 ASCII 编码的十六进制表示为（ ）。",
            options: [
                "4A",
                "4B",
                "4C",
                "52"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nASCII大写字母编码连续，L相对A的偏移是11，即十六进制0B。0x41+0x0B=0x4C，所以选C。这里要求的是十六进制数字4C，实际十进制值为76；4A和4B分别少算两位和一位，52不是从A正确偏移所得。不要把从A到L共12个字母误当作编码差值12。",
            tags: [
                "进制转换",
                "字符与ASCII"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "以下哪个不是 C++ 语言中的运算符？（ ）",
            options: [
                "~",
                "~~",
                "<",
                "<<"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n单独的~是按位取反，<是小于比较，<<可用于位左移并可被流类型重载；~~不是一个独立运算符，因此选B。合法的~~x会被分成两个连续的一元~，并不产生新的运算符。内建~要求整数或相应枚举操作数，不能沿用旧解析声称可对float使用；小整数还会先发生整型提升。",
            tags: [
                "位运算",
                "按位取反",
                "逻辑判断"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "如果数组定义为 long long array[] = {3, 5, 7, 2};，则数组 array 占用的字节数为（ ）。",
            options: [
                "32",
                "16",
                "8",
                "4"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n初始化列表含4个元素，因此整个数组占4*sizeof(long long)字节。在本卷常用的8位字节、long long占8字节环境中是4×8=32，选A；本机实际编译检查也为32。应区分标准至少64位的要求和所有实现一律8字节的说法。sizeof直接作用于数组时得到整个数组大小，不是单个元素或指针大小。",
            tags: [
                "数组",
                "计算机基础"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "一个数组定义为 double array[3];，则可合理访问这个数组的元素的下标最大为（ ）。",
            options: [
                "2",
                "3",
                "23",
                "24"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n长度为3的数组有3个元素，下标从0开始，合法下标依次是0、1、2，所以最大下标为2，选A。下标3已经位于末尾之后，不能作为元素读取或写入；数组占用的字节数与元素下标不是同一尺度。即便某次越界没有出现报错，也不能将其当成合理访问或在解析中承诺运行结果。",
            tags: [
                "数组"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "以下数组定义，符合 C++ 语言语法的是（ ）。",
            options: [
                "double a[];",
                "double b[] = {1, 2.0, '3'};",
                "double c[3.0];",
                "double[] d = new double[3];"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nB有3个初始化项，可推导长度为3，常量1、2.0、'3'均可在这里转换为double，选B。列表初始化并非普遍允许窄化；这里整数常量值能够精确表示，不触发该限制。A作为普通局部定义既无长度也无初值，C用浮点数作数组界限，D将[]放在了不符合C++声明语法的位置。",
            tags: [
                "数组"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "下列关于进制的叙述，正确的是（ ）。",
            options: [
                "只有十进制和二进制能够用来表示小数，八进制和十六进制不可以。",
                "常用的进制包括二进制、八进制、十进制、十六进制，其他进制在日常生活中很少使用。",
                "对任意正整数，其二进制表示不会比它的十进制表示更短。",
                "正整数的八进制表示中，每一位可能出现的最大数字是 8。"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n不补前导零时，若正整数有d位十进制数字，则N≥10^(d−1)≥2^(d−1)，因此二进制至少也有d位，C正确。这比把位数近似为对数更适合直接证明。任意这些进位制都能表示小数，A错；时间常用六十进制等混合进位方式，B过于笼统；八进制数码最大是7，D错。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "下列关于 C++ 语言中数组的叙述，不正确的是（ ）。",
            options: [
                "可以定义 0 个元素的数组。",
                "不能定义 -1 个元素的数组。",
                "数组下标越界访问会产生编译错误。",
                "程序运行时发生数组下标的越界访问，程序依然可能正常结束。"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n原表选C：越界并不必然导致编译错误，程序可能编译并结束，但其行为没有保证。本题另有A的语境疑点：标准普通内建数组不允许0界限，GNU接受int a[0]属于扩展；new int[0]则是标准允许的动态数组分配形式，不能混为同一规则。原文未限定讨论范围，保留官方C与原选项并隔离，等待澄清而不擅改答案。",
            tags: [
                "数组",
                "运算符",
                "未定义行为"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：原卷p3选C，但A“可以定义0个元素的数组”未区分普通内建数组与new T[0]。标准C++17普通数组界限须大于0，int a[0]须诊断；GNU默认模式允许它是扩展，不能泛称标准合法。new int[0]则标准允许。若按普通内建数组语境，A和C都错；待澄清数组范围/编译扩展约定。保留answer=2和原选项、暂停计分。"
        },
        {
            id: 10,
            type: "single",
            question: "如果 a 是 int 类型的变量，下列哪个表达式的值一定为 true？（ ）",
            options: [
                "a+1000-1000 == a",
                "a * 2 / 2 == a",
                "(a & 1) == 1",
                "(a | 1) == a+1"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n按无溢出整数代数，A先加1000再减1000会恢复a；但题目只说int，没有排除a=INT_MAX，第一步就超出可表示范围，不能保证表达式有定义。B乘2也可能溢出，C仅判断最低位为1，D也不是对任意a成立。官方A保留并隔离；补范围后的推理不能冒充原题对所有int的保证，也不能用优化器消项后的输出证明安全。",
            tags: [
                "位运算",
                "逻辑判断"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：原卷p3选A，但仅限定int而无范围。a=INT_MAX时a+1000已超有符号int范围，后减1000不能消除先发生的未定义行为；原式不保证总为true。保留answer=0及原表达式，暂停计分。"
        },
        {
            id: 11,
            type: "single",
            question: "如果 a 和 b 均为 int 类型的变量，下列表达式不能正确判断“a 等于 b”的是（ ）。",
            options: [
                "((a >= b) && (a <= b))",
                "((a >> 1) == (b >> 1))",
                "((a+b) == (a+a))",
                "((a ^ b) == 0)"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nB会丢失最低位，例如a=2、b=3时均右移为1，错误地认为相等。A的双重比较和D的异或为0可直接判断相等；C在加法均有定义时可消去公共a，但a=b=INT_MAX时两边的加法都会超范围，因此原题全int范围下还需考虑C。官方选B保留，因遗漏溢出前提隔离，不能沿用旧解析把C说成无条件等价。",
            tags: [
                "位运算",
                "逻辑判断"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：原卷p3选B；B把2和3右移都变成1，确实不能判断相等。但C的a+b和a+a可能有符号溢出，a=b=INT_MAX时也不保证有定义，故在未限定范围的int域并非只有B不能可靠判断。保留answer=1和原选项，暂停计分。"
        },
        {
            id: 12,
            type: "single",
            question: "如果 a 为 char 类型的变量，下列哪个表达式可以正确判断“a 是大写字母”？（ ）",
            options: [
                "a-'A' <= 26",
                "'A' <= a <= 'Z'",
                "'A' <= 'a' <= 'Z'",
                "('A' <= a) && (a <= 'Z')"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n正确判断必须同时满足下界和上界，即('A'<=a)&&(a<='Z')，选D。A只有上界且允许26，比'Z'大一位的'['也能满足；B的关系运算从左到右，先得到0或1再与'Z'比较，不能表示数学链式范围；C还把变量a写成字符常量'a'。以'@'、'A'、'Z'、'['等边界可直接区分这些表达式。",
            tags: [
                "逻辑判断"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "在下列代码的横线处填写（ ），可以使得输出是“20 10”。",
            code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int a = 10, b = 20;\n    a = (a << 8) | b;\n    ________ // 在此处填入代码\n    cout << a << \" \" << b << endl;\n    return 0;\n}",
            requiresCode: true,
            sourcePage: 3,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-06",
            options: [
                "a = a >> 8; b = a & 0xff",
                "b = a >> 8; a = a & 0xff;",
                "a = b; b = a & 0xff;",
                "b = a; a = b;"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n原代码将10左移8位并与20按位或，得到0x0A14，即2580。填B先取高字节，使b=2580>>8=10，再取低字节，使a=2580&0xff=20，输出20 10。顺序很关键：若先覆盖a的高字节信息，再取低字节就无法保留20。A原选项末尾缺分号，按原文保留；B本身包含所需分号，直接填入合法。",
            tags: [
                "进制转换",
                "位运算",
                "逻辑判断"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "在下列代码的横线处填写（ ），可以使得输出是“120”。\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n int array[5] = {1, 2, 3, 4, 5};\n int res = 0;\n for (int i = 0; i < 5; i++)\n _______; // 在此处填入代码\n cout << res << endl;\n return 0;\n}\n```",
            options: [
                "res += array[i];",
                "res *= array[i]",
                "res = array[i]",
                "以上均不对。"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nres初始为0。A依次累加1到5，结果15；B从0开始乘，结果一直为0；C逐次覆盖res，最后得到5。因此三项均不能输出120，应选D。120是1×2×3×4×5，但想求该乘积还须把初值改为1，原题只允许填写横线，不能偷偷改变res的初始化。原空位自带分号，A已有分号时多出的空语句不影响本题求和结果。",
            tags: [
                "数组",
                "循环"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "在下列代码的输出是（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\n\nint main() {\n int array[10];\n for (int i = 0; i < 10; i++)\n array[i] = i;\n for (int p = 2; p < 10; p++)\n if (array[p] == p)\n for (int n = p; n < 10; n += p)\n array[n] = array[n] / p * (p-1);\n int res = 0;\n for (int n = 1; n < 10; n++)\n res += array[n];\n cout << res << endl;\n return 0;\n}\n```",
            options: [
                "15",
                "28",
                "45",
                "55"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n数组先初始化为下标值。p=2处理2的倍数，p=3处理3的倍数；p=4已被修改所以跳过，后面仍满足array[p]==p的是5和7。最终下标1至9的值依次为1、1、2、2、4、2、6、4、6，总和28，选B。程序是欧拉函数筛的一种实现；也可独立枚举1..n中与n互素的整数计数来核对，不能直接把原下标求和45当答案。",
            tags: [
                "数组",
                "循环"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "二进制数 101.101 在十进制下是 5.005。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n二进制小数点左侧101为4+1=5，右侧.101按2^−1、2^−2、2^−3展开为1/2+0+1/8=0.625，总值5.625而非5.005，因此原判断错误。小数点后仍使用所在进制的位权，不能把二进制小数的字符形状直接搬到十进制小数中；0.101的十进制数值与二进制.101不同。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 语言中，位运算符也有类似“先乘除、后加减”的优先级规则，因此使用时应注意合理使用括号。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n原判断正确。位运算也有固定优先级，例如移位高于按位与，按位与又高于按位异或和按位或；相等比较也与按位操作存在先后关系。若想判断最低位，应写(a&1)==0，不能省略括号写a&1==0，因为后者先算1==0。合理使用括号可明确预期分组，不能简单按表达式从左到右套算。",
            tags: [
                "位运算",
                "运算符"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "字符常量'3'的值和int类型常量3的值是相同的，只是占用的字节数不同。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n在ASCII环境，字符常量'3'的编码值是51，而整型常量3就是数值3，二者并不相同，原判断错误。这不仅是存储大小的差别；字符转换成整数参与运算时也不会自动变成数字3，应通过'3'-'0'得到3。普通字符常量在C++中类型为char，整型提升后仍保留原编码数值。",
            tags: [
                "字符与ASCII",
                "计算机基础"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "在C++语言中，长度为n的数组，访问下标为n的元素会引起编译错误。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原卷用的是长度n与下标n，本轮恢复该一般表述。长度n的普通数组合法下标为0到n−1，下标n在末尾之后，元素读写属于越界，但不必在编译期报错，所以原判断错误。可编译只能说明未被该次诊断拒绝，不能证明访问合法；本轮只编译越界示例，不运行并采信其偶然输出。",
            tags: [
                "数组",
                "运算符",
                "未定义行为"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "在 C++ 语言中，所有 int 类型的值，经过若干次左移操作（<<）后，它们的值总会变为 0。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n原表判正确，但原文涵盖所有int又未限定标准版本。C++17规定负有符号数左移为未定义行为，例如a=−1时a<<1没有可依赖的标准结果，不能保证反复左移到0；移位数还必须小于类型位宽。固定宽度无符号数的连续左移丢位直觉不能代替该规则。保留官方判断并隔离，等待语言版本和操作前提澄清，不运行未定义代码来推导答案。",
            tags: [
                "位运算"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT：原卷p5判√，但未限定语言版本或无符号数。C++17对负int左移为未定义行为，如-1<<1；对非负数也有可表示性及移位数界限要求，不能把固定宽度位丢弃直觉推广为所有int总能移为0。保留answer=0和原文，暂停计分，待版本/操作前提澄清。"
        },
        {
            id: 21,
            type: "judge",
            question: "在 C++ 语言中，数组下标的大小决定元素在逻辑上的先后顺序，与元素在内存中位置的先后顺序无关。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原判断错误。普通数组中元素连续存储，同一个数组中下标较大的元素地址也更靠后，每相邻元素相隔sizeof(元素类型)字节。下标既确定逻辑位置，也参与实际地址计算，不能说与内存位置的先后顺序无关。这里讨论的是同一数组内的元素，不能推广成不同无关对象之间的地址排序规则。",
            tags: [
                "数组",
                "计算机基础"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "在 C++ 语言中，定义数组时，[] 中必须指定元素个数。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原判断错误。定义int a[]={1,2,3}时，方括号中可省略长度，编译器从初始化项推导出3；字符数组由字符串字面量初始化时也可推导长度并计入结尾空字符。这不意味着没有初始化信息的普通局部数组int a[]也合法，应区分“可以省略且能推导”和“随意不提供大小信息”两种情形。",
            tags: [
                "数组",
                "计算机基础"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "著名的哥德巴赫猜想：任一大于 2 的偶数都可写成两个素数之和。我们可以通过枚举法来证明它。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原判断错误。哥德巴赫猜想讨论所有大于2的偶数，是无限多的输入；逐个枚举并检查有限范围只能证明该范围内成立，不能推出所有更大偶数也成立。程序可找出一个偶数的素数分解，或在有界范围寻找反例，但有限计算没有反例不等于完成普遍数学证明，不能把验证算法与证明混同。",
            tags: [
                "枚举",
                "算法思维"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "在 C++ 语言中，表达式 (0xff == 255) 的值为 true。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n十六进制0xff有两个数码F，每个值15，因此数值为15×16+15=255，与十进制整数常量255相等，表达式值为true，原判断正确。这里比较整数数值而非源代码书写字符串；0x前缀指定十六进制，字母f的大小写不改变数码值，不能把字符f的ASCII编码参与此处计算。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "如果 a 为 int 类型的变量，且表达式 ((a & 1) == 0) 的值为 true，则说明 a 是偶数。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在本卷使用的补码整数环境中，最低位为0表示该整数可被2整除，按位与1只留下最低位，因此(a&1)==0说明a为偶数，原判断正确；0和负偶数同样成立。本机按正负边界实际验证该结论。若要不依赖有符号表示细节地写整除条件，可用a%2==0；不能把最低位检测误读成a本身必须为0。",
            tags: [
                "位运算"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "2 3\n0 1 0",
                    output: "4 2"
                },
                {
                    input: "3 5\n0 0 0 2 0",
                    output: "11 0 4"
                }
            ],
            question: "\n# [GESP202309 三级] 小杨的储蓄\n\n## 题目描述\n\n小杨共有 $N$ 个储蓄罐，编号从 $0$ 到 $N-1$。从第 $1$ 天开始，小杨每天都会往存钱罐里存钱。具体来说，第 $i$ 天他会挑选一个存钱罐 $a_i$，并存入 $i$ 元钱。过了 $D$ 天后，他已经忘记每个储蓄罐里都存了多少钱了，你能帮帮他吗？\n\n## 输入格式\n\n输入 $2$ 行，第一行两个整数 $N,D$；第二行 $D$ 个整数，其中第 $i$ 个整数为 $a_i$$（保证 $0 \\le a_i \\le N-1$）。\n\n每行的各个整数之间用单个空格分隔。\n\n保证 $1 \\le N \\le 1,000$；$1 \\le D \\le 1,000$。\n\n## 输出格式\n\n输出 $N$ 个用单个空格隔开的整数，其中第 $i$ 个整数表示编号为 $i-1$ 的存钱罐中有多少钱（$i=1, \\cdots ,N$）。\n\n\n## 特别提醒\n请不要在输入、输出中附带任何提示信息。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}",
            score: 25,
            explanation: "**解析**\n\n建立按编号索引的余额表，初始全0。第i天读入编号a_i，给该编号增加i元，处理完D天再按0到N−1输出各余额。样例2中0号得到1+2+3+5=11，2号得到4，1号仍为0。总金额最多1000×1001/2=500500，当前long long参考实现安全。时间O(N+D)，余额表按规模理解为O(N)空间；当前代码固定分配1005项，合法下标至999，不输出任何提示。",
            tags: [
                "数组",
                "模拟"
            ],
            referenceCode: "\n#include <iostream>\n#include <vector>\nusing namespace std;\n\nlong long savings[1005];\n\nint main() {\n    int N, D;\n    cin >> N >> D;\n    for (int i = 1; i <= D; i++) {\n        int a;\n        cin >> a;\n        savings[a] += i;\n    }\n    for (int i = 0; i < N; i++) {\n        cout << savings[i] << (i == N-1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}\n",
            answer: "",
            title: "小杨的储蓄",
            timeLimit: 1,
            memoryLimit: 128
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "2\n15A6F\n1011",
                    output: "0 0 0 1\n1 1 1 1"
                },
                {
                    input: "4\n1234567\n12345678\nFF\nGG",
                    output: "0 1 1 1\n0 0 1 1\n0 0 0 1\n0 0 0 0"
                }
            ],
            question: "\n# [GESP202309 三级] 进制判断\n\n## 题目描述\n\n$N$ 进制数指的是逢 $N$ 进一的计数制。例如，人们日常生活中大多使用十进制计数，而计算机底层则一般使用二进制。除此之外，八进制和十六进制在一些场合也是常用的计数制（十六进制中，一般使用字母 A 至 F 表示十至十五）。\n\n现在有 $N$ 个数，请你分别判断他们是否可能是二进制、八进制、十进制、十六进制。例如，`15A6F` 就只可能是十六进制，而 `1011` 则是四种进制皆有可能。\n\n## 输入格式\n\n输入的第一行为一个十进制表示的整数 $N$。接下来 $N$ 行，每行一个字符串，表示需要判断的数。保证所有字符串均由数字和大写字母组成，且不以 $0$ 开头。保证不会出现空行。\n\n保证 $1 \\le N \\le 1000$，保证所有字符串长度不超过 $10$。\n\n## 输出格式\n\n输出 $N$ 行，每行 $4$ 个数，用空格隔开，分别表示给定的字符串是否可能表示一个二进制数、八进制数、十进制数、十六进制数。使用 $1$ 表示可能，使用 $0$ 表示不可能。\n\n例如，对于只可能是十六进制数的 `15A6F`，就需要输出 `0 0 0 1`；而对于四者皆有可能的 `1011`，则需要输出 `1 1 1 1`。\n\n\n## 特别提醒\n请不要在输入、输出中附带任何提示信息。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}",
            score: 25,
            explanation: "**解析**\n\n只判断字符串各字符是否属于某进制允许的数码集合，不需要把整个数转换成int，长度10的字符串也不会引起数值转换溢出。二、八、十、十六进制集合依次是01、0..7、0..9、0..9及A..F；出现G至Z则四种都不合法。当前参考程序逐字符转换后更新4个标志，与原PDF按最大字符判断等价。输入按原卷要求不以0开头，旧库“可能以0开头”已恢复。总字符数为L时时间O(L)，单串存储O(最长串长)，每组独立重置标志。",
            tags: [
                "字符串",
                "进制转换"
            ],
            referenceCode: "\n#include <iostream>\n#include <string>\n#include <vector>\nusing namespace std;\n\nvoid solve() {\n    string s;\n    cin >> s;\n    bool b2 = true, b8 = true, b10 = true, b16 = true;\n    for (char c : s) {\n        int val;\n        if (c >= '0' && c <= '9') val = c-'0';\n        else if (c >= 'A' && c <= 'F') val = 10+(c-'A');\n        else val = 100; // 非法\n\n        if (val >= 2) b2 = false;\n        if (val >= 8) b8 = false;\n        if (val >= 10) b10 = false;\n        if (val >= 16) b16 = false;\n    }\n    cout << (b2 ? 1 : 0) << \" \" << (b8 ? 1 : 0) << \" \" << (b10 ? 1 : 0) << \" \" << (b16 ? 1 : 0) << endl;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    while (n--) {\n        solve();\n    }\n    return 0;\n}\n",
            answer: "",
            title: "进制判断",
            timeLimit: 1,
            memoryLimit: 128
        }
    ]
};
