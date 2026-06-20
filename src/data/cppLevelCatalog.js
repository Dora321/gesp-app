export const cppLevelCatalog = [
  { level: 1, title: 'GESP C++ 一级', path: '/level1' },
  { level: 2, title: 'GESP C++ 二级', path: '/level2' },
  { level: 3, title: 'GESP C++ 三级', path: '/level3' },
  { level: 4, title: 'GESP C++ 四级', path: '/level4' },
  { level: 5, title: 'GESP C++ 五级', path: '/level5' },
  { level: 6, title: 'GESP C++ 六级', path: '/level6' },
  { level: 7, title: 'GESP C++ 七级', path: '/level7' },
  { level: 8, title: 'GESP C++ 八级', path: '/level8' },
];

export function getCppLevelCatalogItem(level) {
  return cppLevelCatalog.find((item) => item.level === level) || null;
}
