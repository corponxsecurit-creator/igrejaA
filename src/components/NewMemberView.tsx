import React, { useState } from 'react';
import { ViewState, NewMemberState } from '../types';
import { playSuccessSound, playTapSound } from '../utils/audio';
import VirtualKeyboard from './VirtualKeyboard';
import NumericKeypad from './NumericKeypad';
import LiveClock from './LiveClock';
import { BrandConfig } from '../utils/brand';
import { Lang, t } from '../utils/i18n';

interface NewMemberViewProps {
  onBack: () => void;
  onGoHome: () => void;
  brand: BrandConfig;
  lang: Lang;
}

export default function NewMemberView({ onBack, onGoHome, brand, lang }: NewMemberViewProps) {
  const [form, setForm] = useState<NewMemberState>({
    step: 1,
    name: '',
    phone: '',
    email: '',
    city: '',
    ageRange: '',
  });

  const [registrationMode, setRegistrationMode] = useState<'standard' | 'quick' | null>(null);
  const [activeField, setActiveField] = useState<'name' | 'phone' | 'email' | 'city' | null>(null);
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

  const handleQuickSubmit = () => {
    playTapSound();
    if (!form.email.trim() || !form.email.includes('@')) {
      alert('Por favor, indique um e-mail válido.');
      return;
    }

    // Save registration to localStorage
    const newReg = {
      id: `quick_member_${Date.now()}`,
      name: 'Solicitação Rápida',
      phone: '-',
      email: form.email,
      type: `Quero ser Membro (Envio Rápido)`,
      brandId: brand.id,
      date: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem('santuario_registrations');
      const regs = existing ? JSON.parse(existing) : [];
      regs.push(newReg);
      localStorage.setItem('santuario_registrations', JSON.stringify(regs));
    } catch (e) {
      console.error('Failed to save registration:', e);
    }

    setIsSuccess(true);
    playSuccessSound();
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

      // Save registration to localStorage
      const newReg = {
        id: `full_member_${Date.now()}`,
        name: form.name,
        phone: form.phone,
        email: form.email,
        type: `Cadastro Completo: ${brand.termMember} (${form.city}, ${form.ageRange})`,
        brandId: brand.id,
        date: new Date().toISOString()
      };

      try {
        const existing = localStorage.getItem('santuario_registrations');
        const regs = existing ? JSON.parse(existing) : [];
        regs.push(newReg);
        localStorage.setItem('santuario_registrations', JSON.stringify(regs));
      } catch (e) {
        console.error('Failed to save registration:', e);
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
      setRegistrationMode(null);
      setActiveField(null);
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
        
        {/* Dynamic client-specific identity background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.35] pointer-events-none transition-all duration-500"
          style={{ backgroundImage: `url(${brand.bgUrl})`, filter: 'blur(3px)' }}
        />
        <div 
          className="absolute inset-0 z-0 backdrop-blur-lg pointer-events-none" 
          style={{
            background: `linear-gradient(135deg, rgba(var(--color-brand-red-rgb), 0.08) 0%, rgba(255, 255, 255, 0.85) 60%, rgba(244, 246, 248, 0.95) 100%)`
          }}
        />

        <div className="relative overflow-hidden w-full max-w-4xl text-center p-8 md:p-12 rounded-3xl shadow-xl border border-white/60 animate-fade-in z-10 bg-white/90 backdrop-blur-md space-y-6">
          {/* Background image related to client virtual identity inside card */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.15] pointer-events-none"
            style={{ backgroundImage: `url(${brand.bgUrl})`, filter: 'blur(2px)' }}
          />
          <div className="relative z-10 space-y-6">
            <div className="w-20 h-20 bg-brand-red text-white rounded-full flex items-center justify-center mx-auto shadow-md">
              <span className="material-symbols-fill !text-5xl">celebration</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl md:text-4xl font-extrabold text-brand-dark tracking-tight">
                {brand.id === 'ymcactx' 
                  ? t('regSuccessTitleSports', lang) 
                  : (brand.type === 'synagogue' ? t('regSuccessTitleSynagogue', lang) : t('regSuccessTitle', lang))}
              </h2>
              <p className="text-lg text-slate-600 max-w-lg mx-auto leading-relaxed">
                {t('regSuccessGreeting', lang).replace('!', ` ${brand.name} ${brand.campusName}!`)}
              </p>
            </div>

            {/* Localized Quote Block */}
            <div className="bg-white/40 border border-slate-200 p-5 rounded-2xl italic text-slate-550 max-w-md mx-auto text-sm">
              {brand.id === 'ymcactx'
                ? t('supportQuoteSports', lang)
                : (brand.type === 'synagogue' ? t('supportQuoteSynagogue', lang) : t('supportQuoteDefault', lang))}
            </div>

            {/* YMCA App Download Panel */}
            {brand.id === 'ymcactx' && (
              <div className="bg-white/80 border border-slate-200 p-6 rounded-3xl max-w-2xl mx-auto space-y-5 shadow-sm text-left">
                <div className="space-y-1 text-center">
                  <h3 className="text-lg font-black text-brand-dark">
                    {t('downloadTitle', lang)}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold max-w-md mx-auto">
                    {t('downloadDesc', lang)}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  {/* Android Download */}
                  <div className="flex flex-col items-center p-4 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                      {t('downloadAndroid', lang)}
                    </span>
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Fplay.google.com%2Fstore%2Fapps%2Fdetails%3Fid%3Dcom.netpulse.mobile.ymcaofgreaterwilliamsoncounty%26hl%3Den_US%26gl%3DUS%26pli%3D1"
                        alt="Android App QR Code"
                        className="w-[120px] h-[120px] object-contain"
                        loading="lazy"
                      />
                    </div>
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.netpulse.mobile.ymcaofgreaterwilliamsoncounty&hl=en_US&gl=US&pli=1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-900 hover:bg-slate-850 text-white font-extrabold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md text-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined !text-base">android</span>
                      <span>Google Play</span>
                    </a>
                  </div>

                  {/* iOS Download */}
                  <div className="flex flex-col items-center p-4 bg-slate-50/50 border border-slate-150 rounded-2xl space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-wider text-sky-600 bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                      {t('downloadIos', lang)}
                    </span>
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                      <img 
                        src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https%3A%2F%2Fapps.apple.com%2Fus%2Fapp%2Fymca-ctx%2Fid1485537145"
                        alt="iOS App QR Code"
                        className="w-[120px] h-[120px] object-contain"
                        loading="lazy"
                      />
                    </div>
                    <a 
                      href="https://apps.apple.com/us/app/ymca-ctx/id1485537145"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2 px-4 bg-slate-900 hover:bg-slate-850 text-white font-extrabold rounded-xl transition-all hover:scale-105 active:scale-95 shadow-md text-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined !text-base">phone_iphone</span>
                      <span>App Store</span>
                    </a>
                  </div>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={onGoHome}
              className="h-16 px-12 bg-brand-dark hover:bg-brand-red text-white font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-transform inline-flex items-center gap-2 cursor-pointer z-10"
            >
              <span>{t('goBackHome', lang)}</span>
              <span className="material-symbols-outlined !text-xl">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (registrationMode === null) {
    return (
      <div className="relative min-h-screen bg-brand-light text-[#191c1e] flex flex-col justify-between overflow-x-hidden font-sans">
        
        {/* Dynamic client-specific identity background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.35] pointer-events-none transition-all duration-500"
          style={{ backgroundImage: `url(${brand.bgUrl})`, filter: 'blur(3px)' }}
        />
        <div 
          className="absolute inset-0 z-0 backdrop-blur-lg pointer-events-none" 
          style={{
            background: `linear-gradient(135deg, rgba(var(--color-brand-red-rgb), 0.08) 0%, rgba(255, 255, 255, 0.85) 60%, rgba(244, 246, 248, 0.95) 100%)`
          }}
        />

        {/* Top Header */}
        <header className="fixed top-0 left-0 w-full z-45 bg-white/85 backdrop-blur-md px-6 md:px-20 py-6 border-b border-[#eceef1] flex justify-between items-center shadow-sm relative z-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-1">Boas-vindas</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">{brand.termMember}</h1>
          </div>

          <div className="hidden md:block">
            <LiveClock size="large" />
          </div>
        </header>

        {/* Main selector body */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-20 pt-28 pb-32 max-w-6xl mx-auto w-full relative z-10 space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-brand-dark tracking-tight mb-2">
              Como você prefere prosseguir?
            </h2>
            <p className="text-sm md:text-base text-slate-600 font-semibold leading-relaxed">
              Você pode preencher o formulário de cadastro completo ou apenas enviar seu e-mail de contato para ser integrado ao grupo de cadastro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
            {/* Standard Mode */}
            <button
              type="button"
              onClick={() => {
                playTapSound();
                setRegistrationMode('standard');
                setActiveField('name');
              }}
              className="relative overflow-hidden bg-white/90 backdrop-blur-md hover:bg-white rounded-3xl p-10 text-left border-2 border-slate-200 hover:border-brand-red cursor-pointer transition-all flex flex-col justify-between items-start group shadow-md hover:scale-[1.05] active:scale-[0.96] min-h-[320px]"
            >
              {/* Background image related to client virtual identity inside button */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.10] pointer-events-none"
                style={{ backgroundImage: `url(${brand.bgUrl})`, filter: 'blur(1px)' }}
              />
              <div className="relative z-10 flex flex-col justify-between h-full w-full items-start">
                <div className="w-16 h-16 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center font-bold mb-4 shrink-0">
                  <span className="material-symbols-outlined !text-4xl">assignment_ind</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-extrabold text-3xl text-brand-dark group-hover:text-brand-red transition-colors">Ficha de Cadastro Completa</h3>
                  <p className="text-base text-slate-500 font-semibold mt-3 leading-relaxed">Preencha nome, telefone, e-mail e cidade para nossa equipe de novos membros entrar em contato.</p>
                </div>
                <div className="mt-6 font-bold text-sm uppercase text-slate-450 group-hover:text-brand-red tracking-wider flex items-center gap-1.5 shrink-0">
                  <span>Preencher Completo</span>
                  <span className="material-symbols-outlined !text-base">arrow_forward</span>
                </div>
              </div>
            </button>

            {/* Quick Email link Mode */}
            <button
              type="button"
              onClick={() => {
                playTapSound();
                setRegistrationMode('quick');
                setActiveField('email');
              }}
              className="relative overflow-hidden bg-white/90 backdrop-blur-md hover:bg-white rounded-3xl p-10 text-left border-2 border-slate-200 hover:border-brand-red cursor-pointer transition-all flex flex-col justify-between items-start group shadow-md hover:scale-[1.05] active:scale-[0.96] min-h-[320px]"
            >
              {/* Background image related to client virtual identity inside button */}
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.10] pointer-events-none"
                style={{ backgroundImage: `url(${brand.bgUrl})`, filter: 'blur(1px)' }}
              />
              <div className="relative z-10 flex flex-col justify-between h-full w-full items-start">
                <div className="w-16 h-16 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center font-bold mb-4 shrink-0">
                  <span className="material-symbols-outlined !text-4xl">alternate_email</span>
                </div>
                <div className="flex-grow">
                  <h3 className="font-extrabold text-3xl text-brand-dark group-hover:text-brand-red transition-colors">Quero ser Membro (Rápido)</h3>
                  <p className="text-base text-slate-500 font-semibold mt-3 leading-relaxed">Insira apenas seu e-mail para que nosso grupo de cadastro envie seu convite de participação.</p>
                </div>
                <div className="mt-6 font-bold text-sm uppercase text-slate-450 group-hover:text-brand-red tracking-wider flex items-center gap-1.5 shrink-0">
                  <span>Registrar E-mail</span>
                  <span className="material-symbols-outlined !text-base">arrow_forward</span>
                </div>
              </div>
            </button>
          </div>
        </main>

        {/* Floating Back Button (Bottom Right) */}
        <button
          type="button"
          onClick={onBack}
          className="fixed bottom-8 right-6 md:right-20 z-50 flex items-center gap-3 text-white bg-slate-750 hover:bg-slate-850 font-black px-12 h-20 rounded-2xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 text-xl md:text-2xl shadow-xl border border-slate-700/20"
          style={{
            background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
          }}
        >
          <span className="material-symbols-outlined !text-3xl font-black">arrow_back</span>
          <span>Voltar</span>
        </button>

        {/* Footer empty layout for spacing */}
        <footer className="h-28 w-full" />
      </div>
    );
  }

  if (registrationMode === 'quick') {
    return (
      <div className="relative min-h-screen bg-brand-light text-[#191c1e] flex flex-col justify-between overflow-x-hidden font-sans">
        
        {/* Dynamic client-specific identity background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.35] pointer-events-none transition-all duration-500"
          style={{ backgroundImage: `url(${brand.bgUrl})`, filter: 'blur(3px)' }}
        />
        <div 
          className="absolute inset-0 z-0 backdrop-blur-lg pointer-events-none" 
          style={{
            background: `linear-gradient(135deg, rgba(var(--color-brand-red-rgb), 0.08) 0%, rgba(255, 255, 255, 0.85) 60%, rgba(244, 246, 248, 0.95) 100%)`
          }}
        />

        {/* Top Header */}
        <header className="fixed top-0 left-0 w-full z-45 bg-white/85 backdrop-blur-md px-6 md:px-20 py-6 border-b border-[#eceef1] flex justify-between items-center shadow-sm relative z-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-1">Envio Rápido</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">Quero ser Membro</h1>
          </div>

          <div className="hidden md:block">
            <LiveClock size="large" />
          </div>
        </header>

        {/* Main Canvas input */}
        <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-20 pt-32 pb-72 overflow-y-auto relative z-10">
          <div className="relative overflow-hidden w-full max-w-3xl space-y-6 bg-white/90 backdrop-blur-md p-10 md:p-12 border border-white/60 shadow-xl rounded-3xl animate-fade-in">
            {/* Background image related to client virtual identity inside card */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.12] pointer-events-none"
              style={{ backgroundImage: `url(${brand.bgUrl})`, filter: 'blur(2px)' }}
            />
            <div className="relative z-10 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm uppercase tracking-widest font-black text-brand-red ml-2">
                  Qual seu e-mail para contato?
                </label>
                <div
                  onClick={() => handleFieldFocus('email')}
                  className={`w-full h-20 px-6 rounded-2xl border-2 bg-slate-50/80 text-xl font-bold text-slate-800 flex items-center shadow-inner cursor-pointer transition-all ${
                    activeField === 'email' ? 'border-brand-red bg-slate-100/50' : 'border-slate-200'
                  }`}
                >
                  {form.email || <span className="text-slate-400 font-normal">Digite seu e-mail</span>}
                </div>
              </div>

              <p className="text-sm text-slate-500 font-semibold leading-relaxed">
                O e-mail indicado será enviado ao nosso grupo de cadastro e integração. Em breve enviaremos um convite completo!
              </p>

              {/* Submit Button Inside Card */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleQuickSubmit}
                  className="w-full flex items-center justify-center gap-2 font-black h-16 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer bg-brand-red text-white text-lg"
                  style={{
                    backgroundColor: brand.primaryColor,
                    boxShadow: `0 8px 20px -6px ${brand.primaryColor}80`
                  }}
                >
                  <span>Enviar para o Grupo de Cadastro</span>
                  <span className="material-symbols-outlined !text-xl">send</span>
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Screen Integrated Virtual Keyboard */}
        {activeField === 'email' && (
          <div className="fixed bottom-28 left-0 w-full bg-[#eceef1] shadow-[0_-8px_32px_rgba(0,0,0,0.08)] py-4 px-6 z-40 transition-transform duration-300">
            <VirtualKeyboard 
              onKeyPress={handleKeyboardPress} 
              layout="email"
            />
          </div>
        )}

        {/* Footer Navigation (Transparent, floating only the Back button on bottom right) */}
        <footer className="fixed bottom-8 right-6 md:right-20 z-45">
          <button
            type="button"
            onClick={() => {
              playTapSound();
              setRegistrationMode(null);
              setActiveField(null);
            }}
            className="flex items-center gap-3 text-white bg-slate-750 hover:bg-slate-850 font-black px-12 h-20 rounded-2xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 text-xl md:text-2xl shadow-xl border border-slate-700/20"
            style={{
              background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
            }}
          >
            <span className="material-symbols-outlined !text-3xl font-black">arrow_back</span>
            <span>Voltar</span>
          </button>
        </footer>
      </div>
    );
  }

  // Standard multi-step mode
  return (
    <div className="relative min-h-screen bg-brand-light text-[#191c1e] flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Dynamic client-specific identity background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.35] pointer-events-none transition-all duration-500"
        style={{ backgroundImage: `url(${brand.bgUrl})`, filter: 'blur(3px)' }}
      />
      <div 
        className="absolute inset-0 z-0 backdrop-blur-lg pointer-events-none" 
        style={{
          background: `linear-gradient(135deg, rgba(var(--color-brand-red-rgb), 0.08) 0%, rgba(255, 255, 255, 0.85) 60%, rgba(244, 246, 248, 0.95) 100%)`
        }}
      />

      {/* Kiosk Step Progress Header */}
      <header className="fixed top-0 left-0 w-full z-45 bg-white/85 backdrop-blur-md p-6 md:px-20 pt-8 flex flex-col gap-4 border-b border-[#eceef1] shadow-sm relative z-10">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-1">Boas-vindas</span>
            <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">{brand.termMember}</h1>
          </div>

          <div className="hidden md:block">
            <LiveClock size="large" />
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
      <main className="flex-grow flex flex-col items-center justify-center px-6 md:px-20 pt-40 pb-72 overflow-y-auto relative z-10">
        <div className="relative overflow-hidden w-full max-w-4xl space-y-6 bg-white/90 backdrop-blur-md p-10 md:p-12 border border-white/60 shadow-xl rounded-3xl animate-fade-in">
          {/* Background image related to client virtual identity inside card */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.12] pointer-events-none"
            style={{ backgroundImage: `url(${brand.bgUrl})`, filter: 'blur(2px)' }}
          />
          <div className="relative z-10 space-y-6">
            
            {/* STEP 1: Personal Data */}
            {form.step === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="block text-sm uppercase tracking-widest font-black text-brand-red ml-2">
                    Qual seu nome completo?
                  </label>
                  <div
                    onClick={() => handleFieldFocus('name')}
                    className={`w-full h-20 px-6 rounded-2xl border-2 bg-white text-xl font-bold text-slate-800 flex items-center shadow-inner cursor-pointer transition-all ${
                      activeField === 'name' ? 'border-brand-red bg-slate-50/50' : 'border-slate-200'
                    }`}
                  >
                    {form.name || <span className="text-slate-400 font-normal">Digite seu nome</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm uppercase tracking-widest font-black text-brand-red ml-2">
                    Telefone / WhatsApp
                  </label>
                  <div
                    onClick={() => handleFieldFocus('phone')}
                    className={`w-full h-20 px-6 rounded-2xl border-2 bg-white text-xl font-bold text-slate-800 flex items-center shadow-inner cursor-pointer transition-all ${
                      activeField === 'phone' ? 'border-brand-red bg-slate-50/50' : 'border-slate-200'
                    }`}
                  >
                    {formatPhone(form.phone) || <span className="text-slate-400 font-normal">Digite seu celular</span>}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Email & Town */}
            {form.step === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div className="space-y-2">
                  <label className="block text-sm uppercase tracking-widest font-black text-brand-red ml-2">
                    Qual seu melhor E-mail?
                  </label>
                  <div
                    onClick={() => handleFieldFocus('email')}
                    className={`w-full h-20 px-6 rounded-2xl border-2 bg-white text-xl font-bold text-slate-800 flex items-center shadow-inner cursor-pointer transition-all ${
                      activeField === 'email' ? 'border-brand-red bg-slate-50/50' : 'border-slate-200'
                    }`}
                  >
                    {form.email || <span className="text-slate-400 font-normal">Digite seu email</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm uppercase tracking-widest font-black text-brand-red ml-2">
                    Em qual cidade você mora?
                  </label>
                  <div
                    onClick={() => handleFieldFocus('city')}
                    className={`w-full h-20 px-6 rounded-2xl border-2 bg-white text-xl font-bold text-slate-800 flex items-center shadow-inner cursor-pointer transition-all ${
                      activeField === 'city' ? 'border-brand-red bg-slate-50/50' : 'border-slate-200'
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
                <label className="block text-md uppercase tracking-widest font-black text-brand-red ml-2 text-center">
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
                        className={`h-24 rounded-2xl border-2 text-xl font-black text-left px-8 cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-brand-red border-brand-red-hover text-white shadow-md'
                            : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50'
                        }`}
                        style={{
                          backgroundColor: isSelected ? brand.primaryColor : undefined,
                          borderColor: isSelected ? brand.primaryColorHover : undefined,
                        }}
                      >
                        {range}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* Continue / Finish Action Button Inside Card */}
          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={handleNextStep}
              className="w-full md:w-auto flex items-center justify-center gap-2 font-black px-10 h-16 rounded-2xl shadow-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer bg-brand-red text-white text-lg"
              style={{
                backgroundColor: brand.primaryColor,
                boxShadow: `0 8px 20px -6px ${brand.primaryColor}80`
              }}
            >
              <span>{form.step === 3 ? 'Finalizar Cadastro' : 'Continuar'}</span>
              <span className="material-symbols-outlined !text-xl">
                {form.step === 3 ? 'check_circle' : 'arrow_forward'}
              </span>
            </button>
          </div>
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

      {/* Footer Navigation (Transparent, floating only the Back button on bottom right) */}
      <footer className="fixed bottom-8 right-6 md:right-20 z-45">
        <button
          type="button"
          onClick={handlePrevStep}
          className="flex items-center gap-3 text-white bg-slate-750 hover:bg-slate-850 font-black px-12 h-20 rounded-2xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 text-xl md:text-2xl shadow-xl border border-slate-700/20"
          style={{
            background: 'linear-gradient(135deg, #374151 0%, #1f2937 100%)'
          }}
        >
          <span className="material-symbols-outlined !text-3xl font-black">arrow_back</span>
          <span>Voltar</span>
        </button>
      </footer>

    </div>
  );
}
