import {
  EnvironmentalData,
  BuildingData,
  EnergyData,
  WaterData,
  CarbonData,
  CertificationData,
} from "@/models/environmental";

/**
 * Service for Environmental & Energy Management module
 */
export const environmentalService = {
  /**
   * Get environmental data
   */
  getEnvironmentalData: async (): Promise<EnvironmentalData> => {
    // This would be an API call in a real application
    // For now, we'll return mock data
    return {
      energyData: [
        { month: "Jan", consumption: 420, target: 450, savings: 30 },
        { month: "Feb", consumption: 430, target: 450, savings: 20 },
        { month: "Mar", consumption: 448, target: 450, savings: 2 },
        { month: "Apr", consumption: 415, target: 430, savings: 15 },
        { month: "May", consumption: 405, target: 430, savings: 25 },
        { month: "Jun", consumption: 390, target: 420, savings: 30 },
        { month: "Jul", consumption: 410, target: 420, savings: 10 },
      ],
      waterData: [
        { month: "Jan", consumption: 320, target: 350, savings: 30 },
        { month: "Feb", consumption: 330, target: 350, savings: 20 },
        { month: "Mar", consumption: 345, target: 350, savings: 5 },
        { month: "Apr", consumption: 310, target: 330, savings: 20 },
        { month: "May", consumption: 300, target: 330, savings: 30 },
        { month: "Jun", consumption: 290, target: 320, savings: 30 },
        { month: "Jul", consumption: 305, target: 320, savings: 15 },
      ],
      carbonData: [
        { name: "Electricity", value: 45 },
        { name: "Transportation", value: 25 },
        { name: "Heating", value: 15 },
        { name: "Water", value: 10 },
        { name: "Waste", value: 5 },
      ],
      certificationData: [
        {
          name: "Greenship GBCI",
          status: "In Progress",
          progress: 68,
          dueDate: "2024-12-15",
          priority: "High",
        },
        {
          name: "BGH Certification",
          status: "In Progress",
          progress: 42,
          dueDate: "2025-03-10",
          priority: "Medium",
        },
        {
          name: "ISO 14001",
          status: "Certified",
          progress: 100,
          dueDate: "2026-05-22",
          priority: "Completed",
        },
        {
          name: "ISO 50001",
          status: "Planning",
          progress: 15,
          dueDate: "2025-08-30",
          priority: "Low",
        },
      ],
      buildingData: [
        {
          id: 1,
          name: "Jakarta HQ",
          location: "Jakarta",
          energyScore: 85,
          waterScore: 78,
          carbonScore: 72,
          wasteScore: 75,
          alerts: 2,
        },
        {
          id: 2,
          name: "Surabaya Office",
          location: "Surabaya",
          energyScore: 76,
          waterScore: 82,
          carbonScore: 68,
          wasteScore: 70,
          alerts: 1,
        },
        {
          id: 3,
          name: "Bandung Campus",
          location: "Bandung",
          energyScore: 92,
          waterScore: 88,
          carbonScore: 90,
          wasteScore: 85,
          alerts: 0,
        },
        {
          id: 4,
          name: "Bali Resort",
          location: "Denpasar",
          energyScore: 65,
          waterScore: 58,
          carbonScore: 62,
          wasteScore: 55,
          alerts: 3,
        },
      ],
    };
  },

  /**
   * Get building data
   */
  getBuildingData: async (): Promise<BuildingData[]> => {
    // This would be an API call in a real application
    // For now, we'll return mock data
    return [
      {
        id: 1,
        name: "Jakarta HQ",
        location: "Jakarta",
        energyScore: 85,
        waterScore: 78,
        carbonScore: 72,
        wasteScore: 75,
        alerts: 2,
      },
      {
        id: 2,
        name: "Surabaya Office",
        location: "Surabaya",
        energyScore: 76,
        waterScore: 82,
        carbonScore: 68,
        wasteScore: 70,
        alerts: 1,
      },
      {
        id: 3,
        name: "Bandung Campus",
        location: "Bandung",
        energyScore: 92,
        waterScore: 88,
        carbonScore: 90,
        wasteScore: 85,
        alerts: 0,
      },
      {
        id: 4,
        name: "Bali Resort",
        location: "Denpasar",
        energyScore: 65,
        waterScore: 58,
        carbonScore: 62,
        wasteScore: 55,
        alerts: 3,
      },
    ];
  },

  /**
   * Get energy data
   */
  getEnergyData: async (): Promise<EnergyData[]> => {
    // This would be an API call in a real application
    // For now, we'll return mock data
    return [
      { month: "Jan", consumption: 420, target: 450, savings: 30 },
      { month: "Feb", consumption: 430, target: 450, savings: 20 },
      { month: "Mar", consumption: 448, target: 450, savings: 2 },
      { month: "Apr", consumption: 415, target: 430, savings: 15 },
      { month: "May", consumption: 405, target: 430, savings: 25 },
      { month: "Jun", consumption: 390, target: 420, savings: 30 },
      { month: "Jul", consumption: 410, target: 420, savings: 10 },
    ];
  },

  /**
   * Get water data
   */
  getWaterData: async (): Promise<WaterData[]> => {
    // This would be an API call in a real application
    // For now, we'll return mock data
    return [
      { month: "Jan", consumption: 320, target: 350, savings: 30 },
      { month: "Feb", consumption: 330, target: 350, savings: 20 },
      { month: "Mar", consumption: 345, target: 350, savings: 5 },
      { month: "Apr", consumption: 310, target: 330, savings: 20 },
      { month: "May", consumption: 300, target: 330, savings: 30 },
      { month: "Jun", consumption: 290, target: 320, savings: 30 },
      { month: "Jul", consumption: 305, target: 320, savings: 15 },
    ];
  },

  /**
   * Get carbon data
   */
  getCarbonData: async (): Promise<CarbonData[]> => {
    // This would be an API call in a real application
    // For now, we'll return mock data
    return [
      { name: "Electricity", value: 45 },
      { name: "Transportation", value: 25 },
      { name: "Heating", value: 15 },
      { name: "Water", value: 10 },
      { name: "Waste", value: 5 },
    ];
  },

  /**
   * Get certification data
   */
  getCertificationData: async (): Promise<CertificationData[]> => {
    // This would be an API call in a real application
    // For now, we'll return mock data
    return [
      {
        name: "Greenship GBCI",
        status: "In Progress",
        progress: 68,
        dueDate: "2024-12-15",
        priority: "High",
      },
      {
        name: "BGH Certification",
        status: "In Progress",
        progress: 42,
        dueDate: "2025-03-10",
        priority: "Medium",
      },
      {
        name: "ISO 14001",
        status: "Certified",
        progress: 100,
        dueDate: "2026-05-22",
        priority: "Completed",
      },
      {
        name: "ISO 50001",
        status: "Planning",
        progress: 15,
        dueDate: "2025-08-30",
        priority: "Low",
      },
    ];
  },
};
