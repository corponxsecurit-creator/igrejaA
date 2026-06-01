import React, { useState, useEffect } from 'react';
import { playTapSound } from '../utils/audio';
import { speakText } from '../utils/tts';
import { BrandConfig } from '../utils/brand';

interface HomeViewProps {
  onStart: () => void;
  onOpenAccessibility: () => void;
  onOpenAdmin?: () => void;
  brand: BrandConfig;
}

export default function HomeView({ onStart, onOpenAccessibility, onOpenAdmin, brand }: HomeViewProps) {
  const [activeCard, setActiveCard] = useState(0);

  // Welcome voice message on mount
  useEffect(() => {
    speakText(`Bem-vindo à ${brand.name} ${brand.campusName}. Toque na tela para iniciar o atendimento.`);
  }, [brand]);

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
      speakText('Idioma selecionado: Português do Brasil.');
      alert('Idioma: Português (Brasil) selecionado.');
    } else {
      onOpenAccessibility();
    }
  };

  // Get brand-specific carousel cards
  const getCarouselData = () => {
    switch (brand.id) {
      case 'lagoinha':
        return [
          { title: brand.termCults, time: 'Domingo, 10h, 17h e 19:30h', subtitle: 'Celebração & Comunhão', icon: 'event' },
          { title: brand.termConnects, time: 'Diversos dias e horários', subtitle: 'Grupos de Crescimento (GC)', icon: 'group' }
        ];
      case 'universal':
        return [
          { title: brand.termCults, time: 'Domingo, 9:30h e Quarta, 20:00h', subtitle: 'Reuniões de Fé e Poder', icon: 'event' },
          { title: brand.termConnects, time: 'Atendimento todos os dias', subtitle: 'Ações Sociais e Grupos FJU', icon: 'group' }
        ];
      case 'beityaacov':
        return [
          { title: brand.termCults, time: 'Sexta às 19:00h e Sábado às 9:30h', subtitle: 'Preces e Cabalat Shabat', icon: 'event' },
          { title: brand.termConnects, time: 'Segunda a Quinta', subtitle: 'Aulas de Cabalá e Torá', icon: 'group' }
        ];
      case 'ibmalphaville':
        return [
          { title: brand.termCults, time: 'Domingo às 08h30, 11h15 e 18h30', subtitle: 'Celebrações de Domingo', icon: 'event' },
          { title: brand.termConnects, time: 'Diversos dias e horários', subtitle: 'Grupos de Relacionamento (GR)', icon: 'group' }
        ];
      case 'atitude':
      default:
        return [
          { title: brand.termCults, time: 'Domingo, 10h e 19h', subtitle: 'Celebração da Família', icon: 'event' },
          { title: brand.termConnects, time: 'Sábado, 19:00h', subtitle: 'Culto de Jovens - Be One', icon: 'group' }
        ];
    }
  };

  const carouselCards = getCarouselData();

  return (
    <div 
      className="relative h-screen w-full select-none overflow-hidden text-white"
      style={{
        background: 'radial-gradient(circle at center, var(--color-brand-glow) 0%, #060814 100%)'
      }}
    >
      {/* Background Image with Kiosk ambiance - Overlay style */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover opacity-40 mix-blend-overlay transition-transform duration-10000 ease-out"
          src={brand.bgUrl}
          alt={`Ambiente Kiosk ${brand.name}`}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060814]/90 via-[#060814]/40 to-[#060814]/95" />
      </div>

      {/* Top Header */}
      <nav className="absolute top-0 left-0 z-50 flex w-full justify-between items-center px-12 md:px-20 py-8">
        
        {/* Brand Switcher Selection Dropdown */}
        <div className="absolute left-6 md:left-20 flex items-center gap-2">
          <span className="material-symbols-outlined font-light !text-lg text-white/50">swap_horizontal_circle</span>
          <select
            value={brand.id}
            onChange={(e) => {
              playTapSound();
              const selected = e.target.value;
              const url = new URL(window.location.href);
              url.searchParams.set('client', selected);
              window.location.href = url.toString();
            }}
            className="bg-white/10 text-white border border-white/20 rounded-xl px-3 py-1.5 text-xs font-black uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-brand-red cursor-pointer backdrop-blur-md transition-all hover:bg-white/20"
            title="Selecionar Cliente / Versão"
          >
            <option value="atitude" className="bg-slate-900 text-white font-bold">Atitude</option>
            <option value="lagoinha" className="bg-slate-900 text-white font-bold">Lagoinha</option>
            <option value="universal" className="bg-slate-900 text-white font-bold">Universal</option>
            <option value="beityaacov" className="bg-slate-900 text-white font-bold">Beit Yaacov</option>
            <option value="ibmalphaville" className="bg-slate-900 text-white font-bold">IBM Alphaville</option>
          </select>
        </div>

        <div className="flex flex-col items-center mx-auto text-center mt-4">
          <div 
            className="px-6 py-3 rounded-2xl border-2 bg-white/5 backdrop-blur-md transition-all duration-300 flex items-center justify-center h-20 shadow-lg"
            style={{ 
              borderColor: 'var(--color-brand-accent-splash)',
              boxShadow: '0 0 15px var(--color-brand-glow)' 
            }}
          >
            <img 
              src={brand.logoUrl} 
              className={`h-14 object-contain ${brand.id === 'atitude' ? 'logo-white' : ''}`} 
              alt={brand.name} 
            />
          </div>
          
          {/* Badge Pill with Dot */}
          <div 
            className="mt-3.5 flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-md transition-all duration-300"
            style={{ 
              backgroundColor: 'var(--color-brand-badge-bg)', 
              color: 'var(--color-brand-badge-text)' 
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: 'var(--color-brand-badge-text)' }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: 'var(--color-brand-badge-text)' }}></span>
            </span>
            <span>{brand.badgeLabel}</span>
          </div>
        </div>

        {/* Accessibility Buttons (Absolute Right overlay style) */}
        <div className="absolute right-6 md:right-20 flex gap-4">
          {onOpenAdmin && (
            <button 
              type="button" 
              onClick={() => {
                playTapSound();
                onOpenAdmin();
              }}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center text-white cursor-pointer"
              title="Painel Administrativo"
            >
              <span className="material-symbols-outlined font-light !text-2xl">settings</span>
            </button>
          )}
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
      <main className="relative z-10 h-screen flex flex-col items-center justify-center px-6 text-center pt-24">
        {/* Welcome Section */}
        <div className="mb-10 animate-fade-in flex flex-col items-center">
          <span 
            className="text-sm uppercase tracking-[0.3em] font-black mb-2" 
            style={{ color: 'var(--color-brand-accent-splash)' }}
          >
            Bem-vindo
          </span>
          <h2 className="font-sans text-5xl md:text-6xl lg:text-[64px] text-white font-extrabold uppercase tracking-[0.15em] drop-shadow-2xl leading-none">
            {brand.name}
          </h2>
          <span className="text-[11px] uppercase tracking-[0.4em] font-black text-white/50 mt-3 mb-6">
            {brand.campusName}
          </span>
          <p className="font-sans text-lg md:text-xl text-white/70 max-w-2xl mx-auto drop-shadow leading-relaxed">
            {brand.type === 'synagogue' 
              ? 'Um espaço sagrado de oração, estudo da Torá e acolhimento comunitário.' 
              : 'Um lugar de novos começos e experiências extraordinárias com Deus.'}
          </p>
        </div>

        {/* Central Pulsing Start Action */}
        <div className="relative flex flex-col items-center group cursor-pointer" onClick={handleStartClick}>
          {/* Blur accent glow background */}
          <div 
            className="absolute -inset-10 rounded-full blur-3xl opacity-35 transition-all duration-300"
            style={{ backgroundColor: 'var(--color-brand-accent-splash)' }}
          />
          
          <button
            type="button"
            className="relative w-[300px] md:w-[540px] h-24 md:h-28 bg-brand-red hover:bg-brand-red-hover text-white font-semibold text-xl md:text-2xl flex items-center justify-center rounded-full border-4 border-white/20 hover:scale-105 transition-all cursor-pointer shadow-2xl active:scale-95 duration-150 ease-out animate-cta-pulse btn-shine"
          >
            <span className="material-symbols-outlined !text-4xl mr-3 font-semibold text-stroke animate-hand-bounce">
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
            {/* Card 1 */}
            <div 
              className={`bg-[#1c1b1d]/95 backdrop-blur-2xl border-2 border-brand-red/45 p-6 rounded-2xl flex flex-col gap-3 w-full md:w-80 transition-all duration-500 ease-in-out shadow-2xl ${
                activeCard === 0 ? 'opacity-100 scale-100 ring-4 ring-brand-red/30' : 'opacity-40 scale-95 hidden md:flex'
              }`}
            >
              <div className="flex items-center text-brand-red">
                <span className="material-symbols-outlined mr-2">{carouselCards[0].icon}</span>
                <span className="text-xs uppercase tracking-widest font-black">{carouselCards[0].title}</span>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-red tracking-tight drop-shadow-md">{carouselCards[0].time}</p>
                <p className="text-sm text-white/90 font-bold tracking-wide mt-1 drop-shadow-sm">{carouselCards[0].subtitle}</p>
              </div>
            </div>

            {/* Card 2 */}
            <div 
              className={`bg-[#1c1b1d]/95 backdrop-blur-2xl border-2 border-brand-red/45 p-6 rounded-2xl flex flex-col gap-3 w-full md:w-80 transition-all duration-500 ease-in-out shadow-2xl ${
                activeCard === 1 ? 'opacity-100 scale-100 ring-4 ring-brand-red/30' : 'opacity-40 scale-95 hidden md:flex'
              }`}
            >
              <div className="flex items-center text-brand-red">
                <span className="material-symbols-outlined mr-2">{carouselCards[1].icon}</span>
                <span className="text-xs uppercase tracking-widest font-black">{carouselCards[1].title}</span>
              </div>
              <div>
                <p className="text-2xl font-black text-brand-red tracking-tight drop-shadow-md">{carouselCards[1].time}</p>
                <p className="text-sm text-white/90 font-bold tracking-wide mt-1 drop-shadow-sm">{carouselCards[1].subtitle}</p>
              </div>
            </div>
          </div>

          {/* Indicators and Network Connection (Kiosk Detail) */}
          <div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
            <div className="flex gap-2">
              <span 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeCard === 0 ? 'scale-110' : ''}`}
                style={{
                  backgroundColor: activeCard === 0 ? 'var(--color-brand-accent-splash)' : 'rgba(255, 255, 255, 0.25)',
                  boxShadow: activeCard === 0 ? '0 0 8px var(--color-brand-accent-splash)' : 'none'
                }}
              />
              <span 
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeCard === 1 ? 'scale-110' : ''}`}
                style={{
                  backgroundColor: activeCard === 1 ? 'var(--color-brand-accent-splash)' : 'rgba(255, 255, 255, 0.25)',
                  boxShadow: activeCard === 1 ? '0 0 8px var(--color-brand-accent-splash)' : 'none'
                }}
              />
            </div>

            <div className="flex items-center bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full text-white/95 text-xs font-medium border border-white/10 gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="material-symbols-outlined text-brand-red !text-base">wifi</span>
                <span>{brand.wifi}</span>
              </div>
              <div className="w-[1px] h-4 bg-white/20" />
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-brand-red !text-base">location_on</span>
                <span>{brand.type === 'synagogue' ? 'Salão de Orações' : 'Auditório Principal'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
