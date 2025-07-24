'use client';

import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type Address = {
  id: number;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
};

const AddressCard = ({
  address,
  onSetDefault,
  onDelete,
}: {
  address: Address;
  onSetDefault: (id: number) => void;
  onDelete: (id: number) => void;
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
    // onDelete(address.id);
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
          {address.isDefault ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
              Mặc định
            </span>
          ) : (
            <button
              className="bg-blue-500 text-white text-xs font-medium px-2 py-1 rounded hover:bg-blue-600 transition cursor-pointer"
              onClick={() => onSetDefault(address.id)}
            >
              Đặt làm mặc định
            </button>
          )}
        </div>
        <button
          className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
          onClick={handleOpenDeleteModal}
        >
          Xóa
        </button>
      </div>
      <div className="text-gray-700 font-semibold mb-1">{address.name}</div>
      <div className="text-sm text-gray-500 mb-1">SĐT: {address.phone}</div>
      <div className="text-sm text-gray-500">{address.address}</div>
      {/* Modal xác nhận xóa */}
      <Dialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        PaperProps={{
          style: {
            borderRadius: '12px',
            padding: '40px',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            border: '1px solid #e5e7eb',
          },
        }}
      >
        <DialogContent>
          <div className="flex items-center gap-3">
            <WarningIcon className="text-orange-500 w-8 h-8" />
            <p className="text-gray-800 text-lg font-semibold">
              Bạn có chắc chắn muốn xóa địa chỉ này không?
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
            background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
            border: '1px solid #e5e7eb',
          },
        }}
      >
        <DialogContent>
          <div className="flex items-center gap-3">
            <CheckCircleIcon className="text-green-500 w-8 h-8" />
            <p className="text-gray-800 text-lg font-semibold">Đã xóa thành công</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddressCard;