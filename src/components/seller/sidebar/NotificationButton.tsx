import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

interface Props {
    active: boolean;
    onClick: () => void;
}

export default function NotificationButton({ active, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            title="Thông báo"
            className={`p-2 rounded-full hover:bg-gray-100 ${
                active ? 'bg-orange-100' : ''
            }`}
        >
            <NotificationsNoneOutlinedIcon className="text-red-500" />
        </button>
    );
}
