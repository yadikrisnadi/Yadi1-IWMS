// Facility Maintenance Management Model for Indonesian IWMS

// Asset Management
export interface MaintenanceAsset {
  id: string;
  name: string;
  description: string;
  assetType: "equipment" | "system" | "infrastructure" | "furniture";
  category: string;
  location: {
    buildingId: string;
    floorId: string;
    spaceId: string;
  };
  manufacturer: string;
  model: string;
  serialNumber: string;
  installationDate: string; // ISO date string
  warrantyExpiryDate: string; // ISO date string
  expectedLifespan: number; // In years
  purchaseCost: number;
  currentValue: number;
  status: "operational" | "under-maintenance" | "faulty" | "decommissioned";
  criticality: "low" | "medium" | "high" | "critical";
  documents: AssetDocument[];
  maintenanceHistory: MaintenanceRecord[];
  // Indonesian specific fields
  bapelCode?: string; // Badan Pengawas Peralatan Listrik code
  snI?: string; // Standar Nasional Indonesia compliance
  importPermitNumber?: string; // For imported equipment
}

export interface AssetDocument {
  id: string;
  assetId: string;
  name: string;
  type: "warranty" | "manual" | "certificate" | "inspection" | "other";
  fileUrl: string;
  uploadDate: string; // ISO date string
  expiryDate?: string; // ISO date string
  notes?: string;
}

// Maintenance Request Management
export interface MaintenanceRequest {
  id: string;
  requestNumber: string; // Auto-generated reference number
  title: string;
  description: string;
  requestType: "corrective" | "preventive" | "inspection" | "emergency";
  priority: "low" | "medium" | "high" | "urgent";
  status:
    | "draft"
    | "submitted"
    | "approved"
    | "assigned"
    | "in-progress"
    | "completed"
    | "cancelled"
    | "on-hold";
  location: {
    buildingId: string;
    floorId: string;
    spaceId: string;
    description: string;
  };
  assetId?: string; // Optional if request is not related to a specific asset
  requesterId: string;
  assignedDepartmentId?: string;
  assignedTechnicianId?: string;
  estimatedCompletionTime?: number; // In hours
  actualCompletionTime?: number; // In hours
  submissionDate: string; // ISO date string
  approvalDate?: string; // ISO date string
  scheduledDate?: string; // ISO date string
  startDate?: string; // ISO date string
  completionDate?: string; // ISO date string
  attachments?: string[]; // URLs to attached files
  notes?: string[];
  feedback?: {
    rating: number; // 1-5
    comments: string;
    submissionDate: string; // ISO date string
  };
  // Indonesian specific fields
  approvalHierarchy: {
    managerId?: string;
    managerApprovalDate?: string;
    directorId?: string;
    directorApprovalDate?: string;
  }; // Indonesian organizations often have strict approval hierarchies
  religiousConsiderations?: string; // For scheduling around prayer times or religious holidays
}

// Maintenance Schedule Management
export interface MaintenanceSchedule {
  id: string;
  name: string;
  description: string;
  scheduleType: "preventive" | "inspection" | "regulatory" | "calibration";
  frequency: {
    type:
      | "daily"
      | "weekly"
      | "monthly"
      | "quarterly"
      | "biannually"
      | "annually"
      | "custom";
    customDays?: number; // If type is custom
    daysOfWeek?: number[]; // 0-6, if type is weekly
    daysOfMonth?: number[]; // 1-31, if type is monthly
    monthsOfYear?: number[]; // 1-12, if type is quarterly, biannually, or annually
  };
  assets: string[]; // Asset IDs
  tasks: MaintenanceTask[];
  startDate: string; // ISO date string
  endDate?: string; // ISO date string
  estimatedDuration: number; // In hours
  assignedDepartmentId: string;
  status: "active" | "inactive" | "completed";
  lastExecutionDate?: string; // ISO date string
  nextExecutionDate?: string; // ISO date string
  // Indonesian specific fields
  governmentMandated: boolean; // Whether this is required by Indonesian regulations
  regulationReference?: string; // Reference to specific Indonesian regulation
}

export interface MaintenanceTask {
  id: string;
  scheduleId: string;
  name: string;
  description: string;
  estimatedTime: number; // In minutes
  requiredSkills: string[];
  requiredTools: string[];
  requiredParts: {
    partId: string;
    quantity: number;
  }[];
  instructions: string;
  safetyProcedures: string;
  checklistItems: {
    id: string;
    description: string;
    required: boolean;
  }[];
}

// Maintenance Record
export interface MaintenanceRecord {
  id: string;
  assetId: string;
  requestId?: string; // If maintenance was initiated by a request
  scheduleId?: string; // If maintenance was scheduled
  maintenanceType: "corrective" | "preventive" | "inspection" | "emergency";
  description: string;
  performedBy: string; // Technician ID
  supervisedBy?: string; // Supervisor ID
  startDate: string; // ISO date string
  completionDate: string; // ISO date string
  duration: number; // In minutes
  findings: string;
  actions: string;
  parts: {
    partId: string;
    name: string;
    quantity: number;
    cost: number;
  }[];
  labor: {
    technicianId: string;
    hours: number;
    rate: number;
  }[];
  totalCost: number;
  status: "completed" | "incomplete" | "requires-followup";
  followUpActions?: string;
  attachments?: string[]; // URLs to attached files
  // Indonesian specific fields
  complianceCertification?: {
    certifiedBy: string;
    certificationDate: string; // ISO date string
    certificateNumber: string;
    validUntil: string; // ISO date string
  };
}

// Vendor Management
export interface Vendor {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
  services: string[];
  specializations: string[];
  contractIds: string[];
  rating: number; // 1-5
  status: "active" | "inactive" | "blacklisted";
  notes?: string;
  // Indonesian specific fields
  npwp: string; // Nomor Pokok Wajib Pajak (Indonesian Tax ID)
  siup?: string; // Surat Izin Usaha Perdagangan (Business Trading License)
  tdp?: string; // Tanda Daftar Perusahaan (Company Registration Certificate)
  bankAccount: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export interface ServiceContract {
  id: string;
  vendorId: string;
  title: string;
  description: string;
  contractNumber: string;
  contractType: "maintenance" | "service" | "warranty" | "lease";
  assets: string[]; // Asset IDs covered by this contract
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  renewalDate?: string; // ISO date string
  value: number;
  paymentTerms: string;
  paymentSchedule: {
    frequency: "monthly" | "quarterly" | "biannually" | "annually" | "one-time";
    nextPaymentDate: string; // ISO date string
    amount: number;
  };
  serviceLevel: {
    responseTime: number; // In hours
    resolutionTime: number; // In hours
    availabilityHours: string; // e.g., "24/7", "8am-5pm, Mon-Fri"
    preventiveVisits: number; // Number of scheduled visits per year
  };
  documents: {
    id: string;
    name: string;
    fileUrl: string;
    uploadDate: string; // ISO date string
  }[];
  status: "draft" | "active" | "expired" | "terminated" | "renewal-pending";
  // Indonesian specific fields
  stampDutyPaid: boolean; // Whether the Indonesian stamp duty has been paid
  governmentApprovalRequired: boolean;
  governmentApprovalStatus?: "pending" | "approved" | "rejected";
}

// Inventory Management
export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  type: "part" | "tool" | "consumable" | "equipment";
  sku: string;
  barcode?: string;
  unitOfMeasure: string;
  currentStock: number;
  minimumStock: number;
  reorderPoint: number;
  reorderQuantity: number;
  location: {
    warehouseId: string;
    zoneId?: string;
    shelfId?: string;
    binId?: string;
  };
  unitCost: number;
  supplier: {
    vendorId: string;
    leadTime: number; // In days
    lastPurchaseDate?: string; // ISO date string
    lastPurchasePrice?: number;
  }[];
  usageRate: number; // Average usage per month
  status: "in-stock" | "low-stock" | "out-of-stock" | "discontinued";
  // Indonesian specific fields
  importRestricted: boolean; // Whether the item has import restrictions
  customsTariffCode?: string; // For imported items
  localAlternativeAvailable: boolean; // Whether local alternatives exist (for import substitution)
}

// Budget and Cost Tracking
export interface MaintenanceBudget {
  id: string;
  fiscalYear: string;
  department: string;
  budgetType: "operational" | "capital" | "project";
  totalAllocated: number;
  totalSpent: number;
  remainingBudget: number;
  categories: {
    name: string;
    allocated: number;
    spent: number;
    remaining: number;
  }[];
  monthlyBreakdown: {
    month: number; // 1-12
    allocated: number;
    spent: number;
    remaining: number;
  }[];
  status: "draft" | "approved" | "active" | "closed";
  // Indonesian specific fields
  budgetApprovalDocument?: string; // Reference to budget approval document
  exchangeRateAssumption?: number; // For budgets with imported parts/services
}

export interface MaintenanceCost {
  id: string;
  assetId?: string;
  requestId?: string;
  scheduleId?: string;
  description: string;
  costType: "labor" | "parts" | "service" | "contract" | "other";
  amount: number;
  currency: string;
  date: string; // ISO date string
  category: string;
  budgetId: string;
  paymentStatus: "pending" | "approved" | "paid" | "rejected";
  invoiceNumber?: string;
  receiptUrl?: string;
  notes?: string;
  // Indonesian specific fields
  taxDeductible: boolean;
  taxPercentage: number; // Indonesian VAT (PPN) is typically 10%
  withholdingTaxApplicable: boolean;
  withholdingTaxPercentage?: number;
}

// Key Performance Indicators
export interface MaintenanceKPI {
  id: string;
  name: string;
  description: string;
  category:
    | "reliability"
    | "efficiency"
    | "cost"
    | "compliance"
    | "satisfaction";
  formula: string;
  unit: string;
  target: number;
  actual: number;
  trend: "increasing" | "decreasing" | "stable";
  period: {
    startDate: string; // ISO date string
    endDate: string; // ISO date string
  };
  frequency: "daily" | "weekly" | "monthly" | "quarterly" | "annually";
  status: "on-target" | "below-target" | "above-target";
  historicalData: {
    date: string; // ISO date string
    value: number;
  }[];
  // Indonesian specific fields
  regulatoryRequired: boolean; // Whether this KPI is required by Indonesian regulations
  benchmarkAgainstNationalAverage?: number; // Comparison with Indonesian industry standards
}
