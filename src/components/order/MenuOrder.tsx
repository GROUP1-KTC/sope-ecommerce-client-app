import React from 'react';

interface MenuOrderProps {
    selectedMenu: 'all' | 'delivered' | 'processing' | 'canceled';
    setSelectedMenu: (
        menu: 'all' | 'delivered' | 'processing' | 'canceled',
    ) => void;
}

const MenuOrder: React.FC<MenuOrderProps> = ({
    selectedMenu,
    setSelectedMenu,
}) => {
    return (
        <div className="flex space-x-4 mb-4 bg-white p-2 rounded-lg shadow-md">
            <button
                className={`px-4 py-2 rounded cursor-pointer ${selectedMenu === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedMenu('all')}
            >
                Tất cả
            </button>
            <button
                className={`px-4 py-2 rounded cursor-pointer ${selectedMenu === 'delivered' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedMenu('delivered')}
            >
                Chờ thanh toán
            </button>
            <button
                className={`px-4 py-2 rounded cursor-pointer ${selectedMenu === 'processing' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedMenu('processing')}
            >
                Vận chuyển
            </button>
            <button
                className={`px-4 py-2 rounded cursor-pointer ${selectedMenu === 'canceled' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedMenu('canceled')}
            >
                Chờ giao hàng
            </button>
            <button
                className={`px-4 py-2 rounded cursor-pointer ${selectedMenu === 'canceled' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedMenu('canceled')}
            >
                Hoàn thành
            </button>
            <button
                className={`px-4 py-2 rounded cursor-pointer ${selectedMenu === 'canceled' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedMenu('canceled')}
            >
                Đã hủy
            </button>
            <button
                className={`px-4 py-2 rounded cursor-pointer ${selectedMenu === 'canceled' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => setSelectedMenu('canceled')}
            >
                Trả hàng/Hoàn tiền
            </button>
        </div>
    );
};

export default MenuOrder;
