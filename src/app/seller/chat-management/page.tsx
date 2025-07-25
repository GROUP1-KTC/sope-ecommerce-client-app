import ChatAssistantCardGroup from '~/components/seller/chat-management/ChatAssistantCardGroup';
import ChatStatisticsCard from '~/components/seller/chat-management/ChatStatisticsCard';

export default function ChatDashboard() {
    return (
        <div className="p-6 space-y-8">
            <ChatStatisticsCard />
            <ChatAssistantCardGroup />
        </div>
    );
}
