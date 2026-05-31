import React, { useState } from 'react';
import { pastors } from '../data';
import { Pastor } from '../types';
import { playTapSound, playSuccessSound } from '../utils/audio';
import NumericKeypad from './NumericKeypad';
import LiveClock from './LiveClock';

interface PastoralViewProps {
  onBack: () => void;
  onGoHome: () => void;
}

export default function PastoralView({ onBack, onGoHome }: PastoralViewProps) {
  const [selectedPastor, setSelectedPastor] = useState<Pastor | null>(null);
  const [userPhone, setUserPhone] = useState('');
  const [isScheduled, setIsScheduled] = useState(false);

  const handlePastorSelect = (p: Pastor) => {
    if (!p.available) {
      playTapSound();
      alert('Este pastor está em atendimento individual no momento. Por favor escolha um de nossos conselheiros disponíveis ou aguarde alguns minutos.');
      return;
    }
    playTapSound();
    setSelectedPastor(p);
  };

  const handleKeypadPress = (char: string) => {
    if (char === 'BACKSPACE') {
      setUserPhone((prev) => prev.slice(0, -1));
      return;
    }
    if (char === 'CLEAR') {
      setUserPhone('');
      return;
    }
    
    // Clean to keep digits only and limit size
    const clean = (userPhone + char).replace(/\D/g, '');
    if (clean.length <= 11) {
      setUserPhone(clean);
    }
  };

  const formatPhone = (raw: string) => {
    if (!raw) return '';
    const clean = raw.replace(/\D/g, '');
    if (clean.length <= 2) return `(${clean}`;
    if (clean.length <= 7) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  const handleScheduleSubmit = () => {
    if (!userPhone.trim() || userPhone.length < 10) {
      alert('Por favor, indique um número de WhatsApp válido (DDD + Número).');
      return;
    }
    setIsScheduled(true);
    playSuccessSound();
  };

  const handleClose = () => {
    playTapSound();
    setSelectedPastor(null);
    setUserPhone('');
    setIsScheduled(false);
  };

  const handleGoBack = () => {
    playTapSound();
    onBack();
  };

  return (
    <div className="relative min-h-screen bg-brand-light text-[#191c1e] flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full z-45 bg-white px-6 md:px-20 py-4 border-b border-[#eceef1] flex justify-between items-center shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-red font-black block">Cuidado e Aconselhamento</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">Atendimento Pastoral</h1>
        </div>

        <div className="hidden md:block">
          <LiveClock />
        </div>

        <button
          type="button"
          onClick={handleGoBack}
          className="flex items-center gap-2 text-slate-600 hover:bg-slate-100 px-4 py-2 rounded-xl transition-all cursor-pointer font-bold border border-slate-200"
        >
          <span className="material-symbols-outlined !text-xl">arrow_back</span>
          <span>Voltar</span>
        </button>
      </header>

      {/* Main Container */}
      <main className="flex-grow pt-28 pb-32 px-6 md:px-20 max-w-7xl mx-auto w-full flex flex-col justify-center animate-fade-in">
        
        <header className="mb-8 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight mb-2">
            Precisa conversar ou receber uma oração presencial?
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
            Nossa equipe de pastores de plantão está pronta para ouvir você, oferecer conselhos bíblicos e orar pelas suas necessidades. Escolha um pastor abaixo para agendar um encontro reservado hoje mesmo.
          </p>
        </header>

        {/* Pastors Grid list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pastors.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-3xl overflow-hidden border-2 border-slate-200 shadow-sm flex flex-col justify-between items-stretch hover:border-brand-red transition-colors duration-200"
            >
              {/* Pastor Portrait cover */}
              <div className="relative h-44 w-full bg-slate-100">
                <img
                  className="w-full h-full object-cover select-none"
                  src={p.photoUrl}
                  alt={p.name}
                />
                <div className="absolute top-3 right-3">
                  {p.available ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md border border-emerald-300 inline-flex items-center gap-1 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                      Disponível
                    </span>
                  ) : (
                    <span className="bg-slate-150 text-slate-600 text-[9px] font-black tracking-widest uppercase px-2.5 py-1 rounded-md border border-slate-250 inline-block shadow-sm">
                      Ocupado
                    </span>
                  )}
                </div>
              </div>

              {/* Pastor bio text definitions */}
              <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                <div>
                  <h3 className="text-lg font-black text-brand-dark tracking-tight leading-tight uppercase">
                    {p.name}
                  </h3>
                  <p className="text-xs text-brand-red font-black tracking-wider uppercase mt-1">
                    {p.role}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handlePastorSelect(p)}
                  className={`w-full h-11 font-black text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 border-2 ${
                    p.available 
                      ? 'bg-slate-50 border-slate-200 hover:bg-red-50 hover:border-brand-red text-brand-dark hover:text-brand-red' 
                      : 'bg-slate-50 border-slate-150 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Chamar Pastor</span>
                  <span className="material-symbols-outlined !text-base">chat_bubble</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </main>

      {/* Counseling solicitation popup layout */}
      {selectedPastor && (
        <div className="fixed inset-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in select-none">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
            
            {/* Header */}
            <div className="p-6 bg-brand-dark text-white border-b flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest bg-brand-red px-2.5 py-1 rounded-md mb-1 block w-fit">
                  Conselho Reservado
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight">{selectedPastor.name}</h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              {isScheduled ? (
                <div className="text-center space-y-4 py-4 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <span className="material-symbols-outlined !text-3xl font-black">done</span>
                  </div>
                  <h4 className="text-xl font-black text-brand-dark">Encontro Confirmado!</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    O <span className="font-bold text-brand-dark">{selectedPastor.name}</span> foi acionado imediatamente. Por favor, contorne o balcão esquerdo e aguarde confortavelmente nas poltronas de acolhimento localizadas no saguão principal do Lobby. Deus abençoe!
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="h-12 w-full bg-brand-dark hover:bg-brand-red text-white font-bold rounded-xl mt-4 transition-colors cursor-pointer text-sm"
                  >
                    Fechar e Concluir
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-semibold mb-4 bg-slate-50 rounded-xl p-3 border border-slate-200">
                    Ao confirmar o atendimento, o pastor de plantão se organizará para recebê-lo de forma individual em nossa sala reservada de aconselhamento.
                  </p>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs uppercase tracking-widest font-black text-brand-red ml-1">
                      Seu WhatsApp para Contato
                    </label>
                    <div className="w-full h-12 px-4 rounded-xl border border-slate-350 bg-slate-50 font-bold text-slate-800 flex items-center text-lg shadow-inner">
                      {formatPhone(userPhone) || <span className="text-slate-400 font-normal">Digite seu celular</span>}
                    </div>
                  </div>

                  <div className="py-2 border-t border-slate-100">
                    <NumericKeypad 
                      onKeyPress={handleKeypadPress} 
                      onConfirm={handleScheduleSubmit} 
                      confirmLabel="Solicitar Atendimento"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Empty space block footer padding */}
      <footer className="h-10 w-full" />

    </div>
  );
}
