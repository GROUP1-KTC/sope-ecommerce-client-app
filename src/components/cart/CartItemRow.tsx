import React from 'react';

type CartItem = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
};

interface CartItemRowProps {
    item: CartItem;
    isSelected: boolean;
    handleSelect: (id: number) => void;
    handleDelete: (id: number) => void;
    handleQuantityChange: (id: number, newQuantity: number) => void;
}

const CartItemRow = ({
    item,
    isSelected,
    handleSelect,
    handleDelete,
    handleQuantityChange,
}: CartItemRowProps) => {
    return (
        <tr className="border-b hover:bg-gray-50">
            <td className="py-2">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleSelect(item.id)}
                    className="h-5 w-5"
                />
            </td>
            <td className="flex items-center gap-3 py-2">
                <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-28 m-2 object-cover border rounded"
                    loading="lazy"
                />
                <div className="font-medium line-clamp-2 max-w-xs">
                    {item.name}
                </div>
            </td>
            <td className="py-2">₫{item.price.toLocaleString('vi-VN')}</td>
            <td className="py-2">
                <div className="flex items-center gap-2">
                    <button
                        className="border px-2"
                        onClick={() =>
                            handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                    >
                        -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                        className="border px-2"
                        onClick={() =>
                            handleQuantityChange(item.id, item.quantity + 1)
                        }
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="py-2 text-red-500 font-semibold">
                ₫{(item.price * item.quantity).toLocaleString('vi-VN')}
            </td>
            <td className="py-2">
                <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(item.id)}
                >
                    Xóa
                </button>
            </td>
        </tr>
    );
};

export default CartItemRow;
