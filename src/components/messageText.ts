import type { UserData } from '../interfaces';

export const MessageContent = ({ isLoader }: UserData): string => {
    isLoader = true;

    if (isLoader) {
        return ` 
            <i class="ri-robot-2-line bot-avatar"></i>
            <div class="message-text">
                <div class="thinking-indicator">
                <div class="dot"></div>
                <div class="dot"></div>
                <div class="dot"></div>
            </div>`;
    } else {
        return `<div class="message-text"> </div>`;
    }
};
