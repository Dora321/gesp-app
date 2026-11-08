// 2023-09-l4 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2023-09-l4",
    title: "2023年9月 GESP C++ 四级真题",
    level: 4,
    year: 2023,
    month: 9,
    session: 3,
    timeLimit: 5400,
    backfilled: true,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1570611272876064.pdf",
        notes: "AI-Codex对照登记mirror PDF全部8页；Q2图按p1裁取，Q14历史未决、Q10类型大小前提、Q27来源参考缺陷保持隔离。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B49%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf",
        type: "official"
    },
    verification: {
        status: "partial",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-08",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部8页文本和渲染，Git blob SHA c9e841fe71e1503f99b1666642a6cd26734d254b一致。p1单选答案表及p4判断表逐项核对，全部27个answer字段保持。恢复Q2原图/流程，重写27题解析，补两编程题限制及Q26提示，只修Q26模板首行输入，两现有参考保持。Q14历史未决继续隔离，Q10平台大小前提与Q27来源参考/输入措辞矛盾新增未决。",
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
            explanation: "**答案 B**\n\nApp是Application的简称，指为完成某类任务提供功能的应用程序。手机上的地图、聊天、相机应用都属应用软件，所以选B。操作系统管理设备资源并为应用提供运行环境，对应A所说的系统软件；C是硬件类别。应区分安装在手机里的程序与运行程序的手机设备本身。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "下列流程图的输出结果是？（ ）\n\n![原卷流程图：m=1、n=1；按m*n>20分支更新m，n加1后在n>5时输出m](/question-assets/2023-09-l4/q2-flowchart.png)\n\n流程文字转录：初始 m=1、n=1。若 m*n>20，令 m=m-2；否则令 m=2*m+1。随后 n=n+1；若 n>5 则输出 m 并结束，否则回到 m*n>20 的判断。",
            options: [
                "9",
                "7",
                "5",
                "11"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n按原图从m=1、n=1开始，每轮先检查m*n>20，再令n加1。五轮进入分支前依次为(1,1)、(3,2)、(7,3)、(5,4)、(11,5)，乘积为1、6、21、20、55，更新m依次得3、7、5、11、9。最后n=6满足n>5，输出9，选A。20不大于20，第四轮必须走否分支；旧解析假设m=5/n=2和无限循环与原图不符，已替换。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "对包含 n 个元素的数组进行冒泡排序，平均时间复杂度一般为（ ）。",
            options: [
                "O(n)",
                "O(n log n)",
                "O(n²)",
                "以上都不正确"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n普通冒泡排序逐轮比较相邻元素，使一个最大值进入末尾已排序区间。比较次数通常为(n-1)+(n-2)+…+1=n(n-1)/2，因此平均时间复杂度为O(n²)，选C。带“本轮无交换就提前退出”的版本在已经有序时可达O(n)，但这只是该优化版本的最好情况，不能把它写成平均复杂度或声称平均交换次数恒等于比较次数。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "下列关于 C++ 语言中指针的叙述，不正确的是（ ）。",
            options: [
                "可以定义指向int类型的指针。",
                "可以定义指向自定义结构体类型的指针。",
                "自定义结构体类型可以包含指针类型的元素。",
                "不能定义指向 void 类型的指针，那没有意义。"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\nC++允许定义int*、结构体指针，也允许结构体内有指针成员，例如链表节点的next。void*同样是合法指针类型，可保存对象地址并用于通用接口，但不能直接通过void*解引用取得一个有类型的对象值。因此D的“不能定义、没有意义”不成立，符合题目要求的不正确项。通用对象指针的规则不等于所有种类的函数指针都可移植转换为void*。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "下列关于 C++ 语言中数组的叙述，不正确的是（ ）。",
            options: [
                "一维数组可以用来表示数列。",
                "二维数组可以用来表示矩阵。",
                "三维数组可以用来表示空间中物体的形状。",
                "世界是三维的，所以定义四维数组没有意义。"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n数组的维数描述数据索引的层次，与现实空间的维数没有必然限制。一维可记录数列，二维可记录矩阵，三维可记录空间网格；四维也可以用三个空间坐标加时间来记录变化。因此A/B/C给出的用途成立，D否认四维数组的意义不成立，选D。多维数组仍是数组嵌套，实际容量和可用资源限制需另行考虑。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "下列关于 C++ 语言中函数的叙述，正确的是（ ）。",
            options: [
                "函数调用前必须定义。",
                "函数调用时必须提供足够的实际参数。",
                "函数定义前必须声明。",
                "函数声明只能写在函数调用前。"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n调用函数时需要提供使调用成立的足够实参：没有默认值的必要形参不能缺少，有默认值的尾部参数可以省略。B按这一含义成立。调用前需要有可见声明，函数定义可在后面，因此A错误；定义本身也是声明，不必另写先行声明，所以C错误；声明可在合法作用域中重复出现，也可位于一次调用之后，故D的“只能”错误。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "下列关于 C++ 语言中函数的叙述，不正确的是（ ）。",
            options: [
                "两个函数的声明可以相同。",
                "两个函数的局部变量可以重名。",
                "两个函数的参数可以重名。",
                "两个函数可以重名。"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n这里的“两个函数”指两个不同的函数。在同一作用域内两个声明若完全相同，通常是在重复声明同一个函数，不能据此区分两个不同函数，所以A是题目要求的不正确项。不同函数的局部变量、形参可以重名；函数名也可以在满足重载规则时相同。不能把A解释成禁止同一函数重复声明，重复声明本身合法，返回类型不同也不能单独构成重载。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "一个二维数组定义为char array[3][10];，则这个二维数组占用内存的大小为（ ）。",
            options: [
                "10",
                "30",
                "32",
                "48"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nchar array[3][10]包含3行，每行10个char，共30个char。语言规定sizeof(char)=1，所以sizeof(array)=3*10=30个C++字节，选B。数组本体没有在每行额外附加一个指针；即使用来存字符串，结束符也应占用已有容量，不会凭空增加数组大小。这里按char大小计，不需要额外假定int或指针有多少字节。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "如果n 为int类型的变量，一个指针变量定义为int *p = &n;，则下列说法正确的是（ ）。",
            options: [
                "指针变量p 的值与变量n 是相同的。",
                "指针变量p 的值与变量n 的地址是相同的。",
                "指针变量p 指向的值为'n'。",
                "指针变量p 指向的值与变量n 的地址是相同的。"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nint *p=&n把n的地址保存到指针p中，所以p的值等于&n，B正确。*p表示被指向的int对象，即n的值；它不是字符常量'n'，也不是n的地址。A混淆指针中保存的地址与对象值，D同样混淆了解引用结果与地址。执行*p=某值会修改n，而把新地址赋给p则改变指向。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "一个三维数组定义为long long array[6][6][6];，则array[1][2][3]和array[3][2][1]在内存中的 位置相差多少字节？（ ）",
            options: [
                "70 字节",
                "198 字节",
                "560 字节",
                "无法确定"
            ],
            answer: 2,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\n三维数组按最后一维最快变化的方式排列，两项的线性序号分别为1*36+2*6+3=51及3*36+2*6+1=121，相差70个long long元素。字节差严格为70*sizeof(long long)。在本机sizeof(long long)=8时为560，对应源C；原文没有这个大小前提，不能由本机测量推出所有C++17实现都为8。保留answer=2并隔离，不擅自改为D；也不跨不同内层数组做指针相减。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ],
            sourceIntegrity: "official-source-defect",
            integrityNote: "ANSWER-DOUBT Q10。mirror p3及p1答案表为C(560)，下标偏移差为70个long long元素，字节差是70*sizeof(long long)。原题未指定sizeof(long long)=8，C++17只保证最小宽度，不能把本机结果当成无条件语言保证。原answer=2保持，待平台前提澄清。"
        },
        {
            id: 11,
            type: "single",
            question: "如果a为int类型的变量，且a的值为 6 ，则执行a = ~a;之后，a的值会是（ ）。",
            options: [
                "-6",
                "6",
                "-7",
                "7"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n在本考试所用补码整数表示下，6的二进制低位为0110，按位取反把全部位反转，结果为-7，因此源表选C。其数值关系为~x=−x−1，可用宽类型计算右式，避免对INT_MAX先做int的x+1产生溢出。~是按位取反，既不是算术负号也不是逻辑非；题意中的补码上下文不能被扩大为所有历史C++版本都只允许一种有符号表示。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "一个数组定义为int a[5] = {1, 2, 3, 4, 5};，一个指针定义为int * p = &a[2];，则执行*p = a[1];后，数组 a 中的值会变为（ ）。",
            options: [
                "{1, 2, 2, 4, 5}",
                "{1, 3, 3, 4, 5}",
                "{1, 2, 3, 3, 5}",
                "{1, 2, 4, 4, 5}"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\np初始保存&a[2]，所以*p与a[2]指代同一对象。赋值*p=a[1]读取a[1]的2，写回a[2]，数组变为1、2、2、4、5，选A。这里没有给p赋一个新地址，也没有修改a[1]。判断指针题时应分清p、&p和*p，分别是指针值、指针对象自身地址和被指向对象。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "下列关于 C++ 语言中异常处理的叙述，正确的是（ ）。",
            options: [
                "一个try子句可以有多个catch子句与之对应。",
                "如果try子句在执行时发生异常，就一定会进入某一个catch子句执行。",
                "如果try子句中没有可能发生异常的语句，会产生编译错误。",
                "catch子句处理异常后，会重新执行与之对应的try子句。"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n一个try后可以有多个catch，用不同处理器匹配不同异常类型，所以A正确。B错误：若当前各catch均不匹配，异常可向外传播，并不保证进入这些catch之一。C错误：try内没有抛出语句也合法。D错误：正常处理结束后继续执行try/catch之后的语句，不会自动重跑try；确需重试必须由程序显式设置循环。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "执行以下 C++ 语言程序后，输出结果是（ ）。",
            code: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int fib[10];\n    fib[0] = 0;\n    fib[1] = 1;\n    for (int i = 2; i < 10; i++)\n        fib[i] = fib[i - 1] + fib[i - 2];\n    cout << fib[10] << endl;\n    return 0;\n}",
            options: [
                "0",
                "5",
                "55",
                "无法确定。"
            ],
            answer: 3,
            score: 2,
            explanation: "**原卷疑点，暂停计分**\n\nint fib[10]的合法下标为0..9，循环只计算这些位置，所得序列为0、1、1、2、3、5、8、13、21、34。后面读取fib[10]越界，行为未定义，不能把55或任何本机偶然输出当作语言保证，源D与题库D一致。旧证据已有对此题的unresolved，本轮按红线保留隔离和resolved=false，不擅自清除。原程序仅编译；另对合法0..9序列运行验证，未执行越界读取。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ],
            sourceIntegrity: "answer-key-suspect",
            integrityNote: "保留既有未决Q14：旧证据unresolved记录fib[10]越界及不同环境结果不可依赖。原卷D与题库D一致，但本轮无权自行清除既有隔离；继续resolved=false。只编译原程序，不执行越界读取、不采信旧垃圾值证据，待来源/历史隔离澄清。"
        },
        {
            id: 15,
            type: "single",
            question: "在下列代码的横线处填写（ ），完成对有n 个int类型元素的数组array由小到大排序。",
            code: "void BubbleSort(int array[], int n) {\n    for (int i = n; i >= 2; i--)\n        for (_______) // 在此处填入代码\n            if (array[j] > array[j + 1]) {\n                int t = array[j];\n                array[j] = array[j + 1];\n                array[j + 1] = t;\n            }\n}",
            requiresCode: true,
            sourcePage: 4,
            sourceVerified: true,
            reviewedBy: "AI-Codex",
            reviewedAt: "2026-11-08",
            options: [
                "int j = 1; j < n; j++",
                "int j = 0; j < n; j++",
                "int j = 0; j < i-1; j++",
                "int j = 0; j < i; j++"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n每轮未排序区间为下标0..i-1，相邻比较须保证j+1<=i-1，因此应取j=0、j<i-1、j++，选C。比较和必要交换后，该区间最大值到达i-1，下一轮将i减1继续。A漏掉下标0且越过本轮边界；B与D在第一轮允许j=n-1，访问array[n]越界。测试只运行正确C补全，不执行越界选项。",
            tags: [
                "客观题",
                "单选题",
                "GESP4级"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "在 C++ 语言中，指针变量在逻辑上指向另一个变量在内存中的位置，指针变量本身不占用内存。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n指针变量也是一个对象，保存地址等信息，具有自己的类型和存储需求。即使某个程序经优化后没有为它分配独立栈槽，也不能据此说语言层面所有指针变量本身不占内存。指针p的值和被指向对象的地址有关，&p是指针自身地址，二者概念不同。原句后半段否认指针对象的存储，因此判断错误。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 17,
            sourceUrl: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B49%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf",
            sourcePage: 4,
            verificationNote: "AI-Codex 对照CCF原卷镜像 https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2023%E5%B9%B49%E6%9C%88-C%2B%2B4%E7%BA%A7.pdf 第4页文本及渲染图核对。",
            sourcePages: [
                4
            ],
            reviewedAt: "2026-11-08",
            reviewedBy: "AI-Codex",
            sourceVerified: true,
            type: "judge",
            question: "对 N 个元素的数组执行插入排序算法，通常的时间复杂度是 O(N²)。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n通常的直接插入排序将当前元素插入前面已有序的区间，最坏时第i次需要检查并移动i个元素。总操作量为1+2+…+(N-1)，平均和最坏时间复杂度都为O(N²)，原判断正确。已经有序时常见实现只需线性比较，但最好情况不改变这里“通常”的复杂度判断；不能把插入位置查找优化误写成整体移动代价消失。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "在 C++ 语言中，每个变量都有其作用域。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n作用域规定变量名字在程序的哪些区域可以被查找和使用。局部变量有块作用域，命名空间中的变量也有相应作用域，类成员同样遵守名字查找规则，所以每个变量都有其作用域，判断正确。作用域与生命周期应区分：静态局部变量的名字只在局部可见，对象却可存续至程序结束。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "在 C++ 语言中，在函数调用时，通过引用传递的参数不会复制实际参数，因此不会额外占用内存。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n引用参数使函数通过另一个名字访问原对象，通常避免复制整个实参。但“不复制实参”并不能推出“不会额外占用内存”：引用的实现可能需要保存地址或其他调用信息，编译器也可能把它优化掉。语言语义不保证每次调用都无额外存储开销，因此原句使用绝对结论，判断错误。不能把它反过来声称每个引用必定另占一个固定大小的指针槽。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "在 C++ 语言中，可以通过定义结构体，定义一个新的数据类型。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nstruct定义一个类类型，可以把不同类型的成员组织到一起。例如struct Point {int x;int y;};定义Point类型后，可继续定义Point对象、指针或数组，题目判断正确。定义一个类型与创建该类型的某个对象是不同动作；结构体也可以包含成员函数，不应把结构体理解成只能列出纯数据的无名容器。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "在 C++ 语言中，可以定义结构体类型的数组变量，定义结构体时也可以包含数组成员。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n在结构体定义完成后，可以建立该类型的数组，例如Point points[10]；也可以在结构体中定义数组成员，例如struct Row {int data[10];};。两个方向都是C++允许的组合，原判断正确。数组元素类型要满足相应完整性要求，直接把一个尚未完整定义的结构体自身作为非指针成员则是另一问题，不影响本题所说的数组组合。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "如果希望记录 10 个最长为 99 字节的字符串，可以将字符串数组定义为char s[10][100];。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nchar s[10][100]有10行，每行100个char。作为以空字符结尾的C字符串使用时，最多99字节内容加1个'\u0000'，正好满足10个最长99字节字符串，判断正确。这里按字节计算，不把99个任意编码的汉字与99字节混为一谈；输入时也要防止超过每行容量，二维数组本身不会自动限制读入长度。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "一个可能抛出异常的函数，调用它的位置没有在try子句中，会引起编译错误。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n普通C++函数可以在不位于try内部的位置被调用，即使它可能抛异常，也不会单凭这一点造成编译错误。异常可以由更外层调用者捕获，或在无人处理时按规则终止。编译是否接受与运行时是否捕获是两件事，所以原判断错误。核验只编译未捕获异常的示例，不为得到崩溃输出而实际执行它。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "==和:=都是 C++ 语言的运算符。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n==是C++的相等比较运算符，=才是赋值运算符，:=不是一个C++运算符。因此把==和:=都列为C++运算符的判断错误。不要与作用域解析符::混淆，也不要因为其他语言接受:=就推断C++同样接受；应按目标语言词法和语法判断，普通表达式x:=1不能通过编译。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "通过使用文件重定向操作，可以将程序中输出到cout的内容输出到文件中，这是常用的记录程序运行日志 的方法之一。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\ncout通常写入标准输出。启动程序时可以由命令环境把标准输出重定向到文件，例如program > log.txt，程序仍执行cout写操作，但内容进入指定文件，因而原判断正确。这是记录日志的一种方式，不意味着每个cout都会自动写日志文件；文件路径和权限等运行条件也应满足。",
            tags: [
                "客观题",
                "判断题",
                "GESP4级"
            ]
        },
        {
            id: 26,
            type: "programming",
            samples: [
                {
                    input: "2\n8 1362\n16 3F0",
                    output: "754\n1008"
                },
                {
                    input: "2\n2 11011\n10 123456789",
                    output: "27\n123456789"
                }
            ],
            question: "\n# [GESP202309 四级] 进制转换\n\n## 题目描述\n\n$N$ 进制数指的是逢 $N$ 进一的计数制。例如，人们日常生活中大多使用十进制计数，而计算机底层则一般使用二进制。除此之外，八进制和十六进制在一些场合也是常用的计数制（十六进制中，一般使用字母 A 至 F 表示十至十五；本题中，十一进制到十五进制也是类似的）。\n\n在本题中，我们将给出 $N$ 个不同进制的数。你需要分别把它们转换成十进制数。\n\n## 提示\n\n对于任意一个 $L$ 位 $K$ 进制数，最右边为第 $0$ 位，最左边为第 $L-1$ 位。将第 $i$ 位数码乘以权值 $K^i$，再把各位结果相加，即得十进制数。例如八进制 1362 对应 $1\\times8^3+3\\times8^2+6\\times8^1+2\\times8^0=754$；十六进制 3F0 对应 $3\\times16^2+15\\times16^1+0\\times16^0=1008$。\n\n## 输入格式\n\n输入的第一行为一个十进制表示的整数 $N$。接下来 $N$ 行，每行一个整数 $K$，随后是一个空格，紧接着是一个 $K$ 进制数，表示需要转换的数。保证所有 $K$ 进制数均由数字和大写字母组成，且不以 $0$ 开头。保证 $K$ 进制数合法。\n\n保证 $N \\le 1000$；保证 $2 \\le K \\le 16$。\n\n保证所有 $K$ 进制数的位数不超过 $9$。\n\n## 输出格式\n\n输出 $N$ 行，每一个十进制数，表示对应 $K$ 进制数的十进制数值。\n\n## 限制与提醒\n\n时间限制 1.0 秒，内存限制 128 MB。不要在输入、输出中附带提示信息。\n",
            score: 25,
            explanation: "**解析**\n\n每行先读K与数码串，从左向右维护value=value*K+digit，数字0..9按字符转值，大写A..F映射为10..15。8进制1362依次得1、11、94、754；16进制3F0得3、63、1008。最长9位、最大16进制时为16^9−1=68719476735，long long足够，int通常不足。每组重新清零，时间O(NL)、辅助空间O(L)，L<=9、N<=1000。独立预言机按从低位开始的幂权求和，不复用Horner递推。原模板错误地在首行读n和b，已只读组数n，参考保持。",
            tags: [
                "编程题",
                "进制转换"
            ],
            template: "#include <iostream>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint digitValue(char c) {\n    if (c >= '0' && c <= '9') return c - '0';\n    return c - 'A' + 10;\n}\n\nint main() {\n    int n;\n    cin >> n;\n    while (n--) {\n        int k;\n        string s;\n        cin >> k >> s;\n        long long value = 0;\n        for (char c : s) value = value * k + digitValue(c);\n        cout << value << \"\\n\";\n    }\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            samples: [
                {
                    input: "0",
                    output: "00"
                },
                {
                    input: "926",
                    output: "9E 07"
                },
                {
                    input: "987654321012345678",
                    output: "CE 96 C8 A6 F4 CB B6 DA 0D"
                }
            ],
            question: "\n# [GESP202309 四级] 变长编码\n\n## 题目描述\n\n小明刚刚学习了三种整数编码方式：原码、反码、补码，并了解到计算机存储整数通常使用补码。但他总是觉得，生活中很少用到 $2^{31}-1$ 这么大的数，生活中常用的 $0\\sim 100$ 这种数也同样需要用 $4$ 个字节的补码表示，太浪费了些。\n热爱学习的小明通过搜索，发现了一种正整数的变长编码方式。这种编码方式的规则如下：\n\n1. 对于给定的正整数，首先将其表达为二进制形式。例如，$(0)_{10}=(0)_{2}$，$(926)_{10}=(1110011110)_{2}$。\n\n2. 将二进制数从低位到高位切分成每组 $7$ bit，不足 $7$bit 的在高位用 $0$ 填补。例如，$(0)_{2}$ 变为$0000000$ 的一组，$(1110011110)_{2}$ 变为 $0011110$ 和 $0000111$ 的两组。\n\n3. 由代表低位的组开始，为其加入最高位。如果这组是最后一组，则在最高位填上 $0$，否则在最高位填上 $1$。于是，$0$ 的变长编码为 $00000000$ 一个字节， $926$ 的变长编码为 $10011110$ 和 $00000111$ 两个字节。\n\n这种编码方式可以用更少的字节表达比较小的数，也可以用很多的字节表达非常大的数。例如，$987654321012345678$ 的二进制为 $(0001101\\;1011010\\;0110110\\;1001011\\;1110100\\;0100110\\;1001000\\;0010110\\;1001110)_{2}$，于是它的变长编码为（十六进制表示） `CE 96 C8 A6 F4 CB B6 DA 0D`，共 $9$ 个字节。\n\n你能通过编写程序，找到一个正整数的变长编码吗？\n\n## 输入格式\n\n输入第一行，包含一个正整数 $N$。约定 $0\\le N \\le 10^{18}$。\n\n## 输出格式\n\n输出一行，输出 $N$ 对应的变长编码的每个字节，每个字节均以 $2$ 位十六进制表示（其中， `A-F` 使用大写字母表示），两个字节间以空格分隔。\n\n## 限制\n\n时间限制 1.0 秒，内存限制 128 MB。\n",
            score: 25,
            explanation: "**原卷疑点，暂停计分**\n\n编码从低位开始，每组取7位，仍有高位组就把当前字节最高位置1，最后一组最高位为0，按顺序输出两位大写十六进制并用空格分隔。926的两组为30、7，输出9E 07；0按来源规则和样例必须输出00。N<=10^18最多9组，long long或unsigned long long都够，不必误称只能用无符号。时间O(log128(N+1))、辅助空间最多9字节组。现有参考包含零特判且样例符合，保持。来源“正整数”与零范围矛盾，来源参考在0时读未初始化split[0]，均保留隔离；有界见证在该读取前停止。独立预言机通过二进制字符串分7位组构造输出并解码回原数。",
            tags: [
                "编程题",
                "位运算",
                "模拟"
            ],
            template: "#include <iostream>\n#include <vector>\n#include <iomanip>\nusing namespace std;\n\nint main() {\n    unsigned long long n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <vector>\n#include <iomanip>\nusing namespace std;\nint main() {\n    unsigned long long n; cin >> n;\n    if (n == 0) { cout << \"00\" << endl; return 0; }\n    vector<int> res;\n    while (n >= 128) {\n        res.push_back((n % 128)+128);\n        n /= 128;\n    }\n    res.push_back(n);\n    for (int i = 0; i < res.size(); i++) {\n        cout << hex << uppercase << setw(2) << setfill('0') << res[i] << (i == res.size()-1 ? \"\" : \" \");\n    }\n    cout << endl;\n    return 0;\n}",
            sourceIntegrity: "official-source-defect",
            integrityNote: "SOURCE-DOUBT Q27。mirror p7用“正整数”同时约定0<=N<=10^18并给0样例；p8来源参考while(n>0)在n=0时不写split数组却无条件output_code(split[0])，读取未初始化元素。题库现有参考有零特判，保持；原文矛盾与来源参考缺陷隔离，未修改answer。"
        }
    ]
};
