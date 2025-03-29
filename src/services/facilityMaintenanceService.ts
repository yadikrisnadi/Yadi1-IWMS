// Facility Maintenance Service for Indonesian IWMS
import {
  MaintenanceAsset,
  AssetDocument,
  MaintenanceRequest,
  MaintenanceSchedule,
  MaintenanceTask,
  MaintenanceRecord,
  Vendor,
  ServiceContract,
  InventoryItem,
  MaintenanceBudget,
  MaintenanceCost,
  MaintenanceKPI,
} from "../models/facilityMaintenance";

// Mock data for development - would be replaced with actual API calls
const mockAssets: MaintenanceAsset[] = [
  {
    id: "1",
    name: "HVAC System - Building A",
    description: "Central air conditioning system for Building A",
    assetType: "system",
    category: "HVAC",
    location: {
      buildingId: "1",
      floorId: "1",
      spaceId: "technical-room-1",
    },
    manufacturer: "Daikin",
    model: "VRV IV",
    serialNumber: "DK-VRV-2023-12345",
    installationDate: "2023-01-15",
    warrantyExpiryDate: "2026-01-15",
    expectedLifespan: 15,
    purchaseCost: 250000000, // In IDR
    currentValue: 225000000, // In IDR
    status: "operational",
    criticality: "high",
    documents: [
      {
        id: "doc-1",
        assetId: "1",
        name: "Warranty Certificate",
        type: "warranty",
        fileUrl: "https://example.com/documents/warranty-hvac.pdf",
        uploadDate: "2023-01-20",
        expiryDate: "2026-01-15",
      },
      {
        id: "doc-2",
        assetId: "1",
        name: "User Manual",
        type: "manual",
        fileUrl: "https://example.com/documents/manual-hvac.pdf",
        uploadDate: "2023-01-20",
      },
    ],
    maintenanceHistory: [],
    bapelCode: "BAPEL-2023-AC-789",
    snI: "SNI-AC-2022-456",
    importPermitNumber: "IMP-AC-2022-123456",
  },
  {
    id: "2",
    name: "Elevator 1 - Building A",
    description: "Main passenger elevator in Building A",
    assetType: "equipment",
    category: "Vertical Transportation",
    location: {
      buildingId: "1",
      floorId: "1",
      spaceId: "elevator-shaft-1",
    },
    manufacturer: "Otis",
    model: "Gen2",
    serialNumber: "OT-GEN2-2022-54321",
    installationDate: "2022-06-10",
    warrantyExpiryDate: "2025-06-10",
    expectedLifespan: 20,
    purchaseCost: 350000000, // In IDR
    currentValue: 330000000, // In IDR
    status: "operational",
    criticality: "critical",
    documents: [
      {
        id: "doc-3",
        assetId: "2",
        name: "Elevator Certification",
        type: "certificate",
        fileUrl: "https://example.com/documents/cert-elevator.pdf",
        uploadDate: "2022-06-15",
        expiryDate: "2023-06-15",
        notes: "Annual certification required by Indonesian regulations",
      },
    ],
    maintenanceHistory: [],
    bapelCode: "BAPEL-2022-ELV-456",
    snI: "SNI-ELV-2021-789",
  },
];

const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: "1",
    requestNumber: "MR-2023-001",
    title: "AC not cooling properly in Marketing Department",
    description:
      "The air conditioning in the marketing department area is not cooling effectively. Temperature remains above 28°C despite setting at 23°C.",
    requestType: "corrective",
    priority: "medium",
    status: "assigned",
    location: {
      buildingId: "1",
      floorId: "1",
      spaceId: "2", // Marketing Team Area
      description: "Marketing Department, Open Area",
    },
    assetId: "1", // HVAC System
    requesterId: "user-123",
    assignedDepartmentId: "dept-facilities",
    assignedTechnicianId: "tech-456",
    estimatedCompletionTime: 2,
    submissionDate: "2023-07-10T09:15:00Z",
    approvalDate: "2023-07-10T10:30:00Z",
    scheduledDate: "2023-07-11T09:00:00Z",
    approvalHierarchy: {
      managerId: "mgr-789",
      managerApprovalDate: "2023-07-10T10:00:00Z",
    },
    religiousConsiderations:
      "Schedule after Dzuhur prayer time (after 12:30 PM)",
  },
  {
    id: "2",
    requestNumber: "MR-2023-002",
    title: "Elevator making unusual noise",
    description:
      "Elevator 1 is making a grinding noise when moving between floors 2 and 3. Passengers have reported concerns.",
    requestType: "corrective",
    priority: "high",
    status: "in-progress",
    location: {
      buildingId: "1",
      floorId: "1",
      spaceId: "elevator-shaft-1",
      description: "Elevator 1",
    },
    assetId: "2", // Elevator 1
    requesterId: "user-456",
    assignedDepartmentId: "dept-facilities",
    assignedTechnicianId: "tech-789",
    estimatedCompletionTime: 4,
    submissionDate: "2023-07-12T08:30:00Z",
    approvalDate: "2023-07-12T09:15:00Z",
    scheduledDate: "2023-07-12T13:00:00Z",
    startDate: "2023-07-12T13:10:00Z",
    approvalHierarchy: {
      managerId: "mgr-789",
      managerApprovalDate: "2023-07-12T09:00:00Z",
      directorId: "dir-123",
      directorApprovalDate: "2023-07-12T09:15:00Z",
    },
  },
];

const mockMaintenanceSchedules: MaintenanceSchedule[] = [
  {
    id: "1",
    name: "HVAC Quarterly Maintenance",
    description: "Regular preventive maintenance for all HVAC systems",
    scheduleType: "preventive",
    frequency: {
      type: "quarterly",
      monthsOfYear: [1, 4, 7, 10],
    },
    assets: ["1"], // HVAC System
    tasks: [
      {
        id: "task-1",
        scheduleId: "1",
        name: "Filter Cleaning/Replacement",
        description: "Clean or replace air filters as needed",
        estimatedTime: 60, // 60 minutes
        requiredSkills: ["HVAC Technician"],
        requiredTools: ["Filter Toolkit", "Vacuum Cleaner"],
        requiredParts: [
          {
            partId: "part-air-filter",
            quantity: 1,
          },
        ],
        instructions:
          "1. Turn off system. 2. Remove filter covers. 3. Inspect filters. 4. Clean or replace as needed. 5. Reinstall and test.",
        safetyProcedures:
          "Ensure power is off before beginning work. Wear appropriate PPE including gloves and mask.",
        checklistItems: [
          {
            id: "check-1",
            description: "System powered off",
            required: true,
          },
          {
            id: "check-2",
            description: "Filters inspected",
            required: true,
          },
          {
            id: "check-3",
            description: "Filters cleaned/replaced",
            required: true,
          },
          {
            id: "check-4",
            description: "System tested after maintenance",
            required: true,
          },
        ],
      },
      {
        id: "task-2",
        scheduleId: "1",
        name: "Condenser Cleaning",
        description: "Clean condenser coils and check refrigerant levels",
        estimatedTime: 90, // 90 minutes
        requiredSkills: ["HVAC Technician", "Refrigerant Handling"],
        requiredTools: ["Coil Cleaning Kit", "Refrigerant Gauge"],
        requiredParts: [],
        instructions:
          "1. Access condenser unit. 2. Clean coils with appropriate cleaner. 3. Check refrigerant pressure. 4. Add refrigerant if needed. 5. Test system operation.",
        safetyProcedures:
          "Ensure power is off. Wear gloves and eye protection. Handle refrigerant according to safety guidelines.",
        checklistItems: [
          {
            id: "check-5",
            description: "Coils cleaned",
            required: true,
          },
          {
            id: "check-6",
            description: "Refrigerant levels checked",
            required: true,
          },
          {
            id: "check-7",
            description: "System operation verified",
            required: true,
          },
        ],
      },
    ],
    startDate: "2023-01-01",
    estimatedDuration: 3, // 3 hours
    assignedDepartmentId: "dept-facilities",
    status: "active",
    lastExecutionDate: "2023-04-15",
    nextExecutionDate: "2023-07-15",
    governmentMandated: true,
    regulationReference:
      "Permen PUPR No. 24/2008 tentang Pemeliharaan Bangunan Gedung",
  },
  {
    id: "2",
    name: "Elevator Monthly Safety Inspection",
    description: "Mandatory monthly safety inspection for all elevators",
    scheduleType: "inspection",
    frequency: {
      type: "monthly",
      daysOfMonth: [15],
    },
    assets: ["2"], // Elevator 1
    tasks: [
      {
        id: "task-3",
        scheduleId: "2",
        name: "Safety Mechanism Testing",
        description: "Test all elevator safety mechanisms",
        estimatedTime: 120, // 120 minutes
        requiredSkills: ["Elevator Technician", "Safety Inspector"],
        requiredTools: ["Elevator Test Kit", "Safety Equipment"],
        requiredParts: [],
        instructions:
          "1. Test emergency brakes. 2. Check door sensors. 3. Verify emergency communication. 4. Test alarm systems. 5. Check emergency lighting.",
        safetyProcedures:
          "Ensure elevator is not in public use during testing. Use proper lockout/tagout procedures.",
        checklistItems: [
          {
            id: "check-8",
            description: "Emergency brakes tested",
            required: true,
          },
          {
            id: "check-9",
            description: "Door sensors verified",
            required: true,
          },
          {
            id: "check-10",
            description: "Emergency communication tested",
            required: true,
          },
          {
            id: "check-11",
            description: "Alarm systems functional",
            required: true,
          },
          {
            id: "check-12",
            description: "Emergency lighting operational",
            required: true,
          },
        ],
      },
    ],
    startDate: "2023-01-15",
    estimatedDuration: 2, // 2 hours
    assignedDepartmentId: "dept-facilities",
    status: "active",
    lastExecutionDate: "2023-06-15",
    nextExecutionDate: "2023-07-15",
    governmentMandated: true,
    regulationReference:
      "Permenaker No. 37/2016 tentang K3 Pesawat Angkat dan Angkut",
  },
];

const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "PT Daikin Airconditioning Indonesia",
    contactPerson: "Budi Santoso",
    email: "budi.santoso@daikin.co.id",
    phone: "+62 21 5555 1234",
    address: "Jl. Jenderal Sudirman Kav. 45-46",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12930",
    country: "Indonesia",
    services: ["HVAC Installation", "HVAC Maintenance", "HVAC Repair"],
    specializations: ["Commercial HVAC Systems", "VRV/VRF Systems"],
    contractIds: ["contract-1"],
    rating: 4.8,
    status: "active",
    npwp: "01.123.456.7-123.000",
    siup: "SIUP-123456/2022",
    tdp: "TDP-789012/2022",
    bankAccount: {
      bankName: "Bank Central Asia",
      accountNumber: "1234567890",
      accountName: "PT Daikin Airconditioning Indonesia",
    },
  },
  {
    id: "2",
    name: "PT Otis Elevator Indonesia",
    contactPerson: "Dewi Lestari",
    email: "dewi.lestari@otis.co.id",
    phone: "+62 21 5555 6789",
    address: "Jl. M.H. Thamrin No. 10",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "10310",
    country: "Indonesia",
    services: [
      "Elevator Installation",
      "Elevator Maintenance",
      "Elevator Repair",
      "Escalator Maintenance",
    ],
    specializations: ["Commercial Elevators", "High-rise Building Elevators"],
    contractIds: ["contract-2"],
    rating: 4.7,
    status: "active",
    npwp: "01.456.789.0-456.000",
    siup: "SIUP-654321/2022",
    tdp: "TDP-098765/2022",
    bankAccount: {
      bankName: "Bank Mandiri",
      accountNumber: "0987654321",
      accountName: "PT Otis Elevator Indonesia",
    },
  },
];

const mockServiceContracts: ServiceContract[] = [
  {
    id: "contract-1",
    vendorId: "1", // PT Daikin
    title: "HVAC Maintenance Service Agreement",
    description:
      "Comprehensive maintenance service for all HVAC systems in Building A",
    contractNumber: "HVAC-SVC-2023-001",
    contractType: "maintenance",
    assets: ["1"], // HVAC System
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    renewalDate: "2025-10-01",
    value: 120000000, // In IDR per year
    paymentTerms: "Quarterly payments, net 30 days",
    paymentSchedule: {
      frequency: "quarterly",
      nextPaymentDate: "2023-07-01",
      amount: 30000000, // In IDR
    },
    serviceLevel: {
      responseTime: 4, // 4 hours
      resolutionTime: 24, // 24 hours
      availabilityHours: "8am-5pm, Mon-Fri",
      preventiveVisits: 4, // 4 visits per year
    },
    documents: [
      {
        id: "contract-doc-1",
        name: "HVAC Service Contract",
        fileUrl: "https://example.com/documents/contract-hvac.pdf",
        uploadDate: "2022-12-15",
      },
      {
        id: "contract-doc-2",
        name: "Service Level Agreement",
        fileUrl: "https://example.com/documents/sla-hvac.pdf",
        uploadDate: "2022-12-15",
      },
    ],
    status: "active",
    stampDutyPaid: true,
    governmentApprovalRequired: false,
  },
  {
    id: "contract-2",
    vendorId: "2", // PT Otis
    title: "Elevator Maintenance Service Agreement",
    description:
      "Comprehensive maintenance service for all elevators in Building A",
    contractNumber: "ELV-SVC-2022-001",
    contractType: "maintenance",
    assets: ["2"], // Elevator 1
    startDate: "2022-07-01",
    endDate: "2025-06-30",
    renewalDate: "2025-04-01",
    value: 150000000, // In IDR per year
    paymentTerms: "Quarterly payments, net 30 days",
    paymentSchedule: {
      frequency: "quarterly",
      nextPaymentDate: "2023-07-01",
      amount: 37500000, // In IDR
    },
    serviceLevel: {
      responseTime: 2, // 2 hours
      resolutionTime: 12, // 12 hours
      availabilityHours: "24/7",
      preventiveVisits: 12, // 12 visits per year (monthly)
    },
    documents: [
      {
        id: "contract-doc-3",
        name: "Elevator Service Contract",
        fileUrl: "https://example.com/documents/contract-elevator.pdf",
        uploadDate: "2022-06-15",
      },
    ],
    status: "active",
    stampDutyPaid: true,
    governmentApprovalRequired: true,
    governmentApprovalStatus: "approved",
  },
];

const mockMaintenanceKPIs: MaintenanceKPI[] = [
  {
    id: "1",
    name: "Mean Time Between Failures (MTBF)",
    description: "Average time between failures for critical assets",
    category: "reliability",
    formula: "Total Operational Time / Number of Failures",
    unit: "hours",
    target: 2000,
    actual: 1850,
    trend: "increasing",
    period: {
      startDate: "2023-01-01",
      endDate: "2023-06-30",
    },
    frequency: "monthly",
    status: "below-target",
    historicalData: [
      {
        date: "2023-01-31",
        value: 1700,
      },
      {
        date: "2023-02-28",
        value: 1750,
      },
      {
        date: "2023-03-31",
        value: 1780,
      },
      {
        date: "2023-04-30",
        value: 1800,
      },
      {
        date: "2023-05-31",
        value: 1820,
      },
      {
        date: "2023-06-30",
        value: 1850,
      },
    ],
    regulatoryRequired: false,
    benchmarkAgainstNationalAverage: 1700,
  },
  {
    id: "2",
    name: "Preventive Maintenance Compliance",
    description:
      "Percentage of preventive maintenance tasks completed on schedule",
    category: "compliance",
    formula: "(Completed PM Tasks / Scheduled PM Tasks) * 100",
    unit: "%",
    target: 95,
    actual: 92,
    trend: "stable",
    period: {
      startDate: "2023-01-01",
      endDate: "2023-06-30",
    },
    frequency: "monthly",
    status: "below-target",
    historicalData: [
      {
        date: "2023-01-31",
        value: 90,
      },
      {
        date: "2023-02-28",
        value: 91,
      },
      {
        date: "2023-03-31",
        value: 93,
      },
      {
        date: "2023-04-30",
        value: 94,
      },
      {
        date: "2023-05-31",
        value: 91,
      },
      {
        date: "2023-06-30",
        value: 92,
      },
    ],
    regulatoryRequired: true,
    benchmarkAgainstNationalAverage: 88,
  },
];

// Service functions
export const facilityMaintenanceService = {
  // Asset Management
  getAssets: async (filters?: {
    buildingId?: string;
    floorId?: string;
    spaceId?: string;
    assetType?: string;
    status?: string;
  }): Promise<MaintenanceAsset[]> => {
    let assets = mockAssets;

    if (filters) {
      if (filters.buildingId) {
        assets = assets.filter(
          (a) => a.location.buildingId === filters.buildingId,
        );
      }
      if (filters.floorId) {
        assets = assets.filter((a) => a.location.floorId === filters.floorId);
      }
      if (filters.spaceId) {
        assets = assets.filter((a) => a.location.spaceId === filters.spaceId);
      }
      if (filters.assetType) {
        assets = assets.filter((a) => a.assetType === filters.assetType);
      }
      if (filters.status) {
        assets = assets.filter((a) => a.status === filters.status);
      }
    }

    return Promise.resolve(assets);
  },

  getAssetById: async (id: string): Promise<MaintenanceAsset | undefined> => {
    const asset = mockAssets.find((a) => a.id === id);
    return Promise.resolve(asset);
  },

  // Maintenance Request Management
  getMaintenanceRequests: async (filters?: {
    status?: string;
    priority?: string;
    requestType?: string;
    buildingId?: string;
    floorId?: string;
    assetId?: string;
    requesterId?: string;
    assignedTechnicianId?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<MaintenanceRequest[]> => {
    let requests = mockMaintenanceRequests;

    if (filters) {
      if (filters.status) {
        requests = requests.filter((r) => r.status === filters.status);
      }
      if (filters.priority) {
        requests = requests.filter((r) => r.priority === filters.priority);
      }
      if (filters.requestType) {
        requests = requests.filter(
          (r) => r.requestType === filters.requestType,
        );
      }
      if (filters.buildingId) {
        requests = requests.filter(
          (r) => r.location.buildingId === filters.buildingId,
        );
      }
      if (filters.floorId) {
        requests = requests.filter(
          (r) => r.location.floorId === filters.floorId,
        );
      }
      if (filters.assetId) {
        requests = requests.filter((r) => r.assetId === filters.assetId);
      }
      if (filters.requesterId) {
        requests = requests.filter(
          (r) => r.requesterId === filters.requesterId,
        );
      }
      if (filters.assignedTechnicianId) {
        requests = requests.filter(
          (r) => r.assignedTechnicianId === filters.assignedTechnicianId,
        );
      }
      if (filters.dateFrom) {
        requests = requests.filter(
          (r) => new Date(r.submissionDate) >= new Date(filters.dateFrom!),
        );
      }
      if (filters.dateTo) {
        requests = requests.filter(
          (r) => new Date(r.submissionDate) <= new Date(filters.dateTo!),
        );
      }
    }

    return Promise.resolve(requests);
  },

  getMaintenanceRequestById: async (
    id: string,
  ): Promise<MaintenanceRequest | undefined> => {
    const request = mockMaintenanceRequests.find((r) => r.id === id);
    return Promise.resolve(request);
  },

  // Maintenance Schedule Management
  getMaintenanceSchedules: async (filters?: {
    scheduleType?: string;
    status?: string;
    assetId?: string;
    departmentId?: string;
    dateFrom?: string;
    dateTo?: string;
  }): Promise<MaintenanceSchedule[]> => {
    let schedules = mockMaintenanceSchedules;

    if (filters) {
      if (filters.scheduleType) {
        schedules = schedules.filter(
          (s) => s.scheduleType === filters.scheduleType,
        );
      }
      if (filters.status) {
        schedules = schedules.filter((s) => s.status === filters.status);
      }
      if (filters.assetId) {
        schedules = schedules.filter((s) =>
          s.assets.includes(filters.assetId!),
        );
      }
      if (filters.departmentId) {
        schedules = schedules.filter(
          (s) => s.assignedDepartmentId === filters.departmentId,
        );
      }
      if (filters.dateFrom) {
        schedules = schedules.filter(
          (s) => new Date(s.startDate) >= new Date(filters.dateFrom!),
        );
      }
      if (filters.dateTo) {
        schedules = schedules.filter(
          (s) => !s.endDate || new Date(s.endDate) <= new Date(filters.dateTo!),
        );
      }
    }

    return Promise.resolve(schedules);
  },

  getMaintenanceScheduleById: async (
    id: string,
  ): Promise<MaintenanceSchedule | undefined> => {
    const schedule = mockMaintenanceSchedules.find((s) => s.id === id);
    return Promise.resolve(schedule);
  },

  // Vendor Management
  getVendors: async (filters?: {
    status?: string;
    service?: string;
    specialization?: string;
  }): Promise<Vendor[]> => {
    let vendors = mockVendors;

    if (filters) {
      if (filters.status) {
        vendors = vendors.filter((v) => v.status === filters.status);
      }
      if (filters.service) {
        vendors = vendors.filter((v) => v.services.includes(filters.service!));
      }
      if (filters.specialization) {
        vendors = vendors.filter((v) =>
          v.specializations.includes(filters.specialization!),
        );
      }
    }

    return Promise.resolve(vendors);
  },

  getVendorById: async (id: string): Promise<Vendor | undefined> => {
    const vendor = mockVendors.find((v) => v.id === id);
    return Promise.resolve(vendor);
  },

  // Service Contract Management
  getServiceContracts: async (filters?: {
    vendorId?: string;
    assetId?: string;
    contractType?: string;
    status?: string;
  }): Promise<ServiceContract[]> => {
    let contracts = mockServiceContracts;

    if (filters) {
      if (filters.vendorId) {
        contracts = contracts.filter((c) => c.vendorId === filters.vendorId);
      }
      if (filters.assetId) {
        contracts = contracts.filter((c) =>
          c.assets.includes(filters.assetId!),
        );
      }
      if (filters.contractType) {
        contracts = contracts.filter(
          (c) => c.contractType === filters.contractType,
        );
      }
      if (filters.status) {
        contracts = contracts.filter((c) => c.status === filters.status);
      }
    }

    return Promise.resolve(contracts);
  },

  getServiceContractById: async (
    id: string,
  ): Promise<ServiceContract | undefined> => {
    const contract = mockServiceContracts.find((c) => c.id === id);
    return Promise.resolve(contract);
  },

  // KPI Management
  getMaintenanceKPIs: async (filters?: {
    category?: string;
    status?: string;
    period?: {
      startDate: string;
      endDate: string;
    };
  }): Promise<MaintenanceKPI[]> => {
    let kpis = mockMaintenanceKPIs;

    if (filters) {
      if (filters.category) {
        kpis = kpis.filter((k) => k.category === filters.category);
      }
      if (filters.status) {
        kpis = kpis.filter((k) => k.status === filters.status);
      }
      if (filters.period) {
        kpis = kpis.filter(
          (k) =>
            new Date(k.period.startDate) <= new Date(filters.period!.endDate) &&
            new Date(k.period.endDate) >= new Date(filters.period!.startDate),
        );
      }
    }

    return Promise.resolve(kpis);
  },

  getMaintenanceKPIById: async (
    id: string,
  ): Promise<MaintenanceKPI | undefined> => {
    const kpi = mockMaintenanceKPIs.find((k) => k.id === id);
    return Promise.resolve(kpi);
  },
};
