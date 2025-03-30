import { greenBuildingService } from "@/services/greenBuildingService";
import { withErrorHandling } from "@/components/common/ApiErrorHandler";
import { GreenBuildingData } from "@/models/greenBuilding";

/**
 * Enhanced version of the green building service with built-in error handling
 */
export const enhancedGreenBuildingService = {
  /**
   * Get green building data with error handling
   */
  getGreenBuildingData: withErrorHandling<GreenBuildingData, []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await greenBuildingService.getGreenBuildingData();
    } catch (error) {
      console.error("Error fetching green building data:", error);
      throw error;
    }
  }),
};
