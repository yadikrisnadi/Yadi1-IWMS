// Space Management Service for Indonesian IWMS
import {
  SpaceClassification,
  SpaceType,
  Floor,
  Space,
  Asset,
  AssetType,
  Reservation,
  OccupancyData,
  SpaceUtilizationReport,
  SpacePlanningProject,
  WorkspaceStandard,
  MoveRequest,
} from "../models/spaceManagement";

// Mock data for development - would be replaced with actual API calls
const mockSpaceTypes: SpaceType[] = [
  {
    id: "1",
    name: "Executive Office",
    description: "Office space for executives",
    classificationId: "1",
    classification: {
      id: "1",
      code: "OFF-EXE",
      name: "Executive Office",
      description: "Office space for executive level employees",
      category: "office",
    },
    standardArea: 25, // 25 square meters
    standardOccupancy: 1,
    color: "#4A6FFF",
  },
  {
    id: "2",
    name: "Open Workspace",
    description: "Open plan workspace for general staff",
    classificationId: "2",
    classification: {
      id: "2",
      code: "OFF-OPN",
      name: "Open Workspace",
      description: "Open plan workspace for general employees",
      category: "office",
    },
    standardArea: 5, // 5 square meters per person
    standardOccupancy: 1,
    color: "#6FCF97",
  },
  {
    id: "3",
    name: "Meeting Room - Large",
    description: "Large meeting room for 10-20 people",
    classificationId: "3",
    classification: {
      id: "3",
      code: "MTG-LRG",
      name: "Large Meeting Room",
      description: "Meeting room for large groups",
      category: "meeting",
    },
    standardArea: 40, // 40 square meters
    standardOccupancy: 20,
    color: "#F2C94C",
  },
  {
    id: "4",
    name: "Prayer Room",
    description: "Dedicated space for prayer (Musholla)",
    classificationId: "4",
    classification: {
      id: "4",
      code: "COM-PRA",
      name: "Prayer Room",
      description: "Dedicated space for prayer activities",
      category: "common",
    },
    standardArea: 20, // 20 square meters
    standardOccupancy: 10,
    color: "#BB6BD9",
  },
];

const mockFloors: Floor[] = [
  {
    id: "1",
    buildingId: "1",
    name: "Ground Floor",
    number: "GF",
    grossArea: 1200,
    netUsableArea: 980,
    floorPlanUrl:
      "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?w=800&q=80",
    elevation: 0,
    imb: "IMB-2015-12345-F1",
    slf: "SLF-2022-54321-F1",
  },
  {
    id: "2",
    buildingId: "1",
    name: "First Floor",
    number: "1",
    grossArea: 1200,
    netUsableArea: 1000,
    floorPlanUrl:
      "https://images.unsplash.com/photo-1628744404137-0a8946b408a9?w=800&q=80",
    elevation: 4.5,
    imb: "IMB-2015-12345-F2",
    slf: "SLF-2022-54321-F2",
  },
];

const mockSpaces: Space[] = [
  {
    id: "1",
    floorId: "1",
    spaceTypeId: "1",
    spaceType: mockSpaceTypes[0],
    name: "Director's Office",
    number: "GF-101",
    area: 28,
    capacity: 3,
    currentOccupancy: 1,
    status: "active",
    coordinates: {
      x1: 10,
      y1: 10,
      x2: 20,
      y2: 20,
    },
    departmentId: "1", // Executive department
    costCenterId: "EXE-001",
  },
  {
    id: "2",
    floorId: "1",
    spaceTypeId: "2",
    spaceType: mockSpaceTypes[1],
    name: "Marketing Team Area",
    number: "GF-102",
    area: 120,
    capacity: 24,
    currentOccupancy: 18,
    status: "active",
    coordinates: {
      x1: 30,
      y1: 10,
      x2: 80,
      y2: 40,
    },
    departmentId: "2", // Marketing department
    costCenterId: "MKT-001",
  },
  {
    id: "3",
    floorId: "1",
    spaceTypeId: "3",
    spaceType: mockSpaceTypes[2],
    name: "Main Conference Room",
    number: "GF-103",
    area: 45,
    capacity: 20,
    currentOccupancy: 0,
    status: "active",
    coordinates: {
      x1: 85,
      y1: 10,
      x2: 100,
      y2: 30,
    },
    departmentId: "0", // Shared
    costCenterId: "SHR-001",
  },
  {
    id: "4",
    floorId: "1",
    spaceTypeId: "4",
    spaceType: mockSpaceTypes[3],
    name: "Musholla",
    number: "GF-104",
    area: 25,
    capacity: 15,
    currentOccupancy: 0,
    status: "active",
    coordinates: {
      x1: 85,
      y1: 35,
      x2: 100,
      y2: 50,
    },
    departmentId: "0", // Shared
    costCenterId: "SHR-001",
  },
];

const mockOccupancyData: OccupancyData[] = [
  {
    id: "1",
    spaceId: "2", // Marketing Team Area
    timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
    occupancyCount: 15,
    capacityPercentage: 62.5,
    source: "sensor",
    sensorId: "sensor-001",
  },
  {
    id: "2",
    spaceId: "2", // Marketing Team Area
    timestamp: new Date().toISOString(), // Now
    occupancyCount: 18,
    capacityPercentage: 75,
    source: "sensor",
    sensorId: "sensor-001",
  },
  {
    id: "3",
    spaceId: "3", // Main Conference Room
    timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
    occupancyCount: 12,
    capacityPercentage: 60,
    source: "reservation",
    reservationId: "res-001",
  },
];

// Service functions
export const spaceManagementService = {
  // Space Types
  getSpaceTypes: async (): Promise<SpaceType[]> => {
    return Promise.resolve(mockSpaceTypes);
  },

  getSpaceTypeById: async (id: string): Promise<SpaceType | undefined> => {
    const spaceType = mockSpaceTypes.find((st) => st.id === id);
    return Promise.resolve(spaceType);
  },

  // Floors
  getFloors: async (buildingId?: string): Promise<Floor[]> => {
    let floors = mockFloors;
    if (buildingId) {
      floors = floors.filter((f) => f.buildingId === buildingId);
    }
    return Promise.resolve(floors);
  },

  getFloorById: async (id: string): Promise<Floor | undefined> => {
    const floor = mockFloors.find((f) => f.id === id);
    return Promise.resolve(floor);
  },

  // Spaces
  getSpaces: async (
    floorId?: string,
    spaceTypeId?: string,
  ): Promise<Space[]> => {
    let spaces = mockSpaces;
    if (floorId) {
      spaces = spaces.filter((s) => s.floorId === floorId);
    }
    if (spaceTypeId) {
      spaces = spaces.filter((s) => s.spaceTypeId === spaceTypeId);
    }
    return Promise.resolve(spaces);
  },

  getSpaceById: async (id: string): Promise<Space | undefined> => {
    const space = mockSpaces.find((s) => s.id === id);
    return Promise.resolve(space);
  },

  // Occupancy Data
  getOccupancyData: async (
    spaceId: string,
    startTime?: string,
    endTime?: string,
  ): Promise<OccupancyData[]> => {
    let data = mockOccupancyData.filter((d) => d.spaceId === spaceId);
    if (startTime) {
      data = data.filter((d) => new Date(d.timestamp) >= new Date(startTime));
    }
    if (endTime) {
      data = data.filter((d) => new Date(d.timestamp) <= new Date(endTime));
    }
    return Promise.resolve(data);
  },

  getCurrentOccupancy: async (
    spaceId: string,
  ): Promise<OccupancyData | undefined> => {
    // Get the most recent occupancy data for the space
    const data = mockOccupancyData
      .filter((d) => d.spaceId === spaceId)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      );

    return Promise.resolve(data[0]);
  },

  // Space Utilization Reports
  generateSpaceUtilizationReport: async (
    startDate: string,
    endDate: string,
    granularity: "hourly" | "daily" | "weekly" | "monthly" = "daily",
    filters?: {
      buildingIds?: string[];
      floorIds?: string[];
      spaceTypeIds?: string[];
      departmentIds?: string[];
    },
  ): Promise<SpaceUtilizationReport> => {
    // In a real implementation, this would query the database and generate a report
    // For now, we'll return a mock report
    return Promise.resolve({
      id: Date.now().toString(),
      name: `Space Utilization Report ${new Date().toLocaleDateString()}`,
      dateRange: {
        startDate,
        endDate,
      },
      granularity,
      filters,
      data: mockSpaces.map((space) => ({
        spaceId: space.id,
        spaceName: space.name,
        spaceType: space.spaceType?.name || "",
        averageOccupancy: space.currentOccupancy || 0,
        peakOccupancy: space.currentOccupancy ? space.currentOccupancy + 2 : 0,
        utilizationPercentage: space.currentOccupancy
          ? (space.currentOccupancy / space.capacity) * 100
          : 0,
      })),
      complianceStatus: {
        gbci: true,
        bgh: true,
      },
    });
  },

  // Space Planning
  getSpacePlanningProjects: async (): Promise<SpacePlanningProject[]> => {
    // Mock implementation
    return Promise.resolve([]);
  },

  // Workspace Standards
  getWorkspaceStandards: async (): Promise<WorkspaceStandard[]> => {
    // Mock implementation
    return Promise.resolve([]);
  },

  // Move Management
  getMoveRequests: async (): Promise<MoveRequest[]> => {
    // Mock implementation
    return Promise.resolve([]);
  },
};
