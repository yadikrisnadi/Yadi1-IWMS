import { facilityMaintenanceService } from "@/services/facilityMaintenanceService";
import { withErrorHandling } from "@/components/common/ApiErrorHandler";
import {
  MaintenanceAsset,
  MaintenanceRequest,
  MaintenanceSchedule,
} from "@/models/facilityMaintenance";

/**
 * Enhanced version of the facility maintenance service with built-in error handling
 */
export const enhancedFacilityMaintenanceService = {
  /**
   * Get assets with error handling
   */
  getAssets: withErrorHandling<MaintenanceAsset[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await facilityMaintenanceService.getAssets();
    } catch (error) {
      console.error("Error fetching assets:", error);
      throw error;
    }
  }),

  /**
   * Get maintenance requests with error handling
   */
  getMaintenanceRequests: withErrorHandling<MaintenanceRequest[], []>(
    async () => {
      try {
        // Add timeout to simulate network conditions for testing
        // Remove in production
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await facilityMaintenanceService.getMaintenanceRequests();
      } catch (error) {
        console.error("Error fetching maintenance requests:", error);
        throw error;
      }
    },
  ),

  /**
   * Get maintenance schedules with error handling
   */
  getMaintenanceSchedules: withErrorHandling<MaintenanceSchedule[], []>(
    async () => {
      try {
        // Add timeout to simulate network conditions for testing
        // Remove in production
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await facilityMaintenanceService.getMaintenanceSchedules();
      } catch (error) {
        console.error("Error fetching maintenance schedules:", error);
        throw error;
      }
    },
  ),

  /**
   * Create a new maintenance request with error handling
   */
  createMaintenanceRequest: withErrorHandling<
    MaintenanceRequest,
    [MaintenanceRequest]
  >(async (request: MaintenanceRequest) => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      // This is a placeholder - implement actual API call
      return {
        ...request,
        id: `REQ-${Date.now()}`,
        status: "submitted",
      } as MaintenanceRequest;
    } catch (error) {
      console.error("Error creating maintenance request:", error);
      throw error;
    }
  }),

  /**
   * Update a maintenance request with error handling
   */
  updateMaintenanceRequest: withErrorHandling<
    MaintenanceRequest,
    [string, Partial<MaintenanceRequest>]
  >(async (id: string, updates: Partial<MaintenanceRequest>) => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      // This is a placeholder - implement actual API call
      const requests =
        await facilityMaintenanceService.getMaintenanceRequests();
      const request = requests.find((r) => r.id === id);
      if (!request) {
        throw new Error(`Maintenance request with ID ${id} not found`);
      }
      return { ...request, ...updates } as MaintenanceRequest;
    } catch (error) {
      console.error("Error updating maintenance request:", error);
      throw error;
    }
  }),
};
