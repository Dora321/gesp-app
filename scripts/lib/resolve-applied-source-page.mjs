/** GESP official PDFs place the answer key on page 1. */
export const ANSWER_TABLE_PAGE = 1;

export function isAnswerTablePage(page) {
    return page === ANSWER_TABLE_PAGE;
}

export function questionPagesFrom(sourcePages = []) {
    return (Array.isArray(sourcePages) ? sourcePages : []).filter(
        page => Number.isInteger(page) && page > 0 && !isAnswerTablePage(page)
    );
}

/**
 * Decide whether a revision apply should write sourcePage.
 * Never overwrites an existing official sourcePage from sourcePages[0].
 * Only sets sourcePage when the field is missing, or when sourcePage is
 * explicitly in the accepted fields. Never returns the answer-table page.
 * Returns undefined when the existing official page should be left untouched.
 */
export function resolveAppliedSourcePage({ existingSourcePage, acceptedChanges = {}, sourcePages = [] } = {}) {
    const hasExisting = Number.isInteger(existingSourcePage) && existingSourcePage > 0;
    const hasExplicit = Object.hasOwn(acceptedChanges, 'sourcePage');
    const questionPages = questionPagesFrom(sourcePages);
    const safePage = page => (Number.isInteger(page) && page > 0 && !isAnswerTablePage(page) ? page : undefined);

    if (hasExplicit) {
        return safePage(acceptedChanges.sourcePage)
            ?? (hasExisting && !isAnswerTablePage(existingSourcePage) ? existingSourcePage : undefined)
            ?? questionPages[0];
    }
    if (hasExisting) return undefined;
    return questionPages[0];
}
