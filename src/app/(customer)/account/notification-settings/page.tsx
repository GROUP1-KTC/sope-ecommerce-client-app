'use client';
import { useState } from 'react';

interface SettingItem {
    label: string;
    description: string;
    enabled: boolean;
}

const NotificationSettingsPage = () => {
    const [emailSettings, setEmailSettings] = useState<SettingItem[]>([
        {
            label: 'Cập nhật đơn hàng',
            description:
                'Cập nhật về tình trạng vận chuyển của tất cả các đơn hàng',
            enabled: true,
        },
        {
            label: 'Khuyến mãi',
            description: 'Cập nhật về các ưu đãi và khuyến mãi sắp tới',
            enabled: true,
        },
        {
            label: 'Khảo sát',
            description:
                'Đồng ý nhận khảo sát để cho chúng tôi được lắng nghe bạn',
            enabled: true,
        },
    ]);

    const [smsSettings, setSmsSettings] = useState<SettingItem[]>([
        {
            label: 'Khuyến mãi',
            description: 'Cập nhật về các ưu đãi và khuyến mãi sắp tới',
            enabled: false,
        },
    ]);

    const toggleEmailSetting = (index: number) => {
        const updated = [...emailSettings];
        updated[index].enabled = !updated[index].enabled;
        setEmailSettings(updated);
    };

    const toggleSmsSetting = (index: number) => {
        const updated = [...smsSettings];
        updated[index].enabled = !updated[index].enabled;
        setSmsSettings(updated);
    };

    return (
        <div className="order-detail-page">
            <div className="flex flex-col min-h-screen bg-gray-50 pl-12">
                <div className="flex flex-1">
                    <div className="flex-1 p-6 bg-white rounded-lg shadow-md my-6">
                        <h2 className="text-xl font-semibold text-black uppercase mb-6">
                            Cài đặt thông báo
                        </h2>
                        <hr className="my-4 border-gray-300" />
                        <div className="mb-8 px-10">
                            <h3 className="font-semibold text-lg mb-1">
                                Email thông báo
                            </h3>
                            <p className="text-sl text-gray-500 mb-4">
                                Thông báo và nhắc nhở quan trọng về tài khoản sẽ
                                không thể bị tắt
                            </p>
                            <ul className="space-y-4">
                                {emailSettings.map((item, idx) => (
                                    <li
                                        key={idx}
                                        className="flex justify-between items-center"
                                    >
                                        <div>
                                            <p className="font-medium">
                                                {item.label}
                                            </p>
                                            <p className="text-sl text-gray-500">
                                                {item.description}
                                            </p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={item.enabled}
                                                onChange={() =>
                                                    toggleEmailSetting(idx)
                                                }
                                            />
                                            <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-green-500 transition-colors duration-300 ease-in-out" />
                                            <div
                                                className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out
        peer-checked:translate-x-5"
                                            />
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationSettingsPage;
