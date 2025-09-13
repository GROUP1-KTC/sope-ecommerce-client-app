'use client';

import React from 'react';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string | string[];
}

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, title = 'Có lỗi xảy ra', message }) => {
  if (!isOpen) return null;

  const messages = Array.isArray(message) ? message : [message];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg w-[80%] max-w-full p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <div className="mb-6 space-y-2 text-red-600">
          {messages.map((msg, idx) => (
            <p key={idx}>{msg}</p>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
