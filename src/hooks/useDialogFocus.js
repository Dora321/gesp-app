import { useEffect, useRef } from 'react';

// Keep keyboard navigation inside an open dialog and return focus to its trigger.
export default function useDialogFocus(onDismiss) {
    const panelRef = useRef(null);
    const dismissRef = useRef(onDismiss);

    useEffect(() => { dismissRef.current = onDismiss; }, [onDismiss]);
    useEffect(() => {
        const panel = panelRef.current;
        if (!panel) return undefined;
        const previousFocus = document.activeElement;
        const previousOverflow = document.body.style.overflow;
        const controls = () => [...panel.querySelectorAll('button:not(:disabled), a[href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')]
            .filter(element => element.getClientRects().length > 0);
        document.body.style.overflow = 'hidden';
        (controls()[0] || panel).focus();
        const onKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                dismissRef.current?.();
            } else if (event.key === 'Tab') {
                const items = controls();
                const first = items[0] || panel;
                const last = items.at(-1) || panel;
                if (!panel.contains(document.activeElement) || items.length === 0) {
                    event.preventDefault();
                    first.focus();
                } else if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            document.body.style.overflow = previousOverflow;
            if (previousFocus?.isConnected) previousFocus.focus();
        };
    }, []);
    return panelRef;
}
