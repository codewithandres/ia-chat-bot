export interface UserData {
    message: string;
    isLoader: boolean;
    file: {
        data: string;
        mime_type: string;
    };
}
export interface EmojinPikerOptionType {
    theme: string;
    skinTonePosition: string;
    previewPosition: string;
    onEmojiSelect: (emoji: EmojinMArtType) => void;
    onClickOutside: ({ target }: MouseEvent) => void;
}
export type EmojinMArtType = EmojiMart.Emoji;
