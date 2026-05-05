// 2025年12月 GESP C++ 四级真题
export const paperData = {
    id: '2025-12-l4',
    title: '2025年12月 GESP C++ 四级真题',
    level: 4,
    year: 2025,
    month: 12,
    session: 12,
    timeLimit: 5400,
    backfilled: true,
    questions: [
        {
            id: 1,
            type: "single",
            question: `小杨想让指针 p 指向整数变量 x，正确写法是（ ）。`,
            options: [
                "int p = &x;",
                "int *p = x;",
                "int *p = &x;",
                "p = *x;",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (int *p = &x;)**

**选项逐项分析：**
- **A int p = &x;**：❌ 错误。变量 \`p\` 被声明为整型 (\`int\`)，不能存储地址 (\`&x\`)。
- **B int *p = x;**：❌ 错误。\`p\` 是指针，应当指向地址，而 \`x\` 是变量的值。
- **C int *p = &x;**：✅ 正确。声明指针变量 \`p\`，并使用取地址符 \`&\` 获取变量 \`x\` 的地址进行赋值。
- **D p = *x;**：❌ 错误。\`*x\` 是对非指针变量执行解引用操作，语法错误。

**考点：** C++ 指针的定义、取地址符 \`&\` 与解引用符 \`*\`。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 2,
            type: "single",
            question: `小杨写了如下的指针接力程序，程序执⾏完后变量 a、*p1和*p2的值分别是（ ）。\n\`\`\`cpp\nint a = 5;\nint* p1 = &a;\nint* p2 = p1;\n*p2 = 10;\n\`\`\``,
            options: [
                "5 10 10",
                "5 10 15",
                "10 10 10",
                "5 5 10",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (10 10 10)**

**选项逐项分析：**
- **A 5 10 10 / B 5 10 15 / D 5 5 10**：❌ 错误。
- **C 10 10 10**：✅ 正确。
  1. \`p1\` 指向 \`a\`。
  2. \`p2 = p1\`，使 \`p2\` 也指向 \`a\`。
  3. \`*p2 = 10\`，通过指针 \`p2\` 将 \`a\` 的内存修改为 10。
  4. 此时 \`a\` 为 10，\`*p1\`（访问 \`a\`）为 10，\`*p2\`（访问 \`a\`）也为 10。

**考点：** 多个指针指向同一变量的修改效应。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 3,
            type: "single",
            question: `小杨用一个二维数组表⽰棋盘，其中 1 表⽰有棋子， 0 表⽰没有棋子。他想知道第 2 ⾏ 第 3 列有没有棋子， 可采用的代码是：（ ）。\n\`\`\`cpp\nint a[3][4] = {\n {1, 0, 1, 0},\n {0, 1, 0, 1},\n {1, 1, 0, 0}\n};\n\`\`\``,
            options: [
                "cout << a[1, 2] << endl;",
                "cout << a[1][2] << endl;",
                "cout << a(1, 2) << endl;",
                "cout << a{1}{2} << endl;",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (cout << a[1][2] << endl;)**

**选项逐项分析：**
- **A a[1, 2]**：❌ 错误。C++ 数组下标不支持逗号分隔符（此写法会触发逗号运算符，退化为 \`a[2]\`）。
- **B a[1][2]**：✅ 正确。
  1. 第 2 行对应的行索引为 1（索引从 0 开始）。
  2. 第 3 列对应的列索引为 2。
  3. 因此访问代码为 \`a[1][2]\`。
- **C a(1, 2) / D a{1}{2}**：❌ 错误。

**考点：** 二维数组的下标访问规则。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 4,
            type: "single",
            question: `执⾏完下面的代码后，*(p+5) 和 arr[1][1]的值分别是（ ）。\n\`\`\`cpp\nint arr[3][4] = {{1,2,3,4}, {5,6,7,8}, {9,10,11,12}};\nint* p = &arr[0][0];\n\`\`\``,
            options: [
                "5 6",
                "6 5",
                "5 5",
                "6 6",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (6 6)**

**选项逐项分析：**
- **A 5 6 / B 6 5 / C 5 5**：❌ 错误。
- **D 6 6**：✅ 正确。
  1. **二维数组内存布局**：\`arr[3][4]\` 在内存中是连续存储的 12 个整数。
  2. \`p\` 指向 \`arr[0][0]\`（第 1 个元素，值为 1）。
  3. \`p+5\` 指向第 6 个元素。按行优先顺序：第 0 行有 4 个 (索引 0-3)，第 1 行第 1 个是索引 4，第 1 行第 2 个是索引 5。
  4. 索引 5 对应 \`arr[1][1]\`。
  5. \`arr[1][1]\` 的值是第二行第二个元素，即 6。
  6. 因此 \`*(p+5)\` 和 \`arr[1][1]\` 都是 6。

**考点：** 二维数组的行优先存储机制与指针算术。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 5,
            type: "single",
            question: `执⾏完下面的代码后，sum 的值是（ ）。\n\`\`\`cpp\nint arr[2][3][2] = {\n {{1,2}, {3,4}, {5,6}},\n {{7,8}, {9,10}, {11,12}}\n};\nint sum = 0;\nfor(int i = 0; i < 2; i++)\n for(int j = 0; j < 3; j++)\n for(int k = 0; k < 2; k++)\n if((i+j+k) % 2 == 0)\n sum += arr[i][j][k];\n\`\`\``,
            options: [
                "36",
                "39",
                "78",
                "30",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (39)**

**选项逐项分析：**
- **A 36 / C 78 / D 30**：❌ 错误。
- **B 39**：✅ 正确。
  满足 \`(i+j+k) % 2 == 0\` 的项：
  - $i=0$: (0,0,0) [1], (0,1,1) [4], (0,2,0) [5] -> $1+4+5=10$
  - $i=1$: (1,0,1) [8], (1,1,0) [9], (1,2,1) [12] -> $8+9+12=29$
  - 总和：$10 + 29 = 39$。

**考点：** 多维数组的遍历与三重循环逻辑。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 6,
            type: "single",
            question: `执⾏完下面的代码后，输出是（ ）。\n\`\`\`cpp\nint a = 1;\nvoid test() {\n int a = 2;\n {\n int a = 3;\n a++;\n }\n a++;\n cout << a << " ";\n}\nint main() {\n test();\n cout << a;\n return 0;\n}\n\`\`\``,
            options: [
                "3 1",
                "4 1",
                "3 2",
                "4 2",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (3 1)**

**选项逐项分析：**
- **A 3 1**：✅ 正确。
  1. \`test()\` 内部：定义局部变量 \`a = 2\`。
  2. 进入内部块 \`{ ... }\`：定义一个新的局部变量 \`a = 3\`，执行 \`a++\` 使其变为 4，但该变量在块结束时销毁。
  3. 执行外层局部变量的 \`a++\`，\`a\` 由 2 变为 3。
  4. \`cout << a\` 输出局部变量 3。
  5. \`main()\` 中执行 \`cout << a\`：此处的 \`a\` 是全局变量，值为 1。
- **B / C / D**：❌ 错误。

**考点：** 变量作用域（Scope）、生命周期与屏蔽效应。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 7,
            type: "single",
            question: `执⾏完下面的代码后，a 、b 和 c 的值分别是（ ）。\n\`\`\`cpp\nvoid byValue(int x) { x = 100; }\nvoid byRef(int& x) { x = 200; }\nvoid byPointer(int* x) { *x = 300; }\nint main() {\n int a = 1, b = 2, c = 3;\n byValue(a);\n byRef(b);\n byPointer(&c);\n return 0;\n}\n\`\`\``,
            options: [
                "100 200 300",
                "1 2 3",
                "1 200 300",
                "1 2 300",
            ],
            answer: 2,
            score: 2,
            explanation: `**答案：C (1 200 300)**

**选项逐项分析：**
- **A / B / D**：❌ 错误。
- **C 1 200 300**：✅ 正确。
  1. \`byValue(a)\`：**值传递**。函数内部修改的是副本，不影响原变量 \`a\`，故 \`a=1\`。
  2. \`byRef(b)\`：**引用传递**。直接操作原变量 \`b\`，将其修改为 200。
  3. \`byPointer(&c)\`：**指针传递**。通过地址修改原变量 \`c\`，将其修改为 300。

**考点：** C++ 函数的三种参数传递方式及其对实参的影响。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 8,
            type: "single",
            question: `运⾏如下代码会输出（ ）。\n\`\`\`cpp\nstruct Point { int x, y; };\nstruct Rectangle { Point topLeft; Point bottomRight; };\nint main() {\n Rectangle rect = {{10, 10}, {20, 20}};\n rect.topLeft.x = 5;\n Point* p = &rect.bottomRight;\n p->y = 5;\n cout << rect.topLeft.x+rect.bottomRight.y;\n return 0;\n}\n\`\`\``,
            options: [
                "10",
                "30",
                "15",
                "20",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (10)**

**选项逐项分析：**
- **A 10**：✅ 正确。
  1. 初始：\`rect.topLeft.x = 10\`, \`rect.bottomRight.y = 20\`。
  2. \`rect.topLeft.x = 5\`：直接修改为 5。
  3. \`p = &rect.bottomRight\`，\`p->y = 5\`：通过指针修改 \`bottomRight.y\` 为 5。
  4. 最终计算：$5 + 5 = 10$。
- **B / C / D**：❌ 错误。

**考点：** 结构体嵌套访问与指针操作（\`->\` 运算符）。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 9,
            type: "single",
            question: `给定函数 climbStairs(int n) 的定义如下，则 climbStairs(5) 的返回的值是（ ）。\n\`\`\`cpp\nint climbStairs(int n) {\n if(n <= 2) return n;\n int a = 1, b = 2;\n for(int i = 3; i <= n; i++) {\n int temp = a+b;\n a = b;\n b = temp;\n }\n return b;\n}\n\`\`\``,
            options: [
                "5",
                "8",
                "13",
                "10",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (8)**

**选项逐项分析：**
- **A 5 / C 13 / D 10**：❌ 错误。
- **B 8**：✅ 正确。
  递推过程（斐波那契逻辑）：
  - $i=3: temp = 1 + 2 = 3; a = 2, b = 3;$
  - $i=4: temp = 2 + 3 = 5; a = 3, b = 5;$
  - $i=5: temp = 3 + 5 = 8; a = 5, b = 8;$
  - 循环结束，返回 $b = 8$。

**考点：** 递推算法实现（爬楼梯问题/斐波那契数列）。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 10,
            type: "single",
            question: `对如下 4 个扑克牌进⾏排序， 使用某排序算法按 value 排序后，结果为 : {3,'D'}, {3,'B'}, {5,'A'}, {5,'C'}，则这个排序算法是稳定的吗？\n\`\`\`cpp\nstruct Card { int value; char suit; };\nCard cards[4] = {{5,'A'}, {3,'B'}, {5,'C'}, {3,'D'}};\n\`\`\``,
            options: [
                "稳定，因为相同 value 的元素相对顺序保持不变",
                "不稳定，因为 {3,'D'} 出现在 {3,'B'} 之前",
                "无法判断",
                "稳定，因为结果是有序的",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (不稳定，因为 {3,'D'} 出现在 {3,'B'} 之前)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。
- **B 不稳定**：✅ 正确。
  1. **稳定性定义**：排序后具有相同键值的元素，其相对顺序应与原序列一致。
  2. 原序列中，\`{3,'B'}\` 在 \`{3,'D'}\` 之前。
  3. 排序结果中，\`{3,'D'}\` 被移到了 \`{3,'B'}\` 之前。
  4. 相对顺序发生了改变，因此该算法是不稳定的。

**考点：** 排序算法的稳定性（Stability）判别。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 11,
            type: "single",
            question: `下面的函数 selectTopK() 实现从 n 个学生中选出前 k 名成绩最好的学生颁发奖学⾦，则横线上应填写（ ）。\n\`\`\`cpp\nstruct Student { string name; int score; };\nvoid selectTopK(Student students[], int n, int k) {\n for (int i = 0; i < k; i++) {\n int maxIdx = i;\n for (____________________) { // 在此处填入代码\n if (students[j].score > students[maxIdx].score) {\n maxIdx = j;\n }\n }\n if (maxIdx != i) {\n Student temp = students[i];\n students[i] = students[maxIdx];\n students[maxIdx] = temp;\n }\n }\n}\n\`\`\``,
            options: [
                "int j = 0; j < n; j++",
                "int j = i+1; j < n; j++",
                "int j = i; j < n; j++",
                "int j = 1; j <= n; j++",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (int j = i+1; j < n; j++)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。
- **B 正确代码**：✅ 正确。
  1. 此算法是对**选择排序**思想的局部应用，旨在找出前 $k$ 个最大值。
  2. 外层循环 \`i\` 表示当前正在确定的排名位置。
  3. 内层循环 \`j\` 应当从当前位置的下一个元素 \`i+1\` 开始，遍历到数组末尾 \`n-1\`。
  4. 这样可以从剩余未确定的学生中寻找最高分 \`maxIdx\`，并与位置 \`i\` 进行交换。

**考点：** 选择排序（Selection Sort）的算法过程与代码实现。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 12,
            type: "single",
            question: `某游戏的排⾏榜系统需要实时更新玩家分数。每次只有一个玩家的分数发生变化，排⾏榜已经是按分数降序排列的。现在需要将更新后的玩家调整到正确位置。下面的函数 updateRanking() 要实现上述功能，则两处横线上应分别填写（ ）。\n\`\`\`cpp\nvoid updateRanking(Player players[], int size, int playerIdx) {\n Player updatedPlayer = players[playerIdx];\n if (playerIdx > 0 && updatedPlayer.score > players[playerIdx-1].score) {\n int i = playerIdx;\n while (____________________) {\n players[i] = players[i-1];\n i--;\n }\n players[i] = updatedPlayer;\n } else if (playerIdx < size-1 && updatedPlayer.score < players[playerIdx+1].score) {\n int i = playerIdx;\n while (____________________) {\n players[i] = players[i+1];\n i++;\n }\n players[i] = updatedPlayer;\n }\n}\n\`\`\``,
            options: [
                "i > 0 && updatedPlayer.score > players[i-1].score | i < size-1 && updatedPlayer.score < players[i+1].score",
                "i < size-1 && updatedPlayer.score < players[i+1].score | i > 0 && updatedPlayer.score > players[i-1].score",
                "i > 0 && updatedPlayer.score < players[i-1].score | i < size-1 && updatedPlayer.score < players[i+1].score",
                "i > 0 && updatedPlayer.score < players[i-1].score | i < size-1 && updatedPlayer.score > players[i+1].score",
            ],
            answer: 0,
            score: 2,
            explanation: `**答案：A (i > 0 && updatedPlayer.score > players[i-1].score | i < size-1 && updatedPlayer.score < players[i+1].score)**

**选项逐项分析：**
- **A 正确逻辑**：✅ 正确。
  1. 如果玩家分数增加（上浮）：应与前一名 \`players[i-1]\` 比较。只要当前分数更高 (\`updatedPlayer.score > players[i-1].score\`)，就将前一名后移。
  2. 如果玩家分数减少（下沉）：应与后一名 \`players[i+1]\` 比较。只要当前分数更低 (\`updatedPlayer.score < players[i+1].score\`)，就将后一名前移。
- **B / C / D**：❌ 错误。

**考点：** 数组维护（类似插入排序的单步调整逻辑）。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 13,
            type: "single",
            question: `给定如下算法，其时间复杂度为（ ）。\n\`\`\`cpp\nbool f(int arr[], int n, int target) {\n for (int i = 0; i < n; i++) {\n int sum = 0;\n for (int j = 0; j < n; j++) {\n if (i & (1 << j)) {\n sum += arr[j];\n }\n }\n if (sum == target) return true;\n }\n return false;\n}\n\`\`\``,
            options: [
                "$O(N)$",
                "$O(N^2)$",
                "O($2^n$)",
                "O(n * $2^n$)",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B ($O(N^2)$)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。
- **B $O(N^2)$**：✅ 正确。
  1. 外层循环：\`i\` 从 0 到 $n-1$，迭代 $n$ 次。
  2. 内层循环：\`j\` 从 0 到 $n-1$，迭代 $n$ 次。
  3. 虽然内部有位运算 \`i & (1 << j)\`，但总的基本操作执行次数为 $n \times n = n^2$。
  注意：如果外层循环是 \`i < (1 << n)\`，复杂度才是 $O(n \times 2^n)$。

**考点：** 嵌套循环的时间复杂度分析。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 14,
            type: "single",
            question: `执⾏下面 C++ 程序，会输出（ ）。\n\`\`\`cpp\nint main() {\n ofstream fout("test.txt");\n fout << "Happy" << endl;\n fout << "New Year";\n fout.close();\n ifstream fin("test.txt");\n string s1, s2;\n fin >> s1;\n getline(fin, s2);\n fin.close();\n cout << s1 << "|" << s2;\n return 0;\n}\n\`\`\``,
            options: [
                "Happy|New Year",
                "Happy| New Year",
                "HappyNew Year|",
                "Happy|",
            ],
            answer: 3,
            score: 2,
            explanation: `**答案：D (Happy|)**

**选项逐项分析：**
- **A / B / C**：❌ 错误。
- **D Happy|**：✅ 正确。
  1. 文件写入后内容为：
     \`Happy\` (换行符)
     \`New Year\`
  2. \`fin >> s1\`：读取第一个单词 "Happy"，此时文件指针停留在 "Happy" 后的换行符处。
  3. \`getline(fin, s2)\`：读取从当前位置到行尾的内容。由于当前位置就是换行符，\`getline\` 会读取到一个**空字符串**（并消耗掉换行符）。
  4. 输出 \`s1 << "|" << s2\` 即为 "Happy|"。

**考点：** C++ 流输入 \`>>\` 与 \`getline\` 的混合读取行为特性。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 15,
            type: "single",
            question: `执⾏下面 C++ 代码，会输出 ( ) 。\n\`\`\`cpp\nint divide(int a, int b) {\n if(b == 0) throw "Division by zero";\n return a / b;\n}\nint main() {\n int result = 0;\n try {\n result = divide(10, 0);\n cout << "A";\n } catch(const char* msg) {\n cout << "B";\n result = -1;\n }\n cout << result;\n return 0;\n}\n\`\`\``,
            options: [
                "A0",
                "B-1",
                "A10",
                "程序崩溃",
            ],
            answer: 1,
            score: 2,
            explanation: `**答案：B (B-1)**

**选项逐项分析：**
- **A / C / D**：❌ 错误。
- **B B-1**：✅ 正确。
  1. 执行 \`divide(10, 0)\`。
  2. 触发 \`if (b == 0) throw "Division by zero";\`。
  3. 程序立即跳出 \`try\` 块（不打印 "A"），寻找匹配的 \`catch\`。
  4. \`catch(const char* msg)\` 匹配成功：打印 "B"，并将 \`result\` 设为 -1。
  5. 执行 \`catch\` 块后的代码：\`cout << result\` 打印 -1。
  综合输出为 B-1。

**考点：** C++ 异常处理（try-catch-throw）的执行流程。`,
            tags: ["客观题", "单选题", "GESP4级"]
        },
        {
            id: 16,
            type: "judge",
            question: `小杨正在调试他的温度传感器程序，其中变量 x 保存当前温度。下面这段代码运⾏后，变量 x 的值变成 了 8。\n\`\`\`cpp\nint x = 5;\nint *p = &x;\n*p = *p+3;\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  \`int *p = &x;\` 让指针 \`p\` 指向变量 \`x\` 的地址。
2.  \`*p = *p + 3;\` 等价于 \`x = x + 3;\`。
3.  \`x\` 初始值为 5，加 3 后变为 8。

**考点：** C++ 指针的定义、取地址与解引用赋值。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 17,
            type: "judge",
            question: `一个结构体不能包含另一个结构体。`,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
C++ 语法完全支持结构体嵌套（Nested Structures）。一个结构体可以包含另一个结构体作为其成员变量，这在表示复杂数据模型（如矩形包含坐标点）时非常常见。

**考点：** C++ 结构体嵌套的定义与使用。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 18,
            type: "judge",
            question: `在 C++ 中，定义如下二维数组：int a[3][4];，数组 a 在内存中是按⾏优先连续存放的。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
C++ 标准规定，二维数组在内存中是**按行主序（Row-Major Order）**连续存放的。这意味着第一行的所有元素存放在内存的最前面，接着是第二行的所有元素，以此类推。

**考点：** 二维数组在内存中的物理存储结构。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 19,
            type: "judge",
            question: `执⾏下面程序后，变量 a 的值会变成 15。\n\`\`\`cpp\nvoid add(int &x){ x += 10; }\nint a = 5;\nadd(a);\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  \`void add(int &x)\` 定义了参数 \`x\` 为引用类型。
2.  引用传递（Pass by Reference）意味着 \`x\` 只是实参 \`a\` 的一个别名，对 \`x\` 的任何修改都会直接作用于 \`a\`。
3.  \`x += 10\` 使 \`a\` 的值从 5 变为 15。

**考点：** C++ 函数参数的引用传递特性。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 20,
            type: "judge",
            question: `执⾏下面的 C++ 代码，会输出 8。\n\`\`\`cpp\nint arr[5] = {1, 2, 3, 4, 5};\nint* p1 = arr;\nint* p2 = arr+2;\ncout << p2-p1;\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1.  在 C++ 中，指针相减的结果是**两个指针之间相隔的元素个数**，而不是字节数。
2.  \`p1\` 指向 \`arr[0]\`，\`p2\` 指向 \`arr[2]\`。
3.  \`p2 - p1\` 的结果是偏移量 2。
4.  如果要得到字节数，通常需要将指针强转为 \`char*\` 再相减。

**考点：** 指针算术运算（Pointer Arithmetic）的减法含义。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 21,
            type: "judge",
            question: `考虑用如下递推方式计算斐波那契数列，时间复杂度是 $O(N)$。\n\`\`\`cpp\nint f[20]; f[0] = 0; f[1] = 1;\nfor (int i = 2; i <= n; i++) f[i] = f[i-1]+f[i-2];\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
该算法使用数组 \`f\` 记录已计算的值，通过单层 \`for\` 循环从 2 迭代到 $n$。每个状态的计算仅涉及一次加法，且每个状态只计算一次。因此，总时间复杂度为 $O(N)$。

**考点：** 递推算法（动态规划基础）的时间复杂度分析。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 22,
            type: "judge",
            question: `冒泡排序和插入排序都是稳定排序算法。`,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  **冒泡排序**：只有在 \`a[j] > a[j+1]\` 时才交换，遇到相等元素不交换，保持了相对顺序。
2.  **插入排序**：只有在 \`a[j] > x\` 时才后移，遇到相等元素停止移动并插入其后，保持了相对顺序。
因此，两者都是稳定的排序算法。

**考点：** 常用排序算法稳定性（Stability）的判定。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 23,
            type: "judge",
            question: `下面这段代码实现了选择排序算法。\n\`\`\`cpp\nvoid sort(int a[], int n) {\n for (int i = 1; i < n; i++) {\n int x = a[i];\n int j = i-1;\n while (j >= 0 && a[j] > x) {\n a[j+1] = a[j];\n j--;\n }\n a[j+1] = x;\n }\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
这段代码展示的是**插入排序（Insertion Sort）**的实现逻辑：
1.  将当前元素 \`x\` 暂存。
2.  将前面比 \`x\` 大的元素依次后移。
3.  将 \`x\` 插入到空出的位置。
而选择排序（Selection Sort）的核心逻辑是寻找未排序区间的极值索引并与当前位置交换。

**考点：** 排序算法（选择排序 vs 插入排序）的逻辑辨析。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 24,
            type: "judge",
            question: `下面代码可以正常编译并输出 10。\n\`\`\`cpp\nint calculate(int x, int y = 10); \nint main() { cout << calculate(5); return 0; }\nint calculate(int x, int y) { return x * y; }\nint calculate(int x) { return x * 2; }\n\`\`\``,
            options: ["正确", "错误"],
            answer: 1,
            score: 2,
            explanation: `**答案：错误**

**判定依据：**
1.  \`calculate(int x, int y = 10)\`：定义了带默认参数的函数。
2.  \`calculate(int x)\`：定义了重载函数。
3.  当调用 \`calculate(5)\` 时，编译器既可以匹配第一个函数（使用默认参数），也可以匹配第二个函数。
4.  这产生了**函数重载二义性（Ambiguity）**，编译器无法确定调用哪一个，会导致编译错误。

**考点：** C++ 函数重载与默认参数产生的冲突（二义性）。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
            id: 25,
            type: "judge",
            question: `执⾏下面代码会输出 100。\n\`\`\`cpp\nint main() {\n ofstream fout("data.txt");\n fout << 10 << " " << 20 << endl;\n fout << 30 << " " << 40;\n fout.close();\n ifstream fin("data.txt");\n int a, b, c, d;\n fin >> a >> b >> c >> d;\n fin.close();\n cout << a+b+c+d;\n return 0;\n}\n\`\`\``,
            options: ["正确", "错误"],
            answer: 0,
            score: 2,
            explanation: `**答案：正确**

**判定依据：**
1.  写入操作：文件 \`data.txt\` 中保存了四个数字：10, 20, 30, 40（由空格或换行符分隔）。
2.  读取操作：\`fin >> a >> b >> c >> d\` 会依次跳过空白字符，读取这四个整数。
3.  最终计算：$10 + 20 + 30 + 40 = 100$。
输出结果正确。

**考点：** C++ 文件流（fstream）的基本读写操作。`,
            tags: ["客观题", "判断题", "GESP4级"]
        },
        {
      id: 26,
      type: 'programming',
      samples: [
        { input: `5 5 3
5 5 5 5 5
5 1 5 1 5
5 5 5 5 5
5 2 5 2 5
3 5 5 5 2`, output: `40` }
      ],
      question: `
# [GESP202512 四级] 建造

## 题目描述

小 A 有一张 $M$ 行 $N$ 列的地形图，其中第 $i$ 行第 $j$ 列的数字 $a_{ij}$ 代表坐标 $(i, j)$ 的海拔高度。

停机坪为一个 $3 \\times 3$ 的区域，且内部所有 $9$ 个点的最大高度和最小高度之差不超过 $H$。

小 A 想请你计算出，在所有适合建造停机坪的区域中，区域内部 $9$ 个点海拔之和最大是多少。

## 输入格式

第一行三个正整数 $M, N, H$，含义如题面所示。

之后 $M$ 行，第 $i$ 行包含 $N$ 个整数 $a_{i1}, a_{i2}, \\dots, a_{iN}$，代表坐标 $(i, j)$ 的高度。

数据保证总存在一个适合建造停机坪的区域。

## 输出格式

输出一行，代表最大的海拔之和。
`,
      score: 25,
      explanation: `**解析：**
本题考察对二维网格的局部区域统计与极值计算。
1.  **区域枚举**：停机坪大小固定为 $3 \times 3$。由于地图尺寸为 $M \times N$，我们可以枚举所有左上角坐标 $(i, j)$，其中 $0 \leq i \leq M-3, 0 \leq j \leq N-3$。
2.  **约束检查**：对于每个 $3 \times 3$ 的窗口，遍历其中的 9 个格子，找到最大值 \`maxVal\` 和最小值 \`minVal\`。检查 \`maxVal - minVal <= H\` 是否成立。
3.  **结果更新**：如果满足条件，计算该窗口内 9 个数字的和，并维护全局最大值。
4.  **复杂度分析**：窗口数量约为 $(M-2) \times (N-2)$，每个窗口操作固定为 9 次。总复杂度 $O(M \times N)$，在数据范围内表现良好。

**核心逻辑提示：**
\`\`\`cpp
for (int i = 0; i <= M - 3; i++) {
    for (int j = 0; j <= N - 3; j++) {
        int maxV = -1e9, minV = 1e9, curSum = 0;
        for (int r = i; r < i + 3; r++) {
            for (int c = j; c < j + 3; c++) {
                maxV = max(maxV, a[r][c]);
                minV = min(minV, a[r][c]);
                curSum += a[r][c];
            }
        }
        if (maxV - minV <= H) ans = max(ans, curSum);
    }
}
\`\`\``,
      tags: ["编程题", "GESP4级"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      answer: '',
    },
        {
      id: 27,
      type: 'programming',
      samples: [
        { input: `20 4
apple 6 8
bus 15 1
cab 1 10
water 4 8`, output: `bus
cab
water` }
      ],
      question: `
# [GESP202512 四级] 优先购买

## 题目描述

小 A 有 $M$ 元预算。商店有 $N$ 个商品，每个商品有商品名 $S$、价格 $P$ 和优先级 $V$ 三种属性，其中 $V$ 为正整数，且 $V$ 越小代表商品的优先级越高。

小 A 的购物策略为：

- 总是优先买优先级最高的东西；
- 如果有多个最高优先级商品，购买价格最低的；
- 如果有多个优先级最高且价格最低的商品，购买商品名字典序最小的。

小 A 想知道能购买哪些商品。

## 输入格式

第一行两个正整数 $M, N$，代表预算和商品数。

之后 $N$ 行，每行一个商品，依次为 $S_i\\ P_i\\ V_i$，代表第 $i$ 个商品的商品名、价格、优先级。

数据保证不存在两个名字相同的商品。

## 输出格式

按照字典序从小到大的顺序，输出所有购买商品的商品名。
`,
      score: 25,
      explanation: `**解析：**
本题考察结构体多级排序与模拟购买逻辑。
1.  **多级排序**：
    - 第一关键字：优先级 $V$（越小越优先，升序）。
    - 第二关键字：价格 $P$（升序）。
    - 第三关键字：名字 $S$（字典序升序）。
    可以使用 \`std::sort\` 配合自定义比较函数（或重载 \`< \` 运算符）实现。
2.  **模拟购买**：
    - 按排序后的顺序遍历商品。
    - 如果当前余额足以支付商品价格，则买入（扣除余额，并记录商品名）。
3.  **结果处理**：
    - 题目要求按买入商品的名字**字典序从小到大**输出。
    - 将记录的买入列表进行再次排序后输出。

**核心逻辑提示：**
\`\`\`cpp
struct Item { string name; int p, v; };
bool cmp(const Item& a, const Item& b) {
    if (a.v != b.v) return a.v < b.v;
    if (a.p != b.p) return a.p < b.p;
    return a.name < b.name;
}
// 模拟购买后
sort(bought.begin(), bought.end());
for (string s : bought) cout << s << endl;
\`\`\``,
      tags: ["编程题", "GESP4级"],
      template: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios::sync_with_stdio(false);\n    cin.tie(nullptr);\n\n    // 在此编写代码\n\n    return 0;\n}",
      answer: '',
    }
    ]
};
