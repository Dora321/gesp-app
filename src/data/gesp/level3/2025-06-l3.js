// 2025-06-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2025-06-l3",
    title: "2025年6月 GESP C++ 三级真题",
    level: 3,
    year: 2025,
    month: 6,
    session: 10,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1699464809021472.pdf",
        notes: "AI-Codex于2026-11-08逐页对照登记mirror PDF全部7页及p1单选、p4判断答案表。Q6/Q13/Q17来源疑点保持隔离，编程题数据范围按原卷渲染核对，参考程序独立GNU C++17编译运行。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B46%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-08",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部7页文本与渲染，Git blob SHA 8d0070052cc67428abbb5544040a5f814678ab6c一致。p1单选、p4判断答案表逐项一致，所有answer保持，Q6/Q13/Q17源疑点暂停计分。补两编程范围，重写27题主解析，两参考程序与模板GNU C++17独立编译运行，旧证据保留history。",
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
            question: "8 位二进制原码能表示的最小整数是（ ）。",
            options: [
                "-127",
                "-128",
                "-255",
                "-256"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n8位原码最高位是符号位，剩下7位表示绝对值，最大绝对值为2^7−1=127，所以最小整数为−127，对应A。位串11111111在原码下表示−127。−128是8位补码的最小值，不能用8位原码表示。原码存在正零和负零两种编码，256种位串只对应255个不同的整数值，判断范围时需把符号与数值部分分开。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "反码表示中，零的表示形式有（ ）。",
            options: [
                "1 种",
                "2 种",
                "8 种",
                "16 种"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n反码中正零为全部位0，负零为全部位1，因此零有两种编码，选B。以8位为例分别是00000000和11111111。负数反码可以由对应正数的完整位串逐位取反得到，其中符号位随正负改变。补码在负数反码基础上加1，负零回绕成全零，因而补码只有一个零编码。不能把原码、反码、补码的零表示混为同一个规则。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "补码 1011 1011 对应的真值是（ ）。",
            options: [
                "-69",
                "-59",
                "-68",
                "-58"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n位串共8位，10111011按无符号权值为128+32+16+8+2+1=187。8位补码最高位为1，真值可用187−256=−69求得，对应A。也可取反加1得到01000101，绝对值为69，再加负号。这里最高位的补码权重为−128，不能像原码一样删掉最高位后直接给余下数值加负号。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "若 X 的 8 位补码为 0000 1010，则 X / 2 的补码是（ ）。",
            options: [
                "0000 0101",
                "1000 0101",
                "0000 0101 或 1000 0101",
                "算术右移后结果取决于符号位"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n00001010的最高位为0，其真值为10。10除以2为5，8位补码为00000101，选A。对本题的非负偶数，算术右移1位也得到5，左端补0。10000101按8位补码解释是−123，无法表示正5。选项C包含两个不同数值，不能作为确定结果，D只说取决于符号位而忽略题目已经给定X为正数。",
            tags: [
                "二进制",
                "补码",
                "位运算"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "二进制数 1101.101 对应的十进制数是（ ）。",
            options: [
                "13.625",
                "12.75",
                "11.875",
                "14.5"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n二进制1101的整数部分为8+4+1=13，小数部分101的位权依次为1/2、1/4、1/8，因此为1/2+0+1/8=0.625，合计13.625，对应A。小数点右侧每向右移动一位，位权除以2，不能把101当作十进制小数101来读。该数的分母为8，能够用有限二进制小数精确表示。",
            tags: [
                "二进制",
                "补码",
                "进制转换"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "补码加法中，若符号位无进位而次高位有进位，则说明（ ）。",
            options: [
                "结果正确",
                "发生上溢",
                "发生下溢",
                "结果符号位错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n通常将次高位进位理解为进入符号位的进位，符号位进位理解为向位宽之外的进位。前者1、后者0表示两个正数相加越过正上限，B发生上溢成立。例如8位64+64的低8位为10000000，按补码读成−128，D结果符号位错误也同时成立。题目作为单选缺乏排除D的条件，保留官方B并隔离，旧解析仅以术语较具体排除D的依据不足。",
            tags: [
                "二进制",
                "补码"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p2的B发生上溢与D结果符号位错误同时成立。按常见进位含义，8位64+64得到位串10000000，真实和128超上限，结果符号由正变负。题面没有只选更具体术语的要求。保留官方B及原选项，暂停计分。"
        },
        {
            id: 7,
            type: "single",
            question: "八进制数 35.6 对应的十进制数是（ ）。",
            options: [
                "29.75",
                "28.5",
                "27.625",
                "30.25"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n八进制35.6按位权展开，3在8¹位贡献24，5在8⁰位贡献5，6在8^−1位贡献6/8=0.75，合计29.75，选A。八进制每一位数码只能是0到7，本题各位均合法。也可以将每个八进制数码写为3位二进制，得到011101.110，其整数29与小数0.75与按权展开结果一致。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "二进制数 1010 | 1100 的结果是（ ）。",
            options: [
                "1000",
                "1110",
                "1010",
                "1100"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n按位或只要同一位置的两个比特至少一个为1，结果该位就为1。将1010与1100对齐，四位从高到低得到1、1、1、0，因此为1110，选B。按位与则得到1000，按位异或得到0110。题目明确使用二进制位串运算，不能把文字中的1010和1100直接当作C++十进制整数字面量来计算。",
            tags: [
                "二进制",
                "补码",
                "位运算"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "以下哪个位运算可以交换两个变量的值（无需临时变量）（ ）。",
            options: [
                "a = a ^ b; b = a ^ b; a = a ^ b;",
                "a = a & b; b = a | b; a = a & b;",
                "a = a | b; b = a ^ b; a = a ^ b;",
                "a = ~a; b = ~b; a = ~a;"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\nA利用x^x=0和x^0=x完成交换。设最初为a0、b0，第一句a变为a0^b0，第二句b变为a0，第三句a变为b0。该推导要求a和b为适合位运算且彼此独立存储的变量，若两个引用指向同一对象，第一句会把它清零。B/C/D对一般输入都不能交换，运行见证包含正负整数与相同值的两个独立变量。",
            tags: [
                "位运算",
                "异或",
                "按位取反",
                "逻辑判断"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "如何正确定义一个长度为 5 的整型数组（ ）。",
            options: [
                "int array = new int[5];",
                "array int[5];",
                "int[] array = {1,2,3,4,5};",
                "int array[5];"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nC++内建数组的声明形式把长度放在变量名后，D的int array[5]定义了5个int元素，合法下标为0到4。A的new int[5]返回指针，不能直接初始化一个int变量。B把类型与变量的位置写反，C使用了其他语言式的int[]语法。若希望动态分配，可以将new的结果交给int*，但这与定义固定长度数组是另一种声明形式。",
            tags: [
                "数组"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "下面程序使用枚举法（穷举法）求解满足条件的三位数，横线处应该填入的是（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int count = 0;\n for (int i = 100; i <= 999; i++) {\n int a = i / 100;\n __________________\n int c = i % 10;\n if (a * a+b * b == c * c) {\n count++;\n }\n }\n cout << count << endl;\n return 0;\n}\n```",
            options: [
                "int b = (i / 10) / 10;",
                "int b = (i / 10) % 10;",
                "int b = (i % 10) / 10;",
                "int b = (i % 10) % 10;"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n要取三位数的十位，先整数除以10去掉个位，再对10取余去掉百位，故填B。举例345/10=34，34%10=4。A又除以10得到百位，C先取个位再除以10恒为0，D得到个位。把B代入原程序，枚举100到999并检查百位平方加十位平方等于个位平方，包含十位为0的合法情况，不能额外加三数位非零限制。",
            tags: [
                "枚举",
                "循环",
                "数学"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "下面程序模拟了一个简单的小球反弹过程，横线处应该填入的是（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n int height = 10;\n int distance = 0;\n for (int i = 1; i <= 5; i++) { // 模拟 5 次落地\n __________________\n height /= 2;\n distance += height;\n }\n cout << distance << endl;\n return 0;\n}\n```",
            options: [
                "distance += height / 2;",
                "distance += height;",
                "distance += height * 2;",
                "distance += height+1;"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nB使每一轮先把当前下降高度加到distance，再把height用整数除法减半，最后加上反弹高度。五轮高度依次为10、5、2、1、0，下降总和18，反弹总和8，因此原程序输出26。这里height是int，5/2为2、1/2为0，所以不能沿用理想连续物理模型的浮点高度推算输出。A/C/D分别改变了每轮累计距离，与给定模拟过程不符。",
            tags: [
                "循环",
                "数据类型"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "C++ 代码 `string s = \"GESP考试\";` 中，s 占据的字节数是（ ）。",
            options: [
                "10",
                "8",
                "8 或 10",
                "取决于计算机采用什么编码"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n若只问文本编码后的内容长度，常见UTF-8下GESP占4字节，两个汉字各3字节，总10字节，GBK下常见为8字节，官方D对应这一解释。但原文问s占据的字节数，string对象本身的sizeof与字符串内容size()含义不同。本机同一UTF-8文本size为10而sizeof为32，对象实现还可能采用短串优化。保留原文和官方D并隔离，计量对象需来源明确。",
            tags: [
                "字符与ASCII",
                "字符串",
                "计算机基础"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p3问s占据字节数，未区分字符序列长度、sizeof(string)对象大小与总存储分配。D只对应字符内容编码长度语境，sizeof(s)取决于标准库实现，本机UTF-8下s.size()为10而sizeof(s)为32。保留官方D与原文，暂停计分，待计量对象澄清。"
        },
        {
            id: 14,
            type: "single",
            question: "C++ 语句 `string s = \"Gesp Test\";` 执行 `s.rfind(\"e\")` 以后，输出的是（ ）。",
            options: [
                "1",
                "2",
                "6",
                "3"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nGesp Test从0开始编号，两个小写e分别位于1和6。rfind从右侧查找最后一次匹配位置，因此返回6，选C。空格占据下标4，不能在计数时忽略。该函数返回下标值，本身不会向输出流写任何字符，题目“输出”按展示该返回值理解。未找到匹配串时返回string::npos，需要与合法下标区分。",
            tags: [
                "字符与ASCII",
                "字符串"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "字符串 \"Gesp考试\" 的字符数是（ ）。",
            options: [
                "10",
                "8",
                "6",
                "字符数多少取决于编码"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n按文本中可见字符计数，G、e、s、p以及考、试一共6个字符，所以选C。这里讨论文字的字符个数，std::string::size()在UTF-8下统计的是char单元，常得到10，不能把两者写为同一个量。英文字母大小写不同也各占一个字符。对于本题这两个普通汉字与四个拉丁字母，字符计数可直接逐个列举完成。",
            tags: [
                "字符与ASCII",
                "字符串",
                "计算机基础"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "C++ 中 string 的 == 运算符比较的是字符串的内存地址，而非内容。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nstd::string重载的==比较字符序列内容，两个独立构造但文字相同的字符串会相等，所以“比较内存地址而非内容”的说法错误。与C字符串指针直接比较时的地址语义需要区分。例如string a=\"hello\", b=\"hello\"，a==b为真，而&a和&b是两个对象的地址。长度不同或任一位置字符不同才使内容比较不相等。",
            tags: [
                "字符串",
                "计算机基础"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "string 的 substr(1, 3) 返回从下标 1 开始的 3 个字符的子串。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nsubstr(pos,count)的实际长度为count与size()−pos两者的较小值，且pos不能大于size()。因此substr(1,3)只有在剩余字符至少3个时才返回3字符，\"ab\"只得到\"b\"，空串则因pos为1大于0抛out_of_range。原卷未限定原串长度，官方√不适用于全部字符串。保留原判断答案并隔离，旧解析把起点越界也说成不会报错需要纠正。",
            tags: [
                "字符串",
                "substr"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p4无字符串长度前提却断言substr(1,3)返回3个字符。string(\"ab\").substr(1,3)只返回b，长度1，空串调用起点1则抛out_of_range。官方√需补剩余长度至少3的前提。保留answer=0和原文，暂停计分。"
        },
        {
            id: 18,
            type: "judge",
            question: "x 是浮点数，(x >> 1) 等价于 x / 2。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n内建移位运算要求整数或无作用域枚举类型，浮点变量x不能直接作x>>1，因此原说法错误，C++17实际编译会失败。浮点数除以2可以使用x/2，产生浮点结果。即使把x先显式转换为整数，也会先丢掉小数部分，所得行为与原浮点除法不同。不能因为移位常用于非负整数除2，就把该规则推广到浮点类型。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "string(\"hello\") == \"hello\" 的比较结果为 true。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n左边string(\"hello\")构造字符串对象，==会选择字符串内容比较的重载，并与右侧字符数组所表示的hello逐字符比较，因此结果为true。这里右侧字符串字面量可参与标准库重载，不是将两个字符指针直接作地址比较。将其中一个字符改为大写H则比较为false，因为std::string的这种相等比较区分字符的大小写。",
            tags: [
                "字符串"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "sort 可以直接用于排序 set 中的元素。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nstd::sort需要随机访问迭代器，并且要能够交换、移动被排序的元素。set提供有序、只读键的双向迭代器，无法用sort(set.begin(),set.end())直接重排其元素，因此判断错误。set已经按自身比较器维护顺序，若需要独立排序序列可先把元素复制到vector。复制后排序操作的是新序列，原set仍按其比较器组织。",
            tags: [
                "排序"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "(x & 1) == 0 可以判断整数 x 是否为偶数。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在题目通常采用的二进制补码整数环境中，最低位为0对应偶数，最低位为1对应奇数，故(x&1)==0可判断偶数，判断正确，负数在该环境中同样适用。零的最低位为0，也是偶数。按位与的操作数会进行整型提升，结果再与0比较。运行见证对正负值与int极值核对，但不把机器的补码表示结论推广到任意历史有符号编码。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "string 的 substr(2, 10) 在字符串长度不足时会抛出异常。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nsubstr(2,10)并非只因剩余不足10个字符就抛异常，若起点2不超过size()，长度自动截短。例如\"abc\"得到\"c\"，\"ab\"得到空串。只有原串长度小于2，起点已经越界时才抛out_of_range，所以原题笼统说长度不足就抛异常应判错。参数2是起始下标，参数10是所请求的最大长度，两个边界必须分别检查。",
            tags: [
                "字符串",
                "substr"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "在数学纸面计算中，pow(2, 3) 的计算结果一定是 8，但是在 C++ 中，如果遇到数据类型是浮点数，那就不一定正确。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n原判断意在提醒数学精确运算与浮点库计算的精度保证不同。2、3、8在常见二进制浮点中都能精确表示，本机实际pow(2.0,3.0)返回8，不能为这次调用编造7.999999999999999的运行结果。通用pow的误差还受库实现与数学函数准确度约定影响，不能从结果类型为double就推断具体调用必然出错。需要精确整数幂时可在范围内用整数乘法并检查溢出。",
            tags: [
                "浮点数"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "在 C++ 中，枚举的底层类型可以是非整型（如 float 或 double）。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n枚举声明的底层类型必须是整型，enum E : float或enum E : double都不符合C++17声明规则，判断错误。可显式指定int、unsigned char等整型作为底层类型，枚举值还需处于该类型可表示范围。这里“枚举”指enum类型声明，与用循环穷举所有候选的算法方法不同，解析不能把两种含义混在一起解释。",
            tags: [
                "枚举",
                "算法思维"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "函数声明 `double f();` 返回 int 时，会自动转换为 double。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n函数声明double f()确定返回类型为double，在函数体return一个int表达式时，返回值会转换为double，所以判断正确。例如return 42得到42.0。转换发生在返回语句建立返回值时，函数的声明类型仍然是double。对非常大的整型数，double的有效位数可能不足而发生舍入，自动类型转换也不代表所有整数都能被精确保留。",
            tags: [
                "类型转换"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "4\n71 69 83 80",
                    output: "13 1"
                },
                {
                    input: "6\n1 2 4 8 16 32",
                    output: "6 0"
                }
            ],
            question: "\n# [GESP202506 三级] 奇偶校验\n\n## 题目描述\n\n数据在传输过程中可能出错，因此接收方收到数据后通常会校验传输的数据是否正确，奇偶校验是经典的校验方式之一。\n\n给定 $n$ 个非负整数 $c_1, c_2, \\ldots, c_n$ 代表所传输的数据，它们的校验码取决于这些整数在二进制下 1 的数量之和的奇偶性。如果这些整数在二进制下共有奇数个 1，那么校验码为 1；否则校验码为 0。你能求出这些整数的校验码吗？\n\n## 输入格式\n\n第一行，一个正整数 $n$，表示所传输的数据量。\n\n第二行，$n$ 个非负整数 $c_1, c_2, \\ldots, c_n$，表示所传输的数据。\n\n## 输出格式\n\n输出一行，两个整数，以一个空格分隔：\n\n第一个整数表示 $c_1, c_2, \\ldots, c_n$ 在二进制下 1 的总数量；\n\n第二个整数表示校验码（0 或 1）。\n\n\n## 数据范围\n\n对于所有测试点，保证1 ≤ n ≤ 100，0 ≤ c_i ≤ 255。",
            explanation: "**解析**\n\n每个c_i在0到255之间，逐次读取最低位并右移，可累计其二进制1的个数。把各数的个数加总为v，再输出v与v&1。全局v初始化为0，c_i=0时循环不进入，贡献0。最多100个数，每个最多8个1，总量上界800，int足够。时间O(n×8)，额外空间O(1)。样例71、69、83、80分别有4、3、4、2个1，总13为奇数，校验码1。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "位运算",
                "统计"
            ],
            referenceCode: "#include <cstdio>\nusing namespace std;\n\nint n, v;\n\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= n; i++) {\n        int c;\n        scanf(\"%d\", &c);\n        while (c) {\n            v += c & 1;\n            c >>= 1;\n        }\n    }\n    printf(\"%d %d\\n\", v, v & 1);\n    return 0;\n}",
            answer: "",
            title: "奇偶校验",
            timeLimit: 1,
            memoryLimit: 512
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "4\n1 4 3 3",
                    output: "16"
                },
                {
                    input: "15\n314 15926 53589793 238462643 383279502 8 8 4 1 9 7 1 6 9 3",
                    output: "4508143253"
                }
            ],
            question: "\n# [GESP202506 三级] 分糖果\n\n## 题目描述\n\n有 $n$ 位小朋友排成一队等待老师分糖果。第 $i$ 位小朋友想要至少 $a_i$ 颗糖果，并且分给他的糖果数量必须比分给前一位小朋友的糖果数量更多，不然他就会不开心。\n\n老师想知道至少需要准备多少颗糖果才能让所有小朋友都开心。你能帮帮老师吗？\n\n## 输入格式\n\n第一行，一个正整数 $n$，表示小朋友的人数。\n\n第二行，$n$ 个正整数 $a_1, a_2, \\ldots, a_n$，依次表示每位小朋友至少需要的糖果数量。\n\n## 输出格式\n\n输出一行，一个整数，表示最少需要准备的糖果数量。\n\n\n## 数据范围\n\n对于所有测试点，保证1 ≤ n ≤ 1000，1 ≤ a_i ≤ 10^9。",
            explanation: "**解析**\n\n依次令第i人得到b_i=max(a_i,b_(i−1)+1)，首项可设b_0=0。任何可行解都必须至少满足需求下界与严格递增下界，逐项取其中较大者就是每个位置的最小可行值，累加后最优。样例1 4 3 3得到1 4 5 6，总16。n≤1000、a_i≤10^9使单项不超过1000000999，int可存，累加最多约10^12需long long。时间O(n)，参考数组占O(n)空间。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "贪心",
                "数组"
            ],
            referenceCode: "#include <cstdio>\n#include <algorithm>\nusing namespace std;\n\nconst int N = 1005;\nint n, a[N];\nlong long ans;\n\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= n; i++) {\n        scanf(\"%d\", &a[i]);\n        a[i] = max(a[i-1]+1, a[i]);\n        ans += a[i];\n    }\n    printf(\"%lld\\n\", ans);\n    return 0;\n}",
            answer: "",
            title: "分糖果",
            timeLimit: 1,
            memoryLimit: 512
        }
    ]
};
