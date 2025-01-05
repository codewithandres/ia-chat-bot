import { generateBotResponse } from '../services/getResponseBot';
import { userData } from '../utils/userData';

export const renderBotResponse = async (element: HTMLElement): Promise<void> => {
    const messageElement = element.querySelector<HTMLDivElement>('.message-text');

    if (!messageElement) return;

    try {
        const botResponse = await generateBotResponse();

        messageElement.textContent = botResponse;
    } catch (error: any) {
        messageElement.style.color = '#ff0000';
    } finally {
        userData.file = { data: '', mime_type: '' };
        element.classList.remove('thinking');

        const chatBody = document.querySelector(' .chat-body ') as HTMLDivElement;

        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    }
};
