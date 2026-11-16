// 老师投屏讲题用的工具（目前是「页面标注」）默认不给学生显示：学生误触后
// 会进入画笔模式、页面滚不动，手机上浮钮还会压住「上一步」和搜索框。
//
// 打开：任意页面地址后加 ?teacher=1（本机记住，之后不用再加）；
// 关闭：地址加 ?teacher=0，或在标注面板里点「关闭教师工具」。
// 考试模式期间一律不显示（ExamPaper 通过 setExamFocus 告知）。

import { useEffect, useSyncExternalStore } from 'react';

export const TEACHER_TOOLS_KEY = 'gesp_teacher_tools';
const CHANGE_EVENT = 'gesp:teacher-tools';

const readEnabled = () => {
    try {
        return globalThis.localStorage?.getItem(TEACHER_TOOLS_KEY) === '1';
    } catch {
        return false;
    }
};

export function setTeacherToolsEnabled(enabled) {
    try {
        if (enabled) globalThis.localStorage?.setItem(TEACHER_TOOLS_KEY, '1');
        else globalThis.localStorage?.removeItem(TEACHER_TOOLS_KEY);
    } catch {
        // 存不了就只在本页生效，不影响学生使用。
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
}

const subscribeTeacherTools = (onChange) => {
    window.addEventListener(CHANGE_EVENT, onChange);
    window.addEventListener('storage', onChange);
    return () => {
        window.removeEventListener(CHANGE_EVENT, onChange);
        window.removeEventListener('storage', onChange);
    };
};

/** URL 里的 ?teacher=1 / ?teacher=0 只改开关，开关本身记在本机。 */
export function teacherFlagFromSearch(search = '') {
    const value = new URLSearchParams(search).get('teacher');
    if (value === '1') return true;
    if (value === '0') return false;
    return null;
}

export function useTeacherTools(search) {
    const flag = teacherFlagFromSearch(search);
    useEffect(() => {
        if (flag !== null && flag !== readEnabled()) setTeacherToolsEnabled(flag);
    }, [flag]);
    const stored = useSyncExternalStore(subscribeTeacherTools, readEnabled, () => false);
    return flag ?? stored;
}

// ─── 考试模式期间隐藏教师工具 ────────────────────────────────────────

let examFocus = false;
const examListeners = new Set();

export function setExamFocus(active) {
    if (examFocus === active) return;
    examFocus = active;
    examListeners.forEach((listener) => listener());
}

const subscribeExamFocus = (listener) => {
    examListeners.add(listener);
    return () => examListeners.delete(listener);
};

export const useExamFocus = () => useSyncExternalStore(subscribeExamFocus, () => examFocus, () => false);
