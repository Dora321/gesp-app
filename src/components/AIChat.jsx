import React, { Suspense, lazy, useState } from 'react';
import { MessageCircle } from 'lucide-react';

// 重量级聊天面板（react-markdown + highlight.js + remark/rehype 全家桶）只在
// 用户首次点开聊天时才动态加载，避免把这套依赖塞进首屏 bundle。
const AIChatWidget = lazy(() => import('./AIChatWidget'));

const getMessageCount = () => {
    try {
        return JSON.parse(sessionStorage.getItem('ai_chat_messages') || '[]').length;
    } catch {
        return 0;
    }
};

const PanelFallback = () => (
    <div className="fixed bottom-24 right-6 z-[100] w-[360px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-120px)] bg-white rounded-2xl shadow-2xl border border-slate-200 flex items-center justify-center">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
            <span className="w-4 h-4 border-2 border-slate-300 border-t-indigo-500 rounded-full animate-spin" />
            正在加载助手…
        </div>
    </div>
);

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const messageCount = isOpen ? 0 : getMessageCount();

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-24 right-6 z-[100] w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 group"
                title="AI 问答助手"
            >
                <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
                {messageCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {messageCount}
                    </span>
                )}
            </button>
        );
    }

    return (
        <Suspense fallback={<PanelFallback />}>
            <AIChatWidget onClose={() => setIsOpen(false)} />
        </Suspense>
    );
};

export default AIChat;
