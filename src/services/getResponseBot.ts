// Import required types and utilities
import { chatHistory } from '../constants';
import type { ApiResponse } from '../interfaces/ApiResponse';
import { formatBotResponse } from '../utils/formatBotResponse';
import { userData } from '../utils/userData';
import { API_URL } from './api';

export const generateBotResponse = async (): Promise<string> => {
    // Add user message to chat history
    chatHistory.add({
        role: 'user',
        parts: [
            { text: userData.message }, // Add user's text message
            ...(userData.file.data ? [{ inline_data: userData.file }] : []), // Add file data if it exists
        ],
    });

    // Configure HTTP request options
    const resquestOption: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [Array.from(chatHistory.values())], // Send entire chat history with request
        }),
    };

    try {
        // Make API request
        const response = await fetch(API_URL, resquestOption);
        const data: ApiResponse = await response.json();

        // Validate response data
        if (!data || !data.candidates || data.candidates.length === 0)
            throw new Error('No valid response data found');

        if (!data) throw new Error('No data found');
        if (!response.ok) throw new Error('Network response was not ok');

        // Extract and format the bot's response text
        const botResponse = formatBotResponse(
            data.candidates[0].content.parts[0].text
        );
        console.log(botResponse);

        // Add bot response to chat history
        chatHistory.add({
            role: 'model',
            parts: [{ text: botResponse }],
        });

        // Return the bot's response
        return botResponse;
    } catch (error) {
        // Handle and log any errors
        console.error('Error generating bot response:', error);
        throw error;
    }
};
