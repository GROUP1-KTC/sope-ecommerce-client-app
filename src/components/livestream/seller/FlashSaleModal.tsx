'use client';
import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

type FlashSaleModalProps = {
  productName: string;
  stock: number;
  defaultPrice: number;
  show: boolean;
  onCloseAction: () => void;
  onStartAction: (price: number, qty: number, duration: number) => void;
};

export function FlashSaleModal({
  productName,
  stock,
  defaultPrice,
  show,
  onCloseAction,
  onStartAction,
}: FlashSaleModalProps) {
  const [flashPrice, setFlashPrice] = useState(defaultPrice);
  const [flashQty, setFlashQty] = useState(1);
  const [flashDuration, setFlashDuration] = useState(30);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 animate-scaleIn">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg text-red-600 font-bold text-gray-800 flex items-center gap-2">
            Flash Sale: <span className="text-black">{productName}</span>
          </h3>
          <button
            onClick={onCloseAction}
            className="text-gray-400 hover:text-red-500 transition cursor-pointer"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Inputs */}
        <div className="space-y-3 text-sm">
          <label className="flex flex-col">
            <span className="mb-1 font-medium text-gray-700">Giá mới</span>
            <input
              type="number"
              min={0}
              value={flashPrice}
              onChange={(e) => setFlashPrice(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium text-gray-700">Số lượng</span>
            <input
              type="number"
              min={1}
              max={stock}
              value={flashQty}
              onChange={(e) => setFlashQty(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </label>

          <label className="flex flex-col">
            <span className="mb-1 font-medium text-gray-700">Thời gian (phút)</span>
            <input
              type="number"
              min={5}
              max={120}
              value={flashDuration}
              onChange={(e) => setFlashDuration(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onCloseAction}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
          >
            Hủy
          </button>
          <button
            onClick={() => onStartAction(flashPrice, flashQty, flashDuration)}
            className="px-4 py-2 rounded-lg bg-red-400 text-white cursor-pointer shadow hover:bg-red-600 transition"
          >
            Bắt đầu
          </button>
        </div>
      </div>
    </div>
  );
}
