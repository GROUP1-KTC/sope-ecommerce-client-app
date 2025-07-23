'use client';

type Address = {
  id: number;
  name: string;
  phone: string;
  address: string;
  isDefault: boolean;
};

const AddressCard = ({ address, onSetDefault }: { address: Address; onSetDefault: (id: number) => void }) => {
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
        <button className="text-red-500 hover:text-red-700 text-sm font-medium cursor-pointer">
          Xóa
        </button>
      </div>
      <div className="text-gray-700 font-semibold mb-1">{address.name}</div>
      <div className="text-sm text-gray-500 mb-1">SĐT: {address.phone}</div>
      <div className="text-sm text-gray-500">{address.address}</div>
    </div>
  );
};

export default AddressCard;