// 2023年6月 GESP C++ 四级真题
export const paperData = {
    id: '2023-06-l4',
    title: '2023年6月 GESP C++ 四级真题',
    level: 4,
    year: 2023,
    month: 6,
    session: 2,
    timeLimit: 5400,
    questions: [
        {
            id: 1,
            type: "single",
            question: "高级语言编写的程序需要经过以下（ ）操作，可以生成在计算机上运行的可执行代码。",
            options: [
                "编辑",
                "保存",
                "调试",
                "编译",
            ],
            answer: 3,
            score: 2,
            explanation: "高级语言编写的程序要经过编译操作，才能生成计算机可以直接执行的机器码或字节码，从而生成可执行文件。",
            tags: ["编程环境", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: "排序算法是稳定的(Stable Sorting)，就是指排序算法可以保证，在待排序数据中有两个相等记录的关键字R和S(R出现在S之前)，在排序后的列表中R也一定在S前。下面关于排序稳定性的描述，正确的是（ ）。",
            options: [
                "冒泡排序是不稳定的",
                "插入排序是不稳定的",
                "选择排序是不稳定的",
                "以上都不正确",
            ],
            answer: 2,
            score: 2,
            explanation: "选择排序是不稳定的算法；冒泡排序和插入排序通常是稳定的。",
            tags: ["排序算法", "稳定性", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: "下列关于C++语言中指针的叙述，不正确的是（ ）。",
            options: [
                "指针变量中存储的是内存地址。",
                "定义指针变量时必须指定其指向的类型。",
                "指针变量只能指向基本类型变量，不能指向指针变量。",
                "指针变量指向的内存地址不一定能够合法访问。",
            ],
            answer: 2,
            score: 2,
            explanation: "指针变量可以指向任何类型，包括另一个指针变量（多级指针）。",
            tags: ["指针", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: "下列关于C++语言中数组的叙述，不正确的是（ ）。",
            options: [
                "一维数组在内存中一定是连续存放的。",
                "二维数组是一维数组的一维数组。",
                "二维数组中的每个一维数组在内存中都是连续存放的。",
                "二维数组在内存中可以不是连续存放的。",
            ],
            answer: 3,
            score: 2,
            explanation: "在C++中，无论是几维数组，在内存中都是按序连续存放的。",
            tags: ["数组", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: "下列关于C++语言中函数的叙述，正确的是（ ）。",
            options: [
                "函数必须有名字。",
                "函数必须有参数。",
                "函数必须有返回值。",
                "函数定义必须写在函数调用前。",
            ],
            answer: 0,
            score: 2,
            explanation: "函数名是必须的；参数、返回值、定义位置（可先声明后调用）都不是绝对必须的。",
            tags: ["函数", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: "下列关于C++语言中变量的叙述，正确的是（ ）。",
            options: [
                "变量定义后可以一直使用。",
                "两个变量的变量名不能是相同的。",
                "两个变量的变量名可以相同，但它们的类型必须是不同的。",
                "两个变量的变量名可以相同，但它们的作用域必须是不同的。",
            ],
            answer: 3,
            score: 2,
            explanation: "作用域不同的变量可以重名，例如全局变量和局部变量。",
            tags: ["变量作用域", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: "一个二维数组定义为 double array[3][10]; ，则这个二维数组占用内存的大小为（ ）。",
            options: [
                "30",
                "60",
                "120",
                "240",
            ],
            answer: 3,
            score: 2,
            explanation: "3 * 10 * sizeof(double) = 30 * 8 = 240 字节。",
            tags: ["数组内存", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: "一个变量定义为 int *p = nullptr; ，则下列说法正确的是（ ）。",
            options: [
                "该指针变量的类型为int。",
                "该指针变量指向的类型为int。",
                "该指针变量指向的内存地址是随机的。",
                "访问该指针变量指向的内存会出现编译错误。",
            ],
            answer: 1,
            score: 2,
            explanation: "p 的类型是 int*，它指向的类型是 int。nullptr 是空指针，地址为 0 而非随机。",
            tags: ["指针", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: "一个二维数组定义为 int array[5][3]; ，则 array[1][2] 和 array[2][1] 在内存中的位置相差多少字节?",
            options: [
                "2字节",
                "4字节",
                "8字节",
                "无法确定",
            ],
            answer: 2,
            score: 2,
            explanation: "array[1][2] 的序号是 1*3+2=5，array[2][1] 的序号是 2*3+1=7。相差 2 个 int，即 8 字节。",
            tags: ["数组内存", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: "如果a为int类型的变量，且a的值为6，则执行 a &= 3; 之后，a的值会是（ ）。",
            options: [
                "3",
                "9",
                "2",
                "7",
            ],
            answer: 2,
            score: 2,
            explanation: "6 (110) & 3 (011) = 2 (010)。",
            tags: ["位运算", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: "一个数组定义为 int a[5]={1, 2, 3, 4, 5}; ，一个指针定义为 int *p=&a[2]; ，则执行 a[1] = *p; 后，数组a中的值会变为（ ）。",
            options: [
                "{1, 3, 3, 4, 5}",
                "{2, 2, 3, 4, 5}",
                "{1, 2, 2, 4, 5}",
                "{1, 2, 3, 4, 5}",
            ],
            answer: 0,
            score: 2,
            explanation: "*p 是 a[2] 即 3。a[1] 被赋值为 3，所以数组变为 {1, 3, 3, 4, 5}。",
            tags: ["指针数组", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: "以下哪个函数声明在调用时可以传递二维数组的名字作为参数?",
            options: [
                "void BubbleSort(int a[][4]);",
                "void BubbleSort(int a[3][]);",
                "void BubbleSort(int a[][]);",
                "void BubbleSort(int ** a);",
            ],
            answer: 0,
            score: 2,
            explanation: "作为参数的二维数组，除第一维外，其他维度必须固定大小。",
            tags: ["函数参数", "数组", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: "在下列代码的横线处填写（ ），可以使得输出是“20 10”。\nvoid xchg(______) { int t = *x; *x = *y; *y = t; }\nint main() { int a = 10, b = 20; xchg(&a, &b); cout << a << ' ' << b << endl; }",
            options: [
                "int x, int y",
                "int *x, int *y",
                "int a, int b",
                "int & a, int & b",
            ],
            answer: 1,
            score: 2,
            explanation: "调用时传入的是地址 &a, &b，函数内部用了解引用 *x, *y，因此参数应为指针类型。",
            tags: ["指针函数", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: "执行以下C++语言程序后，输出结果是（ ）。\nint main() { int array[3][3]; for(int i=0; i<3; i++) for(int j=0; j<3; j++) array[i][j] = i*10+j; int sum=0; for(int i=0; i<3; i++) sum += array[i][i]; cout << sum << endl; }",
            options: [
                "3",
                "30",
                "33",
                "无法确定",
            ],
            answer: 2,
            score: 2,
            explanation: "累加主对角线元素：array[0][0]=0, array[1][1]=11, array[2][2]=22。0+11+22=33。",
            tags: ["二维数组", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: "在下列代码的横线处填写（ ），完成对有n个int类型元素的数组array由小到大排序。\nvoid SelectionSort(int array[], int n) { int i, j, min, temp; for(i=0; i<n-1; i++) { min = i; for(j=i+1; j<n; j++) if(______) min = j; temp=array[min]; array[min]=array[i]; array[i]=temp; } }",
            options: [
                "array[min] > array[j]",
                "array[min] > array[i]",
                "min > array[j]",
                "min > array[i]",
            ],
            answer: 0,
            score: 2,
            explanation: "选择排序需寻找剩余部分的最小值，如果 array[j] 比当前最小值小，则更新 min 指向 j。",
            tags: ["选择排序", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: "域名是由一串用点分隔的名字来标识互联网上一个计算机或计算机组的名称，CCF编程能力等级认证官方网站的域名是gesp.ccf.org.cn，其中顶级域名是gesp。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "顶级域名（TLD）是域名最后面的部分，如 .cn。gesp 是三级域名。",
            tags: ["计算机网络", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: "斐波那契数列计算体现了递推的编程思想。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "通过已知项推导出未知项，是典型的递推思想。",
            tags: ["编程思想", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: "在C++语言中，函数的参数默认以引用传递方式进行传递。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "C++默认是按值传递（Pass by Value）。",
            tags: ["函数传参", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: "在C++语言中，可以定义四维数组，但在解决实际问题时不可能用到，因为世界是三维的。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "四维及更高维数组在物理模拟、数据科学等领域有广泛应用，并不限于三维现实空间。",
            tags: ["数组基础", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: "在C++语言中，一个函数没有被调用时，它的参数不占用内存。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "参数是函数栈帧的一部分，只有函数被调用（创建栈帧）时才分配内存。",
            tags: ["内存管理", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: "在C++语言中，如果一个函数可能抛出异常，那么一定要在try子句里调用这个函数。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "不强制在 try 中调用，但未捕获的异常会导致程序非正常终止。",
            tags: ["异常处理", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: "如果希望记录10个最长为99字节的字符串，可以将字符串数组定义为 char s[100][10]; 。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "应该是 s[10][100]，第一维是数量，第二维是长度（含结尾符）。",
            tags: ["字符串数组", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: "字符常量 '@' 和 \"\\0\" 是等价的。",
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "前者是字符常量（ASCII 64），后者是包含空字符的字符串常量。",
            tags: ["字符常量", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: ">= 和 >>= 都是C++语言的运算符。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: ">= 是大于等于，>>= 是右移赋值。",
            tags: ["运算符", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: "由于文件重定向操作，程序员在使用C++语言编写程序时无法确定通过cout输出的内容是否会被输出到屏幕上。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "重定向是在外部控制的，程序运行时内部通过标准流输出，无法预知最终流向（屏幕、文件或管道）。",
            tags: ["输入输出", "判断题", "GESP4级"]
        }
    ]
};
