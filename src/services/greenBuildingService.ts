import { GreenBuildingData } from "@/models/greenBuilding";

/**
 * Service for Green Building Certification module
 */
export const greenBuildingService = {
  /**
   * Get green building certification data
   */
  getGreenBuildingData: async (): Promise<GreenBuildingData> => {
    // This would be an API call in a real application
    // For now, we'll return mock data
    return {
      certifications: [
        {
          id: "1",
          name: "Greenship GBCI",
          type: "New Building v1.2",
          level: "Platinum",
          issueDate: "15 Mar 2023",
          expiryDate: "15 Mar 2026",
          certificateId: "GBCI-NB-2023-0142",
          totalPoints: "86/100",
          renewalStatus: "On Track",
        },
        {
          id: "2",
          name: "BGH Certification",
          type: "Existing Building",
          level: "Gold",
          issueDate: "22 Jun 2022",
          expiryDate: "22 Jun 2025",
          certificateId: "BGH-EB-2022-0078",
          totalPoints: "72/100",
          renewalStatus: "Action Required",
        },
      ],
      applications: [
        {
          id: "1",
          name: "EDGE Certification",
          building: "Jakarta Office Tower",
          submissionDate: "10 Jan 2024",
          currentStage: "Document Review",
          progress: 65,
        },
        {
          id: "2",
          name: "LEED Certification",
          building: "Surabaya Commercial Center",
          submissionDate: "05 Mar 2024",
          currentStage: "Initial Assessment",
          progress: 30,
        },
      ],
      complianceData: [
        {
          id: "1",
          name: "PP No. 16/2021",
          description: "Building Regulations",
          compliance: 92,
          status: "Compliant",
        },
        {
          id: "2",
          name: "ISO 14001",
          description: "Environmental Management",
          compliance: 78,
          status: "Partial",
        },
        {
          id: "3",
          name: "ISO 50001",
          description: "Energy Management",
          compliance: 85,
          status: "Compliant",
        },
      ],
      complianceIssues: [
        {
          id: "1",
          name: "Water Efficiency Requirements",
          reference: "ISO 14001 Section 6.2",
          priority: "Medium Priority",
        },
        {
          id: "2",
          name: "Energy Monitoring System",
          reference: "ISO 50001 Section 4.6.1",
          priority: "High Priority",
        },
        {
          id: "3",
          name: "Waste Management Documentation",
          reference: "PP No. 16/2021 Article 27",
          priority: "Medium Priority",
        },
      ],
      sustainabilityMetrics: [
        {
          name: "Avg. Consumption",
          value: 12450,
          trend: "down",
          target: 13000,
        },
        {
          name: "Efficiency Score",
          value: 87,
          trend: "up",
          target: 80,
        },
        {
          name: "Cost Savings",
          value: 45.2,
          trend: "up",
          target: 40,
        },
        {
          name: "Carbon Reduction",
          value: 18.3,
          trend: "up",
          target: 18,
        },
      ],
      sustainabilityProjects: [
        {
          id: "1",
          name: "Solar Panel Installation",
          description: "Phase 2 Implementation",
          status: "In Progress",
          progress: 75,
          startDate: "10 Jan 2024",
          endDate: "30 Jun 2024",
          impact: "120 tons/year",
        },
        {
          id: "2",
          name: "Rainwater Harvesting System",
          description: "Implementation",
          status: "Planning",
          progress: 25,
          startDate: "15 Mar 2024",
          endDate: "15 Sep 2024",
          impact: "1,200 m³/year",
        },
      ],
      wasteData: [
        {
          category: "Organic",
          value: 45,
          description:
            "Food waste, garden waste, and other biodegradable materials",
        },
        {
          category: "Inorganic",
          value: 35,
          description:
            "Plastic, glass, metal, and other non-biodegradable materials",
        },
        {
          category: "Hazardous",
          value: 20,
          description:
            "Toxic, corrosive, flammable, and other hazardous materials",
        },
      ],
      monthlyWasteData: [
        {
          month: "Jan",
          organik: 520,
          anorganik: 380,
          berbahaya: 210,
        },
        {
          month: "Feb",
          organik: 510,
          anorganik: 390,
          berbahaya: 200,
        },
        {
          month: "Mar",
          organik: 530,
          anorganik: 400,
          berbahaya: 220,
        },
        {
          month: "Apr",
          organik: 490,
          anorganik: 370,
          berbahaya: 190,
        },
        {
          month: "May",
          organik: 480,
          anorganik: 360,
          berbahaya: 180,
        },
        {
          month: "Jun",
          organik: 460,
          anorganik: 350,
          berbahaya: 170,
        },
      ],
    };
  },
};
