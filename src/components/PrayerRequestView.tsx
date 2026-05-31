import React, { useState } from 'react';
import { ViewState, PrayerRequest } from '../types';
import { playSuccessSound, playTapSound } from '../utils/audio';
import VirtualKeyboard from './VirtualKeyboard';
import LiveClock from './LiveClock';
import { BrandConfig } from '../utils/brand';

interface PrayerRequestViewProps {
  onBack: () => void;
  onGoHome: () => void;
  brand: BrandConfig;
}

export default function PrayerRequestView({ onBack, onGoHome, brand }: PrayerRequestViewProps) {
  const [request, setRequest] = useState<PrayerRequest>({
    isAnonymous: true,
    name: '',
    message: ''
  });

  const [activeField, setActiveField] = useState<'name' | 'message'>('message');
  const [isSent, setIsSent] = useState(false);

  const handleKeyboardPress = (char: string) => {
    const currentField = activeField;
    const val = request[currentField] || '';
    
    if (char === 'BACKSPACE') {
      setRequest((prev) => ({ ...prev, [currentField]: val.slice(0, -1) }));
      return;
    }
    if (char === 'SPACE') {
      setRequest((prev) => ({ ...prev, [currentField]: val + ' ' }));
      return;
    }
    if (char === 'CLEAR') {
      setRequest((prev) => ({ ...prev, [currentField]: '' }));
      return;
    }
    
    // Limits
    if (currentField === 'name' && val.length >= 30) return;
    if (currentField === 'message' && val.length >= 300) return;

    setRequest((prev) => ({ ...prev, [currentField]: val + char }));
  };

  const handleSubmit = () => {
    if (!request.isAnonymous && !request.name.trim()) {
      alert('Por favor, informe seu nome ou mude o pedido para Anônimo.');
      return;
    }
    if (!request.message.trim()) {
      alert(brand.type === 'synagogue' ? 'Por favor, escreva o seu pedido de reza.' : 'Por favor, escreva o seu pedido de oração.');
      return;
    }
    setIsSent(true);
    playSuccessSound();
  };

  const handleToggleAnonymous = (anon: boolean) => {
    playTapSound();
    setRequest(prev => ({ ...prev, isAnonymous: anon }));
    if (anon) {
      setActiveField('message');
    } else {
      setActiveField('name');
    }
  };

  const handleFieldFocus = (field: 'name' | 'message') => {
    playTapSound();
    setActiveField(field);
  };

  const handleGoBack = () => {
    playTapSound();
    onBack();
  };

  if (isSent) {
    return (
      <div className="relative min-h-screen bg-brand-light text-[#191c1e] flex flex-col items-center justify-center p-6 animate-fade-in font-sans">
        <div className="w-full max-w-2xl text-center space-y-6 glass-panel p-12 rounded-3xl shadow-xl border border-white/60 animate-fade-in">
          <div className="w-24 h-24 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <span className="material-symbols-fill !text-6xl text-white">favorite</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">
              Pedido Enviado!
            </h2>
            <p className="text-lg text-slate-600 max-w-lg mx-auto">
              {brand.type === 'synagogue'
                ? 'Nossa comunidade e rabinos estarão em oração pelo seu pedido. Tenha fé de que o Criador atende às preces sinceras!'
                : 'Nossa equipe de intercessores estará em oração pelo seu pedido. Tenha certeza de que Deus estende as mãos sobre sua vida!'}
            </p>
          </div>

          <div className="bg-white/40 border border-slate-200 p-6 rounded-2xl italic text-slate-500 max-w-md mx-auto">
            {brand.type === 'synagogue' ? (
              <>
                "O Eterno está perto de todos os que O invocam, de todos os que O invocam em verdade." Salmos 145:18
              </>
            ) : (
              <>
                "Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes..." Jeremias 33:3
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onGoHome}
            className="h-14 px-12 bg-brand-dark hover:bg-brand-red text-white font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform inline-flex items-center gap-2 cursor-pointer text-sm tracking-wide"
          >
            <span>Voltar ao Início</span>
            <span className="material-symbols-outlined !text-xl">arrow_forward</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-brand-light text-[#191c1e] flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Top Header */}
      <header className="fixed top-0 left-0 w-full z-45 bg-white px-6 md:px-20 py-4 border-b border-[#eceef1] flex justify-between items-center shadow-sm">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-1">
              {brand.type === 'synagogue' ? 'Preces & Orações' : 'Intercessão'}
            </span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">
              {brand.type === 'synagogue' ? 'Pedido de Rezas' : 'Pedido de Oração'}
            </h1>
          </div>

          <div className="hidden md:block">
            <LiveClock />
          </div>

          <span className="material-symbols-outlined text-brand-red !text-4xl">volunteer_activism</span>
        </div>
      </header>

      {/* Main Container Input Elements */}
      <main className="flex-grow flex flex-col pt-32 pb-[310px] px-6 md:px-20 max-w-7xl mx-auto w-full justify-center">
        <div className="grid grid-cols-12 gap-6 w-full items-stretch">
          
          {/* Left panel - Name Identification Toggle */}
          <div className="col-span-12 md:col-span-4 space-y-6 flex flex-col justify-between">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <span className="text-xs uppercase tracking-widest font-black text-slate-500 ml-1 block">
                Identificação
              </span>
              
              <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button
                  type="button"
                  onClick={() => handleToggleAnonymous(true)}
                  className={`py-3 rounded-lg font-bold text-xs uppercase tracking-wider text-center cursor-pointer transition-all ${
                    request.isAnonymous
                      ? 'bg-brand-dark text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/50'
                  }`}
                >
                  Anônimo
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleAnonymous(false)}
                  className={`py-3 rounded-lg font-bold text-xs uppercase tracking-wider text-center cursor-pointer transition-all ${
                    !request.isAnonymous
                      ? 'bg-brand-dark text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-200/50'
                  }`}
                >
                  Com Nome
                </button>
              </div>

              {/* Slide down Name Field if not anonymous */}
              {!request.isAnonymous && (
                <div className="space-y-2 animate-fade-in">
                  <label className="block text-xs uppercase tracking-widest font-black text-brand-red ml-1">
                    Seu nome ou iniciais
                  </label>
                  <div
                    onClick={() => handleFieldFocus('name')}
                    className={`w-full h-14 px-4 bg-slate-50 rounded-xl border-2 font-bold text-slate-800 flex items-center shadow-inner cursor-pointer transition-all ${
                      activeField === 'name' ? 'border-brand-red' : 'border-slate-200'
                    }`}
                  >
                    {request.name || <span className="text-slate-400 font-normal">Toque para digitar</span>}
                  </div>
                </div>
              )}
            </div>

            <div className="text-xs text-[#5c6066]/90 bg-red-50/50 rounded-3xl p-5 border border-brand-red/10 leading-relaxed shadow-sm">
              <div className="flex gap-2 text-brand-red font-black mb-1.5 uppercase tracking-wider text-[10px]">
                <span className="material-symbols-outlined !text-base">lock</span>
                <span>Sigilo Absoluto</span>
              </div>
              {brand.type === 'synagogue'
                ? 'Todos os pedidos de rezas recebidos em nossa sinagoga são mantidos em absoluto sigilo e lembrados nas preces diárias por nossos rabinos e comunidade.'
                : 'Todos os pedidos de oração recebidos em nosso Santuário são mantidos em absoluto sigilo e levados por nossos intercessores nas reuniões de oração diárias.'}
            </div>
          </div>

          {/* Right panel - Request Textarea Box */}
          <div className="col-span-12 md:col-span-8 flex flex-col gap-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <label className="block text-xs uppercase tracking-widest font-black text-brand-red ml-1 shrink-0">
              Escreva aqui sua intenção ou necessidade
            </label>
            <div
              onClick={() => handleFieldFocus('message')}
              className={`w-full flex-grow p-6 rounded-2xl border-2 bg-slate-50 text-lg font-bold text-slate-800 flex flex-wrap content-start shadow-inner cursor-pointer overflow-y-auto min-h-[180px] transition-all ${
                activeField === 'message' ? 'border-brand-red' : 'border-slate-200'
              }`}
            >
              {request.message || <span className="text-slate-400 font-normal">Escreva seu pedido aqui...</span>}
            </div>
          </div>

        </div>
      </main>

      {/* Screen Integrated Tactile Full Portuguese Keyboard layout */}
      {activeField && (
        <div className="fixed bottom-28 left-0 w-full bg-[#eceef1] shadow-[0_-8px_32px_rgba(0,0,0,0.08)] py-4 px-6 z-40 transition-transform duration-300">
          <VirtualKeyboard onKeyPress={handleKeyboardPress} />
        </div>
      )}

      {/* Fixed bottom navigation */}
      <footer className="fixed bottom-0 left-0 w-full z-45 h-28 flex justify-between items-center px-6 md:px-20 pb-4 bg-white shadow-lg border-t border-[#c4c6ce]">
        <button
          type="button"
          onClick={handleGoBack}
          className="flex items-center gap-2 text-[#43474d] hover:bg-slate-100 font-bold px-8 py-3.5 rounded-2xl transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined !text-xl">arrow_back</span>
          <span>Voltar</span>
        </button>

        <div className="hidden md:flex flex-col items-center text-slate-400">
          <span className="material-symbols-outlined !text-3xl animate-bounce">keyboard</span>
          <span className="text-[10px] font-black tracking-widest uppercase">Teclado Virtual Ativo</span>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white font-black px-12 py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all cursor-pointer"
        >
          <span>Enviar Pedido</span>
          <span className="material-symbols-outlined !text-xl">send</span>
        </button>
      </footer>

    </div>
  );
}
