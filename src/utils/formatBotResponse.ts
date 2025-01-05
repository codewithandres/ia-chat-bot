import { getEmoji } from './getEmoji';

export const formatBotResponse = (text: string): string => {
    return (
        text
            // Remove markdown bold syntax - make it non-greedy
            .replace(/\*\*(.*?)\*\*/g, '$1')
            // Add emoji support - improved pattern
            .replace(/:([\w_+-]+):/g, (match, emoji) => getEmoji(emoji) || match)
            // Format code blocks - improved multiline handling
            .replace(/```([\s\S]*?)```/g, (match, code) => `\n\`\`\`${code}\`\`\`\n`)
            // Format inline code - make it non-greedy
            .replace(/`(.*?)`/g, '$1')
            // Add proper spacing after periods
            .replace(/\.(?=\S)/g, '. ')
            // Remove multiple spaces
            .replace(/[^\S\n]+/g, ' ')
            .replace(/\n{3,}/g, '\n\n')
            // Trim whitespace
            .trim()
    );
};
