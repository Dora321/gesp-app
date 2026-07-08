const TAGS = {
  basics: '基础语法',
  io: '输入输出',
  condition: '条件判断',
  loop: '循环',
  operator: '运算符',
  system: '计算机基础',
};

export const paperData = {
  id: '2024-03-l1',
  title: '2024年3月 GESP C++ 一级真题',
  level: 1,
  year: 2024,
  month: 3,
  session: 5,
  timeLimit: 5400,
  source: {
    officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2024%E5%B9%B43%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    type: 'official-verified',
  },
  verification: {
    status: 'verified',
    reviewedBy: '本站校订',
    reviewedAt: '2026-07-04',
    scope: '题面、代码、选项与答案',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `C++ 表达式 \`(3 - 2) * 3 + 5\` 的值是（ ）。`,
      options: ['-13', '8', '2', '0'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

先算括号：\`3 - 2 = 1\`，再算乘法：\`1 * 3 = 3\`，最后加 5，结果为 \`8\`。`,
      tags: [TAGS.operator],
    },
    {
      id: 2,
      type: 'single',
      question: `C++ 语句 \`cout << "5%2=" << 5 % 2\` 执行后的输出是（ ）。`,
      options: ['2 2', '1 1', '5%2=2', '5%2=1'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

\`"5%2="\` 会原样输出，\`5 % 2\` 的余数是 \`1\`，所以最终输出 \`5%2=1\`。`,
      tags: [TAGS.io, TAGS.operator],
    },
    {
      id: 3,
      type: 'single',
      question: `执行 C++ 语句 \`cin >> a\` 时如果输入 \`5+2\`，下述说法正确的是（ ）。`,
      options: [
        '变量 a 将被赋值为整数 7',
        '变量 a 将被赋值为字符串，字符串内容为 5+2',
        '语句执行将报错，不能输入表达式',
        '依赖于变量 a 的类型。如果没有定义，会有编译错误',
      ],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

\`cin >> a\` 如何读取，取决于 \`a\` 的类型；如果 \`a\` 没有声明，程序会编译错误。\`cin\` 不会把 \`5+2\` 当作表达式求值。`,
      tags: [TAGS.io, TAGS.basics],
    },
    {
      id: 4,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（ ）。\n\n\`\`\`cpp\nint a = 1;\ncout << "a+1= " << a+1 << endl;\n\`\`\``,
      options: ['a+1= 2', 'a+1=2', '2=2', '2= 2'],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

字符串 \`"a+1= "\` 中等号后有一个空格，\`a + 1\` 的值为 2，所以输出 \`a+1= 2\`。`,
      tags: [TAGS.io, TAGS.operator],
    },
    {
      id: 5,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（ ）。\n\n\`\`\`cpp\nint a = 1;\nprintf("a+1=%d\\n", a+1);\n\`\`\``,
      options: ['a+1= 2', 'a+1=2', '2=2', '2= 2'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

\`printf\` 的格式串是 \`"a+1=%d\\n"\`，等号后没有空格；\`%d\` 被 \`a+1\` 的值 2 替换，输出 \`a+1=2\`。`,
      tags: [TAGS.io],
    },
    {
      id: 6,
      type: 'single',
      question: `下面 C++ 代码执行时输入 \`21\` 后，有关描述正确的是（ ）。\n\n\`\`\`cpp\nint N;\ncin >> N;\nif(N % 3 == 0)\n    cout << "能被3整除";\nelse if (N % 7 == 0)\n    cout << "能被7整除";\nelse\n    cout << "不能被3和7整除";\ncout << endl;\n\`\`\``,
      options: [
        '代码第 4 行被执行',
        '第 4 和第 7 行代码都被执行',
        '仅有代码第 7 行被执行',
        '第 8 行代码将被执行，因为 input() 输入为字符串',
      ],
      answer: 0,
      score: 2,
      explanation: `**答案：A**

输入 \`21\` 后，\`21 % 3 == 0\` 成立，所以执行第一个分支，即输出“能被3整除”。\`else if\` 和 \`else\` 分支不会再执行。`,
      tags: [TAGS.condition, TAGS.io],
    },
    {
      id: 7,
      type: 'single',
      question: `下面 C++ 代码第 2 行，总共被执行次数是（ ）。\n\n\`\`\`cpp\nfor(int i=-10; i<10; i++)\n    cout << i << " ";\n\`\`\``,
      options: ['10', '19', '20', '21'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

\`i\` 从 \`-10\` 到 \`9\`，一共有 20 个整数，因此第 2 行执行 20 次。`,
      tags: [TAGS.loop],
    },
    {
      id: 8,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（ ）。\n\n\`\`\`cpp\nint tnt = 0;\nfor(int i=0; i<10; i++)\n    if(i%3 && i%7)\n        tnt += i;\ncout << tnt << endl;\n\`\`\``,
      options: ['0', '7', '18', '20'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

\`i%3 && i%7\` 表示 \`i\` 既不能被 3 整除，也不能被 7 整除。0 到 9 中满足条件的是 1、2、4、5、8，和为 20。`,
      tags: [TAGS.loop, TAGS.condition, TAGS.operator],
    },
    {
      id: 9,
      type: 'single',
      question: `下面 C++ 代码执行后的输出是（ ）。\n\n\`\`\`cpp\nint N = 10;\nwhile(N){\n    N -= 1;\n    if(N%3 == 0)\n        cout << N << "#";\n}\n\`\`\``,
      options: ['9#6#3#', '9#6#3#0#', '8#7#5#4#2#1#', '10#8#7#5#4#2#1#'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

循环中先让 \`N -= 1\`，再判断是否能被 3 整除。依次输出 \`9#\`、\`6#\`、\`3#\`、\`0#\`。`,
      tags: [TAGS.loop, TAGS.condition],
    },
    {
      id: 10,
      type: 'single',
      question: `下面 C++ 代码用于判断键盘输入的整数是否为质数。质数是只能被 1 和它本身整除的数。在横线处应填入代码是（ ）。\n\n\`\`\`cpp\nint N;\ncin >> N;\nint cnt = 0; // 记录N被整除的次数\nfor(int i=1; i<N+1; i++)\n    if(________________)\n        cnt += 1;\nif(cnt == 2)\n    cout << N << "是质数";\nelse\n    cout << N << "不是质数";\n\`\`\``,
      options: ['N % i', 'N % i == 0', 'N / i == 0', 'N / i'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

要统计能整除 \`N\` 的数，条件应为 \`N % i == 0\`。`,
      tags: [TAGS.loop, TAGS.condition, TAGS.operator],
    },
    {
      id: 11,
      type: 'single',
      question: `下面关于整型变量 \`int x\` 的赋值语句不正确的是（ ）。`,
      options: ['x=(3.16);', 'x=3.16;', 'x=int(3.16);', 'x=3.16 int;'],
      answer: 3,
      score: 2,
      explanation: `**答案：D**

\`x=3.16 int;\` 不符合 C++ 语法。前三项虽然会发生类型转换或截断，但语法上可以成立。`,
      tags: ['数据类型', '变量与标识符'],
    },
    {
      id: 12,
      type: 'single',
      question: `C++ 语言中下面可以完成数据输入的语句是（ ）。`,
      options: ['printf语句', 'scanf语句', 'default语句', 'cout语句'],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

\`scanf\` 是 C/C++ 中常见的格式化输入函数。`,
      tags: [TAGS.io],
    },
    {
      id: 13,
      type: 'single',
      question: `在 Dev C++ 中对一个写好的 C++ 源文件要生成一个可执行程序需要执行下面哪个处理步骤？（ ）`,
      options: ['创建', '编辑', '编译', '调试'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

源代码需要经过编译，才能生成可执行程序。`,
      tags: [TAGS.system],
    },
    {
      id: 14,
      type: 'single',
      question: `小杨的父母最近刚刚给他买了一块华为手表，他说手表上跑的是鸿蒙，这个鸿蒙是？（ ）`,
      options: ['小程序', '计时器', '操作系统', '神话人物'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

鸿蒙通常指华为的 HarmonyOS，是操作系统。`,
      tags: [TAGS.system],
    },
    {
      id: 15,
      type: 'single',
      question: `中国计算机学会（CCF）在 2024 年 1 月 27 日的颁奖典礼上颁布了王选奖，王选先生的重大贡献是（ ）。`,
      options: ['制造自动驾驶汽车', '创立培训学校', '发明汉字激光照排系统', '成立方正公司'],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

王选先生的重要贡献是主持研制汉字激光照排系统。`,
      tags: [TAGS.system],
    },
    {
      id: 16,
      type: 'judge',
      question: `在 C++ 代码中变量 \`n\` 被赋值为 \`27\`，则 \`cout << n%10\` 执行后输出的是 \`7\`。（ ）`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

\`27 % 10\` 取个位，结果为 7。`,
      tags: [TAGS.operator],
    },
    {
      id: 17,
      type: 'judge',
      question: `C++ 语句 \`printf("%d#%d&",2,3)\` 执行后输出的是 \`2#3&\`。（ ）`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

两个 \`%d\` 分别被 2 和 3 替换，普通字符 \`#\`、\`&\` 原样输出。`,
      tags: [TAGS.io],
    },
    {
      id: 18,
      type: 'judge',
      question: `C++ 函数 \`scanf()\` 必须含有参数，且其参数为字符串型字面量，其功能是提示输入。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

\`scanf\` 的功能是读取输入，不是提示输入。提示信息通常应使用 \`printf\` 或 \`cout\` 输出。`,
      tags: [TAGS.io],
    },
    {
      id: 19,
      type: 'judge',
      question: `C++ 表达式 \`"10"*2\` 执行时将报错，因为 \`"10"\` 是字符串类型而 \`2\` 是整数类型，它们数据类型不同，不能在一起运算。（ ）`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

C++ 不支持像 Python 那样用整数重复字符串，字符串字面量不能直接与整数相乘。`,
      tags: ['数据类型'],
    },
    {
      id: 20,
      type: 'judge',
      question: `在 C++ 中，\`while\` 可能是死循环，而 \`for\` 循环不可能是死循环。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

\`for(;;)\` 就是典型的无限循环，因此 \`for\` 也可能写成死循环。`,
      tags: [TAGS.loop],
    },
    {
      id: 21,
      type: 'judge',
      question: `在 C++，\`break\` 语句用于提前终止当前层次循环，适用于 \`while\` 循环，但不适用于 \`for\` 循环。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

\`break\` 可以用于 \`for\`、\`while\`、\`do-while\` 循环，也可以用于 \`switch\`。`,
      tags: [TAGS.loop],
    },
    {
      id: 22,
      type: 'judge',
      question: `C++ 语言中 \`3.0\` 和 \`3\` 的值相等，所以它们占用的存储空间也相同。（ ）`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

\`3.0\` 默认是浮点类型 \`double\`，\`3\` 是整型字面量。数值相等不代表类型和存储空间相同。`,
      tags: ['数据类型'],
    },
    {
      id: 23,
      type: 'judge',
      question: `在 C++ 的程序中，\`cin\` 是一个合法的变量名。（ ）`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

\`cin\` 不是 C++ 关键字，语法上可以作为标识符。不过实际编程中不建议这样命名，容易与标准输入流混淆。`,
      tags: ['变量与标识符'],
    },
    {
      id: 24,
      type: 'judge',
      question: `小杨今年春节回奶奶家了，奶奶家的数字电视可以通过遥控器输入电视剧名称来找到想播放的电视剧，所以可以推知里面有交互式程序在运行。（ ）`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

用户通过遥控器输入，系统处理并返回搜索结果，符合交互式程序“输入、处理、输出”的特征。`,
      tags: [TAGS.system],
    },
    {
      id: 25,
      type: 'judge',
      question: `任何一个 \`for\` 循环都可以转化为等价的 \`while\` 循环。（ ）`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

\`for\` 循环的初始化、条件、更新部分都可以改写到 \`while\` 循环前、条件中和循环体末尾。`,
      tags: [TAGS.loop],
    },
    {
      id: 26,
      type: 'programming',
      question: `
# [GESP202403 一级] 小杨买书

## 题目描述

小杨同学积攒了一部分零用钱想要用来购买书籍，已知一本书的单价是 13 元，请根据小杨零用钱的金额，编写程序计算最多可以购买多少本书，还剩多少零用钱。

## 输入格式

输入一个正整数 $m$，表示小杨拥有的零用钱数。

## 输出格式

输出包含两行。第一行输出购买图书的本数，第二行输出剩余的零用钱数。`,
      samples: [
        { input: `100`, output: `7\n9` },
        { input: `199`, output: `15\n4` },
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
    int m;
    cin >> m;
    cout << m / 13 << endl;
    cout << m % 13 << endl;
    return 0;
}`,
      answer: '',
      score: 25,
      explanation: `**解析：**
本题考查整数除法与取余运算。已知书单价 13 元，零用钱为 \`m\`：
- 用整数除法 \`m / 13\` 求最多能买的本数（自动向下取整）；
- 用取余运算 \`m % 13\` 求买完书后剩余的零用钱。
例如 \`m = 100\` 时，\`100 / 13 = 7\` 本，余 \`100 % 13 = 9\` 元，与样例一致。`,
      tags: [TAGS.operator, TAGS.io],
    },
    {
      id: 27,
      type: 'programming',
      question: `
# [GESP202403 一级] 找因数

## 题目描述

如果一个正整数 $a$ 可以被另一个正整数 $b$ 整除，那么我们就说 $b$ 是 $a$ 的因数。请你帮忙写一个程序，从小到大输出正整数 $a$ 的所有因数。

## 输入格式

输入一行一个正整数 $a$，保证 $a \\le 1000$。

## 输出格式

输出若干行，为 $a$ 的所有因数，从小到大排列。`,
      samples: [
        { input: `11`, output: `1\n11` },
        { input: `6`, output: `1\n2\n3\n6` },
        { input: `10`, output: `1\n2\n5\n10` },
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
    int a;
    cin >> a;
    for (int i = 1; i <= a; ++i) {
        if (a % i == 0) {
            cout << i << endl;
        }
    }
    return 0;
}`,
      answer: '',
      score: 25,
      explanation: `**解析：**
因数是指能整除 \`a\` 的正整数。从小到大枚举 \`i\` 从 \`1\` 到 \`a\`，若 \`a % i == 0\` 说明 \`i\` 是 \`a\` 的因数，直接输出。
注意循环上界取 \`a\` 即可（或优化到 \`sqrt(a)\`），保证不漏掉 \`a\` 本身。例如 \`a = 6\` 时输出 \`1 2 3 6\`。`,
      tags: [TAGS.loop, TAGS.condition, TAGS.operator],
    },
  ],
};
