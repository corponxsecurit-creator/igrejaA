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
    <div className={`flex flex-col items-center justify-center bg-slate-100/90 rounded-xl border border-slate-200 shadow-inner font-sans transition-colors duration-300 ${
      size === 'large' ? 'px-8 py-3 border-slate-300 shadow-md' : 'px-4 py-1.5'
    }`}>
      <span className={`font-black text-brand-dark tracking-wider font-mono ${
        size === 'large' ? 'text-2xl md:text-3xl' : 'text-sm'
      }`}>{timeString}</span>
      <span className={`uppercase font-bold text-slate-505 tracking-widest mt-0.5 ${
        size === 'large' ? 'text-xs md:text-sm' : 'text-[9px]'
      }`}>{dateString}</span>
    </div>
  );
}
