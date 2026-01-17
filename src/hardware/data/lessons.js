
import {
    Lightbulb,
    MousePointer2,
    TrafficCone,
    Gauge,
    Mic2,
    Fan,
    Bot,
    Sun,
    Shield,
    Zap,
    Bell,
    Thermometer,
    BoomBox,
    AlertTriangle,
    Music,
    Home
} from 'lucide-react';

export const hardwareLessons = [
    {
        id: 1,
        title: "第 1 课：你好，闪亮世界",
        description: "学习LED原理，点亮你的第一个电子世界。",
        icon: Lightbulb,
        mode: "realtime",
        status: "ready",
        components: ["Arduino Uno", "扩展板", "LED (HS-F08A)"],
        objectives: "认识 Arduino 与扩展板 (HS-UNO-EXP)，掌握 GVS 接线与 Mind+ 实时模式。",
        story: "欢迎来到电光城！这里一片漆黑，市长说需要一位能点亮城市的魔法师。同学们，你们手中的 LED 就是魔法宝石，只要念对咒语（编程），它就能发光！",
        knowledge: "LED原理、实时交互。GND(地/黑)是回家的路，VCC(电/红)是能量午餐，S(信号/绿)是指挥官的命令。",
        wiring: "LED → D13",
        tips: "1. 扩展板 D13 旁通常有板载 LED (L 灯)，不接线也能亮；2. LED 模块严禁反接。",
        quotes: [
            "GVS 接线口诀：黑线踩地板(GND)，红线吃苹果(VCC)，绿线送信件(Signal)。",
            "数字信号只有两个表情：要么高兴地 ‘亮’ (1)，要么睡觉 ‘灭’ (0)。",
            "为什么以后要学上传？因为实时模式像牵着手走路，上传模式就是你可以自己去上学啦！"
        ],
        path: '/hardware/lesson/1',
        hardware: 'LED (HS-F08A)',
        tags: ['Arduino Uno', '扩展板', 'LED (HS-F08A)'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l1_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l1_wiring.png',
        mindPlus: [
            { type: 'event', text: '当 绿旗 被点击' },
            { type: 'control', text: '重复执行', indent: 0 },
            { type: 'action', text: '设置数字引脚 13 输出 高电平 (亮)', indent: 1 },
            { type: 'time', text: '等待 1 秒', indent: 1 },
            { type: 'action', text: '设置数字引脚 13 输出 低电平 (灭)', indent: 1 },
            { type: 'time', text: '等待 1 秒', indent: 1 }
        ]
    },
    {
        id: 2,
        title: "第 2 课：我是指挥官",
        description: "掌握数字输入，用按钮控制电路。",
        icon: MousePointer2,
        mode: "realtime",
        components: ["按钮 (HS-KEY1L)"],
        objectives: "掌握按键开关 (HS-KEY1L) 的数字输入特性与条件判断。",
        story: "电光城的灯修好了，但不能总亮着呀。我们需要一个 ‘开关指挥官’！按下按钮，熊猫（屏幕角色）就变身；松开按钮，它就变回来。",
        knowledge: "数字输入。按钮连接 D2。按钮按下是低电平，抬起是高电平。Mind+ 中使用 “如果...那么...否则” 积木。",
        wiring: "按钮 → D2",
        tips: "1. 按钮抖动可能导致 “变身” 闪烁，暂时忽略或加小延时；2. 区分 “按下时” 与 “按了一下”。",
        quotes: [
            "按钮就像门铃，按下就是 ‘叮咚’(1)，松手就是 ‘安静’(0)。",
            "‘如果...否则’ 就像妈妈的话：如果写完作业，就看电视；否则，就去刷碗！",
            "电脑不知道你在想什么，它只知道你按没按那个 D2 键。"
        ],
        path: '/hardware/lesson/2',
        hardware: '按钮 (HS-KEY1L)',
        tags: ['按钮开关', '数字输入'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l2_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l2_wiring.png',
        mindPlus: [
            { type: 'event', text: '当 绿旗 被点击' },
            { type: 'control', text: '重复执行', indent: 0 },
            { type: 'control', text: '如果 <数字引脚 2 (按下)> 那么', indent: 1 },
            { type: 'action', text: '造型切换为 [panda-a]', indent: 2 },
            { type: 'control', text: '否则', indent: 1 },
            { type: 'action', text: '造型切换为 [panda-b]', indent: 2 }
        ]
    },
    {
        id: 3,
        title: "第 3 课：交通指挥灯",
        description: "学习顺序结构，模拟交通信号灯逻辑。",
        icon: TrafficCone,
        mode: "realtime",
        components: ["交通灯 (HS-F05A)"],
        objectives: "学习顺序结构与延时，搭建交通灯 (HS-F05A)。",
        story: "十字路口乱套了！我们需要设计一套红绿灯。红灯亮 3 秒，绿灯亮 3 秒，黄灯闪 1 秒，永远循环下去。",
        knowledge: "顺序结构、延时逻辑。红灯亮->延时->灭; 黄灯闪烁; 绿灯亮->延时->灭。",
        wiring: "红 → D13, 黄 → D12, 绿 → D11 (GND共用)",
        tips: "1. 延时积木会 “暂停” 整个程序，期间按按钮没反应（阻塞）；2. 记得 “亮一个灯” 的同时要 “灭其他灯”。",
        quotes: [
            "程序就像排队打饭，先做第一件事，做完了才能做第二件，不能插队。",
            "延时积木就是 ‘木头人’ 时间，电脑数 1-2-3，期间谁叫它都不理。",
            "红灯停，绿灯行，黄灯亮了等一等。写程序也要守规矩哦。"
        ],
        path: '/hardware/lesson/3',
        hardware: '交通灯 (HS-F05A)',
        tags: ['顺序结构', '交通灯'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l3_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l3_wiring.png',
        mindPlus: [
            { type: 'event', text: '当 绿旗 被点击' },
            { type: 'control', text: '重复执行', indent: 0 },
            { type: 'action', text: '设置数字引脚 13 输出 高 (红亮)', indent: 1 },
            { type: 'time', text: '等待 3 秒', indent: 1 },
            { type: 'action', text: '设置数字引脚 13 输出 低 (红灭)', indent: 1 },
            { type: 'action', text: '设置数字引脚 12 输出 高 (黄亮)', indent: 1 },
            { type: 'time', text: '等待 1 秒', indent: 1 },
            { type: 'action', text: '设置数字引脚 12 输出 低 (黄灭)', indent: 1 },
            { type: 'action', text: '设置数字引脚 11 输出 高 (绿亮)', indent: 1 },
            { type: 'time', text: '等待 3 秒', indent: 1 },
            { type: 'action', text: '设置数字引脚 11 输出 低 (绿灭)', indent: 1 }
        ]
    },
    {
        id: 4,
        title: "第 4 课：魔法调光师",
        description: "使用旋钮控制LED亮度，探索模拟输入与PWM。",
        icon: Gauge,
        mode: "realtime",
        components: ["旋钮 (HS-S28A)", "LED (HS-F08A)"],
        objectives: "认识模拟输入 (HS-S28A 旋钮) 与 PWM 调光。",
        story: "为什么灯只能 ‘开’ 和 ‘关’？能不能像手机屏幕一样，想亮就亮，想暗就暗？有请 ‘旋钮魔法师’！",
        knowledge: "模拟输入、PWM。旋钮(0-1023) -> 映射 -> LED(0-255)。",
        wiring: "旋钮 → A0, LED → D5 (PWM)",
        tips: "1. 只有带波浪号 (~) 的引脚支持 PWM 调光；2. 旋钮转到底数值跳变是因为接触不良。",
        quotes: [
            "模拟信号就像滑滑梯，可以停在半山腰，不只有山顶 (1) 和山脚 (0)。",
            "旋钮是 1000 级的台阶，但灯泡只能听懂 255 级的话，所以我们要用 ‘翻译官’（映射）。",
            "A0 的 A 就是 Analog（模拟），专门听那些 ‘差不多’ 的话。"
        ],
        path: '/hardware/lesson/4',
        hardware: '旋钮 (HS-S28A)',
        tags: ['模拟输入', 'PWM调光'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l4_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l4_wiring.png',
        mindPlus: [
            { type: 'event', text: '当 绿旗 被点击' },
            { type: 'control', text: '重复执行', indent: 0 },
            { type: 'action', text: '设置 PWM引脚 5 输出 <读取模拟引脚 A0> / 4', indent: 1 }
        ]
    },
    {
        id: 5,
        title: "第 5 课：嗓门大比拼",
        description: "利用声音传感器制作声控装置。",
        icon: Mic2,
        mode: "realtime",
        components: ["声音传感器 (HS-S05A)"],
        objectives: "使用声音传感器 (HS-S05A) 控制互动。",
        story: "狮子吼比赛开始啦！谁的声音大，屏幕上的气球就吹得越大。",
        knowledge: "声音传感、阈值。读取模拟值，根据数值大小改变角色大小或 LED 闪烁速度。需先观察环境噪音的 “基准值”。",
        wiring: "声音传感器 → A2",
        tips: "1. 声音传感器需要调节灵敏度电位器（蓝色小方块）；2. 瞬间大喊数值跳动快，程序反应要灵敏。",
        quotes: [
            "传感器是 Arduino 的耳朵，但它听不懂歌词，只能听出 ‘吵不吵’。",
            "如果环境很吵，你的 ‘耳朵’ 就要调迟钝点（调节阈值），不然它会以为大家都在吼。",
            "把声音的大小变成了数字，这就是 ‘数字化’ 魔法。"
        ],
        path: '/hardware/lesson/5',
        hardware: '声音传感器 (HS-S05A)',
        tags: ['模拟输入', '声音传感'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l5_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l5_wiring.png',
        mindPlus: [
            { type: 'event', text: '当 绿旗 被点击' },
            { type: 'control', text: '重复执行', indent: 0 },
            { type: 'control', text: '如果 <读取模拟引脚 A2> > 500 那么', indent: 1 },
            { type: 'action', text: '将 [角色] 大小设为 200', indent: 2 },
            { type: 'control', text: '否则', indent: 1 },
            { type: 'action', text: '将 [角色] 大小设为 100', indent: 2 }
        ]
    },
    {
        id: 6,
        title: "第 6 课：超级凉爽风",
        description: "学习电机控制，制作简易风扇。",
        icon: Fan,
        mode: "realtime",
        components: ["风扇驱动 (HS-F04A)", "旋钮 (HS-S28A)"],
        objectives: "掌握电机驱动模块 (HS-F04A) 与 PWM 调速。",
        story: "夏天到了，风扇只有 ‘开’ 和 ‘关’ 太不高级了。我要做一个能无级变速的超级风扇，转得快慢由我说了算！",
        knowledge: "电机控制、模拟输出。电机不能直接插 IO 口（电流太大），必须用驱动模块。A0 数值映射后给 D5。",
        wiring: "风扇驱动 IN → D5, 旋钮 → A0",
        tips: "1. 扇叶高速旋转注意手指安全；2. USB 供电可能不足，风扇转速慢是正常的。",
        quotes: [
            "电机是个大力士，Arduino 也是个小书生，直接牵手会把书生累坏，所以要请 ‘搬运工’（驱动模块）。",
            "PWM 就像开关灯超级快，快到风扇以为一直在通电，但力量被平均了。",
            "手不要碰扇叶，虽然它很小，但转起来也是 ‘小老虎’ 哦！"
        ],
        path: '/hardware/lesson/6',
        hardware: '风扇驱动 (HS-F04A)',
        tags: ['电机控制', 'PWM'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l6_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l6_wiring.png',
        mindPlus: [
            { type: 'event', text: '当 绿旗 被点击' },
            { type: 'control', text: '重复执行', indent: 0 },
            { type: 'variable', text: '变量 fan_speed = 映射(读取A0, 0, 1023, 0, 255)', indent: 1 },
            { type: 'action', text: '设置 PWM引脚 5 输出 fan_speed', indent: 1 }
        ]
    },
    {
        id: 7,
        title: "第 7 课：招财猫的问候",
        description: "控制舵机角度，制作会招手的招财猫。",
        icon: Bot,
        mode: "realtime",
        components: ["9g舵机 (SG90)"],
        objectives: "掌握 9g 舵机 (SG90) 的角度控制 (0-180°)。",
        story: "便利店门口的招财猫怎么招手？我们也来做一个！有人按门铃，它就挥挥手欢迎。",
        knowledge: "舵机控制 (0-180°)。逻辑：按下按钮 → 转到 45 度 → 延时 → 转到 135 度 → 延时。",
        wiring: "舵机信号线(橙) → D9",
        tips: "1. 舵机不能转 360 度，不要用手硬掰；2. 两个舵机同时动可能拉低电压导致复位。",
        quotes: [
            "舵机是精确的机器人手臂，告诉它去 90 度，它绝不去 91 度。",
            "挥手就像做操，伸手—停顿—缩手—停顿，没有停顿（延时）就会抽筋。",
            "千万别硬掰它的胳膊，里面的齿轮牙齿很脆弱的！"
        ],
        path: '/hardware/lesson/7',
        hardware: '9g舵机 (SG90)',
        tags: ['舵机控制', '角度'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l7_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l7_wiring.png',
        mindPlus: [
            { type: 'event', text: '当 绿旗 被点击' },
            { type: 'control', text: '重复执行', indent: 0 },
            { type: 'action', text: '舵机引脚 9 转动到 45 度', indent: 1 },
            { type: 'time', text: '等待 1 秒', indent: 1 },
            { type: 'action', text: '舵机引脚 9 转动到 135 度', indent: 1 },
            { type: 'time', text: '等待 1 秒', indent: 1 }
        ]
    },
    {
        id: 8,
        title: "第 8 课：光影魔术手",
        description: "光敏传感器应用，制作光控装置。",
        icon: Sun,
        mode: "realtime",
        components: ["光敏传感器 (HS-S20A)"],
        objectives: "深入理解光敏传感器 (HS-S20A) 的模拟值特性。",
        story: "变色龙会随环境变色，我们的舞台背景也能！用手遮住光敏传感器，背景变黑夜；移开手，背景变白天。",
        knowledge: "光敏传感、软硬互动。光敏接 A1。观察 “正常光” 与 “遮挡光” 的数值差，设定中间值为 “阈值”。",
        wiring: "光敏传感器 → A1",
        tips: "环境光线变化会影响阈值，换个教室可能需要重新校准。",
        quotes: [
            "阈值就是一道门槛，跨过去是一个世界，跨不过去是另一个世界。",
            "光敏电阻怕黑，越黑它就越懒（电阻大），电流就越小。",
            "今天在窗口校准的数据，到了墙角可能就不灵了，因为光线变了。"
        ],
        path: '/hardware/lesson/8',
        hardware: '光敏传感器 (HS-S20A)',
        tags: ['模拟输入', '光敏'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l8_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l8_wiring.png',
        mindPlus: [
            { type: 'event', text: '当 绿旗 被点击' },
            { type: 'control', text: '重复执行', indent: 0 },
            { type: 'action', text: '说 <读取模拟引脚 A1>', indent: 1 }
        ]
    },
    {
        id: 9,
        title: "第 9 课：独立小卫士",
        description: "进阶上传模式，让程序脱机运行。",
        icon: Shield,
        mode: "upload",
        components: ["LED (HS-F08A)"],
        objectives: "理解 “上传模式” 与 “脱机运行”，烧录第一个离线程序。",
        story: "之前的程序都要连着电脑线，拔线就 ‘死’ 了。真正的机器人是可以带着脑子独立出门的！今天我们让警示灯离开电脑也能闪烁。",
        knowledge: "上传模式、脱机运行。1. 切换模式; 2. 编写主程序; 3. 上传; 4. 外接电源测试。",
        wiring: "LED → D13",
        tips: "1. 上传时不要占用串口（如串口监视器未关闭）；2. 驱动安装提示 (CH34x)。",
        quotes: [
            "上传就是把你的聪明才智（程序）装进 Arduino 的脑子里，永久保存。",
            "拔掉 USB 线，装上电池，它就是一个有灵魂的独立机器人了！",
            "上传时 LED 会乱闪，那是它们在 ‘吞’ 数据，不要打断它。"
        ],
        path: '/hardware/lesson/9',
        hardware: 'LED (HS-F08A)',
        tags: ['上传模式', '脱机运行'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l9_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l9_wiring.png',
        mindPlus: [
            { type: 'event', text: 'Arduino 程序 (主程序)' },
            { type: 'control', text: '循环执行', indent: 0 },
            { type: 'action', text: '设置数字引脚 13 输出 高', indent: 1 },
            { type: 'time', text: '等待 1000 毫秒', indent: 1 },
            { type: 'action', text: '设置数字引脚 13 输出 低', indent: 1 },
            { type: 'time', text: '等待 1000 毫秒', indent: 1 }
        ]
    },
    {
        id: 10,
        title: "第 10 课：智能楼道灯",
        description: "逻辑与应用：光线暗且有人时才亮灯。",
        icon: Zap,
        mode: "upload",
        components: ["光敏 (HS-S20A)", "按钮 (HS-KEY1L)"],
        objectives: "逻辑 “与” 应用，光敏 + 按钮组合。",
        story: "楼道灯白天不亮，晚上没人也不亮。只有 ‘天黑’ 且 ‘有人’ 时才亮。这是怎么做到的？",
        knowledge: "逻辑与、多条件判断。如果 (光线<300) 且 (按钮==1) 那么 开灯。",
        wiring: "光敏 → A1, 按钮 → D2",
        tips: "增加延时熄灭功能：开灯后延时 5秒 再关灯。",
        quotes: [
            "‘与’ 逻辑是最严格的老师，两个条件必须都满分 (True)，才给你发小红花。",
            "不仅要聪明，还要节约。这就是智能家居的初衷。",
            "程序里的 ‘等待 5 秒’ 就是现实中的 ‘为你留灯 5 秒’。"
        ],
        path: '/hardware/lesson/10',
        hardware: '光敏+按钮',
        tags: ['逻辑判断', '智能控制'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l10_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l10_wiring.png',
        mindPlus: [
            { type: 'event', text: 'Arduino 程序' },
            { type: 'control', text: '循环执行', indent: 0 },
            { type: 'control', text: '如果 <(读取A1 < 300) 且 (数字引脚2 按下)> 那么', indent: 1 },
            { type: 'action', text: '设置数字引脚 13 输出 高', indent: 2 },
            { type: 'control', text: '否则', indent: 1 },
            { type: 'action', text: '设置数字引脚 13 输出 低', indent: 2 }
        ]
    },
    {
        id: 11,
        title: "第 11 课：小小报警器",
        description: "逻辑或/非应用，制作防盗报警器。",
        icon: Bell,
        mode: "upload",
        components: ["光敏 (HS-S20A)", "蜂鸣器 (HS-F07A)", "按钮 (HS-KEY1L)"],
        objectives: "逻辑 “或” 与 “非”，使用有源蜂鸣器。",
        story: "保险柜很安全，但如果有人撬锁（按钮按下）或者偷偷照手电筒（光线突变），报警器都要响！只要满足一个条件就报警。",
        knowledge: "逻辑或/非、蜂鸣器。使用 “或” 积木。有源蜂鸣器只要通高电平就响。",
        wiring: "光敏 → A1, 按钮 → D2, 蜂鸣器 → D8",
        tips: "有源蜂鸣器只要通高电平就响，不需要 PWM。",
        quotes: [
            "‘或’ 逻辑是宽容的老师，只要做对一道题（满足一个条件），就算你及格。",
            "有源蜂鸣器是 ‘傻瓜版’，给电就叫；无源蜂鸣器是 ‘歌唱家’，要给谱子（频率）才唱。",
            "安全系统宁可错杀一千（误报），不可放过一个（漏报）。"
        ],
        path: '/hardware/lesson/11',
        hardware: '蜂鸣器 (HS-F07A)',
        tags: ['报警系统', '逻辑运算'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l11_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l11_wiring.png',
        mindPlus: [
            { type: 'event', text: 'Arduino 程序' },
            { type: 'control', text: '循环执行', indent: 0 },
            { type: 'control', text: '如果 <(读取A1 < 100) 或 (数字引脚2 按下)> 那么', indent: 1 },
            { type: 'action', text: '设置数字引脚 8 输出 高 (响)', indent: 2 },
            { type: 'control', text: '否则', indent: 1 },
            { type: 'action', text: '设置数字引脚 8 输出 低 (静)', indent: 2 }
        ]
    },
    {
        id: 12,
        title: "第 12 课：智能温控扇",
        description: "自动控制与滞回区间，智能调节温度。",
        icon: Thermometer,
        mode: "upload",
        components: ["旋钮 (HS-S28A)", "风扇 (HS-F04A)"],
        objectives: "模拟量阈值控制与滞回区间 (Hysteresis)。",
        story: "用旋钮模拟温度。超过 30 度（数值>600）风扇转；低于 28 度（数值<550）风扇停。中间留个空档防止风扇 ‘抽风’。",
        knowledge: "自动控制、滞回区间。简单的 if > 600 then ON, if < 550 then OFF。避免在 600 附近反复跳变。",
        wiring: "旋钮 → A0, 风扇 → D5",
        tips: "滞回区间的设定是为了保护设备，防止频繁启停。",
        quotes: [
            "如果只设一个界限，风扇会在临界点 ‘犹豫不决’，开开关关会坏掉的。",
            "给它一点 ‘缓冲地带’，这就是工程师的智慧。",
            "自动控制就是让机器学会 ‘看脸色（数据）行事’。"
        ],
        path: '/hardware/lesson/12',
        hardware: '温控风扇',
        tags: ['自动控制', '滞回区间'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l12_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l12_wiring.png',
        mindPlus: [
            { type: 'event', text: 'Arduino 程序' },
            { type: 'control', text: '循环执行', indent: 0 },
            { type: 'variable', text: 'temp = 读取模拟引脚 A0', indent: 1 },
            { type: 'control', text: '如果 <temp > 600> 那么', indent: 1 },
            { type: 'action', text: '设置数字引脚 5 输出 高 (风扇转)', indent: 2 },
            { type: 'control', text: '如果 <temp < 550> 那么', indent: 1 },
            { type: 'action', text: '设置数字引脚 5 输出 低 (风扇停)', indent: 2 }
        ]
    },
    {
        id: 13,
        title: "第 13 课：自动道闸机",
        description: "超声波测距与舵机联动，制作自动闸门。",
        icon: BoomBox,
        mode: "upload",
        components: ["超声波 (HS-SR04)", "舵机 (SG90)"],
        objectives: "掌握超声波测距 (HS-SR04) 与舵机联动。",
        story: "停车场门口，车来了杆子自动抬起，车走了杆子放下。超声波模块就是 ‘蝙蝠眼’。",
        knowledge: "超声波测距、联动。Trig 发出，Echo 接收。逻辑：如果 距离 < 10cm，舵机转 90 度（抬杆）；否则转 0 度（落杆）。",
        wiring: "Trig → D6, Echo → D7, 舵机 → D9",
        tips: "超声波测距遇到吸音材质或角度过大可能失效。",
        quotes: [
            "超声波是喊出去再听回声。如果回声回来得快，说明墙很近；回来得慢，说明墙很远。",
            "道闸机如果不知道车走了就砸下来，那是会赔钱的！所以检测逻辑要严谨。",
            "看不见的声波也能帮我们量尺子量不到的地方。"
        ],
        path: '/hardware/lesson/13',
        hardware: '超声波 (HS-SR04)',
        tags: ['超声波', '舵机联动'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l13_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l13_wiring.png',
        mindPlus: [
            { type: 'event', text: 'Arduino 程序' },
            { type: 'control', text: '循环执行', indent: 0 },
            { type: 'variable', text: 'dist = 读取超声波距离(T:6, E:7)', indent: 1 },
            { type: 'control', text: '如果 <dist < 10> 那么', indent: 1 },
            { type: 'action', text: '舵机(9) 转到 90 度 (抬杆)', indent: 2 },
            { type: 'control', text: '否则', indent: 1 },
            { type: 'action', text: '舵机(9) 转到 0 度 (落杆)', indent: 2 }
        ]
    },
    {
        id: 14,
        title: "第 14 课：倒车请注意",
        description: "多级判断与频率报警，模拟倒车雷达。",
        icon: AlertTriangle,
        mode: "upload",
        components: ["超声波 (HS-SR04)", "蜂鸣器 (HS-F07A)"],
        objectives: "多级距离判断与蜂鸣器频率提示。",
        story: "倒车雷达大家听过吗？离墙越近，滴滴声越急。我们来模拟这个过程。",
        knowledge: "多级判断、频率报警。1. 距离 > 20cm: 不响; 2. 10cm < 距离 < 20cm: 慢响; 3. 距离 < 10cm: 急响。",
        wiring: "超声波 → D6/D7, 蜂鸣器 → D8",
        tips: "delay() 会阻塞测距，高级做法是用 millis()，但在初阶课中我们接受轻微的测量延迟。",
        quotes: [
            "声音越急促，心里越紧张，这就是用声音传递 ‘危险’ 的信号。",
            "分段判断就像切蛋糕，把距离切成 ‘安全区’、‘警告区’ 和 ‘危险区’。",
            "在这个程序里，你的耳朵和你的手一样重要。"
        ],
        path: '/hardware/lesson/14',
        hardware: '超声波+蜂鸣器',
        tags: ['多级判断', '倒车雷达'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l14_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l14_wiring.png',
        mindPlus: [
            { type: 'event', text: 'Arduino 程序' },
            { type: 'control', text: '循环执行', indent: 0 },
            { type: 'variable', text: 'dist = 超声波距离', indent: 1 },
            { type: 'control', text: '如果 <dist < 10> 那么', indent: 1 },
            { type: 'action', text: '蜂鸣器(8) 播放 1000Hz, 0.1秒', indent: 2 },
            { type: 'time', text: '等待 0.1 秒', indent: 2 },
            { type: 'control', text: '否则如果 <dist < 20> 那么', indent: 1 },
            { type: 'action', text: '蜂鸣器(8) 播放 500Hz, 0.5秒', indent: 2 },
            { type: 'time', text: '等待 0.5 秒', indent: 2 }
        ]
    },
    {
        id: 15,
        title: "第 15 课：声控音乐盒",
        description: "声音触发与节奏识别，制作互动音乐盒。",
        icon: Music,
        mode: "upload",
        components: ["声音传感器 (HS-S05A)", "蜂鸣器"],
        objectives: "声音触发与简易节奏识别。",
        story: "我要做一个听话的音乐盒，拍一下手，它就唱一首歌。",
        knowledge: "声音触发、节奏识别。等待声音 > 阈值 → 播放旋律 (Tone 积木) → 停止。为防止误触，可以加计数变量。",
        wiring: "声音 → A2, 蜂鸣器 → D8",
        tips: "有时候它 ‘耳背’ 听不见，有时候 ‘神经过敏’ 乱唱，这就是阈值没调好的锅。",
        quotes: [
            "声音传感器虽然听不懂 ‘哆来咪’，但它能听懂 ‘啪！’ 的一声命令。",
            "程序里的乐谱，就是把简谱翻译成频率数字。",
            "有时候它 ‘耳背’ 听不见，有时候 ‘神经过敏’ 乱唱，这就是阈值没调好的锅。"
        ],
        path: '/hardware/lesson/15',
        hardware: '声音传感+音乐',
        tags: ['声音触发', '音乐编程'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l15_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l15_wiring.png',
        mindPlus: [
            { type: 'event', text: 'Arduino 程序' },
            { type: 'control', text: '循环执行', indent: 0 },
            { type: 'control', text: '如果 <读取模拟A2 > 600> 那么', indent: 1 },
            { type: 'action', text: '蜂鸣器(8) 播放音符 C4 (Do) 0.5拍', indent: 2 },
            { type: 'action', text: '蜂鸣器(8) 播放音符 D4 (Re) 0.5拍', indent: 2 },
            { type: 'action', text: '蜂鸣器(8) 播放音符 E4 (Mi) 0.5拍', indent: 2 }
        ]
    },
    {
        id: 16,
        title: "第 16 课：未来智慧屋",
        description: "综合项目设计，打造你的智能家居。",
        icon: Home,
        mode: "upload",
        components: ["综合模块"],
        objectives: "综合运用所有模块，设计智能家居系统。",
        story: "请你设计一个智慧屋，必须包含至少 3 个智能功能（如声控灯、防盗窗、自动门）。画出设计图，接好线，写出程序，并向全班展示。",
        knowledge: "综合项目、工程迭代。需求分析 → 硬件选型 → 接线测试 → 编程调试 → 迭代优化。",
        wiring: "自定义",
        tips: "评价标准：创意性、功能稳定性、代码整洁度。",
        quotes: [
            "最好的工程师不是一次就做对，而是最快发现错误并修好它的人。",
            "你们手中的线和板子，就是搭建未来的乐高积木。",
            "今天课程结束了，但你们的创客之旅才刚刚开始！Keep Making！"
        ],
        path: '/hardware/lesson/16',
        hardware: '综合项目',
        tags: ['期末项目', '工程设计'],
        heroImage: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/scenarios/l16_hero.jpg',
        wiringDiagram: 'https://cdn.jsdelivr.net/gh/Dora321/gesp-assets@main/images/hardware/diagrams/l16_wiring.png',
        mindPlus: [
            { type: 'event', text: 'Mind+ 主程序 (自定义)' },
            { type: 'comment', text: '// 请根据你的设计图编写程序', indent: 0 },
            { type: 'comment', text: '// 包含：输入传感器 logic -> 输出执行器 action', indent: 0 }
        ]
    }
];
