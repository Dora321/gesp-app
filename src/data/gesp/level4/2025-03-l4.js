// 2025年3月 GESP C++ 四级真题
export const paperData = {
    id: '2025-03-l4',
    title: '2025年3月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 3,
    session: 9,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: `关于下述代码，说法错误的是（ ）。\n\`\`\`cpp\nint multiply(int x, int y);\nint main() {\n int a = 4;\n int b = 5;\n int result = multiply(a, b);\n std::cout << "The result is: " << result << std::endl;\n return 0;\n}\nint multiply(int x, int y) {\n return x * y;\n}\n\`\`\``,
            options: ["函数multiply的定义应该放到函数main之前。","函数声明int multiply(int x, int y);中明确指定了函数multiply()的返回值为整数类型。","在main函数中，函数multiply通过multiply(a, b)被调用，其中a和b是定义在main函数中的变量，它们作为实参传递给了multiply函数的形参x 和 y。","运行上述代码，将输出The result is: 20。"],
            answer: 0,
            score: 2,
            explanation: `**答案：不正确的是 A（函数multiply的定义应该放到函数main之前）**

**核心解析：**
在 C++ 中，编译遵循「先声明、后使用」的原则。函数的结构主要由**声明（原型）**与**定义（实现）**两部分组成：
1. **函数声明**：如第 1 行的 \`int multiply(int x, int y);\`，用来告诉编译器函数的名称、返回值类型以及参数列表（参数个数与类型）。只要在调用前完成声明，编译器就能校验调用的合法性。
2. **函数定义**：如第 9–11 行，包含函数体的具体代码，用来实现算法逻辑。

本题代码在第 1 行已经给出了函数的前向声明，因此编译器在扫描到第 5 行 \`multiply(a, b)\` 调用时，已知该函数的接口规则，可以正常编译通过。函数的完整定义放在 \`main\` 函数之后是完全合法的，并不需要移到 \`main\` 函数之前。

**选项逐项分析：**
- **A 函数multiply的定义应该放到函数main之前**：❌ 说法错误。代码第 1 行已给出函数声明，因此函数定义可以放在 \`main\` 函数之后，程序能正常编译和运行。本题要求选出说法错误的选项，因此 A 符合题意。
- **B 函数声明int multiply(int x, int y);中明确指定了函数multiply()的返回值为整数类型**：✅ 说法正确。声明最开头的类型标识符 \`int\`，明确指定了该函数执行完毕后的返回值类型为整型。
- **C 在main函数中，函数multiply通过multiply(a, b)被调用，其中a和b是定义在main函数中的变量，它们作为实参传递给了multiply函数的形参x and y**：✅ 说法正确。在 \`main\` 函数调用时，变量 \`a\` 和 \`b\` 作为实际参数（实参），其值按值传递复制给了 \`multiply\` 函数的形式参数（形参）\`x\` 和 \`y\`。
- **D 运行上述代码，将输出The result is: 20**：✅ 说法正确。\`multiply(4, 5)\` 计算返回 \`4 * 5 = 20\`，变量 \`result\` 接收返回值后由 \`std::cout\` 输出，结果为 \`The result is: 20\`。

**易错提醒：**
- 容易混淆「声明」和「定义」：声明仅告诉编译器函数的接口规格（末尾有分号，无函数体花括号 \`{}\`）；定义才是包含算法逻辑的完整代码。
- 初学者常误以为所有函数都必须写在 \`main\` 之前。实际上只要在调用点前写了声明，定义放在代码后方或其它代码文件中都是合法的。

**知识延伸：**
声明与定义分离是 C++ 大型工程模块化的基础。在实际项目中，通常把声明写在头文件（\`.h\` 或 \`.hpp\`）中，把具体定义写在源文件（\`.cpp\`）中。调用者只需包含头文件即可调用，有助于提高编译效率和代码组织结构。`,
            tags: ["客观题", "单选题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "reviewedFields": ["options","reviewedBy","reviewedAt"]
        },
        {
            id: 2,
            type: "single",
            question: `执行下述代码将输出（ ）。\n\`\`\`cpp\nint x = 10;\nvoid func() {\n int x = 20;\n std::cout << x;\n}\nint main() {\n func();\n std::cout << x;\n return 0;\n}\n\`\`\``,
            options: [
                "2020",
                "2010",
                "1010",
                "编译错误",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：B（2010）**\n\n本题考查变量作用域中的**遮蔽效应**（Shadowing）。代码中存在两个名为 `x` 的变量：全局变量（值为 10）和 `func()` 内的局部变量（值为 20），它们是两个不同的变量，占用不同的内存位置。\n\n执行过程：\n1. 定义全局变量 `int x = 10;`。\n2. 调用 `func()`：函数内部定义局部变量 `int x = 20;`。在 `func()` 内部，作用域由内向外查找，`std::cout << x` 访问的是局部变量，因此先输出 20。这一操作不会修改全局变量。\n3. 回到 `main()`：`main` 中没有定义局部变量 `x`，`std::cout << x` 访问全局变量，输出 10。\n\n综合输出顺序：先 20 后 10，结果为 **2010**。\n\n**选项逐项分析：**\n- **A 2020**：❌ 错误。`func()` 确实输出 20，但 `main` 中的 `x` 是全局变量 10。\n- **B 2010**：✅ 正确。\n- **C 1010**：❌ 错误。`func()` 内访问的是遮蔽后的局部变量 20，不是全局变量。\n- **D 编译错误**：❌ 错误。局部变量与全局变量同名是合法的变量遮蔽，可以正常编译运行。\n\n**易错提醒：**\n- 不要误以为 `func()` 修改了全局变量：其内部的 `x` 是独立的局部变量，全局变量的值始终为 10。\n- 局部变量只在其所属大括号范围内有效，离开作用域即销毁。\n\n**知识延伸：**\n若需要在 `func()` 内访问全局变量，可使用作用域解析运算符 `::x`（如 `std::cout << ::x;`）。\n\n**考点：** 变量的作用域（全局变量与局部变量）、变量遮蔽效应。",
            tags: ["客观题", "单选题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"]
        },
        {
            id: 3,
            type: "single",
            question: `执行下述代码后，变量a的值为（ ）。\n\`\`\`cpp\nint a = 10;\nint* p = &a;\n*p = 20;\n\`\`\``,
            options: [
                "10",
                "20",
                "随机值",
                "编译错误",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (20)**

**核心解析：**
本题考查指针的**解引用赋值**操作。代码分为三步：

1. \`int a = 10;\`
   - 在栈上分配一个 \`int\` 类型的变量 \`a\`，初始值为 10。

2. \`int* p = &a;\`
   - 定义一个指向 \`int\` 的指针 \`p\`。
   - \`&a\` 是取地址运算符，获取变量 \`a\` 的内存地址。
   - 将该地址赋值给 \`p\`，此时 \`p\` 指向变量 \`a\`。

3. \`*p = 20;\`
   - \`*p\` 是解引用操作符，访问指针 \`p\` 所指向的内存位置（即变量 \`a\` 所在的地址）。
   - 通过解引用，将该内存位置的值从 10 修改为 20。
   - 由于 \`p\` 指向的就是 \`a\` 的地址，因此 \`a\` 的值被修改为 20。

最终变量 \`a\` 的值为 **20**。

**选项逐项分析：**
- **A 10**：❌ 错误。虽然 \`a\` 初始值为 10，但第 3 行通过指针修改了其值。
- **B 20**：✅ 正确。\`*p = 20\` 通过解引用直接修改了 \`a\` 的值为 20。
- **C 随机值**：❌ 错误。指针 \`p\` 被明确赋值为 \`&a\`，指向的是确定的有效地址（变量 \`a\` 的地址），不存在野指针问题，结果是确定的 20。
- **D 编译错误**：❌ 错误。代码语法完全正确，可以正常编译运行。

**易错提醒：**
- 区分 \`*p\` 的两种含义：在声明中 \`int* p\` 表示 \`p\` 是指针类型；在表达式中 \`*p\` 表示解引用操作。
- \`int* p = &a;\` 中，\`p\` 存储的是地址值（一个整数），但类型是指向 \`int\` 的指针；\`*p\` 才是访问它指向的 \`int\` 值。

**知识延伸：**
指针本质上存储的是内存地址。通过指针修改内存中的值是 C/C++ 中高效的操作方式，广泛应用于数组遍历、数据结构（如链表、树）和函数参数传递等场景。指针与数组名在很多情况下可以互换使用，但指针更灵活（可以移动），数组名是常量指针。

**考点：** 指针的定义、取值运算符 \`&\`、解引用运算符 \`*\`、通过指针修改变量值。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: `以下哪种参数传递方式可以避免拷贝大型对象？`,
            options: [
                "只能用值传递",
                "只能用引用传递",
                "只能用指针传递",
                "引用传递和指针传递均可",
            ],
            answer: 3,
            score: 2,
            explanation: "**答案：D（引用传递和指针传递均可）**\n\n**值传递**：形参是实参的副本，传递时复制整个对象。对大型对象（如大数组、大结构体）复制的时间和内存开销都较大，且在函数内修改形参不影响外部变量。\n\n**引用传递**：如 `void f(T& obj)`，形参是实参的别名，与实参共享同一对象；底层只需传递一个地址，不复制对象本身。\n\n**指针传递**：如 `void f(T* ptr)`，传递的是实参的地址，同样只复制一个指针值（通常 4 或 8 字节），不复制所指向的大型对象。\n\n因此引用传递和指针传递都能避免拷贝大型对象。\n\n**选项逐项分析：**\n- **A 只能用值传递**：❌ 错误。值传递恰恰需要复制整个对象，无法避免拷贝。\n- **B 只能用引用传递**：❌ 错误。指针传递同样可以避免拷贝。\n- **C 只能用指针传递**：❌ 错误。引用传递同样可以避免拷贝。\n- **D 引用传递和指针传递均可**：✅ 正确。两者都只传递地址，不复制大型对象。\n\n**易错提醒：**\n- 引用传递通过别名直接操作，指针传递需解引用，语法不同，但两者都只传地址。\n- 若不需要在函数内修改实参，建议使用 `const T&`，既避免拷贝又防止意外修改。\n- 对 `int`、`double` 等小型对象，值传递开销可忽略，语义更清晰。\n\n**知识延伸：**\nC++11 引入移动语义与右值引用（`T&&`），对临时对象可以“移动”而非“拷贝”，进一步减少不必要的复制开销。\n\n**考点：** C++ 参数传递机制（值传递、引用传递、指针传递）与性能。",
            tags: ["客观题", "单选题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 2,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"]
        },
        {
            id: 5,
            type: "single",
            question: `执行下述代码，将输出（ ）。\n\`\`\`cpp\nvoid swap(int a, int &b) {\n int temp = a;\n a = b;\n b = temp;\n}\nint main() {\n int x = 1, y = 2;\n swap(x, y);\n std::cout << x << y;\n return 0;\n}\n\`\`\``,
            options: [
                "12",
                "21",
                "22",
                "11",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (11)**

**核心解析：**
本题考查**混合参数传递方式**：值传递与引用传递的区别。\`swap\` 函数的声明为 \`void swap(int a, int &b)\`，第一个参数是值传递，第二个参数是引用传递。

逐步执行分析：
1. \`main\` 中初始化 \`int x = 1, y = 2;\`
2. 调用 \`swap(x, y)\`：
   - 实参 \`x = 1\` 传递给形参 \`a\`，创建副本 \`a = 1\`（值传递）。
   - 实参 \`y = 2\` 传递给形参 \`b\`，\`b\` 成为 \`y\` 的引用/别名（引用传递）。
3. 进入 \`swap\` 函数体：
   \`\`\`cpp
   int temp = a;  // temp = 1（a 的副本）
   a = b;         // a = 2（但 a 是副本，不影响实参 x）
   b = temp;      // b = 1，通过引用修改了实参 y
   \`\`\`
4. 函数返回后：
   - 形参 \`a\`（副本）被销毁，不影响实参 \`x\`，\`x\` 仍为 1。
   - 形参 \`b\`（引用）修改了实参 \`y\`，\`y\` 变为 1。
5. 最终 \`main\` 中：\`x = 1\`，\`y = 1\`，输出 \`std::cout << x << y\` 即 \`11\`。

**选项逐项分析：**
- **A 12**：❌ 错误。这是没有调用 \`swap\` 的原始输出，忽略了引用参数的作用。
- **B 21**：❌ 错误。这是期望的交换结果，但代码中 \`a\` 是值传递，不会影响 \`x\`。
- **C 22**：❌ 错误。不符合任何参数传递逻辑。
- **D 11**：✅ 正确。只有 \`y\` 被成功交换（通过引用传递），\`x\` 保持不变，结果为 11。

**易错提醒：**
- 误以为两个参数都是引用传递，从而期待 21 的结果。必须仔细看函数签名：\`int a\`（值传递）而非 \`int &a\`（引用传递）。
- 值传递的形参是实参的副本，在函数内部修改形参不会影响实参。

**知识延伸：**
如果要实现真正的交换，需要**两个参数都使用引用传递**：
\`\`\`cpp
void swap(int& a, int& b) {
    int temp = a;
    a = b;
    b = temp;
}
\`\`\`
或者使用指针传递（C 风格）：
\`\`\`cpp
void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}
\`\`\`

**考点：** C++ 值传递与引用传递的区别、混合参数传递的效果分析。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: `下面的描述中，（ ）正确定义一个名为Person的结构体并正确初始化了一个Person结构体的变量p。`,
            options: [
                "struct Person { string name; int age; }; Person p(\"Yang\", 10);",
                "struct Person { string name, int age; }; Person p; p.name = \"Yang\"; p.age = 10;",
                "struct Person { string name; int age; }; Person p = { \"Yang\", 10 };",
                "struct Person { string name; int age; }; Person p = new Person(\"Yang\", 10);",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (struct Person { string name; int age; }; Person p = { "Yang", 10 };)**

**核心解析：**
本题考查 C++ 结构体的定义语法与初始化方式。结构体 \`Person\` 包含两个成员：\`string\` 类型的 \`name\` 和 \`int\` 类型的 \`age\`，这是一个聚合类型（Aggregate Type）。

1. 聚合类型可以使用列表初始化语法 \`Type var = { value1, value2, ... };\` 进行初始化，大括号内的值按声明顺序依次赋值给各成员。
2. 选项 C 中 \`Person p = { "Yang", 10 };\` 正确地将 "Yang" 赋给 \`name\`，将 10 赋给 \`age\`。

**选项逐项分析：**
- **A struct Person { string name; int age; }; Person p("Yang", 10);**：❌ 错误。结构体本身并未定义任何构造函数，不能使用圆括号并传入参数的方式进行初始化。圆括号初始化语法仅当结构体显式定义了相应构造函数时才合法。
- **B struct Person { string name, int age; }; Person p; p.name = "Yang"; p.age = 10;**：❌ 错误。结构体成员定义时，不同类型的成员必须分别声明，成员之间用分号分隔。该选项将 \`string name, int age\` 写在一行且用逗号分隔，这是错误的语法，编译器无法正确识别成员定义。正确的写法应为 \`string name; int age;\`。
- **C struct Person { string name; int age; }; Person p = { "Yang", 10 };**：✅ 正确。这是 C++ 聚合初始化的标准语法，大括号内的值按成员声明顺序依次初始化。
- **D struct Person { string name; int age; }; Person p = new Person("Yang", 10);**：❌ 错误。\`new\` 运算符返回的是指向动态分配对象的指针，类型为 \`Person*\`，不能直接赋值给非指针类型的变量 \`p\`。若要使用 \`new\`，应写作 \`Person* p = new Person;\` 并通过其他方式赋值，或者结构体需定义接受参数的构造函数。

**易错提醒：**
- 结构体成员定义时，每项成员声明后必须以分号结尾，不可将多个成员用逗号写在同一行（除非它们类型相同）。
- 聚合初始化要求大括号内的值与成员声明顺序一致，数量也需匹配（可省略尾部元素但不能乱序）。

**知识延伸：**
C++11 引入了统一初始化（Uniform Initialization），使用大括号 \`{}\` 可用于初始化各种类型，包括数组、结构体、向量等，这一语法比传统的构造函数调用或逐个赋值更简洁直观。

**考点：** C++ 结构体的定义语法与聚合初始化。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: `给定如下代码， 下面描述错误的是（ ）。\n\`\`\`cpp\nstruct Person {\n std::string name;\n int age;\n struct Address {\n std::string street;\n std::string city;\n };\n Address address;\n};\n\`\`\``,
            options: [
                "结构Person内嵌套结构Address",
                "Person 有一个Address 类型的 address 成员",
                "一个Person类型的变量p的address的初始化可以写成：p.address.street = \"123 Main St\"; p.address.city = \"Anytown\";",
                "结构的嵌套可以减少命名冲突，因此可以不必控制嵌套层次",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：不正确的是 D（结构的嵌套可以减少命名冲突，因此可以不必控制嵌套层次）**

**核心解析：**
本题考查 C++ 结构体（\`struct\`）的嵌套定义、成员变量声明、嵌套成员访问方式以及良好的编程风格习惯。

题目要求选出**描述错误**的一项：
1. 代码中 \`struct Address { ... };\` 完整定义在 \`Person\` 结构体内部，属于典型的结构体嵌套。随后在 \`Person\` 内部声明了成员变量 \`Address address;\`。
2. 访问嵌套结构体对象的成员时，需通过点运算符 \`.\` 一层层定位，如 \`p.address.street\`，语法清晰合法。
3. 嵌套定义确实可以将类型限定在宿主作用域内以减少全局命名冲突，但在软件工程中，嵌套层次过多会导致代码深度耦合、调用链过长（如 \`a.b.c.d...\`）、可读性骤降，给后续维护和调试带来巨大困难。因此无论何时都需要严格控制嵌套层次，D 选项的结论违背了程序设计的基本规范。

**选项逐项分析：**
- **A 结构Person内嵌套结构Address**：❌ 描述正确。\`Address\` 的完整定义写在 \`Person\` 的花括号 \`{}\` 内部，属于在 \`Person\` 中嵌套定义结构体。
- **B Person 有一个Address 类型的 address 成员**：❌ 描述正确。代码中 \`Address address;\` 就是在 \`Person\` 内声明了一个类型为内部结构体 \`Address\`、变量名为 \`address\` 的成员变量。
- **C 一个Person类型的变量p的address的初始化可以写成：p.address.street = "123 Main St"; p.address.city = "Anytown";**：❌ 描述正确。访问嵌套结构体的成员时，先使用 \`p.address\` 得到结构体变量 \`address\`，再使用 \`.street\` 和 \`.city\` 访问其具体成员并赋值，语法完全正确。
- **D 结构的嵌套可以减少命名冲突，因此可以不必控制嵌套层次**：✅ 描述错误，符合题意。结构体嵌套虽有作用域隔离的优势，但过度深层嵌套会使代码极难维护与阅读。通常建议嵌套控制在 2~3 层以内，过于复杂时应拆解为独立的并列结构体，必须严格控制嵌套层次。

**易错提醒：**
- 区分**结构体类型的定义**与**成员变量的声明**：定义了内部结构体 \`Address\` 后，必须再显式声明成员变量（如 \`Address address;\`），外层结构体才会真正拥有该类型的子对象。
- 访问嵌套结构体内部成员时不能“跳级”，必须逐层使用点运算符 \`.\`，写成 \`p.street\` 会因找不到该成员而导致编译报错。

**知识延伸：**
在 C++ 中，嵌套结构体的名称受到外层结构体的作用域限制。如果想在 \`Person\` 外部单独声明一个 \`Address\` 类型的变量，需要使用作用域解析运算符 \`::\`，写作 \`Person::Address addr;\`。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: `假设int arr[2][3] = {{1,2,3},{4,5,6}};，则arr[1][2]的值是（ ）。`,
            options: [
                "2",
                "3",
                "5",
                "6",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (6)**

**核心解析：**
本题考查二维数组的内存布局与下标访问规则。

1. \`int arr[2][3]\` 定义了一个 2 行 3 列的二维数组，共 6 个元素，按行优先顺序存储在内存中。
2. C++ 数组下标从 0 开始计算，因此 \`arr[1][2]\` 表示访问第 2 行（索引为 1）的第 3 个元素（索引为 2）。
3. 根据初始化列表 \`{{1,2,3},{4,5,6}}\`，第 0 行存放 {1, 2, 3}，第 1 行存放 {4, 5, 6}。
4. 第 1 行第 2 列的元素值为 6。

**选项逐项分析：**
- **A 2**：❌ 错误。2 是第 0 行第 1 列的元素，即 \`arr[0][1]\`。
- **B 3**：❌ 错误。3 是第 0 行第 2 列的元素，即 \`arr[0][2]\`。
- **C 5**：❌ 错误。5 是第 1 行第 1 列的元素，即 \`arr[1][1]\`。
- **D 6**：✅ 正确。6 是第 1 行第 2 列的元素，即 \`arr[1][2]\`。

**易错提醒：**
- 二维数组的两个维度各自独立从 0 开始计数，切勿混淆行索引和列索引。
- \`arr[1][2]\` 读作"arr 的第 1 行第 2 列"，而非"arr 的第 2 行第 3 列"。

**知识延伸：**
二维数组在内存中是连续存储的，\`arr[2][3]\` 的 6 个元素按 \`arr[0][0], arr[0][1], arr[0][2], arr[1][0], arr[1][1], arr[1][2]\` 的顺序排列。行优先存储意味着同一行的元素在内存中相邻。

**考点：** 二维数组的定义、初始化与下标访问（从 0 开始）。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: `下面（ ）正确定义了二维数组。`,
            options: [
                "int arr[3,4];",
                "int arr[3][4];",
                "int arr(3,4);",
                "int a[3-4];",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：B (int arr[3][4];)**\n\n**核心解析：**\n本题考查 C++ 中二维数组的定义语法。\n\n1. C++ 定义二维数组使用两个方括号，每个维度用一个方括号包围其长度。\n2. `int arr[3][4]` 定义了一个 3 行 4 列的二维整型数组，共 12 个元素。\n3. 其他选项均使用了非法的数组定义语法。\n\n**选项逐项分析：**\n- **A int arr[3,4];**：❌ 错误。C++ 数组声明中的方括号内只能放一个常量表达式；逗号不能用来分隔两个维度，这种写法会导致语法错误，不能理解为 `int arr[4]`。\n- **B int arr[3][4];**：✅ 正确。这是 C++ 定义二维数组的标准语法，第一个维度指定行数，第二个维度指定列数。\n- **C int arr(3,4);**：❌ 错误。圆括号 `()` 不能用于数组维度的定义，此处不是合法的数组声明语法。\n- **D int a[3-4];**：❌ 错误。数组维度必须是大于 0 的整型常量表达式。`3-4` 的结果为 -1，不能作为数组大小，编译会报错。\n\n**易错提醒：**\n- 二维数组定义必须是 `类型 变量名[行数][列数];`，两个维度都不能省略方括号。\n- 数组大小表达式必须能计算出正整数值，否则编译失败。\n\n**知识延伸：**\n三维或更高维数组的定义遵循相同规则，例如 `int arr[2][3][4]` 定义了一个 2×3×4 的三维数组。C++ 标准要求数组维度为大于 0 的编译期常量表达式；C++11 起可用 `constexpr` 变量作为维度。\n\n**考点：** 二维数组的定义语法与维度规范。",
            tags: ["客观题", "单选题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 4,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"]
        },
        {
            id: 10,
            type: "single",
            question: `小杨正在爬楼梯，需要爬 n 阶才能到达楼顶。如果每次可以爬 1 个或 2 个台阶，下面代码采用递推算法来计算一共有多少种不同的方法可以爬到楼顶，则横线上应填写（ ）。\n\`\`\`cpp\nint f(int n) {\n if (n == 1 || n == 2) return n;\n int f1 = 1;\n int f2 = 2;\n int res = 0;\n for (int i = 3; i <= n; i++) {\n ________________________________ // 在此处填入代码\n }\n return res;\n}\n\`\`\``,
            options: [
                "res += f1+f2; f1 = f2; f2 = res;",
                "res = f1+f2; f1 = f2; f2 = res;",
                "res += f1+f2; f2 = res; f1 = f2;",
                "res = f1+f2; f2 = res; f1 = f2;",
            ],
            answer: 1,
            score: 2,
            explanation: "**答案：B (res = f1+f2; f1 = f2; f2 = res;)**\n\n**核心解析：**\n本题考查递推算法（动态规划思想）求解爬楼梯问题。题目要求填写循环体内的代码，使函数正确计算爬到第 n 阶楼顶的方法数。\n\n1. 爬楼梯问题的递推关系：设 f(n) 为爬到第 n 阶的方法数。最后一步要么跨 1 阶到达（第 n-1 阶再跨 1 步），要么跨 2 阶到达（第 n-2 阶再跨 2 步），因此 f(n) = f(n-1) + f(n-2)。\n2. 代码已初始化 f1 = 1（即 f(1)）和 f2 = 2（即 f(2)），并将 res 置 0。\n3. 循环从 i = 3 开始，每次迭代计算第 i 阶的方法数：\n   - 计算当前结果：res = f1 + f2（即 f(i) = f(i-2) + f(i-1)）\n   - 更新滑动窗口：f1 = f2（将 f(i-1) 移为新的 f(i-2)），f2 = res（将新计算的 f(i) 移为新的 f(i-1)）\n4. 循环结束后 res 保存 f(n) 的值，函数返回。\n\n**选项逐项分析：**\n- **A res += f1+f2; f1 = f2; f2 = res;**：❌ 错误。res += f1 + f2 会将当前计算结果累加到 res 上；并且 f2 = res 会把累加后的 res 带入下一轮，导致结果远大于正确答案。例如 n=5 时该选项返回 19，而正确答案为 8。\n- **B res = f1+f2; f1 = f2; f2 = res;**：✅ 正确。每次循环将当前计算的 f1+f2 赋值给 res（非累加），然后正确更新滑动窗口的两个变量，为下一轮迭代做准备。\n- **C res += f1+f2; f2 = res; f1 = f2;**：❌ 错误。同样使用 res +=，会错误累加结果；而且赋值顺序 f2 = res; f1 = f2; 导致 f1 和 f2 最终值相同，破坏了滑动窗口逻辑（n=5 时返回 27）。\n- **D res = f1+f2; f2 = res; f1 = f2;**：❌ 错误。虽然 res = f1+f2 正确，但赋值顺序 f2 = res; f1 = f2; 会导致 f1 和 f2 都被赋值为 res，而非分别保存前一次和当前的结果值，递推逻辑错误（n=5 时返回 12）。\n\n**易错提醒：**\n- 递推过程中变量更新必须遵循“先保存旧值，再更新”的顺序，防止数据被覆盖。\n- 滑动窗口技术要求每次迭代后两个变量分别保存相邻的两个状态值，切不可让它们相等。\n- res 在每次循环中应被覆盖而非累加，除非题目明确要求计算累计值。\n\n**知识延伸：**\n爬楼梯问题的递推公式 f(n) = f(n-1) + f(n-2) 实际上是斐波那契数列的变体。初始条件不同导致序列偏移：标准斐波那契 F(0)=0, F(1)=1，而本题中 f(1)=1, f(2)=2 相当于 F(2)=1, F(3)=2。理解这一对应关系可简化代码编写。\n\n**考点：** 递推算法的实现（滑动窗口技术）、斐波那契数列与爬楼梯问题的关联。",
            tags: ["客观题", "单选题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 4,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"]
        },
        {
            id: 11,
            type: "single",
            question: `给定如下算法，其时间复杂度为（ ）。\n\`\`\`cpp\nbool f(int arr[], int n, int target) {\n for (int i = 0; i < (1 << n); i++) {\n int sum = 0;\n for (int j = 0; j < n; j++) {\n if (i & (1 << j)) {\n sum += arr[j];\n }\n }\n if (sum == target) return true;\n }\n return false;\n}\n\`\`\``,
            options: ["O($n^2$)","O(n × $2^n$)","O(1)","O($n^3$)"],
            answer: 1,
            score: 2,
            explanation: "**答案：B（O(n × $2^n$)）**\n\n**核心解析：**\n1. 外层循环 `for (int i = 0; i < (1 << n); i++)`：位运算 `1 << n` 即 $2^n$，外层共迭代 $2^n$ 次，本质是枚举 n 个元素的全部 $2^n$ 个子集（i 的每个二进制位对应一个元素选或不选）。\n2. 内层循环 `for (int j = 0; j < n; j++)`：对每个 i 都要检查全部 n 个二进制位，`i & (1 << j)` 的位测试与 `sum += arr[j]` 的累加均为常数时间操作，故每轮外层耗时 $O(n)$。\n3. 总基本操作次数约为 $2^n \\times n$，因此最坏情况时间复杂度为 $O(n \\times 2^n)$。命中 target 时会提前 return true，但复杂度按最坏情况分析。\n\n**选项逐项分析：**\n- **A $O(n^2)$**：❌ 错误。平方级复杂度无法刻画外层 $2^n$ 的指数级增长。\n- **B $O(n \\times 2^n)$**：✅ 正确。完整计入外层 $2^n$ 次与每轮内层 n 次的乘积。\n- **C $O(1)$**：❌ 错误。循环规模随 n 指数增长，显然不是常数时间。\n- **D $O(n^3)$**：❌ 错误。代码只有两层嵌套循环，不存在立方级结构。\n\n**易错提醒：**\n- `1 << n` 易被误读为线性增长，实际表示 $2^n$。\n- 提前返回只影响最好情况，不改变最坏情况复杂度。\n\n**知识延伸：**\n该函数在枚举数组所有子集并判断是否存在和为 target 的子集（子集和问题的暴力解法）：位掩码 i 的第 j 位为 1 表示选中 arr[j]，这是竞赛中用位运算枚举子集的标准写法。\n\n**考点：** 位运算枚举子集的时间复杂度分析。",
            tags: ["客观题", "单选题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 4,
      "reviewedFields": ["options","explanation","reviewedBy","reviewedAt","sourcePage"]
        },
        {
            id: 12,
            type: "single",
            question: `下面关于排序稳定性的描述，正确的是（ ）。`,
            options: [
                "稳定性指算法的时间复杂度恒定",
                "稳定排序保证相同元素的相对顺序不变",
                "选择排序是稳定排序",
                "插入排序不是稳定排序",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (稳定排序保证相同元素的相对顺序不变)**

**核心解析：**
排序算法的稳定性（Stability）是指：在排序过程中，如果两个元素的关键字值相等，排序后它们之间的相对顺序是否保持不变。若保持不变，则称该排序算法是稳定的；若可能改变，则是不稳定的。

**选项逐项分析：**
- **A 稳定性指算法的时间复杂度恒定**：❌ 错误。该选项将“稳定性”与“时间复杂度”概念混淆。稳定性是针对排序结果中相同关键字元素的相对位置而言，与算法运行时间的波动无关。
- **B 稳定排序保证相同元素的相对顺序不变**：✅ 正确。这是排序稳定性的标准定义。注意这里强调“相对顺序”——即初始时靠前的相同元素，排序后仍应靠前。
- **C 选择排序是稳定排序**：❌ 错误。以数组 \`{5a, 3, 5b, 1}\` 为例，选择排序在第一轮找到最小值 1 后会与位置 0 的 5a 交换，此时两个 5 的相对位置可能被颠倒，因此选择排序是不稳定的。
- **D 插入排序不是稳定排序**：❌ 错误。插入排序在标准实现下是稳定的。当新元素与已排序部分的元素比较时，通常使用 \`<=\` 而非 \`<\`，可以保证相等元素不后移，从而维持相对顺序。

**易错提醒：**
- 稳定性只讨论“相同关键字元素”的相对位置，与不同关键字元素的排序结果无关。
- 一种排序算法可以在特定实现下稳定，在另一种实现下不稳定（如冒泡排序的稳定版本使用 \`>\` 而非 \`>=\` 判断是否交换）。

**知识延伸：**
GESP 常考的稳定排序包括：冒泡排序、插入排序、归并排序；不稳定排序包括：选择排序、快速排序（取决于划分方式）、堆排序。稳定排序在需要维持多级排序条件时尤为重要。

**考点：** 排序算法的稳定性定义及其常见算法特性。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: `对数组arr[]={5, 3, 8, 1}进行升序排序，执行第一轮冒泡排序后数组arr中的内容为（ ）。`,
            options: [
                "3, 5, 1, 8",
                "3, 1, 5, 8",
                "3, 5, 8, 1",
                "5, 3, 8, 1",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (3, 5, 1, 8)**

**核心解析：**
冒泡排序的每一轮通过相邻元素两两比较，将当前未排序部分的最大值“冒泡”到序列末端。

1. **初始数组**：\`{5, 3, 8, 1}\`
2. **第一轮冒泡过程**（$n-1=3$ 次比较）：
   - **第1次比较**：比较 \`arr[0]=5\` 与 \`arr[1]=3\`，\`5 > 3\`，交换 → \`{3, 5, 8, 1}\`
   - **第2次比较**：比较 \`arr[1]=5\` 与 \`arr[2]=8\`，\`5 < 8\`，不交换 → \`{3, 5, 8, 1}\`
   - **第3次比较**：比较 \`arr[2]=8\` 与 \`arr[3]=1\`，\`8 > 1\`，交换 → \`{3, 5, 1, 8}\`
3. **第一轮结束**：最大值 8 已固定在末尾，数组变为 \`{3, 5, 1, 8}\`。

**选项逐项分析：**
- **A 3, 5, 1, 8**：✅ 正确。完整执行了一轮冒泡后的正确结果。
- **B 3, 1, 5, 8**：❌ 错误。该结果是执行两轮冒泡后的状态。第一轮结束后若再进行一轮，\`{3, 5, 1, 8}\` 会变为 \`{3, 1, 5, 8}\`。
- **C 3, 5, 8, 1**：❌ 错误。此结果仅完成了第1次和第2次比较，漏掉了关键的第3次比较（8 与 1 的交换）。
- **D 5, 3, 8, 1**：❌ 错误。该数组与初始状态完全相同，说明未执行任何交换，不符合第一轮冒泡的执行过程。

**易错提醒：**
- 冒泡排序第一轮需要 $n-1$ 次比较（本题 $4-1=3$ 次），不能遗漏最后一次 8 与 1 的比较交换。
- 注意区分“一轮冒泡”和“一次比较”：一次比较只涉及相邻两个元素，一轮冒泡包含多次比较直到最大元素就位。

**知识延伸：**
冒泡排序共需 $n-1$ 轮，时间复杂度为 $O(n^2)$。若某轮未发生任何交换，可提前终止（优化版冒泡）。GESP 中常通过模拟执行过程来考察对排序算法的理解。

**考点：** 冒泡排序（Bubble Sort）的单趟运行逻辑。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: "运行下面的代码，将出现（ ）。\n```cpp\ndouble hmean(double a, double b) {\n    if (a == -b)\n        throw std::runtime_error(\"Runtime error occurred.\");\n    return 2.0*a*b/(a+b);\n}\nint main() {\n    double x = 10;\n    double y = -10;\n    try {\n        int result = hmean(x, y);\n        std::cout << \"hmean: \" << result << std::endl;\n    } catch (const std::runtime_error& e) {\n        std::cout << \"Caught: \" << e.what() << std::endl;\n    } catch (...) {\n        std::cout << \"Caught an unknown exception.\" << std::endl;\n    }\n    return 0;\n}\n```",
            options: ["屏幕上输出 Caught: Runtime error occurred.","屏幕上输出 Caught an unknown exception.","程序调用 std::terminate()","编译错误"],
            answer: 0,
            score: 2,
            explanation: "**答案：A（屏幕上输出 Caught: Runtime error occurred.）**\n\n**核心解析：**\n1. main 中 `x = 10`、`y = -10`，调用 `hmean(x, y)` 时函数内判断 `a == -b` 即 `10 == -(-10)` 成立，立即执行 `throw std::runtime_error(\"Runtime error occurred.\");` 抛出异常，hmean 随即中断，其后的 return 不会执行，try 块内 `int result = hmean(x, y);` 的赋值与 `std::cout << \"hmean: \" ...` 的输出均被跳过。\n2. 异常由调用处的 try-catch 接管：第一个 `catch (const std::runtime_error& e)` 与异常类型精确匹配，`e.what()` 返回创建异常时传入的字符串 \"Runtime error occurred.\"，因此屏幕输出 `Caught: Runtime error occurred.`。\n3. 匹配成功后跳过其余 catch 块，main 正常返回 0 结束。\n\n**选项逐项分析：**\n- **A 屏幕上输出 Caught: Runtime error occurred.**：✅ 正确。异常被第一个 catch 精确捕获，并通过 e.what() 打印对应信息。\n- **B 屏幕上输出 Caught an unknown exception.**：❌ 错误。该输出来自 `catch (...)` 兜底分支；异常已被前面的具体类型捕获，此分支不会执行。\n- **C 程序调用 std::terminate()**：❌ 错误。std::terminate() 只在异常传播出 main 且无人捕获等严重错误时触发；本例异常在 try 块内抛出并被对应 catch 捕获，不会发生。\n- **D 编译错误**：❌ 错误。throw-try-catch 结构书写规范，能正常编译；hmean 返回 double 赋给 int 属合法隐式转换（可能有警告但非错误），且本例在返回前已抛出异常。\n\n**易错提醒：**\n- 多个 catch 块按声明顺序自上而下匹配，前面的分支命中后跳过其余 catch（含 catch(...)）。\n- `throw` 会立即中断当前函数并回溯调用栈，不会继续执行其后的语句。\n\n**考点：** C++ 异常的抛出、捕获与 catch 顺序匹配。",
            tags: ["客观题", "单选题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 5,
      "reviewedFields": ["question","options","explanation","reviewedBy","reviewedAt","sourcePage"]
        },
        {
            id: 15,
            type: "single",
            question: `下面哪种方式不能实现将字符串"Happy Spring!"输出重定向到文件log.txt（ ）。`,
            options: ["freopen(\"log.txt\", \"w\", stdout);\nstd::cout << \"Happy Spring!\" << std::endl;\nfclose(stdout);","std::ofstream outFile(\"log.txt\");\noutFile << \"Happy Spring!\" << std::endl;\noutFile.close();","std::ofstream outFile(\"log.txt\");\nstd::cout << \"Happy Spring!\" << std::endl;\noutFile.close();","std::ofstream log_file(\"log.txt\");\nstd::streambuf* org_cout = std::cout.rdbuf();\nstd::cout.rdbuf(log_file.rdbuf());\nstd::cout << \"Happy Spring!\" << std::endl;\nstd::cout.rdbuf(org_cout);"],
            answer: 2,
            score: 2,
            explanation: `**答案：不正确的是 C（std::ofstream outFile("log.txt"); std::cout << "Happy Spring!"; outFile.close();）**

**核心解析：**
题目要求找出“不能”将字符串输出到文件 \`log.txt\` 的选项。将内容输出到文件主要有两类途径：
1. **直接文件流写入**：创建文件输出流对象（如 \`std::ofstream\`），直接将内容写入该对象。
2. **重定向标准输出**：将标准输出流（\`stdout\` 或 \`std::cout\`）的目标重定向到文件，后续继续使用原有的输出语句输出。

在选项 C 中，虽然通过 \`std::ofstream outFile("log.txt");\` 创建了文件输出流并打开了文件，但接下来使用的输出语句是 \`std::cout << "Happy Spring!";\`。\`cout\` 仍指向屏幕，与 \`outFile\` 无关，字符串不会进入 \`log.txt\`；\`outFile.close()\` 只是关闭尚未写入内容的文件流。

**选项逐项分析：**
- **A \`freopen("log.txt", "w", stdout); std::cout << "Happy Spring!" << std::endl;\`**：❌ 能实现。\`freopen\` 把 \`stdout\` 改到 \`log.txt\`，之后 \`cout\` 写入该文件。
- **B \`std::ofstream outFile("log.txt"); outFile << "Happy Spring!"; outFile.close();\`**：❌ 能实现。\`outFile << ...\` 直接把字符串写入 \`log.txt\`。
- **C \`std::ofstream outFile("log.txt"); std::cout << "Happy Spring!"; outFile.close();\`**：✅ 不能实现，符合题意。文件流已打开，但字符串走 \`cout\` 到屏幕，文件里没有这句话。
- **D 使用 rdbuf() 将 cout 的缓冲区重定向到文件的缓冲区**：❌ 能实现。\`std::cout.rdbuf(outFile.rdbuf())\` 把 \`cout\` 的缓冲区换成文件流缓冲区，之后 \`cout\` 写入文件。


**易错提醒：**
- **不要混淆文件流对象与 \`cout\`**：定义了文件流 \`outFile\` 之后，必须使用 \`outFile << "..."\` 才能写入文件；如果写成 \`cout << "..."\`，仍然输出到控制台。
- **重定向需要显式操作**：单纯定义文件对象不会影响 \`cout\`。想要让 \`cout\` 输出到文件，必须使用 \`freopen\`（C 风格）或通过 \`rdbuf()\` 替换缓冲区（C++ 风格）。`,
            tags: ["客观题", "单选题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["options","reviewedBy","reviewedAt","sourcePage"]
        },
        {
            id: 16,
            type: "judge",
            question: `函数是 C++ 中的核心概念，用于封装可重用的代码块。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
函数的本质作用是将一段完成特定功能的代码逻辑封装为一个具有名称的独立单元。程序可以在任意位置通过函数名调用该代码块，无需重复编写相同逻辑。这正是结构化程序设计的基本特征，也是 C++ 实现代码复用和模块化开发的核心手段。

**易错提醒：**
- 容易将“函数”与“类的方法”混淆。成员函数只是函数的一种特殊形式，普通函数同样承担封装代码的职责。
- 不能将“封装”仅理解为面向对象的特性，函数在面向过程编程中同样是封装的基本单位。

**知识延伸：**
函数的封装不仅实现代码重用，还便于维护——当需要修改某段逻辑时，只需在一个地方改动，而不是搜索整个代码库。

**考点：** C++ 函数的基础定义与作用。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `在 C++ 中，函数的返回类型可以省略，默认为int。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
现代 C++（C++11 及后续标准）强制要求函数必须显式声明返回类型。合法的函数声明形式包括：
- 明确指定类型：如 \`int func()\`、\`void process()\`
- 使用 \`auto\` 推导：编译器根据 \`return\` 语句推断返回类型
- 使用 \`decltype(auto)\`：根据表达式类型推导

C++ 不支持省略返回类型后默认推断为 \`int\`。这与某些历史版本的 C 语言规则不同，切勿混淆。

**易错提醒：**
- 部分教材基于旧版 C 语言标准编写，可能提到“隐式 int”，但该规则在 C++ 中从未合法。
- C++11 引入的 \`auto\` 关键字虽然可以省略显式类型声明，但必须写出 \`auto\`，而不是完全省略。

**知识延伸：**
C++ 语法要求严格程度高于 C 语言。任何省略返回类型的写法在 C++ 编译时都会报语法错误，而非警告。

**考点：** C++ 函数定义的语法要求。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `结构体的成员默认是public访问权限。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
C++ 中 \`struct\` 和 \`class\` 的唯一本质区别就在于默认访问权限：
- \`struct\` 默认成员访问权限为 \`public\`
- \`class\` 默认成员访问权限为 \`private\`

这意味着，在结构体中若不显式声明访问修饰符，成员可以直接从结构体外部访问；而在类中则必须显式声明为 \`public\` 才能在类外访问。

**易错提醒：**
- 容易误以为 struct 和 class 功能完全相同，只是名称不同。实际上默认访问权限这一差异会影响代码行为。
- 结构体同样可以包含构造函数、析构函数、成员函数，也支持继承，其默认继承方式同样是 \`public\`。

**知识延伸：**
在 GESP 四级考核中，struct 与 class 的选择主要考虑语义：若需要数据聚合且默认公开访问，用 struct；若需要封装和隐藏数据，用 class。

**考点：** C++ 结构体与类的默认访问权限区别。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `假设整数数组arr[4]= {0, 1, 2, 3};的第一个元素在内存中的地址为0x7ffee4065820, 经过int* p = arr; p += 1;后，指针p的值是 1 。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1. \`int* p = arr;\` 将指针 \`p\` 初始化为数组首元素的地址（值为 \`0x7ffee4065820\`）。
2. \`p += 1;\` 执行的是指针算术运算，将 \`p\` 向前移动一个 \`int\` 单位的存储空间。
3. 在典型系统中 \`sizeof(int) = 4\` 字节，因此 \`p\` 的新值为 \`0x7ffee4065820 + 4 = 0x7ffee4065824\`，这是数组第二个元素 \`arr[1]\` 的地址。
4. 题干说“指针 p 的值是 1”，这是将指针值与所指向的元素内容混淆了。指针的值始终是一个内存地址，而非该地址中存储的数据。

**易错提醒：**
- 指针算术运算的单位是“指针指向类型的元素个数”，而非字节数。\`p += 1\` 表示移动一个 \`int\`，而非一个字节。
- 访问 \`p\` 指向的内容应使用解引用操作符 \`*p\`，其值为 \`arr[1]\`，即整数 \`1\`。但 \`p\` 本身的值是地址，不是 \`1\`。

**知识延伸：**
不同类型的指针在算术运算中移动的单位不同：\`int*\` 移动 4 字节，\`double*\` 移动 8 字节，\`char*\` 移动 1 字节。编译器根据指针类型自动调整偏移量。

**考点：** C++ 指针算术运算及其物理意义。`,
            tags: ["客观题", "判断题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["reviewedBy","reviewedAt","sourcePage"]
        },
        {
            id: 20,
            type: "judge",
            question: `二维数组作为函数参数时，必须显式指定所有维度的大小。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
C++ 规定：二维数组作为函数参数时，**第一维（行数）可以省略**，但**第二维（列数）必须显式指定**。

原因在于内存布局。二维数组在内存中是连续的一维空间，访问 \`arr[i][j]\` 时，编译器需要计算偏移量 \`i × 列数 + j\` 来定位元素。如果不指定列数，就无法确定每行占用的空间，从而无法完成地址计算。

合法示例：
\`\`\`cpp
void print(int arr[][3], int rows) { ... }  // 列数 3 必须写，行数可省略
\`\`\`

非法示例：
\`\`\`cpp
void print(int arr[][], int rows, int cols) { ... }  // 编译错误
\`\`\`

**易错提醒：**
- 不要将“省略维度”与“完全不写”混淆。函数参数中 \`int arr[][]\` 是不合法的，必须至少保留一对方括号并填入列数。
- 行数虽然在声明中可以省略，但通常需要额外参数（如 \`rows\`）传递给函数，以便在函数体内控制循环范围。

**知识延伸：**
三维或更高维数组作为参数时，除了第一维可以省略外，其余各维的大小都必须显式指定，规则一致。

**考点：** 二维数组作为函数参数的语法规则。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `递推是一种通过已知的初始值和递推公式，逐步求解目标值的算法。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
递推（Recurrence）是解决数学和算法问题的一种基本方法。它通过定义一个初始状态（基准情况），以及一个将当前状态与之前状态关联起来的规则（递推公式），来逐步计算出更复杂或更大规模情况的结果。例如，斐波那契数列 F(n) = F(n-1) + F(n-2)，其中 F(0)=0, F(1)=1 就是典型的递推算法。

**易错提醒：**
- 递推必须包含明确的初始值，缺少初始值的递推公式无法求解。
- 递推与递归不同：递推是自底向上（从已知推未知），递归是自顶向下（从未知逐步拆解为已知）。

**知识延伸：**
递推是动态规划的基础，许多 GESP 四级难度的动态规划题目（如爬楼梯、斐波那契数列计数）都依赖递推思想建立状态转移方程。

**考点：** 递推算法的核心定义与基本要素`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: "考虑最坏情况下冒泡排序算法的时间复杂度，$T(n)$ 为待排序数字的数目为 $n$ 的复杂度，则其递推关系式为 $T(n) = T(n-1) + n$，$T(0) = 1$。",
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: "**答案：正确**\n\n**判定依据：**\n题面给出的递推式为 $T(n) = T(n-1) + n$，$T(0) = 1$。冒泡排序最坏情况下，每一轮都要对当前剩余的元素做一遍相邻比较（及可能的交换），这一轮的线性工作量记为 $n$，随后问题规模减 1；基准 $T(0) = 1$ 表示规模为 0 时的常数开销。逐层展开得 $T(n) = 1 + n + (n-1) + \\cdots + 1 = 1 + \\frac{n(n+1)}{2}$，其量级为 $O(n^2)$，与冒泡排序最坏情况的 $O(n^2)$ 复杂度一致，因此该说法正确。\n\n**易错提醒：**\n- 若按精确比较次数计数，最坏情况比较次数为 $(n-1) + (n-2) + \\cdots + 1 = \\frac{n(n-1)}{2}$，对应的递推写法是 $T(n) = T(n-1) + (n-1)$、$T(1) = 0$；本题采用的是每轮记 $n$ 个工作量并加常数基例的复杂度口径，两种写法数量级等价，注意区分计数对象，不要混用。\n- $T(0) = 1$ 是常数项，不影响最终 $O(n^2)$ 的阶。\n\n**知识延伸：**\n递推式展开后由最高次项决定渐近复杂度，常数项与低次项可以忽略。插入排序最坏情况同样可用 $T(n) = T(n-1) + n$、$T(0) = 1$ 描述，复杂度也为 $O(n^2)$。\n\n**考点：** 冒泡排序最坏情况时间复杂度的递推关系与渐近分析。",
            tags: ["客观题", "判断题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["question","explanation","reviewedBy","reviewedAt","sourcePage"]
        },
        {
            id: 23,
            type: "judge",
            question: `插入排序在最好情况（已有序）下的时间复杂度是 $O(N^2)$。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
插入排序在最好情况（数组已有序）下的时间复杂度是 $O(N)$，而非 $O(N^2)$。原因如下：当数组已有序时，对于每个待插入的元素，内层 while 循环只需进行 1 次比较（与前一个元素比较后立即判定无需移动）即可确定插入位置。因此总比较次数为 $n-1$ 次，时间复杂度为线性 $O(N)$。

**易错提醒：**
- 插入排序的 $O(N^2)$ 是平均情况和最坏情况（逆序）的复杂度，最好情况是 $O(N)$。
- 不要混淆“算法名称”与“具体复杂度”，同一个算法在不同输入下复杂度可能不同。

**知识延伸：**
选择排序无论最好还是最坏情况都是 $O(N^2)$，因为每趟都要在剩余未排序区间查找最小值，无法利用“已有序”这一条件优化。

**考点：** 插入排序的时间复杂度分析（最好、最坏、平均情况）`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `对数组arr[]={4, 3, 1, 5, 2}进行升序排序，执行第一轮选择排序后数组 arr 中的内容是{1, 4, 3, 5, 2}。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: "**答案：错误**\n\n**判定依据：**\n对 `arr[] = {4, 3, 1, 5, 2}` 执行第一轮选择排序：在当前整个未排序区间 `[0, 4]` 中扫描，最小值为 1（下标 2）；随后将最小值 1 与区间首元素 `arr[0] = 4` 交换，第一轮结束后的数组为 `{1, 3, 4, 5, 2}`，而不是题面给出的 `{1, 4, 3, 5, 2}`，因此该说法错误。\n\n**易错提醒：**\n- 标准简单选择排序每轮只做一次交换：1 换到首位的同时，原来的 4 被换到 1 原来的位置（下标 2），夹在中间的 3 位置不动，故结果为 `{1, 3, 4, 5, 2}`；不能认为除 1 以外其余元素的位置都不变。\n- 题面给出的 `{1, 4, 3, 5, 2}` 实际是「扫描过程中每遇到更小元素就交换」这一变体流程的结果：4 与 3 交换得 `{3, 4, 1, 5, 2}`，再与 1 交换得 `{1, 4, 3, 5, 2}`；它不是标准选择排序（每轮一次交换）的执行过程，不能作为判定依据。\n\n**知识延伸：**\n选择排序每轮都要在剩余区间完整扫描找最小值，比较次数恒为 $(n-1) + (n-2) + \\cdots + 1 = \\frac{n(n-1)}{2}$，时间复杂度恒为 $O(n^2)$，无法利用输入已部分有序的特点进行优化。\n\n**考点：** 选择排序（Selection Sort）的算法过程模拟。",
            tags: ["客观题", "判断题", "GESP4级"],
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 6,
      "reviewedFields": ["explanation","reviewedBy","reviewedAt","sourcePage"]
        },
        {
            id: 25,
            type: "judge",
            question: `未捕获异常会调用 std::terminate 终止程序。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
当程序抛出异常且没有对应的 \`catch\` 块能捕获它时，异常会“逃逸”出 \`main\` 函数。按照 C++ 标准，这会导致运行库调用全局函数 \`std::terminate()\`，该函数默认会调用 \`std::abort()\` 立即异常终结程序的运行。这是一个严重错误状态，程序无法恢复。

**易错提醒：**
- 异常必须被捕获，否则程序会终止。编译器不会自动“消化”未捕获的异常。
- \`std::terminate()\` 调用的默认行为是 \`std::abort()\`，但程序员可以通过 \`std::set_terminate()\` 自定义终止函数。

**知识延伸：**
C++ 异常处理机制中，即使 \`catch\` 块重新抛出异常（\`throw;\`），若外层仍无捕获者，同样会触发 \`std::terminate()\`。因此异常传播路径上必须有对应的处理逻辑。

**考点：** C++ 异常处理生命周期与未捕获异常的后果`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3 5
.....
.#..#
.....`, output: `11` }
      ],
      question: "# [GESP202503 四级] 荒地开垦\n\n## 题目描述\n\n小杨有一大片荒地，可以表示为一个 $n$ 行 $m$ 列的网格图。\n\n小杨想要开垦这块荒地，但荒地中一些位置存在杂物，对于一块不存在杂物的荒地，该荒地可以开垦当且仅当其上下左右四个方向相邻的格子均不存在杂物。\n\n小杨可以选择至多一个位置，清除该位置的杂物，移除杂物后该位置变为荒地。小杨想知道在清除至多一个位置的杂物的情况下，最多能够开垦多少块荒地。\n\n## 输入格式\n\n第一行包含两个正整数 $n, m$，含义如题面所示。\n\n之后 $n$ 行，每行包含一个长度为 $m$ 且仅包含字符 `.` 和 `#` 的字符串。如果为 `.`，代表该位置为荒地；如果为 `#`，代表该位置为杂物。\n\n## 输出格式\n\n输出一个整数，代表在清除至多一个位置的杂物的情况下，最多能够开垦的荒地块数。\n\n## 数据范围\n\n对于全部数据，保证 $1 \\le n,m \\le 1000$。\n",
      score: 25,
      explanation: "**解析：**\n\n开垦条件：格子本身为 `.`，且界内上下左右四邻没有 `#`；边界外不视为杂物。\n\n记 base 为不清除任何杂物时已可开垦的格子数。清除一个 # 只会影响它自身及上下左右至多 5 个格子，因此可以预处理每个 # 被清除后能新增的可开垦数 gain[i][j]。\n\n遍历每个格子 (i,j)，统计其界内四邻中 # 的个数 bad，并记录唯一的 # 位置：\n- 若当前为 `.`：bad==0 时 base++；bad==1 时，清除那个唯一相邻的 # 后该格可开垦，故 gain[该#]++；bad>=2 时无贡献。\n- 若当前为 `#`：bad==0 时，清除它自身后该格可开垦，故 gain[i][j]++；否则清除自身后仍有相邻杂物，不能开垦。\n\n最后答案为 base + max(gain[i][j])；若没有可清除的 # 或最大增益为 0，则相当于不清除。总时间 O(nm)，空间 O(nm)。\n\n样例中初始 base=6；清除第 2 行第 2 列的杂物可新增 5 块，得到 11；清除第 2 行第 5 列的杂物可新增 4 块，得到 10，故最大为 11。",
      tags: ["编程题", "GESP4级"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      referenceCode: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    int n, m;\n    cin >> n >> m;\n    vector<string> g(n);\n    for (int i = 0; i < n; ++i) cin >> g[i];\n\n    const int dx[4] = {-1, 1, 0, 0};\n    const int dy[4] = {0, 0, -1, 1};\n    vector<vector<int>> gain(n, vector<int>(m, 0));\n    int base = 0;\n\n    for (int i = 0; i < n; ++i) {\n        for (int j = 0; j < m; ++j) {\n            int bad = 0, bi = -1, bj = -1;\n            for (int k = 0; k < 4; ++k) {\n                int ni = i + dx[k], nj = j + dy[k];\n                if (ni >= 0 && ni < n && nj >= 0 && nj < m && g[ni][nj] == '#') {\n                    ++bad;\n                    bi = ni;\n                    bj = nj;\n                }\n            }\n            if (g[i][j] == '.') {\n                if (bad == 0) {\n                    ++base;\n                } else if (bad == 1) {\n                    ++gain[bi][bj];\n                }\n            } else {\n                if (bad == 0) {\n                    ++gain[i][j];\n                }\n            }\n        }\n    }\n\n    int bestGain = 0;\n    for (int i = 0; i < n; ++i)\n        for (int j = 0; j < m; ++j)\n            bestGain = max(bestGain, gain[i][j]);\n\n    cout << base + bestGain << '\\n';\n    return 0;\n}\n",
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 7,
      "reviewedFields": ["question","explanation","referenceCode","reviewedBy","reviewedAt","sourcePage"],
    },
        {
      id: 27,
      type: 'programming',
      samples: [
        { input: `3 4
1 2 1 0
2 4 2 1
0 3 3 0`, output: `2` }
      ],
      question: "# [GESP202503 四级] 二阶矩阵\n\n## 题目描述\n\n小 A 有一个 $n$ 行 $m$ 列的矩阵 $A$。\n\n小 A 认为一个 $2 \\times 2$ 的矩阵 $D$ 是好的，当且仅当 $D_{1,1} \\times D_{2,2} = D_{1,2} \\times D_{2,1}$。其中 $D_{i,j}$ 表示矩阵 $D$ 的第 $i$ 行第 $j$ 列的元素。\n\n小 A 想知道 $A$ 中有多少个好的子矩阵。\n\n## 输入格式\n\n第一行，两个正整数 $n, m$。\n\n接下来 $n$ 行，每行 $m$ 个整数 $A_{i,1}, A_{i,2}, \\ldots, A_{i,m}$。\n\n## 输出格式\n\n一行，一个整数，表示 $A$ 中好的子矩阵的数量。\n\n## 数据范围\n\n对于所有测试点，保证 $1 \\le n \\le 500$，$1 \\le m \\le 500$，$-100 \\le A_{i,j} \\le 100$。\n",
      score: 25,
      explanation: "**解析：**\n\n本题考查二维数组遍历与连续 2x2 子矩阵判定。对左上角 (i,j)（0-based），四个元素为 a[i][j]、a[i][j+1]、a[i+1][j]、a[i+1][j+1]，好子矩阵条件为 a[i][j] * a[i+1][j+1] == a[i][j+1] * a[i+1][j]。枚举 i=0..n-2、j=0..m-2 逐格判断并计数即可；当 n=1 或 m=1 时没有 2x2 子矩阵，答案为 0。\n\n数据范围 |A[i][j]| <= 100，乘积绝对值不超过 10000，32 位 int 也安全；参考代码使用 long long 更保守。\n\n**样例走查：** 左上角 (0,0) 的 [[1,2],[2,4]] 满足 1*4=2*2=4；左上角 (0,1) 的 [[2,1],[4,2]] 满足 2*2=1*4=4；其余四个 2x2 子矩阵不满足，故输出 2。\n\n**复杂度：** 时间 O(nm)，空间 O(nm)。",
      tags: ["编程题", "GESP4级"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      referenceCode: "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    int n, m;\n    cin >> n >> m;\n    vector<vector<long long>> a(n, vector<long long>(m));\n    for (auto &row : a) for (auto &x : row) cin >> x;\n    long long cnt = 0;\n    for (int i = 0; i + 1 < n; ++i)\n        for (int j = 0; j + 1 < m; ++j)\n            if (a[i][j] * a[i + 1][j + 1] == a[i][j + 1] * a[i + 1][j]) cnt++;\n    cout << cnt << endl;\n    return 0;\n}",
      answer: '',
      "reviewedBy": "AI · DeepSeek V4.1 Flash 初核 / GLM 5.3 Flash 独立复核",
      "reviewedAt": "2026-11-07",
      "sourcePage": 9,
      "reviewedFields": ["question","explanation","reviewedBy","reviewedAt","sourcePage"],
    }
    ]
};
