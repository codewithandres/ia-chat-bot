import type { UserData } from '../interfaces';

export const MessageContent = ({ file }: UserData): string => {
    return `
    <div class="message-text" style="white-space: pre-wrap;"></div>
    ${
        file.data &&
        `<img src="data:${file.mime_type};base64,${file.data}" class="attachment" />`
    }`;
};
