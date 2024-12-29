import { MessageContent } from './components/messageText';
import './styles/index.css';
import { createMessageElement } from './utils/createMessage';

const messageInput = document.querySelector(
    ' .message-input '
) as HTMLTextAreaElement;
const chatBody = document.querySelector(' .chat-body ') as HTMLDivElement;
const senMessageButton = document.querySelector(
    ' .send-message '
) as HTMLButtonElement;

const userData = {
    message: '',
    isLoader: false,
};

// handle outgoin user messages
const handleOutgoinMessage = (event: KeyboardEvent | MouseEvent) => {
    event.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = '';

    // crete and display user message
    const messageContent: string = MessageContent((userData.isLoader = false));

    const outopigMessageDiv: ReturnType<typeof createMessageElement> =
        createMessageElement(messageContent, 'user-message');

    outopigMessageDiv.div.querySelector(' .message-text ')!.textContent =
        userData.message;

    chatBody.appendChild(outopigMessageDiv.div);

    // simulate bot response white thinking after delay
    setTimeout(() => {
        const messageContent: string = MessageContent(
            (userData.isLoader = true)
        );

        const incominggMessageDiv: ReturnType<typeof createMessageElement> =
            createMessageElement(messageContent, 'bot-message', 'thinking');

        chatBody.appendChild(incominggMessageDiv.div);
    }, 1000);
};

// handle enter key press for sending message
messageInput?.addEventListener('keydown', event => {
    const userMessage: string = (
        event.target as HTMLTextAreaElement
    ).value.trim();

    if (event.key === 'Enter' && userMessage) handleOutgoinMessage(event);
});

senMessageButton.addEventListener('click', event =>
    handleOutgoinMessage(event)
);
