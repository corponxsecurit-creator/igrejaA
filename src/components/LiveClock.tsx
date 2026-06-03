import React, { useState, useEffect } from 'react';

interface LiveClockProps {
  size?: 'normal' | 'large';
}

export default function LiveClock({ size = 'normal' }: LiveClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const dateString = time.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="flex flex-row items-center justify-end gap-3 md:gap-5 font-sans bg-transparent border-none shadow-none p-0">
      <span className={`font-black tracking-wider font-mono text-current ${
        size === 'large' ? 'text-6xl md:text-7xl' : 'text-3xl md:text-4xl'
      }`}>{timeString}</span>
      <span className={`text-current/30 font-light ${
        size === 'large' ? 'text-4xl' : 'text-2xl'
      }`}>|</span>
      <span className={`font-black tracking-wider text-current/75 ${
        size === 'large' ? 'text-3xl md:text-4xl' : 'text-lg md:text-xl'
      }`}>{dateString}</span>
    </div>
  );
}
