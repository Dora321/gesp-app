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

            if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                event.preventDefault();
                onPrevious();
            }

            if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                event.preventDefault();
                onNext();
            }
        };

        document.addEventListener('keydown', handleKeyDown, { capture: true });
        return () => document.removeEventListener('keydown', handleKeyDown, { capture: true });
    }, [enabled, questionCount, onPrevious, onNext]);
}
