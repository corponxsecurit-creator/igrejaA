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
      <main className="flex-grow pt-28 pb-36 px-6 md:px-20 max-w-7xl mx-auto w-full flex flex-col justify-center relative z-10">
        {/* Header Title */}
        <header className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 animate-fade-in">
            Bem-vindo à {brand.name}
          </h2>
          <p className="text-base md:text-lg text-white/75 font-medium">
            Como podemos caminhar com você hoje?
          </p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-5 md:gap-6 w-full">
          
          {/* SOU NOVO AQUI / NOVO MEMBRO */}
          <button
            type="button"
            onClick={() => handleSelect('new_member')}
            className="col-span-12 md:col-span-8 bg-gradient-to-br from-indigo-900/80 to-violet-900/90 backdrop-blur-lg text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl min-h-[190px] md:min-h-[220px] relative overflow-hidden group border border-indigo-400/20 hover:border-indigo-400/40"
          >
            <span className="material-symbols-outlined !text-[56px] text-indigo-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              person_add
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-indigo-200/80 block mb-1">Membro ou Visitante</span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block drop-shadow-sm">{brand.termMember}</span>
            </div>
            <div className="absolute right-6 bottom-6 opacity-10 text-white mix-blend-overlay">
              <span className="material-symbols-outlined !text-[120px]">id_card</span>
            </div>
          </button>

          {/* PEDIDO DE ORAÇÃO */}
          <button
            type="button"
            onClick={() => handleSelect('prayer')}
            className="col-span-12 md:col-span-4 bg-gradient-to-br from-rose-900/80 to-red-900/90 backdrop-blur-lg text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl min-h-[190px] md:min-h-[220px] relative overflow-hidden group border border-rose-400/20 hover:border-rose-400/40"
          >
            <span className="material-symbols-outlined !text-[56px] text-rose-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              volunteer_activism
            </span>
            <div className="text-left mt-4">
              <span className="text-xs tracking-widest uppercase font-bold text-rose-200/80 block mb-1">Intercessão</span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block leading-tight drop-shadow-sm">
                {brand.type === 'synagogue' ? 'Pedido de Rezas' : 'Pedido de Oração'}
              </span>
            </div>
            <div className="absolute right-6 bottom-6 opacity-10 text-white animate-pulse mix-blend-overlay">
              <span className="material-symbols-outlined !text-[100px]">chat</span>
            </div>
          </button>

          {/* EVENTOS / CULTOS */}
          <button
            type="button"
            onClick={() => handleSelect('checkin')}
            className="col-span-12 md:col-span-4 bg-gradient-to-br from-emerald-900/80 to-teal-900/90 backdrop-blur-lg text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl min-h-[190px] md:min-h-[220px] group border border-emerald-400/20 hover:border-emerald-400/40 relative overflow-hidden"
          >
            <span className="material-symbols-outlined !text-[56px] text-emerald-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              calendar_month
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-emerald-200/80 block mb-1">
                {brand.type === 'synagogue' ? 'Shabat & Festividades' : 'Agenda & Encontros'}
              </span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block drop-shadow-sm">{brand.termCults}</span>
            </div>
            <div className="absolute right-6 bottom-6 opacity-10 text-white mix-blend-overlay">
              <span className="material-symbols-outlined !text-[100px]">event</span>
            </div>
          </button>

          {/* DOACAO / CONTRIBUICAO */}
          <button
            type="button"
            onClick={() => handleSelect('donations')}
            className="col-span-12 md:col-span-8 bg-gradient-to-br from-amber-800/80 to-orange-900/90 backdrop-blur-lg text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl min-h-[190px] md:min-h-[220px] relative overflow-hidden group border border-amber-400/20 hover:border-amber-400/40"
          >
            <span className="material-symbols-outlined !text-[56px] text-amber-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              payments
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-amber-200/80 block mb-1">{brand.termDonations}</span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block drop-shadow-sm">{brand.termDonation}</span>
            </div>
            <div className="absolute right-6 bottom-6 opacity-10 text-white mix-blend-overlay">
              <span className="material-symbols-outlined !text-[120px]">qr_code</span>
            </div>
          </button>

          {/* QUERO PARTICIPAR */}
          <button
            type="button"
            onClick={() => handleSelect('ministries')}
            className="col-span-12 md:col-span-6 bg-gradient-to-br from-cyan-900/80 to-blue-900/90 backdrop-blur-lg text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl min-h-[180px] md:min-h-[200px] relative overflow-hidden group border border-cyan-400/20 hover:border-cyan-400/40"
          >
            <span className="material-symbols-outlined !text-[52px] text-cyan-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              groups
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-cyan-200/80 block mb-1">
                {brand.type === 'synagogue' ? 'Engajamento & Mitzvot' : 'Voluntariado'}
              </span>
              <span className="text-xl md:text-2xl font-black uppercase tracking-wider block drop-shadow-sm">Quero Participar</span>
            </div>
            <div className="absolute right-6 bottom-6 opacity-10 text-white mix-blend-overlay">
              <span className="material-symbols-outlined !text-[100px]">handshake</span>
            </div>
          </button>

          {/* CHECK-IN */}
          <button
            type="button"
            onClick={() => handleSelect('checkin')}
            className="col-span-12 md:col-span-3 bg-gradient-to-br from-fuchsia-900/80 to-purple-900/90 backdrop-blur-lg text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl min-h-[180px] md:min-h-[200px] border border-fuchsia-400/20 hover:border-fuchsia-400/40 relative overflow-hidden group"
          >
            <span className="material-symbols-outlined !text-[52px] text-fuchsia-300 group-hover:rotate-6 transition-transform drop-shadow-md">
              how_to_reg
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-fuchsia-200/80 block mb-1">
                {brand.type === 'synagogue' ? 'Registrar Presença' : 'Confirmar Presença'}
              </span>
              <span className="text-xl md:text-2xl font-black uppercase tracking-wider block drop-shadow-sm">Check-in</span>
            </div>
            <div className="absolute right-6 bottom-6 opacity-10 text-white mix-blend-overlay">
              <span className="material-symbols-outlined !text-[80px]">task_alt</span>
            </div>
          </button>

          {/* MY CELL / CONEXÃO GRUPOS */}
          <button
            type="button"
            onClick={() => handleSelect('my_cell')}
            className="col-span-12 md:col-span-3 bg-gradient-to-br from-slate-800/80 to-zinc-900/90 backdrop-blur-lg text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl min-h-[180px] md:min-h-[200px] border border-slate-400/20 hover:border-slate-400/40 relative overflow-hidden group"
          >
            <span className="material-symbols-outlined !text-[52px] text-slate-300 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
              diversity_3
            </span>
            <div className="text-left mt-4 z-10 w-full">
              <span className="text-xs tracking-widest uppercase font-bold text-slate-400 block mb-1 truncate">
                {brand.type === 'synagogue' ? 'Grupos de Estudo' : 'Conexão Grupos'}
              </span>
              <span className="text-lg font-black uppercase tracking-wide block leading-tight line-clamp-2 break-words drop-shadow-sm">
                {brand.termConnects}
              </span>
            </div>
            <div className="absolute right-6 bottom-6 opacity-10 text-white mix-blend-overlay">
              <span className="material-symbols-outlined !text-[80px]">hub</span>
            </div>
          </button>

          {/* ATENDIMENTO PASTORAL */}
          <button
            type="button"
            onClick={() => handleSelect('pastoral')}
            className="col-span-12 bg-white/5 hover:bg-white/10 backdrop-blur-md text-white rounded-3xl p-6 flex items-center justify-between cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl md:min-h-[120px] border border-white/10 hover:border-white/20 group overflow-hidden relative"
          >
            <div className="flex items-center gap-6 z-10">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm border border-white/5">
                <span className="material-symbols-outlined !text-[36px] group-hover:scale-110 transition-transform">chat_bubble</span>
              </div>
              <div className="text-left">
                <span className="font-sans text-xs uppercase tracking-widest font-bold text-white/60 block mb-1">
                  {brand.type === 'synagogue' ? 'Orientação Espiritual' : 'Conselhamento'}
                </span>
                <span className="text-xl md:text-2xl font-black uppercase tracking-wider block drop-shadow-sm">
                  {brand.termPastoral}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-white/50 group-hover:text-white/90 transition-colors">
              <span className="text-sm font-bold tracking-widest uppercase hidden md:inline">Iniciar Conversa</span>
              <span className="material-symbols-outlined !text-4xl group-hover:translate-x-1.5 transition-transform">
                arrow_forward_ios
              </span>
            </div>
          </button>

        </div>
      </main>

      {/* Shared Kiosk Bottom NavBar */}
      <footer className="fixed bottom-0 left-0 w-full z-45 h-28 flex justify-around items-center px-6 md:px-20 pb-4 bg-white shadow-lg rounded-t-3xl border-t border-[#c4c6ce]">
        {/* Início */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center bg-brand-red hover:bg-brand-red-hover text-white rounded-full px-10 py-2.5 scale-95 hover:scale-100 transition-all duration-150 cursor-pointer shadow-md font-bold font-sans"
        >
          <span className="material-symbols-fill !text-2xl">home</span>
          <span className="text-[12px] uppercase tracking-wider mt-0.5">Início</span>
        </button>

        {/* Voltar */}
        <button
          type="button"
          onClick={handleHomeClick}
          className="flex flex-col items-center justify-center text-[#43474d] hover:bg-slate-100 px-8 py-3 rounded-2xl transition-all active:scale-95 cursor-pointer font-bold font-sans"
        >
          <span className="material-symbols-outlined !text-2xl">arrow_back</span>
          <span className="text-[12px] uppercase tracking-wider mt-0.5">Voltar</span>
        </button>

        {/* Ajuda */}
        <button
          type="button"
          onClick={handleHelpClick}
          className="flex flex-col items-center justify-center text-[#43474d] hover:bg-slate-100 px-8 py-3 rounded-2xl transition-all active:scale-95 cursor-pointer font-bold font-sans"
        >
          <span className="material-symbols-outlined !text-2xl">help_outline</span>
          <span className="text-[12px] uppercase tracking-wider mt-0.5">Ajuda</span>
        </button>

        {/* Acessibilidade */}
        <button
          type="button"
          onClick={handleAccessibilityClick}
          className="flex flex-col items-center justify-center text-[#43474d] hover:bg-slate-100 px-8 py-3 rounded-2xl transition-all active:scale-95 cursor-pointer font-bold font-sans"
        >
          <span className="material-symbols-outlined !text-2xl">settings_accessibility</span>
          <span className="text-[12px] uppercase tracking-wider mt-0.5">Acessibilidade</span>
        </button>

        {/* Administração */}
        {onOpenAdmin && (
          <button
            type="button"
            onClick={() => {
              playTapSound();
              onOpenAdmin();
            }}
            className="flex flex-col items-center justify-center text-[#43474d] hover:bg-slate-100 px-8 py-3 rounded-2xl transition-all active:scale-95 cursor-pointer font-bold font-sans"
          >
            <span className="material-symbols-outlined !text-2xl">admin_panel_settings</span>
            <span className="text-[12px] uppercase tracking-wider mt-0.5">Admin</span>
          </button>
        )}
      </footer>

    </div>
  );
}

