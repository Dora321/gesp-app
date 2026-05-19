const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

export const getQuestionContent = (q) => {
    if (!q) return '';
    if (q.type === 'coding' || q.type === 'programming') {
        return q.question || q.title || q.summary || q.description || '';
    }
    return q.question || q.description || q.summary || q.title || '';
};

const stripMarkdown = (md) => {
    if (!md) return '';
    return md
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^>\s+/gm, '')
        .replace(/^[-*+]\s+/gm, '')
        .replace(/^\d+\.\s+/gm, '')
        .replace(/[✅❌✓✗]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
};

const normalizeAnswer = (answer) => {
    if (typeof answer === 'number') return answer;
    if (typeof answer === 'string') {
        const trimmed = answer.trim().toUpperCase();
        if (/^\d+$/.test(trimmed)) return Number(trimmed);
        const idx = OPTION_LABELS.indexOf(trimmed);
        if (idx >= 0) return idx;
    }
    return undefined;
};

const getOptions = (q, isJudge) => {
    if (Array.isArray(q?.options) && q.options.length > 0) return q.options;
    return isJudge ? ['正确', '错误'] : [];
};

const extractExamPoint = (explanation) => {
    const match = explanation.match(/\*\*考点[：:]\*\*\s*(.+)/m);
    return match ? stripMarkdown(match[1]) : '';
};

const extractBasis = (explanation) => {
    const basisMatch = explanation.match(/\*\*判定依据[：:]\*\*\s*\n([\s\S]*?)(?=\n\s*\*\*|$)/);
    if (basisMatch) return stripMarkdown(basisMatch[1]);

    const analysisMatch = explanation.match(/\*\*解析[：:]\*\*\s*\n([\s\S]*?)(?=\n\s*(?:\*\*选项|-\s*\*\*[A-F]|-\s*[A-F][.、）)]|\*\*考点|$))/);
    if (analysisMatch) return stripMarkdown(analysisMatch[1]);

    return stripMarkdown(
        explanation
            .replace(/\*\*答案[：:][^\n]*\n?/g, '')
            .replace(/\*\*选项逐项分析[：:]?\*\*/g, '')
            .replace(/\*\*考点[：:]\*\*[^\n]*/g, '')
            .replace(/^\s*-\s*\*\*[A-F][\s.（(、）)]?[^*]*\*\*[^\n]*/gm, '')
    );
};

const findOptionReason = (explanation, letter) => {
    if (!explanation) return '';
    const escaped = letter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const patterns = [
        new RegExp(`^\\s*-\\s*\\*\\*${escaped}(?:\\s*[./、）)]|\\s+|[（(])[^*]*\\*\\*\\s*[：:]?\\s*([\\s\\S]*?)(?=\\n\\s*-\\s*\\*\\*[A-F]|\\n\\s*\\*\\*考点|$)`, 'im'),
        new RegExp(`^\\s*-\\s*${escaped}[.、）)]\\s*([\\s\\S]*?)(?=\\n\\s*-\\s*[A-F][.、）)]|\\n\\s*\\*\\*考点|$)`, 'im'),
    ];
    for (const pattern of patterns) {
        const match = explanation.match(pattern);
        if (match && match[1]) {
            return stripMarkdown(match[1]).replace(/^(正确|错误|不正确)[。，、：:]?\s*/, '');
        }
    }
    return '';
};

const topicRules = [
    {
        id: 'bitwise',
        regex: /位运算|按位|位移|补码|原码|反码|左移|右移|异或/i,
        keyPoint: '位运算题要先把数转换到二进制或补码语境，再按位逐位处理，最后再转回十进制或布尔结果。',
        steps: [
            '确认参与运算的数值、位宽或补码表示方式',
            '按运算符规则逐位计算，左移低位补 0，右移要留意符号位',
            '把位运算后的结果转换回题目要求的输出形式',
            '核对输出的是数值本身、真假值，还是表达式比较结果',
        ],
        pitfalls: ['把位运算当成普通逻辑运算', '忽略有符号整数右移时符号位可能被保留', '混淆表达式结果和最终输出格式'],
        extension: '位运算题建议先写出关键二进制位，再做移位或按位运算，避免只凭十进制心算。',
    },
    {
        id: 'loop',
        regex: /循环|for|while|do\s*while|i\+\+|\+\+i|break|continue/i,
        keyPoint: '循环题要抓住三件事：初始值、继续条件、每轮更新。先列变量表，再判断循环结束时的状态。',
        steps: [
            '标出循环变量的初值、终止条件和更新语句',
            '按轮次记录关键变量变化，尤其是最后一次是否执行',
            '检查 break、continue 是否改变正常流程',
            '把最终状态与选项逐一比对',
        ],
        pitfalls: ['把 `<` 看成 `<=` 导致多算或少算一次', '遇到 `continue` 忘记跳过本轮后续语句', '嵌套循环中混淆内外层变量'],
        extension: '同类题可以用“轮次表”训练：每一列写变量值，每一行写一次循环，边界错误会很快暴露。',
    },
    {
        id: 'condition',
        regex: /条件|判断|if|else|switch|case|&&|\|\||布尔|true|false/i,
        keyPoint: '条件题先算表达式真值，再看分支结构。`if...else if` 是互斥链，前面命中后后续分支不再执行。',
        steps: [
            '逐个计算条件表达式的真值',
            '确认分支之间是独立 if 还是 if-else 链',
            '代入题目给定输入，沿实际执行路径走一遍',
            '核对输出或结论是否只来自被执行的分支',
        ],
        pitfalls: ['`=` 是赋值，`==` 才是比较', '`&&` 的优先级高于 `||`', '`else` 总是匹配最近的未配对 if'],
        extension: '遇到复杂逻辑表达式时，建议先加括号重写，再代入真值，减少优先级误判。',
    },
    {
        id: 'io',
        regex: /输入|输出|cin|cout|printf|scanf|格式|%d|%f|endl|字符串字面量/i,
        keyPoint: '输入输出题要区分“原样输出的字符串”和“会被计算的表达式”，并检查空格、换行、格式占位是否完全匹配。',
        steps: [
            '把引号内的内容先原样抄出，包括空格和符号',
            '再计算引号外的表达式或变量值',
            '检查 printf/scanf 的占位符数量与参数数量是否对应',
            '最后拼接输出，特别留意空格与换行',
        ],
        pitfalls: ['把双引号里的算式误当成表达式计算', '漏看字符串中的空格', '格式占位符数量和实参数量不一致'],
        extension: '输出题建议用“字符串片段 + 表达式片段”的方式拆开看，最后再拼接。',
    },
    {
        id: 'operator',
        regex: /运算符|优先级|表达式|算术|取模|余数|整除|%|\+\+|--|\*|\/|\+|-/i,
        keyPoint: '表达式题按优先级逐层求值：括号优先，其次乘除取模，再加减，关系和逻辑运算靠后。',
        steps: [
            '先处理括号和单目运算',
            '再按乘除取模、加减、关系、逻辑的顺序计算',
            '遇到整数除法或取模时单独确认结果',
            '把每一步中间结果写出，避免心算跳步',
        ],
        pitfalls: ['整数除法会截断小数部分', '`%` 只适用于整数运算', '自增自减在表达式中容易造成读写顺序混乱'],
        extension: '表达式推导不要只写最终答案，至少保留两步中间结果，方便排查优先级错误。',
    },
    {
        id: 'array',
        regex: /数组|下标|索引|vector|二维|越界|arr\[/i,
        keyPoint: '数组题的关键是下标范围和访问顺序。C++ 下标从 0 开始，长度为 n 的数组最大合法下标是 n-1。',
        steps: [
            '写出数组长度和合法下标范围',
            '按访问顺序标记每一次读写位置',
            '二维数组先确认行列含义',
            '检查是否访问到边界外的位置',
        ],
        pitfalls: ['把第 n 个元素写成下标 n', '二维数组行列顺序写反', '`vector.size()` 是个数，不是最大下标'],
        extension: '数组模拟题可以画格子，把下标写在格子上方，值写在格子里，更新过程会更清楚。',
    },
    {
        id: 'string',
        regex: /字符串|string|字符|char|ASCII|strlen|strcmp|'0'|'\0'/i,
        keyPoint: '字符可以参与整数运算，本质依据编码值；字符串处理要区分单个字符、C 风格字符串和 C++ string。',
        steps: [
            '先判断处理对象是 char、字符数组还是 string',
            '涉及字符运算时转成 ASCII 值理解',
            '检查字符串长度是否包含结尾符或换行',
            '再判断比较、拼接或下标访问的结果',
        ],
        pitfalls: ['`\'0\'` 的 ASCII 值是 48，不等于整数 0', 'C 风格字符串以 `\\0` 结尾', '大小写字母 ASCII 差值为 32'],
        extension: '字符题常用差值推导，例如 `ch - \'0\'` 可把数字字符转成对应整数。',
    },
    {
        id: 'function',
        regex: /函数|递归|参数|返回值|return|形参|实参/i,
        keyPoint: '函数题要看参数如何传递、返回值如何使用。递归题还要明确终止条件和每层返回结果。',
        steps: [
            '明确函数输入参数、返回类型和副作用',
            '把实参传给形参，判断是否会修改原变量',
            '追踪 return 返回到调用处后的使用方式',
            '递归题画出前两层调用关系和终止条件',
        ],
        pitfalls: ['值传递不会修改原变量', '递归缺少终止条件会栈溢出', '忘记使用返回值会让计算结果丢失'],
        extension: '递归题建议写出“当前层做什么、下一层求什么、何时停止”三句话。',
    },
    {
        id: 'algorithm',
        regex: /排序|冒泡|选择|插入|快排|归并|二分|搜索|DFS|BFS|栈|队列|复杂度|O\(/i,
        keyPoint: '算法题要先识别策略，再分析过程和复杂度。模拟类题重过程，复杂度题重循环层数和数据规模。',
        steps: [
            '识别题目考查的算法或数据结构',
            '按算法规则模拟关键步骤',
            '统计循环层数或操作次数',
            '结合边界情况确认最终结论',
        ],
        pitfalls: ['把稳定性和时间复杂度混为一谈', '二分边界更新写错导致漏解', '只看平均复杂度而忽略最坏情况'],
        extension: '算法概念题要把“思想、适用场景、复杂度、易错边界”四项一起记。',
    },
];

const detectTopics = (text) => topicRules.filter((rule) => rule.regex.test(text));

const choosePrimaryTopic = (topics, text) => {
    const priorityHints = [
        ['bitwise', /位运算|按位|位移|补码|原码|反码|左移|右移|异或/i],
        ['string', /ASCII|字符串|string|字符|char|strlen|strcmp|'0'|'\\0'/i],
        ['array', /数组|下标|索引|vector|二维|越界|arr\[/i],
        ['operator', /运算符|优先级|表达式|算术|取模|余数|整除|%|\+\+|--|\*|\/|\+|-/i],
        ['function', /函数|递归|参数|返回值|return|形参|实参/i],
        ['algorithm', /排序|冒泡|选择|插入|快排|归并|二分|搜索|DFS|BFS|栈|队列|复杂度|O\(/i],
        ['loop', /循环|for|while|do\s*while|i\+\+|\+\+i|break|continue/i],
        ['condition', /条件|判断|if|else|switch|case|&&|\|\||布尔|true|false/i],
        ['io', /输入|输出|cin|cout|printf|scanf|格式|%d|%f|endl|字符串字面量/i],
    ];
    for (const [id, regex] of priorityHints) {
        if (regex.test(text)) {
            const topic = topics.find((item) => item.id === id);
            if (topic) return topic;
        }
    }
    return topics[0];
};

const inferWrongReason = (optText, merged, primaryTopic, questionText = '') => {
    if (/以上|都不|均不|都不是|均不是/.test(optText)) {
        return '题目中已经存在符合条件的正确选项，因此这个总括性的否定选项不成立。';
    }
    if (/不正确|错误|不能|无法/.test(questionText) && /正确|可以|能够|合法/.test(optText)) {
        return '题干是反向提问，该选项虽然表述看似合理，但不符合本题要找的错误项。';
    }
    if (/变量|标识符|命名|关键字|保留字/i.test(merged)) {
        if (/关键字|保留字/i.test(optText)) return '混淆了关键字与普通标识符，关键字不能作为变量名使用。';
        if (/数字.*开头|开头.*数字/i.test(optText)) return 'C++ 标识符不能以数字开头。';
        return '对标识符命名规则的适用条件判断不准确。';
    }
    if (primaryTopic?.id === 'io' && /空格|换行|等号|原样|字符串/i.test(merged)) {
        return '该选项的输出格式与程序实际拼接结果不一致，通常是漏看了空格、等号或字符串原样输出。';
    }
    if (primaryTopic?.id === 'operator') return '该选项的中间运算结果或优先级处理不正确，建议逐步列出表达式求值过程。';
    if (primaryTopic?.id === 'bitwise') return '该选项的补码、移位或按位运算推导不符合实际执行结果。';
    if (primaryTopic?.id === 'loop') return '该选项对循环执行次数、边界或变量更新的判断不准确。';
    if (primaryTopic?.id === 'condition') return '该选项没有沿着实际命中的分支执行，或误解了条件短路/互斥关系。';
    if (primaryTopic?.id === 'array') return '该选项对下标范围、访问位置或更新顺序的判断不准确。';
    if (primaryTopic?.id === 'string') return '该选项混淆了字符值、字符串内容或编码差值。';
    if (primaryTopic?.id === 'function') return '该选项对参数传递、返回值或递归终止条件的理解有偏差。';
    if (primaryTopic?.id === 'algorithm') return '该选项与算法的实际执行过程或复杂度判断不一致。';
    return '该选项与题干条件或 C++ 规则不一致，属于干扰项。';
};

export const buildQuestionInsight = (q, level) => {
    const analysis = buildRichAnalysis(q, level);
    if (!analysis) return q?.explanation?.trim() || '';
    return analysis.keyPoint || analysis.summary || `该题属于 GESP L${level} 高频考点，建议先定位题干关键词，再用样例代入和边界验证完成推导。`;
};

export const buildRichAnalysis = (q, level) => {
    if (!q) return null;

    const isProgramming = q.type === 'coding' || q.type === 'programming';
    if (isProgramming) return null;

    const questionText = getQuestionContent(q);
    const explanation = q.explanation?.trim() || '';
    const isJudge = q.type === 'judge' || q.type === 'tf';
    const options = getOptions(q, isJudge);
    const answerIdx = normalizeAnswer(q.answer);
    const merged = `${questionText} ${options.join(' ')} ${explanation}`;
    const topicSource = `${questionText} ${explanation}`;
    const topics = detectTopics(topicSource).length ? detectTopics(topicSource) : detectTopics(merged);
    const primaryTopic = choosePrimaryTopic(topics, topicSource);
    const basis = extractBasis(explanation);
    const examPoint = extractExamPoint(explanation);

    const optionAnalysis = options.map((opt, idx) => {
        const label = OPTION_LABELS[idx] || String(idx + 1);
        const text = typeof opt === 'string' ? opt : String(opt);
        const isCorrect = idx === answerIdx;
        const fromExplanation = findOptionReason(explanation, label);
        let reason = fromExplanation;

        if (!reason && isJudge) {
            reason = isCorrect
                ? (basis || '该判断与题干规则一致。')
                : (basis ? `与判定依据相反：${basis}` : '该判断与题干规则不一致。');
        }

        if (!reason && isCorrect) {
            reason = basis
                ? `正确项契合核心依据：${basis}`
                : (primaryTopic?.keyPoint || '正确答案与题干条件和 C++ 规则一致。');
        }

        if (!reason) {
            reason = inferWrongReason(text, merged, primaryTopic, questionText);
        }

        return { idx, label, text, isCorrect, reason };
    });

    const hasCode = /```|cin|cout|printf|scanf|for|while|if|int |return|#include/i.test(questionText);
    const steps = [];
    if (hasCode) {
        steps.push({ icon: '📋', text: '审题：明确代码输入、输出目标和会改变结果的语句' });
        steps.push({ icon: '🔍', text: '追踪：逐行执行代码，记录关键变量或输出片段' });
        if (primaryTopic?.steps?.length) {
            steps.push({ icon: '🧭', text: primaryTopic.steps[1] || primaryTopic.steps[0] });
        }
        steps.push({ icon: '✅', text: '验证：用最终变量状态或输出结果逐项排除' });
    } else if (primaryTopic?.steps?.length) {
        primaryTopic.steps.forEach((step, idx) => {
            steps.push({ icon: ['📋', '💡', '🔍', '✅'][idx] || '•', text: step });
        });
    } else {
        steps.push({ icon: '📋', text: '审题：找出题干限定词，特别留意“正确/错误/不正确”' });
        steps.push({ icon: '💡', text: '定位：判断题目考查的是语法规则、运行结果还是概念辨析' });
        steps.push({ icon: '🔍', text: '排除：对每个选项都用题干条件验证一遍' });
        steps.push({ icon: '✅', text: '确认：保留最能解释题干全部条件的选项' });
    }

    const keyPoint = examPoint || basis || primaryTopic?.keyPoint || `该题考查 GESP L${level} 核心知识点，建议结合题干关键词和选项差异完成推导。`;
    const pitfalls = Array.from(new Set([
        ...(primaryTopic?.pitfalls || []),
        ...(topics[1]?.pitfalls?.slice(0, 1) || []),
        ...(/不正确|错误|不能/.test(questionText) ? ['反向提问时要选“错误项”，不要被正确表述带偏'] : []),
        ...(/整数|int|double|float|\/|%/.test(merged) ? ['数值题要区分整数除法、浮点除法和取模运算'] : []),
    ])).slice(0, 4);

    if (pitfalls.length === 0) {
        pitfalls.push('不要只凭印象选答案，至少用一个最小样例或规则定义验证。');
        pitfalls.push('选项看起来相近时，优先比较限定词、边界和输出格式。');
    }

    const extension = primaryTopic?.extension || `该知识点在 GESP L${level} 中反复出现，建议把错因归类到“概念、边界、格式、推演”之一，方便复盘。`;

    return {
        summary: basis || explanation,
        optionAnalysis,
        steps,
        keyPoint,
        pitfalls,
        extension,
        qualityFlags: {
            hasExplanation: Boolean(explanation),
            hasExamPoint: Boolean(examPoint),
            hasOptionReasons: optionAnalysis.filter((item) => Boolean(findOptionReason(explanation, item.label))).length,
            inferred: !explanation || optionAnalysis.some((item) => !findOptionReason(explanation, item.label)),
        },
    };
};
