// ESP32 × AI 科创课程（第五版）——面向小学高年级的 35 课时体系。
//
// 内容整合自本地课件库「5.ESP32_Micropython项目(AI深度参与版)」：每课都有教案、
// 学生讲义、课堂 PPT 三件套，这里抽取的是学生讲义里的课程目标与起步代码——
// 也就是学生真正要动手做的那部分。
//
// 课程的主线不是 MicroPython 语法，而是 AI 角色的五段演进：
// 代码打印机 → 实习程序员 → 工具箱 → 协作伙伴 → 系统部件。
// 改动课号或阶段划分时，要同时检查相邻课的前后引用。

export const esp32Stages = [
 {
 id: 1,
 title: '读懂 AI',
 color: 'emerald',
 aiRole: 'AI 是「代码打印机」',
 description: '学生只读代码不写代码，先建立「能看懂、能判断」的底气。',
 drivingQuestion: 'AI 写出来的代码，我们能不能相信？',
 lessonRange: 'L1–L5',
 lessonCount: 5,
 },
 {
 id: 2,
 title: '指挥 AI',
 color: 'blue',
 aiRole: 'AI 是「实习程序员」',
 description: '用提问五要素（语言 / 硬件 / 引脚 / 效果 / 约束）把需求说清楚。',
 drivingQuestion: '怎么让 AI 写出我真正想要的代码？',
 lessonRange: 'L6–L10',
 lessonCount: 5,
 },
 {
 id: 3,
 title: '超越 AI',
 color: 'violet',
 aiRole: 'AI 是「工具箱」',
 description: '从「完成老师的题」转向「定义自己的问题」，做出属于自己的作品。',
 drivingQuestion: '我想解决的问题是什么？',
 lessonRange: 'L11–L16',
 lessonCount: 6,
 },
 {
 id: 4,
 title: '驾驭 AI · 物联网',
 color: 'amber',
 aiRole: 'AI 是「协作伙伴」',
 description: '作品第一次连上云：能连、能传、能控，还要能应对断网。',
 drivingQuestion: '作品离开这张桌子还能用吗？',
 lessonRange: 'L17–L27',
 lessonCount: 11,
 },
 {
 id: 5,
 title: '融合 AI',
 color: 'rose',
 aiRole: 'AI 是「系统部件」',
 description: '把语音、视觉这些 AI 能力装进自己的作品里。',
 drivingQuestion: 'AI 不只是帮我写代码，它能成为作品的一部分吗？',
 lessonRange: 'L28–L35',
 lessonCount: 8,
 },
];

export const esp32Lessons = [
 {
 num: 1,
 title: 'LED亮了',
 stageId: 1,
 hook: '今天，我们用代码控制真实世界',
 goal: '让一个真实的小灯亮起来——用代码，不用开关。所有的机器人、智能小车、自动种植舱，第一步都是这个：让电脑控制一个真实世界的东西。',
 },
 {
 num: 2,
 title: '闪烁密码',
 stageId: 1,
 hook: '今天，让我们的灯有了节奏',
 goal: '让 LED 发出 SOS 求救信号——给代码加上时间的魔法。只让灯亮着是不够的，我们要控制它亮多久、灭多久，还要让它一直重复！',
 },
 {
 num: 3,
 title: '谁按了按钮',
 stageId: 1,
 hook: '今天，给代码装上「触觉」',
 goal: '让电脑听懂我们的指挥——学会接收「输入」信号。灯不能只会自己闪，它得听我们的。今天我们要用按钮来控制它！',
 },
 {
 num: 4,
 title: '小屏幕说话了',
 stageId: 1,
 hook: '今天，给 ESP32 装上一张「脸」',
 goal: '让 ESP32 学会「说话」——给它装上一块小屏幕（OLED），直接显示文字。一亮一灭发暗号太费劲了，有了屏幕，它想说什么就写什么！',
 },
 {
 num: 5,
 title: 'AI错了',
 stageId: 1,
 hook: '',
 goal: 'AI 写的代码也会出错——今天我们故意找茬！修好四段有 bug 的代码，学会把红色报错当成「藏宝图」，顺着它抓住藏起来的虫子。',
 },
 {
 num: 6,
 title: '好问题vs坏问题',
 stageId: 2,
 hook: '',
 goal: '从今天起，AI 从「代码打印机」升级成你的「实习程序员」——你来当项目经理，用五要素指挥它写代码。今天的实战：设计一个属于你的「暗号灯」。',
 },
 {
 num: 7,
 title: '温度播报员',
 stageId: 2,
 hook: '今天，让板子感觉到冷热',
 goal: '做一个「温度播报员」：板子测出真实温度，显示在小屏幕上，太热了还会亮灯报警。这个任务一句话说不完——所以今天学项目经理的本事：拆成三步，一步一步指挥 AI。',
 },
 {
 num: 8,
 title: '光感小夜灯',
 stageId: 2,
 hook: '今天，让灯学会「呼吸」',
 goal: '做一个「光感小夜灯」：天一黑，灯自己慢慢亮起来。今天板子要学会两件新本事：读懂「连续变化」的光线，和让灯渐亮渐暗地「呼吸」。',
 },
 {
 num: 9,
 title: '彩虹灯带',
 stageId: 2,
 hook: '用 for 循环，指挥一整排会动的灯',
 goal: '点亮一条 10 颗灯珠的 WS2812 彩色灯带，学会用 for 循环让计算机「自动重复」，再加上延时，做出一道会跑的流水灯。',
 starterCode: `from machine import Pin
import neopixel
np = neopixel.NeoPixel(Pin(5), 10)
np[0] = (80, 0, 0) # 第 1 颗灯的编号是 0
np.write()
⑥ 动手任务（先保底，再挑战）
★ 基础任务（必做——做完就算成功！）
接好灯带，用 for 循环让 10 颗灯全部亮成同一种颜色。我让灯带亮成了 ________ 色。 □ 我是用 for 循环做的，不是写 10 遍
★★ 进阶任务（建议做）
做一个流水灯：灯一颗一颗按顺序亮过去。□ 我看到一道光在灯带上「跑」起来了 我把停顿改成 ______ 秒，光跑得更______（快/慢）
★★★ 挑战任务（学有余力再做）
做彩虹色（每颗灯不同颜色）或来回双向流水。我做出的效果是：____________________ 我问 AI 的新问题是：____________________
⑦ 今日三大发现（把话补完整）
1. for 循环＝写一遍，计算机替我重复______遍；循环变量 i 每一轮都在________。
2. 会动的效果＝改一点＋________一下＋再改一点。
3. 给灯填了颜色之后，必须调用____________，颜色才真正送到灯带。
⑧ 课后任务
基础（全员）：向家人解释「for 循环」是什么，举一个生活里「重复做同一件事」的例子。
拓展（选做）：问 AI——能不能让光先从左跑到右，再从右跑回左？试着改一改 for 循环。
能说清楚「为什么用循环比写 10 遍好」，才是真的懂了。`,
 },
 {
 num: 10,
 title: '需求文档大挑战',
 stageId: 2,
 hook: '',
 goal: '没有新硬件、没有新语法——一场大挑战：做一个「抢答器」（按下按钮→灯亮＋响一声）。但规则是：不给代码，也不许先敲代码！',
 starterCode: `from machine import Pin
import time
button = Pin(14, Pin.IN, Pin.PULL_UP)
while True:
print(button.value()) # 按下印 0，松开印 1
time.sleep(0.2)
⑥ 动手任务（先保底，再挑战）
★ 基础任务（必做——做完就算成功！）
写出合格需求文档（五要素全＋清单 3 步以上），照清单实现第①步：按下按钮，灯亮。我的项目名：________ □ 文档交了 □ 按下灯亮了
★★ 进阶任务（建议做）
加上第②③④步：按下时蜂鸣器响 0.2 秒；松开后灯灭、不响，回到等待。□ 响了 □ 松开复位了
★★★ 挑战任务（学有余力再做）
给抢答器升级一个新需求（如：抢到后锁定，3 秒后才能再抢）——先改文档，再改代码。我新增的需求是：____________________
⑦ 今日三大发现（把话补完整）
1. 需求文档＝______要素＋功能________清单——指挥 AI 的作战地图。
2. 按钮用 PULL_UP 时，按下读到____、松开读到____——接线的事实要写进________，AI 才不用猜。
3. 照清单指挥 AI：一次只问____步，跑通再问下一步。
⑧ 课后任务
基础（全员）：给家里一件想「自动化」的小事（如「天黑自动开灯」）写一份需求文档，五要素写全。
拓展（选做）：先改文档再改代码——给抢答器加「抢到后锁定，3 秒后才能再抢」。
能把想要的效果写清楚到 AI 不用猜，才是真的懂了。`,
 },
 {
 num: 11,
 title: '我的问题我的方案',
 stageId: 3,
 hook: '',
 goal: '进入第三阶段：AI 从「实习程序员」变成「工具箱」，主角是你！本课不写代码、不接线——把一个身边的小麻烦，打磨成一份「问题定义＋方案构想表」。',
 },
 {
 num: 12,
 title: '系统设计',
 stageId: 3,
 hook: '',
 goal: '把上节课的方案画成一张系统设计图——它就是 L13–14 搭建时的施工图纸！本课仍不写代码、不接线。',
 },
 {
 num: 13,
 title: '搭积木（上）：感知与显示',
 stageId: 3,
 hook: '',
 goal: '代码回来了！拿着 L12 的设计图开工——今天只搭第一块积木：感知＋显示。让装置能「读到」周围（光敏读亮度 / DHT11 读温度），并「显示」出来。',
 },
 {
 num: 14,
 title: '搭积木（下）：决策与组装',
 stageId: 3,
 hook: '',
 goal: '补上最关键的一块积木——决策（如果…就…），再把感知、决策、执行组装联调：今天下课时，你手上会有一个从头到尾跑通的完整作品！',
 },
 {
 num: 15,
 title: '讲好你的故事',
 stageId: 3,
 hook: '',
 goal: '你手里已经有一个跑通的作品了。今天不写代码、不接线——把它写成一个好故事、讲到别人眼睛发亮，为明天的科创发布会彩排。',
 },
 {
 num: 16,
 title: '科创发布会',
 stageId: 3,
 hook: '',
 goal: '环节',
 },
 {
 num: 17,
 title: '它能上网了',
 stageId: 4,
 hook: '你的作品今天第一次连上互联网——还会自己报时！',
 goal: '给 ESP32 连上 WiFi（看到 IP 就是成功），再让它向云问时间，用北京时间每秒打印。挑战：做成 OLED 联网小钟表。',
 starterCode: `import network, time
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect("热点名", "密码") # 认准 2.4G
print("IP =", wlan.ifconfig()[0])`,
 },
 {
 num: 18,
 title: '给云端发消息',
 stageId: 4,
 hook: '把家里的温度发到云上，手机随时看！',
 goal: '把 DHT11 测到的温湿度，通过 MQTT 发到巴法云——手机、控制台随时能看到自己屋里的数。今天的流程：先写预测 → 连云上传 → 控制台验证。',
 starterCode: `from umqtt.simple import MQTTClient
client = MQTTClient("你的私钥", "mqtt.bemfa.com", 9501)
client.connect()
print("已连上云")
client.publish("g1temp01/up", str(26)) # 先手动发一个数试试`,
 },
 {
 num: 19,
 title: '远程看板',
 stageId: 4,
 hook: '开奖！你昨天的预测，和真实曲线差多少？',
 goal: '拉出自己组的 24 小时温湿度曲线，和预测卡对比，写一份数据小报告——最后定出一个数字：你的报警阈值。',
 },
 {
 num: 20,
 title: '远程开关',
 stageId: 4,
 hook: '你在这头点一下，它在那头亮——真·隔空控制！',
 goal: '让 ESP32 订阅一个控制主题：在控制台或手机 App 点 on/off，你桌上的灯应声亮灭。挑战：加个远程门铃。',
 starterCode: `def message_callback(topic, msg): # topic 参数必须留
msg = msg.decode() # 字节先解码成字符串
if msg == "on":
led.value(1)`,
 },
 {
 num: 21,
 title: '会报警的系统',
 stageId: 4,
 hook: '不用你盯着——温度一超标，它自己给微信发消息！',
 goal: '用你 L19 定的阈值搭一个报警系统：温度超标 → 微信/云端收到报警 + 蜂鸣器响；而且要「克制」——只报一次，恢复了再说一声。',
 starterCode: `def send_wechat(message): # message 用英文，如 temp_high
url = ("http://apis.bemfa.com/vb/wechat/v1/wechatAlert?uid="
+ BEMFA_KEY + "&amp;device=ESP32&amp;message=" + message
+ "&amp;group=default")
r = urequests.get(url); print(r.text); r.close()`,
 },
 {
 num: 22,
 title: '两块板对话',
 stageId: 4,
 hook: '你按一下，我这边就亮——两块板隔空击掌！',
 goal: '和结对组签好「约定卡」，做一次隔空联动：A 组按按钮，B 组的灯亮 3 秒。挑战：双向互相呼叫。',
 starterCode: `if button.value() == 0: # 按下（上拉，按下=0）
client.publish(TOPIC, "ding")
print("已发送 ding"); time.sleep(0.5)`,
 },
 {
 num: 23,
 title: '智能家居模块·上',
 stageId: 4,
 hook: '把六节课的本事拼起来——你的产品今天立项！',
 goal: '选定用途、给产品起名、画好联网版三段图，然后搭出最小可跑：1 个感知上云 + 1 个执行可远程控制 + 联网稳定。',
 starterCode: `while True:
client.check_msg() # 能控：随时收指令
if time.time() - last &gt; 30: # 能传：每 30 秒一次
sensor.measure()
client.publish(T_UP, str(sensor.temperature()))
last = time.time()`,
 },
 {
 num: 24,
 title: '联调与上线·下',
 stageId: 4,
 hook: '上线日！过了三条硬标准，你的产品就正式服役。',
 goal: '用联调三步法把产品调稳，接上微信推送，稳定运行 15 分钟，通过硬检查点验收（能连/能传/能控），领作品卡②。',
 starterCode: `while True:
client.check_msg() # 能控
if time.time() - last &gt; 30: # 能传（每 30 秒）
sensor.measure(); t = sensor.temperature()
client.publish(T_UP, str(t))
if t &gt; LIMIT and not alarmed: # 报警（去抖）
send_wechat("temp_high"); alarmed = True
last = time.time()`,
 },
 {
 num: 25,
 title: '断网了怎么办',
 stageId: 4,
 hook: '今天故意断你的网——看你的产品能不能自己爬起来！',
 goal: '经历两次断网演习：第一次看产品「裸奔」崩掉，然后加上安全网（try/except+自动重连），第二次断网它要做到：不崩、本地照跑、来网自愈。',
 starterCode: `try:
client.publish(T_UP, str(t)) # 会掉的动作
except:
online = False # 掉了接住，不崩
print("断网，转本地模式")`,
 },
 {
 num: 26,
 title: '安全与隐私',
 stageId: 4,
 hook: '有人拿到你的私钥，就能隔空开你家的灯——真的！',
 goal: '看一场「陌生人开灯」演示，然后给自己的产品做安全体检四项、修补漏洞，把私钥卡收进小组信封。',
 },
 {
 num: 27,
 title: '我的物联网作品·发布会',
 stageId: 4,
 hook: '第四阶段结业发布会——带你的产品公开亮相！',
 goal: '完成一次 2–3 分钟路演（必须含远程演示：手机看数据或远程控制），接住答辩三问中的至少两问，领作品卡③、在项目说明书上签名。',
 },
 {
 num: 28,
 title: '它听得懂话了',
 stageId: 5,
 hook: '对它喊一声「开灯」——它真的开了！',
 goal: '给你的联网作品接上「耳朵」：对音箱（或手机语音）喊一声，作品应声动作。你只需要写第四站——守着主题等指令（L20 学过！）。',
 starterCode: `def on_message(topic, msg): # topic 参数必须留
cmd = msg.decode() # 音箱认出的指令词
if cmd == "on":
led.value(1)
elif cmd == "alarm": # 警报模式
led.value(1); buzzer.value(1)`,
 },
 {
 num: 29,
 title: '它睁开眼了',
 stageId: 5,
 hook: '新伙伴报到：一台会拍照的小电脑！',
 goal: '把本组的树莓派上电，用网页按钮拍下第一张照片；画出你的双层架构图——谁管手脚，谁管眼睛。',
 },
 {
 num: 30,
 title: '它认出来了',
 stageId: 5,
 hook: '把照片寄给云端的「认图师傅」——它真认出来了！',
 goal: '完成三次完整识别：拍照→提交云端 AI→读答案→记录。每次都当裁判：它说的对吗？注意：每组识别次数有限，一发都别浪费。',
 },
 {
 num: 31,
 title: '看见就行动',
 stageId: 5,
 hook: '它看见什么，你的灯就变什么颜色！',
 goal: '打通两层握手：先用老师的「模拟识别词」把 ESP32 接球手调通，再用真实识别触发——认出植物，绿灯亮、OLED 显示 PLANT。',
 starterCode: `def on_vision(topic, msg): # 识别词从这里进来
word = msg.decode()
if word == "plant":
light(0, 40, 0) # 绿灯
else:
light(30, 30, 30) # 其他：白灯兜底`,
 },
 {
 num: 32,
 title: '它认错了！',
 stageId: 5,
 hook: '今天的任务反着来：想办法让 AI 认错！',
 goal: '用刁难三招（逆光/遮挡/相似轮廓）让 AI 认错至少一次，看懂它的「把握分」，然后给系统装上红黄绿三档兜底：把握分低，就不动手。',
 starterCode: `word, score = msg.decode().split(",")
score = int(score)
if score &gt;= 80: # 绿：照做
act(word)
elif score &gt;= 50: # 黄：提示但不动作
light(40, 30, 0)
else: # 红：当没看见
pass`,
 },
 {
 num: 33,
 title: '它会看图说话',
 stageId: 5,
 hook: '它看了你的作品一眼，然后……开始点评了！',
 goal: '完成一次「看图说话」：拍照→大模型评论→裁判两问（现象真吗？建议在理吗？）→复述给邻组。课尾领《植物观察员》材料包，画好明天的分工图草稿。',
 },
 {
 num: 34,
 title: '把AI装进去',
 stageId: 5,
 hook: '开工！把看、认、说、动装进同一个作品。',
 goal: '按分工图搭《植物观察员》（或自选）：保底链路跑通（拍→识别→三档→ESP32 响应），课末过硬检查点——三步连续成功一次。',
 starterCode: `word, score = msg.decode().split(",")
score = int(score)
if score &lt; 50: return # 红：当没看见
if score &lt; 80: # 黄：亮黄灯不动作
light(40, 30, 0); return
if word == "dry": # 绿档+缺水 → 提醒浇水
light(40, 0, 0); oled_show("WATER!")`,
 },
 {
 num: 35,
 title: '智能发布会',
 stageId: 5,
 hook: '第五阶段结业——你的智能作品，今天正式发布！',
 goal: '先录好演示视频（一镜到底 ≤60 秒），再完成路演：四要素+现场智能演示一次（卡住切视频），最后接住答辩三连问中的两问。',
 },
];

const STAGE_BY_ID = new Map(esp32Stages.map((stage) => [stage.id, stage]));

export const getEsp32Stage = (stageId) => STAGE_BY_ID.get(Number(stageId)) || null;

export const getEsp32Lesson = (num) => esp32Lessons.find((lesson) => lesson.num === Number(num)) || null;

export const esp32LessonsByStage = (stageId) => esp32Lessons.filter((lesson) => lesson.stageId === Number(stageId));

/** 带可运行起步代码的课时——实操课，区别于选题、设计、发布这类纸面课。 */
export const esp32PracticalLessons = esp32Lessons.filter((lesson) => Boolean(lesson.starterCode));
