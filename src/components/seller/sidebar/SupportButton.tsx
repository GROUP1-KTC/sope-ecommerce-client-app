import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

interface Props {
  active: boolean;
  onClick: () => void;
}

export default function SupportButton({ active, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      title="Hỗ trợ"
      className={`p-2 rounded-full hover:bg-gray-100 ${
        active ? "bg-orange-100" : ""
      }`}
    >
      <SupportAgentOutlinedIcon className="text-red-500" />
    </button>
  );
}
