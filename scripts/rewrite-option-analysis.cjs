/**
 * 重写题库选项逐项分析 — 消除空话套话，生成有教学价值的解析
 *
 * 核心改进：
 * 1. 题目感知：解析题面、选项、核心解析和答案，构建完整上下文
 * 2. 选项级别分析：针对每个错误选项单独生成解释，关注"这个选项本身为什么错"
 * 3. 分类策略：
 *    - 纯数值选项 → 推断错误计算路径
 *    - 代码选项 → 分析代码行为差异
 *    - 概念选项 → 基于 C++ 知识库解释
 *    - 正确选项 → 引用核心解析摘要
 * 4. 判断题：修复不相关的"易混概念"
 * 5. L2合并行：拆分为逐项分析格式
 * 6. L4升级：从纯字符串升级为结构化解析
 *
 * 用法：
 *   node scripts/rewrite-option-analysis.cjs <文件或目录> [--level 1|2|3|4]
 *   node scripts/rewrite-option-analysis.cjs src/data/gesp/level1/2023-03-l1.js
 *   node scripts/rewrite-option-analysis.cjs src/data/gesp/level2/ --level 2
 */

const fs = require('fs');
const path = require('path');

const ANSWER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// ============================================================
// 所有需要替换的模板套话模式
// ============================================================
const TEMPLATE_PATTERNS = [
  /与题目要求不符，请对照正确解析重新理解/,
  /该数值与正确计算结果不符，请重新验算/,
  /该代码逻辑与题目要求不符，请逐步推演/,
  /取模运算的结果需要仔细计算，注意运算符优先级/,
  /进制转换结果有误，请重新按权展开计算/,
  /位运算结果计算有误，请逐步推演每一位的运算/,
  /数组下标从 0 开始，请仔细验证下标范围/,
  /字符的 ASCII 码值需要查表确认/,
  /不同排序算法的稳定性不同/,
  /递归必须有终止条件，请检查递归出口是否正确/,
  /混淆了原码、反码、补码的转换规则/,
  /需要验证循环条件是否最终会变为假/,
  /C\+\+ 对某些写法可能不会报错/,
  /逻辑运算符的使用方式与正确答案不同/,
  /此选项说法有误$/,
  /计算有误$/,
  /计算结果不正确$/,
  /代码逻辑与正确答案不符$/,
  /与正确答案.*不符$/,
  /此说法有误[，,]/,
  /代码逻辑有误[，,]/,
  /代码逻辑有误$/,
  /正确结果为\s*-?\d+\.?\d*，此选项\s*-?\d+\.?\d*\s*计算有误/,
  /正确结果为\s*-?\d+\.?\d*，此选项\s*-?\d+\.?\d*\s*不正确/,
  /请逐步推演/,
  /数值与正确计算结果不符/,
  /请重新验算/
];

// 正确选项零解释模式
const CORRECT_ZERO_EXPLANATION = /^正确答案。$/;

// 错误选项仅写"错误。"零解释
const WRONG_ZERO_EXPLANATION = /^错误[。.]?$/;

// ============================================================
// C++ 知识库 — 用于生成有针对性的选项分析
// ============================================================
const CPP_KNOWLEDGE = {
  // 计算机基础
  '输入设备': '输入设备负责采集信息传入计算机，如键盘、鼠标、传感器、麦克风、摄像头等',
  '输出设备': '输出设备负责呈现结果，如显示器、打印机、音箱等',
  '传感器': '传感器属于输入设备，用于采集物理世界的信息',
  '编译': '编译是将高级语言源代码翻译成机器可执行代码的过程',
  '编辑': '编辑是修改源代码的操作，不会生成可执行代码',
  '调试': '调试是查找和修复程序错误的过程，不是生成可执行代码',
  '保存': '保存是将文件存储到磁盘的操作，不是生成可执行代码',
  '光盘': '光盘是光存储介质，采用激光读写数据，不受磁场影响',
  '硬盘': '硬盘是磁存储介质，利用磁性记录数据，易受强磁场干扰',
  '内存': '内存（RAM）是易失性存储，断电后数据丢失，基于电子存储',
  'U盘': 'U盘是闪存存储介质，基于电子存储，可能受强电磁场影响',
  'CPU': 'CPU（中央处理器）负责执行指令和逻辑判断，是计算机的"大脑"',
  '冯诺依曼': '冯·诺依曼架构的核心是"存储程序"思想，程序和数据都存储在内存中',
  // 计算机发展史
  '电子管': '电子管是第一代计算机使用的电子元件',
  '晶体管': '晶体管是第二代计算机使用的电子元件',
  '集成电路': '集成电路是第三代计算机使用的电子元件',
  '超大规模集成电路': '超大规模集成电路（VLSI）是第四代计算机使用的电子元件',
  // 存储单位
  '字节': '1MB = 1024KB, 1KB = 1024B，计算机存储单位按1024进位',
  'MB': '1MB = 1024KB = 1024×1024B',
  // 编程环境
  'IDE': 'IDE（集成开发环境）是编辑、编译、调试一体化的工具，如 Dev C++',
  '操作系统': '操作系统是管理硬件和软件资源的系统软件，如 Windows、Linux',
  // 网络基础
  'LAN': 'LAN（局域网）覆盖一栋楼或校园范围',
  'WAN': 'WAN（广域网）覆盖跨地域范围',
  'MAN': 'MAN（城域网）覆盖城市范围',
  'PAN': 'PAN（个人局域网）覆盖个人范围，如蓝牙',

  // 数据类型
  'double大小': 'double 类型大小固定为 8 字节，不是"浮动"的',
  'int范围': 'int 类型的取值范围是有限的（-2³¹ ~ 2³¹-1），不是无限的',
  'bool大小': 'bool 类型占用 1 字节内存',
  'char范围': 'char 类型有 256 种取值（-128~127 或 0~255）',

  // 标识符
  '标识符规则': '标识符只能由字母、数字、下划线组成，不能以数字开头，不能是关键字',
  '大小写敏感': 'C++ 标识符严格区分大小写：ABC 和 abc 是两个不同的标识符',
  '下划线开头': '以下划线开头的标识符在 C++ 中是合法的',
  '减号': '变量名不能包含减号（-），减号是运算符',
  '空格': '变量名不能包含空格',
  '关键字': 'C++ 关键字（如 int, for, while, if）有特殊含义，不能用作变量名',
  'main': 'main 不是关键字，是程序入口函数名',
  'max': 'max 是标准库函数名，不是关键字，但用作变量名会冲突',

  // 运算符
  '赋值vs比较': '赋值 = 和比较 == 容易混淆。if(x=1) 是赋值而非比较，值恒为真',
  '短路求值': '&& 遇假即停，|| 遇真即停，后面的表达式可能不会执行',
  '逻辑与或优先级': '&& 优先级高于 ||，A || B && C 等价于 A || (B && C)',
  '整数除法': '整数除法会截断小数部分（向零取整），如 7/2=3 而非 3.5',
  '取模': '取模 % 要求操作数必须为整数，结果符号与左操作数相同',
  '逗号表达式': '逗号表达式从左到右依次求值，整个表达式的值是最后一个子表达式的值',
  '前置后置自增': '前置 ++i 先增后用（表达式的值是自增后的值），后置 i++ 先用后增（表达式的值是自增前的值）',
  '隐式转换': 'C++ 会自动进行隐式类型转换：int 与 double 运算时，int 提升为 double',
  '连续比较': 'C++ 不支持连续比较运算符，a <= x <= b 会先算 a <= x 得到 0 或 1',

  // 循环
  'continue': 'continue 跳过本次循环剩余语句，直接进入下一轮判断',
  'break': 'break 跳出当前所在的最内层循环或 switch',
  '循环终值': '循环结束后，循环变量的值是使循环条件为假的第一个值',
  '死循环': '死循环因为循环条件永远为真，或循环体内修改循环变量的方式导致条件无法变为假',

  // 字符/ASCII
  'ASCII码': '字符运算本质是 ASCII 码值运算，\'0\'=48, \'A\'=65, \'a\'=97',
  'char转int': '字符强制转为 int 后得到其 ASCII 码值',
  '字符串结束符': 'C 风格字符串以 \'\\0\' 结尾，影响数组长度',
  '字符vs字符串': "'A' 是字符常量（占1字节），\"A\" 是字符串常量（占2字节，含结尾符）",

  // 浮点数
  '浮点精度': '浮点数存在二进制表示误差，0.1+0.2 ≠ 0.3，这是 IEEE 754 的固有特性',
  '浮点比较': '== 可以用于浮点数比较，但由于精度问题结果可能不符合预期',

  // 数组
  '数组下标': '数组下标从 0 开始，int arr[5] 的合法下标范围是 0~4',
  '二维数组连续': '在 C++ 中，无论是几维数组，在内存中都是按序连续存放的',

  // 排序
  '排序稳定性': '冒泡排序和插入排序是稳定的，选择排序是不稳定的',
  '选择排序复杂度': '选择排序无论何种情况，比较次数均为 N(N-1)/2',

  // 函数
  '函数参数': '函数可以没有参数（无参函数），也可以有默认参数',
  'main调用': 'C++ 标准规定 main 函数不应被其他函数调用',
  '递归终止': '递归函数必须有终止条件（基准情况），否则会无限递归',
  '值传递': 'C++ 默认是按值传递，形参是实参的副本，修改形参不影响实参',
  '引用传递': '引用传递是变量的别名，修改引用即修改实参',

  // 指针
  '指针大小': '指针的大小取决于操作系统位数（64位下为8字节），与指向内容类型无关',
  '多级指针': '指针变量可以指向任何类型，包括另一个指针变量（多级指针）',
  '指针算术': '指针加减整数是按指向类型的大小移动，如 int* p; p+1 移动4字节',

  // 位运算
  '异或交换': '异或交换：a^=b; b^=a; a^=b; 可以交换两个变量的值，不需要临时变量',
  '异或性质': '异或运算满足交换律和结合律，a^a=0, a^0=a',

  // 未定义行为
  '未定义行为': '某些写法在 C++ 中是未定义行为，不同编译器可能给出不同结果',
};

// ============================================================
// 判断题易混概念知识库
// ============================================================
const JUDGE_PITFALL_RULES = [
  { keywords: [/输入设备|输出设备|传感器/], pitfall: '输入设备负责采集信息传入计算机，输出设备负责呈现结果。传感器属于输入设备。' },
  { keywords: [/操作系统|编译器/], pitfall: '操作系统负责管理硬件和软件资源，编译器负责将源代码翻译成目标代码，两者职能不同。' },
  { keywords: [/CPU|处理器|内存/], pitfall: 'CPU 负责运算和判断，内存负责存储数据，两者职能不同。' },
  { keywords: [/优先级|运算顺序/], pitfall: 'C++ 运算符优先级：算术(* / %) > 关系(> <) > 逻辑(&& ||) > 赋值(=)。' },
  { keywords: [/取模|%/, /余数/], pitfall: '取模运算 % 要求操作数必须为整数，结果符号与左操作数相同。' },
  { keywords: [/整除/, /\/\s*\d/], pitfall: '整数除法会截断小数部分（向零取整），如 7/2=3。若需保留小数，至少一个操作数应为浮点数。' },
  { keywords: [/逗号表达式/], pitfall: '逗号表达式从左到右依次求值，整个表达式的值是最后一个子表达式的值。' },
  { keywords: [/\+\+/, /自增/, /自减/], pitfall: '前置 ++i 先增后用，后置 i++ 先用后增。在复杂表达式中混用容易出错。' },
  { keywords: [/赋值.*比较|==.*=/, /=.*==/], pitfall: '赋值 = 和比较 == 容易混淆。if(x=1) 是赋值而非比较，值恒为真。' },
  { keywords: [/短路|&&/, /\|\|/], pitfall: '&& 遇假即停，|| 遇真即停。短路求值意味着后面的表达式可能不会执行。' },
  { keywords: [/隐式转换|类型转换|提升/], pitfall: 'C++ 会自动进行隐式类型转换：int 与 double 运算时，int 提升为 double。' },
  { keywords: [/循环.*次数|执行.*次/], pitfall: '循环次数 = 终值 - 初值（< 时）或 终值 - 初值 + 1（<= 时）。注意 < 和 <= 差一次。' },
  { keywords: [/continue/, /跳过/], pitfall: 'continue 跳过本次循环剩余语句，直接进入下一轮判断；break 直接跳出整个循环。' },
  { keywords: [/break/, /跳出/], pitfall: 'break 跳出当前所在的最内层循环或 switch，不影响外层循环。' },
  { keywords: [/死循环|无限循环/], pitfall: '死循环通常因为循环条件永远为真，或循环体内修改循环变量的方式导致条件无法变为假。' },
  { keywords: [/循环变量.*终值|循环后.*i/], pitfall: '循环结束后，循环变量的值是使循环条件为假的第一个值。如 for(i=0;i<10;i++) 结束后 i=10。' },
  { keywords: [/标识符|变量名|命名/], pitfall: '标识符只能由字母、数字、下划线组成，不能以数字开头，不能是关键字。C++ 严格区分大小写。' },
  { keywords: [/关键字|保留字/], pitfall: 'C++ 关键字（如 int, for, while, if）有特殊含义，不能用作变量名。但 main、max 等不是关键字。' },
  { keywords: [/数位|个位|十位|百位/], pitfall: '取个位用 N%10，去个位用 N/10。注意区分 % 和 / 在数位提取中的不同作用。' },
  { keywords: [/回文|反转/], pitfall: '数字反转：每次取个位 (N%10) 拼接到新数末尾 (new = new*10 + N%10)，同时 N/=10。' },
  { keywords: [/浮点|精度|0\.1|0\.2|误差/], pitfall: '浮点数存在二进制表示误差，0.1+0.2 ≠ 0.3，这是 IEEE 754 的固有特性，不是 bug。' },
  { keywords: [/printf/, /格式化/], pitfall: 'printf 格式化占位符必须与参数类型匹配：%d 对应 int，%f 对应 double，%s 对应字符串。' },
  { keywords: [/scanf/, /输入/], pitfall: 'scanf 需要传地址（&变量名），忘记 & 会导致未定义行为。scanf 以空格/换行作为分隔符。' },
  { keywords: [/指针/, /地址/], pitfall: '指针变量中存储的是内存地址，指针的大小取决于操作系统位数，与指向内容类型无关。' },
  { keywords: [/递归/, /终止/], pitfall: '递归函数必须有终止条件（基准情况），否则会无限递归导致栈溢出。' },
  { keywords: [/排序/, /稳定/], pitfall: '冒泡排序和插入排序是稳定的，选择排序是不稳定的。稳定性指相等元素排序后相对位置不变。' },
  { keywords: [/引用/, /别名/], pitfall: '引用是变量的别名，定义时必须初始化，之后不可更改绑定的对象。修改引用即修改实参。' },
  { keywords: [/数组/, /连续/], pitfall: '在 C++ 中，无论是几维数组，在内存中都是按序连续存放的。' },
  { keywords: [/bool/, /布尔/], pitfall: 'bool 类型可以隐式转换为 int（true→1, false→0），也可以从 int 隐式转换（非0→true, 0→false）。' },
  { keywords: [/ASCII/, /字符/], pitfall: '字符运算本质是 ASCII 码值运算，\'0\'=48, \'A\'=65, \'a\'=97。字符加减是码值加减。' },
  { keywords: [/位运算/, /异或/, /移位/], pitfall: '异或运算满足 a^a=0, a^0=a；左移 n 位等价于乘以 2ⁿ，右移 n 位等价于除以 2ⁿ。' },
  { keywords: [/未定义行为/, /undefined/], pitfall: '未定义行为的结果取决于编译器实现，不同编译器可能给出不同结果，应避免依赖未定义行为。' },
  { keywords: [/函数/, /参数/, /返回值/], pitfall: '函数可以没有参数（无参函数），也可以没有返回值（void 函数）。函数名是必须的。' },
  { keywords: [/结构体/, /struct/], pitfall: 'C++ 支持结构体嵌套定义，struct 中可以包含不同类型的成员变量。' },
  { keywords: [/文件/, /流/, /ifstream/, /ofstream/], pitfall: 'ifstream 用于读文件，ofstream 用于写文件，fstream 可同时读写。注意区分 cout 和文件流。' },
];

// ============================================================
// 工具函数
// ============================================================

function isNumericOption(text) {
  return /^-?\d+(\.\d+)?$/.test(text.trim());
}

function isCodeOption(text) {
  return /[=+\-*/%<>!&|^~]{2,}|%|\/=|\+\+|--|<<|>>|\(\)|\[\]|cout|cin|printf|scanf|for|while|if|int |void |return|char |double |bool /.test(text);
}

function extractNumericValues(text) {
  const values = [];
  const regex = /(?:得到|结果[是为]|等于|值为|即|为)\s*(-?\d+\.?\d*)/g;
  let m;
  while ((m = regex.exec(text)) !== null) values.push(m[1]);
  const eqRegex = /=\s*(-?\d+\.?\d*)/g;
  while ((m = eqRegex.exec(text)) !== null) values.push(m[1]);
  return values;
}

/**
 * 从 explanation 模板字符串中提取核心解析文本
 */
function extractCoreAnalysis(explanationLines) {
  let inAnalysis = false;
  let analysisText = [];
  for (const line of explanationLines) {
    if (/\*\*解析[：:]\*\*/.test(line)) {
      inAnalysis = true;
      continue;
    }
    if (inAnalysis) {
      if (/^\s*-\s*\*\*[A-F]/.test(line)) break;
      analysisText.push(line.trim());
    }
  }
  return analysisText.filter(t => t).join(' ');
}

/**
 * 从 explanation 中提取正确答案字母
 */
function extractAnswerLetter(explanationLines) {
  for (const line of explanationLines) {
    const m = line.match(/\*\*答案[：:]\s*([A-F])\*\*/);
    if (m) return m[1];
  }
  return null;
}

/**
 * 解析选项行
 */
function parseOptionLine(line) {
  const match = line.match(/^\s*-\s*\*\*([A-F])\s+([^*]*(?:\*[^*])*)\*\*[^：:]*[：:]\s*(.+)$/);
  if (!match) return null;
  return {
    letter: match[1],
    optText: match[2].trim(),
    reason: match[3].trim(),
  };
}

/**
 * 检查是否包含模板套话
 */
function hasTemplatePhrase(reasonText) {
  return TEMPLATE_PATTERNS.some(p => p.test(reasonText));
}

/**
 * 为正确选项生成解释（替换"正确答案。"）
 */
function generateCorrectExplanation(optText, coreAnalysis) {
  if (coreAnalysis && coreAnalysis.length > 5) {
    const short = coreAnalysis.length > 80 ? coreAnalysis.substring(0, 80) + '…' : coreAnalysis;
    return `正确。${short}`;
  }
  return '正确。与题意完全吻合。';
}

/**
 * 为错误选项生成有针对性的解释
 * 核心原则：解释"为什么有人会选它"以及"它具体错在哪里"
 */
function generateWrongExplanation(optText, correctOptText, coreAnalysis, questionText, answerLetter, optLetter, options) {
  const opt = optText.trim();
  const correct = correctOptText ? correctOptText.trim() : '';

  // === 策略1：纯数字选项 ===
  if (isNumericOption(opt)) {
    return generateNumericExplanation(opt, correct, coreAnalysis);
  }

  // === 策略2：代码/表达式选项 ===
  if (isCodeOption(opt)) {
    return generateCodeExplanation(opt, correct, coreAnalysis);
  }

  // === 策略3：概念陈述选项 ===
  return generateConceptExplanation(opt, correct, coreAnalysis, questionText);
}

/**
 * 纯数字选项：推断错误计算路径
 * 区分"计算题"（需要推理）和"知识题"（需要记忆）
 */
function generateNumericExplanation(opt, correct, coreAnalysis) {
  const correctNum = parseFloat(correct);
  const optNum = parseFloat(opt);

  if (!isNaN(correctNum) && !isNaN(optNum) && correctNum !== optNum) {
    // 判断是否为知识性题目（年份、代数等，通常数字较大且不涉及计算过程）
    const isKnowledgeQuestion = coreAnalysis.length > 0 && (
      /推出|发布|成立|首次|年代|代|年/.test(coreAnalysis) ||
      /字节|KB|MB|GB|TB/.test(coreAnalysis) ||
      correctNum > 100  // 大数字通常是知识题
    );

    if (isKnowledgeQuestion) {
      // 知识题：直接引用核心解析
      if (coreAnalysis.length > 10) {
        const short = coreAnalysis.length > 80 ? coreAnalysis.substring(0, 80) + '…' : coreAnalysis;
        return `${short}`;
      }
      return `正确答案为 ${correct}。`;
    }

    // 计算题：推断错误计算路径
    const diff = optNum - correctNum;
    const absDiff = Math.abs(diff);

    if (absDiff === 1 && correctNum > 0 && correctNum < 100) {
      return `可能差一错误（off-by-one），如循环条件用了 <= 而非 <。正确结果为 ${correct}。`;
    }
    if (optNum === correctNum * 2 && correctNum < 100) {
      return `可能将结果翻倍计算了，如多循环了一轮或重复累加。正确结果为 ${correct}。`;
    }
    if (optNum === correctNum / 2 && correctNum < 100) {
      return `可能只计算了一半的结果，如遗漏了某次循环或只取了部分数据。正确结果为 ${correct}。`;
    }
    if (coreAnalysis.length > 10) {
      const short = coreAnalysis.length > 60 ? coreAnalysis.substring(0, 60) + '…' : coreAnalysis;
      return `计算有误。${short}`;
    }
    return `计算结果不正确，正确结果为 ${correct}。`;
  }

  // 无法推断具体错误路径时，引用核心解析
  if (coreAnalysis.length > 10) {
    const short = coreAnalysis.length > 60 ? coreAnalysis.substring(0, 60) + '…' : coreAnalysis;
    return `计算有误。${short}`;
  }
  return '计算结果不正确。';
}

/**
 * 代码选项：分析代码行为差异
 */
function generateCodeExplanation(opt, correct, coreAnalysis) {
  // 常见代码差异模式
  const w = opt.replace(/[`'\"]/g, '').trim();
  const c = correct.replace(/[`'\"]/g, '').trim();

  if (w.includes('%') && c.includes('/')) return '应使用除法 / 而非取模 %，两者运算结果不同。';
  if (w.includes('/') && c.includes('%')) return '应使用取模 % 而非除法 /，注意区分整除和取余。';
  if (w.includes('i++') && c.includes('i+=')) return '递增方式不正确，应使用复合赋值运算符。';
  if (w.includes('void') && c.includes('int')) return '返回值类型应为 int 而非 void。';
  if (w.includes('int') && c.includes('void')) return '返回值类型应为 void 而非 int。';
  if (w.includes('&&') && c.includes('||')) return '应使用逻辑或 || 而非逻辑与 &&，两者语义不同。';
  if (w.includes('||') && c.includes('&&')) return '应使用逻辑与 && 而非逻辑或 ||，两者语义不同。';
  if (w.includes('==') && !w.includes('===') && c.includes('=') && !c.includes('==')) return '混淆了赋值 = 和比较 ==，两者功能完全不同。';
  if (w.includes('=') && !w.includes('==') && c.includes('==')) return '混淆了比较 == 和赋值 =，条件判断应使用 ==。';

  // 基于核心解析给出提示
  if (coreAnalysis.length > 10) {
    const short = coreAnalysis.length > 80 ? coreAnalysis.substring(0, 80) + '…' : coreAnalysis;
    return `代码逻辑有误。${short}`;
  }
  return '代码逻辑与正确答案不符。';
}

/**
 * 概念选项：基于 C++ 知识库生成解释
 */
function generateConceptExplanation(opt, correct, coreAnalysis, questionText) {
  const optLower = opt.toLowerCase();
  const qLower = (questionText + ' ' + coreAnalysis).toLowerCase();

  // 计算机基础
  if (/输入设备|输出设备|传感器/.test(opt)) {
    if (/传感器/.test(opt)) return '传感器属于输入设备，用于采集物理世界的信息。';
    if (/输入/.test(opt) && /输出/.test(qLower)) return '混淆了输入设备与输出设备的职能。';
    if (/输出/.test(opt) && /输入/.test(qLower)) return '混淆了输出设备与输入设备的职能。';
    return '对输入/输出设备的分类理解有误。';
  }

  if (/编译|编辑|调试|保存/.test(opt) && /编译|可执行|源代码/.test(qLower)) {
    if (/编辑/.test(opt)) return '编辑是修改源代码，不是生成可执行代码。';
    if (/保存/.test(opt)) return '保存是存储文件，不是生成可执行代码。';
    if (/调试/.test(opt)) return '调试是查找错误，不是生成可执行代码。';
  }

  if (/光盘|硬盘|内存|U盘|U 盘/.test(opt) && /存储|磁场|介质/.test(qLower)) {
    if (/光盘/.test(opt)) return '光盘是光存储介质，采用激光读写，不受磁场影响。';
    if (/硬盘/.test(opt)) return '硬盘是磁存储介质，利用磁性记录数据，易受强磁场干扰。';
    return '对不同存储介质的工作原理理解有误。';
  }

  // 标识符
  if (/变量|标识符|命名|关键字/.test(opt) && /变量|标识符|命名|关键字/.test(qLower)) {
    if (/数字.*开头|开头.*数字/.test(opt)) return 'C++ 标识符不能以数字开头。';
    if (/汉语拼音|拼音/.test(opt)) return '汉语拼音可以作为合法的变量名。';
    if (/大小写/.test(opt)) return 'C++ 标识符严格区分大小写。';
    if (/减号|连字符/.test(opt)) return '变量名不能包含减号（-），但可以包含下划线（_）。';
    if (/空格/.test(opt)) return '变量名不能包含空格。';
    if (/下划线/.test(opt)) return '下划线开头的标识符在 C++ 中是合法的。';
    return '对标识符命名规则理解有误。';
  }

  // 数据类型
  if (/int|double|float|char|bool/.test(opt) && /数据类型|类型|字节|范围/.test(qLower)) {
    if (/浮动/.test(opt)) return 'double 类型大小固定为 8 字节，并非浮动。';
    if (/无限/.test(opt)) return 'int 类型的取值范围是有限的（-2³¹ ~ 2³¹-1）。';
    return '对数据类型的属性理解有误。';
  }

  // 运算符
  if (/运算符|优先级|表达式/.test(opt) && /运算符|优先级|表达式/.test(qLower)) {
    if (/赋值|比较|==|=/.test(opt)) return '混淆了赋值运算符 = 和比较运算符 ==。';
    return '对运算符的用法或优先级理解有误。';
  }

  // 循环
  if (/循环|for|while|break|continue/.test(opt) && /循环|次数|输出|执行/.test(qLower)) {
    if (/continue/.test(opt)) return 'continue 跳过本次循环剩余语句，不影响循环次数。';
    if (/break/.test(opt)) return 'break 跳出当前循环，注意其作用范围。';
    if (/死循环|无限/.test(opt)) return '循环条件最终会变为假，不会形成死循环。';
    return '对循环执行过程的分析有误。';
  }

  // 条件/逻辑
  if (/条件|判断|if|逻辑|&&|\|\|/.test(opt) && /条件|判断|逻辑|德摩根|等价/.test(qLower)) {
    if (/&&|\|\|/.test(opt)) return '逻辑运算符 && 和 || 的语义和优先级不同，需仔细区分。';
    if (/德摩根/.test(qLower)) return '需要应用德摩根定律进行等价转换。';
    return '对条件表达式的逻辑关系理解有误。';
  }

  // 函数
  if (/函数|参数|返回值|递归|main/.test(opt) && /函数|参数|返回值|递归/.test(qLower)) {
    if (/必须.*参数|参数.*必须/.test(opt)) return '函数可以没有参数（无参函数）。';
    if (/main.*调用|调用.*main/.test(opt)) return 'C++ 标准规定 main 函数不应被其他函数调用。';
    if (/嵌套.*定义|定义.*嵌套/.test(opt)) return 'C++ 不支持在函数内定义函数（lambda 是另一种机制）。';
    if (/递归|终止/.test(opt)) return '递归函数必须有终止条件，否则会无限递归。';
    return '对函数的定义或调用规则理解有误。';
  }

  // 数组
  if (/数组|下标|越界|arr/.test(opt) && /数组|下标|越界|长度/.test(qLower)) {
    if (/arr\[5\]|下标.*n/.test(opt)) return '数组下标从 0 开始，int arr[5] 的合法下标范围是 0~4。';
    return '对数组的定义或访问规则理解有误。';
  }

  // 字符串/字符
  if (/字符串|string|字符|ASCII|\\0/.test(opt) && /字符串|字符|ASCII|长度/.test(qLower)) {
    if (/\\\\0|结束符|结尾/.test(opt)) return 'C 风格字符串以 \'\\0\' 结尾，影响数组长度。';
    if (/ASCII|编码|码值/.test(opt)) return '字符运算本质是 ASCII 码值运算。';
    return '对字符串或字符的处理方式理解有误。';
  }

  // 进制/补码
  if (/进制|二进制|八进制|十六进制|补码|原码|反码/.test(opt) && /进制|二进制|补码|转换/.test(qLower)) {
    if (/补码|原码|反码/.test(opt)) return '混淆了原码、反码、补码的表示方式。';
    return '对进制转换或补码表示的理解有误。';
  }

  // 位运算
  if (/位运算|按位|异或|移位|<<|>>|&|\||\^/.test(opt) && /位运算|按位|移位|异或/.test(qLower)) {
    if (/异或|\^/.test(opt)) return '对异或运算的性质或结果理解有误。';
    if (/移位|<<|>>/.test(opt)) return '对移位运算的方向或结果理解有误。';
    return '对位运算的规则或结果理解有误。';
  }

  // 排序
  if (/排序|冒泡|选择|插入|稳定/.test(opt) && /排序|稳定|复杂度/.test(qLower)) {
    if (/稳定/.test(opt)) return '对排序算法的稳定性判断有误。';
    return '对排序算法的特性理解有误。';
  }

  // 流程图
  if (/流程图|菱形|椭圆|矩形|平行四边形/.test(opt) && /流程图|图形|框/.test(qLower)) {
    if (/圆形|椭圆/.test(opt)) return '椭圆框表示开始/结束，不是处理或判断。';
    if (/矩形/.test(opt)) return '矩形框表示处理操作，不是判断。';
    if (/菱形/.test(opt)) return '菱形框表示判断/条件，不是处理。';
    if (/平行四边形/.test(opt)) return '平行四边形框表示输入/输出。';
    return '对流程图的基本图形含义理解有误。';
  }

  // 浮点数
  if (/浮点|精度|0\.1|0\.2|误差/.test(opt) && /浮点|精度|误差/.test(qLower)) {
    if (/bug|错误|缺陷/.test(opt)) return '这不是 C++ 的 bug，而是 IEEE 754 浮点数表示的固有特性。';
    if (/不能.*比较|只能.*整数/.test(opt)) return '== 可以用于浮点数比较，但由于精度问题结果可能不符合预期。';
    return '对浮点数精度问题的理解有误。';
  }

  // 未定义行为
  if (/未定义|undefined|不确定/.test(opt) && /未定义|表达式|修改/.test(qLower)) {
    return '对未定义行为的判断有误，不同编译器可能给出不同结果。';
  }

  // 指针
  if (/指针|地址|nullptr/.test(opt) && /指针|地址/.test(qLower)) {
    if (/只能.*基本|不能.*指针/.test(opt)) return '指针变量可以指向任何类型，包括另一个指针变量（多级指针）。';
    return '对指针的概念理解有误。';
  }

  // 通用回退：基于选项文本本身解释为什么错
  // 策略1：从知识库中查找与选项文本相关的条目（优先匹配更长的关键词）
  const knowledgeEntries = Object.entries(CPP_KNOWLEDGE)
    .sort((a, b) => b[0].length - a[0].length); // 按关键词长度降序排列
  const optNoSpace = opt.replace(/\s+/g, ''); // 去掉空格用于匹配
  for (const [key, value] of knowledgeEntries) {
    const keyNoSpace = key.replace(/\s+/g, '');
    if (opt.includes(key) || optNoSpace.includes(keyNoSpace) || (key.length > 1 && optNoSpace.toLowerCase().includes(keyNoSpace.toLowerCase()))) {
      return `${value}，此选项不是正确答案。`;
    }
  }

  // 策略2：引用核心解析
  if (coreAnalysis.length > 5) {
    const short = coreAnalysis.length > 60 ? coreAnalysis.substring(0, 60) + '…' : coreAnalysis;
    return `此说法不正确。${short}`;
  }

  return '此选项说法有误。';
}

/**
 * 为判断题生成针对性的易混概念
 */
function generateJudgePitfall(questionText, explanation, tags) {
  const merged = `${questionText} ${explanation}`.toLowerCase();

  for (const rule of JUDGE_PITFALL_RULES) {
    const matched = rule.keywords.some(kw => kw.test(merged));
    if (matched) return rule.pitfall;
  }

  return '注意区分相关概念的适用范围和边界条件。';
}

// ============================================================
// 文件处理 — L1/L2/L3（已有模板字符串格式）
// ============================================================

function processTemplateStringFile(filePath, level) {
  console.log(`\n处理: ${path.basename(filePath)}`);
  let content = fs.readFileSync(filePath, 'utf8');
  // 统一换行符：去掉 \r，避免正则匹配失败
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = content.split('\n');

  let modified = false;
  let fixCount = 0;
  let correctFixCount = 0;
  let zeroExplanationFixCount = 0;
  let mergedLineFixCount = 0;

  let inExplanation = false;
  let explanationStartLine = -1;
  let explanationLines = [];
  let currentQuestionText = '';
  let currentAnswer = null;
  let currentOptions = [];

  // 向上搜索题目信息
  function findQuestionContext(lineIdx) {
    let questionText = '';
    let answer = null;
    let options = [];

    for (let j = lineIdx - 1; j >= 0 && j > lineIdx - 60; j--) {
      const l = lines[j];

      if (!questionText) {
        const m = l.match(/question:\s*`(.{0,300})/);
        if (m) questionText = m[1];
      }

      if (answer === null) {
        const m = l.match(/answer:\s*(\d+)/);
        if (m) answer = parseInt(m[1]);
      }

      if (options.length === 0) {
        // 单行选项
        const m = l.match(/options:\s*\[(.+?)\]\s*,\s*$/);
        if (m) {
          // 提取选项文本（处理单引号和双引号）
          const optStr = m[1];
          options = [];
          const optRegex = /['"]([^'"]*?)['"]/g;
          let om;
          while ((om = optRegex.exec(optStr)) !== null) {
            options.push(om[1]);
          }
        }
        // 多行选项
        if (l.includes('options:') && options.length === 0) {
          let k = j + 1;
          while (k < lineIdx && !lines[k].includes('answer:')) {
            let om = lines[k].trim().match(/^['"](.+?)['"]/);
            if (om) options.push(om[1]);
            k++;
          }
        }
      }

      if (/^\{/.test(l.trim())) break;
    }

    return { questionText, answer, options };
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 尝试匹配纯字符串形式的 explanation (主要针对编程题，或部分未升级的选择题)
    const stringMatch = line.match(/^(\s*)explanation:\s*["'](.*)["'](,?)\s*$/);
    if (stringMatch) {
      const indent = stringMatch[1];
      let content = stringMatch[2];
      
      // 如果还没有 **解析：**，则添加
      if (!content.includes('**解析：**')) {
        // 防止内部的 反引号 或 ${ 破坏 JS 模板字符串语法
        content = content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
        let newExp = `\`\n${indent}**解析：**\n${indent}${content}\n${indent}\`${stringMatch[3]}`;
        lines[i] = `${indent}explanation: ${newExp}`;
        modified = true;
      }
      continue;
    }

    // 检测 explanation 块开始
    if (line.match(/explanation:\s*`/)) {
      inExplanation = true;
      explanationStartLine = i;
      explanationLines = [line];

      const ctx = findQuestionContext(i);
      currentQuestionText = ctx.questionText;
      currentAnswer = ctx.answer;
      currentOptions = ctx.options;
      continue;
    }

    if (inExplanation) {
      explanationLines.push(line);

      // 检测 explanation 块结束
      // 两种结束模式：1) 单独的 `, 行  2) **考点：** ...`,
      if (i > explanationStartLine && (line.match(/^\s*`,?\s*$/) || line.match(/`,\s*$/))) {
        inExplanation = false;

        const coreAnalysis = extractCoreAnalysis(explanationLines);
        const answerLetter = extractAnswerLetter(explanationLines);

        // 提取正确选项文本
        let correctOptText = null;
        if (currentAnswer !== null && currentOptions.length > currentAnswer) {
          correctOptText = currentOptions[currentAnswer];
        }

          // === 处理 L2 合并行格式 ===
          // 检测：如果整个 explanation 块中只有一行含有 `- **A`，且没有 `- **B`，说明四个选项合并在一行了
          let hasOptionA = false;
          let hasOptionB = false;
          let optionALineIdx = -1;
          for (let k = explanationStartLine + 1; k < i; k++) {
            if (/^\s*-\s*\*\*A\b/.test(lines[k])) { hasOptionA = true; optionALineIdx = k; }
            if (/^\s*-\s*\*\*B\b/.test(lines[k])) { hasOptionB = true; }
          }
          
          if (hasOptionA && !hasOptionB && currentOptions.length === 4) {
            const optLine = lines[optionALineIdx];
            const indentMatch = optLine.match(/^(\s*)-/);
            const indent = indentMatch ? indentMatch[1] : '            ';
            
            // 拆分为4个独立选项行
              const optionLetters = ['A', 'B', 'C', 'D'];
              let newLines = [];
              for (let oi = 0; oi < 4; oi++) {
                const letter = optionLetters[oi];
                const optText = currentOptions[oi];
                const isCorrect = currentAnswer === oi;
                // 截断过长选项文本，同时转义反引号
                const safeOptText = optText.length > 40 ? optText.substring(0, 40) + '...' : optText;

                if (isCorrect) {
                  const reason = generateCorrectExplanation(safeOptText, coreAnalysis);
                  newLines.push(`${indent}- **${letter} ${safeOptText}**：${reason}`);
                } else {
                  const reason = generateWrongExplanation(
                    safeOptText, correctOptText, coreAnalysis,
                    currentQuestionText, answerLetter, letter, currentOptions
                  );
                  newLines.push(`${indent}- **${letter} ${safeOptText}**：错误。${reason}`);
                }
              }
            lines[optionALineIdx] = newLines.join('\n');
            mergedLineFixCount++;
            modified = true;
          }

        // === 逐行修复选项分析 ===
        let blockModified = false;
        for (let k = explanationStartLine + 1; k < i; k++) {
          const optLine = lines[k];
          // 跳过已处理的合并行
          if (optLine.includes('\n')) continue;

          const parsed = parseOptionLine(optLine);
          if (!parsed) continue;

          const isCorrect = parsed.letter === answerLetter;
          let newReason = parsed.reason;

          // 1. 修复正确选项零解释
          if (isCorrect && CORRECT_ZERO_EXPLANATION.test(newReason)) {
            newReason = generateCorrectExplanation(parsed.optText, coreAnalysis);
            correctFixCount++;
          }

          // 2. 剥离带有有效解析的前缀（主要针对 L2/L3 的“错误。计算有误。XXXX”或“错误。代码逻辑有误。XXXX”）
          let prefixStripped = false;
          if (!isCorrect) {
            const prefixRegex = /^错误[。，、]\s*(?:计算有误|代码逻辑有误|此选项说法有误|此说法不正确|此说法有误|计算结果不正确)[。，、]\s*(.+)$/;
            const prefixMatch = newReason.match(prefixRegex);
            if (prefixMatch) {
              const detail = prefixMatch[1].trim();
              // 如果后面带有的内容足够长，并且本身不是纯粹的零解释/套话，就安全剥离前缀并保留后面的内容
              if (detail.length > 3 && !hasTemplatePhrase(detail) && !WRONG_ZERO_EXPLANATION.test(detail)) {
                newReason = `错误。${detail}`;
                prefixStripped = true;
                fixCount++;
              }
            }
          }

          // 3. 修复错误选项零解释（仅写"错误。"）
          if (!isCorrect && !prefixStripped && WRONG_ZERO_EXPLANATION.test(newReason)) {
            const generated = generateWrongExplanation(
              parsed.optText, correctOptText, coreAnalysis,
              currentQuestionText, answerLetter, parsed.letter, currentOptions
            );
            newReason = `错误。${generated}`;
            zeroExplanationFixCount++;
          }

          // 4. 修复模板套话
          if (!isCorrect && !prefixStripped && hasTemplatePhrase(newReason)) {
            let cleanReason = newReason.replace(/^错误[。，、]\s*/, '');
            const generated = generateWrongExplanation(
              parsed.optText, correctOptText, coreAnalysis,
              currentQuestionText, answerLetter, parsed.letter, currentOptions
            );
            newReason = `错误。${generated}`;
            fixCount++;
          }

          // 替换行
          if (newReason !== parsed.reason) {
            const indent = optLine.match(/^(\s*)/)[1];
            // 保持选项文本原样（optText已在模板字符串上下文中，反引号已被转义）
            lines[k] = `${indent}- **${parsed.letter} ${parsed.optText}**：${newReason}`;
            blockModified = true;
          }
        }

        if (blockModified) modified = true;
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`  ✅ 修复了 ${fixCount} 个模板套话，${correctFixCount} 个正确选项补充解释，${zeroExplanationFixCount} 个零解释错误选项，${mergedLineFixCount} 个合并行拆分`);
  } else {
    console.log(`  无需修改`);
  }

  return { fixCount, correctFixCount, zeroExplanationFixCount, mergedLineFixCount };
}

// ============================================================
// 文件处理 — L4（纯字符串升级为结构化解析）
// ============================================================

function processL4File(filePath) {
  console.log(`\n处理: ${path.basename(filePath)}`);
  let content = fs.readFileSync(filePath, 'utf8');
  // 统一换行符
  content = content.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  const lines = content.split('\n');

  let modified = false;
  let upgradeCount = 0;

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    // 尝试匹配模板字符串形式的 explanation (选择题/判断题)
    const match = line.match(/^(\s*)explanation:\s*`([^`]*)`/);
    
    // 尝试匹配纯字符串形式的 explanation (主要针对编程题，或部分未升级的选择题)
    const stringMatch = line.match(/^(\s*)explanation:\s*["'](.*)["'],?\s*$/);
    
    if (stringMatch) {
      const indent = stringMatch[1];
      let content = stringMatch[2];
      
      // 如果还没有 **解析：**，则添加
      if (!content.includes('**解析：**')) {
        let newExp = `\`**解析：**\n${indent}${content}\``;
        if (line.endsWith(',')) {
          newExp += ',';
        }
        lines[i] = `${indent}explanation: ${newExp}`;
        modified = true;
        // 这里只是转换格式，因为编程题没有选项，不需要逐行分析，直接跳过
        i++;
        continue;
      }
    }

    if (!match) {
      i++;
      continue;
    }
      const indent = match[1];
      const explanationText = match[2];

      // 向上搜索题目信息
      let questionText = '';
      let answer = null;
      let options = [];
      let type = null;
      let tags = '';

      for (let j = i - 1; j >= 0 && j > i - 50; j--) {
        const l = lines[j].trim();

        if (!type) {
          const m = l.match(/type:\s*["'](\w+)["']/);
          if (m) type = m[1];
        }
        if (answer === null) {
          const m = l.match(/answer:\s*(\d+)/);
          if (m) answer = parseInt(m[1]);
        }
        if (!questionText) {
          const m = l.match(/question:\s*`(.{0,300})/);
          if (m) questionText = m[1];
        }
        if (options.length === 0) {
          const m = l.match(/options:\s*\[(.+?)\]/);
          if (m) {
            const optStr = m[1];
            const optRegex = /["']([^"']*?)["']/g;
            let om;
            while ((om = optRegex.exec(optStr)) !== null) {
              options.push(om[1]);
            }
          }
        }
        if (!tags) {
          const m = l.match(/tags:\s*\[([^\]]*)\]/);
          if (m) tags = m[1];
        }

        if (/^\{/.test(l)) break;
      }

      // 只升级选择题和判断题
      if (!type || type === 'programming') { i++; continue; }

      const answerLetter = answer !== null ? ANSWER_LETTERS[answer] : '?';

      // 构建结构化解析
      // 转义反引号（模板字符串中反引号必须转义）
      const safeExplanation = explanationText.replace(/`/g, '\\`');
      let newExplanation = '';
      if (type === 'single' || type === 'multiple') {
        newExplanation = `${indent}explanation: \`**答案：${answerLetter}**\n`;
        newExplanation += `${indent}\n`;
        newExplanation += `${indent}**解析：**\n`;
        newExplanation += `${indent}${safeExplanation}\n`;
        newExplanation += `${indent}\n`;

        // 生成选项逐项分析
        if (options.length > 0) {
          for (let oi = 0; oi < options.length; oi++) {
            const letter = ANSWER_LETTERS[oi];
            const optText = options[oi];
            // 转义选项文本中的反引号
            const safeOptText = (optText.length > 40 ? optText.substring(0, 40) + '...' : optText).replace(/`/g, '\\`');
            const isCorrect = answer === oi;

            if (isCorrect) {
              const reason = generateCorrectExplanation(safeOptText, safeExplanation);
              newExplanation += `${indent}- **${letter} ${safeOptText}**：${reason}\n`;
            } else {
              const correctOptText = answer !== null && options.length > answer ? options[answer] : '';
              const reason = generateWrongExplanation(
                safeOptText, correctOptText, safeExplanation,
                questionText, answerLetter, letter, options
              );
              newExplanation += `${indent}- **${letter} ${safeOptText}**：错误。${reason}\n`;
            }
          }
          newExplanation += `${indent}\n`;
        }

        // 考点
        const tagNames = tags ? tags.replace(/["']/g, '').split(/,\s*/).filter(t => t && !t.includes('题') && !t.includes('GESP')).join('、') : '';
        newExplanation += `${indent}**考点：** ${tagNames}\`,`;
      } else if (type === 'judge') {
        newExplanation = `${indent}explanation: \`**答案：${answerLetter}**\n`;
        newExplanation += `${indent}\n`;
        newExplanation += `${indent}**解析：**\n`;
        newExplanation += `${indent}${safeExplanation}\n`;
        newExplanation += `${indent}\n`;

        // 判断题易混概念
        const pitfall = generateJudgePitfall(questionText, safeExplanation, tags);
        newExplanation += `${indent}**易混概念：** ${pitfall}\n`;
        newExplanation += `${indent}\n`;

        const tagNames = tags ? tags.replace(/["']/g, '').split(/,\s*/).filter(t => t && !t.includes('题') && !t.includes('GESP')).join('、') : '';
        newExplanation += `${indent}**考点：** ${tagNames}\`,`;
      }

      if (newExplanation) {
        lines[i] = newExplanation;
        modified = true;
        upgradeCount++;
      }
    i++;
  }

  if (modified) {
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`  ✅ 升级了 ${upgradeCount} 道题的结构化解析`);
  } else {
    console.log(`  无需修改`);
  }

  return { upgradeCount };
}

// ============================================================
// 主入口
// ============================================================

const target = process.argv[2];
if (!target) {
  console.log('用法: node scripts/rewrite-option-analysis.cjs <文件路径或目录> [--level 1|2|3|4]');
  process.exit(1);
}

// 解析 level 参数
let level = null;
const levelIdx = process.argv.indexOf('--level');
if (levelIdx !== -1 && process.argv[levelIdx + 1]) {
  level = parseInt(process.argv[levelIdx + 1]);
}

const stat = fs.statSync(target);

if (stat.isDirectory()) {
  // 自动检测 level
  if (!level) {
    if (target.includes('level1')) level = 1;
    else if (target.includes('level2')) level = 2;
    else if (target.includes('level3')) level = 3;
    else if (target.includes('level4')) level = 4;
  }

  const ext = level === 4 ? '.js' : '-l' + level + '.js';
  const files = fs.readdirSync(target)
    .filter(f => f.endsWith(ext) && !f.includes('shared'))
    .sort();

  let totalFix = 0, totalCorrect = 0, totalZero = 0, totalMerged = 0, totalUpgrade = 0;

  for (const file of files) {
    const { fixCount, correctFixCount, zeroExplanationFixCount, mergedLineFixCount } = processTemplateStringFile(path.join(target, file), level);
    totalFix += fixCount;
    totalCorrect += correctFixCount;
    totalZero += zeroExplanationFixCount;
    totalMerged += mergedLineFixCount;
  }

  console.log(`\n========== 总计 ==========`);
  if (level === 4) {
    console.log(`升级了 ${totalUpgrade} 道题的结构化解析`);
  } else {
    console.log(`修复了 ${totalFix} 个模板套话，${totalCorrect} 个正确选项补充解释，${totalZero} 个零解释错误选项，${totalMerged} 个合并行拆分`);
  }
} else {
  // 单文件
  if (!level) {
    if (target.includes('level1')) level = 1;
    else if (target.includes('level2')) level = 2;
    else if (target.includes('level3')) level = 3;
    else if (target.includes('level4')) level = 4;
    else level = 1; // 默认
  }

  if (level === 4) {
    processTemplateStringFile(target);
  } else {
    processTemplateStringFile(target, level);
  }
}
