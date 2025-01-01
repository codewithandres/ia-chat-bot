export const getEmoji = (name: string): string | undefined => {
    const emojiMap: Record<string, string> = {
        smile: '😊',
        thumbsup: '👍',
        heart: '❤️',
        // Add more emoji mappings as needed
    };
    return emojiMap[name];
};
