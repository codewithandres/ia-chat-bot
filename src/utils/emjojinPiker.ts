import type { EmojinPikerOptionType, EmojinMArtType } from '../interfaces';

export const EmojinPikerOption = (
    messageInput: HTMLTextAreaElement
): EmojinPikerOptionType => {
    return {
        theme: 'light',
        skinTonePosition: 'none',
        previewPosition: 'none',
        onEmojiSelect: (emoji: EmojinMArtType) => {
            messageInput.value += emoji.native;
            messageInput.focus();
        },
        onClickOutside: ({ target }: MouseEvent) => {
            (target as HTMLElement).closest('#emoji-mart')?.id === 'emoji-mart'
                ? document.body.classList.toggle('show-emoji-picker')
                : document.body.classList.remove('show-emoji-picker');
        },
    };
};
