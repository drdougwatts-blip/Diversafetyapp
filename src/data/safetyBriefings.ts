export interface SafetyBriefing {
  id: number;
  text: string;
  learnMoreUrl?: string;
}

export const safetyBriefings: SafetyBriefing[] = [
  {
    id: 1,
    text: 'Symptoms of DCI can appear up to 48 hours after diving.',
    learnMoreUrl: 'https://www.ddrc.org/diving/diving-emergency/',
  },
  {
    id: 2,
    text: 'IPO (Immersion Pulmonary Oedema) is increasingly recognised as a significant risk for divers.',
    learnMoreUrl: 'https://www.ddrc.org/diving/fitness-to-dive/ipo/',
  },
  {
    id: 3,
    text: "BSAC's 2024 Incident Report recorded 331 incidents including 12 fatalities. Report your incidents to help improve safety.",
    learnMoreUrl: 'https://www.bsac.com/safety/diving-incidents/',
  },
  {
    id: 4,
    text: "DDRC's Fitness to Dive service offers telephone consultations with diving physicians from \u00A320.",
    learnMoreUrl: 'https://www.ddrc.org/recreational-sports-diving-medical/',
  },
  {
    id: 5,
    text: "There's no shame in calling off a dive. The sea will still be there tomorrow.",
  },
  {
    id: 6,
    text: 'High-flow oxygen (100%) is the most important first aid for suspected decompression illness.',
    learnMoreUrl: 'https://www.ddrc.org/diving/diving-emergency/',
  },
  {
    id: 7,
    text: 'Never attempt in-water recompression. It is extremely dangerous and can worsen the situation.',
  },
  {
    id: 8,
    text: 'Peer pressure is a recurring factor in BSAC incident reports. Always feel empowered to call a dive.',
  },
  {
    id: 9,
    text: 'Even mild symptoms after diving warrant medical advice. Call DDRC — the duty doctor would rather take a precautionary call.',
    learnMoreUrl: 'https://www.ddrc.org/diving/diving-emergency/',
  },
  {
    id: 10,
    text: 'Dehydration increases your risk of DCI. Drink plenty of water before and after diving.',
  },
  {
    id: 11,
    text: 'Alcohol within 12 hours of diving significantly increases your risk. Stay hydrated with water instead.',
  },
  {
    id: 12,
    text: 'A Patent Foramen Ovale (PFO) is present in about 25% of the population and can increase DCI risk.',
    learnMoreUrl: 'https://www.ddrc.org/diving/fitness-to-dive/pfo/',
  },
];
