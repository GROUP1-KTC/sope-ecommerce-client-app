const formatMessageTimestamp = (timestamp: string | number | Date): string => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);

    const isToday =
        now.getFullYear() === date.getFullYear() &&
        now.getMonth() === date.getMonth() &&
        now.getDate() === date.getDate();

    const getWeekStart = (d: Date) => {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
    };

    const weekStart = getWeekStart(now);
    const isSameWeek = date >= weekStart;

    if (diffSec < 60) return 'Now';
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (isToday)
        return date.toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    if (isSameWeek) {
        const weekdays = [
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
        ];
        return weekdays[date.getDay()];
    }
    return date.toLocaleDateString('vi-VN');
};
export { formatMessageTimestamp };
