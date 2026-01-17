# 硬件课程图片命名对照表

本文档列出了 16 节硬件课程所需的图片文件名及其用途，方便您批量准备和上传。

## 📂 文件结构预览
```
gesp-assets/
├── images/
│   └── hardware/
│       ├── scenarios/    # 封面情景图（Hero Images）
│       │   ├── l1_hero.webp
│       │   ├── l2_hero.webp
│       │   └── ...
│       └── diagrams/     # 接线原理图（Wiring Diagrams）
│           ├── l1_wiring.png
│           ├── l2_wiring.png
│           └── ...
```

---

## 🎨 图片需求清单

| 课程 | 封面图文件名 | 接线图文件名 | 课程主题 | 封面图建议内容 | 接线图建议内容 |
|:---:|:---:|:---:|:---|:---|:---|
| **第1课** | `l1_hero.webp` | `l1_wiring.png` | 你好，闪亮世界 | LED 灯珠闪烁的特写，或城市夜景灯光 | LED 模块连接到 D13 的示意图 |
| **第2课** | `l2_hero.webp` | `l2_wiring.png` | 我是指挥官 | 手指按下按钮的动作特写 | 按钮模块连接到 D2 的示意图 |
| **第3课** | `l3_hero.webp` | `l3_wiring.png` | 交通指挥灯 | 红绿灯路口或交通灯模块亮起 | 红、黄、绿 LED 分别连接 D13/D12/D11 |
| **第4课** | `l4_hero.webp` | `l4_wiring.png` | 魔法调光师 | 旋钮特写或调节台灯亮度的场景 | 旋钮连接 A0，LED 连接 D5 (PWM) |
| **第5课** | `l5_hero.webp` | `l5_wiring.png` | 嗓门大比拼 | 话筒/声浪图像或小孩大喊场景 | 声音传感器连接 A2 的示意图 |
| **第6课** | `l6_hero.webp` | `l6_wiring.png` | 超级凉爽风 | 风扇旋转或夏日清凉场景 | 风扇驱动模块连接 D5，旋钮连接 A0 |
| **第7课** | `l7_hero.webp` | `l7_wiring.png` | 招财猫的问候 | 舵机招手或招财猫摆手动作 | 舵机信号线（橙色）连接 D9 |
| **第8课** | `l8_hero.webp` | `l8_wiring.png` | 光影魔术手 | 光敏传感器或光影交替的艺术照 | 光敏传感器连接 A1 的示意图 |
| **第9课** | `l9_hero.webp` | `l9_wiring.png` | 独立小卫士 | Arduino 脱机运行，带电池盒供电 | LED 连接 D13（强调可脱机） |
| **第10课** | `l10_hero.webp` | `l10_wiring.png` | 智能楼道灯 | 楼道感应灯或夜晚走廊场景 | 光敏传感器 A1 + 按钮 D2 组合 |
| **第11课** | `l11_hero.webp` | `l11_wiring.png` | 小小报警器 | 蜂鸣器或安防警报场景 | 光敏 A1 + 按钮 D2 + 蜂鸣器 D8 |
| **第12课** | `l12_hero.webp` | `l12_wiring.png` | 智能温控扇 | 温度计或自动化风扇调节场景 | 旋钮 A0 + 风扇驱动 D5 |
| **第13课** | `l13_hero.webp` | `l13_wiring.png` | 自动道闸机 | 停车场道闸或超声波雷达探测 | 超声波 Trig→D6, Echo→D7, 舵机→D9 |
| **第14课** | `l14_hero.webp` | `l14_wiring.png` | 倒车请注意 | 倒车雷达或汽车传感器场景 | 超声波 D6/D7 + 蜂鸣器 D8 |
| **第15课** | `l15_hero.webp` | `l15_wiring.png` | 声控音乐盒 | 音乐盒或八音盒场景 | 声音传感器 A2 + 蜂鸣器 D8 |
| **第16课** | `l16_hero.webp` | `l16_wiring.png` | 未来智慧屋 | 智能家居概念图或综合项目展示 | 自定义综合接线（多个模块组合） |

---

## 🖼️ 图片规格建议

### 封面图 (Hero Images)
- **格式**: WebP（最佳压缩）或 JPEG
- **尺寸**: 1920×1080 或 1600×900（16:9 比例）
- **风格**: 氛围感强、色彩鲜明，符合"Bit Magic"科技感
- **文件大小**: 建议 < 300KB（已压缩）

### 接线图 (Wiring Diagrams)
- **格式**: PNG（保留细节）或 SVG（矢量更佳）
- **尺寸**: 800×600 或更大
- **风格**: 清晰、简洁、标注明确
- **工具推荐**: Fritzing、Wokwi 或手绘扫描

---

## 📤 上传步骤

1. **创建 GitHub 仓库**: `gesp-assets`（公开仓库）
2. **按上述结构创建文件夹**：
   ```bash
   mkdir -p images/hardware/scenarios
   mkdir -p images/hardware/diagrams
   ```
3. **将图片按命名规则放入对应文件夹**
4. **推送到 GitHub**：
   ```bash
   git add .
   git commit -m "add hardware lesson images"
   git push origin main
   ```
5. **等待 1-2 分钟** jsDelivr CDN 自动同步即可

---

## 🔗 URL 自动生成规则

上传后，您的图片会自动生成以下 URL：
- **封面图**: `https://cdn.jsdelivr.net/gh/Dora321/gesp-assets/images/hardware/scenarios/l1_hero.webp`
- **接线图**: `https://cdn.jsdelivr.net/gh/Dora321/gesp-assets/images/hardware/diagrams/l1_wiring.png`

**请将 `Dora321` 替换为您的 GitHub 用户名！**

---

## 💡 快速测试

上传第一张图片后，在浏览器直接访问对应的 CDN 链接，如果能看到图片，说明配置成功。然后刷新您的课程详情页，图片就会自动显示。

如果某节课的图片还没准备好，页面会自动隐藏对应区域，不影响整体美观。
