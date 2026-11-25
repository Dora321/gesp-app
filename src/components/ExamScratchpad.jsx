import { useEffect, useState } from 'react';
import { PencilLine, Plus, Trash2 } from 'lucide-react';

const emptyTable = () => ({ columns: ['i', '变量'], rows: [['', '']] });

function readDraft(storageKey) {
    const fallback = { notes: '', ...emptyTable() };
    try {
        const saved = JSON.parse(sessionStorage.getItem(storageKey));
        if (!Array.isArray(saved?.columns) || saved.columns.length === 0
            || !saved.columns.every((name) => typeof name === 'string') || !Array.isArray(saved.rows)) return fallback;

        return {
            notes: typeof saved.notes === 'string' ? saved.notes : '',
            columns: saved.columns,
            rows: saved.rows.filter(Array.isArray).map((row) => (
                saved.columns.map((_, index) => typeof row[index] === 'string' ? row[index] : '')
            )),
        };
    } catch {
        return fallback;
    }
}

const fieldClass = 'w-full min-h-11 rounded-sm border border-[var(--mw-rule-strong)] bg-[var(--mw-surface)] px-2 text-sm text-[var(--mw-ink)]';

export default function ExamScratchpad({ paperId }) {
    const storageKey = `gesp:exam-scratchpad:${paperId}`;
    const [draft, setDraft] = useState(() => readDraft(storageKey));
    const [tab, setTab] = useState('notes');

    useEffect(() => {
        try {
            sessionStorage.setItem(storageKey, JSON.stringify(draft));
        } catch {
            // 浏览器禁用存储时，仍可在本页手推。
        }
    }, [storageKey, draft]);

    const addColumn = () => setDraft((previous) => ({
        ...previous,
        columns: [...previous.columns, ''],
        rows: previous.rows.map((row) => [...row, '']),
    }));
    const addRow = () => setDraft((previous) => ({
        ...previous,
        rows: [...previous.rows, previous.columns.map(() => '')],
    }));
    const updateColumn = (index, value) => setDraft((previous) => ({
        ...previous,
        columns: previous.columns.map((name, position) => position === index ? value : name),
    }));
    const updateCell = (rowIndex, columnIndex, value) => setDraft((previous) => ({
        ...previous,
        rows: previous.rows.map((row, index) => index === rowIndex
            ? row.map((cell, column) => column === columnIndex ? value : cell)
            : row),
    }));

    return (
        <details className="rounded-md border border-[var(--mw-rule)] bg-[var(--mw-surface)]">
            <summary className="min-h-11 cursor-pointer px-4 py-3 text-sm font-semibold text-[var(--mw-ink)]">
                <PencilLine className="mx-2 inline-block align-text-bottom" size={16} aria-hidden="true" /> 演草纸
            </summary>
            <div className="space-y-3 border-t border-[var(--mw-rule)] p-4">
                <div className="flex flex-wrap gap-2" aria-label="演草纸视图">
                    {[['notes', '草稿笔记'], ['table', '变量手推表']].map(([value, label]) => (
                        <button
                            key={value}
                            type="button"
                            onClick={() => setTab(value)}
                            aria-pressed={tab === value}
                            className={`min-h-11 rounded-sm border-b-4 px-3 text-sm ${tab === value
                                ? 'border-[var(--mw-ink)] bg-[var(--mw-line-wash)] font-semibold'
                                : 'border-transparent bg-[var(--mw-canvas)]'}`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
                {tab === 'notes' ? (
                    <textarea
                        rows={4}
                        aria-label="草稿笔记"
                        placeholder="写下计算过程、解题思路或想回头核对的地方"
                        value={draft.notes}
                        onChange={(event) => {
                            const notes = event.target.value;
                            setDraft((previous) => ({ ...previous, notes }));
                        }}
                        className={`${fieldClass} py-2`}
                    />
                ) : (
                    <>
                        <div role="region" tabIndex={0} aria-label="变量手推表" className="overflow-x-auto">
                            <table className="min-w-full border-collapse font-[family-name:var(--mw-font-code)]">
                                <thead>
                                    <tr className="border-b-2 border-[var(--mw-ink)]">
                                        <th scope="col" className="px-2 text-sm">行</th>
                                        {draft.columns.map((name, index) => (
                                            <th scope="col" key={index} className="min-w-28 p-1">
                                                <input
                                                    aria-label={`第 ${index + 1} 列列名`}
                                                    placeholder="变量名"
                                                    value={name}
                                                    onChange={(event) => updateColumn(index, event.target.value)}
                                                    className={fieldClass}
                                                />
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {draft.rows.map((row, rowIndex) => (
                                        <tr key={rowIndex} className="border-b border-[var(--mw-rule)]">
                                            <th scope="row" className="px-2 text-center text-sm">{rowIndex + 1}</th>
                                            {row.map((cell, columnIndex) => (
                                                <td key={columnIndex} className="p-1">
                                                    <input
                                                        aria-label={`第 ${rowIndex + 1} 行第 ${columnIndex + 1} 列${draft.columns[columnIndex] ? `，${draft.columns[columnIndex]}` : ''}`}
                                                        value={cell}
                                                        onChange={(event) => updateCell(rowIndex, columnIndex, event.target.value)}
                                                        className={fieldClass}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button type="button" onClick={addRow} className="mw-button mw-button--secondary mw-button--small min-h-11!">
                                <Plus size={16} aria-hidden="true" /> 增加一行
                            </button>
                            <button type="button" onClick={addColumn} className="mw-button mw-button--secondary mw-button--small min-h-11!">
                                <Plus size={16} aria-hidden="true" /> 增加一列
                            </button>
                            <button type="button" onClick={() => setDraft((previous) => ({ ...previous, ...emptyTable() }))} className="mw-button mw-button--secondary mw-button--small min-h-11!">
                                <Trash2 size={16} aria-hidden="true" /> 清空表格
                            </button>
                        </div>
                    </>
                )}
            </div>
        </details>
    );
}
