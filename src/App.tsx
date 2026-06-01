import React, { useState, useEffect } from 'react';
import { ViewState } from './types';
import HomeView from './components/HomeView';
import DashboardView from './components/DashboardView';
import NewMemberView from './components/NewMemberView';
import PrayerRequestView from './components/PrayerRequestView';
import CheckinView from './components/CheckinView';
import CheckinSuccessView from './components/CheckinSuccessView';
import MinistryView from './components/MinistryView';
import DonationView from './components/DonationView';
import MyCellView from './components/MyCellView';
import PastoralView from './components/PastoralView';
import InactivityTimer from './components/InactivityTimer';
import { playTapSound, playSuccessSound } from './utils/audio';
import { speakText, setVoiceAssistEnabled } from './utils/tts';
import { getCurrentBrand } from './utils/brand';

export default function App() {
  const [view, setView] = useState<ViewState>('home');
  const [highContrast, setHighContrast] = useState(false);
  const [textZoom, setTextZoom] = useState(false);
  const [voiceAssist, setVoiceAssist] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);

  const brand = getCurrentBrand();

  useEffect(() => {
    document.documentElement.style.setProperty('--color-brand-red', brand.primaryColor);
    document.documentElement.style.setProperty('--color-brand-red-hover', brand.primaryColorHover);
    document.title = `Santuário Digital - ${brand.name}`;
  }, [brand]);

  const handleStart = () => {
    setView('dashboard');
    speakText('Entrando no painel principal. Como podemos ajudar você hoje?');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
    speakText('Retornando ao painel principal.');
  };

  const handleGoHome = () => {
    setView('home');
    speakText('Retornando à tela inicial.');
  };

  const handleCheckinSuccess = () => {
    setView('checkin_success');
  };

  return (
    <InactivityTimer currentView={view} onReset={handleGoHome}>
      <div 
        className={`min-h-screen select-none transition-all duration-300 ${
          highContrast ? 'high-contrast-active bg-black text-yellow-400 font-bold' : 'bg-brand-light text-[#191c1e]'
        } ${textZoom ? 'text-zoom-active' : ''}`}
      >
        {view === 'home' && (
          <HomeView 
            onStart={handleStart} 
            onOpenAccessibility={() => setShowAccessModal(true)}
            brand={brand}
          />
        )}

        {view === 'dashboard' && (
          <DashboardView 
            onSelectView={(v) => {
              setView(v);
              // Provide vocal guidance on view change
              if (v === 'new_member') speakText(`Iniciando formulário de ${brand.termMember.toLowerCase()}.`);
              else if (v === 'prayer') speakText(`Abri a tela para enviar pedidos de ${brand.type === 'synagogue' ? 'orações' : 'oração'}.`);
              else if (v === 'checkin') speakText(`Acessando check-in de ${brand.termCults.toLowerCase()} e encontros.`);
              else if (v === 'donations') speakText(`Acessando altar de generosidade para ${brand.termDonations.toLowerCase()}.`);
              else if (v === 'ministries') speakText('Abrindo painel de voluntariado e atividades.');
              else if (v === 'my_cell') speakText(`Abri a busca de ${brand.termConnects.toLowerCase()}.`);
              else if (v === 'pastoral') speakText(`Exibindo ${brand.termPastors.toLowerCase()} de plantão.`);
            }} 
            onGoHome={handleGoHome} 
            onOpenAccessibility={() => setShowAccessModal(true)}
            brand={brand}
          />
        )}

        {view === 'new_member' && (
          <NewMemberView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
            brand={brand}
          />
        )}

        {view === 'prayer' && (
          <PrayerRequestView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
            brand={brand}
          />
        )}

        {view === 'checkin' && (
          <CheckinView 
            onBack={handleBackToDashboard} 
            onSuccess={handleCheckinSuccess} 
            brand={brand}
          />
        )}

        {view === 'checkin_success' && (
          <CheckinSuccessView 
            onGoHome={handleGoHome} 
            brand={brand}
          />
        )}

        {view === 'ministries' && (
          <MinistryView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
            brand={brand}
          />
        )}

        {view === 'donations' && (
          <DonationView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
            brand={brand}
          />
        )}

        {view === 'my_cell' && (
          <MyCellView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
            brand={brand}
          />
        )}

        {view === 'pastoral' && (
          <PastoralView 
            onBack={handleBackToDashboard} 
            onGoHome={handleGoHome} 
            brand={brand}
          />
        )}

        {/* Global Accessibility Modal Overlay */}
        {showAccessModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 select-none animate-fade-in">
            <div className="bg-white text-brand-dark rounded-3xl w-full max-w-md shadow-2xl p-8 border border-slate-200 text-center space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-brand-red" />
              
              <div className="space-y-2">
                <h3 className="text-2xl font-black tracking-tight">Painel de Acessibilidade</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Ajuste as configurações para uma melhor experiência de leitura e interação no totem.
                </p>
              </div>
              
              <div className="space-y-4">
                {/* Toggle High Contrast */}
                <button
                  type="button"
                  onClick={() => {
                    playTapSound();
                    const next = !highContrast;
                    setHighContrast(next);
                    speakText(next ? "Alto contraste ativado" : "Alto contraste desativado", true);
                  }}
                  className={`w-full p-4 rounded-2xl border-2 font-bold text-left flex justify-between items-center transition-colors ${
                    highContrast ? 'border-brand-red bg-red-50/50 text-brand-red' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined">contrast</span>
                    Alto Contraste
                  </span>
                  <span className="material-symbols-outlined !text-3xl">
                    {highContrast ? 'toggle_on' : 'toggle_off'}
                  </span>
                </button>

                {/* Toggle Text Zoom */}
                <button
                  type="button"
                  onClick={() => {
                    playTapSound();
                    const next = !textZoom;
                    setTextZoom(next);
                    speakText(next ? "Fonte ampliada ativada" : "Fonte ampliada desativada", true);
                  }}
                  className={`w-full p-4 rounded-2xl border-2 font-bold text-left flex justify-between items-center transition-colors ${
                    textZoom ? 'border-brand-red bg-red-50/50 text-brand-red' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined">zoom_in</span>
                    Fonte Ampliada
                  </span>
                  <span className="material-symbols-outlined !text-3xl">
                    {textZoom ? 'toggle_on' : 'toggle_off'}
                  </span>
                </button>

                {/* Toggle Screen Reader / Voice Assist */}
                <button
                  type="button"
                  onClick={() => {
                    playTapSound();
                    const next = !voiceAssist;
                    setVoiceAssist(next);
                    setVoiceAssistEnabled(next);
                  }}
                  className={`w-full p-4 rounded-2xl border-2 font-bold text-left flex justify-between items-center transition-colors ${
                    voiceAssist ? 'border-brand-red bg-red-50/50 text-brand-red' : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="material-symbols-outlined">volume_up</span>
                    Guia de Voz (Leitor)
                  </span>
                  <span className="material-symbols-outlined !text-3xl">
                    {voiceAssist ? 'toggle_on' : 'toggle_off'}
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => { playTapSound(); setShowAccessModal(false); }}
                className="w-full h-12 bg-brand-dark hover:bg-brand-red text-white font-extrabold uppercase tracking-widest rounded-xl transition-colors cursor-pointer text-sm"
              >
                Voltar ao Totem
              </button>
            </div>
          </div>
        )}
      </div>
    </InactivityTimer>
  );
}

