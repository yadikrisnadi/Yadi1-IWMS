// Lease Management Model for Indonesian IWMS

export interface LeaseType {
  id: string;
  name: string; // Commercial, Residential, Industrial, etc.
  description: string;
}

export interface LeaseStatus {
  id: string;
  name: string; // Active, Expired, Terminated, Pending Renewal, etc.
  description: string;
}

export interface LeaseTenant {
  id: string;
  name: string;
  type: string; // Individual, Company, Government, etc.
  contactPerson?: string;
  phone: string;
  email: string;
  taxId?: string; // NPWP (Nomor Pokok Wajib Pajak) in Indonesia
  identityNumber?: string; // KTP (Kartu Tanda Penduduk) for individuals
  companyRegistrationNumber?: string; // NIB (Nomor Induk Berusaha) for companies
  address: string;
}

export interface LeasePayment {
  id: string;
  leaseId: string;
  amount: number;
  currency: string;
  dueDate: string;
  paidDate?: string;
  status: string; // Paid, Unpaid, Partially Paid, Overdue
  paymentMethod?: string;
  referenceNumber?: string;
  notes?: string;
  // Indonesian specific payment fields
  ppn?: number; // Pajak Pertambahan Nilai (Value Added Tax)
  pph?: number; // Pajak Penghasilan (Income Tax)
  bea?: number; // Bea Perolehan Hak atas Tanah dan Bangunan (BPHTB)
}

export interface LeaseDocument {
  id: string;
  leaseId: string;
  documentType: string; // Contract, Amendment, Notice, etc.
  documentNumber: string;
  issueDate: string;
  expiryDate?: string;
  fileUrl?: string;
  notes?: string;
  // Indonesian specific document fields
  stampDuty?: boolean; // Bea Meterai (Stamp Duty)
  notarized?: boolean; // Notarized document
}

export interface LeaseClause {
  id: string;
  leaseId: string;
  clauseType: string; // Renewal, Termination, Maintenance, etc.
  description: string;
  startDate?: string;
  endDate?: string;
  notificationPeriod?: number; // in days
  isActive: boolean;
}

export interface Lease {
  id: string;
  propertyId: string;
  propertyName?: string;
  leaseTypeId: string;
  leaseType?: LeaseType;
  statusId: string;
  status?: LeaseStatus;
  tenantId: string;
  tenant?: LeaseTenant;
  startDate: string;
  endDate: string;
  term: number; // in months
  renewalOption: boolean;
  renewalTerms?: string;
  baseRent: number;
  rentCurrency: string;
  rentFrequency: string; // Monthly, Quarterly, Annually, etc.
  securityDeposit?: number;
  maintenanceFee?: number;
  utilityFee?: number;
  escalationRate?: number; // percentage
  escalationFrequency?: string; // Annually, Bi-annually, etc.
  noticePeriod?: number; // in days
  payments?: LeasePayment[];
  documents?: LeaseDocument[];
  clauses?: LeaseClause[];
  // Indonesian specific lease fields
  ppn?: boolean; // Pajak Pertambahan Nilai (Value Added Tax)
  pph?: boolean; // Pajak Penghasilan (Income Tax)
  stampDuty?: boolean; // Bea Meterai (Stamp Duty)
  notarized?: boolean; // Notarized lease
  createdAt: string;
  updatedAt: string;
}

export interface LeasePortfolio {
  totalLeases: number;
  activeLeases: number;
  expiringLeases: number; // Leases expiring in the next 90 days
  totalAnnualRent: number;
  leases: Lease[];
}
