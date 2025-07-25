import type { PanelType } from '../common/RightSettingSidebar';

interface Props {
    panel: Exclude<PanelType, null>;
    onClose: () => void;
    headerHeight: number;
}

export default function SidebarPanel({ panel, onClose, headerHeight }: Props) {
    return (
        <div
            className="fixed right-16 w-[320px] bg-white shadow-lg border-l z-40 flex flex-col"
            style={{
                top: `${headerHeight}px`,
                height: `calc(100% - ${headerHeight}px)`,
            }}
        >
            <div className="p-4 border-b font-semibold text-gray-800 flex justify-between items-center">
                {panel === 'notifications' && 'Thông báo'}
                {panel === 'support' && 'Hỗ trợ khách hàng'}

                <button
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-800"
                >
                    ✕
                </button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto text-center text-sm text-gray-500">
                {panel === 'notifications' &&
                    'Bạn không nhận được bất kỳ thông báo nào.'}
                {panel === 'support' && 'Chưa có thông tin hỗ trợ.'}
            </div>
        </div>
    );
}
