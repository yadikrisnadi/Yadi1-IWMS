import { WorkplaceExperienceData } from "@/models/workplaceExperience";

/**
 * Service for Workplace Experience module
 */
export const workplaceExperienceService = {
  /**
   * Get workplace experience data
   */
  getWorkplaceExperienceData: async (): Promise<WorkplaceExperienceData> => {
    // This would be an API call in a real application
    // For now, we'll return mock data that matches what's in the WorkplaceExperience component
    return {
      reservations: [
        {
          id: "1",
          title: "Team Brainstorming",
          location: "Meeting Room A-101",
          time: "10:00 - 11:30",
          date: "Today",
          attendees: 8,
        },
        {
          id: "2",
          title: "Project Review",
          location: "Conference Room B-201",
          time: "13:00 - 14:00",
          date: "Today",
          attendees: 5,
        },
        {
          id: "3",
          title: "Client Presentation",
          location: "Presentation Hall",
          time: "09:30 - 11:00",
          date: "Tomorrow",
          attendees: 12,
        },
      ],
      amenities: [
        {
          name: "wifiNetwork",
          status: "operational",
          icon: null, // Will be set in component
          statusColor: "text-green-500",
        },
        {
          name: "cafeteria",
          status: "openUntil 18:00",
          icon: null, // Will be set in component
          statusColor: "text-amber-500",
        },
        {
          name: "hvacSystem",
          status: "optimal (23°C)",
          icon: null, // Will be set in component
          statusColor: "text-blue-500",
        },
        {
          name: "supportDesk",
          status: "available",
          icon: null, // Will be set in component
          statusColor: "text-indigo-500",
        },
      ],
      workspaces: [
        {
          type: "desk",
          location: "Open Area A",
          available: 12,
          total: 20,
        },
        {
          type: "meetingRoom",
          location: "Floor 2",
          available: 5,
          total: 8,
        },
        {
          type: "focusRoom",
          location: "Floor 3",
          available: 3,
          total: 4,
        },
        {
          type: "collaborationSpace",
          location: "Floor 1",
          available: 2,
          total: 3,
        },
        {
          type: "conferenceRoom",
          location: "Floor 4",
          available: 1,
          total: 2,
        },
        {
          type: "phoneBooths",
          location: "Various Floors",
          available: 6,
          total: 10,
        },
      ],
      feedback: [
        {
          user: "Sarah K.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
          comment: "The new lounge area is fantastic for casual meetings!",
          category: "workspaceComfort",
          time: "2 hours ago",
          rating: 4,
        },
        {
          user: "Michael T.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
          comment:
            "Coffee quality in the cafeteria has improved significantly.",
          category: "amenities",
          time: "Yesterday",
          rating: 5,
        },
        {
          user: "Aisha J.",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
          comment: "Wi-Fi connectivity is still spotty in the east wing.",
          category: "technology",
          time: "2 days ago",
          rating: 3,
        },
      ],
      insights: [
        {
          title: "peakUsageHours",
          value: "10:00 - 14:00",
          change: "+5% vs last month",
          trend: "up",
        },
        {
          title: "averageMeetingDuration",
          value: "52 minutes",
          change: "-3% vs last month",
          trend: "down",
        },
        {
          title: "mostRequestedAmenity",
          value: "cafeteria",
          change: "unchanged",
          trend: "neutral",
        },
      ],
    };
  },

  /**
   * Get reservations data
   */
  getReservations: async () => {
    const data = await workplaceExperienceService.getWorkplaceExperienceData();
    return data.reservations;
  },

  /**
   * Get amenities data
   */
  getAmenities: async () => {
    const data = await workplaceExperienceService.getWorkplaceExperienceData();
    return data.amenities;
  },

  /**
   * Get workspaces data
   */
  getWorkspaces: async () => {
    const data = await workplaceExperienceService.getWorkplaceExperienceData();
    return data.workspaces;
  },

  /**
   * Get feedback data
   */
  getFeedback: async () => {
    const data = await workplaceExperienceService.getWorkplaceExperienceData();
    return data.feedback;
  },

  /**
   * Get insights data
   */
  getInsights: async () => {
    const data = await workplaceExperienceService.getWorkplaceExperienceData();
    return data.insights;
  },
};
