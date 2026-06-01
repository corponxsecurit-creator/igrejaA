import React, { useState, useEffect, useRef, useCallback } from 'react';
import { playTapSound } from '../utils/audio';
import { speakText } from '../utils/tts';
import { BrandConfig } from '../utils/brand';

interface Slide {
  bgUrl: string;
  verse: string;
  verseRef: string;
}

function getBrandSlides(brand: BrandConfig): Slide[] {
  switch (brand.id) {
    case 'ibmalphaville':
      return [
        {
          bgUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&auto=format&fit=crop&q=80',
          verse: 'E conhecereis a verdade, e a verdade vos libertará.',
          verseRef: 'João 8:32',
        },
        {
          bgUrl: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?w=1600&auto=format&fit=crop&q=80',
          verse: 'Buscai primeiro o reino de Deus e a sua justiça.',
          verseRef: 'Mateus 6:33',
        },
        {
          bgUrl: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=1600&auto=format&fit=crop&q=80',
          verse: 'Eu vim para que tenham vida, e a tenham em abundância.',
          verseRef: 'João 10:10',
        },
      ];
    case 'lagoinha':
      return [
        {
          bgUrl: 'https://static.wixstatic.com/media/d7e284_e0cb83d5c8204ecb96855d028995d338~mv2.jpeg/v1/fill/w_1600,h_1000,al_c/d7e284_e0cb83d5c8204ecb96855d028995d338~mv2.jpeg',
          verse: 'Louvai ao Senhor porque ele é bom; o seu amor é eterno.',
          verseRef: 'Salmos 107:1',
        },
        {
          bgUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&auto=format&fit=crop&q=80',
          verse: 'O Senhor é a minha força e o meu escudo.',
          verseRef: 'Salmos 28:7',
        },
        {
          bgUrl: 'https://images.unsplash.com/photo-1507036066871-b7e8032b3dea?w=1600&auto=format&fit=crop&q=80',
          verse: 'Alegrai-vos sempre no Senhor. Outra vez digo: Alegrai-vos.',
          verseRef: 'Filipenses 4:4',
        },
      ];
    case 'universal':
      return [
        {
          bgUrl: 'https://portalwp.s3.amazonaws.com/wp-content/uploads/2024/05/16161154/templo.jpg',
          verse: 'Pedi e dar-se-vos-á; buscai e encontrareis.',
          verseRef: 'Mateus 7:7',
        },
        {
          bgUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1600&auto=format&fit=crop&q=80',
          verse: 'Tudo posso naquele que me fortalece.',
          verseRef: 'Filipenses 4:13',
        },
        {
          bgUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1600&auto=format&fit=crop&q=80',
          verse: 'Se Deus é por nós, quem será contra nós?',
          verseRef: 'Romanos 8:31',
        },
      ];
    case 'beityaacov':
      return [
        {
          bgUrl: 'https://www.morasha.com.br/wp-content/uploads/2023/06/beityaacov.jpg',
          verse: 'Shemá Israel: Adonai Eloheinu, Adonai Echad.',
          verseRef: 'Deuteronômio 6:4',
        },
        {
          bgUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1600&auto=format&fit=crop&q=80',
          verse: 'A Torá é uma árvore de vida para quem a abraça.',
          verseRef: 'Provérbios 3:18',
        },
        {
          bgUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1600&auto=format&fit=crop&q=80',
          verse: 'Que a luz do Eterno ilumine o teu caminho.',
          verseRef: 'Números 6:25',
        },
      ];
    case 'atitude':
    default:
      return [
        {
          bgUrl: 'https://igrejaatitude.com.br/wp-content/uploads/2025/03/hall-iba.png',
          verse: 'Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito.',
          verseRef: 'João 3:16',
        },
        {
          bgUrl: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1600&auto=format&fit=crop&q=80',
          verse: 'Tudo posso naquele que me fortalece.',
          verseRef: 'Filipenses 4:13',
        },
        {
          bgUrl: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=1600&auto=format&fit=crop&q=80',
          verse: 'O Senhor é a minha luz e a minha salvação; a quem temerei?',
          verseRef: 'Salmos 27:1',
        },
      ];
  }
}

interface HomeViewProps {
  onStart: () => void;
  onOpenAccessibility: () => void;
  onOpenAdmin?: () => void;
  brand: BrandConfig;
}

export default function HomeView({ onStart, onOpenAccessibility, onOpenAdmin, brand }: HomeViewProps) {
  const slides = getBrandSlides(brand);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    speakText(`Bem-vindo à ${brand.name} ${brand.campusName}. Toque na tela para iniciar o atendimento.`);
  }, [brand]);

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsTransitioning(false);
    }, 350);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    timerRef.current = setInterval(nextSlide, 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [nextSlide]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 5000);
  };

  const handleDotClick = (i: number) => {
    goToSlide(i);
    resetTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      const next = delta < 0
        ? (currentSlide + 1) % slides.length
        : (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(next);
      resetTimer();
    }
    touchStartX.current = null;
  };

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

  const slide = slides[currentSlide];

  return (
    <div
      className="relative h-screen w-full select-none overflow-hidden text-white"
      style={{ background: '#060814' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* === CAROUSEL SLIDES BACKGROUND === */}
      {slides.map((s, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0"
          style={{
            opacity: i === currentSlide ? 1 : 0,
            transition: 'opacity 0.7s ease-in-out',
          }}
        >
          <img
            src={s.bgUrl}
            alt={`Slide ${i + 1}`}
            className="h-full w-full object-cover"
            style={{ opacity: 0.38 }}
            referrerPolicy="no-referrer"
          />
          {/* Gradient navy profundo */}
          <div className="absolute inset-0" style={{
            background: `linear-gradient(
              to bottom,
              rgba(6,8,20,0.92) 0%,
              rgba(6,8,20,0.38) 35%,
              rgba(6,8,20,0.50) 65%,
              rgba(6,8,20,0.96) 100%
            )`
          }} />
          {/* Glow radial da marca */}
          <div className="absolute inset-0" style={{
            background: `radial-gradient(ellipse at 50% 48%, ${brand.glowColor} 0%, transparent 65%)`
          }} />
        </div>
      ))}

      {/* === TOP NAV === */}
      <nav className="absolute top-0 left-0 z-50 flex w-full justify-between items-center px-8 md:px-16 py-6">
        {/* Brand Switcher */}
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined font-light !text-lg text-white/40">swap_horizontal_circle</span>
          <select
            value={brand.id}
            onChange={(e) => {
              playTapSound();
              const url = new URL(window.location.href);
              url.searchParams.set('client', e.target.value);
              window.location.href = url.toString();
            }}
            className="bg-white/10 text-white border border-white/20 rounded-xl px-3 py-1.5 text-xs font-black uppercase tracking-wider focus:outline-none cursor-pointer backdrop-blur-md transition-all hover:bg-white/20"
            title="Selecionar Cliente"
          >
            <option value="atitude" className="bg-slate-900">Atitude</option>
            <option value="lagoinha" className="bg-slate-900">Lagoinha</option>
            <option value="universal" className="bg-slate-900">Universal</option>
            <option value="beityaacov" className="bg-slate-900">Beit Yaacov</option>
            <option value="ibmalphaville" className="bg-slate-900">IBM Alphaville</option>
          </select>
        </div>

        {/* Logo + Badge - Centro */}
        <div className="flex flex-col items-center mx-auto text-center absolute left-1/2 -translate-x-1/2">
          <div
            className="px-6 py-2.5 rounded-2xl border-2 bg-white/5 backdrop-blur-md flex items-center justify-center shadow-xl"
            style={{
              borderColor: brand.accentSplashColor,
              boxShadow: `0 0 18px ${brand.glowColor}, 0 0 36px ${brand.glowColor}`
            }}
          >
            <img
              src={brand.logoUrl}
              className={`h-12 object-contain ${brand.id === 'atitude' ? 'logo-white' : ''}`}
              alt={brand.name}
              referrerPolicy="no-referrer"
            />
          </div>
          <div
            className="mt-3 flex items-center gap-2 px-4 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-lg"
            style={{ backgroundColor: brand.badgeBgColor, color: brand.badgeTextColor }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: brand.badgeTextColor }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: brand.badgeTextColor }} />
            </span>
            <span>{brand.badgeLabel}</span>
          </div>
        </div>

        {/* Action Buttons - Direita */}
        <div className="flex gap-3">
          {onOpenAdmin && (
            <button type="button" onClick={() => { playTapSound(); onOpenAdmin(); }}
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
              title="Painel Admin"
            >
              <span className="material-symbols-outlined font-light !text-xl">settings</span>
            </button>
          )}
          <button type="button" onClick={() => handleAccessibilityClick('lang')}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined font-light !text-xl">language</span>
          </button>
          <button type="button" onClick={() => handleAccessibilityClick('access')}
            className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            <span className="material-symbols-outlined font-light !text-xl">accessibility_new</span>
          </button>
        </div>
      </nav>

      {/* === MAIN CONTENT === */}
      <main className="relative z-10 h-screen flex flex-col items-center justify-center px-6 text-center pt-20 pb-32">
        {/* Título + Versículo - anima na troca de slide */}
        <div
          className="mb-10 flex flex-col items-center"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? 'translateY(10px)' : 'translateY(0)',
            transition: 'opacity 0.35s ease, transform 0.35s ease',
          }}
        >
          <span
            className="text-sm uppercase tracking-[0.35em] font-black mb-3"
            style={{ color: brand.accentSplashColor }}
          >
            Bem-vindo
          </span>
          <h2
            className="font-sans text-[56px] md:text-[72px] text-white font-extrabold uppercase leading-none drop-shadow-2xl"
            style={{ letterSpacing: '0.12em' }}
          >
            {brand.name}
          </h2>
          <span className="text-[11px] uppercase tracking-[0.45em] font-black text-white/45 mt-3 mb-5">
            {brand.campusName}
          </span>
          <p className="font-sans text-base md:text-lg max-w-xl mx-auto leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            <em>"{slide.verse}"</em>
            <span className="block text-xs mt-2 font-bold uppercase tracking-widest" style={{ color: brand.accentSplashColor }}>
              — {slide.verseRef}
            </span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="relative flex flex-col items-center group cursor-pointer" onClick={handleStartClick}>
          <div
            className="absolute -inset-10 rounded-full blur-3xl opacity-30 transition-all duration-300 group-hover:opacity-50"
            style={{ backgroundColor: brand.accentSplashColor }}
          />
          <button
            type="button"
            className="relative w-[280px] md:w-[500px] h-20 md:h-24 text-white font-bold text-xl md:text-2xl flex items-center justify-center rounded-full border-4 hover:scale-105 transition-all cursor-pointer shadow-2xl active:scale-95 duration-150 ease-out animate-cta-pulse btn-shine"
            style={{
              background: `linear-gradient(135deg, ${brand.primaryColor}, ${brand.primaryColorHover})`,
              borderColor: `${brand.accentSplashColor}55`,
            }}
          >
            <span className="material-symbols-outlined !text-4xl mr-3 font-semibold animate-hand-bounce">
              touch_app
            </span>
            Como podemos ajudar você?
          </button>
          <div className="mt-5 flex gap-4 items-center">
            <span className="w-8 h-[1px] bg-white/25" />
            <span className="text-white/55 text-xs uppercase tracking-widest font-semibold animate-pulse">
              Toque para iniciar
            </span>
            <span className="w-8 h-[1px] bg-white/25" />
          </div>
        </div>
      </main>

      {/* === BOTTOM: DOTS + WIFI === */}
      <section className="absolute bottom-0 left-0 z-20 w-full pb-8 px-8 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">

          {/* Carousel Dots */}
          <div className="flex gap-3 items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleDotClick(i)}
                className="rounded-full cursor-pointer"
                style={{
                  width: i === currentSlide ? '28px' : '10px',
                  height: '10px',
                  backgroundColor: i === currentSlide ? brand.accentSplashColor : 'rgba(255,255,255,0.25)',
                  boxShadow: i === currentSlide
                    ? `0 0 10px ${brand.accentSplashColor}, 0 0 22px ${brand.glowColor}`
                    : 'none',
                  transition: 'all 0.4s ease',
                }}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* WiFi + Location */}
          <div className="flex items-center bg-white/5 backdrop-blur-md px-5 py-2.5 rounded-full text-white/90 text-xs font-medium border border-white/10 gap-4">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="material-symbols-outlined !text-base" style={{ color: brand.primaryColor }}>wifi</span>
              <span>{brand.wifi}</span>
            </div>
            <div className="w-[1px] h-4 bg-white/20" />
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined !text-base" style={{ color: brand.primaryColor }}>location_on</span>
              <span>{brand.type === 'synagogue' ? 'Salão de Orações' : 'Auditório Principal'}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
