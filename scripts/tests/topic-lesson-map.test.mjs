import test from 'node:test';
import assert from 'node:assert/strict';
import { cppLessonIndex } from '../../src/data/cppLessonIndex.js';
import {
    getRelatedLessonsForTags,
    getRelatedTagsForLesson,
    getTopicPracticePathForLesson,
    topicLessonMap,
} from '../../src/data/gesp/topicLessonMap.js';
import { getTopicGroup, normalizeTopicTags } from '../../src/data/gesp/topicTaxonomy.js';

test('考点映射采用规范标签，课程路由与已有索引精确匹配', () => {
    const byPath = new Map(cppLessonIndex.map((lesson) => [lesson.path, lesson]));
    for (const [tag, lessons] of topicLessonMap) {
        assert.deepEqual(normalizeTopicTags([tag]), [tag]);
        assert.notEqual(getTopicGroup(tag), '其他考点', tag);
        assert.ok(lessons.length > 0, tag);
        assert.equal(new Set(lessons.map(({ path }) => path)).size, lessons.length, tag);
        for (const { level, lessonId, path, title } of lessons) {
            const indexed = byPath.get(path);
            assert.ok(indexed, path);
            assert.equal(path, `/lesson/${level}/${lessonId}`);
            assert.equal(lessonId, indexed.id);
            assert.equal(level, indexed.level);
            assert.equal(title, indexed.title);
            assert.ok(getRelatedTagsForLesson(level, lessonId).includes(tag));
            assert.equal(getTopicPracticePathForLesson(level, lessonId), `/question-bank/topics/${level}?lesson=${lessonId}`);
        }
    }
});

test('匹配考点别名，优先选当前级别，再按命中数量排序并去重', () => {
    const matches = getRelatedLessonsForTags(['循环结构', '嵌套循环', '循环'], 2);
    assert.equal(matches.length, 3);
    assert.equal(matches[0].path, '/lesson/2/5');
    assert.equal(matches[1].path, '/lesson/2/6');
    assert.equal(new Set(matches.map(({ path }) => path)).size, matches.length);
    assert.deepEqual(getRelatedLessonsForTags(['二分查找'], 2, 1).map(({ path }) => path), ['/lesson/5/10']);
    assert.deepEqual(getRelatedLessonsForTags(['GESP2级', '判断题', '未知标签'], 2), []);
    assert.deepEqual(getRelatedLessonsForTags(['循环'], 2, 0), []);
    assert.deepEqual(getRelatedTagsForLesson(2, '999'), []);
    assert.equal(getTopicPracticePathForLesson(2, '999'), null);
});
