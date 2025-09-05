'use client';

import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { PaymentCard } from '~/types/payment';

const PaymentCardItem = ({
    card,
    onDelete,
}: {
    card: PaymentCard;
    onDelete: (id: string) => void;
}) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);

    const handleOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    const handleConfirmDelete = () => {
        onDelete(card.id);
        setOpenDeleteModal(false);
        setOpenSuccessModal(true);
    };

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
    };

    useEffect(() => {
        if (openSuccessModal) {
            const timer = setTimeout(() => {
                setOpenSuccessModal(false);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [openSuccessModal]);

    return (
        <div className="p-4 bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                    <p>{card.cardType}</p>
                </div>
                <button
                    className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
                    onClick={handleOpenDeleteModal}
                >
                    Xóa
                </button>
            </div>
            <div className="text-gray-700 font-semibold mb-1">
                {card.cardHolderName}
            </div>
            <div className="text-sm text-gray-500 mb-1">
                Số thẻ: **** **** **** {card.last4Digits}
            </div>
            <div className="text-sm text-gray-500">
                Hết hạn: {card.expiryDate}
            </div>
            {/* Modal xác nhận xóa */}
            <Dialog
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        padding: '40px',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                        background:
                            'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                        border: '1px solid #e5e7eb',
                    },
                }}
            >
                <DialogContent>
                    <div className="flex items-center gap-3">
                        <WarningIcon className="text-orange-500 w-8 h-8" />
                        <p className="text-gray-800 text-lg font-semibold">
                            Bạn có chắc chắn muốn xóa thẻ này không?
                        </p>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDeleteModal}
                        sx={{
                            backgroundColor: '#6b7280',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#4b5563' },
                            textTransform: 'none',
                            fontWeight: 500,
                            padding: '6px 16px',
                            borderRadius: '6px',
                            marginRight: '8px',
                        }}
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        sx={{
                            backgroundColor: '#ef4444',
                            color: '#fff',
                            '&:hover': { backgroundColor: '#dc2626' },
                            textTransform: 'none',
                            fontWeight: 500,
                            padding: '6px 16px',
                            borderRadius: '6px',
                        }}
                    >
                        Xóa
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Modal thông báo thành công */}
            <Dialog
                open={openSuccessModal}
                onClose={handleCloseSuccessModal}
                PaperProps={{
                    style: {
                        borderRadius: '12px',
                        padding: '40px',
                        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
                        background:
                            'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                        border: '1px solid #e5e7eb',
                    },
                }}
            >
                <DialogContent>
                    <div className="flex items-center gap-3">
                        <CheckCircleIcon className="text-green-500 w-8 h-8" />
                        <p className="text-gray-800 text-lg font-semibold">
                            Đã xóa thành công
                        </p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PaymentCardItem;
