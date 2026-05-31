import React, { useState, useEffect } from 'react';
import { DonationState } from '../types';
import { playTapSound, playSuccessSound } from '../utils/audio';
import NumericKeypad from './NumericKeypad';
import LiveClock from './LiveClock';
import { speakText } from '../utils/tts';
import { BrandConfig } from '../utils/brand';

interface DonationViewProps {
  onBack: () => void;
  onGoHome: () => void;
  brand: BrandConfig;
}

export default function DonationView({ onBack, onGoHome, brand }: DonationViewProps) {
  const [state, setState] = useState<DonationState>({
    category: '',
    value: 0,
    customValue: '',
    step: 'category'
  });

  const [pixTimer, setPixTimer] = useState(300);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (state.step !== 'pix') return;

    setPixTimer(300);
    speakText(`Código PIX gerado no valor de R$ ${state.value.toFixed(2)}. Aponte o celular ou copie a chave para pagar.`);

    const timer = setInterval(() => {
      setPixTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.step, state.value]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyKey = () => {
    playSuccessSound();
    navigator.clipboard.writeText(brand.pixKey);
    setCopied(true);
    speakText('Chave Copiada');
    setTimeout(() => setCopied(false), 3000);
  };

  const categories = brand.type === 'synagogue' ? [
    { title: 'Tsedaká Geral', icon: 'payments', desc: 'Contribuição regular para os custos e preces da sinagoga.' },
    { title: 'Estudos e Shabat', icon: 'volunteer_activism', desc: 'Oferta voluntária para festividades de Cabalat Shabat e shiurim.' },
    { title: 'Auxílio de Israel', icon: 'public', desc: 'Apoio direto a projetos humanitários e de assistência em Israel.' },
    { title: 'Ação Social (Chesed)', icon: 'spa', desc: 'Distribuição de cestas kosher e auxílio aos necessitados locais.' }
  ] : [
    { title: 'Dízimo Geral', icon: 'payments', desc: 'Devolução regular de comunhão financeira de dízimo.' },
    { title: 'Oferta de Celebração', icon: 'volunteer_activism', desc: 'Oferta voluntária para sustentação da casa e dos cultos.' },
    { title: 'Missões Globais', icon: 'public', desc: 'Sustento direto aos nossos missionários no sertão e no exterior.' },
    { title: 'Projetos Sociais', icon: 'spa', desc: 'Sustentação de cestas básicas e assistência comunitária.' }
  ];

  const presetValues = [20, 50, 100, 200];

  const handleSelectCategory = (cat: string) => {
    playTapSound();
    setState((prev) => ({ ...prev, category: cat, step: 'value' }));
  };

  const handleSelectPreset = (val: number) => {
    playSuccessSound();
    setState((prev) => ({ ...prev, value: val, customValue: '', step: 'pix' }));
  };

  const handleCustomValueKeyPress = (char: string) => {
    if (char === 'BACKSPACE') {
      setState((prev) => ({ ...prev, customValue: prev.customValue.slice(0, -1) }));
      return;
    }
    if (char === 'CLEAR') {
      setState((prev) => ({ ...prev, customValue: '' }));
      return;
    }
    
    // limit custom value length
    if (state.customValue.length < 7) {
      setState((prev) => ({ ...prev, customValue: prev.customValue + char }));
    }
  };

  const handleCustomValueConfirm = () => {
    const val = parseFloat(state.customValue);
    if (isNaN(val) || val <= 0) {
      alert('Por favor, informe um valor numérico válido.');
      return;
    }
    playSuccessSound();
    setState((prev) => ({ ...prev, value: val, step: 'pix' }));
  };

  const handleCompletePix = () => {
    playSuccessSound();
    setState((prev) => ({ ...prev, step: 'success' }));
  };

  const handleGoBack = () => {
    playTapSound();
    if (state.step === 'value') setState(prev => ({ ...prev, step: 'category' }));
    else if (state.step === 'pix') setState(prev => ({ ...prev, step: 'value' }));
    else onBack();
  };

  return (
    <div className="relative min-h-screen bg-brand-light text-[#191c1e] flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Header bar */}
      <header className="fixed top-0 left-0 w-full z-45 bg-white px-6 md:px-20 py-4 border-b border-[#eceef1] flex justify-between items-center shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-red font-black block">{brand.termDonations}</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">Contribuições {brand.name}</h1>
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

      {/* Main interactive area */}
      <main className="flex-grow pt-28 pb-32 px-6 md:px-20 max-w-7xl mx-auto w-full flex flex-col justify-center">
        
        {/* STEP 1: CATEGORY SELECTION */}
        {state.step === 'category' && (
          <div className="space-y-6 animate-fade-in text-center">
            <header className="max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight mb-1">
                Qual será o destino da sua contribuição?
              </h2>
              <p className="text-sm text-slate-500 font-semibold uppercase tracking-wider">
                Selecione uma categoria abaixo para fazer seu {brand.termDonation.toLowerCase()}
              </p>
            </header>

            {/* COMPONENTE DE SUGESTÃO E META MOTIVACIONAL COM TOTAL DE ONTEM */}
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-red-50/50 to-rose-50/50 border border-brand-red/30 rounded-3xl p-5 md:p-6 text-left shadow-sm flex flex-col md:flex-row gap-5 justify-between items-center animate-fade-in">
              <div className="flex gap-4 items-start w-full md:w-3/4">
                <div className="p-3 bg-brand-red text-white rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined !text-3xl font-black">emoji_events</span>
                </div>
                <div className="space-y-1.5">
                  <span className="text-[10px] uppercase tracking-widest font-black text-brand-red bg-brand-red/10 px-2.5 py-0.5 rounded-full inline-block">
                    {brand.type === 'synagogue' ? 'Tsedaká Comunitária' : `Generosidade ${brand.campusName}`}
                  </span>
                  <h3 className="text-lg font-black text-brand-dark tracking-tight">
                    Meta de Gratidão Diária 🎯
                  </h3>
                  <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed">
                    {brand.type === 'synagogue'
                      ? `No dia de ontem, nossa amada comunidade somou um total acumulado incrível de R$ 5.480,00 em tsedakás! Nossa meta hoje é alcançar esse valor para apoiar a manutenção da sinagoga e auxílio social.`
                      : `No dia de ontem, nossa amada comunidade somou um total acumulado incrível de R$ 5.480,00 em dízimos e ofertas voluntárias! Nossa meta hoje é igualar ou ultrapassar essa bênção para apoiar as ações sociais.`}
                  </p>
                </div>
              </div>
              
              {/* Progresso visual da Meta */}
              <div className="w-full md:w-1/4 bg-white border border-red-100 p-4 rounded-2xl flex flex-col justify-between shrink-0 shadow-inner">
                <div className="flex justify-between text-xs font-black text-slate-600 mb-2 uppercase tracking-wider text-[10px]">
                  <span>Progresso da Meta</span>
                  <span className="text-emerald-600 font-extrabold">82%</span>
                </div>
                {/* Progress bar */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-brand-red to-rose-500 rounded-full transition-all duration-1000" style={{ width: '82%' }} />
                </div>
                <div className="flex justify-between items-center mt-2.5 text-[10px] font-bold text-slate-500 font-sans">
                  <span>Hoje: R$ 4.500</span>
                  <span>Meta: R$ 5.480</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto pt-2">
              {categories.map((cat) => (
                <button
                  key={cat.title}
                  type="button"
                  onClick={() => handleSelectCategory(cat.title)}
                  className="bg-white hover:bg-slate-50 rounded-2xl p-6 text-left border-2 border-slate-200 cursor-pointer hover:border-brand-red transition-colors flex gap-5 items-center group shadow-sm active:scale-98 duration-100"
                >
                  <div className="w-14 h-14 rounded-full bg-brand-red/10 text-brand-red flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined !text-3xl">{cat.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-brand-dark group-hover:text-brand-red transition-colors">{cat.title}</h3>
                    <p className="text-xs text-slate-500 font-semibold">{cat.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}


        {/* STEP 2: CHOOSE VALUE PRESET OR CUSTOM VALUE */}
        {state.step === 'value' && (
          <div className="space-y-6 animate-fade-in justify-center">
            <header className="text-center max-w-xl mx-auto">
              <span className="bg-brand-red/10 text-brand-red text-[10px] font-black tracking-widest px-3 py-1 rounded-full uppercase border border-brand-red/20">
                {state.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-brand-dark mt-3">
                Escolha o valor da contribuição
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
              
              {/* Presets col */}
              <div className="space-y-3 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-widest font-black text-slate-600 block text-center mb-1">
                  Valores Prontos
                </span>

                <div className="grid grid-cols-2 gap-3">
                  {presetValues.map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => handleSelectPreset(v)}
                      className="key-tap h-20 bg-white hover:bg-red-50 text-brand-dark hover:text-brand-red border-2 border-slate-200 hover:border-brand-red rounded-2xl text-2xl font-black flex items-center justify-center shadow-sm cursor-pointer"
                    >
                      R$ {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom input with virtual keyboard */}
              <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 flex flex-col justify-between space-y-4">
                <div className="text-center">
                  <span className="text-xs uppercase tracking-widest font-black text-slate-500 block mb-1">
                    Valor Personalizado
                  </span>
                  
                  <div className="bg-white rounded-xl py-2 px-4 text-xl md:text-2xl font-black border border-slate-300 text-slate-800 tracking-tight flex items-center justify-center min-h-[52px]">
                    R$ {state.customValue || '0'}
                  </div>
                </div>

                {/* Reusable Keypad integration */}
                <div className="w-full">
                  <NumericKeypad 
                    onKeyPress={handleCustomValueKeyPress} 
                    onConfirm={handleCustomValueConfirm} 
                    confirmLabel="Confirmar Valor"
                  />
                </div>

                <p className="text-[10px] text-center text-slate-500 font-semibold">
                  Digite somente números sem pontos ou vírgulas
                </p>
              </div>

            </div>
          </div>
        )}

        {/* STEP 3: PIX QR CODE DISPLAY AND SIMULATE */}
        {state.step === 'pix' && (
          <div className="space-y-6 animate-fade-in text-center max-w-xl mx-auto">
            <header className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-black text-slate-500 block">PIX Facilitado</span>
              <h2 className="text-2xl font-black text-brand-dark">Aproxime o Celular</h2>
              <div className="text-xl font-extrabold text-brand-red bg-brand-red/10 rounded-full px-6 py-2.5 inline-block border border-brand-red/30 shadow-sm">
                Valor: R$ {state.value.toFixed(2)} ({state.category})
              </div>
            </header>

            {/* Simulated PIX QR display */}
            <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-lg flex flex-col items-center relative overflow-hidden">
              <div className="relative w-56 h-56 group border-2 border-brand-red/20 rounded-2xl overflow-hidden p-1 shadow-inner bg-slate-50">
                <img
                  className="w-full h-full object-contain rounded-xl pointer-events-none opacity-90"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_ptHuYhlDFyDexHL0MXiDWIWBLQywj4JYFKg9lNzTjM1PVcSDD5P9AkpH48mcS9VAxPD0SCLRkTk86Jc0fItS7fLrskbB0D-CE20Mpp83ZXA6R_Hh5hMcdgSSw5OQV6gkjjzmuI2XP6r3pjC5vurY4SgT1g__rD4uRh6b6NVv4x6_TJtVdDwrgfH6FuHvLgiEJFbqa5zc-GQ4YvskFfGOalToE-66bFI3wVUaNPmvV_C8jyNy9FjlE4QSUlPLEoc58jSKl4bAhegS"
                  alt="PIX QR Code"
                  referrerPolicy="no-referrer"
                />
                {/* Scan line overlay */}
                <div className="absolute left-0 w-full h-1 bg-brand-red scan-line rounded-full opacity-80" />
              </div>

              {/* Countdown timer display */}
              <div className="mt-4 flex items-center justify-center gap-2 text-slate-700 bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl">
                <span className="material-symbols-outlined text-brand-red !text-lg animate-spin">autorenew</span>
                <span className="text-xs font-black uppercase tracking-wider">O código expira em:</span>
                <span className="text-sm font-extrabold text-brand-red font-mono">{formatTimer(pixTimer)}</span>
              </div>

              {/* Copy paste button */}
              <div className="mt-4 w-full">
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="w-full h-12 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 rounded-xl font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-95 text-xs uppercase tracking-wider"
                >
                  <span className="material-symbols-outlined !text-base">content_copy</span>
                  <span>{copied ? 'Chave Copiada!' : 'Copiar Chave PIX Copia e Cola'}</span>
                </button>
              </div>

              <p className="text-xs text-slate-500 font-semibold mt-4 leading-relaxed">
                Abra o aplicativo do seu banco, selecione a opção "Pagar com PIX/QR Code" e aponte para o código acima para concluir.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCompletePix}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl flex items-center justify-center gap-3 cursor-pointer shadow-md active:scale-98 transition-transform"
            >
              <span className="material-symbols-outlined !text-2xl">check_circle</span>
              <span>Simular Pagamento Confirmado</span>
            </button>
          </div>
        )}

        {/* STEP 4: SUCCESS CONGRATS BIBLICAL QUOTE */}
        {state.step === 'success' && (
          <div className="space-y-6 text-center animate-fade-in max-w-xl mx-auto py-8">
            <div className="w-24 h-24 bg-brand-red rounded-full flex items-center justify-center mx-auto text-white shadow-md">
              <span className="material-symbols-outlined !text-5xl font-black animate-pulse">favorite</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-black text-brand-dark tracking-tight">Muito Obrigado!</h2>
              <p className="text-base text-slate-600 font-semibold">
                {brand.type === 'synagogue'
                  ? 'Sua tsedaká apoia os estudos da Torá, os serviços diários e as ações de auxílio social da nossa comunidade.'
                  : `Sua generosidade faz a igreja de Cristo crescer e transbordar amor e bênçãos em nossa região de ${brand.campusName}.`}
              </p>
            </div>

            {/* Biblical snippet graphic style card */}
            {brand.type === 'synagogue' ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 italic text-slate-500 relative shadow-sm">
                <span className="absolute -top-3 left-6 px-3 py-0.5 bg-brand-red text-white font-black text-[10px] uppercase rounded-full tracking-widest block">
                  Palavra da Torá
                </span>
                "Abra a sua mão para o seu irmão, para o seu pobre e para o seu necessitado na sua terra."
                <p className="font-extrabold text-brand-dark text-xs uppercase tracking-wider mt-3">Deuteronômio 15:11</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 italic text-slate-500 relative shadow-sm">
                <span className="absolute -top-3 left-6 px-3 py-0.5 bg-brand-red text-white font-black text-[10px] uppercase rounded-full tracking-widest block">
                  Palavra do Altar
                </span>
                "Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama a quem dá com alegria."
                <p className="font-extrabold text-brand-dark text-xs uppercase tracking-wider mt-3">2 Coríntios 9:7</p>
              </div>
            )}

            <button
              type="button"
              onClick={onGoHome}
              className="h-14 px-12 bg-brand-dark hover:bg-brand-red text-white font-bold rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              Voltar ao Início
            </button>
          </div>
        )}

      </main>

      {/* Spacing empty footer padding footer */}
      <footer className="h-10 w-full" />

    </div>
  );
}
