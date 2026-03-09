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
    name: 'BHA Diving Accident Helpline (24hr)',
    number: '07831 151 523',
    description:
      'The BHA National Diving Accident Helpline provides 24/7 expert advice on any suspected decompression illness.',
    dialNumber: '+447831151523',
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
