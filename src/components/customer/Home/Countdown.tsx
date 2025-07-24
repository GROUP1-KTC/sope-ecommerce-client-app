'use client';

import React, { useEffect, useState } from 'react';

interface CountdownProps {
  initialSeconds: number; // Tổng số giây đếm ngược
}

const Countdown: React.FC<CountdownProps> = ({ initialSeconds }) => {
  const [time, setTime] = useState(initialSeconds);

  useEffect(() => {
    if (time <= 0) return;

    const interval = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const h = Math.floor(time / 3600);
  const m = Math.floor((time % 3600) / 60);
  const s = time % 60;

  return (
    <span className="inline-flex items-center space-x-1">
      <span className="bg-black text-white rounded px-1 font-mono">{pad(h)}</span>
      <span>:</span>
      <span className="bg-black text-white rounded px-1 font-mono">{pad(m)}</span>
      <span>:</span>
      <span className="bg-black text-white rounded px-1 font-mono">{pad(s)}</span>
    </span>
  );
};

export default Countdown;
