// Chamber Finder Types
export interface Chamber {
  name: string;
  location: string;
  drivingTimeMinutes: number;
  distanceMiles: number;
  status: 'Fully operational' | 'No critical care' | 'Not operational';
  phone?: string;
  latitude?: number;
  longitude?: number;
}

export interface ChamberFinderResponse {
  chambers: Chamber[];
  searchedPostcode: string;
}

// Symptom Checker Types
export interface DiveProfile {
  lastDiveTime: string;
  maxDepthMetres: string;
  bottomTimeMinutes: string;
  gasMix: 'Air' | 'Nitrox' | 'Trimix' | 'Other';
  decompStops: 'Yes' | 'No' | 'Planned but missed';
  rapidAscent: 'Yes' | 'No' | 'Unsure';
  equipmentProblems: 'Yes' | 'No';
  equipmentDetails: string;
  divesToday: '1' | '2' | '3+';
  flyingRecently: 'Yes' | 'No';
}

export interface SymptomCategory {
  name: string;
  symptoms: Symptom[];
}

export interface Symptom {
  id: string;
  label: string;
  isNeurological: boolean;
}

export interface SymptomCheckerResult {
  diveProfile: DiveProfile;
  selectedSymptoms: string[];
  hasNeurologicalSymptoms: boolean;
  timestamp: string;
}

// Report Types
export type ReportType = 'incident' | 'near-miss';

export interface IncidentReport {
  type: 'incident';
  diveDate: string;
  location: string;
  maxDepth: string;
  bottomTime: string;
  gasMix: string;
  decompCompleted: string;
  rapidAscent: string;
  incidentTypes: string[];
  severity: string;
  contributingFactors: string[];
  description: string;
  medicalAdviceSought: string;
  hyperbaricTreatment: string;
  outcome: string;
  reporterRole: string;
  experienceLevel: string;
  trainingAgency: string;
}

export interface NearMissReport {
  type: 'near-miss';
  date: string;
  location: string;
  whatHappened: string[];
  description: string;
  whatPreventedIt: string;
  contributingFactors: string[];
  experienceLevel: string;
}

export interface ReportSubmissionResponse {
  success: boolean;
  reference: string;
}

// Navigation Types
export type TabParamList = {
  Emergency: undefined;
  'Before You Dive': undefined;
  Report: undefined;
  Learn: undefined;
};
