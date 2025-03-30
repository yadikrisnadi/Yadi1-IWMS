import { workplaceExperienceService } from "@/services/workplaceExperienceService";
import { withErrorHandling } from "@/components/common/ApiErrorHandler";
import {
  WorkplaceExperienceData,
  ReservationData,
  AmenityData,
  WorkspaceData,
  FeedbackData,
  InsightData,
} from "@/models/workplaceExperience";

/**
 * Enhanced version of the workplace experience service with built-in error handling
 */
export const enhancedWorkplaceExperienceService = {
  /**
   * Get workplace experience data with error handling
   */
  getWorkplaceExperienceData: withErrorHandling<WorkplaceExperienceData, []>(
    async () => {
      try {
        // Add timeout to simulate network conditions for testing
        // Remove in production
        await new Promise((resolve) => setTimeout(resolve, 500));
        return await workplaceExperienceService.getWorkplaceExperienceData();
      } catch (error) {
        console.error("Error fetching workplace experience data:", error);
        throw error;
      }
    },
  ),

  /**
   * Get reservations data with error handling
   */
  getReservations: withErrorHandling<ReservationData[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await workplaceExperienceService.getReservations();
    } catch (error) {
      console.error("Error fetching reservations data:", error);
      throw error;
    }
  }),

  /**
   * Get amenities data with error handling
   */
  getAmenities: withErrorHandling<AmenityData[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await workplaceExperienceService.getAmenities();
    } catch (error) {
      console.error("Error fetching amenities data:", error);
      throw error;
    }
  }),

  /**
   * Get workspaces data with error handling
   */
  getWorkspaces: withErrorHandling<WorkspaceData[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await workplaceExperienceService.getWorkspaces();
    } catch (error) {
      console.error("Error fetching workspaces data:", error);
      throw error;
    }
  }),

  /**
   * Get feedback data with error handling
   */
  getFeedback: withErrorHandling<FeedbackData[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await workplaceExperienceService.getFeedback();
    } catch (error) {
      console.error("Error fetching feedback data:", error);
      throw error;
    }
  }),

  /**
   * Get insights data with error handling
   */
  getInsights: withErrorHandling<InsightData[], []>(async () => {
    try {
      // Add timeout to simulate network conditions for testing
      // Remove in production
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await workplaceExperienceService.getInsights();
    } catch (error) {
      console.error("Error fetching insights data:", error);
      throw error;
    }
  }),
};
