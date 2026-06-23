import React, { useMemo, useState } from 'react';
import { RotateCcw, SkipForward, Terminal } from 'lucide-react';

const TONES = {
    light: {
        card: 'border-slate-200 bg-white shadow-sm',
        title: 'text-slate-800',
        titleIcon: 'text-indigo-600',
        next: 'bg-indigo-600 text-white hover:bg-indigo-700',
        reset: 'border-2 border-slate-100 bg-white text-slate-600 hover:bg-slate-50',
        chip: 'border-slate-200 bg-slate-50',
        chipName: 'text-slate-400',
        chipVal: 'text-indigo-700',
        hint: 'bg-amber-50 text-amber-700',
        tableWrap: 'border-slate-200',
        tableHead: 'bg-slate-100 text-slate-500',
        tableRow: 'border-t border-slate-100 text-slate-700',
        tableEmpty: 'text-slate-400',
        exitRow: 'bg-rose-50 text-rose-700',
    },
    dark: {
        card: 'border-green-500/30 bg-slate-900 shadow-xl',
        title: 'text-green-400',
        titleIcon: 'text-green-400',
        next: 'bg-green-600 text-white hover:bg-green-500',
        reset: 'border-2 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700',
        chip: 'border-slate-700 bg-slate-800',
        chipName: 'text-slate-500',
        chipVal: 'text-green-300',
        hint: 'bg-green-900/30 text-green-300 border border-green-500/20',
        tableWrap: 'border-slate-700',
        tableHead: 'bg-slate-800 text-slate-400',
        tableRow: 'border-t border-slate-800 text-slate-200',
        tableEmpty: 'text-slate-500',
        exitRow: 'bg-rose-950/50 text-rose-300',
    },
};

/**
 * 可复用的 Python 单步执行追踪器。
 *
 * 课程只需把「代码字符串」和「用 useMemo 模拟跑出来的 steps」传进来即可，
 * 数值全部由课程内的模拟逻辑算出，避免手写 trace 出错。
 *
 * steps: Array<{
 *   active?: number[],          // 当前高亮的代码行（0 起）
 *   vars?: Record<string, any>, // 当前各变量取值
 *   action?: string,            // 「下一步」按钮在进入该步前显示的文案
 *   row?: Array<ReactNode>,     // 追踪表新增的一行（列数需与 columns 对齐）
 *   exit?: ReactNode,           // 循环/函数结束提示（整行高亮）
 *   output?: ReactNode,         // 程序输出，显示在底部输出条
 * }>
 */
export default function PyCodeTracer({
    title = '单步执行追踪器',
    code = '',
    varOrder = [],
    columns = [],
    steps = [],
    hint,
    tone = 'light',
}) {
    const [step, setStep] = useState(0);
    const lines = useMemo(() => code.replace(/\n$/, '').split('\n'), [code]);
    const t = TONES[tone] || TONES.light;

    const safeStep = Math.min(step, steps.length - 1);
    const current = steps[safeStep] || {};
    const activeLines = current.active || [];
    const finished = safeStep >= steps.length - 1;

    const revealed = steps.slice(0, safeStep + 1);
    const tableRows = revealed.filter((entry) => entry.row || entry.exit);
    const output = [...revealed].reverse().find((entry) => entry.output)?.output;
    const nextLabel = finished ? '已结束' : current.action ?? '下一步';

    const varCols = varOrder.length >= 3 ? 'grid-cols-3' : 'grid-cols-2';

    return (
        <div className={`rounded-2xl border p-5 ${t.card}`}>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className={`flex items-center gap-2 font-black ${t.title}`}>
                    <Terminal size={18} className={t.titleIcon} />
                    {title}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                        disabled={finished}
                        className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-bold shadow-sm transition-all active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 ${t.next}`}
                    >
                        <SkipForward size={15} />
                        {nextLabel}
                    </button>
                    <button
                        onClick={() => setStep(0)}
                        className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-bold transition-all active:scale-95 ${t.reset}`}
                    >
                        <RotateCcw size={15} />
                        重置
                    </button>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
                {/* 代码面板 + 行高亮 */}
                <div className="overflow-hidden rounded-xl bg-slate-950 shadow-inner ring-1 ring-slate-700/50">
                    <div className="flex items-center justify-between px-4 py-2 text-xs uppercase tracking-widest text-slate-500">
                        <span className="font-mono">Python</span>
                        <span className="font-bold text-slate-400">第 {safeStep} / {steps.length - 1} 步</span>
                    </div>
                    <pre className="overflow-x-auto px-4 pb-4 font-mono text-sm leading-6 text-slate-100">
                        {lines.map((line, i) => (
                            <div
                                key={`l-${i}`}
                                className={`-mx-4 px-4 ${
                                    activeLines.includes(i)
                                        ? 'border-l-4 border-indigo-400 bg-indigo-500/25'
                                        : 'border-l-4 border-transparent'
                                }`}
                            >
                                {line === '' ? ' ' : line}
                            </div>
                        ))}
                    </pre>
                </div>

                {/* 变量卡片 */}
                <div className="flex flex-col gap-3">
                    {varOrder.length > 0 && (
                        <div className={`grid ${varCols} gap-2`}>
                            {varOrder.map((name) => (
                                <div key={name} className={`rounded-xl border px-3 py-2 text-center ${t.chip}`}>
                                    <div className={`font-mono text-xs font-bold ${t.chipName}`}>{name}</div>
                                    <div className={`font-mono text-lg font-black ${t.chipVal}`}>
                                        {current.vars?.[name] ?? '–'}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {hint && (
                        <p className={`rounded-xl px-3 py-2 text-xs font-bold leading-relaxed ${t.hint}`}>
                            💡 {hint}
                        </p>
                    )}
                </div>
            </div>

            {/* 累积追踪表 */}
            {columns.length > 0 && (
                <div className={`mt-4 overflow-x-auto rounded-xl border ${t.tableWrap}`}>
                    <table className="w-full text-left text-sm">
                        <thead className={`text-xs font-black uppercase tracking-wider ${t.tableHead}`}>
                            <tr>
                                {columns.map((col) => (
                                    <th key={col} className="px-3 py-2 font-mono">{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows.length === 0 ? (
                                <tr>
                                    <td colSpan={columns.length} className={`px-3 py-3 text-center ${t.tableEmpty}`}>
                                        点击「{nextLabel}」开始 →
                                    </td>
                                </tr>
                            ) : (
                                tableRows.map((entry, idx) =>
                                    entry.exit ? (
                                        <tr key={`r-${idx}`} className={`font-bold ${t.exitRow}`}>
                                            <td colSpan={columns.length} className="px-3 py-2">{entry.exit}</td>
                                        </tr>
                                    ) : (
                                        <tr key={`r-${idx}`} className={`font-mono ${t.tableRow}`}>
                                            {entry.row.map((cell, ci) => (
                                                <td key={ci} className="px-3 py-2">{cell}</td>
                                            ))}
                                        </tr>
                                    )
                                )
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* 输出条 */}
            {output && (
                <div className="mt-4 flex items-start gap-2 rounded-xl bg-slate-950 px-4 py-3 font-mono text-sm text-emerald-300 ring-1 ring-slate-700/50">
                    <span className="select-none text-slate-500">{'>>>'}</span>
                    <span className="font-bold">{output}</span>
                </div>
            )}
        </div>
    );
}
