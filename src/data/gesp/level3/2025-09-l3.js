// 2025年9月 GESP C++ 三级真题 (第11次认证)
// 数据说明：本卷以官方真题 PDF 为主完成回填。
//-客观题 1~15：题面主体、选项与单选答案可由官方 PDF 直接提取并整理；其中少量代码/版式题按官方 PDF 文本层做等价排版。
//-判断题 16~25：题面来自官方 PDF；官方 PDF 文本层未完整带出判断题答案表，当前答案依据公开解析交叉复核填写。
//-编程题 26~27：题名、题意主体、样例与参考代码来自官方 PDF；少量数据范围/公式符号因 PDF 文本层缺字，按官方题意做等价整理。
export const paperData = {
    id: '2025-09-l3',
    title: '2025年9月 GESP C++ 三级真题',
    level: 3,
    year: 2025,
    month: 9,
    session: 11,
    timeLimit: 90 * 60,
    source: {
        officialPdf: 'https://gesp.ccf.org.cn/101/attach/1703975921385504.pdf',
        notes: '客观题 25 题已尽量补齐；其中判断题答案因官方 PDF 文本层未完整带出答案表，现依据公开解析交叉复核。编程题 2 题已补题意、样例与参考代码；少量变量符号/范围文字按官方题意等价整理。'
    },
    questions: [
        {
            id: 1,
            type: 'single',
            question: `执行以下 C++ 代码后，c 的数值是（ ）。\n\`\`\`cpp\nint a = 10, b = 3;\ndouble c = a / b;\n\`\`\``,
            options: ['3.33333', '3.333', '3.0', '3.3'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (3.0)**
            
**选项逐项分析：**
- **C 3.0**：✅ 正确。在 C++ 中，当两个整数进行除法运算时（\`a / b\`），执行的是整数除法，结果会丢弃小数部分。$10 / 3 = 3$。随后将整数 \`3\` 赋值给 \`double\` 类型的变量 \`c\`，\`c\` 的值变为 \`3.0\`。
- **A/B/D**：❌ 错误。除非其中一个操作数被强制转换为浮点数（如 \`double(a) / b\`），否则不会得到 3.333。

**考点：** 整数除法规则与隐式类型转换`,
            tags: ['类型转换'],
        },
        {
            id: 2,
            type: 'single',
            question: `下列 C++ 表达式的结果为 true 的是（ ）。`,
            options: ['(5 <= 5) && (7 < 5)', '!(10 > 5)', '(10 != 10) || (5 >= 3)', '(5 == 3) && (4 > 2)'],
            answer: 2,
            score: 2,
            explanation: `**答案：C ((10 != 10) || (5 >= 3))**
            
**选项逐项分析：**
- **C (10 != 10) || (5 >= 3)**：✅ 正确。\`(10 != 10)\` 为 \`false\`，\`(5 >= 3)\` 为 \`true\`。根据逻辑或（\`||\`）运算规则，\`false || true\` 结果为 \`true\`。
- **A (5 <= 5) && (7 < 5)**：❌ 错误。\Result 是 \`true && false\`，为 \`false\`。
- **B !(10 > 5)**：❌ 错误。\`10 > 5\` 为 \`true\`，取反后为 \`false\`。
- **D (5 == 3) && (4 > 2)**：❌ 错误。\`false && true\` 结果为 \`false\`。

**考点：** 关系运算符与逻辑运算符（&&, ||, !）的组合计算`,
            tags: ['位运算', '逻辑判断'],
        },
        {
            id: 3,
            type: 'single',
            question: `以下关于 C++ 数组的说法，错误的是（ ）。`,
            options: [
                '数组的下标通常从 0 开始。',
                'int arr[5]; 声明了一个包含 5 个整数的数组。',
                '数组的大小必须在编译时确定，不能使用变量定义大小。',
                '可以通过 arr[5] 来访问 int arr[5]; 数组的最后一个元素。'
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (可以通过 arr[5] 来访问 int arr[5]; 数组的最后一个元素。)**
            
**选项逐项分析：**
- **D**：✅ 错误项（即正确答案）。\`int arr[5]\` 声明了 5 个元素，其下标范围是 \`0\` 到 \`4\`。下标 \`5\` 已经超出了数组的合法边界。数组的最后一个元素应通过 \`arr[4]\` 访问。
- **A**：❌ 正确。C++ 数组下标确实从 0 开始。
- **B**：❌ 正确。\`int arr[5]\` 是定义 5 个整数数组的标准方式。
- **C**：❌ 正确。静态数组的大小必须是常量表达式。

**考点：** 数组定义与下标边界（越界问题）`,
            tags: ['位运算', '按位取反', '数组'],
        },
        {
            id: 4,
            type: 'single',
            question: `执行以下 C++ 代码后，变量 sum 的值是（ ）。\n\`\`\`cpp\nint sum = 0;\nfor (int i = 1; i <= 5; i += 2) {\n sum += i;\n int sum = 0;\n}\n\`\`\``,
            options: ['6', '9', '15', '死循环'],
            answer: 1,
            score: 2,
            explanation: `**答案：B (9)**
            
**选项逐项分析：**
- **B 9**：✅ 正确。
  1. 外层定义了 \`int sum = 0\`。
  2. 循环中 \`i\` 分别取 \`1, 3, 5\`。
  3. 每次执行 \`sum += i\` 时，由于在 \`int sum = 0;\` 声明之前，使用的是外层的 \`sum\`。
  4. 累加过程：$0 + 1 + 3 + 5 = 9$。
  5. 内部重新声明的 \`int sum = 0;\` 会在每次循环结束时被销毁，不影响外层变量。
- **A/C/D**：❌ 错误。

**考点：** 变量作用域、遮蔽（Shadowing）与生命周期辨析`,
            tags: ['循环'],
        },
        {
            id: 5,
            type: 'single',
            question: `要正确定义一个返回两个整数中较大值的函数 max，应该使用（ ）。`,
            options: [
                'void max(int a, int b) { return a > b ? a : b; }',
                'int max(int a, int b) { if (a > b) return a; else return b; }',
                'int max(a, b) { if (a > b) return a; else return b; }',
                'void max(a, b) { cout << (a > b ? a : b); }'
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (int max(int a, int b) { if (a > b) return a; else return b; })**
            
**选项逐项分析：**
- **B**：✅ 正确。该定义包含了：
  1. 正确的返回类型 \`int\`。
  2. 正确的形参声明（类型 + 变量名）。
  3. 通过 \`return\` 语句返回结果。
- **A**：❌ 错误。返回类型声明为 \`void\`，无法返回数值。
- **C**：❌ 错误。形参 \`a, b\` 缺少类型声明。
- **D**：❌ 错误。既缺少形参类型，又使用了 \`void\` 且没有 \`return\`。

**考点：** C++ 函数定义的标准语法规范`,
            tags: ['位运算', '函数', '逻辑判断'],
        },
        {
            id: 6,
            type: 'single',
            question: `执行以下 C++ 代码后，数组 arr 的内容是（ ）。\n\`\`\`cpp\nint arr[4] = {1, 2, 3};\narr[3] = arr[0]+arr[2];\n\`\`\``,
            options: ['{1, 2, 3, 3}', '{1, 2, 3, 4}', '{1, 2, 3, 5}', '{1, 2, 3, 6}'],
            answer: 1,
            score: 2,
            explanation: `**答案：B ({1, 2, 3, 4})**
            
**选项逐项分析：**
- **B {1, 2, 3, 4}**：✅ 正确。
  1. \`int arr[4] = {1, 2, 3};\` 声明了一个长度为 4 的数组。前三个元素被初始化，第四个元素 \`arr[3]\` 会被自动初始化为 0。
  2. 执行 \`arr[3] = arr[0] + arr[2];\`。即 \`arr[3] = 1 + 3 = 4\`。
  3. 数组最终内容为 \`{1, 2, 3, 4}\`。
- **A/C/D**：❌ 错误。

**考点：** 数组初始化规则与下标访问`,
            tags: ['数组'],
        },
        {
            id: 7,
            type: 'single',
            question: `以下关于 C++ 函数的描述，正确的是（ ）。`,
            options: [
                '函数必须要有参数。',
                '函数通过 return 语句只能返回一个值，但是可以通过其他方式间接返回多个值。',
                'main 函数可以被其他函数调用。',
                '函数的定义可以直接嵌套，即一个函数内部可以真正定义另一个函数。'
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (函数通过 return 语句只能返回一个值，但是可以通过其他方式间接返回多个值。)**
            
**选项逐项分析：**
- **B**：✅ 正确。虽然 \`return\` 只能携带一个数值，但可以通过传递引用、指针，或者返回结构体/容器来实现逻辑上的多值返回。
- **A**：❌ 错误。函数可以定义为无参函数（参数列表为空或 \`void\`）。
- **C**：❌ 错误。\`main\` 函数由操作系统调用，作为程序入口，普通函数不应直接或递归调用它。
- **D**：❌ 错误。C++ 标准不允许在函数内部直接嵌套定义另一个具名函数（Lambda 表达式是匿名函数对象，性质不同）。

**考点：** C++ 函数机制与标准规范`,
            tags: ['函数'],
        },
        {
            id: 8,
            type: 'single',
            question: `以下 C++ 代码 count++ 执行的次数是（ ）。\n\`\`\`cpp\nint i = 10;\nint count = 0;\nwhile (i > 0) {\n i -= 3;\n continue;\n count++;\n}\n\`\`\``,
            options: ['2', '3', '4', '0'],
            answer: 3,
            score: 2,
            explanation: `**答案：D (0)**
            
**选项逐项分析：**
- **D 0**：✅ 正确。在 \`while\` 循环体内，\`continue\` 语句位于 \`count++\` 之前。每当程序执行到 \`continue\` 时，会直接跳过本次循环剩余的所有语句（包括 \`count++\`），直接开始下一轮条件判断。因此，\`count++\` 永远没有机会执行。
- **A/B/C**：❌ 错误。

**考点：** 循环控制语句（continue）的行为特性`,
            tags: ['循环'],
        },
        {
            id: 9,
            type: 'single',
            question: `以下 C++ 代码段的输出是（ ）。\n\`\`\`cpp\nfor (int i = 0; i < 4; i++) {\n for (int j = 0; j <= i; j++) {\n cout << j;\n }\n cout << "#";\n}\n\`\`\``,
            options: ['0#01#012#0123#', '1#12#123#1234#', '0#1#2#3#', '0#01#012#01243#'],
            answer: 0,
            score: 2,
            explanation: `**答案：A (0#01#012#0123#)**
            
**选项逐项分析：**
- **A 0#01#012#0123#**：✅ 正确。
  - 第一轮 (\`i=0\`): \`j\` 从 0 到 0，输出 \`0\`，随后输出 \`#\`。得到 \`0#\`。
  - 第二轮 (\`i=1\`): \`j\` 从 0 到 1，输出 \`01\`，随后输出 \`#\`。得到 \`01#\`。
  - 第三轮 (\`i=2\`): \`j\` 从 0 到 2，输出 \`012\`，随后输出 \`#\`。得到 \`012#\`。
  - 第四轮 (\`i=3\`): \`j\` 从 0 到 3，输出 \`0123\`，随后输出 \`#\`。得到 \`0123#\`。
- **B/C/D**：❌ 错误。

**考点：** 嵌套循环的执行流程模拟`,
            tags: ['位运算', '循环'],
        },
        {
            id: 10,
            type: 'single',
            question: `以下关于 C++ 变量作用域的说法，错误的是（ ）。`,
            options: [
                '在 for 循环语句中声明的变量，其作用域仅限于该循环体内。',
                '在函数内部声明的变量（局部变量），仅在函数内部有效。',
                '在所有函数外部声明的变量，在整个程序中都有效。',
                '不同函数中的局部变量可以同名，它们代表不同的内存单元。'
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (在所有函数外部声明的变量，在整个程序中都有效。)**
            
**选项逐项分析：**
- **C**：✅ 错误项（即正确答案）。全局变量（在函数外部定义的变量）其作用域仅限于该定义所在的文件。如果要在其他文件中使用，必须使用 \`extern\` 声明。因此，“在整个程序中都有效”的表述不够严谨。
- **A/B/D**：❌ 正确。均符合 C++ 变量作用域和生命周期的标准定义。

**考点：** 变量作用域（局部、全局、块级作用域）辨析`,
            tags: ['计算机基础'],
        },
        {
            id: 11,
            type: 'single',
            question: `关于以下代码的说法正确的是（ ）。\n\`\`\`cpp\nint reversed = 0;\nwhile (x != 0) {\n int digit = x % 10;\n x /= 10;\n reversed = reversed * 10+digit;\n}\n\`\`\``,
            options: [
                '能够反转任何位数的整数',
                '能够反转的最大位数正整数是 2147483647',
                '能够反转的最大位数正整数是 2147483648',
                '能够反转的最大位数正整数是 1463847412'
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (能够反转的最大位数正整数是 1463847412)**
            
**选项逐项分析：**
- **D**：✅ 正确。
  1. \`int\` 的最大正值为 $2,147,483,647$。
  2. 对于数字 \`1,463,847,412\`，反转后为 \`2,147,483,641\`，未溢出。
  3. 但如果数字更大（例如 \`1,463,847,413\`），反转后会得到 \`3,147,483,641\`，超出了 \`int\` 范围，发生溢出。
- **A/B/C**：❌ 错误。

**考点：** 数值范围限制与溢出处理`,
            tags: ['循环'],
        },
        {
            id: 12,
            type: 'single',
            question: `以下 C++ 代码试图查找数组中的最大值，划线处应填入（ ）。\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint findMax(int arr[], int size) {\n int maxVal = ________;\n for (int i = 1; i < size; i++) {\n if (arr[i] > maxVal) {\n maxVal = arr[i];\n }\n }\n return maxVal;\n}\n\`\`\``,
            options: ['0', 'arr[-1]', 'arr[0]', 'size'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (arr[0])**
            
**选项逐项分析：**
- **C arr[0]**：✅ 正确。在查找数组最大值的“打擂台”算法中，通常将第一个元素（索引为 0）设定为初始的最大值 (\`maxVal\`)，随后从第二个元素开始逐一比较更新。
- **A 0**：❌ 错误。如果数组中全是负数，初始为 0 会导致错误结果。
- **B arr[-1]**：❌ 错误。下标越界。
- **D size**：❌ 错误。逻辑错误，\`size\` 是数组长度。

**考点：** 查找最值的基本算法模型`,
            tags: ['数组', '循环'],
        },
        {
            id: 13,
            type: 'single',
            question: `以下关于 C++ 函数的说法，正确的是（ ）。`,
            options: [
                '函数参数传递只有值传递一种方式。',
                '函数的形参在函数调用结束后依然占用内存空间。',
                '没有返回值的函数必须声明为 void 类型，且不能包含 return 语句。',
                'C++11 及之后标准要求函数必须显式声明返回类型，不允许默认返回 int。'
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (C++11 及之后标准要求函数必须显式声明返回类型，不允许默认返回 int。)**
            
**选项逐项分析：**
- **D**：✅ 正确。在早期的 C 语言标准中，如果省略返回类型，默认为 \`int\`。但从 C++ 标准（以及现代 C 规范）开始，所有函数都必须显式声明返回类型。
- **A**：❌ 错误。参数传递有值传递、引用传递和指针传递。
- **B**：❌ 错误。形参是局部变量，函数执行结束其内存空间即被释放。
- **C**：❌ 错误。返回值类型为 \`void\` 的函数可以使用空的 \`return;\` 语句提前退出。

**考点：** C++ 函数声明与参数传递机制`,
            tags: ['函数', '计算机基础'],
        },
        {
            id: 14,
            type: 'single',
            question: `以下 C++ 代码中存在几处错误（ ）。\n\`\`\`cpp\n#include <iostream>\nusing namespace std;\nint main() {\n const int SIZE = 5;\n int arr[SIZE];\n for (int i = 0; i <= SIZE; i++) {\n arr[i] = i * 2;\n }\n cout << arr[SIZE] << endl;\n return 0;\n}\n\`\`\``,
            options: ['0 处', '1 处', '2 处', '3 处'],
            answer: 2,
            score: 2,
            explanation: `**答案：C (2 处)**
            
**选项逐项分析：**
- **C 2 处**：✅ 正确。
  1. 循环条件 \`i <= SIZE\`：当 \`i\` 等于 5 时，会尝试访问 \`arr[5]\`，发生数组越界。
  2. 输出语句 \`cout << arr[SIZE]\`：同样访问了下标为 5 的越界元素。
- **A/B/D**：❌ 错误。

**考点：** 数组边界判定（Off-by-one Error）`,
            tags: ['位运算', '循环'],
        },
        {
            id: 15,
            type: 'single',
            question: `以下关于 C++ 中 string 类和字符数组（char[]）的说法，错误的是（ ）。`,
            options: [
                'string 对象可以使用 = 进行赋值，而字符数组需要使用 strcpy。',
                'string 对象的长度可以使用 length() 成员函数获取，而字符数组需要使用 strlen() 函数。',
                'string 对象在内存中是动态分配空间的，因此可以自动处理字符串长度的变化。',
                'string 对象和字符数组都可以使用 == 运算符来直接比较两个字符串的内容是否相同。'
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (string 对象和字符数组都可以使用 == 运算符来直接比较两个字符串的内容是否相同。)**
            
**选项逐项分析：**
- **D**：✅ 错误项（即正确答案）。对于字符数组（\`char[]\`），\`==\` 比较的是数组的**起始内存地址**，而不是内容。比较内容必须使用 \`strcmp\`。
- **A**：❌ 正确。\`string\` 对象支持 \`=\` 赋值，字符数组需使用 \`strcpy\`。
- **B**：❌ 正确。\`string\` 使用 \`length()\`，字符数组常用 \`strlen()\`。
- **C**：❌ 正确。\`string\` 是类对象，支持自动扩容。

**考点：** string 类与原生字符数组的底层差异辨析`,
            tags: ['字符与ASCII', '字符串', '字符数组', '数组', '计算机基础'],
        },
        {
            id: 16,
            type: 'judge',
            question: `表达式 sizeof('a') 的结果总是 1，因为 'a' 是一个字符。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            该说法并不“总是”成立；在不同语言语境/实现背景下结论不应这样绝对化。公开解析给出的结论为错误。
            
            **考点：** 数组、sizeof
            `,
            tags: ['判断题', '数组', 'sizeof'],
        },
        {
            id: 17,
            type: 'judge',
            question: `在 C++ 中，所有全局变量如果没有显式初始化，都会被自动初始化为 0。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            未显式初始化的全局变量与静态存储期对象会被自动进行零初始化。
            
            **考点：** 
            `,
            tags: ['判断题'],
        },
        {
            id: 18,
            type: 'judge',
            question: `do { ... } while (false); 循环体内的语句至少会被执行一次。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            do-while 先执行循环体，再判断条件，因此至少执行一次。
            
            **考点：** 循环
            `,
            tags: ['判断题', '循环'],
        },
        {
            id: 19,
            type: 'judge',
            question: `在 C++ 中，++i 是一个左值表达式，而 i++ 是一个右值表达式。`,
            options: ['正确', '错误'],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**
            
            **判定依据：**
            前置自增通常返回可继续赋值/取地址的对象本身，后置自增返回旧值临时量。
            
            **考点：** 运算符
            `,
            tags: ['判断题', '运算符'],
        },
        {
            id: 20,
            type: 'judge',
            question: `对于 enum Color { RED, GREEN, BLUE };，RED 的类型是 int。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            RED 的类型是该枚举类型本身，不是 int；只是可在很多场景下转换为整数。
            
            **考点：** 枚举、算法思维
            `,
            tags: ['判断题', '枚举', '算法思维'],
        },
        {
            id: 21,
            type: 'judge',
            question: `宏定义 #define SQUARE(x) x * x 是一个安全的宏定义，SQUARE(2+3) 会正确计算出 25。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            未加括号会展开成 2+3*2+3，结果不是 25；安全写法应为 ((x) * (x))。
            
            **考点：** 
            `,
            tags: ['判断题'],
        },
        {
            id: 22,
            type: 'judge',
            question: `在 C++ 中，char 类型的取值范围总是 -128 到 127。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            普通 char 是否带符号由实现决定，不一定总是 -128 到 127。
            
            **考点：** 
            `,
            tags: ['判断题'],
        },
        {
            id: 23,
            type: 'judge',
            question: `表达式 a > b ? a : b = 10; 一定是合法的 C++ 代码。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            该表达式并非在所有情况下都合法，取决于条件运算结果是否可作为赋值左值。题干中的“一定”错误。
            
            **考点：** 
            `,
            tags: ['判断题'],
        },
        {
            id: 24,
            type: 'judge',
            question: `#include "file.h" 和 #include <file.h> 在编译器查找头文件时的搜索策略是完全相同的。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            双引号通常优先从当前源文件目录查找，尖括号通常优先查系统头文件路径，搜索策略并不完全相同。
            
            **考点：** 计算机基础
            `,
            tags: ['判断题', '计算机基础'],
        },
        {
            id: 25,
            type: 'judge',
            question: `在同一个作用域内，extern 声明的变量可以多次定义。`,
            options: ['正确', '错误'],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**
            
            **判定依据：**
            extern 主要用于声明；变量在同一作用域内不能被重复定义。
            
            **考点：** 
            `,
            tags: ['判断题'],
        }
    ],
    programmingQuestions: [
        {
      id: 26,
      type: 'programming',
      samples: [
        { input: `3
2 3 4`, output: `7` },
        { input: `5
1 3 2 2 5`, output: `13` }
      ],
      question: `
# [GESP202509 三级] 数组清零

## 题目描述

小 A 有一个由 $n$ 个非负整数构成的数组 $a = [a_1, a_2, \\ldots, a_n]$。他会对阵组 $a$ 重复进行以下操作，直到数组 $a$ 只包含 0。在一次操作中，小 A 会依次完成以下三个步骤：

1. 在数组 $a$ 中找到最大的整数，记其下标为 $k$。如果有多个最大值，那么选择其中下标最大的。
2. 从数组 $a$ 所有不为零的整数中找到最小的整数 $a_j$。
3. 将第一步找出的 $a_k$ 减去 $a_j$。

例如，数组 $a = [2, 3, 4]$ 需要 7 次操作变成 $[0, 0, 0]$：

$
[2, 3, 4] \\rightarrow [2, 3, 2] \\rightarrow [2, 1, 2] \\rightarrow [2, 1, 1] \\rightarrow [1, 1, 1] \\rightarrow [1, 1, 0] \\rightarrow [1, 0, 0] \\rightarrow [0, 0, 0]
$

小 A 想知道，对于给定的数组 $a$，需要多少次操作才能使得 $a$ 中的整数全部变成 0。可以证明，$a$ 中整数必然可以在有限次操作后全部变成 0。你能帮他计算出答案吗？

## 输入格式

第一行，一个正整数 $n$，表示数组 $a$ 的长度。

第二行，$n$ 个非负整数 $a_1, a_2, \\ldots, a_n$，表示数组 $a$ 中的整数。

## 输出格式

一行，一个正整数，表示 $a$ 中整数全部变成 0 所需要的操作次数。
`,
      explanation: `
      **解析：**
      直接按题意模拟即可：每轮先找“最右侧最大值”，再找当前所有正数中的最小值并做减法，统计轮数直到最大值也变成 0。若进一步分析，答案也可理解为排序后各层高度对剩余正数个数的贡献总和。
      `,
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '模拟', '数组'],
      referenceCode: '#include <algorithm>\n#include <cstdio>\nusing namespace std;\nconst int N = 105;\nint n;\nint a[N];\nint cnt;\nint main() {\n    scanf("%d", &n);\n    for (int i = 1; i <= n; i++) scanf("%d", &a[i]);\n    while (1) {\n        int mx = n;\n        for (int i = 1; i <= n; i++)\n            if (a[i] >= a[mx]) mx = i;\n        if (a[mx] == 0) break;\n        int mn = a[mx];\n        for (int i = 1; i <= n; i++)\n            if (a[i] > 0) mn = min(mn, a[i]);\n        a[mx] -= mn;\n        cnt++;\n    }\n    printf("%d\\n", cnt);\n    return 0;\n}',
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [
        { input: `9`, output: `MON TUE WED THU FRI SAT SUN
  1   2   3   4   5   6   7
  8   9  10  11  12  13  14
 15  16  17  18  19  20  21
 22  23  24  25  26  27  28
 29  30` },
        { input: `6`, output: `MON TUE WED THU FRI SAT SUN
                          1
  2   3   4   5   6   7   8
  9  10  11  12  13  14  15
 16  17  18  19  20  21  22
 23  24  25  26  27  28  29
 30` }
      ],
      question: `
# [GESP202509 三级] 日历制作

## 题目描述

小 A 想制作 $2025$ 年每个月的日历。他希望你能编写一个程序，按照格式输出给定月份的日历。

具体来说，第一行需要输出 MON TUE WED THU FRI SAT SUN，分别表示星期一到星期日。接下来若干行中依次输出这个月所包含的日期，日期的个位需要和对应星期几的缩写最后一个字母对齐。例如，$2025$ 年 $9$ 月 $1$ 日是星期一，在输出九月的日历时，$1$ 号的个位 $1$ 就需要与星期一 MON 的最后一个字母 N 对齐。九月的日历输出效果如下:

\`\`\`
MON TUE WED THU FRI SAT SUN
 1 2 3 4 5 6 7
 8 9 10 11 12 13 14
 15 16 17 18 19 20 21
 22 23 24 25 26 27 28
 29 30
\`\`\`

你能帮助小 A 完成日历的制作吗?

## 输入格式

一行，一个正整数 $m$，表示需要按照格式输出 $2025$ 年 $m$ 月的日历。

## 输出格式

输出包含若干行，表示 $2025$ 年 $m$ 月的日历。
`,
      explanation: `
      **解析：**
      已知 2025 年 9 月 1 日是星期一，可以向前或向后按每月天数推算任意月份 1 日对应的星期。输出时先补齐首周空位，再按宽度格式化输出每个日期即可。
      `,
      template: '#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n    return 0;\n}',
      score: 25,
      tags: ['编程题', '模拟', '日期', '格式化输出'],
      referenceCode: '#include <algorithm>\n#include <cstdio>\nusing namespace std;\nint days[20] = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};\nint main() {\n    int m;\n    scanf("%d", &m);\n    printf("MON TUE WED THU FRI SAT SUN\\n");\n    int d = days[m];\n    int w = 1;\n    if (m > 9) {\n        for (int i = 9; i < m; i++) w = (w+days[i]-1) % 7+1;\n    } else if (m < 9) {\n        for (int i = 8; i >= m; i--) w = ((w-days[i]) % 7+7) % 7;\n        if (w == 0) w = 7;\n    }\n    for (int i = 1; i < w; i++) printf("    ");\n    for (int i = 1; i <= d; i++) {\n        printf("% 3d", i);\n        w = w % 7+1;\n        if (w == 1 || i == d)\n            printf("\\n");\n        else\n            printf(" ");\n    }\n    return 0;\n}',
      answer: '',
    }
    ]
};
