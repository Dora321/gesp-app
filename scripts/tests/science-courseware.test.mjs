import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { scienceCourses } from '../../src/data/innovationCourseCatalog.js';

const root = fileURLToPath(new URL('../../', import.meta.url));
const readText = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

test('every published science lesson ships its HTML and local resource references', () => {
    const routes = new Set();
    for (const course of Object.values(scienceCourses)) {
        for (const lesson of course.lessons) {
            assert.ok(!routes.has(lesson.path), `Duplicate lesson route: ${lesson.path}`);
            routes.add(lesson.path);
            const filename = path.join(root, 'public/courseware', course.assetDirectory, lesson.file);
            const html = fs.readFileSync(filename, 'utf8');
            assert.match(html, /<section class="slide/, `${lesson.path} must contain actual slides`);
            for (const [, reference] of html.matchAll(/(?:src|href)=["']([^"']+)/g)) {
                if (/^(?:https?:|data:|mailto:|#)/.test(reference)) continue;
                const resource = path.resolve(path.dirname(filename), decodeURIComponent(reference.split(/[?#]/)[0]));
                assert.ok(fs.existsSync(resource), `${lesson.path} is missing ${reference}`);
            }
        }
    }
});

test('hardware courseware links use the deployment base instead of a hard-coded GitHub Pages origin', () => {
    const files = ['src/hardware/pages/HardwareLanding.jsx', 'src/components/ExploreMore.jsx'];
    for (const relativePath of files) {
        const source = readText(relativePath);
        assert.doesNotMatch(
            source,
            /dora321\.github\.io\/gesp-app\/courseware/,
            `${relativePath} must not hard-code the GitHub Pages courseware URL`
        );
        assert.match(
            source,
            /`\$\{import\.meta\.env\.BASE_URL\}courseware\/arduino\/3d-course\/`/,
            `${relativePath} must build the Arduino 3D course link from BASE_URL`
        );
    }
});

test('classroom admin page returns to the site that is actually serving it', () => {
    const source = readText('server/admin.html');
    assert.doesNotMatch(source, /dora321\.github\.io/, 'server/admin.html must not hard-code the production host');
    assert.match(source, /<a href="\/">返回学生课堂/, 'server/admin.html must link back to the current site root');
});

test('science lesson viewer records lesson mastery and keeps status in sync', () => {
    const source = readText('src/pages/InnovationLesson.jsx');
    assert.match(source, /recordLessonMastered\(lesson\.path\)/, 'lesson viewer must be able to mark the current lesson as mastered');
    assert.match(source, /getLessonStatus\(lesson\.path, progress\)/, 'lesson viewer must show the current mastery status');
    assert.match(source, /LEARNING_DATA_EVENT/, 'lesson viewer must refresh when learning data changes');
    assert.match(source, /完成本课学习（标记已过关）/, 'unmastered lessons need a clear call to action');
    assert.match(source, /已完成本课（再次点击刷新复习时间）/, 'mastered lessons need a checked status label');
    assert.match(source, /已完成复习，更新记录/, 'aged mastered lessons need a review refresh label');
    assert.match(source, /<button[^>]*[\s\S]*?min-h-11/, 'mastery control must be a real button at least 44px tall');
});

test('hardware landing shows per-lesson status chips', () => {
    const source = readText('src/hardware/pages/HardwareLanding.jsx');
    assert.match(source, /readLessonProgress/, 'hardware landing must read lesson progress');
    assert.match(source, /LEARNING_DATA_EVENT/, 'hardware landing must refresh when learning data changes');
    assert.match(source, /LESSON_STATUS_META\[status\]/, 'hardware landing must render the lesson status label');
});

test('service worker serves hashed assets cache-first and parses as valid JavaScript', () => {
    const source = readText('public/sw.js');
    assert.doesNotThrow(() => new vm.Script(source, { filename: 'public/sw.js' }), 'public/sw.js must be syntactically valid');

    const handler = source.slice(source.indexOf("self.addEventListener('fetch'"));
    assert.match(handler, /const isHashedAsset = url\.pathname\.startsWith\(`\$\{APP_ROOT\}assets\/`\)/);
    assert.match(
        handler,
        /caches\.match\(request\)\.then\(cached => cached \|\| fetch\(request\)/,
        'hashed assets must be served from cache before hitting the network'
    );
    assert.match(handler, /putInCache\(ASSET_CACHE, MAX_ASSET_ENTRIES, request, response\)/);
});
