import type { IFrame } from '@stomp/stompjs';
import type { AppDispatch } from '~/app/store';
import { addMessage } from '~/features/chat/chatSlice';
import stompClient from '~/services/socket/socket.service';
import type { Message } from '~/types/chat';

const OnNewMessage = ({
    conversationId,
    dispatch,
}: {
    conversationId: string;
    dispatch: AppDispatch;
}) =>
    stompClient.subscribe(
        `/topic/conversation/${conversationId}`,
        (message: IFrame) => {
            if (message.body) {
                const receivedMessage: Message = JSON.parse(message.body);
                if (receivedMessage.conversationId === conversationId) {
                    dispatch(
                        addMessage({
                            conversationId: conversationId,
                            message: {
                                id: receivedMessage.id || `${Date.now()}`,
                                sender: receivedMessage.sender,
                                content: receivedMessage.content,
                                timestamp:
                                    receivedMessage.timestamp ||
                                    new Date().toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }),
                            },
                        }),
                    );
                }
            }
        },
    );

export { OnNewMessage };
