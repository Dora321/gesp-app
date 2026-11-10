// 课堂积分榜的纯函数：读取本地存储（容错）与 CSV 导出。

export const STUDENTS_KEY = 'classroom_students';
export const HISTORY_KEY = 'classroom_history';

/** 读取一个数组型的 localStorage 键；数据损坏或不可用时返回 []，不让异常冒到全局错误页。 */
export function readStoredList(key, storage = globalThis.localStorage) {
    try {
        const raw = storage?.getItem(key);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

/** 只保留渲染时安全的条目，避免一条坏记录在渲染阶段抛错。 */
export const readStudents = (storage) => readStoredList(STUDENTS_KEY, storage)
    .filter((s) => s && typeof s.name === 'string' && Number.isFinite(s.points));

export const readHistory = (storage) => readStoredList(HISTORY_KEY, storage)
    .filter((h) => h && typeof h.time === 'string' && typeof h.studentName === 'string');

export function writeStoredList(key, list, storage = globalThis.localStorage) {
    try {
        storage?.setItem(key, JSON.stringify(list));
    } catch {
        // 存储已满或被禁用：本次课堂仍可在内存里继续使用。
    }
}

/** RFC 4180：含逗号、引号、换行时整格加引号，内部引号写成两个。 */
export function escapeCsvCell(value) {
    const text = value == null ? '' : String(value);
    return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

/** 生成带 BOM 的 CSV 文本（BOM 让 Windows 版 Excel 按 UTF-8 打开中文）。 */
export function buildPointsCsv(students = []) {
    const rows = [['姓名', '分数'], ...students.map((s) => [s.name, s.points])];
    return '﻿' + rows.map((row) => row.map(escapeCsvCell).join(',')).join('\r\n');
}
