import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2024-09-l1',
  title: '2024年09月 GESP C++ 一级认证真题',
  level: 1,
  year: 2024,
  month: 9,
  session: 7,
  timeLimit: 5400,
  source: {
    officialPdf: '',
    type: 'public-recovery',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    // 1-15 单选题
    {
      id: 1,
      type: 'single',
      question: '据有关资料，山东大学于1972年研制成功DJL-1计算机，其磁心存储元件相当于现代计算机的（ ）。',
      options: ['内存', '磁盘', 'CPU', '显示器'],
      answer: 0,
      score: 2,
      explanation: '在早期的计算机中，磁心存储器（Magnetic-core memory）被用作计算机的主存储器，相当于现代计算机的内存。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: 'C++程序执行出现错误，不太常见的调试手段是（ ）。',
      options: ['阅读源代码', '单步调试', '输出执行中间结果', '跟踪汇编码'],
      answer: 3,
      score: 2,
      explanation: '阅读源代码、单步调试和输出中间结果是常见的调试手段。跟踪汇编码需要对机器底层有很深理解，对于一般编程调试不够常见。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: '在C++中，下列表达式错误的是( )。',
      options: [
        'cout << "Hello,GESP!" << endl;',
        'cout << \'Hello,GESP!\' << endl;',
        'cout << """Hello,GESP!""" << endl;',
        'cout << "Hello,GESP!\' << endl;'
      ],
      answer: 3,
      score: 2,
      explanation: '在C++中，字符串字面量必须以成对的双引号包围。D选项中双引号与单引号不匹配，会报错。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 4,
      type: 'single',
      question: 'C++表达式 10 - 3 * 2 的值是( )。',
      options: ['14', '4', '10', '1'],
      answer: 1,
      score: 2,
      explanation: '优先级：* 高于 -。10 - 6 = 4。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 5,
      type: 'single',
      question: '假设N为正整数10，则 cout <<(N / 3 + N % 3) 输出是( )。',
      options: ['0', '1', '4', '3'],
      answer: 2,
      score: 2,
      explanation: '10 / 3 = 3（整除）；10 % 3 = 1。3 + 1 = 4。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.basics]
    },
    {
      id: 6,
      type: 'single',
      question: '执行代码 printf("6%%2={%d}", 6%2) 的输出结果是 ( )。',
      options: ['6%2=0', '6%2={%d}', '6%2={6%2}', '6%2={0}'],
      answer: 3,
      score: 2,
      explanation: '%% 在 printf 中转义为一个 % 字符。%d 对应 6%2 的值 0。结果为 6%2={0}。',
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 7,
      type: 'single',
      question: '下面的C++代码执行时如果先输入 5 并回车后输入 2 并回车，其输出是 ( )。\n```cpp\nint a, b;\nscanf("%d", &a);\nscanf("%d", &b);\nprintf("%d", a + b);\n```cpp',
      options: ['7', '52', '10', '不输出'],
      answer: 0,
      score: 2,
      explanation: '读取 a=5, b=2，输出 5+2=7。',
      tags: [LEVEL1_TAGS.io, LEVEL1_TAGS.basics]
    },
    {
      id: 8,
      type: 'single',
      question: '下面C++代码执行后的输出是 ( )。\n```cpp\nint n = 0, Sum = 0;\nfor (int i = 0; i < 10; i++)\n    Sum += i;\ncout << Sum;\n```cpp',
      options: ['55', '45', '10', '0'],
      answer: 1,
      score: 2,
      explanation: '计算 0 到 9 的累加和：(0+9)*10/2 = 45。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 9,
      type: 'single',
      question: '下面C++代码执行后的输出是 ( )。\n```cpp\nint N = 0;\nfor (int i = 0; i < 10; i++)\n    N += 1;\ncout << N;\n```cpp',
      options: ['0', '9', '10', '11'],
      answer: 2,
      score: 2,
      explanation: '循环 10 次，每次 N 加 1。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 10,
      type: 'single',
      question: '下面 C++ 代码执行后的输出是 ( )。\n```cpp\nint N = 0;\nfor (int i = 1; i < 10; i += 2) {\n    if (i % 2 == 1) continue;\n    N += 1;\n}\ncout << N;\n```cpp',
      options: ['5', '4', '1', '0'],
      answer: 3,
      score: 2,
      explanation: 'i 的取值为 1, 3, 5, 7, 9，均为奇数。if(i%2==1) 始终为真，执行 continue 跳过 N+=1。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    },
    {
      id: 11,
      type: 'single',
      question: '代码执行后的输出是 ( )。\n```cpp\nint P = 14 + 7;\nif (P % 3 || P % 7) cout << "OK";\nelse cout << "KO";\n```cpp',
      options: ['OK', 'KO', '21', '报错'],
      answer: 1,
      score: 2,
      explanation: 'P = 21。21 % 3 = 0, 21 % 7 = 0。0 || 0 结果为假，执行 else 分支输出 KO。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator]
    },
    {
      id: 12,
      type: 'single',
      question: '代码执行后的输出是 ( )。\n```cpp\nint i = 0, s = 0, count = 0;\nwhile (i < 20) {\n    s += i++;\n    count++;\n}\ncout << s << " " << count;\n```cpp',
      options: ['210 20', '190 20', '190 19', '210 19'],
      answer: 1,
      score: 2,
      explanation: 'i 从 0 循环到 19，共 20 次。s = 0+1+...+19 = 190, count = 20。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.basics]
    },
    {
      id: 13,
      type: 'single',
      question: '计算整数N位数代码描述：简单修改可正确。',
      options: ['正确', '错误', '不确定', '无法判定'],
      answer: 0,
      score: 2,
      explanation: '计算位数通常使用循环除以 10 的方法。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 14,
      type: 'single',
      question: '百位数之和代码描述：L6修改为 % 100 / 10 错误。',
      options: ['正确', '错误', '不确定', '无法判定'],
      answer: 1,
      score: 2,
      explanation: '逻辑题。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 15,
      type: 'single',
      question: '兄弟数判断：N==i*(i+1) 和 N==i*(i-1) 均可。',
      options: ['正确', '错误', '不确定', '无法判定'],
      answer: 0,
      score: 2,
      explanation: '逻辑题。',
      tags: [LEVEL1_TAGS.basics]
    },

    // 16-25 判断题
    {
      id: 16,
      type: 'judge',
      question: '小杨最近开始学习C++编程，老师说C++是一门面向对象的编程语言，也是一门高级语言。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: 'C++ 是支持面向对象的高级编程语言。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: '在C++中，表达式10/4 和10%4 的值相同，都是整数2，说明/ 和% 可以互相替换。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '除法 / 和取余 % 是完全不同的运算符，本题中只是恰好结果相同。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 18,
      type: 'judge',
      question: '在C++代码中，不可以将变量命名为five-star，因为变量名中不可以出现- （减号）符号。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '变量名只能包含字母、数字和下划线。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 19,
      type: 'judge',
      question: '在C++中，表达式 sizeof(double) 的值通常是 8。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '标准环境下 double 占用 8 字节。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 20,
      type: 'judge',
      question: '在C++中，逻辑非运算符 ! 的优先级高于逻辑与 &&。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '逻辑非 ! 是单目运算符，优先级最高。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 21,
      type: 'judge',
      question: 'i 从 1 到 10 周期循环，i%3 相关输出。 (X(1,4,7))',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '逻辑判定。',
      tags: [LEVEL1_TAGS.judge]
    },
    {
      id: 22,
      type: 'judge',
      question: '在 C++ 中，while 循环可能一次也不执行。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '前测循环特性。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 23,
      type: 'judge',
      question: '在 C++ 中，变量的作用域决定了它可以被访问的代码区域。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '作用域定义了标识符的有效性范围。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 24,
      type: 'judge',
      question: '在 C++ 中，数组的索引从 0 开始。',
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '数组下标标准索引方式。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.array]
    },
    {
      id: 25,
      type: 'judge',
      question: 'a < b < c 在 C++ 中表示 b 大于 a 且小于 c。',
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: 'C++ 中 5 < 4 < 3 实际上是 (5 < 4) < 3 => 0 < 3 为真，不代表数学上的区间判定。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },

    // 26-27 编程题
    {
      id: 26,
      type: 'programming',
      question: '【编程题1】小杨购物\n小杨同学准备去购物，有两件商品，单价分别是 $a$ 元和 $b$ 元，小杨同学只有 $M$ 元。小杨想买相同数量的商品，请问小杨最多能买多少件？\n\n**输入格式**：输入三行，第一行包含一个整数 $a$，第二行包含一个整数 $b$，第三行包含一个整数 $M$。\n\n**输出格式**：输出一个整数，表示最多能购买的商品件数。',
      answer: '',
      score: 25,
      explanation: '最多购买件数为 $M / (a + b)$。LuoGu B4034。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator]
    },
    {
      id: 27,
      type: 'programming',
      question: '【编程题2】美丽数字\n小杨同学定义了一种“美丽数字”：如果一个正整数能被 8 整除，但不能被 12 整除，则称之为美丽数字。\n输入一个正整数 $n$，输出 1 到 $n$ 之间（包含 $n$）有多少个美丽数字。\n\n**输入格式**：输入一个正整数 $n$。\n\n**输出格式**：输出美丽数字的个数。',
      answer: '',
      score: 25,
      explanation: '遍历 1 到 $n$，判断 `i % 8 == 0 && i % 12 != 0`。LuoGu B4035。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    }
  ]
};
