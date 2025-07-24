import React, { Suspense } from 'react';
import Error from '~/components/shared/error';

const page = () => {
    return (
        <Suspense
            fallback={
                <div className="flex items-center justify-center h-[80vh] flex-col">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-red-400 border-t-transparent mb-4"></div>
                    <p className="text-lg text-gray-600">
                        Đang tải thông báo lỗi...
                    </p>
                </div>
            }
        >
            <Error />
        </Suspense>
    );
};

export default page;
