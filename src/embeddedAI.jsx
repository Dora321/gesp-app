import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/design-tokens.css';
import './styles/site-surfaces.css';
import AIChat from './components/AIChat';

function closeAssistant() {
    if (window.parent !== window) {
        window.parent.postMessage('gesp:close-ai-assistant', window.location.origin);
    } else {
        window.location.assign(import.meta.env.BASE_URL);
    }
}

createRoot(document.getElementById('root')).render(
    <>
        <div className="fixed inset-0" onClick={closeAssistant} aria-hidden="true" />
        <AIChat standalone onClose={closeAssistant} />
    </>,
);
