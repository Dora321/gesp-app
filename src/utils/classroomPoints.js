export const STUDENTS_KEY = 'classroom_students';
export const HISTORY_KEY = 'classroom_history';
export const CLASSROOM_POINTS_KEY = 'gesp_classroom_points_v1';

const defaultClassId = 'default';
const makeId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
const availableStorage = (storage) => storage === undefined ? globalThis.localStorage : storage;

function readStoredJson(key, storage) {
    try {
        return JSON.parse(availableStorage(storage)?.getItem(key) ?? 'null');
    } catch {
        return null;
    }
}

/** 读取一个数组型的 localStorage 键；数据损坏或不可用时返回 []。 */
export function readStoredList(key, storage) {
    const value = readStoredJson(key, storage);
    return Array.isArray(value) ? value : [];
}

const validStudent = (student) => student && typeof student.name === 'string' && Number.isFinite(student.points);
const validHistory = (entry) => entry && typeof entry.time === 'string' && typeof entry.studentName === 'string';

export const readStudents = (storage) => readStoredList(STUDENTS_KEY, storage).filter(validStudent);
export const readHistory = (storage) => readStoredList(HISTORY_KEY, storage).filter(validHistory);

export function writeStoredList(key, list, storage) {
    try {
        availableStorage(storage)?.setItem(key, JSON.stringify(list));
    } catch {
        // 存储已满或被禁用：本次课堂仍可在内存里继续使用。
    }
}

export function createClassroom(name, id = makeId()) {
    return { id, name, students: [], history: [], drawnIds: [] };
}

function normalizeClassroom(classroom) {
    const students = Array.isArray(classroom.students) ? classroom.students.filter(validStudent) : [];
    const ids = new Set();
    const normalizedStudents = students.map((student, index) => {
        let { id } = student;
        if ((!Number.isFinite(id) && (typeof id !== 'string' || !id)) || ids.has(id)) {
            id = `student-${index}`;
            while (ids.has(id)) id += '-';
        }
        ids.add(id);
        return {
            id,
            name: student.name,
            points: student.points,
            group: typeof student.group === 'string' ? student.group.trim() : '',
        };
    });

    const history = Array.isArray(classroom.history)
        ? classroom.history.filter(validHistory).map((entry, index) => ({
            id: typeof entry.id === 'string' || Number.isFinite(entry.id) ? entry.id : `record-${index}`,
            time: entry.time,
            studentName: entry.studentName,
            diff: Number.isFinite(entry.diff) ? entry.diff : 0,
            reason: typeof entry.reason === 'string' ? entry.reason : '',
        }))
        : [];
    const drawnIds = Array.isArray(classroom.drawnIds) ? [...new Set(classroom.drawnIds.filter((id) => ids.has(id)))] : [];
    return { ...createClassroom(classroom.name, classroom.id), students: normalizedStudents, history, drawnIds };
}

export function readClassroomPoints(storage) {
    const stored = readStoredJson(CLASSROOM_POINTS_KEY, storage);
    if (Array.isArray(stored?.classes)) {
        const ids = new Set();
        const classes = [];
        for (const classroom of stored.classes) {
            if (typeof classroom?.id !== 'string' || !classroom.id || typeof classroom.name !== 'string' || ids.has(classroom.id)) continue;
            classes.push(normalizeClassroom(classroom));
            ids.add(classroom.id);
        }
        if (classes.length) {
            const activeClassId = ids.has(stored.activeClassId) ? stored.activeClassId : classes[0].id;
            return { classes, activeClassId };
        }
    }
    const classroom = normalizeClassroom({
        ...createClassroom('默认班级', defaultClassId),
        students: readStudents(storage),
        history: readHistory(storage),
    });
    return { classes: [classroom], activeClassId: classroom.id };
}

export function writeClassroomPoints(data, storage) {
    try {
        const target = availableStorage(storage);
        const active = data.classes.find((classroom) => classroom.id === data.activeClassId);
        if (!target || !active) return false;
        target.setItem(CLASSROOM_POINTS_KEY, JSON.stringify(data));
        // 旧版读取入口和浮动按钮的名单人数继续读取当前班级。
        writeStoredList(STUDENTS_KEY, active.students, target);
        writeStoredList(HISTORY_KEY, active.history, target);
        return true;
    } catch {
        return false;
    }
}

export function adjustClassroomPoints(classroom, studentId, diff, reason, now = new Date()) {
    const student = classroom.students.find(({ id }) => id === studentId);
    if (!student || !Number.isFinite(student.points + diff)) return classroom;

    return {
        ...classroom,
        students: classroom.students.map((entry) => entry.id === studentId
            ? { ...entry, points: entry.points + diff }
            : entry),
        history: [{
            id: makeId(),
            time: now.toLocaleString('zh-CN'),
            studentName: student.name,
            diff,
            reason,
        }, ...classroom.history],
    };
}

export function drawClassroomStudent(students, drawnIds = [], random = Math.random) {
    if (!students.length) return { student: null, drawnIds: [] };
    const roster = new Set(students.map(({ id }) => id));
    const current = new Set(drawnIds.filter((id) => roster.has(id)));
    let pool = students.filter(({ id }) => !current.has(id));
    if (!pool.length) {
        const previous = [...current].at(-1);
        pool = students.length > 1 ? students.filter(({ id }) => id !== previous) : students;
        current.clear();
    }
    const student = pool[Math.floor(random() * pool.length)];
    return { student, drawnIds: [...current, student.id] };
}

export function summarizeClassroomGroups(students) {
    const groups = new Map();
    for (const { group, points } of students) {
        if (!group) continue;
        const stats = groups.get(group) ?? { name: group, count: 0, total: 0 };
        stats.count += 1;
        stats.total += points;
        groups.set(group, stats);
    }
    return [...groups.values()]
        .map((stats) => ({ ...stats, average: stats.total / stats.count }))
        .sort((a, b) => b.total - a.total || b.average - a.average || a.name.localeCompare(b.name, 'zh-CN'));
}

/** RFC 4180：含逗号、引号、换行时整格加引号，内部引号写成两个。 */
export function escapeCsvCell(value) {
    const text = value == null ? '' : String(value);
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

const buildCsv = (rows) => '\uFEFF' + rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n');

/** BOM 让 Windows 版 Excel 按 UTF-8 打开中文。 */
export function buildPointsCsv(students = []) {
    const hasGroups = students.some((student) => student.group);
    const header = hasGroups ? ['姓名', '分数', '分组'] : ['姓名', '分数'];
    return buildCsv([header, ...students.map(({ name, points, group }) => (
        hasGroups ? [name, points, group] : [name, points]
    ))]);
}

export function buildPointsHistoryCsv(history = []) {
    return buildCsv([['时间', '姓名', '分数变动', '原因'], ...history.map((entry) => (
        [entry.time, entry.studentName, entry.diff, entry.reason]
    ))]);
}

function readCsvRows(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let quoted = false;
    let closed = false;
    for (let index = 0; index < text.length; index += 1) {
        const char = text[index];
        if (quoted) {
            if (char === '"' && text[index + 1] === '"') {
                cell += char;
                index += 1;
            } else if (char === '"') {
                quoted = false;
                closed = true;
            } else {
                cell += char;
            }
        } else if (char === ',' || char === '\r' || char === '\n') {
            row.push(cell);
            cell = '';
            closed = false;
            if (char !== ',') {
                if (char === '\r' && text[index + 1] === '\n') index += 1;
                rows.push(row);
                row = [];
            }
        } else if (char === '"' && !cell && !closed) {
            quoted = true;
        } else {
            if (closed || char === '"') throw new Error('CSV 引号格式不正确。');
            cell += char;
        }
    }
    if (quoted) throw new Error('CSV 引号没有闭合。');
    rows.push([...row, cell]);
    return rows.filter((cells) => cells.some((value) => value.trim()));
}

export function parseClassroomRoster(text) {
    const source = text.replace(/^\uFEFF/, '');
    const hasHeader = /^\s*"?姓名"?[ \t]*,/.test(source);
    const plainNames = () => source.split(/\r\n|\r|\n/).map((name) => name.trim()).filter(Boolean).map((name) => ({ name }));
    if (!hasHeader && !source.includes(',')) return plainNames();

    let rows;
    try {
        rows = readCsvRows(source);
    } catch (error) {
        if (hasHeader) throw error;
        return plainNames();
    }
    if (hasHeader) {
        const columns = rows.shift().map((value) => value.trim());
        if (columns[1] !== '分数' || (columns.length > 2 && (columns[2] !== '分组' || columns.length !== 3))) {
            throw new Error('CSV 表头应为「姓名,分数」或「姓名,分数,分组」。');
        }
    } else if (!rows.length || !rows.some(([, score]) => score?.trim() && Number.isFinite(Number(score)))) {
        return plainNames();
    }

    return rows.map(([name, score, group, ...extra]) => {
        const points = score?.trim() ? Number(score) : undefined;
        if (!name.trim() || extra.length || (points !== undefined && !Number.isFinite(points))) {
            throw new Error('请检查 CSV 的姓名、分数和分组。');
        }
        return { name: name.trim(), points, group: group?.trim() };
    });
}

export function mergeClassroomRoster(students, entries, makeStudentId = makeId) {
    const merged = [...students];
    const byName = new Map();
    students.forEach(({ name }, index) => {
        if (!byName.has(name.trim())) byName.set(name.trim(), index);
    });
    for (const { name, points, group } of entries) {
        const index = byName.get(name);
        if (index === undefined) {
            byName.set(name, merged.length);
            merged.push({ id: makeStudentId(), name, points: points ?? 0, group: group ?? '' });
        } else {
            const student = merged[index];
            merged[index] = { ...student, points: points ?? student.points, group: group ?? student.group };
        }
    }
    return merged;
}
