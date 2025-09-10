import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const SOCKET_URL =
    process.env.NEXT_PUBLIC_SOCKET_BASE_URL || 'http://localhost:8082/ws';

const stompClient = new Client({
    webSocketFactory: () => new SockJS(SOCKET_URL),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
    debug: (str) => {
        console.log('[WebSocket Debug]', str);
    },
});

// Promise to track connection status
let connectionPromise: Promise<void> | null = null;
let resolveConnection: () => void;
let rejectConnection: (error: Error) => void;

export const connectSocket = (): Promise<void> => {
    if (stompClient.connected) {
        console.log('✅ WebSocket already connected');
        return Promise.resolve();
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = new Promise((resolve, reject) => {
        resolveConnection = resolve;
        rejectConnection = reject;

        stompClient.onConnect = () => {
            console.log('✅ WebSocket connected');
            resolveConnection();
        };

        stompClient.onStompError = (frame) => {
            console.error('❌ STOMP Error:', frame);
            rejectConnection(new Error(`STOMP Error: ${frame.body}`));
        };

        stompClient.onWebSocketError = (error) => {
            console.error('❌ WebSocket Error:', error);
            rejectConnection(new Error('WebSocket connection failed'));
        };

        stompClient.onDisconnect = () => {
            console.log('❌ WebSocket disconnected');
            connectionPromise = null;
        };

        stompClient.activate();
    });

    return connectionPromise;
};

export const disconnectSocket = () => {
    if (stompClient.connected) {
        stompClient.deactivate();
        console.log('🔌 WebSocket disconnect initiated');
    }
};

export default stompClient;
