import { create } from 'zustand';
import type { AlertColor } from '@mui/material';

interface AlertState {
    open: boolean;
    severity: AlertColor;
    message: string;
    showAlert: (payload: { severity: AlertColor; message: string }) => void;
    closeAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
    open: false,
    severity: 'success',
    message: '',
    showAlert: ({ severity, message }) =>
        set({
            open: true,
            severity,
            message,
        }),
    closeAlert: () =>
        set({
            open: false,
        }),
}));
