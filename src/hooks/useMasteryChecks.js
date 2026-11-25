import { useState } from 'react';

const storageKey = 'gesp_mastery_checks_v1';

function readChecks() {
    try {
        const parsed = JSON.parse(sessionStorage.getItem(storageKey));
        return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
    } catch {
        return {};
    }
}

// MasteryCheck is keyed by pathname so each lesson starts with its own checks.
export default function useMasteryChecks(pathname, itemCount) {
    const [checked, setChecked] = useState(() => {
        const saved = readChecks()[pathname];
        return new Set(Array.isArray(saved) ? saved.filter((index) => (
            Number.isInteger(index) && index >= 0 && index < itemCount
        )) : []);
    });

    const save = (next) => {
        setChecked(next);
        const allChecks = readChecks();
        if (next.size) allChecks[pathname] = [...next];
        else delete allChecks[pathname];

        try {
            if (Object.keys(allChecks).length) sessionStorage.setItem(storageKey, JSON.stringify(allChecks));
            else sessionStorage.removeItem(storageKey);
        } catch {
            // 勾选仍可在当前页面使用。
        }
    };

    const toggle = (index) => {
        const next = new Set(checked);
        if (next.has(index)) next.delete(index);
        else next.add(index);
        save(next);
    };

    return { checked, toggle, reset: () => save(new Set()) };
}
