// Space Management Model for Indonesian IWMS

// Space Classification based on Indonesian standards
export interface SpaceClassification {
  id: string;
  code: string; // Standard classification code
  name: string;
  description: string;
  category: "office" | "meeting" | "common" | "facility" | "storage" | "other";
}

// Space Type definitions
export interface SpaceType {
  id: string;
  name: string;
  description: string;
  classificationId: string;
  classification?: SpaceClassification;
  standardArea?: number; // Standard area in square meters
  standardOccupancy?: number; // Standard number of occupants
  color?: string; // For visualization
}

// Floor definition
export interface Floor {
  id: string;
  buildingId: string;
  name: string;
  number: string; // Floor number (can include basement levels like B1, B2)
  grossArea: number; // Total floor area in square meters
  netUsableArea: number; // Usable area in square meters
  floorPlanUrl?: string; // URL to floor plan image
  floorPlanCadUrl?: string; // URL to CAD file
  floorPlanBimUrl?: string; // URL to BIM file
  elevation: number; // Height from ground level in meters
  spaces?: Space[];
  // Indonesian specific fields
  imb?: string; // Izin Mendirikan Bangunan reference for this floor
  slf?: string; // Sertifikat Laik Fungsi reference
}

// Space definition
export interface Space {
  id: string;
  floorId: string;
  spaceTypeId: string;
  spaceType?: SpaceType;
  name: string;
  number: string; // Space identifier
  area: number; // Area in square meters
  capacity: number; // Maximum occupancy
  currentOccupancy?: number; // Current number of occupants
  status: "active" | "inactive" | "maintenance" | "renovation";
  // Location on floor plan
  coordinates?: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
  // Adjacency information
  adjacentSpaces?: string[]; // IDs of adjacent spaces
  // Assets in the space
  assets?: Asset[];
  // Reservations for the space
  reservations?: Reservation[];
  // Indonesian specific fields
  departmentId?: string; // Associated department
  costCenterId?: string; // Associated cost center
}

// Asset definition
export interface Asset {
  id: string;
  spaceId: string;
  assetTypeId: string;
  assetType?: AssetType;
  name: string;
  serialNumber?: string;
  manufacturer?: string;
  model?: string;
  purchaseDate?: string;
  warrantyExpiration?: string;
  status: "operational" | "maintenance" | "broken" | "retired";
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  // Location within space
  coordinates?: {
    x: number;
    y: number;
  };
  // Indonesian specific fields
  bapelCode?: string; // Badan Pengawas Peralatan Listrik code for electrical equipment
  snI?: string; // Standar Nasional Indonesia compliance reference
}

// Asset Type definition
export interface AssetType {
  id: string;
  name: string;
  category:
    | "furniture"
    | "equipment"
    | "it"
    | "hvac"
    | "electrical"
    | "plumbing"
    | "other";
  description: string;
  averageLifespan?: number; // In years
  maintenanceFrequency?: number; // In days
  // Indonesian specific fields
  snIRequired?: boolean; // Whether SNI certification is required
  bapelRequired?: boolean; // Whether BAPEL certification is required
}

// Reservation definition
export interface Reservation {
  id: string;
  spaceId: string;
  userId: string;
  title: string;
  description?: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  status: "pending" | "confirmed" | "cancelled" | "completed";
  attendees?: string[]; // User IDs
  recurrence?: {
    pattern: "daily" | "weekly" | "monthly";
    interval: number;
    endDate: string; // ISO date string
  };
  // Indonesian specific fields
  approvalRequired: boolean; // Whether approval is required based on hierarchy
  approvedBy?: string; // User ID of approver
  approvalDate?: string; // ISO date string
}

// Occupancy Data definition
export interface OccupancyData {
  id: string;
  spaceId: string;
  timestamp: string; // ISO date string
  occupancyCount: number;
  capacityPercentage: number;
  source: "sensor" | "reservation" | "manual" | "estimated";
  // For sensor data
  sensorId?: string;
  // For reservation data
  reservationId?: string;
}

// Space Utilization Report
export interface SpaceUtilizationReport {
  id: string;
  name: string;
  description?: string;
  dateRange: {
    startDate: string; // ISO date string
    endDate: string; // ISO date string
  };
  granularity: "hourly" | "daily" | "weekly" | "monthly";
  filters?: {
    buildingIds?: string[];
    floorIds?: string[];
    spaceTypeIds?: string[];
    departmentIds?: string[];
  };
  data: {
    spaceId: string;
    spaceName: string;
    spaceType: string;
    averageOccupancy: number;
    peakOccupancy: number;
    utilizationPercentage: number;
    timeSeriesData?: {
      timestamp: string;
      occupancyCount: number;
      capacityPercentage: number;
    }[];
  }[];
  // Indonesian specific fields
  complianceStatus?: {
    gbci?: boolean; // Greenship GBCI compliance
    bgh?: boolean; // BGH certification compliance
  };
}

// Space Planning Project
export interface SpacePlanningProject {
  id: string;
  name: string;
  description: string;
  status:
    | "draft"
    | "in-progress"
    | "review"
    | "approved"
    | "completed"
    | "cancelled";
  startDate: string; // ISO date string
  targetCompletionDate: string; // ISO date string
  actualCompletionDate?: string; // ISO date string
  createdBy: string; // User ID
  assignedTo: string[]; // User IDs
  // Affected areas
  buildingIds: string[];
  floorIds: string[];
  spaceIds: string[];
  // Project details
  objectives: string[];
  budget?: number;
  currentCost?: number;
  // Versions of floor plans
  versions: {
    id: string;
    name: string;
    createdAt: string; // ISO date string
    createdBy: string; // User ID
    floorPlanUrls: {
      floorId: string;
      url: string;
    }[];
    status: "draft" | "review" | "approved" | "rejected";
    comments?: string;
  }[];
  // Indonesian specific fields
  permits: {
    imbAmendment?: string; // IMB amendment reference
    localPermits?: string[]; // Local permits required
    status: "pending" | "approved" | "rejected";
  };
}

// Workspace Standards based on Indonesian norms
export interface WorkspaceStandard {
  id: string;
  name: string;
  description: string;
  applicableRoles: string[]; // Job roles this standard applies to
  spaceTypeId: string;
  area: number; // Standard area in square meters
  furniture: {
    assetTypeId: string;
    quantity: number;
    required: boolean;
  }[];
  equipment: {
    assetTypeId: string;
    quantity: number;
    required: boolean;
  }[];
  // Indonesian specific fields
  culturalConsiderations?: string; // Cultural considerations for workspace design
  hierarchyLevel?: number; // Organizational hierarchy level (important in Indonesian culture)
  privacyLevel: "open" | "semi-private" | "private"; // Privacy level based on cultural norms
}

// Move Management
export interface MoveRequest {
  id: string;
  title: string;
  description: string;
  requestedBy: string; // User ID
  requestDate: string; // ISO date string
  targetMoveDate: string; // ISO date string
  status: "pending" | "approved" | "in-progress" | "completed" | "cancelled";
  moveType: "individual" | "group" | "department";
  // Move details
  moves: {
    userId?: string;
    departmentId?: string;
    fromSpaceId: string;
    toSpaceId: string;
    assets?: string[]; // Asset IDs to be moved
    status: "pending" | "in-progress" | "completed";
    scheduledDate: string; // ISO date string
    actualDate?: string; // ISO date string
  }[];
  // Approvals
  approvals: {
    approverId: string;
    status: "pending" | "approved" | "rejected";
    date?: string; // ISO date string
    comments?: string;
  }[];
  // Indonesian specific fields
  securityClearance?: boolean; // Whether security clearance is required
  ritualRequirements?: string; // Any cultural/religious rituals required before moving
}
