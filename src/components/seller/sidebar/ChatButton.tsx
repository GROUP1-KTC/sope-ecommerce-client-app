import ChatIcon from "@mui/icons-material/Chat";

interface Props {
  active: boolean;
  onClick: () => void;
}

export default function ChatButton({ active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      title="Nhắn tin"
      className={`p-2 rounded-full hover:bg-gray-100 ${
        active ? "bg-orange-100" : ""
      }`}
    >
      <ChatIcon className="text-red-500" />
    </button>
  );
}
