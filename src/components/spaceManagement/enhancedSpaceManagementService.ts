// Enhanced Space Management Service with Error Handling
import withErrorHandling from "../facilityMaintenance/withErrorHandling";
import { spaceManagementService as baseService } from "@/services/spaceManagementService";

// Apply error handling to all service methods
export const spaceManagementService = {
  // Space Types
  getSpaceTypes: withErrorHandling(
    baseService.getSpaceTypes,
    "Failed to fetch space types",
  ),
  getSpaceTypeById: withErrorHandling(
    baseService.getSpaceTypeById,
    "Failed to fetch space type details",
  ),

  // Floors
  getFloors: withErrorHandling(baseService.getFloors, "Failed to fetch floors"),
  getFloorById: withErrorHandling(
    baseService.getFloorById,
    "Failed to fetch floor details",
  ),

  // Spaces
  getSpaces: withErrorHandling(baseService.getSpaces, "Failed to fetch spaces"),
  getSpaceById: withErrorHandling(
    baseService.getSpaceById,
    "Failed to fetch space details",
  ),

  // Occupancy Data
  getOccupancyData: withErrorHandling(
    baseService.getOccupancyData,
    "Failed to fetch occupancy data",
  ),
  getCurrentOccupancy: withErrorHandling(
    baseService.getCurrentOccupancy,
    "Failed to fetch current occupancy",
  ),

  // Space Utilization Reports
  generateSpaceUtilizationReport: withErrorHandling(
    baseService.generateSpaceUtilizationReport,
    "Failed to generate space utilization report",
  ),

  // Space Planning
  getSpacePlanningProjects: withErrorHandling(
    baseService.getSpacePlanningProjects,
    "Failed to fetch space planning projects",
  ),

  // Workspace Standards
  getWorkspaceStandards: withErrorHandling(
    baseService.getWorkspaceStandards,
    "Failed to fetch workspace standards",
  ),

  // Move Management
  getMoveRequests: withErrorHandling(
    baseService.getMoveRequests,
    "Failed to fetch move requests",
  ),
};
