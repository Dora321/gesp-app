export const CHAT_IMAGE_LIMIT = 900_000;
export const CHAT_IMAGE_HISTORY_LIMIT = 2;
export const CHAT_IMAGE_INPUT_TYPES = 'image/jpeg,image/png,image/webp';

const jpegDataUrl = /^data:image\/jpeg;base64,\/9j\/[A-Za-z0-9+/]*={0,2}$/;

export function isChatImage(value) {
    return typeof value === 'string' && value.length <= CHAT_IMAGE_LIMIT
        && jpegDataUrl.test(value) && (value.length - 'data:image/jpeg;base64,'.length) % 4 === 0;
}

export function keepRecentChatImages(messages, limit = CHAT_IMAGE_HISTORY_LIMIT) {
    let remaining = limit;
    const result = [];
    for (let index = messages.length - 1; index >= 0; index--) {
        const { image, ...message } = messages[index];
        if (remaining > 0 && message.role === 'user' && isChatImage(image)) {
            message.image = image;
            remaining--;
        }
        result.push(message);
    }
    return result.reverse();
}

export function toModelMessages(messages) {
    return messages.map(({ role, content, image }) => ({
        role,
        content: image ? [
            { type: 'text', text: content },
            { type: 'image_url', image_url: { url: image } },
        ] : content,
    }));
}

export async function prepareChatImage(file) {
    if (!CHAT_IMAGE_INPUT_TYPES.split(',').includes(file.type)) throw new Error('请选择 JPG、PNG 或 WebP 图片。');
    if (file.size > 10 * 1024 * 1024) throw new Error('图片最大支持 10 MB，请缩小后再试。');
    const url = URL.createObjectURL(file);
    try {
        const source = new Image();
        source.src = url;
        await source.decode().catch(() => { throw new Error('无法读取这张图片，请检查文件后重试。'); });
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        for (const [longestSide, quality] of [[1920, 0.9], [1440, 0.84], [1080, 0.8]]) {
            const scale = Math.min(1, longestSide / Math.max(source.naturalWidth, source.naturalHeight));
            canvas.width = Math.max(1, Math.round(source.naturalWidth * scale));
            canvas.height = Math.max(1, Math.round(source.naturalHeight * scale));
            context.fillStyle = '#fff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.drawImage(source, 0, 0, canvas.width, canvas.height);
            const image = canvas.toDataURL('image/jpeg', quality);
            if (isChatImage(image)) return image;
        }
        throw new Error('图片压缩后仍然太大，请裁剪后再试。');
    } finally {
        URL.revokeObjectURL(url);
    }
}
