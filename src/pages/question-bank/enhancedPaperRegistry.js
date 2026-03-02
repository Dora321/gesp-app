import GESP2_2025_12 from '../../data/gesp/level2/GESP2_2025_12';

const enhancedPaperRegistry = {
    '2025-12-l2': GESP2_2025_12,
};

export const getEnhancedPaperComponent = (paperId) => enhancedPaperRegistry[paperId] || null;

export default enhancedPaperRegistry;
