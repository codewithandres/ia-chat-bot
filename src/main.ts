// Import necessary components and interfaces
import { ComponetDot } from './components/Dot'; // Component for displaying typing dots animation
import { MessageContent } from './components/messageText'; // Component for message content
import type { EmojinPikerOptionType } from './interfaces'; // Type definition for emoji picker options
import { renderBotResponse } from './screens/renderBotResponse'; // Function to render bot responses

// Import required styles
import './styles/index.css'; // Main stylesheet
import 'animate.css'; // Animation library

// Import utility functions and data
import { createMessageElement } from './utils/createMessage'; // Helper to create message elements
import { EmojinPikerOption } from './utils/emjojinPiker'; // Emoji picker configuration
import { userData } from './utils/userData'; // User data store

// Get DOM elements and cast them to their proper types
const messageInput = document.querySelector(
    ' .message-input '
) as HTMLTextAreaElement; // Text input field for messages
const chatBody = document.querySelector(' .chat-body ') as HTMLDivElement; // Container for chat messages
const senMessageButton = document.querySelector(
    ' .send-message '
) as HTMLButtonElement; // Send message button
const fileInput = document.querySelector(' #file-input ') as HTMLInputElement; // Hidden file input
const filePreviwImage = document.querySelector(
    ' .file-upload-wrapper '
) as HTMLDivElement; // Container for file preview
const fileCancelUpload = document.querySelector('#file-cancel') as HTMLButtonElement; // Button to cancel file upload

// Chat bot toggle controls
const chatBotToggle = document.querySelector(
    '.chat-bot-toogle'
) as HTMLButtonElement; // Button to show/hide chat
const chatBotClose = document.querySelector('.button-close') as HTMLButtonElement; // Button to close chat

// Main function to handle sending messages
const handleOutgoinMessage = (event: KeyboardEvent | MouseEvent): void => {
    event.preventDefault(); // Prevent default form submission
    userData.message = messageInput.value.trim(); // Get and trim message text
    messageInput.value = ''; // Clear input field
    filePreviwImage.classList.remove('file-uploaded'); // Remove file preview if any

    // Create message content using the MessageContent component
    const messageContent: string = MessageContent(userData);

    // Create a new message element for the user's message
    const outopigMessageDiv: ReturnType<typeof createMessageElement> =
        createMessageElement(
            messageContent,
            'user-message',
            'animate__bounceInRight'
        );

    // Set the message text content
    outopigMessageDiv.div.querySelector(' .message-text ')!.textContent =
        userData.message;

    // Add message to chat and scroll to bottom
    chatBody.appendChild(outopigMessageDiv.div);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    // Add bot response after a delay
    setTimeout(() => {
        const messageContent: string = ComponetDot(); // Create typing indicator

        // Create message element for bot response
        const incominggMessageDiv: ReturnType<typeof createMessageElement> =
            createMessageElement(messageContent, 'bot-message', 'thinking');

        chatBody.appendChild(incominggMessageDiv.div);

        renderBotResponse(incominggMessageDiv.div); // Render actual bot response
        chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    }, 1000);
};

// Event listener for Enter key to send message
messageInput?.addEventListener('keydown', event => {
    const userMessage: string = (event.target as HTMLTextAreaElement).value.trim();

    if (event.key === 'Enter' && userMessage) handleOutgoinMessage(event);
});

// Handle file upload
fileInput.addEventListener('change', () => {
    const file: File = fileInput.files![0]; // Get selected file

    if (!file) return;

    const reader: FileReader = new FileReader();

    // When file is loaded
    reader.onload = ({ target }) => {
        // Set preview image source
        (filePreviwImage.children[1] as HTMLImageElement).src =
            target?.result as string;

        filePreviwImage.classList.add('file-uploaded'); // Show preview

        // Convert file to base64 string
        const base64String: string = (target?.result as string).split(',')[1];

        // Store file data
        userData.file = {
            data: base64String,
            mime_type: file.type,
        };

        fileInput.value = ''; // Clear file input
    };
    reader.readAsDataURL(file); // Read file as data URL
});

// Handle canceling file upload
fileCancelUpload.addEventListener('click', () => {
    userData.file = { data: '', mime_type: '' }; // Clear file data
    filePreviwImage.classList.remove('file-uploaded'); // Hide preview
});

// Add click handler for send button
senMessageButton.addEventListener('click', event => handleOutgoinMessage(event));

// Initialize emoji picker
const pickerOptions: EmojinPikerOptionType = EmojinPikerOption(messageInput);
const picker = new EmojiMart.Picker(pickerOptions);

// Add emoji picker to chat form
document.querySelector<HTMLDivElement>('.chat-form')?.appendChild(picker);

// Handle file upload button click
document
    .querySelector<HTMLButtonElement>('#file-upload')
    ?.addEventListener('click', () => {
        fileInput.click(); // Trigger hidden file input
    });

// Toggle chat bot visibility
chatBotToggle.addEventListener('click', () => {
    document.body.classList.toggle('show-chatBot');
});

// Close chat bot
chatBotClose.addEventListener('click', () =>
    document.body.classList.remove('show-chatBot')
);
