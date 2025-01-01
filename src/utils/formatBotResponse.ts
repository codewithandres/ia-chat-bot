import { getEmoji } from './getEmoji';

export const formatBotResponse = (text: string): string => {
    return (
        text
            // Remove markdown bold syntax
            .replace(/\*\*(.*?)\*\*/g, '$1')
            // Convert markdown links to styled text
            .replace(/\[(.*?)\]\((.*?)\)/g, '$1')
            // Add emoji support
            .replace(/:([a-z_]+):/g, (match, emoji) => getEmoji(emoji) || match)
            // Format code blocks with proper spacing
            .replace(/```(.*?)```/gs, '\n$1\n')
            // Format inline code
            .replace(/`(.*?)`/g, '$1')
            // Add proper spacing after periods
            .replace(/\.(?=[A-Z])/g, '. ')
            // Remove extra whitespace
            .replace(/\s+/g, ' ')
            // Remove leading/trailing whitespace
            .trim()
    );
};
