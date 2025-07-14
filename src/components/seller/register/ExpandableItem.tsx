'use client';
import { useState } from 'react';

type Props = {
    title: string;
    children?: React.ReactNode;
};

export default function ExpandableItem({ title, children }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="mb-4">
            <div className="flex justify-between items-center font-medium">
                <span>{title}</span>
                <button
                    onClick={() => setOpen(!open)}
                    className="text-sm text-blue-600"
                >
                    {open ? 'Collapse ▲' : 'Expand ▼'}
                </button>
            </div>
            {open && <div className="mt-2 pl-4">{children}</div>}
        </div>
    );
}
