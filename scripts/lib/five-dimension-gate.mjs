export const auditDimensions = ['statement', 'options', 'answer', 'explanation', 'referenceCode'];
export const editableFields = new Set(['question', 'description', 'inputDescription', 'outputDescription', 'code', 'options', 'answer', 'explanation', 'referenceCode', 'samples', 'title']);
const fieldDimensions = {
    question: ['statement'], description: ['statement'], inputDescription: ['statement'], outputDescription: ['statement'], code: ['statement', 'answer', 'explanation'],
    title: ['statement'], options: ['options', 'answer', 'explanation'], answer: ['answer', 'explanation'],
    explanation: ['explanation'], referenceCode: ['referenceCode'], samples: ['statement', 'referenceCode'],
};
const applicable = (question, dimension) => dimension === 'options' ? question.type === 'single'
    : dimension === 'answer' ? ['single', 'judge'].includes(question.type)
    : dimension === 'referenceCode' ? ['programming', 'coding'].includes(question.type) : true;

export function gateQuestionReview(question, initial, review, { changesApplied = false, codeCheck } = {}) {
    const relevant = auditDimensions.filter(dimension => applicable(question, dimension));
    const blocked = new Set();
    const reasons = [];
    const proposed = review?.changes || {};
    const changes = {};
    const notes = {};
    if (!initial || !review || question.id !== initial.id || question.id !== review.id) {
        return { id: question.id, dimensions: [], blockedDimensions: relevant, changes: {}, unresolved: ['缺少匹配题号的双模型记录'] };
    }
    if (question.sourceIntegrity || question.needsReview) {
        return { id: question.id, dimensions: [], blockedDimensions: relevant, changes: {}, unresolved: ['保留原有争议/待审标记，模型结论不能自动解除'] };
    }
    for (const [field, value] of Object.entries(proposed)) {
        const shapeValid = field === 'answer' ? Number.isInteger(value) && value >= 0 && value < (question.type === 'judge' ? 2 : (proposed.options || question.options || []).length)
            : field === 'options' ? Array.isArray(value) && value.length === 4 && value.every(option => typeof option === 'string')
            : field === 'samples' ? Array.isArray(value) && value.length > 0 && value.every(sample => typeof sample.input === 'string' && typeof sample.output === 'string')
            : typeof value === 'string' && value.trim().length > 0;
        if (!editableFields.has(field) || !shapeValid || review.verdict !== 'approve'
            || JSON.stringify(initial.changes?.[field]) !== JSON.stringify(value)) {
            (fieldDimensions[field] || relevant).forEach(dimension => blocked.add(dimension));
            reasons.push(`修改 ${field} 未获得两模型一致批准，待回流`);
        } else if (JSON.stringify(question[field]) !== JSON.stringify(value)) {
            changes[field] = value;
            if (!changesApplied) {
                fieldDimensions[field].forEach(dimension => blocked.add(dimension));
                reasons.push(`修改 ${field} 已获一致批准，尚未应用`);
            }
        }
    }
    for (const dimension of relevant) {
        const a = initial.dimensions?.[dimension];
        const b = review.dimensions?.[dimension];
        notes[dimension] = { initial: a?.evidence || '', review: b?.evidence || '' };
        const fixed = a?.status === 'needs_fix' && changesApplied && Object.keys(changes).some(field => fieldDimensions[field]?.includes(dimension));
        if (!(a?.status === 'verified' || fixed) || b?.status !== 'verified'
            || !a.evidence?.trim() || !b.evidence?.trim() || !initial.sourcePages?.length || !review.sourcePages?.length) {
            blocked.add(dimension);
            reasons.push(`${dimension} 尚无一致、完整的原卷核验结论`);
        }
    }
    const answer = changesApplied && Object.hasOwn(changes, 'answer') ? changes.answer : question.answer;
    if (relevant.includes('answer') && (!Number.isInteger(initial.officialAnswer) || initial.officialAnswer !== review.officialAnswer || review.officialAnswer !== answer)) {
        blocked.add('answer');
        reasons.push('原卷答案未一致读出，或与当前采用答案不同');
    }
    if (relevant.includes('referenceCode') && (!codeCheck?.passed || codeCheck.sampleCount < 1 || codeCheck.boundaryCount < 2)) {
        blocked.add('referenceCode');
        reasons.push('参考程序尚未通过实际编译、原样例和至少两条复核后的边界用例');
    }
    return {
        id: question.id, dimensions: relevant.filter(dimension => !blocked.has(dimension)),
        blockedDimensions: [...blocked], changes, sourcePages: review.sourcePages,
        official: !blocked.has('answer') && relevant.includes('answer') ? answer : undefined,
        evidence: notes, unresolved: [...new Set(reasons)],
    };
}
