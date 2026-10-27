# 致谢与来源 / Attribution

本目录是 [Learn Arduino](https://learn-arduino-red.vercel.app/) 的离线镜像，嵌入 gesp-app 供课堂使用（ESP32 版见 `public/courseware/esp32/3d-course/`）。

- **原作者**：Dilum Sanjaya（[x.com/DilumSanjaya](https://x.com/DilumSanjaya)，GitHub [@dilums](https://github.com/dilums)）
- **原站**：https://learn-arduino-red.vercel.app/
- **镜像日期**：2026-10-23（commit `1780c38c`，入口 `assets/index-BodLthS6.js`）
- **许可**：上游未见公开源码和开源许可证；这是站点所有者接受风险后的离线镜像。作者要求时请立即下线。

## 改动
- 资源路径改成相对路径，可放在任意子路径（`/courseware/arduino/3d-course/`）。
- 语言：优先用 localStorage 里保存过的语言，其次跟随浏览器语言，都没有时用简体中文（`zh`）；在“语言”菜单切换后会存进 localStorage。
- canonical 链接改成相对路径。
- 保留页面里的 “Designed by x.com/DilumSanjaya” 署名。
