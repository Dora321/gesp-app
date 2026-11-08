// 2023-06-l4 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2023-06-l4",
    title: "2023年6月 GESP C++ 四级真题",
    level: 4,
    year: 2023,
    month: 6,
    session: 2,
    timeLimit: 5400,
    backfilled: true,
    source: {
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B46%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf",
        type: "official",
        notes: "AI-Codex于2026-11-08对照登记mirror《2023年6月GESP C++四级真题解析》全部16页。逐题内联答案，非独立原始卷或集中答案表。Q7/Q9/Q14/Q27未决，全部answer保持。"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-08",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror真题解析版PDF全部16页，Git blob SHA e56797ac791cc0ee858102eb4e9919e0bd516353一致。来源答案逐题内联，没有独立原始卷或集中答案表。27个answer字段保持，Q14库C与题源D冲突隔离，Q7/Q9类型大小前提及Q27来源参考缺陷保持未决。恢复代码/判断原文与完整编程范围，两份现有参考及模板独立编译核验。 此前运行核验两次中断的历史保留于执行断点，后续轮已补齐参考/客观代码运行及编译诊断，完整证据见programming-run.json，来源未决题仍保持隔离。",
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
            question: "高级语言编写的程序需要经过以下（ ）操作，可以生成在计算机上运行的可执行代码。",
            options: [
                "编辑",
                "保存",
                "调试",
                "编译"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n在题目给出的四种操作中，编译负责把高级语言源程序翻译为目标代码，并结合所需链接步骤形成可执行程序，因此选D。编辑与保存只是组织和存储源文件，调试是检查程序运行与定位错误，单独进行这些操作不能把C++源代码翻译成可执行文件。",
            tags: [
                "编程环境",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "排序算法是稳定的(Stable Sorting)，就是指排序算法可以保证，在待排序数据中有两个相等记录的关键字R和S(R出现在S之前)，在排序后的列表中R也一定在S前。下面关于排序稳定性的描述，正确的是（ ）。",
            options: [
                "冒泡排序是不稳定的",
                "插入排序是不稳定的",
                "选择排序是不稳定的",
                "以上都不正确"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n稳定排序保留相同关键字记录的原相对顺序。通常的冒泡排序只交换严格逆序的相邻项，插入排序只移动严格更大的项，二者稳定。普通直接选择排序将最小项与当前位置交换，可能越过相等项，例如2a、2b、1变为1、2b、2a，因此C正确。这里按这些排序的常见实现讨论。",
            tags: [
                "排序算法",
                "稳定性",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "下列关于C++语言中指针的叙述，不正确的是（ ）。",
            options: [
                "指针变量中存储的是内存地址。",
                "定义指针变量时必须指定其指向的类型。",
                "指针变量只能指向基本类型变量，不能指向指针变量。",
                "指针变量指向的内存地址不一定能够合法访问。"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n指针可以指向基本类型对象，也可以指向另一个指针对象。例如int x=1、int *p=&x，再用int **pp=&p即构成二级指针，所以C错误。指针的静态类型决定所指类型，包括void等类型。空指针、悬空指针等不能被合法解引用，存有地址形式的值并不保证对应对象可访问。",
            tags: [
                "指针",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下列关于C++语言中数组的叙述，不正确的是（ ）。",
            options: [
                "一维数组在内存中一定是连续存放的。",
                "二维数组是一维数组的一维数组。",
                "二维数组中的每个一维数组在内存中都是连续存放的。",
                "二维数组在内存中可以不是连续存放的。"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n内置二维数组是行数组组成的外层数组，外层与每行数组的元素都连续存放。对int a[r][c]，每行含c个连续int，后面一行接在前一行之后，因此D声称可以不连续不正确。分别分配各行再用指针数组连接，是另一种数据结构，不能把它当作本题的内置二维数组。",
            tags: [
                "数组",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下列关于C++语言中函数的叙述，正确的是（ ）。",
            options: [
                "函数必须有名字。",
                "函数必须有参数。",
                "函数必须有返回值。",
                "函数定义必须写在函数调用前。"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n按题源讨论的普通函数声明，函数具有用于声明和调用的函数名，因此A正确。函数可以没有形参，void函数可以不返回数值，函数只需在使用前有可见的适当声明，定义可以放到调用之后。题源另注lambda表达式产生闭包对象，不能仅因常称“匿名函数”就把普通函数与可调用对象混为一谈。",
            tags: [
                "函数",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下列关于C++语言中变量的叙述，正确的是（ ）。",
            options: [
                "变量定义后可以一直使用。",
                "两个变量的变量名不能是相同的。",
                "两个变量的变量名可以相同，但它们的类型必须是不同的。",
                "两个变量的变量名可以相同，但它们的作用域必须是不同的。"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n不同作用域中的变量可以重名且可以同型，例如外层int x与内层int x是两个不同对象，内层名称遮蔽外层名称，离开内层后重新可见外层。变量能否使用受作用域和生命周期限制，因此A错误。B禁止一切重名、C要求类型不同均不符合嵌套作用域规则，选择D。",
            tags: [
                "变量作用域",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "一个二维数组定义为 double array[3][10]; ，则这个二维数组占用内存的大小为（ ）。",
            options: [
                "30",
                "60",
                "120",
                "240"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n数组有3×10=30个double元素，sizeof(array)=30*sizeof(double)。本机sizeof(double)=8，所以实际测得240，对应题源D。但C++标准没有把所有平台的double固定为8字节，原题也没提供这一前提，不能把本机观测当作普遍保证。保留answer=3，记录ANSWER-DOUBT并暂停计分，等待运行环境说明。",
            tags: [
                "数组内存",
                "单选题",
                "GESP4级"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT Q7。原题没有限定sizeof(double)或平台，数组大小只能确定为30*sizeof(double)。题源D=240需要double占8字节的附加前提，保持D等待澄清。"
        },
        {
            id: 8,
            type: "single",
            question: "一个变量定义为 int *p = nullptr; ，则下列说法正确的是（ ）。",
            options: [
                "该指针变量的类型为int。",
                "该指针变量指向的类型为int。",
                "该指针变量指向的内存地址是随机的。",
                "访问该指针变量指向的内存会出现编译错误。"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\np的变量类型是int*，所指类型是int，所以B正确。nullptr将其初始化为空指针，值并非未初始化的随机地址。解引用空指针不是必然的编译错误，而是在求取对象值时违反有效对象要求，不能通过实际运行偶然表现判断。也不能把空指针的表示泛化为所有实现的整数地址0。",
            tags: [
                "指针",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "一个二维数组定义为 int array[5][3]; ，则 array[1][2] 和 array[2][1] 在内存中的位置相差多少字节?",
            options: [
                "2字节",
                "4字节",
                "8字节",
                "无法确定"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n按行主序，array[1][2]的元素序号为1×3+2=5，array[2][1]为2×3+1=7，两者相差2个int元素，字节距离为2*sizeof(int)。本机int为4字节时距离为8，对应题源C。但题目没有给出int大小，也提供了“无法确定”选项，标准层面只能确定公式。保留answer=2，记录ANSWER-DOUBT，等待平台约定。",
            tags: [
                "数组内存",
                "单选题",
                "GESP4级"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT Q9。行主序位置差是2*sizeof(int)字节，原题未限定int占4字节，题源C=8与D无法确定之间缺平台前提。保持answer=2等待澄清。"
        },
        {
            id: 10,
            type: "single",
            question: "如果a为int类型的变量，且a的值为6，则执行 a &= 3; 之后，a的值会是（ ）。",
            options: [
                "3",
                "9",
                "2",
                "7"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n复合按位与赋值a&=3把a与3逐位相与后存回a。6的二进制低位为110，3为011，同时为1的位只有中间一位，所以结果为010，即十进制2。它不是逻辑与，也不是把两个整数相加，执行后a保持int类型，选择C。",
            tags: [
                "位运算",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "一个数组定义为 int a[5]={1, 2, 3, 4, 5}; ，一个指针定义为 int *p=&a[2]; ，则执行 a[1] = *p; 后，数组a中的值会变为（ ）。",
            options: [
                "{1, 3, 3, 4, 5}",
                "{2, 2, 3, 4, 5}",
                "{1, 2, 2, 4, 5}",
                "{1, 2, 3, 4, 5}"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\np=&a[2]使p指向下标2的第三个元素，*p读取其值3。a[1]=*p把第二个元素改为3，其他项保持原值，最终为{1,3,3,4,5}，选择A。对*p进行读取不会移动指针，也不会自动交换两个元素，数组下标从0开始。",
            tags: [
                "指针数组",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "以下哪个函数声明在调用时可以传递二维数组的名字作为参数?",
            options: [
                "`void BubbleSort(int a[][4]);`",
                "`void BubbleSort(int a[3][]);`",
                "`void BubbleSort(int a[][]);`",
                "`void BubbleSort(int ** a);`"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n二维int数组实参会转换为指向首行的指针。对int array[r][4]，转换类型为int (*)[4]，与A的形参调整后类型相同。B/C缺失必需的内层界限，声明不合法。D是指向int指针的指针，不能直接接收真正二维数组的首行指针，形状看起来相似不代表类型等价。",
            tags: [
                "函数参数",
                "数组",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "在下列代码的横线处填写（ ），可以使得输出是“20 10”。\n\n```cpp\n#include <iostream>\nusing namespace std;\nvoid xchg(________________) { // 在此处填入代码\n    int t = *x;\n    *x = *y;\n    *y = t;\n}\nint main() {\n    int a = 10, b = 20;\n    xchg(&a, &b);\n    cout << a << \" \" << b << endl;\n    return 0;\n}\n```",
            options: [
                "int x, int y",
                "int *x, int *y",
                "int a, int b",
                "int & a, int & b"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n调用xchg(&a,&b)传入两个int对象地址，需要以int*形参x、y接收。函数先保存*x，再用*y覆盖*x，最后把旧值赋给*y，实际修改调用者的a、b，所以输出20 10，选B。其他选项不是所需指针类型或没有声明函数体使用的x、y名称，无法匹配原代码。",
            tags: [
                "指针函数",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "执行以下C++语言程序后，输出结果是（ ）。\n\n```cpp\n#include <iostream>\nusing namespace std;\nint main() {\n    int array[3][3];\n    for (int i = 0; i < 3; i++)\n        for (int j = 0; j < 3; j++)\n            array[i][j] = i * 10 + j;\n    int sum;\n    for (int i = 0; i < 3; i++)\n        sum += array[i][i];\n    cout << sum << endl;\n    return 0;\n}\n```",
            options: [
                "3",
                "30",
                "33",
                "无法确定"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n登记mirror解析版p7明确使用int sum，未初始化，并将答案标为D。原循环给数组对角线0、11、22赋值，但随后sum+=...首次就读取sum的不确定值，程序不能保证输出33。题库此前把sum改成0并保存answer=2即C，与原代码及题源答案冲突。本轮恢复原代码，严格保留answer=2，证据officialAnswer记D、match=false，记录ANSWER-DOUBT并暂停计分，等待澄清。原未初始化程序只编译不执行。",
            tags: [
                "二维数组",
                "单选题",
                "GESP4级"
            ],
            sourceIntegrity: "answer-key-conflict",
            integrityNote: "ANSWER-DOUBT Q14。登记mirror解析版p7明确答案D，原代码int sum未初始化；题库现有answer=2即C，且此前加了=0改写原程序。恢复原代码，严格保持answer=2并暂停计分，等待来源澄清。"
        },
        {
            id: 15,
            type: "single",
            question: "在下列代码的横线处填写（ ），完成对有 n 个 int 类型元素的数组 array 由小到大排序。\n\n```cpp\nvoid SelectionSort(int array[], int n) {\n    int i, j, min, temp;\n    for (i = 0; i < n - 1; i++) {\n        min = i;\n        for (j = i + 1; j < n; j++)\n            if (________________) // 在此处填入代码\n                min = j;\n        temp = array[min];\n        array[min] = array[i];\n        array[i] = temp;\n    }\n}\n```",
            options: [
                "array[min] > array[j]",
                "array[min] > array[i]",
                "min > array[j]",
                "min > array[i]"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n外层从位置i开始确定下一个最小元素，min先指向i，内层j遍历i+1到n−1。只有array[j]比当前array[min]更小才更新min，因此条件为array[min]>array[j]，选A。完成扫描后把最小项与array[i]交换，再处理后续区间。应比较数组元素值，而非把下标min与数值混比。",
            tags: [
                "选择排序",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "域名是由一串用点分隔的名字来标识互联网上一个计算机或计算机组的名称，CCF编程能力等级认证官方网站的域名是gesp.ccf.org.cn，其中顶级域名是gesp。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n域名按点号形成从具体名称到上层域的层级，gesp.ccf.org.cn中最右边的cn是顶级域，gesp是最左侧的子域标签，因此原说法错误。判断顶级域不取第一个单词，名字长度及其在网址中的视觉位置也不会改变域名层级。",
            tags: [
                "计算机网络",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "数列 1, 1, 2, 3, 5, 8 ... 是以意大利数学家列昂纳多·斐波那契命名的数列，从第三个数开始，每个数是前面两项之和。如果计算该数列的第 n 项（其中 n>3）fib(n)，我们采用如下方法。①令 fib(1)=fib(2)=1。②用循环 for i=3 to n 分别计算 f(i)。③输出 fib(n)。这体现了递推的编程思想。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n先给出fib(1)=fib(2)=1，再按i=3、4直到n的顺序，用前两项计算当前项，体现从已知状态逐步推出后继状态的递推思想。它与函数调用自身的递归实现不同。题源解析末句把递推说成递归不准确，本轮按原题明确的循环步骤说明，判断正确。",
            tags: [
                "编程思想",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "在C++语言中，函数的参数默认以引用传递方式进行传递。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n普通形参如void f(int x)使用值传递，在函数内修改x不会直接改变调用者的int变量。使用int&等引用形参才表示引用传递。传入指针也属于按值传递指针值，只是函数可通过指针访问外部对象，所以原文声称默认引用传递错误。",
            tags: [
                "函数传参",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "在C++语言中，可以定义四维数组，但在解决实际问题时不可能用到，因为世界是三维的。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n数组维度是组织索引的数学结构，与现实空间只有三维没有必然约束。比如按时间、楼层、房间、传感器编号记录数据就可使用四个索引。C++支持多维数组，实际计算也能使用四维或更多维，因此“不可能用到”的绝对判断错误。",
            tags: [
                "数组基础",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "在C++语言中，一个函数没有被调用时，它的参数不占用内存。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n题目讨论形参对象的生命周期，普通函数尚未发生调用时，没有为该次调用创建形参对象。调用时根据实参初始化形参，函数退出时相应生命周期结束，题源判断正确。不能把这句话扩展为所有形参都必须占一块固定的栈内存，实际实现还可使用寄存器或优化掉对象存储。",
            tags: [
                "内存管理",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "在C++语言中，如果一个函数可能抛出异常，那么一定要在try子句里调用这个函数。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n函数可能抛出异常并不要求每个直接调用点都在try内。它可以正常返回，也可以把异常继续传播给上层，在外层try/catch捕获。如果异常最终没有处理，则按语言规则终止，但这不使普通调用语法变成非法。因此原文“一定要在try子句里调用”错误。",
            tags: [
                "异常处理",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "如果希望记录10个最长为99字节的字符串，可以将字符串数组定义为 char s[100][10]; 。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n二维char数组的第一维表示有多少行字符串，第二维表示每行容量。最长99字节内容还需1个空字符作为结束符，单行需100个char。记录10个此类字符串可用char s[10][100]。原s[100][10]每行只有10项，不能容纳99字节内容，整体判断错误。",
            tags: [
                "字符串数组",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "字符常量 '0' 和 '\\0' 是等价的。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原题的两个字符常量是'0'和'\\0'。前者是数字字符0，在ASCII中编码为48，后者是值为0的空字符，常用来结束C字符串。两者类型都可为char但值不同，因此判断错误。此前题库误录为@及双引号字符串，本轮按PDF恢复单引号字符常量。",
            tags: [
                "字符常量",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: ">= 和 >>= 都是C++语言的运算符。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n>=是大于等于关系运算符，比较两个操作数并产生布尔结果。>>=是右移复合赋值运算符，按规定把左操作数右移后存回原对象，所以两者都是C++运算符，判断正确。移位的合法位数、类型和负值规则仍需另行满足，题目只问是否属于运算符。",
            tags: [
                "运算符",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "由于文件重定向操作，程序员在使用C++语言编写程序时无法确定通过cout输出的内容是否会被输出到屏幕上。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\ncout关联标准输出流，运行程序时可以由环境把标准输出重定向到文件或管道。仅由源代码中的cout写法不能断定运行时输出一定出现在屏幕上，所以题源判断正确。流的实际去向受启动方式和流缓冲区配置影响，不能只凭输出语句判断显示位置。",
            tags: [
                "输入输出",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "2\n16347\n76344",
                    output: "T\nF"
                }
            ],
            question: "\n# [GESP202306 四级] 幸运数\n\n## 题目描述\n\n小明发明了一种“幸运数”。一个正整数从个位开始编号，第 1、3、5... 位上的数字都要做一次变换，第 2、4、6... 位上的数字保持不变。\n\n对奇数位上的数字 $t$，变换规则为：\n\n- 先计算 $t \\times 7$；\n- 如果结果不大于 $9$，就把它作为变换结果；\n- 否则不断把各位数字相加，直到结果不大于 $9$。\n\n把所有数位处理完成后，再将最终各位数字求和；如果这个和是 $8$ 的倍数，则称原数是幸运数。\n\n## 输入格式\n\n第一行一个正整数 $N$，表示待判断的整数个数。\n接下来 $N$ 行，每行一个正整数 $x$。\n\n## 输出格式\n\n输出 $N$ 行。若对应整数是幸运数，输出 `T`；否则输出 `F`。\n\n## 数据范围与说明\n\n$1 \\le N \\le 20$，各待判断正整数小于 $10^{12}$。可以输入一个数后立即判断并输出，再输入下一个数。\n\n例如 16347 变换后为 76344，各数位之和为 24，是 8 的倍数，所以是幸运数。\n",
            score: 25,
            answer: "",
            explanation: "**解析**\n\n从个位算起，偶数位数码直接累加，奇数位先乘7再反复做数位求和，直到0..9。非零数码的结果等于(t*7−1)%9+1，零需单独返回0。最终和是8倍数就输出T，否则F。16347变换为76344，和24符合，76344则不符合。N<=20、x<10^12，long long能容纳，最多12位，和不超过108。时间O(N乘数位数)，单个数额外空间O(1)。独立预言机按十进制字符串和反复数位求和处理，不复用参考取模公式。",
            tags: [
                "编程题",
                "模拟"
            ],
            template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\n\nint trans(int t) {\n    if (t == 0) return 0;\n    return (t * 7 - 1) % 9 + 1;\n}\n\nbool judge(long long x) {\n    int sum = 0;\n    for (int d = 1; x > 0; d++, x /= 10) {\n        int t = static_cast<int>(x % 10);\n        if (d % 2 == 0) sum += t;\n        else sum += trans(t);\n    }\n    return sum % 8 == 0;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    while (n--) {\n        long long x;\n        cin >> x;\n        cout << (judge(x) ? \"T\" : \"F\") << \"\\n\";\n    }\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "10\n00FFCFAB00FFAC09071B5CCFAB76\n00AFCBAB11FFAB09981D34CFAF56\n01BFCEAB00FFAC0907F25FCFBA65\n10FBCBAB11FFAB09981DF4CFCA67\n00FFCBFB00FFAC0907A25CCFFC76\n00FFCBAB1CFFCB09FC1AC4CFCF67\n01FCCBAB00FFAC0F071A54CFBA65\n10EFCBAB11FFAB09981B34CFCF67\n01FFCBAB00FFAC0F071054CFAC76\n1000CBAB11FFAB0A981B84CFCF66",
                    output: "ABCFFF00CB09AC07101198011B6776FC\n321032657CD10E\n36409205ACC16D\nB41032657FD16D\n8F409205ACF14D\n324F326570D1FE\n3240C245FC411D\nBF4032687CD16D\n8F409205ACC11D\nB240326878D16E\n83409205ACE11D"
                }
            ],
            question: "\n# [GESP202306 四级] 图像压缩\n\n## 题目描述\n\n给定一幅 256 级灰度图像，其中每个像素都用两位十六进制数表示，范围从 `00` 到 `FF`。\n\n现在需要把它压缩为 16 级灰度图，规则如下：\n\n- 先统计整幅图中每种灰度出现的次数；\n- 选出出现次数最多的 16 种灰度，按“出现次数从多到少、灰度值从小到大”的规则编号为 `0` 到 `F`；\n- 其他灰度映射到这 16 种灰度中“最接近”的一种；若距离相同，则选择编号更小的那种。\n\n## 输入格式\n\n第一行一个正整数 $N$，表示图像共有 $N$ 行。\n接下来 $N$ 行，每行是一个长度为偶数的十六进制字符串，每两位表示一个像素。\n\n## 输出格式\n\n第一行输出被选中的 16 种灰度的十六进制编码，共 32 个字符。\n随后输出压缩后的图像，每个像素用一位十六进制数表示。\n\n## 数据范围与说明\n\n$10 \\le N \\le 20$，各行字符串长度相等且为偶数，每行最多 20 个像素。保证整幅图至少有 16 种不同灰阶。\n\n样例中 AB、CF、FF 各出现 14 次，00 出现 10 次，CB 出现 9 次，09 出现 7 次，AC 出现 6 次，07 出现 5 次，10、11、98 各出现 4 次，01、1B、67、76、FC 各出现 3 次。\n",
            score: 25,
            answer: "",
            explanation: "**原卷疑点，暂停计分**\n\n统计256种灰阶频次，按频次降序、灰阶升序选16项，随后对每个像素找绝对差最小的入选灰阶，距离相同选编号较小者。当前题库参考以his=0、mx=−1实现，可正确选中只出现一次的灰阶，两参考程序本轮保持。来源解析版p15-16却把his置−1并让选择阈值max=0，单次灰阶的计数变成0，合法的20个不同像素各出现一次时第一次就得max_id=−1，随后将越界。本轮只运行访问之前的有界诊断，标SOURCE-DOUBT等待来源澄清，保留题意与answer空字段及现有安全参考。约定10<=N<=20、等宽且每行至多20像素、至少16灰阶，当前数组容量足够。时间O(NM乘16+256乘16)，空间O(NM+256)。独立预言机排序完整频次表并对距离/编号二元组排序。",
            tags: [
                "编程题",
                "模拟",
                "字符串",
                "统计"
            ],
            template: "#include <iostream>\n#include <cstring>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <cstring>\nusing namespace std;\n\nint image[20][20];\nint cpimg[20][20];\nint his[256];\nint color[16];\n\nint trans(char a) {\n    if (a <= '9') return a - '0';\n    return a - 'A' + 10;\n}\n\nchar itrans(int n) {\n    if (n >= 10) return static_cast<char>(n - 10 + 'A');\n    return static_cast<char>(n + '0');\n}\n\nint compress(int c) {\n    int dis = 256, res = -1;\n    for (int i = 0; i < 16; i++) {\n        int d = c - color[i];\n        if (d < 0) d = -d;\n        if (d < dis) {\n            dis = d;\n            res = i;\n        }\n    }\n    return res;\n}\n\nint main() {\n    int n = 0, m = 0;\n    cin >> n;\n    memset(his, 0, sizeof(his));\n    for (int i = 0; i < n; i++) {\n        char line[50];\n        cin >> line;\n        m = static_cast<int>(strlen(line)) / 2;\n        for (int j = 0; j < m; j++) {\n            int c = trans(line[j * 2]) * 16 + trans(line[j * 2 + 1]);\n            image[i][j] = c;\n            his[c]++;\n        }\n    }\n    for (int c = 0; c < 16; c++) {\n        int mx = -1, mx_id = -1;\n        for (int i = 0; i < 256; i++) {\n            if (his[i] > mx) {\n                mx = his[i];\n                mx_id = i;\n            }\n        }\n        color[c] = mx_id;\n        his[mx_id] = -1;\n    }\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < m; j++) {\n            cpimg[i][j] = compress(image[i][j]);\n        }\n    }\n    for (int c = 0; c < 16; c++) {\n        cout << itrans(color[c] / 16) << itrans(color[c] % 16);\n    }\n    cout << \"\\n\";\n    for (int i = 0; i < n; i++) {\n        for (int j = 0; j < m; j++) {\n            cout << itrans(cpimg[i][j]);\n        }\n        cout << \"\\n\";\n    }\n    return 0;\n}",
            sourceIntegrity: "official-source-defect",
            integrityNote: "SOURCE-DOUBT Q27。登记mirror为真题解析版，其p15-16参考程序将his初始化-1且选最大值初始max=0，出现一次的灰阶计数0不会被选中，合法输入可使max_id=-1并越界。题库现有参考已采用0计数/mx=-1修正，本轮保留并独立验证，来源参考缺陷等待澄清，不冒称缺陷来自独立官方原始卷。"
        }
    ]
};
