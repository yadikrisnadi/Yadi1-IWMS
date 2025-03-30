import { environmentalService } from "@/services/environmentalService";
import { withErrorHandling } from "@/components/common/ApiErrorHandler";
import {
  EnvironmentalData,
  BuildingData,
  EnergyData,
  WaterData,
  CarbonData,
  CertificationData,
} from "@/models/environmental";

/**
 * Enhanced version of the environmental service with built-in error handling
 */
export const enhancedEnvironmentalService = {
  /**
   * Get environmental data with error handling
   */
  getEnvironmentalData: withErrorHandling<EnvironmentalData, []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await environmentalService.getEnvironmentalData();
    } catch (error) {
      console.error("Error fetching environmental data:", error);
      throw error;
    }
  }),

  /**
   * Get building data with error handling
   */
  getBuildingData: withErrorHandling<BuildingData[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await environmentalService.getBuildingData();
    } catch (error) {
      console.error("Error fetching building data:", error);
      throw error;
    }
  }),

  /**
   * Get energy data with error handling
   */
  getEnergyData: withErrorHandling<EnergyData[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await environmentalService.getEnergyData();
    } catch (error) {
      console.error("Error fetching energy data:", error);
      throw error;
    }
  }),

  /**
   * Get water data with error handling
   */
  getWaterData: withErrorHandling<WaterData[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await environmentalService.getWaterData();
    } catch (error) {
      console.error("Error fetching water data:", error);
      throw error;
    }
  }),

  /**
   * Get carbon data with error handling
   */
  getCarbonData: withErrorHandling<CarbonData[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await environmentalService.getCarbonData();
    } catch (error) {
      console.error("Error fetching carbon data:", error);
      throw error;
    }
  }),

  /**
   * Get certification data with error handling
   */
  getCertificationData: withErrorHandling<CertificationData[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await environmentalService.getCertificationData();
    } catch (error) {
      console.error("Error fetching certification data:", error);
      throw error;
    }
  }),
};
