/**
 * Types for the Environmental & Energy Management module
 */

export interface EnergyData {
  month: string;
  consumption: number;
  target: number;
  savings: number;
}

export interface WaterData {
  month: string;
  consumption: number;
  target: number;
  savings: number;
}

export interface CarbonData {
  name: string;
  value: number;
}

export interface CertificationData {
  name: string;
  status: string;
  progress: number;
  dueDate: string;
  priority: string;
}

export interface BuildingData {
  id: number;
  name: string;
  location: string;
  energyScore: number;
  waterScore: number;
  carbonScore: number;
  wasteScore: number;
  alerts: number;
}

export interface EnvironmentalData {
  energyData: EnergyData[];
  waterData: WaterData[];
  carbonData: CarbonData[];
  certificationData: CertificationData[];
  buildingData: BuildingData[];
}
