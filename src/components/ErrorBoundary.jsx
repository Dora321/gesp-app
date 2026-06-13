import React from 'react';

// 部署后旧标签页里的动态 chunk hash 会失效，懒加载时抛
// "Failed to fetch dynamically imported module" 之类的错误。
const isChunkLoadError = (error) => {
    if (!error) return false;
    const msg = `${error.name || ''} ${error.message || ''}`;
    return /Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed|ChunkLoadError|Loading chunk \d+ failed/i.test(msg);
};

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, reloading: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error, reloading: isChunkLoadError(error) };
    }

    componentDidCatch(error, info) {
        // chunk 失效时自动刷新一次拿最新版本；用时间戳节流，避免刷新死循环，
        // 也能在隔一段时间后的真·新部署里再次自愈。
        if (isChunkLoadError(error)) {
            const last = Number(sessionStorage.getItem('last_chunk_reload') || 0);
            if (Date.now() - last > 10000) {
                sessionStorage.setItem('last_chunk_reload', String(Date.now()));
                window.location.reload();
                return;
            }
        }
        console.error('[ErrorBoundary]', error, info);
    }

    handleReload = () => {
        sessionStorage.removeItem('last_chunk_reload');
        window.location.reload();
    };

    handleHome = () => {
        sessionStorage.removeItem('last_chunk_reload');
        window.location.href = import.meta.env.BASE_URL;
    };

    render() {
        if (!this.state.hasError) return this.props.children;

        // chunk 错误：要么正在自动刷新，要么被节流。给个中性的“更新中”界面，
        // 不要把脏的报错栈吓到学生。
        if (this.state.reloading) {
            return (
                <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-slate-50 text-slate-600">
                    <span className="w-8 h-8 border-4 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
                    <p className="text-sm">正在加载最新版本…</p>
                    <button
                        onClick={this.handleReload}
                        className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                        没反应？点此手动刷新
                    </button>
                </div>
            );
        }

        return (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-50 p-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center text-3xl">
                        😵
                    </div>
                    <h1 className="text-lg font-bold text-slate-800 mb-2">页面出了点小问题</h1>
                    <p className="text-sm text-slate-500 mb-6">
                        刷新一下通常就好了。如果反复出现，请返回首页重新进入。
                    </p>
                    <div className="flex gap-3 justify-center">
                        <button
                            onClick={this.handleReload}
                            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl transition-colors"
                        >
                            刷新重试
                        </button>
                        <button
                            onClick={this.handleHome}
                            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-colors"
                        >
                            返回首页
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ErrorBoundary;
