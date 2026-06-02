import { CellGroup, Pastor, Slide } from '../types';

export interface BrandConfig {
  id: string;
  name: string;
  campusName: string;
  logoUrl: string;
  bgUrl: string;
  dashboardBgUrl?: string;
  primaryColor: string;
  primaryColorHover: string;
  accentColor: string;
  type: 'church' | 'synagogue';
  termPastor: string;
  termPastors: string;
  termPastoral: string;
  termCult: string;
  termCults: string;
  termDonation: string;
  termDonations: string;
  termConnect: string;
  termConnects: string;
  termMember: string;
  location: string;
  wifi: string;
  pixKey: string;
  pastors: Pastor[];
  cellGroups: CellGroup[];
  glowColor: string;
  badgeBgColor: string;
  badgeTextColor: string;
  badgeLabel: string;
  accentSplashColor: string;
}

export const brands: Record<string, BrandConfig> = {
  atitude: {
    id: 'atitude',
    name: 'Atitude',
    campusName: 'Alphaville',
    logoUrl: 'https://igrejaatitude.com.br/wp-content/themes/ibatitude/images/logo.png',
    bgUrl: 'https://igrejaatitude.com.br/wp-content/uploads/2025/03/hall-iba.png',
    primaryColor: '#e30613',
    primaryColorHover: '#c61118',
    accentColor: '#e30613',
    glowColor: 'rgba(245, 195, 30, 0.25)',
    badgeBgColor: '#f5c31e',
    badgeTextColor: '#0a0a0a',
    badgeLabel: 'Igreja Batista Atitude',
    accentSplashColor: '#f5c31e',
    type: 'church',
    termPastor: 'Pastor',
    termPastors: 'Pastores',
    termPastoral: 'Atendimento Pastoral',
    termCult: 'Culto',
    termCults: 'Cultos de Celebração',
    termDonation: 'Dízimo ou Oferta',
    termDonations: 'Dízimos e Ofertas',
    termConnect: 'Célula',
    termConnects: 'Pequenos Grupos',
    termMember: 'Novo Membro',
    location: 'Av. Juruá, 159 - Alphaville, Barueri - SP',
    wifi: 'Atitude_Guest',
    pixKey: 'pixsaopaulo@ibatitude.com.br',
    pastors: [
      {
        id: '1',
        name: 'Pr. Josué Valandro Jr.',
        role: 'Pastor Sênior & Fundador',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&fit=crop&q=80',
      },
      {
        id: '2',
        name: 'Pr. Wallace Cardozo',
        role: 'Pastor Responsável Alphaville',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&fit=crop&q=80',
      },
      {
        id: '3',
        name: 'Pra. Viviane Santos',
        role: 'Ministério de Casais',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&fit=crop&q=80',
      },
      {
        id: '4',
        name: 'Pra. Daniele Souza',
        role: 'Cuidado & Integração',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&fit=crop&q=80',
      }
    ],
    cellGroups: [
      {
        id: '1',
        name: 'Célula Reencontro Alphaville',
        neighborhood: 'Alphaville',
        day: 'Quarta-feira',
        hour: '20:00',
        leader: 'Carlos & Marta',
        phone: '(11) 98765-4321',
      },
      {
        id: '2',
        name: 'Célula Conexão Jovem',
        neighborhood: 'Tamboré',
        day: 'Sábado',
        hour: '19:30',
        leader: 'Gustavo Santos',
        phone: '(11) 91234-5678',
      },
      {
        id: '3',
        name: 'Célula Atitude Barueri',
        neighborhood: 'Barueri',
        day: 'Quinta-feira',
        hour: '20:00',
        leader: 'Juliana Vieira',
        phone: '(11) 93344-5566',
      },
      {
        id: '4',
        name: 'Célula Graça & Paz',
        neighborhood: 'Santana de Parnaíba',
        day: 'Terça-feira',
        hour: '19:30',
        leader: 'Pr. Marcos Lima',
        phone: '(11) 92233-4455',
      },
      {
        id: '5',
        name: 'Célula Família Feliz',
        neighborhood: 'Alphaville 3',
        day: 'Quarta-feira',
        hour: '20:00',
        leader: 'André & Roberta',
        phone: '(11) 94455-6677',
      }
    ]
  },
  icconselheira: {
    id: 'icconselheira',
    name: 'Igreja Cristã Conselheira',
    campusName: 'ICC',
    logoUrl: 'https://static.wixstatic.com/media/6ffcad_55af5a6f2fdf47cea5b964593486122e~mv2.png/v1/fill/w_298,h_277,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ICC_logo_vertical_cor.png',
    bgUrl: 'https://static.wixstatic.com/media/6ffcad_074e01478e384e37a4e59dd024c7c5ca~mv2.png/v1/crop/x_0,y_129,w_2048,h_894/fill/w_1966,h_858,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/IMAGEM%20DE%20ABERTURA%20PARA%20SITE.png',
    dashboardBgUrl: 'https://static.wixstatic.com/media/6ffcad_3f8d653f42e04ddf9ec57a6f5d3e188c~mv2.jpg/v1/fill/w_2500,h_1250,al_c/6ffcad_3f8d653f42e04ddf9ec57a6f5d3e188c~mv2.jpg',
    primaryColor: '#2C5A4C',
    primaryColorHover: '#1B3B31',
    accentColor: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.25)',
    badgeBgColor: '#d4af37',
    badgeTextColor: '#0a0a0a',
    badgeLabel: 'ICC',
    accentSplashColor: '#d4af37',
    type: 'church',
    termPastor: 'Pastor',
    termPastors: 'Pastores',
    termPastoral: 'Atendimento Pastoral',
    termCult: 'Culto',
    termCults: 'Cultos',
    termDonation: 'Contribuição',
    termDonations: 'Contribuições',
    termConnect: 'Grupo',
    termConnects: 'Grupos',
    termMember: 'Membro',
    location: 'Av. Nova Cantareira, 3014 - Tucuruvi - São Paulo',
    wifi: 'ICC_Wifi',
    pixKey: 'pix@icc.com.br',
    pastors: [
      {
        id: '1',
        name: 'Pastor Local',
        role: 'Pastor Responsável',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&fit=crop&q=80',
      }
    ],
    cellGroups: [
      {
        id: '1',
        name: 'Oração e Intercessão',
        neighborhood: 'Templo',
        day: 'Terça-feira',
        hour: '20:30',
        leader: 'Coordenação',
        phone: '(11) 99999-9999',
      },
      {
        id: '2',
        name: 'Encontro de Mulheres',
        neighborhood: 'Templo',
        day: 'Quarta-feira',
        hour: '15:00',
        leader: 'Coordenação de Mulheres',
        phone: '(11) 99999-9999',
      },
      {
        id: '3',
        name: 'Café e Debate Teológico',
        neighborhood: 'Templo',
        day: 'Quinta-feira',
        hour: '20:30',
        leader: 'Coordenação',
        phone: '(11) 99999-9999',
      },
      {
        id: '4',
        name: 'Celebração para Família',
        neighborhood: 'Templo',
        day: 'Domingo',
        hour: '10:30',
        leader: 'Pastor Responsável',
        phone: '(11) 99999-9999',
      }
    ]
  },
  lagoinha: {
    id: 'lagoinha',
    name: 'Lagoinha',
    campusName: 'Alphaville',
    logoUrl: 'https://static.wixstatic.com/media/d7e284_a2ca857a38014118aed45edecd614103~mv2.png/v1/fill/w_180,h_180,al_c/d7e284_a2ca857a38014118aed45edecd614103~mv2.png',
    bgUrl: 'https://static.wixstatic.com/media/d7e284_e0cb83d5c8204ecb96855d028995d338~mv2.jpeg/v1/fill/w_1600,h_1000,al_c/d7e284_e0cb83d5c8204ecb96855d028995d338~mv2.jpeg',
    primaryColor: '#d4af37',
    primaryColorHover: '#b8942a',
    accentColor: '#d4af37',
    glowColor: 'rgba(212, 175, 55, 0.25)',
    badgeBgColor: '#d4af37',
    badgeTextColor: '#0a0a0a',
    badgeLabel: 'Lagoinha Alphaville',
    accentSplashColor: '#d4af37',
    type: 'church',
    termPastor: 'Pastor',
    termPastors: 'Pastores',
    termPastoral: 'Atendimento Pastoral',
    termCult: 'Culto',
    termCults: 'Cultos de Celebração',
    termDonation: 'Dízimo ou Oferta',
    termDonations: 'Dízimos e Ofertas',
    termConnect: 'GC (Grupo de Crescimento)',
    termConnects: 'Grupos de Crescimento',
    termMember: 'Novo Membro',
    location: 'Avenida Tamboré, 74 – Alphaville Industrial, Barueri - SP',
    wifi: 'Lagoinha_Alphaville',
    pixKey: 'pix@lagoinhaalphaville.com.br',
    pastors: [
      {
        id: '1',
        name: 'Pr. André Valadão',
        role: 'Pastor Sênior Global',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&q=80',
      },
      {
        id: '2',
        name: 'Pr. Lucinho Barreto',
        role: 'Líder do Be One Youth',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80',
      },
      {
        id: '3',
        name: 'Pr. Marcos & Pra. Carla',
        role: 'Pastores Responsáveis Locais',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1621574539437-4b7cb63120b8?w=400&fit=crop&q=80',
      }
    ],
    cellGroups: [
      {
        id: '1',
        name: 'GC Lagoinha Araguaia',
        neighborhood: 'Alphaville',
        day: 'Quinta-feira',
        hour: '20:00',
        leader: 'Danilo & Carol',
        phone: '(11) 99887-7665',
      },
      {
        id: '2',
        name: 'GC Be One Jovens',
        neighborhood: 'Tamboré',
        day: 'Sábado',
        hour: '17:30',
        leader: 'Lucas Lima',
        phone: '(11) 98765-1234',
      },
      {
        id: '3',
        name: 'GC Casais & Famílias',
        neighborhood: 'Barueri',
        day: 'Terça-feira',
        hour: '19:30',
        leader: 'Marcelo & Fabiana',
        phone: '(11) 97654-3210',
      }
    ]
  },
  universal: {
    id: 'universal',
    name: 'Universal',
    campusName: 'Templo de Salomão',
    logoUrl: 'https://www.universal.org/wp-content/themes/portaluniversal-child/resources/assets/images/logo-universal.png',
    bgUrl: 'https://www.universal.org/wp-content/uploads/2025/01/24180424/corrente-dos-70-2025.jpg',
    primaryColor: '#102a43',
    primaryColorHover: '#0b1d33',
    accentColor: '#cf2e2e',
    glowColor: 'rgba(207, 46, 46, 0.25)',
    badgeBgColor: '#cf2e2e',
    badgeTextColor: '#ffffff',
    badgeLabel: 'Universal - Templo de Salomão',
    accentSplashColor: '#cf2e2e',
    type: 'church',
    termPastor: 'Pastor',
    termPastors: 'Bispos e Pastores',
    termPastoral: 'Atendimento Espiritual',
    termCult: 'Reunião',
    termCults: 'Reuniões de Fé',
    termDonation: 'Dízimo ou Voto',
    termDonations: 'Dízimos e Votos',
    termConnect: 'Grupo',
    termConnects: 'Grupos de Ação',
    termMember: 'Cadastro de Membro',
    location: 'Av. Celso Garcia, 605 - Brás, São Paulo - SP',
    wifi: 'Universal_Free',
    pixKey: 'pix@universal.org.br',
    pastors: [
      {
        id: '1',
        name: 'Bispo Edir Macedo',
        role: 'Líder e Fundador',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80',
      },
      {
        id: '2',
        name: 'Bispo Renato Cardoso',
        role: 'Pastor Responsável Nacional',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&fit=crop&q=80',
      },
      {
        id: '3',
        name: 'Pastor Jean Carlos',
        role: 'Atendimento do Altar',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&fit=crop&q=80',
      }
    ],
    cellGroups: [
      {
        id: '1',
        name: 'Grupo FJU (Força Jovem)',
        neighborhood: 'Lobby Principal',
        day: 'Todos os dias',
        hour: 'Atendimento contínuo',
        leader: 'Pr. FJU São Paulo',
        phone: '(11) 99111-2222',
      },
      {
        id: '2',
        name: 'Grupo Caleb (Melhor Idade)',
        neighborhood: 'Auditório Lateral',
        day: 'Quarta e Domingo',
        hour: 'Horário dos Cultos',
        leader: 'Coodenação Caleb',
        phone: '(11) 99222-3333',
      },
      {
        id: '3',
        name: 'Grupo EVG (Evangelização)',
        neighborhood: 'Área Externa',
        day: 'Sábado',
        hour: '14:00',
        leader: 'Líder EVG Brás',
        phone: '(11) 99333-4444',
      }
    ]
  },
  beityaacov: {
    id: 'beityaacov',
    name: 'Beit Yaacov',
    campusName: 'Congregação',
    logoUrl: 'https://www.morasha.com.br/wp-content/themes/morasha/assets/images/logo-morasha.png',
    bgUrl: 'https://www.morasha.com.br/wp-content/uploads/2023/06/beityaacov.jpg',
    primaryColor: '#0d47a1',
    primaryColorHover: '#0a3580',
    accentColor: '#ffb300',
    glowColor: 'rgba(255, 179, 0, 0.25)',
    badgeBgColor: '#ffb300',
    badgeTextColor: '#0a0a0a',
    badgeLabel: 'Sinagoga Beit Yaacov',
    accentSplashColor: '#ffb300',
    type: 'synagogue',
    termPastor: 'Rabino',
    termPastors: 'Rabinos',
    termPastoral: 'Atendimento do Rabinato',
    termCult: 'Cabalar / Shabat',
    termCults: 'Serviços do Shabat',
    termDonation: 'Tsedaká (Doação)',
    termDonations: 'Tsedaká (Doações)',
    termConnect: 'Shiur (Estudo)',
    termConnects: 'Estudos e Classes',
    termMember: 'Registro de Membro',
    location: 'Rua Dr. Veiga Filho, 547 – Higienópolis, São Paulo - SP',
    wifi: 'BeitYaacov_Guest',
    pixKey: 'tsedaka@beityaacov.org.br',
    pastors: [
      {
        id: '1',
        name: 'Rabino Avraham Cohen',
        role: 'Rabino Sênior',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=400&fit=crop&q=80',
      },
      {
        id: '2',
        name: 'Rabino Y. David Weitman',
        role: 'Orientação Espiritual',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&fit=crop&q=80',
      },
      {
        id: '3',
        name: 'Rabino Efraim Laniado',
        role: 'Estudos da Torá e Halachá',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&fit=crop&q=80',
      }
    ],
    cellGroups: [
      {
        id: '1',
        name: 'Shiur Torá Semanal',
        neighborhood: 'Biblioteca Beit Yaacov',
        day: 'Terça-feira',
        hour: '19:30',
        leader: 'Rabino Efraim',
        phone: '(11) 99777-6655',
      },
      {
        id: '2',
        name: 'Cabalá e Meditação',
        neighborhood: 'Auditório Anexo',
        day: 'Segunda-feira',
        hour: '20:00',
        leader: 'Rabino Y. David',
        phone: '(11) 98888-7766',
      },
      {
        id: '3',
        name: 'Classe de Jovens Sinagoga',
        neighborhood: 'Sala de Juventude',
        day: 'Quinta-feira',
        hour: '19:30',
        leader: 'Coordenação Beit Yaacov',
        phone: '(11) 97777-5544',
      }
    ]
  },
  ibmalphaville: {
    id: 'ibmalphaville',
    name: 'IBM Alphaville',
    campusName: 'Sede Tamboré',
    logoUrl: 'https://static.wixstatic.com/media/33ca7d_3ea707e37e3749d89300bb7311ddc189~mv2.png',
    bgUrl: 'https://static.wixstatic.com/media/25a297_cdd52ddb9e2c4f8d975daee634ddf4e7~mv2.jpg/v1/fill/w_1600,h_1000,al_c/25a297_cdd52ddb9e2c4f8d975daee634ddf4e7~mv2.jpg',
    primaryColor: '#ea492e',
    primaryColorHover: '#c43c24',
    accentColor: '#ea492e',
    glowColor: 'rgba(234, 73, 46, 0.25)',
    badgeBgColor: '#ea492e',
    badgeTextColor: '#ffffff',
    badgeLabel: 'IBM Alphaville',
    accentSplashColor: '#ea492e',
    type: 'church',
    termPastor: 'Pastor',
    termPastors: 'Pastores',
    termPastoral: 'Atendimento Pastoral',
    termCult: 'Celebração',
    termCults: 'Celebrações de Domingo',
    termDonation: 'Dízimo ou Oferta',
    termDonations: 'Dízimos e Ofertas',
    termConnect: 'Grupo de Relacionamento',
    termConnects: 'Grupos de Relacionamento',
    termMember: 'Novo por Aqui',
    location: 'Av. Tamboré, 1603 – Tamboré, Barueri - SP',
    wifi: 'IBM_Alphaville',
    pixKey: '07.838.266/0001-57',
    pastors: [
      {
        id: '1',
        name: 'Pr. Sidney Costa',
        role: 'Pastor Sênior',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&fit=crop&q=80',
      },
      {
        id: '2',
        name: 'Pr. Hugo Ksenhuk',
        role: 'Pastor de Comunicação e Ensino',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&fit=crop&q=80',
      },
      {
        id: '3',
        name: 'Pr. Fabiano Bispo',
        role: 'Cuidado Pastoral e Integração',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&fit=crop&q=80',
      },
      {
        id: '4',
        name: 'Pr. Reinaldo Rodrigues',
        role: 'Família e Casais',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&fit=crop&q=80',
      }
    ],
    cellGroups: [
      {
        id: '1',
        name: 'GR Tamboré - Jovens',
        neighborhood: 'Tamboré',
        day: 'Terça-feira',
        hour: '20:00',
        leader: 'André & Amanda',
        phone: '(11) 99988-1122',
      },
      {
        id: '2',
        name: 'GR Alphaville 1 - Casais',
        neighborhood: 'Alphaville',
        day: 'Quarta-feira',
        hour: '20:00',
        leader: 'Thiago & Gabi',
        phone: '(11) 99988-3344',
      },
      {
        id: '3',
        name: 'GR Centro Barueri - Misto',
        neighborhood: 'Centro Barueri',
        day: 'Quinta-feira',
        hour: '19:30',
        leader: 'Renato & Paula',
        phone: '(11) 99988-5566',
      },
      {
        id: '4',
        name: 'GR Aldeia da Serra - Famílias',
        neighborhood: 'Aldeia da Serra',
        day: 'Sábado',
        hour: '18:00',
        leader: 'Felipe & Carol',
        phone: '(11) 99988-7788',
      }
    ]
  }
};

export function getStoredBrands(): Record<string, BrandConfig> {
  if (typeof window !== 'undefined') {
    localStorage.setItem('santuario_brands', JSON.stringify(brands));
  }
  return brands;
}

export function saveStoredBrands(updatedBrands: Record<string, BrandConfig>) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('santuario_brands', JSON.stringify(updatedBrands));
  }
}

export function getCurrentBrand(): BrandConfig {
  if (typeof window === 'undefined') {
    return brands.atitude;
  }
  
  const params = new URLSearchParams(window.location.search);
  let client = (params.get('client') || 'atitude').toLowerCase().trim();
  
  if (client === 'ibm' || client === 'ibm-alphaville' || client === 'ibmalphaville') {
    client = 'ibmalphaville';
  } else if (client === 'lagoinha' || client === 'lagoinhaalphaville' || client === 'lagoinha-alphaville') {
    client = 'lagoinha';
  } else if (client === 'universal' || client === 'iurd') {
    client = 'universal';
  } else if (client === 'beityaacov' || client === 'beit-yaacov' || client === 'morasha') {
    client = 'beityaacov';
  } else if (client === 'icc' || client === 'icconselheira') {
    client = 'icconselheira';
  }
  
  const dynamicBrands = getStoredBrands();
  return dynamicBrands[client] || dynamicBrands.atitude || brands.atitude;
}
