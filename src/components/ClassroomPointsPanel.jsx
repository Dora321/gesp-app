import { useEffect, useId, useRef, useState } from 'react';
import { Download, Shuffle, Trophy, X } from 'lucide-react';
import {
    adjustClassroomPoints,
    buildPointsCsv,
    buildPointsHistoryCsv,
    createClassroom,
    drawClassroomStudent,
    mergeClassroomRoster,
    parseClassroomRoster,
    readClassroomPoints,
    summarizeClassroomGroups,
    writeClassroomPoints,
} from '../utils/classroomPoints';

const button = 'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-[var(--mw-radius-m)] border border-[var(--mw-rule-strong)] bg-white px-3 py-2 text-sm font-bold text-[var(--mw-ink)] hover:bg-[var(--mw-surface-sunk)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mw-ink)] disabled:cursor-not-allowed disabled:opacity-50';
const toggleButton = `${button} border-b-4 aria-pressed:border-b-[var(--mw-line-ink)] aria-pressed:bg-[var(--mw-line-wash)]`;
const primaryButton = 'mw-button mw-button--primary mw-button--small !min-h-11';
const field = 'min-h-11 min-w-0 rounded-[var(--mw-radius-m)] border border-[var(--mw-rule-strong)] bg-white px-3 py-2 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--mw-ink)]';
const pointNumber = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 6 });
const averageNumber = new Intl.NumberFormat('zh-CN', { maximumFractionDigits: 2 });
const suggestedReasons = ['回答问题', '手推正确', '发现边界 Bug', '主动分享', '课堂参与', '调整分数'];
const suggestedGroups = ['1 组', '2 组', '3 组', '4 组', '5 组', '6 组'];

function downloadCsv(csv, filename) {
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
}

function RosterImport({ onImport, onError }) {
    const fileInput = useRef(null);
    const fileReadId = useRef(0);
    const [text, setText] = useState('');

    const readFile = async (event) => {
        const [file] = event.target.files || [];
        event.target.value = '';
        if (!file) return;
        const readId = ++fileReadId.current;

        try {
            const contents = await file.text();
            if (readId === fileReadId.current) setText(contents);
        } catch {
            if (readId === fileReadId.current) onError('无法读取名单文件。');
        }
    };

    return (
        <form className="mt-3 space-y-2" onSubmit={(event) => {
            event.preventDefault();
            if (onImport(text)) setText('');
        }}>
            <label className="block text-sm font-bold">
                名单内容
                <textarea
                    value={text}
                    onChange={(event) => { fileReadId.current += 1; setText(event.target.value); }}
                    rows={4}
                    className={`${field} mt-1 block w-full font-normal`}
                    placeholder="每行一个姓名，或粘贴「姓名,分数,分组」CSV"
                />
            </label>
            <p className="text-sm text-[var(--mw-ink-2)]">同名记录合并。CSV 中填写的分数和分组会替换名单中的对应字段。</p>
            <div className="flex flex-wrap gap-2">
                <button type="button" className={button} onClick={() => fileInput.current?.click()}>选择 CSV 或文本文件</button>
                <button type="submit" className={primaryButton} disabled={!text.trim()}>导入名单</button>
                <input ref={fileInput} type="file" accept=".csv,.txt,text/csv,text/plain" onChange={readFile} hidden />
            </div>
        </form>
    );
}

function StudentRow({ student, picked, groupOptionsId, updateGroup, scoreStudent, removeStudent }) {
    return (
        <li className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-l-4 px-3 py-3 ${picked ? 'border-l-[var(--mw-brand-mustard)] bg-[var(--mw-warn-tint)]' : 'border-l-transparent bg-white'}`}>
            <div className="min-w-0 flex-1">
                <strong className="block break-words">{student.name}</strong>
                <span className="text-sm tabular-nums text-[var(--mw-ink-2)]">{pointNumber.format(student.points)} 分</span>
            </div>
            <input
                key={student.group}
                className={`${field} w-24`}
                aria-label={`${student.name}的小组`}
                title="选择预设组或输入自定义组名"
                placeholder="未分组"
                list={groupOptionsId}
                defaultValue={student.group}
                onBlur={(event) => updateGroup(student.id, event.currentTarget.value.trim())}
                onKeyDown={(event) => { if (event.key === 'Enter') event.currentTarget.blur(); }}
            />
            <div className="flex flex-wrap gap-1">
                {[[1, '+1'], [0.5, '+0.5'], [-1, '−1'], [-0.5, '−0.5']].map(([delta, label]) => (
                    <button key={delta} type="button" className={button} aria-label={`给${student.name}${delta > 0 ? '加' : '减'} ${Math.abs(delta)} 分`} onClick={() => scoreStudent(student.id, delta)}>
                        {label}
                    </button>
                ))}
                <button type="button" className={button} aria-label={`从班级移除${student.name}`} onClick={() => removeStudent(student)}>
                    <X size={16} aria-hidden="true" />
                </button>
            </div>
        </li>
    );
}

function Leaderboard({ students, groups, ungrouped, view }) {
    if (view === 'groups') {
        return (
            <>
                {groups.length > 0 ? (
                    <table className="w-full table-fixed border-collapse text-sm tabular-nums">
                        <thead className="border-b border-[var(--mw-rule-strong)] text-right text-[var(--mw-ink-2)]">
                            <tr>
                                <th className="w-2/5 py-2 text-left" scope="col">小组</th>
                                <th scope="col">人数</th>
                                <th scope="col">总分</th>
                                <th scope="col">人均分</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(({ name, count, total, average }) => (
                                <tr className="border-b border-[var(--mw-rule)] text-right" key={name}>
                                    <th className="break-words py-2 pr-1 text-left" scope="row">{name}</th>
                                    <td>{count}</td>
                                    <td>{pointNumber.format(total)}</td>
                                    <td>{averageNumber.format(average)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <p className="py-3 text-sm text-[var(--mw-ink-2)]">给同学分组后，这里会显示各组积分。</p>}
                {ungrouped > 0 && <p className="mt-2 text-sm text-[var(--mw-ink-2)]">还有 {ungrouped} 位同学未分组。</p>}
            </>
        );
    }

    const rankedStudents = [...students].sort((a, b) => b.points - a.points);
    if (!rankedStudents.length) return <p className="py-3 text-sm text-[var(--mw-ink-2)]">暂无积分。</p>;
    return (
        <ol className="divide-y divide-[var(--mw-rule)] text-sm tabular-nums">
            {rankedStudents.map(({ id, name, points }, index) => (
                <li key={id} className="flex items-center gap-2 py-2">
                    <span className="w-6 shrink-0 text-[var(--mw-ink-2)]">{index + 1}</span>
                    <span className="min-w-0 flex-1 break-words">{name}</span>
                    <strong>{pointNumber.format(points)} 分</strong>
                </li>
            ))}
        </ol>
    );
}

function ClassroomBoard({ classroom, onChange }) {
    const groupOptionsId = useId();
    const reasonOptionsId = useId();
    const { students, history, drawnIds } = classroom;
    const [view, setView] = useState('students');
    const [name, setName] = useState('');
    const [reason, setReason] = useState('');
    const [pickedId, setPickedId] = useState(null);
    const [showImport, setShowImport] = useState(false);
    const [status, setStatus] = useState('');
    const picked = students.find(({ id }) => id === pickedId);
    const groupStats = summarizeClassroomGroups(students);

    const importEntries = (entries) => {
        if (!entries.length) {
            setStatus('没有读到学生姓名。');
            return false;
        }
        onChange({ ...classroom, students: mergeClassroomRoster(students, entries) });
        setStatus(`已处理 ${new Set(entries.map((entry) => entry.name)).size} 位同学的名单记录。`);
        return true;
    };

    const importRoster = (text) => {
        try {
            return importEntries(parseClassroomRoster(text));
        } catch (error) {
            setStatus(error.message);
            return false;
        }
    };

    const addStudents = (event) => {
        event.preventDefault();
        const names = name.split(/[,，\s]+/).filter(Boolean);
        if (importEntries(names.map((item) => ({ name: item })))) setName('');
    };

    const scoreStudent = (id, delta, fallbackReason = delta > 0 ? '回答问题' : '调整分数') => {
        const next = adjustClassroomPoints(classroom, id, delta, reason.trim() || fallbackReason);
        if (next === classroom) return;
        onChange(next);
        const entry = next.history[0];
        setStatus(`${entry.studentName} ${delta > 0 ? '+' : ''}${delta} 分，${entry.reason}。`);
    };

    const pickStudent = () => {
        const result = drawClassroomStudent(students, drawnIds);
        if (!result.student) return;
        setPickedId(result.student.id);
        onChange({ ...classroom, drawnIds: result.drawnIds });
    };

    const updateGroup = (id, group) => {
        if (students.find((student) => student.id === id)?.group === group) return;
        onChange({ ...classroom, students: students.map((student) => student.id === id ? { ...student, group } : student) });
    };

    const removeStudent = (student) => {
        if (!window.confirm(`确定从${classroom.name}移除「${student.name}」吗？`)) return;
        onChange({
            ...classroom,
            students: students.filter(({ id }) => id !== student.id),
            drawnIds: drawnIds.filter((id) => id !== student.id),
        });
        if (pickedId === student.id) setPickedId(null);
        setStatus(`已移除${student.name}。`);
    };

    const resetBoard = (clearRoster) => {
        const prompt = clearRoster ? '清空名单、分数和操作记录' : '将全部分数归零并清空操作记录';
        if (!window.confirm(`确定要为「${classroom.name}」${prompt}吗？`)) return;
        onChange({
            ...classroom,
            students: clearRoster ? [] : students.map((student) => ({ ...student, points: 0 })),
            history: [],
            drawnIds: [],
        });
        setPickedId(null);
        setStatus(clearRoster ? '已清空本班名单。' : '已重置本班分数。');
    };

    return (
        <>
            <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                <section aria-label="班级名单与记分" className="min-w-0 space-y-4">
                    <div className="rounded-[var(--mw-radius-m)] border border-[var(--mw-rule)] bg-white p-3">
                        <form className="flex flex-wrap gap-2" onSubmit={addStudents}>
                            <input className={`${field} flex-1`} aria-label="要添加的学生姓名" placeholder="姓名，多个姓名用逗号或空格分隔" value={name} onChange={(event) => setName(event.target.value)} />
                            <button type="submit" className={primaryButton} disabled={!name.trim()}>添加学生</button>
                            <button type="button" className={toggleButton} aria-pressed={showImport} onClick={() => setShowImport(!showImport)}>名单导入</button>
                        </form>
                        {showImport && <RosterImport onImport={importRoster} onError={setStatus} />}
                    </div>

                    <div className="rounded-[var(--mw-radius-m)] border border-[var(--mw-rule)] bg-white p-3">
                        <div className="flex flex-wrap items-end gap-2">
                            <label className="min-w-40 flex-1 text-sm font-bold">
                                本次记分原因
                                <input
                                    className={`${field} mt-1 block w-full font-normal`}
                                    list={reasonOptionsId}
                                    value={reason}
                                    onChange={(event) => setReason(event.target.value)}
                                    placeholder="选择常用原因或自行输入"
                                />
                            </label>
                            <datalist id={reasonOptionsId}>
                                {suggestedReasons.map((label) => <option key={label} value={label} />)}
                            </datalist>
                            <button type="button" className={primaryButton} onClick={pickStudent} disabled={!students.length}>
                                <Shuffle size={17} aria-hidden="true" /> 随机点名
                            </button>
                        </div>
                        {picked && (
                            <div className="mt-3 border-l-4 border-[var(--mw-brand-mustard)] bg-[var(--mw-warn-tint)] p-3">
                                <p className="break-words text-sm" role="status">抽中 <strong className="text-lg">{picked.name}</strong> · 本轮已点名 {drawnIds.length}/{students.length} 位</p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    <button type="button" className={button} onClick={() => scoreStudent(picked.id, 1)}>答对 +1</button>
                                    <button type="button" className={button} onClick={() => scoreStudent(picked.id, 0.5, '课堂参与')}>参与 +0.5</button>
                                    <button type="button" className={button} onClick={pickStudent}>换一位</button>
                                </div>
                            </div>
                        )}
                        <p className="mt-2 min-h-5 text-sm text-[var(--mw-ink-2)]" role="status">{status}</p>
                    </div>

                    <div className="rounded-[var(--mw-radius-m)] border border-[var(--mw-rule)] bg-white">
                        <h3 className="border-b border-[var(--mw-rule)] px-3 py-2 text-base font-bold">班级名单 <span className="text-sm font-normal text-[var(--mw-ink-2)]">· {students.length} 人</span></h3>
                        <datalist id={groupOptionsId}>
                            {[...new Set([...suggestedGroups, ...groupStats.map((group) => group.name)])].map((group) => <option key={group} value={group} />)}
                        </datalist>
                        {!students.length && <p className="p-3 text-sm text-[var(--mw-ink-2)]">添加学生或导入名单后，即可开始记分。</p>}
                        <ul className="divide-y divide-[var(--mw-rule)]">
                            {students.map((student) => (
                                <StudentRow key={student.id} student={student} picked={student.id === pickedId} groupOptionsId={groupOptionsId} updateGroup={updateGroup} scoreStudent={scoreStudent} removeStudent={removeStudent} />
                            ))}
                        </ul>
                    </div>
                </section>

                <section aria-label="班级排行与记录" className="min-w-0 self-start rounded-[var(--mw-radius-m)] border border-[var(--mw-rule)] bg-white p-3">
                    <div role="group" aria-label="选择积分榜视图" className="mb-2 flex flex-wrap gap-1">
                        {[
                            ['students', '个人积分榜'],
                            ['groups', '小组积分榜'],
                            ['history', '操作记录'],
                        ].map(([id, title]) => (
                            <button
                                key={id}
                                type="button"
                                aria-pressed={view === id}
                                className={toggleButton}
                                onClick={() => setView(id)}
                            >
                                {title}
                            </button>
                        ))}
                    </div>
                    {view === 'history' ? (
                        <>
                            {history.length > 0 ? (
                                <>
                                    <ul className="divide-y divide-[var(--mw-rule)]">
                                        {history.map((entry, index) => (
                                            <li className="py-2 text-sm" key={`${entry.id}-${index}`}>
                                                <strong className="break-words">{entry.studentName} {entry.diff > 0 ? '+' : ''}{pointNumber.format(entry.diff)} 分</strong>
                                                {entry.reason && <p className="break-words">{entry.reason}</p>}
                                                <p className="text-xs text-[var(--mw-ink-2)]">{entry.time}</p>
                                            </li>
                                        ))}
                                    </ul>
                                    <button type="button" className={`${button} mt-2`} onClick={() => {
                                        if (window.confirm('确定清空当前班级的操作记录吗？')) onChange({ ...classroom, history: [] });
                                    }}>清空操作记录</button>
                                </>
                            ) : <p className="py-3 text-sm text-[var(--mw-ink-2)]">暂无操作记录。</p>}
                        </>
                    ) : (
                        <Leaderboard students={students} groups={groupStats} ungrouped={students.filter((student) => !student.group).length} view={view} />
                    )}
                </section>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-[var(--mw-rule)] bg-white px-4 py-3 sm:px-6" aria-label="班级数据操作" role="group">
                <button type="button" className={button} disabled={!students.length} onClick={() => downloadCsv(buildPointsCsv(students), 'classroom_points')}>
                    <Download size={16} aria-hidden="true" /> 导出名单与分数 CSV
                </button>
                <button type="button" className={button} disabled={!history.length} onClick={() => downloadCsv(buildPointsHistoryCsv(history), 'classroom_history')}>
                    <Download size={16} aria-hidden="true" /> 导出操作记录 CSV
                </button>
                <button type="button" className={button} disabled={!students.length && !history.length} onClick={() => resetBoard(false)}>重置本班分数</button>
                <button type="button" className={button} disabled={!students.length && !history.length} onClick={() => resetBoard(true)}>清空本班名单</button>
            </div>
        </>
    );
}

export default function ClassroomPointsPanel({ onClose }) {
    const dialogRef = useRef(null);
    const titleId = useId();
    const [data, setData] = useState(readClassroomPoints);
    const [edit, setEdit] = useState(null);
    const [storageFailed, setStorageFailed] = useState(false);
    const { classes, activeClassId } = data;
    const classroom = classes.find(({ id }) => id === activeClassId);

    useEffect(() => {
        const dialog = dialogRef.current;
        dialog.showModal();
        return () => dialog.close();
    }, []);

    useEffect(() => {
        setStorageFailed(!writeClassroomPoints(data));
    }, [data]);

    const updateClassroom = (updated) => {
        setData((current) => ({ ...current, classes: current.classes.map((item) => item.id === updated.id ? updated : item) }));
    };

    const deleteClassroom = () => {
        if (!window.confirm(`确定删除「${classroom.name}」及其名单、分数和操作记录吗？`)) return;
        const rest = classes.filter(({ id }) => id !== activeClassId);
        const nextClasses = rest.length ? rest : [createClassroom('默认班级')];
        setData({ classes: nextClasses, activeClassId: nextClasses[0].id });
        setEdit(null);
    };

    const saveClassName = (event) => {
        event.preventDefault();
        const name = edit.name.trim();
        if (!name) return;
        if (edit.mode === 'create') {
            const nextClass = createClassroom(name);
            setData({ classes: [...classes, nextClass], activeClassId: nextClass.id });
        } else {
            updateClassroom({ ...classroom, name });
        }
        setEdit(null);
    };

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onCancel={(event) => { event.preventDefault(); onClose(); }}
            className="mw-surface mw-line-bank mw-points-panel m-auto max-h-[90dvh] w-[calc(100%_-_2rem)] max-w-6xl flex-col overflow-hidden bg-[var(--mw-canvas)] text-[var(--mw-ink)] backdrop:bg-black/60 open:flex"
        >
            <header className="flex shrink-0 items-center justify-between gap-2 border-b border-[var(--mw-rule)] bg-white px-4 py-2 sm:px-6">
                <h2 id={titleId} className="flex items-center gap-2 text-xl font-extrabold"><Trophy size={21} aria-hidden="true" /> 课堂积分榜</h2>
                <button type="button" className={button} onClick={onClose} aria-label="最小化课堂积分榜"><X size={21} aria-hidden="true" /></button>
            </header>
            <div className="min-h-0 overflow-y-auto">
                <div className="space-y-3 border-b border-[var(--mw-rule)] bg-white px-4 py-3 sm:px-6">
                    <div className="flex flex-wrap items-center gap-2">
                        <label className="flex max-w-full min-w-0 items-center gap-2 text-sm font-bold">
                            班级
                            <select
                                className={`${field} max-w-48 flex-1`}
                                value={activeClassId}
                                onChange={(event) => {
                                    const id = event.target.value;
                                    setData((current) => ({ ...current, activeClassId: id }));
                                    setEdit(null);
                                }}
                            >
                                {classes.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
                            </select>
                        </label>
                        <button type="button" className={toggleButton} aria-pressed={edit?.mode === 'create'} onClick={() => setEdit(edit?.mode === 'create' ? null : { mode: 'create', name: '' })}>新建班级</button>
                        <button type="button" className={toggleButton} aria-pressed={edit?.mode === 'rename'} onClick={() => setEdit(edit?.mode === 'rename' ? null : { mode: 'rename', name: classroom.name })}>重命名班级</button>
                        <button type="button" className={button} onClick={deleteClassroom}>删除班级</button>
                    </div>
                    {edit && (
                        <form className="flex flex-wrap gap-2" onSubmit={saveClassName}>
                            <input className={`${field} flex-1`} aria-label="班级名称" placeholder="输入班级名称" value={edit.name} onChange={(event) => setEdit({ ...edit, name: event.target.value })} />
                            <button type="submit" className={primaryButton} disabled={!edit.name.trim()}>{edit.mode === 'create' ? '创建班级' : '保存班级名称'}</button>
                            <button type="button" className={button} onClick={() => setEdit(null)}>取消</button>
                        </form>
                    )}
                    {storageFailed && <p role="status" className="text-sm text-[var(--mw-warn)]">浏览器无法保存积分，请在关闭前导出本班数据。</p>}
                </div>
                <ClassroomBoard key={activeClassId} classroom={classroom} onChange={updateClassroom} />
            </div>
        </dialog>
    );
}
