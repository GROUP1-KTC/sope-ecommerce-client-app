'use client';
import React, { useState } from 'react';

type LeftPanelProps = {
    liveActive: boolean;
    onStart?: () => void;
    onEnd?: () => void;
};

export default function LeftPanel({
    liveActive,
    onStart,
    onEnd,
}: LeftPanelProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    return (
        <div className="w-1/4 flex flex-col border-r border-gray-300 p-2 gap-3">
            <h3 className="font-bold mb-1">Live Preview</h3>
            <div className="relative bg-black rounded flex items-center justify-center h-64 text-white text-xl">
                {liveActive ? 'Live Preview' : 'Live Ended'}
            </div>

            <hr className="border-gray-300" />

            <div className="flex flex-col gap-2 p-2 pt-0 bg-white rounded shadow">
                <h3 className="font-bold text-sm">Live Settings</h3>
                <label className="flex justify-between text-sm">
                    Volume
                    <input type="range" min={0} max={100} defaultValue={50} />
                </label>
                <label className="flex justify-between text-sm">
                    Brightness
                    <input type="range" min={0} max={100} defaultValue={70} />
                </label>
                <label className="flex justify-between text-sm">
                    Contrast
                    <input type="range" min={0} max={100} defaultValue={50} />
                </label>
            </div>

            <hr className="border-gray-300" />

            <div className="flex flex-col gap-2 p-2 pt-0 bg-white rounded shadow">
                <h3 className="font-bold text-sm">Live Info</h3>
                <label className="flex flex-col text-sm">
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 mt-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                        placeholder="Enter live title"
                    />
                </label>
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
                <button
                    onClick={liveActive ? onEnd : onStart}
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
