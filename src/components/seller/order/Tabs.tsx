type TabsProps = {
    activeTab: string;
    onTabChange: (tab: string) => void;
};

const tabs = [
    'All',
    'Waiting for confirmation',
    'Waiting for pickup',
    'Delivering',
    'Delivered',
    'Return/Refund/Cancel',
];

export default function Tabs({ activeTab, onTabChange }: TabsProps) {
    return (
        <div className="flex space-x-4 border-b">
            {tabs.map((tab) => (
                <button
                    key={tab}
                    onClick={() => onTabChange(tab)}
                    className={`px-4 py-2 text-sm font-medium ${
                        activeTab === tab
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
