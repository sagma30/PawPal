import { PetSpecies, ServiceCategory } from '../constants/roles';

export interface LiveLocationData {
  city: string;
  state: string;
  status: 'At Home' | 'On a Walk' | 'At Vet' | 'With Sitter';
  battery: number;
  lastUpdated: string;
  mapImage: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: PetSpecies;
  breed: string;
  age: string;
  weight: string;
  location: string;
  description: string;
  photoUrl: string;
  bloodGroup: string;
  allergies: string;
  currentMedications: string;
  servicePreferences: string[];
  vaccinationStatus: string;
  healthStatusText: string;
  isAttentionNeeded: boolean;
  liveLocation: LiveLocationData;
  createdAt: string;
  updatedAt: string;
}
