import axios from 'axios';

export const sendMessageToBot = async (message: string) => {
    const response = await axios.post('/api/chatbot', { message });
    return response.data.reply as string;
};
