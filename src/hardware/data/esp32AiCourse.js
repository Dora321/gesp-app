import { BrainCircuit, ClipboardCheck, Bug, Bot, Handshake, HeartHandshake } from 'lucide-react';

export const courseData = {
    overview: {
        title: 'ESP32 × AI 科创课程体系',
        subtitle: '从「看懂代码」到「驾驭 AI 做项目」',
        audience: '小学高年级（5-6 年级）',
        totalLessons: '16 课时（可按学期展开）',
        philosophy: '不是教编程语法，而是培养「AI 时代的工程思维」：提出问题 → 拆解需求 → 指挥 AI → 验证判断 → 迭代改进'
    },
    phases: [
        {
            id: 1,
            title: '读懂 AI',
            subtitle: '学会阅读和验证 AI 生成的代码',
            drivingQuestion: 'AI 写出来的代码，我们能不能相信？',
            color: 'emerald',
            lessons: '第 1-5 课',
            coreAbility: '能看懂 10 行 MicroPython 代码，能判断代码的运行结果',
            aiRole: 'AI 是一台「代码打印机」：学生不写代码，只读代码',
            units: [
                {
                    num: 1,
                    title: 'LED 亮了！',
                    goal: '用 AI 生成的 3 行核心代码，第一次控制真实世界的小灯',
                    project: '控制板载 LED 亮灭',
                    aiUsage: '老师当场向 AI 提问，学生观察「语言、硬件、引脚、效果」四要素',
                    keySkill: '认识 Pin / OUT / value(1) / value(0)，并理解代码必须和硬件对应',
                    homework: '把 3 行核心代码讲给家人听，并记录家人提出的一个问题'
                },
                {
                    num: 2,
                    title: '闪烁密码',
                    goal: '理解 time.sleep() 和循环',
                    project: '让 LED 闪出 SOS 摩斯密码',
                    aiUsage: '学生第一次自己向 AI 提问',
                    keySkill: '把「亮 0.2 秒灭 0.2 秒」翻译成代码逻辑',
                    homework: '用闪烁编码自己名字的首字母'
                },
                {
                    num: 3,
                    title: '谁按了按钮？',
                    goal: '理解输入（IN）和条件判断（if）',
                    project: '按钮控制 LED 开关',
                    aiUsage: '学生提问时必须描述硬件接线',
                    keySkill: '学会在提问中说清楚「哪个引脚接了什么」',
                    homework: '改成「按一下亮，再按一下灭」（切换模式）'
                },
                {
                    num: 4,
                    title: '小屏幕说话了',
                    goal: '接触 OLED 显示和库的概念',
                    project: 'OLED 屏幕显示自己的名字 + 温度数据',
                    aiUsage: '让学生体验「AI 不认识某个库」的情况',
                    keySkill: '学会告诉 AI「我用的是 SSD1306/SH1106」',
                    homework: '让 OLED 显示一个倒计时'
                },
                {
                    num: 5,
                    title: 'AI 会一本正经地胡说',
                    goal: '理解 AI 是「概率生成」而非「真的懂」，建立判断标尺',
                    project: '故意「考」AI 一个不存在的功能，亲眼看它自信地编，再学会验证',
                    aiUsage: '学生主动考 AI：问它一个不存在的引脚/函数，观察它怎么编',
                    keySkill: '建立四条判断标尺：会幻觉 / 不知你的接线 / 答案不唯一 / 能跑≠正确',
                    homework: '记录一次「AI 自信地说错 → 你发现 → 你怎么验证」的过程'
                }
            ]
        },
        {
            id: 2,
            title: '指挥 AI',
            subtitle: '学会精确描述需求，让 AI 写出真正想要的代码',
            drivingQuestion: '怎样把一个想法说清楚，让 AI 和硬件一起完成任务？',
            color: 'indigo',
            lessons: '第 6-10 课',
            coreAbility: '能独立向 AI 描述一个传感器项目的需求并拿到可用代码',
            aiRole: 'AI 是一个「实习程序员」：学生当项目经理，下需求单',
            units: [
                {
                    num: 6,
                    title: '好问题 vs 坏问题',
                    goal: '系统学习「提示词工程」基础',
                    project: '同一个任务，对比模糊提问和精确提问的 AI 输出差异',
                    aiUsage: '老师展示 3 种提问方式，学生投票哪个结果最好',
                    keySkill: '提问模板：硬件 + 语言 + 行为 + 约束',
                    homework: '写 3 个关于 ESP32 的提问，互相评价哪个最精确'
                },
                {
                    num: 7,
                    title: '温度播报员',
                    goal: '传感器读数 + 条件逻辑的需求拆解',
                    project: 'DHT11 读温湿度，OLED 显示，超过阈值 LED 报警',
                    aiUsage: '学生写「需求单」再提问，不允许一句话描述全部功能',
                    keySkill: '把复杂需求拆成 2-3 步分别问 AI',
                    homework: '加一个功能：湿度超过 80% 也报警'
                },
                {
                    num: 8,
                    title: '光感小夜灯',
                    goal: '模拟输入（ADC）+ PWM 概念',
                    project: '光敏电阻检测环境亮度，LED 自动调节亮度',
                    aiUsage: '学生需要向 AI 解释「我要渐变亮度，不是开关」',
                    keySkill: '理解 PWM 占空比的概念（通过 AI 解释 + 实验验证）',
                    homework: '改成「天越暗灯越亮」的反向逻辑'
                },
                {
                    num: 9,
                    title: '彩虹灯带',
                    goal: 'WS2812 LED 的控制 + 循环的深入理解',
                    project: '用代码控制灯带颜色渐变、呼吸、流水效果',
                    aiUsage: '学生描述「我想要的灯光效果」让 AI 实现',
                    keySkill: '用自然语言精确描述视觉效果（颜色、速度、模式）',
                    homework: '设计一个自己的灯光效果，写好需求文档'
                },
                {
                    num: 10,
                    title: '需求文档大挑战',
                    goal: '阶段性综合检验',
                    project: '抽签拿到随机项目题目，写需求文档 → 问 AI → 调试 → 展示',
                    aiUsage: '全程自主使用 AI，老师只在硬件接线环节介入',
                    keySkill: '完整走一遍「需求 → 提问 → 验证 → 修改」闭环',
                    homework: '给同学的项目写一份改进建议'
                }
            ]
        },
        {
            id: 3,
            title: '超越 AI',
            subtitle: '做 AI 做不到的事：创意、整合、解决真实问题',
            drivingQuestion: '我们能不能用 ESP32 解决一个真实生活问题？',
            color: 'orange',
            lessons: '第 11-16 课',
            coreAbility: '能独立完成一个多模块项目，从创意到展示全流程',
            aiRole: 'AI 是一个「工具箱」：学生决定什么时候用、用来做什么',
            units: [
                {
                    num: 11,
                    title: '我的问题，我的方案',
                    goal: '从「真实问题」出发做项目选题',
                    project: '观察校园/家庭中的一个真实问题，提出 ESP32 解决方案',
                    aiUsage: '用 AI 做头脑风暴（可行性分析），但选题由学生决定',
                    keySkill: '把「生活问题」翻译成「技术需求」',
                    homework: '写项目提案：问题描述 + 方案思路 + 需要的传感器'
                },
                {
                    num: 12,
                    title: '系统设计',
                    goal: '学习把大项目拆成小模块',
                    project: '为自己的项目画模块图（输入 → 处理 → 输出）',
                    aiUsage: '让 AI 帮忙分析方案的可行性和可能的坑',
                    keySkill: '模块化思维：每个模块独立测试再整合',
                    homework: '列出每个模块需要问 AI 的问题清单'
                },
                {
                    num: 13,
                    title: '搭积木 ①',
                    goal: '逐个实现各模块',
                    project: '先让每个传感器/执行器独立工作',
                    aiUsage: '按照问题清单逐个问 AI，记录哪些能用、哪些要改',
                    keySkill: '独立调试单个模块的能力',
                    homework: '整理已完成模块的代码和测试结果'
                },
                {
                    num: 14,
                    title: '搭积木 ②',
                    goal: '模块整合和冲突处理',
                    project: '把各模块代码合并成一个完整程序',
                    aiUsage: '把多段代码粘贴给 AI，让 AI 帮合并（学习 prompt 技巧）',
                    keySkill: '理解「合并代码时为什么会冲突」',
                    homework: '确保整合后的代码能完整运行'
                },
                {
                    num: 15,
                    title: '讲好你的故事',
                    goal: '学习技术项目的表达和展示',
                    project: '制作项目展板/PPT + 准备 3 分钟演讲',
                    aiUsage: '用 AI 帮忙整理演讲稿、生成项目说明文字',
                    keySkill: '把技术语言翻译成观众能听懂的话',
                    homework: '练习演讲，找家人当观众'
                },
                {
                    num: 16,
                    title: '科创发布会',
                    goal: '展示 + 互评 + 反思',
                    project: '全班项目展示，互相体验、投票、点评',
                    aiUsage: '无（这节课的主角是学生自己）',
                    keySkill: '接受反馈、反思改进',
                    homework: '写项目复盘：最大的收获 + 如果重来会怎么改'
                }
            ]
        }
    ],
    designPrinciples: [
        {
            icon: BrainCircuit,
            title: '先读后写',
            desc: '每节课至少 50% 时间花在「读懂代码」上，而不是「写出代码」。'
        },
        {
            icon: ClipboardCheck,
            title: '需求先行',
            desc: '任何项目先写清楚「要实现什么」，再动手，或再动用 AI。'
        },
        {
            icon: Bug,
            title: '拥抱出错',
            desc: 'AI 出错不是意外，是教学资源。每个阶段都有设计好的出错时刻。'
        },
        {
            icon: Bot,
            title: 'AI 角色递进',
            desc: '从代码打印机到实习程序员再到工具箱，学生主导权逐步递增。'
        }
    ]
};

export const phaseStyles = {
    emerald: {
        text: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        solid: 'bg-emerald-600',
        ring: 'ring-emerald-100'
    },
    indigo: {
        text: 'text-indigo-600',
        bg: 'bg-indigo-50',
        border: 'border-indigo-200',
        solid: 'bg-indigo-600',
        ring: 'ring-indigo-100'
    },
    orange: {
        text: 'text-orange-600',
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        solid: 'bg-orange-600',
        ring: 'ring-orange-100'
    }
};

export const handoutDetails = {
    1: {
        question: '不用开关，只用代码，怎样让 ESP32 上的小灯亮起来？',
        materials: ['ESP32 开发板', 'USB 数据线', 'PyCharm + MicroPython Tools 插件', 'main.py', '板载 LED（GPIO2）'],
        prompt: '我在用 MicroPython 编程，硬件是 ESP32 开发板。请给我最简单的代码，让板载 LED（GPIO2）亮起来。只要亮就行，不需要闪烁。',
        concepts: [
            { term: 'Pin', meaning: '引脚，板子边上的针脚', studentPrompt: '我想到的联想：__________' },
            { term: 'OUT', meaning: '输出，ESP32 往外发信号', studentPrompt: '它像是在对外说：__________' },
            { term: 'value(1) / value(0)', meaning: '开 / 关，让灯亮或灭', studentPrompt: '1 代表：____；0 代表：____' }
        ],
        coreCode: [
            { code: 'from machine import Pin', hint: '从哪里拿出了什么工具？' },
            { code: 'led = Pin(2, Pin.OUT)', hint: '2 是什么？OUT 是什么？' },
            { code: 'led.value(1)', hint: '1 代表什么？0 呢？' }
        ],
        operationSteps: [
            { title: '连接板子', text: '插 USB 线 → 打开 MicroPython Tools 面板 → 选端口 → 点连接，看到「已连接」才算成功。' },
            { title: '写代码', text: '双击打开 main.py → 写入 3 行核心代码 → 按 Ctrl+S 保存。没保存的代码不会生效。' },
            { title: '上传运行', text: '右键 main.py → 上传到设备 → 按板上 RST 小按钮重启，观察 LED。' }
        ],
        studentTasks: [
            '基础任务 1：照「PyCharm 三步走」点亮 LED，并记录用了几分钟。',
            '基础任务 2：把 led.value(1) 改成 led.value(0)，上传后写下观察结果。',
            '进阶任务 3：把 Pin(2) 改成 Pin(4)，观察灯为什么不亮。',
            '挑战任务 4：用提问四要素向 AI 询问「怎么让 LED 闪烁」。'
        ],
        aiDialogue: [
            { title: '第一问：把四要素说清楚', text: '我使用 MicroPython，硬件是 ESP32，板载 LED 接在 GPIO2，我想让 LED 亮起来。' },
            { title: '第二问：找出核心代码', text: '请只保留真正让 LED 亮起来的 3 行核心代码，并解释每一行。' },
            { title: '第三问：提出下一步挑战', text: '如果我想让 LED 闪烁，需要新增什么代码？哪些是我已经学过的，哪些下节课再学？' }
        ],
        codeReading: [
            'from machine import Pin：从 ESP32 的工具箱里拿出控制引脚的工具',
            'led = Pin(2, Pin.OUT)：把 GPIO2 设置成输出，因为板载 LED 焊在 2 号引脚上',
            'led.value(1)：让 LED 亮；改成 value(0) 就会灭',
            '核心代码只有 3 行，AI 回复里的空行和注释是给人看的说明'
        ],
        flow: ['看老师用 AI 生成代码，先观察它如何提问', '逐行读懂 3 行核心代码，把每行意思写下来', '按 PyCharm 三步走连接、保存、上传、重启', '完成 value(0) 和 Pin(4) 实验，用现象验证代码'],
        verificationSteps: [
            '现象验证：value(1) 上传后灯亮，value(0) 上传后灯灭。',
            '操作验证：只碰 main.py、连接按钮、上传按钮；出问题先查线、连接、保存。',
            '映射验证：Pin(2) 能控制板载 LED，Pin(4) 不亮说明代码必须和真实硬件对应。',
            '理解验证：能向同伴解释 Pin、OUT、value(1)/value(0) 的意思。'
        ],
        discoveries: ['代码能控制真实硬件。', 'AI 能写代码，但我必须读懂。', '改一个参数，真实世界的结果就会改变。'],
        afterClass: [
            '基础：把今天的 3 行核心代码讲给家人听，每一行是做什么的。',
            '记录：写下家人问你的一个问题，下节课带来分享。',
            '拓展：用「语言、硬件、引脚、效果」四要素向 AI 问一个 LED 问题，并保存截图。'
        ],
        output: '完成第 1 课学习单：三组新概念、3 行核心代码解释、基础/进阶任务观察记录、今日三大发现。',
        check: '每组能点亮 LED，并能说出 Pin、OUT、value(1)/value(0) 的意思。'
    },
    2: {
        question: '灯光能不能像密码一样传递信息？',
        materials: ['ESP32 开发板', '板载 LED', '摩斯密码表'],
        prompt: '请用 ESP32 MicroPython 写一个 SOS 闪烁程序，短闪 0.2 秒，长闪 0.6 秒，每个字母之间停 1 秒，并解释循环结构。',
        codeReading: ['sleep() 控制等待时间', 'for 循环用于重复短闪或长闪', '函数可以把“短闪”和“长闪”变成可复用动作'],
        flow: ['先用手拍出 SOS 节奏', '读代码并标出短闪、长闪、停顿', '运行后和节奏表对照', '改一个数字，观察节奏变化'],
        output: '设计自己姓名首字母的闪烁规则。',
        check: '能把「亮多久、灭多久、重复几次」翻译成程序步骤。'
    },
    3: {
        question: 'ESP32 怎么知道有人按下按钮？',
        materials: ['ESP32 开发板', '按钮模块', '杜邦线', 'LED'],
        prompt: '我把按钮接到 GPIO 14，LED 接到 GPIO 2。请写 MicroPython 代码：按下按钮 LED 亮，松开 LED 灭，并说明输入和输出的区别。',
        codeReading: ['Pin.IN 表示输入', 'if 判断根据按钮读数选择动作', '不同按钮模块可能是按下为 0 或按下为 1'],
        flow: ['画出按钮和 LED 接线', '读代码，找出输入引脚和输出引脚', '按下按钮测试逻辑是否相反', '如果相反，修改判断条件'],
        output: '完成一张「我的接线说明卡」：按钮接哪里，LED 接哪里。',
        check: '提问时能清楚写出硬件、引脚、想要的行为。'
    },
    4: {
        question: '小屏幕为什么需要“库”才能说话？',
        materials: ['ESP32 开发板', 'OLED 屏幕', 'DHT11 或模拟温度数据', 'I2C 线'],
        prompt: '我使用 ESP32、MicroPython、SSD1306 OLED。请写代码在屏幕上显示我的名字和温度，并告诉我需要哪些库文件。',
        codeReading: ['import 表示引入别人写好的工具', 'I2C 需要 SDA 和 SCL 两根线', 'show() 通常表示把缓存内容真正显示出来'],
        flow: ['看 OLED 背面的芯片型号或模块说明', '确认 SDA/SCL 接线', '读代码中 import 和 I2C 初始化部分', '把显示文字改成自己的名字'],
        output: '写下自己的 OLED 设备信息：型号、地址、SDA、SCL。',
        check: '知道 AI 不认识具体硬件时，要补充型号、接线和库名。'
    },
    5: {
        question: 'AI 写出来的代码、说出来的话，凭什么相信？它会不会在「骗」我们？',
        materials: ['ESP32 开发板', '一段「能跑但结果错」的示例代码', 'AI 判断标尺卡', '错误信息记录表'],
        prompt: '请告诉我 ESP32 MicroPython 里怎么用 `Pin.RAINBOW` 模式让板载 LED 显示七彩颜色，给出完整代码。',
        codeReading: [
            'AI 会编造不存在的东西（比如根本没有的 Pin.RAINBOW）——这叫「幻觉」',
            'AI 不知道你的真实接线和硬件型号，它其实是在「猜」',
            '同一个问题问两次，答案可能不一样：AI 不是查字典，是在「预测下一个字」',
            '代码能跑通 ≠ 代码做对了你想要的事',
        ],
        flow: [
            '故意「考」AI：问它一个不存在的引脚/函数（如 Pin.RAINBOW），看它会不会一本正经地编',
            '把 AI 给的代码拿去运行，验证它说的到底是真是假',
            '再读一段「能跑但结果错」的代码，体会「跑通也可能是错的」',
            '最后把一个真实报错（不是编的）交给 AI 改，并验证它是否真的改对',
        ],
        output: '完成「AI 判断标尺卡」：写下今天抓到 AI 的几次「不靠谱」，以及你分别是怎么验证的。',
        check: '能说出「AI 为什么会出错」的至少两个原因，遇到 AI 的回答会先验证、再相信。'
    },
    6: {
        question: '为什么同一个任务，问法不同，AI 答案差很多？',
        materials: ['三份不同质量的提示词', 'ESP32 示例任务卡'],
        prompt: '请比较这三个 ESP32 提问，指出哪个最清楚，并按“硬件 + 语言 + 行为 + 约束”的格式改写。',
        codeReading: ['好提示词会说明硬件型号、引脚、编程语言、目标行为', '约束越明确，AI 越少猜', '需求文档比一句话提问更可靠'],
        flow: ['看三个坏问题和好问题', '投票选出最可执行的问题', '用四要素模板重写', '让 AI 生成代码并比较差异'],
        output: '写出自己的 ESP32 标准提问模板。',
        check: '能判断一个提问缺少硬件、语言、行为还是约束。'
    },
    7: {
        question: '温度数据怎样变成报警动作？',
        materials: ['ESP32 开发板', 'DHT11 温湿度传感器', 'OLED 屏幕', 'LED'],
        prompt: '我用 ESP32 MicroPython，DHT11 接 GPIO 15，OLED 是 SSD1306，LED 接 GPIO 2。请分步骤实现：读温湿度、OLED 显示、温度超过 30 度 LED 闪烁报警。',
        codeReading: ['sensor.measure() 表示读取一次数据', 'temperature() 和 humidity() 是读取结果', 'if temp > 30 把数据变成判断'],
        flow: ['先只读温湿度并打印', '再加入 OLED 显示', '最后加入 LED 报警', '每加一步都测试一次'],
        output: '完成一份三步需求单：输入、处理、输出。',
        check: '能把复杂项目拆成可测试的小步骤。'
    },
    8: {
        question: '怎样让灯不是开关，而是慢慢变亮变暗？',
        materials: ['ESP32 开发板', '光敏电阻模块', 'LED', '电阻或 LED 模块'],
        prompt: 'ESP32 MicroPython 中，光敏传感器接 ADC GPIO 34，LED 接 PWM GPIO 2。请写代码：环境越暗，LED 越亮，并解释 ADC 和 PWM。',
        codeReading: ['ADC 读取环境亮度数字', 'PWM duty 控制亮度强弱', 'map 或比例换算把输入范围变成输出范围'],
        flow: ['遮住光敏，看数值变化', '找出亮和暗的大致范围', '把亮度数值映射到 PWM', '反转逻辑实现“越暗越亮”'],
        output: '画一条关系线：光线变暗 → 数值变化 → LED 亮度变化。',
        check: '能解释 ADC 是“看世界”，PWM 是“控制强弱”。'
    },
    9: {
        question: '一条灯带怎样表现情绪和节奏？',
        materials: ['ESP32 开发板', 'WS2812 灯带', '外接电源（视灯数而定）'],
        prompt: '我用 ESP32 MicroPython 控制 8 颗 WS2812 灯珠，数据线接 GPIO 13。请做一个彩虹流水效果，速度可调，并解释颜色数组和循环。',
        codeReading: ['每颗灯珠有 RGB 三个颜色值', 'np.write() 把颜色发送到灯带', '循环中的索引决定哪颗灯先亮'],
        flow: ['先点亮一颗灯珠', '再点亮全部灯珠', '加入颜色变化', '调整速度和方向做出自己的效果'],
        output: '写一份灯效需求文档：颜色、速度、方向、循环方式。',
        check: '能用自然语言精确描述视觉效果。'
    },
    10: {
        question: '一个项目开始前，怎样写清楚需求？',
        materials: ['随机项目题卡', '需求文档模板', 'ESP32 常用模块清单'],
        prompt: '请根据我的项目需求，帮我拆成 ESP32 MicroPython 的硬件清单、输入输出、实现步骤、测试方法和可能风险。需求如下：<粘贴需求>',
        codeReading: ['先看需求，不先看代码', '把功能拆成输入、处理、输出', '每个模块都要有独立测试方法'],
        flow: ['抽取项目题卡', '填写需求文档', '用 AI 检查是否缺信息', '按模块逐个实现并展示'],
        output: '提交一份可执行的 ESP32 项目需求文档。',
        check: '需求足够清楚，别人能按文档开始搭建。'
    },
    11: {
        question: '生活中的小麻烦，能不能变成技术方案？',
        materials: ['观察记录表', 'ESP32 模块清单', '便利贴'],
        prompt: '我观察到一个生活问题：<描述问题>。请帮我 brainstorm 5 个 ESP32 解决方案，并按可行性、成本、展示效果评分。',
        codeReading: ['这一课重点不是代码，而是问题定义', '好问题要具体、有场景、有判断标准', 'AI 可以给建议，但最终选题由学生决定'],
        flow: ['写下真实场景和痛点', '让 AI 给出多个方案', '筛选最适合课堂实现的方案', '确定输入、处理、输出'],
        output: '提交项目提案：问题、用户、方案、需要的传感器。',
        check: '能把生活语言改写成技术需求。'
    },
    12: {
        question: '大项目怎样拆成不会乱的小模块？',
        materials: ['模块图模板', '输入/处理/输出卡片', '项目提案'],
        prompt: '请把我的 ESP32 项目拆成模块图，按输入、处理、输出分类，并列出每个模块的独立测试方法。',
        codeReading: ['模块图比完整代码更先出现', '每个模块都应该能单独测试', '模块之间要约定变量和数据格式'],
        flow: ['画出输入、处理、输出', '给每个模块起名字', '写独立测试问题', '让 AI 检查遗漏和冲突'],
        output: '完成项目模块图和 AI 问题清单。',
        check: '能说明每个模块负责什么，不把所有功能混在一起。'
    },
    13: {
        question: '怎样让每个零件先独立工作？',
        materials: ['学生自选模块', '测试记录表', 'ESP32 开发板'],
        prompt: '我的 ESP32 项目中有这个模块：<模块名和接线>。请只写这个模块的最小测试代码，不要加入其他功能。',
        codeReading: ['最小测试代码越短越好', '一次只验证一个传感器或执行器', '测试结果要记录，方便后面整合'],
        flow: ['按模块清单选择第一个模块', '让 AI 生成最小测试代码', '运行并记录结果', '失败时保存报错和修改过程'],
        output: '提交至少 2 个模块的测试记录。',
        check: '能坚持“先单测，再整合”。'
    },
    14: {
        question: '多段代码合并时为什么容易冲突？',
        materials: ['已测试模块代码', '整合记录表', '变量命名清单'],
        prompt: '请帮我合并下面几段 ESP32 MicroPython 模块代码。要求：保留每个功能，统一引脚定义，避免重复 while True，并解释你改了哪里。',
        codeReading: ['多个 while True 不能简单堆在一起', '重复变量名可能互相覆盖', '引脚定义要统一放在开头'],
        flow: ['贴出已验证的模块代码', '让 AI 先说明合并策略', '合并后逐项测试功能', '发现冲突就回到模块层定位'],
        output: '提交一份整合版代码和冲突处理记录。',
        check: '知道合并不是复制粘贴，而是重新组织程序结构。'
    },
    15: {
        question: '怎样让别人听懂我的技术项目？',
        materials: ['展示稿模板', '项目照片或视频', '三分钟计时器'],
        prompt: '请根据我的 ESP32 项目，帮我写一份 3 分钟展示稿。要求：先讲问题，再讲方案，再讲演示效果，语言适合小学展示。',
        codeReading: ['展示时少讲代码细节，多讲问题和效果', '技术词要翻译成观众听得懂的话', '失败和改进也是故事的一部分'],
        flow: ['整理项目照片和功能清单', '写三段式展示稿', '用 AI 帮忙润色但保留自己的表达', '计时练习并互相提建议'],
        output: '完成三分钟演讲稿和项目展示页。',
        check: '观众能听懂你的项目解决了什么问题。'
    },
    16: {
        question: '一个完整科创项目，怎样接受反馈并继续改进？',
        materials: ['项目成品', '评价表', '复盘表', '投票贴纸'],
        prompt: '请根据我的项目展示反馈，帮我整理复盘：最大收获、最大问题、下一版改进计划。反馈如下：<粘贴反馈>',
        codeReading: ['发布会重点是展示、体验和反馈', '复盘比“做完了”更重要', '下一版计划要具体到一个可实现改动'],
        flow: ['全班轮流展示项目', '同学体验并填写反馈', '整理点赞和建议', '写项目复盘和下一版计划'],
        output: '提交项目复盘：收获、问题、下一步。',
        check: '能接受反馈，并提出具体改进方案。'
    }
};

export const allLessons = courseData.phases.flatMap((phase) =>
    phase.units.map((unit) => ({
        ...unit,
        phaseId: phase.id,
        phaseTitle: phase.title,
        phaseColor: phase.color,
        handout: handoutDetails[unit.num]
    }))
);

export const handoutUsage = [
    { title: '老师备课视图', desc: '看驱动问题、课堂流程、验证方法和达成检查，快速判断这一课怎么推进。' },
    { title: '学生任务视图', desc: '每课都有学生可见任务卡，明确今天要解决什么、观察什么、提交什么。' },
    { title: '打印讲义视图', desc: '点击打印讲义，可直接投屏、打印或另存为 PDF，作为课堂学习单使用。' }
];

export const aiAgreements = [
    {
        phase: 1,
        color: 'emerald',
        icon: BrainCircuit,
        title: '先自己读懂，再问 AI',
        rule: '遇到不会的，先自己读、自己想 3 分钟，再请 AI 帮忙。AI 是帮我学，不是替我想。',
        examples: [
            '✅ 我先读了代码，不懂 value() 是什么，才去问 AI',
            '❌ 题目还没看，直接把题目甩给 AI 要答案',
        ],
    },
    {
        phase: 2,
        color: 'indigo',
        icon: Handshake,
        title: '我出想法，AI 出草稿，决定权在我',
        rule: '需求是我定的，代码是 AI 写的草稿。用不用、怎么改，由我判断，也由我负责。',
        examples: [
            '✅ AI 给了 3 种做法，我比较后选了最适合我项目的',
            '❌ AI 写啥我用啥，出了问题就怪 AI',
        ],
    },
    {
        phase: 3,
        color: 'orange',
        icon: HeartHandshake,
        title: '有些事，只有人能做',
        rule: '发现真问题、关心真实的人、为作品负责——这些 AI 做不了，是我作为「小创客」的价值。',
        examples: [
            '✅ 我观察到奶奶总忘记关灯，才决定做这个项目',
            '❌ 让 AI 替我决定「做什么项目评委印象好」',
        ],
    },
];

export const aiSafetyRedLine = {
    title: '隐私红线（任何阶段都要守）',
    items: [
        '不要把家庭住址、电话、身份证号告诉 AI',
        '不要上传自己或同学的正脸照片、真实全名',
        '拿不准要不要发给 AI 的内容，先问老师',
    ],
};

export const pblCycle = [
    { title: '发现问题', desc: '从生活现象或课堂挑战出发，先提出值得解决的问题。' },
    { title: '拆解需求', desc: '把问题拆成输入、处理、输出和约束，形成可执行任务。' },
    { title: 'AI 协作', desc: '用三轮对话让 AI 生成、解释、修正，而不是只复制答案。' },
    { title: '制作验证', desc: '用 ESP32 运行、观察、记录证据，判断方案是否真的有效。' },
    { title: '展示复盘', desc: '讲清楚问题、方案、证据、AI 的作用和下一版改进。' }
];

export const finalProject = {
    title: '最终挑战：做一个 ESP32 智能小发明',
    drivingQuestion: '我们能不能用 ESP32 和 AI，做出一个能解决真实问题的作品？',
    requirements: [
        '解决一个校园、家庭或生活中的真实问题',
        '至少使用 1 个输入模块和 1 个输出模块',
        '至少保留 2 轮 AI 对话修改记录',
        '有模块测试记录和整合调试记录',
        '完成 3 分钟项目展示和项目复盘'
    ],
    deliverables: ['项目提案', '模块图', '测试记录', '整合代码', '展示稿', '项目复盘']
};

export const rubric = [
    {
        criterion: '问题定义',
        levels: ['问题模糊，像是在做练习', '能说出现象，但对象和场景不清楚', '问题具体，有使用场景和目标用户', '问题真实、有证据，并能说明为什么值得解决']
    },
    {
        criterion: '工程实现',
        levels: ['作品不能稳定运行', '单个模块能运行，但整合不稳定', '主要功能能运行，有基础测试记录', '功能稳定，测试充分，并能解释关键设计选择']
    },
    {
        criterion: 'AI 协作',
        levels: ['只复制 AI 代码', '能向 AI 提问，但缺少验证', '能让 AI 解释和修改，并记录过程', '能批判 AI 输出，用证据判断和迭代方案']
    },
    {
        criterion: '表达展示',
        levels: ['只展示现象，讲不清问题', '能介绍作品功能', '能按问题、方案、证据讲清项目', '表达有故事、有反思，能回应同伴反馈']
    }
];

export const makeStudentTasks = (lesson) => lesson.handout.studentTasks || [
    `我要解决：${lesson.handout.question}`,
    `我要观察：运行结果是否符合“${lesson.project}”。`,
    `我要验证：${lesson.handout.check}`,
    `我要提交：${lesson.handout.output}`
];

export const makeAiDialogue = (lesson) => lesson.handout.aiDialogue || [
    { title: '第一问：生成方案', text: lesson.handout.prompt },
    { title: '第二问：要求解释', text: '请逐行解释这段代码，指出我必须根据自己硬件修改的引脚、库名或参数。' },
    { title: '第三问：带证据修正', text: '这是我的运行现象、报错信息和接线说明，请只修改必要部分，并解释为什么这样改。' }
];

export const makeVerificationSteps = (lesson) => lesson.handout.verificationSteps || [
    `现象验证：实际效果是否完成“${lesson.project}”。`,
    '接线验证：逐一核对电源、GND、信号线和 GPIO 编号。',
    '代码验证：改动一个关键参数，观察结果是否按预期变化。',
    `理解验证：学生能用自己的话说明“${lesson.keySkill}”。`
];

export const NAV_ITEMS = [
    { id: 'concept', label: '课程理念' },
    { id: 'roadmap', label: '三阶段路线' },
    { id: 'handbook', label: '课堂讲义' },
    { id: 'assess', label: '成果评价' },
];
