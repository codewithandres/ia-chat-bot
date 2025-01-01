import { ComponetDot } from './components/Dot';
import { MessageContent } from './components/messageText';
import type { EmojinPikerOptionType } from './interfaces';
import { renderBotResponse } from './screens/renderBotResponse';

import './styles/index.css';
import { createMessageElement } from './utils/createMessage';
import { EmojinPikerOption } from './utils/emjojinPiker';
import { userData } from './utils/userData';

const messageInput = document.querySelector(
    ' .message-input '
) as HTMLTextAreaElement;
const chatBody = document.querySelector(' .chat-body ') as HTMLDivElement;
const senMessageButton = document.querySelector(
    ' .send-message '
) as HTMLButtonElement;
const fileInput = document.querySelector(' #file-input ') as HTMLInputElement;
const filePreviwImage = document.querySelector(
    ' .file-upload-wrapper '
) as HTMLDivElement;
const fileCancelUpload = document.querySelector(
    '#file-cancel'
) as HTMLButtonElement;

const chatBotToggle = document.querySelector(
    '.chat-bot-toogle'
) as HTMLButtonElement;

const chatBotClose = document.querySelector(
    '.button-close'
) as HTMLButtonElement;

// handle outgoin user messages
const handleOutgoinMessage = (event: KeyboardEvent | MouseEvent): void => {
    event.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = '';
    filePreviwImage.classList.remove('file-uploaded');

    // crete and display user message
    const messageContent: string = MessageContent(userData);

    const outopigMessageDiv: ReturnType<typeof createMessageElement> =
        createMessageElement(messageContent, 'user-message');

    outopigMessageDiv.div.querySelector(' .message-text ')!.textContent =
        userData.message;

    chatBody.appendChild(outopigMessageDiv.div);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    // simulate bot response white thinking after delay
    setTimeout(() => {
        const messageContent: string = ComponetDot();

        const incominggMessageDiv: ReturnType<typeof createMessageElement> =
            createMessageElement(messageContent, 'bot-message', 'thinking');

        chatBody.appendChild(incominggMessageDiv.div);

        renderBotResponse(incominggMessageDiv.div);
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    }, 1000);
};

// handle enter key press for sending message
messageInput?.addEventListener('keydown', event => {
    const userMessage: string = (
        event.target as HTMLTextAreaElement
    ).value.trim();

    if (event.key === 'Enter' && userMessage) handleOutgoinMessage(event);
});

// handle file input change
fileInput.addEventListener('change', () => {
    const file: File = fileInput.files![0];

    if (!file) return;

    const reader: FileReader = new FileReader();

    reader.onload = ({ target }) => {
        (filePreviwImage.children[1] as HTMLImageElement).src =
            target?.result as string;

        filePreviwImage.classList.add('file-uploaded');

        const base64String: string = (target?.result as string).split(',')[1];

        // store file data in UserData
        userData.file = {
            data: base64String,
            mime_type: file.type,
        };

        fileInput.value = '';
    };
    reader.readAsDataURL(file);
});

fileCancelUpload.addEventListener('click', () => {
    userData.file = { data: '', mime_type: '' };
    filePreviwImage.classList.remove('file-uploaded');
});

senMessageButton.addEventListener('click', event =>
    handleOutgoinMessage(event)
);

const pickerOptions: EmojinPikerOptionType = EmojinPikerOption(messageInput);
const picker = new EmojiMart.Picker(pickerOptions);

document.querySelector<HTMLDivElement>('.chat-form')?.appendChild(picker);

document
    .querySelector<HTMLButtonElement>('#file-upload')
    ?.addEventListener('click', () => {
        fileInput.click();
    });

chatBotToggle.addEventListener('click', () =>
    document.body.classList.toggle('show-chatBot')
);

chatBotClose.addEventListener('click', () =>
    document.body.classList.remove('show-chatBot')
);
