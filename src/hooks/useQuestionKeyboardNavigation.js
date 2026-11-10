import { useEffect } from 'react';

const isEditableTarget = (target) => {
    if (!(target instanceof HTMLElement)) return false;
    const tagName = target.tagName.toLowerCase();
    return (
        tagName === 'input' ||
        tagName === 'textarea' ||
        tagName === 'select' ||
        target.isContentEditable ||
        target.getAttribute('role') === 'textbox'
    );
};

export default function useQuestionKeyboardNavigation({
    enabled = true,
    questionCount,
    onPrevious,
    onNext
}) {
    useEffect(() => {
        if (!enabled || questionCount <= 0) return undefined;

        const handleKeyDown = (event) => {
            if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
            if (isEditableTarget(event.target)) return;

            // 只用 ←/→ 翻题；↑/↓ 留给浏览器滚动，长代码题才能用键盘上下看。
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                onPrevious();
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                onNext();
            }
        };

        document.addEventListener('keydown', handleKeyDown, { capture: true });
        return () => document.removeEventListener('keydown', handleKeyDown, { capture: true });
    }, [enabled, questionCount, onPrevious, onNext]);
}
