'use client';

import { useSearchParams } from 'next/navigation';

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const code = searchParams.get('code') || '500';

    const errorMap: Record<string, { title: string; message: string }> = {
        '403': {
            title: '403 - Forbidden',
            message: 'Bạn không có quyền truy cập vào trang này.',
        },
        '404': {
            title: '404 - Not Found',
            message: 'Trang bạn tìm kiếm không tồn tại.',
        },
        '500': {
            title: '500 - Server Error',
            message: 'Đã có lỗi xảy ra từ phía hệ thống.',
        },
    };

    const error = errorMap[code] || errorMap['500'];

    return (
        <div className="text-center h-[80vh] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-bold text-red-600">{error.title}</h1>
            <p className="mt-4 text-2xl">{error.message}</p>
        </div>
    );
}
