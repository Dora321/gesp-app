import { scienceCourses } from '../../src/data/innovationCourseCatalog.js';

export const embeddedAiPages = new Set([
  ...Object.values(scienceCourses).flatMap(({ assetDirectory, lessons }) => (
    lessons.map(({ file }) => `courseware/${assetDirectory}/${file}`)
  )),
  'courseware/arduino/3d-course/index.html',
  'courseware/esp32/3d-course/index.html',
  'courseware/electronics-101/index.html',
  'esp-labs/index.html',
]);

export function embedAiLauncher(html, source) {
  const script = `<script type="module" src="${source}"></script>`;
  return /<\/body\s*>/i.test(html) ? html.replace(/<\/body\s*>/i, `${script}\n$&`) : `${html}\n${script}`;
}
