'use client';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
} from '@mui/material';
import { useState } from 'react';

interface Props {
    open: boolean;
    onClose: () => void;
    onConfirmed?: () => void;
}

export default function ConfirmPasswordDialog({
    open,
    onClose,
    onConfirmed,
}: Props) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleConfirm = async () => {
        // Fake validate (replace with real API call)
        if (password === '123456') {
            document.cookie = 'password_confirmed=true; max-age=600';
            setError(null);
            onClose();
            onConfirmed?.();
        } else {
            setError('Mật khẩu không đúng');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Xác nhận mật khẩu</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Mật khẩu"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!error}
                    helperText={error}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Hủy</Button>
                <Button onClick={handleConfirm} variant="contained">
                    Xác nhận
                </Button>
            </DialogActions>
        </Dialog>
    );
}
