import AutoModeIcon from "@mui/icons-material/AutoMode";
import ChatIcon from "@mui/icons-material/Chat";
import QuizIcon from "@mui/icons-material/Quiz";
import { Card } from "../common/Card";

const assistantItems = [
  {
    title: "Tin nhắn tự động",
    icon: <AutoModeIcon />,
    description: "Tự động gửi lời chào khi người mua bắt đầu cuộc trò chuyện.",
    action: "Bắt đầu",
  },
  {
    title: "Tin nhắn nhanh",
    icon: <ChatIcon />,
    description:
      "Giúp bộ phận chăm sóc khách hàng phản hồi nhanh hơn thông qua mẫu tin nhắn có sẵn.",
    action: "Chỉnh sửa",
  },
  {
    title: "Hỏi - Đáp",
    icon: <QuizIcon />,
    description:
      "Tự động gửi thẻ Câu hỏi thường gặp khi người mua bắt đầu trò chuyện để giúp trả lời các câu hỏi thường gặp.",
    action: "Bắt đầu",
  },
];

export default function ChatAssistantCardGroup() {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-semibold text-gray-800">Trợ lý Chat</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {assistantItems.map((item, index) => (
          <Card key={index} className="flex flex-col justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="text-red-500 text-2xl">{item.icon}</div>
              <h3 className="font-semibold text-gray-800 text-sm">
                {item.title}
              </h3>
            </div>
            <p className="text-sm text-gray-600">{item.description}</p>
            <button className="self-start border border-red-500 text-red-500 hover:bg-red-50 rounded px-4 py-1 text-sm">
              {item.action}
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
