# 科创网页课件

现行课程以 `src/data/innovationCourseCatalog.js` 为唯一课时清单：

- 初阶科创：`/innovation-foundation`，15 课，资源在 `public/courseware/innovation-foundation`。
- ESP32 MicroPython 高阶科创：`/hardware/esp32-curriculum`，当前第 1–23 课及第 16.5 课，资源在 `public/courseware/innovation`。

高阶原 35 课、学习地图和竞赛延伸页面已整体撤下。旧入口转到现行目录；已上线课号沿用 `/hardware/esp32/:num`。先前误分类产生的 `/innovation/:id` 也重定向到高阶课时。

## 补充课件

1. 将 HTML 和所需资源放入对应资源目录，保持相对引用可用；不上传生成脚本或系统隐藏文件。
2. 在对应课时清单中增加课号、标题与文件路径；按原课号排序，不为未提供的课件创建可点击入口。
3. 更新课程说明里的已上线课号、首页描述，然后运行 `npm run generate:sitemap`。
4. 运行 `npm test`、`npm run check`、`npm run build`，并检查目录入口、翻页、相邻课时、全屏和手机横屏。

原始来源位于本机 OneDrive 的「课件/8.初阶科创/04_课件_HTML」和「课件/5.ESP32_Micropython项目(AI深度参与版)/网页课件_HTML版」。

阅读器以固定 1280×720 视口等比缩放课件，避免手机窄屏挤坏幻灯片。初阶课件使用系统字体回退，并对粉底文字做了对比度修正；两套演示运行时的备注区支持键盘聚焦。课文与讲解备注保留原始内容。
