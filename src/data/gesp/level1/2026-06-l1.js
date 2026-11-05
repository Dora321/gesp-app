// 2026年6月 GESP C++ 一级真题
import { LEVEL1_TAGS } from './shared.js';

export const paperData = {
  id: '2026-06-l1',
  title: '2026年6月 GESP C++ 一级真题',
  level: 1,
  year: 2026,
  month: 6,
  session: 14,
  timeLimit: 90 * 60,
  source: {
    officialPdf: 'https://raw.githubusercontent.com/Dora321/gesp-official-pdfs/main/pdfs/2026%E5%B9%B46%E6%9C%88-C%2B%2B1%E7%BA%A7.pdf',
    type: 'official',
    notes: '全卷依据官方 PDF 镜像逐题转录；判断题答案表与编程题样例经 200dpi 渲染核对。',
  },
  verification: {
  status: "verified",
  reviewedBy: "AI-Codex",
  reviewedAt: "2026-11-06",
  scope: "全卷五维逐题对照mirror PDF；参考代码独立编译运行，源疑点保持隔离。",
  notes: "AI-Codex 对照登记mirror PDF全部10页文本与渲染；Git blob SHA e771e576ce589f0c1c56efd0da05d815fe35c62a 一致。25题answer保持，Q27收入上限恢复为原卷4000.0；两份参考程序及模板另行GNU C++17编译与样例/边界运行。",
  dimensions: {
    statement: "verified",
    options: "verified",
    answer: "verified",
    explanation: "verified",
    referenceCode: "verified"
  }
},
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `学校组织到未来农场参观，小明听讲解员介绍，在智能温室中，湿度传感器可以连续检测土壤的湿度变化，并将检测到的湿度数据实时发送给中央控制器。中央控制器根据这些数据判断是否开启灌溉系统。请问，这里的湿度传感器所发挥的作用，类似于计算机系统中的哪一类组件？（ ）`,
      options: ['处理器', '存储器', '输入设备', '输出设备'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n湿度传感器采集土壤湿度并把数据送入中央控制器，与输入设备把外部信息转换并送入计算机的作用相同，选 C。中央控制器负责处理与判断，存储器负责保存数据，灌溉执行装置承担输出动作。不能因为传感器把数据“发送出去”，就相对于整个系统把它当成输出设备。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 2,
      type: 'single',
      question: `在使用某集成开发环境（比如 Dev-C++）来编辑源代码文件时，程序员经常需要在编辑区中对代码进行各种修改。以下关于在编辑区中执行的操作描述不正确的（ ）。`,
      options: [
        '可以将变量名 count 统一修改为 number',
        '可以连续撤销最近 2 次输入的内容',
        '可以调整代码行的缩进（如按 Tab 键）',
        '在注释文本中间不能混用中英文',
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n注释中可以同时包含中文和英文，只要编辑器及源文件采用兼容的字符编码即可，D 所说“不能混用”不正确。集成开发环境通常支持查找替换变量名、连续撤销和调整缩进，A、B、C 都是常见编辑操作。修改变量名时仍应核对作用域和替换范围，避免误改其他同名文本。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 3,
      type: 'single',
      question: `有关如下 C++ 代码的说法，正确的是（ ）。
\`\`\`cpp
float a = 3 + 3.5;
cout << a;
\`\`\``,
      options: [
        '代码执行将报错。如果将 a = 3 + 3.5 改为 a = 3 + 3 + 1/2 将能正常执行。',
        '代码执行将报错。如果将 a = 3 + 3.5 改为 a = 3.0 + 3.5 将能正常执行。',
        '代码能正常执行，将输出 6。',
        '代码能正常执行，将输出 6.5。',
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\n3 是整数，3.5 是 double，混合相加得到 6.5，再转换存入 float。6.5 可以被二进制浮点数准确表示，默认 cout 输出 6.5，故 D 对。原代码无需修正，不会因为整型与浮点型相加而报错；1/2 是整数除法得 0，也不是表示 0.5 的等价写法。",
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.operator],
    },
    {
      id: 4,
      type: 'single',
      question: `下列 C++ 表达式与 \`- 2 * 2 % 4\` 的值不同的是（ ）。`,
      options: ['- (2 * 2) % 4', '(- 2 * 2) % 4', '- 2 * (2 % 4)', '(2 * 2) % - 4'],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\n原式按一元负号优先、乘法与求余同级左结合，得到 (-2*2)%4=0。A、B 的分组也得到 0，D 为 4%-4=0；C 先算 2%4=2，再乘 -2 得 -4，因此与原式不同，选 C。求余允许负整数参与，只要求除数不为 0，不能套用只适用于正数的说法。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 5,
      type: 'single',
      question: `执行如下 C++ 代码片段，其输出是（ ）。
\`\`\`cpp
int a = 3;
int b = a;
a = 4;
printf("%d %d", a, b);
\`\`\``,
      options: ['3 3', '4 3', '4 4', '3 4'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n声明 b 时把 a 当时的值 3 复制给 b，之后 a=4 只改变 a，并不会让普通整数变量 b 随着变化。printf 按 %d 空格 %d 输出当前的 a 和 b，结果为 4 3，选 B。这里不是引用或地址共享，不能把两个变量误认为始终绑定。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 6,
      type: 'single',
      question: `如下 C++ 代码执行时输入 2026-6-27，下列说法正确的是（ ）。
\`\`\`cpp
int N;
cin >> N;
cout << N;
\`\`\``,
      options: [
        '输入失败，不允许输入减号，没有输出',
        '允许输入，输出 1993',
        '允许输入并原样输出 2026-6-27',
        '允许输入并输出 2026',
      ],
      answer: 3,
      score: 2,
      explanation: "**答案：D**\n\ncin 按整数格式从开头提取连续合法部分 2026，在后面的减号前停止，因此 N=2026，cout 输出 2026，选 D。输入文本不会作为 C++ 算术表达式执行，不能计算成某个相减结果；也不是读入整段字符串后原样输出，剩余 -6-27 仍留在输入流中。",
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 7,
      type: 'single',
      question: `如下 C++ 代码执行时，其说法错误的是（ ）。
\`\`\`cpp
int N, M;
cin >> N >> M;
if (N > M)
    cout << "A " << (N - M);
else
    cout << "B " << (M - N);
\`\`\``,
      options: [
        '如果输入 4 3，将输出 A 1',
        '如果输入 3 4，将输出 B 1',
        '如果输入 3 3，将输出 A 0',
        '如果输入 4 4，将输出 B 0',
      ],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\nN>M 时输出 A 和 N-M，否则输出 B 和 M-N。输入 3 3 时严格大于条件为假，进入 else，输出 B 0，而不是 A 0，因此错误说法是 C。4 3、3 4 分别输出 A 1、B 1；4 4 输出 B 0，其他三项与代码一致。",
      tags: [LEVEL1_TAGS.condition],
    },
    {
      id: 8,
      type: 'single',
      question: `阅读如下 C++ 代码，下列说法错误的是（ ）。
\`\`\`cpp
int cnt = 0;
for (int i = 0; i < 5; i++)
    cnt += 1;
cout << cnt;
\`\`\``,
      options: [
        '将 cnt += 1 修改为 cnt = cnt + 1，执行效果相同',
        '将 cnt += 1 修改为 cnt = 1 + cnt，执行效果相同',
        '将 cnt += 1 修改为 cnt =+ 1，执行效果相同',
        '将 cnt += 1 修改为 cnt = + 1 + cnt，执行效果相同',
      ],
      answer: 2,
      score: 2,
      explanation: "**答案：C**\n\ncnt+=1 表示在旧值上加 1，五轮后输出 5。A、B、D 右侧都等于旧 cnt 加 1；D 的一元正号不改变数值。C 的 cnt=+1 是把正数 1 赋给 cnt，每轮都重设为 1，最终只输出 1，因此效果不同，选 C。=+ 不是 += 的另一种拼法。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 9,
      type: 'single',
      question: `如下 C++ 代码执行后输出是 \`1 2 3 4 5 6 7 8 9 10 11 5 6 7 8 9 10 11 5 6 7 8 9 10 11 5 6 7 8 9 10 11 5 6 7\`。横线处应该先后依次填入的运算符是（ ）。
\`\`\`cpp
int num = 1;
for (int i = 0; i < 35; i++) {
    printf("%d ", num);
    if (num _______ 10)
        num _______ 2;
    else
        num _______ 1;
}
\`\`\``,
      options: ['> /= +=', '>= %= +=', '> %= +=', '> /= =+'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n先输出当前 num；当 num>10 时用整除 /=2，把 11 变为 5，否则 +=1。于是先输出 1..11，再反复输出 5..11，35 次得到题中序列，选 A。>= 会在 10 就改变数值，%=2 把 11 变成 1，=+1 是赋为正 1，都无法保持该周期。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 10,
      type: 'single',
      question: `如下 C++ 代码可以执行，其输出是（ ）。
\`\`\`cpp
int i;
for (i = 1; i < 5; i++)
    if (i % 2 == 0) {
        continue;
        cout << i << "#";
    }
cout << i << "END#";
\`\`\``,
      options: ['5END#', '5#END', '1#3#4#END', '1#3#4 END#'],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n奇数轮不进入 if，因此没有输出；偶数轮进入 if 后先执行 continue，其后的 cout 不可达，也没有输出。循环结束时 i 已更新到 5，只有循环后的 cout 输出 5END#，选 A。continue 跳过的是本轮后续语句，仍会执行 for 的更新，不会把 i 卡在 2。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 11,
      type: 'single',
      question: `如下 C++ 代码执行时，下列说法正确的是（ ）。
\`\`\`cpp
int N, i;
cin >> N;
for (i = 2; i < N; i++)
    if (N % i == 0) {
        cout << "1#";
        break;
    } else
        cout << "0#";
\`\`\``,
      options: [
        '如果输入 2，将输出 1#。',
        '如果输入 15，将输出 0#1#。',
        '如果输入 1，将输出 0#。',
        '如果输入 3，将输出 1#。',
      ],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n输入 15 时，i=2 不能整除，输出 0#；i=3 能整除，输出 1# 并 break，所以完整输出为 0#1#，B 对。N=1 或 2 时初始条件 i<N 为假，完全不输出；N=3 时仅检查 i=2，输出 0#。此代码每次检查都可能输出，并不是只给出一个最终真假结果。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    },
    {
      id: 12,
      type: 'single',
      question: `有关如下 C++ 代码，下列说法中错误的是（ ）。
\`\`\`cpp
int i, tot;
i = 0, tot = 0;
while (0 <= i && i < 10) {
    tot += 1;
    i += 1;
}
cout << tot;
\`\`\``,
      options: [
        '如果调整 0 <= i && i < 10 为 1 <= i && i < 10，输出同样为 45，因为加上 0 不影响结果。',
        '如果将 i = 0 和 tot = 0 合并为 i = tot = 0，执行结果与修改前相同。',
        '将 tot += 1 与 i += 1 交换顺序，执行结果与修改前相同。',
        '将 i = 0 与 tot = 0 交换顺序，执行结果与修改前相同。',
      ],
      answer: 0,
      score: 2,
      explanation: "**答案：A**\n\n原程序从 i=0 到 9 共执行 10 次，每次 tot 加的是 1，所以输出 10，根本不是 45。改成 1<=i 后，初始 i=0 就不满足条件，输出 0，A 错。合并初始化、交换两个独立初始化或交换两条自增语句都不改变这 10 次迭代的计数结果，B、C、D 对。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 13,
      type: 'single',
      question: `以下 C++ 代码可以找出千位、百位、十位和个位满足特定条件的四位数（例如各位数字的四次方和等于原数，即"四叶玫瑰数"），横线处应该填入的是（ ）。
\`\`\`cpp
int count = 0;
for (int n = 1000; n <= 9999; n++) {
    int a = n / 1000;
    int b = (n / 100) % 10;
    _________________________     // L1
    int d = n % 10;
    if (a * a * a * a + b * b * b * b + c * c * c * c + d * d * d * d == n) { // 特定条件
        count++;
    }
}
\`\`\``,
      options: [
        'int c = (n / 10) / 10;',
        'int c = (n / 10) % 10;',
        'int c = (n % 10) / 10;',
        'int c = (n % 10) % 10;',
      ],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n四位数 n 除以 10 先去掉个位，再对 10 求余得到十位，所以应填 int c=(n/10)%10，选 B。例如 1634 得到 3。A 再除以 10 得到前两位 16，C 把个位再除以 10 得到 0，D 仍是个位，均无法提供公式需要的十位数位值。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 14,
      type: 'single',
      question: "下面的 C++ 代码用于计算经过 n 秒后的秒针位置（0～59），两处横线处分别应填入的代码是（ ）。\n```cpp\nint start, n, pos;\ncout << \"当前秒数（0-59）: \";\ncin >> start;\ncout << \"经过多少秒: \";\ncin >> n;\npos = ____________;  // L1\nif (____________)    // L2\n    cout << n << \"秒后回到12点方向\" << endl;\nelse\n    cout << n << \"秒后指向\" << pos << \"秒刻度\" << endl;\n```",
      options: [
        '(start + n) / 60 和 pos == 0',
        '(start + n) % 60 和 pos == 0',
        '(start + n) / 60 和 pos <= 0',
        '(start + n) % 60 和 pos = 0',
      ],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n秒针每 60 秒回到同一位置，应把 start+n 对 60 求余，得到 0..59 的刻度；pos==0 表示回到 12 点方向，故选 B。除以 60 得到经过的整圈数，并不是刻度。D 的 pos=0 是赋值，会把 pos 清零且条件为假，不能代替相等比较。这里按非负经过秒数且相加可表示的情境计算。",
      tags: [LEVEL1_TAGS.operator, LEVEL1_TAGS.condition],
    },
    {
      id: 15,
      type: 'single',
      question: `如果正整数 N 只能被 1 和它本身整除，则它是一个质数（或素数）。下面的 C++ 代码用于判断正整数 N 是否为质数（素数）。若 N 是质数，输出 YES，否则输出 NO。横线处不应填入的代码是（ ）。
\`\`\`cpp
int N, i;
cin >> N;
if (N <= 1) {
    cout << "NO";
    return 0;
}
for (i = 2; ______; i++) {
    if (N % i == 0) {
        cout << "NO";
        return 0;
    }
}
cout << "YES";
\`\`\``,
      options: ['i < N', 'i <= N', 'i <= N / 2', 'i * i <= N'],
      answer: 1,
      score: 2,
      explanation: "**答案：B**\n\n代码先排除 N<=1，再检查可能的非平凡因子。若条件是 i<=N，质数也会走到 i=N，此时必有 N%i==0，从而错误输出 NO，故不能填 B。i<N、i<=N/2 或 i*i<=N 在通常无溢出的计算范围内均能判定；任何合数都有不大于平方根的因子。数学上质数还必须大于 1，代码已明确处理这一点。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.condition],
    },
    {
      id: 16,
      type: 'judge',
      question: `又到期末考试周，小明发现这次许多闭卷考试不仅禁止携带手机、平板电脑，还有最近比较时髦的各类 AI 眼镜（也有叫智能眼镜）也同样不允许带入考场。这些 AI 眼镜应该也是内置了操作系统并可能支持 Wi-Fi 或蓝牙连接。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nAI 眼镜需要协调显示、传感器、交互与应用等功能，可以推测内置适配设备的操作系统，也可能通过 Wi-Fi 或蓝牙连接其他设备。原判断使用“可能”，没有声称每款眼镜必然具备全部连接方式，因此判断正确。仅凭这些描述无法确定某一具体品牌、系统版本或考试规章细节。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 17,
      type: 'judge',
      question: `如果 n 为大于 100 的整数，则 C++ 表达式 \`(n / 10) % 10\` 与 \`(n % 100) / 10\` 的结果相同。`,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n对正整数写成 n=100q+10t+u，其中 t、u 为 0..9。n/10=10q+t，再对 10 求余得 t；n%100=10t+u，再除以 10 也得 t。两个表达式都取十位数字，因此判断正确，大于 100 的前提满足这里的非负整除规则。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 18,
      type: 'judge',
      question: `下面 C++ 代码执行后将输出 19。
\`\`\`cpp
int i;
for (i = 0; i < 20; i += 3)
    if (i % 3 != 0)
        break;
cout << i;
\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\ni 从 0 开始每次加 3，循环中依次为 0、3、6、9、12、15、18，始终能被 3 整除，因此 break 一次也不执行。最后由 18 加到 21 后不满足 i<20，循环结束，cout 输出 21，而非 19，判断错误。退出后的变量值不必等于循环上界减一。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 19,
      type: 'judge',
      question: "在数学中，N! 称之为 N 的阶乘，其含义是 1 到 N 之积，包括 N。如 3! = 1 × 2 × 3 = 6。如下 C++ 代码能输出 N! 的结果。\n```cpp\nint N;\ncout << \"请输入正整数：\";\ncin >> N;\nint rst = 0;\nfor (int i = 1; i < N + 1; i++)\n    rst *= i;\ncout << rst;\n```",
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n累乘变量 rst 初始化为 0，后面无论乘哪个正整数都仍为 0。比如 N=3，输出 0，而 3!=6，因此判断错误。计算乘积应从乘法单位元 1 开始；循环范围包含 N 并不能弥补初值错误。若改为 1，还应留意较大阶乘超出整型表示范围的问题。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 20,
      type: 'judge',
      question: `如下 C++ 代码能实现输出正整数 N 的各位数字。
\`\`\`cpp
int N;
cin >> N;
while (N > 0) {
    cout << (N % 10) << endl;
    N = N / 10;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\n对正整数，N%10 得到当前个位并输出，N/10 去掉该位，重复至 N=0，因此能够逐一输出各位数字，判断正确。顺序是从个位到最高位，例如 120 依次输出 0、2、1。题目没有要求必须从高位到低位；末尾的 0 也会在第一次取余时保留下来输出。",
      tags: [LEVEL1_TAGS.loop, LEVEL1_TAGS.operator],
    },
    {
      id: 21,
      type: 'judge',
      question: `将如下 C++ 代码中的 \`printf("\\n")\` 更换为 \`printf("%c", '\\n')\`，输出效果相同。
\`\`\`cpp
for (int i = 0; i < 100; i++) {
    if (i % 5 == 0)
        printf("\\n");
    printf("%2d ", i);
}
\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: "**判断：正确**\n\nprintf(\"\\n\") 直接输出换行；printf(\"%c\",'\\n') 用字符转换说明输出同一个换行字符，因而在相同位置效果一致，判断正确。%c 对应的字符实参经整型提升后也符合要求。原循环在 i=0 就先换行，其余数字格式与换行位置都不会因这次替换改变。",
      tags: [LEVEL1_TAGS.io],
    },
    {
      id: 22,
      type: 'judge',
      question: `C++ 代码 \`cout << (2.5 % 2)\` 能够生成可执行代码，但执行时将报错，因为 % 只能适用于正整数。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n内建求余运算符 % 要求整型或可作相应整型转换的枚举操作数，2.5 是 double，表达式在编译时就不合法，并非先生成程序再运行报错。% 也可用于负整数，不限于正整数，除数不能为 0。原说法在错误阶段和适用类型两点都不正确，因此判断错误。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 23,
      type: 'judge',
      question: `下面的 C++ 代码执行后将输出 24。
\`\`\`cpp
int total;
for (int n = 1; n <= 4; n++) {
    total *= n;
}
cout << total;
\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n局部变量 total 声明后没有初始化，而 total*=n 需要先读取旧值，C++17 下会使用不确定值，行为未定义，不能保证输出 24，判断错误。不能先假设未初始化变量为 0 或 1，再推导一个固定结果。若想计算 1*2*3*4，应显式初始化为 1；本轮只做静态诊断，不运行未定义代码采信偶然输出。",
      tags: [LEVEL1_TAGS.basics],
    },
    {
      id: 24,
      type: 'judge',
      question: `如果 a 是 C++ 的整型变量，值为 4，则表达式 \`(a % 2 == 0) + (a / 2)\` 的值为 4。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\na=4 时，a%2==0 的比较结果为 true，参与算术时转为整数 1；a/2 是整数 2，所以总值为 1+2=3，并非 4，判断错误。不能把比较表达式的真值误当成原数值 2，也不能把等于判断当成赋值或把求余换成除法。",
      tags: [LEVEL1_TAGS.operator],
    },
    {
      id: 25,
      type: 'judge',
      question: `删除下面 C++ 代码中的 continue 后，其输出与原来相同。
\`\`\`cpp
int x = 0;
while (x < 4) {
    x++;
    if (x == 2) continue;
    cout << x << ",";
}
\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: "**判断：错误**\n\n原程序先把 x 加 1，x=2 时 continue 跳过本次输出，所以结果为 1,3,4,。若只删 continue 关键字，留下分号，则 if 控制空语句，输出变为 1,2,3,4,；若删去整条 continue; 语句，则后面的 cout 成为 if 的受控语句，只输出 2,。两种删法都与原输出不同，判断错误。删除语句时须同时看剩下的分号和语句归属。",
      tags: [LEVEL1_TAGS.loop],
    },
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: '999\n105\n699\n588', output: '693' },
        { input: '9\n3\n8\n7', output: '9' },
      ],
      question: `
# [GESP202606 一级] 去旅行

## 题目描述

快暑假了，小杨同学正在计划出去旅行，前往目的地的方案多种多样，小杨同学想知道如何前往目的地最便宜。

小杨同学住在 A 市，旅行目的地是 B 市，小杨同学前往目的地有三种方案：
1. 从 A 市直飞 B 市；
2. 从 A 市坐高铁到 C 市，然后坐飞机到 B 市；
3. 从 A 市坐高铁到 C 市，然后坐高铁到 B 市。

请帮小杨同学求出最便宜的出行方案的价格。

## 输入格式

输入包含 4 行，每行一个正整数：
- 第 1 行的正整数表示「从 A 市直飞 B 市」的价格；
- 第 2 行的正整数表示「从 A 市坐高铁到 C 市」的价格；
- 第 3 行的正整数表示「从 C 市坐飞机到 B 市」的价格；
- 第 4 行的正整数表示「从 C 市坐高铁到 B 市」的价格。

## 输出格式

输出一个正整数，表示 3 种方式中，最便宜的出行方案的价格。

## 样例 1

输入：
\`\`\`text
999
105
699
588
\`\`\`

输出：
\`\`\`text
693
\`\`\`

**样例解释**：方案 1. 直飞价格为 999；方案 2. 高铁转飞机价格为 105 + 699 = 804；方案 3. 高铁的价格为 105 + 588 = 693；因此最便宜的价格是 693。

## 样例 2

输入：
\`\`\`text
9
3
8
7
\`\`\`

输出：
\`\`\`text
9
\`\`\`

**样例解释**：方案 1. 直飞价格为 9；方案 2. 高铁转飞机价格为 3 + 8 = 11；方案 3. 高铁的价格为 3 + 7 = 10；因此最便宜的价格是 9。

## 数据范围

所有输入均为正整数，且不超过 10000。
`,
      score: 25,
      answer: '',
      explanation: "**解析**\n\n按输入顺序设四个价格为 a、b、c、d，三条路线总价分别是 a、b+c、b+d，比较三者取最小即可。不能直接取四个单段票价的最小值，也不能把中转路线漏加第一段 b。相等时任一最便宜方案价格都相同，<= 分支可正确处理。每段不超过 10000，中转和至多 20000，在 int 范围内。时间与空间均为 O(1)。",
      template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    int a, b, c, d;\n    cin >> a >> b >> c >> d;\n    // 在此填写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\nint main() {\n    int a, b, c, d;\n    cin >> a >> b >> c >> d;\n    int x = a, y = b + c, z = b + d;\n    if (x <= y && x <= z)\n        cout << x;\n    else if (y <= x && y <= z)\n        cout << y;\n    else\n        cout << z;\n    cout << endl;\n    return 0;\n}',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.condition],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: '932.0\n1634.3\n1790.4\n2172.9\n378.1\n283.4\n2761.9\n3583.5\n10.1\n2324.9\n1111.6\n3812.3', output: '2584.76' },
      ],
      question: "\n# [GESP202606 一级] 交税\n\n## 题目描述\n\n根据国家税收相关规定，劳务报酬需要按月预交个税，预交税率如下：\n1. 劳务报酬不超过 800 的，不需要预交个税；\n2. 劳务报酬超过 800 的，仅超过 800 的部分按照 20%（即 0.2）税率预交个税（不超过 800 的部分不需要预交个税）。\n\n例如，月劳务报酬为 1000.0，则按照规则 2 需要预交个税 (1000.0 − 800.0) × 20% = 40.00。\n\n现在给定小杨同学 12 个月的月度劳务报酬，请帮小杨同学计算他这 12 个月应预交个税的总和。\n\n## 输入格式\n\n输入 12 行，每行一个浮点数，表示小杨同学 12 个月中每个月的劳务报酬。\n\n每个浮点数恰好有一位小数。\n\n## 输出格式\n\n输出 1 行，一个浮点数，保留两位小数，表示小杨同学 12 个月应预交个税的总和。\n\n## 样例 1\n\n输入：\n```text\n932.0\n1634.3\n1790.4\n2172.9\n378.1\n283.4\n2761.9\n3583.5\n10.1\n2324.9\n1111.6\n3812.3\n```\n\n输出：\n```text\n2584.76\n```\n\n## 数据范围\n\n小杨同学每月劳务报酬收入均为正，且恰好有一位小数，且不超过 4000.0。\n",
      score: 25,
      answer: '',
      explanation: "**解析**\n\n本题按题面给定规则逐月计算，月收入 a<=800 时贡献 0，否则贡献 (a-800)*0.2，累加 12 个月，最后以 %.2f 输出两位小数。不能先汇总全年收入再只扣一次 800，或对每月全部收入征收 20%。原卷范围是收入为正、恰一位小数且不超过 4000.0；最大年累计为 12*(4000-800)*0.2=7680.00。double 足以处理该范围，按独立整数分币预言机验证，时间 O(12)、空间 O(1)。",
      template: '#include <iostream>\n#include <cstdio>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\n#include <cstdio>\nusing namespace std;\nint main() {\n    double ans = 0.0;\n    for (int i = 0; i < 12; ++i) {\n        double a;\n        cin >> a;\n        if (a <= 800.0) {\n            ans += 0.0;\n        } else {\n            ans += (a - 800.0) * 0.2;\n        }\n    }\n    printf("%.2f\\n", ans);\n    return 0;\n}',
      tags: [LEVEL1_TAGS.basics, LEVEL1_TAGS.loop],
    },
  ],
};
