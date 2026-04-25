import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2024-09-l1',
  title: '2024年9月GESP C++ 一级认证真题',
  level: 1,
  year: 2024,
  month: 9,
  session: 7,
  timeLimit: 5400,
  source: {
    officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B49%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    type: 'official-verified',
  },
  confidence: {
    answer: 1.0,
    statement: 0.9,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `据有关资料，山东大学于 1972 年研制成功 DJL-1 计算机，并于 1973 年投入运行。DJL-1 计算机运算控制部分所使用的磁心存储元件相当于现代计算机的（ ）。`,
      options: ['内存', '磁盘', 'CPU', '显示器'],
      answer: 0,
      score: 2,
      explanation: '磁心存储元件承担的是临时存储数据的作用，对应现代计算机中的内存。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 2,
      type: 'single',
      question: `C++ 程序执行出现错误时，不太常见的调试手段是（ ）。`,
      options: ['阅读源代码', '单步调试', '输出执行中间结果', '跟踪汇编代码'],
      answer: 3,
      score: 2,
      explanation: '跟踪汇编代码属于更底层的调试方式，一般不是一级阶段的常用手段。',
      tags: [LEVEL1_TAGS.basics]
    },
    {
      id: 3,
      type: 'single',
      question: `在 C++ 中，下列表达式错误的是（ ）。`,
      options: [
        'cout << "Hello,GESP!" << endl;',
        "cout << 'Hello,GESP!' << endl;",
        'cout << """Hello,GESP!""" << endl;',
        'cout << "Hello,GESP!\' << endl;'
      ],
      answer: 3,
      score: 2,
      explanation: '第 4 项的字符串定界符不匹配，会导致编译错误。',
      tags: [LEVEL1_TAGS.io, LEVEL1_TAGS.basics]
    },
    {
      id: 4,
      type: 'single',
      question: `C++ 表达式 \`10 - 3 * 2\` 的值是（ ）。`,
      options: ['14', '4', '1', '0'],
      answer: 1,
      score: 2,
      explanation: '先算乘法 `3 * 2 = 6`，再算减法，结果是 `4`。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 5,
      type: 'single',
      question: `在 C++ 中，假设 \`N\` 为正整数 \`10\`，则 \`cout << (N / 3 + N % 3)\` 将输出（ ）。`,
      options: ['6', '4.3', '4', '2'],
      answer: 2,
      score: 2,
      explanation: '`10 / 3 = 3`，`10 % 3 = 1`，相加得到 `4`。',
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.io]
    },
    {
      id: 6,
      type: 'single',
      question: `C++ 语句 \`printf("6%%2={%d}", 6 % 2)\` 执行后的输出是（ ）。`,
      options: ['"6%2={6%2}"', '6%2={6%2}', '0=0', '6%2={0}'],
      answer: 3,
      score: 2,
      explanation: '`%%` 会输出 `%`，`6 % 2` 的结果为 `0`。',
      tags: [LEVEL1_TAGS.io]
    },
    {
      id: 7,
      type: 'single',
      question: `成功执行下面的 C++ 代码，先后从键盘输入 \`5\` 回车和 \`2\` 回车，输出是（ ）。\n\`\`\`cpp\ncin >> a;\ncin >> b;\ncout << a + b;\n\`\`\``,
      options: [
        '将输出整数 7',
        '将输出 52，5 和 2 之间没有空格',
        '将输出 5 和 2，5 和 2 之间有空格',
        '执行结果不确定，因为代码段没有显示 a 和 b 的数据类型'
      ],
      answer: 3,
      score: 2,
      explanation: '题目没有说明 `a` 和 `b` 的类型，不同类型下 `a + b` 的含义不同。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.io]
    },
    {
      id: 8,
      type: 'single',
      question: `下面 C++ 代码执行后输出是（ ）。\n\`\`\`cpp\nint Sum = 0;\nfor (int i = 0; i < 10; i++)\n Sum += i;\ncout << Sum;\n\`\`\``,
      options: ['55', '45', '10', '9'],
      answer: 1,
      score: 2,
      explanation: '`0 + 1 + 2 + ... + 9 = 45`。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 9,
      type: 'single',
      question: `下面 C++ 代码执行后输出的是（ ）。\n\`\`\`cpp\nint N = 0;\nfor (int i = 0; i < 10; i++)\n N += 1;\ncout << N;\n\`\`\``,
      options: ['55', '45', '10', '9'],
      answer: 2,
      score: 2,
      explanation: '循环执行 10 次，每次 `N` 增加 `1`，所以结果是 `10`。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 10,
      type: 'single',
      question: `下面 C++ 代码执行后输出的是（ ）。\n\`\`\`cpp\nint N = 0;\nfor (int i = 1; i < 10; i += 2) {\n if (i % 2 == 1)\n continue;\n N += 1;\n}\ncout << N;\n\`\`\``,
      options: ['5', '4', '2', '0'],
      answer: 3,
      score: 2,
      explanation: '`i` 依次为 `1、3、5、7、9`，每次都满足 `i % 2 == 1`，因此 `N` 不会增加。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition]
    },
    {
      id: 11,
      type: 'single',
      question: `下面 C++ 代码执行时输入 \`14+7\` 后，正确的输出是（ ）。\n\`\`\`cpp\nint P;\nprintf("请输入正整数P: ");\nscanf("%d", &P);\nif (P % 3 || P % 7)\n printf("第5行代码%d, %d", P % 3, P % 7);\nelse\n printf("第7行代码%2d", P % 3 && P % 7);\n\`\`\``,
      options: ['第5行代码2, 0', '第5行代码1, 0', '第7行代码 1', '第7行代码 0'],
      answer: 0,
      score: 2,
      explanation: '`scanf("%d")` 读到 `+` 时停止，所以 `P = 14`。此时 `P % 3 = 2`，`P % 7 = 0`，进入 `if` 分支。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator, LEVEL1_TAGS.io]
    },
    {
      id: 12,
      type: 'single',
      question: `执行下面 C++ 代码后得到的输出是（ ）。\n\`\`\`cpp\nint count = 0, i, s;\nfor (i = 0, s = 0; i < 20; i++, count++)\n s += i++;\ncout << s << " " << count;\n\`\`\``,
      options: ['190 20', '95 10', '90 19', '90 10'],
      answer: 3,
      score: 2,
      explanation: '每次循环中 `i` 实际增加两次，因此取值为 `0、2、4、...、18`，和为 `90`，循环次数为 `10`。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator]
    },
    {
      id: 13,
      type: 'single',
      question: `下面 C++ 代码拟用于计算整数 \`N\` 的位数，比如对 \`123\` 则输出 \`123是3位整数\`，但代码中可能存在 bug。下列描述正确的是（ ）。\n\`\`\`cpp\nint N, N0, rc = 0;\ncout << "请输入整数:";\ncin >> N;\nN0 = N;\nwhile (N) {\n rc++;\n N /= 10;\n}\nprintf("%d是%d位整数\\n", N, rc); // L11\n\`\`\``,
      options: [
        '变量 N0 占用额外空间，可以去掉',
        '代码对所有整数都能计算出正确位数',
        'L11 标记的代码行简单修改后可以对正整数给出正确输出',
        'L11 标记的代码行的输出格式有误'
      ],
      answer: 2,
      score: 2,
      explanation: '循环结束后 `N` 已经变成 `0`，应在输出时使用 `N0`。',
      tags: [LEVEL1_TAGS.loop]
    },
    {
      id: 14,
      type: 'single',
      question: `下面的 C++ 代码用于求连续输入的若干正五位数的百位数之和。例如输入 \`32488 25731 41232 0\`，则输出 \`3个正五位数的百位数之和为13\`。有关描述错误的是（ ）。\n\`\`\`cpp\nint M, Sum = 0, rc = 0;\ncout << "请输入正整数:";\ncin >> M;\nwhile (M) {\n M = (M / 100 % 10); // L6\n Sum += M;\n rc++;\n cin >> M;\n}\ncout << rc << "个正五位数的百位数之和为" << Sum;\n\`\`\``,
      options: [
        '如果输入 `23221 23453 12345 11111 0`，则最后一行中 Sum 的值是 10',
        '如果输入 `2322 2345 1234 1111 0`，程序也能运行',
        '将 L6 改为 `M = (M % 1000 / 100);` 同样能实现题目要求',
        '将 L6 改为 `M = (M % 100 / 10);` 同样能实现题目要求'
      ],
      answer: 3,
      score: 2,
      explanation: '`M % 100 / 10` 取的是十位数，不是百位数。',
      tags: [LEVEL1_TAGS.operator]
    },
    {
      id: 15,
      type: 'single',
      question: `如果一个正整数 \`N\` 能够表示成 \`X * (X + 1)\` 的形式，就称它是一个“兄弟数”。用来判断 \`N\` 是否为兄弟数，在 \`if()\` 中可选的表达式有几个？\n\ni) \`N == i * (i + 1)\`\nii) \`N == i * (i - 1)\`\niii) \`N / (i + 1) == i\`\niv) \`N / (i - 1) == i\``,
      options: ['1', '2', '3', '4'],
      answer: 1,
      score: 2,
      explanation: 'i) 可以直接判断；ii) 当枚举到 `i = X + 1` 时也能成立。iii) 和 iv) 受整数除法影响，不够严谨。',
      tags: [LEVEL1_TAGS.condition, LEVEL1_TAGS.operator]
    },
    {
      id: 16,
      type: 'judge',
      question: `小杨最近开始学习 C++ 编程，老师说 C++ 是一门面向对象的编程语言，也是一门高级语言。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '这个说法正确。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 17,
      type: 'judge',
      question: `在 C++ 中，表达式 \`10 / 4\` 和 \`10 % 4\` 的值相同，都是整数 \`2\`，说明 \`/\` 和 \`%\` 可以互相替换。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '两者这次结果碰巧相同，但含义完全不同，不能互相替换。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 18,
      type: 'judge',
      question: `N 是 C++ 程序中的整型变量，则语句 \`scanf("%d", &N)\` 能接收正整数、负整数和 \`0\` 输入，但如果输入含字母或带小数点的数，将导致程序无法执行。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '格式不匹配时读取会失败，但程序并不会因此“无法执行”。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.io]
    },
    {
      id: 19,
      type: 'judge',
      question: `下面 C++ 代码能够执行，则将输出 \`45\`。\n\`\`\`cpp\nfor (int i = 0; i < 10; i++)\n Sum += i;\ncout << Sum;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '代码中没有给出 `Sum` 的声明，按题面原样并不能保证正确执行，因此该说法错误。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 20,
      type: 'judge',
      question: `在 C++ 代码中整型变量 \`X\` 被赋值为 \`20.24\`，则 \`cout << (X++, X + 1) / 10\` 执行后输出的是 \`2.124\`。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '`X` 先变成 `20`，逗号表达式最终取 `X + 1 = 22`，`22 / 10` 的整数结果是 `2`。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 21,
      type: 'judge',
      question: `下面 C++ 代码执行后，最后一次输出是 \`10\`。\n\`\`\`cpp\nfor (int i = 1; i < 10; i += 3)\n cout << i << endl;\n\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '输出依次是 `1、4、7`，最后一次输出不是 `10`。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.loop]
    },
    {
      id: 22,
      type: 'judge',
      question: `在 C++ 中，\`break\` 语句通常与 \`if\` 语句配合使用。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '`break` 可以单独在 `switch` 或循环中使用，题目把它说成“通常与 if 配合”并不严谨，官方答案为错误。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.condition]
    },
    {
      id: 23,
      type: 'judge',
      question: `在 C++ 代码中，不可以将变量命名为 \`five-star\`，因为变量名中不可以出现 \`-\`（减号）符号。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '变量名中确实不能使用减号。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.basics]
    },
    {
      id: 24,
      type: 'judge',
      question: `在 C++ 语言中，整型、实数型、字符型、布尔型是不相同的数据类型，但这四种类型的变量间都可以比较大小。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: '这些基础类型都可以参与比较运算，比较时会发生相应的类型转换。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 25,
      type: 'judge',
      question: `C++ 中，定义变量 \`int a = 5, b = 4, c = 3\`，则表达式 \`(a < b < c)\` 的值为逻辑假。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: '`a < b` 的结果是 `0`，接着计算 `0 < c`，结果为真。',
      tags: [LEVEL1_TAGS.judge, LEVEL1_TAGS.operator]
    },
    {
      id: 26,
      type: 'programming',
      question: `
# [GESP202409 一级] 小杨购物

## 题目描述

小杨有 $n$ 元钱用于购物。商品 A 的单价是 $a$ 元，商品 B 的单价是 $b$ 元。小杨想购买**相同数量**的商品 A 和商品 B。请你编写程序，计算他最多能够购买多少个商品 A 和多少个商品 B。

## 输入格式

第一行包含一个正整数 $n$，表示小杨用于购物的钱数。

第二行包含一个正整数 $a$，表示商品 A 的单价。

第三行包含一个正整数 $b$，表示商品 B 的单价。

## 输出格式

输出一行，包含一个整数，表示小杨最多能够购买的商品 A 和商品 B 的数量。
`,
      samples: [
        { input: `12\n1\n2`, output: `4` },
        { input: `13\n1\n2`, output: `4` }
      ],
      template: `#include <iostream>
using namespace std;

int main() {
    // 在此填写代码
    return 0;
}`,
      referenceCode: `#include <iostream>
using namespace std;

int main() {
    int n, a, b;
    cin >> n >> a >> b;
    cout << n / (a + b) << "\\n";
    return 0;
}`,
      answer: '',
      score: 25,
      explanation: '每买一组商品需要花费 `a + b` 元，所以最多能买 `n / (a + b)` 组。',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator],
    },
    {
      id: 27,
      type: 'programming',
      question: `
# [GESP202409 一级] 美丽数字

## 题目描述

小杨有 $n$ 个正整数。他认为一个正整数是美丽数字，当且仅当这个正整数是 **9 的倍数但不是 8 的倍数**。请你编写程序，计算这 $n$ 个正整数中美丽数字的数量。

## 输入格式

第一行包含一个正整数 $n$，表示正整数的个数。

第二行包含 $n$ 个正整数 $a_1, a_2, ..., a_n$。

## 输出格式

输出一个整数，表示其中美丽数字的数量。
`,
      samples: [
        { input: `3\n1 9 72`, output: `1` }
      ],
      template: `#include <iostream>
using namespace std;

int main() {
    // 在此填写代码
    return 0;
}`,
      referenceCode: `#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int count = 0;
    while (n--) {
        int val;
        cin >> val;
        if (val % 9 == 0 && val % 8 != 0) {
            count++;
        }
    }
    cout << count << "\\n";
    return 0;
}`,
      answer: '',
      score: 25,
      explanation: '逐个读入数字，满足 `val % 9 == 0 && val % 8 != 0` 就计数。',
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    }
  ]
};
