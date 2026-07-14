import React, { useEffect, useMemo, useState } from 'react';
import { Archive, Bookmark, Check, Dices, Search, X } from 'lucide-react';
import { allExhibits } from '../data/museumExhibits';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ClassroomPoints from '../components/ClassroomPoints';
import AIChat from '../components/AIChat';
import { readLearningData, updateLearningData } from '../utils/learningData';

const ERA_DEFINITIONS = [
    { id: 'origins', label: '早期思想', range: '公元前 150 年 - 1949 年', min: Number.NEGATIVE_INFINITY, max: 1949 },
    { id: 'foundations', label: '计算机基础', range: '1950 - 1989 年', min: 1950, max: 1989 },
    { id: 'internet', label: '互联网兴起', range: '1990 - 2009 年', min: 1990, max: 2009 },
    { id: 'intelligence', label: '智能时代', range: '2010 年至今', min: 2010, max: Number.POSITIVE_INFINITY },
    { id: 'unknown', label: '年份未定', range: '跨时代概念与文化', min: null, max: null },
];

const parseExhibitYear = (value) => {
    const year = String(value || '').trim();
    if (/^-\d+$/.test(year)) return Number(year);
    if (/^\d{4}(?:s)?$/.test(year)) return Number.parseInt(year, 10);
    return null;
};

const getEraId = (item) => {
    const year = parseExhibitYear(item.year);
    if (year === null) return 'unknown';
    return ERA_DEFINITIONS.find((era) => era.min !== null && year >= era.min && year <= era.max)?.id || 'unknown';
};

const readCollection = () => {
    if (typeof window === 'undefined') return [];
    const saved = readLearningData().museum.collected;
    const validIds = new Set(allExhibits.map((item) => item.id));
    return Array.isArray(saved) ? [...new Set(saved.filter((id) => validIds.has(id)))] : [];
};

const getRarityBadge = (rarity) => {
    switch (rarity) {
        case '夯': return 'border-amber-200 bg-amber-50 text-amber-700';
        case '顶级': return 'border-fuchsia-200 bg-fuchsia-50 text-fuchsia-700';
        case '人上人': return 'border-blue-200 bg-blue-50 text-blue-700';
        case 'NPC': return 'border-emerald-200 bg-emerald-50 text-emerald-700';
        default: return 'border-slate-200 bg-slate-100 text-slate-600';
    }
};

export default function ComputingMuseum() {
    const [selectedExhibit, setSelectedExhibit] = useState(null);
    const [selectedEra, setSelectedEra] = useState('all');
    const [query, setQuery] = useState('');
    const [collectionMode, setCollectionMode] = useState(false);
    const [collectedItems, setCollectedItems] = useState(readCollection);

    const collectionSet = useMemo(() => new Set(collectedItems), [collectedItems]);
    const normalizedQuery = query.trim().toLocaleLowerCase('zh-CN');

    const groups = useMemo(() => {
        const matches = allExhibits
            .filter((item) => selectedEra === 'all' || getEraId(item) === selectedEra)
            .filter((item) => {
                if (!normalizedQuery) return true;
                return [item.title, item.description, item.year, item.rarity]
                    .some((value) => String(value || '').toLocaleLowerCase('zh-CN').includes(normalizedQuery));
            })
            .sort((a, b) => {
                const yearA = parseExhibitYear(a.year);
                const yearB = parseExhibitYear(b.year);
                if (yearA === null && yearB !== null) return 1;
                if (yearA !== null && yearB === null) return -1;
                if (yearA !== yearB) return yearA - yearB;
                return a.title.localeCompare(b.title, 'zh-CN');
            });

        return ERA_DEFINITIONS
            .map((era) => ({ ...era, items: matches.filter((item) => getEraId(item) === era.id) }))
            .filter((era) => era.items.length > 0);
    }, [normalizedQuery, selectedEra]);

    const visibleItems = groups.flatMap((group) => group.items);

    useEffect(() => {
        if (!selectedExhibit) return undefined;
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setSelectedExhibit(null);
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', closeOnEscape);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener('keydown', closeOnEscape);
        };
    }, [selectedExhibit]);

    const toggleCollection = (id) => {
        setCollectedItems((current) => {
            const next = current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id];
            updateLearningData((data) => ({
                ...data,
                museum: { ...data.museum, collected: next },
            }), 'museum-collection');
            return next;
        });
    };

    const openRandomExhibit = () => {
        const pool = visibleItems.length > 0 ? visibleItems : allExhibits;
        setSelectedExhibit(pool[Math.floor(Math.random() * pool.length)]);
    };

    return (
        <div className="flex min-h-screen flex-col bg-slate-50 font-sans text-brand-slate">
            <Navigation
                mobileActions={(
                    <div className="flex items-center gap-1" role="toolbar" aria-label="快捷工具">
                        <ClassroomPoints mobileInline />
                        <AIChat mobileInline />
                    </div>
                )}
            />

            <main className="flex-grow pb-20 pt-20">
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                        <div className="max-w-3xl">
                            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                                <Archive size={15} />
                                计算文明时间线
                            </div>
                            <h1 className="text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">计算博物馆</h1>
                            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                                从古代算法到人工智能，按年代浏览 100 件计算史展品。阅读不需要解锁；收藏只是可选的探索记录。
                            </p>
                        </div>

                        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
                            <div>
                                <label htmlFor="museum-search" className="mb-2 block text-sm font-bold text-slate-700">搜索展品</label>
                                <div className="relative max-w-xl">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
                                    <input
                                        id="museum-search"
                                        type="search"
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="搜索人物、技术、年份或关键词"
                                        className="min-h-12 w-full rounded-lg border border-slate-300 bg-white py-3 pl-10 pr-4 text-base text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <button
                                    type="button"
                                    onClick={() => setCollectionMode((current) => !current)}
                                    role="switch"
                                    aria-checked={collectionMode}
                                    className={`inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 py-2 text-sm font-bold transition ${collectionMode
                                        ? 'border-amber-300 bg-amber-50 text-amber-800'
                                        : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400'
                                        }`}
                                >
                                    <Bookmark size={18} fill={collectionMode ? 'currentColor' : 'none'} />
                                    收集模式
                                    <span className="text-xs font-semibold">{collectedItems.length}/{allExhibits.length}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={openRandomExhibit}
                                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
                                >
                                    <Dices size={18} />
                                    随机逛一件
                                </button>
                            </div>
                        </div>

                        <div className="mt-6 flex gap-2 overflow-x-auto pb-1" aria-label="按年代筛选">
                            <button
                                type="button"
                                onClick={() => setSelectedEra('all')}
                                aria-pressed={selectedEra === 'all'}
                                className={`min-h-11 shrink-0 rounded-lg px-4 text-sm font-bold transition ${selectedEra === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            >
                                全部年代
                            </button>
                            {ERA_DEFINITIONS.map((era) => (
                                <button
                                    key={era.id}
                                    type="button"
                                    onClick={() => setSelectedEra(era.id)}
                                    aria-pressed={selectedEra === era.id}
                                    className={`min-h-11 shrink-0 rounded-lg px-4 text-sm font-bold transition ${selectedEra === era.id ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                                >
                                    {era.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>

                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between gap-4">
                        <p className="text-sm font-semibold text-slate-500" aria-live="polite">
                            当前显示 <span className="font-black text-slate-900">{visibleItems.length}</span> 件展品
                        </p>
                        {query && (
                            <button type="button" onClick={() => setQuery('')} className="min-h-11 text-sm font-bold text-blue-600 hover:text-blue-800">
                                清除搜索
                            </button>
                        )}
                    </div>

                    {groups.length > 0 ? (
                        <div className="space-y-14">
                            {groups.map((group) => (
                                <section key={group.id} aria-labelledby={`museum-era-${group.id}`}>
                                    <div className="mb-5 flex items-end justify-between gap-4 border-b border-slate-200 pb-4">
                                        <div>
                                            <h2 id={`museum-era-${group.id}`} className="text-2xl font-black text-slate-950">{group.label}</h2>
                                            <p className="mt-1 text-sm font-semibold text-slate-500">{group.range}</p>
                                        </div>
                                        <span className="shrink-0 rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 ring-1 ring-slate-200">
                                            {group.items.length} 件
                                        </span>
                                    </div>

                                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {group.items.map((item) => {
                                            const isCollected = collectionSet.has(item.id);
                                            return (
                                                <article key={item.id} className="flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:border-blue-200 hover:shadow-md">
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedExhibit(item)}
                                                        className="flex min-h-56 flex-1 flex-col p-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
                                                        aria-label={`查看展品：${item.title}`}
                                                    >
                                                        <div className="mb-5 flex items-start justify-between gap-3">
                                                            <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                                                                {React.cloneElement(item.icon, { size: 28, strokeWidth: 1.5 })}
                                                            </span>
                                                            <div className="flex items-center gap-2">
                                                                {isCollected && <Check size={18} className="text-emerald-600" aria-label="已收藏" />}
                                                                <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${getRarityBadge(item.rarity)}`}>
                                                                    {item.rarity}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <span className="font-mono text-xs font-bold text-blue-600">{item.year === '-' ? '年份未定' : item.year}</span>
                                                        <h3 className="mt-1 text-xl font-black text-slate-900">{item.title}</h3>
                                                        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-500">{item.description}</p>
                                                        <span className="mt-auto pt-5 text-sm font-bold text-blue-600">打开档案</span>
                                                    </button>

                                                    {collectionMode && (
                                                        <button
                                                            type="button"
                                                            onClick={() => toggleCollection(item.id)}
                                                            aria-pressed={isCollected}
                                                            className={`mx-5 mb-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-bold transition ${isCollected
                                                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                                                : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-amber-300 hover:bg-amber-50 hover:text-amber-800'
                                                                }`}
                                                        >
                                                            {isCollected ? <Check size={17} /> : <Bookmark size={17} />}
                                                            {isCollected ? '已收入收藏' : '加入我的收藏'}
                                                        </button>
                                                    )}
                                                </article>
                                            );
                                        })}
                                    </div>
                                </section>
                            ))}
                        </div>
                    ) : (
                        <div className="border-y border-slate-200 py-20 text-center">
                            <Search className="mx-auto text-slate-300" size={36} />
                            <h2 className="mt-4 text-xl font-black text-slate-800">没有找到相关展品</h2>
                            <p className="mt-2 text-sm text-slate-500">换一个关键词，或查看全部年代。</p>
                            <button
                                type="button"
                                onClick={() => { setQuery(''); setSelectedEra('all'); }}
                                className="mt-5 min-h-11 rounded-lg bg-blue-600 px-5 text-sm font-bold text-white hover:bg-blue-700"
                            >
                                查看全部展品
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer />

            {selectedExhibit && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="museum-dialog-title">
                    <button
                        type="button"
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                        onClick={() => setSelectedExhibit(null)}
                        aria-label="关闭档案详情"
                    />
                    <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-lg bg-white shadow-2xl">
                        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white/95 p-5 backdrop-blur sm:p-6">
                            <div className="flex min-w-0 items-center gap-4">
                                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                                    {React.cloneElement(selectedExhibit.icon, { size: 28, strokeWidth: 1.5 })}
                                </span>
                                <div className="min-w-0">
                                    <h2 id="museum-dialog-title" className="text-xl font-black text-slate-950 sm:text-2xl">{selectedExhibit.title}</h2>
                                    <p className="mt-1 font-mono text-xs font-bold text-slate-500">{selectedExhibit.year} · {selectedExhibit.rarity}</p>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedExhibit(null)}
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition hover:bg-slate-200"
                                aria-label="关闭档案详情"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-5 sm:p-8">
                            <p className="mb-6 text-base font-semibold leading-7 text-slate-600">{selectedExhibit.description}</p>
                            <div className="rounded-lg bg-slate-900 p-5 text-slate-300 shadow-inner sm:p-6">
                                <div className="mb-4 flex items-center gap-2 border-b border-slate-700 pb-3 font-mono text-xs text-slate-500">
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                                    <span className="ml-2">ARCHIVE_READER</span>
                                </div>
                                {selectedExhibit.details}
                            </div>
                        </div>

                        <div className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 p-4 sm:flex-row sm:justify-end sm:p-5">
                            <button
                                type="button"
                                onClick={() => setSelectedExhibit(null)}
                                className="min-h-11 rounded-lg border border-slate-300 bg-white px-5 text-sm font-bold text-slate-700 hover:bg-slate-100"
                            >
                                关闭
                            </button>
                            <button
                                type="button"
                                onClick={() => toggleCollection(selectedExhibit.id)}
                                aria-pressed={collectionSet.has(selectedExhibit.id)}
                                className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-bold text-white ${collectionSet.has(selectedExhibit.id) ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-amber-500 hover:bg-amber-600'}`}
                            >
                                {collectionSet.has(selectedExhibit.id) ? <Check size={17} /> : <Bookmark size={17} />}
                                {collectionSet.has(selectedExhibit.id) ? '已收入收藏' : '加入我的收藏'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
