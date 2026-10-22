/* fitstage.js —— 定宽舞台等比缩放
 *
 * 课件按 1600×900 设计稿排版，本脚本把整个 .deck 等比缩放到当前窗口/投影仪分辨率。
 * 这样 1024×768、1600×900、1920×1080、4K 投影上看到的比例完全一致——
 * 字号、留白、描边、投影一起缩放，不会出现「换台投影仪字就变小」。
 * 多余的边缘留黑边（letterbox），投影时看起来就是一块规整的幕布。
 */
(function () {
  var W = 1600, H = 900;

  function fit() {
    var s = Math.min(window.innerWidth / W, window.innerHeight / H);
    document.documentElement.style.setProperty('--fit', s);
  }

  fit();
  window.addEventListener('resize', fit);
  window.addEventListener('orientationchange', fit);
  // 全屏切换后视口尺寸变化有延迟，补一拍
  document.addEventListener('fullscreenchange', function () { setTimeout(fit, 60); });
})();
