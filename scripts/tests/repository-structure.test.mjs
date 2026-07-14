import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');

function listSourceFiles(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return listSourceFiles(entryPath);
    return /\.(?:js|jsx)$/.test(entry.name) ? [entryPath] : [];
  });
}

test('museum exhibit data is split without losing or duplicating exhibits', () => {
  const aggregate = fs.readFileSync(path.join(root, 'src/data/museumExhibits.jsx'), 'utf8');
  const partPaths = [1, 2, 3, 4].map(index => path.join(root, `src/data/museum-exhibits/part${index}.jsx`));
  const ids = partPaths.flatMap(partPath => {
    assert.ok(fs.existsSync(partPath), `${partPath} is missing`);
    return [...fs.readFileSync(partPath, 'utf8').matchAll(/\n\s*id:\s*'([^']+)'/g)].map(match => match[1]);
  });

  assert.equal(ids.length, 100);
  assert.equal(new Set(ids).size, 100);
  for (let index = 1; index <= 4; index += 1) {
    assert.match(aggregate, new RegExp(`museumExhibitsPart${index}`));
  }
});

test('sorting project keeps orchestration separate from bounded slide modules', () => {
  const files = [
    'src/courses/python/advanced/PythonSortingProject.jsx',
    'src/courses/python/advanced/sortingProjectBasicSlides.jsx',
    'src/courses/python/advanced/sortingProjectAdvancedSlides.jsx',
    'src/courses/python/advanced/sortingProjectReviewSlides.jsx',
  ];

  for (const relativePath of files) {
    const lines = fs.readFileSync(path.join(root, relativePath), 'utf8').split('\n').length;
    assert.ok(lines < 900, `${relativePath} has grown to ${lines} lines`);
  }
});

test('large GESP aggregate data is split into bounded semantic modules', () => {
  const files = [
    ...[1, 2, 3, 4, 5, 6, 7, 8].map(level => `src/data/gesp/luogu-coding/level${level}.js`),
    ...[1, 2, 3].map(part => `src/data/gesp/verified-corrections/part${part}.js`),
    'src/data/gesp/luoguCodingByLevel.js',
    'src/data/gesp/verifiedQuestionCorrections.js',
  ];

  for (const relativePath of files) {
    const lines = fs.readFileSync(path.join(root, relativePath), 'utf8').split('\n').length;
    assert.ok(lines < 700, `${relativePath} has grown to ${lines} lines`);
  }
});

test('C++ level overviews keep orchestration and topic modules bounded', () => {
  const files = [
    ...[1, 2, 3].map(level => `src/courses/CourseLevel${level}.jsx`),
    'src/courses/course-level1/CoreModules.jsx',
    'src/courses/course-level1/PracticeModules.jsx',
    'src/courses/course-level2/CoreModules.jsx',
    'src/courses/course-level2/ReasoningModules.jsx',
    'src/courses/course-level2/ReviewModules.jsx',
    'src/courses/course-level2/Shared.jsx',
    'src/courses/course-level3/CoreModules.jsx',
    'src/courses/course-level3/ReasoningModules.jsx',
    'src/courses/course-level3/ReviewModules.jsx',
    'src/courses/course-level3/Shared.jsx',
  ];

  for (const relativePath of files) {
    const lines = fs.readFileSync(path.join(root, relativePath), 'utf8').split('\n').length;
    assert.ok(lines < 900, `${relativePath} has grown to ${lines} lines`);
  }
});

test('Python course pages keep orchestration and slide modules bounded', () => {
  const entryFiles = [
    'src/courses/python/foundation/PythonFoundation2.jsx',
    'src/courses/python/foundation/PythonFoundation3.jsx',
    'src/courses/python/foundation/PythonFoundation4.jsx',
    'src/courses/python/advanced/PythonAdvanced1.jsx',
    'src/courses/python/advanced/PythonAdvanced2.jsx',
    'src/courses/python/advanced/PythonCrawler.jsx',
  ];
  const moduleDirectories = [
    'src/courses/python/foundation/foundation2',
    'src/courses/python/foundation/foundation3',
    'src/courses/python/foundation/foundation4',
    'src/courses/python/advanced/advanced1',
    'src/courses/python/advanced/advanced2',
    'src/courses/python/advanced/crawler',
  ];
  const moduleFiles = moduleDirectories.flatMap(relativeDirectory =>
    fs.readdirSync(path.join(root, relativeDirectory))
      .filter(fileName => fileName.endsWith('.jsx'))
      .map(fileName => path.join(relativeDirectory, fileName)),
  );

  for (const relativePath of [...entryFiles, ...moduleFiles]) {
    const lines = fs.readFileSync(path.join(root, relativePath), 'utf8').split('\n').length;
    assert.ok(lines < 750, `${relativePath} has grown to ${lines} lines`);
  }
});

test('hand-maintained source modules stay below 1000 lines', () => {
  const sourceRoot = path.join(root, 'src');
  const oversized = listSourceFiles(sourceRoot).flatMap(filePath => {
    const relativePath = path.relative(root, filePath).split(path.sep).join('/');
    if (/^src\/data\/gesp\/level\d+\//.test(relativePath)) return [];
    const lines = fs.readFileSync(filePath, 'utf8').split('\n').length;
    return lines >= 1000 ? [`${relativePath} (${lines} lines)`] : [];
  });

  assert.deepEqual(oversized, [], `Split oversized source modules:\n${oversized.join('\n')}`);
});
