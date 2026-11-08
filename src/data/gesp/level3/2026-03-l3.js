// 2026-03-l3 五维核验记录见 docs/question-bank-verification
export const paperData = {
    id: "2026-03-l3",
    title: "2026年3月 GESP C++ 三级真题",
    level: 3,
    year: 2026,
    month: 3,
    session: 13,
    timeLimit: 5400,
    source: {
        officialPdf: "https://gesp.ccf.org.cn/101/attach/1734775052173344.pdf",
        type: "official",
        notes: "AI-Codex于2026-11-08逐页对照登记mirror PDF全部9页，补原流程图、Q3选项B代码归属及两编程题完整数据范围。官方答案保持，参考程序和模板GNU C++17编译及独立样例边界核验通过。",
        url: "https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B43%E6%9C%88-C%2B%2B3%E7%BA%A7.pdf"
    },
    verification: {
        status: "verified",
        reviewedBy: "AI-Codex",
        reviewedAt: "2026-11-08",
        scope: "全卷五维逐题对照mirror PDF，参考程序独立编译运行，源疑点保持隔离。",
        notes: "AI-Codex逐页对照登记mirror PDF全部9页，Git blob SHA d71b439c4f46b746b3b20e36f11193714f802416一致。逐题五维核验，补两张流程图，恢复Q3题干与选项B代码归属，补两编程题范围。全部25个客观answer字段保持，2编程题未定义answer的结构保持，参考程序独立编译与边界核验，Q3选项B及Q4未定义代码只编译不执行。",
        dimensions: {
            statement: "verified",
            options: "verified",
            answer: "verified",
            explanation: "verified",
            referenceCode: "verified"
        }
    },
    questions: [
        {
            id: 1,
            type: "single",
            question: "如果字符变量 `_1` 的值是字符 `1`，那么 `(int)_1` 的值是（ ）。",
            options: [
                "1",
                "-1",
                "49",
                "+1 或者 -1"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n按题目采用的 ASCII 字符编码，字符 1 的编码为十进制 49，强制转换为 int 保留这个编码值，因此选择 49。它与数值常量 1 含义不同，若要取得该数字字符表示的数值，可计算 _1−'0'，结果才为 1。变量名 _1 本身不改变字符的编码。",
            tags: [
                "字符与ASCII",
                "类型转换"
            ]
        },
        {
            id: 2,
            type: "single",
            question: "`a`、`b` 是整型变量，各自有互不相同的初始值。下列程序实现了什么效果（ ）。\n```cpp\na = a ^ b;\nb = a ^ b;\na = a ^ b;\n```",
            options: [
                "`a`、`b` 的值从始至终都没有改变",
                "`a`、`b` 的值实现了互换",
                "`a`、`b` 的值互换了以后，又还回去了，相当于没有变化",
                "`a`、`b` 的值最后和原值不一样，没有任何意义"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n设原值为 A、B。第一步 a=A^B，第二步 b=(A^B)^B=A，第三步 a=(A^B)^A=B。利用异或的交换、结合以及 u^u=0、u^0=u 两个性质，两变量最终完成交换。题目说明初值不同，避免把交换相等数值时的无可见变化误作反例。",
            tags: [
                "位运算",
                "异或"
            ]
        },
        {
            id: 3,
            type: "single",
            question: "关于下列正确的程序段，说法正确的是（ ）。\n\n```cpp\nchar str1[] = \"Hello\";\nchar str2[] = {'H', 'e', 'l', 'l', '0'};\n```",
            options: [
                "字符数组 str1 和 str2 完全相同。",
                "```cpp\ncout << str1 << endl;\ncout << str2 << endl;\n```\n\n这段程序多次执行将输出不同的结果。",
                "字符数组 str1 和 str2 不相等。",
                "这两个赋值方式完全相同。"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\n字符串字面量初始化的 str1 有 6 个元素，依次为 H、e、l、l、o 和结束符\\0。str2 只有 5 个元素，最后一个是数字字符 0，并非小写字母 o，也不是空字符\\0，两数组长度与内容均不同，所以 C 正确。选项 B 的输出代码会把缺结束符的 str2 作为 C 字符串读取，超出其边界的行为无定义，不能保证每次一定不同。本题题干的正确代码只有两行定义，输出属于选项 B，不能挪入题干。",
            tags: [
                "字符串",
                "字符数组"
            ]
        },
        {
            id: 4,
            type: "single",
            question: "关于以下程序段，说法正确的是（ ）。\n```cpp\nint x = 10;\ncout << (x++) + (++x) << endl;\n```",
            options: [
                "C++11 标准中，这是未定义行为，不同的环境有可能出现不同的结果",
                "22",
                "21",
                "20"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n在加法两个操作数中对同一个 x 执行后缀和前缀自增，这些修改之间没有定序保证，属于未定义行为。选项 A 明确讨论 C++11，其结论成立，C++17也未给普通加法两个操作数建立所需定序。不能根据某次编译器偶然输出认定为 20、21 或 22，本轮只编译诊断，不运行该表达式。",
            tags: [
                "运算符",
                "未定义行为"
            ]
        },
        {
            id: 5,
            type: "single",
            question: "8 位二进制下，十进制数 `-15` 的补码是（ ）。",
            options: [
                "11110000",
                "10001111",
                "10010000",
                "11110001"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n把正数 15 写成 8 位二进制 00001111，各位取反得 11110000，再加 1 得 11110001。也可用 256−15=241，将 241 写成无符号位串核对。11110000 少了加 1，10001111 是常见的符号位加绝对值形式，均不是所求补码。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 6,
            type: "single",
            question: "三进制数 `2102(3)` 转换成十进制是（ ）。",
            options: [
                "63",
                "65",
                "67",
                "69"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n三进制各位从右向左对应 1、3、9、27，2102(3) 等于 2×27+1×9+0×3+2×1=65。下标 3 指定进制，不能把它当成数位，进制转换时必须按三的幂展开，不能沿用二进制或十进制位权。",
            tags: [
                "进制转换"
            ]
        },
        {
            id: 7,
            type: "single",
            question: "二进制数 `10110101` 是某数的 8 位补码，该数的十进制是（ ）。",
            options: [
                "-73",
                "-75",
                "-77",
                "75"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n8 位补码 10110101 的最高位为 1，表示负数。将整个位串视作无符号数得到 128+32+16+4+1=181，再减去 256 得 −75。也可取反 01001010 再加 1 得 01001011，即绝对值 75，核对负号得到同一结果。",
            tags: [
                "二进制",
                "补码"
            ]
        },
        {
            id: 8,
            type: "single",
            question: "已知 `unsigned char c = 0x0F;`（十六进制 `0F` = 二进制 `00001111`），执行 `c = c << 3;` 后，`c` 的十进制值是（ ）。",
            options: [
                "64",
                "72",
                "80",
                "120"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n0x0F 的值为 15。参与移位时 unsigned char 先进行整数提升，15 左移 3 位等于乘 8，得到 120，再赋回 c。该值在 unsigned char 可表示范围内，不发生截断，输出十进制值应为 120，位串对应 01111000。",
            tags: [
                "位运算",
                "左移"
            ]
        },
        {
            id: 9,
            type: "single",
            question: "补码的情况下，关于按位取反运算，用笔计算的情况下，以下说法错误的是（ ）。",
            options: [
                "`~5` 的结果是 `-6`（`int` 类型，32 位）",
                "`~0` 的结果是 `0`（`int` 类型，32 位）",
                "`~(-3)` 的结果是 `2`（`int` 类型，32 位）",
                "`~8` 的结果是 `-9`（`int` 类型，32 位）"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n按题设 32 位补码进行笔算，各位取反满足 ~x=−x−1。于是 ~5=−6、~0=−1、~(−3)=2、~8=−9。B 把 ~0 误写为 0，因此是错误描述。0 的 32 位表示全部为 0，取反后全部为 1，按补码解释正好是 −1。",
            tags: [
                "位运算",
                "按位取反"
            ]
        },
        {
            id: 10,
            type: "single",
            question: "执行以下 C++ 代码后，`sub` 的值是（ ）。\n```cpp\nstring str = \"GESP2026\";\nstring sub = str.substr(4, 2);\n```",
            options: [
                "20",
                "02",
                "2026",
                "026"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n字符串 GESP2026 的下标从 0 开始，下标 4 是字符 2，下标 5 是字符 0。substr(4,2) 从下标 4 取至多 2 个字符，这里剩余长度足够，得到 20。第二个参数是字符个数，不是结束下标，不能把后面整个 2026 都取出。",
            tags: [
                "字符串",
                "substr"
            ]
        },
        {
            id: 11,
            type: "single",
            question: "执行以下代码后，输出结果是（ ）。\n```cpp\nint arr[] = {5, 10, 15, 20, 25, 30};\nint count = sizeof(arr) / sizeof(arr[0]);\ncout << count;\n```",
            options: [
                "4",
                "6",
                "24",
                "30"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\n初始化列表共有 6 项，arr 是包含 6 个 int 的内置数组。sizeof(arr) 给出整个数组字节数，sizeof(arr[0]) 给出单个元素字节数，相除得到 6。在本机 int 为 4 字节时分子为 24，但题目输出的是相除后的元素数量，不是数组字节数。",
            tags: [
                "数组",
                "sizeof"
            ]
        },
        {
            id: 12,
            type: "single",
            question: "执行以下代码后，输出结果是（ ）。\n```cpp\nchar s[10] = \"abcde\";\nint a = sizeof(s) / sizeof(s[0]);\nint b = strlen(s);\ncout << a - b;\n```",
            options: [
                "4",
                "5",
                "6",
                "10"
            ],
            answer: 1,
            score: 2,
            explanation: "**答案 B**\n\nchar s[10] 的容量固定为 10 个 char，初始化 abcde 后还包含结束符，剩余元素补零。sizeof(s)/sizeof(s[0]) 为 10，strlen(s) 只统计首个结束符之前的 5 个字符，故 a−b=5。容量、有效字符串长度和结束符占位要分别计算。",
            tags: [
                "字符串",
                "sizeof"
            ]
        },
        {
            id: 13,
            type: "single",
            question: "以下问题中，最不适合用枚举法解决的是（ ）。",
            options: [
                "找出 `1~100` 之间所有能被 `7` 整除的数",
                "找出 `100~200` 之间的所有质数",
                "计算 `1+2+3+...+1000` 的和",
                "找出三位数中个位、十位、百位数字之和等于 `10` 的数"
            ],
            answer: 2,
            score: 2,
            explanation: "**答案 C**\n\nA、B、D 都是在有限候选集合中逐个测试条件并找出全部符合者，直接适合枚举。C 求连续整数和可使用等差数列公式 1000×1001/2=500500，一步求出。循环累加也能完成 C，但题目问最不适合，依据可用简单闭式公式比较选择 C。",
            tags: [
                "枚举",
                "算法思维"
            ]
        },
        {
            id: 14,
            type: "single",
            question: "用枚举法解决“鸡兔同笼问题：头共 35 个，脚共 94 只，求鸡和兔的数量”，以下枚举逻辑最合理的是（ ）。",
            options: [
                "枚举鸡的数量 `x`（`0~35`），兔的数量 `y = 35 - x`，判断 `2*x + 4*y == 94`",
                "枚举兔的数量 `y`（`0~94`），鸡的数量 `x = 35 - y`，判断 `2*x + 4*y == 94`",
                "枚举所有整数 `x`（`0~100`）和 `y`（`0~100`），判断 `x+y==35 && 2*x+4*y==94`",
                "枚举脚的总数 `sum`（`0~94`），判断 `sum == 94`"
            ],
            answer: 0,
            score: 2,
            explanation: "**答案 A**\n\n鸡数 x 在 0..35 之间，确定 x 后兔数只能是 35−x，因此 A 只检查 36 组候选且每组均满足头数与数量非负，再验证脚数即可。方程给出兔 12 只、鸡 23 只。B 枚举到 94 会引入负鸡数，C 的双循环重复枚举大量不可能的组合，D 无法得到两类动物数量。",
            tags: [
                "枚举",
                "应用题"
            ]
        },
        {
            id: 15,
            type: "single",
            question: "模拟“字符串加密”：规则为“每个字符 ASCII 码 + 3，若超过 `z`（122）则从 `a` 重新开始”，以下代码中正确的条件判断是（ ）。\n```cpp\nfor (int i = 0; i < str.length(); i++) {\n // 需补充条件：\n _______________________\n else {\n str[i] += 3;\n }\n}\n```",
            options: [
                "```cpp\nif (str[i] > 122) str[i] = str[i] + 3 - 26;\n```",
                "```cpp\nif (str[i] > 122) str[i] = str[i] - 26;\n```",
                "```cpp\nif (str[i] + 3 > 122) str[i] = str[i] - 26;\n```",
                "```cpp\nif (str[i] + 3 > 'z') str[i] = 'a' + (str[i] + 3 - 'z') - 1;\n```"
            ],
            answer: 3,
            score: 2,
            explanation: "**答案 D**\n\n在题目字母循环移位的情境中，必须先判断加 3 后是否超过 z。超过时按 a+(原字符+3−z)−1 回到字母表开头，x、y、z 分别变成 a、b、c，因此 D 正确。A/B 在加 3 前检查旧值，漏掉这三个字符，C 虽判断加 3 后的值，赋回时却少加了 3。",
            tags: [
                "字符串",
                "模拟"
            ]
        },
        {
            id: 16,
            type: "judge",
            question: "定义 `int arr[5] = {1,2,3};`，则 `arr[3]` 的值为 `0`，`arr[5]` 是合法下标。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n数组共有 5 项，有效下标为 0..4。只有前三项显式初始化时，其余元素值初始化为 0，所以 arr[3] 确实为 0，但 arr[5] 不属于合法元素下标。原句同时包含正确与错误两部分，整体判断错误，不需要实际访问越界下标来验证。",
            tags: [
                "数组"
            ]
        },
        {
            id: 17,
            type: "judge",
            question: "定义 `double arr[10];`，未手动初始化时，数组中所有元素的默认值为 `0.0`。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n原说法没有限定存储期。若 double arr[10] 是函数中的普通自动数组且没有初始化，元素具有不确定值，不能按全 0.0 读取。静态存储期数组则会进行零初始化。因此不能笼统保证全部未手动初始化数组都为 0.0，官方判断错误合理，本轮只运行静态数组及显式初始化对照。",
            tags: [
                "数组"
            ]
        },
        {
            id: 18,
            type: "judge",
            question: "定义 `int arr[] = {1,2,3};`，则 `sizeof(arr)` 的结果为 `12`（`int` 占 4 字节）。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n内置数组由连续的 3 个 int 元素组成，sizeof(arr)=3×sizeof(int)。题目已经限定 int 占 4 字节，所以结果为 12，判断正确。这里没有发生函数参数调整或数组到指针转换，sizeof 获取的是整个数组的大小，不能按指针大小计算。",
            tags: [
                "sizeof"
            ]
        },
        {
            id: 19,
            type: "judge",
            question: "下面的流程图是用来求 1+2+3+…+10 的和。请判断这个流程图的逻辑正确还是错误？\n\n![求和流程图，开始后令sum=0、i=1，判断i是否小于等于10，是则令sum=sum+i，再令i=i+1并返回判断，否则输出sum并结束。](/question-assets/2026-03-l3/q19-flow.png)",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n流程图先置 sum=0、i=1，每次判断 i≤10，满足时先把 i 累加进 sum，再将 i 加 1 并回到判断。累计状态依次为 1、3、6、10、15、21、28、36、45、55。i 变成 11 时退出并输出 55，包含 1 和 10 两个端点，流程正确。",
            tags: [
                "流程图"
            ]
        },
        {
            id: 20,
            type: "judge",
            question: "下面流程图的功能是计算 5 对 2 取余数，输出结果为 1。\n\n![取余流程图，开始后令a=5、b=2，判断a是否大于等于b，是则令a=a-b并返回判断，否则输出a并结束。](/question-assets/2026-03-l3/q20-flow.png)",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n流程图以 a=5、b=2 开始，a≥b 时从 a 中减去 b 并返回判断。a 依次为 5、3、1，到 1 时不再满足 1≥2，输出 1 并结束。这是对非负被除数和正除数的重复减法取余，题设 b=2 保证过程能结束，判断正确。",
            tags: [
                "流程图"
            ]
        },
        {
            id: 21,
            type: "judge",
            question: "已知大写字符 `A` 的 ASCII 编码的十六进制表示为 `0x41`，计算字符 `m` 的 ASCII 编码的八进制表示为 `155`（八进制）。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\nASCII 中 A 的十六进制编码 0x41 等于十进制 65。小写 a 的编码为 97，m 比 a 后移 12 个字母位置，所以编码为 109。109=1×64+5×8+5，因此八进制表示为 155，原结论正确，进制标识不能省略后混作十进制值。",
            tags: [
                "字符与ASCII"
            ]
        },
        {
            id: 22,
            type: "judge",
            question: "在 C++ 位运算中，各种不同的运算符有优先级的区分，使用括号能够解决优先级的问题。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n位移、按位与、按位异或和按位或处于不同的优先级层次。括号可明确指定希望先组合的子表达式，例如 (a|b)&c 与 a|(b&c) 可以得到不同结果，所以原说法正确。括号确定分组，但不自动为所有副作用建立求值先后关系，不能据此消除任意未定义行为。",
            tags: [
                "位运算"
            ]
        },
        {
            id: 23,
            type: "judge",
            question: "由于在 `0~255` 范围内，`char` 类型和 `int` 类型可以互换，因此在这里 `x` 和 `y` 相等。\n```cpp\nchar x = '1';\nint y = 1;\n```",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n在 ASCII 环境中，char x='1' 保存字符编码 49，int y=1 保存数值 1。比较时 x 提升为 int 仍是 49，与 1 不相等，所以判断错误。char 的有无符号及实际可表示范围还依赖实现，不能笼统把 0..255 全部当成任意 char 的范围。",
            tags: [
                "字符与ASCII"
            ]
        },
        {
            id: 24,
            type: "judge",
            question: "在 C++ 语言中，表达式 `((0xf0 + 0x15) == 255)` 的值为 `true`。",
            options: [
                "正确",
                "错误"
            ],
            answer: 1,
            score: 2,
            explanation: "**判断 错误**\n\n0xf0 是十六进制 240，0x15 是十六进制 21，相加为 261，不等于 255，所以表达式值为 false，原判断错误。如果要得到 255，需要 240+15，十六进制第二项应是 0x0f，不能把 0x15 按十进制 15 来计算。",
            tags: [
                "十六进制"
            ]
        },
        {
            id: 25,
            type: "judge",
            question: "如果 `a` 为 `int` 类型的变量，且 `a` 的二进制最低位为 `0`，则表达式 `((a & 3 & 1) == 0)` 的值为 `true`。",
            options: [
                "正确",
                "错误"
            ],
            answer: 0,
            score: 2,
            explanation: "**判断 正确**\n\n连续的按位与可重新结合，a&3&1 等于 a&(3&1)，而 3&1=1。因此整个表达式只检测 a 的最低二进制位。题设该位是 0，所以按位与结果为 0，再与 0 比较得到 true。其他较高位不会影响这一结果，不需要把 a 的所有位都清零。",
            tags: [
                "位运算"
            ]
        }
    ],
    programmingQuestions: [
        {
            id: 26,
            type: "programming",
            title: "二进制回文串",
            problemNumber: "B4499",
            score: 25,
            description: "对于一个正整数 `n`，把它转换成不含前导零的二进制表示；如果这个二进制序列从左向右读与从右向左读完全相同，则称该数为二进制回文数。例如，`9` 的二进制表示为 `1001`，是二进制回文数；`12` 的二进制表示为 `1100`，不是二进制回文数。给定一个正整数 `n`，请计算在 `1` 到 `n` 的范围内二进制回文数的数量。\n\n## 数据范围\n\n$1 \\le n \\le 10^5$。\n\n时间限制 1 秒。内存限制 512 MB。",
            inputDescription: "输入一行，包含一个正整数 `n`。",
            outputDescription: "输出一行，包含一个数，表示在 `1` 到 `n` 的范围内二进制回文数的数量。",
            samples: [
                {
                    input: "15",
                    output: "6"
                }
            ],
            explanation: "**解析**\n\n从 1 到 n 逐个枚举，临时变量反复除 2 取余得到二进制各位，用下标 j 和 pos−1−j 检查是否对称。虽然数组保存的是低位在前的顺序，序列是否回文在逆序后不变。每次必须重置 pos 和 ok，比较范围只限当前数的有效位。样例 1..15 的回文数为 1、3、5、7、9、15，共 6 个。n≤10^5 时最多 17 个二进制位，a[50] 足够，时间 O(n log n)，额外存储 O(log n)，本参考数组固定为 50 项。独立预言机直接拼接半串及镜像构造所有回文数，再统计不超过 n 的个数。",
            tags: [
                "编程题",
                "进制转换",
                "枚举"
            ],
            template: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n, a[50] = {0}, ans = 0;\n    cin >> n;\n    for (int i = 1; i <= n; i++) {\n        int t = i, pos = 0;\n        while (t) {\n            a[pos++] = t % 2;\n            t /= 2;\n        }\n        bool ok = true;\n        for (int j = 0; j < pos; j++)\n            if (a[j] != a[pos - j - 1]) {\n                ok = false;\n                break;\n            }\n        ans += ok;\n    }\n    cout << ans;\n    return 0;\n}"
        },
        {
            id: 27,
            type: "programming",
            title: "凯撒密码",
            problemNumber: "B4500",
            score: 25,
            description: "凯撒密码是一种替换加密技术，明文中的所有字母都会按照固定偏移量进行整体平移。例如偏移量是 `3` 时，`A` 会替换成 `D`，`B` 会替换成 `E`，……，`X` 会替换成 `A`，`Y` 会替换成 `B`，`Z` 会替换成 `C`。现在给你一组已破解的凯撒密码明文与密文，以及一个使用相同偏移量的待破解密文，请输出它对应的明文。\n\n## 数据范围\n\n保证密码长度均不超过 1000，所有字符串由大写字母组成。\n\n时间限制 1 秒。内存限制 512 MB。",
            inputDescription: "输入共三行：第一行是已破解的凯撒密码明文；第二行是对应密文；第三行是待破解的凯撒密码密文。",
            outputDescription: "输出一行，包含一个字符串，表示待破解的凯撒密码对应的明文。",
            samples: [
                {
                    input: "ABCDEFGVWXYZ\nDEFGHIJYZABC\nWKHTXLFNEURZQIRAMXPSVRYHUWKHODCBGRJ",
                    output: "THEQUICKBROWNFOXJUMPSOVERTHELAZYDOG"
                }
            ],
            explanation: "**解析**\n\n所有字符串为大写字母，已知明密文对应同一个循环偏移。取首对字符相减得到解密偏移 d=s1[0]−s2[0]，再用 (d%26+26)%26 归一化到 0..25。对密文字符计算 (c−'A'+d)%26 后加回 A，得到明文。样例 A→D 表示加密后移 3，解密等价前移 3 或后移 23，W/K/H 还原为 T/H/E，最终整串与样例输出一致。参考代码只需首对字符，其余明密文由题设保证一致。长度至多 1000，时间 O(待解密串长度)，除输入字符串外额外空间 O(1)。独立预言机使用显式轮换字母表查找逆映射，覆盖全部 26 种偏移及回绕边界。",
            tags: [
                "编程题",
                "字符串",
                "模拟"
            ],
            template: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s1, s2, s3;\n    cin >> s1 >> s2 >> s3;\n    // 在此编写代码\n    return 0;\n}",
            referenceCode: "#include <iostream>\n#include <string>\nusing namespace std;\n\nint main() {\n    string s1, s2, s3;\n    cin >> s1 >> s2 >> s3;\n    int d = s1[0] - s2[0];\n    d = (d % 26 + 26) % 26;\n    for (char c : s3) {\n        int ch = (c - 'A' + d) % 26;\n        cout << (char)(ch + 'A');\n    }\n    return 0;\n}"
        }
    ]
};
