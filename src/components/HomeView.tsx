import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { playTapSound } from '../utils/audio';
import { speakText } from '../utils/tts';
import { BrandConfig } from '../utils/brand';

/* ─── Types ─────────────────────────────────────────── */
interface Slide {
  bgUrl: string;
  verse: string;
  verseRef: string;
}

/* ─── Particle data (stable across renders) ─────────── */
interface ParticleData {
  id: number;
  left: string;
  top: string;
  size: string;
  delay: string;
  duration: string;
  opacity: string;
}

const PARTICLES: ParticleData[] = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left:     `${5  + (i * 5.3) % 90}%`,
  top:      `${10 + (i * 7.1) % 80}%`,
  size:     `${1.5 + (i % 4) * 0.7}px`,
  delay:    `${(i * 1.3) % 8}s`,
  duration: `${8 + (i % 5) * 2.5}s`,
  opacity:  `${0.15 + (i % 5) * 0.08}`,
}));

/* ─── Institutional slide images (no logos / branding) ─ */
function getBrandSlides(brand: BrandConfig): Slide[] {
  /* Neutral, architectural images only — no faces, no logos */
  const institutionalSlides = {
    atitude: [
      {
        bgUrl: 'https://igrejaatitude.com.br/wp-content/uploads/2025/03/hall-iba.png',
        verse: 'Mas o fruto do Espírito é amor, alegria, paz, paciência, amabilidade, bondade, fidelidade.',
        verseRef: 'Gálatas 5:22',
      },
      {
        bgUrl: 'https://igrejaatitude.com.br/wp-content/themes/ibatitude/images/welcome_image.png',
        verse: 'O Senhor é o meu pastor; de nada terei falta.',
        verseRef: 'Salmos 23:1',
      },
      {
        bgUrl: 'https://igrejaatitude.com.br/wp-content/uploads/2026/05/SITE_MARGEM_DE_SEGURANCA-v2.png',
        verse: 'Entrega o teu caminho ao Senhor; confia nele, e ele tudo fará.',
        verseRef: 'Salmos 37:5',
      },
    ],
    ibmalphaville: [
      {
        bgUrl: 'https://static.wixstatic.com/media/25a297_cdd52ddb9e2c4f8d975daee634ddf4e7~mv2.jpg/v1/fill/w_1600,h_1000,al_c/25a297_cdd52ddb9e2c4f8d975daee634ddf4e7~mv2.jpg',
        verse: 'E conhecereis a verdade, e a verdade vos libertará.',
        verseRef: 'João 8:32',
      },
      {
        bgUrl: 'https://static.wixstatic.com/media/25a297_23c72b225cde4d3cbdf6d25bf78440cc~mv2.jpg/v1/fill/w_1600,h_1000,al_c/25a297_23c72b225cde4d3cbdf6d25bf78440cc~mv2.jpg',
        verse: 'Buscai primeiro o reino de Deus e a sua justiça.',
        verseRef: 'Mateus 6:33',
      },
      {
        bgUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&auto=format&fit=crop&q=85',
        verse: 'Eu vim para que tenham vida, e a tenham em abundância.',
        verseRef: 'João 10:10',
      },
    ],
    lagoinha: [
      {
        bgUrl: 'https://static.wixstatic.com/media/nsplsh_684f463162576f65745f51~mv2_d_9000_6000_s_4_2.jpg/v1/fill/w_1600,h_1000,al_c/nsplsh_684f463162576f65745f51~mv2_d_9000_6000_s_4_2.jpg',
        verse: 'Louvai ao Senhor porque ele é bom; o seu amor é eterno.',
        verseRef: 'Salmos 107:1',
      },
      {
        bgUrl: 'https://static.wixstatic.com/media/d7e284_9980a324f46540919ac27aa5fd0dd79d~mv2.jpg/v1/fill/w_1600,h_1000,al_c/d7e284_9980a324f46540919ac27aa5fd0dd79d~mv2.jpg',
        verse: 'O Senhor é a minha força e o meu escudo.',
        verseRef: 'Salmos 28:7',
      },
      {
        bgUrl: 'https://static.wixstatic.com/media/d7e284_4ad952e22e284bf6b8724ea5a70c1b16~mv2.jpg/v1/fill/w_1600,h_1000,al_c/d7e284_4ad952e22e284bf6b8724ea5a70c1b16~mv2.jpg',
        verse: 'Alegrai-vos sempre no Senhor.',
        verseRef: 'Filipenses 4:4',
      },
    ],
    universal: [
      {
        bgUrl: 'https://portalwp.s3.amazonaws.com/wp-content/uploads/2026/05/27164318/Templo-de-Salomao-disponibiliza-atendimento-espiritual-diario-ao-publico-2.jpg',
        verse: 'Pedi e dar-se-vos-á; buscai e encontrareis.',
        verseRef: 'Mateus 7:7',
      },
      {
        bgUrl: 'https://portalwp.s3.amazonaws.com/wp-content/uploads/2026/05/29125252/Amadora-STOP-POBREZA-2.jpg',
        verse: 'Tudo posso naquele que me fortalece.',
        verseRef: 'Filipenses 4:13',
      },
      {
        bgUrl: 'https://portalwp.s3.amazonaws.com/wp-content/uploads/2026/05/19112324/Formatura-UNP-do-ABC_Maua3.jpg',
        verse: 'Se Deus é por nós, quem será contra nós?',
        verseRef: 'Romanos 8:31',
      },
    ],
    beityaacov: [
      {
        bgUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1920&auto=format&fit=crop&q=85',
        verse: 'Shemá Israel: Adonai Eloheinu, Adonai Echad.',
        verseRef: 'Deuteronômio 6:4',
      },
      {
        bgUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1920&auto=format&fit=crop&q=85',
        verse: 'A Torá é uma árvore de vida para quem a abraça.',
        verseRef: 'Provérbios 3:18',
      },
      {
        bgUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=1920&auto=format&fit=crop&q=85',
        verse: 'Que a luz do Eterno ilumine o teu caminho.',
        verseRef: 'Números 6:25',
      },
    ],
  };

  return institutionalSlides[brand.id as keyof typeof institutionalSlides]
    ?? institutionalSlides.atitude;
}

/* ─── Component Props ───────────────────────────────── */
interface HomeViewProps {
  onStart: () => void;
  onOpenAccessibility: () => void;
  onOpenAdmin?: () => void;
  brand: BrandConfig;
}

/* ─── HomeView ──────────────────────────────────────── */
export default function HomeView({
  onStart,
  onOpenAccessibility,
  onOpenAdmin,
  brand,
}: HomeViewProps) {
  const slides = useMemo(() => getBrandSlides(brand), [brand]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide,    setPrevSlide]    = useState<number | null>(null);
  const [isExiting,   setIsExiting]    = useState(false);
  const touchStartX = useRef<number | null>(null);
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Voice greeting */
  useEffect(() => {
    const t = setTimeout(() => {
      speakText(
        `Bem-vindo. Toque na tela para iniciar o atendimento.`
      );
    }, 800);
    return () => clearTimeout(t);
  }, [brand]);

  /* ── Slide transition ─────────────────────────────── */
  const goToSlide = useCallback((next: number) => {
    if (next === currentSlide) return;
    setPrevSlide(currentSlide);
    setIsExiting(true);
    setTimeout(() => {
      setCurrentSlide(next);
      setPrevSlide(null);
      setIsExiting(false);
    }, 700); // crossfade duration
  }, [currentSlide]);

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length);
  }, [currentSlide, slides.length, goToSlide]);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(nextSlide, 6000);
  }, [nextSlide]);

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startTimer]);

  /* ── Touch / swipe ───────────────────────────────── */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      const next = delta < 0
        ? (currentSlide + 1) % slides.length
        : (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(next);
      startTimer();
    }
    touchStartX.current = null;
  };

  /* ── Actions ─────────────────────────────────────── */
  const handleStart = () => { playTapSound(); onStart(); };
  const handleLang  = () => {
    playTapSound();
    speakText('Idioma selecionado: Português do Brasil.');
    alert('Idioma: Português (Brasil)');
  };
  const handleAccessibility = () => { playTapSound(); onOpenAccessibility(); };

  /* ── Brand switcher ──────────────────────────────── */
  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    playTapSound();
    const url = new URL(window.location.href);
    url.searchParams.set('client', e.target.value);
    window.location.href = url.toString();
  };

  const slide = slides[currentSlide];

  /* ── Accent / glow colour ────────────────────────── */
  const accent = '#F5C31E'; // Institutional generic yellow
  const glow   = 'rgba(245,195,30,0.25)';

  /* ── Logo icon (generic per type) ───────────────── */
  const logoIcon = brand.type === 'synagogue' ? 'synagogue' : 'church';

  return (
    <div
      className="relative h-screen w-full select-none overflow-hidden text-white"
      style={{ background: '#020617' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Totem de atendimento — Toque para iniciar"
      role="main"
    >

      {/* ════════════════════════════════════════════════
          LAYER 1 — Radial deep gradient (always visible)
          ════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `radial-gradient(
            circle at center,
            rgba(245,195,30,.08) 0%,
            rgba(15,23,42,.95)  40%,
            rgba(2,6,23,1)      100%
          )`,
        }}
        aria-hidden="true"
      />

      {/* ════════════════════════════════════════════════
          LAYER 2 — Particle system
          ════════════════════════════════════════════════ */}
      <div className="absolute inset-0 z-[2] overflow-hidden pointer-events-none" aria-hidden="true">
        {PARTICLES.map(p => (
          <div
            key={p.id}
            className="particle"
            style={{
              left:            p.left,
              top:             p.top,
              width:           p.size,
              height:          p.size,
              backgroundColor: accent,
              opacity:         p.opacity,
              animationDelay:    p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* ════════════════════════════════════════════════
          LAYER 3 — Fullscreen carousel (Ken Burns)
          ════════════════════════════════════════════════ */}
      {slides.map((s, i) => {
        const isActive = i === currentSlide;
        const isLeaving = i === prevSlide && isExiting;
        const visible = isActive || isLeaving;
        return (
          <div
            key={i}
            className="absolute inset-0 z-[3]"
            style={{
              opacity:    visible ? (isLeaving ? 0 : 1) : 0,
              transition: 'opacity 0.7s ease-in-out',
              willChange: 'opacity',
            }}
            aria-hidden="true"
          >
            {/* Image with Ken Burns */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={s.bgUrl}
                alt=""
                role="presentation"
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className={`h-full w-full object-cover ${isActive ? 'ken-burns' : ''}`}
                style={{ opacity: 0.45, willChange: 'transform' }}
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Cinematic overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  180deg,
                  rgba(5,15,35,.85)  0%,
                  rgba(5,15,35,.55)  40%,
                  rgba(5,15,35,.78)  100%
                )`,
              }}
            />
          </div>
        );
      })}

      {/* ════════════════════════════════════════════════
          LAYER 4 — Brand accent glow (central radial)
          ════════════════════════════════════════════════ */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 52%, ${glow} 0%, transparent 62%)`,
        }}
        aria-hidden="true"
      />

      {/* ════════════════════════════════════════════════
          TOP NAV
          ════════════════════════════════════════════════ */}
      <nav
        className="absolute top-0 left-0 z-50 w-full flex items-center justify-between px-8 md:px-16 py-5"
        aria-label="Navegação principal"
      >
        {/* Brand Switcher */}
        <div className="flex items-center gap-2" role="group" aria-label="Selecionar instituição">
          <span className="material-symbols-outlined !text-base text-white/35" aria-hidden="true">swap_horizontal_circle</span>
          <select
            value={brand.id}
            onChange={handleBrandChange}
            aria-label="Selecionar cliente"
            className="bg-white/8 text-white border border-white/15 rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider focus:outline-none focus:ring-2 cursor-pointer backdrop-blur-xl transition-all hover:bg-white/15"
            style={{ focusRingColor: accent } as React.CSSProperties}
          >
            <option value="atitude"      className="bg-slate-900">Atitude</option>
            <option value="lagoinha"     className="bg-slate-900">Lagoinha</option>
            <option value="universal"    className="bg-slate-900">Universal</option>
            <option value="beityaacov"   className="bg-slate-900">Beit Yaacov</option>
            <option value="ibmalphaville" className="bg-slate-900">IBM Alphaville</option>
          </select>
        </div>

        {/* ── Logo placeholder (centre, absolutely positioned) ── */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          {/* Actual brand logo requested by user */}
          <div
            className="logo-ring-pulse px-6 py-2.5 rounded-2xl flex items-center justify-center bg-white/5 backdrop-blur-xl"
            style={{
              border: `2px solid ${accent}`,
            }}
            role="img"
            aria-label={`${brand.name} — Totem de Atendimento`}
          >
            <img
              src={brand.logoUrl}
              className={`h-12 object-contain ${brand.id === 'atitude' ? 'logo-white' : ''}`}
              alt={brand.name}
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Badge pill */}
          <div
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-extrabold uppercase tracking-widest backdrop-blur-xl"
            style={{
              background: 'rgba(245,195,30,.18)',
              border:     '1px solid rgba(245,195,30,.35)',
              color:      accent,
            }}
            role="status"
            aria-label={brand.badgeLabel}
          >
            {/* Pulsing dot */}
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span
                className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full"
                style={{ backgroundColor: accent }}
              />
              <span
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: accent }}
              />
            </span>
            <span>{brand.badgeLabel}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2" role="group" aria-label="Ações">
          {onOpenAdmin && (
            <button
              type="button"
              onClick={() => { playTapSound(); onOpenAdmin(); }}
              className="w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 border border-white/12 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer backdrop-blur-xl"
              aria-label="Abrir painel administrativo"
              title="Admin"
            >
              <span className="material-symbols-outlined font-light !text-xl" aria-hidden="true">settings</span>
            </button>
          )}
          <button
            type="button"
            onClick={handleLang}
            className="w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 border border-white/12 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer backdrop-blur-xl"
            aria-label="Mudar idioma"
            title="Idioma"
          >
            <span className="material-symbols-outlined font-light !text-xl" aria-hidden="true">language</span>
          </button>
          <button
            type="button"
            onClick={handleAccessibility}
            className="w-11 h-11 rounded-full bg-white/8 hover:bg-white/18 border border-white/12 hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer backdrop-blur-xl"
            aria-label="Abrir opções de acessibilidade"
            title="Acessibilidade"
          >
            <span className="material-symbols-outlined font-light !text-xl" aria-hidden="true">accessibility_new</span>
          </button>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════════════ */}
      <main
        className="relative z-40 h-screen flex flex-col items-center justify-center px-8 text-center"
        style={{ paddingTop: '5rem', paddingBottom: '6rem' }}
      >
        {/* Title block — animates on slide change */}
        <div
          className="mb-10 flex flex-col items-center"
          style={{
            opacity:    slide ? 1 : 0,
            transform:  slide ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity .5s ease, transform .5s ease',
          }}
        >
          {/* Eyebrow */}
          <span
            className="uppercase tracking-[0.4em] font-black mb-4 slide-reveal"
            style={{ color: accent, fontSize: '24px', fontWeight: 600 }}
          >
            Bem-vindo
          </span>

          {/* H1 — 64px / 800 / letter-spacing 4px */}
          <h1
            className="font-sans text-white font-extrabold uppercase leading-none drop-shadow-2xl slide-reveal"
            style={{
              fontSize:      '64px',
              fontWeight:    800,
              letterSpacing: '4px',
              lineHeight:    1,
              animationDelay: '0.08s',
            }}
          >
            {brand.name}
          </h1>

          {/* Campus subtitle */}
          <p
            className="uppercase tracking-[0.5em] text-white mt-3 mb-6 slide-reveal"
            style={{ fontSize: '24px', fontWeight: 600, color: '#F5C31E', animationDelay: '0.16s' }}
          >
            {brand.campusName}
          </p>

          {/* Verse */}
          <div
            className="max-w-lg mx-auto slide-reveal"
            style={{ animationDelay: '0.24s' }}
          >
            <p
              className="font-sans text-base md:text-lg leading-relaxed italic"
              style={{ color: 'rgba(255,255,255,0.75)' }}
            >
              "{slide.verse}"
            </p>
            <span
              className="block text-xs mt-2 font-bold uppercase tracking-widest not-italic"
              style={{ color: accent }}
            >
              — {slide.verseRef}
            </span>
          </div>
        </div>

        {/* ── CTA Button ─────────────────────────────── */}
        <div
          className="relative flex flex-col items-center group cursor-pointer slide-reveal"
          style={{ animationDelay: '0.36s' }}
          onClick={handleStart}
          role="button"
          tabIndex={0}
          aria-label="Tocar para iniciar o atendimento"
          onKeyDown={(e) => e.key === 'Enter' && handleStart()}
        >
          {/* Ambient glow behind button */}
          <div
            className="absolute -inset-8 rounded-full blur-3xl opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none"
            style={{ backgroundColor: accent }}
            aria-hidden="true"
          />

          <button
            type="button"
            className="relative w-[280px] md:w-[520px] h-20 md:h-24 text-white font-bold text-xl md:text-2xl flex items-center justify-center rounded-full border-2 hover:scale-[1.03] active:scale-[0.97] transition-transform duration-150 cursor-pointer shadow-2xl animate-cta-pulse btn-shine"
            style={{
              background:   `linear-gradient(135deg, ${brand.primaryColor} 0%, ${brand.primaryColorHover} 100%)`,
              borderColor:  `${accent}55`,
              fontFamily:   'Inter, Segoe UI, Roboto, Arial, sans-serif',
              fontWeight:   700,
            }}
            aria-label="Iniciar atendimento"
          >
            <span
              className="material-symbols-outlined !text-4xl mr-3 animate-hand-bounce"
              aria-hidden="true"
            >
              touch_app
            </span>
            Como podemos ajudar você?
          </button>

          {/* Tap prompt */}
          <div className="mt-5 flex items-center gap-3" aria-hidden="true">
            <span className="w-8 h-px bg-white/20" />
            <span className="text-white/45 text-xs uppercase tracking-[0.3em] font-semibold animate-pulse">
              Toque para iniciar
            </span>
            <span className="w-8 h-px bg-white/20" />
          </div>
        </div>
      </main>

      {/* ════════════════════════════════════════════════
          BOTTOM RAIL — Dots + WiFi/Location
          ════════════════════════════════════════════════ */}
      <footer
        className="absolute bottom-0 left-0 z-50 w-full pb-6 px-8 md:px-16"
        aria-label="Informações de conexão e navegação do carrossel"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">

          {/* ── Carousel dots ─────────────────────────── */}
          <div
            className="flex items-center gap-3"
            role="tablist"
            aria-label="Slides do carrossel"
          >
            {slides.map((s, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === currentSlide}
                aria-label={`Slide ${i + 1}: ${s.verseRef}`}
                onClick={() => { goToSlide(i); startTimer(); }}
                className="cursor-pointer"
                style={{
                  width:           i === currentSlide ? '28px' : '10px',
                  height:          '10px',
                  borderRadius:    '999px',
                  backgroundColor: i === currentSlide
                    ? accent
                    : 'rgba(255,255,255,0.25)',
                  boxShadow: i === currentSlide
                    ? `0 0 8px rgba(245,195,30,.40), 0 0 16px rgba(245,195,30,.20)`
                    : 'none',
                  transition: 'all 0.4s cubic-bezier(.4,0,.2,1)',
                  border: 'none',
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* ── WiFi + Location pill ──────────────────── */}
          <div
            className="flex items-center bg-white/5 backdrop-blur-xl px-5 py-2 rounded-full text-white/80 text-xs font-medium border border-white/10 gap-4"
            aria-label="Informações do local"
          >
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              <span className="material-symbols-outlined !text-sm" style={{ color: accent }} aria-hidden="true">wifi</span>
              <span>{brand.wifi}</span>
            </div>
            <div className="w-px h-4 bg-white/15" aria-hidden="true" />
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined !text-sm" style={{ color: accent }} aria-hidden="true">location_on</span>
              <span>
                {brand.type === 'synagogue' ? 'Salão de Orações' : 'Auditório Principal'}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
