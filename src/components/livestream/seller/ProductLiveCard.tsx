'use client';
import React, { useState, useEffect } from 'react';
import { SellerLiveProduct } from '~/types/products';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PushPinIcon from '@mui/icons-material/PushPin';
import CloseIcon from '@mui/icons-material/Close';

type FlashSaleData = {
  price: number;
  qty: number;
  endTime: number; // timestamp
};

type ProductLiveCardProps = {
  product: SellerLiveProduct;
  onPinAction: (id: number) => void;
  pinnedId?: number;
};

export function ProductLiveCard({ product, onPinAction, pinnedId }: ProductLiveCardProps) {
  const [showFlashModal, setShowFlashModal] = useState(false);
  const [flashData, setFlashData] = useState<FlashSaleData | null>(null);
  const [countdown, setCountdown] = useState<string>("");

  const isPinned = pinnedId === product.id;

  // countdown update
  useEffect(() => {
    if (!flashData) return;
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = flashData.endTime - now;
      if (diff <= 0) {
        setFlashData(null);
        clearInterval(timer);
      } else {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setCountdown(`${mins}m ${secs}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [flashData]);

  // modal state
  const [flashPrice, setFlashPrice] = useState(product.price);
  const [flashQty, setFlashQty] = useState(1);
  const [flashDuration, setFlashDuration] = useState(30);

  const handleStartFlashSale = () => {
    setFlashData({
      price: flashPrice,
      qty: flashQty,
      endTime: Date.now() + flashDuration * 60 * 1000,
    });
    setShowFlashModal(false);
  };

  const handleEndFlashSale = () => {
    setFlashData(null);
  };

  return (
    <div className="flex items-center bg-white rounded-lg shadow p-2 gap-4 relative">
      {/* Image */}
      <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 relative">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        {isPinned && (
          <div className="absolute top-1 right-1 bg-yellow-500 text-white p-1 rounded-lg shadow">
            <PushPinIcon fontSize="small" />
          </div>
        )}
        {flashData && (
          <div className="absolute bottom-1 left-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded">
            Flash Sale
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col gap-2 text-sm">
        <div>
          <h4 className="font-semibold">{product.name}</h4>
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-bold">{product.price.toLocaleString('vi-VN')}₫</span>
            {product.originalPrice > product.price && (
              <span className="line-through text-gray-400">{product.originalPrice.toLocaleString('vi-VN')}₫</span>
            )}
          </div>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>Đã bán: {product.sold}</span>
            <span>Tồn kho: {product.stock}</span>
          </div>
        </div>

        {/* Thông tin Flash Sale */}
        {flashData && (
          <div className="bg-red-50 border border-red-200 rounded p-2 text-xs relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold text-red-600">
                <FlashOnIcon fontSize="small" /> Đang Flash Sale!
              </div>
              <button
                onClick={handleEndFlashSale}
                className="text-gray-500 hover:text-red-600 transition cursor-pointer text-red-400 font-semibold text-md"
                title="Kết thúc Flash Sale"
              >
                Kết thúc
              </button>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-red-600 font-bold">{flashData.price.toLocaleString('vi-VN')}₫</span>
              <span className="line-through text-gray-400">{product.price.toLocaleString('vi-VN')}₫</span>
            </div>
            <div className="flex justify-between mt-1 text-gray-600">
              <span>Còn: {flashData.qty}</span>
              <span>Kết thúc trong: {countdown}</span>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-1 text-xs">
        <button
          onClick={() => setShowFlashModal(true)}
          className="flex items-center gap-1 bg-red-400 px-2 py-1 rounded text-white cursor-pointer hover:bg-red-600 transition"
        >
          <FlashOnIcon fontSize="small" /> Flash Sale
        </button>

        <button
          onClick={() => onPinAction(product.id)}
          className={`flex items-center gap-1 px-2 py-1 rounded text-white cursor-pointer hover:bg-blue-600 transition ${isPinned ? 'bg-gray-500' : 'bg-blue-400'
            }`}
        >
          <PushPinIcon fontSize="small" /> {isPinned ? 'Unpin' : 'Pin Live'}
        </button>
      </div>

      {/* Flash Sale Modal */}
      {showFlashModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 animate-scaleIn">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-red-600 font-bold text-gray-800 flex items-center gap-2">
                Flash Sale: <span className="text-black">{product.name}</span>
              </h3>
              <button
                onClick={() => setShowFlashModal(false)}
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
                  max={product.stock}
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
                onClick={() => setShowFlashModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition cursor-pointer"
              >
                Hủy
              </button>
              <button
                onClick={handleStartFlashSale}
                className="px-4 py-2 rounded-lg bg-red-400 text-white cursor-pointer shadow hover:bg-red-600 transition"
              >
                Bắt đầu
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
