'use client';

import React from 'react';
import type { ProductSummary } from '~/types/products/product';
import CollapseProductCard from './CollapseProductCart';

import CloseIcon from '@mui/icons-material/Close';

interface CartModalProps {
    products: ProductSummary[];
    onClose: () => void;
}

const CartModal = ({ products, onClose }: CartModalProps) => {
    return (
        <div className="absolute bottom-0 left-20 w-100 h-[70vh] bg-white shadow-lg rounded-lg border border-gray-200 z-50">
            <div className="flex justify-between items-center p-3 border-b border-gray-300">
                <h3 className="font-bold text-lg">Giỏ hàng</h3>
                <button
                    onClick={onClose}
                    className="text-red-500 font-bold cursor-pointer hover:scale-110 transition"
                >
                    <CloseIcon />
                </button>
            </div>

            <div
                className="max-h-[calc(70vh-64px)] p-2 flex flex-col gap-3 overflow-y-auto "
                style={{ scrollbarWidth: 'none' }}
            >
                {products.map((p) => (
                    <CollapseProductCard key={p.productId} product={p} />
                ))}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-gray-300 to-transparent pointer-events-none rounded-b-lg"></div>
        </div>
    );
};

export default CartModal;
