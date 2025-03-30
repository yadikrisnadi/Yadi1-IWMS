/**
 * Types for the Workplace Experience module
 */

export interface ReservationData {
  id: string;
  title: string;
  location: string;
  time: string;
  date: string;
  attendees: number;
}

export interface AmenityData {
  name: string;
  status: string;
  icon: React.ReactNode;
  statusColor: string;
}

export interface WorkspaceData {
  type: string;
  location: string;
  available: number;
  total: number;
}

export interface FeedbackData {
  user: string;
  avatar: string;
  comment: string;
  category: string;
  time: string;
  rating: number;
}

export interface InsightData {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
}

export interface WorkplaceExperienceData {
  reservations: ReservationData[];
  amenities: AmenityData[];
  workspaces: WorkspaceData[];
  feedback: FeedbackData[];
  insights: InsightData[];
}
