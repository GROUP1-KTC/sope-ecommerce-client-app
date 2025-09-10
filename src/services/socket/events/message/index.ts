import type { IFrame } from '@stomp/stompjs';
import type { AppDispatch } from '~/store/appStore';
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

                dispatch(
                    addMessage({
                        conversationId: conversationId,
                        message: {
                            id: receivedMessage.id || `${Date.now()}`,
                            senderId: receivedMessage.senderId,
                            type: receivedMessage.type,
                            content: receivedMessage.content,
                            imageUrl: receivedMessage.imageUrl || null,
                            width: receivedMessage.width || null,
                            height: receivedMessage.height || null,
                            fileUrl: receivedMessage.fileUrl || null,
                            fileName: receivedMessage.fileName || null,
                            fileType: receivedMessage.fileType || null,
                            fileSize: receivedMessage.fileSize || null,
                            sentAt: receivedMessage.sentAt || new Date().toISOString(),
                        },
                    }),
                );
            }
        },
    );

export { OnNewMessage };
