/**
 * 修复 L2/L3 试卷选项分析中的空话套话
 *
 * 问题：选项逐项分析中大量使用模板化套话，如：
 * - "与题目要求不符，请对照正确解析重新理解"（最空洞）
 * - "该数值与正确计算结果不符，请重新验算"（等于没说）
 * - "该代码逻辑与题目要求不符，请逐步推演"（缺乏针对性）
 * - 关键词误匹配（如"拓扑排序"匹配到"排序"输出排序稳定性解释）
 * - 正确选项只写"正确答案。"零解释
 *
 * 修复策略：
 * 1. 提取每题的解析核心文本
 * 2. 对错误选项：基于解析文本和选项内容生成有针对性的原因
 * 3. 对正确选项：补充解析摘要
 * 4. 修复关键词误匹配
 *
 * 用法：node scripts/fix-option-analysis-l2l3.cjs <文件或目录>
 */

const fs = require('fs');
const path = require('path');

const ANSWER_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// 所有需要替换的模板套话（按出现频率排序）
const TEMPLATE_PHRASES = [
  '与题目要求不符，请对照正确解析重新理解',
  '该数值与正确计算结果不符，请重新验算',
  '该代码逻辑与题目要求不符，请逐步推演',
  '取模运算的结果需要仔细计算，注意运算符优先级',
  '进制转换结果有误，请重新按权展开计算',
  '位运算结果计算有误，请逐步推演每一位的运算',
  '数组下标从 0 开始，请仔细验证下标范围',
  "字符的 ASCII 码值需要查表确认，'0'=48, 'A'=65, 'a'=97",
  '不同排序算法的稳定性不同，冒泡/插入稳定，选择不稳定',
  '递归必须有终止条件，请检查递归出口是否正确',
  '混淆了原码、反码、补码的转换规则，注意负数补码是取反加一',
  '需要验证循环条件是否最终会变为假',
  'C++ 对某些写法可能不会报错，而是产生隐式转换或未定义行为',
  'C++ 对某些写法可能不会报错，而是产生隐式转换',
];

// 需要特殊处理的关键词误匹配（选项内容 → 不应触发的模板 → 正确解释方向）
const KEYWORD_MISMATCH_FIXES = [
  {
    // "拓扑排序"被匹配到"排序"关键词，输出了排序稳定性解释
    badTemplate: '不同排序算法的稳定性不同，冒泡/插入稳定，选择不稳定',
    optionKeywords: ['拓扑', 'BFS', 'DFS', '最短路', '搜索', '遍历'],
    replacement: '此选项描述的算法/方法与题目考查点不符',
  },
  {
    // "字符数组"被匹配到"字符"关键词，输出了ASCII码表提示
    badTemplate: "字符的 ASCII 码值需要查表确认，'0'=48, 'A'=65, 'a'=97",
    optionKeywords: ['数组', '字符串', '\\0', '长度', '初始化', '赋值'],
    replacement: '此选项对字符数组/字符串的理解有误',
  },
  {
    // "进制转换"选项中正确的描述也被标为"进制转换结果有误"
    badTemplate: '进制转换结果有误，请重新按权展开计算',
    optionKeywords: ['正确', '可以', '方便', '每'],
    replacement: '此说法实际是正确的，不应作为错误选项',
  },
];

/**
 * 从 explanation 模板字符串中提取核心解析文本
 * 即 **解析：** 和第一个选项行之间的内容
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
      if (/^\s*-\s*\*\*[A-F]/.test(line)) {
        break; // 到达选项分析行，停止
      }
      analysisText.push(line.trim());
    }
  }
  return analysisText.filter(t => t).join(' ');
}

/**
 * 从 explanation 中提取正确答案的字母和选项文本
 */
function extractAnswerInfo(explanationLines) {
  let answerLetter = null;
  let correctOptText = null;

  for (const line of explanationLines) {
    // 提取答案字母
    const ansMatch = line.match(/\*\*答案[：:]\s*([A-F])\*\*/);
    if (ansMatch) answerLetter = ansMatch[1];

    // 提取正确选项行
    if (answerLetter) {
      const correctRegex = new RegExp(
        `-\\s*\\*\\*${answerLetter}\\s+([^*]*(?:\\*[^*])*)\\*\\*[^：:]*[：:]\\s*正确答案。`
      );
      const m = line.match(correctRegex);
      if (m) correctOptText = m[1].trim();
    }
  }

  return { answerLetter, correctOptText };
}

/**
 * 从选项行中提取选项字母和文本
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
 * 判断一个选项文本是否为纯数字
 */
function isNumericOption(text) {
  return /^-?\d+(\.\d+)?$/.test(text.trim());
}

/**
 * 判断一个选项文本是否包含代码/运算符
 */
function isCodeOption(text) {
  return /[=+\-*/%<>!&|^~]{2,}|%|\/=|\+\+|--|<<|>>|\(\)|\[\]|cout|cin|printf|scanf|for|while|if|int |void |return/.test(text);
}

/**
 * 从核心解析文本中提取关键数值
 */
function extractNumericValues(text) {
  const values = [];
  // 匹配 "得到 3"、"结果是 10"、"为 49"、= 120 等
  const regex = /(?:得到|结果[是为]|等于|值为|即|为)\s*(-?\d+\.?\d*)/g;
  let m;
  while ((m = regex.exec(text)) !== null) {
    values.push(m[1]);
  }
  // 也匹配 "X = 数字" 格式
  const eqRegex = /=\s*(-?\d+\.?\d*)/g;
  while ((m = eqRegex.exec(text)) !== null) {
    values.push(m[1]);
  }
  return values;
}

/**
 * 为错误选项生成有针对性的原因
 */
function generateWrongReason(optText, correctOptText, coreAnalysis, questionText, tags, answerLetter, optLetter) {
  const opt = optText.trim();
  const correct = correctOptText ? correctOptText.trim() : '';

  // === 策略1：纯数字选项 ===
  if (isNumericOption(opt)) {
    // 从解析中提取正确数值
    const numericValues = extractNumericValues(coreAnalysis);
    if (numericValues.length > 0) {
      const correctVal = numericValues[numericValues.length - 1]; // 取最后一个（通常是最终结果）
      if (correctVal !== opt) {
        return `正确结果为 ${correctVal}，此选项 ${opt} 计算有误`;
      }
    }
    // 如果有正确选项文本且也是数字
    if (correct && isNumericOption(correct)) {
      return `正确结果为 ${correct}，此选项 ${opt} 不正确`;
    }
    // 回退：引用解析文本
    if (coreAnalysis.length > 5) {
      const shortAnalysis = coreAnalysis.length > 60 ? coreAnalysis.substring(0, 60) + '…' : coreAnalysis;
      return `计算有误，${shortAnalysis}`;
    }
    return '计算结果不正确';
  }

  // === 策略2：代码表达式选项 ===
  if (isCodeOption(opt)) {
    // 尝试找出与正确选项的具体差异
    if (correct && isCodeOption(correct)) {
      const diff = findCodeDifference(opt, correct);
      if (diff) return diff;
    }
    // 基于解析文本给出提示
    if (coreAnalysis.length > 5) {
      const shortAnalysis = coreAnalysis.length > 80 ? coreAnalysis.substring(0, 80) + '…' : coreAnalysis;
      return `代码逻辑有误，${shortAnalysis}`;
    }
    return '代码逻辑与正确答案不符';
  }

  // === 策略3：概念陈述选项 ===
  // 检查关键词误匹配
  for (const fix of KEYWORD_MISMATCH_FIXES) {
    if (coreAnalysis.includes(fix.badTemplate) || opt.includes(fix.badTemplate)) continue;
    // 检查当前选项行是否包含了这个错误模板
    // 这个检查在调用方做
  }

  // 基于解析文本和选项内容生成原因
  if (coreAnalysis.length > 5) {
    // 尝试从解析中提取与选项相关的关键信息
    const reason = generateConceptReason(opt, correct, coreAnalysis, questionText);
    if (reason) return reason;
  }

  // 回退：至少说明该选项与正确答案的区别
  if (correct) {
    return `与正确答案"${correct.length > 30 ? correct.substring(0, 30) + '…' : correct}"不符`;
  }

  return '此选项说法有误';
}

/**
 * 为正确选项生成解释
 */
function generateCorrectReason(optText, coreAnalysis) {
  if (coreAnalysis.length > 5) {
    const shortAnalysis = coreAnalysis.length > 80 ? coreAnalysis.substring(0, 80) + '…' : coreAnalysis;
    return `正确。${shortAnalysis}`;
  }
  return '正确。与题意完全吻合';
}

/**
 * 找出两个代码选项之间的具体差异
 */
function findCodeDifference(wrongOpt, correctOpt) {
  const w = wrongOpt.replace(/[`'"]/g, '').trim();
  const c = correctOpt.replace(/[`'"]/g, '').trim();

  // 常见代码差异模式
  if (w.includes('%') && c.includes('/')) return '应使用除法 / 而非取模 %';
  if (w.includes('/') && c.includes('%')) return '应使用取模 % 而非除法 /';
  if (w.includes('i++') && c.includes('i+=')) return '递增方式不正确';
  if (w.includes('void') && c.includes('int')) return '返回值类型应为 int 而非 void';
  if (w.includes('int') && c.includes('void')) return '返回值类型应为 void 而非 int';
  if (w.includes('&&') && c.includes('||')) return '应使用逻辑或 || 而非逻辑与 &&';
  if (w.includes('||') && c.includes('&&')) return '应使用逻辑与 && 而非逻辑或 ||';

  // 比较运算符差异
  if (w.includes('==') && c.includes('=')) return '混淆了赋值 = 和比较 ==';
  if (w.includes('=') && !w.includes('==') && c.includes('==')) return '混淆了比较 == 和赋值 =';

  return null;
}

/**
 * 为概念陈述选项生成原因
 */
function generateConceptReason(optText, correctOptText, coreAnalysis, questionText) {
  const opt = optText.toLowerCase();
  const q = (questionText + ' ' + coreAnalysis).toLowerCase();

  // 基于题目主题的针对性分析
  // 计算机基础
  if (/输入设备|输出设备|传感器/.test(opt) && /输入|输出|设备/.test(q)) {
    if (/传感器/.test(opt) && /输入/.test(q)) return '传感器属于输入设备，此说法有误';
    if (/输入/.test(opt) && /输出/.test(q)) return '混淆了输入设备与输出设备的职能';
    return '对输入/输出设备的分类理解有误';
  }

  if (/存储|硬盘|内存|光盘/.test(opt) && /存储|磁场|介质/.test(q)) {
    return '对不同存储介质的工作原理理解有误';
  }

  if (/编译|编辑|调试|保存/.test(opt) && /编译|可执行|源代码/.test(q)) {
    if (/编辑/.test(opt)) return '编辑是修改源代码，不是生成可执行代码';
    if (/保存/.test(opt)) return '保存是存储文件，不是生成可执行代码';
    if (/调试/.test(opt)) return '调试是查找错误，不是生成可执行代码';
  }

  // 变量与标识符
  if (/变量|标识符|命名|关键字/.test(opt) && /变量|标识符|命名|关键字/.test(q)) {
    if (/数字.*开头|开头.*数字/.test(opt)) return 'C++ 标识符不能以数字开头';
    if (/汉语拼音|拼音/.test(opt)) return '汉语拼音可以作为合法的变量名';
    if (/大小写/.test(opt)) return 'C++ 标识符严格区分大小写';
    if (/减号|连字符|-/.test(opt)) return '变量名不能包含减号（-），但可以包含下划线（_）';
    if (/空格/.test(opt)) return '变量名不能包含空格';
    if (/下划线/.test(opt)) return '下划线开头的标识符在 C++ 中是合法的';
    return '对标识符命名规则理解有误';
  }

  // 数据类型
  if (/int|double|float|char|bool/.test(opt) && /数据类型|类型|字节|范围/.test(q)) {
    if (/浮动/.test(opt)) return 'double 类型大小固定为 8 字节，并非浮动';
    if (/无限/.test(opt)) return 'int 类型的取值范围是有限的（-2^31 ~ 2^31-1）';
    return '对数据类型的属性理解有误';
  }

  // 运算符
  if (/运算符|优先级|表达式/.test(opt) && /运算符|优先级|表达式/.test(q)) {
    if (/赋值|比较|==|=/.test(opt)) return '混淆了赋值运算符 = 和比较运算符 ==';
    return '对运算符的用法或优先级理解有误';
  }

  // 循环
  if (/循环|for|while|break|continue/.test(opt) && /循环|次数|输出|执行/.test(q)) {
    if (/continue/.test(opt)) return 'continue 跳过本次循环剩余语句，不影响循环次数';
    if (/break/.test(opt)) return 'break 跳出当前循环，注意其作用范围';
    if (/死循环|无限/.test(opt)) return '循环条件最终会变为假，不会形成死循环';
    return '对循环执行过程的分析有误';
  }

  // 条件/逻辑
  if (/条件|判断|if|逻辑|&&|\\|\\|/.test(opt) && /条件|判断|逻辑|德摩根|等价/.test(q)) {
    if (/&&|\\|\\|/.test(opt)) return '逻辑运算符的使用方式与正确答案不同';
    if (/德摩根|德摩根/.test(q)) return '需要应用德摩根定律进行等价转换';
    return '对条件表达式的逻辑关系理解有误';
  }

  // 函数
  if (/函数|参数|返回值|递归|main/.test(opt) && /函数|参数|返回值|递归/.test(q)) {
    if (/必须.*参数|参数.*必须/.test(opt)) return '函数可以没有参数（无参函数）';
    if (/main.*调用|调用.*main/.test(opt)) return 'C++ 标准规定 main 函数不应被其他函数调用';
    if (/嵌套.*定义|定义.*嵌套/.test(opt)) return 'C++ 不支持在函数内定义函数（lambda 是另一种机制）';
    if (/递归|终止/.test(opt)) return '递归函数必须有终止条件，否则会无限递归';
    if (/void.*return|return.*void/.test(opt)) return 'void 函数不应有 return 值';
    return '对函数的定义或调用规则理解有误';
  }

  // 数组
  if (/数组|下标|越界|arr/.test(opt) && /数组|下标|越界|长度/.test(q)) {
    if (/arr\[5\]|下标.*n/.test(opt)) return '数组下标从 0 开始，int arr[5] 的合法下标范围是 0~4';
    if (/长度|size|大小/.test(opt)) return '对数组长度或大小的计算有误';
    return '对数组的定义或访问规则理解有误';
  }

  // 字符串/字符
  if (/字符串|string|字符|ASCII|\\0/.test(opt) && /字符串|字符|ASCII|长度/.test(q)) {
    if (/\\\\0|结束符|结尾/.test(opt)) return 'C 风格字符串以 \'\\0\' 结尾，影响数组长度';
    if (/ASCII|编码|码值/.test(opt)) return '字符运算本质是 ASCII 码值运算';
    if (/长度|length|strlen/.test(opt)) return '对字符串长度的计算有误';
    return '对字符串或字符的处理方式理解有误';
  }

  // 进制/补码
  if (/进制|二进制|八进制|十六进制|补码|原码|反码/.test(opt) && /进制|二进制|补码|转换/.test(q)) {
    if (/补码|原码|反码/.test(opt)) return '混淆了原码、反码、补码的表示方式';
    if (/进制/.test(opt)) return '进制转换的计算结果有误';
    return '对进制转换或补码表示的理解有误';
  }

  // 位运算
  if (/位运算|按位|异或|移位|<<|>>|&|\\||\\^/.test(opt) && /位运算|按位|移位|异或/.test(q)) {
    if (/异或|\\^/.test(opt)) return '对异或运算的性质或结果理解有误';
    if (/移位|<<|>>/.test(opt)) return '对移位运算的方向或结果理解有误';
    return '对位运算的规则或结果理解有误';
  }

  // 排序
  if (/排序|冒泡|选择|插入|稳定/.test(opt) && /排序|稳定|复杂度/.test(q)) {
    if (/稳定/.test(opt)) return '对排序算法的稳定性判断有误';
    return '对排序算法的特性理解有误';
  }

  // 流程图
  if (/流程图|菱形|椭圆|矩形|平行四边形/.test(opt) && /流程图|图形|框/.test(q)) {
    if (/圆形|椭圆/.test(opt)) return '椭圆框表示开始/结束，不是处理或判断';
    if (/矩形/.test(opt)) return '矩形框表示处理操作，不是判断';
    if (/菱形/.test(opt)) return '菱形框表示判断/条件，不是处理';
    if (/平行四边形/.test(opt)) return '平行四边形框表示输入/输出';
    return '对流程图的基本图形含义理解有误';
  }

  // 网络
  if (/TCP|UDP|网络|协议|握手/.test(opt) && /TCP|网络|协议|握手/.test(q)) {
    if (/一次|二次|四次/.test(opt)) return 'TCP 建立连接需要三次握手';
    return '对网络协议的理解有误';
  }

  // 浮点数
  if (/浮点|精度|0\\.1|0\\.2|误差/.test(opt) && /浮点|精度|误差/.test(q)) {
    if (/bug|错误|缺陷/.test(opt)) return '这不是 C++ 的 bug，而是 IEEE 754 浮点数表示的固有特性';
    if (/不能.*比较|只能.*整数/.test(opt)) return '== 可以用于浮点数比较，但由于精度问题结果可能不符合预期';
    return '对浮点数精度问题的理解有误';
  }

  // 未定义行为
  if (/未定义|undefined|不确定/.test(opt) && /未定义|表达式|修改/.test(q)) {
    if (/22|21|20/.test(opt)) return '这是未定义行为，不同编译器可能给出不同结果';
    return '对未定义行为的判断有误';
  }

  // 通用回退：引用解析文本
  if (coreAnalysis.length > 10) {
    const short = coreAnalysis.length > 60 ? coreAnalysis.substring(0, 60) + '…' : coreAnalysis;
    return `此说法有误，${short}`;
  }

  return null;
}

/**
 * 检查选项行是否包含模板套话
 */
function hasTemplatePhrase(reasonText) {
  return TEMPLATE_PHRASES.some(t => reasonText.includes(t));
}

/**
 * 修复关键词误匹配
 */
function fixKeywordMismatch(optText, reasonText) {
  for (const fix of KEYWORD_MISMATCH_FIXES) {
    if (reasonText.includes(fix.badTemplate)) {
      for (const kw of fix.optionKeywords) {
        if (new RegExp(kw).test(optText)) {
          return reasonText.replace(fix.badTemplate, fix.replacement);
        }
      }
    }
  }
  return reasonText;
}

/**
 * 处理单个文件
 */
function processFile(filePath) {
  console.log(`\n处理: ${path.basename(filePath)}`);
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');

  let modified = false;
  let fixCount = 0;
  let correctFixCount = 0;
  let mismatchFixCount = 0;

  // 状态跟踪
  let inExplanation = false;
  let explanationStartLine = -1;
  let explanationLines = [];
  let currentQuestionText = '';
  let currentAnswer = null;
  let currentOptions = [];
  let currentTags = '';

  // 向上搜索题目信息
  function findQuestionContext(lineIdx) {
    let questionText = '';
    let answer = null;
    let options = [];
    let tags = '';

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
        const m = l.match(/options:\s*\[(.+?)\]\s*,\s*answer:/);
        if (m) {
          options = m[1].split(/['"],\s*['"]/).map(s => s.replace(/[[\]'"]/g, '').trim());
        }
        // 多行选项
        if (l.includes('options:')) {
          let k = j + 1;
          while (k < lineIdx && !lines[k].includes('answer:')) {
            let om = lines[k].trim().match(/^['"](.+?)['"]/);
            if (!om) om = lines[k].trim().match(/^['"](.+?)['"],?$/);
            if (om) options.push(om[1]);
            k++;
          }
        }
      }

      if (!tags) {
        const m = l.match(/tags:\s*\[([^\]]*)\]/);
        if (m) tags = m[1];
      }

      if (/^\{/.test(l.trim())) break;
    }

    return { questionText, answer, options, tags };
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 检测 explanation 块开始
    if (line.match(/explanation:\s*`/)) {
      inExplanation = true;
      explanationStartLine = i;
      explanationLines = [line];

      // 获取题目上下文
      const ctx = findQuestionContext(i);
      currentQuestionText = ctx.questionText;
      currentAnswer = ctx.answer;
      currentOptions = ctx.options;
      currentTags = ctx.tags;
      continue;
    }

    if (inExplanation) {
      explanationLines.push(line);

      // 检测 explanation 块结束
      if (i > explanationStartLine && line.match(/^\s*`,?\s*$/)) {
        inExplanation = false;

        // 处理这个 explanation 块
        const coreAnalysis = extractCoreAnalysis(explanationLines);
        const { answerLetter, correctOptText } = extractAnswerInfo(explanationLines);

        // 逐行修复选项分析
        let blockModified = false;
        for (let k = explanationStartLine + 1; k < i; k++) {
          const optLine = lines[k];
          const parsed = parseOptionLine(optLine);
          if (!parsed) continue;

          const isCorrect = parsed.letter === answerLetter;
          let newReason = parsed.reason;

          // 1. 修复关键词误匹配
          const afterMismatchFix = fixKeywordMismatch(parsed.optText, newReason);
          if (afterMismatchFix !== newReason) {
            newReason = afterMismatchFix;
            mismatchFixCount++;
          }

          // 2. 替换模板套话
          if (!isCorrect && hasTemplatePhrase(newReason)) {
            // 去掉 "错误。" 前缀（后面会重新加）
            let cleanReason = newReason.replace(/^错误[。，、]\s*/, '');

            const generated = generateWrongReason(
              parsed.optText,
              correctOptText,
              coreAnalysis,
              currentQuestionText,
              currentTags,
              answerLetter,
              parsed.letter
            );

            if (generated) {
              newReason = `错误。${generated}`;
            } else {
              // 即使生成失败，也至少去掉最空洞的套话
              newReason = `错误。${cleanReason.replace(/与题目要求不符，请对照正确解析重新理解/, '此选项说法有误')}`;
            }
            fixCount++;
          }

          // 3. 补充正确选项解释
          if (isCorrect && newReason === '正确答案。') {
            const correctReason = generateCorrectReason(parsed.optText, coreAnalysis);
            newReason = correctReason;
            correctFixCount++;
          }

          // 替换行
          if (newReason !== parsed.reason) {
            // 重建选项行
            // 注意：optText 已经是模板字符串上下文中的正确格式，不需要额外转义
            const indent = optLine.match(/^(\s*)/)[1];
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
    console.log(`  ✅ 修复了 ${fixCount} 个错误选项套话，${correctFixCount} 个正确选项补充解释，${mismatchFixCount} 个关键词误匹配`);
  } else {
    console.log(`  无需修改`);
  }

  return { fixCount, correctFixCount, mismatchFixCount };
}

// 主入口
const target = process.argv[2];
if (!target) {
  console.log('用法: node scripts/fix-option-analysis-l2l3.cjs <文件路径或目录>');
  process.exit(1);
}

const stat = fs.statSync(target);
if (stat.isDirectory()) {
  const files = fs.readdirSync(target)
    .filter(f => f.match(/-l[23]\.js$/))
    .sort();
  let totalFix = 0, totalCorrect = 0, totalMismatch = 0;
  for (const file of files) {
    const { fixCount, correctFixCount, mismatchFixCount } = processFile(path.join(target, file));
    totalFix += fixCount;
    totalCorrect += correctFixCount;
    totalMismatch += mismatchFixCount;
  }
  console.log(`\n总计: 修复 ${totalFix} 个错误选项套话，${totalCorrect} 个正确选项补充解释，${totalMismatch} 个关键词误匹配`);
} else {
  processFile(target);
}
