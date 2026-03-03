import { paperRegistry } from '../../data/gesp';
import EnhancedPaperPage from './EnhancedPaperPage';

const sharedEnhancedComponent = EnhancedPaperPage;

const enhancedPaperRegistry = Object.keys(paperRegistry).reduce((acc, paperId) => {
    acc[paperId] = sharedEnhancedComponent;
    return acc;
}, {});

export const getEnhancedPaperComponent = (paperId) => enhancedPaperRegistry[paperId] || null;

export default enhancedPaperRegistry;
