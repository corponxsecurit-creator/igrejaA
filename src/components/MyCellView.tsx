import React, { useState } from 'react';
import { cellGroups } from '../data';
import { CellGroup } from '../types';
import { playTapSound, playSuccessSound } from '../utils/audio';
import NumericKeypad from './NumericKeypad';
import LiveClock from './LiveClock';

interface MyCellViewProps {
  onBack: () => void;
  onGoHome: () => void;
}

export default function MyCellView({ onBack, onGoHome }: MyCellViewProps) {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('Todos');
  const [activeCellModal, setActiveCellModal] = useState<CellGroup | null>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  // Neighbors select list
  const neighborhoods = ['Todos', 'Alphaville', 'Tamboré', 'Barueri', 'Santana de Parnaíba'];

  const filteredCells = selectedNeighborhood === 'Todos'
    ? cellGroups
    : cellGroups.filter((c) => c.neighborhood.toLowerCase().includes(selectedNeighborhood.toLowerCase()));

  const handleNeighborhoodSelect = (n: string) => {
    playTapSound();
    setSelectedNeighborhood(n);
  };

  const handleCellModalOpen = (cell: CellGroup) => {
    playTapSound();
    setActiveCellModal(cell);
  };

  const handleCloseModal = () => {
    playTapSound();
    setActiveCellModal(null);
    setPhoneNumber('');
    setIsJoined(false);
  };

  const handleKeypadPress = (char: string) => {
    if (char === 'BACKSPACE') {
      setPhoneNumber((prev) => prev.slice(0, -1));
      return;
    }
    if (char === 'CLEAR') {
      setPhoneNumber('');
      return;
    }
    
    // Clean to keep digits only and limit size
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

  const handleSubmitAddress = () => {
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      alert('Por favor, informe um número de celular com WhatsApp válido (DDD + Número).');
      return;
    }
    setIsJoined(true);
    playSuccessSound();
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
          <span className="text-xs uppercase tracking-widest text-brand-red font-black block">Pequenos Grupos</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">Encontre sua Célula</h1>
        </div>

        <div className="hidden md:block">
          <LiveClock />
        </div>

        <button
          type="button"
          onClick={handleGoBack}
          className="flex items-center gap-2 text-slate-650 hover:bg-slate-100 px-4 py-2 rounded-xl transition-all cursor-pointer font-bold border border-slate-200"
        >
          <span className="material-symbols-outlined !text-xl">arrow_back</span>
          <span>Voltar</span>
        </button>
      </header>

      {/* Main Content frame */}
      <main className="flex-grow pt-28 pb-32 px-6 md:px-20 max-w-7xl mx-auto w-full flex flex-col justify-center">
        
        {/* Neighborhood selectors line */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl gap-2 mb-8 overflow-x-auto border border-slate-200">
          {neighborhoods.map((n) => {
            const isSelected = selectedNeighborhood === n;
            return (
              <button
                key={n}
                type="button"
                onClick={() => handleNeighborhoodSelect(n)}
                className={`py-3 px-6 rounded-xl font-black text-xs md:text-sm tracking-wider uppercase transition-all duration-150 whitespace-nowrap cursor-pointer flex-grow text-center ${
                  isSelected 
                    ? 'bg-brand-dark text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-200/50'
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>

        {/* Cells Layout list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCells.length > 0 ? (
            filteredCells.map((cell) => (
              <div
                key={cell.id}
                className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col justify-between items-stretch hover:border-brand-red transition-colors duration-200"
                id={`cell-${cell.id}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-red-50 text-brand-red text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-md block border border-red-100">
                      {cell.neighborhood}
                    </span>
                    <span className="material-symbols-fill text-brand-red !text-2xl">hub</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-brand-dark tracking-tight leading-tight uppercase">
                    {cell.name}
                  </h3>
                  
                  <div className="mt-4 space-y-2.5">
                    <div className="flex items-center gap-2.5 text-slate-600 font-medium text-sm">
                      <span className="material-symbols-outlined !text-lg text-slate-400">person</span>
                      <span>Líder: <strong className="text-brand-dark">{cell.leader}</strong></span>
                    </div>

                    <div className="flex items-center gap-2.5 text-slate-600 font-medium text-sm">
                      <span className="material-symbols-outlined !text-lg text-slate-400">schedule</span>
                      <span>{cell.day} às {cell.hour}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleCellModalOpen(cell)}
                  className="w-full h-12 bg-slate-50 hover:bg-red-50 text-brand-dark hover:text-brand-red font-black text-xs uppercase tracking-wider rounded-xl mt-6 transition-colors cursor-pointer border border-slate-200 flex items-center justify-center gap-1"
                >
                  <span>Quero Visitar</span>
                  <span className="material-symbols-outlined !text-base">arrow_forward</span>
                </button>
              </div>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-slate-400 font-medium space-y-2 bg-slate-50 border border-slate-200 rounded-3xl">
              <span className="material-symbols-outlined !text-5xl text-slate-300">block</span>
              <p>Nenhuma célula cadastrada nesta região no momento.</p>
            </div>
          )}
        </div>

      </main>

      {/* Address pop-up request modal */}
      {activeCellModal && (
        <div className="fixed inset-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50 flex items-center justify-center p-6 animate-fade-in select-none">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
            
            {/* Header */}
            <div className="p-6 bg-brand-dark text-white border-b flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest bg-brand-red px-2.5 py-1 rounded-md mb-1 block w-fit">
                  Visitar Grupo
                </span>
                <h3 className="text-xl font-bold uppercase tracking-tight">{activeCellModal.name}</h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              {isJoined ? (
                <div className="text-center space-y-4 py-4 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <span className="material-symbols-outlined !text-3xl font-black">done</span>
                  </div>
                  <h4 className="text-xl font-black text-brand-dark">Endereço Enviado!</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    O endereço completo e as coordenadas da Célula de <span className="font-bold text-brand-dark">{activeCellModal.leader}</span> foram enviados por WhatsApp para o número <span className="font-bold text-brand-dark">{formatPhone(phoneNumber)}</span>. Seja muito bem-vindo!
                  </p>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="h-12 w-full bg-brand-dark hover:bg-brand-red text-white font-bold rounded-xl mt-4 transition-colors cursor-pointer text-sm"
                  >
                    Fechar Janela
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-semibold mb-4 bg-red-50 rounded-xl p-3 border border-red-100">
                    Por segurança de nossos pequenos grupos, enviamos o endereço completo exclusivamente por WhatsApp.
                  </p>

                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs uppercase tracking-widest font-black text-brand-red ml-1">
                      Seu WhatsApp / Celular
                    </label>
                    <div className="w-full h-12 px-4 rounded-xl border border-slate-350 bg-slate-50 font-bold text-slate-800 flex items-center text-lg shadow-inner">
                      {formatPhone(phoneNumber) || <span className="text-slate-400 font-normal">Digite seu celular</span>}
                    </div>
                  </div>

                  <div className="py-2 border-t border-slate-100">
                    <NumericKeypad 
                      onKeyPress={handleKeypadPress} 
                      onConfirm={handleSubmitAddress} 
                      confirmLabel="Solicitar Endereço"
                    />
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Spacing empty footer padding footer */}
      <footer className="h-10 w-full" />

    </div>
  );
}
