'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface FlipDigitProps {
    value: number;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ value }) => {
    return (
        <div className="relative w-6 h-6 bg-black text-white font-bold text-xs flex items-center justify-center overflow-hidden rounded">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={value}
                    initial={{ y: '-100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    {value.toString().padStart(2, '0')}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

const FlashCountdown: React.FC<{ endDateTime: string }> = ({ endDateTime }) => {
    const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

    useEffect(() => {
        const target = new Date(endDateTime).getTime();

        const tick = () => {
            const diff = target - Date.now();
            if (diff <= 0) {
                setTime({ h: 0, m: 0, s: 0 });
                return;
            }
            const h = Math.floor(diff / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            setTime({ h, m, s });
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [endDateTime]);

    return (
        <div className="flex space-x-1 items-center">
            <FlipDigit value={time.h} />
            <span className="font-bold">:</span>
            <FlipDigit value={time.m} />
            <span className="font-bold">:</span>
            <FlipDigit value={time.s} />
        </div>
    );
};

export default FlashCountdown;
