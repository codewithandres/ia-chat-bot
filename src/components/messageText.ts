export const MessageContent = (isLoader: boolean): string => {
    if (isLoader) {
        return ` 
            <i class="ri-robot-2-line bot-avatar"></i>
            <div class="message-text">
                <div class="thinking-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>`;
    }
    return `<div class="message-text"> </div>`;
};
