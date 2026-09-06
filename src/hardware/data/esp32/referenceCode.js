// 每课的「完整参考代码」——教师保底模板，直接能跑。
// 单独成文件的两个理由：一是它和课时脚本是两种东西（一份是怎么上课，
// 一份是最终代码长什么样），二是塞回 stage*.js 会把阶段四顶到 1000 行门禁之上。
//
// 来源：课件库《课程代码包》的 33 个 .py 文件，按课次归档。

export const esp32ReferenceCode = {
    1: [
            {
                label: '点亮LED',
                code: `# ESP32 × AI 科创课程 · 第1课《LED亮了》参考代码
# 接线：板载 LED（GPIO2），无需外接

from machine import Pin

led = Pin(2, Pin.OUT)
led.value(1)`,
            },
    ],
    2: [
            {
                label: '闪烁密码 · SOS',
                code: `# ESP32 × AI 科创课程 · 第2课《闪烁密码》参考代码（教案给出 S 段，O/S 段按课件时序约束补全）
# 接线：板载 LED（GPIO2）
# 时序：S=3次(亮0.2/灭0.2)；O=3次(亮0.6/灭0.2)；字母间停0.6；播完停2秒

from machine import Pin
import time

led = Pin(2, Pin.OUT)


def blink(on_time, times):          # 闪 times 次，每次亮 on_time 秒
    for _ in range(times):
        led.value(1)
        time.sleep(on_time)
        led.value(0)
        time.sleep(0.2)


while True:
    blink(0.2, 3)                   # S
    time.sleep(0.6)
    blink(0.6, 3)                   # O
    time.sleep(0.6)
    blink(0.2, 3)                   # S
    time.sleep(2)                   # 播完停 2 秒，循环`,
            },
    ],
    3: [
            {
                label: '按钮控制灯',
                code: `# ESP32 × AI 科创课程 · 第3课《谁按了按钮》参考代码
# 接线：板载 BOOT 按钮（GPIO0，自带上拉：按下=0）+ 板载 LED（GPIO2）
# 注意：本课特意用板载按钮零接线；外接按钮从 L10 起用 GPIO14

from machine import Pin

led = Pin(2, Pin.OUT)
btn = Pin(0, Pin.IN)

while True:
    if btn.value() == 0:   # 0 代表按下
        led.value(1)
    else:
        led.value(0)`,
            },
    ],
    4: [
            {
                label: 'OLED显示',
                code: `# ESP32 × AI 科创课程 · 第4课《小屏幕说话了》参考代码
# 接线：OLED（I2C）SCL→GPIO22，SDA→GPIO21
# 先把包根目录的 ssd1306.py 上传到板子，再运行本文件

from machine import Pin, SoftI2C
import ssd1306

i2c = SoftI2C(scl=Pin(22), sda=Pin(21))
oled = ssd1306.SSD1306_I2C(128, 64, i2c)

oled.fill(0)               # 清空屏幕
oled.text('Hello', 0, 0)   # 准备文字和坐标
oled.show()                # 显示出来`,
            },
    ],
    5: [
            {
                label: '找错 · Bug1 · 缺冒号',
                code: `# ESP32 × AI 科创课程 · 第5课《AI错了》找错练习 Bug1（语法错：while 后漏冒号，上传即红字）
# 本文件故意有错，不做语法自检——学生按错误类型卡①类排查

from machine import Pin
import time

led = Pin(2, Pin.OUT)

while True       # 这里漏了冒号 :
    led.value(1)
    time.sleep(0.5)
    led.value(0)
    time.sleep(0.5)`,
            },
            {
                label: '找错 · Bug2 · 缺import',
                code: `# ESP32 × AI 科创课程 · 第5课《AI错了》找错练习 Bug2（缺库：运行时 NameError）

from machine import Pin
# 这里漏了一行 import time

led = Pin(2, Pin.OUT)

while True:
    led.value(1)
    time.sleep(0.5)
    led.value(0)
    time.sleep(0.5)`,
            },
            {
                label: '找错 · Bug3 · 逻辑反',
                code: `# ESP32 × AI 科创课程 · 第5课《AI错了》找错练习 Bug3（逻辑反：不报错但行为相反）

from machine import Pin

led = Pin(2, Pin.OUT)
btn = Pin(0, Pin.IN, Pin.PULL_UP)

while True:
    if btn.value() == 1:   # 上拉电阻下，按下其实是 0
        led.value(1)
    else:
        led.value(0)`,
            },
            {
                label: '找错 · Bug4 · 引脚坐标错',
                code: `# ESP32 × AI 科创课程 · 第5课《AI错了》找错练习 Bug4（参数错：引脚号写错 + 坐标超屏）

from machine import Pin, SoftI2C
import ssd1306

i2c = SoftI2C(scl=Pin(22), sda=Pin(99))   # SDA 引脚号写错了
oled = ssd1306.SSD1306_I2C(128, 64, i2c)

oled.fill(0)
oled.text('Hi', 200, 100)   # 坐标超出 128x64 屏幕范围
oled.show()`,
            },
    ],
    6: [
            {
                label: '闪烁灯 · 约束版',
                code: `# ESP32 × AI 科创课程 · 第6课《好问题vs坏问题》参考代码（五要素+约束提问的参考翻译）
# 接线：板载 LED（GPIO2）

from machine import Pin
import time

led = Pin(2, Pin.OUT)

while True:
    led.value(1)    # 开灯
    time.sleep(1)   # 等待 1 秒
    led.value(0)    # 关灯
    time.sleep(1)   # 等待 1 秒`,
            },
    ],
    7: [
            {
                label: '温度播报员',
                code: `# ESP32 × AI 科创课程 · 第7课《温度播报员》完整参考代码（分步提问的最终版）
# 接线：DHT11→GPIO14；OLED SCL→22 SDA→21；LED→GPIO2
# 需先上传 ssd1306.py

from machine import Pin, SoftI2C
import dht
import ssd1306
import time

sensor = dht.DHT11(Pin(14))
i2c = SoftI2C(scl=Pin(22), sda=Pin(21))
oled = ssd1306.SSD1306_I2C(128, 64, i2c)
led = Pin(2, Pin.OUT)

THRESHOLD = 30   # 报警阈值

while True:
    try:
        sensor.measure()
        temp = sensor.temperature()
        hum = sensor.humidity()

        oled.fill(0)
        oled.text("Temp: {} C".format(temp), 0, 10)
        oled.text("Hum: {} %".format(hum), 0, 30)

        if temp >= THRESHOLD:
            oled.text("! ALARM !", 0, 50)
            led.value(1)
        else:
            oled.text("Normal", 0, 50)
            led.value(0)

        oled.show()
    except OSError:
        print("读取传感器失败")

    time.sleep(2)`,
            },
    ],
    8: [
            {
                label: '光感小夜灯',
                code: `# ESP32 × AI 科创课程 · 第8课《光感小夜灯》完整参考代码（ADC 读光敏 + PWM 调亮度）
# 接线：光敏模块 AO→GPIO34；LED→GPIO2

from machine import Pin, ADC, PWM
import time

light = ADC(Pin(34))         # 光敏模块接 GPIO34
light.atten(ADC.ATTN_11DB)   # 量程设到 0~3.3V
led = PWM(Pin(2))            # LED 用 PWM 控制亮度
led.freq(1000)

while True:
    value = light.read()     # 读到 0~4095 的光线值
    print("light:", value)

    # 光线越暗(value越小)，灯越亮：反过来映射成亮度(0~1023)
    brightness = (4095 - value) // 4
    led.duty(brightness)     # 把亮度设为 brightness/1023 的百分比

    time.sleep(0.1)`,
            },
    ],
    9: [
            {
                label: '灯带 · 步骤1 · 点亮一颗',
                code: `# ESP32 × AI 科创课程 · 第9课《彩虹灯带》起步全码 第①步
# 接线：WS2812 灯带 DIN→GPIO5（10 颗）

from machine import Pin              # 引脚工具
import neopixel                      # 灯带工具箱

np = neopixel.NeoPixel(Pin(5), 10)   # 数据脚 GPIO5，管 10 颗灯
np[0] = (80, 0, 0)                   # 第 1 颗灯的编号是 0，填上红色
np.write()                           # 把颜色送给灯带`,
            },
            {
                label: '灯带 · 步骤2 · 循环点亮',
                code: `# ESP32 × AI 科创课程 · 第9课《彩虹灯带》起步全码 第②步（for 循环点亮一排）

from machine import Pin
import neopixel

np = neopixel.NeoPixel(Pin(5), 10)   # 和第①步一样
for i in range(10):                  # i 从 0 数到 9
    np[i] = (0, 80, 0)               # 给第 i 颗填上绿色
np.write()                           # 送一次，整排全亮`,
            },
            {
                label: '灯带 · 步骤3 · 流水灯',
                code: `# ESP32 × AI 科创课程 · 第9课《彩虹灯带》完整参考代码（流水灯）

from machine import Pin              # 引脚工具
import neopixel                      # 灯带工具箱
import time                          # 时间工具

NUM = 10                             # 灯珠数量
np = neopixel.NeoPixel(Pin(5), NUM)  # 数据脚 GPIO5，管 10 颗灯

while True:                          # 一直重复
    for i in range(NUM):             # i 从 0 数到 9
        np[i] = (0, 80, 0)           # 给第 i 颗填上绿色(R,G,B)
        np.write()                   # 把颜色送给灯带
        time.sleep(0.1)              # 停 0.1 秒
        np[i] = (0, 0, 0)            # 熄灭第 i 颗
        np.write()                   # 再送一次，光就跑起来`,
            },
    ],
    10: [
            {
                label: '抢答器 · 完整版',
                code: `# ESP32 × AI 科创课程 · 第10课《需求文档大挑战》完整参考代码（抢答器，含松开复位）
# 接线：按钮→GPIO14；LED→GPIO2；蜂鸣器（有源）→GPIO13

from machine import Pin                # 引脚工具
import time                            # 时间工具

button = Pin(14, Pin.IN, Pin.PULL_UP)  # 按钮：上拉，按下=0
led = Pin(2, Pin.OUT)                  # LED
buzzer = Pin(13, Pin.OUT)              # 蜂鸣器

while True:                            # 一直守着
    if button.value() == 0:            # 读到 0 = 有人按下
        led.value(1)                   # 灯亮——抢到了
        buzzer.value(1)                # 响
        time.sleep(0.2)                # 响 0.2 秒
        buzzer.value(0)                # 停响
    else:
        led.value(0)                   # 松开就灭灯，回到等待`,
            },
            {
                label: '抢答器 · 步骤1 · 读按钮',
                code: `# ESP32 × AI 科创课程 · 第10课《需求文档大挑战》起步全码 第①步
# 接线：外接按钮→GPIO14（上拉，按下=0）

from machine import Pin                # 引脚工具
import time                            # 时间工具

button = Pin(14, Pin.IN, Pin.PULL_UP)  # 按钮：上拉，按下=0
while True:
    print(button.value())              # 按下印 0，松开印 1
    time.sleep(0.2)`,
            },
    ],
    13: [
            {
                label: '夜灯 · 感知段',
                code: `# ESP32 × AI 科创课程 · 第13课《搭积木·上》主线作品（智能小夜灯）感知段
# 接线：光敏模块 AO→GPIO34；LED→GPIO2（教师标准件包同款）

from machine import Pin, ADC
import time

light = ADC(Pin(34))        # 光敏模块接 GPIO34
light.atten(ADC.ATTN_11DB)  # 量程调到 0~3.3V
led = Pin(2, Pin.OUT)       # 板载 LED 接 GPIO2

while True:
    value = light.read()    # 读出亮度（0~4095）
    print("亮度：", value)   # 打印出来确认感知正常
    led.value(1)            # 先点亮 LED 确认接线
    time.sleep(1)`,
            },
            {
                label: '温度警报器 · 感知显示',
                code: `# ESP32 × AI 科创课程 · 第13课 附录范例（温度警报器）感知+显示段
# 接线：DHT11→GPIO14；OLED SCL→22 SDA→21（需 ssd1306.py）

from machine import Pin, SoftI2C
import dht, time
from ssd1306 import SSD1306_I2C

sensor = dht.DHT11(Pin(14))            # DHT11 接 GPIO14
i2c = SoftI2C(scl=Pin(22), sda=Pin(21))
oled = SSD1306_I2C(128, 64, i2c)

while True:
    sensor.measure()                   # 先读一次
    t = sensor.temperature()           # 取出温度
    oled.fill(0)
    oled.text("Temp: " + str(t) + "C", 0, 0)
    oled.show()                        # 显示到屏上
    time.sleep(2)`,
            },
    ],
    14: [
            {
                label: '夜灯 · 完整版',
                code: `# ESP32 × AI 科创课程 · 第14课《搭积木·下》主线作品（智能小夜灯）完整参考代码
# 接线：光敏 AO→GPIO34；LED→GPIO2；阈值按本组 L13 实测微调

from machine import Pin, ADC
import time

light = ADC(Pin(34))
light.atten(ADC.ATTN_11DB)
led = Pin(2, Pin.OUT)
THRESHOLD = 1000           # 决策阈值：低于它算天黑

while True:
    value = light.read()   # 感知：读亮度
    if value < THRESHOLD:  # 决策：如果很暗
        led.value(1)       # 执行：亮灯
    else:                  # 否则
        led.value(0)       # 执行：灭灯
    print("亮度：", value)
    time.sleep(0.5)`,
            },
            {
                label: '温度警报器 · 完整版',
                code: `# ESP32 × AI 科创课程 · 第14课 附录范例（温度警报器）完整参考代码
# 接线：DHT11→GPIO14；OLED 22/21；蜂鸣器→GPIO13（需 ssd1306.py）

from machine import Pin, SoftI2C
import dht, time
from ssd1306 import SSD1306_I2C

sensor = dht.DHT11(Pin(14))
i2c = SoftI2C(scl=Pin(22), sda=Pin(21))
oled = SSD1306_I2C(128, 64, i2c)
buzzer = Pin(13, Pin.OUT)
LIMIT = 30                       # 超过 30℃ 报警

while True:
    sensor.measure()
    t = sensor.temperature()
    oled.fill(0)
    oled.text("Temp: " + str(t) + "C", 0, 0)
    if t > LIMIT:                # 决策：温度过高
        oled.text("ALARM!", 0, 20)
        buzzer.value(1)          # 执行：报警
    else:
        buzzer.value(0)
    oled.show()
    time.sleep(2)`,
            },
    ],
    17: [
            {
                label: '连WiFi · NTP时钟',
                code: `# ESP32 × AI 科创课程 · 第17课《它能上网了》连 WiFi + NTP 校时
# 无需外接元件
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

import network, ntptime, time

WIFI_SSID = "你的WiFi名"
WIFI_PASS = "你的WiFi密码"

# 第①步：连 WiFi
wlan = network.WLAN(network.STA_IF)
wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected():
    time.sleep(0.5)
print("已联网，IP =", wlan.ifconfig()[0])

# 第②步：NTP 校时（接在上面后面）
ntptime.settime()          # 云给的是世界时
while True:
    t = time.localtime(time.time() + 8*3600)
    print("现在 %02d:%02d:%02d" % (t[3], t[4], t[5]))
    time.sleep(1)`,
            },
    ],
    18: [
            {
                label: '温湿度上云',
                code: `# ESP32 × AI 科创课程 · 第18课《给云端发消息》DHT11 上云（主题带 /up）
# 接线：DHT11→GPIO14
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

import network, time, dht
from machine import Pin
from umqtt.simple import MQTTClient

WIFI_SSID = "你的WiFi名"
WIFI_PASS = "你的WiFi密码"
BEMFA_KEY = "你的巴法云私钥"      # 私钥当 client_id
TOPIC = "g1temp01/up"           # 学号前缀 g1 换成你的；/up=只存云

wlan = network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected():
    time.sleep(0.5)
print("已联网", wlan.ifconfig()[0])

# 连巴法云：服务器 mqtt.bemfa.com，端口 9501
client = MQTTClient(BEMFA_KEY, "mqtt.bemfa.com", 9501)
client.connect()

sensor = dht.DHT11(Pin(14))         # DHT11 接 GPIO14
while True:
    sensor.measure()               # 先测一次（忘了会报错）
    t = sensor.temperature()
    client.publish(TOPIC, str(t))  # 传字符串即可
    time.sleep(30)                 # 每 30 秒一次，别刷屏`,
            },
    ],
    20: [
            {
                label: '远程开关',
                code: `# ESP32 × AI 科创课程 · 第20课《远程开关》订阅控制（控制主题不带 /up）
# 接线：LED→GPIO2；控制入口=巴法云控制台/手机 App 发 on/off
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

import network, time
from machine import Pin
from umqtt.simple import MQTTClient

WIFI_SSID = "你的WiFi名"
WIFI_PASS = "你的WiFi密码"
BEMFA_KEY = "你的巴法云私钥"
TOPIC = "g1led01"          # 控制主题：不带 /up
led = Pin(2, Pin.OUT)

def message_callback(topic, msg):   # topic 参数必须留
    msg = msg.decode()              # 字节→字符串
    if msg == "on":  led.value(1)
    elif msg == "off": led.value(0)

wlan = network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected(): time.sleep(0.5)
client = MQTTClient(BEMFA_KEY, "mqtt.bemfa.com", 9501)
client.set_callback(message_callback)
client.connect(); client.subscribe(TOPIC)   # 订阅
while True:
    client.check_msg()      # 有没有新指令？
    time.sleep(0.1)`,
            },
    ],
    21: [
            {
                label: '报警系统 · 微信推送',
                code: `# ESP32 × AI 科创课程 · 第21课《会报警的系统》超阈值 HTTP wechatAlert 推微信 + 去抖
# 接线：DHT11→GPIO14；蜂鸣器→GPIO13；微信消息用英文（中文会参数错误-1）
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

import network, time, dht, urequests
from machine import Pin

WIFI_SSID = "你的WiFi名"
WIFI_PASS = "你的WiFi密码"
BEMFA_KEY = "你的巴法云私钥"       # 当微信接口的 uid
LIMIT = 28                        # 阈值：来自你 L19 报告
sensor = dht.DHT11(Pin(14)); buzzer = Pin(13, Pin.OUT)

def send_wechat(message):         # 微信推送 = HTTP GET
    url = ("http://apis.bemfa.com/vb/wechat/v1/wechatAlert"
           "?uid=" + BEMFA_KEY + "&device=ESP32"
           "&message=" + message + "&group=default")
    try: urequests.get(url).close()
    except Exception as e: print(e)

wlan = network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected(): time.sleep(0.5)

alarmed = False                 # 报警旗：防连环刷屏
while True:
    sensor.measure(); t = sensor.temperature()
    if t > LIMIT and not alarmed:
        send_wechat("temp_high")   # 英文消息
        buzzer.value(1); time.sleep(1); buzzer.value(0)
        alarmed = True             # 挂旗
    if t < LIMIT - 1 and alarmed:  # 降回才收旗
        alarmed = False
    time.sleep(5)`,
            },
    ],
    22: [
            {
                label: '两块板 · A端发送',
                code: `# ESP32 × AI 科创课程 · 第22课《两块板对话》A 端（发送板）：按钮按下发 ding
# 接线：按钮→GPIO14；两端主题必须一字不差（如 g1g2door01）
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

import network, time
from machine import Pin
from umqtt.simple import MQTTClient
WIFI_SSID="你的WiFi名"; WIFI_PASS="你的WiFi密码"; KEY_A="A板私钥"
TOPIC = "g1g2door01"        # 两块板约好的主题
button = Pin(14, Pin.IN, Pin.PULL_UP)
wlan = network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected(): time.sleep(0.5)
client = MQTTClient(KEY_A, "mqtt.bemfa.com", 9501); client.connect()
while True:
    if button.value() == 0:       # 按下=0（上拉）
        client.publish(TOPIC, "ding"); time.sleep(0.5)
    time.sleep(0.05)`,
            },
            {
                label: '两块板 · B端接收',
                code: `# ESP32 × AI 科创课程 · 第22课《两块板对话》B 端（接收板）：收到 ding 亮灯 3 秒
# 接线：LED→GPIO2；主题与 A 端一字不差
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

WIFI_SSID="你的WiFi名"; WIFI_PASS="你的WiFi密码"; KEY_B="B板私钥"
TOPIC = "g1g2door01"        # 和 A 端一模一样
led = Pin(2, Pin.OUT)
def message_callback(topic, msg):
    if msg.decode() == "ding":
        led.value(1); time.sleep(3); led.value(0)
client = MQTTClient(KEY_B, "mqtt.bemfa.com", 9501)
client.set_callback(message_callback)
client.connect(); client.subscribe(TOPIC)
while True: client.check_msg(); time.sleep(0.5)`,
            },
    ],
    23: [
            {
                label: '最小可跑三件套',
                code: `# ESP32 × AI 科创课程 · 第23课《智能家居模块·上》感知上云 + 远程控制（最小可跑）
# 接线：DHT11→GPIO14；LED→GPIO2（按钮同用时按钮改 GPIO27）
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

import network, time, dht
from machine import Pin
from umqtt.simple import MQTTClient
WIFI_SSID="你的WiFi名"; WIFI_PASS="你的WiFi密码"
BEMFA_KEY = "你的巴法云私钥"
T_UP  = "g1temp01/up"      # 感知上云（带 /up）
T_LED = "g1led01"          # 远程控制（不带 /up）
sensor = dht.DHT11(Pin(14)); led = Pin(2, Pin.OUT)
def message_callback(topic, msg):
    msg = msg.decode()
    if msg == "on": led.value(1)
    elif msg == "off": led.value(0)
wlan = network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected(): time.sleep(0.5)
client = MQTTClient(BEMFA_KEY, "mqtt.bemfa.com", 9501)
client.set_callback(message_callback)
client.connect(); client.subscribe(T_LED)

last = 0
while True:
    client.check_msg()              # 能控：随时收指令
    if time.time() - last > 30:     # 能传：每 30 秒
        sensor.measure()
        client.publish(T_UP, str(sensor.temperature()))
        last = time.time()
    time.sleep(1)`,
            },
    ],
    24: [
            {
                label: '上线版 · 三段合一',
                code: `# ESP32 × AI 科创课程 · 第24课《联调与上线·下》能传+能控+自动报警 三段合一上线版
# 接线：DHT11→GPIO14；LED→GPIO2；蜂鸣器→GPIO13
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

import network, time, dht, urequests
from machine import Pin
from umqtt.simple import MQTTClient
WIFI_SSID="你的WiFi名"; WIFI_PASS="你的WiFi密码"
BEMFA_KEY="你的巴法云私钥"
T_UP="g1temp01/up"; T_LED="g1led01"; LIMIT=28
sensor=dht.DHT11(Pin(14)); led=Pin(2,Pin.OUT); buzzer=Pin(13,Pin.OUT)
def send_wechat(m):                 # 报警走 HTTP 微信接口
    url=("http://apis.bemfa.com/vb/wechat/v1/wechatAlert?uid="
         +BEMFA_KEY+"&device=ESP32&message="+m+"&group=default")
    try: urequests.get(url).close()
    except Exception as e: print(e)
def message_callback(topic, msg):   # 收指令控灯
    msg=msg.decode()
    if msg=="on": led.value(1)
    elif msg=="off": led.value(0)
wlan=network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected(): time.sleep(0.5)
client=MQTTClient(BEMFA_KEY,"mqtt.bemfa.com",9501)
client.set_callback(message_callback)
client.connect(); client.subscribe(T_LED)

alarmed=False; last=0
while True:
    client.check_msg()                 # 能控
    if time.time()-last > 30:
        sensor.measure(); t=sensor.temperature()
        client.publish(T_UP, str(t))   # 能传
        if t>LIMIT and not alarmed:
            send_wechat("temp_high"); buzzer.value(1)
            time.sleep(1); buzzer.value(0); alarmed=True
        if t<LIMIT-1 and alarmed: alarmed=False
        last=time.time()
    time.sleep(1)`,
            },
    ],
    25: [
            {
                label: '断网自愈',
                code: `# ESP32 × AI 科创课程 · 第25课《断网了怎么办》try/except 安全网 + 定时重连
# 接线：DHT11→GPIO14；蜂鸣器→GPIO13；断网演习用
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

import network, time, dht
from machine import Pin
from umqtt.simple import MQTTClient
WIFI_SSID="你的WiFi名"; WIFI_PASS="你的WiFi密码"
BEMFA_KEY="你的巴法云私钥"; T_UP="g1temp01/up"; LIMIT=28
sensor=dht.DHT11(Pin(14)); buzzer=Pin(13,Pin.OUT)
def connect_cloud():                # 连云单独成函数
    c=MQTTClient(BEMFA_KEY,"mqtt.bemfa.com",9501)
    c.connect(); return c
wlan=network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected(): time.sleep(0.5)
client=connect_cloud(); online=True; last_try=0

while True:
    sensor.measure(); t=sensor.temperature()
    buzzer.value(1 if t>LIMIT else 0)   # 本地报警：不靠网
    if online:
        try: client.publish(T_UP, str(t))
        except: online=False; print('断网，转本地')
    else:
        if time.time()-last_try > 5:    # 每 5 秒重连
            last_try=time.time()
            try: client=connect_cloud(); online=True
            except: print('还连不上，继续本地干活')
    time.sleep(2)`,
            },
    ],
    28: [
            {
                label: '语音入口',
                code: `# ESP32 × AI 科创课程 · 第28课《它听得懂话了》语音入口（复用 L20 订阅段）
# 接线：LED→GPIO2；蜂鸣器→GPIO13；语音主题由教师统一分配
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

import network, time
from machine import Pin
from umqtt.simple import MQTTClient

WIFI_SSID = "你的WiFi名"
WIFI_PASS = "你的WiFi密码"
BEMFA_KEY = "你的巴法云私钥"
TOPIC = "g1voice01"              # 语音入口主题：老师统一分配（不带 /up）
led = Pin(2, Pin.OUT)
buzzer = Pin(13, Pin.OUT)

def on_message(topic, msg):      # topic 参数必须留（库固定传两个）
    cmd = msg.decode()           # 音箱认出的指令词
    if cmd == "on":
        led.value(1)
    elif cmd == "off":
        led.value(0)
    elif cmd == "alarm":         # 警报模式：灯 + 蜂鸣一起动
        led.value(1)
        buzzer.value(1); time.sleep(1); buzzer.value(0)

wlan = network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected():
    time.sleep(0.5)
print("已联网", wlan.ifconfig()[0])

client = MQTTClient(BEMFA_KEY, "mqtt.bemfa.com", 9501)
client.set_callback(on_message)
client.connect(); client.subscribe(TOPIC)   # 守着语音主题等指令
while True:
    client.check_msg()           # 喊了没？收到就照办（L20 老本事）
    time.sleep(0.1)`,
            },
    ],
    31: [
            {
                label: '看见就行动',
                code: `# ESP32 × AI 科创课程 · 第31课《看见就行动》两层握手 ESP32 接球手（词→OLED+灯带）
# 接线：OLED 22/21；WS2812 灯带→GPIO5；需 ssd1306.py
# 联调纪律：先教师模拟词、后真实识别
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

from machine import Pin, SoftI2C
import network, time, neopixel, ssd1306
from umqtt.simple import MQTTClient

WIFI_SSID = "你的WiFi名"
WIFI_PASS = "你的WiFi密码"
BEMFA_KEY = "你的巴法云私钥"
TOPIC = "g1vision01"             # 识别结果主题：树莓派认出后把词发到这里

i2c = SoftI2C(scl=Pin(22), sda=Pin(21))
oled = ssd1306.SSD1306_I2C(128, 64, i2c)
np = neopixel.NeoPixel(Pin(5), 8)    # WS2812 灯带接 GPIO5，共 8 颗

def light(r, g, b):              # 整条灯带点同一个颜色
    for i in range(8):
        np[i] = (r, g, b)
    np.write()

def show(word):                  # 收到识别词就照做：OLED 显示 + 灯带变色
    oled.fill(0)
    oled.text("I SEE:", 0, 10)
    oled.text(word, 0, 30)
    oled.show()
    if word == "plant":
        light(0, 40, 0)          # 绿
    elif word == "person":
        light(40, 30, 0)         # 黄
    elif word == "cup":
        light(0, 0, 40)          # 蓝
    else:
        light(30, 30, 30)        # 其他：白（兜底分支，别漏）

def on_vision(topic, msg):       # 树莓派把识别词发来，这里接住
    word = msg.decode()
    print("识别到:", word)
    show(word)

wlan = network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected():
    time.sleep(0.5)
client = MQTTClient(BEMFA_KEY, "mqtt.bemfa.com", 9501)
client.set_callback(on_vision)
client.connect(); client.subscribe(TOPIC)
oled.fill(0); oled.text("WAITING...", 0, 20); oled.show()
while True:
    client.check_msg()           # 有没有新的识别结果？收到就跑 on_vision
    time.sleep(0.1)`,
            },
    ],
    32: [
            {
                label: '三档兜底 · 完整版',
                code: `# ESP32 × AI 科创课程 · 第32课《它认错了》把握分红黄绿三档兜底（L31 基座 + 判断段升级）
# 树莓派改发「词,把握分」（如 plant,85）；绿≥80 照做 / 黄50–79 提示不动 / 红<50 当没看见
# 接线同 L31；需 ssd1306.py
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

from machine import Pin, SoftI2C
import network, time, neopixel, ssd1306
from umqtt.simple import MQTTClient

WIFI_SSID = "你的WiFi名"
WIFI_PASS = "你的WiFi密码"
BEMFA_KEY = "你的巴法云私钥"
TOPIC = "g1vision01"             # 识别结果主题：树莓派认出后把词发到这里

i2c = SoftI2C(scl=Pin(22), sda=Pin(21))
oled = ssd1306.SSD1306_I2C(128, 64, i2c)
np = neopixel.NeoPixel(Pin(5), 8)    # WS2812 灯带接 GPIO5，共 8 颗

def light(r, g, b):              # 整条灯带点同一个颜色
    for i in range(8):
        np[i] = (r, g, b)
    np.write()

GREEN_LINE = 80                  # 绿档线（可按你组测试数据微调）
YELLOW_LINE = 50                 # 黄档线

def act(word):                   # 绿档才真动作（沿用 L31 的响应）
    oled.fill(0); oled.text("I SEE:", 0, 10); oled.text(word, 0, 30); oled.show()
    if word == "plant":
        light(0, 40, 0)
    elif word == "person":
        light(40, 30, 0)
    elif word == "cup":
        light(0, 0, 40)
    else:
        light(30, 30, 30)

def on_vision(topic, msg):       # 收到「词,把握分」，先看分再查词表
    word, score = msg.decode().split(",")
    score = int(score)
    print(word, "把握分", score)
    if score >= GREEN_LINE:          # 绿：放行，照做
        act(word)
    elif score >= YELLOW_LINE:       # 黄：等等——不确定就不动手
        oled.fill(0); oled.text("?", 0, 20); oled.text(str(score), 0, 40); oled.show()
        light(40, 30, 0)             # 黄灯亮，但手脚不动
    else:                            # 红：不信，当没看见
        pass

wlan = network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected():
    time.sleep(0.5)
client = MQTTClient(BEMFA_KEY, "mqtt.bemfa.com", 9501)
client.set_callback(on_vision)
client.connect(); client.subscribe(TOPIC)
oled.fill(0); oled.text("WAITING...", 0, 20); oled.show()
while True:
    client.check_msg()           # 有没有新的识别结果？收到就跑 on_vision
    time.sleep(0.1)`,
            },
    ],
    34: [
            {
                label: '植物观察员',
                code: `# ESP32 × AI 科创课程 · 第34课《把AI装进去》植物观察员保底链路（healthy/dry/unknown 三档）
# 接线：OLED 22/21；灯带→GPIO5；蜂鸣器→GPIO13；需 ssd1306.py
# 消息格式「词,把握分」；自选作品按钮+DHT11 同用时按钮改 GPIO27
# 联网课先改四样：你的WiFi名 / 你的WiFi密码 / 你的巴法云私钥 / 主题里的组号
# （B 路径保底：卡在网络/平台时，本文件改参数即可照常完成任务）

from machine import Pin, SoftI2C
import network, time, neopixel, ssd1306
from umqtt.simple import MQTTClient

WIFI_SSID = "你的WiFi名"; WIFI_PASS = "你的WiFi密码"
BEMFA_KEY = "你的巴法云私钥"
TOPIC = "g1plant01"              # 植物观察员的识别主题
GREEN_LINE = 80; YELLOW_LINE = 50    # 三档线（L32 的把握分规矩）

i2c = SoftI2C(scl=Pin(22), sda=Pin(21))
oled = ssd1306.SSD1306_I2C(128, 64, i2c)
np = neopixel.NeoPixel(Pin(5), 8)
buzzer = Pin(13, Pin.OUT)

def light(r, g, b):
    for i in range(8):
        np[i] = (r, g, b)
    np.write()

def oled_show(a, b=""):
    oled.fill(0); oled.text(a, 0, 20)
    if b:
        oled.text(b, 0, 40)
    oled.show()

def on_vision(topic, msg):       # 收到「词,把握分」：healthy / dry / unknown
    word, score = msg.decode().split(",")
    score = int(score)
    print(word, score)
    if score < YELLOW_LINE:              # 红：不信，当没看见
        return
    if score < GREEN_LINE:               # 黄：不确定，不动作
        light(40, 30, 0); oled_show("?", str(score)); return
    if word == "healthy":                # 绿档 + 健康 → 绿灯
        light(0, 40, 0); oled_show("HEALTHY")
    elif word == "dry":                  # 绿档 + 缺水 → 红灯 + 蜂鸣 + 提醒
        light(40, 0, 0); oled_show("WATER!")
        buzzer.value(1); time.sleep(1); buzzer.value(0)
    else:                                # 认不出 → 黄灯不动作
        light(40, 30, 0); oled_show("?")

wlan = network.WLAN(network.STA_IF); wlan.active(True)
wlan.connect(WIFI_SSID, WIFI_PASS)
while not wlan.isconnected():
    time.sleep(0.5)
client = MQTTClient(BEMFA_KEY, "mqtt.bemfa.com", 9501)
client.set_callback(on_vision)
client.connect(); client.subscribe(TOPIC)
oled_show("PLANT", "WATCHER")
while True:
    client.check_msg(); time.sleep(0.1)`,
            },
    ],
};

// 落地页和地图上要标「带参考代码」，只需要课次列表，不必碰代码正文。
export const LESSONS_WITH_REFERENCE_CODE = Object.keys(esp32ReferenceCode).map(Number);
