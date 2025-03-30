/**
 * Types for the Green Building Certification module
 */

export interface CertificationData {
  id: string;
  name: string;
  type: string;
  level: string;
  issueDate: string;
  expiryDate: string;
  certificateId: string;
  totalPoints: string;
  renewalStatus: string;
}

export interface CertificationApplication {
  id: string;
  name: string;
  building: string;
  submissionDate: string;
  currentStage: string;
  progress: number;
}

export interface ComplianceData {
  id: string;
  name: string;
  description: string;
  compliance: number;
  status: string;
}

export interface ComplianceIssue {
  id: string;
  name: string;
  reference: string;
  priority: string;
}

export interface SustainabilityMetric {
  name: string;
  value: number;
  trend: string;
  target: number;
}

export interface SustainabilityProject {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  impact: string;
}

export interface WasteData {
  category: string;
  value: number;
  description: string;
}

export interface MonthlyWasteData {
  month: string;
  organik: number;
  anorganik: number;
  berbahaya: number;
}

export interface GreenBuildingData {
  certifications: CertificationData[];
  applications: CertificationApplication[];
  complianceData: ComplianceData[];
  complianceIssues: ComplianceIssue[];
  sustainabilityMetrics: SustainabilityMetric[];
  sustainabilityProjects: SustainabilityProject[];
  wasteData: WasteData[];
  monthlyWasteData: MonthlyWasteData[];
}
