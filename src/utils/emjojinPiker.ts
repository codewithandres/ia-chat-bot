import type { EmojinPikerOptionType } from '../interfaces';

export const EmojinPikerOption = (
    messageInput: HTMLTextAreaElement
): EmojinPikerOptionType => ({
    theme: 'light',
    skinTonePosition: 'none',
    previewPosition: 'none',
    onEmojiSelect: emoji => {
        messageInput.value += emoji.native;
        messageInput.focus();
    },
    onClickOutside: ({ target }: MouseEvent) => {
        (target as HTMLElement).closest('#emoji-mart')?.id === 'emoji-mart'
            ? document.body.classList.toggle('show-emoji-picker')
            : document.body.classList.remove('show-emoji-picker');
    },
});
