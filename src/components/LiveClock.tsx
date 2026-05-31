import React, { useState, useEffect } from 'react';

export default function LiveClock() {
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
    <div className="flex flex-col items-center justify-center bg-slate-100/90 px-4 py-1.5 rounded-xl border border-slate-200 shadow-inner font-sans transition-colors duration-300">
      <span className="text-sm font-black text-brand-dark tracking-wider font-mono">{timeString}</span>
      <span className="text-[9px] uppercase font-bold text-slate-500 tracking-widest mt-0.5">{dateString}</span>
    </div>
  );
}
