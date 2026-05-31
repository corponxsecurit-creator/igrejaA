import { CellGroup, Pastor } from '../types';

export interface BrandConfig {
  id: string;
  name: string;
  campusName: string;
  logoUrl: string;
  bgUrl: string;
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
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop&q=80',
      },
      {
        id: '2',
        name: 'Pr. Wallace Cardozo',
        role: 'Pastor Responsável Alphaville',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop&q=80',
      },
      {
        id: '3',
        name: 'Pra. Viviane Santos',
        role: 'Ministério de Casais',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&fit=crop&q=80',
      },
      {
        id: '4',
        name: 'Pra. Daniele Souza',
        role: 'Cuidado & Integração',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&fit=crop&q=80',
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
  lagoinha: {
    id: 'lagoinha',
    name: 'Lagoinha',
    campusName: 'Alphaville',
    logoUrl: 'https://logodownload.org/wp-content/uploads/2019/08/igreja-batista-da-lagoinha-logo-0.png',
    bgUrl: 'https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1600&auto=format&fit=crop&q=80',
    primaryColor: '#d4af37',
    primaryColorHover: '#b8942a',
    accentColor: '#d4af37',
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
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop&q=80',
      },
      {
        id: '2',
        name: 'Pr. Lucinho Barreto',
        role: 'Líder do Be One Youth',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop&q=80',
      },
      {
        id: '3',
        name: 'Pr. Marcos & Pra. Carla',
        role: 'Pastores Responsáveis Locais',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&fit=crop&q=80',
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
    logoUrl: 'https://logodownload.org/wp-content/uploads/2019/09/igreja-universal-logo-0.png',
    bgUrl: 'https://images.unsplash.com/photo-1548625361-155de8c7375d?w=1600&auto=format&fit=crop&q=80',
    primaryColor: '#102a43',
    primaryColorHover: '#0b1d33',
    accentColor: '#cf2e2e',
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
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop&q=80',
      },
      {
        id: '2',
        name: 'Bispo Renato Cardoso',
        role: 'Pastor Responsável Nacional',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop&q=80',
      },
      {
        id: '3',
        name: 'Pastor Jean Carlos',
        role: 'Atendimento do Altar',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&fit=crop&q=80',
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
    campusName: 'Sinagoga Sede',
    logoUrl: 'https://img.icons8.com/fluency/480/star-of-david.png',
    bgUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&auto=format&fit=crop&q=80',
    primaryColor: '#0d47a1',
    primaryColorHover: '#0a3580',
    accentColor: '#ffb300',
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
        photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&fit=crop&q=80',
      },
      {
        id: '2',
        name: 'Rabino Y. David Weitman',
        role: 'Orientação Espiritual',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&fit=crop&q=80',
      },
      {
        id: '3',
        name: 'Rabino Efraim Laniado',
        role: 'Estudos da Torá e Halachá',
        available: true,
        photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&fit=crop&q=80',
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
  }
};

export function getCurrentBrand(): BrandConfig {
  if (typeof window === 'undefined') {
    return brands.atitude;
  }
  
  const params = new URLSearchParams(window.location.search);
  const client = params.get('client') || 'atitude';
  
  return brands[client] || brands.atitude;
}
