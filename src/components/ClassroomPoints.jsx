import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trophy, Trash2, UserPlus, RotateCcw, Download, History, X, Users, Minimize2, Maximize2 } from 'lucide-react';

const ClassroomPoints = () => {
    const [students, setStudents] = useState([]);
    const [history, setHistory] = useState([]);
    const [newStudentName, setNewStudentName] = useState('');
    const [showHistory, setShowHistory] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Widget open/close state

    // Load from localStorage on mount
    useEffect(() => {
        const savedStudents = localStorage.getItem('classroom_students');
        const savedHistory = localStorage.getItem('classroom_history');
        if (savedStudents) setStudents(JSON.parse(savedStudents));
        if (savedHistory) setHistory(JSON.parse(savedHistory));
    }, []);

    // Save to localStorage on change
    useEffect(() => {
        localStorage.setItem('classroom_students', JSON.stringify(students));
        localStorage.setItem('classroom_history', JSON.stringify(history));
    }, [students, history]);

    const addStudent = () => {
        if (!newStudentName.trim()) return;

        // Check for batch input (comma or space separated)
        const names = newStudentName.split(/[,，\s]+/).filter(n => n.trim());

        const newStudents = names.map(name => ({
            id: Date.now() + Math.random(),
            name: name.trim(),
            points: 0
        }));

        setStudents([...students, ...newStudents]);
        setNewStudentName('');
    };

    const updatePoints = (id, delta) => {
        setStudents(students.map(s => {
            if (s.id === id) {
                // Record history
                const newHistoryItem = {
                    id: Date.now(),
                    time: new Date().toLocaleString(),
                    studentName: s.name,
                    diff: delta,
                    reason: delta > 0 ? '回答问题' : '调整分数'
                };
                setHistory([newHistoryItem, ...history]);
                return { ...s, points: s.points + delta };
            }
            return s;
        }));
    };

    const removeStudent = (id) => {
        if (window.confirm('确定要删除这位同学吗？')) {
            setStudents(students.filter(s => s.id !== id));
        }
    };

    const resetAll = () => {
        if (window.confirm('确定要清空所有数据吗？这将开始新的一课。')) {
            setStudents([]);
            setHistory([]);
        }
    };

    const resetPointsOnly = () => {
        if (window.confirm('确定要重置所有人的分数吗？（保留学生名单）')) {
            setStudents(students.map(s => ({ ...s, points: 0 })));
            setHistory([]);
        }
    };

    const exportData = () => {
        const csvContent = "data:text/csv;charset=utf-8,"
            + "姓名,分数\n"
            + students.map(s => `${s.name},${s.points}`).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `classroom_points_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const sortedStudents = [...students].sort((a, b) => b.points - a.points);

    // Floating Button Mode
    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 left-6 z-[100] w-14 h-14 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:bg-indigo-700 transition-all duration-300 animate-bounce group"
                title="打开课堂积分榜"
            >
                <Trophy size={24} className="group-hover:rotate-12 transition-transform" />
                {students.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-slate-900">
                        {students.length}
                    </span>
                )}
            </button>
        );
    }

    // Modal Mode
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-slate-50 w-full max-w-6xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <header className="flex justify-between items-center p-4 bg-white border-b border-slate-200 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 text-white p-2 rounded-lg">
                            <Trophy size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-800">课堂积分榜</h1>
                            <p className="text-xs text-slate-500">实时记录学生课堂表现</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowHistory(!showHistory)}
                            className={`p-2 rounded-lg transition-colors ${showHistory ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-slate-100 text-slate-600'}`}
                            title="历史记录"
                        >
                            <History size={20} />
                        </button>
                        <button
                            onClick={exportData}
                            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                            title="导出CSV"
                        >
                            <Download size={20} />
                        </button>
                        <button
                            onClick={resetPointsOnly}
                            className="p-2 hover:bg-orange-100 rounded-lg text-orange-600 transition-colors"
                            title="保留名单，重置分数"
                        >
                            <RotateCcw size={20} />
                        </button>
                        <button
                            onClick={resetAll}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                            title="清空所有数据"
                        >
                            <Trash2 size={20} />
                        </button>
                        <div className="w-px h-6 bg-slate-200 mx-2"></div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-slate-100 rounded-full text-slate-500 transition-colors"
                        >
                            <Minimize2 size={24} />
                        </button>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-hidden grid grid-cols-1 lg:grid-cols-4 bg-slate-50">
                    {/* Main Content: Student Grid */}
                    <div className="lg:col-span-3 p-6 overflow-y-auto">
                        {/* Input Area */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-2 mb-6 sticky top-0 z-10">
                            <div className="flex-1 relative">
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="text"
                                    value={newStudentName}
                                    onChange={(e) => setNewStudentName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addStudent()}
                                    placeholder="输入姓名，多个姓名用逗号或空格分隔..."
                                    className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                />
                            </div>
                            <button
                                onClick={addStudent}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-indigo-200 whitespace-nowrap"
                            >
                                <UserPlus size={20} /> 添加
                            </button>
                        </div>

                        {/* Students Grid */}
                        {students.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                                <div className="text-slate-300 mb-4">
                                    <Users size={64} className="mx-auto" />
                                </div>
                                <h3 className="text-xl font-medium text-slate-400">还没有同学加入课堂</h3>
                                <p className="text-slate-400 mt-2">在上方输入姓名开始积分吧！</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                                {students.map((student) => (
                                    <div
                                        key={student.id}
                                        className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 hover:shadow-md hover:border-indigo-300 transition-all group relative animate-in zoom-in-95 duration-300"
                                    >
                                        <button
                                            onClick={() => removeStudent(student.id)}
                                            className="absolute top-2 right-2 p-1 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X size={14} />
                                        </button>

                                        <div className="flex justify-between items-center mb-3">
                                            <h3 className="font-bold text-slate-800 truncate pr-6 text-lg" title={student.name}>
                                                {student.name}
                                            </h3>
                                            <div className={`text-2xl font-black ${student.points > 0 ? 'text-indigo-600' : 'text-slate-400'}`}>
                                                {student.points}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2">
                                            <button
                                                onClick={() => updatePoints(student.id, 0.5)}
                                                className="flex items-center justify-center gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 rounded-lg font-bold transition-transform active:scale-95 text-sm"
                                            >
                                                + 0.5
                                            </button>
                                            <button
                                                onClick={() => updatePoints(student.id, 1)}
                                                className="flex items-center justify-center gap-1 bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-2 rounded-lg font-bold shadow-md shadow-indigo-200 transition-transform active:scale-95 text-sm"
                                            >
                                                + 1.0
                                            </button>
                                        </div>

                                        <div className="flex justify-between mt-2 pt-2 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => updatePoints(student.id, -0.5)}
                                                className="text-[10px] text-slate-400 hover:text-red-500 py-1"
                                            >
                                                撤销0.5
                                            </button>
                                            <button
                                                onClick={() => updatePoints(student.id, -1)}
                                                className="text-[10px] text-slate-400 hover:text-red-500 py-1"
                                            >
                                                撤销1.0
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Sidebar: Leaderboard & History */}
                    <div className="border-l border-slate-200 bg-white flex flex-col h-full overflow-hidden">
                        {/* Leaderboard */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-4 text-white sticky top-0 z-10">
                                <h3 className="font-bold flex items-center gap-2">
                                    <Trophy size={18} /> 排行榜
                                </h3>
                            </div>
                            <div>
                                {sortedStudents.slice(0, 20).map((s, idx) => (
                                    <div key={s.id} className="flex items-center p-3 border-b border-slate-50 hover:bg-slate-50 transition-colors">
                                        <div className={`
                                            w-6 h-6 rounded-full flex items-center justify-center font-bold mr-3 shrink-0 text-xs
                                            ${idx === 0 ? 'bg-yellow-100 text-yellow-600' : ''}
                                            ${idx === 1 ? 'bg-slate-100 text-slate-600' : ''}
                                            ${idx === 2 ? 'bg-orange-100 text-orange-600' : ''}
                                            ${idx > 2 ? 'text-slate-400' : ''}
                                        `}>
                                            {idx + 1}
                                        </div>
                                        <div className="flex-1 font-medium truncate text-sm">{s.name}</div>
                                        <div className="font-bold text-indigo-600 text-sm">{s.points}</div>
                                    </div>
                                ))}
                                {students.length === 0 && (
                                    <div className="text-center py-10 text-slate-300 text-xs">暂无数据</div>
                                )}
                            </div>
                        </div>

                        {/* History Panel (Conditional) */}
                        {showHistory && (
                            <div className="h-1/2 border-t border-slate-200 flex flex-col bg-slate-50 animate-in slide-in-from-bottom-10">
                                <div className="bg-slate-100 p-3 border-b border-slate-200 flex justify-between items-center shrink-0">
                                    <h3 className="font-bold text-slate-700 text-xs">操作记录</h3>
                                    <button onClick={() => setHistory([])} className="text-xs text-slate-400 hover:text-red-500">清空</button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-2 space-y-2">
                                    {history.map((h) => (
                                        <div key={h.id} className="text-xs p-2 bg-white rounded border border-slate-100 flex justify-between shadow-sm">
                                            <div>
                                                <span className="font-bold text-slate-700">{h.studentName}</span>
                                                <span className={`ml-2 font-mono font-bold ${h.diff > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                    {h.diff > 0 ? '+' : ''}{h.diff}
                                                </span>
                                            </div>
                                            <div className="text-[10px] text-slate-400">{h.time.split(' ')[1]}</div>
                                        </div>
                                    ))}
                                    {history.length === 0 && (
                                        <div className="text-center py-4 text-slate-400 text-xs">暂无记录</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClassroomPoints;
