import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scienceCourses } from '../../src/data/innovationCourseCatalog.js';

const root = fileURLToPath(new URL('../../', import.meta.url));

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
