import React, { useEffect } from 'react';
import { playSuccessSound, playTapSound } from '../utils/audio';
import { BrandConfig } from '../utils/brand';

interface CheckinSuccessViewProps {
  onGoHome: () => void;
  brand: BrandConfig;
}

export default function CheckinSuccessView({ onGoHome, brand }: CheckinSuccessViewProps) {
  useEffect(() => {
    playSuccessSound();
  }, []);

  const handleFinish = () => {
    playTapSound();
    onGoHome();
  };

  return (
    <div className="relative h-screen w-full select-none overflow-hidden bg-brand-dark text-white flex items-center justify-center font-sans">
      
      {/* Sacred Light Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          className="h-full w-full object-cover opacity-25 mix-blend-overlay transition-transform duration-10000"
          src={brand.bgUrl}
          alt={brand.name}
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/60 via-transparent to-brand-dark/95" />
      </div>

      {/* Main feedback central card */}
      <main className="relative z-10 w-full max-w-2xl px-6 text-center space-y-8 animate-fade-in">
        
        {/* Glowing Success ring checkmark */}
        <div className="relative mx-auto w-32 h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-xl animate-pulse" />
          <div className="absolute -inset-2 rounded-full border border-emerald-500/30 animate-ping duration-2000" />
          <div className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg border-2 border-white/40">
            <span className="material-symbols-outlined !text-6xl font-bold">done_all</span>
          </div>
        </div>

        <div className="space-y-4">
          <span className="bg-brand-red text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full inline-block shadow-md border border-brand-red-hover">
            {brand.type === 'synagogue' ? 'Serviços do Shabat' : `Celebração Especial ${brand.name}`}
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight drop-shadow-xl">
            Check-in Realizado!
          </h2>
        </div>

        {/* Glass confirmation card */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 max-w-md mx-auto space-y-2">
          <p className="text-lg font-semibold text-white/95">Presença Confirmada</p>
          <p className="text-sm text-white/70 leading-relaxed">
            {brand.type === 'synagogue'
              ? 'Seja muito bem-vindo! Seu acesso à sinagoga foi registrado. Desejamos um Shabat de paz, reflexão e bênçãos em nossa comunidade.'
              : 'Seja muito bem-vindo! Seu acesso ao templo principal foi liberado. Desejamos uma experiência transformadora com Deus nesta noite.'}
          </p>
        </div>

        {/* Bottom anchor action button */}
        <button
          type="button"
          onClick={handleFinish}
          className="h-16 px-12 bg-brand-red hover:bg-brand-red-hover text-white font-extrabold text-lg rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform inline-flex items-center gap-3 cursor-pointer"
        >
          <span>Concluir e Voltar ao Início</span>
          <span className="material-symbols-outlined !text-2xl font-bold">arrow_forward</span>
        </button>

      </main>

    </div>
  );
}
