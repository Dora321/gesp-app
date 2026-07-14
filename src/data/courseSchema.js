export const COURSE_SCHEMA_VERSION = 1;

const SUPPORTED_LANGUAGES = new Set(['cpp', 'python']);
const SUPPORTED_KINDS = new Set(['level', 'foundation', 'project']);

const assertText = (value, label) => {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value.trim();
};

const assertTextList = (value, label) => {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error(`${label} must contain at least one item.`);
  }
  return Object.freeze(value.map((item, index) => assertText(item, `${label}[${index}]`)));
};

const normalizeLink = (link, label) => Object.freeze({
  label: assertText(link?.label, `${label}.label`),
  path: assertText(link?.path, `${label}.path`),
});

const normalizeQuality = (details, label) => {
  const source = details?.quality || details;
  return Object.freeze({
    accent: assertText(source?.accent || 'blue', `${label}.accent`),
    goals: assertTextList(source?.goals, `${label}.goals`),
    deliverables: assertTextList(source?.deliverables, `${label}.deliverables`),
    checks: assertTextList(source?.checks, `${label}.checks`),
  });
};

export function defineCourse({ id, title, language, kind, items, detailsById, pathFor }) {
  const courseId = assertText(id, 'course.id');
  if (!SUPPORTED_LANGUAGES.has(language)) throw new Error(`${courseId}: unsupported language ${language}.`);
  if (!SUPPORTED_KINDS.has(kind)) throw new Error(`${courseId}: unsupported course kind ${kind}.`);
  if (!Array.isArray(items) || items.length === 0) throw new Error(`${courseId}: items must not be empty.`);

  const seen = new Set();
  const normalizedItems = items.map((item, index) => {
    const itemId = item?.id;
    if ((typeof itemId !== 'string' && typeof itemId !== 'number') || String(itemId).trim() === '') {
      throw new Error(`${courseId}: item ${index + 1} has no valid id.`);
    }
    if (seen.has(itemId)) throw new Error(`${courseId}: duplicate item id ${itemId}.`);
    seen.add(itemId);

    const details = detailsById?.[itemId];
    if (!details) throw new Error(`${courseId}: item ${itemId} has no learning details.`);
    const path = item.path || pathFor?.(itemId);

    return Object.freeze({
      ...item,
      id: itemId,
      title: assertText(item.title, `${courseId}.${itemId}.title`),
      path: assertText(path, `${courseId}.${itemId}.path`),
      quality: normalizeQuality(details, `${courseId}.${itemId}.quality`),
      details: Object.freeze({ ...details }),
    });
  });

  return Object.freeze({
    schemaVersion: COURSE_SCHEMA_VERSION,
    id: courseId,
    title: assertText(title, `${courseId}.title`),
    language,
    kind,
    items: Object.freeze(normalizedItems),
  });
}

const resolveBoundary = (boundary, context) => {
  if (!boundary) return null;
  const value = typeof boundary === 'function' ? boundary(context) : boundary;
  if (!value) return null;
  return Object.freeze({
    title: assertText(value.title, `${context.course.id}.boundary.title`),
    path: assertText(value.path, `${context.course.id}.boundary.path`),
    reason: assertText(value.reason, `${context.course.id}.boundary.reason`),
  });
};

const toNavigation = (item, reason, label) => Object.freeze({
  title: item.title,
  path: item.path,
  reason: assertText(reason, label),
});

export function createSequentialCourseSupport(course, {
  previousReasons = {},
  nextReasons = {},
  practiceLinksById = {},
  reviewTasksById = {},
  entry = null,
  exit = null,
  getExtra = () => ({}),
} = {}) {
  if (!course?.items || course.schemaVersion !== COURSE_SCHEMA_VERSION) {
    throw new Error('createSequentialCourseSupport requires a defined course schema.');
  }

  return itemId => {
    const index = course.items.findIndex(item => item.id === itemId);
    if (index < 0) return null;

    const current = course.items[index];
    const previousItem = course.items[index - 1];
    const nextItem = course.items[index + 1];
    const context = { course, current, index };
    const practiceLinks = (practiceLinksById[itemId] || []).map((link, linkIndex) =>
      normalizeLink(link, `${course.id}.${itemId}.practiceLinks[${linkIndex}]`));
    const reviewSource = reviewTasksById[itemId] || current.details.reviewTasks;

    return Object.freeze({
      current,
      lesson: current,
      quality: current.quality,
      previous: previousItem
        ? toNavigation(previousItem, previousReasons[itemId], `${course.id}.${itemId}.previousReason`)
        : resolveBoundary(entry, context),
      next: nextItem
        ? toNavigation(nextItem, nextReasons[itemId], `${course.id}.${itemId}.nextReason`)
        : resolveBoundary(exit, context),
      practiceLinks: Object.freeze(practiceLinks),
      reviewTasks: assertTextList(reviewSource, `${course.id}.${itemId}.reviewTasks`),
      ...getExtra(current, context),
    });
  };
}
