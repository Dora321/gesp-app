import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cases = [
  {
    file: 'dist/question-bank/2/2026-03-l2/index.html',
    title: '2026年3月 GESP C++ 2级真题',
    canonical: 'https://Dora321.github.io/gesp-app/question-bank/2/2026-03-l2',
  },
  {
    file: 'dist/hardware/esp32-ai/index.html',
    title: 'ESP32 × MicroPython × AI 课程',
    canonical: 'https://Dora321.github.io/gesp-app/hardware/esp32-ai',
  },
];

for (const item of cases) {
  const filePath = path.join(root, item.file);
  if (!fs.existsSync(filePath)) throw new Error(`Missing prerendered route: ${item.file}`);
  const html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes(item.title)) throw new Error(`${item.file} does not contain its route title.`);
  if (!html.includes(`rel="canonical" href="${item.canonical}"`)) throw new Error(`${item.file} has an incorrect canonical URL.`);
}

for (const file of ['dist/manifest.webmanifest', 'dist/sw.js', 'dist/icon-192.png', 'dist/icon-512.png']) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing PWA asset: ${file}`);
}

console.log('Static route metadata and PWA assets are present.');
