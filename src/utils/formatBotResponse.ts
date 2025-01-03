import { getEmoji } from './getEmoji';

export const formatBotResponse = (text: string): string => {
    console.log(text);

    return (
        text
            // Remove markdown bold syntax - make it non-greedy
            .replace(/\*\*(.*?)\*\*/g, '$1')
            // Add emoji support - improved pattern
            .replace(/:([\w_+-]+):/g, (match, emoji) => getEmoji(emoji) || match)
            // Format code blocks - improved multiline handling
            .replace(/```[\s\S]*?```/g, match => `\n${match.slice(3, -3).trim()}\n`)
            // Format inline code - make it non-greedy
            .replace(/`(.*?)`/g, '$1')
            // Add proper spacing after periods
            .replace(/\.(?=\S)/g, '. ')
            // Remove multiple spaces
            .replace(/\s{2,}/g, ' ')
            // Trim whitespace
            .trim()
    );
};
