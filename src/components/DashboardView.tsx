import React from 'react';
import { ViewState } from '../types';
import { playTapSound } from '../utils/audio';
import LiveClock from './LiveClock';
import { speakText } from '../utils/tts';
import { BrandConfig } from '../utils/brand';

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

  return (
    <div className="relative min-h-screen bg-brand-light text-[#191c1e] flex flex-col justify-between overflow-x-hidden animate-fade-in font-sans">
      
      {/* Top App Bar inside main panel */}
      <nav className="fixed top-0 left-0 w-full z-45 flex justify-between items-center px-8 md:px-20 py-4 bg-white/90 backdrop-blur-md shadow-sm border-b border-[#eceef1]">
        <div className="flex items-center gap-2">
          <img 
            src={brand.logoUrl} 
            className="h-12 object-contain" 
            alt={brand.name} 
          />
          <span className="text-xs uppercase tracking-[0.25em] font-black text-brand-red mt-1">
            {brand.campusName}
          </span>
        </div>

        {/* Relógio Digital de Totem em Tempo Real */}
        <div className="hidden md:block">
          <LiveClock />
        </div>
        
        <div className="flex gap-4">
          <button 
            type="button" 
            className="flex items-center gap-2 text-slate-600 hover:bg-slate-100 p-3 rounded-lg transition-all active:scale-95 text-sm font-semibold cursor-pointer"
            onClick={() => handleSelect('pastoral')}
          >
            <span className="material-symbols-outlined !text-xl text-brand-red">volunteer_activism</span>
            <span>{brand.termPastoral}</span>
          </button>
        </div>
      </nav>


      {/* Main Grid Area */}
      <main className="flex-grow pt-28 pb-36 px-6 md:px-20 max-w-7xl mx-auto w-full flex flex-col justify-center">
        {/* Header Title */}
        <header className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight mb-2 animate-fade-in">
            Bem-vindo à {brand.name}
          </h2>
          <p className="text-base md:text-lg text-[#43474d] font-medium">
            Como podemos caminhar com você hoje?
          </p>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-5 md:gap-6 w-full">
          
          {/* SOU NOVO AQUI / NOVO MEMBRO */}
          <button
            type="button"
            onClick={() => handleSelect('new_member')}
            className="col-span-12 md:col-span-8 bg-brand-dark text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md hover:shadow-lg min-h-[190px] md:min-h-[220px] relative overflow-hidden group border border-[#121212]"
          >
            <span className="material-symbols-outlined !text-[56px] text-brand-red group-hover:scale-110 transition-transform duration-300">
              person_add
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-slate-400 block mb-1">Membro ou Visitante</span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block">{brand.termMember}</span>
            </div>
            <div className="absolute right-6 bottom-6 opacity-15 text-white">
              <span className="material-symbols-outlined !text-[120px]">id_card</span>
            </div>
          </button>

          {/* PEDIDO DE ORAÇÃO */}
          <button
            type="button"
            onClick={() => handleSelect('prayer')}
            className="col-span-12 md:col-span-4 bg-brand-red text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md min-h-[190px] md:min-h-[220px] relative overflow-hidden group border-2 border-brand-red-hover"
          >
            <span className="material-symbols-outlined !text-[56px] text-white group-hover:scale-110 transition-transform duration-300">
              volunteer_activism
            </span>
            <div className="text-left mt-4">
              <span className="text-xs tracking-widest uppercase font-bold text-white/80 block mb-1">Intercessão</span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block leading-tight">
                {brand.type === 'synagogue' ? 'Pedido de Rezas' : 'Pedido de Oração'}
              </span>
            </div>
            <div className="absolute right-6 bottom-6 opacity-10 text-white animate-pulse">
              <span className="material-symbols-outlined !text-[100px]">chat</span>
            </div>
          </button>

          {/* EVENTOS / CULTOS */}
          <button
            type="button"
            onClick={() => handleSelect('checkin')}
            className="col-span-12 md:col-span-4 bg-brand-charcoal text-[#e5e2e1] rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md min-h-[190px] md:min-h-[220px] group border border-slate-800"
          >
            <span className="material-symbols-outlined !text-[56px] text-brand-red group-hover:scale-110 transition-transform duration-300">
              calendar_month
            </span>
            <div className="text-left mt-4">
              <span className="text-xs tracking-widest uppercase font-bold text-slate-500 block mb-1">
                {brand.type === 'synagogue' ? 'Shabat & Festividades' : 'Agenda & Encontros'}
              </span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block">{brand.termCults}</span>
            </div>
          </button>

          {/* DOACAO / CONTRIBUICAO */}
          <button
            type="button"
            onClick={() => handleSelect('donations')}
            className="col-span-12 md:col-span-8 bg-[#1f2937] text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md min-h-[190px] md:min-h-[220px] relative overflow-hidden group border border-[#111827]"
          >
            <span className="material-symbols-outlined !text-[56px] text-brand-red group-hover:scale-110 transition-transform duration-300">
              payments
            </span>
            <div className="text-left mt-4 z-10">
              <span className="text-xs tracking-widest uppercase font-bold text-slate-400 block mb-1">{brand.termDonations}</span>
              <span className="text-2xl md:text-3xl font-black uppercase tracking-wider block">{brand.termDonation}</span>
            </div>
            <div className="absolute right-6 bottom-6 opacity-15 text-white">
              <span className="material-symbols-outlined !text-[120px]">qr_code</span>
            </div>
          </button>

          {/* QUERO PARTICIPAR */}
          <button
            type="button"
            onClick={() => handleSelect('ministries')}
            className="col-span-12 md:col-span-6 bg-[#0f172a] text-white rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md min-h-[180px] md:min-h-[200px] relative overflow-hidden group border border-slate-800"
          >
            <span className="material-symbols-outlined !text-[52px] text-brand-red group-hover:scale-110 transition-transform duration-300">
              groups
            </span>
            <div className="text-left mt-4">
              <span className="text-xs tracking-widest uppercase font-bold text-slate-400 block mb-1">
                {brand.type === 'synagogue' ? 'Engajamento & Mitzvot' : 'Voluntariado'}
              </span>
              <span className="text-xl md:text-2xl font-black uppercase tracking-wider block">Quero Participar</span>
            </div>
          </button>

          {/* CHECK-IN */}
          <button
            type="button"
            onClick={() => handleSelect('checkin')}
            className="col-span-12 md:col-span-3 bg-white text-[#191c1e] rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:bg-slate-50 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm min-h-[180px] md:min-h-[200px] border-2 border-[#c4c6ce] group"
          >
            <span className="material-symbols-outlined !text-[52px] text-brand-red group-hover:rotate-6 transition-transform">
              how_to_reg
            </span>
            <div className="text-left mt-4">
              <span className="text-xs tracking-widest uppercase font-bold text-[#43474d] block mb-1">
                {brand.type === 'synagogue' ? 'Registrar Presença' : 'Confirmar Presença'}
              </span>
              <span className="text-xl md:text-2xl font-black uppercase tracking-wider block">Check-in</span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => handleSelect('my_cell')}
            className="col-span-12 md:col-span-3 bg-[#e6e8eb] text-[#191c1e] rounded-3xl p-8 flex flex-col justify-between items-start cursor-pointer hover:bg-[#e0e3e6] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-sm min-h-[180px] md:min-h-[200px] border border-[#c4c6ce] group overflow-hidden"
          >
            <span className="material-symbols-outlined !text-[52px] text-brand-dark group-hover:scale-105 transition-transform">
              hub
            </span>
            <div className="text-left mt-4 w-full overflow-hidden">
              <span className="text-xs tracking-widest uppercase font-bold text-[#43474d] block mb-1 truncate">
                {brand.type === 'synagogue' ? 'Grupos de Estudo' : 'Conexão Grupos'}
              </span>
              <span className="text-lg font-black uppercase tracking-wide block leading-tight line-clamp-2 break-words">
                {brand.termConnects}
              </span>
            </div>
          </button>


          {/* ATENDIMENTO PASTORAL */}
          <button
            type="button"
            onClick={() => handleSelect('pastoral')}
            className="col-span-12 bg-white hover:bg-slate-50 text-brand-dark rounded-3xl p-6 flex items-center justify-between cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-all shadow-sm md:min-h-[120px] border-2 border-dashed border-brand-red/30 group"
          >
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full bg-brand-red/10 flex items-center justify-center text-brand-red">
                <span className="material-symbols-outlined !text-[36px]">chat_bubble</span>
              </div>
              <div className="text-left">
                <span className="font-sans text-xs uppercase tracking-widest font-black text-brand-red block mb-1">
                  {brand.type === 'synagogue' ? 'Orientação Espiritual' : 'Conselhamento'}
                </span>
                <span className="font-sans text-xl md:text-2xl font-black uppercase tracking-wider text-brand-dark">
                  {brand.termPastoral}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-brand-red">
              <span className="text-sm font-bold tracking-widest uppercase hidden md:inline">Iniciar Conversa</span>
              <span className="material-symbols-outlined !text-4xl group-hover:translate-x-1.5 transition-transform">
                arrow_forward
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

