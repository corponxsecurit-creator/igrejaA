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
    weekday: 'short',
    day: '2-digit',
    month: 'short'
  });

  return (
    <div className="flex flex-col items-end justify-center font-sans bg-transparent border-none shadow-none p-0">
      <span className={`font-black tracking-wider font-mono text-current ${
        size === 'large' ? 'text-3xl md:text-4xl' : 'text-base md:text-lg'
      }`}>{timeString}</span>
      <span className={`uppercase font-bold tracking-widest mt-0.5 text-current/75 ${
        size === 'large' ? 'text-xs md:text-sm' : 'text-[10px]'
      }`}>{dateString}</span>
    </div>
  );
}
