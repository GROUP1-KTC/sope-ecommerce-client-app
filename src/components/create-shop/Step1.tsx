import type { Address } from './types';

interface Step1Props {
    name: string;
    setName: (v: string) => void;
    email: string;
    setEmail: (v: string) => void;
    phone: string;
    setPhone: (v: string) => void;
    address: Address | null;
    openAddressModal: () => void;
    clearAddress: () => void;
    errors: Record<string, string>;
}

export default function Step1({
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    openAddressModal,
    clearAddress,
    errors,
}: Step1Props) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">
                Thông tin cơ bản & địa chỉ lấy hàng
            </h3>

            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Tên shop
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-300 rounded p-2"
                        placeholder="Tên shop"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Email
                        </label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            placeholder="email@domain.com"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            Số điện thoại
                        </label>
                        <input
                            value={phone}
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(
                                    /\D/g,
                                    '',
                                );
                                setPhone(numericValue);
                            }}
                            className="w-full border border-gray-300 rounded p-2"
                            placeholder="0123xxxxxx"
                        />

                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between mb-2 mt-1">
                        <label className="block text-sm font-medium">
                            Địa chỉ lấy hàng
                        </label>
                        <button
                            type="button"
                            onClick={openAddressModal}
                            className="text-sm px-5 py-2 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded transition"
                        >
                            {address ? 'Sửa địa chỉ' : 'Thêm địa chỉ'}
                        </button>
                    </div>

                    {!address ? (
                        <div className="text-sm text-gray-500">
                            Chưa có địa chỉ nào. Thêm để tiếp tục.
                        </div>
                    ) : (
                        <div className="flex items-center justify-between rounded p-2 border border-gray-300 bg-gray-50">
                            <div>
                                <div className="font-medium">
                                    {address.senderName}
                                </div>
                                <div className="text-sm text-gray-600">
                                    {address.senderPhone} • {address.street},{' '}
                                    {address.ward}, {address.district},{' '}
                                    {address.city}
                                </div>
                            </div>
                            <button
                                onClick={clearAddress}
                                className="text-sm text-red-500 cursor-pointer"
                            >
                                Xóa
                            </button>
                        </div>
                    )}

                    {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.address}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
