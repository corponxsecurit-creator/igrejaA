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
    <div className="flex flex-col items-end justify-center font-sans bg-transparent border-none shadow-none p-0">
      <span className={`font-black tracking-wider font-mono text-current ${
        size === 'large' ? 'text-5xl md:text-6xl' : 'text-2xl md:text-3xl'
      }`}>{timeString}</span>
      <span className={`font-bold tracking-widest mt-1 text-current/75 ${
        size === 'large' ? 'text-lg md:text-xl' : 'text-xs md:text-sm'
      }`}>{dateString}</span>
    </div>
  );
}
