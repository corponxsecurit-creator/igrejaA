import React, { useState, useEffect } from 'react';
import { playTapSound } from '../utils/audio';

interface HomeViewProps {
  onStart: () => void;
}

export default function HomeView({ onStart }: HomeViewProps) {
  const [activeCard, setActiveCard] = useState(0);

  // Rotate carousel cards every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleStartClick = () => {
    playTapSound();
    onStart();
  };

  const handleAccessibilityClick = (type: string) => {
    playTapSound();
    if (type === 'lang') {
      alert('Idioma: Português (Brasil) selecionado.');
    } else {
      alert('Modo de Acessibilidade: Contraste de cores ativado por padrão. Teclado virtual ampliado disponível em todos os campos de texto.');
    }
  };

  return (
    <div className="relative h-screen w-full select-none overflow-hidden bg-brand-dark text-white">
      {/* Background Image with Kiosk ambiance - Overlay style */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover opacity-50 mix-blend-overlay transition-transform duration-10000 ease-out"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDkmaqDQPQDhgday7oT76Rrhv9Fom7TtN-Ao_dXxXT-D3y-Tu9QuTFZkkexWTx5s6RGpZwB9AV_R0hGZk4z4EPFdbP2XTrO4DJey1baZsg5Su5fwMX95PTp1Y_KUchmjaM1rMZhJ5HbYjSQDDUAXMk4s8aLDJn4E5nZqBHG8dy6cuq5XZX4qB8q_8Q6Suvgr7i9VuMY8uFlTlhLq17PrQ5IBOv-EJiYlSjIMSigwbXugzdyRpO8fjcFX_JCyOOi73X6G05UaL_wVDPp"
          alt="Ambiente Kiosk Atitude Alphaville"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark/95" />
      </div>

      {/* Top Header */}
      <nav className="absolute top-0 left-0 z-50 flex w-full justify-between items-center px-12 md:px-20 py-10">
        <div className="flex flex-col items-center mx-auto text-center">
          <h1 className="font-sans text-4xl md:text-6xl font-black tracking-tighter drop-shadow-2xl text-white">
            Atitude <span className="text-brand-red">Alphaville</span>
          </h1>
          <div className="h-1.5 w-32 bg-brand-red mt-3 rounded-full opacity-90 shadow-md animate-pulse" />
        </div>

        {/* Accessibility Buttons (Absolute Right overlay style) */}
        <div className="absolute right-6 md:right-20 flex gap-4">
          <button 
            type="button" 
            onClick={() => handleAccessibilityClick('lang')}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer"
            title="Mudar Idioma"
          >
            <span className="material-symbols-outlined font-light !text-2xl">language</span>
          </button>
          <button 
            type="button" 
            onClick={() => handleAccessibilityClick('access')}
            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer"
            title="Acessibilidade"
          >
            <span className="material-symbols-outlined font-light !text-2xl">accessibility_new</span>
          </button>
        </div>
      </nav>

      {/* Main Touch Canvas */}
      <main className="relative z-10 h-screen flex flex-col items-center justify-center px-6 text-center">
        {/* Welcome Section */}
        <div className="mb-10 animate-fade-in">
          <h2 className="font-sans text-3xl md:text-5xl lg:text-6xl text-white font-light tracking-wide drop-shadow-lg">
            Bem-vindo à <span className="font-bold">Atitude Alphaville</span>
          </h2>
          <p className="font-sans text-lg md:text-2xl text-white/80 mt-4 max-w-3xl mx-auto drop-shadow">
            Um lugar de novos começos e experiências extraordinárias com Deus.
          </p>
        </div>

        {/* Central Pulsing Start Action */}
        <div className="relative flex flex-col items-center group cursor-pointer" onClick={handleStartClick}>
          <div className="absolute -inset-10 bg-brand-red/20 rounded-full blur-3xl animate-pulse" />
          
          <button
            type="button"
            className="relative w-[300px] md:w-[540px] h-24 md:h-28 bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-xl md:text-2xl flex items-center justify-center rounded-full border-4 border-white/20 hover:scale-105 transition-all cursor-pointer shadow-2xl active:scale-95 duration-150 ease-out"
          >
            <span className="material-symbols-outlined !text-4xl mr-3 font-semibold text-stroke animate-bounce">
              touch_app
            </span>
            Como podemos ajudar você hoje?
          </button>

          <div className="mt-6 flex gap-4 items-center">
            <span className="w-10 h-[1px] bg-white/30" />
            <span className="text-white/65 text-sm uppercase tracking-widest font-semibold animate-pulse">
              Toque na tela para iniciar
            </span>
            <span className="w-10 h-[1px] bg-white/30" />
          </div>
        </div>
      </main>

      {/* Bottom Information Rail */}
      <section className="absolute bottom-0 left-0 z-20 w-full pb-10 px-6 md:px-20">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
          {/* Information Cards (Rotating Carousel) */}
          <div className="flex gap-4 overflow-hidden w-full md:w-auto">
            {/* Card 1: Culto */}
            <div 
              className={`bg-[#121212]/95 backdrop-blur-2xl border-2 border-brand-red/45 p-6 rounded-2xl flex flex-col gap-3 w-full md:w-80 transition-all duration-500 ease-in-out shadow-2xl ${
                activeCard === 0 ? 'opacity-100 scale-100 ring-4 ring-brand-red/30' : 'opacity-40 scale-95 hidden md:flex'
              }`}
            >
              <div className="flex items-center text-brand-red">
                <span className="material-symbols-outlined mr-2">event</span>
                <span className="text-xs uppercase tracking-widest font-black">Próximo Culto</span>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-red tracking-tight drop-shadow-md">Hoje, 20:00h</p>
                <p className="text-sm text-white/90 font-bold tracking-wide mt-1 drop-shadow-sm">Celebração &amp; Adoração</p>
              </div>
            </div>

            {/* Card 2: Connect Groups */}
            <div 
              className={`bg-[#121212]/95 backdrop-blur-2xl border-2 border-brand-red/45 p-6 rounded-2xl flex flex-col gap-3 w-full md:w-80 transition-all duration-500 ease-in-out shadow-2xl ${
                activeCard === 1 ? 'opacity-100 scale-100 ring-4 ring-brand-red/30' : 'opacity-40 scale-95 hidden md:flex'
              }`}
            >
              <div className="flex items-center text-brand-red">
                <span className="material-symbols-outlined mr-2">group</span>
                <span className="text-xs uppercase tracking-widest font-black">Connect groups</span>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-red tracking-tight drop-shadow-md">Vida em Comunidade</p>
                <p className="text-sm text-white/90 font-bold tracking-wide mt-1 drop-shadow-sm">Encontre o seu grupo hoje</p>
              </div>
            </div>
          </div>

          {/* Indicators and Network Connection (Kiosk Detail) */}
          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            <div className="flex gap-2">
              <span className={`w-2.5 h-2.5 rounded-full transition-colors ${activeCard === 0 ? 'bg-brand-red' : 'bg-white/20'}`} />
              <span className={`w-2.5 h-2.5 rounded-full transition-colors ${activeCard === 1 ? 'bg-brand-red' : 'bg-white/20'}`} />
            </div>

            <div className="flex items-center bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full text-white/95 text-xs font-medium border border-white/10 gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="material-symbols-outlined text-brand-red !text-base">wifi</span>
                <span>Atitude_Guest</span>
              </div>
              <div className="w-[1px] h-4 bg-white/20" />
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-brand-red !text-base">location_on</span>
                <span>Auditório Principal</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
