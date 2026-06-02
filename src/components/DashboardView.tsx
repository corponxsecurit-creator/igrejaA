import React from 'react';
import { ViewState } from '../types';
import { playTapSound } from '../utils/audio';
import LiveClock from './LiveClock';
import { speakText } from '../utils/tts';
import { BrandConfig } from '../utils/brand';

/* ─── Particle data ─────────── */
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left:     `${5  + (i * 5.3) % 90}%`,
  top:      `${10 + (i * 7.1) % 80}%`,
  size:     `${1.5 + (i % 4) * 0.7}px`,
  delay:    `${(i * 1.3) % 8}s`,
  duration: `${8 + (i % 5) * 2.5}s`,
  opacity:  `${0.15 + (i % 5) * 0.08}`,
}));

interface DashboardViewProps {
  onSelectView: (view: ViewState) => void;
  onGoHome: () => void;
  onOpenAccessibility: () => void;
  onOpenAdmin?: () => void;
  brand: BrandConfig;
}

export default function DashboardView({ onSelectView, onGoHome, onOpenAccessibility, onOpenAdmin, brand }: DashboardViewProps) {
  const handleSelect = (view: ViewState) => {
    playTapSound();
    onSelectView(view);
  };

  const handleHomeClick = () => {
    playTapSound();
    onGoHome();
  };

  const handleHelpClick = () => {
    playTapSound();
    speakText(`Ajuda solicitada. Se precisar de auxílio com o totem da ${brand.name}, chame um de nossos voluntários no saguão.`);
    alert(`Este é um totem de atendimento inteligente. Se precisar de ajuda física, chame um de nossos voluntários no saguão principal.`);
  };

  const handleAccessibilityClick = () => {
    playTapSound();
    onOpenAccessibility();
  };

  const accent = '#F5C31E'; // Institutional generic yellow

  return (
    <div className="relative min-h-screen bg-[#020617] text-white flex flex-col justify-between overflow-x-hidden animate-fade-in font-sans">
      
      {/* ════════════════════════════════════════════════
          BACKGROUND LAYER 1 — Radial deep gradient
          ════════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 z-0 pointer-events-none"
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

      {/* Background Image with Dark Glassmorphism Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 opacity-60"
        style={{ backgroundImage: `url(${brand.dashboardBgUrl || brand.bgUrl})`, filter: 'blur(8px)' }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#020617]/60 via-[#020617]/50 to-[#020617]/80 backdrop-blur-xl" />

      {/* Particle background system (subtle) */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 mix-blend-screen">
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

      {/* Top App Bar inside main panel */}
      <nav className="fixed top-0 left-0 w-full z-40 flex justify-between items-center px-8 md:px-20 py-4 bg-white/5 backdrop-blur-xl shadow-sm border-b border-white/10">
        <div className="flex items-center gap-3">
          <img 
            src={brand.logoUrl} 
            className={`h-12 object-contain ${['atitude', 'ibmalphaville'].includes(brand.id) ? 'logo-white' : ''}`} 
            alt={brand.name} 
            referrerPolicy="no-referrer"
          />
          <span className="text-xs uppercase tracking-[0.25em] font-black mt-1" style={{ color: accent }}>
            {brand.campusName}
          </span>
        </div>

        {/* Relógio Digital de Totem em Tempo Real */}
        <div className="hidden md:block">
          <LiveClock />
        </div>
        
        <div className="flex gap-4 text-white">
          <button 
            type="button" 
            className="flex items-center gap-2 text-white/90 hover:bg-white/10 p-3 rounded-lg transition-all active:scale-95 text-sm font-semibold cursor-pointer"
            onClick={() => handleSelect('pastoral')}
          >
            <span className="material-symbols-outlined !text-xl" style={{ color: accent }}>volunteer_activism</span>
            <span>{brand.termPastoral}</span>
          </button>
        </div>
      </nav>


      {/* Main Grid Area */}
      <main className="flex-grow pt-32 pb-40 px-6 md:px-12 w-full max-w-[1400px] mx-auto flex flex-col justify-center relative z-10">
        
        {/* Header Title */}
        <header className="mb-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-2 drop-shadow-lg">
            Bem-vindo à {brand.name}
          </h2>
          <p className="text-lg md:text-xl text-white/80 font-medium tracking-wide">
            Como podemos caminhar com você hoje?
          </p>
        </header>

        {/* Bento Grid Layout - Tighter gap, better proportions */}
        <div className="grid grid-cols-12 gap-4 w-full">
          
          {/* SOU NOVO AQUI */}
          <button
            type="button"
            onClick={() => handleSelect('new_member')}
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-white/10 backdrop-blur-2xl border border-white/20 hover:border-indigo-400/60 hover:bg-indigo-900/40 text-white rounded-[2rem] p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl min-h-[220px] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="material-symbols-outlined !text-[48px] text-indigo-300 group-hover:text-indigo-200 group-hover:scale-110 transition-transform duration-500 drop-shadow-md z-10">
              person_add
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-white/60 block mb-1">Membro ou Visitante</span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block drop-shadow-sm">{brand.termMember}</span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.07] group-hover:opacity-[0.15] text-white transition-all duration-500 group-hover:rotate-12 group-hover:scale-125 z-0">
              <span className="material-symbols-outlined !text-[160px]">id_card</span>
            </div>
          </button>

          {/* DOACAO / CONTRIBUICAO */}
          <button
            type="button"
            onClick={() => handleSelect('donations')}
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-white/10 backdrop-blur-2xl border border-white/20 hover:border-amber-400/60 hover:bg-amber-900/40 text-white rounded-[2rem] p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl min-h-[220px] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="material-symbols-outlined !text-[48px] text-amber-300 group-hover:text-amber-200 group-hover:scale-110 transition-transform duration-500 drop-shadow-md z-10">
              payments
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-white/60 block mb-1">{brand.termDonations}</span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block drop-shadow-sm">{brand.termDonation}</span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.07] group-hover:opacity-[0.15] text-white transition-all duration-500 group-hover:-rotate-12 group-hover:scale-125 z-0">
              <span className="material-symbols-outlined !text-[160px]">qr_code</span>
            </div>
          </button>

          {/* QUERO PARTICIPAR */}
          <button
            type="button"
            onClick={() => handleSelect('ministries')}
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-white/10 backdrop-blur-2xl border border-white/20 hover:border-cyan-400/60 hover:bg-cyan-900/40 text-white rounded-[2rem] p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl min-h-[220px] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="material-symbols-outlined !text-[48px] text-cyan-300 group-hover:text-cyan-200 group-hover:scale-110 transition-transform duration-500 drop-shadow-md z-10">
              groups
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-white/60 block mb-1">
                {brand.type === 'synagogue' ? 'Engajamento & Mitzvot' : 'Voluntariado'}
              </span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block drop-shadow-sm">Participar</span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.07] group-hover:opacity-[0.15] text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-125 z-0">
              <span className="material-symbols-outlined !text-[160px]">handshake</span>
            </div>
          </button>

          {/* EVENTOS / CULTOS */}
          <button
            type="button"
            onClick={() => handleSelect('checkin')}
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-white/10 backdrop-blur-2xl border border-white/20 hover:border-emerald-400/60 hover:bg-emerald-900/40 text-white rounded-[2rem] p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl min-h-[220px] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-emerald-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="material-symbols-outlined !text-[48px] text-emerald-300 group-hover:text-emerald-200 group-hover:scale-110 transition-transform duration-500 drop-shadow-md z-10">
              calendar_month
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-white/60 block mb-1">
                {brand.type === 'synagogue' ? 'Shabat & Festividades' : 'Agenda & Encontros'}
              </span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block drop-shadow-sm">{brand.termCults}</span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.07] group-hover:opacity-[0.15] text-white transition-all duration-500 group-hover:-rotate-6 group-hover:scale-125 z-0">
              <span className="material-symbols-outlined !text-[160px]">event</span>
            </div>
          </button>

          {/* MY CELL / CONEXÃO GRUPOS */}
          <button
            type="button"
            onClick={() => handleSelect('my_cell')}
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-white/10 backdrop-blur-2xl border border-white/20 hover:border-slate-400/60 hover:bg-slate-800/60 text-white rounded-[2rem] p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl min-h-[220px] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-bl from-slate-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="material-symbols-outlined !text-[48px] text-slate-300 group-hover:text-white group-hover:scale-110 transition-transform duration-500 drop-shadow-md z-10">
              diversity_3
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-white/60 block mb-1">
                {brand.type === 'synagogue' ? 'Grupos de Estudo' : 'Conexão Grupos'}
              </span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block drop-shadow-sm line-clamp-2">
                {brand.termConnects}
              </span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.07] group-hover:opacity-[0.15] text-white transition-all duration-500 group-hover:scale-125 z-0">
              <span className="material-symbols-outlined !text-[160px]">hub</span>
            </div>
          </button>

          {/* PEDIDO DE ORAÇÃO */}
          <button
            type="button"
            onClick={() => handleSelect('prayer')}
            className="col-span-12 md:col-span-6 lg:col-span-4 bg-white/10 backdrop-blur-2xl border border-white/20 hover:border-rose-400/60 hover:bg-rose-900/40 text-white rounded-[2rem] p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-2xl min-h-[220px] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="material-symbols-outlined !text-[48px] text-rose-300 group-hover:text-rose-200 group-hover:scale-110 transition-transform duration-500 drop-shadow-md z-10">
              volunteer_activism
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-white/60 block mb-1">Intercessão</span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block drop-shadow-sm">
                {brand.type === 'synagogue' ? 'Pedido de Rezas' : 'Pedido de Oração'}
              </span>
            </div>
            <div className="absolute -right-4 -bottom-4 opacity-[0.07] group-hover:opacity-[0.15] text-white transition-all duration-500 group-hover:-rotate-12 group-hover:scale-125 z-0">
              <span className="material-symbols-outlined !text-[160px]">chat</span>
            </div>
          </button>

        </div>
      </main>

      {/* Floating Glass Dock Footer */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 p-2 bg-white/10 backdrop-blur-2xl shadow-2xl rounded-[2rem] border border-white/20">
        
        {/* Início */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-400 hover:to-red-500 text-white rounded-full px-6 py-3 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-rose-500/25 active:scale-95 font-bold font-sans"
        >
          <span className="material-symbols-fill !text-xl">home</span>
          <span className="text-[13px] uppercase tracking-wider">Início</span>
        </button>

        {/* Voltar */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all duration-200 active:scale-95 cursor-pointer font-bold font-sans border border-transparent hover:border-white/10"
          title="Voltar"
        >
          <span className="material-symbols-outlined !text-xl">arrow_back</span>
        </button>

        <div className="w-px h-8 bg-white/10 mx-1" aria-hidden="true" />

        {/* Ajuda */}
        <button
          type="button"
          onClick={handleHelpClick}
          className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all duration-200 active:scale-95 cursor-pointer font-bold font-sans border border-transparent hover:border-white/10"
          title="Ajuda"
        >
          <span className="material-symbols-outlined !text-xl">help_outline</span>
        </button>

        {/* Acessibilidade */}
        <button
          type="button"
          onClick={handleAccessibilityClick}
          className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all duration-200 active:scale-95 cursor-pointer font-bold font-sans border border-transparent hover:border-white/10"
          title="Acessibilidade"
        >
          <span className="material-symbols-outlined !text-xl">settings_accessibility</span>
        </button>

        {/* Administração */}
        {onOpenAdmin && (
          <button
            type="button"
            onClick={() => {
              playTapSound();
              onOpenAdmin();
            }}
            className="w-12 h-12 flex items-center justify-center text-white/80 hover:text-white bg-white/5 hover:bg-white/20 rounded-full transition-all duration-200 active:scale-95 cursor-pointer font-bold font-sans border border-transparent hover:border-white/10"
            title="Admin"
          >
            <span className="material-symbols-outlined !text-xl">admin_panel_settings</span>
          </button>
        )}
      </footer>

    </div>
  );
}

