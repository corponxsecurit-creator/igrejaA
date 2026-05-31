import React, { useState } from 'react';
import { ViewState, NewMemberState } from '../types';
import { playSuccessSound, playTapSound } from '../utils/audio';
import VirtualKeyboard from './VirtualKeyboard';
import NumericKeypad from './NumericKeypad';
import LiveClock from './LiveClock';

interface NewMemberViewProps {
  onBack: () => void;
  onGoHome: () => void;
}

export default function NewMemberView({ onBack, onGoHome }: NewMemberViewProps) {
  const [form, setForm] = useState<NewMemberState>({
    step: 1,
    name: '',
    phone: '',
    email: '',
    city: '',
    ageRange: '',
  });

  const [activeField, setActiveField] = useState<'name' | 'phone' | 'email' | 'city' | null>('name');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleKeyboardPress = (char: string) => {
    if (!activeField) return;

    const currentVal = form[activeField] || '';
    
    if (char === 'BACKSPACE') {
      setForm((prev) => ({ ...prev, [activeField]: currentVal.slice(0, -1) }));
      return;
    }
    if (char === 'SPACE') {
      setForm((prev) => ({ ...prev, [activeField]: currentVal + ' ' }));
      return;
    }
    if (char === 'CLEAR') {
      setForm((prev) => ({ ...prev, [activeField]: '' }));
      return;
    }

    // Max restrictions
    if (activeField === 'phone' && currentVal.length >= 11) return;
    if (activeField === 'name' && currentVal.length >= 40) return;
    if (activeField === 'email' && currentVal.length >= 40) return;
    if (activeField === 'city' && currentVal.length >= 30) return;

    setForm((prev) => ({ ...prev, [activeField]: currentVal + char }));
  };

  const handleNextStep = () => {
    playTapSound();
    if (form.step === 1) {
      if (!form.name.trim()) {
        alert('Por favor, informe seu nome completo.');
        return;
      }
      if (!form.phone.trim() || form.phone.length < 10) {
        alert('Por favor, informe seu telefone ou WhatsApp com DDD.');
        return;
      }
      setForm((prev) => ({ ...prev, step: 2 }));
      setActiveField('email');
    } else if (form.step === 2) {
      if (!form.email.trim() || !form.email.includes('@')) {
        alert('Por favor, indique um e-mail válido.');
        return;
      }
      if (!form.city.trim()) {
        alert('Por favor, informe sua cidade.');
        return;
      }
      setForm((prev) => ({ ...prev, step: 3 }));
      setActiveField(null);
    } else if (form.step === 3) {
      if (!form.ageRange) {
        alert('Por favor, selecione sua faixa etária.');
        return;
      }
      setIsSuccess(true);
      playSuccessSound();
    }
  };

  const handlePrevStep = () => {
    playTapSound();
    if (form.step > 1) {
      const newStep = form.step - 1;
      setForm((prev) => ({ ...prev, step: newStep }));
      setActiveField(newStep === 1 ? 'name' : 'email');
    } else {
      onBack();
    }
  };

  const selectAgeRange = (range: string) => {
    playTapSound();
    setForm((prev) => ({ ...prev, ageRange: range }));
  };

  const handleFieldFocus = (field: 'name' | 'phone' | 'email' | 'city') => {
    playTapSound();
    setActiveField(field);
  };

  const formatPhone = (raw: string) => {
    if (!raw) return '';
    const clean = raw.replace(/\D/g, '');
    if (clean.length <= 2) return `(${clean}`;
    if (clean.length <= 7) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  if (isSuccess) {
    return (
      <div className="relative min-h-screen bg-brand-light text-[#191c1e] flex flex-col items-center justify-center p-6 animate-fade-in font-sans">
        <div className="relative w-full max-w-2xl text-center space-y-6 glass-panel p-12 rounded-3xl shadow-xl border border-white/60 animate-fade-in">
          <div className="w-24 h-24 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto shadow-md">
            <span className="material-symbols-fill !text-6xl">celebration</span>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">
              Cadastro Concluído!
            </h2>
            <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
              Ficamos muito felizes em ter você conosco na <span className="font-bold text-brand-dark">Atitude Alphaville</span>. Em breve nossa equipe de recepção entrará em contato!
            </p>
          </div>

          <div className="bg-white/40 border border-slate-200 p-6 rounded-2xl italic text-slate-500 max-w-md mx-auto">
            "Antes de falar, eu já te conhecia..." Jeremias 1:5
          </div>

          <button
            type="button"
            onClick={onGoHome}
            className="h-14 px-12 bg-brand-dark hover:bg-brand-red text-white font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform inline-flex items-center gap-2 cursor-pointer"
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
      
      {/* Kiosk Step Progress Header */}
      <header className="fixed top-0 left-0 w-full z-45 bg-white p-6 md:px-20 pt-8 flex flex-col gap-4 border-b border-[#eceef1] shadow-sm">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-1">Boas-vindas</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">Sou Novo Aqui</h1>
          </div>

          <div className="hidden md:block">
            <LiveClock />
          </div>

          <span className="text-sm font-bold text-slate-500 font-sans" id="step-counter">
            Passo {form.step} de 3
          </span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
          <div
            className="h-full bg-brand-red transition-all duration-700 ease-in-out"
            style={{ width: `${(form.step / 3) * 100}%` }}
          />
        </div>
      </header>

      {/* Inputs canvas */}
      <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-20 pt-40 pb-72 overflow-y-auto">
        <div className="w-full max-w-4xl space-y-6">
          
          {/* STEP 1: Personal Data */}
          {form.step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-black text-brand-red ml-2">
                  Qual seu nome completo?
                </label>
                <div
                  onClick={() => handleFieldFocus('name')}
                  className={`w-full h-16 px-6 rounded-2xl border-2 bg-white text-lg font-bold text-slate-800 flex items-center shadow-inner cursor-pointer transition-all ${
                    activeField === 'name' ? 'border-brand-red bg-slate-50/50' : 'border-slate-250'
                  }`}
                >
                  {form.name || <span className="text-slate-400 font-normal">Digite seu nome</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-black text-brand-red ml-2">
                  Telefone / WhatsApp
                </label>
                <div
                  onClick={() => handleFieldFocus('phone')}
                  className={`w-full h-16 px-6 rounded-2xl border-2 bg-white text-lg font-bold text-slate-800 flex items-center shadow-inner cursor-pointer transition-all ${
                    activeField === 'phone' ? 'border-brand-red bg-slate-50/50' : 'border-slate-250'
                  }`}
                >
                  {formatPhone(form.phone) || <span className="text-slate-400 font-normal">Digite seu celular</span>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Email & Town */}
          {form.step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-black text-brand-red ml-2">
                  Qual seu melhor E-mail?
                </label>
                <div
                  onClick={() => handleFieldFocus('email')}
                  className={`w-full h-16 px-6 rounded-2xl border-2 bg-white text-lg font-bold text-slate-800 flex items-center shadow-inner cursor-pointer transition-all ${
                    activeField === 'email' ? 'border-brand-red bg-slate-50/50' : 'border-slate-250'
                  }`}
                >
                  {form.email || <span className="text-slate-400 font-normal">Digite seu email</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase tracking-widest font-black text-brand-red ml-2">
                  Em qual cidade você mora?
                </label>
                <div
                  onClick={() => handleFieldFocus('city')}
                  className={`w-full h-16 px-6 rounded-2xl border-2 bg-white text-lg font-bold text-slate-800 flex items-center shadow-inner cursor-pointer transition-all ${
                    activeField === 'city' ? 'border-brand-red bg-slate-50/50' : 'border-slate-250'
                  }`}
                >
                  {form.city || <span className="text-slate-400 font-normal">Ex: Barueri</span>}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Age Demographics */}
          {form.step === 3 && (
            <div className="space-y-6 animate-fade-in">
              <label className="block text-sm uppercase tracking-widest font-black text-brand-red ml-2 text-center">
                Qual sua faixa etária?
              </label>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto pt-2">
                {[
                  'Menos de 18 anos',
                  '18 a 30 anos',
                  '31 a 50 anos',
                  'Mais de 50 anos'
                ].map((range) => {
                  const isSelected = form.ageRange === range;
                  return (
                    <button
                      key={range}
                      type="button"
                      onClick={() => selectAgeRange(range)}
                      className={`h-20 rounded-2xl border-2 text-lg font-black text-left px-8 cursor-pointer transition-all ${
                        isSelected 
                          ? 'bg-brand-red border-brand-red-hover text-white shadow-md'
                          : 'bg-white border-slate-250 text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      {range}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Screen Integrated Virtual Keyboard (For tactile kiosk touch feeling) */}
      {activeField && (
        <div className="fixed bottom-28 left-0 w-full bg-[#eceef1] shadow-[0_-8px_32px_rgba(0,0,0,0.08)] py-4 px-6 z-40 transition-transform duration-300">
          {activeField === 'phone' ? (
            <div className="w-full max-w-sm mx-auto">
              <NumericKeypad onKeyPress={handleKeyboardPress} />
            </div>
          ) : (
            <VirtualKeyboard 
              onKeyPress={handleKeyboardPress} 
              layout={activeField === 'email' ? 'email' : 'text'}
            />
          )}
        </div>
      )}

      {/* Footer Navigation */}
      <footer className="fixed bottom-0 left-0 w-full z-45 h-28 flex justify-between items-center px-6 md:px-20 pb-4 bg-white shadow-lg border-t border-[#c4c6ce]">
        {/* Back control */}
        <button
          type="button"
          onClick={handlePrevStep}
          className="flex items-center gap-2 text-[#43474d] hover:bg-slate-100 font-bold px-8 py-3.5 rounded-2xl transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined !text-xl">arrow_back</span>
          <span>Voltar</span>
        </button>

        {activeField && (
          <div className="hidden md:flex flex-col items-center text-slate-400">
            <span className="material-symbols-outlined !text-3xl animate-bounce">keyboard</span>
            <span className="text-[10px] font-black tracking-widest uppercase">Teclado Virtual Ativo</span>
          </div>
        )}

        {/* Continue Control / Finish */}
        <button
          type="button"
          onClick={handleNextStep}
          className="flex items-center gap-2 font-bold px-10 py-3.5 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer bg-brand-red text-white"
        >
          <span>{form.step === 3 ? 'Finalizar Cadastro' : 'Continuar'}</span>
          <span className="material-symbols-outlined !text-xl">
            {form.step === 3 ? 'check_circle' : 'arrow_forward'}
          </span>
        </button>
      </footer>

    </div>
  );
}
