export interface UserData {
    message: string;
    isLoader: boolean;
    file: {
        data: string;
        mime_type: string;
    };
}
