export interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  dialNumber: string;
  isPrimary: boolean;
}

export const emergencyContacts: EmergencyContact[] = [
  {
    name: 'In an Emergency',
    number: '999',
    description:
      'Ask for Coastguard. The Coastguard coordinates all maritime emergencies including diving incidents.',
    dialNumber: '999',
    isPrimary: true,
  },
  {
    name: 'DDRC 24hr Diving Emergency Hotline',
    number: '+44 (0)1752 209999',
    description:
      'DDRC Healthcare operates a 24/7 emergency hotline for diving emergencies. Call for expert advice on any suspected decompression illness.',
    dialNumber: '+441752209999',
    isPrimary: true,
  },
  {
    name: 'DAN Europe Emergency',
    number: '+39 06 4211 8685',
    description:
      'Divers Alert Network — for diving incidents outside the UK or when travelling abroad.',
    dialNumber: '+390642118685',
    isPrimary: false,
  },
  {
    name: 'NHS 111',
    number: '111',
    description: 'For non-emergency medical advice when you need help but it is not a life-threatening situation.',
    dialNumber: '111',
    isPrimary: false,
  },
];
