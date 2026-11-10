// 版本号变化时 activate 会删掉所有旧缓存（含 v1 时期累积的旧 hash 分块）。
const CACHE_VERSION = 'v2';
const SHELL_CACHE = `gesp-app-shell-${CACHE_VERSION}`;
const ASSET_CACHE = `gesp-app-assets-${CACHE_VERSION}`;
const KEEP_CACHES = [SHELL_CACHE, ASSET_CACHE];
// 静态分块带内容 hash，每次发版都会换名字；只保留最近写入的这么多条，
// 旧版本的分块会被淘汰，不会无限堆积。
const MAX_ASSET_ENTRIES = 150;
const MAX_SHELL_ENTRIES = 60;
const APP_ROOT = '/gesp-app/';
const PRECACHE = [
  APP_ROOT,
  `${APP_ROOT}logo.jpg`,
  `${APP_ROOT}icon-192.png`,
  `${APP_ROOT}icon-512.png`,
  `${APP_ROOT}manifest.webmanifest`,
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(SHELL_CACHE).then(cache => cache.addAll(PRECACHE)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => !KEEP_CACHES.includes(key)).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// cache.keys() 按写入顺序返回；超出上限时从最旧的开始删。
const trimCache = async (cacheName, maxEntries) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  const excess = keys.length - maxEntries;
  for (let i = 0; i < excess; i++) await cache.delete(keys[i]);
};

// 只缓存完整的同源成功响应；copy 必须在把原响应交给页面之前同步 clone，
// 否则 body 已被读取，clone() 会抛 TypeError，资源永远进不了缓存。
const putInCache = (cacheName, maxEntries, request, response) => {
  if (!response || !response.ok || response.status !== 200 || response.type !== 'basic') return undefined;
  const copy = response.clone();
  return caches.open(cacheName)
    .then(cache => cache.put(request, copy))
    .then(() => trimCache(cacheName, maxEntries))
    .catch(() => {});
};

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin || !url.pathname.startsWith(APP_ROOT)) return;

  const isNavigation = request.mode === 'navigate';
  const network = fetch(request);
  // 这个 then 先于下面 respondWith 的链注册，所以 clone 一定发生在页面读 body 之前；
  // waitUntil 同步调用，保证 SW 在写完缓存前不被回收。
  event.waitUntil(
    network
      .then(response => (isNavigation
        ? putInCache(SHELL_CACHE, MAX_SHELL_ENTRIES, request, response)
        : putInCache(ASSET_CACHE, MAX_ASSET_ENTRIES, request, response)))
      .catch(() => {})
  );

  if (isNavigation) {
    event.respondWith(
      network.catch(async () => (await caches.match(request)) || caches.match(APP_ROOT))
    );
    return;
  }

  // 静态资源：有缓存先给缓存（后台刷新），没有就走网络。
  event.respondWith(caches.match(request).then(cached => cached || network));
});
