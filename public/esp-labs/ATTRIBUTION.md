# 致谢与项目溯源 / Attribution

本静态站基于开源项目 [esp-labs-web](https://github.com/agharsallah/esp-labs-web) 构建并嵌入 gesp-app。

- **原项目仓库**：https://github.com/agharsallah/esp-labs-web
- **构建提交**：[`a5ff451`](https://github.com/agharsallah/esp-labs-web/commit/a5ff451d3a66704404b26b1e9ed43156e3f591a3) (a5ff451d3a66704404b26b1e9ed43156e3f591a3)
- **原作者**：Abderrahmen Gharsallah / agharsallah ([GitHub @agharsallah](https://github.com/agharsallah))
- **配套固件仓库**：https://github.com/agharsallah/esp-labs
- **线上参考**：https://esp-labs-web.pages.dev/#/?lang=zh

## 本仓库中的用法

- 静态资源位于 `public/esp-labs/`（`pnpm build` 产物，`base: "./"`，可放在任意子路径）。
- 中文界面来自上游 i18n（`zh` / `zh-Hans`），入口链接带 `#/?lang=zh`，不再手改课程文案。
- 构建时读取同级固件仓库 `../esp-labs` 以填充代码阅读器（可选）。

感谢原作者 Abderrahmen Gharsallah 打造的优秀 ESP32 实验指南与交互式教学设计！
