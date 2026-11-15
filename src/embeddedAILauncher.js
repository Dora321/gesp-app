import cornerStyles from './components/AIChatCorner.css?inline';

const host = document.createElement('div');
const shadow = host.attachShadow({ mode: 'open' });
const styles = document.createElement('style');
styles.textContent = `${cornerStyles}
    .mw-ai-corner { z-index: 2147483645; }
    .mw-ai-corner[hidden] { display: none; }
    .mw-ai-corner-button { font: 700 13px system-ui, sans-serif; }
    iframe { position: fixed; z-index: 2147483646; inset: 0; width: 100%; height: 100%; border: 0; }
`;
const corner = document.createElement('div');
corner.className = 'mw-ai-corner';
const button = document.createElement('button');
button.type = 'button';
button.className = 'mw-ai-corner-button';
button.textContent = 'AI';
button.title = 'AI 问答助手';
button.setAttribute('aria-label', '打开 AI 问答助手');
button.setAttribute('aria-haspopup', 'dialog');
button.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') event.stopPropagation();
});
corner.append(button);
shadow.append(styles, corner);

let panel;
function closeAssistant(restoreFocus = false) {
    if (!panel) return;
    panel.remove();
    panel = undefined;
    corner.hidden = false;
    if (restoreFocus) button.focus();
}

button.addEventListener('click', () => {
    if (panel) return;
    panel = document.createElement('iframe');
    panel.title = 'AI 问答助手';
    panel.src = `${import.meta.env.BASE_URL}ai-assistant.html`;
    corner.hidden = true;
    shadow.append(panel);
    panel.focus();
});

window.addEventListener('message', event => {
    if (event.origin === window.location.origin && event.source === panel?.contentWindow && event.data === 'gesp:close-ai-assistant') {
        closeAssistant(true);
    }
});

function mountCorner() {
    const fullscreen = document.fullscreenElement;
    // A course in the site's viewer already has the parent launch button.
    if (window !== window.top && !fullscreen) {
        closeAssistant();
        host.remove();
        return;
    }
    const target = fullscreen || document.body;
    if (host.parentElement !== target) target.append(host);
}

document.addEventListener('fullscreenchange', mountCorner);
mountCorner();
