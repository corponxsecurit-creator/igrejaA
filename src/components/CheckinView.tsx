import React, { useState } from 'react';
import { ViewState, CheckinState } from '../types';
import { churchMembers } from '../data';
import { playTapSound, playSuccessSound } from '../utils/audio';
import NumericKeypad from './NumericKeypad';
import VirtualKeyboard from './VirtualKeyboard';
import LiveClock from './LiveClock';

interface CheckinViewProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function CheckinView({ onBack, onSuccess }: CheckinViewProps) {
  const [method, setMethod] = useState<'qr' | 'phone' | 'name'>('qr');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameSearch, setNameSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleMethodSelect = (m: 'qr' | 'phone' | 'name') => {
    playTapSound();
    setMethod(m);
  };

  const handlePhoneKeyPress = (char: string) => {
    if (char === 'BACKSPACE') {
      setPhoneNumber((prev) => prev.slice(0, -1));
      return;
    }
    if (char === 'CLEAR') {
      setPhoneNumber('');
      return;
    }

    const clean = (phoneNumber + char).replace(/\D/g, '');
    if (clean.length <= 11) {
      setPhoneNumber(clean);
    }
  };

  const formatPhone = (raw: string) => {
    if (!raw) return '';
    const clean = raw.replace(/\D/g, '');
    if (clean.length <= 2) return `(${clean}`;
    if (clean.length <= 7) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  const handleNameKeyPress = (char: string) => {
    setSelectedMember(null);
    if (char === 'BACKSPACE') {
      setNameSearch((prev) => prev.slice(0, -1));
      return;
    }
    if (char === 'CLEAR') {
      setNameSearch('');
      return;
    }
    if (char === 'SPACE') {
      setNameSearch((prev) => prev + ' ');
      return;
    }
    
    if (nameSearch.length < 30) {
      setNameSearch((prev) => prev + char);
    }
  };

  const filteredMembers = churchMembers.filter((m) =>
    m.toLowerCase().includes(nameSearch.toLowerCase())
  );

  const handleConfirmCheckin = () => {
    if (method === 'phone' && phoneNumber.length < 10) {
      alert('Por favor, informe um telefone válido com código de área.');
      return;
    }
    if (method === 'name' && !selectedMember) {
      alert('Por favor, busque e selecione um membro da lista para realizar o check-in.');
      return;
    }

    playSuccessSound();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 1500);
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
          <span className="text-xs uppercase tracking-widest text-brand-red font-black block">Totem de Acesso</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">Check-in do Culto</h1>
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

      {/* Main Layout */}
      <main className="flex-grow pt-28 pb-32 px-6 md:px-20 max-w-7xl mx-auto w-full flex flex-col justify-center">
        
        {isProcessing ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <div className="w-16 h-16 border-t-4 border-brand-red border-solid rounded-full animate-spin" />
            <h3 className="font-bold text-xl text-brand-dark tracking-tight">Processando Check-in...</h3>
            <p className="text-[#5c6066]">Aguarde um momento enquanto confirmamos sua presença.</p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6 items-stretch">
            
            {/* LEFT SIDEBAR PANEL: Event presentation box */}
            <div className="col-span-12 md:col-span-4 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 flex flex-col justify-between relative min-h-[380px]">
              {/* Event Cover Image */}
              <div className="relative h-48 w-full">
                <img
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvU--QNk4z3WPm2_QP2mx3Fg70KGHCOdM_ArPdrANHx6VPuQiWhf1HJ6CM_x-hDkveCxWYpO6f1_SMrVShNHhJ8i8c2_EQWfgAvmuh_PhQMr1CiOLCZ_E8TqQdPCkrT_34UPEZYGjzAeKmQWJfjg5-7HERai1Zb08k1WG0sHFKKjYvu-Ixuf8Bf6XbhzR0cQl4N7Ixu58rarnwCnZk3ZgYOJPSXQLOhMChfIofIoOglrmC5MimQEqDw4KkxcLfQsor5BQzbYnWKJoC"
                  alt="Culto de Celebração"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <span className="bg-brand-red text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md block w-fit mb-1 border border-brand-red-hover">
                    Células &amp; Celebração
                  </span>
                  <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                    Conferência Global Atitude
                  </h2>
                </div>
              </div>

              {/* Event Meta specifics */}
              <div className="p-6 md:p-8 flex-grow flex flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3 text-slate-700">
                    <span className="material-symbols-outlined text-brand-red !text-2xl">schedule</span>
                    <div>
                      <p className="font-bold text-sm text-brand-dark">Horário de entrada</p>
                      <p className="text-xs text-slate-500">19:30 - 22:00, Auditório Principal</p>
                    </div>
                  </div>

                  <div className="flex gap-3 text-slate-700">
                    <span className="material-symbols-outlined text-brand-red !text-2xl">pin_drop</span>
                    <div>
                      <p className="font-bold text-sm text-brand-dark">Localização</p>
                      <p className="text-xs text-slate-500">Al. Rio Negro, 1200 - Alphaville</p>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50/50 rounded-2xl p-4 border border-dashed border-brand-red/20 text-xs text-slate-500 font-medium">
                  <p className="font-bold text-slate-700 mb-1">Problemas no check-in?</p>
                  Por favor, chame um de nossos voluntários no saguão de entrada com crachá vermelho para validação manual.
                </div>
              </div>
            </div>

            {/* RIGHT MAIN PANEL: Active checking selector and methods tabs */}
            <div className="col-span-12 md:col-span-8 bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-between p-6 md:p-8">
              
              {/* Selector Custom Navigation Tabs */}
              <div className="flex bg-slate-100 rounded-2xl p-1.5 justify-between w-full border border-slate-200 shrink-0">
                <button
                  type="button"
                  onClick={() => handleMethodSelect('qr')}
                  className={`flex-1 py-3 text-center rounded-xl font-black text-xs md:text-sm tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    method === 'qr' ? 'bg-brand-dark text-white shadow-md' : 'text-slate-600 hover:bg-slate-200/50'
                  }`}
                >
                  <span className="material-symbols-outlined !text-xl">qr_code_scanner</span>
                  <span>QR Ticket</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMethodSelect('phone')}
                  className={`flex-1 py-3 text-center rounded-xl font-black text-xs md:text-sm tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    method === 'phone' ? 'bg-brand-dark text-white shadow-md' : 'text-slate-600 hover:bg-slate-200/50'
                  }`}
                >
                  <span className="material-symbols-outlined !text-xl">phone_iphone</span>
                  <span>Celular</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleMethodSelect('name')}
                  className={`flex-1 py-3 text-center rounded-xl font-black text-xs md:text-sm tracking-wider uppercase flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                    method === 'name' ? 'bg-brand-dark text-white shadow-md' : 'text-slate-600 hover:bg-slate-200/50'
                  }`}
                >
                  <span className="material-symbols-outlined !text-xl">badge</span>
                  <span>Pelo Nome</span>
                </button>
              </div>

              {/* Dynamic TAB contents */}
              <div className="flex-grow py-6 flex flex-col justify-center">
                
                {/* METHOD 1: QR Code Ticket Scanner simulator */}
                {method === 'qr' && (
                  <div className="space-y-6 text-center animate-fade-in flex flex-col items-center">
                    <p className="text-sm font-black text-slate-600 uppercase tracking-widest">
                      Aproxime seu celular com o QR Code
                    </p>

                    {/* Viewfinder simulated layout */}
                    <div 
                      onClick={handleConfirmCheckin}
                      className="relative w-60 h-60 border-4 border-brand-red rounded-3xl overflow-hidden bg-black/5 cursor-pointer group shadow-inner"
                      title="Clique para simular um escaneamento bem-sucedido!"
                    >
                      {/* Animated scan bar */}
                      <div className="absolute left-0 w-full h-1 bg-brand-red scan-line rounded-full opacity-80" />
                      
                      {/* Target lines around */}
                      <div className="absolute inset-8 border border-dashed border-slate-350 rounded-2xl flex items-center justify-center flex-col opacity-60">
                        <span className="material-symbols-outlined !text-6xl text-slate-400 group-hover:scale-110 transition-transform">
                          qr_code_scanner
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mt-2 group-hover:text-brand-red duration-205">
                          Toque para scannear
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-455 bg-slate-50 px-4 py-2 rounded-full border border-slate-200">
                      Simule o escaneamento tocando no leitor acima
                    </p>
                  </div>
                )}

                {/* METHOD 2: Phone Input Numeric Keypad approach */}
                {method === 'phone' && (
                  <div className="space-y-4 text-center animate-fade-in w-full max-w-sm mx-auto">
                    <div className="bg-slate-100 rounded-2xl py-3 px-6 text-2xl font-black text-brand-dark border-2 border-slate-200 tracking-widest min-h-[56px] flex items-center justify-center shadow-inner">
                      {formatPhone(phoneNumber) || 'Digite seu telefone'}
                    </div>

                    <NumericKeypad 
                      onKeyPress={handlePhoneKeyPress} 
                      onConfirm={handleConfirmCheckin} 
                      confirmLabel="Realizar Check-in"
                    />
                  </div>
                )}

                {/* METHOD 3: Search name database check-in */}
                {method === 'name' && (
                  <div className="space-y-4 animate-fade-in text-left flex flex-col justify-between">
                    <div className="space-y-1.5 shrink-0">
                      <span className="text-xs font-black uppercase tracking-wider text-brand-red ml-1">
                        Consulte seu Nome
                      </span>
                      <div className="relative">
                        <input
                          type="text"
                          readOnly
                          value={nameSearch}
                          placeholder="Busque por letras abaixo..."
                          className="w-full h-12 px-4 bg-slate-150 rounded-xl border border-slate-300 font-bold text-slate-800 pointer-events-none"
                        />
                        {nameSearch && (
                          <button
                            type="button"
                            onClick={() => { playTapSound(); setNameSearch(''); setSelectedMember(null); }}
                            className="absolute right-3 top-2.5 hover:bg-slate-200 rounded-full w-7 h-7 flex items-center justify-center font-bold text-slate-550 cursor-pointer text-xs"
                          >
                            X
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Filter result members */}
                    <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-250 min-h-[120px] max-h-[140px] overflow-y-auto space-y-1 shrink-0">
                      {filteredMembers.length > 0 ? (
                        filteredMembers.map((m) => {
                          const isSelected = selectedMember === m;
                          return (
                            <button
                              key={m}
                              type="button"
                              onClick={() => { playTapSound(); setSelectedMember(m); }}
                              className={`w-full text-left font-semibold text-sm px-4 py-2 rounded-xl cursor-pointer ${
                                isSelected 
                                  ? 'bg-brand-red text-white font-black shadow-sm' 
                                  : 'hover:bg-slate-150 text-slate-700'
                              }`}
                            >
                              {m}
                            </button>
                          );
                        })
                      ) : (
                        <p className="text-center text-xs text-slate-400 py-6">Nenhum membro encontrado com as iniciais atuais.</p>
                      )}
                    </div>

                    {/* Integrated On screen keyboard for name query */}
                    <div className="w-full pt-1.5 border-t border-slate-100 shrink-0">
                      <VirtualKeyboard onKeyPress={handleNameKeyPress} />
                    </div>
                  </div>
                )}

              </div>

              {/* Central Bottom Action triggered inside right panel */}
              {method === 'name' && (
                <button
                  type="button"
                  onClick={handleConfirmCheckin}
                  className="w-full h-14 bg-brand-dark hover:bg-brand-red text-white font-black text-lg flex items-center justify-center rounded-2xl shadow-md cursor-pointer transition-colors shrink-0"
                >
                  Confirmar Presença
                </button>
              )}

            </div>

          </div>
        )}

      </main>

      {/* Footer empty layout for alignment spacing */}
      <footer className="h-10 w-full" />

    </div>
  );
}
