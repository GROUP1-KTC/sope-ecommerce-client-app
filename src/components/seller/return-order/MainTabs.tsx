type Props = {
    active: string;
    onChange: (tab: string) => void;
};

const tabs = [
    'Tất cả',
    'Đơn Trả hàng Hoàn tiền',
    'Đơn Hủy',
    'Đơn Giao hàng không thành công',
];

export default function MainTabs({ active, onChange }: Props) {
    return (
        <div className="flex border-b">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    className={`px-4 py-2 text-sm font-medium ${
                        active === tab
                            ? 'text-red-500 border-b-2 border-red-500'
                            : 'text-gray-600'
                    }`}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}
