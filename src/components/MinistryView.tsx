import React, { useState } from 'react';
import { playTapSound, playSuccessSound } from '../utils/audio';
import VirtualKeyboard from './VirtualKeyboard';
import NumericKeypad from './NumericKeypad';
import LiveClock from './LiveClock';
import { BrandConfig } from '../utils/brand';

interface MinistryViewProps {
  onBack: () => void;
  onGoHome: () => void;
  brand: BrandConfig;
}

interface Ministry {
  id: string;
  name: string;
  tag: string;
  icon: string;
  color: string;
  wide?: boolean;
  desc: string;
}

export default function MinistryView({ onBack, onGoHome, brand }: MinistryViewProps) {
  const [selectedMinistry, setSelectedMinistry] = useState<Ministry | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [activeField, setActiveField] = useState<'name' | 'phone' | null>('name');
  const [isSuccess, setIsSuccess] = useState(false);

  const getMinistriesData = (): Ministry[] => {
    if (brand.id === 'beityaacov') {
      return [
        {
          id: 'chazanut',
          name: 'Chazanut (Canto Litúrgico)',
          tag: 'Serviço da Sinagoga',
          icon: 'music_note',
          color: 'bg-indigo-900 border-indigo-950',
          wide: true,
          desc: 'Sirva auxiliando nas preces cantadas e nos serviços litúrgicos da nossa sinagoga.',
        },
        {
          id: 'recepcao',
          name: 'Recepção (Hachnassat Orchim)',
          tag: 'Acolhimento',
          icon: 'front_hand',
          color: 'bg-[#d4af37] border-yellow-600',
          desc: 'Acolha calorosamente e diga Shalom Aleichem a todos os membros e visitantes que entram.',
        },
        {
          id: 'estudos',
          name: 'Estudos da Torá',
          tag: 'Shiurim & Classes',
          icon: 'import_contacts',
          color: 'bg-brand-charcoal border-slate-800',
          desc: 'Apoie na organização de shiurim, palestras e aulas de Torá e Cabalá.',
        },
        {
          id: 'seguranca',
          name: 'Zelo & Segurança',
          tag: 'Organização',
          icon: 'verified_user',
          color: 'bg-rose-950 border-rose-900',
          desc: 'Zele pelo ambiente das preces, garantindo que todas as famílias estejam seguras.',
        },
        {
          id: 'kids',
          name: 'Beit Midrash Kids',
          tag: 'Educação Infantil',
          icon: 'child_care',
          color: 'bg-emerald-900 border-emerald-950',
          desc: 'Auxilie no ensino infantil e atividades recreativas sobre as tradições judaicas.',
        },
        {
          id: 'chesed',
          name: 'Chesed & Ação Social',
          tag: 'Ajuda Comunitária',
          icon: 'diversity_1',
          color: 'bg-[#0f172a] border-[#1e293b]',
          wide: true,
          desc: 'Leve cestas kosher, apoio material e dignidade às famílias necessitadas da nossa comunidade.',
        }
      ];
    }

    if (brand.id === 'universal') {
      return [
        {
          id: 'evg',
          name: 'Evangelização (EVG)',
          tag: 'Apoio Social & Fé',
          icon: 'volunteer_activism',
          color: 'bg-indigo-900 border-indigo-950',
          wide: true,
          desc: 'Leve a palavra de fé e apoio humanitário nos hospitais, presídios e comunidades.',
        },
        {
          id: 'fju',
          name: 'Força Jovem Universal (FJU)',
          tag: 'Jovens',
          icon: 'groups',
          color: 'bg-brand-red border-brand-red-hover',
          desc: 'Auxilie a juventude com atividades de música, esporte, teatro, dança e integração.',
        },
        {
          id: 'caleb',
          name: 'Grupo Caleb',
          tag: 'Melhor Idade',
          icon: 'elderly',
          color: 'bg-[#cf2e2e] border-red-800',
          desc: 'Preste acolhimento, carinho e assistência à melhor idade em nossas reuniões de fé.',
        },
        {
          id: 'unisocial',
          name: 'Grupo Unisocial',
          tag: 'Ação Social',
          icon: 'diversity_1',
          color: 'bg-[#0f172a] border-[#1e293b]',
          wide: true,
          desc: 'Leve alimentos, roupas, amor e dignidade para as comunidades necessitadas da região.',
        },
        {
          id: 'recepcao',
          name: 'Zelo & Organização',
          tag: 'Boas-Vindas',
          icon: 'front_hand',
          color: 'bg-brand-charcoal border-slate-800',
          desc: 'Apoie na recepção do Templo, orientação de assentos e segurança do saguão.',
        }
      ];
    }

    // Default or Atitude/Lagoinha
    return [
      {
        id: 'louvor',
        name: 'Louvor & Adoração',
        tag: 'Ministério de Música',
        icon: 'music_note',
        color: 'bg-indigo-900 border-indigo-950',
        wide: true,
        desc: `Sirva ao Senhor tocando instrumentos ou cantando no altar de comunhão da ${brand.name}.`,
      },
      {
        id: 'recepcao',
        name: 'Recepção',
        tag: 'Boas-Vindas',
        icon: 'front_hand',
        color: 'bg-brand-red border-brand-red-hover',
        desc: `A primeira impressão que acolhe vidas. Diga "Bem-vindo!" a quem entra na casa de Deus.`,
      },
      {
        id: 'midia',
        name: 'Mídia & Som',
        tag: 'Tecnologia & Projeção',
        icon: 'videocam',
        color: 'bg-brand-charcoal border-slate-800',
        desc: 'Transmissão online, áudio das bandas, fotografia e projeções de letras.',
      },
      {
        id: 'infantil',
        name: `${brand.name} Kids`,
        tag: 'Educação Infantil',
        icon: 'child_care',
        color: 'bg-emerald-900 border-emerald-950',
        desc: 'Ensine o caminho do Senhor de forma divertida para as nossas amadas crianças.',
      },
      {
        id: 'seguranca',
        name: 'Segurança & Apoio',
        tag: 'Zelo & Organização',
        icon: 'verified_user',
        color: 'bg-rose-950 border-rose-900',
        desc: 'Garantir que todos os membros e suas famílias adorem em paz e com segurança.',
      },
      {
        id: 'intercessao',
        name: 'Intercessão',
        tag: 'Espiritualidade & Clamor',
        icon: 'volunteer_activism',
        color: 'bg-amber-950 border-amber-900',
        wide: true,
        desc: 'Sustente o corpo de Cristo e os cultos em oração nos bastidores e vigílias santas.',
      },
      {
        id: 'social',
        name: 'Ação Social',
        tag: 'Apoio Comunitário',
        icon: 'diversity_1',
        color: 'bg-[#0f172a] border-[#1e293b]',
        wide: true,
        desc: `Leve alimentos, roupas, amor e dignidade para as comunidades carentes de ${brand.campusName} e região.`,
      }
    ];
  };

  const ministries = getMinistriesData();

  const handleMinistrySelect = (min: Ministry) => {
    playTapSound();
    setSelectedMinistry(min);
    setActiveField('name'); // focus name first
  };

  const handleClose = () => {
    playTapSound();
    setSelectedMinistry(null);
    setName('');
    setPhone('');
    setActiveField('name');
    setIsSuccess(false);
  };

  const handleKeyboardPress = (char: string) => {
    if (char === 'BACKSPACE') {
      setName((prev) => prev.slice(0, -1));
      return;
    }
    if (char === 'CLEAR') {
      setName('');
      return;
    }
    if (char === 'SPACE') {
      setName((prev) => prev + ' ');
      return;
    }
    
    // limit name length
    if (name.length < 40) {
      setName((prev) => prev + char);
    }
  };

  const handleKeypadPress = (char: string) => {
    if (char === 'BACKSPACE') {
      setPhone((prev) => prev.slice(0, -1));
      return;
    }
    if (char === 'CLEAR') {
      setPhone('');
      return;
    }
    
    const clean = (phone + char).replace(/\D/g, '');
    if (clean.length <= 11) {
      setPhone(clean);
    }
  };

  const formatPhone = (raw: string) => {
    if (!raw) return '';
    const clean = raw.replace(/\D/g, '');
    if (clean.length <= 2) return `(${clean}`;
    if (clean.length <= 7) return `(${clean.slice(0, 2)}) ${clean.slice(2)}`;
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7, 11)}`;
  };

  const handleRegisterSubmit = () => {
    if (!name.trim()) {
      alert('Por favor, informe seu nome completo.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      alert('Por favor, informe seu celular com WhatsApp válido.');
      return;
    }
    setIsSuccess(true);
    playSuccessSound();
  };

  const handleGoBack = () => {
    playTapSound();
    onBack();
  };

  return (
    <div className="relative min-h-screen bg-brand-light text-[#191c1e] flex flex-col justify-between overflow-x-hidden font-sans">
      
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full z-45 bg-white px-6 md:px-20 py-4 border-b border-[#eceef1] flex justify-between items-center shadow-sm">
        <div>
          <span className="text-xs uppercase tracking-widest text-brand-red font-black block">
            {brand.type === 'synagogue' ? 'Atividades Comunitárias' : 'Serviço Voluntário'}
          </span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-dark">Quero Participar</h1>
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

      {/* Main Grid View */}
      <main className="flex-grow pt-28 pb-32 px-6 md:px-20 max-w-7xl mx-auto w-full flex flex-col justify-center">
        <header className="mb-8 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight mb-2">
            {brand.type === 'synagogue' ? 'Escolha onde você deseja atuar' : 'Escolha onde você deseja servir'}
          </h2>
          <p className="text-sm md:text-base text-slate-600 font-medium leading-relaxed">
            {brand.type === 'synagogue'
              ? `Descubra o seu propósito de mitzvá e faça parte da nossa comunidade ativa em ${brand.campusName}. Escolha uma das áreas abaixo para participar.`
              : `Descubra o seu propósito de voluntariado e faça parte da nossa comunidade ativa em ${brand.campusName}. Escolha uma das áreas abaixo para participar.`}
          </p>
        </header>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-5 w-full">
          {ministries.map((min) => (
            <button
              key={min.id}
              type="button"
              onClick={() => handleMinistrySelect(min)}
              className={`col-span-12 ${
                min.wide ? 'md:col-span-6' : 'md:col-span-3'
              } text-white rounded-3xl p-6 text-left flex flex-col justify-between cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-md border ${min.color} min-h-[160px] relative overflow-hidden group`}
            >
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined !text-4xl text-brand-red group-hover:scale-115 transition-transform">
                  {min.icon}
                </span>
                <span className="bg-white/10 text-[10px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full inline-block">
                  {min.tag}
                </span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-xl font-bold uppercase tracking-wide">{min.name}</h3>
                <p className="text-xs text-white/70 line-clamp-2 mt-1 font-medium">{min.desc}</p>
              </div>

              <div className="absolute right-4 bottom-4 opacity-10">
                <span className="material-symbols-outlined !text-[80px]">{min.icon}</span>
              </div>
            </button>
          ))}
        </div>
      </main>

      {/* Application overlay modal */}
      {selectedMinistry && (
        <div className="fixed inset-0 bg-[#0a0a0a]/90 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Heading header with ministry colored top */}
            <div className={`p-6 text-white ${selectedMinistry.color} border-b flex justify-between items-center relative shrink-0`}>
              <div>
                <span className="text-[10px] uppercase font-black tracking-widest bg-white/20 px-2.5 py-1 rounded-md block w-fit mb-1">
                  {brand.type === 'synagogue' ? 'Inscrição em Atividade' : 'Inscrição Voluntária'}
                </span>
                <h3 className="text-xl font-bold">{selectedMinistry.name}</h3>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Modal Body form view */}
            <div className="p-6 md:p-8 overflow-y-auto flex-grow">
              {isSuccess ? (
                <div className="text-center space-y-4 py-6 animate-fade-in">
                  <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <span className="material-symbols-outlined !text-3xl font-black">done</span>
                  </div>
                  <h4 className="text-xl font-black text-brand-dark">Inscrição Realizada!</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {brand.type === 'synagogue'
                      ? `O coordenador da atividade de ${selectedMinistry.name} entrará em contato com você pelo WhatsApp ${formatPhone(phone)} em breve com os próximos passos.`
                      : `O líder do ministério de ${selectedMinistry.name} entrará em contato com você pelo WhatsApp ${formatPhone(phone)} em breve com os próximos passos.`}
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="h-12 w-full bg-brand-dark hover:bg-brand-red text-white font-bold rounded-xl mt-4 transition-colors cursor-pointer text-sm"
                  >
                    {brand.type === 'synagogue' ? 'Voltar às Atividades' : 'Voltar aos Ministérios'}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs text-slate-500 font-semibold mb-4 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {brand.type === 'synagogue'
                      ? 'Inscreva-se abaixo. Seus dados serão encaminhados diretamente para os responsáveis pela coordenação.'
                      : 'Inscreva-se abaixo. Seus dados serão encaminhados diretamente para o líder responsável pelo preenchimento de vagas.'}
                  </p>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Input Box */}
                    <div 
                      onClick={() => { playTapSound(); setActiveField('name'); }}
                      className={`space-y-1.5 text-left p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                        activeField === 'name' ? 'border-brand-red bg-slate-50/50' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <label className="block text-xs uppercase tracking-widest font-black text-brand-red ml-1">
                        Seu Nome Completo
                      </label>
                      <div className="h-10 font-bold text-slate-800 flex items-center text-md">
                        {name || <span className="text-slate-400 font-normal">Toque para digitar seu nome</span>}
                      </div>
                    </div>

                    {/* Phone Input Box */}
                    <div 
                      onClick={() => { playTapSound(); setActiveField('phone'); }}
                      className={`space-y-1.5 text-left p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                        activeField === 'phone' ? 'border-brand-red bg-slate-50/50' : 'border-slate-200 bg-white'
                      }`}
                    >
                      <label className="block text-xs uppercase tracking-widest font-black text-brand-red ml-1">
                        Seu WhatsApp / Telefone
                      </label>
                      <div className="h-10 font-bold text-slate-800 flex items-center text-md">
                        {formatPhone(phone) || <span className="text-slate-400 font-normal">Toque para digitar seu celular</span>}
                      </div>
                    </div>
                  </div>

                  {/* Input Virtual Keyboards */}
                  <div className="pt-2 border-t border-slate-100 flex justify-center min-h-[300px]">
                    {activeField === 'name' && (
                      <VirtualKeyboard onKeyPress={handleKeyboardPress} />
                    )}
                    {activeField === 'phone' && (
                      <div className="w-full max-w-sm">
                        <NumericKeypad 
                          onKeyPress={handleKeypadPress} 
                          onConfirm={handleRegisterSubmit} 
                          confirmLabel="Confirmar Inscrição"
                        />
                      </div>
                    )}
                  </div>

                  {/* Action buttons (only show cancel/confirm inline if on text input layout, or confirm at the bottom) */}
                  {activeField === 'name' && (
                    <div className="flex gap-4 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="flex-1 h-12 border border-slate-300 text-slate-600 rounded-xl font-bold hover:bg-slate-50 cursor-pointer text-sm"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => { playTapSound(); setActiveField('phone'); }}
                        className="flex-1 h-12 bg-brand-dark text-white rounded-xl font-bold hover:bg-brand-red cursor-pointer text-sm flex items-center justify-center gap-1"
                      >
                        <span>Próximo</span>
                        <span className="material-symbols-outlined !text-base">arrow_forward</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* Empty block footer layout spacing */}
      <footer className="h-10 w-full" />

    </div>
  );
}
