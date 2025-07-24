'use client';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Alert,
    Typography,
} from '@mui/material';
import { useModalStore } from '~/store/zustand/modalStore';

const GlobalModal = () => {
    const { open, type, severity, message, closeModal, onConfirm } =
        useModalStore();

    const handleConfirm = () => {
        if (onConfirm) onConfirm();
        closeModal();
    };

    return (
        <Dialog open={open} onClose={closeModal} maxWidth="xs" fullWidth>
            <DialogTitle>
                {type === 'confirm'
                    ? 'Xác nhận'
                    : type === 'info'
                      ? 'Thông báo'
                      : 'Tùy chỉnh'}
            </DialogTitle>
            <DialogContent>
                <Alert severity={severity} sx={{ mb: 2 }}>
                    <Typography>{message}</Typography>
                </Alert>
                {type === 'custom' && (
                    <Typography variant="body2" color="text.secondary">
                        Đây là vùng custom, bạn có thể render bất cứ nội dung gì
                        ở đây nếu mở rộng thêm.
                    </Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="secondary">
                    Đóng
                </Button>
                {type === 'confirm' && (
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Xác nhận
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default GlobalModal;
