// Five-dimension verification model.
//
// A paper's trustworthiness is not one flag: a paper can have an answer key
// checked against the official PDF while its explanations are still generated
// text. Collapsing those into a single "verified" badge is what let the UI
// claim "逐项解析均已通过人工核验" for papers whose review scope explicitly
// covered only 题面/代码/选项/答案.
//
// Dimensions are resolved from explicit `verification.dimensions` when present,
// otherwise conservatively inferred from the legacy `status` + `scope` text.
// Inference never upgrades a dimension the scope text doesn't mention.

export const VERIFICATION_DIMENSIONS = [
  { key: 'statement', label: '题面' },
  { key: 'options', label: '选项' },
  { key: 'answer', label: '答案' },
  { key: 'explanation', label: '解析' },
  { key: 'referenceCode', label: '参考代码' },
];

export const DIMENSION_STATUS = {
  verified: { label: '已人工核验', tone: 'emerald' },
  partial: { label: '部分核验', tone: 'blue' },
  unverified: { label: '未核验', tone: 'slate' },
};

const SCOPE_KEYWORDS = {
  statement: ['题面', '题干'],
  options: ['选项'],
  answer: ['答案'],
  explanation: ['解析', '讲解'],
  referenceCode: ['代码', '参考程序'],
};

const emptyDimensions = (value) => Object.fromEntries(
  VERIFICATION_DIMENSIONS.map(({ key }) => [key, value])
);

/**
 * Resolve a paper's per-dimension verification state.
 * Accepts either a full paperData object or a paperMeta entry.
 */
export function resolveVerification(source) {
  if (!source) return { status: 'unverified', dimensions: emptyDimensions('unverified') };

  const verification = source.verification || {};
  const status = verification.status || source.reviewStatus || 'unverified';
  const scope = String(verification.scope || source.reviewScope || '');

  if (verification.dimensions) {
    return {
      status,
      scope,
      reviewedBy: verification.reviewedBy || source.reviewedBy || '',
      reviewedAt: verification.reviewedAt || source.reviewedAt || '',
      dimensions: { ...emptyDimensions('unverified'), ...verification.dimensions },
    };
  }

  // Legacy inference. A dimension only counts as reviewed when the recorded
  // scope text actually names it — an unmentioned dimension stays unverified
  // even on a paper whose overall status is "verified".
  const dimensions = emptyDimensions('unverified');
  if (status !== 'unverified') {
    const mentioned = (keys) => keys.some((word) => scope.includes(word));
    for (const { key } of VERIFICATION_DIMENSIONS) {
      if (mentioned(SCOPE_KEYWORDS[key])) {
        dimensions[key] = status === 'verified' ? 'verified' : 'partial';
      }
    }
  }

  return {
    status,
    scope,
    reviewedBy: verification.reviewedBy || source.reviewedBy || '',
    reviewedAt: verification.reviewedAt || source.reviewedAt || '',
    dimensions,
  };
}

/** True only when the paper's answer key itself was checked against the source. */
export function isAnswerVerified(source) {
  return resolveVerification(source).dimensions.answer === 'verified';
}

/** True only when explanations were reviewed as their own pass. */
export function isExplanationVerified(source) {
  return resolveVerification(source).dimensions.explanation === 'verified';
}
