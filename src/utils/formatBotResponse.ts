

export const formatBotResponse = (text: string): string => {
    return (
        text
            // Remove markdown bold syntax - make it non-greedy
            .replace(/\*\*(.*?)\*\*/g, '$1')
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
