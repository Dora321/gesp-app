// 2023年6月 GESP C++ 四级真题
export const paperData = {
    id: '2023-06-l4',
    title: '2023年6月 GESP C++ 四级真题',
    level: 4,
    year: 2023,
    month: 6,
    session: 2,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: `高级语言编写的程序需要经过以下（ ）操作，可以生成在计算机上运行的可执行代码。`,
            options: [
                "编辑",
                "保存",
                "调试",
                "编译",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (编译)**

**选项逐项分析：**
- **A 编辑**：❌ 错误。编写代码的过程，并不产生可执行代码。
- **B 保存**：❌ 错误。将代码存入磁盘，并不产生可执行代码。
- **C 调试**：❌ 错误。查找和修复程序错误的过程。
- **D 编译**：✅ 正确。编译器将高级语言源代码转换为计算机硬件能够直接理解和执行的机器语言（二进制代码）或中间代码。

**考点：** 编程的基本流程（编辑、编译、连接、运行）。`,
            tags: ["编程环境", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: `排序算法是稳定的(Stable Sorting)，就是指排序算法可以保证，在待排序数据中有两个相等记录的关键字R和S(R出现在S之前)，在排序后的列表中R也一定在S前。下面关于排序稳定性的描述，正确的是（ ）。`,
            options: [
                "冒泡排序是不稳定的",
                "插入排序是不稳定的",
                "选择排序是不稳定的",
                "以上都不正确",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (选择排序是不稳定的)**

**选项逐项分析：**
- **A 冒泡排序是不稳定的**：❌ 错误。冒泡排序通过相邻交换，且只有在左边大于右边时才交换，因此它是稳定的。
- **B 插入排序是不稳定的**：❌ 错误。插入排序在找到合适位置后插入，相同元素的相对位置不会改变，因此它是稳定的。
- **C 选择排序是不稳定的**：✅ 正确。在选择最小元素并进行长距离交换时，可能会破坏相同元素的相对位置。
- **D 以上都不正确**：❌ 错误。

**考点：** 常见排序算法（冒泡、插入、选择）的稳定性。`,
            tags: ["排序算法", "稳定性", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: `下列关于C++语言中指针的叙述，不正确的是（ ）。`,
            options: [
                "指针变量中存储的是内存地址。",
                "定义指针变量时必须指定其指向的类型。",
                "指针变量只能指向基本类型变量，不能指向指针变量。",
                "指针变量指向的内存地址不一定能够合法访问。",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (指针变量只能指向基本类型变量，不能指向指针变量。)**

**选项逐项分析：**
- **A 指针变量中存储的是内存地址**：✅ 正确。指针的物理本质就是保存另一个内存单元的编号（即地址）。
- **B 定义指针变量时必须指定其指向的类型**：✅ 正确。类型决定了指针在解引用时读取的字节数以及指针运算（如 \`p++\`）时的位移量。
- **C 只能指向基本类型变量**：❌ 错误。指针可以指向任何合法数据结构，包括数组、结构体、类，甚至是另一个指针（即二级指针）。
- **D 指针变量指向的内存地址不一定能够合法访问**：✅ 正确。例如空指针、已释放的悬空指针或未初始化的野指针，访问它们会导致崩溃。

**考点：** C++ 指针的定义、特性与多级指针。`,

            tags: ["指针", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: `下列关于C++语言中数组的叙述，不正确的是（ ）。`,
            options: [
                "一维数组在内存中一定是连续存放的。",
                "二维数组是一维数组的一维数组。",
                "二维数组中的每个一维数组在内存中都是连续存放的。",
                "二维数组在内存中可以不是连续存放的。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (二维数组在内存中可以不是连续存放的。)**

**选项逐项分析：**
- **A 一维数组在内存中一定是连续存放的**：✅ 正确。这是数组最基本的特征，保证了寻址效率。
- **B 二维数组是一维数组的一维数组**：✅ 正确。在逻辑和实现上，二维数组就是嵌套的一维数组。
- **C 二维数组中的每个一维数组在内存中都是连续存放的**：✅ 正确。每行作为一个独立的子数组，内部必然连续。
- **D 二维数组在内存中可以不是连续存放的**：❌ 错误。在 C++ 中，无论是静态定义还是堆上连续申请的数组，在物理内存中都是严格连续排列的。

**考点：** 数组在内存中的物理存储特性。`,

            tags: ["数组", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: `下列关于C++语言中函数的叙述，正确的是（ ）。`,
            options: [
                "函数必须有名字。",
                "函数必须有参数。",
                "函数必须有返回值。",
                "函数定义必须写在函数调用前。",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (函数必须有名字。)**

**选项逐项分析：**
- **A 函数必须有名字**：✅ 正确（匿名函数/Lambda 表达式在特定语境下存在，但在传统函数定义考点中，函数名是必选的标识符）。
- **B 函数必须有参数**：❌ 错误。可以定义无参函数，如 \`void func()\`。
- **C 函数必须有返回值**：❌ 错误。\`void\` 类型函数没有返回值。
- **D 函数定义必须写在函数调用前**：❌ 错误。可以先声明，后定义。

**考点：** 函数的基础组成部分（名、参、返、体）。`,
            tags: ["函数", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: `下列关于C++语言中变量的叙述，正确的是（ ）。`,
            options: [
                "变量定义后可以一直使用。",
                "两个变量的变量名不能是相同的。",
                "两个变量的变量名可以相同，但它们的类型必须是不同的。",
                "两个变量的变量名可以相同，但它们的作用域必须是不同的。",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (两个变量的变量名可以相同，但它们的作用域必须是不同的。)**

**选项逐项分析：**
- **A 变量定义后可以一直使用**：❌ 错误。变量的使用受到其生命周期（Lifetime）和作用域（Scope）的限制。
- **B 两个变量的变量名不能是相同的**：❌ 错误。
- **C 两个变量的变量名可以相同，但它们的类型必须是不同的**：❌ 错误。
- **D 两个变量的变量名可以相同，但它们的作用域必须是不同的**：✅ 正确。例如，一个函数内部定义的局部变量可以与全局变量重名（此时局部变量会“遮蔽”全局变量），或者两个不同函数内部可以定义同名变量。

**考点：** 变量的作用域（Scope）与标识符重名规则。`,
            tags: ["变量作用域", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: `一个二维数组定义为 double array[3][10]; ，则这个二维数组占用内存的大小为（ ）。`,
            options: [
                "30",
                "60",
                "120",
                "240",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (240)**

**选项逐项分析：**
- **A 30**：❌ 错误。这是元素的总个数（$3 \times 10 = 30$），而非字节数。
- **B 60**：❌ 错误。若 \`double\` 占用 2 字节（实际上 \`short\` 是 2 字节），结果为此。
- **C 120**：❌ 错误。若 \`double\` 占用 4 字节（实际上 \`float\` 是 4 字节），结果为此。
- **D 240**：✅ 正确。总大小 = 元素个数 (30) $\times$ \`sizeof(double)\` (8 字节) = 240 字节。

**考点：** 数组内存占用计算公式。`,

            tags: ["数组内存", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: `一个变量定义为 int *p = nullptr; ，则下列说法正确的是（ ）。`,
            options: [
                "该指针变量的类型为int。",
                "该指针变量指向的类型为int。",
                "该指针变量指向的内存地址是随机的。",
                "访问该指针变量指向的内存会出现编译错误。",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (该指针变量指向的类型为int。)**

**选项逐项分析：**
- **A 该指针变量的类型为int**：❌ 错误。变量 \`p\` 的类型是 \`int*\`（指向整型的指针）。
- **B 该指针变量指向的类型为int**：✅ 正确。定义 \`int *p\` 表示 \`p\` 是一个指向 \`int\` 数据的指针。
- **C 该指针变量指向的内存地址是随机的**：❌ 错误。\`nullptr\`（或 NULL）表示空指针，指向地址 0，这是一个明确的、不可访问的地址，而非随机地址。
- **D 访问该指针变量指向的内存会出现编译错误**：❌ 错误。解引用空指针会导致**运行时错误**（如段错误），但语法检查时通常不报编译错误。

**考点：** 指针的基础概念及 \`nullptr\` 的含义。`,
            tags: ["指针", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: `一个二维数组定义为 int array[5][3]; ，则 array[1][2] 和 array[2][1] 在内存中的位置相差多少字节?`,
            options: [
                "2字节",
                "4字节",
                "8字节",
                "无法确定",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (8字节)**

**选项逐项分析：**
- **A 2字节**：❌ 错误。
- **B 4字节**：❌ 错误。仅为 1 个 \`int\` 元素的跨度。
- **C 8字节**：✅ 正确。\`array[1][2]\` 与 \`array[2][1]\` 之间隔了 \`array[2][0]\` 和 \`array[2][1]\` 自身（即 2 个 \`int\` 元素），距离为 $2 \times 4 = 8$ 字节。
- **D 无法确定**：❌ 错误。静态定义的二维数组布局是确定的。

**考点：** 二维数组在内存中的行优先偏移量计算。`,

            tags: ["数组内存", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: `如果a为int类型的变量，且a的值为6，则执行 a &= 3; 之后，a的值会是（ ）。`,
            options: [
                "3",
                "9",
                "2",
                "7",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (2)**

**选项逐项分析：**
- **A 3**：❌ 错误。
- **B 9**：❌ 错误。
- **C 2**：✅ 正确。\`6\` 的二进制是 \`110\`，\`3\` 的二进制是 \`011\`。执行按位与（&）运算：每一位都为 1 才得 1。对应的位：1&0=0, 1&1=1, 0&1=0。结果为 \`010\`，即十进制的 2。
- **D 7**：❌ 错误。这是按位或（|）运算的结果。

**考点：** 位运算符 & 的逻辑运算规则。`,

            tags: ["位运算", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: `一个数组定义为 int a[5]={1, 2, 3, 4, 5}; ，一个指针定义为 int *p=&a[2]; ，则执行 a[1] = *p; 后，数组a中的值会变为（ ）。`,
            options: [
                "{1, 3, 3, 4, 5}",
                "{2, 2, 3, 4, 5}",
                "{1, 2, 2, 4, 5}",
                "{1, 2, 3, 4, 5}",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A ({1, 3, 3, 4, 5})**

**选项逐项分析：**
- **A {1, 3, 3, 4, 5}**：✅ 正确。指针 \`p\` 指向 \`a[2]\`（值为 3），\`a[1] = *p\` 将 3 赋给 \`a[1]\`。
- **B {2, 2, 3, 4, 5}**：❌ 错误。数组的首元素 \`a[0]\` 依然是 1，未发生变化。
- **C {1, 2, 2, 4, 5}**：❌ 错误。\`a[2]\` 的值未发生变化，依然是 3。
- **D {1, 2, 3, 4, 5}**：❌ 错误。这是原始数组，未反映赋值操作。

**考点：** 指针指向数组元素及解引用赋值逻辑。`,


            tags: ["指针数组", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: `以下哪个函数声明在调用时可以传递二维数组的名字作为参数?`,
            options: [
                "void BubbleSort(int a[][4]);",
                "void BubbleSort(int a[3][]);",
                "void BubbleSort(int a[][]);",
                "void BubbleSort(int ** a);",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (void BubbleSort(int a[][4]);)**

**选项逐项分析：**
- **A void BubbleSort(int a[][4]);**：✅ 正确。在 C++ 中，作为函数参数的多维数组，除了最左边的一维可以省略大小外，其余各维都必须指明大小。
- **B void BubbleSort(int a[3][]);**：❌ 错误。必须指定列数。
- **C void BubbleSort(int a[][]);**：❌ 错误。必须指定列数。
- **D void BubbleSort(int ** a);**：❌ 错误。虽然 \`int**\` 是指向指针的指针，但它不能直接接收二维数组名（二维数组名在传递时退化为指向其第一行数组的指针，类型为 \`int(*)[N]\`，与 \`int**\` 不兼容）。

**考点：** 二维数组作为函数参数的语法规则。`,
            tags: ["函数参数", "数组", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: `在下列代码的横线处填写（ ），可以使得输出是“20 10”。\nvoid xchg(______) { int t = *x; *x = *y; *y = t; }\nint main() { int a = 10, b = 20; xchg(&a, &b); cout << a << ' ' << b << endl; }`,
            options: [
                "int x, int y",
                "int *x, int *y",
                "int a, int b",
                "int & a, int & b",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (int *x, int *y)**

**选项逐项分析：**
- **A int x, int y**：❌ 错误。值传递无法修改实参的值。
- **B int *x, int *y**：✅ 正确。
  1. 调用处 \`xchg(&a, &b);\` 传入的是变量的地址。
  2. 函数内部使用了解引用操作 \`*x, *y\`。
  3. 通过指针交换地址对应的值，实现了实参 \`a\` 和 \`b\` 的交换。
- **C / D**：❌ 错误。

**考点：** 函数参数的传递方式（指针传递）与解引用。`,
            tags: ["指针函数", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: `执行以下C++语言程序后，输出结果是（ ）。\nint main() { int array[3][3]; for(int i=0; i<3; i++) for(int j=0; j<3; j++) array[i][j] = i*10+j; int sum=0; for(int i=0; i<3; i++) sum += array[i][i]; cout << sum << endl; }`,
            options: [
                "3",
                "30",
                "33",
                "无法确定",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (33)**

**选项逐项分析：**
- **A 3 / B 30**：❌ 错误。未正确计算对角线累加值。
- **C 33**：✅ 正确。
  1. 数组初始化：\`array[i][j] = i*10+j\`。
  2. 对角线元素：\`array[0][0]=0\`, \`array[1][1]=11\`, \`array[2][2]=22\`。
  3. 累加结果：\`sum = 0 + 11 + 22 = 33\`。
- **D 无法确定**：❌ 错误。

**考点：** 二维数组对角线遍历与索引逻辑。`,

            tags: ["二维数组", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: `在下列代码的横线处填写（ ），完成对有n个int类型元素的数组array由小到大排序。\nvoid SelectionSort(int array[], int n) { int i, j, min, temp; for(i=0; i<$n-1$; i++) { min = i; for(j=i+1; j<n; j++) if(______) min = j; temp=array[min]; array[min]=array[i]; array[i]=temp; } }`,
            options: [
                "array[min] > array[j]",
                "array[min] > array[i]",
                "min > array[j]",
                "min > array[i]",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (array[min] > array[j])**

**选项逐项分析：**
- **A array[min] > array[j]**：✅ 正确。选择排序核心是每轮找最小值。若当前元素 \`array[j]\` 小于已记录的最小值 \`array[min]\`，则更新 \`min\` 下标。
- **B array[min] > array[i]**：❌ 错误。与外层索引比较无意义。
- **C min > array[j]** / **D min > array[i]**：❌ 错误。下标不能直接与数组元素值比较。

**考点：** 选择排序（Selection Sort）算法逻辑。`,

            tags: ["选择排序", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: `域名是由一串用点分隔的名字来标识互联网上一个计算机或计算机组的名称，CCF编程能力等级认证官方网站的域名是gesp.ccf.org.cn，其中顶级域名是gesp。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
域名层级是从右向左增加的。在 \`gesp.ccf.org.cn\` 中：
1.  顶级域名（TLD）是最右边的 \`.cn\`。
2.  \`org.cn\` 是二级域名。
3.  \`ccf.org.cn\` 是三级域名。
4.  \`gesp\` 是四级域名（子域名）。

**考点：** 计算机网络基础中的域名结构。`,
            tags: ["计算机网络", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `斐波那契数列计算体现了递推的编程思想。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
斐波那契数列的定义 $F(n) = F(n-1) + F(n-2)$ 是一种典型的**递推关系**。在编程中，可以通过已知的前两项逐项向后计算出后面的所有项。

**考点：** 递推（Iterative/Inductive）编程思想。`,
            tags: ["编程思想", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `在C++语言中，函数的参数默认以引用传递方式进行传递。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在 C++ 语言中，默认的参数传递方式是**按值传递**（Pass by Value）。这意味着函数会接收到实参的一个副本。如果需要以引用方式传递，必须显式地使用引用符号 \`&\`（例如 \`void func(int &x)\`）。

**考点：** C++ 函数参数传递机制。`,
            tags: ["函数传参", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `在C++语言中，可以定义四维数组，但在解决实际问题时不可能用到，因为世界是三维的。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
虽然我们生活的物理空间是三维的，但计算机科学中的“维度”是指数据组织的层级。多维数组（如四维、五维甚至更高维）在处理科学计算（如随时间变化的空间体数据）、高维数学矩阵或机器学习特征空间时具有非常重要的应用价值，且在 C++ 中是完全合法的。

**考点：** 高维数组的定义与应用场景。`,
            tags: ["数组基础", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: `在C++语言中，一个函数没有被调用时，它的参数不占用内存。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
函数的参数（局部变量）通常是在函数被调用时，通过在**栈**（Stack）上分配对应的**栈帧**（Stack Frame）来实现的。如果函数从未被调用，其栈帧也就不会被创建，自然不会占用运行时的内存资源。

**考点：** 函数调用时的内存管理（栈分配）。`,
            tags: ["内存管理", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `在C++语言中，如果一个函数可能抛出异常，那么一定要在try子句里调用这个函数。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
在 C++ 中，并不强制要求所有可能抛出异常的函数调用都必须放在 \`try\` 子句中。如果不使用 \`try-catch\` 结构，异常会逐层向上抛出，直到被处理或导致程序非正常终止（运行时错误）。这在语法上是完全合法的。

**考点：** C++ 异常处理的捕获规则。`,
            tags: ["异常处理", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: `如果希望记录10个最长为99字节的字符串，可以将字符串数组定义为 char s[100][10]; 。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
要存储 10 个字符串，第一维应该是 10。要存储最长 99 字节的字符串，加上结尾空字符 \`\\0\`，第二维至少应该是 100。
因此，正确的定义应为 \`char s[10][100];\`。而题目给出的 \`char s[100][10];\` 表示定义了 100 个长度仅为 10 的字符串。

**考点：** 二维字符数组定义字符串数组的行列含义。`,
            tags: ["字符串数组", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: `字符常量 '@' 和 "\\0" 是等价的。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1.  \`'@'\` 是一个字符常量（Character Constant），在 ASCII 码中对应数值 64。
2.  \`"\\0"\` 是一个字符串常量（String Literal），它由两个字节组成：第一个是空字符 \`\\0\`（ASCII 0），第二个是字符串自动添加的终止符 \`\\0\`。
两者在类型、存储空间和对应的数值含义上都完全不同。

**考点：** 字符常量与字符串常量的区别。`,
            tags: ["字符常量", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `>= 和 >>= 都是C++语言的运算符。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  \`>=\`：是“大于或等于”关系运算符。
2.  \`>>=\`：是“右移赋值”复合运算符（例如 \`a >>= 1\` 等价于 \`a = a >> 1\`）。
两者都是 C++ 标准中的合法运算符。

**考点：** C++ 常用运算符识别。`,
            tags: ["运算符", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: `由于文件重定向操作，程序员在使用C++语言编写程序时无法确定通过cout输出的内容是否会被输出到屏幕上。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
文件重定向（Redirection）是由操作系统环境（如 Command Prompt 或 Shell）控制的。当用户在外部通过 \`program.exe > output.txt\` 运行时，原本应输出到屏幕的 \`cout\` 流会被截获并转向到文件。从程序员编写代码的角度看，无法确切知道最终用户是在控制台直接运行还是使用了重定向。

**考点：** 标准 I/O 流与操作系统重定向机制。`,
            tags: ["输入输出", "判断题", "GESP4级"]
        }
    ]
};

const programmingQuestions = [
    {
      id: 26,
      type: 'programming',
      samples: [
        {
          input: `2
16347
76344`,
          output: `T
F`
        }
      ],
      question: `
# [GESP202306 四级] 幸运数

## 题目描述

小明发明了一种“幸运数”。一个正整数从个位开始编号，第 1、3、5... 位上的数字都要做一次变换，第 2、4、6... 位上的数字保持不变。

对奇数位上的数字 $t$，变换规则为：

- 先计算 $t \\times 7$；
- 如果结果不大于 $9$，就把它作为变换结果；
- 否则不断把各位数字相加，直到结果不大于 $9$。

把所有数位处理完成后，再将最终各位数字求和；如果这个和是 $8$ 的倍数，则称原数是幸运数。

## 输入格式

第一行一个正整数 $N$，表示待判断的整数个数。 
接下来 $N$ 行，每行一个正整数 $x$。

## 输出格式

输出 $N$ 行。若对应整数是幸运数，输出 \`T\`；否则输出 \`F\`。
`,
      score: 25,
      answer: '',
      explanation: `**解析：**
本题考察对数位提取和规则模拟。
1.  **数位提取**：通过 \`x % 10\` 获取个位，\`x / 10\` 舍弃个位，从而从右向左（个位开始）遍历所有数位。
2.  **奇偶位识别**：编号从 1 开始。奇数位（1, 3, 5...）需要变换，偶数位（2, 4, 6...）保持不变。
3.  **变换规则**：
    - 计算 $t \times 7$。
    - 如果结果 $> 9$，不断将各位数字相加直至 $\le 9$。
    *(技巧：一个数不断各位相加的结果，等价于该数对 9 取模的结果（若余数为 0 则结果为 9）。公式为 \`(n-1)%9 + 1\`。)*
4.  **校验**：最后求和并判断是否为 8 的倍数。

**核心逻辑提示：**
\`\`\`cpp
int trans(int t) {
    int res = t * 7;
    while (res > 9) {
        int sum = 0;
        while (res > 0) { sum += res % 10; res /= 10; }
        res = sum;
    }
    return res;
}
// 遍历 x 的每一位，判断奇偶位并累加变换后的值
\`\`\``,
      tags: ['编程题', '模拟'],
      template: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 在此编写代码
    return 0;
}`,
      referenceCode: `#include <iostream>
using namespace std;

int trans(int t) {
    if (t == 0) return 0;
    return (t * 7 - 1) % 9 + 1;
}

bool judge(long long x) {
    int sum = 0;
    for (int d = 1; x > 0; d++, x /= 10) {
        int t = static_cast<int>(x % 10);
        if (d % 2 == 0) sum += t;
        else sum += trans(t);
    }
    return sum % 8 == 0;
}

int main() {
    int n;
    cin >> n;
    while (n--) {
        long long x;
        cin >> x;
        cout << (judge(x) ? "T" : "F") << "\n";
    }
    return 0;
}`,
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        {
          input: `10
00FFCFAB00FFAC09071B5CCFAB76
00AFCBAB11FFAB09981D34CFAF56
01BFCEAB00FFAC0907F25FCFBA65
10FBCBAB11FFAB09981DF4CFCA67
00FFCBFB00FFAC0907A25CCFFC76
00FFCBAB1CFFCB09FC1AC4CFCF67
01FCCBAB00FFAC0F071A54CFBA65
10EFCBAB11FFAB09981B34CFCF67
01FFCBAB00FFAC0F071054CFAC76
1000CBAB11FFAB0A981B84CFCF66`,
          output: `ABCFFF00CB09AC07101198011B6776FC
321032657CD10E
36409205ACC16D
B41032657FD16D
8F409205ACF14D
324F326570D1FE
3240C245FC411D
BF4032687CD16D
8F409205ACC11D
B240326878D16E
83409205ACE11D`
        }
      ],
      question: `
# [GESP202306 四级] 图像压缩

## 题目描述

给定一幅 256 级灰度图像，其中每个像素都用两位十六进制数表示，范围从 \`00\` 到 \`FF\`。

现在需要把它压缩为 16 级灰度图，规则如下：

- 先统计整幅图中每种灰度出现的次数；
- 选出出现次数最多的 16 种灰度，按“出现次数从多到少、灰度值从小到大”的规则编号为 \`0\` 到 \`F\`；
- 其他灰度映射到这 16 种灰度中“最接近”的一种；若距离相同，则选择编号更小的那种。

## 输入格式

第一行一个正整数 $N$，表示图像共有 $N$ 行。 
接下来 $N$ 行，每行是一个长度为偶数的十六进制字符串，每两位表示一个像素。

## 输出格式

第一行输出被选中的 16 种灰度的十六进制编码，共 32 个字符。 
随后输出压缩后的图像，每个像素用一位十六进制数表示。
`,
      score: 25,
      answer: '',
      explanation: `**解析：**
本题考察统计、排序与映射模拟。
1.  **统计频次**：使用数组 \`cnt[256]\` 统计每种灰度（00-FF）出现的次数。
2.  **筛选前 16 种**：
    - 将所有出现的灰度按“频次从多到少”排序。
    - 频次相同时，按“灰度值从小到大”排序。
    - 选出前 16 种作为“代表色”，编号 0-F。
3.  **映射转换**：
    - 遍历原图每个像素。
    - 在 16 种代表色中找到与其差值绝对值最小的（最近的）。
    - 若距离相同，选编号更小的。
4.  **十六进制输出**：注意格式化输出。

**核心逻辑提示：**
\`\`\`cpp
// 结构体存储灰度信息
struct Node { int val, count, id; }; 
// 排序规则
bool cmp(Node a, Node b) {
    if (a.count != b.count) return a.count > b.count;
    return a.val < b.val;
}
// 映射函数
int findNearest(int target, int color[]) {
    int min_dist = 1000, best_id = 0;
    for (int i = 0; i < 16; i++) {
        int d = abs(target - color[i]);
        if (d < min_dist) { min_dist = d; best_id = i; }
    }
    return best_id;
}
\`\`\``,
      tags: ['编程题', '模拟', '字符串', '统计'],
      template: `#include <iostream>
#include <cstring>
using namespace std;

int main() {
    int n;
    cin >> n;
    // 在此编写代码
    return 0;
}`,
      referenceCode: `#include <iostream>
#include <cstring>
using namespace std;

int image[20][20];
int cpimg[20][20];
int his[256];
int color[16];

int trans(char a) {
    if (a <= '9') return a - '0';
    return a - 'A' + 10;
}

char itrans(int n) {
    if (n >= 10) return static_cast<char>(n - 10 + 'A');
    return static_cast<char>(n + '0');
}

int compress(int c) {
    int dis = 256, res = -1;
    for (int i = 0; i < 16; i++) {
        int d = c - color[i];
        if (d < 0) d = -d;
        if (d < dis) {
            dis = d;
            res = i;
        }
    }
    return res;
}

int main() {
    int n = 0, m = 0;
    cin >> n;
    memset(his, 0, sizeof(his));
    for (int i = 0; i < n; i++) {
        char line[50];
        cin >> line;
        m = static_cast<int>(strlen(line)) / 2;
        for (int j = 0; j < m; j++) {
            int c = trans(line[j * 2]) * 16 + trans(line[j * 2 + 1]);
            image[i][j] = c;
            his[c]++;
        }
    }
    for (int c = 0; c < 16; c++) {
        int mx = -1, mx_id = -1;
        for (int i = 0; i < 256; i++) {
            if (his[i] > mx) {
                mx = his[i];
                mx_id = i;
            }
        }
        color[c] = mx_id;
        his[mx_id] = -1;
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cpimg[i][j] = compress(image[i][j]);
        }
    }
    for (int c = 0; c < 16; c++) {
        cout << itrans(color[c] / 16) << itrans(color[c] % 16);
    }
    cout << "\n";
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cout << itrans(cpimg[i][j]);
        }
        cout << "\n";
    }
    return 0;
}`,
    }
];

paperData.questions.push(...programmingQuestions);
