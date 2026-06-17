import React, { useEffect, useRef, useState } from 'react';

export default function DeferredSection({
    children,
    id,
    minHeight = 480,
    rootMargin = '700px 0px',
    className = ''
}) {
    const ref = useRef(null);
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        if (shouldRender) return undefined;

        if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
            setShouldRender(true);
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldRender(true);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );

        const node = ref.current;
        if (node) observer.observe(node);

        return () => observer.disconnect();
    }, [rootMargin, shouldRender]);

    return (
        <div id={id} ref={ref} className={className} style={!shouldRender ? { minHeight } : undefined}>
            {shouldRender ? children : (
                <div className="h-full min-h-[inherit] bg-slate-50" aria-hidden="true" />
            )}
        </div>
    );
}
