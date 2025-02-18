export interface ApiResponse {
    candidates: {
        content: {
            parts: {
                text: string;
            }[];
            role: string;
        };
        finishReason: string;
        avgLogprobs: number;
    }[];
    usageMetadata: {
        promptTokenCount: number;
        candidatesTokenCount: number;
        totalTokenCount: number;
    };
    modelVersion: string;
}
