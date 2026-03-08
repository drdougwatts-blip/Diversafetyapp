// UK Hyperbaric Chamber data
// Sources: DDRC Healthcare, NHS, British Hyperbaric Association

export interface ChamberRecord {
  name: string;
  location: string;
  phone?: string;
  status: 'Fully operational' | 'No critical care' | 'Not operational';
  latitude: number;
  longitude: number;
}

export const UK_CHAMBERS: ChamberRecord[] = [
  {
    name: 'DDRC Healthcare',
    location: 'Plymouth, Devon',
    phone: '+441752209999',
    status: 'Fully operational',
    latitude: 50.3755,
    longitude: -4.1427,
  },
  {
    name: 'London Hyperbaric Centre',
    location: 'Whipps Cross Hospital, London',
    phone: '+442085395522',
    status: 'Fully operational',
    latitude: 51.5870,
    longitude: -0.0046,
  },
  {
    name: 'Midlands Diving Chamber',
    location: 'Rugby, Warwickshire',
    phone: '+441788579555',
    status: 'Fully operational',
    latitude: 52.3709,
    longitude: -1.2616,
  },
  {
    name: 'Aberdeen Royal Infirmary',
    location: 'Aberdeen, Scotland',
    phone: '+441224681818',
    status: 'Fully operational',
    latitude: 57.1497,
    longitude: -2.1100,
  },
  {
    name: 'Murrayfield Hospital Hyperbaric Unit',
    location: 'Wirral, Merseyside',
    phone: '+441516487000',
    status: 'Fully operational',
    latitude: 53.3580,
    longitude: -3.0770,
  },
  {
    name: 'Hull & East Yorkshire Hyperbaric Unit',
    location: 'Hull, East Yorkshire',
    phone: '+441482875875',
    status: 'No critical care',
    latitude: 53.7437,
    longitude: -0.3373,
  },
  {
    name: 'Orkney Hyperbaric Unit',
    location: 'Kirkwall, Orkney',
    phone: '+441856888000',
    status: 'No critical care',
    latitude: 58.9810,
    longitude: -2.9596,
  },
  {
    name: 'St Richard\'s Hospital',
    location: 'Chichester, West Sussex',
    phone: '+441243788122',
    status: 'Fully operational',
    latitude: 50.8380,
    longitude: -0.7790,
  },
  {
    name: 'Great Yarmouth & Waveney Hyperbaric Unit',
    location: 'Great Yarmouth, Norfolk',
    phone: '+441493452452',
    status: 'Fully operational',
    latitude: 52.5741,
    longitude: 1.7218,
  },
];

// UK postcode prefix to approximate coordinates mapping
// Covers all postcode areas for basic distance estimation
const POSTCODE_COORDS: Record<string, [number, number]> = {
  AB: [57.15, -2.11], AL: [51.75, -0.34], B: [52.48, -1.89],
  BA: [51.38, -2.36], BB: [53.76, -2.48], BD: [53.79, -1.75],
  BH: [50.72, -1.88], BL: [53.58, -2.43], BN: [50.83, -0.14],
  BR: [51.41, 0.05], BS: [51.45, -2.58], BT: [54.60, -5.93],
  CA: [54.89, -2.93], CB: [52.20, 0.13], CF: [51.48, -3.18],
  CH: [53.19, -2.89], CM: [51.73, 0.47], CO: [51.89, 0.90],
  CR: [51.37, -0.10], CT: [51.28, 1.08], CV: [52.41, -1.51],
  CW: [53.10, -2.44], DA: [51.45, 0.22], DD: [56.46, -2.97],
  DE: [52.92, -1.47], DG: [55.07, -3.61], DH: [54.78, -1.57],
  DL: [54.52, -1.55], DN: [53.52, -1.13], DT: [50.71, -2.44],
  DY: [52.51, -2.08], E: [51.55, -0.06], EC: [51.52, -0.09],
  EH: [55.95, -3.19], EN: [51.65, -0.08], EX: [50.72, -3.53],
  FK: [56.12, -3.93], FY: [53.82, -3.05], G: [55.86, -4.25],
  GL: [51.86, -2.24], GU: [51.24, -0.77], HA: [51.58, -0.33],
  HD: [53.65, -1.78], HG: [54.00, -1.54], HP: [51.75, -0.74],
  HR: [52.06, -2.72], HS: [57.77, -7.01], HU: [53.74, -0.34],
  HX: [53.73, -1.86], IG: [51.56, 0.07], IP: [52.06, 1.16],
  IV: [57.48, -4.22], KA: [55.46, -4.63], KT: [51.38, -0.30],
  KW: [58.44, -3.09], KY: [56.21, -3.15], L: [53.41, -2.98],
  LA: [54.05, -2.80], LD: [52.25, -3.38], LE: [52.63, -1.13],
  LL: [53.23, -3.83], LN: [53.23, -0.54], LS: [53.80, -1.55],
  LU: [51.88, -0.42], M: [53.48, -2.24], ME: [51.37, 0.55],
  MK: [52.04, -0.76], ML: [55.78, -3.99], N: [51.57, -0.10],
  NE: [55.00, -1.60], NG: [52.95, -1.15], NN: [52.23, -0.90],
  NP: [51.59, -2.99], NR: [52.63, 1.30], NW: [51.55, -0.17],
  OL: [53.54, -2.11], OX: [51.75, -1.26], PA: [55.85, -4.44],
  PE: [52.57, -0.24], PH: [56.65, -3.87], PL: [50.39, -4.14],
  PO: [50.80, -1.09], PR: [53.76, -2.70], RG: [51.45, -1.00],
  RH: [51.12, -0.19], RM: [51.58, 0.18], S: [53.38, -1.47],
  SA: [51.62, -3.94], SE: [51.49, -0.06], SG: [51.90, -0.20],
  SK: [53.39, -2.16], SL: [51.51, -0.59], SM: [51.37, -0.17],
  SN: [51.56, -1.78], SO: [50.90, -1.40], SP: [51.07, -1.80],
  SR: [54.91, -1.38], SS: [51.54, 0.71], ST: [52.83, -2.12],
  SW: [51.47, -0.17], SY: [52.71, -2.75], TA: [51.02, -3.10],
  TD: [55.60, -2.43], TF: [52.68, -2.49], TN: [51.14, 0.27],
  TQ: [50.47, -3.53], TR: [50.26, -5.05], TS: [54.57, -1.24],
  TW: [51.45, -0.35], UB: [51.55, -0.42], W: [51.51, -0.18],
  WA: [53.39, -2.59], WC: [51.52, -0.12], WD: [51.69, -0.40],
  WF: [53.68, -1.50], WN: [53.55, -2.63], WR: [52.19, -2.22],
  WS: [52.59, -1.98], WV: [52.59, -2.13], YO: [53.96, -1.08],
  ZE: [60.15, -1.17],
};

/**
 * Parse a UK postcode and return approximate coordinates.
 * Returns null if the postcode area is not recognised.
 */
export function postcodeToCoords(postcode: string): { latitude: number; longitude: number } | null {
  const clean = postcode.replace(/\s+/g, '').toUpperCase();
  // Try two-letter prefix first, then one-letter
  const twoLetter = clean.substring(0, 2);
  const oneLetter = clean.substring(0, 1);
  const match = POSTCODE_COORDS[twoLetter] ?? POSTCODE_COORDS[oneLetter];
  if (!match) return null;
  return { latitude: match[0], longitude: match[1] };
}

/**
 * Calculate distance in miles between two coordinates using Haversine formula.
 */
export function distanceMiles(
  lat1: number, lon1: number,
  lat2: number, lon2: number
): number {
  const R = 3958.8; // Earth radius in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Find chambers nearest to a given UK postcode.
 * Returns chambers sorted by distance, with approximate driving time.
 */
export function findNearestChambers(
  postcode: string,
  criticalCareOnly: boolean = false
): { chambers: (ChamberRecord & { distanceMiles: number; drivingTimeMinutes: number })[] } | null {
  const coords = postcodeToCoords(postcode);
  if (!coords) return null;

  let filtered = criticalCareOnly
    ? UK_CHAMBERS.filter((c) => c.status === 'Fully operational')
    : UK_CHAMBERS;

  const withDistance = filtered.map((chamber) => {
    const dist = distanceMiles(coords.latitude, coords.longitude, chamber.latitude, chamber.longitude);
    // Rough driving time estimate: ~1.5 min per mile (accounts for UK roads)
    const drivingTime = Math.round(dist * 1.5);
    return {
      ...chamber,
      distanceMiles: Math.round(dist),
      drivingTimeMinutes: drivingTime,
    };
  });

  withDistance.sort((a, b) => a.distanceMiles - b.distanceMiles);

  return { chambers: withDistance };
}
