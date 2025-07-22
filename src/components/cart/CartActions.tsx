import React from 'react';

interface CartActionsProps {
    cartItems: { id: number }[];
    selected: number[];
    total: number;
    handleSelectAll: () => void;
    handleDeleteSelected: () => void;
    handleSaveToFavorites: () => void;
    handleCheckout: () => void;
}

const CartActions = ({
    cartItems,
    selected,
    total,
    handleSelectAll,
    handleDeleteSelected,
    handleSaveToFavorites,
    handleCheckout,
}: CartActionsProps) => {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 border-t pt-4 gap-4">
            <div className="flex items-center flex-wrap gap-4">
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        checked={
                            selected.length === cartItems.length &&
                            cartItems.length > 0
                        }
                        onChange={handleSelectAll}
                        className="h-5 w-5"
                    />
                    <span className="ml-2">
                        Chọn Tất Cả ({cartItems.length})
                    </span>
                </div>
                <button
                    className="text-gray-500 hover:underline"
                    onClick={handleDeleteSelected}
                >
                    Xóa
                </button>
                <button
                    className="bg-orange-500 text-white px-4 py-2 rounded font-semibold hover:bg-orange-600 whitespace-nowrap"
                    onClick={handleSaveToFavorites}
                >
                    Lưu vào mục Đã thích
                </button>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="text-right">
                    <span className="text-gray-600">
                        Tổng cộng ({selected.length} Sản phẩm):
                    </span>
                    <span className="text-2xl text-red-500 font-bold block md:inline md:ml-2">
                        ₫{total.toLocaleString('vi-VN')}
                    </span>
                </div>
                <button
                    className="bg-orange-500 text-white px-8 py-2 rounded font-semibold hover:bg-orange-600 w-full md:w-auto"
                    onClick={handleCheckout}
                >
                    Mua Hàng
                </button>
            </div>
        </div>
    );
};

export default CartActions;
