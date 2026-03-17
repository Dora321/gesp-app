// 2023年6月 GESP C++ 三级真题
export const paperData = {
  id: '2023-06-l3',
  title: '2023年6月 GESP C++ 三级真题',
  level: 3,
  year: 2023,
  month: 6,
  session: 2,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    type: 'public-recovery',
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: '高级语言编写的程序需要经过以下（ ）操作，可以生成在计算机上运行的可执行代码。',
      options: ['编辑', '保存', '调试', '编译'],
      answer: 3,
      score: 2,
      explanation: '编译是将源代码转换为机器可执行代码的过程。',
      tags: ['计算机基础']
    },
    {
      id: 2,
      type: 'single',
      question: '二进制数 11.01 在十进制下是（ ）。',
      options: ['3.01', '3.05', '3.125', '3.25'],
      answer: 3,
      score: 2,
      explanation: '11.01₂ = 2¹ + 2⁰ + 0×2⁻¹ + 1×2⁻² = 2 + 1 + 0.25 = 3.25。',
      tags: ['数制转换']
    },
    {
      id: 3,
      type: 'single',
      question: '已知大写字符\'A\'的 ASCII 编码的十六进制表示为 0x41，则字符\'F\'的 ASCII 编码的十六进制表示为（ ）。',
      options: ['46', '47', '48', '49'],
      answer: 0,
      score: 2,
      explanation: '\'F\' 比 \'A\' 大 5，0x41 + 5 = 0x46。',
      tags: ['计算机基础']
    },
    {
      id: 4,
      type: 'single',
      question: '以下哪个不是 C++语言中的运算符？（ ）',
      options: ['&', '&&', '*', '**'],
      answer: 3,
      score: 2,
      explanation: 'C++ 没有 ** 运算符（指数运算）。',
      tags: ['计算机基础']
    },
    {
      id: 5,
      type: 'single',
      question: '如果字符串定义为 char str[] = "Hello";，则字符数组 str 的长度为（ ）。',
      options: ['0', '5', '6', '7'],
      answer: 2,
      score: 2,
      explanation: '字符串 "Hello" 包含 5 个字符，数组结尾自动补一个 \'\\0\'，总长 6。',
      tags: ['字符串']
    },
    {
      id: 6,
      type: 'single',
      question: '一个数组定义为 double array[3];，则这个数组占用内存的大小为（ ）。',
      options: ['24', '12', '6', '3'],
      answer: 0,
      score: 2,
      explanation: 'double 占 8 字节，3 * 8 = 24。',
      tags: ['计算机基础']
    },
    {
      id: 7,
      type: 'single',
      question: '以下数组定义，符合 C++语言语法的是（ ）。',
      options: ['int a[];', 'int b[\'3\'];', 'int c[3.0];', 'int[3] d;'],
      answer: 1,
      score: 2,
      explanation: '字符 \'3\' 的 ASCII 值 (51) 可作为常量表达式用于数组大小。',
      tags: ['数组']
    },
    {
      id: 8,
      type: 'single',
      question: '下列关于进制的叙述，不正确的是（ ）。',
      options: [
        '正整数的二进制表示中只会出现 0 和 1',
        '10 不是 2 的整数次幂，所以十进制数无法转换为二进制数',
        '从二进制转换为 8 进制时，可以方便地将每 3 位二进制位转换',
        '从二进制转换为 16 进制时，可以方便地将每 4 位二进制位转换'
      ],
      answer: 1,
      score: 2,
      explanation: '任何十进制正整数都可以转换为二进制。',
      tags: ['数制转换']
    },
    {
      id: 9,
      type: 'single',
      question: '下列关于 C++语言中数组的叙述，不正确的是（ ）。',
      options: [
        '数组必须先 definition 后使用',
        '数组的所有元素在内存中是连续存放的',
        '除了字符数组，在定义数组时“[ ]”内必须有常数',
        '不能对数组赋值，但可以对数组的每个基础类型的元素赋值'
      ],
      answer: 2,
      score: 2,
      explanation: '不仅字符数组，任何通过初始化列表初始化的数组都可以省略 [ ] 内的数值（由编译器推断）。',
      tags: ['数组']
    },
    {
      id: 10,
      type: 'single',
      question: '一个 int 类型的值，做以下哪个操作，一定会变回原来的值？（ ）',
      options: [
        '左移 3 位，再右移 3 位',
        '右移 3 位，再左移 3 位',
        '按位或 7，再按位与-8',
        '按位异或 7，再按位异或 7'
      ],
      answer: 3,
      score: 2,
      explanation: '异或同一个数两次等于原值。A/B 可能造成位丢失。',
      tags: ['位运算']
    },
    {
      id: 11,
      type: 'single',
      question: '如果 a 和 b 均为 int 类型的变量，下列表达式能正确判断“a 等于 b”的是（ ）。',
      options: ['((a / b) == 1)', '((a & b) == a)', '((a ^ b) == 0)', '((a | b) == b)'],
      answer: 2,
      score: 2,
      explanation: '异或结果为 0 说明两数完全等同。',
      tags: ['位运算']
    },
    {
      id: 12,
      type: 'single',
      question: '如果 a 为 int 类型的变量，下列哪个表达式可以正确求出满足“小于等于 a 且是 4 的倍数”的整数中最大的？',
      options: ['(a & (~3))', '((a << 2) >> 2)', '(a ^ 3)', '((a - 1) | 3) + 1'],
      answer: 0,
      score: 2,
      explanation: '& (~3) 能够清除低两位的位，保留 4 的倍数部分。',
      tags: ['位运算']
    },
    {
      id: 13,
      type: 'single',
      question: '在下列代码的横线处填写（ ），可以使得输出是“24 12”\n`int a = 12, b = 24; a = a ^ b; ___________; a = a ^ b;`',
      options: ['a = a ^ b', 'b = a ^ b', 'a = a + b', 'b = a + b'],
      answer: 1,
      score: 2,
      explanation: '经典的位运算交换两数方法。',
      tags: ['位运算']
    },
    {
      id: 14,
      type: 'single',
      question: '在下列代码的横线处填写（ ），可以使得输出是“2”\n`int array[] = {3, 11, 2, 5, 24}; int min = array[0];`\n`for (int i = 1; i < 5; i++) { if (___________) min = array[i]; }`',
      options: ['min > array[i]', 'min < array[i]', 'min = array[i]', '以上均不对'],
      answer: 0,
      score: 2,
      explanation: '寻找最小值的逻辑。',
      tags: ['算法']
    },
    {
      id: 15,
      type: 'single',
      question: '在下列代码的横线处填写（ ），可以使得输出不是“31”\n`int array[] = {1, 2, 4, 8, 16}; int res = 0;`\n`for (int i = 0; i < 5; i++) { ___________ }`',
      options: ['res = res + array[i]', 'res = res & array[i]', 'res = res | array[i]', 'res = res ^ array[i]'],
      answer: 1,
      score: 2,
      explanation: '1+2+4+8+16 = 31。按位与 (res & array[i]) 会使结果变为 0。',
      tags: ['位运算']
    },
    {
      id: 16,
      type: 'judge',
      question: '一个算法可以用不同的形式来描述，但不能用自然语言描述。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '自然语言、流程图、伪代码、程序语言均可描述算法。',
      tags: ['编程基础']
    },
    {
      id: 17,
      type: 'judge',
      question: 'CCF 官方网站域名是 gesp.ccf.org.cn，其中顶级域名是 gesp。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '顶级域名通常是 .cn 或 .com 等最右侧部分。',
      tags: ['计算机基础']
    },
    {
      id: 18,
      type: 'judge',
      question: '数据编码方式只有原码、反码、补码三种。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '还有移码、浮点数编码等。',
      tags: ['计算机基础']
    },
    {
      id: 19,
      type: 'judge',
      question: '长度为 n 的数组，合理的下标范围是从 0 到 n，包括 0 和 n。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '范围是 0 到 n-1。',
      tags: ['数组']
    },
    {
      id: 20,
      type: 'judge',
      question: '字符常量 \'\\0\' 常用来表示字符串结束，它和字符 \'0\' 是不同的。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '\'\\0\' ASCII 为 0，\'0\' ASCII 为 48。',
      tags: ['字符串']
    },
    {
      id: 21,
      type: 'judge',
      question: '在 C++中，可以使用字符（如 \'0\'）作为数组下标。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '字符会自动提升为整数 index。',
      tags: ['数组']
    },
    {
      id: 22,
      type: 'judge',
      question: '在 C++中，数组被定义时，其大小就确定了。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '静态数组大小在编译期或运行期（C99/VLA等，但标准 C++ 静态分配）确定后不可变。',
      tags: ['数组']
    },
    {
      id: 23,
      type: 'judge',
      question: '编写程序时将所有十进制数改写为相同数值的二进制数，会使得运行效率更高。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '编译器会自动处理，源码中的进制表达不影响机器码效率。',
      tags: ['计算机基础']
    },
    {
      id: 11,
      type: 'judge',
      question: '在 C++语言中，表达式 (0xf == 015) 的值为 true。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '0xf 是 15，015 是八进制的 13。不相等。',
      tags: ['数制转换']
    },
    {
      id: 25,
      type: 'judge',
      question: '如果 a 为变量，且表达式 ((a | 3) == 3) 为 true，说明 a 在 0 到 3 之间。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'a | 3 == 3 表示 a 的二进制位没有超出 3 (11₂) 的范围，即只能是 0, 1, 2, 3。',
      tags: ['位运算']
    }
  ],
  programmingQuestions: [
    {
      id: 26,
      type: 'programming',
      title: '春游',
      question: '【春游】班级有 N 位同学，编号 0 到 N-1。报号 M 次。从小到大输出未到同学编号。若全到输出 N。',
      answer: '',
      score: 25,
      explanation: '使用 bool 数组标记。',
      tags: ['数组', '算法']
    },
    {
      id: 27,
      type: 'programming',
      title: '密码合规检测',
      question: '【密码合规检测】检测密码：6-12位，包含特殊字符(!@#$)，且(大写/小写/数字)至少两种。',
      answer: '',
      score: 25,
      explanation: '字符串遍历与分类统计。',
      tags: ['字符串', '逻辑']
    }
  ]
};
