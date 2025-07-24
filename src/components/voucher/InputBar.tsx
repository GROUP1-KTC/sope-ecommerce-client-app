'use client';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CheckCircleIcon } from 'lucide-react';
import React, { useEffect } from 'react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  const [openModal, setOpenModal] = React.useState(false);

  const handleSave = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (openModal) {
      const timer = setTimeout(() => {
        setOpenModal(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [openModal]);

  return (

    <div className="bg-gray-100 px-6 py-6 rounded-xl shadow-lg mb-2">
      <div className="flex items-center justify-center gap-4">
        <label className="text-gray-700 font-medium">Nhập Mã Voucher</label>
        <div className="flex-1 relative max-w-md">
          <input
            type="text"
            placeholder="Nhập mã voucher của bạn..."
            className="w-full p-3 pl-10 border bg-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>
        <button className="cursor-pointer bg-red-500 text-white px-8 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200 font-semibold"
          onClick={handleSave}>
          Lưu
        </button>
      </div>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
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
            <p className="text-gray-800 text-lg font-semibold">Đã thêm thành công</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchBar;