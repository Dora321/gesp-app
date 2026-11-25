import React, { Suspense, lazy, useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import LoadingBlocks from './LoadingBlocks';
import { AI_CHAT_SHEET_BREAKPOINT } from '../utils/aiChatHelpers';
import './AIChatCorner.css';

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
    <>
        <div className="fixed inset-0 z-[115] bg-slate-900/45 md:hidden" aria-hidden="true" />
        <div
            className="fixed inset-x-0 bottom-0 z-[120] flex h-[74vh] max-h-[100dvh] items-center justify-center rounded-t-2xl border border-b-0 border-slate-200 bg-white shadow-2xl md:inset-x-auto md:bottom-4 md:right-5 md:h-[580px] md:w-[380px] md:max-h-[calc(100vh-32px)] md:max-w-[calc(100vw-32px)] md:rounded-2xl md:border"
            role="status"
            aria-label="正在加载 AI 问答助手"
        >
            <div className="flex items-center gap-2.5 text-slate-500 text-sm">
                <LoadingBlocks />
                正在加载助手
            </div>
        </div>
    </>
);

const AIChat = ({ mobileInline = false, desktopOnly = false, corner = false, standalone = false, onClose }) => {
    const [isOpen, setIsOpen] = useState(standalone);
    const [initialPrompt, setInitialPrompt] = useState('');
    const messageCount = isOpen ? 0 : getMessageCount();

    useEffect(() => {
        const openFromQuestion = event => {
            const mobile = window.innerWidth < AI_CHAT_SHEET_BREAKPOINT;
            if ((mobileInline && !mobile) || (desktopOnly && mobile)) return;
            const prompt = event.detail?.prompt;
            if (typeof prompt !== 'string' || !prompt.trim()) return;
            // 首次打开需要跨越懒加载边界，先保留这次事件的内容。
            setInitialPrompt(prompt);
            setIsOpen(true);
        };
        window.addEventListener('gesp:ask-ai', openFromQuestion);
        return () => window.removeEventListener('gesp:ask-ai', openFromQuestion);
    }, [mobileInline, desktopOnly]);

    if (!isOpen) {
        const launcher = (
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className={`${mobileInline
                    ? 'relative flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white shadow-sm'
                    : corner
                        ? 'mw-ai-corner-button'
                        : 'fixed bottom-20 right-4 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-xl sm:bottom-40 sm:right-6 sm:h-14 sm:w-14'
                    } group transition hover:scale-105 hover:bg-blue-700`}
                aria-label="打开 AI 问答助手"
                aria-haspopup="dialog"
                title="AI 问答助手"
            >
                <MessageCircle size={22} className="group-hover:rotate-12 transition-transform sm:size-6" />
                {!corner && messageCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
                        {messageCount}
                    </span>
                )}
            </button>
        );
        return corner ? <div className="mw-ai-corner">{launcher}</div> : launcher;
    }

    return (
        <Suspense fallback={<PanelFallback />}>
            <AIChatWidget
                initialPrompt={initialPrompt}
                mobileInline={mobileInline}
                desktopOnly={desktopOnly}
                onClose={onClose || (() => { setInitialPrompt(''); setIsOpen(false); })}
            />
        </Suspense>
    );
};

export default AIChat;
