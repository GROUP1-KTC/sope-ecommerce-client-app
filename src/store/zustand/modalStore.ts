import { create } from 'zustand';
import type { AlertColor } from '@mui/material';

type ModalType = 'confirm' | 'info' | 'custom';

interface ModalState {
    open: boolean;
    type?: ModalType;
    severity: AlertColor;
    message: string;
    onConfirm?: () => void;
    showModal: (payload: {
        type?: ModalType;
        severity: AlertColor;
        message: string;
        onConfirm?: () => void;
    }) => void;
    closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
    open: false,
    type: 'info',
    severity: 'success',
    message: '',
    onConfirm: undefined,
    showModal: ({ type, severity, message, onConfirm }) =>
        set({
            open: true,
            type,
            severity,
            message,
            onConfirm,
        }),
    closeModal: () =>
        set({
            open: false,
        }),
}));
