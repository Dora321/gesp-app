const fs = require('node:fs/promises');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'public', 'search-index.json');

async function buildSearchIndex() {
  const [
    { cppLessonIndex }, { cppLevelCatalog },
    { pythonFoundationLessons, pythonProjects }, { scienceCourses },
    { getPaper, paperIds, paperMeta }, { resolveTopicTags }, { paperCodingMap },
  ] = await Promise.all([
    import('../src/data/cppLessonIndex.js'), import('../src/data/cppLevelCatalog.js'),
    import('../src/data/pythonCourseCatalog.js'), import('../src/data/innovationCourseCatalog.js'),
    import('../src/data/gesp/index.js'), import('../src/data/gesp/topics.js'),
    import('../src/data/gesp/paperCodingMap.js'),
  ]);

  const course = (t, p, s) => ({ t, p, c: 'course', s });
  const courses = [
    ...cppLessonIndex.map(lesson => {
      const level = cppLevelCatalog[lesson.level - 1];
      return course(lesson.title, lesson.path, `${level.title} · L${level.level} · 第 ${lesson.id} 课`);
    }),
    ...cppLevelCatalog.map(level => course(`${level.title}冲刺`, level.path, `L${level.level} · 知识体系与备考`)),
    ...pythonFoundationLessons.map(lesson => course(lesson.title, lesson.path, `Python 基础 · ${lesson.catalogTitle}`)),
    ...pythonProjects.map(lesson => course(lesson.title, lesson.path, `Python 项目 · ${lesson.catalogTitle}`)),
    ...Object.values(scienceCourses).flatMap(line => line.lessons.map(lesson => (
      course(lesson.title, lesson.path, `${line.title} · 第 ${lesson.id} 课`)
    ))),
  ];

  const museumDir = path.join(root, 'src/data/museum-exhibits');
  const museumFiles = (await fs.readdir(museumDir)).filter(file => /^part\d+\.jsx$/.test(file)).sort();
  const exhibits = (await Promise.all(museumFiles.map(async file => {
    const source = await fs.readFile(path.join(museumDir, file), 'utf8');
    // 展品元数据是 JSX 对象中连续的三个字段，直接读标题和年份，不执行渲染代码。
    return [...source.matchAll(/^\s*title: '(.+)',\s*\n\s*rarity: '[^']+',\s*\n\s*year: '([^']+)',/gm)]
      .map(([, title, year]) => ({ t: title.replace(/\\'/g, "'"), p: '/museum', c: 'museum', s: year }));
  }))).flat();

  const papers = await Promise.all(paperIds.filter(id => !paperMeta[id].unofficial).map(async id => {
    const { title, year, month, level, questions } = await getPaper(id);
    const tagCount = new Map();
    for (const question of questions) {
      for (const tag of new Set(resolveTopicTags(question))) {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      }
    }
    const tags = [...tagCount].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([tag]) => tag);
    const problemIds = Object.values(paperCodingMap[id] || {}).filter(pid => /^[A-Z]\d+$/.test(pid) && !pid.startsWith('P0000'));
    const date = `${year}-${String(month).padStart(2, '0')}`;
    return {
      t: title,
      p: `/question-bank/${level}/${id}`,
      c: 'paper',
      s: [`${date} · ${level} 级 · L${level}`, ...tags, ...new Set(problemIds)].join(' · '),
    };
  }));

  return [...courses, ...papers.reverse(), ...exhibits];
}

async function main() {
  const index = await buildSearchIndex();
  const json = `[${index.map(entry => JSON.stringify(entry)).join(',\n')}]\n`;
  await fs.writeFile(output, json);
  console.log(`Generated ${path.relative(root, output)} with ${index.length} entries (${Buffer.byteLength(json)} bytes).`);
}

module.exports = { buildSearchIndex };

if (require.main === module) {
  main().catch(error => {
    console.error(error);
    process.exitCode = 1;
  });
}
