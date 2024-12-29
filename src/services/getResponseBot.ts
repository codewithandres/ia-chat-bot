import type { ApiResponse } from '../interfaces/ApiResponse';
import { userData } from '../utils/userData';
import { API_URL } from './api';

export const generateBotResponse = async (): Promise<string> => {
    const resquestOption: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: userData.message,
                        },
                    ],
                },
            ],
        }),
    };

    try {
        const response = await fetch(API_URL, resquestOption);
        const data: ApiResponse = await response.json();

        if (!data || !data.candidates || data.candidates.length === 0)
            throw new Error('No valid response data found');

        console.log(data);

        if (!data) throw new Error('No data found');
        if (!response.ok) throw new Error('Network response was not ok');

        // Extract the bot's response text
        const botResponse = data.candidates[0].content.parts[0].text;

        return botResponse;
    } catch (error) {
        console.error('Error generating bot response:', error);
        throw error;
    }
};
