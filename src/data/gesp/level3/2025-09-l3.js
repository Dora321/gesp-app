// 2025-09-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2025-09-l3",
    title: "2025年9月 GESP C++ 三级真题",
    level: 3,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1703975921385504.pdf",
        notes: "AI-Codex于2026-11-08逐页对照登记mirror PDF全部8页，p1单选和p4判断答案表逐项核对。Q3/Q10/Q11/Q15/Q16/Q17/Q26保持来源疑点隔离，编程范围及日历格式按渲染核对，参考程序独立GNU C++17运行。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2025%E5%B9%B49%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-08",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部8页文本和渲染，Git blob SHA 15655ec2e85e52347b143600e8784252fad68a76一致。p1/p4答案表逐项核对。Q3/Q10/Q11/Q15/Q16/Q17/Q26源疑点隔离，保留全部answer。补编程范围、日历精确示例，重写27解析，两参考与模板GNU C++17独立编译运行，旧证据留history。",
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
            question: "执行以下 C++ 代码后，c 的数值是（ ）。\n```cpp\nint a = 10, b = 3;\ndouble c = a / b;\n```",
            options: [
                "3.33333",
                "3.333",
                "3.0",
                "3.3"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\na和b均为int，a/b先作整数除法，10/3向零截断得到3，再转换为double存入c，所以c的数值为3.0，选C。左侧变量是double不会倒过来改变右侧整数除法的类型。如果要保留小数，需在除法之前转换至少一个操作数。题目问数值，cout默认格式可能显示3，这与double保存数值3.0并不矛盾。",
            tags: [
                "类型转换"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下列 C++ 表达式的结果为 true 的是（ ）。",
            options: [
                "(5 <= 5) && (7 < 5)",
                "!(10 > 5)",
                "(10 != 10) || (5 >= 3)",
                "(5 == 3) && (4 > 2)"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nA左侧真右侧假，逻辑与结果假。B对10>5的真值取反，结果假。C左侧10!=10为假，但右侧5>=3为真，逻辑或结果真，因此选C。D第一项5==3为假，逻辑与短路后结果假。逻辑与和逻辑或得到bool值，默认流格式输出时常显示0或1，不能把显示形式与true/false的逻辑含义混淆。",
            tags: [
                "位运算",
                "逻辑判断"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "以下关于 C++ 数组的说法，错误的是（ ）。",
            options: [
                "数组的下标通常从 0 开始。",
                "int arr[5]; 声明了一个包含 5 个整数的数组。",
                "数组的大小必须在编译时确定，不能使用变量定义大小。",
                "可以通过 arr[5] 来访问 int arr[5]; 数组的最后一个元素。"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n长度5的内建数组合法元素下标0到4，D的arr[5]不能访问最后元素。与此同时C没有区分固定内建数组与动态数组，new int[n]的第一维可以是运行时表达式，const int n=5这样的常量表达式变量也可以作固定界限。官方D在限定语境下是预期错误项，但原文对数组范围未说明，保留原答案并隔离，不能以某个GNU扩展运行结果取代标准语义。",
            tags: [
                "位运算",
                "按位取反",
                "数组"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p1未限定内建固定数组，C一概说数组大小必须编译时确定且不能用变量，new int[n]允许运行时长度，常量表达式变量也可作固定数组界限。D越界错误明确，但C缺范围前提，保留官方D及原选项并隔离。"
        },
        {
            id: 4,
            type: "single",
            question: "执行以下 C++ 代码后，变量 sum 的值是（ ）。\n```cpp\nint sum = 0;\nfor (int i = 1; i <= 5; i += 2) {\n sum += i;\n int sum = 0;\n}\n```",
            options: [
                "6",
                "9",
                "15",
                "死循环"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n外层sum从0开始，i依次为1、3、5，每轮sum+=i位于内层sum声明之前，使用外层变量，累计1+3+5=9，对应B。后面的int sum=0从该声明处开始隐藏外层变量，离开循环体后内层变量结束，不能回溯改变前面语句的名字绑定。i每轮增加2并在变为7后退出，循环不会无限执行。",
            tags: [
                "循环"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "要正确定义一个返回两个整数中较大值的函数 max，应该使用（ ）。",
            options: [
                "void max(int a, int b) { return a > b ? a : b; }",
                "int max(int a, int b) { if (a > b) return a; else return b; }",
                "int max(a, b) { if (a > b) return a; else return b; }",
                "void max(a, b) { cout << (a > b ? a : b); }"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nB同时声明两个int形参和int返回类型，两个分支都返回较大值，符合要求。A把函数声明为void却返回一个int值，不合法。C没有声明形参类型，D既缺形参类型又只有输出行为，均不能作为该函数定义。函数名max在此处是题目给定名称，实际编译时可在单独作用域定义以避免与标准库同名重载混淆。",
            tags: [
                "位运算",
                "函数",
                "逻辑判断"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "执行以下 C++ 代码后，数组 arr 的内容是（ ）。\n```cpp\nint arr[4] = {1, 2, 3};\narr[3] = arr[0]+arr[2];\n```",
            options: [
                "{1, 2, 3, 3}",
                "{1, 2, 3, 4}",
                "{1, 2, 3, 5}",
                "{1, 2, 3, 6}"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n数组长度为4，给出的三个初始化值依次存入下标0、1、2，余下元素自动初始化为0。执行arr[3]=arr[0]+arr[2]后，下标3被写入1+3=4，所以四项为1、2、3、4，选B。这里下标3合法，既不是把最后给出的3复制过去，也不是将数组全部元素求和。未明确列出的元素初始化规则不同于完全未初始化的局部数组。",
            tags: [
                "数组"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "以下关于 C++ 函数的描述，正确的是（ ）。",
            options: [
                "函数必须要有参数。",
                "函数通过 return 语句只能返回一个值，但是可以通过其他方式间接返回多个值。",
                "main 函数可以被其他函数调用。",
                "函数的定义可以直接嵌套，即一个函数内部可以真正定义另一个函数。"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nB符合通常函数接口，一个返回表达式可产生一个结果对象，还能通过引用参数、指针指向对象或返回复合对象提供多个逻辑结果。函数可以没有参数，main在C++中不能由程序直接调用，普通命名函数定义也不能直接嵌套在另一函数体内。lambda可写在函数内部，但它定义闭包对象，与D描述的普通函数嵌套定义不同。",
            tags: [
                "函数"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "以下 C++ 代码 count++ 执行的次数是（ ）。\n```cpp\nint i = 10;\nint count = 0;\nwhile (i > 0) {\n i -= 3;\n continue;\n count++;\n}\n```",
            options: [
                "2",
                "3",
                "4",
                "0"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n每次进入循环先让i减3，然后continue直接转到下一次条件检查，后面的count++一直不可达，因此执行0次，对应D。i依次从10变7、4、1、−2，共进入循环体4次，最后因i>0为假退出。循环次数4与自增执行次数0是两个不同的计数，不能仅按10除以3的估计结果选择。",
            tags: [
                "循环"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "以下 C++ 代码段的输出是（ ）。\n```cpp\nfor (int i = 0; i < 4; i++) {\n for (int j = 0; j <= i; j++) {\n cout << j;\n }\n cout << \"#\";\n}\n```",
            options: [
                "0#01#012#0123#",
                "1#12#123#1234#",
                "0#1#2#3#",
                "0#01#012#01243#"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n外层i依次为0到3，内层j从0到i包含端点，分别输出0、01、012、0123。每组后都追加一个#，不输出空格或换行，最终为0#01#012#0123#，对应A。j在每一轮外层循环重新初始化为0，不能把上一轮结束时的值带入下一轮，也不能把最后一组误写为含额外4的串。",
            tags: [
                "位运算",
                "循环"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "以下关于 C++ 变量作用域的说法，错误的是（ ）。",
            options: [
                "在 for 循环语句中声明的变量，其作用域仅限于该循环体内。",
                "在函数内部声明的变量（局部变量），仅在函数内部有效。",
                "在所有函数外部声明的变量，在整个程序中都有效。",
                "不同函数中的局部变量可以同名，它们代表不同的内存单元。"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n官方选择C，全局变量的名字可见性仍受声明位置、隐藏与翻译单元等约束，不能说所有程序位置都有效。A也不准确，for(int i=0;i<3;i++)中的i同时出现在初始化后的条件、迭代表达式和循环体内，作用域延续到整个for语句结束。题面没有把循环体作为整条for语句的特殊约定，单选存在多项不准确，保留答案并隔离。",
            tags: [
                "计算机基础"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p3官方C，但A把for初始化变量作用域说成仅循环体，实际还包括条件和迭代表达式，A/C均不准确。C还遗漏声明可见顺序、隐藏和跨翻译单元链接。保留官方C并隔离，等待考查口径澄清。"
        },
        {
            id: 11,
            type: "single",
            question: "关于以下代码的说法正确的是（ ）。\n```cpp\nint reversed = 0;\nwhile (x != 0) {\n int digit = x % 10;\n x /= 10;\n reversed = reversed * 10+digit;\n}\n```",
            options: [
                "能够反转任何位数的整数",
                "能够反转的最大位数正整数是 2147483647",
                "能够反转的最大位数正整数是 2147483648",
                "能够反转的最大位数正整数是 1463847412"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n每次取个位并把reversed乘10累加，最终反转数值必须处于int范围内才安全。D列出1463847412虽能反转为2147483641，但它不是最大的可反转输入，例如2000000002反转后仍为自身，2147483641反转为1463847412，均合法且更大。2147483647的反转超32位int上限，原程序会有有符号溢出。保留官方D并隔离，未执行溢出的原程序取偶然值。",
            tags: [
                "循环"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p3称D的1463847412为最大可反转正整数，但32位int的2000000002可安全反转为自身，2147483641可安全反转为1463847412，均更大。原文也未给x类型/位宽，保留官方D和原代码，暂停计分。"
        },
        {
            id: 12,
            type: "single",
            question: "以下 C++ 代码试图查找数组中的最大值，划线处应填入（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint findMax(int arr[], int size) {\n int maxVal = ________; // 划线处\n for (int i = 1; i < size; i++) {\n if (arr[i] > maxVal) {\n maxVal = arr[i];\n }\n }\n return maxVal;\n}\n```",
            options: [
                "0",
                "arr[-1]",
                "arr[0]",
                "size"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n在size至少为1且数组有效的前提下，C用arr[0]初始化最大值，再从下标1扫描，保证全为负数时也能得到正确最大值。A用0会把全负数的结果误报为0，B的arr[−1]越界，D的size不是元素值。调用函数求数组最大值隐含非空前提，空数组应在调用前另行处理，不能解引用arr[0]。",
            tags: [
                "数组",
                "循环"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "以下关于 C++ 函数的说法，正确的是（ ）。",
            options: [
                "函数参数传递只有值传递一种方式。",
                "函数的形参在函数调用结束后依然占用内存空间。",
                "没有返回值的函数必须声明为 void 类型，且不能包含 return 语句。",
                "C++11 及之后标准要求函数必须显式声明返回类型，不允许默认返回 int。"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nD所述没有默认返回int的规则符合C++，普通函数需声明返回类型，也可在相应标准中使用auto推导形式。A忽略引用传参，B把形参生命周期说成调用后仍持续，C忽略void函数可用return;提前结束。函数返回时局部对象生命周期结束不等于要求编译器将曾使用的内存字节立即清零，不能以残留字节推断变量仍存在。",
            tags: [
                "函数",
                "计算机基础"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "以下 C++ 代码中存在几处错误（ ）。\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n const int SIZE = 5;\n int arr[SIZE];\n for (int i = 0; i <= SIZE; i++) {\n arr[i] = i * 2;\n }\n cout << arr[SIZE] << endl;\n return 0;\n}\n```",
            options: [
                "0 处",
                "1 处",
                "2 处",
                "3 处"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n数组长度SIZE=5，合法下标为0到4。循环i<=SIZE在i等于5时写arr[5]越界，之后cout再次读取arr[SIZE]也越界，按题目两个出错代码位置计为2处，选C。修正时循环应改i<SIZE，最后元素应读arr[SIZE−1]。原程序没有语法编译错误，但运行语义出现未定义行为，不能通过一次运行输出判断越界有效。",
            tags: [
                "位运算",
                "循环"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "以下关于 C++ 中 string 类和字符数组（char[]）的说法，错误的是（ ）。",
            options: [
                "string 对象可以使用 = 进行赋值，而字符数组需要使用 strcpy。",
                "string 对象的长度可以使用 length() 成员函数获取，而字符数组需要使用 strlen() 函数。",
                "string 对象在内存中是动态分配空间的，因此可以自动处理字符串长度的变化。",
                "string 对象和字符数组都可以使用 == 运算符来直接比较两个字符串的内容是否相同。"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nD把字符数组的==当作内容比较，实际上数组通常退化为指针后比较地址，string的重载才比较字符序列。C也把对象与数据的存储机制说得过于绝对，局部string对象可在自动存储区，短字符串内容也可直接放在对象内部。strcpy和strlen是字符数组的常用处理函数，但手工循环同样可复制和计数。官方D对应教学重点，原单选范围需澄清，保留原文并隔离。",
            tags: [
                "字符与ASCII",
                "字符串",
                "字符数组",
                "数组",
                "计算机基础"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p4给D，但C将string对象及内容存储一概说成动态分配，标准不要求每个字符串都在堆上分配，常见短串优化直接保存于对象内部。A/B的需要也未区分常用方法与唯一方法。保留官方D及全部原文，暂停计分。"
        },
        {
            id: 16,
            type: "judge",
            question: "表达式 sizeof('a') 的结果总是 1，因为 'a' 是一个字符。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nC++的普通单字符字面量'a'类型就是char，sizeof(char)由定义恒为1，所以原命题在C++中成立。原卷答案表却判×，因此保留官方答案并暂停计分。C语言中普通字符常量通常具有int类型，这条跨语言差异不能用来解释C++题目为错。实际static_assert确认decltype('a')为char并且sizeof('a')==1。",
            tags: [
                "数组",
                "sizeof"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p4明确C++但判sizeof('a')总为1的命题为×。C++普通单字符字面量'a'类型为char，sizeof(char)按定义为1，本机static_assert与运行均确认。旧证据也已识别此问题但未隔离，本轮保留官方×并补official-source-defect，不能套用C语言字符常量规则。"
        },
        {
            id: 17,
            type: "judge",
            question: "在 C++ 中，所有全局变量如果没有显式初始化，都会被自动初始化为 0。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n具有静态存储期的基本标量在未显式初始化时会零初始化，全局int、double等均可据此读到零值。但原文覆盖所有全局变量，类对象还可以默认构造，构造函数可把成员设为非零，例如S(){value=7;}。将前一阶段零初始化与完成全部初始化后的对象状态混同会使结论过宽，保留官方√并隔离，等待类型或阶段前提澄清。",
            tags: [
                "变量初始化"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p4称所有无显式初始化全局变量都会自动初始化为0。静态标量的零初始化成立，但类对象还可执行默认构造，例如全局S s且S构造把成员设7，最终成员非0。保留官方√，暂停计分，待限定基本数值类型或初始化阶段。"
        },
        {
            id: 18,
            type: "judge",
            question: "do { ... } while (false); 循环体内的语句至少会被执行一次。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\ndo语句先进入循环体，再检查while条件，所以while(false)这种结构会进入循环体一次，判断正确。它常用于将若干语句包装为整体，控制流随后因false结束。循环体内部若有return、break、continue或分支，具体某条语句仍可能不被执行，题目按do循环先执行循环体再检查条件的通常含义理解。",
            tags: [
                "循环"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "在 C++ 中，++i 是一个左值表达式，而 i++ 是一个右值表达式。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n对内建整数变量i，前置++i修改i并返回该对象的左值，后置i++先提供自增前的值，其结果为纯右值，然后完成自增，所以题目判断正确。可以用decltype((++i))得到int&，decltype((i++))得到int来检查值类别。该说明针对内建运算，用户自定义类型可以重载自增运算符，不能强迫所有重载返回相同类别。",
            tags: [
                "运算符"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "对于 enum Color { RED, GREEN, BLUE };，RED 的类型是 int。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n枚举定义结束后RED是枚举类型Color的枚举值，其类型为Color。无作用域枚举可隐式转换为相应整型，并不意味着RED自身就是int，因此原断言错误。即使某个实现选int作底层类型，枚举类型与底层整型仍是不同类型，is_same<decltype(RED),Color>可实际编译确认。底层类型决定存储和可表示范围。",
            tags: [
                "枚举",
                "算法思维"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "宏定义 #define SQUARE(x) x * x 是一个安全的宏定义，SQUARE(2+3) 会正确计算出 25。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n宏按文本替换展开，SQUARE(2+3)变为2+3*2+3，乘法先算得到2+6+3=11，所以原命题错误。给参数和整个表达式加括号可修复这一优先级问题，但宏还可能重复求值参数，带自增等副作用时仍需谨慎。原宏照录保留，不能把加括号的改写版结果25当作原代码输出。",
            tags: [
                "编程基础"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "在 C++ 中，char 类型的取值范围总是 -128 到 127。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nplain char的有无符号属性由实现决定，8位字节环境下常见范围可能为−128到127，也可能为0到255，标准也没有规定所有字节一定8位，所以“总是”不成立。signed char与unsigned char有各自不同的类型身份。实际用编译选项切换plain char有无符号，可以让同一源码报告不同范围，题目判断错误。",
            tags: [
                "数据类型"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "表达式 a > b ? a : b = 10; 一定是合法的 C++ 代码。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n该式按条件运算符第三操作数的语法可解析为a>b ? a : (b=10)，对于可修改的int a、b是合法表达式，a>b为假时会修改b。若b是const或不满足赋值要求，便不合法，所以没有类型前提时不能说一定合法，原判错可以成立。旧解析若仅把条件运算符与赋值优先级当作必然语法错误，需要纠正。",
            tags: [
                "运算符"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "#include \"file.h\" 和 #include <file.h> 在编译器查找头文件时的搜索策略是完全相同的。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n双引号与尖括号include的头文件搜索规则由实现规定，通常引号形式先查当前源文件相关目录，再采用相应搜索路径，尖括号形式使用配置的头文件目录。因此不能保证搜索策略完全相同，原断言错误。不同编译选项还可改变目录列表，具体查找结果应以实现的预处理规则为准，不能声称两种形式在所有平台只相差固定一个目录。",
            tags: [
                "计算机基础"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "在同一个作用域内，extern 声明的变量可以多次定义。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\nextern通常引入声明，同一实体可以有多个相容声明，但定义仍受单一定义规则约束。extern int x;可重复声明，带初始化的extern int x=1;却是定义，不能在同一翻译单元重复定义同一变量。原文把声明与定义混用，判断错误。是否最终分配存储要结合声明形式及完整程序，不能仅看到extern关键字就断言它一定不定义对象。",
            tags: [
                "变量与标识符"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "3\n2 3 4",
                    output: "7"
                },
                {
                    input: "5\n1 3 2 2 5",
                    output: "13"
                }
            ],
            question: "\n# [GESP202509 三级] 数组清零\n\n## 题目描述\n\n小 A 有一个由 $n$ 个非负整数构成的数组 $a = [a_1, a_2, \\ldots, a_n]$。他会对数组 $a$ 重复进行以下操作，直到数组 $a$ 只包含 0。在一次操作中，小 A 会依次完成以下三个步骤：\n\n1. 在数组 $a$ 中找到最大的整数，记其下标为 $k$。如果有多个最大值，那么选择其中下标最大的。\n2. 从数组 $a$ 所有不为零的整数中找到最小的整数 $a_j$。\n3. 将第一步找出的 $a_k$ 减去 $a_j$。\n\n例如，数组 $a = [2, 3, 4]$ 需要 7 次操作变成 $[0, 0, 0]$：\n\n$\n[2, 3, 4] \\rightarrow [2, 3, 2] \\rightarrow [2, 1, 2] \\rightarrow [2, 1, 1] \\rightarrow [1, 1, 1] \\rightarrow [1, 1, 0] \\rightarrow [1, 0, 0] \\rightarrow [0, 0, 0]\n$\n\n小 A 想知道，对于给定的数组 $a$，需要多少次操作才能使得 $a$ 中的整数全部变成 0。可以证明，$a$ 中整数必然可以在有限次操作后全部变成 0。你能帮他计算出答案吗？\n\n## 输入格式\n\n第一行，一个正整数 $n$，表示数组 $a$ 的长度。\n\n第二行，$n$ 个非负整数 $a_1, a_2, \\ldots, a_n$，表示数组 $a$ 中的整数。\n\n## 输出格式\n\n一行，一个正整数，表示 $a$ 中整数全部变成 0 所需要的操作次数。\n\n\n## 数据范围\n\n对于所有测试点，保证1 ≤ n ≤ 100，0 ≤ a_i ≤ 100。",
            explanation: "**原卷疑点，暂停计分**\n\n直接模拟每次取最右最大值和正数最小值，再做一次相减即可。每次至少减少数组元素和1，初始和最多100×100=10000，所以最多10000轮，每轮两次O(n)扫描，总时间O(n×sum a_i)，额外数组O(n)。相等最大值用>=更新保证最后下标优先。全零数组需要0步，与原输出格式称正整数矛盾，因此保留原题并隔离，参考按数据范围覆盖全零。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "模拟",
                "数组"
            ],
            referenceCode: "#include <algorithm>\n#include <cstdio>\nusing namespace std;\nconst int N = 105;\nint n;\nint a[N];\nint cnt;\nint main() {\n    scanf(\"%d\", &n);\n    for (int i = 1; i <= n; i++) scanf(\"%d\", &a[i]);\n    while (1) {\n        int mx = n;\n        for (int i = 1; i <= n; i++)\n            if (a[i] >= a[mx]) mx = i;\n        if (a[mx] == 0) break;\n        int mn = a[mx];\n        for (int i = 1; i <= n; i++)\n            if (a[i] > 0) mn = min(mn, a[i]);\n        a[mx] -= mn;\n        cnt++;\n    }\n    printf(\"%d\\n\", cnt);\n    return 0;\n}",
            answer: "",
            title: "数组清零",
            timeLimit: 1,
            memoryLimit: 512,
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT。原卷p5要求输出正整数，p6范围却允许初始数组全0，此时正确操作次数为0。保留原正整数措辞、范围、参考程序和answer字段，暂停计分，待输出措辞澄清。"
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "9",
                    output: "MON TUE WED THU FRI SAT SUN\n  1   2   3   4   5   6   7\n  8   9  10  11  12  13  14\n 15  16  17  18  19  20  21\n 22  23  24  25  26  27  28\n 29  30"
                },
                {
                    input: "6",
                    output: "MON TUE WED THU FRI SAT SUN\n                          1\n  2   3   4   5   6   7   8\n  9  10  11  12  13  14  15\n 16  17  18  19  20  21  22\n 23  24  25  26  27  28  29\n 30"
                }
            ],
            question: "\n# [GESP202509 三级] 日历制作\n\n## 题目描述\n\n小 A 想制作 $2025$ 年每个月的日历。他希望你能编写一个程序，按照格式输出给定月份的日历。\n\n具体来说，第一行需要输出 MON TUE WED THU FRI SAT SUN，分别表示星期一到星期日。接下来若干行中依次输出这个月所包含的日期，日期的个位需要和对应星期几的缩写最后一个字母对齐。例如，$2025$ 年 $9$ 月 $1$ 日是星期一，在输出九月的日历时，$1$ 号的个位 $1$ 就需要与星期一 MON 的最后一个字母 N 对齐。九月的日历输出效果如下:\n\n```\nMON TUE WED THU FRI SAT SUN\n  1   2   3   4   5   6   7\n  8   9  10  11  12  13  14\n 15  16  17  18  19  20  21\n 22  23  24  25  26  27  28\n 29  30\n```\n\n你能帮助小 A 完成日历的制作吗?\n\n## 输入格式\n\n一行，一个正整数 $m$，表示需要按照格式输出 $2025$ 年 $m$ 月的日历。\n\n## 输出格式\n\n输出包含若干行，表示 $2025$ 年 $m$ 月的日历。\n\n\n## 数据范围\n\n对于所有测试点，保证1 ≤ m ≤ 12。",
            explanation: "**解析**\n\n2025年是平年，先确定月份天数与第一天星期，再按星期一到星期日排日期。每个日期右对齐宽度3，相邻日期之间再加1空格，使个位处于3、7、11等固定列。第一周空缺的每个星期输出4空格，周日或月末换行。参考从已知9月1日星期一前推后推，独立测试用UTC日期接口覆盖全部12个月并逐字符比较，题面示例已恢复与样例相同的空格。",
            template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}",
            score: 25,
            tags: [
                "编程题",
                "模拟",
                "日期",
                "格式化输出"
            ],
            referenceCode: "#include <algorithm>\n#include <cstdio>\nusing namespace std;\nint days[20] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};\nint main() {\n    int m;\n    scanf(\"%d\", &m);\n    printf(\"MON TUE WED THU FRI SAT SUN\\n\");\n    int d = days[m];\n    int w = 1;\n    if (m > 9) {\n        for (int i = 9; i < m; i++) w = (w+days[i]-1) % 7+1;\n    } else if (m < 9) {\n        for (int i = 8; i >= m; i--) w = ((w-days[i]) % 7+7) % 7;\n        if (w == 0) w = 7;\n    }\n    for (int i = 1; i < w; i++) printf(\"    \");\n    for (int i = 1; i <= d; i++) {\n        printf(\"% 3d\", i);\n        w = w % 7+1;\n        if (w == 1 || i == d)\n            printf(\"\\n\");\n        else\n            printf(\" \");\n    }\n    return 0;\n}",
            answer: "",
            title: "日历制作",
            timeLimit: 1,
            memoryLimit: 512
        }
    ]
};
