import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const practiceHash = '#programming-practice';

export function getRequestedLessonSection(sections, { search, hash }, withPracticeAnchor = false) {
    if (withPracticeAnchor && hash === practiceHash) return sections.at(-1)?.id;
    const requested = new URLSearchParams(search).get('s');
    return sections.find(({ id }) => String(id) === requested)?.id;
}

export default function useLessonSectionUrl() {
    const { pathname, search, hash, state } = useLocation();
    const navigate = useNavigate();

    return useCallback((sectionId, preservePracticeAnchor = false) => {
        const params = new URLSearchParams(search);
        const nextHash = hash === practiceHash && !preservePracticeAnchor ? '' : hash;
        if (params.get('s') === String(sectionId) && nextHash === hash) return;

        params.set('s', String(sectionId));
        navigate({ pathname, search: `?${params}`, hash: nextHash }, { replace: true, state, preventScrollReset: true });
    }, [pathname, search, hash, state, navigate]);
}
