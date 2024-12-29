import { generateBotResponse } from '../services/getResponseBot';

export const renderBotResponse = async (
    element: HTMLElement
): Promise<void> => {
    const messageElement =
        element.querySelector<HTMLDivElement>('.message-text');
    try {
        const botResponse = await generateBotResponse();

        messageElement!.textContent = botResponse;
    } catch (error: any) {
        messageElement!.textContent = ` Sorry, I encountered an error. Please try again ${error.message};`;
        messageElement!.style.color = '#ff0000';
    } finally {
        element.classList.remove('thinking');

        const chatBody = document.querySelector(
            ' .chat-body '
        ) as HTMLDivElement;

        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    }
};
