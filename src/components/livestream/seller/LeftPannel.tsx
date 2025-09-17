'use client';
import React, { useRef, useState, type ReactNode } from 'react';

type LeftPanelProps = {
    liveActive: boolean;
    onStart?: (data: {
        title: string;
        description: string;
        thumbnail: string;
    }) => void;
    onEnd?: () => void;
    children?: ReactNode;
};

export default function LeftPanel({
    liveActive,
    onStart,
    onEnd,
    children,
}: LeftPanelProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [error, setError] = useState<{
        field: string;
        message: string;
    } | null>(null);

    const titleRef = useRef<HTMLInputElement>(null);
    const thumbnailRef = useRef<HTMLInputElement>(null);

    const handleStart = () => {
        if (!title.trim()) {
            setError({ field: 'title', message: 'Title không được để trống' });
            titleRef.current?.focus();

            return;
        }

        if (!thumbnail.trim()) {
            setError({
                field: 'thumbnail',
                message: 'Thumbnail không được để trống',
            });
            thumbnailRef.current?.focus();
            return;
        }

        setError(null);

        onStart?.({ title, description, thumbnail });
    };

    return (
        <div className="w-1/4 flex flex-col border-r border-gray-300 p-2 gap-3">
            <h3 className="font-bold mb-1">Live Preview</h3>
            <div className="relative bg-black rounded flex items-center justify-center h-64 text-white text-xl">
                {children}
                {!children && (
                    <span className="text-white text-xl">
                        {liveActive ? 'Đang Live' : 'Live Ended'}
                    </span>
                )}
            </div>

            <hr className="border-gray-300" />

            <div className="flex flex-col gap-2 p-2 pt-0 bg-white rounded shadow">
                <h3 className="font-bold text-sm">Live Info</h3>
                <label className="flex flex-col text-sm">
                    Title
                    <input
                        ref={titleRef}
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={`border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none transition ${
                            error?.field === 'title'
                                ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
                                : 'border-gray-300 focus:ring-blue-400 focus:border-blue-400'
                        }`}
                        placeholder="Enter live title"
                    />
                    {error?.field === 'title' && (
                        <span className="text-red-500 text-xs mt-1">
                            {error.message}
                        </span>
                    )}
                </label>

                {/* Description */}
                <label className="flex flex-col text-sm">
                    Description
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border h-16 border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        placeholder="Enter live description"
                        rows={3}
                    />
                </label>

                {/* Thumbnail */}
                <label className="flex flex-col text-sm">
                    Thumbnail URL
                    <input
                        ref={thumbnailRef}
                        type="text"
                        value={thumbnail}
                        onChange={(e) => setThumbnail(e.target.value)}
                        className={`border rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none transition ${
                            error?.field === 'thumbnail'
                                ? 'border-red-500 focus:ring-red-400 focus:border-red-400'
                                : 'border-gray-300 focus:ring-blue-400 focus:border-blue-400'
                        }`}
                        placeholder="Enter thumbnail URL"
                    />
                    {error?.field === 'thumbnail' && (
                        <span className="text-red-500 text-xs mt-1">
                            {error.message}
                        </span>
                    )}
                </label>

                <button
                    onClick={liveActive ? onEnd : handleStart}
                    className={`mt-2 px-3 py-1 rounded font-bold text-white cursor-pointer ${
                        liveActive
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-green-600 hover:bg-green-700'
                    } transition`}
                >
                    {liveActive ? 'End Live' : 'Start Live'}
                </button>
            </div>
        </div>
    );
}
