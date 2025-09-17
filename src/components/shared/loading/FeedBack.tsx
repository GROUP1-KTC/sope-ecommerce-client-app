'use client';
import React from 'react';
import CustomLink from './CustomLink';
import HomeIcon from '@mui/icons-material/Home';
import { SearchX } from 'lucide-react';

export const LoadingMessage = ({ message }: { message?: string }) => (
    <div className="flex justify-center items-center h-[80vh] text-gray-600">
        <div className="w-12 h-12 border-4 border-t-red-600 border-gray-200 rounded-full animate-spin mr-4"></div>
        <span className="text-lg">{message ?? 'Đang tải...'}</span>
    </div>
);

export const ErrorMessage = ({ message }: { message?: string }) => (
    <div className="flex flex-col justify-center items-center h-[80vh] text-red-600 text-xl gap-4">
        <SearchX size={256} color="#c84646" strokeWidth={1} />
        <span>{message ?? 'Đã xảy ra lỗi!'}</span>

    </div>
);

export const EmptyMessage = ({ message }: { message?: string }) => (
    <div className="flex justify-center items-center h-[80vh] text-gray-500 text-lg">
        {message ?? 'Không tìm thấy dữ liệu.'}
    </div>
);
