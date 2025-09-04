'use client';

import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { Address } from '~/types/address';   

const AddressCard = ({
  address,
  onSetDefault,
  onDelete,
}: {
  address: Address;
  onSetDefault: (id: string) => void;
  onDelete: (id: string) => void;
}) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(address.id);
    setOpenDeleteModal(false);
    setOpenSuccessModal(true);
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
    <div className="p-4 bg-white border-1 border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition">
      <div className="flex items-center justify-between mb-3">
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
        <button
          className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer"
          onClick={() => setOpenDeleteModal(true)}
        >
          Xóa
        </button>
      </div>
      <div className="text-gray-700 font-semibold mb-1">
        {address.recipientName}
      </div>
      <div className="text-sm text-gray-500 mb-1">SĐT: {address.phoneNumber}</div>
      <div className="text-sm text-gray-500">
        {`${address.street}, ${address.ward}, ${address.district}, ${address.city}, ${address.country}`}
      </div>

      {/* Modal confirm + success giữ nguyên */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogContent>
          <div className="flex items-center gap-3">
            <WarningIcon className="text-orange-500 w-8 h-8" />
            <p className="text-gray-800 text-lg font-semibold">
              Bạn có chắc chắn muốn xóa địa chỉ này không?
            </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)}>Hủy</Button>
          <Button onClick={handleConfirmDelete} color="error">Xóa</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openSuccessModal} onClose={() => setOpenSuccessModal(false)}>
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
