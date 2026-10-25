import React, { useEffect, useRef, useState } from 'react';
import { Database, Download, FileUp, RotateCcw } from 'lucide-react';
import {
    LEARNING_DATA_EVENT,
    LEARNING_DATA_VERSION,
    createLearningDataExport,
    importLearningData,
    previewLearningDataImport,
    readLearningData,
    resetLearningData,
    summarizeLearningData,
} from '../utils/learningData';

const getSummary = () => summarizeLearningData();
const backupKey = 'gesp_last_export_at';
const readExportAt = () => { try { return Number(localStorage.getItem(backupKey)) || 0; } catch { return 0; } };

export default function LearningDataManager() {
    const fileInputRef = useRef(null);
    const [summary, setSummary] = useState(getSummary);
    const [status, setStatus] = useState('');
    const [exportAt, setExportAt] = useState(readExportAt);
    const updatedAt = readLearningData().updatedAt;

    useEffect(() => {
        const refresh = () => setSummary(getSummary());
        window.addEventListener(LEARNING_DATA_EVENT, refresh);
        window.addEventListener('storage', refresh);
        return () => { window.removeEventListener(LEARNING_DATA_EVENT, refresh); window.removeEventListener('storage', refresh); };
    }, []);

    const exportData = () => {
        const payload = createLearningDataExport();
        const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `gesp-learning-data-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        const now = Date.now();
        setExportAt(now);
        try { localStorage.setItem(backupKey, String(now)); } catch { /* Download remains available. */ }
        setStatus('已生成备份，请确认浏览器已下载文件。');
    };

    const importData = async (event) => {
        const [file] = event.target.files || [];
        event.target.value = '';
        if (!file) return;

        try {
            const text = await file.text();
            const preview = previewLearningDataImport(text);
            const counts = summarizeLearningData(preview);
            if (!window.confirm(`此备份包含 ${counts.lessons} 条课程记录、${counts.examAttempts} 次交卷记录、${Object.keys(preview.practice).length} 道上机自查。导入将替换当前学习数据，建议先导出备份。是否继续？`)) return;
            const imported = importLearningData(text);
            setSummary(summarizeLearningData(imported));
            setStatus('学习数据已导入，下次打开课程时生效');
        } catch (error) {
            setStatus(error.message || '导入失败');
        }
    };

    const resetData = () => {
        if (!window.confirm('确定重置所有课程、上机自查、试卷、硬件课和博物馆进度吗？此操作不可撤销，建议先导出备份。')) return;
        if (!resetLearningData()) {
            setStatus('浏览器无法重置学习数据');
            return;
        }
        setSummary(getSummary());
        setStatus('学习进度已重置');
    };

    const metrics = [
        { label: '已学课程', value: summary.lessons },
        { label: '已过关', value: summary.masteredLessons },
        { label: '试卷草稿', value: summary.examDrafts },
        { label: '交卷记录', value: summary.examAttempts },
        { label: '硬件课', value: summary.hardwareLessons },
        { label: '博物馆收集', value: summary.museumItems },
    ];

    return (
        <div className="mw-data-manager mt-14 rounded-xl border border-slate-700 bg-slate-900 p-5 shadow-xl sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2 text-sm font-black text-blue-300">
                        <Database size={18} aria-hidden="true" />
                        学习数据
                        <span className="rounded bg-slate-800 px-2 py-0.5 text-xs text-white">v{LEARNING_DATA_VERSION}</span>
                    </div>
                    <h3 className="text-xl font-black text-white">管理我的学习进度</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    <button
                        type="button"
                        onClick={exportData}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-blue-600"
                    >
                        <Download size={17} aria-hidden="true" />
                        导出
                    </button>
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-bold text-slate-100 transition hover:border-blue-400 hover:text-white"
                    >
                        <FileUp size={17} aria-hidden="true" />
                        导入
                    </button>
                    <button
                        type="button"
                        onClick={resetData}
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-rose-800 bg-rose-950/50 px-4 py-2 text-sm font-bold text-rose-200 transition hover:border-rose-600 hover:text-white"
                    >
                        <RotateCcw size={17} aria-hidden="true" />
                        一键重置
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="application/json,.json"
                        onChange={importData}
                        className="sr-only"
                        aria-label="选择学习数据文件"
                    />
                </div>
            </div>

            <dl className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-5">
                {metrics.map((metric) => (
                    <div key={metric.label} className="rounded-lg bg-slate-950 px-3 py-3 text-center ring-1 ring-slate-800">
                        <dt className="text-xs font-semibold text-slate-400">{metric.label}</dt>
                        <dd className="mt-1 text-xl font-black text-white">{metric.value}</dd>
                    </div>
                ))}
            </dl>

            <p className="mt-4 text-xs leading-5 text-slate-400">
                进度只保存在当前浏览器，不会自动同步到其他设备。清理网站数据会移除记录。导出包含课程、上机自查、试卷、硬件课和博物馆进度，不包含 API Key、聊天、课堂积分或本次课内临时作答证据。
            </p>
            <p className="mt-2 text-xs text-slate-300">{exportAt ? '最近发起导出：' + new Date(exportAt).toLocaleString('zh-CN') : '尚未导出备份'}{updatedAt && updatedAt > exportAt ? ' · 有新的学习记录，建议导出。' : ''}</p>
            <p className="mt-2 min-h-5 text-sm font-semibold text-blue-200" role="status" aria-live="polite">{status}</p>
        </div>
    );
}
