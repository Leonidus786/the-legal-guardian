export type AppRoute = 
  | 'home' 
  | 'profile' 
  | 'services' 
  | 'business-setup' 
  | 'international' 
  | 'consult' 
  | 'insights' 
  | 'contact' 
  | 'disclaimer';

export interface BusinessStructure {
  id: string;
  name: string;
  subtitle: string;
  overview: string;
  bestFor: string;
  covers: string[];
  requirements: string[];
  turnaround: string;
  governingLaw: string;
}

export interface SetupStep {
  number: string;
  id: string;
  title: string;
  subtitle: string;
  overview: string;
  covers: string[];
  requirements: string[];
  mandatoryFor: string;
  statutoryRef: string;
}

export interface AdditionalRegistration {
  id: string;
  name: string;
  code: string;
  overview: string;
  covers: string[];
  requirements: string[];
  regulatoryAuthority: string;
}

export interface OngoingComplianceItem {
  id: string;
  name: string;
  filingCode: string;
  frequency: string;
  dueDate: string;
  overview: string;
  covers: string[];
  requirements: string[];
  penaltiesForDefault: string;
}

export interface InternationalBusinessEntry {
  id: string;
  title: string;
  targetProfile: string;
  overview: string;
  covers: string[];
  requirements: string[];
  femaFdiRoute: string;
}

export interface DetailDrawerData {
  category: string;
  title: string;
  subtitle?: string;
  overview: string;
  covers: string[];
  requirements: string[];
  statutoryRef?: string;
  entityType?: string;
  actionLabel?: string;
}
