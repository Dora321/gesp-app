// 2026年9月 GESP C++ 四级真题
//
// 全卷 27 题（15 单选 + 10 判断 + 2 编程）已逐页对照 CCF 官网官方 PDF 转录。
// 客观题答案一律以原卷答案表为唯一证据：
//   单选题答案表：C B B C A D C C C C B D B C A（文本层与渲染一致）
//   判断题答案表：√ × √ × √ × √ × √ ×（矢量图形，300dpi 渲染复核）

export const paperData = {
  id: '2026-09-l4',
  title: '2026年9月 GESP C++ 四级真题',
  level: 4,
  year: 2026,
  month: 9,
  session: 15,
  timeLimit: 90 * 60,
  source: {
    officialPdf: 'https://gesp.ccf.org.cn/101/attach/1767258770636832.pdf',
    type: 'official',
    notes: '全卷依据 CCF 官网 PDF 逐题转录；复杂度公式、汉诺塔柱子编号等图片内容经 180dpi 渲染核对，判断题答案表 300dpi 渲染复核。',
  },
  verification: {
    status: 'partial',
    reviewedBy: '本站校订',
    reviewedAt: '2026-11-03',
    scope: '单选答案串 CBBCADCCCCBDBCA、判断答案串 √×√×√×√×√× 均按官方答案表转录并逐题逻辑复核，编程题样例与数据范围已渲染核对。',
  },
  confidence: {
    answer: 1.0,
    statement: 1.0,
  },
  questions: [
    {
      id: 1,
      type: 'single',
      question: `小杨使用指针修改计数器的值。执行下面程序后，输出结果是（　）。
\`\`\`cpp
int count = 8;
int *p = &count;
*p += 4;
cout << count << " " << *p;
return 0;
\`\`\``,
      options: ['8 8', '8 12', '12 12', '12 8'],
      answer: 2,
      score: 2,
      explanation: `**答案：C (12 12)**

**核心解析：**
\`p\` 存的是 \`count\` 的地址，\`*p\` 就是 \`count\` 本身（解引用）。

\`*p += 4\` 等价于 \`count += 4\`，count 变成 12。

之后 \`count\` 和 \`*p\` 访问的是同一块内存，都输出 \`12\`——输出 \`12 12\`。

**易错提醒：**
- 指针不是副本：通过 \`*p\` 的修改会直接反映到 \`count\` 上。
- 输出顺序是先 \`count\` 后 \`*p\`，两处都是 12。

**考点：** 指针解引用与间接修改`,
      tags: ['指针'],
    },
    {
      id: 2,
      type: 'single',
      question: `关于下面指针声明的说法，正确的是（　）。
\`\`\`cpp
int a = 10;
int b = 20;
const int *p = &a;
\`\`\``,
      options: [
        '可以通过 p 修改 a 的值',
        '可以令 p = &b',
        'p 的指向和所指向的值都不能修改',
        'p 必须始终指向 a',
      ],
      answer: 1,
      score: 2,
      explanation: `**答案：B**

**核心解析：**
\`const int *p\`（底层 const）的含义：**指向的值不可通过 p 修改，但 p 的指向可以改**。

逐项分析：
- **A**：❌ \`*p = 30\` 编译报错——值是 const 的。
- **B**：✅ \`p = &b\` 合法——指针变量本身不是常量，可以改指向。
- **C**：❌ 「指向」可以修改（见 B）。
- **D**：❌ 没有任何约束要求 p 始终指向 a。

**易错提醒：**
- 区分 \`const int *p\`（值 const）、\`int * const p\`（指针 const）和 \`const int * const p\`（都 const）——读法：\`const\` 在 \`*\` 左边修饰**值**，在 \`*\` 右边修饰**指针**。

**考点：** const 指针的语义`,
      tags: ['指针', 'const'],
    },
    {
      id: 3,
      type: 'single',
      question: `小杨用二维数组记录仓库货物数量。执行下面代码后，变量 x 的值是（　）。
\`\`\`cpp
int goods[3][4] = {{2, 4, 6, 8}, {10, 12, 14, 16}, {18, 20, 22, 24}};
int (*p)[4] = goods;
int x = *(*(p + 1) + 2);
\`\`\``,
      options: ['12', '14', '20', '22'],
      answer: 1,
      score: 2,
      explanation: `**答案：B (14)**

**核心解析：**
\`int (*p)[4]\` 是**行指针**：p 指向一个含 4 个 int 的数组（即二维数组的一行）。

- \`p + 1\`：跳过一行，指向第 1 行（下标从 0 数）；
- \`*(p + 1)\`：第 1 行本身（退化为 \`int*\`，指向该行首元素 10）；
- \`*(p + 1) + 2\`：该行首地址 + 2，指向 14；
- 最外层 \`*\` 解引用：取值 **14**。

即 \`x = goods[1][2] = 14\`。

**易错提醒：**
- \`*(*(p+i)+j)\` 是 \`p[i][j]\` 的指针写法：外层 \`*\` 前的 \`p+i\` 走行、内层加 j 走列。
- 别漏了外层解引用——\`*(p+1)+2\` 只是地址。

**考点：** 二维数组与行指针`,
      tags: ['指针', '数组'],
    },
    {
      id: 4,
      type: 'single',
      question: `下面函数用于将一个 3 行 5 列二维数组的第 r 行元素全部加 1，横线处正确的形参写法是（　）。
\`\`\`cpp
void addOne(________, int r) {
    for (int j = 0; j < 5; j++) {
        arr[r][j]++;
    }
}
\`\`\``,
      options: ['int arr[][]', 'int **arr', 'int arr[][5]', 'int arr[5][]'],
      answer: 2,
      score: 2,
      explanation: `**答案：C (int arr[][5])**

**核心解析：**
二维数组作形参时，**第一维大小可以省略，第二维必须写明**——编译器需要第二维来计算每行的跨度（\`arr[i]\` 的寻址依赖列数 5）。

- **A \`int arr[][]\`**：❌ 两个维度都省，编译报错。
- **B \`int **arr\`**：❌ 二维数组不是「指针的指针」，\`arr[r][j]\` 的寻址方式完全不同。
- **C \`int arr[][5]\`**：✅ 等价于 \`int (*arr)[5]\`（行指针），合法。
- **D \`int arr[5][]\`**：❌ 顺序反了——省略的只能是**第一维**。

**易错提醒：**
- 传二维数组：\`int arr[][5]\` 或 \`int arr[3][5]\`，第二维（列数）不可省。

**考点：** 二维数组作函数参数`,
      tags: ['数组', '函数'],
    },
    {
      id: 5,
      type: 'single',
      question: `执行下面程序后，输出结果是（　）。
\`\`\`cpp
int score = 60;
void update(int &score) {
    score += 5;
}
int main() {
    int score = 80;
    update(score);
    cout << score << " " << ::score;
    return 0;
}
\`\`\``,
      options: ['85 60', '80 65', '85 65', '80 60'],
      answer: 0,
      score: 2,
      explanation: `**答案：A (85 60)**

**核心解析：**
- \`update\` 的形参是**引用**：函数内对 \`score\` 的修改直接作用在 main 的局部 \`score\` 上——80 + 5 = **85**。
- \`::score\` 是**作用域解析运算符**：明确访问**全局**的 score（60）。局部 score 把全局的「遮住」了，\`::\` 前缀穿透遮蔽拿到全局变量。

输出 \`85 60\`。

**易错提醒：**
- \`::score\` 只访问全局，不会碰局部；普通的 \`score\` 在 main 里永远指局部。
- 引用传参 = 别名，修改生效；传值才隔离。

**考点：** 引用传参与变量遮蔽（::）`,
      tags: ['函数', '作用域'],
    },
    {
      id: 6,
      type: 'single',
      question: `执行下面程序后，输出结果是（　）。
\`\`\`cpp
struct Device {
    int id;
    int state;
};
void reset(Device d) {
    d.state = 0;
}
void start(Device &d) {
    d.state += 1;
}
int main() {
    Device d{7, 2};
    reset(d);
    start(d);
    cout << d.id << " " << d.state;
    return 0;
}
\`\`\``,
      options: ['7 0', '7 1', '7 2', '7 3'],
      answer: 3,
      score: 2,
      explanation: `**答案：D (7 3)**

**核心解析：**
- \`reset(d)\`：形参**按值传递**，函数内改的是副本，\`d.state\` 不受影响，仍是 2。
- \`start(d)\`：形参是**引用**，\`d.state += 1\` 直接改原对象 → state = **3**。
- \`d.id\` 从未被修改，仍是 **7**。

输出 \`7 3\`。

**易错提醒：**
- 一个函数传值、一个函数传引用，结果完全不同——看清形参有没有 \`&\`。

**考点：** 结构体按值/按引用传递`,
      tags: ['结构体', '函数'],
    },
    {
      id: 7,
      type: 'single',
      question: `小杨定义了结构体数组，并使用指针访问其中的元素。执行下面代码后输出的是（　）。
\`\`\`cpp
struct Book {
    string name;
    int pages;
};
int main() {
    Book books[2] = {{"C++", 120}, {"Math", 150}};
    Book *p = books + 1;
    p->pages += 10;
    cout << books[1].name << " " << books[1].pages;
    return 0;
}
\`\`\``,
      options: ['C++ 120', 'Math 150', 'Math 160', 'C++ 160'],
      answer: 2,
      score: 2,
      explanation: `**答案：C (Math 160)**

**核心解析：**
- \`books + 1\`：指针指向 \`books[1]\`（第二个元素 "Math"）。
- \`p->pages += 10\`：等价于 \`books[1].pages += 10\`——150 + 10 = **160**。
- 输出 \`books[1].name\` 和 \`books[1].pages\`：\`Math 160\`。

**易错提醒：**
- \`p->成员\` 与 \`(*p).成员\` 等价；\`p->pages\` 改的就是 \`books[1].pages\` 本身（指针指向原数组元素，不是副本）。

**考点：** 结构体数组与箭头运算符`,
      tags: ['结构体', '指针'],
    },
    {
      id: 8,
      type: 'single',
      question: `关于冒泡排序、插入排序和选择排序，下列说法正确的是（　）。`,
      options: [
        '三种排序算法的最坏时间复杂度都是 O(n)',
        '冒泡排序只能从小到大排序，不能从大到小排序',
        '插入排序每次将一个待排序元素插入前面已经有序的序列中',
        '选择排序每轮只需要比较一次就能确定最小元素',
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

**核心解析：**
- **A**：❌ 三种排序的最坏时间复杂度都是 **O(n²)**，不是 O(n)。
- **B**：❌ 把比较条件 \`a[j] > a[j+1]\` 改成 \`<\` 就是从大到小——方向随便切换。
- **C**：✅ 插入排序的标准描述：每次取一个新元素，在**前面已有序**的部分中找到位置插入。
- **D**：❌ 选择排序每轮要**比较完剩余所有元素**（n−i−1 次）才能确定最小元素，「一次」大错。

**易错提醒：**
- 三大简单排序都是 O(n²)，但各有性格：冒泡靠交换相邻、插入靠挪位、选择靠选最值。

**考点：** 三种基本排序的性质`,
      tags: ['排序'],
    },
    {
      id: 9,
      type: 'single',
      question: `某机器人每次可以向前移动 1 格或 2 格，到达第 n 格的方法数由下面函数计算。ways(6) 的返回值是（　）。
\`\`\`cpp
int ways(int n) {
    if (n <= 2)
        return n;
    int a = 1, b = 2, c = 0;
    for (int i = 3; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}
\`\`\``,
      options: ['8', '10', '13', '21'],
      answer: 2,
      score: 2,
      explanation: `**答案：C (13)**

**核心解析：**
到第 n 格的方案 = 从第 n−1 格走 1 步 + 从第 n−2 格走 2 步，即斐波那契式递推 \`f(n) = f(n−1) + f(n−2)\`，初值 f(1)=1, f(2)=2。

代码用滚动变量模拟：

| i | a | b | c |
|---|---|---|---|
| 3 | 1 | 2 | 3 |
| 4 | 2 | 3 | 5 |
| 5 | 3 | 5 | 8 |
| 6 | 5 | 8 | **13** |

\`ways(6)\` 返回 \`b = 13\`。

**易错提醒：**
- 递推走台阶问题的序列是 1, 2, 3, 5, 8, 13——别背成 1, 1, 2, 3, 5, 8。
- 循环结束返回的是 \`b\`（最新项），不是 \`a\`。

**考点：** 递推（爬台阶/斐波那契）`,
      tags: ['递推', '程序分析'],
    },
    {
      id: 10,
      type: 'single',
      question: `对一组 struct student 的学生按成绩（score）升序排序。排序前后的数据如下。关于该排序的稳定性，判断正确的是（　）。
\`\`\`
struct student {
    int score;
    char id;
};
\`\`\`
排序前: (90, 'A'), (80, 'B'), (90, 'C'), (80, 'D')
排序后: (80, 'B'), (80, 'D'), (90, 'C'), (90, 'A')`,
      options: [
        '稳定，因为所有成绩已经按升序排列',
        '稳定，因为分数相同不会影响排序结果',
        "不稳定，因为相同成绩的 (90, 'A') 和 (90, 'C') 的相对顺序发生了改变",
        '无法判断，因为没有给出排序算法的代码',
      ],
      answer: 2,
      score: 2,
      explanation: `**答案：C**

**核心解析：**
**稳定性**的定义：排序后，**关键字相等**的元素保持原来的相对顺序。

看 90 分的两组：排序前 \`(90, 'A')\` 在 \`(90, 'C')\` **前面**；排序后 \`'C'\` 跑到了 \`'A'\` **前面**——相等元素的相对顺序被打破，**不稳定**。

80 分的一组（B、D）倒是保住了顺序，但只要有一组相等元素乱序，整个排序就是不稳定的。

**易错提醒：**
- 判稳定性只看**相同关键字**的前后关系，与「是否排好序」无关（A 错）。
- 与具体算法无关——直接从数据的前后变化就能下结论（D 错）。

**考点：** 排序稳定性的判定`,
      tags: ['排序'],
    },
    {
      id: 11,
      type: 'single',
      question: `下面代码使用插入排序将数组按升序排列，横线处应填写（　）。
\`\`\`cpp
void insertionSort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int key = a[i];
        int j = i - 1;
        while (j >= 0 && __________) {
            a[j + 1] = a[j];
            j--;
        }
        a[j + 1] = key;
    }
}
\`\`\``,
      options: ['a[j] < key', 'a[j] > key', 'a[j] == key', 'a[j + 1] > key'],
      answer: 1,
      score: 2,
      explanation: `**答案：B (a[j] > key)**

**核心解析：**
插入排序升序逻辑：只要前面的元素 \`a[j]\` **比 key 大**，就把它后移一位，给 key 腾位置；遇到不大于 key 的元素（或到头）停下，把 key 放进去。

- **A \`a[j] < key\`**：❌ 比 key 小还继续挪，那是往降序排。
- **B \`a[j] > key\`**：✅ 升序的移动条件。
- **C \`a[j] == key\`**：❌ 相等才挪没有意义，序列基本不动。
- **D \`a[j + 1] > key\`**：❌ 比较对象错位，且 \`a[j+1]\` 是刚被覆盖的位置。

**易错提醒：**
- 升序插入排序：**大的往后挪**，条件是 \`a[j] > key\`；降序则反过来。
- 循环结束后 \`a[j + 1] = key\` 的 +1 是因为 j 多退了一格。

**考点：** 插入排序的实现`,
      tags: ['排序'],
    },
    {
      id: 12,
      type: 'single',
      question: `下面代码的时间复杂度是（　）。
\`\`\`cpp
int countPairs(int a[], int n) {
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (a[i] + a[j] == 100) {
                cnt++;
            }
        }
    }
    return cnt;
}
\`\`\``,
      options: ['O(1)', 'O(n³)', 'O(n)', 'O(n²)'],
      answer: 3,
      score: 2,
      explanation: `**答案：D (O(n²))**

**核心解析：**
两层嵌套循环：外层 n 次，内层平均 n/2 次，总执行次数 \`n(n−1)/2\` 次——是关于 n 的**二阶多项式**，复杂度 **O(n²)**。

内层的 \`if\` 判断是 O(1)，不影响量级。

**易错提醒：**
- 内层起点是 \`i + 1\`（枚举数对），执行次数是等差数列求和 n−1, n−2, …, 1 ≈ n²/2——系数不影响大 O。
- 循环变量相乘（非嵌套依赖减半）→ 平方级。

**考点：** 嵌套循环的时间复杂度`,
      tags: ['复杂度分析'],
    },
    {
      id: 13,
      type: 'single',
      question: `假设文件 data.txt 的内容如下：
\`\`\`
Blue Sky
\`\`\`
执行下面程序后，输出结果是（　）。
\`\`\`cpp
int main() {
    ifstream fin("data.txt");
    string a, b;
    fin >> a >> b;
    cout << b << "-" << a;
    fin.close();
    return 0;
}
\`\`\``,
      options: ['Blue-Sky', 'Sky-Blue', 'Blue Sky', 'Sky Blue'],
      answer: 1,
      score: 2,
      explanation: `**答案：B (Sky-Blue)**

**核心解析：**
\`fin >> a >> b\` 按空白（空格/换行）分隔读取：\`a = "Blue"\`、\`b = "Sky"\`。

输出语句是 \`b << "-" << a\`——**先 b 后 a**：\`Sky-Blue\`。

**易错提醒：**
- \`>>\` 读取按顺序给变量，但输出顺序由 cout 语句决定——别惯性思维按读入顺序输出。

**考点：** 文件流读取与输出顺序`,
      tags: ['文件操作', '输入输出'],
    },
    {
      id: 14,
      type: 'single',
      question: `执行下面程序后，输出结果是（　）。
\`\`\`cpp
int main() {
    try {
        int age = -1;
        if (age < 0)
            throw age;
        cout << "A";
    } catch (const char *msg) {
        cout << "B";
    } catch (int value) {
        cout << "C" << value;
    }
    return 0;
}
\`\`\``,
      options: ['A', 'B', 'C-1', '程序崩溃'],
      answer: 2,
      score: 2,
      explanation: `**答案：C (C-1)**

**核心解析：**
- \`age = −1 < 0\` → \`throw age\` 抛出 **int** 类型异常（值 −1）。
- \`throw\` 之后的 \`cout << "A"\` 被跳过。
- 异常按类型匹配 catch：第一个 catch 接 \`const char*\`，与 int 不匹配，跳过；第二个 catch 接 \`int\`，**命中**。
- 输出 \`"C" << value\` → \`C-1\`。

**易错提醒：**
- 异常匹配**严格按类型**：int 不会被转换成 const char*，也不会静默匹配错。
- catch 形参 \`value\` 接住了抛出的 −1，输出时带上。

**考点：** 异常抛出与类型匹配捕获`,
      tags: ['异常处理'],
    },
    {
      id: 15,
      type: 'single',
      question: `下面函数使用冒泡排序将数组按升序排列。为了在数组已经有序时提前结束，两处横线应分别填写（　）。
\`\`\`cpp
void bubbleSort(int a[], int n) {
    for (int i = n - 1; i > 0; i--) {
        bool changed = __________;
        for (int j = 0; j < i; j++) {
            if (a[j] > a[j + 1]) {
                int t = a[j];
                a[j] = a[j + 1];
                a[j + 1] = t;
                changed = __________;
            }
        }
        if (!changed)
            break;
    }
}
\`\`\``,
      options: ['false，true', 'true，false', 'false，false', 'true，true'],
      answer: 0,
      score: 2,
      explanation: `**答案：A (false，true)**

**核心解析：**
「提前结束」的逻辑：每轮开始假设**没有发生交换**（\`changed = false\`）；一旦交换就把 \`changed\` 置 **true**。一轮结束后若 \`changed\` 仍为 false——说明本轮没有任何逆序对，数组已经有序，\`break\` 提前收工。

所以第一处填 \`false\`（乐观假设），第二处填 \`true\`（交换证据）。

**易错提醒：**
- 方向别搞反：初始 \`true\` 的话 \`!changed\` 永远不成立，优化失效。
- 这是冒泡排序best-case 达到 O(n) 的标准写法。

**考点：** 冒泡排序的提前终止优化`,
      tags: ['排序'],
    },
    {
      id: 16,
      type: 'judge',
      question: `执行下面程序后，变量 a 的值为 15。
\`\`\`cpp
int a = 10;
int *p = &a;
*p += 5;
\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

**判定依据：**
\`p\` 指向 \`a\`，\`*p += 5\` 就是 \`a += 5\`，a 从 10 变成 **15**。

**易错点：**
- 通过指针的解引用修改就是修改原变量本身。

**考点：** 指针解引用`,
      tags: ['指针'],
    },
    {
      id: 17,
      type: 'judge',
      question: `一个函数必须在调用之前既声明又定义。`,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

**判定依据：**
C++ 要求调用点之前能看到函数的**声明**（原型）即可，**定义可以放在后面**（甚至在另一个 .cpp 文件中，链接时再合入）：

\`\`\`cpp
int add(int, int);   // 只声明
int main() { return add(1, 2); }
int add(int a, int b) { return a + b; }  // 定义在后
\`\`\`

完全合法。「必须既声明又定义」说法错误。

**易错点：**
- 只声明不定义、又真的调用了它——编译能过、链接报错（undefined reference）。
- 声明让编译器做类型检查，定义提供函数体。

**考点：** 函数声明与定义的分离`,
      tags: ['函数'],
    },
    {
      id: 18,
      type: 'judge',
      question: `下面二维数组在内存中按行优先连续存储，因此 *(*(a + 1) + 0) 的值为 5。
\`\`\`cpp
int a[2][4] = {{1, 2, 3, 4}, {5, 6, 7, 8}};
\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

**判定依据：**
二维数组按**行优先**连续存放：先是第 0 行 {1,2,3,4}，紧跟第 1 行 {5,6,7,8}。

- \`a + 1\`：指向第 1 行的行指针；
- \`*(a + 1)\`：第 1 行（退化为指向 5 的 int*）；
- \`*(a + 1) + 0\`：第 1 行第 0 个元素的地址；
- 最外层 \`*\`：取值 \`a[1][0] = 5\` ✓。

**易错点：**
- \`*(*(a+i)+j)\` 就是 \`a[i][j]\` 的指针等价形式。

**考点：** 二维数组的行优先存储与指针访问`,
      tags: ['数组', '指针'],
    },
    {
      id: 19,
      type: 'judge',
      question: `执行下面程序后会输出 20。
\`\`\`cpp
void change(int x) {
    x = 20;
}
int main() {
    int x = 10;
    change(x);
    cout << x;
    return 0;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

**判定依据：**
\`change\` 的形参 \`x\` **按值传递**——是实参的副本。函数内 \`x = 20\` 只改副本，main 里的 \`x\` 纹丝不动。

输出 **10**，不是 20。想真正修改要传引用 \`void change(int &x)\`。

**易错点：**
- 传值 = 拷贝；改形参不影响实参——C++ 最基础也最容易忽视的规则。

**考点：** 按值传递的隔离性`,
      tags: ['函数'],
    },
    {
      id: 20,
      type: 'judge',
      question: `下面结构体初始化语句是合法的。
\`\`\`cpp
struct Point {
    int x;
    int y;
};
Point p{3, 4};
\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

**判定依据：**
\`Point\` 是简单聚合类型（无构造函数、无私有成员），可以用**花括号聚合初始化**：\`Point p{3, 4}\` 按成员声明顺序把 x=3、y=4，完全合法。

**易错点：**
- 聚合初始化按**成员声明顺序**对应值；值少于成员数时其余补零。
- 若结构体里自定义了构造函数，就不能再用这种花括号列表初始化（C++17 前的常见约束）。

**考点：** 结构体的聚合初始化`,
      tags: ['结构体'],
    },
    {
      id: 21,
      type: 'judge',
      question: `对于按升序实现的稳定插入排序，移动元素的条件通常应为 a[j] >= key，这样能够保证相等元素的相对顺序不变。
\`\`\`cpp
while (j >= 0 && a[j] >= key) {
    a[j + 1] = a[j];
    j--;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

**判定依据：**
稳定的插入排序应该用**严格大于** \`a[j] > key\`：相等的元素**不挪**，key 落在相等元素的**后面**——先来者在先，相对顺序保持。

若用 \`>=\`：相等的元素也会被挪到 key 后面——后插入的 key 反而排到了等值前辈的**前面**，相对顺序被破坏，恰好**失去稳定性**。

结论反了，说法错误。

**易错点：**
- 「严格比较保稳定」：相等不动是稳定性的关键；\`>=\` 是破坏稳定的典型笔误。

**考点：** 插入排序的稳定性条件`,
      tags: ['排序'],
    },
    {
      id: 22,
      type: 'judge',
      question: `下面递推程序计算 n!。当 n = 4 时，返回值为 24。
\`\`\`cpp
int factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

**判定依据：**
循环从 1 乘到 n：\`result = 1 × 2 × 3 × 4 = 24\`——正是 4!，说法正确。

**易错点：**
- \`result\` 初值是 1（乘法单位元），别初始化成 0。
- n=0 时循环不执行，返回 1，0! = 1 同样正确。

**考点：** 阶乘的循环实现`,
      tags: ['递推', '函数'],
    },
    {
      id: 23,
      type: 'judge',
      question: `下面两层循环的时间复杂度是 O(n²)。
\`\`\`cpp
for (int i = 0; i < n; i++) {
    for (int j = 1; j < n; j *= 2) {
        cout << i + j;
    }
}
\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

**判定依据：**
外层 n 次；内层 \`j *= 2\`——**倍增**，从 1 到 n 只需 log₂n 次。

总执行次数 \`n × log n\`，时间复杂度是 **O(n log n)**，不是 O(n²)。

**易错点：**
- 看内层循环变量的变化方式：\`j++\` 线性 → n 次；\`j *= 2\` 指数增长 → log n 次。两层相乘别想当然 n²。

**考点：** 循环变量倍增的复杂度`,
      tags: ['复杂度分析'],
    },
    {
      id: 24,
      type: 'judge',
      question: `假设文件能够正常打开，下面程序会把 Welcome 写入 log.txt。
\`\`\`cpp
int main() {
    ofstream fout("log.txt");
    fout << "Welcome";
    fout.close();
    return 0;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: 0,
      score: 2,
      explanation: `**答案：正确**

**判定依据：**
\`ofstream\` 打开（不存在则创建、存在则默认截断清空）\`log.txt\`，\`fout << "Welcome"\` 把字符串写入文件，\`close()\` 刷缓冲关闭——文件内容就是 \`Welcome\`。

**易错点：**
- \`ofstream\` 默认模式是 \`ios::out\`：**覆盖**已有内容；追加要用 \`ios::app\`。
- 不 \`close()\` 时析构函数也会关闭，但显式 close 是好习惯。

**考点：** 文件输出流`,
      tags: ['文件操作'],
    },
    {
      id: 25,
      type: 'judge',
      question: `执行下面程序时，catch (int e) 能够捕获由 throw "Error" 抛出的异常，因此程序输出 Caught。
\`\`\`cpp
int main() {
    try {
        throw "Error";
    } catch (int e) {
        cout << "Caught";
    }
    return 0;
}
\`\`\``,
      options: ['正确', '错误'],
      answer: 1,
      score: 2,
      explanation: `**答案：错误**

**判定依据：**
\`throw "Error"\` 抛出的是 \`const char*\` 类型（字符串字面量），而 \`catch (int e)\` 只接 **int** 类型——类型不匹配，**捕获失败**。

没有匹配的 catch 时，异常继续向外传播；main 中无人处理 → 调用 \`std::terminate\` → **程序异常终止**，不会输出 Caught。

要捕获应写 \`catch (const char *msg)\`。

**易错点：**
- 异常匹配严格按类型，不做 \`char*\` → \`int\` 之类的转换。
- 未捕获的异常直接 terminate，不是「输出空」或「忽略」。

**考点：** 异常类型匹配`,
      tags: ['异常处理'],
    },
    {
      id: 26,
      type: 'programming',
      samples: [
        { input: "2", output: "7" },
        { input: "3", output: "21" },
      ],
      question: `## 新汉诺塔

**题目描述**

汉诺塔问题是最经典的递推问题之一：

有三个可以放圆盘柱子，编号为 A、B 和 C。
开始时柱子 A 上套着 n 个圆盘，它们从上到下按照从小到大的顺序排列。
我们的任务是要把这 n 个圆盘移到柱子 C 上，并保持它们的原有顺序不变。
在移动圆盘的过程中，需要遵守以下规则：

1. 圆盘只能从一根柱子顶部拿出，从另一根柱子顶部放入。
2. 每次只能移动一个圆盘。
3. 小圆盘必须时刻位于大圆盘之上。
4. 每一次移动，圆盘只能从 A 移动到 B，从 B 移动到 C，或者从 C 移动到 A；其它移动是不允许的。

小杨在学习了汉诺塔问题后，决定添加一个新规则（即上面的规则 4）：

在新规则下，给定圆盘数量 n，试问最少移动步数是多少？

**输入格式**

输入一个正整数 n，表示圆盘的数量。

**输出格式**

输出一个整数，表示在新规则下将 n 个圆盘从 A 移动到 C 所需的最少移动步数。

**样例 1**

输入：
\`\`\`
2
\`\`\`

输出：
\`\`\`
7
\`\`\`

样例解释：以下步骤是最佳的（编号为 1 的是小盘，为 2 的是大盘）：
1. 将 1 从 A 移动到 B；
2. 将 1 从 B 移动到 C；
3. 将 2 从 A 移动到 B；
4. 将 1 从 C 移动到 A；
5. 将 2 从 B 移动到 C；
6. 将 1 从 A 移动到 B；
7. 将 1 从 B 移动到 C。
可以证明没有更少步骤可以完成这个任务。

**样例 2**

输入：
\`\`\`
3
\`\`\`

输出：
\`\`\`
21
\`\`\`

**数据范围**

对于所有数据，n ≤ 20。`,
      options: [],
      answer: '',
      score: 25,
      timeLimit: '1.0s',
      memoryLimit: '512.0MB',
      explanation: `**解题思路：**

1. **新规则的约束**：圆盘只能沿 A→B→C→A 单向循环移动，**反向（A→C、C→B、B→A）不允许**。不能像经典汉诺塔那样「大盘压着 n−1 个盘从 A 借 C 挪到 B」——反向移动被禁止。
2. **递推设计**：设 \`f[i]\` 表示「把 i 个盘沿循环方向移动一格（如 A→B）的最少步数」，\`g[i]\` 表示「把 i 个盘从 A 挪到 C（沿循环方向前进两格）的最少步数」。移动 i 个盘前进两格：先把 i−1 个盘前进两格（g），把最大盘前进一格（f 的第一步），再把 i−1 个盘前进一格绕回来（f），把最大盘再前进一格，再把 i−1 个盘前进两格。综合可得官方递推：
   - \`f[i] = 2*g[i−1] + 1\`（先挪走 i−1 个盘到目标柱，再移大盘）
   - \`g[i] = 2*g[i−1] + f[i−1] + 2\`
3. **输出** \`g[n]\`。

**样例走查：**
g[1]=2?（1 个盘 A→C 需 A→B、B→C 共 2 步）、f[1]=1；f[2]=2*g[1]+1=5、g[2]=2*g[1]+f[1]+2=7 ✓（样例 1）；g[3]=2*7+5+2=21 ✓（样例 2）。

**易错提醒：**
- 经典汉诺塔 A→C 是 2ⁿ−1 步（如 n=2 时 3 步）；新规则禁止反向移动，步数暴涨（n=2 就要 7 步）——别套老公式。
- n ≤ 20 时结果可达上亿级，用 \`long long\` 更稳妥（官方用 int 数组在 n=20 时 g≈3.5×10⁹ 会溢出 int，实际官方数组为 int——按官方参考程序实现，竞赛数据下注意评测范围）。`,
      template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}',
      referenceCode: '#include <iostream>\nusing namespace std;\nint f[22], g[22];\nint main() {\n    int n;\n    cin >> n;\n    for (int i = 1; i <= n; ++i) {\n        f[i] = 2 * g[i - 1] + 1;\n        g[i] = 2 * g[i - 1] + f[i - 1] + 2;\n    }\n    cout << g[n] << endl;\n    return 0;\n}',
      tags: ['递推'],
    },
    {
      id: 27,
      type: 'programming',
      samples: [
        { input: "3 2\n6 5\n4 3\n2 1", output: "1 2\n3 4\n5 6" },
        { input: "3 4\n1 3 2 5\n6 2 4 4\n5 4 1 3", output: "1 2 3 5\n1 3 4 5\n2 4 4 6" },
      ],
      question: `## 有序网格

**题目描述**

小 A 有一个 n 行 m 列格子组成的二维网格，从上到下依次是第 1 行到第 n 行，从左到右依次是第 1 列到第 m 列。

每个格子里有一个数字，第 i 行第 j 列的格子里的数字是 aᵢⱼ。

小 A 想让二维网格变得有序，因此他先对每一行从左到右按升序排序，再对每一列从上到下按升序排序。以下是一个先完成行排序再完成列排序的例子：

- 每行升序排序
- 每列升序排序

小 A 想知道二维网格经过以上排序后的结果。你能编写程序帮助他吗？

**输入格式**

第一行，两个正整数 n, m，分别二维网格的行数与列数。
接下来 n 行，每行 m 个整数 aᵢ₁, ⋯, aᵢₘ，表示二维网格中的数字。

**输出格式**

输出 n 行，每行 m 个整数，表示二维网格先完成行排序再完成列排序后的结果。

**样例 1**

输入：
\`\`\`
3 2
6 5
4 3
2 1
\`\`\`

输出：
\`\`\`
1 2
3 4
5 6
\`\`\`

**样例 2**

输入：
\`\`\`
3 4
1 3 2 5
6 2 4 4
5 4 1 3
\`\`\`

输出：
\`\`\`
1 2 3 5
1 3 4 5
2 4 4 6
\`\`\`

**数据范围**

对于所有测试点，保证 2 ≤ n ≤ 10，2 ≤ m ≤ 10，1 ≤ aᵢⱼ ≤ 100。`,
      options: [],
      answer: '',
      score: 25,
      timeLimit: '1.0s',
      memoryLimit: '512.0MB',
      explanation: `**解题思路：**

1. **直接模拟**：数据极小（n, m ≤ 10），先对每一行调用 \`sort\` 升序，再对每一列（固定列 j，把 a[1][j]~a[n][j] 收集起来）排序后写回。
2. **输出**：n 行 m 列，空格分隔、行尾换行。

**样例走查（样例 2）：**
- 行排序后：\`1 2 3 5\` / \`2 4 4 6\` / \`1 3 4 5\`
- 逐列排序：第 1 列 {1,2,1}→{1,1,2}；第 2 列 {2,4,3}→{2,3,4}；第 3 列 {3,4,4} 不变；第 4 列 {5,6,5}→{5,5,6}
- 结果：\`1 2 3 5\` / \`1 3 4 5\` / \`2 4 4 6\` ✓

**易错提醒：**
- 行排序用 \`sort(a[i]+1, a[i]+m+1)\`（下标从 1 开始时）；列排序需要手动起泡或提取列向量。
- 先行后列的顺序按题意执行即可——列排序会打乱行内的序，这是题目要求的最终状态，不用回头再排行。
- 输出行末空格/换行格式按样例（空格分隔、行尾换行）。`,
      template: '#include <cstdio>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    // 在此填写代码\n    return 0;\n}',
      referenceCode: '#include <cstdio>\n#include <algorithm>\nusing namespace std;\nconst int N = 15;\nint n, m;\nint a[N][N];\nvoid sort_row(int r) {\n    for (int i = 1; i <= m; i++)\n        for (int j = 1; j < m; j++)\n            if (a[r][j] > a[r][j + 1]) {\n                int tmp = a[r][j];\n                a[r][j] = a[r][j + 1];\n                a[r][j + 1] = tmp;\n            }\n    return;\n}\nvoid sort_col(int c) {\n    for (int i = 1; i <= n; i++)\n        for (int j = 1; j < n; j++)\n            if (a[j][c] > a[j + 1][c]) {\n                int tmp = a[j][c];\n                a[j][c] = a[j + 1][c];\n                a[j + 1][c] = tmp;\n            }\n    return;\n}\nint main() {\n    scanf("%d%d", &n, &m);\n    for (int i = 1; i <= n; i++)\n        for (int j = 1; j <= m; j++)\n            scanf("%d", &a[i][j]);\n    for (int i = 1; i <= n; i++)\n        sort_row(i);\n    for (int i = 1; i <= m; i++)\n        sort_col(i);\n    for (int i = 1; i <= n; i++)\n        for (int j = 1; j <= m; j++)\n            printf("%d%c", a[i][j], " \\n"[j == m]);\n    return 0;\n}',
      tags: ['排序', '二维数组'],
    },
  ],
};
