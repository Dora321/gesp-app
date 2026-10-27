# 致谢与来源 / Attribution

本目录是 [Learn ESP32](https://learn-esp32.vercel.app/) 的离线镜像，嵌入 gesp-app 供课堂使用（做法同 `public/courseware/arduino/3d-course/`）。

- **原作者**：Dilum Sanjaya（[x.com/DilumSanjaya](https://x.com/DilumSanjaya)，GitHub [@dilums](https://github.com/dilums)）
- **原站**：https://learn-esp32.vercel.app/
- **发布帖**：https://x.com/DilumSanjaya/status/2114762155333689679
- **镜像日期**：2026-10-27（入口 `assets/index-DO8QxAnQ.js`）
- **许可**：上游没有公开源码和许可证；这是站点所有者接受风险后的离线镜像。作者要求时请立即下线。

## 改动
- 资源路径改成相对路径（HTML、CSS `url()`、Vite preload helper、`site.webmanifest`），可放在任意子路径。
- 默认语言：没有保存过语言时用简体中文（`zh`），不再跟随浏览器语言；在“语言”菜单切换后会存进 localStorage。
- canonical/og 链接改成相对路径；删掉了指向原站的 robots.txt / sitemap.xml。
- 保留页面里的 “Designed by x.com/DilumSanjaya” 署名。
